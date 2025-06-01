/**
 * APP_METADATA
 * @name Text Adventure
 * @icon fas fa-scroll
 * @description Classic text-based adventure game
 * @category Games
 * @version 1.0.0
 * @author EmberFrame Team
 * @enabled true
 */

class TextAdventure {
    static createWindow() {
        return {
            title: 'Text Adventure - The Digital Realm',
            width: '800px',
            height: '600px',
            content: `
                <div class="text-adventure">
                    <div class="game-header">
                        <h2>🏰 The Digital Realm</h2>
                        <div class="game-stats">
                            <div class="stat">
                                <span class="stat-label">Health:</span>
                                <div class="health-bar">
                                    <div class="health-fill" id="health-bar" style="width: 100%"></div>
                                </div>
                                <span id="health-text">100/100</span>
                            </div>
                            <div class="stat">
                                <span class="stat-label">Score:</span>
                                <span id="score-text">0</span>
                            </div>
                            <div class="stat">
                                <span class="stat-label">Location:</span>
                                <span id="location-text">Forest Entrance</span>
                            </div>
                        </div>
                    </div>

                    <div class="game-main">
                        <div class="story-panel">
                            <div class="story-content" id="story-content">
                                <div class="story-text">
                                    <p><strong>Welcome to The Digital Realm!</strong></p>
                                    <p>You find yourself standing at the edge of a mysterious digital forest. The air hums with electricity, and glowing data streams flow between the trees like ethereal rivers.</p>
                                    <p>Before you lie three paths:</p>
                                    <ul>
                                        <li><strong>North</strong> - A bright path leading to a Data Crystal Cave</li>
                                        <li><strong>East</strong> - A winding trail toward the Cyber Meadows</li>
                                        <li><strong>West</strong> - A dark passage into the Code Ruins</li>
                                    </ul>
                                    <p>What do you choose?</p>
                                </div>
                            </div>
                        </div>

                        <div class="game-sidebar">
                            <div class="inventory-panel">
                                <h3>📦 Inventory</h3>
                                <div class="inventory-grid" id="inventory-grid">
                                    <div class="inventory-item">
                                        <div class="item-icon">🔦</div>
                                        <div class="item-name">Digital Flashlight</div>
                                    </div>
                                    <div class="inventory-item">
                                        <div class="item-icon">🗝️</div>
                                        <div class="item-name">Encryption Key</div>
                                    </div>
                                </div>
                            </div>

                            <div class="commands-panel">
                                <h3>📜 Quick Commands</h3>
                                <div class="command-buttons">
                                    <button onclick="TextAdventure.handleCommand('north')" class="cmd-btn">Go North</button>
                                    <button onclick="TextAdventure.handleCommand('east')" class="cmd-btn">Go East</button>
                                    <button onclick="TextAdventure.handleCommand('west')" class="cmd-btn">Go West</button>
                                    <button onclick="TextAdventure.handleCommand('look')" class="cmd-btn">Look Around</button>
                                    <button onclick="TextAdventure.handleCommand('inventory')" class="cmd-btn">Check Inventory</button>
                                    <button onclick="TextAdventure.handleCommand('help')" class="cmd-btn">Help</button>
                                </div>
                            </div>

                            <div class="map-panel">
                                <h3>🗺️ Map</h3>
                                <div class="mini-map" id="mini-map">
                                    <div class="map-room current" style="grid-area: 2/2">🏠</div>
                                    <div class="map-room" style="grid-area: 1/2">🔮</div>
                                    <div class="map-room" style="grid-area: 2/3">🌸</div>
                                    <div class="map-room" style="grid-area: 2/1">🏚️</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="game-input">
                        <div class="input-container">
                            <span class="prompt">></span>
                            <input type="text" id="command-input" placeholder="Type your command here (e.g., 'go north', 'take item', 'examine door')" autofocus>
                            <button onclick="TextAdventure.processInput()" class="send-btn">
                                <i class="fas fa-paper-plane"></i>
                            </button>
                        </div>
                        <div class="input-suggestions" id="input-suggestions">
                            Try: <span onclick="TextAdventure.setCommand('go north')">go north</span>, 
                            <span onclick="TextAdventure.setCommand('examine trees')">examine trees</span>, 
                            <span onclick="TextAdventure.setCommand('use flashlight')">use flashlight</span>
                        </div>
                    </div>
                </div>

                <style>
                    .text-adventure {
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
                        color: #e0e0e0;
                        font-family: 'Courier New', monospace;
                        overflow: hidden;
                    }

                    .game-header {
                        background: linear-gradient(135deg, #2d1b69, #11998e);
                        padding: 15px 20px;
                        border-bottom: 2px solid #00d4ff;
                    }

                    .game-header h2 {
                        margin: 0 0 10px 0;
                        color: #ffffff;
                        text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
                        font-size: 24px;
                    }

                    .game-stats {
                        display: flex;
                        gap: 30px;
                        align-items: center;
                        flex-wrap: wrap;
                    }

                    .stat {
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        font-size: 14px;
                    }

                    .stat-label {
                        color: #00d4ff;
                        font-weight: bold;
                    }

                    .health-bar {
                        width: 100px;
                        height: 12px;
                        background: rgba(255, 255, 255, 0.2);
                        border-radius: 6px;
                        overflow: hidden;
                        border: 1px solid #00d4ff;
                    }

                    .health-fill {
                        height: 100%;
                        background: linear-gradient(90deg, #ff4757, #ffa502, #2ed573);
                        transition: width 0.3s ease;
                    }

                    .game-main {
                        flex: 1;
                        display: flex;
                        overflow: hidden;
                    }

                    .story-panel {
                        flex: 2;
                        display: flex;
                        flex-direction: column;
                        border-right: 2px solid #00d4ff;
                    }

                    .story-content {
                        flex: 1;
                        padding: 20px;
                        overflow-y: auto;
                        line-height: 1.6;
                        background: rgba(0, 0, 0, 0.3);
                    }

                    .story-text {
                        margin-bottom: 20px;
                        animation: fadeIn 0.5s ease-in;
                    }

                    .story-text p {
                        margin-bottom: 15px;
                        text-align: justify;
                    }

                    .story-text ul {
                        padding-left: 20px;
                        margin: 15px 0;
                    }

                    .story-text li {
                        margin-bottom: 8px;
                        color: #a0e7e5;
                    }

                    .story-text strong {
                        color: #00d4ff;
                        text-shadow: 0 0 5px rgba(0, 212, 255, 0.3);
                    }

                    .game-sidebar {
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        background: rgba(0, 0, 0, 0.4);
                        min-width: 250px;
                    }

                    .inventory-panel,
                    .commands-panel,
                    .map-panel {
                        padding: 15px;
                        border-bottom: 1px solid rgba(0, 212, 255, 0.3);
                    }

                    .inventory-panel h3,
                    .commands-panel h3,
                    .map-panel h3 {
                        margin: 0 0 15px 0;
                        color: #00d4ff;
                        font-size: 14px;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                    }

                    .inventory-grid {
                        display: grid;
                        grid-template-columns: 1fr;
                        gap: 8px;
                    }

                    .inventory-item {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        padding: 8px;
                        background: rgba(0, 212, 255, 0.1);
                        border: 1px solid rgba(0, 212, 255, 0.3);
                        border-radius: 6px;
                        font-size: 12px;
                    }

                    .item-icon {
                        font-size: 16px;
                    }

                    .item-name {
                        flex: 1;
                    }

                    .command-buttons {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 8px;
                    }

                    .cmd-btn {
                        padding: 8px 12px;
                        background: rgba(0, 212, 255, 0.2);
                        border: 1px solid rgba(0, 212, 255, 0.5);
                        color: #e0e0e0;
                        border-radius: 6px;
                        cursor: pointer;
                        font-size: 11px;
                        transition: all 0.3s ease;
                        font-family: inherit;
                    }

                    .cmd-btn:hover {
                        background: rgba(0, 212, 255, 0.4);
                        transform: translateY(-1px);
                    }

                    .mini-map {
                        display: grid;
                        grid-template-columns: repeat(3, 1fr);
                        grid-template-rows: repeat(3, 1fr);
                        gap: 4px;
                        width: 120px;
                        height: 120px;
                        margin: 0 auto;
                    }

                    .map-room {
                        background: rgba(0, 0, 0, 0.5);
                        border: 1px solid rgba(0, 212, 255, 0.3);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 18px;
                        border-radius: 4px;
                    }

                    .map-room.current {
                        background: rgba(0, 212, 255, 0.4);
                        border-color: #00d4ff;
                        box-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
                    }

                    .game-input {
                        background: rgba(0, 0, 0, 0.6);
                        padding: 15px 20px;
                        border-top: 2px solid #00d4ff;
                    }

                    .input-container {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        margin-bottom: 8px;
                    }

                    .prompt {
                        color: #00d4ff;
                        font-weight: bold;
                        font-size: 18px;
                        text-shadow: 0 0 5px rgba(0, 212, 255, 0.5);
                    }

                    #command-input {
                        flex: 1;
                        background: rgba(0, 0, 0, 0.7);
                        border: 1px solid rgba(0, 212, 255, 0.5);
                        color: #e0e0e0;
                        padding: 12px 15px;
                        border-radius: 8px;
                        font-family: inherit;
                        font-size: 14px;
                        transition: border-color 0.3s ease;
                    }

                    #command-input:focus {
                        outline: none;
                        border-color: #00d4ff;
                        box-shadow: 0 0 10px rgba(0, 212, 255, 0.3);
                    }

                    .send-btn {
                        background: linear-gradient(135deg, #00d4ff, #0099cc);
                        border: none;
                        color: white;
                        padding: 12px 16px;
                        border-radius: 8px;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    }

                    .send-btn:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 4px 15px rgba(0, 212, 255, 0.4);
                    }

                    .input-suggestions {
                        font-size: 12px;
                        color: #a0a0a0;
                    }

                    .input-suggestions span {
                        color: #00d4ff;
                        cursor: pointer;
                        text-decoration: underline;
                    }

                    .input-suggestions span:hover {
                        color: #ffffff;
                    }

                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }

                    /* Mobile Responsive */
                    @media (max-width: 768px) {
                        .game-main {
                            flex-direction: column;
                        }

                        .story-panel {
                            border-right: none;
                            border-bottom: 2px solid #00d4ff;
                        }

                        .game-sidebar {
                            min-width: unset;
                            max-height: 200px;
                            overflow-y: auto;
                        }

                        .command-buttons {
                            grid-template-columns: 1fr;
                        }

                        .game-stats {
                            flex-direction: column;
                            gap: 10px;
                            align-items: flex-start;
                        }
                    }
                </style>
            `,
            onInit: (windowElement) => {
                TextAdventure.init(windowElement);
            }
        };
    }

