from flask import Flask
from flask_socketio import SocketIO

socketio = SocketIO()


def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'your-secret-key-here'

    socketio.init_app(app, cors_allowed_origins="*")

    @app.route('/')
    def index():
        return "EmberFrame is running!"

    return app