/**
 * APP_METADATA
 * @name Text Adventure
 * @icon fas fa-book-open
 * @description Interactive fiction and text-based adventure games
 * @category Games
 * @version 2.0.0
 * @author EmberFrame Team
 * @enabled true
 */

class TextAdventure {
    static createWindow() {
        return {
            title: 'Text Adventure - Interactive Fiction',
            width: '900px',
            height: '700px',
            autoSize: false,
            content: `
                <div class="text-adventure">
                    <div class="adventure-header">
                        <div class="header-left">
                            <h2>📖 Text Adventure</h2>
                            <div class="game-info">
                                <span id="ta-current-game">No Game Loaded</span>
                                <span id="ta-player-status"></span>
                            </div>
                        </div>
                        <div class="header-controls">
                            <button onclick="TextAdventure.showGameMenu()" class="btn btn-primary">
                                <i class="fas fa-gamepad"></i> Games
                            </button>
                            <button onclick="TextAdventure.showInventory()" class="btn btn-secondary">
                                <i class="fas fa-backpack"></i> Inventory
                            </button>
                            <button onclick="TextAdventure.showHelp()" class="btn btn-info">
                                <i class="fas fa-question-circle"></i> Help
                            </button>
                            <button onclick="TextAdventure.showSettings()" class="btn btn-dark">
                                <i class="fas fa-cog"></i> Settings
                            </button>
                        </div>
                    </div>

                    <div class="adventure-main">
                        <div class="story-panel">
                            <div class="story-output" id="ta-story-output">
                                <div class="welcome-message">
                                    <h3>🌟 Welcome to Text Adventure! 🌟</h3>
                                    <p>Experience immersive interactive fiction where your choices shape the story.</p>
                                    <p>Choose a game from the menu to begin your adventure, or continue from where you left off.</p>
                                    <div class="quick-start">
                                        <button onclick="TextAdventure.startGame('dragon-quest')" class="quick-game-btn">
                                            🐉 Dragon's Quest (Beginner)
                                        </button>
                                        <button onclick="TextAdventure.startGame('space-station')" class="quick-game-btn">
                                            🚀 Space Station Alpha (Intermediate)
                                        </button>
                                        <button onclick="TextAdventure.startGame('mystery-mansion')" class="quick-game-btn">
                                            🏚️ Mystery Mansion (Advanced)
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="input-area">
                                <div class="input-group">
                                    <span class="input-prompt">></span>
                                    <input type="text" id="ta-command-input" placeholder="Enter command..." disabled>
                                    <button onclick="TextAdventure.processCommand()" id="ta-submit-btn" disabled>
                                        <i class="fas fa-arrow-right"></i>
                                    </button>
                                </div>
                                <div class="quick-commands" id="ta-quick-commands">
                                    <!-- Quick action buttons will appear here -->
                                </div>
                            </div>
                        </div>

                        <div class="side-panel">
                            <div class="stats-panel">
                                <h4>📊 Character Stats</h4>
                                <div class="stat-bars" id="ta-stats">
                                    <div class="stat-item">
                                        <label>Health</label>
                                        <div class="stat-bar">
                                            <div class="stat-fill health" id="ta-health-bar" style="width: 100%"></div>
                                            <span class="stat-text" id="ta-health-text">100/100</span>
                                        </div>
                                    </div>
                                    <div class="stat-item">
                                        <label>Energy</label>
                                        <div class="stat-bar">
                                            <div class="stat-fill energy" id="ta-energy-bar" style="width: 100%"></div>
                                            <span class="stat-text" id="ta-energy-text">100/100</span>
                                        </div>
                                    </div>
                                    <div class="stat-item">
                                        <label>Experience</label>
                                        <div class="stat-bar">
                                            <div class="stat-fill experience" id="ta-exp-bar" style="width: 0%"></div>
                                            <span class="stat-text" id="ta-exp-text">0/100</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="location-panel">
                                <h4>📍 Current Location</h4>
                                <div class="location-info">
                                    <div class="location-name" id="ta-location">Unknown</div>
                                    <div class="location-exits" id="ta-exits">No exits available</div>
                                </div>
                            </div>

                            <div class="quick-inventory">
                                <h4>🎒 Quick Inventory</h4>
                                <div class="inventory-slots" id="ta-quick-inventory">
                                    <div class="inventory-slot empty">Empty</div>
                                    <div class="inventory-slot empty">Empty</div>
                                    <div class="inventory-slot empty">Empty</div>
                                    <div class="inventory-slot empty">Empty</div>
                                </div>
                            </div>

                            <div class="achievements-panel">
                                <h4>🏆 Recent Achievements</h4>
                                <div class="achievement-list" id="ta-achievements">
                                    <div class="no-achievements">No achievements yet</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Game Selection Modal -->
                <div class="modal" id="ta-game-modal">
                    <div class="modal-content large">
                        <div class="modal-header">
                            <h3>🎮 Choose Your Adventure</h3>
                            <button class="modal-close" onclick="TextAdventure.closeModal('ta-game-modal')">&times;</button>
                        </div>
                        <div class="modal-body">
                            <div class="game-grid">
                                <div class="game-card" onclick="TextAdventure.startGame('dragon-quest')">
                                    <div class="game-icon">🐉</div>
                                    <div class="game-title">Dragon's Quest</div>
                                    <div class="game-difficulty beginner">Beginner</div>
                                    <div class="game-description">
                                        A classic fantasy adventure where you must rescue the kingdom from an ancient dragon.
                                        Perfect for newcomers to text adventures.
                                    </div>
                                    <div class="game-features">
                                        <span class="feature">🗡️ Combat</span>
                                        <span class="feature">🏰 Exploration</span>
                                        <span class="feature">⚡ Magic</span>
                                    </div>
                                </div>

                                <div class="game-card" onclick="TextAdventure.startGame('space-station')">
                                    <div class="game-icon">🚀</div>
                                    <div class="game-title">Space Station Alpha</div>
                                    <div class="game-difficulty intermediate">Intermediate</div>
                                    <div class="game-description">
                                        You're alone on a space station with failing life support. Solve puzzles and survive 
                                        in this sci-fi thriller.
                                    </div>
                                    <div class="game-features">
                                        <span class="feature">🧩 Puzzles</span>
                                        <span class="feature">🔬 Science</span>
                                        <span class="feature">⚠️ Survival</span>
                                    </div>
                                </div>

                                <div class="game-card" onclick="TextAdventure.startGame('mystery-mansion')">
                                    <div class="game-icon">🏚️</div>
                                    <div class="game-title">Mystery Mansion</div>
                                    <div class="game-difficulty advanced">Advanced</div>
                                    <div class="game-description">
                                        A complex murder mystery in a Victorian mansion. Use deduction and investigation 
                                        skills to solve the case.
                                    </div>
                                    <div class="game-features">
                                        <span class="feature">🔍 Investigation</span>
                                        <span class="feature">🧠 Logic</span>
                                        <span class="feature">👻 Mystery</span>
                                    </div>
                                </div>

                                <div class="game-card" onclick="TextAdventure.startGame('pirate-adventure')">
                                    <div class="game-icon">🏴‍☠️</div>
                                    <div class="game-title">Pirate's Treasure</div>
                                    <div class="game-difficulty intermediate">Intermediate</div>
                                    <div class="game-description">
                                        Set sail on the high seas to find buried treasure. Navigate, fight, and explore 
                                        tropical islands.
                                    </div>
                                    <div class="game-features">
                                        <span class="feature">⛵ Navigation</span>
                                        <span class="feature">💰 Treasure</span>
                                        <span class="feature">🌊 Adventure</span>
                                    </div>
                                </div>

                                <div class="game-card" onclick="TextAdventure.startGame('cyberpunk-city')">
                                    <div class="game-icon">🤖</div>
                                    <div class="game-title">Neon Shadows</div>
                                    <div class="game-difficulty advanced">Advanced</div>
                                    <div class="game-description">
                                        Navigate a cyberpunk city as a hacker trying to uncover a corporate conspiracy. 
                                        Multiple paths and endings.
                                    </div>
                                    <div class="game-features">
                                        <span class="feature">💻 Hacking</span>
                                        <span class="feature">🌃 Cyberpunk</span>
                                        <span class="feature">🔀 Multiple Paths</span>
                                    </div>
                                </div>

                                <div class="game-card coming-soon">
                                    <div class="game-icon">🎭</div>
                                    <div class="game-title">Custom Adventure</div>
                                    <div class="game-difficulty custom">Custom</div>
                                    <div class="game-description">
                                        Create your own text adventure using our built-in story editor. 
                                        Share your creations with other players.
                                    </div>
                                    <div class="coming-soon-badge">Coming Soon</div>
                                </div>
                            </div>

                            <div class="saved-games">
                                <h4>💾 Saved Games</h4>
                                <div class="saved-game-list" id="ta-saved-games">
                                    <!-- Saved games will be populated here -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Inventory Modal -->
                <div class="modal" id="ta-inventory-modal">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3>🎒 Inventory</h3>
                            <button class="modal-close" onclick="TextAdventure.closeModal('ta-inventory-modal')">&times;</button>
                        </div>
                        <div class="modal-body">
                            <div class="inventory-grid" id="ta-full-inventory">
                                <!-- Inventory items will be populated here -->
                            </div>
                            <div class="inventory-info">
                                <p>Carrying: <span id="ta-inventory-count">0</span> / <span id="ta-inventory-limit">20</span> items</p>
                                <p>Total Weight: <span id="ta-inventory-weight">0</span> kg</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Help Modal -->
                <div class="modal" id="ta-help-modal">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3>❓ Help & Commands</h3>
                            <button class="modal-close" onclick="TextAdventure.closeModal('ta-help-modal')">&times;</button>
                        </div>
                        <div class="modal-body">
                            <div class="help-content">
                                <div class="help-section">
                                    <h4>🎯 Basic Commands</h4>
                                    <div class="command-list">
                                        <div class="command-item">
                                            <code>look</code> or <code>l</code> - Look around your current location
                                        </div>
                                        <div class="command-item">
                                            <code>go [direction]</code> or <code>[direction]</code> - Move in a direction (north, south, east, west, up, down)
                                        </div>
                                        <div class="command-item">
                                            <code>take [item]</code> or <code>get [item]</code> - Pick up an item
                                        </div>
                                        <div class="command-item">
                                            <code>drop [item]</code> - Drop an item from your inventory
                                        </div>
                                        <div class="command-item">
                                            <code>use [item]</code> - Use an item from your inventory
                                        </div>
                                        <div class="command-item">
                                            <code>inventory</code> or <code>i</code> - Show your inventory
                                        </div>
                                    </div>
                                </div>

                                <div class="help-section">
                                    <h4>⚔️ Combat Commands</h4>
                                    <div class="command-list">
                                        <div class="command-item">
                                            <code>attack [target]</code> or <code>fight [target]</code> - Attack an enemy
                                        </div>
                                        <div class="command-item">
                                            <code>defend</code> or <code>block</code> - Defend against attacks
                                        </div>
                                        <div class="command-item">
                                            <code>cast [spell]</code> - Cast a magic spell
                                        </div>
                                        <div class="command-item">
                                            <code>flee</code> or <code>run</code> - Escape from combat
                                        </div>
                                    </div>
                                </div>

                                <div class="help-section">
                                    <h4>💬 Interaction Commands</h4>
                                    <div class="command-list">
                                        <div class="command-item">
                                            <code>talk to [character]</code> - Speak with characters
                                        </div>
                                        <div class="command-item">
                                            <code>examine [object]</code> or <code>x [object]</code> - Examine something closely
                                        </div>
                                        <div class="command-item">
                                            <code>open [object]</code> - Open doors, chests, etc.
                                        </div>
                                        <div class="command-item">
                                            <code>close [object]</code> - Close doors, containers, etc.
                                        </div>
                                    </div>
                                </div>

                                <div class="help-section">
                                    <h4>🎮 Game Commands</h4>
                                    <div class="command-list">
                                        <div class="command-item">
                                            <code>save</code> - Save your current game progress
                                        </div>
                                        <div class="command-item">
                                            <code>load</code> - Load a previously saved game
                                        </div>
                                        <div class="command-item">
                                            <code>quit</code> or <code>exit</code> - Exit the current game
                                        </div>
                                        <div class="command-item">
                                            <code>help</code> - Show this help information
                                        </div>
                                        <div class="command-item">
                                            <code>score</code> - Show your current score and achievements
                                        </div>
                                    </div>
                                </div>

                                <div class="help-section">
                                    <h4>💡 Tips</h4>
                                    <ul>
                                        <li>Type commands in natural language - the game understands many variations</li>
                                        <li>Use the quick action buttons for common commands</li>
                                        <li>Save frequently to avoid losing progress</li>
                                        <li>Examine everything - details matter in text adventures</li>
                                        <li>Keep notes about important information and locations</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Settings Modal -->
                <div class="modal" id="ta-settings-modal">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3>⚙️ Settings</h3>
                            <button class="modal-close" onclick="TextAdventure.closeModal('ta-settings-modal')">&times;</button>
                        </div>
                        <div class="modal-body">
                            <div class="settings-grid">
                                <div class="setting-group">
                                    <h4>🎨 Display</h4>
                                    <div class="setting-item">
                                        <label>Text Size</label>
                                        <select id="ta-text-size" onchange="TextAdventure.updateSetting('textSize', this.value)">
                                            <option value="small">Small</option>
                                            <option value="medium" selected>Medium</option>
                                            <option value="large">Large</option>
                                        </select>
                                    </div>
                                    <div class="setting-item">
                                        <label>Theme</label>
                                        <select id="ta-theme" onchange="TextAdventure.updateSetting('theme', this.value)">
                                            <option value="default" selected>Default</option>
                                            <option value="dark">Dark</option>
                                            <option value="retro">Retro Terminal</option>
                                            <option value="parchment">Parchment</option>
                                        </select>
                                    </div>
                                    <div class="setting-item">
                                        <label>
                                            <input type="checkbox" id="ta-auto-scroll" checked onchange="TextAdventure.updateSetting('autoScroll', this.checked)">
                                            Auto-scroll to new text
                                        </label>
                                    </div>
                                </div>

                                <div class="setting-group">
                                    <h4>🎯 Gameplay</h4>
                                    <div class="setting-item">
                                        <label>
                                            <input type="checkbox" id="ta-quick-commands" checked onchange="TextAdventure.updateSetting('quickCommands', this.checked)">
                                            Show quick command buttons
                                        </label>
                                    </div>
                                    <div class="setting-item">
                                        <label>
                                            <input type="checkbox" id="ta-hints" checked onchange="TextAdventure.updateSetting('hints', this.checked)">
                                            Show helpful hints
                                        </label>
                                    </div>
                                    <div class="setting-item">
                                        <label>
                                            <input type="checkbox" id="ta-auto-save" checked onchange="TextAdventure.updateSetting('autoSave', this.checked)">
                                            Auto-save progress
                                        </label>
                                    </div>
                                    <div class="setting-item">
                                        <label>Difficulty</label>
                                        <select id="ta-difficulty" onchange="TextAdventure.updateSetting('difficulty', this.value)">
                                            <option value="easy">Easy</option>
                                            <option value="normal" selected>Normal</option>
                                            <option value="hard">Hard</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="setting-group">
                                    <h4>🔊 Audio</h4>
                                    <div class="setting-item">
                                        <label>
                                            <input type="checkbox" id="ta-sound-effects" checked onchange="TextAdventure.updateSetting('soundEffects', this.checked)">
                                            Sound effects
                                        </label>
                                    </div>
                                    <div class="setting-item">
                                        <label>
                                            <input type="checkbox" id="ta-ambient-sounds" onchange="TextAdventure.updateSetting('ambientSounds', this.checked)">
                                            Ambient sounds
                                        </label>
                                    </div>
                                    <div class="setting-item">
                                        <label>Volume</label>
                                        <input type="range" id="ta-volume" min="0" max="100" value="50" onchange="TextAdventure.updateSetting('volume', this.value)">
                                    </div>
                                </div>
                            </div>

                            <div class="settings-actions">
                                <button class="btn btn-secondary" onclick="TextAdventure.resetSettings()">
                                    Reset to Defaults
                                </button>
                                <button class="btn btn-primary" onclick="TextAdventure.exportSettings()">
                                    Export Settings
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                ${TextAdventure.getStyles()}
            `,
            onInit: (windowElement) => {
                TextAdventure.init(windowElement);
            }
        };
    }

