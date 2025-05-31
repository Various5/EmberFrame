/**
 * APP_METADATA
 * @name PlatformerQuest
 * @icon fas fa-gamepad
 * @description A colorful, polished jump-and-run arcade game with dynamic parallax backgrounds, smooth animations, explosive effects, punch & shoot combat, collectible coins, and multi-level progression aiming for high scores.
 * @category Games
 * @version 1.5.0
 * @author EmberFrame Team
 * @enabled true
 */

class PlatformerQuest {
  // ────────────────────────────────────────────────────────────────
  // Static properties for game state
  static _container = null;
  static _canvas = null;
  static _ctx = null;
  static _width = 800;
  static _height = 500;
  static _windowElement = null;
  static _isWindowActive = true;
  static _isMobile = false;

  // Parallax background layers
  static _bgLayers = [];
  static _clouds = [];

  // Player properties
  static _player = {
    x: 50,
    y: 0,
    width: 32,
    height: 48,
    vx: 0,
    vy: 0,
    speed: 240,          // horizontal speed (pixels/sec)
    jumpStrength: 620,   // increased jump to reach platforms easily
    color: '#2196F3',
    onGround: false,
    facing: 1,           // 1 = right, -1 = left
    isAttacking: false,
    attackTimer: 0,
    attackDuration: 200, // ms for punch
    attackCooldown: 0,   // ms
    dodgeCooldown: 0,    // ms
    isDodging: false,
    dodgeTimer: 0,
    dodgeDuration: 300,  // ms
    dashSpeed: 600,
    health: 5,
    maxHealth: 5,
    shootCooldown: 0     // ms between shots
  };

  // Player bullets
  static _playerBullets = [];

  // Explosion effects (particles)
  static _explosions = [];

  // Game world
  static _cameraX = 0;
  static _gravity = 1200; // pixels/sec^2

  // Enemy bullets
  static _enemyBullets = [];

  // Coins
  static _coins = [];

  // Enhanced levels with platforms, coins, enemies
  static _levels = [
    {
      name: "Forest Entry",
      length: 2000,
      // Parallax colors: sky gradient, distant hills, forest
      bgColorTop: '#6FC3DF',
      bgColorBottom: '#A0E9AF',
      platforms: [
        { x: 0,   y: 430, width: 2000, height: 50, color: '#3B6E47' },  // ground
        { x: 300, y: 360, width: 100,  height: 20, color: '#8B4513' },
        { x: 600, y: 310, width: 120,  height: 20, color: '#8B4513' },
        { x:1000, y: 360, width: 100,  height: 20, color: '#8B4513' },
        { x:1300, y: 310, width: 100,  height: 20, color: '#8B4513' },
        { x:1600, y: 360, width: 150,  height: 20, color: '#8B4513' }
      ],
      enemies: [
        { x: 400, y: 398, width: 32, height: 32, alive: true, color: '#E74C3C', patrolMin: 350, patrolMax: 450, dir: 1, speed: 80, bulletTimer: 0, bulletInterval: 2000 },
        { x: 650, y: 348, width: 32, height: 32, alive: true, color: '#E74C3C', patrolMin: 600, patrolMax: 700, dir: 1, speed: 90, bulletTimer: 0, bulletInterval: 1800 },
        { x:1100, y: 398, width: 32, height: 32, alive: true, color: '#E74C3C', patrolMin: 1050, patrolMax: 1150, dir: 1, speed: 85, bulletTimer: 0, bulletInterval: 2200 },
        { x:1400, y: 348, width: 32, height: 32, alive: true, color: '#E74C3C', patrolMin: 1350, patrolMax: 1450, dir: 1, speed: 95, bulletTimer: 0, bulletInterval: 2000 },
        { x:1750, y: 448, width: 32, height: 32, alive: true, color: '#E74C3C', patrolMin: 1700, patrolMax: 1800, dir: 1, speed: 100, bulletTimer: 0, bulletInterval: 2500 }
      ],
      coins: [
        { x: 350, y: 368, radius: 8, collected: false },
        { x: 620, y: 318, radius: 8, collected: false },
        { x:1020, y: 368, radius: 8, collected: false },
        { x:1320, y: 318, radius: 8, collected: false },
        { x:1650, y: 368, radius: 8, collected: false }
      ]
    },
    {
      name: "Mountain Path",
      length: 2500,
      bgColorTop: '#DDEBFF',
      bgColorBottom: '#A0C4FF',
      platforms: [
        { x: 0,   y: 430, width: 2500, height: 50, color: '#556B2F' },
        { x: 250, y: 360, width: 100,  height: 20, color: '#A0522D' },
        { x: 550, y: 310, width: 120,  height: 20, color: '#A0522D' },
        { x: 850, y: 260, width: 100,  height: 20, color: '#A0522D' },
        { x:1150, y: 310, width: 120,  height: 20, color: '#A0522D' },
        { x:1450, y: 360, width: 100,  height: 20, color: '#A0522D' },
        { x:1750, y: 310, width: 150,  height: 20, color: '#A0522D' },
        { x:2050, y: 360, width: 200,  height: 20, color: '#A0522D' }
      ],
      enemies: [
        { x: 300, y: 398, width: 32, height: 32, alive: true, color: '#8E44AD', patrolMin: 250, patrolMax: 350, dir: 1, speed: 90, bulletTimer: 0, bulletInterval: 1800 },
        { x: 600, y: 348, width: 32, height: 32, alive: true, color: '#8E44AD', patrolMin: 550, patrolMax: 650, dir: 1, speed: 100, bulletTimer: 0, bulletInterval: 2000 },
        { x: 900, y: 298, width: 32, height: 32, alive: true, color: '#8E44AD', patrolMin: 850, patrolMax: 950, dir: 1, speed: 95, bulletTimer: 0, bulletInterval: 2200 },
        { x:1200, y: 348, width: 32, height: 32, alive: true, color: '#8E44AD', patrolMin: 1150, patrolMax: 1250, dir: 1, speed: 100, bulletTimer: 0, bulletInterval: 2000 },
        { x:1500, y: 398, width: 32, height: 32, alive: true, color: '#8E44AD', patrolMin: 1450, patrolMax: 1550, dir: 1, speed: 105, bulletTimer: 0, bulletInterval: 2400 },
        { x:1800, y: 348, width: 32, height: 32, alive: true, color: '#8E44AD', patrolMin: 1750, patrolMax: 1850, dir: 1, speed: 110, bulletTimer: 0, bulletInterval: 2600 },
        { x:2100, y: 398, width: 32, height: 32, alive: true, color: '#8E44AD', patrolMin: 2050, patrolMax: 2150, dir: 1, speed: 95, bulletTimer: 0, bulletInterval: 2200 }
      ],
      coins: [
        { x: 280, y: 368, radius: 8, collected: false },
        { x: 580, y: 318, radius: 8, collected: false },
        { x: 880, y: 268, radius: 8, collected: false },
        { x:1180, y: 318, radius: 8, collected: false },
        { x:1480, y: 368, radius: 8, collected: false },
        { x:1780, y: 318, radius: 8, collected: false },
        { x:2080, y: 368, radius: 8, collected: false }
      ]
    },
    {
      name: "Crystal Cavern",
      length: 3000,
      bgColorTop: '#1A1A40',
      bgColorBottom: '#383858',
      platforms: [
        { x: 0,    y: 430, width: 3000, height: 50, color: '#2F4F4F' },
        { x: 200,  y: 360, width: 120,  height: 20, color: '#4682B4' },
        { x: 500,  y: 310, width: 150,  height: 20, color: '#4682B4' },
        { x: 800,  y: 260, width: 100,  height: 20, color: '#4682B4' },
        { x:1100,  y: 310, width: 120,  height: 20, color: '#4682B4' },
        { x:1400,  y: 360, width: 100,  height: 20, color: '#4682B4' },
        { x:1700,  y: 310, width: 150,  height: 20, color: '#4682B4' },
        { x:2000,  y: 260, width: 120,  height: 20, color: '#4682B4' },
        { x:2300,  y: 310, width: 100,  height: 20, color: '#4682B4' },
        { x:2600,  y: 360, width: 200,  height: 20, color: '#4682B4' }
      ],
      enemies: [
        { x: 220,  y: 348, width: 32, height: 32, alive: true, color: '#F39C12', patrolMin: 170, patrolMax: 270, dir: 1, speed: 100, bulletTimer: 0, bulletInterval: 1800 },
        { x: 550,  y: 298, width: 32, height: 32, alive: true, color: '#F39C12', patrolMin: 500, patrolMax: 600, dir: 1, speed: 110, bulletTimer: 0, bulletInterval: 2000 },
        { x: 820,  y: 248, width: 32, height: 32, alive: true, color: '#F39C12', patrolMin: 770, patrolMax: 870, dir: 1, speed: 120, bulletTimer: 0, bulletInterval: 2200 },
        { x:1120,  y: 298, width: 32, height: 32, alive: true, color: '#F39C12', patrolMin: 1070, patrolMax: 1170, dir: 1, speed: 115, bulletTimer: 0, bulletInterval: 2000 },
        { x:1420,  y: 348, width: 32, height: 32, alive: true, color: '#F39C12', patrolMin: 1370, patrolMax: 1470, dir: 1, speed: 125, bulletTimer: 0, bulletInterval: 2400 },
        { x:1720,  y: 298, width: 32, height: 32, alive: true, color: '#F39C12', patrolMin: 1670, patrolMax: 1770, dir: 1, speed: 130, bulletTimer: 0, bulletInterval: 2600 },
        { x:2020,  y: 248, width: 32, height: 32, alive: true, color: '#F39C12', patrolMin: 1970, patrolMax: 2070, dir: 1, speed: 135, bulletTimer: 0, bulletInterval: 2200 },
        { x:2320,  y: 298, width: 32, height: 32, alive: true, color: '#F39C12', patrolMin: 2270, patrolMax: 2370, dir: 1, speed: 140, bulletTimer: 0, bulletInterval: 2000 },
        { x:2620,  y: 348, width: 32, height: 32, alive: true, color: '#F39C12', patrolMin: 2570, patrolMax: 2670, dir: 1, speed: 145, bulletTimer: 0, bulletInterval: 2400 }
      ],
      coins: [
        { x: 180,  y: 350, radius: 8, collected: false },
        { x: 480,  y: 300, radius: 8, collected: false },
        { x: 780,  y: 250, radius: 8, collected: false },
        { x:1080,  y: 300, radius: 8, collected: false },
        { x:1380,  y: 350, radius: 8, collected: false },
        { x:1680,  y: 300, radius: 8, collected: false },
        { x:1980,  y: 250, radius: 8, collected: false },
        { x:2280,  y: 300, radius: 8, collected: false },
        { x:2580,  y: 350, radius: 8, collected: false }
      ]
    }
  ];
  static _levelIndex = 0;
  static _currentLevel = null;

