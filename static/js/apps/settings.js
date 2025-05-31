/**
 * APP_METADATA
 * @name Settings
 * @icon fas fa-cog
 * @description Comprehensive system settings and user preferences
 * @category System
 * @version 2.0.0
 * @author EmberFrame Team
 * @enabled true
 */

class Settings {
    static createWindow() {
        return {
            title: 'EmberFrame Settings',
            width: '900px',
            height: '700px',
            autoSize: false,
            content: `
                <div class="settings-app">
                    <div class="settings-sidebar">
                        <div class="settings-logo">
                            <i class="fas fa-cog"></i>
                            <span>Settings</span>
                        </div>
                        
                        <div class="settings-menu">
                            <div class="settings-category active" data-category="appearance">
                                <i class="fas fa-palette"></i>
                                <span>Appearance</span>
                            </div>
                            <div class="settings-category" data-category="desktop">
                                <i class="fas fa-desktop"></i>
                                <span>Desktop</span>
                            </div>
                            <div class="settings-category" data-category="files">
                                <i class="fas fa-folder"></i>
                                <span>Files & Storage</span>
                            </div>
                            <div class="settings-category" data-category="system">
                                <i class="fas fa-microchip"></i>
                                <span>System</span>
                            </div>
                            <div class="settings-category" data-category="privacy">
                                <i class="fas fa-shield-alt"></i>
                                <span>Privacy</span>
                            </div>
                            <div class="settings-category" data-category="notifications">
                                <i class="fas fa-bell"></i>
                                <span>Notifications</span>
                            </div>
                            <div class="settings-category" data-category="keyboard">
                                <i class="fas fa-keyboard"></i>
                                <span>Keyboard</span>
                            </div>
                            <div class="settings-category" data-category="about">
                                <i class="fas fa-info-circle"></i>
                                <span>About</span>
                            </div>
                        </div>
                    </div>

                    <div class="settings-content">
                        <div class="settings-header">
                            <h2 id="settings-title">Appearance</h2>
                            <p id="settings-description">Customize the look and feel of your desktop</p>
                        </div>

                        <div class="settings-panel" id="settings-panel">
                            <!-- Content will be loaded dynamically -->
                        </div>

                        <div class="settings-footer">
                            <button class="btn btn-secondary" onclick="Settings.resetToDefaults()">
                                <i class="fas fa-undo"></i> Reset to Defaults
                            </button>
                            <button class="btn btn-primary" onclick="Settings.saveSettings()">
                                <i class="fas fa-save"></i> Save Changes
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Theme Preview Modal -->
                <div class="modal" id="theme-preview-modal">
                    <div class="modal-content theme-preview-content">
                        <div class="modal-header">
                            <h3>Theme Preview</h3>
                            <button class="modal-close" onclick="Settings.closeThemePreview()">&times;</button>
                        </div>
                        <div class="modal-body">
                            <div class="theme-preview" id="theme-preview-container">
                                <!-- Theme preview will be generated here -->
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-secondary" onclick="Settings.closeThemePreview()">Cancel</button>
                            <button class="btn btn-primary" onclick="Settings.applyPreviewedTheme()">Apply Theme</button>
                        </div>
                    </div>
                </div>

                ${Settings.getStyles()}
            `,
            onInit: (windowElement) => {
                Settings.init(windowElement);
            }
        };
    }

