/**
 * APP_METADATA
 * @name MusicMaker
 * @icon fas fa-music
 * @description FL Studio 21–style Browser DAW: Step Sequencer, Piano Roll, Playlist, Sample Browser, Mixer, Plugins, Save/Load, Undo/Redo.
 * @category Music
 * @version 4.0.0
 * @autor EmberFrame
 * @enabled true
 */

class MusicMaker {
  // ─────────────────────────────────────────────────────────────────────────────────────────
  // STATIC STATE
  static _container = null;
  static _audioContext = null;
  static _masterGain = null;
  static _masterVolume = 0.8;

  static _tempo = 140;                 // Default BPM
  static _isPlaying = false;
  static _currentStep = 0;
  static _lookahead = 0.1;             // Seconds to schedule ahead
  static _nextNoteTime = 0;
  static _resolution = 4;              // 16th notes
  static _stepsPerBar = 16;            // 4/4 time → 16th notes
  static _patternCount = 8;            // Patterns per channel
  static _channels = [];               // Array of channel objects
  static _patternsOrder = [];          // Sequence of pattern indices in Playlist
  static _currentPattern = 0;
  static _currentOrderPosition = 0;

  static _samples = [];                // { name, audioBuffer, base64 }
  static _plugins = [];                // Registered plugin constructors

  static _metronomeOn = false;
  static _metronomeOsc = null;
  static _metronomeGain = null;

  static _undoStack = [];
  static _redoStack = [];
  static _isApplyingHistory = false;

  static _theme = 'dark';
  static _maxChannels = 16;

  // ─────────────────────────────────────────────────────────────────────────────────────────
  // CREATE WINDOW (EmberFrame / generic window manager)
  static createWindow() {
    return {
      title: 'MusicMaker v4.0.0',
      width: '100%',
      height: '100%',
      content: this._getHTML(),
      onInit: async (winElem) => {
        MusicMaker._container = winElem;
        await MusicMaker._initialize();
      },
      onDestroy: () => {
        MusicMaker._cleanup();
      },
      onClose: () => true,
      onMinimize: () => {
        if (MusicMaker._isPlaying) MusicMaker._stopScheduler();
      },
      onRestore: () => {},
    };
  }

