# app/__init__.py - Complete EmberFrame Application with Full App Integration
from flask import Flask, render_template, request, jsonify, session, redirect, url_for, send_file, send_from_directory
from flask_socketio import SocketIO
import os
import json
import hashlib
import shutil
import sqlite3
import time
import psutil
import platform
import re
import glob
from datetime import datetime, timedelta
from werkzeug.utils import secure_filename
from pathlib import Path

# Try to import CSRF protection, but make it optional
try:
    from flask_wtf.csrf import CSRFProtect

    CSRF_AVAILABLE = True
except ImportError:
    print("Warning: Flask-WTF not available, CSRF protection disabled")
    CSRFProtect = None
    CSRF_AVAILABLE = False

socketio = SocketIO()


def create_app():
    """Create and configure the Flask application"""

    # Get the absolute path to the project root
    app_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(app_dir)

    # Template and static directories
    template_dir = os.path.join(project_root, 'templates')
    static_dir = os.path.join(project_root, 'static')

    print(f"🔍 Project root: {project_root}")
    print(f"🔍 Template dir: {template_dir} (exists: {os.path.exists(template_dir)})")
    print(f"🔍 Static dir: {static_dir} (exists: {os.path.exists(static_dir)})")

    # Create Flask app with explicit template and static folders
    app = Flask(
        __name__,
        template_folder=template_dir,
        static_folder=static_dir
    )

    # Configuration
    app.config.update(
        SECRET_KEY='ember-secret-key-change-in-production-2024',
        UPLOAD_FOLDER=os.path.join(project_root, 'user_data'),
        PUBLIC_FOLDER=os.path.join(project_root, 'public_data'),
        WALLPAPER_FOLDER=os.path.join(static_dir, 'wallpapers'),
        MAX_CONTENT_LENGTH=16 * 1024 * 1024,  # 16MB max file size
        WTF_CSRF_ENABLED=CSRF_AVAILABLE,
        WTF_CSRF_TIME_LIMIT=None,
        DATABASE_FILE=os.path.join(project_root, 'emberframe.db')
    )

    # Initialize extensions
    socketio.init_app(app, cors_allowed_origins="*")

    # Initialize CSRF protection if available
    if CSRF_AVAILABLE:
        csrf = CSRFProtect(app)
        print("✅ CSRF protection enabled")

        @app.template_global()
        def csrf_token():
            try:
                from flask_wtf.csrf import generate_csrf
                return generate_csrf()
            except Exception:
                return ""
    else:
        @app.template_global()
        def csrf_token():
            return ""

    # Create necessary directories
    for directory in [
        app.config['UPLOAD_FOLDER'],
        app.config['PUBLIC_FOLDER'],
        app.config['WALLPAPER_FOLDER'],
        os.path.join(project_root, 'users'),
        os.path.join(project_root, 'logs'),
        os.path.join(project_root, 'shared'),
        os.path.join(static_dir, 'js', 'apps')
    ]:
        os.makedirs(directory, exist_ok=True)

    # Initialize database
    init_database(app)

    # Check template files
    if os.path.exists(template_dir):
        template_files = [f for f in os.listdir(template_dir) if f.endswith('.html')]
        print(f"📄 Found templates: {template_files}")
    else:
        print("❌ Template directory not found!")

    # =====================
    # MAIN ROUTES
    # =====================

    @app.route('/')
    def index():
        """Main index route"""
        if 'username' in session:
            return render_template('desktop.html', username=session['username'])
        return redirect(url_for('login_page'))

    @app.route('/login', methods=['GET'])
    def login_page():
        """Show login page"""
        if 'username' in session:
            return redirect(url_for('index'))
        return render_template('login.html')

    @app.route('/login', methods=['POST'])
    def login_submit():
        """Handle login form submission"""
        try:
            data = request.get_json() or {}
            username = data.get('username', '').strip()
            password = data.get('password', '')

            print(f"🔐 Login attempt: {username}")

            if not username or not password:
                return jsonify({'success': False, 'message': 'Username and password are required'})

            if len(username) < 3:
                return jsonify({'success': False, 'message': 'Username must be at least 3 characters'})

            # Simple authentication for testing - accept any user with 3+ char username
            if len(username) >= 3 and len(password) >= 1:
                session['username'] = username
                session.permanent = True

                # Create user record if doesn't exist
                create_user_if_not_exists(app.config['DATABASE_FILE'], username, password)
                ensure_user_directory(username, app.config['UPLOAD_FOLDER'])

                # Log the login
                log_activity(app.config['DATABASE_FILE'], username, 'login', f'User {username} logged in',
                             request.remote_addr)

                print(f"✅ Login successful: {username}")
                return jsonify({'success': True, 'message': 'Login successful'})
            else:
                print(f"❌ Login failed: {username}")
                return jsonify({'success': False, 'message': 'Invalid username or password'})

        except Exception as e:
            print(f"❌ Login error: {e}")
            return jsonify({'success': False, 'message': 'Login error occurred'})

    @app.route('/register', methods=['GET'])
    def register_page():
        """Show registration page"""
        if 'username' in session:
            return redirect(url_for('index'))
        return render_template('register.html')

    @app.route('/register', methods=['POST'])
    def register_submit():
        """Handle registration form submission"""
        try:
            data = request.get_json() or {}
            username = data.get('username', '').strip()
            password = data.get('password', '')

            print(f"📝 Registration attempt: {username}")

            # Validate input
            if not username or not password:
                return jsonify({'success': False, 'message': 'Username and password are required'})

            if len(username) < 3:
                return jsonify({'success': False, 'message': 'Username must be at least 3 characters'})

            if len(password) < 6:
                return jsonify({'success': False, 'message': 'Password must be at least 6 characters'})

            # Check if user already exists
            if user_exists(app.config['DATABASE_FILE'], username):
                return jsonify({'success': False, 'message': 'Username already exists'})

            # Create the user
            create_user(app.config['DATABASE_FILE'], username, password)
            ensure_user_directory(username, app.config['UPLOAD_FOLDER'])

            # Log the registration
            log_activity(app.config['DATABASE_FILE'], username, 'register', f'User {username} registered',
                         request.remote_addr)

            print(f"✅ Registration successful: {username}")
            return jsonify({'success': True, 'message': 'Registration successful'})

        except Exception as e:
            print(f"❌ Registration error: {e}")
            return jsonify({'success': False, 'message': 'Registration error occurred'})

    @app.route('/logout')
    def logout():
        """Handle logout"""
        username = session.get('username', 'unknown')

        # Log the logout
        if username != 'unknown':
            log_activity(app.config['DATABASE_FILE'], username, 'logout', f'User {username} logged out',
                         request.remote_addr)

        session.clear()
        print(f"👋 Logout: {username}")
        return redirect(url_for('login_page'))

    # =====================
    # APP DISCOVERY AND MANAGEMENT
    # =====================

    @app.route('/api/apps/available')
    def get_available_apps():
        """Get available applications with dynamic discovery"""
        try:
            apps = []
            apps_dir = os.path.join(static_dir, 'js', 'apps')

            if os.path.exists(apps_dir):
                print(f"🔍 Scanning apps directory: {apps_dir}")

                # Scan all JavaScript files in the apps directory
                for file in os.listdir(apps_dir):
                    if file.endswith('.js'):
                        file_path = os.path.join(apps_dir, file)
                        app_info = parse_app_metadata(file_path)

                        if app_info and app_info.get('enabled', True):
                            app_info['file'] = file
                            app_info['id'] = app_info.get('id', file.replace('.js', '').replace('_', '-'))
                            apps.append(app_info)
                            print(f"✅ Found app: {app_info.get('name', file)} ({app_info['id']})")
                        else:
                            # Create basic app info for files without metadata
                            app_id = file.replace('.js', '').replace('_', '-')
                            basic_info = {
                                'id': app_id,
                                'name': file.replace('.js', '').replace('-', ' ').title(),
                                'icon': get_default_app_icon(app_id),
                                'description': f'Application: {file.replace(".js", "")}',
                                'category': get_default_app_category(app_id),
                                'version': '1.0.0',
                                'author': 'EmberFrame',
                                'enabled': True,
                                'file': file
                            }
                            apps.append(basic_info)
                            print(f"📝 Created basic info for: {basic_info['name']} ({basic_info['id']})")

            # Add built-in apps if not found in files
            builtin_apps = get_builtin_apps()
            existing_ids = {app['id'] for app in apps}

            for builtin_app in builtin_apps:
                if builtin_app['id'] not in existing_ids:
                    apps.append(builtin_app)
                    print(f"🔧 Added built-in app: {builtin_app['name']} ({builtin_app['id']})")

            print(f"🎯 Total apps discovered: {len(apps)}")
            return jsonify({'success': True, 'apps': apps})

        except Exception as e:
            print(f"❌ App discovery error: {e}")
            return jsonify({'success': False, 'error': str(e), 'apps': get_builtin_apps()})

    @app.route('/api/apps/reload', methods=['POST'])
    def reload_apps():
        """Force reload of app discovery"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        try:
            # This endpoint allows refreshing the app list
            return jsonify({'success': True, 'message': 'Apps reloaded'})
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    # =====================
    # SHORTCUT MANAGEMENT
    # =====================

    @app.route('/api/shortcuts/desktop')
    def get_desktop_shortcuts():
        """Get desktop shortcuts for current user"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        try:
            username = session['username']
            shortcuts = load_user_shortcuts(app.config['DATABASE_FILE'], username, 'desktop')
            return jsonify({'success': True, 'shortcuts': shortcuts})
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @app.route('/api/shortcuts/desktop', methods=['POST'])
    def save_desktop_shortcuts():
        """Save desktop shortcuts for current user"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        try:
            username = session['username']
            data = request.get_json()
            shortcuts = data.get('shortcuts', [])

            save_user_shortcuts(app.config['DATABASE_FILE'], username, 'desktop', shortcuts)
            return jsonify({'success': True})
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @app.route('/api/shortcuts/taskbar')
    def get_taskbar_shortcuts():
        """Get taskbar shortcuts for current user"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        try:
            username = session['username']
            shortcuts = load_user_shortcuts(app.config['DATABASE_FILE'], username, 'taskbar')
            return jsonify({'success': True, 'shortcuts': shortcuts})
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @app.route('/api/shortcuts/taskbar', methods=['POST'])
    def save_taskbar_shortcuts():
        """Save taskbar shortcuts for current user"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        try:
            username = session['username']
            data = request.get_json()
            shortcuts = data.get('shortcuts', [])

            save_user_shortcuts(app.config['DATABASE_FILE'], username, 'taskbar', shortcuts)
            return jsonify({'success': True})
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    # =====================
    # FILE API ROUTES
    # =====================

    @app.route('/api/files')
    @app.route('/api/files/')
    @app.route('/api/files/<path:filepath>')
    def list_files(filepath=''):
        """List files in a directory"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        username = session['username']

        try:
            # Normalize the path
            if not filepath:
                filepath = 'home'

            # Determine the actual filesystem path
            if filepath.startswith('public/') or filepath == 'public':
                # Public files
                if filepath == 'public':
                    actual_path = app.config['PUBLIC_FOLDER']
                    relative_path = ''
                else:
                    relative_path = filepath[7:]  # Remove 'public/'
                    actual_path = os.path.join(app.config['PUBLIC_FOLDER'], relative_path)
                writable = True  # Public folder is writable

            elif filepath.startswith('home/') or filepath == 'home':
                # User home directory
                if filepath == 'home':
                    actual_path = os.path.join(app.config['UPLOAD_FOLDER'], username)
                    relative_path = ''
                else:
                    relative_path = filepath[5:]  # Remove 'home/'
                    actual_path = os.path.join(app.config['UPLOAD_FOLDER'], username, relative_path)
                writable = True

            elif filepath.startswith('shared/') or filepath == 'shared':
                # Shared files
                shared_folder = os.path.join(project_root, 'shared')
                if filepath == 'shared':
                    actual_path = shared_folder
                    relative_path = ''
                else:
                    relative_path = filepath[7:]  # Remove 'shared/'
                    actual_path = os.path.join(shared_folder, relative_path)
                writable = True

            else:
                # Default to user home
                actual_path = os.path.join(app.config['UPLOAD_FOLDER'], username, filepath)
                relative_path = filepath
                writable = True

            # Ensure the directory exists
            if not os.path.exists(actual_path):
                os.makedirs(actual_path, exist_ok=True)

            # List files
            files = []
            if os.path.isdir(actual_path):
                for item in os.listdir(actual_path):
                    item_path = os.path.join(actual_path, item)

                    file_info = {
                        'name': item,
                        'type': 'folder' if os.path.isdir(item_path) else 'file',
                        'size': os.path.getsize(item_path) if os.path.isfile(item_path) else 0,
                        'modified': datetime.fromtimestamp(os.path.getmtime(item_path)).isoformat(),
                        'icon': get_file_icon(item)
                    }
                    files.append(file_info)

            return jsonify({
                'files': files,
                'path': filepath,
                'writable': writable
            })

        except Exception as e:
            print(f"Error listing files: {e}")
            return jsonify({'error': str(e)}), 500

    @app.route('/api/files/upload', methods=['POST'])
    def upload_files():
        """Upload files"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        username = session['username']

        try:
            path = request.form.get('path', 'home')
            files = request.files.getlist('files')

            if not files:
                return jsonify({'error': 'No files provided'}), 400

            # Determine upload directory
            if path.startswith('public/') or path == 'public':
                if path == 'public':
                    upload_dir = app.config['PUBLIC_FOLDER']
                else:
                    upload_dir = os.path.join(app.config['PUBLIC_FOLDER'], path[7:])
            else:
                # Default to user directory
                if path.startswith('home/'):
                    relative_path = path[5:] if len(path) > 5 else ''
                else:
                    relative_path = path if path != 'home' else ''

                upload_dir = os.path.join(app.config['UPLOAD_FOLDER'], username, relative_path)

            os.makedirs(upload_dir, exist_ok=True)

            uploaded_files = []
            for file in files:
                if file.filename:
                    filename = secure_filename(file.filename)
                    file_path = os.path.join(upload_dir, filename)
                    file.save(file_path)
                    uploaded_files.append(filename)

            # Log the upload
            log_activity(app.config['DATABASE_FILE'], username, 'file',
                         f'Uploaded {len(uploaded_files)} files to {path}', request.remote_addr)

            return jsonify({
                'success': True,
                'uploaded_files': uploaded_files,
                'message': f'{len(uploaded_files)} files uploaded successfully'
            })

        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @app.route('/api/files/download/<path:filepath>')
    def download_file(filepath):
        """Download a file"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        username = session['username']

        try:
            # Determine file path based on prefix
            if filepath.startswith('public/'):
                file_path = os.path.join(app.config['PUBLIC_FOLDER'], filepath[7:])
            elif filepath.startswith('home/'):
                file_path = os.path.join(app.config['UPLOAD_FOLDER'], username, filepath[5:])
            else:
                file_path = os.path.join(app.config['UPLOAD_FOLDER'], username, filepath)

            if os.path.exists(file_path) and os.path.isfile(file_path):
                return send_file(file_path, as_attachment=True)
            else:
                return jsonify({'error': 'File not found'}), 404

        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @app.route('/api/files/create-folder', methods=['POST'])
    def create_folder():
        """Create a new folder"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        username = session['username']

        try:
            data = request.get_json()
            path = data.get('path', 'home')
            folder_name = data.get('name', '')

            if not folder_name:
                return jsonify({'error': 'Folder name required'}), 400

            folder_name = secure_filename(folder_name)

            # Determine base directory
            if path.startswith('public/') or path == 'public':
                if path == 'public':
                    base_dir = app.config['PUBLIC_FOLDER']
                else:
                    base_dir = os.path.join(app.config['PUBLIC_FOLDER'], path[7:])
            else:
                if path.startswith('home/'):
                    relative_path = path[5:] if len(path) > 5 else ''
                else:
                    relative_path = path if path != 'home' else ''
                base_dir = os.path.join(app.config['UPLOAD_FOLDER'], username, relative_path)

            folder_path = os.path.join(base_dir, folder_name)

            if os.path.exists(folder_path):
                return jsonify({'error': 'Folder already exists'}), 400

            os.makedirs(folder_path, exist_ok=True)

            return jsonify({'success': True, 'message': 'Folder created successfully'})

        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @app.route('/api/files/delete', methods=['POST'])
    def delete_file():
        """Delete a file or folder"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        username = session['username']

        try:
            data = request.get_json()
            filepath = data.get('path', '')

            if not filepath:
                return jsonify({'error': 'File path required'}), 400

            # Determine actual file path
            if filepath.startswith('public/'):
                actual_path = os.path.join(app.config['PUBLIC_FOLDER'], filepath[7:])
            elif filepath.startswith('home/'):
                actual_path = os.path.join(app.config['UPLOAD_FOLDER'], username, filepath[5:])
            else:
                actual_path = os.path.join(app.config['UPLOAD_FOLDER'], username, filepath)

            if not os.path.exists(actual_path):
                return jsonify({'error': 'File not found'}), 404

            if os.path.isdir(actual_path):
                shutil.rmtree(actual_path)
            else:
                os.remove(actual_path)

            # Log the deletion
            log_activity(app.config['DATABASE_FILE'], username, 'file',
                         f'Deleted {filepath}', request.remote_addr)

            return jsonify({'success': True, 'message': 'File deleted successfully'})

        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @app.route('/api/files/storage-info')
    def storage_info():
        """Get storage information"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        username = session['username']

        try:
            user_dir = os.path.join(app.config['UPLOAD_FOLDER'], username)

            # Get user's quota (default 100MB)
            user_data = get_user_by_username(app.config['DATABASE_FILE'], username)
            quota_mb = user_data.get('quota_mb', 100) if user_data else 100
            quota_bytes = quota_mb * 1024 * 1024

            # Calculate used space
            used_bytes = get_directory_size(user_dir)

            return jsonify({
                'used': used_bytes,
                'total': quota_bytes,
                'available': quota_bytes - used_bytes
            })

        except Exception as e:
            return jsonify({'error': str(e)}), 500

    # =====================
    # USER PREFERENCES
    # =====================

    @app.route('/api/user/preferences')
    def get_user_preferences():
        """Get user preferences"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        username = session['username']

        try:
            user_data = get_user_by_username(app.config['DATABASE_FILE'], username)
            preferences = json.loads(user_data.get('preferences', '{}')) if user_data else {}

            return jsonify({
                'success': True,
                'preferences': preferences,
                'user': {
                    'username': username,
                    'isAdmin': check_admin_status(app.config['DATABASE_FILE'], username)
                }
            })
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @app.route('/api/user/preferences', methods=['POST'])
    def save_user_preferences():
        """Save user preferences"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        username = session['username']

        try:
            preferences = request.get_json()
            save_user_preferences_db(app.config['DATABASE_FILE'], username, preferences)

            return jsonify({'success': True})
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    # =====================
    # WALLPAPER API
    # =====================

    @app.route('/api/wallpapers')
    def get_wallpapers():
        """Get available wallpapers"""
        try:
            wallpapers = []
            wallpaper_dir = app.config['WALLPAPER_FOLDER']

            if os.path.exists(wallpaper_dir):
                for file in os.listdir(wallpaper_dir):
                    if file.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.webp')):
                        wallpapers.append({
                            'name': file,
                            'url': f'/static/wallpapers/{file}',
                            'type': 'image'
                        })

            # Add built-in gradients
            builtin_wallpapers = [
                {'name': 'Cyber Blue', 'value': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                 'type': 'gradient'},
                {'name': 'Ember Red', 'value': 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)', 'type': 'gradient'},
                {'name': 'Matrix Green', 'value': 'linear-gradient(135deg, #00b894 0%, #00a085 100%)',
                 'type': 'gradient'},
                {'name': 'Purple Dream', 'value': 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)',
                 'type': 'gradient'},
                {'name': 'Ocean Blue', 'value': 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)', 'type': 'gradient'}
            ]

            wallpapers.extend(builtin_wallpapers)

            return jsonify({'success': True, 'wallpapers': wallpapers})
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    # =====================
    # ADMIN API ROUTES
    # =====================

    @app.route('/api/admin/check')
    def admin_check():
        """Check if current user is admin"""
        if 'username' not in session:
            return jsonify({'is_admin': False, 'error': 'Not authenticated'})

        username = session['username']
        is_admin = check_admin_status(app.config['DATABASE_FILE'], username)

        return jsonify({
            'is_admin': is_admin,
            'username': username
        })

    @app.route('/api/admin/system-stats')
    def admin_system_stats():
        """Get system statistics"""
        if not is_admin_user():
            return jsonify({'error': 'Admin access required'}), 403

        try:
            stats = get_system_stats(app.config['DATABASE_FILE'])
            return jsonify({'success': True, 'stats': stats})
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @app.route('/api/admin/users')
    def admin_get_users():
        """Get all users"""
        if not is_admin_user():
            return jsonify({'error': 'Admin access required'}), 403

        try:
            users = get_all_users(app.config['DATABASE_FILE'])
            stats = get_user_stats(app.config['DATABASE_FILE'])

            return jsonify({
                'success': True,
                'users': users,
                'stats': stats
            })
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @app.route('/api/admin/logs')
    def admin_get_logs():
        """Get activity logs"""
        if not is_admin_user():
            return jsonify({'error': 'Admin access required'}), 403

        try:
            filter_type = request.args.get('filter', 'all')
            limit = int(request.args.get('limit', 200))

            logs = get_activity_logs(app.config['DATABASE_FILE'], filter_type, limit)

            return jsonify({'success': True, 'logs': logs})
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    print("✅ EmberFrame app initialized successfully!")
    return app


# =====================
# APP DISCOVERY FUNCTIONS
# =====================

def parse_app_metadata(file_path):
    """Parse app metadata from JavaScript file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Look for APP_METADATA comment block
        if 'APP_METADATA' in content:
            lines = content.split('\n')
            metadata = {}

            for line in lines:
                line = line.strip()
                if line.startswith('* @'):
                    parts = line[3:].split(' ', 1)
                    if len(parts) == 2:
                        key, value = parts
                        if key == 'enabled':
                            metadata[key] = value.lower() == 'true'
                        else:
                            metadata[key] = value

            # Generate ID from filename if not specified
            if 'id' not in metadata:
                filename = os.path.basename(file_path)
                metadata['id'] = filename.replace('.js', '').replace('_', '-')

            return metadata
    except Exception as e:
        print(f"❌ Error parsing {file_path}: {e}")

    return None


