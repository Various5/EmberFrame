# app/__init__.py - Complete EmberFrame Application with App Auto-Discovery
from flask import Flask, render_template, request, jsonify, session, redirect, url_for, send_file, send_from_directory
from flask_socketio import SocketIO
import os
import json
import hashlib
import shutil
import re
import glob
from datetime import datetime, timedelta
from werkzeug.utils import secure_filename
from pathlib import Path
import logging
import psutil
import time

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
    """Create and configure the Flask application with full EmberFrame functionality"""

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
        SECRET_KEY=os.environ.get('SECRET_KEY', 'ember-secret-key-change-in-production-2024'),
        UPLOAD_FOLDER=os.path.join(project_root, 'user_data'),
        PUBLIC_FOLDER=os.path.join(project_root, 'public_data'),
        WALLPAPER_FOLDER=os.path.join(static_dir, 'wallpapers'),
        MAX_CONTENT_LENGTH=16 * 1024 * 1024,  # 16MB max file size
        WTF_CSRF_ENABLED=CSRF_AVAILABLE,
        WTF_CSRF_TIME_LIMIT=None,
        PERMANENT_SESSION_LIFETIME=timedelta(hours=24)
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
    directories_to_create = [
        app.config['UPLOAD_FOLDER'],
        app.config['PUBLIC_FOLDER'],
        app.config['WALLPAPER_FOLDER'],
        os.path.join(project_root, 'users'),
        os.path.join(project_root, 'logs'),
        os.path.join(project_root, 'public_data', 'documents'),
        os.path.join(project_root, 'public_data', 'media'),
        os.path.join(project_root, 'public_data', 'software')
    ]

    for directory in directories_to_create:
        os.makedirs(directory, exist_ok=True)

    # Setup logging
    if not os.path.exists(os.path.join(project_root, 'logs')):
        os.makedirs(os.path.join(project_root, 'logs'))

    logging.basicConfig(
        filename=os.path.join(project_root, 'logs', 'emberframe.log'),
        level=logging.INFO,
        format='%(asctime)s [%(levelname)s] %(message)s'
    )

    # =====================
    # APP AUTO-DISCOVERY SYSTEM
    # =====================

    class AppDiscoveryService:
        """Service for automatically discovering and managing applications"""

        def __init__(self, static_dir):
            self.static_dir = static_dir
            self.apps_dir = os.path.join(static_dir, 'js', 'apps')
            self.discovered_apps = {}
            self.last_scan = 0
            self.scan_interval = 30  # Rescan every 30 seconds

        def discover_apps(self, force_rescan=False):
            """Discover all available applications by scanning JS files"""
            current_time = time.time()

            if not force_rescan and (current_time - self.last_scan) < self.scan_interval:
                return self.discovered_apps

            print("🔍 Discovering applications...")
            self.discovered_apps = {}

            if not os.path.exists(self.apps_dir):
                print(f"❌ Apps directory not found: {self.apps_dir}")
                return self.discovered_apps

            # Scan for JavaScript app files
            app_files = glob.glob(os.path.join(self.apps_dir, '*.js'))

            for app_file in app_files:
                try:
                    app_info = self.parse_app_metadata(app_file)
                    if app_info and app_info.get('enabled', True):
                        app_id = os.path.splitext(os.path.basename(app_file))[0]
                        app_info['id'] = app_id
                        app_info['file'] = os.path.basename(app_file)
                        self.discovered_apps[app_id] = app_info
                        print(f"✅ Discovered app: {app_info['name']} ({app_id})")
                except Exception as e:
                    print(f"❌ Error parsing {app_file}: {e}")

            self.last_scan = current_time
            print(f"🎯 Discovery complete: {len(self.discovered_apps)} apps found")
            return self.discovered_apps

        def parse_app_metadata(self, file_path):
            """Parse APP_METADATA from JavaScript file comments"""
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()

                # Look for APP_METADATA block
                metadata_pattern = r'/\*\*\s*\n\s*\*\s*APP_METADATA\s*\n(.*?)\*/'
                match = re.search(metadata_pattern, content, re.DOTALL)

                if not match:
                    return None

                metadata_block = match.group(1)
                app_info = {}

                # Parse metadata fields
                field_patterns = {
                    'name': r'\*\s*@name\s+(.+)',
                    'icon': r'\*\s*@icon\s+(.+)',
                    'description': r'\*\s*@description\s+(.+)',
                    'category': r'\*\s*@category\s+(.+)',
                    'version': r'\*\s*@version\s+(.+)',
                    'author': r'\*\s*@author\s+(.+)',
                    'enabled': r'\*\s*@enabled\s+(.+)'
                }

                for field, pattern in field_patterns.items():
                    match = re.search(pattern, metadata_block)
                    if match:
                        value = match.group(1).strip()
                        if field == 'enabled':
                            app_info[field] = value.lower() == 'true'
                        else:
                            app_info[field] = value

                # Set defaults
                app_info.setdefault('name', 'Unknown App')
                app_info.setdefault('icon', 'fas fa-app')
                app_info.setdefault('description', 'No description available')
                app_info.setdefault('category', 'Other')
                app_info.setdefault('version', '1.0.0')
                app_info.setdefault('author', 'Unknown')
                app_info.setdefault('enabled', True)

                return app_info

            except Exception as e:
                print(f"Error parsing metadata from {file_path}: {e}")
                return None

        def get_app_info(self, app_id):
            """Get information about a specific app"""
            apps = self.discover_apps()
            return apps.get(app_id)

        def get_apps_by_category(self):
            """Get apps organized by category"""
            apps = self.discover_apps()
            categories = {}

            for app_id, app_info in apps.items():
                category = app_info.get('category', 'Other')
                if category not in categories:
                    categories[category] = []
                categories[category].append(app_info)

            return categories

        def reload_apps(self):
            """Force reload all apps"""
            return self.discover_apps(force_rescan=True)

    # Initialize app discovery service
    app_discovery = AppDiscoveryService(static_dir)

    # =====================
    # USER MANAGEMENT SYSTEM
    # =====================

    class UserManager:
        """Simple user management system"""

        def __init__(self, users_dir):
            self.users_dir = users_dir
            os.makedirs(users_dir, exist_ok=True)

        def get_user_file(self, username):
            return os.path.join(self.users_dir, f"{username}.json")

        def user_exists(self, username):
            return os.path.exists(self.get_user_file(username))

        def create_user(self, username, password, is_admin=False, email=None):
            """Create a new user"""
            if self.user_exists(username):
                return False, "User already exists"

            user_data = {
                'username': username,
                'password_hash': hashlib.sha256(password.encode()).hexdigest(),
                'is_admin': is_admin,
                'email': email,
                'created_at': datetime.now().isoformat(),
                'last_active': None,
                'is_active': True,
                'quota_mb': 100
            }

            try:
                with open(self.get_user_file(username), 'w') as f:
                    json.dump(user_data, f, indent=2)

                # Create user directory structure
                self.create_user_directories(username)
                return True, "User created successfully"
            except Exception as e:
                return False, f"Error creating user: {str(e)}"

        def authenticate_user(self, username, password):
            """Authenticate a user"""
            if not self.user_exists(username):
                return False, "User not found"

            try:
                with open(self.get_user_file(username), 'r') as f:
                    user_data = json.load(f)

                if not user_data.get('is_active', True):
                    return False, "Account disabled"

                password_hash = hashlib.sha256(password.encode()).hexdigest()
                if user_data['password_hash'] == password_hash:
                    # Update last active
                    user_data['last_active'] = datetime.now().isoformat()
                    with open(self.get_user_file(username), 'w') as f:
                        json.dump(user_data, f, indent=2)
                    return True, user_data
                else:
                    return False, "Invalid password"
            except Exception as e:
                return False, f"Authentication error: {str(e)}"

        def get_user_info(self, username):
            """Get user information"""
            if not self.user_exists(username):
                return None

            try:
                with open(self.get_user_file(username), 'r') as f:
                    return json.load(f)
            except:
                return None

        def create_user_directories(self, username):
            """Create standard user directory structure"""
            user_base = os.path.join(app.config['UPLOAD_FOLDER'], username)
            directories = ['Documents', 'Downloads', 'Pictures', 'Music', 'Desktop', 'Videos']

            for dir_name in directories:
                os.makedirs(os.path.join(user_base, dir_name), exist_ok=True)

        def get_all_users(self):
            """Get all users (admin only)"""
            users = []
            try:
                for filename in os.listdir(self.users_dir):
                    if filename.endswith('.json'):
                        username = filename[:-5]  # Remove .json
                        user_info = self.get_user_info(username)
                        if user_info:
                            user_info['id'] = len(users) + 1  # Simple ID
                            users.append(user_info)
            except:
                pass
            return users

    # Initialize user manager
    users_dir = os.path.join(project_root, 'users')
    user_manager = UserManager(users_dir)

    # Create default admin user if it doesn't exist
    if not user_manager.user_exists('admin'):
        user_manager.create_user('admin', 'admin123', is_admin=True, email='admin@emberframe.local')
        print("✅ Default admin user created (admin/admin123)")

    # =====================
    # UTILITY FUNCTIONS
    # =====================

    def get_user_path(username, path=''):
        """Get the full path for a user's file/folder"""
        user_base = os.path.join(app.config['UPLOAD_FOLDER'], username)
        if path:
            return os.path.join(user_base, path.lstrip('/'))
        return user_base

    def get_public_path(path=''):
        """Get the full path for public files"""
        if path:
            return os.path.join(app.config['PUBLIC_FOLDER'], path.lstrip('/'))
        return app.config['PUBLIC_FOLDER']

    def is_safe_path(base_path, target_path):
        """Check if target_path is within base_path (prevent directory traversal)"""
        try:
            real_base = os.path.realpath(base_path)
            real_target = os.path.realpath(target_path)
            return real_target.startswith(real_base)
        except:
            return False

    def format_file_size(size_bytes):
        """Format file size in human readable format"""
        if size_bytes == 0:
            return "0 B"
        size_names = ["B", "KB", "MB", "GB", "TB"]
        import math
        i = int(math.floor(math.log(size_bytes, 1024)))
        p = math.pow(1024, i)
        s = round(size_bytes / p, 2)
        return f"{s} {size_names[i]}"

    def get_file_icon(filename):
        """Get FontAwesome icon class for file type"""
        ext = filename.lower().split('.')[-1] if '.' in filename else ''

        icon_map = {
            # Images
            'jpg': 'fa-image', 'jpeg': 'fa-image', 'png': 'fa-image', 'gif': 'fa-image', 'svg': 'fa-image',
            # Documents
            'pdf': 'fa-file-pdf', 'doc': 'fa-file-word', 'docx': 'fa-file-word', 'txt': 'fa-file-alt',
            'rtf': 'fa-file-alt', 'md': 'fa-file-alt',
            # Spreadsheets
            'xls': 'fa-file-excel', 'xlsx': 'fa-file-excel', 'csv': 'fa-file-csv',
            # Presentations
            'ppt': 'fa-file-powerpoint', 'pptx': 'fa-file-powerpoint',
            # Archives
            'zip': 'fa-file-archive', 'rar': 'fa-file-archive', '7z': 'fa-file-archive', 'tar': 'fa-file-archive',
            # Audio
            'mp3': 'fa-file-audio', 'wav': 'fa-file-audio', 'flac': 'fa-file-audio', 'ogg': 'fa-file-audio',
            # Video
            'mp4': 'fa-file-video', 'avi': 'fa-file-video', 'mkv': 'fa-file-video', 'mov': 'fa-file-video',
            # Code
            'js': 'fa-file-code', 'html': 'fa-file-code', 'css': 'fa-file-code', 'py': 'fa-file-code',
            'php': 'fa-file-code', 'java': 'fa-file-code', 'cpp': 'fa-file-code', 'c': 'fa-file-code'
        }

        return icon_map.get(ext, 'fa-file')

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

            log_file = os.path.join(project_root, 'logs', 'activity.log')
            with open(log_file, 'a') as f:
                f.write(json.dumps(log_entry) + '\n')
        except:
            pass  # Don't fail on logging errors

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
            log_activity(username, 'login_attempt')

            if not username or not password:
                return jsonify({'success': False, 'message': 'Username and password are required'})

            if len(username) < 3:
                return jsonify({'success': False, 'message': 'Username must be at least 3 characters'})

            # For testing/demo mode - accept any username with any password if user doesn't exist
            if not user_manager.user_exists(username):
                # Create user automatically in demo mode
                success, message = user_manager.create_user(username, password)
                if not success:
                    return jsonify({'success': False, 'message': message})

                session['username'] = username
                session.permanent = True
                log_activity(username, 'auto_registration')
                print(f"✅ Auto-registered and logged in: {username}")
                return jsonify({'success': True, 'message': 'Account created and logged in successfully'})
            else:
                # Authenticate existing user
                success, result = user_manager.authenticate_user(username, password)
                if success:
                    session['username'] = username
                    session.permanent = True
                    log_activity(username, 'login_success')
                    print(f"✅ Login successful: {username}")
                    return jsonify({'success': True, 'message': 'Login successful'})
                else:
                    log_activity(username, 'login_failed', result)
                    print(f"❌ Login failed: {username} - {result}")
                    return jsonify({'success': False, 'message': result})

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
            email = data.get('email', '').strip()

            print(f"📝 Registration attempt: {username}")

            # Validate input
            if not username or not password:
                return jsonify({'success': False, 'message': 'Username and password are required'})

            if len(username) < 3:
                return jsonify({'success': False, 'message': 'Username must be at least 3 characters'})

            if len(password) < 6:
                return jsonify({'success': False, 'message': 'Password must be at least 6 characters'})

            # Create user
            success, message = user_manager.create_user(username, password, email=email)

            if success:
                log_activity(username, 'registration_success')
                print(f"✅ Registration successful: {username}")
                return jsonify({'success': True, 'message': 'Registration successful'})
            else:
                log_activity(username, 'registration_failed', message)
                print(f"❌ Registration failed: {username} - {message}")
                return jsonify({'success': False, 'message': message})

        except Exception as e:
            print(f"❌ Registration error: {e}")
            return jsonify({'success': False, 'message': 'Registration error occurred'})

    @app.route('/logout')
    def logout():
        """Handle logout"""
        username = session.get('username', 'unknown')
        session.clear()
        log_activity(username, 'logout')
        print(f"👋 Logout: {username}")
        return redirect(url_for('login_page'))

    # =====================
    # APP DISCOVERY API ROUTES
    # =====================

    @app.route('/api/apps/available')
    def api_apps_available():
        """Get all available applications"""
        try:
            apps = app_discovery.discover_apps()
            apps_list = list(apps.values())

            return jsonify({
                'success': True,
                'apps': apps_list,
                'count': len(apps_list)
            })
        except Exception as e:
            return jsonify({'success': False, 'error': str(e)}), 500

    @app.route('/api/apps/reload', methods=['POST'])
    def api_apps_reload():
        """Force reload all applications"""
        try:
            apps = app_discovery.reload_apps()
            return jsonify({
                'success': True,
                'message': f'Reloaded {len(apps)} applications',
                'apps': list(apps.values())
            })
        except Exception as e:
            return jsonify({'success': False, 'error': str(e)}), 500

    @app.route('/api/apps/<app_id>')
    def api_app_info(app_id):
        """Get information about a specific app"""
        try:
            app_info = app_discovery.get_app_info(app_id)
            if app_info:
                return jsonify({'success': True, 'app': app_info})
            else:
                return jsonify({'success': False, 'error': 'App not found'}), 404
        except Exception as e:
            return jsonify({'success': False, 'error': str(e)}), 500

    @app.route('/api/apps/categories')
    def api_apps_by_category():
        """Get apps organized by category"""
        try:
            categories = app_discovery.get_apps_by_category()
            return jsonify({
                'success': True,
                'categories': categories
            })
        except Exception as e:
            return jsonify({'success': False, 'error': str(e)}), 500

    # =====================
    # FILE MANAGEMENT API ROUTES
    # =====================

    @app.route('/api/files')
    @app.route('/api/files/')
    @app.route('/api/files/<path:filepath>')
    def api_list_files(filepath=''):
        """List files in a directory"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        username = session['username']

        try:
            # Normalize filepath
            if not filepath:
                filepath = 'home'

            # Determine base path based on filepath prefix
            if filepath.startswith('public/') or filepath == 'public':
                # Public files
                base_path = app.config['PUBLIC_FOLDER']
                relative_path = filepath[7:] if filepath.startswith('public/') else ''
                is_writable = True  # Allow uploads to public folders
            elif filepath.startswith('shared/') or filepath == 'shared':
                # Shared files (future feature)
                base_path = os.path.join(project_root, 'shared_data')
                relative_path = filepath[7:] if filepath.startswith('shared/') else ''
                is_writable = True
            else:
                # User files (home directory)
                base_path = get_user_path(username)
                # Remove 'home/' prefix if present
                relative_path = filepath[5:] if filepath.startswith('home/') else filepath
                if relative_path == 'home':
                    relative_path = ''
                is_writable = True

            # Ensure base directory exists
            os.makedirs(base_path, exist_ok=True)

            # Construct full path
            if relative_path:
                full_path = os.path.join(base_path, relative_path)
            else:
                full_path = base_path

            # Security check
            if not is_safe_path(base_path, full_path):
                return jsonify({'error': 'Invalid path'}), 403

            if not os.path.exists(full_path):
                return jsonify({'error': 'Directory not found'}), 404

            if not os.path.isdir(full_path):
                return jsonify({'error': 'Not a directory'}), 400

            # List directory contents
            files = []
            try:
                for item in os.listdir(full_path):
                    item_path = os.path.join(full_path, item)

                    # Skip hidden files and system files
                    if item.startswith('.') or item.startswith('__'):
                        continue

                    try:
                        stat = os.stat(item_path)
                        is_dir = os.path.isdir(item_path)

                        file_info = {
                            'name': item,
                            'type': 'folder' if is_dir else 'file',
                            'size': 0 if is_dir else stat.st_size,
                            'modified': datetime.fromtimestamp(stat.st_mtime).isoformat(),
                            'icon': 'fas fa-folder' if is_dir else get_file_icon(item)
                        }
                        files.append(file_info)
                    except (OSError, IOError):
                        continue  # Skip files we can't read

            except PermissionError:
                return jsonify({'error': 'Permission denied'}), 403

            return jsonify({
                'files': files,
                'path': filepath,
                'writable': is_writable,
                'current_path': filepath
            })

        except Exception as e:
            print(f"❌ File listing error: {e}")
            return jsonify({'error': f'Error listing files: {str(e)}'}), 500

    @app.route('/api/files/upload', methods=['POST'])
    def api_upload_files():
        """Upload files to a directory"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        username = session['username']

        try:
            files = request.files.getlist('files')
            target_path = request.form.get('path', 'home')

            if not files:
                return jsonify({'error': 'No files provided'}), 400

            # Determine target directory
            if target_path.startswith('public/') or target_path == 'public':
                base_path = app.config['PUBLIC_FOLDER']
                relative_path = target_path[7:] if target_path.startswith('public/') else ''
            else:
                base_path = get_user_path(username)
                relative_path = target_path[5:] if target_path.startswith('home/') else target_path
                if relative_path == 'home':
                    relative_path = ''

            if relative_path:
                upload_dir = os.path.join(base_path, relative_path)
            else:
                upload_dir = base_path

            # Security check
            if not is_safe_path(base_path, upload_dir):
                return jsonify({'error': 'Invalid upload path'}), 403

            # Ensure upload directory exists
            os.makedirs(upload_dir, exist_ok=True)

            uploaded_files = []
            for file in files:
                if file.filename:
                    filename = secure_filename(file.filename)
                    if filename:
                        file_path = os.path.join(upload_dir, filename)
                        file.save(file_path)
                        uploaded_files.append(filename)

            log_activity(username, 'file_upload', f'Uploaded {len(uploaded_files)} files to {target_path}')

            return jsonify({
                'success': True,
                'message': f'Uploaded {len(uploaded_files)} files',
                'files': uploaded_files
            })

        except Exception as e:
            print(f"❌ Upload error: {e}")
            return jsonify({'error': f'Upload failed: {str(e)}'}), 500

    @app.route('/api/files/download/<path:filepath>')
    def api_download_file(filepath):
        """Download a file"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        username = session['username']

        try:
            # Determine file location
            if filepath.startswith('public/'):
                base_path = app.config['PUBLIC_FOLDER']
                relative_path = filepath[7:]
            else:
                base_path = get_user_path(username)
                relative_path = filepath[5:] if filepath.startswith('home/') else filepath

            file_path = os.path.join(base_path, relative_path)

            # Security check
            if not is_safe_path(base_path, file_path):
                return jsonify({'error': 'Invalid file path'}), 403

            if not os.path.exists(file_path) or not os.path.isfile(file_path):
                return jsonify({'error': 'File not found'}), 404

            log_activity(username, 'file_download', filepath)

            return send_file(file_path, as_attachment=True)

        except Exception as e:
            print(f"❌ Download error: {e}")
            return jsonify({'error': f'Download failed: {str(e)}'}), 500

    @app.route('/api/files/operation', methods=['POST'])
    def api_file_operation():
        """Perform file operations (create folder, delete, rename, etc.)"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        username = session['username']

        try:
            data = request.get_json()
            operation = data.get('operation')

            if operation == 'create_folder':
                return handle_create_folder(username, data)
            elif operation == 'delete':
                return handle_delete_files(username, data)
            elif operation == 'rename':
                return handle_rename_file(username, data)
            else:
                return jsonify({'error': 'Unknown operation'}), 400

        except Exception as e:
            print(f"❌ File operation error: {e}")
            return jsonify({'error': f'Operation failed: {str(e)}'}), 500

    def handle_create_folder(username, data):
        """Handle folder creation"""
        path = data.get('path', 'home')
        name = data.get('name', '')

        if not name or not name.strip():
            return jsonify({'error': 'Folder name is required'}), 400

        name = secure_filename(name.strip())
        if not name:
            return jsonify({'error': 'Invalid folder name'}), 400

        # Determine base path
        if path.startswith('public/') or path == 'public':
            base_path = app.config['PUBLIC_FOLDER']
            relative_path = path[7:] if path.startswith('public/') else ''
        else:
            base_path = get_user_path(username)
            relative_path = path[5:] if path.startswith('home/') else path
            if relative_path == 'home':
                relative_path = ''

        if relative_path:
            target_dir = os.path.join(base_path, relative_path)
        else:
            target_dir = base_path

        folder_path = os.path.join(target_dir, name)

        # Security check
        if not is_safe_path(base_path, folder_path):
            return jsonify({'error': 'Invalid folder path'}), 403

        if os.path.exists(folder_path):
            return jsonify({'error': 'Folder already exists'}), 409

        os.makedirs(folder_path)
        log_activity(username, 'folder_create', f'Created folder: {name} in {path}')

        return jsonify({
            'success': True,
            'message': f'Folder "{name}" created successfully'
        })

    def handle_delete_files(username, data):
        """Handle file/folder deletion"""
        path = data.get('path', 'home')
        files = data.get('files', [])

        if not files:
            return jsonify({'error': 'No files specified'}), 400

        # Determine base path
        if path.startswith('public/') or path == 'public':
            base_path = app.config['PUBLIC_FOLDER']
            relative_path = path[7:] if path.startswith('public/') else ''
        else:
            base_path = get_user_path(username)
            relative_path = path[5:] if path.startswith('home/') else path
            if relative_path == 'home':
                relative_path = ''

        if relative_path:
            target_dir = os.path.join(base_path, relative_path)
        else:
            target_dir = base_path

        deleted_files = []
        for filename in files:
            file_path = os.path.join(target_dir, filename)

            # Security check
            if not is_safe_path(base_path, file_path):
                continue

            if os.path.exists(file_path):
                try:
                    if os.path.isdir(file_path):
                        shutil.rmtree(file_path)
                    else:
                        os.remove(file_path)
                    deleted_files.append(filename)
                except:
                    continue

        log_activity(username, 'file_delete', f'Deleted {len(deleted_files)} files from {path}')

        return jsonify({
            'success': True,
            'message': f'Deleted {len(deleted_files)} items successfully'
        })

    def handle_rename_file(username, data):
        """Handle file/folder renaming"""
        path = data.get('path', 'home')
        old_name = data.get('old_name', '')
        new_name = data.get('new_name', '')

        if not old_name or not new_name:
            return jsonify({'error': 'Both old and new names are required'}), 400

        new_name = secure_filename(new_name.strip())
        if not new_name:
            return jsonify({'error': 'Invalid new name'}), 400

        # Determine base path
        if path.startswith('public/') or path == 'public':
            base_path = app.config['PUBLIC_FOLDER']
            relative_path = path[7:] if path.startswith('public/') else ''
        else:
            base_path = get_user_path(username)
            relative_path = path[5:] if path.startswith('home/') else path
            if relative_path == 'home':
                relative_path = ''

        if relative_path:
            target_dir = os.path.join(base_path, relative_path)
        else:
            target_dir = base_path

        old_path = os.path.join(target_dir, old_name)
        new_path = os.path.join(target_dir, new_name)

        # Security checks
        if not is_safe_path(base_path, old_path) or not is_safe_path(base_path, new_path):
            return jsonify({'error': 'Invalid file path'}), 403

        if not os.path.exists(old_path):
            return jsonify({'error': 'File not found'}), 404

        if os.path.exists(new_path):
            return jsonify({'error': 'A file with that name already exists'}), 409

        os.rename(old_path, new_path)
        log_activity(username, 'file_rename', f'Renamed {old_name} to {new_name} in {path}')

        return jsonify({
            'success': True,
            'message': f'Renamed "{old_name}" to "{new_name}"'
        })

    @app.route('/api/files/storage-info')
    def api_storage_info():
        """Get storage information for current user"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        username = session['username']

        try:
            user_path = get_user_path(username)
            total_size = 0

            if os.path.exists(user_path):
                for dirpath, dirnames, filenames in os.walk(user_path):
                    for filename in filenames:
                        filepath = os.path.join(dirpath, filename)
                        try:
                            total_size += os.path.getsize(filepath)
                        except:
                            continue

            # Get user quota
            user_info = user_manager.get_user_info(username)
            quota_mb = user_info.get('quota_mb', 100) if user_info else 100
            quota_bytes = quota_mb * 1024 * 1024

            return jsonify({
                'used': total_size,
                'total': quota_bytes,
                'available': max(0, quota_bytes - total_size),
                'usage_percent': (total_size / quota_bytes * 100) if quota_bytes > 0 else 0
            })

        except Exception as e:
            return jsonify({'error': str(e)}), 500

    # =====================
    # SHORTCUTS API ROUTES
    # =====================

    @app.route('/api/shortcuts/desktop')
    def api_get_desktop_shortcuts():
        """Get desktop shortcuts for current user"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        username = session['username']
        shortcuts_file = os.path.join(project_root, 'users', f'{username}_desktop_shortcuts.json')

        try:
            if os.path.exists(shortcuts_file):
                with open(shortcuts_file, 'r') as f:
                    shortcuts = json.load(f)
            else:
                # Default shortcuts
                shortcuts = [
                    {'app': 'file-manager', 'x': 50, 'y': 50},
                    {'app': 'public-folder', 'x': 50, 'y': 170},
                    {'app': 'settings', 'x': 50, 'y': 290}
                ]

            return jsonify({'shortcuts': shortcuts})
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @app.route('/api/shortcuts/desktop', methods=['POST'])
    def api_save_desktop_shortcuts():
        """Save desktop shortcuts for current user"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        username = session['username']

        try:
            data = request.get_json()
            shortcuts = data.get('shortcuts', [])

            shortcuts_file = os.path.join(project_root, 'users', f'{username}_desktop_shortcuts.json')
            with open(shortcuts_file, 'w') as f:
                json.dump(shortcuts, f, indent=2)

            log_activity(username, 'shortcuts_update', 'Updated desktop shortcuts')
            return jsonify({'success': True})
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @app.route('/api/shortcuts/taskbar')
    def api_get_taskbar_shortcuts():
        """Get taskbar shortcuts for current user"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        username = session['username']
        shortcuts_file = os.path.join(project_root, 'users', f'{username}_taskbar_shortcuts.json')

        try:
            if os.path.exists(shortcuts_file):
                with open(shortcuts_file, 'r') as f:
                    shortcuts = json.load(f)
            else:
                shortcuts = []  # No default taskbar shortcuts

            return jsonify({'shortcuts': shortcuts})
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @app.route('/api/shortcuts/taskbar', methods=['POST'])
    def api_save_taskbar_shortcuts():
        """Save taskbar shortcuts for current user"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        username = session['username']

        try:
            data = request.get_json()
            shortcuts = data.get('shortcuts', [])

            shortcuts_file = os.path.join(project_root, 'users', f'{username}_taskbar_shortcuts.json')
            with open(shortcuts_file, 'w') as f:
                json.dump(shortcuts, f, indent=2)

            log_activity(username, 'shortcuts_update', 'Updated taskbar shortcuts')
            return jsonify({'success': True})
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    # =====================
    # USER PREFERENCES API ROUTES
    # =====================

    @app.route('/api/user/preferences', methods=['GET'])
    def api_get_user_preferences():
        """Get user preferences"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        username = session['username']

        try:
            user_info = user_manager.get_user_info(username)

            # Default preferences
            default_preferences = {
                'theme': 'cyber-blue',
                'wallpaper': '',
                'fontSize': 14,
                'fontFamily': 'Rajdhani, sans-serif',
                'iconSize': 48,
                'animationsEnabled': True,
                'blurEffects': True,
                'iconShadows': True,
                'transparency': 0,
                'animationQuality': 'high',
                'hardwareAcceleration': True,
                'autoHideTaskbar': False,
                'showClock': True,
                'notificationPosition': 'top-right',
                'showIconLabels': True
            }

            preferences_file = os.path.join(project_root, 'users', f'{username}_preferences.json')
            if os.path.exists(preferences_file):
                with open(preferences_file, 'r') as f:
                    user_preferences = json.load(f)
                # Merge with defaults
                default_preferences.update(user_preferences)

            return jsonify({
                'success': True,
                'preferences': default_preferences,
                'user': {
                    'username': username,
                    'isAdmin': user_info.get('is_admin', False) if user_info else False,
                    'email': user_info.get('email', '') if user_info else '',
                    'quota': user_info.get('quota_mb', 100) if user_info else 100
                }
            })

        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @app.route('/api/user/preferences', methods=['POST'])
    def api_save_user_preferences():
        """Save user preferences"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        username = session['username']

        try:
            data = request.get_json()
            preferences = data.get('preferences', {})

            preferences_file = os.path.join(project_root, 'users', f'{username}_preferences.json')
            with open(preferences_file, 'w') as f:
                json.dump(preferences, f, indent=2)

            log_activity(username, 'preferences_update', 'Updated user preferences')
            return jsonify({'success': True})

        except Exception as e:
            return jsonify({'error': str(e)}), 500

    # =====================
    # ADMIN API ROUTES
    # =====================

    @app.route('/api/admin/check')
    def api_admin_check():
        """Check if current user is admin"""
        if 'username' not in session:
            return jsonify({'is_admin': False}), 401

        username = session['username']
        user_info = user_manager.get_user_info(username)
        is_admin = user_info.get('is_admin', False) if user_info else False

        return jsonify({'is_admin': is_admin})

    @app.route('/api/admin/users')
    def api_admin_get_users():
        """Get all users (admin only)"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        username = session['username']
        user_info = user_manager.get_user_info(username)

        if not user_info or not user_info.get('is_admin', False):
            return jsonify({'error': 'Admin access required'}), 403

        try:
            users = user_manager.get_all_users()

            # Calculate stats
            stats = {
                'total': len(users),
                'active': len([u for u in users if u.get('is_active', True)]),
                'admins': len([u for u in users if u.get('is_admin', False)]),
                'new_this_week': 0  # Would need to calculate based on created_at
            }

            return jsonify({
                'success': True,
                'users': users,
                'stats': stats
            })

        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @app.route('/api/admin/system-stats')
    def api_admin_system_stats():
        """Get system statistics (admin only)"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        username = session['username']
        user_info = user_manager.get_user_info(username)

        if not user_info or not user_info.get('is_admin', False):
            return jsonify({'error': 'Admin access required'}), 403

        try:
            users = user_manager.get_all_users()

            stats = {
                'users': {
                    'total': len(users),
                    'active': len([u for u in users if u.get('is_active', True)]),
                    'admins': len([u for u in users if u.get('is_admin', False)])
                }
            }

            return jsonify({'success': True, 'stats': stats})

        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @app.route('/api/admin/file-stats')
    def api_admin_file_stats():
        """Get file statistics (admin only)"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        username = session['username']
        user_info = user_manager.get_user_info(username)

        if not user_info or not user_info.get('is_admin', False):
            return jsonify({'error': 'Admin access required'}), 403

        try:
            # Count public files
            public_files = 0
            total_storage = 0

            if os.path.exists(app.config['PUBLIC_FOLDER']):
                for root, dirs, files in os.walk(app.config['PUBLIC_FOLDER']):
                    public_files += len(files)
                    for file in files:
                        try:
                            total_storage += os.path.getsize(os.path.join(root, file))
                        except:
                            continue

            # Count user directories
            user_directories = 0
            if os.path.exists(app.config['UPLOAD_FOLDER']):
                user_directories = len([d for d in os.listdir(app.config['UPLOAD_FOLDER'])
                                        if os.path.isdir(os.path.join(app.config['UPLOAD_FOLDER'], d))])

            return jsonify({
                'success': True,
                'public_files': public_files,
                'total_storage': total_storage,
                'user_directories': user_directories
            })

        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @app.route('/api/admin/system-info')
    def api_admin_system_info():
        """Get system information (admin only)"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        username = session['username']
        user_info = user_manager.get_user_info(username)

        if not user_info or not user_info.get('is_admin', False):
            return jsonify({'error': 'Admin access required'}), 403

        try:
            # Get system information
            uptime = time.time() - psutil.boot_time() if hasattr(psutil, 'boot_time') else 0

            # Disk usage
            disk_usage = psutil.disk_usage('/')

            system_info = {
                'uptime': uptime,
                'storage': {
                    'total': disk_usage.total,
                    'used': disk_usage.used,
                    'free': disk_usage.free
                },
                'sessions': {
                    'active': 1  # Simple count for now
                },
                'memory': f"{psutil.virtual_memory().percent}%",
                'load': f"{psutil.cpu_percent()}%"
            }

            return jsonify(system_info)

        except Exception as e:
            return jsonify({'error': str(e)}), 500

    # =====================
    # WALLPAPER API ROUTES
    # =====================

    @app.route('/api/wallpapers')
    def api_get_wallpapers():
        """Get available wallpapers"""
        try:
            wallpapers = []
            wallpaper_dir = app.config['WALLPAPER_FOLDER']

            if os.path.exists(wallpaper_dir):
                for filename in os.listdir(wallpaper_dir):
                    if filename.lower().endswith(('.jpg', '.jpeg', '.png', '.gif', '.webp')):
                        wallpapers.append({
                            'name': filename,
                            'url': f'/static/wallpapers/{filename}',
                            'thumbnail': f'/static/wallpapers/{filename}'  # Could add thumbnails later
                        })

            return jsonify({'wallpapers': wallpapers})

        except Exception as e:
            return jsonify({'error': str(e)}), 500

    # =====================
    # ERROR HANDLERS
    # =====================

    @app.errorhandler(404)
    def not_found_error(error):
        if request.path.startswith('/api/'):
            return jsonify({'error': 'API endpoint not found'}), 404
        return render_template('login.html'), 404

    @app.errorhandler(500)
    def internal_error(error):
        if request.path.startswith('/api/'):
            return jsonify({'error': 'Internal server error'}), 500
        return render_template('login.html'), 500

    # Check template files
    if os.path.exists(template_dir):
        template_files = [f for f in os.listdir(template_dir) if f.endswith('.html')]
        print(f"📄 Found templates: {template_files}")
    else:
        print("❌ Template directory not found!")

    print("✅ EmberFrame app initialized successfully with app auto-discovery!")
    print(f"📱 Available applications: {len(app_discovery.discover_apps())}")

    return app