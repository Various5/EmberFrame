/**
 * APP_METADATA
 * @name Really Racer
 * @icon fas fa-car
 * @description High-speed racing game with tracks and power-ups
 * @category Games
 * @version 2.0.0
 * @author EmberFrame Team
 * @enabled true
 */

class ReallyRacer {
  // ═══════════════════════════════════════════════════════════════
  // CORE GAME PROPERTIES
  // ═══════════════════════════════════════════════════════════════
  static _container = null;
  static _canvas = null;
  static _ctx = null;
  static _width = 800;
  static _height = 600;

  // Game State
  static _gameState = 'menu'; // menu, playing, paused, finished, gameover
  static _currentTrack = 0;
  static _lapTime = 0;
  static _bestLapTime = Infinity;
  static _currentLap = 1;
  static _totalLaps = 3;
  static _raceStartTime = 0;
  static _raceFinished = false;

  // Player Car
  static _player = {
    x: 0,
    y: 0,
    angle: 0,
    speed: 0,
    maxSpeed: 300,
    acceleration: 400,
    deceleration: 600,
    turnSpeed: 3,
    width: 20,
    height: 40,
    friction: 0.95,
    velocityX: 0,
    velocityY: 0,
    drifting: false,
    nitro: 100,
    maxNitro: 100,
    nitroActive: false
  };

  // Track System
  static _track = {
    checkpoints: [],
    currentCheckpoint: 0,
    width: 100,
    centerLine: [],
    barriers: [],
    powerups: [],
    obstacles: []
  };

  // Camera
  static _camera = {
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    smoothing: 0.1
  };

  // Particles and Effects
  static _particles = [];
  static _explosions = [];
  static _skidMarks = [];

  // AI Cars
  static _aiCars = [];

  // Input
  static _keys = {};

  // Timing
  static _lastTime = 0;
  static _running = false;
  static _animationId = null;

  // Audio (Visual feedback)
  static _soundQueue = [];

  // Track Data
  static _tracks = [
    {
      name: "Speed Circuit",
      difficulty: "Easy",
      color: "#00ff00",
      length: 2000,
      curves: [
        { x: 400, y: 100, radius: 150, angle: 0 },
        { x: 700, y: 200, radius: 100, angle: Math.PI/2 },
        { x: 600, y: 500, radius: 120, angle: Math.PI },
        { x: 200, y: 400, radius: 140, angle: -Math.PI/2 }
      ]
    },
    {
      name: "Danger Valley",
      difficulty: "Medium",
      color: "#ffaa00",
      length: 2500,
      curves: [
        { x: 400, y: 100, radius: 100, angle: 0 },
        { x: 650, y: 150, radius: 80, angle: Math.PI/3 },
        { x: 700, y: 350, radius: 90, angle: Math.PI },
        { x: 500, y: 500, radius: 110, angle: Math.PI * 1.5 },
        { x: 200, y: 450, radius: 100, angle: -Math.PI/2 },
        { x: 150, y: 250, radius: 120, angle: 0 }
      ]
    },
    {
      name: "Death Track",
      difficulty: "Hard",
      color: "#ff0000",
      length: 3000,
      curves: [
        { x: 400, y: 100, radius: 80, angle: 0 },
        { x: 600, y: 120, radius: 60, angle: Math.PI/4 },
        { x: 750, y: 200, radius: 70, angle: Math.PI/2 },
        { x: 720, y: 350, radius: 90, angle: Math.PI * 0.8 },
        { x: 550, y: 500, radius: 85, angle: Math.PI * 1.2 },
        { x: 350, y: 520, radius: 75, angle: Math.PI * 1.5 },
        { x: 200, y: 400, radius: 80, angle: -Math.PI/2 },
        { x: 150, y: 250, radius: 90, angle: -Math.PI/4 },
        { x: 250, y: 150, radius: 70, angle: 0 }
      ]
    }
  ];

  // Save Data
  static _saveData = {
    bestTimes: [Infinity, Infinity, Infinity],
    unlockedTracks: [true, false, false],
    totalRaces: 0,
    totalWins: 0
  };

  // ═══════════════════════════════════════════════════════════════
  // INITIALIZATION
  // ═══════════════════════════════════════════════════════════════

