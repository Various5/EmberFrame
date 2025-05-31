/**
 * APP_METADATA
 * @name GameTetrisArcade
 * @icon fas fa-th-large
 * @description A fully polished, classic‐rule Tetris with 7‐bag randomizer, proper locking, line clears only when rows are filled, neon glow, sound cues, high‐score persistence, and level progression.
 * @category Games
 * @version 2.1.0
 * @author EmberFrame Team
 * @enabled true
 */

class GameTetrisArcade {
  // ────────────────────────────────────────────────────────────────────────────────
  // Static properties for game state
  static _container = null;
  static _canvas = null;
  static _ctx = null;
  static _width = 300;
  static _height = 600;
  static _cols = 10;
  static _rows = 20;
  static _cellSize = 30;
  static _board = [];
  static _currentPiece = null;
  static _nextPiece = null;
  static _dropInterval = 800;
  static _lastDropTime = 0;
  static _score = 0;
  static _level = 1;
  static _linesCleared = 0;
  static _gameOver = false;
  static _animationId = null;
  static _highScore = 0;

  // Glow effect parameters
  static _glowColor = 'rgba(0, 255, 255, 0.6)';
  static _glowBlur = 8;

  // Audio cues (placeholders; replace with actual sources)
  static _audioContext = null;
  static _sounds = {};

  // 7‐bag randomizer
  static _bag = [];
  static _bagIndex = 0;

  // Tetromino definitions (4×4 matrices for I; 3×3 for others)
  static _tetrominoes = {
    I: [
      [[0,0,0,0],
       [1,1,1,1],
       [0,0,0,0],
       [0,0,0,0]],
      [[0,0,1,0],
       [0,0,1,0],
       [0,0,1,0],
       [0,0,1,0]]
    ],
    J: [
      [[1,0,0],
       [1,1,1],
       [0,0,0]],
      [[0,1,1],
       [0,1,0],
       [0,1,0]],
      [[0,0,0],
       [1,1,1],
       [0,0,1]],
      [[0,1,0],
       [0,1,0],
       [1,1,0]]
    ],
    L: [
      [[0,0,1],
       [1,1,1],
       [0,0,0]],
      [[0,1,0],
       [0,1,0],
       [0,1,1]],
      [[0,0,0],
       [1,1,1],
       [1,0,0]],
      [[1,1,0],
       [0,1,0],
       [0,1,0]]
    ],
    O: [
      [[1,1],
       [1,1]]
    ],
    S: [
      [[0,1,1],
       [1,1,0],
       [0,0,0]],
      [[0,1,0],
       [0,1,1],
       [0,0,1]]
    ],
    T: [
      [[0,1,0],
       [1,1,1],
       [0,0,0]],
      [[0,1,0],
       [0,1,1],
       [0,1,0]],
      [[0,0,0],
       [1,1,1],
       [0,1,0]],
      [[0,1,0],
       [1,1,0],
       [0,1,0]]
    ],
    Z: [
      [[1,1,0],
       [0,1,1],
       [0,0,0]],
      [[0,0,1],
       [0,1,1],
       [0,1,0]]
    ]
  };

  static _colors = {
    I: '#00FFFF',
    J: '#0000FF',
    L: '#FFA500',
    O: '#FFFF00',
    S: '#00FF00',
    T: '#800080',
    Z: '#FF0000'
  };

