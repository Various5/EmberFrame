/**
 * APP_METADATA
 * @name MusicMaker
 * @icon fas fa-music
 * @description A fully-featured digital audio workstation (DAW) clone inspired by FL Studio. Includes a step sequencer, sample/pattern management, mixer with built-in effects (Delay, Reverb, Lowpass), plugin architecture, and export functionality. Optimized to avoid resource overcommitment.
 * @category Music
 * @version 1.1.0
 * @author EmberFrame Team
 * @enabled true
 */

class MusicMaker {
  // ────────────────────────────────────────────────────────────────
  // Static properties for application state
  static _container = null;
  static _audioContext = null;
  static _masterGain = null;
  static _tracks = [];              // Array of track objects { name, samples, pattern, gainNode, panNode, effects: [], muted, solo, volume, pan }
  static _tempo = 120;              // BPM
  static _isPlaying = false;
  static _startTime = 0;            // AudioContext time when playback started
  static _currentStep = 0;          // Step index (0–15)
  static _scheduleAheadTime = 0.1;  // Seconds to schedule ahead
  static _lookaheadInterval = null; // setInterval id for scheduler
  static _numSteps = 16;            // Steps per pattern
  static _resolution = 4;           // Subdivisions per beat (16 steps per 4/4 bar)
  static _exporting = false;        // Flag during export

  // Plugin registry
  static _plugins = [];  // Array of registered instrument/effect plugin constructors

  // UI elements
  static _tempoInput = null;
  static _playButton = null;
  static _stopButton = null;
  static _addTrackButton = null;
  static _exportButton = null;
  static _tracksContainer = null;
  static _stepContainer = null;
  static _mixerContainer = null;
  static _pluginManagerContainer = null;

  // Pre-built effect options
  static _effectOptions = ['None', 'Delay', 'Reverb', 'Lowpass'];

  // Loaded IR buffer for reverb (small impulse response for lightweight reverb)
  static _reverbIRBuffer = null;

  // ────────────────────────────────────────────────────────────────
  // Create EmberFrame window
  static createWindow() {
    return {
      title: 'MusicMaker',
      width: '100%',
      height: '100%',
      content: this._createHTML(),
      onInit: (windowElement) => {
        this._container = windowElement;
        this._initialize();
      },
      onDestroy: () => {
        this._cleanup();
      },
      onClose: () => true,
      onMinimize: () => {
        if (this._isPlaying) this._stop();
      },
      onRestore: () => {}
    };
  }

