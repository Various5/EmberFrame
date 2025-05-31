# app/__init__.py - Complete EmberFrame Application with Automatic App Discovery
from flask import Flask, render_template, request, jsonify, session, redirect, url_for, send_file, send_from_directory
from flask_socketio import SocketIO
import os
import json
import hashlib
import shutil
import re
import glob
from datetime import datetime
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


class AppDiscoveryService:
    """Service for discovering apps from the filesystem"""

    @staticmethod
    def discover_apps():
        """Discover all apps from static/js/apps/ directory"""
        apps = []
        apps_dir = os.path.join('static', 'js', 'apps')

        if not os.path.exists(apps_dir):
            print(f"Apps directory not found: {apps_dir}")
            return AppDiscoveryService.get_fallback_apps()

        # Find all JS files in the apps directory
        js_files = glob.glob(os.path.join(apps_dir, '*.js'))

        for js_file in js_files:
            try:
                app_info = AppDiscoveryService.parse_app_metadata(js_file)
                if app_info:
                    apps.append(app_info)
                    print(f"✅ Discovered app: {app_info['name']} ({app_info['id']})")
            except Exception as e:
                print(f"❌ Failed to parse {js_file}: {e}")

        # Add fallback apps if none discovered
        if not apps:
            print("No apps discovered, using fallback apps")
            return AppDiscoveryService.get_fallback_apps()

        print(f"🎯 Total apps discovered: {len(apps)}")
        return apps

    @staticmethod
    def parse_app_metadata(js_file_path):
        """Parse APP_METADATA from a JavaScript file"""
        try:
            with open(js_file_path, 'r', encoding='utf-8') as f:
                content = f.read()

            # Look for APP_METADATA comment block
            metadata_pattern = r'/\*\*\s*\n\s*\*\s*APP_METADATA\s*\n(.*?)\*/'
            metadata_match = re.search(metadata_pattern, content, re.DOTALL)

            if not metadata_match:
                print(f"No APP_METADATA found in {js_file_path}")
                return None

            metadata_text = metadata_match.group(1)

            # Parse metadata fields
            metadata = {}

            # Extract fields using regex
            fields = {
                'name': r'\*\s*@name\s+(.+)',
                'icon': r'\*\s*@icon\s+(.+)',
                'description': r'\*\s*@description\s+(.+)',
                'category': r'\*\s*@category\s+(.+)',
                'version': r'\*\s*@version\s+(.+)',
                'author': r'\*\s*@author\s+(.+)',
                'enabled': r'\*\s*@enabled\s+(.+)'
            }

            for field, pattern in fields.items():
                match = re.search(pattern, metadata_text)
                if match:
                    metadata[field] = match.group(1).strip()

            # Check if app is enabled
            if metadata.get('enabled', 'true').lower() not in ['true', '1', 'yes']:
                print(f"App {metadata.get('name', 'Unknown')} is disabled")
                return None

            # Generate app ID from filename
            filename = os.path.basename(js_file_path)
            app_id = os.path.splitext(filename)[0]

            # Build app info
            app_info = {
                'id': app_id,
                'name': metadata.get('name', app_id.title()),
                'icon': metadata.get('icon', 'fas fa-cube'),
                'description': metadata.get('description', 'Application'),
                'category': metadata.get('category', 'Applications'),
                'version': metadata.get('version', '1.0.0'),
                'author': metadata.get('author', 'Unknown'),
                'enabled': True,
                'file': filename
            }

            return app_info

        except Exception as e:
            print(f"Error parsing {js_file_path}: {e}")
            return None

    @staticmethod
    def get_fallback_apps():
        """Fallback apps when discovery fails"""
        return [
            {
                'id': 'file-manager',
                'name': 'File Manager',
                'icon': 'fas fa-folder',
                'description': 'Browse and manage your files',
                'category': 'System',
                'version': '1.0.0',
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
                'id': 'terminal',
                'name': 'Terminal',
                'icon': 'fas fa-terminal',
                'description': 'Command line interface',
                'category': 'System',
                'version': '1.0.0',
                'author': 'EmberFrame Team',
                'enabled': True
            },
            {
                'id': 'settings',
                'name': 'Settings',
                'icon': 'fas fa-cog',
                'description': 'Customize your experience',
                'category': 'System',
                'version': '1.0.0',
                'author': 'EmberFrame Team',
                'enabled': True
            },
            {
                'id': 'task-manager',
                'name': 'Task Manager',
                'icon': 'fas fa-tasks',
                'description': 'Monitor running applications',
                'category': 'System',
                'version': '1.0.0',
                'author': 'EmberFrame Team',
                'enabled': True
            }
        ]


