// EmberFrame Media Player - Advanced Music & Video Player
/**
 * APP_METADATA
 * @name Media Player
 * @icon fas fa-music
 * @description Simple Media Player Application
 * @category Media
 * @version 1.0.0
 * @author EmberFrame Team
 * @enabled true
 */
class MediaPlayer {
    static createWindow() {
        return {
            title: 'Media Player',
            width: '1000px',
            height: '700px',
            autoSize: false,
            content: `
                <div class="media-player">
                    <!-- Main Player Section -->
                    <div class="player-main">
                        <!-- Media Display Area -->
                        <div class="media-display">
                            <video id="media-video" style="display: none;"></video>
                            <div class="audio-visualizer" id="audio-visualizer">
                                <canvas id="visualizer-canvas"></canvas>
                                <div class="now-playing-info">
                                    <div class="track-title" id="track-title">No media loaded</div>
                                    <div class="track-artist" id="track-artist">Select a file to begin</div>
                                    <div class="track-album" id="track-album"></div>
                                </div>
                                <div class="album-art" id="album-art">
                                    <i class="fas fa-music"></i>
                                </div>
                            </div>
                        </div>

                        <!-- Player Controls -->
                        <div class="player-controls">
                            <div class="control-buttons">
                                <button class="control-btn" id="shuffle-btn" title="Shuffle">
                                    <i class="fas fa-random"></i>
                                </button>
                                <button class="control-btn" id="prev-btn" title="Previous">
                                    <i class="fas fa-step-backward"></i>
                                </button>
                                <button class="control-btn play-pause" id="play-pause-btn" title="Play/Pause">
                                    <i class="fas fa-play"></i>
                                </button>
                                <button class="control-btn" id="next-btn" title="Next">
                                    <i class="fas fa-step-forward"></i>
                                </button>
                                <button class="control-btn" id="repeat-btn" title="Repeat">
                                    <i class="fas fa-redo"></i>
                                </button>
                            </div>

                            <div class="progress-section">
                                <span class="time-display" id="current-time">0:00</span>
                                <div class="progress-container">
                                    <input type="range" class="progress-bar" id="progress-bar" min="0" max="100" value="0">
                                    <div class="progress-fill" id="progress-fill"></div>
                                </div>
                                <span class="time-display" id="total-time">0:00</span>
                            </div>

                            <div class="volume-section">
                                <button class="control-btn" id="mute-btn" title="Mute">
                                    <i class="fas fa-volume-up"></i>
                                </button>
                                <input type="range" class="volume-slider" id="volume-slider" min="0" max="100" value="70">
                            </div>
                        </div>
                    </div>

                    <!-- Sidebar -->
                    <div class="player-sidebar">
                        <!-- Tabs -->
                        <div class="sidebar-tabs">
                            <button class="tab-btn active" data-tab="playlist">
                                <i class="fas fa-list"></i> Playlist
                            </button>
                            <button class="tab-btn" data-tab="equalizer">
                                <i class="fas fa-sliders-h"></i> EQ
                            </button>
                            <button class="tab-btn" data-tab="files">
                                <i class="fas fa-folder"></i> Files
                            </button>
                        </div>

                        <!-- Playlist Tab -->
                        <div class="tab-content active" id="playlist-tab">
                            <div class="playlist-header">
                                <h3>Current Playlist</h3>
                                <div class="playlist-actions">
                                    <button class="action-btn" id="clear-playlist" title="Clear Playlist">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                    <button class="action-btn" id="save-playlist" title="Save as M3U">
                                        <i class="fas fa-save"></i>
                                    </button>
                                    <button class="action-btn" id="load-playlist" title="Load M3U">
                                        <i class="fas fa-folder-open"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="playlist-container" id="playlist-container">
                                <div class="playlist-empty">
                                    <i class="fas fa-music"></i>
                                    <p>Playlist is empty</p>
                                    <p>Add files from the Files tab</p>
                                </div>
                            </div>
                        </div>

                        <!-- Equalizer Tab -->
                        <div class="tab-content" id="equalizer-tab">
                            <div class="eq-header">
                                <h3>Equalizer</h3>
                                <div class="eq-controls">
                                    <button class="action-btn" id="eq-toggle" title="Enable/Disable EQ">
                                        <i class="fas fa-power-off"></i>
                                    </button>
                                    <select id="eq-presets">
                                        <option value="flat">Flat</option>
                                        <option value="rock">Rock</option>
                                        <option value="pop">Pop</option>
                                        <option value="jazz">Jazz</option>
                                        <option value="classical">Classical</option>
                                        <option value="electronic">Electronic</option>
                                        <option value="bass-boost">Bass Boost</option>
                                        <option value="vocal">Vocal</option>
                                    </select>
                                </div>
                            </div>
                            <div class="equalizer-container">
                                <div class="eq-band" data-frequency="32">
                                    <input type="range" class="eq-slider" min="-12" max="12" value="0" step="0.1">
                                    <label>32Hz</label>
                                </div>
                                <div class="eq-band" data-frequency="64">
                                    <input type="range" class="eq-slider" min="-12" max="12" value="0" step="0.1">
                                    <label>64Hz</label>
                                </div>
                                <div class="eq-band" data-frequency="125">
                                    <input type="range" class="eq-slider" min="-12" max="12" value="0" step="0.1">
                                    <label>125Hz</label>
                                </div>
                                <div class="eq-band" data-frequency="250">
                                    <input type="range" class="eq-slider" min="-12" max="12" value="0" step="0.1">
                                    <label>250Hz</label>
                                </div>
                                <div class="eq-band" data-frequency="500">
                                    <input type="range" class="eq-slider" min="-12" max="12" value="0" step="0.1">
                                    <label>500Hz</label>
                                </div>
                                <div class="eq-band" data-frequency="1000">
                                    <input type="range" class="eq-slider" min="-12" max="12" value="0" step="0.1">
                                    <label>1kHz</label>
                                </div>
                                <div class="eq-band" data-frequency="2000">
                                    <input type="range" class="eq-slider" min="-12" max="12" value="0" step="0.1">
                                    <label>2kHz</label>
                                </div>
                                <div class="eq-band" data-frequency="4000">
                                    <input type="range" class="eq-slider" min="-12" max="12" value="0" step="0.1">
                                    <label>4kHz</label>
                                </div>
                                <div class="eq-band" data-frequency="8000">
                                    <input type="range" class="eq-slider" min="-12" max="12" value="0" step="0.1">
                                    <label>8kHz</label>
                                </div>
                                <div class="eq-band" data-frequency="16000">
                                    <input type="range" class="eq-slider" min="-12" max="12" value="0" step="0.1">
                                    <label>16kHz</label>
                                </div>
                            </div>

                            <!-- Visualizer Settings -->
                            <div class="visualizer-settings">
                                <h4>Visualizer</h4>
                                <div class="viz-controls">
                                    <select id="viz-type">
                                        <option value="bars">Frequency Bars</option>
                                        <option value="wave">Waveform</option>
                                        <option value="circle">Circular</option>
                                        <option value="particles">Particles</option>
                                    </select>
                                    <label>
                                        <input type="checkbox" id="viz-enabled" checked>
                                        Enable Visualizer
                                    </label>
                                </div>
                            </div>
                        </div>

                        <!-- Files Tab -->
                        <div class="tab-content" id="files-tab">
                            <div class="files-header">
                                <h3>Media Files</h3>
                                <button class="action-btn" id="browse-files" title="Browse Files">
                                    <i class="fas fa-folder-open"></i>
                                </button>
                            </div>
                            <div class="file-types">
                                <div class="type-filter active" data-type="all">All</div>
                                <div class="type-filter" data-type="audio">Audio</div>
                                <div class="type-filter" data-type="video">Video</div>
                            </div>
                            <div class="files-container" id="files-container">
                                <div class="files-empty">
                                    <i class="fas fa-folder-open"></i>
                                    <p>No media files found</p>
                                    <p>Click "Browse Files" to add media</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Hidden Audio Element -->
                    <audio id="media-audio" crossorigin="anonymous"></audio>

                    <!-- Hidden File Input -->
                    <input type="file" id="file-input" multiple accept="audio/*,video/*" style="display: none;">
                </div>

                <style>
                    .media-player {
                        height: 100%;
                        display: flex;
                        background: linear-gradient(135deg, #0a0a0f 0%, #141420 50%, #1a1a2e 100%);
                        color: #00d4ff;
                        font-family: 'Orbitron', monospace;
                        overflow: hidden;
                    }

                    /* Main Player Section */
                    .player-main {
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        padding: 20px;
                    }

                    .media-display {
                        flex: 1;
                        position: relative;
                        border-radius: 15px;
                        overflow: hidden;
                        background: rgba(0, 0, 0, 0.3);
                        border: 1px solid rgba(0, 212, 255, 0.3);
                        margin-bottom: 20px;
                    }

                    #media-video {
                        width: 100%;
                        height: 100%;
                        object-fit: contain;
                        background: #000;
                    }

                    .audio-visualizer {
                        position: relative;
                        width: 100%;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: radial-gradient(circle, rgba(0, 212, 255, 0.1) 0%, rgba(0, 0, 0, 0.8) 100%);
                    }

                    #visualizer-canvas {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        opacity: 0.8;
                    }

                    .now-playing-info {
                        position: absolute;
                        bottom: 30px;
                        left: 30px;
                        z-index: 10;
                        text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
                    }

                    .track-title {
                        font-size: 24px;
                        font-weight: 700;
                        color: #00ffff;
                        margin-bottom: 8px;
                        text-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
                    }

                    .track-artist {
                        font-size: 16px;
                        color: #00d4ff;
                        margin-bottom: 4px;
                    }

                    .track-album {
                        font-size: 14px;
                        color: #8892b0;
                    }

                    .album-art {
                        position: absolute;
                        top: 50%;
                        right: 50px;
                        transform: translateY(-50%);
                        width: 120px;
                        height: 120px;
                        background: linear-gradient(135deg, #00d4ff, #00ffff);
                        border-radius: 15px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 48px;
                        color: #0a0a0f;
                        box-shadow: 0 0 30px rgba(0, 212, 255, 0.5);
                    }

                    /* Player Controls */
                    .player-controls {
                        background: rgba(20, 20, 32, 0.8);
                        border-radius: 15px;
                        padding: 20px;
                        border: 1px solid rgba(0, 212, 255, 0.3);
                        backdrop-filter: blur(10px);
                    }

                    .control-buttons {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        gap: 15px;
                        margin-bottom: 20px;
                    }

                    .control-btn {
                        width: 50px;
                        height: 50px;
                        border-radius: 50%;
                        border: 1px solid rgba(0, 212, 255, 0.5);
                        background: linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(0, 255, 255, 0.1));
                        color: #00d4ff;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 18px;
                        backdrop-filter: blur(10px);
                    }

                    .control-btn.play-pause {
                        width: 70px;
                        height: 70px;
                        font-size: 24px;
                        box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
                    }

                    .control-btn:hover {
                        background: linear-gradient(135deg, rgba(0, 212, 255, 0.3), rgba(0, 255, 255, 0.3));
                        box-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
                        transform: scale(1.1);
                    }

                    .control-btn.active {
                        background: linear-gradient(135deg, #00d4ff, #00ffff);
                        color: #0a0a0f;
                        box-shadow: 0 0 25px rgba(0, 212, 255, 0.7);
                    }

                    .progress-section {
                        display: flex;
                        align-items: center;
                        gap: 15px;
                        margin-bottom: 15px;
                    }

                    .time-display {
                        font-size: 14px;
                        color: #8892b0;
                        min-width: 45px;
                        text-align: center;
                    }

                    .progress-container {
                        flex: 1;
                        position: relative;
                        height: 8px;
                        background: rgba(0, 0, 0, 0.3);
                        border-radius: 4px;
                        overflow: hidden;
                    }

                    .progress-bar {
                        width: 100%;
                        height: 100%;
                        background: transparent;
                        cursor: pointer;
                        appearance: none;
                        position: relative;
                        z-index: 2;
                    }

                    .progress-bar::-webkit-slider-thumb {
                        appearance: none;
                        width: 16px;
                        height: 16px;
                        border-radius: 50%;
                        background: #00ffff;
                        cursor: pointer;
                        box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
                    }

                    .progress-fill {
                        position: absolute;
                        top: 0;
                        left: 0;
                        height: 100%;
                        background: linear-gradient(90deg, #00d4ff, #00ffff);
                        border-radius: 4px;
                        width: 0%;
                        transition: width 0.1s ease;
                        box-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
                    }

                    .volume-section {
                        display: flex;
                        align-items: center;
                        gap: 15px;
                        justify-content: center;
                    }

                    .volume-slider {
                        width: 120px;
                        height: 6px;
                        border-radius: 3px;
                        background: rgba(0, 0, 0, 0.3);
                        appearance: none;
                        cursor: pointer;
                    }

                    .volume-slider::-webkit-slider-thumb {
                        appearance: none;
                        width: 14px;
                        height: 14px;
                        border-radius: 50%;
                        background: #00d4ff;
                        cursor: pointer;
                        box-shadow: 0 0 8px rgba(0, 212, 255, 0.5);
                    }

                    /* Sidebar */
                    .player-sidebar {
                        width: 350px;
                        background: rgba(10, 10, 15, 0.9);
                        border-left: 1px solid rgba(0, 212, 255, 0.3);
                        display: flex;
                        flex-direction: column;
                        backdrop-filter: blur(10px);
                    }

                    .sidebar-tabs {
                        display: flex;
                        border-bottom: 1px solid rgba(0, 212, 255, 0.3);
                    }

                    .tab-btn {
                        flex: 1;
                        padding: 15px 10px;
                        background: transparent;
                        border: none;
                        color: #8892b0;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        font-size: 12px;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                        border-bottom: 2px solid transparent;
                    }

                    .tab-btn.active {
                        color: #00d4ff;
                        border-bottom-color: #00d4ff;
                        background: rgba(0, 212, 255, 0.1);
                    }

                    .tab-btn:hover {
                        color: #00ffff;
                        background: rgba(0, 255, 255, 0.05);
                    }

                    .tab-content {
                        flex: 1;
                        display: none;
                        flex-direction: column;
                        padding: 20px;
                        overflow: hidden;
                    }

                    .tab-content.active {
                        display: flex;
                    }

                    /* Playlist */
                    .playlist-header, .eq-header, .files-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 20px;
                        padding-bottom: 10px;
                        border-bottom: 1px solid rgba(0, 212, 255, 0.2);
                    }

                    .playlist-header h3, .eq-header h3, .files-header h3 {
                        color: #00ffff;
                        font-size: 16px;
                        margin: 0;
                    }

                    .playlist-actions, .eq-controls {
                        display: flex;
                        gap: 8px;
                    }

                    .action-btn {
                        width: 32px;
                        height: 32px;
                        border-radius: 6px;
                        border: 1px solid rgba(0, 212, 255, 0.3);
                        background: rgba(0, 212, 255, 0.1);
                        color: #00d4ff;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 12px;
                    }

                    .action-btn:hover {
                        background: rgba(0, 212, 255, 0.2);
                        box-shadow: 0 0 10px rgba(0, 212, 255, 0.3);
                    }

                    .playlist-container, .files-container {
                        flex: 1;
                        overflow-y: auto;
                        border: 1px solid rgba(0, 212, 255, 0.2);
                        border-radius: 8px;
                        background: rgba(0, 0, 0, 0.2);
                    }

                    .playlist-empty, .files-empty {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        height: 200px;
                        color: #8892b0;
                        text-align: center;
                    }

                    .playlist-empty i, .files-empty i {
                        font-size: 48px;
                        margin-bottom: 15px;
                        opacity: 0.5;
                    }

                    .playlist-item, .file-item {
                        padding: 12px 15px;
                        border-bottom: 1px solid rgba(0, 212, 255, 0.1);
                        cursor: pointer;
                        transition: all 0.3s ease;
                        display: flex;
                        align-items: center;
                        gap: 12px;
                    }

                    .playlist-item:hover, .file-item:hover {
                        background: rgba(0, 212, 255, 0.1);
                    }

                    .playlist-item.current {
                        background: rgba(0, 255, 255, 0.2);
                        border-left: 3px solid #00ffff;
                    }

                    .playlist-item .track-info, .file-item .file-info {
                        flex: 1;
                        min-width: 0;
                    }

                    .playlist-item .track-name, .file-item .file-name {
                        font-size: 13px;
                        color: #00d4ff;
                        margin-bottom: 2px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }

                    .playlist-item .track-artist, .file-item .file-type {
                        font-size: 11px;
                        color: #8892b0;
                    }

                    /* Equalizer */
                    .equalizer-container {
                        display: flex;
                        justify-content: space-between;
                        align-items: end;
                        gap: 8px;
                        margin-bottom: 20px;
                        padding: 20px;
                        background: rgba(0, 0, 0, 0.2);
                        border-radius: 10px;
                        border: 1px solid rgba(0, 212, 255, 0.2);
                    }

                    .eq-band {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        gap: 10px;
                    }

                    .eq-slider {
                        width: 20px;
                        height: 150px;
                        writing-mode: bt-lr;
                        -webkit-appearance: slider-vertical;
                        background: rgba(0, 0, 0, 0.3);
                        cursor: pointer;
                    }

                    .eq-band label {
                        font-size: 10px;
                        color: #8892b0;
                        transform: rotate(-45deg);
                        white-space: nowrap;
                    }

                    #eq-presets {
                        background: rgba(0, 0, 0, 0.3);
                        border: 1px solid rgba(0, 212, 255, 0.3);
                        color: #00d4ff;
                        padding: 6px 10px;
                        border-radius: 4px;
                        font-size: 11px;
                    }

                    .visualizer-settings {
                        background: rgba(0, 0, 0, 0.2);
                        padding: 15px;
                        border-radius: 8px;
                        border: 1px solid rgba(0, 212, 255, 0.2);
                    }

                    .visualizer-settings h4 {
                        color: #00ffff;
                        margin-bottom: 10px;
                        font-size: 14px;
                    }

                    .viz-controls {
                        display: flex;
                        flex-direction: column;
                        gap: 10px;
                    }

                    #viz-type {
                        background: rgba(0, 0, 0, 0.3);
                        border: 1px solid rgba(0, 212, 255, 0.3);
                        color: #00d4ff;
                        padding: 6px 10px;
                        border-radius: 4px;
                        font-size: 11px;
                    }

                    .viz-controls label {
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        font-size: 12px;
                        color: #8892b0;
                    }

                    /* File Types */
                    .file-types {
                        display: flex;
                        gap: 8px;
                        margin-bottom: 15px;
                    }

                    .type-filter {
                        padding: 6px 12px;
                        background: rgba(0, 0, 0, 0.3);
                        border: 1px solid rgba(0, 212, 255, 0.3);
                        border-radius: 15px;
                        cursor: pointer;
                        font-size: 11px;
                        color: #8892b0;
                        transition: all 0.3s ease;
                    }

                    .type-filter.active {
                        background: rgba(0, 212, 255, 0.2);
                        color: #00d4ff;
                        border-color: #00d4ff;
                    }

                    /* Scrollbars */
                    .playlist-container::-webkit-scrollbar,
                    .files-container::-webkit-scrollbar {
                        width: 6px;
                    }

                    .playlist-container::-webkit-scrollbar-track,
                    .files-container::-webkit-scrollbar-track {
                        background: rgba(0, 0, 0, 0.2);
                    }

                    .playlist-container::-webkit-scrollbar-thumb,
                    .files-container::-webkit-scrollbar-thumb {
                        background: rgba(0, 212, 255, 0.3);
                        border-radius: 3px;
                    }

                    .playlist-container::-webkit-scrollbar-thumb:hover,
                    .files-container::-webkit-scrollbar-thumb:hover {
                        background: rgba(0, 212, 255, 0.5);
                    }

                    /* Responsive Design */
                    @media (max-width: 768px) {
                        .media-player {
                            flex-direction: column;
                        }

                        .player-sidebar {
                            width: 100%;
                            max-height: 300px;
                        }

                        .album-art {
                            position: static;
                            transform: none;
                            margin-top: 20px;
                        }

                        .equalizer-container {
                            gap: 4px;
                            padding: 15px;
                        }

                        .eq-slider {
                            height: 100px;
                        }
                    }
                </style>
            `,
            onInit: (windowElement) => {
                MediaPlayer.init(windowElement);
            }
        };
    }

