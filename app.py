# app.py
from flask import Flask
from flask_socketio import SocketIO

socketio = SocketIO()


def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'your-secret-key-here'

    # Initialize SocketIO with the app
    socketio.init_app(app, cors_allowed_origins="*")

    # Add your routes here
    @app.route('/')
    def index():
        return "Hello from EmberFrame!"

    return app