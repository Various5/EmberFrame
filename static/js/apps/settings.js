// Enhanced Settings Application with Wallpaper Management
class Settings {
    static createWindow() {
        return {
            title: 'Settings',
            width: '800px',
            height: '600px',
            autoSize: false,
            content: `
                <div class="settings">
                    <div class="settings-sidebar">
                        <div class="settings-nav">
                            <div class="settings-nav-item active" data-section="appearance">🎨 Appearance</div>
                            <div class="settings-nav-item" data-section="desktop">🖥️ Desktop</div>
                            <div class="settings-nav-item" data-section="system">⚙️ System</div>
                            <div class="settings-nav-item" data-section="account">👤 Account</div>
                            <div class="settings-nav-item" data-section="about">ℹ️ About</div>
                        </div>
                    </div>
                    <div class="settings-content">
                        <!-- Appearance Section -->
                        <div class="settings-section" id="appearance-section">
                            <h2>Appearance</h2>
                            
                            <div class="setting-group">
                                <label>Theme:</label>
                                <select id="theme-select" onchange="Settings.changeTheme(this.value)">
                                    <option value="default">Default Blue</option>
                                    <option value="dark">Dark Mode</option>
                                    <option value="light">Light Mode</option>
                                    <option value="purple">Purple</option>
                                    <option value="green">Green</option>
                                    <option value="orange">Orange</option>
                                </select>
                            </div>
                            
                            <div class="setting-group">
                                <label>Desktop Background:</label>
                                <div class="wallpaper-section">
                                    <div class="wallpaper-controls">
                                        <button onclick="Settings.uploadWallpaper()" class="upload-btn">
                                            📤 Upload Wallpaper
                                        </button>
                                        <button onclick="Settings.loadWallpapers()" class="refresh-btn">
                                            🔄 Refresh
                                        </button>
                                    </div>
                                    
                                    <div class="wallpaper-categories">
                                        <div class="category-tabs">
                                            <button class="tab-btn active" onclick="Settings.showWallpaperCategory('default')">
                                                Default
                                            </button>
                                            <button class="tab-btn" onclick="Settings.showWallpaperCategory('user')">
                                                My Wallpapers
                                            </button>
                                            <button class="tab-btn" onclick="Settings.showWallpaperCategory('gradients')">
                                                Gradients
                                            </button>
                                        </div>
                                        
                                        <div class="wallpaper-grid" id="wallpaper-grid">
                                            <div class="wallpaper-loading">Loading wallpapers...</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="setting-group">
                                <label>
                                    <input type="checkbox" id="animations-checkbox" checked onchange="Settings.toggleAnimations(this.checked)">
                                    Enable animations and transitions
                                </label>
                            </div>
                            
                            <div class="setting-group">
                                <label>Window Transparency:</label>
                                <input type="range" id="transparency-slider" min="0" max="100" value="0" 
                                       onchange="Settings.changeTransparency(this.value)">
                                <span id="transparency-value">0%</span>
                            </div>
                        </div>
                        
                        <!-- Desktop Section -->
                        <div class="settings-section" id="desktop-section" style="display: none;">
                            <h2>Desktop</h2>
                            
                            <div class="setting-group">
                                <label>Icon Size:</label>
                                <input type="range" id="icon-size" min="32" max="80" value="48" 
                                       onchange="Settings.changeIconSize(this.value)">
                                <span id="icon-size-value">48px</span>
                            </div>
                            
                            <div class="setting-group">
                                <label>
                                    <input type="checkbox" id="show-desktop-labels" checked 
                                           onchange="Settings.toggleDesktopLabels(this.checked)">
                                    Show desktop icon labels
                                </label>
                            </div>
                            
                            <div class="setting-group">
                                <label>Desktop Layout:</label>
                                <div class="layout-options">
                                    <button onclick="Settings.arrangeIcons('grid')" class="layout-btn">
                                        📱 Grid Layout
                                    </button>
                                    <button onclick="Settings.arrangeIcons('column')" class="layout-btn">
                                        📋 Column Layout
                                    </button>
                                    <button onclick="Settings.arrangeIcons('free')" class="layout-btn">
                                        🎯 Free Position
                                    </button>
                                </div>
                            </div>
                            
                            <div class="setting-group">
                                <label>Taskbar Position:</label>
                                <select id="taskbar-position" onchange="Settings.changeTaskbarPosition(this.value)">
                                    <option value="bottom">Bottom</option>
                                    <option value="top">Top</option>
                                    <option value="left">Left</option>
                                    <option value="right">Right</option>
                                </select>
                            </div>
                        </div>
                        
                        <!-- System Section -->
                        <div class="settings-section" id="system-section" style="display: none;">
                            <h2>System</h2>
                            
                            <div class="setting-group">
                                <label>Default Applications:</label>
                                <div class="app-defaults">
                                    <div class="default-app-row">
                                        <span>Text files (.txt, .md):</span>
                                        <select>
                                            <option>Text Editor</option>
                                            <option>External Editor</option>
                                        </select>
                                    </div>
                                    <div class="default-app-row">
                                        <span>Image files (.jpg, .png):</span>
                                        <select>
                                            <option>Image Viewer</option>
                                            <option>External Viewer</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="setting-group">
                                <label>Startup Options:</label>
                                <div class="startup-options">
                                    <label>
                                        <input type="checkbox" id="startup-sound" onchange="Settings.toggleStartupSound(this.checked)">
                                        Play startup sound
                                    </label>
                                    <label>
                                        <input type="checkbox" id="auto-login" onchange="Settings.toggleAutoLogin(this.checked)">
                                        Remember login (auto-login)
                                    </label>
                                    <label>
                                        <input type="checkbox" id="restore-windows" onchange="Settings.toggleRestoreWindows(this.checked)">
                                        Restore previous session windows
                                    </label>
                                </div>
                            </div>
                            
                            <div class="setting-group">
                                <label>Privacy & Security:</label>
                                <div class="privacy-options">
                                    <button onclick="Settings.clearCache()" class="danger-button">
                                        🗑️ Clear Cache & Temporary Files
                                    </button>
                                    <button onclick="Settings.clearHistory()" class="danger-button">
                                        📜 Clear Command History
                                    </button>
                                    <button onclick="Settings.exportData()" class="info-button">
                                        📦 Export User Data
                                    </button>
                                </div>
                            </div>
                            
                            <div class="setting-group">
                                <label>System Actions:</label>
                                <div class="system-actions">
                                    <button onclick="Settings.resetSettings()" class="danger-button">
                                        ⚠️ Reset All Settings
                                    </button>
                                    <button onclick="Settings.restartSystem()" class="warning-button">
                                        🔄 Restart EmberFrame
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Account Section -->
                        <div class="settings-section" id="account-section" style="display: none;">
                            <h2>Account Settings</h2>
                            
                            <div class="setting-group">
                                <label>Profile Information:</label>
                                <div class="profile-info">
                                    <div class="profile-avatar">
                                        <div class="avatar-circle">👤</div>
                                        <button onclick="Settings.changeAvatar()">Change Avatar</button>
                                    </div>
                                    <div class="profile-details">
                                        <div class="detail-row">
                                            <label>Username:</label>
                                            <span id="current-username">Loading...</span>
                                        </div>
                                        <div class="detail-row">
                                            <label>Account Created:</label>
                                            <span id="account-created">Loading...</span>
                                        </div>
                                        <div class="detail-row">
                                            <label>Last Login:</label>
                                            <span id="last-login">Now</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="setting-group">
                                <label>Storage Usage:</label>
                                <div class="storage-info">
                                    <div class="storage-bar">
                                        <div class="storage-used" id="storage-used-bar" style="width: 25%"></div>
                                    </div>
                                    <div class="storage-details">
                                        <span id="storage-used">0 MB</span> of <span id="storage-total">100 MB</span> used
                                    </div>
                                </div>
                            </div>
                            
                            <div class="setting-group">
                                <label>Security:</label>
                                <div class="security-options">
                                    <button onclick="Settings.changePassword()" class="primary-button">
                                        🔐 Change Password
                                    </button>
                                    <button onclick="Settings.enableTwoFactor()" class="info-button">
                                        🔒 Enable Two-Factor Auth
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <!-- About Section -->
                        <div class="settings-section" id="about-section" style="display: none;">
                            <h2>About EmberFrame</h2>
                            <div class="about-info">
                                <div class="about-logo">🔥</div>
                                <h3>EmberFrame Desktop Environment</h3>
                                <p><strong>Version:</strong> 1.0.0</p>
                                <p><strong>Build:</strong> ${new Date().toISOString().split('T')[0]}</p>
                                <p><strong>Platform:</strong> Web Browser</p>
                                <p><strong>Engine:</strong> JavaScript/HTML5</p>
                                <p><strong>Memory Usage:</strong> <span id="memory-usage">Loading...</span></p>
                                <p><strong>Uptime:</strong> <span id="system-uptime">0:00:00</span></p>
                                
                                <div class="about-description">
                                    <p>EmberFrame is a modern web-based desktop environment that brings the familiar desktop experience to your browser with real file system integration, user management, and a complete suite of applications.</p>
                                    
                                    <h4>Features:</h4>
                                    <ul>
                                        <li>Real file system with user directories</li>
                                        <li>Multi-user support with authentication</li>
                                        <li>Draggable and resizable windows</li>
                                        <li>Terminal with real command execution</li>
                                        <li>Text editor with syntax highlighting</li>
                                        <li>File manager with drag & drop</li>
                                        <li>Customizable themes and wallpapers</li>
                                        <li>Notification system</li>
                                    </ul>
                                    
                                    <h4>Technical Stack:</h4>
                                    <ul>
                                        <li>Frontend: HTML5, CSS3, JavaScript</li>
                                        <li>Backend: Python Flask</li>
                                        <li>WebSocket: Flask-SocketIO</li>
                                        <li>Storage: File system + JSON</li>
                                    </ul>
                                </div>
                                
                                <div class="about-links">
                                    <button onclick="Settings.showLicense()" class="info-button">
                                        📄 License Information
                                    </button>
                                    <button onclick="Settings.checkUpdates()" class="primary-button">
                                        🔄 Check for Updates
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Hidden file input for wallpaper upload -->
                <input type="file" id="wallpaper-upload-input" accept="image/*" style="display: none;" multiple>
                
                <style>
                    .settings {
                        display: flex;
                        height: 100%;
                        background: #fff;
                    }
                    .settings-sidebar {
                        width: 200px;
                        background: #f8f9fa;
                        border-right: 1px solid #dee2e6;
                        overflow-y: auto;
                    }
                    .settings-nav {
                        padding: 20px 0;
                    }
                    .settings-nav-item {
                        padding: 12px 20px;
                        cursor: pointer;
                        transition: background-color 0.2s;
                        font-size: 14px;
                        display: flex;
                        align-items: center;
                        gap: 8px;
                    }
                    .settings-nav-item:hover {
                        background: #e9ecef;
                    }
                    .settings-nav-item.active {
                        background: #007bff;
                        color: white;
                    }
                    .settings-content {
                        flex: 1;
                        padding: 30px;
                        overflow-y: auto;
                    }
                    .settings-section h2 {
                        margin-bottom: 30px;
                        color: #333;
                        font-size: 24px;
                        border-bottom: 2px solid #007bff;
                        padding-bottom: 10px;
                    }
                    .setting-group {
                        margin-bottom: 25px;
                        padding: 20px;
                        background: #f8f9fa;
                        border-radius: 8px;
                        border: 1px solid #e9ecef;
                    }
                    .setting-group label {
                        display: block;
                        margin-bottom: 10px;
                        font-weight: 600;
                        color: #495057;
                    }
                    .setting-group select, .setting-group input[type="range"] {
                        width: 200px;
                        padding: 8px;
                        border: 1px solid #ced4da;
                        border-radius: 4px;
                        font-size: 14px;
                    }
                    
                    /* Wallpaper section */
                    .wallpaper-section {
                        margin-top: 15px;
                    }
                    .wallpaper-controls {
                        display: flex;
                        gap: 10px;
                        margin-bottom: 20px;
                    }
                    .upload-btn, .refresh-btn {
                        padding: 10px 16px;
                        border: 1px solid #007bff;
                        background: #007bff;
                        color: white;
                        border-radius: 6px;
                        cursor: pointer;
                        font-size: 13px;
                        transition: background-color 0.2s;
                    }
                    .upload-btn:hover, .refresh-btn:hover {
                        background: #0056b3;
                    }
                    .refresh-btn {
                        background: #6c757d;
                        border-color: #6c757d;
                    }
                    .refresh-btn:hover {
                        background: #545b62;
                    }
                    .category-tabs {
                        display: flex;
                        gap: 2px;
                        margin-bottom: 15px;
                        border-bottom: 1px solid #dee2e6;
                    }
                    .tab-btn {
                        padding: 10px 20px;
                        border: none;
                        background: transparent;
                        cursor: pointer;
                        border-bottom: 3px solid transparent;
                        font-size: 14px;
                        transition: all 0.2s;
                    }
                    .tab-btn.active {
                        color: #007bff;
                        border-bottom-color: #007bff;
                        background: rgba(0, 123, 255, 0.05);
                    }
                    .tab-btn:hover {
                        background: rgba(0, 123, 255, 0.05);
                    }
                    .wallpaper-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
                        gap: 15px;
                        max-height: 300px;
                        overflow-y: auto;
                        padding: 15px;
                        border: 1px solid #e9ecef;
                        border-radius: 6px;
                        background: white;
                    }
                    .wallpaper-item {
                        position: relative;
                        cursor: pointer;
                        border-radius: 8px;
                        overflow: hidden;
                        aspect-ratio: 16/10;
                        border: 3px solid transparent;
                        transition: all 0.2s;
                    }
                    .wallpaper-item:hover {
                        transform: scale(1.05);
                        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    }
                    .wallpaper-item.active {
                        border-color: #007bff;
                        box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
                    }
                    .wallpaper-preview {
                        width: 100%;
                        height: 100%;
                        background-size: cover;
                        background-position: center;
                        position: relative;
                    }
                    .wallpaper-gradient {
                        width: 100%;
                        height: 100%;
                    }
                    .wallpaper-name {
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        background: rgba(0,0,0,0.7);
                        color: white;
                        padding: 4px 8px;
                        font-size: 11px;
                        text-align: center;
                    }
                    .wallpaper-loading {
                        grid-column: 1/-1;
                        text-align: center;
                        padding: 40px;
                        color: #6c757d;
                    }
                    
                    /* Layout options */
                    .layout-options {
                        display: flex;
                        gap: 10px;
                        flex-wrap: wrap;
                    }
                    .layout-btn {
                        padding: 12px 16px;
                        border: 1px solid #dee2e6;
                        background: white;
                        border-radius: 6px;
                        cursor: pointer;
                        font-size: 13px;
                        transition: all 0.2s;
                    }
                    .layout-btn:hover {
                        background: #f8f9fa;
                        border-color: #007bff;
                    }
                    
                    /* App defaults */
                    .app-defaults {
                        display: flex;
                        flex-direction: column;
                        gap: 15px;
                    }
                    .default-app-row {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 10px 15px;
                        background: white;
                        border-radius: 6px;
                        border: 1px solid #e9ecef;
                    }
                    .default-app-row span {
                        font-weight: 500;
                    }
                    .default-app-row select {
                        width: auto;
                        min-width: 140px;
                    }
                    
                    /* Profile section */
                    .profile-info {
                        display: flex;
                        gap: 20px;
                        align-items: flex-start;
                    }
                    .profile-avatar {
                        text-align: center;
                    }
                    .avatar-circle {
                        width: 80px;
                        height: 80px;
                        border-radius: 50%;
                        background: #007bff;
                        color: white;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 32px;
                        margin-bottom: 10px;
                    }
                    .profile-details {
                        flex: 1;
                    }
                    .detail-row {
                        display: flex;
                        justify-content: space-between;
                        padding: 8px 0;
                        border-bottom: 1px solid #e9ecef;
                    }
                    .detail-row:last-child {
                        border-bottom: none;
                    }
                    
                    /* Storage info */
                    .storage-info {
                        margin-top: 10px;
                    }
                    .storage-bar {
                        width: 100%;
                        height: 20px;
                        background: #e9ecef;
                        border-radius: 10px;
                        overflow: hidden;
                        margin-bottom: 8px;
                    }
                    .storage-used {
                        height: 100%;
                        background: linear-gradient(90deg, #28a745, #20c997);
                        transition: width 0.3s ease;
                    }
                    .storage-details {
                        font-size: 13px;
                        color: #6c757d;
                    }
                    
                    /* Button styles */
                    .danger-button {
                        background: #dc3545;
                        color: white;
                        border: 1px solid #dc3545;
                        padding: 10px 16px;
                        border-radius: 6px;
                        cursor: pointer;
                        margin: 5px;
                        font-size: 13px;
                        transition: background-color 0.2s;
                    }
                    .danger-button:hover {
                        background: #c82333;
                    }
                    .warning-button {
                        background: #ffc107;
                        color: #212529;
                        border: 1px solid #ffc107;
                        padding: 10px 16px;
                        border-radius: 6px;
                        cursor: pointer;
                        margin: 5px;
                        font-size: 13px;
                    }
                    .info-button {
                        background: #17a2b8;
                        color: white;
                        border: 1px solid #17a2b8;
                        padding: 10px 16px;
                        border-radius: 6px;
                        cursor: pointer;
                        margin: 5px;
                        font-size: 13px;
                    }
                    .primary-button {
                        background: #007bff;
                        color: white;
                        border: 1px solid #007bff;
                        padding: 10px 16px;
                        border-radius: 6px;
                        cursor: pointer;
                        margin: 5px;
                        font-size: 13px;
                    }
                    
                    /* Option groups */
                    .startup-options, .privacy-options, .system-actions, .security-options {
                        display: flex;
                        flex-direction: column;
                        gap: 10px;
                        margin-top: 10px;
                    }
                    .startup-options label {
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        font-weight: normal;
                        margin-bottom: 0;
                    }
                    
                    /* About section */
                    .about-info {
                        text-align: center;
                        max-width: 600px;
                        margin: 0 auto;
                    }
                    .about-logo {
                        font-size: 72px;
                        margin-bottom: 20px;
                    }
                    .about-info h3 {
                        margin-bottom: 20px;
                        color: #333;
                        font-size: 28px;
                    }
                    .about-info p {
                        margin: 8px 0;
                        font-size: 14px;
                    }
                    .about-description {
                        margin-top: 30px;
                        text-align: left;
                        background: #f8f9fa;
                        padding: 20px;
                        border-radius: 8px;
                        border: 1px solid #e9ecef;
                    }
                    .about-description h4 {
                        margin: 20px 0 10px 0;
                        color: #495057;
                    }
                    .about-description ul {
                        margin-left: 20px;
                        margin-bottom: 15px;
                    }
                    .about-description li {
                        margin: 5px 0;
                        font-size: 13px;
                    }
                    .about-links {
                        margin-top: 30px;
                        display: flex;
                        justify-content: center;
                        gap: 15px;
                    }
                </style>
            `,
            onInit: (windowElement) => {
                Settings.init(windowElement);
            }
        };
    }

