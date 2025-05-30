# app/models.py - Database Models for User Preferences
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
import json
from datetime import datetime

db = SQLAlchemy()


class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(120), nullable=False)
    is_admin = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    last_login = db.Column(db.DateTime, default=datetime.utcnow)
    avatar_filename = db.Column(db.String(120), nullable=True)

    # Relationships
    preferences = db.relationship('UserPreferences', backref='user', uselist=False, cascade='all, delete-orphan')
    shortcuts = db.relationship('UserShortcuts', backref='user', cascade='all, delete-orphan')

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


class UserPreferences(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    # Appearance Settings
    theme = db.Column(db.String(50), default='cyber-blue')
    wallpaper = db.Column(db.String(100), default='gradient-1')
    wallpaper_style = db.Column(db.Text, nullable=True)
    animations_enabled = db.Column(db.Boolean, default=True)
    transparency = db.Column(db.Integer, default=0)
    blur_effects = db.Column(db.Boolean, default=True)
    font_family = db.Column(db.String(50), default='Rajdhani')
    font_size = db.Column(db.Integer, default=14)

    # Desktop Settings
    icon_size = db.Column(db.Integer, default=48)
    show_icon_labels = db.Column(db.Boolean, default=True)
    icon_shadows = db.Column(db.Boolean, default=True)
    taskbar_position = db.Column(db.String(20), default='bottom')
    auto_hide_taskbar = db.Column(db.Boolean, default=False)
    show_clock = db.Column(db.Boolean, default=True)
    snap_windows = db.Column(db.Boolean, default=True)
    restore_windows = db.Column(db.Boolean, default=True)
    double_click_action = db.Column(db.String(20), default='maximize')

    # System Settings
    restore_session = db.Column(db.Boolean, default=True)
    startup_sound = db.Column(db.Boolean, default=False)
    session_timeout = db.Column(db.Integer, default=240)
    enable_notifications = db.Column(db.Boolean, default=True)
    notification_duration = db.Column(db.Integer, default=4000)
    notification_position = db.Column(db.String(20), default='top-right')
    hardware_acceleration = db.Column(db.Boolean, default=True)
    animation_quality = db.Column(db.String(20), default='high')
    max_windows = db.Column(db.Integer, default=10)
    auto_logout = db.Column(db.Boolean, default=False)
    remember_login = db.Column(db.Boolean, default=True)

    # Window positions (JSON)
    window_positions = db.Column(db.Text, default='{}')

    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'theme': self.theme,
            'wallpaper': self.wallpaper,
            'wallpaperStyle': self.wallpaper_style,
            'animationsEnabled': self.animations_enabled,
            'transparency': self.transparency,
            'blurEffects': self.blur_effects,
            'fontFamily': self.font_family,
            'fontSize': self.font_size,
            'iconSize': self.icon_size,
            'showIconLabels': self.show_icon_labels,
            'iconShadows': self.icon_shadows,
            'taskbarPosition': self.taskbar_position,
            'autoHideTaskbar': self.auto_hide_taskbar,
            'showClock': self.show_clock,
            'snapWindows': self.snap_windows,
            'restoreWindows': self.restore_windows,
            'doubleClickAction': self.double_click_action,
            'restoreSession': self.restore_session,
            'startupSound': self.startup_sound,
            'sessionTimeout': self.session_timeout,
            'enableNotifications': self.enable_notifications,
            'notificationDuration': self.notification_duration,
            'notificationPosition': self.notification_position,
            'hardwareAcceleration': self.hardware_acceleration,
            'animationQuality': self.animation_quality,
            'maxWindows': self.max_windows,
            'autoLogout': self.auto_logout,
            'rememberLogin': self.remember_login,
            'windows': json.loads(self.window_positions) if self.window_positions else {}
        }

    def update_from_dict(self, data):
        self.theme = data.get('theme', self.theme)
        self.wallpaper = data.get('wallpaper', self.wallpaper)
        self.wallpaper_style = data.get('wallpaperStyle', self.wallpaper_style)
        self.animations_enabled = data.get('animationsEnabled', self.animations_enabled)
        self.transparency = data.get('transparency', self.transparency)
        self.blur_effects = data.get('blurEffects', self.blur_effects)
        self.font_family = data.get('fontFamily', self.font_family)
        self.font_size = data.get('fontSize', self.font_size)
        self.icon_size = data.get('iconSize', self.icon_size)
        self.show_icon_labels = data.get('showIconLabels', self.show_icon_labels)
        self.icon_shadows = data.get('iconShadows', self.icon_shadows)
        self.taskbar_position = data.get('taskbarPosition', self.taskbar_position)
        self.auto_hide_taskbar = data.get('autoHideTaskbar', self.auto_hide_taskbar)
        self.show_clock = data.get('showClock', self.show_clock)
        self.snap_windows = data.get('snapWindows', self.snap_windows)
        self.restore_windows = data.get('restoreWindows', self.restore_windows)
        self.double_click_action = data.get('doubleClickAction', self.double_click_action)
        self.restore_session = data.get('restoreSession', self.restore_session)
        self.startup_sound = data.get('startupSound', self.startup_sound)
        self.session_timeout = data.get('sessionTimeout', self.session_timeout)
        self.enable_notifications = data.get('enableNotifications', self.enable_notifications)
        self.notification_duration = data.get('notificationDuration', self.notification_duration)
        self.notification_position = data.get('notificationPosition', self.notification_position)
        self.hardware_acceleration = data.get('hardwareAcceleration', self.hardware_acceleration)
        self.animation_quality = data.get('animationQuality', self.animation_quality)
        self.max_windows = data.get('maxWindows', self.max_windows)
        self.auto_logout = data.get('autoLogout', self.auto_logout)
        self.remember_login = data.get('rememberLogin', self.remember_login)
        self.window_positions = json.dumps(data.get('windows', {}))


