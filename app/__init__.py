# app/routes/api.py - Complete API Backend for EmberFrame
from flask import Blueprint, request, jsonify, session, send_file, current_app
import os
import json
import shutil
import time
from datetime import datetime, timedelta
from werkzeug.utils import secure_filename
from pathlib import Path
import mimetypes
import hashlib

api = Blueprint('api', __name__, url_prefix='/api')


# Helper functions
def get_user_home_path():
    """Get the current user's home directory path"""
    username = session.get('username', 'guest')
    user_home = os.path.join(current_app.config.get('UPLOAD_FOLDER', 'user_data'), username)
    os.makedirs(user_home, exist_ok=True)
    return user_home


def get_public_path():
    """Get the public files directory path"""
    public_path = os.path.join(current_app.config.get('PUBLIC_FOLDER', 'public_data'))
    os.makedirs(public_path, exist_ok=True)
    return public_path


def get_file_info(filepath):
    """Get file information"""
    try:
        stat = os.stat(filepath)
        return {
            'name': os.path.basename(filepath),
            'type': 'folder' if os.path.isdir(filepath) else 'file',
            'size': stat.st_size if os.path.isfile(filepath) else 0,
            'modified': datetime.fromtimestamp(stat.st_mtime).isoformat(),
            'path': filepath
        }
    except:
        return None


def format_file_size(size_bytes):
    """Format file size in human readable format"""
    if size_bytes == 0:
        return "0 B"
    size_names = ["B", "KB", "MB", "GB", "TB"]
    import math
    i = int(math.floor(math.log(size_bytes, 1024)))
    p = math.pow(1024, i)
    s = round(size_bytes / p, 2)
    return f"{s} {size_names[i]}"


def is_admin():
    """Check if current user is admin"""
    username = session.get('username')
    # Simple admin check - you can implement proper user roles
    return username == 'admin' or username in ['administrator', 'root']


def log_activity(action, details=None):
    """Log user activity"""
    log_entry = {
        'timestamp': datetime.now().isoformat(),
        'user': session.get('username', 'anonymous'),
        'action': action,
        'details': details or {},
        'ip': request.remote_addr
    }

    # Create logs directory
    logs_dir = os.path.join(os.getcwd(), 'logs')
    os.makedirs(logs_dir, exist_ok=True)

    # Append to log file
    log_file = os.path.join(logs_dir, f"activity_{datetime.now().strftime('%Y%m')}.log")
    with open(log_file, 'a') as f:
        f.write(json.dumps(log_entry) + '\n')


# ============================================================================
# FILE MANAGEMENT ROUTES
# ============================================================================

