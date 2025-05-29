// Settings Application
class Settings {
    static createWindow() {
        return {
            title: 'Settings',
            width: '650px',
            height: '500px',
            content: `
                <div class="settings">
                    <div class="settings-sidebar">
                        <div class="settings-nav">
                            <div class="settings-nav-item active" data-section="appearance">🎨 Appearance</div>
                            <div class="settings-nav-item" data-section="desktop">🖥️ Desktop</div>
                            <div class="settings-nav-item" data-section="system">⚙️ System</div>
                            <div class="settings-nav-item" data-section="about">ℹ️ About</div>
                        </div>
                    </div>
                    <div class="settings-content">
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
                                </select>
                            </div>
                            <div class="setting-group">
                                <label>Desktop Background:</label>
                                <div class="background-options">
                                    <div class="bg-option" data-bg="gradient1" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);"></div>
                                    <div class="bg-option" data-bg="gradient2" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);"></div>
                                    <div class="bg-option" data-bg="gradient3" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);"></div>
                                    <div class="bg-option" data-bg="gradient4" style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);"></div>
                                    <div class="bg-option" data-bg="solid" style="background: #2c3e50;"></div>
                                </div>
                            </div>
                            <div class="setting-group">
                                <label>
                                    <input type="checkbox" id="animations-checkbox" checked onchange="Settings.toggleAnimations(this.checked)">
                                    Enable animations
                                </label>
                            </div>
                        </div>
                        
                        <div class="settings-section" id="desktop-section" style="display: none;">
                            <h2>Desktop</h2>
                            <div class="setting-group">
                                <label>Icon Size:</label>
                                <input type="range" id="icon-size" min="32" max="64" value="48" onchange="Settings.changeIconSize(this.value)">
                                <span id="icon-size-value">48px</span>
                            </div>
                            <div class="setting-group">
                                <label>
                                    <input type="checkbox" id="show-desktop-labels" checked onchange="Settings.toggleDesktopLabels(this.checked)">
                                    Show desktop icon labels
                                </label>
                            </div>
                            <div class="setting-group">
                                <label>Auto-arrange icons:</label>
                                <button onclick="Settings.arrangeIcons()">Arrange Icons</button>
                            </div>
                        </div>
                        
                        <div class="settings-section" id="system-section" style="display: none;">
                            <h2>System</h2>
                            <div class="setting-group">
                                <label>Default Applications:</label>
                                <div class="app-defaults">
                                    <div>Text files: <select><option>Text Editor</option></select></div>
                                    <div>Images: <select><option>Image Viewer</option></select></div>
                                </div>
                            </div>
                            <div class="setting-group">
                                <label>
                                    <input type="checkbox" id="startup-sound" onchange="Settings.toggleStartupSound(this.checked)">
                                    Play startup sound
                                </label>
                            </div>
                            <div class="setting-group">
                                <button onclick="Settings.clearCache()" class="danger-button">Clear Cache</button>
                                <button onclick="Settings.resetSettings()" class="danger-button">Reset All Settings</button>
                            </div>
                        </div>
                        
                        <div class="settings-section" id="about-section" style="display: none;">
                            <h2>About EmberFrame</h2>
                            <div class="about-info">
                                <div class="about-logo">🔥</div>
                                <h3>EmberFrame Desktop Environment</h3>
                                <p><strong>Version:</strong> 1.0.0</p>
                                <p><strong>Build:</strong> ${new Date().toISOString().split('T')[0]}</p>
                                <p><strong>Platform:</strong> Web Browser</p>
                                <p><strong>Memory Usage:</strong> <span id="memory-usage">Loading...</span></p>
                                <div class="about-description">
                                    <p>EmberFrame is a modern web-based desktop environment that brings the familiar desktop experience to your browser.</p>
                                    <p>Built with HTML5, CSS3, and JavaScript.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <style>
                    .settings {
                        display: flex;
                        height: 100%;
                    }
                    .settings-sidebar {
                        width: 200px;
                        background: #f8f9fa;
                        border-right: 1px solid #ddd;
                    }
                    .settings-nav {
                        padding: 20px 0;
                    }
                    .settings-nav-item {
                        padding: 12px 20px;
                        cursor: pointer;
                        transition: background-color 0.2s;
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
                        margin-bottom: 25px;
                        color: #333;
                    }
                    .setting-group {
                        margin-bottom: 20px;
                    }
                    .setting-group label {
                        display: block;
                        margin-bottom: 8px;
                        font-weight: 500;
                    }
                    .setting-group select, .setting-group input[type="range"] {
                        width: 200px;
                        padding: 6px;
                        border: 1px solid #ccc;
                        border-radius: 4px;
                    }
                    .background-options {
                        display: flex;
                        gap: 10px;
                        margin-top: 10px;
                    }
                    .bg-option {
                        width: 60px;
                        height: 40px;
                        border-radius: 8px;
                        cursor: pointer;
                        border: 3px solid transparent;
                        transition: border-color 0.2s;
                    }
                    .bg-option:hover {
                        border-color: #007bff;
                    }
                    .bg-option.active {
                        border-color: #007bff;
                    }
                    .app-defaults > div {
                        margin: 10px 0;
                    }
                    .danger-button {
                        background: #dc3545;
                        color: white;
                        border: 1px solid #dc3545;
                        padding: 8px 16px;
                        border-radius: 4px;
                        cursor: pointer;
                        margin-right: 10px;
                    }
                    .danger-button:hover {
                        background: #c82333;
                    }
                    .about-info {
                        text-align: center;
                    }
                    .about-logo {
                        font-size: 64px;
                        margin-bottom: 20px;
                    }
                    .about-info h3 {
                        margin-bottom: 20px;
                        color: #333;
                    }
                    .about-info p {
                        margin: 8px 0;
                    }
                    .about-description {
                        margin-top: 30px;
                        text-align: left;
                        max-width: 500px;
                        margin-left: auto;
                        margin-right: auto;
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
        this.loadSettings();
        this.setupNavigation();
        this.updateMemoryUsage();

        // Setup background options
        const bgOptions = windowElement.querySelectorAll('.bg-option');
        bgOptions.forEach(option => {
            option.addEventListener('click', () => {
                const bgType = option.dataset.bg;
                this.changeBackground(bgType);
                this.setActiveBgOption(option);
            });
        });
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

    static loadSettings() {
        // Load settings from localStorage or use defaults
        const settings = this.getSettings();

        // Apply theme
        if (settings.theme) {
            this.currentWindow.querySelector('#theme-select').value = settings.theme;
        }

        // Apply icon size
        const iconSize = settings.iconSize || 48;
        this.currentWindow.querySelector('#icon-size').value = iconSize;
        this.currentWindow.querySelector('#icon-size-value').textContent = iconSize + 'px';

        // Apply other settings
        this.currentWindow.querySelector('#animations-checkbox').checked = settings.animations !== false;
        this.currentWindow.querySelector('#show-desktop-labels').checked = settings.showLabels !== false;
        this.currentWindow.querySelector('#startup-sound').checked = settings.startupSound === true;
    }

    static getSettings() {
        return JSON.parse(localStorage.getItem('emberframe-settings') || '{}');
    }

    static saveSettings(newSettings) {
        const settings = this.getSettings();
        Object.assign(settings, newSettings);
        localStorage.setItem('emberframe-settings', JSON.stringify(settings));
    }

    static changeTheme(theme) {
        // Change the desktop theme
        const themes = {
            'default': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'dark': 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
            'light': 'linear-gradient(135deg, #ecf0f1 0%, #bdc3c7 100%)',
            'purple': 'linear-gradient(135deg, #8e44ad 0%, #9b59b6 100%)',
            'green': 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)'
        };

        document.body.style.background = themes[theme] || themes.default;
        this.saveSettings({ theme });
    }

    static changeBackground(bgType) {
        const backgrounds = {
            'gradient1': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'gradient2': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            'gradient3': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            'gradient4': 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            'solid': '#2c3e50'
        };

        document.body.style.background = backgrounds[bgType];
        this.saveSettings({ background: bgType });
    }

    static setActiveBgOption(activeOption) {
        this.currentWindow.querySelectorAll('.bg-option').forEach(option =>
            option.classList.remove('active')
        );
        activeOption.classList.add('active');
    }

    static toggleAnimations(enabled) {
        document.body.style.setProperty('--animation-duration', enabled ? '0.2s' : '0s');
        this.saveSettings({ animations: enabled });
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

    static arrangeIcons() {
        const icons = document.querySelectorAll('.desktop-icon');
        let x = 20, y = 20;
        const spacing = 100;

        icons.forEach((icon, index) => {
            icon.style.left = x + 'px';
            icon.style.top = y + 'px';

            x += spacing;
            if (x > window.innerWidth - 100) {
                x = 20;
                y += spacing;
            }
        });
    }

    static toggleStartupSound(enabled) {
        this.saveSettings({ startupSound: enabled });
    }

    static clearCache() {
        if (confirm('This will clear all cached data. Continue?')) {
            localStorage.clear();
            alert('Cache cleared successfully!');
        }
    }

    static resetSettings() {
        if (confirm('This will reset all settings to default. Continue?')) {
            localStorage.removeItem('emberframe-settings');
            location.reload();
        }
    }

    static updateMemoryUsage() {
        // Simulate memory usage calculation
        if (performance.memory) {
            const used = Math.round(performance.memory.usedJSHeapSize / 1024 / 1024);
            const total = Math.round(performance.memory.totalJSHeapSize / 1024 / 1024);
            this.currentWindow.querySelector('#memory-usage').textContent = `${used} MB / ${total} MB`;
        } else {
            this.currentWindow.querySelector('#memory-usage').textContent = 'Not available';
        }
    }

    static onClose(windowElement) {
        this.currentWindow = null;
    }
}

window.Settings = Settings;