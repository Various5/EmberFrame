#!/usr/bin/env python3
"""
Quick setup script to fix CSRF token issues in EmberFrame
Run this script to ensure proper CSRF setup
"""

import os
import sys
import subprocess
import json


def install_requirements():
    """Install required packages"""
    print("🔧 Installing Flask-WTF and dependencies...")
    try:
        subprocess.check_call([sys.executable, '-m', 'pip', 'install', 'Flask-WTF>=1.1.0', 'WTForms>=3.0.0'])
        print("✅ Dependencies installed successfully!")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to install dependencies: {e}")
        return False


def check_templates():
    """Check if templates directory exists and has required files"""
    print("📁 Checking templates directory...")

    templates_dir = "templates"
    required_templates = ["login.html", "desktop.html", "register.html", "base.html"]

    if not os.path.exists(templates_dir):
        print(f"❌ Templates directory '{templates_dir}' not found!")
        return False

    missing_templates = []
    for template in required_templates:
        template_path = os.path.join(templates_dir, template)
        if not os.path.exists(template_path):
            missing_templates.append(template)

    if missing_templates:
        print(f"❌ Missing templates: {missing_templates}")
        return False

    print("✅ All required templates found!")
    return True


def check_csrf_in_templates():
    """Check if base.html has CSRF token meta tag"""
    print("🔍 Checking CSRF token setup in templates...")

    base_template_path = "templates/base.html"
    if not os.path.exists(base_template_path):
        print(f"❌ Base template not found: {base_template_path}")
        return False

    with open(base_template_path, 'r', encoding='utf-8') as f:
        content = f.read()

    if 'csrf-token' not in content and 'csrf_token()' not in content:
        print("⚠️  CSRF token meta tag not found in base.html")
        print("   You need to add: <meta name=\"csrf-token\" content=\"{{ csrf_token() }}\">")
        return False

    print("✅ CSRF token setup found in templates!")
    return True


def test_app_import():
    """Test if the app can be imported and CSRF works"""
    print("🧪 Testing app import and CSRF functionality...")

    try:
        # Change to the script directory
        script_dir = os.path.dirname(os.path.abspath(__file__))
        os.chdir(script_dir)

        from app import create_app
        app = create_app()

        with app.app_context():
            # Test CSRF token generation
            from flask_wtf.csrf import generate_csrf
            token = generate_csrf()
            if token:
                print("✅ CSRF token generation works!")
                print(f"   Sample token: {token[:20]}...")
                return True
            else:
                print("❌ CSRF token generation failed!")
                return False

    except ImportError as e:
        print(f"❌ Failed to import app: {e}")
        print("   Make sure you're running this from the project root directory")
        return False
    except Exception as e:
        print(f"❌ Error testing CSRF: {e}")
        return False


def create_test_config():
    """Create a test configuration file"""
    print("⚙️  Creating test configuration...")

    config_content = '''import os
from datetime import timedelta

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'ember-core-secret-key-for-testing-2024'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///embercore.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # File upload settings
    UPLOAD_FOLDER = os.environ.get('UPLOAD_FOLDER') or 'user_files'
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB max file size

    # Session settings
    PERMANENT_SESSION_LIFETIME = timedelta(hours=24)
    SESSION_TYPE = 'filesystem'

    # CSRF Protection
    WTF_CSRF_ENABLED = True
    WTF_CSRF_TIME_LIMIT = None
    WTF_CSRF_SSL_STRICT = False  # For development

    # Development settings
    DEBUG = os.environ.get('FLASK_DEBUG') == '1'
    TESTING = False

class DevelopmentConfig(Config):
    DEBUG = True

class ProductionConfig(Config):
    DEBUG = False
    WTF_CSRF_SSL_STRICT = True  # Enable for production

config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}
'''

    try:
        with open('config.py', 'w') as f:
            f.write(config_content)
        print("✅ Test configuration created!")
        return True
    except Exception as e:
        print(f"❌ Failed to create config: {e}")
        return False


def main():
    """Main setup function"""
    print("🔥 EmberFrame CSRF Setup Script")
    print("=" * 40)

    success_count = 0
    total_checks = 5

    # Check 1: Install dependencies
    if install_requirements():
        success_count += 1

    # Check 2: Check templates
    if check_templates():
        success_count += 1

    # Check 3: Check CSRF in templates
    if check_csrf_in_templates():
        success_count += 1

    # Check 4: Create config
    if create_test_config():
        success_count += 1

    # Check 5: Test app import
    if test_app_import():
        success_count += 1

    print("\n" + "=" * 40)
    print(f"✅ Setup complete: {success_count}/{total_checks} checks passed")

    if success_count == total_checks:
        print("\n🎉 Everything looks good! You can now run your EmberFrame app:")
        print("   python run.py")
    else:
        print(f"\n⚠️  {total_checks - success_count} issues need to be resolved.")
        print("   Please check the error messages above and fix them.")

    print("\n📝 Quick troubleshooting tips:")
    print("   1. Make sure you're in the project root directory")
    print("   2. Replace app/__init__.py with the fixed version")
    print("   3. Replace templates/base.html with the fixed version")
    print("   4. Install Flask-WTF: pip install Flask-WTF")
    print("   5. Check that all template files exist")


if __name__ == '__main__':
    main()