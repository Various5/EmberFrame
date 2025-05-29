# app/__init__.py - Complete Enhanced Flask Backend
from flask import Flask, render_template, request, jsonify, session, redirect, url_for, send_file
from flask_socketio import SocketIO
import os
import json
import hashlib
import shutil
from datetime import datetime
from werkzeug.utils import secure_filename

socketio = SocketIO()


def create_app():
    # Get absolute paths for templates and static files
    base_dir = os.path.abspath(os.path.dirname(__file__))
    template_dir = os.path.join(os.path.dirname(base_dir), 'templates')
    static_dir = os.path.join(os.path.dirname(base_dir), 'static')

    # Create Flask app with explicit directories
    app = Flask(
        __name__,
        template_folder=template_dir,
        static_folder=static_dir
    )

    # Configuration
    app.config['SECRET_KEY'] = 'your-secret-key-change-this-in-production'
    app.config['UPLOAD_FOLDER'] = os.path.join(os.path.dirname(base_dir), 'user_data')
    app.config['PUBLIC_FOLDER'] = os.path.join(os.path.dirname(base_dir), 'public_data')
    app.config['WALLPAPER_FOLDER'] = os.path.join(static_dir, 'wallpapers')
    app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

    # Initialize SocketIO
    socketio.init_app(app, cors_allowed_origins="*")

    # Ensure directories exist
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    os.makedirs(app.config['PUBLIC_FOLDER'], exist_ok=True)
    os.makedirs(app.config['WALLPAPER_FOLDER'], exist_ok=True)
    os.makedirs(os.path.join(os.path.dirname(base_dir), 'users'), exist_ok=True)
    os.makedirs(os.path.join(os.path.dirname(base_dir), 'logs'), exist_ok=True)

    # Create default files
    create_default_public_files(app.config['PUBLIC_FOLDER'])
    create_default_wallpapers(app.config['WALLPAPER_FOLDER'])

    # Debug information
    print(f"Template directory: {template_dir}")
    print(f"Template directory exists: {os.path.exists(template_dir)}")
    print(f"Static directory: {static_dir}")
    print(f"Static directory exists: {os.path.exists(static_dir)}")

    if os.path.exists(template_dir):
        print(f"Template files: {os.listdir(template_dir)}")

    # =====================
    # AUTHENTICATION ROUTES
    # =====================

    @app.route('/')
    def index():
        if 'username' in session:
            return render_template('desktop.html', username=session['username'])
        return render_template('login.html')

    @app.route('/debug-static')
    def debug_static():
        import os
        static_path = app.static_folder

        html = f"""
        <h3>Static Debug Info:</h3>
        <p><strong>Static folder:</strong> {static_path}</p>
        <p><strong>Static folder exists:</strong> {os.path.exists(static_path) if static_path else 'None'}</p>
        <p><strong>Current working directory:</strong> {os.getcwd()}</p>
        """

        if static_path and os.path.exists(static_path):
            html += "<p><strong>Files in static folder:</strong></p><ul>"
            for root, dirs, files in os.walk(static_path):
                for file in files:
                    rel_path = os.path.relpath(os.path.join(root, file), static_path)
                    html += f"<li>{rel_path}</li>"
            html += "</ul>"

        return html

    @app.route('/register')
    def register_page():
        return render_template('register.html')

    @app.route('/login', methods=['POST'])
    def login():
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        if authenticate_user(username, password):
            session['username'] = username
            ensure_user_directory(username)
            return jsonify({'success': True, 'message': 'Login successful'})
        else:
            return jsonify({'success': False, 'message': 'Invalid username or password'})

    @app.route('/register', methods=['POST'])
    def register():
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        email = data.get('email', '')

        # Validate input
        if not username or not password:
            return jsonify({'success': False, 'message': 'Username and password are required'})

        if len(username) < 3 or len(password) < 6:
            return jsonify(
                {'success': False, 'message': 'Username must be at least 3 characters, password at least 6 characters'})

        if create_user(username, password, email):
            return jsonify({'success': True, 'message': 'Registration successful'})
        else:
            return jsonify({'success': False, 'message': 'Username already exists'})

    @app.route('/logout')
    def logout():
        session.pop('username', None)
        return redirect(url_for('index'))

    # ===================
    # FILE SYSTEM ROUTES
    # ===================

    @app.route('/api/files')
    @app.route('/api/files/')
    @app.route('/api/files/<path:filepath>')
    def list_files(filepath=''):
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        username = session['username']

        # Debug logging
        print(f"DEBUG: Original filepath: '{filepath}'")

        # Handle public directory paths
        if filepath == 'public' or filepath == 'public/':
            # Root public directory
            base_path = app.config['PUBLIC_FOLDER']
            relative_path = ''
            writable = False
            clean_filepath = 'public/'
        elif filepath.startswith('public/'):
            # Subdirectory in public
            relative_path = filepath[7:]  # Remove 'public/' prefix
            base_path = app.config['PUBLIC_FOLDER']
            writable = False
            clean_filepath = filepath
        else:
            # User directory
            base_path = get_user_directory(username)
            relative_path = filepath
            writable = True
            clean_filepath = filepath

        # Construct full path
        if relative_path:
            full_path = os.path.join(base_path, relative_path)
        else:
            full_path = base_path

        print(f"DEBUG: base_path='{base_path}', relative_path='{relative_path}', full_path='{full_path}'")

        if not os.path.exists(full_path):
            print(f"DEBUG: Path not found: {full_path}")
            return jsonify({'error': f'Path not found: {filepath}'}), 404

        if not os.path.isdir(full_path):
            return jsonify({'error': 'Not a directory'}), 400

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
    @app.route('/api/files/<path:filepath>', methods=['POST'])
    def create_file_or_folder(filepath):
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        username = session['username']
        data = request.get_json()

        if filepath.startswith('public/'):
            return jsonify({'error': 'Cannot write to public directory'}), 403

        base_path = get_user_directory(username)
        full_path = os.path.join(base_path, filepath)

        try:
            if data.get('type') == 'folder':
                os.makedirs(full_path, exist_ok=True)
            else:
                # Create file
                os.makedirs(os.path.dirname(full_path), exist_ok=True)
                content = data.get('content', '')
                with open(full_path, 'w', encoding='utf-8') as f:
                    f.write(content)
            return jsonify({'success': True})
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @app.route('/api/files/<path:filepath>', methods=['PUT'])
    def update_file(filepath):
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        username = session['username']

        if filepath.startswith('public/'):
            return jsonify({'error': 'Cannot write to public directory'}), 403

        base_path = get_user_directory(username)
        full_path = os.path.join(base_path, filepath)

        try:
            data = request.get_json()
            content = data.get('content', '')
            with open(full_path, 'w', encoding='utf-8') as f:
                f.write(content)
            return jsonify({'success': True})
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @app.route('/api/files/<path:filepath>', methods=['DELETE'])
    def delete_file(filepath):
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        username = session['username']

        if filepath.startswith('public/'):
            return jsonify({'error': 'Cannot delete from public directory'}), 403

        base_path = get_user_directory(username)
        full_path = os.path.join(base_path, filepath)

        try:
            if os.path.isdir(full_path):
                shutil.rmtree(full_path)
            else:
                os.remove(full_path)
            return jsonify({'success': True})
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @app.route('/api/file-content/<path:filepath>')
    def get_file_content(filepath):
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        username = session['username']

        # Fix public folder path handling
        if filepath.startswith('public/'):
            base_path = app.config['PUBLIC_FOLDER']
            relative_path = filepath[7:]  # Remove 'public/' prefix
        elif filepath.startswith('public'):
            base_path = app.config['PUBLIC_FOLDER']
            relative_path = filepath[6:] if len(filepath) > 6 else ''  # Remove 'public' prefix
        else:
            base_path = get_user_directory(username)
            relative_path = filepath

        # Fix path construction - avoid double slashes
        if relative_path:
            full_path = os.path.join(base_path, relative_path)
        else:
            full_path = base_path

        print(f"Debug: filepath={filepath}, relative_path={relative_path}, full_path={full_path}")

        try:
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
            return jsonify({'error': str(e)}), 500
    # ===================
    # FILE UPLOAD ROUTES
    # ===================

    @app.route('/api/upload-file', methods=['POST'])
    def upload_file():
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400

        path = request.form.get('path', '')
        username = session['username']

        if path.startswith('public/'):
            return jsonify({'error': 'Cannot upload to public directory'}), 403

        if file:
            filename = secure_filename(file.filename)
            user_dir = get_user_directory(username)
            upload_dir = os.path.join(user_dir, path) if path else user_dir
            os.makedirs(upload_dir, exist_ok=True)

            file_path = os.path.join(upload_dir, filename)
            file.save(file_path)

            return jsonify({'success': True, 'filename': filename})
        else:
            return jsonify({'error': 'Invalid file'}), 400

    # ===================
    # WALLPAPER ROUTES
    # ===================

    @app.route('/api/wallpapers')
    def list_wallpapers():
        try:
            wallpapers = []
            wallpaper_dir = app.config['WALLPAPER_FOLDER']

            # Default wallpapers
            if os.path.exists(wallpaper_dir):
                for filename in os.listdir(wallpaper_dir):
                    if filename.lower().endswith(('.jpg', '.jpeg', '.png', '.gif', '.webp')):
                        wallpapers.append({
                            'name': filename,
                            'url': f'/static/wallpapers/{filename}',
                            'type': 'default'
                        })

            # User uploaded wallpapers
            if 'username' in session:
                user_wallpaper_dir = os.path.join(get_user_directory(session['username']), 'wallpapers')
                if os.path.exists(user_wallpaper_dir):
                    for filename in os.listdir(user_wallpaper_dir):
                        if filename.lower().endswith(('.jpg', '.jpeg', '.png', '.gif', '.webp')):
                            wallpapers.append({
                                'name': filename,
                                'url': f'/api/user-wallpaper/{filename}',
                                'type': 'user'
                            })

            return jsonify({'wallpapers': wallpapers})
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @app.route('/api/upload-wallpaper', methods=['POST'])
    def upload_wallpaper():
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400

        if file and allowed_file(file.filename, ['jpg', 'jpeg', 'png', 'gif', 'webp']):
            filename = secure_filename(file.filename)
            user_wallpaper_dir = os.path.join(get_user_directory(session['username']), 'wallpapers')
            os.makedirs(user_wallpaper_dir, exist_ok=True)

            file_path = os.path.join(user_wallpaper_dir, filename)
            file.save(file_path)

            return jsonify({
                'success': True,
                'wallpaper': {
                    'name': filename,
                    'url': f'/api/user-wallpaper/{filename}',
                    'type': 'user'
                }
            })
        else:
            return jsonify({'error': 'Invalid file type. Please upload JPG, PNG, GIF, or WebP files.'}), 400

    @app.route('/api/user-wallpaper/<filename>')
    def serve_user_wallpaper(filename):
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        user_wallpaper_dir = os.path.join(get_user_directory(session['username']), 'wallpapers')
        file_path = os.path.join(user_wallpaper_dir, filename)

        if os.path.exists(file_path):
            return send_file(file_path)
        else:
            return jsonify({'error': 'File not found'}), 404

    # ===================
    # DEBUG ROUTES
    # ===================

    @app.route('/debug-templates')
    def debug_templates():
        return f"""
        <h3>Template Debug Info:</h3>
        <p><strong>Template folder:</strong> {app.template_folder}</p>
        <p><strong>Template folder exists:</strong> {os.path.exists(app.template_folder)}</p>
        <p><strong>Static folder:</strong> {app.static_folder}</p>
        <p><strong>Static folder exists:</strong> {os.path.exists(app.static_folder)}</p>
        <p><strong>Files in template folder:</strong></p>
        <ul>
        {''.join([f'<li>{f}</li>' for f in os.listdir(app.template_folder) if os.path.exists(app.template_folder)])}
        </ul>
        <p><strong>Current working directory:</strong> {os.getcwd()}</p>
        <p><strong>Base directory:</strong> {base_dir}</p>
        """

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
        print(f"Error saving users: {e}")


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
            pass  # Ignore if we can't create the file


