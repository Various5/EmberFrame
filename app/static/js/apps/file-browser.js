// File Browser Component for Open/Save Dialogs
class FileBrowser {
    static init() {
        this.dialog = document.getElementById('file-browser-dialog');
        this.list = document.getElementById('file-browser-list');
        this.pathElement = document.getElementById('fb-current-path');
        this.filenameInput = document.getElementById('fb-filename');
        this.actionButton = document.getElementById('fb-action-btn');
        this.backButton = document.getElementById('fb-back-btn');

        this.currentPath = '';
        this.pathHistory = [];
        this.mode = 'open'; // 'open' or 'save'
        this.callback = null;
        this.fileFilter = null;
    }

    static async open(options = {}) {
        this.init();

        this.mode = options.mode || 'open';
        this.callback = options.callback;
        this.fileFilter = options.fileFilter;
        this.currentPath = options.startPath || '';

        // Update dialog appearance based on mode
        const title = this.dialog.querySelector('.file-browser-title');
        title.textContent = this.mode === 'save' ? 'Save File' : 'Open File';

        this.actionButton.textContent = this.mode === 'save' ? 'Save' : 'Open';
        this.filenameInput.style.display = this.mode === 'save' ? 'block' : 'none';

        if (options.filename) {
            this.filenameInput.value = options.filename;
        }

        // Show dialog
        this.dialog.classList.add('active');

        // Load initial directory
        await this.loadDirectory(this.currentPath);

        // Setup event listeners
        this.setupEventListeners();
    }

    static setupEventListeners() {
        // Action button click
        this.actionButton.onclick = () => {
            if (this.mode === 'save') {
                this.handleSave();
            } else {
                this.handleOpen();
            }
        };

        // Double-click to open files/folders
        this.list.addEventListener('dblclick', (e) => {
            const item = e.target.closest('.file-browser-item');
            if (item) {
                const filename = item.dataset.filename;
                const isFolder = item.dataset.type === 'folder';

                if (isFolder) {
                    this.navigateToFolder(filename);
                } else if (this.mode === 'open') {
                    this.selectFile(filename);
                    this.handleOpen();
                }
            }
        });

        // Single click to select
        this.list.addEventListener('click', (e) => {
            const item = e.target.closest('.file-browser-item');
            if (item) {
                this.selectItem(item);
            }
        });

        // Enter key in filename input
        this.filenameInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                if (this.mode === 'save') {
                    this.handleSave();
                } else {
                    this.handleOpen();
                }
            }
        });
    }

    static async loadDirectory(path) {
        this.showLoading();

        try {
            const response = await fetch(`/api/files/${path}`);
            const data = await response.json();

            if (response.ok) {
                this.currentPath = path;
                this.pathElement.textContent = '/' + path;
                this.renderFiles(data.files);
                this.updateBackButton();
            } else {
                this.showError(data.error || 'Failed to load directory');
            }
        } catch (error) {
            this.showError('Network error: ' + error.message);
        }
    }

    static renderFiles(files) {
        this.list.innerHTML = '';

        // Filter files if filter is provided
        const filteredFiles = this.fileFilter ?
            files.filter(file => file.type === 'folder' || this.fileFilter(file)) :
            files;

        if (filteredFiles.length === 0) {
            this.list.innerHTML = '<div style="padding: 20px; text-align: center; color: #666;">No files found</div>';
            return;
        }

        filteredFiles.forEach(file => {
            const item = document.createElement('div');
            item.className = 'file-browser-item';
            item.dataset.filename = file.name;
            item.dataset.type = file.type;

            const sizeText = file.size ? this.formatFileSize(file.size) : '';

            item.innerHTML = `
                <div class="file-browser-item-icon">${file.icon}</div>
                <div class="file-browser-item-name">${file.name}</div>
                ${sizeText ? `<div class="file-browser-item-size">${sizeText}</div>` : ''}
            `;

            this.list.appendChild(item);
        });
    }

    static selectItem(item) {
        // Remove previous selection
        this.list.querySelectorAll('.file-browser-item').forEach(i =>
            i.classList.remove('selected')
        );

        // Select current item
        item.classList.add('selected');

        // Update filename input for files
        if (item.dataset.type === 'file' && this.mode === 'open') {
            this.filenameInput.value = item.dataset.filename;
        }
    }

    static selectFile(filename) {
        this.filenameInput.value = filename;
    }

    static async navigateToFolder(folderName) {
        const newPath = this.currentPath ? `${this.currentPath}/${folderName}` : folderName;
        this.pathHistory.push(this.currentPath);
        await this.loadDirectory(newPath);
    }

    static async goBack() {
        if (this.pathHistory.length > 0) {
            const previousPath = this.pathHistory.pop();
            await this.loadDirectory(previousPath);
        }
    }

    static async goHome() {
        this.pathHistory = [];
        await this.loadDirectory('');
    }

    static updateBackButton() {
        this.backButton.disabled = this.pathHistory.length === 0;
    }

    static handleOpen() {
        const filename = this.filenameInput.value.trim();
        if (!filename) {
            this.showError('Please select a file');
            return;
        }

        const fullPath = this.currentPath ? `${this.currentPath}/${filename}` : filename;

        if (this.callback) {
            this.callback({
                action: 'open',
                path: fullPath,
                filename: filename
            });
        }

        this.close();
    }

    static handleSave() {
        const filename = this.filenameInput.value.trim();
        if (!filename) {
            this.showError('Please enter a filename');
            return;
        }

        const fullPath = this.currentPath ? `${this.currentPath}/${filename}` : filename;

        if (this.callback) {
            this.callback({
                action: 'save',
                path: fullPath,
                filename: filename
            });
        }

        this.close();
    }

    static close() {
        this.dialog.classList.remove('active');
        this.callback = null;
        this.fileFilter = null;
    }

    static showLoading() {
        this.list.innerHTML = '<div class="loading"><div class="spinner"></div>Loading...</div>';
    }

    static showError(message) {
        this.list.innerHTML = `<div style="padding: 20px; text-align: center; color: #dc3545;">${message}</div>`;
    }

    static formatFileSize(bytes) {
        if (bytes === 0) return '0 B';

        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    }

    // Utility method to show file browser for specific file types
    static openForTextFiles(callback, mode = 'open', filename = '') {
        this.open({
            mode: mode,
            callback: callback,
            filename: filename,
            fileFilter: (file) => {
                const textExtensions = ['.txt', '.md', '.js', '.html', '.css', '.json', '.py', '.xml'];
                return textExtensions.some(ext => file.name.toLowerCase().endsWith(ext));
            }
        });
    }

    static openForImages(callback, mode = 'open', filename = '') {
        this.open({
            mode: mode,
            callback: callback,
            filename: filename,
            fileFilter: (file) => {
                const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.bmp'];
                return imageExtensions.some(ext => file.name.toLowerCase().endsWith(ext));
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.FileBrowser = FileBrowser;
});