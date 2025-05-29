
from flask import Blueprint, render_template, redirect, url_for
from flask_login import login_required

main_routes = Blueprint('main', __name__)

@main_routes.route('/')
def index():
    """Main index route - redirect to desktop if logged in, otherwise login"""
    return redirect(url_for('auth.login'))

@main_routes.route('/health')
def health_check():
    """Health check endpoint"""
    return {'status': 'healthy', 'service': 'EmberCore'}