from flask import Flask, render_template
from flask_socketio import SocketIO
import os

socketio = SocketIO()


def create_app():
    # Get the absolute path to the templates directory
    template_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'templates'))

    app = Flask(__name__, template_folder=template_dir)
    app.config['SECRET_KEY'] = 'your-secret-key-here'

    socketio.init_app(app, cors_allowed_origins="*")

    @app.route('/')
    def desktop():
        return render_template('desktop.html')

    # Debug route to check template directory
    @app.route('/debug')
    def debug():
        return f"Template folder: {app.template_folder}<br>Files: {os.listdir(app.template_folder) if os.path.exists(app.template_folder) else 'Directory not found'}"

    return app