  // Collision objects in current level
  static _platforms = [];
  static _enemies = [];

  // Coins in current level
  static _coinsCurrent = [];

  // Input
  static _keys = {};

  // Score & high scores
  static _score = 0;
  static _highScores = [];

  // Timing
  static _lastTime = 0;
  static _running = false;
  static _state = 'start'; // 'start' | 'playing' | 'levelComplete' | 'gameover' | 'paused'
  static _animationId = null;

  // Overlays
  static _overlay = null;
  static _overlayText = null;
  static _overlaySub = null;

  // UI elements
  static _scoreEl = null;
  static _levelEl = null;
  static _highScoreEl = null;
  static _healthEl = null;

  // ────────────────────────────────────────────────────────────────
  // Create the window (called by WindowManager)
  static createWindow() {
    // Detect mobile
    this._isMobile = window.innerWidth <= 768 ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    return {
      title: 'PlatformerQuest',
      width: this._isMobile ? '100%' : '840px',
      height: this._isMobile ? '100%' : '600px',
      content: this._createGameHTML(),
      onInit: (windowElement) => {
        this._windowElement = windowElement;
        this._initializeGame(windowElement);
      },
      onDestroy: () => {
        this._cleanup();
      },
      // Hook into EmberFrame window events
      onClose: () => this.onClose(),
      onMinimize: () => this.onMinimize(),
      onRestore: () => this.onRestore()
    };
  }

