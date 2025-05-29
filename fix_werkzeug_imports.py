#!/usr/bin/env python3
"""
Fix Werkzeug import compatibility issues for EmberFrame
This script resolves the 'cannot import name url_encode from werkzeug.urls' error
"""

import subprocess
import sys
import os
import importlib
import pkg_resources


def print_status(symbol, message, color_code=None):
    """Print status with optional color"""
    colors = {
        'red': '\033[91m',
        'green': '\033[92m',
        'yellow': '\033[93m',
        'blue': '\033[94m',
        'reset': '\033[0m'
    }

    if color_code and color_code in colors:
        print(f"{colors[color_code]}{symbol} {message}{colors['reset']}")
    else:
        print(f"{symbol} {message}")


def get_package_version(package_name):
    """Get the version of an installed package"""
    try:
        return pkg_resources.get_distribution(package_name).version
    except pkg_resources.DistributionNotFound:
        return None


def check_versions():
    """Check current versions of key packages"""
    print_status("🔍", "Checking current package versions...", "blue")

    packages = ['Flask', 'Werkzeug', 'Flask-WTF', 'Jinja2', 'MarkupSafe']
    versions = {}

    for package in packages:
        version = get_package_version(package)
        versions[package] = version
        if version:
            print_status("📦", f"{package}: {version}", "green")
        else:
            print_status("❌", f"{package}: Not installed", "red")

    return versions


def fix_werkzeug_compatibility():
    """Fix Werkzeug compatibility by installing compatible versions"""
    print_status("🔧", "Installing compatible package versions...", "yellow")

    # Uninstall potentially conflicting packages first
    packages_to_uninstall = ['Flask', 'Werkzeug', 'Flask-WTF', 'Jinja2', 'MarkupSafe']

    print_status("🗑️", "Removing existing packages to avoid conflicts...", "yellow")
    for package in packages_to_uninstall:
        try:
            subprocess.run([sys.executable, '-m', 'pip', 'uninstall', '-y', package],
                           capture_output=True, check=False)
        except:
            pass

    # Install compatible versions
    compatible_packages = [
        'Werkzeug>=2.3.0,<3.0.0',
        'Flask>=2.3.0,<3.0.0',
        'Jinja2>=3.1.0,<4.0.0',
        'MarkupSafe>=2.1.0,<3.0.0',
        'Flask-WTF>=1.1.0,<2.0.0',
        'WTForms>=3.0.0,<4.0.0',
        'Flask-SocketIO>=5.3.0,<6.0.0',
        'python-socketio>=5.8.0,<6.0.0'
    ]

    print_status("⬇️", "Installing compatible versions...", "blue")

    try:
        subprocess.run([
                           sys.executable, '-m', 'pip', 'install', '--upgrade'
                       ] + compatible_packages, check=True)

        print_status("✅", "Compatible packages installed successfully!", "green")
        return True
    except subprocess.CalledProcessError as e:
        print_status("❌", f"Failed to install packages: {e}", "red")
        return False


def create_compatibility_patch():
    """Create a compatibility patch for import issues"""
    print_status("🩹", "Creating compatibility patch...", "yellow")

    patch_content = '''
"""
Werkzeug compatibility patch for EmberFrame
This patch handles import changes in different Werkzeug versions
"""

import sys

# Handle url_encode import compatibility
try:
    from werkzeug.urls import url_encode
except ImportError:
    try:
        from werkzeug.datastructures import url_encode
    except ImportError:
        from urllib.parse import urlencode as url_encode

# Handle url_decode import compatibility  
try:
    from werkzeug.urls import url_decode
except ImportError:
    try:
        from werkzeug.datastructures import url_decode
    except ImportError:
        from urllib.parse import parse_qs
        def url_decode(s):
            return parse_qs(s, keep_blank_values=True)

# Make imports available
__all__ = ['url_encode', 'url_decode']
'''

    try:
        # Create compatibility module
        with open('werkzeug_compat.py', 'w') as f:
            f.write(patch_content)

        print_status("✅", "Compatibility patch created: werkzeug_compat.py", "green")
        return True
    except Exception as e:
        print_status("❌", f"Failed to create patch: {e}", "red")
        return False