  static createWindow() {
    return {
      title: 'Really Racer',
      width: '820px',
      height: '720px',
      content: `
        <div id="really-racer" style="position: relative; width: 100%; height: 100%; background: #000; overflow: hidden; font-family: 'Orbitron', monospace;">
          <!-- Main Game Canvas -->
          <canvas id="racer-canvas" width="800" height="600"
                  style="display: block; background: #001122; margin: 10px auto; border: 2px solid #00ffff; 
                         border-radius: 8px; box-shadow: 0 0 20px #00ffff40;"></canvas>
          
          <!-- HUD -->
          <div id="racer-hud" style="position: absolute; top: 20px; left: 20px; right: 20px; display: flex; justify-content: space-between; color: #00ffff; font-size: 14px; z-index: 10; pointer-events: none;">
            
            <!-- Left HUD -->
            <div style="background: rgba(0, 20, 40, 0.9); padding: 12px; border-radius: 8px; border: 1px solid #00ffff40;">
              <div style="display: flex; flex-direction: column; gap: 8px;">
                <div id="racer-speed" style="color: #ffff00; font-weight: bold; font-size: 18px;">SPEED: 0 mph</div>
                <div id="racer-lap" style="color: #00ff00; font-weight: bold;">LAP: 1 / 3</div>
                <div id="racer-position" style="color: #ff8800; font-weight: bold;">POSITION: 1st</div>
                
                <!-- Nitro Bar -->
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="color: #ff00ff; font-size: 12px;">NITRO:</span>
                  <div style="width: 100px; height: 8px; background: #330033; border: 1px solid #ff00ff; border-radius: 4px; overflow: hidden;">
                    <div id="nitro-fill" style="width: 100%; height: 100%; background: linear-gradient(90deg, #ff00ff, #ff88ff); transition: width 0.2s;"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right HUD -->
            <div style="background: rgba(0, 20, 40, 0.9); padding: 12px; border-radius: 8px; border: 1px solid #00ffff40;">
              <div style="display: flex; flex-direction: column; gap: 8px; text-align: right;">
                <div id="racer-time" style="color: #00ffff; font-weight: bold; font-size: 16px;">TIME: 0:00.000</div>
                <div id="racer-best" style="color: #ffff00; font-weight: bold;">BEST: --:--.---</div>
                <div id="racer-track" style="color: #ff8800; font-weight: bold;">TRACK: Speed Circuit</div>
              </div>
            </div>
          </div>

          <!-- Mini Map -->
          <div id="minimap-container" style="position: absolute; bottom: 20px; right: 20px; width: 150px; height: 150px; background: rgba(0, 20, 40, 0.9); border: 2px solid #00ffff; border-radius: 8px; z-index: 10;">
            <canvas id="minimap-canvas" width="146" height="146" style="border-radius: 6px;"></canvas>
          </div>

          <!-- Game Overlays -->
          <div id="racer-overlay" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; background: rgba(0, 0, 0, 0.95); z-index: 20;">
            
            <!-- Main Menu -->
            <div id="main-menu" style="text-align: center; color: #00ffff;">
              <div style="font-size: 48px; font-weight: bold; margin-bottom: 20px; text-shadow: 0 0 20px #00ffff; background: linear-gradient(45deg, #00ffff, #ff00ff, #ffff00); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                REALLY RACER
              </div>
              <div style="font-size: 18px; margin-bottom: 30px; color: #aaaaaa;">
                High-Speed Circuit Racing
              </div>
              
              <div style="display: flex; flex-direction: column; gap: 15px; align-items: center; margin-bottom: 30px;">
                <button id="start-race-btn" class="menu-button" style="padding: 15px 40px; font-size: 18px; background: linear-gradient(45deg, #00ffff, #0088ff); color: #000; border: none; border-radius: 25px; cursor: pointer; font-weight: bold; transition: all 0.3s;">
                  START RACE
                </button>
                <button id="track-select-btn" class="menu-button" style="padding: 12px 35px; font-size: 16px; background: linear-gradient(45deg, #ff8800, #ffaa00); color: #000; border: none; border-radius: 20px; cursor: pointer; font-weight: bold; transition: all 0.3s;">
                  SELECT TRACK
                </button>
                <button id="controls-btn" class="menu-button" style="padding: 10px 30px; font-size: 14px; background: linear-gradient(45deg, #888888, #aaaaaa); color: #000; border: none; border-radius: 15px; cursor: pointer; font-weight: bold; transition: all 0.3s;">
                  CONTROLS
                </button>
              </div>

              <div style="font-size: 14px; color: #666;">
                <div>BEST TIME: <span id="best-time-display">--:--.---</span></div>
                <div>RACES WON: <span id="wins-display">0</span></div>
              </div>
            </div>

            <!-- Track Selection -->
            <div id="track-selection" style="display: none; color: #00ffff; text-align: center;">
              <h2 style="font-size: 36px; margin-bottom: 30px;">SELECT TRACK</h2>
              <div id="track-list" style="display: flex; flex-direction: column; gap: 15px; margin-bottom: 30px;">
                <!-- Tracks will be populated here -->
              </div>
              <button id="back-to-menu-btn" class="menu-button" style="padding: 12px 30px; font-size: 16px; background: #666; color: #fff; border: none; border-radius: 20px; cursor: pointer;">
                BACK
              </button>
            </div>

            <!-- Controls -->
            <div id="controls-screen" style="display: none; color: #00ffff; text-align: center; max-width: 600px;">
              <h2 style="font-size: 36px; margin-bottom: 30px;">CONTROLS</h2>
              <div style="text-align: left; font-size: 16px; line-height: 1.8; margin-bottom: 30px;">
                <div style="display: grid; grid-template-columns: 200px 1fr; gap: 20px; margin-bottom: 30px;">
                  <div style="font-weight: bold; color: #ffff00;">MOVEMENT:</div>
                  <div></div>
                  <div>🎮 <strong>W / ↑</strong></div>
                  <div>Accelerate</div>
                  <div>🎮 <strong>S / ↓</strong></div>
                  <div>Brake / Reverse</div>
                  <div>🎮 <strong>A / ←</strong></div>
                  <div>Turn Left</div>
                  <div>🎮 <strong>D / →</strong></div>
                  <div>Turn Right</div>
                </div>
                
                <div style="display: grid; grid-template-columns: 200px 1fr; gap: 20px;">
                  <div style="font-weight: bold; color: #ffff00;">SPECIAL:</div>
                  <div></div>
                  <div>🚀 <strong>SPACE</strong></div>
                  <div>Nitro Boost</div>
                  <div>⏸️ <strong>P</strong></div>
                  <div>Pause Race</div>
                  <div>🎯 <strong>ESC</strong></div>
                  <div>Back to Menu</div>
                </div>
              </div>
              <button id="back-from-controls-btn" class="menu-button" style="padding: 12px 30px; font-size: 16px; background: #666; color: #fff; border: none; border-radius: 20px; cursor: pointer;">
                BACK
              </button>
            </div>

            <!-- Race Finished -->
            <div id="race-finished" style="display: none; color: #00ff00; text-align: center;">
              <div style="font-size: 48px; font-weight: bold; margin-bottom: 20px; text-shadow: 0 0 20px #00ff00;">
                RACE COMPLETE!
              </div>
              <div id="race-stats" style="font-size: 18px; margin-bottom: 30px; color: #aaaaaa;"></div>
              <div style="display: flex; gap: 20px; justify-content: center;">
                <button id="race-again-btn" class="menu-button" style="padding: 15px 30px; background: linear-gradient(45deg, #00ff00, #88ff88); color: #000; border: none; border-radius: 20px; cursor: pointer; font-weight: bold;">
                  RACE AGAIN
                </button>
                <button id="menu-btn" class="menu-button" style="padding: 15px 30px; background: #666; color: #fff; border: none; border-radius: 20px; cursor: pointer; font-weight: bold;">
                  MAIN MENU
                </button>
              </div>
            </div>

            <!-- Countdown -->
            <div id="countdown" style="display: none; font-size: 120px; font-weight: bold; color: #ffff00; text-shadow: 0 0 30px #ffff00;">
              3
            </div>
          </div>

          <style>
            @keyframes glow {
              0%, 100% { box-shadow: 0 0 20px #00ffff40; }
              50% { box-shadow: 0 0 30px #00ffff80; }
            }

            .menu-button:hover {
              transform: translateY(-2px) scale(1.05);
              box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
            }

            #racer-canvas {
              animation: glow 3s infinite alternate;
            }

            .track-button {
              padding: 15px 25px;
              margin: 5px;
              border: 2px solid;
              border-radius: 12px;
              cursor: pointer;
              transition: all 0.3s;
              background: rgba(0, 0, 0, 0.5);
              color: white;
              font-weight: bold;
              min-width: 300px;
            }

            .track-button:hover {
              transform: scale(1.05);
              box-shadow: 0 0 20px;
            }

            .track-button.locked {
              opacity: 0.5;
              cursor: not-allowed;
            }

            .track-button.locked:hover {
              transform: none;
              box-shadow: none;
            }
          </style>
        </div>
      `,
      onInit: (container) => {
        ReallyRacer._container = container;
        ReallyRacer._canvas = container.querySelector('#racer-canvas');
        ReallyRacer._ctx = ReallyRacer._canvas.getContext('2d');
        ReallyRacer._minimapCanvas = container.querySelector('#minimap-canvas');
        ReallyRacer._minimapCtx = ReallyRacer._minimapCanvas.getContext('2d');

        ReallyRacer._init();
      },
      onDestroy: () => {
        ReallyRacer._cleanup();
      }
    };
  }

