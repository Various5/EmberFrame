// Enhanced Terminal Application
/**
 * APP_METADATA
 * @name Terminal
 * @icon fas fa-terminal
 * @description Command line interface with Unix-like commands
 * @category Shell
 * @version 1.1.0
 * @author EmberFrame Team
 * @enabled true
 */
class Terminal {
    static createWindow() {
        return {
            title: 'Terminal',
            width: '750px',
            height: '550px',
            autoSize: false,
            content: `
                <div class="terminal">
                    <div class="terminal-header">
                        <span class="terminal-title">EmberFrame Terminal v1.0</span>
                        <div class="terminal-actions">
                            <button onclick="Terminal.clearTerminal()">Clear</button>
                            <button onclick="Terminal.toggleFullscreen()">⛶</button>
                        </div>
                    </div>
                    <div class="terminal-output" id="terminal-output">
                        <div class="terminal-line terminal-welcome">Welcome to EmberFrame Terminal!</div>
                        <div class="terminal-line terminal-info">Type 'help' to see available commands.</div>
                        <div class="terminal-line"></div>
                    </div>
                    <div class="terminal-input-line">
                        <span class="terminal-prompt" id="terminal-prompt">user@emberframe:~$ </span>
                        <input type="text" class="terminal-input" id="terminal-input" autocomplete="off" spellcheck="false">
                    </div>
                </div>
                <style>
                    .terminal {
                        height: 100%;
                        background: #1e1e1e;
                        color: #00ff00;
                        font-family: 'Courier New', Monaco, 'Lucida Console', monospace;
                        display: flex;
                        flex-direction: column;
                        padding: 0;
                        font-size: 14px;
                        line-height: 1.4;
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
                        font-size: 13px;
                    }
                    .terminal-actions {
                        display: flex;
                        gap: 8px;
                    }
                    .terminal-actions button {
                        background: #444;
                        color: #fff;
                        border: 1px solid #666;
                        padding: 4px 8px;
                        border-radius: 3px;
                        cursor: pointer;
                        font-size: 11px;
                        font-family: inherit;
                    }
                    .terminal-actions button:hover {
                        background: #555;
                    }
                    .terminal-output {
                        flex: 1;
                        padding: 15px;
                        overflow-y: auto;
                        overflow-x: hidden;
                        word-wrap: break-word;
                    }
                    .terminal-line {
                        margin-bottom: 3px;
                        white-space: pre-wrap;
                        word-break: break-word;
                    }
                    .terminal-welcome {
                        color: #00ccff;
                        font-weight: bold;
                    }
                    .terminal-info {
                        color: #ffff00;
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
                        margin-right: 8px;
                        white-space: nowrap;
                        font-weight: bold;
                    }
                    .terminal-input {
                        flex: 1;
                        background: transparent;
                        border: none;
                        color: #00ff00;
                        font-family: 'Courier New', Monaco, 'Lucida Console', monospace;
                        font-size: 14px;
                        outline: none;
                        caret-color: #00ff00;
                    }
                    .terminal-error {
                        color: #ff6b6b;
                    }
                    .terminal-success {
                        color: #51cf66;
                    }
                    .terminal-warning {
                        color: #ffd43b;
                    }
                    .terminal-command {
                        color: #74c0fc;
                    }
                    .terminal-path {
                        color: #91a7ff;
                    }
                    .terminal-file {
                        color: #8ce99a;
                    }
                    .terminal-directory {
                        color: #74c0fc;
                        font-weight: bold;
                    }
                    .terminal-executable {
                        color: #ff8cc8;
                    }
                    .terminal-hidden {
                        opacity: 0.7;
                    }
                    /* Scrollbar styling */
                    .terminal-output::-webkit-scrollbar {
                        width: 8px;
                    }
                    .terminal-output::-webkit-scrollbar-track {
                        background: #333;
                    }
                    .terminal-output::-webkit-scrollbar-thumb {
                        background: #555;
                        border-radius: 4px;
                    }
                    .terminal-output::-webkit-scrollbar-thumb:hover {
                        background: #666;
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
        this.currentPath = '';
        this.absolutePath = '/home';
        this.commandHistory = [];
        this.historyIndex = -1;
        this.isPublic = false;

        const input = windowElement.querySelector('#terminal-input');
        input.addEventListener('keydown', (e) => this.handleKeyDown(e));
        input.focus();

        // Load initial directory info
        this.updatePrompt();
    }

    static handleKeyDown(e) {
        const input = e.target;

        if (e.key === 'Enter') {
            e.preventDefault();
            this.executeCommand(input.value);
            input.value = '';
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            this.navigateHistory(-1, input);
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            this.navigateHistory(1, input);
        } else if (e.key === 'Tab') {
            e.preventDefault();
            this.handleTabCompletion(input);
        } else if (e.ctrlKey && e.key === 'c') {
            e.preventDefault();
            this.addOutput('^C');
            this.addPrompt();
        } else if (e.ctrlKey && e.key === 'l') {
            e.preventDefault();
            this.clearTerminal();
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

    static async executeCommand(command) {
        const trimmedCommand = command.trim();

        // Add command to output with prompt
        this.addOutput(`${this.getPromptText()}${command}`, 'terminal-command');

        // Add to history
        if (trimmedCommand && this.commandHistory[this.commandHistory.length - 1] !== trimmedCommand) {
            this.commandHistory.push(trimmedCommand);
            if (this.commandHistory.length > 100) {
                this.commandHistory.shift();
            }
        }
        this.historyIndex = this.commandHistory.length;

        // Parse and execute command
        const parts = trimmedCommand.split(/\s+/);
        const cmd = parts[0].toLowerCase();
        const args = parts.slice(1);

        try {
            switch (cmd) {
                case '':
                    break;
                case 'help':
                    this.showHelp();
                    break;
                case 'clear':
                case 'cls':
                    this.clearTerminal();
                    return; // Don't add new prompt
                case 'ls':
                case 'dir':
                    await this.listFiles(args);
                    break;
                case 'pwd':
                    this.printWorkingDirectory();
                    break;
                case 'cd':
                    await this.changeDirectory(args[0] || '');
                    break;
                case 'cat':
                case 'type':
                    await this.catFile(args[0]);
                    break;
                case 'mkdir':
                    await this.makeDirectory(args[0]);
                    break;
                case 'rmdir':
                    await this.removeDirectory(args[0]);
                    break;
                case 'rm':
                case 'del':
                    await this.removeFile(args[0]);
                    break;
                case 'touch':
                    await this.touchFile(args[0]);
                    break;
                case 'cp':
                case 'copy':
                    await this.copyFile(args[0], args[1]);
                    break;
                case 'mv':
                case 'move':
                    await this.moveFile(args[0], args[1]);
                    break;
                case 'find':
                    await this.findFiles(args[0]);
                    break;
                case 'grep':
                    await this.grepInFiles(args[0], args[1]);
                    break;
                case 'date':
                    this.showDate();
                    break;
                case 'whoami':
                    this.addOutput('user');
                    break;
                case 'uname':
                    this.showSystemInfo(args[0]);
                    break;
                case 'ps':
                    this.showProcesses();
                    break;
                case 'top':
                    this.showTop();
                    break;
                case 'df':
                    this.showDiskUsage();
                    break;
                case 'free':
                    this.showMemoryUsage();
                    break;
                case 'history':
                    this.showHistory();
                    break;
                case 'exit':
                case 'quit':
                    this.exitTerminal();
                    return;
                default:
                    this.addOutput(`Command not found: ${cmd}`, 'terminal-error');
                    this.addOutput(`Type 'help' to see available commands.`);
            }
        } catch (error) {
            this.addOutput(`Error executing command: ${error.message}`, 'terminal-error');
        }

        this.addPrompt();
    }

    static showHelp() {
        const commands = [
            { cmd: 'help', desc: 'Show this help message' },
            { cmd: 'clear, cls', desc: 'Clear the terminal screen' },
            { cmd: 'ls, dir [options]', desc: 'List directory contents (-l for details, -a for all files)' },
            { cmd: 'pwd', desc: 'Print current working directory' },
            { cmd: 'cd <directory>', desc: 'Change directory (.. for parent, ~ for home)' },
            { cmd: 'cat, type <file>', desc: 'Display file contents' },
            { cmd: 'mkdir <directory>', desc: 'Create directory' },
            { cmd: 'rmdir <directory>', desc: 'Remove empty directory' },
            { cmd: 'rm, del <file>', desc: 'Remove file' },
            { cmd: 'touch <file>', desc: 'Create empty file or update timestamp' },
            { cmd: 'cp, copy <src> <dest>', desc: 'Copy file' },
            { cmd: 'mv, move <src> <dest>', desc: 'Move/rename file' },
            { cmd: 'find <pattern>', desc: 'Find files matching pattern' },
            { cmd: 'grep <pattern> <file>', desc: 'Search for pattern in file' },
            { cmd: 'date', desc: 'Show current date and time' },
            { cmd: 'whoami', desc: 'Show current user' },
            { cmd: 'uname [-a]', desc: 'Show system information' },
            { cmd: 'ps', desc: 'Show running processes' },
            { cmd: 'top', desc: 'Show system resources' },
            { cmd: 'df', desc: 'Show disk usage' },
            { cmd: 'free', desc: 'Show memory usage' },
            { cmd: 'history', desc: 'Show command history' },
            { cmd: 'exit, quit', desc: 'Close terminal' }
        ];

        this.addOutput('Available commands:', 'terminal-success');
        this.addOutput('');

        const maxCmdLength = Math.max(...commands.map(c => c.cmd.length));

        commands.forEach(({ cmd, desc }) => {
            const padding = ' '.repeat(maxCmdLength - cmd.length + 2);
            this.addOutput(`  ${cmd}${padding}${desc}`);
        });

        this.addOutput('');
        this.addOutput('Keyboard shortcuts:', 'terminal-success');
        this.addOutput('  Ctrl+C        Interrupt current command');
        this.addOutput('  Ctrl+L        Clear screen');
        this.addOutput('  Tab           Auto-complete');
        this.addOutput('  ↑/↓           Navigate command history');
    }

    static async listFiles(args) {
        const showAll = args.includes('-a') || args.includes('--all');
        const longFormat = args.includes('-l') || args.includes('--long');

        try {
            const response = await fetch(`/api/files/${this.currentPath}`);
            const data = await response.json();

            if (!response.ok) {
                this.addOutput(data.error || 'Permission denied', 'terminal-error');
                return;
            }

            let files = data.files;

            if (!showAll) {
                files = files.filter(file => !file.name.startsWith('.'));
            }

            if (files.length === 0) {
                this.addOutput('Directory is empty');
                return;
            }

            if (longFormat) {
                this.addOutput('total ' + files.length);
                files.forEach(file => {
                    const permissions = file.type === 'folder' ? 'drwxr-xr-x' : '-rw-r--r--';
                    const size = file.size ? file.size.toString().padStart(8) : '    4096';
                    const date = file.modified ? new Date(file.modified).toLocaleDateString() : new Date().toLocaleDateString();
                    const name = file.type === 'folder' ?
                        `<span class="terminal-directory">${file.name}/</span>` :
                        `<span class="terminal-file">${file.name}</span>`;

                    this.addOutput(`${permissions} 1 user user ${size} ${date} ${name}`);
                });
            } else {
                // Grid layout for short format
                const folders = files.filter(f => f.type === 'folder').map(f =>
                    `<span class="terminal-directory">${f.name}/</span>`
                );
                const regularFiles = files.filter(f => f.type === 'file').map(f =>
                    `<span class="terminal-file">${f.name}</span>`
                );

                const allItems = [...folders, ...regularFiles];
                const columns = Math.max(1, Math.floor(80 / 20)); // Approximate column width

                for (let i = 0; i < allItems.length; i += columns) {
                    const row = allItems.slice(i, i + columns);
                    this.addOutput(row.join('  '));
                }
            }
        } catch (error) {
            this.addOutput(`ls: ${error.message}`, 'terminal-error');
        }
    }

    static printWorkingDirectory() {
        this.addOutput(this.absolutePath, 'terminal-path');
    }

    static async changeDirectory(path) {
        let newPath = this.currentPath;
        let newAbsolutePath = this.absolutePath;

        if (!path || path === '~') {
            newPath = '';
            newAbsolutePath = '/home';
        } else if (path === '..') {
            if (this.currentPath) {
                const parts = this.currentPath.split('/').filter(p => p);
                parts.pop();
                newPath = parts.join('/');

                const absParts = this.absolutePath.split('/').filter(p => p);
                absParts.pop();
                newAbsolutePath = '/' + (absParts.length > 0 ? absParts.join('/') : 'home');
            }
        } else if (path === '/') {
            newPath = '';
            newAbsolutePath = '/home';
        } else if (path.startsWith('/')) {
            // Absolute path (treat as relative to user home)
            newPath = path.substring(1);
            newAbsolutePath = '/home/' + newPath;
        } else {
            // Relative path
            newPath = this.currentPath ? `${this.currentPath}/${path}` : path;
            newAbsolutePath = this.absolutePath === '/home' ?
                `/home/${path}` : `${this.absolutePath}/${path}`;
        }

        // Check if directory exists
        try {
            const response = await fetch(`/api/files/${newPath}`);
            const data = await response.json();

            if (response.ok) {
                this.currentPath = newPath;
                this.absolutePath = newAbsolutePath;
                this.isPublic = newPath.startsWith('public/');
                this.updatePrompt();
            } else {
                this.addOutput(`cd: ${path}: No such file or directory`, 'terminal-error');
            }
        } catch (error) {
            this.addOutput(`cd: ${error.message}`, 'terminal-error');
        }
    }

    static async catFile(filename) {
        if (!filename) {
            this.addOutput('cat: missing file operand', 'terminal-error');
            return;
        }

        const fullPath = this.currentPath ? `${this.currentPath}/${filename}` : filename;

        try {
            const response = await fetch(`/api/file-content/${fullPath}`);
            const data = await response.json();

            if (response.ok) {
                // Split content into lines and add each line
                const lines = data.content.split('\n');
                lines.forEach(line => this.addOutput(line));
            } else {
                this.addOutput(`cat: ${filename}: ${data.error}`, 'terminal-error');
            }
        } catch (error) {
            this.addOutput(`cat: ${error.message}`, 'terminal-error');
        }
    }

    static async makeDirectory(dirname) {
        if (!dirname) {
            this.addOutput('mkdir: missing operand', 'terminal-error');
            return;
        }

        if (this.isPublic) {
            this.addOutput('mkdir: Permission denied (read-only directory)', 'terminal-error');
            return;
        }

        const fullPath = this.currentPath ? `${this.currentPath}/${dirname}` : dirname;

        try {
            const response = await fetch(`/api/files/${fullPath}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'folder' })
            });

            if (response.ok) {
                this.addOutput(`Directory '${dirname}' created`, 'terminal-success');
            } else {
                const data = await response.json();
                this.addOutput(`mkdir: ${data.error}`, 'terminal-error');
            }
        } catch (error) {
            this.addOutput(`mkdir: ${error.message}`, 'terminal-error');
        }
    }

    static async removeDirectory(dirname) {
        if (!dirname) {
            this.addOutput('rmdir: missing operand', 'terminal-error');
            return;
        }

        if (this.isPublic) {
            this.addOutput('rmdir: Permission denied (read-only directory)', 'terminal-error');
            return;
        }

        const fullPath = this.currentPath ? `${this.currentPath}/${dirname}` : dirname;

        try {
            const response = await fetch(`/api/files/${fullPath}`, { method: 'DELETE' });

            if (response.ok) {
                this.addOutput(`Directory '${dirname}' removed`, 'terminal-success');
            } else {
                const data = await response.json();
                this.addOutput(`rmdir: ${data.error}`, 'terminal-error');
            }
        } catch (error) {
            this.addOutput(`rmdir: ${error.message}`, 'terminal-error');
        }
    }

    static async removeFile(filename) {
        if (!filename) {
            this.addOutput('rm: missing file operand', 'terminal-error');
            return;
        }

        if (this.isPublic) {
            this.addOutput('rm: Permission denied (read-only directory)', 'terminal-error');
            return;
        }

        const fullPath = this.currentPath ? `${this.currentPath}/${filename}` : filename;

        try {
            const response = await fetch(`/api/files/${fullPath}`, { method: 'DELETE' });

            if (response.ok) {
                this.addOutput(`File '${filename}' removed`, 'terminal-success');
            } else {
                const data = await response.json();
                this.addOutput(`rm: ${data.error}`, 'terminal-error');
            }
        } catch (error) {
            this.addOutput(`rm: ${error.message}`, 'terminal-error');
        }
    }

    static async touchFile(filename) {
        if (!filename) {
            this.addOutput('touch: missing file operand', 'terminal-error');
            return;
        }

        if (this.isPublic) {
            this.addOutput('touch: Permission denied (read-only directory)', 'terminal-error');
            return;
        }

        const fullPath = this.currentPath ? `${this.currentPath}/${filename}` : filename;

        try {
            const response = await fetch(`/api/files/${fullPath}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'file', content: '' })
            });

            if (response.ok) {
                this.addOutput(`File '${filename}' created`, 'terminal-success');
            } else {
                const data = await response.json();
                this.addOutput(`touch: ${data.error}`, 'terminal-error');
            }
        } catch (error) {
            this.addOutput(`touch: ${error.message}`, 'terminal-error');
        }
    }

    static async copyFile(src, dest) {
        this.addOutput('cp: Copy functionality coming soon', 'terminal-warning');
    }

    static async moveFile(src, dest) {
        this.addOutput('mv: Move functionality coming soon', 'terminal-warning');
    }

    static async findFiles(pattern) {
        this.addOutput('find: Search functionality coming soon', 'terminal-warning');
    }

    static async grepInFiles(pattern, filename) {
        this.addOutput('grep: Search functionality coming soon', 'terminal-warning');
    }

    static showDate() {
        const now = new Date();
        this.addOutput(now.toString());
    }

    static showSystemInfo(option) {
        if (option === '-a' || option === '--all') {
            this.addOutput('EmberFrame OS 1.0.0');
            this.addOutput('Kernel: Web Browser Engine');
            this.addOutput('Architecture: JavaScript/HTML5');
            this.addOutput('Platform: Cross-platform');
        } else {
            this.addOutput('EmberFrame OS');
        }
    }

    static showProcesses() {
        const processes = [
            '  PID  TTY      TIME CMD',
            '    1  ?        0:01 init',
            '   42  pts/0    0:00 bash',
            '  123  pts/0    0:00 terminal',
            '  156  ?        0:02 window-manager',
            '  189  ?        0:01 desktop'
        ];

        processes.forEach(proc => this.addOutput(proc));
    }

    static showTop() {
        const topOutput = [
            'top - ' + new Date().toLocaleTimeString() + ' up 1 day, 2:34, 1 user, load average: 0.15, 0.10, 0.05',
            'Tasks: 5 total, 1 running, 4 sleeping, 0 stopped, 0 zombie',
            'CPU: 2.3%us, 1.2%sy, 0.0%ni, 96.5%id, 0.0%wa, 0.0%hi, 0.0%si, 0.0%st',
            'Memory: 1024M total, 512M used, 512M free, 64M buffers',
            'Swap: 2048M total, 0M used, 2048M free, 256M cached',
            '',
            '  PID USER      PR  NI  VIRT  RES  SHR S %CPU %MEM    TIME+  COMMAND',
            '    1 root      20   0  4096 1024  512 S  0.0  0.1   0:01.23 init',
            '   42 user      20   0  8192 2048 1024 S  1.2  0.2   0:05.67 bash',
            '  123 user      20   0 16384 4096 2048 R  2.3  0.4   0:02.34 terminal'
        ];

        topOutput.forEach(line => this.addOutput(line));
    }

    static showDiskUsage() {
        const diskInfo = [
            'Filesystem     1K-blocks    Used Available Use% Mounted on',
            '/dev/browser    10485760 5242880   5242880  50% /',
            '/dev/memory      1048576  524288    524288  50% /tmp',
            '/dev/storage    20971520 2097152  18874368  10% /home'
        ];

        diskInfo.forEach(line => this.addOutput(line));
    }

    static showMemoryUsage() {
        const memInfo = [
            '             total       used       free     shared    buffers     cached',
            'Mem:       1048576     524288     524288          0      65536     131072',
            '-/+ buffers/cache:     327680     720896',
            'Swap:      2097152          0    2097152'
        ];

        memInfo.forEach(line => this.addOutput(line));
    }

    static showHistory() {
        this.commandHistory.forEach((cmd, index) => {
            this.addOutput(`${(index + 1).toString().padStart(4)} ${cmd}`);
        });
    }

    static handleTabCompletion(input) {
        // Simple tab completion - could be enhanced
        const value = input.value;
        const lastWord = value.split(' ').pop();

        const commands = ['help', 'clear', 'ls', 'pwd', 'cd', 'cat', 'mkdir', 'rmdir', 'rm', 'touch', 'date', 'whoami', 'uname', 'ps', 'top', 'df', 'free', 'history', 'exit'];
        const matches = commands.filter(cmd => cmd.startsWith(lastWord));

        if (matches.length === 1) {
            const words = value.split(' ');
            words[words.length - 1] = matches[0];
            input.value = words.join(' ') + ' ';
        } else if (matches.length > 1) {
            this.addOutput('');
            this.addOutput(matches.join('  '));
            this.addPrompt();
        }
    }

    static updatePrompt() {
        const prompt = this.currentWindow.querySelector('#terminal-prompt');
        const pathDisplay = this.currentPath || '~';
        const readOnlyIndicator = this.isPublic ? ' [RO]' : '';
        prompt.textContent = `user@emberframe:${pathDisplay}${readOnlyIndicator}$ `;
    }

    static getPromptText() {
        const pathDisplay = this.currentPath || '~';
        const readOnlyIndicator = this.isPublic ? ' [RO]' : '';
        return `user@emberframe:${pathDisplay}${readOnlyIndicator}$ `;
    }

    static addPrompt() {
        this.addOutput('');
        // Focus input after adding prompt
        setTimeout(() => {
            const input = this.currentWindow.querySelector('#terminal-input');
            input.focus();
        }, 0);
    }

    static addOutput(text, className = '') {
        const output = this.currentWindow.querySelector('#terminal-output');
        const line = document.createElement('div');
        line.className = `terminal-line ${className}`;

        if (text.includes('<span')) {
            line.innerHTML = text;
        } else {
            line.textContent = text;
        }

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

    static toggleFullscreen() {
        if (this.currentWindow.dataset.maximized === 'true') {
            window.WindowManager.maximizeWindow(this.currentWindow);
        } else {
            window.WindowManager.maximizeWindow(this.currentWindow);
        }
    }

    static exitTerminal() {
        if (confirm('Close terminal?')) {
            window.WindowManager.closeWindow(this.currentWindow);
        }
    }

    static onClose(windowElement) {
        this.currentWindow = null;
        return true;
    }
}

window.EmberFrame.registerApp('terminal', Terminal);