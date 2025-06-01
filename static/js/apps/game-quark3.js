/**
 * Quark3Arena II (WebGL / Three.js Version)
 *
 * - Real 3D scene built with Three.js.
 * - Textured floor, walls, crates (enemies), and a simple “gun” sprite.
 * - First‐person controls: W/A/S/D for movement, mouse‐look via Pointer Lock.
 * - Left‐click shoots small bullets that collide with crates and destroy them.
 * - Main menu, pause overlay, HUD (Health & Ammo), and Game Over screen.
 * - You must supply these textures in a `textures/` folder alongside this file:
 *     • wall.png    (wall tile, e.g. 512×512)
 *     • floor.png   (floor tile, e.g. 512×512)
 *     • crate.png   (crate/box tile, e.g. 512×512)
 *     • crosshair.png (32×32 crosshair)
 *     • health.png  (28×28 health icon)
 *     • ammo.png    (28×28 ammo icon)
 *     • gun.png     (weapon sprite, e.g. 900×512)
 *
 * - Uses a minimal Three.js setup (no external PointerLockControls file).
 * - Bullets are small spheres that fly forward and “destroy” crates on impact.
 * - Ammo decreases on each shot. When ammo hits 0, Game Over triggers.
 *
 * (c) 2025 EmberFrame Team
 */

