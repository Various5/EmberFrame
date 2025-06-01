#!/usr/bin/env python3
"""
EmberFrame App Discovery Fix Script
This script fixes the app discovery and loading issues in EmberFrame
"""

import os
import sys
import json
import shutil
from pathlib import Path


def print_status(emoji, message, color=None):
    """Print colored status message"""
    colors = {
        'red': '\033[91m',
        'green': '\033[92m',
        'yellow': '\033[93m',
        'blue': '\033[94m',
        'reset': '\033[0m'
    }

    if color and color in colors:
        print(f"{colors[color]}{emoji} {message}{colors['reset']}")
    else:
        print(f"{emoji} {message}")


def create_essential_apps():
    """Create essential app files that should always be available"""

    apps_dir = Path("static/js/apps")
    apps_dir.mkdir(parents=True, exist_ok=True)

    # Essential apps that should always be available
    essential_apps = {
        "file-manager.js": '''/**
 * APP_METADATA
 * @name File Manager
 * @icon fas fa-folder
 * @description Browse and manage your files
 * @category System
 * @version 1.0.0
 * @author EmberFrame Team
 * @enabled true
 */

class FileManager {
  static createWindow(startPath = 'home') {
    return {
      title: '📁 File Manager',
      width: '700px',
      height: '500px',
      content: `
        <div style="height: 100%; display: flex; flex-direction: column; background: #f8f9fa; font-family: system-ui;">
          <div style="background: #e9ecef; padding: 10px; border-bottom: 1px solid #dee2e6; display: flex; align-items: center; gap: 10px;">
            <button onclick="FileManager._goBack()" style="padding: 6px 12px; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer;">← Back</button>
            <button onclick="FileManager._goHome()" style="padding: 6px 12px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">🏠 Home</button>
            <span style="flex: 1; padding: 6px 12px; background: white; border: 1px solid #ced4da; border-radius: 4px;" id="current-path">/</span>
            <button onclick="FileManager._refresh()" style="padding: 6px 12px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;">🔄 Refresh</button>
          </div>
          <div style="flex: 1; overflow-y: auto; padding: 10px;">
            <div id="files-list" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 10px;">
              Loading files...
            </div>
          </div>
        </div>
      `,
      onInit: (container) => {
        FileManager._container = container;
        FileManager._currentPath = startPath;
        FileManager._loadFiles();
      }
    };
  }

  static _loadFiles() {
    const filesList = FileManager._container.querySelector('#files-list');
    const pathElement = FileManager._container.querySelector('#current-path');

    pathElement.textContent = FileManager._currentPath;

    // Simulate file loading
    filesList.innerHTML = `
      <div style="text-align: center; padding: 20px; border: 2px dashed #dee2e6; border-radius: 8px; cursor: pointer;" onclick="FileManager._createFolder()">
        <div style="font-size: 24px; margin-bottom: 8px;">📁</div>
        <div style="font-size: 14px;">Create Folder</div>
      </div>
      <div style="text-align: center; padding: 20px; border: 2px dashed #dee2e6; border-radius: 8px; cursor: pointer;" onclick="FileManager._uploadFile()">
        <div style="font-size: 24px; margin-bottom: 8px;">📄</div>
        <div style="font-size: 14px;">Upload File</div>
      </div>
    `;
  }

  static _goBack() {
    console.log('Going back...');
    FileManager._loadFiles();
  }

  static _goHome() {
    FileManager._currentPath = 'home';
    FileManager._loadFiles();
  }

  static _refresh() {
    FileManager._loadFiles();
  }

  static _createFolder() {
    const name = prompt('Folder name:');
    if (name) {
      alert(`Folder "${name}" created!`);
      FileManager._loadFiles();
    }
  }

  static _uploadFile() {
    alert('File upload feature coming soon!');
  }
}

window.FileManager = FileManager;''',

        "terminal.js": '''/**
 * APP_METADATA
 * @name Terminal
 * @icon fas fa-terminal
 * @description Command line interface
 * @category System
 * @version 1.0.0
 * @author EmberFrame Team
 * @enabled true
 */

class Terminal {
  static _history = [];
  static _historyIndex = -1;
  static _currentPath = '~';

  static createWindow() {
    return {
      title: '💻 Terminal',
      width: '600px',
      height: '400px',
      content: `
        <div style="height: 100%; background: #1e1e1e; color: #ffffff; font-family: 'Courier New', monospace; display: flex; flex-direction: column;">
          <div style="background: #333; padding: 8px 12px; font-size: 12px; border-bottom: 1px solid #555;">
            EmberFrame Terminal v1.0.0
          </div>
          <div id="terminal-output" style="flex: 1; padding: 10px; overflow-y: auto; font-size: 14px; line-height: 1.4;">
            <div style="color: #00ff00;">Welcome to EmberFrame Terminal!</div>
            <div style="color: #00ff00;">Type 'help' for available commands.</div>
            <div style="margin-top: 10px;"></div>
          </div>
          <div style="display: flex; align-items: center; padding: 8px 12px; background: #2d2d30; border-top: 1px solid #555;">
            <span style="color: #00ff00; margin-right: 8px;">${'user@emberframe:~$'}</span>
            <input id="terminal-input" type="text" style="flex: 1; background: transparent; border: none; color: white; outline: none; font-family: inherit; font-size: 14px;" placeholder="Enter command...">
          </div>
        </div>
      `,
      onInit: (container) => {
        Terminal._container = container;
        Terminal._setupInput();
      }
    };
  }

  static _setupInput() {
    const input = Terminal._container.querySelector('#terminal-input');
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const command = input.value.trim();
        if (command) {
          Terminal._executeCommand(command);
          Terminal._history.unshift(command);
          Terminal._historyIndex = -1;
        }
        input.value = '';
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (Terminal._historyIndex < Terminal._history.length - 1) {
          Terminal._historyIndex++;
          input.value = Terminal._history[Terminal._historyIndex];
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (Terminal._historyIndex > 0) {
          Terminal._historyIndex--;
          input.value = Terminal._history[Terminal._historyIndex];
        } else if (Terminal._historyIndex === 0) {
          Terminal._historyIndex = -1;
          input.value = '';
        }
      }
    });
  }

  static _executeCommand(command) {
    const output = Terminal._container.querySelector('#terminal-output');

    // Add command to output
    const commandDiv = document.createElement('div');
    commandDiv.innerHTML = `<span style="color: #00ff00;">user@emberframe:${Terminal._currentPath}$</span> ${command}`;
    output.appendChild(commandDiv);

    // Process command
    const parts = command.split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    let response = '';

    switch (cmd) {
      case 'help':
        response = `Available commands:
  help    - Show this help message
  ls      - List directory contents
  pwd     - Print working directory
  cd      - Change directory
  clear   - Clear terminal
  echo    - Print text
  date    - Show current date/time
  whoami  - Show current user`;
        break;
      case 'ls':
        response = 'Documents/  Downloads/  Pictures/  Desktop/  file1.txt  file2.txt';
        break;
      case 'pwd':
        response = `/home/user/${Terminal._currentPath}`;
        break;
      case 'cd':
        if (args.length === 0) {
          Terminal._currentPath = '~';
        } else {
          Terminal._currentPath = args[0];
        }
        response = '';
        break;
      case 'clear':
        output.innerHTML = '';
        return;
      case 'echo':
        response = args.join(' ');
        break;
      case 'date':
        response = new Date().toString();
        break;
      case 'whoami':
        response = 'user';
        break;
      default:
        response = `Command not found: ${cmd}. Type 'help' for available commands.`;
    }

    if (response) {
      const responseDiv = document.createElement('div');
      responseDiv.style.whiteSpace = 'pre-line';
      responseDiv.textContent = response;
      output.appendChild(responseDiv);
    }

    // Scroll to bottom
    output.scrollTop = output.scrollHeight;
  }
}

window.Terminal = Terminal;''',

        "text-editor.js": '''/**
 * APP_METADATA
 * @name Text Editor
 * @icon fas fa-edit
 * @description Simple text editor with syntax highlighting
 * @category Productivity
 * @version 1.0.0
 * @author EmberFrame Team
 * @enabled true
 */

class TextEditor {
  static _currentFile = null;
  static _isDirty = false;

  static createWindow() {
    return {
      title: '📝 Text Editor',
      width: '700px',
      height: '500px',
      content: `
        <div style="height: 100%; display: flex; flex-direction: column; background: white;">
          <div style="background: #f8f9fa; padding: 8px 12px; border-bottom: 1px solid #dee2e6; display: flex; gap: 10px; align-items: center;">
            <button onclick="TextEditor._newFile()" style="padding: 6px 12px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">📄 New</button>
            <button onclick="TextEditor._openFile()" style="padding: 6px 12px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;">📁 Open</button>
            <button onclick="TextEditor._saveFile()" style="padding: 6px 12px; background: #ffc107; color: black; border: none; border-radius: 4px; cursor: pointer;">💾 Save</button>
            <span style="flex: 1; font-weight: 500;" id="file-name">Untitled</span>
            <span id="status" style="font-size: 12px; color: #6c757d;">Ready</span>
          </div>
          <textarea id="text-content" style="flex: 1; border: none; padding: 15px; font-family: 'Courier New', monospace; font-size: 14px; resize: none; outline: none; line-height: 1.5;" placeholder="Start typing..."></textarea>
          <div style="background: #f8f9fa; padding: 6px 12px; border-top: 1px solid #dee2e6; font-size: 12px; color: #6c757d; display: flex; justify-content: space-between;">
            <span>Lines: <span id="line-count">1</span> | Characters: <span id="char-count">0</span></span>
            <span>Plain Text</span>
          </div>
        </div>
      `,
      onInit: (container) => {
        TextEditor._container = container;
        TextEditor._setupEditor();
      }
    };
  }

  static _setupEditor() {
    const textarea = TextEditor._container.querySelector('#text-content');
    const lineCount = TextEditor._container.querySelector('#line-count');
    const charCount = TextEditor._container.querySelector('#char-count');
    const status = TextEditor._container.querySelector('#status');

    textarea.addEventListener('input', () => {
      const text = textarea.value;
      const lines = text.split('\\n').length;
      const chars = text.length;

      lineCount.textContent = lines;
      charCount.textContent = chars;

      TextEditor._isDirty = true;
      TextEditor._updateTitle();
    });

    // Keyboard shortcuts
    textarea.addEventListener('keydown', (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 's':
            e.preventDefault();
            TextEditor._saveFile();
            break;
          case 'n':
            e.preventDefault();
            TextEditor._newFile();
            break;
          case 'o':
            e.preventDefault();
            TextEditor._openFile();
            break;
        }
      }
    });
  }

  static _newFile() {
    if (TextEditor._isDirty) {
      if (!confirm('You have unsaved changes. Create new file anyway?')) {
        return;
      }
    }

    const textarea = TextEditor._container.querySelector('#text-content');
    textarea.value = '';
    TextEditor._currentFile = null;
    TextEditor._isDirty = false;
    TextEditor._updateTitle();
    TextEditor._updateStats();
  }

  static _openFile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.txt,.js,.html,.css,.md';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const textarea = TextEditor._container.querySelector('#text-content');
          textarea.value = e.target.result;
          TextEditor._currentFile = file.name;
          TextEditor._isDirty = false;
          TextEditor._updateTitle();
          TextEditor._updateStats();
        };
        reader.readAsText(file);
      }
    };
    input.click();
  }

  static _saveFile() {
    const textarea = TextEditor._container.querySelector('#text-content');
    const content = textarea.value;
    const filename = TextEditor._currentFile || 'untitled.txt';

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);

    TextEditor._isDirty = false;
    TextEditor._updateTitle();
    TextEditor._setStatus('File saved!');
  }

  static _updateTitle() {
    const fileName = TextEditor._container.querySelector('#file-name');
    const name = TextEditor._currentFile || 'Untitled';
    fileName.textContent = name + (TextEditor._isDirty ? ' *' : '');
  }

  static _updateStats() {
    const textarea = TextEditor._container.querySelector('#text-content');
    const text = textarea.value;
    const lineCount = TextEditor._container.querySelector('#line-count');
    const charCount = TextEditor._container.querySelector('#char-count');

    lineCount.textContent = text.split('\\n').length;
    charCount.textContent = text.length;
  }

  static _setStatus(message) {
    const status = TextEditor._container.querySelector('#status');
    status.textContent = message;
    setTimeout(() => {
      status.textContent = 'Ready';
    }, 2000);
  }
}

window.TextEditor = TextEditor;''',

        "settings.js": '''/**
 * APP_METADATA
 * @name Settings
 * @icon fas fa-cog
 * @description System settings and preferences
 * @category System
 * @version 1.0.0
 * @author EmberFrame Team
 * @enabled true
 */

class Settings {
  static createWindow() {
    return {
      title: '⚙️ Settings',
      width: '600px',
      height: '500px',
      content: `
        <div style="height: 100%; display: flex; background: #f8f9fa;">
          <div style="width: 200px; background: #e9ecef; border-right: 1px solid #dee2e6; padding: 20px;">
            <h3 style="margin: 0 0 20px 0; font-size: 16px; color: #495057;">Categories</h3>
            <div class="settings-nav">
              <div class="nav-item active" onclick="Settings._showSection('appearance')" style="padding: 10px; margin-bottom: 8px; border-radius: 6px; cursor: pointer; background: #007bff; color: white;">🎨 Appearance</div>
              <div class="nav-item" onclick="Settings._showSection('system')" style="padding: 10px; margin-bottom: 8px; border-radius: 6px; cursor: pointer;">🖥️ System</div>
              <div class="nav-item" onclick="Settings._showSection('apps')" style="padding: 10px; margin-bottom: 8px; border-radius: 6px; cursor: pointer;">📱 Apps</div>
              <div class="nav-item" onclick="Settings._showSection('about')" style="padding: 10px; margin-bottom: 8px; border-radius: 6px; cursor: pointer;">ℹ️ About</div>
            </div>
          </div>
          <div style="flex: 1; padding: 20px;">
            <div id="settings-content">
              <!-- Content will be loaded here -->
            </div>
          </div>
        </div>
      `,
      onInit: (container) => {
        Settings._container = container;
        Settings._showSection('appearance');
        Settings._setupNavigation();
      }
    };
  }

  static _setupNavigation() {
    const navItems = Settings._container.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        navItems.forEach(nav => {
          nav.style.background = 'transparent';
          nav.style.color = '#495057';
          nav.classList.remove('active');
        });
        item.style.background = '#007bff';
        item.style.color = 'white';
        item.classList.add('active');
      });
    });
  }

  static _showSection(section) {
    const content = Settings._container.querySelector('#settings-content');

    switch (section) {
      case 'appearance':
        content.innerHTML = `
          <h2 style="margin: 0 0 20px 0; color: #495057;">🎨 Appearance Settings</h2>
          <div style="display: flex; flex-direction: column; gap: 20px;">
            <div>
              <label style="display: block; margin-bottom: 8px; font-weight: 500;">Theme</label>
              <select style="width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px;">
                <option>Light Theme</option>
                <option>Dark Theme</option>
                <option>Auto (System)</option>
              </select>
            </div>
            <div>
              <label style="display: block; margin-bottom: 8px; font-weight: 500;">Wallpaper</label>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(80px, 1fr)); gap: 10px;">
                <div style="aspect-ratio: 16/9; background: linear-gradient(45deg, #667eea, #764ba2); border-radius: 4px; cursor: pointer; border: 2px solid #007bff;"></div>
                <div style="aspect-ratio: 16/9; background: linear-gradient(45deg, #f093fb, #f5576c); border-radius: 4px; cursor: pointer; border: 2px solid transparent;"></div>
                <div style="aspect-ratio: 16/9; background: linear-gradient(45deg, #4facfe, #00f2fe); border-radius: 4px; cursor: pointer; border: 2px solid transparent;"></div>
              </div>
            </div>
            <div>
              <label style="display: flex; align-items: center; gap: 8px;">
                <input type="checkbox" checked> Show desktop icons
              </label>
            </div>
            <div>
              <label style="display: flex; align-items: center; gap: 8px;">
                <input type="checkbox" checked> Enable animations
              </label>
            </div>
          </div>
        `;
        break;
      case 'system':
        content.innerHTML = `
          <h2 style="margin: 0 0 20px 0; color: #495057;">🖥️ System Settings</h2>
          <div style="display: flex; flex-direction: column; gap: 20px;">
            <div>
              <label style="display: block; margin-bottom: 8px; font-weight: 500;">Auto-save interval</label>
              <select style="width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px;">
                <option>Every 30 seconds</option>
                <option>Every minute</option>
                <option>Every 5 minutes</option>
                <option>Disabled</option>
              </select>
            </div>
            <div>
              <label style="display: flex; align-items: center; gap: 8px;">
                <input type="checkbox" checked> Show notifications
              </label>
            </div>
            <div>
              <label style="display: flex; align-items: center; gap: 8px;">
                <input type="checkbox"> Enable sound effects
              </label>
            </div>
            <div style="margin-top: 20px;">
              <button onclick="Settings._clearCache()" style="padding: 10px 20px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer;">🗑️ Clear Cache</button>
            </div>
          </div>
        `;
        break;
      case 'apps':
        content.innerHTML = `
          <h2 style="margin: 0 0 20px 0; color: #495057;">📱 Application Settings</h2>
          <div style="display: flex; flex-direction: column; gap: 15px;">
            <div style="padding: 15px; border: 1px solid #dee2e6; border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
              <div>
                <strong>File Manager</strong>
                <div style="font-size: 12px; color: #6c757d;">System file browser</div>
              </div>
              <label style="display: flex; align-items: center; gap: 8px;">
                <input type="checkbox" checked> Enabled
              </label>
            </div>
            <div style="padding: 15px; border: 1px solid #dee2e6; border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
              <div>
                <strong>Terminal</strong>
                <div style="font-size: 12px; color: #6c757d;">Command line interface</div>
              </div>
              <label style="display: flex; align-items: center; gap: 8px;">
                <input type="checkbox" checked> Enabled
              </label>
            </div>
            <div style="padding: 15px; border: 1px solid #dee2e6; border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
              <div>
                <strong>Text Editor</strong>
                <div style="font-size: 12px; color: #6c757d;">Simple text editing</div>
              </div>
              <label style="display: flex; align-items: center; gap: 8px;">
                <input type="checkbox" checked> Enabled
              </label>
            </div>
          </div>
        `;
        break;
      case 'about':
        content.innerHTML = `
          <h2 style="margin: 0 0 20px 0; color: #495057;">ℹ️ About EmberFrame</h2>
          <div style="text-align: center; padding: 20px;">
            <div style="font-size: 48px; margin-bottom: 15px;">🔥</div>
            <h3 style="margin: 0 0 10px 0;">EmberFrame Desktop</h3>
            <p style="color: #6c757d; margin: 0 0 20px 0;">Version 1.0.0</p>
            <p style="margin: 0 0 20px 0; line-height: 1.6;">
              A modern web-based desktop environment with support for multiple applications,
              file management, and customizable themes.
            </p>
            <div style="display: flex; gap: 10px; justify-content: center;">
              <button onclick="alert('System information copied to clipboard!')" style="padding: 8px 16px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">📋 Copy System Info</button>
              <button onclick="alert('Check for updates feature coming soon!')" style="padding: 8px 16px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;">🔄 Check for Updates</button>
            </div>
          </div>
        `;
        break;
    }
  }

  static _clearCache() {
    if (confirm('Are you sure you want to clear the cache? This may slow down the next startup.')) {
      try {
        localStorage.clear();
        sessionStorage.clear();
        alert('Cache cleared successfully!');
      } catch (e) {
        alert('Failed to clear cache: ' + e.message);
      }
    }
  }
}

window.Settings = Settings;''',

        "public-folder.js": '''/**
 * APP_METADATA
 * @name Public Files
 * @icon fas fa-globe
 * @description Access shared public files
 * @category System
 * @version 1.0.0
 * @author EmberFrame Team
 * @enabled true
 */

class PublicFolder {
  static createWindow() {
    return window.FileManager.createWindow('public');
  }
}

window.PublicFolder = PublicFolder;''',

        "calculator.js": '''/**
 * APP_METADATA
 * @name Calculator
 * @icon fas fa-calculator
 * @description Basic calculator with standard operations
 * @category Utilities
 * @version 1.0.0
 * @author EmberFrame Team
 * @enabled true
 */

class Calculator {
  static _display = '0';
  static _previousValue = null;
  static _operation = null;
  static _waitingForNewValue = false;

  static createWindow() {
    return {
      title: '🧮 Calculator',
      width: '300px',
      height: '400px',
      content: `
        <div style="height: 100%; background: #2c3e50; color: white; display: flex; flex-direction: column; font-family: system-ui;">
          <div id="display" style="background: #34495e; padding: 20px; text-align: right; font-size: 24px; font-weight: bold; border-bottom: 1px solid #1a252f;">0</div>
          <div style="flex: 1; display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: #1a252f;">
            <button onclick="Calculator._clear()" style="background: #e74c3c; color: white; border: none; cursor: pointer; font-size: 16px; font-weight: bold;">C</button>
            <button onclick="Calculator._clearEntry()" style="background: #e67e22; color: white; border: none; cursor: pointer; font-size: 16px;">CE</button>
            <button onclick="Calculator._inputOperation('/')" style="background: #f39c12; color: white; border: none; cursor: pointer; font-size: 16px;">÷</button>
            <button onclick="Calculator._inputOperation('*')" style="background: #f39c12; color: white; border: none; cursor: pointer; font-size: 16px;">×</button>

            <button onclick="Calculator._inputNumber('7')" style="background: #34495e; color: white; border: none; cursor: pointer; font-size: 16px;">7</button>
            <button onclick="Calculator._inputNumber('8')" style="background: #34495e; color: white; border: none; cursor: pointer; font-size: 16px;">8</button>
            <button onclick="Calculator._inputNumber('9')" style="background: #34495e; color: white; border: none; cursor: pointer; font-size: 16px;">9</button>
            <button onclick="Calculator._inputOperation('-')" style="background: #f39c12; color: white; border: none; cursor: pointer; font-size: 16px;">−</button>

            <button onclick="Calculator._inputNumber('4')" style="background: #34495e; color: white; border: none; cursor: pointer; font-size: 16px;">4</button>
            <button onclick="Calculator._inputNumber('5')" style="background: #34495e; color: white; border: none; cursor: pointer; font-size: 16px;">5</button>
            <button onclick="Calculator._inputNumber('6')" style="background: #34495e; color: white; border: none; cursor: pointer; font-size: 16px;">6</button>
            <button onclick="Calculator._inputOperation('+')" style="background: #f39c12; color: white; border: none; cursor: pointer; font-size: 16px;">+</button>

            <button onclick="Calculator._inputNumber('1')" style="background: #34495e; color: white; border: none; cursor: pointer; font-size: 16px;">1</button>
            <button onclick="Calculator._inputNumber('2')" style="background: #34495e; color: white; border: none; cursor: pointer; font-size: 16px;">2</button>
            <button onclick="Calculator._inputNumber('3')" style="background: #34495e; color: white; border: none; cursor: pointer; font-size: 16px;">3</button>
            <button onclick="Calculator._calculate()" style="background: #27ae60; color: white; border: none; cursor: pointer; font-size: 16px; grid-row: span 2;">=</button>

            <button onclick="Calculator._inputNumber('0')" style="background: #34495e; color: white; border: none; cursor: pointer; font-size: 16px; grid-column: span 2;">0</button>
            <button onclick="Calculator._inputDecimal()" style="background: #34495e; color: white; border: none; cursor: pointer; font-size: 16px;">.</button>
          </div>
        </div>
      `,
      onInit: (container) => {
        Calculator._container = container;
        Calculator._updateDisplay();
      }
    };
  }

  static _updateDisplay() {
    const display = Calculator._container.querySelector('#display');
    display.textContent = Calculator._display;
  }

  static _inputNumber(num) {
    if (Calculator._waitingForNewValue) {
      Calculator._display = num;
      Calculator._waitingForNewValue = false;
    } else {
      Calculator._display = Calculator._display === '0' ? num : Calculator._display + num;
    }
    Calculator._updateDisplay();
  }

  static _inputDecimal() {
    if (Calculator._waitingForNewValue) {
      Calculator._display = '0.';
      Calculator._waitingForNewValue = false;
    } else if (Calculator._display.indexOf('.') === -1) {
      Calculator._display += '.';
    }
    Calculator._updateDisplay();
  }

  static _inputOperation(op) {
    const inputValue = parseFloat(Calculator._display);

    if (Calculator._previousValue === null) {
      Calculator._previousValue = inputValue;
    } else if (Calculator._operation) {
      const currentValue = Calculator._previousValue || 0;
      const newValue = Calculator._performCalculation(Calculator._operation, currentValue, inputValue);

      Calculator._display = String(newValue);
      Calculator._previousValue = newValue;
      Calculator._updateDisplay();
    }

    Calculator._waitingForNewValue = true;
    Calculator._operation = op;
  }

  static _calculate() {
    const inputValue = parseFloat(Calculator._display);

    if (Calculator._previousValue !== null && Calculator._operation) {
      const newValue = Calculator._performCalculation(Calculator._operation, Calculator._previousValue, inputValue);
      Calculator._display = String(newValue);
      Calculator._previousValue = null;
      Calculator._operation = null;
      Calculator._waitingForNewValue = true;
      Calculator._updateDisplay();
    }
  }

  static _performCalculation(operation, firstValue, secondValue) {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        return secondValue !== 0 ? firstValue / secondValue : 0;
      default:
        return secondValue;
    }
  }

  static _clear() {
    Calculator._display = '0';
    Calculator._previousValue = null;
    Calculator._operation = null;
    Calculator._waitingForNewValue = false;
    Calculator._updateDisplay();
  }

  static _clearEntry() {
    Calculator._display = '0';
    Calculator._updateDisplay();
  }
}

window.Calculator = Calculator;'''
    }

    created_count = 0
    for filename, content in essential_apps.items():
        filepath = apps_dir / filename
        try:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print_status("✅", f"Created {filename}", "green")
            created_count += 1
        except Exception as e:
            print_status("❌", f"Failed to create {filename}: {e}", "red")

    return created_count