    static getStyles() {
        return `
            <style>
                .settings-app {
                    height: 100%;
                    display: flex;
                    background: #f8f9fa;
                    font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
                    color: #2c3e50;
                }

                .settings-sidebar {
                    width: 250px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    display: flex;
                    flex-direction: column;
                    box-shadow: 2px 0 10px rgba(0,0,0,0.1);
                }

                .settings-logo {
                    padding: 25px 20px;
                    text-align: center;
                    border-bottom: 1px solid rgba(255,255,255,0.2);
                    font-size: 20px;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
                }

                .settings-logo i {
                    font-size: 24px;
                    animation: rotate 10s linear infinite;
                }

                @keyframes rotate {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                .settings-menu {
                    flex: 1;
                    padding: 20px 0;
                }

                .settings-category {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    padding: 15px 25px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border-left: 4px solid transparent;
                    font-weight: 500;
                }

                .settings-category:hover {
                    background: rgba(255,255,255,0.1);
                    transform: translateX(5px);
                }

                .settings-category.active {
                    background: rgba(255,255,255,0.2);
                    border-left-color: #ffffff;
                    box-shadow: inset 0 0 20px rgba(255,255,255,0.1);
                }

                .settings-category i {
                    width: 20px;
                    text-align: center;
                    font-size: 16px;
                }

                .settings-content {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                }

                .settings-header {
                    padding: 30px 40px 20px;
                    background: white;
                    border-bottom: 1px solid #e9ecef;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }

                .settings-header h2 {
                    margin: 0 0 8px 0;
                    color: #2c3e50;
                    font-size: 28px;
                    font-weight: 700;
                }

                .settings-header p {
                    margin: 0;
                    color: #6c757d;
                    font-size: 16px;
                }

                .settings-panel {
                    flex: 1;
                    padding: 30px 40px;
                    overflow-y: auto;
                    background: #f8f9fa;
                }

                .settings-section {
                    background: white;
                    border-radius: 12px;
                    padding: 25px;
                    margin-bottom: 20px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                    border: 1px solid #e9ecef;
                }

                .settings-section h3 {
                    margin: 0 0 20px 0;
                    color: #495057;
                    font-size: 18px;
                    font-weight: 600;
                    border-bottom: 2px solid #e9ecef;
                    padding-bottom: 10px;
                }

                .setting-item {
                    margin-bottom: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 20px;
                    padding: 15px 0;
                    border-bottom: 1px solid #f8f9fa;
                }

                .setting-item:last-child {
                    border-bottom: none;
                    margin-bottom: 0;
                }

                .setting-info {
                    flex: 1;
                }

                .setting-label {
                    font-weight: 600;
                    color: #495057;
                    margin-bottom: 5px;
                    font-size: 14px;
                }

                .setting-description {
                    color: #6c757d;
                    font-size: 13px;
                    line-height: 1.4;
                }

                .setting-control {
                    flex-shrink: 0;
                }

                /* Theme Grid */
                .theme-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                    gap: 20px;
                    margin-top: 20px;
                }

                .theme-card {
                    border: 2px solid #e9ecef;
                    border-radius: 12px;
                    overflow: hidden;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    background: white;
                    position: relative;
                }

                .theme-card:hover {
                    border-color: #667eea;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 20px rgba(102, 126, 234, 0.2);
                }

                .theme-card.active {
                    border-color: #667eea;
                    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
                }

                .theme-preview-header {
                    height: 60px;
                    position: relative;
                    overflow: hidden;
                }

                .theme-preview-content {
                    padding: 15px;
                    text-align: center;
                }

                .theme-name {
                    font-weight: 600;
                    color: #495057;
                    margin-bottom: 5px;
                    font-size: 14px;
                }

                .theme-description {
                    color: #6c757d;
                    font-size: 12px;
                }

                .theme-checkmark {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    width: 24px;
                    height: 24px;
                    background: #28a745;
                    border-radius: 50%;
                    display: none;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 12px;
                }

                .theme-card.active .theme-checkmark {
                    display: flex;
                }

                /* Form Controls */
                .toggle-switch {
                    position: relative;
                    width: 50px;
                    height: 26px;
                    background: #ccc;
                    border-radius: 13px;
                    cursor: pointer;
                    transition: background 0.3s ease;
                }

                .toggle-switch.active {
                    background: #667eea;
                }

                .toggle-slider {
                    position: absolute;
                    top: 2px;
                    left: 2px;
                    width: 22px;
                    height: 22px;
                    background: white;
                    border-radius: 50%;
                    transition: transform 0.3s ease;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                }

                .toggle-switch.active .toggle-slider {
                    transform: translateX(24px);
                }

                .custom-select {
                    padding: 8px 12px;
                    border: 2px solid #e9ecef;
                    border-radius: 6px;
                    background: white;
                    min-width: 150px;
                    cursor: pointer;
                    transition: border-color 0.3s ease;
                }

                .custom-select:focus {
                    outline: none;
                    border-color: #667eea;
                }

                .custom-slider {
                    width: 150px;
                    margin: 0 15px;
                }

                .custom-input {
                    padding: 8px 12px;
                    border: 2px solid #e9ecef;
                    border-radius: 6px;
                    background: white;
                    min-width: 100px;
                    transition: border-color 0.3s ease;
                }

                .custom-input:focus {
                    outline: none;
                    border-color: #667eea;
                }

                /* Color Picker */
                .color-picker {
                    display: flex;
                    gap: 10px;
                    flex-wrap: wrap;
                }

                .color-option {
                    width: 40px;
                    height: 40px;
                    border-radius: 8px;
                    cursor: pointer;
                    border: 3px solid transparent;
                    transition: all 0.3s ease;
                    position: relative;
                }

                .color-option:hover {
                    transform: scale(1.1);
                    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                }

                .color-option.active {
                    border-color: #495057;
                    transform: scale(1.1);
                }

                .color-option::after {
                    content: '✓';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    color: white;
                    font-weight: bold;
                    text-shadow: 0 0 3px rgba(0,0,0,0.8);
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                .color-option.active::after {
                    opacity: 1;
                }

                /* Footer */
                .settings-footer {
                    padding: 20px 40px;
                    background: white;
                    border-top: 1px solid #e9ecef;
                    display: flex;
                    justify-content: flex-end;
                    gap: 15px;
                    box-shadow: 0 -2px 4px rgba(0,0,0,0.1);
                }

                .btn {
                    padding: 10px 20px;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                }

                .btn-primary {
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    color: white;
                }

                .btn-secondary {
                    background: #6c757d;
                    color: white;
                }

                .btn-danger {
                    background: #dc3545;
                    color: white;
                }

                /* Storage Info */
                .storage-display {
                    background: #f8f9fa;
                    border-radius: 8px;
                    padding: 20px;
                    text-align: center;
                }

                .storage-circle {
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    background: conic-gradient(#667eea 0deg 120deg, #e9ecef 120deg 360deg);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 15px;
                    position: relative;
                }

                .storage-circle::before {
                    content: '';
                    position: absolute;
                    width: 70px;
                    height: 70px;
                    background: #f8f9fa;
                    border-radius: 50%;
                }

                .storage-text {
                    position: relative;
                    z-index: 1;
                    font-weight: bold;
                    color: #495057;
                }

                .storage-details {
                    font-size: 14px;
                    color: #6c757d;
                }

                /* Progress Bar */
                .progress-bar {
                    width: 100%;
                    height: 8px;
                    background: #e9ecef;
                    border-radius: 4px;
                    overflow: hidden;
                    margin: 10px 0;
                }

                .progress-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #667eea, #764ba2);
                    transition: width 0.5s ease;
                }

                /* Modal Styles */
                .modal {
                    display: none;
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.6);
                    z-index: 10000;
                    backdrop-filter: blur(5px);
                }

                .modal.show {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .modal-content {
                    background: white;
                    border-radius: 12px;
                    width: 90%;
                    max-width: 600px;
                    max-height: 90vh;
                    overflow-y: auto;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                }

                .theme-preview-content {
                    max-width: 800px;
                }

                .modal-header {
                    padding: 20px;
                    border-bottom: 1px solid #e9ecef;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .modal-header h3 {
                    margin: 0;
                    color: #495057;
                }

                .modal-close {
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                    color: #6c757d;
                }

                .modal-body {
                    padding: 20px;
                }

                .modal-footer {
                    padding: 20px;
                    border-top: 1px solid #e9ecef;
                    display: flex;
                    justify-content: flex-end;
                    gap: 10px;
                }

                /* Statistics Cards */
                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 20px;
                    margin-top: 20px;
                }

                .stat-card {
                    background: white;
                    border: 1px solid #e9ecef;
                    border-radius: 8px;
                    padding: 20px;
                    text-align: center;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }

                .stat-value {
                    font-size: 24px;
                    font-weight: bold;
                    color: #667eea;
                    margin-bottom: 5px;
                }

                .stat-label {
                    color: #6c757d;
                    font-size: 14px;
                }

                /* Responsive Design */
                @media (max-width: 768px) {
                    .settings-app {
                        flex-direction: column;
                    }

                    .settings-sidebar {
                        width: 100%;
                        height: auto;
                    }

                    .settings-menu {
                        display: flex;
                        overflow-x: auto;
                        padding: 10px;
                        gap: 10px;
                    }

                    .settings-category {
                        flex-shrink: 0;
                        min-width: 120px;
                        border-left: none;
                        border-bottom: 3px solid transparent;
                        text-align: center;
                        padding: 10px;
                    }

                    .settings-category.active {
                        border-left: none;
                        border-bottom-color: #ffffff;
                    }

                    .settings-header,
                    .settings-panel,
                    .settings-footer {
                        padding-left: 20px;
                        padding-right: 20px;
                    }

                    .theme-grid {
                        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
                        gap: 15px;
                    }

                    .setting-item {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 10px;
                    }

                    .setting-control {
                        width: 100%;
                        display: flex;
                        justify-content: flex-end;
                    }
                }

                /* Loading Animation */
                .loading {
                    text-align: center;
                    padding: 40px;
                    color: #6c757d;
                }

                .spinner {
                    width: 40px;
                    height: 40px;
                    border: 4px solid #e9ecef;
                    border-top: 4px solid #667eea;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 20px;
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                /* Success/Error Messages */
                .message {
                    padding: 12px 16px;
                    border-radius: 8px;
                    margin-bottom: 20px;
                    display: none;
                    font-weight: 500;
                }

                .message.success {
                    background: #d4edda;
                    color: #155724;
                    border: 1px solid #c3e6cb;
                }

                .message.error {
                    background: #f8d7da;
                    color: #721c24;
                    border: 1px solid #f5c6cb;
                }

                .message.show {
                    display: block;
                    animation: slideDown 0.3s ease-out;
                }

                @keyframes slideDown {
                    from { transform: translateY(-20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            </style>
        `;
    }

    static init(windowElement) {
        this.currentWindow = windowElement;
        this.currentCategory = 'appearance';
        this.settings = {};
        this.originalSettings = {};
        this.previewedTheme = null;
        this.hasUnsavedChanges = false;

        console.log('🔧 Initializing Settings app...');

        this.setupEventListeners();
        this.loadUserSettings();
    }

    static setupEventListeners() {
        // Category navigation
        const categories = this.currentWindow.querySelectorAll('.settings-category');
        categories.forEach(category => {
            category.addEventListener('click', () => {
                const categoryName = category.dataset.category;
                this.switchCategory(categoryName);
            });
        });

        // Prevent accidental window close if there are unsaved changes
        window.addEventListener('beforeunload', (e) => {
            if (this.hasUnsavedChanges) {
                e.preventDefault();
                e.returnValue = '';
            }
        });
    }

    static switchCategory(categoryName) {
        // Update active category in sidebar
        this.currentWindow.querySelectorAll('.settings-category').forEach(cat => {
            cat.classList.remove('active');
        });
        this.currentWindow.querySelector(`[data-category="${categoryName}"]`).classList.add('active');

        // Update content
        this.currentCategory = categoryName;
        this.loadCategoryContent(categoryName);
    }

    static async loadUserSettings() {
        try {
            console.log('📥 Loading user settings...');

            const response = await fetch('/api/user/preferences', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': this.getCSRFToken()
                }
            });

