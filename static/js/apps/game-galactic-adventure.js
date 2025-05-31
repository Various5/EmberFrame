/**
 * APP_METADATA
 * @name Neon Shadows
 * @icon fas fa-gamepad
 * @description Immersive cyberpunk text adventure with RPG elements
 * @category Games
 * @version 1.0.0
 * @author EmberFrame Team
 * @enabled true
 */

class NeonShadows {
    static createWindow() {
        return {
            title: 'Neon Shadows - Cyberpunk Adventure',
            width: '1200px',
            height: '800px',
            autoSize: false,
            content: `
                <div class="neon-game">
                    <!-- Parallax Background Layers -->
                    <div class="parallax-container">
                        <div class="parallax-layer background" id="bg-layer1"></div>
                        <div class="parallax-layer midground" id="bg-layer2"></div>
                        <div class="parallax-layer foreground" id="bg-layer3"></div>
                        <div class="rain-effect" id="rain-effect"></div>
                    </div>

                    <!-- Game UI Overlay -->
                    <div class="game-overlay">
                        <!-- Top Status Bar -->
                        <div class="status-bar">
                            <div class="player-stats">
                                <div class="stat-group">
                                    <div class="stat-bar health">
                                        <div class="stat-fill" id="health-fill"></div>
                                        <span class="stat-text">HP: <span id="health-text">100/100</span></span>
                                    </div>
                                    <div class="stat-bar energy">
                                        <div class="stat-fill" id="energy-fill"></div>
                                        <span class="stat-text">EN: <span id="energy-text">100/100</span></span>
                                    </div>
                                </div>
                                <div class="player-info">
                                    <div class="player-name" id="player-name">Neo Runner</div>
                                    <div class="player-level">Level <span id="player-level">1</span></div>
                                    <div class="player-credits">₡<span id="player-credits">500</span></div>
                                </div>
                            </div>
                            <div class="location-info">
                                <div class="current-location" id="current-location">Neo Tokyo - District 7</div>
                                <div class="time-info" id="time-info">23:47 - Night Cycle</div>
                            </div>
                        </div>

                        <!-- Main Game Area -->
                        <div class="game-main">
                            <!-- Story Text Area -->
                            <div class="story-panel">
                                <div class="story-content" id="story-content">
                                    <div class="story-text loading">
                                        <span class="loading-text">INITIALIZING NEURAL INTERFACE...</span>
                                        <div class="loading-dots">
                                            <span></span><span></span><span></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="story-controls">
                                    <button class="game-btn" id="auto-scroll-btn" onclick="NeonShadows.toggleAutoScroll()">
                                        <i class="fas fa-play"></i> Auto
                                    </button>
                                    <button class="game-btn" id="save-btn" onclick="NeonShadows.saveGame()">
                                        <i class="fas fa-save"></i> Save
                                    </button>
                                    <button class="game-btn" id="load-btn" onclick="NeonShadows.loadGame()">
                                        <i class="fas fa-folder-open"></i> Load
                                    </button>
                                </div>
                            </div>

                            <!-- Actions Panel -->
                            <div class="actions-panel">
                                <div class="action-buttons" id="action-buttons">
                                    <!-- Dynamic action buttons will be inserted here -->
                                </div>
                                
                                <!-- Inventory Quick Access -->
                                <div class="quick-inventory">
                                    <div class="inventory-title">Quick Items</div>
                                    <div class="inventory-slots" id="quick-slots">
                                        <!-- Quick access items -->
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Bottom Panel - Combat/Dialogue/Trade -->
                        <div class="bottom-panel" id="bottom-panel">
                            <!-- Default: Command Input -->
                            <div class="command-panel" id="command-panel">
                                <div class="command-input-group">
                                    <input type="text" class="command-input" id="command-input" 
                                           placeholder="Type your action... (help for commands)" autocomplete="off">
                                    <button class="command-submit" onclick="NeonShadows.processCommand()">
                                        <i class="fas fa-arrow-right"></i>
                                    </button>
                                </div>
                                <div class="command-suggestions" id="command-suggestions"></div>
                            </div>

                            <!-- Combat Panel -->
                            <div class="combat-panel hidden" id="combat-panel">
                                <div class="combat-info">
                                    <div class="enemy-info">
                                        <div class="enemy-name" id="enemy-name">Corporate Security</div>
                                        <div class="enemy-health">
                                            <div class="enemy-health-bar">
                                                <div class="enemy-health-fill" id="enemy-health-fill"></div>
                                            </div>
                                            <span id="enemy-health-text">100/100</span>
                                        </div>
                                    </div>
                                    <div class="combat-actions">
                                        <button class="combat-btn attack" onclick="NeonShadows.combatAction('attack')">
                                            <i class="fas fa-fist-raised"></i> Attack
                                        </button>
                                        <button class="combat-btn defend" onclick="NeonShadows.combatAction('defend')">
                                            <i class="fas fa-shield-alt"></i> Defend
                                        </button>
                                        <button class="combat-btn hack" onclick="NeonShadows.combatAction('hack')">
                                            <i class="fas fa-laptop-code"></i> Hack
                                        </button>
                                        <button class="combat-btn run" onclick="NeonShadows.combatAction('run')">
                                            <i class="fas fa-running"></i> Escape
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <!-- Trading Panel -->
                            <div class="trade-panel hidden" id="trade-panel">
                                <div class="trade-content">
                                    <div class="merchant-info">
                                        <div class="merchant-avatar" id="merchant-avatar">🤖</div>
                                        <div class="merchant-details">
                                            <div class="merchant-name" id="merchant-name">Cyber Merchant</div>
                                            <div class="merchant-dialogue" id="merchant-dialogue">
                                                Welcome to my shop, choom. What do you need?
                                            </div>
                                        </div>
                                    </div>
                                    <div class="trade-interface">
                                        <div class="merchant-inventory" id="merchant-inventory">
                                            <!-- Merchant items -->
                                        </div>
                                        <div class="trade-actions">
                                            <button class="trade-btn" onclick="NeonShadows.closeTrade()">
                                                <i class="fas fa-times"></i> Leave
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Side Panel - Character Info -->
                        <div class="side-panel" id="side-panel">
                            <div class="panel-tabs">
                                <button class="tab-btn active" onclick="NeonShadows.switchTab('character')">
                                    <i class="fas fa-user"></i>
                                </button>
                                <button class="tab-btn" onclick="NeonShadows.switchTab('inventory')">
                                    <i class="fas fa-backpack"></i>
                                </button>
                                <button class="tab-btn" onclick="NeonShadows.switchTab('map')">
                                    <i class="fas fa-map"></i>
                                </button>
                                <button class="tab-btn" onclick="NeonShadows.switchTab('journal')">
                                    <i class="fas fa-book"></i>
                                </button>
                            </div>

                            <div class="panel-content">
                                <!-- Character Tab -->
                                <div class="tab-panel character-tab active" id="character-tab">
                                    <div class="character-portrait">
                                        <div class="avatar-frame">
                                            <div class="avatar-image" id="player-avatar">👤</div>
                                        </div>
                                    </div>
                                    <div class="character-stats">
                                        <div class="stat-row">
                                            <span>Strength:</span>
                                            <span id="stat-strength">10</span>
                                        </div>
                                        <div class="stat-row">
                                            <span>Agility:</span>
                                            <span id="stat-agility">12</span>
                                        </div>
                                        <div class="stat-row">
                                            <span>Tech:</span>
                                            <span id="stat-tech">15</span>
                                        </div>
                                        <div class="stat-row">
                                            <span>Charisma:</span>
                                            <span id="stat-charisma">8</span>
                                        </div>
                                        <div class="stat-row">
                                            <span>Street Cred:</span>
                                            <span id="stat-streetcred">5</span>
                                        </div>
                                    </div>
                                    <div class="experience-bar">
                                        <div class="exp-fill" id="exp-fill"></div>
                                        <span class="exp-text">XP: <span id="exp-text">0/100</span></span>
                                    </div>
                                </div>

                                <!-- Inventory Tab -->
                                <div class="tab-panel inventory-tab" id="inventory-tab">
                                    <div class="inventory-grid" id="inventory-grid">
                                        <!-- Inventory items -->
                                    </div>
                                </div>

                                <!-- Map Tab -->
                                <div class="tab-panel map-tab" id="map-tab">
                                    <div class="mini-map" id="mini-map">
                                        <div class="map-location current" style="top: 50%; left: 50%;">📍</div>
                                    </div>
                                    <div class="map-legend">
                                        <div class="legend-item">📍 Current Location</div>
                                        <div class="legend-item">🏢 Corporate Zone</div>
                                        <div class="legend-item">🌃 Entertainment District</div>
                                        <div class="legend-item">⚡ Underground</div>
                                    </div>
                                </div>

                                <!-- Journal Tab -->
                                <div class="tab-panel journal-tab" id="journal-tab">
                                    <div class="journal-entries" id="journal-entries">
                                        <div class="journal-entry">
                                            <div class="entry-title">Day 1 - The Awakening</div>
                                            <div class="entry-content">
                                                Something's different in Neo Tokyo tonight. The neon bleeds differently...
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Game Effects -->
                    <div class="game-effects">
                        <div class="scan-lines"></div>
                        <div class="glitch-overlay" id="glitch-overlay"></div>
                    </div>
                </div>

                ${NeonShadows.getStyles()}
            `,
            onInit: (windowElement) => {
                NeonShadows.init(windowElement);
            }
        };
    }

