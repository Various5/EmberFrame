# Updated app/__init__.py - Complete Enhanced Flask Backend with User Preferences
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
            session.permanent = True  # Make session persistent
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
        # Save any pending preferences before logout
        if 'username' in session:
            username = session['username']
            print(f"User {username} logging out")

        session.clear()
        return redirect(url_for('index'))

    # ==============================
    # USER PREFERENCES ROUTES (NEW)
    # ==============================

    @app.route('/api/user/preferences', methods=['GET'])
    def get_user_preferences():
        """Get user preferences"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        username = session['username']
        prefs_file = get_user_preferences_file(username)

        try:
            if os.path.exists(prefs_file):
                with open(prefs_file, 'r') as f:
                    preferences = json.load(f)
            else:
                # Return default preferences
                preferences = get_default_preferences()

            return jsonify(preferences)

        except Exception as e:
            print(f"Error loading preferences for {username}: {e}")
            return jsonify(get_default_preferences())

    @app.route('/api/user/preferences', methods=['POST'])
    def save_user_preferences():
        """Save user preferences"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        username = session['username']
        preferences = request.get_json()

        if not preferences:
            return jsonify({'error': 'No preferences data provided'}), 400

        try:
            # Add metadata
            preferences['lastUpdated'] = datetime.now().isoformat()
            preferences['username'] = username

            # Save to file
            prefs_file = get_user_preferences_file(username)
            os.makedirs(os.path.dirname(prefs_file), exist_ok=True)

            with open(prefs_file, 'w') as f:
                json.dump(preferences, f, indent=2)

            return jsonify({'success': True, 'message': 'Preferences saved successfully'})

        except Exception as e:
            print(f"Error saving preferences for {username}: {e}")
            return jsonify({'error': 'Failed to save preferences'}), 500

    @app.route('/api/user/wallpaper', methods=['POST'])
    def save_wallpaper_preference():
        """Save wallpaper preference"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        username = session['username']
        data = request.get_json()

        if not data or 'wallpaper' not in data:
            return jsonify({'error': 'Wallpaper data required'}), 400

        try:
            # Load existing preferences
            prefs_file = get_user_preferences_file(username)
            preferences = {}

            if os.path.exists(prefs_file):
                with open(prefs_file, 'r') as f:
                    preferences = json.load(f)

            # Update wallpaper
            preferences['wallpaper'] = data['wallpaper']
            preferences['lastUpdated'] = datetime.now().isoformat()

            # Save preferences
            os.makedirs(os.path.dirname(prefs_file), exist_ok=True)
            with open(prefs_file, 'w') as f:
                json.dump(preferences, f, indent=2)

            return jsonify({'success': True, 'message': 'Wallpaper preference saved'})

        except Exception as e:
            print(f"Error saving wallpaper preference for {username}: {e}")
            return jsonify({'error': 'Failed to save wallpaper preference'}), 500

    @app.route('/api/user/reset-preferences', methods=['POST'])
    def reset_user_preferences():
        """Reset user preferences to default"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        username = session['username']

        try:
            prefs_file = get_user_preferences_file(username)

            # Remove existing preferences file
            if os.path.exists(prefs_file):
                os.remove(prefs_file)

            return jsonify({'success': True, 'message': 'Preferences reset to default'})

        except Exception as e:
            print(f"Error resetting preferences for {username}: {e}")
            return jsonify({'error': 'Failed to reset preferences'}), 500

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
        'last_login': None,
        'preferences_created': False
    }
    save_users(users)
    ensure_user_directory(username)
    create_default_user_preferences(username)
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

Enhanced Features:
- Multiple windows support - Open as many apps as you need!
- Personalized settings - Your preferences are saved automatically
- Draggable desktop icons - Arrange your desktop your way
- Window state persistence - Windows remember their size and position
- Custom wallpapers - Upload and set your own backgrounds

Features available:
- Create and edit text files
- Upload and download files
- Create folders and organize your content
- Access shared files in the Public folder
- Customize your desktop with wallpapers and themes

