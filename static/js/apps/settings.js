/**
 * APP_METADATA
 * @name Settings
 * @icon fas fa-cog
 * @description Comprehensive system settings with live preview
 * @category System
 * @version 3.0.0
 * @author EmberFrame Team
 * @enabled true
 */

class Settings {
    static createWindow() {
        return {
            title: 'EmberFrame Settings',
            width: '1100px',
            height: '700px',
            autoSize: false,
            content: `
                <div class="settings-app">
                    <!-- Settings Sidebar -->
                    <div class="settings-sidebar">
                        <div class="settings-header">
                            <h2>⚙️ Settings</h2>
                            <p>Customize your experience</p>
                        </div>
                        
                        <nav class="settings-nav">
                            <div class="nav-item active" data-section="appearance">
                                <i class="fas fa-palette"></i>
                                <span>Appearance</span>
                            </div>
                            <div class="nav-item" data-section="background">
                                <i class="fas fa-image"></i>
                                <span>Background</span>
                            </div>
                            <div class="nav-item" data-section="desktop">
                                <i class="fas fa-desktop"></i>
                                <span>Desktop</span>
                            </div>
                            <div class="nav-item" data-section="performance">
                                <i class="fas fa-tachometer-alt"></i>
                                <span>Performance</span>
                            </div>
                            <div class="nav-item" data-section="privacy">
                                <i class="fas fa-shield-alt"></i>
                                <span>Privacy</span>
                            </div>
                            <div class="nav-item" data-section="storage">
                                <i class="fas fa-hdd"></i>
                                <span>Storage</span>
                            </div>
                            <div class="nav-item" data-section="about">
                                <i class="fas fa-info-circle"></i>
                                <span>About</span>
                            </div>
                        </nav>

                        <div class="settings-footer">
                            <button class="reset-btn" onclick="Settings.resetToDefaults()">
                                <i class="fas fa-undo"></i>
                                Reset All
                            </button>
                        </div>
                    </div>

                    <!-- Settings Content -->
                    <div class="settings-content">
                        <!-- Appearance Section -->
                        <div class="settings-section active" id="appearance-section">
                            <div class="section-header">
                                <h3>🎨 Appearance Settings</h3>
                                <p>Customize the visual theme and colors</p>
                            </div>

                            <div class="settings-grid">
                                <!-- Theme Selection -->
                                <div class="setting-group">
                                    <h4>Color Theme</h4>
                                    <div class="theme-grid" id="theme-grid">
                                        <!-- Themes will be populated here -->
                                    </div>
                                </div>

                                <!-- Font Settings -->
                                <div class="setting-group">
                                    <h4>Typography</h4>
                                    <div class="setting-row">
                                        <label>Font Family</label>
                                        <select id="font-family" onchange="Settings.updateSetting('fontFamily', this.value)">
                                            <option value="'Rajdhani', sans-serif">Rajdhani (Default)</option>
                                            <option value="'Orbitron', monospace">Orbitron</option>
                                            <option value="'Arial', sans-serif">Arial</option>
                                            <option value="'Helvetica', sans-serif">Helvetica</option>
                                            <option value="'Georgia', serif">Georgia</option>
                                            <option value="'Times', serif">Times</option>
                                            <option value="'Courier', monospace">Courier</option>
                                            <option value="'JetBrains Mono', monospace">JetBrains Mono</option>
                                        </select>
                                    </div>
                                    <div class="setting-row">
                                        <label>Font Size</label>
                                        <div class="slider-container">
                                            <input type="range" id="font-size" min="12" max="20" value="14" 
                                                   oninput="Settings.updateSetting('fontSize', this.value)">
                                            <span class="slider-value" id="font-size-value">14px</span>
                                        </div>
                                    </div>
                                </div>

                                <!-- Icon Settings -->
                                <div class="setting-group">
                                    <h4>Icons</h4>
                                    <div class="setting-row">
                                        <label>Icon Size</label>
                                        <div class="slider-container">
                                            <input type="range" id="icon-size" min="32" max="72" value="48" 
                                                   oninput="Settings.updateSetting('iconSize', this.value)">
                                            <span class="slider-value" id="icon-size-value">48px</span>
                                        </div>
                                    </div>
                                    <div class="setting-row">
                                        <label>Show Icon Labels</label>
                                        <div class="toggle-switch">
                                            <input type="checkbox" id="show-icon-labels" checked 
                                                   onchange="Settings.updateSetting('showIconLabels', this.checked)">
                                            <span class="toggle-slider"></span>
                                        </div>
                                    </div>
                                </div>

                                <!-- Transparency -->
                                <div class="setting-group">
                                    <h4>Visual Effects</h4>
                                    <div class="setting-row">
                                        <label>Window Transparency</label>
                                        <div class="slider-container">
                                            <input type="range" id="transparency" min="0" max="30" value="0" 
                                                   oninput="Settings.updateSetting('transparency', this.value)">
                                            <span class="slider-value" id="transparency-value">0%</span>
                                        </div>
                                    </div>
                                    <div class="setting-row">
                                        <label>Blur Effects</label>
                                        <div class="toggle-switch">
                                            <input type="checkbox" id="blur-effects" checked 
                                                   onchange="Settings.updateSetting('blurEffects', this.checked)">
                                            <span class="toggle-slider"></span>
                                        </div>
                                    </div>
                                    <div class="setting-row">
                                        <label>Icon Shadows</label>
                                        <div class="toggle-switch">
                                            <input type="checkbox" id="icon-shadows" checked 
                                                   onchange="Settings.updateSetting('iconShadows', this.checked)">
                                            <span class="toggle-slider"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Background Section -->
                        <div class="settings-section" id="background-section">
                            <div class="section-header">
                                <h3>🖼️ Background Settings</h3>
                                <p>Customize your desktop background with advanced options</p>
                            </div>

                            <div class="background-preview" id="background-preview">
                                <div class="preview-screen">
                                    <div class="preview-content">Live Preview</div>
                                </div>
                            </div>

                            <div class="settings-grid">
                                <!-- Background Type -->
                                <div class="setting-group">
                                    <h4>Background Type</h4>
                                    <div class="bg-type-tabs">
                                        <button class="bg-tab active" data-type="solid" onclick="Settings.switchBackgroundType('solid')">
                                            <i class="fas fa-square"></i> Solid Color
                                        </button>
                                        <button class="bg-tab" data-type="gradient" onclick="Settings.switchBackgroundType('gradient')">
                                            <i class="fas fa-palette"></i> Gradient
                                        </button>
                                        <button class="bg-tab" data-type="pattern" onclick="Settings.switchBackgroundType('pattern')">
                                            <i class="fas fa-th"></i> Pattern
                                        </button>
                                        <button class="bg-tab" data-type="animated" onclick="Settings.switchBackgroundType('animated')">
                                            <i class="fas fa-play"></i> Animated
                                        </button>
                                        <button class="bg-tab" data-type="particles" onclick="Settings.switchBackgroundType('particles')">
                                            <i class="fas fa-star"></i> Particles
                                        </button>
                                    </div>
                                </div>

                                <!-- Solid Color Controls -->
                                <div class="bg-controls" id="solid-controls">
                                    <div class="setting-row">
                                        <label>Background Color</label>
                                        <div class="color-input-container">
                                            <input type="color" id="bg-color" value="#0a0a0f" 
                                                   onchange="Settings.updateBackground()">
                                            <input type="text" id="bg-color-text" value="#0a0a0f" 
                                                   onchange="Settings.updateColorFromText(this, 'bg-color')">
                                        </div>
                                    </div>
                                </div>

                                <!-- Gradient Controls -->
                                <div class="bg-controls" id="gradient-controls" style="display: none;">
                                    <div class="setting-row">
                                        <label>Gradient Type</label>
                                        <select id="gradient-type" onchange="Settings.updateBackground()">
                                            <option value="linear">Linear</option>
                                            <option value="radial">Radial</option>
                                            <option value="conic">Conic</option>
                                        </select>
                                    </div>
                                    <div class="setting-row">
                                        <label>Direction/Angle</label>
                                        <div class="slider-container">
                                            <input type="range" id="gradient-angle" min="0" max="360" value="135" 
                                                   oninput="Settings.updateBackground()">
                                            <span class="slider-value" id="gradient-angle-value">135°</span>
                                        </div>
                                    </div>
                                    <div class="gradient-colors">
                                        <div class="setting-row">
                                            <label>Color 1</label>
                                            <div class="color-input-container">
                                                <input type="color" id="gradient-color1" value="#667eea" 
                                                       onchange="Settings.updateBackground()">
                                                <input type="text" id="gradient-color1-text" value="#667eea" 
                                                       onchange="Settings.updateColorFromText(this, 'gradient-color1')">
                                            </div>
                                        </div>
                                        <div class="setting-row">
                                            <label>Color 2</label>
                                            <div class="color-input-container">
                                                <input type="color" id="gradient-color2" value="#764ba2" 
                                                       onchange="Settings.updateBackground()">
                                                <input type="text" id="gradient-color2-text" value="#764ba2" 
                                                       onchange="Settings.updateColorFromText(this, 'gradient-color2')">
                                            </div>
                                        </div>
                                        <div class="setting-row">
                                            <label>Color 3 (Optional)</label>
                                            <div class="color-input-container">
                                                <input type="color" id="gradient-color3" value="#ff6b6b" 
                                                       onchange="Settings.updateBackground()">
                                                <input type="text" id="gradient-color3-text" value="#ff6b6b" 
                                                       onchange="Settings.updateColorFromText(this, 'gradient-color3')">
                                                <div class="toggle-switch">
                                                    <input type="checkbox" id="use-color3" 
                                                           onchange="Settings.updateBackground()">
                                                    <span class="toggle-slider"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Pattern Controls -->
                                <div class="bg-controls" id="pattern-controls" style="display: none;">
                                    <div class="setting-row">
                                        <label>Pattern Type</label>
                                        <select id="pattern-type" onchange="Settings.updateBackground()">
                                            <option value="grid">Grid</option>
                                            <option value="dots">Dots</option>
                                            <option value="diagonal">Diagonal Lines</option>
                                            <option value="hexagon">Hexagon</option>
                                            <option value="circuit">Circuit</option>
                                        </select>
                                    </div>
                                    <div class="setting-row">
                                        <label>Pattern Size</label>
                                        <div class="slider-container">
                                            <input type="range" id="pattern-size" min="10" max="100" value="40" 
                                                   oninput="Settings.updateBackground()">
                                            <span class="slider-value" id="pattern-size-value">40px</span>
                                        </div>
                                    </div>
                                    <div class="setting-row">
                                        <label>Pattern Color</label>
                                        <div class="color-input-container">
                                            <input type="color" id="pattern-color" value="#00d4ff" 
                                                   onchange="Settings.updateBackground()">
                                            <input type="text" id="pattern-color-text" value="#00d4ff" 
                                                   onchange="Settings.updateColorFromText(this, 'pattern-color')">
                                        </div>
                                    </div>
                                    <div class="setting-row">
                                        <label>Pattern Opacity</label>
                                        <div class="slider-container">
                                            <input type="range" id="pattern-opacity" min="0" max="100" value="15" 
                                                   oninput="Settings.updateBackground()">
                                            <span class="slider-value" id="pattern-opacity-value">15%</span>
                                        </div>
                                    </div>
                                    <div class="setting-row">
                                        <label>Background Color</label>
                                        <div class="color-input-container">
                                            <input type="color" id="pattern-bg-color" value="#0a0a0f" 
                                                   onchange="Settings.updateBackground()">
                                            <input type="text" id="pattern-bg-color-text" value="#0a0a0f" 
                                                   onchange="Settings.updateColorFromText(this, 'pattern-bg-color')">
                                        </div>
                                    </div>
                                </div>

                                <!-- Animated Controls -->
                                <div class="bg-controls" id="animated-controls" style="display: none;">
                                    <div class="setting-row">
                                        <label>Animation Type</label>
                                        <select id="animation-type" onchange="Settings.updateBackground()">
                                            <option value="wave">Wave Motion</option>
                                            <option value="pulse">Pulse</option>
                                            <option value="rotate">Rotation</option>
                                            <option value="float">Floating</option>
                                            <option value="matrix">Matrix Rain</option>
                                        </select>
                                    </div>
                                    <div class="setting-row">
                                        <label>Animation Speed</label>
                                        <div class="slider-container">
                                            <input type="range" id="animation-speed" min="1" max="10" value="5" 
                                                   oninput="Settings.updateBackground()">
                                            <span class="slider-value" id="animation-speed-value">5</span>
                                        </div>
                                    </div>
                                    <div class="setting-row">
                                        <label>Base Colors</label>
                                        <div class="color-input-container">
                                            <input type="color" id="anim-color1" value="#667eea" 
                                                   onchange="Settings.updateBackground()">
                                            <input type="color" id="anim-color2" value="#764ba2" 
                                                   onchange="Settings.updateBackground()">
                                        </div>
                                    </div>
                                </div>

                                <!-- Particles Controls -->
                                <div class="bg-controls" id="particles-controls" style="display: none;">
                                    <div class="setting-row">
                                        <label>Particle Count</label>
                                        <div class="slider-container">
                                            <input type="range" id="particle-count" min="10" max="200" value="50" 
                                                   oninput="Settings.updateBackground()">
                                            <span class="slider-value" id="particle-count-value">50</span>
                                        </div>
                                    </div>
                                    <div class="setting-row">
                                        <label>Particle Size</label>
                                        <div class="slider-container">
                                            <input type="range" id="particle-size" min="1" max="10" value="3" 
                                                   oninput="Settings.updateBackground()">
                                            <span class="slider-value" id="particle-size-value">3px</span>
                                        </div>
                                    </div>
                                    <div class="setting-row">
                                        <label>Movement Speed</label>
                                        <div class="slider-container">
                                            <input type="range" id="particle-speed" min="1" max="10" value="3" 
                                                   oninput="Settings.updateBackground()">
                                            <span class="slider-value" id="particle-speed-value">3</span>
                                        </div>
                                    </div>
                                    <div class="setting-row">
                                        <label>Particle Color</label>
                                        <div class="color-input-container">
                                            <input type="color" id="particle-color" value="#00d4ff" 
                                                   onchange="Settings.updateBackground()">
                                            <input type="text" id="particle-color-text" value="#00d4ff" 
                                                   onchange="Settings.updateColorFromText(this, 'particle-color')">
                                        </div>
                                    </div>
                                    <div class="setting-row">
                                        <label>Background Color</label>
                                        <div class="color-input-container">
                                            <input type="color" id="particles-bg-color" value="#0a0a0f" 
                                                   onchange="Settings.updateBackground()">
                                            <input type="text" id="particles-bg-color-text" value="#0a0a0f" 
                                                   onchange="Settings.updateColorFromText(this, 'particles-bg-color')">
                                        </div>
                                    </div>
                                    <div class="setting-row">
                                        <label>Connection Lines</label>
                                        <div class="toggle-switch">
                                            <input type="checkbox" id="particle-lines" checked 
                                                   onchange="Settings.updateBackground()">
                                            <span class="toggle-slider"></span>
                                        </div>
                                    </div>
                                </div>

                                <!-- Preset Backgrounds -->
                                <div class="setting-group">
                                    <h4>Quick Presets</h4>
                                    <div class="preset-grid" id="preset-grid">
                                        <!-- Presets will be populated here -->
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Desktop Section -->
                        <div class="settings-section" id="desktop-section">
                            <div class="section-header">
                                <h3>🖥️ Desktop Settings</h3>
                                <p>Customize desktop behavior and layout</p>
                            </div>

                            <div class="settings-grid">
                                <div class="setting-group">
                                    <h4>Taskbar</h4>
                                    <div class="setting-row">
                                        <label>Auto-hide Taskbar</label>
                                        <div class="toggle-switch">
                                            <input type="checkbox" id="auto-hide-taskbar" 
                                                   onchange="Settings.updateSetting('autoHideTaskbar', this.checked)">
                                            <span class="toggle-slider"></span>
                                        </div>
                                    </div>
                                    <div class="setting-row">
                                        <label>Show Clock</label>
                                        <div class="toggle-switch">
                                            <input type="checkbox" id="show-clock" checked 
                                                   onchange="Settings.updateSetting('showClock', this.checked)">
                                            <span class="toggle-slider"></span>
                                        </div>
                                    </div>
                                </div>

                                <div class="setting-group">
                                    <h4>Notifications</h4>
                                    <div class="setting-row">
                                        <label>Notification Position</label>
                                        <select id="notification-position" onchange="Settings.updateSetting('notificationPosition', this.value)">
                                            <option value="top-right">Top Right</option>
                                            <option value="top-left">Top Left</option>
                                            <option value="bottom-right">Bottom Right</option>
                                            <option value="bottom-left">Bottom Left</option>
                                        </select>
                                    </div>
                                    <div class="setting-row">
                                        <label>Show Notifications</label>
                                        <div class="toggle-switch">
                                            <input type="checkbox" id="show-notifications" checked 
                                                   onchange="Settings.updateSetting('showNotifications', this.checked)">
                                            <span class="toggle-slider"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Performance Section -->
                        <div class="settings-section" id="performance-section">
                            <div class="section-header">
                                <h3>⚡ Performance Settings</h3>
                                <p>Optimize system performance and animations</p>
                            </div>

                            <div class="settings-grid">
                                <div class="setting-group">
                                    <h4>Animations</h4>
                                    <div class="setting-row">
                                        <label>Enable Animations</label>
                                        <div class="toggle-switch">
                                            <input type="checkbox" id="animations-enabled" checked 
                                                   onchange="Settings.updateSetting('animationsEnabled', this.checked)">
                                            <span class="toggle-slider"></span>
                                        </div>
                                    </div>
                                    <div class="setting-row">
                                        <label>Animation Quality</label>
                                        <select id="animation-quality" onchange="Settings.updateSetting('animationQuality', this.value)">
                                            <option value="high">High Quality</option>
                                            <option value="medium">Medium Quality</option>
                                            <option value="low">Low Quality</option>
                                            <option value="none">Disabled</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="setting-group">
                                    <h4>System</h4>
                                    <div class="setting-row">
                                        <label>Hardware Acceleration</label>
                                        <div class="toggle-switch">
                                            <input type="checkbox" id="hardware-acceleration" checked 
                                                   onchange="Settings.updateSetting('hardwareAcceleration', this.checked)">
                                            <span class="toggle-slider"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Privacy Section -->
                        <div class="settings-section" id="privacy-section">
                            <div class="section-header">
                                <h3>🛡️ Privacy Settings</h3>
                                <p>Control data collection and privacy</p>
                            </div>

                            <div class="settings-grid">
                                <div class="setting-group">
                                    <h4>Data Collection</h4>
                                    <div class="setting-row">
                                        <label>Usage Analytics</label>
                                        <div class="toggle-switch">
                                            <input type="checkbox" id="usage-analytics" 
                                                   onchange="Settings.updateSetting('usageAnalytics', this.checked)">
                                            <span class="toggle-slider"></span>
                                        </div>
                                    </div>
                                    <div class="setting-row">
                                        <label>Error Reporting</label>
                                        <div class="toggle-switch">
                                            <input type="checkbox" id="error-reporting" checked 
                                                   onchange="Settings.updateSetting('errorReporting', this.checked)">
                                            <span class="toggle-slider"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Storage Section -->
                        <div class="settings-section" id="storage-section">
                            <div class="section-header">
                                <h3>💾 Storage Settings</h3>
                                <p>Manage storage and temporary files</p>
                            </div>

                            <div class="settings-grid">
                                <div class="setting-group">
                                    <h4>Storage Usage</h4>
                                    <div class="storage-visual" id="storage-visual">
                                        <!-- Storage info will be populated here -->
                                    </div>
                                </div>

                                <div class="setting-group">
                                    <h4>Cleanup</h4>
                                    <div class="setting-row">
                                        <label>Auto-cleanup Temporary Files</label>
                                        <div class="toggle-switch">
                                            <input type="checkbox" id="auto-cleanup" checked 
                                                   onchange="Settings.updateSetting('autoCleanup', this.checked)">
                                            <span class="toggle-slider"></span>
                                        </div>
                                    </div>
                                    <div class="setting-row">
                                        <button class="action-btn" onclick="Settings.clearCache()">
                                            <i class="fas fa-broom"></i>
                                            Clear Cache
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- About Section -->
                        <div class="settings-section" id="about-section">
                            <div class="section-header">
                                <h3>ℹ️ About EmberFrame</h3>
                                <p>System information and credits</p>
                            </div>

                            <div class="about-content">
                                <div class="about-logo">
                                    <div class="ember-icon">🔥</div>
                                    <h2>EmberFrame</h2>
                                    <p>Advanced Desktop Environment</p>
                                </div>

                                <div class="about-info">
                                    <div class="info-grid">
                                        <div class="info-item">
                                            <strong>Version:</strong>
                                            <span>3.0.0</span>
                                        </div>
                                        <div class="info-item">
                                            <strong>Built:</strong>
                                            <span>${new Date().toLocaleDateString()}</span>
                                        </div>
                                        <div class="info-item">
                                            <strong>User:</strong>
                                            <span id="current-user">${window.EmberFrame?.currentUser || 'Unknown'}</span>
                                        </div>
                                        <div class="info-item">
                                            <strong>Session:</strong>
                                            <span id="session-time">Active</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="about-actions">
                                    <button class="action-btn" onclick="Settings.exportSettings()">
                                        <i class="fas fa-download"></i>
                                        Export Settings
                                    </button>
                                    <button class="action-btn" onclick="Settings.importSettings()">
                                        <i class="fas fa-upload"></i>
                                        Import Settings
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Live Preview Indicator -->
                    <div class="live-indicator" id="live-indicator">
                        <i class="fas fa-circle"></i>
                        <span>Live Preview</span>
                    </div>
                </div>

                <!-- Hidden file input for importing -->
                <input type="file" id="import-file-input" accept=".json" style="display: none;">

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
                    font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
                    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                    color: #2c3e50;
                    position: relative;
                }

                /* Sidebar */
                .settings-sidebar {
                    width: 280px;
                    background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
                    color: white;
                    display: flex;
                    flex-direction: column;
                    box-shadow: 2px 0 10px rgba(0,0,0,0.1);
                }

                .settings-header {
                    padding: 30px 25px;
                    border-bottom: 1px solid rgba(255,255,255,0.1);
                    text-align: center;
                }

                .settings-header h2 {
                    margin: 0 0 8px 0;
                    font-size: 24px;
                    font-weight: 700;
                }

                .settings-header p {
                    margin: 0;
                    opacity: 0.8;
                    font-size: 14px;
                }

                .settings-nav {
                    flex: 1;
                    padding: 20px 0;
                }

                .nav-item {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    padding: 15px 25px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border-left: 3px solid transparent;
                    font-weight: 500;
                }

                .nav-item:hover {
                    background: rgba(255,255,255,0.1);
                    padding-left: 30px;
                }

                .nav-item.active {
                    background: rgba(255,255,255,0.15);
                    border-left-color: #3498db;
                    font-weight: 600;
                }

                .nav-item i {
                    width: 20px;
                    text-align: center;
                    font-size: 16px;
                }

                .settings-footer {
                    padding: 20px 25px;
                    border-top: 1px solid rgba(255,255,255,0.1);
                }

                .reset-btn {
                    width: 100%;
                    padding: 12px 20px;
                    background: transparent;
                    border: 2px solid rgba(255,255,255,0.3);
                    color: white;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-weight: 500;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                }

                .reset-btn:hover {
                    background: rgba(231, 76, 60, 0.2);
                    border-color: #e74c3c;
                }

                /* Content Area */
                .settings-content {
                    flex: 1;
                    overflow-y: auto;
                    padding: 30px;
                }

                .settings-section {
                    display: none;
                }

                .settings-section.active {
                    display: block;
                }

                .section-header {
                    margin-bottom: 30px;
                    padding-bottom: 20px;
                    border-bottom: 2px solid #e9ecef;
                }

                .section-header h3 {
                    margin: 0 0 8px 0;
                    font-size: 28px;
                    font-weight: 700;
                    color: #2c3e50;
                }

                .section-header p {
                    margin: 0;
                    color: #6c757d;
                    font-size: 16px;
                }

                .settings-grid {
                    display: grid;
                    gap: 25px;
                }

                .setting-group {
                    background: white;
                    padding: 25px;
                    border-radius: 12px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.08);
                    border: 1px solid #e9ecef;
                }

                .setting-group h4 {
                    margin: 0 0 20px 0;
                    font-size: 18px;
                    font-weight: 600;
                    color: #2c3e50;
                    padding-bottom: 12px;
                    border-bottom: 1px solid #e9ecef;
                }

                .setting-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 15px;
                    padding: 12px 0;
                }

                .setting-row:last-child {
                    margin-bottom: 0;
                }

                .setting-row label {
                    font-weight: 500;
                    color: #495057;
                    flex: 1;
                }

                /* Theme Grid */
                .theme-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
                    gap: 15px;
                    margin-top: 15px;
                }

                .theme-option {
                    aspect-ratio: 1;
                    border-radius: 12px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border: 3px solid transparent;
                    position: relative;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: 600;
                    font-size: 12px;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                .theme-option:hover {
                    transform: scale(1.05);
                    box-shadow: 0 8px 25px rgba(0,0,0,0.2);
                }

                .theme-option.active {
                    border-color: #3498db;
                    transform: scale(1.08);
                    box-shadow: 0 8px 25px rgba(52, 152, 219, 0.4);
                }

                /* Form Controls */
                .toggle-switch {
                    position: relative;
                    width: 50px;
                    height: 24px;
                }

                .toggle-switch input {
                    opacity: 0;
                    width: 0;
                    height: 0;
                }

                .toggle-slider {
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

                .toggle-slider:before {
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

                input:checked + .toggle-slider {
                    background-color: #3498db;
                }

                input:checked + .toggle-slider:before {
                    transform: translateX(26px);
                }

                .slider-container {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    min-width: 200px;
                }

                .slider-container input[type="range"] {
                    flex: 1;
                    height: 6px;
                    border-radius: 3px;
                    background: #e9ecef;
                    outline: none;
                    -webkit-appearance: none;
                }

                .slider-container input[type="range"]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    background: #3498db;
                    cursor: pointer;
                    box-shadow: 0 2px 6px rgba(0,0,0,0.2);
                }

                .slider-value {
                    font-weight: 600;
                    color: #3498db;
                    min-width: 45px;
                    text-align: right;
                    font-size: 14px;
                }

                select {
                    padding: 8px 12px;
                    border: 2px solid #e9ecef;
                    border-radius: 6px;
                    background: white;
                    font-size: 14px;
                    min-width: 150px;
                    cursor: pointer;
                    transition: border-color 0.3s ease;
                }

                select:focus {
                    outline: none;
                    border-color: #3498db;
                }

                .color-input-container {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .color-input-container input[type="color"] {
                    width: 40px;
                    height: 40px;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    padding: 0;
                }

                .color-input-container input[type="text"] {
                    width: 80px;
                    padding: 6px 8px;
                    border: 2px solid #e9ecef;
                    border-radius: 4px;
                    font-family: monospace;
                    font-size: 12px;
                    text-transform: uppercase;
                }

                /* Background Section */
                .background-preview {
                    margin-bottom: 30px;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                }

                .preview-screen {
                    width: 100%;
                    height: 200px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    overflow: hidden;
                }

                .preview-content {
                    color: white;
                    font-size: 18px;
                    font-weight: 600;
                    text-shadow: 0 2px 4px rgba(0,0,0,0.5);
                    z-index: 10;
                    position: relative;
                }

                .bg-type-tabs {
                    display: flex;
                    gap: 8px;
                    margin-top: 15px;
                    flex-wrap: wrap;
                }

                .bg-tab {
                    padding: 12px 16px;
                    border: 2px solid #e9ecef;
                    background: white;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-size: 14px;
                    font-weight: 500;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .bg-tab:hover {
                    border-color: #3498db;
                    background: #f8f9fa;
                }

                .bg-tab.active {
                    background: #3498db;
                    color: white;
                    border-color: #3498db;
                }

                .bg-controls {
                    background: #f8f9fa;
                    padding: 20px;
                    border-radius: 8px;
                    margin-top: 15px;
                }

                .gradient-colors {
                    margin-top: 15px;
                    padding-top: 15px;
                    border-top: 1px solid #e9ecef;
                }

                /* Preset Grid */
                .preset-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
                    gap: 12px;
                    margin-top: 15px;
                }

                .preset-option {
                    aspect-ratio: 1;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border: 2px solid transparent;
                    position: relative;
                    overflow: hidden;
                }

                .preset-option:hover {
                    transform: scale(1.05);
                    border-color: #3498db;
                }

                /* Storage Visual */
                .storage-visual {
                    background: #f8f9fa;
                    padding: 20px;
                    border-radius: 8px;
                    text-align: center;
                }

                .storage-circle {
                    width: 120px;
                    height: 120px;
                    border-radius: 50%;
                    background: conic-gradient(#3498db 0deg 180deg, #e9ecef 180deg 360deg);
                    margin: 0 auto 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                }

                .storage-circle::before {
                    content: '';
                    width: 80px;
                    height: 80px;
                    background: white;
                    border-radius: 50%;
                    position: absolute;
                }

                .storage-text {
                    position: relative;
                    z-index: 1;
                    font-weight: 600;
                    color: #2c3e50;
                }

                /* About Section */
                .about-content {
                    text-align: center;
                    max-width: 600px;
                    margin: 0 auto;
                }

                .about-logo {
                    margin-bottom: 40px;
                }

                .ember-icon {
                    font-size: 80px;
                    margin-bottom: 20px;
                    animation: ember-glow 3s ease-in-out infinite alternate;
                }

                @keyframes ember-glow {
                    0% { filter: drop-shadow(0 0 10px #ff6b6b); }
                    100% { filter: drop-shadow(0 0 30px #ff4757); }
                }

                .about-logo h2 {
                    margin: 0 0 10px 0;
                    font-size: 36px;
                    font-weight: 700;
                    color: #2c3e50;
                }

                .about-logo p {
                    margin: 0;
                    font-size: 18px;
                    color: #6c757d;
                }

                .about-info {
                    margin-bottom: 40px;
                }

                .info-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 20px;
                    max-width: 400px;
                    margin: 0 auto;
                }

                .info-item {
                    display: flex;
                    justify-content: space-between;
                    padding: 15px;
                    background: white;
                    border-radius: 8px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
                }

                .about-actions {
                    display: flex;
                    gap: 15px;
                    justify-content: center;
                    flex-wrap: wrap;
                }

                .action-btn {
                    padding: 12px 24px;
                    background: #3498db;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-weight: 500;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .action-btn:hover {
                    background: #2980b9;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
                }

                /* Live Indicator */
                .live-indicator {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    background: rgba(46, 204, 113, 0.9);
                    color: white;
                    padding: 8px 16px;
                    border-radius: 20px;
                    font-size: 12px;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    z-index: 1000;
                    backdrop-filter: blur(10px);
                    animation: pulse 2s infinite;
                }

                .live-indicator i {
                    animation: blink 1.5s infinite;
                }

                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                }

                @keyframes blink {
                    0%, 50% { opacity: 1; }
                    51%, 100% { opacity: 0.3; }
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

                    .settings-nav {
                        display: flex;
                        flex-wrap: wrap;
                        padding: 10px;
                    }

                    .nav-item {
                        flex: 1;
                        min-width: 150px;
                        justify-content: center;
                        padding: 10px;
                        border-left: none;
                        border-bottom: 3px solid transparent;
                    }

                    .nav-item.active {
                        border-left: none;
                        border-bottom-color: #3498db;
                    }

                    .settings-content {
                        padding: 20px;
                    }

                    .theme-grid {
                        grid-template-columns: repeat(3, 1fr);
                    }

                    .bg-type-tabs {
                        grid-template-columns: repeat(2, 1fr);
                    }

                    .info-grid {
                        grid-template-columns: 1fr;
                    }

                    .about-actions {
                        flex-direction: column;
                        align-items: center;
                    }
                }

                /* Particle Animation Canvas */
                .particles-canvas {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                }

                /* Animation Keyframes for Background Effects */
                @keyframes wave-motion {
                    0%, 100% { 
                        background-position: 0% 50%; 
                        transform: scale(1);
                    }
                    50% { 
                        background-position: 100% 50%; 
                        transform: scale(1.05);
                    }
                }

                @keyframes pulse-bg {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.8; transform: scale(1.02); }
                }

                @keyframes rotate-bg {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                @keyframes float-bg {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }

                .matrix-rain {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                }

                .matrix-column {
                    position: absolute;
                    top: -100%;
                    color: #00ff00;
                    font-family: monospace;
                    font-size: 14px;
                    animation: matrix-fall linear infinite;
                }

                @keyframes matrix-fall {
                    to { top: 100%; }
                }
            </style>
        `;
    }

    static init(windowElement) {
        this.currentWindow = windowElement;
        this.currentSettings = {};
        this.backgroundType = 'gradient';
        this.particlesAnimation = null;
        this.matrixInterval = null;

        this.loadSettings();
        this.setupEventListeners();
        this.initializeThemes();
        this.initializePresets();
        this.updateAllSliderValues();

        // Start live preview
        setTimeout(() => {
            this.updateBackground();
        }, 500);
    }

    static setupEventListeners() {
        // Navigation
        this.currentWindow.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                this.switchSection(item.dataset.section);
            });
        });

        // Import file input
        const importInput = this.currentWindow.querySelector('#import-file-input');
        importInput.addEventListener('change', (e) => {
            this.handleImportFile(e.target.files[0]);
        });
    }

    static switchSection(sectionName) {
        // Update navigation
        this.currentWindow.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        this.currentWindow.querySelector(`[data-section="${sectionName}"]`).classList.add('active');

        // Update content
        this.currentWindow.querySelectorAll('.settings-section').forEach(section => {
            section.classList.remove('active');
        });
        this.currentWindow.querySelector(`#${sectionName}-section`).classList.add('active');

        // Load section-specific data
        if (sectionName === 'storage') {
            this.loadStorageInfo();
        }
    }

    static initializeThemes() {
        const themes = [
            { id: 'cyber-blue', name: 'Cyber Blue', colors: ['#00ffff', '#0066ff'], bg: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%)' },
            { id: 'ember-red', name: 'Ember Red', colors: ['#ff4500', '#dc143c'], bg: 'linear-gradient(135deg, #1a0a00 0%, #2d1a0a 100%)' },
            { id: 'matrix-green', name: 'Matrix Green', colors: ['#00ff00', '#008800'], bg: 'linear-gradient(135deg, #000000 0%, #001100 100%)' },
            { id: 'neon-purple', name: 'Neon Purple', colors: ['#8000ff', '#4000cc'], bg: 'linear-gradient(135deg, #0a0010 0%, #1a1030 100%)' },
            { id: 'ice-blue', name: 'Ice Blue', colors: ['#80e0ff', '#4080ff'], bg: 'linear-gradient(135deg, #050510 0%, #101530 100%)' },
            { id: 'sunset-orange', name: 'Sunset Orange', colors: ['#ff8c00', '#ff4500'], bg: 'linear-gradient(135deg, #1a1000 0%, #2d1a00 100%)' }
        ];

        const themeGrid = this.currentWindow.querySelector('#theme-grid');
        themeGrid.innerHTML = themes.map(theme => `
            <div class="theme-option ${theme.id === (this.currentSettings.theme || 'cyber-blue') ? 'active' : ''}" 
                 data-theme="${theme.id}" 
                 style="background: ${theme.bg}"
                 onclick="Settings.selectTheme('${theme.id}')">
                ${theme.name}
            </div>
        `).join('');
    }

    static initializePresets() {
        const presets = [
            { name: 'Ocean Wave', type: 'gradient', config: { type: 'linear', angle: 45, colors: ['#667eea', '#764ba2', '#00d4ff'] } },
            { name: 'Sunset', type: 'gradient', config: { type: 'linear', angle: 180, colors: ['#ff6b6b', '#feca57'] } },
            { name: 'Forest', type: 'gradient', config: { type: 'radial', colors: ['#134e5e', '#71b280'] } },
            { name: 'Space', type: 'particles', config: { count: 100, size: 2, color: '#ffffff', bg: '#000011' } },
            { name: 'Matrix', type: 'animated', config: { type: 'matrix', speed: 5, colors: ['#001100', '#00ff00'] } },
            { name: 'Circuit', type: 'pattern', config: { type: 'circuit', size: 50, color: '#00d4ff', bg: '#0a0a0f' } }
        ];

        const presetGrid = this.currentWindow.querySelector('#preset-grid');
        presetGrid.innerHTML = presets.map((preset, index) => `
            <div class="preset-option" 
                 style="background: ${this.getPresetBackground(preset)}"
                 onclick="Settings.applyPreset(${index})"
                 title="${preset.name}">
            </div>
        `).join('');
    }

    static getPresetBackground(preset) {
        switch (preset.type) {
            case 'gradient':
                const colors = preset.config.colors.join(', ');
                return `${preset.config.type}-gradient(${preset.config.angle || 45}deg, ${colors})`;
            case 'particles':
                return preset.config.bg;
            case 'pattern':
                return preset.config.bg;
            default:
                return '#667eea';
        }
    }

    static selectTheme(themeId) {
        // Update theme selection
        this.currentWindow.querySelectorAll('.theme-option').forEach(option => {
            option.classList.remove('active');
        });
        this.currentWindow.querySelector(`[data-theme="${themeId}"]`).classList.add('active');

        this.updateSetting('theme', themeId);
    }

    static switchBackgroundType(type) {
        this.backgroundType = type;

        // Update tabs
        this.currentWindow.querySelectorAll('.bg-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        this.currentWindow.querySelector(`[data-type="${type}"]`).classList.add('active');

        // Show/hide controls
        this.currentWindow.querySelectorAll('.bg-controls').forEach(control => {
            control.style.display = 'none';
        });
        const controlsId = `${type}-controls`;
        const controls = this.currentWindow.querySelector(`#${controlsId}`);
        if (controls) {
            controls.style.display = 'block';
        }

        this.updateBackground();
    }

    static updateBackground() {
        const preview = this.currentWindow.querySelector('.preview-screen');
        let backgroundCSS = '';

        switch (this.backgroundType) {
            case 'solid':
                const bgColor = this.currentWindow.querySelector('#bg-color').value;
                backgroundCSS = bgColor;
                break;

            case 'gradient':
                backgroundCSS = this.generateGradientCSS();
                break;

            case 'pattern':
                backgroundCSS = this.generatePatternCSS();
                break;

            case 'animated':
                backgroundCSS = this.generateAnimatedCSS();
                break;

            case 'particles':
                backgroundCSS = this.generateParticlesCSS();
                break;
        }

        preview.style.background = backgroundCSS;

        // Apply to main desktop immediately (live preview)
        this.applyToDesktop(backgroundCSS);

        // Save setting
        this.saveBackgroundSetting();
    }

    static generateGradientCSS() {
        const type = this.currentWindow.querySelector('#gradient-type').value;
        const angle = this.currentWindow.querySelector('#gradient-angle').value;
        const color1 = this.currentWindow.querySelector('#gradient-color1').value;
        const color2 = this.currentWindow.querySelector('#gradient-color2').value;
        const useColor3 = this.currentWindow.querySelector('#use-color3').checked;
        const color3 = this.currentWindow.querySelector('#gradient-color3').value;

        let colors = `${color1}, ${color2}`;
        if (useColor3) {
            colors += `, ${color3}`;
        }

        if (type === 'linear') {
            return `linear-gradient(${angle}deg, ${colors})`;
        } else if (type === 'radial') {
            return `radial-gradient(circle, ${colors})`;
        } else if (type === 'conic') {
            return `conic-gradient(from ${angle}deg, ${colors})`;
        }
    }

    static generatePatternCSS() {
        const type = this.currentWindow.querySelector('#pattern-type').value;
        const size = this.currentWindow.querySelector('#pattern-size').value;
        const color = this.currentWindow.querySelector('#pattern-color').value;
        const opacity = this.currentWindow.querySelector('#pattern-opacity').value;
        const bgColor = this.currentWindow.querySelector('#pattern-bg-color').value;

        const patternColor = `${color}${Math.round(opacity * 2.55).toString(16).padStart(2, '0')}`;

        let pattern = '';
        switch (type) {
            case 'grid':
                pattern = `linear-gradient(${patternColor} 1px, transparent 1px), linear-gradient(90deg, ${patternColor} 1px, transparent 1px)`;
                break;
            case 'dots':
                pattern = `radial-gradient(circle, ${patternColor} 2px, transparent 2px)`;
                break;
            case 'diagonal':
                pattern = `repeating-linear-gradient(45deg, ${patternColor}, ${patternColor} 2px, transparent 2px, transparent ${size}px)`;
                break;
            case 'hexagon':
                pattern = `radial-gradient(circle at 50% 50%, ${patternColor} 40%, transparent 41%)`;
                break;
            case 'circuit':
                pattern = `linear-gradient(${patternColor} 2px, transparent 2px), linear-gradient(90deg, ${patternColor} 2px, transparent 2px)`;
                break;
        }

        return `${bgColor}, ${pattern}`;
    }

    static generateAnimatedCSS() {
        const type = this.currentWindow.querySelector('#animation-type').value;
        const speed = this.currentWindow.querySelector('#animation-speed').value;
        const color1 = this.currentWindow.querySelector('#anim-color1').value;
        const color2 = this.currentWindow.querySelector('#anim-color2').value;

        const duration = `${12 - speed}s`;

        switch (type) {
            case 'wave':
                return `linear-gradient(-45deg, ${color1}, ${color2}, ${color1}, ${color2})`;
            case 'pulse':
                return `radial-gradient(circle, ${color1}, ${color2})`;
            case 'rotate':
                return `conic-gradient(${color1}, ${color2}, ${color1})`;
            case 'float':
                return `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`;
            case 'matrix':
                this.startMatrixAnimation();
                return '#000011';
        }
    }

    static generateParticlesCSS() {
        const bgColor = this.currentWindow.querySelector('#particles-bg-color').value;
        this.startParticlesAnimation();
        return bgColor;
    }

    static startParticlesAnimation() {
        const preview = this.currentWindow.querySelector('.preview-screen');

        // Clear existing particles
        const existingCanvas = preview.querySelector('.particles-canvas');
        if (existingCanvas) {
            existingCanvas.remove();
        }

        const canvas = document.createElement('canvas');
        canvas.className = 'particles-canvas';
        canvas.width = preview.offsetWidth;
        canvas.height = preview.offsetHeight;
        preview.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        const particles = [];

        const count = parseInt(this.currentWindow.querySelector('#particle-count').value);
        const size = parseInt(this.currentWindow.querySelector('#particle-size').value);
        const speed = parseInt(this.currentWindow.querySelector('#particle-speed').value);
        const color = this.currentWindow.querySelector('#particle-color').value;
        const showLines = this.currentWindow.querySelector('#particle-lines').checked;

        // Create particles
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * speed,
                vy: (Math.random() - 0.5) * speed,
                size: size + Math.random() * 2
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw particles
            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Bounce off edges
                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

                // Keep in bounds
                particle.x = Math.max(0, Math.min(canvas.width, particle.x));
                particle.y = Math.max(0, Math.min(canvas.height, particle.y));

                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = color;
                ctx.fill();
            });

            // Draw connection lines
            if (showLines) {
                particles.forEach((particle, i) => {
                    particles.slice(i + 1).forEach(otherParticle => {
                        const distance = Math.sqrt(
                            Math.pow(particle.x - otherParticle.x, 2) +
                            Math.pow(particle.y - otherParticle.y, 2)
                        );

                        if (distance < 100) {
                            ctx.beginPath();
                            ctx.moveTo(particle.x, particle.y);
                            ctx.lineTo(otherParticle.x, otherParticle.y);
                            ctx.strokeStyle = `${color}${Math.round((1 - distance / 100) * 50).toString(16).padStart(2, '0')}`;
                            ctx.stroke();
                        }
                    });
                });
            }

            requestAnimationFrame(animate);
        };

        animate();
    }

    static startMatrixAnimation() {
        const preview = this.currentWindow.querySelector('.preview-screen');

        // Clear existing matrix
        const existingMatrix = preview.querySelector('.matrix-rain');
        if (existingMatrix) {
            existingMatrix.remove();
        }
        if (this.matrixInterval) {
            clearInterval(this.matrixInterval);
        }

        const matrixContainer = document.createElement('div');
        matrixContainer.className = 'matrix-rain';
        preview.appendChild(matrixContainer);

        const characters = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        this.matrixInterval = setInterval(() => {
            if (Math.random() > 0.95) {
                const column = document.createElement('div');
                column.className = 'matrix-column';
                column.style.left = Math.random() * 100 + '%';
                column.style.animationDuration = (2 + Math.random() * 3) + 's';

                let text = '';
                for (let i = 0; i < 10 + Math.random() * 20; i++) {
                    text += characters[Math.floor(Math.random() * characters.length)] + '<br>';
                }
                column.innerHTML = text;

                matrixContainer.appendChild(column);

                setTimeout(() => {
                    if (column.parentNode) {
                        column.parentNode.removeChild(column);
                    }
                }, 5000);
            }
        }, 100);
    }

    static applyToDesktop(backgroundCSS) {
        // Apply background to the main desktop body
        if (document.body) {
            document.body.style.background = backgroundCSS;
        }
    }

    static updateSetting(key, value) {
        this.currentSettings[key] = value;
        this.applySetting(key, value);
        this.saveSettings();
    }

    static applySetting(key, value) {
        const root = document.documentElement;
        const body = document.body;

        switch (key) {
            case 'theme':
                this.applyTheme(value);
                break;
            case 'fontFamily':
                root.style.setProperty('--system-font', value);
                body.style.fontFamily = value;
                break;
            case 'fontSize':
                root.style.setProperty('--base-font-size', value + 'px');
                body.style.fontSize = value + 'px';
                this.updateSliderValue('font-size-value', value + 'px');
                break;
            case 'iconSize':
                root.style.setProperty('--icon-size', value + 'px');
                this.updateSliderValue('icon-size-value', value + 'px');
                break;
            case 'transparency':
                const opacity = (100 - value) / 100;
                root.style.setProperty('--window-opacity', opacity);
                this.updateSliderValue('transparency-value', value + '%');
                break;
            case 'showIconLabels':
                const labels = document.querySelectorAll('.icon-label');
                labels.forEach(label => {
                    label.style.display = value ? 'block' : 'none';
                });
                break;
            case 'blurEffects':
                if (!value) body.classList.add('no-blur');
                else body.classList.remove('no-blur');
                break;
            case 'iconShadows':
                if (!value) body.classList.add('no-icon-shadows');
                else body.classList.remove('no-icon-shadows');
                break;
            case 'animationsEnabled':
                if (!value) body.classList.add('no-animations');
                else body.classList.remove('no-animations');
                break;
            case 'animationQuality':
                body.classList.remove('animation-quality-none', 'animation-quality-low', 'animation-quality-medium');
                if (value !== 'high') {
                    body.classList.add(`animation-quality-${value}`);
                }
                break;
            case 'autoHideTaskbar':
                const taskbar = document.querySelector('.taskbar');
                if (taskbar) {
                    if (value) taskbar.classList.add('auto-hide');
                    else taskbar.classList.remove('auto-hide');
                }
                break;
            case 'showClock':
                const clock = document.querySelector('.time-display');
                if (clock) {
                    clock.style.display = value ? 'block' : 'none';
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
            'cyber-blue': { primary: '#00ffff', secondary: '#0066ff', background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%)' },
            'ember-red': { primary: '#ff4500', secondary: '#dc143c', background: 'linear-gradient(135deg, #1a0a00 0%, #2d1a0a 100%)' },
            'matrix-green': { primary: '#00ff00', secondary: '#008800', background: 'linear-gradient(135deg, #000000 0%, #001100 100%)' },
            'neon-purple': { primary: '#8000ff', secondary: '#4000cc', background: 'linear-gradient(135deg, #0a0010 0%, #1a1030 100%)' },
            'ice-blue': { primary: '#80e0ff', secondary: '#4080ff', background: 'linear-gradient(135deg, #050510 0%, #101530 100%)' },
            'sunset-orange': { primary: '#ff8c00', secondary: '#ff4500', background: 'linear-gradient(135deg, #1a1000 0%, #2d1a00 100%)' }
        };

        const theme = themes[themeName] || themes['cyber-blue'];
        const root = document.documentElement;

        root.style.setProperty('--primary-blue', theme.primary);
        root.style.setProperty('--neon-cyan', theme.secondary);

        console.log('Theme applied:', themeName);
    }

    static updateColorFromText(textInput, colorInputId) {
        const colorInput = this.currentWindow.querySelector(`#${colorInputId}`);
        if (colorInput) {
            colorInput.value = textInput.value;
            this.updateBackground();
        }
    }

    static updateAllSliderValues() {
        // Update all slider value displays
        const sliders = [
            { id: 'font-size', valueId: 'font-size-value', suffix: 'px' },
            { id: 'icon-size', valueId: 'icon-size-value', suffix: 'px' },
            { id: 'transparency', valueId: 'transparency-value', suffix: '%' },
            { id: 'gradient-angle', valueId: 'gradient-angle-value', suffix: '°' },
            { id: 'pattern-size', valueId: 'pattern-size-value', suffix: 'px' },
            { id: 'pattern-opacity', valueId: 'pattern-opacity-value', suffix: '%' },
            { id: 'animation-speed', valueId: 'animation-speed-value', suffix: '' },
            { id: 'particle-count', valueId: 'particle-count-value', suffix: '' },
            { id: 'particle-size', valueId: 'particle-size-value', suffix: 'px' },
            { id: 'particle-speed', valueId: 'particle-speed-value', suffix: '' }
        ];

        sliders.forEach(slider => {
            const input = this.currentWindow.querySelector(`#${slider.id}`);
            const valueDisplay = this.currentWindow.querySelector(`#${slider.valueId}`);
            if (input && valueDisplay) {
                valueDisplay.textContent = input.value + slider.suffix;
            }
        });
    }

    static updateSliderValue(valueId, value) {
        const element = this.currentWindow.querySelector(`#${valueId}`);
        if (element) {
            element.textContent = value;
        }
    }

    static saveBackgroundSetting() {
        const backgroundSetting = {
            type: this.backgroundType,
            config: this.getBackgroundConfig()
        };
        this.updateSetting('backgroundStyle', backgroundSetting);
    }

    static getBackgroundConfig() {
        switch (this.backgroundType) {
            case 'solid':
                return {
                    color: this.currentWindow.querySelector('#bg-color').value
                };
            case 'gradient':
                return {
                    type: this.currentWindow.querySelector('#gradient-type').value,
                    angle: this.currentWindow.querySelector('#gradient-angle').value,
                    colors: [
                        this.currentWindow.querySelector('#gradient-color1').value,
                        this.currentWindow.querySelector('#gradient-color2').value,
                        ...(this.currentWindow.querySelector('#use-color3').checked ?
                           [this.currentWindow.querySelector('#gradient-color3').value] : [])
                    ]
                };
            case 'pattern':
                return {
                    type: this.currentWindow.querySelector('#pattern-type').value,
                    size: this.currentWindow.querySelector('#pattern-size').value,
                    color: this.currentWindow.querySelector('#pattern-color').value,
                    opacity: this.currentWindow.querySelector('#pattern-opacity').value,
                    backgroundColor: this.currentWindow.querySelector('#pattern-bg-color').value
                };
            case 'animated':
                return {
                    type: this.currentWindow.querySelector('#animation-type').value,
                    speed: this.currentWindow.querySelector('#animation-speed').value,
                    colors: [
                        this.currentWindow.querySelector('#anim-color1').value,
                        this.currentWindow.querySelector('#anim-color2').value
                    ]
                };
            case 'particles':
                return {
                    count: this.currentWindow.querySelector('#particle-count').value,
                    size: this.currentWindow.querySelector('#particle-size').value,
                    speed: this.currentWindow.querySelector('#particle-speed').value,
                    color: this.currentWindow.querySelector('#particle-color').value,
                    backgroundColor: this.currentWindow.querySelector('#particles-bg-color').value,
                    showLines: this.currentWindow.querySelector('#particle-lines').checked
                };
        }
    }

    static async saveSettings() {
        try {
            const response = await fetch('/api/user/preferences', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ preferences: this.currentSettings })
            });

            if (response.ok) {
                console.log('Settings saved successfully');
            }
        } catch (error) {
            console.error('Failed to save settings:', error);
        }
    }

    static async loadSettings() {
        try {
            const response = await fetch('/api/user/preferences');
            const data = await response.json();

            if (response.ok && data.preferences) {
                this.currentSettings = data.preferences;
                this.applyLoadedSettings();
            }
        } catch (error) {
            console.error('Failed to load settings:', error);
        }
    }

    static applyLoadedSettings() {
        // Apply all loaded settings
        Object.keys(this.currentSettings).forEach(key => {
            this.applySetting(key, this.currentSettings[key]);
            this.updateFormControl(key, this.currentSettings[key]);
        });
    }

    static updateFormControl(key, value) {
        const element = this.currentWindow.querySelector(`#${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`);
        if (element) {
            if (element.type === 'checkbox') {
                element.checked = value;
            } else {
                element.value = value;
            }
        }
    }

    static applyPreset(presetIndex) {
        const presets = [
            { name: 'Ocean Wave', type: 'gradient', config: { type: 'linear', angle: 45, colors: ['#667eea', '#764ba2', '#00d4ff'] } },
            { name: 'Sunset', type: 'gradient', config: { type: 'linear', angle: 180, colors: ['#ff6b6b', '#feca57'] } },
            { name: 'Forest', type: 'gradient', config: { type: 'radial', colors: ['#134e5e', '#71b280'] } },
            { name: 'Space', type: 'particles', config: { count: 100, size: 2, color: '#ffffff', bg: '#000011' } },
            { name: 'Matrix', type: 'animated', config: { type: 'matrix', speed: 5, colors: ['#001100', '#00ff00'] } },
            { name: 'Circuit', type: 'pattern', config: { type: 'circuit', size: 50, color: '#00d4ff', bg: '#0a0a0f' } }
        ];

        const preset = presets[presetIndex];
        if (preset) {
            this.switchBackgroundType(preset.type);
            this.applyPresetConfig(preset.config);
            this.updateBackground();
        }
    }

    static applyPresetConfig(config) {
        // Apply configuration based on preset
        Object.keys(config).forEach(key => {
            const element = this.currentWindow.querySelector(`#${key}`);
            if (element) {
                element.value = config[key];
            }
        });
    }

    static async loadStorageInfo() {
        try {
            const response = await fetch('/api/files/storage-info');
            const data = await response.json();

            if (response.ok) {
                const usedPercent = data.total > 0 ? (data.used / data.total) * 100 : 0;
                const storageVisual = this.currentWindow.querySelector('#storage-visual');

                storageVisual.innerHTML = `
                    <div class="storage-circle" style="background: conic-gradient(#3498db 0deg ${usedPercent * 3.6}deg, #e9ecef ${usedPercent * 3.6}deg 360deg)">
                        <div class="storage-text">
                            <div style="font-size: 20px; font-weight: 700;">${Math.round(usedPercent)}%</div>
                            <div style="font-size: 12px;">Used</div>
                        </div>
                    </div>
                    <div style="margin-top: 20px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                            <span>Used:</span>
                            <span>${this.formatFileSize(data.used)}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                            <span>Total:</span>
                            <span>${this.formatFileSize(data.total)}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                            <span>Free:</span>
                            <span>${this.formatFileSize(data.total - data.used)}</span>
                        </div>
                    </div>
                `;
            }
        } catch (error) {
            console.error('Failed to load storage info:', error);
        }
    }

    static formatFileSize(bytes) {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    }

    static async clearCache() {
        if (!confirm('Clear application cache? This will remove temporary files and may improve performance.')) {
            return;
        }

        try {
            const response = await fetch('/api/user/clear-cache', { method: 'POST' });
            if (response.ok) {
                this.showNotification('Cache cleared successfully', 'success');
                this.loadStorageInfo();
            } else {
                this.showNotification('Failed to clear cache', 'error');
            }
        } catch (error) {
            this.showNotification('Error clearing cache: ' + error.message, 'error');
        }
    }

    static exportSettings() {
        const settings = {
            version: '3.0.0',
            exported: new Date().toISOString(),
            preferences: this.currentSettings
        };

        const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `emberframe-settings-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);

        this.showNotification('Settings exported successfully', 'success');
    }

    static importSettings() {
        this.currentWindow.querySelector('#import-file-input').click();
    }

    static async handleImportFile(file) {
        if (!file) return;

        try {
            const text = await file.text();
            const importedSettings = JSON.parse(text);

            if (importedSettings.preferences) {
                if (confirm('Import these settings? This will overwrite your current configuration.')) {
                    this.currentSettings = importedSettings.preferences;
                    this.applyLoadedSettings();
                    await this.saveSettings();
                    this.showNotification('Settings imported successfully', 'success');
                }
            } else {
                this.showNotification('Invalid settings file format', 'error');
            }
        } catch (error) {
            this.showNotification('Error importing settings: ' + error.message, 'error');
        }
    }

    static resetToDefaults() {
        if (!confirm('Reset all settings to defaults? This action cannot be undone.')) {
            return;
        }

        this.currentSettings = {};

        // Reset form controls
        this.currentWindow.querySelectorAll('input, select').forEach(input => {
            if (input.type === 'checkbox') {
                input.checked = input.hasAttribute('checked');
            } else {
                input.value = input.defaultValue || '';
            }
        });

        // Apply defaults
        this.applyLoadedSettings();
        this.saveSettings();
        this.showNotification('Settings reset to defaults', 'success');
    }

    static showNotification(message, type = 'info') {
        if (window.Notification) {
            window.Notification[type](message);
        } else {
            alert(message);
        }
    }

    static onClose(windowElement) {
        // Clean up animations
        if (this.particlesAnimation) {
            cancelAnimationFrame(this.particlesAnimation);
        }
        if (this.matrixInterval) {
            clearInterval(this.matrixInterval);
        }

        this.currentWindow = null;
        return true;
    }
}

window.Settings = Settings;