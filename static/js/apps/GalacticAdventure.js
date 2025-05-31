/**
 * APP_METADATA
 * @name Galactic Hitchhiker RPG
 * @icon fas fa-book-open
 * @description A Whimsical Text-Based RPG Adventure
 * @category Games
 * @version 1.0.0
 * @author EmberFrame Team
 * @enabled true
 */

class GalacticHitchhikerRPG {
  // ═══════════════════════════════════════════════════════════════
  // CORE GAME PROPERTIES
  // ═══════════════════════════════════════════════════════════════
  static _container = null;
  static _gameState = 'menu';
  static _currentScene = 'start';
  static _textSpeed = 50; // ms per character
  static _isTyping = false;

  // Player Character
  static _player = {
    name: 'Arthur',
    level: 1,
    experience: 0,
    health: 100,
    maxHealth: 100,
    credits: 42,
    improbability: 0,
    towels: 1,

    // Stats
    wit: 10,
    panic: 5,
    luck: 7,
    bureaucracy: 3,

    // Inventory
    inventory: [
      { name: 'Towel', description: 'A rather useful item for interstellar travel', type: 'essential' },
      { name: 'Electronic Thumb', description: 'For hitchhiking across the galaxy', type: 'tool' }
    ],

    // Story progress
    storyFlags: {
      knowsAboutVogons: false,
      hasTeaExperience: false,
      metZaphod: false,
      solvedPuzzle: false,
      visitedRestaurant: false
    }
  };

  // Current conversation/scene data
  static _currentNPC = null;
  static _sceneHistory = [];

  // Save Data
  static _saveData = {
    playerProgress: null,
    unlockedAchievements: [],
    totalPlaytime: 0
  };