def create_default_public_files(public_dir):
    """Create default public files"""
    # Create announcements file
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

    # Create sample documents
    sample_doc = """# EmberFrame User Guide

## Getting Started

EmberFrame is a web-based desktop environment that provides a familiar desktop experience in your browser.

### Key Features

- **File Management**: Create, edit, and organize files in your personal directory
- **Terminal Access**: Use command-line interface with real file system operations
- **Text Editor**: Full-featured editor with syntax highlighting and themes
- **Multi-user Support**: Each user has their own secure workspace
- **Customization**: Themes, wallpapers, and desktop personalization

### File System Structure

- Your Home Directory: `/user_data/username/`
- Public Files: `public_data/` (read-only shared files)
- Wallpapers: Upload custom backgrounds in Settings

### Terminal Commands

- `ls` - List files and directories
- `cd <directory>` - Change directory
- `pwd` - Show current directory
- `cat <file>` - Display file contents
- `mkdir <name>` - Create directory
- `touch <file>` - Create empty file
- `rm <file>` - Delete file
- `help` - Show all available commands

### Tips

- Double-click desktop icons to open applications
- Right-click for context menus
- Drag window edges to resize
- Use Ctrl+S to save in Text Editor
- Upload files by dragging them to File Manager

Enjoy exploring EmberFrame!
"""

    guide_path = os.path.join(public_dir, 'user-guide.md')
    if not os.path.exists(guide_path):
        try:
            with open(guide_path, 'w', encoding='utf-8') as f:
                f.write(sample_doc)
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


def allowed_file(filename, extensions):
    """Check if file extension is allowed"""
    return ('.' in filename and
            filename.rsplit('.', 1)[1].lower() in extensions)