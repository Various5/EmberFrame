/**
 * APP_METADATA
 * @name Settings
 * @icon fas fa-cog
 * @description Complete system customization with particles, backgrounds, themes and intelligent presets
 * @category System
 * @version 6.0.0
 * @author EmberFrame Team
 * @enabled true
 */

class Settings {
    static createWindow() {
        return {
            title: '⚙️ EmberFrame Settings Pro',
            width: '1000px',
            height: '850px',
            autoSize: false,
            content: `
                <div class="settings-container">
                    <!-- Sidebar Navigation -->
                    <div class="settings-sidebar">
                        <div class="settings-header">
                            <div class="settings-logo">⚙️</div>
                            <div class="settings-title">Settings Pro</div>
                            <div class="settings-version">v6.0</div>
                        </div>
                        
                        <div class="settings-nav">
                            <div class="nav-item active" data-section="presets">
                                <i class="fas fa-magic"></i>
                                <span>Quick Presets</span>
                            </div>
                            <div class="nav-item" data-section="appearance">
                                <i class="fas fa-palette"></i>
                                <span>Appearance</span>
                            </div>
                            <div class="nav-item" data-section="backgrounds">
                                <i class="fas fa-image"></i>
                                <span>Backgrounds</span>
                            </div>
                            <div class="nav-item" data-section="particles">
                                <i class="fas fa-sparkles"></i>
                                <span>Particles</span>
                            </div>
                            <div class="nav-item" data-section="interface">
                                <i class="fas fa-desktop"></i>
                                <span>Interface</span>
                            </div>
                            <div class="nav-item" data-section="advanced">
                                <i class="fas fa-cogs"></i>
                                <span>Advanced</span>
                            </div>
                        </div>
                    </div>

                    <!-- Main Content -->
                    <div class="settings-content">
                        
                        <!-- Quick Presets Section -->
                        <div class="settings-section active" id="presets">
                            <div class="section-title">🎯 Quick Presets</div>
                            
                            <div class="setting-group">
                                <label>Theme Presets</label>
                                <div class="preset-grid">
                                    <div class="preset-card" data-preset="cyberpunk">
                                        <div class="preset-preview cyberpunk-preview"></div>
                                        <div class="preset-name">Cyberpunk</div>
                                        <div class="preset-desc">Neon lights, matrix rain, cyber colors</div>
                                    </div>
                                    <div class="preset-card" data-preset="space">
                                        <div class="preset-preview space-preview"></div>
                                        <div class="preset-name">Deep Space</div>
                                        <div class="preset-desc">Starfield, cosmic particles, dark theme</div>
                                    </div>
                                    <div class="preset-card" data-preset="ocean">
                                        <div class="preset-preview ocean-preview"></div>
                                        <div class="preset-name">Ocean Depths</div>
                                        <div class="preset-desc">Flowing waves, blue gradients, calm</div>
                                    </div>
                                    <div class="preset-card" data-preset="forest">
                                        <div class="preset-preview forest-preview"></div>
                                        <div class="preset-name">Mystic Forest</div>
                                        <div class="preset-desc">Green particles, nature colors</div>
                                    </div>
                                    <div class="preset-card" data-preset="synthwave">
                                        <div class="preset-preview synthwave-preview"></div>
                                        <div class="preset-name">Synthwave</div>
                                        <div class="preset-desc">80s retro, pink/purple, grid patterns</div>
                                    </div>
                                    <div class="preset-card" data-preset="minimal">
                                        <div class="preset-preview minimal-preview"></div>
                                        <div class="preset-name">Minimal</div>
                                        <div class="preset-desc">Clean, simple, productivity focused</div>
                                    </div>
                                    <div class="preset-card" data-preset="aurora">
                                        <div class="preset-preview aurora-preview"></div>
                                        <div class="preset-name">Aurora</div>
                                        <div class="preset-desc">Northern lights, flowing colors</div>
                                    </div>
                                    <div class="preset-card" data-preset="volcanic">
                                        <div class="preset-preview volcanic-preview"></div>
                                        <div class="preset-name">Volcanic</div>
                                        <div class="preset-desc">Fire effects, lava colors, intense</div>
                                    </div>
                                    <div class="preset-card" data-preset="gaming">
                                        <div class="preset-preview gaming-preview"></div>
                                        <div class="preset-name">Gaming</div>
                                        <div class="preset-desc">High performance, responsive particles</div>
                                    </div>
                                    <div class="preset-card" data-preset="productivity">
                                        <div class="preset-preview productivity-preview"></div>
                                        <div class="preset-name">Productivity</div>
                                        <div class="preset-desc">Subtle effects, focus-friendly</div>
                                    </div>
                                    <div class="preset-card" data-preset="party">
                                        <div class="preset-preview party-preview"></div>
                                        <div class="preset-name">Party Mode</div>
                                        <div class="preset-desc">Colorful, energetic, fun effects</div>
                                    </div>
                                    <div class="preset-card" data-preset="zen">
                                        <div class="preset-preview zen-preview"></div>
                                        <div class="preset-name">Zen Garden</div>
                                        <div class="preset-desc">Peaceful, meditative, soft</div>
                                    </div>
                                </div>
                            </div>

                            <div class="setting-group">
                                <label>Custom Profiles</label>
                                <div class="profile-management">
                                    <div class="profile-list" id="profile-list">
                                        <!-- Profiles will be populated here -->
                                    </div>
                                    <div class="profile-controls">
                                        <input type="text" id="new-profile-name" placeholder="Profile name..." class="profile-input">
                                        <button id="save-profile" class="action-btn">💾 Save Current</button>
                                        <button id="load-profile" class="action-btn">📂 Load Profile</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Appearance Section -->
                        <div class="settings-section" id="appearance">
                            <div class="section-title">🎨 Appearance</div>
                            
                            <div class="setting-group">
                                <label>Color Scheme</label>
                                <div class="color-schemes">
                                    <div class="color-scheme active" data-scheme="dark">
                                        <div class="scheme-preview dark"></div>
                                        <span>Dark</span>
                                    </div>
                                    <div class="color-scheme" data-scheme="light">
                                        <div class="scheme-preview light"></div>
                                        <span>Light</span>
                                    </div>
                                    <div class="color-scheme" data-scheme="cyber">
                                        <div class="scheme-preview cyber"></div>
                                        <span>Cyber</span>
                                    </div>
                                    <div class="color-scheme" data-scheme="neon">
                                        <div class="scheme-preview neon"></div>
                                        <span>Neon</span>
                                    </div>
                                    <div class="color-scheme" data-scheme="matrix">
                                        <div class="scheme-preview matrix"></div>
                                        <span>Matrix</span>
                                    </div>
                                    <div class="color-scheme" data-scheme="synthwave">
                                        <div class="scheme-preview synthwave"></div>
                                        <span>Synthwave</span>
                                    </div>
                                    <div class="color-scheme" data-scheme="ocean">
                                        <div class="scheme-preview ocean"></div>
                                        <span>Ocean</span>
                                    </div>
                                    <div class="color-scheme" data-scheme="sunset">
                                        <div class="scheme-preview sunset"></div>
                                        <span>Sunset</span>
                                    </div>
                                    <div class="color-scheme" data-scheme="forest">
                                        <div class="scheme-preview forest"></div>
                                        <span>Forest</span>
                                    </div>
                                    <div class="color-scheme" data-scheme="aurora">
                                        <div class="scheme-preview aurora"></div>
                                        <span>Aurora</span>
                                    </div>
                                </div>
                            </div>

                            <div class="setting-group">
                                <label>Accent Color</label>
                                <div class="color-picker-enhanced">
                                    <input type="color" id="accent-color" value="#00d4ff">
                                    <div class="preset-colors">
                                        <div class="color-preset" data-color="#00d4ff" style="background: #00d4ff"></div>
                                        <div class="color-preset" data-color="#ff6b6b" style="background: #ff6b6b"></div>
                                        <div class="color-preset" data-color="#4ecdc4" style="background: #4ecdc4"></div>
                                        <div class="color-preset" data-color="#45b7d1" style="background: #45b7d1"></div>
                                        <div class="color-preset" data-color="#feca57" style="background: #feca57"></div>
                                        <div class="color-preset" data-color="#ff9ff3" style="background: #ff9ff3"></div>
                                        <div class="color-preset" data-color="#54a0ff" style="background: #54a0ff"></div>
                                        <div class="color-preset" data-color="#5f27cd" style="background: #5f27cd"></div>
                                    </div>
                                    <button id="color-randomize" class="color-random-btn">🎲</button>
                                </div>
                            </div>

                            <div class="setting-group">
                                <label>Visual Effects</label>
                                <div class="effects-grid">
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="blur-effects" checked>
                                        <span class="checkmark"></span>
                                        Blur Effects
                                    </label>
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="window-shadows" checked>
                                        <span class="checkmark"></span>
                                        Window Shadows
                                    </label>
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="smooth-animations" checked>
                                        <span class="checkmark"></span>
                                        Smooth Animations
                                    </label>
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="parallax-effects">
                                        <span class="checkmark"></span>
                                        Parallax Effects
                                    </label>
                                </div>
                                
                                <div class="control-row">
                                    <div class="control-item">
                                        <label>Window Transparency</label>
                                        <div class="slider-container">
                                            <input type="range" id="window-transparency" min="0" max="50" value="10" step="5">
                                            <span class="slider-value">10%</span>
                                        </div>
                                    </div>
                                    <div class="control-item">
                                        <label>UI Scale</label>
                                        <div class="slider-container">
                                            <input type="range" id="ui-scale" min="0.8" max="1.5" value="1" step="0.1">
                                            <span class="slider-value">100%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Backgrounds Section -->
                        <div class="settings-section" id="backgrounds">
                            <div class="section-title">🖼️ Dynamic Backgrounds</div>
                            
                            <div class="setting-group">
                                <label>Background Type</label>
                                <div class="background-types">
                                    <div class="bg-type active" data-type="gradient">
                                        <i class="fas fa-paint-brush"></i>
                                        <span>Gradient</span>
                                    </div>
                                    <div class="bg-type" data-type="animated">
                                        <i class="fas fa-video"></i>
                                        <span>Animated</span>
                                    </div>
                                    <div class="bg-type" data-type="pattern">
                                        <i class="fas fa-th"></i>
                                        <span>Pattern</span>
                                    </div>
                                    <div class="bg-type" data-type="media">
                                        <i class="fas fa-file-image"></i>
                                        <span>Media</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Gradient Settings -->
                            <div class="setting-group" id="gradient-settings">
                                <label>Gradient Configuration</label>
                                <div class="gradient-controls">
                                    <div class="control-row">
                                        <div class="control-item">
                                            <label>Start Color</label>
                                            <input type="color" id="gradient-start" value="#667eea">
                                        </div>
                                        <div class="control-item">
                                            <label>End Color</label>
                                            <input type="color" id="gradient-end" value="#764ba2">
                                        </div>
                                    </div>
                                    <div class="control-row">
                                        <div class="control-item">
                                            <label>Angle</label>
                                            <div class="slider-container">
                                                <input type="range" id="gradient-angle" min="0" max="360" value="135">
                                                <span class="slider-value">135°</span>
                                            </div>
                                        </div>
                                        <div class="control-item">
                                            <label>Opacity</label>
                                            <div class="slider-container">
                                                <input type="range" id="gradient-opacity" min="10" max="100" value="100">
                                                <span class="slider-value">100%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Animated Background Settings -->
                            <div class="setting-group" id="animated-settings" style="display: none;">
                                <label>Animated Backgrounds</label>
                                <div class="animated-grid">
                                    <div class="animated-option" data-animation="matrix">
                                        <i class="fas fa-code"></i>
                                        <span>Matrix Rain</span>
                                    </div>
                                    <div class="animated-option" data-animation="waves">
                                        <i class="fas fa-water"></i>
                                        <span>Flowing Waves</span>
                                    </div>
                                    <div class="animated-option" data-animation="neural">
                                        <i class="fas fa-brain"></i>
                                        <span>Neural Network</span>
                                    </div>
                                    <div class="animated-option" data-animation="plasma">
                                        <i class="fas fa-bolt"></i>
                                        <span>Plasma Field</span>
                                    </div>
                                    <div class="animated-option" data-animation="starfield">
                                        <i class="fas fa-star"></i>
                                        <span>Starfield</span>
                                    </div>
                                    <div class="animated-option" data-animation="fractals">
                                        <i class="fas fa-snowflake"></i>
                                        <span>Fractals</span>
                                    </div>
                                    <div class="animated-option" data-animation="fire">
                                        <i class="fas fa-fire"></i>
                                        <span>Fire Effect</span>
                                    </div>
                                    <div class="animated-option" data-animation="dna">
                                        <i class="fas fa-dna"></i>
                                        <span>DNA Helix</span>
                                    </div>
                                    <div class="animated-option" data-animation="galaxy">
                                        <i class="fas fa-satellite"></i>
                                        <span>Galaxy</span>
                                    </div>
                                </div>
                                <div class="control-row">
                                    <div class="control-item">
                                        <label>Animation Speed</label>
                                        <div class="slider-container">
                                            <input type="range" id="animation-speed" min="0.1" max="3" value="1" step="0.1">
                                            <span class="slider-value">1x</span>
                                        </div>
                                    </div>
                                    <div class="control-item">
                                        <label>Animation Intensity</label>
                                        <div class="slider-container">
                                            <input type="range" id="animation-intensity" min="0.1" max="2" value="1" step="0.1">
                                            <span class="slider-value">1x</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Pattern Settings -->
                            <div class="setting-group" id="pattern-settings" style="display: none;">
                                <label>Pattern Configuration</label>
                                <div class="pattern-grid">
                                    <div class="pattern-option" data-pattern="dots">Dots</div>
                                    <div class="pattern-option" data-pattern="grid">Grid</div>
                                    <div class="pattern-option" data-pattern="lines">Lines</div>
                                    <div class="pattern-option" data-pattern="hexagon">Hexagon</div>
                                    <div class="pattern-option" data-pattern="triangles">Triangles</div>
                                    <div class="pattern-option" data-pattern="waves">Waves</div>
                                    <div class="pattern-option" data-pattern="circuit">Circuit</div>
                                    <div class="pattern-option" data-pattern="maze">Maze</div>
                                </div>
                                <div class="control-row">
                                    <div class="control-item">
                                        <label>Pattern Size</label>
                                        <div class="slider-container">
                                            <input type="range" id="pattern-size" min="10" max="100" value="20">
                                            <span class="slider-value">20px</span>
                                        </div>
                                    </div>
                                    <div class="control-item">
                                        <label>Pattern Opacity</label>
                                        <div class="slider-container">
                                            <input type="range" id="pattern-opacity" min="0" max="100" value="30">
                                            <span class="slider-value">30%</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="control-row">
                                    <div class="control-item">
                                        <label>Pattern Color</label>
                                        <input type="color" id="pattern-color" value="#00d4ff">
                                    </div>
                                    <div class="control-item">
                                        <label class="checkbox-item">
                                            <input type="checkbox" id="pattern-animate">
                                            <span class="checkmark"></span>
                                            Animate Pattern
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <!-- Media Settings -->
                            <div class="setting-group" id="media-settings" style="display: none;">
                                <label>Media Background</label>
                                <div class="media-controls">
                                    <div class="control-item">
                                        <label>Image/Video URL</label>
                                        <div class="media-input-group">
                                            <input type="text" id="media-url" placeholder="Enter URL..." class="media-input">
                                            <input type="file" id="media-file" accept="image/*,video/*" style="display: none;">
                                            <button id="media-browse" class="browse-btn">Browse</button>
                                        </div>
                                    </div>
                                    <div class="control-row">
                                        <div class="control-item">
                                            <label>Media Opacity</label>
                                            <div class="slider-container">
                                                <input type="range" id="media-opacity" min="10" max="100" value="50">
                                                <span class="slider-value">50%</span>
                                            </div>
                                        </div>
                                        <div class="control-item">
                                            <label class="checkbox-item">
                                                <input type="checkbox" id="media-blur">
                                                <span class="checkmark"></span>
                                                Blur Effect
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Particles Section -->
                        <div class="settings-section" id="particles">
                            <div class="section-title">✨ Particle System</div>
                            
                            <div class="setting-group">
                                <div class="particles-toggle-section">
                                    <label class="checkbox-item particles-master-toggle">
                                        <input type="checkbox" id="particles-enabled" checked>
                                        <span class="checkmark"></span>
                                        <span class="toggle-label">Enable Particle System</span>
                                    </label>
                                    <div class="particles-status active" id="particles-status">
                                        <span class="status-text">Active - Rendering</span>
                                    </div>
                                </div>
                                <div class="test-buttons">
                                    <button id="test-particles" class="test-btn">🧪 Test Particles</button>
                                    <button id="reset-particles" class="test-btn">🔄 Reset System</button>
                                </div>
                            </div>

                            <div class="setting-group" id="particles-main-controls">
                                <label>Particle Configuration</label>
                                <div class="control-row">
                                    <div class="control-item">
                                        <label>Particle Count</label>
                                        <div class="slider-container">
                                            <input type="range" id="particle-count" min="10" max="200" value="50" step="10">
                                            <span class="slider-value">50</span>
                                        </div>
                                    </div>
                                    <div class="control-item">
                                        <label>Particle Size</label>
                                        <div class="slider-container">
                                            <input type="range" id="particle-size" min="1" max="20" value="3">
                                            <span class="slider-value">3px</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="control-row">
                                    <div class="control-item">
                                        <label>Particle Speed</label>
                                        <div class="slider-container">
                                            <input type="range" id="particle-speed" min="0.1" max="5" value="1" step="0.1">
                                            <span class="slider-value">1x</span>
                                        </div>
                                    </div>
                                    <div class="control-item">
                                        <label>Particle Color</label>
                                        <input type="color" id="particle-color" value="#00d4ff">
                                    </div>
                                </div>
                            </div>

                            <div class="setting-group">
                                <label>Particle Behavior</label>
                                <div class="behavior-grid">
                                    <div class="behavior-option active" data-behavior="float">
                                        <i class="fas fa-cloud"></i>
                                        <span>Float</span>
                                    </div>
                                    <div class="behavior-option" data-behavior="follow">
                                        <i class="fas fa-mouse-pointer"></i>
                                        <span>Follow Mouse</span>
                                    </div>
                                    <div class="behavior-option" data-behavior="dodge">
                                        <i class="fas fa-arrows-alt"></i>
                                        <span>Dodge Mouse</span>
                                    </div>
                                    <div class="behavior-option" data-behavior="orbit">
                                        <i class="fas fa-circle-notch"></i>
                                        <span>Orbit</span>
                                    </div>
                                    <div class="behavior-option" data-behavior="spiral">
                                        <i class="fas fa-hurricane"></i>
                                        <span>Spiral</span>
                                    </div>
                                    <div class="behavior-option" data-behavior="wave">
                                        <i class="fas fa-water"></i>
                                        <span>Wave</span>
                                    </div>
                                    <div class="behavior-option" data-behavior="bounce">
                                        <i class="fas fa-basketball-ball"></i>
                                        <span>Bounce</span>
                                    </div>
                                    <div class="behavior-option" data-behavior="constellation">
                                        <i class="fas fa-star"></i>
                                        <span>Constellation</span>
                                    </div>
                                    <div class="behavior-option" data-behavior="fireworks">
                                        <i class="fas fa-fire"></i>
                                        <span>Fireworks</span>
                                    </div>
                                    <div class="behavior-option" data-behavior="swarm">
                                        <i class="fas fa-swarm"></i>
                                        <span>Swarm</span>
                                    </div>
                                    <div class="behavior-option" data-behavior="gravity">
                                        <i class="fas fa-arrow-down"></i>
                                        <span>Gravity</span>
                                    </div>
                                    <div class="behavior-option" data-behavior="magnetic">
                                        <i class="fas fa-magnet"></i>
                                        <span>Magnetic</span>
                                    </div>
                                </div>
                            </div>

                            <div class="setting-group">
                                <label>Mouse Interaction</label>
                                <div class="control-row">
                                    <div class="control-item">
                                        <label>Mouse Force</label>
                                        <div class="slider-container">
                                            <input type="range" id="mouse-force" min="0.1" max="5" value="1" step="0.1">
                                            <span class="slider-value">1x</span>
                                        </div>
                                    </div>
                                    <div class="control-item">
                                        <label>Mouse Range</label>
                                        <div class="slider-container">
                                            <input type="range" id="mouse-range" min="50" max="300" value="100" step="10">
                                            <span class="slider-value">100px</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="effects-grid">
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="particle-glow" checked>
                                        <span class="checkmark"></span>
                                        Glow Effect
                                    </label>
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="particle-trails" checked>
                                        <span class="checkmark"></span>
                                        Particle Trails
                                    </label>
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="particle-connect">
                                        <span class="checkmark"></span>
                                        Connect Particles
                                    </label>
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="mouse-click-burst">
                                        <span class="checkmark"></span>
                                        Click Bursts
                                    </label>
                                </div>
                            </div>
                        </div>

                        <!-- Interface Section -->
                        <div class="settings-section" id="interface">
                            <div class="section-title">🖥️ Interface</div>
                            
                            <div class="setting-group">
                                <label>Window Behavior</label>
                                <div class="effects-grid">
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="auto-hide-taskbar">
                                        <span class="checkmark"></span>
                                        Auto-hide Taskbar
                                    </label>
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="snap-windows" checked>
                                        <span class="checkmark"></span>
                                        Snap Windows
                                    </label>
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="show-clock" checked>
                                        <span class="checkmark"></span>
                                        Show Clock
                                    </label>
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="minimize-to-tray">
                                        <span class="checkmark"></span>
                                        Minimize to Tray
                                    </label>
                                </div>
                            </div>

                            <div class="setting-group">
                                <label>Typography & Layout</label>
                                <div class="control-row">
                                    <div class="control-item">
                                        <label>Font Family</label>
                                        <select id="font-family">
                                            <option value="'Segoe UI', sans-serif">Segoe UI</option>
                                            <option value="'Roboto', sans-serif">Roboto</option>
                                            <option value="'Arial', sans-serif">Arial</option>
                                            <option value="'Helvetica', sans-serif">Helvetica</option>
                                            <option value="'Fira Code', monospace">Fira Code</option>
                                        </select>
                                    </div>
                                    <div class="control-item">
                                        <label>Font Size</label>
                                        <div class="slider-container">
                                            <input type="range" id="font-size" min="10" max="20" value="14">
                                            <span class="slider-value">14px</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="control-row">
                                    <div class="control-item">
                                        <label>Icon Size</label>
                                        <div class="slider-container">
                                            <input type="range" id="icon-size" min="24" max="96" value="48" step="8">
                                            <span class="slider-value">48px</span>
                                        </div>
                                    </div>
                                    <div class="control-item">
                                        <label>Icon Spacing</label>
                                        <div class="slider-container">
                                            <input type="range" id="icon-spacing" min="80" max="200" value="120" step="10">
                                            <span class="slider-value">120px</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Advanced Section -->
                        <div class="settings-section" id="advanced">
                            <div class="section-title">🔧 Advanced</div>
                            
                            <div class="setting-group">
                                <label>Performance</label>
                                <div class="control-row">
                                    <div class="control-item">
                                        <label>Frame Rate</label>
                                        <select id="frame-rate">
                                            <option value="30">30 FPS</option>
                                            <option value="60" selected>60 FPS</option>
                                            <option value="120">120 FPS</option>
                                            <option value="0">Unlimited</option>
                                        </select>
                                    </div>
                                    <div class="control-item">
                                        <label class="checkbox-item">
                                            <input type="checkbox" id="hardware-acceleration" checked>
                                            <span class="checkmark"></span>
                                            Hardware Acceleration
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div class="setting-group">
                                <label>Debug & Monitoring</label>
                                <div class="effects-grid">
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="show-fps">
                                        <span class="checkmark"></span>
                                        Show FPS Counter
                                    </label>
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="debug-mode">
                                        <span class="checkmark"></span>
                                        Debug Mode
                                    </label>
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="performance-monitor">
                                        <span class="checkmark"></span>
                                        Performance Monitor
                                    </label>
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="verbose-logging">
                                        <span class="checkmark"></span>
                                        Verbose Logging
                                    </label>
                                </div>
                            </div>

                            <div class="setting-group">
                                <label>Data Management</label>
                                <div class="action-buttons">
                                    <button class="action-btn" id="reset-settings">🔄 Reset All</button>
                                    <button class="action-btn" id="export-settings">📤 Export</button>
                                    <button class="action-btn" id="import-settings">📥 Import</button>
                                    <button class="action-btn danger" id="clear-cache">🗑️ Clear Cache</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                ${Settings.getStyles()}
            `,
            onInit: (windowElement) => {
                Settings.init(windowElement);
            },
            onClose: () => {
                Settings.onClose();
            }
        };
    }