  static _createGameHTML() {
    const mobileControls = this._isMobile ? `
      <div id="pf-mobile-controls" style="
        position: absolute;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 15px;
        z-index: 20;
      ">
        <div style="display: flex; gap: 8px;">
          <button id="pf-btn-left" class="pf-mobile-btn">←</button>
          <button id="pf-btn-right" class="pf-mobile-btn">→</button>
        </div>
        <button id="pf-btn-jump" class="pf-mobile-btn">↑</button>
        <button id="pf-btn-attack" class="pf-mobile-btn">ATK</button>
        <button id="pf-btn-shoot" class="pf-mobile-btn">SHOOT</button>
        <button id="pf-btn-dodge" class="pf-mobile-btn">DODGE</button>
      </div>
    ` : '';

    return `
      <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;600;800&display=swap" rel="stylesheet">
      <div id="platformer-container" style="position:relative; width:100%; height:100%; overflow:hidden; font-family:'Rajdhani', sans-serif;">
        <canvas id="pf-canvas" width="800" height="500"
                style="display:block; margin:${this._isMobile ? '5px auto' : '10px auto'}; border:2px solid #34495e; border-radius: 8px; max-width: 100%; height: auto;"></canvas>
        
        <div id="pf-ui" style="
          width: ${this._isMobile ? '100%' : '800px'}; 
          margin: 0 auto; 
          display: flex; 
          justify-content: space-between; 
          align-items: center;
          color: #2c3e50; 
          font-size: ${this._isMobile ? '14px' : '16px'}; 
          background: rgba(255,255,255,0.9); 
          padding: 8px 12px; 
          border: 2px solid #34495e;
          border-radius: 8px;
          font-weight: 600;
          backdrop-filter: blur(5px);
        ">
          <div id="pf-score">Score: 0</div>
          <div id="pf-level">Level: 1</div>
          <div id="pf-health">Health: ♥♥♥♥♥</div>
          <div id="pf-highscore">High Score: 0</div>
        </div>

        ${mobileControls}
        
        <div id="pf-overlay" style="
          position: absolute; 
          top: 0; 
          left: 50%; 
          transform: translateX(-50%);
          width: ${this._isMobile ? '100%' : '800px'}; 
          height: ${this._isMobile ? '100%' : '500px'}; 
          display: flex; 
          flex-direction: column;
          justify-content: center; 
          align-items: center; 
          color: #fff;
          font-size: ${this._isMobile ? '20px' : '24px'}; 
          background: rgba(44, 62, 80, 0.95); 
          z-index: 10;
          border-radius: 8px;
          text-align: center;
          padding: 20px;
        ">
          <div style="font-size: 48px; margin-bottom: 20px;">🎮</div>
          <div id="pf-overlay-text">Press ENTER to Start</div>
          <div id="pf-overlay-sub" style="font-size: ${this._isMobile ? '12px' : '16px'}; margin-top: 12px; line-height: 1.4; opacity: 0.9;">
            ${this._isMobile ? 
              'Use on-screen controls to Move, Jump, Attack, Shoot, and Dodge' : 
              'Use ←/→ (A/D) to Move, ↑ (W/Space) to Jump, J to Punch, L to Shoot, K to Dodge'
            }
          </div>
          ${this._isMobile ? `
            <button id="pf-start-btn" style="
              margin-top: 20px;
              padding: 12px 24px;
              background: #3498db;
              color: white;
              border: none;
              border-radius: 8px;
              font-size: 16px;
              font-weight: 600;
              cursor: pointer;
              font-family: 'Rajdhani', sans-serif;
            ">Start Game</button>
          ` : ''}
        </div>

        <style>
          .pf-mobile-btn {
            width: 50px;
            height: 50px;
            background: rgba(52, 73, 94, 0.9);
            color: white;
            border: 2px solid #34495e;
            border-radius: 50%;
            font-size: 14px;
            font-weight: bold;
            cursor: pointer;
            user-select: none;
            touch-action: manipulation;
            font-family: 'Rajdhani', sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(5px);
            transition: all 0.2s ease;
          }
          
          .pf-mobile-btn:active {
            background: rgba(52, 152, 219, 0.9);
            transform: scale(0.95);
          }
          
          .pf-mobile-btn:hover {
            background: rgba(52, 152, 219, 0.8);
          }
          
          @media (max-width: 768px) {
            #pf-mobile-controls {
              position: fixed;
              bottom: 20px;
              left: 50%;
              transform: translateX(-50%);
              z-index: 1000;
            }
          }
        </style>
      </div>
    `;
  }

  static _initializeGame(windowElement) {
    this._container = windowElement.querySelector('#platformer-container');
    this._canvas = windowElement.querySelector('#pf-canvas');
    this._ctx = this._canvas.getContext('2d');

    this._scoreEl = windowElement.querySelector('#pf-score');
    this._levelEl = windowElement.querySelector('#pf-level');
    this._highScoreEl = windowElement.querySelector('#pf-highscore');
    this._healthEl = windowElement.querySelector('#pf-health');

    this._overlay = windowElement.querySelector('#pf-overlay');
    this._overlayText = windowElement.querySelector('#pf-overlay-text');
    this._overlaySub = windowElement.querySelector('#pf-overlay-sub');

    // Load high scores from localStorage
    this._loadHighScores();
    this._updateHighScoreDisplay();

    // Initialize parallax background
    this._initParallax();

    // Initialize first level data
    this._levelIndex = 0;
    this._loadLevel(this._levelIndex);

    // Setup input handlers
    this._setupInputHandlers();

    // Setup mobile controls if needed
    if (this._isMobile) {
      this._setupMobileControls();
    }

    // Setup window event handlers
    this._setupWindowEvents();

    // Show start overlay
    this._showOverlay('Ready to Play?', this._isMobile ?
      'Use on-screen controls to Move, Jump, Attack, Shoot, and Dodge' :
      'Use ←/→ (A/D) to Move, ↑ (W/Space) to Jump, J to Punch, L to Shoot, K to Dodge'
    );

    // Focus the container for keyboard input
    this._container.tabIndex = 0;
    this._container.focus();

    console.log('🎮 PlatformerQuest v1.5.0 initialized successfully');
  }

  // ────────────────────────────────────────────────────────────────
  // Initialize parallax background layers and clouds
  static _initParallax() {
    // Layers: { image: optional, speedFactor, drawFunction }
    // For simplicity, we draw colored shapes
    this._bgLayers = [
      { speed: 0.1, draw: this._drawDistantHills.bind(this) },
      { speed: 0.3, draw: this._drawForests.bind(this) }
    ];
    // Initialize moving clouds
    this._clouds = [];
    for (let i = 0; i < 5; i++) {
      this._clouds.push({
        x: Math.random() * this._width,
        y: 50 + Math.random() * 50,
        scale: 0.5 + Math.random() * 0.5,
        speed: 20 + Math.random() * 20
      });
    }
  }

  // Draw distant hills for layer 0
  static _drawDistantHills(ctx, camX) {
    const offset = camX * 0.1;
    ctx.fillStyle = '#3E5641';
    ctx.beginPath();
    ctx.moveTo(0, this._height * 0.7);
    for (let x = 0; x <= this._width; x += 50) {
      const y = this._height * 0.7 - (Math.sin((x + offset) * 0.005) * 20 + 20);
      ctx.lineTo(x, y);
    }
    ctx.lineTo(this._width, this._height);
    ctx.lineTo(0, this._height);
    ctx.closePath();
    ctx.fill();
  }