    static init(windowElement) {
        this.currentWindow = windowElement;
        this.gameState = {
            health: 100,
            maxHealth: 100,
            score: 0,
            location: 'forest_entrance',
            inventory: ['flashlight', 'encryption_key'],
            visitedRooms: ['forest_entrance'],
            flags: {}
        };

        this.locations = {
            forest_entrance: {
                name: 'Forest Entrance',
                description: 'You stand at the edge of a mysterious digital forest. Data streams flow between the glowing trees.',
                exits: { north: 'crystal_cave', east: 'cyber_meadows', west: 'code_ruins' },
                items: [],
                examined: false
            },
            crystal_cave: {
                name: 'Data Crystal Cave',
                description: 'A luminous cave filled with floating data crystals that hum with processing power.',
                exits: { south: 'forest_entrance', deep: 'deep_cave' },
                items: ['data_crystal'],
                examined: false
            },
            cyber_meadows: {
                name: 'Cyber Meadows',
                description: 'Rolling digital hills covered in pixelated flowers that bloom in beautiful patterns.',
                exits: { west: 'forest_entrance', north: 'server_tower' },
                items: ['healing_potion'],
                examined: false
            },
            code_ruins: {
                name: 'Code Ruins',
                description: 'Ancient ruins made of broken code fragments and corrupted data structures.',
                exits: { east: 'forest_entrance', down: 'bug_cavern' },
                items: ['debug_sword'],
                examined: false
            }
        };

        this.items = {
            flashlight: { name: 'Digital Flashlight', description: 'A bright light that reveals hidden data.', icon: '🔦' },
            encryption_key: { name: 'Encryption Key', description: 'A mystical key that unlocks secured areas.', icon: '🗝️' },
            data_crystal: { name: 'Data Crystal', description: 'A valuable crystal containing pure information.', icon: '💎' },
            healing_potion: { name: 'Healing Potion', description: 'Restores health when consumed.', icon: '🧪' },
            debug_sword: { name: 'Debug Sword', description: 'A powerful weapon against code bugs.', icon: '⚔️' }
        };

        this.setupEventListeners();
        this.updateDisplay();
    }

