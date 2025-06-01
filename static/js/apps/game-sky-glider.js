/**
 * APP_METADATA
 * @name Sky Glider
 * @icon fas fa-paper-plane
 * @description Serene flight game with stunning parallax landscapes and wind physics
 * @category Games
 * @version 1.0.0
 * @author EmberFrame Team
 * @enabled true
 */

class SkyGlider {
    static createWindow() {
        return {
            title: '✈️ Sky Glider - Serene Flight',
            width: '900px',
            height: '650px',
            autoSize: false,
            content: `
                <div class="sky-glider-container">
                    <canvas id="game-canvas" width="900" height="650"></canvas>
                    
                    <div class="game-ui">
                        <div class="top-ui">
                            <div class="distance-display">
                                <div class="distance-label">Distance</div>
                                <div class="distance-value" id="distance">0 km</div>
                            </div>
                            <div class="altitude-display">
                                <div class="altitude-label">Altitude</div>
                                <div class="altitude-value" id="altitude">500m</div>
                            </div>
                            <div class="wind-display">
                                <div class="wind-label">Wind</div>
                                <div class="wind-value" id="wind">→ 5 kph</div>
                            </div>
                        </div>
                        
                        <div class="biome-indicator" id="biome-indicator">
                            🏔️ Mountain Peaks
                        </div>
                        
                        <div class="controls-hint" id="controls-hint">
                            <div>🖱️ Mouse: Steer | ⬆️⬇️ Arrows: Climb/Dive | 🔄 Space: Reset</div>
                        </div>
                        
                        <div class="game-over" id="game-over" style="display: none;">
                            <div class="game-over-content">
                                <h2>Flight Complete!</h2>
                                <div class="final-stats">
                                    <div class="stat">
                                        <span class="stat-label">Distance Traveled:</span>
                                        <span class="stat-value" id="final-distance">0 km</span>
                                    </div>
                                    <div class="stat">
                                        <span class="stat-label">Biomes Crossed:</span>
                                        <span class="stat-value" id="biomes-crossed">0</span>
                                    </div>
                                    <div class="stat">
                                        <span class="stat-label">Flight Time:</span>
                                        <span class="stat-value" id="flight-time">0:00</span>
                                    </div>
                                </div>
                                <button class="restart-btn" id="restart-btn">
                                    🛫 Start New Flight
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="loading-screen" id="loading-screen">
                        <div class="loading-content">
                            <div class="glider-icon">✈️</div>
                            <div class="loading-text">Preparing for takeoff...</div>
                            <div class="loading-bar">
                                <div class="loading-progress" id="loading-progress"></div>
                            </div>
                        </div>
                    </div>
                </div>

                ${SkyGlider.getStyles()}
            `,
            onInit: (windowElement) => {
                SkyGlider.init(windowElement);
            }
        };
    }

    static init(windowElement) {
        this.windowElement = windowElement;
        this.canvas = windowElement.querySelector('#game-canvas');
        this.ctx = this.canvas.getContext('2d');

        // Game state
        this.gameRunning = false;
        this.gameStartTime = 0;
        this.mouse = { x: 0, y: 0 };
        this.keys = {};

        // Player glider
        this.player = {
            x: 100,
            y: 300,
            vx: 2,
            vy: 0,
            angle: 0,
            targetAngle: 0,
            altitude: 500
        };

        // Game world
        this.distance = 0;
        this.wind = { x: 0.5, y: 0, strength: 5 };
        this.currentBiome = 0;
        this.biomesVisited = new Set();

        // Parallax layers
        this.backgroundLayers = [];
        this.particles = [];
        this.clouds = [];

        // Initialize biomes
        this.biomes = [
            { name: '🏔️ Mountain Peaks', color: '#4a90e2', groundColor: '#8B7355' },
            { name: '🌲 Pine Forest', color: '#27ae60', groundColor: '#2d5a3d' },
            { name: '🌸 Cherry Blossoms', color: '#e91e63', groundColor: '#4a7c59' },
            { name: '🏜️ Desert Dunes', color: '#f39c12', groundColor: '#deb887' },
            { name: '🌊 Coastal Cliffs', color: '#3498db', groundColor: '#556b2f' },
            { name: '❄️ Frozen Tundra', color: '#ecf0f1', groundColor: '#708090' },
            { name: '🌺 Tropical Island', color: '#1abc9c', groundColor: '#228b22' },
            { name: '🌙 Moonlit Valley', color: '#9b59b6', groundColor: '#2f4f4f' }
        ];

        this.setupEventListeners();
        this.showLoadingScreen();

        console.log('🛩️ Sky Glider initialized');
    }