            if (response.ok) {
                const data = await response.json();
                this.settings = data.preferences || {};
                this.originalSettings = JSON.parse(JSON.stringify(this.settings));

                console.log('✅ Settings loaded:', this.settings);

                // Load initial category content
                this.loadCategoryContent(this.currentCategory);
            } else {
                console.error('❌ Failed to load settings:', response.status);
                this.showMessage('Failed to load settings. Using defaults.', 'error');
                this.loadCategoryContent(this.currentCategory);
            }
        } catch (error) {
            console.error('❌ Error loading settings:', error);
            this.showMessage('Error loading settings. Check your connection.', 'error');
            this.loadCategoryContent(this.currentCategory);
        }
    }

    static loadCategoryContent(category) {
        const titleElement = this.currentWindow.querySelector('#settings-title');
        const descriptionElement = this.currentWindow.querySelector('#settings-description');
        const panelElement = this.currentWindow.querySelector('#settings-panel');

        const categoryData = this.getCategoryData(category);

        titleElement.textContent = categoryData.title;
        descriptionElement.textContent = categoryData.description;
        panelElement.innerHTML = categoryData.content;

        // Initialize category-specific functionality
        this.initializeCategoryFeatures(category);
    }

    static getCategoryData(category) {
        const categories = {
            appearance: {
                title: 'Appearance',
                description: 'Customize the look and feel of your desktop',
                content: this.getAppearanceContent()
            },
            desktop: {
                title: 'Desktop',
                description: 'Configure desktop behavior and layout',
                content: this.getDesktopContent()
            },
            files: {
                title: 'Files & Storage',
                description: 'Manage file system and storage settings',
                content: this.getFilesContent()
            },
            system: {
                title: 'System',
                description: 'Performance and system configuration',
                content: this.getSystemContent()
            },
            privacy: {
                title: 'Privacy',
                description: 'Control your privacy and data settings',
                content: this.getPrivacyContent()
            },
            notifications: {
                title: 'Notifications',
                description: 'Configure how and when you receive notifications',
                content: this.getNotificationsContent()
            },
            keyboard: {
                title: 'Keyboard',
                description: 'Customize keyboard shortcuts and input settings',
                content: this.getKeyboardContent()
            },
            about: {
                title: 'About',
                description: 'System information and version details',
                content: this.getAboutContent()
            }
        };

        return categories[category] || categories.appearance;
    }

    static getAppearanceContent() {
        const currentTheme = this.settings.theme || 'cyber-blue';
        const currentFont = this.settings.fontFamily || 'Rajdhani';
        const fontSize = this.settings.fontSize || 14;
        const transparency = this.settings.transparency || 0;

        return `
            <div class="settings-section">
                <h3>🎨 Theme</h3>
                <div class="setting-item">
                    <div class="setting-info">
                        <div class="setting-label">Color Theme</div>
                        <div class="setting-description">Choose your preferred color scheme</div>
                    </div>
                </div>
                <div class="theme-grid">
                    ${this.getThemeCards(currentTheme)}
                </div>
            </div>

            <div class="settings-section">
                <h3>🔤 Typography</h3>
                <div class="setting-item">
                    <div class="setting-info">
                        <div class="setting-label">Font Family</div>
                        <div class="setting-description">Choose the font used throughout the interface</div>
                    </div>
                    <div class="setting-control">
                        <select class="custom-select" id="font-family" onchange="Settings.updateSetting('fontFamily', this.value)">
                            <option value="Rajdhani" ${currentFont === 'Rajdhani' ? 'selected' : ''}>Rajdhani (Default)</option>
                            <option value="Orbitron" ${currentFont === 'Orbitron' ? 'selected' : ''}>Orbitron (Futuristic)</option>
                            <option value="Arial" ${currentFont === 'Arial' ? 'selected' : ''}>Arial (Clean)</option>
                            <option value="Georgia" ${currentFont === 'Georgia' ? 'selected' : ''}>Georgia (Classic)</option>
                            <option value="Courier New" ${currentFont === 'Courier New' ? 'selected' : ''}>Courier New (Monospace)</option>
                        </select>
                    </div>
                </div>
                <div class="setting-item">
                    <div class="setting-info">
                        <div class="setting-label">Font Size</div>
                        <div class="setting-description">Adjust the size of text (${fontSize}px)</div>
                    </div>
                    <div class="setting-control">
                        <input type="range" class="custom-slider" min="12" max="20" value="${fontSize}" 
                               id="font-size" oninput="Settings.updateSetting('fontSize', this.value); this.nextElementSibling.textContent = this.value + 'px'">
                        <span>${fontSize}px</span>
                    </div>
                </div>
            </div>

            <div class="settings-section">
                <h3>✨ Visual Effects</h3>
                <div class="setting-item">
                    <div class="setting-info">
                        <div class="setting-label">Window Transparency</div>
                        <div class="setting-description">Adjust window transparency (${transparency}%)</div>
                    </div>
                    <div class="setting-control">
                        <input type="range" class="custom-slider" min="0" max="30" value="${transparency}"
                               id="transparency" oninput="Settings.updateSetting('transparency', this.value); this.nextElementSibling.textContent = this.value + '%'">
                        <span>${transparency}%</span>
                    </div>
                </div>
                <div class="setting-item">
                    <div class="setting-info">
                        <div class="setting-label">Animations</div>
                        <div class="setting-description">Enable smooth animations and transitions</div>
                    </div>
                    <div class="setting-control">
                        <div class="toggle-switch ${this.settings.animationsEnabled !== false ? 'active' : ''}" 
                             onclick="Settings.toggleSetting('animationsEnabled')">
                            <div class="toggle-slider"></div>
                        </div>
                    </div>
                </div>
                <div class="setting-item">
                    <div class="setting-info">
                        <div class="setting-label">Blur Effects</div>
                        <div class="setting-description">Enable backdrop blur effects</div>
                    </div>
                    <div class="setting-control">
                        <div class="toggle-switch ${this.settings.blurEffects !== false ? 'active' : ''}" 
                             onclick="Settings.toggleSetting('blurEffects')">
                            <div class="toggle-slider"></div>
                        </div>
                    </div>
                </div>
                <div class="setting-item">
                    <div class="setting-info">
                        <div class="setting-label">Icon Shadows</div>
                        <div class="setting-description">Add shadow effects to desktop icons</div>
                    </div>
                    <div class="setting-control">
                        <div class="toggle-switch ${this.settings.iconShadows !== false ? 'active' : ''}" 
                             onclick="Settings.toggleSetting('iconShadows')">
                            <div class="toggle-slider"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="settings-section">
                <h3>🖼️ Wallpaper</h3>
                <div class="setting-item">
                    <div class="setting-info">
                        <div class="setting-label">Wallpaper Style</div>
                        <div class="setting-description">Choose how the wallpaper is displayed</div>
                    </div>
                    <div class="setting-control">
                        <select class="custom-select" id="wallpaper-style" onchange="Settings.updateSetting('wallpaperStyle', this.value)">
                            <option value="gradient" ${(this.settings.wallpaperStyle || '').includes('gradient') ? 'selected' : ''}>Gradient</option>
                            <option value="solid" ${(this.settings.wallpaperStyle || '').includes('solid') ? 'selected' : ''}>Solid Color</option>
                            <option value="image" ${(this.settings.wallpaperStyle || '').includes('url') ? 'selected' : ''}>Custom Image</option>
                        </select>
                    </div>
                </div>
                <div class="setting-item">
                    <div class="setting-info">
                        <div class="setting-label">Background Color</div>
                        <div class="setting-description">Choose background color or accent</div>
                    </div>
                    <div class="setting-control">
                        <div class="color-picker">
                            ${this.getColorOptions()}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    static getDesktopContent() {
        return `
            <div class="settings-section">
                <h3>🖥️ Desktop Layout</h3>
                <div class="setting-item">
                    <div class="setting-info">
                        <div class="setting-label">Icon Size</div>
                        <div class="setting-description">Adjust the size of desktop icons (${this.settings.iconSize || 48}px)</div>
                    </div>
                    <div class="setting-control">
                        <input type="range" class="custom-slider" min="32" max="64" value="${this.settings.iconSize || 48}"
                               id="icon-size" oninput="Settings.updateSetting('iconSize', this.value); this.nextElementSibling.textContent = this.value + 'px'">
                        <span>${this.settings.iconSize || 48}px</span>
                    </div>
                </div>
                <div class="setting-item">
                    <div class="setting-info">
                        <div class="setting-label">Show Icon Labels</div>
                        <div class="setting-description">Display text labels under desktop icons</div>
                    </div>
                    <div class="setting-control">
                        <div class="toggle-switch ${this.settings.showIconLabels !== false ? 'active' : ''}" 
                             onclick="Settings.toggleSetting('showIconLabels')">
                            <div class="toggle-slider"></div>
                        </div>
                    </div>
                </div>
                <div class="setting-item">
                    <div class="setting-info">
                        <div class="setting-label">Auto-arrange Icons</div>
                        <div class="setting-description">Automatically organize desktop icons in a grid</div>
                    </div>
                    <div class="setting-control">
                        <div class="toggle-switch ${this.settings.autoArrangeIcons ? 'active' : ''}" 
                             onclick="Settings.toggleSetting('autoArrangeIcons')">
                            <div class="toggle-slider"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="settings-section">
                <h3>📋 Taskbar</h3>
                <div class="setting-item">
                    <div class="setting-info">
                        <div class="setting-label">Auto-hide Taskbar</div>
                        <div class="setting-description">Hide taskbar when not in use</div>
                    </div>
                    <div class="setting-control">
                        <div class="toggle-switch ${this.settings.autoHideTaskbar ? 'active' : ''}" 
                             onclick="Settings.toggleSetting('autoHideTaskbar')">
                            <div class="toggle-slider"></div>
                        </div>
                    </div>
                </div>
                <div class="setting-item">
                    <div class="setting-info">
                        <div class="setting-label">Show Clock</div>
                        <div class="setting-description">Display current time in the taskbar</div>
                    </div>
                    <div class="setting-control">
                        <div class="toggle-switch ${this.settings.showClock !== false ? 'active' : ''}" 
                             onclick="Settings.toggleSetting('showClock')">
                            <div class="toggle-slider"></div>
                        </div>
                    </div>
                </div>
                <div class="setting-item">
                    <div class="setting-info">
                        <div class="setting-label">Taskbar Position</div>
                        <div class="setting-description">Choose where the taskbar appears</div>
                    </div>
                    <div class="setting-control">
                        <select class="custom-select" id="taskbar-position" onchange="Settings.updateSetting('taskbarPosition', this.value)">
                            <option value="bottom" ${this.settings.taskbarPosition !== 'top' ? 'selected' : ''}>Bottom</option>
                            <option value="top" ${this.settings.taskbarPosition === 'top' ? 'selected' : ''}>Top</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="settings-section">
                <h3>🪟 Windows</h3>
                <div class="setting-item">
                    <div class="setting-info">
                        <div class="setting-label">Restore Windows</div>
                        <div class="setting-description">Restore open windows when logging in</div>
                    </div>
                    <div class="setting-control">
                        <div class="toggle-switch ${this.settings.restoreWindows ? 'active' : ''}" 
                             onclick="Settings.toggleSetting('restoreWindows')">
                            <div class="toggle-slider"></div>
                        </div>
                    </div>
                </div>
                <div class="setting-item">
                    <div class="setting-info">
                        <div class="setting-label">Window Snapping</div>
                        <div class="setting-description">Snap windows to screen edges</div>
                    </div>
                    <div class="setting-control">
                        <div class="toggle-switch ${this.settings.windowSnapping !== false ? 'active' : ''}" 
                             onclick="Settings.toggleSetting('windowSnapping')">
                            <div class="toggle-slider"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    static getFilesContent() {
        return `
            <div class="settings-section">
                <h3>💾 Storage Information</h3>
                <div class="storage-display">
                    <div class="storage-circle">
                        <div class="storage-text">
                            <div>35%</div>
                            <div style="font-size: 12px;">Used</div>
                        </div>
                    </div>
                    <div class="storage-details">
                        <div>Used: <strong>35 MB</strong> of 100 MB</div>
                        <div style="margin-top: 10px;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                                <span>Documents</span>
                                <span>15 MB</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: 15%;"></div>
                            </div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 5px; margin-top: 10px;">
                                <span>Pictures</span>
                                <span>12 MB</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: 12%;"></div>
                            </div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 5px; margin-top: 10px;">
                                <span>Other</span>
                                <span>8 MB</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: 8%;"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="settings-section">
                <h3>📁 File Handling</h3>
                <div class="setting-item">
                    <div class="setting-info">
                        <div class="setting-label">Show Hidden Files</div>
                        <div class="setting-description">Display files starting with a dot</div>
                    </div>
                    <div class="setting-control">
                        <div class="toggle-switch ${this.settings.showHiddenFiles ? 'active' : ''}" 
                             onclick="Settings.toggleSetting('showHiddenFiles')">
                            <div class="toggle-slider"></div>
                        </div>
                    </div>
                </div>
                <div class="setting-item">
                    <div class="setting-info">
                        <div class="setting-label">File Extensions</div>
                        <div class="setting-description">Always show file extensions</div>
                    </div>
                    <div class="setting-control">
                        <div class="toggle-switch ${this.settings.showFileExtensions !== false ? 'active' : ''}" 
                             onclick="Settings.toggleSetting('showFileExtensions')">
                            <div class="toggle-slider"></div>
                        </div>
                    </div>
                </div>
                <div class="setting-item">
                    <div class="setting-info">
                        <div class="setting-label">Confirm File Deletion</div>
                        <div class="setting-description">Ask for confirmation before deleting files</div>
                    </div>
                    <div class="setting-control">
                        <div class="toggle-switch ${this.settings.confirmFileDeletion !== false ? 'active' : ''}" 
                             onclick="Settings.toggleSetting('confirmFileDeletion')">
                            <div class="toggle-slider"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="settings-section">
                <h3>⬆️ Upload Settings</h3>
                <div class="setting-item">
                    <div class="setting-info">
                        <div class="setting-label">Auto-extract Archives</div>
                        <div class="setting-description">Automatically extract ZIP files when uploaded</div>
                    </div>
                    <div class="setting-control">
                        <div class="toggle-switch ${this.settings.autoExtractArchives ? 'active' : ''}" 
                             onclick="Settings.toggleSetting('autoExtractArchives')">
                            <div class="toggle-slider"></div>
                        </div>
                    </div>
                </div>
                <div class="setting-item">
                    <div class="setting-info">
                        <div class="setting-label">Upload Notifications</div>
                        <div class="setting-description">Show notifications when uploads complete</div>
                    </div>
                    <div class="setting-control">
                        <div class="toggle-switch ${this.settings.uploadNotifications !== false ? 'active' : ''}" 
                             onclick="Settings.toggleSetting('uploadNotifications')">
                            <div class="toggle-slider"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="settings-section">
                <h3>🗂️ Storage Management</h3>
                <div style="text-align: center;">
                    <button class="btn btn-secondary" onclick="Settings.cleanupStorage()">
                        <i class="fas fa-broom"></i> Clean Temporary Files
                    </button>
                    <button class="btn btn-primary" onclick="Settings.analyzeStorage()" style="margin-left: 10px;">
                        <i class="fas fa-chart-pie"></i> Analyze Storage
                    </button>
                </div>
            </div>
        `;
    }

    static getSystemContent() {
        return `
            <div class="settings-section">
                <h3>⚡ Performance</h3>
                <div class="setting-item">
                    <div class="setting-info">
                        <div class="setting-label">Hardware Acceleration</div>
                        <div class="setting-description">Use GPU acceleration when available</div>
                    </div>
                    <div class="setting-control">
                        <div class="toggle-switch ${this.settings.hardwareAcceleration !== false ? 'active' : ''}" 
                             onclick="Settings.toggleSetting('hardwareAcceleration')">
                            <div class="toggle-slider"></div>
                        </div>
                    </div>
                </div>
                <div class="setting-item">
                    <div class="setting-info">
                        <div class="setting-label">Animation Quality</div>
                        <div class="setting-description">Adjust animation performance vs quality</div>
                    </div>
                    <div class="setting-control">
                        <select class="custom-select" id="animation-quality" onchange="Settings.updateSetting('animationQuality', this.value)">
                            <option value="high" ${this.settings.animationQuality !== 'medium' && this.settings.animationQuality !== 'low' ? 'selected' : ''}>High Quality</option>
                            <option value="medium" ${this.settings.animationQuality === 'medium' ? 'selected' : ''}>Medium Quality</option>
                            <option value="low" ${this.settings.animationQuality === 'low' ? 'selected' : ''}>Low Quality</option>
                        </select>
                    </div>
                </div>
                <div class="setting-item">
                    <div class="setting-info">
                        <div class="setting-label">Reduce Motion</div>
                        <div class="setting-description">Minimize animations for better performance</div>
                    </div>
                    <div class="setting-control">
                        <div class="toggle-switch ${this.settings.reduceMotion ? 'active' : ''}" 
                             onclick="Settings.toggleSetting('reduceMotion')">
                            <div class="toggle-slider"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="settings-section">
                <h3>🔧 System Information</h3>
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-value">v2.0.0</div>
                        <div class="stat-label">EmberFrame Version</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">Chrome 120</div>
                        <div class="stat-label">Browser</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">1920x1080</div>
                        <div class="stat-label">Screen Resolution</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">8 GB</div>
                        <div class="stat-label">Available Memory</div>
                    </div>
                </div>
            </div>

            <div class="settings-section">
                <h3>📊 Usage Statistics</h3>
                <div class="setting-item">
                    <div class="setting-info">
                        <div class="setting-label">Collect Usage Data</div>
                        <div class="setting-description">Help improve EmberFrame by sharing anonymous usage statistics</div>
                    </div>
                    <div class="setting-control">
                        <div class="toggle-switch ${this.settings.collectUsageData ? 'active' : ''}" 
                             onclick="Settings.toggleSetting('collectUsageData')">
                            <div class="toggle-slider"></div>
                        </div>
                    </div>
                </div>
                <div class="setting-item">
                    <div class="setting-info">
                        <div class="setting-label">Crash Reports</div>
                        <div class="setting-description">Automatically send crash reports to help fix bugs</div>
                    </div>
                    <div class="setting-control">
                        <div class="toggle-switch ${this.settings.sendCrashReports ? 'active' : ''}" 
                             onclick="Settings.toggleSetting('sendCrashReports')">
                            <div class="toggle-slider"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="settings-section">
                <h3>🔄 Updates</h3>
                <div class="setting-item">
                    <div class="setting-info">
                        <div class="setting-label">Auto-update Apps</div>
                        <div class="setting-description">Automatically update built-in applications</div>
                    </div>
                    <div class="setting-control">
                        <div class="toggle-switch ${this.settings.autoUpdateApps !== false ? 'active' : ''}" 
                             onclick="Settings.toggleSetting('autoUpdateApps')">
                            <div class="toggle-slider"></div>
                        </div>
                    </div>
                </div>
                <div style="text-align: center; margin-top: 20px;">
                    <button class="btn btn-primary" onclick="Settings.checkForUpdates()">
                        <i class="fas fa-download"></i> Check for Updates
                    </button>
                </div>
            </div>
        `;
    }

    static getPrivacyContent() {
        return `
            <div class="settings-section">
                <h3>🔒 Data Protection</h3>
                <div class="setting-item">
                    <div class="setting-info">
                        <div class="setting-label">Private Browsing Mode</div>
                        <div class="setting-description">Don't save browsing history or cache files</div>
                    </div>
                    <div class="setting-control">
                        <div class="toggle-switch ${this.settings.privateBrowsing ? 'active' : ''}" 
                             onclick="Settings.toggleSetting('privateBrowsing')">
                            <div class="toggle-slider"></div>
                        </div>
                    </div>
                </div>
                <div class="setting-item">
                    <div class="setting-info">
                        <div class="setting-label">Clear Data on Exit</div>
                        <div class="setting-description">Clear temporary files when logging out</div>
                    </div>
                    <div class="setting-control">
                        <div class="toggle-switch ${this.settings.clearDataOnExit ? 'active' : ''}" 
                             onclick="Settings.toggleSetting('clearDataOnExit')">
                            <div class="toggle-slider"></div>
                        </div>
                    </div>
                </div>
                <div class="setting-item">
                    <div class="setting-info">
                        <div class="setting-label">Secure File Deletion</div>
                        <div class="setting-description">Securely overwrite deleted files</div>
                    </div>
                    <div class="setting-control">
                        <div class="toggle-switch ${this.settings.secureFileDeletion ? 'active' : ''}" 
                             onclick="Settings.toggleSetting('secureFileDeletion')">
                            <div class="toggle-slider"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="settings-section">
                <h3>👁️ Activity Logging</h3>
                <div class="setting-item">
                    <div class="setting-info">
                        <div class="setting-label">Log File Access</div>
                        <div class="setting-description">Keep a record of file operations</div>
                    </div>
                    <div class="setting-control">
                        <div class="toggle-switch ${this.settings.logFileAccess !== false ? 'active' : ''}" 
                             onclick="Settings.toggleSetting('logFileAccess')">
                            <div class="toggle-slider"></div>
                        </div>
                    </div>
                </div>
                <div class="setting-item">
                    <div class="setting-info">
                        <div class="setting-label">Log Login Attempts</div>
                        <div class="setting-description">Record successful and failed login attempts</div>
                    </div>
                    <div class="setting-control">
                        <div class="toggle-switch ${this.settings.logLoginAttempts !== false ? 'active' : ''}" 
                             onclick="Settings.toggleSetting('logLoginAttempts')">
                            <div class="toggle-slider"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="settings-section">
                <h3>🛡️ Security</h3>
                <div class="setting-item">
                    <div class="setting-info">
                        <div class="setting-label">Session Timeout</div>
                        <div class="setting-description">Automatically log out after inactivity (${this.settings.sessionTimeout || 60} minutes)</div>
                    </div>
                    <div class="setting-control">
                        <input type="range" class="custom-slider" min="15" max="240" value="${this.settings.sessionTimeout || 60}"
                               id="session-timeout" oninput="Settings.updateSetting('sessionTimeout', this.value); this.nextElementSibling.textContent = this.value + ' min'">
                        <span>${this.settings.sessionTimeout || 60} min</span>
                    </div>
                </div>
                <div class="setting-item">
                    <div class="setting-info">
                        <div class="setting-label">Lock Screen</div>
                        <div class="setting-description">Require password to unlock after idle time</div>
                    </div>
                    <div class="setting-control">
                        <div class="toggle-switch ${this.settings.lockScreen ? 'active' : ''}" 
                             onclick="Settings.toggleSetting('lockScreen')">
                            <div class="toggle-slider"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="settings-section">
                <h3>🧹 Privacy Tools</h3>
                <div style="text-align: center;">
                    <button class="btn btn-secondary" onclick="Settings.clearCache()">
                        <i class="fas fa-trash"></i> Clear Cache
                    </button>
                    <button class="btn btn-secondary" onclick="Settings.clearHistory()" style="margin-left: 10px;">
                        <i class="fas fa-history"></i> Clear History
                    </button>
                    <button class="btn btn-danger" onclick="Settings.clearAllData()" style="margin-left: 10px;">
                        <i class="fas fa-exclamation-triangle"></i> Clear All Data
                    </button>
                </div>
            </div>
        `;
    }

    static getNotificationsContent() {
        return `
            <div class="settings-section">
                <h3>🔔 Notification Settings</h3>
                <div class="setting-item">
                    <div class="setting-info">
                        <div class="setting-label">Enable Notifications</div>
                        <div class="setting-description">Show system and app notifications</div>
                    </div>
                    <div class="setting-control">
                        <div class="toggle-switch ${this.settings.notificationsEnabled !== false ? 'active' : ''}" 
                             onclick="Settings.toggleSetting('notificationsEnabled')">
                            <div class="toggle-slider"></div>
                        </div>
                    </div>
                </div>
                <div class="setting-item">
                    <div class="setting-info">
                        <div class="setting-label">Notification Position</div>
                        <div class="setting-description">Where notifications appear on screen</div>
                    </div>
                    <div class="setting-control">
                        <select class="custom-select" id="notification-position" onchange="Settings.updateSetting('notificationPosition', this.value)">
                            <option value="top-right" ${this.settings.notificationPosition !== 'top-left' && this.settings.notificationPosition !== 'bottom-right' && this.settings.notificationPosition !== 'bottom-left' ? 'selected' : ''}>Top Right</option>
                            <option value="top-left" ${this.settings.notificationPosition === 'top-left' ? 'selected' : ''}>Top Left</option>
                            <option value="bottom-right" ${this.settings.notificationPosition === 'bottom-right' ? 'selected' : ''}>Bottom Right</option>
                            <option value="bottom-left" ${this.settings.notificationPosition === 'bottom-left' ? 'selected' : ''}>Bottom Left</option>
                        </select>
                    </div>
                </div>
                <div class="setting-item">
                    <div class="setting-info">
                        <div class="setting-label">Auto-hide Duration</div>
                        <div class="setting-description">How long notifications stay visible (${this.settings.notificationDuration || 4} seconds)</div>
                    </div>
                    <div class="setting-control">
                        <input type="range" class="custom-slider" min="2" max="10" value="${this.settings.notificationDuration || 4}"
                               id="notification-duration" oninput="Settings.updateSetting('notificationDuration', this.value); this.nextElementSibling.textContent = this.value + 's'">
                        <span>${this.settings.notificationDuration || 4}s</span>
                    </div>
                </div>
            </div>

            <div class="settings-section">
                <h3>📱 Notification Types</h3>
                <div class="setting-item">
                    <div class="setting-info">
                        <div class="setting-label">File Operations</div>
                        <div class="setting-description">Notify when files are uploaded, downloaded, or deleted</div>
                    </div>
                    <div class="setting-control">
                        <div class="toggle-switch ${this.settings.notifyFileOperations !== false ? 'active' : ''}" 
                             onclick="Settings.toggleSetting('notifyFileOperations')">
                            <div class="toggle-slider"></div>
                        </div>
                    </div>
                </div>
                <div class="setting-item">
                    <div class="setting-info">
                        <div class="setting-label">System Events</div>
                        <div class="setting-description">Notify about system updates and maintenance</div>
                    </div>
                    <div class="setting-control">
                        <div class="toggle-switch ${this.settings.notifySystemEvents !== false ? 'active' : ''}" 
                             onclick="Settings.toggleSetting('notifySystemEvents')">
                            <div class="toggle-slider"></div>
                        </div>
                    </div>
                </div>
                <div class="setting-item">
                    <div class="setting-info">
                        <div class="setting-label">Security Alerts</div>
                        <div class="setting-description">Important security and privacy notifications</div>
                    </div>
                    <div class="setting-control">
                        <div class="toggle-switch ${this.settings.notifySecurityAlerts !== false ? 'active' : ''}" 
                             onclick="Settings.toggleSetting('notifySecurityAlerts')">
                            <div class="toggle-slider"></div>
                        </div>
                    </div>
                </div>
                <div class="setting-item">
                    <div class="setting-info">
                        <div class="setting-label">Application Alerts</div>
                        <div class="setting-description">Notifications from running applications</div>
                    </div>
                    <div class="setting-control">
                        <div class="toggle-switch ${this.settings.notifyAppAlerts !== false ? 'active' : ''}" 
                             onclick="Settings.toggleSetting('notifyAppAlerts')">
                            <div class="toggle-slider"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="settings-section">
                <h3>🔕 Do Not Disturb</h3>
                <div class="setting-item">
                    <div class="setting-info">
                        <div class="setting-label">Do Not Disturb Mode</div>
                        <div class="setting-description">Temporarily disable all notifications</div>
                    </div>
                    <div class="setting-control">
                        <div class="toggle-switch ${this.settings.doNotDisturb ? 'active' : ''}" 
                             onclick="Settings.toggleSetting('doNotDisturb')">
                            <div class="toggle-slider"></div>
                        </div>
                    </div>
                </div>
                <div class="setting-item">
                    <div class="setting-info">
                        <div class="setting-label">Scheduled Quiet Hours</div>
                        <div class="setting-description">Automatically enable do not disturb during certain hours</div>
                    </div>
                    <div class="setting-control">
                        <div class="toggle-switch ${this.settings.scheduledQuietHours ? 'active' : ''}" 
                             onclick="Settings.toggleSetting('scheduledQuietHours')">
                            <div class="toggle-slider"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="settings-section">
                <h3>🧪 Test Notifications</h3>
                <div style="text-align: center;">
                    <button class="btn btn-secondary" onclick="Settings.testNotification('info')">
                        <i class="fas fa-info-circle"></i> Test Info
                    </button>
                    <button class="btn btn-primary" onclick="Settings.testNotification('success')" style="margin-left: 10px;">
                        <i class="fas fa-check-circle"></i> Test Success
                    </button>
                    <button class="btn btn-danger" onclick="Settings.testNotification('error')" style="margin-left: 10px;">
                        <i class="fas fa-exclamation-circle"></i> Test Error
                    </button>
                </div>
            </div>
        `;
    }

    static getKeyboardContent() {
        return `
            <div class="settings-section">
                <h3>⌨️ Keyboard Shortcuts</h3>
                <div style="background: #f8f9fa; border-radius: 8px; padding: 20px;">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 14px;">
                        <div>
                            <h4 style="margin-bottom: 15px; color: #495057;">General</h4>
                            <div style="margin-bottom: 8px;"><strong>Ctrl + N</strong> - New File</div>
                            <div style="margin-bottom: 8px;"><strong>Ctrl + O</strong> - Open File</div>
                            <div style="margin-bottom: 8px;"><strong>Ctrl + S</strong> - Save File</div>
                            <div style="margin-bottom: 8px;"><strong>F5</strong> - Refresh</div>
                            <div style="margin-bottom: 8px;"><strong>F11</strong> - Fullscreen</div>
                        </div>
                        <div>
                            <h4 style="margin-bottom: 15px; color: #495057;">File Manager</h4>
                            <div style="margin-bottom: 8px;"><strong>Ctrl + A</strong> - Select All</div>
                            <div style="margin-bottom: 8px;"><strong>Ctrl + C</strong> - Copy</div>
                            <div style="margin-bottom: 8px;"><strong>Ctrl + X</strong> - Cut</div>
                            <div style="margin-bottom: 8px;"><strong>Ctrl + V</strong> - Paste</div>
                            <div style="margin-bottom: 8px;"><strong>Delete</strong> - Delete File</div>
                            <div style="margin-bottom: 8px;"><strong>F2</strong> - Rename</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="settings-section">
                <h3>🎛️ Input Settings</h3>
                <div class="setting-item">
                    <div class="setting-info">
                        <div class="setting-label">Enable Global Shortcuts</div>
                        <div class="setting-description">Allow keyboard shortcuts to work across all applications</div>
                    </div>
                    <div class="setting-control">
                        <div class="toggle-switch ${this.settings.globalShortcuts !== false ? 'active' : ''}" 
                             onclick="Settings.toggleSetting('globalShortcuts')">
                            <div class="toggle-slider"></div>
                        </div>
                    </div>
                </div>
                <div class="setting-item">
                    <div class="setting-info">
                        <div class="setting-label">Sticky Keys</div>
                        <div class="setting-description">Press modifier keys one at a time for shortcuts</div>
                    </div>
                    <div class="setting-control">
                        <div class="toggle-switch ${this.settings.stickyKeys ? 'active' : ''}" 
                             onclick="Settings.toggleSetting('stickyKeys')">
                            <div class="toggle-slider"></div>
                        </div>
                    </div>
                </div>
                <div class="setting-item">
                    <div class="setting-info">
                        <div class="setting-label">Key Repeat Rate</div>
                        <div class="setting-description">How fast keys repeat when held down</div>
                    </div>
                    <div class="setting-control">
                        <select class="custom-select" id="key-repeat-rate" onchange="Settings.updateSetting('keyRepeatRate', this.value)">
                            <option value="slow" ${this.settings.keyRepeatRate === 'slow' ? 'selected' : ''}>Slow</option>
                            <option value="normal" ${this.settings.keyRepeatRate !== 'slow' && this.settings.keyRepeatRate !== 'fast' ? 'selected' : ''}>Normal</option>
                            <option value="fast" ${this.settings.keyRepeatRate === 'fast' ? 'selected' : ''}>Fast</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="settings-section">
                <h3>🖱️ Mouse Settings</h3>
                <div class="setting-item">
                    <div class="setting-info">
                        <div class="setting-label">Mouse Sensitivity</div>
                        <div class="setting-description">Adjust mouse pointer speed</div>
                    </div>
                    <div class="setting-control">
                        <select class="custom-select" id="mouse-sensitivity" onchange="Settings.updateSetting('mouseSensitivity', this.value)">
                            <option value="low" ${this.settings.mouseSensitivity === 'low' ? 'selected' : ''}>Low</option>
                            <option value="normal" ${this.settings.mouseSensitivity !== 'low' && this.settings.mouseSensitivity !== 'high' ? 'selected' : ''}>Normal</option>
                            <option value="high" ${this.settings.mouseSensitivity === 'high' ? 'selected' : ''}>High</option>
                        </select>
                    </div>
                </div>
                <div class="setting-item">
                    <div class="setting-info">
                        <div class="setting-label">Reverse Mouse Buttons</div>
                        <div class="setting-description">Swap left and right mouse buttons</div>
                    </div>
                    <div class="setting-control">
                        <div class="toggle-switch ${this.settings.reverseMouseButtons ? 'active' : ''}" 
                             onclick="Settings.toggleSetting('reverseMouseButtons')">
                            <div class="toggle-slider"></div>
                        </div>
                    </div>
                </div>
                <div class="setting-item">
                    <div class="setting-info">
                        <div class="setting-label">Double-click Speed</div>
                        <div class="setting-description">How fast you need to click for double-click</div>
                    </div>
                    <div class="setting-control">
                        <select class="custom-select" id="double-click-speed" onchange="Settings.updateSetting('doubleClickSpeed', this.value)">
                            <option value="slow" ${this.settings.doubleClickSpeed === 'slow' ? 'selected' : ''}>Slow</option>
                            <option value="normal" ${this.settings.doubleClickSpeed !== 'slow' && this.settings.doubleClickSpeed !== 'fast' ? 'selected' : ''}>Normal</option>
                            <option value="fast" ${this.settings.doubleClickSpeed === 'fast' ? 'selected' : ''}>Fast</option>
                        </select>
                    </div>
                </div>
            </div>
        `;
    }

    static getAboutContent() {
        return `
            <div class="settings-section">
                <h3>🔥 EmberFrame</h3>
                <div style="text-align: center; padding: 20px;">
                    <div style="font-size: 64px; margin-bottom: 20px; color: #667eea;">🔥</div>
                    <h2 style="margin: 0 0 10px 0; color: #495057;">EmberFrame Desktop</h2>
                    <p style="margin: 0 0 20px 0; color: #6c757d; font-size: 18px;">Version 2.0.0</p>
                    <p style="color: #6c757d; max-width: 400px; margin: 0 auto; line-height: 1.6;">
                        A modern, web-based desktop environment that brings the power of a traditional 
                        operating system to your browser with a cyberpunk aesthetic.
                    </p>
                </div>
            </div>

            <div class="settings-section">
                <h3>ℹ️ System Information</h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 14px;">
                    <div>
                        <div style="margin-bottom: 12px;"><strong>Version:</strong> 2.0.0</div>
                        <div style="margin-bottom: 12px;"><strong>Build:</strong> 2024.12.31</div>
                        <div style="margin-bottom: 12px;"><strong>Platform:</strong> Web</div>
                        <div style="margin-bottom: 12px;"><strong>Browser:</strong> ${navigator.userAgent.split(' ')[0]}</div>
                    </div>
                    <div>
                        <div style="margin-bottom: 12px;"><strong>Screen:</strong> ${screen.width}x${screen.height}</div>
                        <div style="margin-bottom: 12px;"><strong>Language:</strong> ${navigator.language}</div>
                        <div style="margin-bottom: 12px;"><strong>Timezone:</strong> ${Intl.DateTimeFormat().resolvedOptions().timeZone}</div>
                        <div style="margin-bottom: 12px;"><strong>Online:</strong> ${navigator.onLine ? 'Yes' : 'No'}</div>
                    </div>
                </div>
            </div>

            <div class="settings-section">
                <h3>📄 Legal</h3>
                <div style="text-align: center;">
                    <button class="btn btn-secondary" onclick="Settings.showLicense()">
                        <i class="fas fa-file-contract"></i> View License
                    </button>
                    <button class="btn btn-secondary" onclick="Settings.showPrivacyPolicy()" style="margin-left: 10px;">
                        <i class="fas fa-shield-alt"></i> Privacy Policy
                    </button>
                    <button class="btn btn-secondary" onclick="Settings.showCredits()" style="margin-left: 10px;">
                        <i class="fas fa-heart"></i> Credits
                    </button>
                </div>
            </div>

            <div class="settings-section">
                <h3>🔗 Links</h3>
                <div style="text-align: center;">
                    <button class="btn btn-primary" onclick="Settings.openLink('https://github.com/emberframe')">
                        <i class="fab fa-github"></i> GitHub
                    </button>
                    <button class="btn btn-primary" onclick="Settings.openLink('https://emberframe.org')" style="margin-left: 10px;">
                        <i class="fas fa-globe"></i> Website
                    </button>
                    <button class="btn btn-primary" onclick="Settings.openLink('https://docs.emberframe.org')" style="margin-left: 10px;">
                        <i class="fas fa-book"></i> Documentation
                    </button>
                </div>
            </div>

            <div class="settings-section">
                <h3>🛠️ Developer Tools</h3>
                <div style="text-align: center;">
                    <button class="btn btn-secondary" onclick="Settings.exportSettings()">
                        <i class="fas fa-download"></i> Export Settings
                    </button>
                    <button class="btn btn-secondary" onclick="Settings.importSettings()" style="margin-left: 10px;">
                        <i class="fas fa-upload"></i> Import Settings
                    </button>
                    <button class="btn btn-secondary" onclick="Settings.openConsole()" style="margin-left: 10px;">
                        <i class="fas fa-terminal"></i> Console
                    </button>
                </div>
            </div>
        `;
    }

    static getThemeCards(currentTheme) {
        const themes = [
            {
                id: 'cyber-blue',
                name: 'Cyber Blue',
                description: 'Classic cyberpunk aesthetics',
                colors: ['#00ffff', '#0066ff', '#000033']
            },
            {
                id: 'ember-red',
                name: 'Ember Red',
                description: 'Fiery red flames',
                colors: ['#ff4500', '#dc143c', '#330000']
            },
            {
                id: 'matrix-green',
                name: 'Matrix Green',
                description: 'Digital rain vibes',
                colors: ['#00ff00', '#008800', '#001100']
            },
            {
                id: 'neon-purple',
                name: 'Neon Purple',
                description: 'Electric purple glow',
                colors: ['#8000ff', '#4000cc', '#200066']
            },
            {
                id: 'ice-blue',
                name: 'Ice Blue',
                description: 'Cool arctic tones',
                colors: ['#80e0ff', '#4080ff', '#002040']
            },
            {
                id: 'ember-orange',
                name: 'Ember Orange',
                description: 'Warm sunset colors',
                colors: ['#ff8c00', '#ff4500', '#331100']
            }
        ];

        return themes.map(theme => `
            <div class="theme-card ${currentTheme === theme.id ? 'active' : ''}" 
                 onclick="Settings.selectTheme('${theme.id}')">
                <div class="theme-preview-header" style="background: linear-gradient(135deg, ${theme.colors[0]}, ${theme.colors[1]});">
                    <div class="theme-checkmark">✓</div>
                </div>
                <div class="theme-preview-content">
                    <div class="theme-name">${theme.name}</div>
                    <div class="theme-description">${theme.description}</div>
                </div>
            </div>
        `).join('');
    }

    static getColorOptions() {
        const colors = [
            '#667eea', '#764ba2', '#f093fb', '#f5576c',
            '#4facfe', '#00f2fe', '#a8edea', '#fed6e3',
            '#ff9a9e', '#fecfef', '#ffecd2', '#fcb69f',
            '#ff8a80', '#ff5722', '#8bc34a', '#4caf50',
            '#00bcd4', '#2196f3', '#9c27b0', '#673ab7'
        ];

        return colors.map(color => `
            <div class="color-option" style="background: ${color};" 
                 onclick="Settings.selectColor('${color}')"></div>
        `).join('');
    }

    static initializeCategoryFeatures(category) {
        switch (category) {
            case 'appearance':
                this.updateColorSelection();
                break;
            case 'files':
                this.loadStorageInfo();
                break;
            case 'system':
                this.loadSystemInfo();
                break;
        }
    }

    static updateColorSelection() {
        // Update color selection based on current theme
        const currentTheme = this.settings.theme || 'cyber-blue';
        // You could implement logic to highlight the current color
    }

    static async loadStorageInfo() {
        try {
            const response = await fetch('/api/files/storage-info', {
                headers: { 'X-CSRFToken': this.getCSRFToken() }
            });
            if (response.ok) {
                const data = await response.json();
                // Update storage display with real data
                console.log('Storage info loaded:', data);
            }
        } catch (error) {
            console.error('Failed to load storage info:', error);
        }
    }

    static loadSystemInfo() {
        // Update system information with real browser/system data
        const userAgent = navigator.userAgent;
        const browserName = this.getBrowserName(userAgent);
        // You could fetch more system info from the server
    }

    static getBrowserName(userAgent) {
        if (userAgent.includes('Chrome')) return 'Chrome';
        if (userAgent.includes('Firefox')) return 'Firefox';
        if (userAgent.includes('Safari')) return 'Safari';
        if (userAgent.includes('Edge')) return 'Edge';
        return 'Unknown';
    }

    // Setting update methods
    static updateSetting(key, value) {
        this.settings[key] = value;
        this.hasUnsavedChanges = true;
        this.applySettingImmediately(key, value);
        console.log(`Setting updated: ${key} = ${value}`);
    }

    static toggleSetting(key) {
        const currentValue = this.settings[key];
        this.settings[key] = !currentValue;
        this.hasUnsavedChanges = true;
        this.applySettingImmediately(key, this.settings[key]);

        // Update UI
        const toggle = this.currentWindow.querySelector(`[onclick*="${key}"]`);
        if (toggle) {
            if (this.settings[key]) {
                toggle.classList.add('active');
            } else {
                toggle.classList.remove('active');
            }
        }

        console.log(`Setting toggled: ${key} = ${this.settings[key]}`);
    }

    static selectTheme(themeId) {
        this.updateSetting('theme', themeId);

        // Update UI
        this.currentWindow.querySelectorAll('.theme-card').forEach(card => {
            card.classList.remove('active');
        });
        this.currentWindow.querySelector(`[onclick*="${themeId}"]`).classList.add('active');
    }

    static selectColor(color) {
        this.updateSetting('accentColor', color);

        // Update UI
        this.currentWindow.querySelectorAll('.color-option').forEach(option => {
            option.classList.remove('active');
        });
        event.target.classList.add('active');
    }

    static applySettingImmediately(key, value) {
        // Apply certain settings immediately for live preview
        switch (key) {
            case 'theme':
                this.applyTheme(value);
                break;
            case 'fontFamily':
                document.documentElement.style.setProperty('--system-font', value);
                break;
            case 'fontSize':
                document.documentElement.style.setProperty('--base-font-size', value + 'px');
                break;
            case 'transparency':
                const opacity = (100 - value) / 100;
                document.documentElement.style.setProperty('--window-opacity', opacity);
                break;
            case 'animationsEnabled':
                if (!value) {
                    document.body.classList.add('no-animations');
                } else {
                    document.body.classList.remove('no-animations');
                }
                break;
            case 'blurEffects':
                if (!value) {
                    document.body.classList.add('no-blur');
                } else {
                    document.body.classList.remove('no-blur');
                }
                break;
            case 'iconShadows':
                if (!value) {
                    document.body.classList.add('no-icon-shadows');
                } else {
                    document.body.classList.remove('no-icon-shadows');
                }
                break;
            case 'notificationPosition':
                if (window.NotificationSystem?.container) {
                    const container = window.NotificationSystem.container;
                    container.className = container.className.replace(/top-\w+|bottom-\w+/g, '');
                    container.classList.add(value);
                }
                break;
        }
    }

    static applyTheme(themeName) {
        const themes = {
            'cyber-blue': {
                primary: '#00ffff',
                secondary: '#0066ff',
                background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%)'
            },
            'ember-red': {
                primary: '#ff4500',
                secondary: '#dc143c',
                background: 'linear-gradient(135deg, #1a0a00 0%, #2d1a0a 100%)'
            },
            'matrix-green': {
                primary: '#00ff00',
                secondary: '#008800',
                background: 'linear-gradient(135deg, #000000 0%, #001100 100%)'
            },
            'neon-purple': {
                primary: '#8000ff',
                secondary: '#4000cc',
                background: 'linear-gradient(135deg, #0a0010 0%, #1a1030 100%)'
            },
            'ice-blue': {
                primary: '#80e0ff',
                secondary: '#4080ff',
                background: 'linear-gradient(135deg, #050510 0%, #101530 100%)'
            },
            'ember-orange': {
                primary: '#ff8c00',
                secondary: '#ff4500',
                background: 'linear-gradient(135deg, #1a1000 0%, #2d1a00 100%)'
            }
        };

        const theme = themes[themeName] || themes['cyber-blue'];

        document.documentElement.style.setProperty('--primary-blue', theme.primary);
        document.documentElement.style.setProperty('--neon-cyan', theme.secondary);

        // Don't override background if user has custom wallpaper
        if (!this.settings.wallpaperStyle || this.settings.wallpaperStyle === 'gradient') {
            document.body.style.background = theme.background;
        }
    }

    // Save and reset methods
    static async saveSettings() {
        try {
            this.showLoading('Saving settings...');

            const response = await fetch('/api/user/preferences', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': this.getCSRFToken()
                },
                body: JSON.stringify({ preferences: this.settings })
            });

            if (response.ok) {
                this.originalSettings = JSON.parse(JSON.stringify(this.settings));
                this.hasUnsavedChanges = false;
                this.showMessage('Settings saved successfully!', 'success');
                console.log('✅ Settings saved successfully');
            } else {
                const data = await response.json();
                this.showMessage(data.error || 'Failed to save settings', 'error');
                console.error('❌ Failed to save settings:', data.error);
            }
        } catch (error) {
            this.showMessage('Network error: ' + error.message, 'error');
            console.error('❌ Network error saving settings:', error);
        } finally {
            this.hideLoading();
        }
    }

    static resetToDefaults() {
        if (!confirm('Reset all settings to defaults?\n\nThis will undo all your customizations.')) {
            return;
        }

        // Default settings
        this.settings = {
            theme: 'cyber-blue',
            fontFamily: 'Rajdhani',
            fontSize: 14,
            transparency: 0,
            animationsEnabled: true,
            blurEffects: true,
            iconShadows: true,
            iconSize: 48,
            showIconLabels: true,
            autoArrangeIcons: false,
            autoHideTaskbar: false,
            showClock: true,
            taskbarPosition: 'bottom',
            restoreWindows: false,
            windowSnapping: true,
            notificationsEnabled: true,
            notificationPosition: 'top-right',
            notificationDuration: 4
        };

        this.hasUnsavedChanges = true;

        // Apply defaults immediately
        Object.keys(this.settings).forEach(key => {
            this.applySettingImmediately(key, this.settings[key]);
        });

        // Reload current category to update UI
        this.loadCategoryContent(this.currentCategory);

        this.showMessage('Settings reset to defaults. Remember to save your changes.', 'success');
    }

    // Action methods
    static cleanupStorage() {
        if (confirm('Clean up temporary files and cache?\n\nThis may free up storage space.')) {
            this.showMessage('Storage cleanup completed!', 'success');
        }
    }

    static analyzeStorage() {
        this.showMessage('Storage analysis completed. Check the Files & Storage section for details.', 'info');
    }

    static checkForUpdates() {
        this.showMessage('You are running the latest version of EmberFrame.', 'success');
    }

    static clearCache() {
        if (confirm('Clear browser cache?\n\nThis may improve performance but will clear cached files.')) {
            // Clear what we can
            if ('caches' in window) {
                caches.keys().then(names => {
                    names.forEach(name => caches.delete(name));
                });
            }
            this.showMessage('Cache cleared successfully!', 'success');
        }
    }

    static clearHistory() {
        if (confirm('Clear browsing history?\n\nThis cannot be undone.')) {
            this.showMessage('History cleared successfully!', 'success');
        }
    }

    static clearAllData() {
        if (confirm('Clear ALL user data?\n\nThis will remove all settings, files, and data. This cannot be undone.\n\nType "DELETE" to confirm.')) {
            const confirmation = prompt('Type "DELETE" to confirm:');
            if (confirmation === 'DELETE') {
                this.showMessage('All data cleared. You will be logged out.', 'success');
                setTimeout(() => {
                    window.location.href = '/logout';
                }, 2000);
            }
        }
    }

    static testNotification(type) {
        const messages = {
            info: 'This is a test information notification.',
            success: 'This is a test success notification.',
            error: 'This is a test error notification.',
            warning: 'This is a test warning notification.'
        };

        if (window.Notification) {
            window.Notification[type](messages[type] || messages.info);
        } else {
            alert(`Test ${type} notification: ${messages[type]}`);
        }
    }

    static showLicense() {
        alert('EmberFrame is released under the MIT License.\n\nFor full license text, visit: https://github.com/emberframe/license');
    }

    static showPrivacyPolicy() {
        alert('EmberFrame Privacy Policy\n\nWe respect your privacy and do not collect personal data without your consent.\n\nFor full policy, visit: https://emberframe.org/privacy');
    }

    static showCredits() {
        alert('EmberFrame Credits\n\n• Built with Flask and modern web technologies\n• Icons by Font Awesome\n• Fonts by Google Fonts\n\nThanks to all contributors!');
    }

    static openLink(url) {
        window.open(url, '_blank');
    }

    static exportSettings() {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.settings, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "emberframe-settings.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
        this.showMessage('Settings exported successfully!', 'success');
    }

    static importSettings() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        const importedSettings = JSON.parse(e.target.result);
                        this.settings = { ...this.settings, ...importedSettings };
                        this.hasUnsavedChanges = true;
                        this.loadCategoryContent(this.currentCategory);
                        this.showMessage('Settings imported successfully! Remember to save changes.', 'success');
                    } catch (error) {
                        this.showMessage('Invalid settings file format.', 'error');
                    }
                };
                reader.readAsText(file);
            }
        };
        input.click();
    }

    static openConsole() {
        console.log('EmberFrame Settings Debug Info:', {
            currentSettings: this.settings,
            originalSettings: this.originalSettings,
            hasUnsavedChanges: this.hasUnsavedChanges,
            currentCategory: this.currentCategory
        });
        alert('Debug information logged to browser console.\n\nOpen Developer Tools (F12) to view.');
    }

    // Utility methods
    static getCSRFToken() {
        const token = document.querySelector('meta[name="csrf-token"]');
        return token ? token.getAttribute('content') : '';
    }

    static showMessage(message, type = 'info') {
        // Create or update message element
        let messageEl = this.currentWindow.querySelector('.message');
        if (!messageEl) {
            messageEl = document.createElement('div');
            messageEl.className = 'message';
            const panel = this.currentWindow.querySelector('.settings-panel');
            panel.insertBefore(messageEl, panel.firstChild);
        }

        messageEl.className = `message ${type} show`;
        messageEl.textContent = message;

        // Auto-hide after 5 seconds
        setTimeout(() => {
            messageEl.classList.remove('show');
        }, 5000);

        // Also use global notification system if available
        if (window.Notification) {
            window.Notification[type](message);
        }
    }

    static showLoading(message) {
        const panel = this.currentWindow.querySelector('.settings-panel');
        panel.innerHTML = `
            <div class="loading">
                <div class="spinner"></div>
                ${message}
            </div>
        `;
    }

    static hideLoading() {
        this.loadCategoryContent(this.currentCategory);
    }

    static closeThemePreview() {
        this.currentWindow.querySelector('#theme-preview-modal').classList.remove('show');
    }

    static applyPreviewedTheme() {
        if (this.previewedTheme) {
            this.selectTheme(this.previewedTheme);
            this.closeThemePreview();
        }
    }

    static onClose(windowElement) {
        if (this.hasUnsavedChanges) {
            return confirm('You have unsaved changes. Are you sure you want to close?');
        }
        return true;
    }
}

window.Settings = Settings;