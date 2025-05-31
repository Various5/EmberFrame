# app/__init__.py - Complete EmberFrame Application with Admin API
from flask import Flask, render_template, request, jsonify, session, redirect, url_for, send_file, send_from_directory
from flask_socketio import SocketIO
import os
import json
import hashlib
import shutil
import sqlite3
import time
import psutil
import platform
from datetime import datetime, timedelta
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
        WTF_CSRF_TIME_LIMIT=None,
        DATABASE_FILE=os.path.join(project_root, 'emberframe.db')
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
        os.path.join(project_root, 'logs'),
        os.path.join(project_root, 'shared')
    ]:
        os.makedirs(directory, exist_ok=True)

    # Initialize database
    init_database(app)

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

                # Create user record if doesn't exist
                create_user_if_not_exists(app.config['DATABASE_FILE'], username, password)
                ensure_user_directory(username, app.config['UPLOAD_FOLDER'])

                # Log the login
                log_activity(app.config['DATABASE_FILE'], username, 'login', f'User {username} logged in',
                             request.remote_addr)

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

            # Check if user already exists
            if user_exists(app.config['DATABASE_FILE'], username):
                return jsonify({'success': False, 'message': 'Username already exists'})

            # Create the user
            create_user(app.config['DATABASE_FILE'], username, password)
            ensure_user_directory(username, app.config['UPLOAD_FOLDER'])

            # Log the registration
            log_activity(app.config['DATABASE_FILE'], username, 'register', f'User {username} registered',
                         request.remote_addr)

            print(f"✅ Registration successful: {username}")
            return jsonify({'success': True, 'message': 'Registration successful'})

        except Exception as e:
            print(f"❌ Registration error: {e}")
            return jsonify({'success': False, 'message': 'Registration error occurred'})

    @app.route('/logout')
    def logout():
        """Handle logout"""
        username = session.get('username', 'unknown')

        # Log the logout
        if username != 'unknown':
            log_activity(app.config['DATABASE_FILE'], username, 'logout', f'User {username} logged out',
                         request.remote_addr)

        session.clear()
        print(f"👋 Logout: {username}")
        return redirect(url_for('login_page'))

    # =====================
    # ADMIN API ROUTES
    # =====================

    @app.route('/api/admin/check')
    def admin_check():
        """Check if current user is admin"""
        if 'username' not in session:
            return jsonify({'is_admin': False, 'error': 'Not authenticated'})

        username = session['username']
        is_admin = check_admin_status(app.config['DATABASE_FILE'], username)

        return jsonify({
            'is_admin': is_admin,
            'username': username
        })

    @app.route('/api/admin/system-stats')
    def admin_system_stats():
        """Get system statistics"""
        if not is_admin_user():
            return jsonify({'error': 'Admin access required'}), 403

        try:
            stats = get_system_stats(app.config['DATABASE_FILE'])
            return jsonify({'success': True, 'stats': stats})
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @app.route('/api/admin/file-stats')
    def admin_file_stats():
        """Get file system statistics"""
        if not is_admin_user():
            return jsonify({'error': 'Admin access required'}), 403

        try:
            public_files = count_files_in_directory(app.config['PUBLIC_FOLDER'])
            total_storage = get_directory_size(app.config['UPLOAD_FOLDER']) + get_directory_size(
                app.config['PUBLIC_FOLDER'])
            user_directories = count_user_directories(app.config['UPLOAD_FOLDER'])

            return jsonify({
                'success': True,
                'public_files': public_files,
                'total_storage': total_storage,
                'user_directories': user_directories
            })
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @app.route('/api/admin/system-info')
    def admin_system_info():
        """Get detailed system information"""
        if not is_admin_user():
            return jsonify({'error': 'Admin access required'}), 403

        try:
            # Get system info
            info = {
                'uptime': time.time() - psutil.boot_time(),
                'platform': platform.platform(),
                'python_version': platform.python_version(),
                'storage': get_storage_info(),
                'memory': get_memory_info(),
                'load': get_load_average(),
                'sessions': get_active_sessions_count(app.config['DATABASE_FILE'])
            }

            return jsonify({'success': True, **info})
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @app.route('/api/admin/users')
    def admin_get_users():
        """Get all users"""
        if not is_admin_user():
            return jsonify({'error': 'Admin access required'}), 403

        try:
            users = get_all_users(app.config['DATABASE_FILE'])
            stats = get_user_stats(app.config['DATABASE_FILE'])

            return jsonify({
                'success': True,
                'users': users,
                'stats': stats
            })
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @app.route('/api/admin/users/<int:user_id>')
    def admin_get_user(user_id):
        """Get specific user"""
        if not is_admin_user():
            return jsonify({'error': 'Admin access required'}), 403

        try:
            user = get_user_by_id(app.config['DATABASE_FILE'], user_id)
            if not user:
                return jsonify({'error': 'User not found'}), 404

            return jsonify({'success': True, 'user': user})
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @app.route('/api/admin/users', methods=['POST'])
    def admin_create_user():
        """Create new user"""
        if not is_admin_user():
            return jsonify({'error': 'Admin access required'}), 403

        try:
            data = request.get_json()
            username = data.get('username', '').strip()
            password = data.get('password', '')
            email = data.get('email', '').strip()
            is_admin = data.get('is_admin', False)
            is_active = data.get('is_active', True)
            quota_mb = data.get('quota_mb', 100)

            # Validation
            if not username or len(username) < 3:
                return jsonify({'error': 'Username must be at least 3 characters'}), 400

            if not password or len(password) < 6:
                return jsonify({'error': 'Password must be at least 6 characters'}), 400

            if user_exists(app.config['DATABASE_FILE'], username):
                return jsonify({'error': 'Username already exists'}), 400

            # Create user
            user_id = create_user(app.config['DATABASE_FILE'], username, password, email, is_admin, is_active, quota_mb)
            ensure_user_directory(username, app.config['UPLOAD_FOLDER'])

            # Log the action
            log_activity(app.config['DATABASE_FILE'], session['username'], 'admin', f'Created user {username}',
                         request.remote_addr)

            return jsonify({'success': True, 'user_id': user_id, 'message': 'User created successfully'})
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @app.route('/api/admin/users/<int:user_id>', methods=['PUT'])
    def admin_update_user(user_id):
        """Update user"""
        if not is_admin_user():
            return jsonify({'error': 'Admin access required'}), 403

        try:
            data = request.get_json()

            # Get current user data
            user = get_user_by_id(app.config['DATABASE_FILE'], user_id)
            if not user:
                return jsonify({'error': 'User not found'}), 404

            # Update user
            success = update_user(app.config['DATABASE_FILE'], user_id, data)

            if success:
                # Log the action
                log_activity(app.config['DATABASE_FILE'], session['username'], 'admin',
                             f'Updated user {user["username"]}', request.remote_addr)
                return jsonify({'success': True, 'message': 'User updated successfully'})
            else:
                return jsonify({'error': 'Failed to update user'}), 500

        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @app.route('/api/admin/users/<int:user_id>', methods=['DELETE'])
    def admin_delete_user(user_id):
        """Delete user"""
        if not is_admin_user():
            return jsonify({'error': 'Admin access required'}), 403

        try:
            # Get user data before deletion
            user = get_user_by_id(app.config['DATABASE_FILE'], user_id)
            if not user:
                return jsonify({'error': 'User not found'}), 404

            username = user['username']

            # Don't allow deleting yourself
            if username == session['username']:
                return jsonify({'error': 'Cannot delete your own account'}), 400

            # Delete user directory
            user_dir = os.path.join(app.config['UPLOAD_FOLDER'], username)
            if os.path.exists(user_dir):
                shutil.rmtree(user_dir)

            # Delete user from database
            success = delete_user(app.config['DATABASE_FILE'], user_id)

            if success:
                # Log the action
                log_activity(app.config['DATABASE_FILE'], session['username'], 'admin', f'Deleted user {username}',
                             request.remote_addr)
                return jsonify({'success': True, 'message': 'User deleted successfully'})
            else:
                return jsonify({'error': 'Failed to delete user'}), 500

        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @app.route('/api/admin/files/<file_type>')
    def admin_get_files(file_type):
        """Get files by type (public, users, system)"""
        if not is_admin_user():
            return jsonify({'error': 'Admin access required'}), 403

        try:
            files = []

            if file_type == 'public':
                files = list_directory_files(app.config['PUBLIC_FOLDER'], 'public')
            elif file_type == 'users':
                files = list_user_files(app.config['UPLOAD_FOLDER'])
            elif file_type == 'system':
                files = list_system_files(project_root)

            return jsonify({'success': True, 'files': files})
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @app.route('/api/admin/logs')
    def admin_get_logs():
        """Get activity logs"""
        if not is_admin_user():
            return jsonify({'error': 'Admin access required'}), 403

        try:
            filter_type = request.args.get('filter', 'all')
            limit = int(request.args.get('limit', 200))

            logs = get_activity_logs(app.config['DATABASE_FILE'], filter_type, limit)

            return jsonify({'success': True, 'logs': logs})
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @app.route('/api/admin/backup-database', methods=['POST'])
    def admin_backup_database():
        """Create database backup"""
        if not is_admin_user():
            return jsonify({'error': 'Admin access required'}), 403

        try:
            backup_file = create_database_backup(app.config['DATABASE_FILE'])

            # Log the action
            log_activity(app.config['DATABASE_FILE'], session['username'], 'admin', 'Created database backup',
                         request.remote_addr)

            return jsonify({'success': True, 'backup_file': backup_file})
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    # =====================
    # FILE API ROUTES
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
            # Normalize the path
            if not filepath:
                filepath = 'home'

            # Determine the actual filesystem path
            if filepath.startswith('public/') or filepath == 'public':
                # Public files
                if filepath == 'public':
                    actual_path = app.config['PUBLIC_FOLDER']
                    relative_path = ''
                else:
                    relative_path = filepath[7:]  # Remove 'public/'
                    actual_path = os.path.join(app.config['PUBLIC_FOLDER'], relative_path)
                writable = True  # Public folder is writable

            elif filepath.startswith('home/') or filepath == 'home':
                # User home directory
                if filepath == 'home':
                    actual_path = os.path.join(app.config['UPLOAD_FOLDER'], username)
                    relative_path = ''
                else:
                    relative_path = filepath[5:]  # Remove 'home/'
                    actual_path = os.path.join(app.config['UPLOAD_FOLDER'], username, relative_path)
                writable = True

            elif filepath.startswith('shared/') or filepath == 'shared':
                # Shared files
                shared_folder = os.path.join(project_root, 'shared')
                if filepath == 'shared':
                    actual_path = shared_folder
                    relative_path = ''
                else:
                    relative_path = filepath[7:]  # Remove 'shared/'
                    actual_path = os.path.join(shared_folder, relative_path)
                writable = True

            else:
                # Default to user home
                actual_path = os.path.join(app.config['UPLOAD_FOLDER'], username, filepath)
                relative_path = filepath
                writable = True

            # Ensure the directory exists
            if not os.path.exists(actual_path):
                os.makedirs(actual_path, exist_ok=True)

            # List files
            files = []
            if os.path.isdir(actual_path):
                for item in os.listdir(actual_path):
                    item_path = os.path.join(actual_path, item)

                    file_info = {
                        'name': item,
                        'type': 'folder' if os.path.isdir(item_path) else 'file',
                        'size': os.path.getsize(item_path) if os.path.isfile(item_path) else 0,
                        'modified': datetime.fromtimestamp(os.path.getmtime(item_path)).isoformat(),
                        'icon': get_file_icon(item)
                    }
                    files.append(file_info)

            return jsonify({
                'files': files,
                'path': filepath,
                'writable': writable
            })

        except Exception as e:
            print(f"Error listing files: {e}")
            return jsonify({'error': str(e)}), 500

    @app.route('/api/files/upload', methods=['POST'])
    def upload_files():
        """Upload files"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        username = session['username']

        try:
            path = request.form.get('path', 'home')
            files = request.files.getlist('files')

            if not files:
                return jsonify({'error': 'No files provided'}), 400

            # Determine upload directory
            if path.startswith('public/') or path == 'public':
                if path == 'public':
                    upload_dir = app.config['PUBLIC_FOLDER']
                else:
                    upload_dir = os.path.join(app.config['PUBLIC_FOLDER'], path[7:])
            else:
                # Default to user directory
                if path.startswith('home/'):
                    relative_path = path[5:] if len(path) > 5 else ''
                else:
                    relative_path = path if path != 'home' else ''

                upload_dir = os.path.join(app.config['UPLOAD_FOLDER'], username, relative_path)

            os.makedirs(upload_dir, exist_ok=True)

            uploaded_files = []
            for file in files:
                if file.filename:
                    filename = secure_filename(file.filename)
                    file_path = os.path.join(upload_dir, filename)
                    file.save(file_path)
                    uploaded_files.append(filename)

            # Log the upload
            log_activity(app.config['DATABASE_FILE'], username, 'file',
                         f'Uploaded {len(uploaded_files)} files to {path}', request.remote_addr)

            return jsonify({
                'success': True,
                'uploaded_files': uploaded_files,
                'message': f'{len(uploaded_files)} files uploaded successfully'
            })

        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @app.route('/api/files/storage-info')
    def storage_info():
        """Get storage information"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        username = session['username']

        try:
            user_dir = os.path.join(app.config['UPLOAD_FOLDER'], username)

            # Get user's quota (default 100MB)
            user_data = get_user_by_username(app.config['DATABASE_FILE'], username)
            quota_mb = user_data.get('quota_mb', 100) if user_data else 100
            quota_bytes = quota_mb * 1024 * 1024

            # Calculate used space
            used_bytes = get_directory_size(user_dir)

            return jsonify({
                'used': used_bytes,
                'total': quota_bytes,
                'available': quota_bytes - used_bytes
            })

        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @app.route('/api/apps/available')
    def get_available_apps():
        """Get available applications"""
        try:
            apps = []

            # Scan the apps directory for available apps
            apps_dir = os.path.join(static_dir, 'js', 'apps')
            if os.path.exists(apps_dir):
                for file in os.listdir(apps_dir):
                    if file.endswith('.js'):
                        app_info = parse_app_metadata(os.path.join(apps_dir, file))
                        if app_info and app_info.get('enabled', True):
                            app_info['file'] = file
                            apps.append(app_info)

            return jsonify({'success': True, 'apps': apps})
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @app.route('/api/user/preferences')
    def get_user_preferences():
        """Get user preferences"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        username = session['username']

        try:
            user_data = get_user_by_username(app.config['DATABASE_FILE'], username)
            preferences = json.loads(user_data.get('preferences', '{}')) if user_data else {}

            return jsonify({
                'success': True,
                'preferences': preferences,
                'user': {
                    'username': username,
                    'isAdmin': check_admin_status(app.config['DATABASE_FILE'], username)
                }
            })
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @app.route('/api/user/preferences', methods=['POST'])
    def save_user_preferences():
        """Save user preferences"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        username = session['username']

        try:
            preferences = request.get_json()
            save_user_preferences_db(app.config['DATABASE_FILE'], username, preferences)

            return jsonify({'success': True})
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    print("✅ EmberFrame app initialized successfully!")
    return app