    static init(windowElement) {
        this.currentWindow = windowElement;
        this.currentWallpapers = [];
        this.currentCategory = 'default';
        this.startTime = Date.now();

        this.loadSettings();
        this.setupNavigation();
        this.setupWallpaperUpload();
        this.loadWallpapers();
        this.updateMemoryUsage();
        this.updateUptime();
        this.loadAccountInfo();

        // Update uptime every second
        this.uptimeInterval = setInterval(() => this.updateUptime(), 1000);
    }

    static setupNavigation() {
        const navItems = this.currentWindow.querySelectorAll('.settings-nav-item');
        const sections = this.currentWindow.querySelectorAll('.settings-section');

        navItems.forEach(item => {
            item.addEventListener('click', () => {
                // Update nav
                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');

                // Show section
                const sectionId = item.dataset.section + '-section';
                sections.forEach(section => section.style.display = 'none');
                this.currentWindow.querySelector('#' + sectionId).style.display = 'block';
            });
        });
    }

    static setupWallpaperUpload() {
        const uploadInput = this.currentWindow.querySelector('#wallpaper-upload-input');

        uploadInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                this.handleWallpaperUpload(e.target.files);
            }
        });
    }

    static loadSettings() {
        const settings = this.getSettings();

        // Apply saved settings
        if (settings.theme) {
            this.currentWindow.querySelector('#theme-select').value = settings.theme;
        }

        const iconSize = settings.iconSize || 48;
        this.currentWindow.querySelector('#icon-size').value = iconSize;
        this.currentWindow.querySelector('#icon-size-value').textContent = iconSize + 'px';

        const transparency = settings.transparency || 0;
        this.currentWindow.querySelector('#transparency-slider').value = transparency;
        this.currentWindow.querySelector('#transparency-value').textContent = transparency + '%';

        // Apply other settings
        this.currentWindow.querySelector('#animations-checkbox').checked = settings.animations !== false;
        this.currentWindow.querySelector('#show-desktop-labels').checked = settings.showLabels !== false;
        this.currentWindow.querySelector('#startup-sound').checked = settings.startupSound === true;
        this.currentWindow.querySelector('#auto-login').checked = settings.autoLogin === true;
        this.currentWindow.querySelector('#restore-windows').checked = settings.restoreWindows === true;

        if (settings.taskbarPosition) {
            this.currentWindow.querySelector('#taskbar-position').value = settings.taskbarPosition;
        }
    }

    static getSettings() {
        try {
            return JSON.parse(localStorage.getItem('emberframe-settings') || '{}');
        } catch {
            return {};
        }
    }

    static async saveSettings(newSettings) {
        // Update local preferences
        const settings = this.getSettings();
        Object.assign(settings, newSettings);

        // Save to localStorage for immediate use
        localStorage.setItem('emberframe-settings', JSON.stringify(settings));

        // Save to backend
        try {
            const response = await fetch('/api/user/preferences', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ settings: settings })
            });

            if (!response.ok) {
                throw new Error('Failed to save settings to server');
            }
        } catch (error) {
            console.error('Failed to save settings to backend:', error);
            // Still works with localStorage
        }
    }

    // Wallpaper management
    static async loadWallpapers() {
        const grid = this.currentWindow.querySelector('#wallpaper-grid');
        grid.innerHTML = '<div class="wallpaper-loading">Loading wallpapers...</div>';

        try {
            const response = await fetch('/api/wallpapers');
            const data = await response.json();

            if (response.ok) {
                this.currentWallpapers = data.wallpapers;
                this.showWallpaperCategory(this.currentCategory);
            } else {
                grid.innerHTML = '<div class="wallpaper-loading">Failed to load wallpapers</div>';
            }
        } catch (error) {
            grid.innerHTML = '<div class="wallpaper-loading">Network error loading wallpapers</div>';
        }
    }

    static showWallpaperCategory(category) {
        this.currentCategory = category;

        // Update tab buttons
        this.currentWindow.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        this.currentWindow.querySelector(`[onclick*="${category}"]`).classList.add('active');

        // Filter wallpapers
        let wallpapers = this.currentWallpapers;

        if (category === 'gradients') {
            wallpapers = this.getGradientWallpapers();
        } else {
            wallpapers = wallpapers.filter(w => w.type === category);
        }

        this.renderWallpapers(wallpapers);
    }

    static getGradientWallpapers() {
        return [
            { name: 'Blue Gradient', type: 'gradient', style: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
            { name: 'Pink Gradient', type: 'gradient', style: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
            { name: 'Cyan Gradient', type: 'gradient', style: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
            { name: 'Green Gradient', type: 'gradient', style: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
            { name: 'Orange Gradient', type: 'gradient', style: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
            { name: 'Purple Gradient', type: 'gradient', style: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' },
            { name: 'Dark Gradient', type: 'gradient', style: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)' },
            { name: 'Sunset', type: 'gradient', style: 'linear-gradient(135deg, #ff9a56 0%, #ff6b6b 100%)' }
        ];
    }

    static renderWallpapers(wallpapers) {
        const grid = this.currentWindow.querySelector('#wallpaper-grid');

        if (wallpapers.length === 0) {
            grid.innerHTML = '<div class="wallpaper-loading">No wallpapers found</div>';
            return;
        }

        grid.innerHTML = wallpapers.map((wallpaper, index) => {
            if (wallpaper.type === 'gradient') {
                return `
                    <div class="wallpaper-item" onclick="Settings.setWallpaper('${wallpaper.style}', 'gradient')" data-wallpaper="gradient-${index}">
                        <div class="wallpaper-gradient" style="background: ${wallpaper.style}"></div>
                        <div class="wallpaper-name">${wallpaper.name}</div>
                    </div>
                `;
            } else {
                return `
                    <div class="wallpaper-item" onclick="Settings.setWallpaper('${wallpaper.url}', 'image')" data-wallpaper="${wallpaper.url}">
                        <div class="wallpaper-preview" style="background-image: url('${wallpaper.url}')"></div>
                        <div class="wallpaper-name">${wallpaper.name}</div>
                    </div>
                `;
            }
        }).join('');
    }

    static uploadWallpaper() {
        const uploadInput = this.currentWindow.querySelector('#wallpaper-upload-input');
        uploadInput.click();
    }

    static async handleWallpaperUpload(files) {
        const validFiles = Array.from(files).filter(file =>
            file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024
        );

        if (validFiles.length === 0) {
            Notification.error('Please select valid image files (max 5MB each)');
            return;
        }

        const uploadId = Notification.loading(`Uploading ${validFiles.length} wallpaper(s)...`);

        try {
            const uploadPromises = validFiles.map(file => this.uploadSingleWallpaper(file));
            await Promise.all(uploadPromises);

            Notification.update(uploadId, `${validFiles.length} wallpaper(s) uploaded successfully!`, 'success');
            setTimeout(() => Notification.close(uploadId), 3000);

            // Reload wallpapers and switch to user category
            await this.loadWallpapers();
            this.showWallpaperCategory('user');

        } catch (error) {
            Notification.update(uploadId, 'Some wallpapers failed to upload', 'error');
            setTimeout(() => Notification.close(uploadId), 4000);
        }
    }

    static async uploadSingleWallpaper(file) {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload-wallpaper', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Failed to upload ${file.name}`);
        }
    }

    static async setWallpaper(source, type) {
        // Apply wallpaper immediately
        if (type === 'gradient') {
            document.body.style.background = source;
        } else {
            document.body.style.background = `url('${source}') center/cover`;
        }

        // Update active wallpaper UI
        this.currentWindow.querySelectorAll('.wallpaper-item').forEach(item => {
            item.classList.remove('active');
        });

        const selectedItem = this.currentWindow.querySelector(`[data-wallpaper="${source}"]`) ||
                            this.currentWindow.querySelector(`[onclick*="${source.replace(/'/g, "\\\\'")}"]`);
        if (selectedItem) {
            selectedItem.classList.add('active');
        }

        // Save to backend via WindowManager
        if (window.WindowManager) {
            await window.WindowManager.saveWallpaper(source, type);
        }

        // Also save to local preferences
        this.saveSettings({ wallpaper: source, wallpaperType: type });

        Notification.success('Wallpaper changed successfully');
    }

    // Other settings methods
    static changeTheme(theme) {
        const themes = {
            'default': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'dark': 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
            'light': 'linear-gradient(135deg, #ecf0f1 0%, #bdc3c7 100%)',
            'purple': 'linear-gradient(135deg, #8e44ad 0%, #9b59b6 100%)',
            'green': 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)',
            'orange': 'linear-gradient(135deg, #e67e22 0%, #f39c12 100%)'
        };

        document.body.style.background = themes[theme] || themes.default;
        this.saveSettings({ theme });
        Notification.success('Theme changed');
    }

    static toggleAnimations(enabled) {
        document.documentElement.style.setProperty('--animation-duration', enabled ? '0.3s' : '0s');
        this.saveSettings({ animations: enabled });
    }

    static changeTransparency(value) {
        const transparency = parseInt(value);
        this.currentWindow.querySelector('#transparency-value').textContent = transparency + '%';

        // Apply transparency to windows
        document.querySelectorAll('.window').forEach(window => {
            window.style.opacity = (100 - transparency) / 100;
        });

        this.saveSettings({ transparency });
    }

    static changeIconSize(size) {
        const icons = document.querySelectorAll('.icon-image');
        icons.forEach(icon => {
            icon.style.width = size + 'px';
            icon.style.height = size + 'px';
        });

        this.currentWindow.querySelector('#icon-size-value').textContent = size + 'px';
        this.saveSettings({ iconSize: parseInt(size) });
    }

    static toggleDesktopLabels(show) {
        const labels = document.querySelectorAll('.icon-label');
        labels.forEach(label => {
            label.style.display = show ? 'block' : 'none';
        });
        this.saveSettings({ showLabels: show });
    }

    static arrangeIcons(layout) {
        const icons = document.querySelectorAll('.desktop-icon');
        let x = 20, y = 20;
        const spacing = 100;

        icons.forEach((icon, index) => {
            switch (layout) {
                case 'grid':
                    icon.style.left = x + 'px';
                    icon.style.top = y + 'px';
                    x += spacing;
                    if (x > window.innerWidth - 100) {
                        x = 20;
                        y += spacing;
                    }
                    break;
                case 'column':
                    icon.style.left = '20px';
                    icon.style.top = y + 'px';
                    y += spacing;
                    break;
                case 'free':
                    // Don't change positions
                    break;
            }
        });

        Notification.success(`Icons arranged in ${layout} layout`);
    }

    static changeTaskbarPosition(position) {
        // This would require more complex CSS changes
        Notification.info('Taskbar repositioning coming in future update');
        this.saveSettings({ taskbarPosition: position });
    }

    static toggleStartupSound(enabled) {
        this.saveSettings({ startupSound: enabled });
    }

    static toggleAutoLogin(enabled) {
        this.saveSettings({ autoLogin: enabled });
    }

    static toggleRestoreWindows(enabled) {
        this.saveSettings({ restoreWindows: enabled });
    }

    static clearCache() {
        if (confirm('This will clear all cached data. Continue?')) {
            localStorage.clear();
            sessionStorage.clear();
            Notification.success('Cache cleared successfully');
        }
    }

    static clearHistory() {
        if (confirm('Clear all command history?')) {
            // Would clear terminal history
            Notification.success('Command history cleared');
        }
    }

    static exportData() {
        const settings = this.getSettings();
        const data = {
            settings: settings,
            exported: new Date().toISOString(),
            version: '1.0.0'
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'emberframe-settings.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        Notification.success('Settings exported to downloads');
    }

    static resetSettings() {
        if (confirm('This will reset all settings to default. Continue?')) {
            localStorage.removeItem('emberframe-settings');
            Notification.success('Settings reset to default');
            setTimeout(() => location.reload(), 1000);
        }
    }

    static restartSystem() {
        if (confirm('Restart EmberFrame? This will close all windows.')) {
            location.reload();
        }
    }

    static async loadAccountInfo() {
        // In a real implementation, this would fetch from server
        this.currentWindow.querySelector('#current-username').textContent =
            document.querySelector('.username')?.textContent || 'user';
        this.currentWindow.querySelector('#account-created').textContent = 'January, 2025';

        // Simulate storage usage
        const usedMB = Math.floor(Math.random() * 25) + 5;
        const totalMB = 100;
        const percentage = (usedMB / totalMB) * 100;

        this.currentWindow.querySelector('#storage-used').textContent = usedMB + ' MB';
        this.currentWindow.querySelector('#storage-total').textContent = totalMB + ' MB';
        this.currentWindow.querySelector('#storage-used-bar').style.width = percentage + '%';
    }

    static changeAvatar() {
        Notification.info('Avatar customization coming soon');
    }

    static changePassword() {
        const newPassword = prompt('Enter new password:');
        if (newPassword && newPassword.length >= 6) {
            Notification.success('Password changed successfully');
        } else if (newPassword) {
            Notification.error('Password must be at least 6 characters');
        }
    }

    static enableTwoFactor() {
        Notification.info('Two-factor authentication setup coming soon');
    }

    static updateMemoryUsage() {
        if (performance.memory) {
            const used = Math.round(performance.memory.usedJSHeapSize / 1024 / 1024);
            const total = Math.round(performance.memory.totalJSHeapSize / 1024 / 1024);
            this.currentWindow.querySelector('#memory-usage').textContent = `${used} MB / ${total} MB`;
        } else {
            this.currentWindow.querySelector('#memory-usage').textContent = 'Not available';
        }
    }

    static updateUptime() {
        const uptime = Date.now() - this.startTime;
        const hours = Math.floor(uptime / (1000 * 60 * 60));
        const minutes = Math.floor((uptime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((uptime % (1000 * 60)) / 1000);

        const uptimeString = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        this.currentWindow.querySelector('#system-uptime').textContent = uptimeString;
    }

    static showLicense() {
        Notification.info('License: MIT License - Free for personal and commercial use');
    }

    static checkUpdates() {
        const updateId = Notification.loading('Checking for updates...');
        setTimeout(() => {
            Notification.update(updateId, 'You have the latest version!', 'success');
            setTimeout(() => Notification.close(updateId), 3000);
        }, 2000);
    }

    static onClose(windowElement) {
        if (this.uptimeInterval) {
            clearInterval(this.uptimeInterval);
        }
        this.currentWindow = null;
        return true;
    }
}

window.Settings = Settings;