import os
from datetime import timedelta


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'ember-core-secret-key-2024'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///embercore.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # File upload settings
    UPLOAD_FOLDER = os.environ.get('UPLOAD_FOLDER') or 'user_files'
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB max file size

    # Session settings
    PERMANENT_SESSION_LIFETIME = timedelta(hours=24)
    SESSION_TYPE = 'filesystem'

    # Redis settings (optional)
    REDIS_URL = os.environ.get('REDIS_URL') or 'redis://localhost:6379'

    # Security settings
    WTF_CSRF_ENABLED = True
    WTF_CSRF_TIME_LIMIT = None

    # Logging
    LOG_LEVEL = os.environ.get('LOG_LEVEL') or 'INFO'
    LOG_FILE = os.environ.get('LOG_FILE') or 'embercore.log'

    # Development settings
    DEBUG = os.environ.get('FLASK_DEBUG') == '1'
    TESTING = False


class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_ECHO = True


class ProductionConfig(Config):
    DEBUG = False
    SQLALCHEMY_ECHO = False


config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}