Directory Structure:
- Documents/    - Store your documents here
- Downloads/    - Downloaded files appear here  
- Pictures/     - Image files and photos
- Desktop/      - Desktop shortcuts and files
- wallpapers/   - Your custom wallpaper uploads

Keyboard Shortcuts:
- Alt + Tab: Cycle through open windows
- Ctrl + Alt + T: Open Terminal
- Ctrl + Alt + F: Open File Manager
- Windows Key: Toggle Start Menu

Enjoy your enhanced EmberFrame desktop experience!

Created: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
Last Updated: Multi-window support and user preferences added
"""

    readme_path = os.path.join(user_dir, 'README.txt')
    try:
        with open(readme_path, 'w', encoding='utf-8') as f:
            f.write(readme_content)
    except IOError:
        pass  # Ignore if we can't create the file


def get_user_preferences_file(username):
    """Get the path to user's preferences file"""
    user_dir = get_user_directory(username)
    return os.path.join(user_dir, 'preferences.json')


def get_default_preferences():
    """Get default user preferences"""
    return {
        'version': '1.0',
        'windows': {},
        'settings': {
            'theme': 'default',
            'animations': True,
            'restoreWindows': False,
            'startupSound': False,
            'autoLogin': False,
            'iconSize': 48,
            'showLabels': True,
            'taskbarPosition': 'bottom',
            'transparency': 0
        },
        'wallpaper': {
            'type': 'gradient',
            'value': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        },
        'desktop': {
            'iconPositions': {
                'file-manager': {'x': 20, 'y': 20},
                'terminal': {'x': 120, 'y': 20},
                'text-editor': {'x': 20, 'y': 120},
                'settings': {'x': 120, 'y': 120},
                'public-folder': {'x': 20, 'y': 220}
            },
            'gridSnap': True,
            'autoArrange': False
        },
        'savedWindows': [],
        'createdAt': datetime.now().isoformat(),
        'lastUpdated': datetime.now().isoformat()
    }


def create_default_user_preferences(username):
    """Create default preferences file for new user"""
    prefs_file = get_user_preferences_file(username)

    # Only create if it doesn't exist
    if not os.path.exists(prefs_file):
        preferences = get_default_preferences()
        preferences['username'] = username

        try:
            os.makedirs(os.path.dirname(prefs_file), exist_ok=True)
            with open(prefs_file, 'w') as f:
                json.dump(preferences, f, indent=2)
            print(f"Created default preferences for user: {username}")
        except Exception as e:
            print(f"Error creating default preferences for {username}: {e}")


