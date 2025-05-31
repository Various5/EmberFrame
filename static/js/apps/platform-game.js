/**
 * APP_METADATA
 * @name PlatformerQuest
 * @icon fas fa-shield-alt
 * @description A colorful jump-and-run arcade game where you attack enemies, dodge obstacles, and progress through multiple levels while aiming for high scores.
 * @category Games
 * @version 1.0.0
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

  // Player properties
  static _player = {
    x: 50,
    y: 0,
    width: 32,
    height: 48,
    vx: 0,
    vy: 0,
    speed: 200,        // horizontal speed (pixels/sec)
    jumpStrength: 450, // initial jump velocity
    color: '#22a',
    onGround: false,
    facing: 1,         // 1 = right, -1 = left
    isAttacking: false,
    attackTimer: 0,
    attackDuration: 200,    // ms
    attackCooldown: 0,      // ms
    dodgeCooldown: 0,       // ms
    isDodging: false,
    dodgeTimer: 0,
    dodgeDuration: 300,     // ms
    dashSpeed: 500
  };

  // Game world
  static _cameraX = 0;
  static _gravity = 1200; // pixels/sec^2

  // Levels array: each level has length, platforms, enemies
  static _levels = [
    {
      length: 2000,
      platforms: [
        { x:   0, y: 450, width: 2000, height: 50 },      // ground
        { x: 300, y: 350, width: 100, height: 20 },
        { x: 600, y: 300, width: 120, height: 20 },
        { x:1000, y: 350, width: 100, height: 20 },
        { x:1300, y: 300, width: 100, height: 20 },
        { x:1600, y: 350, width: 150, height: 20 }
      ],
      enemies: [
        // Each enemy: x, y (top-left), width, height, alive
        { x: 400, y: 350 - 32, width: 32, height: 32, alive: true },
        { x: 650, y: 300 - 32, width: 32, height: 32, alive: true },
        { x:1100, y: 350 - 32, width: 32, height: 32, alive: true },
        { x:1400, y: 300 - 32, width: 32, height: 32, alive: true },
        { x:1750, y: 450 - 32, width: 32, height: 32, alive: true }
      ]
    },
    {
      length: 2500,
      platforms: [
        { x:   0, y: 450, width: 2500, height: 50 },
        { x: 250, y: 350, width: 100, height: 20 },
        { x: 550, y: 300, width: 120, height: 20 },
        { x: 850, y: 250, width: 100, height: 20 },
        { x:1150, y: 300, width: 120, height: 20 },
        { x:1450, y: 350, width: 100, height: 20 },
        { x:1750, y: 300, width: 150, height: 20 },
        { x:2050, y: 350, width: 200, height: 20 }
      ],
      enemies: [
        { x: 300, y: 350 - 32, width: 32, height: 32, alive: true },
        { x: 600, y: 300 - 32, width: 32, height: 32, alive: true },
        { x: 900, y: 250 - 32, width: 32, height: 32, alive: true },
        { x:1200, y: 300 - 32, width: 32, height: 32, alive: true },
        { x:1500, y: 350 - 32, width: 32, height: 32, alive: true },
        { x:1800, y: 300 - 32, width: 32, height: 32, alive: true },
        { x:2100, y: 350 - 32, width: 32, height: 32, alive: true }
      ]
    },
    {
      length: 3000,
      platforms: [
        { x:   0, y: 450, width: 3000, height: 50 },
        { x: 200, y: 380, width: 120, height: 20 },
        { x: 500, y: 330, width: 150, height: 20 },
        { x: 800, y: 280, width: 100, height: 20 },
        { x:1100, y: 330, width: 120, height: 20 },
        { x:1400, y: 380, width: 100, height: 20 },
        { x:1700, y: 330, width: 150, height: 20 },
        { x:2000, y: 280, width: 120, height: 20 },
        { x:2300, y: 330, width: 100, height: 20 },
        { x:2600, y: 380, width: 200, height: 20 }
      ],
      enemies: [
        { x: 220,  y: 380 - 32, width: 32, height: 32, alive: true },
        { x: 550,  y: 330 - 32, width: 32, height: 32, alive: true },
        { x: 820,  y: 280 - 32, width: 32, height: 32, alive: true },
        { x:1120, y: 330 - 32, width: 32, height: 32, alive: true },
        { x:1420, y: 380 - 32, width: 32, height: 32, alive: true },
        { x:1720, y: 330 - 32, width: 32, height: 32, alive: true },
        { x:2020, y: 280 - 32, width: 32, height: 32, alive: true },
        { x:2320, y: 330 - 32, width: 32, height: 32, alive: true },
        { x:2620, y: 380 - 32, width: 32, height: 32, alive: true }
      ]
    }
  ];
  static _levelIndex = 0;
  static _currentLevel = null;

  // Collision objects in current level
  static _platforms = [];
  static _enemies = [];

  // Input
  static _keys = {};

  // Score & high scores
  static _score = 0;
  static _highScores = [];

  // Timing
  static _lastTime = 0;
  static _running = false;
  static _state = 'start'; // 'start' | 'playing' | 'levelComplete' | 'gameover'

  // Overlays
  static _overlay = null;
  static _overlayText = null;
  static _overlaySub = null;

  // UI elements
  static _scoreEl = null;
  static _levelEl = null;
  static _highScoreEl = null;

  // ────────────────────────────────────────────────────────────────
  // Create the window (called by WindowManager)
  static createWindow() {
    return {
      title: 'Platformer Quest',
      width: '820px',
      height: '580px',
      content: `
        <div id="platformer-container" style="position:relative; width:100%; height:100%; background:#87CEEB; overflow:hidden; font-family:sans-serif;">
          <canvas id="pf-canvas" width="800" height="500"
                  style="display:block; background:#87CEEB; margin:10px auto; border:2px solid #444;"></canvas>
          <div id="pf-ui" style="width:800px; margin:0 auto; display:flex; justify-content: space-between; 
                                color:#000; font-size:16px; background:rgba(255,255,255,0.8); padding:4px 8px; border:2px solid #444;">
            <div id="pf-score">Score: 0</div>
            <div id="pf-level">Level: 1</div>
            <div id="pf-highscore">High Score: 0</div>
          </div>
          <div id="pf-overlay" style="
                position:absolute; top:0; left:50%; transform:translateX(-50%);
                width:800px; height:500px; display:flex; flex-direction:column;
                justify-content:center; align-items:center; color:#fff;
                font-size:24px; background:rgba(0,0,0,0.7); z-index:10;">
            <div id="pf-overlay-text">Press ENTER to Start</div>
            <div id="pf-overlay-sub" style="font-size:16px; margin-top:12px;">
              Use ←/→ (A/D) to Move, ↑ (W/Space) to Jump, J to Attack, K to Dodge
            </div>
          </div>
        </div>
      `,
      onInit: (container) => {
        PlatformerQuest._container = container;
        PlatformerQuest._canvas = container.querySelector('#pf-canvas');
        PlatformerQuest._ctx = PlatformerQuest._canvas.getContext('2d');

        PlatformerQuest._scoreEl = container.querySelector('#pf-score');
        PlatformerQuest._levelEl = container.querySelector('#pf-level');
        PlatformerQuest._highScoreEl = container.querySelector('#pf-highscore');

        PlatformerQuest._overlay = container.querySelector('#pf-overlay');
        PlatformerQuest._overlayText = container.querySelector('#pf-overlay-text');
        PlatformerQuest._overlaySub = container.querySelector('#pf-overlay-sub');

        // Load high scores from localStorage
        const stored = localStorage.getItem('platformerQuestHighScores');
        if (stored) {
          try {
            PlatformerQuest._highScores = JSON.parse(stored);
          } catch {
            PlatformerQuest._highScores = [];
          }
        }
        PlatformerQuest._updateHighScoreDisplay();

        // Initialize first level data
        PlatformerQuest._levelIndex = 0;
        PlatformerQuest._loadLevel(PlatformerQuest._levelIndex);

        // Bind input
        container.tabIndex = 0;
        container.focus();
        container.addEventListener('keydown', PlatformerQuest._onKeyDown);
        container.addEventListener('keyup', PlatformerQuest._onKeyUp);

        // Listen for ENTER on start/levelComplete/gameover
        container.addEventListener('keydown', PlatformerQuest._handleEnter);

        // Show start overlay
        PlatformerQuest._showOverlay('Press ENTER to Start', 'Use ←/→ (A/D) to Move, ↑ (W/Space) to Jump, J to Attack, K to Dodge');
      },
      onDestroy: () => {
        // Clean up
        PlatformerQuest._stop();
        const c = PlatformerQuest._container;
        c.removeEventListener('keydown', PlatformerQuest._onKeyDown);
        c.removeEventListener('keyup', PlatformerQuest._onKeyUp);
      }
    };
  }

  // ────────────────────────────────────────────────────────────────
  // Input handlers
  static _onKeyDown(e) {
    PlatformerQuest._keys[e.code] = true;
    // Prevent arrow keys/spaces from scrolling
    if (['ArrowLeft','ArrowRight','ArrowUp','Space'].includes(e.code)) {
      e.preventDefault();
    }
    // Allow ESC to reset to start screen
    if (e.code === 'Escape' && PlatformerQuest._state !== 'start') {
      PlatformerQuest._state = 'start';
      PlatformerQuest._stop();
      PlatformerQuest._loadLevel(0);
      PlatformerQuest._score = 0;
      PlatformerQuest._updateScoreDisplay();
      PlatformerQuest._updateHighScoreDisplay();
      PlatformerQuest._showOverlay('Press ENTER to Start','Use ←/→ (A/D) to Move, ↑ (W/Space) to Jump, J to Attack, K to Dodge');
    }
  }

  static _onKeyUp(e) {
    PlatformerQuest._keys[e.code] = false;
  }

  static _handleEnter(e) {
    if (e.code === 'Enter') {
      e.preventDefault();
      if (PlatformerQuest._state === 'start') {
        PlatformerQuest._startLevel();
      } else if (PlatformerQuest._state === 'levelComplete') {
        PlatformerQuest._levelIndex++;
        if (PlatformerQuest._levelIndex < PlatformerQuest._levels.length) {
          PlatformerQuest._loadLevel(PlatformerQuest._levelIndex);
          PlatformerQuest._startLevel();
        } else {
          // All levels done → Game Over/Win
          PlatformerQuest._state = 'gameover';
          PlatformerQuest._handleGameOver(true);
        }
      } else if (PlatformerQuest._state === 'gameover') {
        // Restart entire game
        PlatformerQuest._state = 'start';
        PlatformerQuest._score = 0;
        PlatformerQuest._updateScoreDisplay();
        PlatformerQuest._loadLevel(0);
        PlatformerQuest._showOverlay('Press ENTER to Start','Use ←/→ (A/D) to Move, ↑ (W/Space) to Jump, J to Attack, K to Dodge');
      }
    }
  }

  // ────────────────────────────────────────────────────────────────
  // Level loading and initialization
  static _loadLevel(index) {
    const lvlData = PlatformerQuest._levels[index];
    PlatformerQuest._currentLevel = {
      length: lvlData.length,
      platforms: lvlData.platforms.map(p => ({ ...p })), // deep copy
      enemies: lvlData.enemies.map(e => ({ ...e }))      // deep copy
    };
    PlatformerQuest._platforms = PlatformerQuest._currentLevel.platforms;
    PlatformerQuest._enemies = PlatformerQuest._currentLevel.enemies;

    // Reset player
    PlatformerQuest._player.x = 50;
    PlatformerQuest._player.y = 400;
    PlatformerQuest._player.vx = 0;
    PlatformerQuest._player.vy = 0;
    PlatformerQuest._player.onGround = false;
    PlatformerQuest._player.isAttacking = false;
    PlatformerQuest._player.attackTimer = 0;
    PlatformerQuest._player.attackCooldown = 0;
    PlatformerQuest._player.isDodging = false;
    PlatformerQuest._player.dodgeTimer = 0;
    PlatformerQuest._player.dodgeCooldown = 0;

    PlatformerQuest._cameraX = 0;
    PlatformerQuest._updateLevelDisplay();
  }

  static _startLevel() {
    PlatformerQuest._state = 'playing';
    PlatformerQuest._overlay.style.display = 'none';
    PlatformerQuest._lastTime = performance.now();
    PlatformerQuest._running = true;
    PlatformerQuest._loop(PlatformerQuest._lastTime);
  }

  // ────────────────────────────────────────────────────────────────
  // Main game loop
  static _loop(timestamp) {
    if (!PlatformerQuest._running) return;
    const delta = timestamp - PlatformerQuest._lastTime;
    PlatformerQuest._lastTime = timestamp;

    PlatformerQuest._update(delta);
    PlatformerQuest._draw();

    if (PlatformerQuest._state === 'playing') {
      PlatformerQuest._animationId = requestAnimationFrame(PlatformerQuest._loop.bind(PlatformerQuest));
    }
  }

  static _stop() {
    PlatformerQuest._running = false;
    if (PlatformerQuest._animationId) {
      cancelAnimationFrame(PlatformerQuest._animationId);
      PlatformerQuest._animationId = null;
    }
  }

  // ────────────────────────────────────────────────────────────────
  // Update game state
  static _update(delta) {
    const dt = delta / 1000; // convert ms to seconds
    const p = PlatformerQuest._player;

    // Handle dodge timer
    if (p.isDodging) {
      p.dodgeTimer -= delta;
      if (p.dodgeTimer <= 0) {
        p.isDodging = false;
        p.dodgeCooldown = 500; // 0.5s cooldown
      }
    } else if (p.dodgeCooldown > 0) {
      p.dodgeCooldown -= delta;
    }

    // Handle attack cooldown/timer
    if (p.isAttacking) {
      p.attackTimer -= delta;
      if (p.attackTimer <= 0) {
        p.isAttacking = false;
        p.attackCooldown = 300; // 0.3s cooldown
      }
    } else if (p.attackCooldown > 0) {
      p.attackCooldown -= delta;
    }

    // Horizontal movement (not allowed when attacking or dodging? We allow movement during both)
    let moveDir = 0;
    if (PlatformerQuest._keys['ArrowLeft'] || PlatformerQuest._keys['KeyA']) {
      moveDir = -1;
      p.facing = -1;
    } else if (PlatformerQuest._keys['ArrowRight'] || PlatformerQuest._keys['KeyD']) {
      moveDir = 1;
      p.facing = 1;
    }
    p.vx = moveDir * p.speed;

    // Jump
    if ((PlatformerQuest._keys['ArrowUp'] || PlatformerQuest._keys['KeyW'] || PlatformerQuest._keys['Space'])
        && p.onGround) {
      p.vy = -p.jumpStrength;
      p.onGround = false;
    }

    // Attack
    if (PlatformerQuest._keys['KeyJ'] && !p.isAttacking && p.attackCooldown <= 0) {
      p.isAttacking = true;
      p.attackTimer = p.attackDuration;
      // Perform attack collision immediately
      PlatformerQuest._performAttack();
    }

    // Dodge (dash)
    if (PlatformerQuest._keys['KeyK'] && !p.isDodging && p.dodgeCooldown <= 0) {
      p.isDodging = true;
      p.dodgeTimer = p.dodgeDuration;
      // Give a burst of velocity in facing direction
      p.vx = p.facing * p.dashSpeed;
    }

    // Apply gravity
    p.vy += PlatformerQuest._gravity * dt;

    // Save old positions for collision checks
    const oldX = p.x;
    const oldY = p.y;

    // Update position
    p.x += p.vx * dt;
    p.y += p.vy * dt;

    // Collision with platforms
    p.onGround = false;
    for (let plat of PlatformerQuest._platforms) {
      // Axis-aligned bounding box collision
      if (
        p.x + p.width > plat.x &&
        p.x < plat.x + plat.width &&
        oldY + p.height <= plat.y &&
        p.y + p.height >= plat.y
      ) {
        // Land on platform
        p.y = plat.y - p.height;
        p.vy = 0;
        p.onGround = true;
      }
      // Horizontal collisions: prevent passing through platforms
      if (
        p.x + p.width > plat.x &&
        p.x < plat.x + plat.width &&
        p.y + p.height > plat.y &&
        oldY + p.height > plat.y &&
        oldY + p.y < plat.y + plat.height // ensure vertical overlap
      ) {
        if (oldX + p.width <= plat.x && p.x + p.width > plat.x) {
          // Hit platform from left
          p.x = plat.x - p.width;
        }
        if (oldX >= plat.x + plat.width && p.x < plat.x + plat.width) {
          // Hit platform from right
          p.x = plat.x + plat.width;
        }
      }
    }

    // Prevent falling below ground (redundant since ground is a platform)
    if (p.y + p.height > PlatformerQuest._height) {
      p.y = PlatformerQuest._height - p.height;
      p.vy = 0;
      p.onGround = true;
    }

    // Clamp player X within world
    if (p.x < 0) p.x = 0;

    // Update camera: follow player, but clamp
    const levelLen = PlatformerQuest._currentLevel.length;
    PlatformerQuest._cameraX = Math.max(0, Math.min(p.x - PlatformerQuest._width / 4, levelLen - PlatformerQuest._width));

    // Enemy collisions (only if player not dodging)
    if (!p.isDodging) {
      for (let enemy of PlatformerQuest._enemies) {
        if (!enemy.alive) continue;
        if (
          p.x + p.width > enemy.x &&
          p.x < enemy.x + enemy.width &&
          p.y + p.height > enemy.y &&
          p.y < enemy.y + enemy.height
        ) {
          // Player hit by enemy: Game Over
          PlatformerQuest._state = 'gameover';
          PlatformerQuest._handleGameOver(false);
          return;
        }
      }
    }

    // Check if player fell off bottom
    if (p.y > PlatformerQuest._height) {
      PlatformerQuest._state = 'gameover';
      PlatformerQuest._handleGameOver(false);
      return;
    }

    // Check level completion
    if (p.x >= levelLen - p.width) {
      PlatformerQuest._state = 'levelComplete';
      // Award level completion bonus
      PlatformerQuest._score += 500;
      PlatformerQuest._updateScoreDisplay();
      if (PlatformerQuest._levelIndex < PlatformerQuest._levels.length - 1) {
        PlatformerQuest._showOverlay(
          `Level ${PlatformerQuest._levelIndex + 1} Complete!`,
          'Press ENTER to Continue'
        );
      } else {
        // Last level complete, treat as game win
        PlatformerQuest._showOverlay(
          `All Levels Complete!`,
          'Press ENTER for Final Score'
        );
      }
      return;
    }

    // Update score display continually
    PlatformerQuest._updateScoreDisplay();
  }

  // ────────────────────────────────────────────────────────────────
  // Perform attack: simple rectangular hitbox in front of player
  static _performAttack() {
    const p = PlatformerQuest._player;
    const attackBox = {
      x: p.facing === 1 ? p.x + p.width : p.x - 24,
      y: p.y + 10,
      width: 24,
      height: p.height - 20
    };
    for (let enemy of PlatformerQuest._enemies) {
      if (!enemy.alive) continue;
      if (
        attackBox.x + attackBox.width > enemy.x &&
        attackBox.x < enemy.x + enemy.width &&
        attackBox.y + attackBox.height > enemy.y &&
        attackBox.y < enemy.y + enemy.height
      ) {
        // Enemy killed
        enemy.alive = false;
        PlatformerQuest._score += 100;
      }
    }
  }

  // ────────────────────────────────────────────────────────────────
  // Drawing the scene
  static _draw() {
    const ctx = PlatformerQuest._ctx;
    const p = PlatformerQuest._player;
    const camX = PlatformerQuest._cameraX;

    // Clear background (sky)
    ctx.fillStyle = '#87CEEB';
    ctx.fillRect(0, 0, PlatformerQuest._width, PlatformerQuest._height);

    // Draw background elements (e.g., simple hills) if desired
    // We keep it plain for now

    // Draw platforms
    for (let plat of PlatformerQuest._platforms) {
      const drawX = plat.x - camX;
      if (drawX + plat.width < 0 || drawX > PlatformerQuest._width) continue;
      ctx.fillStyle = '#654321';
      ctx.fillRect(drawX, plat.y, plat.width, plat.height);
      ctx.strokeStyle = '#000';
      ctx.strokeRect(drawX, plat.y, plat.width, plat.height);
    }

    // Draw enemies
    for (let enemy of PlatformerQuest._enemies) {
      if (!enemy.alive) continue;
      const drawX = enemy.x - camX;
      if (drawX + enemy.width < 0 || drawX > PlatformerQuest._width) continue;
      ctx.fillStyle = '#a22';
      ctx.fillRect(drawX, enemy.y, enemy.width, enemy.height);
      ctx.strokeStyle = '#000';
      ctx.strokeRect(drawX, enemy.y, enemy.width, enemy.height);
      // Simple "eyes"
      ctx.fillStyle = '#fff';
      ctx.fillRect(drawX + 6, enemy.y + 6, 6, 6);
      ctx.fillRect(drawX + 20, enemy.y + 6, 6, 6);
    }

    // Draw player
    const drawPlayerX = p.x - camX;
    ctx.save();
    // If dodging, render semi-transparent or different color
    if (p.isDodging) {
      ctx.globalAlpha = 0.6;
      ctx.fillStyle = '#22f';
    } else {
      ctx.globalAlpha = 1;
      ctx.fillStyle = p.color;
    }
    ctx.fillRect(drawPlayerX, p.y, p.width, p.height);
    ctx.strokeStyle = '#000';
    ctx.strokeRect(drawPlayerX, p.y, p.width, p.height);
    ctx.restore();

    // If attacking, draw attack box for feedback
    if (p.isAttacking) {
      const attackBoxX = p.facing === 1 ? drawPlayerX + p.width : drawPlayerX - 24;
      ctx.fillStyle = 'rgba(255, 255, 0, 0.6)';
      ctx.fillRect(attackBoxX, p.y + 10, 24, p.height - 20);
    }

    // Optionally, draw moving background elements or decorations
  }

  // ────────────────────────────────────────────────────────────────
  // UI updates
  static _updateScoreDisplay() {
    PlatformerQuest._scoreEl.textContent = `Score: ${PlatformerQuest._score}`;
  }
  static _updateLevelDisplay() {
    PlatformerQuest._levelEl.textContent = `Level: ${PlatformerQuest._levelIndex + 1}`;
  }
  static _updateHighScoreDisplay() {
    let best = 0;
    if (PlatformerQuest._highScores.length) {
      best = Math.max(...PlatformerQuest._highScores);
    }
    PlatformerQuest._highScoreEl.textContent = `High Score: ${best}`;
  }

  // ────────────────────────────────────────────────────────────────
  // Overlay control
  static _showOverlay(text, subtext = '') {
    PlatformerQuest._overlayText.textContent = text;
    PlatformerQuest._overlaySub.textContent = subtext;
    PlatformerQuest._overlay.style.display = 'flex';
  }

  // ────────────────────────────────────────────────────────────────
  // Game Over handling (win indicates all levels complete)
  static _handleGameOver(win) {
    PlatformerQuest._stop();

    // Add final score to high scores
    PlatformerQuest._highScores.push(PlatformerQuest._score);
    PlatformerQuest._highScores.sort((a, b) => b - a);
    PlatformerQuest._highScores = PlatformerQuest._highScores.slice(0, 5);
    try {
      localStorage.setItem(
        'platformerQuestHighScores',
        JSON.stringify(PlatformerQuest._highScores)
      );
    } catch {}
    PlatformerQuest._updateHighScoreDisplay();

    if (win) {
      PlatformerQuest._showOverlay(
        `Congratulations! You Completed All Levels!`,
        `Final Score: ${PlatformerQuest._score}\nHigh Scores:\n${PlatformerQuest._highScores
          .map((s, i) => `${i + 1}. ${s}`)
          .join('\n')}\n\nPress ENTER to Play Again`
      );
    } else {
      PlatformerQuest._showOverlay(
        `Game Over!`,
        `Score: ${PlatformerQuest._score}\nHigh Scores:\n${PlatformerQuest._highScores
          .map((s, i) => `${i + 1}. ${s}`)
          .join('\n')}\n\nPress ENTER to Restart`
      );
    }
  }
}

// Expose globally for WindowManager
window.PlatformerQuest = PlatformerQuest;