class UserPreferencesService:
    """Service for managing user preferences"""

    @staticmethod
    def get_user_preferences(username):
        """Get user preferences from file"""
        prefs_file = os.path.join('users', username, 'preferences.json')

        if os.path.exists(prefs_file):
            try:
                with open(prefs_file, 'r') as f:
                    return json.load(f)
            except:
                pass

        # Return default preferences
        return {
            'theme': 'cyber-blue',
            'wallpaperStyle': '',
            'fontFamily': 'Rajdhani',
            'fontSize': 14,
            'iconSize': 48,
            'animationsEnabled': True,
            'blurEffects': True,
            'iconShadows': True,
            'transparency': 10,
            'animationQuality': 'high',
            'hardwareAcceleration': True,
            'autoHideTaskbar': False,
            'showClock': True,
            'notificationPosition': 'top-right',
            'showIconLabels': True
        }

    @staticmethod
    def save_user_preferences(username, preferences):
        """Save user preferences to file"""
        user_dir = os.path.join('users', username)
        os.makedirs(user_dir, exist_ok=True)

        prefs_file = os.path.join(user_dir, 'preferences.json')

        try:
            with open(prefs_file, 'w') as f:
                json.dump(preferences, f, indent=2)
            return True
        except Exception as e:
            print(f"Failed to save preferences: {e}")
            return False

    @staticmethod
    def get_user_shortcuts(username, shortcut_type):
        """Get user shortcuts (desktop or taskbar)"""
        shortcuts_file = os.path.join('users', username, f'{shortcut_type}_shortcuts.json')

        if os.path.exists(shortcuts_file):
            try:
                with open(shortcuts_file, 'r') as f:
                    return json.load(f)
            except:
                pass

        # Return default shortcuts
        if shortcut_type == 'desktop':
            return [
                {'app': 'file-manager', 'x': 50, 'y': 50},
                {'app': 'public-folder', 'x': 50, 'y': 170},
                {'app': 'settings', 'x': 50, 'y': 290}
            ]
        else:  # taskbar
            return []

    @staticmethod
    def save_user_shortcuts(username, shortcut_type, shortcuts):
        """Save user shortcuts to file"""
        user_dir = os.path.join('users', username)
        os.makedirs(user_dir, exist_ok=True)

        shortcuts_file = os.path.join(user_dir, f'{shortcut_type}_shortcuts.json')

        try:
            with open(shortcuts_file, 'w') as f:
                json.dump(shortcuts, f, indent=2)
            return True
        except Exception as e:
            print(f"Failed to save shortcuts: {e}")
            return False


