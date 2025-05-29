#!/usr/bin/env python3
"""
EmberFrame Application Launcher
"""

import os
import sys
import logging
from app import create_app, socketio

def main():
    try:
        os.makedirs('logs', exist_ok=True)

        print("🔥 Starting EmberFrame Desktop Environment")
        print("=" * 50)

        app = create_app()
        port = int(os.environ.get('PORT', 5000))
        host = os.environ.get('HOST', '0.0.0.0')

        print(f"✅ EmberFrame ready!")
        print(f"🌐 Open: http://localhost:{port}")
        print(f"🔑 Create account: 3+ char username, 6+ char password")
        print(f"⚡ Press Ctrl+C to stop")
        print()

        socketio.run(app, host=host, port=port, debug=False)

    except KeyboardInterrupt:
        print("\n👋 EmberFrame stopped")
    except Exception as e:
        print(f"❌ Error: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()