    static setupEventListeners() {
        const input = this.currentWindow.querySelector('#command-input');
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.processInput();
            }
        });

        input.focus();
    }

    static processInput() {
        const input = this.currentWindow.querySelector('#command-input');
        const command = input.value.trim().toLowerCase();
        input.value = '';

        if (command) {
            this.handleCommand(command);
        }
    }

    static setCommand(command) {
        const input = this.currentWindow.querySelector('#command-input');
        input.value = command;
        input.focus();
    }

    static handleCommand(command) {
        const parts = command.split(' ');
        const action = parts[0];
        const target = parts.slice(1).join(' ');

        let response = '';

        switch (action) {
            case 'go':
            case 'move':
            case 'north':
            case 'south':
            case 'east':
            case 'west':
                const direction = action === 'go' || action === 'move' ? target : action;
                response = this.movePlayer(direction);
                break;

            case 'look':
            case 'examine':
                response = this.examineRoom(target);
                break;

            case 'take':
            case 'get':
                response = this.takeItem(target);
                break;

            case 'use':
                response = this.useItem(target);
                break;

            case 'inventory':
            case 'inv':
                response = this.showInventory();
                break;

            case 'health':
                response = `Your health is ${this.gameState.health}/${this.gameState.maxHealth}.`;
                break;

            case 'score':
                response = `Your current score is ${this.gameState.score} points.`;
                break;

            case 'help':
                response = this.showHelp();
                break;

            case 'save':
                response = this.saveGame();
                break;

            case 'load':
                response = this.loadGame();
                break;

            default:
                response = `I don't understand "${command}". Try typing "help" for available commands.`;
        }

        this.addStoryText(response);
        this.updateDisplay();
    }

    static movePlayer(direction) {
        const currentLocation = this.locations[this.gameState.location];
        const exitDirection = direction.toLowerCase();

        if (currentLocation.exits[exitDirection]) {
            const newLocation = currentLocation.exits[exitDirection];
            this.gameState.location = newLocation;

            if (!this.gameState.visitedRooms.includes(newLocation)) {
                this.gameState.visitedRooms.push(newLocation);
                this.gameState.score += 10;
            }

            const location = this.locations[newLocation];
            return `You move ${direction}.\n\n${location.description}`;
        } else {
            return `You can't go ${direction} from here.`;
        }
    }

    static examineRoom(target) {
        const location = this.locations[this.gameState.location];

        if (!target || target === 'room' || target === 'area') {
            let description = location.description;

            if (location.items.length > 0) {
                const visibleItems = location.items.map(item => this.items[item]?.name || item);
                description += `\n\nYou see: ${visibleItems.join(', ')}`;
            }

            const exits = Object.keys(location.exits);
            description += `\n\nExits: ${exits.join(', ')}`;

            if (!location.examined) {
                location.examined = true;
                this.gameState.score += 5;
            }

            return description;
        } else {
            return `You examine the ${target}, but find nothing special about it.`;
        }
    }

    static takeItem(itemName) {
        const location = this.locations[this.gameState.location];
        const itemKey = Object.keys(this.items).find(key =>
            this.items[key].name.toLowerCase().includes(itemName) || key === itemName
        );

        if (itemKey && location.items.includes(itemKey)) {
            location.items = location.items.filter(item => item !== itemKey);
            this.gameState.inventory.push(itemKey);
            this.gameState.score += 15;
            return `You take the ${this.items[itemKey].name}.`;
        } else {
            return `There's no ${itemName} here to take.`;
        }
    }

    static useItem(itemName) {
        const itemKey = Object.keys(this.items).find(key =>
            this.items[key].name.toLowerCase().includes(itemName) || key === itemName
        );

        if (!itemKey || !this.gameState.inventory.includes(itemKey)) {
            return `You don't have a ${itemName}.`;
        }

        switch (itemKey) {
            case 'flashlight':
                return `You shine the digital flashlight around. The light reveals hidden data patterns in the environment.`;

            case 'healing_potion':
                const healAmount = Math.min(50, this.gameState.maxHealth - this.gameState.health);
                this.gameState.health += healAmount;
                this.gameState.inventory = this.gameState.inventory.filter(item => item !== itemKey);
                return `You drink the healing potion and restore ${healAmount} health points.`;

            case 'encryption_key':
                return `You hold up the encryption key. It glows softly, ready to unlock encrypted barriers.`;

            default:
                return `You can't use the ${this.items[itemKey].name} right now.`;
        }
    }

    static showInventory() {
        if (this.gameState.inventory.length === 0) {
            return `Your inventory is empty.`;
        }

        const items = this.gameState.inventory.map(itemKey => {
            const item = this.items[itemKey];
            return `${item.icon} ${item.name}`;
        }).join('\n');

        return `Inventory:\n${items}`;
    }

    static showHelp() {
        return `Available Commands:
        
Movement: go [direction], north, south, east, west
Interaction: take [item], use [item], examine [object]
Information: inventory, health, score, look
System: help, save, load

Examples:
• go north (move north)
• take crystal (pick up an item)
• use flashlight (use an item)
• examine room (look around)

Use the quick command buttons or type commands directly!`;
    }

    static saveGame() {
        try {
            localStorage.setItem('textadventure_save', JSON.stringify(this.gameState));
            return `Game saved successfully!`;
        } catch (error) {
            return `Failed to save game.`;
        }
    }

    static loadGame() {
        try {
            const saveData = localStorage.getItem('textadventure_save');
            if (saveData) {
                this.gameState = JSON.parse(saveData);
                return `Game loaded successfully!`;
            } else {
                return `No saved game found.`;
            }
        } catch (error) {
            return `Failed to load game.`;
        }
    }

    static addStoryText(text) {
        const storyContent = this.currentWindow.querySelector('#story-content');

        const newText = document.createElement('div');
        newText.className = 'story-text';
        newText.innerHTML = `<p>${text.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>')}</p>`;

        storyContent.appendChild(newText);
        storyContent.scrollTop = storyContent.scrollHeight;
    }

    static updateDisplay() {
        // Update health bar
        const healthBar = this.currentWindow.querySelector('#health-bar');
        const healthText = this.currentWindow.querySelector('#health-text');
        const healthPercent = (this.gameState.health / this.gameState.maxHealth) * 100;

        healthBar.style.width = healthPercent + '%';
        healthText.textContent = `${this.gameState.health}/${this.gameState.maxHealth}`;

        // Update score
        const scoreText = this.currentWindow.querySelector('#score-text');
        scoreText.textContent = this.gameState.score;

        // Update location
        const locationText = this.currentWindow.querySelector('#location-text');
        const currentLocation = this.locations[this.gameState.location];
        locationText.textContent = currentLocation.name;

        // Update inventory display
        this.updateInventoryDisplay();
    }

    static updateInventoryDisplay() {
        const inventoryGrid = this.currentWindow.querySelector('#inventory-grid');

        inventoryGrid.innerHTML = this.gameState.inventory.map(itemKey => {
            const item = this.items[itemKey];
            return `
                <div class="inventory-item">
                    <div class="item-icon">${item.icon}</div>
                    <div class="item-name">${item.name}</div>
                </div>
            `;
        }).join('');
    }

    static onClose(windowElement) {
        return true;
    }
}

window.TextAdventure = TextAdventure;