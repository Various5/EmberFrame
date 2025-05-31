/**
 * APP_METADATA
 * @name Settings
 * @icon fas fa-cog
 * @description Customize your EmberFrame experience
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
                        <div class="settings-nav">
                            <div class="nav-item active" data-section="appearance">
                                <i class="fas fa-palette"></i>
                                <span>Appearance</span>
                            </div>
                            <div class="nav-item" data-section="themes">
                                <i class="fas fa-paint-brush"></i>
                                <span>Themes</span>
                            </div>
                            <div class="nav-item" data-section="effects">
                                <i class="fas fa-magic"></i>
                                <span>Visual Effects</span>
                            </div>
                            <div class="nav-item" data-section="wallpaper">
                                <i class="fas fa-image"></i>
                                <span>Wallpaper</span>
                            </div>
                            <div class="nav-item" data-section="windows">
                                <i class="fas fa-window-maximize"></i>
                                <span>Windows</span>
                            </div>
                            <div class="nav-item" data-section="performance">
                                <i class="fas fa-tachometer-alt"></i>
                                <span>Performance</span>
                            </div>
                            <div class="nav-item" data-section="about">
                                <i class="fas fa-info-circle"></i>
                                <span>About</span>
                            </div>
                        </div>
                    </div>

                    <div class="settings-content">
                        <!-- Appearance Section -->
                        <div class="section active" id="appearance-section">
                            <div class="section-header">
                                <h2><i class="fas fa-palette"></i> Appearance</h2>
                                <p>Customize the look and feel of your desktop</p>
                            </div>

                            <div class="settings-grid">
                                <div class="setting-card">
                                    <h3>Font Settings</h3>
                                    <div class="setting-row">
                                        <label>Font Family</label>
                                        <select id="font-family">
                                            <option value="'Rajdhani', sans-serif">Rajdhani (Default)</option>
                                            <option value="'Orbitron', monospace">Orbitron</option>
                                            <option value="'Space Mono', monospace">Space Mono</option>
                                            <option value="'Fira Code', monospace">Fira Code</option>
                                            <option value="'Inter', sans-serif">Inter</option>
                                            <option value="'JetBrains Mono', monospace">JetBrains Mono</option>
                                            <option value="Arial, sans-serif">Arial</option>
                                        </select>
                                    </div>
                                    <div class="setting-row">
                                        <label>Font Size</label>
                                        <input type="range" id="font-size" min="12" max="20" value="14" class="slider">
                                        <span class="value" id="font-size-value">14px</span>
                                    </div>
                                </div>

                                <div class="setting-card">
                                    <h3>Icon Settings</h3>
                                    <div class="setting-row">
                                        <label>Icon Size</label>
                                        <input type="range" id="icon-size" min="32" max="72" value="48" class="slider">
                                        <span class="value" id="icon-size-value">48px</span>
                                    </div>
                                    <div class="setting-row">
                                        <label>Show Icon Labels</label>
                                        <label class="toggle">
                                            <input type="checkbox" id="show-icon-labels" checked>
                                            <span class="toggle-slider"></span>
                                        </label>
                                    </div>
                                    <div class="setting-row">
                                        <label>Icon Shadows</label>
                                        <label class="toggle">
                                            <input type="checkbox" id="icon-shadows" checked>
                                            <span class="toggle-slider"></span>
                                        </label>
                                    </div>
                                </div>

                                <div class="setting-card">
                                    <h3>Taskbar Settings</h3>
                                    <div class="setting-row">
                                        <label>Auto-hide Taskbar</label>
                                        <label class="toggle">
                                            <input type="checkbox" id="auto-hide-taskbar">
                                            <span class="toggle-slider"></span>
                                        </label>
                                    </div>
                                    <div class="setting-row">
                                        <label>Show Clock</label>
                                        <label class="toggle">
                                            <input type="checkbox" id="show-clock" checked>
                                            <span class="toggle-slider"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Themes Section -->
                        <div class="section" id="themes-section">
                            <div class="section-header">
                                <h2><i class="fas fa-paint-brush"></i> Themes</h2>
                                <p>Choose from our collection of stunning themes</p>
                            </div>

                            <div class="themes-grid" id="themes-grid">
                                <!-- Themes will be populated here -->
                            </div>

                            <div class="setting-card">
                                <h3>Custom Theme</h3>
                                <div class="color-customizer">
                                    <div class="color-row">
                                        <label>Primary Color</label>
                                        <input type="color" id="custom-primary" value="#00d4ff">
                                    </div>
                                    <div class="color-row">
                                        <label>Secondary Color</label>
                                        <input type="color" id="custom-secondary" value="#764ba2">
                                    </div>
                                    <div class="color-row">
                                        <label>Accent Color</label>
                                        <input type="color" id="custom-accent" value="#ff6b6b">
                                    </div>
                                    <button class="btn-primary" id="apply-custom-theme">Apply Custom Theme</button>
                                </div>
                            </div>
                        </div>

                        <!-- Visual Effects Section -->
                        <div class="section" id="effects-section">
                            <div class="section-header">
                                <h2><i class="fas fa-magic"></i> Visual Effects</h2>
                                <p>Add life to your desktop with particle effects</p>
                            </div>

                            <div class="settings-grid">
                                <div class="setting-card">
                                    <h3>Particle Effects</h3>
                                    <div class="setting-row">
                                        <label>Enable Particles</label>
                                        <label class="toggle">
                                            <input type="checkbox" id="enable-particles" checked>
                                            <span class="toggle-slider"></span>
                                        </label>
                                    </div>
                                    <div class="setting-row">
                                        <label>Particle Type</label>
                                        <select id="particle-type">
                                            <option value="dots">Classic Dots</option>
                                            <option value="stars">Twinkling Stars</option>
                                            <option value="hearts">Floating Hearts</option>
                                            <option value="emojis">Random Emojis</option>
                                            <option value="code">Matrix Code</option>
                                            <option value="bubbles">Soap Bubbles</option>
                                            <option value="snow">Snowflakes</option>
                                            <option value="fire">Fire Sparks</option>
                                        </select>
                                    </div>
                                    <div class="setting-row">
                                        <label>Particle Count</label>
                                        <input type="range" id="particle-count" min="10" max="200" value="50" class="slider">
                                        <span class="value" id="particle-count-value">50</span>
                                    </div>
                                    <div class="setting-row">
                                        <label>Mouse Interaction</label>
                                        <label class="toggle">
                                            <input type="checkbox" id="mouse-particles" checked>
                                            <span class="toggle-slider"></span>
                                        </label>
                                    </div>
                                </div>

                                <div class="setting-card">
                                    <h3>Animation Settings</h3>
                                    <div class="setting-row">
                                        <label>Animation Quality</label>
                                        <select id="animation-quality">
                                            <option value="high">High (Smooth)</option>
                                            <option value="medium">Medium (Balanced)</option>
                                            <option value="low">Low (Performance)</option>
                                            <option value="none">Disabled</option>
                                        </select>
                                    </div>
                                    <div class="setting-row">
                                        <label>Blur Effects</label>
                                        <label class="toggle">
                                            <input type="checkbox" id="blur-effects" checked>
                                            <span class="toggle-slider"></span>
                                        </label>
                                    </div>
                                    <div class="setting-row">
                                        <label>Glow Effects</label>
                                        <label class="toggle">
                                            <input type="checkbox" id="glow-effects" checked>
                                            <span class="toggle-slider"></span>
                                        </label>
                                    </div>
                                </div>

                                <div class="setting-card">
                                    <h3>Background Effects</h3>
                                    <div class="setting-row">
                                        <label>Animated Grid</label>
                                        <label class="toggle">
                                            <input type="checkbox" id="animated-grid" checked>
                                            <span class="toggle-slider"></span>
                                        </label>
                                    </div>
                                    <div class="setting-row">
                                        <label>Grid Speed</label>
                                        <input type="range" id="grid-speed" min="1" max="10" value="5" class="slider">
                                        <span class="value" id="grid-speed-value">5</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Wallpaper Section -->
                        <div class="section" id="wallpaper-section">
                            <div class="section-header">
                                <h2><i class="fas fa-image"></i> Wallpaper</h2>
                                <p>Customize your desktop background</p>
                            </div>

                            <div class="settings-grid">
                                <div class="setting-card full-width">
                                    <h3>Background Type</h3>
                                    <div class="wallpaper-types">
                                        <div class="wallpaper-type active" data-type="gradient">
                                            <i class="fas fa-palette"></i>
                                            <span>Gradient</span>
                                        </div>
                                        <div class="wallpaper-type" data-type="pattern">
                                            <i class="fas fa-th"></i>
                                            <span>Pattern</span>
                                        </div>
                                        <div class="wallpaper-type" data-type="image">
                                            <i class="fas fa-image"></i>
                                            <span>Image</span>
                                        </div>
                                        <div class="wallpaper-type" data-type="solid">
                                            <i class="fas fa-square"></i>
                                            <span>Solid Color</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="setting-card" id="gradient-options">
                                    <h3>Gradient Settings</h3>
                                    <div class="gradient-presets" id="gradient-presets">
                                        <!-- Gradient presets will be populated here -->
                                    </div>
                                    <div class="custom-gradient">
                                        <div class="color-row">
                                            <label>Start Color</label>
                                            <input type="color" id="gradient-start" value="#667eea">
                                        </div>
                                        <div class="color-row">
                                            <label>End Color</label>
                                            <input type="color" id="gradient-end" value="#764ba2">
                                        </div>
                                        <div class="setting-row">
                                            <label>Direction</label>
                                            <select id="gradient-direction">
                                                <option value="135deg">Diagonal ↘</option>
                                                <option value="90deg">Vertical ↓</option>
                                                <option value="0deg">Horizontal →</option>
                                                <option value="45deg">Diagonal ↗</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div class="setting-card" id="pattern-options" style="display: none;">
                                    <h3>Pattern Settings</h3>
                                    <div class="pattern-grid" id="pattern-grid">
                                        <!-- Pattern options will be populated here -->
                                    </div>
                                </div>

                                <div class="setting-card" id="solid-options" style="display: none;">
                                    <h3>Solid Color</h3>
                                    <div class="color-row">
                                        <label>Background Color</label>
                                        <input type="color" id="solid-color" value="#1a1a2e">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Windows Section -->
                        <div class="section" id="windows-section">
                            <div class="section-header">
                                <h2><i class="fas fa-window-maximize"></i> Windows</h2>
                                <p>Configure window appearance and behavior</p>
                            </div>

                            <div class="settings-grid">
                                <div class="setting-card">
                                    <h3>Window Appearance</h3>
                                    <div class="setting-row">
                                        <label>Window Transparency</label>
                                        <input type="range" id="window-transparency" min="0" max="50" value="5" class="slider">
                                        <span class="value" id="window-transparency-value">5%</span>
                                    </div>
                                    <div class="setting-row">
                                        <label>Window Blur</label>
                                        <label class="toggle">
                                            <input type="checkbox" id="window-blur" checked>
                                            <span class="toggle-slider"></span>
                                        </label>
                                    </div>
                                    <div class="setting-row">
                                        <label>Window Shadows</label>
                                        <label class="toggle">
                                            <input type="checkbox" id="window-shadows" checked>
                                            <span class="toggle-slider"></span>
                                        </label>
                                    </div>
                                </div>

                                <div class="setting-card">
                                    <h3>Window Behavior</h3>
                                    <div class="setting-row">
                                        <label>Smooth Animations</label>
                                        <label class="toggle">
                                            <input type="checkbox" id="smooth-animations" checked>
                                            <span class="toggle-slider"></span>
                                        </label>
                                    </div>
                                    <div class="setting-row">
                                        <label>Window Snapping</label>
                                        <label class="toggle">
                                            <input type="checkbox" id="window-snapping" checked>
                                            <span class="toggle-slider"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Performance Section -->
                        <div class="section" id="performance-section">
                            <div class="section-header">
                                <h2><i class="fas fa-tachometer-alt"></i> Performance</h2>
                                <p>Optimize performance and resource usage</p>
                            </div>

                            <div class="settings-grid">
                                <div class="setting-card">
                                    <h3>Performance Options</h3>
                                    <div class="setting-row">
                                        <label>Hardware Acceleration</label>
                                        <label class="toggle">
                                            <input type="checkbox" id="hardware-acceleration" checked>
                                            <span class="toggle-slider"></span>
                                        </label>
                                    </div>
                                    <div class="setting-row">
                                        <label>Reduce Motion</label>
                                        <label class="toggle">
                                            <input type="checkbox" id="reduce-motion">
                                            <span class="toggle-slider"></span>
                                        </label>
                                    </div>
                                    <div class="setting-row">
                                        <label>Frame Rate Limit</label>
                                        <select id="frame-rate-limit">
                                            <option value="60">60 FPS</option>
                                            <option value="30">30 FPS</option>
                                            <option value="15">15 FPS</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="setting-card">
                                    <h3>Memory Management</h3>
                                    <div class="setting-row">
                                        <button class="btn-secondary" id="clear-cache">Clear Cache</button>
                                    </div>
                                    <div class="setting-row">
                                        <button class="btn-secondary" id="reset-settings">Reset All Settings</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- About Section -->
                        <div class="section" id="about-section">
                            <div class="section-header">
                                <h2><i class="fas fa-info-circle"></i> About EmberFrame</h2>
                                <p>Information about your desktop environment</p>
                            </div>

                            <div class="about-content">
                                <div class="about-logo">
                                    <div class="logo-icon">🔥</div>
                                    <h1>EmberFrame</h1>
                                    <p>Advanced Web Desktop Environment</p>
                                </div>
                                <div class="about-info">
                                    <div class="info-row">
                                        <strong>Version:</strong> 3.0.0
                                    </div>
                                    <div class="info-row">
                                        <strong>Build:</strong> 2024.12.31
                                    </div>
                                    <div class="info-row">
                                        <strong>Engine:</strong> WebKit/Blink
                                    </div>
                                    <div class="info-row">
                                        <strong>Platform:</strong> Web Browser
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="settings-footer">
                        <button class="btn-secondary" id="reset-all">Reset All</button>
                        <button class="btn-primary" id="apply-settings">Apply Changes</button>
                    </div>
                </div>

                <style>
                    .settings-app {
                        height: 100%;
                        display: flex;
                        background: linear-gradient(135deg, #f8f9fb 0%, #e9ecef 100%);
                        font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
                        color: #2c3e50;
                        overflow: hidden;
                    }

                    .settings-sidebar {
                        width: 220px;
                        background: linear-gradient(145deg, #667eea, #764ba2);
                        border-right: 1px solid rgba(255, 255, 255, 0.1);
                        overflow-y: auto;
                        box-shadow: 2px 0 10px rgba(0,0,0,0.1);
                    }

                    .settings-nav {
                        padding: 20px 0;
                    }

                    .nav-item {
                        display: flex;
                        align-items: center;
                        gap: 12px;
                        padding: 12px 20px;
                        color: rgba(255, 255, 255, 0.8);
                        cursor: pointer;
                        transition: all 0.3s ease;
                        position: relative;
                        font-size: 14px;
                        font-weight: 500;
                    }

                    .nav-item:hover {
                        background: rgba(255, 255, 255, 0.1);
                        color: white;
                        transform: translateX(5px);
                    }

                    .nav-item.active {
                        background: rgba(255, 255, 255, 0.2);
                        color: white;
                        border-right: 3px solid white;
                    }

                    .nav-item i {
                        width: 18px;
                        text-align: center;
                        font-size: 16px;
                    }

                    .settings-content {
                        flex: 1;
                        overflow-y: auto;
                        padding: 0;
                        position: relative;
                    }

                    .section {
                        display: none;
                        padding: 30px;
                        animation: slideIn 0.3s ease-out;
                    }

                    .section.active {
                        display: block;
                    }

                    @keyframes slideIn {
                        from { opacity: 0; transform: translateY(20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }

                    .section-header {
                        margin-bottom: 30px;
                        text-align: center;
                        border-bottom: 2px solid #e9ecef;
                        padding-bottom: 20px;
                    }

                    .section-header h2 {
                        margin: 0 0 8px 0;
                        color: #2c3e50;
                        font-size: 28px;
                        font-weight: 700;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 12px;
                    }

                    .section-header p {
                        margin: 0;
                        color: #6c757d;
                        font-size: 16px;
                    }

                    .settings-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                        gap: 20px;
                        margin-bottom: 20px;
                    }

                    .setting-card {
                        background: white;
                        border-radius: 16px;
                        padding: 24px;
                        box-shadow: 0 4px 20px rgba(0,0,0,0.08);
                        border: 1px solid #e9ecef;
                        transition: all 0.3s ease;
                    }

                    .setting-card:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 8px 30px rgba(0,0,0,0.12);
                    }

                    .setting-card.full-width {
                        grid-column: 1 / -1;
                    }

                    .setting-card h3 {
                        margin: 0 0 20px 0;
                        color: #2c3e50;
                        font-size: 18px;
                        font-weight: 600;
                        padding-bottom: 12px;
                        border-bottom: 2px solid #f8f9fa;
                    }

                    .setting-row {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        margin-bottom: 16px;
                        padding: 8px 0;
                    }

                    .setting-row:last-child {
                        margin-bottom: 0;
                    }

                    .setting-row label {
                        font-weight: 500;
                        color: #495057;
                        font-size: 14px;
                    }

                    .slider {
                        width: 120px;
                        height: 6px;
                        border-radius: 3px;
                        background: #e9ecef;
                        outline: none;
                        appearance: none;
                        cursor: pointer;
                    }

                    .slider::-webkit-slider-thumb {
                        appearance: none;
                        width: 18px;
                        height: 18px;
                        border-radius: 50%;
                        background: linear-gradient(145deg, #667eea, #764ba2);
                        cursor: pointer;
                        box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
                    }

                    .slider::-moz-range-thumb {
                        width: 18px;
                        height: 18px;
                        border-radius: 50%;
                        background: linear-gradient(145deg, #667eea, #764ba2);
                        cursor: pointer;
                        border: none;
                        box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
                    }

                    .value {
                        font-weight: 600;
                        color: #667eea;
                        min-width: 50px;
                        text-align: right;
                        font-size: 13px;
                    }

                    .toggle {
                        position: relative;
                        display: inline-block;
                        width: 50px;
                        height: 24px;
                    }

                    .toggle input {
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
                        background: #ccc;
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
                        background: white;
                        transition: 0.3s;
                        border-radius: 50%;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                    }

                    .toggle input:checked + .toggle-slider {
                        background: linear-gradient(145deg, #667eea, #764ba2);
                    }

                    .toggle input:checked + .toggle-slider:before {
                        transform: translateX(26px);
                    }

                    select {
                        padding: 8px 12px;
                        border: 2px solid #e9ecef;
                        border-radius: 8px;
                        background: white;
                        font-size: 14px;
                        min-width: 150px;
                        cursor: pointer;
                        transition: border-color 0.3s ease;
                    }

                    select:focus {
                        outline: none;
                        border-color: #667eea;
                    }

                    input[type="color"] {
                        width: 50px;
                        height: 30px;
                        border: none;
                        border-radius: 8px;
                        cursor: pointer;
                        background: none;
                    }

                    /* Themes Grid */
                    .themes-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                        gap: 16px;
                        margin-bottom: 24px;
                    }

                    .theme-card {
                        border-radius: 12px;
                        padding: 20px;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        border: 3px solid transparent;
                        position: relative;
                        overflow: hidden;
                        min-height: 120px;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        color: white;
                        font-weight: 600;
                        text-shadow: 0 2px 4px rgba(0,0,0,0.5);
                    }

                    .theme-card:hover {
                        transform: scale(1.05);
                        box-shadow: 0 8px 25px rgba(0,0,0,0.3);
                    }

                    .theme-card.active {
                        border-color: #fff;
                        box-shadow: 0 0 20px rgba(255,255,255,0.5);
                    }

                    .theme-card::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: inherit;
                        opacity: 0.9;
                        z-index: -1;
                    }

                    /* Wallpaper Types */
                    .wallpaper-types {
                        display: grid;
                        grid-template-columns: repeat(4, 1fr);
                        gap: 12px;
                        margin-bottom: 20px;
                    }

                    .wallpaper-type {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        gap: 8px;
                        padding: 16px;
                        border: 2px solid #e9ecef;
                        border-radius: 12px;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        background: #f8f9fa;
                    }

                    .wallpaper-type:hover {
                        border-color: #667eea;
                        background: #f0f8ff;
                    }

                    .wallpaper-type.active {
                        border-color: #667eea;
                        background: linear-gradient(145deg, #667eea, #764ba2);
                        color: white;
                    }

                    .wallpaper-type i {
                        font-size: 20px;
                    }

                    .wallpaper-type span {
                        font-size: 12px;
                        font-weight: 600;
                    }

                    /* Gradient Presets */
                    .gradient-presets {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
                        gap: 8px;
                        margin-bottom: 16px;
                    }

                    .gradient-preset {
                        height: 40px;
                        border-radius: 8px;
                        cursor: pointer;
                        border: 2px solid transparent;
                        transition: all 0.3s ease;
                    }

                    .gradient-preset:hover {
                        transform: scale(1.1);
                        border-color: #667eea;
                    }

                    .gradient-preset.active {
                        border-color: #667eea;
                        box-shadow: 0 0 12px rgba(102, 126, 234, 0.5);
                    }

                    /* Pattern Grid */
                    .pattern-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
                        gap: 12px;
                    }

                    .pattern-option {
                        height: 60px;
                        border-radius: 8px;
                        cursor: pointer;
                        border: 2px solid transparent;
                        transition: all 0.3s ease;
                        background-size: 20px 20px;
                    }

                    .pattern-option:hover {
                        transform: scale(1.05);
                        border-color: #667eea;
                    }

                    .pattern-option.active {
                        border-color: #667eea;
                        box-shadow: 0 0 12px rgba(102, 126, 234, 0.5);
                    }

                    /* Color Customizer */
                    .color-customizer {
                        display: flex;
                        flex-direction: column;
                        gap: 16px;
                    }

                    .color-row {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                    }

                    /* Buttons */
                    .btn-primary, .btn-secondary {
                        padding: 10px 20px;
                        border: none;
                        border-radius: 8px;
                        cursor: pointer;
                        font-size: 14px;
                        font-weight: 600;
                        transition: all 0.3s ease;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                    }

                    .btn-primary {
                        background: linear-gradient(145deg, #667eea, #764ba2);
                        color: white;
                    }

                    .btn-primary:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
                    }

                    .btn-secondary {
                        background: #6c757d;
                        color: white;
                    }

                    .btn-secondary:hover {
                        background: #5a6268;
                        transform: translateY(-2px);
                    }

                    /* Settings Footer */
                    .settings-footer {
                        padding: 20px 30px;
                        border-top: 1px solid #e9ecef;
                        background: white;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
                    }

                    /* About Content */
                    .about-content {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        gap: 30px;
                        text-align: center;
                        padding: 40px;
                    }

                    .about-logo {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        gap: 12px;
                    }

                    .logo-icon {
                        font-size: 80px;
                        background: linear-gradient(145deg, #667eea, #764ba2);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                        filter: drop-shadow(0 4px 8px rgba(0,0,0,0.1));
                    }

                    .about-logo h1 {
                        margin: 0;
                        font-size: 36px;
                        font-weight: 700;
                        background: linear-gradient(145deg, #667eea, #764ba2);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                    }

                    .about-info {
                        background: white;
                        padding: 30px;
                        border-radius: 16px;
                        box-shadow: 0 4px 20px rgba(0,0,0,0.08);
                        min-width: 300px;
                    }

                    .info-row {
                        display: flex;
                        justify-content: space-between;
                        padding: 8px 0;
                        border-bottom: 1px solid #f8f9fa;
                    }

                    .info-row:last-child {
                        border-bottom: none;
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
                        }

                        .nav-item {
                            flex-shrink: 0;
                            padding: 8px 16px;
                            border-radius: 8px;
                            margin-right: 8px;
                        }

                        .settings-grid {
                            grid-template-columns: 1fr;
                        }

                        .wallpaper-types {
                            grid-template-columns: repeat(2, 1fr);
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
        this.windowElement = windowElement;
        this.currentSettings = this.loadSettings();

        this.setupNavigation();
        this.setupThemes();
        this.setupWallpapers();
        this.setupEventListeners();
        this.loadCurrentSettings();
        this.initializeParticleSystem();

        console.log('🎨 Enhanced Settings initialized');
    }

    static setupNavigation() {
        const navItems = this.windowElement.querySelectorAll('.nav-item');
        const sections = this.windowElement.querySelectorAll('.section');

        navItems.forEach(item => {
            item.addEventListener('click', () => {
                const sectionId = item.dataset.section;

                // Update navigation
                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');

                // Update sections
                sections.forEach(section => section.classList.remove('active'));
                this.windowElement.querySelector(`#${sectionId}-section`).classList.add('active');
            });
        });
    }

    static setupThemes() {
        const themes = [
            {
                name: 'Cyber Blue',
                id: 'cyber-blue',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                primary: '#00d4ff',
                secondary: '#764ba2'
            },
            {
                name: 'Ember Red',
                id: 'ember-red',
                background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
                primary: '#ff4757',
                secondary: '#ff3838'
            },
            {
                name: 'Matrix Green',
                id: 'matrix-green',
                background: 'linear-gradient(135deg, #00b894 0%, #00a085 100%)',
                primary: '#00ff88',
                secondary: '#00b894'
            },
            {
                name: 'Purple Haze',
                id: 'purple-haze',
                background: 'linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%)',
                primary: '#a29bfe',
                secondary: '#6c5ce7'
            },
            {
                name: 'Ocean Deep',
                id: 'ocean-deep',
                background: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
                primary: '#74b9ff',
                secondary: '#0984e3'
            },
            {
                name: 'Sunset Orange',
                id: 'sunset-orange',
                background: 'linear-gradient(135deg, #fd79a8 0%, #e84393 100%)',
                primary: '#fd79a8',
                secondary: '#e84393'
            }
        ];

        const themesGrid = this.windowElement.querySelector('#themes-grid');

        themes.forEach(theme => {
            const themeCard = document.createElement('div');
            themeCard.className = 'theme-card';
            themeCard.dataset.themeId = theme.id;
            themeCard.style.background = theme.background;
            themeCard.innerHTML = `
                <div>${theme.name}</div>
                <small>Click to apply</small>
            `;

            themeCard.addEventListener('click', () => {
                this.applyTheme(theme);
                this.updateActiveTheme(themeCard);
            });

            themesGrid.appendChild(themeCard);
        });
    }

    static setupWallpapers() {
        // Gradient presets
        const gradients = [
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
            'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
            'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
        ];

        const gradientPresets = this.windowElement.querySelector('#gradient-presets');
        gradients.forEach((gradient, index) => {
            const preset = document.createElement('div');
            preset.className = 'gradient-preset';
            preset.style.background = gradient;
            preset.addEventListener('click', () => {
                this.applyWallpaper('gradient', gradient);
                this.updateActiveGradient(preset);
            });
            gradientPresets.appendChild(preset);
        });

        // Pattern options
        const patterns = [
            {
                name: 'Dots',
                style: 'radial-gradient(circle, #667eea 1px, transparent 1px)',
                size: '20px 20px'
            },
            {
                name: 'Grid',
                style: 'linear-gradient(#667eea 1px, transparent 1px), linear-gradient(90deg, #667eea 1px, transparent 1px)',
                size: '20px 20px'
            },
            {
                name: 'Diagonal',
                style: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #667eea 10px, #667eea 20px)',
                size: 'auto'
            },
            {
                name: 'Hexagon',
                style: 'radial-gradient(circle at 25% 25%, transparent 25%, #667eea 25.5%, #667eea 50%, transparent 50.5%)',
                size: '30px 30px'
            }
        ];

        const patternGrid = this.windowElement.querySelector('#pattern-grid');
        patterns.forEach(pattern => {
            const option = document.createElement('div');
            option.className = 'pattern-option';
            option.style.backgroundImage = pattern.style;
            option.style.backgroundSize = pattern.size;
            option.title = pattern.name;
            option.addEventListener('click', () => {
                this.applyWallpaper('pattern', pattern);
                this.updateActivePattern(option);
            });
            patternGrid.appendChild(option);
        });

        // Wallpaper type switching
        const wallpaperTypes = this.windowElement.querySelectorAll('.wallpaper-type');
        wallpaperTypes.forEach(type => {
            type.addEventListener('click', () => {
                const wallpaperType = type.dataset.type;
                this.switchWallpaperType(wallpaperType);
                wallpaperTypes.forEach(t => t.classList.remove('active'));
                type.classList.add('active');
            });
        });
    }

    static setupEventListeners() {
        // Range sliders
        const sliders = this.windowElement.querySelectorAll('.slider');
        sliders.forEach(slider => {
            const valueSpan = this.windowElement.querySelector(`#${slider.id}-value`);
            if (valueSpan) {
                slider.addEventListener('input', () => {
                    const value = slider.value;
                    const unit = slider.id.includes('size') ? 'px' :
                                slider.id.includes('transparency') ? '%' : '';
                    valueSpan.textContent = value + unit;
                    this.updateSetting(slider.id, value);
                });
            }
        });

        // Toggles
        const toggles = this.windowElement.querySelectorAll('input[type="checkbox"]');
        toggles.forEach(toggle => {
            toggle.addEventListener('change', () => {
                this.updateSetting(toggle.id, toggle.checked);
            });
        });

        // Selects
        const selects = this.windowElement.querySelectorAll('select');
        selects.forEach(select => {
            select.addEventListener('change', () => {
                this.updateSetting(select.id, select.value);
            });
        });

        // Color inputs
        const colorInputs = this.windowElement.querySelectorAll('input[type="color"]');
        colorInputs.forEach(input => {
            input.addEventListener('change', () => {
                this.updateSetting(input.id, input.value);
            });
        });

        // Custom theme button
        this.windowElement.querySelector('#apply-custom-theme').addEventListener('click', () => {
            this.applyCustomTheme();
        });

        // Footer buttons
        this.windowElement.querySelector('#apply-settings').addEventListener('click', () => {
            this.saveAndApplySettings();
        });

        this.windowElement.querySelector('#reset-all').addEventListener('click', () => {
            this.resetAllSettings();
        });

        // Particle type change
        this.windowElement.querySelector('#particle-type').addEventListener('change', (e) => {
            this.updateParticleType(e.target.value);
        });
    }

    static updateSetting(key, value) {
        this.currentSettings[key] = value;
        this.applySettingImmediately(key, value);
    }

    static applySettingImmediately(key, value) {
        const body = document.body;
        const root = document.documentElement;

        switch(key) {
            case 'font-family':
                root.style.setProperty('--system-font', value);
                break;
            case 'font-size':
                root.style.setProperty('--base-font-size', value + 'px');
                break;
            case 'icon-size':
                root.style.setProperty('--icon-size', value + 'px');
                break;
            case 'show-icon-labels':
                if (!value) {
                    body.classList.add('hide-icon-labels');
                } else {
                    body.classList.remove('hide-icon-labels');
                }
                break;
            case 'icon-shadows':
                if (!value) {
                    body.classList.add('no-icon-shadows');
                } else {
                    body.classList.remove('no-icon-shadows');
                }
                break;
            case 'auto-hide-taskbar':
                const taskbar = document.querySelector('.taskbar');
                if (taskbar) {
                    if (value) {
                        taskbar.classList.add('auto-hide');
                    } else {
                        taskbar.classList.remove('auto-hide');
                    }
                }
                break;
            case 'show-clock':
                const clock = document.querySelector('.time-display');
                if (clock) {
                    clock.style.display = value ? 'block' : 'none';
                }
                break;
            case 'window-transparency':
                const opacity = (100 - value) / 100;
                root.style.setProperty('--window-opacity', opacity);
                break;
            case 'blur-effects':
                if (!value) {
                    body.classList.add('no-blur');
                } else {
                    body.classList.remove('no-blur');
                }
                break;
            case 'animated-grid':
                const grid = document.querySelector('.grid-background');
                if (grid) {
                    grid.style.display = value ? 'block' : 'none';
                }
                break;
            case 'enable-particles':
                if (value) {
                    this.startParticles();
                } else {
                    this.stopParticles();
                }
                break;
            case 'particle-count':
                this.updateParticleCount(parseInt(value));
                break;
            case 'reduce-motion':
                if (value) {
                    body.classList.add('reduce-motion');
                } else {
                    body.classList.remove('reduce-motion');
                }
                break;
        }
    }

    static applyTheme(theme) {
        const root = document.documentElement;
        root.style.setProperty('--primary-blue', theme.primary);
        root.style.setProperty('--neon-cyan', theme.secondary);

        if (!this.currentSettings.customWallpaper) {
            document.body.style.background = theme.background;
        }

        this.currentSettings.currentTheme = theme.id;
        this.showNotification(`${theme.name} theme applied!`, 'success');
    }

    static applyCustomTheme() {
        const primary = this.windowElement.querySelector('#custom-primary').value;
        const secondary = this.windowElement.querySelector('#custom-secondary').value;
        const accent = this.windowElement.querySelector('#custom-accent').value;

        const customTheme = {
            name: 'Custom Theme',
            id: 'custom',
            primary: primary,
            secondary: secondary,
            accent: accent,
            background: `linear-gradient(135deg, ${primary} 0%, ${secondary} 100%)`
        };

        this.applyTheme(customTheme);
    }

    static switchWallpaperType(type) {
        // Hide all wallpaper options
        const options = ['gradient-options', 'pattern-options', 'solid-options'];
        options.forEach(option => {
            const element = this.windowElement.querySelector(`#${option}`);
            if (element) element.style.display = 'none';
        });

        // Show selected option
        const selectedOption = this.windowElement.querySelector(`#${type}-options`);
        if (selectedOption) {
            selectedOption.style.display = 'block';
        }
    }

    static applyWallpaper(type, value) {
        let backgroundStyle = '';

        switch(type) {
            case 'gradient':
                backgroundStyle = value;
                break;
            case 'pattern':
                backgroundStyle = `${value.style}, linear-gradient(135deg, #1a1a2e, #16213e)`;
                break;
            case 'solid':
                backgroundStyle = value;
                break;
        }

        document.body.style.background = backgroundStyle;
        this.currentSettings.wallpaperType = type;
        this.currentSettings.wallpaperValue = value;
        this.currentSettings.customWallpaper = true;
    }

    // Particle System
    static initializeParticleSystem() {
        this.particles = [];
        this.particleContainer = null;
        this.particleTypes = {
            dots: '●',
            stars: '✦',
            hearts: '♥',
            emojis: ['😀', '😎', '🚀', '⭐', '🔥', '💎', '🌟', '✨'],
            code: ['0', '1', 'A', 'B', 'C', 'X', 'Y', 'Z'],
            bubbles: '○',
            snow: '❄',
            fire: '🔥'
        };

        if (this.currentSettings['enable-particles']) {
            this.startParticles();
        }
    }

    static startParticles() {
        if (this.particleContainer) return;

        this.particleContainer = document.createElement('div');
        this.particleContainer.className = 'particle-container';
        this.particleContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
        `;

        document.body.appendChild(this.particleContainer);
        this.createParticles();
        this.animateParticles();
    }

    static stopParticles() {
        if (this.particleContainer) {
            this.particleContainer.remove();
            this.particleContainer = null;
            this.particles = [];
        }
    }

    static createParticles() {
        const count = this.currentSettings['particle-count'] || 50;
        const type = this.currentSettings['particle-type'] || 'dots';

        this.particles = [];
        this.particleContainer.innerHTML = '';

        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';

            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            const size = Math.random() * 8 + 4;
            const speedX = (Math.random() - 0.5) * 2;
            const speedY = (Math.random() - 0.5) * 2;

            let content = this.getParticleContent(type);

            particle.style.cssText = `
                position: absolute;
                left: ${x}px;
                top: ${y}px;
                font-size: ${size}px;
                color: rgba(255, 255, 255, 0.6);
                pointer-events: none;
                user-select: none;
                animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
            `;

            particle.textContent = content;

            this.particles.push({
                element: particle,
                x: x,
                y: y,
                speedX: speedX,
                speedY: speedY,
                size: size
            });

            this.particleContainer.appendChild(particle);
        }
    }

    static getParticleContent(type) {
        switch(type) {
            case 'emojis':
                return this.particleTypes.emojis[Math.floor(Math.random() * this.particleTypes.emojis.length)];
            case 'code':
                return this.particleTypes.code[Math.floor(Math.random() * this.particleTypes.code.length)];
            default:
                return this.particleTypes[type] || this.particleTypes.dots;
        }
    }

    static animateParticles() {
        if (!this.particleContainer) return;

        this.particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // Wrap around screen
            if (particle.x > window.innerWidth) particle.x = -20;
            if (particle.x < -20) particle.x = window.innerWidth;
            if (particle.y > window.innerHeight) particle.y = -20;
            if (particle.y < -20) particle.y = window.innerHeight;

            particle.element.style.left = particle.x + 'px';
            particle.element.style.top = particle.y + 'px';
        });

        requestAnimationFrame(() => this.animateParticles());
    }

    static updateParticleType(type) {
        if (!this.particleContainer) return;

        this.particles.forEach(particle => {
            particle.element.textContent = this.getParticleContent(type);
        });
    }

    static updateParticleCount(count) {
        if (!this.particleContainer) return;

        const currentCount = this.particles.length;

        if (count > currentCount) {
            // Add particles
            for (let i = currentCount; i < count; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';

                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight;
                const size = Math.random() * 8 + 4;
                const speedX = (Math.random() - 0.5) * 2;
                const speedY = (Math.random() - 0.5) * 2;

                let content = this.getParticleContent(this.currentSettings['particle-type'] || 'dots');

                particle.style.cssText = `
                    position: absolute;
                    left: ${x}px;
                    top: ${y}px;
                    font-size: ${size}px;
                    color: rgba(255, 255, 255, 0.6);
                    pointer-events: none;
                    user-select: none;
                    animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
                    animation-delay: ${Math.random() * 2}s;
                `;

                particle.textContent = content;

                this.particles.push({
                    element: particle,
                    x: x,
                    y: y,
                    speedX: speedX,
                    speedY: speedY,
                    size: size
                });

                this.particleContainer.appendChild(particle);
            }
        } else if (count < currentCount) {
            // Remove particles
            for (let i = currentCount - 1; i >= count; i--) {
                this.particles[i].element.remove();
                this.particles.splice(i, 1);
            }
        }
    }

    static updateActiveTheme(activeCard) {
        this.windowElement.querySelectorAll('.theme-card').forEach(card => {
            card.classList.remove('active');
        });
        activeCard.classList.add('active');
    }

    static updateActiveGradient(activePreset) {
        this.windowElement.querySelectorAll('.gradient-preset').forEach(preset => {
            preset.classList.remove('active');
        });
        activePreset.classList.add('active');
    }

    static updateActivePattern(activePattern) {
        this.windowElement.querySelectorAll('.pattern-option').forEach(option => {
            option.classList.remove('active');
        });
        activePattern.classList.add('active');
    }

    static loadCurrentSettings() {
        // Load saved settings and apply to UI
        Object.keys(this.currentSettings).forEach(key => {
            const element = this.windowElement.querySelector(`#${key}`);
            if (element) {
                if (element.type === 'checkbox') {
                    element.checked = this.currentSettings[key];
                } else if (element.type === 'range') {
                    element.value = this.currentSettings[key];
                    const valueSpan = this.windowElement.querySelector(`#${key}-value`);
                    if (valueSpan) {
                        const unit = key.includes('size') ? 'px' :
                                   key.includes('transparency') ? '%' : '';
                        valueSpan.textContent = element.value + unit;
                    }
                } else {
                    element.value = this.currentSettings[key];
                }

                // Apply the setting immediately
                this.applySettingImmediately(key, this.currentSettings[key]);
            }
        });
    }

    static saveAndApplySettings() {
        this.saveSettings();
        this.showNotification('Settings saved successfully!', 'success');
    }

    static resetAllSettings() {
        if (confirm('Reset all settings to default? This cannot be undone.')) {
            this.currentSettings = this.getDefaultSettings();
            this.loadCurrentSettings();
            this.saveSettings();
            this.showNotification('Settings reset to defaults', 'info');
        }
    }

    static getDefaultSettings() {
        return {
            'font-family': "'Rajdhani', sans-serif",
            'font-size': '14',
            'icon-size': '48',
            'show-icon-labels': true,
            'icon-shadows': true,
            'auto-hide-taskbar': false,
            'show-clock': true,
            'window-transparency': '5',
            'blur-effects': true,
            'animated-grid': true,
            'enable-particles': true,
            'particle-type': 'dots',
            'particle-count': '50',
            'mouse-particles': true,
            'animation-quality': 'high',
            'glow-effects': true,
            'reduce-motion': false,
            'hardware-acceleration': true,
            currentTheme: 'cyber-blue',
            wallpaperType: 'gradient',
            customWallpaper: false
        };
    }

    static loadSettings() {
        try {
            const stored = localStorage.getItem('emberframe-settings');
            return stored ? { ...this.getDefaultSettings(), ...JSON.parse(stored) } : this.getDefaultSettings();
        } catch {
            return this.getDefaultSettings();
        }
    }

    static saveSettings() {
        try {
            localStorage.setItem('emberframe-settings', JSON.stringify(this.currentSettings));

            // Also try to save to server if available
            fetch('/api/user/preferences', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ settings: this.currentSettings })
            }).catch(() => {
                // Server save failed, but localStorage worked
            });
        } catch (error) {
            console.error('Failed to save settings:', error);
        }
    }

    static showNotification(message, type = 'info') {
        if (window.Notification) {
            window.Notification[type](message);
        } else {
            alert(message);
        }
    }

    static onClose(windowElement) {
        this.stopParticles();
        return true;
    }
}

// Add particle animation CSS
const particleStyles = document.createElement('style');
particleStyles.textContent = `
    @keyframes float {
        0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
            opacity: 0.6; 
        }
        50% { 
            transform: translateY(-20px) rotate(180deg); 
            opacity: 1; 
        }
    }

    .reduce-motion * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }

    .hide-icon-labels .icon-label {
        display: none !important;
    }

    .no-icon-shadows .icon-image {
        box-shadow: none !important;
    }

    .no-blur .window,
    .no-blur .start-menu,
    .no-blur .desktop-icon,
    .no-blur .taskbar {
        backdrop-filter: none !important;
    }

    .auto-hide.taskbar {
        transform: translateY(100%);
        transition: transform 0.3s ease;
    }

    .auto-hide.taskbar:hover {
        transform: translateY(0);
    }
`;
document.head.appendChild(particleStyles);

window.Settings = Settings;