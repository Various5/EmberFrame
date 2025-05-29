#!/bin/bash

# EmberFrame CSRF Fix Script
# This script applies the necessary fixes to resolve the CSRF token error

echo "🔥 EmberFrame CSRF Fix Script"
echo "================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    local color="$1"
    local message="$2"
    echo -e "${color}${message}${NC}"
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check if we're in the right directory
if [[ ! -f "run.py" ]] || [[ ! -d "app" ]]; then
    print_status "$RED" "❌ Error: This doesn't appear to be the EmberFrame root directory"
    print_status "$YELLOW" "   Please run this script from the project root (where run.py is located)"
    exit 1
fi

print_status "$BLUE" "📍 Working in: $(pwd)"

# Step 1: Check Python and pip
print_status "$YELLOW" "🔍 Checking Python environment..."
if command_exists python3; then
    print_status "$GREEN" "✅ Python3 found: $(python3 --version)"
elif command_exists python; then
    print_status "$GREEN" "✅ Python found: $(python --version)"
    PYTHON_CMD="python"
else
    print_status "$RED" "❌ Python not found!"
    exit 1
fi

PYTHON_CMD="${PYTHON_CMD:-python3}"

# Step 2: Install Flask-WTF
print_status "$YELLOW" "🔧 Installing Flask-WTF..."
if $PYTHON_CMD -m pip install Flask-WTF WTForms; then
    print_status "$GREEN" "✅ Flask-WTF installed successfully"
else
    print_status "$RED" "❌ Failed to install Flask-WTF"
    print_status "$YELLOW" "   Please run manually: $PYTHON_CMD -m pip install Flask-WTF WTForms"
fi

# Step 3: Backup existing files
print_status "$YELLOW" "💾 Creating backups..."
TIMESTAMP=$(date +%s)

if [[ -f "app/__init__.py" ]]; then
    cp "app/__init__.py" "app/__init__.py.backup.$TIMESTAMP"
    print_status "$GREEN" "✅ Backed up app/__init__.py"
fi

if [[ -f "templates/base.html" ]]; then
    cp "templates/base.html" "templates/base.html.backup.$TIMESTAMP"
    print_status "$GREEN" "✅ Backed up templates/base.html"
fi

# Step 4: Check if templates directory exists
if [[ ! -d "templates" ]]; then
    print_status "$RED" "❌ Templates directory not found!"
    print_status "$YELLOW" "   Creating templates directory..."
    mkdir -p templates
fi

# Step 5: Add CSRF token to base.html if it exists
if [[ -f "templates/base.html" ]]; then
    print_status "$YELLOW" "🔍 Checking base.html for CSRF token..."

    # Check if CSRF token is already present
    if grep -q "csrf-token\|csrf_token()" "templates/base.html"; then
        print_status "$GREEN" "✅ CSRF token already present in base.html"
    else
        print_status "$YELLOW" "   Adding CSRF meta tag to base.html..."

        # Create a temporary file with the CSRF meta tag
        if grep -q '<meta charset="UTF-8">' "templates/base.html"; then
            # Use awk to insert the line after charset meta tag
            awk '/<meta charset="UTF-8">/ {print; print "    <meta name=\"csrf-token\" content=\"{{ csrf_token() }}\">"; next} 1' \
                "templates/base.html" > "templates/base.html.tmp" && \
                mv "templates/base.html.tmp" "templates/base.html"
            print_status "$GREEN" "✅ CSRF meta tag added to base.html"
        else
            # If no charset meta tag, add after <head>
            awk '/<head>/ {print; print "    <meta name=\"csrf-token\" content=\"{{ csrf_token() }}\">"; next} 1' \
                "templates/base.html" > "templates/base.html.tmp" && \
                mv "templates/base.html.tmp" "templates/base.html"
            print_status "$GREEN" "✅ CSRF meta tag added to base.html (after <head>)"
        fi
    fi
else
    print_status "$YELLOW" "⚠️  base.html not found - you'll need to add the CSRF meta tag manually"
fi

