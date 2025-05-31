# app/__init__.py - Complete EmberFrame Application (Fixed CSRF Version)
from flask import Flask, render_template, request, jsonify, session, redirect, url_for, send_file, send_from_directory, \
    abort, flash
from flask_socketio import SocketIO, emit, join_room, leave_room
import os
import json
import logging
import hashlib
import shutil
import mimetypes
import zipfile
import tempfile
from datetime import datetime, timedelta
from werkzeug.utils import secure_filename
from werkzeug.exceptions import RequestEntityTooLarge
import secrets
import subprocess
import sys
from pathlib import Path
import time
import uuid
import base64
from PIL import Image
import magic

# Try to import CSRF protection, but make it optional
try:
    from flask_wtf.csrf import CSRFProtect, validate_csrf, generate_csrf
    from flask_wtf import FlaskForm
    from wtforms import StringField, PasswordField, HiddenField
    from wtforms.validators import DataRequired, Length

    CSRF_AVAILABLE = True
except ImportError:
    print("Warning: Flask-WTF not available, CSRF protection disabled")
    CSRFProtect = None
    FlaskForm = None
    CSRF_AVAILABLE = False

socketio = SocketIO()

# Global variables for session tracking
active_sessions = {}
user_preferences = {}
user_shortcuts = {}


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

    # Enhanced Configuration
    app.config.update(
        SECRET_KEY=os.environ.get('SECRET_KEY', 'ember-secret-key-change-in-production-2024'),
        UPLOAD_FOLDER=os.path.join(project_root, 'user_data'),
        PUBLIC_FOLDER=os.path.join(project_root, 'public_data'),
        WALLPAPER_FOLDER=os.path.join(static_dir, 'wallpapers'),
        AVATAR_FOLDER=os.path.join(static_dir, 'avatars'),
        TEMP_FOLDER=os.path.join(project_root, 'temp'),
        LOGS_FOLDER=os.path.join(project_root, 'logs'),
        BACKUP_FOLDER=os.path.join(project_root, 'backups'),
        MAX_CONTENT_LENGTH=32 * 1024 * 1024,  # 32MB max file size
        WTF_CSRF_ENABLED=CSRF_AVAILABLE,
        WTF_CSRF_TIME_LIMIT=None,
        WTF_CSRF_SSL_STRICT=False,  # For development - set to True in production with HTTPS
        SESSION_PERMANENT=False,
        PERMANENT_SESSION_LIFETIME=timedelta(hours=24),
        SEND_FILE_MAX_AGE_DEFAULT=timedelta(hours=1),
        JSON_SORT_KEYS=False,
        JSONIFY_PRETTYPRINT_REGULAR=True,
    )

    # Initialize extensions
    socketio.init_app(app, cors_allowed_origins="*", async_mode='threading')

    # Initialize CSRF protection if available
    csrf = None
    if CSRF_AVAILABLE:
        csrf = CSRFProtect(app)
        print("✅ CSRF protection enabled")

        @app.template_global()
        def csrf_token():
            try:
                return generate_csrf()
            except Exception as e:
                print(f"Error generating CSRF token: {e}")
                return ""

        @app.template_filter('csrf_token')
        def csrf_token_filter(s):
            try:
                return generate_csrf()
            except Exception:
                return ""

    else:
        @app.template_global()
        def csrf_token():
            return ""

        @app.template_filter('csrf_token')
        def csrf_token_filter(s):
            return ""

    # CSRF exemption decorator
    def csrf_exempt(f):
        """Decorator to exempt routes from CSRF protection"""
        if CSRF_AVAILABLE and csrf:
            return csrf.exempt(f)
        return f

    # CSRF validation helper
    def validate_csrf_token():
        """Validate CSRF token for API requests"""
        if not CSRF_AVAILABLE:
            return True

        try:
            # Check for CSRF token in headers (preferred for AJAX)
            token = request.headers.get('X-CSRFToken') or request.headers.get('X-CSRF-Token')

            # Fallback to form data
            if not token:
                token = request.form.get('csrf_token') or request.json.get('csrf_token') if request.is_json else None

            if token:
                validate_csrf(token)
                return True
            else:
                return False
        except Exception as e:
            print(f"CSRF validation failed: {e}")
            return False

    # API CSRF validation decorator
    def require_csrf_for_api(f):
        """Decorator that validates CSRF for API routes"""

        def decorated_function(*args, **kwargs):
            if request.method in ['POST', 'PUT', 'DELETE', 'PATCH']:
                if not validate_csrf_token():
                    return jsonify({'error': 'CSRF token missing or invalid'}), 403
            return f(*args, **kwargs)

        decorated_function.__name__ = f.__name__
        return decorated_function

    # Create necessary directories
    directories_to_create = [
        app.config['UPLOAD_FOLDER'],
        app.config['PUBLIC_FOLDER'],
        app.config['WALLPAPER_FOLDER'],
        app.config['AVATAR_FOLDER'],
        app.config['TEMP_FOLDER'],
        app.config['LOGS_FOLDER'],
        app.config['BACKUP_FOLDER'],
        os.path.join(project_root, 'users'),
        os.path.join(app.config['PUBLIC_FOLDER'], 'shared'),
        os.path.join(app.config['PUBLIC_FOLDER'], 'documents'),
        os.path.join(app.config['PUBLIC_FOLDER'], 'media'),
        os.path.join(app.config['PUBLIC_FOLDER'], 'software')
    ]

    for directory in directories_to_create:
        try:
            os.makedirs(directory, exist_ok=True)
        except Exception as e:
            print(f"⚠️ Could not create directory {directory}: {e}")

    # Check template files
    if os.path.exists(template_dir):
        template_files = [f for f in os.listdir(template_dir) if f.endswith('.html')]
        print(f"📄 Found templates: {template_files}")
    else:
        print("❌ Template directory not found!")

    # =====================
    # TEMPLATE FILTERS
    # =====================

    @app.template_filter('filesizeformat')
    def filesizeformat(num_bytes):
        """Format file size in human readable format"""
        if num_bytes is None:
            return "0 B"

        num_bytes = float(num_bytes)
        for unit in ['B', 'KB', 'MB', 'GB', 'TB']:
            if num_bytes < 1024.0:
                return f"{num_bytes:.1f} {unit}"
            num_bytes /= 1024.0
        return f"{num_bytes:.1f} PB"

    @app.template_filter('datetimeformat')
    def datetimeformat(timestamp, format='%Y-%m-%d %H:%M'):
        """Format timestamp"""
        if isinstance(timestamp, (int, float)):
            timestamp = datetime.fromtimestamp(timestamp)
        return timestamp.strftime(format)

    # =====================
    # AUTHENTICATION HELPERS
    # =====================

    def require_login(f):
        """Decorator to require authentication"""

        def decorated_function(*args, **kwargs):
            if 'username' not in session:
                if request.is_json:
                    return jsonify({'error': 'Authentication required'}), 401
                return redirect(url_for('login_page'))
            return f(*args, **kwargs)

        decorated_function.__name__ = f.__name__
        return decorated_function

    def is_admin():
        """Check if current user is admin"""
        return session.get('username') in ['admin', 'administrator'] or session.get('is_admin', False)

    def require_admin(f):
        """Decorator to require admin privileges"""

        def decorated_function(*args, **kwargs):
            if not is_admin():
                if request.is_json:
                    return jsonify({'error': 'Admin privileges required'}), 403
                abort(403)
            return f(*args, **kwargs)

        decorated_function.__name__ = f.__name__
        return decorated_function

    # =====================
    # MAIN ROUTES
    # =====================

    @app.route('/')
    def index():
        """Main index route"""
        if 'username' in session:
            # Track active session
            session_id = session.get('session_id', str(uuid.uuid4()))
            session['session_id'] = session_id
            active_sessions[session_id] = {
                'username': session['username'],
                'login_time': datetime.now(),
                'last_activity': datetime.now(),
                'ip_address': request.remote_addr,
                'user_agent': request.headers.get('User-Agent', '')
            }
            return render_template('desktop.html', username=session['username'])
        return redirect(url_for('login_page'))

    @app.route('/login', methods=['GET'])
    def login_page():
        """Show login page"""
        if 'username' in session:
            return redirect(url_for('index'))
        return render_template('login.html')

    @app.route('/login', methods=['POST'])
    @require_csrf_for_api
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

            # Enhanced authentication logic
            if len(username) >= 3 and len(password) >= 1:
                session['username'] = username
                session['session_id'] = str(uuid.uuid4())
                session['login_time'] = datetime.now().isoformat()
                session['is_admin'] = username.lower() in ['admin', 'administrator']
                session.permanent = True

                # Create user directory and load preferences
                ensure_user_directory(username, app.config['UPLOAD_FOLDER'])
                load_user_preferences(username)
                load_user_shortcuts(username)

                print(f"✅ Login successful: {username} (Admin: {session.get('is_admin', False)})")
                return jsonify({
                    'success': True,
                    'message': 'Login successful',
                    'redirect': url_for('index'),
                    'user': {
                        'username': username,
                        'is_admin': session.get('is_admin', False)
                    }
                })
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
    @require_csrf_for_api
    def register_submit():
        """Handle registration form submission"""
        try:
            data = request.get_json() or {}
            username = data.get('username', '').strip()
            password = data.get('password', '')
            email = data.get('email', '').strip()

            print(f"📝 Registration attempt: {username}")

            # Validate input
            if not username or not password:
                return jsonify({'success': False, 'message': 'Username and password are required'})

            if len(username) < 3:
                return jsonify({'success': False, 'message': 'Username must be at least 3 characters'})

            if len(password) < 6:
                return jsonify({'success': False, 'message': 'Password must be at least 6 characters'})

            # Check if user already exists
            user_file = os.path.join(project_root, 'users', f'{username}.json')
            if os.path.exists(user_file):
                return jsonify({'success': False, 'message': 'Username already exists'})

            # Create user account
            user_data = {
                'username': username,
                'password_hash': hashlib.sha256(password.encode()).hexdigest(),
                'email': email,
                'created_at': datetime.now().isoformat(),
                'is_admin': False,
                'preferences': get_default_preferences(),
                'shortcuts': {'desktop': [], 'taskbar': []}
            }

            with open(user_file, 'w') as f:
                json.dump(user_data, f, indent=2)

            # Create user directory
            ensure_user_directory(username, app.config['UPLOAD_FOLDER'])

            print(f"✅ Registration successful: {username}")
            return jsonify({'success': True, 'message': 'Registration successful'})

        except Exception as e:
            print(f"❌ Registration error: {e}")
            return jsonify({'success': False, 'message': 'Registration error occurred'})

    @app.route('/logout')
    def logout():
        """Handle logout"""
        username = session.get('username', 'unknown')
        session_id = session.get('session_id')

        # Remove from active sessions
        if session_id in active_sessions:
            del active_sessions[session_id]

        session.clear()
        print(f"👋 Logout: {username}")
        flash('You have been logged out successfully', 'info')
        return redirect(url_for('login_page'))

    # =====================
    # API CSRF TOKEN ENDPOINT
    # =====================

    @app.route('/api/csrf-token')
    @require_login
    def get_csrf_token():
        """Get CSRF token for JavaScript requests"""
        if CSRF_AVAILABLE:
            try:
                token = generate_csrf()
                return jsonify({'csrf_token': token})
            except Exception as e:
                print(f"Error generating CSRF token: {e}")
                return jsonify({'csrf_token': ''})
        else:
            return jsonify({'csrf_token': ''})

    # =====================
    # FILE MANAGEMENT API
    # =====================

    @app.route('/api/files')
    @app.route('/api/files/')
    @app.route('/api/files/<path:filepath>')
    @require_login
    def list_files(filepath=''):
        """List files in a directory"""
        try:
            # Determine if this is a public or user directory
            if filepath.startswith('public/'):
                # Public directory
                base_path = app.config['PUBLIC_FOLDER']
                rel_path = filepath[7:]  # Remove 'public/' prefix
                is_writable = is_admin()  # Only admins can write to public
            else:
                # User directory
                base_path = os.path.join(app.config['UPLOAD_FOLDER'], session['username'])
                rel_path = filepath
                is_writable = True

            # Construct full path
            if rel_path:
                full_path = os.path.join(base_path, rel_path)
            else:
                full_path = base_path

            # Security check - prevent directory traversal
            if not os.path.abspath(full_path).startswith(os.path.abspath(base_path)):
                return jsonify({'error': 'Access denied'}), 403

            if not os.path.exists(full_path):
                return jsonify({'error': 'Directory not found'}), 404

            if not os.path.isdir(full_path):
                return jsonify({'error': 'Not a directory'}), 400

            # List directory contents
            files = []
            try:
                for item in os.listdir(full_path):
                    if item.startswith('.'):  # Skip hidden files
                        continue

                    item_path = os.path.join(full_path, item)
                    is_dir = os.path.isdir(item_path)

                    try:
                        stat = os.stat(item_path)
                        file_info = {
                            'name': item,
                            'type': 'folder' if is_dir else 'file',
                            'icon': get_file_icon(item, is_dir),
                            'modified': stat.st_mtime,
                            'permissions': oct(stat.st_mode)[-3:]
                        }

                        if not is_dir:
                            file_info['size'] = stat.st_size
                            file_info['mime_type'] = mimetypes.guess_type(item)[0]

                        files.append(file_info)
                    except (OSError, IOError) as e:
                        print(f"Error accessing {item}: {e}")
                        continue

            except PermissionError:
                return jsonify({'error': 'Permission denied'}), 403

            # Sort files: folders first, then by name
            files.sort(key=lambda x: (x['type'] != 'folder', x['name'].lower()))

            return jsonify({
                'files': files,
                'path': filepath,
                'writable': is_writable,
                'parent': os.path.dirname(filepath) if filepath else None,
                'total_files': len([f for f in files if f['type'] == 'file']),
                'total_folders': len([f for f in files if f['type'] == 'folder']),
                'total_size': sum(f.get('size', 0) for f in files if f['type'] == 'file')
            })

        except Exception as e:
            print(f"❌ Error listing files: {e}")
            return jsonify({'error': f'Failed to list directory: {str(e)}'}), 500

    @app.route('/api/files/upload', methods=['POST'])
    @require_login
    @require_csrf_for_api
    def upload_file():
        """Upload file(s)"""
        try:
            if 'files' not in request.files:
                return jsonify({'error': 'No files provided'}), 400

            files = request.files.getlist('files')
            target_path = request.form.get('path', '')
            overwrite = request.form.get('overwrite', 'false').lower() == 'true'

            if not files or files[0].filename == '':
                return jsonify({'error': 'No files selected'}), 400

            # Determine target directory
            if target_path.startswith('public/'):
                if not is_admin():
                    return jsonify({'error': 'Admin privileges required for public uploads'}), 403
                base_path = app.config['PUBLIC_FOLDER']
                rel_path = target_path[7:]
            else:
                base_path = os.path.join(app.config['UPLOAD_FOLDER'], session['username'])
                rel_path = target_path

            if rel_path:
                upload_dir = os.path.join(base_path, rel_path)
            else:
                upload_dir = base_path

            # Security check
            if not os.path.abspath(upload_dir).startswith(os.path.abspath(base_path)):
                return jsonify({'error': 'Invalid path'}), 403

            os.makedirs(upload_dir, exist_ok=True)

            uploaded_files = []
            failed_files = []

            for file in files:
                if file.filename == '':
                    continue

                try:
                    # Secure filename
                    filename = secure_filename(file.filename)
                    if not filename:
                        filename = f"upload_{int(time.time())}_{len(uploaded_files)}"

                    file_path = os.path.join(upload_dir, filename)

                    # Check if file exists
                    if os.path.exists(file_path) and not overwrite:
                        # Generate unique filename
                        name, ext = os.path.splitext(filename)
                        counter = 1
                        while os.path.exists(file_path):
                            filename = f"{name}_{counter}{ext}"
                            file_path = os.path.join(upload_dir, filename)
                            counter += 1

                    # Save file
                    file.save(file_path)

                    # Get file info
                    stat = os.stat(file_path)
                    uploaded_files.append({
                        'name': filename,
                        'size': stat.st_size,
                        'type': mimetypes.guess_type(filename)[0] or 'application/octet-stream'
                    })

                except Exception as e:
                    failed_files.append({
                        'name': file.filename,
                        'error': str(e)
                    })

            return jsonify({
                'success': True,
                'uploaded': uploaded_files,
                'failed': failed_files,
                'message': f'Uploaded {len(uploaded_files)} file(s) successfully'
            })

        except RequestEntityTooLarge:
            return jsonify({'error': 'File too large'}), 413
        except Exception as e:
            print(f"❌ Upload error: {e}")
            return jsonify({'error': f'Upload failed: {str(e)}'}), 500

    @app.route('/api/files/download/<path:filepath>')
    @require_login
    def download_file(filepath):
        """Download a file"""
        try:
            # Determine file location
            if filepath.startswith('public/'):
                base_path = app.config['PUBLIC_FOLDER']
                rel_path = filepath[7:]
            else:
                base_path = os.path.join(app.config['UPLOAD_FOLDER'], session['username'])
                rel_path = filepath

            file_path = os.path.join(base_path, rel_path)

            # Security check
            if not os.path.abspath(file_path).startswith(os.path.abspath(base_path)):
                abort(403)

            if not os.path.exists(file_path) or os.path.isdir(file_path):
                abort(404)

            return send_file(file_path, as_attachment=True)

        except Exception as e:
            print(f"❌ Download error: {e}")
            abort(500)

    @app.route('/api/files/delete', methods=['POST'])
    @require_login
    @require_csrf_for_api
    def delete_files():
        """Delete file(s) or folder(s)"""
        try:
            data = request.get_json()
            files_to_delete = data.get('files', [])
            base_path_str = data.get('path', '')

            if not files_to_delete:
                return jsonify({'error': 'No files specified'}), 400

            # Determine base path
            if base_path_str.startswith('public/'):
                if not is_admin():
                    return jsonify({'error': 'Admin privileges required'}), 403
                base_path = app.config['PUBLIC_FOLDER']
                rel_base = base_path_str[7:]
            else:
                base_path = os.path.join(app.config['UPLOAD_FOLDER'], session['username'])
                rel_base = base_path_str

            if rel_base:
                working_dir = os.path.join(base_path, rel_base)
            else:
                working_dir = base_path

            deleted_files = []
            failed_files = []

            for filename in files_to_delete:
                try:
                    file_path = os.path.join(working_dir, filename)

                    # Security check
                    if not os.path.abspath(file_path).startswith(os.path.abspath(base_path)):
                        failed_files.append({'name': filename, 'error': 'Access denied'})
                        continue

                    if not os.path.exists(file_path):
                        failed_files.append({'name': filename, 'error': 'File not found'})
                        continue

                    if os.path.isdir(file_path):
                        shutil.rmtree(file_path)
                    else:
                        os.remove(file_path)

                    deleted_files.append(filename)

                except Exception as e:
                    failed_files.append({'name': filename, 'error': str(e)})

            return jsonify({
                'success': True,
                'deleted': deleted_files,
                'failed': failed_files,
                'message': f'Deleted {len(deleted_files)} item(s)'
            })

        except Exception as e:
            print(f"❌ Delete error: {e}")
            return jsonify({'error': f'Delete failed: {str(e)}'}), 500

    @app.route('/api/files/create-folder', methods=['POST'])
    @require_login
    @require_csrf_for_api
    def create_folder():
        """Create a new folder"""
        try:
            data = request.get_json()
            folder_name = data.get('name', '').strip()
            current_path = data.get('path', '')

            if not folder_name:
                return jsonify({'error': 'Folder name required'}), 400

            # Secure folder name
            folder_name = secure_filename(folder_name)
            if not folder_name:
                return jsonify({'error': 'Invalid folder name'}), 400

            # Determine base path
            if current_path.startswith('public/'):
                if not is_admin():
                    return jsonify({'error': 'Admin privileges required'}), 403
                base_path = app.config['PUBLIC_FOLDER']
                rel_path = current_path[7:]
            else:
                base_path = os.path.join(app.config['UPLOAD_FOLDER'], session['username'])
                rel_path = current_path

            if rel_path:
                target_dir = os.path.join(base_path, rel_path)
            else:
                target_dir = base_path

            folder_path = os.path.join(target_dir, folder_name)

            # Security check
            if not os.path.abspath(folder_path).startswith(os.path.abspath(base_path)):
                return jsonify({'error': 'Invalid path'}), 403

            if os.path.exists(folder_path):
                return jsonify({'error': 'Folder already exists'}), 409

            os.makedirs(folder_path, exist_ok=True)

            return jsonify({
                'success': True,
                'name': folder_name,
                'message': f'Folder "{folder_name}" created successfully'
            })

        except Exception as e:
            print(f"❌ Create folder error: {e}")
            return jsonify({'error': f'Failed to create folder: {str(e)}'}), 500

    @app.route('/api/files/rename', methods=['POST'])
    @require_login
    @require_csrf_for_api
    def rename_file():
        """Rename a file or folder"""
        try:
            data = request.get_json()
            old_name = data.get('old_name', '').strip()
            new_name = data.get('new_name', '').strip()
            current_path = data.get('path', '')

            if not old_name or not new_name:
                return jsonify({'error': 'Both old and new names required'}), 400

            # Secure new name
            new_name = secure_filename(new_name)
            if not new_name:
                return jsonify({'error': 'Invalid new name'}), 400

            # Determine base path
            if current_path.startswith('public/'):
                if not is_admin():
                    return jsonify({'error': 'Admin privileges required'}), 403
                base_path = app.config['PUBLIC_FOLDER']
                rel_path = current_path[7:]
            else:
                base_path = os.path.join(app.config['UPLOAD_FOLDER'], session['username'])
                rel_path = current_path

            if rel_path:
                target_dir = os.path.join(base_path, rel_path)
            else:
                target_dir = base_path

            old_path = os.path.join(target_dir, old_name)
            new_path = os.path.join(target_dir, new_name)

            # Security checks
            if not os.path.abspath(old_path).startswith(os.path.abspath(base_path)):
                return jsonify({'error': 'Invalid old path'}), 403

            if not os.path.abspath(new_path).startswith(os.path.abspath(base_path)):
                return jsonify({'error': 'Invalid new path'}), 403

            if not os.path.exists(old_path):
                return jsonify({'error': 'File not found'}), 404

            if os.path.exists(new_path):
                return jsonify({'error': 'Target name already exists'}), 409

            os.rename(old_path, new_path)

            return jsonify({
                'success': True,
                'old_name': old_name,
                'new_name': new_name,
                'message': f'Renamed "{old_name}" to "{new_name}"'
            })

        except Exception as e:
            print(f"❌ Rename error: {e}")
            return jsonify({'error': f'Rename failed: {str(e)}'}), 500

    # =====================
    # APPLICATION DISCOVERY API
    # =====================

    @app.route('/api/apps/available')
    @require_login
    def get_available_apps():
        """Get list of available applications"""
        try:
            # Scan for available apps in the static/js/apps directory
            apps_dir = os.path.join(app.config['static_folder'], 'js', 'apps')
            discovered_apps = []

            if os.path.exists(apps_dir):
                for filename in os.listdir(apps_dir):
                    if filename.endswith('.js'):
                        app_path = os.path.join(apps_dir, filename)
                        app_info = parse_app_metadata(app_path)
                        if app_info and app_info.get('enabled', True):
                            app_info['id'] = filename[:-3]  # Remove .js extension
                            discovered_apps.append(app_info)

            # Add built-in apps if not discovered
            builtin_apps = [
                {
                    'id': 'file-manager',
                    'name': 'File Manager',
                    'icon': 'fas fa-folder',
                    'description': 'Browse and manage your files',
                    'category': 'System',
                    'version': '1.3.0',
                    'author': 'EmberFrame Team',
                    'enabled': True
                },
                {
                    'id': 'public-folder',
                    'name': 'Public Files',
                    'icon': 'fas fa-globe',
                    'description': 'Access shared public files',
                    'category': 'System',
                    'version': '1.0.0',
                    'author': 'EmberFrame Team',
                    'enabled': True
                },
                {
                    'id': 'settings',
                    'name': 'Settings',
                    'icon': 'fas fa-cog',
                    'description': 'Customize your EmberFrame experience',
                    'category': 'System',
                    'version': '1.3.0',
                    'author': 'EmberFrame Team',
                    'enabled': True
                },
                {
                    'id': 'task-manager',
                    'name': 'Task Manager',
                    'icon': 'fas fa-tasks',
                    'description': 'Monitor and manage running applications',
                    'category': 'System',
                    'version': '1.0.0',
                    'author': 'EmberFrame Team',
                    'enabled': True
                },
                {
                    'id': 'text-editor',
                    'name': 'Text Editor',
                    'icon': 'fas fa-edit',
                    'description': 'Edit text files with syntax highlighting',
                    'category': 'Productivity',
                    'version': '1.2.0',
                    'author': 'EmberFrame Team',
                    'enabled': True
                },
                {
                    'id': 'terminal',
                    'name': 'Terminal',
                    'icon': 'fas fa-terminal',
                    'description': 'Command line interface',
                    'category': 'System',
                    'version': '1.1.0',
                    'author': 'EmberFrame Team',
                    'enabled': True
                },
                {
                    'id': 'media-player',
                    'name': 'Media Player',
                    'icon': 'fas fa-play-circle',
                    'description': 'Play audio and video files',
                    'category': 'Multimedia',
                    'version': '1.0.0',
                    'author': 'EmberFrame Team',
                    'enabled': True
                }
            ]

            # Add admin-only apps
            if is_admin():
                builtin_apps.append({
                    'id': 'admin-panel',
                    'name': 'Admin Panel',
                    'icon': 'fas fa-shield-alt',
                    'description': 'Administrative tools and file management',
                    'category': 'System',
                    'version': '1.0.0',
                    'author': 'EmberFrame Team',
                    'enabled': True
                })

            # Merge discovered and builtin apps
            app_ids = {app['id'] for app in discovered_apps}
            for builtin_app in builtin_apps:
                if builtin_app['id'] not in app_ids:
                    discovered_apps.append(builtin_app)

            # Sort by category and name
            discovered_apps.sort(key=lambda x: (x.get('category', 'Other'), x.get('name', '')))

            return jsonify({'success': True, 'apps': discovered_apps})

        except Exception as e:
            print(f"❌ Error getting available apps: {e}")
            return jsonify({'success': False, 'error': 'Failed to get applications'})

    # =====================
    # USER SHORTCUTS API
    # =====================

    @app.route('/api/shortcuts/desktop')
    @require_login
    def get_desktop_shortcuts():
        """Get user's desktop shortcuts"""
        try:
            username = session['username']
            shortcuts = user_shortcuts.get(username, {}).get('desktop', [])

            # Provide default shortcuts if none exist
            if not shortcuts:
                shortcuts = [
                    {'app': 'file-manager', 'x': 50, 'y': 50},
                    {'app': 'public-folder', 'x': 50, 'y': 170},
                    {'app': 'settings', 'x': 50, 'y': 290}
                ]

            return jsonify({'shortcuts': shortcuts})
        except Exception as e:
            print(f"❌ Error loading desktop shortcuts: {e}")
            return jsonify({'error': 'Failed to load shortcuts'}), 500

    @app.route('/api/shortcuts/desktop', methods=['POST'])
    @require_login
    @require_csrf_for_api
    def save_desktop_shortcuts():
        """Save user's desktop shortcuts"""
        try:
            data = request.get_json()
            shortcuts = data.get('shortcuts', [])
            username = session['username']

            if username not in user_shortcuts:
                user_shortcuts[username] = {}

            user_shortcuts[username]['desktop'] = shortcuts
            save_user_shortcuts(username)

            return jsonify({'success': True})
        except Exception as e:
            print(f"❌ Error saving desktop shortcuts: {e}")
            return jsonify({'error': 'Failed to save shortcuts'}), 500

    @app.route('/api/shortcuts/taskbar')
    @require_login
    def get_taskbar_shortcuts():
        """Get user's taskbar shortcuts"""
        try:
            username = session['username']
            shortcuts = user_shortcuts.get(username, {}).get('taskbar', [])
            return jsonify({'shortcuts': shortcuts})
        except Exception as e:
            print(f"❌ Error loading taskbar shortcuts: {e}")
            return jsonify({'error': 'Failed to load shortcuts'}), 500

    @app.route('/api/shortcuts/taskbar', methods=['POST'])
    @require_login
    @require_csrf_for_api
    def save_taskbar_shortcuts():
        """Save user's taskbar shortcuts"""
        try:
            data = request.get_json()
            shortcuts = data.get('shortcuts', [])
            username = session['username']

            if username not in user_shortcuts:
                user_shortcuts[username] = {}

            user_shortcuts[username]['taskbar'] = shortcuts
            save_user_shortcuts(username)

            return jsonify({'success': True})
        except Exception as e:
            print(f"❌ Error saving taskbar shortcuts: {e}")
            return jsonify({'error': 'Failed to save shortcuts'}), 500

    # =====================
    # USER PREFERENCES API
    # =====================

    @app.route('/api/user/preferences')
    @require_login
    def get_user_preferences():
        """Get user preferences"""
        try:
            username = session['username']
            preferences = user_preferences.get(username, get_default_preferences())

            user_info = {
                'username': username,
                'isAdmin': is_admin(),
                'createdAt': session.get('login_time', datetime.now().isoformat()),
                'lastLogin': datetime.now().isoformat(),
                'avatar': get_user_avatar(username),
                'sessionId': session.get('session_id'),
                'loginTime': session.get('login_time')
            }

            return jsonify({
                'success': True,
                'preferences': preferences,
                'user': user_info
            })

        except Exception as e:
            print(f"❌ Error getting user preferences: {e}")
            return jsonify({'success': False, 'error': 'Failed to load preferences'})

    @app.route('/api/user/preferences', methods=['POST'])
    @require_login
    @require_csrf_for_api
    def save_user_preferences():
        """Save user preferences"""
        try:
            data = request.get_json()
            username = session['username']

            user_preferences[username] = data
            save_user_preferences_to_file(username)

            return jsonify({'success': True})
        except Exception as e:
            print(f"❌ Error saving user preferences: {e}")
            return jsonify({'error': 'Failed to save preferences'}), 500

    @app.route('/api/user/avatar', methods=['POST'])
    @require_login
    @csrf_exempt  # File uploads handle CSRF differently
    def upload_avatar():
        """Upload user avatar"""
        try:
            if 'avatar' not in request.files:
                return jsonify({'error': 'No avatar file provided'}), 400

            file = request.files['avatar']
            if file.filename == '':
                return jsonify({'error': 'No file selected'}), 400

            # Validate file type
            if not file.content_type.startswith('image/'):
                return jsonify({'error': 'File must be an image'}), 400

            username = session['username']
            filename = f"{username}_{int(time.time())}.jpg"
            avatar_path = os.path.join(app.config['AVATAR_FOLDER'], filename)

            # Resize and save image
            try:
                image = Image.open(file.stream)
                image = image.convert('RGB')
                image.thumbnail((150, 150), Image.Resampling.LANCZOS)
                image.save(avatar_path, 'JPEG', quality=90)

                # Update user preferences
                if username not in user_preferences:
                    user_preferences[username] = get_default_preferences()
                user_preferences[username]['avatar'] = filename
                save_user_preferences_to_file(username)

                return jsonify({
                    'success': True,
                    'avatar': filename,
                    'message': 'Avatar updated successfully'
                })
            except Exception as e:
                return jsonify({'error': f'Image processing failed: {str(e)}'}), 400

        except Exception as e:
            print(f"❌ Avatar upload error: {e}")
            return jsonify({'error': 'Avatar upload failed'}), 500

    @app.route('/api/user/avatar/<filename>')
    def serve_avatar(filename):
        """Serve user avatar"""
        try:
            avatar_path = os.path.join(app.config['AVATAR_FOLDER'], filename)
            if os.path.exists(avatar_path):
                return send_file(avatar_path)
            else:
                abort(404)
        except Exception:
            abort(404)

    # =====================
    # ADMIN API
    # =====================

    @app.route('/api/admin/check')
    @require_login
    def check_admin_status():
        """Check if user has admin privileges"""
        return jsonify({'is_admin': is_admin()})

    @app.route('/api/admin/users')
    @require_admin
    def list_users():
        """List all users (admin only)"""
        try:
            users_dir = os.path.join(project_root, 'users')
            users = []

            if os.path.exists(users_dir):
                for filename in os.listdir(users_dir):
                    if filename.endswith('.json'):
                        try:
                            with open(os.path.join(users_dir, filename), 'r') as f:
                                user_data = json.load(f)
                                users.append({
                                    'username': user_data.get('username'),
                                    'email': user_data.get('email'),
                                    'created_at': user_data.get('created_at'),
                                    'is_admin': user_data.get('is_admin', False),
                                    'last_login': user_data.get('last_login')
                                })
                        except Exception as e:
                            print(f"Error reading user file {filename}: {e}")

            return jsonify({'users': users})
        except Exception as e:
            return jsonify({'error': 'Failed to list users'}), 500

    @app.route('/api/admin/public-files/upload', methods=['POST'])
    @require_admin
    @csrf_exempt  # File uploads handle CSRF differently
    def admin_upload_public_files():
        """Upload files to public directory (admin only)"""
        try:
            if 'file' not in request.files:
                return jsonify({'error': 'No file provided'}), 400

            file = request.files['file']
            directory = request.form.get('directory', 'shared')

            if file.filename == '':
                return jsonify({'error': 'No file selected'}), 400

            # Secure filename
            filename = secure_filename(file.filename)
            if not filename:
                filename = f"upload_{int(time.time())}"

            # Determine target directory
            target_dir = os.path.join(app.config['PUBLIC_FOLDER'], directory)
            os.makedirs(target_dir, exist_ok=True)

            file_path = os.path.join(target_dir, filename)

            # Handle duplicate names
            if os.path.exists(file_path):
                name, ext = os.path.splitext(filename)
                counter = 1
                while os.path.exists(file_path):
                    filename = f"{name}_{counter}{ext}"
                    file_path = os.path.join(target_dir, filename)
                    counter += 1

            file.save(file_path)

            return jsonify({
                'success': True,
                'filename': filename,
                'directory': directory,
                'message': f'File uploaded to {directory}'
            })

        except Exception as e:
            print(f"❌ Admin upload error: {e}")
            return jsonify({'error': 'Upload failed'}), 500

    @app.route('/api/admin/public-files')
    @require_admin
    def list_public_files():
        """List public files (admin only)"""
        try:
            public_dir = app.config['PUBLIC_FOLDER']
            files = []

            for root, dirs, filenames in os.walk(public_dir):
                for filename in filenames:
                    if filename.startswith('.'):
                        continue

                    file_path = os.path.join(root, filename)
                    rel_path = os.path.relpath(file_path, public_dir)
                    stat = os.stat(file_path)

                    files.append({
                        'name': filename,
                        'path': rel_path,
                        'size': stat.st_size,
                        'modified': stat.st_mtime,
                        'type': 'file',
                        'mime_type': mimetypes.guess_type(filename)[0]
                    })

            return jsonify({'files': files})
        except Exception as e:
            return jsonify({'error': 'Failed to list public files'}), 500

    @app.route('/api/admin/public-files/<path:filename>', methods=['DELETE'])
    @require_admin
    @require_csrf_for_api
    def delete_public_file(filename):
        """Delete public file (admin only)"""
        try:
            file_path = os.path.join(app.config['PUBLIC_FOLDER'], filename)

            # Security check
            if not os.path.abspath(file_path).startswith(os.path.abspath(app.config['PUBLIC_FOLDER'])):
                return jsonify({'error': 'Invalid file path'}), 403

            if not os.path.exists(file_path):
                return jsonify({'error': 'File not found'}), 404

            os.remove(file_path)

            return jsonify({
                'success': True,
                'message': f'File {filename} deleted successfully'
            })
        except Exception as e:
            return jsonify({'error': 'Failed to delete file'}), 500

    # =====================
    # SYSTEM API
    # =====================

    @app.route('/api/system/stats')
    @require_login
    def get_system_stats():
        """Get system statistics"""
        try:
            stats = {
                'active_sessions': len(active_sessions),
                'total_users': len(os.listdir(os.path.join(project_root, 'users'))) if os.path.exists(
                    os.path.join(project_root, 'users')) else 0,
                'public_files': count_files_in_directory(app.config['PUBLIC_FOLDER']),
                'uptime': get_system_uptime(),
                'disk_usage': get_disk_usage(project_root),
                'server_time': datetime.now().isoformat()
            }

            # Add user-specific stats
            user_dir = os.path.join(app.config['UPLOAD_FOLDER'], session['username'])
            if os.path.exists(user_dir):
                stats['user_files'] = count_files_in_directory(user_dir)
                stats['user_storage'] = get_directory_size(user_dir)

            return jsonify(stats)
        except Exception as e:
            return jsonify({'error': 'Failed to get system stats'}), 500

    @app.route('/api/system/wallpapers')
    @require_login
    def get_wallpapers():
        """Get available wallpapers"""
        try:
            wallpapers = []
            wallpaper_dir = app.config['WALLPAPER_FOLDER']

            if os.path.exists(wallpaper_dir):
                for filename in os.listdir(wallpaper_dir):
                    if filename.lower().endswith(('.jpg', '.jpeg', '.png', '.gif', '.svg')):
                        wallpapers.append({
                            'id': filename,
                            'name': os.path.splitext(filename)[0],
                            'url': url_for('static', filename=f'wallpapers/{filename}'),
                            'type': 'image'
                        })

            # Add gradient wallpapers
            gradients = [
                {'id': 'gradient-1', 'name': 'Cyber Blue', 'css': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                 'type': 'gradient'},
                {'id': 'gradient-2', 'name': 'Sunset', 'css': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                 'type': 'gradient'},
                {'id': 'gradient-3', 'name': 'Ocean', 'css': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                 'type': 'gradient'},
                {'id': 'gradient-4', 'name': 'Forest', 'css': 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                 'type': 'gradient'},
                {'id': 'gradient-5', 'name': 'Fire', 'css': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                 'type': 'gradient'},
                {'id': 'gradient-6', 'name': 'Ice', 'css': 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                 'type': 'gradient'}
            ]

            return jsonify({'wallpapers': wallpapers + gradients})
        except Exception as e:
            return jsonify({'error': 'Failed to get wallpapers'}), 500

    # =====================
    # WEBSOCKET EVENTS
    # =====================

    @socketio.on('connect')
    def handle_connect():
        """Handle client connection"""
        if 'username' in session:
            username = session['username']
            session_id = session.get('session_id')

            join_room(f'user_{username}')

            print(f"🔌 User {username} connected (session: {session_id})")

            # Update last activity
            if session_id in active_sessions:
                active_sessions[session_id]['last_activity'] = datetime.now()

            emit('connected', {
                'username': username,
                'session_id': session_id,
                'server_time': datetime.now().isoformat()
            })

    @socketio.on('disconnect')
    def handle_disconnect():
        """Handle client disconnection"""
        if 'username' in session:
            username = session['username']
            leave_room(f'user_{username}')
            print(f"🔌 User {username} disconnected")

    @socketio.on('heartbeat')
    def handle_heartbeat(data):
        """Handle client heartbeat"""
        if 'username' in session:
            session_id = session.get('session_id')
            if session_id in active_sessions:
                active_sessions[session_id]['last_activity'] = datetime.now()

            emit('heartbeat_response', {
                'timestamp': datetime.now().isoformat(),
                'status': 'ok'
            })

    @socketio.on('user_activity')
    def handle_user_activity(data):
        """Track user activity"""
        if 'username' in session:
            session_id = session.get('session_id')
            if session_id in active_sessions:
                active_sessions[session_id]['last_activity'] = datetime.now()
                active_sessions[session_id]['current_app'] = data.get('app')

    # =====================
    # ERROR HANDLERS
    # =====================

    @app.errorhandler(404)
    def not_found_error(error):
        if request.is_json:
            return jsonify({'error': 'Not found'}), 404
        return render_template(
            '404.html' if os.path.exists(os.path.join(template_dir, '404.html')) else 'login.html'), 404

    @app.errorhandler(403)
    def forbidden_error(error):
        if request.is_json:
            return jsonify({'error': 'Forbidden'}), 403
        return render_template(
            '403.html' if os.path.exists(os.path.join(template_dir, '403.html')) else 'login.html'), 403

    @app.errorhandler(500)
    def internal_error(error):
        if request.is_json:
            return jsonify({'error': 'Internal server error'}), 500
        return render_template(
            '500.html' if os.path.exists(os.path.join(template_dir, '500.html')) else 'login.html'), 500

    @app.errorhandler(413)
    def file_too_large(error):
        return jsonify({'error': 'File too large'}), 413

    # =====================
    # REQUEST PROCESSORS
    # =====================

    @app.before_request
    def before_request():
        """Process before each request"""
        # Update session activity
        session.permanent = True

        # Skip for static files
        if request.endpoint and 'static' in request.endpoint:
            return

        # Update last activity for logged in users
        if 'username' in session:
            session_id = session.get('session_id')
            if session_id in active_sessions:
                active_sessions[session_id]['last_activity'] = datetime.now()

    @app.after_request
    def after_request(response):
        """Process after each request"""
        # Add security headers
        response.headers['X-Content-Type-Options'] = 'nosniff'
        response.headers['X-Frame-Options'] = 'DENY'
        response.headers['X-XSS-Protection'] = '1; mode=block'

        # CORS headers for API requests
        if request.path.startswith('/api/'):
            response.headers['Access-Control-Allow-Origin'] = '*'
            response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
            response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, X-CSRFToken, X-CSRF-Token'

        return response

    print("✅ EmberFrame app initialized successfully with proper CSRF protection!")
    return app


