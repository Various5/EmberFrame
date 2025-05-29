import os
import bcrypt
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from app import db


class User(UserMixin, db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False, index=True)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)

    # User profile
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    avatar = db.Column(db.String(255), default='default_avatar.png')

    # Permissions and settings
    role = db.Column(db.String(20), default='user')  # user, admin
    is_active = db.Column(db.Boolean, default=True)
    theme = db.Column(db.String(50), default='ember_red')
    desktop_layout = db.Column(db.Text)  # JSON string of desktop layout

    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    last_login = db.Column(db.DateTime)
    last_activity = db.Column(db.DateTime, default=datetime.utcnow)

    # Storage quota (in bytes)
    storage_quota = db.Column(db.BigInteger, default=1024 * 1024 * 1024)  # 1GB default
    storage_used = db.Column(db.BigInteger, default=0)

    # Relationships
    files = db.relationship('UserFile', backref='owner', lazy='dynamic', cascade='all, delete-orphan')
    sessions = db.relationship('UserSession', backref='user', lazy='dynamic', cascade='all, delete-orphan')

    def __repr__(self):
        return f'<User {self.username}>'

    def set_password(self, password):
        """Hash and set password"""
        self.password_hash = bcrypt.hashpw(
            password.encode('utf-8'),
            bcrypt.gensalt()
        ).decode('utf-8')

    def check_password(self, password):
        """Check if password matches hash"""
        return bcrypt.checkpw(
            password.encode('utf-8'),
            self.password_hash.encode('utf-8')
        )

    def is_admin(self):
        """Check if user has admin role"""
        return self.role == 'admin'

    def get_user_directory(self):
        """Get user's file storage directory"""
        from flask import current_app
        user_dir = os.path.join(current_app.config['UPLOAD_FOLDER'], 'users', str(self.id))
        os.makedirs(user_dir, exist_ok=True)
        return user_dir

    def update_storage_usage(self):
        """Calculate and update storage usage"""
        total_size = 0
        user_dir = self.get_user_directory()

        if os.path.exists(user_dir):
            for root, dirs, files in os.walk(user_dir):
                for file in files:
                    file_path = os.path.join(root, file)
                    if os.path.exists(file_path):
                        total_size += os.path.getsize(file_path)

        self.storage_used = total_size
        db.session.commit()
        return total_size

    def can_upload_file(self, file_size):
        """Check if user can upload a file of given size"""
        return (self.storage_used + file_size) <= self.storage_quota

    def to_dict(self):
        """Convert user to dictionary"""
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'avatar': self.avatar,
            'role': self.role,
            'is_active': self.is_active,
            'theme': self.theme,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'last_login': self.last_login.isoformat() if self.last_login else None,
            'storage_quota': self.storage_quota,
            'storage_used': self.storage_used,
        }