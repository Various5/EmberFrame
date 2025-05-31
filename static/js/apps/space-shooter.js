/**
 * APP_METADATA
 * @name Elite Space Shooter
 * @icon fas fa-rocket
 * @description Arcade Space Shooter
 * @category Games
 * @version 3.1.0
 * @author EmberFrame Team
 * @enabled true
 */

class SpaceShooter {
  // ═══════════════════════════════════════════════════════════════
  // CORE GAME PROPERTIES
  // ═══════════════════════════════════════════════════════════════
  static _container = null;
  static _canvas = null;
  static _ctx = null;
  static _width = 1000;
  static _height = 600;

  // Game State Management
  static _gameState = 'menu'; // menu, playing, paused, upgrading, gameover, victory
  static _currentLevel = 1;
  static _maxLevel = 10;
  static _levelProgress = 0;
  static _enemiesKilled = 0;

  // Player State
  static _player = null;
  static _lives = 3;
  static _score = 0;
  static _credits = 0;
  static _experience = 0;
  static _playerLevel = 1;
  static _multiplier = 1;
  static _combo = 0;
  static _maxCombo = 0;

  // Game Objects Arrays
  static _playerBullets = [];
  static _enemies = [];
  static _enemyBullets = [];
  static _missiles = [];
  static _asteroids = [];
  static _powerups = [];
  static _explosions = [];
  static _particles = [];

  // Background
  static _stars = [];

  // Enemy spawn timer
  static _spawnTimer = 0;
  static _spawnInterval = 2000;

  // Input
  static _keys = {};
  static _mouse = { x: 0, y: 0, down: false };

  // Timing
  static _lastTime = 0;
  static _running = false;
  static _animationId = null;

  // Visual effects
  static _screenShake = { x: 0, y: 0, intensity: 0, duration: 0 };

  // Save Data
  static _saveData = {
    highScore: 0,
    maxLevel: 1,
    totalPlayTime: 0
  };

  // ═══════════════════════════════════════════════════════════════
  // INITIALIZATION AND SETUP
  // ═══════════════════════════════════════════════════════════════

