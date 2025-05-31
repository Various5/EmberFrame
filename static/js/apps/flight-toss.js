/**
 * APP_METADATA
 * @name FlightToss
 * @icon fas fa-rocket
 * @description A polished “learn to fly/toss the turtle” style game with vibrant visuals: launch your character, earn money, buy upgrades, and enjoy endless gameplay. Includes rich backgrounds, particle trails, and an elegant UI.
 * @category Games
 * @version 1.1.0
 * @author EmberFrame Team
 * @enabled true
 */

class FlightToss {
  // ────────────────────────────────────────────────────────────────────────────────
  // Static properties / game state
  static _container = null;
  static _canvas = null;
  static _ctx = null;
  static _width = 800;
  static _height = 500;
  static _groundY = 400;            // y-coordinate of ground
  static _requestId = null;

  // Launch & physics
  static _angle = 45;               // degrees
  static _power = 50;               // base power multiplier
  static _initialSpeed = 15;        // base speed (multiplied by _power)
  static _velX = 0;
  static _velY = 0;
  static _posX = 0;
  static _posY = 0;
  static _gravity = 0.6;            // gravity acceleration
  static _drag = 0.005;             // air resistance coefficient

  // Rocket upgrade
  static _rocketFuel = 0;           // seconds of rocket boost
  static _rocketThrust = 0.3;       // extra acceleration when boosting
  static _canBoost = false;         // whether boost is available during flight

  // Distance tracking
  static _distance = 0;
  static _bestDistance = 0;

  // Currency & upgrades
  static _money = 0;
  static _upgrades = {
    powerLevel: 0,
    powerCost: 100,      // initial cost
    dragLevel: 0,
    dragCost: 120,
    rocketLevel: 0,
    rocketCost: 150
  };

  // Game phases: 'ready', 'flying', 'landed'
  static _state = 'ready';

  // Background parallax offsets
  static _cloudOffset = 0;
  static _cloudOffset2 = 0;
  static _mountainOffset = 0;

  // Particle system
  static _particles = [];

  // UI elements
  static _angleInput = null;
  static _powerInput = null;
  static _launchButton = null;
  static _moneyDisplay = null;
  static _distanceDisplay = null;
  static _bestDisplay = null;
  static _upgradePanel = null;
  static _overlay = null;

  // Timing
  static _lastTime = 0;

  // Fonts & styling
  static _fontMain = '16px "Rajdhani", sans-serif';
  static _fontLarge = 'bold 24px "Rajdhani", sans-serif';
  static _fontXL = 'bold 36px "Rajdhani", sans-serif';