  // Draw nearer forests for layer 1
  static _drawForests(ctx, camX) {
    const offset = camX * 0.3;
    for (let i = -1; i < 6; i++) {
      const treeX = i * 200 - (offset % 200);
      this._drawTree(ctx, treeX, this._height * 0.7 - 40, 40, 80);
    }
  }

  static _drawTree(ctx, x, y, width, height) {
    // Trunk
    ctx.fillStyle = '#8B5A2B';
    ctx.fillRect(x + width * 0.4, y + height * 0.5, width * 0.2, height * 0.5);
    // Foliage (three circles)
    ctx.fillStyle = '#2E8B57';
    ctx.beginPath();
    ctx.arc(x + width * 0.5, y + height * 0.3, width * 0.6, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + width * 0.3, y + height * 0.5, width * 0.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + width * 0.7, y + height * 0.5, width * 0.5, 0, Math.PI * 2);
    ctx.fill();
  }

  static _drawClouds(ctx, delta) {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    this._clouds.forEach(c => {
      c.x += c.speed * (delta / 1000);
      if (c.x - 100 > this._width) c.x = -100;
      const drawX = c.x;
      const drawY = c.y;
      const s = c.scale;
      ctx.beginPath();
      ctx.arc(drawX, drawY, 30 * s, Math.PI * 0.5, Math.PI * 1.5);
      ctx.arc(drawX + 40 * s, drawY - 20 * s, 30 * s, Math.PI * 1, Math.PI * 1.85);
      ctx.arc(drawX + 80 * s, drawY - 10 * s, 30 * s, Math.PI * 1.37, Math.PI * 1.91);
      ctx.arc(drawX + 100 * s, drawY + 10 * s, 30 * s, Math.PI * 1.5, Math.PI * 0.5);
      ctx.moveTo(drawX + 100 * s, drawY + 40 * s);
      ctx.lineTo(drawX, drawY + 40 * s);
      ctx.closePath();
      ctx.fill();
    });
  }

  static _setupInputHandlers() {
    // Keyboard input
    this._container.addEventListener('keydown', this._onKeyDown.bind(this));
    this._container.addEventListener('keyup', this._onKeyUp.bind(this));
    this._container.addEventListener('keydown', this._handleEnter.bind(this));

    // Prevent context menu on canvas
    this._canvas.addEventListener('contextmenu', (e) => e.preventDefault());
  }

  static _setupMobileControls() {
    const startBtn = this._container.querySelector('#pf-start-btn');
    if (startBtn) {
      startBtn.addEventListener('click', () => {
        if (this._state === 'start') {
          this._startLevel();
        }
      });
    }

    // Mobile control buttons map
    const controls = {
      'pf-btn-left':   () => { this._keys['ArrowLeft'] = true; },
      'pf-btn-right':  () => { this._keys['ArrowRight'] = true; },
      'pf-btn-jump':   () => { this._keys['Space'] = true; },
      'pf-btn-attack': () => { this._keys['KeyJ'] = true; },
      'pf-btn-shoot':  () => { this._keys['KeyL'] = true; },
      'pf-btn-dodge':  () => { this._keys['KeyK'] = true; }
    };

    Object.entries(controls).forEach(([id, action]) => {
      const btn = this._container.querySelector(`#${id}`);
      if (btn) {
        btn.addEventListener('touchstart', (e) => {
          e.preventDefault();
          action();
        });

        btn.addEventListener('touchend', (e) => {
          e.preventDefault();
          // Clear all relevant keys on touch end
          this._keys['ArrowLeft'] = false;
          this._keys['ArrowRight'] = false;
          this._keys['Space'] = false;
          this._keys['KeyJ'] = false;
          this._keys['KeyL'] = false;
          this._keys['KeyK'] = false;
        });
      }
    });
  }

  static _setupWindowEvents() {
    // Handle window focus/blur for pause functionality
    if (this._windowElement) {
      const checkFocus = () => {
        this._isWindowActive = this._windowElement.classList.contains('active');
        if (!this._isWindowActive && this._state === 'playing') {
          this._pauseGame();
        }
      };

      // Use mutation observer to detect active class changes
      const observer = new MutationObserver(checkFocus);
      observer.observe(this._windowElement, {
        attributes: true,
        attributeFilter: ['class']
      });
    }
  }

  static _pauseGame() {
    if (this._running) {
      this._running = false;
      this._showOverlay('Game Paused', this._isMobile ?
        'Tap screen to resume' :
        'Click window or press ENTER to resume'
      );
      this._state = 'paused';
    }
  }

  static _resumeGame() {
    if (this._state === 'paused') {
      this._state = 'playing';
      this._overlay.style.display = 'none';
      this._lastTime = performance.now();
      this._running = true;
      this._loop(this._lastTime);
    }
  }

  // ────────────────────────────────────────────────────────────────
  // Input handlers
  static _onKeyDown(e) {
    this._keys[e.code] = true;

    // Prevent arrow keys/spaces from scrolling only when playing/paused
    if (['ArrowLeft','ArrowRight','ArrowUp','Space'].includes(e.code) &&
        (this._state === 'playing' || this._state === 'paused')) {
      e.preventDefault();
      e.stopPropagation();
    }

    // ESC to reset to start screen
    if (e.code === 'Escape' && this._state !== 'start') {
      this._resetToStart();
    }

    // Resume on any key if paused
    if (this._state === 'paused') {
      this._resumeGame();
    }
  }

  static _onKeyUp(e) {
    this._keys[e.code] = false;
  }

  static _handleEnter(e) {
    if (e.code === 'Enter' || e.code === 'Space') {
      e.preventDefault();
      e.stopPropagation();

      if (this._state === 'start') {
        this._startLevel();
      } else if (this._state === 'levelComplete') {
        this._levelIndex++;
        if (this._levelIndex < this._levels.length) {
          this._loadLevel(this._levelIndex);
          this._startLevel();
        } else {
          this._handleGameOver(true);
        }
      } else if (this._state === 'gameover') {
        this._resetToStart();
      } else if (this._state === 'paused') {
        this._resumeGame();
      }
    }
  }

