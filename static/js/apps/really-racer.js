/**
 * APP_METADATA
 * @name Really Racer
 * @icon fas fa-gamepad
 * @description Racing Game
 * @category Games
 * @version 1.6.2
 * @author EmberFrame Team
 * @enabled true
 */

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.152.0/build/three.module.js';

class ReallyRacer {
  // ────────────────────────────────────────────────────────────────
  // Static properties for game state
  static _container = null;
  static scene = null;
  static camera = null;
  static renderer = null;
  static clock = new THREE.Clock();
  static deltaTime = 0;

  // Car variables
  static car = null;
  static carBody = null;
  static wheelFL = null;
  static wheelFR = null;
  static wheelRL = null;
  static wheelRR = null;
  static velocity = new THREE.Vector3();
  static carSpeed = 0;
  static maxSpeed = 120;   // Top speed units
  static accelRate = 40;   // Speed units per second
  static brakeRate = 80;   // Speed units per second
  static handling = 2.5;   // Degrees per input per second
  static friction = 20;    // Speed decay units per second
  static turnFriction = 5; // Additional decay when steering

  // Controls
  static keys = {
    ArrowUp: false, ArrowDown: false,
    ArrowLeft: false, ArrowRight: false,
    KeyW: false, KeyS: false,
    KeyA: false, KeyD: false
  };

  // Road & environment
  static roadMesh = null;
  static skidCanvas = null;
  static skidContext = null;
  static skidTexture = null;

  // Obstacles
  static obstacles = [];
  static obstacleCount = 40;  // Reduced for performance

  // Particle systems
  static dustParticles = null;
  static dustPositions = null;
  static dustStartTimes = null;
  static sparkParticles = null;
  static sparkPositions = null;
  static sparkStartTimes = null;

  // UI sliders
  static speedSlider = null;
  static accelSlider = null;
  static handlingSlider = null;

  // ────────────────────────────────────────────────────────────────
  // Called by EmberFrame (or user) to create the app window
  static createWindow() {
    return {
      title: 'Really Racer v1.6.2',
      width: '100%',
      height: '100%',
      content: this._createHTML(),
      onInit: () => {
        this._initGame();
      },
      onDestroy: () => {
        this._cleanup();
      },
      onClose: () => true,
      onMinimize: () => {},
      onRestore: () => {}
    };
  }

  // ────────────────────────────────────────────────────────────────
  // Build the HTML container for the game
  static _createHTML() {
    return `
      <div id="rr-container" style="width:100%; height:100%; position:relative; background:#222;">
        <div id="rr-ui" style="position:absolute; top:10px; left:10px; z-index:10;"></div>
      </div>
    `;
  }

  // ────────────────────────────────────────────────────────────────
  // Initialize scene, camera, renderer, and all game elements
  static _initGame() {
    // Get container
    this._container = document.getElementById('rr-container');

    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x87ceeb); // sky blue

