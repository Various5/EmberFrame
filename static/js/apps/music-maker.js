/**
 * APP_METADATA
 * @name MusicMaker
 * @icon fas fa-music
 * @description Modern, FL‐Studio‐style browser DAW with step sequencer, piano roll, mixer, sample browser, full project save/load, undo/redo, and more.
 * @category Music
 * @version 3.0.0
 * @author EmberFrame
 * @enabled true
 */

class MusicMaker {
  // ────────────────────────────────────────────────────────────────────────────────
  // Static application state:
  static _container = null;
  static _audioContext = null;
  static _masterGain = null;
  static _globalEffects = [];                     // [{type, node, feedback?, wetGain?, dryGain?}]
  static _masterVolume = 0.8;

  static _tracks = [];                            // Array of track objects
  static _sampleLibrary = [];                     // [{ name, audioBuffer, base64 }]
  static _plugins = [];                           // Array of registered plugin classes

  static _tempo = 120;                            // BPM
  static _isPlaying = false;
  static _nextNoteTime = 0;                       // Next note scheduling timestamp
  static _currentStep = 0;                        // Index in pattern
  static _scheduleAheadTime = 0.1;                // Seconds to schedule ahead
  static _lookaheadIntervalId = null;             // ID for lookahead setInterval

  static _numSteps = 16;                          // Steps per pattern
  static _resolution = 4;                         // Subdivisions per beat (16th notes)
  static _patternCount = 8;                       // Patterns per track (increased from 4 to 8)
  static _currentPattern = 0;                     // Active pattern index
  static _patternOrder = [0];                     // Sequence of patterns to chain
  static _currentOrderIndex = 0;                  // Index into _patternOrder

  static _exporting = false;                      // Flag during WAV export

  // Per-track effect names:
  static _effectOptions = ['None', 'Delay', 'Reverb', 'Lowpass', 'Gate', 'BeatRepeat'];

  // Undo/Redo stacks:
  static _undoStack = [];
  static _redoStack = [];
  static _isApplyingHistory = false;

  // Metronome:
  static _metronomeOn = false;
  static _metronomeOsc = null;
  static _metronomeGain = null;

  // Reverb IR:
  static _reverbIRBuffer = null;

  // UI elements (populated in _initialize):
  static _tempoInput = null;
  static _masterVolumeSlider = null;
  static _masterReverbSlider = null;
  static _masterDelaySlider = null;
  static _playBtn = null;
  static _stopBtn = null;
  static _addTrackBtn = null;
  static _exportBtn = null;
  static _saveProjectBtn = null;
  static _loadProjectBtn = null;
  static _patternSelect = null;
  static _prevPatternBtn = null;
  static _nextPatternBtn = null;
  static _addChainBtn = null;
  static _chainContainer = null;
  static _tracksContainer = null;
  static _stepGridContainer = null;
  static _rightPane = null;
  static _tabButtons = null;
  static _mixerContainer = null;
  static _samplesContainer = null;
  static _pluginManagerContainer = null;
  static _pianoRollModal = null;
  static _pianoContent = null;
  static _closePianoBtn = null;
  static _themeToggleBtn = null;

  // Color palette for default track colors:
  static _defaultColors = ['#e74c3c','#3498db','#2ecc71','#9b59b6','#f1c40f','#1abc9c','#e67e22','#95a5a6'];