  static _resetToStart() {
    this._stop();
    this._state = 'start';
    this._levelIndex = 0;
    this._score = 0;
    this._player.health = this._player.maxHealth;
    this._loadLevel(0);
    this._updateScoreDisplay();
    this._updateHighScoreDisplay();
    this._updateHealthDisplay();
    this._showOverlay('Ready to Play?', this._isMobile ?
      'Use on-screen controls to Move, Jump, Attack, Shoot, and Dodge' :
      'Use ←/→ (A/D) to Move, ↑ (W/Space) to Jump, J to Punch, L to Shoot, K to Dodge'
    );
  }

  // ────────────────────────────────────────────────────────────────
  // Level loading and initialization
  static _loadLevel(index) {
    const lvlData = this._levels[index];
    this._currentLevel = {
      name: lvlData.name,
      length: lvlData.length,
      bgColorTop: lvlData.bgColorTop,
      bgColorBottom: lvlData.bgColorBottom,
      platforms: lvlData.platforms.map(p => ({ ...p })),
      enemies: lvlData.enemies.map(e => ({ ...e })),
      coins: lvlData.coins.map(c => ({ ...c }))
    };
    this._platforms = this._currentLevel.platforms;
    this._enemies = this._currentLevel.enemies;
    this._coinsCurrent = this._currentLevel.coins;

    // Reset player
    this._player.x = 50;
    this._player.y = 400;
    this._player.vx = 0;
    this._player.vy = 0;
    this._player.onGround = false;
    this._player.isAttacking = false;
    this._player.attackTimer = 0;
    this._player.attackCooldown = 0;
    this._player.isDodging = false;
    this._player.dodgeTimer = 0;
    this._player.dodgeCooldown = 0;
    this._player.health = this._player.maxHealth;
    this._player.shootCooldown = 0;

    // Reset bullets, explosions, and coins
    this._playerBullets = [];
    this._enemyBullets = [];
    this._explosions = [];

    this._cameraX = 0;
    this._updateLevelDisplay();
    this._updateHealthDisplay();

    // Update canvas background gradient
    if (this._canvas) {
      // We'll fill in draw loop
    }
  }

  static _startLevel() {
    this._state = 'playing';
    this._overlay.style.display = 'none';
    this._lastTime = performance.now();
    this._running = true;
    this._loop(this._lastTime);

    // Show level notification (if EmberFrame.Notification exists)
    if (window.Notification && window.Notification.info) {
      window.Notification.info(`Level ${this._levelIndex + 1}: ${this._currentLevel.name}`, 3000);
    }
  }

  // ────────────────────────────────────────────────────────────────
  // Main game loop
  static _loop(timestamp) {
    if (!this._running) return;

    const delta = timestamp - this._lastTime;
    this._lastTime = timestamp;

    this._update(delta);
    this._draw(delta);

    if (this._state === 'playing' && this._running) {
      this._animationId = requestAnimationFrame(this._loop.bind(this));
    }
  }

  static _stop() {
    this._running = false;
    if (this._animationId) {
      cancelAnimationFrame(this._animationId);
      this._animationId = null;
    }
  }

  // ────────────────────────────────────────────────────────────────
  // Update game state
  static _update(delta) {
    const dt = delta / 1000;
    const p = this._player;

    // Handle dodge timer
    if (p.isDodging) {
      p.dodgeTimer -= delta;
      if (p.dodgeTimer <= 0) {
        p.isDodging = false;
        p.dodgeCooldown = 500;
      }
    } else if (p.dodgeCooldown > 0) {
      p.dodgeCooldown -= delta;
    }

    // Handle punch cooldown/timer
    if (p.isAttacking) {
      p.attackTimer -= delta;
      if (p.attackTimer <= 0) {
        p.isAttacking = false;
        p.attackCooldown = 300;
      }
    } else if (p.attackCooldown > 0) {
      p.attackCooldown -= delta;
    }

    // Handle shooting cooldown
    if (p.shootCooldown > 0) {
      p.shootCooldown -= delta;
    }

    // Horizontal movement
    let moveDir = 0;
    if (this._keys['ArrowLeft'] || this._keys['KeyA']) {
      moveDir = -1;
      p.facing = -1;
    } else if (this._keys['ArrowRight'] || this._keys['KeyD']) {
      moveDir = 1;
      p.facing = 1;
    }
    p.vx = moveDir * p.speed;

    // Jump
    if ((this._keys['ArrowUp'] || this._keys['KeyW'] || this._keys['Space']) && p.onGround) {
      p.vy = -p.jumpStrength;
      p.onGround = false;
    }

    // Punch (melee attack)
    if (this._keys['KeyJ'] && !p.isAttacking && p.attackCooldown <= 0) {
      p.isAttacking = true;
      p.attackTimer = p.attackDuration;
      this._performAttack();
    }

    // Shoot (ranged)
    if (this._keys['KeyL'] && p.shootCooldown <= 0) {
      this._shootBullet();
      p.shootCooldown = 300; // 0.3s between shots
    }

    // Dodge (dash)
    if (this._keys['KeyK'] && !p.isDodging && p.dodgeCooldown <= 0) {
      p.isDodging = true;
      p.dodgeTimer = p.dodgeDuration;
      p.vx = p.facing * p.dashSpeed;
    }

    // Apply gravity
    p.vy += this._gravity * dt;

    // Save old positions for collision checks
    const oldX = p.x;
    const oldY = p.y;

    // Update position
    p.x += p.vx * dt;
    p.y += p.vy * dt;

    // Collision with platforms
    p.onGround = false;
    for (let plat of this._platforms) {
      if (
        p.x + p.width > plat.x &&
        p.x < plat.x + plat.width &&
        oldY + p.height <= plat.y &&
        p.y + p.height >= plat.y
      ) {
        p.y = plat.y - p.height;
        p.vy = 0;
        p.onGround = true;
      }

      // Horizontal collisions
      if (
        p.x + p.width > plat.x &&
        p.x < plat.x + plat.width &&
        p.y + p.height > plat.y &&
        oldY + p.height > plat.y &&
        oldY + p.y < plat.y + plat.height
      ) {
        if (oldX + p.width <= plat.x && p.x + p.width > plat.x) {
          p.x = plat.x - p.width;
        }
        if (oldX >= plat.x + plat.width && p.x < plat.x + plat.width) {
          p.x = plat.x + plat.width;
        }
      }
    }

    // Prevent falling below ground
    if (p.y + p.height > this._height) {
      p.y = this._height - p.height;
      p.vy = 0;
      p.onGround = true;
    }

    // Clamp player X within world
    if (p.x < 0) p.x = 0;

    // Update camera
    const levelLen = this._currentLevel.length;
    this._cameraX = Math.max(0, Math.min(p.x - this._width / 4, levelLen - this._width));

    // Update parallax layers (clouds only)
    this._drawClouds(this._ctx, delta);

    // Update player bullets
    this._updatePlayerBullets(delta);

    // Update enemies (movement & limited shooting)
    this._updateEnemies(delta);

    // Update enemy bullets
    this._updateEnemyBullets(delta);

    // Update coins (collection)
    this._updateCoins();

    // Update explosions (animation)
    this._updateExplosions(delta);

    // Enemy collisions (only if player not dodging)
    if (!p.isDodging) {
      for (let enemy of this._enemies) {
        if (!enemy.alive) continue;
        if (
          p.x + p.width > enemy.x &&
          p.x < enemy.x + enemy.width &&
          p.y + p.height > enemy.y &&
          p.y < enemy.y + enemy.height
        ) {
          // Hurt player
          this._hurtPlayer(1);
          return; // avoid further checks this frame
        }
      }
    }

    // Bullet collisions with player
    for (let i = this._enemyBullets.length - 1; i >= 0; i--) {
      const b = this._enemyBullets[i];
      if (
        b.x < p.x + p.width &&
        b.x + b.width > p.x &&
        b.y < p.y + p.height &&
        b.y + b.height > p.y
      ) {
        // Hurt player
        this._enemyBullets.splice(i, 1);
        this._hurtPlayer(1);
        return;
      }
    }

    // Check if player fell off bottom
    if (p.y > this._height) {
      this._state = 'gameover';
      this._handleGameOver(false);
      return;
    }

    // Check level completion
    if (p.x >= levelLen - p.width) {
      this._state = 'levelComplete';
      this._score += 500;
      this._updateScoreDisplay();

      if (this._levelIndex < this._levels.length - 1) {
        this._showOverlay(
          `Level ${this._levelIndex + 1} Complete!`,
          'Press ENTER to Continue'
        );
      } else {
        this._showOverlay(
          `All Levels Complete!`,
          'Press ENTER for Final Score'
        );
      }
      return;
    }

    this._updateScoreDisplay();
  }