def create_default_public_files(public_dir):
    """Create default public files"""
    # Create announcements file
    announcements = f"""SYSTEM ANNOUNCEMENTS - EmberFrame Multi-Window Desktop

Welcome to the Enhanced EmberFrame Desktop Environment!

🔥 NEW FEATURES:
✅ Multiple Windows Support - Open as many applications as you want simultaneously!
✅ User Preferences Storage - Your settings, window positions, and wallpapers are saved
✅ Draggable Desktop Icons - Arrange your desktop exactly how you like it
✅ Enhanced Start Menu - Now includes logout and system actions
✅ Persistent Window States - Windows remember their size and position
✅ Improved Notifications - Better visual feedback for all actions

This is the public directory where system administrators can share files 
with all users. Files here are read-only for regular users.

System Information:
- Version: 2.0.0 (Multi-Window Edition)
- Last Updated: {datetime.now().strftime('%Y-%m-%d')}
- Platform: Web-based Desktop Environment
- Technology: Python Flask + Enhanced JavaScript

Enhanced Features:
✓ Multi-user support with authentication
✓ Real file system integration
✓ Multiple window support (like Ubuntu/Windows)
✓ Drag & drop file uploads
✓ Resizable and draggable windows with state persistence
✓ Terminal with real command execution
✓ Full-featured text editor
✓ Customizable themes and wallpapers with user storage
✓ Enhanced notification system
✓ Keyboard shortcuts support
✓ User preference synchronization

Getting Started:
1. Explore your home directory using the File Manager
2. Try opening multiple applications at once!
3. Drag windows around and resize them - positions are saved
4. Use the Terminal to navigate with commands
5. Customize your desktop in Settings
6. Upload your own wallpapers
7. Drag desktop icons to arrange them
8. Try keyboard shortcuts like Alt+Tab to cycle windows

New Keyboard Shortcuts:
- Alt + Tab: Cycle through open windows
- Ctrl + Alt + T: Open Terminal
- Ctrl + Alt + F: Open File Manager  
- Windows/Super Key: Toggle Start Menu

Need Help?
- Type 'help' in the Terminal for available commands
- Right-click on the desktop for context menu
- Check the Settings app for personalization options
- Drag files onto the desktop to upload them

Have a great day with your enhanced multi-window experience!

---
EmberFrame Development Team
Enhanced Multi-Window Edition
"""

    announcements_path = os.path.join(public_dir, 'announcements.txt')
    try:
        with open(announcements_path, 'w', encoding='utf-8') as f:
            f.write(announcements)
    except IOError:
        pass

    # Create enhanced sample documents
    sample_doc = """# EmberFrame Enhanced User Guide

## Welcome to Multi-Window Desktop Experience

EmberFrame 2.0 brings you a true multi-window desktop environment that works just like Ubuntu, Windows, or macOS - right in your browser!

### 🆕 What's New in Version 2.0

#### Multiple Windows Support
- Open as many applications as you want simultaneously
- All windows are visible and can be arranged on your desktop
- Windows can overlap, be resized, and positioned anywhere
- Active window highlighting with beautiful effects

#### User Preferences & Persistence
- Your window positions and sizes are automatically saved
- Desktop icon positions are remembered
- Wallpaper preferences sync across sessions
- All settings are stored per-user

#### Enhanced User Experience
- Smooth window animations and transitions
- Improved taskbar with window state indicators
- Draggable desktop icons
- Keyboard shortcuts for power users
- Enhanced start menu with logout options

### Key Features

#### Window Management
- **Multiple Windows**: Open several apps at once, just like a real desktop
- **Window States**: Minimize, maximize, close, drag, and resize
- **Smart Positioning**: New windows automatically position themselves
- **State Persistence**: Window positions saved between sessions
- **Active Window Effects**: Visual feedback for the currently focused window

#### File Management
- **Real File System**: Create, edit, and organize files in your personal directory
- **Drag & Drop**: Upload files by dragging them onto the desktop
- **Public Access**: Shared read-only files in the public directory
- **File Browser Integration**: Seamless file operations within applications

#### Personalization
- **Custom Wallpapers**: Upload and set your own background images
- **Gradient Backgrounds**: Choose from beautiful gradient options
- **Icon Arrangement**: Drag desktop icons to your preferred positions
- **Theme Options**: Multiple visual themes to choose from
- **Settings Persistence**: All preferences saved automatically

#### Terminal & Development
- **Full Terminal**: Real command-line interface with file system access
- **Text Editor**: Comprehensive editor with syntax highlighting
- **File Operations**: Create, edit, delete files and folders
- **Development Tools**: Perfect for coding and system administration

### Keyboard Shortcuts

#### Window Management
- `Alt + Tab` - Cycle through open windows
- `Windows/Super Key` - Toggle Start Menu

#### Application Shortcuts  
- `Ctrl + Alt + T` - Open Terminal
- `Ctrl + Alt + F` - Open File Manager

#### General Navigation
- `Right-click Desktop` - Context menu
- `Drag Desktop Icons` - Rearrange your desktop

### Getting Started Guide

#### 1. Explore Multi-Window Support
- Click on the File Manager icon
- Then click on Terminal - notice both windows are now open!
- Try opening Text Editor and Settings too
- Drag windows around, resize them, minimize and restore

#### 2. Customize Your Desktop
- Right-click desktop for options
- Drag desktop icons to rearrange them
- Open Settings to change wallpaper and preferences

#### 3. File Management
- Use File Manager to browse your files
- Drag files from your computer onto the desktop to upload
- Create folders and organize your content

#### 4. Terminal Power User Features
- Use `ls` to list files
- Use `cd` to change directories
- Use `cat filename.txt` to read files
- Type `help` for all available commands

#### 5. Text Editor
- Create and edit documents
- Syntax highlighting for code files
- Auto-save functionality
- Multiple themes available

### Tips & Tricks

#### Window Management
- Windows remember their last position and size
- Minimized windows appear dimmed in the taskbar
- Active windows have a special glow effect
- Double-click window titlebar to maximize/restore

#### Desktop Organization
- Icons snap to a grid for neat arrangement
- Desktop icon positions are saved between sessions
- Drag files onto desktop to quickly upload them
- Right-click for quick access to common actions

#### File Operations
- Upload multiple files by selecting them all
- Use Terminal for advanced file operations
- Public folder contains shared system files
- Your personal files are completely private

### Troubleshooting

#### Performance
- Close unused windows to improve performance
- Clear browser cache if experiencing slowdowns
- Use latest browser version for best experience

#### File Issues
- Refresh File Manager if files don't appear
- Check file permissions if uploads fail
- Large files may take time to upload

#### Window Problems
- If windows seem stuck, try refreshing the page
- Your window positions will be restored automatically
- Use Alt+Tab if you lose track of windows

### Support & Feedback

EmberFrame is continuously improved based on user feedback. Enjoy your enhanced desktop experience!

For the complete experience:
- Drag this window around the screen
- Try opening multiple applications
- Experiment with all the new keyboard shortcuts
- Customize everything in Settings

Welcome to the future of web-based desktop computing!

---
*EmberFrame 2.0 - Enhanced Multi-Window Edition*
*Built with modern web technologies for maximum compatibility*
"""

    guide_path = os.path.join(public_dir, 'enhanced-user-guide.md')
    try:
        with open(guide_path, 'w', encoding='utf-8') as f:
            f.write(sample_doc)
    except IOError:
        pass