  // Game Scenes Database
  static _scenes = {
    start: {
      title: "The Beginning of the End",
      description: "You are Arthur Dent, and your day has started rather poorly. Your house is about to be demolished to make way for a bypass. Your friend Ford Prefect has just revealed he's from a small planet near Betelgeuse. And now he's telling you that the Earth itself is about to be demolished. \n\nThe yellow bulldozers sit outside your house like mechanical beasts, while Ford frantically waves what appears to be an electronic thumb at the sky.",
      image: "🏠",
      choices: [
        { text: "Lie down in front of the bulldozers", action: "bulldozer_protest", requires: null },
        { text: "Listen to Ford's explanation", action: "ford_explanation", requires: null },
        { text: "Go make a cup of tea to calm your nerves", action: "tea_time", requires: null },
        { text: "Check your towel supply", action: "towel_check", requires: null }
      ]
    },

    bulldozer_protest: {
      title: "Civil Disobedience",
      description: "You lie down defiantly in front of the lead bulldozer. The driver, Mr. Prosser, looks deeply uncomfortable. Several onlookers gather, including Mrs. Miggins from next door who appears to be knitting something impossible. \n\n'This is highly irregular!' shouts Mr. Prosser. 'We have a schedule to keep!' \n\nFord appears beside you, looking increasingly agitated as he stares at the sky.",
      image: "🚜",
      choices: [
        { text: "Negotiate with Mr. Prosser", action: "negotiate_prosser", requires: null },
        { text: "Ask Ford why he keeps looking at the sky", action: "ford_sky_concern", requires: null },
        { text: "Suggest they bulldoze someone else's house first", action: "redirect_demolition", requires: null },
        { text: "Dramatically quote from the planning regulations", action: "bureaucracy_battle", requires: { bureaucracy: 5 } }
      ]
    },

    ford_explanation: {
      title: "Cosmic Revelations",
      description: "Ford sits you down and explains that he is, in fact, a researcher for the Hitchhiker's Guide to the Galaxy. The Earth, he informs you with unsettling casualness, is scheduled for demolition in approximately twelve minutes to make way for a hyperspace bypass. \n\n'The planning charts and demolition orders have been on display at your local planning department in Alpha Centauri for fifty of your Earth years,' he says, as if this makes perfect sense.",
      image: "👽",
      choices: [
        { text: "Panic appropriately", action: "proper_panic", requires: null },
        { text: "Demand to see these planning charts", action: "bureaucratic_inquiry", requires: null },
        { text: "Ask about the Hitchhiker's Guide", action: "guide_explanation", requires: null },
        { text: "Wonder if this is all a very elaborate joke", action: "denial_phase", requires: null }
      ],
      onVisit: () => {
        GalacticHitchhikerRPG._player.storyFlags.knowsAboutVogons = true;
        GalacticHitchhikerRPG._addExperience(10);
      }
    },

    tea_time: {
      title: "The Importance of Tea",
      description: "You retreat to your kitchen and put the kettle on. There's something deeply comforting about the ritual of tea-making, even as your world (literally) falls apart around you. You find your favorite mug - the one with 'World's Best Primate' printed on it, which seemed funnier when you bought it. \n\nAs you wait for the water to boil, you notice Ford has followed you, and he's making increasingly urgent gestures.",
      image: "☕",
      choices: [
        { text: "Offer Ford a cup of tea", action: "share_tea", requires: null },
        { text: "Insist on proper tea ceremony despite circumstances", action: "tea_ceremony", requires: null },
        { text: "Use tea-making time to process recent information", action: "tea_meditation", requires: null },
        { text: "Ask Ford if aliens drink tea", action: "alien_tea_inquiry", requires: null }
      ],
      onVisit: () => {
        GalacticHitchhikerRPG._player.storyFlags.hasTeaExperience = true;
        GalacticHitchhikerRPG._player.panic = Math.max(0, GalacticHitchhikerRPG._player.panic - 2);
      }
    },

    towel_check: {
      title: "Towel Inventory",
      description: "You rush to your linen closet to check your towel supply. This proves to be a wise decision, as Ford has mentioned something about towels being tremendously useful for interstellar travel. You find several towels of varying quality: a large bath towel (slightly frayed), two hand towels (acceptable), and your prize possession - a small but highly absorbent travel towel with 'Don't Panic' embroidered on it in friendly letters.",
      image: "🏖️",
      choices: [
        { text: "Take the 'Don't Panic' towel", action: "panic_towel", requires: null },
        { text: "Grab multiple towels for trading", action: "towel_trader", requires: null },
        { text: "Ask Ford to explain the towel significance", action: "towel_wisdom", requires: null },
        { text: "Wrap yourself in towels for comfort", action: "towel_cocoon", requires: null }
      ]
    },

    negotiate_prosser: {
      title: "Bureaucratic Negotiations",
      description: "Mr. Prosser looks like a man who has never encountered civil disobedience and finds it deeply troubling. 'Look here, Mr. Dent,' he says, consulting a clipboard with the devotion of a monk reading scripture, 'we've got forms to file, schedules to keep, and a very important bypass to build. You can't just... lie there!' \n\nIn the distance, you notice Ford has taken out what appears to be a book and is reading it with increasing alarm.",
      image: "📋",
      choices: [
        { text: "Offer to move if he lies down in your place", action: "prosser_substitution", requires: null },
        { text: "Challenge the legal validity of the demolition", action: "legal_challenge", requires: { bureaucracy: 4 } },
        { text: "Suggest a compromise involving partial demolition", action: "compromise_proposal", requires: { wit: 8 } },
        { text: "Ask to see the planning permission in person", action: "planning_permission", requires: null }
      ]
    },

    proper_panic: {
      title: "A Measured Response",
      description: "You decide that this situation calls for a properly calibrated panic response. You begin with mild hyperventilation, progress through existential dread, and finish with a satisfying wail about the unfairness of it all. Ford nods approvingly. \n\n'Excellent panic form,' he comments. 'Very Earth-human. Most species just explode or turn into small puddles of concern. Now, we need to get to the pub before the Vogon Constructor Fleet arrives.'",
      image: "😱",
      choices: [
        { text: "Ask about Vogon Constructor Fleet", action: "vogon_inquiry", requires: null },
        { text: "Suggest the pub is a terrible place to hide", action: "pub_logic", requires: null },
        { text: "Continue panicking but follow Ford anyway", action: "panic_follow", requires: null },
        { text: "Demand more details about everything", action: "information_overload", requires: null }
      ]
    },

    share_tea: {
      title: "Interspecies Tea Sharing",
      description: "You prepare two cups of tea with the careful precision of someone maintaining sanity through routine. Ford accepts his cup with the polite confusion of someone who has never encountered Earl Grey before. He takes a sip, his eyes widen, and he makes a note in his electronic book. \n\n'Fascinating,' he murmurs. 'This leaf water induces a sense of false calm while simultaneously containing mild stimulants. No wonder your species survived this long.'",
      image: "🫖",
      choices: [
        { text: "Explain the cultural significance of tea", action: "tea_anthropology", requires: null },
        { text: "Ask what he's writing in that book", action: "guide_inquiry", requires: null },
        { text: "Offer biscuits to complete the experience", action: "biscuit_diplomacy", requires: null },
        { text: "Ask about beverages on other planets", action: "cosmic_beverages", requires: null }
      ]
    },

    panic_towel: {
      title: "The Don't Panic Towel",
      description: "You grab the 'Don't Panic' towel, and immediately feel slightly better. The embroidered letters seem to pulse with a comforting authority. Ford's eyes light up when he sees it. \n\n'Brilliant!' he exclaims. 'Where did you get that? It's almost like someone knew you'd need it for interstellar travel. Very suspicious. Very useful. The Guide says that any man who can hitch the length and breadth of the galaxy and still know where his towel is, is clearly a man to be reckoned with.'",
      image: "🌌",
      choices: [
        { text: "Ask who 'The Guide' is", action: "guide_explanation", requires: null },
        { text: "Wonder about the towel's mysterious origin", action: "towel_mystery", requires: null },
        { text: "Feel oddly prepared for galactic travel", action: "towel_confidence", requires: null },
        { text: "Question the practicality of towel-based respect", action: "towel_skepticism", requires: null }
      ],
      onVisit: () => {
        GalacticHitchhikerRPG._player.towels += 1;
        GalacticHitchhikerRPG._player.panic = Math.max(0, GalacticHitchhikerRPG._player.panic - 3);
        GalacticHitchhikerRPG._player.luck += 1;
      }
    },

    guide_explanation: {
      title: "The Hitchhiker's Guide to the Galaxy",
      description: "Ford produces a device that looks like a large calculator crossed with a small television. On its screen, the words 'DON'T PANIC' flash in large, friendly letters. \n\n'This,' Ford says with the pride of someone showing off their prize-winning vegetable marrow, 'is the Hitchhiker's Guide to the Galaxy. It's a sort of electronic book that tells you everything you need to know about anything. It's the standard repository for all knowledge and wisdom in the galaxy, and it has this to say about Earth: Mostly Harmless.'",
      image: "📱",
      choices: [
        { text: "Feel insulted by 'Mostly Harmless'", action: "earth_pride", requires: null },
        { text: "Ask to look up something in the Guide", action: "guide_lookup", requires: null },
        { text: "Wonder about the Guide's accuracy", action: "guide_reliability", requires: null },
        { text: "Ask how one becomes a researcher", action: "researcher_career", requires: null }
      ]
    },

    vogon_inquiry: {
      title: "Understanding Vogons",
      description: "Ford's expression grows grim as he explains about Vogons. 'They're bureaucrats, Arthur. The worst kind. They're slug-like creatures who think that the solution to any problem is the correct form filled out in triplicate. They're going to read poetry at us before they destroy the planet. Trust me, you don't want to hear Vogon poetry - it's the third worst in the universe.' \n\nJust then, massive yellow ships appear in the sky, blotting out the sun.",
      image: "🛸",
      choices: [
        { text: "Ask about the worst and second-worst poetry", action: "poetry_rankings", requires: null },
        { text: "Suggest hiding in the basement", action: "basement_plan", requires: null },
        { text: "Wonder if there's a complaint department", action: "vogon_complaints", requires: { bureaucracy: 6 } },
        { text: "Follow Ford's plan whatever it is", action: "trust_ford", requires: null }
      ]
    }
  };