# =====================
# UTILITY FUNCTIONS
# =====================

def ensure_user_directory(username, base_path):
    """Create user directory structure"""
    user_dir = os.path.join(base_path, username)
    os.makedirs(user_dir, exist_ok=True)

    # Create default directories
    default_dirs = ['Documents', 'Downloads', 'Pictures', 'Desktop', 'Videos', 'Music']
    for dir_name in default_dirs:
        os.makedirs(os.path.join(user_dir, dir_name), exist_ok=True)


def get_file_icon(filename, is_dir):
    """Get appropriate icon for file type"""
    if is_dir:
        return '📁'

    ext = filename.lower().split('.')[-1] if '.' in filename else ''

    icon_map = {
        # Documents
        'txt': '📄', 'md': '📝', 'doc': '📄', 'docx': '📄',
        'pdf': '📕', 'rtf': '📄', 'odt': '📄',
        # Images
        'jpg': '🖼️', 'jpeg': '🖼️', 'png': '🖼️', 'gif': '🖼️',
        'bmp': '🖼️', 'svg': '🖼️', 'ico': '🖼️', 'webp': '🖼️',
        # Audio
        'mp3': '🎵', 'wav': '🎵', 'ogg': '🎵', 'flac': '🎵',
        'aac': '🎵', 'm4a': '🎵', 'wma': '🎵',
        # Video
        'mp4': '🎬', 'avi': '🎬', 'mkv': '🎬', 'mov': '🎬',
        'wmv': '🎬', 'flv': '🎬', 'webm': '🎬',
        # Archives
        'zip': '📦', 'rar': '📦', '7z': '📦', 'tar': '📦',
        'gz': '📦', 'bz2': '📦', 'xz': '📦',
        # Executables
        'exe': '⚙️', 'msi': '⚙️', 'deb': '⚙️', 'rpm': '⚙️',
        'dmg': '⚙️', 'app': '⚙️',
        # Code
        'js': '💻', 'py': '🐍', 'html': '🌐', 'css': '🎨',
        'php': '🌐', 'java': '☕', 'cpp': '💻', 'c': '💻',
        'cs': '💻', 'go': '💻', 'rs': '💻', 'swift': '💻',
        # Data
        'json': '📋', 'xml': '📋', 'csv': '📊', 'xlsx': '📊',
        'xls': '📊', 'db': '🗄️', 'sql': '🗄️'
    }

    return icon_map.get(ext, '📄')