  static createWindow() {
    return {
      title: 'Elite Space Shooter',
      width: '1020px',
      height: '720px',
      content: `
        <div id="elite-space-shooter" style="position: relative; width: 100%; height: 100%; background: #000; overflow: hidden; font-family: 'Orbitron', 'Arial', monospace;">
          <!-- Main Game Canvas -->
          <canvas id="ess-canvas" width="1000" height="600"
                  style="display: block; background: #000; margin: 10px auto; border: 2px solid #00ffff; 
                         box-shadow: 0 0 20px #00ffff40, inset 0 0 20px #00ffff20; border-radius: 5px;"></canvas>
          
          <!-- Enhanced HUD -->
          <div id="ess-hud" style="position: absolute; top: 20px; left: 20px; right: 20px; display: flex; justify-content: space-between; color: #00ffff; font-size: 14px; z-index: 10; pointer-events: none;">
            
            <!-- Left HUD Panel -->
            <div id="left-hud" style="display: flex; flex-direction: column; gap: 10px; background: rgba(0, 20, 40, 0.8); padding: 15px; border-radius: 8px; border: 1px solid #00ffff40;">
              <div style="display: flex; gap: 20px; align-items: center;">
                <div id="ess-score" style="color: #ffff00; font-weight: bold; font-size: 16px;">SCORE: 0</div>
                <div id="ess-credits" style="color: #00ff00; font-weight: bold;">CREDITS: 0</div>
                <div id="ess-lives" style="color: #ff4444; font-weight: bold;">LIVES: 3</div>
              </div>
              
              <div style="display: flex; gap: 15px; align-items: center;">
                <div id="ess-level" style="color: #ff8800; font-weight: bold;">LEVEL: 1</div>
                <div id="ess-combo" style="color: #ff00ff; font-weight: bold;">COMBO: 0x</div>
                <div id="ess-multiplier" style="color: #ffff00; font-weight: bold;">×1.0</div>
              </div>
              
              <!-- Player Status Bars -->
              <div style="display: flex; flex-direction: column; gap: 5px;">
                <div style="display: flex; align-items: center; gap: 10px;">
                  <span style="width: 60px; color: #ff4444;">HULL:</span>
                  <div id="hull-bar" style="width: 120px; height: 8px; background: #330; border: 1px solid #ff4444; border-radius: 4px; overflow: hidden;">
                    <div id="hull-fill" style="width: 100%; height: 100%; background: linear-gradient(90deg, #ff4444, #ff8888); transition: width 0.3s;"></div>
                  </div>
                </div>
                
                <div style="display: flex; align-items: center; gap: 10px;">
                  <span style="width: 60px; color: #00ffff;">SHIELD:</span>
                  <div id="shield-bar" style="width: 120px; height: 8px; background: #003; border: 1px solid #00ffff; border-radius: 4px; overflow: hidden;">
                    <div id="shield-fill" style="width: 100%; height: 100%; background: linear-gradient(90deg, #00ffff, #88ffff); transition: width 0.3s;"></div>
                  </div>
                </div>
                
                <div style="display: flex; align-items: center; gap: 10px;">
                  <span style="width: 60px; color: #00ff00;">ENERGY:</span>
                  <div id="energy-bar" style="width: 120px; height: 8px; background: #030; border: 1px solid #00ff00; border-radius: 4px; overflow: hidden;">
                    <div id="energy-fill" style="width: 100%; height: 100%; background: linear-gradient(90deg, #00ff00, #88ff88); transition: width 0.3s;"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right HUD Panel -->
            <div id="right-hud" style="display: flex; flex-direction: column; gap: 10px; background: rgba(0, 20, 40, 0.8); padding: 15px; border-radius: 8px; border: 1px solid #00ffff40;">
              <div id="weapon-display" style="color: #ffff00; font-weight: bold; text-align: center;">PRIMARY: LASER</div>
              
              <!-- Level Progress -->
              <div style="display: flex; flex-direction: column; gap: 5px;">
                <span style="color: #ff8800; font-size: 12px;">LEVEL PROGRESS:</span>
                <div id="level-progress-bar" style="width: 150px; height: 10px; background: #330; border: 1px solid #ff8800; border-radius: 5px; overflow: hidden;">
                  <div id="level-progress-fill" style="width: 0%; height: 100%; background: linear-gradient(90deg, #ff8800, #ffaa00); transition: width 0.5s;"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Game Overlay Screens -->
          <div id="ess-overlay" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; background: rgba(0, 0, 0, 0.9); z-index: 20; transition: opacity 0.5s;">
            
            <!-- Main Menu -->
            <div id="main-menu" style="text-align: center; color: #00ffff;">
              <div style="font-size: 48px; font-weight: bold; margin-bottom: 30px; text-shadow: 0 0 20px #00ffff; background: linear-gradient(45deg, #00ffff, #ff00ff, #ffff00); -webkit-background-clip: text; -webkit-text-fill-color: transparent; animation: rainbow 3s infinite;">
                ELITE SPACE SHOOTER
              </div>
              <div style="font-size: 18px; margin-bottom: 40px; color: #aaaaaa;">
                Defend humanity against the alien invasion
              </div>
              
              <div style="display: flex; flex-direction: column; gap: 15px; align-items: center;">
                <button id="start-game-btn" class="menu-button" style="padding: 15px 40px; font-size: 18px; background: linear-gradient(45deg, #00ffff, #0088ff); color: #000; border: none; border-radius: 25px; cursor: pointer; font-weight: bold; transition: all 0.3s; text-transform: uppercase;">
                  Launch Mission
                </button>
                <button id="instructions-btn" class="menu-button" style="padding: 10px 30px; font-size: 14px; background: linear-gradient(45deg, #888888, #aaaaaa); color: #000; border: none; border-radius: 15px; cursor: pointer; font-weight: bold; transition: all 0.3s; text-transform: uppercase;">
                  Instructions
                </button>
              </div>

              <div style="margin-top: 40px; font-size: 14px; color: #666;">
                <div>HIGH SCORE: <span id="high-score-display">0</span></div>
                <div>MAX LEVEL: <span id="max-level-display">1</span></div>
              </div>
            </div>

            <!-- Instructions -->
            <div id="instructions" style="display: none; color: #00ffff; text-align: center; max-width: 600px;">
              <h2 style="font-size: 36px; margin-bottom: 30px;">MISSION BRIEFING</h2>
              <div style="text-align: left; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                <h3 style="color: #ffff00; margin-bottom: 15px;">CONTROLS:</h3>
                <p>🎮 <strong>WASD</strong> or <strong>Arrow Keys</strong> - Move your ship</p>
                <p>🔫 <strong>SPACE</strong> or <strong>Left Click</strong> - Fire primary weapons</p>
                <p>🚀 <strong>SHIFT</strong> - Fire missiles</p>
                <p>⏸️ <strong>P</strong> - Pause game</p>
                <p>🎯 <strong>Mouse</strong> - Aim precision weapons</p>
                
                <h3 style="color: #ffff00; margin: 20px 0 15px 0;">OBJECTIVES:</h3>
                <p>🎯 Destroy enemy ships and asteroids</p>
                <p>⭐ Collect power-ups and credits</p>
                <p>👹 Survive waves of enemies</p>
                <p>🏆 Achieve the highest score possible</p>
                
                <h3 style="color: #ffff00; margin: 20px 0 15px 0;">TIPS:</h3>
                <p>💡 Chain kills for score multipliers</p>
                <p>💡 Use cover behind asteroids</p>
                <p>💡 Manage your energy wisely</p>
                <p>💡 Different weapons excel against different enemies</p>
              </div>
              <button id="back-from-instructions-btn" class="menu-button" style="padding: 12px 30px; font-size: 16px; background: #666; color: #fff; border: none; border-radius: 20px; cursor: pointer;">
                Back to Menu
              </button>
            </div>

            <!-- Game Over Screen -->
            <div id="game-over-screen" style="display: none; color: #ff4444; text-align: center;">
              <div style="font-size: 48px; font-weight: bold; margin-bottom: 20px; text-shadow: 0 0 20px #ff4444;">
                MISSION FAILED
              </div>
              <div id="final-stats" style="font-size: 18px; margin-bottom: 30px; color: #aaaaaa;"></div>
              <button id="retry-btn" class="menu-button" style="padding: 15px 40px; font-size: 18px; background: linear-gradient(45deg, #ff4444, #ff8888); color: #fff; border: none; border-radius: 25px; cursor: pointer; font-weight: bold;">
                Retry Mission
              </button>
            </div>

            <!-- Victory Screen -->
            <div id="victory-screen" style="display: none; color: #00ff00; text-align: center;">
              <div style="font-size: 48px; font-weight: bold; margin-bottom: 20px; text-shadow: 0 0 20px #00ff00;">
                MISSION COMPLETE
              </div>
              <div id="victory-stats" style="font-size: 18px; margin-bottom: 30px; color: #aaaaaa;"></div>
              <button id="continue-btn" class="menu-button" style="padding: 15px 40px; font-size: 18px; background: linear-gradient(45deg, #00ff00, #88ff88); color: #000; border: none; border-radius: 25px; cursor: pointer; font-weight: bold;">
                Continue
              </button>
            </div>
          </div>

          <style>
            @keyframes rainbow {
              0% { filter: hue-rotate(0deg); }
              100% { filter: hue-rotate(360deg); }
            }
            
            .menu-button:hover {
              transform: translateY(-2px) scale(1.05);
              box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
            }

            #ess-canvas {
              animation: glow 3s infinite alternate;
            }

            @keyframes glow {
              0%, 100% { box-shadow: 0 0 20px #00ffff40; }
              50% { box-shadow: 0 0 30px #00ffff80, 0 0 40px #00ffff40; }
            }
          </style>
        </div>
      `,
      onInit: (container) => {
        SpaceShooter._container = container;
        SpaceShooter._canvas = container.querySelector('#ess-canvas');
        SpaceShooter._ctx = SpaceShooter._canvas.getContext('2d');

        SpaceShooter._init();
      },
      onDestroy: () => {
        SpaceShooter._cleanup();
      }
    };
  }

  static _init() {
    console.log('🚀 Initializing Elite Space Shooter');

    // Load save data
    SpaceShooter._loadGameData();

    // Initialize systems
    SpaceShooter._initializeBackground();
    SpaceShooter._initializePlayer();
    SpaceShooter._setupEventListeners();
    SpaceShooter._updateUI();

    // Show main menu
    SpaceShooter._showScreen('main-menu');

    // Set focus for keyboard input
    SpaceShooter._container.tabIndex = 0;
    SpaceShooter._container.focus();
  }

