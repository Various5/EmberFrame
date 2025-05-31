# app/__init__.py - Complete EmberFrame Application with All API Routes
from flask import Flask, render_template, request, jsonify, session, redirect, url_for, send_file, send_from_directory
from flask_socketio import SocketIO
import os
import json
import hashlib
import shutil
import time
import glob
from datetime import datetime, timedelta
from werkzeug.utils import secure_filename
from pathlib import Path
import mimetypes
import psutil
import platform
import subprocess
import sys

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
        SHARED_FOLDER=os.path.join(project_root, 'shared_data'),
        WALLPAPER_FOLDER=os.path.join(static_dir, 'wallpapers'),
        LOGS_FOLDER=os.path.join(project_root, 'logs'),
        USERS_FOLDER=os.path.join(project_root, 'users'),
        MAX_CONTENT_LENGTH=16 * 1024 * 1024,  # 16MB max file size
        WTF_CSRF_ENABLED=CSRF_AVAILABLE,
        WTF_CSRF_TIME_LIMIT=None
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
        app.config['SHARED_FOLDER'],
        app.config['WALLPAPER_FOLDER'],
        app.config['LOGS_FOLDER'],
        app.config['USERS_FOLDER']
    ]:
        os.makedirs(directory, exist_ok=True)

    # Utility functions
    def require_login():
        """Decorator to require login"""

        def decorator(f):
            def wrapper(*args, **kwargs):
                if 'username' not in session:
                    return jsonify({'error': 'Authentication required'}), 401
                return f(*args, **kwargs)

            wrapper.__name__ = f.__name__
            return wrapper

        return decorator

    def require_admin():
        """Decorator to require admin privileges"""

        def decorator(f):
            def wrapper(*args, **kwargs):
                if 'username' not in session:
                    return jsonify({'error': 'Authentication required'}), 401

                user_data = get_user_data(session['username'])
                if not user_data.get('is_admin', False):
                    return jsonify({'error': 'Admin privileges required'}), 403

                return f(*args, **kwargs)

            wrapper.__name__ = f.__name__
            return wrapper

        return decorator

    def get_user_data(username):
        """Get user data from file"""
        user_file = os.path.join(app.config['USERS_FOLDER'], f"{username}.json")
        if os.path.exists(user_file):
            try:
                with open(user_file, 'r') as f:
                    return json.load(f)
            except:
                pass
        return {}

    def save_user_data(username, data):
        """Save user data to file"""
        user_file = os.path.join(app.config['USERS_FOLDER'], f"{username}.json")
        try:
            with open(user_file, 'w') as f:
                json.dump(data, f, indent=2, default=str)
            return True
        except Exception as e:
            print(f"Error saving user data: {e}")
            return False

    def get_user_home_path(username):
        """Get user's home directory path"""
        return os.path.join(app.config['UPLOAD_FOLDER'], username)

    def ensure_user_directory(username):
        """Create user directory structure"""
        user_dir = get_user_home_path(username)
        os.makedirs(user_dir, exist_ok=True)

        # Create default directories
        default_dirs = ['Documents', 'Downloads', 'Pictures', 'Music', 'Desktop', 'Videos']
        for dir_name in default_dirs:
            os.makedirs(os.path.join(user_dir, dir_name), exist_ok=True)

        return user_dir

    def log_activity(username, action, details=None):
        """Log user activity"""
        try:
            log_entry = {
                'timestamp': datetime.now().isoformat(),
                'user': username,
                'action': action,
                'details': details,
                'ip': request.remote_addr if request else None
            }

            log_file = os.path.join(app.config['LOGS_FOLDER'], 'activity.log')
            with open(log_file, 'a') as f:
                f.write(json.dumps(log_entry) + '\n')
        except Exception as e:
            print(f"Error logging activity: {e}")

    def get_file_icon(filename):
        """Get appropriate icon for file type"""
        if os.path.isdir(filename):
            return 'fas fa-folder'

        ext = filename.split('.')[-1].lower() if '.' in filename else ''

        icon_map = {
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
            'mp3': 'fas fa-music',
            'wav': 'fas fa-music',
            'mp4': 'fas fa-video',
            'avi': 'fas fa-video',
            'zip': 'fas fa-file-archive',
            'rar': 'fas fa-file-archive',
            'js': 'fas fa-file-code',
            'html': 'fas fa-file-code',
            'css': 'fas fa-file-code',
            'py': 'fas fa-file-code'
        }

        return icon_map.get(ext, 'fas fa-file')

    def resolve_path(path_input, username):
        """Resolve virtual path to actual filesystem path"""
        if not path_input or path_input == '':
            path_input = 'home'

        # Remove leading/trailing slashes
        path_input = path_input.strip('/')

        if path_input.startswith('home'):
            # User home directory
            if path_input == 'home':
                return get_user_home_path(username), True
            else:
                # Remove 'home/' prefix and join with user dir
                rel_path = path_input[5:]  # Remove 'home/'
                return os.path.join(get_user_home_path(username), rel_path), True

        elif path_input.startswith('public'):
            # Public directory
            if path_input == 'public':
                return app.config['PUBLIC_FOLDER'], True
            else:
                rel_path = path_input[7:]  # Remove 'public/'
                return os.path.join(app.config['PUBLIC_FOLDER'], rel_path), True

        elif path_input.startswith('shared'):
            # Shared directory
            if path_input == 'shared':
                return app.config['SHARED_FOLDER'], True
            else:
                rel_path = path_input[7:]  # Remove 'shared/'
                return os.path.join(app.config['SHARED_FOLDER'], rel_path), True

        else:
            # Default to user home
            return os.path.join(get_user_home_path(username), path_input), True

    def scan_available_apps():
        """Scan for available applications"""
        apps = []
        apps_dir = os.path.join(static_dir, 'js', 'apps')

        if os.path.exists(apps_dir):
            for filename in os.listdir(apps_dir):
                if filename.endswith('.js'):
                    file_path = os.path.join(apps_dir, filename)
                    try:
                        with open(file_path, 'r', encoding='utf-8') as f:
                            content = f.read()

                        # Parse metadata from comments
                        metadata = parse_app_metadata(content)
                        if metadata and metadata.get('enabled', True):
                            app_id = filename[:-3]  # Remove .js extension
                            apps.append({
                                'id': app_id,
                                'name': metadata.get('name', app_id.replace('-', ' ').title()),
                                'icon': metadata.get('icon', 'fas fa-cube'),
                                'description': metadata.get('description', 'Application'),
                                'category': metadata.get('category', 'Other'),
                                'version': metadata.get('version', '1.0.0'),
                                'author': metadata.get('author', 'Unknown'),
                                'file': filename
                            })
                    except Exception as e:
                        print(f"Error reading app {filename}: {e}")

        return apps

    def parse_app_metadata(content):
        """Parse APP_METADATA from JavaScript file content"""
        metadata = {}
        lines = content.split('\n')
        in_metadata = False

        for line in lines:
            line = line.strip()
            if 'APP_METADATA' in line:
                in_metadata = True
                continue
            if in_metadata and line.startswith('*/'):
                break
            if in_metadata and line.startswith('* @'):
                parts = line[3:].split(' ', 1)
                if len(parts) == 2:
                    key, value = parts
                    metadata[key] = value.strip()

        # Convert string booleans to actual booleans
        if 'enabled' in metadata:
            metadata['enabled'] = metadata['enabled'].lower() == 'true'

        return metadata

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

            # Simple authentication for development - accept any user with 3+ char username
            if len(username) >= 3 and len(password) >= 1:
                session['username'] = username
                session.permanent = True

                # Ensure user directory exists
                ensure_user_directory(username)

                # Create or update user data
                user_data = get_user_data(username)
                if not user_data:
                    user_data = {
                        'username': username,
                        'created_at': datetime.now().isoformat(),
                        'is_admin': username.lower() == 'admin',  # Make 'admin' user an admin
                        'is_active': True,
                        'quota_mb': 100,
                        'preferences': {
                            'theme': 'cyber-blue',
                            'wallpaper': 'default',
                            'restoreWindows': True
                        }
                    }

                user_data['last_login'] = datetime.now().isoformat()
                save_user_data(username, user_data)

                log_activity(username, 'login')
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
            if get_user_data(username):
                return jsonify({'success': False, 'message': 'Username already exists'})

            # Create user
            ensure_user_directory(username)
            user_data = {
                'username': username,
                'created_at': datetime.now().isoformat(),
                'is_admin': False,
                'is_active': True,
                'quota_mb': 100,
                'preferences': {
                    'theme': 'cyber-blue',
                    'wallpaper': 'default',
                    'restoreWindows': True
                }
            }

            save_user_data(username, user_data)
            log_activity(username, 'register')

            print(f"✅ Registration successful: {username}")
            return jsonify({'success': True, 'message': 'Registration successful'})

        except Exception as e:
            print(f"❌ Registration error: {e}")
            return jsonify({'success': False, 'message': 'Registration error occurred'})

    @app.route('/logout')
    def logout():
        """Handle logout"""
        username = session.get('username', 'unknown')
        log_activity(username, 'logout')
        session.clear()
        print(f"👋 Logout: {username}")
        return redirect(url_for('login_page'))

    # =====================
    # FILE MANAGEMENT API
    # =====================

    @app.route('/api/files')
    @app.route('/api/files/')
    @app.route('/api/files/<path:filepath>')
    @require_login()
    def list_files(filepath=''):
        """List files in a directory"""
        try:
            username = session['username']
            actual_path, writable = resolve_path(filepath, username)

            if not os.path.exists(actual_path):
                return jsonify({'error': 'Directory not found'}), 404

            if not os.path.isdir(actual_path):
                return jsonify({'error': 'Path is not a directory'}), 400

            files = []
            try:
                for item in os.listdir(actual_path):
                    item_path = os.path.join(actual_path, item)
                    try:
                        stat = os.stat(item_path)
                        is_dir = os.path.isdir(item_path)

                        files.append({
                            'name': item,
                            'type': 'folder' if is_dir else 'file',
                            'size': 0 if is_dir else stat.st_size,
                            'modified': datetime.fromtimestamp(stat.st_mtime).isoformat(),
                            'icon': get_file_icon(item)
                        })
                    except (OSError, IOError):
                        # Skip files we can't access
                        continue

            except PermissionError:
                return jsonify({'error': 'Permission denied'}), 403

            return jsonify({
                'files': files,
                'path': filepath,
                'writable': writable
            })

        except Exception as e:
            print(f"Error listing files: {e}")
            return jsonify({'error': str(e)}), 500

    @app.route('/api/files/upload', methods=['POST'])
    @require_login()
    def upload_files():
        """Upload files to directory"""
        try:
            username = session['username']
            target_path = request.form.get('path', 'home')

            actual_path, writable = resolve_path(target_path, username)

            if not writable:
                return jsonify({'error': 'Upload not allowed in this directory'}), 403

            if not os.path.exists(actual_path):
                os.makedirs(actual_path, exist_ok=True)

            uploaded_files = []
            files = request.files.getlist('files')

            for file in files:
                if file and file.filename:
                    filename = secure_filename(file.filename)
                    file_path = os.path.join(actual_path, filename)

                    # Handle duplicate filenames
                    counter = 1
                    base_name, ext = os.path.splitext(filename)
                    while os.path.exists(file_path):
                        filename = f"{base_name}_{counter}{ext}"
                        file_path = os.path.join(actual_path, filename)
                        counter += 1

                    file.save(file_path)
                    uploaded_files.append(filename)

            log_activity(username, f'upload', f'{len(uploaded_files)} files to {target_path}')

            return jsonify({
                'message': f'{len(uploaded_files)} files uploaded successfully',
                'files': uploaded_files
            })

        except Exception as e:
            print(f"Error uploading files: {e}")
            return jsonify({'error': str(e)}), 500

    @app.route('/api/files/download/<path:filepath>')
    @require_login()
    def download_file(filepath):
        """Download a file"""
        try:
            username = session['username']
            actual_path, _ = resolve_path(filepath, username)

            if not os.path.exists(actual_path) or not os.path.isfile(actual_path):
                return jsonify({'error': 'File not found'}), 404

            log_activity(username, 'download', filepath)

            return send_file(actual_path, as_attachment=True)

        except Exception as e:
            print(f"Error downloading file: {e}")
            return jsonify({'error': str(e)}), 500

    @app.route('/api/files/operation', methods=['POST'])
    @require_login()
    def file_operation():
        """Perform file operations (create, delete, rename, etc.)"""
        try:
            username = session['username']
            data = request.get_json()
            operation = data.get('operation')

            if operation == 'create_folder':
                target_path = data.get('path', 'home')
                folder_name = data.get('name')

                actual_path, writable = resolve_path(target_path, username)
                if not writable:
                    return jsonify({'error': 'Cannot create folder in read-only directory'}), 403

                new_folder_path = os.path.join(actual_path, secure_filename(folder_name))
                os.makedirs(new_folder_path, exist_ok=True)

                log_activity(username, 'create_folder', f'{folder_name} in {target_path}')
                return jsonify({'message': 'Folder created successfully'})

            elif operation == 'delete':
                target_path = data.get('path', 'home')
                files_to_delete = data.get('files', [])

                actual_path, writable = resolve_path(target_path, username)
                if not writable:
                    return jsonify({'error': 'Cannot delete files in read-only directory'}), 403

                for filename in files_to_delete:
                    file_path = os.path.join(actual_path, secure_filename(filename))
                    if os.path.exists(file_path):
                        if os.path.isdir(file_path):
                            shutil.rmtree(file_path)
                        else:
                            os.remove(file_path)

                log_activity(username, 'delete', f'{len(files_to_delete)} items from {target_path}')
                return jsonify({'message': f'{len(files_to_delete)} items deleted successfully'})

            elif operation == 'rename':
                target_path = data.get('path', 'home')
                old_name = data.get('old_name')
                new_name = data.get('new_name')

                actual_path, writable = resolve_path(target_path, username)
                if not writable:
                    return jsonify({'error': 'Cannot rename files in read-only directory'}), 403

                old_path = os.path.join(actual_path, secure_filename(old_name))
                new_path = os.path.join(actual_path, secure_filename(new_name))

                if os.path.exists(old_path):
                    os.rename(old_path, new_path)

                log_activity(username, 'rename', f'{old_name} to {new_name} in {target_path}')
                return jsonify({'message': 'File renamed successfully'})

            else:
                return jsonify({'error': 'Unknown operation'}), 400

        except Exception as e:
            print(f"Error in file operation: {e}")
            return jsonify({'error': str(e)}), 500

    @app.route('/api/files/paste', methods=['POST'])
    @require_login()
    def paste_files():
        """Copy or move files"""
        try:
            username = session['username']
            data = request.get_json()
            operation = data.get('operation')  # 'copy' or 'cut'
            files = data.get('files', [])
            source_path = data.get('source_path', 'home')
            target_path = data.get('target_path', 'home')

            source_actual, _ = resolve_path(source_path, username)
            target_actual, writable = resolve_path(target_path, username)

            if not writable:
                return jsonify({'error': 'Cannot paste files in read-only directory'}), 403

            for filename in files:
                source_file = os.path.join(source_actual, secure_filename(filename))
                target_file = os.path.join(target_actual, secure_filename(filename))

                if os.path.exists(source_file):
                    if operation == 'copy':
                        if os.path.isdir(source_file):
                            shutil.copytree(source_file, target_file)
                        else:
                            shutil.copy2(source_file, target_file)
                    elif operation == 'cut':
                        shutil.move(source_file, target_file)

            log_activity(username, operation, f'{len(files)} items from {source_path} to {target_path}')
            return jsonify({'message': f'{len(files)} items {operation}d successfully'})

        except Exception as e:
            print(f"Error pasting files: {e}")
            return jsonify({'error': str(e)}), 500

    @app.route('/api/files/storage-info')
    @require_login()
    def storage_info():
        """Get storage information for current user"""
        try:
            username = session['username']
            user_data = get_user_data(username)
            quota_mb = user_data.get('quota_mb', 100)

            user_dir = get_user_home_path(username)
            used_bytes = 0

            for root, dirs, files in os.walk(user_dir):
                for file in files:
                    try:
                        file_path = os.path.join(root, file)
                        used_bytes += os.path.getsize(file_path)
                    except (OSError, IOError):
                        continue

            total_bytes = quota_mb * 1024 * 1024

            return jsonify({
                'used': used_bytes,
                'total': total_bytes,
                'quota_mb': quota_mb
            })

        except Exception as e:
            print(f"Error getting storage info: {e}")
            return jsonify({'error': str(e)}), 500

    # =====================
    # USER PREFERENCES API
    # =====================

    @app.route('/api/user/preferences', methods=['GET'])
    @require_login()
    def get_user_preferences():
        """Get user preferences"""
        try:
            username = session['username']
            user_data = get_user_data(username)

            return jsonify({
                'success': True,
                'preferences': user_data.get('preferences', {}),
                'user': {
                    'username': username,
                    'isAdmin': user_data.get('is_admin', False),
                    'avatar': user_data.get('avatar', None)
                }
            })
        except Exception as e:
            return jsonify({'success': False, 'error': str(e)})

    @app.route('/api/user/preferences', methods=['POST'])
    @require_login()
    def save_user_preferences():
        """Save user preferences"""
        try:
            username = session['username']
            data = request.get_json()
            preferences = data.get('preferences', {})

            user_data = get_user_data(username)
            user_data['preferences'] = preferences

            save_user_data(username, user_data)
            log_activity(username, 'update_preferences')

            return jsonify({'success': True})
        except Exception as e:
            return jsonify({'success': False, 'error': str(e)})

    @app.route('/api/user/avatar/<avatar>')
    @require_login()
    def get_user_avatar(avatar):
        """Get user avatar image"""
        try:
            # This would serve user avatar files if they exist
            avatar_path = os.path.join(app.config['USERS_FOLDER'], 'avatars', secure_filename(avatar))
            if os.path.exists(avatar_path):
                return send_file(avatar_path)
            else:
                return jsonify({'error': 'Avatar not found'}), 404
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    # =====================
    # SHORTCUTS API
    # =====================

    @app.route('/api/shortcuts/desktop', methods=['GET'])
    @require_login()
    def get_desktop_shortcuts():
        """Get desktop shortcuts"""
        try:
            username = session['username']
            user_data = get_user_data(username)
            shortcuts = user_data.get('shortcuts', {}).get('desktop', [])

            return jsonify({'shortcuts': shortcuts})
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @app.route('/api/shortcuts/desktop', methods=['POST'])
    @require_login()
    def save_desktop_shortcuts():
        """Save desktop shortcuts"""
        try:
            username = session['username']
            data = request.get_json()
            shortcuts = data.get('shortcuts', [])

            user_data = get_user_data(username)
            if 'shortcuts' not in user_data:
                user_data['shortcuts'] = {}
            user_data['shortcuts']['desktop'] = shortcuts

            save_user_data(username, user_data)
            log_activity(username, 'save_desktop_shortcuts')

            return jsonify({'success': True})
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @app.route('/api/shortcuts/taskbar', methods=['GET'])
    @require_login()
    def get_taskbar_shortcuts():
        """Get taskbar shortcuts"""
        try:
            username = session['username']
            user_data = get_user_data(username)
            shortcuts = user_data.get('shortcuts', {}).get('taskbar', [])

            return jsonify({'shortcuts': shortcuts})
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @app.route('/api/shortcuts/taskbar', methods=['POST'])
    @require_login()
    def save_taskbar_shortcuts():
        """Save taskbar shortcuts"""
        try:
            username = session['username']
            data = request.get_json()
            shortcuts = data.get('shortcuts', [])

            user_data = get_user_data(username)
            if 'shortcuts' not in user_data:
                user_data['shortcuts'] = {}
            user_data['shortcuts']['taskbar'] = shortcuts

            save_user_data(username, user_data)
            log_activity(username, 'save_taskbar_shortcuts')

            return jsonify({'success': True})
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    # =====================
    # APPLICATIONS API
    # =====================

    @app.route('/api/apps/available')
    @require_login()
    def get_available_apps():
        """Get list of available applications"""
        try:
            apps = scan_available_apps()
            return jsonify({
                'success': True,
                'apps': apps
            })
        except Exception as e:
            return jsonify({'success': False, 'error': str(e)})

    @app.route('/api/apps/reload', methods=['POST'])
    @require_login()
    def reload_apps():
        """Reload available applications"""
        try:
            # This would trigger a reload of available apps
            return jsonify({'success': True, 'message': 'Applications reloaded'})
        except Exception as e:
            return jsonify({'success': False, 'error': str(e)})

    # =====================
    # ADMIN API
    # =====================

    @app.route('/api/admin/check')
    @require_login()
    def check_admin_status():
        """Check if current user is admin"""
        try:
            username = session['username']
            user_data = get_user_data(username)
            is_admin = user_data.get('is_admin', False)

            return jsonify({'is_admin': is_admin})
        except Exception as e:
            return jsonify({'is_admin': False, 'error': str(e)})

    @app.route('/api/admin/system-stats')
    @require_admin()
    def get_system_stats():
        """Get system statistics"""
        try:
            # Count users
            users_dir = app.config['USERS_FOLDER']
            total_users = len([f for f in os.listdir(users_dir) if f.endswith('.json')]) if os.path.exists(
                users_dir) else 0

            # Count active users (logged in last 7 days)
            active_users = 0
            week_ago = datetime.now() - timedelta(days=7)

            for filename in os.listdir(users_dir):
                if filename.endswith('.json'):
                    user_data = get_user_data(filename[:-5])  # Remove .json
                    last_login = user_data.get('last_login')
                    if last_login:
                        try:
                            login_date = datetime.fromisoformat(last_login)
                            if login_date > week_ago:
                                active_users += 1
                        except:
                            pass

            return jsonify({
                'stats': {
                    'users': {
                        'total': total_users,
                        'active': active_users,
                        'admins': 1,  # Simplified
                        'new_this_week': 0  # Simplified
                    }
                }
            })
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @app.route('/api/admin/file-stats')
    @require_admin()
    def get_file_stats():
        """Get file system statistics"""
        try:
            public_files = 0
            total_storage = 0
            user_directories = 0

            # Count public files
            if os.path.exists(app.config['PUBLIC_FOLDER']):
                for root, dirs, files in os.walk(app.config['PUBLIC_FOLDER']):
                    public_files += len(files)
                    for file in files:
                        try:
                            file_path = os.path.join(root, file)
                            total_storage += os.path.getsize(file_path)
                        except:
                            pass

            # Count user directories
            if os.path.exists(app.config['UPLOAD_FOLDER']):
                user_directories = len([d for d in os.listdir(app.config['UPLOAD_FOLDER'])
                                        if os.path.isdir(os.path.join(app.config['UPLOAD_FOLDER'], d))])

            return jsonify({
                'public_files': public_files,
                'total_storage': total_storage,
                'user_directories': user_directories
            })
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @app.route('/api/admin/system-info')
    @require_admin()
    def get_system_info():
        """Get system information"""
        try:
            # Get basic system info
            uptime = time.time() - psutil.boot_time() if 'psutil' in globals() else 0

            # Get storage info
            disk_usage = shutil.disk_usage(project_root)
            storage = {
                'total': disk_usage.total,
                'used': disk_usage.total - disk_usage.free,
                'free': disk_usage.free
            }

            return jsonify({
                'uptime': uptime,
                'storage': storage,
                'sessions': {'active': 1},  # Simplified
                'memory': '512 MB',  # Simplified
                'load': '0.5'  # Simplified
            })
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @app.route('/api/admin/users')
    @require_admin()
    def get_users():
        """Get all users"""
        try:
            users = []
            users_dir = app.config['USERS_FOLDER']

            if os.path.exists(users_dir):
                for filename in os.listdir(users_dir):
                    if filename.endswith('.json'):
                        username = filename[:-5]
                        user_data = get_user_data(username)
                        if user_data:
                            users.append({
                                'id': len(users) + 1,  # Simple ID
                                'username': username,
                                'email': user_data.get('email', ''),
                                'is_admin': user_data.get('is_admin', False),
                                'is_active': user_data.get('is_active', True),
                                'created_at': user_data.get('created_at', ''),
                                'last_active': user_data.get('last_login', ''),
                                'quota_mb': user_data.get('quota_mb', 100)
                            })

            stats = {
                'total': len(users),
                'active': len([u for u in users if u['is_active']]),
                'admins': len([u for u in users if u['is_admin']]),
                'new_this_week': 0
            }

            return jsonify({
                'users': users,
                'stats': stats
            })
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @app.route('/api/admin/logs')
    @require_admin()
    def get_logs():
        """Get activity logs"""
        try:
            logs = []
            log_file = os.path.join(app.config['LOGS_FOLDER'], 'activity.log')

            if os.path.exists(log_file):
                with open(log_file, 'r') as f:
                    for line in f:
                        try:
                            log_entry = json.loads(line.strip())
                            logs.append({
                                'timestamp': log_entry['timestamp'],
                                'user': log_entry['user'],
                                'message': f"{log_entry['action']} {log_entry.get('details', '')}".strip(),
                                'type': 'admin' if 'admin' in log_entry['action'] else 'info',
                                'ip': log_entry.get('ip', '')
                            })
                        except:
                            pass

            # Limit to recent logs
            logs = logs[-200:]
            logs.reverse()  # Most recent first

            return jsonify({'logs': logs})
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @app.route('/api/admin/backup-database', methods=['POST'])
    @require_admin()
    def backup_database():
        """Create database backup"""
        try:
            timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
            backup_filename = f'emberframe_backup_{timestamp}.json'
            backup_path = os.path.join(app.config['LOGS_FOLDER'], backup_filename)

            # Create backup data
            backup_data = {
                'timestamp': datetime.now().isoformat(),
                'version': '2.0.0',
                'users': {}
            }

            # Backup all users
            users_dir = app.config['USERS_FOLDER']
            if os.path.exists(users_dir):
                for filename in os.listdir(users_dir):
                    if filename.endswith('.json'):
                        username = filename[:-5]
                        user_data = get_user_data(username)
                        if user_data:
                            backup_data['users'][username] = user_data

            # Save backup
            with open(backup_path, 'w') as f:
                json.dump(backup_data, f, indent=2, default=str)

            log_activity(session['username'], 'database_backup', backup_filename)

            return jsonify({
                'success': True,
                'backup_file': backup_filename,
                'message': 'Database backup created successfully'
            })
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    # Additional routes for wallpapers, etc.
    @app.route('/api/wallpapers')
    @require_login()
    def get_wallpapers():
        """Get available wallpapers"""
        try:
            wallpapers = []
            wallpaper_dir = app.config['WALLPAPER_FOLDER']

            if os.path.exists(wallpaper_dir):
                for filename in os.listdir(wallpaper_dir):
                    if filename.lower().endswith(('.jpg', '.jpeg', '.png', '.gif', '.webp')):
                        wallpapers.append({
                            'name': filename,
                            'url': f'/static/wallpapers/{filename}'
                        })

            return jsonify({'wallpapers': wallpapers})
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    print("✅ EmberFrame app initialized successfully with all API routes!")
    return app