  static _init() {
    console.log('🏎️ Initializing Really Racer');

    // Load save data
    ReallyRacer._loadGameData();

    // Initialize systems
    ReallyRacer._setupEventListeners();
    ReallyRacer._setupMenuButtons();
    ReallyRacer._populateTrackSelection();
    ReallyRacer._generateTrack(0);
    ReallyRacer._updateUI();

    // Show main menu
    ReallyRacer._showScreen('main-menu');

    // Set focus for keyboard input
    ReallyRacer._container.tabIndex = 0;
    ReallyRacer._container.focus();
  }

  static _cleanup() {
    ReallyRacer._stopGame();
    const container = ReallyRacer._container;

    if (container) {
      container.removeEventListener('keydown', ReallyRacer._onKeyDown);
      container.removeEventListener('keyup', ReallyRacer._onKeyUp);
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // EVENT HANDLING
  // ═══════════════════════════════════════════════════════════════

  static _setupEventListeners() {
    const container = ReallyRacer._container;

    // Keyboard events
    container.addEventListener('keydown', ReallyRacer._onKeyDown.bind(ReallyRacer));
    container.addEventListener('keyup', ReallyRacer._onKeyUp.bind(ReallyRacer));
  }

  static _setupMenuButtons() {
    const startBtn = ReallyRacer._container.querySelector('#start-race-btn');
    const trackSelectBtn = ReallyRacer._container.querySelector('#track-select-btn');
    const controlsBtn = ReallyRacer._container.querySelector('#controls-btn');
    const backToMenuBtn = ReallyRacer._container.querySelector('#back-to-menu-btn');
    const backFromControlsBtn = ReallyRacer._container.querySelector('#back-from-controls-btn');
    const raceAgainBtn = ReallyRacer._container.querySelector('#race-again-btn');
    const menuBtn = ReallyRacer._container.querySelector('#menu-btn');

    if (startBtn) startBtn.addEventListener('click', () => ReallyRacer._startRace());
    if (trackSelectBtn) trackSelectBtn.addEventListener('click', () => ReallyRacer._showScreen('track-selection'));
    if (controlsBtn) controlsBtn.addEventListener('click', () => ReallyRacer._showScreen('controls-screen'));
    if (backToMenuBtn) backToMenuBtn.addEventListener('click', () => ReallyRacer._showScreen('main-menu'));
    if (backFromControlsBtn) backFromControlsBtn.addEventListener('click', () => ReallyRacer._showScreen('main-menu'));
    if (raceAgainBtn) raceAgainBtn.addEventListener('click', () => ReallyRacer._startRace());
    if (menuBtn) menuBtn.addEventListener('click', () => ReallyRacer._showScreen('main-menu'));
  }

  static _onKeyDown(e) {
    ReallyRacer._keys[e.code] = true;

    // Prevent default for game keys
    if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'KeyW', 'KeyA', 'KeyS', 'KeyD'].includes(e.code)) {
      e.preventDefault();
    }

    // Handle special keys
    if (e.code === 'KeyP' && ReallyRacer._gameState === 'playing') {
      ReallyRacer._pauseGame();
    }

    if (e.code === 'Escape') {
      if (ReallyRacer._gameState === 'playing' || ReallyRacer._gameState === 'paused') {
        ReallyRacer._showScreen('main-menu');
        ReallyRacer._stopGame();
        ReallyRacer._gameState = 'menu';
      }
    }
  }

  static _onKeyUp(e) {
    ReallyRacer._keys[e.code] = false;
  }

  // ═══════════════════════════════════════════════════════════════
  // TRACK GENERATION
  // ═══════════════════════════════════════════════════════════════

  static _generateTrack(trackIndex) {
    const trackData = ReallyRacer._tracks[trackIndex];
    ReallyRacer._track.checkpoints = [];
    ReallyRacer._track.centerLine = [];
    ReallyRacer._track.barriers = [];
    ReallyRacer._track.powerups = [];
    ReallyRacer._track.obstacles = [];
    ReallyRacer._track.currentCheckpoint = 0;

    // Generate center line from curves
    const curves = trackData.curves;
    const totalPoints = 200;

    for (let i = 0; i < totalPoints; i++) {
      const t = i / totalPoints;
      const curveIndex = Math.floor(t * curves.length);
      const nextCurveIndex = (curveIndex + 1) % curves.length;
      const localT = (t * curves.length) - curveIndex;

      const curve1 = curves[curveIndex];
      const curve2 = curves[nextCurveIndex];

      // Interpolate between curves
      const x = curve1.x + (curve2.x - curve1.x) * localT;
      const y = curve1.y + (curve2.y - curve1.y) * localT;

      ReallyRacer._track.centerLine.push({ x, y });

      // Add checkpoints every 20 points
      if (i % 20 === 0) {
        ReallyRacer._track.checkpoints.push({ x, y, passed: false });
      }
    }

    // Generate barriers along the track
    ReallyRacer._generateBarriers();

    // Generate power-ups
    ReallyRacer._generatePowerups();

    // Generate obstacles for harder tracks
    if (trackIndex > 0) {
      ReallyRacer._generateObstacles(trackIndex);
    }

    // Set player start position
    if (ReallyRacer._track.centerLine.length > 0) {
      const start = ReallyRacer._track.centerLine[0];
      ReallyRacer._player.x = start.x;
      ReallyRacer._player.y = start.y;
      ReallyRacer._player.angle = 0;
      ReallyRacer._player.speed = 0;
      ReallyRacer._player.velocityX = 0;
      ReallyRacer._player.velocityY = 0;
    }

    // Generate AI cars
    ReallyRacer._generateAICars();
  }

