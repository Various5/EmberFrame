/**
 * APP_METADATA
 * @name Settings
 * @icon fas fa-cog
 * @description Advanced system customization with dynamic backgrounds and particle effects
 * @category System
 * @version 4.0.0
 * @author EmberFrame Team
 * @enabled true
 */

class Settings {
    static createWindow() {
        return {
            title: '⚙️ EmberFrame Settings',
            width: '900px',
            height: '750px',
            autoSize: false,
            content: `
                <div class="settings-container">
                    <!-- Sidebar Navigation -->
                    <div class="settings-sidebar">
                        <div class="settings-header">
                            <div class="settings-logo">⚙️</div>
                            <div class="settings-title">Settings</div>
                            <div class="settings-version">v4.0.0</div>
                        </div>
                        
                        <div class="settings-nav">
                            <div class="nav-item active" data-section="appearance">
                                <i class="fas fa-palette"></i>
                                <span>Appearance</span>
                            </div>
                            <div class="nav-item" data-section="background">
                                <i class="fas fa-image"></i>
                                <span>Background</span>
                            </div>
                            <div class="nav-item" data-section="particles">
                                <i class="fas fa-star"></i>
                                <span>Particles</span>
                            </div>
                            <div class="nav-item" data-section="effects">
                                <i class="fas fa-magic"></i>
                                <span>Effects</span>
                            </div>
                            <div class="nav-item" data-section="interface">
                                <i class="fas fa-desktop"></i>
                                <span>Interface</span>
                            </div>
                            <div class="nav-item" data-section="performance">
                                <i class="fas fa-tachometer-alt"></i>
                                <span>Performance</span>
                            </div>
                            <div class="nav-item" data-section="presets">
                                <i class="fas fa-bookmark"></i>
                                <span>Presets</span>
                            </div>
                            <div class="nav-item" data-section="advanced">
                                <i class="fas fa-cogs"></i>
                                <span>Advanced</span>
                            </div>
                        </div>
                    </div>

                    <!-- Main Content -->
                    <div class="settings-content">
                        <!-- Appearance Section -->
                        <div class="settings-section active" id="appearance">
                            <div class="section-title">🎨 Appearance Settings</div>
                            
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
                                    <div class="color-scheme" data-scheme="auto">
                                        <div class="scheme-preview auto"></div>
                                        <span>Auto</span>
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
                                    <div class="color-scheme" data-scheme="royal">
                                        <div class="scheme-preview royal"></div>
                                        <span>Royal</span>
                                    </div>
                                    <div class="color-scheme" data-scheme="fire">
                                        <div class="scheme-preview fire"></div>
                                        <span>Fire</span>
                                    </div>
                                    <div class="color-scheme" data-scheme="ice">
                                        <div class="scheme-preview ice"></div>
                                        <span>Ice</span>
                                    </div>
                                    <div class="color-scheme" data-scheme="space">
                                        <div class="scheme-preview space"></div>
                                        <span>Space</span>
                                    </div>
                                    <div class="color-scheme" data-scheme="toxic">
                                        <div class="scheme-preview toxic"></div>
                                        <span>Toxic</span>
                                    </div>
                                    <div class="color-scheme" data-scheme="pastel">
                                        <div class="scheme-preview pastel"></div>
                                        <span>Pastel</span>
                                    </div>
                                    <div class="color-scheme" data-scheme="retro">
                                        <div class="scheme-preview retro"></div>
                                        <span>Retro</span>
                                    </div>
                                    <div class="color-scheme" data-scheme="minimal">
                                        <div class="scheme-preview minimal"></div>
                                        <span>Minimal</span>
                                    </div>
                                    <div class="color-scheme" data-scheme="aurora">
                                        <div class="scheme-preview aurora"></div>
                                        <span>Aurora</span>
                                    </div>
                                    <div class="color-scheme" data-scheme="cosmic">
                                        <div class="scheme-preview cosmic"></div>
                                        <span>Cosmic</span>
                                    </div>
                                </div>
                            </div>

                            <div class="setting-group">
                                <label>Accent Color</label>
                                <div class="color-picker">
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
                                        <div class="color-preset" data-color="#00ff88" style="background: #00ff88"></div>
                                        <div class="color-preset" data-color="#ff3838" style="background: #ff3838"></div>
                                        <div class="color-preset" data-color="#ff9500" style="background: #ff9500"></div>
                                        <div class="color-preset" data-color="#9c88ff" style="background: #9c88ff"></div>
                                    </div>
                                </div>
                            </div>

                            <div class="setting-group">
                                <label>Window Transparency</label>
                                <div class="slider-container">
                                    <input type="range" id="window-transparency" min="0" max="50" value="10" step="5">
                                    <span class="slider-value">10%</span>
                                </div>
                            </div>

                            <div class="setting-group">
                                <label>Visual Effects</label>
                                <div class="checkbox-group">
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="blur-effects" checked>
                                        <span class="checkmark"></span>
                                        Enable blur effects
                                    </label>
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="window-shadows" checked>
                                        <span class="checkmark"></span>
                                        Window shadows
                                    </label>
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="smooth-animations" checked>
                                        <span class="checkmark"></span>
                                        Smooth animations
                                    </label>
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="glass-effect" checked>
                                        <span class="checkmark"></span>
                                        Glass morphism
                                    </label>
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="glow-effects">
                                        <span class="checkmark"></span>
                                        Glow effects
                                    </label>
                                </div>
                            </div>

                            <div class="setting-group">
                                <label>Window Border Radius</label>
                                <div class="slider-container">
                                    <input type="range" id="border-radius" min="0" max="20" value="8" step="2">
                                    <span class="slider-value">8px</span>
                                </div>
                            </div>
                        </div>

                        <!-- Background Section -->
                        <div class="settings-section" id="background">
                            <div class="section-title">🖼️ Dynamic Backgrounds</div>
                            
                            <div class="setting-group">
                                <label>Background Type</label>
                                <div class="background-types">
                                    <div class="bg-type active" data-type="gradient">
                                        <i class="fas fa-paint-brush"></i>
                                        <span>Gradient</span>
                                    </div>
                                    <div class="bg-type" data-type="animated">
                                        <i class="fas fa-play"></i>
                                        <span>Animated</span>
                                    </div>
                                    <div class="bg-type" data-type="pattern">
                                        <i class="fas fa-th"></i>
                                        <span>Pattern</span>
                                    </div>
                                    <div class="bg-type" data-type="media">
                                        <i class="fas fa-video"></i>
                                        <span>Media</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Gradient Settings -->
                            <div class="setting-group" id="gradient-settings">
                                <label>Gradient Configuration</label>
                                <div class="gradient-controls">
                                    <div class="gradient-presets">
                                        <div class="gradient-preset active" data-gradient="default">
                                            <div style="background: linear-gradient(135deg, #667eea, #764ba2);"></div>
                                            <span>Default</span>
                                        </div>
                                        <div class="gradient-preset" data-gradient="ocean">
                                            <div style="background: linear-gradient(135deg, #667eea, #54a0ff);"></div>
                                            <span>Ocean</span>
                                        </div>
                                        <div class="gradient-preset" data-gradient="sunset">
                                            <div style="background: linear-gradient(135deg, #ff6b6b, #feca57);"></div>
                                            <span>Sunset</span>
                                        </div>
                                        <div class="gradient-preset" data-gradient="forest">
                                            <div style="background: linear-gradient(135deg, #00d4ff, #4ecdc4);"></div>
                                            <span>Forest</span>
                                        </div>
                                        <div class="gradient-preset" data-gradient="neon">
                                            <div style="background: linear-gradient(135deg, #ff9ff3, #54a0ff);"></div>
                                            <span>Neon</span>
                                        </div>
                                        <div class="gradient-preset" data-gradient="fire">
                                            <div style="background: linear-gradient(135deg, #ff3838, #ff9500);"></div>
                                            <span>Fire</span>
                                        </div>
                                    </div>
                                    
                                    <div class="color-input-group">
                                        <label>Start Color</label>
                                        <input type="color" id="gradient-start" value="#667eea">
                                    </div>
                                    <div class="color-input-group">
                                        <label>End Color</label>
                                        <input type="color" id="gradient-end" value="#764ba2">
                                    </div>
                                </div>
                                <div class="slider-container">
                                    <label>Angle</label>
                                    <input type="range" id="gradient-angle" min="0" max="360" value="135">
                                    <span class="slider-value">135°</span>
                                </div>
                                <div class="checkbox-group">
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="gradient-animate">
                                        <span class="checkmark"></span>
                                        Animate gradient
                                    </label>
                                </div>
                            </div>

                            <!-- Animated Settings -->
                            <div class="setting-group" id="animated-settings" style="display: none;">
                                <label>Animated Backgrounds</label>
                                <div class="animated-options">
                                    <div class="animated-option" data-animation="matrix">
                                        <i class="fas fa-code"></i>
                                        <span>Matrix Rain</span>
                                    </div>
                                    <div class="animated-option" data-animation="waves">
                                        <i class="fas fa-water"></i>
                                        <span>Flowing Waves</span>
                                    </div>
                                    <div class="animated-option" data-animation="neural">
                                        <i class="fas fa-project-diagram"></i>
                                        <span>Neural Network</span>
                                    </div>
                                    <div class="animated-option" data-animation="plasma">
                                        <i class="fas fa-bolt"></i>
                                        <span>Plasma Field</span>
                                    </div>
                                    <div class="animated-option" data-animation="geometry">
                                        <i class="fas fa-shapes"></i>
                                        <span>Geometric Lines</span>
                                    </div>
                                    <div class="animated-option" data-animation="starfield">
                                        <i class="fas fa-star"></i>
                                        <span>Starfield</span>
                                    </div>
                                    <div class="animated-option" data-animation="particles">
                                        <i class="fas fa-atom"></i>
                                        <span>Particle Flow</span>
                                    </div>
                                    <div class="animated-option" data-animation="fractals">
                                        <i class="fas fa-snowflake"></i>
                                        <span>Fractal Tree</span>
                                    </div>
                                    <div class="animated-option" data-animation="cellular">
                                        <i class="fas fa-th-large"></i>
                                        <span>Cellular Automata</span>
                                    </div>
                                    <div class="animated-option" data-animation="lightning">
                                        <i class="fas fa-bolt"></i>
                                        <span>Lightning</span>
                                    </div>
                                    <div class="animated-option" data-animation="ripples">
                                        <i class="fas fa-circle"></i>
                                        <span>Water Ripples</span>
                                    </div>
                                    <div class="animated-option" data-animation="crystals">
                                        <i class="fas fa-gem"></i>
                                        <span>Growing Crystals</span>
                                    </div>
                                    <div class="animated-option" data-animation="dna">
                                        <i class="fas fa-dna"></i>
                                        <span>DNA Strands</span>
                                    </div>
                                    <div class="animated-option" data-animation="galaxy">
                                        <i class="fas fa-star-half-alt"></i>
                                        <span>Galaxy Spiral</span>
                                    </div>
                                    <div class="animated-option" data-animation="fire">
                                        <i class="fas fa-fire"></i>
                                        <span>Fire Effect</span>
                                    </div>
                                    <div class="animated-option" data-animation="code">
                                        <i class="fas fa-terminal"></i>
                                        <span>Digital Rain</span>
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
                                <div class="pattern-options">
                                    <div class="pattern-option" data-pattern="dots">
                                        <i class="fas fa-circle"></i>
                                        <span>Dots</span>
                                    </div>
                                    <div class="pattern-option" data-pattern="grid">
                                        <i class="fas fa-th"></i>
                                        <span>Grid</span>
                                    </div>
                                    <div class="pattern-option" data-pattern="lines">
                                        <i class="fas fa-grip-lines"></i>
                                        <span>Lines</span>
                                    </div>
                                    <div class="pattern-option" data-pattern="hexagon">
                                        <i class="fas fa-stop"></i>
                                        <span>Hexagon</span>
                                    </div>
                                    <div class="pattern-option" data-pattern="triangles">
                                        <i class="fas fa-caret-up"></i>
                                        <span>Triangles</span>
                                    </div>
                                    <div class="pattern-option" data-pattern="waves">
                                        <i class="fas fa-wave-square"></i>
                                        <span>Waves</span>
                                    </div>
                                    <div class="pattern-option" data-pattern="circuit">
                                        <i class="fas fa-microchip"></i>
                                        <span>Circuit</span>
                                    </div>
                                    <div class="pattern-option" data-pattern="maze">
                                        <i class="fas fa-puzzle-piece"></i>
                                        <span>Maze</span>
                                    </div>
                                    <div class="pattern-option" data-pattern="crosshatch">
                                        <i class="fas fa-hashtag"></i>
                                        <span>Crosshatch</span>
                                    </div>
                                    <div class="pattern-option" data-pattern="chevron">
                                        <i class="fas fa-chevron-right"></i>
                                        <span>Chevron</span>
                                    </div>
                                    <div class="pattern-option" data-pattern="diamonds">
                                        <i class="fas fa-gem"></i>
                                        <span>Diamonds</span>
                                    </div>
                                    <div class="pattern-option" data-pattern="scales">
                                        <i class="fas fa-fish"></i>
                                        <span>Scales</span>
                                    </div>
                                </div>
                                
                                <div class="control-row">
                                    <div class="control-item">
                                        <label>Pattern Opacity</label>
                                        <div class="slider-container">
                                            <input type="range" id="pattern-opacity" min="0" max="100" value="30">
                                            <span class="slider-value">30%</span>
                                        </div>
                                    </div>
                                    <div class="control-item">
                                        <label>Pattern Size</label>
                                        <div class="slider-container">
                                            <input type="range" id="pattern-size" min="10" max="100" value="20">
                                            <span class="slider-value">20px</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="control-row">
                                    <div class="control-item">
                                        <label>Pattern Color</label>
                                        <input type="color" id="pattern-color" value="#00d4ff">
                                    </div>
                                    <div class="control-item">
                                        <label>Secondary Color</label>
                                        <input type="color" id="pattern-color2" value="#ff00ff">
                                    </div>
                                </div>
                                <div class="checkbox-group">
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="pattern-animate">
                                        <span class="checkmark"></span>
                                        Animate pattern
                                    </label>
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="pattern-glow">
                                        <span class="checkmark"></span>
                                        Pattern glow effect
                                    </label>
                                </div>
                            </div>

                            <!-- Media Settings -->
                            <div class="setting-group" id="media-settings" style="display: none;">
                                <label>Media Background</label>
                                <div class="media-controls">
                                    <div class="control-item">
                                        <label>Video/GIF URL or File</label>
                                        <input type="text" id="media-url" placeholder="Enter URL or upload file" class="media-input">
                                        <input type="file" id="media-file" accept="video/*,image/gif" style="display: none;">
                                        <button id="media-browse" class="browse-btn">Browse Files</button>
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
                                            <label>Playback Speed</label>
                                            <div class="slider-container">
                                                <input type="range" id="media-speed" min="0.25" max="2" value="1" step="0.25">
                                                <span class="slider-value">1x</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="checkbox-group">
                                        <label class="checkbox-item">
                                            <input type="checkbox" id="media-loop" checked>
                                            <span class="checkmark"></span>
                                            Loop media
                                        </label>
                                        <label class="checkbox-item">
                                            <input type="checkbox" id="media-muted" checked>
                                            <span class="checkmark"></span>
                                            Mute audio
                                        </label>
                                        <label class="checkbox-item">
                                            <input type="checkbox" id="media-blur">
                                            <span class="checkmark"></span>
                                            Blur effect
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Particles Section -->
                        <div class="settings-section" id="particles">
                            <div class="section-title">⭐ Advanced Particle System</div>
                            
                            <div class="setting-group">
                                <div class="control-row">
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="particles-enabled" checked>
                                        <span class="checkmark"></span>
                                        Enable Particle System
                                    </label>
                                    <div style="display: flex; gap: 10px;">
                                        <button id="test-particles" class="action-btn small">
                                            🧪 Test Particles
                                        </button>
                                        <button id="reset-particles" class="action-btn small">
                                            🔄 Reset
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div class="setting-group">
                                <label>Particle Count</label>
                                <div class="slider-container">
                                    <input type="range" id="particle-count" min="10" max="1000" value="100" step="10">
                                    <span class="slider-value">100</span>
                                </div>
                            </div>

                            <div class="setting-group">
                                <label>Particle Behavior</label>
                                <div class="particle-behaviors">
                                    <div class="behavior-option active" data-behavior="float">
                                        <i class="fas fa-cloud"></i>
                                        <span>Float</span>
                                    </div>
                                    <div class="behavior-option" data-behavior="text">
                                        <i class="fas fa-font"></i>
                                        <span>Text</span>
                                    </div>
                                    <div class="behavior-option" data-behavior="follow">
                                        <i class="fas fa-mouse-pointer"></i>
                                        <span>Follow</span>
                                    </div>
                                    <div class="behavior-option" data-behavior="dodge">
                                        <i class="fas fa-arrows-alt"></i>
                                        <span>Dodge</span>
                                    </div>
                                    <div class="behavior-option" data-behavior="orbit">
                                        <i class="fas fa-circle-notch"></i>
                                        <span>Orbit</span>
                                    </div>
                                    <div class="behavior-option" data-behavior="magnetic">
                                        <i class="fas fa-magnet"></i>
                                        <span>Magnetic</span>
                                    </div>
                                    <div class="behavior-option" data-behavior="spiral">
                                        <i class="fas fa-hurricane"></i>
                                        <span>Spiral</span>
                                    </div>
                                    <div class="behavior-option" data-behavior="wave">
                                        <i class="fas fa-water"></i>
                                        <span>Wave</span>
                                    </div>
                                    <div class="behavior-option" data-behavior="fireworks">
                                        <i class="fas fa-fire"></i>
                                        <span>Fireworks</span>
                                    </div>
                                    <div class="behavior-option" data-behavior="constellation">
                                        <i class="fas fa-star"></i>
                                        <span>Stars</span>
                                    </div>
                                    <div class="behavior-option" data-behavior="vortex">
                                        <i class="fas fa-eye"></i>
                                        <span>Vortex</span>
                                    </div>
                                    <div class="behavior-option" data-behavior="tornado">
                                        <i class="fas fa-tornado"></i>
                                        <span>Tornado</span>
                                    </div>
                                    <div class="behavior-option" data-behavior="bounce">
                                        <i class="fas fa-basketball-ball"></i>
                                        <span>Bounce</span>
                                    </div>
                                    <div class="behavior-option" data-behavior="gravity">
                                        <i class="fas fa-arrow-down"></i>
                                        <span>Gravity</span>
                                    </div>
                                    <div class="behavior-option" data-behavior="explosion">
                                        <i class="fas fa-bomb"></i>
                                        <span>Explosion</span>
                                    </div>
                                    <div class="behavior-option" data-behavior="swarm">
                                        <i class="fas fa-bug"></i>
                                        <span>Swarm</span>
                                    </div>
                                    <div class="behavior-option" data-behavior="rain">
                                        <i class="fas fa-cloud-rain"></i>
                                        <span>Rain</span>
                                    </div>
                                    <div class="behavior-option" data-behavior="snow">
                                        <i class="fas fa-snowflake"></i>
                                        <span>Snow</span>
                                    </div>
                                    <div class="behavior-option" data-behavior="matrix">
                                        <i class="fas fa-code"></i>
                                        <span>Matrix</span>
                                    </div>
                                    <div class="behavior-option" data-behavior="dna">
                                        <i class="fas fa-dna"></i>
                                        <span>DNA</span>
                                    </div>
                                    <div class="behavior-option" data-behavior="galaxy">
                                        <i class="fas fa-star-half-alt"></i>
                                        <span>Galaxy</span>
                                    </div>
                                    <div class="behavior-option" data-behavior="heart">
                                        <i class="fas fa-heart"></i>
                                        <span>Heart</span>
                                    </div>
                                    <div class="behavior-option" data-behavior="flower">
                                        <i class="fas fa-seedling"></i>
                                        <span>Flower</span>
                                    </div>
                                    <div class="behavior-option" data-behavior="pulse">
                                        <i class="fas fa-heartbeat"></i>
                                        <span>Pulse</span>
                                    </div>
                                    <div class="behavior-option" data-behavior="web">
                                        <i class="fas fa-spider"></i>
                                        <span>Web</span>
                                    </div>
                                    <div class="behavior-option" data-behavior="mouse-trail">
                                        <i class="fas fa-route"></i>
                                        <span>Trail</span>
                                    </div>
                                    <div class="behavior-option" data-behavior="mouse-repel">
                                        <i class="fas fa-expand-arrows-alt"></i>
                                        <span>Repel</span>
                                    </div>
                                    <div class="behavior-option" data-behavior="mouse-attract">
                                        <i class="fas fa-compress-arrows-alt"></i>
                                        <span>Attract</span>
                                    </div>
                                    <div class="behavior-option" data-behavior="mouse-orbit">
                                        <i class="fas fa-satellite"></i>
                                        <span>Orbit</span>
                                    </div>
                                    <div class="behavior-option" data-behavior="laser">
                                        <i class="fas fa-crosshairs"></i>
                                        <span>Laser</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Text Particle Settings -->
                            <div class="setting-group" id="text-particle-settings" style="display: none;">
                                <label>Text Particle Configuration</label>
                                <div class="control-item">
                                    <label>Text to Display</label>
                                    <input type="text" id="particle-text" placeholder="Enter your text" value="EMBERFRAME" class="text-input">
                                </div>
                                <div class="control-row">
                                    <div class="control-item">
                                        <label>Font Size</label>
                                        <div class="slider-container">
                                            <input type="range" id="text-font-size" min="20" max="200" value="80">
                                            <span class="slider-value">80px</span>
                                        </div>
                                    </div>
                                    <div class="control-item">
                                        <label>Text Weight</label>
                                        <select id="text-font-weight">
                                            <option value="normal">Normal</option>
                                            <option value="bold" selected>Bold</option>
                                            <option value="900">Extra Bold</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="control-row">
                                    <div class="control-item">
                                        <label>Letter Spacing</label>
                                        <div class="slider-container">
                                            <input type="range" id="text-letter-spacing" min="0" max="50" value="10">
                                            <span class="slider-value">10px</span>
                                        </div>
                                    </div>
                                    <div class="control-item">
                                        <label>Text Animation</label>
                                        <select id="text-animation">
                                            <option value="static">Static</option>
                                            <option value="wave">Wave</option>
                                            <option value="bounce">Bounce</option>
                                            <option value="typewriter">Typewriter</option>
                                            <option value="explode">Explode</option>
                                        </select>
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
                                <div class="checkbox-group">
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="mouse-click-burst">
                                        <span class="checkmark"></span>
                                        Click creates particle burst
                                    </label>
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="mouse-velocity">
                                        <span class="checkmark"></span>
                                        React to mouse velocity
                                    </label>
                                </div>
                            </div>

                            <div class="setting-group">
                                <label>Particle Appearance</label>
                                <div class="control-row">
                                    <div class="control-item">
                                        <label>Size</label>
                                        <div class="slider-container">
                                            <input type="range" id="particle-size" min="1" max="20" value="3">
                                            <span class="slider-value">3px</span>
                                        </div>
                                    </div>
                                    <div class="control-item">
                                        <label>Speed</label>
                                        <div class="slider-container">
                                            <input type="range" id="particle-speed" min="0.1" max="5" value="1" step="0.1">
                                            <span class="slider-value">1x</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="control-row">
                                    <div class="control-item">
                                        <label>Color</label>
                                        <input type="color" id="particle-color" value="#00d4ff">
                                    </div>
                                    <div class="control-item">
                                        <label>Shape</label>
                                        <select id="particle-shape">
                                            <option value="circle">Circle</option>
                                            <option value="square">Square</option>
                                            <option value="triangle">Triangle</option>
                                            <option value="star">Star</option>
                                            <option value="diamond">Diamond</option>
                                            <option value="hexagon">Hexagon</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="setting-group">
                                <label>Special Effects</label>
                                <div class="checkbox-group">
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="particle-glow" checked>
                                        <span class="checkmark"></span>
                                        Glow effect
                                    </label>
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="particle-trails" checked>
                                        <span class="checkmark"></span>
                                        Particle trails
                                    </label>
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="particle-connect">
                                        <span class="checkmark"></span>
                                        Connect nearby particles
                                    </label>
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="particle-physics">
                                        <span class="checkmark"></span>
                                        Advanced physics
                                    </label>
                                </div>
                            </div>
                        </div>

                        <!-- Effects Section -->
                        <div class="settings-section" id="effects">
                            <div class="section-title">✨ Visual Effects</div>
                            
                            <div class="setting-group">
                                <label>Screen Effects</label>
                                <div class="checkbox-group">
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="screen-shake">
                                        <span class="checkmark"></span>
                                        Screen shake on events
                                    </label>
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="color-flash">
                                        <span class="checkmark"></span>
                                        Color flash effects
                                    </label>
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="rgb-shift">
                                        <span class="checkmark"></span>
                                        RGB chromatic aberration
                                    </label>
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="scanlines">
                                        <span class="checkmark"></span>
                                        CRT scanlines
                                    </label>
                                </div>
                            </div>

                            <div class="setting-group">
                                <label>Cursor Effects</label>
                                <div class="checkbox-group">
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="cursor-trail">
                                        <span class="checkmark"></span>
                                        Cursor particle trail
                                    </label>
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="cursor-glow">
                                        <span class="checkmark"></span>
                                        Cursor glow effect
                                    </label>
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="click-ripple">
                                        <span class="checkmark"></span>
                                        Click ripple effects
                                    </label>
                                </div>
                            </div>

                            <div class="setting-group">
                                <label>Audio Visualization</label>
                                <div class="checkbox-group">
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="audio-reactive">
                                        <span class="checkmark"></span>
                                        Audio reactive particles
                                    </label>
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="audio-waveform">
                                        <span class="checkmark"></span>
                                        Show audio waveform
                                    </label>
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="audio-spectrum">
                                        <span class="checkmark"></span>
                                        Audio spectrum analyzer
                                    </label>
                                </div>
                            </div>

                            <div class="setting-group">
                                <label>Transition Effects</label>
                                <div class="control-row">
                                    <div class="control-item">
                                        <label>Window Open Animation</label>
                                        <select id="window-open-effect">
                                            <option value="fade">Fade In</option>
                                            <option value="scale">Scale Up</option>
                                            <option value="slide">Slide In</option>
                                            <option value="flip">Flip In</option>
                                            <option value="bounce">Bounce In</option>
                                            <option value="elastic">Elastic</option>
                                        </select>
                                    </div>
                                    <div class="control-item">
                                        <label>Window Close Animation</label>
                                        <select id="window-close-effect">
                                            <option value="fade">Fade Out</option>
                                            <option value="scale">Scale Down</option>
                                            <option value="slide">Slide Out</option>
                                            <option value="flip">Flip Out</option>
                                            <option value="implode">Implode</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Interface Section -->
                        <div class="settings-section" id="interface">
                            <div class="section-title">🖥️ Interface Settings</div>
                            
                            <div class="setting-group">
                                <label>Font Settings</label>
                                <div class="control-row">
                                    <div class="control-item">
                                        <label>Font Family</label>
                                        <select id="font-family">
                                            <option value="'Segoe UI', sans-serif">Segoe UI</option>
                                            <option value="'Roboto', sans-serif">Roboto</option>
                                            <option value="'Arial', sans-serif">Arial</option>
                                            <option value="'Helvetica', sans-serif">Helvetica</option>
                                            <option value="'Fira Code', monospace">Fira Code</option>
                                            <option value="'Consolas', monospace">Consolas</option>
                                            <option value="'Inter', sans-serif">Inter</option>
                                            <option value="'JetBrains Mono', monospace">JetBrains Mono</option>
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
                            </div>

                            <div class="setting-group">
                                <label>Window Behavior</label>
                                <div class="checkbox-group">
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="auto-hide-taskbar">
                                        <span class="checkmark"></span>
                                        Auto-hide taskbar
                                    </label>
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="snap-windows" checked>
                                        <span class="checkmark"></span>
                                        Snap windows to edges
                                    </label>
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="show-clock" checked>
                                        <span class="checkmark"></span>
                                        Show system clock
                                    </label>
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="minimize-animation" checked>
                                        <span class="checkmark"></span>
                                        Window minimize animation
                                    </label>
                                </div>
                            </div>

                            <div class="setting-group">
                                <label>Desktop Icons</label>
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
                                <div class="checkbox-group">
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="icon-labels" checked>
                                        <span class="checkmark"></span>
                                        Show icon labels
                                    </label>
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="icon-hover-effect" checked>
                                        <span class="checkmark"></span>
                                        Icon hover effects
                                    </label>
                                </div>
                            </div>

                            <div class="setting-group">
                                <label>Taskbar Settings</label>
                                <div class="control-row">
                                    <div class="control-item">
                                        <label>Taskbar Position</label>
                                        <select id="taskbar-position">
                                            <option value="bottom">Bottom</option>
                                            <option value="top">Top</option>
                                            <option value="left">Left</option>
                                            <option value="right">Right</option>
                                        </select>
                                    </div>
                                    <div class="control-item">
                                        <label>Taskbar Size</label>
                                        <select id="taskbar-size">
                                            <option value="small">Small</option>
                                            <option value="medium" selected>Medium</option>
                                            <option value="large">Large</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Performance Section -->
                        <div class="settings-section" id="performance">
                            <div class="section-title">⚡ Performance Settings</div>
                            
                            <div class="setting-group">
                                <label>Graphics Performance</label>
                                <div class="control-row">
                                    <div class="control-item">
                                        <label>Frame Rate Limit</label>
                                        <select id="frame-rate">
                                            <option value="30">30 FPS</option>
                                            <option value="60" selected>60 FPS</option>
                                            <option value="120">120 FPS</option>
                                            <option value="144">144 FPS</option>
                                            <option value="0">Unlimited</option>
                                        </select>
                                    </div>
                                    <div class="control-item">
                                        <label>Quality Preset</label>
                                        <select id="quality-preset">
                                            <option value="low">Low</option>
                                            <option value="medium">Medium</option>
                                            <option value="high" selected>High</option>
                                            <option value="ultra">Ultra</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="checkbox-group">
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="hardware-acceleration" checked>
                                        <span class="checkmark"></span>
                                        Hardware acceleration
                                    </label>
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="reduce-motion">
                                        <span class="checkmark"></span>
                                        Reduce motion (accessibility)
                                    </label>
                                </div>
                            </div>

                            <div class="setting-group">
                                <label>Memory Management</label>
                                <div class="control-row">
                                    <div class="control-item">
                                        <label>Particle Pool Size</label>
                                        <div class="slider-container">
                                            <input type="range" id="particle-pool" min="100" max="2000" value="500" step="100">
                                            <span class="slider-value">500</span>
                                        </div>
                                    </div>
                                    <div class="control-item">
                                        <label>Canvas Resolution</label>
                                        <select id="canvas-resolution">
                                            <option value="0.5">50% (Performance)</option>
                                            <option value="0.75">75% (Balanced)</option>
                                            <option value="1" selected>100% (Quality)</option>
                                            <option value="1.5">150% (High DPI)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="setting-group">
                                <label>Debug Information</label>
                                <div class="checkbox-group">
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="show-fps">
                                        <span class="checkmark"></span>
                                        Show FPS counter
                                    </label>
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="show-memory">
                                        <span class="checkmark"></span>
                                        Show memory usage
                                    </label>
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="show-performance">
                                        <span class="checkmark"></span>
                                        Show performance metrics
                                    </label>
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="debug-mode">
                                        <span class="checkmark"></span>
                                        Debug mode
                                    </label>
                                </div>
                            </div>
                        </div>

                        <!-- Presets Section -->
                        <div class="settings-section" id="presets">
                            <div class="section-title">📚 Presets & Themes</div>
                            
                            <div class="setting-group">
                                <label>Theme Presets</label>
                                <div class="preset-grid">
                                    <div class="preset-card" data-preset="gaming">
                                        <div class="preset-preview gaming"></div>
                                        <div class="preset-info">
                                            <h4>Gaming</h4>
                                            <p>High-performance setup optimized for gaming</p>
                                        </div>
                                    </div>
                                    <div class="preset-card" data-preset="productivity">
                                        <div class="preset-preview productivity"></div>
                                        <div class="preset-info">
                                            <h4>Productivity</h4>
                                            <p>Clean, minimal design for focused work</p>
                                        </div>
                                    </div>
                                    <div class="preset-card" data-preset="creative">
                                        <div class="preset-preview creative"></div>
                                        <div class="preset-info">
                                            <h4>Creative</h4>
                                            <p>Inspiring visuals for creative workflows</p>
                                        </div>
                                    </div>
                                    <div class="preset-card" data-preset="developer">
                                        <div class="preset-preview developer"></div>
                                        <div class="preset-info">
                                            <h4>Developer</h4>
                                            <p>Code-focused with terminal aesthetics</p>
                                        </div>
                                    </div>
                                    <div class="preset-card" data-preset="entertainment">
                                        <div class="preset-preview entertainment"></div>
                                        <div class="preset-info">
                                            <h4>Entertainment</h4>
                                            <p>Rich media experience with vibrant effects</p>
                                        </div>
                                    </div>
                                    <div class="preset-card" data-preset="minimal">
                                        <div class="preset-preview minimal"></div>
                                        <div class="preset-info">
                                            <h4>Minimal</h4>
                                            <p>Ultra-clean interface with no distractions</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="setting-group">
                                <label>Custom Presets</label>
                                <div class="preset-actions">
                                    <input type="text" id="preset-name" placeholder="Enter preset name" class="preset-input">
                                    <button id="save-preset" class="action-btn">💾 Save Current</button>
                                    <button id="load-preset" class="action-btn">📁 Load Preset</button>
                                    <button id="delete-preset" class="action-btn danger">🗑️ Delete</button>
                                </div>
                                <div id="custom-presets" class="custom-preset-list">
                                    <!-- Custom presets will be populated here -->
                                </div>
                            </div>
                        </div>

                        <!-- Advanced Section -->
                        <div class="settings-section" id="advanced">
                            <div class="section-title">🔧 Advanced Settings</div>
                            
                            <div class="setting-group">
                                <label>System Integration</label>
                                <div class="checkbox-group">
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="auto-start">
                                        <span class="checkmark"></span>
                                        Auto-start with system
                                    </label>
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="system-tray">
                                        <span class="checkmark"></span>
                                        Minimize to system tray
                                    </label>
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="global-hotkeys">
                                        <span class="checkmark"></span>
                                        Enable global hotkeys
                                    </label>
                                </div>
                            </div>

                            <div class="setting-group">
                                <label>Data Management</label>
                                <div class="action-buttons">
                                    <button class="action-btn" id="export-settings">📤 Export Settings</button>
                                    <button class="action-btn" id="import-settings">📥 Import Settings</button>
                                    <button class="action-btn" id="backup-data">💾 Backup Data</button>
                                    <button class="action-btn" id="restore-data">🔄 Restore Data</button>
                                </div>
                            </div>

                            <div class="setting-group">
                                <label>Developer Options</label>
                                <div class="checkbox-group">
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="dev-tools">
                                        <span class="checkmark"></span>
                                        Enable developer tools
                                    </label>
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="console-logging">
                                        <span class="checkmark"></span>
                                        Verbose console logging
                                    </label>
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="hot-reload">
                                        <span class="checkmark"></span>
                                        Hot reload modules
                                    </label>
                                </div>
                            </div>

                            <div class="setting-group">
                                <label>Reset Options</label>
                                <div class="action-buttons">
                                    <button class="action-btn danger" id="reset-settings">🔄 Reset to Defaults</button>
                                    <button class="action-btn danger" id="clear-cache">🗑️ Clear Cache</button>
                                    <button class="action-btn danger" id="factory-reset">⚠️ Factory Reset</button>
                                </div>
                            </div>

                            <div class="setting-group">
                                <label>About</label>
                                <div class="about-info">
                                    <div class="about-item">
                                        <strong>Version:</strong> 4.0.0
                                    </div>
                                    <div class="about-item">
                                        <strong>Build:</strong> ${new Date().toISOString().split('T')[0]}
                                    </div>
                                    <div class="about-item">
                                        <strong>Engine:</strong> EmberFrame Advanced
                                    </div>
                                    <div class="about-item">
                                        <strong>Renderer:</strong> Canvas 2D/WebGL
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
        this.effectsSystem = null;

        this.setupEventListeners();
        this.initializeSystems();
        this.loadCurrentSettings();
        this.setupAutoSave();

        console.log('🔧 Settings v4.0 initialized successfully');
    }

    static setupEventListeners() {
        // Navigation
        this.windowElement.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                this.switchSection(item.dataset.section);
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

        // Background types
        this.windowElement.querySelectorAll('.bg-type').forEach(type => {
            type.addEventListener('click', () => {
                this.setBackgroundType(type.dataset.type);
            });
        });

        // Gradient presets
        this.windowElement.querySelectorAll('.gradient-preset').forEach(preset => {
            preset.addEventListener('click', () => {
                this.applyGradientPreset(preset.dataset.gradient);
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

        // Particle behaviors
        this.windowElement.querySelectorAll('.behavior-option').forEach(behavior => {
            behavior.addEventListener('click', () => {
                this.setParticleBehavior(behavior.dataset.behavior);
                behavior.parentElement.querySelectorAll('.behavior-option').forEach(b => b.classList.remove('active'));
                behavior.classList.add('active');

                // Show/hide text settings for text behavior
                const textSettings = this.windowElement.querySelector('#text-particle-settings');
                textSettings.style.display = behavior.dataset.behavior === 'text' ? 'block' : 'none';
            });
        });

        // Color inputs
        this.windowElement.querySelectorAll('input[type="color"]').forEach(colorInput => {
            colorInput.addEventListener('input', (e) => {
                this.applySetting(colorInput.id, colorInput.value);
            });
        });

        // Text inputs
        this.windowElement.querySelectorAll('input[type="text"]').forEach(textInput => {
            textInput.addEventListener('input', (e) => {
                this.applySetting(textInput.id, textInput.value);
            });
        });

        // Preset cards
        this.windowElement.querySelectorAll('.preset-card').forEach(card => {
            card.addEventListener('click', () => {
                this.applyPreset(card.dataset.preset);
                card.parentElement.querySelectorAll('.preset-card').forEach(c => c.classList.remove('active'));
                card.classList.add('active');
            });
        });

        // Action buttons
        this.setupActionButtons();

        // Media controls
        this.setupMediaControls();

        // Test buttons
        this.windowElement.querySelector('#test-particles').addEventListener('click', () => {
            this.testParticles();
        });

        this.windowElement.querySelector('#reset-particles').addEventListener('click', () => {
            this.resetParticles();
        });
    }

    static setupActionButtons() {
        const buttons = {
            'reset-settings': () => this.resetSettings(),
            'export-settings': () => this.exportSettings(),
            'import-settings': () => this.importSettings(),
            'backup-data': () => this.backupData(),
            'restore-data': () => this.restoreData(),
            'clear-cache': () => this.clearCache(),
            'factory-reset': () => this.factoryReset(),
            'save-preset': () => this.savePreset(),
            'load-preset': () => this.loadPreset(),
            'delete-preset': () => this.deletePreset()
        };

        Object.keys(buttons).forEach(id => {
            const element = this.windowElement.querySelector(`#${id}`);
            if (element) {
                element.addEventListener('click', buttons[id]);
            }
        });
    }

    static setupMediaControls() {
        const mediaBrowse = this.windowElement.querySelector('#media-browse');
        const mediaFile = this.windowElement.querySelector('#media-file');
        const mediaUrl = this.windowElement.querySelector('#media-url');

        if (mediaBrowse && mediaFile) {
            mediaBrowse.addEventListener('click', () => mediaFile.click());

            mediaFile.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    const url = URL.createObjectURL(file);
                    mediaUrl.value = url;
                    this.applySetting('media-url', url);
                }
            });
        }

        if (mediaUrl) {
            mediaUrl.addEventListener('input', (e) => {
                this.applySetting('media-url', e.target.value);
            });
        }
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
        body.className = body.className.replace(/\b\w+-mode\b/g, '');

        const schemes = {
            'dark': {
                class: 'dark-mode',
                colors: {
                    '--bg-primary': '#1a1a1a',
                    '--bg-secondary': '#0f0f0f',
                    '--text-primary': '#ffffff',
                    '--accent-color': this.settings.accentColor || '#00d4ff'
                }
            },
            'light': {
                class: 'light-mode',
                colors: {
                    '--bg-primary': '#ffffff',
                    '--bg-secondary': '#f8f9fa',
                    '--text-primary': '#333333',
                    '--accent-color': this.settings.accentColor || '#007bff'
                }
            },
            'cyber': {
                class: 'cyber-mode',
                colors: {
                    '--bg-primary': '#0a0a0f',
                    '--bg-secondary': '#050508',
                    '--text-primary': '#00d4ff',
                    '--accent-color': '#ff00ff'
                }
            },
            'neon': {
                class: 'neon-mode',
                colors: {
                    '--bg-primary': '#0d0d0d',
                    '--bg-secondary': '#1a1a1a',
                    '--text-primary': '#00ffff',
                    '--accent-color': '#ff0080'
                }
            },
            'matrix': {
                class: 'matrix-mode',
                colors: {
                    '--bg-primary': '#000000',
                    '--bg-secondary': '#001100',
                    '--text-primary': '#00ff00',
                    '--accent-color': '#00aa00'
                }
            },
            'synthwave': {
                class: 'synthwave-mode',
                colors: {
                    '--bg-primary': '#2d1b69',
                    '--bg-secondary': '#1a0f3d',
                    '--text-primary': '#ff6b6b',
                    '--accent-color': '#feca57'
                }
            },
            'ocean': {
                class: 'ocean-mode',
                colors: {
                    '--bg-primary': '#0f3460',
                    '--bg-secondary': '#16537e',
                    '--text-primary': '#87ceeb',
                    '--accent-color': '#00bfff'
                }
            },
            'sunset': {
                class: 'sunset-mode',
                colors: {
                    '--bg-primary': '#2c1810',
                    '--bg-secondary': '#3d2418',
                    '--text-primary': '#ffd700',
                    '--accent-color': '#ff6347'
                }
            },
            'forest': {
                class: 'forest-mode',
                colors: {
                    '--bg-primary': '#1a2e1a',
                    '--bg-secondary': '#0f1f0f',
                    '--text-primary': '#90ee90',
                    '--accent-color': '#32cd32'
                }
            },
            'royal': {
                class: 'royal-mode',
                colors: {
                    '--bg-primary': '#1a0d33',
                    '--bg-secondary': '#2d1b4e',
                    '--text-primary': '#daa520',
                    '--accent-color': '#9932cc'
                }
            },
            'fire': {
                class: 'fire-mode',
                colors: {
                    '--bg-primary': '#2d0a0a',
                    '--bg-secondary': '#1a0000',
                    '--text-primary': '#ff4500',
                    '--accent-color': '#dc143c'
                }
            },
            'ice': {
                class: 'ice-mode',
                colors: {
                    '--bg-primary': '#0a1a2d',
                    '--bg-secondary': '#041426',
                    '--text-primary': '#b0e0e6',
                    '--accent-color': '#00ffff'
                }
            },
            'space': {
                class: 'space-mode',
                colors: {
                    '--bg-primary': '#0c0c1e',
                    '--bg-secondary': '#1a1a3a',
                    '--text-primary': '#e6e6fa',
                    '--accent-color': '#9370db'
                }
            },
            'toxic': {
                class: 'toxic-mode',
                colors: {
                    '--bg-primary': '#1a2d0a',
                    '--bg-secondary': '#0f1f00',
                    '--text-primary': '#adff2f',
                    '--accent-color': '#7fff00'
                }
            },
            'pastel': {
                class: 'pastel-mode',
                colors: {
                    '--bg-primary': '#f5f5f5',
                    '--bg-secondary': '#e8e8e8',
                    '--text-primary': '#333333',
                    '--accent-color': '#ff91a4'
                }
            },
            'retro': {
                class: 'retro-mode',
                colors: {
                    '--bg-primary': '#2e1065',
                    '--bg-secondary': '#1a0040',
                    '--text-primary': '#00ff41',
                    '--accent-color': '#ff0080'
                }
            },
            'minimal': {
                class: 'minimal-mode',
                colors: {
                    '--bg-primary': '#fafafa',
                    '--bg-secondary': '#f0f0f0',
                    '--text-primary': '#222222',
                    '--accent-color': '#666666'
                }
            },
            'aurora': {
                class: 'aurora-mode',
                colors: {
                    '--bg-primary': '#0d1b2a',
                    '--bg-secondary': '#1b263b',
                    '--text-primary': '#e0e1dd',
                    '--accent-color': '#7209b7'
                }
            },
            'cosmic': {
                class: 'cosmic-mode',
                colors: {
                    '--bg-primary': '#240046',
                    '--bg-secondary': '#3c096c',
                    '--text-primary': '#ffffff',
                    '--accent-color': '#ff006e'
                }
            }
        };

        if (scheme === 'auto') {
            scheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }

        const schemeData = schemes[scheme];
        if (schemeData) {
            body.classList.add(schemeData.class);
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

    static applyGradientPreset(preset) {
        const presets = {
            'default': { start: '#667eea', end: '#764ba2' },
            'ocean': { start: '#667eea', end: '#54a0ff' },
            'sunset': { start: '#ff6b6b', end: '#feca57' },
            'forest': { start: '#00d4ff', end: '#4ecdc4' },
            'neon': { start: '#ff9ff3', end: '#54a0ff' },
            'fire': { start: '#ff3838', end: '#ff9500' }
        };

        if (presets[preset]) {
            this.windowElement.querySelector('#gradient-start').value = presets[preset].start;
            this.windowElement.querySelector('#gradient-end').value = presets[preset].end;
            this.settings['gradient-start'] = presets[preset].start;
            this.settings['gradient-end'] = presets[preset].end;
            this.updateBackground();
        }

        // Update UI
        this.windowElement.querySelectorAll('.gradient-preset').forEach(p => p.classList.remove('active'));
        this.windowElement.querySelector(`[data-gradient="${preset}"]`).classList.add('active');
    }

    static setParticleBehavior(behavior) {
        this.settings.particleBehavior = behavior;
        if (this.particleSystem) {
            this.particleSystem.setBehavior(behavior);
        }
        this.saveSettings();
    }

    static setPattern(pattern) {
        this.settings.backgroundPattern = pattern;
        this.updateBackground();
        this.saveSettings();
    }

    static setAnimatedBackground(animation) {
        this.settings.backgroundAnimation = animation;
        this.initializeBackgroundSystem();
        this.saveSettings();
    }

    static applySetting(settingId, value) {
        this.settings[settingId] = value;

        switch (settingId) {
            case 'window-transparency':
                this.applyWindowTransparency(value);
                break;
            case 'border-radius':
                document.documentElement.style.setProperty('--window-border-radius', value + 'px');
                break;
            case 'blur-effects':
                document.body.classList.toggle('no-blur', !value);
                break;
            case 'window-shadows':
                document.documentElement.style.setProperty('--window-shadow', value ? '0 10px 30px rgba(0,0,0,0.3)' : 'none');
                break;
            case 'smooth-animations':
                document.body.classList.toggle('no-animations', !value);
                break;
            case 'glass-effect':
                document.body.classList.toggle('glass-effect', value);
                break;
            case 'glow-effects':
                document.body.classList.toggle('glow-effects', value);
                break;
            case 'particles-enabled':
                if (value) {
                    this.initializeParticleSystem();
                } else {
                    this.destroyParticleSystem();
                }
                break;
            case 'particle-count':
            case 'particle-size':
            case 'particle-speed':
            case 'particle-color':
            case 'particle-shape':
            case 'particle-glow':
            case 'particle-trails':
            case 'particle-connect':
            case 'particle-physics':
                if (this.particleSystem) {
                    this.particleSystem.updateSettings(this.settings);
                }
                break;
            case 'gradient-start':
            case 'gradient-end':
            case 'gradient-angle':
            case 'gradient-animate':
            case 'pattern-opacity':
            case 'pattern-size':
            case 'pattern-color':
            case 'pattern-color2':
            case 'pattern-animate':
            case 'pattern-glow':
                this.updateBackground();
                break;
            case 'media-url':
            case 'media-opacity':
            case 'media-speed':
            case 'media-loop':
            case 'media-muted':
            case 'media-blur':
                if (this.settings.backgroundType === 'media') {
                    this.updateBackground();
                }
                break;
            case 'particle-text':
            case 'text-font-size':
            case 'text-font-weight':
            case 'text-letter-spacing':
            case 'text-animation':
                if (this.particleSystem && this.settings.particleBehavior === 'text') {
                    this.particleSystem.arrangeAsText();
                }
                break;
            case 'mouse-force':
            case 'mouse-range':
            case 'mouse-click-burst':
            case 'mouse-velocity':
                if (this.particleSystem) {
                    this.particleSystem.settings = this.settings;
                }
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
            case 'show-fps':
                if (value) {
                    this.initializeFPSCounter();
                } else {
                    this.destroyFPSCounter();
                }
                break;
            case 'show-memory':
                if (value) {
                    this.initializeMemoryMonitor();
                } else {
                    this.destroyMemoryMonitor();
                }
                break;
            case 'show-performance':
                if (value) {
                    this.initializePerformanceMonitor();
                } else {
                    this.destroyPerformanceMonitor();
                }
                break;
            case 'debug-mode':
                document.body.classList.toggle('debug-mode', value);
                break;
            case 'screen-shake':
            case 'color-flash':
            case 'rgb-shift':
            case 'scanlines':
            case 'cursor-trail':
            case 'cursor-glow':
            case 'click-ripple':
                this.updateEffects();
                break;
            case 'quality-preset':
                this.applyQualityPreset(value);
                break;
        }
    }

    static applyWindowTransparency(value) {
        const opacity = 1 - (value / 100);
        document.documentElement.style.setProperty('--window-opacity', opacity);
        document.querySelectorAll('.window').forEach(window => {
            window.style.backgroundColor = `rgba(26, 26, 26, ${opacity})`;
            window.style.backdropFilter = value > 0 ? `blur(${value/10}px)` : 'none';
        });
    }

    static applyQualityPreset(preset) {
        const presets = {
            'low': {
                'particle-count': 50,
                'frame-rate': 30,
                'blur-effects': false,
                'window-shadows': false,
                'smooth-animations': false,
                'canvas-resolution': 0.5
            },
            'medium': {
                'particle-count': 100,
                'frame-rate': 60,
                'blur-effects': true,
                'window-shadows': true,
                'smooth-animations': true,
                'canvas-resolution': 0.75
            },
            'high': {
                'particle-count': 200,
                'frame-rate': 60,
                'blur-effects': true,
                'window-shadows': true,
                'smooth-animations': true,
                'canvas-resolution': 1
            },
            'ultra': {
                'particle-count': 500,
                'frame-rate': 120,
                'blur-effects': true,
                'window-shadows': true,
                'smooth-animations': true,
                'canvas-resolution': 1.5
            }
        };

        if (presets[preset]) {
            Object.keys(presets[preset]).forEach(key => {
                this.settings[key] = presets[preset][key];
                this.applySetting(key, presets[preset][key]);

                // Update UI
                const element = this.windowElement.querySelector(`#${key}`);
                if (element) {
                    if (element.type === 'checkbox') {
                        element.checked = presets[preset][key];
                    } else if (element.type === 'range') {
                        element.value = presets[preset][key];
                        this.updateSliderValue(element);
                    } else if (element.tagName === 'SELECT') {
                        element.value = presets[preset][key];
                    }
                }
            });
        }
    }

    static applyPreset(preset) {
        const presets = {
            'gaming': {
                colorScheme: 'neon',
                accentColor: '#ff0080',
                backgroundType: 'animated',
                backgroundAnimation: 'matrix',
                particleBehavior: 'laser',
                'particle-count': 150,
                'particle-glow': true,
                'window-transparency': 20,
                'smooth-animations': true
            },
            'productivity': {
                colorScheme: 'light',
                accentColor: '#007bff',
                backgroundType: 'gradient',
                'gradient-start': '#f8f9fa',
                'gradient-end': '#e9ecef',
                particleBehavior: 'float',
                'particle-count': 30,
                'particle-glow': false,
                'window-transparency': 5,
                'smooth-animations': false
            },
            'creative': {
                colorScheme: 'cosmic',
                accentColor: '#ff006e',
                backgroundType: 'animated',
                backgroundAnimation: 'plasma',
                particleBehavior: 'spiral',
                'particle-count': 200,
                'particle-glow': true,
                'window-transparency': 15,
                'smooth-animations': true
            },
            'developer': {
                colorScheme: 'matrix',
                accentColor: '#00ff00',
                backgroundType: 'animated',
                backgroundAnimation: 'code',
                particleBehavior: 'matrix',
                'particle-count': 100,
                'particle-glow': true,
                'window-transparency': 10,
                'smooth-animations': true
            },
            'entertainment': {
                colorScheme: 'synthwave',
                accentColor: '#feca57',
                backgroundType: 'animated',
                backgroundAnimation: 'waves',
                particleBehavior: 'fireworks',
                'particle-count': 300,
                'particle-glow': true,
                'window-transparency': 25,
                'smooth-animations': true
            },
            'minimal': {
                colorScheme: 'minimal',
                accentColor: '#666666',
                backgroundType: 'gradient',
                'gradient-start': '#ffffff',
                'gradient-end': '#f0f0f0',
                particleBehavior: 'float',
                'particle-count': 20,
                'particle-glow': false,
                'window-transparency': 0,
                'smooth-animations': false
            }
        };

        if (presets[preset]) {
            Object.keys(presets[preset]).forEach(key => {
                this.settings[key] = presets[preset][key];
                this.applySetting(key, presets[preset][key]);
            });

            this.loadCurrentSettings();
            this.saveSettings();
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
            } else if (slider.id.includes('size') && slider.id !== 'font-size') {
                suffix = 'px';
            } else if (slider.id === 'font-size') {
                suffix = 'px';
            } else if (slider.id.includes('speed')) {
                suffix = 'x';
            } else if (slider.id.includes('spacing')) {
                suffix = 'px';
            } else if (slider.id.includes('force')) {
                suffix = 'x';
            } else if (slider.id.includes('range')) {
                suffix = 'px';
            }

            valueSpan.textContent = value + suffix;
        }
    }

    static updateBackground() {
        if (!this.wallpaperLayer) {
            this.createWallpaperLayer();
        }

        const type = this.settings.backgroundType;

        // Clear previous background
        this.wallpaperLayer.style.background = 'transparent';
        this.wallpaperLayer.style.backgroundImage = '';
        this.wallpaperLayer.innerHTML = '';

        if (type === 'gradient') {
            this.setupGradientBackground();
        } else if (type === 'pattern') {
            this.generatePattern();
        } else if (type === 'media') {
            this.setupMediaBackground();
        } else if (type === 'animated') {
            this.initializeBackgroundSystem();
        }
    }

    static setupGradientBackground() {
        const start = this.settings['gradient-start'] || '#667eea';
        const end = this.settings['gradient-end'] || '#764ba2';
        const angle = this.settings['gradient-angle'] || 135;
        const animate = this.settings['gradient-animate'];

        this.wallpaperLayer.style.background = `linear-gradient(${angle}deg, ${start}, ${end})`;

        if (animate) {
            this.wallpaperLayer.style.animation = 'gradientShift 10s ease-in-out infinite';

            if (!document.querySelector('#gradient-keyframes')) {
                const style = document.createElement('style');
                style.id = 'gradient-keyframes';
                style.textContent = `
                    @keyframes gradientShift {
                        0%, 100% { background: linear-gradient(${angle}deg, ${start}, ${end}); }
                        50% { background: linear-gradient(${angle + 180}deg, ${end}, ${start}); }
                    }
                `;
                document.head.appendChild(style);
            }
        } else {
            this.wallpaperLayer.style.animation = 'none';
        }
    }

    static setupMediaBackground() {
        const mediaUrl = this.settings['media-url'];
        const opacity = (this.settings['media-opacity'] || 50) / 100;
        const speed = this.settings['media-speed'] || 1;
        const loop = this.settings['media-loop'] !== false;
        const muted = this.settings['media-muted'] !== false;
        const blur = this.settings['media-blur'] || false;

        if (mediaUrl) {
            if (mediaUrl.includes('.gif') || mediaUrl.includes('giphy')) {
                const img = document.createElement('img');
                img.style.cssText = `
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    opacity: ${opacity};
                    filter: ${blur ? 'blur(5px)' : 'none'};
                `;
                img.src = mediaUrl;
                img.onerror = () => {
                    console.error('Failed to load media:', mediaUrl);
                    this.wallpaperLayer.innerHTML = '<div style="color: #ff4444; text-align: center; padding: 50px;">Failed to load media</div>';
                };
                this.wallpaperLayer.appendChild(img);
            } else {
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
                video.loop = loop;
                video.muted = muted;
                video.playbackRate = speed;
                video.onerror = () => {
                    console.error('Failed to load video:', mediaUrl);
                    this.wallpaperLayer.innerHTML = '<div style="color: #ff4444; text-align: center; padding: 50px;">Failed to load video</div>';
                };
                this.wallpaperLayer.appendChild(video);
            }
        }
    }

    static generatePattern() {
        if (!this.wallpaperLayer) {
            this.createWallpaperLayer();
        }

        const pattern = this.settings.backgroundPattern || 'dots';
        const opacity = (this.settings['pattern-opacity'] || 20) / 100;
        const size = this.settings['pattern-size'] || 20;
        const color = this.settings['pattern-color'] || this.settings.accentColor || '#00d4ff';
        const color2 = this.settings['pattern-color2'] || '#ff00ff';
        const animate = this.settings['pattern-animate'];
        const glow = this.settings['pattern-glow'];

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
                backgroundSize = `${size}px ${size * 0.866}px`;
                break;
            case 'triangles':
                backgroundImage = `
                    linear-gradient(45deg, ${color} 25%, transparent 25%),
                    linear-gradient(-45deg, ${color} 25%, transparent 25%),
                    linear-gradient(45deg, transparent 75%, ${color} 75%),
                    linear-gradient(-45deg, transparent 75%, ${color} 75%)
                `;
                break;
            case 'waves':
                backgroundImage = `
                    repeating-linear-gradient(0deg,
                        transparent 0px,
                        transparent ${size/4}px,
                        ${color} ${size/4}px,
                        ${color} ${size/2}px
                    )
                `;
                break;
            case 'circuit':
                backgroundImage = `
                    linear-gradient(90deg, ${color} 1px, transparent 1px),
                    linear-gradient(${color} 1px, transparent 1px),
                    linear-gradient(90deg, ${color2} 2px, transparent 2px),
                    linear-gradient(${color2} 2px, transparent 2px)
                `;
                backgroundSize = `${size}px ${size}px, ${size}px ${size}px, ${size*2}px ${size*2}px, ${size*2}px ${size*2}px`;
                break;
            case 'maze':
                backgroundImage = `
                    linear-gradient(90deg, ${color} 2px, transparent 2px),
                    linear-gradient(${color} 2px, transparent 2px),
                    linear-gradient(90deg, transparent ${size/2}px, ${color2} ${size/2}px, ${color2} ${size/2+2}px, transparent ${size/2+2}px)
                `;
                break;
            case 'crosshatch':
                backgroundImage = `
                    repeating-linear-gradient(45deg, ${color} 0px, ${color} 1px, transparent 1px, transparent ${size/3}px),
                    repeating-linear-gradient(-45deg, ${color} 0px, ${color} 1px, transparent 1px, transparent ${size/3}px)
                `;
                break;
            case 'chevron':
                backgroundImage = `
                    repeating-linear-gradient(60deg, ${color} 0px, ${color} 1px, transparent 1px, transparent ${size/2}px),
                    repeating-linear-gradient(120deg, ${color2} 0px, ${color2} 1px, transparent 1px, transparent ${size/2}px)
                `;
                break;
            case 'diamonds':
                backgroundImage = `
                    repeating-conic-gradient(from 0deg at 50% 50%, 
                        ${color} 0deg 90deg, 
                        transparent 90deg 180deg, 
                        ${color} 180deg 270deg, 
                        transparent 270deg 360deg
                    )
                `;
                break;
            case 'scales':
                backgroundImage = `
                    radial-gradient(circle at 100% 50%, transparent ${size/3}px, ${color} ${size/3}px, ${color} ${size/2}px, transparent ${size/2}px),
                    radial-gradient(circle at 0% 50%, transparent ${size/3}px, ${color2} ${size/3}px, ${color2} ${size/2}px, transparent ${size/2}px)
                `;
                backgroundSize = `${size}px ${size/2}px`;
                break;
        }

        // Apply pattern
        this.wallpaperLayer.style.background = `rgba(0, 0, 0, ${1 - opacity})`;
        this.wallpaperLayer.style.backgroundImage = backgroundImage;
        this.wallpaperLayer.style.backgroundSize = backgroundSize;

        if (glow) {
            this.wallpaperLayer.style.filter = `drop-shadow(0 0 10px ${color})`;
        }

        // Add animation if enabled
        if (animate) {
            this.wallpaperLayer.style.animation = 'patternMove 10s linear infinite';

            if (!document.querySelector('#pattern-keyframes')) {
                const style = document.createElement('style');
                style.id = 'pattern-keyframes';
                style.textContent = `
                    @keyframes patternMove {
                        0% { background-position: 0px 0px; }
                        100% { background-position: ${size}px ${size}px; }
                    }
                `;
                document.head.appendChild(style);
            }
        } else {
            this.wallpaperLayer.style.animation = 'none';
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

        if (this.settings['show-memory']) {
            this.initializeMemoryMonitor();
        }

        if (this.settings['show-performance']) {
            this.initializePerformanceMonitor();
        }

        this.updateBackground();
        this.updateEffects();
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

    static initializeParticleSystem() {
        console.log('🎆 Initializing particle system...');

        if (this.particleSystem) {
            this.destroyParticleSystem();
        }

        setTimeout(() => {
            try {
                this.particleSystem = new AdvancedParticleSystem(this.settings);
                console.log('✅ Particle system initialized');
            } catch (error) {
                console.error('❌ Failed to create particle system:', error);
            }
        }, 100);
    }

    static initializeBackgroundSystem() {
        console.log('🌈 Initializing background system...');

        if (this.backgroundSystem) {
            this.backgroundSystem.destroy();
        }

        try {
            this.backgroundSystem = new AnimatedBackgroundSystem(this.settings);
            console.log('✅ Background system initialized');
        } catch (error) {
            console.error('❌ Failed to create background system:', error);
        }
    }

    static initializeFPSCounter() {
        if (this.fpsCounter) return;
        this.fpsCounter = new PerformanceMonitor('fps');
    }

    static initializeMemoryMonitor() {
        if (this.memoryMonitor) return;
        this.memoryMonitor = new PerformanceMonitor('memory');
    }

    static initializePerformanceMonitor() {
        if (this.performanceMonitor) return;
        this.performanceMonitor = new PerformanceMonitor('performance');
    }

    static updateEffects() {
        if (!this.effectsSystem) {
            this.effectsSystem = new EffectsSystem(this.settings);
        } else {
            this.effectsSystem.updateSettings(this.settings);
        }
    }

    static destroyParticleSystem() {
        if (this.particleSystem) {
            this.particleSystem.destroy();
            this.particleSystem = null;
            console.log('🚫 Particle system destroyed');
        }
    }

    static destroyFPSCounter() {
        if (this.fpsCounter) {
            this.fpsCounter.destroy();
            this.fpsCounter = null;
        }
    }

    static destroyMemoryMonitor() {
        if (this.memoryMonitor) {
            this.memoryMonitor.destroy();
            this.memoryMonitor = null;
        }
    }

    static destroyPerformanceMonitor() {
        if (this.performanceMonitor) {
            this.performanceMonitor.destroy();
            this.performanceMonitor = null;
        }
    }

    static testParticles() {
        console.log('🧪 Testing particles...');
        if (this.particleSystem) {
            this.particleSystem.createTestBurst();
        } else {
            this.initializeParticleSystem();
        }
    }

    static resetParticles() {
        console.log('🔄 Resetting particles...');
        this.destroyParticleSystem();
        if (this.settings['particles-enabled']) {
            setTimeout(() => this.initializeParticleSystem(), 200);
        }
    }

    static loadCurrentSettings() {
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
                } else if (element.type === 'color' || element.type === 'text') {
                    element.value = this.settings[key];
                }
            }
        });

        // Apply all settings
        Object.keys(this.settings).forEach(key => {
            this.applySetting(key, this.settings[key]);
        });

        // Update UI states
        this.setColorScheme(this.settings.colorScheme);
        this.setAccentColor(this.settings.accentColor);
        this.setBackgroundType(this.settings.backgroundType);

        // Update behavior selection
        if (this.settings.particleBehavior) {
            const behaviorElement = this.windowElement.querySelector(`[data-behavior="${this.settings.particleBehavior}"]`);
            if (behaviorElement) {
                this.windowElement.querySelectorAll('.behavior-option').forEach(b => b.classList.remove('active'));
                behaviorElement.classList.add('active');
            }
        }
    }

    // Preset and data management methods
    static savePreset() {
        const name = this.windowElement.querySelector('#preset-name').value.trim();
        if (!name) {
            alert('Please enter a preset name');
            return;
        }

        const customPresets = JSON.parse(localStorage.getItem('emberframe-custom-presets') || '{}');
        customPresets[name] = { ...this.settings };
        localStorage.setItem('emberframe-custom-presets', JSON.stringify(customPresets));

        this.updateCustomPresetsList();
        alert(`Preset "${name}" saved successfully!`);
    }

    static loadPreset() {
        // This would open a file dialog or preset selection
        alert('Load preset functionality - select from custom presets list');
    }

    static deletePreset() {
        const name = this.windowElement.querySelector('#preset-name').value.trim();
        if (!name) {
            alert('Please enter a preset name to delete');
            return;
        }

        if (confirm(`Delete preset "${name}"?`)) {
            const customPresets = JSON.parse(localStorage.getItem('emberframe-custom-presets') || '{}');
            delete customPresets[name];
            localStorage.setItem('emberframe-custom-presets', JSON.stringify(customPresets));

            this.updateCustomPresetsList();
            alert(`Preset "${name}" deleted`);
        }
    }

    static updateCustomPresetsList() {
        const container = this.windowElement.querySelector('#custom-presets');
        const customPresets = JSON.parse(localStorage.getItem('emberframe-custom-presets') || '{}');

        container.innerHTML = '';
        Object.keys(customPresets).forEach(name => {
            const presetItem = document.createElement('div');
            presetItem.className = 'custom-preset-item';
            presetItem.innerHTML = `
                <span>${name}</span>
                <button onclick="Settings.applyCustomPreset('${name}')" class="action-btn small">Apply</button>
            `;
            container.appendChild(presetItem);
        });
    }

    static applyCustomPreset(name) {
        const customPresets = JSON.parse(localStorage.getItem('emberframe-custom-presets') || '{}');
        if (customPresets[name]) {
            this.settings = { ...this.getDefaultSettings(), ...customPresets[name] };
            this.loadCurrentSettings();
            this.saveSettings();
            alert(`Preset "${name}" applied!`);
        }
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
        link.download = `emberframe-settings-${new Date().toISOString().split('T')[0]}.json`;
        link.click();

        URL.revokeObjectURL(url);
        alert('Settings exported successfully!');
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

    static backupData() {
        const backup = {
            settings: this.settings,
            customPresets: JSON.parse(localStorage.getItem('emberframe-custom-presets') || '{}'),
            timestamp: new Date().toISOString()
        };

        const dataStr = JSON.stringify(backup, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `emberframe-backup-${new Date().toISOString().split('T')[0]}.json`;
        link.click();

        URL.revokeObjectURL(url);
        alert('Data backup created successfully!');
    }

    static restoreData() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';

        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        const backup = JSON.parse(e.target.result);

                        if (backup.settings) {
                            this.settings = { ...this.getDefaultSettings(), ...backup.settings };
                            this.loadCurrentSettings();
                            this.saveSettings();
                        }

                        if (backup.customPresets) {
                            localStorage.setItem('emberframe-custom-presets', JSON.stringify(backup.customPresets));
                            this.updateCustomPresetsList();
                        }

                        alert('Data restored successfully!');
                    } catch (error) {
                        alert('Error restoring data: Invalid backup file.');
                    }
                };
                reader.readAsText(file);
            }
        };

        input.click();
    }

    static clearCache() {
        if (confirm('Clear all cached data? This will reset temporary files and cache.')) {
            // Clear various caches
            if ('caches' in window) {
                caches.keys().then(names => {
                    names.forEach(name => caches.delete(name));
                });
            }

            // Clear temporary URLs
            const tempUrls = Object.keys(localStorage).filter(key => key.startsWith('blob:'));
            tempUrls.forEach(url => URL.revokeObjectURL(url));

            alert('Cache cleared successfully!');
        }
    }

    static factoryReset() {
        if (confirm('Perform factory reset? This will delete ALL settings, presets, and data. This action cannot be undone!')) {
            if (confirm('Are you absolutely sure? This will reset everything to factory defaults.')) {
                // Clear all localStorage
                Object.keys(localStorage).filter(key => key.startsWith('emberframe')).forEach(key => {
                    localStorage.removeItem(key);
                });

                // Reset settings
                this.settings = this.getDefaultSettings();
                this.loadCurrentSettings();
                this.saveSettings();

                // Refresh systems
                this.destroyParticleSystem();
                if (this.backgroundSystem) this.backgroundSystem.destroy();
                this.initializeSystems();

                alert('Factory reset completed. All data has been restored to defaults.');
            }
        }
    }

    static saveSettings() {
        try {
            localStorage.setItem('emberframe-settings', JSON.stringify(this.settings));
        } catch (error) {
            console.error('Failed to save settings:', error);
        }
    }

    static loadSettings() {
        try {
            const saved = localStorage.getItem('emberframe-settings');
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
            'window-transparency': 10,
            'border-radius': 8,
            'blur-effects': true,
            'window-shadows': true,
            'smooth-animations': true,
            'glass-effect': true,
            'glow-effects': false,

            // Background
            backgroundType: 'gradient',
            'gradient-start': '#667eea',
            'gradient-end': '#764ba2',
            'gradient-angle': 135,
            'gradient-animate': false,
            backgroundAnimation: 'matrix',
            backgroundPattern: 'dots',
            'pattern-opacity': 30,
            'pattern-size': 20,
            'pattern-color': '#00d4ff',
            'pattern-color2': '#ff00ff',
            'pattern-animate': false,
            'pattern-glow': false,
            'media-url': '',
            'media-opacity': 50,
            'media-speed': 1,
            'media-loop': true,
            'media-muted': true,
            'media-blur': false,
            'animation-speed': 1,
            'animation-intensity': 1,

            // Particles
            'particles-enabled': true,
            'particle-count': 100,
            particleBehavior: 'float',
            'particle-size': 3,
            'particle-speed': 1,
            'particle-color': '#00d4ff',
            'particle-shape': 'circle',
            'particle-glow': true,
            'particle-trails': true,
            'particle-connect': false,
            'particle-physics': false,

            // Text Particles
            'particle-text': 'EMBERFRAME',
            'text-font-size': 80,
            'text-font-weight': 'bold',
            'text-letter-spacing': 10,
            'text-animation': 'static',

            // Mouse Interaction
            'mouse-force': 1,
            'mouse-range': 100,
            'mouse-click-burst': false,
            'mouse-velocity': false,

            // Effects
            'screen-shake': false,
            'color-flash': false,
            'rgb-shift': false,
            'scanlines': false,
            'cursor-trail': false,
            'cursor-glow': false,
            'click-ripple': false,
            'audio-reactive': false,
            'audio-waveform': false,
            'audio-spectrum': false,
            'window-open-effect': 'fade',
            'window-close-effect': 'fade',

            // Interface
            'font-family': "'Segoe UI', sans-serif",
            'font-size': 14,
            'auto-hide-taskbar': false,
            'snap-windows': true,
            'show-clock': true,
            'minimize-animation': true,
            'icon-size': 48,
            'icon-spacing': 120,
            'icon-labels': true,
            'icon-hover-effect': true,
            'taskbar-position': 'bottom',
            'taskbar-size': 'medium',

            // Performance
            'frame-rate': 60,
            'quality-preset': 'high',
            'hardware-acceleration': true,
            'reduce-motion': false,
            'particle-pool': 500,
            'canvas-resolution': 1,
            'show-fps': false,
            'show-memory': false,
            'show-performance': false,
            'debug-mode': false,

            // Advanced
            'auto-start': false,
            'system-tray': false,
            'global-hotkeys': false,
            'dev-tools': false,
            'console-logging': false,
            'hot-reload': false
        };
    }

    static onClose() {
        this.saveSettings();
        console.log('🔧 Settings saved and systems kept running');
    }

    static applyStartupSettings() {
        const settings = this.loadSettings();
        console.log('🚀 Applying startup settings:', settings);

        this.settings = settings;
        this.applyColorScheme(settings.colorScheme);
        this.setAccentColor(settings.accentColor);

        // Apply visual settings
        this.applyWindowTransparency(settings['window-transparency']);

        if (!settings['blur-effects']) {
            document.body.classList.add('no-blur');
        }

        if (settings['window-shadows']) {
            document.documentElement.style.setProperty('--window-shadow', '0 10px 30px rgba(0,0,0,0.3)');
        }

        if (settings['glass-effect']) {
            document.body.classList.add('glass-effect');
        }

        if (settings['glow-effects']) {
            document.body.classList.add('glow-effects');
        }

        document.documentElement.style.setProperty('--window-border-radius', settings['border-radius'] + 'px');

        this.initializeSystems();
        console.log('✅ Startup settings applied successfully');
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
                    width: 200px;
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
                    margin-bottom: 10px;
                }

                .settings-title {
                    font-size: 18px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                .settings-version {
                    font-size: 10px;
                    opacity: 0.6;
                    margin-top: 5px;
                }

                .settings-nav {
                    flex: 1;
                    padding: 20px 0;
                    overflow-y: auto;
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
                    border-radius: 8px;
                    padding: 20px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }

                .setting-group > label {
                    display: block;
                    font-size: 16px;
                    font-weight: 600;
                    margin-bottom: 15px;
                    color: #ffffff;
                }

                /* Color Schemes */
                .color-schemes {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(70px, 1fr));
                    gap: 12px;
                    max-height: 200px;
                    overflow-y: auto;
                    padding: 5px;
                }

                .color-schemes::-webkit-scrollbar {
                    width: 6px;
                }

                .color-schemes::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 3px;
                }

                .color-schemes::-webkit-scrollbar-thumb {
                    background: var(--accent-color, #00d4ff);
                    border-radius: 3px;
                }

                .color-scheme {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                    padding: 15px;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border: 2px solid transparent;
                }

                .color-scheme:hover {
                    background: rgba(255, 255, 255, 0.1);
                }

                .color-scheme.active {
                    border-color: var(--accent-color, #00d4ff);
                    background: rgba(0, 212, 255, 0.2);
                }

                .scheme-preview {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    border: 2px solid rgba(255, 255, 255, 0.3);
                }

                .scheme-preview.dark { background: linear-gradient(45deg, #1a1a1a, #2d2d2d); }
                .scheme-preview.light { background: linear-gradient(45deg, #ffffff, #f0f0f0); }
                .scheme-preview.auto { background: linear-gradient(45deg, #1a1a1a 50%, #ffffff 50%); }
                .scheme-preview.cyber { background: linear-gradient(45deg, #00d4ff, #ff00ff); }
                .scheme-preview.neon { background: linear-gradient(45deg, #00ffff, #ff0080); }
                .scheme-preview.matrix { background: linear-gradient(45deg, #000000, #00ff00); }
                .scheme-preview.synthwave { background: linear-gradient(45deg, #2d1b69, #ff6b6b); }
                .scheme-preview.ocean { background: linear-gradient(45deg, #0f3460, #87ceeb); }
                .scheme-preview.sunset { background: linear-gradient(45deg, #ff6347, #ffd700); }
                .scheme-preview.forest { background: linear-gradient(45deg, #1a2e1a, #90ee90); }
                .scheme-preview.royal { background: linear-gradient(45deg, #1a0d33, #daa520); }
                .scheme-preview.fire { background: linear-gradient(45deg, #2d0a0a, #ff4500); }
                .scheme-preview.ice { background: linear-gradient(45deg, #0a1a2d, #b0e0e6); }
                .scheme-preview.space { background: linear-gradient(45deg, #0c0c1e, #9370db); }
                .scheme-preview.toxic { background: linear-gradient(45deg, #1a2d0a, #adff2f); }
                .scheme-preview.pastel { background: linear-gradient(45deg, #f5f5f5, #ff91a4); }
                .scheme-preview.retro { background: linear-gradient(45deg, #2e1065, #00ff41); }
                .scheme-preview.minimal { background: linear-gradient(45deg, #fafafa, #666666); }
                .scheme-preview.aurora { background: linear-gradient(45deg, #0d1b2a, #7209b7); }
                .scheme-preview.cosmic { background: linear-gradient(45deg, #240046, #ff006e); }

                /* Color Picker */
                .color-picker {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                }

                .color-picker input[type="color"] {
                    width: 50px;
                    height: 40px;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                }

                .preset-colors {
                    display: flex;
                    gap: 8px;
                    flex-wrap: wrap;
                }

                .color-preset {
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    cursor: pointer;
                    border: 2px solid transparent;
                    transition: all 0.3s ease;
                }

                .color-preset:hover {
                    transform: scale(1.1);
                }

                .color-preset.active {
                    border-color: #ffffff;
                    box-shadow: 0 0 0 2px var(--accent-color, #00d4ff);
                }

                /* Sliders */
                .slider-container {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                }

                .slider-container label {
                    min-width: 100px;
                    font-weight: 500;
                }

                input[type="range"] {
                    flex: 1;
                    height: 6px;
                    border-radius: 3px;
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
                }

                .slider-value {
                    font-weight: 600;
                    color: var(--accent-color, #00d4ff);
                    min-width: 50px;
                    text-align: right;
                }

                /* Checkboxes */
                .checkbox-group {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                .checkbox-item {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    cursor: pointer;
                    user-select: none;
                }

                .checkbox-item input[type="checkbox"] {
                    display: none;
                }

                .checkmark {
                    width: 20px;
                    height: 20px;
                    background: rgba(255, 255, 255, 0.1);
                    border: 2px solid rgba(255, 255, 255, 0.3);
                    border-radius: 4px;
                    position: relative;
                    transition: all 0.3s ease;
                }

                .checkbox-item input:checked + .checkmark {
                    background: var(--accent-color, #00d4ff);
                    border-color: var(--accent-color, #00d4ff);
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

                /* Background Types */
                .background-types {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
                    gap: 12px;
                }

                .bg-type {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                    padding: 15px;
                    border: 2px solid rgba(255, 255, 255, 0.2);
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .bg-type:hover {
                    border-color: var(--accent-color, #00d4ff);
                }

                .bg-type.active {
                    border-color: var(--accent-color, #00d4ff);
                    background: rgba(0, 212, 255, 0.2);
                }

                /* Gradient Controls */
                .gradient-controls {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .gradient-presets {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
                    gap: 10px;
                    margin-bottom: 20px;
                }

                .gradient-preset {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                    padding: 12px;
                    border: 2px solid rgba(255, 255, 255, 0.2);
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .gradient-preset:hover {
                    border-color: var(--accent-color, #00d4ff);
                }

                .gradient-preset.active {
                    border-color: var(--accent-color, #00d4ff);
                    background: rgba(0, 212, 255, 0.2);
                }

                .gradient-preset div {
                    width: 80px;
                    height: 40px;
                    border-radius: 6px;
                }

                .color-input-group {
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                }

                .color-input-group label {
                    font-size: 14px;
                    color: rgba(255, 255, 255, 0.8);
                }

                .color-input-group input[type="color"] {
                    width: 60px;
                    height: 40px;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                }

                /* Options Grid */
                .animated-options,
                .pattern-options,
                .particle-behaviors {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
                    gap: 8px;
                    max-height: 250px;
                    overflow-y: auto;
                }

                .animated-option,
                .pattern-option,
                .behavior-option {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 4px;
                    padding: 12px;
                    border: 2px solid rgba(255, 255, 255, 0.2);
                    border-radius: 6px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-size: 11px;
                    font-weight: 500;
                }

                .animated-option:hover,
                .pattern-option:hover,
                .behavior-option:hover {
                    border-color: var(--accent-color, #00d4ff);
                }

                .animated-option.active,
                .pattern-option.active,
                .behavior-option.active {
                    border-color: var(--accent-color, #00d4ff);
                    background: rgba(0, 212, 255, 0.2);
                    color: var(--accent-color, #00d4ff);
                }

                .animated-option i,
                .pattern-option i,
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
                    color: rgba(255, 255, 255, 0.8);
                }

                .control-item select {
                    padding: 8px 12px;
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    border-radius: 6px;
                    color: white;
                    outline: none;
                }

                .control-item input[type="color"] {
                    width: 100%;
                    height: 40px;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                }

                /* Media Controls */
                .media-controls {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }

                .media-input,
                .text-input,
                .preset-input {
                    width: 100%;
                    padding: 8px 12px;
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    border-radius: 6px;
                    color: white;
                    outline: none;
                    margin-bottom: 10px;
                }

                .text-input {
                    font-size: 16px;
                    font-weight: bold;
                    text-align: center;
                }

                .browse-btn {
                    padding: 8px 16px;
                    background: var(--accent-color, #00d4ff);
                    color: #000;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-weight: 600;
                    transition: all 0.3s ease;
                }

                .browse-btn:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(0, 212, 255, 0.4);
                }

                /* Action Buttons */
                .action-buttons {
                    display: flex;
                    gap: 10px;
                    flex-wrap: wrap;
                }

                .action-btn {
                    padding: 10px 20px;
                    background: var(--accent-color, #00d4ff);
                    color: #000;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-weight: 600;
                    transition: all 0.3s ease;
                }

                .action-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0, 212, 255, 0.4);
                }

                .action-btn.small {
                    padding: 6px 12px;
                    font-size: 12px;
                }

                .action-btn.danger {
                    background: #ff4757;
                    color: white;
                }

                .action-btn.danger:hover {
                    box-shadow: 0 4px 12px rgba(255, 71, 87, 0.4);
                }

                /* Preset Grid */
                .preset-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 20px;
                }

                .preset-card {
                    background: rgba(255, 255, 255, 0.05);
                    border: 2px solid rgba(255, 255, 255, 0.1);
                    border-radius: 12px;
                    overflow: hidden;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .preset-card:hover {
                    border-color: var(--accent-color, #00d4ff);
                    transform: translateY(-2px);
                }

                .preset-card.active {
                    border-color: var(--accent-color, #00d4ff);
                    background: rgba(0, 212, 255, 0.1);
                }

                .preset-preview {
                    height: 120px;
                    background: linear-gradient(45deg, #667eea, #764ba2);
                    position: relative;
                }

                .preset-preview.gaming { background: linear-gradient(45deg, #ff0080, #00ffff); }
                .preset-preview.productivity { background: linear-gradient(45deg, #f8f9fa, #007bff); }
                .preset-preview.creative { background: linear-gradient(45deg, #240046, #ff006e); }
                .preset-preview.developer { background: linear-gradient(45deg, #000000, #00ff00); }
                .preset-preview.entertainment { background: linear-gradient(45deg, #2d1b69, #feca57); }
                .preset-preview.minimal { background: linear-gradient(45deg, #ffffff, #666666); }

                .preset-info {
                    padding: 15px;
                }

                .preset-info h4 {
                    margin: 0 0 8px 0;
                    color: var(--accent-color, #00d4ff);
                }

                .preset-info p {
                    margin: 0;
                    font-size: 14px;
                    opacity: 0.8;
                    line-height: 1.4;
                }

                /* Preset Actions */
                .preset-actions {
                    display: flex;
                    gap: 10px;
                    margin-bottom: 15px;
                    align-items: center;
                }

                .custom-preset-list {
                    max-height: 200px;
                    overflow-y: auto;
                }

                .custom-preset-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 10px;
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 6px;
                    margin-bottom: 8px;
                }

                /* About Info */
                .about-info {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 8px;
                    padding: 15px;
                }

                .about-item {
                    display: flex;
                    justify-content: space-between;
                    padding: 5px 0;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                }

                .about-item:last-child {
                    border-bottom: none;
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

                /* Color Schemes */
                body.light-mode {
                    --bg-primary: #ffffff;
                    --bg-secondary: #f8f9fa;
                    --text-primary: #333333;
                }

                body.dark-mode {
                    --bg-primary: #1a1a1a;
                    --bg-secondary: #0f0f0f;
                    --text-primary: #ffffff;
                }

                body.cyber-mode {
                    --bg-primary: #0a0a0f;
                    --bg-secondary: #050508;
                    --text-primary: #00d4ff;
                }

                body.neon-mode {
                    --bg-primary: #0d0d0d;
                    --bg-secondary: #1a1a1a;
                    --text-primary: #00ffff;
                }

                body.matrix-mode {
                    --bg-primary: #000000;
                    --bg-secondary: #001100;
                    --text-primary: #00ff00;
                }

                body.synthwave-mode {
                    --bg-primary: #2d1b69;
                    --bg-secondary: #1a0f3d;
                    --text-primary: #ff6b6b;
                }

                body.ocean-mode {
                    --bg-primary: #0f3460;
                    --bg-secondary: #16537e;
                    --text-primary: #87ceeb;
                }

                body.sunset-mode {
                    --bg-primary: #2c1810;
                    --bg-secondary: #3d2418;
                    --text-primary: #ffd700;
                }

                body.forest-mode {
                    --bg-primary: #1a2e1a;
                    --bg-secondary: #0f1f0f;
                    --text-primary: #90ee90;
                }

                body.royal-mode {
                    --bg-primary: #1a0d33;
                    --bg-secondary: #2d1b4e;
                    --text-primary: #daa520;
                }

                body.fire-mode {
                    --bg-primary: #2d0a0a;
                    --bg-secondary: #1a0000;
                    --text-primary: #ff4500;
                }

                body.ice-mode {
                    --bg-primary: #0a1a2d;
                    --bg-secondary: #041426;
                    --text-primary: #b0e0e6;
                }

                body.space-mode {
                    --bg-primary: #0c0c1e;
                    --bg-secondary: #1a1a3a;
                    --text-primary: #e6e6fa;
                }

                body.toxic-mode {
                    --bg-primary: #1a2d0a;
                    --bg-secondary: #0f1f00;
                    --text-primary: #adff2f;
                }

                body.pastel-mode {
                    --bg-primary: #f5f5f5;
                    --bg-secondary: #e8e8e8;
                    --text-primary: #333333;
                }

                body.retro-mode {
                    --bg-primary: #2e1065;
                    --bg-secondary: #1a0040;
                    --text-primary: #00ff41;
                }

                body.minimal-mode {
                    --bg-primary: #fafafa;
                    --bg-secondary: #f0f0f0;
                    --text-primary: #222222;
                }

                body.aurora-mode {
                    --bg-primary: #0d1b2a;
                    --bg-secondary: #1b263b;
                    --text-primary: #e0e1dd;
                }

                body.cosmic-mode {
                    --bg-primary: #240046;
                    --bg-secondary: #3c096c;
                    --text-primary: #ffffff;
                }

                /* Special Effects */
                body.glass-effect .window {
                    backdrop-filter: blur(10px) saturate(180%);
                    background-color: rgba(255, 255, 255, 0.1);
                }

                body.glow-effects .window {
                    box-shadow: 0 0 20px var(--accent-color, #00d4ff);
                }

                body.no-animations * {
                    animation-duration: 0s !important;
                    transition-duration: 0s !important;
                }

                body.debug-mode {
                    position: relative;
                }

                body.debug-mode::before {
                    content: 'DEBUG MODE';
                    position: fixed;
                    top: 10px;
                    left: 10px;
                    background: #ff4757;
                    color: white;
                    padding: 5px 10px;
                    border-radius: 4px;
                    font-size: 12px;
                    z-index: 10001;
                }

                /* Responsive */
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

                    .gradient-presets {
                        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
                    }

                    .preset-grid {
                        grid-template-columns: 1fr;
                    }
                }
            </style>
        `;
    }
}

// Enhanced Particle System
class AdvancedParticleSystem {
    constructor(settings) {
        console.log('🔥 AdvancedParticleSystem constructor started');
        this.settings = settings || Settings.getDefaultSettings();
        this.particles = [];
        this.canvas = null;
        this.ctx = null;
        this.animationId = null;
        this.isRunning = false;
        this.mouse = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            lastX: 0,
            lastY: 0,
            vx: 0,
            vy: 0,
            clicked: false,
            clickX: 0,
            clickY: 0
        };
        this.clickParticles = [];
        this.physics = {
            gravity: 0.1,
            friction: 0.99,
            bounce: 0.8
        };

        this.init();
    }

    init() {
        console.log('🚀 AdvancedParticleSystem.init() starting...');

        try {
            this.createCanvas();
            this.setupEventListeners();
            this.createParticles();
            this.startAnimation();
            console.log('✅ AdvancedParticleSystem initialized successfully');
        } catch (error) {
            console.error('❌ AdvancedParticleSystem initialization failed:', error);
        }
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'advanced-particles-canvas';
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
        document.body.appendChild(this.canvas);
    }

    setupEventListeners() {
        window.addEventListener('resize', () => this.resize());
        document.addEventListener('mousemove', (e) => {
            this.mouse.lastX = this.mouse.x;
            this.mouse.lastY = this.mouse.y;
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            this.mouse.vx = this.mouse.x - this.mouse.lastX;
            this.mouse.vy = this.mouse.y - this.mouse.lastY;
        });

        document.addEventListener('click', (e) => {
            this.mouse.clicked = true;
            this.mouse.clickX = e.clientX;
            this.mouse.clickY = e.clientY;

            if (this.settings['mouse-click-burst']) {
                this.createClickBurst(e.clientX, e.clientY);
            }

            setTimeout(() => {
                this.mouse.clicked = false;
            }, 100);
        });
    }

    resize() {
        this.canvas.width = window.innerWidth * (this.settings['canvas-resolution'] || 1);
        this.canvas.height = window.innerHeight * (this.settings['canvas-resolution'] || 1);
        this.canvas.style.width = window.innerWidth + 'px';
        this.canvas.style.height = window.innerHeight + 'px';
    }

    createParticles() {
        this.particles = [];
        const count = parseInt(this.settings['particle-count']) || 100;

        for (let i = 0; i < count; i++) {
            const particle = this.createParticle(i);
            this.particles.push(particle);
        }

        console.log(`✅ Created ${this.particles.length} advanced particles`);
    }

    createParticle(index) {
        return {
            id: index,
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
            targetX: undefined,
            targetY: undefined,
            phase: Math.random() * Math.PI * 2,
            radius: Math.random() * 100 + 50,
            orbitalAngle: Math.random() * Math.PI * 2,
            trail: [],
            mass: Math.random() * 2 + 1,
            charge: Math.random() > 0.5 ? 1 : -1,
            rotation: 0,
            rotationSpeed: (Math.random() - 0.5) * 0.1,
            size: this.getParticleSize(),
            color: this.getParticleColor(),
            alpha: 1,
            connections: []
        };
    }

    getParticleSize() {
        const baseSize = parseInt(this.settings['particle-size']) || 3;
        return baseSize + Math.random() * 2;
    }

    getParticleColor() {
        const baseColor = this.settings['particle-color'] || '#00d4ff';
        if (Math.random() > 0.8) {
            // Add some color variation
            const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#feca57', '#ff9ff3'];
            return colors[Math.floor(Math.random() * colors.length)];
        }
        return baseColor;
    }

    setBehavior(behavior) {
        this.settings.particleBehavior = behavior;
        console.log(`🎯 Advanced particle behavior changed to: ${behavior}`);

        if (behavior === 'text') {
            this.arrangeAsText();
        } else if (behavior === 'sphere' || behavior === 'cube') {
            this.arrangeIn3D();
        }
    }

    arrangeAsText() {
        const text = this.settings['particle-text'] || 'EMBERFRAME';
        const fontSize = parseInt(this.settings['text-font-size']) || 80;
        const fontWeight = this.settings['text-font-weight'] || 'bold';
        const letterSpacing = parseInt(this.settings['text-letter-spacing']) || 10;

        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        tempCtx.font = `${fontWeight} ${fontSize}px Arial`;

        const textMetrics = tempCtx.measureText(text);
        const textWidth = textMetrics.width + (letterSpacing * (text.length - 1));
        const textHeight = fontSize;

        const startX = (this.canvas.width - textWidth) / 2;
        const startY = (this.canvas.height + textHeight) / 2;

        tempCanvas.width = textWidth + 100;
        tempCanvas.height = textHeight + 100;
        tempCtx.font = `${fontWeight} ${fontSize}px Arial`;
        tempCtx.fillStyle = 'white';
        tempCtx.textBaseline = 'top';

        let currentX = 50;
        for (let i = 0; i < text.length; i++) {
            tempCtx.fillText(text[i], currentX, 50);
            currentX += tempCtx.measureText(text[i]).width + letterSpacing;
        }

        const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
        const data = imageData.data;

        const textPixels = [];
        for (let y = 0; y < tempCanvas.height; y += 3) {
            for (let x = 0; x < tempCanvas.width; x += 3) {
                const index = (y * tempCanvas.width + x) * 4;
                const alpha = data[index + 3];
                if (alpha > 128) {
                    textPixels.push({
                        x: startX + x - 50,
                        y: startY + y - 50
                    });
                }
            }
        }

        this.particles.forEach((particle, index) => {
            if (index < textPixels.length) {
                particle.targetX = textPixels[index].x;
                particle.targetY = textPixels[index].y;
            } else {
                particle.targetX = Math.random() * this.canvas.width;
                particle.targetY = Math.random() * this.canvas.height;
            }
        });

        console.log(`📝 Arranged ${textPixels.length} particles for text: "${text}"`);
    }

    createClickBurst(x, y) {
        for (let i = 0; i < 30; i++) {
            const angle = (Math.PI * 2 * i) / 30;
            const speed = Math.random() * 8 + 3;
            this.clickParticles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 60,
                maxLife: 60,
                size: Math.random() * 4 + 2,
                color: this.settings['particle-color'] || '#00d4ff',
                alpha: 1
            });
        }
    }

    createTestBurst() {
        this.createClickBurst(this.canvas.width / 2, this.canvas.height / 2);
        console.log('🎆 Test particle burst created');
    }

    updateParticles() {
        const behavior = this.settings.particleBehavior || 'float';
        const speed = parseFloat(this.settings['particle-speed']) || 1;
        const trails = this.settings['particle-trails'];
        const physics = this.settings['particle-physics'];

        this.particles.forEach((particle, index) => {
            // Update trail
            if (trails) {
                particle.trail.push({ x: particle.x, y: particle.y, alpha: particle.alpha });
                if (particle.trail.length > 15) {
                    particle.trail.shift();
                }
            }

            // Update rotation
            particle.rotation += particle.rotationSpeed;

            // Apply behavior-specific movement
            this.applyBehavior(particle, behavior, speed, index);

            // Apply physics if enabled
            if (physics) {
                this.applyPhysics(particle);
            }

            // Update particle properties
            particle.life += speed;
            if (particle.life > particle.maxLife && behavior === 'fireworks') {
                this.resetParticle(particle, index);
            }

            // Boundary handling
            this.handleBoundaries(particle, behavior);
        });

        // Update click particles
        this.updateClickParticles();
    }

    applyBehavior(particle, behavior, speed, index) {
        switch (behavior) {
            case 'float':
                particle.x += particle.vx * speed;
                particle.y += particle.vy * speed;
                break;

            case 'follow':
                const fdx = this.mouse.x - particle.x;
                const fdy = this.mouse.y - particle.y;
                const force = this.settings['mouse-force'] || 1;
                particle.vx += fdx * 0.0002 * speed * force;
                particle.vy += fdy * 0.0002 * speed * force;
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.vx *= 0.95;
                particle.vy *= 0.95;
                break;

            case 'dodge':
                const ddx = this.mouse.x - particle.x;
                const ddy = this.mouse.y - particle.y;
                const dist = Math.sqrt(ddx * ddx + ddy * ddy);
                const range = this.settings['mouse-range'] || 100;
                if (dist < range) {
                    const repelForce = (this.settings['mouse-force'] || 1) * 2;
                    particle.vx -= ddx * 0.002 * speed * repelForce;
                    particle.vy -= ddy * 0.002 * speed * repelForce;
                }
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.vx *= 0.98;
                particle.vy *= 0.98;
                break;

            case 'orbit':
                const centerX = this.canvas.width / 2;
                const centerY = this.canvas.height / 2;
                particle.orbitalAngle += 0.02 * speed;
                particle.x = centerX + Math.cos(particle.orbitalAngle) * particle.radius;
                particle.y = centerY + Math.sin(particle.orbitalAngle) * particle.radius;
                break;

            case 'magnetic':
                this.applyMagneticForces(particle, index, speed);
                break;

            case 'spiral':
                const scx = this.canvas.width / 2;
                const scy = this.canvas.height / 2;
                particle.angle += 0.03 * speed;
                const spiralRadius = (particle.angle * 3) % 300;
                particle.x = scx + Math.cos(particle.angle) * spiralRadius;
                particle.y = scy + Math.sin(particle.angle) * spiralRadius;
                break;

            case 'wave':
                particle.phase += 0.05 * speed;
                particle.x += particle.vx * speed;
                particle.y = particle.originalY + Math.sin(particle.phase + particle.x * 0.01) * 50;
                break;

            case 'fireworks':
                this.applyFireworksPhysics(particle, speed);
                break;

            case 'constellation':
                particle.x += particle.vx * 0.5 * speed;
                particle.y += particle.vy * 0.5 * speed;
                particle.alpha = 0.3 + 0.7 * Math.sin(Date.now() * 0.002 + index);
                break;

            case 'vortex':
                this.applyVortexForces(particle, speed);
                break;

            case 'tornado':
                this.applyTornadoMotion(particle, speed);
                break;

            case 'bounce':
                particle.x += particle.vx * speed;
                particle.y += particle.vy * speed;
                if (particle.x <= 0 || particle.x >= this.canvas.width) particle.vx *= -this.physics.bounce;
                if (particle.y <= 0 || particle.y >= this.canvas.height) particle.vy *= -this.physics.bounce;
                break;

            case 'gravity':
                particle.x += particle.vx * speed;
                particle.y += particle.vy * speed;
                particle.vy += this.physics.gravity * speed;
                if (particle.y > this.canvas.height) {
                    particle.y = 0;
                    particle.x = Math.random() * this.canvas.width;
                    particle.vy = Math.random() * 2;
                }
                break;

            case 'text':
                this.applyTextBehavior(particle, speed, index);
                break;

            case 'laser':
                this.applyLaserBehavior(particle, speed);
                break;

            default:
                particle.x += particle.vx * speed;
                particle.y += particle.vy * speed;
        }
    }

    applyMagneticForces(particle, index, speed) {
        this.particles.forEach((other, oi) => {
            if (index !== oi) {
                const dx = other.x - particle.x;
                const dy = other.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 120 && distance > 0) {
                    const force = (particle.charge * other.charge) / (distance * distance);
                    particle.vx += dx * force * 0.001 * speed;
                    particle.vy += dy * force * 0.001 * speed;
                }
            }
        });
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.99;
        particle.vy *= 0.99;
    }

    applyFireworksPhysics(particle, speed) {
        particle.life += speed;
        if (particle.life > particle.maxLife) {
            particle.x = Math.random() * this.canvas.width;
            particle.y = this.canvas.height;
            particle.vx = (Math.random() - 0.5) * 10;
            particle.vy = -Math.random() * 10 - 5;
            particle.life = 0;
            particle.alpha = 1;
        }
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += this.physics.gravity * 2;
        particle.alpha = 1 - (particle.life / particle.maxLife);
    }

    applyVortexForces(particle, speed) {
        const vx = this.mouse.x;
        const vy = this.mouse.y;
        const dx = vx - particle.x;
        const dy = vy - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);

        particle.x += Math.cos(angle + Math.PI/2) * speed * 3;
        particle.y += Math.sin(angle + Math.PI/2) * speed * 3;

        if (distance > 10) {
            particle.x += dx * 0.01 * speed;
            particle.y += dy * 0.01 * speed;
        }
    }

    applyTornadoMotion(particle, speed) {
        const tcx = this.canvas.width / 2;
        const tcy = this.canvas.height / 2;
        particle.angle += 0.05 * speed;
        const tornadoRadius = Math.abs(Math.sin(particle.angle * 0.5)) * 200;
        particle.x = tcx + Math.cos(particle.angle) * tornadoRadius;
        particle.y = tcy + Math.sin(particle.angle * 2) * 100 + particle.angle * 3;

        if (particle.y > this.canvas.height) {
            particle.angle = 0;
        }
    }

    applyTextBehavior(particle, speed, index) {
        if (particle.targetX !== undefined && particle.targetY !== undefined) {
            const textAnimation = this.settings['text-animation'] || 'static';
            let targetX = particle.targetX;
            let targetY = particle.targetY;

            switch (textAnimation) {
                case 'wave':
                    targetY += Math.sin(Date.now() * 0.003 + particle.targetX * 0.01) * 20;
                    break;
                case 'bounce':
                    targetY += Math.abs(Math.sin(Date.now() * 0.005 + index * 0.1)) * 30;
                    break;
                case 'typewriter':
                    const revealProgress = (Date.now() * 0.001) % 10;
                    const particleRevealTime = index * 0.02;
                    if (revealProgress < particleRevealTime) {
                        targetX = Math.random() * this.canvas.width;
                        targetY = Math.random() * this.canvas.height;
                    }
                    break;
                case 'explode':
                    const explodeTime = Math.sin(Date.now() * 0.002) * 50;
                    const dx = particle.targetX - this.canvas.width / 2;
                    const dy = particle.targetY - this.canvas.height / 2;
                    targetX = particle.targetX + dx * explodeTime * 0.01;
                    targetY = particle.targetY + dy * explodeTime * 0.01;
                    break;
            }

            const dtx = targetX - particle.x;
            const dty = targetY - particle.y;
            const attractionForce = 0.05 * speed;

            particle.vx += dtx * attractionForce;
            particle.vy += dty * attractionForce;
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vx *= 0.8;
            particle.vy *= 0.8;
        } else {
            particle.x += particle.vx * speed;
            particle.y += particle.vy * speed;
        }
    }

    applyLaserBehavior(particle, speed) {
        const ldx = this.mouse.x - particle.x;
        const ldy = this.mouse.y - particle.y;
        const ldist = Math.sqrt(ldx * ldx + ldy * ldy);
        if (ldist > 10) {
            particle.x += (ldx / ldist) * speed * 5;
            particle.y += (ldy / ldist) * speed * 5;
        }
    }

    applyPhysics(particle) {
        particle.vx *= this.physics.friction;
        particle.vy *= this.physics.friction;
    }

    resetParticle(particle, index) {
        Object.assign(particle, this.createParticle(index));
    }

    handleBoundaries(particle, behavior) {
        if (['bounce', 'gravity'].includes(behavior)) return;

        if (particle.x < 0) particle.x = this.canvas.width;
        if (particle.x > this.canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = this.canvas.height;
        if (particle.y > this.canvas.height) particle.y = 0;
    }

    updateClickParticles() {
        this.clickParticles = this.clickParticles.filter(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vx *= 0.98;
            p.vy *= 0.98;
            p.life--;
            p.alpha = p.life / p.maxLife;
            return p.life > 0;
        });
    }

    drawParticles() {
        const size = parseInt(this.settings['particle-size']) || 3;
        const color = this.settings['particle-color'] || '#00d4ff';
        const shape = this.settings['particle-shape'] || 'circle';
        const glow = this.settings['particle-glow'];
        const connect = this.settings['particle-connect'];
        const trails = this.settings['particle-trails'];

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw connections
        if (connect) {
            this.drawConnections();
        }

        // Draw laser effects
        if (this.settings.particleBehavior === 'laser') {
            this.drawLaserEffects();
        }

        // Draw particle trails
        if (trails) {
            this.drawTrails();
        }

        // Draw main particles
        this.particles.forEach((particle, index) => {
            this.drawParticle(particle, shape, glow);
        });

        // Draw click particles
        this.drawClickParticles();
    }

    drawConnections() {
        this.ctx.strokeStyle = this.settings['particle-color'] + '30';
        this.ctx.lineWidth = 1;

        this.particles.forEach((particle, i) => {
            this.particles.slice(i + 1).forEach(other => {
                const dist = Math.sqrt(
                    Math.pow(particle.x - other.x, 2) +
                    Math.pow(particle.y - other.y, 2)
                );
                if (dist < 120) {
                    const alpha = 1 - (dist / 120);
                    this.ctx.strokeStyle = this.settings['particle-color'] + Math.floor(alpha * 100).toString(16).padStart(2, '0');
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(other.x, other.y);
                    this.ctx.stroke();
                }
            });
        });
    }

    drawLaserEffects() {
        this.ctx.strokeStyle = this.settings['particle-color'] + '80';
        this.ctx.lineWidth = 2;
        this.particles.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.moveTo(particle.x, particle.y);
            this.ctx.lineTo(this.mouse.x, this.mouse.y);
            this.ctx.stroke();
        });
    }

    drawTrails() {
        this.particles.forEach(particle => {
            if (particle.trail && particle.trail.length > 1) {
                this.ctx.strokeStyle = particle.color + '60';
                this.ctx.lineWidth = Math.max(1, particle.size / 2);
                this.ctx.beginPath();
                this.ctx.moveTo(particle.trail[0].x, particle.trail[0].y);
                for (let i = 1; i < particle.trail.length; i++) {
                    this.ctx.lineTo(particle.trail[i].x, particle.trail[i].y);
                }
                this.ctx.stroke();
            }
        });
    }

    drawParticle(particle, shape, glow) {
        this.ctx.save();
        this.ctx.translate(particle.x, particle.y);
        this.ctx.rotate(particle.rotation);

        if (glow) {
            this.ctx.shadowColor = particle.color;
            this.ctx.shadowBlur = particle.size * 3;
        }

        this.ctx.globalAlpha = particle.alpha;
        this.ctx.fillStyle = particle.color;
        this.ctx.beginPath();

        switch (shape) {
            case 'circle':
                this.ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
                break;
            case 'square':
                this.ctx.rect(-particle.size, -particle.size, particle.size * 2, particle.size * 2);
                break;
            case 'triangle':
                this.ctx.moveTo(0, -particle.size);
                this.ctx.lineTo(-particle.size, particle.size);
                this.ctx.lineTo(particle.size, particle.size);
                this.ctx.closePath();
                break;
            case 'star':
                this.drawStar(0, 0, particle.size);
                break;
            case 'diamond':
                this.ctx.moveTo(0, -particle.size);
                this.ctx.lineTo(particle.size, 0);
                this.ctx.lineTo(0, particle.size);
                this.ctx.lineTo(-particle.size, 0);
                this.ctx.closePath();
                break;
            case 'hexagon':
                this.drawHexagon(0, 0, particle.size);
                break;
        }

        this.ctx.fill();
        this.ctx.restore();
    }

    drawStar(x, y, size) {
        const spikes = 5;
        const outerRadius = size;
        const innerRadius = size * 0.5;
        let rot = Math.PI / 2 * 3;
        const step = Math.PI / spikes;

        this.ctx.moveTo(x, y - outerRadius);

        for (let i = 0; i < spikes; i++) {
            let cx = x + Math.cos(rot) * outerRadius;
            let cy = y + Math.sin(rot) * outerRadius;
            this.ctx.lineTo(cx, cy);
            rot += step;

            cx = x + Math.cos(rot) * innerRadius;
            cy = y + Math.sin(rot) * innerRadius;
            this.ctx.lineTo(cx, cy);
            rot += step;
        }

        this.ctx.lineTo(x, y - outerRadius);
        this.ctx.closePath();
    }

    drawHexagon(x, y, size) {
        const sides = 6;
        const angle = (Math.PI * 2) / sides;

        this.ctx.moveTo(x + size, y);
        for (let i = 1; i < sides; i++) {
            this.ctx.lineTo(
                x + Math.cos(angle * i) * size,
                y + Math.sin(angle * i) * size
            );
        }
        this.ctx.closePath();
    }

    drawClickParticles() {
        this.clickParticles.forEach(p => {
            this.ctx.globalAlpha = p.alpha;
            this.ctx.fillStyle = p.color;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fill();
        });
        this.ctx.globalAlpha = 1;
    }

    startAnimation() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.animate();
    }

    stopAnimation() {
        this.isRunning = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    animate() {
        if (!this.isRunning || !this.canvas || !this.ctx) return;

        try {
            this.updateParticles();
            this.drawParticles();
        } catch (error) {
            console.error('❌ Animation error:', error);
        }

        if (this.isRunning) {
            this.animationId = requestAnimationFrame(() => this.animate());
        }
    }

    updateSettings(newSettings) {
        this.settings = newSettings;

        const newCount = parseInt(newSettings['particle-count']) || 100;
        if (newCount !== this.particles.length) {
            this.createParticles();
        }

        this.resize();
    }

    destroy() {
        console.log('🗑️ Destroying advanced particle system...');

        this.stopAnimation();

        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }

        this.particles = [];
        this.clickParticles = [];
        this.canvas = null;
        this.ctx = null;

        console.log('✅ Advanced particle system destroyed');
    }
}

// Animated Background System
class AnimatedBackgroundSystem {
    constructor(settings) {
        this.settings = settings;
        this.canvas = null;
        this.ctx = null;
        this.animationId = null;
        this.time = 0;
        this.objects = [];

        this.init();
    }

    init() {
        this.createCanvas();
        this.setupAnimation();
        this.animate();
    }

    createCanvas() {
        // Remove existing canvas
        const existing = document.getElementById('animated-background-canvas');
        if (existing) existing.remove();

        this.canvas = document.createElement('canvas');
        this.canvas.id = 'animated-background-canvas';
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

    setupAnimation() {
        const animation = this.settings.backgroundAnimation;

        switch (animation) {
            case 'matrix':
                this.setupMatrix();
                break;
            case 'waves':
                this.setupWaves();
                break;
            case 'neural':
                this.setupNeuralNetwork();
                break;
            case 'plasma':
                this.setupPlasma();
                break;
            case 'starfield':
                this.setupStarfield();
                break;
            case 'geometry':
                this.setupGeometry();
                break;
        }
    }

    setupMatrix() {
        this.objects = [];
        const columns = Math.floor(this.canvas.width / 20);

        for (let i = 0; i < columns; i++) {
            this.objects.push({
                x: i * 20,
                y: Math.random() * this.canvas.height,
                speed: Math.random() * 3 + 2,
                characters: '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン',
                currentChar: 0
            });
        }
    }

    setupWaves() {
        this.objects = [];
        for (let i = 0; i < 8; i++) {
            this.objects.push({
                amplitude: Math.random() * 50 + 25,
                frequency: Math.random() * 0.02 + 0.005,
                phase: Math.random() * Math.PI * 2,
                speed: Math.random() * 0.02 + 0.01,
                y: (i / 8) * this.canvas.height,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    setupNeuralNetwork() {
        this.objects = [];
        for (let i = 0; i < 30; i++) {
            this.objects.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                connections: []
            });
        }
    }

    setupPlasma() {
        // Plasma is generated procedurally, no setup needed
    }

    setupStarfield() {
        this.objects = [];
        for (let i = 0; i < 200; i++) {
            this.objects.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                z: Math.random() * 1000,
                speed: Math.random() * 2 + 1
            });
        }
    }

    setupGeometry() {
        this.objects = [];
        for (let i = 0; i < 50; i++) {
            this.objects.push({
                x1: Math.random() * this.canvas.width,
                y1: Math.random() * this.canvas.height,
                x2: Math.random() * this.canvas.width,
                y2: Math.random() * this.canvas.height,
                speed: Math.random() * 2 + 0.5,
                angle: Math.random() * Math.PI * 2
            });
        }
    }

    animate() {
        const speed = this.settings['animation-speed'] || 1;
        const intensity = this.settings['animation-intensity'] || 1;

        this.time += 0.02 * speed;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const animation = this.settings.backgroundAnimation;

        switch (animation) {
            case 'matrix':
                this.drawMatrix(intensity);
                break;
            case 'waves':
                this.drawWaves(intensity);
                break;
            case 'neural':
                this.drawNeuralNetwork(intensity);
                break;
            case 'plasma':
                this.drawPlasma(intensity);
                break;
            case 'starfield':
                this.drawStarfield(intensity);
                break;
            case 'geometry':
                this.drawGeometry(intensity);
                break;
        }

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    drawMatrix(intensity) {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = '#00ff00';
        this.ctx.font = '15px monospace';

        this.objects.forEach(column => {
            const char = column.characters[Math.floor(Math.random() * column.characters.length)];
            this.ctx.fillText(char, column.x, column.y);

            column.y += column.speed * intensity;
            if (column.y > this.canvas.height) {
                column.y = -20;
            }
        });
    }

    drawWaves(intensity) {
        this.objects.forEach((wave, index) => {
            this.ctx.strokeStyle = `rgba(0, 212, 255, ${wave.opacity * intensity})`;
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();

            for (let x = 0; x <= this.canvas.width; x += 10) {
                const y = wave.y + Math.sin((x * wave.frequency) + (this.time * wave.speed)) * wave.amplitude * intensity;
                if (x === 0) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
            }
            this.ctx.stroke();

            wave.phase += wave.speed;
        });
    }

    drawNeuralNetwork(intensity) {
        // Update nodes
        this.objects.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;

            if (node.x < 0 || node.x > this.canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > this.canvas.height) node.vy *= -1;
        });

        // Draw connections
        this.ctx.strokeStyle = `rgba(0, 212, 255, ${0.3 * intensity})`;
        this.ctx.lineWidth = 1;

        for (let i = 0; i < this.objects.length; i++) {
            for (let j = i + 1; j < this.objects.length; j++) {
                const dx = this.objects[i].x - this.objects[j].x;
                const dy = this.objects[i].y - this.objects[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.objects[i].x, this.objects[i].y);
                    this.ctx.lineTo(this.objects[j].x, this.objects[j].y);
                    this.ctx.stroke();
                }
            }
        }

        // Draw nodes
        this.ctx.fillStyle = `rgba(0, 212, 255, ${intensity})`;
        this.objects.forEach(node => {
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }

    drawPlasma(intensity) {
        const imageData = this.ctx.createImageData(this.canvas.width, this.canvas.height);
        const data = imageData.data;

        for (let x = 0; x < this.canvas.width; x += 4) {
            for (let y = 0; y < this.canvas.height; y += 4) {
                const value = Math.sin(x * 0.01 + this.time) +
                             Math.sin(y * 0.01 + this.time) +
                             Math.sin((x + y) * 0.01 + this.time) +
                             Math.sin(Math.sqrt(x * x + y * y) * 0.01 + this.time);

                const color = Math.floor((value + 4) * 32 * intensity);
                const index = (y * this.canvas.width + x) * 4;

                data[index] = color;     // Red
                data[index + 1] = color * 0.5; // Green
                data[index + 2] = 255;   // Blue
                data[index + 3] = 255;   // Alpha
            }
        }

        this.ctx.putImageData(imageData, 0, 0);
    }

    drawStarfield(intensity) {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.objects.forEach(star => {
            star.z -= star.speed * intensity;
            if (star.z <= 0) {
                star.x = Math.random() * this.canvas.width;
                star.y = Math.random() * this.canvas.height;
                star.z = 1000;
            }

            const x = (star.x - this.canvas.width / 2) * (1000 / star.z) + this.canvas.width / 2;
            const y = (star.y - this.canvas.height / 2) * (1000 / star.z) + this.canvas.height / 2;
            const size = (1000 - star.z) / 1000 * 3;

            this.ctx.fillStyle = `rgba(255, 255, 255, ${intensity})`;
            this.ctx.beginPath();
            this.ctx.arc(x, y, size, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }

    drawGeometry(intensity) {
        this.ctx.strokeStyle = `rgba(0, 212, 255, ${0.5 * intensity})`;
        this.ctx.lineWidth = 1;

        this.objects.forEach(line => {
            line.angle += 0.01;

            const newX1 = line.x1 + Math.cos(line.angle) * line.speed;
            const newY1 = line.y1 + Math.sin(line.angle) * line.speed;
            const newX2 = line.x2 + Math.cos(line.angle + Math.PI) * line.speed;
            const newY2 = line.y2 + Math.sin(line.angle + Math.PI) * line.speed;

            this.ctx.beginPath();
            this.ctx.moveTo(newX1, newY1);
            this.ctx.lineTo(newX2, newY2);
            this.ctx.stroke();

            // Wrap around screen
            if (newX1 < 0 || newX1 > this.canvas.width) line.x1 = Math.random() * this.canvas.width;
            if (newY1 < 0 || newY1 > this.canvas.height) line.y1 = Math.random() * this.canvas.height;
            if (newX2 < 0 || newX2 > this.canvas.width) line.x2 = Math.random() * this.canvas.width;
            if (newY2 < 0 || newY2 > this.canvas.height) line.y2 = Math.random() * this.canvas.height;
        });
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
}

// Performance Monitor
class PerformanceMonitor {
    constructor(type = 'fps') {
        this.type = type;
        this.element = null;
        this.values = [];
        this.lastTime = performance.now();
        this.frameCount = 0;

        this.init();
    }

    init() {
        this.element = document.createElement('div');
        this.element.style.cssText = `
            position: fixed;
            ${this.type === 'fps' ? 'top: 10px; right: 10px;' : 
              this.type === 'memory' ? 'top: 40px; right: 10px;' : 'top: 70px; right: 10px;'}
            background: rgba(0, 0, 0, 0.8);
            color: #00ff00;
            padding: 5px 10px;
            border-radius: 4px;
            font-family: monospace;
            font-size: 12px;
            z-index: 10000;
            min-width: 100px;
        `;
        document.body.appendChild(this.element);

        this.update();
    }

    update() {
        const now = performance.now();

        if (this.type === 'fps') {
            this.frameCount++;
            if (now - this.lastTime >= 1000) {
                const fps = Math.round((this.frameCount * 1000) / (now - this.lastTime));
                this.element.textContent = `FPS: ${fps}`;
                this.frameCount = 0;
                this.lastTime = now;
            }
        } else if (this.type === 'memory' && performance.memory) {
            const used = Math.round(performance.memory.usedJSHeapSize / 1048576);
            const total = Math.round(performance.memory.totalJSHeapSize / 1048576);
            this.element.textContent = `RAM: ${used}/${total}MB`;
        } else if (this.type === 'performance') {
            const paintTime = performance.getEntriesByType('paint');
            const loadTime = paintTime.length > 0 ? Math.round(paintTime[paintTime.length - 1].startTime) : 0;
            this.element.textContent = `Load: ${loadTime}ms`;
        }

        requestAnimationFrame(() => this.update());
    }

    destroy() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
    }
}

// Effects System
class EffectsSystem {
    constructor(settings) {
        this.settings = settings;
        this.elements = new Map();

        this.init();
    }

    init() {
        this.setupCursorEffects();
        this.setupScreenEffects();
        this.setupAudioVisualization();
    }

    setupCursorEffects() {
        if (this.settings['cursor-trail']) {
            this.initCursorTrail();
        }

        if (this.settings['cursor-glow']) {
            this.initCursorGlow();
        }

        if (this.settings['click-ripple']) {
            this.initClickRipple();
        }
    }

    setupScreenEffects() {
        if (this.settings['scanlines']) {
            this.initScanlines();
        }

        if (this.settings['rgb-shift']) {
            this.initRGBShift();
        }
    }

    setupAudioVisualization() {
        if (this.settings['audio-reactive'] || this.settings['audio-waveform'] || this.settings['audio-spectrum']) {
            this.initAudioContext();
        }
    }

    initCursorTrail() {
        // Cursor trail implementation
    }

    initCursorGlow() {
        const glowElement = document.createElement('div');
        glowElement.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, var(--accent-color), transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: screen;
        `;
        document.body.appendChild(glowElement);
        this.elements.set('cursor-glow', glowElement);

        document.addEventListener('mousemove', (e) => {
            glowElement.style.left = (e.clientX - 10) + 'px';
            glowElement.style.top = (e.clientY - 10) + 'px';
        });
    }

    initClickRipple() {
        document.addEventListener('click', (e) => {
            this.createRipple(e.clientX, e.clientY);
        });
    }

    createRipple(x, y) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: fixed;
            left: ${x - 25}px;
            top: ${y - 25}px;
            width: 50px;
            height: 50px;
            border: 2px solid var(--accent-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            animation: rippleExpand 0.6s ease-out forwards;
        `;

        if (!document.querySelector('#ripple-keyframes')) {
            const style = document.createElement('style');
            style.id = 'ripple-keyframes';
            style.textContent = `
                @keyframes rippleExpand {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    }

    initScanlines() {
        const scanlines = document.createElement('div');
        scanlines.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(0, 255, 0, 0.03) 2px,
                rgba(0, 255, 0, 0.03) 4px
            );
            pointer-events: none;
            z-index: 9997;
        `;
        document.body.appendChild(scanlines);
        this.elements.set('scanlines', scanlines);
    }

    initRGBShift() {
        document.body.style.filter = 'contrast(1.1) brightness(1.1)';
        // Additional RGB shift effects would be implemented here
    }

    initAudioContext() {
        // Audio visualization setup would be implemented here
        console.log('🎵 Audio visualization initialized');
    }

    updateSettings(newSettings) {
        this.settings = newSettings;

        // Clean up and reinitialize effects based on new settings
        this.destroy();
        this.init();
    }

    destroy() {
        this.elements.forEach((element, key) => {
            if (element && element.parentNode) {
                element.parentNode.removeChild(element);
            }
        });
        this.elements.clear();
    }
}

// Make Settings available globally
window.EmberFrame.registerApp('settings', Settings);

// Auto-apply startup settings when page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 DOM loaded, applying startup settings...');
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
    console.log('🚀 Script loaded, DOM not ready yet...');
} else {
    console.log('🚀 Script loaded, DOM already ready...');
    setTimeout(() => {
        Settings.applyStartupSettings();
    }, 500);
}
