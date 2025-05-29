// Terminal Application
class Terminal {
    static createWindow() {
        return {
            title: 'Terminal',
            width: '700px',
            height: '500px',
            content: `
                <div class="terminal">
                    <div class="terminal-header">
                        <span class="terminal-title">EmberFrame Terminal v1.0</span>
                        <div class="terminal-actions">
                            <button onclick="Terminal.clearTerminal()">Clear</button>
                        </div>
                    </div>
                    <div class="terminal-output" id="terminal-output">
                        <div class="terminal-line">Welcome to EmberFrame Terminal!</div>
                        <div class="terminal-line">Type 'help' to see available commands.</div>
                        <div class="terminal-line"></div>
                    </div>
                    <div class="terminal-input-line">
                        <span class="terminal-prompt">user@emberframe:~$ </span>
                        <input type="text" class="terminal-input" id="terminal-input" autocomplete="off" spellcheck="false">
                    </div>
                </div>
                <style>
                    .terminal {
                        height: 100%;
                        background: #1e1e1e;
                        color: #00ff00;
                        font-family: 'Courier New', monospace;
                        display: flex;
                        flex-direction: column;
                        padding: 0;
                    }
                    .terminal-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 10px 15px;
                        background: #2d2d2d;
                        border-bottom: 1px solid #333;
                    }
                    .terminal-title {
                        color: #fff;
                        font-weight: bold;
                    }
                    .terminal-actions button {
                        background: #444;
                        color: #fff;
                        border: 1px solid #666;
                        padding: 4px 8px;
                        border-radius: 3px;
                        cursor: pointer;
                        font-size: 12px;
                    }
                    .terminal-actions button:hover {
                        background: #555;
                    }
                    .terminal-output {
                        flex: 1;
                        padding: 15px;
                        overflow-y: auto;
                        line-height: 1.4;
                    }
                    .terminal-line {
                        margin-bottom: 2px;
                        white-space: pre-wrap;
                    }
                    .terminal-input-line {
                        display: flex;
                        align-items: center;
                        padding: 10px 15px;
                        background: #1e1e1e;
                        border-top: 1px solid #333;
                    }
                    .terminal-prompt {
                        color: #00ff00;
                        margin-right: 5px;
                        white-space: nowrap;
                    }
                    .terminal-input {
                        flex: 1;
                        background: transparent;
                        border: none;
                        color: #00ff00;
                        font-family: 'Courier New', monospace;
                        font-size: 14px;
                        outline: none;
                    }
                    .terminal-error {
                        color: #ff6b6b;
                    }
                    .terminal-success {
                        color: #51cf66;
                    }
                </style>
            `,
            onInit: (windowElement) => {
                Terminal.init(windowElement);
            }
        };
    }

    static init(windowElement) {
        this.currentWindow = windowElement;
        this.currentPath = '/home';
        this.commandHistory = [];
        this.historyIndex = -1;

        const input = windowElement.querySelector('#terminal-input');
        input.addEventListener('keydown', (e) => this.handleKeyDown(e));
        input.focus();
    }