  // ─────────────────────────────────────────────────────────────────────────────────────────
  // BUILD HTML + CSS (single string)
  static _getHTML() {
    return `
      <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;600;800&display=swap" rel="stylesheet">
      <style>
        /* ───────────────────────────────────────────────────────────────────────── */
        :root {
          --bg-primary: #101112;
          --bg-secondary: #1f2224;
          --bg-tertiary: #202223;
          --text-primary: #e0e0e0;
          --text-secondary: #a0a0a0;
          --accent1: #f39c12;
          --accent2: #16a085;
          --highlight: #e67e22;
          --scrollbar-bg: #1a1c1d;
          --scrollbar-thumb: #555;
        }
        [data-theme="light"] {
          --bg-primary: #f2f2f2;
          --bg-secondary: #ffffff;
          --bg-tertiary: #e8e8e8;
          --text-primary: #2c3e50;
          --text-secondary: #7f8c8d;
          --accent1: #d35400;
          --accent2: #27ae60;
          --highlight: #e67e22;
          --scrollbar-bg: #d0d0d0;
          --scrollbar-thumb: #888;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body, html { width: 100%; height: 100%; }
        #mm-container {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100%;
          background: var(--bg-primary);
          color: var(--text-primary);
          font-family: 'Rajdhani', sans-serif;
          overflow: hidden;
        }
        /* Scrollbars */
        #mm-container ::-webkit-scrollbar {
          width: 8px; height: 8px;
        }
        #mm-container ::-webkit-scrollbar-track {
          background: var(--scrollbar-bg);
        }
        #mm-container ::-webkit-scrollbar-thumb {
          background-color: var(--scrollbar-thumb);
          border-radius: 4px;
        }

        /* ───────────────────────────────────────────────────────────────────────── */
        /* TOP BAR (File / Edit / View / Transport) */
        #mm-top-bar {
          display: flex;
          align-items: center;
          padding: 4px 12px;
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--bg-primary);
        }
        .menu-group {
          display: flex;
          align-items: center;
          margin-right: 24px;
        }
        .menu-btn {
          background: none;
          border: none;
          color: var(--text-primary);
          font-size: 14px;
          font-weight: 600;
          margin-right: 8px;
          cursor: pointer;
          transition: color 0.2s ease;
        }
        .menu-btn:hover { color: var(--accent1); }
        #mm-transport {
          margin-left: auto;
          display: flex;
          align-items: center;
        }
        .transport-btn {
          margin-right: 8px;
          padding: 4px 8px;
          font-size: 14px;
          background: var(--accent2);
          border: none;
          border-radius: 4px;
          color: #fff;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        .transport-btn:hover { background: #229954; }
        #mm-tempo {
          width: 50px;
          margin-right: 12px;
          border-radius: 4px;
          border: 1px solid var(--bg-primary);
          padding: 2px 4px;
          background: #fff;
          color: #2c3e50;
          font-weight: 600;
        }
        #mm-beat-indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--bg-primary);
          margin-left: 8px;
          transition: background 0.05s ease;
        }

        /* ───────────────────────────────────────────────────────────────────────── */
        #mm-main {
          flex: 1;
          display: flex;
          overflow: hidden;
        }

        /* LEFT COLUMN: Channel Rack / Step Sequencer / Piano Roll */
        #mm-left-col {
          flex: 3;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border-right: 2px solid var(--bg-primary);
        }
        /* Pattern Bar */
        #mm-pattern-bar {
          display: flex;
          align-items: center;
          padding: 6px 12px;
          background: var(--bg-secondary);
          border-bottom: 2px solid var(--bg-primary);
        }
        #mm-pattern-select {
          margin-right: 16px;
          padding: 4px;
          background: var(--bg-tertiary);
          color: var(--text-primary);
          border: 1px solid var(--bg-primary);
          border-radius: 4px;
          font-size: 14px;
        }
        .pattern-nav-btn {
          margin-right: 8px;
          padding: 4px 8px;
          background: var(--accent2);
          border: none;
          border-radius: 4px;
          color: #fff;
          cursor: pointer;
          font-size: 13px;
          transition: background 0.2s ease;
        }
        .pattern-nav-btn:hover { background: #229954; }

        /* Channel Rack */
        #mm-channel-rack {
          flex: 1;
          overflow: auto;
          padding: 8px;
          background: var(--bg-tertiary);
        }
        .mm-channel {
          display: flex;
          align-items: center;
          padding: 6px;
          margin-bottom: 4px;
          background: var(--bg-secondary);
          border: 1px solid var(--bg-primary);
          border-radius: 4px;
        }
        .channel-color {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          margin-right: 8px;
          border: 1px solid var(--bg-primary);
          cursor: pointer;
        }
        .channel-name {
          flex: 1;
          padding: 4px;
          background: var(--bg-tertiary);
          border: 1px solid var(--bg-primary);
          border-radius: 4px;
          margin-right: 8px;
          color: var(--text-primary);
          font-weight: 600;
        }
        .channel-button {
          margin-left: 4px;
          padding: 4px 6px;
          background: var(--accent2);
          border: none;
          border-radius: 4px;
          cursor: pointer;
          color: #fff;
          font-size: 12px;
          font-weight: 500;
          transition: background 0.2s ease;
        }
        .channel-button:hover { background: #229954; }
        .remove-channel {
          background: var(--accent1);
        }
        .remove-channel:hover {
          background: #d9830d;
        }

        /* Step Sequencer */
        #mm-step-seq {
          flex: 2;
          overflow: auto;
          background: var(--bg-primary);
        }
        .step-header {
          display: grid;
          grid-template-columns: 120px repeat(var(--steps), 1fr);
          padding: 6px;
          background: var(--bg-secondary);
        }
        .step-header .label-cell {}
        .step-header span {
          text-align: center;
          font-size: 12px;
          color: var(--text-secondary);
          margin: 2px;
        }
        .step-row {
          display: grid;
          grid-template-columns: 120px repeat(var(--steps), 1fr);
          align-items: center;
          padding: 4px 6px;
        }
        .step-row:nth-child(even) { background: var(--bg-secondary); }
        .step-row:nth-child(odd) { background: var(--bg-tertiary); }
        .step-label {
          display: flex;
          align-items: center;
          margin-right: 8px;
        }
        .step-label .color-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          margin-right: 4px;
        }
        .step-cell {
          position: relative;
          width: 100%;
          height: 32px;
          margin: 2px;
          background: var(--bg-primary);
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.1s ease;
        }
        .step-cell:hover { background: var(--bg-secondary); }
        .step-cell.active { background: var(--highlight); }
        .step-cell.playing { box-shadow: 0 0 4px var(--accent1); }
        .step-cell.drag-over { background: var(--accent2) !important; }

        /* Velocity slider under step */
        .vel-slider {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 6px;
          background: var(--bg-secondary);
        }
        .vel-slider input[type="range"] {
          width: 100%;
          height: 4px;
          -webkit-appearance: none;
          background: var(--bg-secondary);
          border-radius: 2px;
          outline: none;
        }
        .vel-slider input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 8px;
          height: 8px;
          background: var(--accent1);
          border-radius: 50%;
          cursor: pointer;
        }

        /* Piano Roll Modal */
        #mm-piano-roll {
          display: none;
          position: absolute;
          top: 8%;
          left: 8%;
          width: 84%;
          height: 72%;
          background: var(--bg-primary);
          border: 2px solid var(--bg-primary);
          border-radius: 8px;
          z-index: 20;
          box-shadow: 0 0 12px rgba(0,0,0,0.6);
          flex-direction: column;
        }
        #mm-piano-roll .pr-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px;
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--bg-primary);
        }
        #mm-piano-roll .pr-header h3 {
          margin: 0;
          color: var(--accent1);
        }
        #mm-close-pr {
          background: var(--accent1);
          border: none;
          border-radius: 4px;
          color: #fff;
          padding: 4px 8px;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        #mm-close-pr:hover { background: #d9830d; }
        #mm-pr-content {
          flex: 1;
          display: flex;
          overflow: auto;
          background: var(--bg-tertiary);
        }
        .pr-cell {
          flex: 1 0 calc(100% / var(--steps));
          height: calc(100% / 12);
          margin: 1px;
          background: var(--bg-secondary);
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.1s ease;
        }
        .pr-cell:hover { background: var(--bg-primary); }
        .pr-cell.active { background: var(--highlight); }

        /* ───────────────────────────────────────────────────────────────────────── */
        /* RIGHT COLUMN: Tabs (Mixer / Samples / Playlist / Plugins) */
        #mm-right-col {
          flex: 4;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        #mm-tabs {
          display: flex;
          background: var(--bg-secondary);
          border-bottom: 2px solid var(--bg-primary);
        }
        .tab-btn {
          flex: 1;
          padding: 8px;
          background: var(--bg-secondary);
          border: none;
          color: var(--text-primary);
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          transition: background 0.2s ease, color 0.2s ease;
        }
        .tab-btn.active,
        .tab-btn:hover {
          background: var(--bg-tertiary);
          color: var(--accent1);
        }
        .tab-content {
          flex: 1;
          padding: 12px;
          overflow: auto;
          background: var(--bg-tertiary);
        }

        /* Mixer */
        #mm-mixer h3 { margin-top: 0; color: var(--accent1); }
        .mixer-channel {
          display: flex;
          align-items: center;
          background: var(--bg-secondary);
          padding: 6px;
          border-radius: 4px;
          margin-bottom: 12px;
          position: relative;
        }
        .mixer-channel label {
          flex: 1;
          font-size: 14px;
          color: var(--text-primary);
        }
        .mixer-channel input[type="range"] {
          flex: 2;
          -webkit-appearance: none;
          width: 100%;
          height: 4px;
          background: var(--bg-tertiary);
          border-radius: 4px;
          outline: none;
          margin: 0 8px;
        }
        .mixer-channel input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 12px;
          height: 12px;
          background: var(--accent1);
          border-radius: 50%;
          cursor: pointer;
        }
        .mixer-channel select {
          background: var(--bg-tertiary);
          color: var(--text-primary);
          border: 1px solid var(--bg-primary);
          border-radius: 4px;
          padding: 4px;
          margin-left: 8px;
        }
        .fx-params label {
          font-size: 12px;
          color: var(--text-primary);
          margin-right: 4px;
        }
        .fx-params input[type="range"] {
          width: 60px;
          margin-right: 8px;
          background: var(--bg-tertiary);
        }
        .channel-options {
          display: none;
          position: absolute;
          top: 4px;
          right: 4px;
          gap: 4px;
        }
        .channel-options button {
          background: var(--bg-tertiary);
          border: 1px solid var(--bg-primary);
          color: var(--text-primary);
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 12px;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        .channel-options button:hover { background: var(--bg-secondary); }
        .mixer-channel:hover .channel-options { display: flex; }

        /* Level meter */
        .level-meter {
          width: 8px;
          height: 32px;
          background: var(--bg-primary);
          border-radius: 2px;
          margin-left: 8px;
          overflow: hidden;
          position: relative;
        }
        .level-meter-fill {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: var(--accent2);
          height: 0%;
        }

        /* Sample Browser */
        #mm-samples h3 { margin-top: 0; color: var(--accent1); }
        .sample-list {
          margin-top: 12px;
          max-height: calc(100% - 60px);
          overflow: auto;
        }
        .sample-item {
          display: flex;
          align-items: center;
          background: var(--bg-secondary);
          padding: 8px;
          margin-bottom: 6px;
          border-radius: 4px;
          border: 1px solid var(--bg-primary);
          cursor: grab;
          user-select: none;
        }
        .sample-item:hover { background: var(--bg-tertiary); }
        .sample-item span {
          flex: 1;
          font-size: 14px;
          color: var(--text-primary);
          word-break: break-all;
        }

        /* Playlist */
        #mm-playlist h3 { margin-top: 0; color: var(--accent1); }
        .playlist-grid {
          position: relative;
          display: grid;
          grid-template-columns: repeat(64, 1fr);
          grid-auto-rows: 40px;
          gap: 2px;
          background: var(--bg-secondary);
          padding: 4px;
          user-select: none;
        }
        .playlist-label {
          grid-column: 1 / 2;
          background: var(--bg-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
          font-size: 12px;
        }
        .playlist-cell {
          background: var(--bg-tertiary);
          border-radius: 4px;
          position: relative;
        }
        .pattern-clip {
          position: absolute;
          top: 0;
          height: 100%;
          background: var(--highlight);
          border: 1px solid var(--accent1);
          border-radius: 4px;
          cursor: move;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          color: #fff;
          user-select: none;
        }

        /* Plugins */
        #mm-plugins h3 { margin-top: 0; color: var(--accent1); }
        .mm-plugin {
          border: 1px solid var(--bg-primary);
          border-radius: 4px;
          padding: 10px;
          margin-bottom: 12px;
          background: var(--bg-secondary);
        }
        .mm-plugin h4 {
          margin: 0 0 6px 0;
          font-size: 16px;
          color: var(--accent1);
        }
        .mm-plugin p {
          margin: 0;
          font-size: 14px;
          color: var(--text-primary);
        }
        .plugin-btn {
          margin-top: 8px;
          padding: 6px 12px;
          background: var(--accent2);
          border: none;
          border-radius: 4px;
          cursor: pointer;
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          transition: background 0.2s ease;
        }
        .plugin-btn:hover { background: #229954; }

        /* Hidden file inputs */
        #mm-sample-input,
        #mm-project-input {
          display: none;
        }
      </style>

      <div id="mm-container" data-theme="dark">
        <!-- TOP BAR -->
        <div id="mm-top-bar">
          <div class="menu-group">
            <button class="menu-btn" id="mm-new">New</button>
            <button class="menu-btn" id="mm-save">Save Project</button>
            <button class="menu-btn" id="mm-load">Load Project</button>
          </div>
          <div class="menu-group">
            <button class="menu-btn" id="mm-undo">Undo</button>
            <button class="menu-btn" id="mm-redo">Redo</button>
          </div>
          <div class="menu-group">
            <button class="menu-btn" id="mm-toggle-theme">Toggle Theme</button>
          </div>
          <div id="mm-transport">
            <button class="transport-btn" id="mm-play">Play ▶️</button>
            <button class="transport-btn" id="mm-stop">Stop ⏹</button>
            <button class="transport-btn" id="mm-metronome">Metronome Off</button>
            <label for="mm-tempo" style="color:var(--text-primary); margin:0 4px; font-weight:600;">
              Tempo:
            </label>
            <input id="mm-tempo" type="number" min="40" max="300" value="140" />
            <div id="mm-beat-indicator"></div>
          </div>
        </div>

        <!-- MAIN AREA -->
        <div id="mm-main">
          <!-- LEFT COLUMN -->
          <div id="mm-left-col">
            <!-- PATTERN BAR -->
            <div id="mm-pattern-bar">
              <label for="mm-pattern-select" style="font-weight:600; color:var(--text-primary); margin-right:8px;">
                Pattern:
              </label>
              <select id="mm-pattern-select">
                ${[...Array(this._patternCount)].map((_, i) => `<option value="${i}">Pattern ${i + 1}</option>`).join('')}
              </select>
              <button class="pattern-nav-btn" id="mm-prev-pattern">Prev</button>
              <button class="pattern-nav-btn" id="mm-next-pattern">Next</button>
            </div>

            <!-- CHANNEL RACK -->
            <div id="mm-channel-rack"></div>

            <!-- STEP SEQUENCER -->
            <div id="mm-step-seq"></div>

            <!-- PIANO ROLL (hidden by default) -->
            <div id="mm-piano-roll">
              <div class="pr-header">
                <h3>Piano Roll</h3>
                <button id="mm-close-pr">Close</button>
              </div>
              <div id="mm-pr-content"></div>
            </div>
          </div>

          <!-- RIGHT COLUMN -->
          <div id="mm-right-col">
            <!-- TABS -->
            <div id="mm-tabs">
              <button class="tab-btn active" data-tab="mixer">Mixer</button>
              <button class="tab-btn" data-tab="samples">Samples</button>
              <button class="tab-btn" data-tab="playlist">Playlist</button>
              <button class="tab-btn" data-tab="plugins">Plugins</button>
            </div>
            <div id="mm-mixer" class="tab-content"></div>
            <div id="mm-samples" class="tab-content" style="display:none;"></div>
            <div id="mm-playlist" class="tab-content" style="display:none;"></div>
            <div id="mm-plugins" class="tab-content" style="display:none;"></div>
          </div>
        </div>

        <!-- Hidden File Inputs -->
        <input type="file" id="mm-sample-input" accept="audio/*" />
        <input type="file" id="mm-project-input" accept=".json" />
      </div>
    `;
  }

