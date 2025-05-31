/**
 * APP_METADATA
 * @name TetrisArcade
 * @icon fas fa-gamepad
 * @description Tetris clone
 * @category Games
 * @version 2.0.0
 * @author EmberFrame Team
 * @enabled true
 */

class TetrisArcade {
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

  // Audio cues
  static _audioContext = null;
  static _sounds = {};

  // Tetromino definitions (same as before)
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
      title: 'Tetris Arcade',
      width: '100%',   // responsive
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
          <div style="margin-top:auto; font-size:12px; color:#0F0; text-align:center; line-height:1.5;">
            Controls:<br>
            ← / → : Move&nbsp;&nbsp; ↑ : Rotate<br>
            ↓ : Soft Drop&nbsp;&nbsp; Space : Hard Drop<br>
            P : Pause&nbsp;&nbsp; R : Restart
          </div>
        </div>
      </div>

      <style>
        /* Neon glow for canvas edges */
        #tetris-arcade-canvas {
          image-rendering: pixelated;
        }
        /* Pause screen (simple overlay) */
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

      <!-- Audio elements (hidden) -->
      <audio id="sound-move" src="data:audio/wav;base64,UklGRhQAAABXQVZFZm10IBAAAAABAAEAIlYAAESsAAACABAAZGF0YQAAAAA="></audio>
      <audio id="sound-rotate" src="data:audio/wav;base64,UklGRhQAAABXQVZFZm10IBAAAAABAAEAIlYAAESsAAACABAAZGF0YQAAAAA="></audio>
      <audio id="sound-drop" src="data:audio/wav;base64,UklGRhQAAABXQVZFZm10IBAAAAABAAEAIlYAAESsAAACABAAZGF0YQAAAAA="></audio>
      <audio id="sound-line" src="data:audio/wav;base64,UklGRhQAAABXQVZFZm10IBAAAAABAAEAIlYAAESsAAACABAAZGF0YQAAAAA="></audio>
      <audio id="sound-gameover" src="data:audio/wav;base64,UklGRhQAAABXQVZFZm10IBAAAAABAAEAIlYAAESsAAACABAAZGF0YQAAAAA="></audio>
    `;
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // Initialize everything: audio, board, pieces, input, load high score
  static async _initialize() {
    // AudioContext for WebAudio cues
    this._audioContext = new (window.AudioContext || window.webkitAudioContext)();
    // Load short beep sounds (using base64 placeholders above)
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

    // Initialize board
    this._board = Array.from({ length: this._rows }, () => Array(this._cols).fill(0));

    // Load high score from localStorage
    try {
      const storedHS = parseInt(localStorage.getItem('tetris-highscore') || '0');
      this._highScore = isNaN(storedHS) ? 0 : storedHS;
    } catch {
      this._highScore = 0;
    }
    this._container.querySelector('#tetris-highscore-display').textContent = this._highScore;

    // Spawn initial pieces
    this._nextPiece = this._randomPiece();
    this._spawnPiece();

    // Game variables
    this._score = 0;
    this._level = 1;
    this._linesCleared = 0;
    this._dropInterval = 800;
    this._gameOver = false;

    // Display UI
    this._updateScore();
    this._updateLevel();
    this._updateLines();
    this._drawNextPiece();

    // Input handlers
    window.addEventListener('keydown', this._handleKey.bind(this));

    // Start game loop
    this._lastDropTime = performance.now();
    this._loop(this._lastDropTime);
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // Main loop: drop piece, draw, manage timing
  static _loop(timestamp) {
    if (!this._gameOver) {
      const delta = timestamp - this._lastDropTime;
      if (delta > this._dropInterval) {
        this._pieceDrop();
        this._lastDropTime = timestamp;
      }
      this._draw();
      this._animationId = requestAnimationFrame(this._loop.bind(this));
    }
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // Draw full game: board cells with glow, current piece, next piece, overlays
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

    // Draw current piece with glow
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

    // If Game Over, show overlay
    if (this._gameOver) {
      this._container.querySelector('#tetris-arcade-overlay').style.display = 'flex';
    }
  }

  // Draw an individual cell with neon highlight
  static _drawCell(col, row, fillColor) {
    const size = this._cellSize;
    const x = col * size;
    const y = row * size;
    // Main rectangle
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

  // ────────────────────────────────────────────────────────────────────────────────
  // Handle keyboard input (move, rotate, drop, pause, restart)
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
      this._playSound('move');
      this._restart();
    }
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // Play HTML audio elements for sound effect
  static _playSound(name) {
    const audioEl = this._sounds[name];
    if (!audioEl) return;
    // Reset to start
    audioEl.currentTime = 0;
    audioEl.play();
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // Toggle pause/resume
  static _pauseResume() {
    if (this._gameOver) return;
    if (this._isPaused) {
      // Resume
      this._isPaused = false;
      this._lastDropTime = performance.now();
      this._loop(this._lastDropTime);
      this._container.querySelector('#tetris-pause-overlay')?.remove();
    } else {
      // Pause
      this._isPaused = true;
      cancelAnimationFrame(this._animationId);
      // Show overlay
      const pauseDiv = document.createElement('div');
      pauseDiv.id = 'tetris-pause-overlay';
      pauseDiv.style.display = 'flex';
      pauseDiv.innerHTML = `<div>PAUSED</div>`;
      this._container.querySelector('#tetris-field').appendChild(pauseDiv);
    }
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // Move piece horizontally
  static _movePiece(dir) {
    if (this._canMove(dir, 0, this._currentPiece.shape)) {
      this._currentPiece.x += dir;
    }
  }

  // Rotate piece
  static _rotatePiece() {
    const nextRotation = (this._currentPiece.rotation + 1) % this._currentPiece.variants.length;
    const nextShape = this._currentPiece.variants[nextRotation];
    if (this._canMove(0, 0, nextShape)) {
      this._currentPiece.shape = nextShape;
      this._currentPiece.rotation = nextRotation;
    }
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // Drop piece by one row
  static _pieceDrop() {
    if (this._canMove(0,1, this._currentPiece.shape)) {
      this._currentPiece.y++;
    } else {
      this._pieceLock();
    }
  }

  // Lock piece and perform clears, scoring, spawn next
  static _pieceLock() {
    const { shape, color, x: px, y: py } = this._currentPiece;
    for (let r = 0; r < shape.length; r++) {
      for (let c = 0; c < shape[r].length; c++) {
        if (shape[r][c]) {
          const br = py + r;
          const bc = px + c;
          if (br < 0) {
            // locked above → game over
            this._gameOver = true;
            this._endGame();
            return;
          }
          this._board[br][bc] = color;
        }
      }
    }
    // Clear lines
    this._clearLines();
    // Increase level/speed
    this._updateLevelSpeed();
    // Spawn next piece
    this._spawnPiece();
    this._drawNextPiece();
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // Check and clear full lines with animation, update score
  static _clearLines() {
    let lines = 0;
    for (let r = this._rows - 1; r >= 0; r--) {
      if (this._board[r].every(cell => cell !== 0)) {
        lines++;
        // Animate line clear: blink row 3 times
        this._animateLineClear(r);
        // Remove line
        this._board.splice(r, 1);
        this._board.unshift(Array(this._cols).fill(0));
        r++;
      }
    }
    if (lines > 0) {
      this._linesCleared += lines;
      this._score += lines * 150 * this._level; // bonus: 150×level per line
      this._playSound('line');
      this._updateScore();
      this._updateLines();
    }
  }

  // Animate a row blinking (semi‐blocking for effect)
  static _animateLineClear(rowIndex) {
    const originalRow = [...this._board[rowIndex]];
    let blinkCount = 0;
    const blinkInterval = setInterval(() => {
      for (let c = 0; c < this._cols; c++) {
        this._board[rowIndex][c] = (blinkCount % 2 === 0) ? 0 : originalRow[c];
      }
      this._draw();
      blinkCount++;
      if (blinkCount > 3) {
        clearInterval(blinkInterval);
      }
    }, 80);
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // Update level and adjust drop speed
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

  // Spawn a new piece from next, generate a fresh next
  static _spawnPiece() {
    this._currentPiece = this._nextPiece;
    this._currentPiece.x = Math.floor((this._cols - this._currentPiece.shape[0].length) / 2);
    this._currentPiece.y = -1;
    this._nextPiece = this._randomPiece();
  }

  // Draw next piece in sidebar with glow
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

  // Generate random Tetromino
  static _randomPiece() {
    const types = Object.keys(this._tetrominoes);
    const randType = types[Math.floor(Math.random() * types.length)];
    const variants = this._tetrominoes[randType];
    const rotation = 0;
    const shape = variants[rotation];
    const color = this._colors[randType];
    return { type: randType, variants, rotation, shape, color, x: 0, y: 0 };
  }

  // Check if piece can move
  static _canMove(dx, dy, shape) {
    const { x: px, y: py } = this._currentPiece;
    for (let r = 0; r < shape.length; r++) {
      for (let c = 0; c < shape[r].length; c++) {
        if (!shape[r][c]) continue;
        const newX = px + c + dx;
        const newY = py + r + dy;
        if (newX < 0 || newX >= this._cols || newY >= this._rows) return false;
        if (newY >= 0 && this._board[newY][newX]) return false;
      }
    }
    return true;
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // Handle end-of-game: save high score, show overlay
  static _endGame() {
    this._playSound('gameover');
    // Update and persist high score
    if (this._score > this._highScore) {
      this._highScore = this._score;
      try {
        localStorage.setItem('tetris-highscore', this._highScore.toString());
      } catch {}
    }
    this._container.querySelector('#tetris-highscore-display').textContent = this._highScore;
    this._gameOver = true;
    cancelAnimationFrame(this._animationId);
    this._draw(); // draw final state
    this._container.querySelector('#tetris-arcade-overlay').style.display = 'flex';
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // Restart from scratch
  static _restart() {
    cancelAnimationFrame(this._animationId);
    this._board = Array.from({ length: this._rows }, () => Array(this._cols).fill(0));
    this._nextPiece = this._randomPiece();
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

  // ────────────────────────────────────────────────────────────────────────────────
  // Convert hex color to shade
  static _shadeColor(color, percent) {
    const f = parseInt(color.slice(1),16),
          t = percent<0?0:255,
          p = percent<0?percent*-1:percent,
          R = f>>16,
          G = f>>8&0x00FF,
          B = f&0x0000FF;
    const newR = Math.round((t - R)*p)+R;
    const newG = Math.round((t - G)*p)+G;
    const newB = Math.round((t - B)*p)+B;
    return "#" + (0x1000000 + (newR<<16) + (newG<<8) + newB).toString(16).slice(1);
  }

  // ────────────────────────────────────────────────────────────────────────────────
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
window.TetrisArcade = TetrisArcade;