  // ═══════════════════════════════════════════════════════════════
  // INITIALIZATION AND SETUP
  // ═══════════════════════════════════════════════════════════════

  static createWindow() {
    return {
      title: 'Galactic Hitchhiker RPG',
      width: '900px',
      height: '700px',
      content: `
        <div id="galactic-hitchhiker-rpg" style="position: relative; width: 100%; height: 100%; background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%); overflow: hidden; font-family: 'Courier New', 'Monaco', monospace; color: #00ff41;">
          
          <!-- Game Container -->
          <div id="game-container" style="display: flex; height: 100%; padding: 20px; gap: 20px;">
            
            <!-- Main Content Area -->
            <div id="main-content" style="flex: 2; display: flex; flex-direction: column; gap: 15px;">
              
              <!-- Story Display -->
              <div id="story-area" style="background: rgba(0, 20, 0, 0.8); border: 2px solid #00ff41; border-radius: 10px; padding: 20px; flex: 1; overflow-y: auto; position: relative;">
                <div id="scene-title" style="font-size: 24px; font-weight: bold; color: #ffff41; margin-bottom: 15px; text-align: center; text-shadow: 0 0 10px #ffff41;">Welcome to the Galaxy</div>
                <div id="scene-image" style="font-size: 48px; text-align: center; margin: 20px 0;">🌍</div>
                <div id="story-text" style="font-size: 16px; line-height: 1.6; color: #00ff41; min-height: 200px;">
                  Press "Start Adventure" to begin your improbable journey through space, time, and various uncomfortable situations involving bureaucratic aliens...
                </div>
              </div>

              <!-- Choice Buttons -->
              <div id="choices-area" style="background: rgba(0, 20, 0, 0.8); border: 2px solid #00ff41; border-radius: 10px; padding: 15px; min-height: 120px;">
                <div id="choices-title" style="color: #ffff41; font-weight: bold; margin-bottom: 10px;">What do you do?</div>
                <div id="choices-container" style="display: flex; flex-direction: column; gap: 8px;">
                  <button id="start-adventure-btn" class="choice-btn" style="background: linear-gradient(135deg, #003300, #006600); border: 1px solid #00ff41; color: #00ff41; padding: 12px; border-radius: 5px; cursor: pointer; transition: all 0.3s; font-family: inherit;">
                    Start Adventure
                  </button>
                </div>
              </div>
            </div>

            <!-- Character Panel -->
            <div id="character-panel" style="flex: 1; display: flex; flex-direction: column; gap: 15px;">
              
              <!-- Character Status -->
              <div id="character-status" style="background: rgba(0, 20, 0, 0.8); border: 2px solid #00ff41; border-radius: 10px; padding: 15px;">
                <h3 style="color: #ffff41; margin: 0 0 15px 0; text-align: center;">Character Status</h3>
                
                <div style="margin-bottom: 10px;">
                  <strong style="color: #ffff41;">Name:</strong> <span id="player-name">Arthur Dent</span>
                </div>
                
                <div style="margin-bottom: 10px;">
                  <strong style="color: #ffff41;">Level:</strong> <span id="player-level">1</span>
                </div>
                
                <div style="margin-bottom: 15px;">
                  <strong style="color: #ffff41;">Credits:</strong> <span id="player-credits">42</span>
                </div>
                
                <!-- Health Bar -->
                <div style="margin-bottom: 10px;">
                  <div style="color: #ffff41; font-size: 12px; margin-bottom: 3px;">Health</div>
                  <div style="background: #333; border: 1px solid #00ff41; border-radius: 3px; height: 8px; overflow: hidden;">
                    <div id="health-bar" style="background: linear-gradient(90deg, #ff4444, #44ff44); height: 100%; width: 100%; transition: width 0.3s;"></div>
                  </div>
                  <div style="font-size: 10px; color: #888;">
                    <span id="health-text">100/100</span>
                  </div>
                </div>
                
                <!-- Experience Bar -->
                <div style="margin-bottom: 15px;">
                  <div style="color: #ffff41; font-size: 12px; margin-bottom: 3px;">Experience</div>
                  <div style="background: #333; border: 1px solid #00ff41; border-radius: 3px; height: 8px; overflow: hidden;">
                    <div id="exp-bar" style="background: linear-gradient(90deg, #4444ff, #44ffff); height: 100%; width: 0%; transition: width 0.3s;"></div>
                  </div>
                  <div style="font-size: 10px; color: #888;">
                    <span id="exp-text">0/100</span>
                  </div>
                </div>

                <!-- Stats -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 12px;">
                  <div><strong style="color: #ffff41;">Wit:</strong> <span id="stat-wit">10</span></div>
                  <div><strong style="color: #ffff41;">Panic:</strong> <span id="stat-panic">5</span></div>
                  <div><strong style="color: #ffff41;">Luck:</strong> <span id="stat-luck">7</span></div>
                  <div><strong style="color: #ffff41;">Bureaucracy:</strong> <span id="stat-bureaucracy">3</span></div>
                </div>
              </div>

              <!-- Inventory -->
              <div id="inventory-panel" style="background: rgba(0, 20, 0, 0.8); border: 2px solid #00ff41; border-radius: 10px; padding: 15px; flex: 1; overflow-y: auto;">
                <h3 style="color: #ffff41; margin: 0 0 15px 0; text-align: center;">Inventory</h3>
                <div id="inventory-items" style="display: flex; flex-direction: column; gap: 8px;">
                  <!-- Inventory items will be populated here -->
                </div>
              </div>

              <!-- Menu Buttons -->
              <div id="menu-buttons" style="display: flex; flex-direction: column; gap: 8px;">
                <button id="save-game-btn" class="menu-btn" style="background: linear-gradient(135deg, #003366, #006699); border: 1px solid #00aaff; color: #00aaff; padding: 8px; border-radius: 5px; cursor: pointer; font-family: inherit;">
                  Save Game
                </button>
                <button id="load-game-btn" class="menu-btn" style="background: linear-gradient(135deg, #663300, #996600); border: 1px solid #ffaa00; color: #ffaa00; padding: 8px; border-radius: 5px; cursor: pointer; font-family: inherit;">
                  Load Game
                </button>
                <button id="help-btn" class="menu-btn" style="background: linear-gradient(135deg, #330066, #660099); border: 1px solid #aa00ff; color: #aa00ff; padding: 8px; border-radius: 5px; cursor: pointer; font-family: inherit;">
                  Help
                </button>
              </div>
            </div>
          </div>

          <!-- Help Modal -->
          <div id="help-modal" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.9); display: none; justify-content: center; align-items: center; z-index: 100;">
            <div style="background: rgba(0, 20, 0, 0.95); border: 2px solid #00ff41; border-radius: 15px; padding: 30px; max-width: 600px; max-height: 80%; overflow-y: auto;">
              <h2 style="color: #ffff41; text-align: center; margin-bottom: 20px;">How to Play</h2>
              <div style="color: #00ff41; line-height: 1.6;">
                <p><strong style="color: #ffff41;">Welcome to the Galactic Hitchhiker RPG!</strong></p>
                <p>This is a text-based adventure game inspired by Douglas Adams' masterpiece. You play as Arthur Dent, navigating the absurd universe after Earth's demolition.</p>
                
                <h3 style="color: #ffff41; margin: 20px 0 10px 0;">Gameplay:</h3>
                <ul>
                  <li>Read the story text and choose from available actions</li>
                  <li>Your choices affect the story and your character's development</li>
                  <li>Some choices require certain stats (Wit, Bureaucracy, etc.)</li>
                  <li>Gain experience to level up and unlock new abilities</li>
                  <li>Collect items and manage your inventory</li>
                </ul>

                <h3 style="color: #ffff41; margin: 20px 0 10px 0;">Stats:</h3>
                <ul>
                  <li><strong>Wit:</strong> Intelligence and clever solutions</li>
                  <li><strong>Panic:</strong> How much you're freaking out (lower is better)</li>
                  <li><strong>Luck:</strong> Random chance and fortunate accidents</li>
                  <li><strong>Bureaucracy:</strong> Understanding of forms and procedures</li>
                </ul>

                <h3 style="color: #ffff41; margin: 20px 0 10px 0;">Tips:</h3>
                <ul>
                  <li>Always carry a towel - it's tremendously useful</li>
                  <li>Don't panic (too much)</li>
                  <li>Question everything, especially if it involves forms</li>
                  <li>Save your game frequently</li>
                </ul>
              </div>
              <div style="text-align: center; margin-top: 20px;">
                <button id="close-help-btn" class="choice-btn" style="background: linear-gradient(135deg, #003300, #006600); border: 1px solid #00ff41; color: #00ff41; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-family: inherit;">
                  Got it!
                </button>
              </div>
            </div>
          </div>

          <style>
            .choice-btn:hover, .menu-btn:hover {
              transform: translateY(-2px);
              box-shadow: 0 4px 15px rgba(0, 255, 65, 0.3);
              filter: brightness(1.2);
            }

            .choice-btn:disabled {
              opacity: 0.5;
              cursor: not-allowed;
              filter: grayscale(1);
            }

            .choice-btn:disabled:hover {
              transform: none;
              box-shadow: none;
              filter: grayscale(1);
            }

            .inventory-item {
              background: rgba(0, 40, 0, 0.6);
              border: 1px solid #006600;
              border-radius: 5px;
              padding: 8px;
              cursor: pointer;
              transition: all 0.3s;
            }

            .inventory-item:hover {
              border-color: #00ff41;
              background: rgba(0, 60, 0, 0.8);
            }

            #story-area::-webkit-scrollbar, #inventory-panel::-webkit-scrollbar {
              width: 8px;
            }

            #story-area::-webkit-scrollbar-track, #inventory-panel::-webkit-scrollbar-track {
              background: rgba(0, 0, 0, 0.3);
              border-radius: 4px;
            }

            #story-area::-webkit-scrollbar-thumb, #inventory-panel::-webkit-scrollbar-thumb {
              background: #00ff41;
              border-radius: 4px;
            }

            @keyframes typing {
              from { width: 0 }
              to { width: 100% }
            }

            @keyframes blink {
              0%, 50% { border-color: transparent }
              51%, 100% { border-color: #00ff41 }
            }

            .typing-cursor {
              border-right: 2px solid #00ff41;
              animation: blink 1s infinite;
            }
          </style>
        </div>
      `,
      onInit: (container) => {
        GalacticHitchhikerRPG._container = container;
        GalacticHitchhikerRPG._init();
      },
      onDestroy: () => {
        GalacticHitchhikerRPG._cleanup();
      }
    };
  }