    static getStyles() {
        return `
            <style>
                .text-adventure {
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                    font-family: 'Segoe UI', system-ui, sans-serif;
                    color: #2c3e50;
                }

                .adventure-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 20px 25px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border-bottom: 3px solid #5a67d8;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
                }

                .header-left h2 {
                    margin: 0 0 8px 0;
                    font-size: 24px;
                    font-weight: 700;
                    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
                }

                .game-info {
                    display: flex;
                    gap: 20px;
                    font-size: 14px;
                    opacity: 0.9;
                }

                .header-controls {
                    display: flex;
                    gap: 12px;
                    flex-wrap: wrap;
                }

                .btn {
                    padding: 10px 18px;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: 600;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 16px rgba(0,0,0,0.2);
                }

                .btn-primary { background: linear-gradient(135deg, #667eea, #764ba2); color: white; }
                .btn-secondary { background: linear-gradient(135deg, #a0aec0, #718096); color: white; }
                .btn-info { background: linear-gradient(135deg, #4fd1c7, #3182ce); color: white; }
                .btn-dark { background: linear-gradient(135deg, #2d3748, #1a202c); color: white; }

                .adventure-main {
                    flex: 1;
                    display: flex;
                    overflow: hidden;
                }

                .story-panel {
                    flex: 2;
                    display: flex;
                    flex-direction: column;
                    border-right: 1px solid #e2e8f0;
                }

                .story-output {
                    flex: 1;
                    padding: 25px;
                    overflow-y: auto;
                    background: white;
                    line-height: 1.7;
                    font-size: 16px;
                }

                .welcome-message {
                    text-align: center;
                    padding: 40px 20px;
                    color: #4a5568;
                }

                .welcome-message h3 {
                    color: #667eea;
                    margin-bottom: 20px;
                    font-size: 28px;
                }

                .quick-start {
                    margin-top: 30px;
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                    max-width: 400px;
                    margin-left: auto;
                    margin-right: auto;
                }

                .quick-game-btn {
                    padding: 15px 25px;
                    background: linear-gradient(135deg, #f7fafc, #edf2f7);
                    border: 2px solid #e2e8f0;
                    border-radius: 12px;
                    cursor: pointer;
                    font-size: 16px;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    text-align: left;
                }

                .quick-game-btn:hover {
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    color: white;
                    border-color: #667eea;
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
                }

                .story-text {
                    margin-bottom: 20px;
                    padding: 15px 20px;
                    background: #f8f9fa;
                    border-left: 4px solid #667eea;
                    border-radius: 0 8px 8px 0;
                    animation: fadeInUp 0.5s ease-out;
                }

                .command-text {
                    color: #667eea;
                    font-weight: 600;
                    margin-bottom: 10px;
                    font-family: 'Courier New', monospace;
                }

                .error-text {
                    color: #e53e3e;
                    font-weight: 600;
                    background: #fed7d7;
                    padding: 10px 15px;
                    border-radius: 6px;
                    border-left: 4px solid #e53e3e;
                }

                .input-area {
                    padding: 20px 25px;
                    background: #f8f9fa;
                    border-top: 1px solid #e2e8f0;
                }

                .input-group {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 15px;
                }

                .input-prompt {
                    font-family: 'Courier New', monospace;
                    font-weight: bold;
                    color: #667eea;
                    font-size: 18px;
                }

                #ta-command-input {
                    flex: 1;
                    padding: 12px 16px;
                    border: 2px solid #e2e8f0;
                    border-radius: 8px;
                    font-size: 16px;
                    font-family: 'Courier New', monospace;
                    transition: all 0.3s ease;
                }

                #ta-command-input:focus {
                    outline: none;
                    border-color: #667eea;
                    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
                }

                #ta-submit-btn {
                    padding: 12px 16px;
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    color: white;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                #ta-submit-btn:hover:not(:disabled) {
                    transform: scale(1.05);
                }

                .quick-commands {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                }

                .quick-cmd-btn {
                    padding: 6px 12px;
                    background: #e2e8f0;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 12px;
                    transition: all 0.2s ease;
                    text-transform: uppercase;
                    font-weight: 600;
                }

                .quick-cmd-btn:hover {
                    background: #667eea;
                    color: white;
                }

                .side-panel {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    background: #f8f9fa;
                    padding: 20px;
                    gap: 20px;
                    overflow-y: auto;
                    min-width: 280px;
                }

                .stats-panel,
                .location-panel,
                .quick-inventory,
                .achievements-panel {
                    background: white;
                    padding: 20px;
                    border-radius: 12px;
                    border: 1px solid #e2e8f0;
                    box-shadow: 0 4px 16px rgba(0,0,0,0.05);
                }

                .stats-panel h4,
                .location-panel h4,
                .quick-inventory h4,
                .achievements-panel h4 {
                    margin: 0 0 15px 0;
                    color: #2d3748;
                    font-size: 16px;
                    font-weight: 700;
                    border-bottom: 2px solid #e2e8f0;
                    padding-bottom: 10px;
                }

                .stat-item {
                    margin-bottom: 15px;
                }

                .stat-item label {
                    display: block;
                    margin-bottom: 6px;
                    font-weight: 600;
                    color: #4a5568;
                    font-size: 14px;
                }

                .stat-bar {
                    position: relative;
                    height: 20px;
                    background: #e2e8f0;
                    border-radius: 10px;
                    overflow: hidden;
                }

                .stat-fill {
                    height: 100%;
                    border-radius: 10px;
                    transition: width 0.5s ease;
                    position: relative;
                }

                .stat-fill.health { background: linear-gradient(90deg, #48bb78, #38a169); }
                .stat-fill.energy { background: linear-gradient(90deg, #4299e1, #3182ce); }
                .stat-fill.experience { background: linear-gradient(90deg, #ed8936, #dd6b20); }

                .stat-text {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    font-size: 12px;
                    font-weight: 700;
                    color: white;
                    text-shadow: 0 1px 2px rgba(0,0,0,0.5);
                }

                .location-info {
                    text-align: center;
                }

                .location-name {
                    font-size: 18px;
                    font-weight: 700;
                    color: #667eea;
                    margin-bottom: 10px;
                }

                .location-exits {
                    font-size: 14px;
                    color: #4a5568;
                    line-height: 1.5;
                }

                .inventory-slots {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 10px;
                }

                .inventory-slot {
                    aspect-ratio: 1;
                    background: #f7fafc;
                    border: 2px dashed #cbd5e0;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 12px;
                    color: #a0aec0;
                    transition: all 0.3s ease;
                }

                .inventory-slot.filled {
                    background: linear-gradient(135deg, #e6fffa, #d6f5f5);
                    border-color: #38b2ac;
                    color: #2c7a7b;
                    font-weight: 600;
                }

                .achievement-list {
                    max-height: 150px;
                    overflow-y: auto;
                }

                .achievement-item {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 10px;
                    background: #f0fff4;
                    border: 1px solid #c6f6d5;
                    border-radius: 6px;
                    margin-bottom: 8px;
                    font-size: 14px;
                    animation: slideInRight 0.5s ease-out;
                }

                .no-achievements {
                    text-align: center;
                    color: #a0aec0;
                    font-style: italic;
                    font-size: 14px;
                }

                /* Modal Styles */
                .modal {
                    display: none;
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.6);
                    z-index: 10000;
                    backdrop-filter: blur(8px);
                }

                .modal.show {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .modal-content {
                    background: white;
                    border-radius: 16px;
                    width: 90%;
                    max-width: 600px;
                    max-height: 90vh;
                    overflow-y: auto;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                    animation: modalSlideIn 0.3s ease-out;
                }

                .modal-content.large {
                    max-width: 1000px;
                }

                .modal-header {
                    padding: 25px 30px;
                    border-bottom: 1px solid #e2e8f0;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background: linear-gradient(135deg, #f7fafc, #edf2f7);
                }

                .modal-header h3 {
                    margin: 0;
                    color: #2d3748;
                    font-size: 20px;
                    font-weight: 700;
                }

                .modal-close {
                    background: none;
                    border: none;
                    font-size: 28px;
                    cursor: pointer;
                    color: #a0aec0;
                    transition: color 0.3s ease;
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                }

                .modal-close:hover {
                    color: #fc8181;
                    background: rgba(252, 129, 129, 0.1);
                }

                .modal-body {
                    padding: 30px;
                }

                /* Game Selection Grid */
                .game-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 20px;
                    margin-bottom: 30px;
                }

                .game-card {
                    background: white;
                    border: 2px solid #e2e8f0;
                    border-radius: 16px;
                    padding: 25px;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                    overflow: hidden;
                }

                .game-card:hover {
                    border-color: #667eea;
                    transform: translateY(-5px);
                    box-shadow: 0 12px 30px rgba(102, 126, 234, 0.2);
                }

                .game-card.coming-soon {
                    opacity: 0.6;
                    cursor: not-allowed;
                }

                .game-card.coming-soon:hover {
                    transform: none;
                    border-color: #e2e8f0;
                    box-shadow: none;
                }

                .game-icon {
                    font-size: 48px;
                    text-align: center;
                    margin-bottom: 15px;
                }

                .game-title {
                    font-size: 20px;
                    font-weight: 700;
                    color: #2d3748;
                    margin-bottom: 10px;
                    text-align: center;
                }

                .game-difficulty {
                    display: inline-block;
                    padding: 4px 12px;
                    border-radius: 20px;
                    font-size: 12px;
                    font-weight: 600;
                    text-transform: uppercase;
                    margin-bottom: 15px;
                }

                .game-difficulty.beginner { background: #c6f6d5; color: #22543d; }
                .game-difficulty.intermediate { background: #fef5e7; color: #7b341e; }
                .game-difficulty.advanced { background: #fed7d7; color: #742a2a; }
                .game-difficulty.custom { background: #e9d8fd; color: #553c9a; }

                .game-description {
                    font-size: 14px;
                    color: #4a5568;
                    line-height: 1.6;
                    margin-bottom: 15px;
                }

                .game-features {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                }

                .feature {
                    background: #f7fafc;
                    color: #4a5568;
                    padding: 4px 8px;
                    border-radius: 12px;
                    font-size: 12px;
                    font-weight: 500;
                }

                .coming-soon-badge {
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    background: #667eea;
                    color: white;
                    padding: 6px 12px;
                    border-radius: 20px;
                    font-size: 11px;
                    font-weight: 600;
                    text-transform: uppercase;
                }

                /* Settings Styles */
                .settings-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 25px;
                    margin-bottom: 30px;
                }

                .setting-group {
                    background: #f8f9fa;
                    padding: 20px;
                    border-radius: 12px;
                    border: 1px solid #e2e8f0;
                }

                .setting-group h4 {
                    margin: 0 0 20px 0;
                    color: #2d3748;
                    font-size: 16px;
                    font-weight: 700;
                    border-bottom: 2px solid #e2e8f0;
                    padding-bottom: 10px;
                }

                .setting-item {
                    margin-bottom: 15px;
                }

                .setting-item label {
                    display: block;
                    margin-bottom: 6px;
                    font-weight: 600;
                    color: #4a5568;
                    font-size: 14px;
                }

                .setting-item select,
                .setting-item input[type="range"] {
                    width: 100%;
                    padding: 8px 12px;
                    border: 2px solid #e2e8f0;
                    border-radius: 6px;
                    font-size: 14px;
                    transition: border-color 0.3s ease;
                }

                .setting-item select:focus,
                .setting-item input:focus {
                    outline: none;
                    border-color: #667eea;
                }

                .settings-actions {
                    display: flex;
                    gap: 15px;
                    justify-content: flex-end;
                    padding-top: 20px;
                    border-top: 2px solid #e2e8f0;
                }

                /* Command List Styles */
                .help-content {
                    max-height: 500px;
                    overflow-y: auto;
                }

                .help-section {
                    margin-bottom: 30px;
                }

                .help-section h4 {
                    color: #667eea;
                    margin-bottom: 15px;
                    font-size: 18px;
                    font-weight: 700;
                }

                .command-list {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .command-item {
                    display: flex;
                    align-items: flex-start;
                    gap: 12px;
                    padding: 12px;
                    background: #f8f9fa;
                    border-radius: 8px;
                    border-left: 4px solid #667eea;
                }

                .command-item code {
                    background: #e2e8f0;
                    padding: 2px 6px;
                    border-radius: 4px;
                    font-family: 'Courier New', monospace;
                    font-weight: 600;
                    color: #667eea;
                    white-space: nowrap;
                }

                /* Inventory Styles */
                .inventory-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
                    gap: 15px;
                    margin-bottom: 20px;
                }

                .inventory-item {
                    aspect-ratio: 1;
                    background: #f8f9fa;
                    border: 2px solid #e2e8f0;
                    border-radius: 12px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 10px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    text-align: center;
                }

                .inventory-item:hover {
                    border-color: #667eea;
                    background: #f7fafc;
                    transform: translateY(-2px);
                }

                .inventory-item.empty {
                    border-style: dashed;
                    color: #a0aec0;
                    cursor: default;
                }

                .inventory-item.empty:hover {
                    border-color: #e2e8f0;
                    background: #f8f9fa;
                    transform: none;
                }

                .item-icon {
                    font-size: 32px;
                    margin-bottom: 8px;
                }

                .item-name {
                    font-size: 12px;
                    font-weight: 600;
                    color: #4a5568;
                }

                .inventory-info {
                    text-align: center;
                    color: #6c757d;
                    font-size: 14px;
                    padding-top: 15px;
                    border-top: 1px solid #e2e8f0;
                }

                /* Saved Games */
                .saved-game-list {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    max-height: 200px;
                    overflow-y: auto;
                }

                .saved-game-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 12px 16px;
                    background: #f8f9fa;
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .saved-game-item:hover {
                    background: #e6fffa;
                    border-color: #38b2ac;
                }

                .saved-game-info {
                    flex: 1;
                }

                .saved-game-name {
                    font-weight: 600;
                    color: #2d3748;
                    margin-bottom: 4px;
                }

                .saved-game-meta {
                    font-size: 12px;
                    color: #6c757d;
                }

                .saved-game-actions {
                    display: flex;
                    gap: 8px;
                }

                /* Animations */
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes slideInRight {
                    from {
                        opacity: 0;
                        transform: translateX(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes modalSlideIn {
                    from {
                        opacity: 0;
                        transform: translateY(-50px) scale(0.9);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }

                /* Responsive Design */
                @media (max-width: 768px) {
                    .adventure-main {
                        flex-direction: column;
                    }

                    .side-panel {
                        order: -1;
                        flex: none;
                        min-height: 200px;
                    }

                    .story-panel {
                        flex: 1;
                    }

                    .header-controls {
                        flex-direction: column;
                        gap: 8px;
                    }

                    .game-grid {
                        grid-template-columns: 1fr;
                    }

                    .settings-grid {
                        grid-template-columns: 1fr;
                    }

                    .settings-actions {
                        flex-direction: column;
                    }
                }
            </style>
        `;
    }

