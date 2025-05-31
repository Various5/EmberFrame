/**
 * APP_METADATA
 * @name Really Racer
 * @icon fas fa-car
 * @description Physics-based 2D sidescrolling racing adventure
 * @category Games
 * @version 5.0.1
 * @author EmberFrame Team
 * @enabled true
 */

class GameReallyRacer {
  // ═══════════════════════════════════════════════════════════════
  // CORE GAME PROPERTIES
  // ═══════════════════════════════════════════════════════════════
  static _container = null;
  static _canvas = null;
  static _ctx = null;
  static _width = 1000;
  static _height = 600;

  // Game State
  static _gameState = 'menu'; // menu, playing, paused, finished, crashed
  static _currentLevel = 0;
  static _distance = 0;
  static _maxDistance = 0;
  static _time = 0;
  static _fuel = 100;
  static _coins = 0;
  static _totalCoins = 0;

  // Physics Vehicle
  static _vehicle = {
    // Position and rotation
    x: 150, y: 200, angle: 0,

    // Physics
    velocityX: 0, velocityY: 0, angularVelocity: 0,
    speed: 0, onGround: false, crashed: false,

    // Vehicle properties
    width: 50, height: 30, wheelBase: 40,
    enginePower: 800, maxSpeed: 25, brakeForce: 600,
    mass: 1, friction: 0.9, airResistance: 0.98,

    // Wheels
    frontWheel: { x: 0, y: 0, rotation: 0, onGround: false, grip: 0.9 },
    rearWheel: { x: 0, y: 0, rotation: 0, onGround: false, grip: 0.9 },

    // Visual effects
    exhaustParticles: [], sparks: [], smokeTrail: []
  };

  // Camera System
  static _camera = {
    x: 0, y: 0, targetX: 0, targetY: 0,
    smoothing: 0.08, shake: 0, zoom: 1
  };

  // World Physics
  static _world = {
    gravity: 1200, friction: 0.7, airDensity: 0.02,
    wind: 0, temperature: 20
  };

  // Terrain System
  static _terrain = {
    points: [], segments: [], obstacles: [],
    coins: [], powerups: [], checkpoints: [],
    width: 5000, segmentLength: 20
  };

  // Particle Systems
  static _particles = {
    dust: [], exhaust: [], sparks: [], coins: [],
    explosion: [], smoke: [], debris: []
  };

  // Input State
  static _keys = {};
  static _mouseDown = false;

  // Game Systems
  static _soundQueue = [];
  static _screenEffects = { shake: 0, flash: 0 };

  // Timing
  static _lastTime = 0;
  static _running = false;
  static _animationId = null;

  // Level Definitions
  static _levels = [
    {
      name: "Gentle Hills",
      difficulty: "Easy",
      theme: "grassland",
      length: 3000,
      maxHeight: 200,
      roughness: 0.3,
      obstacles: 5,
      coins: 15,
      description: "Perfect for beginners - rolling green hills"
    },
    {
      name: "Mountain Madness",
      difficulty: "Medium",
      theme: "mountain",
      length: 4000,
      maxHeight: 300,
      roughness: 0.6,
      obstacles: 10,
      coins: 25,
      description: "Steep climbs and dangerous drops"
    },
    {
      name: "Desert Dunes",
      difficulty: "Hard",
      theme: "desert",
      length: 4500,
      maxHeight: 350,
      roughness: 0.8,
      obstacles: 15,
      coins: 30,
      description: "Sandy slopes and treacherous jumps"
    },
    {
      name: "Arctic Adventure",
      difficulty: "Expert",
      theme: "arctic",
      length: 5000,
      maxHeight: 400,
      roughness: 1.0,
      obstacles: 20,
      coins: 40,
      description: "Icy terrain with extreme challenges"
    },
    {
      name: "Volcano Valley",
      difficulty: "Extreme",
      theme: "volcano",
      length: 6000,
      maxHeight: 500,
      roughness: 1.2,
      obstacles: 25,
      coins: 50,
      description: "Lava pits and explosive obstacles"
    }
  ];

  // Vehicle Upgrades
  static _upgrades = {
    engine: { level: 1, cost: 100, maxLevel: 5 },
    tires: { level: 1, cost: 150, maxLevel: 5 },
    suspension: { level: 1, cost: 200, maxLevel: 5 },
    fuel: { level: 1, cost: 75, maxLevel: 5 },
    armor: { level: 1, cost: 250, maxLevel: 5 }
  };

  // Save Data
  static _saveData = {
    totalCoins: 0, bestDistances: [0, 0, 0, 0, 0],
    unlockedLevels: [true, false, false, false, false],
    upgrades: { engine: 1, tires: 1, suspension: 1, fuel: 1, armor: 1 },
    totalDistance: 0, totalTime: 0, crashes: 0
  };

  // ═══════════════════════════════════════════════════════════════
  // INITIALIZATION
  // ═══════════════════════════════════════════════════════════════