def get_builtin_apps():
    """Get list of built-in applications"""
    return [
        {
            'id': 'file-manager',
            'name': 'File Manager',
            'icon': 'fas fa-folder',
            'description': 'Browse and manage your files',
            'category': 'System',
            'version': '1.0.0',
            'author': 'EmberFrame',
            'enabled': True
        },
        {
            'id': 'public-folder',
            'name': 'Public Files',
            'icon': 'fas fa-globe',
            'description': 'Access shared public files',
            'category': 'System',
            'version': '1.0.0',
            'author': 'EmberFrame',
            'enabled': True
        },
        {
            'id': 'terminal',
            'name': 'Terminal',
            'icon': 'fas fa-terminal',
            'description': 'Command line interface',
            'category': 'System',
            'version': '1.0.0',
            'author': 'EmberFrame',
            'enabled': True
        },
        {
            'id': 'text-editor',
            'name': 'Text Editor',
            'icon': 'fas fa-file-alt',
            'description': 'Edit text and code files',
            'category': 'Development',
            'version': '1.0.0',
            'author': 'EmberFrame',
            'enabled': True
        },
        {
            'id': 'settings',
            'name': 'Settings',
            'icon': 'fas fa-cog',
            'description': 'Customize your experience',
            'category': 'System',
            'version': '1.0.0',
            'author': 'EmberFrame',
            'enabled': True
        },
        {
            'id': 'task-manager',
            'name': 'Task Manager',
            'icon': 'fas fa-tasks',
            'description': 'Monitor running applications',
            'category': 'System',
            'version': '1.0.0',
            'author': 'EmberFrame',
            'enabled': True
        },
        {
            'id': 'media-player',
            'name': 'Media Player',
            'icon': 'fas fa-play',
            'description': 'Play audio and video files',
            'category': 'Entertainment',
            'version': '1.0.0',
            'author': 'EmberFrame',
            'enabled': True
        },
        {
            'id': 'appmaker',
            'name': 'AppMaker 2.0',
            'icon': 'fas fa-magic',
            'description': 'Create your own applications',
            'category': 'Development',
            'version': '2.0.0',
            'author': 'EmberFrame',
            'enabled': True
        }
    ]


