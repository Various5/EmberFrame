import os
import logging
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_socketio import SocketIO
from config import config
from app.routes.apps import apps_bp

# Initialize extensions
db = SQLAlchemy()
login_manager = LoginManager()
socketio = SocketIO(cors_allowed_origins="*")


def create_app(config_name=None):
    """Application factory pattern"""

    if config_name is None:
        config_name = os.environ.get('FLASK_CONFIG', 'default')

    app = Flask(__name__)
    app.config.from_object(config[config_name])

    # Initialize extensions
    db.init_app(app)
    login_manager.init_app(app)
    socketio.init_app(app)

    # Configure login manager
    login_manager.login_view = 'auth.login'
    login_manager.login_message = 'Please log in to access EmberCore'
    login_manager.login_message_category = 'info'

    # Create upload directories
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    os.makedirs(os.path.join(app.config['UPLOAD_FOLDER'], 'users'), exist_ok=True)

    # Register blueprints
    from app.routes.auth import auth_bp
    from app.routes.desktop import desktop_bp
    from app.routes.filesystem import filesystem_bp
    from app.routes.api import api_bp

    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(desktop_bp, url_prefix='/desktop')
    app.register_blueprint(filesystem_bp, url_prefix='/fs')
    app.register_blueprint(api_bp, url_prefix='/api')

    # Register main routes
    from app.routes import main_routes
    app.register_blueprint(main_routes)

    # Create database tables
    with app.app_context():
        db.create_all()

        # Create default admin user
        from app.services.user_service import UserService
        user_service = UserService()
        user_service.create_default_admin()

    # Setup logging
    if not app.debug:
        from app.utils.logger import setup_file_logging
        setup_file_logging(app)

    logger = logging.getLogger(__name__)
    logger.info("EmberCore application initialized successfully")

    app.register_blueprint(apps_bp)

    return app