# =====================
# DATABASE FUNCTIONS
# =====================

def init_database(app):
    """Initialize the database"""
    db_path = app.config['DATABASE_FILE']

    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # Create users table
    cursor.execute('''
                   CREATE TABLE IF NOT EXISTS users
                   (
                       id
                       INTEGER
                       PRIMARY
                       KEY
                       AUTOINCREMENT,
                       username
                       TEXT
                       UNIQUE
                       NOT
                       NULL,
                       password_hash
                       TEXT
                       NOT
                       NULL,
                       email
                       TEXT,
                       is_admin
                       BOOLEAN
                       DEFAULT
                       FALSE,
                       is_active
                       BOOLEAN
                       DEFAULT
                       TRUE,
                       quota_mb
                       INTEGER
                       DEFAULT
                       100,
                       preferences
                       TEXT
                       DEFAULT
                       '{}',
                       created_at
                       TIMESTAMP
                       DEFAULT
                       CURRENT_TIMESTAMP,
                       last_active
                       TIMESTAMP
                       DEFAULT
                       CURRENT_TIMESTAMP
                   )
                   ''')

    # Create activity logs table
    cursor.execute('''
                   CREATE TABLE IF NOT EXISTS activity_logs
                   (
                       id
                       INTEGER
                       PRIMARY
                       KEY
                       AUTOINCREMENT,
                       username
                       TEXT
                       NOT
                       NULL,
                       action_type
                       TEXT
                       NOT
                       NULL,
                       message
                       TEXT
                       NOT
                       NULL,
                       ip_address
                       TEXT,
                       timestamp
                       TIMESTAMP
                       DEFAULT
                       CURRENT_TIMESTAMP
                   )
                   ''')

    # Create default admin user if no users exist
    cursor.execute('SELECT COUNT(*) FROM users')
    user_count = cursor.fetchone()[0]

    if user_count == 0:
        password_hash = hashlib.sha256('admin'.encode()).hexdigest()
        cursor.execute('''
                       INSERT INTO users (username, password_hash, is_admin, email)
                       VALUES (?, ?, ?, ?)
                       ''', ('admin', password_hash, True, 'admin@emberframe.local'))
        print("✅ Created default admin user: admin/admin")

    conn.commit()
    conn.close()