def get_default_app_icon(app_id):
    """Get default icon for app based on ID"""
    icon_map = {
        'file-manager': 'fas fa-folder',
        'terminal': 'fas fa-terminal',
        'text-editor': 'fas fa-file-alt',
        'media-player': 'fas fa-play',
        'settings': 'fas fa-cog',
        'task-manager': 'fas fa-tasks',
        'appmaker': 'fas fa-magic',
        'calculator': 'fas fa-calculator',
        'notepad': 'fas fa-sticky-note',
        'browser': 'fas fa-globe',
        'image-viewer': 'fas fa-image',
        'music-player': 'fas fa-music',
        'video-player': 'fas fa-video',
        'clock': 'fas fa-clock',
        'calendar': 'fas fa-calendar',
        'chat': 'fas fa-comments',
        'email': 'fas fa-envelope',
        'paint': 'fas fa-paint-brush',
        'code-editor': 'fas fa-code',
        'database': 'fas fa-database'
    }
    return icon_map.get(app_id, 'fas fa-cube')


def get_default_app_category(app_id):
    """Get default category for app based on ID"""
    category_map = {
        'file-manager': 'System',
        'terminal': 'System',
        'settings': 'System',
        'task-manager': 'System',
        'text-editor': 'Development',
        'code-editor': 'Development',
        'appmaker': 'Development',
        'database': 'Development',
        'media-player': 'Entertainment',
        'music-player': 'Entertainment',
        'video-player': 'Entertainment',
        'image-viewer': 'Entertainment',
        'paint': 'Entertainment',
        'calculator': 'Utilities',
        'notepad': 'Utilities',
        'clock': 'Utilities',
        'calendar': 'Utilities',
        'browser': 'Internet',
        'chat': 'Internet',
        'email': 'Internet'
    }
    return category_map.get(app_id, 'Applications')


