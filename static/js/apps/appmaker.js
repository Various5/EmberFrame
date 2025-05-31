/**
 * APP_METADATA
 * @name AppMaker
 * @icon fas fa-code
 * @description Create custom applications with templates and live preview
 * @category Development
 * @version 2.0.0
 * @author EmberFrame Team
 * @enabled true
 */

class AppMaker {
    static createWindow() {
        return {
            title: 'App Maker - Create Custom Apps',
            width: '1100px',
            height: '700px',
            autoSize: false,
            content: `
                <div class="app-maker">
                    <div class="app-maker-header">
                        <h2>🚀 App Maker Studio</h2>
                        <p>Create custom applications with templates and live preview</p>
                        <div class="header-stats">
                            <span class="stat-item">
                                <i class="fas fa-code"></i>
                                <span id="am-line-count">0</span> lines
                            </span>
                            <span class="stat-item">
                                <i class="fas fa-file"></i>
                                <span id="am-file-size">0 KB</span>
                            </span>
                        </div>
                    </div>

                    <div class="app-maker-toolbar">
                        <div class="toolbar-left">
                            <select id="am-template-select" onchange="AppMaker.loadTemplate()">
                                <option value="">Choose Template...</option>
                                <option value="calculator">🧮 Calculator App</option>
                                <option value="todo">📋 Todo List App</option>
                                <option value="weather">🌤️ Weather Widget</option>
                                <option value="game-snake">🐍 Snake Game</option>
                                <option value="game-memory">🧠 Memory Game</option>
                                <option value="chat">💬 Chat Interface</option>
                                <option value="dashboard">📊 Dashboard</option>
                                <option value="music-player">🎵 Music Player</option>
                                <option value="image-editor">🖼️ Image Editor</option>
                                <option value="blank">📄 Blank App</option>
                            </select>
                            <button onclick="AppMaker.newApp()" title="New App">
                                <i class="fas fa-plus"></i> New
                            </button>
                            <button onclick="AppMaker.saveApp()" title="Save App">
                                <i class="fas fa-save"></i> Save
                            </button>
                            <button onclick="AppMaker.loadApp()" title="Load App">
                                <i class="fas fa-folder-open"></i> Load
                            </button>
                        </div>

                        <div class="toolbar-center">
                            <input type="text" id="am-app-name" placeholder="My Awesome App" class="app-name-input">
                        </div>

                        <div class="toolbar-right">
                            <button onclick="AppMaker.previewApp()" class="preview-btn">
                                <i class="fas fa-play"></i> Preview
                            </button>
                            <button onclick="AppMaker.installApp()" class="install-btn">
                                <i class="fas fa-download"></i> Install
                            </button>
                            <button onclick="AppMaker.exportApp()" title="Export App">
                                <i class="fas fa-file-export"></i> Export
                            </button>
                        </div>
                    </div>

                    <div class="app-maker-main">
                        <div class="templates-sidebar" id="am-templates-sidebar">
                            <div class="sidebar-header">
                                <h4>📁 Templates</h4>
                                <button onclick="AppMaker.toggleSidebar()" class="sidebar-toggle">
                                    <i class="fas fa-chevron-left"></i>
                                </button>
                            </div>
                            
                            <div class="template-categories">
                                <div class="template-category">
                                    <h5>🎮 Games</h5>
                                    <div class="template-list">
                                        <div class="template-item" onclick="AppMaker.selectTemplate('game-snake')">
                                            <div class="template-icon">🐍</div>
                                            <div class="template-info">
                                                <div class="template-name">Snake Game</div>
                                                <div class="template-desc">Classic snake game</div>
                                            </div>
                                        </div>
                                        <div class="template-item" onclick="AppMaker.selectTemplate('game-memory')">
                                            <div class="template-icon">🧠</div>
                                            <div class="template-info">
                                                <div class="template-name">Memory Game</div>
                                                <div class="template-desc">Card matching game</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="template-category">
                                    <h5>🔧 Tools</h5>
                                    <div class="template-list">
                                        <div class="template-item" onclick="AppMaker.selectTemplate('calculator')">
                                            <div class="template-icon">🧮</div>
                                            <div class="template-info">
                                                <div class="template-name">Calculator</div>
                                                <div class="template-desc">Scientific calculator</div>
                                            </div>
                                        </div>
                                        <div class="template-item" onclick="AppMaker.selectTemplate('todo')">
                                            <div class="template-icon">📋</div>
                                            <div class="template-info">
                                                <div class="template-name">Todo List</div>
                                                <div class="template-desc">Task management</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="template-category">
                                    <h5>🎨 UI Components</h5>
                                    <div class="template-list">
                                        <div class="template-item" onclick="AppMaker.selectTemplate('dashboard')">
                                            <div class="template-icon">📊</div>
                                            <div class="template-info">
                                                <div class="template-name">Dashboard</div>
                                                <div class="template-desc">Data visualization</div>
                                            </div>
                                        </div>
                                        <div class="template-item" onclick="AppMaker.selectTemplate('weather')">
                                            <div class="template-icon">🌤️</div>
                                            <div class="template-info">
                                                <div class="template-name">Weather Widget</div>
                                                <div class="template-desc">Weather display</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="sidebar-footer">
                                <div class="recent-apps">
                                    <h5>📜 Recent</h5>
                                    <div id="am-recent-apps" class="recent-list">
                                        <!-- Recent apps will be populated here -->
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="code-editor-panel">
                            <div class="editor-tabs">
                                <div class="editor-tab active" data-tab="javascript">
                                    <i class="fab fa-js-square"></i> JavaScript
                                </div>
                                <div class="editor-tab" data-tab="html">
                                    <i class="fab fa-html5"></i> HTML
                                </div>
                                <div class="editor-tab" data-tab="css">
                                    <i class="fab fa-css3-alt"></i> CSS
                                </div>
                                <div class="editor-tab" data-tab="metadata">
                                    <i class="fas fa-info"></i> Metadata
                                </div>
                            </div>

                            <div class="editor-content">
                                <div class="editor-container active" data-content="javascript">
                                    <div class="editor-header">
                                        <span class="file-indicator">📄 app.js</span>
                                        <div class="editor-tools">
                                            <button onclick="AppMaker.formatCode('javascript')" title="Format Code">
                                                <i class="fas fa-magic"></i>
                                            </button>
                                            <button onclick="AppMaker.validateCode()" title="Validate Code">
                                                <i class="fas fa-check"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <textarea id="am-javascript-editor" class="code-editor" placeholder="// Write your JavaScript code here..."></textarea>
                                </div>

                                <div class="editor-container" data-content="html">
                                    <div class="editor-header">
                                        <span class="file-indicator">📄 app.html</span>
                                        <div class="editor-tools">
                                            <button onclick="AppMaker.formatCode('html')" title="Format HTML">
                                                <i class="fas fa-magic"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <textarea id="am-html-editor" class="code-editor" placeholder="<!-- Write your HTML structure here... -->"></textarea>
                                </div>

                                <div class="editor-container" data-content="css">
                                    <div class="editor-header">
                                        <span class="file-indicator">📄 app.css</span>
                                        <div class="editor-tools">
                                            <button onclick="AppMaker.formatCode('css')" title="Format CSS">
                                                <i class="fas fa-magic"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <textarea id="am-css-editor" class="code-editor" placeholder="/* Write your CSS styles here... */"></textarea>
                                </div>

                                <div class="editor-container" data-content="metadata">
                                    <div class="editor-header">
                                        <span class="file-indicator">📄 metadata.js</span>
                                    </div>
                                    <textarea id="am-metadata-editor" class="code-editor" placeholder="// App metadata and configuration..."></textarea>
                                </div>
                            </div>
                        </div>

                        <div class="preview-panel" id="am-preview-panel">
                            <div class="preview-header">
                                <h4>👁️ Live Preview</h4>
                                <div class="preview-controls">
                                    <button onclick="AppMaker.refreshPreview()" title="Refresh Preview">
                                        <i class="fas fa-sync-alt"></i>
                                    </button>
                                    <button onclick="AppMaker.togglePreviewMode()" title="Toggle Preview Mode" id="am-preview-mode">
                                        <i class="fas fa-desktop"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="preview-content">
                                <iframe id="am-preview-iframe" src="about:blank"></iframe>
                            </div>
                        </div>
                    </div>

                    <div class="app-maker-footer">
                        <div class="footer-left">
                            <span id="am-status">Ready</span>
                        </div>
                        <div class="footer-center">
                            <div class="validation-status" id="am-validation">
                                <i class="fas fa-check-circle" style="color: #28a745;"></i>
                                <span>Code is valid</span>
                            </div>
                        </div>
                        <div class="footer-right">
                            <span>Lines: <span id="am-cursor-line">1</span></span>
                            <span>Columns: <span id="am-cursor-col">1</span></span>
                        </div>
                    </div>
                </div>

                <style>
                    .app-maker {
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        background: #1e1e1e;
                        color: #d4d4d4;
                        font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
                    }

                    .app-maker-header {
                        padding: 20px;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        text-align: center;
                        border-bottom: 3px solid #5a67d8;
                    }

                    .app-maker-header h2 {
                        margin: 0 0 8px 0;
                        font-size: 24px;
                        font-weight: 700;
                    }

                    .app-maker-header p {
                        margin: 0 0 15px 0;
                        opacity: 0.9;
                    }

                    .header-stats {
                        display: flex;
                        justify-content: center;
                        gap: 30px;
                    }

                    .stat-item {
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        font-size: 14px;
                    }

                    .app-maker-toolbar {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding: 12px 20px;
                        background: #2d2d30;
                        border-bottom: 1px solid #3e3e42;
                    }

                    .toolbar-left,
                    .toolbar-right {
                        display: flex;
                        gap: 10px;
                        align-items: center;
                    }

                    .toolbar-center {
                        flex: 1;
                        max-width: 300px;
                        margin: 0 20px;
                    }

                    .app-name-input {
                        width: 100%;
                        padding: 8px 12px;
                        background: #1e1e1e;
                        border: 1px solid #3e3e42;
                        border-radius: 6px;
                        color: #d4d4d4;
                        font-size: 14px;
                        text-align: center;
                        font-weight: 600;
                    }

                    .app-name-input:focus {
                        outline: none;
                        border-color: #007acc;
                        box-shadow: 0 0 0 2px rgba(0, 122, 204, 0.2);
                    }

                    .app-maker-toolbar button,
                    .app-maker-toolbar select {
                        padding: 8px 16px;
                        background: #0e639c;
                        color: white;
                        border: none;
                        border-radius: 6px;
                        cursor: pointer;
                        font-size: 14px;
                        transition: all 0.2s;
                        display: flex;
                        align-items: center;
                        gap: 6px;
                    }

                    .app-maker-toolbar button:hover {
                        background: #1177bb;
                        transform: translateY(-1px);
                    }

                    .preview-btn {
                        background: #28a745 !important;
                    }

                    .preview-btn:hover {
                        background: #218838 !important;
                    }

                    .install-btn {
                        background: #dc3545 !important;
                    }

                    .install-btn:hover {
                        background: #c82333 !important;
                    }

                    .app-maker-main {
                        flex: 1;
                        display: flex;
                        overflow: hidden;
                    }

                    .templates-sidebar {
                        width: 280px;
                        background: #252526;
                        border-right: 1px solid #3e3e42;
                        display: flex;
                        flex-direction: column;
                        transition: margin-left 0.3s ease;
                    }

                    .templates-sidebar.collapsed {
                        margin-left: -280px;
                    }

                    .sidebar-header {
                        padding: 15px;
                        border-bottom: 1px solid #3e3e42;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        background: #2d2d30;
                    }

                    .sidebar-header h4 {
                        margin: 0;
                        color: #cccccc;
                        font-size: 16px;
                    }

                    .sidebar-toggle {
                        background: none;
                        border: none;
                        color: #cccccc;
                        cursor: pointer;
                        padding: 4px;
                        border-radius: 4px;
                    }

                    .sidebar-toggle:hover {
                        background: #3e3e42;
                    }

                    .template-categories {
                        flex: 1;
                        overflow-y: auto;
                        padding: 15px;
                    }

                    .template-category {
                        margin-bottom: 25px;
                    }

                    .template-category h5 {
                        margin: 0 0 10px 0;
                        color: #569cd6;
                        font-size: 14px;
                        font-weight: 600;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                    }

                    .template-item {
                        display: flex;
                        align-items: center;
                        gap: 12px;
                        padding: 12px;
                        border-radius: 8px;
                        cursor: pointer;
                        transition: all 0.2s;
                        margin-bottom: 8px;
                        background: #2d2d30;
                        border: 1px solid transparent;
                    }

                    .template-item:hover {
                        background: #094771;
                        border-color: #007acc;
                        transform: translateX(4px);
                    }

                    .template-icon {
                        font-size: 24px;
                        width: 32px;
                        text-align: center;
                    }

                    .template-info {
                        flex: 1;
                    }

                    .template-name {
                        font-weight: 600;
                        color: #cccccc;
                        font-size: 14px;
                        margin-bottom: 2px;
                    }

                    .template-desc {
                        font-size: 12px;
                        color: #969696;
                    }

                    .sidebar-footer {
                        border-top: 1px solid #3e3e42;
                        padding: 15px;
                    }

                    .recent-apps h5 {
                        margin: 0 0 10px 0;
                        color: #569cd6;
                        font-size: 14px;
                    }

                    .recent-list {
                        display: flex;
                        flex-direction: column;
                        gap: 5px;
                    }

                    .recent-item {
                        padding: 8px 12px;
                        background: #2d2d30;
                        border-radius: 6px;
                        cursor: pointer;
                        font-size: 12px;
                        transition: background 0.2s;
                    }

                    .recent-item:hover {
                        background: #094771;
                    }

                    .code-editor-panel {
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        background: #1e1e1e;
                    }

                    .editor-tabs {
                        display: flex;
                        background: #2d2d30;
                        border-bottom: 1px solid #3e3e42;
                    }

                    .editor-tab {
                        padding: 12px 20px;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        color: #969696;
                        border-bottom: 3px solid transparent;
                        transition: all 0.2s;
                        font-size: 14px;
                    }

                    .editor-tab:hover {
                        color: #cccccc;
                        background: rgba(255, 255, 255, 0.05);
                    }

                    .editor-tab.active {
                        color: #007acc;
                        border-bottom-color: #007acc;
                        background: #1e1e1e;
                    }

                    .editor-content {
                        flex: 1;
                        position: relative;
                    }

                    .editor-container {
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        display: none;
                        flex-direction: column;
                    }

                    .editor-container.active {
                        display: flex;
                    }

                    .editor-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 10px 15px;
                        background: #252526;
                        border-bottom: 1px solid #3e3e42;
                    }

                    .file-indicator {
                        font-size: 12px;
                        color: #cccccc;
                        display: flex;
                        align-items: center;
                        gap: 6px;
                    }

                    .editor-tools {
                        display: flex;
                        gap: 8px;
                    }

                    .editor-tools button {
                        padding: 6px 10px;
                        background: #0e639c;
                        color: white;
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;
                        font-size: 12px;
                        transition: background 0.2s;
                    }

                    .editor-tools button:hover {
                        background: #1177bb;
                    }

                    .code-editor {
                        flex: 1;
                        background: #1e1e1e;
                        color: #d4d4d4;
                        border: none;
                        padding: 15px;
                        font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
                        font-size: 14px;
                        line-height: 1.5;
                        resize: none;
                        outline: none;
                        tab-size: 4;
                    }

                    .code-editor:focus {
                        background: #1f1f1f;
                    }

                    .preview-panel {
                        width: 400px;
                        background: #252526;
                        border-left: 1px solid #3e3e42;
                        display: flex;
                        flex-direction: column;
                    }

                    .preview-header {
                        padding: 12px 15px;
                        background: #2d2d30;
                        border-bottom: 1px solid #3e3e42;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }

                    .preview-header h4 {
                        margin: 0;
                        color: #cccccc;
                        font-size: 14px;
                    }

                    .preview-controls {
                        display: flex;
                        gap: 8px;
                    }

                    .preview-controls button {
                        padding: 6px 10px;
                        background: #0e639c;
                        color: white;
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;
                        font-size: 12px;
                    }

                    .preview-controls button:hover {
                        background: #1177bb;
                    }

                    .preview-content {
                        flex: 1;
                        position: relative;
                    }

                    #am-preview-iframe {
                        width: 100%;
                        height: 100%;
                        border: none;
                        background: white;
                    }

                    .app-maker-footer {
                        padding: 8px 20px;
                        background: #007acc;
                        color: white;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        font-size: 12px;
                    }

                    .footer-center {
                        display: flex;
                        align-items: center;
                        gap: 8px;
                    }

                    .validation-status {
                        display: flex;
                        align-items: center;
                        gap: 6px;
                    }

                    .footer-right {
                        display: flex;
                        gap: 15px;
                    }

                    /* Responsive */
                    @media (max-width: 1024px) {
                        .templates-sidebar {
                            width: 250px;
                        }

                        .preview-panel {
                            width: 350px;
                        }
                    }

                    @media (max-width: 768px) {
                        .templates-sidebar {
                            width: 200px;
                        }

                        .preview-panel {
                            display: none;
                        }

                        .toolbar-center {
                            max-width: 200px;
                        }
                    }
                </style>
            `,
            onInit: (windowElement) => {
                AppMaker.init(windowElement);
            }
        };
    }

