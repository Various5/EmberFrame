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
            title: 'Text Adventure Game',
            width: '800px',
            height: '600px',
            content: `
                <div class="text-adventure">
                    <div class="game-header">
                        <h2>🏰 The Lost Castle Adventure</h2>
                        <div class="game-controls">
                            <button onclick="TextAdventure.newGame()" class="btn btn-primary">
                                <i class="fas fa-play"></i> New Game
                            </button>
                            <button onclick="TextAdventure.saveGame()" class="btn btn-secondary">
                                <i class="fas fa-save"></i> Save
                            </button>
                            <button onclick="TextAdventure.loadGame()" class="btn btn-secondary">
                                <i class="fas fa-folder-open"></i> Load
                            </button>
                            <button onclick="TextAdventure.showHelp()" class="btn btn-info">
                                <i class="fas fa-question"></i> Help
                            </button>
                        </div>
                    </div>

                    <div class="game-main">
                        <div class="game-display">
                            <div class="story-text" id="story-output">
                                <div class="intro-text">
                                    <h3>Welcome to The Lost Castle Adventure!</h3>
                                    <p>You are a brave adventurer standing before a mysterious ancient castle. 
                                    Dark clouds gather overhead, and you can hear strange sounds echoing from within.</p>
                                    <p>Your quest is to find the legendary Crystal of Power hidden somewhere in the castle's depths.</p>
                                    <p class="command-prompt">What would you like to do?</p>
                                </div>
                            </div>
                        </div>

                        <div class="game-sidebar">
                            <div class="player-stats">
                                <h4>📊 Player Status</h4>
                                <div class="stat-item">
                                    <span class="stat-label">Health:</span>
                                    <div class="stat-bar">
                                        <div class="stat-fill health" id="health-bar"></div>
                                    </div>
                                    <span class="stat-value" id="health-value">100</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-label">Magic:</span>
                                    <div class="stat-bar">
                                        <div class="stat-fill magic" id="magic-bar"></div>
                                    </div>
                                    <span class="stat-value" id="magic-value">50</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-label">Score:</span>
                                    <span class="stat-value" id="score-value">0</span>
                                </div>
                            </div>

                            <div class="inventory">
                                <h4>🎒 Inventory</h4>
                                <div class="inventory-items" id="inventory-list">
                                    <div class="inventory-item">🗡️ Rusty Sword</div>
                                    <div class="inventory-item">🍞 Bread</div>
                                </div>
                            </div>

                            <div class="location-info">
                                <h4>📍 Current Location</h4>
                                <div class="location-name" id="current-location">Castle Entrance</div>
                                <div class="location-description" id="location-desc">
                                    You stand before the towering castle gates. Ancient stone walls rise high above you.
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="game-input">
                        <div class="input-container">
                            <span class="input-prompt">&gt;</span>
                            <input type="text" id="command-input" placeholder="Enter your command..." 
                                   onkeypress="TextAdventure.handleKeyPress(event)" autocomplete="off">
                            <button onclick="TextAdventure.executeCommand()" class="btn btn-primary">
                                <i class="fas fa-arrow-right"></i>
                            </button>
                        </div>
                        <div class="quick-commands">
                            <button onclick="TextAdventure.quickCommand('look')" class="quick-btn">👀 Look</button>
                            <button onclick="TextAdventure.quickCommand('inventory')" class="quick-btn">🎒 Inventory</button>
                            <button onclick="TextAdventure.quickCommand('help')" class="quick-btn">❓ Help</button>
                            <button onclick="TextAdventure.quickCommand('north')" class="quick-btn">⬆️ North</button>
                            <button onclick="TextAdventure.quickCommand('south')" class="quick-btn">⬇️ South</button>
                            <button onclick="TextAdventure.quickCommand('east')" class="quick-btn">➡️ East</button>
                            <button onclick="TextAdventure.quickCommand('west')" class="quick-btn">⬅️ West</button>
                        </div>
                    </div>
                </div>

                <style>
                    .text-adventure {
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
                        color: #ecf0f1;
                        font-family: 'Courier New', monospace;
                    }

                    .game-header {
                        padding: 20px;
                        background: rgba(52, 73, 94, 0.8);
                        border-bottom: 2px solid #3498db;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }

                    .game-header h2 {
                        margin: 0;
                        color: #f39c12;
                        text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
                        font-size: 24px;
                    }

                    .game-controls {
                        display: flex;
                        gap: 10px;
                    }

                    .btn {
                        padding: 8px 16px;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                        font-size: 14px;
                        transition: all 0.3s ease;
                        display: flex;
                        align-items: center;
                        gap: 5px;
                    }

                    .btn-primary {
                        background: #3498db;
                        color: white;
                    }

                    .btn-secondary {
                        background: #95a5a6;
                        color: white;
                    }

                    .btn-info {
                        background: #17a2b8;
                        color: white;
                    }

                    .btn:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 4px 8px rgba(0,0,0,0.3);
                    }

                    .game-main {
                        flex: 1;
                        display: flex;
                        overflow: hidden;
                    }

                    .game-display {
                        flex: 1;
                        padding: 20px;
                        overflow-y: auto;
                        background: rgba(44, 62, 80, 0.3);
                    }

                    .story-text {
                        line-height: 1.6;
                        font-size: 16px;
                    }

                    .intro-text {
                        background: rgba(52, 152, 219, 0.1);
                        padding: 20px;
                        border-radius: 10px;
                        border-left: 4px solid #3498db;
                        margin-bottom: 20px;
                    }

                    .intro-text h3 {
                        color: #f39c12;
                        margin-top: 0;
                    }

                    .command-prompt {
                        color: #e74c3c;
                        font-weight: bold;
                        margin-top: 15px;
                    }

                    .game-output {
                        margin: 10px 0;
                        padding: 10px;
                        background: rgba(236, 240, 241, 0.1);
                        border-radius: 5px;
                        border-left: 3px solid #2ecc71;
                    }

                    .error-output {
                        border-left-color: #e74c3c;
                        background: rgba(231, 76, 60, 0.1);
                    }

                    .game-sidebar {
                        width: 300px;
                        padding: 20px;
                        background: rgba(52, 73, 94, 0.7);
                        border-left: 2px solid #3498db;
                        overflow-y: auto;
                    }

                    .player-stats,
                    .inventory,
                    .location-info {
                        margin-bottom: 25px;
                        background: rgba(44, 62, 80, 0.5);
                        padding: 15px;
                        border-radius: 10px;
                        border: 1px solid rgba(52, 152, 219, 0.3);
                    }

                    .player-stats h4,
                    .inventory h4,
                    .location-info h4 {
                        margin: 0 0 15px 0;
                        color: #f39c12;
                        font-size: 16px;
                        border-bottom: 1px solid rgba(243, 156, 18, 0.3);
                        padding-bottom: 5px;
                    }

                    .stat-item {
                        display: flex;
                        align-items: center;
                        margin-bottom: 10px;
                        gap: 10px;
                    }

                    .stat-label {
                        min-width: 60px;
                        font-size: 14px;
                    }

                    .stat-bar {
                        flex: 1;
                        height: 20px;
                        background: rgba(52, 73, 94, 0.8);
                        border-radius: 10px;
                        overflow: hidden;
                        border: 1px solid rgba(236, 240, 241, 0.2);
                    }

                    .stat-fill {
                        height: 100%;
                        transition: width 0.3s ease;
                        border-radius: 10px;
                    }

                    .stat-fill.health {
                        background: linear-gradient(90deg, #e74c3c, #c0392b);
                        width: 100%;
                    }

                    .stat-fill.magic {
                        background: linear-gradient(90deg, #9b59b6, #8e44ad);
                        width: 50%;
                    }

                    .stat-value {
                        min-width: 40px;
                        text-align: right;
                        font-weight: bold;
                    }

                    .inventory-items {
                        display: flex;
                        flex-direction: column;
                        gap: 8px;
                    }

                    .inventory-item {
                        padding: 8px 12px;
                        background: rgba(52, 152, 219, 0.2);
                        border-radius: 5px;
                        border: 1px solid rgba(52, 152, 219, 0.3);
                        font-size: 14px;
                        cursor: pointer;
                        transition: all 0.2s ease;
                    }

                    .inventory-item:hover {
                        background: rgba(52, 152, 219, 0.3);
                        transform: translateX(5px);
                    }

                    .location-name {
                        font-size: 18px;
                        font-weight: bold;
                        color: #2ecc71;
                        margin-bottom: 10px;
                    }

                    .location-description {
                        font-size: 14px;
                        line-height: 1.4;
                        opacity: 0.9;
                    }

                    .game-input {
                        padding: 20px;
                        background: rgba(52, 73, 94, 0.8);
                        border-top: 2px solid #3498db;
                    }

                    .input-container {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        margin-bottom: 15px;
                    }

                    .input-prompt {
                        color: #f39c12;
                        font-size: 18px;
                        font-weight: bold;
                    }

                    #command-input {
                        flex: 1;
                        padding: 12px 15px;
                        background: rgba(44, 62, 80, 0.8);
                        border: 2px solid rgba(52, 152, 219, 0.3);
                        border-radius: 5px;
                        color: #ecf0f1;
                        font-family: 'Courier New', monospace;
                        font-size: 16px;
                    }

                    #command-input:focus {
                        outline: none;
                        border-color: #3498db;
                        box-shadow: 0 0 10px rgba(52, 152, 219, 0.5);
                    }

                    .quick-commands {
                        display: flex;
                        gap: 8px;
                        flex-wrap: wrap;
                    }

                    .quick-btn {
                        padding: 6px 12px;
                        background: rgba(52, 152, 219, 0.3);
                        border: 1px solid rgba(52, 152, 219, 0.5);
                        border-radius: 5px;
                        color: #ecf0f1;
                        cursor: pointer;
                        font-size: 12px;
                        transition: all 0.2s ease;
                    }

                    .quick-btn:hover {
                        background: rgba(52, 152, 219, 0.5);
                        transform: translateY(-1px);
                    }

                    /* Responsive Design */
                    @media (max-width: 768px) {
                        .game-main {
                            flex-direction: column;
                        }

                        .game-sidebar {
                            width: 100%;
                            max-height: 200px;
                        }

                        .game-header {
                            flex-direction: column;
                            gap: 15px;
                        }

                        .quick-commands {
                            justify-content: center;
                        }
                    }

                    /* Scrollbar Styling */
                    ::-webkit-scrollbar {
                        width: 8px;
                    }

                    ::-webkit-scrollbar-track {
                        background: rgba(52, 73, 94, 0.3);
                    }

                    ::-webkit-scrollbar-thumb {
                        background: rgba(52, 152, 219, 0.5);
                        border-radius: 4px;
                    }

                    ::-webkit-scrollbar-thumb:hover {
                        background: rgba(52, 152, 219, 0.7);
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
        this.gameState = this.getInitialGameState();
        this.commandHistory = [];
        this.historyIndex = -1;

        // Focus the input
        setTimeout(() => {
            const input = this.currentWindow.querySelector('#command-input');
            if (input) input.focus();
        }, 100);

        // Load saved game if exists
        this.loadGameFromStorage();
        this.updateDisplay();
    }

    static getInitialGameState() {
        return {
            location: 'castle_entrance',
            health: 100,
            magic: 50,
            score: 0,
            inventory: ['sword', 'bread'],
            flags: {
                hasKey: false,
                doorUnlocked: false,
                crystalFound: false
            },
            locations: {
                castle_entrance: {
                    name: 'Castle Entrance',
                    description: 'You stand before the towering castle gates. Ancient stone walls rise high above you.',
                    exits: { north: 'great_hall', east: 'garden' },
                    items: ['key'],
                    firstVisit: true
                },
                great_hall: {
                    name: 'Great Hall',
                    description: 'A vast hall with high vaulted ceilings. Dusty banners hang from the walls.',
                    exits: { south: 'castle_entrance', west: 'library', east: 'armory' },
                    items: ['torch'],
                    firstVisit: true
                },
                library: {
                    name: 'Ancient Library',
                    description: 'Countless books line the walls. A magical aura fills the air.',
                    exits: { east: 'great_hall' },
                    items: ['spell_book', 'potion'],
                    firstVisit: true
                },
                armory: {
                    name: 'Castle Armory',
                    description: 'Weapons and armor are scattered about. You sense danger nearby.',
                    exits: { west: 'great_hall', north: 'treasure_room' },
                    items: ['shield'],
                    monster: 'skeleton_guard',
                    firstVisit: true
                },
                garden: {
                    name: 'Enchanted Garden',
                    description: 'A peaceful garden with magical flowers. A fountain bubbles in the center.',
                    exits: { west: 'castle_entrance' },
                    items: ['healing_herb'],
                    firstVisit: true
                },
                treasure_room: {
                    name: 'Treasure Chamber',
                    description: 'The legendary treasure chamber! Gold and gems glitter in the torchlight.',
                    exits: { south: 'armory' },
                    items: ['crystal_of_power'],
                    firstVisit: true
                }
            }
        };
    }

    static handleKeyPress(event) {
        if (event.key === 'Enter') {
            this.executeCommand();
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            this.navigateHistory(-1);
        } else if (event.key === 'ArrowDown') {
            event.preventDefault();
            this.navigateHistory(1);
        }
    }

    static navigateHistory(direction) {
        if (this.commandHistory.length === 0) return;

        this.historyIndex += direction;

        if (this.historyIndex < 0) {
            this.historyIndex = 0;
        } else if (this.historyIndex >= this.commandHistory.length) {
            this.historyIndex = this.commandHistory.length - 1;
        }

        const input = this.currentWindow.querySelector('#command-input');
        input.value = this.commandHistory[this.historyIndex] || '';
    }

    static executeCommand() {
        const input = this.currentWindow.querySelector('#command-input');
        const command = input.value.trim().toLowerCase();

        if (!command) return;

        // Add to history
        this.commandHistory.unshift(command);
        if (this.commandHistory.length > 50) {
            this.commandHistory.pop();
        }
        this.historyIndex = -1;

        // Add command to output
        this.addToOutput(`> ${command}`, 'command');

        // Process command
        this.processCommand(command);

        // Clear input and focus
        input.value = '';
        input.focus();

        // Save game state
        this.saveGameToStorage();
    }

    static quickCommand(command) {
        const input = this.currentWindow.querySelector('#command-input');
        input.value = command;
        this.executeCommand();
    }

    static processCommand(command) {
        const words = command.split(' ').filter(word => word.length > 0);
        const verb = words[0];
        const noun = words.slice(1).join(' ');

        switch (verb) {
            case 'look':
            case 'l':
                this.lookCommand(noun);
                break;
            case 'go':
            case 'move':
            case 'walk':
            case 'north':
            case 'south':
            case 'east':
            case 'west':
            case 'n':
            case 's':
            case 'e':
            case 'w':
                const direction = verb.length === 1 ? this.expandDirection(verb) : (words.length > 1 ? noun : verb);
                this.moveCommand(direction);
                break;
            case 'take':
            case 'get':
            case 'pick':
                this.takeCommand(noun);
                break;
            case 'drop':
                this.dropCommand(noun);
                break;
            case 'use':
                this.useCommand(noun);
                break;
            case 'inventory':
            case 'inv':
            case 'i':
                this.inventoryCommand();
                break;
            case 'help':
            case 'h':
                this.helpCommand();
                break;
            case 'attack':
            case 'fight':
            case 'kill':
                this.attackCommand(noun);
                break;
            case 'cast':
            case 'spell':
                this.castCommand(noun);
                break;
            case 'examine':
            case 'x':
                this.examineCommand(noun);
                break;
            default:
                this.addToOutput("I don't understand that command. Type 'help' for available commands.", 'error');
        }

        this.updateDisplay();
    }

    static expandDirection(shortDir) {
        const directions = { n: 'north', s: 'south', e: 'east', w: 'west' };
        return directions[shortDir] || shortDir;
    }

    static lookCommand(target) {
        const location = this.gameState.locations[this.gameState.location];

        if (!target || target === 'around') {
            this.addToOutput(`**${location.name}**`, 'location');
            this.addToOutput(location.description);

            if (location.items && location.items.length > 0) {
                this.addToOutput(`You can see: ${location.items.map(item => this.getItemName(item)).join(', ')}`);
            }

            if (location.exits) {
                const exits = Object.keys(location.exits).join(', ');
                this.addToOutput(`Exits: ${exits}`);
            }

            if (location.monster) {
                this.addToOutput(`⚔️ A ${this.getMonsterName(location.monster)} blocks your path!`, 'error');
            }
        } else {
            this.examineCommand(target);
        }
    }

    static moveCommand(direction) {
        const location = this.gameState.locations[this.gameState.location];

        if (!location.exits || !location.exits[direction]) {
            this.addToOutput("You can't go that way.");
            return;
        }

        // Check for monster blocking the path
        if (location.monster && direction === 'north' && this.gameState.location === 'armory') {
            this.addToOutput("The skeleton guard blocks your path! You must defeat it first.", 'error');
            return;
        }

        const newLocation = location.exits[direction];
        this.gameState.location = newLocation;
        this.gameState.score += 5;

        const newLoc = this.gameState.locations[newLocation];
        if (newLoc.firstVisit) {
            this.gameState.score += 10;
            newLoc.firstVisit = false;
        }

        this.addToOutput(`You move ${direction}.`);
        this.lookCommand();
    }

    static takeCommand(item) {
        if (!item) {
            this.addToOutput("Take what?");
            return;
        }

        const location = this.gameState.locations[this.gameState.location];
        const itemKey = this.findItemKey(item);

        if (!itemKey || !location.items || !location.items.includes(itemKey)) {
            this.addToOutput(`There is no ${item} here.`);
            return;
        }

        // Remove from location, add to inventory
        location.items = location.items.filter(i => i !== itemKey);
        this.gameState.inventory.push(itemKey);
        this.gameState.score += 5;

        this.addToOutput(`You take the ${this.getItemName(itemKey)}.`);

        // Special item effects
        if (itemKey === 'key') {
            this.gameState.flags.hasKey = true;
            this.addToOutput("This might unlock something important!");
        } else if (itemKey === 'crystal_of_power') {
            this.gameState.flags.crystalFound = true;
            this.gameState.score += 100;
            this.addToOutput("🎉 Congratulations! You have found the legendary Crystal of Power!");
            this.addToOutput("You have completed your quest! Your final score: " + this.gameState.score, 'success');
        }
    }

    static dropCommand(item) {
        if (!item) {
            this.addToOutput("Drop what?");
            return;
        }

        const itemKey = this.findItemKey(item);

        if (!itemKey || !this.gameState.inventory.includes(itemKey)) {
            this.addToOutput(`You don't have a ${item}.`);
            return;
        }

        // Remove from inventory, add to location
        this.gameState.inventory = this.gameState.inventory.filter(i => i !== itemKey);
        const location = this.gameState.locations[this.gameState.location];
        if (!location.items) location.items = [];
        location.items.push(itemKey);

        this.addToOutput(`You drop the ${this.getItemName(itemKey)}.`);
    }

    static useCommand(item) {
        if (!item) {
            this.addToOutput("Use what?");
            return;
        }

        const itemKey = this.findItemKey(item);

        if (!itemKey || !this.gameState.inventory.includes(itemKey)) {
            this.addToOutput(`You don't have a ${item}.`);
            return;
        }

        switch (itemKey) {
            case 'healing_herb':
                this.gameState.health = Math.min(100, this.gameState.health + 30);
                this.gameState.inventory = this.gameState.inventory.filter(i => i !== itemKey);
                this.addToOutput("You eat the healing herb and feel much better! (+30 health)");
                break;
            case 'potion':
                this.gameState.magic = Math.min(100, this.gameState.magic + 25);
                this.gameState.inventory = this.gameState.inventory.filter(i => i !== itemKey);
                this.addToOutput("You drink the magic potion and feel energized! (+25 magic)");
                break;
            case 'bread':
                this.gameState.health = Math.min(100, this.gameState.health + 10);
                this.gameState.inventory = this.gameState.inventory.filter(i => i !== itemKey);
                this.addToOutput("You eat the bread and feel a bit better. (+10 health)");
                break;
            case 'torch':
                this.addToOutput("The torch provides light in the dark areas of the castle.");
                break;
            default:
                this.addToOutput(`You can't use the ${this.getItemName(itemKey)} right now.`);
        }
    }

    static attackCommand(target) {
        const location = this.gameState.locations[this.gameState.location];

        if (!location.monster) {
            this.addToOutput("There's nothing here to attack.");
            return;
        }

        if (location.monster === 'skeleton_guard') {
            const hasWeapon = this.gameState.inventory.includes('sword') || this.gameState.inventory.includes('shield');

            if (hasWeapon) {
                this.addToOutput("⚔️ You battle the skeleton guard fiercely!");
                this.addToOutput("💀 The skeleton crumbles to dust! You are victorious!");
                delete location.monster;
                this.gameState.score += 50;
                this.gameState.health -= 20;
                this.addToOutput("You take some damage in the fight. (-20 health)");
            } else {
                this.addToOutput("You attack with your bare hands but it's not very effective!");
                this.gameState.health -= 30;
                this.addToOutput("The skeleton guard strikes back! (-30 health)", 'error');

                if (this.gameState.health <= 0) {
                    this.gameState.health = 0;
                    this.addToOutput("💀 You have died! Game Over.", 'error');
                    this.addToOutput("Type 'new game' to start over.");
                }
            }
        }
    }

    static castCommand(spell) {
        if (this.gameState.magic < 10) {
            this.addToOutput("You don't have enough magic energy to cast a spell!");
            return;
        }

        if (!this.gameState.inventory.includes('spell_book')) {
            this.addToOutput("You need a spell book to cast spells!");
            return;
        }

        switch (spell) {
            case 'heal':
            case 'healing':
                this.gameState.magic -= 10;
                this.gameState.health = Math.min(100, this.gameState.health + 25);
                this.addToOutput("✨ You cast a healing spell! (+25 health, -10 magic)");
                break;
            case 'light':
                this.gameState.magic -= 5;
                this.addToOutput("🔮 You cast a light spell! The area around you glows brightly.");
                break;
            default:
                this.addToOutput("You don't know that spell. Try 'heal' or 'light'.");
        }
    }

    static examineCommand(target) {
        const descriptions = {
            sword: "A rusty but serviceable sword. It looks like it could still be useful in combat.",
            bread: "A simple loaf of bread. It looks filling and nutritious.",
            key: "An ornate golden key with mysterious runes carved into it.",
            torch: "A wooden torch that burns with a steady flame.",
            shield: "A sturdy wooden shield with metal reinforcements.",
            spell_book: "An ancient tome filled with magical incantations and mystical symbols.",
            potion: "A small blue bottle containing a swirling magical liquid.",
            healing_herb: "A green herb that radiates a soothing aura.",
            crystal_of_power: "A magnificent crystal that pulses with inner light and magical energy!"
        };

        const itemKey = this.findItemKey(target);

        if (itemKey && descriptions[itemKey]) {
            this.addToOutput(descriptions[itemKey]);
        } else {
            this.addToOutput(`You don't see anything special about the ${target}.`);
        }
    }

    static inventoryCommand() {
        if (this.gameState.inventory.length === 0) {
            this.addToOutput("Your inventory is empty.");
        } else {
            const items = this.gameState.inventory.map(item => this.getItemName(item)).join(', ');
            this.addToOutput(`You are carrying: ${items}`);
        }
    }

    static helpCommand() {
        const helpText = `
**Available Commands:**
• **Movement:** north, south, east, west (or n, s, e, w)
• **Look:** look, look around, examine [item]
• **Items:** take [item], drop [item], use [item]
• **Inventory:** inventory (or inv, i)
• **Combat:** attack [target]
• **Magic:** cast [spell] (requires spell book)
• **Game:** help, new game, save, load

**Tips:**
• Explore all areas to find items and increase your score
• Use items like healing herbs and potions to restore health and magic
• Some areas may have monsters that need to be defeated
• Your goal is to find the Crystal of Power hidden in the castle
        `;
        this.addToOutput(helpText);
    }

    static newGame() {
        if (confirm('Start a new game? This will reset all progress.')) {
            this.gameState = this.getInitialGameState();
            this.commandHistory = [];
            this.clearOutput();
            this.addToOutput("🏰 **New Adventure Begins!**", 'success');
            this.addToOutput("You stand before the mysterious castle once again...");
            this.lookCommand();
            this.updateDisplay();
            this.saveGameToStorage();
        }
    }

    static saveGame() {
        try {
            const saveData = {
                gameState: this.gameState,
                timestamp: new Date().toISOString()
            };
            localStorage.setItem('textadventure_save', JSON.stringify(saveData));
            this.addToOutput("Game saved successfully!", 'success');
        } catch (error) {
            this.addToOutput("Failed to save game.", 'error');
        }
    }

    static loadGame() {
        try {
            const saveData = localStorage.getItem('textadventure_save');
            if (saveData) {
                const parsed = JSON.parse(saveData);
                this.gameState = parsed.gameState;
                this.clearOutput();
                this.addToOutput("Game loaded successfully!", 'success');
                this.lookCommand();
                this.updateDisplay();
            } else {
                this.addToOutput("No saved game found.");
            }
        } catch (error) {
            this.addToOutput("Failed to load game.", 'error');
        }
    }

    static showHelp() {
        this.helpCommand();
    }

    // Helper methods
    static findItemKey(itemName) {
        const items = {
            sword: 'sword',
            bread: 'bread',
            key: 'key',
            torch: 'torch',
            shield: 'shield',
            'spell book': 'spell_book',
            book: 'spell_book',
            potion: 'potion',
            'healing herb': 'healing_herb',
            herb: 'healing_herb',
            'crystal of power': 'crystal_of_power',
            crystal: 'crystal_of_power'
        };

        return items[itemName.toLowerCase()];
    }

    static getItemName(itemKey) {
        const names = {
            sword: 'Rusty Sword',
            bread: 'Bread',
            key: 'Golden Key',
            torch: 'Torch',
            shield: 'Shield',
            spell_book: 'Spell Book',
            potion: 'Magic Potion',
            healing_herb: 'Healing Herb',
            crystal_of_power: 'Crystal of Power'
        };

        return names[itemKey] || itemKey;
    }

    static getMonsterName(monsterKey) {
        const names = {
            skeleton_guard: 'Skeleton Guard'
        };

        return names[monsterKey] || monsterKey;
    }

    static addToOutput(text, type = 'normal') {
        const output = this.currentWindow.querySelector('#story-output');
        const div = document.createElement('div');
        div.className = `game-output ${type}`;

        // Convert **text** to bold
        const formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        div.innerHTML = formattedText;

        output.appendChild(div);
        output.scrollTop = output.scrollHeight;
    }

    static clearOutput() {
        const output = this.currentWindow.querySelector('#story-output');
        output.innerHTML = `
            <div class="intro-text">
                <h3>Welcome to The Lost Castle Adventure!</h3>
                <p>You are a brave adventurer standing before a mysterious ancient castle. 
                Dark clouds gather overhead, and you can hear strange sounds echoing from within.</p>
                <p>Your quest is to find the legendary Crystal of Power hidden somewhere in the castle's depths.</p>
                <p class="command-prompt">What would you like to do?</p>
            </div>
        `;
    }

    static updateDisplay() {
        // Update health bar
        const healthBar = this.currentWindow.querySelector('#health-bar');
        const healthValue = this.currentWindow.querySelector('#health-value');
        if (healthBar && healthValue) {
            healthBar.style.width = this.gameState.health + '%';
            healthValue.textContent = this.gameState.health;
        }

        // Update magic bar
        const magicBar = this.currentWindow.querySelector('#magic-bar');
        const magicValue = this.currentWindow.querySelector('#magic-value');
        if (magicBar && magicValue) {
            magicBar.style.width = this.gameState.magic + '%';
            magicValue.textContent = this.gameState.magic;
        }

        // Update score
        const scoreValue = this.currentWindow.querySelector('#score-value');
        if (scoreValue) {
            scoreValue.textContent = this.gameState.score;
        }

        // Update location
        const locationName = this.currentWindow.querySelector('#current-location');
        const locationDesc = this.currentWindow.querySelector('#location-desc');
        const currentLoc = this.gameState.locations[this.gameState.location];

        if (locationName && locationDesc && currentLoc) {
            locationName.textContent = currentLoc.name;
            locationDesc.textContent = currentLoc.description;
        }

        // Update inventory
        const inventoryList = this.currentWindow.querySelector('#inventory-list');
        if (inventoryList) {
            inventoryList.innerHTML = this.gameState.inventory.length > 0
                ? this.gameState.inventory.map(item =>
                    `<div class="inventory-item">${this.getItemEmoji(item)} ${this.getItemName(item)}</div>`
                  ).join('')
                : '<div class="inventory-item" style="opacity: 0.5;">Empty</div>';
        }
    }

    static getItemEmoji(itemKey) {
        const emojis = {
            sword: '🗡️',
            bread: '🍞',
            key: '🗝️',
            torch: '🔦',
            shield: '🛡️',
            spell_book: '📚',
            potion: '🧪',
            healing_herb: '🌿',
            crystal_of_power: '💎'
        };

        return emojis[itemKey] || '📦';
    }

    static saveGameToStorage() {
        try {
            localStorage.setItem('textadventure_autosave', JSON.stringify(this.gameState));
        } catch (error) {
            console.log('Auto-save failed');
        }
    }

    static loadGameFromStorage() {
        try {
            const saved = localStorage.getItem('textadventure_autosave');
            if (saved) {
                this.gameState = JSON.parse(saved);
            }
        } catch (error) {
            console.log('Auto-load failed, using default state');
        }
    }

    static onClose(windowElement) {
        this.saveGameToStorage();
        return true;
    }
}

window.TextAdventure = TextAdventure;