  // ────────────────────────────────────────────────────────────────
  // Hurt player by amount; check for game over
  static _hurtPlayer(amount) {
    const p = this._player;
    if (p.isDodging) return;
    p.health -= amount;
    if (p.health < 0) p.health = 0;
    this._updateHealthDisplay();

    // Flash red overlay briefly
    this._flashPlayerHit();

    if (p.health <= 0) {
      this._state = 'gameover';
      this._handleGameOver(false);
    }
  }

  static _flashPlayerHit() {
    const ctx = this._ctx;
    ctx.fillStyle = 'rgba(255,0,0,0.3)';
    ctx.fillRect(0, 0, this._width, this._height);
    // Next draw will clear
  }

  // ────────────────────────────────────────────────────────────────
  // Update enemy movement & limited shooting (max 2 per frame)
  static _updateEnemies(delta) {
    const dt = delta / 1000;
    const p = this._player;
    let shooters = 0;

    for (let enemy of this._enemies) {
      if (!enemy.alive) continue;

      // Patrol movement
      enemy.x += enemy.dir * enemy.speed * dt;
      if (enemy.x < enemy.patrolMin) {
        enemy.x = enemy.patrolMin;
        enemy.dir = 1;
      } else if (enemy.x > enemy.patrolMax) {
        enemy.x = enemy.patrolMax;
        enemy.dir = -1;
      }

      // Update facing if needed
      enemy.facing = enemy.dir;

      // Decrement bullet timer
      enemy.bulletTimer -= delta;
      if (enemy.bulletTimer <= 0 && shooters < 2) {
        // Shoot toward player
        enemy.bulletTimer = enemy.bulletInterval;
        shooters++;
        const bx = enemy.x + (enemy.dir === 1 ? enemy.width : -8);
        const by = enemy.y + enemy.height / 2 - 4;
        const angle = Math.atan2(p.y + p.height / 2 - by, p.x + p.width / 2 - bx);
        const speed = 300;
        this._enemyBullets.push({
          x: bx,
          y: by,
          width: 8,
          height: 8,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: '#f00'
        });
      }
    }
  }

  // ────────────────────────────────────────────────────────────────
  // Update enemy bullets movement & offscreen removal
  static _updateEnemyBullets(delta) {
    const dt = delta / 1000;
    for (let i = this._enemyBullets.length - 1; i >= 0; i--) {
      const b = this._enemyBullets[i];
      b.x += b.vx * dt;
      b.y += b.vy * dt;
      // Remove if offscreen
      if (b.x < 0 || b.x > this._currentLevel.length || b.y < 0 || b.y > this._height) {
        this._enemyBullets.splice(i, 1);
      }
    }
  }

  // ────────────────────────────────────────────────────────────────
  // Update player bullets movement, check collisions with enemies
  static _updatePlayerBullets(delta) {
    const dt = delta / 1000;
    for (let i = this._playerBullets.length - 1; i >= 0; i--) {
      const b = this._playerBullets[i];
      b.x += b.vx * dt;
      b.y += b.vy * dt;

      // Check collision with enemies
      let hit = false;
      for (let enemy of this._enemies) {
        if (!enemy.alive) continue;
        if (
          b.x < enemy.x + enemy.width &&
          b.x + b.width > enemy.x &&
          b.y < enemy.y + enemy.height &&
          b.y + b.height > enemy.y
        ) {
          // Enemy hit
          enemy.alive = false;
          hit = true;
          this._score += 100;
          this._updateScoreDisplay();
          this._spawnExplosion(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2);
          if (window.Notification && window.Notification.info) {
            window.Notification.info('+100!', 800);
          }
          break;
        }
      }
      if (hit) {
        this._playerBullets.splice(i, 1);
        continue;
      }

      // Remove bullet if offscreen
      if (b.x > this._currentLevel.length || b.x < 0 || b.y < 0 || b.y > this._height) {
        this._playerBullets.splice(i, 1);
      }
    }
  }

  // ────────────────────────────────────────────────────────────────
  // Shoot a player bullet (muzzle flash)
  static _shootBullet() {
    const p = this._player;
    const speed = 600;
    const vx = p.facing * speed;
    const vy = 0;
    const bx = p.x + (p.facing === 1 ? p.width : -8);
    const by = p.y + p.height / 2 - 4;
    this._playerBullets.push({
      x: bx,
      y: by,
      width: 8,
      height: 8,
      vx: vx,
      vy: vy,
      color: '#ff0'
    });
    this._spawnMuzzleFlash(bx, by);
  }

  static _spawnMuzzleFlash(x, y) {
    this._explosions.push({
      x: x,
      y: y,
      radius: 0,
      maxRadius: 15,
      alpha: 1,
      type: 'muzzle'
    });
  }

