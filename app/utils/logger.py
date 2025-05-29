import logging
import sys
from logging.handlers import RotatingFileHandler
import os


def setup_logging(app=None):
    """Set up logging configuration"""

    # Create logs directory if it doesn't exist
    logs_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'logs')
    os.makedirs(logs_dir, exist_ok=True)

    # Configure logging
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]',
        handlers=[
            logging.StreamHandler(sys.stdout),
            RotatingFileHandler(
                os.path.join(logs_dir, 'emberframe.log'),
                maxBytes=10000000,
                backupCount=5
            )
        ]
    )

    if app:
        app.logger.setLevel(logging.INFO)
        app.logger.info('EmberFrame startup')

    return logging.getLogger(__name__)