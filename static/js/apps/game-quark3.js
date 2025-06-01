/**
 * Quark3Arena II (Raycasting Version)
 *
 * - Uses a 2D “map” array of 10×10 tiles (1 = wall, 0 = empty).
 * - Performs DDA‐based raycasting each frame to draw a 3D view.
 * - Shows a minimap in the top‐right.
 * - Includes Start menu, Pause overlay, HUD (Health & Ammo), and Game Over.
 * - FOV and mouse sensitivity are adjustable in the Options.
 * - Requires a `textures/wall.png` file for wall texturing.
 */

class Quark3 {
  static createWindow() {
    return {
      title: '🕹 Quark3Arena II',
      width: '900px',
      height: '650px',
      content: `
        <style>
          /* === Quark3 CSS === */

          /* Container & Canvas */
          #quark3-container { position: relative; width: 100%; height: 100%; background: #000; overflow: hidden; }
          canvas { display: block; width: 100%; height: 100%; outline: none; }

          /* Main Menu */
          #quark3-menu {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.95); display: flex; flex-direction: column;
            align-items: center; justify-content: center; color: #fff;
            font-family: 'Orbitron', sans-serif; z-index: 10;
          }
          #quark3-menu h1 {
            font-size: 56px; margin-bottom: 20px; letter-spacing: 4px; color: #00ff88;
            text-shadow: 0 0 10px rgba(0,255,136,0.7), 0 0 20px rgba(0,255,136,0.5);
          }
          .quark3-button {
            margin: 12px; padding: 16px 32px; background: #111; border: 2px solid #00ff88;
            color: #fff; cursor: pointer; font-size: 24px; border-radius: 6px;
            transition: background 0.2s, border-color 0.2s, transform 0.2s;
          }
          .quark3-button:hover {
            background: #00ff88; border-color: #ffffff; color: #111; transform: scale(1.05);
            box-shadow: 0 0 15px rgba(0,255,136,0.8);
          }
          #quark3-options {
            margin-top: 30px; width: 420px; text-align: left;
          }
          .quark3-label {
            display: block; margin: 14px 0 6px 0; font-size: 18px; color: #fff;
          }
          .quark3-slider {
            width: 100%; -webkit-appearance: none; height: 6px; border-radius: 3px;
            background: #444; outline: none;
          }
          .quark3-slider::-webkit-slider-thumb {
            -webkit-appearance: none; width: 18px; height: 18px; border-radius: 50%;
            background: #00ff88; cursor: pointer; box-shadow: 0 0 8px rgba(0,255,136,0.8);
          }
          .quark3-select {
            width: 100%; padding: 8px; font-size: 18px; border-radius: 4px;
            background: #222; color: #fff; border: 2px solid #00ff88;
            appearance: none; cursor: pointer; outline: none;
          }

          /* Crosshair */
          #quark3-crosshair {
            position: absolute; top: 50%; left: 50%; width: 32px; height: 32px;
            margin-left: -16px; margin-top: -16px; z-index: 5;
            pointer-events: none; background: url('textures/crosshair.png') no-repeat center center;
            background-size: contain;
          }

          /* Pause Overlay */
          #quark3-pause {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.85); display: none; flex-direction: column;
            align-items: center; justify-content: center; color: #fff;
            font-family: 'Orbitron', sans-serif; z-index: 20;
          }
          #quark3-pause h2 {
            font-size: 44px; margin-bottom: 20px; color: #ff5555;
            text-shadow: 0 0 10px rgba(255,85,85,0.7);
          }
          #quark3-pause .quark3-button {
            font-size: 20px; padding: 12px 28px;
          }

          /* HUD */
          #quark3-hud {
            position: absolute; bottom: 20px; left: 20px; color: #fff;
            font-family: 'Orbitron', sans-serif; z-index: 5; text-shadow: 1px 1px 4px #000;
          }
          #quark3-hud .hud-group { display: flex; align-items: center; margin-bottom: 8px; }
          #quark3-hud img { width: 28px; height: 28px; margin-right: 8px; }
          #quark3-hud span { font-size: 20px; }

          /* Minimap */
          #quark3-minimap {
            position: absolute; top: 20px; right: 20px; width: 200px; height: 200px;
            background: rgba(0,0,0,0.6); border: 2px solid #00ff88; border-radius: 6px;
            z-index: 5;
          }

          /* Weapon */
          #quark3-weapon {
            position: absolute; bottom: 0; left: 50%; width: 900px; height: 512px;
            margin-left: -450px; z-index: 4; pointer-events: none;
            background: url('textures/gun.png') no-repeat bottom center; background-size: 90%;
          }

          /* Game Over */
          #quark3-gameover {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.9); display: none; flex-direction: column;
            align-items: center; justify-content: center; color: #ff2222;
            font-family: 'Orbitron', sans-serif; z-index: 30;
          }
          #quark3-gameover h1 {
            font-size: 64px; margin-bottom: 20px;
            text-shadow: 0 0 15px rgba(255,34,34,0.8);
          }
          #quark3-gameover button {
            margin-top: 20px; padding: 12px 24px; font-size: 22px;
            background: #222; border: 2px solid #ff2222; color: #fff;
            border-radius: 6px; cursor: pointer;
            transition: background 0.2s, border-color 0.2s;
          }
          #quark3-gameover button:hover {
            background: #ff2222; border-color: #fff; color: #222;
            box-shadow: 0 0 15px rgba(255,34,34,0.7);
          }
        </style>

        <div id="quark3-container">
          <!-- ===== Main Menu ===== -->
          <div id="quark3-menu">
            <h1>Quark3Arena II</h1>
            <button id="quark3-start" class="quark3-button">Start Game</button>
            <div id="quark3-options">
              <label class="quark3-label">Field of View: <span id="fov-value">75°</span></label>
              <input type="range" id="quark3-fov" class="quark3-slider" min="60" max="110" value="75">
              <label class="quark3-label">Mouse Sensitivity: <span id="sens-value">1.2</span></label>
              <input type="range" id="quark3-sens" class="quark3-slider" min="0.3" max="4" step="0.1" value="1.2">
              <label class="quark3-label">Difficulty: <span id="diff-value">Normal</span></label>
              <select id="quark3-difficulty" class="quark3-select">
                <option value="easy">Easy</option>
                <option value="normal" selected>Normal</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>

          <!-- ===== Game Canvas ===== -->
          <canvas id="quark3-canvas" tabindex="0"></canvas>

          <!-- ===== Crosshair ===== -->
          <div id="quark3-crosshair"></div>

          <!-- ===== Pause Overlay ===== -->
          <div id="quark3-pause">
            <h2>Paused</h2>
            <button id="quark3-resume" class="quark3-button">Resume</button>
            <button id="quark3-exit" class="quark3-button">Exit to Menu</button>
          </div>

          <!-- ===== Game Over ===== -->
          <div id="quark3-gameover">
            <h1>Game Over</h1>
            <button id="quark3-go-menu">Return to Menu</button>
          </div>

          <!-- ===== HUD ===== -->
          <div id="quark3-hud">
            <div class="hud-group">
              <img src="textures/health.png" alt="Health Icon">
              <span id="hud-health">10</span>
            </div>
            <div class="hud-group">
              <img src="textures/ammo.png" alt="Ammo Icon">
              <span id="hud-ammo">30</span>
            </div>
          </div>

          <!-- ===== Minimap ===== -->
          <canvas id="quark3-minimap"></canvas>

          <!-- ===== Weapon Sprite ===== -->
          <div id="quark3-weapon"></div>
        </div>
      `,
      onInit: (container) => {
        // ===== Element References =====
        const canvas       = container.querySelector('#quark3-canvas');
        const miniCanvas   = container.querySelector('#quark3-minimap');
        const menu         = container.querySelector('#quark3-menu');
        const startBtn     = container.querySelector('#quark3-start');
        const pauseOverlay = container.querySelector('#quark3-pause');
        const resumeBtn    = container.querySelector('#quark3-resume');
        const exitBtn      = container.querySelector('#quark3-exit');
        const gameover     = container.querySelector('#quark3-gameover');
        const goMenuBtn    = container.querySelector('#quark3-go-menu');
        const hudHealth    = container.querySelector('#hud-health');
        const hudAmmo      = container.querySelector('#hud-ammo');
        const fovSlider    = container.querySelector('#quark3-fov');
        const fovValue     = container.querySelector('#fov-value');
        const sensSlider   = container.querySelector('#quark3-sens');
        const sensValue    = container.querySelector('#sens-value');
        const diffSelect   = container.querySelector('#quark3-difficulty');

        // ===== 2D Contexts =====
        const ctx     = canvas.getContext('2d');
        const miniCtx = miniCanvas.getContext('2d');

        // ===== Canvas & Minimap Size =====
        let width  = canvas.width  = container.clientWidth;
        let height = canvas.height = container.clientHeight;
        const miniSize = 200;
        miniCanvas.width  = miniSize;
        miniCanvas.height = miniSize;

        // ===== Game State Flags =====
        let isRunning  = false;
        let isPaused   = false;
        let isGameOver = false;

        // ===== Player State =====
        let px  = 3.5, py = 3.5; // Player position (center of tile)
        let pa  = 0;            // Player angle (radians)
        let pdx = Math.cos(pa), pdy = Math.sin(pa);

        // Movement/Rotation deltas
        let pdMove = 0, pdRot = 0;

        // ===== Options =====
        let fov         = parseInt(fovSlider.value) * Math.PI / 180; // Field of view (radians)
        let sensitivity = parseFloat(sensSlider.value);
        let difficulty  = diffSelect.value;
        let player      = { health: 10, ammo: 30 };

        // ===== Simple 10×10 Map =====
        // 1 = Wall, 0 = Empty
        const map = [
          [1,1,1,1,1,1,1,1,1,1],
          [1,0,0,0,0,0,0,0,0,1],
          [1,0,1,0,1,0,1,0,0,1],
          [1,0,1,0,1,0,1,0,0,1],
          [1,0,0,0,0,0,0,0,0,1],
          [1,0,1,1,1,1,1,1,0,1],
          [1,0,0,0,0,0,0,0,0,1],
          [1,0,1,0,1,0,1,0,0,1],
          [1,0,0,0,0,0,0,0,0,1],
          [1,1,1,1,1,1,1,1,1,1],
        ];
        const mapWidth  = map[0].length;
        const mapHeight = map.length;
        const tileSize  = 64; // each cell is 64×64 units

        // ===== Load Wall Texture =====
        const wallTex = new Image();
        let texReady   = false;
        wallTex.src    = 'textures/wall.png';
        wallTex.onload = () => { texReady = true; };
        wallTex.onerror = () => {
          console.warn('Failed to load textures/wall.png');
          texReady = true; // proceed anyway with solid‐color walls
        };

        // ===== Input Handling =====
        const keys = {};
        document.addEventListener('keydown', (e) => {
          keys[e.code] = true;

          // Toggle Pause on ESC
          if (e.code === 'Escape' && isRunning && !isGameOver) {
            isPaused = !isPaused;
            pauseOverlay.style.display = isPaused ? 'flex' : 'none';
            if (!isPaused) requestAnimationFrame(gameLoop);
          }
        });
        document.addEventListener('keyup', (e) => {
          keys[e.code] = false;
        });

        // ===== Mouse Look (Pointer Lock) =====
        canvas.addEventListener('click', () => {
          canvas.requestPointerLock();
        });
        document.addEventListener('pointerlockchange', () => {
          if (document.pointerLockElement === canvas) {
            document.addEventListener('mousemove', onMouseMove);
          } else {
            document.removeEventListener('mousemove', onMouseMove);
          }
        });
        function onMouseMove(e) {
          const moveX = e.movementX || 0;
          pa += moveX * 0.002 * sensitivity;
          pdx = Math.cos(pa);
          pdy = Math.sin(pa);
        }

        // ===== Raycasting & Rendering =====
        function castRays() {
          // Each vertical column = one ray
          for (let col = 0; col < width; col++) {
            // Calculate current ray angle
            const rayScreenPos = (col / width - 0.5) * fov;
            const ra = pa + rayScreenPos;

            // Ray direction
            const sinRA = Math.sin(ra);
            const cosRA = Math.cos(ra);

            // DDA initialization
            let mapX  = Math.floor(px);
            let mapY  = Math.floor(py);
            let side  = 0; // 0 = hit vertical wall, 1 = hit horizontal wall
            let dist  = 0;
            let stepX, stepY;
            let sideDistX, sideDistY;
            const deltaDistX = Math.abs(1 / cosRA);
            const deltaDistY = Math.abs(1 / sinRA);

            // Calculate step and initial sideDist
            if (cosRA < 0) {
              stepX    = -1;
              sideDistX = (px - mapX) * deltaDistX;
            } else {
              stepX    = 1;
              sideDistX = (mapX + 1.0 - px) * deltaDistX;
            }
            if (sinRA < 0) {
              stepY    = -1;
              sideDistY = (py - mapY) * deltaDistY;
            } else {
              stepY    = 1;
              sideDistY = (mapY + 1.0 - py) * deltaDistY;
            }

            // Perform DDA
            while (true) {
              if (sideDistX < sideDistY) {
                sideDistX += deltaDistX;
                mapX += stepX;
                side = 0;
              } else {
                sideDistY += deltaDistY;
                mapY += stepY;
                side = 1;
              }
              // If ray is out of bounds, break
              if (mapX < 0 || mapX >= mapWidth || mapY < 0 || mapY >= mapHeight) {
                dist = 1e6;
                break;
              }
              // Check if ray hit a wall
              if (map[mapY][mapX] > 0) {
                if (side === 0) {
                  dist = (mapX - px + (1 - stepX) / 2) / cosRA;
                } else {
                  dist = (mapY - py + (1 - stepY) / 2) / sinRA;
                }
                break;
              }
            }

            // Remove fish-eye effect
            const fixDist = dist * Math.cos(rayScreenPos);

            // Calculate line height on screen
            const lineHeight = fixDist > 0
              ? Math.floor((tileSize / fixDist) * (width / 2))
              : height;

            // Vertical drawing boundaries
            const drawStart = Math.max(0, Math.floor((height - lineHeight) / 2));
            const drawEnd   = Math.min(height, drawStart + lineHeight);

            // Texture X coordinate
            let wallX;
            if (side === 0) {
              wallX = py + dist * sinRA;
            } else {
              wallX = px + dist * cosRA;
            }
            wallX -= Math.floor(wallX);
            let texX = Math.floor(wallX * tileSize);
            if ((side === 0 && cosRA > 0) || (side === 1 && sinRA < 0)) {
              texX = tileSize - texX - 1;
            }

            // Draw textured wall slice (1 pixel wide)
            if (wallTex && texReady) {
              ctx.drawImage(
                wallTex,
                texX, 0, 1, tileSize,    // source slice
                col, drawStart, 1, lineHeight
              );
            } else {
              // Fallback solid color if texture fails
              ctx.fillStyle = side === 1 ? '#888' : '#aaa';
              ctx.fillRect(col, drawStart, 1, lineHeight);
            }
          }
        }

        function drawScene() {
          // Draw ceiling
          ctx.fillStyle = '#333';
          ctx.fillRect(0, 0, width, height / 2);
          // Draw floor
          ctx.fillStyle = '#666';
          ctx.fillRect(0, height / 2, width, height / 2);
          // Cast and draw walls
          castRays();
        }

        // ===== Minimap Rendering =====
        function drawMinimap() {
          miniCtx.fillStyle = '#000';
          miniCtx.fillRect(0, 0, miniSize, miniSize);
          // Draw map grid
          for (let y = 0; y < mapHeight; y++) {
            for (let x = 0; x < mapWidth; x++) {
              if (map[y][x] > 0) {
                miniCtx.fillStyle = '#888';
                miniCtx.fillRect(
                  x * (miniSize / mapWidth),
                  y * (miniSize / mapHeight),
                  (miniSize / mapWidth),
                  (miniSize / mapHeight)
                );
              }
            }
          }
          // Draw player on minimap
          miniCtx.fillStyle = '#f00';
          miniCtx.beginPath();
          miniCtx.arc(
            px * (miniSize / mapWidth),
            py * (miniSize / mapHeight),
            5, 0, Math.PI * 2
          );
          miniCtx.fill();
          // Draw player direction line
          miniCtx.strokeStyle = '#0f0';
          miniCtx.beginPath();
          miniCtx.moveTo(
            px * (miniSize / mapWidth),
            py * (miniSize / mapHeight)
          );
          miniCtx.lineTo(
            (px + pdx * 0.5) * (miniSize / mapWidth),
            (py + pdy * 0.5) * (miniSize / mapHeight)
          );
          miniCtx.stroke();
        }

        // ===== Player Movement & Collision =====
        function updatePlayer() {
          const moveSpeed = 2.0 / 60.0; // adjust as desired
          // Forward / Backward
          if (keys['KeyW']) {
            const nx = px + pdx * moveSpeed;
            const ny = py + pdy * moveSpeed;
            if (map[Math.floor(ny)][Math.floor(nx)] === 0) {
              px = nx; py = ny;
            }
          }
          if (keys['KeyS']) {
            const nx = px - pdx * moveSpeed;
            const ny = py - pdy * moveSpeed;
            if (map[Math.floor(ny)][Math.floor(nx)] === 0) {
              px = nx; py = ny;
            }
          }
          // Strafe Left / Right
          if (keys['KeyA']) {
            const nx = px + pdy * moveSpeed;
            const ny = py - pdx * moveSpeed;
            if (map[Math.floor(ny)][Math.floor(nx)] === 0) {
              px = nx; py = ny;
            }
          }
          if (keys['KeyD']) {
            const nx = px - pdy * moveSpeed;
            const ny = py + pdx * moveSpeed;
            if (map[Math.floor(ny)][Math.floor(nx)] === 0) {
              px = nx; py = ny;
            }
          }
          // Turn Left / Right with arrow keys
          if (keys['ArrowLeft']) {
            pa -= 0.04 * sensitivity;
            pdx = Math.cos(pa);
            pdy = Math.sin(pa);
          }
          if (keys['ArrowRight']) {
            pa += 0.04 * sensitivity;
            pdx = Math.cos(pa);
            pdy = Math.sin(pa);
          }
        }

        // ===== HUD Update =====
        function updateHUD() {
          hudHealth.textContent = player.health;
          hudAmmo.textContent   = player.ammo;
        }

        // ===== Main Game Loop =====
        function gameLoop() {
          if (!isRunning || isPaused || isGameOver) return;
          updatePlayer();
          drawScene();
          drawMinimap();
          updateHUD();
          requestAnimationFrame(gameLoop);
        }

        // ===== Start Button Handler =====
        startBtn.addEventListener('click', () => {
          // Wait for texture to load
          if (!texReady) return;
          menu.style.display = 'none';
          isRunning = true;
          canvas.focus();
          requestAnimationFrame(gameLoop);
        });

        // ===== Pause Overlay Buttons =====
        resumeBtn.addEventListener('click', () => {
          isPaused = false;
          pauseOverlay.style.display = 'none';
          requestAnimationFrame(gameLoop);
        });
        exitBtn.addEventListener('click', () => {
          isPaused = false;
          pauseOverlay.style.display = 'none';
          isRunning = false;
          menu.style.display = 'flex';
        });

        // ===== Game Over (Example: run out of ammo) =====
        function triggerGameOver() {
          isGameOver = true;
          isRunning  = false;
          gameover.style.display = 'flex';
        }
        // In this demo, if ammo ≤ 0, we trigger Game Over (you can change as needed)
        const ammoWatcher = setInterval(() => {
          if (isRunning && player.ammo <= 0) {
            clearInterval(ammoWatcher);
            triggerGameOver();
          }
        }, 100);

        goMenuBtn.addEventListener('click', () => {
          gameover.style.display = 'none';
          isGameOver = false;
          menu.style.display = 'flex';
        });

        // ===== Options Adjustments =====
        fovSlider.addEventListener('input', () => {
          fov = parseInt(fovSlider.value) * Math.PI / 180;
          fovValue.textContent = fovSlider.value + '°';
        });
        sensSlider.addEventListener('input', () => {
          sensitivity = parseFloat(sensSlider.value);
          sensValue.textContent = sensSlider.value;
        });
        diffSelect.addEventListener('change', () => {
          difficulty = diffSelect.value;
        });

        // ===== Handle Window Resize =====
        window.addEventListener('resize', () => {
          width = container.clientWidth;
          height = container.clientHeight;
          canvas.width  = width;
          canvas.height = height;
          miniCanvas.width  = miniSize;
          miniCanvas.height = miniSize;
        });

        console.log('✅ Quark3Arena II (raycasting) initialized');
      }
    };
  }
}

// Register Quark3 with WindowManager
window.EmberFrame.registerApp('game-quark3', Quark3);