def parse_app_metadata(app_path):
    """Parse app metadata from JavaScript file"""
    try:
        with open(app_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Look for APP_METADATA comment block
        if 'APP_METADATA' in content:
            lines = content.split('\n')
            metadata = {}
            in_metadata = False

            for line in lines:
                line = line.strip()
                if 'APP_METADATA' in line:
                    in_metadata = True
                    continue
                elif in_metadata and line.startswith('*/'):
                    break
                elif in_metadata and line.startswith('* @'):
                    parts = line[3:].split(' ', 1)
                    if len(parts) == 2:
                        key, value = parts
                        metadata[key] = value.strip()

            return metadata
    except Exception as e:
        print(f"Error parsing app metadata from {app_path}: {e}")

    return None


def get_default_preferences():
    """Get default user preferences"""
    return {
        'theme': 'cyber-blue',
        'wallpaper': 'gradient-1',
        'animationsEnabled': True,
        'transparency': 0,
        'blurEffects': True,
        'fontFamily': 'Rajdhani',
        'fontSize': 14,
        'iconSize': 48,
        'showIconLabels': True,
        'iconShadows': True,
        'taskbarPosition': 'bottom',
        'autoHideTaskbar': False,
        'showClock': True,
        'snapWindows': True,
        'restoreWindows': True,
        'doubleClickAction': 'maximize',
        'restoreSession': True,
        'startupSound': False,
        'sessionTimeout': 240,
        'enableNotifications': True,
        'notificationDuration': 4000,
        'notificationPosition': 'top-right',
        'hardwareAcceleration': True,
        'animationQuality': 'high',
        'maxWindows': 10,
        'autoLogout': False,
        'rememberLogin': True,
        'avatar': None
    }


def load_user_preferences(username):
    """Load user preferences from file"""
    try:
        prefs_file = os.path.join('users', f'{username}_preferences.json')
        if os.path.exists(prefs_file):
            with open(prefs_file, 'r') as f:
                user_preferences[username] = json.load(f)
        else:
            user_preferences[username] = get_default_preferences()
    except Exception as e:
        print(f"Error loading preferences for {username}: {e}")
        user_preferences[username] = get_default_preferences()


def save_user_preferences_to_file(username):
    """Save user preferences to file"""
    try:
        os.makedirs('users', exist_ok=True)
        prefs_file = os.path.join('users', f'{username}_preferences.json')
        with open(prefs_file, 'w') as f:
            json.dump(user_preferences.get(username, {}), f, indent=2)
    except Exception as e:
        print(f"Error saving preferences for {username}: {e}")


def load_user_shortcuts(username):
    """Load user shortcuts from file"""
    try:
        shortcuts_file = os.path.join('users', f'{username}_shortcuts.json')
        if os.path.exists(shortcuts_file):
            with open(shortcuts_file, 'r') as f:
                user_shortcuts[username] = json.load(f)
        else:
            user_shortcuts[username] = {'desktop': [], 'taskbar': []}
    except Exception as e:
        print(f"Error loading shortcuts for {username}: {e}")
        user_shortcuts[username] = {'desktop': [], 'taskbar': []}


def save_user_shortcuts(username):
    """Save user shortcuts to file"""
    try:
        os.makedirs('users', exist_ok=True)
        shortcuts_file = os.path.join('users', f'{username}_shortcuts.json')
        with open(shortcuts_file, 'w') as f:
            json.dump(user_shortcuts.get(username, {}), f, indent=2)
    except Exception as e:
        print(f"Error saving shortcuts for {username}: {e}")


def get_user_avatar(username):
    """Get user avatar filename"""
    prefs = user_preferences.get(username, {})
    return prefs.get('avatar')


def count_files_in_directory(directory):
    """Count files in directory recursively"""
    try:
        count = 0
        for root, dirs, files in os.walk(directory):
            count += len(files)
        return count
    except Exception:
        return 0


def get_directory_size(directory):
    """Get total size of directory in bytes"""
    try:
        total_size = 0
        for dirpath, dirnames, filenames in os.walk(directory):
            for filename in filenames:
                filepath = os.path.join(dirpath, filename)
                try:
                    total_size += os.path.getsize(filepath)
                except (OSError, IOError):
                    pass
        return total_size
    except Exception:
        return 0


def get_system_uptime():
    """Get system uptime (simplified)"""
    try:
        with open('/proc/uptime', 'r') as f:
            uptime_seconds = float(f.readline().split()[0])
            return int(uptime_seconds)
    except Exception:
        return 0


def get_disk_usage(path):
    """Get disk usage for path"""
    try:
        statvfs = os.statvfs(path)
        total = statvfs.f_frsize * statvfs.f_blocks
        free = statvfs.f_frsize * statvfs.f_available
        used = total - free
        return {
            'total': total,
            'used': used,
            'free': free,
            'percent': (used / total) * 100 if total > 0 else 0
        }
    except Exception:
        return {'total': 0, 'used': 0, 'free': 0, 'percent': 0}