# =====================
# DATABASE FUNCTIONS
# =====================

def init_database(app):
    """Initialize the database"""
    db_path = app.config['DATABASE_FILE']

    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # Create users table
    cursor.execute('''
                   CREATE TABLE IF NOT EXISTS users
                   (
                       id
                       INTEGER
                       PRIMARY
                       KEY
                       AUTOINCREMENT,
                       username
                       TEXT
                       UNIQUE
                       NOT
                       NULL,
                       password_hash
                       TEXT
                       NOT
                       NULL,
                       email
                       TEXT,
                       is_admin
                       BOOLEAN
                       DEFAULT
                       FALSE,
                       is_active
                       BOOLEAN
                       DEFAULT
                       TRUE,
                       quota_mb
                       INTEGER
                       DEFAULT
                       100,
                       preferences
                       TEXT
                       DEFAULT
                       '{}',
                       created_at
                       TIMESTAMP
                       DEFAULT
                       CURRENT_TIMESTAMP,
                       last_active
                       TIMESTAMP
                       DEFAULT
                       CURRENT_TIMESTAMP
                   )
                   ''')

    # Create activity logs table
    cursor.execute('''
                   CREATE TABLE IF NOT EXISTS activity_logs
                   (
                       id
                       INTEGER
                       PRIMARY
                       KEY
                       AUTOINCREMENT,
                       username
                       TEXT
                       NOT
                       NULL,
                       action_type
                       TEXT
                       NOT
                       NULL,
                       message
                       TEXT
                       NOT
                       NULL,
                       ip_address
                       TEXT,
                       timestamp
                       TIMESTAMP
                       DEFAULT
                       CURRENT_TIMESTAMP
                   )
                   ''')

    # Create shortcuts table
    cursor.execute('''
                   CREATE TABLE IF NOT EXISTS user_shortcuts
                   (
                       id
                       INTEGER
                       PRIMARY
                       KEY
                       AUTOINCREMENT,
                       username
                       TEXT
                       NOT
                       NULL,
                       shortcut_type
                       TEXT
                       NOT
                       NULL,
                       shortcuts_data
                       TEXT
                       DEFAULT
                       '[]',
                       updated_at
                       TIMESTAMP
                       DEFAULT
                       CURRENT_TIMESTAMP
                   )
                   ''')

    # Create default admin user if no users exist
    cursor.execute('SELECT COUNT(*) FROM users')
    user_count = cursor.fetchone()[0]

    if user_count == 0:
        password_hash = hashlib.sha256('admin'.encode()).hexdigest()
        cursor.execute('''
                       INSERT INTO users (username, password_hash, is_admin, email)
                       VALUES (?, ?, ?, ?)
                       ''', ('admin', password_hash, True, 'admin@emberframe.local'))
        print("✅ Created default admin user: admin/admin")

    conn.commit()
    conn.close()