    static getStyles() {
        return `
            <style>
                .neon-game {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    background: #000;
                    color: #00ff41;
                    font-family: 'Courier New', monospace;
                    overflow: hidden;
                    user-select: none;
                }

                /* Parallax Background System */
                .parallax-container {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                }

                .parallax-layer {
                    position: absolute;
                    width: 120%;
                    height: 120%;
                    background-size: cover;
                    background-repeat: repeat-x;
                    background-position: center bottom;
                    transition: all 0.5s ease;
                }

                .parallax-layer.background {
                    z-index: 1;
                    animation: parallaxSlow 20s linear infinite;
                    opacity: 0.6;
                }

                .parallax-layer.midground {
                    z-index: 2;
                    animation: parallaxMedium 15s linear infinite;
                    opacity: 0.4;
                }

                .parallax-layer.foreground {
                    z-index: 3;
                    animation: parallaxFast 10s linear infinite;
                    opacity: 0.3;
                }

                @keyframes parallaxSlow {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-20%); }
                }

                @keyframes parallaxMedium {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-40%); }
                }

                @keyframes parallaxFast {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-60%); }
                }

                /* Rain Effect */
                .rain-effect {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 4;
                    pointer-events: none;
                    opacity: 0.3;
                }

                .rain-drop {
                    position: absolute;
                    width: 2px;
                    height: 20px;
                    background: linear-gradient(transparent, #00ffff, transparent);
                    animation: rainfall linear infinite;
                }

                @keyframes rainfall {
                    0% {
                        transform: translateY(-100vh);
                        opacity: 0;
                    }
                    10% {
                        opacity: 1;
                    }
                    90% {
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(100vh);
                        opacity: 0;
                    }
                }

                /* Game Overlay */
                .game-overlay {
                    position: relative;
                    z-index: 10;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    background: rgba(0, 0, 0, 0.7);
                    backdrop-filter: blur(1px);
                }

                /* Status Bar */
                .status-bar {
                    display: flex;
                    justify-content: space-between;
                    padding: 15px 20px;
                    background: linear-gradient(135deg, rgba(0, 255, 65, 0.1), rgba(0, 255, 255, 0.1));
                    border-bottom: 2px solid #00ff41;
                    box-shadow: 0 0 20px rgba(0, 255, 65, 0.3);
                }

                .player-stats {
                    display: flex;
                    gap: 20px;
                    align-items: center;
                }

                .stat-group {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .stat-bar {
                    position: relative;
                    width: 120px;
                    height: 20px;
                    background: rgba(0, 0, 0, 0.7);
                    border: 1px solid #00ff41;
                    border-radius: 10px;
                    overflow: hidden;
                }

                .stat-bar.health .stat-fill {
                    background: linear-gradient(90deg, #ff0040, #ff4080);
                }

                .stat-bar.energy .stat-fill {
                    background: linear-gradient(90deg, #0080ff, #40c0ff);
                }

                .stat-fill {
                    height: 100%;
                    width: 100%;
                    transition: width 0.3s ease;
                    box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.3);
                }

                .stat-text {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    font-size: 10px;
                    font-weight: bold;
                    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
                    color: white;
                }

                .player-info {
                    text-align: left;
                }

                .player-name {
                    font-size: 16px;
                    font-weight: bold;
                    color: #00ffff;
                    text-shadow: 0 0 10px #00ffff;
                }

                .player-level {
                    font-size: 12px;
                    color: #ffff00;
                }

                .player-credits {
                    font-size: 14px;
                    color: #00ff00;
                    font-weight: bold;
                }

                .location-info {
                    text-align: right;
                }

                .current-location {
                    font-size: 14px;
                    color: #ff6600;
                    font-weight: bold;
                }

                .time-info {
                    font-size: 12px;
                    color: #cccccc;
                }

                /* Main Game Area */
                .game-main {
                    flex: 1;
                    display: flex;
                    gap: 15px;
                    padding: 15px;
                    overflow: hidden;
                }

                .story-panel {
                    flex: 2;
                    display: flex;
                    flex-direction: column;
                    background: rgba(0, 0, 0, 0.8);
                    border: 2px solid #00ff41;
                    border-radius: 10px;
                    box-shadow: 0 0 20px rgba(0, 255, 65, 0.3);
                }

                .story-content {
                    flex: 1;
                    padding: 20px;
                    overflow-y: auto;
                    line-height: 1.6;
                    font-size: 14px;
                }

                .story-text {
                    margin-bottom: 15px;
                    opacity: 0;
                    animation: fadeInText 0.5s ease-in forwards;
                }

                .story-text.loading {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    font-size: 16px;
                    color: #00ffff;
                }

                .loading-text {
                    animation: pulse 2s ease-in-out infinite;
                }

                .loading-dots span {
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    background: #00ffff;
                    border-radius: 50%;
                    margin: 0 2px;
                    animation: loadingDots 1.4s ease-in-out infinite both;
                }

                .loading-dots span:nth-child(1) { animation-delay: -0.32s; }
                .loading-dots span:nth-child(2) { animation-delay: -0.16s; }
                .loading-dots span:nth-child(3) { animation-delay: 0; }

                @keyframes loadingDots {
                    0%, 80%, 100% {
                        transform: scale(0);
                        opacity: 0.5;
                    }
                    40% {
                        transform: scale(1);
                        opacity: 1;
                    }
                }

                @keyframes fadeInText {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }

                .story-controls {
                    display: flex;
                    gap: 10px;
                    padding: 15px 20px;
                    border-top: 1px solid #00ff41;
                    background: rgba(0, 255, 65, 0.1);
                }

                .game-btn {
                    padding: 8px 16px;
                    background: linear-gradient(135deg, rgba(0, 255, 65, 0.2), rgba(0, 255, 255, 0.2));
                    border: 1px solid #00ff41;
                    color: #00ff41;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-family: inherit;
                    font-size: 12px;
                }

                .game-btn:hover {
                    background: linear-gradient(135deg, rgba(0, 255, 65, 0.4), rgba(0, 255, 255, 0.4));
                    box-shadow: 0 0 15px rgba(0, 255, 65, 0.5);
                    transform: translateY(-2px);
                }

                .actions-panel {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }

                .action-buttons {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    padding: 20px;
                    background: rgba(0, 0, 0, 0.8);
                    border: 2px solid #00ff41;
                    border-radius: 10px;
                    box-shadow: 0 0 20px rgba(0, 255, 65, 0.3);
                }

                .action-btn {
                    padding: 12px 15px;
                    background: linear-gradient(135deg, rgba(0, 255, 65, 0.1), rgba(0, 255, 255, 0.1));
                    border: 1px solid #00ff41;
                    color: #00ff41;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-family: inherit;
                    text-align: left;
                    font-size: 13px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .action-btn:hover {
                    background: linear-gradient(135deg, rgba(0, 255, 65, 0.3), rgba(0, 255, 255, 0.3));
                    box-shadow: 0 0 15px rgba(0, 255, 65, 0.5);
                    transform: translateX(5px);
                }

                .action-btn.disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }

                .action-btn.disabled:hover {
                    transform: none;
                    box-shadow: none;
                }

                .quick-inventory {
                    padding: 15px;
                    background: rgba(0, 0, 0, 0.8);
                    border: 2px solid #00ff41;
                    border-radius: 10px;
                    box-shadow: 0 0 20px rgba(0, 255, 65, 0.3);
                }

                .inventory-title {
                    color: #00ffff;
                    font-size: 12px;
                    margin-bottom: 10px;
                    text-align: center;
                    font-weight: bold;
                }

                .inventory-slots {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 8px;
                }

                .inventory-slot {
                    aspect-ratio: 1;
                    background: rgba(0, 0, 0, 0.5);
                    border: 1px solid #00ff41;
                    border-radius: 5px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-size: 20px;
                }

                .inventory-slot:hover {
                    background: rgba(0, 255, 65, 0.2);
                    box-shadow: 0 0 10px rgba(0, 255, 65, 0.5);
                }

                .inventory-slot.has-item {
                    background: rgba(0, 255, 65, 0.1);
                }

                /* Bottom Panel */
                .bottom-panel {
                    height: 120px;
                    background: linear-gradient(135deg, rgba(0, 255, 65, 0.1), rgba(0, 255, 255, 0.1));
                    border-top: 2px solid #00ff41;
                    padding: 15px;
                }

                .command-panel {
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                .command-input-group {
                    display: flex;
                    gap: 10px;
                    align-items: center;
                }

                .command-input {
                    flex: 1;
                    padding: 12px 15px;
                    background: rgba(0, 0, 0, 0.8);
                    border: 2px solid #00ff41;
                    border-radius: 8px;
                    color: #00ff41;
                    font-family: inherit;
                    font-size: 14px;
                    outline: none;
                }

                .command-input:focus {
                    box-shadow: 0 0 20px rgba(0, 255, 65, 0.5);
                    border-color: #00ffff;
                }

                .command-submit {
                    padding: 12px 20px;
                    background: linear-gradient(135deg, #00ff41, #00ffff);
                    border: none;
                    border-radius: 8px;
                    color: #000;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-size: 16px;
                }

                .command-submit:hover {
                    transform: scale(1.05);
                    box-shadow: 0 0 20px rgba(0, 255, 65, 0.8);
                }

                .command-suggestions {
                    display: flex;
                    gap: 10px;
                    flex-wrap: wrap;
                }

                .suggestion {
                    padding: 5px 10px;
                    background: rgba(0, 255, 65, 0.2);
                    border: 1px solid #00ff41;
                    border-radius: 15px;
                    font-size: 11px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .suggestion:hover {
                    background: rgba(0, 255, 65, 0.4);
                    transform: scale(1.05);
                }

                /* Combat Panel */
                .combat-panel {
                    height: 100%;
                    display: flex;
                    align-items: center;
                    gap: 20px;
                }

                .enemy-info {
                    flex: 1;
                }

                .enemy-name {
                    font-size: 16px;
                    color: #ff4040;
                    font-weight: bold;
                    margin-bottom: 10px;
                }

                .enemy-health {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .enemy-health-bar {
                    flex: 1;
                    height: 20px;
                    background: rgba(0, 0, 0, 0.7);
                    border: 1px solid #ff4040;
                    border-radius: 10px;
                    overflow: hidden;
                }

                .enemy-health-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #ff4040, #ff8080);
                    transition: width 0.3s ease;
                    box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.3);
                }

                .combat-actions {
                    display: flex;
                    gap: 10px;
                }

                .combat-btn {
                    padding: 10px 15px;
                    border: 2px solid;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-family: inherit;
                    font-size: 12px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 5px;
                    min-width: 70px;
                }

                .combat-btn.attack {
                    background: rgba(255, 0, 0, 0.2);
                    border-color: #ff4040;
                    color: #ff4040;
                }

                .combat-btn.defend {
                    background: rgba(0, 0, 255, 0.2);
                    border-color: #4040ff;
                    color: #4040ff;
                }

                .combat-btn.hack {
                    background: rgba(255, 255, 0, 0.2);
                    border-color: #ffff40;
                    color: #ffff40;
                }

                .combat-btn.run {
                    background: rgba(128, 128, 128, 0.2);
                    border-color: #808080;
                    color: #808080;
                }

                .combat-btn:hover {
                    transform: scale(1.05);
                    box-shadow: 0 0 15px currentColor;
                }

                /* Trade Panel */
                .trade-panel {
                    height: 100%;
                    display: flex;
                    gap: 15px;
                }

                .merchant-info {
                    display: flex;
                    gap: 15px;
                    align-items: center;
                }

                .merchant-avatar {
                    font-size: 40px;
                    width: 60px;
                    height: 60px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: rgba(0, 255, 65, 0.2);
                    border: 2px solid #00ff41;
                    border-radius: 50%;
                }

                .merchant-name {
                    font-size: 14px;
                    color: #00ffff;
                    font-weight: bold;
                    margin-bottom: 5px;
                }

                .merchant-dialogue {
                    font-size: 12px;
                    color: #cccccc;
                    max-width: 200px;
                    line-height: 1.4;
                }

                .trade-interface {
                    flex: 1;
                    display: flex;
                    gap: 15px;
                    align-items: center;
                }

                .merchant-inventory {
                    flex: 1;
                    display: flex;
                    gap: 10px;
                    overflow-x: auto;
                }

                .trade-item {
                    min-width: 80px;
                    padding: 10px;
                    background: rgba(0, 0, 0, 0.8);
                    border: 1px solid #00ff41;
                    border-radius: 8px;
                    text-align: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .trade-item:hover {
                    background: rgba(0, 255, 65, 0.2);
                    transform: scale(1.05);
                }

                .trade-item-icon {
                    font-size: 24px;
                    margin-bottom: 5px;
                }

                .trade-item-name {
                    font-size: 10px;
                    color: #00ffff;
                    margin-bottom: 3px;
                }

                .trade-item-price {
                    font-size: 10px;
                    color: #00ff00;
                    font-weight: bold;
                }

                .trade-btn {
                    padding: 10px 15px;
                    background: linear-gradient(135deg, rgba(255, 0, 0, 0.2), rgba(255, 100, 100, 0.2));
                    border: 1px solid #ff4040;
                    color: #ff4040;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-family: inherit;
                    display: flex;
                    align-items: center;
                    gap: 5px;
                }

                .trade-btn:hover {
                    background: linear-gradient(135deg, rgba(255, 0, 0, 0.4), rgba(255, 100, 100, 0.4));
                    transform: scale(1.05);
                }

                /* Side Panel */
                .side-panel {
                    width: 250px;
                    background: rgba(0, 0, 0, 0.8);
                    border: 2px solid #00ff41;
                    border-radius: 10px;
                    box-shadow: 0 0 20px rgba(0, 255, 65, 0.3);
                    display: flex;
                    flex-direction: column;
                }

                .panel-tabs {
                    display: flex;
                    border-bottom: 1px solid #00ff41;
                }

                .tab-btn {
                    flex: 1;
                    padding: 12px;
                    background: transparent;
                    border: none;
                    color: #00ff41;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-size: 16px;
                }

                .tab-btn:hover,
                .tab-btn.active {
                    background: rgba(0, 255, 65, 0.2);
                    color: #00ffff;
                }

                .panel-content {
                    flex: 1;
                    overflow-y: auto;
                }

                .tab-panel {
                    display: none;
                    padding: 15px;
                    height: 100%;
                }

                .tab-panel.active {
                    display: block;
                }

                /* Character Tab */
                .character-portrait {
                    text-align: center;
                    margin-bottom: 20px;
                }

                .avatar-frame {
                    width: 80px;
                    height: 80px;
                    margin: 0 auto;
                    border: 3px solid #00ff41;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: rgba(0, 255, 65, 0.1);
                    box-shadow: 0 0 20px rgba(0, 255, 65, 0.5);
                }

                .avatar-image {
                    font-size: 40px;
                }

                .character-stats {
                    margin-bottom: 20px;
                }

                .stat-row {
                    display: flex;
                    justify-content: space-between;
                    padding: 8px 0;
                    border-bottom: 1px solid rgba(0, 255, 65, 0.3);
                    font-size: 13px;
                }

                .experience-bar {
                    position: relative;
                    height: 20px;
                    background: rgba(0, 0, 0, 0.7);
                    border: 1px solid #00ff41;
                    border-radius: 10px;
                    overflow: hidden;
                }

                .exp-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #ffff00, #ffff80);
                    transition: width 0.3s ease;
                    box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.3);
                }

                .exp-text {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    font-size: 10px;
                    font-weight: bold;
                    color: #000;
                }

                /* Inventory Tab */
                .inventory-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 8px;
                }

                /* Map Tab */
                .mini-map {
                    position: relative;
                    width: 100%;
                    height: 200px;
                    background: 
                        radial-gradient(circle at 20% 20%, rgba(0, 255, 65, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 80% 30%, rgba(255, 100, 0, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 60% 80%, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
                        linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(0, 50, 0, 0.8));
                    border: 2px solid #00ff41;
                    border-radius: 10px;
                    margin-bottom: 15px;
                    overflow: hidden;
                }

                .map-location {
                    position: absolute;
                    transform: translate(-50%, -50%);
                    font-size: 16px;
                    animation: pulse 2s infinite;
                }

                .map-legend {
                    font-size: 11px;
                    line-height: 1.6;
                }

                .legend-item {
                    margin-bottom: 5px;
                    color: #cccccc;
                }

                /* Journal Tab */
                .journal-entries {
                    max-height: 400px;
                    overflow-y: auto;
                }

                .journal-entry {
                    margin-bottom: 20px;
                    padding: 15px;
                    background: rgba(0, 255, 65, 0.1);
                    border: 1px solid rgba(0, 255, 65, 0.3);
                    border-radius: 8px;
                }

                .entry-title {
                    font-size: 14px;
                    color: #00ffff;
                    font-weight: bold;
                    margin-bottom: 8px;
                }

                .entry-content {
                    font-size: 12px;
                    line-height: 1.5;
                    color: #cccccc;
                }

                /* Game Effects */
                .game-effects {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: 100;
                }

                .scan-lines {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: repeating-linear-gradient(
                        0deg,
                        transparent,
                        transparent 2px,
                        rgba(0, 255, 65, 0.03) 2px,
                        rgba(0, 255, 65, 0.03) 4px
                    );
                    animation: scanLines 2s linear infinite;
                }

                @keyframes scanLines {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(4px); }
                }

                .glitch-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: transparent;
                    opacity: 0;
                }

                .glitch-overlay.active {
                    animation: glitch 0.3s ease-in-out;
                }

                @keyframes glitch {
                    0%, 100% {
                        opacity: 0;
                        transform: translate(0);
                    }
                    20% {
                        opacity: 1;
                        transform: translate(-2px, 2px);
                        background: rgba(255, 0, 0, 0.1);
                    }
                    40% {
                        opacity: 1;
                        transform: translate(-2px, -2px);
                        background: rgba(0, 255, 0, 0.1);
                    }
                    60% {
                        opacity: 1;
                        transform: translate(2px, 2px);
                        background: rgba(0, 0, 255, 0.1);
                    }
                    80% {
                        opacity: 1;
                        transform: translate(2px, -2px);
                        background: rgba(255, 255, 0, 0.1);
                    }
                }

                /* Utility Classes */
                .hidden {
                    display: none !important;
                }

                .text-glow {
                    text-shadow: 0 0 10px currentColor;
                }

                .cyberpunk-border {
                    border: 2px solid #00ff41;
                    box-shadow: 0 0 20px rgba(0, 255, 65, 0.3);
                }

                /* Responsive Design */
                @media (max-width: 1000px) {
                    .side-panel {
                        width: 200px;
                    }
                    
                    .game-main {
                        flex-direction: column;
                    }
                    
                    .story-panel {
                        height: 60%;
                    }
                    
                    .actions-panel {
                        flex-direction: row;
                    }
                }

                @media (max-width: 768px) {
                    .status-bar {
                        flex-direction: column;
                        gap: 10px;
                    }
                    
                    .player-stats {
                        flex-direction: column;
                        gap: 10px;
                    }
                    
                    .side-panel {
                        width: 100%;
                        height: 200px;
                    }
                }
            </style>
        `;
    }

