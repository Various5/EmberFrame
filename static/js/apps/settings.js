/**
 * APP_METADATA
 * @name Settings
 * @icon fas fa-cog
 * @description Comprehensive system settings and customization
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
                        <div class="sidebar-header">
                            <h2>⚙️ Settings</h2>
                            <p>Customize your EmberFrame experience</p>
                        </div>
                        
                        <div class="settings-nav">
                            <div class="nav-item active" data-section="appearance">
                                <i class="fas fa-palette"></i>
                                <span>Appearance</span>
                            </div>
                            <div class="nav-item" data-section="themes">
                                <i class="fas fa-brush"></i>
                                <span>Themes</span>
                            </div>
                            <div class="nav-item" data-section="backgrounds">
                                <i class="fas fa-image"></i>
                                <span>Backgrounds</span>
                            </div>
                            <div class="nav-item" data-section="desktop">
                                <i class="fas fa-desktop"></i>
                                <span>Desktop</span>
                            </div>
                            <div class="nav-item" data-section="notifications">
                                <i class="fas fa-bell"></i>
                                <span>Notifications</span>
                            </div>
                            <div class="nav-item" data-section="performance">
                                <i class="fas fa-tachometer-alt"></i>
                                <span>Performance</span>
                            </div>
                            <div class="nav-item" data-section="accessibility">
                                <i class="fas fa-universal-access"></i>
                                <span>Accessibility</span>
                            </div>
                            <div class="nav-item" data-section="system">
                                <i class="fas fa-cogs"></i>
                                <span>System</span>
                            </div>
                        </div>

                        <div class="settings-footer">
                            <button class="btn btn-secondary" onclick="Settings.resetToDefaults()">
                                <i class="fas fa-undo"></i> Reset All
                            </button>
                        </div>
                    </div>

                    <div class="settings-content">
                        <!-- Appearance Section -->
                        <div class="settings-section active" id="appearance-section">
                            <div class="section-header">
                                <h3>🎨 Appearance Settings</h3>
                                <p>Customize the visual appearance of your desktop</p>
                            </div>

                            <div class="settings-grid">
                                <div class="setting-group">
                                    <h4>💧 Transparency & Effects</h4>
                                    
                                    <div class="setting-item">
                                        <label>Window Transparency</label>
                                        <div class="slider-container">
                                            <input type="range" id="transparency-slider" min="0" max="50" value="5" class="slider">
                                            <span class="slider-value" id="transparency-value">95%</span>
                                        </div>
                                        <small>Adjust window transparency (0% = fully opaque, 50% = semi-transparent)</small>
                                    </div>

                                    <div class="setting-item">
                                        <label class="toggle-label">
                                            <input type="checkbox" id="blur-effects" checked>
                                            <span class="toggle-slider"></span>
                                            <span class="toggle-text">Blur Effects</span>
                                        </label>
                                        <small>Enable backdrop blur effects for windows and menus</small>
                                    </div>

                                    <div class="setting-item">
                                        <label class="toggle-label">
                                            <input type="checkbox" id="icon-shadows" checked>
                                            <span class="toggle-slider"></span>
                                            <span class="toggle-text">Icon Shadows</span>
                                        </label>
                                        <small>Add shadow effects to desktop icons</small>
                                    </div>

                                    <div class="setting-item">
                                        <label class="toggle-label">
                                            <input type="checkbox" id="animations-enabled" checked>
                                            <span class="toggle-slider"></span>
                                            <span class="toggle-text">Animations</span>
                                        </label>
                                        <small>Enable smooth animations and transitions</small>
                                    </div>
                                </div>

                                <div class="setting-group">
                                    <h4>📏 Size & Scaling</h4>
                                    
                                    <div class="setting-item">
                                        <label>Desktop Icon Size</label>
                                        <div class="slider-container">
                                            <input type="range" id="icon-size-slider" min="32" max="80" value="48" class="slider">
                                            <span class="slider-value" id="icon-size-value">48px</span>
                                        </div>
                                        <small>Adjust the size of desktop icons</small>
                                    </div>

                                    <div class="setting-item">
                                        <label>Font Size</label>
                                        <div class="slider-container">
                                            <input type="range" id="font-size-slider" min="12" max="20" value="14" class="slider">
                                            <span class="slider-value" id="font-size-value">14px</span>
                                        </div>
                                        <small>Adjust system font size for better readability</small>
                                    </div>

                                    <div class="setting-item">
                                        <label>Font Family</label>
                                        <select id="font-family-select" class="setting-select">
                                            <option value="'Rajdhani', sans-serif">Rajdhani (Default)</option>
                                            <option value="'Orbitron', monospace">Orbitron (Futuristic)</option>
                                            <option value="'Segoe UI', sans-serif">Segoe UI (Modern)</option>
                                            <option value="'Arial', sans-serif">Arial (Classic)</option>
                                            <option value="'Helvetica', sans-serif">Helvetica (Clean)</option>
                                            <option value="'Roboto', sans-serif">Roboto (Android)</option>
                                            <option value="'Monaco', monospace">Monaco (Code)</option>
                                        </select>
                                        <small>Choose your preferred system font</small>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Themes Section -->
                        <div class="settings-section" id="themes-section">
                            <div class="section-header">
                                <h3>🎨 Theme Gallery</h3>
                                <p>Choose from our collection of stunning themes</p>
                            </div>

                            <div class="themes-grid" id="themes-grid">
                                <!-- Theme cards will be generated here -->
                            </div>

                            <div class="setting-group">
                                <h4>🎨 Custom Theme Editor</h4>
                                <div class="custom-theme-editor">
                                    <div class="color-picker-group">
                                        <label>Primary Color</label>
                                        <input type="color" id="primary-color" value="#00d4ff">
                                    </div>
                                    <div class="color-picker-group">
                                        <label>Secondary Color</label>
                                        <input type="color" id="secondary-color" value="#0099cc">
                                    </div>
                                    <div class="color-picker-group">
                                        <label>Accent Color</label>
                                        <input type="color" id="accent-color" value="#00ffff">
                                    </div>
                                    <button class="btn btn-primary" onclick="Settings.applyCustomTheme()">
                                        <i class="fas fa-palette"></i> Apply Custom Theme
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Backgrounds Section -->
                        <div class="settings-section" id="backgrounds-section">
                            <div class="section-header">
                                <h3>🖼️ Dynamic Backgrounds</h3>
                                <p>Select from beautiful animated and static backgrounds</p>
                            </div>

                            <div class="background-categories">
                                <div class="bg-category active" data-category="dynamic">Dynamic</div>
                                <div class="bg-category" data-category="gradients">Gradients</div>
                                <div class="bg-category" data-category="patterns">Patterns</div>
                                <div class="bg-category" data-category="space">Space</div>
                                <div class="bg-category" data-category="nature">Nature</div>
                                <div class="bg-category" data-category="abstract">Abstract</div>
                            </div>

                            <div class="backgrounds-grid" id="backgrounds-grid">
                                <!-- Background options will be generated here -->
                            </div>

                            <div class="setting-group">
                                <h4>🎬 Animation Settings</h4>
                                <div class="setting-item">
                                    <label>Animation Speed</label>
                                    <div class="slider-container">
                                        <input type="range" id="bg-speed-slider" min="1" max="10" value="5" class="slider">
                                        <span class="slider-value" id="bg-speed-value">Normal</span>
                                    </div>
                                    <small>Control background animation speed</small>
                                </div>

                                <div class="setting-item">
                                    <label class="toggle-label">
                                        <input type="checkbox" id="bg-particles" checked>
                                        <span class="toggle-slider"></span>
                                        <span class="toggle-text">Floating Particles</span>
                                    </label>
                                    <small>Add animated particles to the background</small>
                                </div>
                            </div>
                        </div>

                        <!-- Desktop Section -->
                        <div class="settings-section" id="desktop-section">
                            <div class="section-header">
                                <h3>🖥️ Desktop Behavior</h3>
                                <p>Configure how your desktop works and looks</p>
                            </div>

                            <div class="settings-grid">
                                <div class="setting-group">
                                    <h4>📋 Taskbar Settings</h4>
                                    
                                    <div class="setting-item">
                                        <label class="toggle-label">
                                            <input type="checkbox" id="auto-hide-taskbar">
                                            <span class="toggle-slider"></span>
                                            <span class="toggle-text">Auto-hide Taskbar</span>
                                        </label>
                                        <small>Automatically hide taskbar when not needed</small>
                                    </div>

                                    <div class="setting-item">
                                        <label class="toggle-label">
                                            <input type="checkbox" id="show-clock" checked>
                                            <span class="toggle-slider"></span>
                                            <span class="toggle-text">Show Clock</span>
                                        </label>
                                        <small>Display time in the system tray</small>
                                    </div>

                                    <div class="setting-item">
                                        <label>Taskbar Position</label>
                                        <select id="taskbar-position" class="setting-select">
                                            <option value="bottom">Bottom</option>
                                            <option value="top">Top</option>
                                            <option value="left">Left</option>
                                            <option value="right">Right</option>
                                        </select>
                                        <small>Position of the taskbar on screen</small>
                                    </div>
                                </div>

                                <div class="setting-group">
                                    <h4>🏷️ Icon Settings</h4>
                                    
                                    <div class="setting-item">
                                        <label class="toggle-label">
                                            <input type="checkbox" id="show-icon-labels" checked>
                                            <span class="toggle-slider"></span>
                                            <span class="toggle-text">Show Icon Labels</span>
                                        </label>
                                        <small>Display text labels under desktop icons</small>
                                    </div>

                                    <div class="setting-item">
                                        <label class="toggle-label">
                                            <input type="checkbox" id="snap-to-grid" checked>
                                            <span class="toggle-slider"></span>
                                            <span class="toggle-text">Snap Icons to Grid</span>
                                        </label>
                                        <small>Automatically align icons to an invisible grid</small>
                                    </div>

                                    <div class="setting-item">
                                        <label>Icon Arrangement</label>
                                        <select id="icon-arrangement" class="setting-select">
                                            <option value="auto">Auto Arrange</option>
                                            <option value="manual">Manual</option>
                                            <option value="columns">Columns</option>
                                            <option value="rows">Rows</option>
                                        </select>
                                        <small>How desktop icons are arranged</small>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Notifications Section -->
                        <div class="settings-section" id="notifications-section">
                            <div class="section-header">
                                <h3>🔔 Notification Settings</h3>
                                <p>Control how and when you receive notifications</p>
                            </div>

                            <div class="settings-grid">
                                <div class="setting-group">
                                    <h4>📍 Notification Position</h4>
                                    
                                    <div class="notification-positions">
                                        <div class="position-grid">
                                            <div class="position-option" data-position="top-left">
                                                <div class="position-demo">
                                                    <div class="demo-notification top-left"></div>
                                                </div>
                                                <span>Top Left</span>
                                            </div>
                                            <div class="position-option active" data-position="top-right">
                                                <div class="position-demo">
                                                    <div class="demo-notification top-right"></div>
                                                </div>
                                                <span>Top Right</span>
                                            </div>
                                            <div class="position-option" data-position="bottom-left">
                                                <div class="position-demo">
                                                    <div class="demo-notification bottom-left"></div>
                                                </div>
                                                <span>Bottom Left</span>
                                            </div>
                                            <div class="position-option" data-position="bottom-right">
                                                <div class="position-demo">
                                                    <div class="demo-notification bottom-right"></div>
                                                </div>
                                                <span>Bottom Right</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="setting-group">
                                    <h4>⚙️ Behavior</h4>
                                    
                                    <div class="setting-item">
                                        <label>Notification Duration</label>
                                        <div class="slider-container">
                                            <input type="range" id="notification-duration" min="1" max="10" value="4" class="slider">
                                            <span class="slider-value" id="notification-duration-value">4s</span>
                                        </div>
                                        <small>How long notifications stay visible</small>
                                    </div>

                                    <div class="setting-item">
                                        <label class="toggle-label">
                                            <input type="checkbox" id="notification-sounds" checked>
                                            <span class="toggle-slider"></span>
                                            <span class="toggle-text">Notification Sounds</span>
                                        </label>
                                        <small>Play sound when notifications appear</small>
                                    </div>

                                    <div class="setting-item">
                                        <label class="toggle-label">
                                            <input type="checkbox" id="do-not-disturb">
                                            <span class="toggle-slider"></span>
                                            <span class="toggle-text">Do Not Disturb</span>
                                        </label>
                                        <small>Temporarily disable all notifications</small>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Performance Section -->
                        <div class="settings-section" id="performance-section">
                            <div class="section-header">
                                <h3>⚡ Performance Settings</h3>
                                <p>Optimize EmberFrame for your system capabilities</p>
                            </div>

                            <div class="settings-grid">
                                <div class="setting-group">
                                    <h4>🎭 Animation Quality</h4>
                                    
                                    <div class="animation-quality-options">
                                        <div class="quality-option active" data-quality="high">
                                            <i class="fas fa-rocket"></i>
                                            <span>High Quality</span>
                                            <small>Full animations & effects</small>
                                        </div>
                                        <div class="quality-option" data-quality="medium">
                                            <i class="fas fa-balance-scale"></i>
                                            <span>Balanced</span>
                                            <small>Reduced effects</small>
                                        </div>
                                        <div class="quality-option" data-quality="low">
                                            <i class="fas fa-tachometer-alt"></i>
                                            <span>Performance</span>
                                            <small>Minimal effects</small>
                                        </div>
                                        <div class="quality-option" data-quality="none">
                                            <i class="fas fa-ban"></i>
                                            <span>Disabled</span>
                                            <small>No animations</small>
                                        </div>
                                    </div>
                                </div>

                                <div class="setting-group">
                                    <h4>🔧 Advanced</h4>
                                    
                                    <div class="setting-item">
                                        <label class="toggle-label">
                                            <input type="checkbox" id="hardware-acceleration" checked>
                                            <span class="toggle-slider"></span>
                                            <span class="toggle-text">Hardware Acceleration</span>
                                        </label>
                                        <small>Use GPU acceleration for better performance</small>
                                    </div>

                                    <div class="setting-item">
                                        <label class="toggle-label">
                                            <input type="checkbox" id="reduce-motion">
                                            <span class="toggle-slider"></span>
                                            <span class="toggle-text">Reduce Motion</span>
                                        </label>
                                        <small>Minimize animations for sensitive users</small>
                                    </div>

                                    <div class="setting-item">
                                        <label>Frame Rate Limit</label>
                                        <select id="fps-limit" class="setting-select">
                                            <option value="60">60 FPS (Smooth)</option>
                                            <option value="30">30 FPS (Balanced)</option>
                                            <option value="15">15 FPS (Battery Save)</option>
                                        </select>
                                        <small>Limit frame rate to save battery</small>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Accessibility Section -->
                        <div class="settings-section" id="accessibility-section">
                            <div class="section-header">
                                <h3>♿ Accessibility</h3>
                                <p>Make EmberFrame more accessible for everyone</p>
                            </div>

                            <div class="settings-grid">
                                <div class="setting-group">
                                    <h4>👁️ Visual Accessibility</h4>
                                    
                                    <div class="setting-item">
                                        <label class="toggle-label">
                                            <input type="checkbox" id="high-contrast">
                                            <span class="toggle-slider"></span>
                                            <span class="toggle-text">High Contrast Mode</span>
                                        </label>
                                        <small>Increase contrast for better visibility</small>
                                    </div>

                                    <div class="setting-item">
                                        <label class="toggle-label">
                                            <input type="checkbox" id="large-cursor">
                                            <span class="toggle-slider"></span>
                                            <span class="toggle-text">Large Cursor</span>
                                        </label>
                                        <small>Use a larger, more visible cursor</small>
                                    </div>

                                    <div class="setting-item">
                                        <label>UI Scale</label>
                                        <div class="slider-container">
                                            <input type="range" id="ui-scale" min="80" max="150" value="100" class="slider">
                                            <span class="slider-value" id="ui-scale-value">100%</span>
                                        </div>
                                        <small>Scale the entire interface for better readability</small>
                                    </div>
                                </div>

                                <div class="setting-group">
                                    <h4>⌨️ Keyboard & Motor</h4>
                                    
                                    <div class="setting-item">
                                        <label class="toggle-label">
                                            <input type="checkbox" id="sticky-keys">
                                            <span class="toggle-slider"></span>
                                            <span class="toggle-text">Sticky Keys</span>
                                        </label>
                                        <small>Allow modifier keys to be pressed one at a time</small>
                                    </div>

                                    <div class="setting-item">
                                        <label class="toggle-label">
                                            <input type="checkbox" id="focus-indicators" checked>
                                            <span class="toggle-slider"></span>
                                            <span class="toggle-text">Enhanced Focus Indicators</span>
                                        </label>
                                        <small>Show clear outlines around focused elements</small>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- System Section -->
                        <div class="settings-section" id="system-section">
                            <div class="section-header">
                                <h3>🔧 System Settings</h3>
                                <p>Core system configuration and maintenance</p>
                            </div>

                            <div class="settings-grid">
                                <div class="setting-group">
                                    <h4>💾 Data & Storage</h4>
                                    
                                    <div class="setting-item">
                                        <label class="toggle-label">
                                            <input type="checkbox" id="auto-save" checked>
                                            <span class="toggle-slider"></span>
                                            <span class="toggle-text">Auto-save Preferences</span>
                                        </label>
                                        <small>Automatically save settings as you change them</small>
                                    </div>

                                    <div class="setting-item">
                                        <label class="toggle-label">
                                            <input type="checkbox" id="restore-windows" checked>
                                            <span class="toggle-slider"></span>
                                            <span class="toggle-text">Restore Windows on Login</span>
                                        </label>
                                        <small>Reopen windows from your last session</small>
                                    </div>
                                </div>

                                <div class="setting-group">
                                    <h4>🛠️ Maintenance</h4>
                                    
                                    <div class="maintenance-buttons">
                                        <button class="btn btn-primary" onclick="Settings.exportSettings()">
                                            <i class="fas fa-download"></i> Export Settings
                                        </button>
                                        <button class="btn btn-secondary" onclick="Settings.importSettings()">
                                            <i class="fas fa-upload"></i> Import Settings
                                        </button>
                                        <button class="btn btn-warning" onclick="Settings.clearCache()">
                                            <i class="fas fa-broom"></i> Clear Cache
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Bottom Action Bar -->
                    <div class="settings-actions">
                        <div class="action-left">
                            <span class="save-status" id="save-status">✅ All changes saved</span>
                        </div>
                        <div class="action-right">
                            <button class="btn btn-primary" onclick="Settings.saveSettings()">
                                <i class="fas fa-save"></i> Save All Changes
                            </button>
                            <button class="btn btn-secondary" onclick="Settings.closeSettings()">
                                <i class="fas fa-times"></i> Close
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- Hidden file input for importing settings -->
                <input type="file" id="settings-import-input" accept=".json" style="display: none;">
                
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
                    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                    font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
                    color: #2c3e50;
                    overflow: hidden;
                }

                .settings-sidebar {
                    width: 280px;
                    background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    display: flex;
                    flex-direction: column;
                    box-shadow: 2px 0 20px rgba(0,0,0,0.1);
                }

                .sidebar-header {
                    padding: 30px 25px;
                    text-align: center;
                    border-bottom: 1px solid rgba(255,255,255,0.2);
                }

                .sidebar-header h2 {
                    margin: 0 0 8px 0;
                    font-size: 24px;
                    font-weight: 700;
                    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
                }

                .sidebar-header p {
                    margin: 0;
                    opacity: 0.9;
                    font-size: 14px;
                }

                .settings-nav {
                    flex: 1;
                    padding: 15px 0;
                    overflow-y: auto;
                }

                .nav-item {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 15px 25px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border-left: 3px solid transparent;
                    font-weight: 500;
                }

                .nav-item:hover {
                    background: rgba(255,255,255,0.1);
                    border-left-color: rgba(255,255,255,0.5);
                }

                .nav-item.active {
                    background: rgba(255,255,255,0.15);
                    border-left-color: #ffffff;
                    font-weight: 600;
                }

                .nav-item i {
                    width: 18px;
                    text-align: center;
                    font-size: 16px;
                }

                .settings-footer {
                    padding: 20px 25px;
                    border-top: 1px solid rgba(255,255,255,0.2);
                }

                .settings-content {
                    flex: 1;
                    overflow-y: auto;
                    background: #f8fafc;
                }

                .settings-section {
                    display: none;
                    padding: 30px;
                    max-width: 800px;
                }

                .settings-section.active {
                    display: block;
                }

                .section-header {
                    margin-bottom: 30px;
                    padding-bottom: 20px;
                    border-bottom: 2px solid #e2e8f0;
                }

                .section-header h3 {
                    margin: 0 0 8px 0;
                    color: #1a202c;
                    font-size: 28px;
                    font-weight: 700;
                }

                .section-header p {
                    margin: 0;
                    color: #718096;
                    font-size: 16px;
                }

                .settings-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
                    gap: 25px;
                }

                .setting-group {
                    background: white;
                    border-radius: 16px;
                    padding: 25px;
                    box-shadow: 0 4px 16px rgba(0,0,0,0.08);
                    border: 1px solid #e2e8f0;
                    transition: all 0.3s ease;
                }

                .setting-group:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(0,0,0,0.12);
                }

                .setting-group h4 {
                    margin: 0 0 20px 0;
                    color: #2d3748;
                    font-size: 18px;
                    font-weight: 600;
                    border-bottom: 2px solid #edf2f7;
                    padding-bottom: 12px;
                }

                .setting-item {
                    margin-bottom: 20px;
                }

                .setting-item:last-child {
                    margin-bottom: 0;
                }

                .setting-item label {
                    display: block;
                    margin-bottom: 8px;
                    font-weight: 600;
                    color: #4a5568;
                    font-size: 14px;
                }

                .setting-item small {
                    display: block;
                    margin-top: 6px;
                    color: #a0aec0;
                    font-size: 12px;
                    line-height: 1.4;
                }

                /* Toggle Switches */
                .toggle-label {
                    display: flex !important;
                    align-items: center;
                    gap: 12px;
                    cursor: pointer;
                    margin-bottom: 0 !important;
                }

                .toggle-label input[type="checkbox"] {
                    display: none;
                }

                .toggle-slider {
                    width: 44px;
                    height: 22px;
                    background: #cbd5e0;
                    border-radius: 22px;
                    position: relative;
                    transition: all 0.3s ease;
                    flex-shrink: 0;
                }

                .toggle-slider::before {
                    content: '';
                    position: absolute;
                    width: 18px;
                    height: 18px;
                    background: white;
                    border-radius: 50%;
                    top: 2px;
                    left: 2px;
                    transition: all 0.3s ease;
                    box-shadow: 0 2px 6px rgba(0,0,0,0.2);
                }

                .toggle-label input:checked + .toggle-slider {
                    background: linear-gradient(135deg, #667eea, #764ba2);
                }

                .toggle-label input:checked + .toggle-slider::before {
                    transform: translateX(22px);
                }

                .toggle-text {
                    font-weight: 500;
                    color: #4a5568;
                }

                /* Sliders */
                .slider-container {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    margin: 8px 0;
                }

                .slider {
                    flex: 1;
                    height: 6px;
                    border-radius: 3px;
                    background: #e2e8f0;
                    outline: none;
                    -webkit-appearance: none;
                    appearance: none;
                    cursor: pointer;
                }

                .slider::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    cursor: pointer;
                    box-shadow: 0 2px 6px rgba(0,0,0,0.2);
                    transition: all 0.2s ease;
                }

                .slider::-webkit-slider-thumb:hover {
                    transform: scale(1.1);
                    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
                }

                .slider::-moz-range-thumb {
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    cursor: pointer;
                    border: none;
                    box-shadow: 0 2px 6px rgba(0,0,0,0.2);
                }

                .slider-value {
                    min-width: 50px;
                    text-align: center;
                    font-weight: 600;
                    color: #667eea;
                    background: #edf2f7;
                    padding: 4px 8px;
                    border-radius: 6px;
                    font-size: 12px;
                }

                /* Select Dropdowns */
                .setting-select {
                    width: 100%;
                    padding: 10px 12px;
                    border: 2px solid #e2e8f0;
                    border-radius: 8px;
                    background: white;
                    font-size: 14px;
                    color: #4a5568;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .setting-select:focus {
                    outline: none;
                    border-color: #667eea;
                    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
                }

                /* Theme Grid */
                .themes-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 20px;
                    margin-bottom: 30px;
                }

                .theme-card {
                    background: white;
                    border-radius: 12px;
                    overflow: hidden;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border: 3px solid transparent;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                }

                .theme-card:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
                }

                .theme-card.active {
                    border-color: #667eea;
                    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.25);
                }

                .theme-preview {
                    height: 100px;
                    position: relative;
                    overflow: hidden;
                }

                .theme-info {
                    padding: 15px;
                    text-align: center;
                }

                .theme-name {
                    font-weight: 600;
                    color: #2d3748;
                    margin-bottom: 5px;
                }

                .theme-description {
                    font-size: 12px;
                    color: #718096;
                }

                /* Custom Theme Editor */
                .custom-theme-editor {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                    gap: 15px;
                    align-items: end;
                }

                .color-picker-group {
                    text-align: center;
                }

                .color-picker-group label {
                    display: block;
                    margin-bottom: 8px;
                    font-size: 12px;
                    font-weight: 500;
                    color: #4a5568;
                }

                .color-picker-group input[type="color"] {
                    width: 100%;
                    height: 40px;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    background: none;
                }

                /* Background Categories */
                .background-categories {
                    display: flex;
                    gap: 10px;
                    margin-bottom: 25px;
                    flex-wrap: wrap;
                }

                .bg-category {
                    padding: 8px 16px;
                    background: white;
                    border: 2px solid #e2e8f0;
                    border-radius: 20px;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: 500;
                    color: #4a5568;
                    transition: all 0.3s ease;
                }

                .bg-category:hover {
                    border-color: #667eea;
                    color: #667eea;
                }

                .bg-category.active {
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    color: white;
                    border-color: #667eea;
                }

                /* Background Grid */
                .backgrounds-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
                    gap: 15px;
                    margin-bottom: 30px;
                }

                .background-option {
                    aspect-ratio: 16/9;
                    border-radius: 8px;
                    cursor: pointer;
                    overflow: hidden;
                    border: 3px solid transparent;
                    transition: all 0.3s ease;
                    position: relative;
                }

                .background-option:hover {
                    transform: scale(1.05);
                    border-color: #667eea;
                }

                .background-option.active {
                    border-color: #667eea;
                    box-shadow: 0 0 20px rgba(102, 126, 234, 0.4);
                }

                .background-option::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 30px;
                    background: linear-gradient(transparent, rgba(0,0,0,0.7));
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                .background-option:hover::after {
                    opacity: 1;
                }

                /* Notification Position Selector */
                .position-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 15px;
                    margin-top: 15px;
                }

                .position-option {
                    text-align: center;
                    cursor: pointer;
                    padding: 15px;
                    border: 2px solid #e2e8f0;
                    border-radius: 8px;
                    transition: all 0.3s ease;
                }

                .position-option:hover {
                    border-color: #667eea;
                }

                .position-option.active {
                    border-color: #667eea;
                    background: rgba(102, 126, 234, 0.1);
                }

                .position-demo {
                    width: 80px;
                    height: 60px;
                    background: #f7fafc;
                    border: 1px solid #e2e8f0;
                    border-radius: 4px;
                    margin: 0 auto 10px;
                    position: relative;
                }

                .demo-notification {
                    width: 20px;
                    height: 8px;
                    background: #667eea;
                    border-radius: 2px;
                    position: absolute;
                }

                .demo-notification.top-left { top: 5px; left: 5px; }
                .demo-notification.top-right { top: 5px; right: 5px; }
                .demo-notification.bottom-left { bottom: 5px; left: 5px; }
                .demo-notification.bottom-right { bottom: 5px; right: 5px; }

                /* Animation Quality Options */
                .animation-quality-options {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
                    gap: 15px;
                    margin-top: 15px;
                }

                .quality-option {
                    text-align: center;
                    padding: 20px 15px;
                    border: 2px solid #e2e8f0;
                    border-radius: 12px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    background: white;
                }

                .quality-option:hover {
                    border-color: #667eea;
                    transform: translateY(-2px);
                }

                .quality-option.active {
                    border-color: #667eea;
                    background: rgba(102, 126, 234, 0.1);
                }

                .quality-option i {
                    font-size: 24px;
                    color: #667eea;
                    margin-bottom: 8px;
                    display: block;
                }

                .quality-option span {
                    display: block;
                    font-weight: 600;
                    color: #2d3748;
                    margin-bottom: 4px;
                }

                .quality-option small {
                    color: #718096;
                    font-size: 11px;
                }

                /* Buttons */
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
                    text-decoration: none;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                }

                .btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 16px rgba(0,0,0,0.15);
                }

                .btn-primary {
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    color: white;
                }

                .btn-secondary {
                    background: #718096;
                    color: white;
                }

                .btn-warning {
                    background: #ed8936;
                    color: white;
                }

                /* Maintenance Buttons */
                .maintenance-buttons {
                    display: flex;
                    gap: 10px;
                    flex-wrap: wrap;
                }

                .maintenance-buttons .btn {
                    flex: 1;
                    min-width: 150px;
                    justify-content: center;
                }

                /* Settings Actions */
                .settings-actions {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 20px 30px;
                    background: white;
                    border-top: 1px solid #e2e8f0;
                    box-shadow: 0 -2px 10px rgba(0,0,0,0.05);
                }

                .action-left,
                .action-right {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                }

                .save-status {
                    font-size: 14px;
                    color: #38a169;
                    font-weight: 500;
                }

                /* Responsive Design */
                @media (max-width: 768px) {
                    .settings-app {
                        flex-direction: column;
                    }

                    .settings-sidebar {
                        width: 100%;
                        height: auto;
                        order: 2;
                    }

                    .settings-nav {
                        display: flex;
                        overflow-x: auto;
                        padding: 10px;
                    }

                    .nav-item {
                        white-space: nowrap;
                        min-width: auto;
                        padding: 10px 15px;
                        border-left: none;
                        border-bottom: 3px solid transparent;
                    }

                    .nav-item.active {
                        border-left: none;
                        border-bottom-color: #ffffff;
                    }

                    .settings-content {
                        order: 1;
                    }

                    .settings-grid {
                        grid-template-columns: 1fr;
                    }

                    .themes-grid {
                        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                    }

                    .custom-theme-editor {
                        grid-template-columns: 1fr;
                    }

                    .position-grid {
                        grid-template-columns: 1fr;
                    }

                    .animation-quality-options {
                        grid-template-columns: 1fr 1fr;
                    }

                    .maintenance-buttons {
                        flex-direction: column;
                    }

                    .settings-actions {
                        flex-direction: column;
                        gap: 15px;
                    }

                    .action-left,
                    .action-right {
                        width: 100%;
                        justify-content: center;
                    }
                }

                /* Animation classes that will be applied */
                .fade-in {
                    animation: fadeIn 0.5s ease-out;
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .slide-in {
                    animation: slideIn 0.3s ease-out;
                }

                @keyframes slideIn {
                    from { transform: translateX(-20px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            </style>
        `;
    }

    static init(windowElement) {
        this.currentWindow = windowElement;
        this.currentPreferences = {};
        this.themes = this.getThemeCollection();
        this.backgrounds = this.getBackgroundCollection();
        this.currentBgCategory = 'dynamic';
        this.autoSave = true;

        this.setupEventListeners();
        this.loadCurrentSettings();
        this.renderThemes();
        this.renderBackgrounds();
        this.updateAllValues();
    }

    static setupEventListeners() {
        // Navigation
        this.currentWindow.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                const section = item.dataset.section;
                this.switchSection(section);
            });
        });

        // Sliders
        this.setupSlider('transparency-slider', 'transparency-value', (value) => {
            const opacity = (100 - value) / 100;
            this.updateSetting('transparency', value);
            document.documentElement.style.setProperty('--window-opacity', opacity);
            return `${100 - value}%`;
        });

        this.setupSlider('icon-size-slider', 'icon-size-value', (value) => {
            this.updateSetting('iconSize', value);
            document.documentElement.style.setProperty('--icon-size', value + 'px');
            return value + 'px';
        });

        this.setupSlider('font-size-slider', 'font-size-value', (value) => {
            this.updateSetting('fontSize', value);
            document.documentElement.style.setProperty('--base-font-size', value + 'px');
            document.body.style.fontSize = value + 'px';
            return value + 'px';
        });

        this.setupSlider('notification-duration', 'notification-duration-value', (value) => {
            this.updateSetting('notificationDuration', value);
            return value + 's';
        });

        this.setupSlider('bg-speed-slider', 'bg-speed-value', (value) => {
            this.updateSetting('bgAnimationSpeed', value);
            const speeds = ['Very Slow', 'Slow', 'Slow', 'Normal', 'Normal', 'Normal', 'Fast', 'Fast', 'Very Fast', 'Ultra Fast'];
            return speeds[value - 1] || 'Normal';
        });

        this.setupSlider('ui-scale', 'ui-scale-value', (value) => {
            this.updateSetting('uiScale', value);
            document.documentElement.style.zoom = value + '%';
            return value + '%';
        });

        // Toggle switches
        this.setupToggle('blur-effects', (checked) => {
            this.updateSetting('blurEffects', checked);
            document.body.classList.toggle('no-blur', !checked);
        });

        this.setupToggle('icon-shadows', (checked) => {
            this.updateSetting('iconShadows', checked);
            document.body.classList.toggle('no-icon-shadows', !checked);
        });

        this.setupToggle('animations-enabled', (checked) => {
            this.updateSetting('animationsEnabled', checked);
            document.body.classList.toggle('no-animations', !checked);
        });

        this.setupToggle('auto-hide-taskbar', (checked) => {
            this.updateSetting('autoHideTaskbar', checked);
            const taskbar = document.querySelector('.taskbar');
            if (taskbar) {
                taskbar.classList.toggle('auto-hide', checked);
            }
        });

        this.setupToggle('show-clock', (checked) => {
            this.updateSetting('showClock', checked);
            const clock = document.querySelector('.time-display');
            if (clock) {
                clock.style.display = checked ? 'block' : 'none';
            }
        });

        this.setupToggle('show-icon-labels', (checked) => {
            this.updateSetting('showIconLabels', checked);
            const labels = document.querySelectorAll('.icon-label');
            labels.forEach(label => {
                label.style.display = checked ? 'block' : 'none';
            });
        });

        this.setupToggle('bg-particles', (checked) => {
            this.updateSetting('bgParticles', checked);
            this.updateParticleBackground();
        });

        this.setupToggle('hardware-acceleration', (checked) => {
            this.updateSetting('hardwareAcceleration', checked);
            if (checked) {
                document.body.style.transform = 'translateZ(0)';
            } else {
                document.body.style.transform = '';
            }
        });

        this.setupToggle('high-contrast', (checked) => {
            this.updateSetting('highContrast', checked);
            document.body.classList.toggle('high-contrast', checked);
        });

        this.setupToggle('reduce-motion', (checked) => {
            this.updateSetting('reduceMotion', checked);
            document.body.classList.toggle('reduce-motion', checked);
        });

        // Select dropdowns
        this.setupSelect('font-family-select', (value) => {
            this.updateSetting('fontFamily', value);
            document.documentElement.style.setProperty('--system-font', value);
            document.body.style.fontFamily = value;
        });

        // Background categories
        this.currentWindow.querySelectorAll('.bg-category').forEach(cat => {
            cat.addEventListener('click', () => {
                this.switchBackgroundCategory(cat.dataset.category);
            });
        });

        // Notification position
        this.currentWindow.querySelectorAll('.position-option').forEach(option => {
            option.addEventListener('click', () => {
                this.selectNotificationPosition(option.dataset.position);
            });
        });

        // Animation quality
        this.currentWindow.querySelectorAll('.quality-option').forEach(option => {
            option.addEventListener('click', () => {
                this.selectAnimationQuality(option.dataset.quality);
            });
        });
    }

    static setupSlider(sliderId, valueId, callback) {
        const slider = this.currentWindow.querySelector(`#${sliderId}`);
        const valueDisplay = this.currentWindow.querySelector(`#${valueId}`);

        if (slider && valueDisplay) {
            slider.addEventListener('input', (e) => {
                const value = parseInt(e.target.value);
                const displayValue = callback(value);
                valueDisplay.textContent = displayValue;
            });
        }
    }

    static setupToggle(toggleId, callback) {
        const toggle = this.currentWindow.querySelector(`#${toggleId}`);
        if (toggle) {
            toggle.addEventListener('change', (e) => {
                callback(e.target.checked);
            });
        }
    }

    static setupSelect(selectId, callback) {
        const select = this.currentWindow.querySelector(`#${selectId}`);
        if (select) {
            select.addEventListener('change', (e) => {
                callback(e.target.value);
            });
        }
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
    }

    static renderThemes() {
        const grid = this.currentWindow.querySelector('#themes-grid');
        grid.innerHTML = this.themes.map(theme => `
            <div class="theme-card ${theme.id === (this.currentPreferences.theme || 'cyber-blue') ? 'active' : ''}" 
                 data-theme="${theme.id}" onclick="Settings.selectTheme('${theme.id}')">
                <div class="theme-preview" style="background: ${theme.background}; ${theme.pattern || ''}">
                    <div style="position: absolute; top: 10px; left: 10px; width: 20px; height: 3px; background: ${theme.primary}; border-radius: 2px;"></div>
                    <div style="position: absolute; top: 20px; left: 10px; width: 30px; height: 3px; background: ${theme.secondary}; border-radius: 2px;"></div>
                    <div style="position: absolute; bottom: 10px; right: 10px; width: 15px; height: 15px; background: ${theme.accent}; border-radius: 50%;"></div>
                </div>
                <div class="theme-info">
                    <div class="theme-name">${theme.name}</div>
                    <div class="theme-description">${theme.description}</div>
                </div>
            </div>
        `).join('');
    }

    static renderBackgrounds() {
        const grid = this.currentWindow.querySelector('#backgrounds-grid');
        const backgrounds = this.backgrounds[this.currentBgCategory] || [];

        grid.innerHTML = backgrounds.map(bg => `
            <div class="background-option ${bg.id === (this.currentPreferences.backgroundId || 'cyber-grid') ? 'active' : ''}" 
                 data-bg="${bg.id}" onclick="Settings.selectBackground('${bg.id}')"
                 style="background: ${bg.preview}; ${bg.animation || ''}">
            </div>
        `).join('');
    }

    static switchBackgroundCategory(category) {
        this.currentBgCategory = category;

        // Update category buttons
        this.currentWindow.querySelectorAll('.bg-category').forEach(cat => {
            cat.classList.remove('active');
        });
        this.currentWindow.querySelector(`[data-category="${category}"]`).classList.add('active');

        // Re-render backgrounds
        this.renderBackgrounds();
    }

    static selectTheme(themeId) {
        const theme = this.themes.find(t => t.id === themeId);
        if (!theme) return;

        // Update UI
        this.currentWindow.querySelectorAll('.theme-card').forEach(card => {
            card.classList.remove('active');
        });
        this.currentWindow.querySelector(`[data-theme="${themeId}"]`).classList.add('active');

        // Apply theme
        this.applyTheme(theme);
        this.updateSetting('theme', themeId);
        this.showNotification(`${theme.name} theme applied!`, 'success');
    }

    static selectBackground(bgId) {
        const allBackgrounds = Object.values(this.backgrounds).flat();
        const background = allBackgrounds.find(bg => bg.id === bgId);
        if (!background) return;

        // Update UI
        this.currentWindow.querySelectorAll('.background-option').forEach(option => {
            option.classList.remove('active');
        });
        this.currentWindow.querySelector(`[data-bg="${bgId}"]`).classList.add('active');

        // Apply background
        this.applyBackground(background);
        this.updateSetting('backgroundId', bgId);
        this.showNotification(`${background.name || 'Background'} applied!`, 'success');
    }

    static selectNotificationPosition(position) {
        // Update UI
        this.currentWindow.querySelectorAll('.position-option').forEach(option => {
            option.classList.remove('active');
        });
        this.currentWindow.querySelector(`[data-position="${position}"]`).classList.add('active');

        // Apply position
        this.updateSetting('notificationPosition', position);
        const container = document.querySelector('#notification-container');
        if (container) {
            container.className = container.className.replace(/top-\w+|bottom-\w+/g, '');
            container.classList.add(position);
        }
    }

    static selectAnimationQuality(quality) {
        // Update UI
        this.currentWindow.querySelectorAll('.quality-option').forEach(option => {
            option.classList.remove('active');
        });
        this.currentWindow.querySelector(`[data-quality="${quality}"]`).classList.add('active');

        // Apply quality
        this.updateSetting('animationQuality', quality);
        document.body.className = document.body.className.replace(/animation-quality-\w+/g, '');
        if (quality !== 'high') {
            document.body.classList.add(`animation-quality-${quality}`);
        }
    }

    static applyTheme(theme) {
        document.documentElement.style.setProperty('--primary-blue', theme.primary);
        document.documentElement.style.setProperty('--secondary-blue', theme.secondary);
        document.documentElement.style.setProperty('--neon-cyan', theme.accent);

        if (theme.textColor) {
            document.documentElement.style.setProperty('--bright-white', theme.textColor);
        }

        if (theme.background && !this.currentPreferences.backgroundId) {
            document.body.style.background = theme.background;
        }
    }

    static applyBackground(background) {
        document.body.style.background = background.style;

        if (background.animation) {
            document.body.style.animation = background.animation;
        }

        // Update particles if needed
        this.updateParticleBackground();
    }

    static applyCustomTheme() {
        const primary = this.currentWindow.querySelector('#primary-color').value;
        const secondary = this.currentWindow.querySelector('#secondary-color').value;
        const accent = this.currentWindow.querySelector('#accent-color').value;

        const customTheme = {
            id: 'custom',
            name: 'Custom Theme',
            primary: primary,
            secondary: secondary,
            accent: accent
        };

        this.applyTheme(customTheme);
        this.updateSetting('customTheme', customTheme);
        this.showNotification('Custom theme applied!', 'success');
    }

    static updateParticleBackground() {
        const shouldShow = this.currentPreferences.bgParticles !== false;
        let particleContainer = document.querySelector('.floating-particles');

        if (shouldShow && !particleContainer) {
            // Create particle container
            particleContainer = document.createElement('div');
            particleContainer.className = 'floating-particles';
            particleContainer.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: -1;
                pointer-events: none;
            `;

            // Add particles
            for (let i = 0; i < 8; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.cssText = `
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: var(--primary-blue);
                    border-radius: 50%;
                    animation: float-particle ${8 + Math.random() * 4}s infinite ease-in-out;
                    animation-delay: -${Math.random() * 8}s;
                    top: ${Math.random() * 100}%;
                    left: ${Math.random() * 100}%;
                `;
                particleContainer.appendChild(particle);
            }

            document.body.appendChild(particleContainer);
        } else if (!shouldShow && particleContainer) {
            particleContainer.remove();
        }
    }

    static loadCurrentSettings() {
        try {
            const stored = localStorage.getItem('emberframe-preferences');
            this.currentPreferences = stored ? JSON.parse(stored) : {};
        } catch {
            this.currentPreferences = {};
        }
    }

    static updateAllValues() {
        // Update sliders
        const updates = [
            ['transparency-slider', 'transparency-value', this.currentPreferences.transparency || 5],
            ['icon-size-slider', 'icon-size-value', this.currentPreferences.iconSize || 48],
            ['font-size-slider', 'font-size-value', this.currentPreferences.fontSize || 14],
            ['notification-duration', 'notification-duration-value', this.currentPreferences.notificationDuration || 4],
            ['bg-speed-slider', 'bg-speed-value', this.currentPreferences.bgAnimationSpeed || 5],
            ['ui-scale', 'ui-scale-value', this.currentPreferences.uiScale || 100]
        ];

        updates.forEach(([sliderId, valueId, defaultValue]) => {
            const slider = this.currentWindow.querySelector(`#${sliderId}`);
            const valueDisplay = this.currentWindow.querySelector(`#${valueId}`);
            if (slider && valueDisplay) {
                slider.value = defaultValue;
                slider.dispatchEvent(new Event('input'));
            }
        });

        // Update toggles
        const toggles = [
            ['blur-effects', this.currentPreferences.blurEffects !== false],
            ['icon-shadows', this.currentPreferences.iconShadows !== false],
            ['animations-enabled', this.currentPreferences.animationsEnabled !== false],
            ['auto-hide-taskbar', this.currentPreferences.autoHideTaskbar || false],
            ['show-clock', this.currentPreferences.showClock !== false],
            ['show-icon-labels', this.currentPreferences.showIconLabels !== false],
            ['bg-particles', this.currentPreferences.bgParticles !== false],
            ['hardware-acceleration', this.currentPreferences.hardwareAcceleration !== false],
            ['high-contrast', this.currentPreferences.highContrast || false],
            ['reduce-motion', this.currentPreferences.reduceMotion || false]
        ];

        toggles.forEach(([toggleId, value]) => {
            const toggle = this.currentWindow.querySelector(`#${toggleId}`);
            if (toggle) {
                toggle.checked = value;
                toggle.dispatchEvent(new Event('change'));
            }
        });

        // Update selects
        const fontSelect = this.currentWindow.querySelector('#font-family-select');
        if (fontSelect) {
            fontSelect.value = this.currentPreferences.fontFamily || "'Rajdhani', sans-serif";
        }

        // Update notification position
        const notifPos = this.currentPreferences.notificationPosition || 'top-right';
        this.selectNotificationPosition(notifPos);

        // Update animation quality
        const animQuality = this.currentPreferences.animationQuality || 'high';
        this.selectAnimationQuality(animQuality);
    }

    static updateSetting(key, value) {
        this.currentPreferences[key] = value;

        if (this.autoSave) {
            this.saveSettings();
        }
    }

    static async saveSettings() {
        try {
            // Save to localStorage
            localStorage.setItem('emberframe-preferences', JSON.stringify(this.currentPreferences));

            // Save to server
            const response = await fetch('/api/user/preferences', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ preferences: this.currentPreferences })
            });

            if (response.ok) {
                this.updateSaveStatus('✅ All changes saved');
            }
        } catch (error) {
            console.error('Failed to save settings:', error);
            this.updateSaveStatus('⚠️ Save failed');
        }
    }

    static updateSaveStatus(message) {
        const status = this.currentWindow.querySelector('#save-status');
        if (status) {
            status.textContent = message;
        }
    }

    static resetToDefaults() {
        if (!confirm('Reset all settings to defaults?\n\nThis will restore all original settings and cannot be undone.')) {
            return;
        }

        this.currentPreferences = {};
        this.updateAllValues();
        this.saveSettings();
        this.showNotification('Settings reset to defaults', 'success');
    }

    static exportSettings() {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.currentPreferences, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `emberframe-settings-${new Date().toISOString().split('T')[0]}.json`);
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
        this.showNotification('Settings exported successfully', 'success');
    }

    static importSettings() {
        const input = this.currentWindow.querySelector('#settings-import-input');
        input.click();

        input.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const imported = JSON.parse(event.target.result);
                    this.currentPreferences = { ...this.currentPreferences, ...imported };
                    this.updateAllValues();
                    this.saveSettings();
                    this.showNotification('Settings imported successfully', 'success');
                } catch (error) {
                    this.showNotification('Invalid settings file', 'error');
                }
            };
            reader.readAsText(file);
        };
    }

    static clearCache() {
        if (!confirm('Clear application cache?\n\nThis will remove temporary files and may improve performance.')) {
            return;
        }

        try {
            // Clear various caches
            if ('caches' in window) {
                caches.keys().then(names => {
                    names.forEach(name => caches.delete(name));
                });
            }

            // Clear some localStorage items
            const keysToKeep = ['emberframe-preferences'];
            Object.keys(localStorage).forEach(key => {
                if (!keysToKeep.includes(key)) {
                    localStorage.removeItem(key);
                }
            });

            this.showNotification('Cache cleared successfully', 'success');
        } catch (error) {
            this.showNotification('Failed to clear cache', 'error');
        }
    }

    static closeSettings() {
        if (window.WindowManager) {
            const windowElement = this.currentWindow.closest('.window');
            if (windowElement) {
                window.WindowManager.closeWindow(windowElement.dataset.app);
            }
        }
    }

    static showNotification(message, type = 'info') {
        if (window.Notification) {
            window.Notification[type](message);
        }
    }

    static getThemeCollection() {
        return [
            {
                id: 'cyber-blue',
                name: 'Cyber Blue',
                description: 'Classic cyberpunk with electric blues',
                primary: '#00d4ff',
                secondary: '#0099cc',
                accent: '#00ffff',
                background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%)'
            },
            {
                id: 'ember-red',
                name: 'Ember Red',
                description: 'Fiery reds and warm oranges',
                primary: '#ff4500',
                secondary: '#dc143c',
                accent: '#ff6b47',
                background: 'linear-gradient(135deg, #1a0a00 0%, #2d1a0a 100%)'
            },
            {
                id: 'matrix-green',
                name: 'Matrix Green',
                description: 'Digital rain inspired theme',
                primary: '#00ff00',
                secondary: '#008800',
                accent: '#39ff14',
                background: 'linear-gradient(135deg, #000000 0%, #001100 100%)'
            },
            {
                id: 'neon-purple',
                name: 'Neon Purple',
                description: 'Vibrant purples and magentas',
                primary: '#8000ff',
                secondary: '#4000cc',
                accent: '#ff00ff',
                background: 'linear-gradient(135deg, #0a0010 0%, #1a1030 100%)'
            },
            {
                id: 'tokyo-night',
                name: 'Tokyo Night',
                description: 'Dark theme inspired by Tokyo nightlife',
                primary: '#7aa2f7',
                secondary: '#bb9af7',
                accent: '#73daca',
                background: 'linear-gradient(135deg, #1a1b26 0%, #24283b 100%)'
            },
            {
                id: 'sunset-orange',
                name: 'Sunset Orange',
                description: 'Warm sunset colors',
                primary: '#ff8c00',
                secondary: '#ff4500',
                accent: '#ffd700',
                background: 'linear-gradient(135deg, #1a1000 0%, #2d1a00 100%)'
            },
            {
                id: 'arctic-blue',
                name: 'Arctic Blue',
                description: 'Cool ice blue theme',
                primary: '#87ceeb',
                secondary: '#4682b4',
                accent: '#b0e0e6',
                background: 'linear-gradient(135deg, #0f1419 0%, #1a2332 100%)'
            },
            {
                id: 'forest-green',
                name: 'Forest Green',
                description: 'Natural green theme',
                primary: '#32cd32',
                secondary: '#228b22',
                accent: '#90ee90',
                background: 'linear-gradient(135deg, #0a1a0a 0%, #1a2e1a 100%)'
            },
            {
                id: 'royal-purple',
                name: 'Royal Purple',
                description: 'Elegant purple theme',
                primary: '#9370db',
                secondary: '#663399',
                accent: '#dda0dd',
                background: 'linear-gradient(135deg, #1a0a1a 0%, #2e1a2e 100%)'
            },
            {
                id: 'golden-hour',
                name: 'Golden Hour',
                description: 'Warm golden theme',
                primary: '#ffd700',
                secondary: '#ffb347',
                accent: '#ffe135',
                background: 'linear-gradient(135deg, #1a1a0a 0%, #2e2e1a 100%)'
            }
        ];
    }

    static getBackgroundCollection() {
        return {
            dynamic: [
                {
                    id: 'cyber-grid',
                    name: 'Cyber Grid',
                    style: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%)',
                    preview: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%)',
                    animation: 'background-size: 400% 400%; animation: gradientShift 15s ease infinite;'
                },
                {
                    id: 'digital-waves',
                    name: 'Digital Waves',
                    style: 'linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #f5576c)',
                    preview: 'linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #f5576c)',
                    animation: 'background-size: 400% 400%; animation: gradientShift 15s ease infinite;'
                },
                {
                    id: 'neon-pulse',
                    name: 'Neon Pulse',
                    style: 'radial-gradient(circle at 50% 50%, #ff006e, #8338ec, #3a86ff)',
                    preview: 'radial-gradient(circle at 50% 50%, #ff006e, #8338ec, #3a86ff)',
                    animation: 'background-size: 200% 200%; animation: pulse 8s ease infinite;'
                }
            ],
            gradients: [
                {
                    id: 'aurora',
                    name: 'Aurora',
                    style: 'linear-gradient(135deg, #00c9ff 0%, #92fe9d 100%)',
                    preview: 'linear-gradient(135deg, #00c9ff 0%, #92fe9d 100%)'
                },
                {
                    id: 'sunset',
                    name: 'Sunset',
                    style: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                    preview: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
                },
                {
                    id: 'ocean',
                    name: 'Ocean',
                    style: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    preview: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                }
            ],
            patterns: [
                {
                    id: 'circuit',
                    name: 'Circuit',
                    style: '#0a0a0f',
                    preview: '#0a0a0f',
                    pattern: 'background-image: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,212,255,0.1) 10px, rgba(0,212,255,0.1) 20px);'
                },
                {
                    id: 'hexagon',
                    name: 'Hexagon',
                    style: '#1a1a2e',
                    preview: '#1a1a2e',
                    pattern: 'background-image: repeating-conic-gradient(from 30deg, #667eea 0deg 60deg, transparent 60deg 120deg);'
                }
            ],
            space: [
                {
                    id: 'nebula',
                    name: 'Nebula',
                    style: 'radial-gradient(ellipse at center, #ff006e 0%, #8338ec 35%, #3a86ff 100%)',
                    preview: 'radial-gradient(ellipse at center, #ff006e 0%, #8338ec 35%, #3a86ff 100%)'
                },
                {
                    id: 'galaxy',
                    name: 'Galaxy',
                    style: 'linear-gradient(180deg, #000000 0%, #1a1a2e 50%, #667eea 100%)',
                    preview: 'linear-gradient(180deg, #000000 0%, #1a1a2e 50%, #667eea 100%)'
                }
            ],
            nature: [
                {
                    id: 'forest',
                    name: 'Forest',
                    style: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)',
                    preview: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)'
                },
                {
                    id: 'mountain',
                    name: 'Mountain',
                    style: 'linear-gradient(135deg, #2c3e50 0%, #4ca1af 100%)',
                    preview: 'linear-gradient(135deg, #2c3e50 0%, #4ca1af 100%)'
                }
            ],
            abstract: [
                {
                    id: 'geometric',
                    name: 'Geometric',
                    style: 'conic-gradient(from 180deg at 50% 50%, #667eea 0deg, #764ba2 180deg, #667eea 360deg)',
                    preview: 'conic-gradient(from 180deg at 50% 50%, #667eea 0deg, #764ba2 180deg, #667eea 360deg)'
                },
                {
                    id: 'flow',
                    name: 'Flow',
                    style: 'linear-gradient(45deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
                    preview: 'linear-gradient(45deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)'
                }
            ]
        };
    }

    static onClose(windowElement) {
        return true;
    }
}

// Add necessary CSS animations
const settingsAnimations = document.createElement('style');
settingsAnimations.textContent = `
    @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
    
    @keyframes pulse {
        0%, 100% { background-size: 100% 100%; }
        50% { background-size: 150% 150%; }
    }
    
    @keyframes float-particle {
        0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.8; }
        50% { transform: translateY(-50px) rotate(180deg); opacity: 0.3; }
    }
`;
document.head.appendChild(settingsAnimations);

window.Settings = Settings;