    static init(windowElement) {
        this.currentWindow = windowElement;
        this.currentTemplate = null;
        this.appData = {
            name: 'My App',
            javascript: '',
            html: '',
            css: '',
            metadata: this.getDefaultMetadata()
        };

        this.setupEventListeners();
        this.loadRecentApps();
        this.updateStats();
        this.loadTemplate('calculator'); // Load calculator template by default
    }

    static setupEventListeners() {
        // Tab switching
        const tabs = this.currentWindow.querySelectorAll('.editor-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                this.switchTab(tab.dataset.tab);
            });
        });

        // Code editors
        const editors = ['javascript', 'html', 'css', 'metadata'];
        editors.forEach(editorType => {
            const editor = this.currentWindow.querySelector(`#am-${editorType}-editor`);
            if (editor) {
                editor.addEventListener('input', () => {
                    this.appData[editorType] = editor.value;
                    this.updateStats();
                    this.autoPreview();
                });

                editor.addEventListener('keydown', (e) => {
                    this.handleEditorKeydown(e, editor);
                });

                editor.addEventListener('scroll', () => {
                    this.updateCursorPosition(editor);
                });
            }
        });

        // App name input
        const nameInput = this.currentWindow.querySelector('#am-app-name');
        nameInput.addEventListener('input', (e) => {
            this.appData.name = e.target.value || 'My App';
            this.updateMetadata();
        });
    }

    static switchTab(tabName) {
        // Update tab appearance
        this.currentWindow.querySelectorAll('.editor-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        this.currentWindow.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update editor content
        this.currentWindow.querySelectorAll('.editor-container').forEach(container => {
            container.classList.remove('active');
        });
        this.currentWindow.querySelector(`[data-content="${tabName}"]`).classList.add('active');
    }

    static getDefaultMetadata() {
        return `/**
 * APP_METADATA
 * @name ${this.appData?.name || 'My App'}
 * @icon fas fa-star
 * @description A custom app created with App Maker
 * @category Custom
 * @version 1.0.0
 * @author ${window.EmberFrame?.currentUser || 'User'}
 * @enabled true
 */`;
    }

    static updateMetadata() {
        const metadataEditor = this.currentWindow.querySelector('#am-metadata-editor');
        const currentMetadata = metadataEditor.value;

        // Update the name in metadata if it exists
        const nameRegex = /@name\s+(.+)/;
        if (nameRegex.test(currentMetadata)) {
            metadataEditor.value = currentMetadata.replace(nameRegex, `@name ${this.appData.name}`);
        } else {
            metadataEditor.value = this.getDefaultMetadata();
        }
        this.appData.metadata = metadataEditor.value;
    }

    static loadTemplate(templateType) {
        if (!templateType) return;

        this.currentTemplate = templateType;
        const templates = this.getTemplates();
        const template = templates[templateType];

        if (!template) return;

        // Update app data
        this.appData = {
            name: template.name,
            javascript: template.javascript,
            html: template.html,
            css: template.css,
            metadata: template.metadata
        };

        // Update UI
        this.currentWindow.querySelector('#am-app-name').value = template.name;
        this.currentWindow.querySelector('#am-javascript-editor').value = template.javascript;
        this.currentWindow.querySelector('#am-html-editor').value = template.html;
        this.currentWindow.querySelector('#am-css-editor').value = template.css;
        this.currentWindow.querySelector('#am-metadata-editor').value = template.metadata;

        // Update template selector
        this.currentWindow.querySelector('#am-template-select').value = templateType;

        this.updateStats();
        this.refreshPreview();
        this.updateStatus(`Loaded template: ${template.name}`);
    }

    static selectTemplate(templateType) {
        this.loadTemplate(templateType);
    }

    static getTemplates() {
        return {
            calculator: {
                name: 'Calculator App',
                metadata: `/**
 * APP_METADATA
 * @name Calculator App
 * @icon fas fa-calculator
 * @description Scientific calculator with history
 * @category Tools
 * @version 1.0.0
 * @author App Maker
 * @enabled true
 */`,
                javascript: `class Calculator {
    static createWindow() {
        return {
            title: 'Calculator',
            width: '300px',
            height: '400px',
            content: document.getElementById('calculator-content').innerHTML,
            onInit: (windowElement) => {
                Calculator.init(windowElement);
            }
        };
    }

    static init(windowElement) {
        this.display = windowElement.querySelector('#calc-display');
        this.currentInput = '0';
        this.operator = null;
        this.waitingForInput = false;
        this.previousInput = null;

        this.setupEventListeners(windowElement);
    }

    static setupEventListeners(windowElement) {
        const buttons = windowElement.querySelectorAll('.calc-btn');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                this.handleInput(button.dataset.value, button.dataset.type);
            });
        });

        // Keyboard support
        windowElement.addEventListener('keydown', (e) => {
            this.handleKeyboard(e);
        });
        
        windowElement.tabIndex = 0;
        windowElement.focus();
    }

    static handleInput(value, type) {
        switch(type) {
            case 'number':
                this.inputNumber(value);
                break;
            case 'operator':
                this.inputOperator(value);
                break;
            case 'action':
                this.handleAction(value);
                break;
        }
        this.updateDisplay();
    }

    static inputNumber(num) {
        if (this.waitingForInput) {
            this.currentInput = num;
            this.waitingForInput = false;
        } else {
            this.currentInput = this.currentInput === '0' ? num : this.currentInput + num;
        }
    }

    static inputOperator(op) {
        if (this.operator && !this.waitingForInput) {
            this.calculate();
        }
        
        this.previousInput = this.currentInput;
        this.operator = op;
        this.waitingForInput = true;
    }

    static handleAction(action) {
        switch(action) {
            case 'clear':
                this.clear();
                break;
            case 'equals':
                this.calculate();
                break;
            case 'decimal':
                this.inputDecimal();
                break;
            case 'sign':
                this.toggleSign();
                break;
            case 'percent':
                this.percent();
                break;
        }
    }

    static calculate() {
        if (!this.operator || this.waitingForInput) return;

        const prev = parseFloat(this.previousInput);
        const current = parseFloat(this.currentInput);
        let result;

        switch(this.operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = current !== 0 ? prev / current : 'Error';
                break;
        }

        this.currentInput = result.toString();
        this.operator = null;
        this.waitingForInput = true;
    }

    static clear() {
        this.currentInput = '0';
        this.operator = null;
        this.previousInput = null;
        this.waitingForInput = false;
    }

    static inputDecimal() {
        if (this.waitingForInput) {
            this.currentInput = '0.';
            this.waitingForInput = false;
        } else if (this.currentInput.indexOf('.') === -1) {
            this.currentInput += '.';
        }
    }

    static toggleSign() {
        this.currentInput = (parseFloat(this.currentInput) * -1).toString();
    }

    static percent() {
        this.currentInput = (parseFloat(this.currentInput) / 100).toString();
    }

    static updateDisplay() {
        this.display.textContent = this.currentInput;
    }

    static handleKeyboard(e) {
        e.preventDefault();
        const key = e.key;
        
        if ('0123456789'.includes(key)) {
            this.handleInput(key, 'number');
        } else if ('+-*/'.includes(key)) {
            this.handleInput(key, 'operator');
        } else if (key === 'Enter' || key === '=') {
            this.handleInput('equals', 'action');
        } else if (key === 'Escape' || key === 'c' || key === 'C') {
            this.handleInput('clear', 'action');
        } else if (key === '.') {
            this.handleInput('decimal', 'action');
        }
    }
}

window.Calculator = Calculator;`,
                html: `<div id="calculator-content">
    <div class="calculator">
        <div class="calc-display">
            <div id="calc-display">0</div>
        </div>
        <div class="calc-buttons">
            <button class="calc-btn action" data-value="clear" data-type="action">C</button>
            <button class="calc-btn action" data-value="sign" data-type="action">±</button>
            <button class="calc-btn action" data-value="percent" data-type="action">%</button>
            <button class="calc-btn operator" data-value="/" data-type="operator">÷</button>
            
            <button class="calc-btn number" data-value="7" data-type="number">7</button>
            <button class="calc-btn number" data-value="8" data-type="number">8</button>
            <button class="calc-btn number" data-value="9" data-type="number">9</button>
            <button class="calc-btn operator" data-value="*" data-type="operator">×</button>
            
            <button class="calc-btn number" data-value="4" data-type="number">4</button>
            <button class="calc-btn number" data-value="5" data-type="number">5</button>
            <button class="calc-btn number" data-value="6" data-type="number">6</button>
            <button class="calc-btn operator" data-value="-" data-type="operator">−</button>
            
            <button class="calc-btn number" data-value="1" data-type="number">1</button>
            <button class="calc-btn number" data-value="2" data-type="number">2</button>
            <button class="calc-btn number" data-value="3" data-type="number">3</button>
            <button class="calc-btn operator" data-value="+" data-type="operator">+</button>
            
            <button class="calc-btn number zero" data-value="0" data-type="number">0</button>
            <button class="calc-btn action" data-value="decimal" data-type="action">.</button>
            <button class="calc-btn equals" data-value="equals" data-type="action">=</button>
        </div>
    </div>
</div>`,
                css: `.calculator {
    background: linear-gradient(145deg, #2c3e50, #34495e);
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
}

.calc-display {
    background: #1a1a1a;
    padding: 20px;
    margin-bottom: 15px;
    border-radius: 10px;
    text-align: right;
    box-shadow: inset 0 2px 10px rgba(0,0,0,0.5);
}

#calc-display {
    color: #00ff88;
    font-size: 32px;
    font-family: 'Courier New', monospace;
    font-weight: bold;
    text-shadow: 0 0 10px rgba(0,255,136,0.5);
    min-height: 40px;
    line-height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
}

.calc-buttons {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
}

.calc-btn {
    padding: 15px;
    border: none;
    border-radius: 8px;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    background: linear-gradient(145deg, #3498db, #2980b9);
    color: white;
}

.calc-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0,0,0,0.3);
}

.calc-btn:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.calc-btn.operator {
    background: linear-gradient(145deg, #e74c3c, #c0392b);
}

.calc-btn.action {
    background: linear-gradient(145deg, #f39c12, #d68910);
}

.calc-btn.equals {
    background: linear-gradient(145deg, #27ae60, #229954);
}

.calc-btn.zero {
    grid-column: span 2;
}

@media (max-width: 400px) {
    .calculator {
        padding: 15px;
    }
    
    .calc-btn {
        padding: 12px;
        font-size: 18px;
    }
    
    #calc-display {
        font-size: 28px;
    }
}`
            },

            'game-snake': {
                name: 'Snake Game',
                metadata: `/**
 * APP_METADATA
 * @name Snake Game
 * @icon fas fa-gamepad
 * @description Classic snake game with score tracking
 * @category Games
 * @version 1.0.0
 * @author App Maker
 * @enabled true
 */`,
                javascript: `class SnakeGame {
    static createWindow() {
        return {
            title: 'Snake Game',
            width: '500px',
            height: '600px',
            content: document.getElementById('snake-content').innerHTML,
            onInit: (windowElement) => {
                SnakeGame.init(windowElement);
            }
        };
    }

    static init(windowElement) {
        this.canvas = windowElement.querySelector('#game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.scoreElement = windowElement.querySelector('#score');
        this.highScoreElement = windowElement.querySelector('#high-score');
        
        this.gridSize = 20;
        this.snake = [{x: 200, y: 200}];
        this.direction = {x: 0, y: 0};
        this.food = this.generateFood();
        this.score = 0;
        this.highScore = parseInt(localStorage.getItem('snake-high-score') || '0');
        this.gameRunning = false;
        
        this.updateScore();
        this.setupEventListeners(windowElement);
        this.draw();
    }

    static setupEventListeners(windowElement) {
        const startBtn = windowElement.querySelector('#start-btn');
        const pauseBtn = windowElement.querySelector('#pause-btn');
        const resetBtn = windowElement.querySelector('#reset-btn');

        startBtn.addEventListener('click', () => this.startGame());
        pauseBtn.addEventListener('click', () => this.pauseGame());
        resetBtn.addEventListener('click', () => this.resetGame());

        // Keyboard controls
        windowElement.addEventListener('keydown', (e) => {
            this.handleKeyPress(e);
        });
        
        windowElement.tabIndex = 0;
        windowElement.focus();
    }

    static handleKeyPress(e) {
        if (!this.gameRunning) return;
        
        switch(e.key) {
            case 'ArrowUp':
                if (this.direction.y === 0) {
                    this.direction = {x: 0, y: -this.gridSize};
                }
                break;
            case 'ArrowDown':
                if (this.direction.y === 0) {
                    this.direction = {x: 0, y: this.gridSize};
                }
                break;
            case 'ArrowLeft':
                if (this.direction.x === 0) {
                    this.direction = {x: -this.gridSize, y: 0};
                }
                break;
            case 'ArrowRight':
                if (this.direction.x === 0) {
                    this.direction = {x: this.gridSize, y: 0};
                }
                break;
        }
    }

    static startGame() {
        if (!this.gameRunning) {
            this.gameRunning = true;
            this.gameLoop();
        }
    }

    static pauseGame() {
        this.gameRunning = false;
    }

    static resetGame() {
        this.gameRunning = false;
        this.snake = [{x: 200, y: 200}];
        this.direction = {x: 0, y: 0};
        this.food = this.generateFood();
        this.score = 0;
        this.updateScore();
        this.draw();
    }

    static gameLoop() {
        if (!this.gameRunning) return;

        this.update();
        this.draw();

        setTimeout(() => this.gameLoop(), 150);
    }

    static update() {
        if (this.direction.x === 0 && this.direction.y === 0) return;

        const head = {
            x: this.snake[0].x + this.direction.x,
            y: this.snake[0].y + this.direction.y
        };

        // Check wall collision
        if (head.x < 0 || head.x >= this.canvas.width || 
            head.y < 0 || head.y >= this.canvas.height) {
            this.gameOver();
            return;
        }

        // Check self collision
        if (this.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            this.gameOver();
            return;
        }

        this.snake.unshift(head);

        // Check food collision
        if (head.x === this.food.x && head.y === this.food.y) {
            this.score += 10;
            this.updateScore();
            this.food = this.generateFood();
        } else {
            this.snake.pop();
        }
    }

    static generateFood() {
        let food;
        do {
            food = {
                x: Math.floor(Math.random() * (this.canvas.width / this.gridSize)) * this.gridSize,
                y: Math.floor(Math.random() * (this.canvas.height / this.gridSize)) * this.gridSize
            };
        } while (this.snake.some(segment => segment.x === food.x && segment.y === food.y));
        
        return food;
    }

    static draw() {
        // Clear canvas
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw snake
        this.ctx.fillStyle = '#0f0';
        this.snake.forEach((segment, index) => {
            this.ctx.fillStyle = index === 0 ? '#0f0' : '#090';
            this.ctx.fillRect(segment.x, segment.y, this.gridSize - 2, this.gridSize - 2);
        });

        // Draw food
        this.ctx.fillStyle = '#f00';
        this.ctx.fillRect(this.food.x, this.food.y, this.gridSize - 2, this.gridSize - 2);

        // Draw grid
        this.ctx.strokeStyle = '#333';
        this.ctx.lineWidth = 1;
        for (let x = 0; x <= this.canvas.width; x += this.gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }
        for (let y = 0; y <= this.canvas.height; y += this.gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }
    }

    static updateScore() {
        this.scoreElement.textContent = this.score;
        this.highScoreElement.textContent = this.highScore;
        
        if (this.score > this.highScore) {
            this.highScore = this.score;
            this.highScoreElement.textContent = this.highScore;
            localStorage.setItem('snake-high-score', this.highScore.toString());
        }
    }

    static gameOver() {
        this.gameRunning = false;
        alert(\`Game Over! Score: \${this.score}\`);
    }
}

window.SnakeGame = SnakeGame;`,
                html: `<div id="snake-content">
    <div class="snake-game">
        <div class="game-header">
            <div class="score-display">
                <div>Score: <span id="score">0</span></div>
                <div>High Score: <span id="high-score">0</span></div>
            </div>
            <div class="game-controls">
                <button id="start-btn">Start</button>
                <button id="pause-btn">Pause</button>
                <button id="reset-btn">Reset</button>
            </div>
        </div>
        <canvas id="game-canvas" width="480" height="480"></canvas>
        <div class="instructions">
            <p>Use arrow keys to control the snake</p>
            <p>Eat the red food to grow and score points</p>
        </div>
    </div>
</div>`,
                css: `.snake-game {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background: linear-gradient(145deg, #1e3c72, #2a5298);
    color: white;
    font-family: 'Arial', sans-serif;
    height: 100%;
}

.game-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 480px;
    margin-bottom: 20px;
}

.score-display {
    display: flex;
    gap: 20px;
    font-size: 18px;
    font-weight: bold;
}

.game-controls {
    display: flex;
    gap: 10px;
}

.game-controls button {
    padding: 8px 16px;
    background: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    transition: background 0.3s;
}

.game-controls button:hover {
    background: #45a049;
}

#game-canvas {
    border: 3px solid #fff;
    border-radius: 10px;
    background: #000;
    box-shadow: 0 0 20px rgba(0,255,0,0.3);
}

.instructions {
    margin-top: 20px;
    text-align: center;
    opacity: 0.8;
}

.instructions p {
    margin: 5px 0;
    font-size: 14px;
}`
            },

            todo: {
                name: 'Todo List App',
                metadata: `/**
 * APP_METADATA
 * @name Todo List App
 * @icon fas fa-tasks
 * @description Organize your tasks and boost productivity
 * @category Productivity
 * @version 1.0.0
 * @author App Maker
 * @enabled true
 */`,
                javascript: `class TodoApp {
    static createWindow() {
        return {
            title: 'Todo List',
            width: '400px',
            height: '600px',
            content: document.getElementById('todo-content').innerHTML,
            onInit: (windowElement) => {
                TodoApp.init(windowElement);
            }
        };
    }

    static init(windowElement) {
        this.windowElement = windowElement;
        this.todos = JSON.parse(localStorage.getItem('todos') || '[]');
        this.nextId = Math.max(...this.todos.map(t => t.id), 0) + 1;
        
        this.setupEventListeners();
        this.render();
    }

    static setupEventListeners() {
        const addBtn = this.windowElement.querySelector('#add-todo-btn');
        const input = this.windowElement.querySelector('#todo-input');
        const clearCompleted = this.windowElement.querySelector('#clear-completed');
        const filterBtns = this.windowElement.querySelectorAll('.filter-btn');

        addBtn.addEventListener('click', () => this.addTodo());
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTodo();
        });
        clearCompleted.addEventListener('click', () => this.clearCompleted());

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => this.setFilter(btn.dataset.filter));
        });
    }

    static addTodo() {
        const input = this.windowElement.querySelector('#todo-input');
        const text = input.value.trim();
        
        if (!text) return;

        const todo = {
            id: this.nextId++,
            text: text,
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.todos.push(todo);
        this.saveTodos();
        this.render();
        input.value = '';
    }

    static toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveTodos();
            this.render();
        }
    }

    static deleteTodo(id) {
        this.todos = this.todos.filter(t => t.id !== id);
        this.saveTodos();
        this.render();
    }

    static clearCompleted() {
        this.todos = this.todos.filter(t => !t.completed);
        this.saveTodos();
        this.render();
    }

    static setFilter(filter) {
        this.currentFilter = filter;
        this.windowElement.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        this.render();
    }

    static getFilteredTodos() {
        switch(this.currentFilter) {
            case 'active':
                return this.todos.filter(t => !t.completed);
            case 'completed':
                return this.todos.filter(t => t.completed);
            default:
                return this.todos;
        }
    }

    static render() {
        const todoList = this.windowElement.querySelector('#todo-list');
        const filtered = this.getFilteredTodos();

        if (filtered.length === 0) {
            todoList.innerHTML = '<div class="empty-state">No tasks to show</div>';
            return;
        }

        todoList.innerHTML = filtered.map(todo => \`
            <div class="todo-item \${todo.completed ? 'completed' : ''}">
                <input type="checkbox" \${todo.completed ? 'checked' : ''} 
                       onchange="TodoApp.toggleTodo(\${todo.id})">
                <span class="todo-text">\${todo.text}</span>
                <button class="delete-btn" onclick="TodoApp.deleteTodo(\${todo.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        \`).join('');

        this.updateStats();
    }

    static updateStats() {
        const total = this.todos.length;
        const completed = this.todos.filter(t => t.completed).length;
        const remaining = total - completed;

        this.windowElement.querySelector('#todo-stats').textContent = 
            \`\${remaining} remaining, \${completed} completed\`;
    }

    static saveTodos() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }
}

TodoApp.currentFilter = 'all';
window.TodoApp = TodoApp;`,
                html: `<div id="todo-content">
    <div class="todo-app">
        <div class="todo-header">
            <h2>📋 My Tasks</h2>
            <div class="add-todo">
                <input type="text" id="todo-input" placeholder="What needs to be done?">
                <button id="add-todo-btn">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
        </div>

        <div class="todo-filters">
            <button class="filter-btn active" data-filter="all">All</button>
            <button class="filter-btn" data-filter="active">Active</button>
            <button class="filter-btn" data-filter="completed">Completed</button>
        </div>

        <div class="todo-list" id="todo-list">
            <!-- Todos will be rendered here -->
        </div>

        <div class="todo-footer">
            <div id="todo-stats" class="todo-stats">0 remaining, 0 completed</div>
            <button id="clear-completed" class="clear-btn">Clear Completed</button>
        </div>
    </div>
</div>`,
                css: `.todo-app {
    max-width: 400px;
    margin: 0 auto;
    background: white;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    overflow: hidden;
    font-family: 'Segoe UI', sans-serif;
}

.todo-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 20px;
    color: white;
}

.todo-header h2 {
    margin: 0 0 20px 0;
    text-align: center;
    font-size: 24px;
}

.add-todo {
    display: flex;
    gap: 10px;
}

#todo-input {
    flex: 1;
    padding: 12px 16px;
    border: none;
    border-radius: 25px;
    font-size: 16px;
    outline: none;
}

#add-todo-btn {
    width: 50px;
    height: 50px;
    border: none;
    border-radius: 50%;
    background: rgba(255,255,255,0.2);
    color: white;
    cursor: pointer;
    font-size: 18px;
    transition: all 0.3s;
}

#add-todo-btn:hover {
    background: rgba(255,255,255,0.3);
    transform: scale(1.05);
}

.todo-filters {
    display: flex;
    background: #f8f9fa;
    border-bottom: 1px solid #e9ecef;
}

.filter-btn {
    flex: 1;
    padding: 15px;
    border: none;
    background: none;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    color: #6c757d;
    transition: all 0.3s;
}

.filter-btn:hover {
    background: #e9ecef;
}

.filter-btn.active {
    color: #667eea;
    background: white;
    border-bottom: 2px solid #667eea;
}

.todo-list {
    max-height: 400px;
    overflow-y: auto;
}

.todo-item {
    display: flex;
    align-items: center;
    padding: 15px 20px;
    border-bottom: 1px solid #f1f3f4;
    transition: all 0.3s;
}

.todo-item:hover {
    background: #f8f9fa;
}

.todo-item.completed {
    opacity: 0.6;
}

.todo-item.completed .todo-text {
    text-decoration: line-through;
    color: #6c757d;
}

.todo-item input[type="checkbox"] {
    margin-right: 15px;
    transform: scale(1.2);
    cursor: pointer;
}

.todo-text {
    flex: 1;
    font-size: 16px;
    color: #333;
}

.delete-btn {
    background: none;
    border: none;
    color: #dc3545;
    cursor: pointer;
    padding: 5px;
    border-radius: 3px;
    opacity: 0;
    transition: all 0.3s;
}

.todo-item:hover .delete-btn {
    opacity: 1;
}

.delete-btn:hover {
    background: #f8d7da;
}

.empty-state {
    text-align: center;
    padding: 40px 20px;
    color: #6c757d;
    font-style: italic;
}

.todo-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    background: #f8f9fa;
    border-top: 1px solid #e9ecef;
}

.todo-stats {
    font-size: 14px;
    color: #6c757d;
}

.clear-btn {
    padding: 8px 16px;
    background: #dc3545;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 12px;
    transition: background 0.3s;
}

.clear-btn:hover {
    background: #c82333;
}`
            },

            blank: {
                name: 'Blank App',
                metadata: `/**
 * APP_METADATA
 * @name My Custom App
 * @icon fas fa-star
 * @description A blank template to start building your app
 * @category Custom
 * @version 1.0.0
 * @author App Maker
 * @enabled true
 */`,
                javascript: `class MyCustomApp {
    static createWindow() {
        return {
            title: 'My Custom App',
            width: '500px',
            height: '400px',
            content: document.getElementById('app-content').innerHTML,
            onInit: (windowElement) => {
                MyCustomApp.init(windowElement);
            }
        };
    }

    static init(windowElement) {
        this.windowElement = windowElement;
        this.setupEventListeners();
        
        // Initialize your app here
        console.log('My Custom App initialized!');
    }

    static setupEventListeners() {
        // Add your event listeners here
        const button = this.windowElement.querySelector('#my-button');
        if (button) {
            button.addEventListener('click', () => {
                this.handleButtonClick();
            });
        }
    }

    static handleButtonClick() {
        // Handle button click
        alert('Button clicked! Customize this behavior.');
    }
}

window.MyCustomApp = MyCustomApp;`,
                html: `<div id="app-content">
    <div class="my-app">
        <div class="app-header">
            <h2>🌟 My Custom App</h2>
            <p>Start building your amazing app here!</p>
        </div>
        
        <div class="app-content">
            <p>This is a blank template. Replace this content with your app's UI.</p>
            
            <button id="my-button" class="app-button">
                Click Me!
            </button>
            
            <div class="app-section">
                <h3>Features to add:</h3>
                <ul>
                    <li>Custom functionality</li>
                    <li>User interface elements</li>
                    <li>Data management</li>
                    <li>Responsive design</li>
                </ul>
            </div>
        </div>
    </div>
</div>`,
                css: `.my-app {
    padding: 20px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    height: 100%;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    border-radius: 10px;
}

.app-header {
    text-align: center;
    margin-bottom: 30px;
    padding: 20px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.app-header h2 {
    margin: 0 0 10px 0;
    color: #333;
    font-size: 28px;
}

.app-header p {
    margin: 0;
    color: #666;
    font-size: 16px;
}

.app-content {
    background: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.app-button {
    padding: 12px 24px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    transition: all 0.3s;
    margin: 20px 0;
}

.app-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.app-section {
    margin-top: 30px;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 8px;
    border-left: 4px solid #667eea;
}

.app-section h3 {
    margin: 0 0 15px 0;
    color: #333;
    font-size: 18px;
}

.app-section ul {
    margin: 0;
    padding-left: 20px;
    color: #666;
}

.app-section li {
    margin-bottom: 8px;
}`
            }
        };
    }

    static updateStats() {
        const jsCode = this.appData.javascript;
        const htmlCode = this.appData.html;
        const cssCode = this.appData.css;

        const totalLines = (jsCode.split('\n').length) +
                          (htmlCode.split('\n').length) +
                          (cssCode.split('\n').length);

        const totalSize = new Blob([jsCode + htmlCode + cssCode]).size;

        this.currentWindow.querySelector('#am-line-count').textContent = totalLines;
        this.currentWindow.querySelector('#am-file-size').textContent = (totalSize / 1024).toFixed(1);
    }

    static autoPreview() {
        clearTimeout(this.previewTimeout);
        this.previewTimeout = setTimeout(() => {
            this.refreshPreview();
        }, 1000);
    }

    static refreshPreview() {
        const iframe = this.currentWindow.querySelector('#am-preview-iframe');
        const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <style>${this.appData.css}</style>
            </head>
            <body>
                ${this.appData.html}
                <script>${this.appData.javascript}</script>
            </body>
            </html>
        `;

        iframe.srcdoc = html;
    }

    static previewApp() {
        this.refreshPreview();
        this.updateStatus('Preview updated');
    }

    static validateCode() {
        try {
            // Basic JavaScript validation
            new Function(this.appData.javascript);

            const validation = this.currentWindow.querySelector('#am-validation');
            validation.innerHTML = '<i class="fas fa-check-circle" style="color: #28a745;"></i><span>Code is valid</span>';
            this.updateStatus('Code validation passed');
        } catch (error) {
            const validation = this.currentWindow.querySelector('#am-validation');
            validation.innerHTML = '<i class="fas fa-exclamation-triangle" style="color: #dc3545;"></i><span>Syntax error found</span>';
            this.updateStatus('Validation failed: ' + error.message);
        }
    }

    static formatCode(type) {
        // Basic code formatting
        const editor = this.currentWindow.querySelector(`#am-${type}-editor`);
        let code = editor.value;

        if (type === 'javascript') {
            // Basic JS formatting
            code = code.replace(/;/g, ';\n').replace(/{/g, '{\n').replace(/}/g, '\n}');
        }

        editor.value = code;
        this.appData[type] = code;
        this.updateStatus(`${type} code formatted`);
    }

    static handleEditorKeydown(e, editor) {
        // Tab support
        if (e.key === 'Tab') {
            e.preventDefault();
            const start = editor.selectionStart;
            const end = editor.selectionEnd;
            editor.value = editor.value.substring(0, start) + '    ' + editor.value.substring(end);
            editor.selectionStart = editor.selectionEnd = start + 4;
        }
    }

    static async saveApp() {
        const appName = this.appData.name.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
        const appData = {
            ...this.appData,
            savedAt: new Date().toISOString()
        };

        try {
            // Save to localStorage for now
            localStorage.setItem(`app-maker-${appName}`, JSON.stringify(appData));
            this.addToRecentApps(appName, this.appData.name);
            this.updateStatus(`App "${this.appData.name}" saved successfully`);

            if (window.Notification) {
                window.Notification.success(`App "${this.appData.name}" saved!`);
            }
        } catch (error) {
            this.updateStatus('Failed to save app: ' + error.message);
            if (window.Notification) {
                window.Notification.error('Failed to save app');
            }
        }
    }

    static async installApp() {
        if (!this.appData.name || !this.appData.javascript) {
            this.updateStatus('Please add app name and JavaScript code before installing');
            return;
        }

        const appId = this.appData.name.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
        const appCode = `${this.appData.metadata}

${this.appData.javascript}

window.${this.getAppClassName()} = ${this.getAppClassName()};`;

        try {
            // Create blob and download as .js file
            const blob = new Blob([appCode], { type: 'text/javascript' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${appId}.js`;
            a.click();
            URL.revokeObjectURL(url);

            this.updateStatus(`App "${this.appData.name}" exported for installation`);

            if (window.Notification) {
                window.Notification.success(`App exported! Place ${appId}.js in your apps folder to install.`);
            }
        } catch (error) {
            this.updateStatus('Failed to export app: ' + error.message);
        }
    }

    static getAppClassName() {
        return this.appData.name.replace(/[^a-zA-Z0-9]/g, '').replace(/^./, c => c.toUpperCase());
    }

    static exportApp() {
        const appData = {
            ...this.appData,
            exportedAt: new Date().toISOString(),
            version: '1.0.0'
        };

        const blob = new Blob([JSON.stringify(appData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${this.appData.name.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}.json`;
        a.click();
        URL.revokeObjectURL(url);

        this.updateStatus('App exported as JSON');
    }

    static newApp() {
        if (confirm('Create a new app? Unsaved changes will be lost.')) {
            this.appData = {
                name: 'My New App',
                javascript: '',
                html: '',
                css: '',
                metadata: this.getDefaultMetadata()
            };

            this.currentWindow.querySelector('#am-app-name').value = this.appData.name;
            this.currentWindow.querySelector('#am-javascript-editor').value = '';
            this.currentWindow.querySelector('#am-html-editor').value = '';
            this.currentWindow.querySelector('#am-css-editor').value = '';
            this.currentWindow.querySelector('#am-metadata-editor').value = this.appData.metadata;
            this.currentWindow.querySelector('#am-template-select').value = '';

            this.updateStats();
            this.updateStatus('New app created');
        }
    }

    static loadApp() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        const appData = JSON.parse(e.target.result);
                        this.appData = appData;

                        this.currentWindow.querySelector('#am-app-name').value = appData.name;
                        this.currentWindow.querySelector('#am-javascript-editor').value = appData.javascript;
                        this.currentWindow.querySelector('#am-html-editor').value = appData.html;
                        this.currentWindow.querySelector('#am-css-editor').value = appData.css;
                        this.currentWindow.querySelector('#am-metadata-editor').value = appData.metadata;

                        this.updateStats();
                        this.refreshPreview();
                        this.updateStatus(`App "${appData.name}" loaded`);
                    } catch (error) {
                        this.updateStatus('Failed to load app: ' + error.message);
                    }
                };
                reader.readAsText(file);
            }
        };
        input.click();
    }

    static addToRecentApps(appId, appName) {
        let recent = JSON.parse(localStorage.getItem('app-maker-recent') || '[]');
        recent = recent.filter(app => app.id !== appId);
        recent.unshift({ id: appId, name: appName, savedAt: new Date().toISOString() });
        recent = recent.slice(0, 5);
        localStorage.setItem('app-maker-recent', JSON.stringify(recent));
        this.loadRecentApps();
    }

    static loadRecentApps() {
        const recent = JSON.parse(localStorage.getItem('app-maker-recent') || '[]');
        const container = this.currentWindow.querySelector('#am-recent-apps');

        if (recent.length === 0) {
            container.innerHTML = '<div style="text-align: center; color: #666; font-style: italic;">No recent apps</div>';
            return;
        }

        container.innerHTML = recent.map(app => `
            <div class="recent-item" onclick="AppMaker.loadRecentApp('${app.id}')">
                <div style="font-weight: 500;">${app.name}</div>
                <div style="font-size: 10px; opacity: 0.7;">${new Date(app.savedAt).toLocaleDateString()}</div>
            </div>
        `).join('');
    }

    static loadRecentApp(appId) {
        try {
            const appData = JSON.parse(localStorage.getItem(`app-maker-${appId}`) || '{}');
            if (appData.name) {
                this.appData = appData;

                this.currentWindow.querySelector('#am-app-name').value = appData.name;
                this.currentWindow.querySelector('#am-javascript-editor').value = appData.javascript || '';
                this.currentWindow.querySelector('#am-html-editor').value = appData.html || '';
                this.currentWindow.querySelector('#am-css-editor').value = appData.css || '';
                this.currentWindow.querySelector('#am-metadata-editor').value = appData.metadata || '';

                this.updateStats();
                this.refreshPreview();
                this.updateStatus(`Loaded "${appData.name}"`);
            }
        } catch (error) {
            this.updateStatus('Failed to load recent app');
        }
    }

    static toggleSidebar() {
        const sidebar = this.currentWindow.querySelector('#am-templates-sidebar');
        sidebar.classList.toggle('collapsed');
    }

    static togglePreviewMode() {
        const previewPanel = this.currentWindow.querySelector('#am-preview-panel');
        const button = this.currentWindow.querySelector('#am-preview-mode');

        if (previewPanel.style.display === 'none') {
            previewPanel.style.display = 'flex';
            button.innerHTML = '<i class="fas fa-desktop"></i>';
        } else {
            previewPanel.style.display = 'none';
            button.innerHTML = '<i class="fas fa-eye-slash"></i>';
        }
    }

    static updateStatus(message) {
        this.currentWindow.querySelector('#am-status').textContent = message;
        setTimeout(() => {
            this.currentWindow.querySelector('#am-status').textContent = 'Ready';
        }, 3000);
    }

    static updateCursorPosition(editor) {
        const lines = editor.value.substr(0, editor.selectionStart).split('\n');
        const line = lines.length;
        const col = lines[lines.length - 1].length + 1;

        this.currentWindow.querySelector('#am-cursor-line').textContent = line;
        this.currentWindow.querySelector('#am-cursor-col').textContent = col;
    }

    static onClose(windowElement) {
        return true;
    }
}

window.AppMaker = AppMaker;