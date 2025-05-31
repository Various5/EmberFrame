/**
 * APP_METADATA
 * @name Settings
 * @icon fas fa-cog
 * @description Advanced system settings and customization
 * @category System
 * @version 2.0.0
 * @author EmberFrame Team
 * @enabled true
 */

// EmberFrame Settings App v2.0 - Advanced Customization with Dynamic Effects
class Settings {
    static createWindow() {
        return {
            title: 'EmberFrame Settings v2.0',
            width: '1200px',
            height: '800px',
            autoSize: false,
            content: `
                <div class="settings-container">
                    <!-- Dynamic Background Canvas -->
                    <canvas id="settings-canvas" class="settings-canvas"></canvas>
                    
                    <!-- Settings Header -->
                    <div class="settings-header">
                        <div class="header-content">
                            <div class="settings-logo">
                                <div class="logo-icon">⚙️</div>
                                <div class="logo-text">
                                    <h1>EmberFrame Settings</h1>
                                    <p>Customize your experience with advanced options</p>
                                </div>
                            </div>
                            <div class="header-stats">
                                <div class="stat-item">
                                    <div class="stat-icon">🎨</div>
                                    <div class="stat-text">
                                        <div class="stat-number" id="active-theme">Cyber Blue</div>
                                        <div class="stat-label">Active Theme</div>
                                    </div>
                                </div>
                                <div class="stat-item">
                                    <div class="stat-icon">⚡</div>
                                    <div class="stat-text">
                                        <div class="stat-number" id="performance-score">100%</div>
                                        <div class="stat-label">Performance</div>
                                    </div>
                                </div>
                                <div class="stat-item">
                                    <div class="stat-icon">💾</div>
                                    <div class="stat-text">
                                        <div class="stat-number" id="storage-used">45 MB</div>
                                        <div class="stat-label">Storage Used</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Settings Navigation -->
                    <div class="settings-nav">
                        <div class="nav-search">
                            <input type="text" id="settings-search" placeholder="🔍 Search settings..." />
                            <div class="search-results" id="search-results"></div>
                        </div>
                        <div class="nav-tabs">
                            <button class="nav-tab active" data-tab="appearance" title="Appearance & Themes">
                                <i class="fas fa-palette"></i>
                                <span>Appearance</span>
                                <div class="tab-indicator"></div>
                            </button>
                            <button class="nav-tab" data-tab="performance" title="Performance & Graphics">
                                <i class="fas fa-tachometer-alt"></i>
                                <span>Performance</span>
                                <div class="tab-indicator"></div>
                            </button>
                            <button class="nav-tab" data-tab="desktop" title="Desktop & Layout">
                                <i class="fas fa-desktop"></i>
                                <span>Desktop</span>
                                <div class="tab-indicator"></div>
                            </button>
                            <button class="nav-tab" data-tab="system" title="System Preferences">
                                <i class="fas fa-cogs"></i>
                                <span>System</span>
                                <div class="tab-indicator"></div>
                            </button>
                            <button class="nav-tab" data-tab="privacy" title="Privacy & Security">
                                <i class="fas fa-shield-alt"></i>
                                <span>Privacy</span>
                                <div class="tab-indicator"></div>
                            </button>
                            <button class="nav-tab" data-tab="advanced" title="Advanced Options">
                                <i class="fas fa-code"></i>
                                <span>Advanced</span>
                                <div class="tab-indicator"></div>
                            </button>
                        </div>
                    </div>

                    <!-- Settings Content -->
                    <div class="settings-content" id="settings-content">
                        
                        <!-- Appearance Tab -->
                        <div class="settings-tab-content active" id="appearance-tab">
                            <div class="settings-section">
                                <div class="section-header">
                                    <h3>🎨 Theme & Color Schemes</h3>
                                    <p>Choose your perfect visual style with live preview</p>
                                </div>
                                
                                <div class="theme-gallery">
                                    <div class="theme-card active" data-theme="cyber-blue">
                                        <div class="theme-preview cyber-blue-preview"></div>
                                        <div class="theme-info">
                                            <h4>Cyber Blue</h4>
                                            <p>Electric blue cyberpunk vibes</p>
                                        </div>
                                        <div class="theme-status">✓</div>
                                    </div>
                                    
                                    <div class="theme-card" data-theme="ember-red">
                                        <div class="theme-preview ember-red-preview"></div>
                                        <div class="theme-info">
                                            <h4>Ember Red</h4>
                                            <p>Fiery red passionate energy</p>
                                        </div>
                                        <div class="theme-status"></div>
                                    </div>
                                    
                                    <div class="theme-card" data-theme="matrix-green">
                                        <div class="theme-preview matrix-green-preview"></div>
                                        <div class="theme-info">
                                            <h4>Matrix Green</h4>
                                            <p>Classic hacker terminal style</p>
                                        </div>
                                        <div class="theme-status"></div>
                                    </div>
                                    
                                    <div class="theme-card" data-theme="neon-purple">
                                        <div class="theme-preview neon-purple-preview"></div>
                                        <div class="theme-info">
                                            <h4>Neon Purple</h4>
                                            <p>Vibrant purple synthwave</p>
                                        </div>
                                        <div class="theme-status"></div>
                                    </div>
                                    
                                    <div class="theme-card" data-theme="ice-blue">
                                        <div class="theme-preview ice-blue-preview"></div>
                                        <div class="theme-info">
                                            <h4>Ice Blue</h4>
                                            <p>Cool crystalline elegance</p>
                                        </div>
                                        <div class="theme-status"></div>
                                    </div>
                                    
                                    <div class="theme-card" data-theme="sunset-orange">
                                        <div class="theme-preview sunset-orange-preview"></div>
                                        <div class="theme-info">
                                            <h4>Sunset Orange</h4>
                                            <p>Warm sunset gradients</p>
                                        </div>
                                        <div class="theme-status"></div>
                                    </div>
                                </div>
                            </div>

                            <div class="settings-section">
                                <div class="section-header">
                                    <h3>🖼️ Dynamic Wallpapers & Backgrounds</h3>
                                    <p>Customize your desktop with interactive backgrounds</p>
                                </div>
                                
                                <div class="wallpaper-options">
                                    <div class="wallpaper-category">
                                        <h4>Background Type</h4>
                                        <div class="option-buttons">
                                            <button class="option-btn active" data-bg-type="gradient">
                                                <i class="fas fa-paint-brush"></i>
                                                <span>Gradient</span>
                                            </button>
                                            <button class="option-btn" data-bg-type="particles">
                                                <i class="fas fa-star"></i>
                                                <span>Particles</span>
                                            </button>
                                            <button class="option-btn" data-bg-type="image">
                                                <i class="fas fa-image"></i>
                                                <span>Image</span>
                                            </button>
                                            <button class="option-btn" data-bg-type="video">
                                                <i class="fas fa-video"></i>
                                                <span>Video</span>
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div class="wallpaper-controls">
                                        <div class="control-group" id="gradient-controls">
                                            <label class="control-label">Gradient Style</label>
                                            <select id="gradient-style" class="styled-select">
                                                <option value="linear">Linear Gradient</option>
                                                <option value="radial">Radial Gradient</option>
                                                <option value="conic">Conic Gradient</option>
                                                <option value="animated">Animated Gradient</option>
                                            </select>
                                            
                                            <label class="control-label">Primary Color</label>
                                            <input type="color" id="gradient-color1" value="#667eea" class="color-picker">
                                            
                                            <label class="control-label">Secondary Color</label>
                                            <input type="color" id="gradient-color2" value="#764ba2" class="color-picker">
                                            
                                            <label class="control-label">Gradient Angle</label>
                                            <input type="range" id="gradient-angle" min="0" max="360" value="135" class="styled-range">
                                            <span class="range-value">135°</span>
                                        </div>
                                        
                                        <div class="control-group" id="particle-controls" style="display: none;">
                                            <label class="control-label">Particle Type</label>
                                            <select id="particle-type" class="styled-select">
                                                <option value="geometric">Geometric Shapes</option>
                                                <option value="emoji">Emoji Particles</option>
                                                <option value="stars">Stars & Sparkles</option>
                                                <option value="bubbles">Floating Bubbles</option>
                                                <option value="code">Matrix Code</option>
                                            </select>
                                            
                                            <label class="control-label">Particle Count</label>
                                            <input type="range" id="particle-count" min="10" max="200" value="50" class="styled-range">
                                            <span class="range-value">50</span>
                                            
                                            <label class="control-label">Animation Speed</label>
                                            <input type="range" id="particle-speed" min="0.1" max="5" step="0.1" value="1" class="styled-range">
                                            <span class="range-value">1x</span>
                                            
                                            <div class="checkbox-group">
                                                <input type="checkbox" id="mouse-interaction" checked>
                                                <label for="mouse-interaction">Mouse Interaction</label>
                                            </div>
                                            
                                            <div class="checkbox-group">
                                                <input type="checkbox" id="particle-trails" checked>
                                                <label for="particle-trails">Particle Trails</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="wallpaper-preview">
                                    <div class="preview-container">
                                        <canvas id="wallpaper-preview-canvas"></canvas>
                                        <div class="preview-overlay">
                                            <div class="preview-desktop">
                                                <div class="preview-icon">📁</div>
                                                <div class="preview-icon">🖥️</div>
                                                <div class="preview-taskbar"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <button class="apply-wallpaper-btn">Apply Wallpaper</button>
                                </div>
                            </div>

                            <div class="settings-section">
                                <div class="section-header">
                                    <h3>🎭 Visual Effects & Animations</h3>
                                    <p>Control visual flair and animation quality</p>
                                </div>
                                
                                <div class="visual-effects-grid">
                                    <div class="effect-card">
                                        <div class="effect-header">
                                            <h4>Window Animations</h4>
                                            <div class="toggle-switch">
                                                <input type="checkbox" id="window-animations" checked>
                                                <label for="window-animations"></label>
                                            </div>
                                        </div>
                                        <p>Smooth window transitions and effects</p>
                                        <div class="effect-demo" id="window-demo"></div>
                                    </div>
                                    
                                    <div class="effect-card">
                                        <div class="effect-header">
                                            <h4>Blur Effects</h4>
                                            <div class="toggle-switch">
                                                <input type="checkbox" id="blur-effects" checked>
                                                <label for="blur-effects"></label>
                                            </div>
                                        </div>
                                        <p>Backdrop blur for transparent elements</p>
                                        <div class="effect-demo blur-demo"></div>
                                    </div>
                                    
                                    <div class="effect-card">
                                        <div class="effect-header">
                                            <h4>Shadow Effects</h4>
                                            <div class="toggle-switch">
                                                <input type="checkbox" id="shadow-effects" checked>
                                                <label for="shadow-effects"></label>
                                            </div>
                                        </div>
                                        <p>Drop shadows and glow effects</p>
                                        <div class="effect-demo shadow-demo"></div>
                                    </div>
                                    
                                    <div class="effect-card">
                                        <div class="effect-header">
                                            <h4>Transparency</h4>
                                            <div class="toggle-switch">
                                                <input type="checkbox" id="transparency-effects" checked>
                                                <label for="transparency-effects"></label>
                                            </div>
                                        </div>
                                        <p>Window transparency levels</p>
                                        <div class="effect-demo transparency-demo"></div>
                                    </div>
                                </div>
                                
                                <div class="animation-quality">
                                    <label class="control-label">Animation Quality</label>
                                    <div class="quality-options">
                                        <button class="quality-btn" data-quality="low">
                                            <i class="fas fa-battery-quarter"></i>
                                            <span>Low</span>
                                            <small>Better performance</small>
                                        </button>
                                        <button class="quality-btn" data-quality="medium">
                                            <i class="fas fa-battery-half"></i>
                                            <span>Medium</span>
                                            <small>Balanced</small>
                                        </button>
                                        <button class="quality-btn active" data-quality="high">
                                            <i class="fas fa-battery-full"></i>
                                            <span>High</span>
                                            <small>Best quality</small>
                                        </button>
                                        <button class="quality-btn" data-quality="ultra">
                                            <i class="fas fa-bolt"></i>
                                            <span>Ultra</span>
                                            <small>Maximum effects</small>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div class="settings-section">
                                <div class="section-header">
                                    <h3>🔤 Typography & Fonts</h3>
                                    <p>Customize text appearance and readability</p>
                                </div>
                                
                                <div class="typography-controls">
                                    <div class="font-selector">
                                        <label class="control-label">System Font</label>
                                        <select id="system-font" class="styled-select">
                                            <option value="'Rajdhani', sans-serif">Rajdhani (Default)</option>
                                            <option value="'Orbitron', monospace">Orbitron (Sci-Fi)</option>
                                            <option value="'Inter', sans-serif">Inter (Modern)</option>
                                            <option value="'Roboto', sans-serif">Roboto (Clean)</option>
                                            <option value="'Poppins', sans-serif">Poppins (Friendly)</option>
                                            <option value="'JetBrains Mono', monospace">JetBrains Mono</option>
                                            <option value="'Fira Code', monospace">Fira Code</option>
                                        </select>
                                    </div>
                                    
                                    <div class="font-size-control">
                                        <label class="control-label">Font Size</label>
                                        <input type="range" id="font-size" min="10" max="24" value="14" class="styled-range">
                                        <span class="range-value">14px</span>
                                    </div>
                                    
                                    <div class="font-weight-control">
                                        <label class="control-label">Font Weight</label>
                                        <select id="font-weight" class="styled-select">
                                            <option value="300">Light</option>
                                            <option value="400" selected>Normal</option>
                                            <option value="500">Medium</option>
                                            <option value="600">Semi-Bold</option>
                                            <option value="700">Bold</option>
                                        </select>
                                    </div>
                                    
                                    <div class="font-preview">
                                        <h4>Font Preview</h4>
                                        <div class="preview-text" id="font-preview">
                                            <h1>EmberFrame Desktop</h1>
                                            <h2>Advanced Web-Based Environment</h2>
                                            <p>The quick brown fox jumps over the lazy dog. 1234567890</p>
                                            <small>Typography makes everything beautiful</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Performance Tab -->
                        <div class="settings-tab-content" id="performance-tab">
                            <div class="settings-section">
                                <div class="section-header">
                                    <h3>⚡ Performance Optimization</h3>
                                    <p>Fine-tune system performance and resource usage</p>
                                </div>
                                
                                <div class="performance-dashboard">
                                    <div class="perf-card">
                                        <div class="perf-icon">🖥️</div>
                                        <div class="perf-info">
                                            <h4>CPU Usage</h4>
                                            <div class="perf-bar">
                                                <div class="perf-fill" style="width: 35%"></div>
                                            </div>
                                            <span>35% (Good)</span>
                                        </div>
                                    </div>
                                    
                                    <div class="perf-card">
                                        <div class="perf-icon">💾</div>
                                        <div class="perf-info">
                                            <h4>Memory Usage</h4>
                                            <div class="perf-bar">
                                                <div class="perf-fill" style="width: 60%"></div>
                                            </div>
                                            <span>156 MB (Normal)</span>
                                        </div>
                                    </div>
                                    
                                    <div class="perf-card">
                                        <div class="perf-icon">🎮</div>
                                        <div class="perf-info">
                                            <h4>GPU Usage</h4>
                                            <div class="perf-bar">
                                                <div class="perf-fill" style="width: 25%"></div>
                                            </div>
                                            <span>25% (Excellent)</span>
                                        </div>
                                    </div>
                                    
                                    <div class="perf-card">
                                        <div class="perf-icon">📊</div>
                                        <div class="perf-info">
                                            <h4>FPS</h4>
                                            <div class="perf-bar">
                                                <div class="perf-fill" style="width: 100%"></div>
                                            </div>
                                            <span>60 FPS (Perfect)</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="performance-settings">
                                    <div class="perf-setting">
                                        <div class="setting-info">
                                            <h4>Hardware Acceleration</h4>
                                            <p>Use GPU for rendering and animations</p>
                                        </div>
                                        <div class="toggle-switch">
                                            <input type="checkbox" id="hardware-acceleration" checked>
                                            <label for="hardware-acceleration"></label>
                                        </div>
                                    </div>
                                    
                                    <div class="perf-setting">
                                        <div class="setting-info">
                                            <h4>V-Sync</h4>
                                            <p>Synchronize with display refresh rate</p>
                                        </div>
                                        <div class="toggle-switch">
                                            <input type="checkbox" id="vsync" checked>
                                            <label for="vsync"></label>
                                        </div>
                                    </div>
                                    
                                    <div class="perf-setting">
                                        <div class="setting-info">
                                            <h4>Preload Applications</h4>
                                            <p>Cache commonly used apps for faster startup</p>
                                        </div>
                                        <div class="toggle-switch">
                                            <input type="checkbox" id="preload-apps" checked>
                                            <label for="preload-apps"></label>
                                        </div>
                                    </div>
                                    
                                    <div class="perf-setting">
                                        <div class="setting-info">
                                            <h4>Background Processing</h4>
                                            <p>Allow background tasks and updates</p>
                                        </div>
                                        <div class="toggle-switch">
                                            <input type="checkbox" id="background-processing" checked>
                                            <label for="background-processing"></label>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="performance-modes">
                                    <h4>Performance Mode</h4>
                                    <div class="mode-buttons">
                                        <button class="mode-btn" data-mode="power-saver">
                                            <i class="fas fa-leaf"></i>
                                            <span>Power Saver</span>
                                            <small>Maximum battery life</small>
                                        </button>
                                        <button class="mode-btn active" data-mode="balanced">
                                            <i class="fas fa-balance-scale"></i>
                                            <span>Balanced</span>
                                            <small>Optimal performance</small>
                                        </button>
                                        <button class="mode-btn" data-mode="performance">
                                            <i class="fas fa-rocket"></i>
                                            <span>Performance</span>
                                            <small>Maximum speed</small>
                                        </button>
                                        <button class="mode-btn" data-mode="gaming">
                                            <i class="fas fa-gamepad"></i>
                                            <span>Gaming</span>
                                            <small>Optimized for games</small>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div class="settings-section">
                                <div class="section-header">
                                    <h3>🧹 System Cleanup & Optimization</h3>
                                    <p>Keep your system running smoothly</p>
                                </div>
                                
                                <div class="cleanup-tools">
                                    <div class="cleanup-card">
                                        <div class="cleanup-icon">🗑️</div>
                                        <div class="cleanup-info">
                                            <h4>Temporary Files</h4>
                                            <p>Clear cache and temporary data</p>
                                            <span class="cleanup-size">23.4 MB</span>
                                        </div>
                                        <button class="cleanup-btn" data-cleanup="temp">Clean Now</button>
                                    </div>
                                    
                                    <div class="cleanup-card">
                                        <div class="cleanup-icon">📊</div>
                                        <div class="cleanup-info">
                                            <h4>Activity Logs</h4>
                                            <p>Remove old activity logs</p>
                                            <span class="cleanup-size">5.2 MB</span>
                                        </div>
                                        <button class="cleanup-btn" data-cleanup="logs">Clean Now</button>
                                    </div>
                                    
                                    <div class="cleanup-card">
                                        <div class="cleanup-icon">🖼️</div>
                                        <div class="cleanup-info">
                                            <h4>Thumbnail Cache</h4>
                                            <p>Clear generated thumbnails</p>
                                            <span class="cleanup-size">12.8 MB</span>
                                        </div>
                                        <button class="cleanup-btn" data-cleanup="thumbnails">Clean Now</button>
                                    </div>
                                    
                                    <div class="cleanup-card">
                                        <div class="cleanup-icon">⚡</div>
                                        <div class="cleanup-info">
                                            <h4>Memory Optimization</h4>
                                            <p>Free up system memory</p>
                                            <span class="cleanup-size">64 MB</span>
                                        </div>
                                        <button class="cleanup-btn" data-cleanup="memory">Optimize</button>
                                    </div>
                                </div>
                                
                                <div class="auto-cleanup">
                                    <div class="setting-info">
                                        <h4>Automatic Cleanup</h4>
                                        <p>Automatically clean temporary files and optimize system</p>
                                    </div>
                                    <select id="auto-cleanup-frequency" class="styled-select">
                                        <option value="never">Never</option>
                                        <option value="daily">Daily</option>
                                        <option value="weekly" selected>Weekly</option>
                                        <option value="monthly">Monthly</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <!-- Desktop Tab -->
                        <div class="settings-tab-content" id="desktop-tab">
                            <div class="settings-section">
                                <div class="section-header">
                                    <h3>🖥️ Desktop Layout & Icons</h3>
                                    <p>Customize your desktop workspace</p>
                                </div>
                                
                                <div class="desktop-layout">
                                    <div class="layout-option">
                                        <h4>Icon Arrangement</h4>
                                        <div class="icon-grid-options">
                                            <button class="grid-btn active" data-grid="auto">
                                                <div class="grid-preview auto-grid"></div>
                                                <span>Auto Arrange</span>
                                            </button>
                                            <button class="grid-btn" data-grid="grid">
                                                <div class="grid-preview grid-grid"></div>
                                                <span>Grid Layout</span>
                                            </button>
                                            <button class="grid-btn" data-grid="free">
                                                <div class="grid-preview free-grid"></div>
                                                <span>Free Position</span>
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div class="icon-settings">
                                        <div class="icon-size-control">
                                            <label class="control-label">Icon Size</label>
                                            <input type="range" id="icon-size" min="32" max="128" value="48" class="styled-range">
                                            <span class="range-value">48px</span>
                                        </div>
                                        
                                        <div class="icon-spacing-control">
                                            <label class="control-label">Icon Spacing</label>
                                            <input type="range" id="icon-spacing" min="5" max="50" value="15" class="styled-range">
                                            <span class="range-value">15px</span>
                                        </div>
                                        
                                        <div class="checkbox-group">
                                            <input type="checkbox" id="show-icon-labels" checked>
                                            <label for="show-icon-labels">Show Icon Labels</label>
                                        </div>
                                        
                                        <div class="checkbox-group">
                                            <input type="checkbox" id="icon-shadows" checked>
                                            <label for="icon-shadows">Icon Drop Shadows</label>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="taskbar-settings">
                                    <h4>Taskbar Configuration</h4>
                                    
                                    <div class="taskbar-position">
                                        <label class="control-label">Taskbar Position</label>
                                        <div class="position-options">
                                            <button class="pos-btn active" data-position="bottom">
                                                <i class="fas fa-window-maximize"></i>
                                                <span>Bottom</span>
                                            </button>
                                            <button class="pos-btn" data-position="top">
                                                <i class="fas fa-window-minimize"></i>
                                                <span>Top</span>
                                            </button>
                                            <button class="pos-btn" data-position="left">
                                                <i class="fas fa-align-left"></i>
                                                <span>Left</span>
                                            </button>
                                            <button class="pos-btn" data-position="right">
                                                <i class="fas fa-align-right"></i>
                                                <span>Right</span>
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div class="taskbar-options">
                                        <div class="checkbox-group">
                                            <input type="checkbox" id="auto-hide-taskbar">
                                            <label for="auto-hide-taskbar">Auto-hide Taskbar</label>
                                        </div>
                                        
                                        <div class="checkbox-group">
                                            <input type="checkbox" id="taskbar-transparency" checked>
                                            <label for="taskbar-transparency">Taskbar Transparency</label>
                                        </div>
                                        
                                        <div class="checkbox-group">
                                            <input type="checkbox" id="show-clock" checked>
                                            <label for="show-clock">Show Clock</label>
                                        </div>
                                        
                                        <div class="checkbox-group">
                                            <input type="checkbox" id="show-system-tray" checked>
                                            <label for="show-system-tray">Show System Tray</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="settings-section">
                                <div class="section-header">
                                    <h3>🔔 Notifications & Alerts</h3>
                                    <p>Control how and when you receive notifications</p>
                                </div>
                                
                                <div class="notification-settings">
                                    <div class="notification-position">
                                        <label class="control-label">Notification Position</label>
                                        <select id="notification-position" class="styled-select">
                                            <option value="top-right" selected>Top Right</option>
                                            <option value="top-left">Top Left</option>
                                            <option value="bottom-right">Bottom Right</option>
                                            <option value="bottom-left">Bottom Left</option>
                                            <option value="center">Center</option>
                                        </select>
                                    </div>
                                    
                                    <div class="notification-duration">
                                        <label class="control-label">Display Duration</label>
                                        <input type="range" id="notification-duration" min="1" max="10" value="4" class="styled-range">
                                        <span class="range-value">4 seconds</span>
                                    </div>
                                    
                                    <div class="notification-types">
                                        <h4>Notification Types</h4>
                                        
                                        <div class="notification-type">
                                            <div class="type-info">
                                                <i class="fas fa-info-circle"></i>
                                                <span>System Notifications</span>
                                            </div>
                                            <div class="toggle-switch">
                                                <input type="checkbox" id="system-notifications" checked>
                                                <label for="system-notifications"></label>
                                            </div>
                                        </div>
                                        
                                        <div class="notification-type">
                                            <div class="type-info">
                                                <i class="fas fa-download"></i>
                                                <span>File Operations</span>
                                            </div>
                                            <div class="toggle-switch">
                                                <input type="checkbox" id="file-notifications" checked>
                                                <label for="file-notifications"></label>
                                            </div>
                                        </div>
                                        
                                        <div class="notification-type">
                                            <div class="type-info">
                                                <i class="fas fa-exclamation-triangle"></i>
                                                <span>Error Messages</span>
                                            </div>
                                            <div class="toggle-switch">
                                                <input type="checkbox" id="error-notifications" checked>
                                                <label for="error-notifications"></label>
                                            </div>
                                        </div>
                                        
                                        <div class="notification-type">
                                            <div class="type-info">
                                                <i class="fas fa-bell"></i>
                                                <span>Application Updates</span>
                                            </div>
                                            <div class="toggle-switch">
                                                <input type="checkbox" id="update-notifications" checked>
                                                <label for="update-notifications"></label>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="notification-sounds">
                                        <h4>Sound Settings</h4>
                                        
                                        <div class="checkbox-group">
                                            <input type="checkbox" id="notification-sounds" checked>
                                            <label for="notification-sounds">Enable Notification Sounds</label>
                                        </div>
                                        
                                        <div class="sound-volume">
                                            <label class="control-label">Volume</label>
                                            <input type="range" id="notification-volume" min="0" max="100" value="50" class="styled-range">
                                            <span class="range-value">50%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- System Tab -->
                        <div class="settings-tab-content" id="system-tab">
                            <div class="settings-section">
                                <div class="section-header">
                                    <h3>⚙️ System Information</h3>
                                    <p>View detailed system information and statistics</p>
                                </div>
                                
                                <div class="system-info-grid">
                                    <div class="info-card">
                                        <div class="info-icon">🖥️</div>
                                        <div class="info-content">
                                            <h4>System</h4>
                                            <div class="info-items">
                                                <div class="info-item">
                                                    <span>Version:</span>
                                                    <span>EmberFrame v2.0</span>
                                                </div>
                                                <div class="info-item">
                                                    <span>Build:</span>
                                                    <span>2024.12.1</span>
                                                </div>
                                                <div class="info-item">
                                                    <span>Platform:</span>
                                                    <span id="user-platform">Web Browser</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="info-card">
                                        <div class="info-icon">🌐</div>
                                        <div class="info-content">
                                            <h4>Browser</h4>
                                            <div class="info-items">
                                                <div class="info-item">
                                                    <span>Name:</span>
                                                    <span id="browser-name">Chrome</span>
                                                </div>
                                                <div class="info-item">
                                                    <span>Version:</span>
                                                    <span id="browser-version">120.0</span>
                                                </div>
                                                <div class="info-item">
                                                    <span>Engine:</span>
                                                    <span id="browser-engine">Blink</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="info-card">
                                        <div class="info-icon">📊</div>
                                        <div class="info-content">
                                            <h4>Performance</h4>
                                            <div class="info-items">
                                                <div class="info-item">
                                                    <span>Memory:</span>
                                                    <span id="memory-info">4 GB</span>
                                                </div>
                                                <div class="info-item">
                                                    <span>Storage:</span>
                                                    <span id="storage-info">Available</span>
                                                </div>
                                                <div class="info-item">
                                                    <span>GPU:</span>
                                                    <span id="gpu-info">Hardware Accelerated</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="info-card">
                                        <div class="info-icon">📱</div>
                                        <div class="info-content">
                                            <h4>Display</h4>
                                            <div class="info-items">
                                                <div class="info-item">
                                                    <span>Resolution:</span>
                                                    <span id="screen-resolution">1920x1080</span>
                                                </div>
                                                <div class="info-item">
                                                    <span>Color Depth:</span>
                                                    <span id="color-depth">24-bit</span>
                                                </div>
                                                <div class="info-item">
                                                    <span>Pixel Ratio:</span>
                                                    <span id="pixel-ratio">1.0</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="settings-section">
                                <div class="section-header">
                                    <h3>🔧 System Preferences</h3>
                                    <p>Configure core system behavior and preferences</p>
                                </div>
                                
                                <div class="system-preferences">
                                    <div class="pref-group">
                                        <h4>Startup & Sessions</h4>
                                        
                                        <div class="pref-item">
                                            <div class="pref-info">
                                                <span>Restore Windows on Startup</span>
                                                <small>Restore open windows when logging in</small>
                                            </div>
                                            <div class="toggle-switch">
                                                <input type="checkbox" id="restore-windows" checked>
                                                <label for="restore-windows"></label>
                                            </div>
                                        </div>
                                        
                                        <div class="pref-item">
                                            <div class="pref-info">
                                                <span>Auto-save Preferences</span>
                                                <small>Automatically save settings changes</small>
                                            </div>
                                            <div class="toggle-switch">
                                                <input type="checkbox" id="auto-save-prefs" checked>
                                                <label for="auto-save-prefs"></label>
                                            </div>
                                        </div>
                                        
                                        <div class="pref-item">
                                            <div class="pref-info">
                                                <span>Remember Last Session</span>
                                                <small>Keep session active between visits</small>
                                            </div>
                                            <div class="toggle-switch">
                                                <input type="checkbox" id="remember-session" checked>
                                                <label for="remember-session"></label>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="pref-group">
                                        <h4>Language & Region</h4>
                                        
                                        <div class="pref-item">
                                            <div class="pref-info">
                                                <span>System Language</span>
                                                <small>Interface language and text direction</small>
                                            </div>
                                            <select id="system-language" class="styled-select">
                                                <option value="en" selected>English</option>
                                                <option value="es">Español</option>
                                                <option value="fr">Français</option>
                                                <option value="de">Deutsch</option>
                                                <option value="ja">日本語</option>
                                                <option value="zh">中文</option>
                                            </select>
                                        </div>
                                        
                                        <div class="pref-item">
                                            <div class="pref-info">
                                                <span>Time Format</span>
                                                <small>12-hour or 24-hour time display</small>
                                            </div>
                                            <select id="time-format" class="styled-select">
                                                <option value="12">12-hour (AM/PM)</option>
                                                <option value="24" selected>24-hour</option>
                                            </select>
                                        </div>
                                        
                                        <div class="pref-item">
                                            <div class="pref-info">
                                                <span>Date Format</span>
                                                <small>How dates are displayed</small>
                                            </div>
                                            <select id="date-format" class="styled-select">
                                                <option value="mm/dd/yyyy">MM/DD/YYYY</option>
                                                <option value="dd/mm/yyyy" selected>DD/MM/YYYY</option>
                                                <option value="yyyy-mm-dd">YYYY-MM-DD</option>
                                            </select>
                                        </div>
                                    </div>
                                    
                                    <div class="pref-group">
                                        <h4>File Management</h4>
                                        
                                        <div class="pref-item">
                                            <div class="pref-info">
                                                <span>Default View Mode</span>
                                                <small>File manager default display mode</small>
                                            </div>
                                            <select id="default-view-mode" class="styled-select">
                                                <option value="grid" selected>Grid View</option>
                                                <option value="list">List View</option>
                                                <option value="details">Details View</option>
                                            </select>
                                        </div>
                                        
                                        <div class="pref-item">
                                            <div class="pref-info">
                                                <span>Show Hidden Files</span>
                                                <small>Display hidden and system files</small>
                                            </div>
                                            <div class="toggle-switch">
                                                <input type="checkbox" id="show-hidden-files">
                                                <label for="show-hidden-files"></label>
                                            </div>
                                        </div>
                                        
                                        <div class="pref-item">
                                            <div class="pref-info">
                                                <span>Confirm File Deletions</span>
                                                <small>Ask for confirmation before deleting files</small>
                                            </div>
                                            <div class="toggle-switch">
                                                <input type="checkbox" id="confirm-deletions" checked>
                                                <label for="confirm-deletions"></label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Privacy Tab -->
                        <div class="settings-tab-content" id="privacy-tab">
                            <div class="settings-section">
                                <div class="section-header">
                                    <h3>🔒 Privacy & Security</h3>
                                    <p>Control your data privacy and security settings</p>
                                </div>
                                
                                <div class="privacy-settings">
                                    <div class="privacy-card">
                                        <div class="privacy-icon">🔐</div>
                                        <div class="privacy-content">
                                            <h4>Data Collection</h4>
                                            <p>Control what data is collected and how it's used</p>
                                            
                                            <div class="privacy-option">
                                                <div class="option-info">
                                                    <span>Usage Analytics</span>
                                                    <small>Help improve EmberFrame by sharing usage data</small>
                                                </div>
                                                <div class="toggle-switch">
                                                    <input type="checkbox" id="usage-analytics">
                                                    <label for="usage-analytics"></label>
                                                </div>
                                            </div>
                                            
                                            <div class="privacy-option">
                                                <div class="option-info">
                                                    <span>Error Reporting</span>
                                                    <small>Automatically report crashes and errors</small>
                                                </div>
                                                <div class="toggle-switch">
                                                    <input type="checkbox" id="error-reporting" checked>
                                                    <label for="error-reporting"></label>
                                                </div>
                                            </div>
                                            
                                            <div class="privacy-option">
                                                <div class="option-info">
                                                    <span>Performance Monitoring</span>
                                                    <small>Monitor system performance for optimization</small>
                                                </div>
                                                <div class="toggle-switch">
                                                    <input type="checkbox" id="performance-monitoring" checked>
                                                    <label for="performance-monitoring"></label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="privacy-card">
                                        <div class="privacy-icon">🕒</div>
                                        <div class="privacy-content">
                                            <h4>Activity History</h4>
                                            <p>Manage your activity logs and history</p>
                                            
                                            <div class="privacy-option">
                                                <div class="option-info">
                                                    <span>Save Activity History</span>
                                                    <small>Keep logs of your activities for convenience</small>
                                                </div>
                                                <div class="toggle-switch">
                                                    <input type="checkbox" id="save-activity" checked>
                                                    <label for="save-activity"></label>
                                                </div>
                                            </div>
                                            
                                            <div class="history-controls">
                                                <button class="privacy-btn" data-action="clear-history">
                                                    <i class="fas fa-trash"></i>
                                                    Clear All History
                                                </button>
                                                <button class="privacy-btn" data-action="export-data">
                                                    <i class="fas fa-download"></i>
                                                    Export My Data
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="privacy-card">
                                        <div class="privacy-icon">🛡️</div>
                                        <div class="privacy-content">
                                            <h4>Security Settings</h4>
                                            <p>Advanced security and access controls</p>
                                            
                                            <div class="privacy-option">
                                                <div class="option-info">
                                                    <span>Automatic Logout</span>
                                                    <small>Automatically logout after inactivity</small>
                                                </div>
                                                <select id="auto-logout" class="styled-select">
                                                    <option value="never">Never</option>
                                                    <option value="15">15 minutes</option>
                                                    <option value="30">30 minutes</option>
                                                    <option value="60" selected>1 hour</option>
                                                    <option value="240">4 hours</option>
                                                </select>
                                            </div>
                                            
                                            <div class="privacy-option">
                                                <div class="option-info">
                                                    <span>Secure Session</span>
                                                    <small>Enhanced security for sensitive operations</small>
                                                </div>
                                                <div class="toggle-switch">
                                                    <input type="checkbox" id="secure-session" checked>
                                                    <label for="secure-session"></label>
                                                </div>
                                            </div>
                                            
                                            <div class="privacy-option">
                                                <div class="option-info">
                                                    <span>Encryption</span>
                                                    <small>Encrypt sensitive data and communications</small>
                                                </div>
                                                <div class="toggle-switch">
                                                    <input type="checkbox" id="data-encryption" checked>
                                                    <label for="data-encryption"></label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Advanced Tab -->
                        <div class="settings-tab-content" id="advanced-tab">
                            <div class="settings-section">
                                <div class="section-header">
                                    <h3>⚗️ Advanced Configuration</h3>
                                    <p>Expert settings for advanced users</p>
                                </div>
                                
                                <div class="advanced-warning">
                                    <div class="warning-icon">⚠️</div>
                                    <div class="warning-content">
                                        <h4>Advanced Settings Warning</h4>
                                        <p>These settings are for advanced users only. Changing these options may affect system stability and performance. Proceed with caution.</p>
                                    </div>
                                </div>
                                
                                <div class="advanced-settings">
                                    <div class="advanced-group">
                                        <h4>Developer Options</h4>
                                        
                                        <div class="advanced-option">
                                            <div class="option-info">
                                                <span>Debug Mode</span>
                                                <small>Enable verbose logging and debug information</small>
                                            </div>
                                            <div class="toggle-switch">
                                                <input type="checkbox" id="debug-mode">
                                                <label for="debug-mode"></label>
                                            </div>
                                        </div>
                                        
                                        <div class="advanced-option">
                                            <div class="option-info">
                                                <span>Console Access</span>
                                                <small>Allow access to developer console</small>
                                            </div>
                                            <div class="toggle-switch">
                                                <input type="checkbox" id="console-access">
                                                <label for="console-access"></label>
                                            </div>
                                        </div>
                                        
                                        <div class="advanced-option">
                                            <div class="option-info">
                                                <span>Experimental Features</span>
                                                <small>Enable experimental and beta features</small>
                                            </div>
                                            <div class="toggle-switch">
                                                <input type="checkbox" id="experimental-features">
                                                <label for="experimental-features"></label>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="advanced-group">
                                        <h4>System Overrides</h4>
                                        
                                        <div class="advanced-option">
                                            <div class="option-info">
                                                <span>Custom CSS</span>
                                                <small>Apply custom CSS styling</small>
                                            </div>
                                            <div class="toggle-switch">
                                                <input type="checkbox" id="custom-css">
                                                <label for="custom-css"></label>
                                            </div>
                                        </div>
                                        
                                        <div class="css-editor" id="css-editor" style="display: none;">
                                            <label class="control-label">Custom CSS Code</label>
                                            <textarea id="custom-css-code" placeholder="Enter your custom CSS here..." rows="10"></textarea>
                                        </div>
                                        
                                        <div class="advanced-option">
                                            <div class="option-info">
                                                <span>Custom JavaScript</span>
                                                <small>Execute custom JavaScript code</small>
                                            </div>
                                            <div class="toggle-switch">
                                                <input type="checkbox" id="custom-js">
                                                <label for="custom-js"></label>
                                            </div>
                                        </div>
                                        
                                        <div class="js-editor" id="js-editor" style="display: none;">
                                            <label class="control-label">Custom JavaScript Code</label>
                                            <textarea id="custom-js-code" placeholder="Enter your custom JavaScript here..." rows="10"></textarea>
                                        </div>
                                    </div>
                                    
                                    <div class="advanced-group">
                                        <h4>Import & Export</h4>
                                        
                                        <div class="import-export-controls">
                                            <button class="advanced-btn" data-action="export-settings">
                                                <i class="fas fa-download"></i>
                                                Export All Settings
                                            </button>
                                            <button class="advanced-btn" data-action="import-settings">
                                                <i class="fas fa-upload"></i>
                                                Import Settings
                                            </button>
                                            <button class="advanced-btn danger" data-action="reset-all">
                                                <i class="fas fa-undo"></i>
                                                Reset to Defaults
                                            </button>
                                        </div>
                                        
                                        <input type="file" id="import-file" accept=".json" style="display: none;">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Settings Action Bar -->
                    <div class="settings-actions">
                        <div class="action-status">
                            <span id="save-status">All changes saved</span>
                        </div>
                        <div class="action-buttons">
                            <button class="action-btn secondary" id="reset-button">
                                <i class="fas fa-undo"></i>
                                Reset
                            </button>
                            <button class="action-btn secondary" id="preview-button">
                                <i class="fas fa-eye"></i>
                                Preview
                            </button>
                            <button class="action-btn primary" id="save-button">
                                <i class="fas fa-save"></i>
                                Save Changes
                            </button>
                            <button class="action-btn success" id="apply-button">
                                <i class="fas fa-check"></i>
                                Apply & Close
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- Hidden Elements -->
                <div id="particle-emojis" style="display: none;">
                    😀😃😄😁😆😊😂🤣😍🥰😘😋😎🤓🤠🥳😇🤖👻💖✨🌟⭐💫🔥💥⚡🌈🎉🎊🎈🎁🏆🥇
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
                /* Settings App v2.0 - Modern UI with Dynamic Effects */
                .settings-container {
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                    color: #1a202c;
                    position: relative;
                    overflow: hidden;
                }

                /* Dynamic Background Canvas */
                .settings-canvas {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: -1;
                    pointer-events: none;
                    opacity: 0.6;
                }

                /* Settings Header */
                .settings-header {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 25px 30px;
                    border-bottom: 3px solid rgba(255, 255, 255, 0.2);
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
                    position: relative;
                    overflow: hidden;
                }

                .settings-header::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
                    animation: shimmer 3s infinite;
                }

                @keyframes shimmer {
                    0% { left: -100%; }
                    100% { left: 100%; }
                }

                .header-content {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    position: relative;
                    z-index: 1;
                }

                .settings-logo {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                }

                .logo-icon {
                    font-size: 48px;
                    animation: rotate 20s linear infinite;
                }

                @keyframes rotate {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                .logo-text h1 {
                    margin: 0;
                    font-size: 32px;
                    font-weight: 800;
                    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
                    background: linear-gradient(45deg, #fff, #e2e8f0);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .logo-text p {
                    margin: 5px 0 0 0;
                    opacity: 0.9;
                    font-size: 16px;
                }

                .header-stats {
                    display: flex;
                    gap: 30px;
                }

                .stat-item {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    background: rgba(255, 255, 255, 0.1);
                    padding: 15px 20px;
                    border-radius: 12px;
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    transition: all 0.3s ease;
                }

                .stat-item:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
                }

                .stat-icon {
                    font-size: 24px;
                    animation: pulse 2s infinite;
                }

                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }

                .stat-number {
                    font-size: 16px;
                    font-weight: 700;
                }

                .stat-label {
                    font-size: 11px;
                    opacity: 0.8;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                /* Settings Navigation */
                .settings-nav {
                    background: #f8fafc;
                    border-bottom: 1px solid #e2e8f0;
                    padding: 20px 30px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
                }

                .nav-search {
                    position: relative;
                    width: 300px;
                }

                .nav-search input {
                    width: 100%;
                    padding: 12px 20px;
                    border: 2px solid #e2e8f0;
                    border-radius: 25px;
                    font-size: 14px;
                    background: white;
                    transition: all 0.3s ease;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
                }

                .nav-search input:focus {
                    outline: none;
                    border-color: #667eea;
                    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
                    transform: translateY(-1px);
                }

                .search-results {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 12px;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
                    max-height: 300px;
                    overflow-y: auto;
                    z-index: 1000;
                    display: none;
                }

                .nav-tabs {
                    display: flex;
                    gap: 5px;
                    background: #e2e8f0;
                    padding: 5px;
                    border-radius: 12px;
                }

                .nav-tab {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 12px 20px;
                    border: none;
                    background: transparent;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    font-size: 14px;
                    font-weight: 500;
                    color: #64748b;
                    position: relative;
                    overflow: hidden;
                }

                .nav-tab:hover {
                    background: rgba(102, 126, 234, 0.1);
                    color: #667eea;
                    transform: translateY(-1px);
                }

                .nav-tab.active {
                    background: white;
                    color: #667eea;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    font-weight: 600;
                }

                .nav-tab.active .tab-indicator {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 3px;
                    background: linear-gradient(90deg, #667eea, #764ba2);
                    border-radius: 3px 3px 0 0;
                }

                /* Settings Content */
                .settings-content {
                    flex: 1;
                    overflow-y: auto;
                    padding: 30px;
                    padding-bottom: 100px; /* Space for action bar */
                }

                .settings-tab-content {
                    display: none;
                    animation: fadeInUp 0.4s ease-out;
                }

                .settings-tab-content.active {
                    display: block;
                }

                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .settings-section {
                    background: white;
                    border-radius: 16px;
                    padding: 30px;
                    margin-bottom: 30px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
                    border: 1px solid #f1f5f9;
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                }

                .settings-section::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 4px;
                    background: linear-gradient(90deg, #667eea, #764ba2);
                }

                .settings-section:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
                }

                .section-header {
                    margin-bottom: 25px;
                    padding-bottom: 20px;
                    border-bottom: 2px solid #f1f5f9;
                }

                .section-header h3 {
                    margin: 0 0 8px 0;
                    font-size: 24px;
                    font-weight: 700;
                    color: #1a202c;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .section-header p {
                    margin: 0;
                    color: #64748b;
                    font-size: 15px;
                }

                /* Theme Gallery */
                .theme-gallery {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 20px;
                    margin-bottom: 30px;
                }

                .theme-card {
                    background: #f8fafc;
                    border: 2px solid #e2e8f0;
                    border-radius: 16px;
                    padding: 20px;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                    overflow: hidden;
                }

                .theme-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
                    border-color: #667eea;
                }

                .theme-card.active {
                    border-color: #667eea;
                    background: linear-gradient(135deg, #f0f4ff, #e0e7ff);
                    box-shadow: 0 8px 32px rgba(102, 126, 234, 0.2);
                }

                .theme-preview {
                    width: 100%;
                    height: 120px;
                    border-radius: 12px;
                    margin-bottom: 15px;
                    position: relative;
                    overflow: hidden;
                }

                .cyber-blue-preview {
                    background: linear-gradient(135deg, #00d4ff, #0099cc);
                }

                .ember-red-preview {
                    background: linear-gradient(135deg, #ff4500, #dc143c);
                }

                .matrix-green-preview {
                    background: linear-gradient(135deg, #00ff00, #008800);
                }

                .neon-purple-preview {
                    background: linear-gradient(135deg, #8000ff, #4000cc);
                }

                .ice-blue-preview {
                    background: linear-gradient(135deg, #80e0ff, #4080ff);
                }

                .sunset-orange-preview {
                    background: linear-gradient(135deg, #ff8c00, #ff4500);
                }

                .theme-preview::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 20px;
                    background: rgba(0, 0, 0, 0.2);
                    border-radius: 0 0 12px 12px;
                }

                .theme-info h4 {
                    margin: 0 0 5px 0;
                    font-size: 18px;
                    font-weight: 600;
                    color: #1a202c;
                }

                .theme-info p {
                    margin: 0;
                    color: #64748b;
                    font-size: 14px;
                }

                .theme-status {
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    background: #10b981;
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 12px;
                    font-weight: bold;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                .theme-card.active .theme-status {
                    opacity: 1;
                }

                /* Wallpaper Options */
                .wallpaper-options {
                    display: grid;
                    grid-template-columns: 1fr 2fr;
                    gap: 30px;
                    margin-bottom: 30px;
                }

                .wallpaper-category h4 {
                    margin: 0 0 15px 0;
                    font-size: 16px;
                    font-weight: 600;
                    color: #374151;
                }

                .option-buttons {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                .option-btn {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 15px 20px;
                    border: 2px solid #e2e8f0;
                    background: white;
                    border-radius: 12px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-size: 14px;
                    font-weight: 500;
                }

                .option-btn:hover {
                    border-color: #667eea;
                    background: #f0f4ff;
                    transform: translateX(5px);
                }

                .option-btn.active {
                    border-color: #667eea;
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    color: white;
                    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
                }

                .wallpaper-controls {
                    background: #f8fafc;
                    padding: 25px;
                    border-radius: 12px;
                    border: 1px solid #e2e8f0;
                }

                .control-group {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }

                .control-label {
                    font-size: 14px;
                    font-weight: 600;
                    color: #374151;
                    margin-bottom: 8px;
                }

                .styled-select {
                    padding: 12px 16px;
                    border: 2px solid #e2e8f0;
                    border-radius: 8px;
                    background: white;
                    font-size: 14px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .styled-select:focus {
                    outline: none;
                    border-color: #667eea;
                    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
                }

                .color-picker {
                    width: 60px;
                    height: 40px;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: transform 0.3s ease;
                }

                .color-picker:hover {
                    transform: scale(1.1);
                }

                .styled-range {
                    width: 100%;
                    height: 6px;
                    background: #e2e8f0;
                    border-radius: 3px;
                    outline: none;
                    cursor: pointer;
                    -webkit-appearance: none;
                }

                .styled-range::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    width: 20px;
                    height: 20px;
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    border-radius: 50%;
                    cursor: pointer;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
                    transition: transform 0.3s ease;
                }

                .styled-range::-webkit-slider-thumb:hover {
                    transform: scale(1.2);
                }

                .range-value {
                    font-size: 12px;
                    color: #667eea;
                    font-weight: 600;
                    margin-left: 10px;
                }

                .checkbox-group {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin: 10px 0;
                }

                .checkbox-group input[type="checkbox"] {
                    opacity: 0;
                    position: absolute;
                }

                .checkbox-group input[type="checkbox"] + label {
                    position: relative;
                    padding-left: 30px;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: 500;
                    color: #374151;
                }

                .checkbox-group input[type="checkbox"] + label::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 20px;
                    height: 20px;
                    border: 2px solid #e2e8f0;
                    border-radius: 4px;
                    background: white;
                    transition: all 0.3s ease;
                }

                .checkbox-group input[type="checkbox"]:checked + label::before {
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    border-color: #667eea;
                }

                .checkbox-group input[type="checkbox"]:checked + label::after {
                    content: '✓';
                    position: absolute;
                    left: 4px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: white;
                    font-size: 12px;
                    font-weight: bold;
                }

                /* Wallpaper Preview */
                .wallpaper-preview {
                    margin-top: 30px;
                    text-align: center;
                }

                .preview-container {
                    width: 100%;
                    max-width: 400px;
                    height: 250px;
                    margin: 0 auto 20px;
                    border-radius: 16px;
                    overflow: hidden;
                    position: relative;
                    border: 3px solid #e2e8f0;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
                }

                #wallpaper-preview-canvas {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .preview-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .preview-desktop {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 10px;
                }

                .preview-icon {
                    font-size: 24px;
                    background: rgba(255, 255, 255, 0.2);
                    padding: 8px;
                    border-radius: 8px;
                    backdrop-filter: blur(10px);
                }

                .preview-taskbar {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 30px;
                    background: rgba(0, 0, 0, 0.3);
                    backdrop-filter: blur(10px);
                }

                .apply-wallpaper-btn {
                    padding: 12px 30px;
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    color: white;
                    border: none;
                    border-radius: 25px;
                    font-size: 16px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
                }

                .apply-wallpaper-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
                }

                /* Visual Effects Grid */
                .visual-effects-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 20px;
                    margin-bottom: 30px;
                }

                .effect-card {
                    background: #f8fafc;
                    border: 2px solid #e2e8f0;
                    border-radius: 16px;
                    padding: 20px;
                    transition: all 0.3s ease;
                }

                .effect-card:hover {
                    border-color: #667eea;
                    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.1);
                }

                .effect-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 10px;
                }

                .effect-header h4 {
                    margin: 0;
                    font-size: 16px;
                    font-weight: 600;
                    color: #1a202c;
                }

                .toggle-switch {
                    position: relative;
                    width: 50px;
                    height: 26px;
                }

                .toggle-switch input {
                    opacity: 0;
                    width: 0;
                    height: 0;
                }

                .toggle-switch label {
                    position: absolute;
                    cursor: pointer;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: #e2e8f0;
                    border-radius: 26px;
                    transition: all 0.3s ease;
                }

                .toggle-switch label::before {
                    position: absolute;
                    content: "";
                    height: 20px;
                    width: 20px;
                    left: 3px;
                    bottom: 3px;
                    background: white;
                    border-radius: 50%;
                    transition: all 0.3s ease;
                    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
                }

                .toggle-switch input:checked + label {
                    background: linear-gradient(135deg, #667eea, #764ba2);
                }

                .toggle-switch input:checked + label::before {
                    transform: translateX(24px);
                }

                .effect-demo {
                    width: 100%;
                    height: 60px;
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    border-radius: 8px;
                    margin-top: 15px;
                    position: relative;
                    overflow: hidden;
                }

                .blur-demo {
                    backdrop-filter: blur(10px);
                    background: rgba(102, 126, 234, 0.5);
                }

                .shadow-demo {
                    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
                }

                .transparency-demo {
                    background: rgba(102, 126, 234, 0.7);
                }

                /* Animation Quality */
                .animation-quality {
                    margin-top: 30px;
                }

                .quality-options {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                    gap: 15px;
                    margin-top: 15px;
                }

                .quality-btn {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                    padding: 20px 15px;
                    border: 2px solid #e2e8f0;
                    background: white;
                    border-radius: 12px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    text-align: center;
                }

                .quality-btn:hover {
                    border-color: #667eea;
                    transform: translateY(-2px);
                }

                .quality-btn.active {
                    border-color: #667eea;
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    color: white;
                    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
                }

                .quality-btn i {
                    font-size: 24px;
                }

                .quality-btn span {
                    font-size: 14px;
                    font-weight: 600;
                }

                .quality-btn small {
                    font-size: 11px;
                    opacity: 0.8;
                }

                /* Typography Controls */
                .typography-controls {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 25px;
                    margin-bottom: 30px;
                }

                .font-preview {
                    grid-column: 1 / -1;
                    background: #f8fafc;
                    padding: 25px;
                    border-radius: 12px;
                    border: 1px solid #e2e8f0;
                    margin-top: 20px;
                }

                .font-preview h4 {
                    margin: 0 0 20px 0;
                    color: #374151;
                    font-size: 16px;
                    font-weight: 600;
                }

                .preview-text {
                    transition: all 0.3s ease;
                }

                .preview-text h1 {
                    margin: 0 0 10px 0;
                    font-size: 28px;
                    color: #1a202c;
                }

                .preview-text h2 {
                    margin: 0 0 15px 0;
                    font-size: 20px;
                    color: #374151;
                }

                .preview-text p {
                    margin: 0 0 10px 0;
                    font-size: 16px;
                    color: #4b5563;
                    line-height: 1.6;
                }

                .preview-text small {
                    color: #6b7280;
                    font-style: italic;
                }

                /* Performance Dashboard */
                .performance-dashboard {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 20px;
                    margin-bottom: 30px;
                }

                .perf-card {
                    background: white;
                    border: 2px solid #e2e8f0;
                    border-radius: 16px;
                    padding: 20px;
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    transition: all 0.3s ease;
                }

                .perf-card:hover {
                    border-color: #667eea;
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.1);
                }

                .perf-icon {
                    font-size: 32px;
                    animation: bounce 2s infinite;
                }

                @keyframes bounce {
                    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                    40% { transform: translateY(-10px); }
                    60% { transform: translateY(-5px); }
                }

                .perf-info {
                    flex: 1;
                }

                .perf-info h4 {
                    margin: 0 0 8px 0;
                    font-size: 14px;
                    font-weight: 600;
                    color: #374151;
                }

                .perf-bar {
                    width: 100%;
                    height: 6px;
                    background: #e2e8f0;
                    border-radius: 3px;
                    overflow: hidden;
                    margin-bottom: 5px;
                }

                .perf-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #10b981, #059669);
                    border-radius: 3px;
                    transition: width 1s ease;
                }

                .perf-info span {
                    font-size: 12px;
                    color: #6b7280;
                }

                /* Performance Settings */
                .performance-settings {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                    margin-bottom: 30px;
                }

                .perf-setting {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 20px;
                    background: #f8fafc;
                    border-radius: 12px;
                    border: 1px solid #e2e8f0;
                    transition: all 0.3s ease;
                }

                .perf-setting:hover {
                    border-color: #667eea;
                    background: #f0f4ff;
                }

                .setting-info {
                    flex: 1;
                }

                .setting-info h4 {
                    margin: 0 0 5px 0;
                    font-size: 16px;
                    font-weight: 600;
                    color: #1a202c;
                }

                .setting-info p {
                    margin: 0;
                    font-size: 14px;
                    color: #6b7280;
                }

                /* Performance Modes */
                .performance-modes {
                    margin-top: 30px;
                }

                .performance-modes h4 {
                    margin: 0 0 20px 0;
                    font-size: 18px;
                    font-weight: 600;
                    color: #1a202c;
                }

                .mode-buttons {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                    gap: 15px;
                }

                .mode-btn {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 10px;
                    padding: 25px 15px;
                    border: 2px solid #e2e8f0;
                    background: white;
                    border-radius: 16px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    text-align: center;
                }

                .mode-btn:hover {
                    border-color: #667eea;
                    transform: translateY(-3px);
                    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.1);
                }

                .mode-btn.active {
                    border-color: #667eea;
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    color: white;
                    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
                }

                .mode-btn i {
                    font-size: 32px;
                }

                .mode-btn span {
                    font-size: 16px;
                    font-weight: 600;
                }

                .mode-btn small {
                    font-size: 12px;
                    opacity: 0.8;
                }

                /* Cleanup Tools */
                .cleanup-tools {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 20px;
                    margin-bottom: 30px;
                }

                .cleanup-card {
                    background: white;
                    border: 2px solid #e2e8f0;
                    border-radius: 16px;
                    padding: 25px;
                    text-align: center;
                    transition: all 0.3s ease;
                }

                .cleanup-card:hover {
                    border-color: #667eea;
                    transform: translateY(-3px);
                    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.1);
                }

                .cleanup-icon {
                    font-size: 48px;
                    margin-bottom: 15px;
                    animation: float 3s ease-in-out infinite;
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }

                .cleanup-info h4 {
                    margin: 0 0 8px 0;
                    font-size: 18px;
                    font-weight: 600;
                    color: #1a202c;
                }

                .cleanup-info p {
                    margin: 0 0 10px 0;
                    font-size: 14px;
                    color: #6b7280;
                }

                .cleanup-size {
                    display: block;
                    font-size: 16px;
                    font-weight: 600;
                    color: #667eea;
                    margin-bottom: 15px;
                }

                .cleanup-btn {
                    padding: 10px 20px;
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    color: white;
                    border: none;
                    border-radius: 8px;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .cleanup-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
                }

                /* Auto Cleanup */
                .auto-cleanup {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 20px;
                    background: #f8fafc;
                    border-radius: 12px;
                    border: 1px solid #e2e8f0;
                }

                /* Desktop Layout */
                .desktop-layout {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 30px;
                    margin-bottom: 30px;
                }

                .layout-option h4 {
                    margin: 0 0 15px 0;
                    font-size: 16px;
                    font-weight: 600;
                    color: #374151;
                }

                .icon-grid-options {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                .grid-btn {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    padding: 15px 20px;
                    border: 2px solid #e2e8f0;
                    background: white;
                    border-radius: 12px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .grid-btn:hover {
                    border-color: #667eea;
                    background: #f0f4ff;
                }

                .grid-btn.active {
                    border-color: #667eea;
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    color: white;
                }

                .grid-preview {
                    width: 30px;
                    height: 20px;
                    border-radius: 4px;
                    position: relative;
                }

                .auto-grid {
                    background: linear-gradient(135deg, #10b981, #059669);
                }

                .grid-grid {
                    background: linear-gradient(135deg, #f59e0b, #d97706);
                }

                .free-grid {
                    background: linear-gradient(135deg, #8b5cf6, #7c3aed);
                }

                .icon-settings {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                /* Taskbar Settings */
                .taskbar-settings {
                    margin-top: 30px;
                }

                .taskbar-settings h4 {
                    margin: 0 0 20px 0;
                    font-size: 18px;
                    font-weight: 600;
                    color: #1a202c;
                }

                .position-options {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 10px;
                    margin: 15px 0 25px 0;
                }

                .pos-btn {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                    padding: 15px 10px;
                    border: 2px solid #e2e8f0;
                    background: white;
                    border-radius: 12px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-size: 12px;
                    font-weight: 500;
                }

                .pos-btn:hover {
                    border-color: #667eea;
                    background: #f0f4ff;
                }

                .pos-btn.active {
                    border-color: #667eea;
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    color: white;
                }

                .pos-btn i {
                    font-size: 20px;
                }

                .taskbar-options {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 15px;
                }

                /* Notification Settings */
                .notification-settings {
                    display: flex;
                    flex-direction: column;
                    gap: 25px;
                }

                .notification-types {
                    background: #f8fafc;
                    padding: 20px;
                    border-radius: 12px;
                    border: 1px solid #e2e8f0;
                }

                .notification-types h4 {
                    margin: 0 0 15px 0;
                    font-size: 16px;
                    font-weight: 600;
                    color: #374151;
                }

                .notification-type {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 15px 0;
                    border-bottom: 1px solid #e2e8f0;
                }

                .notification-type:last-child {
                    border-bottom: none;
                }

                .type-info {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    font-size: 14px;
                    font-weight: 500;
                    color: #374151;
                }

                .type-info i {
                    font-size: 18px;
                    color: #667eea;
                }

                /* Notification Sounds */
                .notification-sounds {
                    background: #f8fafc;
                    padding: 20px;
                    border-radius: 12px;
                    border: 1px solid #e2e8f0;
                }

                .notification-sounds h4 {
                    margin: 0 0 15px 0;
                    font-size: 16px;
                    font-weight: 600;
                    color: #374151;
                }

                .sound-volume {
                    margin-top: 15px;
                    display: flex;
                    align-items: center;
                    gap: 15px;
                }

                /* System Info Grid */
                .system-info-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 20px;
                    margin-bottom: 30px;
                }

                .info-card {
                    background: white;
                    border: 2px solid #e2e8f0;
                    border-radius: 16px;
                    padding: 25px;
                    transition: all 0.3s ease;
                }

                .info-card:hover {
                    border-color: #667eea;
                    transform: translateY(-3px);
                    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.1);
                }

                .info-icon {
                    font-size: 40px;
                    text-align: center;
                    margin-bottom: 15px;
                    animation: wiggle 2s ease-in-out infinite;
                }

                @keyframes wiggle {
                    0%, 7% { transform: rotateZ(0); }
                    15% { transform: rotateZ(-15deg); }
                    20% { transform: rotateZ(10deg); }
                    25% { transform: rotateZ(-10deg); }
                    30% { transform: rotateZ(6deg); }
                    35% { transform: rotateZ(-4deg); }
                    40%, 100% { transform: rotateZ(0); }
                }

                .info-content h4 {
                    margin: 0 0 15px 0;
                    font-size: 18px;
                    font-weight: 600;
                    color: #1a202c;
                    text-align: center;
                }

                .info-items {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .info-item {
                    display: flex;
                    justify-content: space-between;
                    font-size: 14px;
                    padding: 5px 0;
                    border-bottom: 1px solid #f1f5f9;
                }

                .info-item:last-child {
                    border-bottom: none;
                }

                .info-item span:first-child {
                    color: #6b7280;
                    font-weight: 500;
                }

                .info-item span:last-child {
                    color: #1a202c;
                    font-weight: 600;
                }

                /* System Preferences */
                .system-preferences {
                    display: flex;
                    flex-direction: column;
                    gap: 30px;
                }

                .pref-group {
                    background: #f8fafc;
                    padding: 25px;
                    border-radius: 16px;
                    border: 1px solid #e2e8f0;
                }

                .pref-group h4 {
                    margin: 0 0 20px 0;
                    font-size: 18px;
                    font-weight: 600;
                    color: #1a202c;
                    border-bottom: 2px solid #e2e8f0;
                    padding-bottom: 10px;
                }

                .pref-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 15px 0;
                    border-bottom: 1px solid #e2e8f0;
                }

                .pref-item:last-child {
                    border-bottom: none;
                }

                .pref-info {
                    flex: 1;
                    margin-right: 20px;
                }

                .pref-info span {
                    display: block;
                    font-size: 16px;
                    font-weight: 500;
                    color: #1a202c;
                    margin-bottom: 4px;
                }

                .pref-info small {
                    color: #6b7280;
                    font-size: 13px;
                }

                /* Privacy Settings */
                .privacy-settings {
                    display: flex;
                    flex-direction: column;
                    gap: 25px;
                }

                .privacy-card {
                    background: white;
                    border: 2px solid #e2e8f0;
                    border-radius: 16px;
                    padding: 25px;
                    transition: all 0.3s ease;
                }

                .privacy-card:hover {
                    border-color: #667eea;
                    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.1);
                }

                .privacy-icon {
                    font-size: 48px;
                    text-align: center;
                    margin-bottom: 20px;
                    animation: glow 2s ease-in-out infinite alternate;
                }

                @keyframes glow {
                    from { text-shadow: 0 0 10px rgba(102, 126, 234, 0.5); }
                    to { text-shadow: 0 0 20px rgba(102, 126, 234, 0.8); }
                }

                .privacy-content h4 {
                    margin: 0 0 10px 0;
                    font-size: 20px;
                    font-weight: 600;
                    color: #1a202c;
                    text-align: center;
                }

                .privacy-content p {
                    margin: 0 0 20px 0;
                    color: #6b7280;
                    text-align: center;
                    font-size: 14px;
                }

                .privacy-option {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 15px 0;
                    border-bottom: 1px solid #f1f5f9;
                }

                .privacy-option:last-child {
                    border-bottom: none;
                }

                .option-info {
                    flex: 1;
                }

                .option-info span {
                    display: block;
                    font-size: 15px;
                    font-weight: 500;
                    color: #1a202c;
                    margin-bottom: 4px;
                }

                .option-info small {
                    color: #6b7280;
                    font-size: 13px;
                }

                .history-controls {
                    display: flex;
                    gap: 15px;
                    margin-top: 15px;
                }

                .privacy-btn {
                    flex: 1;
                    padding: 12px 20px;
                    border: 2px solid #e2e8f0;
                    background: white;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-size: 14px;
                    font-weight: 500;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                }

                .privacy-btn:hover {
                    border-color: #667eea;
                    background: #f0f4ff;
                    transform: translateY(-1px);
                }

                /* Advanced Settings */
                .advanced-warning {
                    background: linear-gradient(135deg, #fef3cd, #fde68a);
                    border: 2px solid #f59e0b;
                    border-radius: 16px;
                    padding: 20px;
                    margin-bottom: 30px;
                    display: flex;
                    align-items: center;
                    gap: 15px;
                }

                .warning-icon {
                    font-size: 32px;
                    animation: warning-pulse 2s infinite;
                }

                @keyframes warning-pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }

                .warning-content h4 {
                    margin: 0 0 8px 0;
                    font-size: 18px;
                    font-weight: 600;
                    color: #92400e;
                }

                .warning-content p {
                    margin: 0;
                    color: #a16207;
                    font-size: 14px;
                }

                .advanced-settings {
                    display: flex;
                    flex-direction: column;
                    gap: 30px;
                }

                .advanced-group {
                    background: #f8fafc;
                    padding: 25px;
                    border-radius: 16px;
                    border: 1px solid #e2e8f0;
                }

                .advanced-group h4 {
                    margin: 0 0 20px 0;
                    font-size: 18px;
                    font-weight: 600;
                    color: #1a202c;
                    border-bottom: 2px solid #e2e8f0;
                    padding-bottom: 10px;
                }

                .advanced-option {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 15px 0;
                    border-bottom: 1px solid #e2e8f0;
                }

                .advanced-option:last-child {
                    border-bottom: none;
                }

                .css-editor,
                .js-editor {
                    margin-top: 15px;
                }

                .css-editor textarea,
                .js-editor textarea {
                    width: 100%;
                    padding: 15px;
                    border: 2px solid #e2e8f0;
                    border-radius: 8px;
                    font-family: 'JetBrains Mono', 'Courier New', monospace;
                    font-size: 13px;
                    background: #1a202c;
                    color: #e2e8f0;
                    resize: vertical;
                    min-height: 200px;
                }

                .css-editor textarea:focus,
                .js-editor textarea:focus {
                    outline: none;
                    border-color: #667eea;
                    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
                }

                .import-export-controls {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                    gap: 15px;
                }

                .advanced-btn {
                    padding: 15px 20px;
                    border: 2px solid #e2e8f0;
                    background: white;
                    border-radius: 12px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-size: 14px;
                    font-weight: 500;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                }

                .advanced-btn:hover {
                    border-color: #667eea;
                    background: #f0f4ff;
                    transform: translateY(-2px);
                }

                .advanced-btn.danger {
                    border-color: #ef4444;
                    color: #dc2626;
                }

                .advanced-btn.danger:hover {
                    background: #fef2f2;
                    border-color: #dc2626;
                }

                /* Settings Action Bar - Fixed Positioning */
                .settings-actions {
                    position: sticky;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background: white;
                    border-top: 2px solid #e2e8f0;
                    padding: 20px 30px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
                    z-index: 100;
                    backdrop-filter: blur(10px);
                    margin-top: auto;
                }

                .action-status {
                    color: #10b981;
                    font-size: 14px;
                    font-weight: 500;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .action-status::before {
                    content: '✓';
                    display: inline-block;
                    width: 16px;
                    height: 16px;
                    background: #10b981;
                    color: white;
                    border-radius: 50%;
                    text-align: center;
                    font-size: 10px;
                    line-height: 16px;
                }

                .action-buttons {
                    display: flex;
                    gap: 15px;
                }

                .action-btn {
                    padding: 12px 24px;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                }

                .action-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
                }

                .action-btn.primary {
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    color: white;
                }

                .action-btn.secondary {
                    background: #6b7280;
                    color: white;
                }

                .action-btn.success {
                    background: linear-gradient(135deg, #10b981, #059669);
                    color: white;
                }

                /* Responsive Design */
                @media (max-width: 768px) {
                    .settings-container {
                        font-size: 14px;
                    }

                    .settings-header {
                        padding: 20px;
                    }

                    .header-content {
                        flex-direction: column;
                        gap: 20px;
                        text-align: center;
                    }

                    .header-stats {
                        flex-direction: column;
                        gap: 15px;
                        width: 100%;
                    }

                    .settings-nav {
                        flex-direction: column;
                        gap: 20px;
                        padding: 15px 20px;
                    }

                    .nav-search {
                        width: 100%;
                    }

                    .nav-tabs {
                        flex-wrap: wrap;
                        justify-content: center;
                    }

                    .nav-tab {
                        min-width: auto;
                        padding: 10px 15px;
                    }

                    .nav-tab span {
                        display: none;
                    }

                    .settings-content {
                        padding: 20px;
                        padding-bottom: 120px;
                    }

                    .settings-section {
                        padding: 20px;
                    }

                    .theme-gallery,
                    .visual-effects-grid,
                    .performance-dashboard,
                    .cleanup-tools,
                    .system-info-grid {
                        grid-template-columns: 1fr;
                    }

                    .wallpaper-options,
                    .desktop-layout {
                        grid-template-columns: 1fr;
                    }

                    .typography-controls {
                        grid-template-columns: 1fr;
                    }

                    .quality-options,
                    .mode-buttons {
                        grid-template-columns: repeat(2, 1fr);
                    }

                    .position-options {
                        grid-template-columns: repeat(2, 1fr);
                    }

                    .taskbar-options {
                        grid-template-columns: 1fr;
                    }

                    .settings-actions {
                        flex-direction: column-reverse;
                        gap: 15px;
                        padding: 15px 20px;
                    }

                    .action-buttons {
                        width: 100%;
                        justify-content: space-between;
                    }

                    .action-btn {
                        flex: 1;
                        justify-content: center;
                        padding: 10px 15px;
                        font-size: 12px;
                    }
                }

                /* Particle Effects */
                .particle {
                    position: absolute;
                    pointer-events: none;
                    user-select: none;
                    z-index: 1;
                }

                .emoji-particle {
                    font-size: 20px;
                    animation: emoji-float 4s ease-in-out infinite;
                }

                @keyframes emoji-float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    25% { transform: translateY(-10px) rotate(90deg); }
                    50% { transform: translateY(-5px) rotate(180deg); }
                    75% { transform: translateY(-15px) rotate(270deg); }
                }

                .geometric-particle {
                    width: 8px;
                    height: 8px;
                    background: linear-gradient(45deg, #667eea, #764ba2);
                    border-radius: 50%;
                    animation: geometric-float 3s ease-in-out infinite;
                }

                @keyframes geometric-float {
                    0%, 100% { transform: translateY(0px) scale(1); }
                    50% { transform: translateY(-20px) scale(1.2); }
                }

                /* Mouse Trail Effect */
                .mouse-trail {
                    position: fixed;
                    width: 6px;
                    height: 6px;
                    background: radial-gradient(circle, #667eea, transparent);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    animation: trail-fade 0.5s ease-out forwards;
                }

                @keyframes trail-fade {
                    from { opacity: 0.8; transform: scale(1); }
                    to { opacity: 0; transform: scale(0.3); }
                }

                /* Loading Animations */
                .settings-loading {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    padding: 40px;
                    font-size: 16px;
                    color: #667eea;
                }

                .settings-spinner {
                    width: 24px;
                    height: 24px;
                    border: 3px solid #e2e8f0;
                    border-top: 3px solid #667eea;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                /* Smooth Transitions */
                * {
                    transition: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
                }

                /* Custom Scrollbar */
                .settings-content::-webkit-scrollbar {
                    width: 8px;
                }

                .settings-content::-webkit-scrollbar-track {
                    background: #f1f5f9;
                    border-radius: 4px;
                }

                .settings-content::-webkit-scrollbar-thumb {
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    border-radius: 4px;
                }

                .settings-content::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(135deg, #5a6fd8, #6a42a6);
                }
            </style>
        `;
    }

    static init(windowElement) {
        this.currentWindow = windowElement;
        this.particles = [];
        this.mouseTrails = [];
        this.settings = {};
        this.canvas = windowElement.querySelector('#settings-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.emojis = ['😀', '😃', '😄', '😁', '😆', '😊', '😂', '🤣', '😍', '🥰', '😘', '😋', '😎', '🤓', '🤠', '🥳', '😇', '🤖', '👻', '💖', '✨', '🌟', '⭐', '💫', '🔥', '💥', '⚡', '🌈', '🎉', '🎊', '🎈', '🎁', '🏆', '🥇'];

        this.setupCanvas();
        this.setupEventListeners();
        this.setupParticles();
        this.setupMouseTrails();
        this.loadCurrentSettings();
        this.startAnimationLoop();
        this.detectSystemInfo();