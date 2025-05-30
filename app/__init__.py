# app/__init__.py - Complete EmberFrame Application with Full Integration
from flask import Flask, render_template, request, jsonify, session, redirect, url_for, send_file
from flask_socketio import SocketIO
import os
import json
import hashlib
import shutil
from datetime import datetime, timedelta
from werkzeug.utils import secure_filename

# Optional CSRF Protection
try:
    from flask_wtf.csrf import CSRFProtect, generate_csrf

    CSRF_AVAILABLE = True
except ImportError:
    print("⚠️ Flask-WTF not available, CSRF protection disabled")
    CSRFProtect = None
    CSRF_AVAILABLE = False

socketio = SocketIO()


def create_app():
    """Create and configure the Flask application"""

    # Get absolute paths
    app_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(app_dir)
    template_dir = os.path.join(project_root, 'templates')
    static_dir = os.path.join(project_root, 'static')

    print(f"🔍 App dir: {app_dir}")
    print(f"🔍 Project root: {project_root}")
    print(f"🔍 Templates: {template_dir} (exists: {os.path.exists(template_dir)})")
    print(f"🔍 Static: {static_dir} (exists: {os.path.exists(static_dir)})")

    # Create Flask app
    app = Flask(
        __name__,
        template_folder=template_dir,
        static_folder=static_dir
    )

    # Configuration
    app.config.update(
        SECRET_KEY='emberframe-secret-key-2024',
        PERMANENT_SESSION_LIFETIME=timedelta(hours=24),
        UPLOAD_FOLDER=os.path.join(project_root, 'user_data'),
        PUBLIC_FOLDER=os.path.join(project_root, 'public_data'),
        MAX_CONTENT_LENGTH=16 * 1024 * 1024,  # 16MB
        WTF_CSRF_ENABLED=False,  # Disable CSRF for now to avoid issues
        WTF_CSRF_CHECK_DEFAULT=False
    )

    # Initialize SocketIO
    socketio.init_app(app, cors_allowed_origins="*")

    # Optional CSRF setup
    if CSRF_AVAILABLE:
        csrf = CSRFProtect()
        csrf.init_app(app)

        @app.template_global()
        def csrf_token():
            try:
                return generate_csrf()
            except:
                return ""
    else:
        @app.template_global()
        def csrf_token():
            return ""

    # Create necessary directories
    ensure_directories(app.config)

    # Initialize user storage
    init_user_storage()

    # =====================
    # MAIN ROUTES
    # =====================

    @app.route('/')
    def index():
        """Main page - redirect based on login status"""
        if 'username' in session:
            print(f"🔐 User {session['username']} accessing desktop")
            return render_template('desktop.html', username=session['username'])
        print("🔐 No session, redirecting to login")
        return redirect(url_for('login_page'))

    @app.route('/test-csrf')
    def test_csrf():
        """Test CSRF token generation"""
        try:
            token = csrf_token()
            return jsonify({
                'csrf_available': CSRF_AVAILABLE,
                'csrf_token': token[:20] + '...' if token else None,
                'token_length': len(token) if token else 0,
                'status': 'success'
            })
        except Exception as e:
            return jsonify({
                'csrf_available': CSRF_AVAILABLE,
                'error': str(e),
                'status': 'error'
            }), 500

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
            # Get form data (handle both JSON and form data)
            if request.is_json:
                data = request.get_json()
            else:
                data = request.form.to_dict()

            username = str(data.get('username', '')).strip()
            password = str(data.get('password', ''))

            print(f"🔐 Login attempt - Username: '{username}', Password length: {len(password)}")

            # Validation
            if not username:
                return jsonify({'success': False, 'message': 'Username is required'})

            if not password:
                return jsonify({'success': False, 'message': 'Password is required'})

            if len(username) < 3:
                return jsonify({'success': False, 'message': 'Username must be at least 3 characters'})

            # Authenticate
            if authenticate_user(username, password):
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
            import traceback
            traceback.print_exc()
            return jsonify({'success': False, 'message': f'Login error: {str(e)}'})

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
            # Get form data (handle both JSON and form data)
            if request.is_json:
                data = request.get_json()
            else:
                data = request.form.to_dict()

            username = str(data.get('username', '')).strip()
            password = str(data.get('password', ''))

            print(f"📝 Registration attempt - Username: '{username}', Password length: {len(password)}")

            # Validation
            if not username:
                return jsonify({'success': False, 'message': 'Username is required'})

            if not password:
                return jsonify({'success': False, 'message': 'Password is required'})

            if len(username) < 3:
                return jsonify({'success': False, 'message': 'Username must be at least 3 characters'})

            if len(password) < 6:
                return jsonify({'success': False, 'message': 'Password must be at least 6 characters'})

            # Create user
            if create_user(username, password):
                print(f"✅ Registration successful: {username}")
                return jsonify({'success': True, 'message': 'Account created successfully!'})
            else:
                print(f"❌ Registration failed - user exists: {username}")
                return jsonify({'success': False, 'message': 'Username already exists'})

        except Exception as e:
            print(f"❌ Registration error: {e}")
            import traceback
            traceback.print_exc()
            return jsonify({'success': False, 'message': f'Registration error: {str(e)}'})

    @app.route('/logout')
    def logout():
        """Handle logout"""
        username = session.get('username', 'unknown')
        session.clear()
        print(f"👋 Logout: {username}")
        return redirect(url_for('login_page'))

    # =====================
    # API ROUTES
    # =====================

    @app.route('/api/test')
    def api_test():
        """Test API endpoint"""
        return jsonify({
            'status': 'ok',
            'timestamp': datetime.now().isoformat(),
            'user': session.get('username', 'anonymous')
        })

    # File System API
    @app.route('/api/files')
    @app.route('/api/files/')
    @app.route('/api/files/<path:filepath>')
    def list_files(filepath=''):
        """List files in user or public directory"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        username = session['username']
        is_admin = is_admin_user(username)

        try:
            # Handle public folder access
            if filepath.startswith('public/') or filepath == 'public':
                return handle_public_files(filepath, is_admin)

            # Handle user files
            return handle_user_files(username, filepath)

        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @app.route('/api/file-content/<path:filepath>')
    def get_file_content(filepath):
        """Get file content for reading"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        username = session['username']

        try:
            if filepath.startswith('public/'):
                # Public file access
                public_path = os.path.join(app.config['PUBLIC_FOLDER'], filepath[7:])
                if os.path.exists(public_path) and os.path.isfile(public_path):
                    with open(public_path, 'r', encoding='utf-8', errors='ignore') as f:
                        content = f.read()
                    return jsonify({'content': content})
            else:
                # User file access
                user_dir = os.path.join(app.config['UPLOAD_FOLDER'], username)
                file_path = os.path.join(user_dir, filepath)

                # Security check
                if not file_path.startswith(user_dir):
                    return jsonify({'error': 'Access denied'}), 403

                if os.path.exists(file_path) and os.path.isfile(file_path):
                    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                        content = f.read()
                    return jsonify({'content': content})

            return jsonify({'error': 'File not found'}), 404

        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @app.route('/api/files/<path:filepath>', methods=['POST'])
    def create_file_or_folder(filepath):
        """Create file or folder"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        username = session['username']
        is_admin = is_admin_user(username)

        # Block public directory writes for non-admins
        if filepath.startswith('public/') and not is_admin:
            return jsonify({'error': 'Permission denied - admin access required'}), 403

        try:
            data = request.get_json() or {}
            item_type = data.get('type', 'file')
            content = data.get('content', '')

            if filepath.startswith('public/'):
                # Admin creating in public directory
                target_path = os.path.join(app.config['PUBLIC_FOLDER'], filepath[7:])
                base_dir = app.config['PUBLIC_FOLDER']
            else:
                # User creating in their directory
                user_dir = os.path.join(app.config['UPLOAD_FOLDER'], username)
                target_path = os.path.join(user_dir, filepath)
                base_dir = user_dir

            # Security check
            if not target_path.startswith(base_dir):
                return jsonify({'error': 'Access denied'}), 403

            if item_type == 'folder':
                os.makedirs(target_path, exist_ok=True)
                return jsonify({'success': True, 'message': 'Folder created'})
            else:
                # Create file
                os.makedirs(os.path.dirname(target_path), exist_ok=True)
                with open(target_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                return jsonify({'success': True, 'message': 'File created'})

        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @app.route('/api/files/<path:filepath>', methods=['PUT'])
    def update_file(filepath):
        """Update file content"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        username = session['username']
        is_admin = is_admin_user(username)

        # Block public directory writes for non-admins
        if filepath.startswith('public/') and not is_admin:
            return jsonify({'error': 'Permission denied - admin access required'}), 403

        try:
            data = request.get_json() or {}
            content = data.get('content', '')

            if filepath.startswith('public/'):
                target_path = os.path.join(app.config['PUBLIC_FOLDER'], filepath[7:])
                base_dir = app.config['PUBLIC_FOLDER']
            else:
                user_dir = os.path.join(app.config['UPLOAD_FOLDER'], username)
                target_path = os.path.join(user_dir, filepath)
                base_dir = user_dir

            # Security check
            if not target_path.startswith(base_dir):
                return jsonify({'error': 'Access denied'}), 403

            # Update file
            os.makedirs(os.path.dirname(target_path), exist_ok=True)
            with open(target_path, 'w', encoding='utf-8') as f:
                f.write(content)

            return jsonify({'success': True, 'message': 'File updated'})

        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @app.route('/api/files/<path:filepath>', methods=['DELETE'])
    def delete_file_or_folder(filepath):
        """Delete file or folder"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        username = session['username']
        is_admin = is_admin_user(username)

        # Block public directory writes for non-admins
        if filepath.startswith('public/') and not is_admin:
            return jsonify({'error': 'Permission denied - admin access required'}), 403

        try:
            if filepath.startswith('public/'):
                target_path = os.path.join(app.config['PUBLIC_FOLDER'], filepath[7:])
                base_dir = app.config['PUBLIC_FOLDER']
            else:
                user_dir = os.path.join(app.config['UPLOAD_FOLDER'], username)
                target_path = os.path.join(user_dir, filepath)
                base_dir = user_dir

            # Security check
            if not target_path.startswith(base_dir):
                return jsonify({'error': 'Access denied'}), 403

            if os.path.exists(target_path):
                if os.path.isdir(target_path):
                    shutil.rmtree(target_path)
                else:
                    os.remove(target_path)
                return jsonify({'success': True, 'message': 'Item deleted'})
            else:
                return jsonify({'error': 'Item not found'}), 404

        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @app.route('/api/upload-file', methods=['POST'])
    def upload_file():
        """Upload file to user directory"""
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
            user_dir = os.path.join(app.config['UPLOAD_FOLDER'], username)

            if path:
                target_dir = os.path.join(user_dir, path)
            else:
                target_dir = user_dir

            os.makedirs(target_dir, exist_ok=True)

            filename = secure_filename(file.filename)
            file_path = os.path.join(target_dir, filename)

            # Security check
            if not file_path.startswith(user_dir):
                return jsonify({'error': 'Access denied'}), 403

            file.save(file_path)
            return jsonify({'success': True, 'filename': filename})

        except Exception as e:
            return jsonify({'error': str(e)}), 500

    # User Preferences API
    @app.route('/api/user/preferences', methods=['GET'])
    def get_user_preferences():
        """Get user preferences"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        return jsonify({
            'theme': 'default',
            'settings': {'restoreWindows': False},
            'windows': {}
        })

    @app.route('/api/user/preferences', methods=['POST'])
    def save_user_preferences():
        """Save user preferences"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401
        return jsonify({'success': True})

    # Shortcuts Management API
    @app.route('/api/shortcuts/<shortcut_type>')
    def get_shortcuts(shortcut_type):
        """Get user shortcuts (desktop or taskbar)"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        if shortcut_type not in ['desktop', 'taskbar']:
            return jsonify({'error': 'Invalid shortcut type'}), 400

        shortcuts = load_user_shortcuts(session['username'], shortcut_type)
        return jsonify({'shortcuts': shortcuts})

    @app.route('/api/shortcuts/<shortcut_type>', methods=['POST'])
    def save_shortcuts(shortcut_type):
        """Save user shortcuts"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        if shortcut_type not in ['desktop', 'taskbar']:
            return jsonify({'error': 'Invalid shortcut type'}), 400

        try:
            data = request.get_json() or {}
            shortcuts = data.get('shortcuts', [])

            if save_user_shortcuts(session['username'], shortcut_type, shortcuts):
                return jsonify({'success': True})
            else:
                return jsonify({'error': 'Failed to save shortcuts'}), 500
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @app.route('/api/apps/available')
    def get_available_apps():
        """Get list of all available applications"""
        username = session.get('username', '')
        is_admin = is_admin_user(username) if username else False

        apps = [
            {
                'id': 'file-manager',
                'name': 'File Manager',
                'icon': 'fas fa-folder',
                'description': 'Browse and manage your files'
            },
            {
                'id': 'terminal',
                'name': 'Terminal',
                'icon': 'fas fa-terminal',
                'description': 'Command line interface'
            },
            {
                'id': 'text-editor',
                'name': 'Text Editor',
                'icon': 'fas fa-edit',
                'description': 'Create and edit documents'
            },
            {
                'id': 'media-player',
                'name': 'Media Player',
                'icon': 'fas fa-play-circle',
                'description': 'Play audio and video files'
            },
            {
                'id': 'settings',
                'name': 'Settings',
                'icon': 'fas fa-cog',
                'description': 'Customize your experience'
            },
            {
                'id': 'public-folder',
                'name': 'Public Files',
                'icon': 'fas fa-globe',
                'description': 'Access shared public files'
            }
        ]

        # Add admin panel for administrators
        if is_admin:
            apps.append({
                'id': 'admin-panel',
                'name': 'Admin Panel',
                'icon': 'fas fa-shield-alt',
                'description': 'Manage system and public files'
            })

        return jsonify({'apps': apps})

    # Admin Public File Management
    @app.route('/api/admin/public-files', methods=['GET'])
    def get_public_files_admin():
        """Get public files (admin can see writable status)"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        username = session['username']
        is_admin = is_admin_user(username)

        try:
            public_dir = app.config['PUBLIC_FOLDER']

            files = []
            if os.path.exists(public_dir):
                for item in os.listdir(public_dir):
                    item_path = os.path.join(public_dir, item)
                    if os.path.isfile(item_path):
                        files.append({
                            'name': item,
                            'type': 'file',
                            'size': os.path.getsize(item_path),
                            'modified': datetime.fromtimestamp(os.path.getmtime(item_path)).isoformat()
                        })
                    elif os.path.isdir(item_path):
                        files.append({
                            'name': item,
                            'type': 'folder',
                            'modified': datetime.fromtimestamp(os.path.getmtime(item_path)).isoformat()
                        })

            return jsonify({
                'files': files,
                'writable': is_admin,
                'path': 'public'
            })
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @app.route('/api/admin/public-files/upload', methods=['POST'])
    def upload_public_file():
        """Upload file to public directory (admin only)"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        username = session['username']
        if not is_admin_user(username):
            return jsonify({'error': 'Admin access required'}), 403

        try:
            if 'file' not in request.files:
                return jsonify({'error': 'No file provided'}), 400

            file = request.files['file']
            if file.filename == '':
                return jsonify({'error': 'No file selected'}), 400

            # Get target directory from form data
            target_dir = request.form.get('directory', 'shared')
            allowed_dirs = ['documents', 'media', 'software', 'shared']

            if target_dir not in allowed_dirs:
                target_dir = 'shared'

            public_dir = os.path.join(app.config['PUBLIC_FOLDER'], target_dir)
            os.makedirs(public_dir, exist_ok=True)

            # Secure filename
            filename = secure_filename(file.filename)
            file_path = os.path.join(public_dir, filename)
            file.save(file_path)

            return jsonify({
                'success': True,
                'message': f'File uploaded to public/{target_dir}/',
                'filename': filename
            })

        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @app.route('/api/admin/public-files/<filename>', methods=['DELETE'])
    def delete_public_file(filename):
        """Delete file from public directory (admin only)"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        username = session['username']
        if not is_admin_user(username):
            return jsonify({'error': 'Admin access required'}), 403

        try:
            public_dir = app.config['PUBLIC_FOLDER']
            file_path = os.path.join(public_dir, filename)

            # Security check
            if not file_path.startswith(public_dir):
                return jsonify({'error': 'Access denied'}), 403

            if os.path.exists(file_path):
                os.remove(file_path)
                return jsonify({'success': True, 'message': 'File deleted'})
            else:
                return jsonify({'error': 'File not found'}), 404

        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @app.route('/api/admin/check')
    def check_admin():
        """Check if current user is admin"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        return jsonify({
            'is_admin': is_admin_user(session['username']),
            'username': session['username']
        })

    # Wallpapers API
    @app.route('/api/wallpapers')
    def get_wallpapers():
        """Get available wallpapers"""
        return jsonify({'wallpapers': []})

    print("✅ EmberFrame app initialized successfully!")
    return app


# ========================
# HELPER FUNCTIONS
# ========================

def handle_public_files(filepath, is_admin):
    """Handle public file directory listing"""
    public_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'public_data')

    # Remove 'public/' prefix if present
    if filepath.startswith('public/'):
        relative_path = filepath[7:]
    elif filepath == 'public':
        relative_path = ''
    else:
        relative_path = filepath

    target_path = os.path.join(public_dir, relative_path) if relative_path else public_dir

    files = []
    if os.path.exists(target_path) and os.path.isdir(target_path):
        for item in os.listdir(target_path):
            item_path = os.path.join(target_path, item)

            if os.path.isfile(item_path):
                files.append({
                    'name': item,
                    'type': 'file',
                    'size': os.path.getsize(item_path),
                    'icon': get_file_icon(item),
                    'modified': datetime.fromtimestamp(os.path.getmtime(item_path)).isoformat()
                })
            elif os.path.isdir(item_path):
                files.append({
                    'name': item,
                    'type': 'folder',
                    'icon': '📁',
                    'modified': datetime.fromtimestamp(os.path.getmtime(item_path)).isoformat()
                })

    return jsonify({
        'files': files,
        'path': filepath,
        'writable': is_admin  # Only admin can write to public folders
    })


def handle_user_files(username, filepath):
    """Handle user file directory listing"""
    user_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'user_data', username)
    target_path = os.path.join(user_dir, filepath) if filepath else user_dir

    # Security check
    if not target_path.startswith(user_dir):
        return jsonify({'error': 'Access denied'}), 403

    files = []
    if os.path.exists(target_path) and os.path.isdir(target_path):
        for item in os.listdir(target_path):
            item_path = os.path.join(target_path, item)

            if os.path.isfile(item_path):
                files.append({
                    'name': item,
                    'type': 'file',
                    'size': os.path.getsize(item_path),
                    'icon': get_file_icon(item),
                    'modified': datetime.fromtimestamp(os.path.getmtime(item_path)).isoformat()
                })
            elif os.path.isdir(item_path):
                files.append({
                    'name': item,
                    'type': 'folder',
                    'icon': '📁',
                    'modified': datetime.fromtimestamp(os.path.getmtime(item_path)).isoformat()
                })

    return jsonify({
        'files': files,
        'path': filepath,
        'writable': True  # User has full access to their own files
    })


def get_file_icon(filename):
    """Get icon for file based on extension"""
    ext = os.path.splitext(filename)[1].lower()

    icon_map = {
        '.txt': '📄', '.md': '📄', '.doc': '📄', '.docx': '📄',
        '.pdf': '📋', '.rtf': '📄',
        '.jpg': '🖼️', '.jpeg': '🖼️', '.png': '🖼️', '.gif': '🖼️', '.bmp': '🖼️', '.svg': '🖼️',
        '.mp3': '🎵', '.wav': '🎵', '.flac': '🎵', '.aac': '🎵', '.ogg': '🎵',
        '.mp4': '🎬', '.avi': '🎬', '.mov': '🎬', '.wmv': '🎬', '.flv': '🎬', '.webm': '🎬',
        '.zip': '📦', '.rar': '📦', '.7z': '📦', '.tar': '📦', '.gz': '📦',
        '.js': '⚙️', '.html': '🌐', '.css': '🎨', '.py': '🐍', '.java': '☕', '.cpp': '⚙️', '.c': '⚙️',
        '.xlsx': '📊', '.xls': '📊', '.csv': '📊',
        '.ppt': '📽️', '.pptx': '📽️'
    }

    return icon_map.get(ext, '📄')


# ========================
# USER MANAGEMENT
# ========================

def get_users_file():
    """Get path to users database"""
    return os.path.join(os.path.dirname(os.path.dirname(__file__)), 'users.json')


def init_user_storage():
    """Initialize user storage system"""
    users_file = get_users_file()
    if not os.path.exists(users_file):
        # Create with demo admin user
        users = {
            'admin': {
                'password': hash_password('admin123'),
                'created': datetime.now().isoformat(),
                'role': 'admin',
                'last_login': None
            }
        }
        save_users(users)
        print("✅ Created default admin user (admin/admin123)")


def load_users():
    """Load users from JSON file"""
    users_file = get_users_file()
    try:
        if os.path.exists(users_file):
            with open(users_file, 'r', encoding='utf-8') as f:
                return json.load(f)
    except Exception as e:
        print(f"❌ Error loading users: {e}")
    return {}


def save_users(users):
    """Save users to JSON file"""
    users_file = get_users_file()
    try:
        os.makedirs(os.path.dirname(users_file), exist_ok=True)
        with open(users_file, 'w', encoding='utf-8') as f:
            json.dump(users, f, indent=2, ensure_ascii=False)
        return True
    except Exception as e:
        print(f"❌ Error saving users: {e}")
        return False


def hash_password(password):
    """Hash password with salt"""
    salt = "emberframe_salt_2024"
    return hashlib.sha256((password + salt).encode()).hexdigest()


def create_user(username, password):
    """Create new user account"""
    users = load_users()

    if username in users:
        return False

    users[username] = {
        'password': hash_password(password),
        'created': datetime.now().isoformat(),
        'last_login': None,
        'role': 'user'
    }

    if save_users(users):
        ensure_user_directory(username)
        return True
    return False


def authenticate_user(username, password):
    """Authenticate user credentials"""
    users = load_users()

    if username not in users:
        print(f"❌ User not found: {username}")
        return False

    user = users[username]
    provided_hash = hash_password(password)
    stored_hash = user['password']

    if provided_hash == stored_hash:
        # Update last login
        user['last_login'] = datetime.now().isoformat()
        save_users(users)
        print(f"✅ Authentication successful: {username}")
        return True
    else:
        print(f"❌ Wrong password for: {username}")
        return False


def is_admin_user(username):
    """Check if user is admin"""
    users = load_users()
    user = users.get(username, {})
    return user.get('role', 'user') == 'admin'


def ensure_user_directory(username):
    """Create user directory structure with proper permissions"""
    base_dir = os.path.dirname(os.path.dirname(__file__))
    user_dir = os.path.join(base_dir, 'user_data', username)

    # Create user directory
    os.makedirs(user_dir, exist_ok=True)

    # Create default subdirectories
    subdirs = ['Documents', 'Downloads', 'Pictures', 'Desktop', 'Projects', 'Music', 'Videos']
    for subdir in subdirs:
        os.makedirs(os.path.join(user_dir, subdir), exist_ok=True)

    # Create shortcuts directory for desktop customization
    shortcuts_dir = os.path.join(user_dir, '.shortcuts')
    os.makedirs(shortcuts_dir, exist_ok=True)

    # Initialize default shortcuts if not exist
    desktop_shortcuts_file = os.path.join(shortcuts_dir, 'desktop.json')
    taskbar_shortcuts_file = os.path.join(shortcuts_dir, 'taskbar.json')

    if not os.path.exists(desktop_shortcuts_file):
        default_desktop_shortcuts = [
            {"app": "file-manager", "x": 30, "y": 30},
            {"app": "terminal", "x": 140, "y": 30},
            {"app": "text-editor", "x": 30, "y": 150},
            {"app": "settings", "x": 140, "y": 150}
        ]
        save_user_shortcuts(username, 'desktop', default_desktop_shortcuts)

    if not os.path.exists(taskbar_shortcuts_file):
        default_taskbar_shortcuts = []
        save_user_shortcuts(username, 'taskbar', default_taskbar_shortcuts)

    # Create welcome file
    welcome_file = os.path.join(user_dir, 'Documents', 'Welcome.txt')
    if not os.path.exists(welcome_file):
        is_admin = is_admin_user(username)
        admin_section = """
