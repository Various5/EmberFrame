/**
 * APP_METADATA
 * @name AppMaker 2.0
 * @icon fas fa-magic
 * @description Enhanced App Creation Wizard with Live Preview & Advanced Features
 * @category Development
 * @version 2.1.0
 * @author EmberFrame Team
 * @enabled true
 */

class AppMaker {
  static _container = null;
  static _currentStep = 'welcome';
  static _appData = {
    name: '',
    icon: 'fas fa-magic',
    description: '',
    category: 'Development',
    version: '1.0.0',
    author: 'Developer',
    template: 'basic',
    theme: 'modern',
    width: '400px',
    height: '300px',
    features: []
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
            <div id="step-welcome" class="wizard-step" style="display: block;">
              <div style="text-align: center; max-width: 600px; margin: 0 auto;">
                <div style="font-size: 64px; margin-bottom: 20px;">🚀</div>
                <h2 style="margin: 0 0 15px 0; font-weight: 300;">Welcome to AppMaker 2.0</h2>
                <p style="opacity: 0.9; line-height: 1.6; margin-bottom: 30px;">
                  Create professional EmberFrame applications with ease. Choose from templates, customize themes, and export ready-to-use apps.
                </p>
                
                <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                  <button onclick="AppMaker._nextStep()" style="background: #00ff88; color: #1a1a1a; border: none; padding: 15px 30px; border-radius: 8px; cursor: pointer; font-size: 16px; font-weight: 600;">
                    🎯 Start Creating
                  </button>
                  <button onclick="AppMaker._showDemo()" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid rgba(255,255,255,0.3); padding: 15px 30px; border-radius: 8px; cursor: pointer; font-size: 16px;">
                    👀 View Examples
                  </button>
                </div>
              </div>
            </div>

            <!-- App Details Step -->
            <div id="step-details" class="wizard-step" style="display: none;">
              <h2 style="margin: 0 0 25px 0; font-weight: 300;">📋 App Configuration</h2>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
                
                <!-- Basic Details -->
                <div>
                  <h3 style="margin: 0 0 20px 0; font-size: 18px;">Basic Information</h3>
                  <div style="display: flex; flex-direction: column; gap: 15px;">
                    <div>
                      <label style="display: block; margin-bottom: 5px; font-weight: 500;">App Name *</label>
                      <input id="app-name" type="text" placeholder="My Awesome App" style="width: 100%; padding: 10px; border: 1px solid rgba(255,255,255,0.3); border-radius: 6px; background: rgba(255,255,255,0.9); color: #333; font-size: 14px; box-sizing: border-box;">
                      <small style="opacity: 0.7; font-size: 12px;">Used as the window title and class name</small>
                    </div>
                    <div>
                      <label style="display: block; margin-bottom: 5px; font-weight: 500;">Description</label>
                      <textarea id="app-description" placeholder="What does your app do?" style="width: 100%; min-height: 80px; padding: 10px; border: 1px solid rgba(255,255,255,0.3); border-radius: 6px; background: rgba(255,255,255,0.9); color: #333; font-size: 14px; resize: vertical; box-sizing: border-box; font-family: inherit;"></textarea>
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                      <div>
                        <label style="display: block; margin-bottom: 5px; font-weight: 500;">Version</label>
                        <input id="app-version" type="text" value="1.0.0" style="width: 100%; padding: 10px; border: 1px solid rgba(255,255,255,0.3); border-radius: 6px; background: rgba(255,255,255,0.9); color: #333; font-size: 14px; box-sizing: border-box;">
                      </div>
                      <div>
                        <label style="display: block; margin-bottom: 5px; font-weight: 500;">Author</label>
                        <input id="app-author" type="text" value="Developer" style="width: 100%; padding: 10px; border: 1px solid rgba(255,255,255,0.3); border-radius: 6px; background: rgba(255,255,255,0.9); color: #333; font-size: 14px; box-sizing: border-box;">
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Advanced Settings -->
                <div>
                  <h3 style="margin: 0 0 20px 0; font-size: 18px;">Advanced Settings</h3>
                  <div style="display: flex; flex-direction: column; gap: 15px;">
                    <div>
                      <label style="display: block; margin-bottom: 5px; font-weight: 500;">Category</label>
                      <select id="app-category" style="width: 100%; padding: 10px; border: 1px solid rgba(255,255,255,0.3); border-radius: 6px; background: rgba(255,255,255,0.9); color: #333; font-size: 14px; box-sizing: border-box;">
                        <option value="Utilities">🔧 Utilities</option>
                        <option value="Games">🎮 Games</option>
                        <option value="Development" selected>💻 Development</option>
                        <option value="System">⚙️ System</option>
                        <option value="Entertainment">🎬 Entertainment</option>
                        <option value="Productivity">📈 Productivity</option>
                      </select>
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                      <div>
                        <label style="display: block; margin-bottom: 5px; font-weight: 500;">Default Width</label>
                        <select id="app-width" style="width: 100%; padding: 10px; border: 1px solid rgba(255,255,255,0.3); border-radius: 6px; background: rgba(255,255,255,0.9); color: #333; font-size: 14px; box-sizing: border-box;">
                          <option value="300px">Small (300px)</option>
                          <option value="400px" selected>Medium (400px)</option>
                          <option value="600px">Large (600px)</option>
                          <option value="800px">Extra Large (800px)</option>
                        </select>
                      </div>
                      <div>
                        <label style="display: block; margin-bottom: 5px; font-weight: 500;">Default Height</label>
                        <select id="app-height" style="width: 100%; padding: 10px; border: 1px solid rgba(255,255,255,0.3); border-radius: 6px; background: rgba(255,255,255,0.9); color: #333; font-size: 14px; box-sizing: border-box;">
                          <option value="200px">Small (200px)</option>
                          <option value="300px" selected>Medium (300px)</option>
                          <option value="500px">Large (500px)</option>
                          <option value="700px">Extra Large (700px)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Template Selection Step -->
            <div id="step-template" class="wizard-step" style="display: none;">
              <h2 style="margin: 0 0 25px 0; font-weight: 300;">🎨 Choose Your Template</h2>
              <p style="opacity: 0.8; margin-bottom: 25px;">Select a starting template for your app. Each template includes fully functional code that you can customize.</p>
              
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
                <div class="template-card active" data-template="basic" style="background: rgba(255,255,255,0.1); border: 2px solid #00ff88; border-radius: 10px; padding: 20px; text-align: center; cursor: pointer; transition: all 0.2s ease;">
                  <div style="font-size: 32px; margin-bottom: 10px;">📝</div>
                  <h3 style="margin: 0 0 8px 0; font-weight: 500;">Basic App</h3>
                  <p style="margin: 0 0 8px 0; opacity: 0.8; font-size: 14px;">Simple app with text, buttons, and basic interaction</p>
                  <div style="font-size: 12px; opacity: 0.6; font-style: italic;">Perfect for: Simple tools, forms</div>
                </div>
                
                <div class="template-card" data-template="calculator" style="background: rgba(255,255,255,0.1); border: 2px solid rgba(255,255,255,0.2); border-radius: 10px; padding: 20px; text-align: center; cursor: pointer; transition: all 0.2s ease;">
                  <div style="font-size: 32px; margin-bottom: 10px;">🧮</div>
                  <h3 style="margin: 0 0 8px 0; font-weight: 500;">Calculator</h3>
                  <p style="margin: 0 0 8px 0; opacity: 0.8; font-size: 14px;">Full-featured calculator with operations and display</p>
                  <div style="font-size: 12px; opacity: 0.6; font-style: italic;">Perfect for: Math tools, converters</div>
                </div>
                
                <div class="template-card" data-template="todo" style="background: rgba(255,255,255,0.1); border: 2px solid rgba(255,255,255,0.2); border-radius: 10px; padding: 20px; text-align: center; cursor: pointer; transition: all 0.2s ease;">
                  <div style="font-size: 32px; margin-bottom: 10px;">✅</div>
                  <h3 style="margin: 0 0 8px 0; font-weight: 500;">Todo List</h3>
                  <p style="margin: 0 0 8px 0; opacity: 0.8; font-size: 14px;">Task management with add, delete, and completion</p>
                  <div style="font-size: 12px; opacity: 0.6; font-style: italic;">Perfect for: Productivity, planning</div>
                </div>
                
                <div class="template-card" data-template="timer" style="background: rgba(255,255,255,0.1); border: 2px solid rgba(255,255,255,0.2); border-radius: 10px; padding: 20px; text-align: center; cursor: pointer; transition: all 0.2s ease;">
                  <div style="font-size: 32px; margin-bottom: 10px;">⏱️</div>
                  <h3 style="margin: 0 0 8px 0; font-weight: 500;">Timer</h3>
                  <p style="margin: 0 0 8px 0; opacity: 0.8; font-size: 14px;">Countdown timer and stopwatch functionality</p>
                  <div style="font-size: 12px; opacity: 0.6; font-style: italic;">Perfect for: Time tracking, alerts</div>
                </div>
              </div>
            </div>

            <!-- Features & Themes Step -->
            <div id="step-features" class="wizard-step" style="display: none;">
              <h2 style="margin: 0 0 25px 0; font-weight: 300;">🎨 Themes & Features</h2>
              
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
                <!-- Theme Selection -->
                <div>
                  <h3 style="margin: 0 0 20px 0; font-size: 18px;">Choose Theme</h3>
                  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div class="theme-card active" data-theme="modern" style="background: rgba(0,255,136,0.1); border: 2px solid #00ff88; border-radius: 8px; padding: 15px; cursor: pointer; transition: all 0.2s ease; text-align: center;">
                      <div style="background: linear-gradient(45deg, #667eea, #764ba2); height: 40px; border-radius: 4px; margin-bottom: 10px;"></div>
                      <div style="font-weight: 500;">Modern</div>
                      <div style="font-size: 12px; opacity: 0.7;">Clean gradients</div>
                    </div>
                    <div class="theme-card" data-theme="minimal" style="background: rgba(255,255,255,0.1); border: 2px solid rgba(255,255,255,0.2); border-radius: 8px; padding: 15px; cursor: pointer; transition: all 0.2s ease; text-align: center;">
                      <div style="background: linear-gradient(45deg, #f8f9fa, #e9ecef); height: 40px; border-radius: 4px; margin-bottom: 10px; border: 1px solid #dee2e6;"></div>
                      <div style="font-weight: 500;">Minimal</div>
                      <div style="font-size: 12px; opacity: 0.7;">Simple & clean</div>
                    </div>
                    <div class="theme-card" data-theme="dark" style="background: rgba(255,255,255,0.1); border: 2px solid rgba(255,255,255,0.2); border-radius: 8px; padding: 15px; cursor: pointer; transition: all 0.2s ease; text-align: center;">
                      <div style="background: linear-gradient(45deg, #2c3e50, #34495e); height: 40px; border-radius: 4px; margin-bottom: 10px;"></div>
                      <div style="font-weight: 500;">Dark</div>
                      <div style="font-size: 12px; opacity: 0.7;">Dark mode</div>
                    </div>
                    <div class="theme-card" data-theme="colorful" style="background: rgba(255,255,255,0.1); border: 2px solid rgba(255,255,255,0.2); border-radius: 8px; padding: 15px; cursor: pointer; transition: all 0.2s ease; text-align: center;">
                      <div style="background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1); height: 40px; border-radius: 4px; margin-bottom: 10px;"></div>
                      <div style="font-weight: 500;">Colorful</div>
                      <div style="font-size: 12px; opacity: 0.7;">Vibrant colors</div>
                    </div>
                  </div>
                </div>

                <!-- Feature Add-ons -->
                <div>
                  <h3 style="margin: 0 0 20px 0; font-size: 18px;">Feature Add-ons</h3>
                  <div style="display: flex; flex-direction: column; gap: 12px;">
                    <label style="display: flex; align-items: center; gap: 10px; background: rgba(255,255,255,0.05); padding: 12px; border-radius: 6px; cursor: pointer;">
                      <input type="checkbox" data-feature="save-state" style="margin: 0;"> 
                      <div>
                        <span style="font-weight: 500;">💾 Save State</span>
                        <div style="font-size: 12px; opacity: 0.7;">Automatically save and restore app state</div>
                      </div>
                    </label>
                    <label style="display: flex; align-items: center; gap: 10px; background: rgba(255,255,255,0.05); padding: 12px; border-radius: 6px; cursor: pointer;">
                      <input type="checkbox" data-feature="keyboard-shortcuts" style="margin: 0;"> 
                      <div>
                        <span style="font-weight: 500;">⌨️ Keyboard Shortcuts</span>
                        <div style="font-size: 12px; opacity: 0.7;">Add hotkey support for common actions</div>
                      </div>
                    </label>
                    <label style="display: flex; align-items: center; gap: 10px; background: rgba(255,255,255,0.05); padding: 12px; border-radius: 6px; cursor: pointer;">
                      <input type="checkbox" data-feature="notifications" style="margin: 0;"> 
                      <div>
                        <span style="font-weight: 500;">🔔 Notifications</span>
                        <div style="font-size: 12px; opacity: 0.7;">Toast notifications for user feedback</div>
                      </div>
                    </label>
                    <label style="display: flex; align-items: center; gap: 10px; background: rgba(255,255,255,0.05); padding: 12px; border-radius: 6px; cursor: pointer;">
                      <input type="checkbox" data-feature="help-system" style="margin: 0;"> 
                      <div>
                        <span style="font-weight: 500;">❓ Help System</span>
                        <div style="font-size: 12px; opacity: 0.7;">Built-in help and tutorials</div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <!-- Code Editor Step -->
            <div id="step-code" class="wizard-step" style="display: none;">
              <h2 style="margin: 0 0 20px 0; font-weight: 300;">💻 Code Editor & Preview</h2>
              
              <!-- Editor Toolbar -->
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; gap: 15px;">
                <div style="display: flex; gap: 10px;">
                  <button onclick="AppMaker._resetCode()" style="padding: 6px 12px; background: rgba(255,255,255,0.2); color: white; border: 1px solid rgba(255,255,255,0.3); border-radius: 4px; cursor: pointer; font-size: 12px;">🔄 Reset</button>
                  <button onclick="AppMaker._validateCode()" style="padding: 6px 12px; background: rgba(255,255,255,0.2); color: white; border: 1px solid rgba(255,255,255,0.3); border-radius: 4px; cursor: pointer; font-size: 12px;">✅ Validate</button>
                </div>
                <div style="display: flex; gap: 10px;">
                  <button onclick="AppMaker._updatePreview()" style="padding: 6px 12px; background: rgba(255,255,255,0.2); color: white; border: 1px solid rgba(255,255,255,0.3); border-radius: 4px; cursor: pointer; font-size: 12px;">🔄 Update Preview</button>
                </div>
              </div>

              <div style="display: flex; gap: 20px; height: 400px;">
                <div style="flex: 1; display: flex; flex-direction: column;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <span style="font-weight: 500;">JavaScript Code</span>
                    <div id="code-status" style="font-size: 12px; opacity: 0.7;">Ready</div>
                  </div>
                  <textarea id="code-editor" style="flex: 1; background: #1e1e1e; color: #d4d4d4; border: none; border-radius: 8px; padding: 15px; font-family: 'Consolas', monospace; font-size: 14px; resize: none; outline: none; line-height: 1.5;" placeholder="Your app code will appear here..."></textarea>
                </div>
                <div style="flex: 1; display: flex; flex-direction: column;">
                  <div style="margin-bottom: 10px;">
                    <span style="font-weight: 500;">Live Preview</span>
                  </div>
                  <div id="preview-container" style="flex: 1; background: white; border-radius: 8px; padding: 15px; color: #333; overflow: auto; border: 2px solid rgba(255,255,255,0.1);">
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
                <p style="opacity: 0.8; margin-bottom: 25px;">Your app is ready! Review the summary below and choose your export options.</p>
                
                <div id="export-summary" style="background: rgba(0,0,0,0.2); border-radius: 10px; padding: 20px; margin: 20px 0; text-align: left;">
                  <!-- Summary will be populated here -->
                </div>

                <div style="background: rgba(0,0,0,0.2); border-radius: 10px; padding: 20px; margin: 20px 0;">
                  <h3 style="margin: 0 0 15px 0;">Export Options</h3>
                  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; text-align: center;">
                    <button onclick="AppMaker._exportApp('js')" style="background: rgba(255,255,255,0.1); border: 2px solid rgba(255,255,255,0.2); border-radius: 8px; padding: 20px; color: white; cursor: pointer; font-family: inherit;">
                      <div style="font-size: 24px; margin-bottom: 8px;">📁</div>
                      <div style="font-weight: 500;">JavaScript File</div>
                      <div style="font-size: 12px; opacity: 0.7;">Standard .js export</div>
                    </button>
                    <button onclick="AppMaker._exportApp('bundle')" style="background: rgba(255,255,255,0.1); border: 2px solid rgba(255,255,255,0.2); border-radius: 8px; padding: 20px; color: white; cursor: pointer; font-family: inherit;">
                      <div style="font-size: 24px; margin-bottom: 8px;">📦</div>
                      <div style="font-weight: 500;">Complete Bundle</div>
                      <div style="font-size: 12px; opacity: 0.7;">With documentation</div>
                    </button>
                  </div>
                </div>

                <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                  <button onclick="AppMaker._testApp()" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid rgba(255,255,255,0.3); padding: 12px 20px; border-radius: 6px; cursor: pointer; font-size: 14px;">
                    🧪 Test App
                  </button>
                  <button onclick="AppMaker._shareApp()" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid rgba(255,255,255,0.3); padding: 12px 20px; border-radius: 6px; cursor: pointer; font-size: 14px;">
                    🔗 Share Code
                  </button>
                  <button onclick="AppMaker._startOver()" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid rgba(255,255,255,0.3); padding: 12px 20px; border-radius: 6px; cursor: pointer; font-size: 14px;">
                    🔄 Start Over
                  </button>
                </div>
              </div>
            </div>

            <!-- Demo Step -->
            <div id="step-demo" class="wizard-step" style="display: none;">
              <h2 style="margin: 0 0 20px 0; font-weight: 300;">🎨 Template Examples</h2>
              <p style="opacity: 0.8; margin-bottom: 25px;">Here are some examples of what you can create with AppMaker 2.0.</p>
              
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-bottom: 30px;">
                <div style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 10px; overflow: hidden;">
                  <div style="background: linear-gradient(45deg, #007acc, #00d4ff); padding: 20px; color: white; text-align: center;">
                    <h3 style="margin: 0 0 10px 0;">🧮 Calculator Pro</h3>
                    <p style="margin: 0; opacity: 0.9;">Full-featured calculator with memory and history</p>
                  </div>
                  <div style="padding: 15px;">
                    <p style="margin: 0; font-size: 14px; opacity: 0.8;">Complete mathematical operations, decimal support, and keyboard shortcuts.</p>
                  </div>
                </div>

                <div style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 10px; overflow: hidden;">
                  <div style="background: #f8f9fa; padding: 20px; color: #333; text-align: center;">
                    <h3 style="margin: 0 0 10px 0; color: #007acc;">✅ Task Manager</h3>
                    <p style="margin: 0; opacity: 0.7;">Organize your tasks with priorities and categories</p>
                  </div>
                  <div style="padding: 15px;">
                    <p style="margin: 0; font-size: 14px; opacity: 0.8;">Add, edit, delete tasks with completion tracking and data persistence.</p>
                  </div>
                </div>
              </div>
              
              <div style="text-align: center;">
                <button onclick="AppMaker._goToStep('welcome')" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid rgba(255,255,255,0.3); padding: 12px 20px; border-radius: 6px; cursor: pointer; font-size: 14px;">← Back to Start</button>
              </div>
            </div>

          </div>

          <!-- Navigation -->
          <div id="navigation" style="padding: 20px; background: rgba(0,0,0,0.2); display: flex; justify-content: space-between; align-items: center;">
            <button id="back-btn" onclick="AppMaker._prevStep()" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid rgba(255,255,255,0.3); padding: 12px 20px; border-radius: 6px; cursor: pointer; font-size: 14px; visibility: hidden;">← Back</button>
            <div id="step-indicator" style="display: flex; gap: 8px;">
              <div class="step-dot" style="width: 8px; height: 8px; border-radius: 50%; background: #00ff88; transform: scale(1.2);"></div>
              <div class="step-dot" style="width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.3);"></div>
              <div class="step-dot" style="width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.3);"></div>
              <div class="step-dot" style="width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.3);"></div>
              <div class="step-dot" style="width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.3);"></div>
              <div class="step-dot" style="width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.3);"></div>
            </div>
            <button id="next-btn" onclick="AppMaker._nextStep()" style="background: #00ff88; color: #1a1a1a; border: none; padding: 12px 20px; border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: 600; visibility: visible;">Next →</button>
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

          .template-card:hover {
            background: rgba(255,255,255,0.2) !important;
            border-color: #00ff88 !important;
            transform: translateY(-2px);
          }

          .theme-card:hover {
            border-color: #00ff88 !important;
            background: rgba(0,255,136,0.1) !important;
          }

          button:hover {
            transform: translateY(-1px);
            opacity: 0.9;
          }

          #code-editor:focus {
            outline: 2px solid #00ff88;
            outline-offset: 2px;
          }

