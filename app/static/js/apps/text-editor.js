// Text Editor Application
class TextEditor {
    static createWindow() {
        return {
            title: 'Text Editor - New Document',
            width: '800px',
            height: '600px',
            content: `
                <div class="text-editor">
                    <div class="text-editor-toolbar">
                        <div class="toolbar-group">
                            <button onclick="TextEditor.newFile()">📄 New</button>
                            <button onclick="TextEditor.openFile()">📁 Open</button>
                            <button onclick="TextEditor.saveFile()">💾 Save</button>
                            <button onclick="TextEditor.saveAsFile()">💾 Save As</button>
                        </div>
                        <div class="toolbar-group">
                            <button onclick="TextEditor.undo()">↶ Undo</button>
                            <button onclick="TextEditor.redo()">↷ Redo</button>
                        </div>
                        <div class="toolbar-group">
                            <button onclick="TextEditor.toggleBold()"><b>B</b></button>
                            <button onclick="TextEditor.toggleItalic()"><i>I</i></button>
                            <button onclick="TextEditor.toggleUnderline()"><u>U</u></button>
                        </div>
                        <div class="toolbar-group">
                            <select onchange="TextEditor.changeFontSize(this.value)">
                                <option value="12">12px</option>
                                <option value="14" selected>14px</option>
                                <option value="16">16px</option>
                                <option value="18">18px</option>
                                <option value="20">20px</option>
                            </select>
                        </div>
                    </div>
                    <div class="text-editor-content">
                        <textarea id="text-editor-textarea" placeholder="Start typing your document here..."></textarea>
                    </div>
                    <div class="text-editor-status">
                        <span id="editor-status">Ready</span>
                        <span id="word-count">0 words, 0 characters</span>
                    </div>
                </div>
                <style>
                    .text-editor {
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                    }
                    .text-editor-toolbar {
                        display: flex;
                        gap: 15px;
                        padding: 10px;
                        background: #f8f9fa;
                        border-bottom: 1px solid #ddd;
                        flex-wrap: wrap;
                    }
                    .toolbar-group {
                        display: flex;
                        gap: 5px;
                        align-items: center;
                    }
                    .text-editor-toolbar button {
                        padding: 6px 12px;
                        border: 1px solid #ccc;
                        background: white;
                        border-radius: 4px;
                        cursor: pointer;
                        transition: background-color 0.2s;
                    }
                    .text-editor-toolbar button:hover {
                        background: #e9ecef;
                    }
                    .text-editor-toolbar button.active {
                        background: #007bff;
                        color: white;
                    }
                    .text-editor-toolbar select {
                        padding: 6px;
                        border: 1px solid #ccc;
                        border-radius: 4px;
                    }
                    .text-editor-content {
                        flex: 1;
                        display: flex;
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
                    }
                    .text-editor-status {
                        display: flex;
                        justify-content: space-between;
                        padding: 8px 15px;
                        background: #f8f9fa;
                        border-top: 1px solid #ddd;
                        font-size: 12px;
                        color: #666;
                    }
                    .file-dialog {
                        position: fixed;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        background: white;
                        border: 1px solid #ccc;
                        border-radius: 8px;
                        padding: 20px;
                        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                        z-index: 10000;
                    }
                    .file-dialog h3 {
                        margin-bottom: 15px;
                    }
                    .file-dialog input {
                        width: 300px;
                        padding: 8px;
                        margin-bottom: 15px;
                        border: 1px solid #ccc;
                        border-radius: 4px;
                    }
                    .file-dialog button {
                        margin-right: 10px;
                        padding: 8px 16px;
                        border: 1px solid #ccc;
                        border-radius: 4px;
                        cursor: pointer;
                    }
                </style>
            `,
            onInit: (windowElement) => {
                TextEditor.init(windowElement);
            }
        };
    }

