/**
 * APP_METADATA
 * @name Zen Glider
 * @icon fas fa-paper-plane
 * @description Peaceful gliding game with realistic wind physics and stunning visuals
 * @category Games
 * @version 1.0.0
 * @author EmberFrame Team
 * @enabled true
 */

class ZenGlider {
    static createWindow() {
        return {
            title: '🕊️ Zen Glider - Peaceful Flight',
            width: '900px',
            height: '700px',
            autoSize: false,
            content: `
                <div class="zen-glider-container">
                    <div class="game-header">
                        <div class="game-info">
                            <div class="distance-display">
                                <span class="label">Distance:</span>
                                <span class="value" id="distance">0m</span>
                            </div>
                            <div class="altitude-display">
                                <span class="label">Altitude:</span>
                                <span class="value" id="altitude">100m</span>
                            </div>
                            <div class="speed-display">
                                <span class="label">Speed:</span>
                                <span class="value" id="speed">0 km/h</span>
                            </div>
                            <div class="goal-display">
                                <span class="label">Goal:</span>
                                <span class="value" id="goal">5000m</span>
                            </div>
                        </div>
                        <div class="game-controls">
                            <button class="control-btn" id="pause-btn">⏸️ Pause</button>
                            <button class="control-btn" id="restart-btn">🔄 Restart</button>
                            <button class="control-btn" id="settings-btn">⚙️ Settings</button>
                        </div>
                    </div>

                    <div class="game-canvas-container">
                        <canvas id="game-canvas"></canvas>
                        <div class="wind-indicator" id="wind-indicator">
                            <div class="wind-arrow"></div>
                            <div class="wind-strength">Wind: <span id="wind-strength">5</span> km/h</div>
                        </div>
                        <div class="thermal-indicators" id="thermal-indicators"></div>
                        <div class="instructions" id="instructions">
                            <div class="instruction-text">
                                🖱️ Move mouse to control glider<br>
                                🌪️ Find thermals (warm air currents) to gain altitude<br>
                                🎯 Reach <span id="goal-text">5000m</span> to complete the journey
                            </div>
                        </div>
                    </div>

                    <div class="settings-panel" id="settings-panel">
                        <h3>🎮 Game Settings</h3>
                        <div class="setting-group">
                            <label>Wind Strength:</label>
                            <input type="range" id="wind-setting" min="0" max="20" value="8" step="1">
                            <span id="wind-value">8</span> km/h
                        </div>
                        <div class="setting-group">
                            <label>Thermal Intensity:</label>
                            <input type="range" id="thermal-setting" min="0.5" max="3" value="1.5" step="0.1">
                            <span id="thermal-value">1.5</span>x
                        </div>
                        <div class="setting-group">
                            <label>Target Distance:</label>
                            <input type="range" id="distance-setting" min="2000" max="20000" value="5000" step="500">
                            <span id="distance-value">5000</span>m
                        </div>
                        <div class="setting-group">
                            <label>Graphics Quality:</label>
                            <select id="quality-setting">
                                <option value="low">Low (Better Performance)</option>
                                <option value="medium" selected>Medium</option>
                                <option value="high">High (Better Visuals)</option>
                            </select>
                        </div>
                        <div class="settings-actions">
                            <button class="apply-btn" id="apply-settings">Apply Settings</button>
                            <button class="close-btn" id="close-settings">Close</button>
                        </div>
                    </div>

                    <div class="completion-modal" id="completion-modal">
                        <div class="modal-content">
                            <div class="completion-icon">🏆</div>
                            <h2>Journey Complete!</h2>
                            <div class="completion-stats">
                                <div class="stat">
                                    <span class="stat-label">Distance Traveled:</span>
                                    <span class="stat-value" id="final-distance">5000m</span>
                                </div>
                                <div class="stat">
                                    <span class="stat-label">Flight Time:</span>
                                    <span class="stat-value" id="flight-time">2:30</span>
                                </div>
                                <div class="stat">
                                    <span class="stat-label">Max Altitude:</span>
                                    <span class="stat-value" id="max-altitude">450m</span>
                                </div>
                                <div class="stat">
                                    <span class="stat-label">Average Speed:</span>
                                    <span class="stat-value" id="avg-speed">45 km/h</span>
                                </div>
                            </div>
                            <div class="completion-actions">
                                <button class="restart-journey-btn" id="restart-journey">🔄 New Journey</button>
                                <button class="continue-btn" id="continue-flying">➡️ Continue Flying</button>
                            </div>
                        </div>
                    </div>
                </div>

                ${ZenGlider.getStyles()}
            `,
            onInit: (windowElement) => {
                ZenGlider.init(windowElement);
            },
            onClose: () => {
                ZenGlider.cleanup();
            }
        };
    }