    static init(windowElement) {
        this.window = windowElement;
        this.gameState = this.createInitialGameState();
        this.autoScroll = false;
        this.currentBackgroundSet = '';
        this.combatSystem = new CombatSystem();
        this.tradeSystem = new TradeSystem();
        this.storyGenerator = new StoryGenerator();

        this.setupEventListeners();
        this.initializeBackgrounds();
        this.startRainEffect();
        this.loadGameData();
        this.startGame();
    }

    static createInitialGameState() {
        return {
            player: {
                name: 'Neo Runner',
                level: 1,
                experience: 0,
                experienceToNext: 100,
                health: 100,
                maxHealth: 100,
                energy: 100,
                maxEnergy: 100,
                credits: 500,
                stats: {
                    strength: 10,
                    agility: 12,
                    tech: 15,
                    charisma: 8,
                    streetCred: 5
                },
                inventory: [
                    { id: 'datapad', name: 'Data Pad', icon: '💻', quantity: 1, type: 'tool' },
                    { id: 'credstick', name: 'Cred Stick', icon: '💳', quantity: 1, type: 'currency' },
                    { id: 'stimpak', name: 'Stim Pack', icon: '💉', quantity: 3, type: 'consumable' }
                ],
                quickSlots: ['datapad', 'credstick', 'stimpak']
            },
            currentLocation: {
                id: 'neo-tokyo-district7',
                name: 'Neo Tokyo - District 7',
                description: 'Rain-slicked streets reflect the neon glow of corporate towers.',
                background: 'cybercity'
            },
            gameTime: {
                hour: 23,
                minute: 47,
                cycle: 'Night'
            },
            currentScene: null,
            gameFlags: {},
            journalEntries: [
                {
                    title: 'Day 1 - The Awakening',
                    content: 'Something\'s different in Neo Tokyo tonight. The neon bleeds differently...',
                    timestamp: Date.now()
                }
            ],
            inCombat: false,
            inTrade: false,
            currentEnemy: null,
            currentMerchant: null
        };
    }

