#!/usr/bin/env python3
"""
EmberFrame Application Launcher - Fixed Version
"""

import os
import sys
import logging
from datetime import datetime



def setup_logging():
    """Setup basic logging"""
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s [%(levelname)s] %(message)s',
        handlers=[
            logging.StreamHandler(sys.stdout)
        ]
    )


def check_requirements():
    """Check if required packages are installed"""
    required_packages = ['flask', 'flask_socketio']
    missing_packages = []

    for package in required_packages:
        try:
            __import__(package)
        except ImportError:
            missing_packages.append(package)

    if missing_packages:
        print(f"❌ Missing required packages: {missing_packages}")
        print("Install them with: pip install Flask Flask-SocketIO")
        return False

    return True


def create_directories():
    """Create necessary directories"""
    directories = [
        'templates',
        'static',
        'user_data',
        'public_data',
        'logs'
    ]

    for directory in directories:
        try:
            os.makedirs(directory, exist_ok=True)
        except Exception as e:
            print(f"⚠️ Could not create directory {directory}: {e}")


def main():
    """Main application launcher"""
    try:
        print("🔥 Starting EmberFrame Desktop Environment")
        print("=" * 50)
        print(f"⏰ Start time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")

        # Setup logging
        setup_logging()
        logger = logging.getLogger(__name__)

        # Check requirements
        if not check_requirements():
            sys.exit(1)

        # Create directories
        create_directories()

        # Import after checking requirements
        try:
            from app import create_app, socketio
        except ImportError as e:
            print(f"❌ Failed to import app: {e}")
            print("Make sure app/__init__.py exists and is correct")
            sys.exit(1)

        # Create Flask app
        try:
            app = create_app()
            logger.info("✅ Flask app created successfully")
        except Exception as e:
            print(f"❌ Failed to create Flask app: {e}")
            import traceback
            traceback.print_exc()
            sys.exit(1)

        # Configuration
        port = int(os.environ.get('PORT', 5000))
        host = os.environ.get('HOST', '0.0.0.0')
        debug = os.environ.get('FLASK_DEBUG', '0') == '1'

        print(f"🌐 Server: http://localhost:{port}")
        print(f"🔧 Debug mode: {debug}")
        print(f"📂 Template folder: {app.template_folder}")
        print(f"📂 Static folder: {app.static_folder}")
        print()
        print("📝 Demo Instructions:")
        print("   1. Open http://localhost:5000 in your browser")
        print("   2. Use any username (3+ characters) and password to login")
        print("   3. Explore the desktop environment")
        print()
        print("⚡ Press Ctrl+C to stop the server")
        print("=" * 50)

        # Start the server
        socketio.run(
            app,
            host=host,
            port=port,
            debug=debug,
            use_reloader=debug,
            log_output=True,
            allow_unsafe_werkzeug=True  # Add this line
        )

    except KeyboardInterrupt:
        print("\n👋 EmberFrame stopped by user")
        sys.exit(0)
    except Exception as e:
        print(f"❌ Critical error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)


if __name__ == '__main__':
    main()