def create_user_if_not_exists(db_path, username, password):
    """Create user if doesn't exist"""
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    cursor.execute('SELECT id FROM users WHERE username = ?', (username,))
    if not cursor.fetchone():
        password_hash = hashlib.sha256(password.encode()).hexdigest()
        cursor.execute('''
                       INSERT INTO users (username, password_hash, last_active)
                       VALUES (?, ?, ?)
                       ''', (username, password_hash, datetime.now()))
        conn.commit()

    conn.close()


def create_user(db_path, username, password, email='', is_admin=False, is_active=True, quota_mb=100):
    """Create a new user"""
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    password_hash = hashlib.sha256(password.encode()).hexdigest()
    cursor.execute('''
                   INSERT INTO users (username, password_hash, email, is_admin, is_active, quota_mb)
                   VALUES (?, ?, ?, ?, ?, ?)
                   ''', (username, password_hash, email, is_admin, is_active, quota_mb))

    user_id = cursor.lastrowid
    conn.commit()
    conn.close()

    return user_id


def user_exists(db_path, username):
    """Check if user exists"""
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    cursor.execute('SELECT id FROM users WHERE username = ?', (username,))
    exists = cursor.fetchone() is not None

    conn.close()
    return exists


def check_admin_status(db_path, username):
    """Check if user is admin"""
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    cursor.execute('SELECT is_admin FROM users WHERE username = ?', (username,))
    result = cursor.fetchone()

    conn.close()
    return result[0] if result else False