    static init(windowElement) {
        this.windowElement = windowElement;
        this.canvas = windowElement.querySelector('#game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.animationId = null;
        this.isPaused = false;
        this.gameStartTime = Date.now();

        // Game settings
        this.settings = {
            windStrength: 8,
            thermalIntensity: 1.5,
            targetDistance: 5000,
            quality: 'medium'
        };

        // Game state
        this.gameState = {
            distance: 0,
            maxAltitude: 100,
            totalFlightTime: 0,
            averageSpeed: 0,
            speedSamples: []
        };

        // Physics
        this.glider = {
            x: 100,
            y: 400,
            vx: 15, // Initial forward velocity
            vy: 0,
            angle: 0,
            size: 20
        };

        this.camera = {
            x: 0,
            y: 0,
            smoothX: 0,
            smoothY: 0
        };

        this.wind = {
            strength: 8,
            direction: Math.PI * 0.1,
            baseDirection: Math.PI * 0.1,
            time: 0
        };

        this.thermals = [];
        this.clouds = [];
        this.mountains = [];
        this.particles = [];
        this.windParticles = [];

        this.setupCanvas();
        this.setupEventListeners();
        this.generateTerrain();
        this.generateClouds();
        this.generateThermals();
        this.startGame();

        console.log('🕊️ Zen Glider initialized');
    }

    static setupCanvas() {
        const container = this.windowElement.querySelector('.game-canvas-container');
        const containerRect = container.getBoundingClientRect();

        this.canvas.width = container.clientWidth;
        this.canvas.height = container.clientHeight;

        // Handle resize
        window.addEventListener('resize', () => {
            const newRect = container.getBoundingClientRect();
            this.canvas.width = newRect.width;
            this.canvas.height = newRect.height;
        });
    }

    static setupEventListeners() {
        // Mouse controls
        this.canvas.addEventListener('mousemove', (e) => {
            if (this.isPaused) return;

            const rect = this.canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            this.handleMouseControl(mouseX, mouseY);
        });

        // Touch controls for mobile
        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            if (this.isPaused) return;

            const rect = this.canvas.getBoundingClientRect();
            const touch = e.touches[0];
            const mouseX = touch.clientX - rect.left;
            const mouseY = touch.clientY - rect.top;

            this.handleMouseControl(mouseX, mouseY);
        });

        // Game controls
        this.windowElement.querySelector('#pause-btn').addEventListener('click', () => {
            this.togglePause();
        });

        this.windowElement.querySelector('#restart-btn').addEventListener('click', () => {
            this.restartGame();
        });

        this.windowElement.querySelector('#settings-btn').addEventListener('click', () => {
            this.showSettings();
        });

        // Settings panel
        this.windowElement.querySelector('#apply-settings').addEventListener('click', () => {
            this.applySettings();
        });

        this.windowElement.querySelector('#close-settings').addEventListener('click', () => {
            this.hideSettings();
        });

        // Completion modal
        this.windowElement.querySelector('#restart-journey').addEventListener('click', () => {
            this.restartGame();
            this.hideCompletionModal();
        });

        this.windowElement.querySelector('#continue-flying').addEventListener('click', () => {
            this.hideCompletionModal();
            this.settings.targetDistance += 5000;
            this.updateGoalDisplay();
        });

        // Settings sliders
        ['wind-setting', 'thermal-setting', 'distance-setting'].forEach(id => {
            const slider = this.windowElement.querySelector(`#${id}`);
            const valueSpan = this.windowElement.querySelector(`#${id.replace('-setting', '-value')}`);

            slider.addEventListener('input', () => {
                valueSpan.textContent = slider.value + (id === 'distance-setting' ? 'm' : id === 'wind-setting' ? ' km/h' : 'x');
            });
        });

        // Hide instructions after first interaction
        let instructionsHidden = false;
        const hideInstructions = () => {
            if (!instructionsHidden) {
                this.windowElement.querySelector('#instructions').style.opacity = '0';
                instructionsHidden = true;
            }
        };

