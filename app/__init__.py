# app/__init__.py
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
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'your-secret-key-change-this-in-production'
    app.config['UPLOAD_FOLDER'] = os.path.join(app.root_path, '..', 'user_data')
    app.config['PUBLIC_FOLDER'] = os.path.join(app.root_path, '..', 'public_data')
    app.config['WALLPAPER_FOLDER'] = os.path.join(app.root_path, '..', 'static', 'wallpapers')
    app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

    socketio.init_app(app, cors_allowed_origins="*")

    # Ensure directories exist
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    os.makedirs(app.config['PUBLIC_FOLDER'], exist_ok=True)
    os.makedirs(app.config['WALLPAPER_FOLDER'], exist_ok=True)
    os.makedirs(os.path.join(app.root_path, '..', 'users'), exist_ok=True)

    # Create default public files
    create_default_public_files(app.config['PUBLIC_FOLDER'])
    create_default_wallpapers(app.config['WALLPAPER_FOLDER'])

    # Authentication routes
    @app.route('/')
    def index():
        if 'username' in session:
            return render_template('desktop.html', username=session['username'])
        return render_template('login.html')

    @app.route('/register')
    def register_page():
        return render_template('register.html')

    @app.route('/login', methods=['POST'])
    def login():
        username = request.json.get('username')
        password = request.json.get('password')

        if authenticate_user(username, password):
            session['username'] = username
            ensure_user_directory(username)
            return jsonify({'success': True, 'message': 'Login successful'})
        else:
            return jsonify({'success': False, 'message': 'Invalid credentials'})

    @app.route('/register', methods=['POST'])
    def register():
        username = request.json.get('username')
        password = request.json.get('password')
        email = request.json.get('email', '')

        if create_user(username, password, email):
            return jsonify({'success': True, 'message': 'Registration successful'})
        else:
            return jsonify({'success': False, 'message': 'Username already exists'})

    @app.route('/logout')
    def logout():
        session.pop('username', None)
        return redirect(url_for('index'))

    # File system routes
    @app.route('/api/files/<path:filepath>')
    def list_files(filepath=''):
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        username = session['username']

        # Determine if it's user directory or public directory
        if filepath.startswith('public/'):
            base_path = app.config['PUBLIC_FOLDER']
            relative_path = filepath[7:]  # Remove 'public/' prefix
            writable = False
        else:
            base_path = get_user_directory(username)
            relative_path = filepath
            writable = True

        full_path = os.path.join(base_path, relative_path)

        if not os.path.exists(full_path):
            return jsonify({'error': 'Path not found'}), 404

        if not os.path.isdir(full_path):
            return jsonify({'error': 'Not a directory'}), 400

        files = []
        try:
            for item in os.listdir(full_path):
                item_path = os.path.join(full_path, item)
                stat = os.stat(item_path)
                files.append({
                    'name': item,
                    'type': 'folder' if os.path.isdir(item_path) else 'file',
                    'size': stat.st_size if not os.path.isdir(item_path) else None,
                    'modified': datetime.fromtimestamp(stat.st_mtime).isoformat(),
                    'icon': get_file_icon(item)
                })
        except PermissionError:
            return jsonify({'error': 'Permission denied'}), 403

        return jsonify({
            'files': files,
            'path': filepath,
            'writable': writable
        })

    @app.route('/api/files/<path:filepath>', methods=['POST'])
    def create_file_or_folder():
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        filepath = request.view_args['filepath']
        username = session['username']
        data = request.json

        if filepath.startswith('public/'):
            return jsonify({'error': 'Cannot write to public directory'}), 403

        base_path = get_user_directory(username)
        full_path = os.path.join(base_path, filepath)

        try:
            if data.get('type') == 'folder':
                os.makedirs(full_path, exist_ok=True)
            else:
                content = data.get('content', '')
                with open(full_path, 'w', encoding='utf-8') as f:
                    f.write(content)
            return jsonify({'success': True})
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @app.route('/api/files/<path:filepath>', methods=['PUT'])
    def update_file():
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        filepath = request.view_args['filepath']
        username = session['username']

        if filepath.startswith('public/'):
            return jsonify({'error': 'Cannot write to public directory'}), 403

        base_path = get_user_directory(username)
        full_path = os.path.join(base_path, filepath)

        try:
            content = request.json.get('content', '')
            with open(full_path, 'w', encoding='utf-8') as f:
                f.write(content)
            return jsonify({'success': True})
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @app.route('/api/files/<path:filepath>', methods=['DELETE'])
    def delete_file():
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        filepath = request.view_args['filepath']
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

        if filepath.startswith('public/'):
            base_path = app.config['PUBLIC_FOLDER']
            relative_path = filepath[7:]
        else:
            base_path = get_user_directory(username)
            relative_path = filepath

        full_path = os.path.join(base_path, relative_path)

        try:
            with open(full_path, 'r', encoding='utf-8') as f:
                content = f.read()
            return jsonify({'content': content})
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @app.route('/api/wallpapers')
    def list_wallpapers():
        try:
            wallpapers = []
            wallpaper_dir = app.config['WALLPAPER_FOLDER']

            # Default wallpapers
            for filename in os.listdir(wallpaper_dir):
                if filename.lower().endswith(('.jpg', '.jpeg', '.png', '.gif')):
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
                        if filename.lower().endswith(('.jpg', '.jpeg', '.png', '.gif')):
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

        if file and allowed_file(file.filename, ['jpg', 'jpeg', 'png', 'gif']):
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
            return jsonify({'error': 'Invalid file type'}), 400

    @app.route('/api/user-wallpaper/<filename>')
    def serve_user_wallpaper(filename):
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        user_wallpaper_dir = os.path.join(get_user_directory(session['username']), 'wallpapers')
        return send_file(os.path.join(user_wallpaper_dir, filename))

    return app


