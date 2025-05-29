#!/usr/bin/env python3
import os
import sys
from app import create_app, socketio

def main():
    print("🔥 Starting EmberFrame...")

    app = create_app()
    port = int(os.environ.get('PORT', 5000))

    print(f"✅ EmberFrame running on http://localhost:{port}")
    print("   Press Ctrl+C to stop")

    try:
        socketio.run(app, host='0.0.0.0', port=port, debug=True)
    except KeyboardInterrupt:
        print("\n👋 EmberFrame stopped")

if __name__ == '__main__':
    main()
