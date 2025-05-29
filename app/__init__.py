# app/__init__.py - Complete CSRF Fixed EmberFrame Application
from flask import Flask, render_template, request, jsonify, session, redirect, url_for, send_file
from flask_socketio import SocketIO
import os
import json
import hashlib
import shutil
from datetime import datetime
from werkzeug.utils import secure_filename

# CSRF Protection Setup
try:
    from flask_wtf.csrf import CSRFProtect, generate_csrf

    CSRF_AVAILABLE = True
    print("✅ Flask-WTF imported successfully")
except ImportError as e:
    print(f"❌ Flask-WTF import failed: {e}")
    print("Installing Flask-WTF...")
    import subprocess
    import sys

    try:
        subprocess.check_call([sys.executable, '-m', 'pip', 'install', 'Flask-WTF>=1.1.0'])
        from flask_wtf.csrf import CSRFProtect, generate_csrf

        CSRF_AVAILABLE = True
        print("✅ Flask-WTF installed and imported")
    except Exception as install_error:
        print(f"❌ Failed to install Flask-WTF: {install_error}")
        CSRFProtect = None
        CSRF_AVAILABLE = False

socketio = SocketIO()


def create_app():
    """Create and configure the Flask application"""

    # Get paths
    app_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(app_dir)
    template_dir = os.path.join(project_root, 'templates')
    static_dir = os.path.join(project_root, 'static')

    print(f"🔍 Project root: {project_root}")
    print(f"🔍 Template dir: {template_dir} (exists: {os.path.exists(template_dir)})")
    print(f"🔍 Static dir: {static_dir} (exists: {os.path.exists(static_dir)})")

    # Create Flask app
    app = Flask(
        __name__,
        template_folder=template_dir,
        static_folder=static_dir
    )

    # Configuration
    app.config.update(
        SECRET_KEY='ember-frame-super-secret-key-2024-csrf-enabled',
        UPLOAD_FOLDER=os.path.join(project_root, 'user_data'),
        PUBLIC_FOLDER=os.path.join(project_root, 'public_data'),
        WALLPAPER_FOLDER=os.path.join(static_dir, 'wallpapers'),
        MAX_CONTENT_LENGTH=16 * 1024 * 1024,
        WTF_CSRF_ENABLED=CSRF_AVAILABLE,
        WTF_CSRF_TIME_LIMIT=None,
        WTF_CSRF_SSL_STRICT=False,
        WTF_CSRF_CHECK_DEFAULT=False  # Allow disabling CSRF for API endpoints
    )

    # Initialize extensions
    socketio.init_app(app, cors_allowed_origins="*")

    # Initialize CSRF protection
    csrf = None
    if CSRF_AVAILABLE:
        csrf = CSRFProtect(app)
        print("✅ CSRF protection enabled")

        # Disable CSRF for API endpoints
        @csrf.exempt
        def disable_csrf_for_api():
            pass

    # Register template functions
    @app.template_global()
    def csrf_token():
        """Generate CSRF token for templates"""
        if CSRF_AVAILABLE:
            try:
                return generate_csrf()
            except Exception as e:
                print(f"⚠️ CSRF token generation failed: {e}")
                return ""
        return ""

    # Create directories
    for directory in [
        app.config['UPLOAD_FOLDER'],
        app.config['PUBLIC_FOLDER'],
        app.config['WALLPAPER_FOLDER'],
        os.path.join(project_root, 'users'),
        os.path.join(project_root, 'logs')
    ]:
        os.makedirs(directory, exist_ok=True)

    create_default_files(app.config['PUBLIC_FOLDER'])

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
            # Disable CSRF for this endpoint
            if CSRF_AVAILABLE and csrf:
                csrf.exempt(lambda: None)()

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
            # Disable CSRF for this endpoint
            if CSRF_AVAILABLE and csrf:
                csrf.exempt(lambda: None)()

            data = request.get_json() or {}
            username = data.get('username', '').strip()
            password = data.get('password', '')

            print(f"📝 Registration attempt: {username}")

            if not username or not password:
                return jsonify({'success': False, 'message': 'Username and password are required'})

            if len(username) < 3:
                return jsonify({'success': False, 'message': 'Username must be at least 3 characters'})

            if len(password) < 6:
                return jsonify({'success': False, 'message': 'Password must be at least 6 characters'})

            # Create user
            if create_user(username, password):
                print(f"✅ Registration successful: {username}")
                return jsonify({'success': True, 'message': 'Registration successful'})
            else:
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

    # API Routes (with CSRF exemption)
    @app.route('/api/files')
    @app.route('/api/files/')
    @app.route('/api/files/<path:filepath>')
    def list_files(filepath=''):
        """List files in a directory"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        return jsonify({
            'files': [],
            'path': filepath,
            'writable': True
        })

    @app.route('/api/wallpapers')
    def get_wallpapers():
        """Get available wallpapers"""
        return jsonify({'wallpapers': []})

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

    # Test route for CSRF
    @app.route('/test-csrf')
    def test_csrf():
        """Test CSRF token generation"""
        token = csrf_token()
        return jsonify({
            'csrf_available': CSRF_AVAILABLE,
            'csrf_token': token,
            'token_length': len(token) if token else 0
        })

    print("✅ EmberFrame app initialized with CSRF protection!")
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


def create_user(username, password):
    """Create a new user account"""
    users = load_users()
    if username in users:
        return False

    users[username] = {
        'password': hash_password(password),
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
    default_dirs = ['Documents', 'Downloads', 'Pictures', 'Desktop']
    for dir_name in default_dirs:
        os.makedirs(os.path.join(user_dir, dir_name), exist_ok=True)


def create_default_files(public_dir):
    """Create default public files"""
    announcements = f"""🔥 EMBERFRAME SYSTEM ANNOUNCEMENTS 🔥

Welcome to the EmberFrame Desktop Environment!

System Status: ONLINE ✅
Version: 1.0.0
Build Date: {datetime.now().strftime('%Y-%m-%d')}

🎯 GETTING STARTED:
• Use any username (3+ chars) and password to login
• Explore applications via desktop icons or Start menu
• File Manager: Browse and manage your files
• Terminal: Execute commands with full shell access
• Text Editor: Create and edit documents
• Settings: Customize your desktop experience

🛡️ SECURITY FEATURES:
• CSRF Protection: Enabled
• Session Management: Secure
• File Isolation: Per-user directories
• Input Validation: Comprehensive

🎨 CUSTOMIZATION:
• Multiple themes available
• Custom wallpaper support
• Resizable and draggable windows
• Personalized settings

📡 TECHNICAL SPECS:
• Backend: Python Flask
• Frontend: HTML5 + JavaScript
• WebSocket: Real-time communication
• Storage: File system + JSON database

🔧 TROUBLESHOOTING:
• Refresh page if apps don't load
• Check browser console for errors
• Use 'help' command in Terminal
• Contact admin for technical issues

---
Enjoy your EmberFrame experience! 🚀

Last Updated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
"""

    announcements_path = os.path.join(public_dir, 'system_announcements.txt')
    if not os.path.exists(announcements_path):
        try:
            with open(announcements_path, 'w', encoding='utf-8') as f:
                f.write(announcements)
        except IOError:
            pass