# Helper functions
def get_user_file_path():
    return os.path.join(os.path.dirname(__file__), '..', 'users', 'users.json')


def load_users():
    users_file = get_user_file_path()
    if os.path.exists(users_file):
        with open(users_file, 'r') as f:
            return json.load(f)
    return {}


def save_users(users):
    users_file = get_user_file_path()
    with open(users_file, 'w') as f:
        json.dump(users, f, indent=2)


def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()


def create_user(username, password, email):
    users = load_users()
    if username in users:
        return False

    users[username] = {
        'password': hash_password(password),
        'email': email,
        'created': datetime.now().isoformat()
    }
    save_users(users)
    ensure_user_directory(username)
    return True


def authenticate_user(username, password):
    users = load_users()
    if username in users:
        return users[username]['password'] == hash_password(password)
    return False


def get_user_directory(username):
    user_dir = os.path.join(os.path.dirname(__file__), '..', 'user_data', username)
    return user_dir


def ensure_user_directory(username):
    user_dir = get_user_directory(username)
    os.makedirs(user_dir, exist_ok=True)

    # Create default directories
    default_dirs = ['Documents', 'Downloads', 'Pictures', 'Desktop', 'wallpapers']
    for dir_name in default_dirs:
        os.makedirs(os.path.join(user_dir, dir_name), exist_ok=True)

    # Create default files
    readme_content = f"Welcome to EmberFrame, {username}!\n\nThis is your personal home directory where you can store files and folders.\n\nEnjoy your desktop experience!"
    readme_path = os.path.join(user_dir, 'README.txt')
    if not os.path.exists(readme_path):
        with open(readme_path, 'w') as f:
            f.write(readme_content)


def create_default_public_files(public_dir):
    # Create some default public files
    announcements = """ANNOUNCEMENTS

Welcome to EmberFrame!

This is the public directory where administrators can share files with all users.

System Information:
- Version: 1.0.0
- Last Updated: """ + datetime.now().strftime("%Y-%m-%d") + """

Have a great day!
"""

    announcements_path = os.path.join(public_dir, 'announcements.txt')
    if not os.path.exists(announcements_path):
        with open(announcements_path, 'w') as f:
            f.write(announcements)


def create_default_wallpapers(wallpaper_dir):
    # Create a simple CSS-based wallpaper file (users can add real images)
    css_wallpaper = """/* Default Gradient Wallpapers */
.gradient1 { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
.gradient2 { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); }
.gradient3 { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }
.gradient4 { background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); }
"""

    css_path = os.path.join(wallpaper_dir, 'gradients.css')
    if not os.path.exists(css_path):
        with open(css_path, 'w') as f:
            f.write(css_wallpaper)


def get_file_icon(filename):
    ext = os.path.splitext(filename)[1].lower() if '.' in filename else ''

    icon_map = {
        '.txt': '📄', '.md': '📝', '.py': '🐍', '.js': '🟨', '.html': '🌐',
        '.css': '🎨', '.json': '📋', '.xml': '📄', '.csv': '📊',
        '.jpg': '🖼️', '.jpeg': '🖼️', '.png': '🖼️', '.gif': '🖼️', '.svg': '🖼️',
        '.mp3': '🎵', '.wav': '🎵', '.mp4': '🎬', '.avi': '🎬',
        '.pdf': '📕', '.doc': '📘', '.docx': '📘', '.xls': '📗', '.xlsx': '📗',
        '.zip': '🗜️', '.rar': '🗜️', '.tar': '🗜️', '.gz': '🗜️'
    }

    return icon_map.get(ext, '📄')


def allowed_file(filename, extensions):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in extensions