  // ────────────────────────────────────────────────────────────────
  // Build main HTML layout
  static _createHTML() {
    return `
      <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;600;800&display=swap" rel="stylesheet">
      <div id="mm-container" style="display:flex; flex-direction:column; width:100%; height:100%; font-family:'Rajdhani', sans-serif; background: #181a1b; color: #e0e0e0;">
        <!-- Header / Controls -->
        <div id="mm-header" style="display:flex; align-items:center; padding:12px; background:#282a2c; border-bottom:2px solid #0f0f10;">
          <button id="mm-play" style="margin-right:12px; padding:8px 14px; background:#2ecc71; border:none; border-radius:4px; cursor:pointer; font-size:16px; color:#fff; font-weight:600;">Play ▶️</button>
          <button id="mm-stop" style="margin-right:24px; padding:8px 14px; background:#e74c3c; border:none; border-radius:4px; cursor:pointer; font-size:16px; color:#fff; font-weight:600;">Stop ⏹</button>
          <label style="margin-right:8px; font-weight:600;">Tempo:</label>
          <input id="mm-tempo" type="number" min="40" max="300" value="120" style="width:60px; padding:4px; margin-right:24px; border-radius:4px; border:1px solid #444; background:#fff; color:#2c3e50; font-weight:600;" />
          <button id="mm-add-track" style="margin-right:12px; padding:6px 12px; background:#3498db; border:none; border-radius:4px; cursor:pointer; font-size:14px; color:#fff; font-weight:600;">+ Add Track</button>
          <button id="mm-export" style="padding:6px 12px; background:#f39c12; border:none; border-radius:4px; cursor:pointer; font-size:14px; color:#fff; font-weight:600;">Export WAV</button>
          <div style="margin-left:auto; font-size:14px; opacity:0.7;">Steps: ${this._numSteps}</div>
        </div>
        <!-- Main Content: Step Sequencer & Mixer & Plugin Manager -->
        <div style="flex:1; display:flex; overflow:hidden;">
          <!-- Left: Track List & Step Sequencer -->
          <div id="mm-left-pane" style="flex:2; display:flex; flex-direction:column; overflow:auto; border-right:2px solid #0f0f10;">
            <!-- Track List (names, sample loaders, mute/solo) -->
            <div id="mm-tracks" style="flex:1; overflow:auto;"></div>
            <!-- Step Grid -->
            <div id="mm-step-grid" style="height:240px; border-top:2px solid #0f0f10; background:#282a2c; overflow:auto;"></div>
          </div>
          <!-- Right: Mixer & Plugin Manager -->
          <div id="mm-right-pane" style="flex:1; display:flex; flex-direction:column; overflow:auto; background:#1c1e1f;">
            <!-- Mixer Section -->
            <div id="mm-mixer" style="flex:1; padding:12px; border-bottom:2px solid #0f0f10; overflow:auto;"></div>
            <!-- Plugin Manager -->
            <div id="mm-plugin-manager" style="flex:1; padding:12px; overflow:auto;"></div>
          </div>
        </div>
      </div>
      <style>
        /* Scrollbar styling */
        #mm-left-pane::-webkit-scrollbar,
        #mm-right-pane::-webkit-scrollbar,
        #mm-tracks::-webkit-scrollbar,
        #mm-step-grid::-webkit-scrollbar,
        #mm-mixer::-webkit-scrollbar,
        #mm-plugin-manager::-webkit-scrollbar {
          width: 8px;
        }
        #mm-left-pane::-webkit-scrollbar-track,
        #mm-right-pane::-webkit-scrollbar-track {
          background: #1c1e1f;
        }
        #mm-left-pane::-webkit-scrollbar-thumb,
        #mm-right-pane::-webkit-scrollbar-thumb {
          background-color: #555;
          border-radius: 4px;
        }

        /* Step button styles */
        .mm-step-btn {
          width: 30px;
          height: 30px;
          margin:2px;
          background:#3a3c3e;
          border:none;
          border-radius:4px;
          cursor:pointer;
          transition: background 0.1s ease;
        }
        .mm-step-btn:hover { background: #4a4c4e; }
        .mm-step-btn.active { background:#e67e22; }
        .mm-step-btn.playing { border:2px solid #f1c40f; background:#d35400; }

        /* Track name & controls */
        .mm-track {
          display:flex;
          align-items:center;
          padding:8px;
          border-bottom:1px solid #0f0f10;
          background:#2c2e30;
        }
        .mm-track input[type="text"] {
          flex:1;
          padding:6px;
          background:#3a3c3e;
          border:1px solid #555;
          border-radius:4px;
          color:#ecf0f1;
          font-weight:600;
        }
        .mm-track button {
          margin-left:8px;
          padding:6px 10px;
          background:#7f8c8d;
          border:none;
          border-radius:4px;
          cursor:pointer;
          color:#ecf0f1;
          font-size:12px;
          font-weight:500;
          transition: background 0.1s ease;
        }
        .mm-track button:hover { background:#95a5a6; color:#2c3e50; }

        /* Mixer faders */
        .mm-mixer-channel {
          margin-bottom:16px;
          display:flex;
          align-items:center;
        }
        .mm-mixer-channel label {
          flex:1;
          font-size:14px;
          color:#ecf0f1;
        }
        .mm-mixer-channel input[type="range"] {
          flex:2;
          -webkit-appearance: none;
          width: 100%;
          height: 4px;
          background: #555;
          border-radius: 4px;
          outline: none;
        }
        .mm-mixer-channel input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 12px;
          height: 12px;
          background: #f39c12;
          border-radius: 50%;
          cursor: pointer;
        }

        /* Plugin manager */
        .mm-plugin {
          border:1px solid #555;
          border-radius:4px;
          padding:10px;
          margin-bottom:12px;
          background:#2c2e30;
        }
        .mm-plugin h4 {
          margin:0 0 6px 0;
          font-size:16px;
          color:#f39c12;
        }
        .mm-plugin p {
          margin:0;
          font-size:14px;
          color:#bdc3c7;
        }
        .mm-plugin button {
          margin-top:8px;
          padding:6px 12px;
          background:#16a085;
          border:none;
          border-radius:4px;
          cursor:pointer;
          color:#ecf0f1;
          font-size:14px;
          font-weight:600;
          transition: background 0.1s ease;
        }
        .mm-plugin button:hover { background:#1abc9c; }
      </style>
    `;
  }