  // ────────────────────────────────────────────────────────────────
  // Spawn explosion at (x, y)
  static _spawnExplosion(x, y) {
    // Multiple particles or single expanding circle
    this._explosions.push({
      x: x,
      y: y,
      radius: 0,
      maxRadius: 40 + Math.random() * 20,
      alpha: 1,
      type: 'boom'
    });
  }

  // ────────────────────────────────────────────────────────────────
  // Update explosion animations
  static _updateExplosions(delta) {
    for (let i = this._explosions.length - 1; i >= 0; i--) {
      const ex = this._explosions[i];
      ex.radius += (ex.maxRadius / 300) * delta;   // expand over 300ms
      ex.alpha -= (1 / 300) * delta;
      if (ex.alpha <= 0) {
        this._explosions.splice(i, 1);
      }
    }
  }

  // ────────────────────────────────────────────────────────────────
  // Update coins (collection)
  static _updateCoins() {
    const p = this._player;
    for (let coin of this._coinsCurrent) {
      if (coin.collected) continue;
      const cx = coin.x;
      const cy = coin.y;
      const r = coin.radius;
      // AABB vs circle
      const closestX = Math.max(p.x, Math.min(cx, p.x + p.width));
      const closestY = Math.max(p.y, Math.min(cy, p.y + p.height));
      const dx = cx - closestX;
      const dy = cy - closestY;
      if (dx * dx + dy * dy < r * r) {
        coin.collected = true;
        this._score += 10;
        this._updateScoreDisplay();
        this._spawnExplosion(cx, cy);
        if (window.Notification && window.Notification.success) {
          window.Notification.success('+10 Coins!', 800);
        }
      }
    }
  }

  // ────────────────────────────────────────────────────────────────
  // Perform punch (melee attack)
  static _performAttack() {
    const p = this._player;
    const attackBox = {
      x: p.facing === 1 ? p.x + p.width : p.x - 24,
      y: p.y + 10,
      width: 24,
      height: p.height - 20
    };

    for (let enemy of this._enemies) {
      if (!enemy.alive) continue;
      if (
        attackBox.x + attackBox.width > enemy.x &&
        attackBox.x < enemy.x + enemy.width &&
        attackBox.y + attackBox.height > enemy.y &&
        attackBox.y < enemy.y + enemy.height
      ) {
        enemy.alive = false;
        this._score += 100;
        this._updateScoreDisplay();
        this._spawnExplosion(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2);
        if (window.Notification && window.Notification.info) {
          window.Notification.info('+100!', 800);
        }
      }
    }
  }

  // ────────────────────────────────────────────────────────────────
  // Drawing the scene
  static _draw(delta) {
    const ctx = this._ctx;
    const p = this._player;
    const camX = this._cameraX;

    // 1) Draw background gradient
    const top = this._currentLevel.bgColorTop;
    const bottom = this._currentLevel.bgColorBottom;
    const grad = ctx.createLinearGradient(0, 0, 0, this._height);
    grad.addColorStop(0, top);
    grad.addColorStop(1, bottom);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, this._width, this._height);

    // 2) Draw parallax layers
    this._bgLayers.forEach(layer => {
      layer.draw(ctx, camX);
    });

    // 3) Draw platforms with gradient
    for (let plat of this._platforms) {
      const drawX = plat.x - camX;
      if (drawX + plat.width < 0 || drawX > this._width) continue;

      const gradPlat = ctx.createLinearGradient(drawX, plat.y, drawX, plat.y + plat.height);
      gradPlat.addColorStop(0, '#A0522D');
      gradPlat.addColorStop(1, '#8B4513');
      ctx.fillStyle = gradPlat;
      ctx.fillRect(drawX, plat.y, plat.width, plat.height);
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.strokeRect(drawX, plat.y, plat.width, plat.height);
    }

    // 4) Draw coins as spinning (simple ups and downs)
    this._coinsCurrent.forEach(coin => {
      if (coin.collected) return;
      const drawX = coin.x - camX;
      const drawY = coin.y + Math.sin((Date.now() + coin.x) * 0.005) * 5;
      ctx.beginPath();
      ctx.fillStyle = '#FFD700';
      ctx.arc(drawX, drawY, coin.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#B8860B';
      ctx.stroke();
      // Shiny highlight
      ctx.beginPath();
      ctx.arc(drawX - coin.radius / 3, drawY - coin.radius / 3, coin.radius / 4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.6)';
      ctx.fill();
    });

    // 5) Draw enemies as animated (slight bob) rectangles
    for (let enemy of this._enemies) {
      if (!enemy.alive) continue;
      const drawX = enemy.x - camX;
      const bob = Math.sin((Date.now() + enemy.x) * 0.005) * 5;
      const drawY = enemy.y + bob;
      if (drawX + enemy.width < 0 || drawX > this._width) continue;

      // Body
      ctx.fillStyle = enemy.color || '#E74C3C';
      ctx.fillRect(drawX, drawY, enemy.width, enemy.height);
      // Outline
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.strokeRect(drawX, drawY, enemy.width, enemy.height);
      // Eyes
      ctx.fillStyle = '#fff';
      ctx.fillRect(drawX + 6, drawY + 6, 6, 6);
      ctx.fillRect(drawX + 20, drawY + 6, 6, 6);
      ctx.fillStyle = '#000';
      ctx.fillRect(drawX + 8, drawY + 8, 2, 2);
      ctx.fillRect(drawX + 22, drawY + 8, 2, 2);
    }

    // 6) Draw enemy bullets (simple red circles)
    this._enemyBullets.forEach(b => {
      const drawX = b.x - camX;
      const drawY = b.y;
      ctx.beginPath();
      ctx.fillStyle = b.color || '#f00';
      ctx.arc(drawX + b.width / 2, drawY + b.height / 2, b.width / 2, 0, Math.PI * 2);
      ctx.fill();
    });

    // 7) Draw player bullets (bright yellow circles)
    this._playerBullets.forEach(b => {
      const drawX = b.x - camX;
      const drawY = b.y;
      ctx.beginPath();
      ctx.fillStyle = b.color || '#ff0';
      ctx.arc(drawX + b.width / 2, drawY + b.height / 2, b.width / 2, 0, Math.PI * 2);
      ctx.fill();
    });

    // 8) Draw explosions (expanding rings)
    this._explosions.forEach(ex => {
      const drawX = ex.x - camX;
      const drawY = ex.y;
      if (ex.type === 'boom') {
        ctx.beginPath();
        ctx.arc(drawX, drawY, ex.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 69, 0, ${ex.alpha})`;
        ctx.lineWidth = 4;
        ctx.stroke();
      } else if (ex.type === 'muzzle') {
        ctx.beginPath();
        ctx.arc(drawX, drawY, ex.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 220, 0, ${ex.alpha})`;
        ctx.fill();
      }
    });

    // 9) Draw player as colored rectangle with smooth bob while running
    const drawPlayerX = p.x - camX;
    const runningBob = Math.abs(Math.sin(Date.now() * 0.008)) * (p.vx !== 0 && p.onGround ? 5 : 0);
    const drawPlayerY = p.y - runningBob;
    ctx.save();

    if (p.isDodging) {
      ctx.globalAlpha = 0.6;
      ctx.fillStyle = '#3498db';
    } else {
      ctx.globalAlpha = 1;
      ctx.fillStyle = p.color;
    }

    ctx.fillRect(drawPlayerX, drawPlayerY, p.width, p.height);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.strokeRect(drawPlayerX, drawPlayerY, p.width, p.height);

    // Player face eyes
    ctx.fillStyle = '#fff';
    ctx.fillRect(drawPlayerX + 8, drawPlayerY + 8, 4, 4);
    ctx.fillRect(drawPlayerX + 20, drawPlayerY + 8, 4, 4);
    ctx.fillStyle = '#000';
    ctx.fillRect(drawPlayerX + 9, drawPlayerY + 9, 2, 2);
    ctx.fillRect(drawPlayerX + 21, drawPlayerY + 9, 2, 2);

    ctx.restore();

    // 10) Draw punch box if attacking
    if (p.isAttacking) {
      const attackBoxX = p.facing === 1 ? drawPlayerX + p.width : drawPlayerX - 24;
      ctx.fillStyle = 'rgba(255, 255, 0, 0.7)';
      ctx.fillRect(attackBoxX, drawPlayerY + 10, 24, p.height - 20);
    }
  }

