/**
 * APP_METADATA
 * @name Appmaker
 * @icon fas fa-hammer
 * @description Interactive application builder with wizard and tutorials
 * @category Utilities
 * @version 1.0.0
 * @author EmberFrame Team
 * @enabled true
 */

class Appmaker {
    static createWindow() {
        return {
            title: 'EmberFrame Appmaker',
            width: '1200px',
            height: '800px',
            autoSize: false,
            content: `
                <div class="appmaker">
                    <!-- Header -->
                    <div class="appmaker-header">
                        <div class="header-left">
                            <h1><i class="fas fa-hammer"></i> EmberFrame Appmaker</h1>
                            <p>Build custom applications with visual tools and wizards</p>
                        </div>
                        <div class="header-right">
                            <button class="btn btn-secondary" onclick="Appmaker.showHelp()">
                                <i class="fas fa-question-circle"></i> Help
                            </button>
                            <button class="btn btn-primary" onclick="Appmaker.newApp()">
                                <i class="fas fa-plus"></i> New App
                            </button>
                        </div>
                    </div>

                    <!-- Main Navigation -->
                    <div class="appmaker-nav">
                        <button class="nav-btn active" onclick="Appmaker.switchTab('welcome')" data-tab="welcome">
                            <i class="fas fa-home"></i> Welcome
                        </button>
                        <button class="nav-btn" onclick="Appmaker.switchTab('wizard')" data-tab="wizard">
                            <i class="fas fa-magic"></i> App Wizard
                        </button>
                        <button class="nav-btn" onclick="Appmaker.switchTab('designer')" data-tab="designer">
                            <i class="fas fa-paint-brush"></i> Visual Designer
                        </button>
                        <button class="nav-btn" onclick="Appmaker.switchTab('code')" data-tab="code">
                            <i class="fas fa-code"></i> Code Editor
                        </button>
                        <button class="nav-btn" onclick="Appmaker.switchTab('preview')" data-tab="preview">
                            <i class="fas fa-eye"></i> Preview
                        </button>
                        <button class="nav-btn" onclick="Appmaker.switchTab('export')" data-tab="export">
                            <i class="fas fa-download"></i> Export
                        </button>
                    </div>

                    <!-- Content Area -->
                    <div class="appmaker-content">
                        
                        <!-- Welcome Tab -->
                        <div class="tab-content active" id="welcome-tab">
                            <div class="welcome-section">
                                <div class="welcome-hero">
                                    <h2>🚀 Welcome to EmberFrame Appmaker</h2>
                                    <p>Create powerful applications with our intuitive visual tools and step-by-step wizards.</p>
                                </div>

                                <div class="quick-start-grid">
                                    <div class="quick-card" onclick="Appmaker.startWizard()">
                                        <div class="card-icon">🧙‍♂️</div>
                                        <h3>Start with Wizard</h3>
                                        <p>Guided step-by-step app creation process</p>
                                        <div class="card-action">Get Started →</div>
                                    </div>

                                    <div class="quick-card" onclick="Appmaker.useTemplate()">
                                        <div class="card-icon">📋</div>
                                        <h3>Use Template</h3>
                                        <p>Start from pre-built app templates</p>
                                        <div class="card-action">Browse Templates →</div>
                                    </div>

                                    <div class="quick-card" onclick="Appmaker.startTutorial()">
                                        <div class="card-icon">🎓</div>
                                        <h3>Learn Tutorial</h3>
                                        <p>Interactive tutorials and examples</p>
                                        <div class="card-action">Start Learning →</div>
                                    </div>

                                    <div class="quick-card" onclick="Appmaker.importApp()">
                                        <div class="card-icon">📥</div>
                                        <h3>Import App</h3>
                                        <p>Load existing app for editing</p>
                                        <div class="card-action">Import →</div>
                                    </div>
                                </div>

                                <div class="recent-apps">
                                    <h3>Recent Applications</h3>
                                    <div class="recent-list" id="recent-apps-list">
                                        <!-- Recent apps will be populated here -->
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Wizard Tab -->
                        <div class="tab-content" id="wizard-tab">
                            <div class="wizard-container">
                                <div class="wizard-progress">
                                    <div class="progress-step active" data-step="1">1. Basic Info</div>
                                    <div class="progress-step" data-step="2">2. App Type</div>
                                    <div class="progress-step" data-step="3">3. Features</div>
                                    <div class="progress-step" data-step="4">4. Design</div>
                                    <div class="progress-step" data-step="5">5. Review</div>
                                </div>

                                <div class="wizard-content">
                                    <!-- Step 1: Basic Info -->
                                    <div class="wizard-step active" data-step="1">
                                        <h2>📝 Basic Application Information</h2>
                                        <div class="form-grid">
                                            <div class="form-group">
                                                <label for="app-name">Application Name *</label>
                                                <input type="text" id="app-name" placeholder="My Awesome App" required>
                                                <small>This will be displayed in the start menu</small>
                                            </div>
                                            <div class="form-group">
                                                <label for="app-id">App ID *</label>
                                                <input type="text" id="app-id" placeholder="my-awesome-app" required>
                                                <small>Unique identifier (lowercase, dashes only)</small>
                                            </div>
                                            <div class="form-group">
                                                <label for="app-description">Description</label>
                                                <textarea id="app-description" placeholder="Brief description of your app"></textarea>
                                            </div>
                                            <div class="form-group">
                                                <label for="app-icon">Icon</label>
                                                <select id="app-icon">
                                                    <option value="fas fa-star">⭐ Star</option>
                                                    <option value="fas fa-rocket">🚀 Rocket</option>
                                                    <option value="fas fa-heart">❤️ Heart</option>
                                                    <option value="fas fa-cog">⚙️ Gear</option>
                                                    <option value="fas fa-file">📄 File</option>
                                                    <option value="fas fa-chart-bar">📊 Chart</option>
                                                    <option value="fas fa-calculator">🧮 Calculator</option>
                                                    <option value="fas fa-gamepad">🎮 Game</option>
                                                </select>
                                            </div>
                                            <div class="form-group">
                                                <label for="app-category">Category</label>
                                                <select id="app-category">
                                                    <option value="Productivity">Productivity</option>
                                                    <option value="Entertainment">Entertainment</option>
                                                    <option value="Utilities">Utilities</option>
                                                    <option value="Games">Games</option>
                                                    <option value="Development">Development</option>
                                                    <option value="Education">Education</option>
                                                </select>
                                            </div>
                                            <div class="form-group">
                                                <label for="app-author">Author</label>
                                                <input type="text" id="app-author" placeholder="Your Name">
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Step 2: App Type -->
                                    <div class="wizard-step" data-step="2">
                                        <h2>🎯 Choose Application Type</h2>
                                        <div class="app-type-grid">
                                            <div class="type-card" onclick="Appmaker.selectAppType('form')" data-type="form">
                                                <div class="type-icon">📝</div>
                                                <h3>Form Application</h3>
                                                <p>Create forms, surveys, data input apps</p>
                                                <ul>
                                                    <li>Input fields and validation</li>
                                                    <li>Data submission</li>
                                                    <li>User-friendly forms</li>
                                                </ul>
                                            </div>

                                            <div class="type-card" onclick="Appmaker.selectAppType('dashboard')" data-type="dashboard">
                                                <div class="type-icon">📊</div>
                                                <h3>Dashboard</h3>
                                                <p>Display data, charts, and metrics</p>
                                                <ul>
                                                    <li>Data visualization</li>
                                                    <li>Real-time updates</li>
                                                    <li>Interactive charts</li>
                                                </ul>
                                            </div>

                                            <div class="type-card" onclick="Appmaker.selectAppType('tool')" data-type="tool">
                                                <div class="type-icon">🔧</div>
                                                <h3>Utility Tool</h3>
                                                <p>Calculators, converters, utilities</p>
                                                <ul>
                                                    <li>Custom calculations</li>
                                                    <li>Data processing</li>
                                                    <li>Quick utilities</li>
                                                </ul>
                                            </div>

                                            <div class="type-card" onclick="Appmaker.selectAppType('game')" data-type="game">
                                                <div class="type-icon">🎮</div>
                                                <h3>Simple Game</h3>
                                                <p>Interactive games and puzzles</p>
                                                <ul>
                                                    <li>Game mechanics</li>
                                                    <li>Score tracking</li>
                                                    <li>Interactive elements</li>
                                                </ul>
                                            </div>

                                            <div class="type-card" onclick="Appmaker.selectAppType('viewer')" data-type="viewer">
                                                <div class="type-icon">👁️</div>
                                                <h3>Content Viewer</h3>
                                                <p>Display content, galleries, readers</p>
                                                <ul>
                                                    <li>Content display</li>
                                                    <li>Navigation</li>
                                                    <li>Media support</li>
                                                </ul>
                                            </div>

                                            <div class="type-card" onclick="Appmaker.selectAppType('custom')" data-type="custom">
                                                <div class="type-icon">🎨</div>
                                                <h3>Custom App</h3>
                                                <p>Start from scratch with full control</p>
                                                <ul>
                                                    <li>Complete customization</li>
                                                    <li>Advanced features</li>
                                                    <li>No limitations</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Step 3: Features -->
                                    <div class="wizard-step" data-step="3">
                                        <h2>⚡ Select Features</h2>
                                        <div class="features-section" id="features-section">
                                            <!-- Features will be populated based on app type -->
                                        </div>
                                    </div>

                                    <!-- Step 4: Design -->
                                    <div class="wizard-step" data-step="4">
                                        <h2>🎨 Choose Design Theme</h2>
                                        <div class="theme-grid">
                                            <div class="theme-card" onclick="Appmaker.selectTheme('modern')" data-theme="modern">
                                                <div class="theme-preview modern-theme"></div>
                                                <h3>Modern</h3>
                                                <p>Clean, minimalist design</p>
                                            </div>
                                            <div class="theme-card" onclick="Appmaker.selectTheme('dark')" data-theme="dark">
                                                <div class="theme-preview dark-theme"></div>
                                                <h3>Dark</h3>
                                                <p>Dark mode interface</p>
                                            </div>
                                            <div class="theme-card" onclick="Appmaker.selectTheme('colorful')" data-theme="colorful">
                                                <div class="theme-preview colorful-theme"></div>
                                                <h3>Colorful</h3>
                                                <p>Vibrant and engaging</p>
                                            </div>
                                            <div class="theme-card" onclick="Appmaker.selectTheme('classic')" data-theme="classic">
                                                <div class="theme-preview classic-theme"></div>
                                                <h3>Classic</h3>
                                                <p>Traditional interface</p>
                                            </div>
                                        </div>

                                        <div class="layout-options">
                                            <h3>Layout Options</h3>
                                            <div class="layout-grid">
                                                <div class="layout-option" onclick="Appmaker.selectLayout('single')" data-layout="single">
                                                    <div class="layout-preview">
                                                        <div class="layout-box single"></div>
                                                    </div>
                                                    <span>Single Page</span>
                                                </div>
                                                <div class="layout-option" onclick="Appmaker.selectLayout('tabs')" data-layout="tabs">
                                                    <div class="layout-preview">
                                                        <div class="layout-box tabs"></div>
                                                    </div>
                                                    <span>Tabbed</span>
                                                </div>
                                                <div class="layout-option" onclick="Appmaker.selectLayout('sidebar')" data-layout="sidebar">
                                                    <div class="layout-preview">
                                                        <div class="layout-box sidebar"></div>
                                                    </div>
                                                    <span>Sidebar</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Step 5: Review -->
                                    <div class="wizard-step" data-step="5">
                                        <h2>📋 Review & Generate</h2>
                                        <div class="review-section">
                                            <div class="review-card">
                                                <h3>App Summary</h3>
                                                <div id="app-summary">
                                                    <!-- Summary will be populated -->
                                                </div>
                                            </div>
                                            <div class="review-actions">
                                                <button class="btn btn-primary btn-large" onclick="Appmaker.generateApp()">
                                                    <i class="fas fa-magic"></i> Generate Application
                                                </button>
                                                <p>Your app will be created and opened in the designer for further customization.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="wizard-navigation">
                                    <button class="btn btn-secondary" onclick="Appmaker.prevStep()" id="prev-btn" disabled>
                                        <i class="fas fa-arrow-left"></i> Previous
                                    </button>
                                    <button class="btn btn-primary" onclick="Appmaker.nextStep()" id="next-btn">
                                        Next <i class="fas fa-arrow-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Designer Tab -->
                        <div class="tab-content" id="designer-tab">
                            <div class="designer-layout">
                                <div class="designer-sidebar">
                                    <div class="sidebar-section">
                                        <h3>Components</h3>
                                        <div class="component-palette">
                                            <div class="component-item" draggable="true" data-component="text">
                                                <i class="fas fa-font"></i> Text
                                            </div>
                                            <div class="component-item" draggable="true" data-component="input">
                                                <i class="fas fa-edit"></i> Input
                                            </div>
                                            <div class="component-item" draggable="true" data-component="button">
                                                <i class="fas fa-square"></i> Button
                                            </div>
                                            <div class="component-item" draggable="true" data-component="select">
                                                <i class="fas fa-list"></i> Select
                                            </div>
                                            <div class="component-item" draggable="true" data-component="checkbox">
                                                <i class="fas fa-check-square"></i> Checkbox
                                            </div>
                                            <div class="component-item" draggable="true" data-component="image">
                                                <i class="fas fa-image"></i> Image
                                            </div>
                                            <div class="component-item" draggable="true" data-component="table">
                                                <i class="fas fa-table"></i> Table
                                            </div>
                                            <div class="component-item" draggable="true" data-component="card">
                                                <i class="fas fa-id-card"></i> Card
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="designer-main">
                                    <div class="designer-toolbar">
                                        <div class="toolbar-group">
                                            <button class="btn btn-sm" onclick="Appmaker.undo()">
                                                <i class="fas fa-undo"></i>
                                            </button>
                                            <button class="btn btn-sm" onclick="Appmaker.redo()">
                                                <i class="fas fa-redo"></i>
                                            </button>
                                        </div>
                                        <div class="toolbar-group">
                                            <button class="btn btn-sm" onclick="Appmaker.zoomOut()">
                                                <i class="fas fa-search-minus"></i>
                                            </button>
                                            <span id="zoom-level">100%</span>
                                            <button class="btn btn-sm" onclick="Appmaker.zoomIn()">
                                                <i class="fas fa-search-plus"></i>
                                            </button>
                                        </div>
                                        <div class="toolbar-group">
                                            <button class="btn btn-sm" onclick="Appmaker.previewDesign()">
                                                <i class="fas fa-eye"></i> Preview
                                            </button>
                                        </div>
                                    </div>

                                    <div class="design-canvas" id="design-canvas">
                                        <div class="canvas-placeholder">
                                            <div class="placeholder-content">
                                                <i class="fas fa-mouse-pointer"></i>
                                                <h3>Drag components here to start designing</h3>
                                                <p>Use the component palette on the left to add elements to your app</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="designer-properties">
                                    <div class="sidebar-section">
                                        <h3>Properties</h3>
                                        <div class="properties-panel" id="properties-panel">
                                            <div class="no-selection">
                                                <p>Select a component to edit its properties</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Code Editor Tab -->
                        <div class="tab-content" id="code-tab">
                            <div class="code-editor-layout">
                                <div class="code-toolbar">
                                    <div class="toolbar-left">
                                        <button class="btn btn-sm" onclick="Appmaker.formatCode()">
                                            <i class="fas fa-indent"></i> Format
                                        </button>
                                        <button class="btn btn-sm" onclick="Appmaker.validateCode()">
                                            <i class="fas fa-check"></i> Validate
                                        </button>
                                    </div>
                                    <div class="toolbar-right">
                                        <button class="btn btn-sm" onclick="Appmaker.insertSnippet()">
                                            <i class="fas fa-code"></i> Snippets
                                        </button>
                                        <button class="btn btn-sm" onclick="Appmaker.showCodeHelp()">
                                            <i class="fas fa-question"></i> Help
                                        </button>
                                    </div>
                                </div>

                                <div class="code-content">
                                    <div class="code-editor">
                                        <textarea id="code-editor" placeholder="// Your app code will appear here
// You can edit it directly or use the visual designer

/**
 * APP_METADATA
 * @name My App
 * @icon fas fa-star
 * @description My custom application
 * @category Custom
 * @version 1.0.0
 * @author Your Name
 * @enabled true
 */

class MyApp {
    static createWindow() {
        return {
            title: 'My App',
            width: '600px',
            height: '400px',
            content: \`
                <div class='my-app'>
                    <h1>Hello World!</h1>
                    <p>Welcome to my custom app.</p>
                </div>
            \`,
            onInit: (windowElement) => {
                MyApp.init(windowElement);
            }
        };
    }

    static init(windowElement) {
        console.log('My app initialized!');
    }
}

window.MyApp = MyApp;"></textarea>
                                    </div>
                                    <div class="code-sidebar">
                                        <div class="code-panel">
                                            <h4>Code Structure</h4>
                                            <div class="code-outline">
                                                <div class="outline-item">
                                                    <i class="fas fa-info-circle"></i> Metadata
                                                </div>
                                                <div class="outline-item">
                                                    <i class="fas fa-cube"></i> Class Definition
                                                </div>
                                                <div class="outline-item">
                                                    <i class="fas fa-window-maximize"></i> createWindow()
                                                </div>
                                                <div class="outline-item">
                                                    <i class="fas fa-cog"></i> init() method
                                                </div>
                                            </div>
                                        </div>

                                        <div class="code-panel">
                                            <h4>Quick Actions</h4>
                                            <button class="action-btn" onclick="Appmaker.addEvent()">
                                                <i class="fas fa-bolt"></i> Add Event Handler
                                            </button>
                                            <button class="action-btn" onclick="Appmaker.addStyle()">
                                                <i class="fas fa-palette"></i> Add Styling
                                            </button>
                                            <button class="action-btn" onclick="Appmaker.addMethod()">
                                                <i class="fas fa-plus"></i> Add Method
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Preview Tab -->
                        <div class="tab-content" id="preview-tab">
                            <div class="preview-layout">
                                <div class="preview-toolbar">
                                    <div class="toolbar-left">
                                        <button class="btn btn-primary" onclick="Appmaker.refreshPreview()">
                                            <i class="fas fa-sync"></i> Refresh Preview
                                        </button>
                                        <button class="btn btn-secondary" onclick="Appmaker.testApp()">
                                            <i class="fas fa-play"></i> Test App
                                        </button>
                                    </div>
                                    <div class="toolbar-center">
                                        <div class="device-selector">
                                            <button class="device-btn active" data-device="desktop" onclick="Appmaker.changeDevice('desktop')">
                                                <i class="fas fa-desktop"></i>
                                            </button>
                                            <button class="device-btn" data-device="tablet" onclick="Appmaker.changeDevice('tablet')">
                                                <i class="fas fa-tablet-alt"></i>
                                            </button>
                                            <button class="device-btn" data-device="mobile" onclick="Appmaker.changeDevice('mobile')">
                                                <i class="fas fa-mobile-alt"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="toolbar-right">
                                        <button class="btn btn-secondary" onclick="Appmaker.sharePreview()">
                                            <i class="fas fa-share"></i> Share
                                        </button>
                                    </div>
                                </div>

                                <div class="preview-container">
                                    <div class="preview-frame" id="preview-frame">
                                        <div class="preview-window desktop" id="preview-window">
                                            <div class="preview-header">
                                                <div class="preview-title">App Preview</div>
                                                <div class="preview-controls">
                                                    <div class="control minimize"></div>
                                                    <div class="control maximize"></div>
                                                    <div class="control close"></div>
                                                </div>
                                            </div>
                                            <div class="preview-content" id="preview-content">
                                                <div class="preview-placeholder">
                                                    <i class="fas fa-eye"></i>
                                                    <h3>App Preview</h3>
                                                    <p>Your app will appear here when you refresh the preview</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Export Tab -->
                        <div class="tab-content" id="export-tab">
                            <div class="export-section">
                                <div class="export-header">
                                    <h2>📦 Export Your Application</h2>
                                    <p>Download your completed app to install in EmberFrame</p>
                                </div>

                                <div class="export-options">
                                    <div class="export-card">
                                        <div class="export-icon">💾</div>
                                        <h3>Save to EmberFrame</h3>
                                        <p>Install directly to your EmberFrame apps folder</p>
                                        <button class="btn btn-primary" onclick="Appmaker.saveToEmberFrame()">
                                            <i class="fas fa-save"></i> Save to Apps
                                        </button>
                                    </div>

                                    <div class="export-card">
                                        <div class="export-icon">📥</div>
                                        <h3>Download File</h3>
                                        <p>Download as .js file for manual installation</p>
                                        <button class="btn btn-secondary" onclick="Appmaker.downloadFile()">
                                            <i class="fas fa-download"></i> Download
                                        </button>
                                    </div>

                                    <div class="export-card">
                                        <div class="export-icon">📋</div>
                                        <h3>Copy Code</h3>
                                        <p>Copy code to clipboard for sharing</p>
                                        <button class="btn btn-secondary" onclick="Appmaker.copyCode()">
                                            <i class="fas fa-copy"></i> Copy
                                        </button>
                                    </div>

                                    <div class="export-card">
                                        <div class="export-icon">🔗</div>
                                        <h3>Share Link</h3>
                                        <p>Generate shareable link for others</p>
                                        <button class="btn btn-secondary" onclick="Appmaker.shareLink()">
                                            <i class="fas fa-link"></i> Share
                                        </button>
                                    </div>
                                </div>

                                <div class="export-info">
                                    <h3>📋 Installation Instructions</h3>
                                    <div class="instructions">
                                        <ol>
                                            <li><strong>Save to EmberFrame:</strong> Your app will be automatically installed and available in the start menu</li>
                                            <li><strong>Download File:</strong> Save the .js file to the <code>static/js/apps/</code> folder in your EmberFrame installation</li>
                                            <li><strong>Manual Install:</strong> Add the script tag to your <code>templates/desktop.html</code> file</li>
                                            <li><strong>Restart:</strong> Refresh EmberFrame to see your new app in the start menu</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Modals and Overlays -->
                <div class="modal" id="help-modal">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3>📚 Appmaker Help</h3>
                            <button class="modal-close" onclick="Appmaker.closeModal()">&times;</button>
                        </div>
                        <div class="modal-body">
                            <div class="help-tabs">
                                <button class="help-tab active" onclick="Appmaker.showHelpTab('getting-started')">Getting Started</button>
                                <button class="help-tab" onclick="Appmaker.showHelpTab('components')">Components</button>
                                <button class="help-tab" onclick="Appmaker.showHelpTab('code')">Code Reference</button>
                                <button class="help-tab" onclick="Appmaker.showHelpTab('examples')">Examples</button>
                            </div>
                            <div class="help-content" id="help-content">
                                <!-- Help content will be populated -->
                            </div>
                        </div>
                    </div>
                </div>

                ${Appmaker.getStyles()}
            `,
            onInit: (windowElement) => {
                Appmaker.init(windowElement);
            }
        };
    }