def get_all_users(db_path):
    """Get all users"""
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    cursor.execute('''
                   SELECT id,
                          username,
                          email,
                          is_admin,
                          is_active,
                          quota_mb,
                          created_at,
                          last_active
                   FROM users
                   ORDER BY created_at DESC
                   ''')

    users = [dict(row) for row in cursor.fetchall()]
    conn.close()

    return users


def get_user_by_username(db_path, username):
    """Get user by username"""
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    cursor.execute('SELECT * FROM users WHERE username = ?', (username,))
    result = cursor.fetchone()

    conn.close()
    return dict(result) if result else None


def get_user_stats(db_path):
    """Get user statistics"""
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # Total users
    cursor.execute('SELECT COUNT(*) FROM users')
    total = cursor.fetchone()[0]

    # Active users
    cursor.execute('SELECT COUNT(*) FROM users WHERE is_active = 1')
    active = cursor.fetchone()[0]

    # Admin users
    cursor.execute('SELECT COUNT(*) FROM users WHERE is_admin = 1')
    admins = cursor.fetchone()[0]

    # New users this week
    week_ago = datetime.now() - timedelta(days=7)
    cursor.execute('SELECT COUNT(*) FROM users WHERE created_at > ?', (week_ago,))
    new_this_week = cursor.fetchone()[0]

    conn.close()

    return {
        'total': total,
        'active': active,
        'admins': admins,
        'new_this_week': new_this_week
    }