    static handleKeyDown(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.executeCommand(e.target.value);
            e.target.value = '';
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            this.navigateHistory(-1, e.target);
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            this.navigateHistory(1, e.target);
        }
    }

    static navigateHistory(direction, input) {
        if (this.commandHistory.length === 0) return;

        this.historyIndex += direction;

        if (this.historyIndex < 0) {
            this.historyIndex = 0;
        } else if (this.historyIndex >= this.commandHistory.length) {
            this.historyIndex = this.commandHistory.length;
            input.value = '';
            return;
        }

        input.value = this.commandHistory[this.historyIndex] || '';
    }

    static executeCommand(command) {
        const trimmedCommand = command.trim();

        // Add to output
        this.addOutput(`user@emberframe:~$ ${command}`);

        // Add to history
        if (trimmedCommand && this.commandHistory[this.commandHistory.length - 1] !== trimmedCommand) {
            this.commandHistory.push(trimmedCommand);
        }
        this.historyIndex = this.commandHistory.length;

        // Parse and execute command
        const parts = trimmedCommand.split(' ');
        const cmd = parts[0].toLowerCase();
        const args = parts.slice(1);

        switch (cmd) {
            case '':
                break;
            case 'help':
                this.showHelp();
                break;
            case 'clear':
                this.clearTerminal();
                break;
            case 'ls':
                this.listFiles(args);
                break;
            case 'pwd':
                this.printWorkingDirectory();
                break;
            case 'cd':
                this.changeDirectory(args[0] || '/home');
                break;
            case 'echo':
                this.echo(args.join(' '));
                break;
            case 'date':
                this.showDate();
                break;
            case 'whoami':
                this.addOutput('user');
                break;
            case 'uname':
                this.addOutput('EmberFrame OS 1.0');
                break;
            case 'cat':
                this.catFile(args[0]);
                break;
            case 'mkdir':
                this.makeDirectory(args[0]);
                break;
            case 'touch':
                this.touchFile(args[0]);
                break;
            default:
                this.addOutput(`Command not found: ${cmd}`, 'terminal-error');
                this.addOutput(`Type 'help' to see available commands.`);
        }

        this.addOutput('');
    }

    static showHelp() {
        const commands = [
            'Available commands:',
            '  help      - Show this help message',
            '  clear     - Clear the terminal',
            '  ls        - List directory contents',
            '  pwd       - Print working directory',
            '  cd <dir>  - Change directory',
            '  echo <text> - Display text',
            '  date      - Show current date and time',
            '  whoami    - Show current user',
            '  uname     - Show system information',
            '  cat <file> - Display file contents',
            '  mkdir <dir> - Create directory',
            '  touch <file> - Create empty file'
        ];

        commands.forEach(cmd => this.addOutput(cmd));
    }

    static listFiles(args) {
        // Simulate file listing
        const files = [
            'Documents/',
            'Downloads/',
            'Pictures/',
            'Desktop/',
            'readme.txt',
            'notes.md'
        ];

        if (args.includes('-l')) {
            // Long format
            this.addOutput('total 6');
            files.forEach(file => {
                const isDir = file.endsWith('/');
                const perms = isDir ? 'drwxr-xr-x' : '-rw-r--r--';
                const size = isDir ? '4096' : Math.floor(Math.random() * 10000);
                const date = new Date().toLocaleDateString();
                this.addOutput(`${perms} 1 user user ${size.toString().padStart(8)} ${date} ${file}`);
            });
        } else {
            // Simple format
            const output = files.join('  ');
            this.addOutput(output);
        }
    }

    static printWorkingDirectory() {
        this.addOutput(this.currentPath);
    }

    static changeDirectory(path) {
        if (!path || path === '~') {
            this.currentPath = '/home';
        } else if (path === '..') {
            const parts = this.currentPath.split('/').filter(p => p);
            if (parts.length > 1) {
                parts.pop();
                this.currentPath = '/' + parts.join('/');
            } else {
                this.currentPath = '/';
            }
        } else if (path.startsWith('/')) {
            this.currentPath = path;
        } else {
            this.currentPath = this.currentPath === '/' ? `/${path}` : `${this.currentPath}/${path}`;
        }

        this.updatePrompt();
    }

    static echo(text) {
        this.addOutput(text);
    }

    static showDate() {
        this.addOutput(new Date().toString());
    }

    static catFile(filename) {
        if (!filename) {
            this.addOutput('cat: missing file operand', 'terminal-error');
            return;
        }

        // Simulate file contents
        const fileContents = {
            'readme.txt': 'Welcome to EmberFrame!\nThis is a web-based desktop environment.',
            'notes.md': '# My Notes\n\n- Build awesome desktop apps\n- Learn JavaScript\n- Have fun!'
        };

        if (fileContents[filename]) {
            this.addOutput(fileContents[filename]);
        } else {
            this.addOutput(`cat: ${filename}: No such file or directory`, 'terminal-error');
        }
    }

    static makeDirectory(dirname) {
        if (!dirname) {
            this.addOutput('mkdir: missing operand', 'terminal-error');
            return;
        }
        this.addOutput(`Directory '${dirname}' created`, 'terminal-success');
    }

    static touchFile(filename) {
        if (!filename) {
            this.addOutput('touch: missing file operand', 'terminal-error');
            return;
        }
        this.addOutput(`File '${filename}' created`, 'terminal-success');
    }

    static updatePrompt() {
        const prompt = this.currentWindow.querySelector('.terminal-prompt');
        prompt.textContent = `user@emberframe:${this.currentPath}$ `;
    }

    static addOutput(text, className = '') {
        const output = this.currentWindow.querySelector('#terminal-output');
        const line = document.createElement('div');
        line.className = `terminal-line ${className}`;
        line.textContent = text;
        output.appendChild(line);
        output.scrollTop = output.scrollHeight;
    }

    static clearTerminal() {
        const output = this.currentWindow.querySelector('#terminal-output');
        output.innerHTML = '';

        // Focus input
        const input = this.currentWindow.querySelector('#terminal-input');
        input.focus();
    }

    static onClose(windowElement) {
        this.currentWindow = null;
    }
}

window.Terminal = Terminal;