    static setupEventListeners() {
        const commandInput = this.window.querySelector('#command-input');
        commandInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.processCommand();
            }
        });

        commandInput.addEventListener('input', (e) => {
            this.updateCommandSuggestions(e.target.value);
        });

        // Make the window focusable for keyboard events
        this.window.tabIndex = 0;
        this.window.focus();
    }

    static async startGame() {
        await this.showLoadingSequence();
        this.changeBackground('cybercity');
        await this.displayStoryText("Welcome to Neo Tokyo, 2089...", 1000);
        await this.sleep(500);
        await this.displayStoryText("The rain falls in digital patterns, each drop carrying encrypted data from the corporate towers above.", 2000);
        await this.sleep(500);
        await this.displayStoryText("You are a data runner, living on the edge between the physical and digital worlds.", 2000);
        await this.sleep(500);

        this.gameState.currentScene = this.storyGenerator.generateRandomScene();
        await this.displayCurrentScene();
        this.updateActionButtons();
        this.updateUI();
    }

    static async showLoadingSequence() {
        const loadingTexts = [
            "NEURAL INTERFACE CALIBRATED",
            "CONNECTING TO GRID...",
            "IDENTITY VERIFIED",
            "WELCOME TO THE NET"
        ];

        for (let text of loadingTexts) {
            this.window.querySelector('.loading-text').textContent = text;
            await this.sleep(800);
        }

        this.window.querySelector('.story-content').innerHTML = '';
    }

    static initializeBackgrounds() {
        const backgrounds = {
            cybercity: {
                layer1: 'linear-gradient(180deg, #000428 0%, #004e92 100%)',
                layer2: `repeating-linear-gradient(
                    90deg,
                    transparent,
                    transparent 100px,
                    rgba(0, 255, 65, 0.1) 100px,
                    rgba(0, 255, 65, 0.1) 102px
                )`,
                layer3: `radial-gradient(ellipse at bottom, rgba(255, 100, 0, 0.1) 0%, transparent 70%)`
            },
            underground: {
                layer1: 'linear-gradient(180deg, #1a1a1a 0%, #000000 100%)',
                layer2: `repeating-linear-gradient(
                    45deg,
                    transparent,
                    transparent 50px,
                    rgba(255, 0, 0, 0.1) 50px,
                    rgba(255, 0, 0, 0.1) 52px
                )`,
                layer3: 'radial-gradient(circle at center, rgba(255, 255, 0, 0.1) 0%, transparent 50%)'
            },
            corporate: {
                layer1: 'linear-gradient(180deg, #0f0f23 0%, #1a1a2e 100%)',
                layer2: `linear-gradient(
                    90deg,
                    transparent 0%,
                    rgba(0, 255, 255, 0.1) 50%,
                    transparent 100%
                )`,
                layer3: 'linear-gradient(0deg, rgba(255, 255, 255, 0.1) 0%, transparent 30%)'
            },
            wasteland: {
                layer1: 'linear-gradient(180deg, #2c1810 0%, #8b4513 100%)',
                layer2: `repeating-linear-gradient(
                    0deg,
                    transparent,
                    transparent 200px,
                    rgba(255, 165, 0, 0.1) 200px,
                    rgba(255, 165, 0, 0.1) 202px
                )`,
                layer3: 'radial-gradient(ellipse at top, rgba(255, 69, 0, 0.2) 0%, transparent 60%)'
            },
            nightclub: {
                layer1: 'linear-gradient(180deg, #8e2de2 0%, #4a00e0 100%)',
                layer2: `radial-gradient(
                    circle,
                    rgba(255, 0, 150, 0.3) 0%,
                    transparent 30%
                )`,
                layer3: 'linear-gradient(45deg, rgba(0, 255, 255, 0.2) 0%, transparent 60%)'
            }
        };

        this.backgrounds = backgrounds;
    }

    static changeBackground(backgroundId) {
        if (!this.backgrounds[backgroundId] || this.currentBackgroundSet === backgroundId) return;

        this.currentBackgroundSet = backgroundId;
        const bg = this.backgrounds[backgroundId];

        const layer1 = this.window.querySelector('#bg-layer1');
        const layer2 = this.window.querySelector('#bg-layer2');
        const layer3 = this.window.querySelector('#bg-layer3');

        layer1.style.background = bg.layer1;
        layer2.style.background = bg.layer2;
        layer3.style.background = bg.layer3;

        this.triggerGlitchEffect();
    }

    static startRainEffect() {
        const rainContainer = this.window.querySelector('#rain-effect');

        setInterval(() => {
            if (Math.random() < 0.7) { // 70% chance to create rain drops
                this.createRainDrop(rainContainer);
            }
        }, 100);
    }

    static createRainDrop(container) {
        const drop = document.createElement('div');
        drop.className = 'rain-drop';
        drop.style.left = Math.random() * 100 + '%';
        drop.style.animationDuration = (Math.random() * 1 + 0.5) + 's';
        drop.style.opacity = Math.random() * 0.5 + 0.3;

        container.appendChild(drop);

        // Remove drop after animation
        setTimeout(() => {
            if (drop.parentNode) {
                drop.parentNode.removeChild(drop);
            }
        }, 2000);
    }

    static async displayStoryText(text, delay = 0) {
        const storyContent = this.window.querySelector('#story-content');
        const textElement = document.createElement('div');
        textElement.className = 'story-text';

        // Typewriter effect
        textElement.innerHTML = '';
        storyContent.appendChild(textElement);

        for (let i = 0; i < text.length; i++) {
            textElement.innerHTML += text[i];
            if (i % 3 === 0) { // Add some variation to typing speed
                await this.sleep(30 + Math.random() * 20);
            }
        }

        // Auto-scroll to bottom
        storyContent.scrollTop = storyContent.scrollHeight;

        if (delay > 0) {
            await this.sleep(delay);
        }
    }

    static async displayCurrentScene() {
        const scene = this.gameState.currentScene;
        if (!scene) return;

        // Change background based on scene location
        if (scene.location && scene.location.background) {
            this.changeBackground(scene.location.background);
            this.gameState.currentLocation = scene.location;
            this.updateLocationInfo();
        }

        await this.displayStoryText(scene.description);

        if (scene.characters && scene.characters.length > 0) {
            for (let character of scene.characters) {
                await this.sleep(500);
                await this.displayStoryText(`${character.name}: "${character.dialogue}"`);
            }
        }

        if (scene.discovery) {
            await this.sleep(500);
            await this.displayStoryText(`💡 ${scene.discovery}`);
            this.addJournalEntry('Discovery', scene.discovery);
        }
    }

    static updateActionButtons() {
        const actionContainer = this.window.querySelector('#action-buttons');
        const scene = this.gameState.currentScene;

        actionContainer.innerHTML = '';

        if (!scene || !scene.actions) {
            // Default actions
            this.addActionButton(actionContainer, '🚶', 'Explore the area', () => this.exploreArea());
            this.addActionButton(actionContainer, '🔍', 'Look around', () => this.lookAround());
            this.addActionButton(actionContainer, '💭', 'Think', () => this.think());
            return;
        }

        scene.actions.forEach(action => {
            this.addActionButton(actionContainer, action.icon, action.text, () => {
                this.executeAction(action);
            });
        });
    }

    static addActionButton(container, icon, text, callback) {
        const button = document.createElement('button');
        button.className = 'action-btn';
        button.innerHTML = `${icon} ${text}`;
        button.onclick = callback;
        container.appendChild(button);
    }

    static async executeAction(action) {
        await this.displayStoryText(`> ${action.text}`);
        await this.sleep(300);

        if (action.outcome) {
            await this.displayStoryText(action.outcome);
        }

        if (action.type === 'combat') {
            await this.startCombat(action.enemy);
        } else if (action.type === 'trade') {
            await this.startTrade(action.merchant);
        } else if (action.type === 'move') {
            await this.moveToLocation(action.destination);
        } else if (action.type === 'discovery') {
            await this.handleDiscovery(action.discovery);
        }

        // Generate next scene
        this.gameState.currentScene = this.storyGenerator.generateRandomScene();
        await this.sleep(1000);
        await this.displayCurrentScene();
        this.updateActionButtons();
    }

    static async exploreArea() {
        const explorationTexts = [
            "You scan the environment with enhanced senses...",
            "Your neural implants detect electromagnetic signatures nearby...",
            "The street tells a thousand stories in data fragments...",
            "You notice patterns in the urban decay that others miss..."
        ];

        const randomText = explorationTexts[Math.floor(Math.random() * explorationTexts.length)];
        await this.displayStoryText(`> Explore the area`);
        await this.sleep(500);
        await this.displayStoryText(randomText);

        // Random chance of finding something
        if (Math.random() < 0.3) {
            const findings = [
                { type: 'credits', amount: Math.floor(Math.random() * 100) + 50 },
                { type: 'item', item: { id: 'datachip', name: 'Data Chip', icon: '💾', quantity: 1, type: 'valuable' } },
                { type: 'info', text: "You intercept a corporate transmission..." }
            ];

            const finding = findings[Math.floor(Math.random() * findings.length)];

            if (finding.type === 'credits') {
                this.gameState.player.credits += finding.amount;
                await this.displayStoryText(`💰 You found ${finding.amount} credits!`);
            } else if (finding.type === 'item') {
                this.addToInventory(finding.item);
                await this.displayStoryText(`📦 You found: ${finding.item.name}`);
            } else if (finding.type === 'info') {
                await this.displayStoryText(`📡 ${finding.text}`);
                this.addJournalEntry('Intelligence', finding.text);
            }

            this.updateUI();
        }

        // Progress time
        this.advanceTime(Math.floor(Math.random() * 30) + 15);
    }

    static async lookAround() {
        const scene = this.gameState.currentScene;
        await this.displayStoryText(`> Look around`);
        await this.sleep(300);

        if (scene && scene.details) {
            await this.displayStoryText(scene.details);
        } else {
            const defaultDescriptions = [
                "Neon signs flicker in multiple languages, advertising everything from black market cybernetics to synthetic dreams.",
                "The air hums with electromagnetic interference from countless devices and implants.",
                "Shadows move between the towers - some human, others enhanced beyond recognition.",
                "Data streams flow visibly through fiber optic cables, painting the walls in cascading light."
            ];

            const description = defaultDescriptions[Math.floor(Math.random() * defaultDescriptions.length)];
            await this.displayStoryText(description);
        }
    }

    static async think() {
        const thoughts = [
            "The corporate war is escalating. Every data run becomes more dangerous.",
            "My neural implants are due for an upgrade, but I need more credits.",
            "Something's happening in the deep net. The AIs are restless.",
            "The street has its own rules, but the corps write the laws.",
            "Memory can be edited, but the scars on your soul remain."
        ];

        await this.displayStoryText(`> Think`);
        await this.sleep(300);

        const thought = thoughts[Math.floor(Math.random() * thoughts.length)];
        await this.displayStoryText(`💭 ${thought}`);
    }

    static async startCombat(enemy) {
        this.gameState.inCombat = true;
        this.gameState.currentEnemy = enemy;

        this.showCombatPanel();
        this.updateEnemyUI();

        await this.displayStoryText(`⚔️ Combat initiated with ${enemy.name}!`);
        this.triggerGlitchEffect();
    }

    static async combatAction(action) {
        const result = this.combatSystem.executeAction(action, this.gameState.player, this.gameState.currentEnemy);

        await this.displayStoryText(result.playerAction);
        if (result.enemyAction) {
            await this.sleep(500);
            await this.displayStoryText(result.enemyAction);
        }

        // Update health
        this.gameState.player.health = result.playerHealth;
        this.gameState.currentEnemy.health = result.enemyHealth;

        this.updateUI();
        this.updateEnemyUI();

        // Check combat end conditions
        if (result.playerHealth <= 0) {
            await this.handlePlayerDeath();
        } else if (result.enemyHealth <= 0) {
            await this.handleCombatVictory();
        }
    }

    static async handleCombatVictory() {
        const enemy = this.gameState.currentEnemy;
        const expGain = enemy.level * 20;
        const creditGain = Math.floor(Math.random() * 200) + 100;

        await this.displayStoryText(`✅ ${enemy.name} defeated!`);
        await this.displayStoryText(`📈 Gained ${expGain} experience`);
        await this.displayStoryText(`💰 Gained ${creditGain} credits`);

        this.gainExperience(expGain);
        this.gameState.player.credits += creditGain;

        // Random item drop
        if (Math.random() < 0.4) {
            const loot = this.generateRandomLoot();
            this.addToInventory(loot);
            await this.displayStoryText(`📦 Found: ${loot.name}`);
        }

        this.endCombat();
    }

    static async handlePlayerDeath() {
        await this.displayStoryText(`💀 You have been flatlined...`);
        await this.sleep(1000);
        await this.displayStoryText(`🔄 Emergency medical protocols activated...`);
        await this.sleep(1000);

        // Respawn with penalty
        this.gameState.player.health = Math.floor(this.gameState.player.maxHealth * 0.3);
        this.gameState.player.credits = Math.floor(this.gameState.player.credits * 0.8);

        await this.displayStoryText(`⚕️ You wake up in a back-alley clinic...`);
        await this.displayStoryText(`💸 Medical costs: ${Math.floor(this.gameState.player.credits * 0.2)} credits`);

        this.endCombat();
        this.changeBackground('underground');
    }

    static endCombat() {
        this.gameState.inCombat = false;
        this.gameState.currentEnemy = null;
        this.hideCombatPanel();
        this.updateUI();
    }

    static async startTrade(merchant) {
        this.gameState.inTrade = true;
        this.gameState.currentMerchant = merchant;

        this.showTradePanel();
        this.updateMerchantUI();

        await this.displayStoryText(`🛒 ${merchant.name}: "${merchant.greeting}"`);
    }

    static closeTrade() {
        this.gameState.inTrade = false;
        this.gameState.currentMerchant = null;
        this.hideTradePanel();
    }

    static async buyItem(item) {
        if (this.gameState.player.credits >= item.price) {
            this.gameState.player.credits -= item.price;
            this.addToInventory(item);
            await this.displayStoryText(`✅ Purchased ${item.name} for ${item.price} credits`);
            this.updateUI();
        } else {
            await this.displayStoryText(`❌ Not enough credits. Need ${item.price - this.gameState.player.credits} more.`);
        }
    }

    static processCommand() {
        const input = this.window.querySelector('#command-input');
        const command = input.value.trim().toLowerCase();
        input.value = '';

        if (!command) return;

        this.executeCommand(command);
        this.hideCommandSuggestions();
    }

    static async executeCommand(command) {
        await this.displayStoryText(`> ${command}`);
        await this.sleep(300);

        const commands = {
            'help': () => this.showHelp(),
            'inventory': () => this.showInventory(),
            'stats': () => this.showStats(),
            'time': () => this.showTime(),
            'save': () => this.saveGame(),
            'load': () => this.loadGame(),
            'hack': () => this.attemptHack(),
            'meditate': () => this.meditate(),
            'rest': () => this.rest(),
            'scan': () => this.scanArea(),
            'jack in': () => this.jackIn(),
            'status': () => this.showStatus()
        };

        if (commands[command]) {
            await commands[command]();
        } else {
            await this.handleUnknownCommand(command);
        }
    }

    static async showHelp() {
        const helpText = `
📖 Available Commands:
• help - Show this help
• inventory - Show your items
• stats - Show character stats
• scan - Scan for nearby objects
• hack - Attempt to hack systems
• jack in - Connect to the net
• meditate - Restore energy
• rest - Heal and pass time
• save/load - Game management
• status - Show current status
        `;
        await this.displayStoryText(helpText);
    }

    static async showInventory() {
        let invText = "🎒 Inventory:\n";
        this.gameState.player.inventory.forEach(item => {
            invText += `• ${item.icon} ${item.name} x${item.quantity}\n`;
        });
        await this.displayStoryText(invText);
    }

    static async showStats() {
        const stats = this.gameState.player.stats;
        const statsText = `
📊 Character Stats:
• Strength: ${stats.strength}
• Agility: ${stats.agility}
• Tech: ${stats.tech}
• Charisma: ${stats.charisma}
• Street Cred: ${stats.streetCred}
        `;
        await this.displayStoryText(statsText);
    }

    static async showTime() {
        const time = this.gameState.gameTime;
        await this.displayStoryText(`🕐 Current time: ${time.hour}:${time.minute.toString().padStart(2, '0')} - ${time.cycle} Cycle`);
    }

    static async attemptHack() {
        const techRoll = Math.random() * 20 + this.gameState.player.stats.tech;

        if (techRoll > 15) {
            await this.displayStoryText("💻 Hack successful! You've accessed secure data streams...");
            const creditGain = Math.floor(Math.random() * 300) + 100;
            this.gameState.player.credits += creditGain;
            await this.displayStoryText(`💰 Transferred ${creditGain} credits to your account`);
            this.gainExperience(50);
        } else {
            await this.displayStoryText("⚠️ Hack failed. ICE detected your intrusion...");
            if (Math.random() < 0.3) {
                const damage = Math.floor(Math.random() * 20) + 10;
                this.gameState.player.health -= damage;
                await this.displayStoryText(`💥 Feedback surge! Lost ${damage} health`);
            }
        }

        this.updateUI();
    }

    static async meditate() {
        const energyGain = Math.floor(Math.random() * 30) + 20;
        this.gameState.player.energy = Math.min(
            this.gameState.player.maxEnergy,
            this.gameState.player.energy + energyGain
        );

        await this.displayStoryText("🧘 You center yourself in the digital chaos...");
        await this.displayStoryText(`⚡ Restored ${energyGain} energy`);
        this.advanceTime(30);
        this.updateUI();
    }

    static async rest() {
        const healthGain = Math.floor(Math.random() * 40) + 30;
        this.gameState.player.health = Math.min(
            this.gameState.player.maxHealth,
            this.gameState.player.health + healthGain
        );

        await this.displayStoryText("😴 You find a safe spot to rest...");
        await this.displayStoryText(`❤️ Restored ${healthGain} health`);
        this.advanceTime(120);
        this.updateUI();
    }

    static async scanArea() {
        await this.displayStoryText("🔍 Scanning area with enhanced sensors...");
        await this.sleep(1000);

        const scanResults = [
            "📡 Electromagnetic signatures detected from nearby devices",
            "🎭 Several individuals with illegal neural modifications",
            "💾 Unencrypted data packets flowing through local networks",
            "⚠️ Corporate surveillance drones in the area",
            "💀 Traces of recent violence - blood and circuitry",
            "🌐 Active VR session nodes accessible for intrusion"
        ];

        const result = scanResults[Math.floor(Math.random() * scanResults.length)];
        await this.displayStoryText(result);
    }

    static async jackIn() {
        if (this.gameState.player.energy < 20) {
            await this.displayStoryText("⚡ Insufficient energy to jack in safely");
            return;
        }

        this.gameState.player.energy -= 20;
        await this.displayStoryText("🔌 Jacking into the net...");

        this.changeBackground('corporate');
        await this.sleep(1000);

        const netEvents = [
            {
                text: "🌐 You access a corporate data vault...",
                outcome: "credits",
                value: Math.floor(Math.random() * 500) + 200
            },
            {
                text: "🤖 An AI construct challenges you to a data duel...",
                outcome: "combat",
                enemy: this.generateNetEnemy()
            },
            {
                text: "📊 You discover classified corporate intel...",
                outcome: "experience",
                value: 75
            }
        ];

        const event = netEvents[Math.floor(Math.random() * netEvents.length)];
        await this.displayStoryText(event.text);

        if (event.outcome === "credits") {
            this.gameState.player.credits += event.value;
            await this.displayStoryText(`💰 Gained ${event.value} credits`);
        } else if (event.outcome === "experience") {
            this.gainExperience(event.value);
            await this.displayStoryText(`📈 Gained ${event.value} experience`);
        } else if (event.outcome === "combat") {
            await this.startCombat(event.enemy);
        }

        this.updateUI();
    }

    static async showStatus() {
        const player = this.gameState.player;
        const location = this.gameState.currentLocation;

        const statusText = `
📋 Status Report:
• Location: ${location.name}
• Health: ${player.health}/${player.maxHealth}
• Energy: ${player.energy}/${player.maxEnergy}
• Credits: ${player.credits}
• Level: ${player.level}
• XP: ${player.experience}/${player.experienceToNext}
        `;

        await this.displayStoryText(statusText);
    }

    static async handleUnknownCommand(command) {
        const responses = [
            "🤖 Command not recognized. Try 'help' for available commands.",
            "❓ Unknown directive. Your neural interface suggests 'help'.",
            "⚠️ Syntax error. Reference help documentation.",
            "🔍 Command not found in database. Use 'help' for options."
        ];

        const response = responses[Math.floor(Math.random() * responses.length)];
        await this.displayStoryText(response);
    }

    static updateCommandSuggestions(input) {
        const suggestions = this.window.querySelector('#command-suggestions');

        if (!input) {
            suggestions.innerHTML = '';
            return;
        }

        const commands = ['help', 'inventory', 'stats', 'scan', 'hack', 'jack in', 'meditate', 'rest', 'save', 'load'];
        const matching = commands.filter(cmd => cmd.startsWith(input.toLowerCase()));

        suggestions.innerHTML = matching.map(cmd =>
            `<span class="suggestion" onclick="NeonShadows.selectSuggestion('${cmd}')">${cmd}</span>`
        ).join('');
    }

    static selectSuggestion(command) {
        this.window.querySelector('#command-input').value = command;
        this.hideCommandSuggestions();
    }

    static hideCommandSuggestions() {
        this.window.querySelector('#command-suggestions').innerHTML = '';
    }

    // UI Management
    static updateUI() {
        this.updatePlayerStats();
        this.updateInventoryUI();
        this.updateTimeDisplay();
    }

    static updatePlayerStats() {
        const player = this.gameState.player;

        // Health bar
        const healthFill = this.window.querySelector('#health-fill');
        const healthText = this.window.querySelector('#health-text');
        const healthPercent = (player.health / player.maxHealth) * 100;
        healthFill.style.width = healthPercent + '%';
        healthText.textContent = `${player.health}/${player.maxHealth}`;

        // Energy bar
        const energyFill = this.window.querySelector('#energy-fill');
        const energyText = this.window.querySelector('#energy-text');
        const energyPercent = (player.energy / player.maxEnergy) * 100;
        energyFill.style.width = energyPercent + '%';
        energyText.textContent = `${player.energy}/${player.maxEnergy}`;

        // Credits and level
        this.window.querySelector('#player-credits').textContent = player.credits;
        this.window.querySelector('#player-level').textContent = player.level;

        // Experience bar
        const expFill = this.window.querySelector('#exp-fill');
        const expText = this.window.querySelector('#exp-text');
        const expPercent = (player.experience / player.experienceToNext) * 100;
        expFill.style.width = expPercent + '%';
        expText.textContent = `${player.experience}/${player.experienceToNext}`;

        // Stats
        const stats = player.stats;
        this.window.querySelector('#stat-strength').textContent = stats.strength;
        this.window.querySelector('#stat-agility').textContent = stats.agility;
        this.window.querySelector('#stat-tech').textContent = stats.tech;
        this.window.querySelector('#stat-charisma').textContent = stats.charisma;
        this.window.querySelector('#stat-streetcred').textContent = stats.streetCred;
    }

    static updateInventoryUI() {
        const inventoryGrid = this.window.querySelector('#inventory-grid');
        const quickSlots = this.window.querySelector('#quick-slots');

        // Full inventory
        inventoryGrid.innerHTML = '';
        for (let i = 0; i < 20; i++) {
            const slot = document.createElement('div');
            slot.className = 'inventory-slot';

            const item = this.gameState.player.inventory[i];
            if (item) {
                slot.classList.add('has-item');
                slot.innerHTML = `${item.icon}<div style="font-size: 8px; position: absolute; bottom: 2px; right: 2px;">${item.quantity}</div>`;
                slot.title = item.name;
            }

            inventoryGrid.appendChild(slot);
        }

        // Quick slots
        quickSlots.innerHTML = '';
        this.gameState.player.quickSlots.forEach(itemId => {
            const slot = document.createElement('div');
            slot.className = 'inventory-slot';

            const item = this.gameState.player.inventory.find(i => i.id === itemId);
            if (item) {
                slot.classList.add('has-item');
                slot.innerHTML = item.icon;
                slot.title = item.name;
            }

            quickSlots.appendChild(slot);
        });
    }

    static updateTimeDisplay() {
        const time = this.gameState.gameTime;
        const timeStr = `${time.hour}:${time.minute.toString().padStart(2, '0')} - ${time.cycle} Cycle`;
        this.window.querySelector('#time-info').textContent = timeStr;
    }

    static updateLocationInfo() {
        const location = this.gameState.currentLocation;
        this.window.querySelector('#current-location').textContent = location.name;
    }

    static showCombatPanel() {
        this.window.querySelector('#command-panel').classList.add('hidden');
        this.window.querySelector('#trade-panel').classList.add('hidden');
        this.window.querySelector('#combat-panel').classList.remove('hidden');
    }

    static hideCombatPanel() {
        this.window.querySelector('#combat-panel').classList.add('hidden');
        this.window.querySelector('#command-panel').classList.remove('hidden');
    }

    static showTradePanel() {
        this.window.querySelector('#command-panel').classList.add('hidden');
        this.window.querySelector('#combat-panel').classList.add('hidden');
        this.window.querySelector('#trade-panel').classList.remove('hidden');
    }

    static hideTradePanel() {
        this.window.querySelector('#trade-panel').classList.add('hidden');
        this.window.querySelector('#command-panel').classList.remove('hidden');
    }

    static updateEnemyUI() {
        if (!this.gameState.currentEnemy) return;

        const enemy = this.gameState.currentEnemy;
        this.window.querySelector('#enemy-name').textContent = enemy.name;

        const healthPercent = (enemy.health / enemy.maxHealth) * 100;
        this.window.querySelector('#enemy-health-fill').style.width = healthPercent + '%';
        this.window.querySelector('#enemy-health-text').textContent = `${enemy.health}/${enemy.maxHealth}`;
    }

    static updateMerchantUI() {
        if (!this.gameState.currentMerchant) return;

        const merchant = this.gameState.currentMerchant;
        this.window.querySelector('#merchant-name').textContent = merchant.name;
        this.window.querySelector('#merchant-dialogue').textContent = merchant.greeting;
        this.window.querySelector('#merchant-avatar').textContent = merchant.avatar;

        const inventory = this.window.querySelector('#merchant-inventory');
        inventory.innerHTML = '';

        merchant.inventory.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'trade-item';
            itemDiv.innerHTML = `
                <div class="trade-item-icon">${item.icon}</div>
                <div class="trade-item-name">${item.name}</div>
                <div class="trade-item-price">₡${item.price}</div>
            `;
            itemDiv.onclick = () => this.buyItem(item);
            inventory.appendChild(itemDiv);
        });
    }

    // Tab Management
    static switchTab(tabName) {
        // Update tab buttons
        this.window.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        this.window.querySelector(`[onclick*="${tabName}"]`).classList.add('active');

        // Update tab panels
        this.window.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));
        this.window.querySelector(`#${tabName}-tab`).classList.add('active');
    }

    // Game Mechanics
    static gainExperience(amount) {
        this.gameState.player.experience += amount;

        while (this.gameState.player.experience >= this.gameState.player.experienceToNext) {
            this.levelUp();
        }
    }

    static levelUp() {
        this.gameState.player.experience -= this.gameState.player.experienceToNext;
        this.gameState.player.level++;
        this.gameState.player.experienceToNext = this.gameState.player.level * 100;

        // Stat increases
        const statGains = Math.floor(Math.random() * 3) + 2;
        for (let i = 0; i < statGains; i++) {
            const stats = ['strength', 'agility', 'tech', 'charisma', 'streetCred'];
            const statToIncrease = stats[Math.floor(Math.random() * stats.length)];
            this.gameState.player.stats[statToIncrease]++;
        }

        // Health and energy increases
        this.gameState.player.maxHealth += Math.floor(Math.random() * 20) + 10;
        this.gameState.player.maxEnergy += Math.floor(Math.random() * 15) + 5;
        this.gameState.player.health = this.gameState.player.maxHealth;
        this.gameState.player.energy = this.gameState.player.maxEnergy;

        this.displayStoryText(`🎉 LEVEL UP! You are now level ${this.gameState.player.level}!`);
        this.triggerGlitchEffect();
    }

    static addToInventory(item) {
        const existingItem = this.gameState.player.inventory.find(i => i.id === item.id);

        if (existingItem) {
            existingItem.quantity += item.quantity || 1;
        } else {
            this.gameState.player.inventory.push(item);
        }
    }

    static advanceTime(minutes) {
        this.gameState.gameTime.minute += minutes;

        while (this.gameState.gameTime.minute >= 60) {
            this.gameState.gameTime.minute -= 60;
            this.gameState.gameTime.hour++;
        }

        if (this.gameState.gameTime.hour >= 24) {
            this.gameState.gameTime.hour = 0;
        }

        // Update cycle
        if (this.gameState.gameTime.hour >= 6 && this.gameState.gameTime.hour < 18) {
            this.gameState.gameTime.cycle = 'Day';
        } else {
            this.gameState.gameTime.cycle = 'Night';
        }

        this.updateTimeDisplay();
    }

    static addJournalEntry(title, content) {
        this.gameState.journalEntries.push({
            title: title,
            content: content,
            timestamp: Date.now()
        });

        this.updateJournalUI();
    }

    static updateJournalUI() {
        const journal = this.window.querySelector('#journal-entries');
        journal.innerHTML = '';

        this.gameState.journalEntries.slice(-10).reverse().forEach(entry => {
            const entryDiv = document.createElement('div');
            entryDiv.className = 'journal-entry';
            entryDiv.innerHTML = `
                <div class="entry-title">${entry.title}</div>
                <div class="entry-content">${entry.content}</div>
            `;
            journal.appendChild(entryDiv);
        });
    }

    // Effects
    static triggerGlitchEffect() {
        const glitch = this.window.querySelector('#glitch-overlay');
        glitch.classList.add('active');
        setTimeout(() => {
            glitch.classList.remove('active');
        }, 300);
    }

    // Save/Load System
    static saveGame() {
        try {
            const saveData = {
                gameState: this.gameState,
                timestamp: Date.now(),
                version: '1.0'
            };

            localStorage.setItem('neon-shadows-save', JSON.stringify(saveData));
            this.displayStoryText("💾 Game saved successfully");
        } catch (error) {
            this.displayStoryText("❌ Save failed: " + error.message);
        }
    }

    static loadGame() {
        try {
            const saveData = localStorage.getItem('neon-shadows-save');
            if (!saveData) {
                this.displayStoryText("❌ No save file found");
                return;
            }

            const parsed = JSON.parse(saveData);
            this.gameState = parsed.gameState;

            this.updateUI();
            this.changeBackground(this.gameState.currentLocation.background || 'cybercity');
            this.displayStoryText("💾 Game loaded successfully");

            if (this.gameState.currentScene) {
                this.updateActionButtons();
            }
        } catch (error) {
            this.displayStoryText("❌ Load failed: " + error.message);
        }
    }

    static loadGameData() {
        // Try to load existing save
        const saveData = localStorage.getItem('neon-shadows-save');
        if (saveData) {
            try {
                const parsed = JSON.parse(saveData);
                // Don't auto-load, just indicate save exists
                this.hasSaveFile = true;
            } catch (error) {
                console.error('Save file corrupted:', error);
            }
        }
    }

    // Utility Functions
    static sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    static generateRandomLoot() {
        const lootTable = [
            { id: 'datachip', name: 'Data Chip', icon: '💾', quantity: 1, type: 'valuable', sellPrice: 50 },
            { id: 'stimpak', name: 'Stim Pack', icon: '💉', quantity: 1, type: 'consumable', healAmount: 50 },
            { id: 'credchip', name: 'Credit Chip', icon: '💳', quantity: 1, type: 'currency', value: 100 },
            { id: 'cyberware', name: 'Neural Enhancer', icon: '🧠', quantity: 1, type: 'upgrade', statBonus: 'tech' },
            { id: 'ammo', name: 'Smart Rounds', icon: '🔫', quantity: 20, type: 'ammo' }
        ];

        return lootTable[Math.floor(Math.random() * lootTable.length)];
    }

    static generateNetEnemy() {
        const enemies = [
            { name: 'ICE Guardian', health: 80, maxHealth: 80, level: 3, avatar: '🤖' },
            { name: 'Viral Code', health: 60, maxHealth: 60, level: 2, avatar: '💀' },
            { name: 'Security Daemon', health: 100, maxHealth: 100, level: 4, avatar: '👁️' }
        ];

        return enemies[Math.floor(Math.random() * enemies.length)];
    }

    // Auto-scroll toggle
    static toggleAutoScroll() {
        this.autoScroll = !this.autoScroll;
        const btn = this.window.querySelector('#auto-scroll-btn');
        btn.innerHTML = this.autoScroll ? '<i class="fas fa-pause"></i> Auto' : '<i class="fas fa-play"></i> Auto';
    }

    static onClose(windowElement) {
        // Save game on close
        this.saveGame();
        return true;
    }
}

