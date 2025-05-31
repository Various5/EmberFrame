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
                                        <i class="fas fa-film"></i>
                                        <span>Animated</span>
                                    </div>
                                    <div class="bg-type" data-type="pattern">
                                        <i class="fas fa-th"></i>
                                        <span>Pattern</span>
                                    </div>
                                    <div class="bg-type" data-type="video">
                                        <i class="fas fa-video"></i>
                                        <span>Video</span>
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

                            <!-- Video Settings -->
                            <div class="setting-group" id="video-settings" style="display: none;">
                                <label>Video Background</label>
                                <div class="video-controls">
                                    <div class="control-item">
                                        <label>Video URL or File</label>
                                        <input type="text" id="video-url" placeholder="Enter video URL or upload file" class="video-input">
                                        <input type="file" id="video-file" accept="video/*" style="display: none;">
                                        <button id="video-browse" class="browse-btn">Browse Files</button>
                                    </div>
                                    <div class="control-row">
                                        <div class="control-item">
                                            <label>Video Opacity</label>
                                            <div class="slider-container">
                                                <input type="range" id="video-opacity" min="10" max="100" value="50">
                                                <span class="slider-value">50%</span>
                                            </div>
                                        </div>
                                        <div class="control-item">
                                            <label>Playback Speed</label>
                                            <div class="slider-container">
                                                <input type="range" id="video-speed" min="0.25" max="2" value="1" step="0.25">
                                                <span class="slider-value">1x</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="checkbox-group">
                                        <label class="checkbox-item">
                                            <input type="checkbox" id="video-loop" checked>
                                            <span class="checkmark"></span>
                                            Loop video
                                        </label>
                                        <label class="checkbox-item">
                                            <input type="checkbox" id="video-muted" checked>
                                            <span class="checkmark"></span>
                                            Mute audio
                                        </label>
                                        <label class="checkbox-item">
                                            <input type="checkbox" id="video-blur">
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
                                <label class="checkbox-item">
                                    <input type="checkbox" id="particles-enabled" checked>
                                    <span class="checkmark"></span>
                                    Enable Particle System
                                </label>
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

        // Video background controls
        this.windowElement.querySelector('#video-browse').addEventListener('click', () => {
            this.windowElement.querySelector('#video-file').click();
        });

        this.windowElement.querySelector('#video-file').addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const url = URL.createObjectURL(file);
                this.windowElement.querySelector('#video-url').value = url;
                this.applySetting('video-url', url);
            }
        });

        this.windowElement.querySelector('#video-url').addEventListener('input', (e) => {
            this.applySetting('video-url', e.target.value);
        });
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
        this.windowElement.querySelector('#video-settings').style.display = type === 'video' ? 'block' : 'none';

        this.updateBackground();
        this.saveSettings();
    }

    static setAnimatedBackground(animation) {
        this.settings.backgroundAnimation = animation;
        this.initializeBackgroundSystem();
        this.saveSettings();
    }

    static setPattern(pattern) {
        this.settings.backgroundPattern = pattern;
        this.updateBackground();
        this.saveSettings();
    }

    static setParticleBehavior(behavior) {
        this.settings.particleBehavior = behavior;
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
            case 'video-url':
            case 'video-opacity':
            case 'video-speed':
            case 'video-loop':
            case 'video-muted':
            case 'video-blur':
                if (this.settings.backgroundType === 'video') {
                    this.updateBackground();
                }
                break;
            case 'animation-speed':
            case 'animation-intensity':
                if (this.backgroundSystem) {
                    this.backgroundSystem.settings = this.settings;
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
            const start = this.settings['gradient-start'] || '#667eea';
            const end = this.settings['gradient-end'] || '#764ba2';
            const angle = this.settings['gradient-angle'] || 135;

            this.wallpaperLayer.style.background = `linear-gradient(${angle}deg, ${start}, ${end})`;
        } else if (type === 'pattern') {
            this.generatePattern();
        } else if (type === 'video') {
            this.setupVideoBackground();
        }
    }

    static setupVideoBackground() {
        const videoUrl = this.settings['video-url'];
        const opacity = (this.settings['video-opacity'] || 50) / 100;
        const speed = this.settings['video-speed'] || 1;
        const loop = this.settings['video-loop'] !== false;
        const muted = this.settings['video-muted'] !== false;
        const blur = this.settings['video-blur'] || false;

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
            video.autoplay = true;
            video.playbackRate = speed;

            // Handle video load errors
            video.onerror = () => {
                console.error('Failed to load video:', videoUrl);
                this.wallpaperLayer.innerHTML = '<div style="color: #ff4444; text-align: center; padding: 50px;">Failed to load video</div>';
            };

            this.wallpaperLayer.appendChild(video);
            this.currentVideo = video;
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
                    linear-gradient(90deg, ${color} 2px, transparent 2px),
                    linear-gradient(${color} 2px, transparent 2px)
                `;
                backgroundSize = `${size}px ${size}px, ${size}px ${size}px, ${size*2}px ${size*2}px, ${size*2}px ${size*2}px`;
                break;

            case 'maze':
                backgroundImage = `
                    linear-gradient(90deg, ${color} 2px, transparent 2px),
                    linear-gradient(${color} 2px, transparent 2px),
                    linear-gradient(90deg, transparent ${size/2}px, ${color} ${size/2}px, ${color} ${size/2+2}px, transparent ${size/2+2}px)
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
                    repeating-linear-gradient(120deg, ${color} 0px, ${color} 1px, transparent 1px, transparent ${size/2}px)
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
                    radial-gradient(circle at 0% 50%, transparent ${size/3}px, ${color} ${size/3}px, ${color} ${size/2}px, transparent ${size/2}px)
                `;
                backgroundSize = `${size}px ${size/2}px`;
                break;
        }

        // Apply pattern to wallpaper layer
        this.wallpaperLayer.style.background = `rgba(0, 0, 0, ${1 - opacity})`;
        this.wallpaperLayer.style.backgroundImage = backgroundImage;
        this.wallpaperLayer.style.backgroundSize = backgroundSize;

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
        // Create wallpaper layer
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
        // Only destroy if already exists to avoid conflicts
        if (this.particleSystem) {
            this.destroyParticleSystem();
        }

        // Create new particle system with current settings
        this.particleSystem = new ParticleSystem(this.settings);
        console.log('🎆 Advanced particle system initialized');
    }

    static destroyParticleSystem() {
        if (this.particleSystem) {
            this.particleSystem.destroy();
            this.particleSystem = null;
            console.log('🚫 Advanced particle system destroyed');
        }
    }

    static initializeBackgroundSystem() {
        // Only destroy if already exists
        if (this.backgroundSystem) {
            this.destroyBackgroundSystem();
        }

        // Create new background system
        this.backgroundSystem = new BackgroundSystem(this.settings);
        console.log('🎬 Animated background system initialized');
    }

    static destroyBackgroundSystem() {
        if (this.backgroundSystem) {
            this.backgroundSystem.destroy();
            this.backgroundSystem = null;
            console.log('🚫 Animated background system destroyed');
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
            'video-url': '',
            'video-opacity': 50,
            'video-speed': 1,
            'video-loop': true,
            'video-muted': true,
            'video-blur': false,

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

        // Initialize background systems
        this.createWallpaperLayer();
        this.settings = settings;

        if (settings['particles-enabled']) {
            this.initializeParticleSystem();
        }

        if (settings.backgroundType === 'animated') {
            this.initializeBackgroundSystem();
        }

        this.updateBackground();

        console.log('🚀 Startup settings applied');
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
                .particle-behaviors::-webkit-scrollbar {
                    width: 6px;
                }

                .particle-behaviors::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 3px;
                }

                .particle-behaviors::-webkit-scrollbar-thumb {
                    background: var(--accent-color, #00d4ff);
                    border-radius: 3px;
                }

                .particle-behaviors::-webkit-scrollbar-thumb:hover {
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

                /* Video Controls */
                .video-controls {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }

                .video-input {
                    width: 100%;
                    padding: 8px 12px;
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    border-radius: 6px;
                    color: white;
                    outline: none;
                    margin-bottom: 10px;
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

                /* Controls */
                .particle-controls,
                .font-controls {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }

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
        this.settings = settings;
        this.particles = [];
        this.canvas = null;
        this.ctx = null;
        this.animationId = null;
        this.mouse = {
            x: 0,
            y: 0,
            lastX: 0,
            lastY: 0,
            vx: 0,
            vy: 0,
            clicked: false,
            clickX: 0,
            clickY: 0
        };
        this.clickParticles = [];

        this.init();
    }

    init() {
        this.createCanvas();
        this.setupEventListeners();
        this.createParticles();
        this.animate();
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

        for (let i = 0; i < count; i++) {
            this.particles.push({
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
                trail: []
            });
        }
    }

    setBehavior(behavior) {
        this.settings.particleBehavior = behavior;
        console.log(`🎯 Particle behavior changed to: ${behavior}`);

        if (behavior === 'sphere' || behavior === 'cube') {
            this.arrangeIn3D();
        }

        // Log mouse settings for debugging
        if (behavior.includes('mouse')) {
            console.log(`🖱️ Mouse settings - Force: ${this.settings['mouse-force']}, Range: ${this.settings['mouse-range']}`);
        }
    }

    arrangeIn3D() {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const radius = Math.min(this.canvas.width, this.canvas.height) / 4;

        this.particles.forEach((particle, i) => {
            if (this.settings.particleBehavior === 'sphere') {
                const phi = Math.acos(-1 + (2 * i) / this.particles.length);
                const theta = Math.sqrt(this.particles.length * Math.PI) * phi;

                particle.x = centerX + radius * Math.cos(theta) * Math.sin(phi);
                particle.y = centerY + radius * Math.sin(theta) * Math.sin(phi);
                particle.z = radius * Math.cos(phi);
            } else if (this.settings.particleBehavior === 'cube') {
                const side = Math.cbrt(this.particles.length);
                const x = (i % side) - side / 2;
                const y = Math.floor((i / side) % side) - side / 2;
                const z = Math.floor(i / (side * side)) - side / 2;

                particle.x = centerX + x * 20;
                particle.y = centerY + y * 20;
                particle.z = z * 20;
            }
        });
    }

    updateParticles() {
        const behavior = this.settings.particleBehavior || 'float';
        const speed = parseFloat(this.settings['particle-speed']) || 1;
        const trails = this.settings['particle-trails'];

        this.particles.forEach((particle, index) => {
            // Update trail
            if (trails) {
                particle.trail.push({ x: particle.x, y: particle.y });
                if (particle.trail.length > 10) {
                    particle.trail.shift();
                }
            }

            switch (behavior) {
                case 'float':
                    particle.x += particle.vx * speed;
                    particle.y += particle.vy * speed;
                    break;

                case 'follow':
                    const fdx = this.mouse.x - particle.x;
                    const fdy = this.mouse.y - particle.y;
                    particle.vx += fdx * 0.0002 * speed;
                    particle.vy += fdy * 0.0002 * speed;
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
                        particle.vx -= ddx * 0.002 * speed;
                        particle.vy -= ddy * 0.002 * speed;
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
                    this.particles.forEach((other, oi) => {
                        if (index !== oi) {
                            const dx = other.x - particle.x;
                            const dy = other.y - particle.y;
                            const d = Math.sqrt(dx * dx + dy * dy);
                            if (d < 100 && d > 0) {
                                particle.vx += dx * 0.00005 * speed;
                                particle.vy += dy * 0.00005 * speed;
                            }
                        }
                    });
                    particle.x += particle.vx;
                    particle.y += particle.vy;
                    particle.vx *= 0.99;
                    particle.vy *= 0.99;
                    break;

                case 'spiral':
                    const scx = this.canvas.width / 2;
                    const scy = this.canvas.height / 2;
                    particle.angle += 0.03 * speed;
                    const spiralRadius = (particle.angle * 3) % 200;
                    particle.x = scx + Math.cos(particle.angle) * spiralRadius;
                    particle.y = scy + Math.sin(particle.angle) * spiralRadius;
                    break;

                case 'wave':
                    particle.phase += 0.05 * speed;
                    particle.x += particle.vx * speed;
                    particle.y = particle.originalY + Math.sin(particle.phase + particle.x * 0.01) * 50;
                    if (!particle.originalY) particle.originalY = particle.y;
                    break;

                case 'fireworks':
                    particle.life += speed;
                    if (particle.life > particle.maxLife) {
                        particle.x = Math.random() * this.canvas.width;
                        particle.y = this.canvas.height;
                        particle.vx = (Math.random() - 0.5) * 10;
                        particle.vy = -Math.random() * 10 - 5;
                        particle.life = 0;
                    }
                    particle.x += particle.vx;
                    particle.y += particle.vy;
                    particle.vy += 0.2; // gravity
                    break;

                case 'constellation':
                    particle.x += particle.vx * 0.5 * speed;
                    particle.y += particle.vy * 0.5 * speed;
                    break;

                case 'tornado':
                    const tcx = this.canvas.width / 2;
                    const tcy = this.canvas.height / 2;
                    particle.angle += 0.05 * speed;
                    const tornadoRadius = Math.abs(Math.sin(particle.angle * 0.5)) * 150;
                    particle.x = tcx + Math.cos(particle.angle) * tornadoRadius;
                    particle.y = tcy + Math.sin(particle.angle * 2) * 100 + particle.angle * 2;
                    if (particle.y > this.canvas.height) {
                        particle.angle = 0;
                    }
                    break;

                case 'bounce':
                    particle.x += particle.vx * speed;
                    particle.y += particle.vy * speed;
                    if (particle.x <= 0 || particle.x >= this.canvas.width) particle.vx *= -1;
                    if (particle.y <= 0 || particle.y >= this.canvas.height) particle.vy *= -1;
                    break;

                case 'gravity':
                    particle.x += particle.vx * speed;
                    particle.y += particle.vy * speed;
                    particle.vy += 0.1 * speed; // gravity
                    if (particle.y > this.canvas.height) {
                        particle.y = 0;
                        particle.x = Math.random() * this.canvas.width;
                        particle.vy = Math.random() * 2;
                    }
                    break;

                case 'explosion':
                    particle.life += speed;
                    if (particle.life > particle.maxLife) {
                        particle.x = this.canvas.width / 2;
                        particle.y = this.canvas.height / 2;
                        const angle = Math.random() * Math.PI * 2;
                        particle.vx = Math.cos(angle) * (Math.random() * 5 + 2);
                        particle.vy = Math.sin(angle) * (Math.random() * 5 + 2);
                        particle.life = 0;
                    }
                    particle.x += particle.vx;
                    particle.y += particle.vy;
                    particle.vx *= 0.98;
                    particle.vy *= 0.98;
                    break;

                case 'vortex':
                    const vx = this.canvas.width / 2;
                    const vy = this.canvas.height / 2;
                    const vdx = vx - particle.x;
                    const vdy = vy - particle.y;
                    const vdist = Math.sqrt(vdx * vdx + vdy * vdy);
                    const vangle = Math.atan2(vdy, vdx);
                    particle.x += Math.cos(vangle + Math.PI/2) * speed * 2;
                    particle.y += Math.sin(vangle + Math.PI/2) * speed * 2;
                    if (vdist > 5) {
                        particle.x += vdx * 0.01 * speed;
                        particle.y += vdy * 0.01 * speed;
                    }
                    break;

                case 'pendulum':
                    const px = this.canvas.width / 2;
                    const py = 50;
                    particle.angle += particle.speed * 0.02 * speed;
                    particle.x = px + Math.sin(particle.angle) * particle.radius;
                    particle.y = py + Math.cos(particle.angle) * particle.radius;
                    break;

                case 'swarm':
                    // Boid-like behavior
                    let avgX = 0, avgY = 0, count = 0;
                    let sepX = 0, sepY = 0;
                    this.particles.forEach((other, oi) => {
                        if (index !== oi) {
                            const dx = other.x - particle.x;
                            const dy = other.y - particle.y;
                            const d = Math.sqrt(dx * dx + dy * dy);
                            if (d < 50) {
                                avgX += other.x; avgY += other.y; count++;
                                if (d < 25) {
                                    sepX -= dx; sepY -= dy;
                                }
                            }
                        }
                    });
                    if (count > 0) {
                        avgX /= count; avgY /= count;
                        particle.vx += (avgX - particle.x) * 0.0001 * speed;
                        particle.vy += (avgY - particle.y) * 0.0001 * speed;
                    }
                    particle.vx += sepX * 0.01 * speed;
                    particle.vy += sepY * 0.01 * speed;
                    particle.x += particle.vx;
                    particle.y += particle.vy;
                    particle.vx *= 0.99;
                    particle.vy *= 0.99;
                    break;

                case 'rain':
                    particle.y += particle.speed * 5 * speed;
                    particle.x += Math.sin(particle.phase) * 0.5;
                    particle.phase += 0.1;
                    if (particle.y > this.canvas.height) {
                        particle.y = -10;
                        particle.x = Math.random() * this.canvas.width;
                    }
                    break;

                case 'snow':
                    particle.y += particle.speed * 2 * speed;
                    particle.x += Math.sin(particle.phase) * 1;
                    particle.phase += 0.05;
                    if (particle.y > this.canvas.height) {
                        particle.y = -10;
                        particle.x = Math.random() * this.canvas.width;
                    }
                    break;

                case 'plasma':
                    particle.x += Math.sin(particle.phase) * 2 * speed;
                    particle.y += Math.cos(particle.phase * 1.3) * 2 * speed;
                    particle.phase += 0.05 * speed;
                    break;

                case 'dna':
                    const dnaCenter = this.canvas.width / 2;
                    particle.angle += 0.02 * speed;
                    const helixRadius = 100;
                    particle.x = dnaCenter + Math.cos(particle.angle + index * 0.5) * helixRadius;
                    particle.y = (particle.angle * 50) % this.canvas.height;
                    if (particle.y > this.canvas.height) particle.angle = 0;
                    break;

                case 'matrix':
                    particle.y += particle.speed * 3 * speed;
                    if (particle.y > this.canvas.height) {
                        particle.y = -10;
                        particle.x = Math.floor(Math.random() * (this.canvas.width / 20)) * 20;
                    }
                    break;

                case 'galaxy':
                    const gx = this.canvas.width / 2;
                    const gy = this.canvas.height / 2;
                    particle.angle += 0.01 * speed * (1 + particle.radius / 200);
                    particle.x = gx + Math.cos(particle.angle) * particle.radius;
                    particle.y = gy + Math.sin(particle.angle) * particle.radius * 0.3;
                    break;

                case 'heart':
                    const hx = this.canvas.width / 2;
                    const hy = this.canvas.height / 2;
                    particle.angle += 0.02 * speed;
                    const t = particle.angle;
                    const heartScale = 5;
                    particle.x = hx + heartScale * (16 * Math.pow(Math.sin(t), 3));
                    particle.y = hy - heartScale * (13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
                    break;

                case 'flower':
                    const fx = this.canvas.width / 2;
                    const fy = this.canvas.height / 2;
                    particle.angle += 0.02 * speed;
                    const petalCount = 8;
                    const flowerRadius = 100 * (1 + 0.5 * Math.sin(petalCount * particle.angle));
                    particle.x = fx + Math.cos(particle.angle) * flowerRadius;
                    particle.y = fy + Math.sin(particle.angle) * flowerRadius;
                    break;

                case 'pulse':
                    const pulseCenter = { x: this.canvas.width / 2, y: this.canvas.height / 2 };
                    const pulseDist = Math.sqrt((particle.x - pulseCenter.x) ** 2 + (particle.y - pulseCenter.y) ** 2);
                    const pulseForce = Math.sin(Date.now() * 0.005) * 0.5;
                    const pulseAngle = Math.atan2(particle.y - pulseCenter.y, particle.x - pulseCenter.x);
                    particle.x += Math.cos(pulseAngle) * pulseForce * speed;
                    particle.y += Math.sin(pulseAngle) * pulseForce * speed;
                    break;

                case 'web':
                    // Create web-like structure
                    const webCenter = { x: this.canvas.width / 2, y: this.canvas.height / 2 };
                    const webAngle = Math.atan2(particle.y - webCenter.y, particle.x - webCenter.x);
                    const webDist = Math.sqrt((particle.x - webCenter.x) ** 2 + (particle.y - webCenter.y) ** 2);

                    // Snap to web lines
                    const webLines = 8;
                    const snapAngle = Math.round(webAngle / (Math.PI * 2 / webLines)) * (Math.PI * 2 / webLines);
                    const targetX = webCenter.x + Math.cos(snapAngle) * webDist;
                    const targetY = webCenter.y + Math.sin(snapAngle) * webDist;

                    particle.x += (targetX - particle.x) * 0.1 * speed;
                    particle.y += (targetY - particle.y) * 0.1 * speed;
                    break;

                case 'mouse-trail':
                    // Follow mouse with trail delay
                    const trailDelay = index * 0.02;
                    const targetMouseX = this.mouse.x + Math.sin(Date.now() * 0.001 + index) * 20;
                    const targetMouseY = this.mouse.y + Math.cos(Date.now() * 0.001 + index) * 20;
                    particle.x += (targetMouseX - particle.x) * (0.1 - trailDelay) * speed;
                    particle.y += (targetMouseY - particle.y) * (0.1 - trailDelay) * speed;
                    break;

                case 'mouse-repel':
                    const repelRange = this.settings['mouse-range'] || 100;
                    const repelForce = this.settings['mouse-force'] || 1;
                    const rdx = this.mouse.x - particle.x;
                    const rdy = this.mouse.y - particle.y;
                    const rdist = Math.sqrt(rdx * rdx + rdy * rdy);
                    if (rdist < repelRange) {
                        const force = (repelRange - rdist) / repelRange * repelForce * 2;
                        particle.vx -= (rdx / rdist) * force;
                        particle.vy -= (rdy / rdist) * force;
                    }
                    particle.x += particle.vx * speed;
                    particle.y += particle.vy * speed;
                    particle.vx *= 0.95;
                    particle.vy *= 0.95;
                    break;

                case 'mouse-attract':
                    const attractRange = this.settings['mouse-range'] || 100;
                    const attractForce = this.settings['mouse-force'] || 1;
                    const adx = this.mouse.x - particle.x;
                    const ady = this.mouse.y - particle.y;
                    const adist = Math.sqrt(adx * adx + ady * ady);
                    if (adist < attractRange && adist > 5) {
                        const force = (attractRange - adist) / attractRange * attractForce * 0.5;
                        particle.vx += (adx / adist) * force;
                        particle.vy += (ady / adist) * force;
                    }
                    particle.x += particle.vx * speed;
                    particle.y += particle.vy * speed;
                    particle.vx *= 0.98;
                    particle.vy *= 0.98;
                    break;

                case 'mouse-orbit':
                    const orbitRange = this.settings['mouse-range'] || 100;
                    const odx = this.mouse.x - particle.x;
                    const ody = this.mouse.y - particle.y;
                    const odist = Math.sqrt(odx * odx + ody * ody);
                    if (odist < orbitRange * 2) {
                        const angle = Math.atan2(ody, odx);
                        const orbitalSpeed = 0.05 * speed;
                        particle.x += Math.cos(angle + Math.PI/2) * orbitalSpeed * 20;
                        particle.y += Math.sin(angle + Math.PI/2) * orbitalSpeed * 20;
                        // Also pull towards mouse
                        if (odist > orbitRange) {
                            particle.x += odx * 0.01;
                            particle.y += ody * 0.01;
                        }
                    } else {
                        particle.x += particle.vx * speed;
                        particle.y += particle.vy * speed;
                    }
                    break;

                case 'mouse-click':
                    if (this.mouse.clicked) {
                        const cdx = this.mouse.clickX - particle.x;
                        const cdy = this.mouse.clickY - particle.y;
                        const cdist = Math.sqrt(cdx * cdx + cdy * cdy);
                        if (cdist < 200) {
                            const force = (200 - cdist) / 200 * 5;
                            particle.vx += (cdx / cdist) * force;
                            particle.vy += (cdy / cdist) * force;
                        }
                    }
                    particle.x += particle.vx * speed;
                    particle.y += particle.vy * speed;
                    particle.vx *= 0.9;
                    particle.vy *= 0.9;
                    break;

                case 'mouse-gravity':
                    const gdx = this.mouse.x - particle.x;
                    const gdy = this.mouse.y - particle.y;
                    const gdist = Math.sqrt(gdx * gdx + gdy * gdy);
                    if (gdist > 0) {
                        const gravity = (this.settings['mouse-force'] || 1) * 100 / (gdist * gdist);
                        particle.vx += (gdx / gdist) * gravity;
                        particle.vy += (gdy / gdist) * gravity;
                    }
                    particle.x += particle.vx * speed;
                    particle.y += particle.vy * speed;
                    particle.vx *= 0.999;
                    particle.vy *= 0.999;
                    break;

                case 'mouse-wind':
                    const windForce = this.settings['mouse-force'] || 1;
                    const mouseVel = Math.sqrt(this.mouse.vx * this.mouse.vx + this.mouse.vy * this.mouse.vy);
                    if (mouseVel > 1) {
                        particle.vx += this.mouse.vx * 0.01 * windForce;
                        particle.vy += this.mouse.vy * 0.01 * windForce;
                    }
                    particle.x += particle.vx * speed;
                    particle.y += particle.vy * speed;
                    particle.vx *= 0.98;
                    particle.vy *= 0.98;
                    break;

                case 'laser':
                    // Create laser line from particle to mouse
                    const ldx = this.mouse.x - particle.x;
                    const ldy = this.mouse.y - particle.y;
                    const ldist = Math.sqrt(ldx * ldx + ldy * ldy);
                    if (ldist > 10) {
                        particle.x += (ldx / ldist) * speed * 5;
                        particle.y += (ldy / ldist) * speed * 5;
                    }
                    break;
            }

            // Boundary wrapping
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
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

        // Draw connections first (behind particles)
        if (connect) {
            this.ctx.strokeStyle = color + '30';
            this.ctx.lineWidth = 1;
            this.particles.forEach((particle, i) => {
                this.particles.slice(i + 1).forEach(other => {
                    const dist = Math.sqrt(
                        Math.pow(particle.x - other.x, 2) +
                        Math.pow(particle.y - other.y, 2)
                    );
                    if (dist < 100) {
                        this.ctx.beginPath();
                        this.ctx.moveTo(particle.x, particle.y);
                        this.ctx.lineTo(other.x, other.y);
                        this.ctx.stroke();
                    }
                });
            });
        }

        // Draw laser effects for laser behavior
        if (this.settings.particleBehavior === 'laser') {
            this.ctx.strokeStyle = color + '80';
            this.ctx.lineWidth = 2;
            this.particles.forEach(particle => {
                this.ctx.beginPath();
                this.ctx.moveTo(particle.x, particle.y);
                this.ctx.lineTo(this.mouse.x, this.mouse.y);
                this.ctx.stroke();
            });
        }

        // Draw particles
        this.particles.forEach(particle => {
            // Draw trail first
            if (trails && particle.trail && particle.trail.length > 1) {
                this.ctx.strokeStyle = color + '60';
                this.ctx.lineWidth = Math.max(1, size / 2);
                this.ctx.beginPath();
                this.ctx.moveTo(particle.trail[0].x, particle.trail[0].y);
                for (let i = 1; i < particle.trail.length; i++) {
                    this.ctx.lineTo(particle.trail[i].x, particle.trail[i].y);
                }
                this.ctx.stroke();
            }

            // Set up glow
            if (glow) {
                this.ctx.shadowColor = color;
                this.ctx.shadowBlur = size * 3;
            } else {
                this.ctx.shadowBlur = 0;
            }

            this.ctx.fillStyle = color;
            this.ctx.beginPath();

            switch (shape) {
                case 'circle':
                    this.ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
                    break;
                case 'square':
                    this.ctx.rect(particle.x - size, particle.y - size, size * 2, size * 2);
                    break;
                case 'triangle':
                    this.ctx.moveTo(particle.x, particle.y - size);
                    this.ctx.lineTo(particle.x - size, particle.y + size);
                    this.ctx.lineTo(particle.x + size, particle.y + size);
                    this.ctx.closePath();
                    break;
                case 'star':
                    this.drawStar(particle.x, particle.y, size);
                    break;
                case 'diamond':
                    this.ctx.moveTo(particle.x, particle.y - size);
                    this.ctx.lineTo(particle.x + size, particle.y);
                    this.ctx.lineTo(particle.x, particle.y + size);
                    this.ctx.lineTo(particle.x - size, particle.y);
                    this.ctx.closePath();
                    break;
            }

            this.ctx.fill();
        });

        // Reset shadow
        this.ctx.shadowBlur = 0;
    }

    drawStar(x, y, size) {
        const spikes = 5;
        const outerRadius = size;
        const innerRadius = size * 0.5;

        let rot = Math.PI / 2 * 3;
        let cx = x;
        let cy = y;
        const step = Math.PI / spikes;

        this.ctx.moveTo(cx, cy - outerRadius);

        for (let i = 0; i < spikes; i++) {
            cx = x + Math.cos(rot) * outerRadius;
            cy = y + Math.sin(rot) * outerRadius;
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

    animate() {
        this.updateParticles();
        this.updateClickParticles();
        this.drawParticles();
        this.drawClickParticles();
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    updateSettings(newSettings) {
        this.settings = newSettings;

        // Recreate particles if count changed
        const newCount = parseInt(newSettings['particle-count']) || 100;
        if (newCount !== this.particles.length) {
            this.createParticles();
        }
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

// Animated Background System
class BackgroundSystem {
    constructor(settings) {
        this.settings = settings;
        this.canvas = null;
        this.ctx = null;
        this.animationId = null;
        this.time = 0;

        this.init();
    }

    init() {
        this.createCanvas();
        this.animate();
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

    animate() {
        const speed = this.settings['animation-speed'] || 1;
        const intensity = this.settings['animation-intensity'] || 1;
        this.time += 0.02 * speed;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const animation = this.settings.backgroundAnimation;

        switch (animation) {
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
            case 'geometry':
                this.drawGeometricLines(intensity);
                break;
            case 'stars':
                this.drawStarfield(intensity);
                break;
            case 'particles':
                this.drawParticleFlow(intensity);
                break;
            case 'fractals':
                this.drawFractalTree(intensity);
                break;
            case 'cellular':
                this.drawCellularAutomata(intensity);
                break;
            case 'lightning':
                this.drawLightning(intensity);
                break;
            case 'ripples':
                this.drawWaterRipples(intensity);
                break;
            case 'crystals':
                this.drawGrowingCrystals(intensity);
                break;
            case 'dna':
                this.drawDNAStrands(intensity);
                break;
            case 'galaxy':
                this.drawGalaxySpiral(intensity);
                break;
            case 'fire':
                this.drawFireEffect(intensity);
                break;
            case 'code':
                this.drawDigitalRain(intensity);
                break;
        }

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    drawMatrixRain() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = '#00ff00';
        this.ctx.font = '15px monospace';

        const columns = this.canvas.width / 20;
        for (let i = 0; i < columns; i++) {
            const text = String.fromCharCode(Math.random() * 128);
            const x = i * 20;
            const y = (this.time * 100 + i * 50) % this.canvas.height;
            this.ctx.fillText(text, x, y);
        }
    }

    drawWaves() {
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, 'rgba(0, 212, 255, 0.1)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0.3)');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.strokeStyle = 'rgba(0, 212, 255, 0.5)';
        this.ctx.lineWidth = 2;

        for (let i = 0; i < 5; i++) {
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

    drawNeuralNetwork() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        const nodes = 20;
        const nodePositions = [];

        for (let i = 0; i < nodes; i++) {
            const x = (Math.sin(this.time + i) + 1) * this.canvas.width / 2;
            const y = (Math.cos(this.time * 0.7 + i) + 1) * this.canvas.height / 2;
            nodePositions.push({ x, y });

            // Draw node
            this.ctx.fillStyle = 'rgba(0, 212, 255, 0.8)';
            this.ctx.beginPath();
            this.ctx.arc(x, y, 3, 0, Math.PI * 2);
            this.ctx.fill();
        }

        // Draw connections
        this.ctx.strokeStyle = 'rgba(0, 212, 255, 0.2)';
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

    drawPlasmaField() {
        const imageData = this.ctx.createImageData(this.canvas.width, this.canvas.height);
        const data = imageData.data;

        for (let x = 0; x < this.canvas.width; x += 2) {
            for (let y = 0; y < this.canvas.height; y += 2) {
                const value = Math.sin(x * 0.01 + this.time) +
                             Math.sin(y * 0.01 + this.time) +
                             Math.sin((x + y) * 0.01 + this.time);

                const color = Math.floor((value + 3) * 42.5);
                const index = (y * this.canvas.width + x) * 4;

                data[index] = color; // R
                data[index + 1] = color * 0.5; // G
                data[index + 2] = 255 - color; // B
                data[index + 3] = 100; // A
            }
        }

        this.ctx.putImageData(imageData, 0, 0);
    }

    drawGeometricLines() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.strokeStyle = 'rgba(0, 212, 255, 0.3)';
        this.ctx.lineWidth = 1;

        const step = 50;
        for (let x = 0; x < this.canvas.width; x += step) {
            for (let y = 0; y < this.canvas.height; y += step) {
                const offset = Math.sin(this.time + x * 0.01 + y * 0.01) * 20;
                this.ctx.beginPath();
                this.ctx.moveTo(x, y);
                this.ctx.lineTo(x + step + offset, y + step + offset);
                this.ctx.stroke();
            }
        }
    }

    drawStarfield() {
        this.ctx.fillStyle = 'rgba(0, 0, 20, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = 'white';
        for (let i = 0; i < 200; i++) {
            const x = (Math.sin(this.time * 0.1 + i) + 1) * this.canvas.width / 2;
            const y = (Math.cos(this.time * 0.1 + i * 0.7) + 1) * this.canvas.height / 2;
            const size = Math.sin(this.time + i) * 2 + 2;

            this.ctx.beginPath();
            this.ctx.arc(x, y, size, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    drawParticleFlow(intensity) {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = `rgba(0, 212, 255, ${0.6 * intensity})`;
        for (let i = 0; i < 100 * intensity; i++) {
            const x = (Math.sin(this.time + i * 0.1) + 1) * this.canvas.width / 2;
            const y = (Math.cos(this.time * 0.7 + i * 0.05) + 1) * this.canvas.height / 2;
            const size = Math.sin(this.time + i) * 3 + 3;

            this.ctx.beginPath();
            this.ctx.arc(x, y, size, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    drawFractalTree(intensity) {
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

    drawCellularAutomata(intensity) {
        const cellSize = 5;
        const cols = Math.floor(this.canvas.width / cellSize);
        const rows = Math.floor(this.canvas.height / cellSize);

        this.ctx.fillStyle = `rgba(0, 255, 255, ${0.8 * intensity})`;

        for (let x = 0; x < cols; x++) {
            for (let y = 0; y < rows; y++) {
                const noise = Math.sin(x * 0.1 + this.time) * Math.cos(y * 0.1 + this.time);
                if (noise > 0.3) {
                    this.ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
                }
            }
        }
    }

    drawLightning(intensity) {
        this.ctx.fillStyle = 'rgba(0, 0, 30, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.strokeStyle = `rgba(255, 255, 255, ${0.9 * intensity})`;
        this.ctx.lineWidth = 3;
        this.ctx.shadowColor = 'rgba(0, 200, 255, 0.8)';
        this.ctx.shadowBlur = 10;

        const drawLightningBolt = (startX, startY, endX, endY, generations) => {
            if (generations === 0) {
                this.ctx.beginPath();
                this.ctx.moveTo(startX, startY);
                this.ctx.lineTo(endX, endY);
                this.ctx.stroke();
                return;
            }

            const midX = (startX + endX) / 2 + (Math.random() - 0.5) * 50;
            const midY = (startY + endY) / 2 + (Math.random() - 0.5) * 50;

            drawLightningBolt(startX, startY, midX, midY, generations - 1);
            drawLightningBolt(midX, midY, endX, endY, generations - 1);
        };

        if (Math.random() < 0.1 * intensity) {
            const startX = Math.random() * this.canvas.width;
            const endX = Math.random() * this.canvas.width;
            drawLightningBolt(startX, 0, endX, this.canvas.height, 4);
        }

        this.ctx.shadowBlur = 0;
    }

    drawWaterRipples(intensity) {
        this.ctx.fillStyle = 'rgba(0, 50, 100, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.strokeStyle = `rgba(0, 150, 255, ${0.5 * intensity})`;
        this.ctx.lineWidth = 2;

        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;

        for (let i = 0; i < 5; i++) {
            const radius = (this.time * 50 + i * 30) % 300;
            const alpha = 1 - radius / 300;

            this.ctx.globalAlpha = alpha * intensity;
            this.ctx.beginPath();
            this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            this.ctx.stroke();
        }
        this.ctx.globalAlpha = 1;
    }

    drawGrowingCrystals(intensity) {
        this.ctx.fillStyle = 'rgba(0, 0, 50, 0.02)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.strokeStyle = `rgba(255, 0, 255, ${0.7 * intensity})`;
        this.ctx.lineWidth = 1;

        const crystalCount = 20 * intensity;
        for (let i = 0; i < crystalCount; i++) {
            const centerX = (Math.sin(i + this.time * 0.5) + 1) * this.canvas.width / 2;
            const centerY = (Math.cos(i + this.time * 0.3) + 1) * this.canvas.height / 2;
            const size = Math.sin(this.time + i) * 20 + 30;

            this.ctx.beginPath();
            for (let j = 0; j < 6; j++) {
                const angle = (j * Math.PI * 2) / 6;
                const x = centerX + Math.cos(angle) * size;
                const y = centerY + Math.sin(angle) * size;

                if (j === 0) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
            }
            this.ctx.closePath();
            this.ctx.stroke();
        }
    }

    drawDNAStrands(intensity) {
        this.ctx.fillStyle = 'rgba(0, 20, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.strokeStyle = `rgba(0, 255, 100, ${0.8 * intensity})`;
        this.ctx.lineWidth = 3;

        const centerX = this.canvas.width / 2;
        const radius = 50;

        for (let y = 0; y < this.canvas.height + 100; y += 10) {
            const t = (y + this.time * 100) * 0.02;
            const x1 = centerX + Math.cos(t) * radius;
            const x2 = centerX + Math.cos(t + Math.PI) * radius;

            this.ctx.beginPath();
            this.ctx.moveTo(x1, y);
            this.ctx.lineTo(x2, y);
            this.ctx.stroke();

            // Draw helix strands
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

        for (let i = 0; i < 1000 * intensity; i++) {
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

    drawFireEffect(intensity) {
        this.ctx.fillStyle = 'rgba(20, 0, 0, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        for (let x = 0; x < this.canvas.width; x += 5) {
            const height = Math.sin(x * 0.01 + this.time * 2) * 100 + 200;
            const baseY = this.canvas.height - height;

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

    drawDigitalRain(intensity) {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = `rgba(0, 255, 0, ${0.8 * intensity})`;
        this.ctx.font = '12px monospace';

        const chars = '01';
        const columns = this.canvas.width / 15;

        for (let i = 0; i < columns * intensity; i++) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            const x = i * 15;
            const y = (this.time * 200 + i * 20) % this.canvas.height;

            this.ctx.fillText(char, x, y);
        }
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
            top: 10px;
            right: 10px;
            background: rgba(0, 0, 0, 0.8);
            color: #00ff00;
            padding: 5px 10px;
            border-radius: 4px;
            font-family: monospace;
            font-size: 14px;
            z-index: 10000;
        `;
        document.body.appendChild(this.element);

        this.update();
    }

    update() {
        this.frameCount++;
        const now = performance.now();

        if (now - this.lastTime >= 1000) {
            this.fps = Math.round((this.frameCount * 1000) / (now - this.lastTime));
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
    Settings.applyStartupSettings();
});

// Also apply when scripts load (for hot reloading)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        Settings.applyStartupSettings();
    });
} else {
    Settings.applyStartupSettings();
}