  // ─────────────────────────────────────────────────────────────────────────────────────────
  // INITIALIZE: AudioContext, UI Bindings, Default Channels, Metronome, etc.
  static async _initialize() {
    // Create AudioContext & Master Gain
    this._audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this._masterGain = this._audioContext.createGain();
    this._masterGain.gain.value = this._masterVolume;
    this._masterGain.connect(this._audioContext.destination);

    // Create Metronome Osc + Gain
    this._metronomeOsc = this._audioContext.createOscillator();
    this._metronomeOsc.type = 'square';
    this._metronomeGain = this._audioContext.createGain();
    this._metronomeGain.gain.value = 0;
    this._metronomeOsc.connect(this._metronomeGain);
    this._metronomeGain.connect(this._masterGain);
    this._metronomeOsc.start();

    // UI References
    this._tempoInput      = this._container.querySelector('#mm-tempo');
    this._playBtn         = this._container.querySelector('#mm-play');
    this._stopBtn         = this._container.querySelector('#mm-stop');
    this._metBtn          = this._container.querySelector('#mm-metronome');
    this._patternSelect   = this._container.querySelector('#mm-pattern-select');
    this._prevPatternBtn  = this._container.querySelector('#mm-prev-pattern');
    this._nextPatternBtn  = this._container.querySelector('#mm-next-pattern');
    this._channelRack     = this._container.querySelector('#mm-channel-rack');
    this._stepSeq         = this._container.querySelector('#mm-step-seq');
    this._prModal         = this._container.querySelector('#mm-piano-roll');
    this._prContent       = this._container.querySelector('#mm-pr-content');
    this._closePrBtn      = this._container.querySelector('#mm-close-pr');
    this._tabs            = this._container.querySelectorAll('.tab-btn');
    this._mixerTab        = this._container.querySelector('#mm-mixer');
    this._samplesTab      = this._container.querySelector('#mm-samples');
    this._playlistTab     = this._container.querySelector('#mm-playlist');
    this._pluginsTab      = this._container.querySelector('#mm-plugins');
    this._sampleInput     = this._container.querySelector('#mm-sample-input');
    this._projectInput    = this._container.querySelector('#mm-project-input');
    this._undoBtn         = this._container.querySelector('#mm-undo');
    this._redoBtn         = this._container.querySelector('#mm-redo');
    this._newBtn          = this._container.querySelector('#mm-new');
    this._saveBtn         = this._container.querySelector('#mm-save');
    this._loadBtn         = this._container.querySelector('#mm-load');
    this._themeToggleBtn  = this._container.querySelector('#mm-toggle-theme');
    this._beatIndicator   = this._container.querySelector('#mm-beat-indicator');

    // Bind Events
    this._playBtn.addEventListener('click', () => this._togglePlay());
    this._stopBtn.addEventListener('click', () => this._stopScheduler());
    this._metBtn.addEventListener('click', () => this._toggleMetronome());

    this._tempoInput.addEventListener('change', (e) => {
      const v = parseInt(e.target.value, 10);
      if (!isNaN(v) && v >= 40 && v <= 300) {
        this._tempo = v;
        if (this._metronomeOn) {
          this._metronomeOsc.frequency.value = this._tempo / 60;
        }
      } else {
        e.target.value = this._tempo;
      }
    });

    this._patternSelect.addEventListener('change', (e) => {
      this._currentPattern = parseInt(e.target.value, 10);
      this._renderStepSequencer();
    });
    this._prevPatternBtn.addEventListener('click', () => {
      this._currentPattern = (this._currentPattern - 1 + this._patternCount) % this._patternCount;
      this._patternSelect.value = this._currentPattern;
      this._renderStepSequencer();
    });
    this._nextPatternBtn.addEventListener('click', () => {
      this._currentPattern = (this._currentPattern + 1) % this._patternCount;
      this._patternSelect.value = this._currentPattern;
      this._renderStepSequencer();
    });

    this._closePrBtn.addEventListener('click', () => {
      this._prModal.style.display = 'none';
      this._clearStepHighlights();
    });

    this._tabs.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        this._switchTab(e.currentTarget.dataset.tab);
      });
    });

    this._sampleInput.addEventListener('change', (e) => this._handleSampleUpload(e));
    this._newBtn.addEventListener('click', () => this._newProject());
    this._saveBtn.addEventListener('click', () => this._saveProject());
    this._loadBtn.addEventListener('click', () => {
      this._projectInput.value = '';
      this._projectInput.click();
    });
    this._projectInput.addEventListener('change', (e) => this._loadProject(e));

    this._undoBtn.addEventListener('click', () => this._undo());
    this._redoBtn.addEventListener('click', () => this._redo());
    this._themeToggleBtn.addEventListener('click', () => this._toggleTheme());

    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        this._togglePlay();
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        this._undo();
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        this._redo();
      }
    });

    // Initialize default channels
    for (let i = 0; i < 4; i++) {
      this._pushHistory();
      this._addChannel(`Channel ${i + 1}`);
    }

    // Initial pattern order: one occurrence of pattern 0
    this._patternsOrder = [0];
    this._renderChannelRack();
    this._renderStepSequencer();
    this._renderMixer();
    this._renderSamples();
    this._renderPlaylist();
    this._renderPlugins();
  }

  // ─────────────────────────────────────────────────────────────────────────────────────────
  // CLEANUP: stopAudio, disconnect, clear arrays
  static _cleanup() {
    if (this._isPlaying) this._stopScheduler();
    if (this._audioContext) {
      this._audioContext.close();
      this._audioContext = null;
    }
    this._channels.forEach((_, idx) => this._disconnectChannel(idx));
    this._channels = [];
    this._samples = [];
    this._plugins = [];
    this._undoStack = [];
    this._redoStack = [];
    this._patternsOrder = [];
  }

  // ─────────────────────────────────────────────────────────────────────────────────────────
  // NEW PROJECT: Reset all state
  static _newProject() {
    if (!confirm('Start a new project? All unsaved changes will be lost.')) return;
    this._pushHistory();
    this._channels.forEach((_, idx) => this._disconnectChannel(idx));
    this._channels = [];
    this._samples = [];
    this._patternsOrder = [0];
    this._currentPattern = 0;
    this._currentOrderPosition = 0;

    this._sampleInput.value = '';
    this._projectInput.value = '';
    this._patternSelect.value = 0;
    this._samplesTab.innerHTML = '';
    this._playlistTab.innerHTML = '';

    // Add default channels
    for (let i = 0; i < 4; i++) {
      this._addChannel(`Channel ${i + 1}`);
    }

    this._renderChannelRack();
    this._renderStepSequencer();
    this._renderMixer();
    this._renderSamples();
    this._renderPlaylist();
    this._renderPlugins();
  }

  // ─────────────────────────────────────────────────────────────────────────────────────────
  // UNDO / REDO (history stacks)
  static _pushHistory() {
    if (this._isApplyingHistory) return;

    const snapshot = {
      tempo: this._tempo,
      channels: JSON.parse(JSON.stringify(this._channels.map((ch) => ({
        name: ch.name,
        color: ch.color,
        muted: ch.muted,
        solo: ch.solo,
        patterns: ch.patterns.map((p) => ({
          sequence: [...p.sequence],
          velocity: [...p.velocity],
          notes: [...p.notes],
        })),
        samples: JSON.parse(JSON.stringify(ch.samples)),
        effects: ch.effects.map((eff) => {
          const base = { type: eff.type };
          if (eff.type === 'Delay') {
            base.time = eff.node.delayTime.value;
            base.feedback = eff.feedback.gain.value;
            base.wet = eff.wetGain.gain.value;
            base.dry = eff.dryGain.gain.value;
          }
          if (eff.type === 'Reverb') {
            base.wet = eff.wetGain.gain.value;
            base.dry = eff.dryGain.gain.value;
          }
          if (eff.type === 'Lowpass') {
            base.frequency = eff.node.frequency.value;
          }
          if (eff.type === 'Gate') {
            base.rate = eff.rate;
            base.depth = eff.depth;
          }
          if (eff.type === 'BeatRepeat') {
            base.beatLen = eff.beatLen;
            base.feedback = eff.feedback.gain.value;
            base.wet = eff.wetGain.gain.value;
            base.dry = eff.dryGain.gain.value;
          }
          return base;
        }),
        isPlugin: ch.isPlugin,
        pluginParams: { ...ch.pluginParams },
      })))),
      samples: this._samples.map((s) => ({ name: s.name, base64: s.base64 })),
      plugins: this._plugins.map((p) => p.name),
      patternOrder: [...this._patternsOrder],
      currentPattern: this._currentPattern,
      currentOrderPosition: this._currentOrderPosition,
    };

    this._undoStack.push(snapshot);
    this._redoStack = [];
  }

  static _applySnapshot(snapshot) {
    this._isApplyingHistory = true;

    // Tempo
    this._tempo = snapshot.tempo;
    this._tempoInput.value = this._tempo;

    // If channel count changed, skip undo
    if (snapshot.channels.length !== this._channels.length) {
      this._isApplyingHistory = false;
      return;
    }

    // Restore channels
    snapshot.channels.forEach((chObj, idx) => {
      const ch = this._channels[idx];
      ch.name = chObj.name;
      ch.color = chObj.color;
      ch.muted = chObj.muted;
      ch.solo = chObj.solo;
      ch.patterns = chObj.patterns.map((p) => ({
        sequence: [...p.sequence],
        velocity: [...p.velocity],
        notes: [...p.notes],
      }));
      ch.samples = JSON.parse(JSON.stringify(chObj.samples));

      // Remove existing effects
      ch.effects.forEach((eff) => {
        eff.node.disconnect();
        if (eff.feedback) eff.feedback.disconnect();
        if (eff.wetGain) eff.wetGain.disconnect();
        if (eff.dryGain) eff.dryGain.disconnect();
        if (eff.oscillator) eff.oscillator.disconnect();
      });
      ch.effects = [];

      // Recreate effects
      chObj.effects.forEach((eff) => this._setChannelEffect(idx, eff.type));
      const recreated = ch.effects;
      chObj.effects.forEach((eff, i) => {
        const c = recreated[i];
        if (eff.type === 'Delay') {
          c.node.delayTime.value = eff.time;
          c.feedback.gain.value = eff.feedback;
          c.wetGain.gain.value = eff.wet;
          c.dryGain.gain.value = eff.dry;
        }
        if (eff.type === 'Reverb') {
          c.wetGain.gain.value = eff.wet;
          c.dryGain.gain.value = eff.dry;
        }
        if (eff.type === 'Lowpass') {
          c.node.frequency.value = eff.frequency;
        }
        if (eff.type === 'Gate') {
          c.rate = eff.rate;
          c.depth = eff.depth;
          c.oscillator.frequency.value = eff.rate;
        }
        if (eff.type === 'BeatRepeat') {
          c.beatLen = eff.beatLen;
          c.node.delayTime.value = (60 / this._tempo) * eff.beatLen;
          c.feedback.gain.value = eff.feedback;
          c.wetGain.gain.value = eff.wet;
          c.dryGain.gain.value = eff.dry;
        }
      });

      ch.isPlugin = chObj.isPlugin;
      ch.pluginParams = { ...chObj.pluginParams };
      ch.notes = [...chObj.patterns[this._currentPattern].notes];
    });

    this._samples = snapshot.samples.map((s) => ({
      name: s.name,
      base64: s.base64,
      audioBuffer: null,
    }));
    this._plugins = []; // Plugins need re-registration

    this._patternsOrder = [...snapshot.patternOrder];
    this._currentPattern = snapshot.currentPattern;
    this._currentOrderPosition = snapshot.currentOrderPosition;

    this._renderChannelRack();
    this._renderStepSequencer();
    this._renderMixer();
    this._renderSamples();
    this._renderPlaylist();
    this._renderPlugins();

    this._isApplyingHistory = false;
  }

  static _undo() {
    if (this._undoStack.length === 0) return;
    const snap = this._undoStack.pop();
    this._redoStack.push(snap);
    this._applySnapshot(snap);
  }

  static _redo() {
    if (this._redoStack.length === 0) return;
    const snap = this._redoStack.pop();
    this._undoStack.push(snap);
    this._applySnapshot(snap);
  }

  // ─────────────────────────────────────────────────────────────────────────────────────────
  // TOGGLE THEME
  static _toggleTheme() {
    this._theme = this._theme === 'dark' ? 'light' : 'dark';
    this._container.setAttribute('data-theme', this._theme);
  }

  // ─────────────────────────────────────────────────────────────────────────────────────────
  // SWITCH RIGHT-PANE TAB
  static _switchTab(tab) {
    this._tabs.forEach((btn) => {
      if (btn.dataset.tab === tab) btn.classList.add('active');
      else btn.classList.remove('active');
    });
    this._mixerTab.style.display    = tab === 'mixer' ? 'block' : 'none';
    this._samplesTab.style.display  = tab === 'samples' ? 'block' : 'none';
    this._playlistTab.style.display = tab === 'playlist' ? 'block' : 'none';
    this._pluginsTab.style.display  = tab === 'plugins' ? 'block' : 'none';
  }

  // ─────────────────────────────────────────────────────────────────────────────────────────
  // ADD A CHANNEL (up to max)
  static _addChannel(defaultName = `Channel ${this._channels.length + 1}`) {
    if (this._channels.length >= this._maxChannels) {
      alert('Maximum channels reached.');
      return;
    }
    this._pushHistory();

    // Channel audio nodes: gain → pan → masterGain
    const gainNode = this._audioContext.createGain();
    gainNode.gain.value = 1.0;
    const panNode = this._audioContext.createStereoPanner();
    panNode.pan.value = 0;
    gainNode.connect(panNode);
    panNode.connect(this._masterGain);

    // Analyser for meter
    const analyser = this._audioContext.createAnalyser();
    analyser.fftSize = 256;
    gainNode.connect(analyser);
    analyser.connect(this._masterGain);

    // Initialize patterns
    const patterns = [];
    for (let p = 0; p < this._patternCount; p++) {
      patterns.push({
        sequence: new Array(this._stepsPerBar).fill(0),
        velocity: new Array(this._stepsPerBar).fill(1.0),
        notes: [], // ["midi-step", ...]
      });
    }

    const channel = {
      name: defaultName,
      color: '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0'),
      muted: false,
      solo: false,
      gainNode,
      panNode,
      analyser,
      patterns,
      samples: {},    // { patternIdx: { step: sampleIdx } }
      effects: [],    // { type, node, feedback?, wetGain?, dryGain?, oscillator?, rate?, depth? }
      isPlugin: false,
      pluginInstance: null,
      pluginParams: {},
      notes: [],      // mirrored in patterns[currentPattern].notes
    };

    this._channels.push(channel);
    this._renderChannelRack();
    this._renderStepSequencer();
    this._renderMixer();
  }

  // ─────────────────────────────────────────────────────────────────────────────────────────
  // RENDER CHANNEL RACK (left-pane list of channels)
  static _renderChannelRack() {
    const container = this._channelRack;
    container.innerHTML = '';

    this._channels.forEach((ch, idx) => {
      const row = document.createElement('div');
      row.classList.add('mm-channel');
      row.dataset.idx = idx;

      // Color picker dot
      const colorDot = document.createElement('div');
      colorDot.classList.add('channel-color');
      colorDot.style.backgroundColor = ch.color;
      colorDot.addEventListener('click', () => {
        const cp = document.createElement('input');
        cp.type = 'color';
        cp.value = ch.color;
        cp.style.display = 'none';
        cp.addEventListener('input', (e) => {
          ch.color = e.target.value;
          this._renderChannelRack();
          this._renderStepSequencer();
          this._renderPlaylist();
        });
        document.body.appendChild(cp);
        cp.click();
        cp.remove();
      });
      row.appendChild(colorDot);

      // Channel name input
      const nameInput = document.createElement('input');
      nameInput.classList.add('channel-name');
      nameInput.type = 'text';
      nameInput.value = ch.name;
      nameInput.addEventListener('change', (e) => {
        ch.name = e.target.value.trim() || `Channel ${idx + 1}`;
        this._renderMixer();
        this._renderChannelRack();
        this._renderPlaylist();
      });
      row.appendChild(nameInput);

      // Plugin button
      const pluginBtn = document.createElement('button');
      pluginBtn.classList.add('channel-button');
      pluginBtn.textContent = 'Plugin';
      pluginBtn.addEventListener('click', () => {
        alert('Switch to the "Plugins" tab to register and load a plugin for this channel.');
      });
      row.appendChild(pluginBtn);

      // Piano Roll button
      const prBtn = document.createElement('button');
      prBtn.classList.add('channel-button');
      prBtn.textContent = 'Piano Roll';
      prBtn.addEventListener('click', () => {
        this._openPianoRoll(idx);
      });
      row.appendChild(prBtn);

      // Remove channel button
      const removeBtn = document.createElement('button');
      removeBtn.classList.add('channel-button', 'remove-channel');
      removeBtn.textContent = '✖';
      removeBtn.addEventListener('click', () => {
        this._pushHistory();
        this._removeChannel(idx);
      });
      row.appendChild(removeBtn);

      // Mute button
      const muteBtn = document.createElement('button');
      muteBtn.classList.add('channel-button');
      muteBtn.textContent = ch.muted ? 'Unmute' : 'Mute';
      muteBtn.addEventListener('click', () => {
        this._pushHistory();
        ch.muted = !ch.muted;
        muteBtn.textContent = ch.muted ? 'Unmute' : 'Mute';
        this._updateChannelGain(idx);
      });
      row.appendChild(muteBtn);

      // Solo button
      const soloBtn = document.createElement('button');
      soloBtn.classList.add('channel-button');
      soloBtn.textContent = ch.solo ? 'Unsolo' : 'Solo';
      soloBtn.addEventListener('click', () => {
        this._pushHistory();
        ch.solo = !ch.solo;
        soloBtn.textContent = ch.solo ? 'Unsolo' : 'Solo';
        this._updateSoloStates();
      });
      row.appendChild(soloBtn);

      container.appendChild(row);
    });

    // “Add Channel” button at bottom
    const addBtn = document.createElement('button');
    addBtn.classList.add('channel-button');
    addBtn.textContent = '+ Add Channel';
    addBtn.style.marginTop = '8px';
    addBtn.addEventListener('click', () => {
      this._pushHistory();
      this._addChannel();
    });
    container.appendChild(addBtn);
  }

  // ─────────────────────────────────────────────────────────────────────────────────────────
  // REMOVE A CHANNEL
  static _removeChannel(idx) {
    if (idx < 0 || idx >= this._channels.length) return;
    this._disconnectChannel(idx);
    this._channels.splice(idx, 1);
    this._renderChannelRack();
    this._renderStepSequencer();
    this._renderMixer();
    this._renderPlaylist();
  }

  static _disconnectChannel(idx) {
    const ch = this._channels[idx];
    if (!ch) return;
    ch.gainNode.disconnect();
    ch.panNode.disconnect();
    ch.analyser.disconnect();
    ch.effects.forEach((eff) => {
      eff.node.disconnect();
      if (eff.feedback) eff.feedback.disconnect();
      if (eff.wetGain) eff.wetGain.disconnect();
      if (eff.dryGain) eff.dryGain.disconnect();
      if (eff.oscillator) eff.oscillator.disconnect();
    });
    if (ch.pluginInstance && ch.pluginInstance.cleanup) ch.pluginInstance.cleanup();
  }

  // ─────────────────────────────────────────────────────────────────────────────────────────
  // UPDATE CHANNEL GAIN (mute/solo logic)
  static _updateChannelGain(idx) {
    const ch = this._channels[idx];
    const anySolo = this._channels.some((c) => c.solo);
    const isSilent = ch.muted || (anySolo && !ch.solo);
    ch.gainNode.gain.value = isSilent ? 0 : 1.0;
  }

  static _updateSoloStates() {
    this._channels.forEach((_, i) => this._updateChannelGain(i));
    this._renderMixer();
  }

  // ─────────────────────────────────────────────────────────────────────────────────────────
  // RENDER STEP SEQUENCER
  static _renderStepSequencer() {
    const container = this._stepSeq;
    container.innerHTML = '';

    // Header row (step numbers)
    const header = document.createElement('div');
    header.classList.add('step-header');
    header.style.setProperty('--steps', this._stepsPerBar);
    const dummy = document.createElement('div');
    dummy.classList.add('label-cell');
    header.appendChild(dummy);

    for (let s = 0; s < this._stepsPerBar; s++) {
      const span = document.createElement('span');
      span.textContent = s;
      header.appendChild(span);
    }
    container.appendChild(header);

    // Each channel row
    this._channels.forEach((ch, chIdx) => {
      const row = document.createElement('div');
      row.classList.add('step-row');
      row.style.setProperty('--steps', this._stepsPerBar);

      // Label cell (color dot + name)
      const labelCell = document.createElement('div');
      labelCell.classList.add('step-label');
      const dot = document.createElement('div');
      dot.classList.add('color-dot');
      dot.style.backgroundColor = ch.color;
      labelCell.appendChild(dot);
      const txt = document.createElement('span');
      txt.textContent = ch.name;
      labelCell.appendChild(txt);
      row.appendChild(labelCell);

      // Step cells
      for (let s = 0; s < this._stepsPerBar; s++) {
        const cellWrapper = document.createElement('div');
        cellWrapper.style.position = 'relative';

        const cell = document.createElement('div');
        cell.classList.add('step-cell');
        cell.dataset.channel = chIdx;
        cell.dataset.step = s;

        // Active if sequence = 1
        if (ch.patterns[this._currentPattern].sequence[s]) {
          cell.classList.add('active');
        }

        // If sample assigned or note present, add colored outline
        const hasSample = ch.samples[this._currentPattern]?.[s] !== undefined;
        const hasNote = ch.patterns[this._currentPattern].notes.some((key) => key.endsWith(`-${s}`));
        if ((!ch.isPlugin && hasSample) || (ch.isPlugin && hasNote)) {
          cell.style.boxShadow = `0 0 0 2px ${ch.color}`;
        }

        // Click toggles step on/off
        cell.addEventListener('click', () => {
          this._pushHistory();
          const patt = this._channels[chIdx].patterns[this._currentPattern].sequence;
          patt[s] = patt[s] ? 0 : 1;
          cell.classList.toggle('active');
        });

        // Drag-over & drop (for sample assignment)
        cell.addEventListener('dragover', (e) => {
          e.preventDefault();
          cell.classList.add('drag-over');
        });
        cell.addEventListener('dragleave', () => {
          cell.classList.remove('drag-over');
        });
        cell.addEventListener('drop', (e) => {
          e.preventDefault();
          cell.classList.remove('drag-over');
          const sampleIdx = parseInt(e.dataTransfer.getData('text/plain'), 10);
          this._pushHistory();
          this._assignSample(chIdx, this._currentPattern, s, sampleIdx);
        });

        // Hover waveform preview
        cell.addEventListener('mouseenter', () => {
          if (!ch.isPlugin && hasSample) {
            const sampleIndex = ch.samples[this._currentPattern][s];
            const buffer = this._samples[sampleIndex].audioBuffer;
            this._showWaveform(buffer, cell);
          }
        });
        cell.addEventListener('mouseleave', () => {
          this._removeWaveform();
        });

        // Velocity slider at bottom
        const velWrap = document.createElement('div');
        velWrap.classList.add('vel-slider');
        const velInput = document.createElement('input');
        velInput.type = 'range';
        velInput.min = '0';
        velInput.max = '1';
        velInput.step = '0.01';
        velInput.value = ch.patterns[this._currentPattern].velocity[s];
        velInput.dataset.channel = chIdx;
        velInput.dataset.step = s;
        velInput.addEventListener('input', (e) => {
          this._pushHistory();
          const c = parseInt(e.target.dataset.channel, 10);
          const st = parseInt(e.target.dataset.step, 10);
          this._channels[c].patterns[this._currentPattern].velocity[st] = parseFloat(e.target.value);
        });
        velWrap.appendChild(velInput);

        cellWrapper.appendChild(cell);
        cellWrapper.appendChild(velWrap);
        row.appendChild(cellWrapper);
      }

      container.appendChild(row);
    });
  }

  // ─────────────────────────────────────────────────────────────────────────────────────────
  // SHOW WAVEFORM PREVIEW OVER A STEP CELL
  static _showWaveform(audioBuffer, cell) {
    this._removeWaveform();
    const canvas = document.createElement('canvas');
    canvas.width = cell.clientWidth;
    canvas.height = 40;
    canvas.style.position = 'absolute';
    canvas.style.bottom = '100%';
    canvas.style.left = '0';
    canvas.style.background = 'var(--bg-primary)';
    canvas.style.border = '1px solid var(--bg-primary)';
    cell.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    const data = audioBuffer.getChannelData(0);
    const step = Math.floor(data.length / canvas.width);
    ctx.fillStyle = 'var(--accent1)';
    for (let i = 0; i < canvas.width; i++) {
      const sample = data[i * step];
      const y = ((1 - sample) / 2) * canvas.height;
      ctx.fillRect(i, y, 1, Math.max(1, canvas.height - y));
    }
    this._waveCanvas = canvas;
  }

  static _removeWaveform() {
    if (this._waveCanvas) {
      this._waveCanvas.remove();
      this._waveCanvas = null;
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────────────────
  // ASSIGN SAMPLE TO CHANNEL / PATTERN / STEP
  static _assignSample(chIdx, patIdx, step, sampleIdx) {
    if (!this._channels[chIdx].samples[patIdx]) {
      this._channels[chIdx].samples[patIdx] = {};
    }
    this._channels[chIdx].samples[patIdx][step] = sampleIdx;
    this._channels[chIdx].patterns[patIdx].sequence[step] = 1;
    this._renderStepSequencer();
  }

  // ─────────────────────────────────────────────────────────────────────────────────────────
  // RENDER MIXER (per-channel fader, pan, effects, level meter)
  static _renderMixer() {
    const container = this._mixerTab;
    container.innerHTML = '<h3>Mixer</h3>';

    this._channels.forEach((ch, idx) => {
      const wrapper = document.createElement('div');
      wrapper.classList.add('mixer-channel');

      // Channel Label
      const label = document.createElement('label');
      label.textContent = ch.name;
      wrapper.appendChild(label);

      // Volume fader
      const volSlider = document.createElement('input');
      volSlider.type = 'range';
      volSlider.min = '0';
      volSlider.max = '1';
      volSlider.step = '0.01';
      volSlider.value = 1.0;
      volSlider.dataset.idx = idx;
      volSlider.addEventListener('input', (e) => {
        this._channels[idx].gainNode.gain.value = parseFloat(e.target.value);
      });
      wrapper.appendChild(volSlider);

      // Pan knob
      const panSlider = document.createElement('input');
      panSlider.type = 'range';
      panSlider.min = '-1';
      panSlider.max = '1';
      panSlider.step = '0.01';
      panSlider.value = 0;
      panSlider.dataset.idx = idx;
      panSlider.addEventListener('input', (e) => {
        this._channels[idx].panNode.pan.value = parseFloat(e.target.value);
      });
      wrapper.appendChild(panSlider);

      // Effect slot selector
      const effSelect = document.createElement('select');
      effSelect.dataset.idx = idx;
      ['None', 'Delay', 'Reverb', 'Lowpass', 'Gate', 'BeatRepeat'].forEach((opt) => {
        const o = document.createElement('option');
        o.value = opt;
        o.textContent = opt;
        if (ch.effects.some((e) => e.type === opt)) o.selected = true;
        effSelect.appendChild(o);
      });
      effSelect.addEventListener('change', (e) => {
        this._pushHistory();
        this._setChannelEffect(idx, e.target.value);
        this._renderMixer();
      });
      wrapper.appendChild(effSelect);

      // Effect parameters container
      const paramsDiv = document.createElement('div');
      paramsDiv.classList.add('fx-params');
      paramsDiv.dataset.idx = idx;
      wrapper.appendChild(paramsDiv);

      // Channel options: Load Plugin, level meter
      const optionsDiv = document.createElement('div');
      optionsDiv.classList.add('channel-options');

      const loadPluginBtn = document.createElement('button');
      loadPluginBtn.textContent = 'Plugin';
      loadPluginBtn.addEventListener('click', () => {
        alert('Switch to the "Plugins" tab to load a plugin and assign to this channel.');
      });
      optionsDiv.appendChild(loadPluginBtn);

      const lvMeter = document.createElement('div');
      lvMeter.classList.add('level-meter');
      const meterFill = document.createElement('div');
      meterFill.classList.add('level-meter-fill');
      lvMeter.appendChild(meterFill);
      optionsDiv.appendChild(lvMeter);

      wrapper.appendChild(optionsDiv);
      container.appendChild(wrapper);

      // Animate level meter
      this._animateLevelMeter(idx, meterFill);

      // Render effect parameters
      this._renderEffectParams(idx);
    });
  }

  // ─────────────────────────────────────────────────────────────────────────────────────────
  // ANIMATE LEVEL METER USING AnalyserNode
  static _animateLevelMeter(idx, meterFill) {
    const ch = this._channels[idx];
    const analyser = ch.analyser;
    const dataArr = new Uint8Array(analyser.frequencyBinCount);

    const update = () => {
      if (!this._isPlaying) {
        meterFill.style.height = '0%';
        return;
      }
      analyser.getByteFrequencyData(dataArr);
      let max = 0;
      for (let i = 0; i < dataArr.length; i++) {
        if (dataArr[i] > max) max = dataArr[i];
      }
      const percent = (max / 255) * 100;
      meterFill.style.height = `${percent}%`;
      requestAnimationFrame(update);
    };
    update();
  }

  // ─────────────────────────────────────────────────────────────────────────────────────────
  // RENDER EFFECT PARAMETERS FOR A CHANNEL
  static _renderEffectParams(idx) {
    const ch = this._channels[idx];
    const container = this._mixerTab.querySelector(`.fx-params[data-idx="${idx}"]`);
    container.innerHTML = '';

    if (!ch.effects.length) return;

    const e = ch.effects[0];
    if (e.type === 'Delay') {
      const tLabel = document.createElement('label');
      tLabel.textContent = 'Time:';
      tLabel.style.color = 'var(--text-primary)';
      const tInput = document.createElement('input');
      tInput.type = 'range';
      tInput.min = '0';
      tInput.max = '1';
      tInput.step = '0.01';
      tInput.value = e.node.delayTime.value;
      tInput.addEventListener('input', (evt) => {
        e.node.delayTime.value = parseFloat(evt.target.value);
      });
      container.appendChild(tLabel);
      container.appendChild(tInput);

      const fbLabel = document.createElement('label');
      fbLabel.textContent = 'FB:';
      fbLabel.style.color = 'var(--text-primary)';
      const fbInput = document.createElement('input');
      fbInput.type = 'range';
      fbInput.min = '0';
      fbInput.max = '0.95';
      fbInput.step = '0.01';
      fbInput.value = e.feedback.gain.value;
      fbInput.addEventListener('input', (evt) => {
        e.feedback.gain.value = parseFloat(evt.target.value);
      });
      container.appendChild(fbLabel);
      container.appendChild(fbInput);
    } else if (e.type === 'Reverb') {
      const wLabel = document.createElement('label');
      wLabel.textContent = 'Wet:';
      wLabel.style.color = 'var(--text-primary)';
      const wInput = document.createElement('input');
      wInput.type = 'range';
      wInput.min = '0';
      wInput.max = '1';
      wInput.step = '0.01';
      wInput.value = e.wetGain.gain.value;
      wInput.addEventListener('input', (evt) => {
        e.wetGain.gain.value = parseFloat(evt.target.value);
      });
      container.appendChild(wLabel);
      container.appendChild(wInput);
    } else if (e.type === 'Lowpass') {
      const fLabel = document.createElement('label');
      fLabel.textContent = 'Cutoff:';
      fLabel.style.color = 'var(--text-primary)';
      const fInput = document.createElement('input');
      fInput.type = 'range';
      fInput.min = '100';
      fInput.max = (this._audioContext.sampleRate / 2).toString();
      fInput.step = '100';
      fInput.value = e.node.frequency.value;
      fInput.addEventListener('input', (evt) => {
        e.node.frequency.value = parseFloat(evt.target.value);
      });
      container.appendChild(fLabel);
      container.appendChild(fInput);
    } else if (e.type === 'Gate') {
      const rLabel = document.createElement('label');
      rLabel.textContent = 'Rate (Hz):';
      rLabel.style.color = 'var(--text-primary)';
      const rInput = document.createElement('input');
      rInput.type = 'range';
      rInput.min = '0.1';
      rInput.max = '20';
      rInput.step = '0.1';
      rInput.value = e.rate;
      rInput.addEventListener('input', (evt) => {
        e.rate = parseFloat(evt.target.value);
        e.oscillator.frequency.value = e.rate;
      });
      container.appendChild(rLabel);
      container.appendChild(rInput);

      const dLabel = document.createElement('label');
      dLabel.textContent = 'Depth:';
      dLabel.style.color = 'var(--text-primary)';
      const dInput = document.createElement('input');
      dInput.type = 'range';
      dInput.min = '0';
      dInput.max = '1';
      dInput.step = '0.01';
      dInput.value = e.depth;
      dInput.addEventListener('input', (evt) => {
        e.depth = parseFloat(evt.target.value);
        e.node.gain.value = e.depth;
      });
      container.appendChild(dLabel);
      container.appendChild(dInput);
    } else if (e.type === 'BeatRepeat') {
      const blLabel = document.createElement('label');
      blLabel.textContent = 'Len (beats):';
      blLabel.style.color = 'var(--text-primary)';
      const blInput = document.createElement('input');
      blInput.type = 'range';
      blInput.min = '0.25';
      blInput.max = '4';
      blInput.step = '0.25';
      blInput.value = e.beatLen;
      blInput.addEventListener('input', (evt) => {
        e.beatLen = parseFloat(evt.target.value);
        e.node.delayTime.value = (60 / this._tempo) * e.beatLen;
      });
      container.appendChild(blLabel);
      container.appendChild(blInput);

      const fb2Label = document.createElement('label');
      fb2Label.textContent = 'FB:';
      fb2Label.style.color = 'var(--text-primary)';
      const fb2Input = document.createElement('input');
      fb2Input.type = 'range';
      fb2Input.min = '0';
      fb2Input.max = '0.95';
      fb2Input.step = '0.01';
      fb2Input.value = e.feedback.gain.value;
      fb2Input.addEventListener('input', (evt) => {
        e.feedback.gain.value = parseFloat(evt.target.value);
      });
      container.appendChild(fb2Label);
      container.appendChild(fb2Input);
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────────────────
  // SET CHANNEL EFFECT (one slot per channel for simplicity)
  static _setChannelEffect(idx, effectName) {
    const ch = this._channels[idx];

    // Disconnect existing effects
    ch.gainNode.disconnect();
    ch.effects.forEach((eff) => {
      eff.node.disconnect();
      if (eff.feedback) eff.feedback.disconnect();
      if (eff.wetGain) eff.wetGain.disconnect();
      if (eff.dryGain) eff.dryGain.disconnect();
      if (eff.oscillator) eff.oscillator.disconnect();
    });
    ch.effects = [];

    switch (effectName) {
      case 'Delay': {
        const delayNode = this._audioContext.createDelay(4.0);
        delayNode.delayTime.value = 0.25;
        const feedback = this._audioContext.createGain();
        feedback.gain.value = 0.3;
        const wetGain = this._audioContext.createGain();
        wetGain.gain.value = 0.4;
        const dryGain = this._audioContext.createGain();
        dryGain.gain.value = 0.6;

        delayNode.connect(feedback);
        feedback.connect(delayNode);
        delayNode.connect(wetGain);
        wetGain.connect(ch.panNode);

        ch.gainNode.connect(delayNode);
        ch.gainNode.connect(dryGain);
        dryGain.connect(ch.panNode);

        ch.effects.push({
          type: 'Delay',
          node: delayNode,
          feedback,
          wetGain,
          dryGain,
        });
        break;
      }
      case 'Reverb': {
        const convolver = this._audioContext.createConvolver();
        const len = this._audioContext.sampleRate;
        const irBuffer = this._audioContext.createBuffer(2, len, this._audioContext.sampleRate);
        for (let chn = 0; chn < 2; chn++) {
          const data = irBuffer.getChannelData(chn);
          for (let i = 0; i < len; i++) {
            data[i] = (Math.random() * 2 - 1) * (1 - i / len) * 0.2;
          }
        }
        convolver.buffer = irBuffer;

        const wetGain = this._audioContext.createGain();
        wetGain.gain.value = 0.3;
        const dryGain = this._audioContext.createGain();
        dryGain.gain.value = 0.7;

        ch.gainNode.connect(convolver);
        convolver.connect(wetGain);
        wetGain.connect(ch.panNode);
        ch.gainNode.connect(dryGain);
        dryGain.connect(ch.panNode);

        ch.effects.push({
          type: 'Reverb',
          node: convolver,
          wetGain,
          dryGain,
        });
        break;
      }
      case 'Lowpass': {
        const filter = this._audioContext.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 800;
        ch.gainNode.connect(filter);
        filter.connect(ch.panNode);
        ch.effects.push({
          type: 'Lowpass',
          node: filter,
        });
        break;
      }
      case 'Gate': {
        const gateGain = this._audioContext.createGain();
        gateGain.gain.value = 0;
        const osc = this._audioContext.createOscillator();
        osc.type = 'square';
        const rate = this._tempo / 60; // 1 Hz = quarter-note
        osc.frequency.value = rate;
        osc.connect(gateGain.gain);
        ch.gainNode.connect(gateGain);
        gateGain.connect(ch.panNode);
        osc.start();
        ch.effects.push({
          type: 'Gate',
          node: gateGain,
          oscillator: osc,
          rate,
          depth: 1,
        });
        break;
      }
      case 'BeatRepeat': {
        const delayNode = this._audioContext.createDelay(4.0);
        const beatLen = 1; // 1 bar
        delayNode.delayTime.value = (60 / this._tempo) * beatLen;
        const feedback = this._audioContext.createGain();
        feedback.gain.value = 0.5;
        const wetGain = this._audioContext.createGain();
        wetGain.gain.value = 0.6;
        const dryGain = this._audioContext.createGain();
        dryGain.gain.value = 0.4;

        delayNode.connect(feedback);
        feedback.connect(delayNode);
        delayNode.connect(wetGain);
        wetGain.connect(ch.panNode);

        ch.gainNode.connect(delayNode);
        ch.gainNode.connect(dryGain);
        dryGain.connect(ch.panNode);

        ch.effects.push({
          type: 'BeatRepeat',
          node: delayNode,
          feedback,
          wetGain,
          dryGain,
          beatLen,
        });
        break;
      }
      default: {
        // None: direct connect
        ch.gainNode.connect(ch.panNode);
        break;
      }
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────────────────
  // OPEN PIANO ROLL FOR A CHANNEL
  static _openPianoRoll(chIdx) {
    const ch = this._channels[chIdx];
    const content = this._prContent;
    content.innerHTML = '';
    content.style.setProperty('--steps', this._stepsPerBar);

    // Build 12 rows × steps columns
    for (let row = 0; row < 12; row++) {
      for (let col = 0; col < this._stepsPerBar; col++) {
        const midiNote = 60 + (11 - row); // C4=60..B4=71
        const cell = document.createElement('div');
        cell.classList.add('pr-cell');
        cell.dataset.note = midiNote;
        cell.dataset.step = col;
        const key = `${midiNote}-${col}`;
        if (ch.patterns[this._currentPattern].notes.includes(key)) {
          cell.classList.add('active');
        }
        cell.addEventListener('click', () => {
          this._pushHistory();
          const arr = ch.patterns[this._currentPattern].notes;
          if (arr.includes(key)) {
            const idx2 = arr.indexOf(key);
            arr.splice(idx2, 1);
            cell.classList.remove('active');
          } else {
            arr.push(key);
            cell.classList.add('active');
          }
        });
        content.appendChild(cell);
      }
    }
    this._prModal.style.display = 'flex';
    this._prModal.dataset.chIdx = chIdx;
  }

  // ─────────────────────────────────────────────────────────────────────────────────────────
  // METRONOME ON/OFF
  static _toggleMetronome() {
    this._metronomeOn = !this._metronomeOn;
    this._metBtn.textContent = this._metronomeOn ? 'Metronome On' : 'Metronome Off';
    if (this._metronomeOn) {
      this._metronomeOsc.frequency.value = this._tempo / 60;
    } else {
      this._metronomeGain.gain.value = 0;
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────────────────
  // TRANSPORT: PLAY / STOP
  static _togglePlay() {
    if (this._isPlaying) this._stopScheduler();
    else this._startScheduler();
  }

  static _startScheduler() {
    if (this._isPlaying) return;
    if (this._audioContext.state === 'suspended') this._audioContext.resume();
    this._isPlaying = true;
    this._currentStep = 0;
    this._currentOrderPosition = 0;
    this._nextNoteTime = this._audioContext.currentTime + 0.05;

    if (this._metronomeOn) this._metronomeOsc.frequency.value = this._tempo / 60;

    this._schedulerInterval = setInterval(() => this._scheduler(), 25);
  }

  static _stopScheduler() {
    if (!this._isPlaying) return;
    this._isPlaying = false;
    clearInterval(this._schedulerInterval);
    this._clearStepHighlights();
    this._metronomeGain.gain.value = 0;
  }

  static _scheduler() {
    const secondsPerBeat = 60.0 / this._tempo;
    const secondsPerStep = secondsPerBeat / this._resolution;

    while (this._nextNoteTime < this._audioContext.currentTime + this._lookahead) {
      const currentPattern = this._patternsOrder[this._currentOrderPosition];

      // Flash beat indicator on quarter notes
      if (this._metronomeOn && this._currentStep % this._resolution === 0) {
        this._metronomeGain.gain.setValueAtTime(1.0, this._nextNoteTime);
        this._metronomeGain.gain.exponentialRampToValueAtTime(0.001, this._nextNoteTime + 0.05);
        this._beatIndicator.style.background = 'var(--accent1)';
        setTimeout(() => {
          this._beatIndicator.style.background = 'var(--bg-primary)';
        }, 60);
      }

      // Highlight step in UI if currentPattern == displayed
      if (currentPattern === this._currentPattern) {
        this._highlightStep(this._currentStep);
      }

      // Schedule each channel
      this._channels.forEach((ch) => {
        const pattObj = ch.patterns[currentPattern];
        const seqVal = pattObj.sequence[this._currentStep];
        const velVal = pattObj.velocity[this._currentStep];
        const anySolo = this._channels.some((c) => c.solo);
        const mutedOut = ch.muted || (anySolo && !ch.solo);
        if (seqVal && !mutedOut) {
          // Sample playback
          const sampleIdx = ch.samples[currentPattern]?.[this._currentStep];
          if (!ch.isPlugin && sampleIdx !== undefined) {
            const bufSrc = this._audioContext.createBufferSource();
            bufSrc.buffer = this._samples[sampleIdx].audioBuffer;
            const tempGain = this._audioContext.createGain();
            tempGain.gain.value = velVal;
            bufSrc.connect(tempGain);
            tempGain.connect(ch.gainNode);
            bufSrc.start(this._nextNoteTime);
          }
          // Piano Roll (plugin) playback
          else if (ch.isPlugin) {
            pattObj.notes.forEach((key) => {
              const [midiStr, stepStr] = key.split('-');
              const midiNote = parseInt(midiStr, 10);
              const stepNum = parseInt(stepStr, 10);
              if (stepNum === this._currentStep && ch.pluginInstance) {
                let node = ch.pluginInstance.createNode(this._audioContext);
                const freq = 440 * Math.pow(2, (midiNote - 69) / 12);
                if (node.frequency) node.frequency.value = freq;
                if (ch.pluginInstance.applyParams) ch.pluginInstance.applyParams(node, ch.pluginParams);
                if (node.gain) {
                  node.gain.value = velVal;
                } else {
                  const tg = this._audioContext.createGain();
                  tg.gain.value = velVal;
                  node.connect(tg);
                  node = tg;
                }
                let lastNode = node;
                ch.effects.forEach((eff) => {
                  lastNode.connect(eff.node);
                  lastNode = eff.node;
                });
                lastNode.connect(ch.gainNode);
                if (typeof node.start === 'function') {
                  node.start(this._nextNoteTime);
                  node.stop(this._nextNoteTime + secondsPerStep);
                }
              }
            });
          }
        }
      });

      // Advance
      this._nextNoteTime += secondsPerStep;
      this._currentStep++;
      if (this._currentStep >= this._stepsPerBar) {
        this._currentStep = 0;
        this._currentOrderPosition = (this._currentOrderPosition + 1) % this._patternsOrder.length;
      }
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────────────────
  // HIGHLIGHT CURRENT STEP IN UI
  static _highlightStep(stepIndex) {
    const cells = this._stepSeq.querySelectorAll(`.step-cell[data-step="${stepIndex}"]`);
    cells.forEach((c) => c.classList.add('playing'));
  }

  static _clearStepHighlights() {
    const playing = this._stepSeq.querySelectorAll('.step-cell.playing');
    playing.forEach((c) => c.classList.remove('playing'));
  }

  // ─────────────────────────────────────────────────────────────────────────────────────────
  // RENDER SAMPLES TAB
  static _renderSamples() {
    const container = this._samplesTab;
    container.innerHTML = '<h3>Sample Browser</h3>';

    const addBtn = document.createElement('button');
    addBtn.textContent = '+ Add Sample';
    addBtn.style.marginTop = '6px';
    addBtn.style.background = 'var(--accent2)';
    addBtn.style.color = '#fff';
    addBtn.style.padding = '6px 12px';
    addBtn.style.border = 'none';
    addBtn.style.borderRadius = '4px';
    addBtn.style.cursor = 'pointer';
    addBtn.addEventListener('click', () => {
      this._sampleInput.value = '';
      this._sampleInput.click();
    });
    container.appendChild(addBtn);

    const listDiv = document.createElement('div');
    listDiv.classList.add('sample-list');
    this._samples.forEach((samp, idx) => {
      const item = document.createElement('div');
      item.classList.add('sample-item');
      const span = document.createElement('span');
      span.textContent = samp.name;
      item.appendChild(span);
      item.draggable = true;
      item.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', idx.toString());
      });
      listDiv.appendChild(item);
    });
    container.appendChild(listDiv);
  }

  // ─────────────────────────────────────────────────────────────────────────────────────────
  // HANDLE SAMPLE UPLOAD
  static async _handleSampleUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const arrayBuffer = await file.arrayBuffer();
    const audioBuffer = await this._audioContext.decodeAudioData(arrayBuffer);

    // Convert to WAV Base64
    const wavView = this._encodeWAV(audioBuffer);
    const blob = new Blob([wavView], { type: 'audio/wav' });
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result.split(',')[1];
      this._samples.push({ name: file.name, audioBuffer, base64 });
      this._renderSamples();
    };
    reader.readAsDataURL(blob);
  }

  // ─────────────────────────────────────────────────────────────────────────────────────────
  // RENDER PLAYLIST (pattern/order arrangement)
  static _renderPlaylist() {
    const container = this._playlistTab;
    container.innerHTML = '<h3>Playlist</h3>';

    // Grid background for all channels
    const grid = document.createElement('div');
    grid.classList.add('playlist-grid');
    grid.style.gridTemplateColumns = `120px repeat(64, 1fr)`;

    for (let ch = 0; ch < this._channels.length; ch++) {
      const label = document.createElement('div');
      label.classList.add('playlist-label');
      label.textContent = this._channels[ch].name;
      label.style.gridColumn = '1 / 2';
      label.style.gridRow = `${ch + 1} / ${ch + 2}`;
      grid.appendChild(label);

      for (let col = 0; col < 64; col++) {
        const cell = document.createElement('div');
        cell.classList.add('playlist-cell');
        cell.style.gridColumn = `${col + 2} / ${col + 3}`;
        cell.style.gridRow = `${ch + 1} / ${ch + 2}`;
        grid.appendChild(cell);
      }
    }
    container.appendChild(grid);

    // Render pattern clips
    this._patternsOrder.forEach((patIdx, orderPos) => {
      const clip = document.createElement('div');
      clip.classList.add('pattern-clip');
      clip.textContent = `P ${patIdx + 1}`;
      clip.style.gridRow = `1 / ${this._channels.length + 1}`;
      clip.style.gridColumn = `${orderPos + 2} / ${orderPos + 3}`;
      clip.draggable = true;
      clip.dataset.orderPos = orderPos;
      clip.dataset.patIdx = patIdx;

      // Drag events for reordering
      clip.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', JSON.stringify({ patIdx, orderPos }));
        clip.classList.add('drag-source');
      });
      clip.addEventListener('dragend', () => {
        clip.classList.remove('drag-source');
      });
      clip.addEventListener('dragover', (e) => {
        e.preventDefault();
        clip.classList.add('drag-over');
      });
      clip.addEventListener('dragleave', () => {
        clip.classList.remove('drag-over');
      });
      clip.addEventListener('drop', (e) => {
        e.preventDefault();
        clip.classList.remove('drag-over');
        const data = JSON.parse(e.dataTransfer.getData('text/plain'));
        const from = data.orderPos;
        const to = orderPos;
        if (from !== to) {
          this._pushHistory();
          const moved = this._patternsOrder.splice(from, 1)[0];
          this._patternsOrder.splice(to, 0, moved);
          this._renderPlaylist();
        }
      });

      grid.appendChild(clip);
    });

    // Instructions
    const info = document.createElement('div');
    info.textContent = 'Click a pattern clip to remove it from the playlist. Drag left/right to reorder.';
    info.style.marginTop = '8px';
    info.style.color = 'var(--text-secondary)';
    container.appendChild(document.createElement('br'));
    container.appendChild(info);

    // Click to remove
    container.querySelectorAll('.pattern-clip').forEach((clip) => {
      clip.addEventListener('click', () => {
        this._pushHistory();
        const pos = parseInt(clip.dataset.orderPos, 10);
        this._patternsOrder.splice(pos, 1);
        this._renderPlaylist();
      });
    });
  }

  // ─────────────────────────────────────────────────────────────────────────────────────────
  // RENDER PLUGINS TAB
  static _renderPlugins() {
    const container = this._pluginsTab;
    container.innerHTML = '<h3>Plugin Manager</h3>';

    this._plugins.forEach((PluginClass, idx) => {
      const pluginDiv = document.createElement('div');
      pluginDiv.classList.add('mm-plugin');
      const inst = new PluginClass();
      const h4 = document.createElement('h4');
      h4.textContent = inst.name;
      pluginDiv.appendChild(h4);

      const p = document.createElement('p');
      p.textContent = inst.description;
      pluginDiv.appendChild(p);

      const loadBtn = document.createElement('button');
      loadBtn.classList.add('plugin-btn');
      loadBtn.textContent = 'Load into New Channel';
      loadBtn.addEventListener('click', () => {
        this._pushHistory();
        this._loadPluginChannel(idx);
      });
      pluginDiv.appendChild(loadBtn);

      container.appendChild(pluginDiv);
    });

    const regBtn = document.createElement('button');
    regBtn.classList.add('plugin-btn');
    regBtn.textContent = 'Register New Plugin...';
    regBtn.style.marginTop = '8px';
    regBtn.addEventListener('click', () => this._promptRegisterPlugin());
    container.appendChild(regBtn);
  }

  // ─────────────────────────────────────────────────────────────────────────────────────────
  // PROMPT USER TO REGISTER JS PLUGIN
  static _promptRegisterPlugin() {
    const example = `
// Paste your plugin JS code here. Must extend MusicMaker.PluginBase and call MusicMaker.registerPlugin(...):

class MySynth extends MusicMaker.PluginBase {
  constructor() {
    super();
    this.name = "My Synth";
    this.description = "Simple sine wave with frequency control.";
    this.params = { frequency: 440, velocity: 1.0 };
  }
  createNode(ctx) {
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = this.params.frequency;
    const gain = ctx.createGain();
    gain.gain.value = this.params.velocity;
    osc.connect(gain);
    gain.start = osc.start.bind(osc);
    gain.stop = osc.stop.bind(osc);
    osc.start();
    return gain;
  }
  applyParams(node, params) {
    if (node.frequency) node.frequency.value = params.frequency;
    if (node.gain) node.gain.value = params.velocity;
  }
  getUI(container, update) {
    const fLabel = document.createElement("label");
    fLabel.textContent = "Freq:";
    fLabel.style.color = "var(--text-primary)";
    fLabel.style.marginRight = "4px";
    const fInput = document.createElement("input");
    fInput.type = "number";
    fInput.min = "20";
    fInput.max = "20000";
    fInput.value = 440;
    fInput.style.width = "80px";
    fInput.addEventListener("change", (e) => update("frequency", parseFloat(e.target.value)));
    container.appendChild(fLabel);
    container.appendChild(fInput);

    const vLabel = document.createElement("label");
    vLabel.textContent = "Vel:";
    vLabel.style.color = "var(--text-primary)";
    vLabel.style.marginRight = "4px";
    const vInput = document.createElement("input");
    vInput.type = "number";
    vInput.min = "0";
    vInput.max = "1";
    vInput.step = "0.01";
    vInput.value = 1;
    vInput.style.width = "60px";
    vInput.addEventListener("change", (e) => update("velocity", parseFloat(e.target.value)));
    container.appendChild(vLabel);
    container.appendChild(vInput);
  }
}
MusicMaker.registerPlugin(MySynth);
    `.trim();
    const code = prompt(example, '');
    if (!code) return;
    try {
      // eslint-disable-next-line no-eval
      eval(code);
      alert('Plugin registered successfully!');
      this._renderPlugins();
    } catch (err) {
      console.error(err);
      alert('Plugin registration failed: ' + err.message);
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────────────────
  // LOAD A PLUGIN INTO A NEW CHANNEL
  static _loadPluginChannel(pluginIdx) {
    const PluginClass = this._plugins[pluginIdx];
    if (!PluginClass) return;
    const instance = new PluginClass();
    this._addChannel(instance.name);
    const ch = this._channels[this._channels.length - 1];
    ch.isPlugin = true;
    ch.pluginInstance = instance;
    ch.pluginParams = { ...(instance.params || {}) };
    this._renderChannelRack();
  }

  // ─────────────────────────────────────────────────────────────────────────────────────────
  // ENCODE AudioBuffer → 16-bit PCM WAV (for Save/Load)
  static _encodeWAV(audioBuffer) {
    const numChan = audioBuffer.numberOfChannels;
    const sampleRate = audioBuffer.sampleRate;
    const bitsPerSample = 16;
    const blockAlign = (numChan * bitsPerSample) / 8;
    const byteRate = sampleRate * blockAlign;
    const dataLength = audioBuffer.length * blockAlign;
    const buffer = new ArrayBuffer(44 + dataLength);
    const view = new DataView(buffer);

    // RIFF header
    this._writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + dataLength, true);
    this._writeString(view, 8, 'WAVE');

    // fmt subchunk
    this._writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, numChan, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, byteRate, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, bitsPerSample, true);

    // data subchunk
    this._writeString(view, 36, 'data');
    view.setUint32(40, dataLength, true);

    // Interleaved PCM samples
    const channels = [];
    for (let c = 0; c < numChan; c++) {
      channels.push(audioBuffer.getChannelData(c));
    }
    let offset = 44;
    for (let i = 0; i < audioBuffer.length; i++) {
      for (let c = 0; c < numChan; c++) {
        let sample = Math.max(-1, Math.min(1, channels[c][i]));
        sample = sample < 0 ? sample * 0x8000 : sample * 0x7FFF;
        view.setInt16(offset, sample, true);
        offset += 2;
      }
    }
    return view;
  }

  static _writeString(view, offset, str) {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────────────────
  // SAVE PROJECT → JSON (channels, patterns, samples as Base64, plugins)
  static _saveProject() {
    const project = {
      version: '4.0.0',
      tempo: this._tempo,
      theme: this._theme,
      channels: this._channels.map((ch) => ({
        name: ch.name,
        color: ch.color,
        muted: ch.muted,
        solo: ch.solo,
        patterns: ch.patterns.map((p) => ({
          sequence: [...p.sequence],
          velocity: [...p.velocity],
          notes: [...p.notes],
        })),
        samples: JSON.parse(JSON.stringify(ch.samples)),
        effects: ch.effects.map((eff) => {
          const obj = { type: eff.type };
          if (eff.type === 'Delay') {
            obj.time = eff.node.delayTime.value;
            obj.feedback = eff.feedback.gain.value;
            obj.wet = eff.wetGain.gain.value;
            obj.dry = eff.dryGain.gain.value;
          }
          if (eff.type === 'Reverb') {
            obj.wet = eff.wetGain.gain.value;
            obj.dry = eff.dryGain.gain.value;
          }
          if (eff.type === 'Lowpass') {
            obj.frequency = eff.node.frequency.value;
          }
          if (eff.type === 'Gate') {
            obj.rate = eff.rate;
            obj.depth = eff.depth;
          }
          if (eff.type === 'BeatRepeat') {
            obj.beatLen = eff.beatLen;
            obj.feedback = eff.feedback.gain.value;
            obj.wet = eff.wetGain.gain.value;
            obj.dry = eff.dryGain.gain.value;
          }
          return obj;
        }),
        isPlugin: ch.isPlugin,
        pluginName: ch.pluginInstance ? ch.pluginInstance.constructor.name : null,
        pluginParams: ch.pluginParams,
      })),
      samples: this._samples.map((s) => ({
        name: s.name,
        base64: s.base64,
      })),
      plugins: this._plugins.map((p) => p.name),
      patternsOrder: [...this._patternsOrder],
    };
    const json = JSON.stringify(project);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'MusicMaker_Project.json';
    a.click();
    URL.revokeObjectURL(url);
    alert('Project saved!');
  }

  // ─────────────────────────────────────────────────────────────────────────────────────────
  // LOAD PROJECT JSON
  static async _loadProject(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const proj = JSON.parse(reader.result);
        if (proj.version !== '4.0.0') {
          if (!confirm('Project version mismatch. Attempt to load anyway?')) return;
        }
        this._pushHistory();

        // Reset state
        this._channels.forEach((_, i) => this._disconnectChannel(i));
        this._channels = [];
        this._samples = [];
        this._patternsOrder = [...proj.patternsOrder];
        this._currentPattern = 0;
        this._currentOrderPosition = 0;
        this._tempo = proj.tempo;
        this._tempoInput.value = this._tempo;
        this._theme = proj.theme || 'dark';
        this._container.setAttribute('data-theme', this._theme);

        // Reconstruct samples (decode base64)
        for (const s of proj.samples) {
          const response = await fetch(`data:audio/wav;base64,${s.base64}`);
          const arrayBuf = await response.arrayBuffer();
          const audioBuf = await this._audioContext.decodeAudioData(arrayBuf);
          this._samples.push({ name: s.name, base64: s.base64, audioBuffer: audioBuf });
        }

        // Reconstruct channels
        for (const chObj of proj.channels) {
          const gainNode = this._audioContext.createGain();
          gainNode.gain.value = 1.0;
          const panNode = this._audioContext.createStereoPanner();
          panNode.pan.value = 0;
          gainNode.connect(panNode);
          panNode.connect(this._masterGain);

          const analyser = this._audioContext.createAnalyser();
          analyser.fftSize = 256;
          gainNode.connect(analyser);
          analyser.connect(this._masterGain);

          const patterns = chObj.patterns.map((p) => ({
            sequence: [...p.sequence],
            velocity: [...p.velocity],
            notes: [...p.notes],
          }));

          const ch = {
            name: chObj.name,
            color: chObj.color,
            muted: chObj.muted,
            solo: chObj.solo,
            gainNode,
            panNode,
            analyser,
            patterns,
            samples: JSON.parse(JSON.stringify(chObj.samples)),
            effects: [],
            isPlugin: chObj.isPlugin,
            pluginInstance: null,
            pluginParams: chObj.pluginParams,
            notes: [...chObj.patterns[this._currentPattern].notes],
          };
          this._channels.push(ch);

          // Recreate effects
          chObj.effects.forEach((eff) => this._setChannelEffect(this._channels.length - 1, eff.type));
          const rec = ch.effects;
          chObj.effects.forEach((eff, i) => {
            const ce = rec[i];
            if (eff.type === 'Delay') {
              ce.node.delayTime.value = eff.time;
              ce.feedback.gain.value = eff.feedback;
              ce.wetGain.gain.value = eff.wet;
              ce.dryGain.gain.value = eff.dry;
            }
            if (eff.type === 'Reverb') {
              ce.wetGain.gain.value = eff.wet;
              ce.dryGain.gain.value = eff.dry;
            }
            if (eff.type === 'Lowpass') {
              ce.node.frequency.value = eff.frequency;
            }
            if (eff.type === 'Gate') {
              ce.rate = eff.rate;
              ce.depth = eff.depth;
              ce.oscillator.frequency.value = eff.rate;
            }
            if (eff.type === 'BeatRepeat') {
              ce.beatLen = eff.beatLen;
              ce.node.delayTime.value = (60 / this._tempo) * eff.beatLen;
              ce.feedback.gain.value = eff.feedback;
              ce.wetGain.gain.value = eff.wet;
              ce.dryGain.gain.value = eff.dry;
            }
          });

          // Recreate plugins (if registered)
          if (chObj.isPlugin && chObj.pluginName) {
            const pIndex = this._plugins.findIndex((p) => p.name === chObj.pluginName);
            if (pIndex !== -1) {
              const PC = this._plugins[pIndex];
              const inst = new PC();
              ch.isPlugin = true;
              ch.pluginInstance = inst;
              ch.pluginParams = { ...chObj.pluginParams };
            }
          }
        }

        this._renderChannelRack();
        this._renderStepSequencer();
        this._renderMixer();
        this._renderSamples();
        this._renderPlaylist();
        this._renderPlugins();

        alert('Project loaded!');
      } catch (err) {
        console.error(err);
        alert('Failed to load project: ' + err.message);
      }
    };
    reader.readAsText(file);
  }
}

// ─────────────────────────────────────────────────────────────────────────────────────────
// BASE PLUGIN CLASS
MusicMaker.PluginBase = class {
  constructor() {
    this.name = 'Unnamed Plugin';
    this.description = '';
    this.params = {};
  }

  createNode(audioContext) {
    const osc = audioContext.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = 440;
    osc.start();
    return osc;
  }

  applyParams(node, params) {
    if (node.frequency && params.frequency !== undefined) {
      node.frequency.value = params.frequency;
    }
    if (node.gain && params.velocity !== undefined) {
      node.gain.value = params.velocity;
    }
  }

  getUI(container, updateCallback) {
    const p = document.createElement('p');
    p.textContent = 'No parameters.';
    p.style.color = 'var(--text-primary)';
    container.appendChild(p);
  }
};

// PLUGIN REGISTRATION METHOD
MusicMaker.registerPlugin = function (PluginClass) {
  if (typeof PluginClass !== 'function') return;
  if (!(PluginClass.prototype instanceof MusicMaker.PluginBase)) return;
  MusicMaker._plugins.push(PluginClass);
  if (MusicMaker._pluginsTab) {
    MusicMaker._renderPlugins();
  }
};

// Expose globally
window.MusicMaker = MusicMaker;