def log_activity(db_path, username, action_type, message, ip_address=None):
    """Log user activity"""
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    cursor.execute('''
                   INSERT INTO activity_logs (username, action_type, message, ip_address)
                   VALUES (?, ?, ?, ?)
                   ''', (username, action_type, message, ip_address))

    conn.commit()
    conn.close()


def get_activity_logs(db_path, filter_type='all', limit=200):
    """Get activity logs"""
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    if filter_type == 'all':
        cursor.execute('''
                       SELECT *
                       FROM activity_logs
                       ORDER BY timestamp DESC LIMIT ?
                       ''', (limit,))
    else:
        cursor.execute('''
                       SELECT *
                       FROM activity_logs
                       WHERE action_type = ?
                       ORDER BY timestamp DESC LIMIT ?
                       ''', (filter_type, limit))

    logs = []
    for row in cursor.fetchall():
        log_entry = dict(row)
        log_entry['user'] = log_entry['username']
        log_entry['type'] = log_entry['action_type']
        logs.append(log_entry)

    conn.close()
    return logs


def save_user_preferences_db(db_path, username, preferences):
    """Save user preferences"""
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    cursor.execute('''
                   UPDATE users
                   SET preferences = ?
                   WHERE username = ?
                   ''', (json.dumps(preferences), username))

    conn.commit()
    conn.close()