  static createWindow() {
    return {
      title: 'Hill Racer Physics',
      width: '1020px',
      height: '720px',
      content: `
        <div id="hill-racer" style="position: relative; width: 100%; height: 100%; background: linear-gradient(180deg, #87CEEB 0%, #98FB98 100%); overflow: hidden; font-family: 'Arial', sans-serif;">
          
          <!-- Main Game Canvas -->
          <canvas id="physics-canvas" width="1000" height="600"
                  style="display: block; margin: 10px auto; border: 3px solid #228B22; border-radius: 15px; 
                         box-shadow: 0 0 20px rgba(34,139,34,0.4); background: linear-gradient(180deg, #87CEEB 0%, #90EE90 50%, #228B22 100%);"></canvas>
          
          <!-- Game HUD -->
          <div id="game-hud" style="position: absolute; top: 20px; left: 20px; right: 20px; display: none; z-index: 10; pointer-events: none;">
            
            <!-- Top HUD -->
            <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
              
              <!-- Vehicle Status -->
              <div style="background: linear-gradient(135deg, rgba(0,50,0,0.9), rgba(0,100,50,0.7)); padding: 15px 20px; border-radius: 12px; border: 2px solid rgba(34,139,34,0.8); color: white; min-width: 200px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                  <div style="font-size: 20px; font-weight: bold; color: #90EE90;">🏎️ VEHICLE</div>
                  <div id="speed-display" style="font-size: 24px; font-weight: bold; color: #FFD700;">0 mph</div>
                </div>
                
                <!-- Fuel Bar -->
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                  <span style="font-size: 14px; color: #FFD700; min-width: 45px;">FUEL:</span>
                  <div style="flex: 1; height: 8px; background: #333; border-radius: 4px; overflow: hidden; border: 1px solid #555;">
                    <div id="fuel-bar" style="height: 100%; background: linear-gradient(90deg, #ff4444, #ffaa00, #44ff44); width: 100%; transition: width 0.3s;"></div>
                  </div>
                  <span id="fuel-percent" style="font-size: 12px; color: #ccc;">100%</span>
                </div>
                
                <!-- Vehicle Angle -->
                <div style="display: flex; align-items: center; gap: 10px;">
                  <span style="font-size: 14px; color: #FFD700; min-width: 45px;">ANGLE:</span>
                  <div id="angle-display" style="font-size: 14px; color: #87CEEB;">0°</div>
                  <div style="flex: 1; text-align: right;">
                    <span id="air-time" style="font-size: 12px; color: #ff6666;">🛩️ AIRBORNE</span>
                  </div>
                </div>
              </div>

              <!-- Progress & Stats -->
              <div style="background: linear-gradient(135deg, rgba(0,50,0,0.9), rgba(0,100,50,0.7)); padding: 15px 20px; border-radius: 12px; border: 2px solid rgba(34,139,34,0.8); color: white; text-align: right;">
                <div style="display: flex; flex-direction: column; gap: 8px;">
                  <div style="display: flex; gap: 25px; justify-content: end; align-items: center;">
                    <div>
                      <span style="color: #87CEEB; font-size: 12px;">DISTANCE:</span>
                      <span id="distance-display" style="color: #FFD700; font-weight: bold; margin-left: 8px; font-size: 18px;">0m</span>
                    </div>
                    <div>
                      <span style="color: #87CEEB; font-size: 12px;">COINS:</span>
                      <span id="coins-display" style="color: #FFA500; font-weight: bold; margin-left: 8px; font-size: 16px;">💰 0</span>
                    </div>
                  </div>
                  
                  <div style="display: flex; gap: 25px; justify-content: end;">
                    <div>
                      <span style="color: #87CEEB; font-size: 12px;">TIME:</span>
                      <span id="time-display" style="color: #87CEEB; font-weight: bold; margin-left: 8px;">0:00</span>
                    </div>
                    <div>
                      <span style="color: #87CEEB; font-size: 12px;">BEST:</span>
                      <span id="best-distance" style="color: #90EE90; font-weight: bold; margin-left: 8px;">0m</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Controls Hint -->
            <div style="position: absolute; bottom: 20px; right: 20px; background: linear-gradient(135deg, rgba(0,50,0,0.9), rgba(0,100,50,0.7)); padding: 12px 16px; border-radius: 10px; border: 2px solid rgba(34,139,34,0.8); color: white;">
              <div style="font-size: 11px; line-height: 1.4; text-align: center;">
                <div><strong>W/↑</strong> Gas • <strong>S/↓</strong> Brake • <strong>A/D</strong> Balance</div>
                <div><strong>SPACE</strong> Handbrake • <strong>R</strong> Reset • <strong>ESC</strong> Menu</div>
              </div>
            </div>
          </div>

          <!-- Menu System -->
          <div id="menu-overlay" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; background: linear-gradient(135deg, rgba(0,20,0,0.95), rgba(0,40,20,0.9)); z-index: 20; backdrop-filter: blur(10px);">
            
            <!-- Main Menu -->
            <div id="main-menu" style="text-align: center; color: #90EE90;">
              <div style="font-size: 64px; font-weight: bold; margin-bottom: 20px; background: linear-gradient(45deg, #90EE90, #FFD700, #FFA500, #FF6347); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-shadow: 0 0 30px rgba(144,238,144,0.6);">
                🏔️ HILL RACER PHYSICS
              </div>
              <div style="font-size: 20px; margin-bottom: 40px; color: #87CEEB;">
                Master the Art of Physics-Based Racing
              </div>
              
              <div style="display: flex; flex-direction: column; gap: 20px; align-items: center; margin-bottom: 40px;">
                <button id="start-adventure-btn" class="menu-btn primary" style="padding: 20px 50px; font-size: 20px;">
                  🚀 START ADVENTURE
                </button>
                <button id="level-select-btn" class="menu-btn secondary" style="padding: 15px 40px; font-size: 16px;">
                  🏔️ SELECT LEVEL
                </button>
                <button id="garage-workshop-btn" class="menu-btn secondary" style="padding: 15px 40px; font-size: 16px;">
                  🔧 GARAGE & UPGRADES
                </button>
                <button id="help-controls-btn" class="menu-btn secondary" style="padding: 15px 40px; font-size: 16px;">
                  ❓ HOW TO PLAY
                </button>
              </div>

              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; max-width: 500px; margin: 0 auto; font-size: 14px; color: #666;">
                <div style="text-align: center;">
                  <div style="color: #87CEEB; margin-bottom: 5px;">TOTAL DISTANCE</div>
                  <div id="total-distance-display" style="color: #FFD700; font-weight: bold;">0m</div>
                </div>
                <div style="text-align: center;">
                  <div style="color: #87CEEB; margin-bottom: 5px;">TOTAL COINS</div>
                  <div id="total-coins-display" style="color: #FFA500; font-weight: bold;">💰 0</div>
                </div>
                <div style="text-align: center;">
                  <div style="color: #87CEEB; margin-bottom: 5px;">CRASHES</div>
                  <div id="total-crashes-display" style="color: #FF6347; font-weight: bold;">💥 0</div>
                </div>
              </div>
            </div>

            <!-- Level Selection -->
            <div id="level-selection" style="display: none; color: #90EE90; text-align: center; max-width: 900px;">
              <h2 style="font-size: 48px; margin-bottom: 30px; text-shadow: 0 0 20px rgba(144,238,144,0.5);">🏔️ CHOOSE YOUR CHALLENGE</h2>
              <div id="level-cards" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-bottom: 40px;">
                <!-- Level cards will be generated here -->
              </div>
              <button id="back-to-main-btn" class="menu-btn secondary">
                ← BACK TO MAIN MENU
              </button>
            </div>

            <!-- Garage & Upgrades -->
            <div id="garage-workshop" style="display: none; color: #90EE90; text-align: center; max-width: 800px;">
              <h2 style="font-size: 48px; margin-bottom: 30px;">🔧 GARAGE & UPGRADES</h2>
              <div style="display: flex; justify-content: space-between; margin-bottom: 30px;">
                <div style="font-size: 24px; color: #FFD700;">💰 Coins: <span id="garage-coins">0</span></div>
              </div>
              
              <div id="upgrade-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 20px; margin-bottom: 40px;">
                <!-- Upgrade cards will be generated here -->
              </div>
              
              <button id="back-from-garage-btn" class="menu-btn secondary">
                ← BACK
              </button>
            </div>

            <!-- How to Play -->
            <div id="help-controls" style="display: none; color: #90EE90; text-align: center; max-width: 700px;">
              <h2 style="font-size: 48px; margin-bottom: 30px;">❓ HOW TO PLAY</h2>
              
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 30px; text-align: left;">
                
                <div style="background: rgba(0,50,0,0.7); padding: 25px; border-radius: 15px; border: 2px solid rgba(144,238,144,0.3);">
                  <h3 style="color: #FFD700; margin-bottom: 20px; text-align: center;">🎮 CONTROLS</h3>
                  <div style="line-height: 2; font-size: 16px;">
                    <div><strong>W / ↑</strong> - Accelerate (Gas pedal)</div>
                    <div><strong>S / ↓</strong> - Brake / Reverse</div>
                    <div><strong>A / ←</strong> - Lean Backward (Air control)</div>
                    <div><strong>D / →</strong> - Lean Forward (Air control)</div>
                    <div><strong>SPACE</strong> - Handbrake</div>
                    <div><strong>R</strong> - Reset Vehicle</div>
                  </div>
                </div>

                <div style="background: rgba(0,50,0,0.7); padding: 25px; border-radius: 15px; border: 2px solid rgba(144,238,144,0.3);">
                  <h3 style="color: #FFD700; margin-bottom: 20px; text-align: center;">🎯 OBJECTIVES</h3>
                  <div style="line-height: 2; font-size: 16px;">
                    <div><strong>🏁</strong> Reach maximum distance</div>
                    <div><strong>💰</strong> Collect coins for upgrades</div>
                    <div><strong>⛽</strong> Manage your fuel carefully</div>
                    <div><strong>🚗</strong> Don't crash or flip over</div>
                    <div><strong>🏔️</strong> Master challenging terrain</div>
                    <div><strong>⚡</strong> Upgrade your vehicle</div>
                  </div>
                </div>
              </div>

              <div style="background: rgba(0,50,20,0.7); padding: 20px; border-radius: 12px; border: 2px solid rgba(255,215,0,0.3); margin-bottom: 30px;">
                <h4 style="color: #FFD700; margin-bottom: 15px;">💡 PRO TIPS</h4>
                <div style="font-size: 14px; line-height: 1.8; text-align: left;">
                  <div>• Use air control (A/D) to land safely and prevent crashes</div>
                  <div>• Build momentum on downhills to climb steep sections</div>
                  <div>• Brake before jumps to control your landing angle</div>
                  <div>• Collect coins to upgrade engine, tires, suspension, and fuel</div>
                  <div>• Watch your fuel gauge - running out means game over!</div>
                  <div>• Each terrain type requires different driving techniques</div>
                </div>
              </div>

              <button id="back-from-help-btn" class="menu-btn secondary">
                ← BACK
              </button>
            </div>

            <!-- Game Over Screen -->
            <div id="game-over-screen" style="display: none; color: #FF6347; text-align: center;">
              <div style="font-size: 56px; font-weight: bold; margin-bottom: 25px; text-shadow: 0 0 30px rgba(255,99,71,0.8);">
                💥 GAME OVER
              </div>
              <div id="crash-stats" style="font-size: 20px; margin-bottom: 35px; color: #ffffff; line-height: 1.8;"></div>
              <div style="display: flex; gap: 25px; justify-content: center;">
                <button id="retry-level-btn" class="menu-btn primary">
                  🔄 TRY AGAIN
                </button>
                <button id="upgrade-after-crash-btn" class="menu-btn secondary">
                  🔧 UPGRADE VEHICLE
                </button>
                <button id="crash-menu-btn" class="menu-btn secondary">
                  🏠 MAIN MENU
                </button>
              </div>
            </div>

            <!-- Level Complete -->
            <div id="level-complete" style="display: none; color: #90EE90; text-align: center;">
              <div style="font-size: 56px; font-weight: bold; margin-bottom: 25px; text-shadow: 0 0 30px rgba(144,238,144,0.8);">
                🏆 LEVEL COMPLETE!
              </div>
              <div id="completion-stats" style="font-size: 20px; margin-bottom: 35px; color: #ffffff; line-height: 1.8;"></div>
              <div style="display: flex; gap: 25px; justify-content: center;">
                <button id="next-level-btn" class="menu-btn primary" style="display: none;">
                  ➡️ NEXT LEVEL
                </button>
                <button id="replay-level-btn" class="menu-btn secondary">
                  🔄 REPLAY
                </button>
                <button id="complete-menu-btn" class="menu-btn secondary">
                  🏠 MAIN MENU
                </button>
              </div>
            </div>
          </div>

          <style>
            .menu-btn {
              background: linear-gradient(135deg, rgba(34,139,34,0.4), rgba(144,238,144,0.2));
              border: 2px solid #228B22;
              color: #90EE90;
              padding: 15px 30px;
              border-radius: 12px;
              cursor: pointer;
              font-family: inherit;
              font-weight: bold;
              transition: all 0.3s ease;
              backdrop-filter: blur(10px);
              text-transform: uppercase;
              letter-spacing: 1px;
              box-shadow: 0 0 20px rgba(34,139,34,0.3);
            }

            .menu-btn.primary {
              background: linear-gradient(135deg, rgba(255,215,0,0.4), rgba(255,165,0,0.2));
              border-color: #FFD700;
              color: #FFD700;
              font-size: 18px;
              box-shadow: 0 0 25px rgba(255,215,0,0.4);
            }

            .menu-btn:hover {
              transform: translateY(-3px) scale(1.05);
              box-shadow: 0 10px 30px rgba(34,139,34,0.5);
              background: linear-gradient(135deg, rgba(144,238,144,0.6), rgba(34,139,34,0.3));
              border-color: #90EE90;
            }

            .menu-btn.primary:hover {
              box-shadow: 0 10px 35px rgba(255,215,0,0.6);
              background: linear-gradient(135deg, rgba(255,215,0,0.6), rgba(255,165,0,0.4));
              border-color: #FFA500;
            }

            .level-card {
              background: linear-gradient(135deg, rgba(0,50,20,0.8), rgba(0,100,50,0.6));
              border: 2px solid rgba(144,238,144,0.4);
              border-radius: 15px;
              padding: 25px;
              cursor: pointer;
              transition: all 0.4s ease;
              backdrop-filter: blur(10px);
              position: relative;
              overflow: hidden;
            }

            .level-card:hover {
              transform: translateY(-8px) scale(1.03);
              border-color: #90EE90;
              box-shadow: 0 20px 40px rgba(144,238,144,0.3);
            }

            .level-card.locked {
              opacity: 0.6;
              cursor: not-allowed;
              filter: grayscale(0.7);
            }

            .level-card.locked:hover {
              transform: none;
              box-shadow: none;
            }

            .level-card.selected {
              border-color: #FFD700;
              background: linear-gradient(135deg, rgba(255,215,0,0.2), rgba(255,165,0,0.1));
              box-shadow: 0 0 30px rgba(255,215,0,0.5);
            }

            .upgrade-card {
              background: linear-gradient(135deg, rgba(0,50,20,0.8), rgba(0,80,40,0.6));
              border: 2px solid rgba(144,238,144,0.4);
              border-radius: 12px;
              padding: 20px;
              cursor: pointer;
              transition: all 0.3s ease;
              text-align: center;
            }

            .upgrade-card:hover {
              transform: scale(1.05);
              border-color: #90EE90;
              box-shadow: 0 10px 20px rgba(144,238,144,0.3);
            }

            .upgrade-card.maxed {
              border-color: #FFD700;
              background: linear-gradient(135deg, rgba(255,215,0,0.2), rgba(255,165,0,0.1));
            }

            #physics-canvas {
              transition: filter 0.3s ease;
            }

            #physics-canvas.crashed {
              filter: sepia(50%) hue-rotate(-30deg) saturate(150%);
            }

            @keyframes bounce {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.1); }
            }

            .coin-collected {
              animation: bounce 0.3s ease;
            }
          </style>
        </div>
      `,
      onInit: (container) => {
        GameReallyRacer._container = container;
        GameReallyRacer._canvas = container.querySelector('#physics-canvas');
        GameReallyRacer._ctx = GameReallyRacer._canvas.getContext('2d');
        GameReallyRacer._init();
      },
      onDestroy: () => {
        GameReallyRacer._cleanup();
      }
    };
  }

