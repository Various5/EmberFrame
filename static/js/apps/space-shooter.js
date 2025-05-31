// static/js/apps/space-shooter.js

class SpaceShooter {
  // Internal state
  static _container = null;
  static _canvas = null;
  static _ctx = null;
  static _width = 800;
  static _height = 500;
  static _stars = [];
  static _numStars = 100;
  static _player = null;
  static _playerBullets = [];
  static _enemies = [];
  static _enemyBullets = [];
  static _asteroids = [];
  static _keys = {};
  static _score = 0;
  static _highScores = [];
  static _gameSpeed = 1;        // scales everything (star speed, enemy speed, spawn rates)
  static _spawnTimer = 0;
  static _spawnInterval = 2000; // milliseconds, decreases over time
  static _lastTime = 0;
  static _running = false;
  static _animationId = null;
  static _state = 'start';       // 'start', 'playing', 'paused', 'gameover'

  static createWindow() {
    return {
      title: 'Space Shooter',
      width: '820px',
      height: '580px',
      // Full container is 100% of window; game canvas is 800×500px centered
      content: `
        <div id="space-shooter" style="position: relative; width:100%; height:100%; background:#000; overflow:hidden; font-family: sans-serif;">
          <!-- Canvas area -->
          <canvas id="ss-canvas" width="800" height="500"
                  style="display:block; background:#111; margin:10px auto; border:2px solid #444;"></canvas>
          <!-- UI bar -->
          <div id="ss-ui" style="width:800px; margin:0 auto; display:flex; justify-content: space-between; color:#fff; 
                                 font-size:16px; background:rgba(0,0,0,0.8); padding:4px 8px; border:2px solid #444;">
            <div id="ss-score">Score: 0</div>
            <div id="ss-highscore">High Score: 0</div>
          </div>
          <!-- Overlay for start / pause / game over -->
          <div id="ss-overlay" style="
                position:absolute; top:0; left:50%; transform:translateX(-50%);
                width:800px; height:500px; display:flex; flex-direction:column;
                justify-content:center; align-items:center; color:#fff;
                font-size:24px; background:rgba(0,0,0,0.8); z-index:10;">
            <div id="ss-overlay-text">Press ENTER to Start</div>
            <div id="ss-overlay-sub" style="font-size:16px; margin-top:12px;">Use ↑/↓/←/→ or W/A/S/D to move, SPACE to shoot</div>
          </div>
        </div>
      `,
      onInit: (container) => {
        // Store container and elements
        SpaceShooter._container = container;
        SpaceShooter._canvas = container.querySelector('#ss-canvas');
        SpaceShooter._ctx = SpaceShooter._canvas.getContext('2d');

        // Load high scores from localStorage
        const stored = localStorage.getItem('spaceShooterHighScores');
        if (stored) {
          try {
            SpaceShooter._highScores = JSON.parse(stored);
          } catch {
            SpaceShooter._highScores = [];
          }
        }

        // Initialize stars, player, etc.
        SpaceShooter._initStars();
        SpaceShooter._initPlayer();
        SpaceShooter._bindKeys();

        // Show high score on UI bar
        SpaceShooter._updateHighScoreDisplay();

        // Listen for ENTER to start
        container.addEventListener('keydown', SpaceShooter._handleStartEnter);

        // Ensure the canvas (and its parent) can receive keyboard focus
        container.tabIndex = 0;
        container.focus();
      },
      onDestroy: () => {
        // Clean up: stop animation, remove listeners
        SpaceShooter._stop();
        SpaceShooter._unbindKeys();
      }
    };
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // Initialization helpers
  static _initStars() {
    SpaceShooter._stars = [];
    for (let i = 0; i < SpaceShooter._numStars; i++) {
      SpaceShooter._stars.push({
        x: Math.random() * SpaceShooter._width,
        y: Math.random() * SpaceShooter._height,
        size: Math.random() * 2 + 1,
        speed: (Math.random() * 0.5 + 0.5) * SpaceShooter._gameSpeed
      });
    }
  }

  static _initPlayer() {
    // Player is a triangle; start at left-center
    SpaceShooter._player = {
      x: 50,
      y: SpaceShooter._height / 2,
      width: 20,
      height: 20,
      speed: 200, // pixels per second
      color: '#0f0',
      cooldown: 0 // time until next shot allowed
    };
  }

  static _initEnemies() {
    SpaceShooter._enemies = [];
  }

  static _initAsteroids() {
    SpaceShooter._asteroids = [];
  }

  static _bindKeys() {
    // Use container’s keydown/keyup so that multiple windows don’t conflict
    const c = SpaceShooter._container;
    c.addEventListener('keydown', SpaceShooter._onKeyDown);
    c.addEventListener('keyup', SpaceShooter._onKeyUp);
  }

  static _unbindKeys() {
    const c = SpaceShooter._container;
    c.removeEventListener('keydown', SpaceShooter._onKeyDown);
    c.removeEventListener('keyup', SpaceShooter._onKeyUp);
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // Key handlers

  static _onKeyDown(e) {
    SpaceShooter._keys[e.code] = true;

    // If in playing state and SPACE, prevent default to avoid page scroll
    if (SpaceShooter._state === 'playing' && e.code === 'Space') {
      e.preventDefault();
    }
    // If pressed P, toggle pause
    if (SpaceShooter._state === 'playing' && e.code === 'KeyP') {
      SpaceShooter._togglePause();
    }
  }

  static _onKeyUp(e) {
    SpaceShooter._keys[e.code] = false;
  }

  static _handleStartEnter(e) {
    if (e.code === 'Enter') {
      e.preventDefault();
      if (SpaceShooter._state === 'start') {
        SpaceShooter._start();
      } else if (SpaceShooter._state === 'gameover') {
        // Restart game
        SpaceShooter._resetGame();
        SpaceShooter._start();
      }
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // Game control

  static _start() {
    SpaceShooter._state = 'playing';
    SpaceShooter._score = 0;
    SpaceShooter._gameSpeed = 1;
    SpaceShooter._spawnInterval = 2000;
    SpaceShooter._spawnTimer = 0;
    SpaceShooter._player.x = 50;
    SpaceShooter._player.y = SpaceShooter._height / 2;
    SpaceShooter._player.cooldown = 0;
    SpaceShooter._playerBullets = [];
    SpaceShooter._enemies = [];
    SpaceShooter._enemyBullets = [];
    SpaceShooter._asteroids = [];
    SpaceShooter._initStars();
    SpaceShooter._updateScoreDisplay();

    // Hide overlay
    const overlay = SpaceShooter._container.querySelector('#ss-overlay');
    overlay.style.display = 'none';

    // Start loop
    SpaceShooter._lastTime = performance.now();
    SpaceShooter._running = true;
    SpaceShooter._loop(SpaceShooter._lastTime);
  }

  static _stop() {
    SpaceShooter._running = false;
    if (SpaceShooter._animationId) {
      cancelAnimationFrame(SpaceShooter._animationId);
      SpaceShooter._animationId = null;
    }
  }

  static _resetGame() {
    // Show start text
    const overlayText = SpaceShooter._container.querySelector('#ss-overlay-text');
    overlayText.textContent = 'Press ENTER to Start';
    const overlaySub = SpaceShooter._container.querySelector('#ss-overlay-sub');
    overlaySub.textContent = 'Use ↑/↓/←/→ or W/A/S/D to move, SPACE to shoot';
    const overlay = SpaceShooter._container.querySelector('#ss-overlay');
    overlay.style.display = 'flex';
    SpaceShooter._state = 'start';
  }

  static _togglePause() {
    if (SpaceShooter._state !== 'playing') return;
    SpaceShooter._state = 'paused';
    // Show pause overlay
    const overlay = SpaceShooter._container.querySelector('#ss-overlay');
    const overlayText = SpaceShooter._container.querySelector('#ss-overlay-text');
    overlayText.textContent = 'Paused';
    const overlaySub = SpaceShooter._container.querySelector('#ss-overlay-sub');
    overlaySub.textContent = 'Press P to Resume';
    overlay.style.display = 'flex';
    SpaceShooter._stop();
  }

  static _resume() {
    if (SpaceShooter._state !== 'paused') return;
    SpaceShooter._state = 'playing';
    // Hide overlay
    const overlay = SpaceShooter._container.querySelector('#ss-overlay');
    overlay.style.display = 'none';
    // Continue loop
    SpaceShooter._lastTime = performance.now();
    SpaceShooter._running = true;
    SpaceShooter._loop(SpaceShooter._lastTime);
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // Main loop

  static _loop(timestamp) {
    if (!SpaceShooter._running) return;

    const delta = timestamp - SpaceShooter._lastTime;
    SpaceShooter._lastTime = timestamp;

    SpaceShooter._update(delta);
    SpaceShooter._draw();

    SpaceShooter._animationId = requestAnimationFrame(SpaceShooter._loop.bind(SpaceShooter));
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // Update game state by delta (ms)

  static _update(delta) {
    const dt = delta / 1000; // in seconds

    // If paused, do nothing
    if (SpaceShooter._state !== 'playing') {
      // Check if P pressed to resume
      if (SpaceShooter._keys['KeyP']) {
        SpaceShooter._keys['KeyP'] = false;
        SpaceShooter._resume();
      }
      return;
    }

    // 1) Update starfield
    for (let star of SpaceShooter._stars) {
      star.x -= star.speed * dt * 50 * SpaceShooter._gameSpeed;
      if (star.x < 0) {
        star.x = SpaceShooter._width;
        star.y = Math.random() * SpaceShooter._height;
        star.size = Math.random() * 2 + 1;
        star.speed = (Math.random() * 0.5 + 0.5) * SpaceShooter._gameSpeed;
      }
    }

    // 2) Update player movement
    const p = SpaceShooter._player;
    let mvX = 0, mvY = 0;
    if (SpaceShooter._keys['ArrowUp'] || SpaceShooter._keys['KeyW'])    mvY = -1;
    if (SpaceShooter._keys['ArrowDown'] || SpaceShooter._keys['KeyS'])  mvY =  1;
    if (SpaceShooter._keys['ArrowLeft'] || SpaceShooter._keys['KeyA'])  mvX = -1;
    if (SpaceShooter._keys['ArrowRight'] || SpaceShooter._keys['KeyD']) mvX =  1;
    const norm = Math.hypot(mvX, mvY) || 1;
    p.x += (mvX / norm) * p.speed * dt;
    p.y += (mvY / norm) * p.speed * dt;

    // Boundaries
    p.x = Math.max(0, Math.min(p.x, SpaceShooter._width - p.width));
    p.y = Math.max(0, Math.min(p.y, SpaceShooter._height - p.height));

    // 3) Player shooting (cooldown ~0.3s)
    p.cooldown -= delta;
    if ((SpaceShooter._keys['Space'] || SpaceShooter._keys['KeyK']) && p.cooldown <= 0) {
      SpaceShooter._playerBullets.push({
        x: p.x + p.width,
        y: p.y + p.height / 2 - 3,
        width: 6,
        height: 6,
        speed: 400 * SpaceShooter._gameSpeed,
        color: '#ff0'
      });
      p.cooldown = 300; // ms
    }

    // 4) Update player bullets
    for (let i = SpaceShooter._playerBullets.length - 1; i >= 0; i--) {
      const b = SpaceShooter._playerBullets[i];
      b.x += b.speed * dt;
      if (b.x > SpaceShooter._width) {
        SpaceShooter._playerBullets.splice(i, 1);
      }
    }

    // 5) Spawn enemies & asteroids
    SpaceShooter._spawnTimer += delta;
    if (SpaceShooter._spawnTimer >= SpaceShooter._spawnInterval) {
      SpaceShooter._spawnTimer = 0;
      SpaceShooter._spawnEnemyOrAsteroid();
      // Gradually increase speed and spawn rate
      SpaceShooter._gameSpeed += 0.01;
      SpaceShooter._spawnInterval = Math.max(500, 2000 - (SpaceShooter._score * 5));
    }

    // 6) Update enemies
    for (let i = SpaceShooter._enemies.length - 1; i >= 0; i--) {
      const e = SpaceShooter._enemies[i];
      e.x -= e.speed * dt * SpaceShooter._gameSpeed;
      // Occasionally fire a bullet toward the player
      e.fireTimer -= delta;
      if (e.fireTimer <= 0) {
        e.fireTimer = 2000; // next shot in 2s
        SpaceShooter._enemyBullets.push({
          x: e.x,
          y: e.y + e.size / 2 - 3,
          width: 6,
          height: 6,
          speed: 300 * SpaceShooter._gameSpeed,
          color: '#f00'
        });
      }
      // Remove if off-screen
      if (e.x + e.size < 0) {
        SpaceShooter._enemies.splice(i, 1);
      }
    }

    // 7) Update enemy bullets
    for (let i = SpaceShooter._enemyBullets.length - 1; i >= 0; i--) {
      const eb = SpaceShooter._enemyBullets[i];
      eb.x -= eb.speed * dt;
      if (eb.x + eb.width < 0) {
        SpaceShooter._enemyBullets.splice(i, 1);
      }
    }

    // 8) Update asteroids
    for (let i = SpaceShooter._asteroids.length - 1; i >= 0; i--) {
      const a = SpaceShooter._asteroids[i];
      a.x -= a.speed * dt * SpaceShooter._gameSpeed;
      if (a.x + a.size < 0) {
        SpaceShooter._asteroids.splice(i, 1);
      }
    }

    // 9) Collision detection
    SpaceShooter._checkCollisions();

    // 10) Update score & UI
    SpaceShooter._updateScoreDisplay();

    // If game over, stop and show overlay
    if (SpaceShooter._state === 'gameover') {
      SpaceShooter._handleGameOver();
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // Spawning

  static _spawnEnemyOrAsteroid() {
    const choice = Math.random();
    if (choice < 0.6) {
      // Spawn enemy ship
      const size = 30;
      SpaceShooter._enemies.push({
        x: SpaceShooter._width + size,
        y: Math.random() * (SpaceShooter._height - size),
        size: size,
        speed: 100 + Math.random() * 50, // base speed
        color: '#f0f',
        fireTimer: 1000 + Math.random() * 1000 // first shot in 1-2s
      });
    } else {
      // Spawn asteroid
      const size = 20 + Math.random() * 30;
      SpaceShooter._asteroids.push({
        x: SpaceShooter._width + size,
        y: Math.random() * (SpaceShooter._height - size),
        size: size,
        speed: 80 + Math.random() * 40,
        color: '#888'
      });
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // Collision detection

  static _rectsIntersect(r1, r2) {
    return !(
      r2.x > r1.x + r1.width ||
      r2.x + r2.width < r1.x ||
      r2.y > r1.y + r1.height ||
      r2.y + r2.height < r1.y
    );
  }

  static _circleRectIntersect(cx, cy, radius, rx, ry, rw, rh) {
    // find closest point to circle center
    const closestX = Math.max(rx, Math.min(cx, rx + rw));
    const closestY = Math.max(ry, Math.min(cy, ry + rh));
    const dx = cx - closestX;
    const dy = cy - closestY;
    return (dx * dx + dy * dy) < (radius * radius);
  }

  static _checkCollisions() {
    const p = SpaceShooter._player;

    // 1) Player bullets vs enemies
    for (let i = SpaceShooter._playerBullets.length - 1; i >= 0; i--) {
      const b = SpaceShooter._playerBullets[i];
      for (let j = SpaceShooter._enemies.length - 1; j >= 0; j--) {
        const e = SpaceShooter._enemies[j];
        // treat both as rectangles
        if (SpaceShooter._rectsIntersect(
              { x: b.x, y: b.y, width: b.width, height: b.height },
              { x: e.x, y: e.y, width: e.size, height: e.size }
            )) {
          // Destroy enemy & bullet
          SpaceShooter._playerBullets.splice(i, 1);
          SpaceShooter._enemies.splice(j, 1);
          SpaceShooter._score += 10;
          break;
        }
      }
    }

    // 2) Player bullets vs asteroids
    for (let i = SpaceShooter._playerBullets.length - 1; i >= 0; i--) {
      const b = SpaceShooter._playerBullets[i];
      for (let j = SpaceShooter._asteroids.length - 1; j >= 0; j--) {
        const a = SpaceShooter._asteroids[j];
        // treat bullet as rect, asteroid as square
        if (SpaceShooter._rectsIntersect(
              { x: b.x, y: b.y, width: b.width, height: b.height },
              { x: a.x, y: a.y, width: a.size, height: a.size }
            )) {
          // Only bullet destroyed; asteroid remains (or you can break it into smaller ones)
          SpaceShooter._playerBullets.splice(i, 1);
          SpaceShooter._score += 5;
          break;
        }
      }
    }

    // 3) Enemy bullets vs player
    for (let i = SpaceShooter._enemyBullets.length - 1; i >= 0; i--) {
      const eb = SpaceShooter._enemyBullets[i];
      if (SpaceShooter._rectsIntersect(
            { x: eb.x, y: eb.y, width: eb.width, height: eb.height },
            { x: p.x,  y: p.y,  width: p.width, height: p.height }
          )) {
        // Player hit
        SpaceShooter._state = 'gameover';
        return;
      }
    }

    // 4) Asteroids vs player (circle-style collision)
    for (let a of SpaceShooter._asteroids) {
      const cx = a.x + a.size / 2;
      const cy = a.y + a.size / 2;
      const radius = a.size / 2;
      if (SpaceShooter._circleRectIntersect(
            cx, cy, radius,
            p.x, p.y, p.width, p.height
          )) {
        SpaceShooter._state = 'gameover';
        return;
      }
    }

    // 5) Enemies vs player (rect collision)
    for (let e of SpaceShooter._enemies) {
      if (SpaceShooter._rectsIntersect(
            { x: e.x, y: e.y, width: e.size, height: e.size },
            { x: p.x, y: p.y, width: p.width, height: p.height }
          )) {
        SpaceShooter._state = 'gameover';
        return;
      }
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // Draw everything

  static _draw() {
    const ctx = SpaceShooter._ctx;
    // Clear
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, SpaceShooter._width, SpaceShooter._height);

    // 1) Draw stars
    for (let star of SpaceShooter._stars) {
      ctx.fillStyle = '#fff';
      ctx.fillRect(star.x, star.y, star.size, star.size);
    }

    // 2) Draw player (triangle)
    const p = SpaceShooter._player;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.moveTo(p.x, p.y + p.height / 2);
    ctx.lineTo(p.x + p.width, p.y + p.height);
    ctx.lineTo(p.x + p.width, p.y);
    ctx.closePath();
    ctx.fill();

    // 3) Draw player bullets
    for (let b of SpaceShooter._playerBullets) {
      ctx.fillStyle = b.color;
      ctx.fillRect(b.x, b.y, b.width, b.height);
    }

    // 4) Draw enemies
    for (let e of SpaceShooter._enemies) {
      ctx.fillStyle = e.color;
      ctx.fillRect(e.x, e.y, e.size, e.size);
      // Engine glow (simple colored rectangle)
      ctx.fillStyle = '#f80';
      ctx.fillRect(e.x + e.size - 5, e.y + e.size / 3, 5, e.size / 3);
    }

    // 5) Draw enemy bullets
    for (let eb of SpaceShooter._enemyBullets) {
      ctx.fillStyle = eb.color;
      ctx.fillRect(eb.x, eb.y, eb.width, eb.height);
    }

    // 6) Draw asteroids (circles)
    for (let a of SpaceShooter._asteroids) {
      const cx = a.x + a.size / 2;
      const cy = a.y + a.size / 2;
      const r = a.size / 2;
      const grad = ctx.createRadialGradient(cx, cy, r * 0.2, cx, cy, r);
      grad.addColorStop(0, '#aaa');
      grad.addColorStop(1, '#555');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // Update UI elements

  static _updateScoreDisplay() {
    const scoreEl = SpaceShooter._container.querySelector('#ss-score');
    scoreEl.textContent = `Score: ${SpaceShooter._score}`;
  }

  static _updateHighScoreDisplay() {
    let best = 0;
    if (SpaceShooter._highScores.length) {
      best = Math.max(...SpaceShooter._highScores);
    }
    const hsEl = SpaceShooter._container.querySelector('#ss-highscore');
    hsEl.textContent = `High Score: ${best}`;
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // Handle game over: stop loop, show overlay, update high scores

  static _handleGameOver() {
    SpaceShooter._stop();

    // Update high scores array
    SpaceShooter._highScores.push(SpaceShooter._score);
    SpaceShooter._highScores.sort((a, b) => b - a);
    SpaceShooter._highScores = SpaceShooter._highScores.slice(0, 5);
    try {
      localStorage.setItem('spaceShooterHighScores', JSON.stringify(SpaceShooter._highScores));
    } catch {}

    // Show overlay with final score and high-score table
    const overlay = SpaceShooter._container.querySelector('#ss-overlay');
    overlay.style.display = 'flex';
    const overlayText = SpaceShooter._container.querySelector('#ss-overlay-text');
    overlayText.textContent = `Game Over! Score: ${SpaceShooter._score}`;

    // Build high-score list
    const sub = SpaceShooter._container.querySelector('#ss-overlay-sub');
    let lines = ['High Scores:'];
    for (let i = 0; i < SpaceShooter._highScores.length; i++) {
      lines.push(`${i + 1}. ${SpaceShooter._highScores[i]}`);
    }
    lines.push('');
    lines.push('Press ENTER to Play Again');
    sub.innerHTML = lines.join('<br>');
    SpaceShooter._updateHighScoreDisplay();
  }
}

// Expose globally so WindowManager can find it:
window.SpaceShooter = SpaceShooter;
