/**
 * APP_METADATA
 * @name Settings
 * @icon fas fa-cog
 * @description Comprehensive system settings and customization
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
                        <div class="settings-search">
                            <input type="text" id="settings-search" placeholder="Search settings..." />
                            <i class="fas fa-search"></i>
                        </div>
                        
                        <div class="settings-categories">
                            <div class="settings-category active" data-category="appearance">
                                <i class="fas fa-palette"></i>
                                <span>Appearance</span>
                            </div>
                            <div class="settings-category" data-category="behavior">
                                <i class="fas fa-mouse-pointer"></i>
                                <span>Behavior</span>
                            </div>
                            <div class="settings-category" data-category="performance">
                                <i class="fas fa-tachometer-alt"></i>
                                <span>Performance</span>
                            </div>
                            <div class="settings-category" data-category="accessibility">
                                <i class="fas fa-universal-access"></i>
                                <span>Accessibility</span>
                            </div>
                            <div class="settings-category" data-category="security">
                                <i class="fas fa-shield-alt"></i>
                                <span>Security</span>
                            </div>
                            <div class="settings-category" data-category="notifications">
                                <i class="fas fa-bell"></i>
                                <span>Notifications</span>
                            </div>
                            <div class="settings-category" data-category="advanced">
                                <i class="fas fa-cogs"></i>
                                <span>Advanced</span>
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

                        <div class="settings-panel active" id="appearance-panel">
                            <div class="settings-section">
                                <h3>Theme</h3>
                                <div class="settings-group">
                                    <div class="theme-selector">
                                        <div class="theme-option active" data-theme="cyber-blue">
                                            <div class="theme-preview cyber-blue"></div>
                                            <span>Cyber Blue</span>
                                        </div>
                                        <div class="theme-option" data-theme="ember-red">
                                            <div class="theme-preview ember-red"></div>
                                            <span>Ember Red</span>
                                        </div>
                                        <div class="theme-option" data-theme="matrix-green">
                                            <div class="theme-preview matrix-green"></div>
                                            <span>Matrix Green</span>
                                        </div>
                                        <div class="theme-option" data-theme="neon-purple">
                                            <div class="theme-preview neon-purple"></div>
                                            <span>Neon Purple</span>
                                        </div>
                                        <div class="theme-option" data-theme="ice-blue">
                                            <div class="theme-preview ice-blue"></div>
                                            <span>Ice Blue</span>
                                        </div>
                                        <div class="theme-option" data-theme="ember-orange">
                                            <div class="theme-preview ember-orange"></div>
                                            <span>Ember Orange</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="settings-section">
                                <h3>Wallpaper</h3>
                                <div class="settings-group">
                                    <label>Background Style:</label>
                                    <select id="wallpaper-style">
                                        <option value="gradient">Gradient Background</option>
                                        <option value="solid">Solid Color</option>
                                        <option value="pattern">Pattern</option>
                                        <option value="image">Custom Image</option>
                                    </select>
                                    <div class="wallpaper-options" id="wallpaper-options">
                                        <div class="gradient-selector">
                                            <div class="gradient-option active" data-gradient="cyber">
                                                <div class="gradient-preview" style="background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%)"></div>
                                                <span>Cyber</span>
                                            </div>
                                            <div class="gradient-option" data-gradient="ember">
                                                <div class="gradient-preview" style="background: linear-gradient(135deg, #1a0a00 0%, #2d1a0a 100%)"></div>
                                                <span>Ember</span>
                                            </div>
                                            <div class="gradient-option" data-gradient="matrix">
                                                <div class="gradient-preview" style="background: linear-gradient(135deg, #000000 0%, #001100 100%)"></div>
                                                <span>Matrix</span>
                                            </div>
                                            <div class="gradient-option" data-gradient="ocean">
                                                <div class="gradient-preview" style="background: linear-gradient(135deg, #001133 0%, #003366 100%)"></div>
                                                <span>Ocean</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="settings-section">
                                <h3>Typography</h3>
                                <div class="settings-group">
                                    <label>Font Family:</label>
                                    <select id="font-family">
                                        <option value="Rajdhani, sans-serif">Rajdhani (Default)</option>
                                        <option value="Orbitron, monospace">Orbitron</option>
                                        <option value="Share Tech Mono, monospace">Share Tech Mono</option>
                                        <option value="Arial, sans-serif">Arial</option>
                                        <option value="Helvetica, sans-serif">Helvetica</option>
                                        <option value="Georgia, serif">Georgia</option>
                                        <option value="Times New Roman, serif">Times New Roman</option>
                                    </select>

                                    <label>Font Size:</label>
                                    <div class="slider-control">
                                        <input type="range" id="font-size" min="10" max="20" value="14" />
                                        <span class="slider-value">14px</span>
                                    </div>
                                </div>
                            </div>

                            <div class="settings-section">
                                <h3>Desktop Icons</h3>
                                <div class="settings-group">
                                    <label>Icon Size:</label>
                                    <div class="slider-control">
                                        <input type="range" id="icon-size" min="32" max="80" value="48" />
                                        <span class="slider-value">48px</span>
                                    </div>

                                    <div class="checkbox-group">
                                        <input type="checkbox" id="show-icon-labels" checked />
                                        <label for="show-icon-labels">Show icon labels</label>
                                    </div>

                                    <div class="checkbox-group">
                                        <input type="checkbox" id="icon-shadows" checked />
                                        <label for="icon-shadows">Enable icon shadows</label>
                                    </div>
                                </div>
                            </div>

                            <div class="settings-section">
                                <h3>Transparency</h3>
                                <div class="settings-group">
                                    <label>Window Transparency:</label>
                                    <div class="slider-control">
                                        <input type="range" id="transparency" min="0" max="50" value="0" />
                                        <span class="slider-value">0%</span>
                                    </div>

                                    <div class="checkbox-group">
                                        <input type="checkbox" id="blur-effects" checked />
                                        <label for="blur-effects">Enable blur effects</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="settings-panel" id="behavior-panel">
                            <div class="settings-section">
                                <h3>Window Behavior</h3>
                                <div class="settings-group">
                                    <div class="checkbox-group">
                                        <input type="checkbox" id="restore-windows" />
                                        <label for="restore-windows">Restore windows on startup</label>
                                    </div>

                                    <div class="checkbox-group">
                                        <input type="checkbox" id="focus-follows-mouse" />
                                        <label for="focus-follows-mouse">Focus follows mouse</label>
                                    </div>

                                    <div class="checkbox-group">
                                        <input type="checkbox" id="double-click-maximize" checked />
                                        <label for="double-click-maximize">Double-click header to maximize</label>
                                    </div>
                                </div>
                            </div>

                            <div class="settings-section">
                                <h3>Taskbar</h3>
                                <div class="settings-group">
                                    <div class="checkbox-group">
                                        <input type="checkbox" id="auto-hide-taskbar" />
                                        <label for="auto-hide-taskbar">Auto-hide taskbar</label>
                                    </div>

                                    <div class="checkbox-group">
                                        <input type="checkbox" id="show-clock" checked />
                                        <label for="show-clock">Show clock</label>
                                    </div>

                                    <label>Taskbar Position:</label>
                                    <select id="taskbar-position">
                                        <option value="bottom">Bottom</option>
                                        <option value="top">Top</option>
                                        <option value="left">Left</option>
                                        <option value="right">Right</option>
                                    </select>
                                </div>
                            </div>

                            <div class="settings-section">
                                <h3>Start Menu</h3>
                                <div class="settings-group">
                                    <div class="checkbox-group">
                                        <input type="checkbox" id="show-recent-files" checked />
                                        <label for="show-recent-files">Show recently used files</label>
                                    </div>

                                    <div class="checkbox-group">
                                        <input type="checkbox" id="search-web" />
                                        <label for="search-web">Include web search in start menu</label>
                                    </div>
                                </div>
                            </div>

                            <div class="settings-section">
                                <h3>File Manager</h3>
                                <div class="settings-group">
                                    <div class="checkbox-group">
                                        <input type="checkbox" id="single-click-open" />
                                        <label for="single-click-open">Single-click to open items</label>
                                    </div>

                                    <div class="checkbox-group">
                                        <input type="checkbox" id="show-hidden-files" />
                                        <label for="show-hidden-files">Show hidden files</label>
                                    </div>

                                    <label>Default View:</label>
                                    <select id="default-file-view">
                                        <option value="grid">Grid View</option>
                                        <option value="list">List View</option>
                                        <option value="details">Details View</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="settings-panel" id="performance-panel">
                            <div class="settings-section">
                                <h3>Animations</h3>
                                <div class="settings-group">
                                    <div class="checkbox-group">
                                        <input type="checkbox" id="animations-enabled" checked />
                                        <label for="animations-enabled">Enable animations</label>
                                    </div>

                                    <label>Animation Quality:</label>
                                    <select id="animation-quality">
                                        <option value="high">High Quality</option>
                                        <option value="medium">Medium Quality</option>
                                        <option value="low">Low Quality</option>
                                        <option value="none">Disabled</option>
                                    </select>

                                    <label>Animation Speed:</label>
                                    <div class="slider-control">
                                        <input type="range" id="animation-speed" min="0.1" max="2.0" step="0.1" value="1.0" />
                                        <span class="slider-value">1.0x</span>
                                    </div>
                                </div>
                            </div>

                            <div class="settings-section">
                                <h3>Hardware Acceleration</h3>
                                <div class="settings-group">
                                    <div class="checkbox-group">
                                        <input type="checkbox" id="hardware-acceleration" checked />
                                        <label for="hardware-acceleration">Use hardware acceleration when available</label>
                                    </div>

                                    <div class="checkbox-group">
                                        <input type="checkbox" id="gpu-compositing" checked />
                                        <label for="gpu-compositing">Enable GPU compositing</label>
                                    </div>
                                </div>
                            </div>

                            <div class="settings-section">
                                <h3>Memory Management</h3>
                                <div class="settings-group">
                                    <label>Memory Usage Limit:</label>
                                    <select id="memory-limit">
                                        <option value="auto">Automatic</option>
                                        <option value="low">Conservative (512MB)</option>
                                        <option value="medium">Balanced (1GB)</option>
                                        <option value="high">Performance (2GB)</option>
                                    </select>

                                    <div class="checkbox-group">
                                        <input type="checkbox" id="preload-apps" />
                                        <label for="preload-apps">Preload frequently used applications</label>
                                    </div>
                                </div>
                            </div>

                            <div class="settings-section">
                                <h3>Background Processes</h3>
                                <div class="settings-group">
                                    <div class="checkbox-group">
                                        <input type="checkbox" id="background-updates" checked />
                                        <label for="background-updates">Check for updates in background</label>
                                    </div>

                                    <div class="checkbox-group">
                                        <input type="checkbox" id="background-sync" checked />
                                        <label for="background-sync">Sync user data in background</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="settings-panel" id="accessibility-panel">
                            <div class="settings-section">
                                <h3>Visual Accessibility</h3>
                                <div class="settings-group">
                                    <div class="checkbox-group">
                                        <input type="checkbox" id="high-contrast" />
                                        <label for="high-contrast">High contrast mode</label>
                                    </div>

                                    <div class="checkbox-group">
                                        <input type="checkbox" id="large-cursor" />
                                        <label for="large-cursor">Large cursor</label>
                                    </div>

                                    <label>Text Scale:</label>
                                    <div class="slider-control">
                                        <input type="range" id="text-scale" min="0.8" max="2.0" step="0.1" value="1.0" />
                                        <span class="slider-value">100%</span>
                                    </div>
                                </div>
                            </div>

                            <div class="settings-section">
                                <h3>Motion</h3>
                                <div class="settings-group">
                                    <div class="checkbox-group">
                                        <input type="checkbox" id="reduce-motion" />
                                        <label for="reduce-motion">Reduce motion and animations</label>
                                    </div>

                                    <div class="checkbox-group">
                                        <input type="checkbox" id="disable-parallax" />
                                        <label for="disable-parallax">Disable parallax effects</label>
                                    </div>
                                </div>
                            </div>

                            <div class="settings-section">
                                <h3>Keyboard & Mouse</h3>
                                <div class="settings-group">
                                    <div class="checkbox-group">
                                        <input type="checkbox" id="sticky-keys" />
                                        <label for="sticky-keys">Sticky keys</label>
                                    </div>

                                    <div class="checkbox-group">
                                        <input type="checkbox" id="slow-keys" />
                                        <label for="slow-keys">Slow keys</label>
                                    </div>

                                    <div class="checkbox-group">
                                        <input type="checkbox" id="mouse-keys" />
                                        <label for="mouse-keys">Mouse keys (use numpad as mouse)</label>
                                    </div>

                                    <label>Key Repeat Rate:</label>
                                    <div class="slider-control">
                                        <input type="range" id="key-repeat-rate" min="1" max="10" value="5" />
                                        <span class="slider-value">5</span>
                                    </div>
                                </div>
                            </div>

                            <div class="settings-section">
                                <h3>Screen Reader</h3>
                                <div class="settings-group">
                                    <div class="checkbox-group">
                                        <input type="checkbox" id="screen-reader" />
                                        <label for="screen-reader">Enable screen reader support</label>
                                    </div>

                                    <div class="checkbox-group">
                                        <input type="checkbox" id="announce-notifications" />
                                        <label for="announce-notifications">Announce notifications</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="settings-panel" id="security-panel">
                            <div class="settings-section">
                                <h3>Privacy</h3>
                                <div class="settings-group">
                                    <div class="checkbox-group">
                                        <input type="checkbox" id="save-session" checked />
                                        <label for="save-session">Remember login session</label>
                                    </div>

                                    <div class="checkbox-group">
                                        <input type="checkbox" id="usage-analytics" />
                                        <label for="usage-analytics">Send anonymous usage analytics</label>
                                    </div>

                                    <div class="checkbox-group">
                                        <input type="checkbox" id="error-reporting" checked />
                                        <label for="error-reporting">Send error reports to improve EmberFrame</label>
                                    </div>
                                </div>
                            </div>

                            <div class="settings-section">
                                <h3>Session Security</h3>
                                <div class="settings-group">
                                    <label>Auto-lock after inactivity:</label>
                                    <select id="auto-lock-time">
                                        <option value="never">Never</option>
                                        <option value="5">5 minutes</option>
                                        <option value="15">15 minutes</option>
                                        <option value="30">30 minutes</option>
                                        <option value="60">1 hour</option>
                                    </select>

                                    <div class="checkbox-group">
                                        <input type="checkbox" id="require-password-wake" />
                                        <label for="require-password-wake">Require password after screen lock</label>
                                    </div>
                                </div>
                            </div>

                            <div class="settings-section">
                                <h3>File Security</h3>
                                <div class="settings-group">
                                    <div class="checkbox-group">
                                        <input type="checkbox" id="encrypt-files" />
                                        <label for="encrypt-files">Encrypt user files (requires restart)</label>
                                    </div>

                                    <div class="checkbox-group">
                                        <input type="checkbox" id="secure-delete" />
                                        <label for="secure-delete">Secure file deletion</label>
                                    </div>
                                </div>
                            </div>

                            <div class="settings-section">
                                <h3>Network Security</h3>
                                <div class="settings-group">
                                    <div class="checkbox-group">
                                        <input type="checkbox" id="https-only" checked />
                                        <label for="https-only">Force HTTPS connections</label>
                                    </div>

                                    <div class="checkbox-group">
                                        <input type="checkbox" id="block-trackers" />
                                        <label for="block-trackers">Block known trackers</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="settings-panel" id="notifications-panel">
                            <div class="settings-section">
                                <h3>Notification Settings</h3>
                                <div class="settings-group">
                                    <div class="checkbox-group">
                                        <input type="checkbox" id="enable-notifications" checked />
                                        <label for="enable-notifications">Enable notifications</label>
                                    </div>

                                    <label>Notification Position:</label>
                                    <select id="notification-position">
                                        <option value="top-right">Top Right</option>
                                        <option value="top-left">Top Left</option>
                                        <option value="bottom-right">Bottom Right</option>
                                        <option value="bottom-left">Bottom Left</option>
                                    </select>

                                    <label>Default Duration:</label>
                                    <div class="slider-control">
                                        <input type="range" id="notification-duration" min="1" max="10" value="4" />
                                        <span class="slider-value">4s</span>
                                    </div>
                                </div>
                            </div>

                            <div class="settings-section">
                                <h3>Notification Types</h3>
                                <div class="settings-group">
                                    <div class="checkbox-group">
                                        <input type="checkbox" id="notify-file-operations" checked />
                                        <label for="notify-file-operations">File operations</label>
                                    </div>

                                    <div class="checkbox-group">
                                        <input type="checkbox" id="notify-app-events" checked />
                                        <label for="notify-app-events">Application events</label>
                                    </div>

                                    <div class="checkbox-group">
                                        <input type="checkbox" id="notify-system-updates" checked />
                                        <label for="notify-system-updates">System updates</label>
                                    </div>

                                    <div class="checkbox-group">
                                        <input type="checkbox" id="notify-errors" checked />
                                        <label for="notify-errors">Error messages</label>
                                    </div>
                                </div>
                            </div>

                            <div class="settings-section">
                                <h3>Do Not Disturb</h3>
                                <div class="settings-group">
                                    <div class="checkbox-group">
                                        <input type="checkbox" id="do-not-disturb" />
                                        <label for="do-not-disturb">Enable Do Not Disturb mode</label>
                                    </div>

                                    <label>Quiet Hours Start:</label>
                                    <input type="time" id="quiet-hours-start" value="22:00" />

                                    <label>Quiet Hours End:</label>
                                    <input type="time" id="quiet-hours-end" value="08:00" />
                                </div>
                            </div>
                        </div>

                        <div class="settings-panel" id="advanced-panel">
                            <div class="settings-section">
                                <h3>Developer Options</h3>
                                <div class="settings-group">
                                    <div class="checkbox-group">
                                        <input type="checkbox" id="developer-mode" />
                                        <label for="developer-mode">Enable developer mode</label>
                                    </div>

                                    <div class="checkbox-group">
                                        <input type="checkbox" id="debug-mode" />
                                        <label for="debug-mode">Enable debug logging</label>
                                    </div>

                                    <div class="checkbox-group">
                                        <input type="checkbox" id="show-fps" />
                                        <label for="show-fps">Show FPS counter</label>
                                    </div>
                                </div>
                            </div>

                            <div class="settings-section">
                                <h3>Experimental Features</h3>
                                <div class="settings-group">
                                    <div class="checkbox-group">
                                        <input type="checkbox" id="experimental-features" />
                                        <label for="experimental-features">Enable experimental features</label>
                                    </div>

                                    <div class="checkbox-group">
                                        <input type="checkbox" id="beta-updates" />
                                        <label for="beta-updates">Receive beta updates</label>
                                    </div>
                                </div>
                            </div>

                            <div class="settings-section">
                                <h3>Data Management</h3>
                                <div class="settings-group">
                                    <button class="btn btn-secondary" onclick="Settings.exportSettings()">
                                        <i class="fas fa-download"></i> Export Settings
                                    </button>
                                    <button class="btn btn-secondary" onclick="Settings.importSettings()">
                                        <i class="fas fa-upload"></i> Import Settings
                                    </button>
                                    <button class="btn btn-warning" onclick="Settings.resetSettings()">
                                        <i class="fas fa-undo"></i> Reset to Defaults
                                    </button>
                                    <button class="btn btn-danger" onclick="Settings.clearAllData()">
                                        <i class="fas fa-trash"></i> Clear All Data
                                    </button>
                                </div>
                            </div>

                            <div class="settings-section">
                                <h3>System Information</h3>
                                <div class="settings-group">
                                    <div class="system-info">
                                        <div class="info-row">
                                            <span>Browser:</span>
                                            <span id="browser-info">Loading...</span>
                                        </div>
                                        <div class="info-row">
                                            <span>Screen Resolution:</span>
                                            <span id="screen-resolution">Loading...</span>
                                        </div>
                                        <div class="info-row">
                                            <span>Color Depth:</span>
                                            <span id="color-depth">Loading...</span>
                                        </div>
                                        <div class="info-row">
                                            <span>Memory Usage:</span>
                                            <span id="memory-usage">Loading...</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="settings-panel" id="about-panel">
                            <div class="settings-section">
                                <div class="about-header">
                                    <div class="about-logo">🔥</div>
                                    <h2>EmberFrame</h2>
                                    <p class="version">Version 2.0.0</p>
                                    <p class="tagline">Advanced Web-Based Desktop Environment</p>
                                </div>
                            </div>

                            <div class="settings-section">
                                <h3>About EmberFrame</h3>
                                <div class="settings-group">
                                    <p>EmberFrame is a modern, full-featured desktop environment that runs entirely in your web browser. Built with cutting-edge web technologies, it provides a complete operating system experience with real file management, multi-user support, and a suite of productivity applications.</p>
                                    
                                    <div class="feature-grid">
                                        <div class="feature-item">
                                            <i class="fas fa-window-maximize"></i>
                                            <h4>Window Management</h4>
                                            <p>Full desktop-style window management</p>
                                        </div>
                                        <div class="feature-item">
                                            <i class="fas fa-folder"></i>
                                            <h4>File System</h4>
                                            <p>Real file management and operations</p>
                                        </div>
                                        <div class="feature-item">
                                            <i class="fas fa-users"></i>
                                            <h4>Multi-User</h4>
                                            <p>Secure user accounts and sessions</p>
                                        </div>
                                        <div class="feature-item">
                                            <i class="fas fa-mobile-alt"></i>
                                            <h4>Responsive</h4>
                                            <p>Works on desktop and mobile devices</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="settings-section">
                                <h3>Credits</h3>
                                <div class="settings-group">
                                    <div class="credits">
                                        <div class="credit-item">
                                            <strong>EmberFrame Team</strong>
                                            <span>Core Development</span>
                                        </div>
                                        <div class="credit-item">
                                            <strong>Font Awesome</strong>
                                            <span>Icon Library</span>
                                        </div>
                                        <div class="credit-item">
                                            <strong>Google Fonts</strong>
                                            <span>Typography</span>
                                        </div>
                                        <div class="credit-item">
                                            <strong>Flask Community</strong>
                                            <span>Backend Framework</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="settings-section">
                                <h3>System Status</h3>
                                <div class="settings-group">
                                    <div class="status-grid">
                                        <div class="status-item">
                                            <div class="status-indicator online"></div>
                                            <span>System Status</span>
                                            <strong>Online</strong>
                                        </div>
                                        <div class="status-item">
                                            <div class="status-indicator online"></div>
                                            <span>File System</span>
                                            <strong>Available</strong>
                                        </div>
                                        <div class="status-item">
                                            <div class="status-indicator online"></div>
                                            <span>User Session</span>
                                            <strong>Active</strong>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Loading overlay -->
                    <div class="loading-overlay" id="settings-loading">
                        <div class="loading-spinner">
                            <div class="spinner"></div>
                            <div class="loading-text">Applying settings...</div>
                        </div>
                    </div>
                </div>

                <!-- Hidden file input for importing settings -->
                <input type="file" id="settings-import-input" accept=".json" style="display: none;" />

                <style>
                    .settings-app {
                        height: 100%;
                        display: flex;
                        background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                        font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
                        position: relative;
                        overflow: hidden;
                    }

                    .settings-sidebar {
                        width: 250px;
                        background: rgba(255, 255, 255, 0.95);
                        border-right: 1px solid rgba(0, 0, 0, 0.1);
                        display: flex;
                        flex-direction: column;
                        backdrop-filter: blur(10px);
                    }

                    .settings-search {
                        padding: 20px;
                        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                        position: relative;
                    }

                    .settings-search input {
                        width: 100%;
                        padding: 12px 40px 12px 15px;
                        border: 2px solid #e1e5e9;
                        border-radius: 25px;
                        font-size: 14px;
                        background: #f8f9fa;
                        transition: all 0.3s ease;
                    }

                    .settings-search input:focus {
                        outline: none;
                        border-color: #007bff;
                        background: white;
                        box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
                    }

                    .settings-search i {
                        position: absolute;
                        right: 35px;
                        top: 50%;
                        transform: translateY(-50%);
                        color: #6c757d;
                    }

                    .settings-categories {
                        flex: 1;
                        padding: 10px 0;
                        overflow-y: auto;
                    }

                    .settings-category {
                        display: flex;
                        align-items: center;
                        gap: 15px;
                        padding: 15px 25px;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        border-left: 3px solid transparent;
                        color: #495057;
                    }

                    .settings-category:hover {
                        background: rgba(0, 123, 255, 0.05);
                        color: #007bff;
                        transform: translateX(5px);
                    }

                    .settings-category.active {
                        background: rgba(0, 123, 255, 0.1);
                        border-left-color: #007bff;
                        color: #007bff;
                        font-weight: 600;
                    }

                    .settings-category i {
                        width: 20px;
                        text-align: center;
                        font-size: 16px;
                    }

                    .settings-content {
                        flex: 1;
                        background: white;
                        overflow-y: auto;
                        position: relative;
                    }

                    .settings-header {
                        padding: 30px 40px 20px;
                        border-bottom: 1px solid #e9ecef;
                        background: linear-gradient(135deg, rgba(0, 123, 255, 0.05), rgba(108, 117, 125, 0.05));
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
                        display: none;
                        padding: 30px 40px;
                    }

                    .settings-panel.active {
                        display: block;
                    }

                    .settings-section {
                        margin-bottom: 40px;
                        background: white;
                        border-radius: 12px;
                        border: 1px solid #e9ecef;
                        overflow: hidden;
                        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
                    }

                    .settings-section h3 {
                        margin: 0;
                        padding: 20px 25px;
                        background: linear-gradient(135deg, #f8f9fa, #e9ecef);
                        color: #2c3e50;
                        font-size: 18px;
                        font-weight: 600;
                        border-bottom: 1px solid #e9ecef;
                    }

                    .settings-group {
                        padding: 25px;
                    }

                    .settings-group label {
                        display: block;
                        margin-bottom: 8px;
                        font-weight: 600;
                        color: #2c3e50;
                        font-size: 14px;
                    }

                    .settings-group select,
                    .settings-group input[type="text"],
                    .settings-group input[type="email"],
                    .settings-group input[type="time"] {
                        width: 100%;
                        padding: 12px 15px;
                        border: 2px solid #e9ecef;
                        border-radius: 8px;
                        font-size: 14px;
                        margin-bottom: 20px;
                        transition: all 0.3s ease;
                    }

                    .settings-group select:focus,
                    .settings-group input:focus {
                        outline: none;
                        border-color: #007bff;
                        box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
                    }

                    .checkbox-group {
                        display: flex;
                        align-items: center;
                        gap: 12px;
                        margin-bottom: 15px;
                        cursor: pointer;
                    }

                    .checkbox-group input[type="checkbox"] {
                        width: 18px;
                        height: 18px;
                        cursor: pointer;
                        margin: 0;
                    }

                    .checkbox-group label {
                        margin: 0;
                        cursor: pointer;
                        font-weight: 500;
                        font-size: 14px;
                    }

                    .slider-control {
                        display: flex;
                        align-items: center;
                        gap: 15px;
                        margin-bottom: 20px;
                    }

                    .slider-control input[type="range"] {
                        flex: 1;
                        margin: 0;
                    }

                    .slider-value {
                        min-width: 60px;
                        text-align: center;
                        font-weight: 600;
                        color: #007bff;
                        background: rgba(0, 123, 255, 0.1);
                        padding: 6px 12px;
                        border-radius: 15px;
                        font-size: 12px;
                    }

                    /* Theme Selector */
                    .theme-selector {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
                        gap: 15px;
                        margin-top: 15px;
                    }

                    .theme-option {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        gap: 10px;
                        padding: 15px;
                        border: 2px solid #e9ecef;
                        border-radius: 12px;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        background: #f8f9fa;
                    }

                    .theme-option:hover {
                        border-color: #007bff;
                        transform: translateY(-3px);
                        box-shadow: 0 5px 15px rgba(0, 123, 255, 0.2);
                    }

                    .theme-option.active {
                        border-color: #007bff;
                        background: rgba(0, 123, 255, 0.05);
                        box-shadow: 0 3px 10px rgba(0, 123, 255, 0.2);
                    }

                    .theme-preview {
                        width: 60px;
                        height: 40px;
                        border-radius: 8px;
                        border: 1px solid rgba(0, 0, 0, 0.1);
                    }

                    .theme-preview.cyber-blue {
                        background: linear-gradient(135deg, #00d4ff, #0099cc);
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

                    .theme-option span {
                        font-size: 12px;
                        font-weight: 600;
                        color: #495057;
                        text-align: center;
                    }

                    /* Gradient Selector */
                    .gradient-selector {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
                        gap: 12px;
                        margin-top: 15px;
                    }

                    .gradient-option {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        gap: 8px;
                        padding: 12px;
                        border: 2px solid #e9ecef;
                        border-radius: 10px;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    }

                    .gradient-option:hover {
                        border-color: #007bff;
                        transform: translateY(-2px);
                    }

                    .gradient-option.active {
                        border-color: #007bff;
                        background: rgba(0, 123, 255, 0.05);
                    }

                    .gradient-preview {
                        width: 50px;
                        height: 30px;
                        border-radius: 6px;
                        border: 1px solid rgba(0, 0, 0, 0.1);
                    }

                    .gradient-option span {
                        font-size: 11px;
                        font-weight: 600;
                        color: #495057;
                    }

                    /* Buttons */
                    .btn {
                        display: inline-flex;
                        align-items: center;
                        gap: 8px;
                        padding: 12px 20px;
                        border: none;
                        border-radius: 8px;
                        font-size: 14px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        text-decoration: none;
                        margin-right: 10px;
                        margin-bottom: 10px;
                    }

                    .btn-secondary {
                        background: #6c757d;
                        color: white;
                    }

                    .btn-secondary:hover {
                        background: #5a6268;
                        transform: translateY(-2px);
                        box-shadow: 0 4px 12px rgba(108, 117, 125, 0.3);
                    }

                    .btn-warning {
                        background: #ffc107;
                        color: #212529;
                    }

                    .btn-warning:hover {
                        background: #e0a800;
                        transform: translateY(-2px);
                    }

                    .btn-danger {
                        background: #dc3545;
                        color: white;
                    }

                    .btn-danger:hover {
                        background: #c82333;
                        transform: translateY(-2px);
                    }

                    /* About Section */
                    .about-header {
                        text-align: center;
                        padding: 40px 20px;
                        background: linear-gradient(135deg, rgba(0, 123, 255, 0.05), rgba(108, 117, 125, 0.05));
                        border-radius: 15px;
                        margin-bottom: 30px;
                    }

                    .about-logo {
                        font-size: 80px;
                        margin-bottom: 20px;
                        animation: pulse 3s ease-in-out infinite;
                    }

                    @keyframes pulse {
                        0%, 100% { transform: scale(1); }
                        50% { transform: scale(1.05); }
                    }

                    .about-header h2 {
                        margin: 0 0 10px 0;
                        font-size: 36px;
                        font-weight: 900;
                        color: #2c3e50;
                    }

                    .version {
                        color: #007bff;
                        font-size: 18px;
                        font-weight: 600;
                        margin-bottom: 10px;
                    }

                    .tagline {
                        color: #6c757d;
                        font-size: 16px;
                        font-style: italic;
                    }

                    .feature-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                        gap: 20px;
                        margin-top: 25px;
                    }

                    .feature-item {
                        text-align: center;
                        padding: 20px;
                        background: #f8f9fa;
                        border-radius: 12px;
                        border: 1px solid #e9ecef;
                    }

                    .feature-item i {
                        font-size: 32px;
                        color: #007bff;
                        margin-bottom: 15px;
                    }

                    .feature-item h4 {
                        margin: 0 0 8px 0;
                        color: #2c3e50;
                        font-size: 16px;
                        font-weight: 600;
                    }

                    .feature-item p {
                        margin: 0;
                        color: #6c757d;
                        font-size: 14px;
                    }

                    .credits {
                        display: flex;
                        flex-direction: column;
                        gap: 15px;
                    }

                    .credit-item {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 15px;
                        background: #f8f9fa;
                        border-radius: 8px;
                        border: 1px solid #e9ecef;
                    }

                    .credit-item strong {
                        color: #2c3e50;
                        font-weight: 600;
                    }

                    .credit-item span {
                        color: #6c757d;
                        font-size: 14px;
                    }

                    .status-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                        gap: 15px;
                    }

                    .status-item {
                        display: flex;
                        align-items: center;
                        gap: 12px;
                        padding: 15px;
                        background: #f8f9fa;
                        border-radius: 8px;
                        border: 1px solid #e9ecef;
                    }

                    .status-indicator {
                        width: 12px;
                        height: 12px;
                        border-radius: 50%;
                        flex-shrink: 0;
                    }

                    .status-indicator.online {
                        background: #28a745;
                        box-shadow: 0 0 0 3px rgba(40, 167, 69, 0.2);
                        animation: pulse-online 2s ease-in-out infinite;
                    }

                    @keyframes pulse-online {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0.6; }
                    }

                    .status-item span {
                        color: #6c757d;
                        font-size: 14px;
                        flex: 1;
                    }

                    .status-item strong {
                        color: #28a745;
                        font-weight: 600;
                        font-size: 14px;
                    }

                    /* System Info */
                    .system-info {
                        display: flex;
                        flex-direction: column;
                        gap: 12px;
                    }

                    .info-row {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 12px 15px;
                        background: #f8f9fa;
                        border-radius: 8px;
                        border: 1px solid #e9ecef;
                    }

                    .info-row span:first-child {
                        color: #495057;
                        font-weight: 600;
                    }

                    .info-row span:last-child {
                        color: #007bff;
                        font-family: 'Courier New', monospace;
                        font-size: 13px;
                    }

                    /* Loading states */
                    .loading-overlay {
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: rgba(0, 0, 0, 0.7);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        backdrop-filter: blur(5px);
                        display: none;
                        z-index: 1000;
                    }

                    .loading-overlay.show {
                        display: flex;
                    }

                    .loading-spinner {
                        text-align: center;
                        color: white;
                    }

                    .spinner {
                        width: 50px;
                        height: 50px;
                        border: 4px solid rgba(255, 255, 255, 0.3);
                        border-top: 4px solid white;
                        border-radius: 50%;
                        animation: spin 1s linear infinite;
                        margin: 0 auto 20px;
                    }

                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }

                    .loading-text {
                        font-size: 18px;
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
                            max-height: 200px;
                            overflow-y: auto;
                        }

                        .settings-categories {
                            display: flex;
                            overflow-x: auto;
                            padding: 10px;
                            gap: 10px;
                        }

                        .settings-category {
                            flex-shrink: 0;
                            white-space: nowrap;
                            padding: 10px 15px;
                            border-radius: 20px;
                            border: 2px solid #e9ecef;
                            background: white;
                        }

                        .settings-category.active {
                            border-color: #007bff;
                            background: rgba(0, 123, 255, 0.1);
                        }

                        .settings-header,
                        .settings-panel {
                            padding: 20px;
                        }

                        .settings-group {
                            padding: 20px;
                        }

                        .theme-selector,
                        .gradient-selector {
                            grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
                            gap: 10px;
                        }

                        .feature-grid,
                        .status-grid {
                            grid-template-columns: 1fr;
                        }
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
        this.currentCategory = 'appearance';
        this.settings = {};
        this.isLoading = false;

        this.setupEventListeners();
        this.loadUserSettings();
        this.updateSystemInfo();
        this.setupSliderListeners();
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

        // Search functionality
        const searchInput = this.currentWindow.querySelector('#settings-search');
        searchInput.addEventListener('input', (e) => {
            this.searchSettings(e.target.value);
        });

        // Theme selection
        const themeOptions = this.currentWindow.querySelectorAll('.theme-option');
        themeOptions.forEach(option => {
            option.addEventListener('click', () => {
                const theme = option.dataset.theme;
                this.applyTheme(theme);
            });
        });

        // Gradient selection
        const gradientOptions = this.currentWindow.querySelectorAll('.gradient-option');
        gradientOptions.forEach(option => {
            option.addEventListener('click', () => {
                const gradient = option.dataset.gradient;
                this.applyGradient(gradient);
            });
        });

        // Settings change handlers
        this.setupSettingChangeHandlers();

        // Import/Export handlers
        const importInput = this.currentWindow.querySelector('#settings-import-input');
        importInput.addEventListener('change', (e) => {
            this.handleImportFile(e.target.files[0]);
        });
    }

    static setupSliderListeners() {
        // Font size slider
        const fontSizeSlider = this.currentWindow.querySelector('#font-size');
        const fontSizeValue = fontSizeSlider.parentElement.querySelector('.slider-value');
        fontSizeSlider.addEventListener('input', (e) => {
            fontSizeValue.textContent = e.target.value + 'px';
            this.updateSetting('fontSize', parseInt(e.target.value));
        });

        // Icon size slider
        const iconSizeSlider = this.currentWindow.querySelector('#icon-size');
        const iconSizeValue = iconSizeSlider.parentElement.querySelector('.slider-value');
        iconSizeSlider.addEventListener('input', (e) => {
            iconSizeValue.textContent = e.target.value + 'px';
            this.updateSetting('iconSize', parseInt(e.target.value));
        });

        // Transparency slider
        const transparencySlider = this.currentWindow.querySelector('#transparency');
        const transparencyValue = transparencySlider.parentElement.querySelector('.slider-value');
        transparencySlider.addEventListener('input', (e) => {
            transparencyValue.textContent = e.target.value + '%';
            this.updateSetting('transparency', parseInt(e.target.value));
        });

        // Animation speed slider
        const animSpeedSlider = this.currentWindow.querySelector('#animation-speed');
        const animSpeedValue = animSpeedSlider.parentElement.querySelector('.slider-value');
        animSpeedSlider.addEventListener('input', (e) => {
            animSpeedValue.textContent = e.target.value + 'x';
            this.updateSetting('animationSpeed', parseFloat(e.target.value));
        });

        // Text scale slider
        const textScaleSlider = this.currentWindow.querySelector('#text-scale');
        const textScaleValue = textScaleSlider.parentElement.querySelector('.slider-value');
        textScaleSlider.addEventListener('input', (e) => {
            const percent = Math.round(e.target.value * 100);
            textScaleValue.textContent = percent + '%';
            this.updateSetting('textScale', parseFloat(e.target.value));
        });

        // Notification duration slider
        const notifDurationSlider = this.currentWindow.querySelector('#notification-duration');
        const notifDurationValue = notifDurationSlider.parentElement.querySelector('.slider-value');
        notifDurationSlider.addEventListener('input', (e) => {
            notifDurationValue.textContent = e.target.value + 's';
            this.updateSetting('notificationDuration', parseInt(e.target.value));
        });

        // Key repeat rate slider
        const keyRepeatSlider = this.currentWindow.querySelector('#key-repeat-rate');
        const keyRepeatValue = keyRepeatSlider.parentElement.querySelector('.slider-value');
        keyRepeatSlider.addEventListener('input', (e) => {
            keyRepeatValue.textContent = e.target.value;
            this.updateSetting('keyRepeatRate', parseInt(e.target.value));
        });
    }

    static setupSettingChangeHandlers() {
        // Get all inputs and selects
        const inputs = this.currentWindow.querySelectorAll('input, select');

        inputs.forEach(input => {
            if (input.type === 'checkbox') {
                input.addEventListener('change', (e) => {
                    const settingName = this.camelCase(e.target.id);
                    this.updateSetting(settingName, e.target.checked);
                });
            } else if (input.type === 'range') {
                // Range inputs are handled separately in setupSliderListeners
                return;
            } else {
                input.addEventListener('change', (e) => {
                    const settingName = this.camelCase(e.target.id);
                    this.updateSetting(settingName, e.target.value);
                });
            }
        });
    }

    static switchCategory(categoryName) {
        // Update sidebar
        this.currentWindow.querySelectorAll('.settings-category').forEach(cat => {
            cat.classList.remove('active');
        });
        this.currentWindow.querySelector(`[data-category="${categoryName}"]`).classList.add('active');

        // Update content
        this.currentWindow.querySelectorAll('.settings-panel').forEach(panel => {
            panel.classList.remove('active');
        });
        this.currentWindow.querySelector(`#${categoryName}-panel`).classList.add('active');

        // Update header
        const titles = {
            'appearance': 'Appearance',
            'behavior': 'Behavior',
            'performance': 'Performance',
            'accessibility': 'Accessibility',
            'security': 'Security',
            'notifications': 'Notifications',
            'advanced': 'Advanced',
            'about': 'About'
        };

        const descriptions = {
            'appearance': 'Customize the look and feel of your desktop',
            'behavior': 'Configure how the system responds to your actions',
            'performance': 'Optimize system performance and animations',
            'accessibility': 'Make the system more accessible',
            'security': 'Manage security and privacy settings',
            'notifications': 'Control how and when you receive notifications',
            'advanced': 'Developer options and system management',
            'about': 'Information about EmberFrame'
        };

        this.currentWindow.querySelector('#settings-title').textContent = titles[categoryName];
        this.currentWindow.querySelector('#settings-description').textContent = descriptions[categoryName];

        this.currentCategory = categoryName;
    }

    static searchSettings(query) {
        const searchQuery = query.toLowerCase().trim();

        if (!searchQuery) {
            // Show all panels
            this.currentWindow.querySelectorAll('.settings-section').forEach(section => {
                section.style.display = 'block';
            });
            return;
        }

        // Search through all settings sections
        const sections = this.currentWindow.querySelectorAll('.settings-section');
        let foundSections = [];

        sections.forEach(section => {
            const text = section.textContent.toLowerCase();
            if (text.includes(searchQuery)) {
                section.style.display = 'block';
                foundSections.push(section);
            } else {
                section.style.display = 'none';
            }
        });

        // If we found matches in a specific category, switch to it
        if (foundSections.length > 0) {
            const firstMatch = foundSections[0];
            const panel = firstMatch.closest('.settings-panel');
            if (panel) {
                const categoryName = panel.id.replace('-panel', '');
                if (categoryName !== this.currentCategory) {
                    this.switchCategory(categoryName);
                }
            }
        }
    }

    static async loadUserSettings() {
        this.showLoading('Loading your settings...');

        try {
            const response = await fetch('/api/user/preferences');
            const data = await response.json();

            if (data.success) {
                this.settings = data.preferences || {};
                this.populateSettingsUI();
                console.log('✅ Settings loaded:', this.settings);
            } else {
                this.showNotification('Failed to load settings', 'error');
            }
        } catch (error) {
            console.error('Failed to load settings:', error);
            this.showNotification('Failed to load settings: ' + error.message, 'error');
        } finally {
            this.hideLoading();
        }
    }

    static populateSettingsUI() {
        // Populate all form elements with saved settings
        Object.keys(this.settings).forEach(key => {
            const element = this.currentWindow.querySelector(`#${this.kebabCase(key)}`);
            if (element) {
                if (element.type === 'checkbox') {
                    element.checked = this.settings[key];
                } else if (element.type === 'range') {
                    element.value = this.settings[key];
                    // Update slider value display
                    const valueDisplay = element.parentElement.querySelector('.slider-value');
                    if (valueDisplay) {
                        let displayValue = this.settings[key];
                        if (key === 'fontSize' || key === 'iconSize') {
                            displayValue += 'px';
                        } else if (key === 'transparency') {
                            displayValue += '%';
                        } else if (key === 'animationSpeed') {
                            displayValue += 'x';
                        } else if (key === 'textScale') {
                            displayValue = Math.round(this.settings[key] * 100) + '%';
                        } else if (key === 'notificationDuration') {
                            displayValue += 's';
                        }
                        valueDisplay.textContent = displayValue;
                    }
                } else {
                    element.value = this.settings[key];
                }
            }
        });

        // Update theme selection
        if (this.settings.theme) {
            this.currentWindow.querySelectorAll('.theme-option').forEach(option => {
                option.classList.remove('active');
            });
            const activeTheme = this.currentWindow.querySelector(`[data-theme="${this.settings.theme}"]`);
            if (activeTheme) {
                activeTheme.classList.add('active');
            }
        }

        // Update gradient selection
        if (this.settings.wallpaperGradient) {
            this.currentWindow.querySelectorAll('.gradient-option').forEach(option => {
                option.classList.remove('active');
            });
            const activeGradient = this.currentWindow.querySelector(`[data-gradient="${this.settings.wallpaperGradient}"]`);
            if (activeGradient) {
                activeGradient.classList.add('active');
            }
        }
    }

    static async updateSetting(key, value) {
        if (this.isLoading) return;

        this.settings[key] = value;

        // Apply setting immediately
        this.applySettingLocally(key, value);

        // Debounced save to server
        clearTimeout(this.saveTimeout);
        this.saveTimeout = setTimeout(() => {
            this.saveSettingsToServer();
        }, 500);
    }

    static applySettingLocally(key, value) {
        const root = document.documentElement;
        const body = document.body;

        switch (key) {
            case 'fontSize':
                root.style.setProperty('--base-font-size', value + 'px');
                break;
            case 'iconSize':
                root.style.setProperty('--icon-size', value + 'px');
                break;
            case 'transparency':
                const opacity = (100 - value) / 100;
                root.style.setProperty('--window-opacity', opacity);
                break;
            case 'animationsEnabled':
                if (!value) {
                    body.classList.add('no-animations');
                } else {
                    body.classList.remove('no-animations');
                }
                break;
            case 'blurEffects':
                if (!value) {
                    body.classList.add('no-blur');
                } else {
                    body.classList.remove('no-blur');
                }
                break;
            case 'iconShadows':
                if (!value) {
                    body.classList.add('no-icon-shadows');
                } else {
                    body.classList.remove('no-icon-shadows');
                }
                break;
            case 'showIconLabels':
                const labels = document.querySelectorAll('.icon-label');
                labels.forEach(label => {
                    label.style.display = value ? 'block' : 'none';
                });
                break;
            case 'animationSpeed':
                root.style.setProperty('--animation-duration', (0.3 / value) + 's');
                break;
            case 'autoHideTaskbar':
                const taskbar = document.querySelector('.taskbar');
                if (taskbar) {
                    if (value) {
                        taskbar.classList.add('auto-hide');
                    } else {
                        taskbar.classList.remove('auto-hide');
                    }
                }
                break;
            case 'showClock':
                const clock = document.querySelector('.time-display');
                if (clock) {
                    clock.style.display = value ? 'block' : 'none';
                }
                break;
            case 'fontFamily':
                root.style.setProperty('--system-font', value);
                body.style.fontFamily = value;
                break;
            case 'notificationPosition':
                if (window.NotificationSystem?.container) {
                    const container = window.NotificationSystem.container;
                    container.className = container.className.replace(/top-\w+|bottom-\w+/g, '');
                    container.classList.add(value);
                }
                break;
            case 'textScale':
                const scaledSize = (14 * value) + 'px';
                root.style.setProperty('--base-font-size', scaledSize);
                break;
        }
    }

    static applyTheme(themeName) {
        this.currentWindow.querySelectorAll('.theme-option').forEach(option => {
            option.classList.remove('active');
        });
        this.currentWindow.querySelector(`[data-theme="${themeName}"]`).classList.add('active');

        this.updateSetting('theme', themeName);

        // Apply theme to the system
        if (window.UserPreferencesManager) {
            window.UserPreferencesManager.applyTheme(themeName);
        }

        this.showNotification('Theme applied successfully', 'success');
    }

    static applyGradient(gradientName) {
        this.currentWindow.querySelectorAll('.gradient-option').forEach(option => {
            option.classList.remove('active');
        });
        this.currentWindow.querySelector(`[data-gradient="${gradientName}"]`).classList.add('active');

        this.updateSetting('wallpaperGradient', gradientName);

        // Apply gradient background
        const gradients = {
            'cyber': 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%)',
            'ember': 'linear-gradient(135deg, #1a0a00 0%, #2d1a0a 100%)',
            'matrix': 'linear-gradient(135deg, #000000 0%, #001100 100%)',
            'ocean': 'linear-gradient(135deg, #001133 0%, #003366 100%)'
        };

        if (gradients[gradientName]) {
            document.body.style.background = gradients[gradientName];
        }

        this.showNotification('Wallpaper updated', 'success');
    }

    static async saveSettingsToServer() {
        if (this.isLoading) return;

        try {
            const response = await fetch('/api/user/preferences', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ preferences: this.settings })
            });

            const data = await response.json();

            if (data.success) {
                console.log('✅ Settings saved to server');
            } else {
                this.showNotification('Failed to save settings', 'error');
            }
        } catch (error) {
            console.error('Failed to save settings:', error);
            this.showNotification('Failed to save settings: ' + error.message, 'error');
        }
    }

    static updateSystemInfo() {
        // Browser info
        const browserInfo = this.currentWindow.querySelector('#browser-info');
        browserInfo.textContent = navigator.userAgent.split(' ').slice(-2).join(' ');

        // Screen resolution
        const screenRes = this.currentWindow.querySelector('#screen-resolution');
        screenRes.textContent = `${screen.width}×${screen.height}`;

        // Color depth
        const colorDepth = this.currentWindow.querySelector('#color-depth');
        colorDepth.textContent = `${screen.colorDepth}-bit`;

        // Memory usage (if available)
        const memoryUsage = this.currentWindow.querySelector('#memory-usage');
        if (performance.memory) {
            const used = Math.round(performance.memory.usedJSHeapSize / 1024 / 1024);
            const total = Math.round(performance.memory.totalJSHeapSize / 1024 / 1024);
            memoryUsage.textContent = `${used}MB / ${total}MB`;
        } else {
            memoryUsage.textContent = 'Not available';
        }
    }

    // Data management methods
    static exportSettings() {
        const settingsData = {
            version: '2.0.0',
            exported: new Date().toISOString(),
            settings: this.settings
        };

        const dataStr = JSON.stringify(settingsData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `emberframe-settings-${new Date().toISOString().split('T')[0]}.json`;
        link.click();

        URL.revokeObjectURL(url);
        this.showNotification('Settings exported successfully', 'success');
    }

    static importSettings() {
        const input = this.currentWindow.querySelector('#settings-import-input');
        input.click();
    }

    static async handleImportFile(file) {
        if (!file) return;

        try {
            const text = await file.text();
            const data = JSON.parse(text);

            if (data.settings) {
                this.settings = { ...this.settings, ...data.settings };
                this.populateSettingsUI();
                await this.saveSettingsToServer();

                // Apply all settings
                Object.keys(data.settings).forEach(key => {
                    this.applySettingLocally(key, data.settings[key]);
                });

                this.showNotification('Settings imported successfully', 'success');
            } else {
                this.showNotification('Invalid settings file format', 'error');
            }
        } catch (error) {
            this.showNotification('Failed to import settings: ' + error.message, 'error');
        }
    }

    static async resetSettings() {
        if (!confirm('Reset all settings to default values?\n\nThis will restore EmberFrame to its original configuration.\n\nThis action cannot be undone.')) {
            return;
        }

        this.showLoading('Resetting settings...');

        try {
            const response = await fetch('/api/user/preferences/reset', {
                method: 'POST'
            });

            const data = await response.json();

            if (data.success) {
                this.settings = {};
                this.populateSettingsUI();

                // Reset UI to defaults
                document.body.className = '';
                document.documentElement.style.cssText = '';

                this.showNotification('Settings reset to defaults', 'success');

                // Suggest refresh
                setTimeout(() => {
                    if (confirm('Settings have been reset. Would you like to refresh the page to ensure all changes are applied?')) {
                        window.location.reload();
                    }
                }, 1500);
            } else {
                this.showNotification('Failed to reset settings', 'error');
            }
        } catch (error) {
            this.showNotification('Failed to reset settings: ' + error.message, 'error');
        } finally {
            this.hideLoading();
        }
    }

    static async clearAllData() {
        if (!confirm('Clear all user data?\n\nThis will remove:\n• All settings\n• All user files\n• All preferences\n• Session data\n\nThis action cannot be undone and you will be logged out.')) {
            return;
        }

        if (!confirm('Are you absolutely sure?\n\nThis will permanently delete all your data.')) {
            return;
        }

        this.showLoading('Clearing all data...');

        try {
            const response = await fetch('/api/user/clear-all-data', {
                method: 'POST'
            });

            if (response.ok) {
                this.showNotification('All data cleared. Logging out...', 'info');
                setTimeout(() => {
                    window.location.href = '/logout';
                }, 2000);
            } else {
                this.showNotification('Failed to clear data', 'error');
            }
        } catch (error) {
            this.showNotification('Failed to clear data: ' + error.message, 'error');
        } finally {
            this.hideLoading();
        }
    }

    // Utility methods
    static showLoading(message) {
        this.isLoading = true;
        const overlay = this.currentWindow.querySelector('#settings-loading');
        const text = overlay.querySelector('.loading-text');
        text.textContent = message;
        overlay.classList.add('show');
    }

    static hideLoading() {
        this.isLoading = false;
        const overlay = this.currentWindow.querySelector('#settings-loading');
        overlay.classList.remove('show');
    }

    static showNotification(message, type = 'info') {
        if (window.Notification) {
            window.Notification[type](message);
        } else {
            console.log(`[${type.toUpperCase()}] ${message}`);
        }
    }

    static camelCase(str) {
        return str.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
    }

    static kebabCase(str) {
        return str.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');
    }

    static onClose(windowElement) {
        // Save any pending changes before closing
        if (this.saveTimeout) {
            clearTimeout(this.saveTimeout);
            this.saveSettingsToServer();
        }

        this.currentWindow = null;
        return true;
    }
}

window.Settings = Settings;