def create_user_if_not_exists(db_path, username, password):
    """Create user if doesn't exist"""
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    cursor.execute('SELECT id FROM users WHERE username = ?', (username,))
    if not cursor.fetchone():
        password_hash = hashlib.sha256(password.encode()).hexdigest()
        cursor.execute('''
                       INSERT INTO users (username, password_hash, last_active)
                       VALUES (?, ?, ?)
                       ''', (username, password_hash, datetime.now()))
        conn.commit()

    conn.close()


def create_user(db_path, username, password, email='', is_admin=False, is_active=True, quota_mb=100):
    """Create a new user"""
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    password_hash = hashlib.sha256(password.encode()).hexdigest()
    cursor.execute('''
                   INSERT INTO users (username, password_hash, email, is_admin, is_active, quota_mb)
                   VALUES (?, ?, ?, ?, ?, ?)
                   ''', (username, password_hash, email, is_admin, is_active, quota_mb))

    user_id = cursor.lastrowid
    conn.commit()
    conn.close()

    return user_id


def user_exists(db_path, username):
    """Check if user exists"""
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    cursor.execute('SELECT id FROM users WHERE username = ?', (username,))
    exists = cursor.fetchone() is not None

    conn.close()
    return exists


def check_admin_status(db_path, username):
    """Check if user is admin"""
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    cursor.execute('SELECT is_admin FROM users WHERE username = ?', (username,))
    result = cursor.fetchone()

    conn.close()
    return result[0] if result else False