    static init(windowElement) {
        this.windowElement = windowElement;
        this.settings = this.loadSettings();
        this.particleSystem = null;
        this.backgroundSystem = null;
        this.fpsCounter = null;
        this.wallpaperLayer = null;

        this.setupEventListeners();
        this.initializeSystems();
        this.loadCurrentSettings();

        // Auto-save on any change
        this.setupAutoSave();

        console.log('🔧 Settings Pro v6.0 initialized successfully');
    }

    static setupEventListeners() {
        // Navigation
        this.windowElement.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                this.switchSection(item.dataset.section);
            });
        });

        // Preset cards
        this.windowElement.querySelectorAll('.preset-card').forEach(card => {
            card.addEventListener('click', () => {
                this.applyPreset(card.dataset.preset);
            });
        });

        // Color scheme
        this.windowElement.querySelectorAll('.color-scheme').forEach(scheme => {
            scheme.addEventListener('click', () => {
                this.setColorScheme(scheme.dataset.scheme);
            });
        });

        // Accent color
        this.windowElement.querySelector('#accent-color').addEventListener('input', (e) => {
            this.setAccentColor(e.target.value);
        });

        this.windowElement.querySelectorAll('.color-preset').forEach(preset => {
            preset.addEventListener('click', () => {
                this.setAccentColor(preset.dataset.color);
            });
        });

        // Color randomizer
        this.windowElement.querySelector('#color-randomize').addEventListener('click', () => {
            this.randomizeAccentColor();
        });

        // Background types
        this.windowElement.querySelectorAll('.bg-type').forEach(type => {
            type.addEventListener('click', () => {
                this.setBackgroundType(type.dataset.type);
            });
        });

        // Animated backgrounds
        this.windowElement.querySelectorAll('.animated-option').forEach(option => {
            option.addEventListener('click', () => {
                this.setAnimatedBackground(option.dataset.animation);
                option.parentElement.querySelectorAll('.animated-option').forEach(o => o.classList.remove('active'));
                option.classList.add('active');
            });
        });

        // Pattern options
        this.windowElement.querySelectorAll('.pattern-option').forEach(option => {
            option.addEventListener('click', () => {
                this.setPattern(option.dataset.pattern);
                option.parentElement.querySelectorAll('.pattern-option').forEach(o => o.classList.remove('active'));
                option.classList.add('active');
            });
        });

        // Particles master toggle
        this.windowElement.querySelector('#particles-enabled').addEventListener('change', (e) => {
            this.toggleParticleSystem(e.target.checked);
        });

        // Particle behaviors
        this.windowElement.querySelectorAll('.behavior-option').forEach(behavior => {
            behavior.addEventListener('click', () => {
                this.setParticleBehavior(behavior.dataset.behavior);
                behavior.parentElement.querySelectorAll('.behavior-option').forEach(b => b.classList.remove('active'));
                behavior.classList.add('active');
            });
        });

        // Test buttons
        this.windowElement.querySelector('#test-particles').addEventListener('click', () => {
            this.testParticles();
        });

        this.windowElement.querySelector('#reset-particles').addEventListener('click', () => {
            this.resetParticleSystem();
        });

        // All sliders with live update
        this.windowElement.querySelectorAll('input[type="range"]').forEach(slider => {
            slider.addEventListener('input', (e) => {
                this.updateSliderValue(slider);
                this.applySetting(slider.id, slider.value);
            });
        });

        // All checkboxes
        this.windowElement.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                this.applySetting(checkbox.id, checkbox.checked);
            });
        });

        // All selects
        this.windowElement.querySelectorAll('select').forEach(select => {
            select.addEventListener('change', (e) => {
                this.applySetting(select.id, select.value);
            });
        });

        // Color inputs
        this.windowElement.querySelectorAll('input[type="color"]').forEach(colorInput => {
            colorInput.addEventListener('input', (e) => {
                this.applySetting(colorInput.id, colorInput.value);
            });
        });

        // Media browse button
        this.windowElement.querySelector('#media-browse').addEventListener('click', () => {
            this.windowElement.querySelector('#media-file').click();
        });

        this.windowElement.querySelector('#media-file').addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const url = URL.createObjectURL(file);
                this.windowElement.querySelector('#media-url').value = url;
                this.applySetting('media-url', url);
            }
        });

        // Profile management
        this.windowElement.querySelector('#save-profile').addEventListener('click', () => {
            this.saveProfile();
        });

        this.windowElement.querySelector('#load-profile').addEventListener('click', () => {
            this.loadProfile();
        });

        // Action buttons
        this.setupActionButtons();
    }

    static setupActionButtons() {
        this.windowElement.querySelector('#reset-settings').addEventListener('click', () => {
            this.resetSettings();
        });

        this.windowElement.querySelector('#export-settings').addEventListener('click', () => {
            this.exportSettings();
        });

        this.windowElement.querySelector('#import-settings').addEventListener('click', () => {
            this.importSettings();
        });

        this.windowElement.querySelector('#clear-cache').addEventListener('click', () => {
            this.clearCache();
        });
    }

    static setupAutoSave() {
        let saveTimeout;
        const autoSave = () => {
            clearTimeout(saveTimeout);
            saveTimeout = setTimeout(() => {
                this.saveSettings();
            }, 500);
        };

        this.windowElement.addEventListener('input', autoSave);
        this.windowElement.addEventListener('change', autoSave);
    }

    static switchSection(sectionId) {
        // Update navigation
        this.windowElement.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        this.windowElement.querySelector(`[data-section="${sectionId}"]`).classList.add('active');

        // Update content
        this.windowElement.querySelectorAll('.settings-section').forEach(section => {
            section.classList.remove('active');
        });
        this.windowElement.querySelector(`#${sectionId}`).classList.add('active');
    }

    static applyPreset(presetName) {
        console.log(`🎯 Applying preset: ${presetName}`);

        const presets = {
            cyberpunk: {
                colorScheme: 'cyber',
                accentColor: '#ff00ff',
                backgroundType: 'animated',
                backgroundAnimation: 'matrix',
                particleBehavior: 'dodge',
                'particle-color': '#00d4ff',
                'particle-count': 200,
                'particle-glow': true,
                'animation-speed': 1.5,
                'animation-intensity': 1.8
            },
            space: {
                colorScheme: 'dark',
                accentColor: '#4a90e2',
                backgroundType: 'animated',
                backgroundAnimation: 'starfield',
                particleBehavior: 'float',
                'particle-color': '#ffffff',
                'particle-count': 150,
                'particle-glow': true,
                'animation-speed': 0.8,
                'animation-intensity': 1.2
            },
            ocean: {
                colorScheme: 'ocean',
                accentColor: '#00bfff',
                backgroundType: 'animated',
                backgroundAnimation: 'waves',
                particleBehavior: 'wave',
                'particle-color': '#87ceeb',
                'particle-count': 100,
                'particle-trails': true,
                'animation-speed': 1.0,
                'animation-intensity': 1.0
            },
            forest: {
                colorScheme: 'forest',
                accentColor: '#32cd32',
                backgroundType: 'gradient',
                'gradient-start': '#1a2e1a',
                'gradient-end': '#2d5a2d',
                particleBehavior: 'swarm',
                'particle-color': '#90ee90',
                'particle-count': 80,
                'animation-speed': 0.6
            },
            synthwave: {
                colorScheme: 'synthwave',
                accentColor: '#feca57',
                backgroundType: 'pattern',
                backgroundPattern: 'grid',
                'pattern-color': '#ff6b6b',
                'pattern-animate': true,
                particleBehavior: 'orbit',
                'particle-color': '#ff9ff3',
                'particle-count': 120,
                'particle-glow': true
            },
            minimal: {
                colorScheme: 'light',
                accentColor: '#666666',
                backgroundType: 'gradient',
                'gradient-start': '#ffffff',
                'gradient-end': '#f8f9fa',
                particleBehavior: 'float',
                'particle-color': '#cccccc',
                'particle-count': 30,
                'particle-size': 2,
                'particle-speed': 0.3
            },
            aurora: {
                colorScheme: 'aurora',
                accentColor: '#80ff80',
                backgroundType: 'animated',
                backgroundAnimation: 'plasma',
                particleBehavior: 'spiral',
                'particle-color': '#e0e0ff',
                'particle-count': 180,
                'particle-trails': true,
                'animation-speed': 0.7,
                'animation-intensity': 1.5
            },
            volcanic: {
                colorScheme: 'volcanic',
                accentColor: '#ff4400',
                backgroundType: 'animated',
                backgroundAnimation: 'fire',
                particleBehavior: 'fireworks',
                'particle-color': '#ff6347',
                'particle-count': 250,
                'particle-glow': true,
                'animation-speed': 2.0,
                'animation-intensity': 2.0
            },
            gaming: {
                colorScheme: 'neon',
                accentColor: '#ff0080',
                backgroundType: 'animated',
                backgroundAnimation: 'neural',
                particleBehavior: 'follow',
                'particle-color': '#00ffff',
                'particle-count': 300,
                'particle-connect': true,
                'mouse-force': 2.0,
                'animation-speed': 1.2
            },
            productivity: {
                colorScheme: 'light',
                accentColor: '#007bff',
                backgroundType: 'gradient',
                'gradient-start': '#f8f9fa',
                'gradient-end': '#e9ecef',
                particleBehavior: 'float',
                'particle-color': '#dee2e6',
                'particle-count': 20,
                'particle-size': 1,
                'particle-speed': 0.2
            },
            party: {
                colorScheme: 'neon',
                accentColor: '#ff69b4',
                backgroundType: 'animated',
                backgroundAnimation: 'plasma',
                particleBehavior: 'bounce',
                'particle-color': '#ff1493',
                'particle-count': 400,
                'particle-glow': true,
                'mouse-click-burst': true,
                'animation-speed': 2.5,
                'animation-intensity': 2.0
            },
            zen: {
                colorScheme: 'forest',
                accentColor: '#90ee90',
                backgroundType: 'gradient',
                'gradient-start': '#0f1f0f',
                'gradient-end': '#1a2e1a',
                particleBehavior: 'constellation',
                'particle-color': '#98fb98',
                'particle-count': 50,
                'particle-trails': true,
                'particle-speed': 0.1
            }
        };

        const preset = presets[presetName];
        if (preset) {
            // Apply all preset settings
            Object.entries(preset).forEach(([key, value]) => {
                this.settings[key] = value;
                this.applySetting(key, value);
            });

            // Update UI to reflect changes
            this.updateAllUIFromSettings();
            this.saveSettings();

            // Show feedback
            this.showPresetApplied(presetName);
        }
    }

    static showPresetApplied(presetName) {
        // Create temporary notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--accent-color, #00d4ff);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 10000;
            font-weight: 600;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            animation: slideInRight 0.3s ease;
        `;
        notification.textContent = `✨ ${presetName.charAt(0).toUpperCase() + presetName.slice(1)} preset applied!`;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 2000);
    }

    static setColorScheme(scheme) {
        this.settings.colorScheme = scheme;

        // Update UI
        this.windowElement.querySelectorAll('.color-scheme').forEach(s => s.classList.remove('active'));
        this.windowElement.querySelector(`[data-scheme="${scheme}"]`).classList.add('active');

        // Apply scheme
        this.applyColorScheme(scheme);
        this.saveSettings();
    }

    static applyColorScheme(scheme) {
        const body = document.body;

        // Remove existing scheme classes
        body.classList.remove('light-mode', 'dark-mode', 'cyber-mode', 'neon-mode', 'matrix-mode',
                             'synthwave-mode', 'ocean-mode', 'sunset-mode', 'forest-mode', 'aurora-mode', 'volcanic-mode');

        const schemes = {
            'dark': {
                class: 'dark-mode',
                colors: {
                    '--bg-primary': '#1a1a1a',
                    '--bg-secondary': '#0f0f0f',
                    '--text-primary': '#ffffff',
                }
            },
            'light': {
                class: 'light-mode',
                colors: {
                    '--bg-primary': '#ffffff',
                    '--bg-secondary': '#f8f9fa',
                    '--text-primary': '#333333',
                }
            },
            'cyber': {
                class: 'cyber-mode',
                colors: {
                    '--bg-primary': '#0a0a0f',
                    '--bg-secondary': '#050508',
                    '--text-primary': '#00d4ff',
                }
            },
            'neon': {
                class: 'neon-mode',
                colors: {
                    '--bg-primary': '#0d0d0d',
                    '--bg-secondary': '#1a1a1a',
                    '--text-primary': '#00ffff',
                }
            },
            'matrix': {
                class: 'matrix-mode',
                colors: {
                    '--bg-primary': '#000000',
                    '--bg-secondary': '#001100',
                    '--text-primary': '#00ff00',
                }
            },
            'synthwave': {
                class: 'synthwave-mode',
                colors: {
                    '--bg-primary': '#2d1b69',
                    '--bg-secondary': '#1a0f3d',
                    '--text-primary': '#ff6b6b',
                }
            },
            'ocean': {
                class: 'ocean-mode',
                colors: {
                    '--bg-primary': '#0f3460',
                    '--bg-secondary': '#16537e',
                    '--text-primary': '#87ceeb',
                }
            },
            'sunset': {
                class: 'sunset-mode',
                colors: {
                    '--bg-primary': '#2c1810',
                    '--bg-secondary': '#3d2418',
                    '--text-primary': '#ffd700',
                }
            },
            'forest': {
                class: 'forest-mode',
                colors: {
                    '--bg-primary': '#1a2e1a',
                    '--bg-secondary': '#0f1f0f',
                    '--text-primary': '#90ee90',
                }
            },
            'aurora': {
                class: 'aurora-mode',
                colors: {
                    '--bg-primary': '#1a2040',
                    '--bg-secondary': '#0f1530',
                    '--text-primary': '#e0e0ff',
                }
            },
            'volcanic': {
                class: 'volcanic-mode',
                colors: {
                    '--bg-primary': '#3d1a00',
                    '--bg-secondary': '#2d1000',
                    '--text-primary': '#ffaa55',
                }
            }
        };

        const schemeData = schemes[scheme];
        if (schemeData) {
            body.classList.add(schemeData.class);

            // Apply CSS custom properties
            Object.keys(schemeData.colors).forEach(property => {
                document.documentElement.style.setProperty(property, schemeData.colors[property]);
            });
        }
    }

    static setAccentColor(color) {
        this.settings.accentColor = color;
        document.documentElement.style.setProperty('--accent-color', color);

        // Update color picker
        this.windowElement.querySelector('#accent-color').value = color;

        // Update preset selection
        this.windowElement.querySelectorAll('.color-preset').forEach(preset => {
            preset.classList.remove('active');
            if (preset.dataset.color === color) {
                preset.classList.add('active');
            }
        });

        this.saveSettings();
    }

    static randomizeAccentColor() {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd', '#00d4ff'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        this.setAccentColor(randomColor);
    }

    static setBackgroundType(type) {
        this.settings.backgroundType = type;

        // Update UI
        this.windowElement.querySelectorAll('.bg-type').forEach(t => t.classList.remove('active'));
        this.windowElement.querySelector(`[data-type="${type}"]`).classList.add('active');

        // Show/hide relevant settings
        this.windowElement.querySelector('#gradient-settings').style.display = type === 'gradient' ? 'block' : 'none';
        this.windowElement.querySelector('#animated-settings').style.display = type === 'animated' ? 'block' : 'none';
        this.windowElement.querySelector('#pattern-settings').style.display = type === 'pattern' ? 'block' : 'none';
        this.windowElement.querySelector('#media-settings').style.display = type === 'media' ? 'block' : 'none';

        this.updateBackground();
        this.saveSettings();
    }

    static setAnimatedBackground(animation) {
        this.settings.backgroundAnimation = animation;
        if (this.backgroundSystem) {
            this.backgroundSystem.setAnimation(animation);
        } else {
            this.initializeBackgroundSystem();
        }
        this.saveSettings();
    }

    static setPattern(pattern) {
        this.settings.backgroundPattern = pattern;
        this.updateBackground();
        this.saveSettings();
    }

    static toggleParticleSystem(enabled) {
        this.settings['particles-enabled'] = enabled;

        const statusEl = this.windowElement.querySelector('#particles-status');
        const mainControls = this.windowElement.querySelector('#particles-main-controls');

        if (enabled) {
            statusEl.innerHTML = '<span class="status-text">Active - Rendering</span>';
            statusEl.className = 'particles-status active';
            mainControls.style.opacity = '1';
            mainControls.style.pointerEvents = 'all';
            this.initializeParticleSystem();
        } else {
            statusEl.innerHTML = '<span class="status-text">Inactive - System Idle</span>';
            statusEl.className = 'particles-status inactive';
            mainControls.style.opacity = '0.5';
            mainControls.style.pointerEvents = 'none';
            this.destroyParticleSystem();
        }

        this.saveSettings();
    }

    static setParticleBehavior(behavior) {
        this.settings.particleBehavior = behavior;
        if (this.particleSystem) {
            this.particleSystem.setBehavior(behavior);
        }
        this.saveSettings();
    }

    static testParticles() {
        console.log('🧪 Testing particle system...');
        if (this.particleSystem) {
            this.particleSystem.testBurst();
        } else {
            this.initializeParticleSystem();
        }
    }

    static resetParticleSystem() {
        console.log('🔄 Resetting particle system...');
        this.destroyParticleSystem();
        setTimeout(() => {
            if (this.settings['particles-enabled']) {
                this.initializeParticleSystem();
            }
        }, 200);
    }

    static applySetting(settingId, value) {
        this.settings[settingId] = value;

        switch (settingId) {
            case 'window-transparency':
                const opacity = 1 - (value / 100);
                document.querySelectorAll('.window').forEach(window => {
                    window.style.backgroundColor = `rgba(26, 26, 26, ${opacity})`;
                    window.style.backdropFilter = value > 0 ? `blur(${value/10}px)` : 'none';
                });
                break;
            case 'particles-enabled':
                this.toggleParticleSystem(value);
                break;
            case 'particle-count':
            case 'particle-size':
            case 'particle-speed':
            case 'particle-color':
            case 'particle-glow':
            case 'particle-trails':
            case 'particle-connect':
            case 'mouse-force':
            case 'mouse-range':
            case 'mouse-click-burst':
                if (this.particleSystem) {
                    this.particleSystem.updateSettings(this.settings);
                }
                break;
            case 'gradient-start':
            case 'gradient-end':
            case 'gradient-angle':
            case 'gradient-opacity':
            case 'pattern-size':
            case 'pattern-opacity':
            case 'pattern-color':
            case 'pattern-animate':
            case 'animation-speed':
            case 'animation-intensity':
            case 'media-url':
            case 'media-opacity':
            case 'media-blur':
                this.updateBackground();
                break;
            case 'show-fps':
                if (value) {
                    this.initializeFPSCounter();
                } else {
                    this.destroyFPSCounter();
                }
                break;
            case 'ui-scale':
                document.body.style.transform = `scale(${value})`;
                document.body.style.transformOrigin = 'top left';
                break;
            case 'font-family':
                document.body.style.fontFamily = value;
                break;
            case 'font-size':
                document.body.style.fontSize = value + 'px';
                break;
            case 'icon-size':
                document.documentElement.style.setProperty('--icon-size', value + 'px');
                break;
            case 'icon-spacing':
                document.documentElement.style.setProperty('--icon-spacing', value + 'px');
                break;
        }
    }

    static updateSliderValue(slider) {
        const valueSpan = slider.parentElement.querySelector('.slider-value');
        if (valueSpan) {
            let value = slider.value;
            let suffix = '';

            if (slider.id.includes('opacity') || slider.id.includes('transparency')) {
                suffix = '%';
            } else if (slider.id.includes('angle')) {
                suffix = '°';
            } else if (slider.id.includes('size') && !slider.id.includes('font')) {
                suffix = 'px';
            } else if (slider.id === 'font-size') {
                suffix = 'px';
            } else if (slider.id.includes('speed') || slider.id.includes('scale') || slider.id.includes('force')) {
                suffix = 'x';
            } else if (slider.id.includes('range') || slider.id.includes('spacing')) {
                suffix = 'px';
            } else if (slider.id === 'ui-scale') {
                suffix = '%';
                value = Math.round(value * 100);
            }

            valueSpan.textContent = value + suffix;
        }
    }

    static initializeSystems() {
        this.createWallpaperLayer();

        if (this.settings['particles-enabled']) {
            this.initializeParticleSystem();
        }

        if (this.settings.backgroundType === 'animated') {
            this.initializeBackgroundSystem();
        }

        if (this.settings['show-fps']) {
            this.initializeFPSCounter();
        }

        this.updateBackground();
    }

    static createWallpaperLayer() {
        const existingWallpaper = document.getElementById('ember-wallpaper');
        if (existingWallpaper) {
            existingWallpaper.remove();
        }

        const wallpaper = document.createElement('div');
        wallpaper.id = 'ember-wallpaper';
        wallpaper.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: -10;
            pointer-events: none;
        `;
        document.body.appendChild(wallpaper);
        this.wallpaperLayer = wallpaper;
    }

    static updateBackground() {
        if (!this.wallpaperLayer) {
            this.createWallpaperLayer();
        }

        const type = this.settings.backgroundType || 'gradient';

        // Clear previous background
        this.wallpaperLayer.style.background = 'transparent';
        this.wallpaperLayer.style.backgroundImage = '';
        this.wallpaperLayer.innerHTML = '';

        switch (type) {
            case 'gradient':
                this.applyGradientBackground();
                break;
            case 'pattern':
                this.applyPatternBackground();
                break;
            case 'media':
                this.applyMediaBackground();
                break;
            case 'animated':
                // Handled by background system
                break;
        }
    }

    static applyGradientBackground() {
        const start = this.settings['gradient-start'] || '#667eea';
        const end = this.settings['gradient-end'] || '#764ba2';
        const angle = this.settings['gradient-angle'] || 135;
        const opacity = (this.settings['gradient-opacity'] || 100) / 100;

        this.wallpaperLayer.style.background = `linear-gradient(${angle}deg, ${start}, ${end})`;
        this.wallpaperLayer.style.opacity = opacity;
    }

    static applyPatternBackground() {
        const pattern = this.settings.backgroundPattern || 'dots';
        const size = this.settings['pattern-size'] || 20;
        const opacity = (this.settings['pattern-opacity'] || 30) / 100;
        const color = this.settings['pattern-color'] || this.settings.accentColor || '#00d4ff';
        const animate = this.settings['pattern-animate'];

        let backgroundImage = '';
        let backgroundSize = `${size}px ${size}px`;

        switch (pattern) {
            case 'dots':
                backgroundImage = `radial-gradient(circle, ${color} 1px, transparent 1px)`;
                break;
            case 'grid':
                backgroundImage = `
                    linear-gradient(${color} 1px, transparent 1px), 
                    linear-gradient(90deg, ${color} 1px, transparent 1px)
                `;
                break;
            case 'lines':
                backgroundImage = `repeating-linear-gradient(45deg, ${color} 0px, ${color} 1px, transparent 1px, transparent ${size/4}px)`;
                break;
            case 'hexagon':
                backgroundImage = `
                    radial-gradient(circle at 25% 25%, ${color} 2px, transparent 2px),
                    radial-gradient(circle at 75% 75%, ${color} 2px, transparent 2px)
                `;
                break;
            case 'triangles':
                backgroundImage = `
                    linear-gradient(45deg, ${color} 25%, transparent 25%),
                    linear-gradient(-45deg, ${color} 25%, transparent 25%)
                `;
                break;
            case 'waves':
                backgroundImage = `repeating-linear-gradient(0deg, transparent 0px, transparent ${size/4}px, ${color} ${size/4}px, ${color} ${size/2}px)`;
                break;
            case 'circuit':
                backgroundImage = `
                    linear-gradient(90deg, ${color} 1px, transparent 1px),
                    linear-gradient(${color} 1px, transparent 1px)
                `;
                break;
            case 'maze':
                backgroundImage = `
                    linear-gradient(90deg, ${color} 2px, transparent 2px),
                    linear-gradient(${color} 2px, transparent 2px)
                `;
                break;
        }

        this.wallpaperLayer.style.backgroundImage = backgroundImage;
        this.wallpaperLayer.style.backgroundSize = backgroundSize;
        this.wallpaperLayer.style.opacity = opacity;

        if (animate) {
            this.wallpaperLayer.style.animation = 'patternMove 10s linear infinite';
        } else {
            this.wallpaperLayer.style.animation = 'none';
        }
    }

    static applyMediaBackground() {
        const mediaUrl = this.settings['media-url'];
        const opacity = (this.settings['media-opacity'] || 50) / 100;
        const blur = this.settings['media-blur'];

        if (mediaUrl) {
            const isVideo = mediaUrl.includes('.mp4') || mediaUrl.includes('.webm') || mediaUrl.includes('.ogg');

            if (isVideo) {
                const video = document.createElement('video');
                video.style.cssText = `
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    opacity: ${opacity};
                    filter: ${blur ? 'blur(5px)' : 'none'};
                `;
                video.src = mediaUrl;
                video.autoplay = true;
                video.loop = true;
                video.muted = true;
                this.wallpaperLayer.appendChild(video);
            } else {
                const img = document.createElement('img');
                img.style.cssText = `
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    opacity: ${opacity};
                    filter: ${blur ? 'blur(5px)' : 'none'};
                `;
                img.src = mediaUrl;
                this.wallpaperLayer.appendChild(img);
            }
        }
    }

    static initializeParticleSystem() {
        if (this.particleSystem) {
            this.destroyParticleSystem();
        }

        setTimeout(() => {
            try {
                this.particleSystem = new ParticleSystem(this.settings);
                console.log('✅ Particle system initialized');
            } catch (error) {
                console.error('❌ Failed to create particle system:', error);
            }
        }, 100);
    }

    static destroyParticleSystem() {
        if (this.particleSystem) {
            this.particleSystem.destroy();
            this.particleSystem = null;
            console.log('🚫 Particle system destroyed');
        }
    }

    static initializeBackgroundSystem() {
        if (this.backgroundSystem) {
            this.backgroundSystem.destroy();
        }

        this.backgroundSystem = new BackgroundSystem(this.settings);
    }

    static initializeFPSCounter() {
        this.destroyFPSCounter();
        this.fpsCounter = new FPSCounter();
    }

    static destroyFPSCounter() {
        if (this.fpsCounter) {
            this.fpsCounter.destroy();
            this.fpsCounter = null;
        }
    }

    static updateAllUIFromSettings() {
        Object.keys(this.settings).forEach(key => {
            const element = this.windowElement.querySelector(`#${key}`);
            if (element) {
                if (element.type === 'checkbox') {
                    element.checked = this.settings[key];
                } else if (element.type === 'range') {
                    element.value = this.settings[key];
                    this.updateSliderValue(element);
                } else if (element.tagName === 'SELECT') {
                    element.value = this.settings[key];
                } else if (element.type === 'color') {
                    element.value = this.settings[key];
                }
            }
        });

        // Update UI states
        this.setColorScheme(this.settings.colorScheme);
        this.setAccentColor(this.settings.accentColor);
        this.setBackgroundType(this.settings.backgroundType || 'gradient');
    }

    static loadCurrentSettings() {
        this.updateAllUIFromSettings();

        // Apply all settings
        Object.keys(this.settings).forEach(key => {
            this.applySetting(key, this.settings[key]);
        });

        // Update particle toggle state
        this.toggleParticleSystem(this.settings['particles-enabled']);
    }

    static saveProfile() {
        const profileName = this.windowElement.querySelector('#new-profile-name').value.trim();
        if (!profileName) {
            alert('Please enter a profile name');
            return;
        }

        const profiles = this.loadProfiles();
        profiles[profileName] = { ...this.settings };
        this.saveProfiles(profiles);
        this.updateProfileList();
        this.windowElement.querySelector('#new-profile-name').value = '';

        console.log(`💾 Profile '${profileName}' saved`);
    }

    static loadProfile() {
        const profileName = this.windowElement.querySelector('#new-profile-name').value.trim();
        if (!profileName) {
            alert('Please enter a profile name to load');
            return;
        }

        const profiles = this.loadProfiles();
        if (profiles[profileName]) {
            this.settings = { ...this.getDefaultSettings(), ...profiles[profileName] };
            this.loadCurrentSettings();
            this.saveSettings();
            console.log(`📂 Profile '${profileName}' loaded`);
        } else {
            alert('Profile not found');
        }
    }

    static loadProfiles() {
        try {
            const profiles = localStorage.getItem('emberframe-profiles');
            return profiles ? JSON.parse(profiles) : {};
        } catch (error) {
            return {};
        }
    }

    static saveProfiles(profiles) {
        try {
            localStorage.setItem('emberframe-profiles', JSON.stringify(profiles));
        } catch (error) {
            console.error('Failed to save profiles:', error);
        }
    }

    static updateProfileList() {
        const profileList = this.windowElement.querySelector('#profile-list');
        const profiles = this.loadProfiles();

        profileList.innerHTML = '';
        Object.keys(profiles).forEach(profileName => {
            const profileItem = document.createElement('div');
            profileItem.className = 'profile-item';
            profileItem.innerHTML = `
                <span class="profile-name">${profileName}</span>
                <div class="profile-actions">
                    <button class="profile-btn load" data-profile="${profileName}">Load</button>
                    <button class="profile-btn delete" data-profile="${profileName}">Delete</button>
                </div>
            `;
            profileList.appendChild(profileItem);
        });

        // Add event listeners for profile buttons
        profileList.querySelectorAll('.profile-btn.load').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const profileName = e.target.dataset.profile;
                this.settings = { ...this.getDefaultSettings(), ...profiles[profileName] };
                this.loadCurrentSettings();
                this.saveSettings();
                console.log(`📂 Profile '${profileName}' loaded`);
            });
        });

        profileList.querySelectorAll('.profile-btn.delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const profileName = e.target.dataset.profile;
                if (confirm(`Delete profile '${profileName}'?`)) {
                    delete profiles[profileName];
                    this.saveProfiles(profiles);
                    this.updateProfileList();
                    console.log(`🗑️ Profile '${profileName}' deleted`);
                }
            });
        });
    }

    static resetSettings() {
        if (confirm('Reset all settings to defaults? This action cannot be undone.')) {
            this.settings = this.getDefaultSettings();
            this.loadCurrentSettings();
            this.saveSettings();
            alert('Settings have been reset to defaults.');
        }
    }

    static exportSettings() {
        const dataStr = JSON.stringify(this.settings, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'emberframe-settings-v6.json';
        link.click();

        URL.revokeObjectURL(url);
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
                        const imported = JSON.parse(e.target.result);
                        this.settings = { ...this.getDefaultSettings(), ...imported };
                        this.loadCurrentSettings();
                        this.saveSettings();
                        alert('Settings imported successfully!');
                    } catch (error) {
                        alert('Error importing settings: Invalid file format.');
                    }
                };
                reader.readAsText(file);
            }
        };

        input.click();
    }

    static clearCache() {
        if (confirm('Clear all cached data? This may improve performance.')) {
            try {
                localStorage.removeItem('emberframe-cache');
                localStorage.removeItem('particle-cache');
                alert('Cache cleared successfully!');
            } catch (error) {
                alert('Error clearing cache.');
            }
        }
    }

    static saveSettings() {
        try {
            localStorage.setItem('emberframe-settings-v6', JSON.stringify(this.settings));
        } catch (error) {
            console.error('Failed to save settings:', error);
        }
    }

    static loadSettings() {
        try {
            const saved = localStorage.getItem('emberframe-settings-v6');
            return saved ? { ...this.getDefaultSettings(), ...JSON.parse(saved) } : this.getDefaultSettings();
        } catch (error) {
            return this.getDefaultSettings();
        }
    }

    static getDefaultSettings() {
        return {
            // Appearance
            colorScheme: 'dark',
            accentColor: '#00d4ff',
            'blur-effects': true,
            'window-shadows': true,
            'smooth-animations': true,
            'parallax-effects': false,
            'window-transparency': 10,
            'ui-scale': 1,

            // Background
            backgroundType: 'gradient',
            'gradient-start': '#667eea',
            'gradient-end': '#764ba2',
            'gradient-angle': 135,
            'gradient-opacity': 100,
            backgroundAnimation: 'matrix',
            'animation-speed': 0.8,
            'animation-intensity': 0.7,
            backgroundPattern: 'dots',
            'pattern-size': 20,
            'pattern-opacity': 30,
            'pattern-color': '#00d4ff',
            'pattern-animate': false,
            'media-url': '',
            'media-opacity': 50,
            'media-blur': false,

            // Particles - Optimized for Performance
            'particles-enabled': true,
            'particle-count': 50,
            particleBehavior: 'float',
            'particle-size': 2,
            'particle-speed': 0.8,
            'particle-color': '#00d4ff',
            'particle-glow': false,
            'particle-trails': false,
            'particle-connect': false,
            'mouse-force': 1,
            'mouse-range': 80,
            'mouse-click-burst': false,

            // Interface
            'auto-hide-taskbar': false,
            'snap-windows': true,
            'show-clock': true,
            'minimize-to-tray': false,
            'font-family': "'Segoe UI', sans-serif",
            'font-size': 14,
            'icon-size': 48,
            'icon-spacing': 120,

            // Advanced
            'frame-rate': 60,
            'hardware-acceleration': true,
            'show-fps': false,
            'debug-mode': false,
            'performance-monitor': false,
            'verbose-logging': false
        };
    }

    static onClose() {
        this.saveSettings();
        console.log('🔧 Settings Pro v6.0 saved and systems maintained');
    }

    static applyStartupSettings() {
        const settings = this.loadSettings();
        console.log('🚀 Applying startup settings v6.0:', settings);

        this.settings = settings;
        this.setColorScheme(settings.colorScheme);
        this.setAccentColor(settings.accentColor);

        // Initialize systems
        this.initializeSystems();

        console.log('✅ Startup settings v6.0 applied successfully');
    }

    static getStyles() {
        return `
            <style>
                .settings-container {
                    display: flex;
                    height: 100%;
                    background: var(--bg-primary, #1a1a1a);
                    color: var(--text-primary, #ffffff);
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    overflow: hidden;
                }

                /* Sidebar */
                .settings-sidebar {
                    width: 220px;
                    background: linear-gradient(180deg, #2d2d2d 0%, #1a1a1a 100%);
                    border-right: 1px solid #333;
                    display: flex;
                    flex-direction: column;
                }

                .settings-header {
                    padding: 20px;
                    text-align: center;
                    border-bottom: 1px solid #333;
                }

                .settings-logo {
                    font-size: 32px;
                    margin-bottom: 8px;
                }

                .settings-title {
                    font-size: 18px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    margin-bottom: 4px;
                }

                .settings-version {
                    font-size: 12px;
                    opacity: 0.7;
                    color: var(--accent-color, #00d4ff);
                }

                .settings-nav {
                    flex: 1;
                    padding: 20px 0;
                }

                .nav-item {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px 20px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border-left: 3px solid transparent;
                }

                .nav-item:hover {
                    background: rgba(255, 255, 255, 0.1);
                }

                .nav-item.active {
                    background: rgba(0, 212, 255, 0.2);
                    border-left-color: var(--accent-color, #00d4ff);
                    color: var(--accent-color, #00d4ff);
                }

                .nav-item i {
                    width: 16px;
                    font-size: 14px;
                }

                /* Content */
                .settings-content {
                    flex: 1;
                    padding: 30px;
                    overflow-y: auto;
                    background: var(--bg-secondary, #0f0f0f);
                }

                .settings-section {
                    display: none;
                }

                .settings-section.active {
                    display: block;
                    animation: fadeIn 0.3s ease;
                }

                .section-title {
                    font-size: 24px;
                    font-weight: 700;
                    margin-bottom: 30px;
                    color: var(--accent-color, #00d4ff);
                    border-bottom: 2px solid var(--accent-color, #00d4ff);
                    padding-bottom: 10px;
                }

                /* Setting Groups */
                .setting-group {
                    margin-bottom: 25px;
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 12px;
                    padding: 20px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    transition: all 0.3s ease;
                }

                .setting-group:hover {
                    background: rgba(255, 255, 255, 0.08);
                    border-color: rgba(0, 212, 255, 0.3);
                }

                .setting-group > label {
                    display: block;
                    font-size: 16px;
                    font-weight: 600;
                    margin-bottom: 15px;
                    color: #ffffff;
                }

                /* Preset Grid */
                .preset-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 15px;
                }

                .preset-card {
                    background: rgba(255, 255, 255, 0.05);
                    border: 2px solid rgba(255, 255, 255, 0.2);
                    border-radius: 12px;
                    padding: 20px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                }

                .preset-card:hover {
                    border-color: var(--accent-color, #00d4ff);
                    background: rgba(255, 255, 255, 0.1);
                    transform: translateY(-3px);
                    box-shadow: 0 8px 25px rgba(0, 212, 255, 0.3);
                }

                .preset-preview {
                    width: 100%;
                    height: 80px;
                    border-radius: 8px;
                    margin-bottom: 15px;
                    position: relative;
                    overflow: hidden;
                }

                .preset-preview.cyberpunk-preview {
                    background: linear-gradient(45deg, #0a0a0f, #ff00ff);
                }

                .preset-preview.space-preview {
                    background: linear-gradient(45deg, #000000, #1a1a3a);
                }

                .preset-preview.ocean-preview {
                    background: linear-gradient(45deg, #0f3460, #87ceeb);
                }

                .preset-preview.forest-preview {
                    background: linear-gradient(45deg, #1a2e1a, #90ee90);
                }

                .preset-preview.synthwave-preview {
                    background: linear-gradient(45deg, #2d1b69, #ff6b6b);
                }

                .preset-preview.minimal-preview {
                    background: linear-gradient(45deg, #ffffff, #f8f9fa);
                }

                .preset-preview.aurora-preview {
                    background: linear-gradient(45deg, #1a2040, #80ff80);
                }

                .preset-preview.volcanic-preview {
                    background: linear-gradient(45deg, #3d1a00, #ff4400);
                }

                .preset-preview.gaming-preview {
                    background: linear-gradient(45deg, #0d0d0d, #ff0080);
                }

                .preset-preview.productivity-preview {
                    background: linear-gradient(45deg, #f8f9fa, #007bff);
                }

                .preset-preview.party-preview {
                    background: linear-gradient(45deg, #ff69b4, #00ffff);
                }

                .preset-preview.zen-preview {
                    background: linear-gradient(45deg, #0f1f0f, #98fb98);
                }

                .preset-name {
                    font-size: 16px;
                    font-weight: 600;
                    margin-bottom: 5px;
                    color: var(--accent-color, #00d4ff);
                }

                .preset-desc {
                    font-size: 12px;
                    opacity: 0.8;
                    line-height: 1.4;
                }

                /* Color Schemes */
                .color-schemes {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
                    gap: 12px;
                }

                .color-scheme {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                    padding: 15px;
                    border-radius: 10px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border: 2px solid transparent;
                    background: rgba(255, 255, 255, 0.05);
                }

                .color-scheme:hover {
                    background: rgba(255, 255, 255, 0.1);
                    transform: translateY(-2px);
                }

                .color-scheme.active {
                    border-color: var(--accent-color, #00d4ff);
                    background: rgba(0, 212, 255, 0.2);
                    box-shadow: 0 4px 15px rgba(0, 212, 255, 0.3);
                }

                .scheme-preview {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    border: 2px solid rgba(255, 255, 255, 0.3);
                }

                .scheme-preview.dark { background: linear-gradient(45deg, #1a1a1a, #2d2d2d); }
                .scheme-preview.light { background: linear-gradient(45deg, #ffffff, #f0f0f0); }
                .scheme-preview.cyber { background: linear-gradient(45deg, #00d4ff, #ff00ff); }
                .scheme-preview.neon { background: linear-gradient(45deg, #00ffff, #ff0080); }
                .scheme-preview.matrix { background: linear-gradient(45deg, #000000, #00ff00); }
                .scheme-preview.synthwave { background: linear-gradient(45deg, #2d1b69, #ff6b6b); }
                .scheme-preview.ocean { background: linear-gradient(45deg, #0f3460, #87ceeb); }
                .scheme-preview.sunset { background: linear-gradient(45deg, #ff6347, #ffd700); }
                .scheme-preview.forest { background: linear-gradient(45deg, #1a2e1a, #90ee90); }
                .scheme-preview.aurora { background: linear-gradient(45deg, #1a2040, #80ff80); }

                /* Color Picker Enhanced */
                .color-picker-enhanced {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    flex-wrap: wrap;
                }

                .color-picker-enhanced input[type="color"] {
                    width: 60px;
                    height: 50px;
                    border: none;
                    border-radius: 10px;
                    cursor: pointer;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
                }

                .preset-colors {
                    display: flex;
                    gap: 8px;
                    flex-wrap: wrap;
                }

                .color-preset {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    cursor: pointer;
                    border: 2px solid transparent;
                    transition: all 0.3s ease;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
                }

                .color-preset:hover {
                    transform: scale(1.1);
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
                }

                .color-preset.active {
                    border-color: #ffffff;
                    box-shadow: 0 0 0 3px var(--accent-color, #00d4ff);
                }

                .color-random-btn {
                    padding: 10px 15px;
                    background: linear-gradient(135deg, var(--accent-color, #00d4ff), #0099cc);
                    color: white;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 600;
                    transition: all 0.3s ease;
                }

                .color-random-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 15px rgba(0, 212, 255, 0.4);
                }

                /* Effects Grid */
                .effects-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 15px;
                }

                /* Background Types */
                .background-types {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
                    gap: 15px;
                }

                .bg-type {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                    padding: 20px;
                    border: 2px solid rgba(255, 255, 255, 0.2);
                    border-radius: 12px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    background: rgba(255, 255, 255, 0.05);
                }

                .bg-type:hover {
                    border-color: var(--accent-color, #00d4ff);
                    background: rgba(255, 255, 255, 0.1);
                }

                .bg-type.active {
                    border-color: var(--accent-color, #00d4ff);
                    background: rgba(0, 212, 255, 0.2);
                    box-shadow: 0 4px 15px rgba(0, 212, 255, 0.3);
                }

                .bg-type i {
                    font-size: 24px;
                    color: var(--accent-color, #00d4ff);
                }

                /* Animated Grid */
                .animated-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
                    gap: 12px;
                }

                .animated-option {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                    padding: 15px;
                    border: 2px solid rgba(255, 255, 255, 0.2);
                    border-radius: 10px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    background: rgba(255, 255, 255, 0.05);
                }

                .animated-option:hover {
                    border-color: var(--accent-color, #00d4ff);
                    background: rgba(255, 255, 255, 0.1);
                }

                .animated-option.active {
                    border-color: var(--accent-color, #00d4ff);
                    background: rgba(0, 212, 255, 0.2);
                    box-shadow: 0 4px 15px rgba(0, 212, 255, 0.3);
                }

                .animated-option i {
                    font-size: 20px;
                    color: var(--accent-color, #00d4ff);
                }

                /* Pattern Grid */
                .pattern-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
                    gap: 10px;
                }

                .pattern-option {
                    padding: 12px;
                    text-align: center;
                    border: 2px solid rgba(255, 255, 255, 0.2);
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    background: rgba(255, 255, 255, 0.05);
                    font-size: 12px;
                }

                .pattern-option:hover {
                    border-color: var(--accent-color, #00d4ff);
                    background: rgba(255, 255, 255, 0.1);
                }

                .pattern-option.active {
                    border-color: var(--accent-color, #00d4ff);
                    background: rgba(0, 212, 255, 0.2);
                    color: var(--accent-color, #00d4ff);
                }

                /* Particle System */
                .particles-toggle-section {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 20px;
                    flex-wrap: wrap;
                    gap: 15px;
                }

                .particles-master-toggle {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .toggle-label {
                    font-size: 16px;
                    font-weight: 600;
                }

                .particles-status {
                    padding: 8px 16px;
                    border-radius: 20px;
                    font-size: 14px;
                    font-weight: 500;
                    transition: all 0.3s ease;
                }

                .particles-status.active {
                    background: rgba(0, 255, 0, 0.2);
                    color: #00ff00;
                    border: 1px solid #00ff00;
                }

                .particles-status.inactive {
                    background: rgba(255, 0, 0, 0.2);
                    color: #ff6666;
                    border: 1px solid #ff6666;
                }

                .status-text {
                    font-weight: 500;
                }

                /* Test Buttons */
                .test-buttons {
                    display: flex;
                    gap: 10px;
                    flex-wrap: wrap;
                }

                .test-btn {
                    padding: 8px 15px;
                    background: linear-gradient(135deg, #666, #888);
                    color: white;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-weight: 500;
                    transition: all 0.3s ease;
                    font-size: 12px;
                }

                .test-btn:hover {
                    background: linear-gradient(135deg, #777, #999);
                    transform: translateY(-2px);
                }

                /* Behavior Grid */
                .behavior-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
                    gap: 10px;
                }

                .behavior-option {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 5px;
                    padding: 12px 8px;
                    border: 2px solid rgba(255, 255, 255, 0.2);
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    background: rgba(255, 255, 255, 0.05);
                    font-size: 11px;
                    text-align: center;
                }

                .behavior-option:hover {
                    border-color: var(--accent-color, #00d4ff);
                    background: rgba(255, 255, 255, 0.1);
                }

                .behavior-option.active {
                    border-color: var(--accent-color, #00d4ff);
                    background: rgba(0, 212, 255, 0.2);
                    color: var(--accent-color, #00d4ff);
                }

                .behavior-option i {
                    font-size: 16px;
                    color: var(--accent-color, #00d4ff);
                }

                /* Controls */
                .control-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 20px;
                }

                .control-item {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .control-item label {
                    font-size: 14px;
                    font-weight: 500;
                    color: rgba(255, 255, 255, 0.9);
                }

                .slider-container {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                }

                input[type="range"] {
                    flex: 1;
                    height: 8px;
                    border-radius: 4px;
                    background: rgba(255, 255, 255, 0.2);
                    outline: none;
                    -webkit-appearance: none;
                }

                input[type="range"]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: var(--accent-color, #00d4ff);
                    cursor: pointer;
                    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
                    transition: all 0.3s ease;
                }

                input[type="range"]::-webkit-slider-thumb:hover {
                    transform: scale(1.2);
                }

                .slider-value {
                    font-weight: 600;
                    color: var(--accent-color, #00d4ff);
                    min-width: 50px;
                    text-align: right;
                }

                /* Checkboxes */
                .checkbox-item {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    cursor: pointer;
                    user-select: none;
                    transition: all 0.3s ease;
                    padding: 5px 0;
                }

                .checkbox-item:hover {
                    color: var(--accent-color, #00d4ff);
                }

                .checkbox-item input[type="checkbox"] {
                    display: none;
                }

                .checkmark {
                    width: 20px;
                    height: 20px;
                    background: rgba(255, 255, 255, 0.1);
                    border: 2px solid rgba(255, 255, 255, 0.3);
                    border-radius: 6px;
                    position: relative;
                    transition: all 0.3s ease;
                    flex-shrink: 0;
                }

                .checkbox-item input:checked + .checkmark {
                    background: var(--accent-color, #00d4ff);
                    border-color: var(--accent-color, #00d4ff);
                    box-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
                }

                .checkbox-item input:checked + .checkmark::after {
                    content: '✓';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    color: white;
                    font-weight: bold;
                    font-size: 12px;
                }

                /* Select Elements */
                select {
                    padding: 10px 15px;
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    border-radius: 8px;
                    color: white;
                    outline: none;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    width: 100%;
                }

                select:hover {
                    border-color: var(--accent-color, #00d4ff);
                }

                /* Media Controls */
                .media-input-group {
                    display: flex;
                    gap: 10px;
                    align-items: center;
                }

                .media-input {
                    flex: 1;
                    padding: 10px 15px;
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    border-radius: 8px;
                    color: white;
                    outline: none;
                }

                .browse-btn {
                    padding: 10px 15px;
                    background: var(--accent-color, #00d4ff);
                    color: white;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-weight: 500;
                    transition: all 0.3s ease;
                }

                .browse-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 15px rgba(0, 212, 255, 0.4);
                }

                /* Profile Management */
                .profile-management {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }

                .profile-list {
                    max-height: 200px;
                    overflow-y: auto;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    border-radius: 8px;
                    padding: 10px;
                }

                .profile-item {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 10px;
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 6px;
                    margin-bottom: 8px;
                }

                .profile-name {
                    font-weight: 500;
                }

                .profile-actions {
                    display: flex;
                    gap: 5px;
                }

                .profile-btn {
                    padding: 5px 10px;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 12px;
                    transition: all 0.3s ease;
                }

                .profile-btn.load {
                    background: var(--accent-color, #00d4ff);
                    color: white;
                }

                .profile-btn.delete {
                    background: #ff4444;
                    color: white;
                }

                .profile-btn:hover {
                    transform: translateY(-1px);
                }

                .profile-controls {
                    display: flex;
                    gap: 10px;
                    align-items: center;
                }

                .profile-input {
                    flex: 1;
                    padding: 10px 15px;
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    border-radius: 8px;
                    color: white;
                    outline: none;
                }

                /* Action Buttons */
                .action-buttons {
                    display: flex;
                    gap: 12px;
                    flex-wrap: wrap;
                }

                .action-btn {
                    padding: 12px 20px;
                    background: linear-gradient(135deg, var(--accent-color, #00d4ff), #0099cc);
                    color: white;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    flex: 1;
                    min-width: 120px;
                }

                .action-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 15px rgba(0, 212, 255, 0.4);
                }

                .action-btn.danger {
                    background: linear-gradient(135deg, #ff4444, #cc0000);
                }

                .action-btn.danger:hover {
                    box-shadow: 0 4px 15px rgba(255, 68, 68, 0.4);
                }

                /* Animations */
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                    }
                    to {
                        transform: translateX(0);
                    }
                }

                @keyframes slideOutRight {
                    from {
                        transform: translateX(0);
                    }
                    to {
                        transform: translateX(100%);
                    }
                }

                @keyframes patternMove {
                    0% { background-position: 0px 0px; }
                    100% { background-position: 20px 20px; }
                }

                /* Scrollbars */
                .settings-content::-webkit-scrollbar,
                .profile-list::-webkit-scrollbar {
                    width: 8px;
                }

                .settings-content::-webkit-scrollbar-track,
                .profile-list::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 4px;
                }

                .settings-content::-webkit-scrollbar-thumb,
                .profile-list::-webkit-scrollbar-thumb {
                    background: var(--accent-color, #00d4ff);
                    border-radius: 4px;
                }

                /* Responsive Design */
                @media (max-width: 768px) {
                    .settings-container {
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
                        white-space: nowrap;
                        flex-shrink: 0;
                    }
                    
                    .control-row {
                        grid-template-columns: 1fr;
                    }

                    .preset-grid {
                        grid-template-columns: 1fr;
                    }

                    .effects-grid {
                        grid-template-columns: 1fr;
                    }
                }
            </style>
        `;
    }
}