    static getStyles() {
        return `
            <style>
                .appmaker {
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
                    color: #333;
                }

                .appmaker-header {
                    background: rgba(255, 255, 255, 0.95);
                    padding: 20px 30px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 2px solid rgba(102, 126, 234, 0.2);
                    backdrop-filter: blur(10px);
                }

                .header-left h1 {
                    margin: 0 0 5px 0;
                    color: #667eea;
                    font-size: 24px;
                    font-weight: 700;
                }

                .header-left p {
                    margin: 0;
                    color: #666;
                    font-size: 14px;
                }

                .header-right {
                    display: flex;
                    gap: 12px;
                }

                .appmaker-nav {
                    background: rgba(255, 255, 255, 0.9);
                    display: flex;
                    border-bottom: 1px solid rgba(102, 126, 234, 0.2);
                    backdrop-filter: blur(10px);
                }

                .nav-btn {
                    flex: 1;
                    padding: 16px 20px;
                    border: none;
                    background: transparent;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    color: #666;
                    font-weight: 500;
                    border-bottom: 3px solid transparent;
                }

                .nav-btn:hover {
                    background: rgba(102, 126, 234, 0.1);
                    color: #667eea;
                }

                .nav-btn.active {
                    color: #667eea;
                    border-bottom-color: #667eea;
                    background: rgba(102, 126, 234, 0.1);
                }

                .appmaker-content {
                    flex: 1;
                    overflow: hidden;
                    position: relative;
                }

                .tab-content {
                    height: 100%;
                    overflow-y: auto;
                    display: none;
                    background: #f8f9fa;
                }

                .tab-content.active {
                    display: block;
                }

                /* Welcome Tab Styles */
                .welcome-section {
                    padding: 40px;
                    max-width: 1000px;
                    margin: 0 auto;
                }

                .welcome-hero {
                    text-align: center;
                    margin-bottom: 50px;
                }

                .welcome-hero h2 {
                    font-size: 36px;
                    margin-bottom: 15px;
                    color: #2d3748;
                }

                .welcome-hero p {
                    font-size: 18px;
                    color: #666;
                    max-width: 600px;
                    margin: 0 auto;
                }

                .quick-start-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 25px;
                    margin-bottom: 50px;
                }

                .quick-card {
                    background: white;
                    border-radius: 16px;
                    padding: 30px;
                    text-align: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border: 2px solid transparent;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                }

                .quick-card:hover {
                    transform: translateY(-5px);
                    border-color: #667eea;
                    box-shadow: 0 8px 30px rgba(102, 126, 234, 0.2);
                }

                .quick-card .card-icon {
                    font-size: 48px;
                    margin-bottom: 20px;
                }

                .quick-card h3 {
                    margin: 0 0 12px 0;
                    color: #2d3748;
                    font-size: 20px;
                }

                .quick-card p {
                    color: #666;
                    margin-bottom: 20px;
                    line-height: 1.5;
                }

                .quick-card .card-action {
                    color: #667eea;
                    font-weight: 600;
                    font-size: 14px;
                }

                .recent-apps h3 {
                    margin-bottom: 20px;
                    color: #2d3748;
                }

                .recent-list {
                    background: white;
                    border-radius: 12px;
                    padding: 20px;
                    min-height: 100px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #666;
                    font-style: italic;
                }

                /* Wizard Styles */
                .wizard-container {
                    padding: 40px;
                    max-width: 900px;
                    margin: 0 auto;
                }

                .wizard-progress {
                    display: flex;
                    justify-content: center;
                    margin-bottom: 40px;
                    gap: 20px;
                }

                .progress-step {
                    padding: 12px 20px;
                    background: #e2e8f0;
                    border-radius: 25px;
                    font-size: 14px;
                    color: #666;
                    transition: all 0.3s ease;
                }

                .progress-step.active {
                    background: #667eea;
                    color: white;
                }

                .wizard-content {
                    background: white;
                    border-radius: 16px;
                    padding: 40px;
                    margin-bottom: 30px;
                    min-height: 500px;
                }

                .wizard-step {
                    display: none;
                }

                .wizard-step.active {
                    display: block;
                }

                .wizard-step h2 {
                    margin: 0 0 30px 0;
                    color: #2d3748;
                    font-size: 28px;
                }

                .form-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 25px;
                }

                .form-group {
                    display: flex;
                    flex-direction: column;
                }

                .form-group label {
                    margin-bottom: 8px;
                    font-weight: 600;
                    color: #2d3748;
                }

                .form-group input,
                .form-group textarea,
                .form-group select {
                    padding: 12px 16px;
                    border: 2px solid #e2e8f0;
                    border-radius: 8px;
                    font-size: 14px;
                    transition: border-color 0.3s ease;
                }

                .form-group input:focus,
                .form-group textarea:focus,
                .form-group select:focus {
                    outline: none;
                    border-color: #667eea;
                }

                .form-group small {
                    margin-top: 5px;
                    color: #666;
                    font-size: 12px;
                }

                .app-type-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 20px;
                }

                .type-card {
                    background: #f8f9fa;
                    border: 2px solid #e2e8f0;
                    border-radius: 12px;
                    padding: 25px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .type-card:hover,
                .type-card.selected {
                    border-color: #667eea;
                    background: rgba(102, 126, 234, 0.05);
                }

                .type-card .type-icon {
                    font-size: 36px;
                    margin-bottom: 15px;
                }

                .type-card h3 {
                    margin: 0 0 10px 0;
                    color: #2d3748;
                }

                .type-card p {
                    color: #666;
                    margin-bottom: 15px;
                }

                .type-card ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }

                .type-card li {
                    padding: 4px 0;
                    color: #666;
                    font-size: 13px;
                }

                .type-card li:before {
                    content: "✓ ";
                    color: #28a745;
                    font-weight: bold;
                }

                .theme-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 20px;
                    margin-bottom: 30px;
                }

                .theme-card {
                    background: white;
                    border: 2px solid #e2e8f0;
                    border-radius: 12px;
                    padding: 20px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    text-align: center;
                }

                .theme-card:hover,
                .theme-card.selected {
                    border-color: #667eea;
                    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.2);
                }

                .theme-preview {
                    width: 100%;
                    height: 80px;
                    border-radius: 8px;
                    margin-bottom: 15px;
                    background: linear-gradient(45deg, #f0f0f0, #e0e0e0);
                }

                .theme-preview.modern-theme {
                    background: linear-gradient(45deg, #667eea, #764ba2);
                }

                .theme-preview.dark-theme {
                    background: linear-gradient(45deg, #2d3748, #4a5568);
                }

                .theme-preview.colorful-theme {
                    background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1);
                }

                .theme-preview.classic-theme {
                    background: linear-gradient(45deg, #e3f2fd, #bbdefb);
                }

                .layout-options h3 {
                    margin-bottom: 20px;
                    color: #2d3748;
                }

                .layout-grid {
                    display: flex;
                    gap: 20px;
                    justify-content: center;
                }

                .layout-option {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 10px;
                    cursor: pointer;
                    padding: 15px;
                    border-radius: 8px;
                    transition: all 0.3s ease;
                }

                .layout-option:hover,
                .layout-option.selected {
                    background: rgba(102, 126, 234, 0.1);
                }

                .layout-preview {
                    width: 60px;
                    height: 40px;
                    border: 2px solid #e2e8f0;
                    border-radius: 4px;
                    position: relative;
                }

                .layout-box {
                    width: 100%;
                    height: 100%;
                    background: #f0f0f0;
                    border-radius: 2px;
                }

                .layout-box.tabs::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 8px;
                    background: #667eea;
                    border-radius: 2px 2px 0 0;
                }

                .layout-box.sidebar::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 15px;
                    bottom: 0;
                    background: #667eea;
                    border-radius: 2px 0 0 2px;
                }

                .wizard-navigation {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                /* Button Styles */
                .btn {
                    padding: 10px 20px;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    text-decoration: none;
                }

                .btn-primary {
                    background: #667eea;
                    color: white;
                }

                .btn-primary:hover {
                    background: #5a67d8;
                    transform: translateY(-1px);
                }

                .btn-secondary {
                    background: #e2e8f0;
                    color: #2d3748;
                }

                .btn-secondary:hover {
                    background: #cbd5e0;
                }

                .btn-large {
                    padding: 16px 32px;
                    font-size: 16px;
                }

                .btn-sm {
                    padding: 6px 12px;
                    font-size: 12px;
                }

                .btn:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                    transform: none;
                }

                /* Designer Styles */
                .designer-layout {
                    height: 100%;
                    display: flex;
                }

                .designer-sidebar {
                    width: 250px;
                    background: white;
                    border-right: 1px solid #e2e8f0;
                    overflow-y: auto;
                }

                .designer-main {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    background: #f8f9fa;
                }

                .designer-properties {
                    width: 300px;
                    background: white;
                    border-left: 1px solid #e2e8f0;
                    overflow-y: auto;
                }

                .sidebar-section {
                    padding: 20px;
                    border-bottom: 1px solid #e2e8f0;
                }

                .sidebar-section h3 {
                    margin: 0 0 15px 0;
                    color: #2d3748;
                    font-size: 16px;
                }

                .component-palette {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 10px;
                }

                .component-item {
                    padding: 12px;
                    background: #f8f9fa;
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    cursor: grab;
                    transition: all 0.3s ease;
                    text-align: center;
                    font-size: 12px;
                }

                .component-item:hover {
                    background: #e2e8f0;
                    transform: scale(1.05);
                }

                .component-item:active {
                    cursor: grabbing;
                }

                .designer-toolbar {
                    background: white;
                    border-bottom: 1px solid #e2e8f0;
                    padding: 12px 20px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .toolbar-group {
                    display: flex;
                    gap: 8px;
                    align-items: center;
                }

                .design-canvas {
                    flex: 1;
                    background: #ffffff;
                    margin: 20px;
                    border-radius: 12px;
                    border: 2px dashed #e2e8f0;
                    position: relative;
                    overflow: auto;
                }

                .canvas-placeholder {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    text-align: center;
                    color: #666;
                }

                .placeholder-content i {
                    font-size: 48px;
                    margin-bottom: 20px;
                    opacity: 0.3;
                }

                /* Code Editor Styles */
                .code-editor-layout {
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                }

                .code-toolbar {
                    background: white;
                    border-bottom: 1px solid #e2e8f0;
                    padding: 12px 20px;
                    display: flex;
                    justify-content: space-between;
                }

                .toolbar-left,
                .toolbar-right {
                    display: flex;
                    gap: 8px;
                }

                .code-content {
                    flex: 1;
                    display: flex;
                    overflow: hidden;
                }

                .code-editor {
                    flex: 1;
                    background: #282c34;
                    position: relative;
                }

                .code-editor textarea {
                    width: 100%;
                    height: 100%;
                    background: #282c34;
                    color: #abb2bf;
                    border: none;
                    padding: 20px;
                    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
                    font-size: 13px;
                    line-height: 1.5;
                    resize: none;
                    outline: none;
                }

                .code-sidebar {
                    width: 300px;
                    background: white;
                    border-left: 1px solid #e2e8f0;
                    display: flex;
                    flex-direction: column;
                }

                .code-panel {
                    padding: 20px;
                    border-bottom: 1px solid #e2e8f0;
                }

                .code-panel h4 {
                    margin: 0 0 15px 0;
                    color: #2d3748;
                    font-size: 14px;
                }

                .code-outline {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .outline-item {
                    padding: 8px 12px;
                    background: #f8f9fa;
                    border-radius: 6px;
                    font-size: 12px;
                    color: #666;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .action-btn {
                    width: 100%;
                    padding: 10px;
                    background: #f8f9fa;
                    border: 1px solid #e2e8f0;
                    border-radius: 6px;
                    cursor: pointer;
                    margin-bottom: 8px;
                    font-size: 12px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    transition: all 0.3s ease;
                }

                .action-btn:hover {
                    background: #e2e8f0;
                }

                /* Preview Styles */
                .preview-layout {
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    background: #f0f0f0;
                }

                .preview-toolbar {
                    background: white;
                    border-bottom: 1px solid #e2e8f0;
                    padding: 12px 20px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .device-selector {
                    display: flex;
                    gap: 8px;
                    background: #f8f9fa;
                    padding: 4px;
                    border-radius: 8px;
                }

                .device-btn {
                    padding: 8px 12px;
                    border: none;
                    background: transparent;
                    border-radius: 6px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .device-btn.active,
                .device-btn:hover {
                    background: white;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }

                .preview-container {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 40px;
                }

                .preview-frame {
                    background: transparent;
                    transition: all 0.3s ease;
                }

                .preview-window {
                    background: white;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 8px 30px rgba(0,0,0,0.15);
                    transition: all 0.3s ease;
                }

                .preview-window.desktop {
                    width: 800px;
                    height: 600px;
                }

                .preview-window.tablet {
                    width: 768px;
                    height: 1024px;
                }

                .preview-window.mobile {
                    width: 375px;
                    height: 667px;
                }

                .preview-header {
                    background: #f8f9fa;
                    padding: 12px 16px;
                    border-bottom: 1px solid #e2e8f0;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .preview-title {
                    font-size: 14px;
                    font-weight: 600;
                    color: #2d3748;
                }

                .preview-controls {
                    display: flex;
                    gap: 6px;
                }

                .control {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                }

                .control.minimize {
                    background: #ffc107;
                }

                .control.maximize {
                    background: #28a745;
                }

                .control.close {
                    background: #dc3545;
                }

                .preview-content {
                    height: calc(100% - 45px);
                    overflow: auto;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .preview-placeholder {
                    text-align: center;
                    color: #666;
                }

                .preview-placeholder i {
                    font-size: 48px;
                    margin-bottom: 20px;
                    opacity: 0.3;
                }

                /* Export Styles */
                .export-section {
                    padding: 40px;
                    max-width: 1000px;
                    margin: 0 auto;
                }

                .export-header {
                    text-align: center;
                    margin-bottom: 50px;
                }

                .export-header h2 {
                    margin: 0 0 15px 0;
                    color: #2d3748;
                    font-size: 32px;
                }

                .export-header p {
                    color: #666;
                    font-size: 16px;
                }

                .export-options {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 25px;
                    margin-bottom: 50px;
                }

                .export-card {
                    background: white;
                    border-radius: 16px;
                    padding: 30px;
                    text-align: center;
                    border: 2px solid #e2e8f0;
                    transition: all 0.3s ease;
                }

                .export-card:hover {
                    border-color: #667eea;
                    transform: translateY(-5px);
                    box-shadow: 0 8px 30px rgba(102, 126, 234, 0.2);
                }

                .export-card .export-icon {
                    font-size: 48px;
                    margin-bottom: 20px;
                }

                .export-card h3 {
                    margin: 0 0 12px 0;
                    color: #2d3748;
                }

                .export-card p {
                    color: #666;
                    margin-bottom: 20px;
                    line-height: 1.5;
                }

                .export-info {
                    background: white;
                    border-radius: 16px;
                    padding: 30px;
                    border: 2px solid #e2e8f0;
                }

                .export-info h3 {
                    margin: 0 0 20px 0;
                    color: #2d3748;
                }

                .instructions ol {
                    margin: 0;
                    padding-left: 20px;
                    line-height: 1.6;
                }

                .instructions li {
                    margin-bottom: 12px;
                    color: #666;
                }

                .instructions code {
                    background: #f8f9fa;
                    padding: 2px 6px;
                    border-radius: 4px;
                    font-family: monospace;
                    color: #e83e8c;
                }

                /* Modal Styles */
                .modal {
                    display: none;
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.5);
                    z-index: 10000;
                    backdrop-filter: blur(5px);
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
                    max-width: 800px;
                    max-height: 90vh;
                    overflow-y: auto;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                }

                .modal-header {
                    padding: 25px 30px;
                    border-bottom: 1px solid #e2e8f0;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .modal-header h3 {
                    margin: 0;
                    color: #2d3748;
                    font-size: 20px;
                }

                .modal-close {
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                    color: #6c757d;
                    padding: 5px;
                }

                .modal-body {
                    padding: 30px;
                }

                .help-tabs {
                    display: flex;
                    gap: 10px;
                    margin-bottom: 25px;
                    border-bottom: 2px solid #e2e8f0;
                }

                .help-tab {
                    padding: 12px 20px;
                    border: none;
                    background: transparent;
                    cursor: pointer;
                    border-bottom: 3px solid transparent;
                    transition: all 0.3s ease;
                }

                .help-tab.active,
                .help-tab:hover {
                    color: #667eea;
                    border-bottom-color: #667eea;
                }

                /* Responsive Design */
                @media (max-width: 768px) {
                    .appmaker-header {
                        flex-direction: column;
                        gap: 15px;
                        text-align: center;
                    }

                    .appmaker-nav {
                        flex-direction: column;
                    }

                    .nav-btn {
                        justify-content: flex-start;
                        padding-left: 30px;
                    }

                    .quick-start-grid {
                        grid-template-columns: 1fr;
                    }

                    .wizard-container {
                        padding: 20px;
                    }

                    .form-grid {
                        grid-template-columns: 1fr;
                    }

                    .app-type-grid {
                        grid-template-columns: 1fr;
                    }

                    .theme-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }

                    .designer-layout {
                        flex-direction: column;
                    }

                    .designer-sidebar,
                    .designer-properties {
                        width: 100%;
                        height: auto;
                        max-height: 200px;
                    }

                    .code-content {
                        flex-direction: column;
                    }

                    .code-sidebar {
                        width: 100%;
                        height: auto;
                        max-height: 300px;
                    }

                    .preview-window.desktop {
                        width: 100%;
                        max-width: 400px;
                        height: 300px;
                    }

                    .export-options {
                        grid-template-columns: 1fr;
                    }
                }
            </style>
        `;
    }