def create_default_wallpapers(wallpaper_dir):
    """Create default wallpaper CSS file"""
    css_wallpaper = """/* Enhanced Gradient Wallpapers for EmberFrame */

/* Multi-Window Desktop Compatible Gradients */
.gradient-blue { 
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
    background-attachment: fixed;
}
.gradient-pink { 
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); 
    background-attachment: fixed;
}
.gradient-cyan { 
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); 
    background-attachment: fixed;
}
.gradient-green { 
    background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); 
    background-attachment: fixed;
}
.gradient-orange { 
    background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); 
    background-attachment: fixed;
}
.gradient-purple { 
    background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); 
    background-attachment: fixed;
}
.gradient-dark { 
    background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%); 
    background-attachment: fixed;
}
.gradient-sunset { 
    background: linear-gradient(135deg, #ff9a56 0%, #ff6b6b 100%); 
    background-attachment: fixed;
}

/* New Enhanced Gradients for Multi-Window Support */
.gradient-ember { 
    background: linear-gradient(135deg, #ff4500 0%, #ff8c00 40%, #ffa500 100%); 
    background-attachment: fixed;
}
.gradient-ocean { 
    background: linear-gradient(135deg, #0074D9 0%, #7FDBFF 50%, #39CCCC 100%); 
    background-attachment: fixed;
}
.gradient-forest { 
    background: linear-gradient(135deg, #2ECC40 0%, #3D9970 50%, #01FF70 100%); 
    background-attachment: fixed;
}
.gradient-royal { 
    background: linear-gradient(135deg, #B10DC9 0%, #F012BE 50%, #85144b 100%); 
    background-attachment: fixed;
}

/* Usage: Apply these classes to body for instant gradient backgrounds */
/* Compatible with multi-window desktop environment */
"""

    css_path = os.path.join(wallpaper_dir, 'enhanced-gradients.css')
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