    static init(windowElement) {
        this.currentWindow = windowElement;
        this.audioContext = null;
        this.analyser = null;
        this.source = null;
        this.gainNode = null;
        this.eqFilters = [];
        this.isPlaying = false;
        this.currentTrack = 0;
        this.playlist = [];
        this.files = [];
        this.shuffle = false;
        this.repeat = 'none'; // none, one, all
        this.visualizerType = 'bars';
        this.visualizerEnabled = true;
        this.eqEnabled = false;

        this.setupElements();
        this.setupEventListeners();
        this.setupAudioContext();
        this.setupVisualizer();
        this.loadDefaultFiles();

        console.log('Media Player initialized');
    }

    static setupElements() {
        this.audioElement = this.currentWindow.querySelector('#media-audio');
        this.videoElement = this.currentWindow.querySelector('#media-video');
        this.visualizerCanvas = this.currentWindow.querySelector('#visualizer-canvas');
        this.ctx = this.visualizerCanvas.getContext('2d');

        // Control elements
        this.playPauseBtn = this.currentWindow.querySelector('#play-pause-btn');
        this.nextBtn = this.currentWindow.querySelector('#next-btn');
        this.prevBtn = this.currentWindow.querySelector('#prev-btn');
        this.shuffleBtn = this.currentWindow.querySelector('#shuffle-btn');
        this.repeatBtn = this.currentWindow.querySelector('#repeat-btn');
        this.muteBtn = this.currentWindow.querySelector('#mute-btn');

        // Progress and volume
        this.progressBar = this.currentWindow.querySelector('#progress-bar');
        this.progressFill = this.currentWindow.querySelector('#progress-fill');
        this.volumeSlider = this.currentWindow.querySelector('#volume-slider');
        this.currentTimeDisplay = this.currentWindow.querySelector('#current-time');
        this.totalTimeDisplay = this.currentWindow.querySelector('#total-time');

        // Info displays
        this.trackTitle = this.currentWindow.querySelector('#track-title');
        this.trackArtist = this.currentWindow.querySelector('#track-artist');
        this.trackAlbum = this.currentWindow.querySelector('#track-album');

        // Containers
        this.playlistContainer = this.currentWindow.querySelector('#playlist-container');
        this.filesContainer = this.currentWindow.querySelector('#files-container');

        // File input
        this.fileInput = this.currentWindow.querySelector('#file-input');
    }