def get_all_users(db_path):
    """Get all users"""
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    cursor.execute('''
                   SELECT id,
                          username,
                          email,
                          is_admin,
                          is_active,
                          quota_mb,
                          created_at,
                          last_active
                   FROM users
                   ORDER BY created_at DESC
                   ''')

    users = [dict(row) for row in cursor.fetchall()]
    conn.close()

    return users


def get_user_by_id(db_path, user_id):
    """Get user by ID"""
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    cursor.execute('SELECT * FROM users WHERE id = ?', (user_id,))
    result = cursor.fetchone()

    conn.close()
    return dict(result) if result else None


def get_user_by_username(db_path, username):
    """Get user by username"""
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    cursor.execute('SELECT * FROM users WHERE username = ?', (username,))
    result = cursor.fetchone()

    conn.close()
    return dict(result) if result else None


def update_user(db_path, user_id, data):
    """Update user"""
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # Build update query dynamically
    fields = []
    values = []

    for field in ['username', 'email', 'is_admin', 'is_active', 'quota_mb']:
        if field in data:
            fields.append(f'{field} = ?')
            values.append(data[field])

    if 'password' in data and data['password']:
        fields.append('password_hash = ?')
        values.append(hashlib.sha256(data['password'].encode()).hexdigest())

    if fields:
        values.append(user_id)
        query = f'UPDATE users SET {", ".join(fields)} WHERE id = ?'
        cursor.execute(query, values)
        success = cursor.rowcount > 0
    else:
        success = True

    conn.commit()
    conn.close()

    return success


