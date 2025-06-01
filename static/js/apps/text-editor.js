// Enhanced Text Editor with File Browser Integration
/**
 * APP_METADATA
 * @name Text Editor
 * @icon fas fa-file-alt
 * @description Create and edit text documents
 * @category Productivity
 * @version 1.2.0
 * @author EmberFrame Team
 * @enabled true
 */

class TextEditor {
    static createWindow() {
        return {
            title: 'Text Editor v2.0',
            width: '900px',
            height: '700px',
            content: TextEditor.getHTML(),
            onInit: (windowElement) => {
                TextEditor.init(windowElement);
            }
        };
    }

    static getHTML() {
        return `
            <div class="text-editor-container">
                <div class="editor-toolbar">
                    <div class="toolbar-group">
                        <button class="toolbar-btn" data-action="new" title="New File (Ctrl+N)">
                            <i class="fas fa-file"></i>
                        </button>
                        <button class="toolbar-btn" data-action="open" title="Open File (Ctrl+O)">
                            <i class="fas fa-folder-open"></i>
                        </button>
                        <button class="toolbar-btn" data-action="save" title="Save File (Ctrl+S)">
                            <i class="fas fa-save"></i>
                        </button>
                        <button class="toolbar-btn" data-action="save-as" title="Save As">
                            <i class="fas fa-file-export"></i>
                        </button>
                    </div>
                    
                    <div class="toolbar-separator"></div>
                    
                    <div class="toolbar-group">
                        <button class="toolbar-btn" data-action="undo" title="Undo (Ctrl+Z)">
                            <i class="fas fa-undo"></i>
                        </button>
                        <button class="toolbar-btn" data-action="redo" title="Redo (Ctrl+Y)">
                            <i class="fas fa-redo"></i>
                        </button>
                    </div>
                    
                    <div class="toolbar-separator"></div>
                    
                    <div class="toolbar-group">
                        <button class="toolbar-btn" data-action="bold" title="Bold (Ctrl+B)">
                            <i class="fas fa-bold"></i>
                        </button>
                        <button class="toolbar-btn" data-action="italic" title="Italic (Ctrl+I)">
                            <i class="fas fa-italic"></i>
                        </button>
                        <button class="toolbar-btn" data-action="underline" title="Underline (Ctrl+U)">
                            <i class="fas fa-underline"></i>
                        </button>
                    </div>
                    
                    <div class="toolbar-separator"></div>
                    
                    <div class="toolbar-group">
                        <select class="font-family-select">
                            <option value="monospace">Monospace</option>
                            <option value="Arial, sans-serif">Arial</option>
                            <option value="Georgia, serif">Georgia</option>
                            <option value="'Times New Roman', serif">Times New Roman</option>
                            <option value="'Courier New', monospace">Courier New</option>
                        </select>
                        
                        <select class="font-size-select">
                            <option value="12px">12px</option>
                            <option value="14px" selected>14px</option>
                            <option value="16px">16px</option>
                            <option value="18px">18px</option>
                            <option value="20px">20px</option>
                            <option value="24px">24px</option>
                        </select>
                    </div>
                    
                    <div class="toolbar-separator"></div>
                    
                    <div class="toolbar-group">
                        <button class="toolbar-btn" data-action="find" title="Find & Replace (Ctrl+F)">
                            <i class="fas fa-search"></i>
                        </button>
                        <button class="toolbar-btn" data-action="word-wrap" title="Toggle Word Wrap">
                            <i class="fas fa-align-justify"></i>
                        </button>
                        <button class="toolbar-btn" data-action="fullscreen" title="Toggle Fullscreen">
                            <i class="fas fa-expand"></i>
                        </button>
                    </div>
                </div>
                
                <div class="editor-status-bar">
                    <span class="file-info">New Document</span>
                    <span class="cursor-position">Line 1, Column 1</span>
                    <span class="word-count">Words: 0 | Characters: 0</span>
                </div>
                
                <div class="find-replace-panel" style="display: none;">
                    <div class="find-replace-content">
                        <div class="find-group">
                            <input type="text" class="find-input" placeholder="Find...">
                            <button class="find-btn" data-action="find-next">
                                <i class="fas fa-chevron-down"></i>
                            </button>
                            <button class="find-btn" data-action="find-prev">
                                <i class="fas fa-chevron-up"></i>
                            </button>
                        </div>
                        <div class="replace-group">
                            <input type="text" class="replace-input" placeholder="Replace...">
                            <button class="replace-btn" data-action="replace">Replace</button>
                            <button class="replace-btn" data-action="replace-all">Replace All</button>
                        </div>
                        <button class="close-find" data-action="close-find">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
                
                <div class="editor-main">
                    <div class="line-numbers"></div>
                    <textarea class="editor-textarea" spellcheck="true"></textarea>
                </div>
            </div>
            
            <input type="file" class="file-input" accept=".txt,.js,.html,.css,.json,.md" style="display: none;">
            
            <style>
                .text-editor-container {
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    background: var(--bg-primary, #1a1a1a);
                    color: var(--text-primary, #ffffff);
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                }
                
                .editor-toolbar {
                    display: flex;
                    align-items: center;
                    padding: 8px;
                    background: var(--bg-secondary, #2d2d2d);
                    border-bottom: 1px solid var(--border-color, #444);
                    flex-wrap: wrap;
                    gap: 4px;
                }
                
                .toolbar-group {
                    display: flex;
                    align-items: center;
                    gap: 2px;
                }
                
                .toolbar-btn {
                    background: transparent;
                    border: 1px solid transparent;
                    color: var(--text-primary, #ffffff);
                    padding: 6px 8px;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    font-size: 14px;
                }
                
                .toolbar-btn:hover {
                    background: var(--accent-color, #ff6b35);
                    border-color: var(--accent-color, #ff6b35);
                }
                
                .toolbar-btn.active {
                    background: var(--accent-color, #ff6b35);
                    border-color: var(--accent-color, #ff6b35);
                }
                
                .toolbar-separator {
                    width: 1px;
                    height: 24px;
                    background: var(--border-color, #444);
                    margin: 0 8px;
                }
                
                .font-family-select,
                .font-size-select {
                    background: var(--bg-primary, #1a1a1a);
                    color: var(--text-primary, #ffffff);
                    border: 1px solid var(--border-color, #444);
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-size: 12px;
                    margin: 0 2px;
                }
                
                .editor-status-bar {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 4px 12px;
                    background: var(--bg-secondary, #2d2d2d);
                    border-bottom: 1px solid var(--border-color, #444);
                    font-size: 12px;
                    color: var(--text-secondary, #cccccc);
                }
                
                .find-replace-panel {
                    background: var(--bg-secondary, #2d2d2d);
                    border-bottom: 1px solid var(--border-color, #444);
                    padding: 8px;
                }
                
                .find-replace-content {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    position: relative;
                }
                
                .find-group,
                .replace-group {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }
                
                .find-input,
                .replace-input {
                    background: var(--bg-primary, #1a1a1a);
                    color: var(--text-primary, #ffffff);
                    border: 1px solid var(--border-color, #444);
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-size: 12px;
                    width: 150px;
                }
                
                .find-btn,
                .replace-btn {
                    background: var(--accent-color, #ff6b35);
                    color: white;
                    border: none;
                    padding: 4px 8px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 12px;
                }
                
                .close-find {
                    position: absolute;
                    right: 0;
                    background: transparent;
                    border: none;
                    color: var(--text-primary, #ffffff);
                    cursor: pointer;
                    padding: 4px;
                }
                
                .editor-main {
                    display: flex;
                    flex: 1;
                    position: relative;
                    overflow: hidden;
                }
                
                .line-numbers {
                    background: var(--bg-secondary, #2d2d2d);
                    color: var(--text-secondary, #666);
                    padding: 12px 8px;
                    font-family: 'Courier New', monospace;
                    font-size: 14px;
                    line-height: 1.4;
                    text-align: right;
                    user-select: none;
                    border-right: 1px solid var(--border-color, #444);
                    min-width: 40px;
                    white-space: pre;
                }
                
                .editor-textarea {
                    flex: 1;
                    background: var(--bg-primary, #1a1a1a);
                    color: var(--text-primary, #ffffff);
                    border: none;
                    outline: none;
                    padding: 12px;
                    font-family: 'Courier New', monospace;
                    font-size: 14px;
                    line-height: 1.4;
                    resize: none;
                    white-space: pre;
                    overflow-wrap: normal;
                    overflow-x: auto;
                    tab-size: 4;
                }
                
                .editor-textarea.word-wrap {
                    white-space: pre-wrap;
                    overflow-wrap: break-word;
                    overflow-x: hidden;
                }
                
                .highlight {
                    background-color: #ffff0080;
                    color: #000;
                }
                
                @media (max-width: 768px) {
                    .toolbar-group {
                        flex-wrap: wrap;
                    }
                    
                    .font-family-select,
                    .font-size-select {
                        width: 80px;
                    }
                    
                    .find-replace-content {
                        flex-direction: column;
                        align-items: stretch;
                    }
                    
                    .find-input,
                    .replace-input {
                        width: 100%;
                    }
                }
            </style>
        `;
    }