        this.canvas.addEventListener('mousemove', hideInstructions, { once: true });
        this.canvas.addEventListener('touchstart', hideInstructions, { once: true });
    }

    static handleMouseControl(mouseX, mouseY) {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;

        // Calculate desired angle based on mouse position
        const dx = mouseX - centerX;
        const dy = mouseY - centerY;

        const targetAngle = Math.atan2(dy, dx);

        // Smooth angle transition
        const angleDiff = targetAngle - this.glider.angle;
        this.glider.angle += angleDiff * 0.05;

        // Apply control input to velocity
        const controlForce = 0.3;
        this.glider.vx += Math.cos(this.glider.angle) * controlForce;
        this.glider.vy += Math.sin(this.glider.angle) * controlForce;

        // Limit control responsiveness for realism
        this.glider.vx = Math.max(-30, Math.min(50, this.glider.vx));
        this.glider.vy = Math.max(-20, Math.min(20, this.glider.vy));
    }

    static generateTerrain() {
        this.mountains = [];

        for (let x = -1000; x < 20000; x += 100) {
            const height = 200 + Math.sin(x * 0.001) * 100 + Math.sin(x * 0.003) * 50 + Math.random() * 30;
            this.mountains.push({
                x: x,
                height: height,
                color: this.getTerrainColor(height)
            });
        }
    }

    static generateClouds() {
        this.clouds = [];

        for (let i = 0; i < 50; i++) {
            this.clouds.push({
                x: Math.random() * 15000 - 2000,
                y: Math.random() * 200 + 50,
                size: Math.random() * 80 + 40,
                opacity: Math.random() * 0.6 + 0.2,
                speed: Math.random() * 0.5 + 0.2,
                parallax: Math.random() * 0.3 + 0.7
            });
        }
    }

    static generateThermals() {
        this.thermals = [];

        for (let x = 500; x < 15000; x += 300 + Math.random() * 400) {
            this.thermals.push({
                x: x,
                y: Math.random() * 200 + 300,
                strength: Math.random() * 3 + 1,
                radius: Math.random() * 80 + 60,
                particles: [],
                active: false
            });
        }
    }

    static getTerrainColor(height) {
        if (height < 180) return '#2d5a0d'; // Dark green
        if (height < 220) return '#4a7c1a'; // Green
        if (height < 260) return '#6b8e23'; // Olive
        if (height < 300) return '#8b7355'; // Brown
        return '#a0a0a0'; // Gray (peaks)
    }

    static startGame() {
        this.gameStartTime = Date.now();
        this.gameLoop();
    }

    static gameLoop() {
        if (!this.isPaused) {
            this.update();
            this.render();
            this.updateUI();
        }

        this.animationId = requestAnimationFrame(() => this.gameLoop());
    }

    static update() {
        const deltaTime = 16 / 1000; // Assuming 60fps

        // Update wind
        this.wind.time += deltaTime;
        this.wind.direction = this.wind.baseDirection + Math.sin(this.wind.time * 0.5) * 0.3;

        // Apply physics to glider
        this.updateGliderPhysics(deltaTime);

        // Update camera
        this.updateCamera();

        // Update particles
        this.updateParticles(deltaTime);

        // Check thermal interactions
        this.checkThermals();

        // Update game state
        this.updateGameState();

        // Check win condition
        if (this.gameState.distance >= this.settings.targetDistance) {
            this.completeJourney();
        }
    }

    static updateGliderPhysics(deltaTime) {
        // Gravity
        this.glider.vy += 9.8 * deltaTime;

        // Wind effect
        const windForceX = Math.cos(this.wind.direction) * this.wind.strength * 0.1;
        const windForceY = Math.sin(this.wind.direction) * this.wind.strength * 0.05;

        this.glider.vx += windForceX * deltaTime;
        this.glider.vy += windForceY * deltaTime;

        // Air resistance
        const speed = Math.sqrt(this.glider.vx * this.glider.vx + this.glider.vy * this.glider.vy);
        const drag = speed * 0.02;

        this.glider.vx -= (this.glider.vx / speed) * drag * deltaTime * 60;
        this.glider.vy -= (this.glider.vy / speed) * drag * deltaTime * 60;

        // Update position
        this.glider.x += this.glider.vx * deltaTime * 60;
        this.glider.y += this.glider.vy * deltaTime * 60;

        // Ground collision
        const groundHeight = this.getGroundHeightAt(this.glider.x);
        if (this.glider.y > groundHeight - 20) {
            this.glider.y = groundHeight - 20;
            this.glider.vy = Math.max(0, this.glider.vy * -0.3);
            this.glider.vx *= 0.8;
        }

        // Lift from forward motion (simplified)
        if (this.glider.vx > 5) {
            const lift = (this.glider.vx - 5) * 0.15;
            this.glider.vy -= lift * deltaTime * 60;
        }
    }

    static updateCamera() {
        // Follow glider with smooth interpolation
        this.camera.x = this.glider.x - this.canvas.width / 2;
        this.camera.y = this.glider.y - this.canvas.height / 2;

        // Smooth camera movement
        this.camera.smoothX += (this.camera.x - this.camera.smoothX) * 0.1;
        this.camera.smoothY += (this.camera.y - this.camera.smoothY) * 0.1;
    }

    static updateParticles(deltaTime) {
        // Update wind particles
        this.windParticles = this.windParticles.filter(particle => {
            particle.x += particle.vx * deltaTime * 60;
            particle.y += particle.vy * deltaTime * 60;
            particle.life -= deltaTime;
            particle.opacity = particle.life / particle.maxLife;

            return particle.life > 0 &&
                   particle.x > this.camera.smoothX - 100 &&
                   particle.x < this.camera.smoothX + this.canvas.width + 100;
        });

        // Add new wind particles
        if (this.windParticles.length < 50 && Math.random() < 0.3) {
            this.windParticles.push({
                x: this.camera.smoothX + this.canvas.width + 50,
                y: Math.random() * this.canvas.height,
                vx: Math.cos(this.wind.direction) * this.wind.strength * 2 - 20,
                vy: Math.sin(this.wind.direction) * this.wind.strength,
                life: 3 + Math.random() * 2,
                maxLife: 3 + Math.random() * 2,
                opacity: 1,
                size: Math.random() * 3 + 1
            });
        }

        // Update thermal particles
        this.thermals.forEach(thermal => {
            if (thermal.active) {
                thermal.particles = thermal.particles.filter(particle => {
                    particle.y -= particle.speed * deltaTime * 60;
                    particle.life -= deltaTime;
                    particle.opacity = particle.life / particle.maxLife;

                    return particle.life > 0;
                });

                // Add new thermal particles
                if (thermal.particles.length < 20 && Math.random() < 0.5) {
                    thermal.particles.push({
                        x: thermal.x + (Math.random() - 0.5) * thermal.radius,
                        y: thermal.y + thermal.radius,
                        speed: Math.random() * 30 + 20,
                        life: 2 + Math.random(),
                        maxLife: 2 + Math.random(),
                        opacity: 1,
                        size: Math.random() * 4 + 2
                    });
                }
            }
        });
    }

    static checkThermals() {
        this.thermals.forEach(thermal => {
            const distance = Math.sqrt(
                Math.pow(this.glider.x - thermal.x, 2) +
                Math.pow(this.glider.y - thermal.y, 2)
            );

            if (distance < thermal.radius) {
                thermal.active = true;

                // Apply thermal lift
                const liftForce = (1 - distance / thermal.radius) * thermal.strength * this.settings.thermalIntensity;
                this.glider.vy -= liftForce * 0.3;

                // Add some thermal particles around glider
                if (Math.random() < 0.3) {
                    this.particles.push({
                        x: this.glider.x + (Math.random() - 0.5) * 40,
                        y: this.glider.y + (Math.random() - 0.5) * 40,
                        vx: (Math.random() - 0.5) * 10,
                        vy: -Math.random() * 20 - 10,
                        life: 1 + Math.random(),
                        maxLife: 1 + Math.random(),
                        opacity: 1,
                        size: Math.random() * 3 + 1,
                        color: `hsl(${Math.random() * 60 + 20}, 70%, 60%)`
                    });
                }
            } else {
                thermal.active = false;
            }
        });
    }

    static updateGameState() {
        this.gameState.distance = Math.max(0, this.glider.x - 100);
        this.gameState.maxAltitude = Math.max(this.gameState.maxAltitude, Math.max(0, 600 - this.glider.y));

        // Track speed for average calculation
        const currentSpeed = Math.sqrt(this.glider.vx * this.glider.vx + this.glider.vy * this.glider.vy) * 3.6; // Convert to km/h
        this.gameState.speedSamples.push(currentSpeed);

        if (this.gameState.speedSamples.length > 100) {
            this.gameState.speedSamples.shift();
        }

        this.gameState.averageSpeed = this.gameState.speedSamples.reduce((a, b) => a + b, 0) / this.gameState.speedSamples.length;
        this.gameState.totalFlightTime = (Date.now() - this.gameStartTime) / 1000;
    }

    static getGroundHeightAt(x) {
        // Interpolate between mountain points
        for (let i = 0; i < this.mountains.length - 1; i++) {
            if (x >= this.mountains[i].x && x <= this.mountains[i + 1].x) {
                const t = (x - this.mountains[i].x) / (this.mountains[i + 1].x - this.mountains[i].x);
                return this.mountains[i].height + t * (this.mountains[i + 1].height - this.mountains[i].height);
            }
        }
        return 300;
    }

    static render() {
        // Clear canvas with sky gradient
        this.renderSky();

        // Render background elements
        this.renderClouds();
        this.renderMountains();

        // Render wind particles
        this.renderWindParticles();

        // Render thermals
        this.renderThermals();

        // Render glider
        this.renderGlider();

        // Render particles
        this.renderParticles();

        // Render distance markers
        this.renderDistanceMarkers();
    }

    static renderSky() {
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);

        // Dynamic sky colors based on altitude and time
        const timeOfDay = (this.gameState.distance / 1000) % 24;
        let skyColor1, skyColor2;

        if (timeOfDay < 6 || timeOfDay > 20) {
            // Night/twilight
            skyColor1 = '#1a1a2e';
            skyColor2 = '#16213e';
        } else if (timeOfDay < 8 || timeOfDay > 18) {
            // Dawn/dusk
            skyColor1 = '#ff6b9d';
            skyColor2 = '#4ecdc4';
        } else {
            // Day
            skyColor1 = '#87ceeb';
            skyColor2 = '#98d8e8';
        }

        gradient.addColorStop(0, skyColor1);
        gradient.addColorStop(1, skyColor2);

        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    static renderClouds() {
        this.ctx.save();
        this.ctx.translate(-this.camera.smoothX, -this.camera.smoothY);

        this.clouds.forEach(cloud => {
            const cloudX = cloud.x - this.camera.smoothX * cloud.parallax;
            const cloudY = cloud.y;

            if (cloudX > -cloud.size && cloudX < this.canvas.width + cloud.size) {
                this.ctx.globalAlpha = cloud.opacity;
                this.ctx.fillStyle = '#ffffff';

                // Draw fluffy cloud shape
                this.ctx.beginPath();
                this.ctx.arc(cloudX, cloudY, cloud.size * 0.6, 0, Math.PI * 2);
                this.ctx.arc(cloudX + cloud.size * 0.3, cloudY, cloud.size * 0.4, 0, Math.PI * 2);
                this.ctx.arc(cloudX - cloud.size * 0.3, cloudY, cloud.size * 0.4, 0, Math.PI * 2);
                this.ctx.arc(cloudX, cloudY - cloud.size * 0.3, cloud.size * 0.5, 0, Math.PI * 2);
                this.ctx.fill();
            }
        });

        this.ctx.restore();
    }

    static renderMountains() {
        this.ctx.save();
        this.ctx.translate(-this.camera.smoothX, -this.camera.smoothY);

        // Draw mountain silhouette
        this.ctx.beginPath();
        this.ctx.moveTo(this.mountains[0].x, this.canvas.height);

        this.mountains.forEach(mountain => {
            this.ctx.lineTo(mountain.x, mountain.height);
        });

        this.ctx.lineTo(this.mountains[this.mountains.length - 1].x, this.canvas.height);
        this.ctx.closePath();

        const gradient = this.ctx.createLinearGradient(0, 200, 0, 400);
        gradient.addColorStop(0, '#4a7c1a');
        gradient.addColorStop(1, '#2d5a0d');

        this.ctx.fillStyle = gradient;
        this.ctx.fill();

        this.ctx.restore();
    }

    static renderWindParticles() {
        this.ctx.save();
        this.ctx.translate(-this.camera.smoothX, -this.camera.smoothY);

        this.windParticles.forEach(particle => {
            this.ctx.globalAlpha = particle.opacity * 0.6;
            this.ctx.fillStyle = '#ffffff';
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
        });

        this.ctx.restore();
    }

    static renderThermals() {
        this.ctx.save();
        this.ctx.translate(-this.camera.smoothX, -this.camera.smoothY);

        this.thermals.forEach(thermal => {
            if (thermal.active) {
                // Draw thermal area (subtle)
                this.ctx.globalAlpha = 0.1;
                this.ctx.fillStyle = '#ffaa00';
                this.ctx.beginPath();
                this.ctx.arc(thermal.x, thermal.y, thermal.radius, 0, Math.PI * 2);
                this.ctx.fill();

                // Draw thermal particles
                thermal.particles.forEach(particle => {
                    this.ctx.globalAlpha = particle.opacity * 0.8;
                    this.ctx.fillStyle = '#ffaa00';
                    this.ctx.beginPath();
                    this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                    this.ctx.fill();
                });
            }
        });

        this.ctx.restore();
    }

    static renderGlider() {
        this.ctx.save();
        this.ctx.translate(-this.camera.smoothX, -this.camera.smoothY);

        // Draw glider shadow
        this.ctx.globalAlpha = 0.3;
        this.ctx.fillStyle = '#000000';
        const groundY = this.getGroundHeightAt(this.glider.x);
        this.ctx.beginPath();
        this.ctx.ellipse(this.glider.x, groundY - 5, 15, 8, 0, 0, Math.PI * 2);
        this.ctx.fill();

        // Draw glider
        this.ctx.globalAlpha = 1;
        this.ctx.translate(this.glider.x, this.glider.y);
        this.ctx.rotate(this.glider.angle);

        // Glider body
        this.ctx.fillStyle = '#e74c3c';
        this.ctx.fillRect(-12, -3, 24, 6);

        // Wings
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(-8, -12, 16, 8);
        this.ctx.fillRect(-8, 6, 16, 8);

        // Wing details
        this.ctx.strokeStyle = '#333333';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(-8, -8);
        this.ctx.lineTo(8, -8);
        this.ctx.moveTo(-8, 10);
        this.ctx.lineTo(8, 10);
        this.ctx.stroke();

        this.ctx.restore();
    }

    static renderParticles() {
        this.ctx.save();
        this.ctx.translate(-this.camera.smoothX, -this.camera.smoothY);

        this.particles.forEach(particle => {
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.fillStyle = particle.color || '#ffaa00';
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
        });

        this.ctx.restore();
    }

    static renderDistanceMarkers() {
        this.ctx.save();

        // Draw distance markers every 1000m
        for (let dist = 1000; dist <= this.settings.targetDistance + 2000; dist += 1000) {
            const screenX = dist - this.camera.smoothX;

            if (screenX > 0 && screenX < this.canvas.width) {
                this.ctx.strokeStyle = dist <= this.settings.targetDistance ? '#00ff00' : '#ffffff';
                this.ctx.lineWidth = 2;
                this.ctx.setLineDash([5, 5]);

                this.ctx.beginPath();
                this.ctx.moveTo(screenX, 0);
                this.ctx.lineTo(screenX, this.canvas.height);
                this.ctx.stroke();

                // Distance label
                this.ctx.fillStyle = dist <= this.settings.targetDistance ? '#00ff00' : '#ffffff';
                this.ctx.font = 'bold 16px Arial';
                this.ctx.textAlign = 'center';
                this.ctx.fillText(`${dist}m`, screenX, 30);

                if (dist === this.settings.targetDistance) {
                    this.ctx.fillText('🎯 GOAL', screenX, 50);
                }
            }
        }

        this.ctx.setLineDash([]);
        this.ctx.restore();
    }

    static updateUI() {
        const distance = Math.round(this.gameState.distance);
        const altitude = Math.round(Math.max(0, 600 - this.glider.y));
        const speed = Math.round(Math.sqrt(this.glider.vx * this.glider.vx + this.glider.vy * this.glider.vy) * 3.6);
        const windStrength = Math.round(this.wind.strength);

        this.windowElement.querySelector('#distance').textContent = `${distance}m`;
        this.windowElement.querySelector('#altitude').textContent = `${altitude}m`;
        this.windowElement.querySelector('#speed').textContent = `${speed} km/h`;
        this.windowElement.querySelector('#wind-strength').textContent = windStrength;

        // Update wind indicator rotation
        const windIndicator = this.windowElement.querySelector('.wind-arrow');
        windIndicator.style.transform = `rotate(${this.wind.direction * 180 / Math.PI}deg)`;

        // Update thermal indicators
        this.updateThermalIndicators();
    }

    static updateThermalIndicators() {
        const container = this.windowElement.querySelector('#thermal-indicators');
        container.innerHTML = '';

        this.thermals.forEach(thermal => {
            const distance = Math.abs(thermal.x - this.glider.x);

            if (distance < 500 && thermal.y < this.glider.y + 200) {
                const indicator = document.createElement('div');
                indicator.className = `thermal-indicator ${thermal.active ? 'active' : ''}`;
                indicator.style.left = `${Math.max(10, Math.min(90, (thermal.x - this.glider.x + 250) / 5))}%`;
                indicator.innerHTML = thermal.active ? '🌪️' : '💨';
                container.appendChild(indicator);
            }
        });
    }

    static togglePause() {
        this.isPaused = !this.isPaused;
        const pauseBtn = this.windowElement.querySelector('#pause-btn');
        pauseBtn.textContent = this.isPaused ? '▶️ Resume' : '⏸️ Pause';
    }

    static restartGame() {
        // Reset glider
        this.glider = {
            x: 100,
            y: 400,
            vx: 15,
            vy: 0,
            angle: 0,
            size: 20
        };

        // Reset camera
        this.camera = {
            x: 0,
            y: 0,
            smoothX: 0,
            smoothY: 0
        };

        // Reset game state
        this.gameState = {
            distance: 0,
            maxAltitude: 100,
            totalFlightTime: 0,
            averageSpeed: 0,
            speedSamples: []
        };

        // Regenerate elements
        this.generateThermals();
        this.particles = [];
        this.windParticles = [];

        // Reset timer
        this.gameStartTime = Date.now();

        // Show instructions again
        this.windowElement.querySelector('#instructions').style.opacity = '1';

        this.isPaused = false;
        this.windowElement.querySelector('#pause-btn').textContent = '⏸️ Pause';
    }

    static showSettings() {
        this.windowElement.querySelector('#settings-panel').style.display = 'block';
        this.isPaused = true;
    }

    static hideSettings() {
        this.windowElement.querySelector('#settings-panel').style.display = 'none';
        this.isPaused = false;
    }

    static applySettings() {
        this.settings.windStrength = parseFloat(this.windowElement.querySelector('#wind-setting').value);
        this.settings.thermalIntensity = parseFloat(this.windowElement.querySelector('#thermal-setting').value);
        this.settings.targetDistance = parseInt(this.windowElement.querySelector('#distance-setting').value);
        this.settings.quality = this.windowElement.querySelector('#quality-setting').value;

        // Apply wind strength
        this.wind.strength = this.settings.windStrength;

        // Update goal display
        this.updateGoalDisplay();

        this.hideSettings();

        if (window.Notification) {
            window.Notification.success('Settings applied successfully!');
        }
    }

    static updateGoalDisplay() {
        this.windowElement.querySelector('#goal').textContent = `${this.settings.targetDistance}m`;
        this.windowElement.querySelector('#goal-text').textContent = `${this.settings.targetDistance}m`;
    }

    static completeJourney() {
        this.showCompletionModal();
    }

    static showCompletionModal() {
        const modal = this.windowElement.querySelector('#completion-modal');
        const minutes = Math.floor(this.gameState.totalFlightTime / 60);
        const seconds = Math.floor(this.gameState.totalFlightTime % 60);

        this.windowElement.querySelector('#final-distance').textContent = `${Math.round(this.gameState.distance)}m`;
        this.windowElement.querySelector('#flight-time').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        this.windowElement.querySelector('#max-altitude').textContent = `${Math.round(this.gameState.maxAltitude)}m`;
        this.windowElement.querySelector('#avg-speed').textContent = `${Math.round(this.gameState.averageSpeed)} km/h`;

        modal.style.display = 'flex';
        this.isPaused = true;
    }

    static hideCompletionModal() {
        this.windowElement.querySelector('#completion-modal').style.display = 'none';
        this.isPaused = false;
    }

    static cleanup() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }

    static getStyles() {
        return `
            <style>
                .zen-glider-container {
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    position: relative;
                    overflow: hidden;
                }

                .game-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 10px 15px;
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(10px);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
                    color: white;
                    font-size: 14px;
                }

                .game-info {
                    display: flex;
                    gap: 25px;
                    align-items: center;
                }

                .distance-display, .altitude-display, .speed-display, .goal-display {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    min-width: 70px;
                }

                .label {
                    font-size: 11px;
                    opacity: 0.8;
                    margin-bottom: 2px;
                }

                .value {
                    font-weight: bold;
                    font-size: 16px;
                    color: #00ff88;
                }

                .game-controls {
                    display: flex;
                    gap: 8px;
                }

                .control-btn {
                    padding: 6px 12px;
                    background: rgba(255, 255, 255, 0.2);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    border-radius: 6px;
                    color: white;
                    cursor: pointer;
                    font-size: 12px;
                    transition: all 0.3s ease;
                }

                .control-btn:hover {
                    background: rgba(255, 255, 255, 0.3);
                    transform: translateY(-1px);
                }

                .game-canvas-container {
                    position: relative;
                    width: 100%;
                    height: calc(100% - 60px);
                    overflow: hidden;
                }

                #game-canvas {
                    width: 100%;
                    height: 100%;
                    cursor: crosshair;
                    display: block;
                }

                .wind-indicator {
                    position: absolute;
                    top: 15px;
                    left: 15px;
                    background: rgba(0, 0, 0, 0.7);
                    padding: 10px;
                    border-radius: 8px;
                    color: white;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-size: 12px;
                }

                .wind-arrow {
                    width: 20px;
                    height: 20px;
                    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M12 2l8 8h-6v8h-4v-8H4z"/></svg>') center/contain no-repeat;
                    transition: transform 0.3s ease;
                }

                .thermal-indicators {
                    position: absolute;
                    bottom: 15px;
                    left: 15px;
                    right: 15px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                }

                .thermal-indicator {
                    position: absolute;
                    font-size: 20px;
                    transition: all 0.3s ease;
                    opacity: 0.7;
                }

                .thermal-indicator.active {
                    opacity: 1;
                    animation: pulse 1s infinite;
                }

                .instructions {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: rgba(0, 0, 0, 0.8);
                    color: white;
                    padding: 20px;
                    border-radius: 12px;
                    text-align: center;
                    transition: opacity 0.5s ease;
                    pointer-events: none;
                    backdrop-filter: blur(10px);
                }

                .instruction-text {
                    line-height: 1.6;
                    font-size: 14px;
                }

                .settings-panel {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: rgba(255, 255, 255, 0.95);
                    padding: 25px;
                    border-radius: 15px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                    backdrop-filter: blur(10px);
                    min-width: 350px;
                    display: none;
                    z-index: 1000;
                }

                .settings-panel h3 {
                    margin: 0 0 20px 0;
                    color: #333;
                    text-align: center;
                }

                .setting-group {
                    margin-bottom: 15px;
                }

                .setting-group label {
                    display: block;
                    margin-bottom: 8px;
                    color: #555;
                    font-weight: 600;
                }

                .setting-group input[type="range"] {
                    width: 100%;
                    margin: 5px 0;
                }

                .setting-group select {
                    width: 100%;
                    padding: 8px;
                    border: 1px solid #ddd;
                    border-radius: 6px;
                    background: white;
                }

                .settings-actions {
                    display: flex;
                    gap: 10px;
                    justify-content: center;
                    margin-top: 20px;
                }

                .apply-btn, .close-btn {
                    padding: 10px 20px;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 600;
                    transition: all 0.3s ease;
                }

                .apply-btn {
                    background: #00ff88;
                    color: #000;
                }

                .close-btn {
                    background: #ff6b6b;
                    color: white;
                }

                .apply-btn:hover {
                    background: #00dd77;
                    transform: translateY(-2px);
                }

                .close-btn:hover {
                    background: #ff5252;
                    transform: translateY(-2px);
                }

                .completion-modal {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.8);
                    display: none;
                    align-items: center;
                    justify-content: center;
                    z-index: 2000;
                }

                .modal-content {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 30px;
                    border-radius: 20px;
                    text-align: center;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    max-width: 400px;
                    width: 90%;
                }

                .completion-icon {
                    font-size: 60px;
                    margin-bottom: 20px;
                    animation: bounce 2s infinite;
                }

                .modal-content h2 {
                    margin: 0 0 25px 0;
                    font-size: 28px;
                    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
                }

                .completion-stats {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 15px;
                    margin-bottom: 25px;
                }

                .stat {
                    background: rgba(255, 255, 255, 0.1);
                    padding: 12px;
                    border-radius: 10px;
                    backdrop-filter: blur(5px);
                }

                .stat-label {
                    display: block;
                    font-size: 12px;
                    opacity: 0.8;
                    margin-bottom: 5px;
                }

                .stat-value {
                    display: block;
                    font-size: 18px;
                    font-weight: bold;
                    color: #00ff88;
                }

                .completion-actions {
                    display: flex;
                    gap: 15px;
                    justify-content: center;
                }

                .restart-journey-btn, .continue-btn {
                    padding: 12px 20px;
                    border: none;
                    border-radius: 10px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-size: 14px;
                }

                .restart-journey-btn {
                    background: #ff6b6b;
                    color: white;
                }

                .continue-btn {
                    background: #00ff88;
                    color: #000;
                }

                .restart-journey-btn:hover, .continue-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                }

                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.2); }
                }

                @keyframes bounce {
                    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                    40% { transform: translateY(-10px); }
                    60% { transform: translateY(-5px); }
                }

                /* Mobile responsive */
                @media (max-width: 768px) {
                    .game-header {
                        flex-direction: column;
                        gap: 10px;
                        padding: 8px;
                    }

                    .game-info {
                        gap: 15px;
                        font-size: 12px;
                    }

                    .control-btn {
                        padding: 4px 8px;
                        font-size: 11px;
                    }

                    .settings-panel {
                        width: 95%;
                        min-width: unset;
                    }

                    .completion-stats {
                        grid-template-columns: 1fr;
                    }

                    .completion-actions {
                        flex-direction: column;
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

window.EmberFrame.registerApp('game-zen-glider', ZenGlider);