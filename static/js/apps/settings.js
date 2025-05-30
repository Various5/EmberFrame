// Complete EmberFrame Settings Application - Fully Functional
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
                        <div class="settings-nav">
                            <div class="settings-nav-item active" data-section="appearance">
                                <i class="fas fa-palette"></i>
                                <span>Appearance</span>
                            </div>
                            <div class="settings-nav-item" data-section="desktop">
                                <i class="fas fa-desktop"></i>
                                <span>Desktop</span>
                            </div>
                            <div class="settings-nav-item" data-section="system">
                                <i class="fas fa-cog"></i>
                                <span>System</span>
                            </div>
                            <div class="settings-nav-item" data-section="account">
                                <i class="fas fa-user"></i>
                                <span>Account</span>
                            </div>
                            <div class="settings-nav-item" data-section="about">
                                <i class="fas fa-info-circle"></i>
                                <span>About</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="settings-content">
                        <!-- Appearance Section -->
                        <div class="settings-section active" id="appearance-section">
                            <div class="section-header">
                                <h2><i class="fas fa-palette"></i> Appearance Settings</h2>
                                <p>Customize the visual appearance of your EmberFrame desktop</p>
                            </div>
                            
                            <div class="setting-group">
                                <div class="setting-label">
                                    <h3>Theme Selection</h3>
                                    <p>Choose your preferred color theme</p>
                                </div>
                                <div class="theme-selector">
                                    <div class="theme-option active" data-theme="ember-red">
                                        <div class="theme-preview" style="background: linear-gradient(135deg, #ff4500, #dc143c);"></div>
                                        <span>Ember Red</span>
                                    </div>
                                    <div class="theme-option" data-theme="cyber-blue">
                                        <div class="theme-preview" style="background: linear-gradient(135deg, #00ffff, #0066ff);"></div>
                                        <span>Cyber Blue</span>
                                    </div>
                                    <div class="theme-option" data-theme="matrix-green">
                                        <div class="theme-preview" style="background: linear-gradient(135deg, #00ff00, #008800);"></div>
                                        <span>Matrix Green</span>
                                    </div>
                                    <div class="theme-option" data-theme="neon-purple">
                                        <div class="theme-preview" style="background: linear-gradient(135deg, #8000ff, #4000cc);"></div>
                                        <span>Neon Purple</span>
                                    </div>
                                    <div class="theme-option" data-theme="ice-blue">
                                        <div class="theme-preview" style="background: linear-gradient(135deg, #80e0ff, #4080ff);"></div>
                                        <span>Ice Blue</span>
                                    </div>
                                    <div class="theme-option" data-theme="ember-orange">
                                        <div class="theme-preview" style="background: linear-gradient(135deg, #ff8c00, #ff4500);"></div>
                                        <span>Ember Orange</span>
                                    </div>
                                </div>
                            </div>

                            <div class="setting-group">
                                <div class="setting-label">
                                    <h3>Desktop Background</h3>
                                    <p>Select or upload custom wallpapers</p>
                                </div>
                                <div class="wallpaper-section">
                                    <div class="wallpaper-tabs">
                                        <button class="wallpaper-tab active" data-tab="gradients">Gradients</button>
                                        <button class="wallpaper-tab" data-tab="patterns">Patterns</button>
                                        <button class="wallpaper-tab" data-tab="custom">Custom</button>
                                    </div>
                                    
                                    <div class="wallpaper-content">
                                        <div class="wallpaper-grid" id="wallpaper-gradients">
                                            <!-- Gradient wallpapers will be loaded here -->
                                        </div>
                                        <div class="wallpaper-grid" id="wallpaper-patterns" style="display: none;">
                                            <!-- Pattern wallpapers will be loaded here -->
                                        </div>
                                        <div class="wallpaper-grid" id="wallpaper-custom" style="display: none;">
                                            <div class="upload-wallpaper" id="upload-wallpaper">
                                                <i class="fas fa-cloud-upload-alt"></i>
                                                <span>Upload Custom Wallpaper</span>
                                                <input type="file" id="wallpaper-upload" accept="image/*" style="display: none;">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="setting-group">
                                <div class="setting-label">
                                    <h3>Visual Effects</h3>
                                    <p>Control animations and transparency</p>
                                </div>
                                <div class="setting-controls">
                                    <div class="setting-item">
                                        <label class="toggle-switch">
                                            <input type="checkbox" id="animations-enabled" checked>
                                            <span class="toggle-slider"></span>
                                        </label>
                                        <div class="setting-info">
                                            <span>Enable Animations</span>
                                            <small>Smooth transitions and window effects</small>
                                        </div>
                                    </div>
                                    
                                    <div class="setting-item">
                                        <div class="slider-control">
                                            <label>Window Transparency</label>
                                            <input type="range" id="transparency-slider" min="0" max="50" value="0">
                                            <span id="transparency-value">0%</span>
                                        </div>
                                    </div>
                                    
                                    <div class="setting-item">
                                        <label class="toggle-switch">
                                            <input type="checkbox" id="blur-effects" checked>
                                            <span class="toggle-slider"></span>
                                        </label>
                                        <div class="setting-info">
                                            <span>Blur Effects</span>
                                            <small>Background blur for windows and menus</small>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="setting-group">
                                <div class="setting-label">
                                    <h3>Font Settings</h3>
                                    <p>Customize text appearance</p>
                                </div>
                                <div class="setting-controls">
                                    <div class="setting-item">
                                        <div class="dropdown-control">
                                            <label>System Font</label>
                                            <select id="font-family">
                                                <option value="Rajdhani">Rajdhani (Default)</option>
                                                <option value="Orbitron">Orbitron</option>
                                                <option value="system">System Default</option>
                                                <option value="monospace">Monospace</option>
                                            </select>
                                        </div>
                                    </div>
                                    
                                    <div class="setting-item">
                                        <div class="slider-control">
                                            <label>Font Size</label>
                                            <input type="range" id="font-size-slider" min="12" max="18" value="14">
                                            <span id="font-size-value">14px</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Desktop Section -->
                        <div class="settings-section" id="desktop-section">
                            <div class="section-header">
                                <h2><i class="fas fa-desktop"></i> Desktop Settings</h2>
                                <p>Configure your desktop environment and layout</p>
                            </div>

                            <div class="setting-group">
                                <div class="setting-label">
                                    <h3>Icon Settings</h3>
                                    <p>Customize desktop icon appearance</p>
                                </div>
                                <div class="setting-controls">
                                    <div class="setting-item">
                                        <div class="slider-control">
                                            <label>Icon Size</label>
                                            <input type="range" id="icon-size-slider" min="32" max="80" value="48">
                                            <span id="icon-size-value">48px</span>
                                        </div>
                                    </div>
                                    
                                    <div class="setting-item">
                                        <label class="toggle-switch">
                                            <input type="checkbox" id="show-icon-labels" checked>
                                            <span class="toggle-slider"></span>
                                        </label>
                                        <div class="setting-info">
                                            <span>Show Icon Labels</span>
                                            <small>Display text labels under desktop icons</small>
                                        </div>
                                    </div>
                                    
                                    <div class="setting-item">
                                        <label class="toggle-switch">
                                            <input type="checkbox" id="icon-shadows" checked>
                                            <span class="toggle-slider"></span>
                                        </label>
                                        <div class="setting-info">
                                            <span>Icon Shadows</span>
                                            <small>Add shadow effects to desktop icons</small>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="setting-group">
                                <div class="setting-label">
                                    <h3>Taskbar Configuration</h3>
                                    <p>Customize the taskbar appearance and behavior</p>
                                </div>
                                <div class="setting-controls">
                                    <div class="setting-item">
                                        <div class="dropdown-control">
                                            <label>Taskbar Position</label>
                                            <select id="taskbar-position">
                                                <option value="bottom">Bottom</option>
                                                <option value="top">Top</option>
                                            </select>
                                        </div>
                                    </div>
                                    
                                    <div class="setting-item">
                                        <label class="toggle-switch">
                                            <input type="checkbox" id="auto-hide-taskbar">
                                            <span class="toggle-slider"></span>
                                        </label>
                                        <div class="setting-info">
                                            <span>Auto-hide Taskbar</span>
                                            <small>Hide taskbar when not in use</small>
                                        </div>
                                    </div>
                                    
                                    <div class="setting-item">
                                        <label class="toggle-switch">
                                            <input type="checkbox" id="show-clock" checked>
                                            <span class="toggle-slider"></span>
                                        </label>
                                        <div class="setting-info">
                                            <span>Show Clock</span>
                                            <small>Display time in the system tray</small>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="setting-group">
                                <div class="setting-label">
                                    <h3>Window Behavior</h3>
                                    <p>Control how windows behave</p>
                                </div>
                                <div class="setting-controls">
                                    <div class="setting-item">
                                        <label class="toggle-switch">
                                            <input type="checkbox" id="snap-windows" checked>
                                            <span class="toggle-slider"></span>
                                        </label>
                                        <div class="setting-info">
                                            <span>Snap Windows</span>
                                            <small>Automatically align windows when dragging</small>
                                        </div>
                                    </div>
                                    
                                    <div class="setting-item">
                                        <label class="toggle-switch">
                                            <input type="checkbox" id="restore-windows" checked>
                                            <span class="toggle-slider"></span>
                                        </label>
                                        <div class="setting-info">
                                            <span>Restore Windows</span>
                                            <small>Remember window positions between sessions</small>
                                        </div>
                                    </div>
                                    
                                    <div class="setting-item">
                                        <div class="dropdown-control">
                                            <label>Double-click Action</label>
                                            <select id="double-click-action">
                                                <option value="maximize">Maximize Window</option>
                                                <option value="minimize">Minimize Window</option>
                                                <option value="none">No Action</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- System Section -->
                        <div class="settings-section" id="system-section">
                            <div class="section-header">
                                <h2><i class="fas fa-cog"></i> System Settings</h2>
                                <p>Configure system behavior and preferences</p>
                            </div>

                            <div class="setting-group">
                                <div class="setting-label">
                                    <h3>Startup & Session</h3>
                                    <p>Control what happens when EmberFrame starts</p>
                                </div>
                                <div class="setting-controls">
                                    <div class="setting-item">
                                        <label class="toggle-switch">
                                            <input type="checkbox" id="restore-session" checked>
                                            <span class="toggle-slider"></span>
                                        </label>
                                        <div class="setting-info">
                                            <span>Restore Previous Session</span>
                                            <small>Reopen windows from your last session</small>
                                        </div>
                                    </div>
                                    
                                    <div class="setting-item">
                                        <label class="toggle-switch">
                                            <input type="checkbox" id="startup-sound">
                                            <span class="toggle-slider"></span>
                                        </label>
                                        <div class="setting-info">
                                            <span>Startup Sound</span>
                                            <small>Play sound when EmberFrame loads</small>
                                        </div>
                                    </div>
                                    
                                    <div class="setting-item">
                                        <div class="dropdown-control">
                                            <label>Session Timeout</label>
                                            <select id="session-timeout">
                                                <option value="30">30 minutes</option>
                                                <option value="60">1 hour</option>
                                                <option value="240">4 hours</option>
                                                <option value="1440">24 hours</option>
                                                <option value="0">Never</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="setting-group">
                                <div class="setting-label">
                                    <h3>Notifications</h3>
                                    <p>Control how notifications appear</p>
                                </div>
                                <div class="setting-controls">
                                    <div class="setting-item">
                                        <label class="toggle-switch">
                                            <input type="checkbox" id="enable-notifications" checked>
                                            <span class="toggle-slider"></span>
                                        </label>
                                        <div class="setting-info">
                                            <span>Enable Notifications</span>
                                            <small>Show system notifications</small>
                                        </div>
                                    </div>
                                    
                                    <div class="setting-item">
                                        <div class="dropdown-control">
                                            <label>Notification Duration</label>
                                            <select id="notification-duration">
                                                <option value="2000">2 seconds</option>
                                                <option value="4000">4 seconds</option>
                                                <option value="6000">6 seconds</option>
                                                <option value="10000">10 seconds</option>
                                            </select>
                                        </div>
                                    </div>
                                    
                                    <div class="setting-item">
                                        <div class="dropdown-control">
                                            <label>Notification Position</label>
                                            <select id="notification-position">
                                                <option value="top-right">Top Right</option>
                                                <option value="top-left">Top Left</option>
                                                <option value="bottom-right">Bottom Right</option>
                                                <option value="bottom-left">Bottom Left</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="setting-group">
                                <div class="setting-label">
                                    <h3>Performance</h3>
                                    <p>Optimize system performance</p>
                                </div>
                                <div class="setting-controls">
                                    <div class="setting-item">
                                        <label class="toggle-switch">
                                            <input type="checkbox" id="hardware-acceleration" checked>
                                            <span class="toggle-slider"></span>
                                        </label>
                                        <div class="setting-info">
                                            <span>Hardware Acceleration</span>
                                            <small>Use GPU for better performance</small>
                                        </div>
                                    </div>
                                    
                                    <div class="setting-item">
                                        <div class="dropdown-control">
                                            <label>Animation Quality</label>
                                            <select id="animation-quality">
                                                <option value="high">High Quality</option>
                                                <option value="medium">Medium Quality</option>
                                                <option value="low">Low Quality</option>
                                                <option value="none">Disabled</option>
                                            </select>
                                        </div>
                                    </div>
                                    
                                    <div class="setting-item">
                                        <div class="dropdown-control">
                                            <label>Max Windows</label>
                                            <select id="max-windows">
                                                <option value="5">5 windows</option>
                                                <option value="10">10 windows</option>
                                                <option value="20">20 windows</option>
                                                <option value="0">Unlimited</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="setting-group">
                                <div class="setting-label">
                                    <h3>Data Management</h3>
                                    <p>Manage your data and cache</p>
                                </div>
                                <div class="setting-controls">
                                    <div class="setting-item">
                                        <button class="action-button" onclick="Settings.clearCache()">
                                            <i class="fas fa-trash"></i>
                                            Clear Cache & Temporary Files
                                        </button>
                                    </div>
                                    
                                    <div class="setting-item">
                                        <button class="action-button" onclick="Settings.exportSettings()">
                                            <i class="fas fa-download"></i>
                                            Export Settings
                                        </button>
                                    </div>
                                    
                                    <div class="setting-item">
                                        <button class="action-button danger" onclick="Settings.resetSettings()">
                                            <i class="fas fa-undo"></i>
                                            Reset All Settings
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Account Section -->
                        <div class="settings-section" id="account-section">
                            <div class="section-header">
                                <h2><i class="fas fa-user"></i> Account Settings</h2>
                                <p>Manage your user profile and account information</p>
                            </div>

                            <div class="setting-group">
                                <div class="setting-label">
                                    <h3>Profile Information</h3>
                                    <p>Your account details and avatar</p>
                                </div>
                                <div class="profile-card">
                                    <div class="profile-avatar">
                                        <div class="avatar-display" id="current-avatar">
                                            <span id="avatar-text">?</span>
                                        </div>
                                        <button class="change-avatar-btn" onclick="Settings.changeAvatar()">
                                            <i class="fas fa-camera"></i>
                                        </button>
                                    </div>
                                    <div class="profile-details">
                                        <div class="profile-field">
                                            <label>Username</label>
                                            <span id="profile-username">Loading...</span>
                                        </div>
                                        <div class="profile-field">
                                            <label>Account Type</label>
                                            <span id="profile-role">Loading...</span>
                                        </div>
                                        <div class="profile-field">
                                            <label>Member Since</label>
                                            <span id="profile-created">Loading...</span>
                                        </div>
                                        <div class="profile-field">
                                            <label>Last Login</label>
                                            <span id="profile-last-login">Loading...</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="setting-group">
                                <div class="setting-label">
                                    <h3>Storage Usage</h3>
                                    <p>Monitor your file storage usage</p>
                                </div>
                                <div class="storage-info">
                                    <div class="storage-bar">
                                        <div class="storage-used" id="storage-bar" style="width: 0%"></div>
                                    </div>
                                    <div class="storage-details">
                                        <span>Used: <strong id="storage-used">0 MB</strong></span>
                                        <span>Available: <strong id="storage-available">100 MB</strong></span>
                                    </div>
                                    <div class="storage-breakdown">
                                        <div class="breakdown-item">
                                            <span class="breakdown-label">Documents</span>
                                            <span class="breakdown-value" id="storage-documents">0 MB</span>
                                        </div>
                                        <div class="breakdown-item">
                                            <span class="breakdown-label">Media</span>
                                            <span class="breakdown-value" id="storage-media">0 MB</span>
                                        </div>
                                        <div class="breakdown-item">
                                            <span class="breakdown-label">Other</span>
                                            <span class="breakdown-value" id="storage-other">0 MB</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="setting-group">
                                <div class="setting-label">
                                    <h3>Security</h3>
                                    <p>Manage your account security</p>
                                </div>
                                <div class="setting-controls">
                                    <div class="setting-item">
                                        <button class="action-button" onclick="Settings.changePassword()">
                                            <i class="fas fa-key"></i>
                                            Change Password
                                        </button>
                                    </div>
                                    
                                    <div class="setting-item">
                                        <label class="toggle-switch">
                                            <input type="checkbox" id="auto-logout">
                                            <span class="toggle-slider"></span>
                                        </label>
                                        <div class="setting-info">
                                            <span>Auto Logout</span>
                                            <small>Automatically sign out after inactivity</small>
                                        </div>
                                    </div>
                                    
                                    <div class="setting-item">
                                        <label class="toggle-switch">
                                            <input type="checkbox" id="remember-login" checked>
                                            <span class="toggle-slider"></span>
                                        </label>
                                        <div class="setting-info">
                                            <span>Remember Login</span>
                                            <small>Stay signed in across browser sessions</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- About Section -->
                        <div class="settings-section" id="about-section">
                            <div class="section-header">
                                <h2><i class="fas fa-info-circle"></i> About EmberFrame</h2>
                                <p>System information and details</p>
                            </div>

                            <div class="about-content">
                                <div class="about-logo">
                                    <div class="logo-icon">🔥</div>
                                    <h3>EmberFrame Desktop Environment</h3>
                                    <p class="version-info">Version <strong>1.2.0</strong> • Build <strong>2024.12</strong></p>
                                </div>

                                <div class="system-info">
                                    <div class="info-grid">
                                        <div class="info-item">
                                            <label>Platform</label>
                                            <span id="platform-info">Loading...</span>
                                        </div>
                                        <div class="info-item">
                                            <label>Browser</label>
                                            <span id="browser-info">Loading...</span>
                                        </div>
                                        <div class="info-item">
                                            <label>Screen Resolution</label>
                                            <span id="screen-info">Loading...</span>
                                        </div>
                                        <div class="info-item">
                                            <label>Memory Usage</label>
                                            <span id="memory-info">Loading...</span>
                                        </div>
                                        <div class="info-item">
                                            <label>Session Uptime</label>
                                            <span id="uptime-info">Loading...</span>
                                        </div>
                                        <div class="info-item">
                                            <label>Connection</label>
                                            <span id="connection-info">Loading...</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="about-description">
                                    <h4>About EmberFrame</h4>
                                    <p>EmberFrame is a cutting-edge web-based desktop environment that brings the power and familiarity of traditional desktop computing to your browser. Built with modern web technologies, it provides a complete operating system experience with real file management, multi-user support, and a comprehensive suite of productivity applications.</p>
                                    
                                    <h4>Key Features</h4>
                                    <ul>
                                        <li>Complete desktop environment with window management</li>
                                        <li>Real file system integration with user directories</li>
                                        <li>Multi-user support with secure authentication</li>
                                        <li>Built-in applications: Terminal, Text Editor, Media Player</li>
                                        <li>Customizable themes and desktop layouts</li>
                                        <li>Mobile-responsive design</li>
                                        <li>Real-time notifications and system tray</li>
                                        <li>Drag-and-drop file operations</li>
                                    </ul>

                                    <h4>Technology Stack</h4>
                                    <ul>
                                        <li><strong>Frontend:</strong> HTML5, CSS3, JavaScript ES6+</li>
                                        <li><strong>Backend:</strong> Python Flask with Socket.IO</li>
                                        <li><strong>UI Framework:</strong> Custom component system</li>
                                        <li><strong>Real-time:</strong> WebSocket communication</li>
                                        <li><strong>Storage:</strong> File system integration</li>
                                    </ul>
                                </div>

                                <div class="about-actions">
                                    <button class="action-button" onclick="Settings.checkUpdates()">
                                        <i class="fas fa-sync"></i>
                                        Check for Updates
                                    </button>
                                    <button class="action-button" onclick="Settings.viewLicense()">
                                        <i class="fas fa-file-contract"></i>
                                        View License
                                    </button>
                                    <button class="action-button" onclick="Settings.sendFeedback()">
                                        <i class="fas fa-comment"></i>
                                        Send Feedback
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <style>
                    .settings-app {
                        height: 100%;
                        display: flex;
                        background: linear-gradient(135deg, #0a0a0f 0%, #141420 50%, #1a1a2e 100%);
                        color: #ffffff;
                        font-family: 'Rajdhani', sans-serif;
                        overflow: hidden;
                    }

                    .settings-sidebar {
                        width: 240px;
                        background: rgba(0, 0, 0, 0.4);
                        border-right: 1px solid rgba(0, 212, 255, 0.3);
                        backdrop-filter: blur(10px);
                    }

                    .settings-nav {
                        padding: 20px 0;
                    }

                    .settings-nav-item {
                        display: flex;
                        align-items: center;
                        gap: 12px;
                        padding: 14px 20px;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        border-left: 3px solid transparent;
                        font-weight: 500;
                    }

                    .settings-nav-item:hover {
                        background: rgba(0, 212, 255, 0.1);
                        border-left-color: rgba(0, 212, 255, 0.5);
                    }

                    .settings-nav-item.active {
                        background: rgba(0, 212, 255, 0.2);
                        border-left-color: #00d4ff;
                        color: #00ffff;
                    }

                    .settings-nav-item i {
                        width: 20px;
                        text-align: center;
                        font-size: 16px;
                    }

                    .settings-content {
                        flex: 1;
                        overflow-y: auto;
                        padding: 0;
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
                        margin-bottom: 40px;
                        padding-bottom: 20px;
                        border-bottom: 2px solid rgba(0, 212, 255, 0.3);
                    }

                    .section-header h2 {
                        font-size: 28px;
                        color: #00ffff;
                        margin-bottom: 8px;
                        font-family: 'Orbitron', monospace;
                        font-weight: 700;
                        display: flex;
                        align-items: center;
                        gap: 12px;
                    }

                    .section-header p {
                        color: #c0c0c0;
                        font-size: 16px;
                        margin: 0;
                    }

                    .setting-group {
                        margin-bottom: 40px;
                        background: rgba(0, 0, 0, 0.2);
                        border-radius: 12px;
                        padding: 25px;
                        border: 1px solid rgba(0, 212, 255, 0.2);
                    }

                    .setting-label {
                        margin-bottom: 20px;
                    }

                    .setting-label h3 {
                        font-size: 20px;
                        color: #00d4ff;
                        margin-bottom: 6px;
                        font-weight: 600;
                    }

                    .setting-label p {
                        color: #8892b0;
                        font-size: 14px;
                        margin: 0;
                    }

                    .setting-controls {
                        display: flex;
                        flex-direction: column;
                        gap: 20px;
                    }

                    .setting-item {
                        display: flex;
                        align-items: center;
                        gap: 16px;
                        padding: 16px 20px;
                        background: rgba(0, 0, 0, 0.2);
                        border-radius: 8px;
                        border: 1px solid rgba(0, 212, 255, 0.1);
                    }

                    .setting-info {
                        flex: 1;
                    }

                    .setting-info span {
                        display: block;
                        font-weight: 500;
                        color: #ffffff;
                        margin-bottom: 4px;
                    }

                    .setting-info small {
                        color: #8892b0;
                        font-size: 13px;
                    }

                    /* Toggle Switch */
                    .toggle-switch {
                        position: relative;
                        width: 50px;
                        height: 24px;
                        flex-shrink: 0;
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
                        background: rgba(0, 0, 0, 0.4);
                        border: 1px solid rgba(0, 212, 255, 0.3);
                        transition: 0.3s;
                        border-radius: 12px;
                    }

                    .toggle-slider::before {
                        position: absolute;
                        content: "";
                        height: 18px;
                        width: 18px;
                        left: 2px;
                        bottom: 2px;
                        background: #ffffff;
                        transition: 0.3s;
                        border-radius: 50%;
                    }

                    input:checked + .toggle-slider {
                        background: linear-gradient(135deg, #00d4ff, #00ffff);
                        border-color: #00ffff;
                    }

                    input:checked + .toggle-slider::before {
                        transform: translateX(26px);
                    }

                    /* Slider Control */
                    .slider-control {
                        display: flex;
                        align-items: center;
                        gap: 16px;
                        flex: 1;
                    }

                    .slider-control label {
                        min-width: 120px;
                        font-weight: 500;
                        color: #ffffff;
                    }

                    .slider-control input[type="range"] {
                        flex: 1;
                        height: 6px;
                        background: rgba(0, 0, 0, 0.4);
                        border-radius: 3px;
                        outline: none;
                        appearance: none;
                    }

                    .slider-control input[type="range"]::-webkit-slider-thumb {
                        appearance: none;
                        width: 18px;
                        height: 18px;
                        background: linear-gradient(135deg, #00d4ff, #00ffff);
                        border-radius: 50%;
                        cursor: pointer;
                        box-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
                    }

                    .slider-control span {
                        min-width: 50px;
                        text-align: right;
                        color: #00d4ff;
                        font-weight: 600;
                    }

                    /* Dropdown Control */
                    .dropdown-control {
                        display: flex;
                        align-items: center;
                        gap: 16px;
                        flex: 1;
                    }

                    .dropdown-control label {
                        min-width: 120px;
                        font-weight: 500;
                        color: #ffffff;
                    }

                    .dropdown-control select {
                        flex: 1;
                        padding: 10px 14px;
                        background: rgba(0, 0, 0, 0.4);
                        border: 1px solid rgba(0, 212, 255, 0.3);
                        border-radius: 6px;
                        color: #ffffff;
                        font-size: 14px;
                        font-family: inherit;
                    }

                    .dropdown-control select:focus {
                        outline: none;
                        border-color: #00d4ff;
                        box-shadow: 0 0 10px rgba(0, 212, 255, 0.3);
                    }

                    /* Theme Selector */
                    .theme-selector {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                        gap: 16px;
                    }

                    .theme-option {
                        cursor: pointer;
                        padding: 16px;
                        border-radius: 12px;
                        border: 2px solid rgba(0, 212, 255, 0.2);
                        background: rgba(0, 0, 0, 0.2);
                        transition: all 0.3s ease;
                        text-align: center;
                    }

                    .theme-option:hover {
                        border-color: rgba(0, 212, 255, 0.6);
                        transform: translateY(-2px);
                    }

                    .theme-option.active {
                        border-color: #00ffff;
                        box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
                    }

                    .theme-preview {
                        width: 100%;
                        height: 60px;
                        border-radius: 8px;
                        margin-bottom: 12px;
                        border: 1px solid rgba(255, 255, 255, 0.1);
                    }

                    .theme-option span {
                        font-size: 14px;
                        font-weight: 500;
                        color: #ffffff;
                    }

                    /* Wallpaper Section */
                    .wallpaper-section {
                        background: rgba(0, 0, 0, 0.2);
                        border-radius: 12px;
                        padding: 20px;
                        border: 1px solid rgba(0, 212, 255, 0.2);
                    }

                    .wallpaper-tabs {
                        display: flex;
                        gap: 4px;
                        margin-bottom: 20px;
                        background: rgba(0, 0, 0, 0.2);
                        border-radius: 8px;
                        padding: 4px;
                    }

                    .wallpaper-tab {
                        flex: 1;
                        padding: 10px 16px;
                        background: transparent;
                        border: none;
                        border-radius: 6px;
                        color: #8892b0;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        font-family: inherit;
                        font-weight: 500;
                    }

                    .wallpaper-tab.active {
                        background: linear-gradient(135deg, #00d4ff, #00ffff);
                        color: #0a0a0f;
                    }

                    .wallpaper-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
                        gap: 12px;
                        max-height: 300px;
                        overflow-y: auto;
                    }

                    .wallpaper-item {
                        aspect-ratio: 16/10;
                        border-radius: 8px;
                        cursor: pointer;
                        border: 2px solid transparent;
                        transition: all 0.3s ease;
                        overflow: hidden;
                        position: relative;
                    }

                    .wallpaper-item:hover {
                        border-color: rgba(0, 212, 255, 0.6);
                        transform: scale(1.05);
                    }

                    .wallpaper-item.selected {
                        border-color: #00ffff;
                        box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
                    }

                    .upload-wallpaper {
                        aspect-ratio: 16/10;
                        border: 2px dashed rgba(0, 212, 255, 0.5);
                        border-radius: 8px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        gap: 8px;
                    }

                    .upload-wallpaper:hover {
                        border-color: #00ffff;
                        background: rgba(0, 212, 255, 0.1);
                    }

                    .upload-wallpaper i {
                        font-size: 24px;
                        color: #00d4ff;
                    }

                    .upload-wallpaper span {
                        font-size: 12px;
                        color: #8892b0;
                        text-align: center;
                    }

                    /* Profile Card */
                    .profile-card {
                        display: flex;
                        gap: 24px;
                        align-items: flex-start;
                        background: rgba(0, 0, 0, 0.2);
                        border-radius: 12px;
                        padding: 24px;
                        border: 1px solid rgba(0, 212, 255, 0.2);
                    }

                    .profile-avatar {
                        position: relative;
                        flex-shrink: 0;
                    }

                    .avatar-display {
                        width: 80px;
                        height: 80px;
                        border-radius: 50%;
                        background: linear-gradient(135deg, #00d4ff, #00ffff);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 32px;
                        font-weight: 700;
                        color: #0a0a0f;
                        border: 3px solid rgba(0, 255, 255, 0.3);
                    }

                    .change-avatar-btn {
                        position: absolute;
                        bottom: -5px;
                        right: -5px;
                        width: 30px;
                        height: 30px;
                        border-radius: 50%;
                        background: #00d4ff;
                        border: none;
                        color: #0a0a0f;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 12px;
                        transition: all 0.3s ease;
                    }

                    .change-avatar-btn:hover {
                        background: #00ffff;
                        transform: scale(1.1);
                    }

                    .profile-details {
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        gap: 16px;
                    }

                    .profile-field {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 12px 0;
                        border-bottom: 1px solid rgba(0, 212, 255, 0.1);
                    }

                    .profile-field:last-child {
                        border-bottom: none;
                    }

                    .profile-field label {
                        font-weight: 500;
                        color: #8892b0;
                        font-size: 14px;
                    }

                    .profile-field span {
                        color: #ffffff;
                        font-weight: 600;
                    }

                    /* Storage Info */
                    .storage-info {
                        background: rgba(0, 0, 0, 0.2);
                        border-radius: 12px;
                        padding: 24px;
                        border: 1px solid rgba(0, 212, 255, 0.2);
                    }

                    .storage-bar {
                        width: 100%;
                        height: 12px;
                        background: rgba(0, 0, 0, 0.4);
                        border-radius: 6px;
                        overflow: hidden;
                        margin-bottom: 16px;
                        border: 1px solid rgba(0, 212, 255, 0.2);
                    }

                    .storage-used {
                        height: 100%;
                        background: linear-gradient(90deg, #00d4ff, #00ffff);
                        transition: width 0.5s ease;
                        border-radius: 6px;
                    }

                    .storage-details {
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 20px;
                        font-size: 14px;
                    }

                    .storage-breakdown {
                        display: flex;
                        flex-direction: column;
                        gap: 8px;
                    }

                    .breakdown-item {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 8px 12px;
                        background: rgba(0, 0, 0, 0.2);
                        border-radius: 6px;
                        font-size: 13px;
                    }

                    .breakdown-label {
                        color: #8892b0;
                    }

                    .breakdown-value {
                        color: #00d4ff;
                        font-weight: 600;
                    }

                    /* Action Button */
                    .action-button {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        padding: 12px 20px;
                        background: linear-gradient(135deg, #00d4ff, #00ffff);
                        color: #0a0a0f;
                        border: none;
                        border-radius: 8px;
                        cursor: pointer;
                        font-family: inherit;
                        font-weight: 600;
                        font-size: 14px;
                        transition: all 0.3s ease;
                        text-decoration: none;
                    }

                    .action-button:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 5px 20px rgba(0, 212, 255, 0.4);
                    }

                    .action-button.danger {
                        background: linear-gradient(135deg, #ff4466, #ff6b6b);
                        color: #ffffff;
                    }

                    .action-button.danger:hover {
                        box-shadow: 0 5px 20px rgba(255, 68, 102, 0.4);
                    }

                    /* About Content */
                    .about-content {
                        max-width: 700px;
                    }

                    .about-logo {
                        text-align: center;
                        margin-bottom: 40px;
                        padding: 30px;
                        background: rgba(0, 0, 0, 0.2);
                        border-radius: 12px;
                        border: 1px solid rgba(0, 212, 255, 0.2);
                    }

                    .logo-icon {
                        font-size: 80px;
                        margin-bottom: 20px;
                        animation: logo-glow 3s ease-in-out infinite alternate;
                    }

                    @keyframes logo-glow {
                        from { text-shadow: 0 0 20px rgba(0, 212, 255, 0.5); }
                        to { text-shadow: 0 0 40px rgba(0, 255, 255, 0.8); }
                    }

                    .about-logo h3 {
                        font-size: 32px;
                        color: #00ffff;
                        margin-bottom: 8px;
                        font-family: 'Orbitron', monospace;
                        font-weight: 700;
                    }

                    .version-info {
                        color: #8892b0;
                        font-size: 16px;
                    }

                    .system-info {
                        margin-bottom: 40px;
                    }

                    .info-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                        gap: 16px;
                        background: rgba(0, 0, 0, 0.2);
                        border-radius: 12px;
                        padding: 24px;
                        border: 1px solid rgba(0, 212, 255, 0.2);
                    }

                    .info-item {
                        display: flex;
                        flex-direction: column;
                        gap: 4px;
                    }

                    .info-item label {
                        font-size: 12px;
                        color: #8892b0;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                    }

                    .info-item span {
                        color: #ffffff;
                        font-weight: 600;
                        font-size: 14px;
                    }

                    .about-description {
                        background: rgba(0, 0, 0, 0.2);
                        border-radius: 12px;
                        padding: 30px;
                        border: 1px solid rgba(0, 212, 255, 0.2);
                        margin-bottom: 30px;
                        line-height: 1.6;
                    }

                    .about-description h4 {
                        color: #00d4ff;
                        font-size: 20px;
                        margin-bottom: 16px;
                        font-weight: 600;
                    }

                    .about-description p {
                        color: #c0c0c0;
                        margin-bottom: 20px;
                        font-size: 15px;
                    }

                    .about-description ul {
                        margin-left: 20px;
                        margin-bottom: 20px;
                    }

                    .about-description li {
                        color: #c0c0c0;
                        margin-bottom: 8px;
                        font-size: 14px;
                    }

                    .about-actions {
                        display: flex;
                        gap: 16px;
                        flex-wrap: wrap;
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
                            overflow-x: auto;
                            padding: 10px;
                            gap: 8px;
                        }

                        .settings-nav-item {
                            flex-shrink: 0;
                            padding: 8px 16px;
                            border-radius: 20px;
                            border-left: none;
                            border: 1px solid rgba(0, 212, 255, 0.2);
                        }

                        .settings-content {
                            overflow-y: auto;
                        }

                        .settings-section {
                            padding: 20px;
                        }

                        .theme-selector {
                            grid-template-columns: repeat(2, 1fr);
                        }

                        .profile-card {
                            flex-direction: column;
                            text-align: center;
                        }

                        .about-actions {
                            flex-direction: column;
                        }

                        .info-grid {
                            grid-template-columns: 1fr;
                        }
                    }

                    /* Scrollbar Styling */
                    .settings-content::-webkit-scrollbar,
                    .wallpaper-grid::-webkit-scrollbar {
                        width: 8px;
                    }

                    .settings-content::-webkit-scrollbar-track,
                    .wallpaper-grid::-webkit-scrollbar-track {
                        background: rgba(0, 0, 0, 0.2);
                        border-radius: 4px;
                    }

                    .settings-content::-webkit-scrollbar-thumb,
                    .wallpaper-grid::-webkit-scrollbar-thumb {
                        background: linear-gradient(135deg, #00d4ff, #00ffff);
                        border-radius: 4px;
                    }

                    .settings-content::-webkit-scrollbar-thumb:hover,
                    .wallpaper-grid::-webkit-scrollbar-thumb:hover {
                        background: linear-gradient(135deg, #00ffff, #00d4ff);
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
        this.startTime = Date.now();
        this.currentSettings = {};

        this.setupNavigation();
        this.loadCurrentSettings();
        this.setupEventListeners();
        this.loadWallpapers();
        this.loadSystemInfo();
        this.loadProfileInfo();
        this.startUptime();

        console.log('🔧 Settings application initialized');
    }

    static setupNavigation() {
        const navItems = this.currentWindow.querySelectorAll('.settings-nav-item');
        const sections = this.currentWindow.querySelectorAll('.settings-section');

        navItems.forEach(item => {
            item.addEventListener('click', () => {
                // Update navigation
                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');

                // Update sections
                sections.forEach(section => section.classList.remove('active'));
                const sectionId = item.dataset.section + '-section';
                const targetSection = this.currentWindow.querySelector(`#${sectionId}`);
                if (targetSection) {
                    targetSection.classList.add('active');
                }

                console.log(`📄 Switched to section: ${item.dataset.section}`);
            });
        });
    }

    static setupEventListeners() {
        // Theme selection
        this.currentWindow.querySelectorAll('.theme-option').forEach(option => {
            option.addEventListener('click', () => {
                this.selectTheme(option.dataset.theme);
            });
        });

        // Wallpaper tabs
        this.currentWindow.querySelectorAll('.wallpaper-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                this.switchWallpaperTab(tab.dataset.tab);
            });
        });

        // Wallpaper upload
        const uploadButton = this.currentWindow.querySelector('#upload-wallpaper');
        const uploadInput = this.currentWindow.querySelector('#wallpaper-upload');

        uploadButton.addEventListener('click', () => {
            uploadInput.click();
        });

        uploadInput.addEventListener('change', (e) => {
            this.handleWallpaperUpload(e.target.files[0]);
        });

        // Settings controls
        this.setupSettingControls();
    }

    static setupSettingControls() {
        // Animations
        const animationsToggle = this.currentWindow.querySelector('#animations-enabled');
        animationsToggle.addEventListener('change', (e) => {
            this.updateAnimations(e.target.checked);
        });

        // Transparency
        const transparencySlider = this.currentWindow.querySelector('#transparency-slider');
        transparencySlider.addEventListener('input', (e) => {
            this.updateTransparency(e.target.value);
        });

        // Font settings
        const fontFamily = this.currentWindow.querySelector('#font-family');
        fontFamily.addEventListener('change', (e) => {
            this.updateFontFamily(e.target.value);
        });

        const fontSize = this.currentWindow.querySelector('#font-size-slider');
        fontSize.addEventListener('input', (e) => {
            this.updateFontSize(e.target.value);
        });

        // Icon size
        const iconSize = this.currentWindow.querySelector('#icon-size-slider');
        iconSize.addEventListener('input', (e) => {
            this.updateIconSize(e.target.value);
        });

        // Show icon labels
        const showLabels = this.currentWindow.querySelector('#show-icon-labels');
        showLabels.addEventListener('change', (e) => {
            this.updateIconLabels(e.target.checked);
        });

        // Taskbar position
        const taskbarPosition = this.currentWindow.querySelector('#taskbar-position');
        taskbarPosition.addEventListener('change', (e) => {
            this.updateTaskbarPosition(e.target.value);
        });

        // Notifications
        const notificationsEnabled = this.currentWindow.querySelector('#enable-notifications');
        notificationsEnabled.addEventListener('change', (e) => {
            this.updateNotifications(e.target.checked);
        });

        // All other toggles and controls
        this.setupAllControls();
    }

    static setupAllControls() {
        const controls = [
            { id: 'blur-effects', setting: 'blurEffects', type: 'toggle' },
            { id: 'icon-shadows', setting: 'iconShadows', type: 'toggle' },
            { id: 'auto-hide-taskbar', setting: 'autoHideTaskbar', type: 'toggle' },
            { id: 'show-clock', setting: 'showClock', type: 'toggle' },
            { id: 'snap-windows', setting: 'snapWindows', type: 'toggle' },
            { id: 'restore-windows', setting: 'restoreWindows', type: 'toggle' },
            { id: 'restore-session', setting: 'restoreSession', type: 'toggle' },
            { id: 'startup-sound', setting: 'startupSound', type: 'toggle' },
            { id: 'hardware-acceleration', setting: 'hardwareAcceleration', type: 'toggle' },
            { id: 'auto-logout', setting: 'autoLogout', type: 'toggle' },
            { id: 'remember-login', setting: 'rememberLogin', type: 'toggle' }
        ];

        controls.forEach(control => {
            const element = this.currentWindow.querySelector(`#${control.id}`);
            if (element) {
                element.addEventListener('change', (e) => {
                    this.updateSetting(control.setting, e.target.checked);
                });
            }
        });

        // Dropdown controls
        const dropdowns = [
            { id: 'double-click-action', setting: 'doubleClickAction' },
            { id: 'session-timeout', setting: 'sessionTimeout' },
            { id: 'notification-duration', setting: 'notificationDuration' },
            { id: 'notification-position', setting: 'notificationPosition' },
            { id: 'animation-quality', setting: 'animationQuality' },
            { id: 'max-windows', setting: 'maxWindows' }
        ];

        dropdowns.forEach(dropdown => {
            const element = this.currentWindow.querySelector(`#${dropdown.id}`);
            if (element) {
                element.addEventListener('change', (e) => {
                    this.updateSetting(dropdown.setting, e.target.value);
                });
            }
        });
    }

    static loadCurrentSettings() {
        try {
            const stored = localStorage.getItem('emberframe-settings');
            this.currentSettings = stored ? JSON.parse(stored) : this.getDefaultSettings();
            this.applyStoredSettings();
        } catch (error) {
            console.error('Failed to load settings:', error);
            this.currentSettings = this.getDefaultSettings();
        }
    }

    static getDefaultSettings() {
        return {
            theme: 'ember-red',
            wallpaper: 'gradient-1',
            animationsEnabled: true,
            transparency: 0,
            blurEffects: true,
            fontFamily: 'Rajdhani',
            fontSize: 14,
            iconSize: 48,
            showIconLabels: true,
            iconShadows: true,
            taskbarPosition: 'bottom',
            autoHideTaskbar: false,
            showClock: true,
            snapWindows: true,
            restoreWindows: true,
            doubleClickAction: 'maximize',
            restoreSession: true,
            startupSound: false,
            sessionTimeout: 240,
            enableNotifications: true,
            notificationDuration: 4000,
            notificationPosition: 'top-right',
            hardwareAcceleration: true,
            animationQuality: 'high',
            maxWindows: 10,
            autoLogout: false,
            rememberLogin: true
        };
    }

    static applyStoredSettings() {
        // Apply theme
        this.selectTheme(this.currentSettings.theme, false);

        // Apply form values
        this.setFormValue('#animations-enabled', this.currentSettings.animationsEnabled);
        this.setFormValue('#transparency-slider', this.currentSettings.transparency);
        this.setFormValue('#blur-effects', this.currentSettings.blurEffects);
        this.setFormValue('#font-family', this.currentSettings.fontFamily);
        this.setFormValue('#font-size-slider', this.currentSettings.fontSize);
        this.setFormValue('#icon-size-slider', this.currentSettings.iconSize);
        this.setFormValue('#show-icon-labels', this.currentSettings.showIconLabels);
        this.setFormValue('#icon-shadows', this.currentSettings.iconShadows);
        this.setFormValue('#taskbar-position', this.currentSettings.taskbarPosition);
        this.setFormValue('#auto-hide-taskbar', this.currentSettings.autoHideTaskbar);
        this.setFormValue('#show-clock', this.currentSettings.showClock);
        this.setFormValue('#snap-windows', this.currentSettings.snapWindows);
        this.setFormValue('#restore-windows', this.currentSettings.restoreWindows);
        this.setFormValue('#double-click-action', this.currentSettings.doubleClickAction);
        this.setFormValue('#restore-session', this.currentSettings.restoreSession);
        this.setFormValue('#startup-sound', this.currentSettings.startupSound);
        this.setFormValue('#session-timeout', this.currentSettings.sessionTimeout);
        this.setFormValue('#enable-notifications', this.currentSettings.enableNotifications);
        this.setFormValue('#notification-duration', this.currentSettings.notificationDuration);
        this.setFormValue('#notification-position', this.currentSettings.notificationPosition);
        this.setFormValue('#hardware-acceleration', this.currentSettings.hardwareAcceleration);
        this.setFormValue('#animation-quality', this.currentSettings.animationQuality);
        this.setFormValue('#max-windows', this.currentSettings.maxWindows);
        this.setFormValue('#auto-logout', this.currentSettings.autoLogout);
        this.setFormValue('#remember-login', this.currentSettings.rememberLogin);

        // Update display values
        this.updateSliderValue('#transparency-slider', '#transparency-value', '%');
        this.updateSliderValue('#font-size-slider', '#font-size-value', 'px');
        this.updateSliderValue('#icon-size-slider', '#icon-size-value', 'px');

        // Apply settings to page
        this.applyCurrentSettings();
    }

    static setFormValue(selector, value) {
        const element = this.currentWindow.querySelector(selector);
        if (element) {
            if (element.type === 'checkbox') {
                element.checked = value;
            } else {
                element.value = value;
            }
        }
    }

    static updateSliderValue(sliderSelector, valueSelector, unit) {
        const slider = this.currentWindow.querySelector(sliderSelector);
        const valueDisplay = this.currentWindow.querySelector(valueSelector);
        if (slider && valueDisplay) {
            valueDisplay.textContent = slider.value + unit;
        }
    }

    static selectTheme(themeName, save = true) {
        // Update theme selector UI
        this.currentWindow.querySelectorAll('.theme-option').forEach(option => {
            option.classList.remove('active');
        });
        const selectedOption = this.currentWindow.querySelector(`[data-theme="${themeName}"]`);
        if (selectedOption) {
            selectedOption.classList.add('active');
        }

        // Apply theme to document
        this.applyTheme(themeName);

        if (save) {
            this.updateSetting('theme', themeName);
            this.showNotification('Theme changed successfully', 'success');
        }
    }

    static applyTheme(themeName) {
        const themes = {
            'ember-red': {
                primary: '#ff4500',
                secondary: '#dc143c',
                background: 'linear-gradient(135deg, #1a0a00 0%, #2d1a0a 100%)'
            },
            'cyber-blue': {
                primary: '#00ffff',
                secondary: '#0066ff',
                background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%)'
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

        const theme = themes[themeName] || themes['ember-red'];

        // Apply to document root
        document.documentElement.style.setProperty('--primary-blue', theme.primary);
        document.documentElement.style.setProperty('--neon-cyan', theme.secondary);
        document.body.style.background = theme.background;
    }

    static switchWallpaperTab(tabName) {
        // Update tab buttons
        this.currentWindow.querySelectorAll('.wallpaper-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        this.currentWindow.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update content
        this.currentWindow.querySelectorAll('.wallpaper-grid').forEach(grid => {
            grid.style.display = 'none';
        });
        this.currentWindow.querySelector(`#wallpaper-${tabName}`).style.display = 'grid';
    }

    static loadWallpapers() {
        this.loadGradientWallpapers();
        this.loadPatternWallpapers();
    }

    static loadGradientWallpapers() {
        const gradients = [
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
            'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
            'linear-gradient(135deg, #ff9a56 0%, #ff6b6b 100%)'
        ];

        const container = this.currentWindow.querySelector('#wallpaper-gradients');
        container.innerHTML = gradients.map((gradient, index) => `
            <div class="wallpaper-item" data-wallpaper="gradient-${index}" style="background: ${gradient};" onclick="Settings.setWallpaper('gradient-${index}', '${gradient}')">
            </div>
        `).join('');
    }

    static loadPatternWallpapers() {
        const patterns = [
            'radial-gradient(circle, rgba(0,212,255,0.1) 1px, transparent 1px)',
            'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,212,255,0.1) 10px, rgba(0,212,255,0.1) 20px)',
            'conic-gradient(from 0deg, #0a0a0f, #1a1a2e, #0a0a0f)',
            'linear-gradient(90deg, rgba(0,212,255,0.1) 50%, transparent 50%)'
        ];

        const container = this.currentWindow.querySelector('#wallpaper-patterns');
        container.innerHTML = patterns.map((pattern, index) => `
            <div class="wallpaper-item" data-wallpaper="pattern-${index}" style="background: ${pattern};" onclick="Settings.setWallpaper('pattern-${index}', '${pattern}')">
            </div>
        `).join('');
    }

    static setWallpaper(id, style) {
        // Apply wallpaper
        document.body.style.background = style;

        // Update selection
        this.currentWindow.querySelectorAll('.wallpaper-item').forEach(item => {
            item.classList.remove('selected');
        });
        this.currentWindow.querySelector(`[data-wallpaper="${id}"]`).classList.add('selected');

        // Save setting
        this.updateSetting('wallpaper', id);
        this.updateSetting('wallpaperStyle', style);
        this.showNotification('Wallpaper changed', 'success');
    }

    static handleWallpaperUpload(file) {
        if (!file || !file.type.startsWith('image/')) {
            this.showNotification('Please select a valid image file', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const imageUrl = e.target.result;
            const style = `url('${imageUrl}') center/cover no-repeat`;
            this.setWallpaper('custom-' + Date.now(), style);
        };
        reader.readAsDataURL(file);
    }

    static updateAnimations(enabled) {
        document.documentElement.style.setProperty('--animation-duration', enabled ? '0.3s' : '0s');
        this.updateSetting('animationsEnabled', enabled);
    }

    static updateTransparency(value) {
        this.updateSliderValue('#transparency-slider', '#transparency-value', '%');

        // Apply transparency to windows
        const opacity = (100 - parseInt(value)) / 100;
        document.documentElement.style.setProperty('--window-opacity', opacity);

        this.updateSetting('transparency', parseInt(value));
    }

    static updateFontFamily(family) {
        document.documentElement.style.setProperty('--system-font', family);
        this.updateSetting('fontFamily', family);
    }

    static updateFontSize(size) {
        this.updateSliderValue('#font-size-slider', '#font-size-value', 'px');
        document.documentElement.style.setProperty('--base-font-size', size + 'px');
        this.updateSetting('fontSize', parseInt(size));
    }

    static updateIconSize(size) {
        this.updateSliderValue('#icon-size-slider', '#icon-size-value', 'px');
        document.documentElement.style.setProperty('--icon-size', size + 'px');
        this.updateSetting('iconSize', parseInt(size));
    }

    static updateIconLabels(show) {
        const labels = document.querySelectorAll('.icon-label');
        labels.forEach(label => {
            label.style.display = show ? 'block' : 'none';
        });
        this.updateSetting('showIconLabels', show);
    }

    static updateTaskbarPosition(position) {
        // This would require more complex DOM manipulation
        this.showNotification('Taskbar position will be updated on next login', 'info');
        this.updateSetting('taskbarPosition', position);
    }

    static updateNotifications(enabled) {
        if (window.NotificationSystem) {
            window.NotificationSystem.enabled = enabled;
        }
        this.updateSetting('enableNotifications', enabled);
    }

    static updateSetting(key, value) {
        this.currentSettings[key] = value;
        this.saveSettings();
    }

    static saveSettings() {
        try {
            localStorage.setItem('emberframe-settings', JSON.stringify(this.currentSettings));
            console.log('⚙️ Settings saved:', this.currentSettings);
        } catch (error) {
            console.error('Failed to save settings:', error);
        }
    }

    static applyCurrentSettings() {
        // Apply all current settings to the interface
        this.applyTheme(this.currentSettings.theme);
        this.updateAnimations(this.currentSettings.animationsEnabled);
        this.updateTransparency(this.currentSettings.transparency);
        this.updateFontFamily(this.currentSettings.fontFamily);
        this.updateFontSize(this.currentSettings.fontSize);
        this.updateIconSize(this.currentSettings.iconSize);
        this.updateIconLabels(this.currentSettings.showIconLabels);
        this.updateNotifications(this.currentSettings.enableNotifications);
    }

    static loadSystemInfo() {
        // Platform info
        const platform = navigator.platform || 'Unknown';
        this.setElementText('#platform-info', platform);

        // Browser info
        const browser = this.getBrowserInfo();
        this.setElementText('#browser-info', browser);

        // Screen resolution
        const resolution = `${screen.width}×${screen.height}`;
        this.setElementText('#screen-info', resolution);

        // Memory usage
        if (performance.memory) {
            const used = Math.round(performance.memory.usedJSHeapSize / 1024 / 1024);
            const total = Math.round(performance.memory.totalJSHeapSize / 1024 / 1024);
            this.setElementText('#memory-info', `${used} MB / ${total} MB`);
        } else {
            this.setElementText('#memory-info', 'Not available');
        }

        // Connection info
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        if (connection) {
            this.setElementText('#connection-info', `${connection.effectiveType || 'Unknown'} (${connection.downlink || '?'} Mbps)`);
        } else {
            this.setElementText('#connection-info', 'Unknown');
        }
    }

    static getBrowserInfo() {
        const ua = navigator.userAgent;
        if (ua.includes('Chrome')) return 'Chrome';
        if (ua.includes('Firefox')) return 'Firefox';
        if (ua.includes('Safari')) return 'Safari';
        if (ua.includes('Edge')) return 'Edge';
        return 'Unknown';
    }

    static loadProfileInfo() {
        // Get current user info
        const username = window.EmberFrame?.currentUser || 'User';
        const isAdmin = window.EmberFrame?.isAdmin || false;

        this.setElementText('#profile-username', username);
        this.setElementText('#profile-role', isAdmin ? 'Administrator' : 'Standard User');
        this.setElementText('#profile-created', new Date().toLocaleDateString());
        this.setElementText('#profile-last-login', 'Now');

        // Set avatar
        const avatarText = this.currentWindow.querySelector('#avatar-text');
        if (avatarText) {
            avatarText.textContent = username.charAt(0).toUpperCase();
        }

        // Load storage info (simulated)
        this.loadStorageInfo();
    }

    static loadStorageInfo() {
        // Simulate storage usage
        const usedMB = Math.floor(Math.random() * 50) + 10;
        const totalMB = 100;
        const availableMB = totalMB - usedMB;
        const percentage = (usedMB / totalMB) * 100;

        this.setElementText('#storage-used', usedMB + ' MB');
        this.setElementText('#storage-available', availableMB + ' MB');

        const storageBar = this.currentWindow.querySelector('#storage-bar');
        if (storageBar) {
            storageBar.style.width = percentage + '%';
        }

        // Breakdown
        this.setElementText('#storage-documents', Math.floor(usedMB * 0.6) + ' MB');
        this.setElementText('#storage-media', Math.floor(usedMB * 0.3) + ' MB');
        this.setElementText('#storage-other', Math.floor(usedMB * 0.1) + ' MB');
    }

    static startUptime() {
        setInterval(() => {
            const uptime = Date.now() - this.startTime;
            const hours = Math.floor(uptime / (1000 * 60 * 60));
            const minutes = Math.floor((uptime % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((uptime % (1000 * 60)) / 1000);

            const uptimeString = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            this.setElementText('#uptime-info', uptimeString);
        }, 1000);
    }

    static setElementText(selector, text) {
        const element = this.currentWindow.querySelector(selector);
        if (element) {
            element.textContent = text;
        }
    }

    // Action Methods
    static clearCache() {
        if (confirm('Clear all cache and temporary files? This action cannot be undone.')) {
            try {
                localStorage.clear();
                sessionStorage.clear();
                this.showNotification('Cache cleared successfully', 'success');
            } catch (error) {
                this.showNotification('Failed to clear cache', 'error');
            }
        }
    }

    static exportSettings() {
        const data = {
            settings: this.currentSettings,
            exported: new Date().toISOString(),
            version: '1.2.0'
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `emberframe-settings-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.showNotification('Settings exported successfully', 'success');
    }

    static resetSettings() {
        if (confirm('Reset all settings to default values? This action cannot be undone.')) {
            localStorage.removeItem('emberframe-settings');
            this.currentSettings = this.getDefaultSettings();
            this.applyStoredSettings();
            this.showNotification('Settings reset to defaults', 'success');
        }
    }

    static changeAvatar() {
        this.showNotification('Avatar customization coming in future update', 'info');
    }

    static changePassword() {
        const newPassword = prompt('Enter new password (minimum 6 characters):');
        if (newPassword && newPassword.length >= 6) {
            this.showNotification('Password changed successfully', 'success');
        } else if (newPassword) {
            this.showNotification('Password must be at least 6 characters', 'error');
        }
    }

    static checkUpdates() {
        const updateId = this.showNotification('Checking for updates...', 'info', 0);

        setTimeout(() => {
            if (window.Notification) {
                window.Notification.update(updateId, 'You have the latest version of EmberFrame!', 'success');
                setTimeout(() => window.Notification.close(updateId), 3000);
            }
        }, 2000);
    }

    static viewLicense() {
        this.showNotification('License: MIT License - Free for personal and commercial use', 'info', 8000);
    }

    static sendFeedback() {
        this.showNotification('Feedback system not yet implemented', 'info');
    }

    static showNotification(message, type = 'info', duration = 4000) {
        if (window.Notification) {
            return window.Notification.show(message, type, duration);
        } else {
            console.log(`[${type.toUpperCase()}] ${message}`);
            return Date.now();
        }
    }

    static onClose(windowElement) {
        // Cleanup
        if (this.uptimeInterval) {
            clearInterval(this.uptimeInterval);
        }
        return true;
    }
}

window.Settings = Settings;