#!/usr/bin/env python3
"""
EmberCore - Multi-User Desktop Application
Main entry point for the application
"""

import os
import sys
import logging
from app import create_app, socketio
from app.utils.logger import setup_logging


def main():
    """Main entry point for EmberCore application"""

    # Setup logging
    setup_logging()
    logger = logging.getLogger(__name__)

    try:
        # Create Flask app
        app = create_app()

        logger.info("🔥 Starting EmberCore Application")
        logger.info("=" * 50)
        logger.info(f"Environment: {app.config.get('ENV', 'development')}")
        logger.info(f"Debug Mode: {app.config.get('DEBUG', False)}")
        logger.info(f"Database: {app.config.get('SQLALCHEMY_DATABASE_URI')}")
        logger.info("=" * 50)

        # Run the application
        socketio.run(
            app,
            host='0.0.0.0',
            port=int(os.environ.get('PORT', 5000)),
            debug=app.config.get('DEBUG', False),
            allow_unsafe_werkzeug=True
        )

    except Exception as e:
        logger.error(f"Failed to start EmberCore: {e}")
        sys.exit(1)


if __name__ == '__main__':
    main()