def delete_user(db_path, user_id):
    """Delete user"""
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    cursor.execute('DELETE FROM users WHERE id = ?', (user_id,))
    success = cursor.rowcount > 0

    conn.commit()
    conn.close()

    return success


def get_user_stats(db_path):
    """Get user statistics"""
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # Total users
    cursor.execute('SELECT COUNT(*) FROM users')
    total = cursor.fetchone()[0]

    # Active users
    cursor.execute('SELECT COUNT(*) FROM users WHERE is_active = 1')
    active = cursor.fetchone()[0]

    # Admin users
    cursor.execute('SELECT COUNT(*) FROM users WHERE is_admin = 1')
    admins = cursor.fetchone()[0]

    # New users this week
    week_ago = datetime.now() - timedelta(days=7)
    cursor.execute('SELECT COUNT(*) FROM users WHERE created_at > ?', (week_ago,))
    new_this_week = cursor.fetchone()[0]

    conn.close()

    return {
        'total': total,
        'active': active,
        'admins': admins,
        'new_this_week': new_this_week
    }


def log_activity(db_path, username, action_type, message, ip_address=None):
    """Log user activity"""
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    cursor.execute('''
                   INSERT INTO activity_logs (username, action_type, message, ip_address)
                   VALUES (?, ?, ?, ?)
                   ''', (username, action_type, message, ip_address))

    conn.commit()
    conn.close()


