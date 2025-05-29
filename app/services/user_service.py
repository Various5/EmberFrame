import os
import logging
from datetime import datetime
from flask import current_app
from app import db
from app.models.user import User

logger = logging.getLogger(__name__)


class UserService:

    def create_user(self, username, email, password, first_name='', last_name='', role='user'):
        """Create a new user"""

        # Check if username already exists
        if User.query.filter_by(username=username).first():
            raise ValueError(f"Username '{username}' already exists")

        # Check if email already exists
        if User.query.filter_by(email=email).first():
            raise ValueError(f"Email '{email}' already exists")

        # Create new user
        user = User(
            username=username,
            email=email,
            first_name=first_name,
            last_name=last_name,
            role=role
        )
        user.set_password(password)

        try:
            db.session.add(user)
            db.session.commit()

            # Create user directory
            user_dir = user.get_user_directory()
            self._create_default_folders(user_dir)

            logger.info(f"Created new user: {username}")
            return user

        except Exception as e:
            db.session.rollback()
            logger.error(f"Failed to create user {username}: {e}")
            raise ValueError("Failed to create user account")

    def authenticate(self, username, password):
        """Authenticate user"""
        user = User.query.filter_by(username=username).first()

        if user and user.is_active and user.check_password(password):
            return user

        return None

    def update_last_login(self, user):
        """Update user's last login timestamp"""
        user.last_login = datetime.utcnow()
        user.last_activity = datetime.utcnow()

        try:
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            logger.error(f"Failed to update last login for {user.username}: {e}")

    def create_default_admin(self):
        """Create default admin user if it doesn't exist"""
        admin = User.query.filter_by(username='admin').first()

        if not admin:
            try:
                admin = self.create_user(
                    username='admin',
                    email='admin@embercore.local',
                    password='admin123',
                    first_name='System',
                    last_name='Administrator',
                    role='admin'
                )
                logger.info("Created default admin user")
                return admin
            except Exception as e:
                logger.error(f"Failed to create default admin: {e}")

        return admin

    def _create_default_folders(self, user_dir):
        """Create default folders for new user"""
        default_folders = [
            'Documents',
            'Downloads',
            'Pictures',
            'Music',
            'Videos',
            'Projects'
        ]

        for folder in default_folders:
            folder_path = os.path.join(user_dir, folder)
            os.makedirs(folder_path, exist_ok=True)

        # Create a welcome file
        welcome_file = os.path.join(user_dir, 'Documents', 'Welcome.txt')
        with open(welcome_file, 'w') as f:
            f.write("""Welcome to EmberCore!

Your neural interface has been successfully initialized.

This is your personal file space where you can:
- Store and organize your files
- Create documents and projects
- Collaborate with other users
- Access powerful desktop applications

Explore the desktop environment and discover all the cyberpunk features available.

Stay connected to the future!

- The EmberCore Team
""")