    static init(windowElement) {
        this.currentWindow = windowElement;
        this.currentFile = null;
        this.isModified = false;
        this.undoStack = [];
        this.redoStack = [];

        this.textarea = windowElement.querySelector('#text-editor-textarea');
        this.statusElement = windowElement.querySelector('#editor-status');
        this.wordCountElement = windowElement.querySelector('#word-count');

        // Setup event listeners
        this.textarea.addEventListener('input', () => {
            this.handleTextChange();
        });

        this.textarea.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case 's':
                        e.preventDefault();
                        this.saveFile();
                        break;
                    case 'z':
                        e.preventDefault();
                        if (e.shiftKey) {
                            this.redo();
                        } else {
                            this.undo();
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
                }
            }
        });

        // Focus textarea
        this.textarea.focus();

        // Initialize status
        this.updateStatus();
        this.updateWordCount();
    }

    static handleTextChange() {
        if (!this.isModified) {
            this.isModified = true;
            this.updateTitle();
        }
        this.updateWordCount();
        this.updateStatus('Modified');

        // Add to undo stack
        this.addToUndoStack();
    }

    static addToUndoStack() {
        // Simple undo implementation
        if (this.undoStack.length > 50) {
            this.undoStack.shift();
        }
        this.undoStack.push(this.textarea.value);
        this.redoStack = []; // Clear redo stack when new changes are made
    }

    static updateTitle() {
        const title = this.currentWindow.querySelector('.window-title');
        const fileName = this.currentFile || 'New Document';
        const modified = this.isModified ? ' *' : '';
        title.textContent = `Text Editor - ${fileName}${modified}`;
    }

    static updateStatus(status = 'Ready') {
        this.statusElement.textContent = status;
    }

    static updateWordCount() {
        const text = this.textarea.value;
        const words = text.trim() ? text.trim().split(/\s+/).length : 0;
        const chars = text.length;
        this.wordCountElement.textContent = `${words} words, ${chars} characters`;
    }

    static newFile() {
        if (this.isModified) {
            if (!confirm('You have unsaved changes. Are you sure you want to create a new file?')) {
                return;
            }
        }

        this.textarea.value = '';
        this.currentFile = null;
        this.isModified = false;
        this.undoStack = [];
        this.redoStack = [];
        this.updateTitle();
        this.updateStatus('New file created');
        this.updateWordCount();
        this.textarea.focus();
    }

    static openFile() {
        // Simulate file opening with a dialog
        const fileName = prompt('Enter file name to open:');
        if (!fileName) return;

        // Simulate file contents
        const fileContents = {
            'readme.txt': 'Welcome to EmberFrame!\n\nThis is a web-based desktop environment built with modern web technologies.',
            'notes.md': '# My Notes\n\n## Todo\n- Build awesome desktop apps\n- Learn JavaScript\n- Have fun!\n\n## Ideas\n- Add more applications\n- Implement file system\n- Add themes',
            'example.js': '// Example JavaScript code\nfunction greet(name) {\n    return `Hello, ${name}!`;\n}\n\nconsole.log(greet("World"));'
        };

        if (fileContents[fileName]) {
            this.textarea.value = fileContents[fileName];
            this.currentFile = fileName;
            this.isModified = false;
            this.updateTitle();
            this.updateStatus(`Opened ${fileName}`);
            this.updateWordCount();
        } else {
            this.updateStatus(`File ${fileName} not found`, 'error');
        }
    }

    static saveFile() {
        if (!this.currentFile) {
            this.saveAsFile();
            return;
        }

        // Simulate saving
        this.isModified = false;
        this.updateTitle();
        this.updateStatus(`Saved ${this.currentFile}`);
    }

    static saveAsFile() {
        const fileName = prompt('Enter file name to save as:', this.currentFile || 'document.txt');
        if (!fileName) return;

        this.currentFile = fileName;
        this.isModified = false;
        this.updateTitle();
        this.updateStatus(`Saved as ${fileName}`);
    }

    static undo() {
        if (this.undoStack.length > 1) {
            const current = this.undoStack.pop();
            this.redoStack.push(current);
            this.textarea.value = this.undoStack[this.undoStack.length - 1] || '';
            this.updateStatus('Undo');
            this.updateWordCount();
        }
    }

    static redo() {
        if (this.redoStack.length > 0) {
            const content = this.redoStack.pop();
            this.undoStack.push(content);
            this.textarea.value = content;
            this.updateStatus('Redo');
            this.updateWordCount();
        }
    }

    static toggleBold() {
        this.formatText('bold');
    }

    static toggleItalic() {
        this.formatText('italic');
    }

    static toggleUnderline() {
        this.formatText('underline');
    }

    static formatText(command) {
        // Simple formatting by adding markdown-style formatting
        const start = this.textarea.selectionStart;
        const end = this.textarea.selectionEnd;
        const selectedText = this.textarea.value.substring(start, end);

        if (selectedText) {
            let formattedText = selectedText;
            switch(command) {
                case 'bold':
                    formattedText = `**${selectedText}**`;
                    break;
                case 'italic':
                    formattedText = `*${selectedText}*`;
                    break;
                case 'underline':
                    formattedText = `_${selectedText}_`;
                    break;
            }

            this.textarea.setRangeText(formattedText, start, end);
            this.handleTextChange();
        }
    }

    static changeFontSize(size) {
        this.textarea.style.fontSize = size + 'px';
    }

    static onClose(windowElement) {
        if (this.isModified) {
            return confirm('You have unsaved changes. Are you sure you want to close?');
        }
        this.currentWindow = null;
        return true;
    }
}

window.TextEditor = TextEditor;