  // ────────────────────────────────────────────────────────────────
  // Initialize application: AudioContext, UI bindings, default track, preload IR
  static async _initialize() {
    // Create AudioContext and master gain
    this._audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this._masterGain = this._audioContext.createGain();
    this._masterGain.gain.value = 0.8;
    this._masterGain.connect(this._audioContext.destination);

    // Load a small impulse response for reverb (lightweight)
    await this._loadReverbIR();

    // UI elements
    this._tempoInput = this._container.querySelector('#mm-tempo');
    this._playButton = this._container.querySelector('#mm-play');
    this._stopButton = this._container.querySelector('#mm-stop');
    this._addTrackButton = this._container.querySelector('#mm-add-track');
    this._exportButton = this._container.querySelector('#mm-export');
    this._tracksContainer = this._container.querySelector('#mm-tracks');
    this._stepContainer = this._container.querySelector('#mm-step-grid');
    this._mixerContainer = this._container.querySelector('#mm-mixer');
    this._pluginManagerContainer = this._container.querySelector('#mm-plugin-manager');

    // Event listeners
    this._playButton.addEventListener('click', () => this._play());
    this._stopButton.addEventListener('click', () => this._stop());
    this._tempoInput.addEventListener('change', (e) => {
      const val = parseInt(e.target.value);
      if (val >= 40 && val <= 300) this._tempo = val;
    });
    this._addTrackButton.addEventListener('click', () => this._addTrack());
    this._exportButton.addEventListener('click', () => this._exportWAV());

    // Build initial UI: no tracks yet
    this._renderTracks();
    this._renderStepGrid();
    this._renderMixer();
    this._renderPluginManager();

    // Add a default track
    this._addTrack('Track 1');
  }

  // ────────────────────────────────────────────────────────────────
  // Load a minimal impulse response for reverb
  static async _loadReverbIR() {
    // A 1-second simple white-noise-based IR (for demo); in practice, use a file or generate algorithmically
    const length = this._audioContext.sampleRate; // 1 second
    const irBuffer = this._audioContext.createBuffer(2, length, this._audioContext.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const data = irBuffer.getChannelData(ch);
      for (let i = 0; i < length; i++) {
        data[i] = (Math.random() * 2 - 1) * (1 - i / length) * 0.2; // decaying noise
      }
    }
    this._reverbIRBuffer = irBuffer;
  }

  // ────────────────────────────────────────────────────────────────
  // Create a new track object and corresponding UI
  static _addTrack(name = `Track ${this._tracks.length + 1}`) {
    // Track structure: { name, samples: {}, pattern: [0|1,...], gainNode, panNode, effects: [], muted, solo, volume, pan }
    const trackIdx = this._tracks.length;
    const gainNode = this._audioContext.createGain();
    gainNode.gain.value = 1.0;
    const panNode = this._audioContext.createStereoPanner();
    panNode.pan.value = 0;
    gainNode.connect(panNode);
    panNode.connect(this._masterGain);

    const newTrack = {
      name: name,
      samples: {},                       // User-defined samples per step
      pattern: new Array(this._numSteps).fill(0),  // 0 = off, 1 = on
      gainNode,
      panNode,
      effects: [],                       // Array of effect nodes in chain (connected: gain -> effects[0] -> ... -> pan)
      muted: false,
      solo: false,
      volume: 1.0,
      pan: 0,
      isPlugin: false,
      pluginInstance: null,
      parameters: {}
    };
    this._tracks.push(newTrack);
    this._renderTracks();
    this._renderMixer();
    this._renderStepGrid();
  }

  // ────────────────────────────────────────────────────────────────
  // Render the track list UI
  static _renderTracks() {
    this._tracksContainer.innerHTML = '';
    this._tracks.forEach((track, idx) => {
      const div = document.createElement('div');
      div.classList.add('mm-track');
      div.dataset.index = idx;
      div.innerHTML = `
        <input type="text" value="${track.name}" data-index="${idx}" class="mm-track-name" placeholder="Track Name" />
        <button data-action="load-sample" data-index="${idx}">Load Sample</button>
        <button data-action="remove-track" data-index="${idx}" style="background:#e74c3c; color:#fff;">✖</button>
        <button data-action="mute" data-index="${idx}">${track.muted ? 'Unmute' : 'Mute'}</button>
        <button data-action="solo" data-index="${idx}">${track.solo ? 'Unsolo' : 'Solo'}</button>
      `;
      this._tracksContainer.appendChild(div);

      // Event listeners for this track row
      const nameInput = div.querySelector('.mm-track-name');
      nameInput.addEventListener('change', (e) => {
        const i = parseInt(e.target.dataset.index);
        this._tracks[i].name = e.target.value;
        this._renderMixer();
        this._renderPluginManager();
      });

      div.querySelector('[data-action="load-sample"]').addEventListener('click', () => this._loadSample(idx));
      div.querySelector('[data-action="remove-track"]').addEventListener('click', () => this._removeTrack(idx));
      div.querySelector('[data-action="mute"]').addEventListener('click', (e) => {
        this._tracks[idx].muted = !this._tracks[idx].muted;
        this._updateTrackGain(idx);
        e.target.textContent = this._tracks[idx].muted ? 'Unmute' : 'Mute';
      });
      div.querySelector('[data-action="solo"]').addEventListener('click', (e) => {
        this._tracks[idx].solo = !this._tracks[idx].solo;
        this._updateSoloStates();
        e.target.textContent = this._tracks[idx].solo ? 'Unsolo' : 'Solo';
      });
    });
  }

