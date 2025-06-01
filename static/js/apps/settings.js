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
                                <label>Gradient Colors</label>
                                <div class="gradient-controls">
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
                            </div>

                            <!-- Animated Settings -->
                            <div class="setting-group" id="animated-settings" style="display: none;">
                                <label>Animated Backgrounds</label>
                                <div class="animated-options">
                                    <div class="animated-option" data-animation="matrix">Matrix Rain</div>
                                    <div class="animated-option" data-animation="waves">Flowing Waves</div>
                                    <div class="animated-option" data-animation="neural">Neural Network</div>
                                    <div class="animated-option" data-animation="plasma">Plasma Field</div>
                                    <div class="animated-option" data-animation="geometry">Geometric Lines</div>
                                    <div class="animated-option" data-animation="stars">Starfield</div>
                                    <div class="animated-option" data-animation="particles">Particle Flow</div>
                                    <div class="animated-option" data-animation="fractals">Fractal Tree</div>
                                    <div class="animated-option" data-animation="cellular">Cellular Automata</div>
                                    <div class="animated-option" data-animation="lightning">Lightning</div>
                                    <div class="animated-option" data-animation="ripples">Water Ripples</div>
                                    <div class="animated-option" data-animation="crystals">Growing Crystals</div>
                                    <div class="animated-option" data-animation="dna">DNA Strands</div>
                                    <div class="animated-option" data-animation="galaxy">Galaxy Spiral</div>
                                    <div class="animated-option" data-animation="fire">Fire Effect</div>
                                    <div class="animated-option" data-animation="code">Digital Rain</div>
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
                                <label>Pattern Type</label>
                                <div class="pattern-options">
                                    <div class="pattern-option" data-pattern="dots">Dots</div>
                                    <div class="pattern-option" data-pattern="grid">Grid</div>
                                    <div class="pattern-option" data-pattern="lines">Lines</div>
                                    <div class="pattern-option" data-pattern="hexagon">Hexagon</div>
                                    <div class="pattern-option" data-pattern="triangles">Triangles</div>
                                    <div class="pattern-option" data-pattern="waves">Waves</div>
                                    <div class="pattern-option" data-pattern="circuit">Circuit</div>
                                    <div class="pattern-option" data-pattern="maze">Maze</div>
                                    <div class="pattern-option" data-pattern="crosshatch">Crosshatch</div>
                                    <div class="pattern-option" data-pattern="chevron">Chevron</div>
                                    <div class="pattern-option" data-pattern="diamonds">Diamonds</div>
                                    <div class="pattern-option" data-pattern="scales">Scales</div>
                                    <div class="pattern-option" data-pattern="honeycomb">Honeycomb</div>
                                    <div class="pattern-option" data-pattern="weave">Weave</div>
                                    <div class="pattern-option" data-pattern="spiral">Spiral</div>
                                    <div class="pattern-option" data-pattern="mandala">Mandala</div>
                                    <div class="pattern-option" data-pattern="fractal">Fractal</div>
                                    <div class="pattern-option" data-pattern="noise">Perlin Noise</div>
                                </div>
                                
                                <div class="control-row">
                                    <div class="control-item">
                                        <label>Pattern Visibility</label>
                                        <div class="slider-container">
                                            <input type="range" id="pattern-visibility" min="0" max="100" value="30">
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
                                <div class="control-row">
                                    <div class="control-item">
                                        <label>Pattern Rotation</label>
                                        <div class="slider-container">
                                            <input type="range" id="pattern-rotation" min="0" max="360" value="0">
                                            <span class="slider-value">0°</span>
                                        </div>
                                    </div>
                                    <div class="control-item">
                                        <label>Pattern Complexity</label>
                                        <div class="slider-container">
                                            <input type="range" id="pattern-complexity" min="1" max="10" value="3">
                                            <span class="slider-value">3</span>
                                        </div>
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
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="pattern-3d">
                                        <span class="checkmark"></span>
                                        3D effect
                                    </label>
                                </div>
                            </div>

                            <!-- Media Settings -->
                            <div class="setting-group" id="media-settings" style="display: none;">
                                <label>Media Type</label>
                                <div class="media-type-selector">
                                    <div class="media-type active" data-media="video">
                                        <i class="fas fa-video"></i>
                                        <span>Video</span>
                                    </div>
                                    <div class="media-type" data-media="gif">
                                        <i class="fas fa-images"></i>
                                        <span>GIF</span>
                                    </div>
                                    <div class="media-type" data-media="youtube">
                                        <i class="fab fa-youtube"></i>
                                        <span>YouTube</span>
                                    </div>
                                </div>

                                <!-- Video Controls -->
                                <div id="video-controls" class="media-controls">
                                    <div class="control-item">
                                        <label>Video File or URL</label>
                                        <input type="text" id="video-url" placeholder="Enter video URL or select file" class="media-input">
                                        <input type="file" id="video-file" accept="video/*" style="display: none;">
                                        <button id="video-browse" class="browse-btn">Browse Files</button>
                                    </div>
                                </div>

                                <!-- GIF Controls -->
                                <div id="gif-controls" class="media-controls" style="display: none;">
                                    <div class="control-item">
                                        <label>GIF File or URL</label>
                                        <input type="text" id="gif-url" placeholder="Enter GIF URL or select file" class="media-input">
                                        <input type="file" id="gif-file" accept="image/gif" style="display: none;">
                                        <button id="gif-browse" class="browse-btn">Browse Files</button>
                                    </div>
                                </div>

                                <!-- YouTube Controls -->
                                <div id="youtube-controls" class="media-controls" style="display: none;">
                                    <div class="control-item">
                                        <label>YouTube URL</label>
                                        <input type="text" id="youtube-url" placeholder="https://www.youtube.com/watch?v=..." class="media-input">
                                        <div class="help-text">Paste any YouTube video URL here</div>
                                    </div>
                                </div>

                                <!-- Common Media Controls -->
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

                        <!-- Particles Section -->
                        <div class="settings-section" id="particles">
                            <div class="section-title">⭐ Advanced Particle System</div>
                            
                            <div class="setting-group">
                                <label class="checkbox-item">
                                    <input type="checkbox" id="particles-enabled" checked>
                                    <span class="checkmark"></span>
                                    Enable Particle System
                                </label>
                                <div style="display: flex; gap: 10px; margin-top: 10px;">
                                    <button id="test-particles" class="action-btn" style="flex: 1;">
                                        🧪 Test Simple Particles
                                    </button>
                                    <button id="test-advanced" class="action-btn" style="flex: 1;">
                                        🚀 Test Advanced System
                                    </button>
                                </div>
                            </div>

                            <div class="setting-group">
                                <label>Particle Count</label>
                                <div class="slider-container">
                                    <input type="range" id="particle-count" min="10" max="500" value="100" step="10">
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
                                        <span>Text Shape</span>
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
                                        <span>Constellation</span>
                                    </div>
                                    <div class="behavior-option" data-behavior="sphere">
                                        <i class="fas fa-globe"></i>
                                        <span>Sphere</span>
                                    </div>
                                    <div class="behavior-option" data-behavior="cube">
                                        <i class="fas fa-cube"></i>
                                        <span>Cube</span>
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
                                    <div class="behavior-option" data-behavior="vortex">
                                        <i class="fas fa-eye"></i>
                                        <span>Vortex</span>
                                    </div>
                                    <div class="behavior-option" data-behavior="pendulum">
                                        <i class="fas fa-clock"></i>
                                        <span>Pendulum</span>
                                    </div>
                                    <div class="behavior-option" data-behavior="swarm">
                                        <i class="fas fa-swarm"></i>
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
                                    <div class="behavior-option" data-behavior="plasma">
                                        <i class="fas fa-bolt"></i>
                                        <span>Plasma</span>
                                    </div>
                                    <div class="behavior-option" data-behavior="dna">
                                        <i class="fas fa-dna"></i>
                                        <span>DNA Helix</span>
                                    </div>
                                    <div class="behavior-option" data-behavior="matrix">
                                        <i class="fas fa-code"></i>
                                        <span>Matrix</span>
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
                                        <i class="fas fa-flower"></i>
                                        <span>Flower</span>
                                    </div>
                                    <div class="behavior-option" data-behavior="pulse">
                                        <i class="fas fa-heartbeat"></i>
                                        <span>Pulse</span>
                                    </div>
                                    <div class="behavior-option" data-behavior="web">
                                        <i class="fas fa-spider"></i>
                                        <span>Spider Web</span>
                                    </div>
                                    <div class="behavior-option" data-behavior="mouse-trail">
                                        <i class="fas fa-route"></i>
                                        <span>Mouse Trail</span>
                                    </div>
                                    <div class="behavior-option" data-behavior="mouse-repel">
                                        <i class="fas fa-expand-arrows-alt"></i>
                                        <span>Mouse Repel</span>
                                    </div>
                                    <div class="behavior-option" data-behavior="mouse-attract">
                                        <i class="fas fa-compress-arrows-alt"></i>
                                        <span>Mouse Attract</span>
                                    </div>
                                    <div class="behavior-option" data-behavior="mouse-orbit">
                                        <i class="fas fa-satellite"></i>
                                        <span>Mouse Orbit</span>
                                    </div>
                                    <div class="behavior-option" data-behavior="mouse-click">
                                        <i class="fas fa-hand-pointer"></i>
                                        <span>Click Effects</span>
                                    </div>
                                    <div class="behavior-option" data-behavior="mouse-gravity">
                                        <i class="fas fa-meteor"></i>
                                        <span>Mouse Gravity</span>
                                    </div>
                                    <div class="behavior-option" data-behavior="mouse-wind">
                                        <i class="fas fa-wind"></i>
                                        <span>Mouse Wind</span>
                                    </div>
                                    <div class="behavior-option" data-behavior="laser">
                                        <i class="fas fa-crosshairs"></i>
                                        <span>Laser Pointer</span>
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
                                <label>Mouse Interaction Settings</label>
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
                                <div class="particle-controls">
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
                                            </select>
                                        </div>
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
                                </div>
                            </div>
                        </div>

                        <!-- Interface Section -->
                        <div class="settings-section" id="interface">
                            <div class="section-title">🖥️ Interface Settings</div>
                            
                            <div class="setting-group">
                                <label>Font Settings</label>
                                <div class="font-controls">
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
                                </div>
                            </div>

                            <div class="setting-group">
                                <label>Icon Settings</label>
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
                            <div class="section-title">🔧 Advanced Settings</div>
                            
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
                                            Hardware acceleration
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div class="setting-group">
                                <label>Debug Options</label>
                                <div class="checkbox-group">
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="show-fps">
                                        <span class="checkmark"></span>
                                        Show FPS counter
                                    </label>
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="debug-mode">
                                        <span class="checkmark"></span>
                                        Debug mode
                                    </label>
                                </div>
                            </div>

                            <div class="setting-group">
                                <label>Actions</label>
                                <div class="action-buttons">
                                    <button class="action-btn" id="reset-settings">Reset to Defaults</button>
                                    <button class="action-btn" id="export-settings">Export Settings</button>
                                    <button class="action-btn" id="import-settings">Import Settings</button>
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

        console.log('🔧 Settings initialized successfully');
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

        // Media types
        this.windowElement.querySelectorAll('.media-type').forEach(type => {
            type.addEventListener('click', () => {
                this.setMediaType(type.dataset.media);
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
            });
        });

        // Color inputs
        this.windowElement.querySelectorAll('input[type="color"]').forEach(colorInput => {
            colorInput.addEventListener('input', (e) => {
                this.applySetting(colorInput.id, colorInput.value);
            });
        });

        // Action buttons
        this.windowElement.querySelector('#reset-settings').addEventListener('click', () => {
            this.resetSettings();
        });

        this.windowElement.querySelector('#export-settings').addEventListener('click', () => {
            this.exportSettings();
        });

        this.windowElement.querySelector('#import-settings').addEventListener('click', () => {
            this.importSettings();
        });

        // Media background controls
        const gifBrowse = this.windowElement.querySelector('#gif-browse');
        if (gifBrowse) {
            gifBrowse.addEventListener('click', () => {
                this.windowElement.querySelector('#gif-file').click();
            });
        }

        const gifFile = this.windowElement.querySelector('#gif-file');
        if (gifFile) {
            gifFile.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    const url = URL.createObjectURL(file);
                    this.windowElement.querySelector('#gif-url').value = url;
                    this.applySetting('gif-url', url);
                }
            });
        }

        const videoBrowse = this.windowElement.querySelector('#video-browse');
        if (videoBrowse) {
            videoBrowse.addEventListener('click', () => {
                this.windowElement.querySelector('#video-file').click();
            });
        }

        const videoFile = this.windowElement.querySelector('#video-file');
        if (videoFile) {
            videoFile.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    const url = URL.createObjectURL(file);
                    this.windowElement.querySelector('#video-url').value = url;
                    this.applySetting('video-url', url);
                }
            });
        }

        const gifUrl = this.windowElement.querySelector('#gif-url');
        if (gifUrl) {
            gifUrl.addEventListener('input', (e) => {
                this.applySetting('gif-url', e.target.value);
            });
        }

        const videoUrl = this.windowElement.querySelector('#video-url');
        if (videoUrl) {
            videoUrl.addEventListener('input', (e) => {
                this.applySetting('video-url', e.target.value);
            });
        }

        const youtubeUrl = this.windowElement.querySelector('#youtube-url');
        if (youtubeUrl) {
            youtubeUrl.addEventListener('input', (e) => {
                this.applySetting('youtube-url', e.target.value);
            });
        }

        // Text particle controls
        const particleText = this.windowElement.querySelector('#particle-text');
        if (particleText) {
            particleText.addEventListener('input', (e) => {
                this.applySetting('particle-text', e.target.value);
            });
        }

        // Test particles button
        const testParticles = this.windowElement.querySelector('#test-particles');
        if (testParticles) {
            testParticles.addEventListener('click', () => {
                console.log('🧪 Testing simple particles...');
                window.createTestParticles();
            });
        }

        // Test advanced particles button
        const testAdvanced = this.windowElement.querySelector('#test-advanced');
        if (testAdvanced) {
            testAdvanced.addEventListener('click', () => {
                console.log('🚀 Testing advanced particles...');
                window.testAdvancedParticles();
            });
        }
    }

    static setupAutoSave() {
        // Auto-save every 500ms after changes
        let saveTimeout;
        const autoSave = () => {
            clearTimeout(saveTimeout);
            saveTimeout = setTimeout(() => {
                this.saveSettings();
            }, 500);
        };

        // Monitor all form elements
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
        body.classList.remove('light-mode', 'dark-mode', 'cyber-mode', 'neon-mode', 'matrix-mode',
                             'synthwave-mode', 'ocean-mode', 'sunset-mode', 'forest-mode', 'royal-mode',
                             'fire-mode', 'ice-mode', 'space-mode', 'toxic-mode', 'pastel-mode');

        const schemes = {
            'dark': {
                class: 'dark-mode',
                colors: {
                    '--bg-primary': '#1a1a1a',
                    '--bg-secondary': '#0f0f0f',
                    '--text-primary': '#ffffff',
                    '--accent-color': '#00d4ff'
                }
            },
            'light': {
                class: 'light-mode',
                colors: {
                    '--bg-primary': '#ffffff',
                    '--bg-secondary': '#f8f9fa',
                    '--text-primary': '#333333',
                    '--accent-color': '#007bff'
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
            }
        };

        if (scheme === 'auto') {
            // Use system preference
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                scheme = 'dark';
            } else {
                scheme = 'light';
            }
        }

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

    static setMediaType(mediaType) {
        this.settings.mediaType = mediaType;

        // Update UI
        this.windowElement.querySelectorAll('.media-type').forEach(t => t.classList.remove('active'));
        this.windowElement.querySelector(`[data-media="${mediaType}"]`).classList.add('active');

        // Show/hide controls
        this.windowElement.querySelector('#video-controls').style.display = mediaType === 'video' ? 'block' : 'none';
        this.windowElement.querySelector('#gif-controls').style.display = mediaType === 'gif' ? 'block' : 'none';
        this.windowElement.querySelector('#youtube-controls').style.display = mediaType === 'youtube' ? 'block' : 'none';

        this.updateBackground();
        this.saveSettings();
    }

    static setAnimatedBackground(animation) {
        this.settings.backgroundAnimation = animation;
        if (this.backgroundSystem) {
            this.backgroundSystem.settings.backgroundAnimation = animation;
        }
        this.updateBackground();
        this.saveSettings();
    }

    static setPattern(pattern) {
        this.settings.backgroundPattern = pattern;
        this.updateBackground();
        this.saveSettings();
    }

    static setParticleBehavior(behavior) {
        this.settings.particleBehavior = behavior;

        // Show/hide text particle settings
        const textSettings = this.windowElement.querySelector('#text-particle-settings');
        if (textSettings) {
            textSettings.style.display = behavior === 'text' ? 'block' : 'none';
        }

        if (this.particleSystem) {
            this.particleSystem.setBehavior(behavior);
        }
        this.saveSettings();
    }

    static applySetting(settingId, value) {
        this.settings[settingId] = value;

        switch (settingId) {
            case 'window-transparency':
                const opacity = 1 - (value / 100);
                document.documentElement.style.setProperty('--window-opacity', opacity);
                // Apply to all windows
                document.querySelectorAll('.window').forEach(window => {
                    window.style.backgroundColor = `rgba(26, 26, 26, ${opacity})`;
                    window.style.backdropFilter = value > 0 ? `blur(${value/10}px)` : 'none';
                });
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
            case 'particles-enabled':
                console.log(`🎆 Particles ${value ? 'enabled' : 'disabled'}`);
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
                if (this.particleSystem) {
                    this.particleSystem.updateSettings(this.settings);
                }
                break;
            case 'gradient-start':
            case 'gradient-end':
            case 'gradient-angle':
            case 'animation-speed':
            case 'animation-intensity':
            case 'pattern-visibility':
            case 'pattern-size':
            case 'pattern-color':
            case 'pattern-color2':
            case 'pattern-rotation':
            case 'pattern-complexity':
            case 'pattern-animate':
            case 'pattern-glow':
            case 'pattern-3d':
                this.updateBackground();
                break;
            case 'gif-url':
            case 'video-url':
            case 'youtube-url':
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
            case 'debug-mode':
                document.body.classList.toggle('debug-mode', value);
                break;
        }
    }

    static updateSliderValue(slider) {
        const valueSpan = slider.parentElement.querySelector('.slider-value');
        if (valueSpan) {
            let value = slider.value;
            let suffix = '';

            if (slider.id.includes('opacity') || slider.id.includes('transparency') || slider.id.includes('visibility')) {
                suffix = '%';
            } else if (slider.id.includes('angle') || slider.id.includes('rotation')) {
                suffix = '°';
            } else if (slider.id.includes('size') && !slider.id.includes('font-size')) {
                suffix = 'px';
            } else if (slider.id === 'font-size' || slider.id.includes('font-size') || slider.id.includes('spacing')) {
                suffix = 'px';
            } else if (slider.id.includes('speed') || slider.id.includes('force') || slider.id.includes('intensity')) {
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

        // Destroy existing background system
        if (this.backgroundSystem) {
            this.backgroundSystem.destroy();
            this.backgroundSystem = null;
        }

        if (type === 'gradient') {
            const start = this.settings['gradient-start'] || '#667eea';
            const end = this.settings['gradient-end'] || '#764ba2';
            const angle = this.settings['gradient-angle'] || 135;

            this.wallpaperLayer.style.background = `linear-gradient(${angle}deg, ${start}, ${end})`;
        } else if (type === 'animated') {
            this.backgroundSystem = new BackgroundSystem(this.settings);
        } else if (type === 'pattern') {
            this.generatePattern();
        } else if (type === 'media') {
            this.setupMediaBackground();
        }
    }

    static setupMediaBackground() {
        const mediaType = this.settings.mediaType || 'video';
        const opacity = (this.settings['media-opacity'] || 50) / 100;
        const speed = this.settings['media-speed'] || 1;
        const loop = this.settings['media-loop'] !== false;
        const muted = this.settings['media-muted'] !== false;
        const blur = this.settings['media-blur'] || false;

        if (mediaType === 'video') {
            const videoUrl = this.settings['video-url'];
            if (videoUrl) {
                const video = document.createElement('video');
                video.style.cssText = `
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    opacity: ${opacity};
                    filter: ${blur ? 'blur(5px)' : 'none'};
                `;
                video.src = videoUrl;
                video.loop = loop;
                video.muted = muted;
                video.playbackRate = speed;
                video.autoplay = true;
                video.onerror = () => {
                    console.error('Failed to load video:', videoUrl);
                    this.wallpaperLayer.innerHTML = '<div style="color: #ff4444; text-align: center; padding: 50px;">Failed to load video</div>';
                };
                this.wallpaperLayer.appendChild(video);
            }
        } else if (mediaType === 'gif') {
            const gifUrl = this.settings['gif-url'];
            if (gifUrl) {
                const img = document.createElement('img');
                img.style.cssText = `
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    opacity: ${opacity};
                    filter: ${blur ? 'blur(5px)' : 'none'};
                `;
                img.src = gifUrl;
                img.onerror = () => {
                    console.error('Failed to load GIF:', gifUrl);
                    this.wallpaperLayer.innerHTML = '<div style="color: #ff4444; text-align: center; padding: 50px;">Failed to load GIF</div>';
                };
                this.wallpaperLayer.appendChild(img);
            }
        } else if (mediaType === 'youtube') {
            const youtubeUrl = this.settings['youtube-url'];
            if (youtubeUrl) {
                const videoId = this.extractYouTubeVideoId(youtubeUrl);
                if (videoId) {
                    const iframe = document.createElement('iframe');
                    iframe.style.cssText = `
                        width: 100%;
                        height: 100%;
                        border: none;
                        opacity: ${opacity};
                        filter: ${blur ? 'blur(5px)' : 'none'};
                    `;
                    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=${loop ? 1 : 0}&mute=${muted ? 1 : 0}&controls=0&playlist=${videoId}`;
                    iframe.allow = 'autoplay; encrypted-media';
                    this.wallpaperLayer.appendChild(iframe);
                }
            }
        }
    }

    static extractYouTubeVideoId(url) {
        const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    }

    static generatePattern() {
        if (!this.wallpaperLayer) {
            this.createWallpaperLayer();
        }

        const pattern = this.settings.backgroundPattern || 'dots';
        const opacity = (this.settings['pattern-visibility'] || 30) / 100;
        const size = this.settings['pattern-size'] || 20;
        const color = this.settings['pattern-color'] || this.settings.accentColor || '#00d4ff';
        const color2 = this.settings['pattern-color2'] || '#ff00ff';
        const rotation = this.settings['pattern-rotation'] || 0;
        const complexity = this.settings['pattern-complexity'] || 3;
        const animate = this.settings['pattern-animate'];
        const glow = this.settings['pattern-glow'];
        const effect3d = this.settings['pattern-3d'];

        let backgroundImage = '';
        let backgroundSize = `${size}px ${size}px`;

        // Apply rotation transform if needed
        this.wallpaperLayer.style.transform = rotation ? `rotate(${rotation}deg)` : 'none';

        switch (pattern) {
            case 'dots':
                backgroundImage = `radial-gradient(circle, ${color} ${complexity}px, transparent ${complexity}px)`;
                break;

            case 'grid':
                backgroundImage = `
                    linear-gradient(${color} ${complexity}px, transparent ${complexity}px), 
                    linear-gradient(90deg, ${color} ${complexity}px, transparent ${complexity}px)
                `;
                break;

            case 'lines':
                backgroundImage = `repeating-linear-gradient(45deg, ${color} 0px, ${color} ${complexity}px, transparent ${complexity}px, transparent ${size/4}px)`;
                break;

            case 'hexagon':
                backgroundImage = `
                    radial-gradient(circle at 25% 25%, ${color} ${complexity}px, transparent ${complexity}px),
                    radial-gradient(circle at 75% 75%, ${color} ${complexity}px, transparent ${complexity}px)
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
                        transparent ${size/(4*complexity)}px,
                        ${color} ${size/(4*complexity)}px,
                        ${color} ${size/(2*complexity)}px
                    )
                `;
                break;

            case 'circuit':
                backgroundImage = `
                    linear-gradient(90deg, ${color} ${complexity}px, transparent ${complexity}px),
                    linear-gradient(${color} ${complexity}px, transparent ${complexity}px),
                    linear-gradient(90deg, ${color2} ${complexity*2}px, transparent ${complexity*2}px),
                    linear-gradient(${color2} ${complexity*2}px, transparent ${complexity*2}px)
                `;
                backgroundSize = `${size}px ${size}px, ${size}px ${size}px, ${size*2}px ${size*2}px, ${size*2}px ${size*2}px`;
                break;

            case 'maze':
                backgroundImage = `
                    linear-gradient(90deg, ${color} ${complexity}px, transparent ${complexity}px),
                    linear-gradient(${color} ${complexity}px, transparent ${complexity}px),
                    linear-gradient(90deg, transparent ${size/2}px, ${color2} ${size/2}px, ${color2} ${size/2+complexity}px, transparent ${size/2+complexity}px)
                `;
                break;

            case 'crosshatch':
                backgroundImage = `
                    repeating-linear-gradient(45deg, ${color} 0px, ${color} ${complexity}px, transparent ${complexity}px, transparent ${size/3}px),
                    repeating-linear-gradient(-45deg, ${color} 0px, ${color} ${complexity}px, transparent ${complexity}px, transparent ${size/3}px)
                `;
                break;

            case 'chevron':
                backgroundImage = `
                    repeating-linear-gradient(60deg, ${color} 0px, ${color} ${complexity}px, transparent ${complexity}px, transparent ${size/2}px),
                    repeating-linear-gradient(120deg, ${color} 0px, ${color} ${complexity}px, transparent ${complexity}px, transparent ${size/2}px)
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
                    radial-gradient(circle at 100% 50%, transparent ${size/(3*complexity)}px, ${color} ${size/(3*complexity)}px, ${color} ${size/(2*complexity)}px, transparent ${size/(2*complexity)}px),
                    radial-gradient(circle at 0% 50%, transparent ${size/(3*complexity)}px, ${color} ${size/(3*complexity)}px, ${color} ${size/(2*complexity)}px, transparent ${size/(2*complexity)}px)
                `;
                backgroundSize = `${size}px ${size/2}px`;
                break;

            case 'honeycomb':
                backgroundImage = `
                    conic-gradient(from 0deg at 50% 50%, 
                        ${color} 0deg 60deg, 
                        transparent 60deg 120deg, 
                        ${color} 120deg 180deg, 
                        transparent 180deg 240deg, 
                        ${color} 240deg 300deg, 
                        transparent 300deg 360deg
                    )
                `;
                break;

            case 'weave':
                backgroundImage = `
                    linear-gradient(45deg, ${color} 0%, ${color} 25%, transparent 25%, transparent 75%, ${color} 75%),
                    linear-gradient(-45deg, ${color2} 0%, ${color2} 25%, transparent 25%, transparent 75%, ${color2} 75%)
                `;
                break;

            case 'spiral':
                backgroundImage = `
                    conic-gradient(from 0deg at 50% 50%, 
                        ${color} 0deg, transparent 90deg, 
                        ${color2} 180deg, transparent 270deg
                    )
                `;
                break;

            case 'mandala':
                backgroundImage = `
                    conic-gradient(from 0deg at 50% 50%, 
                        ${color} 0deg 10deg, transparent 10deg 20deg,
                        ${color} 20deg 30deg, transparent 30deg 40deg,
                        ${color} 40deg 50deg, transparent 50deg 60deg,
                        ${color} 60deg 70deg, transparent 70deg 80deg,
                        ${color} 80deg 90deg, transparent 90deg 100deg,
                        ${color} 100deg 110deg, transparent 110deg 120deg,
                        ${color} 120deg 130deg, transparent 130deg 140deg,
                        ${color} 140deg 150deg, transparent 150deg 160deg,
                        ${color} 160deg 170deg, transparent 170deg 180deg,
                        ${color} 180deg 190deg, transparent 190deg 200deg,
                        ${color} 200deg 210deg, transparent 210deg 220deg,
                        ${color} 220deg 230deg, transparent 230deg 240deg,
                        ${color} 240deg 250deg, transparent 250deg 260deg,
                        ${color} 260deg 270deg, transparent 270deg 280deg,
                        ${color} 280deg 290deg, transparent 290deg 300deg,
                        ${color} 300deg 310deg, transparent 310deg 320deg,
                        ${color} 320deg 330deg, transparent 330deg 340deg,
                        ${color} 340deg 350deg, transparent 350deg 360deg
                    )
                `;
                break;

            case 'fractal':
                // Simple fractal-like pattern using multiple radial gradients
                backgroundImage = `
                    radial-gradient(circle at 25% 25%, ${color} ${complexity}px, transparent ${complexity*2}px),
                    radial-gradient(circle at 75% 25%, ${color2} ${complexity}px, transparent ${complexity*2}px),
                    radial-gradient(circle at 25% 75%, ${color} ${complexity}px, transparent ${complexity*2}px),
                    radial-gradient(circle at 75% 75%, ${color2} ${complexity}px, transparent ${complexity*2}px),
                    radial-gradient(circle at 50% 50%, ${color} ${complexity*0.5}px, transparent ${complexity}px)
                `;
                break;

            case 'noise':
                // Simulated Perlin noise using multiple overlapping gradients
                backgroundImage = `
                    radial-gradient(ellipse at 20% 30%, ${color} 0%, transparent 50%),
                    radial-gradient(ellipse at 80% 20%, ${color2} 0%, transparent 50%),
                    radial-gradient(ellipse at 40% 70%, ${color} 0%, transparent 50%),
                    radial-gradient(ellipse at 90% 80%, ${color2} 0%, transparent 50%),
                    radial-gradient(ellipse at 10% 90%, ${color} 0%, transparent 50%)
                `;
                backgroundSize = `${size*complexity}px ${size*complexity}px`;
                break;
        }

        // Apply pattern to wallpaper layer
        this.wallpaperLayer.style.background = `rgba(0, 0, 0, ${1 - opacity})`;
        this.wallpaperLayer.style.backgroundImage = backgroundImage;
        this.wallpaperLayer.style.backgroundSize = backgroundSize;

        // Apply glow effect
        if (glow) {
            this.wallpaperLayer.style.filter = `drop-shadow(0 0 ${complexity*5}px ${color})`;
        }

        // Apply 3D effect
        if (effect3d) {
            this.wallpaperLayer.style.transform += ` perspective(1000px) rotateX(${complexity*5}deg)`;
        }

        // Add animation if enabled
        if (animate) {
            this.wallpaperLayer.style.animation = 'patternMove 10s linear infinite';

            // Add keyframes if not already added
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
        // Create wallpaper layer first
        this.createWallpaperLayer();

        // Initialize particle system if enabled
        if (this.settings['particles-enabled']) {
            this.initializeParticleSystem();
        }

        if (this.settings['show-fps']) {
            this.initializeFPSCounter();
        }

        // Apply background after systems are ready
        this.updateBackground();
    }

    static createWallpaperLayer() {
        // Remove existing wallpaper if any
        const existingWallpaper = document.getElementById('ember-wallpaper');
        if (existingWallpaper) {
            existingWallpaper.remove();
        }

        // Create wallpaper layer
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
        this.updateBackground();
    }

    static initializeParticleSystem() {
        console.log('🎆 initializeParticleSystem called');

        // Destroy any existing system
        if (this.particleSystem) {
            console.log('🗑️ Destroying existing particle system');
            this.destroyParticleSystem();
        }

        // Wait a moment to ensure cleanup
        setTimeout(() => {
            // Check if we have settings
            if (!this.settings) {
                console.error('❌ No settings available for particle system');
                this.settings = this.getDefaultSettings();
            }

            console.log('🎯 Creating particle system with settings:', {
                enabled: this.settings['particles-enabled'],
                count: this.settings['particle-count'],
                behavior: this.settings.particleBehavior,
                color: this.settings['particle-color']
            });

            try {
                this.particleSystem = new ParticleSystem(this.settings);
                console.log('✅ Particle system created successfully');
            } catch (error) {
                console.error('❌ Failed to create particle system:', error);
            }
        }, 100);
    }

    static destroyParticleSystem() {
        if (this.particleSystem) {
            this.particleSystem.destroy();
            this.particleSystem = null;
            console.log('🚫 Advanced particle system destroyed');
        }
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
                } else if (element.type === 'color') {
                    element.value = this.settings[key];
                } else if (element.type === 'text') {
                    element.value = this.settings[key] || '';
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
        if (this.settings.mediaType) {
            this.setMediaType(this.settings.mediaType);
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
        link.download = 'emberframe-settings.json';
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
            'blur-effects': true,
            'window-shadows': true,
            'smooth-animations': true,

            // Background
            backgroundType: 'gradient',
            'gradient-start': '#667eea',
            'gradient-end': '#764ba2',
            'gradient-angle': 135,
            backgroundAnimation: 'matrix',
            'animation-speed': 1,
            'animation-intensity': 1,
            mediaType: 'video',
            'video-url': '',
            'gif-url': '',
            'youtube-url': '',
            'media-opacity': 50,
            'media-speed': 1,
            'media-loop': true,
            'media-muted': true,
            'media-blur': false,
            backgroundPattern: 'dots',
            'pattern-visibility': 30,
            'pattern-size': 20,
            'pattern-color': '#00d4ff',
            'pattern-color2': '#ff00ff',
            'pattern-rotation': 0,
            'pattern-complexity': 3,
            'pattern-animate': false,
            'pattern-glow': false,
            'pattern-3d': false,

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

            // Interface
            'font-family': "'Segoe UI', sans-serif",
            'font-size': 14,
            'auto-hide-taskbar': false,
            'snap-windows': true,
            'show-clock': true,
            'icon-size': 48,
            'icon-spacing': 120,

            // Advanced
            'frame-rate': 60,
            'hardware-acceleration': true,
            'show-fps': false,
            'debug-mode': false
        };
    }

    static onClose() {
        // Save settings but keep systems running
        this.saveSettings();

        // Don't destroy systems - let them persist
        // this.destroyParticleSystem();
        // this.destroyBackgroundSystem();
        // this.destroyFPSCounter();

        // Keep wallpaper layer active
        // if (this.wallpaperLayer) {
        //     this.wallpaperLayer.remove();
        //     this.wallpaperLayer = null;
        // }

        console.log('🔧 Settings saved and systems kept running');
    }

    // Method to apply saved settings on startup
    static applyStartupSettings() {
        const settings = this.loadSettings();
        console.log('🚀 Applying startup settings:', settings);

        // Set settings first before initializing systems
        this.settings = settings;

        // Apply all visual settings immediately
        this.setColorScheme(settings.colorScheme);
        this.setAccentColor(settings.accentColor);

        // Apply window transparency
        const opacity = 1 - (settings['window-transparency'] / 100);
        document.querySelectorAll('.window').forEach(window => {
            window.style.backgroundColor = `rgba(26, 26, 26, ${opacity})`;
            window.style.backdropFilter = settings['window-transparency'] > 0 ? `blur(${settings['window-transparency']/10}px)` : 'none';
        });

        // Apply other visual effects
        if (!settings['blur-effects']) {
            document.body.classList.add('no-blur');
        }

        if (settings['window-shadows']) {
            document.documentElement.style.setProperty('--window-shadow', '0 10px 30px rgba(0,0,0,0.3)');
        }

        // Initialize systems with settings already available (particle system only)
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
                    max-height: 180px;
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

                .color-schemes::-webkit-scrollbar-thumb:hover {
                    background: rgba(0, 212, 255, 0.8);
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

                .scheme-preview.dark {
                    background: linear-gradient(45deg, #1a1a1a, #2d2d2d);
                }

                .scheme-preview.light {
                    background: linear-gradient(45deg, #ffffff, #f0f0f0);
                }

                .scheme-preview.auto {
                    background: linear-gradient(45deg, #1a1a1a 50%, #ffffff 50%);
                }

                .scheme-preview.cyber {
                    background: linear-gradient(45deg, #00d4ff, #ff00ff);
                }

                .scheme-preview.neon {
                    background: linear-gradient(45deg, #00ffff, #ff0080);
                }

                .scheme-preview.matrix {
                    background: linear-gradient(45deg, #000000, #00ff00);
                }

                .scheme-preview.synthwave {
                    background: linear-gradient(45deg, #2d1b69, #ff6b6b);
                }

                .scheme-preview.ocean {
                    background: linear-gradient(45deg, #0f3460, #87ceeb);
                }

                .scheme-preview.sunset {
                    background: linear-gradient(45deg, #ff6347, #ffd700);
                }

                .scheme-preview.forest {
                    background: linear-gradient(45deg, #1a2e1a, #90ee90);
                }

                .scheme-preview.royal {
                    background: linear-gradient(45deg, #1a0d33, #daa520);
                }

                .scheme-preview.fire {
                    background: linear-gradient(45deg, #2d0a0a, #ff4500);
                }

                .scheme-preview.ice {
                    background: linear-gradient(45deg, #0a1a2d, #b0e0e6);
                }

                .scheme-preview.space {
                    background: linear-gradient(45deg, #0c0c1e, #9370db);
                }

                .scheme-preview.toxic {
                    background: linear-gradient(45deg, #1a2d0a, #adff2f);
                }

                .scheme-preview.pastel {
                    background: linear-gradient(45deg, #f5f5f5, #ff91a4);
                }

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

                /* Media Type Selector */
                .media-type-selector {
                    display: flex;
                    gap: 10px;
                    margin-bottom: 20px;
                }

                .media-type {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 5px;
                    padding: 15px 20px;
                    border: 2px solid rgba(255, 255, 255, 0.2);
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    flex: 1;
                }

                .media-type:hover {
                    border-color: var(--accent-color, #00d4ff);
                }

                .media-type.active {
                    border-color: var(--accent-color, #00d4ff);
                    background: rgba(0, 212, 255, 0.2);
                }

                .media-type i {
                    font-size: 24px;
                    color: var(--accent-color, #00d4ff);
                }

                /* Gradient Controls */
                .gradient-controls {
                    display: flex;
                    gap: 20px;
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
                    max-height: 200px;
                    overflow-y: auto;
                }

                /* Scrollbar styling */
                .particle-behaviors::-webkit-scrollbar,
                .animated-options::-webkit-scrollbar,
                .pattern-options::-webkit-scrollbar {
                    width: 6px;
                }

                .particle-behaviors::-webkit-scrollbar-track,
                .animated-options::-webkit-scrollbar-track,
                .pattern-options::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 3px;
                }

                .particle-behaviors::-webkit-scrollbar-thumb,
                .animated-options::-webkit-scrollbar-thumb,
                .pattern-options::-webkit-scrollbar-thumb {
                    background: var(--accent-color, #00d4ff);
                    border-radius: 3px;
                }

                .particle-behaviors::-webkit-scrollbar-thumb:hover,
                .animated-options::-webkit-scrollbar-thumb:hover,
                .pattern-options::-webkit-scrollbar-thumb:hover {
                    background: rgba(0, 212, 255, 0.8);
                }

                .animated-option,
                .pattern-option,
                .behavior-option {
                    padding: 12px;
                    text-align: center;
                    border: 2px solid rgba(255, 255, 255, 0.2);
                    border-radius: 6px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-size: 12px;
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

                .behavior-option {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 4px;
                    padding: 10px 8px;
                    font-size: 10px;
                }

                .behavior-option i {
                    font-size: 16px;
                    color: var(--accent-color, #00d4ff);
                }

                /* Media Controls */
                .media-controls,
                .particle-controls,
                .font-controls {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }

                .media-input,
                .text-input {
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

                .help-text {
                    font-size: 12px;
                    color: rgba(255, 255, 255, 0.6);
                    margin-top: 5px;
                    font-style: italic;
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
                    --accent-color: #ff00ff;
                }

                body.neon-mode {
                    --bg-primary: #0d0d0d;
                    --bg-secondary: #1a1a1a;
                    --text-primary: #00ffff;
                    --accent-color: #ff0080;
                }

                body.matrix-mode {
                    --bg-primary: #000000;
                    --bg-secondary: #001100;
                    --text-primary: #00ff00;
                    --accent-color: #00aa00;
                }

                body.synthwave-mode {
                    --bg-primary: #2d1b69;
                    --bg-secondary: #1a0f3d;
                    --text-primary: #ff6b6b;
                    --accent-color: #feca57;
                }

                body.ocean-mode {
                    --bg-primary: #0f3460;
                    --bg-secondary: #16537e;
                    --text-primary: #87ceeb;
                    --accent-color: #00bfff;
                }

                body.sunset-mode {
                    --bg-primary: #2c1810;
                    --bg-secondary: #3d2418;
                    --text-primary: #ffd700;
                    --accent-color: #ff6347;
                }

                body.forest-mode {
                    --bg-primary: #1a2e1a;
                    --bg-secondary: #0f1f0f;
                    --text-primary: #90ee90;
                    --accent-color: #32cd32;
                }

                body.royal-mode {
                    --bg-primary: #1a0d33;
                    --bg-secondary: #2d1b4e;
                    --text-primary: #daa520;
                    --accent-color: #9932cc;
                }

                body.fire-mode {
                    --bg-primary: #2d0a0a;
                    --bg-secondary: #1a0000;
                    --text-primary: #ff4500;
                    --accent-color: #dc143c;
                }

                body.ice-mode {
                    --bg-primary: #0a1a2d;
                    --bg-secondary: #041426;
                    --text-primary: #b0e0e6;
                    --accent-color: #00ffff;
                }

                body.space-mode {
                    --bg-primary: #0c0c1e;
                    --bg-secondary: #1a1a3a;
                    --text-primary: #e6e6fa;
                    --accent-color: #9370db;
                }

                body.toxic-mode {
                    --bg-primary: #1a2d0a;
                    --bg-secondary: #0f1f00;
                    --text-primary: #adff2f;
                    --accent-color: #7fff00;
                }

                body.pastel-mode {
                    --bg-primary: #f5f5f5;
                    --bg-secondary: #e8e8e8;
                    --text-primary: #333333;
                    --accent-color: #ff91a4;
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
                }
            </style>
        `;
    }
}

// Enhanced Particle System
class ParticleSystem {
    constructor(settings) {
        console.log('🔥 ParticleSystem constructor started');
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

        console.log('🔧 Particle settings:', this.settings);
        this.init();
    }

    init() {
        console.log('🚀 ParticleSystem.init() starting...');

        try {
            this.createCanvas();
            this.setupEventListeners();
            this.createParticles();
            this.startAnimation();
            console.log('✅ ParticleSystem initialized successfully');
        } catch (error) {
            console.error('❌ ParticleSystem initialization failed:', error);
        }
    }

    startAnimation() {
        if (this.isRunning) {
            console.log('⚠️ Animation already running');
            return;
        }

        this.isRunning = true;
        console.log('🎬 Starting particle animation');
        this.animate();
    }

    stopAnimation() {
        this.isRunning = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        console.log('⏹️ Particle animation stopped');
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

            // Create click burst if enabled
            if (this.settings['mouse-click-burst']) {
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
        const count = parseInt(this.settings['particle-count']) || 100;

        console.log(`🎯 Creating ${count} particles...`);

        for (let i = 0; i < count; i++) {
            const particle = {
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                angle: Math.random() * Math.PI * 2,
                speed: Math.random() * 2 + 0.5,
                life: Math.random() * 100,
                maxLife: Math.random() * 100 + 50,