    static init(windowElement) {
        this.currentWindow = windowElement;
        this.currentStep = 1;
        this.appData = {
            name: '',
            id: '',
            description: '',
            icon: 'fas fa-star',
            category: 'Productivity',
            author: '',
            type: '',
            features: [],
            theme: 'modern',
            layout: 'single'
        };
        this.generatedCode = '';
        this.setupEventListeners();
        this.loadRecentApps();
        this.updateWizardStep();
    }

    static setupEventListeners() {
        // Auto-generate app ID from name
        const nameInput = this.currentWindow.querySelector('#app-name');
        const idInput = this.currentWindow.querySelector('#app-id');

        if (nameInput && idInput) {
            nameInput.addEventListener('input', (e) => {
                const name = e.target.value;
                const id = name.toLowerCase()
                    .replace(/[^a-z0-9\s]/g, '')
                    .replace(/\s+/g, '-')
                    .replace(/^-+|-+$/g, '');
                idInput.value = id;
            });
        }
    }

    static switchTab(tabName) {
        // Update navigation
        this.currentWindow.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        this.currentWindow.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update content
        this.currentWindow.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        this.currentWindow.querySelector(`#${tabName}-tab`).classList.add('active');

        // Load tab-specific content
        switch(tabName) {
            case 'code':
                this.updateCodeEditor();
                break;
            case 'preview':
                this.refreshPreview();
                break;
        }
    }

