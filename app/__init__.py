# app/__init__.py - Fixed EmberFrame Application
from flask import Flask, render_template, request, jsonify, session, redirect, url_for
from flask_socketio import SocketIO
import os
import json
import hashlib
from datetime import datetime, timedelta

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
    # ROUTES
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
                'csrf_token': token[:20] + '...' if token else None,  # Truncate for security
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

    # API Routes
    @app.route('/api/test')
    def api_test():
        """Test API endpoint"""
        return jsonify({
            'status': 'ok',
            'timestamp': datetime.now().isoformat(),
            'user': session.get('username', 'anonymous')
        })

    @app.route('/api/files')
    @app.route('/api/files/')
    @app.route('/api/files/<path:filepath>')
    def list_files(filepath=''):
        """List files - placeholder"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        return jsonify({
            'files': [],
            'path': filepath,
            'writable': True
        })

    print("✅ EmberFrame app initialized successfully!")
    return app


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
                'role': 'admin'
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


def ensure_user_directory(username):
    """Create user directory structure"""
    base_dir = os.path.dirname(os.path.dirname(__file__))
    user_dir = os.path.join(base_dir, 'user_data', username)

    # Create user directory
    os.makedirs(user_dir, exist_ok=True)

    # Create default subdirectories
    subdirs = ['Documents', 'Downloads', 'Pictures', 'Desktop', 'Projects']
    for subdir in subdirs:
        os.makedirs(os.path.join(user_dir, subdir), exist_ok=True)

    # Create welcome file
    welcome_file = os.path.join(user_dir, 'Documents', 'Welcome.txt')
    if not os.path.exists(welcome_file):
        welcome_text = f"""Welcome to EmberFrame, {username}!

Your personal workspace has been initialized.

Available Applications:
• File Manager - Browse and organize your files
• Terminal - Command line interface
• Text Editor - Create and edit documents
• Settings - Customize your experience

Getting Started:
1. Double-click desktop icons to open applications
2. Use the Start menu for quick access
3. Drag windows to move them around
4. Right-click for context menus

Enjoy exploring EmberFrame!

Created: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
"""

        try:
            with open(welcome_file, 'w', encoding='utf-8') as f:
                f.write(welcome_text)
        except Exception as e:
            print(f"⚠️ Could not create welcome file: {e}")


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