Admin Features:
- Access the Admin Panel to manage public files
- Upload files to public directories for all users
- Manage system-wide settings and user access
- Monitor user activity and system statistics
""" if is_admin else ""

        welcome_text = f"""Welcome to EmberFrame, {username}!

Your personal workspace has been initialized.

Available Applications:
• File Manager - Browse and organize your files
• Terminal - Command line interface
• Text Editor - Create and edit documents
• Media Player - Play audio and video files
• Settings - Customize your experience
• Public Files - Access shared files from administrators

Getting Started:
1. Double-click desktop icons to open applications
2. Use the Start menu for quick access to all apps
3. Drag windows to move them around (desktop only)
4. Right-click desktop to add/remove shortcuts
5. Right-click start menu apps to add to taskbar
6. Access public files through the Public Files icon

Your Private Directories:
- Documents: For text files and documents
- Downloads: For downloaded files
- Pictures: For images and photos
- Music: For audio files
- Videos: For video files
- Projects: For your work projects

Customization:
- Right-click empty desktop space to add app shortcuts
- Right-click desktop icons to remove them
- Right-click start menu apps to add to taskbar
- Right-click taskbar shortcuts to remove them
- Use Settings app to customize themes and preferences
{admin_section}
File Access:
- Your files are private and only accessible to you
- Public files are shared but read-only (admins can upload)
- Use File Manager to organize and access all your files