  static _generateBarriers() {
    const trackWidth = ReallyRacer._track.width;

    for (let i = 0; i < ReallyRacer._track.centerLine.length; i++) {
      const point = ReallyRacer._track.centerLine[i];
      const nextPoint = ReallyRacer._track.centerLine[(i + 1) % ReallyRacer._track.centerLine.length];

      // Calculate perpendicular direction
      const dx = nextPoint.x - point.x;
      const dy = nextPoint.y - point.y;
      const length = Math.sqrt(dx * dx + dy * dy);

      if (length > 0) {
        const perpX = -dy / length;
        const perpY = dx / length;

        // Left barrier
        ReallyRacer._track.barriers.push({
          x: point.x + perpX * trackWidth / 2,
          y: point.y + perpY * trackWidth / 2,
          width: 10,
          height: 10
        });

        // Right barrier
        ReallyRacer._track.barriers.push({
          x: point.x - perpX * trackWidth / 2,
          y: point.y - perpY * trackWidth / 2,
          width: 10,
          height: 10
        });
      }
    }
  }

  static _generatePowerups() {
    const powerupTypes = ['nitro', 'speed', 'shield'];

    for (let i = 0; i < 10; i++) {
      const pointIndex = Math.floor(Math.random() * ReallyRacer._track.centerLine.length);
      const point = ReallyRacer._track.centerLine[pointIndex];

      ReallyRacer._track.powerups.push({
        x: point.x + (Math.random() - 0.5) * 40,
        y: point.y + (Math.random() - 0.5) * 40,
        type: powerupTypes[Math.floor(Math.random() * powerupTypes.length)],
        collected: false,
        rotation: 0,
        pulsePhase: Math.random() * Math.PI * 2
      });
    }
  }

  static _generateObstacles(trackIndex) {
    const obstacleCount = trackIndex * 5;

    for (let i = 0; i < obstacleCount; i++) {
      const pointIndex = Math.floor(Math.random() * ReallyRacer._track.centerLine.length);
      const point = ReallyRacer._track.centerLine[pointIndex];

      ReallyRacer._track.obstacles.push({
        x: point.x + (Math.random() - 0.5) * 60,
        y: point.y + (Math.random() - 0.5) * 60,
        width: 15,
        height: 15,
        type: 'oil'
      });
    }
  }

