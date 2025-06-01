/**
 * APP_METADATA
 * @name AppMaker 2.0
 * @icon fas fa-magic
 * @description Enhanced App Creation Wizard with Live Preview
 * @category Development
 * @version 2.0.0
 * @author EmberFrame Team
 * @enabled true
 */

class AppMaker {
  static _container = null;
  static _currentStep = 'welcome';
  static _appData = {
    name: '',
    icon: 'fas fa-star',
    description: '',
    category: 'Utilities',
    version: '1.0.0',
    author: 'Developer',
    template: 'basic'
  };

  static createWindow() {
    return {
      title: '🪄 AppMaker 2.0',
      width: '900px',
      height: '700px',
      content: `
        <div id="appmaker-2" style="height: 100%; display: flex; flex-direction: column; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          
          <!-- Header -->
          <div style="padding: 20px; text-align: center; background: rgba(0,0,0,0.2);">
            <h1 style="margin: 0; font-size: 28px; font-weight: 300;">🪄 AppMaker 2.0</h1>
            <p style="margin: 5px 0 0 0; opacity: 0.8;">Professional EmberFrame App Development Suite</p>
          </div>

          <!-- Progress Bar -->
          <div id="progress-bar" style="height: 4px; background: rgba(0,0,0,0.2); position: relative;">
            <div id="progress-fill" style="height: 100%; background: #00ff88; width: 0%; transition: width 0.3s ease;"></div>
          </div>

          <!-- Main Content -->
          <div id="main-content" style="flex: 1; padding: 30px; overflow-y: auto;">
            
            <!-- Welcome Step -->
            <div id="step-welcome" class="wizard-step">
              <div style="text-align: center; max-width: 600px; margin: 0 auto;">
                <div style="font-size: 64px; margin-bottom: 20px;">🚀</div>
                <h2 style="margin: 0 0 15px 0; font-weight: 300;">Welcome to AppMaker 2.0</h2>
                <p style="opacity: 0.9; line-height: 1.6; margin-bottom: 20px;">
                  Create professional EmberFrame applications with templates, live preview, and export options.
                </p>
                <div style="background: rgba(0,0,0,0.2); border-radius: 10px; padding: 20px; margin: 20px 0; text-align: left;">
                  <h3 style="margin: 0 0 15px 0;">✨ Features:</h3>
                  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                    <div>• 8 Professional Templates</div>
                    <div>• Live Code Preview</div>
                    <div>• Multiple Themes</div>
                    <div>• Code Snippets</div>
                    <div>• Export Options</div>
                    <div>• Complete Tutorial</div>
                  </div>
                </div>
                <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                  <button class="wizard-btn primary" onclick="AppMaker.nextStep()">🎯 Start Creating</button>
                  <button class="wizard-btn" onclick="AppMaker.showDemo()">👀 View Gallery</button>
                </div>
              </div>
            </div>

            <!-- App Details Step -->
            <div id="step-details" class="wizard-step" style="display: none;">
              <h2 style="margin: 0 0 25px 0; font-weight: 300;">📋 App Configuration</h2>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; max-width: 800px;">
                
                <div>
                  <h3 style="margin: 0 0 20px 0; font-size: 18px;">Basic Information</h3>
                  <div style="display: flex; flex-direction: column; gap: 15px;">
                    <div class="input-group">
                      <label>App Name *</label>
                      <input id="app-name" type="text" placeholder="My Awesome App" />
                    </div>
                    <div class="input-group">
                      <label>Description</label>
                      <textarea id="app-description" placeholder="What does your app do?" style="min-height: 60px; resize: vertical;"></textarea>
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                      <div class="input-group">
                        <label>Version</label>
                        <input id="app-version" type="text" placeholder="1.0.0" />
                      </div>
                      <div class="input-group">
                        <label>Author</label>
                        <input id="app-author" type="text" placeholder="Your Name" />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 style="margin: 0 0 20px 0; font-size: 18px;">Settings</h3>
                  <div style="display: flex; flex-direction: column; gap: 15px;">
                    <div class="input-group">
                      <label>Icon (FontAwesome)</label>
                      <input id="app-icon" type="text" placeholder="fas fa-star" />
                      <div style="display: flex; gap: 8px; margin-top: 8px; flex-wrap: wrap;">
                        <span class="icon-preset" data-icon="fas fa-star">⭐ Star</span>
                        <span class="icon-preset" data-icon="fas fa-rocket">🚀 Rocket</span>
                        <span class="icon-preset" data-icon="fas fa-cog">⚙️ Settings</span>
                        <span class="icon-preset" data-icon="fas fa-gamepad">🎮 Game</span>
                      </div>
                    </div>
                    <div class="input-group">
                      <label>Category</label>
                      <select id="app-category">
                        <option value="Utilities">🔧 Utilities</option>
                        <option value="Games">🎮 Games</option>
                        <option value="Development">💻 Development</option>
                        <option value="Entertainment">🎬 Entertainment</option>
                        <option value="Productivity">📈 Productivity</option>
                      </select>
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                      <div class="input-group">
                        <label>Width</label>
                        <select id="app-width">
                          <option value="400px" selected>400px</option>
                          <option value="600px">600px</option>
                          <option value="800px">800px</option>
                        </select>
                      </div>
                      <div class="input-group">
                        <label>Height</label>
                        <select id="app-height">
                          <option value="300px" selected>300px</option>
                          <option value="500px">500px</option>
                          <option value="700px">700px</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Template Selection Step -->
            <div id="step-template" class="wizard-step" style="display: none;">
              <h2 style="margin: 0 0 25px 0; font-weight: 300;">🎨 Choose Template</h2>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
                
                <div class="template-card" data-template="basic">
                  <div class="template-icon">📝</div>
                  <h3>Basic App</h3>
                  <p>Simple app with text, buttons, and basic interaction</p>
                </div>
                
                <div class="template-card" data-template="calculator">
                  <div class="template-icon">🧮</div>
                  <h3>Calculator</h3>
                  <p>Full-featured calculator with operations and display</p>
                </div>
                
                <div class="template-card" data-template="dashboard">
                  <div class="template-icon">📊</div>
                  <h3>Dashboard</h3>
                  <p>Data visualization with stats cards and charts</p>
                </div>
                
                <div class="template-card" data-template="todo">
                  <div class="template-icon">✅</div>
                  <h3>Todo List</h3>
                  <p>Task management with add, delete, and completion</p>
                </div>
                
                <div class="template-card" data-template="timer">
                  <div class="template-icon">⏱️</div>
                  <h3>Timer</h3>
                  <p>Countdown timer and stopwatch functionality</p>
                </div>
                
                <div class="template-card" data-template="game">
                  <div class="template-icon">🎮</div>
                  <h3>Number Game</h3>
                  <p>Interactive guessing game with score tracking</p>
                </div>
                
                <div class="template-card" data-template="form">
                  <div class="template-icon">📋</div>
                  <h3>Contact Form</h3>
                  <p>Professional form with validation</p>
                </div>
                
                <div class="template-card" data-template="chat">
                  <div class="template-icon">💬</div>
                  <h3>Chat Interface</h3>
                  <p>Chat-like interface with message bubbles</p>
                </div>
              </div>
            </div>

            <!-- Code Editor Step -->
            <div id="step-code" class="wizard-step" style="display: none;">
              <h2 style="margin: 0 0 20px 0; font-weight: 300;">💻 Code Editor</h2>
              
              <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 15px; gap: 15px;">
                <div style="display: flex; gap: 10px;">
                  <button class="wizard-btn small" onclick="AppMaker.resetCode()">🔄 Reset</button>
                  <button class="wizard-btn small" onclick="AppMaker.validateCode()">✅ Validate</button>
                </div>
                <div style="display: flex; gap: 10px;">
                  <button class="wizard-btn small" onclick="AppMaker.updatePreview()">🔄 Preview</button>
                  <span id="code-status" style="font-size: 12px; opacity: 0.7;">Ready</span>
                </div>
              </div>

              <div style="display: flex; gap: 20px; height: 400px;">
                <div style="flex: 1; display: flex; flex-direction: column;">
                  <div style="margin-bottom: 10px;">
                    <span style="font-weight: 500;">JavaScript Code</span>
                  </div>
                  <textarea id="code-editor" style="flex: 1; background: #1e1e1e; color: #d4d4d4; border: none; border-radius: 8px; padding: 15px; font-family: 'Fira Code', 'Consolas', monospace; font-size: 14px; resize: none; outline: none; line-height: 1.5;"></textarea>
                </div>
                <div style="flex: 1; display: flex; flex-direction: column;">
                  <div style="margin-bottom: 10px;">
                    <span style="font-weight: 500;">Live Preview</span>
                  </div>
                  <div id="preview-container" style="flex: 1; background: white; border-radius: 8px; padding: 15px; color: #333; overflow: auto;">
                    <p style="color: #666; text-align: center; margin-top: 50px;">Preview will appear here...</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Export Step -->
            <div id="step-export" class="wizard-step" style="display: none;">
              <div style="text-align: center; max-width: 600px; margin: 0 auto;">
                <div style="font-size: 64px; margin-bottom: 20px;">🎉</div>
                <h2 style="margin: 0 0 15px 0; font-weight: 300;">Ready to Export!</h2>
                
                <div id="export-summary" style="background: rgba(0,0,0,0.2); border-radius: 10px; padding: 20px; margin: 20px 0; text-align: left;">
                  <!-- Summary will be populated here -->
                </div>

                <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                  <button class="wizard-btn primary" onclick="AppMaker.exportApp()">💾 Download App</button>
                  <button class="wizard-btn" onclick="AppMaker.testApp()">🧪 Test App</button>
                  <button class="wizard-btn" onclick="AppMaker.startOver()">🔄 Start Over</button>
                </div>
              </div>
            </div>

            <!-- Demo Gallery -->
            <div id="step-demo" class="wizard-step" style="display: none;">
              <h2 style="margin: 0 0 20px 0; font-weight: 300;">🎨 Template Gallery</h2>
              
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
                <div class="demo-card">
                  <div style="background: linear-gradient(45deg, #007acc, #00d4ff); padding: 20px; color: white; text-align: center; border-radius: 8px;">
                    <h3 style="margin: 0 0 10px 0;">🧮 Calculator</h3>
                    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 5px; max-width: 150px; margin: 0 auto;">
                      <button style="padding: 8px; background: rgba(255,255,255,0.2); border: none; border-radius: 3px; color: white;">7</button>
                      <button style="padding: 8px; background: rgba(255,255,255,0.2); border: none; border-radius: 3px; color: white;">8</button>
                      <button style="padding: 8px; background: rgba(255,255,255,0.2); border: none; border-radius: 3px; color: white;">9</button>
                      <button style="padding: 8px; background: rgba(255,255,255,0.3); border: none; border-radius: 3px; color: white;">÷</button>
                    </div>
                  </div>
                  <div style="padding: 15px; background: rgba(255,255,255,0.1); border-radius: 0 0 8px 8px;">
                    <h4 style="margin: 0 0 8px 0;">Calculator Template</h4>
                    <p style="margin: 0; font-size: 14px; opacity: 0.8;">Full-featured calculator with memory</p>
                  </div>
                </div>

                <div class="demo-card">
                  <div style="background: #f8f9fa; padding: 20px; color: #333; border-radius: 8px;">
                    <h3 style="margin: 0 0 15px 0;">📊 Dashboard</h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                      <div style="background: #007acc; color: white; padding: 10px; border-radius: 4px; text-align: center; font-size: 12px;">
                        <div style="font-weight: bold;">1,234</div>
                        <div style="opacity: 0.8;">Users</div>
                      </div>
                      <div style="background: #28a745; color: white; padding: 10px; border-radius: 4px; text-align: center; font-size: 12px;">
                        <div style="font-weight: bold;">98%</div>
                        <div style="opacity: 0.8;">Uptime</div>
                      </div>
                    </div>
                  </div>
                  <div style="padding: 15px; background: rgba(255,255,255,0.1); border-radius: 0 0 8px 8px;">
                    <h4 style="margin: 0 0 8px 0;">Dashboard Template</h4>
                    <p style="margin: 0; font-size: 14px; opacity: 0.8;">Analytics with real-time data</p>
                  </div>
                </div>
              </div>
              
              <div style="text-align: center; margin-top: 30px;">
                <button class="wizard-btn" onclick="AppMaker.goToStep('welcome')">← Back to Start</button>
              </div>
            </div>

          </div>

          <!-- Navigation -->
          <div style="padding: 20px; background: rgba(0,0,0,0.2); display: flex; justify-content: space-between; align-items: center;">
            <button id="back-btn" class="wizard-btn" onclick="AppMaker.prevStep()" style="visibility: hidden;">← Back</button>
            <div id="step-indicator" style="display: flex; gap: 8px;">
              <div class="step-dot active"></div>
              <div class="step-dot"></div>
              <div class="step-dot"></div>
              <div class="step-dot"></div>
              <div class="step-dot"></div>
            </div>
            <button id="next-btn" class="wizard-btn primary" onclick="AppMaker.nextStep()" style="visibility: hidden;">Next →</button>
          </div>

        </div>

        <style>
          .wizard-step {
            animation: fadeIn 0.3s ease;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .wizard-btn {
            background: rgba(255,255,255,0.2);
            color: white;
            border: 1px solid rgba(255,255,255,0.3);
            padding: 12px 20px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.2s ease;
            font-family: inherit;
          }

          .wizard-btn:hover {
            background: rgba(255,255,255,0.3);
            transform: translateY(-1px);
          }

          .wizard-btn.primary {
            background: #00ff88;
            color: #1a1a1a;
            border-color: #00ff88;
          }

          .wizard-btn.small {
            padding: 6px 12px;
            font-size: 12px;
          }

          .input-group {
            display: flex;
            flex-direction: column;
            gap: 5px;
          }

          .input-group label {
            font-weight: 500;
            font-size: 14px;
          }

          .input-group input, .input-group select, .input-group textarea {
            background: rgba(255,255,255,0.9);
            border: 1px solid rgba(255,255,255,0.3);
            padding: 10px;
            border-radius: 6px;
            font-size: 14px;
            color: #333;
            font-family: inherit;
          }

          .input-group input:focus, .input-group select:focus, .input-group textarea:focus {
            outline: none;
            border-color: #00ff88;
            box-shadow: 0 0 0 2px rgba(0,255,136,0.2);
          }

          .icon-preset {
            background: rgba(255,255,255,0.1);
            border: 1px solid rgba(255,255,255,0.2);
            border-radius: 4px;
            padding: 4px 8px;
            font-size: 11px;
            cursor: pointer;
            transition: all 0.2s ease;
          }

          .icon-preset:hover, .icon-preset.selected {
            background: rgba(0,255,136,0.2);
            border-color: #00ff88;
          }

          .template-card {
            background: rgba(255,255,255,0.1);
            border: 2px solid rgba(255,255,255,0.2);
            border-radius: 10px;
            padding: 20px;
            text-align: center;
            cursor: pointer;
            transition: all 0.2s ease;
          }

          .template-card:hover {
            background: rgba(255,255,255,0.2);
            border-color: #00ff88;
            transform: translateY(-2px);
          }

          .template-card.selected {
            border-color: #00ff88;
            background: rgba(0,255,136,0.1);
          }

          .template-icon {
            font-size: 32px;
            margin-bottom: 10px;
          }

          .template-card h3 {
            margin: 0 0 8px 0;
            font-weight: 500;
          }

          .template-card p {
            margin: 0;
            opacity: 0.8;
            font-size: 14px;
          }

          .demo-card {
            background: rgba(255,255,255,0.1);
            border: 1px solid rgba(255,255,255,0.2);
            border-radius: 10px;
            overflow: hidden;
            transition: all 0.2s ease;
          }

          .demo-card:hover {
            transform: translateY(-4px);
            border-color: #00ff88;
          }

          .step-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: rgba(255,255,255,0.3);
            transition: all 0.2s ease;
          }

          .step-dot.active {
            background: #00ff88;
            transform: scale(1.2);
          }

          .step-dot.completed {
            background: white;
          }
        </style>
      `,
      onInit: (container) => {
        AppMaker.init(container);
      },
      onDestroy: () => {
        AppMaker.cleanup();
      }
    };
  }

