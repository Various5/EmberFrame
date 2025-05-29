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

            # Simple authentication for testing - accept any user with 3+ char username
            if len(username) >= 3 and len(password) >= 1:
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

    # Basic API endpoints
    @app.route('/api/files')
    @app.route('/api/files/')
    @app.route('/api/files/<path:filepath>')
    def list_files(filepath=''):
        """List files in a directory"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        # Return empty file list for now
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

    print("✅ EmberFrame app initialized successfully!")
    return app


def ensure_user_directory(username):
    """Create user directory"""
    user_dir = os.path.join('user_data', username)
    os.makedirs(user_dir, exist_ok=True)

    # Create default directories
    default_dirs = ['Documents', 'Downloads', 'Pictures', 'Desktop']
    for dir_name in default_dirs:
        os.makedirs(os.path.join(user_dir, dir_name), exist_ok=True)