@api.route('/files')
@api.route('/files/')
@api.route('/files/<path:filepath>')
def list_files(filepath=''):
    """List files in a directory"""
    if 'username' not in session:
        return jsonify({'error': 'Not authenticated'}), 401

    try:
        # Normalize path
        if not filepath or filepath == '':
            filepath = 'home'

        # Determine actual filesystem path
        if filepath.startswith('public/') or filepath == 'public':
            base_path = get_public_path()
            relative_path = filepath[7:] if filepath.startswith('public/') else ''
            is_writable = True  # Public folders are writable
        elif filepath.startswith('home/') or filepath == 'home':
            base_path = get_user_home_path()
            relative_path = filepath[5:] if filepath.startswith('home/') else ''
            is_writable = True
        else:
            # Default to user home
            base_path = get_user_home_path()
            relative_path = filepath
            is_writable = True

        # Construct full path
        full_path = os.path.join(base_path, relative_path) if relative_path else base_path
        full_path = os.path.normpath(full_path)

        # Security check - prevent directory traversal
        if not full_path.startswith(base_path):
            return jsonify({'error': 'Access denied'}), 403

        # Check if path exists
        if not os.path.exists(full_path):
            # Create default user directories
            if filepath == 'home':
                default_dirs = ['Documents', 'Downloads', 'Pictures', 'Music', 'Desktop']
                for dir_name in default_dirs:
                    os.makedirs(os.path.join(full_path, dir_name), exist_ok=True)
            else:
                return jsonify({'error': 'Directory not found'}), 404

        # Check if it's a directory
        if not os.path.isdir(full_path):
            return jsonify({'error': 'Not a directory'}), 400

        # List directory contents
        files = []
        try:
            for item in os.listdir(full_path):
                item_path = os.path.join(full_path, item)
                file_info = get_file_info(item_path)
                if file_info:
                    files.append(file_info)
        except PermissionError:
            return jsonify({'error': 'Permission denied'}), 403

        # Sort files (folders first, then alphabetically)
        files.sort(key=lambda x: (x['type'] != 'folder', x['name'].lower()))

        log_activity('list_directory', {'path': filepath, 'file_count': len(files)})

        return jsonify({
            'files': files,
            'path': filepath,
            'writable': is_writable,
            'total': len(files)
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@api.route('/files/upload', methods=['POST'])
def upload_files():
    """Upload files to a directory"""
    if 'username' not in session:
        return jsonify({'error': 'Not authenticated'}), 401

    try:
        target_path = request.form.get('path', 'home')
        files = request.files.getlist('files')

        if not files:
            return jsonify({'error': 'No files provided'}), 400

        # Determine target directory
        if target_path.startswith('public/') or target_path == 'public':
            base_path = get_public_path()
            relative_path = target_path[7:] if target_path.startswith('public/') else ''
        else:
            base_path = get_user_home_path()
            relative_path = target_path[5:] if target_path.startswith('home/') else target_path

        upload_dir = os.path.join(base_path, relative_path) if relative_path else base_path
        upload_dir = os.path.normpath(upload_dir)

        # Security check
        if not upload_dir.startswith(base_path):
            return jsonify({'error': 'Access denied'}), 403

        # Create directory if it doesn't exist
        os.makedirs(upload_dir, exist_ok=True)

        uploaded_files = []
        for file in files:
            if file.filename == '':
                continue

            filename = secure_filename(file.filename)
            if not filename:
                continue

            file_path = os.path.join(upload_dir, filename)

            # Handle duplicate filenames
            counter = 1
            original_path = file_path
            while os.path.exists(file_path):
                name, ext = os.path.splitext(filename)
                file_path = os.path.join(upload_dir, f"{name}_{counter}{ext}")
                counter += 1

            file.save(file_path)
            uploaded_files.append(os.path.basename(file_path))

        log_activity('upload_files', {
            'path': target_path,
            'files': uploaded_files,
            'count': len(uploaded_files)
        })

        return jsonify({
            'message': f'{len(uploaded_files)} file(s) uploaded successfully',
            'files': uploaded_files
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@api.route('/files/operation', methods=['POST'])
def file_operations():
    """Handle file operations (create, delete, rename, etc.)"""
    if 'username' not in session:
        return jsonify({'error': 'Not authenticated'}), 401

    try:
        data = request.get_json()
        operation = data.get('operation')

        if operation == 'create_folder':
            return create_folder(data)
        elif operation == 'delete':
            return delete_files(data)
        elif operation == 'rename':
            return rename_file(data)
        else:
            return jsonify({'error': 'Unknown operation'}), 400

    except Exception as e:
        return jsonify({'error': str(e)}), 500


def create_folder(data):
    """Create a new folder"""
    path = data.get('path', 'home')
    name = data.get('name', '').strip()

    if not name:
        return jsonify({'error': 'Folder name required'}), 400

    # Determine base path
    if path.startswith('public/') or path == 'public':
        base_path = get_public_path()
        relative_path = path[7:] if path.startswith('public/') else ''
    else:
        base_path = get_user_home_path()
        relative_path = path[5:] if path.startswith('home/') else path

    target_dir = os.path.join(base_path, relative_path) if relative_path else base_path
    new_folder = os.path.join(target_dir, secure_filename(name))

    # Security check
    if not new_folder.startswith(base_path):
        return jsonify({'error': 'Access denied'}), 403

    if os.path.exists(new_folder):
        return jsonify({'error': 'Folder already exists'}), 400

    os.makedirs(new_folder, exist_ok=True)

    log_activity('create_folder', {'path': path, 'name': name})

    return jsonify({'message': f'Folder "{name}" created successfully'})


def delete_files(data):
    """Delete files or folders"""
    path = data.get('path', 'home')
    files = data.get('files', [])

    if not files:
        return jsonify({'error': 'No files specified'}), 400

    # Determine base path
    if path.startswith('public/') or path == 'public':
        base_path = get_public_path()
        relative_path = path[7:] if path.startswith('public/') else ''
    else:
        base_path = get_user_home_path()
        relative_path = path[5:] if path.startswith('home/') else path

    target_dir = os.path.join(base_path, relative_path) if relative_path else base_path

    deleted_files = []
    for filename in files:
        file_path = os.path.join(target_dir, secure_filename(filename))

        # Security check
        if not file_path.startswith(base_path):
            continue

        if os.path.exists(file_path):
            if os.path.isdir(file_path):
                shutil.rmtree(file_path)
            else:
                os.remove(file_path)
            deleted_files.append(filename)

    log_activity('delete_files', {'path': path, 'files': deleted_files})

    return jsonify({
        'message': f'{len(deleted_files)} item(s) deleted successfully',
        'deleted': deleted_files
    })


def rename_file(data):
    """Rename a file or folder"""
    path = data.get('path', 'home')
    old_name = data.get('old_name', '').strip()
    new_name = data.get('new_name', '').strip()

    if not old_name or not new_name:
        return jsonify({'error': 'Both old and new names required'}), 400

    # Determine base path
    if path.startswith('public/') or path == 'public':
        base_path = get_public_path()
        relative_path = path[7:] if path.startswith('public/') else ''
    else:
        base_path = get_user_home_path()
        relative_path = path[5:] if path.startswith('home/') else path

    target_dir = os.path.join(base_path, relative_path) if relative_path else base_path

    old_path = os.path.join(target_dir, secure_filename(old_name))
    new_path = os.path.join(target_dir, secure_filename(new_name))

    # Security checks
    if not old_path.startswith(base_path) or not new_path.startswith(base_path):
        return jsonify({'error': 'Access denied'}), 403

    if not os.path.exists(old_path):
        return jsonify({'error': 'File not found'}), 404

    if os.path.exists(new_path):
        return jsonify({'error': 'File with new name already exists'}), 400

    os.rename(old_path, new_path)

    log_activity('rename_file', {'path': path, 'old_name': old_name, 'new_name': new_name})

    return jsonify({'message': f'"{old_name}" renamed to "{new_name}" successfully'})


@api.route('/files/download/<path:filepath>')
def download_file(filepath):
    """Download a file"""
    if 'username' not in session:
        return jsonify({'error': 'Not authenticated'}), 401

    try:
        # Determine base path
        if filepath.startswith('public/'):
            base_path = get_public_path()
            relative_path = filepath[7:]
        else:
            base_path = get_user_home_path()
            relative_path = filepath[5:] if filepath.startswith('home/') else filepath

        file_path = os.path.join(base_path, relative_path)
        file_path = os.path.normpath(file_path)

        # Security check
        if not file_path.startswith(base_path):
            return jsonify({'error': 'Access denied'}), 403

        if not os.path.exists(file_path) or not os.path.isfile(file_path):
            return jsonify({'error': 'File not found'}), 404

        log_activity('download_file', {'path': filepath})

        return send_file(file_path, as_attachment=True)

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@api.route('/files/storage-info')
def storage_info():
    """Get storage usage information"""
    if 'username' not in session:
        return jsonify({'error': 'Not authenticated'}), 401

    try:
        user_home = get_user_home_path()

        # Calculate used space
        used_space = 0
        for root, dirs, files in os.walk(user_home):
            for file in files:
                file_path = os.path.join(root, file)
                try:
                    used_space += os.path.getsize(file_path)
                except:
                    continue

        # Default quota: 100MB per user
        quota = 100 * 1024 * 1024  # 100MB in bytes

        return jsonify({
            'used': used_space,
            'total': quota,
            'free': max(0, quota - used_space),
            'used_formatted': format_file_size(used_space),
            'total_formatted': format_file_size(quota)
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500


# ============================================================================
# ADMIN PANEL ROUTES
# ============================================================================

@api.route('/admin/check')
def admin_check():
    """Check if user has admin privileges"""
    if 'username' not in session:
        return jsonify({'error': 'Not authenticated'}), 401

    return jsonify({
        'is_admin': is_admin(),
        'username': session.get('username')
    })


@api.route('/admin/users')
def admin_list_users():
    """List all users (admin only)"""
    if not is_admin():
        return jsonify({'error': 'Admin access required'}), 403

    try:
        users_dir = current_app.config.get('UPLOAD_FOLDER', 'user_data')
        users = []

        if os.path.exists(users_dir):
            for username in os.listdir(users_dir):
                user_path = os.path.join(users_dir, username)
                if os.path.isdir(user_path):
                    # Calculate user storage usage
                    used_space = 0
                    for root, dirs, files in os.walk(user_path):
                        for file in files:
                            try:
                                used_space += os.path.getsize(os.path.join(root, file))
                            except:
                                continue

                    users.append({
                        'id': len(users) + 1,
                        'username': username,
                        'email': f'{username}@emberframe.local',
                        'is_admin': username in ['admin', 'administrator'],
                        'is_active': True,
                        'created_at': datetime.now().isoformat(),
                        'last_active': datetime.now().isoformat(),
                        'quota_mb': 100,
                        'used_space': used_space,
                        'used_space_formatted': format_file_size(used_space)
                    })

        stats = {
            'total': len(users),
            'active': len([u for u in users if u['is_active']]),
            'admins': len([u for u in users if u['is_admin']]),
            'new_this_week': 0  # Simplified for demo
        }

        log_activity('admin_list_users', {'user_count': len(users)})

        return jsonify({
            'users': users,
            'stats': stats
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@api.route('/admin/users', methods=['POST'])
def admin_create_user():
    """Create a new user (admin only)"""
    if not is_admin():
        return jsonify({'error': 'Admin access required'}), 403

    try:
        data = request.get_json()
        username = data.get('username', '').strip()

        if not username or len(username) < 3:
            return jsonify({'error': 'Valid username required (3+ characters)'}), 400

        # Create user directory
        users_dir = current_app.config.get('UPLOAD_FOLDER', 'user_data')
        user_path = os.path.join(users_dir, username)

        if os.path.exists(user_path):
            return jsonify({'error': 'User already exists'}), 400

        os.makedirs(user_path, exist_ok=True)

        # Create default directories
        default_dirs = ['Documents', 'Downloads', 'Pictures', 'Music', 'Desktop']
        for dir_name in default_dirs:
            os.makedirs(os.path.join(user_path, dir_name), exist_ok=True)

        log_activity('admin_create_user', {'username': username})

        return jsonify({'message': f'User "{username}" created successfully'})

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@api.route('/admin/users/<int:user_id>', methods=['DELETE'])
def admin_delete_user(user_id):
    """Delete a user (admin only)"""
    if not is_admin():
        return jsonify({'error': 'Admin access required'}), 403

    try:
        # This is a simplified implementation
        # In a real app, you'd have a proper user database
        return jsonify({'message': 'User deletion not implemented in demo'})

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@api.route('/admin/system-stats')
def admin_system_stats():
    """Get system statistics (admin only)"""
    if not is_admin():
        return jsonify({'error': 'Admin access required'}), 403

    try:
        users_dir = current_app.config.get('UPLOAD_FOLDER', 'user_data')
        user_count = 0

        if os.path.exists(users_dir):
            user_count = len([d for d in os.listdir(users_dir) if os.path.isdir(os.path.join(users_dir, d))])

        return jsonify({
            'stats': {
                'users': {
                    'total': user_count,
                    'active': user_count,
                    'new_this_week': 0
                }
            }
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@api.route('/admin/file-stats')
def admin_file_stats():
    """Get file system statistics (admin only)"""
    if not is_admin():
        return jsonify({'error': 'Admin access required'}), 403

    try:
        public_path = get_public_path()
        public_files = 0
        total_storage = 0

        # Count public files
        if os.path.exists(public_path):
            for root, dirs, files in os.walk(public_path):
                public_files += len(files)
                for file in files:
                    try:
                        total_storage += os.path.getsize(os.path.join(root, file))
                    except:
                        continue

        # Count user directories
        users_dir = current_app.config.get('UPLOAD_FOLDER', 'user_data')
        user_directories = 0
        if os.path.exists(users_dir):
            user_directories = len([d for d in os.listdir(users_dir) if os.path.isdir(os.path.join(users_dir, d))])

        return jsonify({
            'public_files': public_files,
            'total_storage': total_storage,
            'user_directories': user_directories
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@api.route('/admin/system-info')
def admin_system_info():
    """Get system information (admin only)"""
    if not is_admin():
        return jsonify({'error': 'Admin access required'}), 403

    try:
        import psutil
        import platform

        # System info
        info = {
            'uptime': time.time() - psutil.boot_time(),
            'platform': platform.platform(),
            'python_version': platform.python_version(),
            'storage': {
                'used': 0,
                'total': 1024 * 1024 * 1024,  # 1GB default
                'free': 1024 * 1024 * 1024
            },
            'memory': f"{psutil.virtual_memory().percent}%",
            'load': f"{psutil.cpu_percent()}%",
            'sessions': {
                'active': 1  # Simplified
            }
        }

        return jsonify(info)

    except ImportError:
        # Fallback if psutil not available
        return jsonify({
            'uptime': 3600,  # 1 hour
            'platform': 'Python/Flask',
            'python_version': '3.x',
            'storage': {
                'used': 100 * 1024 * 1024,
                'total': 1024 * 1024 * 1024,
                'free': 924 * 1024 * 1024
            },
            'memory': 'N/A',
            'load': 'N/A',
            'sessions': {'active': 1}
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@api.route('/admin/logs')
def admin_logs():
    """Get activity logs (admin only)"""
    if not is_admin():
        return jsonify({'error': 'Admin access required'}), 403

    try:
        logs = []
        logs_dir = os.path.join(os.getcwd(), 'logs')

        if os.path.exists(logs_dir):
            # Read recent log files
            log_files = sorted([f for f in os.listdir(logs_dir) if f.startswith('activity_')])

            for log_file in log_files[-2:]:  # Last 2 months
                log_path = os.path.join(logs_dir, log_file)
                try:
                    with open(log_path, 'r') as f:
                        for line in f:
                            try:
                                log_entry = json.loads(line.strip())
                                logs.append({
                                    'timestamp': log_entry['timestamp'],
                                    'user': log_entry['user'],
                                    'message': log_entry['action'],
                                    'type': 'info',
                                    'ip': log_entry.get('ip', 'N/A')
                                })
                            except:
                                continue
                except:
                    continue

        # Sort by timestamp (newest first)
        logs.sort(key=lambda x: x['timestamp'], reverse=True)

        # Limit to last 100 entries
        logs = logs[:100]

        return jsonify({'logs': logs})

    except Exception as e:
        return jsonify({'error': str(e)}), 500


# ============================================================================
# USER PREFERENCES ROUTES
# ============================================================================

@api.route('/user/preferences')
def get_user_preferences():
    """Get user preferences"""
    if 'username' not in session:
        return jsonify({'error': 'Not authenticated'}), 401

    # Default preferences
    preferences = {
        'theme': 'cyber-blue',
        'wallpaperStyle': '',
        'fontFamily': 'Rajdhani, sans-serif',
        'fontSize': 14,
        'iconSize': 48,
        'animationsEnabled': True,
        'blurEffects': True,
        'iconShadows': True,
        'transparency': 10,
        'animationQuality': 'high',
        'hardwareAcceleration': True,
        'autoHideTaskbar': False,
        'showClock': True,
        'notificationPosition': 'top-right',
        'showIconLabels': True
    }

    return jsonify({
        'success': True,
        'preferences': preferences,
        'user': {
            'username': session.get('username'),
            'isAdmin': is_admin(),
            'avatar': None
        }
    })


@api.route('/user/preferences', methods=['POST'])
def save_user_preferences():
    """Save user preferences"""
    if 'username' not in session:
        return jsonify({'error': 'Not authenticated'}), 401

    try:
        data = request.get_json()
        # In a real app, you'd save these to a database
        # For now, just return success

        log_activity('save_preferences', {'preferences_updated': True})

        return jsonify({'success': True, 'message': 'Preferences saved'})

    except Exception as e:
        return jsonify({'error': str(e)}), 500


# ============================================================================
# APP DISCOVERY ROUTES
# ============================================================================

@api.route('/apps/available')
def get_available_apps():
    """Get list of available applications"""

    # Default apps that are always available
    apps = [
        {
            'id': 'file-manager',
            'name': 'File Manager',
            'icon': 'fas fa-folder',
            'description': 'Browse and manage your files',
            'category': 'System',
            'version': '2.0.0',
            'author': 'EmberFrame Team',
            'enabled': True,
            'file': 'file-manager.js'
        },
        {
            'id': 'public-folder',
            'name': 'Public Files',
            'icon': 'fas fa-globe',
            'description': 'Access shared public files',
            'category': 'System',
            'version': '1.0.0',
            'author': 'EmberFrame Team',
            'enabled': True,
            'file': 'public-folder.js'
        },
        {
            'id': 'terminal',
            'name': 'Terminal',
            'icon': 'fas fa-terminal',
            'description': 'Command line interface',
            'category': 'System',
            'version': '1.0.0',
            'author': 'EmberFrame Team',
            'enabled': True,
            'file': 'terminal.js'
        },
        {
            'id': 'settings',
            'name': 'Settings',
            'icon': 'fas fa-cog',
            'description': 'Customize your experience',
            'category': 'System',
            'version': '1.0.0',
            'author': 'EmberFrame Team',
            'enabled': True,
            'file': 'settings.js'
        },
        {
            'id': 'text-editor',
            'name': 'Text Editor',
            'icon': 'fas fa-edit',
            'description': 'Edit text files with syntax highlighting',
            'category': 'Productivity',
            'version': '1.0.0',
            'author': 'EmberFrame Team',
            'enabled': True,
            'file': 'text-editor.js'
        },
        {
            'id': 'task-manager',
            'name': 'Task Manager',
            'icon': 'fas fa-tasks',
            'description': 'Monitor and manage running applications',
            'category': 'Administration',
            'version': '1.0.0',
            'author': 'EmberFrame Team',
            'enabled': True,
            'file': 'task-manager.js'
        }
    ]

    # Add admin panel for admin users
    if is_admin():
        apps.append({
            'id': 'admin-panel',
            'name': 'Admin Panel',
            'icon': 'fas fa-shield-alt',
            'description': 'Comprehensive administrative tools',
            'category': 'Administration',
            'version': '2.0.0',
            'author': 'EmberFrame Team',
            'enabled': True,
            'file': 'admin-panel.js'
        })

    return jsonify({
        'success': True,
        'apps': apps
    })


# Register the blueprint in your main app
def register_api_routes(app):
    app.register_blueprint(api)