  // ────────────────────────────────────────────────────────────────────────────────
  // Create EmberFrame window
  static createWindow() {
    return {
      title: 'TetrisArcade',
      width: '100%',
      height: '100%',
      content: this._createHTML(),
      onInit: async (win) => {
        this._container = win;
        await this._initialize();
      },
      onDestroy: () => {
        this._cleanup();
      }
    };
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // Build HTML layout: game area, sidebar, neon CSS, audio elements
  static _createHTML() {
    return `
      <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
      <div id="tetris-arcade-container" style="display:flex; width:100%; height:100%; background:#000; color:#0F0; font-family:'Press Start 2P', cursive; position:relative; overflow:hidden;">
        <!-- Left: Tetris Field -->
        <div id="tetris-field" style="flex:1; display:flex; justify-content:center; align-items:center; background:#111; position:relative;">
          <canvas id="tetris-arcade-canvas" width="${this._width}" height="${this._height}" style="background:#000; border:4px solid #0F0; box-shadow: 0 0 20px #0F0;"></canvas>
          <div id="tetris-arcade-overlay" style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); display:none; text-align:center;">
            <div style="background:rgba(0,0,0,0.8); border:3px solid #0F0; border-radius:8px; padding:30px;">
              <div style="color:#0F0; font-size:32px; margin-bottom:20px;">GAME&nbsp;OVER</div>
              <div style="color:#0F0; font-size:16px; margin-bottom:20px;">Press [R] To Restart</div>
              <div style="color:#0F0; font-size:14px;">High Score: <span id="tetris-highscore-display">0</span></div>
            </div>
          </div>
        </div>
        <!-- Right: Sidebar -->
        <div id="tetris-sidebar" style="width:220px; background:#111; padding:20px; display:flex; flex-direction:column; align-items:center; border-left:4px solid #0F0;">
          <div style="margin-bottom:20px;">
            <div style="color:#0F0; font-size:16px; margin-bottom:6px;">NEXT</div>
            <canvas id="tetris-arcade-next" width="140" height="140" style="background:#000; border:2px solid #0F0; box-shadow: 0 0 10px #0F0;"></canvas>
          </div>
          <div style="margin-bottom:20px;">
            <div style="color:#0F0; font-size:16px; margin-bottom:6px;">SCORE</div>
            <div id="tetris-score-display" style="color:#0F0; font-size:24px;">0</div>
          </div>
          <div style="margin-bottom:20px;">
            <div style="color:#0F0; font-size:16px; margin-bottom:6px;">LEVEL</div>
            <div id="tetris-level-display" style="color:#0F0; font-size:24px;">1</div>
          </div>
          <div style="margin-bottom:20px;">
            <div style="color:#0F0; font-size:16px; margin-bottom:6px;">LINES</div>
            <div id="tetris-lines-display" style="color:#0F0; font-size:24px;">0</div>
          </div>
          <div style="margin-bottom:20px;">
            <div style="color:#0F0; font-size:16px; margin-bottom:6px;">HIGH SCORE</div>
            <div id="tetris-highscore-display-sidebar" style="color:#0F0; font-size:20px;">0</div>
          </div>
          <div style="margin-top:auto; font-size:12px; color:#0F0; text-align:center; line-height:1.5;">
            Controls:<br>
            ← / → : Move&nbsp;&nbsp; ↑ : Rotate<br>
            ↓ : Soft Drop&nbsp;&nbsp; Space : Hard Drop<br>
            P : Pause&nbsp;&nbsp; R : Restart
          </div>
        </div>
      </div>

      <style>
        #tetris-arcade-canvas {
          image-rendering: pixelated;
        }
        #tetris-pause-overlay {
          display: none;
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background: rgba(0,0,0,0.8);
          justify-content: center;
          align-items: center;
          color: #0F0;
          font-size: 32px;
          font-family: 'Press Start 2P', cursive;
          text-align: center;
          border-radius: 8px;
        }
      </style>

      <!-- Audio elements (optional placeholders) -->
      <audio id="sound-move" src="data:audio/wav;base64,UklGRhQAAABXQVZFZm10IBAAAAABAAEAIlYAAESsAAACABAAZGF0YQAAAAA="></audio>
      <audio id="sound-rotate" src="data:audio/wav;base64,UklGRhQAAABXQVZFZm10IBAAAAABAAEAIlYAAESsAAACABAAZGF0YQAAAAA="></audio>
      <audio id="sound-drop" src="data:audio/wav;base64,UklGRhQAAABXQVZFZm10IBAAAAABAAEAIlYAAESsAAACABAAZGF0YQAAAAA="></audio>
      <audio id="sound-line" src="data:audio/wav;base64,UklGRhQAAABXQVZFZm10IBAAAAABAAEAIlYAAESsAAACABAAZGF0YQAAAAA="></audio>
      <audio id="sound-gameover" src="data:audio/wav;base64,UklGRhQAAABXQVZFZm10IBAAAAABAAEAIlYAAESsAAACABAAZGF0YQAAAAA="></audio>
    `;
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // Initialize: audio, board, inputs, 7‐bag, first pieces, loop
  static async _initialize() {
    // AudioContext for cues
    this._audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this._sounds.move = this._container.querySelector('#sound-move');
    this._sounds.rotate = this._container.querySelector('#sound-rotate');
    this._sounds.drop = this._container.querySelector('#sound-drop');
    this._sounds.line = this._container.querySelector('#sound-line');
    this._sounds.gameover = this._container.querySelector('#sound-gameover');

    // Canvas contexts
    this._canvas = this._container.querySelector('#tetris-arcade-canvas');
    this._ctx = this._canvas.getContext('2d');
    this._nextCanvas = this._container.querySelector('#tetris-arcade-next');
    this._nextCtx = this._nextCanvas.getContext('2d');

    // Initialize empty board
    this._board = Array.from({ length: this._rows }, () => Array(this._cols).fill(0));

    // Load high score
    try {
      const storedHS = parseInt(localStorage.getItem('tetris-arcade-highscore') || '0');
      this._highScore = isNaN(storedHS) ? 0 : storedHS;
    } catch {
      this._highScore = 0;
    }
    this._container.querySelectorAll('#tetris-highscore-display, #tetris-highscore-display-sidebar')
        .forEach(el => (el.textContent = this._highScore));

    // Initialize 7‐bag
    this._fillBag();
    this._bagIndex = 0;

    // Spawn initial pieces
    this._nextPiece = this._drawFromBag();
    this._spawnPiece();

    // Initialize game variables
    this._score = 0;
    this._level = 1;
    this._linesCleared = 0;
    this._dropInterval = 800;
    this._gameOver = false;

    // Display initial UI
    this._updateScore();
    this._updateLevel();
    this._updateLines();
    this._drawNextPiece();

    // Input handlers
    window.addEventListener('keydown', this._handleKey.bind(this));

    // Start loop
    this._lastDropTime = performance.now();
    this._loop(this._lastDropTime);
  }

  // Fill and shuffle the 7‐bag
  static _fillBag() {
    this._bag = ['I','J','L','O','S','T','Z'];
    for (let i = this._bag.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this._bag[i], this._bag[j]] = [this._bag[j], this._bag[i]];
    }
  }

  // Draw next piece from bag; refill if empty
  static _drawFromBag() {
    if (this._bagIndex >= this._bag.length) {
      this._fillBag();
      this._bagIndex = 0;
    }
    const type = this._bag[this._bagIndex++];
    const variants = this._tetrominoes[type];
    return { type, variants, rotation: 0, shape: variants[0], color: this._colors[type], x: 0, y: 0 };
  }

  // Spawn current piece from next, draw new next
  static _spawnPiece() {
    this._currentPiece = this._nextPiece;
    this._currentPiece.x = Math.floor((this._cols - this._currentPiece.shape[0].length) / 2);
    this._currentPiece.y = -1; // just above visible area
    this._nextPiece = this._drawFromBag();
    this._drawNextPiece();
  }

  // Draw next piece preview
  static _drawNextPiece() {
    this._nextCtx.fillStyle = '#000';
    this._nextCtx.fillRect(0, 0, 140, 140);
    const shape = this._nextPiece.shape;
    const color = this._nextPiece.color;
    const size = 30;
    const offsetX = Math.floor((140 - shape[0].length * size) / 2);
    const offsetY = Math.floor((140 - shape.length * size) / 2);

    this._nextCtx.save();
    this._nextCtx.shadowColor = this._glowColor;
    this._nextCtx.shadowBlur = this._glowBlur / 2;
    for (let r = 0; r < shape.length; r++) {
      for (let c = 0; c < shape[r].length; c++) {
        if (shape[r][c]) {
          this._nextCtx.fillStyle = color;
          this._nextCtx.fillRect(offsetX + c * size + 2, offsetY + r * size + 2, size - 4, size - 4);
        }
      }
    }
    this._nextCtx.restore();
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // Handle keyboard (move, rotate, drop, pause, restart)
  static _handleKey(e) {
    if (!this._gameOver) {
      switch (e.code) {
        case 'ArrowLeft':
          this._playSound('move');
          this._movePiece(-1);
          break;
        case 'ArrowRight':
          this._playSound('move');
          this._movePiece(1);
          break;
        case 'ArrowDown':
          this._playSound('move');
          this._pieceDrop();
          this._lastDropTime = performance.now();
          break;
        case 'ArrowUp':
          this._playSound('rotate');
          this._rotatePiece();
          break;
        case 'Space':
          this._playSound('drop');
          while (this._canMove(0,1,this._currentPiece.shape)) {
            this._currentPiece.y++;
          }
          this._pieceLock();
          break;
        case 'KeyP':
          this._pauseResume();
          break;
      }
    }
    if (e.code === 'KeyR' && this._gameOver) {
      this._restart();
    }
  }

  // Play HTML audio elements for sound effect
  static _playSound(name) {
    const audioEl = this._sounds[name];
    if (!audioEl) return;
    audioEl.currentTime = 0;
    audioEl.play().catch(() => {});
  }

  // Toggle pause/resume
  static _pauseResume() {
    if (this._gameOver) return;
    if (this._isPaused) {
      this._isPaused = false;
      this._lastDropTime = performance.now();
      this._loop(this._lastDropTime);
      this._container.querySelector('#tetris-pause-overlay')?.remove();
    } else {
      this._isPaused = true;
      cancelAnimationFrame(this._animationId);
      const pauseDiv = document.createElement('div');
      pauseDiv.id = 'tetris-pause-overlay';
      pauseDiv.style.display = 'flex';
      pauseDiv.innerHTML = `<div>PAUSED</div>`;
      this._container.querySelector('#tetris-field').appendChild(pauseDiv);
    }
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // Move piece horizontally if possible
  static _movePiece(dir) {
    if (this._canMove(dir, 0, this._currentPiece.shape)) {
      this._currentPiece.x += dir;
    }
  }

  // Rotate piece (90° clockwise) if possible (simple wall kicks not implemented)
  static _rotatePiece() {
    const nextRotation = (this._currentPiece.rotation + 1) % this._currentPiece.variants.length;
    const nextShape = this._currentPiece.variants[nextRotation];
    if (this._canMove(0, 0, nextShape)) {
      this._currentPiece.shape = nextShape;
      this._currentPiece.rotation = nextRotation;
    }
  }

  // Drop piece one row (soft drop); if cannot, lock it
  static _pieceDrop() {
    if (this._canMove(0,1, this._currentPiece.shape)) {
      this._currentPiece.y++;
    } else {
      this._pieceLock();
    }
  }

  // Lock piece into board and clear lines
  static _pieceLock() {
    const { shape, color, x: px, y: py } = this._currentPiece;
    // Place blocks onto board
    for (let r = 0; r < shape.length; r++) {
      for (let c = 0; c < shape[r].length; c++) {
        if (shape[r][c]) {
          const br = py + r;
          const bc = px + c;
          if (br < 0) {
            // Locked above top → game over
            this._gameOver = true;
            this._endGame();
            return;
          }
          this._board[br][bc] = color;
        }
      }
    }
    // Clear completed lines
    this._clearLines();
    // Update speed/level
    this._updateLevelSpeed();
    // Spawn next piece
    this._spawnPiece();
  }

  // Clear full lines, update score based on count
  static _clearLines() {
    let fullRows = [];
    for (let r = 0; r < this._rows; r++) {
      if (this._board[r].every(cell => cell !== 0)) {
        fullRows.push(r);
      }
    }
    if (fullRows.length > 0) {
      // Remove rows one by one
      for (let idx of fullRows) {
        this._board.splice(idx, 1);
        this._board.unshift(Array(this._cols).fill(0));
      }
      // Scoring: classic scheme—single/double/triple/tetris
      let points = 0;
      switch (fullRows.length) {
        case 1: points = 100 * this._level; break;
        case 2: points = 300 * this._level; break;
        case 3: points = 500 * this._level; break;
        case 4: points = 800 * this._level; break;
      }
      this._score += points;
      this._linesCleared += fullRows.length;
      this._playSound('line');
      this._updateScore();
      this._updateLines();
    }
  }

  // Update level every 10 lines, speed up drop interval
  static _updateLevelSpeed() {
    const newLevel = Math.floor(this._linesCleared / 10) + 1;
    if (newLevel !== this._level) {
      this._level = newLevel;
      this._updateLevel();
      this._dropInterval = Math.max(100, 800 - (this._level - 1) * 100);
    }
  }

  // Update score display
  static _updateScore() {
    const el = this._container.querySelector('#tetris-score-display');
    if (el) el.textContent = this._score;
  }

  // Update level display
  static _updateLevel() {
    const el = this._container.querySelector('#tetris-level-display');
    if (el) el.textContent = this._level;
  }

  // Update lines display
  static _updateLines() {
    const el = this._container.querySelector('#tetris-lines-display');
    if (el) el.textContent = this._linesCleared;
  }

  // Check if a piece at (dx,dy) with given shape is valid (no collision)
  static _canMove(dx, dy, shape) {
    const { x: px, y: py } = this._currentPiece;
    for (let r = 0; r < shape.length; r++) {
      for (let c = 0; c < shape[r].length; c++) {
        if (!shape[r][c]) continue;
        const newX = px + c + dx;
        const newY = py + r + dy;
        // Out of bounds?
        if (newX < 0 || newX >= this._cols || newY >= this._rows) return false;
        // Check collision with existing blocks
        if (newY >= 0 && this._board[newY][newX]) return false;
      }
    }
    return true;
  }

  // Main game loop: automatic drop and redraw
  static _loop(timestamp) {
    if (this._isPaused) return;
    if (this._gameOver) return;

    const delta = timestamp - this._lastDropTime;
    if (delta > this._dropInterval) {
      this._pieceDrop();
      this._lastDropTime = timestamp;
    }
    this._draw();
    this._animationId = requestAnimationFrame(this._loop.bind(this));
  }

  // Draw entire game: board, current piece, next piece, overlay
  static _draw() {
    // Clear main field
    this._ctx.fillStyle = '#000';
    this._ctx.fillRect(0, 0, this._width, this._height);

    // Draw placed blocks with neon glow
    this._ctx.save();
    this._ctx.shadowColor = this._glowColor;
    this._ctx.shadowBlur = this._glowBlur;
    this._ctx.shadowOffsetX = 0;
    this._ctx.shadowOffsetY = 0;
    for (let r = 0; r < this._rows; r++) {
      for (let c = 0; c < this._cols; c++) {
        if (this._board[r][c]) {
          this._drawCell(c, r, this._board[r][c]);
        }
      }
    }
    this._ctx.restore();

    // Draw current piece
    this._ctx.save();
    this._ctx.shadowColor = this._glowColor;
    this._ctx.shadowBlur = this._glowBlur;
    this._ctx.shadowOffsetX = 0;
    this._ctx.shadowOffsetY = 0;
    const { shape, color, x: px, y: py } = this._currentPiece;
    for (let r = 0; r < shape.length; r++) {
      for (let c = 0; c < shape[r].length; c++) {
        if (shape[r][c]) {
          this._drawCell(px + c, py + r, color);
        }
      }
    }
    this._ctx.restore();

    // If game over, show overlay
    if (this._gameOver) {
      const overlay = this._container.querySelector('#tetris-arcade-overlay');
      if (overlay) overlay.style.display = 'flex';
    }
  }

  // Draw individual cell with a bevel effect
  static _drawCell(col, row, fillColor) {
    const size = this._cellSize;
    const x = col * size;
    const y = row * size;
    // Base fill
    this._ctx.fillStyle = fillColor;
    this._ctx.fillRect(x + 1, y + 1, size - 2, size - 2);
    // Light edge on top-left
    this._ctx.fillStyle = this._shadeColor(fillColor, 0.4);
    this._ctx.fillRect(x + 1, y + 1, size - 2, 4);
    this._ctx.fillRect(x + 1, y + 1, 4, size - 2);
    // Dark edge on bottom-right
    this._ctx.fillStyle = this._shadeColor(fillColor, -0.4);
    this._ctx.fillRect(x + size - 5, y + 1, 4, size - 2);
    this._ctx.fillRect(x + 1, y + size - 5, size - 2, 4);
  }

  // Handle end-of-game: persist high score and show overlay
  static _endGame() {
    this._playSound('gameover');
    if (this._score > this._highScore) {
      this._highScore = this._score;
      try {
        localStorage.setItem('tetris-arcade-highscore', this._highScore.toString());
      } catch {}
    }
    this._container.querySelectorAll('#tetris-highscore-display, #tetris-highscore-display-sidebar')
        .forEach(el => (el.textContent = this._highScore));
    this._gameOver = true;
    cancelAnimationFrame(this._animationId);
    this._draw();
    this._container.querySelector('#tetris-arcade-overlay').style.display = 'flex';
  }

  // Restart game from scratch
  static _restart() {
    cancelAnimationFrame(this._animationId);
    this._board = Array.from({ length: this._rows }, () => Array(this._cols).fill(0));
    this._fillBag();
    this._bagIndex = 0;
    this._nextPiece = this._drawFromBag();
    this._currentPiece = null;
    this._score = 0;
    this._level = 1;
    this._linesCleared = 0;
    this._dropInterval = 800;
    this._gameOver = false;
    this._spawnPiece();
    this._updateScore();
    this._updateLevel();
    this._updateLines();
    this._drawNextPiece();
    this._container.querySelector('#tetris-arcade-overlay').style.display = 'none';
    this._lastDropTime = performance.now();
    this._loop(this._lastDropTime);
  }

  // Utility: shade or tint a hex color by a percentage
  static _shadeColor(color, percent) {
    const f = parseInt(color.slice(1),16),
          t = percent<0?0:255,
          p = percent<0?percent*-1:percent,
          R = f>>16,
          G = f>>8&0x00FF,
          B = f&0x0000FF;
    const newR = Math.round((t-R)*p)+R;
    const newG = Math.round((t-G)*p)+G;
    const newB = Math.round((t-B)*p)+B;
    return "#" + (0x1000000 + (newR<<16) + (newG<<8) + newB).toString(16).slice(1);
  }

  // Cleanup on window close
  static _cleanup() {
    this._gameOver = true;
    cancelAnimationFrame(this._animationId);
    window.removeEventListener('keydown', this._handleKey.bind(this));
    this._board = [];
    this._currentPiece = null;
    this._nextPiece = null;
  }
}

// Expose globally
window.GameTetrisArcade = GameTetrisArcade;