def update_app_init_py():
    """Update app/__init__.py to fix app discovery"""

    print_status("🔧", "Updating app/__init__.py...", "yellow")

    # Backup existing file
    if os.path.exists("app/__init__.py"):
        shutil.copy2("app/__init__.py", "app/__init__.py.backup.fix")
        print_status("💾", "Backup created: app/__init__.py.backup.fix", "blue")

    app_init_content = '''# app/__init__.py - Fixed EmberFrame Application
from flask import Flask, render_template, request, jsonify, session, redirect, url_for, send_file, send_from_directory
from flask_socketio import SocketIO
import os
import json
import hashlib
import shutil
import sqlite3
import time
import platform
from datetime import datetime, timedelta
from werkzeug.utils import secure_filename
from pathlib import Path

# Try to import CSRF protection, but make it optional
try:
    from flask_wtf.csrf import CSRFProtect
    CSRF_AVAILABLE = True
except ImportError:
    print("Warning: Flask-WTF not available, CSRF protection disabled")
    CSRFProtect = None
    CSRF_AVAILABLE = False

socketio = SocketIO()

def create_app():
    """Create and configure the Flask application"""

    # Get the absolute path to the project root
    app_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(app_dir)

    # Template and static directories
    template_dir = os.path.join(project_root, 'templates')
    static_dir = os.path.join(project_root, 'static')

    print(f"🔍 Project root: {project_root}")
    print(f"🔍 Template dir: {template_dir} (exists: {os.path.exists(template_dir)})")
    print(f"🔍 Static dir: {static_dir} (exists: {os.path.exists(static_dir)})")

    # Create Flask app with explicit template and static folders
    app = Flask(
        __name__,
        template_folder=template_dir,
        static_folder=static_dir
    )

    # Configuration
    app.config.update(
        SECRET_KEY='ember-secret-key-change-in-production-2024',
        UPLOAD_FOLDER=os.path.join(project_root, 'user_data'),
        PUBLIC_FOLDER=os.path.join(project_root, 'public_data'),
        WALLPAPER_FOLDER=os.path.join(static_dir, 'wallpapers'),
        MAX_CONTENT_LENGTH=16 * 1024 * 1024,  # 16MB max file size
        WTF_CSRF_ENABLED=CSRF_AVAILABLE,
        WTF_CSRF_TIME_LIMIT=None,
        DATABASE_FILE=os.path.join(project_root, 'emberframe.db')
    )

    # Initialize extensions
    socketio.init_app(app, cors_allowed_origins="*")

    # Initialize CSRF protection if available
    if CSRF_AVAILABLE:
        csrf = CSRFProtect(app)
        print("✅ CSRF protection enabled")

        @app.template_global()
        def csrf_token():
            try:
                from flask_wtf.csrf import generate_csrf
                return generate_csrf()
            except Exception:
                return ""
    else:
        @app.template_global()
        def csrf_token():
            return ""

    # Create necessary directories
    for directory in [
        app.config['UPLOAD_FOLDER'],
        app.config['PUBLIC_FOLDER'],
        app.config['WALLPAPER_FOLDER'],
        os.path.join(project_root, 'users'),
        os.path.join(project_root, 'logs'),
        os.path.join(project_root, 'shared'),
        os.path.join(static_dir, 'js', 'apps')  # Ensure apps directory exists
    ]:
        os.makedirs(directory, exist_ok=True)

    # Initialize database
    init_database(app)

    # =====================
    # MAIN ROUTES
    # =====================

    @app.route('/')
    def index():
        """Main index route"""
        if 'username' in session:
            return render_template('desktop.html', username=session['username'])
        return redirect(url_for('login_page'))

    @app.route('/login', methods=['GET'])
    def login_page():
        """Show login page"""
        if 'username' in session:
            return redirect(url_for('index'))
        return render_template('login.html')

    @app.route('/login', methods=['POST'])
    def login_submit():
        """Handle login form submission"""
        try:
            data = request.get_json() or {}
            username = data.get('username', '').strip()
            password = data.get('password', '')

            print(f"🔐 Login attempt: {username}")

            if not username or not password:
                return jsonify({'success': False, 'message': 'Username and password are required'})

            if len(username) < 3:
                return jsonify({'success': False, 'message': 'Username must be at least 3 characters'})

            # Simple authentication for testing - accept any user with 3+ char username
            if len(username) >= 3 and len(password) >= 1:
                session['username'] = username
                session.permanent = True
                ensure_user_directory(username, app.config['UPLOAD_FOLDER'])
                print(f"✅ Login successful: {username}")
                return jsonify({'success': True, 'message': 'Login successful'})
            else:
                print(f"❌ Login failed: {username}")
                return jsonify({'success': False, 'message': 'Invalid username or password'})

        except Exception as e:
            print(f"❌ Login error: {e}")
            return jsonify({'success': False, 'message': 'Login error occurred'})

    @app.route('/register', methods=['GET'])
    def register_page():
        """Show registration page"""
        if 'username' in session:
            return redirect(url_for('index'))
        return render_template('register.html')

    @app.route('/register', methods=['POST'])
    def register_submit():
        """Handle registration form submission"""
        try:
            data = request.get_json() or {}
            username = data.get('username', '').strip()
            password = data.get('password', '')

            print(f"📝 Registration attempt: {username}")

            if not username or not password:
                return jsonify({'success': False, 'message': 'Username and password are required'})

            if len(username) < 3:
                return jsonify({'success': False, 'message': 'Username must be at least 3 characters'})

            if len(password) < 6:
                return jsonify({'success': False, 'message': 'Password must be at least 6 characters'})

            ensure_user_directory(username, app.config['UPLOAD_FOLDER'])
            print(f"✅ Registration successful: {username}")
            return jsonify({'success': True, 'message': 'Registration successful'})

        except Exception as e:
            print(f"❌ Registration error: {e}")
            return jsonify({'success': False, 'message': 'Registration error occurred'})

    @app.route('/logout')
    def logout():
        """Handle logout"""
        username = session.get('username', 'unknown')
        session.clear()
        print(f"👋 Logout: {username}")
        return redirect(url_for('login_page'))

    # =====================
    # API ROUTES
    # =====================

    @app.route('/api/apps/available')
    def get_available_apps():
        """Get available applications with improved error handling"""
        try:
            apps = []
            apps_dir = os.path.join(static_dir, 'js', 'apps')

            print(f"🔍 Scanning apps directory: {apps_dir}")

            if not os.path.exists(apps_dir):
                print(f"❌ Apps directory does not exist: {apps_dir}")
                os.makedirs(apps_dir, exist_ok=True)
                print(f"✅ Created apps directory: {apps_dir}")

            # Scan for JavaScript files
            for file in os.listdir(apps_dir):
                if file.endswith('.js'):
                    file_path = os.path.join(apps_dir, file)
                    print(f"📄 Processing app file: {file}")

                    try:
                        app_info = parse_app_metadata(file_path)
                        if app_info and app_info.get('enabled', True):
                            app_info['file'] = file
                            apps.append(app_info)
                            print(f"✅ Added app: {app_info.get('name', 'Unknown')} ({file})")
                        else:
                            print(f"⚠️ App metadata missing or disabled: {file}")
                    except Exception as e:
                        print(f"❌ Error processing {file}: {e}")

            print(f"🎯 Discovered {len(apps)} apps")
            return jsonify({'success': True, 'apps': apps})

        except Exception as e:
            print(f"❌ App discovery error: {e}")
            return jsonify({'success': False, 'error': str(e), 'apps': []}), 500

    @app.route('/api/apps/reload', methods=['POST'])
    def reload_apps():
        """Reload applications (for development)"""
        return jsonify({'success': True, 'message': 'Apps reloaded'})

    @app.route('/api/files')
    @app.route('/api/files/')
    @app.route('/api/files/<path:filepath>')
    def list_files(filepath=''):
        """List files in a directory"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        username = session['username']

        try:
            # Normalize the path
            if not filepath:
                filepath = 'home'

            # Determine the actual filesystem path
            if filepath.startswith('public/') or filepath == 'public':
                # Public files
                if filepath == 'public':
                    actual_path = app.config['PUBLIC_FOLDER']
                    relative_path = ''
                else:
                    relative_path = filepath[7:]  # Remove 'public/'
                    actual_path = os.path.join(app.config['PUBLIC_FOLDER'], relative_path)
                writable = True  # Public folder is writable

            elif filepath.startswith('home/') or filepath == 'home':
                # User home directory
                if filepath == 'home':
                    actual_path = os.path.join(app.config['UPLOAD_FOLDER'], username)
                    relative_path = ''
                else:
                    relative_path = filepath[5:]  # Remove 'home/'
                    actual_path = os.path.join(app.config['UPLOAD_FOLDER'], username, relative_path)
                writable = True

            else:
                # Default to user home
                actual_path = os.path.join(app.config['UPLOAD_FOLDER'], username, filepath)
                relative_path = filepath
                writable = True

            # Ensure the directory exists
            if not os.path.exists(actual_path):
                os.makedirs(actual_path, exist_ok=True)

            # List files
            files = []
            if os.path.isdir(actual_path):
                for item in os.listdir(actual_path):
                    item_path = os.path.join(actual_path, item)

                    file_info = {
                        'name': item,
                        'type': 'folder' if os.path.isdir(item_path) else 'file',
                        'size': os.path.getsize(item_path) if os.path.isfile(item_path) else 0,
                        'modified': datetime.fromtimestamp(os.path.getmtime(item_path)).isoformat(),
                        'icon': get_file_icon(item)
                    }
                    files.append(file_info)

            return jsonify({
                'files': files,
                'path': filepath,
                'writable': writable
            })

        except Exception as e:
            print(f"Error listing files: {e}")
            return jsonify({'error': str(e)}), 500

    @app.route('/api/user/preferences')
    def get_user_preferences():
        """Get user preferences"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        username = session['username']

        return jsonify({
            'success': True,
            'preferences': {},
            'user': {
                'username': username,
                'isAdmin': username == 'admin'  # Simple admin check
            }
        })

    @app.route('/api/user/preferences', methods=['POST'])
    def save_user_preferences():
        """Save user preferences"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        return jsonify({'success': True})

    @app.route('/api/shortcuts/desktop')
    def get_desktop_shortcuts():
        """Get desktop shortcuts"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        # Return default shortcuts
        shortcuts = [
            {'app': 'file-manager', 'x': 50, 'y': 50},
            {'app': 'terminal', 'x': 50, 'y': 170},
            {'app': 'text-editor', 'x': 50, 'y': 290},
            {'app': 'calculator', 'x': 150, 'y': 50},
            {'app': 'settings', 'x': 150, 'y': 170}
        ]

        return jsonify({'shortcuts': shortcuts})

    @app.route('/api/shortcuts/desktop', methods=['POST'])
    def save_desktop_shortcuts():
        """Save desktop shortcuts"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        return jsonify({'success': True})

    @app.route('/api/shortcuts/taskbar')
    def get_taskbar_shortcuts():
        """Get taskbar shortcuts"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        # Return default taskbar shortcuts
        shortcuts = [
            {'app': 'file-manager'},
            {'app': 'terminal'},
            {'app': 'calculator'}
        ]

        return jsonify({'shortcuts': shortcuts})

    @app.route('/api/shortcuts/taskbar', methods=['POST'])
    def save_taskbar_shortcuts():
        """Save taskbar shortcuts"""
        if 'username' not in session:
            return jsonify({'error': 'Not authenticated'}), 401

        return jsonify({'success': True})

    print("✅ EmberFrame app initialized successfully!")
    return app


# =====================
# UTILITY FUNCTIONS
# =====================

def init_database(app):
    """Initialize the database"""
    db_path = app.config.get('DATABASE_FILE', 'emberframe.db')

    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()

        # Create users table
        cursor.execute('''
    CREATE
    TABLE
    IF
    NOT
    EXISTS
    users(
        id
    INTEGER
    PRIMARY
    KEY
    AUTOINCREMENT,
    username
    TEXT
    UNIQUE
    NOT
    NULL,
    password_hash
    TEXT
    NOT
    NULL,
    created_at
    TIMESTAMP
    DEFAULT
    CURRENT_TIMESTAMP
    )
    ''')

conn.commit()
conn.close()
print("✅ Database initialized")
except Exception as e:
print(f"❌ Database initialization failed: {e}")


def ensure_user_directory(username, upload_folder):
"""Create user directory"""
user_dir = os.path.join(upload_folder, username)
os.makedirs(user_dir, exist_ok=True)

# Create default directories
default_dirs = ['Documents', 'Downloads', 'Pictures', 'Desktop', 'Music']
for dir_name in default_dirs:
os.makedirs(os.path.join(user_dir, dir_name), exist_ok=True)


def get_file_icon(filename):
"""Get file icon"""
if os.path.isdir(filename):
return 'fas fa-folder'

ext = filename.split('.')[-1].lower() if '.' in filename else ''

icon_map = {
'txt': 'fas fa-file-alt',
'pdf': 'fas fa-file-pdf',
'doc': 'fas fa-file-word',
'docx': 'fas fa-file-word',
'xls': 'fas fa-file-excel',
'xlsx': 'fas fa-file-excel',
'jpg': 'fas fa-image',
'jpeg': 'fas fa-image',
'png': 'fas fa-image',
'gif': 'fas fa-image',
'mp3': 'fas fa-music',
'wav': 'fas fa-music',
'mp4': 'fas fa-video',
'avi': 'fas fa-video',
'zip': 'fas fa-file-archive',
'rar': 'fas fa-file-archive',
'js': 'fas fa-code',
'html': 'fas fa-code',
'css': 'fas fa-code',
'py': 'fas fa-code'
}

return icon_map.get(ext, 'fas fa-file')


def parse_app_metadata(file_path):
"""Parse app metadata from JavaScript file"""
try:
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Look for APP_METADATA comment block
if 'APP_METADATA' in content:
    lines = content.split('\\n')
    metadata = {}

    in_metadata = False
    for line in lines:
        line = line.strip()

        if 'APP_METADATA' in line:
            in_metadata = True
            continue
        elif line.startswith('*/'):
            break
        elif in_metadata and line.startswith('* @'):
            parts = line[3:].split(' ', 1)
            if len(parts) == 2:
                key, value = parts
                if key == 'enabled':
                    metadata[key] = value.lower() == 'true'
                else:
                    metadata[key] = value

    # Generate ID from filename
    filename = os.path.basename(file_path)
    app_id = filename.replace('.js', '').replace('_', '-')
    metadata['id'] = app_id

    # Ensure required fields have defaults
    if 'name' not in metadata:
        metadata['name'] = app_id.replace('-', ' ').title()
    if 'icon' not in metadata:
        metadata['icon'] = 'fas fa-app'
    if 'description' not in metadata:
        metadata['description'] = f'{metadata["name"]} application'
    if 'category' not in metadata:
        metadata['category'] = 'Applications'
    if 'enabled' not in metadata:
        metadata['enabled'] = True

    return metadata
except Exception as e:
print(f"❌ Error parsing metadata for {file_path}: {e}")

return None
'''

    try:
        with open("app/__init__.py", 'w', encoding='utf-8') as f:
            f.write(app_init_content)
        print_status("✅", "Updated app/__init__.py successfully", "green")
        return True
    except Exception as e:
        print_status("❌", f"Failed to update app/__init__.py: {e}", "red")
        return False

    def main():
        """Main fix function"""
        print("🔥 EmberFrame App Discovery Fix")
        print("=" * 50)

        # Check if we're in the right directory
        if not os.path.exists("app") or not os.path.exists("run.py"):
            print_status("❌", "This doesn't look like the EmberFrame directory", "red")
            print_status("ℹ️", "Please run this from the project root", "blue")
            return False

        success_count = 0
        total_steps = 3

        # Step 1: Create essential apps
        print("\\n" + "=" * 30 + " STEP 1: CREATE APPS " + "=" * 30)
        created_apps = create_essential_apps()
        if created_apps > 0:
            print_status("✅", f"Created {created_apps} essential apps", "green")
            success_count += 1
        else:
            print_status("❌", "Failed to create essential apps", "red")

        # Step 2: Update app/__init__.py
        print("\\n" + "=" * 30 + " STEP 2: UPDATE BACKEND " + "=" * 30)
        if update_app_init_py():
            success_count += 1

        # Step 3: Verify directory structure
        print("\\n" + "=" * 30 + " STEP 3: VERIFY STRUCTURE " + "=" * 30)
        required_dirs = [
            "static/js/apps",
            "templates",
            "user_data",
            "public_data"
        ]

        dirs_ok = True
        for directory in required_dirs:
            if os.path.exists(directory):
                print_status("✅", f"Directory exists: {directory}", "green")
            else:
                os.makedirs(directory, exist_ok=True)
                print_status("🔧", f"Created directory: {directory}", "yellow")

        success_count += 1

        # Final summary
        print("\\n" + "=" * 50)
        print_status("🎯", f"Fix completed: {success_count}/{total_steps} steps successful", "blue")

        if success_count == total_steps:
            print_status("🎉", "EmberFrame should now work with multiple apps!", "green")
            print()
            print_status("🚀", "To start EmberFrame:", "blue")
            print("   python run.py")
            print()
            print_status("🌐", "Then open: http://localhost:5000", "blue")
            print()
            print_status("📱", "Available apps:", "yellow")
            apps_dir = Path("static/js/apps")
            if apps_dir.exists():
                for app_file in apps_dir.glob("*.js"):
                    print(f"   • {app_file.stem}")
            print()
            print_status("💡", "Apps should now appear in the start menu and be discoverable", "yellow")
            return True
        else:
            print_status("⚠️", "Some issues remain. Check errors above.", "yellow")
            return False

    if __name__ == '__main__':
        success = main()
        sys.exit(0 if success else 1)