  // ────────────────────────────────────────────────────────────────────────────────
  // Create EmberFrame window definition
  static createWindow() {
    return {
      title: 'MusicMaker v3.0.0',
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
        if (MusicMaker._isPlaying) MusicMaker._stopPlayback();
      },
      onRestore: () => {}
    };
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // Build main HTML and CSS
  static _getHTML() {
    return `
      <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;600;800&display=swap" rel="stylesheet">
      <style>
        /* ─────────────────────────────────────────────────────────────────────── */
        :root {
          --bg-primary: #101112;
          --bg-secondary: #1f2224;
          --bg-tertiary: #202223;
          --text-primary: #e0e0e0;
          --text-secondary: #a0a0a0;
          --accent: #f39c12;
          --accent-2: #16a085;
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
          --accent: #d35400;
          --accent-2: #27ae60;
          --highlight: #e67e22;
          --scrollbar-bg: #d0d0d0;
          --scrollbar-thumb: #888;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body, html { width: 100%; height: 100%; }
        #mm-container {
          display: flex; flex-direction: column; width: 100%; height: 100%;
          background: var(--bg-primary); color: var(--text-primary);
          font-family: 'Rajdhani', sans-serif; overflow: hidden;
        }

        /* Scrollbar styling */
        #mm-container ::-webkit-scrollbar {
          width: 8px; height: 8px;
        }
        #mm-container ::-webkit-scrollbar-track {
          background: var(--scrollbar-bg);
        }
        #mm-container ::-webkit-scrollbar-thumb {
          background-color: var(--scrollbar-thumb); border-radius: 4px;
        }

        /* ─────────────────────────────────────────────────────────────────────── */
        /* Top Menu Bar (File / Edit / View) and Transport */
        #mm-top-bar {
          display: flex; align-items: center; padding: 4px 12px;
          background: var(--bg-secondary); border-bottom: 1px solid var(--bg-primary);
        }
        #mm-top-bar .menu-group {
          display: flex; align-items: center; margin-right: 24px;
        }
        #mm-top-bar button.menu-btn {
          background: none; border: none; color: var(--text-primary);
          font-size: 14px; font-weight: 600; margin-right: 8px; cursor: pointer;
          transition: color 0.2s ease;
        }
        #mm-top-bar button.menu-btn:hover {
          color: var(--accent);
        }
        #mm-transport {
          margin-left: auto; display: flex; align-items: center;
        }
        #mm-transport button.transport-btn {
          margin-right: 8px; padding: 4px 8px; font-size: 14px;
          background: var(--accent-2); border: none; border-radius: 4px;
          color: #fff; cursor: pointer; transition: background 0.2s ease;
        }
        #mm-transport button.transport-btn:hover {
          background: #229954;
        }
        #mm-transport input[type="number"] {
          width: 50px; margin-right: 16px; border-radius: 4px;
          border: 1px solid var(--bg-primary); padding: 2px 4px;
          background: #fff; color: #2c3e50; font-weight: 600;
        }
        #mm-transport .beat-flash {
          width: 12px; height: 12px; border-radius: 50%;
          background: var(--bg-primary); margin-left: 8px;
          transition: background 0.05s ease;
        }

        /* ─────────────────────────────────────────────────────────────────────── */
        /* Main Row: Left = Sequencer Panels, Right = Right Pane (Tabs) */
        #mm-main {
          flex: 1; display: flex; overflow: hidden;
        }

        /* ─── Left Column ──────────────────────────────────────────────────────── */
        #mm-left-column {
          flex: 3; display: flex; flex-direction: column; overflow: hidden;
        }

        /* Pattern & Chain Controls */
        #mm-pattern-controls {
          display: flex; align-items: center; padding: 6px 12px;
          background: var(--bg-secondary); border-bottom: 2px solid var(--bg-primary);
        }
        #mm-pattern-controls label {
          margin-right: 8px; font-weight: 600; font-size: 14px;
        }
        #mm-pattern-selector {
          margin-right: 16px; padding: 4px; background: var(--bg-tertiary);
          color: var(--text-primary); border: 1px solid var(--bg-primary);
          border-radius: 4px; font-size: 14px;
        }
        #mm-pattern-controls button {
          margin-right: 8px; padding: 4px 8px; background: var(--accent-2);
          border: none; border-radius: 4px; color: #fff; cursor: pointer;
          font-size: 13px; transition: background 0.2s ease;
        }
        #mm-pattern-controls button:hover {
          background: #229954;
        }
        #mm-pattern-chain {
          display: flex; gap: 8px; margin-left: 12px;
        }
        .mm-chain-step {
          padding: 4px 8px; background: var(--bg-tertiary);
          border: 1px solid var(--bg-primary); border-radius: 4px;
          cursor: grab; color: var(--text-primary); font-weight: 500;
          user-select: none; transition: background 0.2s ease, border-color 0.2s ease;
        }
        .mm-chain-step:hover { background: var(--bg-secondary); }
        .mm-chain-step.active {
          background: var(--highlight); border-color: darken(var(--highlight), 10%);
        }
        #mm-add-chain {
          margin-left: auto; padding: 4px 8px; background: var(--accent);
          color: #fff; font-size: 13px; border: none; border-radius: 4px;
          cursor: pointer; transition: background 0.2s ease;
        }
        #mm-add-chain:hover { background: darken(var(--accent), 10%); }

        /* ─────────────────────────────────────────────────────────────────────── */
        /* Sequence Area: Tracks + Step Grid + Piano Roll */
        #mm-sequence-area {
          flex: 1; display: flex; flex-direction: column; overflow: hidden;
        }
        /* Track List (names, controls) */
        #mm-tracks {
          flex: 1; overflow: auto; padding: 8px;
        }
        .mm-track {
          display: flex; align-items: center; padding: 8px;
          background: var(--bg-secondary); margin-bottom: 4px; border-radius: 4px;
          border: 1px solid var(--bg-primary);
        }
        .mm-channel-color {
          width: 16px; height: 16px; margin-right: 8px; border-radius: 50%;
          border: 1px solid var(--bg-primary); cursor: pointer;
        }
        .mm-track input[type="text"] {
          flex: 1; padding: 6px; background: var(--bg-tertiary);
          border: 1px solid var(--bg-primary); border-radius: 4px;
          color: var(--text-primary); font-weight: 600; font-size: 14px;
        }
        .mm-track .track-button {
          margin-left: 8px; padding: 6px 10px; background: var(--accent-2);
          border: none; border-radius: 4px; cursor: pointer; color: #fff;
          font-size: 12px; font-weight: 500; transition: background 0.2s ease;
        }
        .mm-track .track-button:hover {
          background: #229954;
        }
        .mm-track .remove-btn {
          background: var(--accent); color: #fff;
        }
        .mm-track .remove-btn:hover { background: darken(var(--accent), 10%); }

        /* Step Grid (buttons + velocity) */
        #mm-step-grid {
          flex: 1; background: var(--bg-tertiary); overflow: auto;
        }
        .step-header {
          display: grid;
          grid-template-columns: 100px repeat(var(--steps), 1fr);
          padding: 6px;
        }
        .step-header .dummy { } /* filler under track label */
        .step-header span {
          text-align: center; font-size: 12px; color: var(--text-secondary); margin: 2px;
        }
        .step-row {
          display: grid;
          grid-template-columns: 100px repeat(var(--steps), 1fr);
          align-items: center;
          padding: 4px 6px;
        }
        .step-row:nth-child(even) { background: var(--bg-secondary); }
        .step-row:nth-child(odd) { background: var(--bg-tertiary); }
        .step-label {
          display: flex; align-items: center; font-size: 14px; color: var(--text-primary);
          margin-right: 8px;
        }
        .step-label .color-dot {
          width: 12px; height: 12px; border-radius: 50%; margin-right: 4px;
        }
        .mm-step-cell {
          position: relative;
          width: 100%; height: 32px; margin: 2px; background: var(--bg-primary);
          border-radius: 4px; cursor: pointer; transition: background 0.1s ease;
        }
        .mm-step-cell:hover { background: var(--bg-secondary); }
        .mm-step-cell.active {
          background: var(--highlight);
        }
        .mm-step-cell.playing {
          box-shadow: 0 0 4px var(--accent);
        }
        /* Velocity slider under each step */
        .mm-velocity-slider {
          position: absolute; bottom: 0; left: 0; right: 0;
          height: 6px; background: var(--bg-secondary);
        }
        .mm-velocity-slider input[type="range"] {
          width: 100%; height: 4px; -webkit-appearance: none;
          background: var(--bg-secondary); border-radius: 2px; outline: none;
        }
        .mm-velocity-slider input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none; appearance: none; width: 8px; height: 8px;
          background: var(--accent); border-radius: 50%; cursor: pointer;
        }

        /* Drag‐over highlight */
        .mm-step-cell.drag-over { background: var(--accent-2) !important; }

        /* Piano Roll Modal */
        #mm-piano-roll {
          display: none; position: absolute; top: 10%; left: 10%; width: 80%; height: 60%;
          background: var(--bg-primary); border: 2px solid var(--bg-primary); border-radius: 8px;
          z-index: 20; box-shadow: 0 0 12px rgba(0,0,0,0.6); flex-direction: column;
        }
        #mm-piano-roll .modal-header {
          display: flex; justify-content: space-between; align-items: center;
          padding: 8px; background: var(--bg-secondary); border-bottom: 1px solid var(--bg-primary);
        }
        #mm-piano-roll h3 { margin: 0; color: var(--accent); }
        #mm-close-piano-roll {
          background: var(--accent); border: none; border-radius: 4px;
          color: #fff; padding: 4px 8px; cursor: pointer; transition: background 0.2s ease;
        }
        #mm-close-piano-roll:hover { background: darken(var(--accent), 10%); }
        #mm-piano-content {
          flex: 1; display: flex; padding: 12px; overflow: auto; flex-wrap: wrap;
        }
        .piano-cell {
          flex: 1 0 calc(100% / var(--steps)); height: calc(100% / 12);
          background: var(--bg-secondary); border-radius: 4px; cursor: pointer;
          transition: background 0.1s ease;
        }
        .piano-cell:hover { background: var(--bg-tertiary); }
        .piano-cell.active { background: var(--highlight); }

        /* ─────────────────────────────────────────────────────────────────────── */
        /* Right Column: Tabs for Mixer / Samples / Plugins */
        #mm-right-column {
          flex: 2; display: flex; flex-direction: column; overflow: hidden;
          border-left: 2px solid var(--bg-primary);
        }
        #mm-right-tabs {
          display: flex; background: var(--bg-secondary); border-bottom: 2px solid var(--bg-primary);
        }
        .tab-btn {
          flex: 1; padding: 8px; background: var(--bg-secondary); border: none;
          color: var(--text-primary); cursor: pointer; font-size: 14px; font-weight: 600;
          transition: background 0.2s ease, color 0.2s ease;
        }
        .tab-btn.active, .tab-btn:hover {
          background: var(--bg-tertiary); color: var(--accent);
        }
        .tab-content {
          flex: 1; padding: 12px; overflow: auto;
        }

        /* Mixer Section */
        #mm-mixer h3 { margin-top: 0; color: var(--accent); }
        .mm-mixer-channel {
          display: flex; align-items: center; background: var(--bg-secondary);
          padding: 6px; border-radius: 4px; margin-bottom: 12px; position: relative;
        }
        .mm-mixer-channel:hover .channel-options { display: flex; }
        .mm-mixer-channel label {
          flex: 1; font-size: 14px; color: var(--text-primary);
        }
        .mm-mixer-channel input[type="range"] {
          flex: 2; -webkit-appearance: none; width: 100%; height: 4px;
          background: var(--bg-tertiary); border-radius: 4px; outline: none; margin: 0 8px;
        }
        .mm-mixer-channel input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none; appearance: none; width: 12px; height: 12px;
          background: var(--accent); border-radius: 50%; cursor: pointer;
        }
        .mm-mixer-channel select {
          background: var(--bg-tertiary); color: var(--text-primary);
          border: 1px solid var(--bg-primary); border-radius: 4px; padding: 4px;
          margin-left: 8px;
        }
        .mm-fx-params label {
          font-size: 12px; color: var(--text-primary); margin-right: 4px;
        }
        .mm-fx-params input[type="range"] {
          width: 60px; margin-right: 8px; background: var(--bg-tertiary);
        }
        /* Channel Options (hide by default; appear on hover) */
        .channel-options {
          display: none; position: absolute; top: 4px; right: 4px; gap: 4px;
        }
        .channel-options button {
          background: var(--bg-tertiary); border: 1px solid var(--bg-primary);
          color: var(--text-primary); padding: 2px 6px; border-radius: 4px;
          font-size: 12px; cursor: pointer; transition: background 0.2s ease;
        }
        .channel-options button:hover {
          background: var(--bg-secondary);
        }
        /* Level meter */
        .level-meter {
          width: 8px; height: 32px; background: var(--bg-primary);
          border-radius: 2px; margin-left: 8px; overflow: hidden; position: relative;
        }
        .level-meter-fill {
          position: absolute; bottom: 0; left: 0; right: 0;
          background: var(--accent-2); height: 0%;
        }

        /* Samples Section */
        #mm-samples h3 { margin-top: 0; color: var(--accent); }
        #mm-samples .sample-list {
          margin-top: 12px; max-height: calc(100% - 60px); overflow: auto;
        }
        .sample-item {
          display: flex; align-items: center; background: var(--bg-secondary);
          padding: 8px; margin-bottom: 6px; border-radius: 4px; border: 1px solid var(--bg-primary);
          cursor: grab; user-select: none;
        }
        .sample-item:hover { background: var(--bg-tertiary); }
        .sample-item span {
          flex: 1; font-size: 14px; color: var(--text-primary); word-break: break-all;
        }

        /* Plugin Manager */
        #mm-plugin-manager h3 { margin-top: 0; color: var(--accent); }
        .mm-plugin {
          border: 1px solid var(--bg-primary); border-radius: 4px; padding: 10px;
          margin-bottom: 12px; background: var(--bg-secondary);
        }
        .mm-plugin h4 { margin: 0 0 6px 0; font-size: 16px; color: var(--accent); }
        .mm-plugin p { margin: 0; font-size: 14px; color: var(--text-primary); }
        .mm-plugin .plugin-btn {
          margin-top: 8px; padding: 6px 12px; background: var(--accent-2);
          border: none; border-radius: 4px; cursor: pointer; color: #fff;
          font-size: 14px; font-weight: 600; transition: background 0.2s ease;
        }
        .mm-plugin .plugin-btn:hover { background: #229954; }

        /* File Input (hidden) */
        #mm-file-input, #mm-project-input {
          display: none;
        }

      </style>

      <div id="mm-container" data-theme="dark">
        <!-- Top Bar: File / Edit / View / Transport -->
        <div id="mm-top-bar">
          <div class="menu-group">
            <button class="menu-btn" id="mm-new-project">New</button>
            <button class="menu-btn" id="mm-save-project">Save Project</button>
            <button class="menu-btn" id="mm-load-project">Load Project</button>
          </div>
          <div class="menu-group">
            <button class="menu-btn" id="mm-undo">Undo</button>
            <button class="menu-btn" id="mm-redo">Redo</button>
          </div>
          <div class="menu-group">
            <button class="menu-btn" id="mm-theme-toggle">Toggle Theme</button>
          </div>
          <div id="mm-transport">
            <button class="transport-btn" id="mm-play">Play ▶️</button>
            <button class="transport-btn" id="mm-stop">Stop ⏹</button>
            <label for="mm-tempo" style="color:var(--text-primary);margin-right:4px;font-weight:600;">Tempo:</label>
            <input id="mm-tempo" type="number" min="40" max="300" value="120" />
            <div class="beat-flash" id="mm-beat-flash"></div>
          </div>
        </div>

        <!-- Main Row -->
        <div id="mm-main">
          <!-- Left Column: Sequencer -->
          <div id="mm-left-column">
            <!-- Pattern & Chain Controls -->
            <div id="mm-pattern-controls">
              <label for="mm-pattern-selector">Pattern:</label>
              <select id="mm-pattern-selector">
                ${[...Array(this._patternCount)]
                  .map((_, i) => `<option value="${i}">Pattern ${i + 1}</option>`)
                  .join('')}
              </select>
              <button id="mm-prev-pattern">Prev</button>
              <button id="mm-next-pattern">Next</button>
              <label style="margin-left:12px;font-weight:600;color:var(--text-primary);">Chain:</label>
              <div id="mm-pattern-chain">
                ${this._patternOrder
                  .map((p, idx) => `<div class="mm-chain-step${idx===0?' active':''}">${p + 1}</div>`)
                  .join('')}
              </div>
              <button id="mm-add-chain">+ Add to Chain</button>
            </div>

            <!-- Tracks + Steps -->
            <div id="mm-sequence-area">
              <!-- Track List -->
              <div id="mm-tracks"></div>
              <!-- Step Grid -->
              <div id="mm-step-grid"></div>
            </div>
          </div>

          <!-- Right Column: Tabs -->
          <div id="mm-right-column">
            <div id="mm-right-tabs">
              <button class="tab-btn active" data-tab="mixer">Mixer</button>
              <button class="tab-btn" data-tab="samples">Samples</button>
              <button class="tab-btn" data-tab="plugins">Plugins</button>
            </div>
            <div id="mm-mixer" class="tab-content"></div>
            <div id="mm-samples" class="tab-content" style="display:none;"></div>
            <div id="mm-plugin-manager" class="tab-content" style="display:none;"></div>
          </div>
        </div>

        <!-- Piano Roll Modal -->
        <div id="mm-piano-roll">
          <div class="modal-header">
            <h3>Piano Roll</h3>
            <button id="mm-close-piano-roll">Close</button>
          </div>
          <div id="mm-piano-content"></div>
        </div>

        <!-- Hidden File Inputs for Project Load -->
        <input type="file" id="mm-project-input" accept=".json" />
      </div>
    `;
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // Initialize AudioContext, UI, default track, IR load, etc.
  static async _initialize() {
    // Create AudioContext & Master Gain
    this._audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this._masterGain = this._audioContext.createGain();
    this._masterGain.gain.value = this._masterVolume;
    this._masterGain.connect(this._audioContext.destination);

    // Load Reverb IR
    await this._loadReverbIR();
    // Create Master Effects (Delay → Reverb → Master)
    this._createMasterEffects();

    // Create Metronome (oscillator + gain) but keep muted until toggled
    this._metronomeOsc = this._audioContext.createOscillator();
    this._metronomeOsc.type = 'square';
    this._metronomeGain = this._audioContext.createGain();
    this._metronomeGain.gain.value = 0; // start silent
    this._metronomeOsc.connect(this._metronomeGain);
    this._metronomeGain.connect(this._masterGain);
    this._metronomeOsc.start();

    // Cache UI references
    this._tempoInput            = this._container.querySelector('#mm-tempo');
    this._masterVolumeSlider    = this._container.querySelector('#mm-master-volume');
    this._masterReverbSlider    = this._container.querySelector('#mm-master-reverb');
    this._masterDelaySlider     = this._container.querySelector('#mm-master-delay');
    this._playBtn               = this._container.querySelector('#mm-play');
    this._stopBtn               = this._container.querySelector('#mm-stop');
    this._addTrackBtn           = this._container.querySelector('#mm-add-track');
    this._exportBtn             = this._container.querySelector('#mm-export');
    this._saveProjectBtn        = this._container.querySelector('#mm-save-project');
    this._loadProjectBtn        = this._container.querySelector('#mm-load-project');
    this._patternSelect         = this._container.querySelector('#mm-pattern-selector');
    this._prevPatternBtn        = this._container.querySelector('#mm-prev-pattern');
    this._nextPatternBtn        = this._container.querySelector('#mm-next-pattern');
    this._addChainBtn           = this._container.querySelector('#mm-add-chain');
    this._chainContainer        = this._container.querySelector('#mm-pattern-chain');
    this._tracksContainer       = this._container.querySelector('#mm-tracks');
    this._stepGridContainer     = this._container.querySelector('#mm-step-grid');
    this._rightPane             = this._container.querySelector('#mm-right-column');
    this._tabButtons            = this._container.querySelectorAll('.tab-btn');
    this._mixerContainer        = this._container.querySelector('#mm-mixer');
    this._samplesContainer      = this._container.querySelector('#mm-samples');
    this._pluginManagerContainer= this._container.querySelector('#mm-plugin-manager');
    this._pianoRollModal        = this._container.querySelector('#mm-piano-roll');
    this._pianoContent          = this._container.querySelector('#mm-piano-content');
    this._closePianoBtn         = this._container.querySelector('#mm-close-piano-roll');
    this._themeToggleBtn        = this._container.querySelector('#mm-theme-toggle');
    this._undoBtn               = this._container.querySelector('#mm-undo');
    this._redoBtn               = this._container.querySelector('#mm-redo');
    this._projectInput          = this._container.querySelector('#mm-project-input');
    this._beatFlash             = this._container.querySelector('#mm-beat-flash');

    // Bind Events

    // Transport Buttons
    this._playBtn.addEventListener('click', () => this._startPlayback());
    this._stopBtn.addEventListener('click', () => this._stopPlayback());
    this._tempoInput.addEventListener('change', (e) => {
      const v = parseInt(e.target.value, 10);
      if (!isNaN(v) && v >= 40 && v <= 300) {
        this._tempo = v;
        // Also update metronome frequency to quarter-note
        if (this._metronomeOn) {
          this._metronomeOsc.frequency.value = this._tempo / 60; // Hz = BPM/60
        }
      } else {
        e.target.value = this._tempo;
      }
    });

    // Add Track (from File menu, or using a separate button as needed)
    this._addTrackBtn.addEventListener('click', () => {
      this._pushHistory();
      this._addTrack();
    });

    // Project Save / Load
    this._saveProjectBtn.addEventListener('click', () => this._saveProject());
    this._loadProjectBtn.addEventListener('click', () => {
      this._projectInput.value = '';
      this._projectInput.click();
    });
    this._projectInput.addEventListener('change', (e) => this._loadProjectFromFile(e));

    // Undo / Redo
    this._undoBtn.addEventListener('click', () => this._undo());
    this._redoBtn.addEventListener('click', () => this._redo());

    // Theme Toggle
    this._themeToggleBtn.addEventListener('click', () => this._toggleTheme());

    // Keyboard Shortcuts
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        this._isPlaying ? this._stopPlayback() : this._startPlayback();
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

    // Pattern Controls
    this._patternSelect.addEventListener('change', (e) => {
      this._currentPattern = parseInt(e.target.value, 10);
      this._renderStepGrid();
    });
    this._prevPatternBtn.addEventListener('click', () => {
      this._currentPattern = (this._currentPattern - 1 + this._patternCount) % this._patternCount;
      this._patternSelect.value = this._currentPattern;
      this._renderStepGrid();
    });
    this._nextPatternBtn.addEventListener('click', () => {
      this._currentPattern = (this._currentPattern + 1) % this._patternCount;
      this._patternSelect.value = this._currentPattern;
      this._renderStepGrid();
    });
    this._addChainBtn.addEventListener('click', () => {
      this._pushHistory();
      this._patternOrder.push(this._currentPattern);
      this._renderPatternChain();
    });

    // Pattern Chain Drag & Drop
    this._chainContainer.addEventListener('dragstart', (e) => {
      if (e.target.classList.contains('mm-chain-step')) {
        e.dataTransfer.setData('text/plain', e.target.textContent - 1);
        e.target.classList.add('drag-source');
      }
    });
    this._chainContainer.addEventListener('dragover', (e) => {
      e.preventDefault();
      if (e.target.classList.contains('mm-chain-step')) {
        e.target.classList.add('drag-over');
      }
    });
    this._chainContainer.addEventListener('dragleave', (e) => {
      if (e.target.classList.contains('mm-chain-step')) {
        e.target.classList.remove('drag-over');
      }
    });
    this._chainContainer.addEventListener('drop', (e) => {
      e.preventDefault();
      const fromPattern = parseInt(e.dataTransfer.getData('text/plain'), 10);
      const toElem = e.target.closest('.mm-chain-step');
      if (!isNaN(fromPattern) && toElem) {
        const toPattern = parseInt(toElem.textContent, 10) - 1;
        const fromIndex = this._patternOrder.indexOf(fromPattern);
        const toIndex = this._patternOrder.indexOf(toPattern);
        if (fromIndex !== -1 && toIndex !== -1 && fromIndex !== toIndex) {
          this._pushHistory();
          // Reorder
          this._patternOrder.splice(fromIndex, 1);
          this._patternOrder.splice(toIndex, 0, fromPattern);
          this._renderPatternChain();
        }
      }
      const src = this._chainContainer.querySelector('.drag-source');
      if (src) src.classList.remove('drag-source');
      const overs = this._chainContainer.querySelectorAll('.drag-over');
      overs.forEach(el => el.classList.remove('drag-over'));
    });

    // Tab Switching (Mixer / Samples / Plugins)
    this._tabButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = e.currentTarget.dataset.tab;
        this._switchTab(tab);
      });
    });

    // Piano Roll Close
    this._closePianoBtn.addEventListener('click', () => {
      this._pianoRollModal.style.display = 'none';
    });

    // Render initial UIs
    this._renderPatternChain();
    this._renderTracks();
    this._renderStepGrid();
    this._renderMixer();
    this._renderSamples();
    this._renderPluginManager();

    // Default: add one track
    this._addTrack('Track 1');
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // Load a 1‐second white‐noise IR for reverb
  static async _loadReverbIR() {
    const sr = this._audioContext.sampleRate;
    const buf = this._audioContext.createBuffer(2, sr, sr);
    for (let ch = 0; ch < 2; ch++) {
      const data = buf.getChannelData(ch);
      for (let i = 0; i < sr; i++) {
        data[i] = (Math.random() * 2 - 1) * (1 - i / sr) * 0.2;
      }
    }
    this._reverbIRBuffer = buf;
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // Create Master Effects chain: Delay → Reverb → Master Gain → Destination
  static _createMasterEffects() {
    // --- MASTER DELAY ---
    const delayNode = this._audioContext.createDelay(4.0);
    delayNode.delayTime.value = 0.25; // default quarter‐note
    const feedback = this._audioContext.createGain();
    feedback.gain.value = 0.3;
    const wetGain = this._audioContext.createGain();
    wetGain.gain.value = 0.2;
    const dryGain = this._audioContext.createGain();
    dryGain.gain.value = 0.8;

    delayNode.connect(feedback);
    feedback.connect(delayNode);

    delayNode.connect(wetGain);
    wetGain.connect(this._masterGain);
    this._masterGain.connect(dryGain);
    dryGain.connect(this._masterGain);

    this._globalEffects.push({
      type: 'Delay',
      node: delayNode,
      feedback,
      wetGain,
      dryGain
    });

    // --- MASTER REVERB ---
    const convolver = this._audioContext.createConvolver();
    convolver.buffer = this._reverbIRBuffer;
    const reverbWet = this._audioContext.createGain();
    reverbWet.gain.value = 0.3;
    const reverbDry = this._audioContext.createGain();
    reverbDry.gain.value = 0.7;

    this._masterGain.connect(convolver);
    convolver.connect(reverbWet);
    reverbWet.connect(this._audioContext.destination);
    this._masterGain.connect(reverbDry);
    reverbDry.connect(this._audioContext.destination);

    this._globalEffects.push({
      type: 'Reverb',
      node: convolver,
      wetGain: reverbWet,
      dryGain: reverbDry
    });
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // Create a new track (optional name)
  static _addTrack(defaultName = `Track ${this._tracks.length + 1}`) {
    // Pick next default color from palette
    const color = this._defaultColors[this._tracks.length % this._defaultColors.length];
    const idx = this._tracks.length;

    // Per‐track Gain → Pan
    const gainNode = this._audioContext.createGain();
    gainNode.gain.value = 1.0;
    const panNode = this._audioContext.createStereoPanner();
    panNode.pan.value = 0;
    gainNode.connect(panNode);
    // Route into master Delay dry path so it goes through master effects
    panNode.connect(this._globalEffects.find(eff => eff.type === 'Delay').dryGain);

    // Initialize empty patterns
    const patterns = Array.from({ length: this._patternCount }, () => {
      return { sequence: new Array(this._numSteps).fill(0), velocity: new Array(this._numSteps).fill(1.0) };
    });
    // patterns[p][step]—0 or 1 for on/off; velocity is 0–1 per step

    const track = {
      name: defaultName,
      color,
      gainNode,
      panNode,
      volume: 1.0,
      pan: 0,
      muted: false,
      solo: false,
      patterns,                           // [{ sequence: [0/1×16], velocity: [0–1×16] }, × _patternCount]
      samples: {},                        // { patternIndex: { stepIndex: sampleIdx } }
      effects: [],                        // per‐track effects
      analyser: null,                     // AnalyserNode for level meters
      isPlugin: false,
      pluginInstance: null,
      parameters: {},
      pianoNotes: new Set(),              // set of "midiNote-step"
      usePianoRoll: false
    };

    // Create an AnalyserNode for level metering
    const analyser = this._audioContext.createAnalyser();
    analyser.fftSize = 256;
    gainNode.connect(analyser);
    analyser.connect(this._globalEffects.find(eff => eff.type === 'Delay').dryGain);
    track.analyser = analyser;

    this._tracks.push(track);
    this._renderTracks();
    this._renderStepGrid();
    this._renderMixer();
    this._renderPluginManager();
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // Render the track list (left pane)
  static _renderTracks() {
    const container = this._tracksContainer;
    container.innerHTML = '';

    this._tracks.forEach((track, idx) => {
      const row = document.createElement('div');
      row.classList.add('mm-track');
      row.dataset.index = idx;

      // Color swatch (click to open color picker)
      const colorDot = document.createElement('div');
      colorDot.classList.add('mm-channel-color');
      colorDot.style.backgroundColor = track.color;
      colorDot.addEventListener('click', () => {
        const cp = document.createElement('input');
        cp.type = 'color';
        cp.value = track.color;
        cp.style.display = 'none';
        cp.addEventListener('input', (e) => {
          track.color = e.target.value;
          this._renderTracks();
          this._renderStepGrid();
        });
        document.body.appendChild(cp);
        cp.click();
        cp.remove();
      });
      row.appendChild(colorDot);

      // Track name input
      const nameInput = document.createElement('input');
      nameInput.type = 'text';
      nameInput.value = track.name;
      nameInput.dataset.index = idx;
      nameInput.placeholder = 'Track Name';
      nameInput.style.fontSize = '14px';
      nameInput.addEventListener('change', (e) => {
        const i = parseInt(e.target.dataset.index, 10);
        const val = e.target.value.trim();
        this._tracks[i].name = val === '' ? `Track ${i + 1}` : val;
        this._renderMixer();
        this._renderPluginManager();
        this._renderTracks();
        this._renderStepGrid();
      });
      row.appendChild(nameInput);

      // Load Sample hint
      const loadBtn = this._makeButton('Load Sample', 'track-button', () => {
        alert('Switch to the "Samples" tab and drag a sample onto this track’s step to assign.');
      });
      loadBtn.dataset.index = idx;
      row.appendChild(loadBtn);

      // Piano Roll toggle
      const pianoBtn = this._makeButton(track.usePianoRoll ? 'Hide Piano' : 'Piano Roll', 'track-button', (e) => {
        this._togglePianoRoll(idx);
        e.currentTarget.textContent = track.usePianoRoll ? 'Hide Piano' : 'Piano Roll';
      });
      pianoBtn.dataset.index = idx;
      row.appendChild(pianoBtn);

      // Remove Track
      const removeBtn = this._makeButton('✖', 'track-button remove-btn', () => {
        this._pushHistory();
        this._removeTrack(idx);
      });
      removeBtn.dataset.index = idx;
      row.appendChild(removeBtn);

      // Mute / Unmute
      const muteBtn = this._makeButton(track.muted ? 'Unmute' : 'Mute', 'track-button', (e) => {
        this._pushHistory();
        this._tracks[idx].muted = !this._tracks[idx].muted;
        this._updateTrackGain(idx);
        e.currentTarget.textContent = this._tracks[idx].muted ? 'Unmute' : 'Mute';
      });
      muteBtn.dataset.index = idx;
      row.appendChild(muteBtn);

      // Solo / Unsolo
      const soloBtn = this._makeButton(track.solo ? 'Unsolo' : 'Solo', 'track-button', (e) => {
        this._pushHistory();
        this._tracks[idx].solo = !this._tracks[idx].solo;
        this._updateSoloStates();
        e.currentTarget.textContent = this._tracks[idx].solo ? 'Unsolo' : 'Solo';
      });
      soloBtn.dataset.index = idx;
      row.appendChild(soloBtn);

      container.appendChild(row);
    });
  }

  // Helper: create a styled button
  static _makeButton(text, classNames = '', onClick) {
    const btn = document.createElement('button');
    btn.textContent = text;
    btn.className = classNames;
    btn.addEventListener('click', onClick);
    return btn;
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // Remove a track and clean up its audio nodes
  static _removeTrack(idx) {
    if (idx < 0 || idx >= this._tracks.length) return;
    this._disconnectTrackAudio(idx);
    this._tracks.splice(idx, 1);
    this._renderTracks();
    this._renderStepGrid();
    this._renderMixer();
    this._renderPluginManager();
    this._renderPatternChain();
  }

  // Disconnect audio nodes, effects, and plugin cleanup for a track
  static _disconnectTrackAudio(trackIdx) {
    const track = this._tracks[trackIdx];
    if (!track) return;
    track.gainNode.disconnect();
    track.panNode.disconnect();
    track.analyser.disconnect();
    track.effects.forEach(eff => {
      eff.node.disconnect();
      if (eff.feedback) eff.feedback.disconnect();
      if (eff.wetGain) eff.wetGain.disconnect();
      if (eff.dryGain) eff.dryGain.disconnect();
      if (eff.oscillator) eff.oscillator.disconnect();
    });
    if (track.isPlugin && track.pluginInstance?.cleanup) {
      track.pluginInstance.cleanup();
    }
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // Toggle piano roll UI for a given track
  static _togglePianoRoll(trackIdx) {
    const track = this._tracks[trackIdx];
    track.usePianoRoll = !track.usePianoRoll;
    if (track.usePianoRoll) {
      this._openPianoRoll(trackIdx);
    } else {
      track.pianoNotes.clear();
      this._pianoRollModal.style.display = 'none';
      this._renderStepGrid();
    }
  }

  // Show piano roll for a given track
  static _openPianoRoll(trackIdx) {
    const track = this._tracks[trackIdx];
    const content = this._pianoContent;
    content.innerHTML = '';
    content.style.setProperty('--steps', this._numSteps);

    // Build 12 × numSteps grid
    for (let row = 0; row < 12; row++) {
      for (let col = 0; col < this._numSteps; col++) {
        const midiNote = 60 + (11 - row); // C4=60..B4=71
        const cell = document.createElement('div');
        cell.classList.add('piano-cell');
        cell.dataset.note = midiNote;
        cell.dataset.step = col;
        const key = `${midiNote}-${col}`;
        if (track.pianoNotes.has(key)) cell.classList.add('active');
        cell.addEventListener('click', () => {
          if (track.pianoNotes.has(key)) {
            track.pianoNotes.delete(key);
            cell.classList.remove('active');
          } else {
            track.pianoNotes.add(key);
            cell.classList.add('active');
          }
        });
        content.appendChild(cell);
      }
    }

    this._pianoRollModal.style.display = 'flex';
    this._pianoRollModal.dataset.trackIdx = trackIdx;
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // Update track gain based on mute/solo
  static _updateTrackGain(idx) {
    const track = this._tracks[idx];
    const anySolo = this._tracks.some(t => t.solo);
    const isSilent = track.muted || (anySolo && !track.solo);
    track.gainNode.gain.value = isSilent ? 0 : track.volume;
  }

  // Apply solo logic to all tracks
  static _updateSoloStates() {
    this._tracks.forEach((_, i) => this._updateTrackGain(i));
    this._renderMixer();
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // Render Mixer UI (per‐track faders, pan, effects, level meter)
  static _renderMixer() {
    const container = this._mixerContainer;
    container.innerHTML = `<h3>Mixer</h3>`;

    this._tracks.forEach((track, idx) => {
      const wrapper = document.createElement('div');
      wrapper.classList.add('mm-mixer-channel');

      // Track Label
      const label = document.createElement('label');
      label.textContent = track.name;
      wrapper.appendChild(label);

      // Volume Slider
      const volSlider = document.createElement('input');
      volSlider.type = 'range';
      volSlider.min = '0'; volSlider.max = '1'; volSlider.step = '0.01';
      volSlider.value = track.volume;
      volSlider.dataset.index = idx;
      volSlider.addEventListener('input', (e) => {
        const i = parseInt(e.target.dataset.index, 10);
        this._tracks[i].volume = parseFloat(e.target.value);
        this._updateTrackGain(i);
      });
      wrapper.appendChild(volSlider);

      // Pan Slider
      const panSlider = document.createElement('input');
      panSlider.type = 'range';
      panSlider.min = '-1'; panSlider.max = '1'; panSlider.step = '0.01';
      panSlider.value = track.pan;
      panSlider.dataset.index = idx;
      panSlider.addEventListener('input', (e) => {
        const i = parseInt(e.target.dataset.index, 10);
        this._tracks[i].pan = parseFloat(e.target.value);
        this._tracks[i].panNode.pan.value = this._tracks[i].pan;
      });
      wrapper.appendChild(panSlider);

      // Effect Selector
      const effSelect = document.createElement('select');
      effSelect.dataset.index = idx;
      this._effectOptions.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt;
        option.textContent = opt;
        if (track.effects.some(eff => eff.type === opt)) option.selected = true;
        effSelect.appendChild(option);
      });
      effSelect.addEventListener('change', (e) => {
        const i = parseInt(e.target.dataset.index, 10);
        this._pushHistory();
        this._setTrackEffect(i, e.target.value);
        this._renderEffectParams(i);
      });
      wrapper.appendChild(effSelect);

      // Effect parameters container
      const paramsDiv = document.createElement('div');
      paramsDiv.classList.add('mm-fx-params');
      paramsDiv.dataset.index = idx;
      wrapper.appendChild(paramsDiv);

      // Channel Options (level meter, plugin load, etc.)
      const optionsDiv = document.createElement('div');
      optionsDiv.classList.add('channel-options');

      // Load Plugin Button
      const loadPluginBtn = document.createElement('button');
      loadPluginBtn.textContent = 'Plugin';
      loadPluginBtn.addEventListener('click', () => {
        alert('Switch to the "Plugins" tab to load plugins and assign to this track.');
      });
      optionsDiv.appendChild(loadPluginBtn);

      // Analyser Level Meter
      const levelMeter = document.createElement('div');
      levelMeter.classList.add('level-meter');
      const meterFill = document.createElement('div');
      meterFill.classList.add('level-meter-fill');
      levelMeter.appendChild(meterFill);
      optionsDiv.appendChild(levelMeter);

      wrapper.appendChild(optionsDiv);

      container.appendChild(wrapper);

      // Start updating level meter
      this._updateLevelMeter(idx, meterFill);

      // Render effect parameters initially
      this._renderEffectParams(idx);
    });
  }

  // Animate a simple peak meter for a given track
  static _updateLevelMeter(trackIdx, meterFill) {
    const track = this._tracks[trackIdx];
    const analyser = track.analyser;
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const update = () => {
      if (!this._isPlaying) {
        meterFill.style.height = '0%';
        return;
      }
      analyser.getByteFrequencyData(dataArray);
      let max = 0;
      for (let i = 0; i < dataArray.length; i++) {
        if (dataArray[i] > max) max = dataArray[i];
      }
      const percent = (max / 255) * 100;
      meterFill.style.height = percent + '%';
      requestAnimationFrame(update);
    };
    update();
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // Render effect parameter controls for a track
  static _renderEffectParams(trackIdx) {
    const track = this._tracks[trackIdx];
    const container = this._mixerContainer.querySelector(`.mm-fx-params[data-index="${trackIdx}"]`);
    container.innerHTML = '';

    // Delay effect
    const delayEff = track.effects.find(e => e.type === 'Delay');
    if (delayEff) {
      const dtLabel = document.createElement('label'); dtLabel.textContent = 'Time:'; dtLabel.style.fontSize = '12px'; dtLabel.style.color = 'var(--text-primary)';
      const dtInput = document.createElement('input'); dtInput.type = 'range'; dtInput.min = '0'; dtInput.max = '1'; dtInput.step = '0.01'; dtInput.value = delayEff.node.delayTime.value;
      dtInput.addEventListener('input', (e) => {
        delayEff.node.delayTime.value = parseFloat(e.target.value);
      });
      container.appendChild(dtLabel); container.appendChild(dtInput);

      const fbLabel = document.createElement('label'); fbLabel.textContent = 'FB:'; fbLabel.style.fontSize = '12px'; fbLabel.style.color = 'var(--text-primary)';
      const fbInput = document.createElement('input'); fbInput.type = 'range'; fbInput.min = '0'; fbInput.max = '0.95'; fbInput.step = '0.01'; fbInput.value = delayEff.feedback.gain.value;
      fbInput.addEventListener('input', (e) => {
        delayEff.feedback.gain.value = parseFloat(e.target.value);
      });
      container.appendChild(fbLabel); container.appendChild(fbInput);
      return;
    }

    // Reverb
    const reverbEff = track.effects.find(e => e.type === 'Reverb');
    if (reverbEff) {
      const wetLabel = document.createElement('label'); wetLabel.textContent = 'Wet:'; wetLabel.style.fontSize = '12px'; wetLabel.style.color = 'var(--text-primary)';
      const wetInput = document.createElement('input'); wetInput.type = 'range'; wetInput.min = '0'; wetInput.max = '1'; wetInput.step = '0.01'; wetInput.value = reverbEff.wetGain.gain.value;
      wetInput.addEventListener('input', (e) => {
        reverbEff.wetGain.gain.value = parseFloat(e.target.value);
      });
      container.appendChild(wetLabel); container.appendChild(wetInput);
      return;
    }

    // Lowpass
    const lpEff = track.effects.find(e => e.type === 'Lowpass');
    if (lpEff) {
      const freqLabel = document.createElement('label'); freqLabel.textContent = 'Cutoff:'; freqLabel.style.fontSize = '12px'; freqLabel.style.color = 'var(--text-primary)';
      const freqInput = document.createElement('input');
      freqInput.type = 'range';
      freqInput.min = '100';
      freqInput.max = (this._audioContext.sampleRate / 2).toString();
      freqInput.step = '100';
      freqInput.value = lpEff.node.frequency.value;
      freqInput.addEventListener('input', (e) => {
        lpEff.node.frequency.value = parseFloat(e.target.value);
      });
      container.appendChild(freqLabel); container.appendChild(freqInput);
      return;
    }

    // Gate
    const gateEff = track.effects.find(e => e.type === 'Gate');
    if (gateEff) {
      const rateLabel = document.createElement('label'); rateLabel.textContent = 'Rate:'; rateLabel.style.fontSize = '12px'; rateLabel.style.color = 'var(--text-primary)';
      const rateInput = document.createElement('input'); rateInput.type = 'range'; rateInput.min = '0.1'; rateInput.max = '20'; rateInput.step = '0.1'; rateInput.value = gateEff.rateHz;
      rateInput.addEventListener('input', (e) => {
        gateEff.rateHz = parseFloat(e.target.value);
        gateEff.oscillator.frequency.value = gateEff.rateHz;
      });
      container.appendChild(rateLabel); container.appendChild(rateInput);
      return;
    }

    // BeatRepeat
    const brEff = track.effects.find(e => e.type === 'BeatRepeat');
    if (brEff) {
      const lengthLabel = document.createElement('label'); lengthLabel.textContent = 'Length (beats):'; lengthLabel.style.fontSize = '12px'; lengthLabel.style.color = 'var(--text-primary)';
      const lengthInput = document.createElement('input'); lengthInput.type = 'range'; lengthInput.min = '0.25'; lengthInput.max = '4'; lengthInput.step = '0.25'; lengthInput.value = brEff.beatLength;
      lengthInput.addEventListener('input', (e) => {
        brEff.beatLength = parseFloat(e.target.value);
        brEff.node.delayTime.value = (60 / this._tempo) * brEff.beatLength;
      });
      container.appendChild(lengthLabel); container.appendChild(lengthInput);

      const fbLabel2 = document.createElement('label'); fbLabel2.textContent = 'FB:'; fbLabel2.style.fontSize = '12px'; fbLabel2.style.color = 'var(--text-primary)';
      const fbInput2 = document.createElement('input'); fbInput2.type = 'range'; fbInput2.min = '0'; fbInput2.max = '0.95'; fbInput2.step = '0.01'; fbInput2.value = brEff.feedback.gain.value;
      fbInput2.addEventListener('input', (e) => {
        brEff.feedback.gain.value = parseFloat(e.target.value);
      });
      container.appendChild(fbLabel2); container.appendChild(fbInput2);
      return;
    }

    // None
    container.innerHTML = '';
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // Set a per-track effect (overwrites previous)
  static _setTrackEffect(trackIdx, effectName) {
    const track = this._tracks[trackIdx];
    // Disconnect existing chain
    track.gainNode.disconnect();
    track.effects.forEach(eff => {
      eff.node.disconnect();
      if (eff.feedback) eff.feedback.disconnect();
      if (eff.wetGain) eff.wetGain.disconnect();
      if (eff.dryGain) eff.dryGain.disconnect();
      if (eff.oscillator) eff.oscillator.disconnect();
    });
    track.effects = [];

    let lastNode = track.gainNode;

    // --- Delay ---
    if (effectName === 'Delay') {
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
      wetGain.connect(track.panNode);

      lastNode.connect(delayNode);
      lastNode.connect(dryGain);
      dryGain.connect(track.panNode);

      track.effects.push({ type: 'Delay', node: delayNode, feedback, wetGain, dryGain });
      return;
    }

    // --- Reverb ---
    if (effectName === 'Reverb') {
      const convolver = this._audioContext.createConvolver();
      convolver.buffer = this._reverbIRBuffer;
      const wetGain = this._audioContext.createGain();
      wetGain.gain.value = 0.3;
      const dryGain = this._audioContext.createGain();
      dryGain.gain.value = 0.7;

      lastNode.connect(convolver);
      convolver.connect(wetGain);
      wetGain.connect(track.panNode);
      lastNode.connect(dryGain);
      dryGain.connect(track.panNode);

      track.effects.push({ type: 'Reverb', node: convolver, wetGain, dryGain });
      return;
    }

    // --- Lowpass ---
    if (effectName === 'Lowpass') {
      const filter = this._audioContext.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 800;
      lastNode.connect(filter);
      filter.connect(track.panNode);
      track.effects.push({ type: 'Lowpass', node: filter });
      return;
    }

    // --- Gate (tempo‐synced tremolo) ---
    if (effectName === 'Gate') {
      const gateGain = this._audioContext.createGain();
      const osc = this._audioContext.createOscillator();
      osc.type = 'square';
      const defaultHz = this._tempo / 60; // one pulse per quarter–note
      osc.frequency.value = defaultHz;
      osc.connect(gateGain.gain);
      gateGain.gain.value = 1;
      lastNode.connect(gateGain);
      gateGain.connect(track.panNode);
      osc.start();
      track.effects.push({ type: 'Gate', node: gateGain, oscillator: osc, rateHz: defaultHz });
      return;
    }

    // --- BeatRepeat (one‐beat repeat) ---
    if (effectName === 'BeatRepeat') {
      const delayNode = this._audioContext.createDelay(4.0);
      const beatLen = (60 / this._tempo) * 1;
      delayNode.delayTime.value = beatLen;
      const feedbackGain = this._audioContext.createGain();
      feedbackGain.gain.value = 0.5;
      const wetGain = this._audioContext.createGain();
      wetGain.gain.value = 0.6;
      const dryGain = this._audioContext.createGain();
      dryGain.gain.value = 0.4;

      delayNode.connect(feedbackGain);
      feedbackGain.connect(delayNode);
      delayNode.connect(wetGain);
      wetGain.connect(track.panNode);
      lastNode.connect(delayNode);
      lastNode.connect(dryGain);
      dryGain.connect(track.panNode);

      track.effects.push({ type: 'BeatRepeat', node: delayNode, feedback: feedbackGain, wetGain, dryGain, beatLength: 1 });
      return;
    }

    // --- None ---
    lastNode.connect(track.panNode);
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // Render the step sequencer grid (including velocity sliders, drag‐drop)
  static _renderStepGrid() {
    const container = this._stepGridContainer;
    container.innerHTML = '';

    // Header row
    const header = document.createElement('div');
    header.classList.add('step-header');
    header.style.setProperty('--steps', this._numSteps);
    const dummy = document.createElement('div');
    dummy.classList.add('dummy');
    header.appendChild(dummy);
    for (let step = 0; step < this._numSteps; step++) {
      const lbl = document.createElement('span');
      lbl.textContent = step;
      header.appendChild(lbl);
    }
    container.appendChild(header);

    // Rows for each track
    this._tracks.forEach((track, tIdx) => {
      const row = document.createElement('div');
      row.classList.add('step-row');
      row.style.setProperty('--steps', this._numSteps);

      // Label + color dot
      const labelDiv = document.createElement('div');
      labelDiv.classList.add('step-label');
      const dot = document.createElement('div');
      dot.classList.add('color-dot');
      dot.style.backgroundColor = track.color;
      labelDiv.appendChild(dot);
      const txt = document.createElement('span');
      txt.textContent = track.name;
      labelDiv.appendChild(txt);
      row.appendChild(labelDiv);

      // Step cells
      for (let step = 0; step < this._numSteps; step++) {
        const cellWrapper = document.createElement('div');
        cellWrapper.style.position = 'relative';

        const cell = document.createElement('div');
        cell.classList.add('mm-step-cell');
        cell.dataset.track = tIdx;
        cell.dataset.step = step;

        // If step on in current pattern
        if (track.patterns[this._currentPattern].sequence[step]) {
          cell.classList.add('active');
        }

        // If sample assigned, outline
        const hasSample = track.samples[this._currentPattern]?.[step] !== undefined;
        const hasNote = [...track.pianoNotes].some(key => key.endsWith(`-${step}`));
        if ((!track.usePianoRoll && hasSample) || (track.usePianoRoll && hasNote)) {
          cell.style.boxShadow = `0 0 0 2px ${track.color}`;
        }

        // Click toggles on/off
        cell.addEventListener('click', () => {
          this._pushHistory();
          const patt = this._tracks[tIdx].patterns[this._currentPattern].sequence;
          patt[step] = patt[step] ? 0 : 1;
          cell.classList.toggle('active');
        });

        // Dragover for sample drop
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
          this._assignSampleToStep(sampleIdx, tIdx, step);
        });

        // Hover waveform preview if sample exists
        cell.addEventListener('mouseenter', () => {
          if (hasSample) {
            this._showWaveformPreview(track.samples[this._currentPattern][step], cell);
          }
        });
        cell.addEventListener('mouseleave', () => {
          this._removeWaveformPreview();
        });

        // Velocity slider
        const velWrapper = document.createElement('div');
        velWrapper.classList.add('mm-velocity-slider');
        const velInput = document.createElement('input');
        velInput.type = 'range';
        velInput.min = '0';
        velInput.max = '1';
        velInput.step = '0.01';
        velInput.value = track.patterns[this._currentPattern].velocity[step];
        velInput.dataset.track = tIdx;
        velInput.dataset.step = step;
        velInput.addEventListener('input', (e) => {
          this._pushHistory();
          const i = parseInt(e.target.dataset.track, 10);
          const s = parseInt(e.target.dataset.step, 10);
          this._tracks[i].patterns[this._currentPattern].velocity[s] = parseFloat(e.target.value);
        });
        velWrapper.appendChild(velInput);

        cellWrapper.appendChild(cell);
        cellWrapper.appendChild(velWrapper);
        row.appendChild(cellWrapper);
      }

      container.appendChild(row);
    });
  }

  // Show a small waveform preview above a cell
  static _showWaveformPreview(audioBuffer, cell) {
    this._removeWaveformPreview();
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
    ctx.fillStyle = 'var(--accent)';
    for (let i = 0; i < canvas.width; i++) {
      const min = data[i * step];
      const max = data[i * step]; // we can do a small slice, but keep it simple
      const y1 = ((1 - min) / 2) * canvas.height;
      const y2 = ((1 - max) / 2) * canvas.height;
      ctx.fillRect(i, y1, 1, Math.max(1, Math.abs(y2 - y1)));
    }
    this._currentWaveformCanvas = canvas;
  }

  static _removeWaveformPreview() {
    if (this._currentWaveformCanvas) {
      this._currentWaveformCanvas.remove();
      this._currentWaveformCanvas = null;
    }
  }

  // Assign a sample from library to a track & step
  static _assignSampleToStep(sampleIdx, trackIdx, stepIdx) {
    const sample = this._sampleLibrary[sampleIdx];
    if (!sample) return;
    const pat = this._currentPattern;
    if (!this._tracks[trackIdx].samples[pat]) {
      this._tracks[trackIdx].samples[pat] = {};
    }
    this._tracks[trackIdx].samples[pat][stepIdx] = sampleIdx;
    this._tracks[trackIdx].patterns[pat].sequence[stepIdx] = 1;
    this._renderStepGrid();
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // Highlight the currently playing step
  static _highlightStep(stepIndex) {
    const currentPatIdx = this._patternOrder[this._currentOrderIndex];
    if (currentPatIdx !== this._currentPattern) return;
    const prev = this._stepGridContainer.querySelectorAll('.mm-step-cell.playing');
    prev.forEach(b => b.classList.remove('playing'));
    const cells = this._stepGridContainer.querySelectorAll(`.mm-step-cell[data-step="${stepIndex}"]`);
    cells.forEach(b => b.classList.add('playing'));
  }

  static _clearStepHighlights() {
    const playingCells = this._stepGridContainer.querySelectorAll('.mm-step-cell.playing');
    playingCells.forEach(cell => cell.classList.remove('playing'));
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // Start playback: set scheduling variables & loop
  static _startPlayback() {
    if (this._isPlaying) return;
    if (this._audioContext.state === 'suspended') {
      this._audioContext.resume();
    }
    this._isPlaying = true;
    this._currentStep = 0;
    this._currentOrderIndex = 0;
    this._nextNoteTime = this._audioContext.currentTime + 0.05;
    this._scheduleAhead();
    this._lookaheadIntervalId = setInterval(() => this._scheduleAhead(), 25);

    // If metronome on, set metronome oscillator frequency
    if (this._metronomeOn) {
      this._metronomeOsc.frequency.value = this._tempo / 60; // Hz = BPM/60
    }
  }

  // Stop playback
  static _stopPlayback() {
    if (!this._isPlaying) return;
    this._isPlaying = false;
    clearInterval(this._lookaheadIntervalId);
    this._clearStepHighlights();
    // Silence metronome
    this._metronomeGain.gain.value = 0;
  }

  // Schedule ahead loop
  static _scheduleAhead() {
    const secondsPerBeat = 60.0 / this._tempo;
    const secondsPerStep = secondsPerBeat / this._resolution;

    while (this._nextNoteTime < this._audioContext.currentTime + this._scheduleAheadTime) {
      const currentPatIdx = this._patternOrder[this._currentOrderIndex];

      // Highlight UI
      if (currentPatIdx === this._currentPattern) {
        this._highlightStep(this._currentStep);
      }

      // Metronome click on quarter‐notes
      if (this._metronomeOn && this._currentStep % this._resolution === 0) {
        this._metronomeGain.gain.setValueAtTime(1.0, this._nextNoteTime);
        this._metronomeGain.gain.exponentialRampToValueAtTime(0.001, this._nextNoteTime + 0.05);
        // Flash the beat indicator
        this._beatFlash.style.background = 'var(--accent)';
        setTimeout(() => { this._beatFlash.style.background = 'var(--bg-primary)'; }, 60);
      }

      // Schedule each track
      this._tracks.forEach((track, tIdx) => {
        const patt = track.patterns[currentPatIdx].sequence;
        const velArr = track.patterns[currentPatIdx].velocity;
        const shouldPlay = patt[this._currentStep];
        const velocity = velArr[this._currentStep];
        const anySolo = this._tracks.some(t => t.solo);
        const isMutedOut = track.muted || (anySolo && !track.solo);
        if (shouldPlay && !isMutedOut) {
          const gainTime = this._nextNoteTime;
          // Sample playback
          const sampleIdx = track.samples[currentPatIdx]?.[this._currentStep];
          if (!track.usePianoRoll && sampleIdx !== undefined) {
            const buffer = this._sampleLibrary[sampleIdx].audioBuffer;
            const src = this._audioContext.createBufferSource();
            src.buffer = buffer;
            const tempGain = this._audioContext.createGain();
            tempGain.gain.value = velocity;
            src.connect(tempGain);
            tempGain.connect(track.gainNode);
            src.start(gainTime);
          }
          // Piano Roll playback (plugin)
          else if (track.usePianoRoll && track.pluginInstance) {
            track.pianoNotes.forEach(key => {
              const [midiStr, stepStr] = key.split('-');
              const midiNote = parseInt(midiStr, 10);
              const stepNum = parseInt(stepStr, 10);
              if (stepNum === this._currentStep) {
                const node = track.pluginInstance.createNode(this._audioContext);
                const freq = 440 * Math.pow(2, (midiNote - 69) / 12);
                if (node.frequency) node.frequency.value = freq;
                if (track.pluginInstance.applyParameters) {
                  track.pluginInstance.applyParameters(node, track.parameters);
                }
                // Apply velocity if applicable
                if (node.gain) {
                  node.gain.value = velocity;
                } else {
                  const tempGain2 = this._audioContext.createGain();
                  tempGain2.gain.value = velocity;
                  node.connect(tempGain2);
                  node = tempGain2;
                }
                let lastNode = node;
                track.effects.forEach(eff => {
                  lastNode.connect(eff.node);
                  lastNode = eff.node;
                });
                lastNode.connect(track.gainNode);
                if (typeof node.start === 'function') {
                  node.start(gainTime);
                  node.stop(gainTime + secondsPerStep);
                }
              }
            });
          }
        }
      });

      // Advance time
      this._nextNoteTime += secondsPerStep;
      this._currentStep++;
      if (this._currentStep >= this._numSteps) {
        this._currentStep = 0;
        this._currentOrderIndex = (this._currentOrderIndex + 1) % this._patternOrder.length;
      }
    }
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // Render the pattern chain with drag‐reorder
  static _renderPatternChain() {
    const container = this._chainContainer;
    container.innerHTML = '';
    this._patternOrder.forEach((patIdx, i) => {
      const div = document.createElement('div');
      div.classList.add('mm-chain-step');
      if (i === 0) div.classList.add('active');
      div.textContent = patIdx + 1;
      div.draggable = true;
      div.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', div.textContent - 1);
        div.classList.add('drag-source');
      });
      div.addEventListener('dragover', (e) => {
        e.preventDefault();
        div.classList.add('drag-over');
      });
      div.addEventListener('dragleave', () => {
        div.classList.remove('drag-over');
      });
      div.addEventListener('drop', (e) => {
        e.preventDefault();
        const fromPattern = parseInt(e.dataTransfer.getData('text/plain'), 10);
        const toPattern = patIdx;
        const fromIndex = this._patternOrder.indexOf(fromPattern);
        const toIndex = this._patternOrder.indexOf(toPattern);
        if (fromIndex !== -1 && toIndex !== -1 && fromIndex !== toIndex) {
          this._pushHistory();
          this._patternOrder.splice(fromIndex, 1);
          this._patternOrder.splice(toIndex, 0, fromPattern);
          this._renderPatternChain();
        }
      });
      div.addEventListener('click', () => {
        this._pushHistory();
        this._patternOrder.splice(i, 1);
        if (this._currentOrderIndex >= this._patternOrder.length) this._currentOrderIndex = 0;
        this._renderPatternChain();
      });
      container.appendChild(div);
    });
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // Switch between right‐pane tabs
  static _switchTab(tabName) {
    this._tabButtons.forEach(btn => {
      if (btn.dataset.tab === tabName) btn.classList.add('active');
      else btn.classList.remove('active');
    });
    const mixerDiv = this._container.querySelector('#mm-mixer');
    const samplesDiv = this._container.querySelector('#mm-samples');
    const pluginsDiv = this._container.querySelector('#mm-plugin-manager');
    mixerDiv.style.display   = tabName === 'mixer'  ? 'block' : 'none';
    samplesDiv.style.display = tabName === 'samples'? 'block' : 'none';
    pluginsDiv.style.display = tabName === 'plugins'? 'block' : 'none';
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // Render Sample Browser with drag‐source items
  static _renderSamples() {
    const container = this._samplesContainer;
    container.innerHTML = `<h3>Sample Browser</h3>`;

    // “Add Sample” button
    const addBtn = this._makeButton('+ Add Sample', '', () => this._promptAddSample());
    addBtn.style.marginTop = '6px';
    addBtn.style.background = 'var(--accent-2)';
    addBtn.style.fontSize = '14px';
    addBtn.style.padding = '6px 12px';
    addBtn.style.transition = 'background 0.2s ease';
    addBtn.addEventListener('mouseover', () => addBtn.style.background = '#229954');
    addBtn.addEventListener('mouseout', () => addBtn.style.background = 'var(--accent-2)');
    container.appendChild(addBtn);

    // List of samples
    const listDiv = document.createElement('div');
    listDiv.classList.add('sample-list');
    this._sampleLibrary.forEach((sample, idx) => {
      const item = document.createElement('div');
      item.classList.add('sample-item');
      item.textContent = sample.name;
      item.draggable = true;
      item.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', idx.toString());
      });
      listDiv.appendChild(item);
    });
    container.appendChild(listDiv);
  }

  // Prompt to import a sample into the library
  static _promptAddSample() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'audio/*';
    fileInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const arrayBuffer = await file.arrayBuffer();
      const audioBuffer = await this._audioContext.decodeAudioData(arrayBuffer);
      // Convert AudioBuffer to WAV base64 for project saving
      const wavView = this._encodeWAV(audioBuffer);
      const blob = new Blob([wavView], { type: 'audio/wav' });
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result.split(',')[1];
        this._sampleLibrary.push({ name: file.name, audioBuffer, base64 });
        this._renderSamples();
      };
      reader.readAsDataURL(blob);
    });
    fileInput.click();
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // Render Plugin Manager
  static _renderPluginManager() {
    const container = this._pluginManagerContainer;
    container.innerHTML = `<h3>Plugin Manager</h3>`;

    this._plugins.forEach((PluginClass, idx) => {
      const pluginDiv = document.createElement('div');
      pluginDiv.classList.add('mm-plugin');
      const instance = new PluginClass();
      const title = document.createElement('h4');
      title.textContent = instance.name;
      pluginDiv.appendChild(title);
      const desc = document.createElement('p');
      desc.textContent = instance.description;
      pluginDiv.appendChild(desc);
      const loadBtn = this._makeButton('Load into New Track', 'plugin-btn', () => {
        this._pushHistory();
        this._loadPluginIntoTrack(idx);
      });
      pluginDiv.appendChild(loadBtn);
      container.appendChild(pluginDiv);
    });

    const regBtn = this._makeButton('Register New Plugin...', 'plugin-btn', () => this._promptRegisterPlugin());
    regBtn.id = 'mm-register-plugin';
    regBtn.style.marginTop = '8px';
    container.appendChild(regBtn);
  }

  // Prompt user to paste JS plugin code; must extend PluginBase
  static _promptRegisterPlugin() {
    const example = `
// Paste your plugin JS code here. Must extend MusicMaker.PluginBase and call MusicMaker.registerPlugin(...):

class MySynth extends MusicMaker.PluginBase {
  constructor() {
    super();
    this.name = "My Synth";
    this.description = "Generates a simple sine wave with frequency control.";
    this.parameters = { frequency: 440 };
  }
  createNode(ctx) {
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = this.parameters.frequency;
    const gain = ctx.createGain();
    gain.gain.value = this.parameters.velocity || 1.0;
    osc.connect(gain);
    gain.start = osc.start.bind(osc);
    gain.stop = osc.stop.bind(osc);
    osc.start();
    return gain;
  }
  getParametersUI(container, updateCallback) {
    const label = document.createElement("label");
    label.textContent = "Freq:";
    label.style.color = "var(--text-primary)";
    label.style.marginRight = "4px";
    const input = document.createElement("input");
    input.type = "number";
    input.min = "20";
    input.max = "20000";
    input.value = 440;
    input.style.width = "80px";
    input.style.marginRight = "12px";
    input.addEventListener("change", (e) => {
      updateCallback("frequency", parseFloat(e.target.value));
    });
    container.appendChild(label);
    container.appendChild(input);

    const velLabel = document.createElement("label");
    velLabel.textContent = "Vel:";
    velLabel.style.color = "var(--text-primary)";
    velLabel.style.marginRight = "4px";
    const velInput = document.createElement("input");
    velInput.type = "number";
    velInput.min = "0";
    velInput.max = "1";
    velInput.step = "0.01";
    velInput.value = 1;
    velInput.style.width = "60px";
    velInput.addEventListener("change", (e) => {
      updateCallback("velocity", parseFloat(e.target.value));
    });
    container.appendChild(velLabel);
    container.appendChild(velInput);
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
      this._renderPluginManager();
    } catch (err) {
      console.error(err);
      alert('Failed to register plugin: ' + err.message);
    }
  }

  // Instantiate a plugin into a new track
  static _loadPluginIntoTrack(pluginIdx) {
    const PluginClass = this._plugins[pluginIdx];
    if (!PluginClass) return;
    const instance = new PluginClass();
    this._addTrack(instance.name);
    const track = this._tracks[this._tracks.length - 1];
    track.isPlugin = true;
    track.pluginInstance = instance;
    track.parameters = Object.assign({}, instance.parameters || {});
    track.usePianoRoll = true;
    this._renderPluginParameters(this._tracks.length - 1, instance);
    this._renderTracks();
    this._renderStepGrid();
  }

  // Render plugin parameter UI below a track row
  static _renderPluginParameters(trackIdx, pluginInstance) {
    const trackRow = this._tracksContainer.querySelector(`.mm-track[data-index="${trackIdx}"]`);
    if (!trackRow) return;
    const paramDiv = document.createElement('div');
    paramDiv.classList.add('mm-plugin');
    paramDiv.style.margin = '4px';
    paramDiv.style.background = 'var(--bg-secondary)';
    const title = document.createElement('h4');
    title.textContent = `${pluginInstance.name} Parameters`;
    title.style.color = 'var(--accent)';
    paramDiv.appendChild(title);
    pluginInstance.getParametersUI(paramDiv, (paramName, value) => {
      this._tracks[trackIdx].parameters[paramName] = value;
    });
    trackRow.insertAdjacentElement('afterend', paramDiv);
  }

  // Plugin registration API
  static registerPlugin(PluginClass) {
    if (typeof PluginClass !== 'function') return;
    if (!(PluginClass.prototype instanceof MusicMaker.PluginBase)) return;
    this._plugins.push(PluginClass);
    this._renderPluginManager();
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // Render the step sequencer grid (with velocity and drag/drop)
  static _renderStepGrid() {
    const container = this._stepGridContainer;
    container.innerHTML = '';

    // Header
    const header = document.createElement('div');
    header.classList.add('step-header');
    header.style.setProperty('--steps', this._numSteps);
    const dummy = document.createElement('div');
    dummy.classList.add('dummy');
    header.appendChild(dummy);
    for (let step = 0; step < this._numSteps; step++) {
      const lbl = document.createElement('span');
      lbl.textContent = step;
      header.appendChild(lbl);
    }
    container.appendChild(header);

    // Rows
    this._tracks.forEach((track, tIdx) => {
      const row = document.createElement('div');
      row.classList.add('step-row');
      row.style.setProperty('--steps', this._numSteps);

      // Label + color
      const labelDiv = document.createElement('div');
      labelDiv.classList.add('step-label');
      const dot = document.createElement('div');
      dot.classList.add('color-dot');
      dot.style.backgroundColor = track.color;
      labelDiv.appendChild(dot);
      const txt = document.createElement('span');
      txt.textContent = track.name;
      labelDiv.appendChild(txt);
      row.appendChild(labelDiv);

      // Steps
      for (let step = 0; step < this._numSteps; step++) {
        const cellWrapper = document.createElement('div');
        cellWrapper.style.position = 'relative';

        const cell = document.createElement('div');
        cell.classList.add('mm-step-cell');
        cell.dataset.track = tIdx;
        cell.dataset.step = step;

        // Active state
        if (track.patterns[this._currentPattern].sequence[step]) {
          cell.classList.add('active');
        }
        // Has sample or note?
        const hasSample = track.samples[this._currentPattern]?.[step] !== undefined;
        const hasNote = [...track.pianoNotes].some(key => key.endsWith(`-${step}`));
        if ((!track.usePianoRoll && hasSample) || (track.usePianoRoll && hasNote)) {
          cell.style.boxShadow = `0 0 0 2px ${track.color}`;
        }

        // Click toggles on/off
        cell.addEventListener('click', () => {
          this._pushHistory();
          const pattObj = this._tracks[tIdx].patterns[this._currentPattern];
          pattObj.sequence[step] = pattObj.sequence[step] ? 0 : 1;
          cell.classList.toggle('active');
        });

        // Drag/drop for samples
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
          this._assignSampleToStep(sampleIdx, tIdx, step);
        });

        // Waveform preview on hover
        cell.addEventListener('mouseenter', () => {
          if (hasSample) {
            const sampleIndex = track.samples[this._currentPattern][step];
            this._showWaveformPreview(this._sampleLibrary[sampleIndex].audioBuffer, cell);
          }
        });
        cell.addEventListener('mouseleave', () => {
          this._removeWaveformPreview();
        });

        // Velocity slider at bottom
        const velWrapper = document.createElement('div');
        velWrapper.classList.add('mm-velocity-slider');
        const velInput = document.createElement('input');
        velInput.type = 'range';
        velInput.min = '0';
        velInput.max = '1';
        velInput.step = '0.01';
        velInput.value = track.patterns[this._currentPattern].velocity[step];
        velInput.dataset.track = tIdx;
        velInput.dataset.step = step;
        velInput.addEventListener('input', (e) => {
          this._pushHistory();
          const i = parseInt(e.target.dataset.track, 10);
          const s = parseInt(e.target.dataset.step, 10);
          this._tracks[i].patterns[this._currentPattern].velocity[s] = parseFloat(e.target.value);
        });
        velWrapper.appendChild(velInput);

        cellWrapper.appendChild(cell);
        cellWrapper.appendChild(velWrapper);
        row.appendChild(cellWrapper);
      }

      container.appendChild(row);
    });
  }

  // Show small waveform above a step cell
  static _showWaveformPreview(audioBuffer, cell) {
    this._removeWaveformPreview();
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
    const stepSize = Math.floor(data.length / canvas.width);
    ctx.fillStyle = 'var(--accent)';
    for (let i = 0; i < canvas.width; i++) {
      const sample = data[i * stepSize];
      const y = ((1 - sample) / 2) * canvas.height;
      ctx.fillRect(i, y, 1, Math.max(1, canvas.height - y));
    }
    this._currentWaveformCanvas = canvas;
  }

  static _removeWaveformPreview() {
    if (this._currentWaveformCanvas) {
      this._currentWaveformCanvas.remove();
      this._currentWaveformCanvas = null;
    }
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // Render the pattern chain UI
  static _renderPatternChain() {
    const container = this._chainContainer;
    container.innerHTML = '';
    this._patternOrder.forEach((patIdx, i) => {
      const div = document.createElement('div');
      div.classList.add('mm-chain-step');
      if (i === 0) div.classList.add('active');
      div.textContent = patIdx + 1;
      div.draggable = true;
      div.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', div.textContent - 1);
        div.classList.add('drag-source');
      });
      div.addEventListener('dragover', (e) => {
        e.preventDefault();
        div.classList.add('drag-over');
      });
      div.addEventListener('dragleave', () => {
        div.classList.remove('drag-over');
      });
      div.addEventListener('drop', (e) => {
        e.preventDefault();
        const fromPattern = parseInt(e.dataTransfer.getData('text/plain'), 10);
        const toPattern = patIdx;
        const fromIndex = this._patternOrder.indexOf(fromPattern);
        const toIndex = this._patternOrder.indexOf(toPattern);
        if (fromIndex !== -1 && toIndex !== -1 && fromIndex !== toIndex) {
          this._pushHistory();
          this._patternOrder.splice(fromIndex, 1);
          this._patternOrder.splice(toIndex, 0, fromPattern);
          this._renderPatternChain();
        }
      });
      div.addEventListener('click', () => {
        this._pushHistory();
        this._patternOrder.splice(i, 1);
        if (this._currentOrderIndex >= this._patternOrder.length) this._currentOrderIndex = 0;
        this._renderPatternChain();
      });
      container.appendChild(div);
    });
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // Switch right pane tab
  static _switchTab(tabName) {
    this._tabButtons.forEach(btn => {
      if (btn.dataset.tab === tabName) btn.classList.add('active');
      else btn.classList.remove('active');
    });
    const mixerDiv = this._container.querySelector('#mm-mixer');
    const samplesDiv = this._container.querySelector('#mm-samples');
    const pluginsDiv = this._container.querySelector('#mm-plugin-manager');
    mixerDiv.style.display   = tabName === 'mixer'  ? 'block' : 'none';
    samplesDiv.style.display = tabName === 'samples'? 'block' : 'none';
    pluginsDiv.style.display = tabName === 'plugins'? 'block' : 'none';
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // Render Mixer (per‐track faders, pan, effects, level meters)
  static _renderMixer() {
    const container = this._mixerContainer;
    container.innerHTML = `<h3>Mixer</h3>`;

    this._tracks.forEach((track, idx) => {
      const wrapper = document.createElement('div');
      wrapper.classList.add('mm-mixer-channel');

      // Track Label
      const label = document.createElement('label');
      label.textContent = track.name;
      wrapper.appendChild(label);

      // Volume slider
      const volSlider = document.createElement('input');
      volSlider.type = 'range';
      volSlider.min = '0'; volSlider.max = '1'; volSlider.step = '0.01';
      volSlider.value = track.volume;
      volSlider.dataset.index = idx;
      volSlider.addEventListener('input', (e) => {
        const i = parseInt(e.target.dataset.index, 10);
        this._tracks[i].volume = parseFloat(e.target.value);
        this._updateTrackGain(i);
      });
      wrapper.appendChild(volSlider);

      // Pan slider
      const panSlider = document.createElement('input');
      panSlider.type = 'range';
      panSlider.min = '-1'; panSlider.max = '1'; panSlider.step = '0.01';
      panSlider.value = track.pan;
      panSlider.dataset.index = idx;
      panSlider.addEventListener('input', (e) => {
        const i = parseInt(e.target.dataset.index, 10);
        this._tracks[i].pan = parseFloat(e.target.value);
        this._tracks[i].panNode.pan.value = this._tracks[i].pan;
      });
      wrapper.appendChild(panSlider);

      // Effect selector
      const effSelect = document.createElement('select');
      effSelect.dataset.index = idx;
      this._effectOptions.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt;
        option.textContent = opt;
        if (track.effects.some(e => e.type === opt)) option.selected = true;
        effSelect.appendChild(option);
      });
      effSelect.addEventListener('change', (e) => {
        const i = parseInt(e.target.dataset.index, 10);
        this._pushHistory();
        this._setTrackEffect(i, e.target.value);
        this._renderEffectParams(i);
      });
      wrapper.appendChild(effSelect);

      // Effect parameters container
      const paramsDiv = document.createElement('div');
      paramsDiv.classList.add('mm-fx-params');
      paramsDiv.dataset.index = idx;
      wrapper.appendChild(paramsDiv);

      // Channel Options (load plugin, level meter)
      const optionsDiv = document.createElement('div');
      optionsDiv.classList.add('channel-options');

      // Load Plugin button
      const loadPluginBtn = document.createElement('button');
      loadPluginBtn.textContent = 'Plugin';
      loadPluginBtn.addEventListener('click', () => {
        alert('Switch to the "Plugins" tab to load or assign a plugin to this track.');
      });
      optionsDiv.appendChild(loadPluginBtn);

      // Level meter
      const levelMeter = document.createElement('div');
      levelMeter.classList.add('level-meter');
      const meterFill = document.createElement('div');
      meterFill.classList.add('level-meter-fill');
      levelMeter.appendChild(meterFill);
      optionsDiv.appendChild(levelMeter);

      wrapper.appendChild(optionsDiv);
      container.appendChild(wrapper);

      // Start meter animation
      this._updateLevelMeter(idx, meterFill);

      // Render effect params initially
      this._renderEffectParams(idx);
    });
  }

  // Animate level meter for a track
  static _updateLevelMeter(trackIdx, meterFill) {
    const track = this._tracks[trackIdx];
    const analyser = track.analyser;
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const animate = () => {
      if (!this._isPlaying) {
        meterFill.style.height = '0%';
        return;
      }
      analyser.getByteFrequencyData(dataArray);
      let max = 0;
      for (let i = 0; i < dataArray.length; i++) {
        if (dataArray[i] > max) max = dataArray[i];
      }
      const percent = (max / 255) * 100;
      meterFill.style.height = percent + '%';
      requestAnimationFrame(animate);
    };
    animate();
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // Render effect parameters below each effect selector
  static _renderEffectParams(trackIdx) {
    const track = this._tracks[trackIdx];
    const container = this._mixerContainer.querySelector(`.mm-fx-params[data-index="${trackIdx}"]`);
    container.innerHTML = '';

    // Delay
    const delayEff = track.effects.find(e => e.type === 'Delay');
    if (delayEff) {
      const dtLabel = document.createElement('label'); dtLabel.textContent = 'Time:'; dtLabel.style.fontSize = '12px'; dtLabel.style.color = 'var(--text-primary)';
      const dtInput = document.createElement('input'); dtInput.type = 'range'; dtInput.min = '0'; dtInput.max = '1'; dtInput.step = '0.01'; dtInput.value = delayEff.node.delayTime.value;
      dtInput.addEventListener('input', (e) => {
        delayEff.node.delayTime.value = parseFloat(e.target.value);
      });
      container.appendChild(dtLabel); container.appendChild(dtInput);

      const fbLabel = document.createElement('label'); fbLabel.textContent = 'FB:'; fbLabel.style.fontSize = '12px'; fbLabel.style.color = 'var(--text-primary)';
      const fbInput = document.createElement('input'); fbInput.type = 'range'; fbInput.min = '0'; fbInput.max = '0.95'; fbInput.step = '0.01'; fbInput.value = delayEff.feedback.gain.value;
      fbInput.addEventListener('input', (e) => {
        delayEff.feedback.gain.value = parseFloat(e.target.value);
      });
      container.appendChild(fbLabel); container.appendChild(fbInput);
      return;
    }

    // Reverb
    const reverbEff = track.effects.find(e => e.type === 'Reverb');
    if (reverbEff) {
      const wetLabel = document.createElement('label'); wetLabel.textContent = 'Wet:'; wetLabel.style.fontSize = '12px'; wetLabel.style.color = 'var(--text-primary)';
      const wetInput = document.createElement('input'); wetInput.type = 'range'; wetInput.min = '0'; wetInput.max = '1'; wetInput.step = '0.01'; wetInput.value = reverbEff.wetGain.gain.value;
      wetInput.addEventListener('input', (e) => {
        reverbEff.wetGain.gain.value = parseFloat(e.target.value);
      });
      container.appendChild(wetLabel); container.appendChild(wetInput);
      return;
    }

    // Lowpass
    const lpEff = track.effects.find(e => e.type === 'Lowpass');
    if (lpEff) {
      const freqLabel = document.createElement('label'); freqLabel.textContent = 'Cutoff:'; freqLabel.style.fontSize = '12px'; freqLabel.style.color = 'var(--text-primary)';
      const freqInput = document.createElement('input');
      freqInput.type = 'range'; freqInput.min = '100'; freqInput.max = (this._audioContext.sampleRate / 2).toString(); freqInput.step = '100'; freqInput.value = lpEff.node.frequency.value;
      freqInput.addEventListener('input', (e) => {
        lpEff.node.frequency.value = parseFloat(e.target.value);
      });
      container.appendChild(freqLabel); container.appendChild(freqInput);
      return;
    }

    // Gate
    const gateEff = track.effects.find(e => e.type === 'Gate');
    if (gateEff) {
      const rateLabel = document.createElement('label'); rateLabel.textContent = 'Rate:'; rateLabel.style.fontSize = '12px'; rateLabel.style.color = 'var(--text-primary)';
      const rateInput = document.createElement('input'); rateInput.type = 'range'; rateInput.min = '0.1'; rateInput.max = '20'; rateInput.step = '0.1'; rateInput.value = gateEff.rateHz;
      rateInput.addEventListener('input', (e) => {
        gateEff.rateHz = parseFloat(e.target.value);
        gateEff.oscillator.frequency.value = gateEff.rateHz;
      });
      container.appendChild(rateLabel); container.appendChild(rateInput);
      return;
    }

    // BeatRepeat
    const brEff = track.effects.find(e => e.type === 'BeatRepeat');
    if (brEff) {
      const lengthLabel = document.createElement('label'); lengthLabel.textContent = 'Length (beats):'; lengthLabel.style.fontSize = '12px'; lengthLabel.style.color = 'var(--text-primary)';
      const lengthInput = document.createElement('input'); lengthInput.type = 'range'; lengthInput.min = '0.25'; lengthInput.max = '4'; lengthInput.step = '0.25'; lengthInput.value = brEff.beatLength;
      lengthInput.addEventListener('input', (e) => {
        brEff.beatLength = parseFloat(e.target.value);
        brEff.node.delayTime.value = (60 / this._tempo) * brEff.beatLength;
      });
      container.appendChild(lengthLabel); container.appendChild(lengthInput);

      const fbLabel2 = document.createElement('label'); fbLabel2.textContent = 'FB:'; fbLabel2.style.fontSize = '12px'; fbLabel2.style.color = 'var(--text-primary)';
      const fbInput2 = document.createElement('input'); fbInput2.type = 'range'; fbInput2.min = '0'; fbInput2.max = '0.95'; fbInput2.step = '0.01'; fbInput2.value = brEff.feedback.gain.value;
      fbInput2.addEventListener('input', (e) => {
        brEff.feedback.gain.value = parseFloat(e.target.value);
      });
      container.appendChild(fbLabel2); container.appendChild(fbInput2);
      return;
    }

    // None
    container.innerHTML = '';
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // Render Samples tab
  static _renderSamples() {
    const container = this._samplesContainer;
    container.innerHTML = `<h3>Sample Browser</h3>`;

    // “Add Sample” button
    const addBtn = this._makeButton('+ Add Sample', '', () => this._promptAddSample());
    addBtn.style.marginTop = '6px';
    addBtn.style.background = 'var(--accent-2)';
    addBtn.style.fontSize = '14px';
    addBtn.style.padding = '6px 12px';
    addBtn.style.transition = 'background 0.2s ease';
    addBtn.addEventListener('mouseover', () => addBtn.style.background = '#229954');
    addBtn.addEventListener('mouseout', () => addBtn.style.background = 'var(--accent-2)');
    container.appendChild(addBtn);

    // List
    const listDiv = document.createElement('div');
    listDiv.classList.add('sample-list');
    this._sampleLibrary.forEach((sample, idx) => {
      const item = document.createElement('div');
      item.classList.add('sample-item');
      item.textContent = sample.name;
      item.draggable = true;
      item.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', idx.toString());
      });
      listDiv.appendChild(item);
    });
    container.appendChild(listDiv);
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // Render Plugin Manager tab
  static _renderPluginManager() {
    const container = this._pluginManagerContainer;
    container.innerHTML = `<h3>Plugin Manager</h3>`;

    this._plugins.forEach((PluginClass, idx) => {
      const pluginDiv = document.createElement('div');
      pluginDiv.classList.add('mm-plugin');
      const instance = new PluginClass();
      const title = document.createElement('h4');
      title.textContent = instance.name;
      pluginDiv.appendChild(title);
      const desc = document.createElement('p');
      desc.textContent = instance.description;
      pluginDiv.appendChild(desc);
      const loadBtn = this._makeButton('Load into New Track', 'plugin-btn', () => {
        this._pushHistory();
        this._loadPluginIntoTrack(idx);
      });
      pluginDiv.appendChild(loadBtn);
      container.appendChild(pluginDiv);
    });

    const regBtn = this._makeButton('Register New Plugin...', 'plugin-btn', () => this._promptRegisterPlugin());
    regBtn.id = 'mm-register-plugin';
    regBtn.style.marginTop = '8px';
    container.appendChild(regBtn);
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // Export current project to JSON (including samples base64)
  static _saveProject() {
    const project = {
      version: '3.0.0',
      tempo: this._tempo,
      tracks: [],
      patternOrder: [...this._patternOrder],
      samples: this._sampleLibrary.map(s => ({ name: s.name, base64: s.base64 })),
      // For each track: name, color, muted, solo, patterns (sequence + velocity), samples assignments, effects, plugin parameters
      plugins: this._plugins.map(Cls => Cls.name),
      trackPlugins: [],
    };
    this._tracks.forEach(track => {
      const tObj = {
        name: track.name,
        color: track.color,
        muted: track.muted,
        solo: track.solo,
        patterns: track.patterns.map(p => ({
          sequence: [...p.sequence],
          velocity: [...p.velocity]
        })),
        samples: {}, // copy of { pattern: { step: sampleIdx } }
        effects: track.effects.map(eff => {
          const base = { type: eff.type };
          if (eff.type === 'Delay') base.time = eff.node.delayTime.value, base.feedback = eff.feedback.gain.value, base.wet = eff.wetGain.gain.value, base.dry = eff.dryGain.gain.value;
          if (eff.type === 'Reverb') base.wet = eff.wetGain.gain.value, base.dry = eff.dryGain.gain.value;
          if (eff.type === 'Lowpass') base.frequency = eff.node.frequency.value;
          if (eff.type === 'Gate') base.rateHz = eff.rateHz;
          if (eff.type === 'BeatRepeat') base.beatLen = eff.beatLength, base.feedback = eff.feedback.gain.value, base.wet = eff.wetGain.gain.value, base.dry = eff.dryGain.gain.value;
          return base;
        }),
        isPlugin: track.isPlugin,
        pluginClass: track.isPlugin ? track.pluginInstance.constructor.name : null,
        pluginParams: track.isPlugin ? { ...track.parameters } : {},
      };
      // Flatten sample assignments
      for (const [patStr, stepMap] of Object.entries(track.samples)) {
        tObj.samples[patStr] = { ...stepMap };
      }
      project.tracks.push(tObj);
      project.trackPlugins.push(track.isPlugin ? track.pluginInstance.constructor.name : null);
    });

    const json = JSON.stringify(project);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'MusicMaker_Project_3.json';
    a.click();
    URL.revokeObjectURL(url);
    alert('Project saved!');
  }

  // Load project JSON from file input
  static _loadProjectFromFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const project = JSON.parse(reader.result);
        if (project.version !== '3.0.0') {
          if (!confirm('Project version mismatch. Attempt to load anyway?')) return;
        }
        this._pushHistory(); // Save state before loading

        // Reset everything
        this._cleanup();
        // Re‐initialize internal state but keep UI container
        this._tracks = [];
        this._sampleLibrary = [];
        this._plugins = [];
        this._globalEffects = [];
        this._undoStack = [];
        this._redoStack = [];
        this._patternOrder = [...project.patternOrder];
        this._currentPattern = 0;
        this._currentOrderIndex = 0;

        // Rebuild AudioContext & master chain
        this._audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this._masterGain = this._audioContext.createGain();
        this._masterGain.gain.value = project.tempo || 120;
        this._masterGain.connect(this._audioContext.destination);
        await this._loadReverbIR();
        this._createMasterEffects();

        // Rebuild sampleLibrary (decode base64 back to AudioBuffer)
        for (const s of project.samples) {
          const response = await fetch(`data:audio/wav;base64,${s.base64}`);
          const arrayBuffer = await response.arrayBuffer();
          const audioBuffer = await this._audioContext.decodeAudioData(arrayBuffer);
          this._sampleLibrary.push({ name: s.name, audioBuffer, base64: s.base64 });
        }

        // Rebuild tracks
        project.tracks.forEach((tObj, tIdx) => {
          this._addTrack(tObj.name);
          const track = this._tracks[tIdx];
          track.color = tObj.color;
          track.muted = tObj.muted;
          track.solo = tObj.solo;
          track.patterns = tObj.patterns.map(p => ({
            sequence: [...p.sequence],
            velocity: [...p.velocity]
          }));
          // Samples
          track.samples = {};
          for (const [patStr, stepMap] of Object.entries(tObj.samples)) {
            track.samples[patStr] = { ...stepMap };
          }
          // Effects
          track.effects = [];
          tObj.effects.forEach(eff => {
            this._setTrackEffect(tIdx, eff.type);
            const created = track.effects.find(x => x.type === eff.type);
            if (eff.type === 'Delay') {
              created.node.delayTime.value = eff.time;
              created.feedback.gain.value = eff.feedback;
              created.wetGain.gain.value = eff.wet;
              created.dryGain.gain.value = eff.dry;
            }
            if (eff.type === 'Reverb') {
              created.wetGain.gain.value = eff.wet;
              created.dryGain.gain.value = eff.dry;
            }
            if (eff.type === 'Lowpass') {
              created.node.frequency.value = eff.frequency;
            }
            if (eff.type === 'Gate') {
              created.rateHz = eff.rateHz;
              created.oscillator.frequency.value = eff.rateHz;
            }
            if (eff.type === 'BeatRepeat') {
              created.beatLength = eff.beatLen;
              created.node.delayTime.value = (60 / project.tempo) * eff.beatLen;
              created.feedback.gain.value = eff.feedback;
              created.wetGain.gain.value = eff.wet;
              created.dryGain.gain.value = eff.dry;
            }
          });
          // Plugins (if any)
          if (tObj.isPlugin && tObj.pluginClass) {
            // Re‐register plugin classes that match names in project.plugins
            const pluginName = tObj.pluginClass;
            // Attempt to find a matching loaded plugin; if not found, skip
            const pIndex = this._plugins.findIndex(c => c.name === pluginName);
            if (pIndex !== -1) {
              const PluginClass = this._plugins[pIndex];
              const instance = new PluginClass();
              track.isPlugin = true;
              track.pluginInstance = instance;
              track.parameters = { ...tObj.pluginParams };
              track.usePianoRoll = true;
              // Immediately apply parameters if plugin has applyParameters()
              if (typeof instance.applyParameters === 'function') {
                // Timed out slightly to ensure createNode context is ready
                setTimeout(() => instance.applyParameters(null, track.parameters), 50);
              }
            }
          }
        });

        // Restore undo/redo stacks to empty
        this._undoStack = [];
        this._redoStack = [];

        // Re-render all UIs
        this._renderTracks();
        this._renderStepGrid();
        this._renderMixer();
        this._renderSamples();
        this._renderPluginManager();
        this._renderPatternChain();
        this._tempoInput.value = project.tempo || this._tempo;
        this._tempo = project.tempo || this._tempo;

        alert('Project loaded successfully!');
      } catch (err) {
        console.error(err);
        alert('Failed to load project: ' + err.message);
      }
    };
    reader.readAsText(file);
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // Export a WAV via OfflineAudioContext (as in v2.1) but updated for v3
  static async _exportWAV() {
    if (this._exporting) return;
    this._exporting = true;

    // Compute length
    const bars = this._patternOrder.length;
    const lengthSecs = bars * this._numSteps * (60.0 / this._tempo) / this._resolution;
    const sampleRate = 44100;
    const offlineCtx = new OfflineAudioContext(2, sampleRate * lengthSecs, sampleRate);

    // Offline master
    const offlineMaster = offlineCtx.createGain();
    offlineMaster.gain.value = this._masterVolume;
    offlineMaster.connect(offlineCtx.destination);

    // Offline master Delay
    const liveMasterDelay = this._globalEffects.find(eff => eff.type === 'Delay');
    const offDelay = offlineCtx.createDelay(4.0);
    offDelay.delayTime.value = liveMasterDelay.node.delayTime.value;
    const offFb = offlineCtx.createGain();
    offFb.gain.value = liveMasterDelay.feedback.gain.value;
    const offWet = offlineCtx.createGain();
    offWet.gain.value = liveMasterDelay.wetGain.gain.value;
    const offDry = offlineCtx.createGain();
    offDry.gain.value = liveMasterDelay.dryGain.gain.value;

    offDelay.connect(offFb);
    offFb.connect(offDelay);
    offDelay.connect(offWet);
    offWet.connect(offlineMaster);
    offlineMaster.connect(offDry);
    offDry.connect(offlineMaster);

    // Offline master Reverb
    const liveMasterReverb = this._globalEffects.find(eff => eff.type === 'Reverb');
    const offConv = offlineCtx.createConvolver();
    offConv.buffer = this._reverbIRBuffer;
    const offRevWet = offlineCtx.createGain();
    offRevWet.gain.value = liveMasterReverb.wetGain.gain.value;
    const offRevDry = offlineCtx.createGain();
    offRevDry.gain.value = liveMasterReverb.dryGain.gain.value;

    offlineMaster.connect(offConv);
    offConv.connect(offRevWet);
    offRevWet.connect(offlineCtx.destination);
    offlineMaster.connect(offRevDry);
    offRevDry.connect(offlineCtx.destination);

    // Recreate tracks offline
    const offlineTracks = this._tracks.map(track => {
      const gainNode = offlineCtx.createGain();
      const anySolo = this._tracks.some(t => t.solo);
      const isMutedOut = track.muted || (anySolo && !track.solo);
      gainNode.gain.value = isMutedOut ? 0 : track.volume;

      const panNode = offlineCtx.createStereoPanner();
      panNode.pan.value = track.pan;
      gainNode.connect(panNode);
      panNode.connect(offDry);

      // Recreate per-track effects
      const offlineEffects = [];
      track.effects.forEach(eff => {
        if (eff.type === 'Delay') {
          const dNode = offlineCtx.createDelay(4.0);
          dNode.delayTime.value = eff.node.delayTime.value;
          const fb2 = offlineCtx.createGain();
          fb2.gain.value = eff.feedback.gain.value;
          const wet2 = offlineCtx.createGain();
          wet2.gain.value = eff.wetGain.gain.value;
          const dry2 = offlineCtx.createGain();
          dry2.gain.value = eff.dryGain.gain.value;

          dNode.connect(fb2);
          fb2.connect(dNode);
          dNode.connect(wet2);
          wet2.connect(panNode);
          gainNode.connect(dNode);
          gainNode.connect(dry2);
          dry2.connect(panNode);

          offlineEffects.push({ type: 'Delay', node: dNode, feedback: fb2, wetGain: wet2, dryGain: dry2 });
        }
        else if (eff.type === 'Reverb') {
          const conv2 = offlineCtx.createConvolver();
          conv2.buffer = this._reverbIRBuffer;
          const wet3 = offlineCtx.createGain();
          wet3.gain.value = eff.wetGain.gain.value;
          const dry3 = offlineCtx.createGain();
          dry3.gain.value = eff.dryGain.gain.value;

          gainNode.connect(conv2);
          conv2.connect(wet3);
          wet3.connect(panNode);
          gainNode.connect(dry3);
          dry3.connect(panNode);

          offlineEffects.push({ type: 'Reverb', node: conv2, wetGain: wet3, dryGain: dry3 });
        }
        else if (eff.type === 'Lowpass') {
          const filter2 = offlineCtx.createBiquadFilter();
          filter2.type = 'lowpass';
          filter2.frequency.value = eff.node.frequency.value;
          gainNode.connect(filter2);
          filter2.connect(panNode);
          offlineEffects.push({ type: 'Lowpass', node: filter2 });
        }
        else if (eff.type === 'Gate') {
          // Skip gate offline (dry)
          gainNode.connect(panNode);
        }
        else if (eff.type === 'BeatRepeat') {
          const dNode2 = offlineCtx.createDelay(4.0);
          const beatLen = eff.beatLength * (60 / this._tempo);
          dNode2.delayTime.value = beatLen;
          const fb3 = offlineCtx.createGain();
          fb3.gain.value = eff.feedback.gain.value;
          const wet4 = offlineCtx.createGain();
          wet4.gain.value = eff.wetGain.gain.value;
          const dry4 = offlineCtx.createGain();
          dry4.gain.value = eff.dryGain.gain.value;

          dNode2.connect(fb3);
          fb3.connect(dNode2);
          dNode2.connect(wet4);
          wet4.connect(panNode);
          gainNode.connect(dNode2);
          gainNode.connect(dry4);
          dry4.connect(panNode);

          offlineEffects.push({ type: 'BeatRepeat', node: dNode2, feedback: fb3, wetGain: wet4, dryGain: dry4, beatLength: eff.beatLength });
        }
      });

      return { track, gainNode, panNode, offlineEffects };
    });

    // Schedule offline
    const secondsPerBeat = 60.0 / this._tempo;
    const secondsPerStep = secondsPerBeat / this._resolution;
    let timeCursor = 0;

    this._patternOrder.forEach(patIdx => {
      for (let step = 0; step < this._numSteps; step++) {
        offlineTracks.forEach(oTrk => {
          const track = oTrk.track;
          const pattSeq = track.patterns[patIdx].sequence;
          const velArr = track.patterns[patIdx].velocity;
          const shouldPlay = pattSeq[step];
          const vel = velArr[step];
          const anySolo = this._tracks.some(t => t.solo);
          const isMutedOut = track.muted || (anySolo && !track.solo);
          if (shouldPlay && !isMutedOut) {
            // Sample playback
            const sampleIdx = track.samples[patIdx]?.[step];
            if (!track.usePianoRoll && sampleIdx !== undefined) {
              const bufSrc = offlineCtx.createBufferSource();
              bufSrc.buffer = this._sampleLibrary[sampleIdx].audioBuffer;
              const tempGain = offlineCtx.createGain();
              tempGain.gain.value = vel;
              bufSrc.connect(tempGain);
              tempGain.connect(oTrk.gainNode);
              bufSrc.start(timeCursor);
            }
            // Piano Roll playback
            else if (track.usePianoRoll && track.pluginInstance) {
              track.pianoNotes.forEach(key => {
                const [midiStr, stepStr] = key.split('-');
                const midiNote = parseInt(midiStr, 10);
                const stepNum = parseInt(stepStr, 10);
                if (stepNum === step) {
                  const node = track.pluginInstance.createNode(offlineCtx);
                  const f = 440 * Math.pow(2, (midiNote - 69) / 12);
                  if (node.frequency) node.frequency.value = f;
                  if (track.pluginInstance.applyParameters) {
                    track.pluginInstance.applyParameters(node, track.parameters);
                  }
                  // Apply velocity
                  if (node.gain) {
                    node.gain.value = vel;
                  } else {
                    const tg = offlineCtx.createGain();
                    tg.gain.value = vel;
                    node.connect(tg);
                    node = tg;
                  }
                  let lastNode = node;
                  oTrk.offlineEffects.forEach(eff => {
                    lastNode.connect(eff.node);
                    lastNode = eff.node;
                  });
                  lastNode.connect(oTrk.gainNode);
                  if (typeof node.start === 'function') {
                    node.start(timeCursor);
                    node.stop(timeCursor + secondsPerStep);
                  }
                }
              });
            }
          }
        });
        timeCursor += secondsPerStep;
      }
    });

    // Render and download
    const renderedBuffer = await offlineCtx.startRendering();
    const wavData = this._encodeWAV(renderedBuffer);
    const blob = new Blob([wavData], { type: 'audio/wav' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'MusicMaker_3_export.wav';
    a.click();
    URL.revokeObjectURL(url);

    this._exporting = false;
    alert('Export complete! Check your downloads.');
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // Encode AudioBuffer to 16‐bit PCM WAV
  static _encodeWAV(audioBuffer) {
    const numChan = audioBuffer.numberOfChannels;
    const sampleRate = audioBuffer.sampleRate;
    const bitsPerSample = 16;
    const blockAlign = numChan * bitsPerSample / 8;
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

    // Write interleaved PCM samples
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

  // ────────────────────────────────────────────────────────────────────────────────
  // Undo/Redo History Management
  static _pushHistory() {
    if (this._isApplyingHistory) return;
    // Serialize a snapshot of essential state
    const snapshot = {
      tempo: this._tempo,
      tracks: this._tracks.map(track => ({
        name: track.name,
        color: track.color,
        muted: track.muted,
        solo: track.solo,
        patterns: track.patterns.map(p => ({
          sequence: [...p.sequence],
          velocity: [...p.velocity]
        })),
        samples: { ...track.samples },
        effects: track.effects.map(eff => {
          const base = { type: eff.type };
          if (eff.type === 'Delay') base.time = eff.node.delayTime.value, base.feedback = eff.feedback.gain.value, base.wet = eff.wetGain.gain.value, base.dry = eff.dryGain.gain.value;
          if (eff.type === 'Reverb') base.wet = eff.wetGain.gain.value, base.dry = eff.dryGain.gain.value;
          if (eff.type === 'Lowpass') base.frequency = eff.node.frequency.value;
          if (eff.type === 'Gate') base.rateHz = eff.rateHz;
          if (eff.type === 'BeatRepeat') base.beatLen = eff.beatLength, base.feedback = eff.feedback.gain.value, base.wet = eff.wetGain.gain.value, base.dry = eff.dryGain.gain.value;
          return base;
        }),
        isPlugin: track.isPlugin,
        pluginParams: { ...track.parameters }
      })),
      patternOrder: [...this._patternOrder],
      sampleLibrary: this._sampleLibrary.map(s => s.base64),
    };
    this._undoStack.push(snapshot);
    // Clear redo stack
    this._redoStack = [];
  }

  static _applySnapshot(snapshot) {
    this._isApplyingHistory = true;
    // Restore tempo
    this._tempo = snapshot.tempo;
    this._tempoInput.value = this._tempo;

    // Restore sampleLibrary (base64 → AudioBuffer)
    // Note: We assume sampleLibrary length hasn't changed. For simplicity, we skip full re‐decode here.
    // (In a production build, re‐decode each base64 to AudioBuffer and replace audioBuffer).
    // For v3, we assume sampleLibrary is static and matches length.
    // If mismatch, skip.

    // Restore tracks
    if (snapshot.tracks.length !== this._tracks.length) {
      // Full rebuild required—skip in undo for now
      this._isApplyingHistory = false;
      return;
    }
    snapshot.tracks.forEach((tObj, tIdx) => {
      const track = this._tracks[tIdx];
      track.name = tObj.name;
      track.color = tObj.color;
      track.muted = tObj.muted;
      track.solo = tObj.solo;
      track.patterns = tObj.patterns.map(p => ({
        sequence: [...p.sequence],
        velocity: [...p.velocity]
      }));
      track.samples = { ...tObj.samples };
      // Remove existing effects
      track.effects.forEach(eff => {
        eff.node.disconnect();
        if (eff.feedback) eff.feedback.disconnect();
        if (eff.wetGain) eff.wetGain.disconnect();
        if (eff.dryGain) eff.dryGain.disconnect();
        if (eff.oscillator) eff.oscillator.disconnect();
      });
      track.effects = [];
      // Re‐apply effects
      tObj.effects.forEach(eff => this._setTrackEffect(tIdx, eff.type));
      const newly = track.effects;
      tObj.effects.forEach((eff, i) => {
        const created = newly[i];
        if (eff.type === 'Delay') {
          created.node.delayTime.value = eff.time;
          created.feedback.gain.value = eff.feedback;
          created.wetGain.gain.value = eff.wet;
          created.dryGain.gain.value = eff.dry;
        }
        if (eff.type === 'Reverb') {
          created.wetGain.gain.value = eff.wet;
          created.dryGain.gain.value = eff.dry;
        }
        if (eff.type === 'Lowpass') {
          created.node.frequency.value = eff.frequency;
        }
        if (eff.type === 'Gate') {
          created.rateHz = eff.rateHz;
          created.oscillator.frequency.value = eff.rateHz;
        }
        if (eff.type === 'BeatRepeat') {
          created.beatLength = eff.beatLen;
          created.node.delayTime.value = (60 / this._tempo) * eff.beatLen;
          created.feedback.gain.value = eff.feedback;
          created.wetGain.gain.value = eff.wet;
          created.dryGain.gain.value = eff.dry;
        }
      });
      track.isPlugin = tObj.isPlugin;
      track.parameters = { ...tObj.pluginParams };
    });
    this._patternOrder = [...snapshot.patternOrder];

    // Re‐render
    this._renderTracks();
    this._renderStepGrid();
    this._renderMixer();
    this._renderPatternChain();

    this._isApplyingHistory = false;
  }

  static _undo() {
    if (this._undoStack.length === 0) return;
    const snapshot = this._undoStack.pop();
    this._redoStack.push(snapshot);
    this._applySnapshot(snapshot);
  }

  static _redo() {
    if (this._redoStack.length === 0) return;
    const snapshot = this._redoStack.pop();
    this._undoStack.push(snapshot);
    this._applySnapshot(snapshot);
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // Toggle between dark/light theme
  static _toggleTheme() {
    const root = this._container;
    const current = root.getAttribute('data-theme');
    root.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // Export project state & audio samples into JSON
  // Already implemented in _saveProject()

  // ────────────────────────────────────────────────────────────────────────────────
  // Schedule lookahead is above in _scheduleAhead()

  // ────────────────────────────────────────────────────────────────────────────────
  // Project Cleanup: stop playback, close AudioContext, disconnect everything
  static _cleanup() {
    if (this._isPlaying) this._stopPlayback();
    if (this._audioContext) {
      this._audioContext.close();
      this._audioContext = null;
    }
    this._tracks.forEach((_, idx) => this._disconnectTrackAudio(idx));
    this._tracks = [];
    this._sampleLibrary = [];
    this._plugins = [];
    this._globalEffects = [];
    this._undoStack = [];
    this._redoStack = [];
  }
}

// ────────────────────────────────────────────────────────────────────────────────
// Base class for instrument/effect plugins. Must be extended by any plugin.
MusicMaker.PluginBase = class {
  constructor() {
    this.name = 'Unnamed Plugin';
    this.description = '';
    this.parameters = {};
  }
  // Return an AudioNode (Oscillator, Sampler, etc.)
  createNode(audioContext) {
    const osc = audioContext.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = 440;
    osc.start();
    return osc;
  }
  // Create UI for parameters; call updateCallback(paramName, value) on change
  getParametersUI(container, updateCallback) {
    const p = document.createElement('p');
    p.textContent = 'No parameters.';
    p.style.color = 'var(--text-primary)';
    container.appendChild(p);
  }
};

// Expose globally
window.MusicMaker = MusicMaker;
