/**
 * APP_METADATA
 * @name Settings
 * @icon fas fa-cog
 * @description Advanced system customization with merged legacy design and modern features (autosave enabled)
 * @category System
 * @version 4.0.0
 * @author EmberFrame Team
 * @enabled true
 */

class Settings {
    static createWindow() {
        return {
            title: '⚙️ EmberFrame Settings',
            width: '850px',      // Slimmer than original 950px
            height: '700px',
            autoSize: false,
            content: `
                <div class="enhanced-settings">
                    <!-- Settings Sidebar -->
                    <div class="settings-sidebar">
                        <div class="settings-logo">
                            <div class="logo-icon">⚙️</div>
                            <div class="logo-text">Settings</div>
                        </div>
                        
                        <div class="settings-nav">
                            <div class="nav-item active" data-section="appearance">
                                <i class="fas fa-palette"></i>
                                <span>Appearance</span>
                            </div>
                            <div class="nav-item" data-section="themes">
                                <i class="fas fa-magic"></i>
                                <span>Themes & Effects</span>
                            </div>
                            <div class="nav-item" data-section="background">
                                <i class="fas fa-image"></i>
                                <span>Background</span>
                            </div>
                            <div class="nav-item" data-section="particles">
                                <i class="fas fa-star"></i>
                                <span>Particle Effects</span>
                            </div>
                            <div class="nav-item" data-section="interface">
                                <i class="fas fa-desktop"></i>
                                <span>Interface</span>
                            </div>
                            <div class="nav-item" data-section="accessibility">
                                <i class="fas fa-universal-access"></i>
                                <span>Accessibility</span>
                            </div>
                            <div class="nav-item" data-section="advanced">
                                <i class="fas fa-cogs"></i>
                                <span>Advanced</span>
                            </div>
                        </div>
                    </div>

                    <!-- Settings Content -->
                    <div class="settings-content">
                        <!-- Appearance Section -->
                        <div class="settings-section active" id="appearance">
                            <div class="section-header">
                                <h2>🎨 Appearance Settings</h2>
                                <p>Customize the visual appearance of your desktop</p>
                            </div>
                            
                            <div class="settings-grid">
                                <!-- Color Scheme -->
                                <div class="setting-card">
                                    <h3>Color Scheme</h3>
                                    <div class="color-scheme-selector">
                                        <!-- Legacy Auto/Light/Dark/Midnight -->
                                        <div class="color-option" data-scheme="auto">
                                            <div class="color-preview auto-preview"></div>
                                            <span>Auto</span>
                                        </div>
                                        <div class="color-option" data-scheme="light">
                                            <div class="color-preview light-preview"></div>
                                            <span>Light</span>
                                        </div>
                                        <div class="color-option" data-scheme="dark">
                                            <div class="color-preview dark-preview"></div>
                                            <span>Dark</span>
                                        </div>
                                        <div class="color-option" data-scheme="midnight">
                                            <div class="color-preview midnight-preview"></div>
                                            <span>Midnight</span>
                                        </div>
                                        <!-- Modern Custom Schemes -->
                                        <div class="color-option" data-scheme="cyber-blue">
                                            <div class="color-preview" style="background: linear-gradient(135deg, #00d4ff, #0099cc);"></div>
                                            <span>Cyber Blue</span>
                                        </div>
                                        <div class="color-option" data-scheme="ember-red">
                                            <div class="color-preview" style="background: linear-gradient(135deg, #ff4500, #dc143c);"></div>
                                            <span>Ember Red</span>
                                        </div>
                                        <div class="color-option" data-scheme="matrix-green">
                                            <div class="color-preview" style="background: linear-gradient(135deg, #00ff00, #008800);"></div>
                                            <span>Matrix Green</span>
                                        </div>
                                        <div class="color-option" data-scheme="neon-purple">
                                            <div class="color-preview" style="background: linear-gradient(135deg, #8000ff, #4000cc);"></div>
                                            <span>Neon Purple</span>
                                        </div>
                                        <div class="color-option" data-scheme="ice-blue">
                                            <div class="color-preview" style="background: linear-gradient(135deg, #80e0ff, #4080ff);"></div>
                                            <span>Ice Blue</span>
                                        </div>
                                        <div class="color-option" data-scheme="golden-yellow">
                                            <div class="color-preview" style="background: linear-gradient(135deg, #ffd700, #ff8c00);"></div>
                                            <span>Golden Yellow</span>
                                        </div>
                                    </div>
                                </div>

                                <!-- Accent Color (Legacy) -->
                                <div class="setting-card">
                                    <h3>Accent Color</h3>
                                    <div class="accent-colors">
                                        <div class="accent-color" data-color="#00d4ff" style="background: #00d4ff;"></div>
                                        <div class="accent-color" data-color="#ff6b6b" style="background: #ff6b6b;"></div>
                                        <div class="accent-color" data-color="#4ecdc4" style="background: #4ecdc4;"></div>
                                        <div class="accent-color" data-color="#45b7d1" style="background: #45b7d1;"></div>
                                        <div class="accent-color" data-color="#96ceb4" style="background: #96ceb4;"></div>
                                        <div class="accent-color" data-color="#feca57" style="background: #feca57;"></div>
                                        <div class="accent-color" data-color="#ff9ff3" style="background: #ff9ff3;"></div>
                                        <div class="accent-color" data-color="#54a0ff" style="background: #54a0ff;"></div>
                                        <div class="accent-color" data-color="#5f27cd" style="background: #5f27cd;"></div>
                                        <div class="accent-color" data-color="#00d2d3" style="background: #00d2d3;"></div>
                                        <div class="accent-color" data-color="#ff6348" style="background: #ff6348;"></div>
                                        <div class="accent-color" data-color="#2ed573" style="background: #2ed573;"></div>
                                    </div>
                                    <input type="color" id="custom-accent" value="#00d4ff" style="margin-top: 10px;">
                                </div>

                                <!-- Window Effects -->
                                <div class="setting-card">
                                    <h3>Window Effects</h3>
                                    <div class="slider-group">
                                        <label>Window Transparency</label>
                                        <input type="range" id="window-transparency" min="0" max="50" value="5" step="5" class="modern-slider">
                                        <span class="slider-value">5%</span>
                                    </div>
                                    <div class="toggle-group">
                                        <label class="modern-toggle">
                                            <input type="checkbox" id="blur-effects" checked>
                                            <span class="toggle-slider"></span>
                                            <span class="toggle-label">Enable blur effects</span>
                                        </label>
                                    </div>
                                    <div class="toggle-group">
                                        <label class="modern-toggle">
                                            <input type="checkbox" id="window-shadows" checked>
                                            <span class="toggle-slider"></span>
                                            <span class="toggle-label">Window drop shadows</span>
                                        </label>
                                    </div>
                                    <div class="toggle-group">
                                        <label class="modern-toggle">
                                            <input type="checkbox" id="window-glow" checked>
                                            <span class="toggle-slider"></span>
                                            <span class="toggle-label">Window glow effects</span>
                                        </label>
                                    </div>
                                </div>

                                <!-- Icon Settings (Legacy + Modern) -->
                                <div class="setting-card">
                                    <h3>Icon Settings</h3>
                                    <div class="slider-group">
                                        <label>Icon Size</label>
                                        <input type="range" id="icon-size" min="32" max="80" value="48" step="8" class="modern-slider">
                                        <span class="slider-value">48px</span>
                                    </div>
                                    <div class="toggle-group">
                                        <label class="modern-toggle">
                                            <input type="checkbox" id="icon-shadows" checked>
                                            <span class="toggle-slider"></span>
                                            <span class="toggle-label">Icon shadows</span>
                                        </label>
                                    </div>
                                    <div class="toggle-group">
                                        <label class="modern-toggle">
                                            <input type="checkbox" id="icon-labels" checked>
                                            <span class="toggle-slider"></span>
                                            <span class="toggle-label">Show icon labels</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Themes Section -->
                        <div class="settings-section" id="themes">
                            <div class="section-header">
                                <h2>✨ Themes & Effects</h2>
                                <p>Choose from beautiful pre-built themes with amazing effects</p>
                            </div>
                            
                            <div class="theme-grid">
                                <div class="theme-card" data-theme="cyberpunk">
                                    <div class="theme-preview" style="background: linear-gradient(135deg, #0a0a0f, #ff0080, #00ffff)"></div>
                                    <h3>Cyberpunk</h3>
                                    <p>Neon lights and dark atmosphere</p>
                                </div>
                                
                                <div class="theme-card" data-theme="synthwave">
                                    <div class="theme-preview" style="background: linear-gradient(135deg, #2d1b69, #ff6b6b, #feca57)"></div>
                                    <h3>Synthwave</h3>
                                    <p>80s retro vibes</p>
                                </div>
                                
                                <div class="theme-card" data-theme="hacker">
                                    <div class="theme-preview" style="background: linear-gradient(135deg, #000000, #00ff00, #002200)"></div>
                                    <h3>Hacker</h3>
                                    <p>Terminal green on black</p>
                                </div>
                                
                                <div class="theme-card" data-theme="sunset">
                                    <div class="theme-preview" style="background: linear-gradient(135deg, #ff7f50, #ff6347, #ffd700)"></div>
                                    <h3>Sunset</h3>
                                    <p>Warm sunset colors</p>
                                </div>
                                
                                <div class="theme-card" data-theme="ocean">
                                    <div class="theme-preview" style="background: linear-gradient(135deg, #006994, #47b8e0, #87ceeb)"></div>
                                    <h3>Ocean</h3>
                                    <p>Deep blue ocean theme</p>
                                </div>
                                
                                <div class="theme-card" data-theme="forest">
                                    <div class="theme-preview" style="background: linear-gradient(135deg, #2d5016, #68b738, #a8e6cf)"></div>
                                    <h3>Forest</h3>
                                    <p>Natural green forest</p>
                                </div>
                            </div>

                            <div class="setting-group" style="margin-top: 30px;">
                                <h3>Animation Settings</h3>
                                <div class="setting-item">
                                    <label>Animation Speed</label>
                                    <select id="animation-speed" class="modern-select">
                                        <option value="0.1">Very Fast</option>
                                        <option value="0.2">Fast</option>
                                        <option value="0.3" selected>Normal</option>
                                        <option value="0.5">Slow</option>
                                        <option value="1.0">Very Slow</option>
                                    </select>
                                </div>
                                <div class="setting-item">
                                    <label class="modern-toggle">
                                        <input type="checkbox" id="reduce-motion">
                                        <span class="toggle-slider"></span>
                                        <span class="toggle-label">Reduce motion effects</span>
                                    </label>
                                </div>
                                <div class="setting-item">
                                    <label class="modern-toggle">
                                        <input type="checkbox" id="smooth-transitions" checked>
                                        <span class="toggle-slider"></span>
                                        <span class="toggle-label">Smooth transitions</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <!-- Background Section -->
                        <div class="settings-section" id="background">
                            <div class="section-header">
                                <h2>🖼️ Background Settings</h2>
                                <p>Customize your desktop background and patterns</p>
                            </div>
                            
                            <div class="setting-card full-width">
                                <h3>Background Type</h3>
                                <div class="background-types">
                                    <div class="bg-type active" data-type="gradient">
                                        <i class="fas fa-paint-brush"></i>
                                        <span>Gradient</span>
                                    </div>
                                    <div class="bg-type" data-type="pattern">
                                        <i class="fas fa-th"></i>
                                        <span>Pattern</span>
                                    </div>
                                    <div class="bg-type" data-type="image">
                                        <i class="fas fa-image"></i>
                                        <span>Image</span>
                                    </div>
                                    <div class="bg-type" data-type="video">
                                        <i class="fas fa-video"></i>
                                        <span>Video</span>
                                    </div>
                                    <div class="bg-type" data-type="animated">
                                        <i class="fas fa-film"></i>
                                        <span>Animated</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Gradient Settings -->
                            <div class="setting-card" id="gradient-settings">
                                <h3>Gradient Settings</h3>
                                <div class="gradient-controls">
                                    <div class="gradient-colors">
                                        <label>Start Color</label>
                                        <input type="color" id="gradient-start" value="#667eea">
                                        <label>End Color</label>
                                        <input type="color" id="gradient-end" value="#764ba2">
                                    </div>
                                    <div class="slider-group">
                                        <label>Gradient Angle</label>
                                        <input type="range" id="gradient-angle" min="0" max="360" value="135" class="modern-slider">
                                        <span class="slider-value">135°</span>
                                    </div>
                                </div>
                                <div class="gradient-presets" style="margin-top: 20px;">
                                    <div class="gradient-option" data-gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)">Purple Blue</div>
                                    <div class="gradient-option" data-gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)">Pink Red</div>
                                    <div class="gradient-option" data-gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)">Blue Cyan</div>
                                    <div class="gradient-option" data-gradient="linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)">Green Cyan</div>
                                    <div class="gradient-option" data-gradient="linear-gradient(135deg, #fa709a 0%, #fee140 100%)">Pink Yellow</div>
                                    <div class="gradient-option" data-gradient="linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)">Soft Pastel</div>
                                    <div class="gradient-option" data-gradient="linear-gradient(135deg, #000000 0%, #434343 100%)">Dark Gray</div>
                                    <div class="gradient-option" data-gradient="linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%, #fecfef 100%)">Soft Pink</div>
                                </div>
                                <div class="custom-gradient" style="margin-top: 20px; padding: 15px; background: #f7fafc; border-radius: 8px;">
                                    <label>Custom Gradient Colors:</label>
                                    <div class="color-inputs">
                                        <input type="color" id="custom-gradient-color1" value="#667eea">
                                        <input type="color" id="custom-gradient-color2" value="#764ba2">
                                        <input type="color" id="custom-gradient-color3" value="#667eea">
                                    </div>
                                    <button class="reset-btn" id="apply-custom-gradient">
                                        <i class="fas fa-paint-brush"></i> Apply Custom
                                    </button>
                                </div>
                            </div>

                            <!-- Pattern Settings -->
                            <div class="setting-card" id="pattern-settings" style="display: none;">
                                <h3>Pattern Settings</h3>
                                <div class="pattern-grid">
                                    <div class="pattern-option" data-pattern="dots">Dots</div>
                                    <div class="pattern-option" data-pattern="lines">Lines</div>
                                    <div class="pattern-option" data-pattern="grid">Grid</div>
                                    <div class="pattern-option" data-pattern="triangles">Triangles</div>
                                    <div class="pattern-option" data-pattern="hexagons">Hexagons</div>
                                    <div class="pattern-option" data-pattern="waves">Waves</div>
                                </div>
                                <div class="slider-group">
                                    <label>Pattern Opacity</label>
                                    <input type="range" id="pattern-opacity" min="10" max="100" value="30" class="modern-slider">
                                    <span class="slider-value">30%</span>
                                </div>
                            </div>

                            <!-- Animated Settings -->
                            <div class="setting-card" id="animated-settings" style="display: none;">
                                <h3>Animated Background Options</h3>
                                <div class="animated-presets">
                                    <div class="animated-option" data-animation="matrix-rain">Matrix Rain</div>
                                    <div class="animated-option" data-animation="floating-shapes">Floating Shapes</div>
                                    <div class="animated-option" data-animation="wave-pattern">Wave Pattern</div>
                                    <div class="animated-option" data-animation="neural-network">Neural Network</div>
                                    <div class="animated-option" data-animation="geometric-lines">Geometric Lines</div>
                                    <div class="animated-option" data-animation="plasma-field">Plasma Field</div>
                                </div>
                            </div>

                            <!-- Grid Overlay -->
                            <div class="setting-card">
                                <h3>Grid Overlay</h3>
                                <div class="toggle-group">
                                    <label class="modern-toggle">
                                        <input type="checkbox" id="grid-overlay" checked>
                                        <span class="toggle-slider"></span>
                                        <span class="toggle-label">Show grid overlay</span>
                                    </label>
                                </div>
                                <div class="slider-group">
                                    <label>Grid Opacity</label>
                                    <input type="range" id="grid-opacity" min="0" max="100" value="10" class="modern-slider">
                                    <span class="slider-value">10%</span>
                                </div>
                                <div class="setting-item">
                                    <label>Grid Animation</label>
                                    <select id="grid-animation" class="modern-select">
                                        <option value="none">None</option>
                                        <option value="slow" selected>Slow</option>
                                        <option value="medium">Medium</option>
                                        <option value="fast">Fast</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <!-- Particles Section -->
                        <div class="settings-section" id="particles">
                            <div class="section-header">
                                <h2>⭐ Particle Effects</h2>
                                <p>Add magical particle effects to your desktop</p>
                            </div>
                            
                            <div class="settings-grid">
                                <div class="setting-card">
                                    <h3>Particle System</h3>
                                    <div class="toggle-group">
                                        <label class="modern-toggle">
                                            <input type="checkbox" id="particles-enabled" checked>
                                            <span class="toggle-slider"></span>
                                            <span class="toggle-label">Enable particle effects</span>
                                        </label>
                                    </div>
                                    <div class="slider-group">
                                        <label>Particle Count</label>
                                        <input type="range" id="particle-count" min="10" max="200" value="50" step="10" class="modern-slider">
                                        <span class="slider-value">50</span>
                                    </div>
                                </div>

                                <div class="setting-card">
                                    <h3>Particle Behavior</h3>
                                    <div class="particle-behavior-grid">
                                        <div class="behavior-option" data-behavior="float">
                                            <i class="fas fa-cloud"></i>
                                            <span>Float</span>
                                            <p>Gentle floating motion</p>
                                        </div>
                                        <div class="behavior-option" data-behavior="follow">
                                            <i class="fas fa-mouse-pointer"></i>
                                            <span>Follow Cursor</span>
                                            <p>Particles follow mouse</p>
                                        </div>
                                        <div class="behavior-option" data-behavior="dodge">
                                            <i class="fas fa-arrows-alt"></i>
                                            <span>Dodge Cursor</span>
                                            <p>Particles avoid mouse</p>
                                        </div>
                                        <div class="behavior-option" data-behavior="atomic">
                                            <i class="fas fa-atom"></i>
                                            <span>Atomic</span>
                                            <p>Orbital particle system</p>
                                        </div>
                                        <div class="behavior-option" data-behavior="magnetic">
                                            <i class="fas fa-magnet"></i>
                                            <span>Magnetic</span>
                                            <p>Particles attract each other</p>
                                        </div>
                                        <div class="behavior-option" data-behavior="fireworks">
                                            <i class="fas fa-star"></i>
                                            <span>Fireworks</span>
                                            <p>Explosive bursts</p>
                                        </div>
                                        <div class="behavior-option" data-behavior="rain">
                                            <i class="fas fa-tint"></i>
                                            <span>Rain</span>
                                            <p>Falling particle rain</p>
                                        </div>
                                        <div class="behavior-option" data-behavior="constellation">
                                            <i class="fas fa-constellation"></i>
                                            <span>Constellation</span>
                                            <p>Connected star pattern</p>
                                        </div>
                                        <div class="behavior-option" data-behavior="spiral">
                                            <i class="fas fa-rotate"></i>
                                            <span>Spiral</span>
                                            <p>Spiral motion pattern</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="setting-card">
                                    <h3>Particle Appearance</h3>
                                    <div class="slider-group">
                                        <label>Particle Size</label>
                                        <input type="range" id="particle-size" min="1" max="10" value="3" step="1" class="modern-slider">
                                        <span class="slider-value">3px</span>
                                    </div>
                                    <div class="setting-item">
                                        <label>Particle Color</label>
                                        <input type="color" id="particle-color" value="#00d4ff">
                                    </div>
                                    <div class="setting-item">
                                        <label>Particle Shape</label>
                                        <select id="particle-shape" class="modern-select">
                                            <option value="circle">Circle</option>
                                            <option value="square">Square</option>
                                            <option value="star">Star</option>
                                            <option value="triangle">Triangle</option>
                                            <option value="diamond">Diamond</option>
                                        </select>
                                    </div>
                                    <div class="toggle-group">
                                        <label class="modern-toggle">
                                            <input type="checkbox" id="particle-glow" checked>
                                            <span class="toggle-slider"></span>
                                            <span class="toggle-label">Particle glow effect</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Interface Section -->
                        <div class="settings-section" id="interface">
                            <div class="section-header">
                                <h2>🖥️ Interface Settings</h2>
                                <p>Customize the desktop interface and behavior</p>
                            </div>
                            
                            <div class="settings-grid">
                                <!-- Font Settings -->
                                <div class="setting-card">
                                    <h3>Font Settings</h3>
                                    <div class="font-controls">
                                        <div class="form-group">
                                            <label>System Font</label>
                                            <select id="system-font" class="modern-select">
                                                <option value="'Rajdhani', sans-serif">Rajdhani (Default)</option>
                                                <option value="'Orbitron', monospace">Orbitron (Futuristic)</option>
                                                <option value="'Fira Code', monospace">Fira Code (Code)</option>
                                                <option value="'Roboto', sans-serif">Roboto (Clean)</option>
                                                <option value="'Open Sans', sans-serif">Open Sans (Readable)</option>
                                                <option value="'Lato', sans-serif">Lato (Modern)</option>
                                                <option value="'Montserrat', sans-serif">Montserrat (Elegant)</option>
                                                <option value="'Source Sans Pro', sans-serif">Source Sans Pro</option>
                                                <option value="'Ubuntu', sans-serif">Ubuntu</option>
                                                <option value="'JetBrains Mono', monospace">JetBrains Mono</option>
                                                <option value="'Cascadia Code', monospace">Cascadia Code</option>
                                                <option value="'SF Mono', monospace">SF Mono</option>
                                            </select>
                                        </div>
                                        <div class="slider-group">
                                            <label>Font Size</label>
                                            <input type="range" id="font-size" min="12" max="20" value="14" class="modern-slider">
                                            <span class="slider-value">14px</span>
                                        </div>
                                        <div class="setting-item">
                                            <label>Font Weight</label>
                                            <select id="font-weight" class="modern-select">
                                                <option value="300">Light</option>
                                                <option value="400" selected>Normal</option>
                                                <option value="500">Medium</option>
                                                <option value="600">Semi Bold</option>
                                                <option value="700">Bold</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <!-- Taskbar & Desktop Settings -->
                                <div class="setting-card">
                                    <h3>Taskbar & Desktop</h3>
                                    <div class="toggle-group">
                                        <label class="modern-toggle">
                                            <input type="checkbox" id="auto-hide-taskbar">
                                            <span class="toggle-slider"></span>
                                            <span class="toggle-label">Auto-hide taskbar</span>
                                        </label>
                                    </div>
                                    <div class="setting-item">
                                        <label>Taskbar Position</label>
                                        <select id="taskbar-position" class="modern-select">
                                            <option value="bottom" selected>Bottom</option>
                                            <option value="top">Top</option>
                                            <option value="left">Left</option>
                                            <option value="right">Right</option>
                                        </select>
                                    </div>
                                    <div class="toggle-group">
                                        <label class="modern-toggle">
                                            <input type="checkbox" id="show-clock" checked>
                                            <span class="toggle-slider"></span>
                                            <span class="toggle-label">Show system clock</span>
                                        </label>
                                    </div>
                                    <div class="toggle-group">
                                        <label class="modern-toggle">
                                            <input type="checkbox" id="snap-to-grid">
                                            <span class="toggle-slider"></span>
                                            <span class="toggle-label">Snap icons to grid</span>
                                        </label>
                                    </div>
                                    <div class="toggle-group">
                                        <label class="modern-toggle">
                                            <input type="checkbox" id="auto-arrange">
                                            <span class="toggle-slider"></span>
                                            <span class="toggle-label">Auto-arrange icons</span>
                                        </label>
                                    </div>
                                    <div class="slider-group">
                                        <label>Desktop Icon Spacing</label>
                                        <input type="range" id="icon-spacing" min="80" max="150" value="100" step="10" class="modern-slider">
                                        <span class="slider-value">100px</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Accessibility Section -->
                        <div class="settings-section" id="accessibility">
                            <div class="section-header">
                                <h2>♿ Accessibility Settings</h2>
                                <p>Make EmberFrame more accessible</p>
                            </div>
                            
                            <div class="settings-grid">
                                <div class="setting-card">
                                    <h3>Visual Accessibility</h3>
                                    <div class="toggle-group">
                                        <label class="modern-toggle">
                                            <input type="checkbox" id="high-contrast">
                                            <span class="toggle-slider"></span>
                                            <span class="toggle-label">High contrast mode</span>
                                        </label>
                                    </div>
                                    <div class="toggle-group">
                                        <label class="modern-toggle">
                                            <input type="checkbox" id="large-text">
                                            <span class="toggle-slider"></span>
                                            <span class="toggle-label">Large text (150%)</span>
                                        </label>
                                    </div>
                                    <div class="toggle-group">
                                        <label class="modern-toggle">
                                            <input type="checkbox" id="reduce-animations">
                                            <span class="toggle-slider"></span>
                                            <span class="toggle-label">Reduce animations</span>
                                        </label>
                                    </div>
                                    <div class="toggle-group">
                                        <label class="modern-toggle">
                                            <input type="checkbox" id="focus-indicators">
                                            <span class="toggle-slider"></span>
                                            <span class="toggle-label">Enhanced focus indicators</span>
                                        </label>
                                    </div>
                                </div>

                                <div class="setting-card">
                                    <h3>Color Accessibility</h3>
                                    <div class="setting-item">
                                        <label>Color Filter</label>
                                        <select id="color-filter" class="modern-select">
                                            <option value="none" selected>None</option>
                                            <option value="protanopia">Protanopia (Red-blind)</option>
                                            <option value="deuteranopia">Deuteranopia (Green-blind)</option>
                                            <option value="tritanopia">Tritanopia (Blue-blind)</option>
                                            <option value="grayscale">Grayscale</option>
                                        </select>
                                    </div>
                                    <div class="toggle-group">
                                        <label class="modern-toggle">
                                            <input type="checkbox" id="color-blind-safe">
                                            <span class="toggle-slider"></span>
                                            <span class="toggle-label">Color blind safe palette</span>
                                        </label>
                                    </div>
                                </div>

                                <div class="setting-card">
                                    <h3>Interaction</h3>
                                    <div class="toggle-group">
                                        <label class="modern-toggle">
                                            <input type="checkbox" id="sticky-keys">
                                            <span class="toggle-slider"></span>
                                            <span class="toggle-label">Sticky keys</span>
                                        </label>
                                    </div>
                                    <div class="toggle-group">
                                        <label class="modern-toggle">
                                            <input type="checkbox" id="mouse-keys">
                                            <span class="toggle-slider"></span>
                                            <span class="toggle-label">Mouse keys (numpad control)</span>
                                        </label>
                                    </div>
                                    <div class="slider-group">
                                        <label>Click Delay</label>
                                        <input type="range" id="click-delay" min="0" max="2000" value="500" step="100" class="modern-slider">
                                        <span class="slider-value">500ms</span>
                                    </div>
                                </div>

                                <div class="setting-card">
                                    <h3>Audio Accessibility</h3>
                                    <div class="toggle-group">
                                        <label class="modern-toggle">
                                            <input type="checkbox" id="visual-alerts">
                                            <span class="toggle-slider"></span>
                                            <span class="toggle-label">Visual alerts (flash screen)</span>
                                        </label>
                                    </div>
                                    <div class="toggle-group">
                                        <label class="modern-toggle">
                                            <input type="checkbox" id="sound-captions">
                                            <span class="toggle-slider"></span>
                                            <span class="toggle-label">Show sound captions</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Advanced Section -->
                        <div class="settings-section" id="advanced">
                            <div class="section-header">
                                <h2>🔧 Advanced Settings</h2>
                                <p>Advanced customization and developer options</p>
                            </div>
                            
                            <div class="settings-grid">
                                <div class="setting-card">
                                    <h3>Performance</h3>
                                    <div class="toggle-group">
                                        <label class="modern-toggle">
                                            <input type="checkbox" id="hardware-acceleration" checked>
                                            <span class="toggle-slider"></span>
                                            <span class="toggle-label">Hardware acceleration</span>
                                        </label>
                                    </div>
                                    <div class="setting-item">
                                        <label>Frame Rate Limit</label>
                                        <select id="frame-rate" class="modern-select">
                                            <option value="30">30 FPS</option>
                                            <option value="60" selected>60 FPS</option>
                                            <option value="120">120 FPS</option>
                                            <option value="144">144 FPS</option>
                                            <option value="0">Unlimited</option>
                                        </select>
                                    </div>
                                    <div class="setting-item">
                                        <label>Memory Management</label>
                                        <select id="memory-management" class="modern-select">
                                            <option value="conservative">Conservative</option>
                                            <option value="balanced" selected>Balanced</option>
                                            <option value="aggressive">Aggressive</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="setting-card">
                                    <h3>Developer Settings</h3>
                                    <div class="toggle-group">
                                        <label class="modern-toggle">
                                            <input type="checkbox" id="debug-mode">
                                            <span class="toggle-slider"></span>
                                            <span class="toggle-label">Debug mode</span>
                                        </label>
                                    </div>
                                    <div class="toggle-group">
                                        <label class="modern-toggle">
                                            <input type="checkbox" id="show-fps">
                                            <span class="toggle-slider"></span>
                                            <span class="toggle-label">Show FPS counter</span>
                                        </label>
                                    </div>
                                    <div class="toggle-group">
                                        <label class="modern-toggle">
                                            <input type="checkbox" id="console-logging">
                                            <span class="toggle-slider"></span>
                                            <span class="toggle-label">Enable console logging</span>
                                        </label>
                                    </div>
                                    <div class="toggle-group">
                                        <label class="modern-toggle">
                                            <input type="checkbox" id="error-reporting">
                                            <span class="toggle-slider"></span>
                                            <span class="toggle-label">Automatic error reporting</span>
                                        </label>
                                    </div>
                                </div>

                                <div class="setting-card">
                                    <h3>Experimental Features</h3>
                                    <div class="toggle-group">
                                        <label class="modern-toggle">
                                            <input type="checkbox" id="experimental-features">
                                            <span class="toggle-slider"></span>
                                            <span class="toggle-label">Enable experimental features</span>
                                        </label>
                                    </div>
                                    <div class="toggle-group">
                                        <label class="modern-toggle">
                                            <input type="checkbox" id="beta-updates">
                                            <span class="toggle-slider"></span>
                                            <span class="toggle-label">Receive beta updates</span>
                                        </label>
                                    </div>
                                </div>

                                <div class="setting-card">
                                    <h3>System Information</h3>
                                    <div class="system-info">
                                        <div class="info-item">
                                            <span>Version:</span>
                                            <span>EmberFrame 4.0.0</span>
                                        </div>
                                        <div class="info-item">
                                            <span>User Agent:</span>
                                            <span id="user-agent">Loading...</span>
                                        </div>
                                        <div class="info-item">
                                            <span>Screen:</span>
                                            <span id="screen-info">Loading...</span>
                                        </div>
                                        <div class="info-item">
                                            <span>Memory:</span>
                                            <span id="memory-info">Loading...</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
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

    static init(windowElement) {
        this.currentWindow = windowElement;
        this.settings = this.loadSettings();  // Load saved or defaults
        this.particleSystem = null;
        this.debugInterval = null;
        this.currentFPS = null;

        this.setupEventListeners();
        this.loadCurrentSettings();
        this.updateSystemInfo();
        this.initializeParticleSystem();

        console.log('🔧 Settings app initialized');
    }

    static setupEventListeners() {
        // Navigation (legacy)
        this.currentWindow.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                this.switchSection(item.dataset.section);
            });
        });

        // Category switching for new sections is handled via same nav-item mechanism

        // Color scheme selection
        this.currentWindow.querySelectorAll('.color-option').forEach(option => {
            option.addEventListener('click', () => {
                this.setColorScheme(option.dataset.scheme);
            });
        });

        // Accent colors
        this.currentWindow.querySelectorAll('.accent-color').forEach(colorEl => {
            colorEl.addEventListener('click', () => {
                this.setAccentColor(colorEl.dataset.color);
            });
        });
        this.currentWindow.querySelector('#custom-accent').addEventListener('change', (e) => {
            this.setAccentColor(e.target.value);
        });

        // Window transparency
        this.currentWindow.querySelector('#window-transparency').addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            this.settings['window-transparency'] = value;
            this.applySettingLive('window-transparency', value);
            this.saveSettings();
        });

        // Blur, shadows, glow
        ['blur-effects', 'window-shadows', 'window-glow'].forEach(id => {
            this.currentWindow.querySelector(`#${id}`).addEventListener('change', (e) => {
                const checked = e.target.checked;
                this.applySettingLive(id, checked);
                this.settings[id] = checked;
                this.saveSettings();
            });
        });

        // Icon settings
        this.currentWindow.querySelector('#icon-size').addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            this.settings['icon-size'] = value;
            this.applySettingLive('icon-size', value);
            this.saveSettings();
        });
        ['icon-shadows', 'icon-labels'].forEach(id => {
            this.currentWindow.querySelector(`#${id}`).addEventListener('change', (e) => {
                const checked = e.target.checked;
                this.applySettingLive(id, checked);
                this.settings[id] = checked;
                this.saveSettings();
            });
        });

        // Theme cards
        this.currentWindow.querySelectorAll('.theme-card').forEach(card => {
            card.addEventListener('click', () => {
                this.applyTheme(card.dataset.theme);
            });
        });

        // Animation settings
        this.currentWindow.querySelector('#animation-speed').addEventListener('change', (e) => {
            this.settings['animation-speed'] = e.target.value;
            this.saveSettings();
        });
        this.currentWindow.querySelector('#reduce-motion').addEventListener('change', (e) => {
            this.applySettingLive('reduce-motion', e.target.checked);
            this.settings['reduce-motion'] = e.target.checked;
            this.saveSettings();
        });
        this.currentWindow.querySelector('#smooth-transitions').addEventListener('change', (e) => {
            this.settings['smooth-transitions'] = e.target.checked;
            this.saveSettings();
        });

        // Background type switching
        this.currentWindow.querySelectorAll('.bg-type').forEach(typeEl => {
            typeEl.addEventListener('click', () => {
                this.setBackgroundType(typeEl.dataset.type);
            });
        });

        // Gradient settings
        this.currentWindow.querySelector('#gradient-start').addEventListener('change', (e) => {
            this.settings.gradientStart = e.target.value;
            this.applyBackground();
            this.saveSettings();
        });
        this.currentWindow.querySelector('#gradient-end').addEventListener('change', (e) => {
            this.settings.gradientEnd = e.target.value;
            this.applyBackground();
            this.saveSettings();
        });
        this.currentWindow.querySelector('#gradient-angle').addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            this.settings.gradientAngle = value;
            this.updateSliderValue('#gradient-angle', value);
            this.applyBackground();
            this.saveSettings();
        });
        this.currentWindow.querySelectorAll('.gradient-option').forEach(option => {
            option.addEventListener('click', () => {
                const gradient = option.dataset.gradient;
                this.applyGradient(gradient);
                this.settings.backgroundGradient = gradient;
                this.saveSettings();
            });
        });
        this.currentWindow.querySelector('#apply-custom-gradient').addEventListener('click', () => {
            this.applyCustomGradient();
            this.saveSettings();
        });

        // Pattern settings
        this.currentWindow.querySelectorAll('.pattern-option').forEach(opt => {
            opt.addEventListener('click', () => {
                this.setPattern(opt.dataset.pattern);
            });
        });
        this.currentWindow.querySelector('#pattern-opacity').addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            this.settings.patternOpacity = value;
            this.updateSliderValue('#pattern-opacity', value);
            this.applyBackground();
            this.saveSettings();
        });

        // Animated settings
        this.currentWindow.querySelectorAll('.animated-option').forEach(opt => {
            opt.addEventListener('click', () => {
                this.setAnimatedBackground(opt.dataset.animation);
            });
        });

        // Grid overlay
        this.currentWindow.querySelector('#grid-overlay').addEventListener('change', (e) => {
            this.applySettingLive('grid-overlay', e.target.checked);
            this.settings['grid-overlay'] = e.target.checked;
            this.saveSettings();
        });
        this.currentWindow.querySelector('#grid-opacity').addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            this.settings['grid-opacity'] = value;
            this.updateSliderValue('#grid-opacity', value);
            this.applySettingLive('grid-opacity', value);
            this.saveSettings();
        });
        this.currentWindow.querySelector('#grid-animation').addEventListener('change', (e) => {
            this.settings['grid-animation'] = e.target.value;
            this.applyGridAnimation(e.target.value);
            this.saveSettings();
        });

        // Particle system toggles & sliders
        this.currentWindow.querySelector('#particles-enabled').addEventListener('change', (e) => {
            const checked = e.target.checked;
            this.settings['particles-enabled'] = checked;
            this.applySettingLive('particles-enabled', checked);
            this.saveSettings();
        });
        this.currentWindow.querySelector('#particle-count').addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            this.settings['particle-count'] = value;
            this.updateSliderValue('#particle-count', value);
            this.applySettingLive('particle-count', value);
            this.saveSettings();
        });
        ['particle-size', 'particle-color'].forEach(id => {
            this.currentWindow.querySelector(`#${id}`).addEventListener('change', (e) => {
                let value = e.target.value;
                if (id === 'particle-size') value = parseInt(value);
                this.settings[id] = value;
                this.applySettingLive(id, value);
                this.saveSettings();
            });
        });
        this.currentWindow.querySelector('#particle-shape').addEventListener('change', (e) => {
            this.settings['particle-shape'] = e.target.value;
            this.saveSettings();
        });
        this.currentWindow.querySelector('#particle-glow').addEventListener('change', (e) => {
            this.settings['particle-glow'] = e.target.checked;
            this.saveSettings();
        });
        this.currentWindow.querySelectorAll('.behavior-option').forEach(opt => {
            opt.addEventListener('click', () => {
                this.selectParticleBehavior(opt.dataset.behavior);
            });
        });

        // Font & interface settings
        this.currentWindow.querySelector('#system-font').addEventListener('change', (e) => {
            this.applySettingLive('system-font', e.target.value);
            this.settings['system-font'] = e.target.value;
            this.saveSettings();
        });
        this.currentWindow.querySelector('#font-size').addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            this.applySettingLive('font-size', value);
            this.settings['font-size'] = value;
            this.saveSettings();
        });
        this.currentWindow.querySelector('#font-weight').addEventListener('change', (e) => {
            this.applySettingLive('font-weight', e.target.value);
            this.settings['font-weight'] = parseInt(e.target.value);
            this.saveSettings();
        });

        // Taskbar & desktop toggles/sliders
        this.currentWindow.querySelector('#auto-hide-taskbar').addEventListener('change', (e) => {
            this.applySettingLive('auto-hide-taskbar', e.target.checked);
            this.settings['auto-hide-taskbar'] = e.target.checked;
            this.saveSettings();
        });
        this.currentWindow.querySelector('#taskbar-position').addEventListener('change', (e) => {
            this.settings['taskbar-position'] = e.target.value;
            this.saveSettings();
        });
        this.currentWindow.querySelector('#show-clock').addEventListener('change', (e) => {
            this.applySettingLive('show-clock', e.target.checked);
            this.settings['show-clock'] = e.target.checked;
            this.saveSettings();
        });
        this.currentWindow.querySelector('#snap-to-grid').addEventListener('change', (e) => {
            this.settings['snap-to-grid'] = e.target.checked;
            this.saveSettings();
        });
        this.currentWindow.querySelector('#auto-arrange').addEventListener('change', (e) => {
            this.settings['auto-arrange'] = e.target.checked;
            this.saveSettings();
        });
        this.currentWindow.querySelector('#icon-spacing').addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            this.applySettingLive('icon-spacing', value);
            this.settings['icon-spacing'] = value;
            this.saveSettings();
        });

        // Accessibility toggles & selects/sliders
        ['high-contrast', 'large-text', 'reduce-animations', 'focus-indicators',
         'sticky-keys', 'mouse-keys', 'visual-alerts', 'sound-captions', 'color-blind-safe'].forEach(id => {
            this.currentWindow.querySelector(`#${id}`).addEventListener('change', (e) => {
                this.applySettingLive(id, e.target.checked);
                this.settings[id] = e.target.checked;
                this.saveSettings();
            });
        });
        this.currentWindow.querySelector('#color-filter').addEventListener('change', (e) => {
            this.applySettingLive('color-filter', e.target.value);
            this.settings['color-filter'] = e.target.value;
            this.saveSettings();
        });
        this.currentWindow.querySelector('#click-delay').addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            this.applySettingLive('click-delay', value);
            this.settings['click-delay'] = value;
            this.saveSettings();
        });

        // Advanced toggles & selects
        ['hardware-acceleration', 'debug-mode', 'show-fps', 'console-logging', 'error-reporting', 'experimental-features', 'beta-updates'].forEach(id => {
            this.currentWindow.querySelector(`#${id}`).addEventListener('change', (e) => {
                this.applySettingLive(id, e.target.checked);
                this.settings[id] = e.target.checked;
                this.saveSettings();
            });
        });
        this.currentWindow.querySelector('#frame-rate').addEventListener('change', (e) => {
            this.settings['frame-rate'] = parseInt(e.target.value);
            this.saveSettings();
        });
        this.currentWindow.querySelector('#memory-management').addEventListener('change', (e) => {
            this.settings['memory-management'] = e.target.value;
            this.saveSettings();
        });

        // Window resize: adjust canvas if needed
        window.addEventListener('resize', () => {
            if (this.particleSystem) {
                this.particleSystem.onResize();
            }
        });
    }

    static switchSection(sectionId) {
        // Update navigation
        this.currentWindow.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        this.currentWindow.querySelector(`[data-section="${sectionId}"]`).classList.add('active');

        // Update content
        this.currentWindow.querySelectorAll('.settings-section').forEach(section => {
            section.classList.remove('active');
        });
        this.currentWindow.querySelector(`#${sectionId}`).classList.add('active');
    }

    // Color Scheme logic: combine legacy modes and modern custom schemes
    static setColorScheme(scheme) {
        this.settings.colorScheme = scheme;
        // Deactivate previous selections
        this.currentWindow.querySelectorAll('.color-option').forEach(opt => {
            opt.classList.remove('active');
        });
        this.currentWindow.querySelector(`[data-scheme="${scheme}"]`).classList.add('active');

        // Apply color scheme
        this.applyColorScheme(scheme);
        this.saveSettings();
    }

    static applyColorScheme(schemeName) {
        // Legacy modes
        const body = document.body;
        body.classList.remove('light-mode', 'dark-mode', 'midnight-mode');
        if (['light','dark','midnight'].includes(schemeName)) {
            body.classList.add(`${schemeName}-mode`);
            return;
        }
        // Custom schemes
        const schemes = {
            'auto': null, // handled by system time
            'cyber-blue': {
                '--primary-blue': '#00d4ff',
                '--neon-cyan': '#00ffff',
                '--primary-bg': '#0a0a0f',
                '--secondary-bg': '#141420',
                '--tertiary-bg': '#1a1a2e'
            },
            'ember-red': {
                '--primary-blue': '#ff4500',
                '--neon-cyan': '#dc143c',
                '--primary-bg': '#1a0a00',
                '--secondary-bg': '#2d1a0a',
                '--tertiary-bg': '#3d2a1a'
            },
            'matrix-green': {
                '--primary-blue': '#00ff00',
                '--neon-cyan': '#008800',
                '--primary-bg': '#000000',
                '--secondary-bg': '#001100',
                '--tertiary-bg': '#002200'
            },
            'neon-purple': {
                '--primary-blue': '#8000ff',
                '--neon-cyan': '#4000cc',
                '--primary-bg': '#0a0010',
                '--secondary-bg': '#1a1030',
                '--tertiary-bg': '#2a2050'
            },
            'ice-blue': {
                '--primary-blue': '#80e0ff',
                '--neon-cyan': '#4080ff',
                '--primary-bg': '#050510',
                '--secondary-bg': '#101530',
                '--tertiary-bg': '#202550'
            },
            'golden-yellow': {
                '--primary-blue': '#ffd700',
                '--neon-cyan': '#ff8c00',
                '--primary-bg': '#1a1500',
                '--secondary-bg': '#2d2600',
                '--tertiary-bg': '#3d3600'
            }
        };

        const scheme = schemes[schemeName];
        if (scheme) {
            Object.keys(scheme).forEach(property => {
                document.documentElement.style.setProperty(property, scheme[property]);
            });
        }
    }

    // Accent color (legacy)
    static setAccentColor(color) {
        this.settings.accentColor = color;
        this.currentWindow.querySelectorAll('.accent-color').forEach(opt => {
            opt.classList.remove('active');
            if (opt.dataset.color === color) opt.classList.add('active');
        });
        document.documentElement.style.setProperty('--accent-color', color);
    }

    // Theme selection
    static applyTheme(themeName) {
        const themes = {
            'cyberpunk': {
                colors: {
                    '--primary-blue': '#ff0080',
                    '--neon-cyan': '#00ffff',
                    '--primary-bg': '#0a0a0f',
                    '--secondary-bg': '#141420'
                },
                background: 'linear-gradient(135deg, #0a0a0f 0%, #ff0080 100%)',
                particles: { behavior: 'follow', color: '#ff0080', count: 100 }
            },
            'synthwave': {
                colors: {
                    '--primary-blue': '#ff6b6b',
                    '--neon-cyan': '#feca57',
                    '--primary-bg': '#2d1b69',
                    '--secondary-bg': '#3d2b79'
                },
                background: 'linear-gradient(135deg, #2d1b69 0%, #ff6b6b 50%, #feca57 100%)',
                particles: { behavior: 'spiral', color: '#feca57', count: 75 }
            },
            'hacker': {
                colors: {
                    '--primary-blue': '#00ff00',
                    '--neon-cyan': '#008800',
                    '--primary-bg': '#000000',
                    '--secondary-bg': '#001100'
                },
                background: 'linear-gradient(135deg, #000000 0%, #002200 100%)',
                particles: { behavior: 'rain', color: '#00ff00', count: 150 }
            },
            'sunset': {
                colors: {
                    '--primary-blue': '#ff7f50',
                    '--neon-cyan': '#ffd700',
                    '--primary-bg': '#2c1810',
                    '--secondary-bg': '#3c2820'
                },
                background: 'linear-gradient(135deg, #ff7f50 0%, #ff6347 50%, #ffd700 100%)',
                particles: { behavior: 'float', color: '#ffd700', count: 60 }
            },
            'ocean': {
                colors: {
                    '--primary-blue': '#47b8e0',
                    '--neon-cyan': '#87ceeb',
                    '--primary-bg': '#006994',
                    '--secondary-bg': '#1079a4'
                },
                background: 'linear-gradient(135deg, #006994 0%, #47b8e0 50%, #87ceeb 100%)',
                particles: { behavior: 'float', color: '#87ceeb', count: 80 }
            },
            'forest': {
                colors: {
                    '--primary-blue': '#68b738',
                    '--neon-cyan': '#a8e6cf',
                    '--primary-bg': '#2d5016',
                    '--secondary-bg': '#3d6026'
                },
                background: 'linear-gradient(135deg, #2d5016 0%, #68b738 50%, #a8e6cf 100%)',
                particles: { behavior: 'float', color: '#a8e6cf', count: 70 }
            }
        };

        const theme = themes[themeName];
        if (theme) {
            // Apply theme colors
            Object.keys(theme.colors).forEach(prop => {
                document.documentElement.style.setProperty(prop, theme.colors[prop]);
            });
            // Apply background
            document.body.style.background = theme.background;
            // Update particle system
            this.updateParticleSystem(theme.particles);
            this.showNotification(`Applied ${themeName} theme`, 'success');
            this.settings.currentTheme = themeName;
            this.saveSettings();
        }
    }

    // Background functions
    static setBackgroundType(type) {
        this.settings.backgroundType = type;
        // Deactivate all bg-type
        this.currentWindow.querySelectorAll('.bg-type').forEach(el => {
            el.classList.remove('active');
        });
        this.currentWindow.querySelector(`[data-type="${type}"]`).classList.add('active');

        // Hide all settings
        this.currentWindow.querySelector('#gradient-settings').style.display = 'none';
        this.currentWindow.querySelector('#pattern-settings').style.display = 'none';
        this.currentWindow.querySelector('#animated-settings').style.display = 'none';

        // Show appropriate panel
        if (type === 'gradient') {
            this.currentWindow.querySelector('#gradient-settings').style.display = 'block';
        } else if (type === 'pattern') {
            this.currentWindow.querySelector('#pattern-settings').style.display = 'block';
        } else if (type === 'animated') {
            this.currentWindow.querySelector('#animated-settings').style.display = 'block';
        }

        this.applyBackground();
        this.saveSettings();
    }

    static applyBackground() {
        const type = this.settings.backgroundType;
        if (type === 'gradient') {
            const angle = this.settings.gradientAngle || 135;
            const start = this.settings.gradientStart || '#667eea';
            const end = this.settings.gradientEnd || '#764ba2';
            document.body.style.background = `linear-gradient(${angle}deg, ${start}, ${end})`;
        } else if (type === 'pattern') {
            document.body.style.background = this.generatePattern();
        }
        // image/video can be implemented later
    }

    static generatePattern() {
        const opacity = this.settings.patternOpacity || 30;
        const colorHex = this.settings.accentColor || '#00d4ff';
        const hexOpacity = Math.round(opacity * 2.55).toString(16).padStart(2, '0');
        const patterns = {
            dots: `radial-gradient(circle, ${colorHex + hexOpacity} 1px, transparent 1px)`,
            lines: `linear-gradient(90deg, ${colorHex + hexOpacity} 1px, transparent 1px)`,
            grid: `linear-gradient(${colorHex + hexOpacity} 1px, transparent 1px), linear-gradient(90deg, ${colorHex + hexOpacity} 1px, transparent 1px)`,
            triangles: `conic-gradient(from 0deg at 50% 50%, ${colorHex + hexOpacity} 120deg, transparent 120deg)`,
            hexagons: `conic-gradient(from 30deg at 50% 50%, ${colorHex + hexOpacity} 60deg, transparent 60deg)`,
            waves: `repeating-linear-gradient(45deg, ${colorHex + hexOpacity}, ${colorHex + hexOpacity} 10px, transparent 10px, transparent 20px)`
        };
        return patterns[this.settings.patternType] || patterns.dots;
    }

    static setPattern(pattern) {
        this.settings.patternType = pattern;
        this.currentWindow.querySelectorAll('.pattern-option').forEach(opt => {
            opt.classList.remove('active');
        });
        this.currentWindow.querySelector(`[data-pattern="${pattern}"]`).classList.add('active');
        this.applyBackground();
        this.saveSettings();
    }

    static applyGradient(gradient) {
        document.body.style.background = gradient;
        this.settings.backgroundGradient = gradient;
        this.showNotification('Background gradient applied', 'success');
    }

    static applyCustomGradient() {
        const c1 = this.currentWindow.querySelector('#custom-gradient-color1').value;
        const c2 = this.currentWindow.querySelector('#custom-gradient-color2').value;
        const c3 = this.currentWindow.querySelector('#custom-gradient-color3').value;
        const gradient = `linear-gradient(135deg, ${c1} 0%, ${c2} 50%, ${c3} 100%)`;
        this.applyGradient(gradient);
    }

    static setAnimatedBackground(animation) {
        this.settings.backgroundAnimation = animation;
        this.showNotification(`Applied animated background: ${animation}`, 'success');
        this.saveSettings();
        // Implementation for actual animated backgrounds should hook into a canvas or similar
    }

    // Grid overlay
    static applyGridAnimation(speed) {
        const grid = document.querySelector('.grid-background');
        if (grid) {
            let duration = '0s';
            if (speed === 'slow') duration = '20s';
            else if (speed === 'medium') duration = '10s';
            else if (speed === 'fast') duration = '5s';
            grid.style.animationDuration = duration;
            grid.style.animationPlayState = speed === 'none' ? 'paused' : 'running';
        }
    }

    // Particle System integration (modern)
    static initializeParticleSystem() {
        if (this.settings['particles-enabled']) {
            if (this.particleSystem) {
                this.destroyParticleSystem();
            }
            this.particleSystem = new ParticleSystem({
                container: document.body,
                count: this.settings['particle-count'] || 50,
                behavior: this.settings.particleBehavior || 'float',
                color: this.settings['particle-color'] || '#00d4ff',
                size: this.settings['particle-size'] || 3
            });
            this.particleSystem.start();
        }
    }

    static updateParticleSystem(options) {
        if (this.particleSystem) {
            this.particleSystem.update(options);
        }
    }

    static destroyParticleSystem() {
        if (this.particleSystem) {
            this.particleSystem.destroy();
            this.particleSystem = null;
        }
    }

    static selectParticleBehavior(behavior) {
        this.currentWindow.querySelectorAll('.behavior-option').forEach(opt => {
            opt.classList.remove('selected');
        });
        this.currentWindow.querySelector(`[data-behavior="${behavior}"]`).classList.add('selected');
        this.settings.particleBehavior = behavior;
        this.updateRangeValueById('particle-count');
        this.updateParticleSystem({ behavior });
        this.showNotification(`Particle behavior set to ${behavior}`, 'success');
        this.saveSettings();
    }

    // Interface setting applications
    static applySettingLive(settingId, value) {
        switch (settingId) {
            case 'window-transparency':
                const opacity = 1 - (value / 100);
                document.documentElement.style.setProperty('--window-opacity', opacity);
                break;
            case 'blur-effects':
                document.body.classList.toggle('no-blur', !value);
                break;
            case 'window-shadows':
                document.documentElement.style.setProperty('--window-shadow', value ? '0 12px 40px rgba(0,0,0,0.3)' : 'none');
                break;
            case 'window-glow':
                document.documentElement.style.setProperty('--window-glow', value ? '0 0 10px rgba(255,255,255,0.5)' : 'none');
                break;
            case 'icon-size':
                document.documentElement.style.setProperty('--icon-size', value + 'px');
                break;
            case 'icon-shadows':
                document.body.classList.toggle('no-icon-shadows', !value);
                break;
            case 'icon-labels':
                document.querySelectorAll('.icon-label').forEach(label => {
                    label.style.display = value ? 'block' : 'none';
                });
                break;
            case 'animation-speed':
                document.documentElement.style.setProperty('--animation-speed', value);
                break;
            case 'reduce-motion':
                document.body.classList.toggle('no-animations', value);
                break;
            case 'system-font':
                document.documentElement.style.setProperty('--system-font', value);
                document.body.style.fontFamily = value;
                break;
            case 'font-size':
                document.documentElement.style.setProperty('--base-font-size', value + 'px');
                document.body.style.fontSize = value + 'px';
                break;
            case 'font-weight':
                document.body.style.fontWeight = value;
                break;
            case 'auto-hide-taskbar':
                const taskbar = document.querySelector('.taskbar');
                if (taskbar) taskbar.classList.toggle('auto-hide', value);
                break;
            case 'show-clock':
                const clock = document.querySelector('.time-display');
                if (clock) clock.style.display = value ? 'block' : 'none';
                break;
            case 'grid-overlay':
                const gridBg = document.querySelector('.grid-background');
                if (gridBg) gridBg.style.display = value ? 'block' : 'none';
                break;
            case 'grid-opacity':
                const grid = document.querySelector('.grid-background');
                if (grid) grid.style.opacity = value / 100;
                break;
            case 'particles-enabled':
                if (value) this.initializeParticleSystem();
                else this.destroyParticleSystem();
                break;
            case 'particle-count':
                this.updateParticleSystem({ count: parseInt(value) });
                break;
            case 'particle-size':
                this.updateParticleSystem({ size: parseInt(value) });
                break;
            case 'particle-color':
                this.updateParticleSystem({ color: value });
                break;
            case 'high-contrast':
                document.body.classList.toggle('high-contrast', value);
                break;
            case 'large-text':
                document.body.classList.toggle('large-text', value);
                break;
            case 'reduce-animations':
                document.body.classList.toggle('no-animations', value);
                break;
            case 'debug-mode':
                this.toggleDebugMode(value);
                break;
            case 'show-fps':
                this.toggleFPSCounter(value);
                break;
            case 'color-filter':
                this.applyColorFilter(value);
                break;
            case 'click-delay':
                document.documentElement.style.setProperty('--click-delay', value + 'ms');
                break;
            default:
                break;
        }
    }

    // Debug and FPS Counter
    static toggleDebugMode(enabled) {
        if (enabled) {
            if (!document.getElementById('debug-panel')) {
                const debugPanel = document.createElement('div');
                debugPanel.id = 'debug-panel';
                debugPanel.style.cssText = `
                    position: fixed;
                    top: 10px;
                    left: 10px;
                    background: rgba(0, 0, 0, 0.8);
                    color: #00ff00;
                    padding: 10px;
                    border-radius: 5px;
                    font-family: monospace;
                    font-size: 12px;
                    z-index: 9999;
                    max-width: 280px;
                `;
                debugPanel.innerHTML = `
                    <div>🐛 DEBUG MODE</div>
                    <div id="debug-info">Loading...</div>
                `;
                document.body.appendChild(debugPanel);
                this.debugInterval = setInterval(() => this.updateDebugInfo(), 1000);
            }
        } else {
            const debugPanel = document.getElementById('debug-panel');
            if (debugPanel) debugPanel.remove();
            if (this.debugInterval) clearInterval(this.debugInterval);
        }
    }

    static updateDebugInfo() {
        const debugInfo = document.getElementById('debug-info');
        if (debugInfo) {
            const windowsCount = document.querySelectorAll('.window').length;
            const memory = navigator.deviceMemory || 'Unknown';
            const connection = navigator.connection?.effectiveType || 'Unknown';
            const particlesCount = this.particleSystem?.particles.length || 0;
            const fps = this.currentFPS || 'Calculating...';
            debugInfo.innerHTML = `
                <div>Windows: ${windowsCount}</div>
                <div>Memory: ${memory} GB</div>
                <div>Connection: ${connection}</div>
                <div>Particles: ${particlesCount}</div>
                <div>FPS: ${fps}</div>
            `;
        }
    }

    static toggleFPSCounter(enabled) {
        if (enabled) {
            if (!document.getElementById('fps-counter')) {
                const fpsCounter = document.createElement('div');
                fpsCounter.id = 'fps-counter';
                fpsCounter.style.cssText = `
                    position: fixed;
                    top: 10px;
                    right: 10px;
                    background: rgba(0, 0, 0, 0.8);
                    color: #00ff00;
                    padding: 5px 10px;
                    border-radius: 5px;
                    font-family: monospace;
                    font-size: 14px;
                    z-index: 9999;
                `;
                document.body.appendChild(fpsCounter);
                this.startFPSCounter();
            }
        } else {
            const fpsCounter = document.getElementById('fps-counter');
            if (fpsCounter) fpsCounter.remove();
            this.stopFPSCounter();
        }
    }

    static startFPSCounter() {
        let lastTime = performance.now();
        let frameCount = 0;
        const countFPS = () => {
            frameCount++;
            const now = performance.now();
            if (now - lastTime >= 1000) {
                this.currentFPS = Math.round((frameCount * 1000) / (now - lastTime));
                const counter = document.getElementById('fps-counter');
                if (counter) counter.textContent = `${this.currentFPS} FPS`;
                frameCount = 0;
                lastTime = now;
            }
            if (document.getElementById('fps-counter')) {
                requestAnimationFrame(countFPS);
            }
        };
        requestAnimationFrame(countFPS);
    }

    static stopFPSCounter() {
        this.currentFPS = null;
    }

    // Color filter with SVG filters
    static applyColorFilter(filter) {
        const filtersMap = {
            'none': 'none',
            'protanopia': 'url(#protanopia)',
            'deuteranopia': 'url(#deuteranopia)',
            'tritanopia': 'url(#tritanopia)',
            'grayscale': 'grayscale(100%)'
        };
        if (filter !== 'none' && !document.getElementById('color-filter-svg')) {
            const svgNS = 'http://www.w3.org/2000/svg';
            const svg = document.createElementNS(svgNS, 'svg');
            svg.id = 'color-filter-svg';
            svg.style.display = 'none';
            svg.innerHTML = `
                <defs>
                    <filter id="protanopia">
                        <feColorMatrix values="0.567,0.433,0,0,0 0.558,0.442,0,0,0 0,0.242,0.758,0,0 0,0,0,1,0"/>
                    </filter>
                    <filter id="deuteranopia">
                        <feColorMatrix values="0.625,0.375,0,0,0 0.7,0.3,0,0,0 0,0.3,0.7,0,0 0,0,0,1,0"/>
                    </filter>
                    <filter id="tritanopia">
                        <feColorMatrix values="0.95,0.05,0,0,0 0,0.433,0.567,0,0 0,0.475,0.525,0,0 0,0,0,1,0"/>
                    </filter>
                </defs>
            `;
            document.body.appendChild(svg);
        }
        document.body.style.filter = filtersMap[filter] || 'none';
    }

    // Load settings into UI controls
    static loadCurrentSettings() {
        Object.keys(this.settings).forEach(key => {
            const element = this.currentWindow.querySelector(`#${key}`);
            if (element) {
                if (element.type === 'checkbox') {
                    element.checked = this.settings[key];
                } else if (element.type === 'range') {
                    element.value = this.settings[key];
                    this.updateSliderValue(`#${key}`, this.settings[key]);
                } else if (element.type === 'select-one') {
                    element.value = this.settings[key];
                } else if (element.type === 'color') {
                    element.value = this.settings[key];
                }
            }
        });

        // Activate legacy color-option if matches
        const cs = this.settings.colorScheme || 'auto';
        if (cs) {
            const csEl = this.currentWindow.querySelector(`[data-scheme="${cs}"]`);
            if (csEl) csEl.classList.add('active');
        }

        // Activate legacy accent-color
        const ac = this.settings.accentColor || '#00d4ff';
        const acEl = this.currentWindow.querySelector(`.accent-color[data-color="${ac}"]`);
        if (acEl) acEl.classList.add('active');

        // Activate background type
        const bt = this.settings.backgroundType || 'gradient';
        const btEl = this.currentWindow.querySelector(`.bg-type[data-type="${bt}"]`);
        if (btEl) btEl.classList.add('active');
        this.setBackgroundType(bt);

        // Activate pattern type
        const pt = this.settings.patternType || 'dots';
        const ptEl = this.currentWindow.querySelector(`.pattern-option[data-pattern="${pt}"]`);
        if (ptEl) ptEl.classList.add('active');

        // Activate animated background if present
        const anim = this.settings.backgroundAnimation;
        if (anim) {
            const animEl = this.currentWindow.querySelector(`.animated-option[data-animation="${anim}"]`);
            if (animEl) animEl.classList.add('selected');
        }

        // Activate particle behavior
        const pb = this.settings.particleBehavior || 'float';
        const pbEl = this.currentWindow.querySelector(`.behavior-option[data-behavior="${pb}"]`);
        if (pbEl) pbEl.classList.add('selected');

        // Activate theme if saved
        const th = this.settings.currentTheme;
        if (th) {
            const thEl = this.currentWindow.querySelector(`.theme-card[data-theme="${th}"]`);
            if (thEl) thEl.classList.add('active');
        }

        // Apply live for all loaded settings
        Object.keys(this.settings).forEach(key => {
            this.applySettingLive(key, this.settings[key]);
        });
    }

    // Update slider-value next to range inputs
    static updateSliderValue(selector, value) {
        const input = this.currentWindow.querySelector(selector);
        if (!input) return;
        const display = input.parentElement.querySelector('.slider-value');
        if (display) {
            let text = value;
            if (selector.includes('opacity') || selector.includes('transparency')) text += '%';
            else if (selector.includes('angle')) text += '°';
            else if (selector.includes('size') && !selector.includes('font')) text += 'px';
            else if (selector.includes('speed') && (selector.includes('grid') || selector.includes('animation'))) {
                if (selector.includes('particle')) text += 'x';
                else if (selector.includes('grid')) text += 's';
            } else if (selector.includes('delay')) text += 'ms';
            display.textContent = text;
        }
    }

    // Update slider by id
    static updateRangeValueById(id) {
        const input = this.currentWindow.querySelector(`#${id}`);
        if (input) {
            this.updateSliderValue(`#${id}`, input.value);
        }
    }

    // System info
    static updateSystemInfo() {
        const uaEl = this.currentWindow.querySelector('#user-agent');
        const screenEl = this.currentWindow.querySelector('#screen-info');
        const memEl = this.currentWindow.querySelector('#memory-info');

        if (uaEl) uaEl.textContent = navigator.userAgent.slice(0, 80) + '...';
        if (screenEl) screenEl.textContent = \`\${screen.width}x\${screen.height} (\${window.devicePixelRatio}x DPR)\`;
        if (memEl) {
            const memory = navigator.deviceMemory || 'Unknown';
            memEl.textContent = \`\${memory} GB available\`;
        }
    }

    // Persistent storage
    static saveSettings() {
        try {
            localStorage.setItem('emberframe-settings', JSON.stringify(this.settings));
            this.showNotification('Settings saved automatically', 'success');
        } catch (err) {
            console.error('Failed to save settings:', err);
        }
    }

    static loadSettings() {
        try {
            const saved = localStorage.getItem('emberframe-settings');
            return saved ? JSON.parse(saved) : this.getDefaultSettings();
        } catch {
            return this.getDefaultSettings();
        }
    }

    static getDefaultSettings() {
        return {
            // Appearance
            colorScheme: 'auto',
            accentColor: '#00d4ff',
            'window-transparency': 5,
            'blur-effects': true,
            'window-shadows': true,
            'window-glow': true,

            // Theme
            currentTheme: 'cyberpunk',

            // Background
            backgroundType: 'gradient',
            gradientStart: '#667eea',
            gradientEnd: '#764ba2',
            gradientAngle: 135,
            patternType: 'dots',
            patternOpacity: 30,
            backgroundAnimation: null,
            'grid-overlay': true,
            'grid-opacity': 10,
            'grid-animation': 'slow',

            // Particles
            'particles-enabled': true,
            'particle-count': 50,
            particleBehavior: 'float',
            'particle-size': 3,
            'particle-color': '#00d4ff',
            'particle-shape': 'circle',
            'particle-glow': true,

            // Interface
            'system-font': "'Rajdhani', sans-serif",
            'font-size': 14,
            'font-weight': 400,
            'auto-hide-taskbar': false,
            'taskbar-position': 'bottom',
            'show-clock': true,
            'snap-to-grid': false,
            'auto-arrange': false,
            'icon-spacing': 100,
            'icon-size': 48,
            'icon-shadows': true,
            'icon-labels': true,

            // Accessibility
            'high-contrast': false,
            'large-text': false,
            'reduce-animations': false,
            'focus-indicators': true,
            'color-filter': 'none',
            'color-blind-safe': false,
            'sticky-keys': false,
            'mouse-keys': false,
            'click-delay': 500,
            'visual-alerts': false,
            'sound-captions': false,

            // Advanced
            'hardware-acceleration': true,
            'frame-rate': 60,
            'memory-management': 'balanced',
            'debug-mode': false,
            'show-fps': false,
            'console-logging': false,
            'error-reporting': false,
            'experimental-features': false,
            'beta-updates': false
        };
    }

    static resetToDefaults() {
        if (confirm('Reset all settings to defaults? This cannot be undone.')) {
            this.settings = this.getDefaultSettings();
            this.loadCurrentSettings();
            this.saveSettings();
            this.showNotification('Settings reset to defaults', 'success');
        }
    }

    // Notifications (simple)
    static showNotification(message, type = 'info') {
        if (window.Notification) {
            window.Notification[type](message);
        } else {
            console.log(`[\${type.toUpperCase()}] \${message}`);
        }
    }

    static onClose(windowElement) {
        this.saveSettings();
        if (this.particleSystem) this.destroyParticleSystem();
        if (this.debugInterval) clearInterval(this.debugInterval);
        return true;
    }

    // CSS Styles (merged and slimmed)
    static getStyles() {
        return `<style>
            :root {
                --accent-color: #00d4ff;
                --primary-blue: #00d4ff;
                --neon-cyan: #00ffff;
                --primary-bg: #f8f9fa;
                --secondary-bg: #e9ecef;
                --tertiary-bg: #dcdcdc;
                --window-shadow: 0 12px 40px rgba(0,0,0,0.3);
                --window-glow: 0 0 10px rgba(255,255,255,0.5);
                --system-font: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                --base-font-size: 14px;
                --icon-size: 48px;
                --animation-speed: 0.3;
            }

            body {
                margin: 0;
                padding: 0;
                font-family: var(--system-font);
                font-size: var(--base-font-size);
                background: var(--primary-bg);
                color: #495057;
                transition: background 0.3s ease;
            }

            .enhanced-settings {
                display: flex;
                height: 100%;
                background: var(--secondary-bg);
                overflow: hidden;
            }

            .settings-sidebar {
                width: 220px;  /* Slimmer sidebar */
                background: linear-gradient(180deg, #343a40 0%, #495057 100%);
                color: white;
                display: flex;
                flex-direction: column;
                box-shadow: 2px 0 10px rgba(0,0,0,0.1);
                z-index: 1;
            }

            .settings-logo {
                padding: 20px 15px;
                text-align: center;
                border-bottom: 1px solid rgba(255,255,255,0.1);
                background: rgba(0,0,0,0.2);
            }

            .logo-icon {
                font-size: 28px;
                margin-bottom: 8px;
            }

            .logo-text {
                font-size: 16px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 1px;
            }

            .settings-nav {
                flex: 1;
                padding: 15px 0;
                overflow-y: auto;
            }

            .nav-item {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 12px 20px;
                cursor: pointer;
                transition: all 0.3s ease;
                border-left: 3px solid transparent;
                font-weight: 500;
            }

            .nav-item:hover {
                background: rgba(255,255,255,0.1);
                border-left-color: rgba(255,255,255,0.3);
            }

            .nav-item.active {
                background: linear-gradient(90deg, rgba(0,123,255,0.2), rgba(0,123,255,0.1));
                border-left-color: #007bff;
                color: #87ceeb;
            }

            .nav-item i {
                width: 18px;
                text-align: center;
                font-size: 14px;
            }

            .settings-content {
                flex: 1;
                overflow-y: auto;
                padding: 20px 25px;
                background: var(--primary-bg);
            }

            .settings-section {
                display: none;
            }

            .settings-section.active {
                display: block;
                animation: slideIn 0.4s ease-out;
            }

            .section-header {
                margin-bottom: 20px;
            }

            .section-header h2 {
                margin: 0 0 6px 0;
                color: #343a40;
                font-size: 24px;
                font-weight: 700;
                border-bottom: 2px solid var(--primary-blue);
                padding-bottom: 10px;
            }

            .section-header p {
                margin: 0;
                color: #6c757d;
                font-size: 14px;
            }

            .settings-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 15px;
            }

            .setting-card {
                background: white;
                border-radius: 12px;
                padding: 20px;
                box-shadow: 0 2px 12px rgba(0,0,0,0.08);
                border: 1px solid #e9ecef;
                transition: all 0.3s ease;
            }

            .setting-card:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(0,0,0,0.12);
            }

            .setting-card.full-width {
                grid-column: 1 / -1;
            }

            .setting-card h3 {
                margin: 0 0 15px 0;
                color: #343a40;
                font-size: 16px;
                font-weight: 600;
            }

            /* Color Scheme Selector */
            .color-scheme-selector {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
                gap: 12px;
            }

            .color-option {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 6px;
                cursor: pointer;
                padding: 12px;
                border-radius: 10px;
                transition: all 0.3s ease;
                border: 2px solid transparent;
            }

            .color-option:hover {
                background: #f8f9fa;
                transform: scale(1.03);
            }

            .color-option.active {
                border-color: #007bff;
                background: #e3f2fd;
            }

            .color-preview {
                width: 36px;
                height: 36px;
                border-radius: 50%;
                margin-bottom: 4px;
            }

            .auto-preview {
                background: linear-gradient(45deg, #343a40 50%, white 50%);
            }

            .light-preview {
                background: linear-gradient(45deg, #f8f9fa, white);
            }

            .dark-preview {
                background: linear-gradient(45deg, #343a40, #495057);
            }

            .midnight-preview {
                background: linear-gradient(45deg, #000, #1a1a1a);
            }

            /* Accent Colors */
            .accent-colors {
                display: grid;
                grid-template-columns: repeat(6, 1fr);
                gap: 8px;
                margin-bottom: 12px;
            }

            .accent-color {
                width: 36px;
                height: 36px;
                border-radius: 50%;
                cursor: pointer;
                transition: all 0.3s ease;
                border: 3px solid transparent;
            }

            .accent-color:hover {
                transform: scale(1.1);
            }

            .accent-color.active {
                border-color: white;
                box-shadow: 0 0 0 2px #007bff;
            }

            /* Sliders */
            .slider-group {
                display: flex;
                align-items: center;
                gap: 10px;
                margin-bottom: 12px;
            }

            .slider-group label {
                font-weight: 500;
                color: #495057;
                white-space: nowrap;
                min-width: 100px;
            }

            .modern-slider {
                flex: 1;
                height: 5px;
                border-radius: 3px;
                background: #e9ecef;
                outline: none;
                -webkit-appearance: none;
            }

            .modern-slider::-webkit-slider-thumb {
                -webkit-appearance: none;
                width: 18px;
                height: 18px;
                border-radius: 50%;
                background: linear-gradient(45deg, #007bff, #0056b3);
                cursor: pointer;
                box-shadow: 0 2px 6px rgba(0,123,255,0.3);
                transition: all 0.3s ease;
            }

            .modern-slider::-webkit-slider-thumb:hover {
                transform: scale(1.2);
                box-shadow: 0 4px 12px rgba(0,123,255,0.5);
            }

            .slider-value {
                font-weight: 600;
                color: #007bff;
                min-width: 40px;
                text-align: right;
            }

            /* Toggles */
            .toggle-group {
                margin-bottom: 12px;
            }

            .modern-toggle {
                display: flex;
                align-items: center;
                gap: 10px;
                cursor: pointer;
                user-select: none;
            }

            .modern-toggle input[type="checkbox"] {
                display: none;
            }

            .toggle-slider {
                width: 44px;
                height: 24px;
                background: #ccc;
                border-radius: 12px;
                position: relative;
                transition: all 0.3s ease;
            }

            .toggle-slider::before {
                content: '';
                width: 20px;
                height: 20px;
                background: white;
                border-radius: 50%;
                position: absolute;
                top: 2px;
                left: 2px;
                transition: all 0.3s ease;
                box-shadow: 0 1px 4px rgba(0,0,0,0.2);
            }

            .modern-toggle input:checked + .toggle-slider {
                background: linear-gradient(45deg, #007bff, #0056b3);
            }

            .modern-toggle input:checked + .toggle-slider::before {
                transform: translateX(20px);
            }

            .toggle-label {
                font-weight: 500;
                color: #495057;
            }

            /* Theme Grid */
            .theme-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
                gap: 15px;
            }

            .theme-card {
                cursor: pointer;
                border-radius: 12px;
                overflow: hidden;
                transition: all 0.3s ease;
                border: 2px solid #e9ecef;
                background: white;
                text-align: center;
                padding: 12px;
            }

            .theme-card:hover {
                transform: translateY(-4px);
                box-shadow: 0 10px 30px rgba(0,0,0,0.15);
            }

            .theme-card.active {
                border-color: #007bff;
                box-shadow: 0 6px 20px rgba(0,123,255,0.3);
            }

            .theme-preview {
                height: 80px;
                border-radius: 8px;
                margin-bottom: 10px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.2);
            }

            .theme-card h3 {
                margin: 8px 0 4px 0;
                color: #343a40;
                font-size: 14px;
                font-weight: 600;
            }

            .theme-card p {
                margin: 0;
                color: #6c757d;
                font-size: 12px;
            }

            /* Background Types */
            .background-types {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
                gap: 10px;
                margin-bottom: 10px;
            }

            .bg-type {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 8px;
                padding: 15px;
                border: 2px solid #e9ecef;
                border-radius: 10px;
                cursor: pointer;
                transition: all 0.3s ease;
                background: white;
                font-size: 12px;
            }

            .bg-type:hover {
                border-color: #007bff;
                background: #f8f9fa;
            }

            .bg-type.active {
                border-color: #007bff;
                background: #e3f2fd;
                color: #007bff;
            }

            .bg-type i {
                font-size: 20px;
            }

            /* Gradient Controls */
            .gradient-controls {
                display: flex;
                flex-direction: column;
                gap: 12px;
            }

            .gradient-colors {
                display: grid;
                grid-template-columns: 1fr auto 1fr auto;
                gap: 8px;
                align-items: center;
            }

            .gradient-colors label {
                font-weight: 500;
                color: #495057;
            }

            .gradient-colors input[type="color"] {
                width: 36px;
                height: 28px;
                border: none;
                border-radius: 6px;
                cursor: pointer;
            }

            /* Pattern Grid */
            .pattern-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 8px;
                margin-bottom: 10px;
            }

            .pattern-option {
                padding: 12px;
                text-align: center;
                border: 2px solid #e9ecef;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.3s ease;
                font-weight: 500;
                font-size: 12px;
            }

            .pattern-option:hover {
                border-color: #007bff;
                background: #f8f9fa;
            }

            .pattern-option.active {
                border-color: #007bff;
                background: #e3f2fd;
                color: #007bff;
            }

            /* Animated Presets */
            .animated-presets {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
                gap: 10px;
            }

            .animated-option {
                padding: 15px;
                background: #f7fafc;
                border: 2px solid #e9ecef;
                border-radius: 8px;
                text-align: center;
                cursor: pointer;
                transition: all 0.3s ease;
                font-weight: 500;
                font-size: 12px;
            }

            .animated-option:hover {
                border-color: #007bff;
                background: #edf2f7;
            }

            .animated-option.selected {
                border-color: #007bff;
                background: #e3f2fd;
                color: #007bff;
            }

            /* Particle Behavior Grid */
            .particle-behavior-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
                gap: 10px;
                margin-top: 10px;
            }

            .behavior-option {
                text-align: center;
                padding: 12px;
                border: 2px solid #e9ecef;
                border-radius: 10px;
                cursor: pointer;
                transition: all 0.3s ease;
                background: white;
                font-size: 12px;
            }

            .behavior-option:hover {
                border-color: #007bff;
                background: #f8f9fa;
            }

            .behavior-option.selected {
                border-color: #007bff;
                background: #e3f2fd;
                color: #007bff;
            }

            .behavior-option i {
                font-size: 18px;
                color: #007bff;
                margin-bottom: 6px;
            }

            .behavior-option span {
                display: block;
                font-weight: 600;
                color: #2d3748;
                margin-bottom: 4px;
            }

            .behavior-option p {
                margin: 0;
                font-size: 10px;
                color: #718096;
            }

            /* Font Controls */
            .font-controls {
                display: flex;
                flex-direction: column;
                gap: 12px;
            }

            .form-group {
                margin-bottom: 12px;
            }

            .form-group label {
                display: block;
                margin-bottom: 4px;
                font-weight: 500;
                color: #495057;
                font-size: 12px;
            }

            .modern-select {
                width: 100%;
                padding: 8px 12px;
                border: 1px solid #e9ecef;
                border-radius: 6px;
                background: white;
                font-size: 12px;
                transition: all 0.3s ease;
            }

            .modern-select:focus {
                outline: none;
                border-color: #007bff;
                box-shadow: 0 0 0 2px rgba(0,123,255,0.1);
            }

            /* Info Items */
            .system-info {
                background: #f7fafc;
                padding: 15px;
                border-radius: 8px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }

            .info-item {
                display: flex;
                justify-content: space-between;
                padding: 6px 0;
                border-bottom: 1px solid #e9ecef;
                font-size: 12px;
            }

            .info-item:last-child {
                border-bottom: none;
            }

            /* Full-width reset/apply button for custom gradient */
            .reset-btn {
                padding: 8px 12px;
                background: linear-gradient(45deg, #dc3545, #c82333);
                color: white;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                font-weight: 600;
                font-size: 12px;
                transition: all 0.3s ease;
                display: inline-flex;
                align-items: center;
                gap: 6px;
            }

            .reset-btn:hover {
                transform: translateY(-1px);
                box-shadow: 0 4px 12px rgba(220,53,69,0.4);
            }

            /* Responsive */
            @media (max-width: 768px) {
                .enhanced-settings {
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
                }

                .nav-item {
                    flex-shrink: 0;
                    padding: 8px 12px;
                }

                .settings-grid, .theme-grid, .particle-behavior-grid, .gradient-presets {
                    grid-template-columns: 1fr 1fr !important;
                }

                .setting-card {
                    padding: 15px;
                }

                .section-header h2 {
                    font-size: 20px;
                    border-bottom-width: 2px;
                }

                .slider-group label {
                    min-width: 80px;
                }

                .setting-item {
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 8px;
                }

                .setting-item input[type="range"], .setting-item select {
                    width: 100%;
                }
            }

            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateY(15px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        </style>`;
    }
}

// Enhanced Particle System (modern)
class ParticleSystem {
    constructor(options) {
        this.container = options.container;
        this.count = options.count || 50;
        this.behavior = options.behavior || 'float';
        this.color = options.color || '#00d4ff';
        this.size = options.size || 3;
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.canvas = null;
        this.ctx = null;
        this.animationId = null;

        this.setupCanvas();
        this.setupMouse();
        this.createParticles();
    }

    setupCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: -1;
        `;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext('2d');
        this.container.appendChild(this.canvas);

        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        });
    }

    setupMouse() {
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }

    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.count; i++) {
            const angle = Math.random() * Math.PI * 2;
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                life: Math.random(),
                maxLife: Math.random() * 100 + 50,
                angle: angle,
                speed: Math.random() * 2 + 0.5
            });
        }
    }

    update(options) {
        if (options.count !== undefined) {
            this.count = options.count;
            this.createParticles();
        }
        if (options.behavior !== undefined) {
            this.behavior = options.behavior;
        }
        if (options.color !== undefined) {
            this.color = options.color;
        }
        if (options.size !== undefined) {
            this.size = options.size;
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach((particle, idx) => {
            this.updateParticle(particle, idx);
            this.drawParticle(particle);
        });

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    updateParticle(particle, index) {
        switch (this.behavior) {
            case 'float':
                particle.x += particle.vx;
                particle.y += particle.vy;
                break;

            case 'follow':
                const fdx = this.mouse.x - particle.x;
                const fdy = this.mouse.y - particle.y;
                particle.vx += fdx * 0.0001;
                particle.vy += fdy * 0.0001;
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.vx *= 0.95;
                particle.vy *= 0.95;
                break;

            case 'dodge':
                const ddx = this.mouse.x - particle.x;
                const ddy = this.mouse.y - particle.y;
                const dist = Math.sqrt(ddx * ddx + ddy * ddy);
                if (dist < 100) {
                    particle.vx -= ddx * 0.001;
                    particle.vy -= ddy * 0.001;
                }
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.vx *= 0.98;
                particle.vy *= 0.98;
                break;

            case 'atomic':
                const cx = this.canvas.width / 2;
                const cy = this.canvas.height / 2;
                const radius = 80 + index * 10;
                particle.angle += 0.02;
                particle.x = cx + Math.cos(particle.angle) * radius;
                particle.y = cy + Math.sin(particle.angle) * radius;
                break;

            case 'magnetic':
                this.particles.forEach((other, oi) => {
                    if (index !== oi) {
                        const dx = other.x - particle.x;
                        const dy = other.y - particle.y;
                        const d = Math.sqrt(dx * dx + dy * dy);
                        if (d < 100 && d > 0) {
                            particle.vx += dx * 0.00001;
                            particle.vy += dy * 0.00001;
                        }
                    }
                });
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.vx *= 0.99;
                particle.vy *= 0.99;
                break;

            case 'fireworks':
                particle.life++;
                if (particle.life > particle.maxLife) {
                    particle.x = Math.random() * this.canvas.width;
                    particle.y = this.canvas.height;
                    particle.vx = (Math.random() - 0.5) * 10;
                    particle.vy = -Math.random() * 10 - 5;
                    particle.life = 0;
                }
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.vy += 0.1; // gravity
                break;

            case 'rain':
                particle.y += particle.speed * 3;
                if (particle.y > this.canvas.height) {
                    particle.y = -10;
                    particle.x = Math.random() * this.canvas.width;
                }
                break;

            case 'constellation':
                particle.x += particle.vx * 0.5;
                particle.y += particle.vy * 0.5;
                this.particles.forEach((other, oi) => {
                    if (index !== oi) {
                        const dx = other.x - particle.x;
                        const dy = other.y - particle.y;
                        const d = Math.sqrt(dx * dx + dy * dy);
                        if (d < 150) {
                            this.ctx.strokeStyle = this.color + '20';
                            this.ctx.lineWidth = 1;
                            this.ctx.beginPath();
                            this.ctx.moveTo(particle.x, particle.y);
                            this.ctx.lineTo(other.x, other.y);
                            this.ctx.stroke();
                        }
                    }
                });
                break;

            case 'spiral':
                const scx = this.canvas.width / 2;
                const scy = this.canvas.height / 2;
                particle.angle += 0.05;
                const sRadius = (particle.angle * 2) % 200;
                particle.x = scx + Math.cos(particle.angle) * sRadius;
                particle.y = scy + Math.sin(particle.angle) * sRadius;
                break;
        }

        // Boundary wrap
        if (particle.x < 0) particle.x = this.canvas.width;
        if (particle.x > this.canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = this.canvas.height;
        if (particle.y > this.canvas.height) particle.y = 0;
    }

    drawParticle(particle) {
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, this.size, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.shadowColor = this.color;
        this.ctx.shadowBlur = this.size * 2;
        this.ctx.fill();
        this.ctx.shadowBlur = 0;
    }

    start() {
        this.animate();
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }

    onResize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
}

window.Settings = Settings;
window.ParticleSystem = ParticleSystem;