  // ────────────────────────────────────────────────────────────────
  // Remove a track and update UI
  static _removeTrack(index) {
    if (this._tracks[index]) {
      // Disconnect audio nodes and effects
      this._disconnectTrackNodes(index);
      this._tracks.splice(index, 1);
      this._renderTracks();
      this._renderMixer();
      this._renderStepGrid();
      this._renderPluginManager();
    }
  }

  static _disconnectTrackNodes(trackIdx) {
    const track = this._tracks[trackIdx];
    // Disconnect gain, pan, and all effects
    track.gainNode.disconnect();
    track.panNode.disconnect();
    if (track.effects && track.effects.length) {
      track.effects.forEach(eff => eff.node.disconnect());
    }
    if (track.isPlugin && track.pluginInstance && track.pluginInstance.cleanup) {
      track.pluginInstance.cleanup();
    }
  }

  // ────────────────────────────────────────────────────────────────
  // Load an audio sample for a specific track step
  static _loadSample(trackIdx) {
    // Prompt user to select a sample file
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'audio/*';
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const arrayBuffer = await file.arrayBuffer();
      const audioBuffer = await this._audioContext.decodeAudioData(arrayBuffer);
      // Ask user which step they want to assign sample to
      const step = parseInt(prompt(`Assign sample to which step? (0–${this._numSteps - 1})`, '0'));
      if (isNaN(step) || step < 0 || step >= this._numSteps) {
        alert('Invalid step. Sample not assigned.');
        return;
      }
      this._tracks[trackIdx].samples[step] = audioBuffer;
      this._renderStepGrid();
    };
    input.click();
  }

  // ────────────────────────────────────────────────────────────────
  // Adjust gain based on mute/solo states
  static _updateTrackGain(idx) {
    const track = this._tracks[idx];
    const mutedOrSoloedOut = track.muted || (this._anySoloActive() && !track.solo);
    track.gainNode.gain.value = mutedOrSoloedOut ? 0 : track.volume;
  }

  static _anySoloActive() {
    return this._tracks.some(t => t.solo);
  }

  static _updateSoloStates() {
    this._tracks.forEach((_, idx) => this._updateTrackGain(idx));
    this._renderMixer();
  }

  // ────────────────────────────────────────────────────────────────
  // Render the mixer UI (volume sliders, pan knobs, effect selectors)
  static _renderMixer() {
    this._mixerContainer.innerHTML = '<h3 style="margin-top:0; color:#f39c12;">Mixer</h3>';
    this._tracks.forEach((track, idx) => {
      const div = document.createElement('div');
      div.classList.add('mm-mixer-channel');
      div.innerHTML = `
        <label>${track.name}</label>
        <input type="range" min="0" max="1" step="0.01" value="${track.volume}" data-index="${idx}" class="mm-mixer-volume" />
        <input type="range" min="-1" max="1" step="0.01" value="${track.pan}" data-index="${idx}" class="mm-mixer-pan" />
        <select data-index="${idx}" class="mm-mixer-effect" style="margin-left:8px; padding:4px; background:#3a3c3e; color:#ecf0f1; border:1px solid #555; border-radius:4px;">
          ${this._effectOptions.map(opt => `<option${track.effects.some(e => e.type === opt) ? ' selected' : ''}>${opt}</option>`).join('')}
        </select>
      `;
      this._mixerContainer.appendChild(div);

      // Volume control
      const volSlider = div.querySelector('.mm-mixer-volume');
      volSlider.addEventListener('input', (e) => {
        const i = parseInt(e.target.dataset.index);
        this._tracks[i].volume = parseFloat(e.target.value);
        this._updateTrackGain(i);
      });
      // Pan control
      const panSlider = div.querySelector('.mm-mixer-pan');
      panSlider.addEventListener('input', (e) => {
        const i = parseInt(e.target.dataset.index);
        this._tracks[i].pan = parseFloat(e.target.value);
        this._tracks[i].panNode.pan.value = this._tracks[i].pan;
      });
      // Effect selector
      const effSelect = div.querySelector('.mm-mixer-effect');
      effSelect.addEventListener('change', (e) => {
        const i = parseInt(e.target.dataset.index);
        this._setTrackEffect(i, e.target.value);
      });
    });
  }

  // ────────────────────────────────────────────────────────────────
  // Set an effect chain on a track: supports one effect at a time for simplicity
  static _setTrackEffect(trackIdx, effectName) {
    const track = this._tracks[trackIdx];
    // Disconnect existing effect chain
    track.gainNode.disconnect();
    track.effects.forEach(eff => eff.node.disconnect());
    track.effects = [];

    let lastNode = track.gainNode;

    if (effectName === 'Delay') {
      const delayNode = this._audioContext.createDelay(1.0);
      delayNode.delayTime.value = 0.25; // 1/4 beat at 120 BPM
      const feedback = this._audioContext.createGain();
      feedback.gain.value = 0.3;
      delayNode.connect(feedback);
      feedback.connect(delayNode);
      lastNode.connect(delayNode);
      track.effects.push({ type: 'Delay', node: delayNode, feedback });
      lastNode = delayNode;
    }
    else if (effectName === 'Reverb') {
      const convolver = this._audioContext.createConvolver();
      convolver.buffer = this._reverbIRBuffer;
      const wetGain = this._audioContext.createGain();
      wetGain.gain.value = 0.3;
      lastNode.connect(convolver);
      convolver.connect(wetGain);
      wetGain.connect(track.panNode);
      // Also keep dry signal
      lastNode.connect(track.panNode);
      track.effects.push({ type: 'Reverb', node: convolver, wetGain });
      // Pan node is final, so skip lastNode assignment
      return;
    }
    else if (effectName === 'Lowpass') {
      const filter = this._audioContext.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 800;
      lastNode.connect(filter);
      track.effects.push({ type: 'Lowpass', node: filter });
      lastNode = filter;
    }
    // If 'None' or unsupported, bypass effect

    // Connect final node to panNode
    lastNode.connect(track.panNode);
  }

  // ────────────────────────────────────────────────────────────────
  // Render the step sequencer grid
  static _renderStepGrid() {
    this._stepContainer.innerHTML = '';
    // Create header row: step numbers
    const headerRow = document.createElement('div');
    headerRow.style.display = 'flex';
    headerRow.style.padding = '6px';
    for (let step = 0; step < this._numSteps; step++) {
      const span = document.createElement('span');
      span.textContent = step;
      span.style.width = '34px';
      span.style.textAlign = 'center';
      span.style.fontSize = '12px';
      span.style.color = '#d0d0d0';
      span.style.margin = '2px';
      headerRow.appendChild(span);
    }
    this._stepContainer.appendChild(headerRow);

    // Each track row
    this._tracks.forEach((track, tIdx) => {
      const row = document.createElement('div');
      row.style.display = 'flex';
      row.style.alignItems = 'center';
      row.style.padding = '4px 6px';
      row.style.background = tIdx % 2 === 0 ? '#2a2c2e' : '#242627';
      // Track label
      const label = document.createElement('span');
      label.textContent = track.name;
      label.style.width = '100px';
      label.style.fontSize = '14px';
      label.style.marginRight = '8px';
      label.style.color = '#ecf0f1';
      row.appendChild(label);
      // Step buttons
      for (let step = 0; step < this._numSteps; step++) {
        const btn = document.createElement('button');
        btn.classList.add('mm-step-btn');
        btn.dataset.track = tIdx;
        btn.dataset.step = step;
        if (track.pattern[step]) btn.classList.add('active');
        // Indicate if a sample is loaded on this step
        if (track.samples[step] || (track.isPlugin && track.pattern[step])) {
          btn.style.border = '2px solid #e67e22';
        }
        btn.addEventListener('click', () => {
          track.pattern[step] = track.pattern[step] ? 0 : 1;
          btn.classList.toggle('active');
        });
        row.appendChild(btn);
      }
      this._stepContainer.appendChild(row);
    });
  }

  // ────────────────────────────────────────────────────────────────
  // Scheduling playback using Web Audio API
  static _play() {
    if (this._isPlaying) return;
    if (this._audioContext.state === 'suspended') {
      this._audioContext.resume();
    }
    this._isPlaying = true;
    this._startTime = this._audioContext.currentTime + 0.05; // slight delay
    this._currentStep = 0;
    this._scheduleSteps();
    this._lookaheadInterval = setInterval(() => this._scheduleSteps(), 25);
  }

  static _stop() {
    if (!this._isPlaying) return;
    clearInterval(this._lookaheadInterval);
    this._isPlaying = false;
    this._clearScheduledEvents();
    // Clear playing highlights
    this._clearStepHighlights();
  }

  // Schedule events for upcoming steps
  static _scheduleSteps() {
    const secondsPerBeat = 60.0 / this._tempo;
    const secondsPerStep = secondsPerBeat / this._resolution; // e.g. 0.125s at 120 BPM
    const currentTime = this._audioContext.currentTime - this._startTime;
    // Schedule a window ahead
    while (this._currentStep * secondsPerStep < currentTime + this._scheduleAheadTime) {
      this._scheduleStep(this._currentStep, this._startTime + this._currentStep * secondsPerStep);
      this._currentStep = (this._currentStep + 1) % this._numSteps;
    }
  }

  // Schedule all tracks for a given step at given time
  static _scheduleStep(stepIndex, time) {
    // Highlight this step in UI for visual feedback
    setTimeout(() => this._highlightStep(stepIndex), (time - this._audioContext.currentTime) * 1000);

    const secondsPerBeat = 60.0 / this._tempo;
    const secondsPerStep = secondsPerBeat / this._resolution;

    // For each track, if pattern[stepIndex] == 1 and sample/plugin exists, play
    this._tracks.forEach(track => {
      if ((track.pattern[stepIndex] && !track.isPlugin && track.samples[stepIndex] && !track.muted && (!this._anySoloActive() || track.solo))) {
        // Sample-based playback
        const buffer = track.samples[stepIndex];
        const src = this._audioContext.createBufferSource();
        src.buffer = buffer;
        src.connect(track.gainNode);
        src.start(time);
      }
      else if (track.isPlugin && track.pattern[stepIndex] && !track.muted && (!this._anySoloActive() || track.solo)) {
        // Plugin-based playback
        const node = track.pluginInstance.createNode(this._audioContext);
        // Apply parameters if provided
        if (track.pluginInstance.applyParameters && track.parameters) {
          track.pluginInstance.applyParameters(node, track.parameters);
        }
        // Connect through effect chain
        let lastNode = node;
        if (track.effects.length > 0) {
          track.effects.forEach(eff => {
            lastNode.connect(eff.node);
            lastNode = eff.node;
          });
        }
        lastNode.connect(track.gainNode);
        // Start and stop if oscillator
        if (typeof node.start === 'function') {
          node.start(time);
          node.stop(time + secondsPerStep);
        }
      }
    });
  }

  // Highlight step buttons during playback
  static _highlightStep(stepIndex) {
    // Remove previous highlights
    this._clearStepHighlights();
    // Add 'playing' class to all buttons at this step
    const btns = this._stepContainer.querySelectorAll(`.mm-step-btn[data-step="${stepIndex}"]`);
    btns.forEach(btn => btn.classList.add('playing'));
  }

  static _clearStepHighlights() {
    const playingBtns = this._stepContainer.querySelectorAll('.mm-step-btn.playing');
    playingBtns.forEach(btn => btn.classList.remove('playing'));
  }

  // ────────────────────────────────────────────────────────────────
  // Clear all scheduled (offline) events when stopping
  static _clearScheduledEvents() {
    this._clearStepHighlights();
    // Ongoing buffer sources may still play briefly; acceptable on stop
  }

  // ────────────────────────────────────────────────────────────────
  // Export current pattern/performance to WAV using OfflineAudioContext
  static async _exportWAV() {
    if (this._exporting) return;
    this._exporting = true;

    const lengthInSeconds = (this._numSteps * (60.0 / this._tempo) / this._resolution) * 4; // 4 bars
    const sampleRate = 44100;
    const offlineCtx = new OfflineAudioContext(2, sampleRate * lengthInSeconds, sampleRate);

    // Create master gain in offline context
    const offlineMaster = offlineCtx.createGain();
    offlineMaster.gain.value = 0.8;
    offlineMaster.connect(offlineCtx.destination);

    // For each track, create offline nodes, replicate effect chains
    const offlineTracks = this._tracks.map(track => {
      const gainNode = offlineCtx.createGain();
      const mutedOrSoloedOut = track.muted || (this._anySoloActive() && !track.solo);
      gainNode.gain.value = mutedOrSoloedOut ? 0 : track.volume;
      let inputNode = gainNode;

      // Recreate effect chain
      const effects = [];
      track.effects.forEach(eff => {
        let effNode;
        if (eff.type === 'Delay') {
          const delayNode = offlineCtx.createDelay(1.0);
          delayNode.delayTime.value = eff.node.delayTime.value;
          const feedback = offlineCtx.createGain();
          feedback.gain.value = eff.feedback.gain.value;
          delayNode.connect(feedback);
          feedback.connect(delayNode);
          inputNode.connect(delayNode);
          effNode = delayNode;
        }
        else if (eff.type === 'Reverb') {
          const convolver = offlineCtx.createConvolver();
          convolver.buffer = this._reverbIRBuffer;
          const wetGain = offlineCtx.createGain();
          wetGain.gain.value = eff.wetGain.gain.value;
          inputNode.connect(convolver);
          convolver.connect(wetGain);
          wetGain.connect(offlineMaster);
          // Dry path
          inputNode.connect(offlineMaster);
          effNode = convolver;
        }
        else if (eff.type === 'Lowpass') {
          const filter = offlineCtx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.value = eff.node.frequency.value;
          inputNode.connect(filter);
          effNode = filter;
        }
        effects.push({ type: eff.type, node: effNode });
        inputNode = effNode || inputNode;
      });

      inputNode.connect(offlineMaster);
      return { ...track, gainNode, panNode: null, effects };
    });

    const secondsPerBeat = 60.0 / this._tempo;
    const secondsPerStep = secondsPerBeat / this._resolution;

    // Schedule all notes for entire length (4 bars)
    for (let step = 0; step < this._numSteps * 4; step++) {
      const loopStep = step % this._numSteps;
      const time = step * secondsPerStep;
      offlineTracks.forEach(track => {
        if (!track.isPlugin && track.pattern[loopStep] && track.samples[loopStep] && !(track.muted || (this._anySoloActive() && !track.solo))) {
          const buffer = track.samples[loopStep];
          const src = offlineCtx.createBufferSource();
          src.buffer = buffer;
          src.connect(track.gainNode);
          src.start(time);
        }
        else if (track.isPlugin && track.pattern[loopStep] && !(track.muted || (this._anySoloActive() && !track.solo))) {
          const node = track.pluginInstance.createNode(offlineCtx);
          if (track.pluginInstance.applyParameters && track.parameters) {
            track.pluginInstance.applyParameters(node, track.parameters);
          }
          let lastNode = node;
          track.effects.forEach(eff => {
            lastNode.connect(eff.node);
            lastNode = eff.node;
          });
          lastNode.connect(track.gainNode);
          if (typeof node.start === 'function') {
            node.start(time);
            node.stop(time + secondsPerStep);
          }
        }
      });
    }

    // Render
    const renderedBuffer = await offlineCtx.startRendering();
    // Convert to WAV
    const wavData = this._encodeWAV(renderedBuffer);
    // Trigger download
    const blob = new Blob([wavData], { type: 'audio/wav' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'MusicMaker_export.wav';
    a.click();
    URL.revokeObjectURL(url);
    this._exporting = false;
    alert('Export complete! Check your downloads.');
  }

  // Encode AudioBuffer to WAV format (16-bit PCM)
  static _encodeWAV(audioBuffer) {
    const numChannels = audioBuffer.numberOfChannels;
    const sampleRate = audioBuffer.sampleRate;
    const format = 1; // PCM
    const bitsPerSample = 16;
    const blockAlign = numChannels * bitsPerSample / 8;
    const byteRate = sampleRate * blockAlign;
    const dataLength = audioBuffer.length * blockAlign;
    const buffer = new ArrayBuffer(44 + dataLength);
    const view = new DataView(buffer);

    /* RIFF identifier */
    this._writeString(view, 0, 'RIFF');
    /* file length */
    view.setUint32(4, 36 + dataLength, true);
    /* RIFF type */
    this._writeString(view, 8, 'WAVE');
    /* format chunk identifier */
    this._writeString(view, 12, 'fmt ');
    /* format chunk length */
    view.setUint32(16, 16, true);
    /* sample format (raw) */
    view.setUint16(20, format, true);
    /* channel count */
    view.setUint16(22, numChannels, true);
    /* sample rate */
    view.setUint32(24, sampleRate, true);
    /* byte rate (sample rate * block align) */
    view.setUint32(28, byteRate, true);
    /* block align (channel count * bytes per sample) */
    view.setUint16(32, blockAlign, true);
    /* bits per sample */
    view.setUint16(34, bitsPerSample, true);
    /* data chunk identifier */
    this._writeString(view, 36, 'data');
    /* data chunk length */
    view.setUint32(40, dataLength, true);

    // Write interleaved PCM samples
    let offset = 44;
    const channels = [];
    for (let c = 0; c < numChannels; c++) {
      channels.push(audioBuffer.getChannelData(c));
    }
    const length = audioBuffer.length;
    for (let i = 0; i < length; i++) {
      for (let c = 0; c < numChannels; c++) {
        let sample = Math.max(-1, Math.min(1, channels[c][i]));
        sample = sample < 0 ? sample * 0x8000 : sample * 0x7FFF;
        view.setInt16(offset, sample, true);
        offset += 2;
      }
    }
    return view;
  }

  static _writeString(view, offset, string) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

  // ────────────────────────────────────────────────────────────────
  // Plugin Manager UI & architecture
  static _renderPluginManager() {
    this._pluginManagerContainer.innerHTML = '<h3 style="margin-top:0; color:#f39c12;">Plugin Manager</h3>';
    // List registered plugins
    this._plugins.forEach((PluginClass, idx) => {
      const pluginDiv = document.createElement('div');
      pluginDiv.classList.add('mm-plugin');
      const pluginInstance = new PluginClass();
      pluginDiv.innerHTML = `
        <h4>${pluginInstance.name}</h4>
        <p>${pluginInstance.description}</p>
        <button data-action="load-plugin" data-index="${idx}">Load into New Track</button>
      `;
      this._pluginManagerContainer.appendChild(pluginDiv);
      pluginDiv.querySelector('[data-action="load-plugin"]').addEventListener('click', () => {
        this._loadPluginIntoTrack(idx);
      });
    });

    // Button to register new plugin (for advanced users)
    const registerBtn = document.createElement('button');
    registerBtn.textContent = 'Register New Plugin...';
    registerBtn.style.marginTop = '10px';
    registerBtn.style.padding = '6px 12px';
    registerBtn.style.background = '#2980b9';
    registerBtn.style.border = 'none';
    registerBtn.style.borderRadius = '4px';
    registerBtn.style.cursor = 'pointer';
    registerBtn.style.color = '#ecf0f1';
    registerBtn.style.fontWeight = '600';
    registerBtn.addEventListener('click', () => this._promptRegisterPlugin());
    this._pluginManagerContainer.appendChild(registerBtn);
  }

  // Allow user to register a plugin by pasting JS code
  static _promptRegisterPlugin() {
    const code = prompt(
      'Paste your plugin JS code here.\nIt should define a class that extends MusicMaker.PluginBase and register itself by calling MusicMaker.registerPlugin().\nExample:\n\n' +
      'class MySynth extends MusicMaker.PluginBase {\n' +
      '  constructor() {\n' +
      '    super();\n' +
      '    this.name = "My Synth";\n' +
      '    this.description = "Generates a sine wave. Use setFrequency(f) to change pitch.";\n' +
      '  }\n' +
      '  createNode(ctx) {\n' +
      '    const osc = ctx.createOscillator();\n' +
      '    osc.type = "sine";\n' +
      '    osc.frequency.value = this.parameters.frequency || 440;\n' +
      '    osc.start();\n' +
      '    return osc;\n' +
      '  }\n' +
      '  getParametersUI(container, updateCallback) {\n' +
      '    const label = document.createElement("label");\n' +
      '    label.textContent = "Frequency:";\n' +
      '    label.style.color = "#ecf0f1";\n' +
      '    label.style.marginRight = "6px";\n' +
      '    const input = document.createElement("input");\n' +
      '    input.type = "number";\n' +
      '    input.min = "20";\n' +
      '    input.max = "20000";\n' +
      '    input.value = 440;\n' +
      '    input.style.width = "80px";\n' +
      '    input.addEventListener("change", (e) => {\n' +
      '      const val = parseFloat(e.target.value);\n' +
      '      updateCallback("frequency", val);\n' +
      '    });\n' +
      '    container.appendChild(label);\n' +
      '    container.appendChild(input);\n' +
      '  }\n' +
      '}\n' +
      'MusicMaker.registerPlugin(MySynth);\n'
    );
    if (!code) return;
    try {
      eval(code);
      alert('Plugin registered successfully!');
      this._renderPluginManager();
    } catch (err) {
      console.error(err);
      alert('Failed to register plugin: ' + err.message);
    }
  }

  // Load a plugin into a new track slot
  static _loadPluginIntoTrack(pluginIdx) {
    const PluginClass = this._plugins[pluginIdx];
    if (!PluginClass) return;
    const pluginInstance = new PluginClass();
    // Create a new track slot
    this._addTrack(pluginInstance.name);
    const track = this._tracks[this._tracks.length - 1];

    // Mark as plugin track
    track.isPlugin = true;
    track.pluginInstance = pluginInstance;
    track.parameters = {};

    // Prepare UI for plugin parameters
    this._renderPluginParameters(this._tracks.length - 1, pluginInstance);
  }

  // Render UI controls for a plugin's parameters
  static _renderPluginParameters(trackIdx, pluginInstance) {
    const pluginDiv = document.createElement('div');
    pluginDiv.classList.add('mm-plugin');
    pluginDiv.innerHTML = `<h4>${pluginInstance.name} Parameters</h4>`;
    this._tracksContainer.appendChild(pluginDiv);
    pluginInstance.getParametersUI(pluginDiv, (paramName, value) => {
      this._tracks[trackIdx].parameters[paramName] = value;
    });
  }

  // Plugin registration API
  static registerPlugin(PluginClass) {
    if (typeof PluginClass !== 'function') return;
    // Ensure it extends PluginBase
    if (!(PluginClass.prototype instanceof MusicMaker.PluginBase)) return;
    this._plugins.push(PluginClass);
    this._renderPluginManager();
  }

  // ────────────────────────────────────────────────────────────────
  // Cleanup on window close
  static _cleanup() {
    if (this._isPlaying) this._stop();
    // Close AudioContext
    if (this._audioContext) {
      this._audioContext.close();
      this._audioContext = null;
    }
    this._tracks.forEach((_, idx) => this._disconnectTrackNodes(idx));
    this._tracks = [];
    this._plugins = [];
  }
}

// ────────────────────────────────────────────────────────────────
// Base class for instrument/effect plugins
MusicMaker.PluginBase = class {
  constructor() {
    this.name = 'Unnamed Plugin';
    this.description = '';
  }
  // Should return an AudioNode (e.g., OscillatorNode, Sampler, etc.)
  createNode(audioContext) {
    const osc = audioContext.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = 440;
    osc.start();
    return osc;
  }
  // Should create UI elements for parameter controls and call updateCallback(paramName, value) on change
  getParametersUI(container, updateCallback) {
    // Default: no parameters
    const p = document.createElement('p');
    p.textContent = 'No parameters.';
    p.style.color = '#ecf0f1';
    container.appendChild(p);
  }
};

// Expose globally for WindowManager
window.MusicMaker = MusicMaker;