class Quark3 {
  static createWindow() {
    return {
      title: '🕹 Quark3Arena II',
      width: '900px',
      height: '650px',
      content: `
        <style>
          /* ================================================ */
          /* === Quark3Arena II — WebGL / Three.js Style === */
          /* ================================================ */

          #quark3-container {
            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden;
            background: #000;
          }
          canvas {
            display: block;
            width: 100%;
            height: 100%;
          }

          /* Main Menu */
          #quark3-menu {
            position: absolute; top: 0; left: 0;
            width: 100%; height: 100%;
            background: rgba(0,0,0,0.95);
            display: flex; flex-direction: column;
            align-items: center; justify-content: center;
            color: #fff; font-family: 'Orbitron', sans-serif;
            z-index: 10;
          }
          #quark3-menu h1 {
            font-size: 56px; margin-bottom: 20px;
            letter-spacing: 4px; color: #00ff88;
            text-shadow: 0 0 10px rgba(0,255,136,0.7),
                         0 0 20px rgba(0,255,136,0.5);
          }
          .quark3-button {
            margin: 12px; padding: 16px 32px;
            background: #111; border: 2px solid #00ff88;
            color: #fff; cursor: pointer; font-size: 24px;
            border-radius: 6px;
            transition: background 0.2s,
                        border-color 0.2s,
                        transform 0.2s;
          }
          .quark3-button:hover {
            background: #00ff88; border-color: #fff;
            color: #111; transform: scale(1.05);
            box-shadow: 0 0 15px rgba(0,255,136,0.8);
          }
          #quark3-options {
            margin-top: 30px; width: 420px; text-align: left;
          }
          .quark3-label {
            display: block; margin: 14px 0 6px 0;
            font-size: 18px; color: #fff;
          }
          .quark3-slider {
            width: 100%; -webkit-appearance: none; height: 6px;
            border-radius: 3px; background: #444; outline: none;
          }
          .quark3-slider::-webkit-slider-thumb {
            -webkit-appearance: none; width: 18px; height: 18px;
            border-radius: 50%; background: #00ff88; cursor: pointer;
            box-shadow: 0 0 8px rgba(0,255,136,0.8);
          }
          .quark3-select {
            width: 100%; padding: 8px; font-size: 18px;
            border-radius: 4px; background: #222; color: #fff;
            border: 2px solid #00ff88; appearance: none;
            cursor: pointer; outline: none;
          }

          /* Crosshair */
          #quark3-crosshair {
            position: absolute; top: 50%; left: 50%;
            width: 32px; height: 32px;
            margin-left: -16px; margin-top: -16px;
            z-index: 5; pointer-events: none;
            background: url('textures/crosshair.png') no-repeat center center;
            background-size: contain;
          }

          /* Pause Overlay */
          #quark3-pause {
            position: absolute; top: 0; left: 0;
            width: 100%; height: 100%;
            background: rgba(0,0,0,0.85);
            display: none; flex-direction: column;
            align-items: center; justify-content: center;
            color: #fff; font-family: 'Orbitron', sans-serif;
            z-index: 20;
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
            position: absolute; bottom: 20px; left: 20px;
            color: #fff; font-family: 'Orbitron', sans-serif;
            z-index: 5; text-shadow: 1px 1px 4px #000;
          }
          #quark3-hud .hud-group {
            display: flex; align-items: center; margin-bottom: 8px;
          }
          #quark3-hud img {
            width: 28px; height: 28px; margin-right: 8px;
          }
          #quark3-hud span {
            font-size: 20px;
          }

          /* Minimap */
          #quark3-minimap {
            position: absolute; top: 20px; right: 20px;
            width: 200px; height: 200px;
            background: rgba(0,0,0,0.6);
            border: 2px solid #00ff88;
            border-radius: 6px; z-index: 5;
          }

          /* Weapon Sprite (billboard) */
          #quark3-weapon {
            position: absolute; bottom: 0; left: 50%;
            width: 900px; height: 512px;
            margin-left: -450px; z-index: 4;
            pointer-events: none;
            background: url('textures/gun.png') no-repeat bottom center;
            background-size: 90%;
          }

          /* Game Over */
          #quark3-gameover {
            position: absolute; top: 0; left: 0;
            width: 100%; height: 100%;
            background: rgba(0,0,0,0.9);
            display: none; flex-direction: column;
            align-items: center; justify-content: center;
            color: #ff2222; font-family: 'Orbitron', sans-serif;
            z-index: 30;
          }
          #quark3-gameover h1 {
            font-size: 64px; margin-bottom: 20px;
            text-shadow: 0 0 15px rgba(255,34,34,0.8);
          }
          #quark3-gameover button {
            margin-top: 20px; padding: 12px 24px;
            font-size: 22px; background: #222;
            border: 2px solid #ff2222; color: #fff;
            border-radius: 6px; cursor: pointer;
            transition: background 0.2s, border-color 0.2s;
          }
          #quark3-gameover button:hover {
            background: #ff2222; border-color: #fff;
            color: #222; box-shadow: 0 0 15px rgba(255,34,34,0.7);
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

          <!-- ===== WebGL Canvas ===== -->
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
        // ====================
        // References & Canvas
        // ====================
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

        const miniCtx = miniCanvas.getContext('2d');

        // Resize canvases to container size
        let cw = canvas.width  = container.clientWidth;
        let ch = canvas.height = container.clientHeight;
        const miniSize = 200;
        miniCanvas.width  = miniSize;
        miniCanvas.height = miniSize;

        // ====================
        // Game State & Flags
        // ====================
        let isRunning  = false;
        let isPaused   = false;
        let isGameOver = false;

        // Player state
        let playerHealth = 10;
        let playerAmmo   = 30;

        // Movement & look
        const keys = {};
        document.addEventListener('keydown', (e) => {
          keys[e.code] = true;
          // ESC toggles pause if running
          if (e.code === 'Escape' && isRunning && !isGameOver) {
            isPaused = !isPaused;
            pauseOverlay.style.display = isPaused ? 'flex' : 'none';
            if (!isPaused) lastTime = performance.now(), animate();
          }
        });
        document.addEventListener('keyup', (e) => { keys[e.code] = false; });

        // ====================
        // Options (FOV, Sens)
        // ====================
        let fov = parseInt(fovSlider.value) * (Math.PI / 180);
        let sensitivity = parseFloat(sensSlider.value);
        let difficulty  = diffSelect.value;

        fovValue.textContent = fovSlider.value + '°';
        sensValue.textContent = sensSlider.value;
        diffSelect.querySelectorAll('option').forEach(opt => {
          if (opt.value === difficulty) opt.selected = true;
        });

        fovSlider.addEventListener('input', () => {
          fov = parseInt(fovSlider.value) * (Math.PI / 180);
          fovValue.textContent = fovSlider.value + '°';
          if (camera) camera.fov = (fovSlider.value), camera.updateProjectionMatrix();
        });
        sensSlider.addEventListener('input', () => {
          sensitivity = parseFloat(sensSlider.value);
          sensValue.textContent = sensSlider.value;
        });
        diffSelect.addEventListener('change', () => {
          difficulty = diffSelect.value;
        });

        // ====================
        // Pause & Menu Handlers
        // ====================
        startBtn.addEventListener('click', () => {
          // Only start once textures are loaded
          if (!threeReady) return;
          menu.style.display = 'none';
          isRunning = true;
          canvas.focus();
          lastTime = performance.now();
          animate();
        });
        resumeBtn.addEventListener('click', () => {
          isPaused = false;
          pauseOverlay.style.display = 'none';
          lastTime = performance.now();
          animate();
        });
        exitBtn.addEventListener('click', () => {
          isPaused = false;
          pauseOverlay.style.display = 'none';
          isRunning = false;
          menu.style.display = 'flex';
        });
        goMenuBtn.addEventListener('click', () => {
          gameover.style.display = 'none';
          isGameOver = false;
          menu.style.display = 'flex';
        });

        // ====================
        // Three.js Globals
        // ====================
        let scene, camera, renderer;
        let controlsEnabled = false;
        let velocity = new THREE.Vector3();
        let direction = new THREE.Vector3();
        const moveSpeed = 6.0; // units per second
        let prevTime = performance.now();
        let pointers = { x: 0, y: 0 };

        // Arrays to hold bullet objects and crates
        const bullets = [];
        const crates  = [];

        // Flag to know when Three.js is loaded
        let threeReady = false;

        // ====================
        // Dynamic Load of Three.js
        // ====================
        (function loadThree() {
          const script = document.createElement('script');
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
          script.onload = () => {
            // Once three.js is loaded, init the scene
            initThree();
          };
          script.onerror = () => {
            console.error('Failed to load Three.js from CDN');
          };
          document.head.appendChild(script);
        })();

        // ====================
        // Initialize Three.js Scene
        // ====================
        function initThree() {
          // 1. Create Scene & Camera
          scene = new THREE.Scene();
          scene.background = new THREE.Color(0x3366ff); // sky‐blue

          camera = new THREE.PerspectiveCamera(
            (fovSlider.value),        // fov in degrees
            cw / ch,                  // aspect
            0.1,                      // near
            1000                      // far
          );
          camera.position.set(0, 1.6, 0); // eye height at y=1.6

          // 2. Renderer
          renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
          renderer.setSize(cw, ch);
          renderer.shadowMap.enabled = true;
          renderer.shadowMap.type    = THREE.PCFSoftShadowMap;

          // 3. Lights
          const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
          hemiLight.position.set(0, 200, 0);
          scene.add(hemiLight);

          const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
          dirLight.position.set(5, 10, 5);
          dirLight.castShadow = true;
          dirLight.shadow.camera.top    = 10;
          dirLight.shadow.camera.bottom = -10;
          dirLight.shadow.camera.left   = -10;
          dirLight.shadow.camera.right  = 10;
          scene.add(dirLight);

          // 4. Floor
          const floorTex = new THREE.TextureLoader().load('textures/floor.png');
          floorTex.wrapS = floorTex.wrapT = THREE.RepeatWrapping;
          floorTex.repeat.set(10, 10);
          const floorMat = new THREE.MeshStandardMaterial({ map: floorTex });
          const floorGeo = new THREE.PlaneBufferGeometry(50, 50);
          const floor    = new THREE.Mesh(floorGeo, floorMat);
          floor.rotation.x = -Math.PI / 2;
          floor.receiveShadow = true;
          scene.add(floor);

          // 5. Walls (a simple box‐shaped room)
          const wallTex = new THREE.TextureLoader().load('textures/wall.png');
          wallTex.wrapS = wallTex.wrapT = THREE.RepeatWrapping;
          wallTex.repeat.set(5, 2);

          const wallMat = new THREE.MeshStandardMaterial({ map: wallTex });
          const wallGeo = new THREE.PlaneBufferGeometry(50, 5);

          // Back wall (positive z)
          const backWall = new THREE.Mesh(wallGeo, wallMat);
          backWall.position.set(0, 2.5, -25);
          backWall.receiveShadow = true;
          scene.add(backWall);

          // Front wall (negative z)
          const frontWall = new THREE.Mesh(wallGeo, wallMat);
          frontWall.position.set(0, 2.5, 25);
          frontWall.rotation.y = Math.PI;
          frontWall.receiveShadow = true;
          scene.add(frontWall);

          // Left wall (negative x)
          const leftWall = new THREE.Mesh(wallGeo, wallMat);
          leftWall.position.set(-25, 2.5, 0);
          leftWall.rotation.y = Math.PI / 2;
          leftWall.receiveShadow = true;
          scene.add(leftWall);

          // Right wall (positive x)
          const rightWall = new THREE.Mesh(wallGeo, wallMat);
          rightWall.position.set(25, 2.5, 0);
          rightWall.rotation.y = -Math.PI / 2;
          rightWall.receiveShadow = true;
          scene.add(rightWall);

          // 6. Crates (enemies) – several boxes scattered
          const crateTex = new THREE.TextureLoader().load('textures/crate.png');
          const crateMat = new THREE.MeshStandardMaterial({ map: crateTex });
          const crateGeo = new THREE.BoxBufferGeometry(2, 2, 2);

          const cratePositions = [
            { x:  5, z: -5 },
            { x: -5, z: -8 },
            { x:  8, z:  5 },
            { x: -10, z: 3 },
          ];
          cratePositions.forEach((pos) => {
            const crate = new THREE.Mesh(crateGeo, crateMat);
            crate.position.set(pos.x, 1, pos.z);
            crate.castShadow = true;
            crate.receiveShadow = true;
            scene.add(crate);
            crates.push(crate);
          });

          // 7. Simple “Gun” as a textured plane in front of camera
          const gunMap = new THREE.TextureLoader().load('textures/gun.png');
          const gunMat = new THREE.MeshBasicMaterial({ map: gunMap, transparent: true });
          const gunGeo = new THREE.PlaneGeometry(1.2, 0.7);
          const gunMesh = new THREE.Mesh(gunGeo, gunMat);
          gunMesh.position.set(0, -0.4, -1.2);
          camera.add(gunMesh);
          scene.add(camera); // add camera (and gun) to the scene

          // 8. Raycaster for shooting
          raycaster   = new THREE.Raycaster();
          const origin = new THREE.Vector3();
          const dir    = new THREE.Vector3();

          // 9. Pointer Lock (Mouse Look)
          canvas.requestPointerLock = canvas.requestPointerLock ||
                                      canvas.mozRequestPointerLock;
          document.exitPointerLock  = document.exitPointerLock  ||
                                      document.mozExitPointerLock;

          canvas.addEventListener('click', () => {
            canvas.requestPointerLock();
          });
          document.addEventListener('pointerlockchange', onPointerLockChange, false);
          document.addEventListener('mozpointerlockchange', onPointerLockChange, false);

          // 10. Window Resize Handling
          window.addEventListener('resize', () => {
            cw = container.clientWidth;
            ch = container.clientHeight;
            renderer.setSize(cw, ch);
            camera.aspect = cw / ch;
            camera.updateProjectionMatrix();
          });

          threeReady = true;
        }

        // ====================
        // Pointer Lock Change
        // ====================
        function onPointerLockChange() {
          if (document.pointerLockElement === canvas ||
              document.mozPointerLockElement === canvas) {
            controlsEnabled = true;
            document.addEventListener('mousemove', onMouseMove, false);
          } else {
            controlsEnabled = false;
            document.removeEventListener('mousemove', onMouseMove, false);
          }
        }

        // ====================
        // Mouse Move → Look
        // ====================
        let pitchObject = new THREE.Object3D();
        let yawObject   = new THREE.Object3D();
        yawObject.add(camera);
        pitchObject.add(yawObject);

        function onMouseMove(event) {
          if (!controlsEnabled) return;
          const movementX = event.movementX || 0;
          const movementY = event.movementY || 0;

          yawObject.rotation.y   -= movementX * 0.002 * sensitivity;
          pitchObject.rotation.x -= movementY * 0.002 * sensitivity;
          pitchObject.rotation.x = Math.max(-Math.PI/2, Math.min(Math.PI/2, pitchObject.rotation.x));
        }

        // ====================
        // Shooting Logic
        // ====================
        let raycaster;
        window.addEventListener('mousedown', (event) => {
          if (!isRunning || isPaused || isGameOver) return;
          if (event.button === 0) { // left click → shoot
            if (playerAmmo <= 0) return;
            playerAmmo--;
            spawnBullet();
            updateHUD();
            if (playerAmmo <= 0) {
              // Delay a bit then trigger Game Over
              setTimeout(() => {
                triggerGameOver();
              }, 1500);
            }
          }
        });

        function spawnBullet() {
          const bulletGeo = new THREE.SphereBufferGeometry(0.05, 8, 8);
          const bulletMat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
          const bullet    = new THREE.Mesh(bulletGeo, bulletMat);

          // Position at camera
          bullet.position.set(
            camera.position.x,
            camera.position.y - 0.1,
            camera.position.z
          );

          // Determine forward direction
          const forward = new THREE.Vector3(0, 0, -1);
          forward.applyQuaternion(camera.quaternion);
          forward.normalize();

          bullet.userData.velocity = forward.clone().multiplyScalar(40); // speed
          scene.add(bullet);
          bullets.push(bullet);
        }

        // ====================
        // Player Movement & Collision
        // ====================
        function updatePlayer(delta) {
          velocity.x -= velocity.x * 10.0 * delta;
          velocity.z -= velocity.z * 10.0 * delta;

          direction.z = Number(keys['KeyW']) - Number(keys['KeyS']);
          direction.x = Number(keys['KeyD']) - Number(keys['KeyA']);
          direction.normalize();

          if (keys['KeyW'] || keys['KeyS']) {
            velocity.z -= direction.z * moveSpeed * delta;
          }
          if (keys['KeyA'] || keys['KeyD']) {
            velocity.x -= direction.x * moveSpeed * delta;
          }

          // Move camera via yawObject and pitchObject
          yawObject.translateX(velocity.x * delta);
          yawObject.translateZ(velocity.z * delta);

          // Simple collision: keep us within the 25×25 room
          const px = yawObject.position.x, pz = yawObject.position.z;
          const limit = 24.5;
          if (px > limit) yawObject.position.x = limit;
          if (px < -limit) yawObject.position.x = -limit;
          if (pz > limit) yawObject.position.z = limit;
          if (pz < -limit) yawObject.position.z = -limit;
        }

        // ====================
        // Bullets Update
        // ====================
        function updateBullets(delta) {
          for (let i = bullets.length-1; i >= 0; i--) {
            const b = bullets[i];
            // Move bullet
            b.position.add(b.userData.velocity.clone().multiplyScalar(delta));

            // Check if bullet is out of range
            if (b.position.length() > 100) {
              scene.remove(b);
              bullets.splice(i,1);
              continue;
            }

            // Check collision with crates
            for (let j = crates.length-1; j >= 0; j--) {
              const crate = crates[j];
              const dist = crate.position.distanceTo(b.position);
              if (dist < 1.0) {
                // Remove crate & bullet
                scene.remove(crate);
                crates.splice(j,1);
                scene.remove(b);
                bullets.splice(i,1);
                break;
              }
            }
          }
        }

        // ====================
        // Minimap Rendering
        // ====================
        function drawMinimap() {
          miniCtx.fillStyle = '#000';
          miniCtx.fillRect(0,0,miniSize,miniSize);

          // Draw floor plan grid
          const scale = miniSize / 50; // since room is 50×50
          miniCtx.fillStyle = '#444';
          miniCtx.fillRect(0,0,miniSize,miniSize);

          // Draw walls
          miniCtx.fillStyle = '#888';
          // four border walls:
          miniCtx.fillRect(0,0,miniSize, scale*2);           // top
          miniCtx.fillRect(0, scale*48, miniSize, scale*2);   // bottom
          miniCtx.fillRect(0,0, scale*2, miniSize);           // left
          miniCtx.fillRect(scale*48, 0, scale*2, miniSize);   // right

          // Draw crates on minimap
          crates.forEach((crate) => {
            miniCtx.fillStyle = '#ff8800';
            miniCtx.fillRect(
              (crate.position.x+25)*scale - 5,
              (crate.position.z+25)*scale - 5,
              10, 10
            );
          });

          // Draw player
          miniCtx.fillStyle = '#00ff00';
          const px = (yawObject.position.x + 25)*scale;
          const pz = (yawObject.position.z + 25)*scale;
          miniCtx.beginPath();
          miniCtx.arc(px, pz, 6, 0, Math.PI*2);
          miniCtx.fill();

          // Draw player direction line
          miniCtx.strokeStyle = '#00ff00';
          miniCtx.beginPath();
          miniCtx.moveTo(px, pz);
          const forward = new THREE.Vector3(0,0,-1).applyQuaternion(camera.quaternion);
          miniCtx.lineTo(
            px + forward.x * 15,
            pz + forward.z * 15
          );
          miniCtx.stroke();
        }

        // ====================
        // HUD Update
        // ====================
        function updateHUD() {
          hudHealth.textContent = playerHealth;
          hudAmmo.textContent   = playerAmmo;
        }

        // ====================
        // Trigger Game Over
        // ====================
        function triggerGameOver() {
          isGameOver = true;
          isRunning  = false;
          gameover.style.display = 'flex';
        }

        // ====================
        // Render Loop
        // ====================
        let lastTime = performance.now();
        function animate() {
          if (!isRunning || isPaused || isGameOver) return;
          const now = performance.now();
          const delta = (now - lastTime) / 1000; // in seconds
          lastTime = now;

          updatePlayer(delta);
          updateBullets(delta);
          drawMinimap();
          updateHUD();

          renderer.render(scene, camera);
          requestAnimationFrame(animate);
        }

        console.log('✅ Quark3Arena II (WebGL) initialized');
      }
    };
  }
}

// Register Quark3 with WindowManager
window.EmberFrame.registerApp('game-quark3', Quark3);