Enjoy exploring EmberFrame!

Account Type: {'Administrator' if is_admin else 'Standard User'}
Created: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
"""

        try:
            with open(welcome_file, 'w', encoding='utf-8') as f:
                f.write(welcome_text)
        except Exception as e:
            print(f"⚠️ Could not create welcome file: {e}")


def save_user_shortcuts(username, shortcut_type, shortcuts):
    """Save user shortcuts (desktop or taskbar)"""
    try:
        base_dir = os.path.dirname(os.path.dirname(__file__))
        shortcuts_dir = os.path.join(base_dir, 'user_data', username, '.shortcuts')
        os.makedirs(shortcuts_dir, exist_ok=True)

        shortcuts_file = os.path.join(shortcuts_dir, f'{shortcut_type}.json')
        with open(shortcuts_file, 'w', encoding='utf-8') as f:
            json.dump(shortcuts, f, indent=2)
        return True
    except Exception as e:
        print(f"Error saving shortcuts: {e}")
        return False


def load_user_shortcuts(username, shortcut_type):
    """Load user shortcuts (desktop or taskbar)"""
    try:
        base_dir = os.path.dirname(os.path.dirname(__file__))
        shortcuts_file = os.path.join(base_dir, 'user_data', username, '.shortcuts', f'{shortcut_type}.json')

        if os.path.exists(shortcuts_file):
            with open(shortcuts_file, 'r', encoding='utf-8') as f:
                return json.load(f)
    except Exception as e:
        print(f"Error loading shortcuts: {e}")

    return []


def ensure_public_directories():
    """Create public directory structure (admin can write, others read)"""
    base_dir = os.path.dirname(os.path.dirname(__file__))
    public_dir = os.path.join(base_dir, 'public_data')

    # Create public directories
    public_subdirs = ['documents', 'media', 'software', 'shared']
    for subdir in public_subdirs:
        os.makedirs(os.path.join(public_dir, subdir), exist_ok=True)

    # Create README file
    readme_file = os.path.join(public_dir, 'README.txt')
    if not os.path.exists(readme_file):
        readme_text = f"""EmberFrame Public Files

This directory contains files accessible to all users.

Directories:
- documents/: Shared documents and text files
- media/: Audio, video, and image files
- software/: Shared applications and tools
- shared/: General shared files

Access Permissions:
- Administrators: Full read/write access
- Regular Users: Read-only access

Note: Only administrators can upload files here.
Use the Admin Panel to manage public files.

Last updated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
"""
        try:
            with open(readme_file, 'w', encoding='utf-8') as f:
                f.write(readme_text)
        except Exception as e:
            print(f"⚠️ Could not create public README: {e}")


def ensure_directories(config):
    """Create necessary directories"""
    directories = [
        config['UPLOAD_FOLDER'],
        config['PUBLIC_FOLDER'],
        os.path.join(os.path.dirname(os.path.dirname(__file__)), 'logs'),
        os.path.join(os.path.dirname(os.path.dirname(__file__)), 'users')
    ]

    for directory in directories:
        try:
            os.makedirs(directory, exist_ok=True)
        except Exception as e:
            print(f"⚠️ Could not create directory {directory}: {e}")

    # Ensure public directories are created
    ensure_public_directories()