    static setupEventListeners() {
        // Mouse movement
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });

        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;

            if (e.code === 'Space') {
                e.preventDefault();
                if (this.gameRunning) {
                    this.resetGame();
                }
            }
        });

        document.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });

        // Restart button
        this.windowElement.querySelector('#restart-btn').addEventListener('click', () => {
            this.resetGame();
        });

        // Prevent context menu on canvas
        this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());
    }

    static showLoadingScreen() {
        const loadingScreen = this.windowElement.querySelector('#loading-screen');
        const progressBar = this.windowElement.querySelector('#loading-progress');

        let progress = 0;
        const loadingInterval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                progress = 100;
                progressBar.style.width = '100%';

                setTimeout(() => {
                    loadingScreen.style.opacity = '0';
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                        this.startGame();
                    }, 500);
                }, 500);

                clearInterval(loadingInterval);
            } else {
                progressBar.style.width = progress + '%';
            }
        }, 100);
    }

    static startGame() {
        this.initializeGame();
        this.gameRunning = true;
        this.gameStartTime = Date.now();
        this.hideControlsHint();
        this.gameLoop();
    }

    static initializeGame() {
        // Initialize parallax layers
        this.backgroundLayers = [
            // Sky layer
            { type: 'sky', speed: 0, elements: [] },
            // Far mountains
            { type: 'mountains-far', speed: 0.1, elements: this.generateMountains(5, 0.3) },
            // Medium mountains
            { type: 'mountains-mid', speed: 0.3, elements: this.generateMountains(8, 0.6) },
            // Near mountains/hills
            { type: 'mountains-near', speed: 0.5, elements: this.generateMountains(12, 1.0) },
            // Ground layer
            { type: 'ground', speed: 1.0, elements: this.generateGround() }
        ];

        // Initialize clouds
        this.clouds = this.generateClouds(15);

        // Initialize particles
        this.particles = [];

        // Reset player
        this.player = {
            x: 100,
            y: 300,
            vx: 2,
            vy: 0,
            angle: 0,
            targetAngle: 0,
            altitude: 500
        };

        this.distance = 0;
        this.currentBiome = 0;
        this.biomesVisited.clear();
        this.wind = { x: 0.5, y: 0, strength: 5 };
    }

    static generateMountains(count, scale) {
        const mountains = [];
        for (let i = 0; i < count; i++) {
            mountains.push({
                x: i * 200,
                height: 100 + Math.random() * 200 * scale,
                width: 150 + Math.random() * 100,
                peaks: Math.floor(1 + Math.random() * 3)
            });
        }
        return mountains;
    }

    static generateGround() {
        const ground = [];
        for (let i = 0; i < 100; i++) {
            ground.push({
                x: i * 50,
                height: 400 + Math.sin(i * 0.1) * 50 + Math.random() * 30,
                vegetation: Math.random() > 0.7
            });
        }
        return ground;
    }

    static generateClouds(count) {
        const clouds = [];
        for (let i = 0; i < count; i++) {
            clouds.push({
                x: Math.random() * 2000,
                y: 50 + Math.random() * 200,
                size: 30 + Math.random() * 60,
                speed: 0.2 + Math.random() * 0.3,
                opacity: 0.3 + Math.random() * 0.4
            });
        }
        return clouds;
    }

    static hideControlsHint() {
        setTimeout(() => {
            const hint = this.windowElement.querySelector('#controls-hint');
            hint.style.opacity = '0';
            setTimeout(() => hint.style.display = 'none', 500);
        }, 3000);
    }

    static gameLoop() {
        if (!this.gameRunning) return;

        this.update();
        this.render();
        this.updateUI();

        requestAnimationFrame(() => this.gameLoop());
    }

    static update() {
        // Update wind
        this.updateWind();

        // Update player
        this.updatePlayer();

        // Update distance and biome
        this.distance += this.player.vx * 0.01;
        this.updateBiome();

        // Update particles
        this.updateParticles();

        // Update clouds
        this.updateClouds();

        // Check for game end (altitude too low)
        if (this.player.altitude <= 0) {
            this.endGame();
        }
    }

    static updateWind() {
        // Vary wind strength and direction over time
        const time = (Date.now() - this.gameStartTime) * 0.001;
        this.wind.x = 0.3 + Math.sin(time * 0.1) * 0.4;
        this.wind.y = Math.sin(time * 0.07) * 0.2;
        this.wind.strength = 3 + Math.sin(time * 0.05) * 3;
    }

    static updatePlayer() {
        // Mouse steering
        const centerY = this.canvas.height / 2;
        const mouseInfluence = (this.mouse.y - centerY) / centerY;
        this.player.targetAngle = mouseInfluence * 0.3;

        // Keyboard controls
        if (this.keys['ArrowUp'] || this.keys['KeyW']) {
            this.player.targetAngle -= 0.02;
        }
        if (this.keys['ArrowDown'] || this.keys['KeyS']) {
            this.player.targetAngle += 0.02;
        }

        // Smooth angle transition
        this.player.angle += (this.player.targetAngle - this.player.angle) * 0.05;

        // Apply angle to velocity
        this.player.vy += Math.sin(this.player.angle) * 0.02;

        // Wind effects
        this.player.vx += this.wind.x * 0.001;
        this.player.vy += this.wind.y * 0.001;

        // Gravity and lift
        this.player.vy += 0.008; // Gravity
        if (this.player.angle < 0) {
            this.player.vy -= Math.abs(this.player.angle) * 0.015; // Lift when nose up
        }

        // Speed management
        this.player.vx = Math.max(1.5, Math.min(4, this.player.vx));
        this.player.vy = Math.max(-2, Math.min(2, this.player.vy));

        // Update position
        this.player.y += this.player.vy;

        // Calculate altitude
        this.player.altitude = Math.max(0, 600 - this.player.y);

        // Keep player on screen horizontally
        this.player.x = Math.max(50, Math.min(200, this.player.x));

        // Vertical boundaries
        this.player.y = Math.max(50, Math.min(580, this.player.y));

        // Add particles based on movement
        if (Math.random() < 0.3) {
            this.particles.push({
                x: this.player.x - 10,
                y: this.player.y + 5,
                vx: -1 - Math.random(),
                vy: Math.random() * 0.5 - 0.25,
                life: 30 + Math.random() * 20,
                maxLife: 50,
                size: 1 + Math.random() * 2,
                color: `hsl(${200 + Math.random() * 60}, 70%, 80%)`
            });
        }
    }

    static updateBiome() {
        const newBiome = Math.floor(this.distance / 10) % this.biomes.length;
        if (newBiome !== this.currentBiome) {
            this.currentBiome = newBiome;
            this.biomesVisited.add(newBiome);

            // Regenerate some background elements for variety
            if (Math.random() < 0.5) {
                this.backgroundLayers[1].elements = this.generateMountains(5, 0.3);
                this.backgroundLayers[2].elements = this.generateMountains(8, 0.6);
            }
        }
    }

    static updateParticles() {
        this.particles = this.particles.filter(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life--;

            // Add some drift
            particle.vy += (Math.random() - 0.5) * 0.01;

            return particle.life > 0;
        });
    }

    static updateClouds() {
        this.clouds.forEach(cloud => {
            cloud.x -= cloud.speed;
            if (cloud.x < -100) {
                cloud.x = this.canvas.width + 100;
                cloud.y = 50 + Math.random() * 200;
            }
        });
    }

    static render() {
        // Clear canvas
        this.ctx.fillStyle = this.getSkyGradient();
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Render parallax layers
        this.renderBackground();

        // Render clouds
        this.renderClouds();

        // Render particles
        this.renderParticles();

        // Render player glider
        this.renderPlayer();

        // Render effects
        this.renderEffects();
    }

    static getSkyGradient() {
        const biome = this.biomes[this.currentBiome];
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);

        // Create sky gradient based on current biome
        if (biome.name.includes('Moon')) {
            gradient.addColorStop(0, '#2c3e50');
            gradient.addColorStop(0.7, '#34495e');
            gradient.addColorStop(1, '#2c3e50');
        } else if (biome.name.includes('Desert')) {
            gradient.addColorStop(0, '#f39c12');
            gradient.addColorStop(0.7, '#e67e22');
            gradient.addColorStop(1, '#d35400');
        } else if (biome.name.includes('Frozen')) {
            gradient.addColorStop(0, '#ecf0f1');
            gradient.addColorStop(0.7, '#bdc3c7');
            gradient.addColorStop(1, '#95a5a6');
        } else {
            const baseColor = biome.color;
            gradient.addColorStop(0, this.lightenColor(baseColor, 30));
            gradient.addColorStop(0.7, baseColor);
            gradient.addColorStop(1, this.darkenColor(baseColor, 20));
        }

        return gradient;
    }

    static renderBackground() {
        const scrollOffset = this.distance * 50;

        this.backgroundLayers.forEach((layer, index) => {
            if (layer.type === 'sky') return; // Skip sky layer

            const offset = scrollOffset * layer.speed;

            this.ctx.save();
            this.ctx.globalAlpha = 0.6 + (index * 0.1);

            if (layer.type.includes('mountains')) {
                this.renderMountainLayer(layer, offset, index);
            } else if (layer.type === 'ground') {
                this.renderGroundLayer(layer, offset);
            }

            this.ctx.restore();
        });
    }

    static renderMountainLayer(layer, offset, layerIndex) {
        const biome = this.biomes[this.currentBiome];

        layer.elements.forEach(mountain => {
            const x = mountain.x - offset;
            if (x < -200 || x > this.canvas.width + 200) return;

            const baseY = 400 + layerIndex * 50;
            const height = mountain.height * (1 - layerIndex * 0.2);

            // Mountain color based on layer depth and biome
            const alpha = 1 - (layerIndex * 0.3);
            const color = this.adjustColorAlpha(biome.groundColor, alpha);

            this.ctx.fillStyle = color;
            this.ctx.beginPath();
            this.ctx.moveTo(x, baseY);

            // Create mountain peaks
            for (let i = 0; i <= mountain.peaks; i++) {
                const peakX = x + (i * mountain.width / mountain.peaks);
                const peakY = baseY - height + Math.random() * 20;
                this.ctx.lineTo(peakX, peakY);
            }

            this.ctx.lineTo(x + mountain.width, baseY);
            this.ctx.closePath();
            this.ctx.fill();
        });
    }

    static renderGroundLayer(layer, offset) {
        const biome = this.biomes[this.currentBiome];

        this.ctx.fillStyle = biome.groundColor;
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.canvas.height);

        layer.elements.forEach((point, index) => {
            const x = point.x - offset;
            if (index === 0) {
                this.ctx.moveTo(x, point.height);
            } else {
                this.ctx.lineTo(x, point.height);
            }

            // Add vegetation
            if (point.vegetation && x > 0 && x < this.canvas.width) {
                this.renderVegetation(x, point.height);
            }
        });

        this.ctx.lineTo(this.canvas.width, this.canvas.height);
        this.ctx.lineTo(0, this.canvas.height);
        this.ctx.closePath();
        this.ctx.fill();
    }

    static renderVegetation(x, y) {
        const biome = this.biomes[this.currentBiome];
        this.ctx.save();

        if (biome.name.includes('Forest') || biome.name.includes('Cherry')) {
            // Trees
            this.ctx.fillStyle = '#2d5a3d';
            this.ctx.fillRect(x - 2, y - 20, 4, 20);
            this.ctx.fillStyle = biome.name.includes('Cherry') ? '#ffb6c1' : '#228b22';
            this.ctx.beginPath();
            this.ctx.arc(x, y - 15, 8, 0, Math.PI * 2);
            this.ctx.fill();
        } else if (biome.name.includes('Desert')) {
            // Cacti
            this.ctx.fillStyle = '#228b22';
            this.ctx.fillRect(x - 1, y - 15, 2, 15);
            this.ctx.fillRect(x - 6, y - 10, 2, 8);
            this.ctx.fillRect(x + 4, y - 12, 2, 6);
        } else if (biome.name.includes('Tropical')) {
            // Palm trees
            this.ctx.fillStyle = '#8b4513';
            this.ctx.fillRect(x - 1, y - 25, 2, 25);
            this.ctx.fillStyle = '#228b22';
            for (let i = 0; i < 6; i++) {
                const angle = (i / 6) * Math.PI * 2;
                this.ctx.beginPath();
                this.ctx.moveTo(x, y - 25);
                this.ctx.lineTo(x + Math.cos(angle) * 12, y - 25 + Math.sin(angle) * 8);
                this.ctx.stroke();
            }
        }

        this.ctx.restore();
    }

    static renderClouds() {
        this.clouds.forEach(cloud => {
            this.ctx.save();
            this.ctx.globalAlpha = cloud.opacity;
            this.ctx.fillStyle = '#ffffff';

            // Draw fluffy cloud
            this.ctx.beginPath();
            this.ctx.arc(cloud.x, cloud.y, cloud.size * 0.6, 0, Math.PI * 2);
            this.ctx.arc(cloud.x + cloud.size * 0.4, cloud.y, cloud.size * 0.8, 0, Math.PI * 2);
            this.ctx.arc(cloud.x - cloud.size * 0.4, cloud.y, cloud.size * 0.7, 0, Math.PI * 2);
            this.ctx.arc(cloud.x, cloud.y - cloud.size * 0.3, cloud.size * 0.5, 0, Math.PI * 2);
            this.ctx.fill();

            this.ctx.restore();
        });
    }

    static renderParticles() {
        this.particles.forEach(particle => {
            const alpha = particle.life / particle.maxLife;
            this.ctx.save();
            this.ctx.globalAlpha = alpha;
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        });
    }

    static renderPlayer() {
        this.ctx.save();
        this.ctx.translate(this.player.x, this.player.y);
        this.ctx.rotate(this.player.angle);

        // Glider body
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(-15, -2, 30, 4);

        // Wings
        this.ctx.fillStyle = '#e0e0e0';
        this.ctx.fillRect(-12, -8, 24, 3);
        this.ctx.fillRect(-8, 3, 16, 3);

        // Cockpit
        this.ctx.fillStyle = '#4a90e2';
        this.ctx.beginPath();
        this.ctx.arc(5, 0, 3, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.restore();
    }

    static renderEffects() {
        // Wind indicator
        this.renderWindIndicator();

        // Altitude warning
        if (this.player.altitude < 100) {
            this.ctx.save();
            this.ctx.globalAlpha = 0.8 - (this.player.altitude / 100) * 0.6;
            this.ctx.fillStyle = '#ff4757';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.restore();
        }
    }

    static renderWindIndicator() {
        const x = this.canvas.width - 100;
        const y = 50;

        this.ctx.save();
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
        this.ctx.lineWidth = 2;

        // Wind direction arrow
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x + this.wind.x * 30, y + this.wind.y * 30);
        this.ctx.stroke();

        // Arrow head
        const angle = Math.atan2(this.wind.y, this.wind.x);
        this.ctx.beginPath();
        this.ctx.moveTo(x + this.wind.x * 30, y + this.wind.y * 30);
        this.ctx.lineTo(x + this.wind.x * 30 - 8 * Math.cos(angle - 0.5), y + this.wind.y * 30 - 8 * Math.sin(angle - 0.5));
        this.ctx.moveTo(x + this.wind.x * 30, y + this.wind.y * 30);
        this.ctx.lineTo(x + this.wind.x * 30 - 8 * Math.cos(angle + 0.5), y + this.wind.y * 30 - 8 * Math.sin(angle + 0.5));
        this.ctx.stroke();

        this.ctx.restore();
    }

    static updateUI() {
        this.windowElement.querySelector('#distance').textContent = Math.floor(this.distance) + ' km';
        this.windowElement.querySelector('#altitude').textContent = Math.floor(this.player.altitude) + 'm';

        const windDirection = this.wind.x > 0 ? '→' : '←';
        this.windowElement.querySelector('#wind').textContent = `${windDirection} ${Math.floor(this.wind.strength)} kph`;

        const biome = this.biomes[this.currentBiome];
        this.windowElement.querySelector('#biome-indicator').textContent = biome.name;
    }

    static endGame() {
        this.gameRunning = false;

        const flightTime = Math.floor((Date.now() - this.gameStartTime) / 1000);
        const minutes = Math.floor(flightTime / 60);
        const seconds = flightTime % 60;

        this.windowElement.querySelector('#final-distance').textContent = Math.floor(this.distance) + ' km';
        this.windowElement.querySelector('#biomes-crossed').textContent = this.biomesVisited.size;
        this.windowElement.querySelector('#flight-time').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;

        this.windowElement.querySelector('#game-over').style.display = 'flex';
    }

    static resetGame() {
        this.windowElement.querySelector('#game-over').style.display = 'none';
        this.startGame();
    }

    // Utility color functions
    static lightenColor(color, percent) {
        const num = parseInt(color.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
            (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
            (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
    }

    static darkenColor(color, percent) {
        const num = parseInt(color.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) - amt;
        const G = (num >> 8 & 0x00FF) - amt;
        const B = (num & 0x0000FF) - amt;
        return '#' + (0x1000000 + (R > 255 ? 255 : R < 0 ? 0 : R) * 0x10000 +
            (G > 255 ? 255 : G < 0 ? 0 : G) * 0x100 +
            (B > 255 ? 255 : B < 0 ? 0 : B)).toString(16).slice(1);
    }

    static adjustColorAlpha(color, alpha) {
        const num = parseInt(color.replace('#', ''), 16);
        const R = num >> 16;
        const G = num >> 8 & 0x00FF;
        const B = num & 0x0000FF;
        return `rgba(${R}, ${G}, ${B}, ${alpha})`;
    }

    static getStyles() {
        return `
            <style>
                .sky-glider-container {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(to bottom, #87CEEB, #E0F6FF);
                    overflow: hidden;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                }

                #game-canvas {
                    display: block;
                    width: 100%;
                    height: 100%;
                    cursor: crosshair;
                }

                .game-ui {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    pointer-events: none;
                    z-index: 10;
                }

                .top-ui {
                    position: absolute;
                    top: 20px;
                    left: 20px;
                    right: 20px;
                    display: flex;
                    justify-content: space-between;
                    gap: 20px;
                }

                .distance-display, .altitude-display, .wind-display {
                    background: rgba(0, 0, 0, 0.7);
                    color: white;
                    padding: 10px 15px;
                    border-radius: 10px;
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    min-width: 100px;
                    text-align: center;
                }

                .distance-label, .altitude-label, .wind-label {
                    font-size: 12px;
                    opacity: 0.8;
                    margin-bottom: 2px;
                }

                .distance-value, .altitude-value, .wind-value {
                    font-size: 18px;
                    font-weight: bold;
                }

                .biome-indicator {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translateX(-50%);
                    background: rgba(0, 0, 0, 0.8);
                    color: white;
                    padding: 8px 16px;
                    border-radius: 20px;
                    font-size: 16px;
                    font-weight: 600;
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    animation: biomeSlide 0.5s ease-out;
                }

                @keyframes biomeSlide {
                    from {
                        transform: translateX(-50%) translateY(-20px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(-50%) translateY(0);
                        opacity: 1;
                    }
                }

                .controls-hint {
                    position: absolute;
                    bottom: 30px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: rgba(0, 0, 0, 0.8);
                    color: white;
                    padding: 12px 20px;
                    border-radius: 10px;
                    font-size: 14px;
                    text-align: center;
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    transition: opacity 0.5s ease;
                }

                .game-over {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.8);
                    backdrop-filter: blur(15px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    pointer-events: all;
                    animation: fadeIn 0.5s ease-out;
                }

                .game-over-content {
                    background: rgba(255, 255, 255, 0.95);
                    padding: 40px;
                    border-radius: 20px;
                    text-align: center;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
                    max-width: 400px;
                    width: 90%;
                }

                .game-over-content h2 {
                    margin: 0 0 30px 0;
                    color: #2c3e50;
                    font-size: 32px;
                    font-weight: 700;
                }

                .final-stats {
                    margin-bottom: 30px;
                }

                .stat {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 8px 0;
                    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                }

                .stat:last-child {
                    border-bottom: none;
                }

                .stat-label {
                    color: #7f8c8d;
                    font-weight: 500;
                }

                .stat-value {
                    color: #2c3e50;
                    font-weight: 700;
                    font-size: 18px;
                }

                .restart-btn {
                    background: linear-gradient(135deg, #3498db, #2980b9);
                    color: white;
                    border: none;
                    padding: 15px 30px;
                    border-radius: 25px;
                    font-size: 16px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
                    pointer-events: all;
                }

                .restart-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(52, 152, 219, 0.4);
                }

                .loading-screen {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 100;
                    transition: opacity 0.5s ease;
                }

                .loading-content {
                    text-align: center;
                    color: white;
                }

                .glider-icon {
                    font-size: 80px;
                    margin-bottom: 20px;
                    animation: float 2s ease-in-out infinite;
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }

                .loading-text {
                    font-size: 24px;
                    font-weight: 600;
                    margin-bottom: 30px;
                    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
                }

                .loading-bar {
                    width: 300px;
                    height: 6px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 3px;
                    overflow: hidden;
                }

                .loading-progress {
                    height: 100%;
                    background: linear-gradient(90deg, #fff, #f0f0f0);
                    width: 0%;
                    transition: width 0.3s ease;
                    border-radius: 3px;
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                /* Responsive adjustments */
                @media (max-width: 600px) {
                    .top-ui {
                        flex-direction: column;
                        gap: 10px;
                    }

                    .distance-display, .altitude-display, .wind-display {
                        padding: 8px 12px;
                        min-width: auto;
                    }

                    .distance-value, .altitude-value, .wind-value {
                        font-size: 16px;
                    }

                    .biome-indicator {
                        font-size: 14px;
                        padding: 6px 12px;
                    }

                    .controls-hint {
                        font-size: 12px;
                        padding: 10px 16px;
                        bottom: 20px;
                    }

                    .game-over-content {
                        padding: 30px 20px;
                    }

                    .game-over-content h2 {
                        font-size: 24px;
                    }

                    .loading-text {
                        font-size: 20px;
                    }

                    .loading-bar {
                        width: 250px;
                    }
                }
            </style>
        `;
    }
}

// Register the app with EmberFrame
window.EmberFrame = window.EmberFrame || {};
window.EmberFrame.registerApp = window.EmberFrame.registerApp || function(id, appClass) {
    window.EmberFrame.AppRegistry = window.EmberFrame.AppRegistry || {};
    window.EmberFrame.AppRegistry[id] = appClass;
};

window.EmberFrame.registerApp('game-sky-glider', SkyGlider);