  // ────────────────────────────────────────────────────────────────
  // UI updates
  static _updateScoreDisplay() {
    if (this._scoreEl) {
      this._scoreEl.textContent = `Score: ${this._score}`;
    }
  }

  static _updateLevelDisplay() {
    if (this._levelEl) {
      this._levelEl.textContent = `Level: ${this._levelIndex + 1}`;
    }
  }

  static _updateHighScoreDisplay() {
    if (this._highScoreEl) {
      let best = 0;
      if (this._highScores.length) {
        best = Math.max(...this._highScores);
      }
      this._highScoreEl.textContent = `High Score: ${best}`;
    }
  }

  static _updateHealthDisplay() {
    if (this._healthEl) {
      let hearts = '';
      for (let i = 0; i < this._player.health; i++) {
        hearts += '♥';
      }
      for (let i = this._player.health; i < this._player.maxHealth; i++) {
        hearts += '♡';
      }
      this._healthEl.textContent = `Health: ${hearts}`;
    }
  }

  static _loadHighScores() {
    try {
      const stored = localStorage.getItem('emberframe_platformerquest_scores');
      if (stored) {
        this._highScores = JSON.parse(stored);
      }
    } catch (error) {
      console.warn('Failed to load high scores:', error);
      this._highScores = [];
    }
  }

  static _saveHighScores() {
    try {
      localStorage.setItem('emberframe_platformerquest_scores', JSON.stringify(this._highScores));
    } catch (error) {
      console.warn('Failed to save high scores:', error);
    }
  }

  // ────────────────────────────────────────────────────────────────
  // Overlay control
  static _showOverlay(text, subtext = '') {
    if (this._overlayText) {
      this._overlayText.textContent = text;
    }
    if (this._overlaySub) {
      this._overlaySub.textContent = subtext;
    }
    if (this._overlay) {
      this._overlay.style.display = 'flex';
    }
  }

  // ────────────────────────────────────────────────────────────────
  // Game Over handling
  static _handleGameOver(win) {
    this._stop();

    // Add final score to high scores
    this._highScores.push(this._score);
    this._highScores.sort((a, b) => b - a);
    this._highScores = this._highScores.slice(0, 10); // Keep top 10
    this._saveHighScores();
    this._updateHighScoreDisplay();

    // Show EmberFrame notification if available
    if (window.Notification) {
      if (win && window.Notification.success) {
        window.Notification.success(`🎉 Congratulations! All levels completed! Final Score: ${this._score}`, 5000);
      } else if (!win && window.Notification.warning) {
        window.Notification.warning(`💀 Game Over! Score: ${this._score}`, 3000);
      }
    }

    const highScoreList = this._highScores
      .slice(0, 5)
      .map((s, i) => `${i + 1}. ${s}`)
      .join('\n');

    if (win) {
      this._showOverlay(
        `🏆 Victory! All Levels Complete!`,
        `Final Score: ${this._score}\n\nTop Scores:\n${highScoreList}\n\nPress ENTER to Play Again`
      );
    } else {
      this._showOverlay(
        `💀 Game Over!`,
        `Score: ${this._score}\n\nTop Scores:\n${highScoreList}\n\nPress ENTER to Restart`
      );
    }
  }

  // ────────────────────────────────────────────────────────────────
  // Cleanup
  static _cleanup() {
    console.log('🎮 PlatformerQuest cleaning up...');

    this._stop();

    // Clear all references
    this._container = null;
    this._canvas = null;
    this._ctx = null;
    this._windowElement = null;
    this._overlay = null;
    this._overlayText = null;
    this._overlaySub = null;
    this._scoreEl = null;
    this._levelEl = null;
    this._highScoreEl = null;
    this._healthEl = null;

    // Clear input state
    this._keys = {};

    // Reset game state
    this._state = 'start';
    this._score = 0;
    this._player.health = this._player.maxHealth;
    this._levelIndex = 0;
    this._running = false;
    this._isWindowActive = true;

    console.log('🎮 PlatformerQuest cleanup complete');
  }

  // ────────────────────────────────────────────────────────────────
  // Static methods for EmberFrame integration
  static onClose() {
    // Confirm close if game is running
    if (this._state === 'playing') {
      return confirm('Are you sure you want to close the game? Your progress will be lost.');
    }
    return true;
  }

  static onMinimize() {
    // Pause game when minimized
    if (this._state === 'playing') {
      this._pauseGame();
    }
  }

  static onRestore() {
    // Resume game when restored
    if (this._state === 'paused') {
      setTimeout(() => {
        this._resumeGame();
      }, 100);
    }
  }
}

// Expose globally for WindowManager
window.PlatformerQuest = PlatformerQuest;