def load_user_shortcuts(db_path, username, shortcut_type):
    """Load user shortcuts"""
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    cursor.execute('''
                   SELECT shortcuts_data
                   FROM user_shortcuts
                   WHERE username = ?
                     AND shortcut_type = ?
                   ''', (username, shortcut_type))

    result = cursor.fetchone()
    conn.close()

    if result:
        try:
            return json.loads(result[0])
        except:
            return []

    # Return default shortcuts for new users
    if shortcut_type == 'desktop':
        return [
            {'app': 'file-manager', 'x': 50, 'y': 50},
            {'app': 'terminal', 'x': 50, 'y': 170},
            {'app': 'text-editor', 'x': 50, 'y': 290}
        ]

    return []


def save_user_shortcuts(db_path, username, shortcut_type, shortcuts):
    """Save user shortcuts"""
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    cursor.execute('''
        INSERT OR REPLACE INTO user_shortcuts (username, shortcut_type, shortcuts_data, updated_at)
        VALUES (?, ?, ?, ?)
    ''', (username, shortcut_type, json.dumps(shortcuts), datetime.now()))

    conn.commit()
    conn.close()


def get_system_stats(db_path):
    """Get system statistics"""
    stats = {}

    # User stats
    stats['users'] = get_user_stats(db_path)

    return stats


# =====================
# UTILITY FUNCTIONS
# =====================

def ensure_user_directory(username, upload_folder):
    """Create user directory"""
    user_dir = os.path.join(upload_folder, username)
    os.makedirs(user_dir, exist_ok=True)

    # Create default directories
    default_dirs = ['Documents', 'Downloads', 'Pictures', 'Desktop', 'Music']
    for dir_name in default_dirs:
        os.makedirs(os.path.join(user_dir, dir_name), exist_ok=True)


def is_admin_user():
    """Check if current session user is admin"""
    if 'username' not in session:
        return False

    # This is a simplified check - in a real app you'd check the database
    username = session['username']
    return username == 'admin'  # Simplified for demo


def get_file_icon(filename):
    """Get file icon"""
    ext = filename.split('.')[-1].lower() if '.' in filename else ''

    icon_map = {
        'folder': 'fas fa-folder',
        'txt': 'fas fa-file-alt',
        'md': 'fas fa-file-alt',
        'pdf': 'fas fa-file-pdf',
        'doc': 'fas fa-file-word',
        'docx': 'fas fa-file-word',
        'xls': 'fas fa-file-excel',
        'xlsx': 'fas fa-file-excel',
        'ppt': 'fas fa-file-powerpoint',
        'pptx': 'fas fa-file-powerpoint',
        'jpg': 'fas fa-image',
        'jpeg': 'fas fa-image',
        'png': 'fas fa-image',
        'gif': 'fas fa-image',
        'svg': 'fas fa-image',
        'mp3': 'fas fa-music',
        'wav': 'fas fa-music',
        'mp4': 'fas fa-video',
        'avi': 'fas fa-video',
        'mov': 'fas fa-video',
        'zip': 'fas fa-file-archive',
        'rar': 'fas fa-file-archive',
        '7z': 'fas fa-file-archive',
        'js': 'fas fa-file-code',
        'html': 'fas fa-file-code',
        'css': 'fas fa-file-code',
        'py': 'fas fa-file-code',
        'java': 'fas fa-file-code',
        'cpp': 'fas fa-file-code',
        'c': 'fas fa-file-code'
    }

    return icon_map.get(ext, 'fas fa-file')


def get_directory_size(directory):
    """Get total size of directory"""
    total_size = 0
    try:
        for dirpath, dirnames, filenames in os.walk(directory):
            for filename in filenames:
                filepath = os.path.join(dirpath, filename)
                if os.path.exists(filepath):
                    total_size += os.path.getsize(filepath)
    except OSError:
        pass
    return total_size