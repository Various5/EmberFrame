from flask import Blueprint, jsonify
import os
import re
from pathlib import Path

apps_bp = Blueprint('apps', __name__)


@apps_bp.route('/api/apps/available')
def get_available_apps():
    """Automatically discover all apps in the static/js/apps folder"""
    try:
        apps = []

        # Define apps manually for now since file parsing might be complex
        app_definitions = [
            {
                'id': 'file-manager',
                'name': 'File Manager',
                'icon': 'fas fa-folder',
                'description': 'Browse and manage your files and folders',
                'category': 'System',
                'version': '1.3.0',
                'author': 'EmberFrame Team',
                'enabled': True
            },
            {
                'id': 'public-folder',
                'name': 'Public Files',
                'icon': 'fas fa-globe',
                'description': 'Access shared public files',
                'category': 'System',
                'version': '1.0.0',
                'author': 'EmberFrame Team',
                'enabled': True
            },
            {
                'id': 'terminal',
                'name': 'Terminal',
                'icon': 'fas fa-terminal',
                'description': 'Command line interface with Unix-like commands',
                'category': 'System',
                'version': '1.1.0',
                'author': 'EmberFrame Team',
                'enabled': True
            },
            {
                'id': 'text-editor',
                'name': 'Text Editor',
                'icon': 'fas fa-file-alt',
                'description': 'Create and edit text documents',
                'category': 'Productivity',
                'version': '1.2.0',
                'author': 'EmberFrame Team',
                'enabled': True
            },
            {
                'id': 'settings',
                'name': 'Settings',
                'icon': 'fas fa-cog',
                'description': 'Customize your EmberFrame experience',
                'category': 'System',
                'version': '1.3.0',
                'author': 'EmberFrame Team',
                'enabled': True
            },
            {
                'id': 'task-manager',
                'name': 'Task Manager',
                'icon': 'fas fa-tasks',
                'description': 'Monitor and manage running applications',
                'category': 'System',
                'version': '1.0.0',
                'author': 'EmberFrame Team',
                'enabled': True
            },
            {
                'id': 'media-player',
                'name': 'Media Player',
                'icon': 'fas fa-play',
                'description': 'Play audio and video files',
                'category': 'Media',
                'version': '1.0.0',
                'author': 'EmberFrame Team',
                'enabled': True
            },
            {
                'id': 'admin-panel',
                'name': 'Admin Panel',
                'icon': 'fas fa-shield-alt',
                'description': 'Administrative tools and file management',
                'category': 'Administration',
                'version': '1.0.0',
                'author': 'EmberFrame Team',
                'enabled': True
            }
        ]

        # Filter enabled apps
        apps = [app for app in app_definitions if app.get('enabled', True)]

        return jsonify({
            'success': True,
            'apps': apps
        })

    except Exception as e:
        print(f"Error in get_available_apps: {e}")
        return jsonify({
            'success': False,
            'error': str(e)
        })


@apps_bp.route('/api/shortcuts/desktop', methods=['GET'])
def get_desktop_shortcuts():
    """Get desktop shortcuts for current user"""
    try:
        # For now, return default shortcuts
        # In a real app, you'd load from database per user
        default_shortcuts = [
            {
                'app': 'file-manager',
                'x': 50,
                'y': 50
            },
            {
                'app': 'public-folder',
                'x': 50,
                'y': 170
            },
            {
                'app': 'settings',
                'x': 50,
                'y': 290
            }
        ]

        return jsonify({
            'success': True,
            'shortcuts': default_shortcuts
        })

    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        })


@apps_bp.route('/api/shortcuts/desktop', methods=['POST'])
def save_desktop_shortcuts():
    """Save desktop shortcuts for current user"""
    try:
        # In a real app, you'd save to database per user
        # For now, just return success
        return jsonify({'success': True})

    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        })


@apps_bp.route('/api/shortcuts/taskbar', methods=['GET'])
def get_taskbar_shortcuts():
    """Get taskbar shortcuts for current user"""
    try:
        # Return empty by default - user can add via context menu
        return jsonify({
            'success': True,
            'shortcuts': []
        })

    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        })


@apps_bp.route('/api/shortcuts/taskbar', methods=['POST'])
def save_taskbar_shortcuts():
    """Save taskbar shortcuts for current user"""
    try:
        # In a real app, you'd save to database per user
        return jsonify({'success': True})

    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        })