// Combat System
class CombatSystem {
    executeAction(action, player, enemy) {
        const result = {
            playerHealth: player.health,
            enemyHealth: enemy.health,
            playerAction: '',
            enemyAction: ''
        };

        // Player action
        switch (action) {
            case 'attack':
                const damage = Math.floor(Math.random() * 20) + player.stats.strength;
                result.enemyHealth = Math.max(0, enemy.health - damage);
                result.playerAction = `⚔️ You attack for ${damage} damage!`;
                break;

            case 'defend':
                result.playerAction = `🛡️ You take a defensive stance`;
                player.defending = true;
                break;

            case 'hack':
                if (player.energy >= 20) {
                    const hackDamage = Math.floor(Math.random() * 30) + player.stats.tech;
                    result.enemyHealth = Math.max(0, enemy.health - hackDamage);
                    result.playerAction = `💻 Hack attack for ${hackDamage} damage!`;
                    player.energy -= 20;
                } else {
                    result.playerAction = `⚡ Not enough energy to hack`;
                }
                break;

            case 'run':
                if (Math.random() < 0.7) {
                    result.playerAction = `🏃 You successfully escape!`;
                    return { ...result, escaped: true };
                } else {
                    result.playerAction = `❌ Escape failed!`;
                }
                break;
        }

        // Enemy action (if still alive)
        if (result.enemyHealth > 0) {
            const enemyDamage = Math.floor(Math.random() * 15) + enemy.level * 3;
            const actualDamage = player.defending ? Math.floor(enemyDamage / 2) : enemyDamage;

            result.playerHealth = Math.max(0, player.health - actualDamage);
            result.enemyAction = `🗡️ ${enemy.name} attacks for ${actualDamage} damage!`;
        }

        player.defending = false;
        return result;
    }
}