  static _init() {
    console.log('🏔️ Initializing Hill Racer Physics');

    // Load save data
    GameReallyRacer._loadGameData();

    // Setup event listeners
    GameReallyRacer._setupEventListeners();
    GameReallyRacer._setupMenuButtons();

    // Initialize terrain FIRST
    GameReallyRacer._generateTerrain(GameReallyRacer._currentLevel);

    // Initialize systems
    GameReallyRacer._populateLevelSelection();
    GameReallyRacer._populateGarage();

    // Reset vehicle position based on terrain
    GameReallyRacer._resetVehicleOnTerrain();

    // Show main menu
    GameReallyRacer._showScreen('main-menu');

    // Start render loop
    GameReallyRacer._startRenderLoop();

    console.log('✅ Hill Racer Physics initialized successfully');
  }

  // ═══════════════════════════════════════════════════════════════
  // EVENT HANDLING
  // ═══════════════════════════════════════════════════════════════

  static _setupEventListeners() {
    const container = GameReallyRacer._container;

    container.addEventListener('keydown', GameReallyRacer._onKeyDown.bind(GameReallyRacer));
    container.addEventListener('keyup', GameReallyRacer._onKeyUp.bind(GameReallyRacer));

    container.tabIndex = 0;
    container.focus();
  }

  static _setupMenuButtons() {
    const buttons = {
      'start-adventure-btn': () => GameReallyRacer._startLevel(),
      'level-select-btn': () => GameReallyRacer._showScreen('level-selection'),
      'garage-workshop-btn': () => GameReallyRacer._showScreen('garage-workshop'),
      'help-controls-btn': () => GameReallyRacer._showScreen('help-controls'),
      'back-to-main-btn': () => GameReallyRacer._showScreen('main-menu'),
      'back-from-garage-btn': () => GameReallyRacer._showScreen('main-menu'),
      'back-from-help-btn': () => GameReallyRacer._showScreen('main-menu'),
      'retry-level-btn': () => GameReallyRacer._startLevel(),
      'crash-menu-btn': () => GameReallyRacer._showScreen('main-menu'),
      'replay-level-btn': () => GameReallyRacer._startLevel(),
      'complete-menu-btn': () => GameReallyRacer._showScreen('main-menu'),
      'upgrade-after-crash-btn': () => GameReallyRacer._showScreen('garage-workshop'),
      'next-level-btn': () => GameReallyRacer._nextLevel()
    };

    Object.entries(buttons).forEach(([id, handler]) => {
      const element = GameReallyRacer._container.querySelector(`#${id}`);
      if (element) element.addEventListener('click', handler);
    });
  }