  // ────────────────────────────────────────────────────────────────────────────────
  // Create EmberFrame window
  static createWindow() {
    return {
      title: 'FlightToss',
      width: '820px',
      height: '540px',
      content: this._createHTML(),
      onInit: (win) => {
        this._container = win;
        this._initialize();
      },
      onDestroy: () => {
        this._cleanup();
      }
    };
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // Build HTML structure: canvas, controls, upgrade panel
  static _createHTML() {
    return `
      <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;600&display=swap" rel="stylesheet">
      <style>
        body, html, #flighttoss-container { margin:0; padding:0; }
        #flighttoss-container { font-family:'Rajdhani', sans-serif; user-select:none; background:#87CEEB; width:100%; height:100%; display:flex; flex-direction:column; overflow:hidden; }
        #ft-game-area { background:linear-gradient(to top, #87CEEB 60%, #FFFFFF 100%); position:relative; }
        #ft-canvas { display:block; margin:0 auto; background:#87CEEB; border:2px solid #34495e; border-radius:8px; box-shadow:0 0 12px rgba(0,0,0,0.3); }
        #ft-overlay { position:absolute; top:0; left:50%; transform:translateX(-50%); width:${this._width}px; height:${this._height - 100}px; display:none; align-items:center; justify-content:center; color:#fff; font-size:48px; text-shadow:2px 2px 6px #000; white-space:pre-line; pointer-events:none; }
        #ft-controls { flex:1; display:flex; background:#ecf0f1; border-top:2px solid #34495e; padding:10px; }
        #ft-left-panel { flex:2; display:flex; flex-direction:column; justify-content:center; padding-left:20px; }
        #ft-left-panel div { margin-bottom:10px; color:#2c3e50; font-size:14px; }
        #ft-angle, #ft-power { width:200px; }
        #ft-angle::-webkit-slider-thumb, #ft-power::-webkit-slider-thumb { background:#e74c3c; }
        #ft-launch { padding:10px 20px; background:#e74c3c; color:#fff; border:none; border-radius:6px; font-size:16px; cursor:pointer; box-shadow:0 2px 4px rgba(0,0,0,0.2); transition:background 0.2s; }
        #ft-launch:hover { background:#c0392b; }
        #ft-left-panel span { font-weight:600; }
        #ft-left-panel small { font-size:12px; color:#7f8c8d; }
        #ft-upgrade-list { display:flex; flex-direction:column; gap:12px; }
        .ft-upgrade-item { display:flex; justify-content:space-between; align-items:center; background:#fff; border:2px solid #bdc3c7; border-radius:6px; padding:10px; box-shadow:0 2px 4px rgba(0,0,0,0.1); }
        .ft-upgrade-item div { color:#2c3e50; font-size:14px; }
        .ft-upgrade-item div small { font-size:12px; color:#7f8c8d; display:block; }
        .ft-upgrade-item button { padding:6px 12px; background:#27ae60; color:#fff; border:none; border-radius:4px; cursor:pointer; font-size:14px; transition:background 0.2s; }
        .ft-upgrade-item button:hover { background:#1e8449; }
        #ft-upgrade-list i { margin-right:6px; color:#e67e22; }
      </style>
      <div id="flighttoss-container">
        <!-- Top: Canvas -->
        <div id="ft-game-area" style="height:80%;">
          <canvas id="ft-canvas" width="${this._width}" height="${this._height - 100}"></canvas>
          <div id="ft-overlay"></div>
        </div>
        <!-- Bottom: Controls & Upgrades -->
        <div id="ft-controls" style="height:20%;">
          <!-- Left: Launch Controls -->
          <div id="ft-left-panel">
            <div>Angle: <input id="ft-angle" type="range" min="10" max="80" value="45" />
              <span id="ft-angle-display">45°</span></div>
            <div>Power: <input id="ft-power" type="range" min="10" max="100" value="50" />
              <span id="ft-power-display">50%</span></div>
            <button id="ft-launch">Launch &#9658;</button>
            <div style="margin-top:10px;">
              <div>Money: $<span id="ft-money">0</span></div>
              <div>Distance: <span id="ft-distance">0</span> m</div>
              <div>Best: <span id="ft-best">0</span> m</div>
            </div>
          </div>
          <!-- Right: Upgrades -->
          <div id="ft-upgrades" style="flex:3; padding-left:20px; border-left:2px solid #bdc3c7;">
            <div style="font-size:18px; font-weight:600; margin-bottom:8px; color:#2c3e50;">Upgrades</div>
            <div id="ft-upgrade-list"></div>
          </div>
        </div>
      </div>
    `;
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // Initialize game: references, event listeners, start loop
  static _initialize() {
    // Canvas
    this._canvas = this._container.querySelector('#ft-canvas');
    this._ctx = this._canvas.getContext('2d');

    // UI references
    this._angleInput = this._container.querySelector('#ft-angle');
    this._powerInput = this._container.querySelector('#ft-power');
    this._launchButton = this._container.querySelector('#ft-launch');
    this._moneyDisplay = this._container.querySelector('#ft-money');
    this._distanceDisplay = this._container.querySelector('#ft-distance');
    this._bestDisplay = this._container.querySelector('#ft-best');
    this._upgradePanel = this._container.querySelector('#ft-upgrade-list');
    this._overlay = this._container.querySelector('#ft-overlay');

    // Angle slider
    this._angleInput.addEventListener('input', (e) => {
      this._angle = parseInt(e.target.value);
      this._container.querySelector('#ft-angle-display').textContent = `${this._angle}°`;
    });
    // Power slider
    this._powerInput.addEventListener('input', (e) => {
      this._power = parseInt(e.target.value);
      this._container.querySelector('#ft-power-display').textContent = `${this._power}%`;
    });
    // Launch button
    this._launchButton.addEventListener('click', () => {
      if (this._state === 'ready' || this._state === 'landed') {
        this._startFlight();
      }
    });

    // Build upgrade buttons
    this._buildUpgradeUI();

    // Initialize costs, money, etc.
    this._money = 0;
    this._distance = 0;
    this._bestDistance = 0;
    this._updateStats();

    // Set initial state
    this._state = 'ready';

    // Initial draw of background & UI
    this._draw();

    // Start animation loop
    this._lastTime = performance.now();
    this._loop(this._lastTime);

    // Key listener for rocket boost
    window.addEventListener('keydown', (e) => {
      if (this._state === 'flying' && (e.code === 'Space') && this._rocketFuel > 0) {
        this._canBoost = true;
      }
    });
    window.addEventListener('keyup', (e) => {
      if (e.code === 'Space') {
        this._canBoost = false;
      }
    });
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // Build the upgrade UI dynamically
  static _buildUpgradeUI() {
    // Clear any existing
    this._upgradePanel.innerHTML = '';

    // Power Upgrade
    const powerDiv = document.createElement('div');
    powerDiv.classList.add('ft-upgrade-item');
    powerDiv.innerHTML = `
      <div><i class="fas fa-bolt"></i> <strong>Power</strong><br><small>Level: <span id="ft-upg-power-level">0</span></small></div>
      <button id="ft-buy-power">$${this._upgrades.powerCost}</button>
    `;
    this._upgradePanel.appendChild(powerDiv);
    powerDiv.querySelector('#ft-buy-power').addEventListener('click', () => this._buyUpgrade('power'));

    // Drag (Streamlining) Upgrade
    const dragDiv = document.createElement('div');
    dragDiv.classList.add('ft-upgrade-item');
    dragDiv.innerHTML = `
      <div><i class="fas fa-wind"></i> <strong>Streamlining</strong><br><small>Level: <span id="ft-upg-drag-level">0</span></small></div>
      <button id="ft-buy-drag">$${this._upgrades.dragCost}</button>
    `;
    this._upgradePanel.appendChild(dragDiv);
    dragDiv.querySelector('#ft-buy-drag').addEventListener('click', () => this._buyUpgrade('drag'));

    // Rocket Upgrade
    const rocketDiv = document.createElement('div');
    rocketDiv.classList.add('ft-upgrade-item');
    rocketDiv.innerHTML = `
      <div><i class="fas fa-rocket"></i> <strong>Rocket</strong><br><small>Level: <span id="ft-upg-rocket-level">0</span></small></div>
      <button id="ft-buy-rocket">$${this._upgrades.rocketCost}</button>
    `;
    this._upgradePanel.appendChild(rocketDiv);
    rocketDiv.querySelector('#ft-buy-rocket').addEventListener('click', () => this._buyUpgrade('rocket'));
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // Purchase an upgrade if money allows
  static _buyUpgrade(type) {
    switch (type) {
      case 'power':
        if (this._money >= this._upgrades.powerCost) {
          this._money -= this._upgrades.powerCost;
          this._upgrades.powerLevel++;
          this._upgrades.powerCost = Math.floor(this._upgrades.powerCost * 1.5);
          this._initialSpeed += 2; // increase base speed
          this._container.querySelector('#ft-upg-power-level').textContent = this._upgrades.powerLevel;
          this._container.querySelector('#ft-buy-power').textContent = `$${this._upgrades.powerCost}`;
        }
        break;
      case 'drag':
        if (this._money >= this._upgrades.dragCost) {
          this._money -= this._upgrades.dragCost;
          this._upgrades.dragLevel++;
          this._upgrades.dragCost = Math.floor(this._upgrades.dragCost * 1.5);
          this._drag = Math.max(0.001, this._drag - 0.001); // reduce drag
          this._container.querySelector('#ft-upg-drag-level').textContent = this._upgrades.dragLevel;
          this._container.querySelector('#ft-buy-drag').textContent = `$${this._upgrades.dragCost}`;
        }
        break;
      case 'rocket':
        if (this._money >= this._upgrades.rocketCost) {
          this._money -= this._upgrades.rocketCost;
          this._upgrades.rocketLevel++;
          this._upgrades.rocketCost = Math.floor(this._upgrades.rocketCost * 1.5);
          this._rocketFuel += 3; // 3 seconds of rocket
          this._container.querySelector('#ft-upg-rocket-level').textContent = this._upgrades.rocketLevel;
          this._container.querySelector('#ft-buy-rocket').textContent = `$${this._upgrades.rocketCost}`;
        }
        break;
    }
    this._updateStats();
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // Start a new flight: reset position & physics
  static _startFlight() {
    // Reset physics
    this._posX = 50;
    this._posY = this._groundY - 10; // 10 px above ground
    const rad = this._angle * Math.PI / 180;
    const speed = this._initialSpeed * (this._power / 50); // scale speed by power (50% = base)
    this._velX = speed * Math.cos(rad);
    this._velY = -speed * Math.sin(rad);

    // Reset flight-specific
    this._distance = 0;
    this._rocketFuel += this._upgrades.rocketLevel * 2; // extra fuel based on rocket level
    this._state = 'flying';
    this._overlay.style.display = 'none';

    this._updateStats();
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // Main loop: update physics, update background, draw
  static _loop(timestamp) {
    const delta = timestamp - this._lastTime;
    this._lastTime = timestamp;

    // Update parallax backgrounds smoothly
    this._cloudOffset = (this._cloudOffset + 0.6) % (this._width + 200);
    this._cloudOffset2 = (this._cloudOffset2 + 0.3) % (this._width + 200);
    this._mountainOffset = (this._mountainOffset + 0.2) % (this._width + 400);

    if (this._state === 'flying') {
      this._updatePhysics(delta / 16); // normalize to ~60fps units
    }

    this._draw();
    this._requestId = requestAnimationFrame(this._loop.bind(this));
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // Update physics: gravity, drag, rocket boost, generate particles
  static _updatePhysics(dt) {
    // Rocket boost when space held
    if (this._canBoost && this._rocketFuel > 0) {
      this._velY -= this._rocketThrust * dt;
      this._rocketFuel -= 0.02 * dt;
      if (this._rocketFuel < 0) this._rocketFuel = 0;
      // Spawn fire particles behind rocket
      this._spawnParticle(this._posX - 5, this._posY + 5);
    }
    // Apply drag proportional to velocity squared
    const speed = Math.sqrt(this._velX ** 2 + this._velY ** 2);
    const dragAccX = this._drag * this._velX * speed;
    const dragAccY = this._drag * this._velY * speed;

    // Update velocities
    this._velX -= dragAccX * dt;
    this._velY += this._gravity * dt - dragAccY * dt;

    // Update positions
    this._posX += this._velX * dt;
    this._posY += this._velY * dt;

    // Track distance (horizontal)
    if (this._posX > this._distance) {
      this._distance = this._posX;
      if (this._distance > this._bestDistance) {
        this._bestDistance = this._distance;
      }
    }

    // Check for landing (hit ground)
    if (this._posY >= this._groundY - 10) {
      this._posY = this._groundY - 10;
      this._state = 'landed';
      this._endFlight();
    }

    // Update particles
    for (let i = this._particles.length - 1; i >= 0; i--) {
      const p = this._particles[i];
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.life -= dt * 0.1;
      if (p.life <= 0) this._particles.splice(i, 1);
    }
  }

  // Spawn a new fire particle at (x, y)
  static _spawnParticle(x, y) {
    const angle = Math.random() * Math.PI - Math.PI / 2;
    const speed = Math.random() * 1 + 0.5;
    this._particles.push({
      x: x,
      y: y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 0.5,
      life: Math.random() * 20 + 20,
      size: Math.random() * 4 + 4,
      alpha: 1.0
    });
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // End of flight: award money, show overlay, update stats
  static _endFlight() {
    const earned = Math.floor(this._distance / 10);
    this._money += earned;
    this._playSound('line'); // use line sound as celebratory
    this._updateStats();
    this._showOverlay(`Distance: ${Math.floor(this._distance)} m\nEarned: $${earned}`);
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // Draw game elements: sky, sun, mountains, clouds, ground, particles, projectile
  static _draw() {
    // Clear canvas
    this._ctx.clearRect(0, 0, this._width, this._height - 100);

    // Draw sky gradient
    const skyGrad = this._ctx.createLinearGradient(0, 0, 0, this._groundY);
    skyGrad.addColorStop(0, '#87CEEB');
    skyGrad.addColorStop(1, '#FFFFFF');
    this._ctx.fillStyle = skyGrad;
    this._ctx.fillRect(0, 0, this._width, this._groundY);

    // Draw sun
    this._ctx.save();
    this._ctx.beginPath();
    this._ctx.arc(this._width - 100, 80, 40, 0, Math.PI * 2);
    const sunGrad = this._ctx.createRadialGradient(this._width - 100, 80, 10, this._width - 100, 80, 40);
    sunGrad.addColorStop(0, '#FFF176');
    sunGrad.addColorStop(1, '#FFB300');
    this._ctx.fillStyle = sunGrad;
    this._ctx.fill();
    this._ctx.restore();

    // Draw distant mountains (parallax)
    this._drawMountains();

    // Draw moving clouds (two layers)
    this._drawCloudLayer(this._cloudOffset, 60, 0.8);
    this._drawCloudLayer(this._cloudOffset2, 100, 0.6);

    // Draw ground
    this._ctx.fillStyle = '#2ECC71';
    this._ctx.fillRect(0, this._groundY, this._width, (this._height - 100) - this._groundY);

    // Draw trees on ground
    this._drawTrees();

    // Draw particles
    this._drawParticles();

    // Draw projectile (a stylized rocket with glow)
    if (this._state === 'flying' || this._state === 'landed') {
      this._ctx.save();
      this._ctx.shadowColor = 'rgba(255,165,0,0.7)';
      this._ctx.shadowBlur = 12;
      // Rocket body
      this._ctx.fillStyle = '#E67E22';
      this._ctx.beginPath();
      this._ctx.moveTo(this._posX - 8, this._posY + 10);
      this._ctx.lineTo(this._posX + 8, this._posY + 10);
      this._ctx.lineTo(this._posX + 4, this._posY - 10);
      this._ctx.lineTo(this._posX - 4, this._posY - 10);
      this._ctx.closePath();
      this._ctx.fill();
      // Window
      this._ctx.fillStyle = '#fff';
      this._ctx.beginPath();
      this._ctx.arc(this._posX, this._posY - 2, 3, 0, Math.PI * 2);
      this._ctx.fill();
      this._ctx.restore();
    }

    // Draw UI over canvas (distance and fuel bars)
    this._ctx.fillStyle = 'rgba(0,0,0,0.5)';
    this._ctx.fillRect(0, 0, this._width, 30);
    this._ctx.fillStyle = '#fff';
    this._ctx.font = this._fontMain;
    this._ctx.fillText(`Distance: ${Math.floor(this._distance)} m`, 10, 20);
    this._ctx.fillText(`Best: ${Math.floor(this._bestDistance)} m`, 200, 20);
    // Fuel bar background
    this._ctx.fillStyle = '#555';
    this._ctx.fillRect(380, 10, 150, 10);
    // Fuel bar fill
    const fuelWidth = Math.max(0, Math.min(150, (this._rocketFuel / 10) * 150));
    this._ctx.fillStyle = '#e74c3c';
    this._ctx.fillRect(380, 10, fuelWidth, 10);
    this._ctx.strokeStyle = '#fff';
    this._ctx.strokeRect(380, 10, 150, 10);
  }

  // Draw mountain silhouettes with parallax
  static _drawMountains() {
    // Far mountains
    this._ctx.save();
    this._ctx.fillStyle = '#8D6E63';
    this._ctx.beginPath();
    const offset1 = this._mountainOffset % (this._width + 400) - 400;
    this._ctx.moveTo(offset1, this._groundY);
    this._ctx.lineTo(offset1 + 100, this._groundY - 60);
    this._ctx.lineTo(offset1 + 200, this._groundY - 20);
    this._ctx.lineTo(offset1 + 300, this._groundY - 80);
    this._ctx.lineTo(offset1 + 400, this._groundY - 40);
    this._ctx.lineTo(offset1 + 500, this._groundY - 100);
    this._ctx.lineTo(offset1 + 600, this._groundY - 50);
    this._ctx.lineTo(offset1 + 800, this._groundY - 120);
    this._ctx.lineTo(offset1 + 1000, this._groundY);
    this._ctx.lineTo(offset1 + 1000, this._groundY + 200);
    this._ctx.lineTo(offset1, this._groundY + 200);
    this._ctx.closePath();
    this._ctx.fill();
    this._ctx.restore();
    // Near mountains
    this._ctx.save();
    this._ctx.fillStyle = '#6D4C41';
    this._ctx.beginPath();
    const offset2 = (this._mountainOffset * 1.5) % (this._width + 500) - 500;
    this._ctx.moveTo(offset2, this._groundY);
    this._ctx.lineTo(offset2 + 150, this._groundY - 80);
    this._ctx.lineTo(offset2 + 300, this._groundY - 40);
    this._ctx.lineTo(offset2 + 450, this._groundY - 120);
    this._ctx.lineTo(offset2 + 600, this._groundY - 60);
    this._ctx.lineTo(offset2 + 800, this._groundY - 140);
    this._ctx.lineTo(offset2 + 1000, this._groundY);
    this._ctx.lineTo(offset2 + 1000, this._groundY + 200);
    this._ctx.lineTo(offset2, this._groundY + 200);
    this._ctx.closePath();
    this._ctx.fill();
    this._ctx.restore();
  }

  // Draw a layer of clouds given offset, vertical position, and opacity
  static _drawCloudLayer(offset, yBase, alpha) {
    this._ctx.save();
    this._ctx.globalAlpha = alpha;
    for (let i = 0; i < 3; i++) {
      const x = (offset + i * 300) % (this._width + 200) - 100;
      const y = yBase + (i % 2) * 20;
      this._drawCloud(x, y);
    }
    this._ctx.restore();
  }

  // Draw a single cloud shape
  static _drawCloud(x, y) {
    this._ctx.fillStyle = 'rgba(255,255,255,0.8)';
    this._ctx.beginPath();
    this._ctx.arc(x, y, 20, Math.PI * 0.5, Math.PI * 1.5);
    this._ctx.arc(x + 30, y - 20, 25, Math.PI * 1.0, Math.PI * 1.85);
    this._ctx.arc(x + 60, y - 10, 20, Math.PI * 1.37, Math.PI * 1.91);
    this._ctx.arc(x + 60, y + 10, 20, Math.PI * 1.5, Math.PI * 0.5);
    this._ctx.moveTo(x + 60, y + 30);
    this._ctx.lineTo(x, y + 30);
    this._ctx.fill();
  }

  // Draw small trees on the ground
  static _drawTrees() {
    this._ctx.fillStyle = '#4E342E';
    for (let i = 0; i < this._width; i += 80) {
      this._ctx.fillRect(i + 20, this._groundY - 20, 10, 20);
      this._ctx.fillStyle = '#388E3C';
      this._ctx.beginPath();
      this._ctx.moveTo(i + 25, this._groundY - 40);
      this._ctx.lineTo(i + 5, this._groundY - 20);
      this._ctx.lineTo(i + 45, this._groundY - 20);
      this._ctx.closePath();
      this._ctx.fill();
      this._ctx.fillStyle = '#4E342E';
    }
  }

  // Draw and fade out particles
  static _drawParticles() {
    for (const p of this._particles) {
      const alpha = p.life / 30;
      this._ctx.save();
      this._ctx.globalAlpha = alpha;
      this._ctx.fillStyle = '#FF6F00';
      this._ctx.beginPath();
      this._ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this._ctx.fill();
      this._ctx.restore();
    }
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // Show overlay message (Flight results)
  static _showOverlay(message) {
    this._overlay.style.display = 'flex';
    this._overlay.style.flexDirection = 'column';
    this._overlay.textContent = message;
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // Update money, distance, best distance in UI
  static _updateStats() {
    this._moneyDisplay.textContent = this._money;
    this._distanceDisplay.textContent = Math.floor(this._distance);
    this._bestDisplay.textContent = Math.floor(this._bestDistance);
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // Utility: shade or tint a hex color by a percentage
  static _shadeColor(color, percent) {
    const f = parseInt(color.slice(1),16),
          t = percent<0?0:255,
          p = percent<0?percent*-1:percent,
          R = f>>16,
          G = f>>8&0x00FF,
          B = f&0x0000FF;
    const newR = Math.round((t - R) * p) + R;
    const newG = Math.round((t - G) * p) + G;
    const newB = Math.round((t - B) * p) + B;
    return "#" + (0x1000000 + (newR<<16) + (newG<<8) + newB).toString(16).slice(1);
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // Cleanup on window close: cancel loops, remove listeners
  static _cleanup() {
    cancelAnimationFrame(this._requestId);
    window.removeEventListener('keydown', () => {});
    window.removeEventListener('keyup', () => {});
    this._container = null;
    this._canvas = null;
    this._ctx = null;
  }
}

// Expose globally for EmberFrame
window.FlightToss = FlightToss;