class UserShortcuts(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    shortcut_type = db.Column(db.String(20), nullable=False)  # 'desktop' or 'taskbar'
    app_id = db.Column(db.String(50), nullable=False)
    position_x = db.Column(db.Integer, nullable=True)  # For desktop shortcuts
    position_y = db.Column(db.Integer, nullable=True)  # For desktop shortcuts
    order_index = db.Column(db.Integer, default=0)  # For taskbar shortcuts
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


# app/routes/api.py - API Routes for User Preferences
from flask import Blueprint, request, jsonify, current_app, send_file
from flask_login import login_required, current_user
from werkzeug.utils import secure_filename
from PIL import Image
import os
import uuid

api_bp = Blueprint('api', __name__)


@api_bp.route('/api/user/preferences', methods=['GET'])
@login_required
def get_user_preferences():
    """Get current user's preferences"""
    try:
        preferences = current_user.preferences
        if not preferences:
            # Create default preferences
            preferences = UserPreferences(user_id=current_user.id)
            db.session.add(preferences)
            db.session.commit()

        return jsonify({
            'success': True,
            'preferences': preferences.to_dict(),
            'user': {
                'username': current_user.username,
                'isAdmin': current_user.is_admin,
                'avatar': current_user.avatar_filename,
                'createdAt': current_user.created_at.isoformat(),
                'lastLogin': current_user.last_login.isoformat()
            }
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


@api_bp.route('/api/user/preferences', methods=['POST'])
@login_required
def save_user_preferences():
    """Save user preferences"""
    try:
        data = request.get_json()

        preferences = current_user.preferences
        if not preferences:
            preferences = UserPreferences(user_id=current_user.id)
            db.session.add(preferences)

        preferences.update_from_dict(data)
        db.session.commit()

        return jsonify({'success': True, 'message': 'Preferences saved successfully'})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


@api_bp.route('/api/user/avatar', methods=['POST'])
@login_required
def upload_avatar():
    """Upload user avatar"""
    try:
        if 'avatar' not in request.files:
            return jsonify({'success': False, 'error': 'No file provided'}), 400

        file = request.files['avatar']
        if file.filename == '':
            return jsonify({'success': False, 'error': 'No file selected'}), 400

        if not allowed_file(file.filename, {'png', 'jpg', 'jpeg', 'gif'}):
            return jsonify({'success': False, 'error': 'Invalid file type'}), 400

        # Create avatars directory
        avatar_dir = os.path.join(current_app.static_folder, 'avatars')
        os.makedirs(avatar_dir, exist_ok=True)

        # Generate unique filename
        file_ext = file.filename.rsplit('.', 1)[1].lower()
        filename = f"{current_user.id}_{uuid.uuid4().hex[:8]}.{file_ext}"
        filepath = os.path.join(avatar_dir, filename)

        # Process and save image
        try:
            # Open and resize image
            image = Image.open(file.stream)

            # Convert to RGB if necessary
            if image.mode in ('RGBA', 'LA', 'P'):
                background = Image.new('RGB', image.size, (255, 255, 255))
                if image.mode == 'P':
                    image = image.convert('RGBA')
                background.paste(image, mask=image.split()[-1] if image.mode == 'RGBA' else None)
                image = background

            # Resize to 128x128
            image = image.resize((128, 128), Image.Resampling.LANCZOS)

            # Save with optimization
            image.save(filepath, optimize=True, quality=85)

        except Exception as e:
            return jsonify({'success': False, 'error': f'Image processing failed: {str(e)}'}), 400

        # Delete old avatar if exists
        if current_user.avatar_filename:
            old_path = os.path.join(avatar_dir, current_user.avatar_filename)
            if os.path.exists(old_path):
                try:
                    os.remove(old_path)
                except:
                    pass

        # Update user record
        current_user.avatar_filename = filename
        db.session.commit()

        return jsonify({
            'success': True,
            'message': 'Avatar uploaded successfully',
            'avatar': filename
        })

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


@api_bp.route('/api/user/avatar/<filename>')
def get_avatar(filename):
    """Serve user avatar"""
    try:
        avatar_dir = os.path.join(current_app.static_folder, 'avatars')
        filepath = os.path.join(avatar_dir, secure_filename(filename))

        if os.path.exists(filepath):
            return send_file(filepath)
        else:
            # Return default avatar
            default_path = os.path.join(current_app.static_folder, 'images', 'default_avatar.png')
            if os.path.exists(default_path):
                return send_file(default_path)
            else:
                return '', 404

    except Exception as e:
        return '', 404


@api_bp.route('/api/shortcuts/<shortcut_type>', methods=['GET'])
@login_required
def get_shortcuts(shortcut_type):
    """Get user shortcuts (desktop or taskbar)"""
    try:
        shortcuts = UserShortcuts.query.filter_by(
            user_id=current_user.id,
            shortcut_type=shortcut_type
        ).order_by(UserShortcuts.order_index).all()

        result = []
        for shortcut in shortcuts:
            shortcut_data = {
                'app': shortcut.app_id,
                'order': shortcut.order_index
            }

            if shortcut_type == 'desktop':
                shortcut_data['x'] = shortcut.position_x
                shortcut_data['y'] = shortcut.position_y

            result.append(shortcut_data)

        return jsonify({'success': True, 'shortcuts': result})

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


@api_bp.route('/api/shortcuts/<shortcut_type>', methods=['POST'])
@login_required
def save_shortcuts(shortcut_type):
    """Save user shortcuts"""
    try:
        data = request.get_json()
        shortcuts_data = data.get('shortcuts', [])

        # Delete existing shortcuts of this type
        UserShortcuts.query.filter_by(
            user_id=current_user.id,
            shortcut_type=shortcut_type
        ).delete()

        # Add new shortcuts
        for i, shortcut_data in enumerate(shortcuts_data):
            shortcut = UserShortcuts(
                user_id=current_user.id,
                shortcut_type=shortcut_type,
                app_id=shortcut_data['app'],
                order_index=i
            )

            if shortcut_type == 'desktop':
                shortcut.position_x = shortcut_data.get('x', 0)
                shortcut.position_y = shortcut_data.get('y', 0)

            db.session.add(shortcut)

        db.session.commit()
        return jsonify({'success': True, 'message': 'Shortcuts saved successfully'})

    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'error': str(e)}), 500


@api_bp.route('/api/admin/check', methods=['GET'])
@login_required
def check_admin():
    """Check if user is admin"""
    return jsonify({
        'is_admin': current_user.is_admin,
        'username': current_user.username
    })


@api_bp.route('/api/apps/available', methods=['GET'])
@login_required
def get_available_apps():
    """Get list of available applications"""
    apps = [
        {
            'id': 'file-manager',
            'name': 'File Manager',
            'icon': 'fas fa-folder',
            'description': 'Browse and manage your files',
            'category': 'System'
        },
        {
            'id': 'terminal',
            'name': 'Terminal',
            'icon': 'fas fa-terminal',
            'description': 'Command line interface',
            'category': 'System'
        },
        {
            'id': 'text-editor',
            'name': 'Text Editor',
            'icon': 'fas fa-edit',
            'description': 'Create and edit documents',
            'category': 'Productivity'
        },
        {
            'id': 'media-player',
            'name': 'Media Player',
            'icon': 'fas fa-play-circle',
            'description': 'Play audio and video files',
            'category': 'Entertainment'
        },
        {
            'id': 'settings',
            'name': 'Settings',
            'icon': 'fas fa-cog',
            'description': 'Customize your experience',
            'category': 'System'
        },
        {
            'id': 'public-folder',
            'name': 'Public Files',
            'icon': 'fas fa-globe',
            'description': 'Access shared public files',
            'category': 'System'
        }
    ]

    # Add admin panel for admins
    if current_user.is_admin:
        apps.append({
            'id': 'admin-panel',
            'name': 'Admin Panel',
            'icon': 'fas fa-shield-alt',
            'description': 'Manage system and public files',
            'category': 'Administration'
        })

    return jsonify({'success': True, 'apps': apps})


def allowed_file(filename, allowed_extensions):
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in allowed_extensions


# app/__init__.py - Updated Flask App with Database Integration
from flask import Flask, render_template, request, jsonify, session, redirect, url_for
from flask_socketio import SocketIO
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from flask_migrate import Migrate
import os
from datetime import datetime

socketio = SocketIO()
login_manager = LoginManager()
migrate = Migrate()


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
        SQLALCHEMY_DATABASE_URI='sqlite:///' + os.path.join(project_root, 'emberframe.db'),
        SQLALCHEMY_TRACK_MODIFICATIONS=False,
        UPLOAD_FOLDER=os.path.join(project_root, 'user_data'),
        PUBLIC_FOLDER=os.path.join(project_root, 'public_data'),
        WALLPAPER_FOLDER=os.path.join(static_dir, 'wallpapers'),
        MAX_CONTENT_LENGTH=16 * 1024 * 1024,  # 16MB max file size
    )

    # Initialize extensions
    from .models import db, User, UserPreferences
    db.init_app(app)
    migrate.init_app(app, db)
    socketio.init_app(app, cors_allowed_origins="*")

    # Setup Flask-Login
    login_manager.init_app(app)
    login_manager.login_view = 'login_page'

    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))

    # CSRF token function
    @app.template_global()
    def csrf_token():
        return ""  # Simplified for now

    # Create necessary directories
    for directory in [
        app.config['UPLOAD_FOLDER'],
        app.config['PUBLIC_FOLDER'],
        app.config['WALLPAPER_FOLDER'],
        os.path.join(project_root, 'users'),
        os.path.join(project_root, 'logs'),
        os.path.join(static_dir, 'avatars')
    ]:
        os.makedirs(directory, exist_ok=True)

    # Register API routes
    from .routes.api import api_bp
    app.register_blueprint(api_bp)

    # =====================
    # MAIN ROUTES
    # =====================

    @app.route('/')
    def index():
        """Main index route"""
        if current_user.is_authenticated:
            # Update last login
            current_user.last_login = datetime.utcnow()
            db.session.commit()
            return render_template('desktop.html', username=current_user.username)
        return redirect(url_for('login_page'))

    @app.route('/login', methods=['GET'])
    def login_page():
        """Show login page"""
        if current_user.is_authenticated:
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

            # Find user
            user = User.query.filter_by(username=username).first()

            if user and user.check_password(password):
                login_user(user, remember=True)
                user.last_login = datetime.utcnow()
                db.session.commit()

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
        if current_user.is_authenticated:
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

            # Check if user exists
            if User.query.filter_by(username=username).first():
                return jsonify({'success': False, 'message': 'Username already exists'})

            # Create user
            user = User(username=username)
            user.set_password(password)

            # Set first user as admin
            if User.query.count() == 0:
                user.is_admin = True

            db.session.add(user)
            db.session.commit()

            ensure_user_directory(username)
            print(f"✅ Registration successful: {username}")
            return jsonify({'success': True, 'message': 'Registration successful'})

        except Exception as e:
            db.session.rollback()
            print(f"❌ Registration error: {e}")
            return jsonify({'success': False, 'message': 'Registration error occurred'})

    @app.route('/logout')
    @login_required
    def logout():
        """Handle logout"""
        username = current_user.username
        logout_user()
        print(f"👋 Logout: {username}")
        return redirect(url_for('login_page'))

    # Create database tables
    with app.app_context():
        db.create_all()
        print("✅ Database tables created")

    print("✅ EmberFrame app initialized successfully!")
    return app


def ensure_user_directory(username):
    """Create user directory structure"""
    user_dir = os.path.join('user_data', username)
    os.makedirs(user_dir, exist_ok=True)

    # Create default directories
    default_dirs = ['Documents', 'Downloads', 'Pictures', 'Desktop']
    for dir_name in default_dirs:
        os.makedirs(os.path.join(user_dir, dir_name), exist_ok=True)