  static init(container) {
    console.log('🪄 AppMaker 2.0 initializing...');
    AppMaker._container = container;
    AppMaker.setupEventListeners();
    AppMaker.updateUI();
    console.log('✅ AppMaker 2.0 ready!');
  }

  static cleanup() {
    AppMaker._container = null;
    AppMaker._currentStep = 'welcome';
  }

  static setupEventListeners() {
    // Template selection
    AppMaker._container.querySelectorAll('.template-card').forEach(card => {
      card.addEventListener('click', () => {
        AppMaker._container.querySelectorAll('.template-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        AppMaker._appData.template = card.dataset.template;
      });
    });

    // Icon presets
    AppMaker._container.querySelectorAll('.icon-preset').forEach(preset => {
      preset.addEventListener('click', () => {
        AppMaker._container.querySelectorAll('.icon-preset').forEach(p => p.classList.remove('selected'));
        preset.classList.add('selected');
        AppMaker._container.querySelector('#app-icon').value = preset.dataset.icon;
        AppMaker._appData.icon = preset.dataset.icon;
      });
    });

    // Form inputs
    ['app-name', 'app-icon', 'app-description', 'app-category', 'app-version', 'app-author', 'app-width', 'app-height'].forEach(id => {
      const element = AppMaker._container.querySelector(`#${id}`);
      if (element) {
        element.addEventListener('input', () => {
          const key = id.replace('app-', '');
          AppMaker._appData[key] = element.value;
        });
      }
    });
  }

  static updateUI() {
    // Show current step
    AppMaker._container.querySelectorAll('.wizard-step').forEach(step => {
      step.style.display = 'none';
    });
    const currentStepEl = AppMaker._container.querySelector(`#step-${AppMaker._currentStep}`);
    if (currentStepEl) currentStepEl.style.display = 'block';

    // Update progress
    const steps = ['welcome', 'details', 'template', 'code', 'export'];
    const currentIndex = steps.indexOf(AppMaker._currentStep);
    const progress = ['demo'].includes(AppMaker._currentStep) ? 0 : (currentIndex / (steps.length - 1)) * 100;
    AppMaker._container.querySelector('#progress-fill').style.width = progress + '%';

    // Update step dots
    AppMaker._container.querySelectorAll('.step-dot').forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
      dot.classList.toggle('completed', index < currentIndex);
    });