  static _cleanup() {
    SpaceShooter._stopGame();
    const container = SpaceShooter._container;

    if (container) {
      container.removeEventListener('keydown', SpaceShooter._onKeyDown);
      container.removeEventListener('keyup', SpaceShooter._onKeyUp);
      container.removeEventListener('mousemove', SpaceShooter._onMouseMove);
      container.removeEventListener('mousedown', SpaceShooter._onMouseDown);
      container.removeEventListener('mouseup', SpaceShooter._onMouseUp);
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // GAME INITIALIZATION METHODS
  // ═══════════════════════════════════════════════════════════════

  static _initializeBackground() {
    // Create starfield
    SpaceShooter._stars = [];
    for (let i = 0; i < 100; i++) {
      SpaceShooter._stars.push({
        x: Math.random() * SpaceShooter._width,
        y: Math.random() * SpaceShooter._height,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 100 + 50,
        brightness: Math.random() * 0.8 + 0.2
      });
    }
  }

  static _initializePlayer() {
    SpaceShooter._player = {
      x: 100,
      y: SpaceShooter._height / 2,
      width: 45,
      height: 30,

      // Movement properties
      velocity: { x: 0, y: 0 },
      acceleration: 1200,
      maxSpeed: 400,
      friction: 0.92,

      // Combat properties
      health: 100,
      maxHealth: 100,
      shield: 100,
      maxShield: 100,
      energy: 100,
      maxEnergy: 100,

      // Weapon systems
      primaryWeapon: 'laser',
      fireRate: 0,
      specialCooldown: 0,

      // Visual effects
      invulnerability: 0,
      hitFlash: 0
    };
  }

  static _setupEventListeners() {
    const container = SpaceShooter._container;

    // Keyboard events
    container.addEventListener('keydown', SpaceShooter._onKeyDown.bind(SpaceShooter));
    container.addEventListener('keyup', SpaceShooter._onKeyUp.bind(SpaceShooter));

    // Mouse events
    container.addEventListener('mousemove', SpaceShooter._onMouseMove.bind(SpaceShooter));
    container.addEventListener('mousedown', SpaceShooter._onMouseDown.bind(SpaceShooter));
    container.addEventListener('mouseup', SpaceShooter._onMouseUp.bind(SpaceShooter));

    // Menu button events
    SpaceShooter._setupMenuButtons();
  }

  static _setupMenuButtons() {
    const startBtn = SpaceShooter._container.querySelector('#start-game-btn');
    const instructionsBtn = SpaceShooter._container.querySelector('#instructions-btn');
    const backFromInstructionsBtn = SpaceShooter._container.querySelector('#back-from-instructions-btn');
    const retryBtn = SpaceShooter._container.querySelector('#retry-btn');
    const continueBtn = SpaceShooter._container.querySelector('#continue-btn');

    if (startBtn) startBtn.addEventListener('click', () => SpaceShooter._startGame());
    if (instructionsBtn) instructionsBtn.addEventListener('click', () => SpaceShooter._showInstructions());
    if (backFromInstructionsBtn) backFromInstructionsBtn.addEventListener('click', () => SpaceShooter._showScreen('main-menu'));
    if (retryBtn) retryBtn.addEventListener('click', () => SpaceShooter._startGame());
    if (continueBtn) continueBtn.addEventListener('click', () => SpaceShooter._nextLevel());
  }

  // ═══════════════════════════════════════════════════════════════
  // INPUT HANDLING
  // ═══════════════════════════════════════════════════════════════

  static _onKeyDown(e) {
    SpaceShooter._keys[e.code] = true;

    // Prevent default for game keys
    if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'KeyW', 'KeyA', 'KeyS', 'KeyD'].includes(e.code)) {
      e.preventDefault();
    }

    // Handle special keys
    if (e.code === 'KeyP' && SpaceShooter._gameState === 'playing') {
      SpaceShooter._pauseGame();
    }

    if (e.code === 'Escape') {
      if (SpaceShooter._gameState === 'playing') {
        SpaceShooter._pauseGame();
      } else if (SpaceShooter._gameState === 'paused') {
        SpaceShooter._resumeGame();
      }
    }
  }

  static _onKeyUp(e) {
    SpaceShooter._keys[e.code] = false;
  }

  static _onMouseMove(e) {
    const rect = SpaceShooter._canvas.getBoundingClientRect();
    SpaceShooter._mouse.x = e.clientX - rect.left;
    SpaceShooter._mouse.y = e.clientY - rect.top;
  }

  static _onMouseDown(e) {
    SpaceShooter._mouse.down = true;

    // Left click fires weapons in game
    if (SpaceShooter._gameState === 'playing' && e.button === 0) {
      SpaceShooter._keys['Space'] = true;
    }
  }

