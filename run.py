#!/usr/bin/env python3
import os
import sys
import logging
from app import create_app, socketio
from app.utils.logger import setup_logging


def main():
    """Main entry point for EmberFrame application"""
    try:
        # Setup logging first
        setup_logging()
        logger = logging.getLogger(__name__)

        # Create Flask app
        app = create_app()

        logger.info("🔥 Starting EmberFrame Desktop Environment")
        logger.info("=" * 50)
        logger.info(f"Environment: {os.environ.get('FLASK_ENV', 'production')}")
        logger.info(f"Debug Mode: {app.config.get('DEBUG', False)}")
        logger.info(f"Template Folder: {app.template_folder}")
        logger.info(f"Static Folder: {app.static_folder}")
        logger.info("=" * 50)

        # Check if template directory exists
        if not os.path.exists(app.template_folder):
            logger.error(f"Template directory not found: {app.template_folder}")
            sys.exit(1)

        # List template files for debugging
        template_files = os.listdir(app.template_folder)
        logger.info(f"Template files found: {template_files}")

        # Run the application
        port = int(os.environ.get('PORT', 5000))
        logger.info(f"Starting server on http://0.0.0.0:{port}")

        socketio.run(
            app,
            host='0.0.0.0',
            port=port,
            debug=os.environ.get('FLASK_ENV') == 'development',
            allow_unsafe_werkzeug=True
        )

    except Exception as e:
        logger.error(f"Failed to start EmberFrame: {e}")
        logger.error(f"Error type: {type(e).__name__}")
        import traceback
        logger.error(f"Traceback: {traceback.format_exc()}")
        sys.exit(1)


if __name__ == '__main__':
    main()