    // Update navigation
    const backBtn = AppMaker._container.querySelector('#back-btn');
    const nextBtn = AppMaker._container.querySelector('#next-btn');

    backBtn.style.visibility = currentIndex > 0 && AppMaker._currentStep !== 'demo' ? 'visible' : 'hidden';
    nextBtn.style.visibility = currentIndex < steps.length - 1 && AppMaker._currentStep !== 'demo' ? 'visible' : 'hidden';
  }

  static nextStep() {
    const steps = ['welcome', 'details', 'template', 'code', 'export'];
    const currentIndex = steps.indexOf(AppMaker._currentStep);

    if (currentIndex < steps.length - 1) {
      AppMaker._currentStep = steps[currentIndex + 1];

      if (AppMaker._currentStep === 'code') {
        AppMaker.generateCode();
      } else if (AppMaker._currentStep === 'export') {
        AppMaker.updateExportSummary();
      }

      AppMaker.updateUI();
    }
  }

  static prevStep() {
    const steps = ['welcome', 'details', 'template', 'code', 'export'];
    const currentIndex = steps.indexOf(AppMaker._currentStep);

    if (currentIndex > 0) {
      AppMaker._currentStep = steps[currentIndex - 1];
      AppMaker.updateUI();
    }
  }

  static goToStep(step) {
    AppMaker._currentStep = step;
    AppMaker.updateUI();
  }

  static showDemo() {
    AppMaker._currentStep = 'demo';
    AppMaker.updateUI();
  }

  static generateCode() {
    const className = AppMaker.getClassName();
    const templates = {
      basic: `class ${className} {
  static createWindow() {
    return {
      title: '${AppMaker._appData.name || 'My App'}',
      width: '${AppMaker._appData.width || '400px'}',
      height: '${AppMaker._appData.height || '300px'}',
      content: \`<div style="padding: 20px; font-family: Arial, sans-serif;">
  <h2>${AppMaker._appData.name || 'My App'}</h2>
  <p>${AppMaker._appData.description || 'Welcome to my app!'}</p>
  <button id="demo-btn" style="padding: 10px 20px; background: #007acc; color: white; border: none; border-radius: 4px; cursor: pointer;">
    Click Me!
  </button>
</div>\`,
      onInit: (container) => {
        const btn = container.querySelector('#demo-btn');
        if (btn) {
          btn.addEventListener('click', () => {
            alert('Hello from ${AppMaker._appData.name || 'My App'}!');
          });
        }
      }
    };
  }
}`,

      calculator: `class ${className} {
  static _display = null;
  static _current = '0';

  static createWindow() {
    return {
      title: '${AppMaker._appData.name || 'Calculator'}',
      width: '${AppMaker._appData.width || '300px'}',
      height: '${AppMaker._appData.height || '400px'}',
      content: \`<div style="padding: 20px; font-family: Arial, sans-serif;">
  <div id="display" style="background: #f0f0f0; padding: 15px; margin-bottom: 15px; text-align: right; font-size: 18px; border-radius: 4px; min-height: 20px;">\${${className}._current}</div>
  <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px;">
    <button onclick="${className}.calc('C')" style="padding: 15px; background: #ff6b6b; color: white; border: none; border-radius: 4px; cursor: pointer;">C</button>
    <button onclick="${className}.calc('/')" style="padding: 15px; background: #4ecdc4; color: white; border: none; border-radius: 4px; cursor: pointer;">÷</button>
    <button onclick="${className}.calc('*')" style="padding: 15px; background: #4ecdc4; color: white; border: none; border-radius: 4px; cursor: pointer;">×</button>
    <button onclick="${className}.calc('-')" style="padding: 15px; background: #4ecdc4; color: white; border: none; border-radius: 4px; cursor: pointer;">−</button>
    <button onclick="${className}.calc('7')" style="padding: 15px; background: #95e1d3; border: none; border-radius: 4px; cursor: pointer;">7</button>
    <button onclick="${className}.calc('8')" style="padding: 15px; background: #95e1d3; border: none; border-radius: 4px; cursor: pointer;">8</button>
    <button onclick="${className}.calc('9')" style="padding: 15px; background: #95e1d3; border: none; border-radius: 4px; cursor: pointer;">9</button>
    <button onclick="${className}.calc('+')" style="padding: 15px; background: #4ecdc4; color: white; border: none; border-radius: 4px; cursor: pointer;">+</button>
    <button onclick="${className}.calc('4')" style="padding: 15px; background: #95e1d3; border: none; border-radius: 4px; cursor: pointer;">4</button>
    <button onclick="${className}.calc('5')" style="padding: 15px; background: #95e1d3; border: none; border-radius: 4px; cursor: pointer;">5</button>
    <button onclick="${className}.calc('6')" style="padding: 15px; background: #95e1d3; border: none; border-radius: 4px; cursor: pointer;">6</button>
    <button onclick="${className}.calc('1')" style="padding: 15px; background: #95e1d3; border: none; border-radius: 4px; cursor: pointer;">1</button>
    <button onclick="${className}.calc('2')" style="padding: 15px; background: #95e1d3; border: none; border-radius: 4px; cursor: pointer;">2</button>
    <button onclick="${className}.calc('3')" style="padding: 15px; background: #95e1d3; border: none; border-radius: 4px; cursor: pointer;">3</button>
    <button onclick="${className}.calc('0')" style="padding: 15px; background: #95e1d3; border: none; border-radius: 4px; cursor: pointer; grid-column: span 2;">0</button>
    <button onclick="${className}.calc('.')" style="padding: 15px; background: #95e1d3; border: none; border-radius: 4px; cursor: pointer;">.</button>
    <button onclick="${className}.calc('=')" style="padding: 15px; background: #fce38a; border: none; border-radius: 4px; cursor: pointer;">=</button>
  </div>
</div>\`,
      onInit: (container) => {
        ${className}._display = container.querySelector('#display');
      }
    };
  }
  
  static calc(input) {
    if (input === 'C') {
      ${className}._current = '0';
    } else if (input === '=') {
      try {
        ${className}._current = eval(${className}._current).toString();
      } catch(e) {
        ${className}._current = 'Error';
      }
    } else {
      if (${className}._current === '0' && input !== '.') {
        ${className}._current = input;
      } else {
        ${className}._current += input;
      }
    }
    if (${className}._display) {
      ${className}._display.textContent = ${className}._current;
    }
  }
}`,

      todo: `class ${className} {
  static _tasks = [];
  static _container = null;

  static createWindow() {
    return {
      title: '${AppMaker._appData.name || 'Todo List'}',
      width: '${AppMaker._appData.width || '400px'}',
      height: '${AppMaker._appData.height || '500px'}',
      content: \`<div style="padding: 20px; font-family: Arial, sans-serif;">
  <h2>${AppMaker._appData.name || 'Todo List'}</h2>
  <div style="display: flex; gap: 10px; margin-bottom: 20px;">
    <input id="new-task" type="text" placeholder="Add new task..." style="flex: 1; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
    <button id="add-btn" style="padding: 10px 20px; background: #007acc; color: white; border: none; border-radius: 4px; cursor: pointer;">Add</button>
  </div>
  <div id="tasks-list"></div>
</div>\`,
      onInit: (container) => {
        ${className}._container = container;
        ${className}.setupEvents();
      }
    };
  }
  
  static setupEvents() {
    const addBtn = ${className}._container.querySelector('#add-btn');
    const input = ${className}._container.querySelector('#new-task');
    
    addBtn.addEventListener('click', () => ${className}.addTask());
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') ${className}.addTask();
    });
  }
  
  static addTask() {
    const input = ${className}._container.querySelector('#new-task');
    const text = input.value.trim();
    if (!text) return;
    
    ${className}._tasks.push({ id: Date.now(), text, done: false });
    ${className}.render();
    input.value = '';
  }
  
  static toggleTask(id) {
    const task = ${className}._tasks.find(t => t.id === id);
    if (task) {
      task.done = !task.done;
      ${className}.render();
    }
  }
  
  static deleteTask(id) {
    ${className}._tasks = ${className}._tasks.filter(t => t.id !== id);
    ${className}.render();
  }
  
  static render() {
    const list = ${className}._container.querySelector('#tasks-list');
    list.innerHTML = ${className}._tasks.map(task => \`
      <div style="display: flex; align-items: center; gap: 10px; padding: 10px; background: #f9f9f9; margin-bottom: 5px; border-radius: 4px;">
        <input type="checkbox" \${task.done ? 'checked' : ''} onchange="${className}.toggleTask(\${task.id})">
        <span style="flex: 1; \${task.done ? 'text-decoration: line-through; opacity: 0.6;' : ''}">\${task.text}</span>
        <button onclick="${className}.deleteTask(\${task.id})" style="background: #ff6b6b; color: white; border: none; border-radius: 3px; padding: 5px 10px; cursor: pointer;">Delete</button>
      </div>
    \`).join('');
  }
}`
    };

    const template = templates[AppMaker._appData.template] || templates.basic;
    AppMaker._container.querySelector('#code-editor').value = template;
    AppMaker.updatePreview();
  }

  static getClassName() {
    const name = AppMaker._appData.name || 'MyApp';
    return name.replace(/[^a-zA-Z0-9]/g, '') || 'MyApp';
  }

  static resetCode() {
    AppMaker.generateCode();
  }

  static validateCode() {
    try {
      const code = AppMaker._container.querySelector('#code-editor').value;
      new Function(code);
      AppMaker._container.querySelector('#code-status').textContent = '✅ Valid';
      AppMaker._container.querySelector('#code-status').style.color = '#28a745';
    } catch (e) {
      AppMaker._container.querySelector('#code-status').textContent = '❌ Error';
      AppMaker._container.querySelector('#code-status').style.color = '#dc3545';
    }
  }

  static updatePreview() {
    try {
      const code = AppMaker._container.querySelector('#code-editor').value;
      const preview = AppMaker._container.querySelector('#preview-container');

      const contentMatch = code.match(/content:\s*`([^`]+)`/s);
      if (contentMatch) {
        preview.innerHTML = contentMatch[1];
      } else {
        preview.innerHTML = '<p style="color: #666; text-align: center;">No preview available</p>';
      }
    } catch (e) {
      AppMaker._container.querySelector('#preview-container').innerHTML = '<p style="color: #dc3545;">Preview error</p>';
    }
  }

  static updateExportSummary() {
    const summary = AppMaker._container.querySelector('#export-summary');
    summary.innerHTML = `
      <div style="display: grid; grid-template-columns: auto 1fr; gap: 10px 20px;">
        <strong>Name:</strong> <span>${AppMaker._appData.name || 'Untitled'}</span>
        <strong>Description:</strong> <span>${AppMaker._appData.description || 'No description'}</span>
        <strong>Template:</strong> <span>${AppMaker._appData.template}</span>
        <strong>Size:</strong> <span>${AppMaker._appData.width || '400px'} × ${AppMaker._appData.height || '300px'}</span>
      </div>
    `;
  }

  static exportApp() {
    const className = AppMaker.getClassName();
    const code = AppMaker._container.querySelector('#code-editor').value;

    const metadata = `/**
 * APP_METADATA
 * @name ${AppMaker._appData.name || className}
 * @icon ${AppMaker._appData.icon || 'fas fa-star'}
 * @description ${AppMaker._appData.description || 'Generated with AppMaker 2.0'}
 * @category ${AppMaker._appData.category || 'Utilities'}
 * @version ${AppMaker._appData.version || '1.0.0'}
 * @author ${AppMaker._appData.author || 'Developer'}
 * @enabled true
 */

`;

    const finalCode = metadata + code + `\n\nwindow.${className} = ${className};`;

    const blob = new Blob([finalCode], { type: 'application/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${className}.js`;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  static testApp() {
    try {
      const code = AppMaker._container.querySelector('#code-editor').value;
      eval(code);
      const className = AppMaker.getClassName();
      if (window[className] && window[className].createWindow) {
        alert('✅ App code is valid and ready to use!');
      } else {
        alert('⚠️ App may be missing required structure.');
      }
    } catch (e) {
      alert('❌ App code has errors: ' + e.message);
    }
  }

  static startOver() {
    if (confirm('Start over? This will reset all progress.')) {
      AppMaker._appData = {
        name: '', icon: 'fas fa-star', description: '', category: 'Utilities',
        version: '1.0.0', author: 'Developer', template: 'basic'
      };
      AppMaker._currentStep = 'welcome';
      AppMaker.updateUI();
    }
  }
}

window.AppMaker = AppMaker;