class FileSystemService:
    """Service for file system operations"""

    @staticmethod
    def list_files(username, path=''):
        """List files in user or public directory"""
        try:
            if path.startswith('public/'):
                # Public files
                base_dir = 'public_data'
                relative_path = path[7:]  # Remove 'public/' prefix
                is_writable = False  # Public files are read-only for users
            else:
                # User files
                base_dir = os.path.join('user_data', username)
                relative_path = path
                is_writable = True

            full_path = os.path.join(base_dir, relative_path) if relative_path else base_dir

            if not os.path.exists(full_path):
                os.makedirs(full_path, exist_ok=True)

            files = []

            for item in os.listdir(full_path):
                item_path = os.path.join(full_path, item)

                if os.path.isdir(item_path):
                    files.append({
                        'name': item,
                        'type': 'folder',
                        'icon': '📁',
                        'modified': datetime.fromtimestamp(os.path.getmtime(item_path)).isoformat()
                    })
                else:
                    # Determine file icon based on extension
                    ext = os.path.splitext(item)[1].lower()
                    icon = FileSystemService.get_file_icon(ext)

                    files.append({
                        'name': item,
                        'type': 'file',
                        'icon': icon,
                        'size': os.path.getsize(item_path),
                        'modified': datetime.fromtimestamp(os.path.getmtime(item_path)).isoformat()
                    })

            # Sort: folders first, then files, both alphabetically
            files.sort(key=lambda x: (x['type'] != 'folder', x['name'].lower()))

            return {
                'files': files,
                'path': path,
                'writable': is_writable
            }

        except Exception as e:
            print(f"Error listing files: {e}")
            return {
                'error': str(e),
                'files': [],
                'path': path,
                'writable': False
            }

    @staticmethod
    def get_file_icon(extension):
        """Get icon for file extension"""
        icon_map = {
            '.txt': '📄',
            '.md': '📝',
            '.js': '⚡',
            '.html': '🌐',
            '.css': '🎨',
            '.json': '⚙️',
            '.py': '🐍',
            '.xml': '📄',
            '.log': '📋',
            '.jpg': '🖼️',
            '.jpeg': '🖼️',
            '.png': '🖼️',
            '.gif': '🖼️',
            '.svg': '🖼️',
            '.bmp': '🖼️',
            '.mp3': '🎵',
            '.wav': '🎵',
            '.mp4': '🎬',
            '.avi': '🎬',
            '.pdf': '📕',
            '.zip': '📦',
            '.rar': '📦',
            '.exe': '⚙️',
            '.dll': '⚙️'
        }

        return icon_map.get(extension, '📄')


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
        app.config['WALLPAPER_FOLDER'],
        os.path.join(project_root, 'users'),
        os.path.join(project_root, 'logs')
    ]:
        os.makedirs(directory, exist_ok=True)

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
                ensure_user_directory(username)
                print(f"✅ Login successful: {username}")
                return jsonify({'success': True, 'message': 'Login successful', 'redirect': '/'})
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

            # For testing, always allow registration
            ensure_user_directory(username)
            print(f"✅ Registration successful: {username}")
            return jsonify({'success': True, 'message': 'Registration successful'})

        except Exception as e:
            print(f"❌ Registration error: {e}")
            return jsonify({'success': False, 'message': 'Registration error occurred'})

    @app.route('/logout')
    def logout():
        """Handle logout"""
        username = session.get('username', 'unknown')
        session.clear()
        print(f"👋 Logout: {username}")
        return redirect(url_for('login_page'))

    # =====================
    # APP DISCOVERY API
    # =====================

    @app.route('/api/apps/available')
    def get_available_apps():
        """Get list of available applications"""
        try:
            apps = AppDiscoveryService.discover_apps()
            return jsonify({
                'success': True,
                'apps': apps,
                'count': len(apps)
            })
        except Exception as e:
            print(f"❌ App discovery error: {e}")
            return jsonify({
                'success': False,
                'error': str(e),
                'apps': AppDiscoveryService.get_fallback_apps(),
                'count': 0
            })

    @app.route('/api/apps/reload')
    def reload_apps():
        """Reload apps from filesystem"""
        try:
            apps = AppDiscoveryService.discover_apps()
            return jsonify({
                'success': True,
                'message': f'Reloaded {len(apps)} applications',
                'apps': apps
            })
        except Exception as e:
            return jsonify({'success': False, 'error': str(e)})

    # =====================
    # USER PREFERENCES API
    # =====================

    @app.route('/api/user/preferences', methods=['GET'])
    def get_user_preferences():
        """Get user preferences"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        username = session['username']
        preferences = UserPreferencesService.get_user_preferences(username)

        return jsonify({
            'success': True,
            'preferences': preferences,
            'user': {
                'username': username,
                'isAdmin': username.lower() == 'admin',
                'avatar': None
            }
        })

    @app.route('/api/user/preferences', methods=['POST'])
    def save_user_preferences():
        """Save user preferences"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        try:
            username = session['username']
            preferences = request.get_json()

            if UserPreferencesService.save_user_preferences(username, preferences):
                return jsonify({'success': True, 'message': 'Preferences saved'})
            else:
                return jsonify({'success': False, 'error': 'Failed to save preferences'})
        except Exception as e:
            return jsonify({'success': False, 'error': str(e)})

    # =====================
    # SHORTCUTS API
    # =====================

    @app.route('/api/shortcuts/desktop', methods=['GET'])
    def get_desktop_shortcuts():
        """Get desktop shortcuts"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        username = session['username']
        shortcuts = UserPreferencesService.get_user_shortcuts(username, 'desktop')

        return jsonify({
            'success': True,
            'shortcuts': shortcuts
        })

    @app.route('/api/shortcuts/desktop', methods=['POST'])
    def save_desktop_shortcuts():
        """Save desktop shortcuts"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        try:
            username = session['username']
            data = request.get_json()
            shortcuts = data.get('shortcuts', [])

            if UserPreferencesService.save_user_shortcuts(username, 'desktop', shortcuts):
                return jsonify({'success': True, 'message': 'Desktop shortcuts saved'})
            else:
                return jsonify({'success': False, 'error': 'Failed to save shortcuts'})
        except Exception as e:
            return jsonify({'success': False, 'error': str(e)})

    @app.route('/api/shortcuts/taskbar', methods=['GET'])
    def get_taskbar_shortcuts():
        """Get taskbar shortcuts"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        username = session['username']
        shortcuts = UserPreferencesService.get_user_shortcuts(username, 'taskbar')

        return jsonify({
            'success': True,
            'shortcuts': shortcuts
        })

    @app.route('/api/shortcuts/taskbar', methods=['POST'])
    def save_taskbar_shortcuts():
        """Save taskbar shortcuts"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        try:
            username = session['username']
            data = request.get_json()
            shortcuts = data.get('shortcuts', [])

            if UserPreferencesService.save_user_shortcuts(username, 'taskbar', shortcuts):
                return jsonify({'success': True, 'message': 'Taskbar shortcuts saved'})
            else:
                return jsonify({'success': False, 'error': 'Failed to save shortcuts'})
        except Exception as e:
            return jsonify({'success': False, 'error': str(e)})

    # =====================
    # FILE SYSTEM API
    # =====================

    @app.route('/api/files')
    @app.route('/api/files/')
    @app.route('/api/files/<path:filepath>')
    def list_files(filepath=''):
        """List files in a directory"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        username = session['username']
        result = FileSystemService.list_files(username, filepath)

        if 'error' in result:
            return jsonify(result), 400

        return jsonify(result)

    @app.route('/api/files/<path:filepath>', methods=['POST'])
    def create_file_or_folder(filepath):
        """Create file or folder"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        try:
            data = request.get_json()
            file_type = data.get('type')  # 'file' or 'folder'
            name = data.get('name')

            if not name:
                return jsonify({'error': 'Name is required'}), 400

            username = session['username']

            # Determine base directory
            if filepath.startswith('public/'):
                return jsonify({'error': 'Cannot create files in public directory'}), 403

            base_dir = os.path.join('user_data', username)
            full_path = os.path.join(base_dir, filepath, name) if filepath else os.path.join(base_dir, name)

            if file_type == 'folder':
                os.makedirs(full_path, exist_ok=True)
            else:
                # Create empty file
                with open(full_path, 'w') as f:
                    f.write('')

            return jsonify({'success': True, 'message': f'{file_type.title()} created successfully'})

        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @app.route('/api/files/<path:filepath>', methods=['DELETE'])
    def delete_file(filepath):
        """Delete file or folder"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        try:
            username = session['username']

            # Don't allow deletion of public files
            if filepath.startswith('public/'):
                return jsonify({'error': 'Cannot delete public files'}), 403

            base_dir = os.path.join('user_data', username)
            full_path = os.path.join(base_dir, filepath)

            if os.path.isdir(full_path):
                shutil.rmtree(full_path)
            else:
                os.remove(full_path)

            return jsonify({'success': True, 'message': 'File deleted successfully'})

        except Exception as e:
            return jsonify({'error': str(e)}), 500

    # =====================
    # ADMIN API
    # =====================

    @app.route('/api/admin/check')
    def check_admin_status():
        """Check if user is admin"""
        if 'username' not in session:
            return jsonify({'is_admin': False})

        username = session['username']
        is_admin = username.lower() == 'admin'

        return jsonify({'is_admin': is_admin, 'username': username})

    @app.route('/api/admin/public-files')
    def get_public_files():
        """Get public files (admin only)"""
        if 'username' not in session or session['username'].lower() != 'admin':
            return jsonify({'error': 'Admin access required'}), 403

        try:
            result = FileSystemService.list_files('', 'public/')
            return jsonify(result)
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    # =====================
    # STATIC FILE SERVING
    # =====================

    @app.route('/api/wallpapers')
    def get_wallpapers():
        """Get available wallpapers"""
        try:
            wallpaper_dir = app.config['WALLPAPER_FOLDER']
            wallpapers = []

            if os.path.exists(wallpaper_dir):
                for filename in os.listdir(wallpaper_dir):
                    if filename.lower().endswith(('.jpg', '.jpeg', '.png', '.gif')):
                        wallpapers.append({
                            'name': filename,
                            'url': url_for('static', filename=f'wallpapers/{filename}')
                        })

            return jsonify({'wallpapers': wallpapers})
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    # =====================
    # ERROR HANDLERS
    # =====================

    @app.errorhandler(404)
    def not_found(error):
        return jsonify({'error': 'Not found'}), 404

    @app.errorhandler(500)
    def internal_error(error):
        return jsonify({'error': 'Internal server error'}), 500

    print("✅ EmberFrame app initialized successfully!")
    return app


def ensure_user_directory(username):
    """Create user directory and default subdirectories"""
    user_dir = os.path.join('user_data', username)
    os.makedirs(user_dir, exist_ok=True)

    # Create default directories
    default_dirs = ['Documents', 'Downloads', 'Pictures', 'Desktop']
    for dir_name in default_dirs:
        os.makedirs(os.path.join(user_dir, dir_name), exist_ok=True)

    # Create user preferences directory
    user_prefs_dir = os.path.join('users', username)
    os.makedirs(user_prefs_dir, exist_ok=True)