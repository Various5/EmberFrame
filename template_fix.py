#!/usr/bin/env python3
"""
EmberFrame Template Fix Script
This script replaces the incorrect templates with fixed, professional versions
"""

import os
import shutil
from datetime import datetime


def backup_file(filepath):
    """Create a backup of the existing file"""
    if os.path.exists(filepath):
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        backup_path = f"{filepath}.backup_{timestamp}"
        shutil.copy2(filepath, backup_path)
        print(f"✅ Backed up {filepath} to {backup_path}")
        return True
    return False


def write_template(filepath, content):
    """Write template content to file"""
    try:
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✅ Created {filepath}")
        return True
    except Exception as e:
        print(f"❌ Failed to create {filepath}: {e}")
        return False


def main():
    print("🔥 EmberFrame Template Fix")
    print("=" * 40)

    # Check if we're in the right directory
    if not os.path.exists('templates'):
        print("❌ Templates directory not found. Creating it...")
        os.makedirs('templates', exist_ok=True)

    # Desktop template content (FIXED - this was the main issue!)
    desktop_content = '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>EmberFrame Desktop</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        :root {
            --primary-bg: #f8fafc;
            --secondary-bg: #ffffff;
            --accent-bg: #3b82f6;
            --border-color: #e2e8f0;
            --text-primary: #1e293b;
            --text-secondary: #64748b;
            --text-white: #ffffff;
            --shadow-light: 0 1px 3px rgba(0, 0, 0, 0.1);
            --shadow-medium: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            height: 100vh;
            overflow: hidden;
            color: var(--text-primary);
        }

        .desktop {
            height: calc(100vh - 60px);
            position: relative;
            padding: 20px;
        }

        .desktop-icon {
            position: absolute;
            width: 80px;
            text-align: center;
            cursor: pointer;
            padding: 12px 8px;
            border-radius: 12px;
            transition: all 0.2s ease;
            user-select: none;
        }

        .desktop-icon:hover {
            background: rgba(255, 255, 255, 0.15);
            transform: scale(1.05);
        }

        .icon-image {
            width: 48px;
            height: 48px;
            margin: 0 auto 8px;
            background: var(--secondary-bg);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            box-shadow: var(--shadow-medium);
            transition: all 0.2s ease;
        }

        .icon-label {
            color: white;
            font-size: 12px;
            font-weight: 500;
            text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
            word-wrap: break-word;
            line-height: 1.2;
        }

        .taskbar {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            height: 60px;
            background: rgba(30, 41, 59, 0.95);
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            padding: 0 20px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            z-index: 1000;
        }

        .start-button {
            background: var(--accent-bg);
            color: var(--text-white);
            border: none;
            padding: 10px 20px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            font-size: 14px;
            transition: all 0.2s ease;
            margin-right: 20px;
        }

        .start-button:hover {
            background: #2563eb;
            transform: translateY(-1px);
            box-shadow: var(--shadow-medium);
        }

        .system-tray {
            margin-left: auto;
            display: flex;
            align-items: center;
            gap: 16px;
            color: var(--text-white);
            font-size: 14px;
        }

        .time {
            font-weight: 500;
            font-variant-numeric: tabular-nums;
        }

        .logout-btn {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: var(--text-white);
            padding: 6px 12px;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.2s ease;
            font-size: 13px;
        }

        .logout-btn:hover {
            background: rgba(239, 68, 68, 0.2);
            border-color: rgba(239, 68, 68, 0.4);
            color: #fca5a5;
        }

        .welcome-overlay {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            background: rgba(255, 255, 255, 0.95);
            padding: 40px;
            border-radius: 16px;
            box-shadow: var(--shadow-medium);
            max-width: 500px;
            backdrop-filter: blur(10px);
        }

        .welcome-title {
            font-size: 24px;
            font-weight: 700;
            color: var(--text-primary);
            margin-bottom: 8px;
        }

        .welcome-subtitle {
            font-size: 18px;
            color: var(--accent-bg);
            font-weight: 500;
            margin-bottom: 16px;
        }

        .welcome-message {
            color: var(--text-secondary);
            line-height: 1.6;
            margin-bottom: 24px;
        }

        .welcome-btn {
            padding: 10px 20px;
            border: none;
            border-radius: 8px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
            margin: 0 6px;
        }

        .welcome-btn.primary {
            background: var(--accent-bg);
            color: var(--text-white);
        }

        .welcome-btn.primary:hover {
            background: #2563eb;
        }
    </style>