  static _generateAICars() {
    ReallyRacer._aiCars = [];
    const carCount = 3;

    for (let i = 0; i < carCount; i++) {
      const startIndex = Math.floor((i + 1) * 10) % ReallyRacer._track.centerLine.length;
      const startPoint = ReallyRacer._track.centerLine[startIndex];

      ReallyRacer._aiCars.push({
        x: startPoint.x,
        y: startPoint.y,
        angle: 0,
        speed: 0,
        targetIndex: startIndex,
        checkpoint: 0,
        lap: 1,
        width: 18,
        height: 35,
        color: `hsl(${i * 120}, 70%, 60%)`,
        maxSpeed: 200 + Math.random() * 50,
        finished: false
      });
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // GAME LOOP
  // ═══════════════════════════════════════════════════════════════

  static _startRace() {
    console.log('🏁 Starting race');

    ReallyRacer._gameState = 'countdown';
    ReallyRacer._currentLap = 1;
    ReallyRacer._lapTime = 0;
    ReallyRacer._raceStartTime = 0;
    ReallyRacer._raceFinished = false;

    // Reset player
    ReallyRacer._player.speed = 0;
    ReallyRacer._player.velocityX = 0;
    ReallyRacer._player.velocityY = 0;
    ReallyRacer._player.nitro = ReallyRacer._player.maxNitro;
    ReallyRacer._player.nitroActive = false;

    // Reset track progress
    ReallyRacer._track.currentCheckpoint = 0;
    ReallyRacer._track.checkpoints.forEach(cp => cp.passed = false);
    ReallyRacer._track.powerups.forEach(pu => pu.collected = false);

    // Clear effects
    ReallyRacer._particles = [];
    ReallyRacer._explosions = [];
    ReallyRacer._skidMarks = [];

    // Reset AI cars
    ReallyRacer._generateAICars();

    // Hide overlay and start countdown
    ReallyRacer._hideAllScreens();
    ReallyRacer._startCountdown();
  }

  static _startCountdown() {
    let count = 3;
    const countdownEl = ReallyRacer._container.querySelector('#countdown');
    const overlay = ReallyRacer._container.querySelector('#racer-overlay');

    overlay.style.display = 'flex';
    countdownEl.style.display = 'block';
    countdownEl.textContent = count;

    const countInterval = setInterval(() => {
      count--;
      if (count > 0) {
        countdownEl.textContent = count;
      } else if (count === 0) {
        countdownEl.textContent = 'GO!';
        countdownEl.style.color = '#00ff00';
      } else {
        clearInterval(countInterval);
        overlay.style.display = 'none';
        countdownEl.style.display = 'none';
        countdownEl.style.color = '#ffff00';

        // Start the actual race
        ReallyRacer._gameState = 'playing';
        ReallyRacer._raceStartTime = performance.now();
        ReallyRacer._startGameLoop();
      }
    }, 1000);
  }

  static _startGameLoop() {
    ReallyRacer._lastTime = performance.now();
    ReallyRacer._running = true;
    ReallyRacer._gameLoop(ReallyRacer._lastTime);
  }

  static _stopGame() {
    ReallyRacer._running = false;
    if (ReallyRacer._animationId) {
      cancelAnimationFrame(ReallyRacer._animationId);
      ReallyRacer._animationId = null;
    }
  }

  static _gameLoop(timestamp) {
    if (!ReallyRacer._running) return;

    const deltaTime = (timestamp - ReallyRacer._lastTime) / 1000;
    ReallyRacer._lastTime = timestamp;

    if (ReallyRacer._gameState === 'playing') {
      ReallyRacer._update(deltaTime);
    }

    ReallyRacer._render();
    ReallyRacer._renderMinimap();
    ReallyRacer._animationId = requestAnimationFrame(ReallyRacer._gameLoop.bind(ReallyRacer));
  }

  // ═══════════════════════════════════════════════════════════════
  // UPDATE LOGIC
  // ═══════════════════════════════════════════════════════════════

  static _update(deltaTime) {
    // Update race time
    ReallyRacer._lapTime += deltaTime;

    // Update player
    ReallyRacer._updatePlayer(deltaTime);

    // Update AI cars
    ReallyRacer._updateAICars(deltaTime);

    // Update camera
    ReallyRacer._updateCamera(deltaTime);

    // Update effects
    ReallyRacer._updateParticles(deltaTime);
    ReallyRacer._updatePowerups(deltaTime);

    // Check collisions
    ReallyRacer._checkCollisions();

    // Check lap progress
    ReallyRacer._checkLapProgress();

    // Update UI
    ReallyRacer._updateUI();
  }

  static _updatePlayer(deltaTime) {
    const player = ReallyRacer._player;

    // Handle input
    let accelerating = false;
    let braking = false;
    let turningLeft = false;
    let turningRight = false;

    if (ReallyRacer._keys['ArrowUp'] || ReallyRacer._keys['KeyW']) accelerating = true;
    if (ReallyRacer._keys['ArrowDown'] || ReallyRacer._keys['KeyS']) braking = true;
    if (ReallyRacer._keys['ArrowLeft'] || ReallyRacer._keys['KeyA']) turningLeft = true;
    if (ReallyRacer._keys['ArrowRight'] || ReallyRacer._keys['KeyD']) turningRight = true;

    // Nitro
    if (ReallyRacer._keys['Space'] && player.nitro > 0) {
      player.nitroActive = true;
      player.nitro = Math.max(0, player.nitro - 50 * deltaTime);
    } else {
      player.nitroActive = false;
      player.nitro = Math.min(player.maxNitro, player.nitro + 20 * deltaTime);
    }

    // Calculate acceleration
    let acceleration = 0;
    if (accelerating) {
      acceleration = player.acceleration;
      if (player.nitroActive) {
        acceleration *= 2;
        ReallyRacer._createNitroParticles();
      }
    } else if (braking) {
      acceleration = -player.deceleration;
    }

    // Update speed
    player.speed += acceleration * deltaTime;
    player.speed = Math.max(-player.maxSpeed * 0.5, Math.min(player.maxSpeed, player.speed));

    // Apply friction
    if (!accelerating && !braking) {
      player.speed *= Math.pow(player.friction, deltaTime * 60);
    }

    // Handle turning
    if (Math.abs(player.speed) > 10) {
      if (turningLeft) {
        player.angle -= player.turnSpeed * deltaTime * (Math.abs(player.speed) / player.maxSpeed);
        if (Math.abs(player.speed) > 150) ReallyRacer._createSkidMarks();
      }
      if (turningRight) {
        player.angle += player.turnSpeed * deltaTime * (Math.abs(player.speed) / player.maxSpeed);
        if (Math.abs(player.speed) > 150) ReallyRacer._createSkidMarks();
      }
    }

    // Update velocity based on angle and speed
    player.velocityX = Math.cos(player.angle) * player.speed;
    player.velocityY = Math.sin(player.angle) * player.speed;

    // Update position
    player.x += player.velocityX * deltaTime;
    player.y += player.velocityY * deltaTime;

    // Keep player in bounds
    player.x = Math.max(0, Math.min(ReallyRacer._width, player.x));
    player.y = Math.max(0, Math.min(ReallyRacer._height, player.y));
  }

  static _updateAICars(deltaTime) {
    for (const aiCar of ReallyRacer._aiCars) {
      if (aiCar.finished) continue;

      // Find target point on track
      const targetPoint = ReallyRacer._track.centerLine[aiCar.targetIndex];

      // Calculate direction to target
      const dx = targetPoint.x - aiCar.x;
      const dy = targetPoint.y - aiCar.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Update target if close enough
      if (distance < 30) {
        aiCar.targetIndex = (aiCar.targetIndex + 1) % ReallyRacer._track.centerLine.length;
      }

      // Calculate desired angle
      const targetAngle = Math.atan2(dy, dx);

      // Smooth angle transition
      let angleDiff = targetAngle - aiCar.angle;
      while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
      while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;

      aiCar.angle += angleDiff * 2 * deltaTime;

      // Update speed (AI cars maintain consistent speed)
      aiCar.speed = aiCar.maxSpeed * 0.8;

      // Update position
      aiCar.x += Math.cos(aiCar.angle) * aiCar.speed * deltaTime;
      aiCar.y += Math.sin(aiCar.angle) * aiCar.speed * deltaTime;

      // Keep AI cars in bounds
      aiCar.x = Math.max(0, Math.min(ReallyRacer._width, aiCar.x));
      aiCar.y = Math.max(0, Math.min(ReallyRacer._height, aiCar.y));
    }
  }

  static _updateCamera(deltaTime) {
    const player = ReallyRacer._player;

    // Camera follows player with some offset based on speed
    const speedOffset = player.speed * 0.1;
    ReallyRacer._camera.targetX = player.x - ReallyRacer._width / 2 + Math.cos(player.angle) * speedOffset;
    ReallyRacer._camera.targetY = player.y - ReallyRacer._height / 2 + Math.sin(player.angle) * speedOffset;

    // Smooth camera movement
    ReallyRacer._camera.x += (ReallyRacer._camera.targetX - ReallyRacer._camera.x) * ReallyRacer._camera.smoothing;
    ReallyRacer._camera.y += (ReallyRacer._camera.targetY - ReallyRacer._camera.y) * ReallyRacer._camera.smoothing;
  }

  static _updateParticles(deltaTime) {
    for (let i = ReallyRacer._particles.length - 1; i >= 0; i--) {
      const particle = ReallyRacer._particles[i];

      particle.x += particle.velocityX * deltaTime;
      particle.y += particle.velocityY * deltaTime;
      particle.life -= deltaTime;
      particle.size *= 0.98;

      if (particle.life <= 0 || particle.size < 0.5) {
        ReallyRacer._particles.splice(i, 1);
      }
    }
  }

  static _updatePowerups(deltaTime) {
    for (const powerup of ReallyRacer._track.powerups) {
      if (!powerup.collected) {
        powerup.rotation += 2 * deltaTime;
        powerup.pulsePhase += 3 * deltaTime;
      }
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // COLLISION AND GAME LOGIC
  // ═══════════════════════════════════════════════════════════════

  static _checkCollisions() {
    const player = ReallyRacer._player;

    // Check powerup collisions
    for (const powerup of ReallyRacer._track.powerups) {
      if (!powerup.collected && ReallyRacer._checkCircleCollision(player, powerup, 20)) {
        powerup.collected = true;
        ReallyRacer._collectPowerup(powerup.type);
      }
    }

    // Check barrier collisions
    for (const barrier of ReallyRacer._track.barriers) {
      if (ReallyRacer._checkRectCollision(player, barrier)) {
        // Bounce off barriers
        player.speed *= -0.3;
        player.x -= player.velocityX * 0.1;
        player.y -= player.velocityY * 0.1;
        ReallyRacer._createCrashParticles();
      }
    }

    // Check obstacle collisions
    for (const obstacle of ReallyRacer._track.obstacles) {
      if (ReallyRacer._checkRectCollision(player, obstacle)) {
        if (obstacle.type === 'oil') {
          // Oil slick - lose control temporarily
          player.angle += (Math.random() - 0.5) * 0.5;
          player.speed *= 0.7;
        }
      }
    }
  }

  static _checkLapProgress() {
    const player = ReallyRacer._player;
    const checkpoints = ReallyRacer._track.checkpoints;

    // Check checkpoint progression
    for (let i = 0; i < checkpoints.length; i++) {
      const checkpoint = checkpoints[i];

      if (!checkpoint.passed && ReallyRacer._checkCircleCollision(player, checkpoint, 40)) {
        if (i === ReallyRacer._track.currentCheckpoint) {
          checkpoint.passed = true;
          ReallyRacer._track.currentCheckpoint = (ReallyRacer._track.currentCheckpoint + 1) % checkpoints.length;

          // Check if lap completed
          if (ReallyRacer._track.currentCheckpoint === 0 && ReallyRacer._currentLap > 0) {
            ReallyRacer._completeLap();
          }
        }
      }
    }
  }

  static _completeLap() {
    const lapTime = ReallyRacer._lapTime;

    if (lapTime < ReallyRacer._bestLapTime) {
      ReallyRacer._bestLapTime = lapTime;
    }

    ReallyRacer._currentLap++;
    ReallyRacer._lapTime = 0;

    // Reset checkpoints
    ReallyRacer._track.checkpoints.forEach(cp => cp.passed = false);

    if (ReallyRacer._currentLap > ReallyRacer._totalLaps) {
      ReallyRacer._finishRace();
    }
  }

  static _finishRace() {
    ReallyRacer._gameState = 'finished';
    ReallyRacer._raceFinished = true;
    ReallyRacer._stopGame();

    // Update save data
    if (ReallyRacer._bestLapTime < ReallyRacer._saveData.bestTimes[ReallyRacer._currentTrack]) {
      ReallyRacer._saveData.bestTimes[ReallyRacer._currentTrack] = ReallyRacer._bestLapTime;
    }

    ReallyRacer._saveData.totalRaces++;

    // Unlock next track
    if (ReallyRacer._currentTrack < ReallyRacer._tracks.length - 1) {
      ReallyRacer._saveData.unlockedTracks[ReallyRacer._currentTrack + 1] = true;
    }

    ReallyRacer._saveGameData();
    ReallyRacer._showRaceResults();
  }

  // ═══════════════════════════════════════════════════════════════
  // UTILITY FUNCTIONS
  // ═══════════════════════════════════════════════════════════════

  static _checkRectCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
  }

  static _checkCircleCollision(obj1, obj2, radius) {
    const dx = obj1.x - obj2.x;
    const dy = obj1.y - obj2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < radius;
  }

  static _collectPowerup(type) {
    switch (type) {
      case 'nitro':
        ReallyRacer._player.nitro = Math.min(ReallyRacer._player.maxNitro, ReallyRacer._player.nitro + 30);
        break;
      case 'speed':
        ReallyRacer._player.speed += 50;
        break;
      case 'shield':
        // Temporary invincibility
        break;
    }

    ReallyRacer._createCollectParticles();
  }

  static _createNitroParticles() {
    const player = ReallyRacer._player;
    const count = 3;

    for (let i = 0; i < count; i++) {
      ReallyRacer._particles.push({
        x: player.x - Math.cos(player.angle) * 25,
        y: player.y - Math.sin(player.angle) * 25,
        velocityX: (Math.random() - 0.5) * 100 - Math.cos(player.angle) * 50,
        velocityY: (Math.random() - 0.5) * 100 - Math.sin(player.angle) * 50,
        size: 4 + Math.random() * 6,
        life: 0.5,
        color: '#00ffff'
      });
    }
  }

  static _createSkidMarks() {
    const player = ReallyRacer._player;

    ReallyRacer._skidMarks.push({
      x: player.x,
      y: player.y,
      life: 3.0
    });

    // Limit skid marks
    if (ReallyRacer._skidMarks.length > 100) {
      ReallyRacer._skidMarks.shift();
    }
  }

  static _createCrashParticles() {
    const player = ReallyRacer._player;
    const count = 8;

    for (let i = 0; i < count; i++) {
      ReallyRacer._particles.push({
        x: player.x,
        y: player.y,
        velocityX: (Math.random() - 0.5) * 200,
        velocityY: (Math.random() - 0.5) * 200,
        size: 3 + Math.random() * 5,
        life: 1.0,
        color: '#ff4400'
      });
    }
  }

  static _createCollectParticles() {
    const player = ReallyRacer._player;
    const count = 6;

    for (let i = 0; i < count; i++) {
      ReallyRacer._particles.push({
        x: player.x,
        y: player.y,
        velocityX: (Math.random() - 0.5) * 150,
        velocityY: (Math.random() - 0.5) * 150,
        size: 2 + Math.random() * 4,
        life: 0.8,
        color: '#ffff00'
      });
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // RENDERING
  // ═══════════════════════════════════════════════════════════════

  static _render() {
    const ctx = ReallyRacer._ctx;

    ctx.save();

    // Apply camera transformation
    ctx.translate(-ReallyRacer._camera.x, -ReallyRacer._camera.y);

    // Clear canvas
    ctx.fillStyle = '#001122';
    ctx.fillRect(ReallyRacer._camera.x, ReallyRacer._camera.y, ReallyRacer._width, ReallyRacer._height);

    // Render track
    ReallyRacer._renderTrack(ctx);

    // Render game objects
    ReallyRacer._renderSkidMarks(ctx);
    ReallyRacer._renderPowerups(ctx);
    ReallyRacer._renderObstacles(ctx);
    ReallyRacer._renderAICars(ctx);
    ReallyRacer._renderPlayer(ctx);
    ReallyRacer._renderParticles(ctx);
    ReallyRacer._renderCheckpoints(ctx);

    ctx.restore();
  }

  static _renderTrack(ctx) {
    const centerLine = ReallyRacer._track.centerLine;

    if (centerLine.length === 0) return;

    // Draw track surface
    ctx.strokeStyle = '#333333';
    ctx.lineWidth = ReallyRacer._track.width;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    ctx.moveTo(centerLine[0].x, centerLine[0].y);
    for (let i = 1; i < centerLine.length; i++) {
      ctx.lineTo(centerLine[i].x, centerLine[i].y);
    }
    ctx.closePath();
    ctx.stroke();

    // Draw center line
    ctx.strokeStyle = '#666666';
    ctx.lineWidth = 2;
    ctx.setLineDash([10, 10]);

    ctx.beginPath();
    ctx.moveTo(centerLine[0].x, centerLine[0].y);
    for (let i = 1; i < centerLine.length; i++) {
      ctx.lineTo(centerLine[i].x, centerLine[i].y);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw barriers
    ctx.fillStyle = '#ff0000';
    for (const barrier of ReallyRacer._track.barriers) {
      ctx.fillRect(barrier.x - 2, barrier.y - 2, 4, 4);
    }
  }

  static _renderPlayer(ctx) {
    const player = ReallyRacer._player;

    ctx.save();
    ctx.translate(player.x, player.y);
    ctx.rotate(player.angle);

    // Car body
    ctx.fillStyle = player.nitroActive ? '#00ffff' : '#0088ff';
    ctx.fillRect(-player.width/2, -player.height/2, player.width, player.height);

    // Car details
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-player.width/2 + 3, -player.height/2 + 5, player.width - 6, 4);
    ctx.fillRect(-player.width/2 + 3, player.height/2 - 9, player.width - 6, 4);

    // Wheels
    ctx.fillStyle = '#222222';
    ctx.fillRect(-player.width/2 - 2, -player.height/2 + 8, 4, 8);
    ctx.fillRect(player.width/2 - 2, -player.height/2 + 8, 4, 8);
    ctx.fillRect(-player.width/2 - 2, player.height/2 - 16, 4, 8);
    ctx.fillRect(player.width/2 - 2, player.height/2 - 16, 4, 8);

    ctx.restore();
  }

  static _renderAICars(ctx) {
    for (const aiCar of ReallyRacer._aiCars) {
      if (aiCar.finished) continue;

      ctx.save();
      ctx.translate(aiCar.x, aiCar.y);
      ctx.rotate(aiCar.angle);

      // Car body
      ctx.fillStyle = aiCar.color;
      ctx.fillRect(-aiCar.width/2, -aiCar.height/2, aiCar.width, aiCar.height);

      // Car details
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(-aiCar.width/2 + 2, -aiCar.height/2 + 4, aiCar.width - 4, 3);
      ctx.fillRect(-aiCar.width/2 + 2, aiCar.height/2 - 7, aiCar.width - 4, 3);

      ctx.restore();
    }
  }

  static _renderPowerups(ctx) {
    for (const powerup of ReallyRacer._track.powerups) {
      if (powerup.collected) continue;

      ctx.save();
      ctx.translate(powerup.x, powerup.y);
      ctx.rotate(powerup.rotation);

      const pulse = 0.8 + 0.2 * Math.sin(powerup.pulsePhase);
      ctx.scale(pulse, pulse);

      // Draw powerup based on type
      switch (powerup.type) {
        case 'nitro':
          ctx.fillStyle = '#00ffff';
          ctx.beginPath();
          ctx.arc(0, 0, 8, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#ffffff';
          ctx.fillText('N', -3, 3);
          break;
        case 'speed':
          ctx.fillStyle = '#ffff00';
          ctx.fillRect(-6, -6, 12, 12);
          ctx.fillStyle = '#000000';
          ctx.fillText('S', -3, 3);
          break;
        case 'shield':
          ctx.fillStyle = '#00ff00';
          ctx.beginPath();
          ctx.arc(0, 0, 8, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#ffffff';
          ctx.fillText('⚡', -4, 4);
          break;
      }

      ctx.restore();
    }
  }

  static _renderObstacles(ctx) {
    for (const obstacle of ReallyRacer._track.obstacles) {
      ctx.fillStyle = '#444444';
      ctx.fillRect(obstacle.x - obstacle.width/2, obstacle.y - obstacle.height/2, obstacle.width, obstacle.height);
    }
  }

  static _renderParticles(ctx) {
    for (const particle of ReallyRacer._particles) {
      const alpha = particle.life / 1.0;
      ctx.fillStyle = particle.color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
      ctx.fillRect(particle.x - particle.size/2, particle.y - particle.size/2, particle.size, particle.size);
    }
  }

  static _renderSkidMarks(ctx) {
    ctx.strokeStyle = '#222222';
    ctx.lineWidth = 2;

    for (let i = 1; i < ReallyRacer._skidMarks.length; i++) {
      const mark1 = ReallyRacer._skidMarks[i - 1];
      const mark2 = ReallyRacer._skidMarks[i];

      const alpha = mark2.life / 3.0;
      ctx.globalAlpha = alpha;

      ctx.beginPath();
      ctx.moveTo(mark1.x, mark1.y);
      ctx.lineTo(mark2.x, mark2.y);
      ctx.stroke();
    }

    ctx.globalAlpha = 1;
  }

  static _renderCheckpoints(ctx) {
    for (let i = 0; i < ReallyRacer._track.checkpoints.length; i++) {
      const checkpoint = ReallyRacer._track.checkpoints[i];

      if (i === ReallyRacer._track.currentCheckpoint) {
        // Current checkpoint
        ctx.strokeStyle = '#00ff00';
        ctx.lineWidth = 3;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.arc(checkpoint.x, checkpoint.y, 30, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      } else if (checkpoint.passed) {
        // Passed checkpoint
        ctx.fillStyle = '#006600';
        ctx.beginPath();
        ctx.arc(checkpoint.x, checkpoint.y, 15, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  static _renderMinimap() {
    const ctx = ReallyRacer._minimapCtx;
    const scale = 0.1;

    // Clear minimap
    ctx.fillStyle = '#000033';
    ctx.fillRect(0, 0, 146, 146);

    // Draw track on minimap
    ctx.strokeStyle = '#666666';
    ctx.lineWidth = 2;
    ctx.beginPath();

    const centerLine = ReallyRacer._track.centerLine;
    if (centerLine.length > 0) {
      ctx.moveTo(centerLine[0].x * scale, centerLine[0].y * scale);
      for (let i = 1; i < centerLine.length; i++) {
        ctx.lineTo(centerLine[i].x * scale, centerLine[i].y * scale);
      }
      ctx.closePath();
      ctx.stroke();
    }

    // Draw player on minimap
    ctx.fillStyle = '#00ffff';
    ctx.beginPath();
    ctx.arc(ReallyRacer._player.x * scale, ReallyRacer._player.y * scale, 3, 0, Math.PI * 2);
    ctx.fill();

    // Draw AI cars on minimap
    for (const aiCar of ReallyRacer._aiCars) {
      ctx.fillStyle = aiCar.color;
      ctx.beginPath();
      ctx.arc(aiCar.x * scale, aiCar.y * scale, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // UI AND MENU MANAGEMENT
  // ═══════════════════════════════════════════════════════════════

  static _updateUI() {
    // Update speed display
    const speedMph = Math.abs(ReallyRacer._player.speed) * 0.5; // Convert to "mph"
    const speedEl = ReallyRacer._container.querySelector('#racer-speed');
    if (speedEl) speedEl.textContent = `SPEED: ${Math.floor(speedMph)} mph`;

    // Update lap display
    const lapEl = ReallyRacer._container.querySelector('#racer-lap');
    if (lapEl) lapEl.textContent = `LAP: ${ReallyRacer._currentLap} / ${ReallyRacer._totalLaps}`;

    // Update position (simplified)
    const positionEl = ReallyRacer._container.querySelector('#racer-position');
    if (positionEl) positionEl.textContent = `POSITION: 1st`;

    // Update nitro bar
    const nitroFill = ReallyRacer._container.querySelector('#nitro-fill');
    if (nitroFill) nitroFill.style.width = `${(ReallyRacer._player.nitro / ReallyRacer._player.maxNitro) * 100}%`;

    // Update time display
    const timeEl = ReallyRacer._container.querySelector('#racer-time');
    if (timeEl) timeEl.textContent = `TIME: ${ReallyRacer._formatTime(ReallyRacer._lapTime)}`;

    // Update best time
    const bestEl = ReallyRacer._container.querySelector('#racer-best');
    if (bestEl) {
      const bestTime = ReallyRacer._bestLapTime === Infinity ? '--:--.---' : ReallyRacer._formatTime(ReallyRacer._bestLapTime);
      bestEl.textContent = `BEST: ${bestTime}`;
    }

    // Update track name
    const trackEl = ReallyRacer._container.querySelector('#racer-track');
    if (trackEl) trackEl.textContent = `TRACK: ${ReallyRacer._tracks[ReallyRacer._currentTrack].name}`;
  }

  static _formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const ms = Math.floor((secs % 1) * 1000);
    return `${mins}:${Math.floor(secs).toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`;
  }

  static _populateTrackSelection() {
    const trackList = ReallyRacer._container.querySelector('#track-list');

    ReallyRacer._tracks.forEach((track, index) => {
      const button = document.createElement('button');
      button.className = 'track-button';
      button.style.borderColor = track.color;

      if (!ReallyRacer._saveData.unlockedTracks[index]) {
        button.classList.add('locked');
        button.innerHTML = `
          <div style="font-size: 18px; margin-bottom: 8px;">🔒 ${track.name}</div>
          <div style="font-size: 14px;">LOCKED</div>
        `;
      } else {
        button.innerHTML = `
          <div style="font-size: 18px; margin-bottom: 8px;">${track.name}</div>
          <div style="font-size: 14px;">Difficulty: ${track.difficulty}</div>
          <div style="font-size: 12px;">Best: ${ReallyRacer._saveData.bestTimes[index] === Infinity ? '--:--.---' : ReallyRacer._formatTime(ReallyRacer._saveData.bestTimes[index])}</div>
        `;

        button.addEventListener('click', () => {
          ReallyRacer._currentTrack = index;
          ReallyRacer._generateTrack(index);
          ReallyRacer._showScreen('main-menu');
        });
      }

      button.addEventListener('mouseover', () => {
        if (!button.classList.contains('locked')) {
          button.style.boxShadow = `0 0 20px ${track.color}`;
        }
      });

      button.addEventListener('mouseout', () => {
        button.style.boxShadow = '';
      });

      trackList.appendChild(button);
    });
  }

  static _showScreen(screenId) {
    // Hide all screens
    ReallyRacer._hideAllScreens();

    // Show specific screen
    const screen = ReallyRacer._container.querySelector(`#${screenId}`);
    if (screen) {
      screen.style.display = 'block';
    }

    const overlay = ReallyRacer._container.querySelector('#racer-overlay');
    if (overlay) {
      overlay.style.display = 'flex';
    }
  }

  static _hideAllScreens() {
    const screens = ['main-menu', 'track-selection', 'controls-screen', 'race-finished'];
    screens.forEach(screenId => {
      const screen = ReallyRacer._container.querySelector(`#${screenId}`);
      if (screen) screen.style.display = 'none';
    });

    const overlay = ReallyRacer._container.querySelector('#racer-overlay');
    if (overlay) {
      overlay.style.display = 'none';
    }
  }

  static _showRaceResults() {
    const raceStats = ReallyRacer._container.querySelector('#race-stats');
    if (raceStats) {
      raceStats.innerHTML = `
        Best Lap Time: ${ReallyRacer._formatTime(ReallyRacer._bestLapTime)}<br>
        Track: ${ReallyRacer._tracks[ReallyRacer._currentTrack].name}<br>
        Total Races: ${ReallyRacer._saveData.totalRaces}
      `;
    }

    ReallyRacer._showScreen('race-finished');
  }

  static _pauseGame() {
    if (ReallyRacer._gameState === 'playing') {
      ReallyRacer._gameState = 'paused';
      ReallyRacer._stopGame();
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // SAVE/LOAD SYSTEM
  // ═══════════════════════════════════════════════════════════════

  static _saveGameData() {
    try {
      localStorage.setItem('reallyRacerSave', JSON.stringify(ReallyRacer._saveData));
    } catch (e) {
      console.warn('Could not save game data');
    }
  }

  static _loadGameData() {
    try {
      const saved = localStorage.getItem('reallyRacerSave');
      if (saved) {
        ReallyRacer._saveData = { ...ReallyRacer._saveData, ...JSON.parse(saved) };
      }

      // Update displays
      const bestTimeEl = ReallyRacer._container.querySelector('#best-time-display');
      if (bestTimeEl) {
        const bestTime = Math.min(...ReallyRacer._saveData.bestTimes.filter(t => t !== Infinity));
        bestTimeEl.textContent = bestTime === Infinity ? '--:--.---' : ReallyRacer._formatTime(bestTime);
      }

      const winsEl = ReallyRacer._container.querySelector('#wins-display');
      if (winsEl) winsEl.textContent = ReallyRacer._saveData.totalWins;

    } catch (e) {
      console.warn('Could not load game data');
    }
  }
}

// Export for WindowManager
window.ReallyRacer = ReallyRacer;