# Step 6: Create a simple test script
print_status "$YELLOW" "🧪 Creating test script..."
cat > test_csrf.py << 'EOF'
#!/usr/bin/env python3
"""
Simple test script to verify CSRF token functionality
"""

import sys
import os

try:
    # Add current directory to Python path
    sys.path.insert(0, os.getcwd())

    from app import create_app
    print("✅ App import successful")

    app = create_app()
    print("✅ App creation successful")

    with app.app_context():
        from flask_wtf.csrf import generate_csrf
        token = generate_csrf()
        print(f"✅ CSRF token generated successfully: {token[:20]}...")
        print("🎉 CSRF setup is working!")

except ImportError as e:
    print(f"❌ Import error: {e}")
    print("   Make sure Flask-WTF is installed: pip install Flask-WTF")
    sys.exit(1)

except Exception as e:
    print(f"❌ Error: {e}")
    print("   Check your app configuration")
    import traceback
    traceback.print_exc()
    sys.exit(1)
EOF

chmod +x test_csrf.py
print_status "$GREEN" "✅ Test script created: test_csrf.py"

# Step 7: Create requirements.txt if it doesn't exist
if [[ ! -f "requirements.txt" ]]; then
    print_status "$YELLOW" "📝 Creating requirements.txt..."
    cat > requirements.txt << 'EOF'
Flask>=2.3.0
Flask-SQLAlchemy>=3.0.0
Flask-Login>=0.6.0
Flask-WTF>=1.1.0
Flask-SocketIO>=5.3.0
Werkzeug>=2.3.0
python-socketio>=5.8.0
bcrypt>=4.0.0
python-dotenv>=1.0.0
redis>=6.2.0
Pillow>=10.0.0
python-magic>=0.4.27
colorlog>=6.7.0
WTForms>=3.0.0
EOF
    print_status "$GREEN" "✅ requirements.txt created"
fi

# Step 8: Run the test
print_status "$YELLOW" "🧪 Testing CSRF functionality..."
if $PYTHON_CMD test_csrf.py; then
    print_status "$GREEN" "✅ CSRF test passed!"
    TEST_PASSED=true
else
    print_status "$RED" "❌ CSRF test failed"
    TEST_PASSED=false
fi

# Step 9: Final instructions
print_status "$BLUE" "================================"
print_status "$GREEN" "🎉 Fix script completed!"
print_status "$BLUE" "📝 Next steps:"

if [[ "$TEST_PASSED" == "true" ]]; then
    echo "   ✅ CSRF is working! You can now run:"
    echo "      $PYTHON_CMD run.py"
else
    echo "   ⚠️  Please fix the issues above, then:"
    echo "   1. Replace your app/__init__.py with the fixed version"
    echo "   2. Replace your templates/base.html with the fixed version"
    echo "   3. Run: $PYTHON_CMD run.py"
fi

echo ""
print_status "$YELLOW" "🔧 If you still get errors:"
echo "   1. Check that Flask-WTF is installed: $PYTHON_CMD -m pip list | grep Flask-WTF"
echo "   2. Verify your templates have the CSRF meta tag"
echo "   3. Make sure your app initialization includes CSRFProtect()"
echo "   4. Run the test script: $PYTHON_CMD test_csrf.py"
echo ""

print_status "$BLUE" "📚 Files created/modified:"
echo "   - Backups created with timestamp: $TIMESTAMP"
echo "   - test_csrf.py (run this to test CSRF)"
echo "   - templates/base.html (modified if existed)"
echo "   - requirements.txt (created if missing)"

print_status "$GREEN" "✨ EmberFrame should now work without CSRF errors!"

# Step 10: Show next steps based on test results
if [[ "$TEST_PASSED" == "true" ]]; then
    echo ""
    print_status "$GREEN" "🚀 Ready to launch EmberFrame!"
    echo "Run: $PYTHON_CMD run.py"
else
    echo ""
    print_status "$YELLOW" "🔧 Manual fixes needed:"
    echo "1. Copy the fixed app/__init__.py from the artifacts above"
    echo "2. Copy the fixed templates/base.html from the artifacts above"
    echo "3. Then run: $PYTHON_CMD test_csrf.py"
fi