    static init(windowElement) {
        this.currentWindow = windowElement;
        this.currentGame = null;
        this.gameState = {};
        this.settings = this.loadSettings();
        this.commandHistory = [];
        this.historyIndex = -1;

        this.setupEventListeners();
        this.applySettings();
        this.loadSavedGames();

        console.log('🎮 Text Adventure initialized');
    }

    static setupEventListeners() {
        const commandInput = this.currentWindow.querySelector('#ta-command-input');
        const submitBtn = this.currentWindow.querySelector('#ta-submit-btn');

        // Command input events
        commandInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.processCommand();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                this.navigateHistory(-1);
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                this.navigateHistory(1);
            }
        });

        // Submit button
        submitBtn.addEventListener('click', () => {
            this.processCommand();
        });

        // Focus input when clicking anywhere in the story output
        const storyOutput = this.currentWindow.querySelector('#ta-story-output');
        storyOutput.addEventListener('click', () => {
            commandInput.focus();
        });
    }

    static navigateHistory(direction) {
        if (this.commandHistory.length === 0) return;

        if (direction === -1) { // Up arrow
            if (this.historyIndex === -1) {
                this.historyIndex = this.commandHistory.length - 1;
            } else if (this.historyIndex > 0) {
                this.historyIndex--;
            }
        } else { // Down arrow
            if (this.historyIndex < this.commandHistory.length - 1) {
                this.historyIndex++;
            } else {
                this.historyIndex = -1;
            }
        }

        const commandInput = this.currentWindow.querySelector('#ta-command-input');
        if (this.historyIndex === -1) {
            commandInput.value = '';
        } else {
            commandInput.value = this.commandHistory[this.historyIndex];
        }
    }

    static processCommand() {
        const commandInput = this.currentWindow.querySelector('#ta-command-input');
        const command = commandInput.value.trim().toLowerCase();

        if (!command) return;

        // Add to history
        this.commandHistory.push(command);
        if (this.commandHistory.length > 50) {
            this.commandHistory.shift();
        }
        this.historyIndex = -1;

        // Display command
        this.addToStory(`> ${command}`, 'command');

        // Clear input
        commandInput.value = '';

        // Process the command
        this.executeCommand(command);

        // Auto-save if enabled
        if (this.settings.autoSave && this.currentGame) {
            this.autoSave();
        }
    }

    static executeCommand(command) {
        if (!this.currentGame) {
            this.addToStory("No game is currently loaded. Please select a game first.", 'error');
            return;
        }

        // Parse command
        const words = command.split(' ').filter(word => word.length > 0);
        const verb = words[0];
        const object = words.slice(1).join(' ');

        // Handle common commands
        switch (verb) {
            case 'look':
            case 'l':
                this.lookAround();
                break;
            case 'go':
            case 'move':
                this.movePlayer(object);
                break;
            case 'north':
            case 'n':
                this.movePlayer('north');
                break;
            case 'south':
            case 's':
                this.movePlayer('south');
                break;
            case 'east':
            case 'e':
                this.movePlayer('east');
                break;
            case 'west':
            case 'w':
                this.movePlayer('west');
                break;
            case 'up':
            case 'u':
                this.movePlayer('up');
                break;
            case 'down':
            case 'd':
                this.movePlayer('down');
                break;
            case 'take':
            case 'get':
            case 'pick':
                this.takeItem(object);
                break;
            case 'drop':
                this.dropItem(object);
                break;
            case 'use':
                this.useItem(object);
                break;
            case 'inventory':
            case 'i':
                this.showInventoryInline();
                break;
            case 'examine':
            case 'x':
            case 'inspect':
                this.examineObject(object);
                break;
            case 'talk':
            case 'speak':
                this.talkTo(object);
                break;
            case 'attack':
            case 'fight':
            case 'kill':
                this.attackTarget(object);
                break;
            case 'help':
                this.showHelpInline();
                break;
            case 'save':
                this.saveGame();
                break;
            case 'load':
                this.showGameMenu();
                break;
            case 'quit':
            case 'exit':
                this.quitGame();
                break;
            case 'score':
                this.showScore();
                break;
            default:
                this.handleCustomCommand(command, verb, object);
        }

        this.updateQuickCommands();
        this.updateUI();
    }

    static handleCustomCommand(command, verb, object) {
        // Handle game-specific commands based on current game
        if (this.currentGame === 'dragon-quest') {
            this.handleDragonQuestCommand(command, verb, object);
        } else if (this.currentGame === 'space-station') {
            this.handleSpaceStationCommand(command, verb, object);
        } else if (this.currentGame === 'mystery-mansion') {
            this.handleMysteryMansionCommand(command, verb, object);
        } else {
            this.addToStory("I don't understand that command. Type 'help' for available commands.", 'error');
        }
    }

    // Game-specific implementations
    static startGame(gameId) {
        this.currentGame = gameId;
        this.gameState = this.getInitialGameState(gameId);

        this.closeModal('ta-game-modal');
        this.enableGameplay();
        this.updateGameInfo();

        // Clear story output and show game intro
        const storyOutput = this.currentWindow.querySelector('#ta-story-output');
        storyOutput.innerHTML = '';

        this.addToStory(this.getGameIntro(gameId), 'story');
        this.lookAround();
        this.updateUI();
        this.updateQuickCommands();

        console.log(`🎮 Started game: ${gameId}`);
    }

    static getInitialGameState(gameId) {
        const baseState = {
            health: 100,
            maxHealth: 100,
            energy: 100,
            maxEnergy: 100,
            experience: 0,
            level: 1,
            inventory: [],
            maxInventory: 20,
            currentLocation: '',
            visitedLocations: new Set(),
            gameFlags: {},
            score: 0,
            achievements: []
        };

        switch (gameId) {
            case 'dragon-quest':
                return {
                    ...baseState,
                    currentLocation: 'village-square',
                    inventory: ['rusty-sword', 'health-potion'],
                    gameFlags: { hasMetWizard: false, dragonDefeated: false }
                };
            case 'space-station':
                return {
                    ...baseState,
                    currentLocation: 'cryo-bay',
                    inventory: ['space-suit', 'scanner'],
                    energy: 75, // Start with reduced energy
                    gameFlags: { oxygenLevel: 80, systemsOnline: false }
                };
            case 'mystery-mansion':
                return {
                    ...baseState,
                    currentLocation: 'mansion-entrance',
                    inventory: ['magnifying-glass', 'notebook'],
                    gameFlags: { cluesFound: 0, murdererRevealed: false }
                };
            default:
                return baseState;
        }
    }

    static getGameIntro(gameId) {
        const intros = {
            'dragon-quest': `
                🐉 **Welcome to Dragon's Quest** 🐉
                
                The ancient kingdom of Aethermoor is in peril. A fearsome dragon has awakened from its thousand-year slumber and now terrorizes the land. You are a brave adventurer, chosen by the village elders to embark on a quest to defeat the dragon and restore peace to the realm.
                
                Armed with nothing but a rusty sword and a health potion, you stand in the village square, ready to begin your epic journey. The fate of the kingdom rests in your hands.
                
                Good luck, hero!
            `,
            'space-station': `
                🚀 **Space Station Alpha** 🚀
                
                You awaken from cryogenic sleep aboard the deep space research station "Alpha." The emergency lights are flashing red, and the ship's AI is no longer responding. Something has gone terribly wrong.
                
                As you stumble out of the cryo-pod, you notice that all the other pods are empty. Where is the rest of the crew? The station's life support systems are failing, and you have limited time to figure out what happened and find a way to survive.
                
                Your space suit and scanner are your only companions in the vast emptiness of space.
            `,
            'mystery-mansion': `
                🏚️ **Mystery at Ravenscroft Mansion** 🏚️
                
                The year is 1924. You are a renowned detective, called to investigate a murder at the mysterious Ravenscroft Mansion. Lord Blackwood, the wealthy owner, has been found dead in his locked study under suspicious circumstances.
                
                The guests from last night's dinner party are still trapped in the mansion due to a terrible storm. One of them is a murderer, and it's up to you to uncover the truth before they strike again.
                
                Your magnifying glass and trusty notebook will help you gather clues and solve this perplexing mystery.
            `
        };

        return intros[gameId] || "Welcome to your adventure!";
    }

    // Game implementation methods
    static lookAround() {
        const location = this.getCurrentLocationData();
        if (!location) {
            this.addToStory("You find yourself in an unknown place.", 'story');
            return;
        }

        this.gameState.visitedLocations.add(this.gameState.currentLocation);

        let description = `**${location.name}**\n\n${location.description}`;

        if (location.items && location.items.length > 0) {
            description += '\n\nYou can see: ' + location.items.join(', ');
        }

        if (location.characters && location.characters.length > 0) {
            description += '\n\nPresent: ' + location.characters.join(', ');
        }

        this.addToStory(description, 'story');
        this.updateLocation(location);
    }

    static movePlayer(direction) {
        const location = this.getCurrentLocationData();
        if (!location || !location.exits) {
            this.addToStory("You can't go that way.", 'error');
            return;
        }

        const exit = location.exits[direction];
        if (!exit) {
            this.addToStory("You can't go that way.", 'error');
            return;
        }

        // Check if exit is blocked
        if (exit.blocked && !this.checkCondition(exit.requirement)) {
            this.addToStory(exit.blockedMessage || "The way is blocked.", 'error');
            return;
        }

        // Move to new location
        this.gameState.currentLocation = exit.to;
        this.gameState.energy = Math.max(0, this.gameState.energy - 5);

        this.addToStory(`You go ${direction}.`, 'story');
        this.lookAround();

        // Check for random encounters
        if (Math.random() < 0.1) {
            this.randomEncounter();
        }
    }

    static takeItem(itemName) {
        if (!itemName) {
            this.addToStory("Take what?", 'error');
            return;
        }

        const location = this.getCurrentLocationData();
        if (!location || !location.items) {
            this.addToStory("There's nothing here to take.", 'error');
            return;
        }

        const item = location.items.find(item =>
            item.toLowerCase().includes(itemName) || itemName.includes(item.toLowerCase())
        );

        if (!item) {
            this.addToStory(`You don't see a ${itemName} here.`, 'error');
            return;
        }

        if (this.gameState.inventory.length >= this.gameState.maxInventory) {
            this.addToStory("Your inventory is full!", 'error');
            return;
        }

        // Remove from location and add to inventory
        location.items = location.items.filter(i => i !== item);
        this.gameState.inventory.push(item);

        this.addToStory(`You take the ${item}.`, 'story');
        this.updateInventoryDisplay();
        this.gainExperience(5);
    }

    static dropItem(itemName) {
        if (!itemName) {
            this.addToStory("Drop what?", 'error');
            return;
        }

        const item = this.gameState.inventory.find(item =>
            item.toLowerCase().includes(itemName) || itemName.includes(item.toLowerCase())
        );

        if (!item) {
            this.addToStory(`You don't have a ${itemName}.`, 'error');
            return;
        }

        // Remove from inventory and add to location
        this.gameState.inventory = this.gameState.inventory.filter(i => i !== item);
        const location = this.getCurrentLocationData();
        if (location) {
            if (!location.items) location.items = [];
            location.items.push(item);
        }

        this.addToStory(`You drop the ${item}.`, 'story');
        this.updateInventoryDisplay();
    }

    static useItem(itemName) {
        if (!itemName) {
            this.addToStory("Use what?", 'error');
            return;
        }

        const item = this.gameState.inventory.find(item =>
            item.toLowerCase().includes(itemName) || itemName.includes(item.toLowerCase())
        );

        if (!item) {
            this.addToStory(`You don't have a ${itemName}.`, 'error');
            return;
        }

        // Handle item usage based on game and item type
        this.handleItemUse(item);
    }

    static handleItemUse(item) {
        switch (item) {
            case 'health-potion':
                const healAmount = Math.min(50, this.gameState.maxHealth - this.gameState.health);
                this.gameState.health += healAmount;
                this.gameState.inventory = this.gameState.inventory.filter(i => i !== item);
                this.addToStory(`You drink the health potion and restore ${healAmount} health.`, 'story');
                this.updateStats();
                break;
            case 'scanner':
                this.addToStory("The scanner beeps and displays: 'Life support at 45%. Multiple hull breaches detected.'", 'story');
                break;
            case 'magnifying-glass':
                this.addToStory("You examine the area more closely with your magnifying glass...", 'story');
                this.examineCurrentLocation();
                break;
            default:
                this.addToStory(`You can't use the ${item} right now.`, 'error');
        }
    }

    static examineObject(objectName) {
        if (!objectName) {
            this.addToStory("Examine what?", 'error');
            return;
        }

        // Check current location for examinable objects
        const location = this.getCurrentLocationData();
        const examineData = this.getExamineData(this.gameState.currentLocation, objectName);

        if (examineData) {
            this.addToStory(examineData, 'story');
            this.gainExperience(2);
        } else {
            this.addToStory(`You don't see anything special about the ${objectName}.`, 'error');
        }
    }

    static attackTarget(target) {
        if (!target) {
            this.addToStory("Attack what?", 'error');
            return;
        }

        // Simple combat system
        const enemy = this.getCurrentEnemy(target);
        if (!enemy) {
            this.addToStory(`There's no ${target} here to attack.`, 'error');
            return;
        }

        this.startCombat(enemy);
    }

    static startCombat(enemy) {
        this.addToStory(`You engage in combat with the ${enemy.name}!`, 'story');

        // Simple combat calculation
        const playerAttack = Math.floor(Math.random() * 20) + 10;
        const enemyAttack = Math.floor(Math.random() * 15) + 5;

        this.addToStory(`You deal ${playerAttack} damage to the ${enemy.name}!`, 'story');
        enemy.health -= playerAttack;

        if (enemy.health <= 0) {
            this.addToStory(`The ${enemy.name} is defeated!`, 'story');
            this.gainExperience(enemy.experience || 20);
            this.gameState.score += enemy.score || 100;

            // Add victory flag
            this.gameState.gameFlags[`defeated_${enemy.id}`] = true;

            // Check for game completion
            this.checkGameCompletion();
        } else {
            this.addToStory(`The ${enemy.name} attacks you for ${enemyAttack} damage!`, 'story');
            this.gameState.health = Math.max(0, this.gameState.health - enemyAttack);
            this.updateStats();

            if (this.gameState.health === 0) {
                this.gameOver();
            }
        }
    }

    static gameOver() {
        this.addToStory(`
            **GAME OVER**
            
            Your adventure has come to an end. Your final score was ${this.gameState.score} points.
            
            Would you like to try again?
        `, 'story');

        this.disableGameplay();
    }

    static checkGameCompletion() {
        // Check win conditions based on current game
        if (this.currentGame === 'dragon-quest' && this.gameState.gameFlags.defeated_dragon) {
            this.gameWon();
        }
        // Add other win conditions for different games
    }

    static gameWon() {
        this.addToStory(`
            **CONGRATULATIONS!**
            
            You have successfully completed your quest! The kingdom is saved and peace is restored to the land.
            
            Final Score: ${this.gameState.score} points
            Experience Gained: ${this.gameState.experience} XP
            
            Thank you for playing!
        `, 'story');

        this.addAchievement('Quest Complete', 'Complete your first adventure');
        this.disableGameplay();
    }

    // UI Update Methods
    static updateUI() {
        this.updateStats();
        this.updateLocation();
        this.updateInventoryDisplay();
    }

    static updateStats() {
        const healthBar = this.currentWindow.querySelector('#ta-health-bar');
        const healthText = this.currentWindow.querySelector('#ta-health-text');
        const energyBar = this.currentWindow.querySelector('#ta-energy-bar');
        const energyText = this.currentWindow.querySelector('#ta-energy-text');
        const expBar = this.currentWindow.querySelector('#ta-exp-bar');
        const expText = this.currentWindow.querySelector('#ta-exp-text');

        const healthPercent = (this.gameState.health / this.gameState.maxHealth) * 100;
        const energyPercent = (this.gameState.energy / this.gameState.maxEnergy) * 100;
        const expPercent = (this.gameState.experience % 100) / 100 * 100;

        healthBar.style.width = healthPercent + '%';
        healthText.textContent = `${this.gameState.health}/${this.gameState.maxHealth}`;

        energyBar.style.width = energyPercent + '%';
        energyText.textContent = `${this.gameState.energy}/${this.gameState.maxEnergy}`;

        expBar.style.width = expPercent + '%';
        expText.textContent = `${this.gameState.experience % 100}/100`;
    }

    static updateLocation(locationData = null) {
        const location = locationData || this.getCurrentLocationData();
        if (!location) return;

        const locationName = this.currentWindow.querySelector('#ta-location');
        const locationExits = this.currentWindow.querySelector('#ta-exits');

        locationName.textContent = location.name || 'Unknown';

        if (location.exits) {
            const exitList = Object.keys(location.exits).join(', ');
            locationExits.textContent = exitList ? `Exits: ${exitList}` : 'No exits';
        } else {
            locationExits.textContent = 'No exits';
        }
    }

    static updateInventoryDisplay() {
        const quickInventory = this.currentWindow.querySelector('#ta-quick-inventory');
        const slots = quickInventory.querySelectorAll('.inventory-slot');

        // Update quick inventory slots
        slots.forEach((slot, index) => {
            if (index < this.gameState.inventory.length) {
                const item = this.gameState.inventory[index];
                slot.textContent = this.formatItemName(item);
                slot.classList.remove('empty');
                slot.classList.add('filled');
            } else {
                slot.textContent = 'Empty';
                slot.classList.remove('filled');
                slot.classList.add('empty');
            }
        });
    }

    static updateQuickCommands() {
        const quickCommands = this.currentWindow.querySelector('#ta-quick-commands');
        if (!this.settings.quickCommands) {
            quickCommands.innerHTML = '';
            return;
        }

        const location = this.getCurrentLocationData();
        const commands = ['look'];

        // Add movement commands
        if (location && location.exits) {
            Object.keys(location.exits).forEach(direction => {
                commands.push(direction);
            });
        }

        // Add context-sensitive commands
        if (location && location.items && location.items.length > 0) {
            commands.push('take');
        }

        if (this.gameState.inventory.length > 0) {
            commands.push('inventory');
        }

        // Generate quick command buttons
        quickCommands.innerHTML = commands.map(cmd =>
            `<button class="quick-cmd-btn" onclick="TextAdventure.executeQuickCommand('${cmd}')">${cmd}</button>`
        ).join('');
    }

    static executeQuickCommand(command) {
        const commandInput = this.currentWindow.querySelector('#ta-command-input');
        commandInput.value = command;
        this.processCommand();
    }

    static updateGameInfo() {
        const currentGameElement = this.currentWindow.querySelector('#ta-current-game');
        const playerStatusElement = this.currentWindow.querySelector('#ta-player-status');

        if (this.currentGame) {
            const gameNames = {
                'dragon-quest': 'Dragon\'s Quest',
                'space-station': 'Space Station Alpha',
                'mystery-mansion': 'Mystery Mansion',
                'pirate-adventure': 'Pirate\'s Treasure',
                'cyberpunk-city': 'Neon Shadows'
            };

            currentGameElement.textContent = gameNames[this.currentGame] || this.currentGame;
            playerStatusElement.textContent = `Level ${this.gameState.level} • Score: ${this.gameState.score}`;
        } else {
            currentGameElement.textContent = 'No Game Loaded';
            playerStatusElement.textContent = '';
        }
    }

    // Modal and Menu Methods
    static showGameMenu() {
        this.loadSavedGames();
        this.showModal('ta-game-modal');
    }

    static showInventory() {
        this.populateFullInventory();
        this.showModal('ta-inventory-modal');
    }

    static showHelp() {
        this.showModal('ta-help-modal');
    }

    static showSettings() {
        this.populateSettings();
        this.showModal('ta-settings-modal');
    }

    static showModal(modalId) {
        const modal = this.currentWindow.querySelector(`#${modalId}`);
        modal.classList.add('show');
    }

    static closeModal(modalId) {
        const modal = this.currentWindow.querySelector(`#${modalId}`);
        modal.classList.remove('show');
    }

    // Game Data Methods
    static getCurrentLocationData() {
        return this.getLocationData(this.gameState.currentLocation);
    }

    static getLocationData(locationId) {
        // This would normally load from game data files
        // For now, return sample data based on game
        const locations = this.getGameLocations();
        return locations[locationId];
    }

    static getGameLocations() {
        if (this.currentGame === 'dragon-quest') {
            return {
                'village-square': {
                    name: 'Village Square',
                    description: 'A bustling village square with cobblestone streets. The village inn stands to the north, while a path leads east toward the forest.',
                    exits: {
                        north: { to: 'village-inn' },
                        east: { to: 'forest-path' }
                    },
                    items: ['wooden-shield'],
                    characters: ['village-elder', 'merchant']
                },
                'village-inn': {
                    name: 'The Prancing Pony Inn',
                    description: 'A cozy inn filled with the warm glow of firelight. The innkeeper serves ale and shares tales of adventure.',
                    exits: {
                        south: { to: 'village-square' }
                    },
                    items: ['health-potion'],
                    characters: ['innkeeper', 'traveling-bard']
                },
                'forest-path': {
                    name: 'Forest Path',
                    description: 'A winding path through dense woods. Strange sounds echo from deeper in the forest.',
                    exits: {
                        west: { to: 'village-square' },
                        north: { to: 'dragon-cave', blocked: true, requirement: 'hasKey', blockedMessage: 'The path is blocked by thorns. You need to find another way.' }
                    },
                    items: ['iron-key'],
                    characters: []
                }
            };
        }
        // Add other games' locations here
        return {};
    }

    // Utility Methods
    static addToStory(text, type = 'story') {
        const storyOutput = this.currentWindow.querySelector('#ta-story-output');
        const messageDiv = document.createElement('div');
        messageDiv.className = `${type}-text`;

        // Convert markdown-style bold text
        const formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        messageDiv.innerHTML = formattedText;

        storyOutput.appendChild(messageDiv);

        // Auto-scroll if enabled
        if (this.settings.autoScroll) {
            storyOutput.scrollTop = storyOutput.scrollHeight;
        }
    }

    static formatItemName(item) {
        return item.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }

    static gainExperience(amount) {
        this.gameState.experience += amount;

        // Check for level up
        const newLevel = Math.floor(this.gameState.experience / 100) + 1;
        if (newLevel > this.gameState.level) {
            this.gameState.level = newLevel;
            this.gameState.maxHealth += 10;
            this.gameState.maxEnergy += 10;
            this.gameState.health = this.gameState.maxHealth; // Full heal on level up
            this.gameState.energy = this.gameState.maxEnergy;

            this.addToStory(`🎉 Level Up! You are now level ${this.gameState.level}!`, 'story');
            this.addAchievement('Level Up', `Reach level ${this.gameState.level}`);
        }

        this.updateStats();
    }

    static addAchievement(title, description) {
        if (this.gameState.achievements.some(a => a.title === title)) return;

        this.gameState.achievements.push({
            title,
            description,
            timestamp: new Date().toISOString()
        });

        // Show in UI
        const achievementsList = this.currentWindow.querySelector('#ta-achievements');
        const achievementDiv = document.createElement('div');
        achievementDiv.className = 'achievement-item';
        achievementDiv.innerHTML = `
            <span>🏆</span>
            <div>
                <div style="font-weight: 600;">${title}</div>
                <div style="font-size: 12px; opacity: 0.8;">${description}</div>
            </div>
        `;

        // Remove "no achievements" message
        const noAchievements = achievementsList.querySelector('.no-achievements');
        if (noAchievements) {
            noAchievements.remove();
        }

        achievementsList.appendChild(achievementDiv);

        // Notification
        this.addToStory(`🏆 Achievement Unlocked: ${title}`, 'story');
    }

    static enableGameplay() {
        const commandInput = this.currentWindow.querySelector('#ta-command-input');
        const submitBtn = this.currentWindow.querySelector('#ta-submit-btn');

        commandInput.disabled = false;
        submitBtn.disabled = false;
        commandInput.focus();
    }

    static disableGameplay() {
        const commandInput = this.currentWindow.querySelector('#ta-command-input');
        const submitBtn = this.currentWindow.querySelector('#ta-submit-btn');

        commandInput.disabled = true;
        submitBtn.disabled = true;
    }

    // Settings Methods
    static loadSettings() {
        const defaultSettings = {
            textSize: 'medium',
            theme: 'default',
            autoScroll: true,
            quickCommands: true,
            hints: true,
            autoSave: true,
            difficulty: 'normal',
            soundEffects: true,
            ambientSounds: false,
            volume: 50
        };

        try {
            const saved = localStorage.getItem('textadventure-settings');
            return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
        } catch {
            return defaultSettings;
        }
    }

    static saveSettings() {
        try {
            localStorage.setItem('textadventure-settings', JSON.stringify(this.settings));
        } catch (error) {
            console.error('Failed to save settings:', error);
        }
    }

    static updateSetting(key, value) {
        this.settings[key] = value;
        this.saveSettings();
        this.applySettings();
    }

    static applySettings() {
        const storyOutput = this.currentWindow.querySelector('#ta-story-output');

        // Apply text size
        storyOutput.style.fontSize = {
            small: '14px',
            medium: '16px',
            large: '18px'
        }[this.settings.textSize] || '16px';

        // Apply theme
        this.applyTheme(this.settings.theme);

        // Update quick commands visibility
        this.updateQuickCommands();
    }

    static applyTheme(theme) {
        const storyOutput = this.currentWindow.querySelector('#ta-story-output');

        // Remove existing theme classes
        storyOutput.classList.remove('theme-dark', 'theme-retro', 'theme-parchment');

        // Apply new theme
        if (theme !== 'default') {
            storyOutput.classList.add(`theme-${theme}`);
        }
    }

    static resetSettings() {
        this.settings = this.loadSettings();
        this.populateSettings();
        this.applySettings();
    }

    static populateSettings() {
        Object.keys(this.settings).forEach(key => {
            const element = this.currentWindow.querySelector(`#ta-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`);
            if (element) {
                if (element.type === 'checkbox') {
                    element.checked = this.settings[key];
                } else {
                    element.value = this.settings[key];
                }
            }
        });
    }

    // Save/Load System
    static saveGame() {
        if (!this.currentGame) {
            this.addToStory("No game to save.", 'error');
            return;
        }

        const saveData = {
            game: this.currentGame,
            state: this.gameState,
            timestamp: new Date().toISOString(),
            version: '2.0.0'
        };

        try {
            const saves = this.getSavedGames();
            const saveId = `${this.currentGame}-${Date.now()}`;
            saves[saveId] = saveData;

            localStorage.setItem('textadventure-saves', JSON.stringify(saves));
            this.addToStory("Game saved successfully!", 'story');
        } catch (error) {
            this.addToStory("Failed to save game.", 'error');
        }
    }

    static autoSave() {
        if (!this.currentGame) return;

        try {
            const saveData = {
                game: this.currentGame,
                state: this.gameState,
                timestamp: new Date().toISOString(),
                version: '2.0.0',
                isAutoSave: true
            };

            localStorage.setItem('textadventure-autosave', JSON.stringify(saveData));
        } catch (error) {
            console.error('Auto-save failed:', error);
        }
    }

    static getSavedGames() {
        try {
            const saves = localStorage.getItem('textadventure-saves');
            return saves ? JSON.parse(saves) : {};
        } catch {
            return {};
        }
    }

    static loadSavedGames() {
        const savedGamesList = this.currentWindow.querySelector('#ta-saved-games');
        if (!savedGamesList) return;

        const saves = this.getSavedGames();
        const saveKeys = Object.keys(saves).sort((a, b) =>
            new Date(saves[b].timestamp) - new Date(saves[a].timestamp)
        );

        if (saveKeys.length === 0) {
            savedGamesList.innerHTML = '<div style="text-align: center; color: #6c757d; padding: 20px;">No saved games</div>';
            return;
        }

        savedGamesList.innerHTML = saveKeys.map(saveId => {
            const save = saves[saveId];
            const gameNames = {
                'dragon-quest': 'Dragon\'s Quest',
                'space-station': 'Space Station Alpha',
                'mystery-mansion': 'Mystery Mansion'
            };

            return `
                <div class="saved-game-item" onclick="TextAdventure.loadGame('${saveId}')">
                    <div class="saved-game-info">
                        <div class="saved-game-name">${gameNames[save.game] || save.game}</div>
                        <div class="saved-game-meta">
                            Level ${save.state.level} • Score: ${save.state.score} • 
                            ${new Date(save.timestamp).toLocaleDateString()}
                        </div>
                    </div>
                    <div class="saved-game-actions">
                        <button class="btn btn-danger" onclick="event.stopPropagation(); TextAdventure.deleteSave('${saveId}')" style="padding: 4px 8px; font-size: 12px;">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }

    static loadGame(saveId) {
        try {
            const saves = this.getSavedGames();
            const saveData = saves[saveId];

            if (!saveData) {
                this.addToStory("Save file not found.", 'error');
                return;
            }

            this.currentGame = saveData.game;
            this.gameState = saveData.state;

            this.closeModal('ta-game-modal');
            this.enableGameplay();
            this.updateGameInfo();

            // Clear story and show current state
            const storyOutput = this.currentWindow.querySelector('#ta-story-output');
            storyOutput.innerHTML = '';

            this.addToStory("Game loaded successfully!", 'story');
            this.lookAround();
            this.updateUI();
            this.updateQuickCommands();

        } catch (error) {
            this.addToStory("Failed to load game.", 'error');
        }
    }

    static deleteSave(saveId) {
        if (!confirm('Delete this saved game?')) return;

        try {
            const saves = this.getSavedGames();
            delete saves[saveId];
            localStorage.setItem('textadventure-saves', JSON.stringify(saves));
            this.loadSavedGames();
        } catch (error) {
            console.error('Failed to delete save:', error);
        }
    }

    // Placeholder methods for game-specific implementations
    static handleDragonQuestCommand(command, verb, object) {
        this.addToStory("I don't understand that command in this context.", 'error');
    }

    static handleSpaceStationCommand(command, verb, object) {
        this.addToStory("I don't understand that command in this context.", 'error');
    }

    static handleMysteryMansionCommand(command, verb, object) {
        this.addToStory("I don't understand that command in this context.", 'error');
    }

    static checkCondition(requirement) {
        return this.gameState.gameFlags[requirement] || false;
    }

    static getCurrentEnemy(targetName) {
        // Return enemy data if present in current location
        return null; // Placeholder
    }

    static getExamineData(locationId, objectName) {
        // Return examination text for objects
        return null; // Placeholder
    }

    static examineCurrentLocation() {
        this.addToStory("You examine the area more carefully but find nothing new.", 'story');
    }

    static randomEncounter() {
        const encounters = [
            "You hear a rustling in the bushes nearby.",
            "A gentle breeze carries the scent of adventure.",
            "You notice interesting tracks on the ground.",
            "The sound of distant music reaches your ears."
        ];

        const encounter = encounters[Math.floor(Math.random() * encounters.length)];
        this.addToStory(encounter, 'story');
    }

    static talkTo(character) {
        this.addToStory(`You attempt to speak with ${character}, but they don't seem interested in conversation right now.`, 'story');
    }

    static showInventoryInline() {
        if (this.gameState.inventory.length === 0) {
            this.addToStory("Your inventory is empty.", 'story');
        } else {
            const items = this.gameState.inventory.map(item => this.formatItemName(item)).join(', ');
            this.addToStory(`You are carrying: ${items}`, 'story');
        }
    }

    static showHelpInline() {
        this.addToStory(`
            **Quick Help**
            
            Basic commands: look, go [direction], take [item], use [item], inventory
            Movement: north/n, south/s, east/e, west/w, up/u, down/d
            Type 'help' button in the toolbar for full command reference.
        `, 'story');
    }

    static showScore() {
        this.addToStory(`
            **Your Progress**
            
            Score: ${this.gameState.score} points
            Level: ${this.gameState.level}
            Experience: ${this.gameState.experience} XP
            Achievements: ${this.gameState.achievements.length}
        `, 'story');
    }

    static quitGame() {
        if (confirm('Are you sure you want to quit the current game?')) {
            this.currentGame = null;
            this.gameState = {};
            this.disableGameplay();
            this.updateGameInfo();

            const storyOutput = this.currentWindow.querySelector('#ta-story-output');
            storyOutput.innerHTML = `
                <div class="welcome-message">
                    <h3>🌟 Welcome to Text Adventure! 🌟</h3>
                    <p>Choose a new game to continue your adventures.</p>
                </div>
            `;
        }
    }

    static populateFullInventory() {
        const inventoryGrid = this.currentWindow.querySelector('#ta-full-inventory');
        const inventoryCount = this.currentWindow.querySelector('#ta-inventory-count');
        const inventoryLimit = this.currentWindow.querySelector('#ta-inventory-limit');
        const inventoryWeight = this.currentWindow.querySelector('#ta-inventory-weight');

        // Create inventory grid
        const slots = [];
        for (let i = 0; i < this.gameState.maxInventory; i++) {
            const item = this.gameState.inventory[i];
            slots.push(`
                <div class="inventory-item ${item ? 'filled' : 'empty'}" ${item ? `onclick="TextAdventure.useInventoryItem('${item}')"` : ''}>
                    ${item ? `
                        <div class="item-icon">${this.getItemIcon(item)}</div>
                        <div class="item-name">${this.formatItemName(item)}</div>
                    ` : '<div style="color: #a0aec0;">Empty</div>'}
                </div>
            `);
        }

        inventoryGrid.innerHTML = slots.join('');
        inventoryCount.textContent = this.gameState.inventory.length;
        inventoryLimit.textContent = this.gameState.maxInventory;
        inventoryWeight.textContent = Math.floor(this.gameState.inventory.length * 0.5); // Simple weight calculation
    }

    static useInventoryItem(item) {
        this.closeModal('ta-inventory-modal');
        this.handleItemUse(item);
    }

    static getItemIcon(item) {
        const icons = {
            'health-potion': '🧪',
            'rusty-sword': '⚔️',
            'iron-key': '🗝️',
            'wooden-shield': '🛡️',
            'space-suit': '👨‍🚀',
            'scanner': '📡',
            'magnifying-glass': '🔍',
            'notebook': '📓'
        };

        return icons[item] || '📦';
    }

    static exportSettings() {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.settings, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "textadventure-settings.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }

    static onClose(windowElement) {
        this.currentWindow = null;
        return true;
    }
}

window.TextAdventure = TextAdventure;