// Trade System
class TradeSystem {
    generateMerchant() {
        const merchants = [
            {
                name: 'Ripperdoc Kate',
                avatar: '👩‍⚕️',
                greeting: 'Need some chrome installed, choom?',
                inventory: [
                    { id: 'stimpak', name: 'Stim Pack', icon: '💉', price: 75, type: 'consumable' },
                    { id: 'neural-boost', name: 'Neural Boost', icon: '🧠', price: 500, type: 'upgrade' }
                ]
            },
            {
                name: 'Tech Vendor Zion',
                avatar: '🤖',
                greeting: 'Fresh off the assembly line!',
                inventory: [
                    { id: 'datachip', name: 'Data Chip', icon: '💾', price: 100, type: 'valuable' },
                    { id: 'scanner', name: 'Bio Scanner', icon: '📱', price: 300, type: 'tool' }
                ]
            }
        ];

        return merchants[Math.floor(Math.random() * merchants.length)];
    }
}

// Story Generator
class StoryGenerator {
    generateRandomScene() {
        const scenes = [
            {
                description: "A neon-lit alleyway stretches before you, filled with the sounds of illegal street racing and distant gunfire.",
                location: {
                    id: 'street-racing-alley',
                    name: 'Underground Racing Circuit',
                    background: 'nightclub'
                },
                characters: [
                    {
                        name: 'Street Racer Echo',
                        dialogue: 'You looking to make some quick creds? I got a job that needs someone with your... skills.'
                    }
                ],
                actions: [
                    {
                        icon: '🏎️',
                        text: 'Accept the racing job',
                        type: 'discovery',
                        outcome: 'You rev up a stolen corporate vehicle...',
                        discovery: 'Illegal racing circuits fund anti-corporate resistance'
                    },
                    {
                        icon: '🚶',
                        text: 'Walk away',
                        type: 'move',
                        outcome: 'You decide this isn\'t worth the risk...'
                    }
                ]
            },
            {
                description: "Corporate security drones patrol the pristine towers above while you navigate the undercity tunnels.",
                location: {
                    id: 'corporate-undercity',
                    name: 'Corporate Underground',
                    background: 'underground'
                },
                characters: [
                    {
                        name: 'Tunnel Rat Specter',
                        dialogue: 'The corps think they own everything above ground... but down here, we make our own rules.'
                    }
                ],
                actions: [
                    {
                        icon: '⚔️',
                        text: 'Fight security drones',
                        type: 'combat',
                        enemy: {
                            name: 'Security Drone',
                            health: 70,
                            maxHealth: 70,
                            level: 2,
                            avatar: '🤖'
                        }
                    },
                    {
                        icon: '🤝',
                        text: 'Trade with Specter',
                        type: 'trade',
                        merchant: {
                            name: 'Tunnel Rat Specter',
                            avatar: '🐀',
                            greeting: 'I got the goods if you got the creds.',
                            inventory: [
                                { id: 'tunnel-map', name: 'Tunnel Map', icon: '🗺️', price: 150, type: 'tool' },
                                { id: 'scrap-metal', name: 'Scrap Metal', icon: '🔩', price: 25, type: 'material' }
                            ]
                        }
                    }
                ]
            },
            {
                description: "The wasteland stretches endlessly, dotted with the ruins of the old world and the twisted metal of corporate wars.",
                location: {
                    id: 'cyber-wasteland',
                    name: 'Digital Wasteland',
                    background: 'wasteland'
                },
                characters: [
                    {
                        name: 'Nomad Chief Vortex',
                        dialogue: 'The old world burned, but we survived. The corps fear us because we remember what they destroyed.'
                    }
                ],
                discovery: 'Ancient servers still hum with pre-war data in these ruins',
                actions: [
                    {
                        icon: '🔍',
                        text: 'Search the ruins',
                        type: 'discovery',
                        outcome: 'You uncover a cache of pre-war technology...',
                        discovery: 'Pre-war AI fragments still exist in abandoned data centers'
                    },
                    {
                        icon: '💬',
                        text: 'Speak with the Nomad Chief',
                        type: 'discovery',
                        outcome: 'Vortex shares ancient knowledge of the corporate wars...',
                        discovery: 'The Great Data War of 2067 was started by competing AIs'
                    }
                ]
            }
        ];

        return scenes[Math.floor(Math.random() * scenes.length)];
    }
}

window.NeonShadows = NeonShadows;