</head>
<body>
    <div class="desktop" id="desktop">
        <!-- Desktop Icons -->
        <div class="desktop-icon" style="top: 20px; left: 20px;">
            <div class="icon-image" style="background: linear-gradient(135deg, #3b82f6, #1d4ed8);">📁</div>
            <div class="icon-label">File Manager</div>
        </div>

        <div class="desktop-icon" style="top: 20px; left: 120px;">
            <div class="icon-image" style="background: linear-gradient(135deg, #1f2937, #111827);">💻</div>
            <div class="icon-label">Terminal</div>
        </div>

        <div class="desktop-icon" style="top: 120px; left: 20px;">
            <div class="icon-image" style="background: linear-gradient(135deg, #059669, #047857);">📝</div>
            <div class="icon-label">Text Editor</div>
        </div>

        <div class="desktop-icon" style="top: 120px; left: 120px;">
            <div class="icon-image" style="background: linear-gradient(135deg, #7c3aed, #5b21b6);">⚙️</div>
            <div class="icon-label">Settings</div>
        </div>

        <!-- Welcome Message -->
        <div class="welcome-overlay" id="welcome-overlay">
            <h1 class="welcome-title">Welcome to EmberFrame</h1>
            <h2 class="welcome-subtitle">Hello, {{ username }}!</h2>
            <p class="welcome-message">
                Your desktop environment is ready. Double-click icons to launch applications.
            </p>
            <button class="welcome-btn primary" onclick="closeWelcome()">Get Started</button>
        </div>
    </div>

    <!-- Taskbar -->
    <div class="taskbar">
        <button class="start-button">🔥 Start</button>
        <div style="flex: 1;"></div>
        <div class="system-tray">
            <span>{{ username }}</span>
            <div class="time" id="current-time"></div>
            <button class="logout-btn" onclick="logout()">Sign Out</button>
        </div>
    </div>

    <script>
        console.log('🔥 EmberFrame Desktop loaded for user: {{ username }}');

        function updateTime() {
            const now = new Date();
            const timeString = now.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });
            document.getElementById('current-time').textContent = timeString;
        }

        function closeWelcome() {
            document.getElementById('welcome-overlay').style.display = 'none';
        }

        function logout() {
            if (confirm('Are you sure you want to sign out?')) {
                window.location.href = '/logout';
            }
        }

        // Initialize
        updateTime();
        setInterval(updateTime, 1000);

        console.log('✅ Desktop initialized successfully');
    </script>