  static _onKeyDown(e) {
    GameReallyRacer._keys[e.code] = true;

    if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'KeyW', 'KeyA', 'KeyS', 'KeyD'].includes(e.code)) {
      e.preventDefault();
    }

    // Special keys
    if (e.code === 'KeyR' && GameReallyRacer._gameState === 'playing') {
      GameReallyRacer._resetVehicleOnTerrain();
    }

    if (e.code === 'Escape') {
      if (GameReallyRacer._gameState === 'playing') {
        GameReallyRacer._showScreen('main-menu');
        GameReallyRacer._gameState = 'menu';
        GameReallyRacer._running = false;
      }
    }
  }

  static _onKeyUp(e) {
    GameReallyRacer._keys[e.code] = false;
  }

  // ═══════════════════════════════════════════════════════════════
  // TERRAIN GENERATION
  // ═══════════════════════════════════════════════════════════════

  static _generateTerrain(levelIndex) {
    const level = GameReallyRacer._levels[levelIndex];
    GameReallyRacer._terrain.points = [];
    GameReallyRacer._terrain.coins = [];
    GameReallyRacer._terrain.obstacles = [];

    // Generate height map using Perlin-like noise
    const baseHeight = GameReallyRacer._height - 120; // Higher base terrain
    let currentHeight = baseHeight;

    for (let x = 0; x < level.length; x += GameReallyRacer._terrain.segmentLength) {
      // Create varied terrain
      const noise = Math.sin(x * 0.01) * level.maxHeight * 0.3 +
                   Math.sin(x * 0.005) * level.maxHeight * 0.5 +
                   Math.sin(x * 0.002) * level.maxHeight * 0.2;

      const heightVariation = (Math.random() - 0.5) * level.roughness * 50;
      currentHeight = baseHeight - noise + heightVariation;

      // Clamp height to reasonable bounds - keep terrain visible
      currentHeight = Math.max(50, Math.min(GameReallyRacer._height - 100, currentHeight));

      GameReallyRacer._terrain.points.push({
        x: x,
        y: currentHeight,
        type: 'normal'
      });
    }

    // Add special terrain features
    GameReallyRacer._addTerrainFeatures(level);

    // Generate coins
    GameReallyRacer._generateCoins(level);

    // Generate obstacles
    GameReallyRacer._generateObstacles(level);

    console.log('✅ Terrain generated:', GameReallyRacer._terrain.points.length, 'points');
  }

  static _addTerrainFeatures(level) {
    const points = GameReallyRacer._terrain.points;

    // Add jumps and special sections
    for (let i = 0; i < points.length - 10; i += 50 + Math.floor(Math.random() * 100)) {
      const featureType = Math.random();

      if (featureType < 0.3) {
        // Add jump ramp
        for (let j = 0; j < 8 && i + j < points.length; j++) {
          points[i + j].y -= j * 8;
          points[i + j].type = 'ramp';
        }
      } else if (featureType < 0.5) {
        // Add steep hill
        for (let j = 0; j < 15 && i + j < points.length; j++) {
          const hillHeight = Math.sin((j / 15) * Math.PI) * 80;
          points[i + j].y -= hillHeight;
          points[i + j].type = 'hill';
        }
      }
    }
  }

  static _generateCoins(level) {
    for (let i = 0; i < level.coins; i++) {
      const x = Math.random() * (level.length - 200) + 100;
      const terrainY = GameReallyRacer._getTerrainHeightAt(x);

      GameReallyRacer._terrain.coins.push({
        x: x,
        y: terrainY - 30 - Math.random() * 50,
        collected: false,
        rotation: 0,
        bob: Math.random() * Math.PI * 2
      });
    }
  }

  static _generateObstacles(level) {
    for (let i = 0; i < level.obstacles; i++) {
      const x = Math.random() * (level.length - 300) + 200;
      const terrainY = GameReallyRacer._getTerrainHeightAt(x);

      const obstacleTypes = ['rock', 'tree', 'barrel'];
      const type = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];

      GameReallyRacer._terrain.obstacles.push({
        x: x,
        y: terrainY,
        type: type,
        width: 20 + Math.random() * 20,
        height: 30 + Math.random() * 30
      });
    }
  }

  static _getTerrainHeightAt(x) {
    const points = GameReallyRacer._terrain.points;

    if (!points || points.length === 0) {
      return GameReallyRacer._height - 120; // Default ground level
    }

    const segmentLength = GameReallyRacer._terrain.segmentLength;
    const index = Math.floor(x / segmentLength);

    if (index >= points.length - 1) return points[points.length - 1].y;
    if (index < 0) return points[0].y;

    // Linear interpolation between points
    const t = (x % segmentLength) / segmentLength;
    return points[index].y + (points[index + 1].y - points[index].y) * t;
  }

  // ═══════════════════════════════════════════════════════════════
  // VEHICLE POSITIONING
  // ═══════════════════════════════════════════════════════════════

  static _resetVehicleOnTerrain() {
    const vehicle = GameReallyRacer._vehicle;

    // Set vehicle starting position
    vehicle.x = 150;

    // Get terrain height at starting position
    const terrainHeight = GameReallyRacer._getTerrainHeightAt(vehicle.x);

    // Position vehicle above terrain
    vehicle.y = terrainHeight - vehicle.height - 30; // 30px above terrain
    vehicle.angle = 0;

    // Reset physics
    vehicle.velocityX = 0;
    vehicle.velocityY = 0;
    vehicle.angularVelocity = 0;
    vehicle.speed = 0;
    vehicle.onGround = false;
    vehicle.crashed = false;

    console.log(`🚗 Vehicle positioned at x:${vehicle.x}, y:${vehicle.y}, terrain:${terrainHeight}`);
  }

  // ═══════════════════════════════════════════════════════════════
  // GAME LOOP
  // ═══════════════════════════════════════════════════════════════

  static _startLevel() {
    console.log('🚀 Starting level', GameReallyRacer._currentLevel);

    GameReallyRacer._gameState = 'playing';
    GameReallyRacer._distance = 0;
    GameReallyRacer._time = 0;
    GameReallyRacer._fuel = 100;
    GameReallyRacer._coins = 0;

    // Generate terrain for current level first
    GameReallyRacer._generateTerrain(GameReallyRacer._currentLevel);

    // Reset vehicle on the new terrain
    GameReallyRacer._resetVehicleOnTerrain();

    // Initialize camera to follow vehicle immediately
    GameReallyRacer._camera.x = GameReallyRacer._vehicle.x - GameReallyRacer._width * 0.3;
    GameReallyRacer._camera.y = GameReallyRacer._vehicle.y - GameReallyRacer._height * 0.6;
    GameReallyRacer._camera.targetX = GameReallyRacer._camera.x;
    GameReallyRacer._camera.targetY = GameReallyRacer._camera.y;

    // Clear particles
    Object.keys(GameReallyRacer._particles).forEach(key => {
      GameReallyRacer._particles[key] = [];
    });

    // Hide menu, show HUD
    GameReallyRacer._hideAllScreens();
    const gameHUD = GameReallyRacer._container.querySelector('#game-hud');
    if (gameHUD) gameHUD.style.display = 'block';

    GameReallyRacer._running = true;
    GameReallyRacer._container.focus();

    console.log('✅ Level started, vehicle at:', GameReallyRacer._vehicle.x, GameReallyRacer._vehicle.y);
  }

  static _startRenderLoop() {
    const gameLoop = (timestamp) => {
      GameReallyRacer._animationId = requestAnimationFrame(gameLoop);

      const deltaTime = Math.min((timestamp - GameReallyRacer._lastTime) / 1000, 1/30);
      GameReallyRacer._lastTime = timestamp;

      if (GameReallyRacer._gameState === 'playing' && GameReallyRacer._running) {
        GameReallyRacer._update(deltaTime);
      }

      GameReallyRacer._render();
    };

    GameReallyRacer._lastTime = performance.now();
    gameLoop(GameReallyRacer._lastTime);
  }

  static _update(deltaTime) {
    // Update game time
    GameReallyRacer._time += deltaTime;

    // Update vehicle physics
    GameReallyRacer._updateVehiclePhysics(deltaTime);

    // Update camera
    GameReallyRacer._updateCamera(deltaTime);

    // Update particles
    GameReallyRacer._updateParticles(deltaTime);

    // Update coins
    GameReallyRacer._updateCoins(deltaTime);

    // Check collisions
    GameReallyRacer._checkCollisions();

    // Update distance
    GameReallyRacer._distance = Math.max(GameReallyRacer._distance, GameReallyRacer._vehicle.x - 150);

    // Check game conditions
    GameReallyRacer._checkGameConditions();

    // Update UI
    GameReallyRacer._updateGameUI();

    // Update screen effects
    GameReallyRacer._screenEffects.shake *= 0.9;
    GameReallyRacer._screenEffects.flash *= 0.9;
  }

  static _updateVehiclePhysics(deltaTime) {
    const vehicle = GameReallyRacer._vehicle;
    const upgrades = GameReallyRacer._saveData.upgrades;

    // Input handling
    let throttle = 0;
    let brake = 0;
    let lean = 0;

    if (GameReallyRacer._keys['ArrowUp'] || GameReallyRacer._keys['KeyW']) throttle = 1;
    if (GameReallyRacer._keys['ArrowDown'] || GameReallyRacer._keys['KeyS']) brake = 1;
    if (GameReallyRacer._keys['ArrowLeft'] || GameReallyRacer._keys['KeyA']) lean = -1;
    if (GameReallyRacer._keys['ArrowRight'] || GameReallyRacer._keys['KeyD']) lean = 1;
    if (GameReallyRacer._keys['Space']) brake = 1;

    // Calculate forces
    const enginePower = vehicle.enginePower * (1 + upgrades.engine * 0.3);
    const maxSpeed = vehicle.maxSpeed * (1 + upgrades.tires * 0.2);
    const grip = vehicle.frontWheel.grip * (1 + upgrades.tires * 0.15);

    // Apply throttle
    if (throttle > 0 && GameReallyRacer._fuel > 0) {
      const force = Math.cos(vehicle.angle) * enginePower * throttle * deltaTime;
      vehicle.velocityX += force;
      vehicle.velocityY += Math.sin(vehicle.angle) * enginePower * throttle * deltaTime;

      // Consume fuel
      GameReallyRacer._fuel -= deltaTime * 5 * (1 - upgrades.fuel * 0.15);
      GameReallyRacer._fuel = Math.max(0, GameReallyRacer._fuel);

      // Create exhaust particles
      GameReallyRacer._createExhaustParticles();
    }

    // Apply braking
    if (brake > 0) {
      vehicle.velocityX *= Math.pow(0.5, deltaTime * 5);
      vehicle.velocityY *= Math.pow(0.5, deltaTime * 5);
    }

    // Apply gravity
    vehicle.velocityY += GameReallyRacer._world.gravity * deltaTime;

    // Air resistance
    const airResistanceX = vehicle.velocityX * vehicle.velocityX * GameReallyRacer._world.airDensity * Math.sign(vehicle.velocityX);
    const airResistanceY = vehicle.velocityY * vehicle.velocityY * GameReallyRacer._world.airDensity * Math.sign(vehicle.velocityY);

    vehicle.velocityX -= airResistanceX * deltaTime;
    vehicle.velocityY -= airResistanceY * deltaTime;

    // Air control (when not on ground)
    if (!vehicle.onGround && Math.abs(lean) > 0.1) {
      vehicle.angularVelocity += lean * 3 * deltaTime;
    }

    // Apply angular damping
    vehicle.angularVelocity *= Math.pow(0.95, deltaTime * 60);

    // Update angle
    vehicle.angle += vehicle.angularVelocity * deltaTime;

    // Update position
    vehicle.x += vehicle.velocityX * deltaTime;
    vehicle.y += vehicle.velocityY * deltaTime;

    // Calculate speed
    vehicle.speed = Math.sqrt(vehicle.velocityX * vehicle.velocityX + vehicle.velocityY * vehicle.velocityY);

    // Ground collision
    GameReallyRacer._checkGroundCollision();

    // Update wheel positions
    const wheelOffsetX = vehicle.wheelBase / 2;
    vehicle.frontWheel.x = vehicle.x + Math.cos(vehicle.angle) * wheelOffsetX;
    vehicle.frontWheel.y = vehicle.y + Math.sin(vehicle.angle) * wheelOffsetX;
    vehicle.rearWheel.x = vehicle.x - Math.cos(vehicle.angle) * wheelOffsetX;
    vehicle.rearWheel.y = vehicle.y - Math.sin(vehicle.angle) * wheelOffsetX;

    // Wheel rotation
    vehicle.frontWheel.rotation += vehicle.velocityX * deltaTime * 0.1;
    vehicle.rearWheel.rotation += vehicle.velocityX * deltaTime * 0.1;
  }

  static _checkGroundCollision() {
    const vehicle = GameReallyRacer._vehicle;
    const terrainY = GameReallyRacer._getTerrainHeightAt(vehicle.x);

    vehicle.onGround = false;

    // Check if vehicle is touching ground
    if (vehicle.y + vehicle.height / 2 >= terrainY) {
      vehicle.y = terrainY - vehicle.height / 2;

      // Ground reaction
      if (vehicle.velocityY > 0) {
        vehicle.velocityY = -vehicle.velocityY * 0.3; // Bounce
        vehicle.onGround = true;

        // Landing effects
        if (vehicle.velocityY < -200) {
          GameReallyRacer._createLandingParticles();
          GameReallyRacer._addScreenShake(Math.abs(vehicle.velocityY) * 0.05);
        }
      }

      // Ground friction
      if (vehicle.onGround) {
        vehicle.velocityX *= Math.pow(GameReallyRacer._world.friction, 1/60);

        // Align with ground angle (simplified)
        const groundAngle = GameReallyRacer._getGroundAngleAt(vehicle.x);
        vehicle.angle = vehicle.angle * 0.9 + groundAngle * 0.1;
      }
    }
  }

  static _getGroundAngleAt(x) {
    const segmentLength = GameReallyRacer._terrain.segmentLength;
    const y1 = GameReallyRacer._getTerrainHeightAt(x - segmentLength);
    const y2 = GameReallyRacer._getTerrainHeightAt(x + segmentLength);
    return Math.atan2(y2 - y1, segmentLength * 2);
  }

  static _updateCamera(deltaTime) {
    const vehicle = GameReallyRacer._vehicle;

    // Camera follows vehicle with offset
    GameReallyRacer._camera.targetX = vehicle.x - GameReallyRacer._width * 0.3;
    GameReallyRacer._camera.targetY = vehicle.y - GameReallyRacer._height * 0.6;

    // Smooth camera movement
    GameReallyRacer._camera.x += (GameReallyRacer._camera.targetX - GameReallyRacer._camera.x) * GameReallyRacer._camera.smoothing;
    GameReallyRacer._camera.y += (GameReallyRacer._camera.targetY - GameReallyRacer._camera.y) * GameReallyRacer._camera.smoothing;

    // Camera shake
    if (GameReallyRacer._screenEffects.shake > 0) {
      GameReallyRacer._camera.x += (Math.random() - 0.5) * GameReallyRacer._screenEffects.shake;
      GameReallyRacer._camera.y += (Math.random() - 0.5) * GameReallyRacer._screenEffects.shake;
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // PARTICLE SYSTEMS
  // ═══════════════════════════════════════════════════════════════

  static _updateParticles(deltaTime) {
    Object.keys(GameReallyRacer._particles).forEach(type => {
      for (let i = GameReallyRacer._particles[type].length - 1; i >= 0; i--) {
        const particle = GameReallyRacer._particles[type][i];

        // Update particle
        particle.x += particle.velocityX * deltaTime;
        particle.y += particle.velocityY * deltaTime;
        particle.life -= deltaTime;
        particle.size *= 0.98;

        // Apply gravity to some particles
        if (type === 'dust' || type === 'debris') {
          particle.velocityY += GameReallyRacer._world.gravity * deltaTime * 0.3;
        }

        // Remove dead particles
        if (particle.life <= 0 || particle.size < 0.5) {
          GameReallyRacer._particles[type].splice(i, 1);
        }
      }
    });
  }

  static _createExhaustParticles() {
    const vehicle = GameReallyRacer._vehicle;
    const backX = vehicle.x - Math.cos(vehicle.angle) * vehicle.width / 2;
    const backY = vehicle.y - Math.sin(vehicle.angle) * vehicle.width / 2;

    for (let i = 0; i < 2; i++) {
      GameReallyRacer._particles.exhaust.push({
        x: backX + (Math.random() - 0.5) * 10,
        y: backY + (Math.random() - 0.5) * 10,
        velocityX: -Math.cos(vehicle.angle) * 50 + (Math.random() - 0.5) * 30,
        velocityY: -Math.sin(vehicle.angle) * 50 + (Math.random() - 0.5) * 30,
        size: 3 + Math.random() * 4,
        life: 0.5 + Math.random() * 0.3,
        color: '#666666'
      });
    }
  }

  static _createLandingParticles() {
    const vehicle = GameReallyRacer._vehicle;

    for (let i = 0; i < 8; i++) {
      GameReallyRacer._particles.dust.push({
        x: vehicle.x + (Math.random() - 0.5) * vehicle.width,
        y: vehicle.y + vehicle.height / 2,
        velocityX: (Math.random() - 0.5) * 100,
        velocityY: -Math.random() * 50,
        size: 2 + Math.random() * 3,
        life: 1.0,
        color: '#8B4513'
      });
    }
  }

  static _createCrashParticles() {
    const vehicle = GameReallyRacer._vehicle;

    for (let i = 0; i < 12; i++) {
      GameReallyRacer._particles.debris.push({
        x: vehicle.x,
        y: vehicle.y,
        velocityX: (Math.random() - 0.5) * 200,
        velocityY: -Math.random() * 100,
        size: 3 + Math.random() * 5,
        life: 1.5,
        color: '#FF6347'
      });
    }
  }

  static _updateCoins(deltaTime) {
    GameReallyRacer._terrain.coins.forEach(coin => {
      if (!coin.collected) {
        coin.rotation += deltaTime * 5;
        coin.bob += deltaTime * 3;
      }
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // COLLISION DETECTION
  // ═══════════════════════════════════════════════════════════════

  static _checkCollisions() {
    const vehicle = GameReallyRacer._vehicle;

    // Check coin collisions
    GameReallyRacer._terrain.coins.forEach(coin => {
      if (!coin.collected && GameReallyRacer._checkCircleCollision(vehicle, coin, 25)) {
        coin.collected = true;
        GameReallyRacer._coins++;
        GameReallyRacer._totalCoins++;
        GameReallyRacer._createCoinParticles(coin.x, coin.y);
      }
    });

    // Check obstacle collisions
    GameReallyRacer._terrain.obstacles.forEach(obstacle => {
      if (GameReallyRacer._checkRectCollision(vehicle, obstacle)) {
        GameReallyRacer._crashVehicle();
      }
    });
  }

  static _checkCircleCollision(obj1, obj2, radius) {
    const dx = obj1.x - obj2.x;
    const dy = obj1.y - obj2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < radius;
  }

  static _checkRectCollision(obj1, obj2) {
    return obj1.x - obj1.width/2 < obj2.x + obj2.width/2 &&
           obj1.x + obj1.width/2 > obj2.x - obj2.width/2 &&
           obj1.y - obj1.height/2 < obj2.y + obj2.height/2 &&
           obj1.y + obj1.height/2 > obj2.y - obj2.height/2;
  }

  static _createCoinParticles(x, y) {
    for (let i = 0; i < 6; i++) {
      GameReallyRacer._particles.coins.push({
        x: x,
        y: y,
        velocityX: (Math.random() - 0.5) * 60,
        velocityY: -Math.random() * 40,
        size: 2 + Math.random() * 2,
        life: 0.8,
        color: '#FFD700'
      });
    }
  }

  static _checkGameConditions() {
    const vehicle = GameReallyRacer._vehicle;

    // Check if crashed (flipped over or high speed collision)
    if ((Math.abs(vehicle.angle) > Math.PI * 0.6 && vehicle.onGround) ||
        (vehicle.speed > 200 && !vehicle.onGround && vehicle.y > GameReallyRacer._height)) {
      GameReallyRacer._crashVehicle();
    }

    // Check if out of fuel
    if (GameReallyRacer._fuel <= 0 && vehicle.speed < 5) {
      GameReallyRacer._gameOver('Out of fuel!');
    }

    // Check if reached end of level
    const level = GameReallyRacer._levels[GameReallyRacer._currentLevel];
    if (GameReallyRacer._distance >= level.length - 100) {
      GameReallyRacer._levelComplete();
    }
  }

  static _crashVehicle() {
    if (GameReallyRacer._gameState !== 'playing') return;

    GameReallyRacer._createCrashParticles();
    GameReallyRacer._addScreenShake(20);
    GameReallyRacer._gameOver('Vehicle crashed!');
  }

  static _gameOver(reason) {
    GameReallyRacer._gameState = 'crashed';
    GameReallyRacer._running = false;

    // Update save data
    GameReallyRacer._saveData.totalDistance += GameReallyRacer._distance;
    GameReallyRacer._saveData.totalCoins += GameReallyRacer._coins;
    GameReallyRacer._saveData.crashes++;

    if (GameReallyRacer._distance > GameReallyRacer._saveData.bestDistances[GameReallyRacer._currentLevel]) {
      GameReallyRacer._saveData.bestDistances[GameReallyRacer._currentLevel] = GameReallyRacer._distance;
    }

    GameReallyRacer._saveGameData();
    GameReallyRacer._showGameOverScreen(reason);
  }

  static _levelComplete() {
    GameReallyRacer._gameState = 'finished';
    GameReallyRacer._running = false;

    // Update save data
    GameReallyRacer._saveData.totalDistance += GameReallyRacer._distance;
    GameReallyRacer._saveData.totalCoins += GameReallyRacer._coins;

    // Unlock next level
    if (GameReallyRacer._currentLevel < GameReallyRacer._levels.length - 1) {
      GameReallyRacer._saveData.unlockedLevels[GameReallyRacer._currentLevel + 1] = true;
    }

    GameReallyRacer._saveGameData();
    GameReallyRacer._showLevelCompleteScreen();
  }

  // ═══════════════════════════════════════════════════════════════
  // RENDERING
  // ═══════════════════════════════════════════════════════════════

  static _render() {
    const ctx = GameReallyRacer._ctx;
    const camera = GameReallyRacer._camera;

    // Clear canvas with sky gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, GameReallyRacer._height);
    gradient.addColorStop(0, '#87CEEB');
    gradient.addColorStop(1, '#90EE90');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, GameReallyRacer._width, GameReallyRacer._height);

    ctx.save();
    ctx.translate(-camera.x, -camera.y);

    // Render background elements
    GameReallyRacer._renderBackground(ctx);

    // Render terrain
    GameReallyRacer._renderTerrain(ctx);

    // Render game objects
    GameReallyRacer._renderObstacles(ctx);
    GameReallyRacer._renderCoins(ctx);

    // Render particles
    GameReallyRacer._renderParticles(ctx);

    // Render vehicle - ALWAYS LAST for visibility
    GameReallyRacer._renderVehicle(ctx);

    ctx.restore();

    // Render UI effects
    GameReallyRacer._renderScreenEffects(ctx);
  }

  static _renderBackground(ctx) {
    const camera = GameReallyRacer._camera;

    // Render distant mountains/hills for parallax effect
    ctx.fillStyle = 'rgba(34, 139, 34, 0.3)';
    for (let x = Math.floor(camera.x / 100) * 100; x < camera.x + GameReallyRacer._width; x += 100) {
      const height = 50 + Math.sin(x * 0.002) * 30;
      ctx.fillRect(x, GameReallyRacer._height - height - camera.y, 100, height);
    }
  }

  static _renderTerrain(ctx) {
    const points = GameReallyRacer._terrain.points;
    if (!points || points.length === 0) return;

    // Render terrain fill
    ctx.fillStyle = '#228B22';
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }

    ctx.lineTo(points[points.length - 1].x, GameReallyRacer._height + 100);
    ctx.lineTo(points[0].x, GameReallyRacer._height + 100);
    ctx.closePath();
    ctx.fill();

    // Render terrain surface line
    ctx.strokeStyle = '#006400';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.stroke();
  }

  static _renderObstacles(ctx) {
    GameReallyRacer._terrain.obstacles.forEach(obstacle => {
      ctx.fillStyle = GameReallyRacer._getObstacleColor(obstacle.type);

      if (obstacle.type === 'rock') {
        // Draw rock as irregular shape
        ctx.beginPath();
        ctx.ellipse(obstacle.x, obstacle.y - obstacle.height/2, obstacle.width/2, obstacle.height/2, 0, 0, Math.PI * 2);
        ctx.fill();
      } else if (obstacle.type === 'tree') {
        // Draw tree trunk
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(obstacle.x - 5, obstacle.y - obstacle.height, 10, obstacle.height);

        // Draw tree foliage
        ctx.fillStyle = '#228B22';
        ctx.beginPath();
        ctx.arc(obstacle.x, obstacle.y - obstacle.height + 10, obstacle.width/2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Draw barrel or box
        ctx.fillRect(obstacle.x - obstacle.width/2, obstacle.y - obstacle.height, obstacle.width, obstacle.height);
      }
    });
  }

  static _renderCoins(ctx) {
    GameReallyRacer._terrain.coins.forEach(coin => {
      if (coin.collected) return;

      ctx.save();
      ctx.translate(coin.x, coin.y + Math.sin(coin.bob) * 5);
      ctx.rotate(coin.rotation);

      // Coin glow
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 15);
      gradient.addColorStop(0, '#FFD700');
      gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(0, 0, 15, 0, Math.PI * 2);
      ctx.fill();

      // Coin body
      ctx.fillStyle = '#FFD700';
      ctx.beginPath();
      ctx.arc(0, 0, 8, 0, Math.PI * 2);
      ctx.fill();

      // Coin highlight
      ctx.fillStyle = '#FFFF99';
      ctx.beginPath();
      ctx.arc(-2, -2, 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    });
  }

  static _renderParticles(ctx) {
    Object.keys(GameReallyRacer._particles).forEach(type => {
      GameReallyRacer._particles[type].forEach(particle => {
        const alpha = particle.life / 1.0;
        ctx.fillStyle = particle.color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
        ctx.fillRect(particle.x - particle.size/2, particle.y - particle.size/2, particle.size, particle.size);
      });
    });
  }

  static _renderVehicle(ctx) {
    const vehicle = GameReallyRacer._vehicle;

    // DEBUG: Log vehicle position
    if (GameReallyRacer._gameState === 'playing' && Math.random() < 0.01) {
      console.log('🚗 Vehicle render pos:', vehicle.x, vehicle.y, 'Camera:', GameReallyRacer._camera.x, GameReallyRacer._camera.y);
    }

    ctx.save();
    ctx.translate(vehicle.x, vehicle.y);
    ctx.rotate(vehicle.angle);

    // Vehicle shadow (if airborne)
    if (!vehicle.onGround) {
      const shadowY = GameReallyRacer._getTerrainHeightAt(vehicle.x) - vehicle.y + 20;
      ctx.save();
      ctx.translate(0, shadowY);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.fillRect(-vehicle.width/2, -vehicle.height/2, vehicle.width, vehicle.height);
      ctx.restore();
    }

    // Vehicle STRONG outline for visibility
    ctx.strokeStyle = '#8B0000';
    ctx.lineWidth = 4;
    ctx.strokeRect(-vehicle.width/2 - 3, -vehicle.height/2 - 3, vehicle.width + 6, vehicle.height + 6);

    // Vehicle body - bright color
    ctx.fillStyle = '#FF4500';
    ctx.fillRect(-vehicle.width/2, -vehicle.height/2, vehicle.width, vehicle.height);

    // Vehicle details
    ctx.fillStyle = '#FF6347';
    ctx.fillRect(-vehicle.width/2 + 5, -vehicle.height/2 + 5, vehicle.width - 10, vehicle.height - 10);

    // Windshield
    ctx.fillStyle = '#87CEEB';
    ctx.fillRect(vehicle.width/4, -vehicle.height/2 + 8, vehicle.width/4, vehicle.height/3);

    // Vehicle roof highlight
    ctx.fillStyle = '#FFB347';
    ctx.fillRect(-vehicle.width/2 + 3, -vehicle.height/2 + 3, vehicle.width - 6, 8);

    // Wheels - bigger and more visible
    ctx.fillStyle = '#2F4F4F';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;

    // Front wheel
    ctx.save();
    ctx.translate(vehicle.width/4, vehicle.height/2 - 5);
    ctx.rotate(vehicle.frontWheel.rotation);
    ctx.fillRect(-12, -12, 24, 24);
    ctx.strokeRect(-12, -12, 24, 24);
    // Wheel spokes
    ctx.strokeStyle = '#696969';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-10, 0);
    ctx.lineTo(10, 0);
    ctx.moveTo(0, -10);
    ctx.lineTo(0, 10);
    ctx.stroke();
    ctx.restore();

    // Rear wheel
    ctx.save();
    ctx.translate(-vehicle.width/4, vehicle.height/2 - 5);
    ctx.rotate(vehicle.rearWheel.rotation);
    ctx.fillRect(-12, -12, 24, 24);
    ctx.strokeRect(-12, -12, 24, 24);
    // Wheel spokes
    ctx.strokeStyle = '#696969';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-10, 0);
    ctx.lineTo(10, 0);
    ctx.moveTo(0, -10);
    ctx.lineTo(0, 10);
    ctx.stroke();
    ctx.restore();

    ctx.restore();
  }

  static _renderScreenEffects(ctx) {
    // Screen flash for crashes
    if (GameReallyRacer._screenEffects.flash > 0) {
      ctx.fillStyle = `rgba(255, 0, 0, ${GameReallyRacer._screenEffects.flash})`;
      ctx.fillRect(0, 0, GameReallyRacer._width, GameReallyRacer._height);
    }

    // Low fuel warning
    if (GameReallyRacer._fuel < 20 && GameReallyRacer._gameState === 'playing') {
      const flash = Math.sin(Date.now() * 0.01) * 0.3 + 0.3;
      ctx.fillStyle = `rgba(255, 0, 0, ${flash})`;
      ctx.fillRect(0, 0, GameReallyRacer._width, 10);
      ctx.fillRect(0, GameReallyRacer._height - 10, GameReallyRacer._width, 10);
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // UI FUNCTIONS
  // ═══════════════════════════════════════════════════════════════

  static _updateGameUI() {
    // Update speed display
    const speedDisplay = GameReallyRacer._container.querySelector('#speed-display');
    if (speedDisplay) {
      const speedMph = Math.floor(GameReallyRacer._vehicle.speed * 0.5);
      speedDisplay.textContent = `${speedMph} mph`;
    }

    // Update fuel bar
    const fuelBar = GameReallyRacer._container.querySelector('#fuel-bar');
    const fuelPercent = GameReallyRacer._container.querySelector('#fuel-percent');
    if (fuelBar && fuelPercent) {
      fuelBar.style.width = `${GameReallyRacer._fuel}%`;
      fuelPercent.textContent = `${Math.floor(GameReallyRacer._fuel)}%`;
    }

    // Update angle display
    const angleDisplay = GameReallyRacer._container.querySelector('#angle-display');
    if (angleDisplay) {
      const angleDegrees = Math.floor(GameReallyRacer._vehicle.angle * 180 / Math.PI);
      angleDisplay.textContent = `${angleDegrees}°`;
    }

    // Update airborne indicator
    const airTime = GameReallyRacer._container.querySelector('#air-time');
    if (airTime) {
      airTime.style.display = GameReallyRacer._vehicle.onGround ? 'none' : 'inline';
    }

    // Update distance
    const distanceDisplay = GameReallyRacer._container.querySelector('#distance-display');
    if (distanceDisplay) {
      distanceDisplay.textContent = `${Math.floor(GameReallyRacer._distance)}m`;
    }

    // Update coins
    const coinsDisplay = GameReallyRacer._container.querySelector('#coins-display');
    if (coinsDisplay) {
      coinsDisplay.textContent = `💰 ${GameReallyRacer._coins}`;
    }

    // Update time
    const timeDisplay = GameReallyRacer._container.querySelector('#time-display');
    if (timeDisplay) {
      const minutes = Math.floor(GameReallyRacer._time / 60);
      const seconds = Math.floor(GameReallyRacer._time % 60);
      timeDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    // Update best distance
    const bestDistance = GameReallyRacer._container.querySelector('#best-distance');
    if (bestDistance) {
      const best = GameReallyRacer._saveData.bestDistances[GameReallyRacer._currentLevel];
      bestDistance.textContent = `${Math.floor(best)}m`;
    }
  }

  static _populateLevelSelection() {
    const levelCards = GameReallyRacer._container.querySelector('#level-cards');

    GameReallyRacer._levels.forEach((level, index) => {
      const card = document.createElement('div');
      card.className = 'level-card';

      if (!GameReallyRacer._saveData.unlockedLevels[index]) {
        card.classList.add('locked');
        card.innerHTML = `
          <div style="font-size: 32px; margin-bottom: 15px;">🔒</div>
          <div style="font-size: 20px; font-weight: bold; margin-bottom: 10px;">${level.name}</div>
          <div style="font-size: 14px; color: #888;">LOCKED</div>
          <div style="font-size: 12px; margin-top: 10px; color: #666;">Complete previous levels to unlock</div>
        `;
      } else {
        if (index === GameReallyRacer._currentLevel) {
          card.classList.add('selected');
        }

        const difficultyColors = {
          'Easy': '#90EE90',
          'Medium': '#FFD700',
          'Hard': '#FFA500',
          'Expert': '#FF6347',
          'Extreme': '#FF1493'
        };

        const themeIcons = {
          'grassland': '🌱',
          'mountain': '🏔️',
          'desert': '🏜️',
          'arctic': '🧊',
          'volcano': '🌋'
        };

        card.innerHTML = `
          <div style="font-size: 32px; margin-bottom: 15px;">${themeIcons[level.theme]}</div>
          <div style="font-size: 20px; font-weight: bold; margin-bottom: 10px;">${level.name}</div>
          <div style="font-size: 14px; color: ${difficultyColors[level.difficulty]}; margin-bottom: 8px;">${level.difficulty}</div>
          <div style="font-size: 12px; color: #888; margin-bottom: 10px;">${level.description}</div>
          <div style="font-size: 12px;">
            <div>Length: ${level.length}m • Coins: ${level.coins}</div>
            <div>Best: ${GameReallyRacer._saveData.bestDistances[index] === 0 ? '--' : Math.floor(GameReallyRacer._saveData.bestDistances[index]) + 'm'}</div>
          </div>
        `;

        card.addEventListener('click', () => {
          GameReallyRacer._currentLevel = index;

          // Update level selection
          document.querySelectorAll('.level-card').forEach(c => c.classList.remove('selected'));
          card.classList.add('selected');

          // Generate new terrain
          GameReallyRacer._generateTerrain(index);
        });
      }

      levelCards.appendChild(card);
    });
  }

  static _populateGarage() {
    const upgradeGrid = GameReallyRacer._container.querySelector('#upgrade-grid');
    const garageCoins = GameReallyRacer._container.querySelector('#garage-coins');

    if (garageCoins) {
      garageCoins.textContent = GameReallyRacer._saveData.totalCoins;
    }

    const upgradeTypes = [
      { id: 'engine', name: 'Engine', icon: '🔧', description: 'More power' },
      { id: 'tires', name: 'Tires', icon: '🛞', description: 'Better grip' },
      { id: 'suspension', name: 'Suspension', icon: '🔩', description: 'Smoother ride' },
      { id: 'fuel', name: 'Fuel Tank', icon: '⛽', description: 'More fuel' },
      { id: 'armor', name: 'Armor', icon: '🛡️', description: 'Crash protection' }
    ];

    upgradeTypes.forEach(upgrade => {
      const card = document.createElement('div');
      card.className = 'upgrade-card';

      const currentLevel = GameReallyRacer._saveData.upgrades[upgrade.id];
      const maxLevel = GameReallyRacer._upgrades[upgrade.id].maxLevel;
      const cost = GameReallyRacer._upgrades[upgrade.id].cost * currentLevel;

      if (currentLevel >= maxLevel) {
        card.classList.add('maxed');
      }

      card.innerHTML = `
        <div style="font-size: 24px; margin-bottom: 10px;">${upgrade.icon}</div>
        <div style="font-size: 16px; font-weight: bold; margin-bottom: 5px;">${upgrade.name}</div>
        <div style="font-size: 12px; color: #ccc; margin-bottom: 10px;">${upgrade.description}</div>
        <div style="font-size: 12px; margin-bottom: 10px;">Level: ${currentLevel}/${maxLevel}</div>
        <div style="font-size: 12px; color: #FFD700;">
          ${currentLevel >= maxLevel ? 'MAX LEVEL' : `Upgrade: 💰${cost}`}
        </div>
      `;

      if (currentLevel < maxLevel) {
        card.addEventListener('click', () => {
          if (GameReallyRacer._saveData.totalCoins >= cost) {
            GameReallyRacer._saveData.totalCoins -= cost;
            GameReallyRacer._saveData.upgrades[upgrade.id]++;
            GameReallyRacer._saveGameData();
            GameReallyRacer._populateGarage(); // Refresh garage
          }
        });
      }

      upgradeGrid.appendChild(card);
    });
  }

  static _showScreen(screenId) {
    GameReallyRacer._hideAllScreens();

    const screen = GameReallyRacer._container.querySelector(`#${screenId}`);
    if (screen) screen.style.display = 'block';

    const menuOverlay = GameReallyRacer._container.querySelector('#menu-overlay');
    if (menuOverlay) menuOverlay.style.display = 'flex';

    const gameHUD = GameReallyRacer._container.querySelector('#game-hud');
    if (gameHUD) gameHUD.style.display = 'none';

    // Update garage coins when showing garage
    if (screenId === 'garage-workshop') {
      GameReallyRacer._populateGarage();
    }
  }

  static _hideAllScreens() {
    const screens = ['main-menu', 'level-selection', 'garage-workshop', 'help-controls', 'game-over-screen', 'level-complete'];
    screens.forEach(screenId => {
      const screen = GameReallyRacer._container.querySelector(`#${screenId}`);
      if (screen) screen.style.display = 'none';
    });
  }

  static _showGameOverScreen(reason) {
    const crashStats = GameReallyRacer._container.querySelector('#crash-stats');
    if (crashStats) {
      crashStats.innerHTML = `
        ${reason}<br>
        Distance Reached: ${Math.floor(GameReallyRacer._distance)}m<br>
        Coins Collected: ${GameReallyRacer._coins}<br>
        Time: ${Math.floor(GameReallyRacer._time / 60)}:${Math.floor(GameReallyRacer._time % 60).toString().padStart(2, '0')}
      `;
    }

    GameReallyRacer._showScreen('game-over-screen');
  }

  static _showLevelCompleteScreen() {
    const completionStats = GameReallyRacer._container.querySelector('#completion-stats');
    if (completionStats) {
      completionStats.innerHTML = `
        Level Complete!<br>
        Distance: ${Math.floor(GameReallyRacer._distance)}m<br>
        Coins Collected: ${GameReallyRacer._coins}<br>
        Time: ${Math.floor(GameReallyRacer._time / 60)}:${Math.floor(GameReallyRacer._time % 60).toString().padStart(2, '0')}
      `;
    }

    // Show next level button if available
    const nextLevelBtn = GameReallyRacer._container.querySelector('#next-level-btn');
    if (nextLevelBtn && GameReallyRacer._currentLevel < GameReallyRacer._levels.length - 1) {
      nextLevelBtn.style.display = 'inline-block';
    }

    GameReallyRacer._showScreen('level-complete');
  }

  // ═══════════════════════════════════════════════════════════════
  // UTILITY FUNCTIONS
  // ═══════════════════════════════════════════════════════════════

  static _getObstacleColor(type) {
    const colors = {
      'rock': '#696969',
      'tree': '#8B4513',
      'barrel': '#DEB887'
    };
    return colors[type] || '#696969';
  }

  static _addScreenShake(intensity) {
    GameReallyRacer._screenEffects.shake = Math.max(GameReallyRacer._screenEffects.shake, intensity);
  }

  static _nextLevel() {
    if (GameReallyRacer._currentLevel < GameReallyRacer._levels.length - 1) {
      GameReallyRacer._currentLevel++;
      GameReallyRacer._generateTerrain(GameReallyRacer._currentLevel);
      GameReallyRacer._startLevel();
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // SAVE/LOAD SYSTEM
  // ═══════════════════════════════════════════════════════════════

  static _saveGameData() {
    try {
      // Note: localStorage is not available in Claude artifacts
      // This is a placeholder for the save system
      console.log('💾 Game data saved (placeholder)');
    } catch (e) {
      console.warn('Could not save game data');
    }
  }

  static _loadGameData() {
    try {
      // Note: localStorage is not available in Claude artifacts
      // This is a placeholder for the load system
      console.log('📁 Game data loaded (placeholder)');

      // Update menu displays
      const totalDistanceDisplay = GameReallyRacer._container.querySelector('#total-distance-display');
      if (totalDistanceDisplay) totalDistanceDisplay.textContent = `${Math.floor(GameReallyRacer._saveData.totalDistance)}m`;

      const totalCoinsDisplay = GameReallyRacer._container.querySelector('#total-coins-display');
      if (totalCoinsDisplay) totalCoinsDisplay.textContent = `💰 ${GameReallyRacer._saveData.totalCoins}`;

      const totalCrashesDisplay = GameReallyRacer._container.querySelector('#total-crashes-display');
      if (totalCrashesDisplay) totalCrashesDisplay.textContent = `💥 ${GameReallyRacer._saveData.crashes}`;

    } catch (e) {
      console.warn('Could not load game data');
    }
  }

  static _cleanup() {
    GameReallyRacer._running = false;

    if (GameReallyRacer._animationId) {
      cancelAnimationFrame(GameReallyRacer._animationId);
      GameReallyRacer._animationId = null;
    }

    console.log('🧹 Hill Racer Physics cleaned up');
  }
}

// Export for WindowManager
window.GameReallyRacer = GameReallyRacer;