    static startWizard() {
        this.switchTab('wizard');
        this.currentStep = 1;
        this.updateWizardStep();
    }

    static useTemplate() {
        this.showNotification('Template browser coming soon!', 'info');
    }

    static startTutorial() {
        this.showHelp();
        this.showHelpTab('getting-started');
    }

    static importApp() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.js';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.loadAppFromCode(e.target.result);
                };
                reader.readAsText(file);
            }
        };
        input.click();
    }

    static newApp() {
        this.appData = {
            name: '',
            id: '',
            description: '',
            icon: 'fas fa-star',
            category: 'Productivity',
            author: '',
            type: '',
            features: [],
            theme: 'modern',
            layout: 'single'
        };
        this.currentStep = 1;
        this.updateWizardStep();
        this.switchTab('wizard');
    }

    static nextStep() {
        if (this.validateCurrentStep()) {
            if (this.currentStep < 5) {
                this.currentStep++;
                this.updateWizardStep();
            }
        }
    }

    static prevStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.updateWizardStep();
        }
    }

    static updateWizardStep() {
        // Update progress indicators
        this.currentWindow.querySelectorAll('.progress-step').forEach(step => {
            const stepNum = parseInt(step.dataset.step);
            if (stepNum <= this.currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });

        // Update step content
        this.currentWindow.querySelectorAll('.wizard-step').forEach(step => {
            step.classList.remove('active');
        });
        this.currentWindow.querySelector(`.wizard-step[data-step="${this.currentStep}"]`).classList.add('active');

        // Update navigation buttons
        const prevBtn = this.currentWindow.querySelector('#prev-btn');
        const nextBtn = this.currentWindow.querySelector('#next-btn');

        prevBtn.disabled = this.currentStep === 1;

        if (this.currentStep === 5) {
            nextBtn.textContent = 'Generate App';
            nextBtn.onclick = () => this.generateApp();
        } else {
            nextBtn.innerHTML = 'Next <i class="fas fa-arrow-right"></i>';
            nextBtn.onclick = () => this.nextStep();
        }

        // Load step-specific content
        this.loadStepContent();
    }

    static loadStepContent() {
        switch(this.currentStep) {
            case 3:
                this.loadFeatures();
                break;
            case 5:
                this.loadReview();
                break;
        }
    }

    static validateCurrentStep() {
        switch(this.currentStep) {
            case 1:
                const name = this.currentWindow.querySelector('#app-name').value.trim();
                const id = this.currentWindow.querySelector('#app-id').value.trim();

                if (!name || !id) {
                    this.showNotification('Please fill in required fields', 'error');
                    return false;
                }

                this.appData.name = name;
                this.appData.id = id;
                this.appData.description = this.currentWindow.querySelector('#app-description').value.trim();
                this.appData.icon = this.currentWindow.querySelector('#app-icon').value;
                this.appData.category = this.currentWindow.querySelector('#app-category').value;
                this.appData.author = this.currentWindow.querySelector('#app-author').value.trim();
                break;

            case 2:
                if (!this.appData.type) {
                    this.showNotification('Please select an application type', 'error');
                    return false;
                }
                break;
        }
        return true;
    }

    static selectAppType(type) {
        this.appData.type = type;
        this.currentWindow.querySelectorAll('.type-card').forEach(card => {
            card.classList.remove('selected');
        });
        this.currentWindow.querySelector(`[data-type="${type}"]`).classList.add('selected');
    }

    static loadFeatures() {
        const featuresSection = this.currentWindow.querySelector('#features-section');
        const features = this.getAvailableFeatures(this.appData.type);

        featuresSection.innerHTML = features.map(feature => `
            <div class="feature-item">
                <label class="feature-label">
                    <input type="checkbox" value="${feature.id}" onchange="Appmaker.toggleFeature('${feature.id}')">
                    <span class="checkmark"></span>
                    <div class="feature-info">
                        <h4>${feature.name}</h4>
                        <p>${feature.description}</p>
                    </div>
                </label>
            </div>
        `).join('');
    }

    static getAvailableFeatures(appType) {
        const featureMap = {
            form: [
                { id: 'validation', name: 'Form Validation', description: 'Real-time input validation and error messages' },
                { id: 'save', name: 'Save Data', description: 'Save form data to local storage' },
                { id: 'reset', name: 'Reset Form', description: 'Clear all form fields' },
                { id: 'export', name: 'Export Data', description: 'Export form data as JSON or CSV' }
            ],
            dashboard: [
                { id: 'charts', name: 'Charts & Graphs', description: 'Interactive data visualization' },
                { id: 'realtime', name: 'Real-time Updates', description: 'Live data updates' },
                { id: 'filters', name: 'Data Filters', description: 'Filter and search data' },
                { id: 'export', name: 'Export Reports', description: 'Export charts and data' }
            ],
            tool: [
                { id: 'calculator', name: 'Calculator Functions', description: 'Math and calculation features' },
                { id: 'history', name: 'Calculation History', description: 'Keep track of previous calculations' },
                { id: 'units', name: 'Unit Conversion', description: 'Convert between different units' },
                { id: 'copy', name: 'Copy Results', description: 'Copy results to clipboard' }
            ],
            game: [
                { id: 'score', name: 'Score Tracking', description: 'Keep track of player scores' },
                { id: 'levels', name: 'Multiple Levels', description: 'Progressive difficulty levels' },
                { id: 'sound', name: 'Sound Effects', description: 'Audio feedback and music' },
                { id: 'save', name: 'Save Progress', description: 'Save game state and progress' }
            ],
            viewer: [
                { id: 'navigation', name: 'Navigation Controls', description: 'Navigate through content' },
                { id: 'search', name: 'Search Content', description: 'Search and filter content' },
                { id: 'zoom', name: 'Zoom Controls', description: 'Zoom in and out of content' },
                { id: 'fullscreen', name: 'Fullscreen Mode', description: 'View content in fullscreen' }
            ],
            custom: [
                { id: 'storage', name: 'Data Storage', description: 'Local data storage capabilities' },
                { id: 'api', name: 'API Integration', description: 'Connect to external APIs' },
                { id: 'notifications', name: 'Notifications', description: 'Show user notifications' },
                { id: 'shortcuts', name: 'Keyboard Shortcuts', description: 'Custom keyboard shortcuts' }
            ]
        };

        return featureMap[appType] || featureMap.custom;
    }

    static toggleFeature(featureId) {
        const index = this.appData.features.indexOf(featureId);
        if (index > -1) {
            this.appData.features.splice(index, 1);
        } else {
            this.appData.features.push(featureId);
        }
    }

    static selectTheme(theme) {
        this.appData.theme = theme;
        this.currentWindow.querySelectorAll('.theme-card').forEach(card => {
            card.classList.remove('selected');
        });
        this.currentWindow.querySelector(`[data-theme="${theme}"]`).classList.add('selected');
    }

    static selectLayout(layout) {
        this.appData.layout = layout;
        this.currentWindow.querySelectorAll('.layout-option').forEach(option => {
            option.classList.remove('selected');
        });
        this.currentWindow.querySelector(`[data-layout="${layout}"]`).classList.add('selected');
    }

    static loadReview() {
        const summary = this.currentWindow.querySelector('#app-summary');
        summary.innerHTML = `
            <div class="summary-grid">
                <div class="summary-item">
                    <strong>Name:</strong> ${this.appData.name}
                </div>
                <div class="summary-item">
                    <strong>Type:</strong> ${this.appData.type}
                </div>
                <div class="summary-item">
                    <strong>Category:</strong> ${this.appData.category}
                </div>
                <div class="summary-item">
                    <strong>Features:</strong> ${this.appData.features.length} selected
                </div>
                <div class="summary-item">
                    <strong>Theme:</strong> ${this.appData.theme}
                </div>
                <div class="summary-item">
                    <strong>Layout:</strong> ${this.appData.layout}
                </div>
            </div>
        `;
    }

    static generateApp() {
        this.showNotification('Generating application...', 'info');

        setTimeout(() => {
            this.generatedCode = this.createAppCode();
            this.switchTab('code');
            this.updateCodeEditor();
            this.showNotification('Application generated successfully!', 'success');

            // Save to recent apps
            this.saveToRecentApps();
        }, 1500);
    }

    static createAppCode() {
        const metadata = `/**
 * APP_METADATA
 * @name ${this.appData.name}
 * @icon ${this.appData.icon}
 * @description ${this.appData.description || 'Generated with EmberFrame Appmaker'}
 * @category ${this.appData.category}
 * @version 1.0.0
 * @author ${this.appData.author || 'Appmaker User'}
 * @enabled true
 */`;

        const className = this.toPascalCase(this.appData.id);

        const content = this.generateAppContent();
        const styles = this.generateAppStyles();
        const methods = this.generateAppMethods();

        return `${metadata}

class ${className} {
    static createWindow() {
        return {
            title: '${this.appData.name}',
            width: '600px',
            height: '400px',
            content: \`
                ${content}
                ${styles}
            \`,
            onInit: (windowElement) => {
                ${className}.init(windowElement);
            }
        };
    }

    static init(windowElement) {
        this.currentWindow = windowElement;
        console.log('${this.appData.name} initialized!');
        
        // Initialize features
        ${this.generateInitCode()}
    }

    ${methods}
}

window.${className} = ${className};`;
    }

    static generateAppContent() {
        const layouts = {
            single: this.generateSinglePageContent(),
            tabs: this.generateTabbedContent(),
            sidebar: this.generateSidebarContent()
        };

        return layouts[this.appData.layout] || layouts.single;
    }

    static generateSinglePageContent() {
        const typeContent = {
            form: `
                <div class="app-container">
                    <div class="app-header">
                        <h1>${this.appData.name}</h1>
                        <p>${this.appData.description}</p>
                    </div>
                    <div class="app-content">
                        <form class="app-form" id="main-form">
                            <div class="form-group">
                                <label for="name">Name:</label>
                                <input type="text" id="name" name="name" required>
                            </div>
                            <div class="form-group">
                                <label for="email">Email:</label>
                                <input type="email" id="email" name="email" required>
                            </div>
                            <div class="form-group">
                                <label for="message">Message:</label>
                                <textarea id="message" name="message" rows="4"></textarea>
                            </div>
                            <div class="form-actions">
                                <button type="submit" class="btn btn-primary">Submit</button>
                                <button type="reset" class="btn btn-secondary">Reset</button>
                            </div>
                        </form>
                    </div>
                </div>`,

            dashboard: `
                <div class="app-container">
                    <div class="app-header">
                        <h1>${this.appData.name}</h1>
                        <div class="dashboard-controls">
                            <button class="btn btn-primary" onclick="${this.toPascalCase(this.appData.id)}.refreshData()">
                                <i class="fas fa-sync"></i> Refresh
                            </button>
                        </div>
                    </div>
                    <div class="dashboard-grid">
                        <div class="dashboard-card">
                            <h3>Metric 1</h3>
                            <div class="metric-value" id="metric-1">0</div>
                        </div>
                        <div class="dashboard-card">
                            <h3>Metric 2</h3>
                            <div class="metric-value" id="metric-2">0</div>
                        </div>
                        <div class="dashboard-card">
                            <h3>Chart</h3>
                            <div class="chart-container" id="chart-1">
                                <div class="chart-placeholder">Chart will appear here</div>
                            </div>
                        </div>
                        <div class="dashboard-card">
                            <h3>Status</h3>
                            <div class="status-indicator" id="status">Ready</div>
                        </div>
                    </div>
                </div>`,

            tool: `
                <div class="app-container">
                    <div class="app-header">
                        <h1>${this.appData.name}</h1>
                        <p>${this.appData.description}</p>
                    </div>
                    <div class="tool-interface">
                        <div class="tool-input">
                            <label for="input-value">Input:</label>
                            <input type="text" id="input-value" placeholder="Enter value">
                            <button class="btn btn-primary" onclick="${this.toPascalCase(this.appData.id)}.calculate()">
                                Calculate
                            </button>
                        </div>
                        <div class="tool-output">
                            <label>Result:</label>
                            <div class="result-display" id="result">-</div>
                        </div>
                        <div class="tool-history" id="history">
                            <h3>History</h3>
                            <div class="history-list" id="history-list">
                                <div class="no-history">No calculations yet</div>
                            </div>
                        </div>
                    </div>
                </div>`,

            game: `
                <div class="app-container">
                    <div class="game-header">
                        <h1>${this.appData.name}</h1>
                        <div class="game-stats">
                            <span>Score: <span id="score">0</span></span>
                            <span>Level: <span id="level">1</span></span>
                        </div>
                    </div>
                    <div class="game-area" id="game-area">
                        <div class="game-content">
                            <h2>Game Area</h2>
                            <p>Your game content goes here</p>
                            <button class="btn btn-primary" onclick="${this.toPascalCase(this.appData.id)}.startGame()">
                                Start Game
                            </button>
                        </div>
                    </div>
                    <div class="game-controls">
                        <button class="btn btn-secondary" onclick="${this.toPascalCase(this.appData.id)}.pauseGame()">
                            Pause
                        </button>
                        <button class="btn btn-secondary" onclick="${this.toPascalCase(this.appData.id)}.resetGame()">
                            Reset
                        </button>
                    </div>
                </div>`,

            viewer: `
                <div class="app-container">
                    <div class="viewer-header">
                        <h1>${this.appData.name}</h1>
                        <div class="viewer-controls">
                            <button class="btn btn-secondary" onclick="${this.toPascalCase(this.appData.id)}.previousItem()">
                                <i class="fas fa-chevron-left"></i>
                            </button>
                            <span id="item-counter">1 / 1</span>
                            <button class="btn btn-secondary" onclick="${this.toPascalCase(this.appData.id)}.nextItem()">
                                <i class="fas fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                    <div class="viewer-content" id="viewer-content">
                        <div class="content-placeholder">
                            <i class="fas fa-file"></i>
                            <h3>No content loaded</h3>
                            <p>Click "Load Content" to get started</p>
                            <button class="btn btn-primary" onclick="${this.toPascalCase(this.appData.id)}.loadContent()">
                                Load Content
                            </button>
                        </div>
                    </div>
                </div>`,

            custom: `
                <div class="app-container">
                    <div class="app-header">
                        <h1>${this.appData.name}</h1>
                        <p>${this.appData.description}</p>
                    </div>
                    <div class="app-content">
                        <div class="welcome-message">
                            <h2>Welcome to your custom app!</h2>
                            <p>This is a starting point for your custom application.</p>
                            <p>Customize the content, add features, and make it your own.</p>
                            <button class="btn btn-primary" onclick="${this.toPascalCase(this.appData.id)}.customAction()">
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>`
        };

        return typeContent[this.appData.type] || typeContent.custom;
    }

    static generateTabbedContent() {
        return `
            <div class="app-container tabbed">
                <div class="app-header">
                    <h1>${this.appData.name}</h1>
                </div>
                <div class="tab-navigation">
                    <button class="tab-btn active" onclick="${this.toPascalCase(this.appData.id)}.switchTab('tab1')">Tab 1</button>
                    <button class="tab-btn" onclick="${this.toPascalCase(this.appData.id)}.switchTab('tab2')">Tab 2</button>
                    <button class="tab-btn" onclick="${this.toPascalCase(this.appData.id)}.switchTab('tab3')">Tab 3</button>
                </div>
                <div class="tab-content active" id="tab1">
                    <h2>Tab 1 Content</h2>
                    <p>This is the content for the first tab.</p>
                </div>
                <div class="tab-content" id="tab2">
                    <h2>Tab 2 Content</h2>
                    <p>This is the content for the second tab.</p>
                </div>
                <div class="tab-content" id="tab3">
                    <h2>Tab 3 Content</h2>
                    <p>This is the content for the third tab.</p>
                </div>
            </div>`;
    }

    static generateSidebarContent() {
        return `
            <div class="app-container sidebar-layout">
                <div class="app-sidebar">
                    <h3>Navigation</h3>
                    <ul class="sidebar-menu">
                        <li><a href="#" onclick="${this.toPascalCase(this.appData.id)}.showSection('home')">Home</a></li>
                        <li><a href="#" onclick="${this.toPascalCase(this.appData.id)}.showSection('data')">Data</a></li>
                        <li><a href="#" onclick="${this.toPascalCase(this.appData.id)}.showSection('settings')">Settings</a></li>
                    </ul>
                </div>
                <div class="app-main">
                    <div class="app-header">
                        <h1>${this.appData.name}</h1>
                    </div>
                    <div class="main-content" id="main-content">
                        <h2>Welcome</h2>
                        <p>Select an option from the sidebar to get started.</p>
                    </div>
                </div>
            </div>`;
    }

    static generateAppStyles() {
        const themes = {
            modern: `
                <style>
                    .app-container {
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
                        color: #333;
                    }
                    .app-header {
                        background: rgba(255, 255, 255, 0.95);
                        padding: 20px 30px;
                        backdrop-filter: blur(10px);
                        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
                    }
                    .app-header h1 {
                        margin: 0 0 5px 0;
                        color: #2d3748;
                        font-size: 24px;
                    }
                    .app-content {
                        flex: 1;
                        padding: 30px;
                        background: rgba(255, 255, 255, 0.9);
                        overflow-y: auto;
                    }
                    .btn {
                        padding: 10px 20px;
                        border: none;
                        border-radius: 8px;
                        cursor: pointer;
                        font-weight: 600;
                        transition: all 0.3s ease;
                    }
                    .btn-primary {
                        background: #667eea;
                        color: white;
                    }
                    .btn-primary:hover {
                        background: #5a67d8;
                        transform: translateY(-1px);
                    }
                    .btn-secondary {
                        background: #e2e8f0;
                        color: #2d3748;
                    }
                </style>`,

            dark: `
                <style>
                    .app-container {
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        background: #1a202c;
                        font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
                        color: #e2e8f0;
                    }
                    .app-header {
                        background: #2d3748;
                        padding: 20px 30px;
                        border-bottom: 1px solid #4a5568;
                    }
                    .app-header h1 {
                        margin: 0 0 5px 0;
                        color: #f7fafc;
                        font-size: 24px;
                    }
                    .app-content {
                        flex: 1;
                        padding: 30px;
                        background: #2d3748;
                        overflow-y: auto;
                    }
                    .btn {
                        padding: 10px 20px;
                        border: none;
                        border-radius: 8px;
                        cursor: pointer;
                        font-weight: 600;
                        transition: all 0.3s ease;
                    }
                    .btn-primary {
                        background: #4299e1;
                        color: white;
                    }
                    .btn-primary:hover {
                        background: #3182ce;
                    }
                    .btn-secondary {
                        background: #4a5568;
                        color: #e2e8f0;
                    }
                </style>`,

            colorful: `
                <style>
                    .app-container {
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57);
                        background-size: 300% 300%;
                        animation: gradientShift 8s ease infinite;
                        font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
                        color: #333;
                    }
                    @keyframes gradientShift {
                        0%, 100% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                    }
                    .app-header {
                        background: rgba(255, 255, 255, 0.9);
                        padding: 20px 30px;
                        backdrop-filter: blur(10px);
                    }
                    .app-header h1 {
                        margin: 0 0 5px 0;
                        color: #2d3748;
                        font-size: 24px;
                    }
                    .app-content {
                        flex: 1;
                        padding: 30px;
                        background: rgba(255, 255, 255, 0.95);
                        overflow-y: auto;
                    }
                    .btn {
                        padding: 10px 20px;
                        border: none;
                        border-radius: 20px;
                        cursor: pointer;
                        font-weight: 600;
                        transition: all 0.3s ease;
                        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                    }
                    .btn-primary {
                        background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
                        color: white;
                    }
                    .btn-primary:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 6px 20px rgba(0,0,0,0.3);
                    }
                </style>`,

            classic: `
                <style>
                    .app-container {
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        background: #f5f5f5;
                        font-family: Arial, sans-serif;
                        color: #333;
                        border: 2px solid #ccc;
                    }
                    .app-header {
                        background: #e9e9e9;
                        padding: 15px 20px;
                        border-bottom: 1px solid #ccc;
                    }
                    .app-header h1 {
                        margin: 0 0 5px 0;
                        color: #333;
                        font-size: 20px;
                    }
                    .app-content {
                        flex: 1;
                        padding: 20px;
                        background: white;
                        overflow-y: auto;
                    }
                    .btn {
                        padding: 8px 16px;
                        border: 1px solid #ccc;
                        border-radius: 4px;
                        cursor: pointer;
                        font-weight: normal;
                        background: #f0f0f0;
                        color: #333;
                    }
                    .btn-primary {
                        background: #0066cc;
                        color: white;
                        border-color: #0056b3;
                    }
                    .btn-primary:hover {
                        background: #0056b3;
                    }
                </style>`
        };

        return themes[this.appData.theme] || themes.modern;
    }

    static generateAppMethods() {
        const featureMethods = this.appData.features.map(feature => {
            return this.generateFeatureMethod(feature);
        }).join('\n\n    ');

        const typeMethods = this.generateTypeSpecificMethods();

        return `${typeMethods}${featureMethods ? '\n\n    ' + featureMethods : ''}`;
    }

    static generateTypeSpecificMethods() {
        const methods = {
            form: `
    static validateForm() {
        const form = this.currentWindow.querySelector('#main-form');
        const inputs = form.querySelectorAll('input[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#e53e3e';
            } else {
                input.style.borderColor = '#e2e8f0';
            }
        });
        
        return isValid;
    }

    static submitForm() {
        if (this.validateForm()) {
            const formData = new FormData(this.currentWindow.querySelector('#main-form'));
            const data = Object.fromEntries(formData.entries());
            console.log('Form submitted:', data);
            alert('Form submitted successfully!');
        } else {
            alert('Please fill in all required fields.');
        }
    }`,

            dashboard: `
    static refreshData() {
        // Simulate loading new data
        const metric1 = Math.floor(Math.random() * 1000);
        const metric2 = Math.floor(Math.random() * 100);
        
        this.currentWindow.querySelector('#metric-1').textContent = metric1;
        this.currentWindow.querySelector('#metric-2').textContent = metric2 + '%';
        this.currentWindow.querySelector('#status').textContent = 'Updated';
        
        console.log('Dashboard data refreshed');
    }`,

            tool: `
    static calculate() {
        const input = this.currentWindow.querySelector('#input-value').value;
        const result = this.currentWindow.querySelector('#result');
        
        // Simple calculation example (double the input)
        if (input && !isNaN(input)) {
            const calculatedResult = parseFloat(input) * 2;
            result.textContent = calculatedResult;
            this.addToHistory(input, calculatedResult);
        } else {
            result.textContent = 'Invalid input';
        }
    }

    static addToHistory(input, result) {
        const historyList = this.currentWindow.querySelector('#history-list');
        const noHistory = historyList.querySelector('.no-history');
        
        if (noHistory) {
            noHistory.remove();
        }
        
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.textContent = \`\${input} → \${result}\`;
        historyList.appendChild(historyItem);
    }`,

            game: `
    static startGame() {
        this.score = 0;
        this.level = 1;
        this.gameRunning = true;
        
        this.updateScore();
        console.log('Game started!');
    }

    static pauseGame() {
        this.gameRunning = false;
        console.log('Game paused');
    }

    static resetGame() {
        this.score = 0;
        this.level = 1;
        this.gameRunning = false;
        
        this.updateScore();
        console.log('Game reset');
    }

    static updateScore() {
        this.currentWindow.querySelector('#score').textContent = this.score || 0;
        this.currentWindow.querySelector('#level').textContent = this.level || 1;
    }`,

            viewer: `
    static loadContent() {
        // Simulate loading content
        const content = this.currentWindow.querySelector('#viewer-content');
        content.innerHTML = \`
            <div class="content-item">
                <h2>Sample Content</h2>
                <p>This is sample content loaded in the viewer.</p>
                <p>You can customize this to display any type of content.</p>
            </div>
        \`;
        
        this.currentWindow.querySelector('#item-counter').textContent = '1 / 1';
    }

    static previousItem() {
        console.log('Previous item');
    }

    static nextItem() {
        console.log('Next item');
    }`,

            custom: `
    static customAction() {
        alert('Hello from your custom app!');
        console.log('Custom action triggered');
    }`
        };

        return methods[this.appData.type] || methods.custom;
    }

    static generateFeatureMethod(featureId) {
        const methods = {
            validation: `static enableValidation() {
        // Enable real-time validation
        const inputs = this.currentWindow.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
        });
    }`,

            save: `static saveData() {
        const data = this.getCurrentData();
        localStorage.setItem('${this.appData.id}_data', JSON.stringify(data));
        console.log('Data saved to local storage');
    }`,

            export: `static exportData() {
        const data = this.getCurrentData();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = '${this.appData.id}_export.json';
        a.click();
        URL.revokeObjectURL(url);
    }`,

            notifications: `static showNotification(message, type = 'info') {
        if (window.Notification && window.Notification[type]) {
            window.Notification[type](message);
        } else {
            alert(message);
        }
    }`
        };

        return methods[featureId] || '';
    }

    static generateInitCode() {
        let initCode = '';

        if (this.appData.features.includes('validation')) {
            initCode += '        this.enableValidation();\n';
        }

        if (this.appData.type === 'form') {
            initCode += `        this.currentWindow.querySelector('#main-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitForm();
        });\n`;
        }

        if (this.appData.type === 'dashboard') {
            initCode += '        this.refreshData();\n';
        }

        return initCode || '        // App initialization complete';
    }

    static updateCodeEditor() {
        const codeEditor = this.currentWindow.querySelector('#code-editor');
        if (this.generatedCode) {
            codeEditor.value = this.generatedCode;
        }
    }

    static refreshPreview() {
        const previewContent = this.currentWindow.querySelector('#preview-content');

        if (this.generatedCode) {
            try {
                // Create a safe preview of the app
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = this.extractContentFromCode(this.generatedCode);
                previewContent.innerHTML = tempDiv.innerHTML;
            } catch (error) {
                previewContent.innerHTML = `
                    <div class="preview-error">
                        <i class="fas fa-exclamation-triangle"></i>
                        <h3>Preview Error</h3>
                        <p>Unable to generate preview. Check your code for errors.</p>
                    </div>
                `;
            }
        }
    }

    static extractContentFromCode(code) {
        // Extract the content from the generated code for preview
        const contentMatch = code.match(/content: `([\s\S]*?)`,/);
        if (contentMatch) {
            return contentMatch[1].trim();
        }
        return '<div>No preview available</div>';
    }

    static changeDevice(device) {
        this.currentWindow.querySelectorAll('.device-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        this.currentWindow.querySelector(`[data-device="${device}"]`).classList.add('active');

        const previewWindow = this.currentWindow.querySelector('#preview-window');
        previewWindow.className = `preview-window ${device}`;
    }

    static saveToEmberFrame() {
        if (!this.generatedCode) {
            this.showNotification('No app code to save. Please generate an app first.', 'error');
            return;
        }

        // Simulate saving to EmberFrame
        this.showNotification('Saving to EmberFrame...', 'info');

        setTimeout(() => {
            this.showNotification('App saved successfully! It will appear in your start menu after refresh.', 'success');
            this.saveToRecentApps();
        }, 2000);
    }

    static downloadFile() {
        if (!this.generatedCode) {
            this.showNotification('No app code to download. Please generate an app first.', 'error');
            return;
        }

        const blob = new Blob([this.generatedCode], { type: 'text/javascript' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${this.appData.id}.js`;
        a.click();
        URL.revokeObjectURL(url);

        this.showNotification('App downloaded successfully!', 'success');
    }

    static copyCode() {
        if (!this.generatedCode) {
            this.showNotification('No app code to copy. Please generate an app first.', 'error');
            return;
        }

        navigator.clipboard.writeText(this.generatedCode).then(() => {
            this.showNotification('App code copied to clipboard!', 'success');
        }).catch(() => {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = this.generatedCode;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.showNotification('App code copied to clipboard!', 'success');
        });
    }

    static shareLink() {
        this.showNotification('Share link feature coming soon!', 'info');
    }

    static showHelp() {
        const modal = this.currentWindow.querySelector('#help-modal');
        modal.classList.add('show');
        this.showHelpTab('getting-started');
    }

    static closeModal() {
        this.currentWindow.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('show');
        });
    }

    static showHelpTab(tabName) {
        this.currentWindow.querySelectorAll('.help-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        this.currentWindow.querySelector(`[onclick*="${tabName}"]`).classList.add('active');

        const content = this.currentWindow.querySelector('#help-content');
        const helpContent = {
            'getting-started': `
                <h3>Getting Started with Appmaker</h3>
                <p>Welcome to the EmberFrame Appmaker! Here's how to create your first app:</p>
                <ol>
                    <li><strong>Use the Wizard:</strong> Click "Start with Wizard" for step-by-step guidance</li>
                    <li><strong>Choose App Type:</strong> Select from form, dashboard, tool, game, viewer, or custom</li>
                    <li><strong>Select Features:</strong> Add functionality like validation, data export, etc.</li>
                    <li><strong>Pick a Theme:</strong> Choose a visual style that fits your app</li>
                    <li><strong>Generate Code:</strong> Let Appmaker create your app automatically</li>
                    <li><strong>Customize:</strong> Use the visual designer or code editor to refine</li>
                    <li><strong>Export:</strong> Save your app to EmberFrame or download the file</li>
                </ol>
                <h4>Tips for Success:</h4>
                <ul>
                    <li>Start with the wizard - it guides you through all the essential steps</li>
                    <li>Choose features that match your app's purpose</li>
                    <li>Preview your app frequently to see how it looks</li>
                    <li>Don't forget to test your app before exporting</li>
                </ul>
            `,

            'components': `
                <h3>Available Components</h3>
                <p>Appmaker provides various components you can use in your apps:</p>
                <h4>Form Components:</h4>
                <ul>
                    <li><strong>Text Input:</strong> Single-line text entry</li>
                    <li><strong>Textarea:</strong> Multi-line text entry</li>
                    <li><strong>Select:</strong> Dropdown selection</li>
                    <li><strong>Checkbox:</strong> Boolean options</li>
                    <li><strong>Radio:</strong> Single choice from multiple options</li>
                    <li><strong>Button:</strong> Action triggers</li>
                </ul>
                <h4>Display Components:</h4>
                <ul>
                    <li><strong>Text:</strong> Static text and headings</li>
                    <li><strong>Image:</strong> Pictures and graphics</li>
                    <li><strong>Table:</strong> Structured data display</li>
                    <li><strong>Card:</strong> Grouped content containers</li>
                    <li><strong>Chart:</strong> Data visualization</li>
                </ul>
                <h4>Layout Components:</h4>
                <ul>
                    <li><strong>Container:</strong> Group related elements</li>
                    <li><strong>Grid:</strong> Responsive layout system</li>
                    <li><strong>Tabs:</strong> Organize content in tabs</li>
                    <li><strong>Sidebar:</strong> Navigation and controls</li>
                </ul>
            `,

            'code': `
                <h3>Code Reference</h3>
                <p>Understanding the generated code structure:</p>
                <h4>App Structure:</h4>
                <pre><code>class MyApp {
    static createWindow() {
        return {
            title: 'App Title',
            width: '600px',
            height: '400px',
            content: \`HTML content\`,
            onInit: (windowElement) => {
                MyApp.init(windowElement);
            }
        };
    }
    
    static init(windowElement) {
        // App initialization
    }
}</code></pre>
                <h4>Key Methods:</h4>
                <ul>
                    <li><strong>createWindow():</strong> Defines the app window properties</li>
                    <li><strong>init():</strong> Called when the app starts</li>
                    <li><strong>this.currentWindow:</strong> Reference to the app's DOM element</li>
                </ul>
                <h4>Adding Event Handlers:</h4>
                <pre><code>// In your init method:
const button = this.currentWindow.querySelector('#my-button');
button.addEventListener('click', () => {
    this.handleButtonClick();
});</code></pre>
                <h4>EmberFrame Integration:</h4>
                <ul>
                    <li>Apps are automatically registered when loaded</li>
                    <li>Use <code>window.Notification</code> for user notifications</li>
                    <li>Access other apps via <code>window.AppName</code></li>
                </ul>
            `,

            'examples': `
                <h3>Example Applications</h3>
                <h4>Simple Calculator:</h4>
                <p>A basic calculator with number input and operation buttons. Features include calculation history and result copying.</p>
                
                <h4>Todo List:</h4>
                <p>Task management app with add, complete, and delete functionality. Includes local storage for persistence.</p>
                
                <h4>Weather Dashboard:</h4>
                <p>Displays weather information with charts and metrics. Features real-time updates and multiple locations.</p>
                
                <h4>Image Gallery:</h4>
                <p>Photo viewer with navigation controls, zoom functionality, and slideshow mode.</p>
                
                <h4>Contact Form:</h4>
                <p>Professional contact form with validation, required fields, and data export capabilities.</p>
                
                <h4>Memory Game:</h4>
                <p>Classic memory matching game with score tracking, levels, and high score storage.</p>
                
                <p><strong>Tip:</strong> Start with these examples and modify them to create your own unique applications!</p>
            `
        };

        content.innerHTML = helpContent[tabName] || '<p>Help content not found.</p>';
    }

    // Utility methods
    static toPascalCase(str) {
        return str.split('-').map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join('');
    }

    static saveToRecentApps() {
        // Simulate saving to recent apps list
        const recentApps = JSON.parse(localStorage.getItem('appmaker_recent') || '[]');

        const appInfo = {
            name: this.appData.name,
            id: this.appData.id,
            type: this.appData.type,
            created: new Date().toISOString()
        };

        // Add to beginning of list
        recentApps.unshift(appInfo);

        // Keep only 5 most recent
        if (recentApps.length > 5) {
            recentApps.splice(5);
        }

        localStorage.setItem('appmaker_recent', JSON.stringify(recentApps));
        this.loadRecentApps();
    }

    static loadRecentApps() {
        const recentList = this.currentWindow.querySelector('#recent-apps-list');
        const recentApps = JSON.parse(localStorage.getItem('appmaker_recent') || '[]');

        if (recentApps.length === 0) {
            recentList.innerHTML = '<div class="no-recent">No recent apps yet. Create your first app to get started!</div>';
            return;
        }

        recentList.innerHTML = recentApps.map(app => `
            <div class="recent-app-item">
                <div class="recent-app-info">
                    <h4>${app.name}</h4>
                    <p>Type: ${app.type} • Created: ${new Date(app.created).toLocaleDateString()}</p>
                </div>
                <button class="btn btn-sm btn-secondary" onclick="Appmaker.loadRecentApp('${app.id}')">
                    Open
                </button>
            </div>
        `).join('');
    }

    static loadRecentApp(appId) {
        this.showNotification('Loading recent app feature coming soon!', 'info');
    }

    static loadAppFromCode(code) {
        try {
            // Parse the app metadata and code
            this.generatedCode = code;
            this.switchTab('code');
            this.updateCodeEditor();
            this.showNotification('App imported successfully!', 'success');
        } catch (error) {
            this.showNotification('Failed to import app: ' + error.message, 'error');
        }
    }

    static showNotification(message, type = 'info') {
        if (window.Notification) {
            window.Notification[type](message);
        } else {
            console.log(`[${type.toUpperCase()}] ${message}`);
        }
    }

    static onClose(windowElement) {
        return true;
    }
}

window.Appmaker = Appmaker;