def get_activity_logs(db_path, filter_type='all', limit=200):
    """Get activity logs"""
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    if filter_type == 'all':
        cursor.execute('''
                       SELECT *
                       FROM activity_logs
                       ORDER BY timestamp DESC LIMIT ?
                       ''', (limit,))
    else:
        cursor.execute('''
                       SELECT *
                       FROM activity_logs
                       WHERE action_type = ?
                       ORDER BY timestamp DESC LIMIT ?
                       ''', (filter_type, limit))

    logs = []
    for row in cursor.fetchall():
        log_entry = dict(row)
        log_entry['user'] = log_entry['username']
        log_entry['type'] = log_entry['action_type']
        logs.append(log_entry)

    conn.close()
    return logs


def save_user_preferences_db(db_path, username, preferences):
    """Save user preferences"""
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    cursor.execute('''
                   UPDATE users
                   SET preferences = ?
                   WHERE username = ?
                   ''', (json.dumps(preferences), username))

    conn.commit()
    conn.close()


# =====================
# UTILITY FUNCTIONS
# =====================

def ensure_user_directory(username, upload_folder):
    """Create user directory"""
    user_dir = os.path.join(upload_folder, username)
    os.makedirs(user_dir, exist_ok=True)

    # Create default directories
    default_dirs = ['Documents', 'Downloads', 'Pictures', 'Desktop', 'Music']
    for dir_name in default_dirs:
        os.makedirs(os.path.join(user_dir, dir_name), exist_ok=True)


def is_admin_user():
    """Check if current session user is admin"""
    if 'username' not in session:
        return False

    # This is a simplified check - in a real app you'd check the database
    username = session['username']
    return username == 'admin'  # Simplified for demo


def get_file_icon(filename):
    """Get file icon"""
    ext = filename.split('.')[-1].lower() if '.' in filename else ''

    icon_map = {
        'folder': 'fas fa-folder',
        'txt': 'fas fa-file-alt',
        'pdf': 'fas fa-file-pdf',
        'doc': 'fas fa-file-word',
        'xls': 'fas fa-file-excel',
        'jpg': 'fas fa-image',
        'png': 'fas fa-image',
        'mp3': 'fas fa-music',
        'mp4': 'fas fa-video',
        'zip': 'fas fa-file-archive'
    }

    return icon_map.get(ext, 'fas fa-file')


def get_directory_size(directory):
    """Get total size of directory"""
    total_size = 0
    try:
        for dirpath, dirnames, filenames in os.walk(directory):
            for filename in filenames:
                filepath = os.path.join(dirpath, filename)
                if os.path.exists(filepath):
                    total_size += os.path.getsize(filepath)
    except OSError:
        pass
    return total_size


def count_files_in_directory(directory):
    """Count files in directory"""
    count = 0
    try:
        for root, dirs, files in os.walk(directory):
            count += len(files)
    except OSError:
        pass
    return count


def count_user_directories(upload_folder):
    """Count user directories"""
    try:
        return len([d for d in os.listdir(upload_folder) if os.path.isdir(os.path.join(upload_folder, d))])
    except OSError:
        return 0


