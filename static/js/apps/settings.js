/**
 * APP_METADATA
 * @name Settings
 * @icon fas fa-cog
 * @description Comprehensive system settings and personalization
 * @category System
 * @version 3.0.0
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
                        <div class="settings-category active" data-category="appearance">
                            <i class="fas fa-paint-brush"></i>
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
                        <div class="settings-category" data-category="privacy">
                            <i class="fas fa-shield-alt"></i>
                            <span>Privacy</span>
                        </div>
                        <div class="settings-category" data-category="performance">
                            <i class="fas fa-tachometer-alt"></i>
                            <span>Performance</span>
                        </div>
                        <div class="settings-category" data-category="system">
                            <i class="fas fa-microchip"></i>
                            <span>System</span>
                        </div>
                        <div class="settings-category" data-category="about">
                            <i class="fas fa-info-circle"></i>
                            <span>About</span>
                        </div>
                    </div>

                    <div class="settings-content">
                        <!-- Appearance Settings -->
                        <div class="settings-panel active" id="appearance-panel">
                            <div class="panel-header">
                                <h2>🎨 Appearance & Personalization</h2>
                                <p>Customize your EmberFrame experience with themes, colors, and visual effects.</p>
                            </div>

                            <div class="settings-section">
                                <h3>🌈 Theme Selection</h3>
                                <div class="theme-grid">
                                    <div class="theme-card" data-theme="cyber-blue">
                                        <div class="theme-preview cyber-blue"></div>
                                        <div class="theme-name">Cyber Blue</div>
                                        <div class="theme-description">Classic cyberpunk aesthetic</div>
                                    </div>
                                    <div class="theme-card" data-theme="ember-red">
                                        <div class="theme-preview ember-red"></div>
                                        <div class="theme-name">Ember Red</div>
                                        <div class="theme-description">Fiery red theme</div>
                                    </div>
                                    <div class="theme-card" data-theme="matrix-green">
                                        <div class="theme-preview matrix-green"></div>
                                        <div class="theme-name">Matrix Green</div>
                                        <div class="theme-description">Classic matrix style</div>
                                    </div>
                                    <div class="theme-card" data-theme="neon-purple">
                                        <div class="theme-preview neon-purple"></div>
                                        <div class="theme-name">Neon Purple</div>
                                        <div class="theme-description">Electric purple vibes</div>
                                    </div>
                                    <div class="theme-card" data-theme="ice-blue">
                                        <div class="theme-preview ice-blue"></div>
                                        <div class="theme-name">Ice Blue</div>
                                        <div class="theme-description">Cool arctic theme</div>
                                    </div>
                                    <div class="theme-card" data-theme="ember-orange">
                                        <div class="theme-preview ember-orange"></div>
                                        <div class="theme-name">Ember Orange</div>
                                        <div class="theme-description">Warm orange glow</div>
                                    </div>
                                </div>
                            </div>

                            <div class="settings-section">
                                <h3>🖼️ Wallpaper Settings</h3>
                                <div class="wallpaper-controls">
                                    <div class="wallpaper-options">
                                        <label class="radio-option">
                                            <input type="radio" name="wallpaper-type" value="gradient" checked>
                                            <span class="radio-custom"></span>
                                            <span>Theme Gradient</span>
                                        </label>
                                        <label class="radio-option">
                                            <input type="radio" name="wallpaper-type" value="solid">
                                            <span class="radio-custom"></span>
                                            <span>Solid Color</span>
                                        </label>
                                        <label class="radio-option">
                                            <input type="radio" name="wallpaper-type" value="image">
                                            <span class="radio-custom"></span>
                                            <span>Custom Image</span>
                                        </label>
                                    </div>
                                    <div class="wallpaper-settings">
                                        <div class="color-picker-container">
                                            <label>Background Color:</label>
                                            <input type="color" id="bg-color-picker" value="#0a0a0f">
                                        </div>
                                        <div class="image-upload-container">
                                            <input type="file" id="wallpaper-upload" accept="image/*" style="display: none;">
                                            <button class="btn btn-secondary" onclick="document.getElementById('wallpaper-upload').click()">
                                                <i class="fas fa-upload"></i> Upload Image
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="settings-section">
                                <h3>🔤 Font & Typography</h3>
                                <div class="font-settings">
                                    <div class="setting-group">
                                        <label>Font Family:</label>
                                        <select id="font-family-select">
                                            <option value="'Rajdhani', sans-serif">Rajdhani (Default)</option>
                                            <option value="'Orbitron', monospace">Orbitron (Futuristic)</option>
                                            <option value="'Roboto', sans-serif">Roboto (Clean)</option>
                                            <option value="'Fira Code', monospace">Fira Code (Developer)</option>
                                            <option value="'Inter', sans-serif">Inter (Modern)</option>
                                            <option value="'JetBrains Mono', monospace">JetBrains Mono</option>
                                        </select>
                                    </div>
                                    <div class="setting-group">
                                        <label>Font Size:</label>
                                        <div class="slider-group">
                                            <input type="range" id="font-size-slider" min="12" max="18" value="14" step="1">
                                            <span id="font-size-display">14px</span>
                                        </div>
                                    </div>
                                    <div class="setting-group">
                                        <label>Icon Size:</label>
                                        <div class="slider-group">
                                            <input type="range" id="icon-size-slider" min="32" max="64" value="48" step="4">
                                            <span id="icon-size-display">48px</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="settings-section">
                                <h3>✨ Visual Effects</h3>
                                <div class="effects-grid">
                                    <div class="effect-option">
                                        <label class="switch">
                                            <input type="checkbox" id="animations-enabled" checked>
                                            <span class="slider-switch"></span>
                                        </label>
                                        <div class="effect-info">
                                            <div class="effect-name">Animations</div>
                                            <div class="effect-desc">Enable smooth transitions and animations</div>
                                        </div>
                                    </div>
                                    <div class="effect-option">
                                        <label class="switch">
                                            <input type="checkbox" id="blur-effects" checked>
                                            <span class="slider-switch"></span>
                                        </label>
                                        <div class="effect-info">
                                            <div class="effect-name">Blur Effects</div>
                                            <div class="effect-desc">Glass morphism and backdrop blur</div>
                                        </div>
                                    </div>
                                    <div class="effect-option">
                                        <label class="switch">
                                            <input type="checkbox" id="icon-shadows" checked>
                                            <span class="slider-switch"></span>
                                        </label>
                                        <div class="effect-info">
                                            <div class="effect-name">Icon Shadows</div>
                                            <div class="effect-desc">Drop shadows on desktop icons</div>
                                        </div>
                                    </div>
                                    <div class="effect-option">
                                        <label class="switch">
                                            <input type="checkbox" id="particle-effects">
                                            <span class="slider-switch"></span>
                                        </label>
                                        <div class="effect-info">
                                            <div class="effect-name">Particle Effects</div>
                                            <div class="effect-desc">Floating particles on desktop</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="settings-section">
                                <h3>🎛️ Transparency & Opacity</h3>
                                <div class="transparency-controls">
                                    <div class="setting-group">
                                        <label>Window Transparency:</label>
                                        <div class="slider-group">
                                            <input type="range" id="window-transparency" min="0" max="50" value="0" step="5">
                                            <span id="transparency-display">0%</span>
                                        </div>
                                    </div>
                                    <div class="setting-group">
                                        <label>Taskbar Transparency:</label>
                                        <div class="slider-group">
                                            <input type="range" id="taskbar-transparency" min="0" max="30" value="5" step="5">
                                            <span id="taskbar-transparency-display">5%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Desktop Settings -->
                        <div class="settings-panel" id="desktop-panel">
                            <div class="panel-header">
                                <h2>🖥️ Desktop & Interface</h2>
                                <p>Configure desktop behavior, taskbar settings, and window management.</p>
                            </div>

                            <div class="settings-section">
                                <h3>📋 Taskbar Settings</h3>
                                <div class="desktop-options">
                                    <div class="option-row">
                                        <label class="switch">
                                            <input type="checkbox" id="auto-hide-taskbar">
                                            <span class="slider-switch"></span>
                                        </label>
                                        <div class="option-info">
                                            <div class="option-name">Auto-hide Taskbar</div>
                                            <div class="option-desc">Hide taskbar when not in use</div>
                                        </div>
                                    </div>
                                    <div class="option-row">
                                        <label class="switch">
                                            <input type="checkbox" id="show-clock" checked>
                                            <span class="slider-switch"></span>
                                        </label>
                                        <div class="option-info">
                                            <div class="option-name">Show Clock</div>
                                            <div class="option-desc">Display time in system tray</div>
                                        </div>
                                    </div>
                                    <div class="option-row">
                                        <label class="switch">
                                            <input type="checkbox" id="show-username" checked>
                                            <span class="slider-switch"></span>
                                        </label>
                                        <div class="option-info">
                                            <div class="option-name">Show Username</div>
                                            <div class="option-desc">Display username in taskbar</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="settings-section">
                                <h3>🏠 Desktop Icons</h3>
                                <div class="desktop-options">
                                    <div class="option-row">
                                        <label class="switch">
                                            <input type="checkbox" id="show-icon-labels" checked>
                                            <span class="slider-switch"></span>
                                        </label>
                                        <div class="option-info">
                                            <div class="option-name">Show Icon Labels</div>
                                            <div class="option-desc">Display text under desktop icons</div>
                                        </div>
                                    </div>
                                    <div class="option-row">
                                        <label class="switch">
                                            <input type="checkbox" id="grid-snap" checked>
                                            <span class="slider-switch"></span>
                                        </label>
                                        <div class="option-info">
                                            <div class="option-name">Snap to Grid</div>
                                            <div class="option-desc">Align icons to invisible grid</div>
                                        </div>
                                    </div>
                                    <div class="option-row">
                                        <label class="switch">
                                            <input type="checkbox" id="double-click-open" checked>
                                            <span class="slider-switch"></span>
                                        </label>
                                        <div class="option-info">
                                            <div class="option-name">Double-click to Open</div>
                                            <div class="option-desc">Require double-click to open items</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="settings-section">
                                <h3>🪟 Window Management</h3>
                                <div class="desktop-options">
                                    <div class="option-row">
                                        <label class="switch">
                                            <input type="checkbox" id="restore-windows">
                                            <span class="slider-switch"></span>
                                        </label>
                                        <div class="option-info">
                                            <div class="option-name">Restore Windows</div>
                                            <div class="option-desc">Restore window positions on login</div>
                                        </div>
                                    </div>
                                    <div class="option-row">
                                        <label class="switch">
                                            <input type="checkbox" id="window-shadows" checked>
                                            <span class="slider-switch"></span>
                                        </label>
                                        <div class="option-info">
                                            <div class="option-name">Window Shadows</div>
                                            <div class="option-desc">Drop shadows around windows</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="settings-section">
                                <h3>🔔 Notifications</h3>
                                <div class="notification-settings">
                                    <div class="setting-group">
                                        <label>Notification Position:</label>
                                        <select id="notification-position">
                                            <option value="top-right">Top Right</option>
                                            <option value="top-left">Top Left</option>
                                            <option value="bottom-right">Bottom Right</option>
                                            <option value="bottom-left">Bottom Left</option>
                                        </select>
                                    </div>
                                    <div class="option-row">
                                        <label class="switch">
                                            <input type="checkbox" id="notification-sounds">
                                            <span class="slider-switch"></span>
                                        </label>
                                        <div class="option-info">
                                            <div class="option-name">Notification Sounds</div>
                                            <div class="option-desc">Play sound for notifications</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Files & Storage -->
                        <div class="settings-panel" id="files-panel">
                            <div class="panel-header">
                                <h2>📁 Files & Storage</h2>
                                <p>Manage your file storage, downloads, and file management preferences.</p>
                            </div>

                            <div class="settings-section">
                                <h3>💾 Storage Usage</h3>
                                <div class="storage-overview">
                                    <div class="storage-visual">
                                        <div class="storage-circle">
                                            <div class="storage-text">
                                                <div id="storage-used-percent">0%</div>
                                                <div>Used</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="storage-details">
                                        <div class="storage-item">
                                            <span>Used:</span>
                                            <span id="storage-used-size">0 MB</span>
                                        </div>
                                        <div class="storage-item">
                                            <span>Available:</span>
                                            <span id="storage-available">100 MB</span>
                                        </div>
                                        <div class="storage-item">
                                            <span>Total:</span>
                                            <span id="storage-total">100 MB</span>
                                        </div>
                                    </div>
                                </div>
                                <button class="btn btn-primary" onclick="Settings.analyzeStorage()">
                                    <i class="fas fa-chart-pie"></i> Analyze Storage
                                </button>
                            </div>

                            <div class="settings-section">
                                <h3>📥 Download Settings</h3>
                                <div class="download-settings">
                                    <div class="setting-group">
                                        <label>Default Download Location:</label>
                                        <div class="path-selector">
                                            <input type="text" id="download-path" value="home/Downloads" readonly>
                                            <button class="btn btn-secondary" onclick="Settings.selectDownloadPath()">Browse</button>
                                        </div>
                                    </div>
                                    <div class="option-row">
                                        <label class="switch">
                                            <input type="checkbox" id="ask-download-location">
                                            <span class="slider-switch"></span>
                                        </label>
                                        <div class="option-info">
                                            <div class="option-name">Ask Where to Save</div>
                                            <div class="option-desc">Prompt for location before downloading</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="settings-section">
                                <h3>🗂️ File Manager</h3>
                                <div class="file-manager-settings">
                                    <div class="setting-group">
                                        <label>Default View:</label>
                                        <select id="file-manager-view">
                                            <option value="grid">Grid View</option>
                                            <option value="list">List View</option>
                                        </select>
                                    </div>
                                    <div class="option-row">
                                        <label class="switch">
                                            <input type="checkbox" id="show-hidden-files">
                                            <span class="slider-switch"></span>
                                        </label>
                                        <div class="option-info">
                                            <div class="option-name">Show Hidden Files</div>
                                            <div class="option-desc">Display files starting with .</div>
                                        </div>
                                    </div>
                                    <div class="option-row">
                                        <label class="switch">
                                            <input type="checkbox" id="confirm-deletions" checked>
                                            <span class="slider-switch"></span>
                                        </label>
                                        <div class="option-info">
                                            <div class="option-name">Confirm Deletions</div>
                                            <div class="option-desc">Ask before deleting files</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Privacy Settings -->
                        <div class="settings-panel" id="privacy-panel">
                            <div class="panel-header">
                                <h2>🛡️ Privacy & Security</h2>
                                <p>Control your privacy settings and security preferences.</p>
                            </div>

                            <div class="settings-section">
                                <h3>🔐 Security Settings</h3>
                                <div class="security-options">
                                    <div class="option-row">
                                        <label class="switch">
                                            <input type="checkbox" id="auto-lock" checked>
                                            <span class="slider-switch"></span>
                                        </label>
                                        <div class="option-info">
                                            <div class="option-name">Auto-lock Session</div>
                                            <div class="option-desc">Lock after period of inactivity</div>
                                        </div>
                                    </div>
                                    <div class="setting-group">
                                        <label>Lock After (minutes):</label>
                                        <select id="lock-timeout">
                                            <option value="5">5 minutes</option>
                                            <option value="10">10 minutes</option>
                                            <option value="30" selected>30 minutes</option>
                                            <option value="60">1 hour</option>
                                            <option value="0">Never</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="settings-section">
                                <h3>📊 Activity Tracking</h3>
                                <div class="privacy-options">
                                    <div class="option-row">
                                        <label class="switch">
                                            <input type="checkbox" id="log-activities" checked>
                                            <span class="slider-switch"></span>
                                        </label>
                                        <div class="option-info">
                                            <div class="option-name">Log Activities</div>
                                            <div class="option-desc">Keep activity logs for troubleshooting</div>
                                        </div>
                                    </div>
                                    <div class="option-row">
                                        <label class="switch">
                                            <input type="checkbox" id="analytics" checked>
                                            <span class="slider-switch"></span>
                                        </label>
                                        <div class="option-info">
                                            <div class="option-name">Usage Analytics</div>
                                            <div class="option-desc">Help improve EmberFrame</div>
                                        </div>
                                    </div>
                                </div>
                                <button class="btn btn-secondary" onclick="Settings.clearActivityLogs()">
                                    <i class="fas fa-trash"></i> Clear Activity Logs
                                </button>
                            </div>
                        </div>

                        <!-- Performance Settings -->
                        <div class="settings-panel" id="performance-panel">
                            <div class="panel-header">
                                <h2>⚡ Performance & Optimization</h2>
                                <p>Optimize EmberFrame for your system's capabilities.</p>
                            </div>

                            <div class="settings-section">
                                <h3>🎭 Animation Quality</h3>
                                <div class="animation-settings">
                                    <div class="quality-options">
                                        <label class="radio-option">
                                            <input type="radio" name="animation-quality" value="high" checked>
                                            <span class="radio-custom"></span>
                                            <span>High Quality</span>
                                        </label>
                                        <label class="radio-option">
                                            <input type="radio" name="animation-quality" value="medium">
                                            <span class="radio-custom"></span>
                                            <span>Medium Quality</span>
                                        </label>
                                        <label class="radio-option">
                                            <input type="radio" name="animation-quality" value="low">
                                            <span class="radio-custom"></span>
                                            <span>Low Quality</span>
                                        </label>
                                        <label class="radio-option">
                                            <input type="radio" name="animation-quality" value="none">
                                            <span class="radio-custom"></span>
                                            <span>Disabled</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div class="settings-section">
                                <h3>🚀 Performance Options</h3>
                                <div class="performance-options">
                                    <div class="option-row">
                                        <label class="switch">
                                            <input type="checkbox" id="hardware-acceleration" checked>
                                            <span class="slider-switch"></span>
                                        </label>
                                        <div class="option-info">
                                            <div class="option-name">Hardware Acceleration</div>
                                            <div class="option-desc">Use GPU for better performance</div>
                                        </div>
                                    </div>
                                    <div class="option-row">
                                        <label class="switch">
                                            <input type="checkbox" id="preload-apps">
                                            <span class="slider-switch"></span>
                                        </label>
                                        <div class="option-info">
                                            <div class="option-name">Preload Apps</div>
                                            <div class="option-desc">Load apps in background for faster startup</div>
                                        </div>
                                    </div>
                                    <div class="option-row">
                                        <label class="switch">
                                            <input type="checkbox" id="memory-optimization" checked>
                                            <span class="slider-switch"></span>
                                        </label>
                                        <div class="option-info">
                                            <div class="option-name">Memory Optimization</div>
                                            <div class="option-desc">Automatically free unused memory</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="settings-section">
                                <h3>📈 System Resources</h3>
                                <div class="resource-monitor">
                                    <div class="resource-item">
                                        <div class="resource-label">Memory Usage</div>
                                        <div class="resource-bar">
                                            <div class="resource-fill" id="memory-usage-bar" style="width: 45%"></div>
                                        </div>
                                        <div class="resource-value" id="memory-usage-text">45%</div>
                                    </div>
                                    <div class="resource-item">
                                        <div class="resource-label">CPU Usage</div>
                                        <div class="resource-bar">
                                            <div class="resource-fill" id="cpu-usage-bar" style="width: 23%"></div>
                                        </div>
                                        <div class="resource-value" id="cpu-usage-text">23%</div>
                                    </div>
                                </div>
                                <button class="btn btn-primary" onclick="Settings.optimizeSystem()">
                                    <i class="fas fa-magic"></i> Optimize Now
                                </button>
                            </div>
                        </div>

                        <!-- System Settings -->
                        <div class="settings-panel" id="system-panel">
                            <div class="panel-header">
                                <h2>🔧 System Information</h2>
                                <p>View system details and manage system-level settings.</p>
                            </div>

                            <div class="settings-section">
                                <h3>💻 System Information</h3>
                                <div class="system-info">
                                    <div class="info-row">
                                        <span class="info-label">EmberFrame Version:</span>
                                        <span class="info-value">3.0.0</span>
                                    </div>
                                    <div class="info-row">
                                        <span class="info-label">Browser:</span>
                                        <span class="info-value" id="browser-info">Loading...</span>
                                    </div>
                                    <div class="info-row">
                                        <span class="info-label">Screen Resolution:</span>
                                        <span class="info-value" id="screen-resolution">Loading...</span>
                                    </div>
                                    <div class="info-row">
                                        <span class="info-label">Session Started:</span>
                                        <span class="info-value" id="session-time">Loading...</span>
                                    </div>
                                    <div class="info-row">
                                        <span class="info-label">User Agent:</span>
                                        <span class="info-value" id="user-agent">Loading...</span>
                                    </div>
                                </div>
                            </div>

                            <div class="settings-section">
                                <h3>🔄 System Maintenance</h3>
                                <div class="maintenance-actions">
                                    <button class="btn btn-secondary" onclick="Settings.clearCache()">
                                        <i class="fas fa-broom"></i> Clear Cache
                                    </button>
                                    <button class="btn btn-secondary" onclick="Settings.resetSettings()">
                                        <i class="fas fa-undo"></i> Reset to Defaults
                                    </button>
                                    <button class="btn btn-secondary" onclick="Settings.exportSettings()">
                                        <i class="fas fa-download"></i> Export Settings
                                    </button>
                                    <button class="btn btn-secondary" onclick="Settings.importSettings()">
                                        <i class="fas fa-upload"></i> Import Settings
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- About Settings -->
                        <div class="settings-panel" id="about-panel">
                            <div class="panel-header">
                                <h2>ℹ️ About EmberFrame</h2>
                                <p>Learn more about EmberFrame and get support.</p>
                            </div>

                            <div class="settings-section">
                                <div class="about-content">
                                    <div class="about-logo">🔥</div>
                                    <h2>EmberFrame Desktop Environment</h2>
                                    <div class="version-info">Version 3.0.0</div>
                                    <p class="about-description">
                                        EmberFrame is a modern, web-based desktop environment that brings the power 
                                        of traditional desktop computing to your browser. Experience the future of 
                                        computing with cyberpunk aesthetics and cutting-edge technology.
                                    </p>
                                    
                                    <div class="feature-highlights">
                                        <div class="feature-item">
                                            <i class="fas fa-window-restore"></i>
                                            <span>Multi-Window Management</span>
                                        </div>
                                        <div class="feature-item">
                                            <i class="fas fa-folder"></i>
                                            <span>Advanced File System</span>
                                        </div>
                                        <div class="feature-item">
                                            <i class="fas fa-paint-brush"></i>
                                            <span>Customizable Themes</span>
                                        </div>
                                        <div class="feature-item">
                                            <i class="fas fa-mobile-alt"></i>
                                            <span>Mobile Responsive</span>
                                        </div>
                                    </div>

                                    <div class="about-actions">
                                        <button class="btn btn-primary" onclick="Settings.checkUpdates()">
                                            <i class="fas fa-sync-alt"></i> Check for Updates
                                        </button>
                                        <button class="btn btn-secondary" onclick="Settings.viewChangelog()">
                                            <i class="fas fa-list"></i> View Changelog
                                        </button>
                                        <button class="btn btn-secondary" onclick="Settings.reportIssue()">
                                            <i class="fas fa-bug"></i> Report Issue
                                        </button>
                                    </div>

                                    <div class="copyright">
                                        <p>&copy; 2024 EmberFrame Team. All rights reserved.</p>
                                        <p>Made with 🔥 and passion for the future of computing.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="settings-footer">
                        <div class="footer-left">
                            <button class="btn btn-secondary" onclick="Settings.resetCurrentPanel()">
                                <i class="fas fa-undo"></i> Reset Panel
                            </button>
                        </div>
                        <div class="footer-right">
                            <button class="btn btn-secondary" onclick="Settings.close()">Cancel</button>
                            <button class="btn btn-primary" onclick="Settings.saveAllSettings()">
                                <i class="fas fa-save"></i> Save Changes
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Hidden file input for importing -->
                <input type="file" id="settings-import-input" accept=".json" style="display: none;">

                <style>
                    .settings-app {
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        background: #f8f9fa;
                        font-family: 'Segoe UI', system-ui, sans-serif;
                        color: #2c3e50;
                        overflow: hidden;
                    }

                    .settings-sidebar {
                        width: 200px;
                        background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        padding: 20px 0;
                        overflow-y: auto;
                        flex-shrink: 0;
                    }

                    .settings-category {
                        display: flex;
                        align-items: center;
                        gap: 12px;
                        padding: 12px 20px;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        font-size: 14px;
                        font-weight: 500;
                        margin: 2px 10px;
                        border-radius: 8px;
                    }

                    .settings-category:hover {
                        background: rgba(255, 255, 255, 0.1);
                        transform: translateX(5px);
                    }

                    .settings-category.active {
                        background: rgba(255, 255, 255, 0.2);
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
                    }

                    .settings-category i {
                        width: 16px;
                        text-align: center;
                    }

                    .settings-content {
                        flex: 1;
                        display: flex;
                        overflow: hidden;
                    }

                    .settings-container {
                        height: 100%;
                        display: flex;
                        background: linear-gradient(135deg, #f8f9fb 0%, #e9ecf3 100%);
                        font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
                        color: #2c3e50;
                        overflow: hidden;
                    }

                    .settings-panel {
                        flex: 1;
                        padding: 25px;
                        overflow-y: auto;
                        display: none;
                    }

                    .settings-panel.active {
                        display: block;
                    }

                    .panel-header {
                        margin-bottom: 30px;
                        padding-bottom: 20px;
                        border-bottom: 2px solid #e9ecef;
                    }

                    .panel-header h2 {
                        margin: 0 0 8px 0;
                        color: #2c3e50;
                        font-size: 24px;
                        font-weight: 700;
                    }

                    .panel-header p {
                        margin: 0;
                        color: #6c757d;
                        font-size: 14px;
                    }

                    .settings-section {
                        margin-bottom: 25px;
                        background: white;
                        border-radius: 12px;
                        padding: 20px;
                        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
                        border: 1px solid #e9ecef;
                    }

                    .settings-section h3 {
                        margin: 0 0 20px 0;
                        color: #495057;
                        font-size: 16px;
                        font-weight: 600;
                        border-bottom: 1px solid #f8f9fa;
                        padding-bottom: 8px;
                    }

                    /* Theme Grid */
                    .theme-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
                        gap: 15px;
                    }

                    .theme-card {
                        text-align: center;
                        cursor: pointer;
                        padding: 12px;
                        border-radius: 8px;
                        border: 2px solid transparent;
                        transition: all 0.3s ease;
                        background: #f8f9fa;
                    }

                    .theme-card:hover {
                        border-color: #667eea;
                        transform: translateY(-2px);
                        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
                    }

                    .theme-card.active {
                        border-color: #667eea;
                        background: #e8f0fe;
                    }

                    .theme-preview {
                        width: 100%;
                        height: 60px;
                        border-radius: 6px;
                        margin-bottom: 8px;
                        position: relative;
                        overflow: hidden;
                    }

                    .theme-preview.cyber-blue {
                        background: linear-gradient(135deg, #00ffff, #0066ff);
                    }

                    .theme-preview.ember-red {
                        background: linear-gradient(135deg, #ff4500, #dc143c);
                    }

                    .theme-preview.matrix-green {
                        background: linear-gradient(135deg, #00ff00, #008800);
                    }

                    .theme-preview.neon-purple {
                        background: linear-gradient(135deg, #8000ff, #4000cc);
                    }

                    .theme-preview.ice-blue {
                        background: linear-gradient(135deg, #80e0ff, #4080ff);
                    }

                    .theme-preview.ember-orange {
                        background: linear-gradient(135deg, #ff8c00, #ff4500);
                    }

                    .theme-name {
                        font-weight: 600;
                        font-size: 13px;
                        margin-bottom: 4px;
                        color: #495057;
                    }

                    .theme-description {
                        font-size: 11px;
                        color: #6c757d;
                    }

                    /* Controls */
                    .wallpaper-controls {
                        display: flex;
                        flex-direction: column;
                        gap: 15px;
                    }

                    .wallpaper-options {
                        display: flex;
                        gap: 20px;
                        flex-wrap: wrap;
                    }

                    .radio-option {
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        cursor: pointer;
                        font-size: 14px;
                    }

                    .radio-custom {
                        width: 16px;
                        height: 16px;
                        border: 2px solid #667eea;
                        border-radius: 50%;
                        position: relative;
                    }

                    .radio-option input[type="radio"] {
                        display: none;
                    }

                    .radio-option input[type="radio"]:checked + .radio-custom::after {
                        content: '';
                        position: absolute;
                        top: 2px;
                        left: 2px;
                        width: 8px;
                        height: 8px;
                        background: #667eea;
                        border-radius: 50%;
                    }

                    .wallpaper-settings {
                        display: flex;
                        gap: 20px;
                        flex-wrap: wrap;
                        align-items: center;
                    }

                    .color-picker-container,
                    .image-upload-container {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                    }

                    .font-settings,
                    .transparency-controls,
                    .notification-settings {
                        display: flex;
                        flex-direction: column;
                        gap: 15px;
                    }

                    .setting-group {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        gap: 15px;
                    }

                    .setting-group label {
                        font-weight: 500;
                        color: #495057;
                        font-size: 14px;
                        min-width: 120px;
                    }

                    .setting-group select,
                    .setting-group input[type="text"] {
                        padding: 8px 12px;
                        border: 1px solid #ced4da;
                        border-radius: 6px;
                        font-size: 14px;
                        min-width: 150px;
                    }

                    .slider-group {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        min-width: 180px;
                    }

                    .slider-group input[type="range"] {
                        flex: 1;
                    }

                    .slider-group span {
                        min-width: 40px;
                        font-weight: 500;
                        color: #667eea;
                        font-size: 13px;
                    }

                    /* Effects Grid */
                    .effects-grid,
                    .desktop-options,
                    .security-options,
                    .privacy-options,
                    .performance-options {
                        display: flex;
                        flex-direction: column;
                        gap: 15px;
                    }

                    .effect-option,
                    .option-row {
                        display: flex;
                        align-items: center;
                        gap: 15px;
                        padding: 12px;
                        background: #f8f9fa;
                        border-radius: 8px;
                        border: 1px solid #e9ecef;
                    }

                    .effect-info,
                    .option-info {
                        flex: 1;
                    }

                    .effect-name,
                    .option-name {
                        font-weight: 500;
                        color: #495057;
                        font-size: 14px;
                        margin-bottom: 2px;
                    }

                    .effect-desc,
                    .option-desc {
                        font-size: 12px;
                        color: #6c757d;
                    }

                    /* Switch */
                    .switch {
                        position: relative;
                        display: inline-block;
                        width: 48px;
                        height: 24px;
                        flex-shrink: 0;
                    }

                    .switch input {
                        opacity: 0;
                        width: 0;
                        height: 0;
                    }

                    .slider-switch {
                        position: absolute;
                        cursor: pointer;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background-color: #ccc;
                        transition: 0.3s;
                        border-radius: 24px;
                    }

                    .slider-switch:before {
                        position: absolute;
                        content: "";
                        height: 18px;
                        width: 18px;
                        left: 3px;
                        bottom: 3px;
                        background-color: white;
                        transition: 0.3s;
                        border-radius: 50%;
                    }

                    input:checked + .slider-switch {
                        background-color: #667eea;
                    }

                    input:checked + .slider-switch:before {
                        transform: translateX(24px);
                    }

                    /* Storage */
                    .storage-overview {
                        display: flex;
                        align-items: center;
                        gap: 25px;
                        margin-bottom: 20px;
                    }

                    .storage-visual {
                        flex-shrink: 0;
                    }

                    .storage-circle {
                        width: 80px;
                        height: 80px;
                        border-radius: 50%;
                        background: conic-gradient(#667eea 0deg 0deg, #e9ecef 0deg 360deg);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        position: relative;
                    }

                    .storage-circle::before {
                        content: '';
                        position: absolute;
                        width: 60px;
                        height: 60px;
                        background: white;
                        border-radius: 50%;
                    }

                    .storage-text {
                        position: relative;
                        z-index: 1;
                        text-align: center;
                        font-size: 12px;
                        font-weight: 700;
                        color: #495057;
                    }

                    .storage-details {
                        flex: 1;
                    }

                    .storage-item {
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 8px;
                        font-size: 14px;
                    }

                    /* Resource Monitor */
                    .resource-monitor {
                        display: flex;
                        flex-direction: column;
                        gap: 15px;
                        margin-bottom: 20px;
                    }

                    .resource-item {
                        display: flex;
                        align-items: center;
                        gap: 15px;
                    }

                    .resource-label {
                        min-width: 100px;
                        font-size: 13px;
                        font-weight: 500;
                        color: #495057;
                    }

                    .resource-bar {
                        flex: 1;
                        height: 8px;
                        background: #e9ecef;
                        border-radius: 4px;
                        overflow: hidden;
                    }

                    .resource-fill {
                        height: 100%;
                        background: linear-gradient(90deg, #28a745, #20c997);
                        transition: width 0.3s ease;
                    }

                    .resource-value {
                        min-width: 40px;
                        font-size: 13px;
                        font-weight: 500;
                        color: #667eea;
                    }

                    /* System Info */
                    .system-info {
                        display: flex;
                        flex-direction: column;
                        gap: 12px;
                        margin-bottom: 20px;
                    }

                    .info-row {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 8px 0;
                        border-bottom: 1px solid #f8f9fa;
                    }

                    .info-label {
                        font-weight: 500;
                        color: #495057;
                        font-size: 13px;
                    }

                    .info-value {
                        color: #667eea;
                        font-weight: 500;
                        font-size: 13px;
                    }

                    /* About */
                    .about-content {
                        text-align: center;
                        padding: 20px;
                    }

                    .about-logo {
                        font-size: 80px;
                        margin-bottom: 20px;
                        animation: pulse 3s infinite;
                    }

                    @keyframes pulse {
                        0%, 100% { transform: scale(1); }
                        50% { transform: scale(1.05); }
                    }

                    .version-info {
                        background: #667eea;
                        color: white;
                        padding: 4px 12px;
                        border-radius: 12px;
                        font-size: 12px;
                        font-weight: 500;
                        display: inline-block;
                        margin-bottom: 20px;
                    }

                    .about-description {
                        color: #6c757d;
                        line-height: 1.6;
                        margin-bottom: 25px;
                        max-width: 500px;
                        margin-left: auto;
                        margin-right: auto;
                    }

                    .feature-highlights {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                        gap: 15px;
                        margin-bottom: 30px;
                    }

                    .feature-item {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        padding: 12px;
                        background: #f8f9fa;
                        border-radius: 8px;
                        font-size: 13px;
                        color: #495057;
                    }

                    .feature-item i {
                        color: #667eea;
                        width: 16px;
                    }

                    .about-actions {
                        display: flex;
                        gap: 10px;
                        justify-content: center;
                        margin-bottom: 30px;
                        flex-wrap: wrap;
                    }

                    .copyright {
                        border-top: 1px solid #e9ecef;
                        padding-top: 20px;
                        color: #6c757d;
                        font-size: 12px;
                    }

                    .copyright p {
                        margin: 5px 0;
                    }

                    /* Buttons */
                    .btn {
                        padding: 8px 16px;
                        border: none;
                        border-radius: 6px;
                        cursor: pointer;
                        font-size: 13px;
                        font-weight: 500;
                        transition: all 0.3s ease;
                        display: inline-flex;
                        align-items: center;
                        gap: 6px;
                        text-decoration: none;
                    }

                    .btn-primary {
                        background: linear-gradient(135deg, #667eea, #764ba2);
                        color: white;
                    }

                    .btn-primary:hover {
                        transform: translateY(-1px);
                        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
                    }

                    .btn-secondary {
                        background: #6c757d;
                        color: white;
                    }

                    .btn-secondary:hover {
                        background: #5a6268;
                        transform: translateY(-1px);
                    }

                    .maintenance-actions {
                        display: flex;
                        gap: 10px;
                        flex-wrap: wrap;
                    }

                    /* Footer */
                    .settings-footer {
                        background: white;
                        border-top: 1px solid #e9ecef;
                        padding: 15px 25px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        flex-shrink: 0;
                    }

                    .footer-left,
                    .footer-right {
                        display: flex;
                        gap: 10px;
                        align-items: center;
                    }

                    /* Responsive Design */
                    @media (max-width: 768px) {
                        .settings-app {
                            flex-direction: column;
                        }

                        .settings-sidebar {
                            width: 100%;
                            display: flex;
                            overflow-x: auto;
                            padding: 10px;
                        }

                        .settings-category {
                            flex-shrink: 0;
                            margin: 0 5px;
                            padding: 8px 12px;
                            font-size: 12px;
                        }

                        .settings-panel {
                            padding: 15px;
                        }

                        .settings-section {
                            padding: 15px;
                        }

                        .theme-grid {
                            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
                            gap: 10px;
                        }

                        .setting-group {
                            flex-direction: column;
                            align-items: flex-start;
                            gap: 8px;
                        }

                        .storage-overview {
                            flex-direction: column;
                            text-align: center;
                        }

                        .wallpaper-options {
                            justify-content: center;
                        }

                        .settings-footer {
                            flex-direction: column;
                            gap: 10px;
                        }

                        .footer-left,
                        .footer-right {
                            width: 100%;
                            justify-content: center;
                        }
                    }

                    /* Quality settings */
                    .quality-options {
                        display: flex;
                        gap: 20px;
                        flex-wrap: wrap;
                        justify-content: center;
                    }

                    .path-selector {
                        display: flex;
                        gap: 10px;
                        align-items: center;
                        flex: 1;
                    }

                    .path-selector input {
                        flex: 1;
                    }

                    /* Download settings */
                    .download-settings,
                    .file-manager-settings {
                        display: flex;
                        flex-direction: column;
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
        this.preferences = {};
        this.hasUnsavedChanges = false;

        this.setupEventListeners();
        this.loadCurrentSettings();
        this.updateSystemInfo();
        this.startResourceMonitoring();
    }

    // Enhanced CSRF token handling
    static getCSRFToken() {
        // Try multiple methods to get CSRF token
        const methods = [
            () => document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
            () => document.querySelector('meta[name="X-CSRFToken"]')?.getAttribute('content'),
            () => document.querySelector('input[name="csrf_token"]')?.value,
            () => window.CSRF_TOKEN,
            () => sessionStorage.getItem('csrf_token'),
            () => localStorage.getItem('csrf_token')
        ];

        for (const method of methods) {
            try {
                const token = method();
                if (token && token.length > 10) {
                    console.log('✅ CSRF token found via method:', method.toString().slice(6, 50));
                    return token;
                }
            } catch (e) {
                continue;
            }
        }

        console.warn('⚠️ No CSRF token found - this may cause API requests to fail');
        return '';
    }

    // Enhanced API request with proper CSRF handling
    static async makeAuthenticatedRequest(url, options = {}) {
        const csrfToken = this.getCSRFToken();

        const defaultHeaders = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };

        // Add CSRF token to headers in multiple ways for compatibility
        if (csrfToken) {
            defaultHeaders['X-CSRFToken'] = csrfToken;
            defaultHeaders['X-CSRF-Token'] = csrfToken;
            defaultHeaders['X-XSRF-TOKEN'] = csrfToken;
        }

        const mergedOptions = {
            ...options,
            headers: {
                ...defaultHeaders,
                ...(options.headers || {})
            }
        };

        // Add CSRF token to request body if it's a POST/PUT request
        if ((options.method === 'POST' || options.method === 'PUT') && options.body) {
            try {
                const bodyData = JSON.parse(options.body);
                if (csrfToken) {
                    bodyData.csrf_token = csrfToken;
                    bodyData._token = csrfToken;
                }
                mergedOptions.body = JSON.stringify(bodyData);
            } catch (e) {
                // If body is not JSON, leave it as is
            }
        }

        console.log('🔒 Making authenticated request to:', url, {
            method: mergedOptions.method || 'GET',
            hasCSRF: !!csrfToken,
            headers: Object.keys(mergedOptions.headers)
        });

        try {
            const response = await fetch(url, mergedOptions);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('❌ API request failed:', {
                    url,
                    status: response.status,
                    statusText: response.statusText,
                    error: errorText
                });

                if (response.status === 403 || errorText.includes('CSRF')) {
                    throw new Error('CSRF token validation failed. Please refresh the page and try again.');
                }

                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            return response;
        } catch (error) {
            console.error('❌ Request error:', error);
            throw error;
        }
    }

    static setupEventListeners() {
        // Category switching
        const categories = this.currentWindow.querySelectorAll('.settings-category');
        categories.forEach(category => {
            category.addEventListener('click', () => {
                this.switchCategory(category.dataset.category);
            });
        });

        // Theme selection
        const themeCards = this.currentWindow.querySelectorAll('.theme-card');
        themeCards.forEach(card => {
            card.addEventListener('click', () => {
                this.selectTheme(card.dataset.theme);
            });
        });

        // Wallpaper type change
        const wallpaperRadios = this.currentWindow.querySelectorAll('input[name="wallpaper-type"]');
        wallpaperRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                this.updateWallpaperControls();
                this.markAsChanged();
            });
        });

        // Color picker
        const colorPicker = this.currentWindow.querySelector('#bg-color-picker');
        if (colorPicker) {
            colorPicker.addEventListener('change', (e) => {
                this.applyBackgroundColor(e.target.value);
                this.markAsChanged();
            });
        }

        // Wallpaper upload
        const wallpaperUpload = this.currentWindow.querySelector('#wallpaper-upload');
        if (wallpaperUpload) {
            wallpaperUpload.addEventListener('change', (e) => {
                this.handleWallpaperUpload(e.target.files[0]);
            });
        }

        // Font controls
        this.setupFontControls();

        // Sliders and inputs
        this.setupSliders();

        // Switches
        this.setupSwitches();

        // Settings import
        const importInput = this.currentWindow.querySelector('#settings-import-input');
        if (importInput) {
            importInput.addEventListener('change', (e) => {
                this.handleSettingsImport(e.target.files[0]);
            });
        }
    }

    static setupFontControls() {
        const fontSelect = this.currentWindow.querySelector('#font-family-select');
        if (fontSelect) {
            fontSelect.addEventListener('change', (e) => {
                this.applyFontFamily(e.target.value);
                this.markAsChanged();
            });
        }
    }

    static setupSliders() {
        // Font size slider
        const fontSizeSlider = this.currentWindow.querySelector('#font-size-slider');
        const fontSizeDisplay = this.currentWindow.querySelector('#font-size-display');
        if (fontSizeSlider) {
            fontSizeSlider.addEventListener('input', (e) => {
                const value = e.target.value;
                fontSizeDisplay.textContent = value + 'px';
                this.applyFontSize(value);
                this.markAsChanged();
            });
        }

        // Icon size slider
        const iconSizeSlider = this.currentWindow.querySelector('#icon-size-slider');
        const iconSizeDisplay = this.currentWindow.querySelector('#icon-size-display');
        if (iconSizeSlider) {
            iconSizeSlider.addEventListener('input', (e) => {
                const value = e.target.value;
                iconSizeDisplay.textContent = value + 'px';
                this.applyIconSize(value);
                this.markAsChanged();
            });
        }

        // Transparency sliders
        const transparencySlider = this.currentWindow.querySelector('#window-transparency');
        const transparencyDisplay = this.currentWindow.querySelector('#transparency-display');
        if (transparencySlider) {
            transparencySlider.addEventListener('input', (e) => {
                const value = e.target.value;
                transparencyDisplay.textContent = value + '%';
                this.applyWindowTransparency(value);
                this.markAsChanged();
            });
        }

        const taskbarTransparencySlider = this.currentWindow.querySelector('#taskbar-transparency');
        const taskbarTransparencyDisplay = this.currentWindow.querySelector('#taskbar-transparency-display');
        if (taskbarTransparencySlider) {
            taskbarTransparencySlider.addEventListener('input', (e) => {
                const value = e.target.value;
                taskbarTransparencyDisplay.textContent = value + '%';
                this.applyTaskbarTransparency(value);
                this.markAsChanged();
            });
        }
    }

    static setupSwitches() {
        const switches = this.currentWindow.querySelectorAll('input[type="checkbox"]');
        switches.forEach(switchEl => {
            switchEl.addEventListener('change', () => {
                this.handleSwitchChange(switchEl);
                this.markAsChanged();
            });
        });

        // Radio buttons for quality
        const qualityRadios = this.currentWindow.querySelectorAll('input[name="animation-quality"]');
        qualityRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                this.applyAnimationQuality(radio.value);
                this.markAsChanged();
            });
        });
    }

    static switchCategory(categoryName) {
        // Update sidebar
        this.currentWindow.querySelectorAll('.settings-category').forEach(cat => {
            cat.classList.remove('active');
        });
        this.currentWindow.querySelector(`[data-category="${categoryName}"]`).classList.add('active');

        // Update panels
        this.currentWindow.querySelectorAll('.settings-panel').forEach(panel => {
            panel.classList.remove('active');
        });
        this.currentWindow.querySelector(`#${categoryName}-panel`).classList.add('active');

        // Load category-specific data
        this.loadCategoryData(categoryName);
    }

    static loadCategoryData(category) {
        switch (category) {
            case 'files':
                this.updateStorageInfo();
                break;
            case 'system':
                this.updateSystemInfo();
                break;
            case 'performance':
                this.updateResourceMonitor();
                break;
        }
    }

    static selectTheme(themeName) {
        // Update UI
        this.currentWindow.querySelectorAll('.theme-card').forEach(card => {
            card.classList.remove('active');
        });
        this.currentWindow.querySelector(`[data-theme="${themeName}"]`).classList.add('active');

        // Apply theme immediately
        this.applyTheme(themeName);
        this.markAsChanged();
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

        // Apply to CSS variables
        document.documentElement.style.setProperty('--primary-blue', theme.primary);
        document.documentElement.style.setProperty('--neon-cyan', theme.secondary);

        // Only apply background if wallpaper type is gradient
        const wallpaperType = this.currentWindow.querySelector('input[name="wallpaper-type"]:checked')?.value;
        if (wallpaperType === 'gradient') {
            document.body.style.background = theme.background;
        }

        // Store current theme
        this.preferences.theme = themeName;

        console.log('🎨 Theme applied:', themeName);
        this.showNotification(`Theme changed to ${themeName.replace('-', ' ')}`, 'success');
    }

    static updateWallpaperControls() {
        const wallpaperType = this.currentWindow.querySelector('input[name="wallpaper-type"]:checked')?.value;
        const colorContainer = this.currentWindow.querySelector('.color-picker-container');
        const imageContainer = this.currentWindow.querySelector('.image-upload-container');

        // Hide all controls first
        colorContainer.style.display = 'none';
        imageContainer.style.display = 'none';

        // Show relevant controls
        switch (wallpaperType) {
            case 'solid':
                colorContainer.style.display = 'flex';
                break;
            case 'image':
                imageContainer.style.display = 'flex';
                break;
            case 'gradient':
                // Apply current theme gradient
                if (this.preferences.theme) {
                    this.applyTheme(this.preferences.theme);
                }
                break;
        }
    }

    static applyBackgroundColor(color) {
        document.body.style.background = color;
        this.preferences.wallpaperStyle = color;
    }

    static async handleWallpaperUpload(file) {
        if (!file || !file.type.startsWith('image/')) {
            this.showNotification('Please select a valid image file', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const imageUrl = e.target.result;
            document.body.style.background = `url(${imageUrl}) center/cover no-repeat`;
            this.preferences.wallpaperStyle = imageUrl;
            this.markAsChanged();
            this.showNotification('Wallpaper updated successfully', 'success');
        };
        reader.readAsDataURL(file);
    }

    static applyFontFamily(fontFamily) {
        document.documentElement.style.setProperty('--system-font', fontFamily);
        document.body.style.fontFamily = fontFamily;
        this.preferences.fontFamily = fontFamily;
        console.log('🔤 Font family applied:', fontFamily);
    }

    static applyFontSize(size) {
        document.documentElement.style.setProperty('--base-font-size', size + 'px');
        document.body.style.fontSize = size + 'px';
        this.preferences.fontSize = parseInt(size);
        console.log('📏 Font size applied:', size + 'px');
    }

    static applyIconSize(size) {
        document.documentElement.style.setProperty('--icon-size', size + 'px');
        this.preferences.iconSize = parseInt(size);
        console.log('🖼️ Icon size applied:', size + 'px');
    }

    static applyWindowTransparency(value) {
        const opacity = (100 - value) / 100;
        document.documentElement.style.setProperty('--window-opacity', opacity);
        this.preferences.transparency = parseInt(value);
        console.log('👻 Window transparency applied:', value + '%');
    }

    static applyTaskbarTransparency(value) {
        const taskbar = document.querySelector('.taskbar');
        if (taskbar) {
            const alpha = 0.95 - (value / 100 * 0.3);
            taskbar.style.background = taskbar.style.background.replace(/rgba?\([^)]+\)/,
                `rgba(10, 10, 15, ${alpha})`);
        }
        this.preferences.taskbarTransparency = parseInt(value);
    }

    static handleSwitchChange(switchEl) {
        const settingName = switchEl.id.replace(/-/g, '_');
        const isEnabled = switchEl.checked;

        switch (switchEl.id) {
            case 'animations-enabled':
                this.toggleAnimations(isEnabled);
                break;
            case 'blur-effects':
                this.toggleBlurEffects(isEnabled);
                break;
            case 'icon-shadows':
                this.toggleIconShadows(isEnabled);
                break;
            case 'particle-effects':
                this.toggleParticleEffects(isEnabled);
                break;
            case 'auto-hide-taskbar':
                this.toggleAutoHideTaskbar(isEnabled);
                break;
            case 'show-clock':
                this.toggleShowClock(isEnabled);
                break;
            case 'show-username':
                this.toggleShowUsername(isEnabled);
                break;
            case 'show-icon-labels':
                this.toggleIconLabels(isEnabled);
                break;
            case 'hardware-acceleration':
                this.toggleHardwareAcceleration(isEnabled);
                break;
            default:
                console.log('📝 Setting changed:', settingName, isEnabled);
        }

        this.preferences[settingName] = isEnabled;
    }

    static toggleAnimations(enabled) {
        if (enabled) {
            document.body.classList.remove('no-animations');
        } else {
            document.body.classList.add('no-animations');
        }
        console.log('✨ Animations:', enabled ? 'enabled' : 'disabled');
    }

    static toggleBlurEffects(enabled) {
        if (enabled) {
            document.body.classList.remove('no-blur');
        } else {
            document.body.classList.add('no-blur');
        }
        console.log('🌫️ Blur effects:', enabled ? 'enabled' : 'disabled');
    }

    static toggleIconShadows(enabled) {
        if (enabled) {
            document.body.classList.remove('no-icon-shadows');
        } else {
            document.body.classList.add('no-icon-shadows');
        }
        console.log('🎭 Icon shadows:', enabled ? 'enabled' : 'disabled');
    }

    static toggleParticleEffects(enabled) {
        // Create or remove particle effects
        const existingParticles = document.querySelector('.floating-particles');

        if (enabled && !existingParticles) {
            const particles = document.createElement('div');
            particles.className = 'floating-particles';
            particles.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: -1;
                pointer-events: none;
            `;

            for (let i = 0; i < 5; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.cssText = `
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: var(--primary-blue);
                    border-radius: 50%;
                    animation: float-particle 8s infinite ease-in-out;
                    animation-delay: ${i * -1.5}s;
                    top: ${15 + Math.random() * 70}%;
                    left: ${15 + Math.random() * 70}%;
                `;
                particles.appendChild(particle);
            }

            document.body.appendChild(particles);
        } else if (!enabled && existingParticles) {
            existingParticles.remove();
        }

        console.log('🎇 Particle effects:', enabled ? 'enabled' : 'disabled');
    }

    static toggleAutoHideTaskbar(enabled) {
        const taskbar = document.querySelector('.taskbar');
        if (taskbar) {
            if (enabled) {
                taskbar.classList.add('auto-hide');
            } else {
                taskbar.classList.remove('auto-hide');
            }
        }
        console.log('📋 Auto-hide taskbar:', enabled ? 'enabled' : 'disabled');
    }

    static toggleShowClock(enabled) {
        const clock = document.querySelector('.time-display');
        if (clock) {
            clock.style.display = enabled ? 'block' : 'none';
        }
        console.log('🕒 Show clock:', enabled ? 'enabled' : 'disabled');
    }

    static toggleShowUsername(enabled) {
        const username = document.querySelector('.username');
        if (username) {
            username.style.display = enabled ? 'inline' : 'none';
        }
        console.log('👤 Show username:', enabled ? 'enabled' : 'disabled');
    }

    static toggleIconLabels(enabled) {
        const labels = document.querySelectorAll('.icon-label');
        labels.forEach(label => {
            label.style.display = enabled ? 'block' : 'none';
        });
        console.log('🏷️ Icon labels:', enabled ? 'enabled' : 'disabled');
    }

    static toggleHardwareAcceleration(enabled) {
        if (enabled) {
            document.body.style.transform = 'translateZ(0)';
            document.body.style.willChange = 'transform';
        } else {
            document.body.style.transform = '';
            document.body.style.willChange = '';
        }
        console.log('🚀 Hardware acceleration:', enabled ? 'enabled' : 'disabled');
    }

    static applyAnimationQuality(quality) {
        // Remove existing quality classes
        document.body.classList.remove('animation-quality-none', 'animation-quality-low', 'animation-quality-medium');

        if (quality !== 'high') {
            document.body.classList.add(`animation-quality-${quality}`);
        }

        this.preferences.animationQuality = quality;
        console.log('🎭 Animation quality:', quality);
    }

    static async updateStorageInfo() {
        try {
            const response = await this.makeAuthenticatedRequest('/api/files/storage-info');
            const data = await response.json();

            if (response.ok && data.total) {
                const usedPercent = Math.round((data.used / data.total) * 100);

                const usedPercentEl = this.currentWindow.querySelector('#storage-used-percent');
                const usedSizeEl = this.currentWindow.querySelector('#storage-used-size');
                const availableEl = this.currentWindow.querySelector('#storage-available');
                const totalEl = this.currentWindow.querySelector('#storage-total');
                const circle = this.currentWindow.querySelector('.storage-circle');

                if (usedPercentEl) usedPercentEl.textContent = usedPercent + '%';
                if (usedSizeEl) usedSizeEl.textContent = this.formatFileSize(data.used);
                if (availableEl) availableEl.textContent = this.formatFileSize(data.total - data.used);
                if (totalEl) totalEl.textContent = this.formatFileSize(data.total);

                if (circle) {
                    circle.style.background = `conic-gradient(#667eea 0deg ${usedPercent * 3.6}deg, #e9ecef ${usedPercent * 3.6}deg 360deg)`;
                }
            }
        } catch (error) {
            console.error('Failed to load storage info:', error);
        }
    }

    static updateSystemInfo() {
        const browserInfo = this.getBrowserInfo();
        const screenRes = `${screen.width}×${screen.height}`;
        const sessionTime = new Date().toLocaleString();

        const elements = {
            'browser-info': browserInfo,
            'screen-resolution': screenRes,
            'session-time': sessionTime,
            'user-agent': navigator.userAgent.substring(0, 100) + '...'
        };

        Object.entries(elements).forEach(([id, value]) => {
            const el = this.currentWindow.querySelector(`#${id}`);
            if (el) el.textContent = value;
        });
    }

    static getBrowserInfo() {
        const ua = navigator.userAgent;
        if (ua.includes('Chrome')) return 'Chrome ' + ua.match(/Chrome\/([0-9.]+)/)?.[1];
        if (ua.includes('Firefox')) return 'Firefox ' + ua.match(/Firefox\/([0-9.]+)/)?.[1];
        if (ua.includes('Safari')) return 'Safari ' + ua.match(/Version\/([0-9.]+)/)?.[1];
        if (ua.includes('Edge')) return 'Edge ' + ua.match(/Edge\/([0-9.]+)/)?.[1];
        return 'Unknown Browser';
    }

    static startResourceMonitoring() {
        this.updateResourceMonitor();
        setInterval(() => {
            this.updateResourceMonitor();
        }, 5000);
    }

    static updateResourceMonitor() {
        // Simulate resource usage (in a real app, you'd get this from the server)
        const memoryUsage = Math.floor(Math.random() * 30) + 40; // 40-70%
        const cpuUsage = Math.floor(Math.random() * 30) + 10; // 10-40%

        const memoryBar = this.currentWindow.querySelector('#memory-usage-bar');
        const memoryText = this.currentWindow.querySelector('#memory-usage-text');
        const cpuBar = this.currentWindow.querySelector('#cpu-usage-bar');
        const cpuText = this.currentWindow.querySelector('#cpu-usage-text');

        if (memoryBar) {
            memoryBar.style.width = memoryUsage + '%';
            memoryBar.style.background = memoryUsage > 80 ? '#dc3545' : memoryUsage > 60 ? '#ffc107' : '#28a745';
        }
        if (memoryText) memoryText.textContent = memoryUsage + '%';

        if (cpuBar) {
            cpuBar.style.width = cpuUsage + '%';
            cpuBar.style.background = cpuUsage > 80 ? '#dc3545' : cpuUsage > 60 ? '#ffc107' : '#28a745';
        }
        if (cpuText) cpuText.textContent = cpuUsage + '%';
    }

    static async loadCurrentSettings() {
        try {
            const response = await this.makeAuthenticatedRequest('/api/user/preferences');
            const data = await response.json();

            if (response.ok && data.preferences) {
                this.preferences = { ...data.preferences };
                this.applyLoadedSettings();
                console.log('⚙️ Settings loaded successfully');
            }
        } catch (error) {
            console.error('Failed to load settings:', error);
            this.showNotification('Failed to load settings', 'error');
        }
    }

    static applyLoadedSettings() {
        // Apply theme
        if (this.preferences.theme) {
            this.selectTheme(this.preferences.theme);
        }

        // Apply font settings
        if (this.preferences.fontFamily) {
            this.currentWindow.querySelector('#font-family-select').value = this.preferences.fontFamily;
            this.applyFontFamily(this.preferences.fontFamily);
        }

        if (this.preferences.fontSize) {
            this.currentWindow.querySelector('#font-size-slider').value = this.preferences.fontSize;
            this.currentWindow.querySelector('#font-size-display').textContent = this.preferences.fontSize + 'px';
            this.applyFontSize(this.preferences.fontSize);
        }

        if (this.preferences.iconSize) {
            this.currentWindow.querySelector('#icon-size-slider').value = this.preferences.iconSize;
            this.currentWindow.querySelector('#icon-size-display').textContent = this.preferences.iconSize + 'px';
            this.applyIconSize(this.preferences.iconSize);
        }

        // Apply switches
        const switchSettings = [
            'animations-enabled', 'blur-effects', 'icon-shadows', 'particle-effects',
            'auto-hide-taskbar', 'show-clock', 'show-username', 'show-icon-labels',
            'hardware-acceleration', 'preload-apps', 'memory-optimization'
        ];

        switchSettings.forEach(setting => {
            const element = this.currentWindow.querySelector(`#${setting.replace(/_/g, '-')}`);
            if (element && this.preferences[setting] !== undefined) {
                element.checked = this.preferences[setting];
                this.handleSwitchChange(element);
            }
        });

        // Apply animation quality
        if (this.preferences.animationQuality) {
            const radio = this.currentWindow.querySelector(`input[name="animation-quality"][value="${this.preferences.animationQuality}"]`);
            if (radio) {
                radio.checked = true;
                this.applyAnimationQuality(this.preferences.animationQuality);
            }
        }

        // Apply wallpaper
        if (this.preferences.wallpaperStyle) {
            document.body.style.background = this.preferences.wallpaperStyle;
        }

        // Apply transparency
        if (this.preferences.transparency !== undefined) {
            this.currentWindow.querySelector('#window-transparency').value = this.preferences.transparency;
            this.currentWindow.querySelector('#transparency-display').textContent = this.preferences.transparency + '%';
            this.applyWindowTransparency(this.preferences.transparency);
        }
    }

    static async saveAllSettings() {
        try {
            this.showSavingIndicator();

            const response = await this.makeAuthenticatedRequest('/api/user/preferences', {
                method: 'POST',
                body: JSON.stringify({
                    preferences: this.preferences
                })
            });

            if (response.ok) {
                this.hasUnsavedChanges = false;
                this.showNotification('Settings saved successfully!', 'success');
                console.log('💾 Settings saved successfully');
            } else {
                const data = await response.json();
                throw new Error(data.error || 'Failed to save settings');
            }
        } catch (error) {
            console.error('Failed to save settings:', error);
            this.showNotification('Failed to save settings: ' + error.message, 'error');
        } finally {
            this.hideSavingIndicator();
        }
    }

    static markAsChanged() {
        this.hasUnsavedChanges = true;
        // Update save button to indicate unsaved changes
        const saveBtn = this.currentWindow.querySelector('.settings-footer .btn-primary');
        if (saveBtn && !saveBtn.textContent.includes('*')) {
            saveBtn.innerHTML = '<i class="fas fa-save"></i> Save Changes *';
        }
    }

    static showSavingIndicator() {
        const saveBtn = this.currentWindow.querySelector('.settings-footer .btn-primary');
        if (saveBtn) {
            saveBtn.disabled = true;
            saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
        }
    }

    static hideSavingIndicator() {
        const saveBtn = this.currentWindow.querySelector('.settings-footer .btn-primary');
        if (saveBtn) {
            saveBtn.disabled = false;
            saveBtn.innerHTML = '<i class="fas fa-save"></i> Save Changes';
        }
    }

    // Action methods
    static analyzeStorage() {
        this.showNotification('Storage analysis complete', 'info');
        this.updateStorageInfo();
    }

    static selectDownloadPath() {
        // In a real implementation, this would open a folder selector
        this.showNotification('Folder selection not available in web version', 'info');
    }

    static clearActivityLogs() {
        if (confirm('Clear all activity logs? This action cannot be undone.')) {
            this.showNotification('Activity logs cleared', 'success');
        }
    }

    static optimizeSystem() {
        this.showNotification('System optimization started...', 'info');
        setTimeout(() => {
            this.showNotification('System optimization completed!', 'success');
            this.updateResourceMonitor();
        }, 2000);
    }

    static clearCache() {
        if (confirm('Clear application cache? This will refresh the page.')) {
            this.showNotification('Clearing cache...', 'info');
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    }

    static resetSettings() {
        if (confirm('Reset all settings to defaults? This action cannot be undone.')) {
            this.showNotification('Resetting to defaults...', 'info');
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    }

    static exportSettings() {
        const settingsData = {
            version: '3.0.0',
            exported: new Date().toISOString(),
            preferences: this.preferences
        };

        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(settingsData, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `emberframe_settings_${new Date().toISOString().split('T')[0]}.json`);
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();

        this.showNotification('Settings exported successfully', 'success');
    }

    static importSettings() {
        const input = this.currentWindow.querySelector('#settings-import-input');
        input.click();
    }

    static handleSettingsImport(file) {
        if (!file || !file.name.endsWith('.json')) {
            this.showNotification('Please select a valid JSON settings file', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const settingsData = JSON.parse(e.target.result);
                if (settingsData.preferences) {
                    this.preferences = { ...settingsData.preferences };
                    this.applyLoadedSettings();
                    this.markAsChanged();
                    this.showNotification('Settings imported successfully', 'success');
                } else {
                    this.showNotification('Invalid settings file format', 'error');
                }
            } catch (error) {
                this.showNotification('Failed to parse settings file', 'error');
            }
        };
        reader.readAsText(file);
    }

    static resetCurrentPanel() {
        const activePanel = this.currentWindow.querySelector('.settings-panel.active');
        const panelId = activePanel.id.replace('-panel', '');

        if (confirm(`Reset ${panelId} settings to defaults?`)) {
            this.showNotification(`${panelId} settings reset to defaults`, 'info');
            // In a real implementation, you'd reset specific panel settings
        }
    }

    static checkUpdates() {
        this.showNotification('Checking for updates...', 'info');
        setTimeout(() => {
            this.showNotification('EmberFrame is up to date!', 'success');
        }, 2000);
    }

    static viewChangelog() {
        this.showNotification('Changelog opened in new window', 'info');
        // In a real implementation, this would open a changelog window
    }

    static reportIssue() {
        this.showNotification('Issue reporting form opened', 'info');
        // In a real implementation, this would open an issue reporting form
    }

    static close() {
        if (this.hasUnsavedChanges) {
            if (confirm('You have unsaved changes. Close without saving?')) {
                if (window.WindowManager) {
                    const windowElement = this.currentWindow.closest('.window');
                    if (windowElement) {
                        window.WindowManager.closeWindow(windowElement.dataset.app);
                    }
                }
            }
        } else {
            if (window.WindowManager) {
                const windowElement = this.currentWindow.closest('.window');
                if (windowElement) {
                    window.WindowManager.closeWindow(windowElement.dataset.app);
                }
            }
        }
    }

    static formatFileSize(bytes) {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    }

    static showNotification(message, type = 'info') {
        if (window.Notification) {
            window.Notification[type](message);
        } else {
            console.log(`[${type.toUpperCase()}] ${message}`);
        }
    }

    static onClose(windowElement) {
        this.currentWindow = null;
        return true;
    }
}

window.Settings = Settings;