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
        apps_folder = Path('static/js/apps')

        if not apps_folder.exists():
            return jsonify({'success': False, 'error': 'Apps folder not found'})

        # Scan all .js files in the apps folder
        for app_file in apps_folder.glob('*.js'):
            app_id = app_file.stem  # filename without .js

            # Read the app file to extract metadata
            try:
                with open(app_file, 'r', encoding='utf-8') as f:
                    content = f.read()

                # Extract metadata from the app file
                metadata = extract_app_metadata(content, app_id)
                if metadata:
                    apps.append(metadata)

            except Exception as e:
                print(f"Error reading app {app_file}: {e}")
                continue

        return jsonify({
            'success': True,
            'apps': apps
        })

    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        })


def extract_app_metadata(content, app_id):
    """Extract metadata from app file comments or static properties"""

    # Default values
    metadata = {
        'id': app_id,
        'name': app_id.replace('-', ' ').title(),
        'icon': 'fas fa-window-maximize',
        'description': f'{app_id.replace("-", " ").title()} application',
        'category': 'Applications',
        'version': '1.0.0',
        'author': 'EmberFrame',
        'enabled': True
    }

    # Look for metadata in comments at the top of the file
    metadata_pattern = r'/\*\*\s*APP_METADATA\s*(.*?)\s*\*/'
    match = re.search(metadata_pattern, content, re.DOTALL)

    if match:
        try:
            # Parse the metadata block
            metadata_text = match.group(1)

            # Extract individual properties
            patterns = {
                'name': r'@name\s+(.+)',
                'icon': r'@icon\s+(.+)',
                'description': r'@description\s+(.+)',
                'category': r'@category\s+(.+)',
                'version': r'@version\s+(.+)',
                'author': r'@author\s+(.+)',
                'enabled': r'@enabled\s+(.+)'
            }

            for key, pattern in patterns.items():
                prop_match = re.search(pattern, metadata_text)
                if prop_match:
                    value = prop_match.group(1).strip()
                    if key == 'enabled':
                        metadata[key] = value.lower() in ['true', '1', 'yes']
                    else:
                        metadata[key] = value

        except Exception as e:
            print(f"Error parsing metadata for {app_id}: {e}")

    return metadata if metadata['enabled'] else None