    static init(windowElement) {
        const editor = new TextEditorInstance(windowElement);
        editor.initialize();
    }
}

class TextEditorInstance {
    constructor(windowElement) {
        this.windowElement = windowElement;
        this.textarea = null;
        this.lineNumbers = null;
        this.currentFile = null;
        this.isModified = false;
        this.undoStack = [];
        this.redoStack = [];
        this.maxUndoSteps = 50;
        this.lastSavedContent = '';
        this.findMatches = [];
        this.currentMatchIndex = -1;
        this.isFullscreen = false;

        // Bind methods
        this.handleInput = this.handleInput.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.updateCursorPosition = this.updateCursorPosition.bind(this);
    }

    initialize() {
        this.textarea = this.windowElement.querySelector('.editor-textarea');
        this.lineNumbers = this.windowElement.querySelector('.line-numbers');
        this.fileInput = this.windowElement.querySelector('.file-input');

        this.setupEventListeners();
        this.updateLineNumbers();
        this.updateStatus();
        this.addToUndoStack();

        // Focus the textarea
        setTimeout(() => this.textarea.focus(), 100);
    }

    setupEventListeners() {
        // Textarea events
        this.textarea.addEventListener('input', this.handleInput);
        this.textarea.addEventListener('scroll', this.handleScroll);
        this.textarea.addEventListener('keydown', this.handleKeyDown);
        this.textarea.addEventListener('click', this.updateCursorPosition);
        this.textarea.addEventListener('keyup', this.updateCursorPosition);

        // Toolbar events
        this.windowElement.addEventListener('click', (e) => {
            const action = e.target.closest('[data-action]')?.dataset.action;
            if (action) {
                this.handleToolbarAction(action);
            }
        });

        // Font controls
        const fontFamilySelect = this.windowElement.querySelector('.font-family-select');
        const fontSizeSelect = this.windowElement.querySelector('.font-size-select');

        fontFamilySelect.addEventListener('change', (e) => {
            this.textarea.style.fontFamily = e.target.value;
        });

        fontSizeSelect.addEventListener('change', (e) => {
            this.textarea.style.fontSize = e.target.value;
            this.lineNumbers.style.fontSize = e.target.value;
            this.updateLineNumbers();
        });

        // File input
        this.fileInput.addEventListener('change', (e) => {
            this.openFile(e.target.files[0]);
        });

        // Find/Replace events
        const findInput = this.windowElement.querySelector('.find-input');
        const replaceInput = this.windowElement.querySelector('.replace-input');

        findInput.addEventListener('input', () => this.performFind());
        findInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.shiftKey ? this.findPrevious() : this.findNext();
            }
        });

        replaceInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.replaceNext();
            }
        });
    }

    handleInput() {
        this.isModified = true;
        this.updateLineNumbers();
        this.updateStatus();
        this.updateWindowTitle();

        // Add to undo stack after a delay
        clearTimeout(this.undoTimeout);
        this.undoTimeout = setTimeout(() => {
            this.addToUndoStack();
        }, 1000);
    }

    handleScroll() {
        this.lineNumbers.scrollTop = this.textarea.scrollTop;
    }

    handleKeyDown(e) {
        // Handle keyboard shortcuts
        if (e.ctrlKey || e.metaKey) {
            switch (e.key.toLowerCase()) {
                case 'n':
                    e.preventDefault();
                    this.newFile();
                    break;
                case 'o':
                    e.preventDefault();
                    this.openFileDialog();
                    break;
                case 's':
                    e.preventDefault();
                    if (e.shiftKey) {
                        this.saveAsFile();
                    } else {
                        this.saveFile();
                    }
                    break;
                case 'f':
                    e.preventDefault();
                    this.toggleFindReplace();
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
                case 'b':
                    e.preventDefault();
                    this.formatText('bold');
                    break;
                case 'i':
                    e.preventDefault();
                    this.formatText('italic');
                    break;
                case 'u':
                    e.preventDefault();
                    this.formatText('underline');
                    break;
            }
        }

        // Handle Tab key
        if (e.key === 'Tab') {
            e.preventDefault();
            this.insertText('    '); // Insert 4 spaces
        }
    }

    handleToolbarAction(action) {
        switch (action) {
            case 'new':
                this.newFile();
                break;
            case 'open':
                this.openFileDialog();
                break;
            case 'save':
                this.saveFile();
                break;
            case 'save-as':
                this.saveAsFile();
                break;
            case 'undo':
                this.undo();
                break;
            case 'redo':
                this.redo();
                break;
            case 'bold':
            case 'italic':
            case 'underline':
                this.formatText(action);
                break;
            case 'find':
                this.toggleFindReplace();
                break;
            case 'word-wrap':
                this.toggleWordWrap();
                break;
            case 'fullscreen':
                this.toggleFullscreen();
                break;
            case 'find-next':
                this.findNext();
                break;
            case 'find-prev':
                this.findPrevious();
                break;
            case 'replace':
                this.replaceNext();
                break;
            case 'replace-all':
                this.replaceAll();
                break;
            case 'close-find':
                this.closeFindReplace();
                break;
        }
    }

    newFile() {
        if (this.isModified && !confirm('You have unsaved changes. Are you sure you want to create a new file?')) {
            return;
        }

        this.textarea.value = '';
        this.currentFile = null;
        this.isModified = false;
        this.lastSavedContent = '';
        this.undoStack = [];
        this.redoStack = [];
        this.updateLineNumbers();
        this.updateStatus();
        this.updateWindowTitle();
        this.addToUndoStack();
    }

    openFileDialog() {
        this.fileInput.click();
    }

    async openFile(file) {
        if (!file) return;

        try {
            const content = await this.readFileContent(file);
            this.textarea.value = content;
            this.currentFile = file.name;
            this.isModified = false;
            this.lastSavedContent = content;
            this.undoStack = [];
            this.redoStack = [];
            this.updateLineNumbers();
            this.updateStatus();
            this.updateWindowTitle();
            this.addToUndoStack();
        } catch (error) {
            alert('Error reading file: ' + error.message);
        }
    }

    readFileContent(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = () => reject(new Error('Failed to read file'));
            reader.readAsText(file);
        });
    }

    saveFile() {
        if (this.currentFile) {
            this.downloadFile(this.textarea.value, this.currentFile);
        } else {
            this.saveAsFile();
        }
    }

    saveAsFile() {
        const filename = prompt('Enter filename:', this.currentFile || 'document.txt');
        if (filename) {
            this.downloadFile(this.textarea.value, filename);
            this.currentFile = filename;
            this.isModified = false;
            this.lastSavedContent = this.textarea.value;
            this.updateWindowTitle();
        }
    }

    downloadFile(content, filename) {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    addToUndoStack() {
        const content = this.textarea.value;
        const cursorPos = this.textarea.selectionStart;

        // Don't add if content hasn't changed
        if (this.undoStack.length > 0 && this.undoStack[this.undoStack.length - 1].content === content) {
            return;
        }

        this.undoStack.push({ content, cursorPos });

        // Limit undo stack size
        if (this.undoStack.length > this.maxUndoSteps) {
            this.undoStack.shift();
        }

        // Clear redo stack when new action is performed
        this.redoStack = [];
    }

    undo() {
        if (this.undoStack.length > 1) {
            const current = this.undoStack.pop();
            this.redoStack.push(current);

            const previous = this.undoStack[this.undoStack.length - 1];
            this.textarea.value = previous.content;
            this.textarea.setSelectionRange(previous.cursorPos, previous.cursorPos);

            this.updateLineNumbers();
            this.updateStatus();
        }
    }

    redo() {
        if (this.redoStack.length > 0) {
            const next = this.redoStack.pop();
            this.undoStack.push(next);

            this.textarea.value = next.content;
            this.textarea.setSelectionRange(next.cursorPos, next.cursorPos);

            this.updateLineNumbers();
            this.updateStatus();
        }
    }

    formatText(format) {
        const start = this.textarea.selectionStart;
        const end = this.textarea.selectionEnd;
        const selectedText = this.textarea.value.substring(start, end);

        if (selectedText) {
            let formattedText;
            switch (format) {
                case 'bold':
                    formattedText = `**${selectedText}**`;
                    break;
                case 'italic':
                    formattedText = `*${selectedText}*`;
                    break;
                case 'underline':
                    formattedText = `<u>${selectedText}</u>`;
                    break;
                default:
                    return;
            }

            this.replaceSelection(formattedText);
        }
    }

    insertText(text) {
        const start = this.textarea.selectionStart;
        const end = this.textarea.selectionEnd;
        const value = this.textarea.value;

        this.textarea.value = value.substring(0, start) + text + value.substring(end);
        this.textarea.setSelectionRange(start + text.length, start + text.length);

        this.handleInput();
    }

    replaceSelection(text) {
        const start = this.textarea.selectionStart;
        const end = this.textarea.selectionEnd;
        const value = this.textarea.value;

        this.textarea.value = value.substring(0, start) + text + value.substring(end);
        this.textarea.setSelectionRange(start + text.length, start + text.length);

        this.handleInput();
    }

    toggleFindReplace() {
        const panel = this.windowElement.querySelector('.find-replace-panel');
        const isVisible = panel.style.display !== 'none';

        if (isVisible) {
            this.closeFindReplace();
        } else {
            panel.style.display = 'block';
            const findInput = this.windowElement.querySelector('.find-input');
            findInput.focus();

            // Pre-fill with selected text
            const selectedText = this.getSelectedText();
            if (selectedText) {
                findInput.value = selectedText;
                this.performFind();
            }
        }
    }

    closeFindReplace() {
        const panel = this.windowElement.querySelector('.find-replace-panel');
        panel.style.display = 'none';
        this.clearHighlights();
        this.textarea.focus();
    }

    performFind() {
        const findInput = this.windowElement.querySelector('.find-input');
        const searchText = findInput.value;

        this.clearHighlights();
        this.findMatches = [];
        this.currentMatchIndex = -1;

        if (!searchText) return;

        const content = this.textarea.value;
        const regex = new RegExp(searchText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
        let match;

        while ((match = regex.exec(content)) !== null) {
            this.findMatches.push({
                start: match.index,
                end: match.index + match[0].length
            });
        }

        if (this.findMatches.length > 0) {
            this.currentMatchIndex = 0;
            this.highlightCurrentMatch();
        }
    }

    findNext() {
        if (this.findMatches.length === 0) return;

        this.currentMatchIndex = (this.currentMatchIndex + 1) % this.findMatches.length;
        this.highlightCurrentMatch();
    }

    findPrevious() {
        if (this.findMatches.length === 0) return;

        this.currentMatchIndex = this.currentMatchIndex <= 0 ?
            this.findMatches.length - 1 : this.currentMatchIndex - 1;
        this.highlightCurrentMatch();
    }

    highlightCurrentMatch() {
        if (this.currentMatchIndex >= 0 && this.currentMatchIndex < this.findMatches.length) {
            const match = this.findMatches[this.currentMatchIndex];
            this.textarea.setSelectionRange(match.start, match.end);
            this.textarea.focus();
        }
    }

    replaceNext() {
        if (this.currentMatchIndex >= 0 && this.currentMatchIndex < this.findMatches.length) {
            const replaceInput = this.windowElement.querySelector('.replace-input');
            const replaceText = replaceInput.value;
            const match = this.findMatches[this.currentMatchIndex];

            this.textarea.setSelectionRange(match.start, match.end);
            this.replaceSelection(replaceText);

            // Refresh find results
            setTimeout(() => this.performFind(), 10);
        }
    }

    replaceAll() {
        const findInput = this.windowElement.querySelector('.find-input');
        const replaceInput = this.windowElement.querySelector('.replace-input');
        const searchText = findInput.value;
        const replaceText = replaceInput.value;

        if (!searchText) return;

        const regex = new RegExp(searchText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
        const newContent = this.textarea.value.replace(regex, replaceText);

        this.textarea.value = newContent;
        this.handleInput();
        this.performFind();
    }

    clearHighlights() {
        // Clear any existing highlights (this is a simplified version)
        // In a more advanced implementation, you might use overlays or other techniques
    }

    getSelectedText() {
        const start = this.textarea.selectionStart;
        const end = this.textarea.selectionEnd;
        return this.textarea.value.substring(start, end);
    }

    toggleWordWrap() {
        const btn = this.windowElement.querySelector('[data-action="word-wrap"]');
        this.textarea.classList.toggle('word-wrap');
        btn.classList.toggle('active');
    }

    toggleFullscreen() {
        const container = this.windowElement.querySelector('.text-editor-container');
        const btn = this.windowElement.querySelector('[data-action="fullscreen"]');

        if (!this.isFullscreen) {
            container.style.position = 'fixed';
            container.style.top = '0';
            container.style.left = '0';
            container.style.width = '100vw';
            container.style.height = '100vh';
            container.style.zIndex = '10000';
            btn.innerHTML = '<i class="fas fa-compress"></i>';
            this.isFullscreen = true;
        } else {
            container.style.position = '';
            container.style.top = '';
            container.style.left = '';
            container.style.width = '';
            container.style.height = '';
            container.style.zIndex = '';
            btn.innerHTML = '<i class="fas fa-expand"></i>';
            this.isFullscreen = false;
        }
    }

    updateLineNumbers() {
        const lines = this.textarea.value.split('\n');
        const lineCount = lines.length;

        let lineNumbersText = '';
        for (let i = 1; i <= lineCount; i++) {
            lineNumbersText += i + '\n';
        }

        this.lineNumbers.textContent = lineNumbersText;
    }

    updateCursorPosition() {
        const textarea = this.textarea;
        const cursorPos = textarea.selectionStart;
        const textBeforeCursor = textarea.value.substring(0, cursorPos);
        const lines = textBeforeCursor.split('\n');
        const currentLine = lines.length;
        const currentColumn = lines[lines.length - 1].length + 1;

        const positionSpan = this.windowElement.querySelector('.cursor-position');
        positionSpan.textContent = `Line ${currentLine}, Column ${currentColumn}`;
    }

    updateStatus() {
        const content = this.textarea.value;
        const words = content.trim() ? content.trim().split(/\s+/).length : 0;
        const characters = content.length;

        const fileInfo = this.windowElement.querySelector('.file-info');
        const wordCount = this.windowElement.querySelector('.word-count');

        fileInfo.textContent = this.currentFile ?
            `${this.currentFile}${this.isModified ? ' *' : ''}` :
            `New Document${this.isModified ? ' *' : ''}`;

        wordCount.textContent = `Words: ${words} | Characters: ${characters}`;

        this.updateCursorPosition();
    }

    updateWindowTitle() {
        const titleElement = this.windowElement.closest('.window')?.querySelector('.window-title');
        if (titleElement) {
            const filename = this.currentFile || 'New Document';
            titleElement.textContent = `Text Editor v2.0 - ${filename}${this.isModified ? ' *' : ''}`;
        }
    }
}

// Register the TextEditor with the window manager
window.EmberFrame.registerApp('text-editor', TextEditor);
