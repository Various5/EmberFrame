// Enhanced Text Editor with File Browser Integration
class TextEditor {
    static createWindow() {
        return {
            title: 'Text Editor - New Document',
            width: '900px',
            height: '650px',
            autoSize: false,
            content: `
                <div class="text-editor">
                    <div class="text-editor-menubar">
                        <div class="menu-group">
                            <button class="menu-button" onclick="TextEditor.showFileMenu(event)">
                                File <span class="menu-arrow">▼</span>
                            </button>
                            <div class="dropdown-menu file-menu">
                                <div class="menu-item" onclick="TextEditor.newFile()">
                                    <span class="menu-shortcut">Ctrl+N</span>New
                                </div>
                                <div class="menu-item" onclick="TextEditor.openFile()">
                                    <span class="menu-shortcut">Ctrl+O</span>Open...
                                </div>
                                <div class="menu-separator"></div>
                                <div class="menu-item" onclick="TextEditor.saveFile()">
                                    <span class="menu-shortcut">Ctrl+S</span>Save
                                </div>
                                <div class="menu-item" onclick="TextEditor.saveAsFile()">
                                    <span class="menu-shortcut">Ctrl+Shift+S</span>Save As...
                                </div>
                                <div class="menu-separator"></div>
                                <div class="menu-item" onclick="TextEditor.exportFile()">Export...</div>
                            </div>
                        </div>
                        <div class="menu-group">
                            <button class="menu-button" onclick="TextEditor.showEditMenu(event)">
                                Edit <span class="menu-arrow">▼</span>
                            </button>
                            <div class="dropdown-menu edit-menu">
                                <div class="menu-item" onclick="TextEditor.undo()">
                                    <span class="menu-shortcut">Ctrl+Z</span>Undo
                                </div>
                                <div class="menu-item" onclick="TextEditor.redo()">
                                    <span class="menu-shortcut">Ctrl+Y</span>Redo
                                </div>
                                <div class="menu-separator"></div>
                                <div class="menu-item" onclick="TextEditor.selectAll()">
                                    <span class="menu-shortcut">Ctrl+A</span>Select All
                                </div>
                                <div class="menu-item" onclick="TextEditor.findReplace()">
                                    <span class="menu-shortcut">Ctrl+F</span>Find & Replace
                                </div>
                            </div>
                        </div>
                        <div class="menu-group">
                            <button class="menu-button" onclick="TextEditor.showFormatMenu(event)">
                                Format <span class="menu-arrow">▼</span>
                            </button>
                            <div class="dropdown-menu format-menu">
                                <div class="menu-item" onclick="TextEditor.toggleWordWrap()">
                                    <span class="menu-check" id="wordwrap-check">✓</span>Word Wrap
                                </div>
                                <div class="menu-separator"></div>
                                <div class="menu-item" onclick="TextEditor.increaseFontSize()">Increase Font Size</div>
                                <div class="menu-item" onclick="TextEditor.decreaseFontSize()">Decrease Font Size</div>
                                <div class="menu-item" onclick="TextEditor.resetFontSize()">Reset Font Size</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="text-editor-toolbar">
                        <div class="toolbar-group">
                            <button onclick="TextEditor.newFile()" title="New (Ctrl+N)">📄</button>
                            <button onclick="TextEditor.openFile()" title="Open (Ctrl+O)">📁</button>
                            <button onclick="TextEditor.saveFile()" title="Save (Ctrl+S)">💾</button>
                        </div>
                        <div class="toolbar-group">
                            <button onclick="TextEditor.undo()" title="Undo (Ctrl+Z)">↶</button>
                            <button onclick="TextEditor.redo()" title="Redo (Ctrl+Y)">↷</button>
                        </div>
                        <div class="toolbar-group">
                            <button onclick="TextEditor.toggleBold()" title="Bold" class="format-btn" data-format="bold"><b>B</b></button>
                            <button onclick="TextEditor.toggleItalic()" title="Italic" class="format-btn" data-format="italic"><i>I</i></button>
                            <button onclick="TextEditor.toggleUnderline()" title="Underline" class="format-btn" data-format="underline"><u>U</u></button>
                        </div>
                        <div class="toolbar-group">
                            <select onchange="TextEditor.changeFontFamily(this.value)" title="Font Family">
                                <option value="monospace">Monospace</option>
                                <option value="'Segoe UI', sans-serif" selected>Segoe UI</option>
                                <option value="Arial, sans-serif">Arial</option>
                                <option value="'Times New Roman', serif">Times</option>
                                <option value="'Courier New', monospace">Courier</option>
                            </select>
                            <select onchange="TextEditor.changeFontSize(this.value)" title="Font Size">
                                <option value="10">10px</option>
                                <option value="12">12px</option>
                                <option value="14" selected>14px</option>
                                <option value="16">16px</option>
                                <option value="18">18px</option>
                                <option value="20">20px</option>
                                <option value="24">24px</option>
                            </select>
                        </div>
                        <div class="toolbar-group">
                            <select onchange="TextEditor.changeTheme(this.value)" title="Editor Theme">
                                <option value="light">Light</option>
                                <option value="dark">Dark</option>
                                <option value="solarized">Solarized</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="text-editor-content">
                        <div class="editor-sidebar">
                            <div class="line-numbers" id="line-numbers"></div>
                        </div>
                        <textarea id="text-editor-textarea" placeholder="Start typing your document here..." spellcheck="true"></textarea>
                    </div>
                    
                    <div class="text-editor-status">
                        <span id="editor-status">Ready</span>
                        <span id="file-path">Untitled</span>
                        <span id="cursor-position">Ln 1, Col 1</span>
                        <span id="word-count">0 words, 0 characters</span>
                        <span id="encoding">UTF-8</span>
                    </div>
                </div>
                
                <!-- Find & Replace Dialog -->
                <div class="find-replace-dialog" id="find-replace-dialog">
                    <div class="dialog-header">
                        <h3>Find & Replace</h3>
                        <button onclick="TextEditor.closeFindReplace()">✕</button>
                    </div>
                    <div class="dialog-content">
                        <div class="input-group">
                            <label>Find:</label>
                            <input type="text" id="find-input" placeholder="Enter text to find...">
                            <button onclick="TextEditor.findNext()">Find Next</button>
                        </div>
                        <div class="input-group">
                            <label>Replace:</label>
                            <input type="text" id="replace-input" placeholder="Enter replacement text...">
                            <button onclick="TextEditor.replaceNext()">Replace</button>
                            <button onclick="TextEditor.replaceAll()">Replace All</button>
                        </div>
                        <div class="dialog-options">
                            <label><input type="checkbox" id="match-case"> Match case</label>
                            <label><input type="checkbox" id="whole-word"> Whole word</label>
                            <label><input type="checkbox" id="regex-search"> Use regex</label>
                        </div>
                    </div>
                </div>
                
                <style>
                    .text-editor {
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        background: #fff;
                    }
                    
                    .text-editor-menubar {
                        display: flex;
                        background: #f8f9fa;
                        border-bottom: 1px solid #dee2e6;
                        padding: 4px 8px;
                    }
                    
                    .menu-group {
                        position: relative;
                    }
                    
                    .menu-button {
                        background: none;
                        border: none;
                        padding: 8px 12px;
                        cursor: pointer;
                        border-radius: 4px;
                        font-size: 13px;
                        display: flex;
                        align-items: center;
                        gap: 4px;
                    }
                    
                    .menu-button:hover {
                        background: #e9ecef;
                    }
                    
                    .menu-arrow {
                        font-size: 10px;
                        opacity: 0.7;
                    }
                    
                    .dropdown-menu {
                        position: absolute;
                        top: 100%;
                        left: 0;
                        background: white;
                        border: 1px solid #dee2e6;
                        border-radius: 4px;
                        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                        display: none;
                        min-width: 180px;
                        z-index: 1000;
                    }
                    
                    .dropdown-menu.active {
                        display: block;
                    }
                    
                    .menu-item {
                        padding: 8px 16px;
                        cursor: pointer;
                        font-size: 13px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    
                    .menu-item:hover {
                        background: #f8f9fa;
                    }
                    
                    .menu-shortcut {
                        font-size: 11px;
                        color: #6c757d;
                        margin-left: 20px;
                    }
                    
                    .menu-check {
                        margin-right: 8px;
                        width: 16px;
                    }
                    
                    .menu-separator {
                        height: 1px;
                        background: #dee2e6;
                        margin: 4px 0;
                    }
                    
                    .text-editor-toolbar {
                        display: flex;
                        gap: 8px;
                        padding: 8px 12px;
                        background: #f8f9fa;
                        border-bottom: 1px solid #dee2e6;
                        flex-wrap: wrap;
                        align-items: center;
                    }
                    
                    .toolbar-group {
                        display: flex;
                        gap: 4px;
                        align-items: center;
                        padding-right: 8px;
                        border-right: 1px solid #dee2e6;
                    }
                    
                    .toolbar-group:last-child {
                        border-right: none;
                    }
                    
                    .text-editor-toolbar button {
                        padding: 6px 8px;
                        border: 1px solid transparent;
                        background: white;
                        border-radius: 4px;
                        cursor: pointer;
                        transition: all 0.2s;
                        font-size: 12px;
                        min-width: 28px;
                        height: 28px;
                    }
                    
                    .text-editor-toolbar button:hover {
                        background: #e9ecef;
                        border-color: #dee2e6;
                    }
                    
                    .text-editor-toolbar button.active {
                        background: #007bff;
                        color: white;
                        border-color: #007bff;
                    }
                    
                    .text-editor-toolbar select {
                        padding: 4px 6px;
                        border: 1px solid #dee2e6;
                        border-radius: 4px;
                        font-size: 12px;
                        background: white;
                    }
                    
                    .text-editor-content {
                        flex: 1;
                        display: flex;
                        position: relative;
                        overflow: hidden;
                    }
                    
                    .editor-sidebar {
                        width: 50px;
                        background: #f8f9fa;
                        border-right: 1px solid #dee2e6;
                        overflow: hidden;
                    }
                    
                    .line-numbers {
                        padding: 20px 8px;
                        font-family: 'Courier New', monospace;
                        font-size: 12px;
                        line-height: 1.5;
                        color: #6c757d;
                        text-align: right;
                        user-select: none;
                        white-space: pre;
                    }
                    
                    #text-editor-textarea {
                        flex: 1;
                        border: none;
                        outline: none;
                        padding: 20px;
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                        font-size: 14px;
                        line-height: 1.5;
                        resize: none;
                        background: white;
                        color: #333;
                        white-space: pre-wrap;
                        word-wrap: break-word;
                    }
                    
                    .text-editor-status {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 6px 12px;
                        background: #f8f9fa;
                        border-top: 1px solid #dee2e6;
                        font-size: 12px;
                        color: #6c757d;
                        gap: 20px;
                    }
                    
                    .find-replace-dialog {
                        position: absolute;
                        top: 80px;
                        right: 20px;
                        width: 350px;
                        background: white;
                        border: 1px solid #dee2e6;
                        border-radius: 8px;
                        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                        display: none;
                        z-index: 1000;
                    }
                    
                    .find-replace-dialog.active {
                        display: block;
                    }
                    
                    .dialog-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 12px 16px;
                        background: #f8f9fa;
                        border-bottom: 1px solid #dee2e6;
                        border-radius: 8px 8px 0 0;
                    }
                    
                    .dialog-header h3 {
                        margin: 0;
                        font-size: 14px;
                        font-weight: 600;
                    }
                    
                    .dialog-header button {
                        background: none;
                        border: none;
                        font-size: 16px;
                        cursor: pointer;
                        padding: 4px;
                        border-radius: 4px;
                    }
                    
                    .dialog-header button:hover {
                        background: #e9ecef;
                    }
                    
                    .dialog-content {
                        padding: 16px;
                    }
                    
                    .input-group {
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        margin-bottom: 12px;
                    }
                    
                    .input-group label {
                        min-width: 60px;
                        font-size: 13px;
                        font-weight: 500;
                    }
                    
                    .input-group input[type="text"] {
                        flex: 1;
                        padding: 6px 8px;
                        border: 1px solid #dee2e6;
                        border-radius: 4px;
                        font-size: 13px;
                    }
                    
                    .input-group button {
                        padding: 6px 12px;
                        border: 1px solid #dee2e6;
                        background: white;
                        border-radius: 4px;
                        cursor: pointer;
                        font-size: 12px;
                    }
                    
                    .input-group button:hover {
                        background: #f8f9fa;
                    }
                    
                    .dialog-options {
                        display: flex;
                        gap: 16px;
                        margin-top: 12px;
                        font-size: 12px;
                    }
                    
                    .dialog-options label {
                        display: flex;
                        align-items: center;
                        gap: 4px;
                        cursor: pointer;
                    }
                    
                    /* Themes */
                    .text-editor.theme-dark {
                        background: #1e1e1e;
                        color: #d4d4d4;
                    }
                    
                    .text-editor.theme-dark #text-editor-textarea {
                        background: #1e1e1e;
                        color: #d4d4d4;
                    }
                    
                    .text-editor.theme-dark .editor-sidebar {
                        background: #252526;
                        border-color: #3e3e42;
                    }
                    
                    .text-editor.theme-dark .line-numbers {
                        color: #858585;
                    }
                    
                    .text-editor.theme-dark .text-editor-menubar,
                    .text-editor.theme-dark .text-editor-toolbar,
                    .text-editor.theme-dark .text-editor-status {
                        background: #2d2d30;
                        border-color: #3e3e42;
                        color: #cccccc;
                    }
                    
                    .text-editor.theme-solarized {
                        background: #fdf6e3;
                        color: #657b83;
                    }
                    
                    .text-editor.theme-solarized #text-editor-textarea {
                        background: #fdf6e3;
                        color: #657b83;
                    }
                </style>
            `,
            onInit: (windowElement) => {
                TextEditor.init(windowElement);
            }
        };
    }

static init(windowElement) {
    // Add comprehensive null checking
    if (!windowElement) {
        console.error('TextEditor: windowElement is null in init');
        return;
    }

    this.currentWindow = windowElement;
    console.log('TextEditor: currentWindow set to:', this.currentWindow);

    // Initialize other properties
    this.currentFile = null;
    this.currentFilePath = null;
    this.isModified = false;
    this.undoStack = [];
    this.redoStack = [];

    // Find elements
    this.textarea = windowElement.querySelector('#text-editor-textarea');
    this.statusElement = windowElement.querySelector('#editor-status');
    this.filePathElement = windowElement.querySelector('#file-path');
    this.wordCountElement = windowElement.querySelector('#word-count');
    this.cursorPositionElement = windowElement.querySelector('#cursor-position');
    this.lineNumbers = windowElement.querySelector('#line-numbers');

    if (!this.textarea) {
        console.error('TextEditor: Required elements not found');
        return;
    }

    // Setup with delay to ensure DOM is ready
    setTimeout(() => {
        this.setupEventListeners();
        this.updateLineNumbers();
        this.updateStatus();
        this.updateWordCount();
        this.updateCursorPosition();
        this.textarea.focus();
    }, 50);
}

static setupEventListeners() {
    // Multiple safety checks
    if (!this.currentWindow) {
        console.error('TextEditor: currentWindow is null in setupEventListeners');
        return;
    }

    if (!this.textarea) {
        console.error('TextEditor: textarea is null in setupEventListeners');
        return;
    }

    console.log('TextEditor: Setting up event listeners');

        this.textarea = this.currentWindow.querySelector('#text-editor-textarea');
        if (!this.textarea) {
            console.error('TextEditor: textarea not found');
            return;
        }

        this.textarea.addEventListener('input', () => {
            this.handleTextChange();
        });
        this.textarea.addEventListener('input', () => {
            this.handleTextChange();
        });

        this.textarea.addEventListener('scroll', () => {
            this.syncLineNumbers();
        });

        this.textarea.addEventListener('keyup', () => {
            this.updateCursorPosition();
        });

        this.textarea.addEventListener('click', () => {
            this.updateCursorPosition();
        });

        // Keyboard shortcuts
        this.textarea.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });

        // Close dropdown menus when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.menu-group') && this.currentWindow) {
                this.closeAllMenus();
            }
        });
            setTimeout(() => {
            this.setupEventListeners();
            this.updateLineNumbers();
            this.updateStatus();
            this.updateWordCount();
            this.updateCursorPosition();

            // Focus textarea
            if (this.textarea) {
                this.textarea.focus();
            }
        }, 100);
        }

    static handleKeyboardShortcuts(e) {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case 's':
                    e.preventDefault();
                    if (e.shiftKey) {
                        this.saveAsFile();
                    } else {
                        this.saveFile();
                    }
                    break;
                case 'n':
                    e.preventDefault();
                    this.newFile();
                    break;
                case 'o':
                    e.preventDefault();
                    this.openFile();
                    break;
                case 'z':
                    e.preventDefault();
                    if (e.shiftKey) {
                        this.redo();
                    } else {
                        this.undo();
                    }
                    break;
                case 'y':
                    e.preventDefault();
                    this.redo();
                    break;
                case 'f':
                    e.preventDefault();
                    this.findReplace();
                    break;
                case 'a':
                    e.preventDefault();
                    this.selectAll();
                    break;
            }
        } else if (e.key === 'F3') {
            e.preventDefault();
            this.findNext();
        } else if (e.key === 'Escape') {
            this.closeFindReplace();
        }
    }

    static handleTextChange() {
        if (!this.isModified) {
            this.isModified = true;
            this.updateTitle();
        }

        this.updateWordCount();
        this.updateLineNumbers();
        this.updateStatus('Modified');
        this.addToUndoStack();
    }

    static addToUndoStack() {
        // Throttle undo stack updates
        clearTimeout(this.undoTimeout);
        this.undoTimeout = setTimeout(() => {
            if (this.undoStack.length > 100) {
                this.undoStack.shift();
            }
            this.undoStack.push(this.textarea.value);
            this.redoStack = [];
        }, 500);
    }

    static updateTitle() {
        const title = this.currentWindow.querySelector('.window-title');
        const fileName = this.currentFile || 'New Document';
        const modified = this.isModified ? ' •' : '';
        title.textContent = `Text Editor - ${fileName}${modified}`;
    }

    static updateStatus(status = 'Ready') {
        this.statusElement.textContent = status;
    }

    static updateWordCount() {
        const text = this.textarea.value;
        const words = text.trim() ? text.trim().split(/\s+/).length : 0;
        const chars = text.length;
        const lines = text.split('\n').length;
        this.wordCountElement.textContent = `${lines} lines, ${words} words, ${chars} characters`;
    }

    static updateCursorPosition() {
        const textarea = this.textarea;
        const text = textarea.value;
        const cursorPos = textarea.selectionStart;

        const lines = text.substring(0, cursorPos).split('\n');
        const line = lines.length;
        const col = lines[lines.length - 1].length + 1;

        this.cursorPositionElement.textContent = `Ln ${line}, Col ${col}`;
    }

    static updateLineNumbers() {
        const lines = this.textarea.value.split('\n').length;
        const lineNumbersText = Array.from({ length: lines }, (_, i) => i + 1).join('\n');
        this.lineNumbers.textContent = lineNumbersText;
    }

    static syncLineNumbers() {
        this.lineNumbers.scrollTop = this.textarea.scrollTop;
    }

    // File operations
    static newFile() {
        if (this.isModified) {
            if (!confirm('You have unsaved changes. Create a new file anyway?')) {
                return;
            }
        }

        this.textarea.value = '';
        this.currentFile = null;
        this.currentFilePath = null;
        this.isModified = false;
        this.undoStack = [];
        this.redoStack = [];

        this.updateTitle();
        this.updateStatus('New file created');
        this.updateWordCount();
        this.updateLineNumbers();
        this.filePathElement.textContent = 'Untitled';
        this.textarea.focus();
    }

    static openFile() {
        if (window.FileBrowser) {
            window.FileBrowser.openForTextFiles((result) => {
                if (result.action === 'open') {
                    this.loadFile(result.path);
                }
            }, 'open');
        } else {
            Notification.error('File browser not available');
        }
    }

    static async loadFile(filePath) {
        try {
            // Clean up the file path to avoid double slashes
            const cleanPath = filePath.replace(/\/+/g, '/'); // Replace multiple slashes with single slash

            const response = await fetch(`/api/file-content/${cleanPath}`);
            const data = await response.json();

            if (response.ok) {
                this.textarea.value = data.content;
                this.currentFile = cleanPath.split('/').pop();
                this.currentFilePath = cleanPath;
                this.isModified = false;

                this.updateTitle();
                this.updateStatus(`Loaded ${this.currentFile}`);
                this.updateWordCount();
                this.updateLineNumbers();
                this.filePathElement.textContent = cleanPath;

                // Clear undo/redo stacks
                this.undoStack = [];
                this.redoStack = [];

                Notification.success(`File "${this.currentFile}" loaded successfully`);
            } else {
                Notification.error(data.error || 'Failed to load file');
            }
        } catch (error) {
            Notification.error('Network error: ' + error.message);
        }
    }

    static saveFile() {
        if (!this.currentFilePath) {
            this.saveAsFile();
            return;
        }

        this.performSave(this.currentFilePath);
    }

    static saveAsFile() {
        if (window.FileBrowser) {
            const defaultFilename = this.currentFile || 'document.txt';
            window.FileBrowser.openForTextFiles((result) => {
                if (result.action === 'save') {
                    this.performSave(result.path);
                }
            }, 'save', defaultFilename);
        } else {
            Notification.error('File browser not available');
        }
    }

    static async performSave(filePath) {
        try {
            const response = await fetch(`/api/files/${filePath}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: this.textarea.value })
            });

            if (response.ok) {
                this.currentFile = filePath.split('/').pop();
                this.currentFilePath = filePath;
                this.isModified = false;

                this.updateTitle();
                this.updateStatus(`Saved ${this.currentFile}`);
                this.filePathElement.textContent = filePath;

                Notification.success(`File saved as "${this.currentFile}"`);
            } else {
                const data = await response.json();
                Notification.error(data.error || 'Failed to save file');
            }
        } catch (error) {
            Notification.error('Network error: ' + error.message);
        }
    }

    static exportFile() {
        const content = this.textarea.value;
        const filename = this.currentFile || 'document.txt';

        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        Notification.success('File exported to downloads');
    }

    // Edit operations
    static undo() {
        if (this.undoStack.length > 1) {
            const current = this.undoStack.pop();
            this.redoStack.push(current);
            this.textarea.value = this.undoStack[this.undoStack.length - 1] || '';
            this.updateStatus('Undo');
            this.updateWordCount();
            this.updateLineNumbers();
        }
    }

    static redo() {
        if (this.redoStack.length > 0) {
            const content = this.redoStack.pop();
            this.undoStack.push(content);
            this.textarea.value = content;
            this.updateStatus('Redo');
            this.updateWordCount();
            this.updateLineNumbers();
        }
    }

    static selectAll() {
        this.textarea.select();
    }

    // Format operations
    static toggleBold() {
        this.wrapSelectedText('**', '**');
    }

    static toggleItalic() {
        this.wrapSelectedText('*', '*');
    }

    static toggleUnderline() {
        this.wrapSelectedText('_', '_');
    }

    static wrapSelectedText(prefix, suffix) {
        const start = this.textarea.selectionStart;
        const end = this.textarea.selectionEnd;
        const selectedText = this.textarea.value.substring(start, end);

        if (selectedText) {
            const wrappedText = prefix + selectedText + suffix;
            this.textarea.setRangeText(wrappedText, start, end);
            this.textarea.setSelectionRange(start + prefix.length, start + prefix.length + selectedText.length);
            this.handleTextChange();
        }
    }

    static changeFontFamily(family) {
        this.fontFamily = family;
        this.textarea.style.fontFamily = family;
    }

    static changeFontSize(size) {
        this.fontSize = parseInt(size);
        this.textarea.style.fontSize = size + 'px';
        this.updateLineNumbers();
    }

    static increaseFontSize() {
        this.fontSize = Math.min(this.fontSize + 2, 48);
        this.textarea.style.fontSize = this.fontSize + 'px';
        this.updateFontSizeSelect();
    }

    static decreaseFontSize() {
        this.fontSize = Math.max(this.fontSize - 2, 8);
        this.textarea.style.fontSize = this.fontSize + 'px';
        this.updateFontSizeSelect();
    }

    static resetFontSize() {
        this.fontSize = 14;
        this.textarea.style.fontSize = '14px';
        this.updateFontSizeSelect();
    }

    static updateFontSizeSelect() {
        const select = this.currentWindow.querySelector('select[onchange*="changeFontSize"]');
        select.value = this.fontSize;
    }

    static toggleWordWrap() {
        this.wordWrap = !this.wordWrap;
        this.textarea.style.whiteSpace = this.wordWrap ? 'pre-wrap' : 'pre';
        this.textarea.style.overflowX = this.wordWrap ? 'hidden' : 'auto';

        const check = this.currentWindow.querySelector('#wordwrap-check');
        check.textContent = this.wordWrap ? '✓' : '';
    }

    static changeTheme(theme) {
        this.currentTheme = theme;
        this.currentWindow.querySelector('.text-editor').className = `text-editor theme-${theme}`;
    }

    // Menu operations
    static showFileMenu(event) {
        event.stopPropagation();
        this.closeAllMenus();
        this.currentWindow.querySelector('.file-menu').classList.add('active');
    }

    static showEditMenu(event) {
        event.stopPropagation();
        this.closeAllMenus();
        this.currentWindow.querySelector('.edit-menu').classList.add('active');
    }

    static showFormatMenu(event) {
        event.stopPropagation();
        this.closeAllMenus();
        this.currentWindow.querySelector('.format-menu').classList.add('active');
    }

    static closeAllMenus() {
        // Add null check
        if (!this.currentWindow) {
            console.warn('TextEditor: currentWindow is null, skipping closeAllMenus');
            return;
        }

        this.currentWindow.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.classList.remove('active');
        });
    }

    // Find & Replace
    static findReplace() {
        const dialog = this.currentWindow.querySelector('#find-replace-dialog');
        dialog.classList.add('active');

        const findInput = this.currentWindow.querySelector('#find-input');
        findInput.focus();

        // Pre-fill with selected text if any
        const selectedText = this.textarea.value.substring(
            this.textarea.selectionStart,
            this.textarea.selectionEnd
        );
        if (selectedText) {
            findInput.value = selectedText;
        }
    }

    static closeFindReplace() {
        this.currentWindow.querySelector('#find-replace-dialog').classList.remove('active');
        this.textarea.focus();
    }

    static findNext() {
        const findText = this.currentWindow.querySelector('#find-input').value;
        if (!findText) return;

        const text = this.textarea.value;
        const startPos = this.textarea.selectionEnd;

        let index = text.indexOf(findText, startPos);
        if (index === -1) {
            // Search from beginning
            index = text.indexOf(findText, 0);
        }

        if (index !== -1) {
            this.textarea.setSelectionRange(index, index + findText.length);
            this.textarea.focus();
            this.updateStatus(`Found "${findText}"`);
        } else {
            this.updateStatus(`"${findText}" not found`);
        }
    }

    static replaceNext() {
        const findText = this.currentWindow.querySelector('#find-input').value;
        const replaceText = this.currentWindow.querySelector('#replace-input').value;

        if (!findText) return;

        const selectedText = this.textarea.value.substring(
            this.textarea.selectionStart,
            this.textarea.selectionEnd
        );

        if (selectedText === findText) {
            this.textarea.setRangeText(replaceText);
            this.handleTextChange();
        }

        this.findNext();
    }

    static replaceAll() {
        const findText = this.currentWindow.querySelector('#find-input').value;
        const replaceText = this.currentWindow.querySelector('#replace-input').value;

        if (!findText) return;

        const originalText = this.textarea.value;
        const newText = originalText.split(findText).join(replaceText);

        if (originalText !== newText) {
            this.textarea.value = newText;
            this.handleTextChange();

            const count = originalText.split(findText).length - 1;
            this.updateStatus(`Replaced ${count} occurrences`);
        } else {
            this.updateStatus(`"${findText}" not found`);
        }
    }

static onClose(windowElement) {
    if (this.isModified) {
        const result = confirm('You have unsaved changes. Close anyway?');
        if (!result) {
            return false; // Prevent closing
        }
    }

    // Clean up this specific instance
    if (this.currentWindow === windowElement) {
        this.currentWindow = null;
    }

    return true; // Allow closing
}
}

window.TextEditor = TextEditor;