  static _init() {
    console.log('📚 Initializing Galactic Hitchhiker RPG');

    // Load save data
    GalacticHitchhikerRPG._loadGameData();

    // Setup event listeners
    GalacticHitchhikerRPG._setupEventListeners();

    // Update UI
    GalacticHitchhikerRPG._updateCharacterUI();
    GalacticHitchhikerRPG._updateInventoryUI();

    console.log('✅ RPG initialized successfully');
  }

  static _cleanup() {
    // Clean up any intervals or event listeners
    console.log('🧹 RPG cleaned up');
  }

  // ═══════════════════════════════════════════════════════════════
  // EVENT HANDLING
  // ═══════════════════════════════════════════════════════════════

  static _setupEventListeners() {
    const container = GalacticHitchhikerRPG._container;

    // Start adventure button
    const startBtn = container.querySelector('#start-adventure-btn');
    if (startBtn) {
      startBtn.addEventListener('click', () => {
        GalacticHitchhikerRPG._startGame();
      });
    }

    // Menu buttons
    const saveBtn = container.querySelector('#save-game-btn');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        GalacticHitchhikerRPG._saveGame();
      });
    }

    const loadBtn = container.querySelector('#load-game-btn');
    if (loadBtn) {
      loadBtn.addEventListener('click', () => {
        GalacticHitchhikerRPG._loadGame();
      });
    }

    const helpBtn = container.querySelector('#help-btn');
    if (helpBtn) {
      helpBtn.addEventListener('click', () => {
        GalacticHitchhikerRPG._showHelp();
      });
    }

    const closeHelpBtn = container.querySelector('#close-help-btn');
    if (closeHelpBtn) {
      closeHelpBtn.addEventListener('click', () => {
        GalacticHitchhikerRPG._hideHelp();
      });
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // GAME FLOW METHODS
  // ═══════════════════════════════════════════════════════════════

  static _startGame() {
    console.log('🚀 Starting galactic adventure');
    GalacticHitchhikerRPG._gameState = 'playing';
    GalacticHitchhikerRPG._currentScene = 'start';
    GalacticHitchhikerRPG._showScene('start');
  }

  static _showScene(sceneId) {
    const scene = GalacticHitchhikerRPG._scenes[sceneId];
    if (!scene) {
      console.error(`Scene ${sceneId} not found`);
      return;
    }

    // Add to history
    GalacticHitchhikerRPG._sceneHistory.push(sceneId);
    GalacticHitchhikerRPG._currentScene = sceneId;

    // Execute scene's onVisit function if it exists
    if (scene.onVisit) {
      scene.onVisit();
    }

    // Update UI
    GalacticHitchhikerRPG._updateSceneUI(scene);
    GalacticHitchhikerRPG._updateCharacterUI();
  }

  static _updateSceneUI(scene) {
    const container = GalacticHitchhikerRPG._container;

    // Update title
    const titleEl = container.querySelector('#scene-title');
    if (titleEl) titleEl.textContent = scene.title;

    // Update image
    const imageEl = container.querySelector('#scene-image');
    if (imageEl) imageEl.textContent = scene.image || '🌌';

    // Update story text with typing effect
    const storyEl = container.querySelector('#story-text');
    if (storyEl) {
      GalacticHitchhikerRPG._typeText(storyEl, scene.description);
    }

    // Update choices
    GalacticHitchhikerRPG._updateChoicesUI(scene.choices);
  }

  static _typeText(element, text) {
    if (GalacticHitchhikerRPG._isTyping) return;

    GalacticHitchhikerRPG._isTyping = true;
    element.textContent = '';
    element.classList.add('typing-cursor');

    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typeInterval);
        element.classList.remove('typing-cursor');
        GalacticHitchhikerRPG._isTyping = false;
      }
    }, GalacticHitchhikerRPG._textSpeed);
  }

  static _updateChoicesUI(choices) {
    const container = GalacticHitchhikerRPG._container;
    const choicesContainer = container.querySelector('#choices-container');

    if (!choicesContainer) return;

    // Clear existing choices
    choicesContainer.innerHTML = '';

    // Add new choices
    choices.forEach((choice, index) => {
      const button = document.createElement('button');
      button.className = 'choice-btn';
      button.style.cssText = 'background: linear-gradient(135deg, #003300, #006600); border: 1px solid #00ff41; color: #00ff41; padding: 12px; border-radius: 5px; cursor: pointer; transition: all 0.3s; font-family: inherit; width: 100%; text-align: left;';

      // Check requirements
      const canChoose = GalacticHitchhikerRPG._checkRequirements(choice.requires);

      if (canChoose) {
        button.textContent = choice.text;
        button.addEventListener('click', () => {
          GalacticHitchhikerRPG._handleChoice(choice);
        });
      } else {
        button.textContent = choice.text + ' (Requires higher stats)';
        button.disabled = true;
      }

      choicesContainer.appendChild(button);
    });
  }

  static _checkRequirements(requirements) {
    if (!requirements) return true;

    const player = GalacticHitchhikerRPG._player;

    for (const [stat, value] of Object.entries(requirements)) {
      if (player[stat] < value) {
        return false;
      }
    }

    return true;
  }

  static _handleChoice(choice) {
    console.log(`Player chose: ${choice.text}`);

    // Handle the choice action
    if (choice.action && GalacticHitchhikerRPG._scenes[choice.action]) {
      GalacticHitchhikerRPG._showScene(choice.action);
    } else {
      // Custom action handling could go here
      console.log(`Custom action: ${choice.action}`);
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // CHARACTER MANAGEMENT
  // ═══════════════════════════════════════════════════════════════

  static _updateCharacterUI() {
    const container = GalacticHitchhikerRPG._container;
    const player = GalacticHitchhikerRPG._player;

    // Update basic info
    const nameEl = container.querySelector('#player-name');
    if (nameEl) nameEl.textContent = player.name;

    const levelEl = container.querySelector('#player-level');
    if (levelEl) levelEl.textContent = player.level;

    const creditsEl = container.querySelector('#player-credits');
    if (creditsEl) creditsEl.textContent = player.credits;

    // Update health bar
    const healthBar = container.querySelector('#health-bar');
    const healthText = container.querySelector('#health-text');
    if (healthBar && healthText) {
      const healthPercent = (player.health / player.maxHealth) * 100;
      healthBar.style.width = `${healthPercent}%`;
      healthText.textContent = `${player.health}/${player.maxHealth}`;
    }

    // Update experience bar
    const expBar = container.querySelector('#exp-bar');
    const expText = container.querySelector('#exp-text');
    if (expBar && expText) {
      const expNeeded = player.level * 100;
      const expPercent = (player.experience / expNeeded) * 100;
      expBar.style.width = `${expPercent}%`;
      expText.textContent = `${player.experience}/${expNeeded}`;
    }

    // Update stats
    const statElements = {
      'stat-wit': player.wit,
      'stat-panic': player.panic,
      'stat-luck': player.luck,
      'stat-bureaucracy': player.bureaucracy
    };

    Object.entries(statElements).forEach(([id, value]) => {
      const el = container.querySelector(`#${id}`);
      if (el) el.textContent = value;
    });
  }

  static _updateInventoryUI() {
    const container = GalacticHitchhikerRPG._container;
    const inventoryContainer = container.querySelector('#inventory-items');

    if (!inventoryContainer) return;

    inventoryContainer.innerHTML = '';

    GalacticHitchhikerRPG._player.inventory.forEach((item, index) => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'inventory-item';
      itemDiv.innerHTML = `
        <div style="font-weight: bold; color: #ffff41; margin-bottom: 4px;">${item.name}</div>
        <div style="font-size: 11px; color: #cccccc;">${item.description}</div>
      `;

      itemDiv.addEventListener('click', () => {
        GalacticHitchhikerRPG._useItem(index);
      });

      inventoryContainer.appendChild(itemDiv);
    });

    // Add towel count if player has towels
    if (GalacticHitchhikerRPG._player.towels > 1) {
      const towelDiv = document.createElement('div');
      towelDiv.className = 'inventory-item';
      towelDiv.innerHTML = `
        <div style="font-weight: bold; color: #ffff41; margin-bottom: 4px;">Extra Towels (${GalacticHitchhikerRPG._player.towels - 1})</div>
        <div style="font-size: 11px; color: #cccccc;">Backup towels for emergency situations</div>
      `;
      inventoryContainer.appendChild(towelDiv);
    }
  }

  static _addExperience(amount) {
    GalacticHitchhikerRPG._player.experience += amount;

    // Check for level up
    const expNeeded = GalacticHitchhikerRPG._player.level * 100;
    if (GalacticHitchhikerRPG._player.experience >= expNeeded) {
      GalacticHitchhikerRPG._levelUp();
    }

    console.log(`+${amount} experience gained`);
  }

  static _levelUp() {
    GalacticHitchhikerRPG._player.level++;
    GalacticHitchhikerRPG._player.experience = 0;

    // Increase stats
    GalacticHitchhikerRPG._player.wit += 2;
    GalacticHitchhikerRPG._player.luck += 1;
    GalacticHitchhikerRPG._player.bureaucracy += 1;
    GalacticHitchhikerRPG._player.maxHealth += 20;
    GalacticHitchhikerRPG._player.health = GalacticHitchhikerRPG._player.maxHealth;

    console.log(`Level up! Now level ${GalacticHitchhikerRPG._player.level}`);
  }

  static _useItem(index) {
    const item = GalacticHitchhikerRPG._player.inventory[index];
    if (!item) return;

    console.log(`Used item: ${item.name}`);

    // Item-specific effects
    switch (item.name) {
      case 'Towel':
        GalacticHitchhikerRPG._player.panic = Math.max(0, GalacticHitchhikerRPG._player.panic - 2);
        console.log('Towel used. Panic reduced.');
        break;
      case 'Electronic Thumb':
        GalacticHitchhikerRPG._player.luck += 1;
        console.log('Electronic thumb used. Luck increased.');
        break;
    }

    GalacticHitchhikerRPG._updateCharacterUI();
  }

  // ═══════════════════════════════════════════════════════════════
  // SAVE/LOAD SYSTEM
  // ═══════════════════════════════════════════════════════════════

  static _saveGame() {
    try {
      const saveData = {
        player: GalacticHitchhikerRPG._player,
        currentScene: GalacticHitchhikerRPG._currentScene,
        sceneHistory: GalacticHitchhikerRPG._sceneHistory,
        gameState: GalacticHitchhikerRPG._gameState
      };

      localStorage.setItem('galacticHitchhikerRPGSave', JSON.stringify(saveData));
      console.log('Game saved successfully');

      // Visual feedback
      const container = GalacticHitchhikerRPG._container;
      const saveBtn = container.querySelector('#save-game-btn');
      if (saveBtn) {
        const originalText = saveBtn.textContent;
        saveBtn.textContent = 'Saved!';
        saveBtn.style.background = 'linear-gradient(135deg, #003300, #006600)';
        setTimeout(() => {
          saveBtn.textContent = originalText;
          saveBtn.style.background = 'linear-gradient(135deg, #003366, #006699)';
        }, 1000);
      }
    } catch (e) {
      console.warn('Could not save game data');
    }
  }

  static _loadGame() {
    try {
      const saved = localStorage.getItem('galacticHitchhikerRPGSave');
      if (saved) {
        const saveData = JSON.parse(saved);

        GalacticHitchhikerRPG._player = saveData.player;
        GalacticHitchhikerRPG._currentScene = saveData.currentScene;
        GalacticHitchhikerRPG._sceneHistory = saveData.sceneHistory || [];
        GalacticHitchhikerRPG._gameState = saveData.gameState;

        // Update UI
        GalacticHitchhikerRPG._showScene(GalacticHitchhikerRPG._currentScene);
        GalacticHitchhikerRPG._updateInventoryUI();

        console.log('Game loaded successfully');

        // Visual feedback
        const container = GalacticHitchhikerRPG._container;
        const loadBtn = container.querySelector('#load-game-btn');
        if (loadBtn) {
          const originalText = loadBtn.textContent;
          loadBtn.textContent = 'Loaded!';
          loadBtn.style.background = 'linear-gradient(135deg, #663300, #996600)';
          setTimeout(() => {
            loadBtn.textContent = originalText;
            loadBtn.style.background = 'linear-gradient(135deg, #663300, #996600)';
          }, 1000);
        }
      } else {
        console.log('No save data found');
      }
    } catch (e) {
      console.warn('Could not load game data');
    }
  }

  static _loadGameData() {
    // Load persistent save data
    try {
      const saved = localStorage.getItem('galacticHitchhikerRPGData');
      if (saved) {
        GalacticHitchhikerRPG._saveData = { ...GalacticHitchhikerRPG._saveData, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Could not load persistent game data');
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // UI HELPERS
  // ═══════════════════════════════════════════════════════════════

  static _showHelp() {
    const helpModal = GalacticHitchhikerRPG._container.querySelector('#help-modal');
    if (helpModal) {
      helpModal.style.display = 'flex';
    }
  }

  static _hideHelp() {
    const helpModal = GalacticHitchhikerRPG._container.querySelector('#help-modal');
    if (helpModal) {
      helpModal.style.display = 'none';
    }
  }
}

// Export for WindowManager
window.GalacticHitchhikerRPG = GalacticHitchhikerRPG;