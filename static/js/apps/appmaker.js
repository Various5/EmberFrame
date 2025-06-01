/**
 * APP_METADATA
 * @name AppMaker 2.0
 * @icon fas fa-magic
 * @description Enhanced App Creation Wizard with Live Preview & Advanced Features
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
    icon: 'fas fa-magic',
    description: '',
    category: 'Utilities',
    version: '1.0.0',
    author: 'Developer',
    template: 'basic',
    theme: 'modern',
    width: '400px',
    height: '300px',
    features: []
  };
  static _codeSnippets = {
    button: `<button onclick="handleClick()" style="padding: 10px 20px; background: #007acc; color: white; border: none; border-radius: 4px; cursor: pointer;">Click Me</button>`,
    input: `<input type="text" placeholder="Enter text..." style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; margin: 5px;">`,
    card: `<div style="background: white; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px; margin: 10px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
  <h3 style="margin: 0 0 10px 0;">Card Title</h3>
  <p style="margin: 0; color: #666;">Card content goes here...</p>
</div>`,
    table: `<table style="width: 100%; border-collapse: collapse; margin: 10px 0;">
  <thead><tr style="background: #f5f5f5;"><th style="padding: 12px; border: 1px solid #ddd;">Header</th></tr></thead>
  <tbody><tr><td style="padding: 12px; border: 1px solid #ddd;">Data</td></tr></tbody>
</table>`,
    chart: `<div style="background: linear-gradient(45deg, #007acc, #00d4ff); height: 200px; border-radius: 8px; position: relative; overflow: hidden;">
  <div style="position: absolute; bottom: 20px; left: 20px; color: white;">
    <div style="font-size: 24px; font-weight: bold;">42%</div>
    <div style="opacity: 0.8;">Growth Rate</div>
  </div>
</div>`
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
                  The most advanced app creation wizard for EmberFrame. Build professional applications 
                  with pre-built templates, live preview, code snippets, and export options.
                </p>
                <div style="background: rgba(0,0,0,0.2); border-radius: 10px; padding: 20px; margin: 20px 0; text-align: left;">
                  <h3 style="margin: 0 0 15px 0;">✨ What's New in 2.0:</h3>
                  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px;">
                    <div>• 12 Professional Templates</div>
                    <div>• Live Code Preview</div>
                    <div>• Advanced Customization</div>
                    <div>• Code Snippet Library</div>
                    <div>• Multiple Export Formats</div>
                    <div>• Theme System</div>
                    <div>• Feature Plugins</div>
                    <div>• Advanced Validation</div>
                  </div>
                </div>
                <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                  <button onclick="AppMaker._nextStep()" class="wizard-btn primary">
                    🎯 Start Creating
                  </button>
                  <button onclick="AppMaker._showDemo()" class="wizard-btn">
                    👀 View Gallery
                  </button>
                  <button onclick="AppMaker._showTutorial()" class="wizard-btn">
                    📚 Tutorial
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
                    <div class="input-group">
                      <label>App Name *</label>
                      <input id="app-name" type="text" placeholder="My Awesome App" />
                      <small style="opacity: 0.7;">Used as the window title and class name</small>
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

                <!-- Advanced Settings -->
                <div>
                  <h3 style="margin: 0 0 20px 0; font-size: 18px;">Advanced Settings</h3>
                  <div style="display: flex; flex-direction: column; gap: 15px;">
                    <div class="input-group">
                      <label>Icon (FontAwesome Class)</label>
                      <input id="app-icon" type="text" placeholder="fas fa-magic" />
                      <div style="display: flex; gap: 8px; margin-top: 8px; flex-wrap: wrap;">
                        <span class="icon-preset" data-icon="fas fa-star">⭐ Star</span>
                        <span class="icon-preset" data-icon="fas fa-rocket">🚀 Rocket</span>
                        <span class="icon-preset" data-icon="fas fa-cog">⚙️ Settings</span>
                        <span class="icon-preset" data-icon="fas fa-chart-bar">📊 Chart</span>
                        <span class="icon-preset" data-icon="fas fa-gamepad">🎮 Game</span>
                        <span class="icon-preset" data-icon="fas fa-calculator">🧮 Calculator</span>
                      </div>
                    </div>
                    <div class="input-group">
                      <label>Category</label>
                      <select id="app-category">
                        <option value="Utilities">🔧 Utilities</option>
                        <option value="Games">🎮 Games</option>
                        <option value="Development" selected>💻 Development</option>
                        <option value="System">⚙️ System</option>
                        <option value="Entertainment">🎬 Entertainment</option>
                        <option value="Productivity">📈 Productivity</option>
                        <option value="Education">📚 Education</option>
                        <option value="Business">💼 Business</option>
                      </select>
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                      <div class="input-group">
                        <label>Default Width</label>
                        <select id="app-width">
                          <option value="300px">Small (300px)</option>
                          <option value="400px" selected>Medium (400px)</option>
                          <option value="600px">Large (600px)</option>
                          <option value="800px">Extra Large (800px)</option>
                          <option value="100%">Full Width</option>
                        </select>
                      </div>
                      <div class="input-group">
                        <label>Default Height</label>
                        <select id="app-height">
                          <option value="200px">Small (200px)</option>
                          <option value="300px" selected>Medium (300px)</option>
                          <option value="500px">Large (500px)</option>
                          <option value="700px">Extra Large (700px)</option>
                          <option value="100%">Full Height</option>
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
                <div class="template-card" data-template="basic">
                  <div class="template-icon">📝</div>
                  <h3>Basic App</h3>
                  <p>Simple app with text, buttons, and basic interaction</p>
                  <div class="template-features">Perfect for: Simple tools, forms</div>
                </div>
                
                <div class="template-card" data-template="calculator">
                  <div class="template-icon">🧮</div>
                  <h3>Calculator</h3>
                  <p>Full-featured calculator with operations and display</p>
                  <div class="template-features">Perfect for: Math tools, converters</div>
                </div>
                
                <div class="template-card" data-template="dashboard">
                  <div class="template-icon">📊</div>
                  <h3>Dashboard</h3>
                  <p>Data visualization with stats cards and charts</p>
                  <div class="template-features">Perfect for: Analytics, monitoring</div>
                </div>
                
                <div class="template-card" data-template="game">
                  <div class="template-icon">🎮</div>
                  <h3>Number Game</h3>
                  <p>Interactive guessing game with score tracking</p>
                  <div class="template-features">Perfect for: Entertainment, puzzles</div>
                </div>
                
                <div class="template-card" data-template="todo">
                  <div class="template-icon">✅</div>
                  <h3>Todo List</h3>
                  <p>Task management with add, delete, and completion</p>
                  <div class="template-features">Perfect for: Productivity, planning</div>
                </div>
                
                <div class="template-card" data-template="timer">
                  <div class="template-icon">⏱️</div>
                  <h3>Timer & Stopwatch</h3>
                  <p>Countdown timer and stopwatch functionality</p>
                  <div class="template-features">Perfect for: Time tracking, alerts</div>
                </div>
                
                <div class="template-card" data-template="form">
                  <div class="template-icon">📋</div>
                  <h3>Contact Form</h3>
                  <p>Professional form with validation and submission</p>
                  <div class="template-features">Perfect for: Data collection, surveys</div>
                </div>
                
                <div class="template-card" data-template="weather">
                  <div class="template-icon">🌤️</div>
                  <h3>Weather Widget</h3>
                  <p>Weather display with location and forecasts</p>
                  <div class="template-features">Perfect for: Information display</div>
                </div>
                
                <div class="template-card" data-template="chat">
                  <div class="template-icon">💬</div>
                  <h3>Chat Interface</h3>
                  <p>Chat-like interface with message bubbles</p>
                  <div class="template-features">Perfect for: Communication, help</div>
                </div>
                
                <div class="template-card" data-template="gallery">
                  <div class="template-icon">🖼️</div>
                  <h3>Image Gallery</h3>
                  <p>Photo gallery with lightbox and navigation</p>
                  <div class="template-features">Perfect for: Portfolios, showcases</div>
                </div>
                
                <div class="template-card" data-template="music">
                  <div class="template-icon">🎵</div>
                  <h3>Music Player</h3>
                  <p>Audio player with playlist and controls</p>
                  <div class="template-features">Perfect for: Media, entertainment</div>
                </div>
                
                <div class="template-card" data-template="editor">
                  <div class="template-icon">📝</div>
                  <h3>Text Editor</h3>
                  <p>Rich text editor with formatting tools</p>
                  <div class="template-features">Perfect for: Writing, notes</div>
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
                    <div class="theme-card" data-theme="modern">
                      <div style="background: linear-gradient(45deg, #667eea, #764ba2); height: 40px; border-radius: 4px; margin-bottom: 10px;"></div>
                      <div style="font-weight: 500;">Modern</div>
                      <div style="font-size: 12px; opacity: 0.7;">Clean gradients</div>
                    </div>
                    <div class="theme-card" data-theme="minimal">
                      <div style="background: linear-gradient(45deg, #f8f9fa, #e9ecef); height: 40px; border-radius: 4px; margin-bottom: 10px; border: 1px solid #dee2e6;"></div>
                      <div style="font-weight: 500;">Minimal</div>
                      <div style="font-size: 12px; opacity: 0.7;">Simple & clean</div>
                    </div>
                    <div class="theme-card" data-theme="dark">
                      <div style="background: linear-gradient(45deg, #2c3e50, #34495e); height: 40px; border-radius: 4px; margin-bottom: 10px;"></div>
                      <div style="font-weight: 500;">Dark</div>
                      <div style="font-size: 12px; opacity: 0.7;">Dark mode</div>
                    </div>
                    <div class="theme-card" data-theme="colorful">
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
                    <label class="feature-checkbox">
                      <input type="checkbox" data-feature="save-state"> 
                      <span>💾 Save State</span>
                      <small>Automatically save and restore app state</small>
                    </label>
                    <label class="feature-checkbox">
                      <input type="checkbox" data-feature="keyboard-shortcuts"> 
                      <span>⌨️ Keyboard Shortcuts</span>
                      <small>Add hotkey support for common actions</small>
                    </label>
                    <label class="feature-checkbox">
                      <input type="checkbox" data-feature="export-data"> 
                      <span>📤 Export Data</span>
                      <small>Allow users to export app data</small>
                    </label>
                    <label class="feature-checkbox">
                      <input type="checkbox" data-feature="fullscreen"> 
                      <span>🔍 Fullscreen Mode</span>
                      <small>Toggle fullscreen view</small>
                    </label>
                    <label class="feature-checkbox">
                      <input type="checkbox" data-feature="help-system"> 
                      <span>❓ Help System</span>
                      <small>Built-in help and tutorials</small>
                    </label>
                    <label class="feature-checkbox">
                      <input type="checkbox" data-feature="notifications"> 
                      <span>🔔 Notifications</span>
                      <small>Toast notifications for user feedback</small>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <!-- Code Editor Step -->
            <div id="step-code" class="wizard-step" style="display: none;">
              <h2 style="margin: 0 0 20px 0; font-weight: 300;">💻 Code Editor & Preview</h2>
              
              <!-- Editor Toolbar -->
              <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 15px; gap: 15px;">
                <div style="display: flex; gap: 10px;">
                  <button onclick="AppMaker._resetCode()" class="wizard-btn small">🔄 Reset</button>
                  <button onclick="AppMaker._formatCode()" class="wizard-btn small">✨ Format</button>
                  <button onclick="AppMaker._validateCode()" class="wizard-btn small">✅ Validate</button>
                </div>
                <div style="display: flex; gap: 10px;">
                  <button onclick="AppMaker._showSnippets()" class="wizard-btn small">📚 Snippets</button>
                  <button onclick="AppMaker._updatePreview()" class="wizard-btn small">🔄 Refresh Preview</button>
                </div>
              </div>

              <div style="display: flex; gap: 20px; height: 450px;">
                <div style="flex: 1; display: flex; flex-direction: column;">
                  <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 10px;">
                    <span style="font-weight: 500;">JavaScript Code</span>
                    <div id="code-status" style="font-size: 12px; opacity: 0.7;">Ready</div>
                  </div>
                  <textarea id="code-editor" style="flex: 1; background: #1e1e1e; color: #d4d4d4; border: none; border-radius: 8px; padding: 15px; font-family: 'Fira Code', 'Consolas', monospace; font-size: 14px; resize: none; outline: none; line-height: 1.5;"></textarea>
                </div>
                <div style="flex: 1; display: flex; flex-direction: column;">
                  <div style="margin-bottom: 10px;">
                    <span style="font-weight: 500;">Live Preview</span>
                    <select id="preview-mode" style="margin-left: 10px; padding: 4px 8px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.3); background: rgba(255,255,255,0.1); color: white; font-size: 12px;">
                      <option value="content">Content Only</option>
                      <option value="window">Full Window</option>
                    </select>
                  </div>
                  <div id="preview-container" style="flex: 1; background: white; border-radius: 8px; padding: 15px; color: #333; overflow: auto; border: 2px solid rgba(255,255,255,0.1);">
                    <p style="color: #666; text-align: center; margin-top: 50px;">Preview will appear here...</p>
                  </div>
                </div>
              </div>

              <!-- Code Snippets Panel -->
              <div id="snippets-panel" style="display: none; margin-top: 20px; background: rgba(0,0,0,0.2); border-radius: 8px; padding: 20px;">
                <h3 style="margin: 0 0 15px 0;">Code Snippets Library</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                  <div class="snippet-card" data-snippet="button">
                    <div class="snippet-title">🔘 Button</div>
                    <div class="snippet-desc">Interactive button element</div>
                  </div>
                  <div class="snippet-card" data-snippet="input">
                    <div class="snippet-title">📝 Input Field</div>
                    <div class="snippet-desc">Text input with styling</div>
                  </div>
                  <div class="snippet-card" data-snippet="card">
                    <div class="snippet-title">🃏 Card</div>
                    <div class="snippet-desc">Content card with shadow</div>
                  </div>
                  <div class="snippet-card" data-snippet="table">
                    <div class="snippet-title">📊 Table</div>
                    <div class="snippet-desc">Structured data table</div>
                  </div>
                  <div class="snippet-card" data-snippet="chart">
                    <div class="snippet-title">📈 Chart</div>
                    <div class="snippet-desc">Simple chart visualization</div>
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
                    <button onclick="AppMaker._exportApp('js')" class="export-option">
                      <div style="font-size: 24px; margin-bottom: 8px;">📁</div>
                      <div style="font-weight: 500;">JavaScript File</div>
                      <div style="font-size: 12px; opacity: 0.7;">Standard .js export</div>
                    </button>
                    <button onclick="AppMaker._exportApp('bundle')" class="export-option">
                      <div style="font-size: 24px; margin-bottom: 8px;">📦</div>
                      <div style="font-weight: 500;">Complete Bundle</div>
                      <div style="font-size: 12px; opacity: 0.7;">With documentation</div>
                    </button>
                    <button onclick="AppMaker._exportApp('template')" class="export-option">
                      <div style="font-size: 24px; margin-bottom: 8px;">🎨</div>
                      <div style="font-weight: 500;">Template</div>
                      <div style="font-size: 12px; opacity: 0.7;">Reusable template</div>
                    </button>
                  </div>
                </div>

                <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                  <button onclick="AppMaker._testApp()" class="wizard-btn">
                    🧪 Test App
                  </button>
                  <button onclick="AppMaker._shareApp()" class="wizard-btn">
                    🔗 Share Code
                  </button>
                  <button onclick="AppMaker._startOver()" class="wizard-btn">
                    🔄 Start Over
                  </button>
                </div>
              </div>
            </div>

            <!-- Demo Gallery Step -->
            <div id="step-demo" class="wizard-step" style="display: none;">
              <h2 style="margin: 0 0 20px 0; font-weight: 300;">🎨 Template Gallery</h2>
              <p style="opacity: 0.8; margin-bottom: 25px;">Explore our collection of professionally designed templates. Click on any template to see a live demo.</p>
              
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
                <div class="demo-card">
                  <div class="demo-preview">
                    <div style="background: linear-gradient(45deg, #007acc, #00d4ff); padding: 20px; color: white; text-align: center; border-radius: 8px;">
                      <h3 style="margin: 0 0 10px 0;">🧮 Calculator Pro</h3>
                      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 5px; max-width: 150px; margin: 0 auto;">
                        <button style="padding: 8px; background: rgba(255,255,255,0.2); border: none; border-radius: 3px; color: white; font-size: 12px;">7</button>
                        <button style="padding: 8px; background: rgba(255,255,255,0.2); border: none; border-radius: 3px; color: white; font-size: 12px;">8</button>
                        <button style="padding: 8px; background: rgba(255,255,255,0.2); border: none; border-radius: 3px; color: white; font-size: 12px;">9</button>
                        <button style="padding: 8px; background: rgba(255,255,255,0.3); border: none; border-radius: 3px; color: white; font-size: 12px;">÷</button>
                      </div>
                    </div>
                  </div>
                  <div style="padding: 15px;">
                    <h4 style="margin: 0 0 8px 0;">Calculator Template</h4>
                    <p style="margin: 0; font-size: 14px; opacity: 0.8;">Full-featured calculator with operations, memory, and history</p>
                  </div>
                </div>

                <div class="demo-card">
                  <div class="demo-preview">
                    <div style="background: #f8f9fa; padding: 20px; color: #333; border-radius: 8px;">
                      <h3 style="margin: 0 0 15px 0; color: #007acc;">📊 Analytics Dashboard</h3>
                      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 15px;">
                        <div style="background: #007acc; color: white; padding: 10px; border-radius: 4px; text-align: center; font-size: 12px;">
                          <div style="font-weight: bold;">1,234</div>
                          <div style="opacity: 0.8;">Users</div>
                        </div>
                        <div style="background: #28a745; color: white; padding: 10px; border-radius: 4px; text-align: center; font-size: 12px;">
                          <div style="font-weight: bold;">98%</div>
                          <div style="opacity: 0.8;">Uptime</div>
                        </div>
                      </div>
                      <div style="background: linear-gradient(45deg, #007acc, #00d4ff); height: 40px; border-radius: 4px; opacity: 0.3;"></div>
                    </div>
                  </div>
                  <div style="padding: 15px;">
                    <h4 style="margin: 0 0 8px 0;">Dashboard Template</h4>
                    <p style="margin: 0; font-size: 14px; opacity: 0.8;">Professional dashboard with metrics, charts, and real-time data</p>
                  </div>
                </div>

                <div class="demo-card">
                  <div class="demo-preview">
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; color: white; border-radius: 8px;">
                      <h3 style="margin: 0 0 15px 0;">🎮 Number Guessing</h3>
                      <div style="text-align: center;">
                        <input type="number" placeholder="Your guess" style="padding: 8px; border: none; border-radius: 4px; width: 80px; text-align: center; margin-bottom: 10px;">
                        <div style="background: rgba(255,255,255,0.2); padding: 8px; border-radius: 4px; font-size: 12px;">
                          🎯 Guess a number 1-100
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style="padding: 15px;">
                    <h4 style="margin: 0 0 8px 0;">Game Template</h4>
                    <p style="margin: 0; font-size: 14px; opacity: 0.8;">Interactive game with scoring, hints, and multiple difficulty levels</p>
                  </div>
                </div>
              </div>
              
              <div style="text-align: center; margin-top: 30px;">
                <button onclick="AppMaker._goToStep('welcome')" class="wizard-btn">← Back to Start</button>
              </div>
            </div>

            <!-- Tutorial Step -->
            <div id="step-tutorial" class="wizard-step" style="display: none;">
              <h2 style="margin: 0 0 20px 0; font-weight: 300;">📚 Complete Tutorial</h2>
              
              <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 30px;">
                <!-- Tutorial Navigation -->
                <div>
                  <h3 style="margin: 0 0 15px 0;">Tutorial Sections</h3>
                  <div id="tutorial-nav" style="display: flex; flex-direction: column; gap: 8px;">
                    <div class="tutorial-nav-item active" data-section="getting-started">1. Getting Started</div>
                    <div class="tutorial-nav-item" data-section="templates">2. Choosing Templates</div>
                    <div class="tutorial-nav-item" data-section="customization">3. Customization</div>
                    <div class="tutorial-nav-item" data-section="code-editing">4. Code Editing</div>
                    <div class="tutorial-nav-item" data-section="features">5. Advanced Features</div>
                    <div class="tutorial-nav-item" data-section="export">6. Export & Deployment</div>
                    <div class="tutorial-nav-item" data-section="tips">7. Tips & Tricks</div>
                  </div>
                </div>

                <!-- Tutorial Content -->
                <div id="tutorial-content" style="background: rgba(0,0,0,0.2); border-radius: 10px; padding: 25px; overflow-y: auto; max-height: 400px;">
                  <div id="tutorial-getting-started" class="tutorial-section">
                    <h3>🚀 Getting Started with AppMaker 2.0</h3>
                    <p>AppMaker 2.0 is a powerful wizard that helps you create professional EmberFrame applications without writing code from scratch.</p>
                    <h4>What You'll Learn:</h4>
                    <ul>
                      <li>How to navigate the wizard interface</li>
                      <li>Setting up your app's basic information</li>
                      <li>Understanding the template system</li>
                      <li>Customizing your app's appearance and functionality</li>
                      <li>Exporting and deploying your finished app</li>
                    </ul>
                    <h4>Prerequisites:</h4>
                    <ul>
                      <li>Basic understanding of HTML/CSS (helpful but not required)</li>
                      <li>EmberFrame desktop environment</li>
                      <li>A creative idea for your app!</li>
                    </ul>
                  </div>
                  
                  <div id="tutorial-templates" class="tutorial-section" style="display: none;">
                    <h3>🎨 Understanding Templates</h3>
                    <p>Templates are pre-built app structures that give you a head start on development.</p>
                    <h4>Available Templates:</h4>
                    <ul>
                      <li><strong>Basic App:</strong> Simple interface with buttons and text</li>
                      <li><strong>Calculator:</strong> Mathematical operations with full functionality</li>
                      <li><strong>Dashboard:</strong> Data visualization and metrics display</li>
                      <li><strong>Todo List:</strong> Task management with CRUD operations</li>
                      <li><strong>Timer:</strong> Countdown and stopwatch functionality</li>
                      <li><strong>Games:</strong> Interactive entertainment applications</li>
                    </ul>
                    <h4>Choosing the Right Template:</h4>
                    <p>Consider your app's primary function and user interface needs. Templates can be heavily customized, so choose based on the closest functionality match.</p>
                  </div>
                  
                  <div id="tutorial-customization" class="tutorial-section" style="display: none;">
                    <h3>⚙️ Customization Options</h3>
                    <p>AppMaker 2.0 offers extensive customization without requiring deep coding knowledge.</p>
                    <h4>Visual Themes:</h4>
                    <ul>
                      <li><strong>Modern:</strong> Gradient backgrounds and sleek interfaces</li>
                      <li><strong>Minimal:</strong> Clean, simple design with subtle colors</li>
                      <li><strong>Dark:</strong> Dark mode optimized for low-light use</li>
                      <li><strong>Colorful:</strong> Vibrant, energetic color schemes</li>
                    </ul>
                    <h4>Feature Add-ons:</h4>
                    <ul>
                      <li><strong>Save State:</strong> Automatically persist user data between sessions. Perfect for todo lists, settings, and user preferences.</li>
                      <li><strong>Keyboard Shortcuts:</strong> Implement hotkeys for power users. Common patterns include Ctrl+S for save, Ctrl+N for new item, and Escape for cancel.</li>
                      <li><strong>Data Export:</strong> Allow users to export their data in common formats like JSON, CSV, or plain text. This builds trust and prevents vendor lock-in.</li>
                      <li><strong>Responsive Design:</strong> All templates include responsive design principles to work well at different window sizes.</li>
                    </ul>
                  </div>
                  
                  <div id="tutorial-code-editing" class="tutorial-section" style="display: none;">
                    <h3>💻 Code Editing & Preview</h3>
                    <p>The built-in code editor provides syntax highlighting and live preview functionality.</p>
                    <h4>Editor Features:</h4>
                    <ul>
                      <li><strong>Syntax Highlighting:</strong> Color-coded JavaScript and HTML</li>
                      <li><strong>Live Preview:</strong> See changes in real-time</li>
                      <li><strong>Code Validation:</strong> Catch errors before export</li>
                      <li><strong>Snippet Library:</strong> Pre-built code components</li>
                      <li><strong>Auto-formatting:</strong> Clean up your code structure</li>
                    </ul>
                    <h4>Best Practices:</h4>
                    <ul>
                      <li>Test frequently using the preview panel</li>
                      <li>Use descriptive variable and function names</li>
                      <li>Comment your code for future reference</li>
                      <li>Validate your code before final export</li>
                    </ul>
                  </div>
                  
                  <div id="tutorial-features" class="tutorial-section" style="display: none;">
                    <h3>🚀 Advanced Features</h3>
                    <p>Take your apps to the next level with these advanced capabilities.</p>
                    <h4>State Management:</h4>
                    <p>Use the Save State feature to automatically preserve user data between sessions. This is perfect for todo lists, settings, and user preferences.</p>
                    <h4>Keyboard Shortcuts:</h4>
                    <p>Implement hotkeys for power users. Common patterns include Ctrl+S for save, Ctrl+N for new item, and Escape for cancel.</p>
                    <h4>Data Export:</h4>
                    <p>Allow users to export their data in common formats like JSON, CSV, or plain text. This builds trust and prevents vendor lock-in.</p>
                    <h4>Responsive Design:</h4>
                    <p>All templates include responsive design principles to work well at different window sizes.</p>
                  </div>
                  
                  <div id="tutorial-export" class="tutorial-section" style="display: none;">
                    <h3>📦 Export & Deployment</h3>
                    <p>Once your app is complete, you have several export options available.</p>
                    <h4>Export Formats:</h4>
                    <ul>
                      <li><strong>JavaScript File:</strong> Standard .js file ready for EmberFrame</li>
                      <li><strong>Complete Bundle:</strong> Includes documentation and installation guide</li>
                      <li><strong>Template:</strong> Save as a reusable template for future projects</li>
                    </ul>
                    <h4>Installation:</h4>
                    <ol>
                      <li>Save the exported .js file to your EmberFrame apps directory</li>
                      <li>Restart EmberFrame or refresh the app list</li>
                      <li>Your app will appear in the applications menu</li>
                      <li>Click to launch and test functionality</li>
                    </ol>
                  </div>
                  
                  <div id="tutorial-tips" class="tutorial-section" style="display: none;">
                    <h3>💡 Tips & Tricks</h3>
                    <h4>Development Tips:</h4>
                    <ul>
                      <li><strong>Start Simple:</strong> Begin with basic functionality and add features gradually</li>
                      <li><strong>Use Comments:</strong> Document your code for easier maintenance</li>
                      <li><strong>Test Early:</strong> Use the preview panel frequently during development</li>
                      <li><strong>Consistent Styling:</strong> Maintain visual consistency throughout your app</li>
                    </ul>
                    <h4>Performance Tips:</h4>
                    <ul>
                      <li>Minimize DOM manipulations in loops</li>
                      <li>Use event delegation for dynamic content</li>
                      <li>Optimize images and assets</li>
                      <li>Test with larger datasets</li>
                    </ul>
                    <h4>User Experience Tips:</h4>
                    <ul>
                      <li>Provide clear feedback for user actions</li>
                      <li>Use loading indicators for longer operations</li>
                      <li>Implement keyboard shortcuts for power users</li>
                      <li>Include helpful error messages</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div style="text-align: center; margin-top: 30px;">
                <button onclick="AppMaker._goToStep('welcome')" class="wizard-btn">← Back to Start</button>
              </div>
            </div>

          </div>

          <!-- Navigation -->
          <div id="navigation" style="padding: 20px; background: rgba(0,0,0,0.2); display: flex; justify-content: space-between; align-items: center;">
            <button id="back-btn" onclick="AppMaker._prevStep()" class="wizard-btn" style="visibility: hidden;">← Back</button>
            <div id="step-indicator" style="display: flex; gap: 8px;">
              <div class="step-dot active"></div>
              <div class="step-dot"></div>
              <div class="step-dot"></div>
              <div class="step-dot"></div>
              <div class="step-dot"></div>
              <div class="step-dot"></div>
            </div>
            <button id="next-btn" onclick="AppMaker._nextStep()" class="wizard-btn primary" style="visibility: hidden;">Next →</button>
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

          .wizard-btn.primary:hover {
            background: #00cc6a;
            border-color: #00cc6a;
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

          .input-group small {
            font-size: 12px;
            opacity: 0.7;
            margin-top: -2px;
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
            margin: 0 0 8px 0;
            opacity: 0.8;
            font-size: 14px;
          }

          .template-features {
            font-size: 12px;
            opacity: 0.6;
            font-style: italic;
          }

          .theme-card {
            background: rgba(255,255,255,0.1);
            border: 2px solid rgba(255,255,255,0.2);
            border-radius: 8px;
            padding: 15px;
            cursor: pointer;
            transition: all 0.2s ease;
            text-align: center;
          }

          .theme-card:hover, .theme-card.selected {
            border-color: #00ff88;
            background: rgba(0,255,136,0.1);
          }

          .feature-checkbox {
            display: flex;
            align-items: center;
            gap: 10px;
            background: rgba(255,255,255,0.05);
            padding: 12px;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.2s ease;
          }

          .feature-checkbox:hover {
            background: rgba(255,255,255,0.1);
          }

          .feature-checkbox input[type="checkbox"] {
            width: 16px;
            height: 16px;
          }

          .feature-checkbox span {
            font-weight: 500;
          }

          .feature-checkbox small {
            font-size: 12px;
            opacity: 0.7;
            margin-left: auto;
          }

          .snippet-card {
            background: rgba(255,255,255,0.1);
            border: 1px solid rgba(255,255,255,0.2);
            border-radius: 6px;
            padding: 12px;
            cursor: pointer;
            transition: all 0.2s ease;
          }

          .snippet-card:hover {
            background: rgba(255,255,255,0.2);
            border-color: #00ff88;
          }

          .snippet-title {
            font-weight: 500;
            margin-bottom: 4px;
          }

          .snippet-desc {
            font-size: 12px;
            opacity: 0.7;
          }

          .export-option {
            background: rgba(255,255,255,0.1);
            border: 2px solid rgba(255,255,255,0.2);
            border-radius: 8px;
            padding: 20px;
            color: white;
            cursor: pointer;
            transition: all 0.2s ease;
            font-family: inherit;
          }

          .export-option:hover {
            background: rgba(255,255,255,0.2);
            border-color: #00ff88;
            transform: translateY(-2px);
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

          .demo-preview {
            background: rgba(255,255,255,0.05);
            padding: 15px;
          }

          .tutorial-nav-item {
            background: rgba(255,255,255,0.1);
            border: 1px solid rgba(255,255,255,0.2);
            border-radius: 6px;
            padding: 12px;
            cursor: pointer;
            transition: all 0.2s ease;
            font-size: 14px;
          }

          .tutorial-nav-item:hover, .tutorial-nav-item.active {
            background: rgba(0,255,136,0.2);
            border-color: #00ff88;
          }

          .tutorial-section h3 {
            color: #00ff88;
            margin: 0 0 15px 0;
          }

          .tutorial-section h4 {
            margin: 20px 0 10px 0;
          }

          .tutorial-section ul, .tutorial-section ol {
            padding-left: 20px;
          }

          .tutorial-section li {
            margin-bottom: 8px;
            line-height: 1.5;
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
    AppMaker._setupEventListeners();
    AppMaker._updateUI();
    console.log('✅ AppMaker 2.0 ready!');
  }

  static _cleanup() {
    AppMaker._container = null;
    AppMaker._currentStep = 'welcome';
    AppMaker._appData = {
      name: '',
      icon: 'fas fa-magic',
      description: '',
      category: 'Utilities',
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
    // Template selection
    AppMaker._container.querySelectorAll('.template-card').forEach(card => {
      card.addEventListener('click', () => {
        AppMaker._container.querySelectorAll('.template-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        AppMaker._appData.template = card.dataset.template;
      });
    });

    // Theme selection
    AppMaker._container.querySelectorAll('.theme-card').forEach(card => {
      card.addEventListener('click', () => {
        AppMaker._container.querySelectorAll('.theme-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        AppMaker._appData.theme = card.dataset.theme;
      });
    });

    // Feature checkboxes
    AppMaker._container.querySelectorAll('.feature-checkbox input').forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        const feature = checkbox.dataset.feature;
        if (checkbox.checked) {
          if (!AppMaker._appData.features.includes(feature)) {
            AppMaker._appData.features.push(feature);
          }
        } else {
          AppMaker._appData.features = AppMaker._appData.features.filter(f => f !== feature);
        }
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

    // Code snippets
    AppMaker._container.querySelectorAll('.snippet-card').forEach(card => {
      card.addEventListener('click', () => {
        const snippetType = card.dataset.snippet;
        AppMaker._insertSnippet(snippetType);
      });
    });

    // Tutorial navigation
    AppMaker._container.querySelectorAll('.tutorial-nav-item').forEach(item => {
      item.addEventListener('click', () => {
        AppMaker._container.querySelectorAll('.tutorial-nav-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        AppMaker._showTutorialSection(item.dataset.section);
      });
    });

    // Form inputs auto-save
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

  static _updateUI() {
    // Show current step
    AppMaker._container.querySelectorAll('.wizard-step').forEach(step => {
      step.style.display = 'none';
    });
    const currentStepEl = AppMaker._container.querySelector(`#step-${AppMaker._currentStep}`);
    if (currentStepEl) currentStepEl.style.display = 'block';

    // Update progress
    const steps = ['welcome', 'details', 'template', 'features', 'code', 'export'];
    const currentIndex = steps.indexOf(AppMaker._currentStep);
    const progress = ['demo', 'tutorial'].includes(AppMaker._currentStep) ? 0 : (currentIndex / (steps.length - 1)) * 100;
    AppMaker._container.querySelector('#progress-fill').style.width = progress + '%';

    // Update step dots
    AppMaker._container.querySelectorAll('.step-dot').forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
      dot.classList.toggle('completed', index < currentIndex);
    });

    // Update navigation
    const backBtn = AppMaker._container.querySelector('#back-btn');
    const nextBtn = AppMaker._container.querySelector('#next-btn');

    backBtn.style.visibility = currentIndex > 0 && !['demo', 'tutorial'].includes(AppMaker._currentStep) ? 'visible' : 'hidden';
    nextBtn.style.visibility = currentIndex < steps.length - 1 && !['demo', 'tutorial'].includes(AppMaker._currentStep) ? 'visible' : 'hidden';

    if (currentIndex === steps.length - 1) {
      nextBtn.style.visibility = 'hidden';
    }
  }

  static _nextStep() {
    const steps = ['welcome', 'details', 'template', 'features', 'code', 'export'];
    const currentIndex = steps.indexOf(AppMaker._currentStep);

    if (currentIndex < steps.length - 1) {
      AppMaker._currentStep = steps[currentIndex + 1];

      // Auto-populate data when moving to specific steps
      if (AppMaker._currentStep === 'code') {
        AppMaker._generateCode();
      } else if (AppMaker._currentStep === 'export') {
        AppMaker._updateExportSummary();
      }

      AppMaker._updateUI();
    }
  }

  static _prevStep() {
    const steps = ['welcome', 'details', 'template', 'features', 'code', 'export'];
    const currentIndex = steps.indexOf(AppMaker._currentStep);

    if (currentIndex > 0) {
      AppMaker._currentStep = steps[currentIndex - 1];
      AppMaker._updateUI();
    }
  }

  static _goToStep(step) {
    AppMaker._currentStep = step;
    AppMaker._updateUI();
  }

  static _showDemo() {
    AppMaker._currentStep = 'demo';
    AppMaker._updateUI();
  }

  static _showTutorial() {
    AppMaker._currentStep = 'tutorial';
    AppMaker._updateUI();
  }

  static _showTutorialSection(section) {
    AppMaker._container.querySelectorAll('.tutorial-section').forEach(s => s.style.display = 'none');
    const sectionEl = AppMaker._container.querySelector(`#tutorial-${section}`);
    if (sectionEl) sectionEl.style.display = 'block';
  }

  static _generateCode() {
    const templates = {
      basic: () => `class ${AppMaker._getClassName()} {
  static createWindow() {
    return {
      title: '${AppMaker._appData.name || 'My App'}',
      width: '${AppMaker._appData.width}',
      height: '${AppMaker._appData.height}',
      content: \`<div style="padding: 20px; font-family: Arial, sans-serif; ${AppMaker._getThemeStyles()}">
  <h2 style="margin: 0 0 15px 0; color: ${AppMaker._getThemeColors().primary};">${AppMaker._appData.name || 'My App'}</h2>
  <p style="margin: 0 0 20px 0; color: ${AppMaker._getThemeColors().text};">${AppMaker._appData.description || 'Welcome to my app!'}</p>
  <button id="demo-btn" style="padding: 12px 24px; background: ${AppMaker._getThemeColors().primary}; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 14px; transition: all 0.2s;">
    Click Me!
  </button>
  ${AppMaker._getFeatureElements()}
</div>\`,
      onInit: (container) => {
        const btn = container.querySelector('#demo-btn');
        btn.addEventListener('click', () => {
          ${AppMaker._hasFeature('notifications') ? 'AppMaker._showNotification("Hello from ' + (AppMaker._appData.name || 'My App') + '!");' : 'alert("Hello from ' + (AppMaker._appData.name || 'My App') + '!");'}
        });
        ${AppMaker._getFeatureInitCode()}
      }${AppMaker._getFeatureDestroyCode() ? ',\n      onDestroy: () => {\n        ' + AppMaker._getFeatureDestroyCode() + '\n      }' : ''}
    };
  }
  ${AppMaker._getFeatureMethods()}
}`,

      todo: () => `class ${AppMaker._getClassName()} {
  static _tasks = [];
  static _container = null;

  static createWindow() {
    return {
      title: '${AppMaker._appData.name || 'Todo List'}',
      width: '${AppMaker._appData.width}',
      height: '${AppMaker._appData.height}',
      content: \`<div style="padding: 20px; font-family: Arial, sans-serif; ${AppMaker._getThemeStyles()}">
  <h2 style="margin: 0 0 20px 0; color: ${AppMaker._getThemeColors().primary};">${AppMaker._appData.name || 'Todo List'}</h2>
  
  <div style="display: flex; gap: 10px; margin-bottom: 20px;">
    <input id="new-task" type="text" placeholder="Add new task..." style="flex: 1; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
    <button id="add-btn" style="padding: 10px 20px; background: ${AppMaker._getThemeColors().primary}; color: white; border: none; border-radius: 4px; cursor: pointer;">Add</button>
  </div>
  
  <div id="tasks-list" style="display: flex; flex-direction: column; gap: 8px;">
    <!-- Tasks will appear here -->
  </div>
  
  <div style="margin-top: 20px; padding: 15px; background: rgba(0,0,0,0.05); border-radius: 6px; font-size: 14px;">
    <strong>Stats:</strong> <span id="stats">0 tasks, 0 completed</span>
  </div>
  ${AppMaker._getFeatureElements()}
</div>\`,
      onInit: (container) => {
        ${AppMaker._getClassName()}._container = container;
        ${AppMaker._getClassName()}._setupEventListeners();
        ${AppMaker._getClassName()}._updateStats();
        ${AppMaker._getFeatureInitCode()}
      }${AppMaker._getFeatureDestroyCode() ? ',\n      onDestroy: () => {\n        ' + AppMaker._getFeatureDestroyCode() + '\n      }' : ''}
    };
  }
  
  static _setupEventListeners() {
    const addBtn = ${AppMaker._getClassName()}._container.querySelector('#add-btn');
    const newTaskInput = ${AppMaker._getClassName()}._container.querySelector('#new-task');
    
    addBtn.addEventListener('click', () => ${AppMaker._getClassName()}._addTask());
    newTaskInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') ${AppMaker._getClassName()}._addTask();
    });
  }
  
  static _addTask() {
    const input = ${AppMaker._getClassName()}._container.querySelector('#new-task');
    const text = input.value.trim();
    if (!text) return;
    
    const task = {
      id: Date.now(),
      text: text,
      completed: false
    };
    
    ${AppMaker._getClassName()}._tasks.push(task);
    ${AppMaker._getClassName()}._renderTasks();
    ${AppMaker._getClassName()}._updateStats();
    input.value = '';
    ${AppMaker._hasFeature('notifications') ? 'AppMaker._showNotification("Task added!");' : ''}
  }
  
  static _renderTasks() {
    const list = ${AppMaker._getClassName()}._container.querySelector('#tasks-list');
    list.innerHTML = '';
    
    ${AppMaker._getClassName()}._tasks.forEach(task => {
      const div = document.createElement('div');
      div.style.cssText = 'display: flex; align-items: center; gap: 10px; padding: 10px; background: white; border: 1px solid #e0e0e0; border-radius: 4px;';
      div.innerHTML = \`
        <input type="checkbox" \${task.completed ? 'checked' : ''} onchange="${AppMaker._getClassName()}._toggleTask(\${task.id})">
        <span style="flex: 1; \${task.completed ? 'text-decoration: line-through; opacity: 0.6;' : ''}">\${task.text}</span>
        <button onclick="${AppMaker._getClassName()}._deleteTask(\${task.id})" style="background: #ff6b6b; color: white; border: none; border-radius: 3px; padding: 4px 8px; cursor: pointer; font-size: 12px;">Delete</button>
      \`;
      list.appendChild(div);
    });
  }
  
  static _toggleTask(id) {
    const task = ${AppMaker._getClassName()}._tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      ${AppMaker._getClassName()}._renderTasks();
      ${AppMaker._getClassName()}._updateStats();
    }
  }
  
  static _deleteTask(id) {
    ${AppMaker._getClassName()}._tasks = ${AppMaker._getClassName()}._tasks.filter(t => t.id !== id);
    ${AppMaker._getClassName()}._renderTasks();
    ${AppMaker._getClassName()}._updateStats();
  }
  
  static _updateStats() {
    const total = ${AppMaker._getClassName()}._tasks.length;
    const completed = ${AppMaker._getClassName()}._tasks.filter(t => t.completed).length;
    const stats = ${AppMaker._getClassName()}._container.querySelector('#stats');
    stats.textContent = \`\${total} tasks, \${completed} completed\`;
  }
  ${AppMaker._getFeatureMethods()}
}`,

      timer: () => `class ${AppMaker._getClassName()} {
  static _container = null;
  static _timer = null;
  static _startTime = 0;
  static _elapsed = 0;
  static _isRunning = false;

  static createWindow() {
    return {
      title: '${AppMaker._appData.name || 'Timer'}',
      width: '${AppMaker._appData.width}',
      height: '${AppMaker._appData.height}',
      content: \`<div style="padding: 20px; font-family: Arial, sans-serif; text-align: center; ${AppMaker._getThemeStyles()}">
  <h2 style="margin: 0 0 30px 0; color: ${AppMaker._getThemeColors().primary};">${AppMaker._appData.name || 'Timer & Stopwatch'}</h2>
  
  <div style="font-size: 48px; font-weight: bold; color: ${AppMaker._getThemeColors().primary}; margin: 30px 0; font-family: 'Courier New', monospace;">
    <span id="display">00:00:00</span>
  </div>
  
  <div style="display: flex; gap: 15px; justify-content: center; margin: 30px 0;">
    <button id="start-btn" style="padding: 12px 24px; background: #28a745; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 16px;">Start</button>
    <button id="pause-btn" style="padding: 12px 24px; background: #ffc107; color: #333; border: none; border-radius: 6px; cursor: pointer; font-size: 16px;" disabled>Pause</button>
    <button id="reset-btn" style="padding: 12px 24px; background: #dc3545; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 16px;">Reset</button>
  </div>
  
  <div style="margin: 20px 0;">
    <div style="margin-bottom: 10px;">
      <label style="display: block; margin-bottom: 5px; font-weight: 500;">Set Timer (minutes):</label>
      <input id="timer-input" type="number" min="1" max="120" placeholder="5" style="padding: 8px; border: 1px solid #ddd; border-radius: 4px; width: 80px; text-align: center;">
      <button id="set-timer-btn" style="padding: 8px 16px; background: ${AppMaker._getThemeColors().primary}; color: white; border: none; border-radius: 4px; cursor: pointer; margin-left: 10px;">Set Timer</button>
    </div>
  </div>
  ${AppMaker._getFeatureElements()}
</div>\`,
      onInit: (container) => {
        ${AppMaker._getClassName()}._container = container;
        ${AppMaker._getClassName()}._setupEventListeners();
        ${AppMaker._getFeatureInitCode()}
      },
      onDestroy: () => {
        if (${AppMaker._getClassName()}._timer) {
          clearInterval(${AppMaker._getClassName()}._timer);
        }
        ${AppMaker._getFeatureDestroyCode()}
      }
    };
  }
  
  static _setupEventListeners() {
    const startBtn = ${AppMaker._getClassName()}._container.querySelector('#start-btn');
    const pauseBtn = ${AppMaker._getClassName()}._container.querySelector('#pause-btn');
    const resetBtn = ${AppMaker._getClassName()}._container.querySelector('#reset-btn');
    const setTimerBtn = ${AppMaker._getClassName()}._container.querySelector('#set-timer-btn');
    
    startBtn.addEventListener('click', () => ${AppMaker._getClassName()}._start());
    pauseBtn.addEventListener('click', () => ${AppMaker._getClassName()}._pause());
    resetBtn.addEventListener('click', () => ${AppMaker._getClassName()}._reset());
    setTimerBtn.addEventListener('click', () => ${AppMaker._getClassName()}._setTimer());
  }
  
  static _start() {
    if (!${AppMaker._getClassName()}._isRunning) {
      ${AppMaker._getClassName()}._startTime = Date.now() - ${AppMaker._getClassName()}._elapsed;
      ${AppMaker._getClassName()}._timer = setInterval(() => ${AppMaker._getClassName()}._update(), 10);
      ${AppMaker._getClassName()}._isRunning = true;
      
      ${AppMaker._getClassName()}._container.querySelector('#start-btn').disabled = true;
      ${AppMaker._getClassName()}._container.querySelector('#pause-btn').disabled = false;
    }
  }
  
  static _pause() {
    if (${AppMaker._getClassName()}._isRunning) {
      clearInterval(${AppMaker._getClassName()}._timer);
      ${AppMaker._getClassName()}._isRunning = false;
      
      ${AppMaker._getClassName()}._container.querySelector('#start-btn').disabled = false;
      ${AppMaker._getClassName()}._container.querySelector('#pause-btn').disabled = true;
    }
  }
  
  static _reset() {
    clearInterval(${AppMaker._getClassName()}._timer);
    ${AppMaker._getClassName()}._elapsed = 0;
    ${AppMaker._getClassName()}._isRunning = false;
    
    ${AppMaker._getClassName()}._container.querySelector('#display').textContent = '00:00:00';
    ${AppMaker._getClassName()}._container.querySelector('#start-btn').disabled = false;
    ${AppMaker._getClassName()}._container.querySelector('#pause-btn').disabled = true;
  }
  
  static _setTimer() {
    const input = ${AppMaker._getClassName()}._container.querySelector('#timer-input');
    const minutes = parseInt(input.value) || 5;
    ${AppMaker._getClassName()}._elapsed = 0;
    ${AppMaker._getClassName()}._updateDisplay();
    ${AppMaker._hasFeature('notifications') ? 'AppMaker._showNotification(`Timer set for ${minutes} minutes`);' : 'alert(`Timer set for ${minutes} minutes`);'}
  }
  
  static _update() {
    ${AppMaker._getClassName()}._elapsed = Date.now() - ${AppMaker._getClassName()}._startTime;
    ${AppMaker._getClassName()}._updateDisplay();
  }
  
  static _updateDisplay() {
    const totalSeconds = Math.floor(${AppMaker._getClassName()}._elapsed / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    const display = ${AppMaker._getClassName()}._container.querySelector('#display');
    display.textContent = \`\${hours.toString().padStart(2, '0')}:\${minutes.toString().padStart(2, '0')}:\${seconds.toString().padStart(2, '0')}\`;
  }
  ${AppMaker._getFeatureMethods()}
}`

      // Additional templates would continue here...
    };

    const template = templates[AppMaker._appData.template] || templates.basic;
    AppMaker._container.querySelector('#code-editor').value = template();
    AppMaker._updatePreview();
  }

  static _getClassName() {
    const name = AppMaker._appData.name || 'MyApp';
    return name.replace(/[^a-zA-Z0-9]/g, '') || 'MyApp';
  }

  static _getThemeStyles() {
    const themes = {
      modern: 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;',
      minimal: 'background: #f8f9fa; color: #333;',
      dark: 'background: #2c3e50; color: #ecf0f1;',
      colorful: 'background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1); color: white;'
    };
    return themes[AppMaker._appData.theme] || themes.modern;
  }

  static _getThemeColors() {
    const colors = {
      modern: { primary: '#00ff88', text: 'white', bg: '#667eea' },
      minimal: { primary: '#007acc', text: '#333', bg: '#f8f9fa' },
      dark: { primary: '#3498db', text: '#ecf0f1', bg: '#2c3e50' },
      colorful: { primary: '#ff6b6b', text: 'white', bg: '#4ecdc4' }
    };
    return colors[AppMaker._appData.theme] || colors.modern;
  }

  static _hasFeature(feature) {
    return AppMaker._appData.features.includes(feature);
  }

  static _getFeatureElements() {
    let elements = '';
    if (AppMaker._hasFeature('help-system')) {
      elements += `\n  <button id="help-btn" style="position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.1); border: 1px solid rgba(0,0,0,0.2); border-radius: 50%; width: 30px; height: 30px; cursor: pointer; font-size: 14px;">?</button>`;
    }
    if (AppMaker._hasFeature('fullscreen')) {
      elements += `\n  <button id="fullscreen-btn" style="position: absolute; top: 10px; right: 50px; background: rgba(0,0,0,0.1); border: 1px solid rgba(0,0,0,0.2); border-radius: 4px; padding: 5px 10px; cursor: pointer; font-size: 12px;">⛶</button>`;
    }
    return elements;
  }

  static _getFeatureInitCode() {
    let code = '';
    if (AppMaker._hasFeature('help-system')) {
      code += `\n        const helpBtn = container.querySelector('#help-btn');
        if (helpBtn) helpBtn.addEventListener('click', () => alert('Help: This is ${AppMaker._appData.name || 'your app'}. ${AppMaker._appData.description || 'No additional help available.'}'));`;
    }
    if (AppMaker._hasFeature('keyboard-shortcuts')) {
      code += `\n        document.addEventListener('keydown', ${AppMaker._getClassName()}._handleKeyboard);`;
    }
    if (AppMaker._hasFeature('save-state')) {
      code += `\n        ${AppMaker._getClassName()}._loadState();`;
    }
    return code;
  }

  static _getFeatureDestroyCode() {
    let code = '';
    if (AppMaker._hasFeature('keyboard-shortcuts')) {
      code += `document.removeEventListener('keydown', ${AppMaker._getClassName()}._handleKeyboard);`;
    }
    if (AppMaker._hasFeature('save-state')) {
      code += `${AppMaker._getClassName()}._saveState();`;
    }
    return code;
  }

  static _getFeatureMethods() {
    let methods = '';

    if (AppMaker._hasFeature('keyboard-shortcuts')) {
      methods += `\n  
  static _handleKeyboard(e) {
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      ${AppMaker._hasFeature('notifications') ? 'AppMaker._showNotification("Saved!");' : 'alert("Saved!");'}
    }
  }`;
    }

    if (AppMaker._hasFeature('save-state')) {
      methods += `\n  
  static _saveState() {
    // Save app state to localStorage
    try {
      localStorage.setItem('${AppMaker._getClassName()}_state', JSON.stringify(${AppMaker._getClassName()}._getState()));
    } catch(e) { console.warn('Could not save state'); }
  }
  
  static _loadState() {
    // Load app state from localStorage
    try {
      const saved = localStorage.getItem('${AppMaker._getClassName()}_state');
      if (saved) ${AppMaker._getClassName()}._setState(JSON.parse(saved));
    } catch(e) { console.warn('Could not load state'); }
  }
  
  static _getState() {
    return {}; // Override to return app state
  }
  
  static _setState(state) {
    // Override to restore app state
  }`;
    }

    if (AppMaker._hasFeature('notifications')) {
      methods += `\n  
  static _showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #333; color: white; padding: 10px 20px; border-radius: 4px; z-index: 10000; animation: slideIn 0.3s ease;';
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }`;
    }

    return methods;
  }

  static _insertSnippet(type) {
    const snippet = AppMaker._codeSnippets[type];
    if (snippet) {
      const editor = AppMaker._container.querySelector('#code-editor');
      const cursorPos = editor.selectionStart;
      const textBefore = editor.value.substring(0, cursorPos);
      const textAfter = editor.value.substring(cursorPos);
      editor.value = textBefore + snippet + textAfter;
      editor.focus();
      editor.setSelectionRange(cursorPos + snippet.length, cursorPos + snippet.length);
    }
  }

  static _showSnippets() {
    const panel = AppMaker._container.querySelector('#snippets-panel');
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
  }

  static _resetCode() {
    AppMaker._generateCode();
  }

  static _formatCode() {
    const editor = AppMaker._container.querySelector('#code-editor');
    // Basic code formatting
    let code = editor.value;
    code = code.replace(/\s*{\s*/g, ' {\n  ');
    code = code.replace(/;\s*/g, ';\n  ');
    code = code.replace(/}\s*/g, '\n}\n');
    editor.value = code;
  }

  static _validateCode() {
    try {
      const code = AppMaker._container.querySelector('#code-editor').value;
      new Function(code);
      AppMaker._container.querySelector('#code-status').textContent = '✅ Valid';
      AppMaker._container.querySelector('#code-status').style.color = '#28a745';
    } catch (e) {
      AppMaker._container.querySelector('#code-status').textContent = '❌ Error: ' + e.message;
      AppMaker._container.querySelector('#code-status').style.color = '#dc3545';
    }
  }

  static _updatePreview() {
    try {
      const code = AppMaker._container.querySelector('#code-editor').value;
      const preview = AppMaker._container.querySelector('#preview-container');
      const mode = AppMaker._container.querySelector('#preview-mode').value;

      if (mode === 'content') {
        const contentMatch = code.match(/content:\s*`([^`]+)`/s);
        if (contentMatch) {
          preview.innerHTML = contentMatch[1];
        } else {
          preview.innerHTML = '<p style="color: #666; text-align: center; margin-top: 50px;">No content found in code</p>';
        }
      } else {
        preview.innerHTML = '<p style="color: #666; text-align: center; margin-top: 50px;">Full window preview not available in editor</p>';
      }
    } catch (e) {
      AppMaker._container.querySelector('#preview-container').innerHTML = '<p style="color: #dc3545; text-align: center; margin-top: 50px;">Preview error: ' + e.message + '</p>';
    }
  }

  static _updateExportSummary() {
    const summary = AppMaker._container.querySelector('#export-summary');
    summary.innerHTML = `
      <div style="display: grid; grid-template-columns: auto 1fr; gap: 10px 20px; align-items: center;">
        <strong>Name:</strong> <span>${AppMaker._appData.name || 'Untitled'}</span>
        <strong>Icon:</strong> <span>${AppMaker._appData.icon}</span>
        <strong>Description:</strong> <span>${AppMaker._appData.description || 'No description'}</span>
        <strong>Category:</strong> <span>${AppMaker._appData.category}</span>
        <strong>Version:</strong> <span>${AppMaker._appData.version}</span>
        <strong>Author:</strong> <span>${AppMaker._appData.author}</span>
        <strong>Template:</strong> <span>${AppMaker._appData.template}</span>
        <strong>Theme:</strong> <span>${AppMaker._appData.theme}</span>
        <strong>Size:</strong> <span>${AppMaker._appData.width} × ${AppMaker._appData.height}</span>
        <strong>Features:</strong> <span>${AppMaker._appData.features.length > 0 ? AppMaker._appData.features.join(', ') : 'None'}</span>
      </div>
    `;
  }

  static _exportApp(format = 'js') {
    const className = AppMaker._getClassName();
    const code = AppMaker._container.querySelector('#code-editor').value;

    // Generate a plain comment block (no APP_METADATA tag) for the exported file
    const metadata = `/**
 * Generated App Metadata
 * name: ${AppMaker._appData.name || className}
 * icon: ${AppMaker._appData.icon}
 * description: ${AppMaker._appData.description || 'Generated with AppMaker 2.0'}
 * category: ${AppMaker._appData.category}
 * version: ${AppMaker._appData.version}
 * author: ${AppMaker._appData.author}
 * enabled: true
 */

`;

    let finalContent = metadata + code + `\n\nwindow.${className} = ${className};`;

    if (format === 'bundle') {
      const documentation = `
/*
=== ${AppMaker._appData.name || className} ===

Generated with AppMaker 2.0

INSTALLATION:
1. Save this file as ${className}.js in your EmberFrame apps directory
2. Restart EmberFrame or refresh the app list
3. Launch from the applications menu

FEATURES:
${AppMaker._appData.features.map(f => `- ${f.replace('-', ' ')}`).join('\n') || '- Basic functionality'}

CUSTOMIZATION:
- Edit the content template to change the interface
- Modify onInit to add event listeners and logic
- Adjust styles for different themes

TEMPLATE: ${AppMaker._appData.template}
THEME: ${AppMaker._appData.theme}
*/

`;
      finalContent = documentation + finalContent;
    }

    AppMaker._downloadFile(finalContent, `${className}.js`);
  }

  static _downloadFile(content, filename) {
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
  }

  static _testApp() {
    try {
      const code = AppMaker._container.querySelector('#code-editor').value;
      eval(code);
      const className = AppMaker._getClassName();
      if (window[className] && window[className].createWindow) {
        alert('✅ App code is valid and ready to use!\n\nThe app will work properly in EmberFrame.');
      } else {
        alert('⚠️ App code compiled but may be missing required structure.\n\nMake sure your class has a createWindow() method.');
      }
    } catch (e) {
      alert('❌ App code has errors:\n\n' + e.message + '\n\nPlease fix the errors before exporting.');
    }
  }

  static _shareApp() {
    const code = AppMaker._container.querySelector('#code-editor').value;
    navigator.clipboard.writeText(code).then(() => {
      alert('📋 Code copied to clipboard!\n\nYou can now share it with others.');
    }).catch(() => {
      prompt('Copy this code to share:', code);
    });
  }

  static _startOver() {
    if (confirm('Start over? This will reset all your progress.')) {
      AppMaker._appData = {
        name: '',
        icon: 'fas fa-magic',
        description: '',
        category: 'Utilities',
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
    }
  }
}

window.AppMaker = AppMaker;