</body>
</html>'''

    # Login template content (FIXED - professional styling)
    login_content = '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>EmberFrame - Sign In</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .login-container {
            width: 100%;
            max-width: 420px;
            background: white;
            border-radius: 16px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }

        .login-header {
            text-align: center;
            padding: 40px 40px 30px;
            background: #f9fafb;
        }

        .logo {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 64px;
            height: 64px;
            background: #3b82f6;
            border-radius: 16px;
            font-size: 28px;
            margin-bottom: 20px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .login-title {
            font-size: 28px;
            font-weight: 700;
            color: #1f2937;
            margin-bottom: 8px;
        }

        .login-subtitle {
            font-size: 16px;
            color: #6b7280;
            font-weight: 400;
        }

        .login-form {
            padding: 30px 40px 40px;
        }

        .demo-notice {
            background: linear-gradient(135deg, #dbeafe, #bfdbfe);
            color: #1e40af;
            padding: 16px;
            border-radius: 12px;
            margin-bottom: 24px;
            border: 1px solid #93c5fd;
            text-align: center;
            font-size: 14px;
        }

        .demo-notice-title {
            font-weight: 600;
            margin-bottom: 4px;
        }

        .message {
            padding: 12px 16px;
            border-radius: 8px;
            margin-bottom: 20px;
            display: none;
            font-size: 14px;
            font-weight: 500;
        }

        .error-message {
            background: #fef2f2;
            color: #dc2626;
            border: 1px solid #fecaca;
        }

        .success-message {
            background: #f0fdf4;
            color: #16a34a;
            border: 1px solid #bbf7d0;
        }

        .form-group {
            margin-bottom: 20px;
        }

        .form-label {
            display: block;
            margin-bottom: 6px;
            font-weight: 500;
            color: #1f2937;
            font-size: 14px;
        }

        .form-input {
            width: 100%;
            padding: 12px 16px;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            font-size: 16px;
            font-family: inherit;
            background: white;
            transition: all 0.2s ease;
        }

        .form-input:focus {
            outline: none;
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .form-input::placeholder {
            color: #9ca3af;
        }

        .login-button {
            width: 100%;
            padding: 12px 24px;
            background: #3b82f6;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            margin-bottom: 20px;
        }

        .login-button:hover:not(:disabled) {
            background: #2563eb;
            transform: translateY(-1px);
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .login-button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
        }

        .loading {
            display: none;
            align-items: center;
            gap: 8px;
            justify-content: center;
        }

        .spinner {
            width: 16px;
            height: 16px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-top: 2px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .login-footer {
            text-align: center;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
        }

        .register-link {
            color: #3b82f6;
            text-decoration: none;
            font-weight: 500;
            transition: color 0.2s ease;
        }

        .register-link:hover {
            color: #2563eb;
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="login-container">
        <div class="login-header">
            <div class="logo">🔥</div>
            <h1 class="login-title">EmberFrame</h1>
            <p class="login-subtitle">Professional Desktop Environment</p>
        </div>

        <div class="login-form">
            <div class="demo-notice">
                <div class="demo-notice-title">Demo Access</div>
                <div>Use any username (3+ characters) with any password to sign in</div>
            </div>

            <div class="message error-message" id="error-message"></div>
            <div class="message success-message" id="success-message"></div>

            <form id="login-form">
                <div class="form-group">
                    <label class="form-label" for="username">Username</label>
                    <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        class="form-input" 
                        placeholder="Enter your username"
                        required 
                        minlength="3"
                        autocomplete="username"
                    >
                </div>

                <div class="form-group">
                    <label class="form-label" for="password">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        class="form-input" 
                        placeholder="Enter your password"
                        required
                        autocomplete="current-password"
                    >
                </div>

                <button type="submit" class="login-button" id="login-btn">
                    <span id="login-text">Sign In</span>
                    <div class="loading" id="login-loading">
                        <div class="spinner"></div>
                        <span>Signing in...</span>
                    </div>
                </button>
            </form>

            <div class="login-footer">
                <p>Don't have an account? <a href="/register" class="register-link">Create one</a></p>
            </div>
        </div>
    </div>

    <script>
        console.log('🔥 EmberFrame Login Page Loaded');

        function showMessage(text, type = 'error') {
            const errorMsg = document.getElementById('error-message');
            const successMsg = document.getElementById('success-message');

            errorMsg.style.display = 'none';
            successMsg.style.display = 'none';

            if (type === 'error') {
                errorMsg.textContent = text;
                errorMsg.style.display = 'block';
            } else if (type === 'success') {
                successMsg.textContent = text;
                successMsg.style.display = 'block';
            }
        }

        function setLoading(loading) {
            const loginBtn = document.getElementById('login-btn');
            const loginText = document.getElementById('login-text');
            const loginLoading = document.getElementById('login-loading');

            if (loading) {
                loginBtn.disabled = true;
                loginText.style.display = 'none';
                loginLoading.style.display = 'flex';
            } else {
                loginBtn.disabled = false;
                loginText.style.display = 'inline';
                loginLoading.style.display = 'none';
            }
        }

        document.getElementById('login-form').addEventListener('submit', async (e) => {
            e.preventDefault();

            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();

            console.log('🔐 Login attempt:', username);

            if (!username) {
                showMessage('Please enter your username', 'error');
                document.getElementById('username').focus();
                return;
            }

            if (!password) {
                showMessage('Please enter your password', 'error');
                document.getElementById('password').focus();
                return;
            }

            if (username.length < 3) {
                showMessage('Username must be at least 3 characters long', 'error');
                document.getElementById('username').focus();
                return;
            }

            setLoading(true);

            try {
                console.log('📡 Sending login request...');

                const response = await fetch('/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password
                    })
                });

                console.log('📡 Response status:', response.status);

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }

                const result = await response.json();
                console.log('📡 Response:', result);

                if (result.success) {
                    showMessage('Login successful! Redirecting...', 'success');
                    console.log('✅ Login successful, redirecting to desktop');

                    setTimeout(() => {
                        window.location.href = result.redirect || '/';
                    }, 1000);
                } else {
                    showMessage(result.message || 'Login failed', 'error');
                    console.log('❌ Login failed:', result.message);
                }

            } catch (error) {
                console.error('❌ Login error:', error);
                showMessage(`Connection error: ${error.message}`, 'error');
            } finally {
                setLoading(false);
            }
        });

        document.addEventListener('DOMContentLoaded', () => {
            document.getElementById('username').focus();
        });

        console.log('✅ Login page initialized');
    </script>
</body>
</html>'''

    # Write the templates
    templates = [
        ('templates/desktop.html', desktop_content),
        ('templates/login.html', login_content)
    ]

    success_count = 0
    for filepath, content in templates:
        backup_file(filepath)
        if write_template(filepath, content):
            success_count += 1

    print("\n" + "=" * 40)
    print(f"✅ Fixed {success_count}/{len(templates)} templates")

    if success_count == len(templates):
        print("\n🎉 Template fix completed successfully!")
        print("\n📝 What was fixed:")
        print("   • desktop.html now shows actual desktop (was showing login)")
        print("   • login.html now has professional styling (removed cyberpunk)")
        print("   • Both templates are clean and functional")
        print("\n🚀 You can now run: python run.py")
        print("   The login should work correctly now!")
    else:
        print("\n⚠️  Some templates failed to update")
        print("   Please check the error messages above")


if __name__ == '__main__':
    main()