def get_system_stats(db_path):
    """Get system statistics"""
    stats = {}

    # User stats
    stats['users'] = get_user_stats(db_path)

    return stats


def get_storage_info():
    """Get storage information"""
    try:
        statvfs = os.statvfs('.')
        total = statvfs.f_frsize * statvfs.f_blocks
        free = statvfs.f_frsize * statvfs.f_available
        used = total - free

        return {
            'total': total,
            'used': used,
            'free': free
        }
    except:
        return {'total': 0, 'used': 0, 'free': 0}


def get_memory_info():
    """Get memory information"""
    try:
        memory = psutil.virtual_memory()
        return f"{memory.percent}% ({memory.used // (1024 ** 3)}GB / {memory.total // (1024 ** 3)}GB)"
    except:
        return "N/A"


def get_load_average():
    """Get load average"""
    try:
        load = os.getloadavg()
        return f"{load[0]:.2f}, {load[1]:.2f}, {load[2]:.2f}"
    except:
        return "N/A"


def get_active_sessions_count(db_path):
    """Get count of active sessions"""
    # This is simplified - in a real app you'd track active sessions
    return {'active': 1}


def parse_app_metadata(file_path):
    """Parse app metadata from JavaScript file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Look for APP_METADATA comment block
        if 'APP_METADATA' in content:
            lines = content.split('\n')
            metadata = {}

            for line in lines:
                line = line.strip()
                if line.startswith('* @'):
                    parts = line[3:].split(' ', 1)
                    if len(parts) == 2:
                        key, value = parts
                        if key == 'enabled':
                            metadata[key] = value.lower() == 'true'
                        else:
                            metadata[key] = value

            # Generate ID from filename
            filename = os.path.basename(file_path)
            metadata['id'] = filename.replace('.js', '').replace('_', '-')

            return metadata
    except:
        pass

    return None


def list_directory_files(directory, prefix=''):
    """List files in directory for admin"""
    files = []
    try:
        for item in os.listdir(directory):
            item_path = os.path.join(directory, item)
            file_info = {
                'name': item,
                'type': 'folder' if os.path.isdir(item_path) else 'file',
                'size': os.path.getsize(item_path) if os.path.isfile(item_path) else 0,
                'modified': datetime.fromtimestamp(os.path.getmtime(item_path)).isoformat(),
                'path': f"{prefix}/{item}" if prefix else item,
                'owner': 'system'
            }
            files.append(file_info)
    except OSError:
        pass

    return files


def list_user_files(upload_folder):
    """List user files for admin"""
    files = []
    try:
        for user_dir in os.listdir(upload_folder):
            user_path = os.path.join(upload_folder, user_dir)
            if os.path.isdir(user_path):
                for root, dirs, filenames in os.walk(user_path):
                    for filename in filenames:
                        file_path = os.path.join(root, filename)
                        rel_path = os.path.relpath(file_path, upload_folder)

                        file_info = {
                            'name': filename,
                            'type': 'file',
                            'size': os.path.getsize(file_path),
                            'modified': datetime.fromtimestamp(os.path.getmtime(file_path)).isoformat(),
                            'path': rel_path,
                            'owner': user_dir
                        }
                        files.append(file_info)
    except OSError:
        pass

    return files


def list_system_files(project_root):
    """List system files for admin"""
    files = []
    system_files = ['app.py', 'run.py', 'config.py', 'requirements.txt', 'README.md']

    for filename in system_files:
        file_path = os.path.join(project_root, filename)
        if os.path.exists(file_path):
            file_info = {
                'name': filename,
                'type': 'file',
                'size': os.path.getsize(file_path),
                'modified': datetime.fromtimestamp(os.path.getmtime(file_path)).isoformat(),
                'path': filename,
                'owner': 'system'
            }
            files.append(file_info)

    return files


def create_database_backup(db_path):
    """Create database backup"""
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    backup_filename = f"emberframe_backup_{timestamp}.db"
    backup_path = os.path.join(os.path.dirname(db_path), 'backups', backup_filename)

    # Create backups directory
    os.makedirs(os.path.dirname(backup_path), exist_ok=True)

    # Copy database
    shutil.copy2(db_path, backup_path)

    return backup_filename