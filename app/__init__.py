# app/__init__.py - Fixed EmberFrame Application
from flask import Flask, render_template, request, jsonify, session, redirect, url_for, send_file
from flask_socketio import SocketIO
import os
import json
import hashlib
import shutil
from datetime import datetime
from werkzeug.utils import secure_filename

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
    # This file is in app/__init__.py, so go up one level to get project root
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
        print(f"📁 Ensured directory: {directory}")

    # Create default files
    create_default_public_files(app.config['PUBLIC_FOLDER'])
    create_default_wallpapers(app.config['WALLPAPER_FOLDER'])

    # Check template files
    if os.path.exists(template_dir):
        template_files = [f for f in os.listdir(template_dir) if f.endswith('.html')]
        print(f"📄 Found templates: {template_files}")
    else:
        print("❌ Template directory not found!")

    # =====================
    # ROUTES
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

            # Authenticate user
            if authenticate_user(username, password):
                session['username'] = username
                session.permanent = True
                ensure_user_directory(username)
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
            if create_user(username, password, email):
                print(f"✅ Registration successful: {username}")
                return jsonify({'success': True, 'message': 'Registration successful'})
            else:
                print(f"❌ Registration failed: {username} (already exists)")
                return jsonify({'success': False, 'message': 'Username already exists'})

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
    # FILE SYSTEM API ROUTES
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
            # Handle public directory paths
            if filepath == 'public' or filepath == 'public/':
                base_path = app.config['PUBLIC_FOLDER']
                relative_path = ''
                writable = False
                clean_filepath = 'public/'
            elif filepath.startswith('public/'):
                relative_path = filepath[7:]  # Remove 'public/' prefix
                base_path = app.config['PUBLIC_FOLDER']
                writable = False
                clean_filepath = filepath
            else:
                base_path = get_user_directory(username)
                relative_path = filepath
                writable = True
                clean_filepath = filepath

            # Construct full path
            if relative_path:
                full_path = os.path.join(base_path, relative_path)
            else:
                full_path = base_path

            if not os.path.exists(full_path):
                return jsonify({'error': f'Path not found: {filepath}'}), 404

            if not os.path.isdir(full_path):
                return jsonify({'error': 'Not a directory'}), 400

            # List files
            files = []
            try:
                for item in os.listdir(full_path):
                    item_path = os.path.join(full_path, item)
                    try:
                        stat = os.stat(item_path)
                        files.append({
                            'name': item,
                            'type': 'folder' if os.path.isdir(item_path) else 'file',
                            'size': stat.st_size if not os.path.isdir(item_path) else None,
                            'modified': datetime.fromtimestamp(stat.st_mtime).isoformat(),
                            'icon': get_file_icon(item)
                        })
                    except (OSError, IOError):
                        continue
            except PermissionError:
                return jsonify({'error': 'Permission denied'}), 403

            return jsonify({
                'files': sorted(files, key=lambda x: (x['type'] != 'folder', x['name'].lower())),
                'path': clean_filepath,
                'writable': writable
            })

        except Exception as e:
            print(f"❌ File list error: {e}")
            return jsonify({'error': 'Failed to list files'}), 500

    @app.route('/api/files/<path:filepath>', methods=['POST'])
    def create_file_or_folder(filepath):
        """Create a file or folder"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        username = session['username']

        try:
            data = request.get_json() or {}

            if filepath.startswith('public/'):
                return jsonify({'error': 'Cannot write to public directory'}), 403

            base_path = get_user_directory(username)
            full_path = os.path.join(base_path, filepath)

            if data.get('type') == 'folder':
                os.makedirs(full_path, exist_ok=True)
                print(f"📁 Created folder: {filepath}")
            else:
                # Create file
                os.makedirs(os.path.dirname(full_path), exist_ok=True)
                content = data.get('content', '')
                with open(full_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"📄 Created file: {filepath}")

            return jsonify({'success': True})

        except Exception as e:
            print(f"❌ Create error: {e}")
            return jsonify({'error': str(e)}), 500

    @app.route('/api/files/<path:filepath>', methods=['PUT'])
    def update_file(filepath):
        """Update file content"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        username = session['username']

        try:
            if filepath.startswith('public/'):
                return jsonify({'error': 'Cannot write to public directory'}), 403

            base_path = get_user_directory(username)
            full_path = os.path.join(base_path, filepath)

            data = request.get_json() or {}
            content = data.get('content', '')

            with open(full_path, 'w', encoding='utf-8') as f:
                f.write(content)

            print(f"💾 Updated file: {filepath}")
            return jsonify({'success': True})

        except Exception as e:
            print(f"❌ Update error: {e}")
            return jsonify({'error': str(e)}), 500

    @app.route('/api/files/<path:filepath>', methods=['DELETE'])
    def delete_file(filepath):
        """Delete file or folder"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        username = session['username']

        try:
            if filepath.startswith('public/'):
                return jsonify({'error': 'Cannot delete from public directory'}), 403

            base_path = get_user_directory(username)
            full_path = os.path.join(base_path, filepath)

            if os.path.isdir(full_path):
                shutil.rmtree(full_path)
                print(f"🗑️ Deleted folder: {filepath}")
            else:
                os.remove(full_path)
                print(f"🗑️ Deleted file: {filepath}")

            return jsonify({'success': True})

        except Exception as e:
            print(f"❌ Delete error: {e}")
            return jsonify({'error': str(e)}), 500

    @app.route('/api/file-content/<path:filepath>')
    def get_file_content(filepath):
        """Get file content"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        username = session['username']

        try:
            # Handle public folder path
            if filepath.startswith('public/'):
                base_path = app.config['PUBLIC_FOLDER']
                relative_path = filepath[7:]  # Remove 'public/' prefix
            else:
                base_path = get_user_directory(username)
                relative_path = filepath

            # Construct full path
            if relative_path:
                full_path = os.path.join(base_path, relative_path)
            else:
                full_path = base_path

            # Read file content
            with open(full_path, 'r', encoding='utf-8') as f:
                content = f.read()

            return jsonify({'content': content})

        except UnicodeDecodeError:
            try:
                # Try with different encoding
                with open(full_path, 'r', encoding='latin-1') as f:
                    content = f.read()
                return jsonify({'content': content})
            except Exception as e:
                return jsonify({'error': 'Cannot read file: ' + str(e)}), 500
        except Exception as e:
            print(f"❌ File content error: {e}")
            return jsonify({'error': str(e)}), 500

    @app.route('/api/upload-file', methods=['POST'])
    def upload_file():
        """Upload file"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        username = session['username']

        try:
            if 'file' not in request.files:
                return jsonify({'error': 'No file provided'}), 400

            file = request.files['file']
            if file.filename == '':
                return jsonify({'error': 'No file selected'}), 400

            path = request.form.get('path', '')

            if path.startswith('public/'):
                return jsonify({'error': 'Cannot upload to public directory'}), 403

            if file:
                filename = secure_filename(file.filename)
                user_dir = get_user_directory(username)
                upload_dir = os.path.join(user_dir, path) if path else user_dir
                os.makedirs(upload_dir, exist_ok=True)

                file_path = os.path.join(upload_dir, filename)
                file.save(file_path)

                print(f"⬆️ Uploaded file: {filename} to {path}")
                return jsonify({'success': True, 'filename': filename})
            else:
                return jsonify({'error': 'Invalid file'}), 400

        except Exception as e:
            print(f"❌ Upload error: {e}")
            return jsonify({'error': str(e)}), 500

    # =====================
    # API ROUTES
    # =====================

    @app.route('/api/wallpapers')
    def get_wallpapers():
        """Get available wallpapers"""
        wallpapers = []

        # Default wallpapers (you can add actual image files here)
        default_wallpapers = [
            {'name': 'Blue Gradient', 'type': 'default', 'url': '/static/wallpapers/blue.jpg'},
            {'name': 'Purple Space', 'type': 'default', 'url': '/static/wallpapers/purple.jpg'},
        ]

        wallpapers.extend(default_wallpapers)

        return jsonify({'wallpapers': wallpapers})

    @app.route('/api/user/preferences', methods=['GET'])
    def get_user_preferences():
        """Get user preferences"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        # Return default preferences for now
        preferences = {
            'theme': 'default',
            'wallpaper': {'type': 'gradient', 'value': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'},
            'settings': {'restoreWindows': False},
            'windows': {}
        }

        return jsonify(preferences)

    @app.route('/api/user/preferences', methods=['POST'])
    def save_user_preferences():
        """Save user preferences"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        # For now, just return success
        # In a real app, you'd save to a database
        return jsonify({'success': True})

    # =====================
    # ERROR HANDLERS
    # =====================

    @app.errorhandler(404)
    def not_found_error(error):
        return jsonify({'error': 'Not found'}), 404

    @app.errorhandler(500)
    def internal_error(error):
        return jsonify({'error': 'Internal server error'}), 500

    print("✅ EmberFrame app initialized successfully!")
    return app


# ========================
# HELPER FUNCTIONS
# ========================

def get_user_file_path():
    """Get path to users database file"""
    return os.path.join(os.path.dirname(os.path.dirname(__file__)), 'users', 'users.json')


def load_users():
    """Load users from JSON file"""
    users_file = get_user_file_path()
    if os.path.exists(users_file):
        try:
            with open(users_file, 'r') as f:
                return json.load(f)
        except (json.JSONDecodeError, IOError):
            return {}
    return {}


def save_users(users):
    """Save users to JSON file"""
    users_file = get_user_file_path()
    os.makedirs(os.path.dirname(users_file), exist_ok=True)
    try:
        with open(users_file, 'w') as f:
            json.dump(users, f, indent=2)
    except IOError as e:
        print(f"❌ Error saving users: {e}")


def hash_password(password):
    """Hash password using SHA-256"""
    return hashlib.sha256(password.encode()).hexdigest()


def create_user(username, password, email):
    """Create a new user account"""
    users = load_users()
    if username in users:
        return False

    users[username] = {
        'password': hash_password(password),
        'email': email,
        'created': datetime.now().isoformat(),
        'last_login': None
    }
    save_users(users)
    ensure_user_directory(username)
    return True


def authenticate_user(username, password):
    """Authenticate user login"""
    if not username or not password:
        return False

    users = load_users()
    if username in users:
        stored_hash = users[username]['password']
        provided_hash = hash_password(password)
        if stored_hash == provided_hash:
            # Update last login
            users[username]['last_login'] = datetime.now().isoformat()
            save_users(users)
            return True
    return False


def get_user_directory(username):
    """Get user's home directory path"""
    base_dir = os.path.dirname(os.path.dirname(__file__))
    user_dir = os.path.join(base_dir, 'user_data', username)
    return user_dir


def ensure_user_directory(username):
    """Create user directory and default files/folders"""
    user_dir = get_user_directory(username)
    os.makedirs(user_dir, exist_ok=True)

    # Create default directories
    default_dirs = ['Documents', 'Downloads', 'Pictures', 'Desktop', 'wallpapers']
    for dir_name in default_dirs:
        os.makedirs(os.path.join(user_dir, dir_name), exist_ok=True)

    # Create default README file
    readme_content = f"""Welcome to EmberFrame, {username}!

This is your personal home directory where you can store files and folders.

Features available:
- Create and edit text files
- Upload and download files  
- Create folders and organize your content
- Access shared files in the Public folder
- Customize your desktop with wallpapers

Directory Structure:
- Documents/    - Store your documents here
- Downloads/    - Downloaded files appear here
- Pictures/     - Image files and photos
- Desktop/      - Desktop shortcuts and files
- wallpapers/   - Your custom wallpaper uploads

Enjoy your EmberFrame desktop experience!

Created: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
"""

    readme_path = os.path.join(user_dir, 'README.txt')
    if not os.path.exists(readme_path):
        try:
            with open(readme_path, 'w', encoding='utf-8') as f:
                f.write(readme_content)
        except IOError:
            pass


def create_default_public_files(public_dir):
    """Create default public files"""
    announcements = f"""SYSTEM ANNOUNCEMENTS

Welcome to EmberFrame Desktop Environment!

This is the public directory where system administrators can share files 
with all users. Files here are read-only for regular users.

System Information:
- Version: 1.0.0
- Last Updated: {datetime.now().strftime('%Y-%m-%d')}
- Platform: Web-based Desktop Environment
- Technology: Python Flask + JavaScript

Features:
✓ Multi-user support with authentication
✓ Real file system integration
✓ Drag & drop file uploads
✓ Resizable and draggable windows
✓ Terminal with real command execution
✓ Full-featured text editor
✓ Customizable themes and wallpapers
✓ Notification system

Getting Started:
1. Explore your home directory using the File Manager
2. Try the Terminal to navigate with commands
3. Use the Text Editor to create and edit files
4. Customize your desktop in Settings
5. Upload your own wallpapers

Need Help?
- Type 'help' in the Terminal for available commands
- Right-click on the desktop for context menu
- Check the About section in Settings

Have a great day!

---
EmberFrame Team
"""

    announcements_path = os.path.join(public_dir, 'announcements.txt')
    if not os.path.exists(announcements_path):
        try:
            with open(announcements_path, 'w', encoding='utf-8') as f:
                f.write(announcements)
        except IOError:
            pass


def create_default_wallpapers(wallpaper_dir):
    """Create default wallpaper CSS file"""
    css_wallpaper = """/* Default Gradient Wallpapers for EmberFrame */

/* These CSS classes can be used for gradient backgrounds */
.gradient-blue { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
.gradient-pink { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); }
.gradient-cyan { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }
.gradient-green { background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); }
.gradient-orange { background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); }
.gradient-purple { background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); }
.gradient-dark { background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%); }
.gradient-sunset { background: linear-gradient(135deg, #ff9a56 0%, #ff6b6b 100%); }

/* Usage: Apply these classes to body or any element for instant gradients */
"""

    css_path = os.path.join(wallpaper_dir, 'gradients.css')
    if not os.path.exists(css_path):
        try:
            with open(css_path, 'w', encoding='utf-8') as f:
                f.write(css_wallpaper)
        except IOError:
            pass


def get_file_icon(filename):
    """Get appropriate icon for file type"""
    if not filename or filename.startswith('.'):
        return '📄'

    ext = os.path.splitext(filename)[1].lower() if '.' in filename else ''

    icon_map = {
        # Text files
        '.txt': '📄', '.md': '📝', '.rtf': '📄',
        # Code files
        '.py': '🐍', '.js': '🟨', '.html': '🌐', '.css': '🎨',
        '.json': '📋', '.xml': '📄', '.csv': '📊', '.sql': '🗃️',
        '.php': '🌐', '.java': '☕', '.cpp': '⚙️', '.c': '⚙️',
        '.sh': '📜', '.bat': '📜', '.ps1': '📜',
        # Images
        '.jpg': '🖼️', '.jpeg': '🖼️', '.png': '🖼️', '.gif': '🖼️',
        '.svg': '🖼️', '.bmp': '🖼️', '.webp': '🖼️', '.ico': '🖼️',
        # Audio
        '.mp3': '🎵', '.wav': '🎵', '.flac': '🎵', '.aac': '🎵',
        '.ogg': '🎵', '.m4a': '🎵',
        # Video
        '.mp4': '🎬', '.avi': '🎬', '.mkv': '🎬', '.mov': '🎬',
        '.wmv': '🎬', '.flv': '🎬', '.webm': '🎬',
        # Documents
        '.pdf': '📕', '.doc': '📘', '.docx': '📘',
        '.xls': '📗', '.xlsx': '📗', '.ppt': '📙', '.pptx': '📙',
        # Archives
        '.zip': '🗜️', '.rar': '🗜️', '.tar': '🗜️', '.gz': '🗜️',
        '.7z': '🗜️', '.bz2': '🗜️',
        # Other
        '.exe': '⚙️', '.msi': '⚙️', '.deb': '📦', '.rpm': '📦',
        '.iso': '💿', '.dmg': '💿'
    }

    return icon_map.get(ext, '📄')