// Working Particle System (Performance Optimized)
class ParticleSystem {
    constructor(settings) {
        this.settings = settings || {};
        this.particles = [];
        this.canvas = null;
        this.ctx = null;
        this.animationId = null;
        this.isRunning = false;
        this.frameCount = 0;
        this.lastPerformanceCheck = 0;
        this.performanceMode = 'normal'; // normal, reduced, minimal
        this.updateInterval = 1; // Update every frame by default
        this.currentFrame = 0;

        this.mouse = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            lastX: 0,
            lastY: 0,
            vx: 0,
            vy: 0,
            clicked: false
        };
        this.clickParticles = [];

        this.init();
    }

    init() {
        console.log('🎆 Initializing optimized particle system...');
        this.createCanvas();
        this.setupEventListeners();
        this.createParticles();
        this.startAnimation();
        this.startPerformanceMonitoring();
        console.log('✅ Optimized particle system initialized successfully');
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: -8;
        `;
        this.resize();
        this.ctx = this.canvas.getContext('2d');

        // Optimize canvas settings
        this.ctx.imageSmoothingEnabled = false;

        document.body.appendChild(this.canvas);
    }

    setupEventListeners() {
        window.addEventListener('resize', () => this.resize());

        // Throttle mouse events for better performance
        let mouseThrottle = false;
        document.addEventListener('mousemove', (e) => {
            if (mouseThrottle) return;
            mouseThrottle = true;
            requestAnimationFrame(() => {
                this.mouse.lastX = this.mouse.x;
                this.mouse.lastY = this.mouse.y;
                this.mouse.x = e.clientX;
                this.mouse.y = e.clientY;
                this.mouse.vx = this.mouse.x - this.mouse.lastX;
                this.mouse.vy = this.mouse.y - this.mouse.lastY;
                mouseThrottle = false;
            });
        });

        document.addEventListener('click', (e) => {
            this.mouse.clicked = true;
            if (this.settings['mouse-click-burst'] && this.performanceMode !== 'minimal') {
                this.createClickBurst(e.clientX, e.clientY);
            }
            setTimeout(() => {
                this.mouse.clicked = false;
            }, 100);
        });
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        this.particles = [];
        let count = parseInt(this.settings['particle-count']) || 50;

        // Adjust count based on performance mode
        switch (this.performanceMode) {
            case 'reduced':
                count = Math.floor(count * 0.7);
                break;
            case 'minimal':
                count = Math.floor(count * 0.4);
                break;
        }

        for (let i = 0; i < count; i++) {
            this.particles.push(this.createParticle());
        }

        console.log(`Created ${count} particles (${this.performanceMode} mode)`);
    }

    createParticle() {
        return {
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            angle: Math.random() * Math.PI * 2,
            speed: Math.random() * 2 + 0.5,
            life: Math.random() * 100,
            maxLife: Math.random() * 100 + 50,
            originalX: 0,
            originalY: 0,
            phase: Math.random() * Math.PI * 2,
            radius: Math.random() * 100 + 50,
            orbitalAngle: Math.random() * Math.PI * 2,
            trail: [],
            lastUpdate: 0
        };
    }

    setBehavior(behavior) {
        this.settings.particleBehavior = behavior;
        console.log(`Particle behavior set to: ${behavior}`);
    }

    updateSettings(settings) {
        this.settings = settings;
        const newCount = parseInt(settings['particle-count']) || 50;
        if (Math.abs(newCount - this.particles.length) > 10) {
            this.createParticles();
        }
    }

    testBurst() {
        // Optimized burst - fewer particles
        const burstCount = this.performanceMode === 'minimal' ? 10 :
                          this.performanceMode === 'reduced' ? 20 : 30;

        for (let i = 0; i < burstCount; i++) {
            const angle = (Math.PI * 2 * i) / burstCount;
            const speed = Math.random() * 3 + 1;
            this.particles.push({
                ...this.createParticle(),
                x: this.mouse.x,
                y: this.mouse.y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 0,
                maxLife: 40
            });
        }
        console.log('🧪 Optimized particle burst test executed');
    }

    createClickBurst(x, y) {
        const burstCount = this.performanceMode === 'minimal' ? 5 :
                          this.performanceMode === 'reduced' ? 10 : 15;

        for (let i = 0; i < burstCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 6 + 1;
            this.clickParticles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 0,
                maxLife: 30,
                size: Math.random() * 3 + 1,
                color: this.settings['particle-color'] || '#00d4ff'
            });
        }
    }

    startPerformanceMonitoring() {
        setInterval(() => {
            const now = performance.now();
            if (now - this.lastPerformanceCheck > 5000) { // Check every 5 seconds
                this.adjustPerformance();
                this.lastPerformanceCheck = now;
            }
        }, 5000);
    }

    adjustPerformance() {
        const fps = this.frameCount / 5; // Average FPS over 5 seconds
        this.frameCount = 0;

        if (fps < 30 && this.performanceMode === 'normal') {
            this.performanceMode = 'reduced';
            this.updateInterval = 2; // Update every 2nd frame
            this.createParticles();
            console.log('🔧 Performance mode: REDUCED');
        } else if (fps < 20 && this.performanceMode === 'reduced') {
            this.performanceMode = 'minimal';
            this.updateInterval = 3; // Update every 3rd frame
            this.createParticles();
            console.log('🔧 Performance mode: MINIMAL');
        } else if (fps > 50 && this.performanceMode !== 'normal') {
            this.performanceMode = 'normal';
            this.updateInterval = 1;
            this.createParticles();
            console.log('🔧 Performance mode: NORMAL');
        }
    }

    updateParticles() {
        this.currentFrame++;

        // Skip updates based on performance mode
        if (this.currentFrame % this.updateInterval !== 0) {
            return;
        }

        const behavior = this.settings.particleBehavior || 'float';
        const speed = parseFloat(this.settings['particle-speed']) || 0.8;
        const trails = this.settings['particle-trails'] && this.performanceMode !== 'minimal';
        const now = Date.now();

        this.particles.forEach((particle, index) => {
            // Throttle particle updates for better performance
            if (now - particle.lastUpdate < 16) return; // ~60fps max per particle
            particle.lastUpdate = now;

            // Update trail (optimized)
            if (trails) {
                particle.trail.push({ x: particle.x, y: particle.y });
                if (particle.trail.length > 5) { // Reduced trail length
                    particle.trail.shift();
                }
            }

            this.updateParticleBehavior(particle, behavior, speed);

            // Boundary wrapping
            if (particle.x < -50) particle.x = this.canvas.width + 50;
            if (particle.x > this.canvas.width + 50) particle.x = -50;
            if (particle.y < -50) particle.y = this.canvas.height + 50;
            if (particle.y > this.canvas.height + 50) particle.y = -50;
        });

        // Update click particles (optimized)
        this.clickParticles = this.clickParticles.filter(particle => {
            particle.life++;
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += 0.1; // gravity
            particle.vx *= 0.98;
            particle.vy *= 0.98;
            return particle.life < particle.maxLife;
        });
    }

    updateParticleBehavior(particle, behavior, speed) {
        // Optimized behavior calculations
        switch (behavior) {
            case 'float':
                particle.x += particle.vx * speed;
                particle.y += particle.vy * speed;
                particle.vx *= 0.995; // Slight dampening
                particle.vy *= 0.995;
                break;

            case 'follow':
                if (this.performanceMode === 'minimal') {
                    // Simplified follow behavior
                    const dx = (this.mouse.x - particle.x) * 0.001;
                    const dy = (this.mouse.y - particle.y) * 0.001;
                    particle.vx += dx * speed;
                    particle.vy += dy * speed;
                } else {
                    const fdx = this.mouse.x - particle.x;
                    const fdy = this.mouse.y - particle.y;
                    const force = (this.settings['mouse-force'] || 1) * 0.0001;
                    particle.vx += fdx * force * speed;
                    particle.vy += fdy * force * speed;
                }
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.vx *= 0.95;
                particle.vy *= 0.95;
                break;

            case 'dodge':
                const ddx = this.mouse.x - particle.x;
                const ddy = this.mouse.y - particle.y;
                const dist = ddx * ddx + ddy * ddy; // Skip sqrt for performance
                const range = this.settings['mouse-range'] || 80;
                if (dist < range * range) {
                    const force = (this.settings['mouse-force'] || 1) * 0.001;
                    particle.vx -= ddx * force * speed;
                    particle.vy -= ddy * force * speed;
                }
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.vx *= 0.98;
                particle.vy *= 0.98;
                break;

            case 'orbit':
                const centerX = this.canvas.width / 2;
                const centerY = this.canvas.height / 2;
                particle.orbitalAngle += 0.015 * speed; // Slightly slower
                particle.x = centerX + Math.cos(particle.orbitalAngle) * particle.radius;
                particle.y = centerY + Math.sin(particle.orbitalAngle) * particle.radius;
                break;

            case 'spiral':
                const scx = this.canvas.width / 2;
                const scy = this.canvas.height / 2;
                particle.angle += 0.02 * speed;
                const spiralRadius = (particle.angle * 2) % 150; // Smaller spiral
                particle.x = scx + Math.cos(particle.angle) * spiralRadius;
                particle.y = scy + Math.sin(particle.angle) * spiralRadius;
                break;

            case 'wave':
                particle.phase += 0.03 * speed;
                particle.x += particle.vx * speed;
                particle.y = particle.originalY + Math.sin(particle.phase + particle.x * 0.008) * 30;
                if (!particle.originalY) particle.originalY = particle.y;
                break;

            case 'bounce':
                particle.x += particle.vx * speed;
                particle.y += particle.vy * speed;
                if (particle.x <= 0 || particle.x >= this.canvas.width) particle.vx *= -0.8;
                if (particle.y <= 0 || particle.y >= this.canvas.height) particle.vy *= -0.8;
                break;

            case 'constellation':
                particle.x += particle.vx * 0.3 * speed;
                particle.y += particle.vy * 0.3 * speed;
                break;

            case 'fireworks':
                particle.life += speed;
                if (particle.life > particle.maxLife) {
                    particle.x = Math.random() * this.canvas.width;
                    particle.y = this.canvas.height;
                    particle.vx = (Math.random() - 0.5) * 8;
                    particle.vy = -Math.random() * 8 - 3;
                    particle.life = 0;
                }
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.vy += 0.15; // gravity
                break;

            case 'swarm':
                // Simplified swarm behavior for performance
                if (this.performanceMode !== 'minimal') {
                    let avgX = 0, avgY = 0, count = 0;
                    // Check fewer neighbors for performance
                    const step = this.performanceMode === 'reduced' ? 3 : 2;
                    for (let i = 0; i < this.particles.length; i += step) {
                        const other = this.particles[i];
                        if (other !== particle) {
                            const dx = other.x - particle.x;
                            const dy = other.y - particle.y;
                            const d = dx * dx + dy * dy; // Skip sqrt
                            if (d < 2500) { // 50px squared
                                avgX += other.x; avgY += other.y; count++;
                            }
                        }
                    }
                    if (count > 0) {
                        avgX /= count; avgY /= count;
                        particle.vx += (avgX - particle.x) * 0.00005 * speed;
                        particle.vy += (avgY - particle.y) * 0.00005 * speed;
                    }
                }
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.vx *= 0.99;
                particle.vy *= 0.99;
                break;

            case 'gravity':
                particle.x += particle.vx * speed;
                particle.y += particle.vy * speed;
                particle.vy += 0.05 * speed; // gravity
                if (particle.y > this.canvas.height) {
                    particle.y = 0;
                    particle.x = Math.random() * this.canvas.width;
                    particle.vy = Math.random();
                }
                break;

            case 'magnetic':
                // Simplified magnetic behavior
                if (this.performanceMode !== 'minimal') {
                    const step = this.performanceMode === 'reduced' ? 4 : 3;
                    for (let i = 0; i < this.particles.length; i += step) {
                        const other = this.particles[i];
                        if (other !== particle) {
                            const dx = other.x - particle.x;
                            const dy = other.y - particle.y;
                            const d = dx * dx + dy * dy; // Skip sqrt
                            if (d < 10000 && d > 0) { // 100px squared
                                particle.vx += dx * 0.00002 * speed;
                                particle.vy += dy * 0.00002 * speed;
                            }
                        }
                    }
                }
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.vx *= 0.99;
                particle.vy *= 0.99;
                break;

            default:
                // Default float behavior
                particle.x += particle.vx * speed;
                particle.y += particle.vy * speed;
                break;
        }
    }

    drawParticles() {
        // Optimized clearing
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const size = Math.max(1, parseInt(this.settings['particle-size']) || 2);
        const color = this.settings['particle-color'] || '#00d4ff';
        const glow = this.settings['particle-glow'] && this.performanceMode !== 'minimal';
        const connect = this.settings['particle-connect'] && this.performanceMode === 'normal';
        const trails = this.settings['particle-trails'] && this.performanceMode !== 'minimal';

        // Batch rendering optimizations
        this.ctx.save();

        // Draw connections first (if enabled and performance allows)
        if (connect) {
            this.ctx.globalAlpha = 0.3;
            this.ctx.strokeStyle = color;
            this.ctx.lineWidth = 1;
            this.ctx.beginPath();

            // Limit connection checks for performance
            const step = 2;
            for (let i = 0; i < this.particles.length; i += step) {
                const particle = this.particles[i];
                for (let j = i + step; j < this.particles.length; j += step) {
                    const other = this.particles[j];
                    const dx = particle.x - other.x;
                    const dy = particle.y - other.y;
                    const dist = dx * dx + dy * dy; // Skip sqrt
                    if (dist < 6400) { // 80px squared
                        this.ctx.moveTo(particle.x, particle.y);
                        this.ctx.lineTo(other.x, other.y);
                    }
                }
            }
            this.ctx.stroke();
        }

        // Set up glow once for all particles
        if (glow) {
            this.ctx.shadowColor = color;
            this.ctx.shadowBlur = size * 2; // Reduced glow intensity
        }

        // Draw particles in batches
        this.ctx.globalAlpha = 1;
        this.ctx.fillStyle = color;
        this.ctx.beginPath();

        this.particles.forEach(particle => {
            // Culling - don't draw particles outside view
            if (particle.x < -size || particle.x > this.canvas.width + size ||
                particle.y < -size || particle.y > this.canvas.height + size) {
                return;
            }

            // Draw trail (simplified)
            if (trails && particle.trail && particle.trail.length > 1) {
                this.ctx.save();
                this.ctx.globalAlpha = 0.4;
                this.ctx.strokeStyle = color;
                this.ctx.lineWidth = 1;
                this.ctx.beginPath();
                this.ctx.moveTo(particle.trail[0].x, particle.trail[0].y);
                for (let i = 1; i < particle.trail.length; i++) {
                    this.ctx.lineTo(particle.trail[i].x, particle.trail[i].y);
                }
                this.ctx.stroke();
                this.ctx.restore();
            }

            // Draw particle
            this.ctx.moveTo(particle.x + size, particle.y);
            this.ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
        });

        this.ctx.fill();

        // Draw click particles (simplified)
        if (this.clickParticles.length > 0) {
            this.ctx.beginPath();
            this.clickParticles.forEach(particle => {
                const alpha = 1 - (particle.life / particle.maxLife);
                if (alpha > 0.1) {
                    this.ctx.globalAlpha = alpha;
                    this.ctx.moveTo(particle.x + particle.size, particle.y);
                    this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                }
            });
            this.ctx.fillStyle = color;
            this.ctx.fill();
        }

        this.ctx.restore();
    }

    startAnimation() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.animate();
    }

    animate() {
        if (!this.isRunning) return;

        this.frameCount++;
        this.updateParticles();
        this.drawParticles();

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    destroy() {
        this.isRunning = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
        console.log('🚫 Optimized particle system destroyed');
    }
}

// Animated Background System
class BackgroundSystem {
    constructor(settings) {
        this.settings = settings;
        this.canvas = null;
        this.ctx = null;
        this.animationId = null;
        this.time = 0;
        this.animation = settings.backgroundAnimation || 'matrix';

        this.init();
    }

    init() {
        this.createCanvas();
        this.animate();
        console.log('🎬 Background system initialized');
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: -9;
        `;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);

        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        });
    }

    setAnimation(animation) {
        this.animation = animation;
        console.log(`Background animation set to: ${animation}`);
    }

    animate() {
        const speed = this.settings['animation-speed'] || 1;
        const intensity = this.settings['animation-intensity'] || 1;
        this.time += 0.02 * speed;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        switch (this.animation) {
            case 'matrix':
                this.drawMatrixRain(intensity);
                break;
            case 'waves':
                this.drawWaves(intensity);
                break;
            case 'neural':
                this.drawNeuralNetwork(intensity);
                break;
            case 'plasma':
                this.drawPlasmaField(intensity);
                break;
            case 'starfield':
                this.drawStarfield(intensity);
                break;
            case 'fractals':
                this.drawFractals(intensity);
                break;
            case 'fire':
                this.drawFireEffect(intensity);
                break;
            case 'dna':
                this.drawDNAStrands(intensity);
                break;
            case 'galaxy':
                this.drawGalaxySpiral(intensity);
                break;
        }

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    drawMatrixRain(intensity) {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = '#00ff00';
        this.ctx.font = '15px monospace';

        const columns = Math.floor(this.canvas.width / 20);
        for (let i = 0; i < columns * intensity; i++) {
            const text = String.fromCharCode(Math.random() * 128);
            const x = (i % columns) * 20;
            const y = (this.time * 100 + i * 50) % this.canvas.height;
            this.ctx.fillText(text, x, y);
        }
    }

    drawWaves(intensity) {
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, `rgba(0, 212, 255, ${0.1 * intensity})`);
        gradient.addColorStop(1, `rgba(0, 0, 0, ${0.3 * intensity})`);
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.strokeStyle = `rgba(0, 212, 255, ${0.5 * intensity})`;
        this.ctx.lineWidth = 2;

        for (let i = 0; i < 5 * intensity; i++) {
            this.ctx.beginPath();
            for (let x = 0; x <= this.canvas.width; x += 10) {
                const y = this.canvas.height / 2 + Math.sin((x + this.time * 100) * 0.01 + i) * 50;
                if (x === 0) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
            }
            this.ctx.stroke();
        }
    }

    drawNeuralNetwork(intensity) {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        const nodes = Math.floor(20 * intensity);
        const nodePositions = [];

        for (let i = 0; i < nodes; i++) {
            const x = (Math.sin(this.time + i) + 1) * this.canvas.width / 2;
            const y = (Math.cos(this.time * 0.7 + i) + 1) * this.canvas.height / 2;
            nodePositions.push({ x, y });

            // Draw node
            this.ctx.fillStyle = `rgba(0, 212, 255, ${0.8 * intensity})`;
            this.ctx.beginPath();
            this.ctx.arc(x, y, 3, 0, Math.PI * 2);
            this.ctx.fill();
        }

        // Draw connections
        this.ctx.strokeStyle = `rgba(0, 212, 255, ${0.2 * intensity})`;
        this.ctx.lineWidth = 1;
        for (let i = 0; i < nodePositions.length; i++) {
            for (let j = i + 1; j < nodePositions.length; j++) {
                const dist = Math.sqrt(
                    Math.pow(nodePositions[i].x - nodePositions[j].x, 2) +
                    Math.pow(nodePositions[i].y - nodePositions[j].y, 2)
                );
                if (dist < 150) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(nodePositions[i].x, nodePositions[i].y);
                    this.ctx.lineTo(nodePositions[j].x, nodePositions[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }

    drawPlasmaField(intensity) {
        const imageData = this.ctx.createImageData(this.canvas.width, this.canvas.height);
        const data = imageData.data;

        for (let x = 0; x < this.canvas.width; x += 2) {
            for (let y = 0; y < this.canvas.height; y += 2) {
                const value = Math.sin(x * 0.01 + this.time) +
                             Math.sin(y * 0.01 + this.time) +
                             Math.sin((x + y) * 0.01 + this.time);

                const color = Math.floor((value + 3) * 42.5 * intensity);
                const index = (y * this.canvas.width + x) * 4;

                data[index] = color; // R
                data[index + 1] = color * 0.5; // G
                data[index + 2] = 255 - color; // B
                data[index + 3] = 100 * intensity; // A
            }
        }

        this.ctx.putImageData(imageData, 0, 0);
    }

    drawStarfield(intensity) {
        this.ctx.fillStyle = 'rgba(0, 0, 20, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = 'white';
        const starCount = Math.floor(200 * intensity);
        for (let i = 0; i < starCount; i++) {
            const x = (Math.sin(this.time * 0.1 + i) + 1) * this.canvas.width / 2;
            const y = (Math.cos(this.time * 0.1 + i * 0.7) + 1) * this.canvas.height / 2;
            const size = Math.sin(this.time + i) * 2 + 2;

            this.ctx.beginPath();
            this.ctx.arc(x, y, size, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    drawFractals(intensity) {
        this.ctx.fillStyle = 'rgba(0, 0, 20, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.strokeStyle = `rgba(0, 255, 0, ${0.7 * intensity})`;
        this.ctx.lineWidth = 2;

        const drawBranch = (x, y, angle, length, depth) => {
            if (depth === 0 || length < 2) return;

            const endX = x + Math.cos(angle) * length;
            const endY = y + Math.sin(angle) * length;

            this.ctx.beginPath();
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(endX, endY);
            this.ctx.stroke();

            const newLength = length * 0.7;
            const angleVariation = Math.sin(this.time + depth) * 0.5;

            drawBranch(endX, endY, angle - 0.5 + angleVariation, newLength, depth - 1);
            drawBranch(endX, endY, angle + 0.5 + angleVariation, newLength, depth - 1);
        };

        drawBranch(this.canvas.width / 2, this.canvas.height - 50, -Math.PI / 2, 60 * intensity, 8);
    }

    drawFireEffect(intensity) {
        this.ctx.fillStyle = 'rgba(20, 0, 0, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        for (let x = 0; x < this.canvas.width; x += 5) {
            const height = Math.sin(x * 0.01 + this.time * 2) * 100 + 200;
            const baseY = this.canvas.height - height * intensity;

            for (let y = baseY; y < this.canvas.height; y += 3) {
                const flicker = Math.random() * intensity;
                const heat = (this.canvas.height - y) / height;

                let r = Math.floor(255 * heat * flicker);
                let g = Math.floor(100 * heat * flicker);
                let b = 0;

                this.ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
                this.ctx.fillRect(x, y, 5, 3);
            }
        }
    }

    drawDNAStrands(intensity) {
        this.ctx.fillStyle = 'rgba(0, 20, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.strokeStyle = `rgba(0, 255, 100, ${0.8 * intensity})`;
        this.ctx.lineWidth = 3;

        const centerX = this.canvas.width / 2;
        const radius = 50 * intensity;

        for (let y = 0; y < this.canvas.height + 100; y += 10) {
            const t = (y + this.time * 100) * 0.02;
            const x1 = centerX + Math.cos(t) * radius;
            const x2 = centerX + Math.cos(t + Math.PI) * radius;

            this.ctx.beginPath();
            this.ctx.moveTo(x1, y);
            this.ctx.lineTo(x2, y);
            this.ctx.stroke();

            // Draw helix points
            this.ctx.beginPath();
            this.ctx.arc(x1, y, 3, 0, Math.PI * 2);
            this.ctx.stroke();

            this.ctx.beginPath();
            this.ctx.arc(x2, y, 3, 0, Math.PI * 2);
            this.ctx.stroke();
        }
    }

    drawGalaxySpiral(intensity) {
        this.ctx.fillStyle = 'rgba(0, 0, 20, 0.03)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;

        this.ctx.fillStyle = `rgba(255, 255, 255, ${0.8 * intensity})`;

        const starCount = Math.floor(1000 * intensity);
        for (let i = 0; i < starCount; i++) {
            const angle = i * 0.1 + this.time;
            const radius = i * 0.2;
            const spiralAngle = angle + radius * 0.01;

            const x = centerX + Math.cos(spiralAngle) * radius;
            const y = centerY + Math.sin(spiralAngle) * radius;

            if (x > 0 && x < this.canvas.width && y > 0 && y < this.canvas.height) {
                const size = Math.random() * 2 + 1;
                this.ctx.beginPath();
                this.ctx.arc(x, y, size, 0, Math.PI * 2);
                this.ctx.fill();
            }
        }
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
        console.log('🎬 Background system destroyed');
    }
}

// FPS Counter
class FPSCounter {
    constructor() {
        this.fps = 0;
        this.frameCount = 0;
        this.lastTime = performance.now();
        this.element = null;

        this.init();
    }

    init() {
        this.element = document.createElement('div');
        this.element.style.cssText = `
            position: fixed;
            top: 15px;
            right: 15px;
            background: rgba(0, 0, 0, 0.8);
            color: #00ff00;
            padding: 8px 12px;
            border-radius: 6px;
            font-family: 'Courier New', monospace;
            font-size: 14px;
            z-index: 10000;
            border: 1px solid #00ff00;
            box-shadow: 0 2px 10px rgba(0, 255, 0, 0.3);
        `;
        document.body.appendChild(this.element);

        this.update();
    }

    update() {
        this.frameCount++;
        const now = performance.now();

        if (now - this.lastTime >= 1000) {
            this.fps = Math.round((this.frameCount * 1000) / (now - this.lastTime));
            const color = this.fps > 55 ? '#00ff00' : this.fps > 30 ? '#ffff00' : '#ff0000';
            this.element.style.color = color;
            this.element.style.borderColor = color;
            this.element.textContent = `FPS: ${this.fps}`;
            this.frameCount = 0;
            this.lastTime = now;
        }

        requestAnimationFrame(() => this.update());
    }

    destroy() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
    }
}

// Make Settings available globally
window.Settings = Settings;

// Auto-apply startup settings when page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Settings Pro v6.0 - DOM loaded, initializing...');

    setTimeout(() => {
        try {
            Settings.applyStartupSettings();
        } catch (error) {
            console.error('❌ Error applying startup settings:', error);
        }
    }, 500);
});

// Also apply when scripts load (for hot reloading)
if (document.readyState === 'loading') {
    console.log('🚀 Settings Pro v6.0 - Script loaded, waiting for DOM...');
} else {
    console.log('🚀 Settings Pro v6.0 - Script loaded, DOM ready...');
    setTimeout(() => {
        Settings.applyStartupSettings();
    }, 500);
}