    static setupEventListeners() {
        // Media controls
        this.playPauseBtn.addEventListener('click', () => this.togglePlayPause());
        this.nextBtn.addEventListener('click', () => this.nextTrack());
        this.prevBtn.addEventListener('click', () => this.previousTrack());
        this.shuffleBtn.addEventListener('click', () => this.toggleShuffle());
        this.repeatBtn.addEventListener('click', () => this.toggleRepeat());
        this.muteBtn.addEventListener('click', () => this.toggleMute());

        // Progress and volume
        this.progressBar.addEventListener('input', () => this.seek());
        this.volumeSlider.addEventListener('input', () => this.updateVolume());

        // Audio events
        this.audioElement.addEventListener('loadedmetadata', () => this.onTrackLoaded());
        this.audioElement.addEventListener('timeupdate', () => this.updateProgress());
        this.audioElement.addEventListener('ended', () => this.onTrackEnded());
        this.audioElement.addEventListener('error', (e) => this.onTrackError(e));

        // Tab switching
        this.currentWindow.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => this.switchTab(btn.dataset.tab));
        });

        // Playlist controls
        this.currentWindow.querySelector('#clear-playlist').addEventListener('click', () => this.clearPlaylist());
        this.currentWindow.querySelector('#save-playlist').addEventListener('click', () => this.savePlaylist());
        this.currentWindow.querySelector('#load-playlist').addEventListener('click', () => this.loadPlaylist());

        // File browser
        this.currentWindow.querySelector('#browse-files').addEventListener('click', () => this.browseFiles());
        this.fileInput.addEventListener('change', (e) => this.handleFileSelection(e));

        // Equalizer
        this.currentWindow.querySelector('#eq-toggle').addEventListener('click', () => this.toggleEqualizer());
        this.currentWindow.querySelector('#eq-presets').addEventListener('change', (e) => this.applyEQPreset(e.target.value));
        this.currentWindow.querySelectorAll('.eq-slider').forEach(slider => {
            slider.addEventListener('input', () => this.updateEqualizer());
        });

        // Visualizer
        this.currentWindow.querySelector('#viz-type').addEventListener('change', (e) => {
            this.visualizerType = e.target.value;
        });
        this.currentWindow.querySelector('#viz-enabled').addEventListener('change', (e) => {
            this.visualizerEnabled = e.target.checked;
        });

        // File type filters
        this.currentWindow.querySelectorAll('.type-filter').forEach(filter => {
            filter.addEventListener('click', () => this.filterFiles(filter.dataset.type));
        });

        // Resize canvas when window resizes
        window.addEventListener('resize', () => this.resizeCanvas());
        this.resizeCanvas();
    }

    static setupAudioContext() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.source = this.audioContext.createMediaElementSource(this.audioElement);

            // Create analyser for visualizer
            this.analyser = this.audioContext.createAnalyser();
            this.analyser.fftSize = 256;
            this.analyser.smoothingTimeConstant = 0.8;

            // Create gain node for volume control
            this.gainNode = this.audioContext.createGain();

            // Create EQ filters
            this.setupEqualizer();

            // Connect audio graph
            this.connectAudioGraph();

            console.log('Audio context setup complete');
        } catch (error) {
            console.error('Failed to setup audio context:', error);
        }
    }

    static setupEqualizer() {
        const frequencies = [32, 64, 125, 250, 500, 1000, 2000, 4000, 8000, 16000];

        frequencies.forEach((freq, index) => {
            const filter = this.audioContext.createBiquadFilter();
            filter.type = index === 0 ? 'lowshelf' : index === frequencies.length - 1 ? 'highshelf' : 'peaking';
            filter.frequency.value = freq;
            filter.Q.value = 1;
            filter.gain.value = 0;
            this.eqFilters.push(filter);
        });

        // Connect EQ filters in series
        for (let i = 0; i < this.eqFilters.length - 1; i++) {
            this.eqFilters[i].connect(this.eqFilters[i + 1]);
        }
    }

    static connectAudioGraph() {
        if (this.eqEnabled) {
            this.source.connect(this.eqFilters[0]);
            this.eqFilters[this.eqFilters.length - 1].connect(this.analyser);
        } else {
            this.source.connect(this.analyser);
        }

        this.analyser.connect(this.gainNode);
        this.gainNode.connect(this.audioContext.destination);
    }

    static setupVisualizer() {
        this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
        this.timeDataArray = new Uint8Array(this.analyser.fftSize);
        this.particles = [];

        // Initialize particles for particle visualizer
        for (let i = 0; i < 50; i++) {
            this.particles.push({
                x: Math.random() * this.visualizerCanvas.width,
                y: Math.random() * this.visualizerCanvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                size: Math.random() * 3 + 1
            });
        }

        this.animateVisualizer();
    }

    static animateVisualizer() {
        if (!this.visualizerEnabled) {
            requestAnimationFrame(() => this.animateVisualizer());
            return;
        }

        this.analyser.getByteFrequencyData(this.dataArray);
        this.analyser.getByteTimeDomainData(this.timeDataArray);

        this.ctx.clearRect(0, 0, this.visualizerCanvas.width, this.visualizerCanvas.height);

        switch (this.visualizerType) {
            case 'bars':
                this.drawBars();
                break;
            case 'wave':
                this.drawWaveform();
                break;
            case 'circle':
                this.drawCircular();
                break;
            case 'particles':
                this.drawParticles();
                break;
        }

        requestAnimationFrame(() => this.animateVisualizer());
    }

    static drawBars() {
        const barWidth = this.visualizerCanvas.width / this.dataArray.length;
        let x = 0;

        for (let i = 0; i < this.dataArray.length; i++) {
            const barHeight = (this.dataArray[i] / 255) * this.visualizerCanvas.height * 0.8;

            const gradient = this.ctx.createLinearGradient(0, this.visualizerCanvas.height, 0, this.visualizerCanvas.height - barHeight);
            gradient.addColorStop(0, '#00d4ff');
            gradient.addColorStop(0.5, '#00ffff');
            gradient.addColorStop(1, '#ffffff');

            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(x, this.visualizerCanvas.height - barHeight, barWidth - 2, barHeight);
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = '#00d4ff';

            x += barWidth;
        }
    }

    static drawWaveform() {
        this.ctx.strokeStyle = '#00ffff';
        this.ctx.lineWidth = 2;
        this.ctx.shadowBlur = 15;
        this.ctx.shadowColor = '#00ffff';
        this.ctx.beginPath();

        const sliceWidth = this.visualizerCanvas.width / this.timeDataArray.length;
        let x = 0;

        for (let i = 0; i < this.timeDataArray.length; i++) {
            const v = this.timeDataArray[i] / 128.0;
            const y = v * this.visualizerCanvas.height / 2;

            if (i === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }

            x += sliceWidth;
        }

        this.ctx.stroke();
    }

    static drawCircular() {
        const centerX = this.visualizerCanvas.width / 2;
        const centerY = this.visualizerCanvas.height / 2;
        const radius = Math.min(centerX, centerY) * 0.6;

        for (let i = 0; i < this.dataArray.length; i++) {
            const angle = (i / this.dataArray.length) * Math.PI * 2;
            const amplitude = (this.dataArray[i] / 255) * radius * 0.5;

            const x1 = centerX + Math.cos(angle) * radius;
            const y1 = centerY + Math.sin(angle) * radius;
            const x2 = centerX + Math.cos(angle) * (radius + amplitude);
            const y2 = centerY + Math.sin(angle) * (radius + amplitude);

            const gradient = this.ctx.createLinearGradient(x1, y1, x2, y2);
            gradient.addColorStop(0, '#00d4ff');
            gradient.addColorStop(1, '#00ffff');

            this.ctx.strokeStyle = gradient;
            this.ctx.lineWidth = 2;
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = '#00d4ff';
            this.ctx.beginPath();
            this.ctx.moveTo(x1, y1);
            this.ctx.lineTo(x2, y2);
            this.ctx.stroke();
        }
    }

    static drawParticles() {
        const average = this.dataArray.reduce((a, b) => a + b) / this.dataArray.length;
        const intensity = average / 255;

        this.particles.forEach(particle => {
            particle.x += particle.vx * (1 + intensity);
            particle.y += particle.vy * (1 + intensity);

            if (particle.x < 0 || particle.x > this.visualizerCanvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.visualizerCanvas.height) particle.vy *= -1;

            particle.x = Math.max(0, Math.min(this.visualizerCanvas.width, particle.x));
            particle.y = Math.max(0, Math.min(this.visualizerCanvas.height, particle.y));

            const gradient = this.ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size * (1 + intensity));
            gradient.addColorStop(0, '#00ffff');
            gradient.addColorStop(1, 'transparent');

            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size * (1 + intensity), 0, Math.PI * 2);
            this.ctx.fill();
        });
    }

    static resizeCanvas() {
        const canvas = this.visualizerCanvas;
        const container = canvas.parentElement;
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
    }

    // Media Control Methods
    static togglePlayPause() {
        if (this.playlist.length === 0) {
            this.showNotification('Playlist is empty', 'warning');
            return;
        }

        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }

        if (this.isPlaying) {
            this.audioElement.pause();
            this.playPauseBtn.querySelector('i').className = 'fas fa-play';
            this.isPlaying = false;
        } else {
            this.audioElement.play().catch(error => {
                console.error('Playback failed:', error);
                this.showNotification('Playback failed', 'error');
            });
            this.playPauseBtn.querySelector('i').className = 'fas fa-pause';
            this.isPlaying = true;
        }
    }

    static nextTrack() {
        if (this.playlist.length === 0) return;

        if (this.shuffle) {
            this.currentTrack = Math.floor(Math.random() * this.playlist.length);
        } else {
            this.currentTrack = (this.currentTrack + 1) % this.playlist.length;
        }

        this.loadCurrentTrack();
    }

    static previousTrack() {
        if (this.playlist.length === 0) return;

        if (this.shuffle) {
            this.currentTrack = Math.floor(Math.random() * this.playlist.length);
        } else {
            this.currentTrack = this.currentTrack === 0 ? this.playlist.length - 1 : this.currentTrack - 1;
        }

        this.loadCurrentTrack();
    }

    static toggleShuffle() {
        this.shuffle = !this.shuffle;
        this.shuffleBtn.classList.toggle('active', this.shuffle);
        this.showNotification(`Shuffle ${this.shuffle ? 'enabled' : 'disabled'}`, 'info');
    }

    static toggleRepeat() {
        const modes = ['none', 'one', 'all'];
        const currentIndex = modes.indexOf(this.repeat);
        this.repeat = modes[(currentIndex + 1) % modes.length];

        this.repeatBtn.classList.toggle('active', this.repeat !== 'none');

        const icon = this.repeatBtn.querySelector('i');
        if (this.repeat === 'one') {
            icon.className = 'fas fa-redo';
            this.repeatBtn.style.position = 'relative';
            this.repeatBtn.setAttribute('data-repeat', '1');
        } else {
            icon.className = 'fas fa-redo';
            this.repeatBtn.removeAttribute('data-repeat');
        }

        this.showNotification(`Repeat: ${this.repeat}`, 'info');
    }

    static toggleMute() {
        const icon = this.muteBtn.querySelector('i');
        if (this.audioElement.muted) {
            this.audioElement.muted = false;
            icon.className = 'fas fa-volume-up';
        } else {
            this.audioElement.muted = true;
            icon.className = 'fas fa-volume-mute';
        }
    }

    static seek() {
        const seekTime = (this.progressBar.value / 100) * this.audioElement.duration;
        this.audioElement.currentTime = seekTime;
    }

    static updateVolume() {
        const volume = this.volumeSlider.value / 100;
        this.audioElement.volume = volume;
        if (this.gainNode) {
            this.gainNode.gain.value = volume;
        }

        const icon = this.muteBtn.querySelector('i');
        if (volume === 0) {
            icon.className = 'fas fa-volume-mute';
        } else if (volume < 0.5) {
            icon.className = 'fas fa-volume-down';
        } else {
            icon.className = 'fas fa-volume-up';
        }
    }

    static onTrackLoaded() {
        this.totalTimeDisplay.textContent = this.formatTime(this.audioElement.duration);
        this.progressBar.max = 100;
    }

    static updateProgress() {
        if (this.audioElement.duration) {
            const progress = (this.audioElement.currentTime / this.audioElement.duration) * 100;
            this.progressFill.style.width = progress + '%';
            this.currentTimeDisplay.textContent = this.formatTime(this.audioElement.currentTime);
        }
    }

    static onTrackEnded() {
        if (this.repeat === 'one') {
            this.audioElement.currentTime = 0;
            this.audioElement.play();
        } else if (this.repeat === 'all' || this.currentTrack < this.playlist.length - 1) {
            this.nextTrack();
        } else {
            this.isPlaying = false;
            this.playPauseBtn.querySelector('i').className = 'fas fa-play';
        }
    }

    static onTrackError(error) {
        console.error('Track error:', error);
        this.showNotification('Failed to load track', 'error');
        this.nextTrack();
    }

    // Playlist Management
    static addToPlaylist(file) {
        this.playlist.push(file);
        this.renderPlaylist();
        this.showNotification(`Added "${file.name}" to playlist`, 'success');
    }

    static removeFromPlaylist(index) {
        if (index === this.currentTrack) {
            this.audioElement.pause();
            this.isPlaying = false;
            this.playPauseBtn.querySelector('i').className = 'fas fa-play';
        } else if (index < this.currentTrack) {
            this.currentTrack--;
        }

        this.playlist.splice(index, 1);
        this.renderPlaylist();
    }

    static clearPlaylist() {
        if (confirm('Clear entire playlist?')) {
            this.playlist = [];
            this.currentTrack = 0;
            this.audioElement.pause();
            this.isPlaying = false;
            this.playPauseBtn.querySelector('i').className = 'fas fa-play';
            this.renderPlaylist();
            this.updateTrackInfo('No media loaded', 'Select a file to begin');
        }
    }

    static savePlaylist() {
        if (this.playlist.length === 0) {
            this.showNotification('Playlist is empty', 'warning');
            return;
        }

        const m3uContent = this.generateM3U();
        const blob = new Blob([m3uContent], { type: 'audio/x-mpegurl' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `playlist_${new Date().toISOString().split('T')[0]}.m3u`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.showNotification('Playlist saved as M3U', 'success');
    }

    static loadPlaylist() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.m3u,.m3u8';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                this.parseM3U(file);
            }
        };
        input.click();
    }

    static generateM3U() {
        let content = '#EXTM3U\n';
        this.playlist.forEach(track => {
            content += `#EXTINF:-1,${track.artist || 'Unknown'} - ${track.title || track.name}\n`;
            content += `${track.path || track.name}\n`;
        });
        return content;
    }

    static async parseM3U(file) {
        try {
            const text = await file.text();
            const lines = text.split('\n');
            const newPlaylist = [];

            for (let i = 0; i < lines.length; i++) {
                const line = lines[i].trim();
                if (line && !line.startsWith('#')) {
                    // This is a file path
                    const trackInfo = {
                        name: line.split('/').pop(),
                        path: line,
                        title: line.split('/').pop(),
                        artist: 'Unknown',
                        type: 'audio'
                    };
                    newPlaylist.push(trackInfo);
                }
            }

            if (newPlaylist.length > 0) {
                this.playlist = newPlaylist;
                this.currentTrack = 0;
                this.renderPlaylist();
                this.showNotification(`Loaded ${newPlaylist.length} tracks from M3U`, 'success');
            }
        } catch (error) {
            console.error('Failed to parse M3U:', error);
            this.showNotification('Failed to load playlist', 'error');
        }
    }

    static renderPlaylist() {
        if (this.playlist.length === 0) {
            this.playlistContainer.innerHTML = `
                <div class="playlist-empty">
                    <i class="fas fa-music"></i>
                    <p>Playlist is empty</p>
                    <p>Add files from the Files tab</p>
                </div>
            `;
            return;
        }

        this.playlistContainer.innerHTML = this.playlist.map((track, index) => `
            <div class="playlist-item ${index === this.currentTrack ? 'current' : ''}" data-index="${index}">
                <i class="fas fa-${track.type === 'video' ? 'video' : 'music'}"></i>
                <div class="track-info">
                    <div class="track-name">${track.title || track.name}</div>
                    <div class="track-artist">${track.artist || 'Unknown Artist'}</div>
                </div>
                <button class="action-btn" onclick="MediaPlayer.removeFromPlaylist(${index})" title="Remove">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');

        // Add click listeners
        this.playlistContainer.querySelectorAll('.playlist-item').forEach((item, index) => {
            item.addEventListener('dblclick', () => {
                this.currentTrack = index;
                this.loadCurrentTrack();
            });
        });
    }

    static loadCurrentTrack() {
        if (this.playlist.length === 0) return;

        const track = this.playlist[this.currentTrack];
        if (!track) return;

        if (track.type === 'video') {
            this.audioElement.style.display = 'none';
            this.videoElement.style.display = 'block';
            this.videoElement.src = track.url || track.path;
            this.currentWindow.querySelector('.audio-visualizer').style.display = 'none';
        } else {
            this.videoElement.style.display = 'none';
            this.audioElement.style.display = 'block';
            this.audioElement.src = track.url || track.path;
            this.currentWindow.querySelector('.audio-visualizer').style.display = 'flex';
        }

        this.updateTrackInfo(track.title || track.name, track.artist || 'Unknown Artist', track.album);
        this.renderPlaylist();

        if (this.isPlaying) {
            setTimeout(() => {
                (track.type === 'video' ? this.videoElement : this.audioElement).play();
            }, 100);
        }
    }

    static updateTrackInfo(title, artist, album = '') {
        this.trackTitle.textContent = title;
        this.trackArtist.textContent = artist;
        this.trackAlbum.textContent = album;
    }

    // File Management
    static browseFiles() {
        this.fileInput.click();
    }

    static handleFileSelection(event) {
        const files = Array.from(event.target.files);
        files.forEach(file => {
            const fileInfo = this.analyzeFile(file);
            this.files.push(fileInfo);
        });
        this.renderFiles();
        event.target.value = ''; // Reset input
    }

    static analyzeFile(file) {
        const isVideo = file.type.startsWith('video/');
        const isAudio = file.type.startsWith('audio/');

        return {
            name: file.name,
            size: file.size,
            type: isVideo ? 'video' : isAudio ? 'audio' : 'unknown',
            url: URL.createObjectURL(file),
            file: file,
            title: file.name.replace(/\.[^/.]+$/, ''),
            artist: 'Unknown Artist'
        };
    }

    static renderFiles() {
        if (this.files.length === 0) {
            this.filesContainer.innerHTML = `
                <div class="files-empty">
                    <i class="fas fa-folder-open"></i>
                    <p>No media files found</p>
                    <p>Click "Browse Files" to add media</p>
                </div>
            `;
            return;
        }

        const activeFilter = this.currentWindow.querySelector('.type-filter.active').dataset.type;
        const filteredFiles = activeFilter === 'all' ? this.files :
                             this.files.filter(file => file.type === activeFilter);

        this.filesContainer.innerHTML = filteredFiles.map((file, index) => `
            <div class="file-item" data-index="${index}">
                <i class="fas fa-${file.type === 'video' ? 'video' : file.type === 'audio' ? 'music' : 'file'}"></i>
                <div class="file-info">
                    <div class="file-name">${file.name}</div>
                    <div class="file-type">${file.type.toUpperCase()} • ${this.formatFileSize(file.size)}</div>
                </div>
                <button class="action-btn" onclick="MediaPlayer.addToPlaylist(MediaPlayer.files[${this.files.indexOf(file)}])" title="Add to Playlist">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
        `).join('');

        // Add double-click to play immediately
        this.filesContainer.querySelectorAll('.file-item').forEach((item, index) => {
            item.addEventListener('dblclick', () => {
                const fileIndex = parseInt(item.dataset.index);
                const file = filteredFiles[fileIndex];
                this.addToPlaylist(file);
                this.currentTrack = this.playlist.length - 1;
                this.loadCurrentTrack();
                if (!this.isPlaying) {
                    this.togglePlayPause();
                }
            });
        });
    }

    static filterFiles(type) {
        this.currentWindow.querySelectorAll('.type-filter').forEach(filter => {
            filter.classList.remove('active');
        });
        this.currentWindow.querySelector(`[data-type="${type}"]`).classList.add('active');
        this.renderFiles();
    }

    // Equalizer
    static toggleEqualizer() {
        this.eqEnabled = !this.eqEnabled;
        this.currentWindow.querySelector('#eq-toggle').classList.toggle('active', this.eqEnabled);

        // Reconnect audio graph
        this.source.disconnect();
        this.connectAudioGraph();

        this.showNotification(`Equalizer ${this.eqEnabled ? 'enabled' : 'disabled'}`, 'info');
    }

    static updateEqualizer() {
        if (!this.eqEnabled) return;

        this.currentWindow.querySelectorAll('.eq-slider').forEach((slider, index) => {
            if (this.eqFilters[index]) {
                this.eqFilters[index].gain.value = parseFloat(slider.value);
            }
        });
    }

    static applyEQPreset(preset) {
        const presets = {
            flat: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            rock: [3, 2, -1, -2, -1, 2, 4, 5, 5, 4],
            pop: [-1, 2, 4, 4, 2, -1, -2, -2, -1, 0],
            jazz: [3, 2, 1, 2, -1, -1, 0, 1, 2, 3],
            classical: [3, 2, -1, -2, -1, 2, 3, 4, 4, 4],
            electronic: [4, 3, 1, 0, -1, 1, 2, 3, 4, 5],
            'bass-boost': [6, 4, 2, 1, 0, -1, -1, -1, 0, 1],
            vocal: [-2, -1, 1, 3, 3, 2, 1, 0, -1, -2]
        };

        const values = presets[preset] || presets.flat;
        this.currentWindow.querySelectorAll('.eq-slider').forEach((slider, index) => {
            slider.value = values[index];
        });

        this.updateEqualizer();
    }

    // Utility Methods
    static switchTab(tabName) {
        this.currentWindow.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        this.currentWindow.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });

        this.currentWindow.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        this.currentWindow.querySelector(`#${tabName}-tab`).classList.add('active');
    }

    static formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    static formatFileSize(bytes) {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    }

    static showNotification(message, type = 'info') {
        if (window.Notification) {
            window.Notification.show(message, type, 3000);
        } else {
            console.log(`[${type.toUpperCase()}] ${message}`);
        }
    }

    static loadDefaultFiles() {
        // Simulate some default media files
        const defaultFiles = [
            {
                name: 'sample_audio.mp3',
                type: 'audio',
                title: 'Sample Audio Track',
                artist: 'Demo Artist',
                album: 'Demo Album',
                url: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwaAjuJ1+TKfCwCKnPF8+OOPQkaTKvi+J9LAw==',
                size: 1024 * 256
            }
        ];

        this.files = defaultFiles;
        this.renderFiles();
    }

    static onClose(windowElement) {
        // Clean up audio context and resources
        if (this.audioElement) {
            this.audioElement.pause();
            this.audioElement.src = '';
        }
        if (this.videoElement) {
            this.videoElement.pause();
            this.videoElement.src = '';
        }
        if (this.audioContext && this.audioContext.state !== 'closed') {
            this.audioContext.close();
        }

        // Clean up object URLs
        this.files.forEach(file => {
            if (file.url && file.url.startsWith('blob:')) {
                URL.revokeObjectURL(file.url);
            }
        });

        return true;
    }
}

window.MediaPlayer = MediaPlayer;