def test_imports():
    """Test if all imports work correctly"""
    print_status("🧪", "Testing imports...", "blue")

    test_imports = [
        ('flask', 'Flask'),
        ('werkzeug', 'Werkzeug'),
        ('flask_wtf.csrf', 'CSRFProtect'),
        ('jinja2', 'Template'),
    ]

    all_good = True

    for module_name, class_name in test_imports:
        try:
            module = importlib.import_module(module_name)
            if hasattr(module, class_name):
                print_status("✅", f"{module_name}.{class_name} - OK", "green")
            else:
                print_status("⚠️", f"{module_name}.{class_name} - Class not found", "yellow")
        except ImportError as e:
            print_status("❌", f"{module_name} - Import failed: {e}", "red")
            all_good = False

    # Test specific Werkzeug imports that cause issues
    werkzeug_tests = [
        ('werkzeug.urls', 'url_encode'),
        ('werkzeug.datastructures', 'url_encode'),
    ]

    print_status("🔍", "Testing Werkzeug imports...", "blue")
    werkzeug_ok = False

    for module_name, func_name in werkzeug_tests:
        try:
            module = importlib.import_module(module_name)
            if hasattr(module, func_name):
                print_status("✅", f"{module_name}.{func_name} - OK", "green")
                werkzeug_ok = True
                break
        except ImportError:
            print_status("ℹ️", f"{module_name} - Not available", "blue")

    if not werkzeug_ok:
        print_status("⚠️", "url_encode not found in expected locations", "yellow")
        all_good = False

    return all_good


def test_app_creation():
    """Test if the app can be created successfully"""
    print_status("🚀", "Testing app creation...", "blue")

    try:
        # Add current directory to path
        sys.path.insert(0, os.getcwd())

        from app import create_app
        app = create_app()

        with app.app_context():
            from flask_wtf.csrf import generate_csrf
            token = generate_csrf()

            print_status("✅", f"App created successfully!", "green")
            print_status("✅", f"CSRF token generated: {token[:20]}...", "green")
            return True

    except Exception as e:
        print_status("❌", f"App creation failed: {e}", "red")
        import traceback
        print(traceback.format_exc())
        return False


def main():
    """Main fix function"""
    print("🔥 EmberFrame Werkzeug Import Fix")
    print("=" * 40)

    # Check if we're in the right directory
    if not os.path.exists('app') or not os.path.exists('run.py'):
        print_status("❌", "This doesn't appear to be the EmberFrame root directory", "red")
        print_status("ℹ️", "Please run this from the project root directory", "blue")
        return False

    # Step 1: Check current versions
    versions = check_versions()

    # Step 2: Fix compatibility
    if not fix_werkzeug_compatibility():
        print_status("❌", "Failed to fix compatibility", "red")
        return False

    # Step 3: Create compatibility patch
    create_compatibility_patch()

    # Step 4: Test imports
    if not test_imports():
        print_status("⚠️", "Some imports still have issues", "yellow")

    # Step 5: Test app creation
    if test_app_creation():
        print_status("🎉", "SUCCESS! EmberFrame should now work correctly", "green")
        print()
        print_status("🚀", "Try running: python run.py", "blue")
        return True
    else:
        print_status("❌", "App creation still failing", "red")
        print()
        print_status("💡", "Manual fixes needed:", "yellow")
        print("   1. Check your app/__init__.py for any direct Werkzeug imports")
        print("   2. Replace with the fixed version from the artifacts")
        print("   3. Ensure all templates exist in the templates/ directory")
        return False


if __name__ == '__main__':
    success = main()
    sys.exit(0 if success else 1)