  static _onMouseUp(e) {
    SpaceShooter._mouse.down = false;

    if (e.button === 0) {
      SpaceShooter._keys['Space'] = false;
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // GAME STATE MANAGEMENT
  // ═══════════════════════════════════════════════════════════════

  static _startGame() {
    console.log('🎮 Starting new game');

    SpaceShooter._gameState = 'playing';
    SpaceShooter._currentLevel = 1;
    SpaceShooter._score = 0;
    SpaceShooter._lives = 3;
    SpaceShooter._credits = 0;
    SpaceShooter._experience = 0;
    SpaceShooter._combo = 0;
    SpaceShooter._multiplier = 1;
    SpaceShooter._enemiesKilled = 0;
    SpaceShooter._levelProgress = 0;

    // Reset player
    SpaceShooter._initializePlayer();

    // Clear all game objects
    SpaceShooter._clearGameObjects();

    // Reset spawn timer
    SpaceShooter._spawnTimer = 0;

    // Hide overlay and start game loop
    SpaceShooter._hideAllScreens();
    SpaceShooter._startGameLoop();
  }

  static _pauseGame() {
    if (SpaceShooter._running) {
      SpaceShooter._running = false;
      SpaceShooter._gameState = 'paused';
      // Show pause overlay
    }
  }

  static _resumeGame() {
    if (SpaceShooter._gameState === 'paused') {
      SpaceShooter._gameState = 'playing';
      SpaceShooter._startGameLoop();
    }
  }

  static _gameOver() {
    console.log('💀 Game Over');

    SpaceShooter._gameState = 'gameover';
    SpaceShooter._stopGame();

    // Update high score
    if (SpaceShooter._score > SpaceShooter._saveData.highScore) {
      SpaceShooter._saveData.highScore = SpaceShooter._score;
    }

    if (SpaceShooter._currentLevel > SpaceShooter._saveData.maxLevel) {
      SpaceShooter._saveData.maxLevel = SpaceShooter._currentLevel;
    }

    SpaceShooter._saveGameData();

    // Show game over screen
    SpaceShooter._showGameOverScreen();
  }

  static _nextLevel() {
    console.log(`✅ Level ${SpaceShooter._currentLevel} complete!`);

    SpaceShooter._currentLevel++;
    SpaceShooter._levelProgress = 0;
    SpaceShooter._enemiesKilled = 0;

    // Award level completion bonus
    const bonus = SpaceShooter._currentLevel * 1000;
    SpaceShooter._score += bonus;
    SpaceShooter._credits += SpaceShooter._currentLevel * 50;

    // Clear enemies and bullets
    SpaceShooter._enemies = [];
    SpaceShooter._enemyBullets = [];
    SpaceShooter._missiles = [];

    // Restore some health
    SpaceShooter._player.health = Math.min(SpaceShooter._player.maxHealth, SpaceShooter._player.health + 25);
    SpaceShooter._player.shield = SpaceShooter._player.maxShield;
    SpaceShooter._player.energy = SpaceShooter._player.maxEnergy;

    // Check if final level
    if (SpaceShooter._currentLevel > SpaceShooter._maxLevel) {
      SpaceShooter._victory();
    } else {
      // Continue playing
      SpaceShooter._gameState = 'playing';
      SpaceShooter._spawnTimer = 0;
      SpaceShooter._spawnInterval = Math.max(1000, SpaceShooter._spawnInterval - 100);
    }
  }

  static _victory() {
    console.log('🏆 Victory! All levels completed!');

    SpaceShooter._gameState = 'victory';
    SpaceShooter._stopGame();

    // Final bonus
    SpaceShooter._score += 10000;
    SpaceShooter._credits += 500;

    SpaceShooter._saveGameData();
    SpaceShooter._showVictoryScreen();
  }

  // ═══════════════════════════════════════════════════════════════
  // MAIN GAME LOOP
  // ═══════════════════════════════════════════════════════════════

  static _startGameLoop() {
    SpaceShooter._lastTime = performance.now();
    SpaceShooter._running = true;
    SpaceShooter._gameLoop(SpaceShooter._lastTime);
  }

  static _stopGame() {
    SpaceShooter._running = false;
    if (SpaceShooter._animationId) {
      cancelAnimationFrame(SpaceShooter._animationId);
      SpaceShooter._animationId = null;
    }
  }

  static _gameLoop(timestamp) {
    if (!SpaceShooter._running) return;

    SpaceShooter._deltaTime = (timestamp - SpaceShooter._lastTime) / 1000;
    SpaceShooter._lastTime = timestamp;

    if (SpaceShooter._gameState === 'playing') {
      SpaceShooter._update(SpaceShooter._deltaTime);
    }

    SpaceShooter._render();
    SpaceShooter._animationId = requestAnimationFrame(SpaceShooter._gameLoop.bind(SpaceShooter));
  }

  // ═══════════════════════════════════════════════════════════════
  // GAME UPDATE LOGIC
  // ═══════════════════════════════════════════════════════════════

  static _update(deltaTime) {
    // Update background
    SpaceShooter._updateBackground(deltaTime);

    // Update player
    SpaceShooter._updatePlayer(deltaTime);

    // Update weapons and projectiles
    SpaceShooter._updatePlayerBullets(deltaTime);
    SpaceShooter._updateEnemyBullets(deltaTime);
    SpaceShooter._updateMissiles(deltaTime);

    // Update enemies and AI
    SpaceShooter._updateEnemies(deltaTime);
    SpaceShooter._updateEnemySpawning(deltaTime);

    // Update environment
    SpaceShooter._updateAsteroids(deltaTime);
    SpaceShooter._updatePowerups(deltaTime);

    // Update visual effects
    SpaceShooter._updateParticles(deltaTime);
    SpaceShooter._updateExplosions(deltaTime);
    SpaceShooter._updateVisualEffects(deltaTime);

    // Check collisions
    SpaceShooter._checkCollisions();

    // Update game logic
    SpaceShooter._updateGameLogic(deltaTime);

    // Update UI
    SpaceShooter._updateUI();
  }

  static _updatePlayer(deltaTime) {
    const player = SpaceShooter._player;

    // Handle input
    let inputX = 0, inputY = 0;

    if (SpaceShooter._keys['ArrowLeft'] || SpaceShooter._keys['KeyA']) inputX -= 1;
    if (SpaceShooter._keys['ArrowRight'] || SpaceShooter._keys['KeyD']) inputX += 1;
    if (SpaceShooter._keys['ArrowUp'] || SpaceShooter._keys['KeyW']) inputY -= 1;
    if (SpaceShooter._keys['ArrowDown'] || SpaceShooter._keys['KeyS']) inputY += 1;

    // Normalize diagonal movement
    if (inputX !== 0 && inputY !== 0) {
      inputX *= 0.707;
      inputY *= 0.707;
    }

    // Apply acceleration
    const accel = player.acceleration * deltaTime;
    player.velocity.x += inputX * accel;
    player.velocity.y += inputY * accel;

    // Apply friction
    player.velocity.x *= Math.pow(player.friction, deltaTime * 60);
    player.velocity.y *= Math.pow(player.friction, deltaTime * 60);

    // Limit speed
    const speed = Math.sqrt(player.velocity.x ** 2 + player.velocity.y ** 2);
    if (speed > player.maxSpeed) {
      player.velocity.x = (player.velocity.x / speed) * player.maxSpeed;
      player.velocity.y = (player.velocity.y / speed) * player.maxSpeed;
    }

    // Update position
    player.x += player.velocity.x * deltaTime;
    player.y += player.velocity.y * deltaTime;

    // Boundary constraints
    player.x = Math.max(0, Math.min(player.x, SpaceShooter._width - player.width));
    player.y = Math.max(0, Math.min(player.y, SpaceShooter._height - player.height));

    // Update timers
    player.fireRate = Math.max(0, player.fireRate - deltaTime * 1000);
    player.specialCooldown = Math.max(0, player.specialCooldown - deltaTime * 1000);
    player.invulnerability = Math.max(0, player.invulnerability - deltaTime * 1000);
    player.hitFlash = Math.max(0, player.hitFlash - deltaTime * 1000);

    // Regenerate shield and energy
    if (player.shield < player.maxShield) {
      player.shield = Math.min(player.maxShield, player.shield + 10 * deltaTime);
    }

    if (player.energy < player.maxEnergy) {
      player.energy = Math.min(player.maxEnergy, player.energy + 15 * deltaTime);
    }

    // Handle weapons
    SpaceShooter._handlePlayerWeapons();
  }

  static _handlePlayerWeapons() {
    const player = SpaceShooter._player;

    // Primary weapon
    if (SpaceShooter._keys['Space'] && player.fireRate <= 0) {
      if (player.energy >= 5) {
        SpaceShooter._firePrimaryWeapon();
        player.fireRate = 150;
        player.energy -= 5;
      }
    }

    // Secondary weapon
    if (SpaceShooter._keys['ShiftLeft'] && player.specialCooldown <= 0) {
      SpaceShooter._fireSecondaryWeapon();
    }
  }

  static _firePrimaryWeapon() {
    const player = SpaceShooter._player;

    SpaceShooter._createPlayerBullet({
      x: player.x + player.width,
      y: player.y + player.height / 2,
      type: 'laser',
      velocity: { x: 800, y: 0 },
      damage: 25,
      color: '#00ffff'
    });

    SpaceShooter._addScreenShake(2);
  }

  static _fireSecondaryWeapon() {
    const player = SpaceShooter._player;

    if (player.energy >= 30) {
      SpaceShooter._createMissile({
        x: player.x + player.width,
        y: player.y + player.height / 2,
        targetX: SpaceShooter._mouse.x,
        targetY: SpaceShooter._mouse.y,
        damage: 150,
        isPlayerMissile: true
      });

      player.energy -= 30;
      player.specialCooldown = 2000;

      SpaceShooter._addScreenShake(5);
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // PROJECTILE SYSTEMS
  // ═══════════════════════════════════════════════════════════════

  static _createPlayerBullet(config) {
    SpaceShooter._playerBullets.push({
      x: config.x,
      y: config.y,
      width: 12,
      height: 4,
      velocity: config.velocity,
      damage: config.damage,
      type: config.type,
      color: config.color,
      life: 2.0
    });
  }

  static _createEnemyBullet(config) {
    SpaceShooter._enemyBullets.push({
      x: config.x,
      y: config.y,
      width: 8,
      height: 6,
      velocity: config.velocity,
      damage: config.damage || 25,
      type: config.type || 'basic',
      color: config.color || '#ff4444',
      life: 3.0
    });
  }

  static _createMissile(config) {
    SpaceShooter._missiles.push({
      x: config.x,
      y: config.y,
      width: 20,
      height: 8,
      velocity: { x: 0, y: 0 },
      targetX: config.targetX,
      targetY: config.targetY,
      damage: config.damage,
      speed: 300,
      turnRate: 180,
      life: 5.0,
      isPlayerMissile: config.isPlayerMissile || false,
      rotation: 0
    });
  }

  static _updatePlayerBullets(deltaTime) {
    for (let i = SpaceShooter._playerBullets.length - 1; i >= 0; i--) {
      const bullet = SpaceShooter._playerBullets[i];

      // Update position
      bullet.x += bullet.velocity.x * deltaTime;
      bullet.y += bullet.velocity.y * deltaTime;
      bullet.life -= deltaTime;

      // Remove if out of bounds or expired
      if (bullet.x > SpaceShooter._width || bullet.life <= 0 ||
          bullet.x < -50 || bullet.y < -50 || bullet.y > SpaceShooter._height + 50) {
        SpaceShooter._playerBullets.splice(i, 1);
      }
    }
  }

  static _updateEnemyBullets(deltaTime) {
    for (let i = SpaceShooter._enemyBullets.length - 1; i >= 0; i--) {
      const bullet = SpaceShooter._enemyBullets[i];

      // Update position
      bullet.x += bullet.velocity.x * deltaTime;
      bullet.y += bullet.velocity.y * deltaTime;
      bullet.life -= deltaTime;

      // Remove if out of bounds or expired
      if (bullet.x < -50 || bullet.x > SpaceShooter._width + 50 ||
          bullet.y < -50 || bullet.y > SpaceShooter._height + 50 || bullet.life <= 0) {
        SpaceShooter._enemyBullets.splice(i, 1);
      }
    }
  }

  static _updateMissiles(deltaTime) {
    for (let i = SpaceShooter._missiles.length - 1; i >= 0; i--) {
      const missile = SpaceShooter._missiles[i];

      // Calculate angle to target
      const dx = missile.targetX - missile.x;
      const dy = missile.targetY - missile.y;
      const targetAngle = Math.atan2(dy, dx);

      // Update rotation towards target
      let angleDiff = targetAngle - missile.rotation;

      // Normalize angle difference
      while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
      while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;

      // Turn towards target
      const turnAmount = (missile.turnRate * Math.PI / 180) * deltaTime;
      if (Math.abs(angleDiff) < turnAmount) {
        missile.rotation = targetAngle;
      } else {
        missile.rotation += angleDiff > 0 ? turnAmount : -turnAmount;
      }

      // Update velocity based on rotation
      missile.velocity.x = Math.cos(missile.rotation) * missile.speed;
      missile.velocity.y = Math.sin(missile.rotation) * missile.speed;

      // Update position
      missile.x += missile.velocity.x * deltaTime;
      missile.y += missile.velocity.y * deltaTime;
      missile.life -= deltaTime;

      // Remove if out of bounds or expired
      if (missile.x < -100 || missile.x > SpaceShooter._width + 100 ||
          missile.y < -100 || missile.y > SpaceShooter._height + 100 || missile.life <= 0) {
        // Create explosion when missile expires
        SpaceShooter._createExplosion(missile.x, missile.y, 60, '#ff8800');
        SpaceShooter._missiles.splice(i, 1);
      }
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // ENEMY SYSTEMS
  // ═══════════════════════════════════════════════════════════════

  static _updateEnemySpawning(deltaTime) {
    SpaceShooter._spawnTimer += deltaTime * 1000;

    if (SpaceShooter._spawnTimer >= SpaceShooter._spawnInterval) {
      SpaceShooter._spawnTimer = 0;
      SpaceShooter._spawnEnemy();
    }
  }

  static _spawnEnemy() {
    const enemy = {
      x: SpaceShooter._width + 20,
      y: Math.random() * (SpaceShooter._height - 40),
      width: 32,
      height: 32,
      health: 30 + SpaceShooter._currentLevel * 10,
      maxHealth: 30 + SpaceShooter._currentLevel * 10,
      speed: 120 + Math.random() * 80,
      points: 100,
      fireRate: Math.random() * 2000 + 1000,
      lastFire: 0,
      bodyColor: '#E74C3C',
      eyeColor: '#FFF'
    };

    SpaceShooter._enemies.push(enemy);
  }

  static _updateEnemies(deltaTime) {
    for (let i = SpaceShooter._enemies.length - 1; i >= 0; i--) {
      const enemy = SpaceShooter._enemies[i];

      // Move enemy
      enemy.x -= enemy.speed * deltaTime;

      // Update firing
      enemy.lastFire += deltaTime * 1000;
      if (enemy.lastFire >= enemy.fireRate) {
        enemy.lastFire = 0;
        SpaceShooter._enemyFire(enemy);
      }

      // Remove if off screen or dead
      if (enemy.x < -100 || enemy.health <= 0) {
        if (enemy.health <= 0) {
          SpaceShooter._enemyDestroyed(enemy);
        }
        SpaceShooter._enemies.splice(i, 1);
      }
    }
  }

  static _enemyFire(enemy) {
    const player = SpaceShooter._player;
    const dx = player.x - enemy.x;
    const dy = player.y - enemy.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Only fire if player is in range
    if (distance < 600) {
      const angle = Math.atan2(dy, dx);
      const speed = 250;

      SpaceShooter._createEnemyBullet({
        x: enemy.x,
        y: enemy.y + enemy.height / 2,
        velocity: {
          x: Math.cos(angle) * speed,
          y: Math.sin(angle) * speed
        },
        damage: 25,
        color: '#ff4444'
      });
    }
  }

  static _enemyDestroyed(enemy) {
    // Award points with multiplier
    const points = enemy.points * SpaceShooter._multiplier;
    SpaceShooter._score += points;
    SpaceShooter._credits += Math.floor(points / 10);

    // Update combo
    SpaceShooter._combo++;
    SpaceShooter._maxCombo = Math.max(SpaceShooter._maxCombo, SpaceShooter._combo);

    // Increase multiplier
    if (SpaceShooter._combo >= 10) {
      SpaceShooter._multiplier = Math.min(5, 1 + Math.floor(SpaceShooter._combo / 10) * 0.5);
    }

    // Create explosion
    SpaceShooter._createExplosion(
      enemy.x + enemy.width / 2,
      enemy.y + enemy.height / 2,
      enemy.width * 1.5,
      '#ff8800'
    );

    // Screen shake
    SpaceShooter._addScreenShake(8);

    SpaceShooter._enemiesKilled++;
    SpaceShooter._levelProgress = Math.min(1, SpaceShooter._enemiesKilled / (20 + SpaceShooter._currentLevel * 5));

    // Check level completion
    if (SpaceShooter._enemiesKilled >= 20 + SpaceShooter._currentLevel * 5) {
      SpaceShooter._nextLevel();
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // COLLISION DETECTION
  // ═══════════════════════════════════════════════════════════════

  static _checkCollisions() {
    const player = SpaceShooter._player;

    // Player bullets vs enemies
    for (let i = SpaceShooter._playerBullets.length - 1; i >= 0; i--) {
      const bullet = SpaceShooter._playerBullets[i];

      for (let j = SpaceShooter._enemies.length - 1; j >= 0; j--) {
        const enemy = SpaceShooter._enemies[j];

        if (SpaceShooter._checkRectCollision(bullet, enemy)) {
          // Hit enemy
          enemy.health -= bullet.damage;
          SpaceShooter._playerBullets.splice(i, 1);

          if (enemy.health <= 0) {
            SpaceShooter._enemyDestroyed(enemy);
            SpaceShooter._enemies.splice(j, 1);
          }
          break;
        }
      }
    }

    // Enemy bullets vs player
    for (let i = SpaceShooter._enemyBullets.length - 1; i >= 0; i--) {
      const bullet = SpaceShooter._enemyBullets[i];

      if (SpaceShooter._checkRectCollision(bullet, player)) {
        // Hit player
        if (player.invulnerability <= 0) {
          SpaceShooter._damagePlayer(bullet.damage);
          player.invulnerability = 1000;
        }
        SpaceShooter._enemyBullets.splice(i, 1);
      }
    }

    // Player vs enemies (collision damage)
    for (let i = SpaceShooter._enemies.length - 1; i >= 0; i--) {
      const enemy = SpaceShooter._enemies[i];

      if (SpaceShooter._checkRectCollision(player, enemy)) {
        if (player.invulnerability <= 0) {
          SpaceShooter._damagePlayer(50);
          player.invulnerability = 1000;
        }
        // Destroy enemy on collision
        SpaceShooter._enemyDestroyed(enemy);
        SpaceShooter._enemies.splice(i, 1);
      }
    }

    // Missiles vs enemies
    for (let i = SpaceShooter._missiles.length - 1; i >= 0; i--) {
      const missile = SpaceShooter._missiles[i];

      if (missile.isPlayerMissile) {
        for (let j = SpaceShooter._enemies.length - 1; j >= 0; j--) {
          const enemy = SpaceShooter._enemies[j];

          if (SpaceShooter._checkRectCollision(missile, enemy)) {
            // Hit enemy with missile
            enemy.health -= missile.damage;
            SpaceShooter._createExplosion(missile.x, missile.y, 80, '#ff8800');
            SpaceShooter._missiles.splice(i, 1);

            if (enemy.health <= 0) {
              SpaceShooter._enemyDestroyed(enemy);
              SpaceShooter._enemies.splice(j, 1);
            }
            break;
          }
        }
      }
    }
  }

  static _checkRectCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
  }

  static _damagePlayer(damage) {
    const player = SpaceShooter._player;

    if (player.shield > 0) {
      const shieldDamage = Math.min(damage, player.shield);
      player.shield -= shieldDamage;
      damage -= shieldDamage;
    }

    if (damage > 0) {
      player.health -= damage;
      player.hitFlash = 200;
    }

    SpaceShooter._addScreenShake(10);

    if (player.health <= 0) {
      SpaceShooter._playerDeath();
    }
  }

  static _playerDeath() {
    SpaceShooter._lives--;

    if (SpaceShooter._lives <= 0) {
      SpaceShooter._gameOver();
    } else {
      // Respawn player
      SpaceShooter._player.health = SpaceShooter._player.maxHealth;
      SpaceShooter._player.shield = SpaceShooter._player.maxShield;
      SpaceShooter._player.x = 100;
      SpaceShooter._player.y = SpaceShooter._height / 2;
      SpaceShooter._player.velocity = { x: 0, y: 0 };
      SpaceShooter._player.invulnerability = 3000;
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // UTILITY METHODS (IMPLEMENTED)
  // ═══════════════════════════════════════════════════════════════

  static _clearGameObjects() {
    SpaceShooter._playerBullets = [];
    SpaceShooter._enemies = [];
    SpaceShooter._enemyBullets = [];
    SpaceShooter._missiles = [];
    SpaceShooter._asteroids = [];
    SpaceShooter._powerups = [];
    SpaceShooter._explosions = [];
    SpaceShooter._particles = [];
  }

  static _updateBackground(deltaTime) {
    // Update stars
    for (const star of SpaceShooter._stars) {
      star.x -= star.speed * deltaTime;
      if (star.x < -10) {
        star.x = SpaceShooter._width + 10;
        star.y = Math.random() * SpaceShooter._height;
      }
    }
  }

  static _updateParticles(deltaTime) {
    for (let i = SpaceShooter._particles.length - 1; i >= 0; i--) {
      const particle = SpaceShooter._particles[i];
      particle.life -= deltaTime;

      if (particle.life <= 0) {
        SpaceShooter._particles.splice(i, 1);
      } else {
        particle.x += particle.velocity.x * deltaTime;
        particle.y += particle.velocity.y * deltaTime;
        particle.size *= 0.99;
      }
    }
  }

  static _updateExplosions(deltaTime) {
    for (let i = SpaceShooter._explosions.length - 1; i >= 0; i--) {
      const explosion = SpaceShooter._explosions[i];
      explosion.life -= deltaTime;
      explosion.radius += explosion.expansionRate * deltaTime;

      if (explosion.life <= 0) {
        SpaceShooter._explosions.splice(i, 1);
      }
    }
  }

  static _updateVisualEffects(deltaTime) {
    // Update screen shake
    if (SpaceShooter._screenShake.duration > 0) {
      SpaceShooter._screenShake.duration -= deltaTime * 1000;
      if (SpaceShooter._screenShake.duration <= 0) {
        SpaceShooter._screenShake.intensity = 0;
      }
    }
  }

  static _updateGameLogic(deltaTime) {
    // Reset combo if no kills for a while
    if (SpaceShooter._combo > 0) {
      // Could add combo timeout logic here
    }
  }

  static _updateAsteroids(deltaTime) {
    // Placeholder for asteroid updates
  }

  static _updatePowerups(deltaTime) {
    // Placeholder for powerup updates
  }

  static _createExplosion(x, y, size, color) {
    SpaceShooter._explosions.push({
      x: x,
      y: y,
      radius: 0,
      maxRadius: size,
      life: 0.5,
      expansionRate: size * 2,
      color: color || '#ff8800'
    });
  }

  static _addScreenShake(intensity) {
    SpaceShooter._screenShake.intensity = Math.max(SpaceShooter._screenShake.intensity, intensity);
    SpaceShooter._screenShake.duration = 200;
  }

  // ═══════════════════════════════════════════════════════════════
  // RENDERING SYSTEM
  // ═══════════════════════════════════════════════════════════════

  static _render() {
    const ctx = SpaceShooter._ctx;

    // Apply screen shake
    ctx.save();
    if (SpaceShooter._screenShake.intensity > 0) {
      const shakeX = (Math.random() - 0.5) * SpaceShooter._screenShake.intensity;
      const shakeY = (Math.random() - 0.5) * SpaceShooter._screenShake.intensity;
      ctx.translate(shakeX, shakeY);
    }

    // Clear canvas
    ctx.fillStyle = '#000011';
    ctx.fillRect(0, 0, SpaceShooter._width, SpaceShooter._height);

    // Render background stars
    SpaceShooter._renderStars(ctx);

    // Render game objects
    SpaceShooter._renderExplosions(ctx);
    SpaceShooter._renderParticles(ctx);
    SpaceShooter._renderProjectiles(ctx);
    SpaceShooter._renderEnemies(ctx);
    SpaceShooter._renderPlayer(ctx);

    ctx.restore();
  }

  static _renderStars(ctx) {
    ctx.fillStyle = '#ffffff';
    for (const star of SpaceShooter._stars) {
      ctx.globalAlpha = star.brightness;
      ctx.fillRect(star.x, star.y, star.size, star.size);
    }
    ctx.globalAlpha = 1;
  }

  static _renderPlayer(ctx) {
    const player = SpaceShooter._player;

    if (player.invulnerability > 0 && Math.floor(Date.now() / 100) % 2) {
      return; // Flashing effect when invulnerable
    }

    ctx.save();
    ctx.translate(player.x + player.width/2, player.y + player.height/2);

    // Player ship
    ctx.fillStyle = player.hitFlash > 0 ? '#ffffff' : '#00aaff';
    ctx.strokeStyle = '#00ffff';
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(player.width/2, 0);
    ctx.lineTo(-player.width/2, player.height/3);
    ctx.lineTo(-player.width/3, player.height/4);
    ctx.lineTo(-player.width/3, -player.height/4);
    ctx.lineTo(-player.width/2, -player.height/3);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Engine glow
    ctx.fillStyle = '#0088ff';
    ctx.fillRect(-player.width/2 - 8, -player.height/6, 8, player.height/3);

    // Shield effect
    if (player.shield > 0) {
      const shieldAlpha = (player.shield / player.maxShield) * 0.4;
      ctx.strokeStyle = `rgba(0, 255, 255, ${shieldAlpha})`;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, 0, player.width/2 + 8, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.restore();
  }

  static _renderEnemies(ctx) {
    for (const enemy of SpaceShooter._enemies) {
      ctx.save();
      ctx.translate(enemy.x + enemy.width/2, enemy.y + enemy.height/2);

      // Enemy body
      ctx.fillStyle = enemy.bodyColor;
      ctx.strokeStyle = '#ff0000';
      ctx.lineWidth = 1;

      // Simple rectangular enemy
      ctx.fillRect(-enemy.width/2, -enemy.height/2, enemy.width, enemy.height);
      ctx.strokeRect(-enemy.width/2, -enemy.height/2, enemy.width, enemy.height);

      // Eyes
      ctx.fillStyle = enemy.eyeColor;
      ctx.fillRect(-enemy.width/4, -enemy.height/4, 4, 4);
      ctx.fillRect(enemy.width/4-4, -enemy.height/4, 4, 4);

      // Health bar for damaged enemies
      if (enemy.health < enemy.maxHealth) {
        const barWidth = enemy.width;
        const healthPercent = enemy.health / enemy.maxHealth;

        ctx.fillStyle = '#333';
        ctx.fillRect(-barWidth/2, -enemy.height/2 - 12, barWidth, 4);

        ctx.fillStyle = healthPercent > 0.5 ? '#4f4' : healthPercent > 0.25 ? '#ff4' : '#f44';
        ctx.fillRect(-barWidth/2, -enemy.height/2 - 12, barWidth * healthPercent, 4);
      }

      ctx.restore();
    }
  }

  static _renderProjectiles(ctx) {
    // Player bullets
    ctx.fillStyle = '#00ffff';
    for (const bullet of SpaceShooter._playerBullets) {
      ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    }

    // Enemy bullets
    ctx.fillStyle = '#ff4444';
    for (const bullet of SpaceShooter._enemyBullets) {
      ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    }

    // Missiles
    ctx.fillStyle = '#ffaa00';
    for (const missile of SpaceShooter._missiles) {
      ctx.save();
      ctx.translate(missile.x + missile.width/2, missile.y + missile.height/2);
      ctx.rotate(missile.rotation);
      ctx.fillRect(-missile.width/2, -missile.height/2, missile.width, missile.height);
      ctx.restore();
    }
  }

  static _renderExplosions(ctx) {
    for (const explosion of SpaceShooter._explosions) {
      const alpha = explosion.life / 0.5;
      ctx.strokeStyle = `rgba(255, 140, 0, ${alpha})`;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(explosion.x, explosion.y, explosion.radius, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  static _renderParticles(ctx) {
    for (const particle of SpaceShooter._particles) {
      const alpha = particle.life / particle.maxLife;
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // UI METHODS
  // ═══════════════════════════════════════════════════════════════

  static _updateUI() {
    // Update score display
    const scoreEl = SpaceShooter._container.querySelector('#ess-score');
    if (scoreEl) scoreEl.textContent = `SCORE: ${SpaceShooter._score.toLocaleString()}`;

    // Update other UI elements
    const creditsEl = SpaceShooter._container.querySelector('#ess-credits');
    if (creditsEl) creditsEl.textContent = `CREDITS: ${SpaceShooter._credits}`;

    const livesEl = SpaceShooter._container.querySelector('#ess-lives');
    if (livesEl) livesEl.textContent = `LIVES: ${SpaceShooter._lives}`;

    const levelEl = SpaceShooter._container.querySelector('#ess-level');
    if (levelEl) levelEl.textContent = `LEVEL: ${SpaceShooter._currentLevel}`;

    const comboEl = SpaceShooter._container.querySelector('#ess-combo');
    if (comboEl) comboEl.textContent = `COMBO: ${SpaceShooter._combo}x`;

    const multiplierEl = SpaceShooter._container.querySelector('#ess-multiplier');
    if (multiplierEl) multiplierEl.textContent = `×${SpaceShooter._multiplier.toFixed(1)}`;

    // Update health bars
    const player = SpaceShooter._player;
    if (player) {
      const hullFill = SpaceShooter._container.querySelector('#hull-fill');
      if (hullFill) hullFill.style.width = `${(player.health / player.maxHealth) * 100}%`;

      const shieldFill = SpaceShooter._container.querySelector('#shield-fill');
      if (shieldFill) shieldFill.style.width = `${(player.shield / player.maxShield) * 100}%`;

      const energyFill = SpaceShooter._container.querySelector('#energy-fill');
      if (energyFill) energyFill.style.width = `${(player.energy / player.maxEnergy) * 100}%`;
    }

    // Update level progress
    const progressFill = SpaceShooter._container.querySelector('#level-progress-fill');
    if (progressFill) progressFill.style.width = `${SpaceShooter._levelProgress * 100}%`;
  }

  // Screen management
  static _showScreen(screenId) {
    // Hide all screens
    SpaceShooter._hideAllScreens();

    // Show specific screen
    const screen = SpaceShooter._container.querySelector(`#${screenId}`);
    if (screen) {
      screen.style.display = 'block';
    }

    const overlay = SpaceShooter._container.querySelector('#ess-overlay');
    if (overlay) {
      overlay.style.display = 'flex';
    }
  }

  static _hideAllScreens() {
    const screens = ['main-menu', 'instructions', 'game-over-screen', 'victory-screen'];
    screens.forEach(screenId => {
      const screen = SpaceShooter._container.querySelector(`#${screenId}`);
      if (screen) screen.style.display = 'none';
    });

    const overlay = SpaceShooter._container.querySelector('#ess-overlay');
    if (overlay) {
      overlay.style.display = 'none';
    }
  }

  static _showInstructions() {
    SpaceShooter._showScreen('instructions');
  }

  static _showGameOverScreen() {
    const finalStats = SpaceShooter._container.querySelector('#final-stats');
    if (finalStats) {
      finalStats.innerHTML = `
        Final Score: ${SpaceShooter._score.toLocaleString()}<br>
        Level Reached: ${SpaceShooter._currentLevel}<br>
        Max Combo: ${SpaceShooter._maxCombo}x
      `;
    }

    SpaceShooter._showScreen('game-over-screen');
  }

  static _showVictoryScreen() {
    const victoryStats = SpaceShooter._container.querySelector('#victory-stats');
    if (victoryStats) {
      victoryStats.innerHTML = `
        Final Score: ${SpaceShooter._score.toLocaleString()}<br>
        All ${SpaceShooter._maxLevel} Levels Completed!<br>
        Max Combo: ${SpaceShooter._maxCombo}x
      `;
    }

    SpaceShooter._showScreen('victory-screen');
  }

  // Save/Load system
  static _saveGameData() {
    try {
      localStorage.setItem('eliteSpaceShooterSave', JSON.stringify(SpaceShooter._saveData));
    } catch (e) {
      console.warn('Could not save game data');
    }
  }

  static _loadGameData() {
    try {
      const saved = localStorage.getItem('eliteSpaceShooterSave');
      if (saved) {
        SpaceShooter._saveData = { ...SpaceShooter._saveData, ...JSON.parse(saved) };
      }

      // Update high score display
      const highScoreEl = SpaceShooter._container.querySelector('#high-score-display');
      if (highScoreEl) highScoreEl.textContent = SpaceShooter._saveData.highScore;

      const maxLevelEl = SpaceShooter._container.querySelector('#max-level-display');
      if (maxLevelEl) maxLevelEl.textContent = SpaceShooter._saveData.maxLevel;
    } catch (e) {
      console.warn('Could not load game data');
    }
  }
}

// Export for WindowManager
window.SpaceShooter = SpaceShooter;