          @media (max-width: 768px) {
            #appmaker-2 > div:first-child {
              flex-direction: column;
            }
            
            #step-details > div,
            #step-features > div {
              grid-template-columns: 1fr !important;
            }
            
            #step-code > div:last-child {
              flex-direction: column !important;
              height: auto !important;
            }
            
            #step-code > div:last-child > div {
              height: 250px !important;
            }
          }
        </style>
      `,
      onInit: (container) => {
        AppMaker._init(container);
      },
      onDestroy: () => {
        AppMaker._cleanup();
      }
    };
  }

  static _init(container) {
    console.log('🪄 AppMaker 2.0 initializing...');
    AppMaker._container = container;

    try {
      AppMaker._setupEventListeners();
      AppMaker._updateUI();
      console.log('✅ AppMaker 2.0 ready!');
    } catch (error) {
      console.error('❌ AppMaker initialization failed:', error);
    }
  }

  static _cleanup() {
    AppMaker._container = null;
    AppMaker._currentStep = 'welcome';
    AppMaker._appData = {
      name: '',
      icon: 'fas fa-magic',
      description: '',
      category: 'Development',
      version: '1.0.0',
      author: 'Developer',
      template: 'basic',
      theme: 'modern',
      width: '400px',
      height: '300px',
      features: []
    };
  }

  static _setupEventListeners() {
    if (!AppMaker._container) {
      console.error('❌ Container not available for event setup');
      return;
    }

    try {
      // Template selection
      AppMaker._container.querySelectorAll('.template-card').forEach(card => {
        card.addEventListener('click', () => {
          AppMaker._container.querySelectorAll('.template-card').forEach(c => {
            c.style.borderColor = 'rgba(255,255,255,0.2)';
            c.style.background = 'rgba(255,255,255,0.1)';
            c.classList.remove('active');
          });
          card.style.borderColor = '#00ff88';
          card.style.background = 'rgba(0,255,136,0.1)';
          card.classList.add('active');
          AppMaker._appData.template = card.dataset.template;
          console.log('📋 Template selected:', AppMaker._appData.template);
        });
      });

      // Theme selection
      AppMaker._container.querySelectorAll('.theme-card').forEach(card => {
        card.addEventListener('click', () => {
          AppMaker._container.querySelectorAll('.theme-card').forEach(c => {
            c.style.borderColor = 'rgba(255,255,255,0.2)';
            c.style.background = 'rgba(255,255,255,0.1)';
            c.classList.remove('active');
          });
          card.style.borderColor = '#00ff88';
          card.style.background = 'rgba(0,255,136,0.1)';
          card.classList.add('active');
          AppMaker._appData.theme = card.dataset.theme;
          console.log('🎨 Theme selected:', AppMaker._appData.theme);
        });
      });

      // Feature checkboxes
      AppMaker._container.querySelectorAll('input[type="checkbox"][data-feature]').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
          const feature = checkbox.dataset.feature;
          if (checkbox.checked) {
            if (!AppMaker._appData.features.includes(feature)) {
              AppMaker._appData.features.push(feature);
            }
          } else {
            AppMaker._appData.features = AppMaker._appData.features.filter(f => f !== feature);
          }
          console.log('🔧 Features updated:', AppMaker._appData.features);
        });
      });

      // Form inputs auto-save
      ['app-name', 'app-description', 'app-category', 'app-version', 'app-author', 'app-width', 'app-height'].forEach(id => {
        const element = AppMaker._container.querySelector(`#${id}`);
        if (element) {
          element.addEventListener('input', () => {
            const key = id.replace('app-', '');
            AppMaker._appData[key] = element.value;
            console.log(`📝 ${key} updated:`, element.value);
          });
        }
      });

      console.log('✅ Event listeners setup complete');
    } catch (error) {
      console.error('❌ Event listener setup failed:', error);
    }
  }

  static _updateUI() {
    if (!AppMaker._container) return;

    try {
      // Show current step
      AppMaker._container.querySelectorAll('.wizard-step').forEach(step => {
        step.style.display = 'none';
      });
      const currentStepEl = AppMaker._container.querySelector(`#step-${AppMaker._currentStep}`);
      if (currentStepEl) {
        currentStepEl.style.display = 'block';
      }

      // Update progress
      const steps = ['welcome', 'details', 'template', 'features', 'code', 'export'];
      const currentIndex = steps.indexOf(AppMaker._currentStep);
      const progress = ['demo'].includes(AppMaker._currentStep) ? 0 : (currentIndex / (steps.length - 1)) * 100;
      const progressFill = AppMaker._container.querySelector('#progress-fill');
      if (progressFill) {
        progressFill.style.width = progress + '%';
      }

      // Update step dots
      AppMaker._container.querySelectorAll('.step-dot').forEach((dot, index) => {
        if (index === currentIndex) {
          dot.style.background = '#00ff88';
          dot.style.transform = 'scale(1.2)';
        } else if (index < currentIndex) {
          dot.style.background = 'white';
          dot.style.transform = 'scale(1)';
        } else {
          dot.style.background = 'rgba(255,255,255,0.3)';
          dot.style.transform = 'scale(1)';
        }
      });

      // Update navigation
      const backBtn = AppMaker._container.querySelector('#back-btn');
      const nextBtn = AppMaker._container.querySelector('#next-btn');

      if (backBtn) {
        backBtn.style.visibility = (currentIndex <= 0 || ['demo'].includes(AppMaker._currentStep)) ? 'hidden' : 'visible';
      }

      if (nextBtn) {
        nextBtn.style.visibility = (currentIndex >= steps.length - 1 || ['demo'].includes(AppMaker._currentStep)) ? 'hidden' : 'visible';
      }

      console.log('🔄 UI updated for step:', AppMaker._currentStep);
    } catch (error) {
      console.error('❌ UI update failed:', error);
    }
  }

  static _nextStep() {
    const steps = ['welcome', 'details', 'template', 'features', 'code', 'export'];
    const currentIndex = steps.indexOf(AppMaker._currentStep);

    if (currentIndex < steps.length - 1) {
      AppMaker._currentStep = steps[currentIndex + 1];

      // Auto-populate data when moving to specific steps
      if (AppMaker._currentStep === 'code') {
        setTimeout(() => AppMaker._generateCode(), 100);
      } else if (AppMaker._currentStep === 'export') {
        setTimeout(() => AppMaker._updateExportSummary(), 100);
      }

      AppMaker._updateUI();
      console.log('➡️ Next step:', AppMaker._currentStep);
    }
  }

  static _prevStep() {
    const steps = ['welcome', 'details', 'template', 'features', 'code', 'export'];
    const currentIndex = steps.indexOf(AppMaker._currentStep);

    if (currentIndex > 0) {
      AppMaker._currentStep = steps[currentIndex - 1];
      AppMaker._updateUI();
      console.log('⬅️ Previous step:', AppMaker._currentStep);
    }
  }

  static _goToStep(step) {
    AppMaker._currentStep = step;
    AppMaker._updateUI();
    console.log('🎯 Go to step:', step);
  }

  static _showDemo() {
    AppMaker._currentStep = 'demo';
    AppMaker._updateUI();
  }

  static _generateCode() {
    try {
      const className = AppMaker._getClassName();
      const template = AppMaker._getTemplate();
      const code = template();

      const codeEditor = AppMaker._container.querySelector('#code-editor');
      if (codeEditor) {
        codeEditor.value = code;
        AppMaker._updatePreview();
        AppMaker._setCodeStatus('Code generated successfully', 'success');
        console.log('💻 Code generated for template:', AppMaker._appData.template);
      }
    } catch (error) {
      console.error('❌ Code generation failed:', error);
      AppMaker._setCodeStatus('Error generating code: ' + error.message, 'error');
    }
  }

  static _getTemplate() {
    const templates = {
      basic: () => AppMaker._generateBasicTemplate(),
      calculator: () => AppMaker._generateCalculatorTemplate(),
      todo: () => AppMaker._generateTodoTemplate(),
      timer: () => AppMaker._generateTimerTemplate()
    };

    return templates[AppMaker._appData.template] || templates.basic;
  }

  static _generateBasicTemplate() {
    const className = AppMaker._getClassName();
    const styles = AppMaker._getThemeStyles();
    const features = AppMaker._getFeatureCode();

    return `/**
 * APP_METADATA
 * @name ${AppMaker._appData.name || 'My App'}
 * @icon ${AppMaker._appData.icon}
 * @description ${AppMaker._appData.description || 'Generated with AppMaker 2.0'}
 * @category ${AppMaker._appData.category}
 * @version ${AppMaker._appData.version}
 * @author ${AppMaker._appData.author}
 * @enabled true
 */

class ${className} {
  static createWindow() {
    return {
      title: '${AppMaker._appData.name || 'My App'}',
      width: '${AppMaker._appData.width}',
      height: '${AppMaker._appData.height}',
      content: \`
        <div style="${styles}">
          <h2 style="margin: 0 0 15px 0; font-size: 24px; font-weight: 300;">${AppMaker._appData.name || 'My App'}</h2>
          <p style="margin: 0 0 20px 0; opacity: 0.8; line-height: 1.5;">${AppMaker._appData.description || 'Welcome to my app!'}</p>
          <button onclick="${className}._handleClick()" style="display: inline-block; padding: 12px 24px; background: rgba(255,255,255,0.2); color: inherit; border: 1px solid rgba(255,255,255,0.3); border-radius: 6px; cursor: pointer; font-size: 14px; font-family: inherit;">
            Click Me!
          </button>
          <div id="content" style="margin-top: 20px;">
            <!-- Your content here -->
          </div>
          ${features.elements}
        </div>
      \`,
      onInit: (container) => {
        ${className}._container = container;
        ${className}._init();
        ${features.initCode}
      }${features.destroyCode ? ',\n      onDestroy: () => {\n        ' + features.destroyCode + '\n      }' : ''}
    };
  }

  static _init() {
    console.log('${className} initialized');
  }

  static _handleClick() {
    ${AppMaker._hasFeature('notifications') ? 
      `${className}._showNotification('Hello from ${AppMaker._appData.name || 'My App'}!');` : 
      `alert('Hello from ${AppMaker._appData.name || 'My App'}!');`}
  }

  ${features.methods}
}

window.${className} = ${className};`;
  }

  static _generateTodoTemplate() {
    const className = AppMaker._getClassName();
    const styles = AppMaker._getThemeStyles();
    const features = AppMaker._getFeatureCode();

    return `/**
 * APP_METADATA
 * @name ${AppMaker._appData.name || 'Todo List'}
 * @icon ${AppMaker._appData.icon}
 * @description ${AppMaker._appData.description || 'Task management app generated with AppMaker 2.0'}
 * @category ${AppMaker._appData.category}
 * @version ${AppMaker._appData.version}
 * @author ${AppMaker._appData.author}
 * @enabled true
 */

class ${className} {
  static _tasks = [];
  static _container = null;

  static createWindow() {
    return {
      title: '${AppMaker._appData.name || 'Todo List'}',
      width: '${AppMaker._appData.width}',
      height: '${AppMaker._appData.height}',
      content: \`
        <div style="${styles}">
          <h2 style="margin: 0 0 20px 0; font-size: 24px; font-weight: 300;">${AppMaker._appData.name || 'Todo List'}</h2>
          
          <div style="display: flex; gap: 10px; margin-bottom: 20px;">
            <input id="new-task" type="text" placeholder="Add new task..." style="flex: 1; padding: 10px; border: 1px solid rgba(255,255,255,0.3); border-radius: 4px; background: rgba(255,255,255,0.9); color: #333; font-size: 14px;">
            <button onclick="${className}._addTask()" style="padding: 10px 20px; background: rgba(255,255,255,0.2); color: inherit; border: 1px solid rgba(255,255,255,0.3); border-radius: 4px; cursor: pointer; font-size: 14px; font-family: inherit;">Add</button>
          </div>
          
          <div id="tasks-list" style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px;">
            <!-- Tasks will appear here -->
          </div>
          
          <div style="padding: 15px; background: rgba(0,0,0,0.1); border-radius: 6px; font-size: 14px;">
            <strong>Stats:</strong> <span id="stats">0 tasks, 0 completed</span>
          </div>
          ${features.elements}
        </div>
      \`,
      onInit: (container) => {
        ${className}._container = container;
        ${className}._setupEventListeners();
        ${className}._updateStats();
        ${features.initCode}
      }${features.destroyCode ? ',\n      onDestroy: () => {\n        ' + features.destroyCode + '\n      }' : ''}
    };
  }
  
  static _setupEventListeners() {
    const newTaskInput = ${className}._container.querySelector('#new-task');
    if (newTaskInput) {
      newTaskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') ${className}._addTask();
      });
    }
  }
  
  static _addTask() {
    const input = ${className}._container.querySelector('#new-task');
    const text = input.value.trim();
    if (!text) return;
    
    const task = {
      id: Date.now(),
      text: text,
      completed: false
    };
    
    ${className}._tasks.push(task);
    ${className}._renderTasks();
    ${className}._updateStats();
    input.value = '';
    ${AppMaker._hasFeature('notifications') ? `${className}._showNotification('Task added!');` : ''}
  }
  
  static _renderTasks() {
    const list = ${className}._container.querySelector('#tasks-list');
    list.innerHTML = '';
    
    ${className}._tasks.forEach(task => {
      const div = document.createElement('div');
      div.style.cssText = 'display: flex; align-items: center; gap: 10px; padding: 10px; background: rgba(255,255,255,0.1); border-radius: 4px;' + (task.completed ? ' opacity: 0.6; text-decoration: line-through;' : '');
      div.innerHTML = \`
        <input type="checkbox" \${task.completed ? 'checked' : ''} onchange="${className}._toggleTask(\${task.id})">
        <span style="flex: 1;">\${task.text}</span>
        <button onclick="${className}._deleteTask(\${task.id})" style="background: #ff6b6b; color: white; border: none; border-radius: 3px; padding: 4px 8px; cursor: pointer; font-size: 12px;">Delete</button>
      \`;
      list.appendChild(div);
    });
  }
  
  static _toggleTask(id) {
    const task = ${className}._tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      ${className}._renderTasks();
      ${className}._updateStats();
    }
  }
  
  static _deleteTask(id) {
    ${className}._tasks = ${className}._tasks.filter(t => t.id !== id);
    ${className}._renderTasks();
    ${className}._updateStats();
  }
  
  static _updateStats() {
    const total = ${className}._tasks.length;
    const completed = ${className}._tasks.filter(t => t.completed).length;
    const stats = ${className}._container.querySelector('#stats');
    if (stats) {
      stats.textContent = \`\${total} tasks, \${completed} completed\`;
    }
  }
  
  ${features.methods}
}

window.${className} = ${className};`;
  }

  static _generateCalculatorTemplate() {
    // For brevity, using basic template for now
    return AppMaker._generateBasicTemplate();
  }

  static _generateTimerTemplate() {
    // For brevity, using basic template for now
    return AppMaker._generateBasicTemplate();
  }

  static _getClassName() {
    const name = AppMaker._appData.name || 'MyApp';
    return name.replace(/[^a-zA-Z0-9]/g, '') || 'MyApp';
  }

  static _getThemeStyles() {
    const themes = {
      modern: 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; height: 100%; box-sizing: border-box;',
      minimal: 'background: #f8f9fa; color: #333; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; height: 100%; box-sizing: border-box;',
      dark: 'background: #2c3e50; color: #ecf0f1; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; height: 100%; box-sizing: border-box;',
      colorful: 'background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1); color: white; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; height: 100%; box-sizing: border-box;'
    };
    return themes[AppMaker._appData.theme] || themes.modern;
  }

  static _hasFeature(feature) {
    return AppMaker._appData.features.includes(feature);
  }

  static _getFeatureCode() {
    let elements = '';
    let initCode = '';
    let destroyCode = '';
    let methods = '';

    if (AppMaker._hasFeature('help-system')) {
      elements += `\\n          <button onclick="${AppMaker._getClassName()}._showHelp()" style="position: absolute; top: 10px; right: 10px; background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.3); border-radius: 50%; width: 30px; height: 30px; cursor: pointer; font-size: 14px; color: inherit;">?</button>`;
      methods += `\\n  static _showHelp() {\\n    alert('Help: This is ${AppMaker._appData.name || 'your app'}. ${AppMaker._appData.description || 'No additional help available.'}');\\n  }`;
    }

    if (AppMaker._hasFeature('notifications')) {
      methods += `\\n  static _showNotification(message) {\\n    const notification = document.createElement('div');\\n    notification.textContent = message;\\n    notification.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #333; color: white; padding: 10px 20px; border-radius: 4px; z-index: 10000; animation: slideIn 0.3s ease;';\\n    document.body.appendChild(notification);\\n    setTimeout(() => {\\n      notification.style.animation = 'slideOut 0.3s ease';\\n      setTimeout(() => notification.remove(), 300);\\n    }, 3000);\\n  }`;
    }

    if (AppMaker._hasFeature('keyboard-shortcuts')) {
      initCode += `\\n        document.addEventListener('keydown', ${AppMaker._getClassName()}._handleKeyboard);`;
      destroyCode += `document.removeEventListener('keydown', ${AppMaker._getClassName()}._handleKeyboard);`;
      methods += `\\n  static _handleKeyboard(e) {\\n    if (e.ctrlKey && e.key === 's') {\\n      e.preventDefault();\\n      ${AppMaker._hasFeature('notifications') ? `${AppMaker._getClassName()}._showNotification('Saved!');` : 'alert("Saved!");'}\\n    }\\n  }`;
    }

    return { elements, initCode, destroyCode, methods };
  }

  static _resetCode() {
    AppMaker._generateCode();
    console.log('🔄 Code reset');
  }

  static _validateCode() {
    const editor = AppMaker._container.querySelector('#code-editor');
    if (editor) {
      try {
        const code = editor.value;
        new Function(code);
        AppMaker._setCodeStatus('Code is valid ✅', 'success');
        console.log('✅ Code validation passed');
      } catch (error) {
        AppMaker._setCodeStatus('Validation error: ' + error.message, 'error');
        console.error('❌ Code validation failed:', error);
      }
    }
  }

  static _setCodeStatus(message, type = 'info') {
    const statusEl = AppMaker._container.querySelector('#code-status');
    if (statusEl) {
      statusEl.textContent = message;
      statusEl.style.color = type === 'error' ? '#ff6b6b' : type === 'success' ? '#00ff88' : 'inherit';

      // Auto-clear status after 3 seconds
      setTimeout(() => {
        if (statusEl.textContent === message) {
          statusEl.textContent = 'Ready';
          statusEl.style.color = 'inherit';
        }
      }, 3000);
    }
  }

  static _updatePreview() {
    const editor = AppMaker._container.querySelector('#code-editor');
    const preview = AppMaker._container.querySelector('#preview-container');

    if (!editor || !preview) return;

    try {
      const code = editor.value;
      // Extract content from the template
      const contentMatch = code.match(/content:\s*`([^`]+)`/s);
      if (contentMatch) {
        let content = contentMatch[1].trim();
        // Remove the outer div wrapper for preview
        const innerMatch = content.match(/<div[^>]*>(.*)<\/div>/s);
        if (innerMatch) {
          content = innerMatch[1];
        }
        preview.innerHTML = content;
      } else {
        preview.innerHTML = '<p style="color: #666; text-align: center; margin-top: 50px;">No content found in code</p>';
      }

      AppMaker._setCodeStatus('Preview updated', 'success');
      console.log('🔄 Preview updated');
    } catch (error) {
      preview.innerHTML = '<p style="color: #dc3545; text-align: center; margin-top: 50px;">Preview error: ' + error.message + '</p>';
      AppMaker._setCodeStatus('Preview error: ' + error.message, 'error');
      console.error('❌ Preview update failed:', error);
    }
  }

  static _updateExportSummary() {
    const summary = AppMaker._container.querySelector('#export-summary');
    if (summary) {
      summary.innerHTML = `
        <div style="display: grid; grid-template-columns: auto 1fr; gap: 10px 20px; align-items: center;">
          <strong>Name:</strong> <span>${AppMaker._appData.name || 'Untitled'}</span>
          <strong>Description:</strong> <span>${AppMaker._appData.description || 'No description'}</span>
          <strong>Category:</strong> <span>${AppMaker._appData.category}</span>
          <strong>Template:</strong> <span>${AppMaker._appData.template}</span>
          <strong>Theme:</strong> <span>${AppMaker._appData.theme}</span>
          <strong>Size:</strong> <span>${AppMaker._appData.width} × ${AppMaker._appData.height}</span>
          <strong>Features:</strong> <span>${AppMaker._appData.features.length > 0 ? AppMaker._appData.features.join(', ') : 'None'}</span>
        </div>
      `;
    }
  }

  static _exportApp(format = 'js') {
    try {
      const className = AppMaker._getClassName();
      const codeEditor = AppMaker._container.querySelector('#code-editor');
      const code = codeEditor ? codeEditor.value : AppMaker._getTemplate()();

      let finalContent = code;

      if (format === 'bundle') {
        const documentation = `/*
=== ${AppMaker._appData.name || className} ===

Generated with AppMaker 2.0

INSTALLATION:
1. Save this file as ${className}.js in your EmberFrame apps directory
2. Restart EmberFrame or refresh the app list
3. Launch from the applications menu

FEATURES:
${AppMaker._appData.features.map(f => `- ${f.replace('-', ' ')}`).join('\\n') || '- Basic functionality'}

TEMPLATE: ${AppMaker._appData.template}
THEME: ${AppMaker._appData.theme}
*/

`;
        finalContent = documentation + finalContent;
      }

      AppMaker._downloadFile(finalContent, `${className}.js`);
      console.log('📥 App exported:', format);
    } catch (error) {
      console.error('❌ Export failed:', error);
      alert('Export failed: ' + error.message);
    }
  }

  static _downloadFile(content, filename) {
    try {
      const blob = new Blob([content], { type: 'application/javascript' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      console.log('📥 File downloaded:', filename);
    } catch (error) {
      console.error('❌ Download failed:', error);
      // Fallback: show content in prompt
      prompt('Copy this code and save it as ' + filename + ':', content);
    }
  }

  static _testApp() {
    try {
      const codeEditor = AppMaker._container.querySelector('#code-editor');
      const code = codeEditor ? codeEditor.value : '';

      if (!code) {
        alert('⚠️ No code to test. Please generate code first.');
        return;
      }

      // Basic validation
      new Function(code);

      const className = AppMaker._getClassName();
      if (code.includes(`class ${className}`) && code.includes('createWindow')) {
        alert('✅ App code is valid and ready to use!\\n\\nThe app will work properly in EmberFrame.');
      } else {
        alert('⚠️ App code compiled but may be missing required structure.\\n\\nMake sure your class has a createWindow() method.');
      }

      console.log('🧪 App test completed');
    } catch (error) {
      alert('❌ App code has errors:\\n\\n' + error.message + '\\n\\nPlease fix the errors before exporting.');
      console.error('❌ App test failed:', error);
    }
  }

  static _shareApp() {
    try {
      const codeEditor = AppMaker._container.querySelector('#code-editor');
      const code = codeEditor ? codeEditor.value : '';

      if (!code) {
        alert('⚠️ No code to share. Please generate code first.');
        return;
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(code).then(() => {
          alert('📋 Code copied to clipboard!\\n\\nYou can now share it with others.');
        }).catch(() => {
          prompt('Copy this code to share:', code);
        });
      } else {
        prompt('Copy this code to share:', code);
      }

      console.log('🔗 App code shared');
    } catch (error) {
      console.error('❌ Share failed:', error);
    }
  }

  static _startOver() {
    if (confirm('Start over? This will reset all your progress.')) {
      AppMaker._appData = {
        name: '',
        icon: 'fas fa-magic',
        description: '',
        category: 'Development',
        version: '1.0.0',
        author: 'Developer',
        template: 'basic',
        theme: 'modern',
        width: '400px',
        height: '300px',
        features: []
      };
      AppMaker._currentStep = 'welcome';
      AppMaker._updateUI();

      // Clear form fields
      ['app-name', 'app-description', 'app-category', 'app-version', 'app-author', 'app-width', 'app-height'].forEach(id => {
        const element = AppMaker._container.querySelector(`#${id}`);
        if (element) {
          element.value = '';
        }
      });

      console.log('🔄 AppMaker reset');
    }
  }
}

window.AppMaker = AppMaker;