    // Camera
    this.camera = new THREE.PerspectiveCamera(
      60,
      this._container.clientWidth / this._container.clientHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 5, 15);
    this.camera.lookAt(new THREE.Vector3(0, 1, 0));

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this._container.clientWidth, this._container.clientHeight);
    this._container.appendChild(this.renderer.domElement);
    window.addEventListener('resize', () => this._onWindowResize());

    // Lighting & Ground
    this._createLights();
    this._createGround();

    // Road & Skidmarks
    this._createRoad();

    // Car
    this._createCar();

    // Obstacles
    this._createObstacles();

    // Particles
    this._createParticles();

    // UI
    this._createUI();

    // Controls
    this._addEventListeners();

    // Start animation loop
    this._animate();
  }

  // ────────────────────────────────────────────────────────────────
  // Add ambient and directional lighting
  static _createLights() {
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
    hemiLight.position.set(0, 50, 0);
    this.scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(-5, 10, 5);
    this.scene.add(dirLight);
  }

  // ────────────────────────────────────────────────────────────────
  // Create a simple ground plane
  static _createGround() {
    const groundMat = new THREE.MeshPhongMaterial({ color: 0x228b22 });
    const groundGeo = new THREE.PlaneGeometry(500, 500);
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = 0;
    this.scene.add(ground);
  }

  // ────────────────────────────────────────────────────────────────
  // Build the road mesh with subtle S-curves, and overlay a canvas texture for skidmarks
  static _createRoad() {
    const ROAD_LENGTH = 1000;
    const ROAD_WIDTH = 10;

    // Road geometry with fewer segments for performance
    const roadGeo = new THREE.PlaneGeometry(ROAD_WIDTH, ROAD_LENGTH, 1, 500);
    const posAttr = roadGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const z = posAttr.getY(i);
      const xOffset = Math.sin((z / ROAD_LENGTH) * Math.PI * 2) * 2;
      posAttr.setX(i, xOffset);
    }
    posAttr.needsUpdate = true;

    const roadMat = new THREE.MeshPhongMaterial({ color: 0x333333 });
    this.roadMesh = new THREE.Mesh(roadGeo, roadMat);
    this.roadMesh.rotation.x = -Math.PI / 2;
    this.roadMesh.position.z = -ROAD_LENGTH / 2 + 50;
    this.scene.add(this.roadMesh);

    // Skidmarks: HTML canvas as texture
    this.skidCanvas = document.createElement('canvas');
    this.skidCanvas.width = 2048;
    this.skidCanvas.height = 8192;
    this.skidContext = this.skidCanvas.getContext('2d');
    this.skidContext.fillStyle = 'rgba(0,0,0,0)';
    this.skidContext.fillRect(0, 0, this.skidCanvas.width, this.skidCanvas.height);

    this.skidTexture = new THREE.CanvasTexture(this.skidCanvas);
    this.skidTexture.wrapS = this.skidTexture.wrapT = THREE.ClampToEdgeWrapping;
    this.skidTexture.flipY = false;

    const skidMat = new THREE.MeshBasicMaterial({
      map: this.skidTexture,
      transparent: true
    });
    const skidGeo = new THREE.PlaneGeometry(ROAD_WIDTH, ROAD_LENGTH);
    const skidMesh = new THREE.Mesh(skidGeo, skidMat);
    skidMesh.rotation.x = -Math.PI / 2;
    skidMesh.position.z = -ROAD_LENGTH / 2 + 50 + 0.01;
    this.scene.add(skidMesh);
  }

  // ────────────────────────────────────────────────────────────────
  // Create a simple rally car: a box for the body and four cylinders for wheels
  static _createCar() {
    this.car = new THREE.Group();

    // Body
    const bodyGeo = new THREE.BoxGeometry(2, 0.8, 4);
    const bodyMat = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    this.carBody = new THREE.Mesh(bodyGeo, bodyMat);
    this.carBody.position.y = 1;
    this.car.add(this.carBody);

    // Wheels
    const wheelGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.4, 16);
    const wheelMat = new THREE.MeshPhongMaterial({ color: 0x111111 });

    this.wheelFL = new THREE.Mesh(wheelGeo, wheelMat);
    this.wheelFL.rotation.z = Math.PI / 2;
    this.wheelFL.position.set(-0.9, 0.4, 1.3);
    this.car.add(this.wheelFL);

    this.wheelFR = this.wheelFL.clone();
    this.wheelFR.position.set(0.9, 0.4, 1.3);
    this.car.add(this.wheelFR);

    this.wheelRL = this.wheelFL.clone();
    this.wheelRL.position.set(-0.9, 0.4, -1.3);
    this.car.add(this.wheelRL);

    this.wheelRR = this.wheelFL.clone();
    this.wheelRR.position.set(0.9, 0.4, -1.3);
    this.car.add(this.wheelRR);

    // Position car at start
    this.car.position.set(0, 0, 10);
    this.scene.add(this.car);
  }

  // ────────────────────────────────────────────────────────────────
  // Scatter paper-cone obstacles along the roadside
  static _createObstacles() {
    const obstacleGeo = new THREE.ConeGeometry(0.5, 1.5, 8);
    const obstacleMat = new THREE.MeshPhongMaterial({ color: 0x8b4513 });

    for (let i = 0; i < this.obstacleCount; i++) {
      const obs = new THREE.Mesh(obstacleGeo, obstacleMat);
      const zPos = -(Math.random() * 400 + 20);
      const lateral = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 4 + 6);
      obs.position.set(lateral, 0.75, zPos);
      obs.rotation.x = Math.PI;
      this.scene.add(obs);
      this.obstacles.push(obs);
    }
  }

  // ────────────────────────────────────────────────────────────────
  // Initialize dust & spark particle systems using BufferGeometry/Points
  static _createParticles() {
    // Dust
    const dustCount = 200;
    this.dustPositions = new Float32Array(dustCount * 3);
    this.dustStartTimes = new Float32Array(dustCount);
    for (let i = 0; i < dustCount; i++) {
      this.dustPositions[3 * i + 0] = 0;
      this.dustPositions[3 * i + 1] = -10; // off-screen initially
      this.dustPositions[3 * i + 2] = 0;
      this.dustStartTimes[i] = -1;
    }
    const dustGeom = new THREE.BufferGeometry();
    dustGeom.setAttribute('position', new THREE.BufferAttribute(this.dustPositions, 3));
    dustGeom.setAttribute('startTime', new THREE.BufferAttribute(this.dustStartTimes, 1));

    const dustTexture = new THREE.TextureLoader().load(
      'https://threejsfundamentals.org/threejs/resources/images/sprites/spark1.png'
    );
    const dustMat = new THREE.PointsMaterial({
      size: 0.5,
      map: dustTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: new THREE.Color(0xaaaaaa)
    });
    this.dustParticles = new THREE.Points(dustGeom, dustMat);
    this.scene.add(this.dustParticles);

    // Sparks
    const sparkCount = 100;
    this.sparkPositions = new Float32Array(sparkCount * 3);
    this.sparkStartTimes = new Float32Array(sparkCount);
    for (let i = 0; i < sparkCount; i++) {
      this.sparkPositions[3 * i + 0] = 0;
      this.sparkPositions[3 * i + 1] = -10;
      this.sparkPositions[3 * i + 2] = 0;
      this.sparkStartTimes[i] = -1;
    }
    const sparkGeom = new THREE.BufferGeometry();
    sparkGeom.setAttribute('position', new THREE.BufferAttribute(this.sparkPositions, 3));
    sparkGeom.setAttribute('startTime', new THREE.BufferAttribute(this.sparkStartTimes, 1));

    const sparkTexture = new THREE.TextureLoader().load(
      'https://threejsfundamentals.org/threejs/resources/images/sprites/explosion.png'
    );
    const sparkMat = new THREE.PointsMaterial({
      size: 0.8,
      map: sparkTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: new THREE.Color(0xffaa33)
    });
    this.sparkParticles = new THREE.Points(sparkGeom, sparkMat);
    this.scene.add(this.sparkParticles);
  }

  // ────────────────────────────────────────────────────────────────
  // Build the tuning UI sliders (speed, acceleration, handling)
  static _createUI() {
    const uiContainer = document.getElementById('rr-ui');

    const title = document.createElement('div');
    title.innerHTML = '<b>Rally Car Tuning</b>';
    title.style.marginBottom = '8px';
    uiContainer.appendChild(title);

    // Top Speed
    this._addSlider(uiContainer, 'Top Speed', 60, 200, this.maxSpeed, (v) => (this.maxSpeed = v));

    // Acceleration
    this._addSlider(uiContainer, 'Acceleration', 10, 80, this.accelRate, (v) => (this.accelRate = v));

    // Handling
    this._addSlider(uiContainer, 'Handling', 1, 10, this.handling, (v) => (this.handling = v));
  }

  // ────────────────────────────────────────────────────────────────
  // Utility to add a labeled slider to UI
  static _addSlider(container, labelText, min, max, initial, onChange) {
    const wrapper = document.createElement('div');
    wrapper.style.marginBottom = '6px';

    const label = document.createElement('label');
    label.textContent = `${labelText}: `;
    wrapper.appendChild(label);

    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = min;
    slider.max = max;
    slider.step = (max - min) / 100;
    slider.value = initial;
    slider.style.margin = '0 8px';
    wrapper.appendChild(slider);

    const display = document.createElement('span');
    display.textContent = ` ${initial.toFixed(labelText === 'Handling' ? 1 : 0)}`;
    wrapper.appendChild(display);

    slider.addEventListener('input', () => {
      const v = parseFloat(slider.value);
      onChange(v);
      display.textContent = ` ${
        labelText === 'Handling' ? v.toFixed(1) : Math.round(v)
      }`;
    });

    container.appendChild(wrapper);
  }

  // ────────────────────────────────────────────────────────────────
  // Add keyboard event listeners
  static _addEventListeners() {
    window.addEventListener('keydown', this._onKeyDown);
    window.addEventListener('keyup', this._onKeyUp);
  }

  // ────────────────────────────────────────────────────────────────
  // Handle window resizing
  static _onWindowResize() {
    if (!this.camera || !this.renderer || !this._container) return;
    this.camera.aspect = this._container.clientWidth / this._container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this._container.clientWidth, this._container.clientHeight);
  }

  // ────────────────────────────────────────────────────────────────
  // Handle keydown for controls
  static _onKeyDown(event) {
    if (ReallyRacer.keys.hasOwnProperty(event.code)) {
      ReallyRacer.keys[event.code] = true;
    }
  }

  // ────────────────────────────────────────────────────────────────
  // Handle keyup for controls
  static _onKeyUp(event) {
    if (ReallyRacer.keys.hasOwnProperty(event.code)) {
      ReallyRacer.keys[event.code] = false;
    }
  }

  // ────────────────────────────────────────────────────────────────
  // Main animation loop
  static _animate() {
    requestAnimationFrame(() => this._animate());
    this.deltaTime = this.clock.getDelta();

    this._updateCarPhysics(this.deltaTime);
    this._updateCamera();
    this._updateSkidTexture();
    this._updateParticles(this.deltaTime);

    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  // ────────────────────────────────────────────────────────────────
  // Update car physics: acceleration, braking, steering, friction, collisions
  static _updateCarPhysics(dt) {
    let accInput = 0;
    if (this.keys.ArrowUp || this.keys.KeyW) accInput = 1;
    if (this.keys.ArrowDown || this.keys.KeyS) accInput = -1;

    let steerInput = 0;
    if (this.keys.ArrowLeft || this.keys.KeyA) steerInput = 1;
    if (this.keys.ArrowRight || this.keys.KeyD) steerInput = -1;

    // Accelerate / brake
    if (accInput > 0) {
      this.carSpeed += this.accelRate * dt;
      this._spawnDust();
    } else if (accInput < 0) {
      this.carSpeed -= this.brakeRate * dt;
      this._spawnSpark();
    } else {
      // Friction when no input
      const decel = this.friction * dt + Math.abs(steerInput) * this.turnFriction * dt;
      if (this.carSpeed > decel) this.carSpeed -= decel;
      else if (this.carSpeed < -decel) this.carSpeed += decel;
      else this.carSpeed = 0;
    }

    // Clamp speed
    this.carSpeed = THREE.MathUtils.clamp(this.carSpeed, -this.maxSpeed / 2, this.maxSpeed);

    // Steering (only if moving)
    if (Math.abs(this.carSpeed) > 0.5 && steerInput !== 0) {
      const turnAngle =
        THREE.MathUtils.degToRad(
          this.handling * steerInput * dt * (this.carSpeed / this.maxSpeed)
        );
      this.car.rotation.y += turnAngle;
      if (Math.abs(steerInput) > 0.5 && Math.abs(this.carSpeed) > this.maxSpeed * 0.3) {
        this._drawSkidmark();
      }
    }

    // Update position
    const forwardVec = new THREE.Vector3(0, 0, -1)
      .applyQuaternion(this.car.quaternion)
      .normalize();
    this.velocity.copy(forwardVec).multiplyScalar(this.carSpeed * 0.02 * dt);
    this.car.position.add(this.velocity);
    this.car.position.y = 1; // keep above ground

    // Rotate wheels
    const wheelTurning = this.carSpeed * dt * 0.1;
    [this.wheelFL, this.wheelFR, this.wheelRL, this.wheelRR].forEach((w) => {
      w.rotation.x += wheelTurning;
    });

    // Collisions with obstacles
    this.obstacles.forEach((obs) => {
      if (obs.position.distanceTo(this.car.position) < 1.5) {
        this._handleCollision(obs);
      }
    });
  }

  // ────────────────────────────────────────────────────────────────
  // Smoothly follow the car with the camera
  static _updateCamera() {
    const desiredPos = this.car.position
      .clone()
      .add(new THREE.Vector3(0, 5, 15).applyQuaternion(this.car.quaternion));
    this.camera.position.lerp(desiredPos, 0.1);
    this.camera.lookAt(this.car.position.clone().add(new THREE.Vector3(0, 1, 0)));
  }

  // ────────────────────────────────────────────────────────────────
  // Mark the skid canvas texture as needing update
  static _updateSkidTexture() {
    if (this.skidTexture) this.skidTexture.needsUpdate = true;
  }

  // ────────────────────────────────────────────────────────────────
  // Draw a skid circle at the car’s current position on the skid canvas
  static _drawSkidmark() {
    const ROAD_LENGTH = 1000;
    const ROAD_WIDTH = 10;
    const ROAD_START_Z = -ROAD_LENGTH / 2 + 50;
    const localX = this.car.position.x;
    const localZ = this.car.position.z - ROAD_START_Z;
    if (localZ < 0 || localZ > ROAD_LENGTH) return;

    const uvx = (localX + ROAD_WIDTH / 2) / ROAD_WIDTH;
    const uvy = 1 - localZ / ROAD_LENGTH;
    const px = uvx * this.skidCanvas.width;
    const py = uvy * this.skidCanvas.height;

    this.skidContext.fillStyle = 'rgba(20,20,20,0.5)';
    this.skidContext.beginPath();
    this.skidContext.arc(px, py, 4, 0, Math.PI * 2);
    this.skidContext.fill();
    this.skidTexture.needsUpdate = true;
  }

  // ────────────────────────────────────────────────────────────────
  // Handle collision: spawn explosion and bounce the car back
  static _handleCollision(obs) {
    this._createExplosion(obs.position);
    this.carSpeed *= -0.5;
    // Respawn obstacle further down road
    const zPos = -(Math.random() * 400 + 20);
    const lateral = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 4 + 6);
    obs.position.set(lateral, 0.75, zPos);
  }

  // ────────────────────────────────────────────────────────────────
  // Create a small explosion using spark particles
  static _createExplosion(position) {
    const now = this.clock.elapsedTime;
    let spawned = 0;
    for (let i = 0; i < this.sparkStartTimes.length; i++) {
      if (this.sparkStartTimes[i] < 0) {
        this.sparkPositions[3 * i + 0] = position.x + (Math.random() - 0.5) * 2;
        this.sparkPositions[3 * i + 1] = position.y + (Math.random() - 0.5) * 2;
        this.sparkPositions[3 * i + 2] = position.z + (Math.random() - 0.5) * 2;
        this.sparkStartTimes[i] = now;
        spawned++;
        if (spawned > 30) break;
      }
    }
    this.sparkParticles.geometry.attributes.position.needsUpdate = true;
    this.sparkParticles.geometry.attributes.startTime.needsUpdate = true;
  }

  // ────────────────────────────────────────────────────────────────
  // Spawn dust particles behind the car when accelerating
  static _spawnDust() {
    const now = this.clock.elapsedTime;
    for (let i = 0; i < this.dustStartTimes.length; i++) {
      if (this.dustStartTimes[i] < 0) {
        const rearOffset = new THREE.Vector3(0, 0.5, 2)
          .applyQuaternion(this.car.quaternion)
          .negate();
        this.dustPositions[3 * i + 0] =
          this.car.position.x + rearOffset.x + (Math.random() - 0.5) * 0.4;
        this.dustPositions[3 * i + 1] = 0.5 + Math.random() * 0.3;
        this.dustPositions[3 * i + 2] =
          this.car.position.z + rearOffset.z + (Math.random() - 0.5) * 0.4;
        this.dustStartTimes[i] = now;
        if (i > 12) break;
      }
    }
    this.dustParticles.geometry.attributes.position.needsUpdate = true;
    this.dustParticles.geometry.attributes.startTime.needsUpdate = true;
  }

  // ────────────────────────────────────────────────────────────────
  // Spawn spark particles when braking
  static _spawnSpark() {
    const now = this.clock.elapsedTime;
    for (let i = 0; i < this.sparkStartTimes.length; i++) {
      if (this.sparkStartTimes[i] < 0) {
        this.sparkPositions[3 * i + 0] =
          this.car.position.x + (Math.random() - 0.5) * 0.8;
        this.sparkPositions[3 * i + 1] = 0.5;
        this.sparkPositions[3 * i + 2] =
          this.car.position.z + (Math.random() - 0.5) * 0.8;
        this.sparkStartTimes[i] = now;
        if (i > 8) break;
      }
    }
    this.sparkParticles.geometry.attributes.position.needsUpdate = true;
    this.sparkParticles.geometry.attributes.startTime.needsUpdate = true;
  }

  // ────────────────────────────────────────────────────────────────
  // Update particle lifetimes and positions each frame
  static _updateParticles(dt) {
    const now = this.clock.elapsedTime;

    // Dust: rise and fade
    for (let i = 0; i < this.dustStartTimes.length; i++) {
      const t0 = this.dustStartTimes[i];
      if (t0 >= 0) {
        const age = now - t0;
        if (age > 1.5) {
          this.dustStartTimes[i] = -1;
          this.dustPositions[3 * i + 1] = -10;
        } else {
          this.dustPositions[3 * i + 1] += dt * 0.5;
        }
      }
    }
    this.dustParticles.geometry.attributes.position.needsUpdate = true;
    this.dustParticles.geometry.attributes.startTime.needsUpdate = true;

    // Sparks: fall and fade
    for (let i = 0; i < this.sparkStartTimes.length; i++) {
      const t0 = this.sparkStartTimes[i];
      if (t0 >= 0) {
        const age = now - t0;
        if (age > 1) {
          this.sparkStartTimes[i] = -1;
          this.sparkPositions[3 * i + 1] = -10;
        } else {
          this.sparkPositions[3 * i + 1] -= dt * 2;
        }
      }
    }
    this.sparkParticles.geometry.attributes.position.needsUpdate = true;
    this.sparkParticles.geometry.attributes.startTime.needsUpdate = true;
  }

  // ────────────────────────────────────────────────────────────────
  // Cleanup when window is destroyed: remove event listeners
  static _cleanup() {
    window.removeEventListener('resize', this._onWindowResize);
    window.removeEventListener('keydown', this._onKeyDown);
    window.removeEventListener('keyup', this._onKeyUp);
    if (this.renderer && this.renderer.domElement) {
      this._container.removeChild(this.renderer.domElement);
      this.renderer.dispose();
      this.renderer = null;
    }
    this.scene = null;
    this.camera = null;
    this.car = null;
    this.obstacles.length = 0;
    this.dustParticles = null;
    this.sparkParticles = null;
  }
}

// Expose to global for EmberFrame or direct usage
window.ReallyRacer = ReallyRacer;
