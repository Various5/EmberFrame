// Enhanced File Manager with Real File System
class FileManager {
    static createWindow(startPath = '') {
        return {
            title: startPath.startsWith('public/') ? 'File Manager - Public' : 'File Manager',
            width: '700px',
            height: '500px',
            autoSize: false,
            content: `
                <div class="file-manager">
                    <div class="file-manager-toolbar">
                        <button onclick="FileManager.goBack()" id="fm-back-btn" disabled>← Back</button>
                        <button onclick="FileManager.goHome()" id="fm-home-btn">🏠 Home</button>
                        <button onclick="FileManager.goPublic()" id="fm-public-btn">🌐 Public</button>
                        <span class="file-path" id="fm-current-path">/</span>
                        <div class="toolbar-actions">
                            <button onclick="FileManager.createFolder()" id="fm-new-folder-btn" title="New Folder">📁+</button>
                            <button onclick="FileManager.uploadFile()" id="fm-upload-btn" title="Upload File">⬆️</button>
                            <button onclick="FileManager.refresh()" title="Refresh">🔄</button>
                        </div>
                    </div>
                    <div class="file-manager-content">
                        <div class="file-list" id="fm-file-list">
                            <div class="loading">
                                <div class="spinner"></div>
                                Loading files...
                            </div>
                        </div>
                    </div>
                    <div class="file-manager-status">
                        <span id="fm-file-count">0 items</span>
                        <span id="fm-selection-info"></span>
                    </div>
                </div>
                
                <!-- Hidden file input for uploads -->
                <input type="file" id="fm-file-input" multiple style="display: none;">
                
                <style>
                    .file-manager {
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                    }
                    .file-manager-toolbar {
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        padding: 12px;
                        border-bottom: 1px solid #ddd;
                        background: #f8f9fa;
                    }
                    .file-path {
                        flex: 1;
                        padding: 6px 10px;
                        background: white;
                        border: 1px solid #ddd;
                        border-radius: 4px;
                        font-family: monospace;
                        font-size: 12px;
                        margin: 0 10px;
                    }
                    .toolbar-actions {
                        display: flex;
                        gap: 5px;
                    }
                    .toolbar-actions button {
                        padding: 6px 10px;
                        font-size: 12px;
                        border-radius: 4px;
                    }
                    .file-manager-content {
                        flex: 1;
                        overflow: hidden;
                        position: relative;
                    }
                    .file-list {
                        height: 100%;
                        overflow-y: auto;
                        padding: 15px;
                        display: grid;
                        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
                        gap: 15px;
                        align-content: start;
                    }
                    .file-item {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        padding: 12px 8px;
                        border-radius: 8px;
                        cursor: pointer;
                        transition: all 0.2s;
                        border: 2px solid transparent;
                        position: relative;
                    }
                    .file-item:hover {
                        background-color: #f0f8ff;
                    }
                    .file-item.selected {
                        background-color: #e3f2fd;
                        border-color: #2196f3;
                    }
                    .file-item.dragging {
                        opacity: 0.5;
                        transform: rotate(5deg);
                    }
                    .file-icon {
                        font-size: 36px;
                        margin-bottom: 8px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 48px;
                        height: 48px;
                    }
                    .file-name {
                        font-size: 12px;
                        text-align: center;
                        word-break: break-word;
                        line-height: 1.3;
                        max-width: 100%;
                        font-weight: 500;
                    }
                    .file-size {
                        font-size: 10px;
                        color: #666;
                        margin-top: 2px;
                    }
                    .file-manager-status {
                        border-top: 1px solid #ddd;
                        padding: 8px 15px;
                        background: #f8f9fa;
                        font-size: 12px;
                        color: #666;
                        display: flex;
                        justify-content: space-between;
                    }
                    .drop-zone {
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: rgba(33, 150, 243, 0.1);
                        border: 2px dashed #2196f3;
                        display: none;
                        align-items: center;
                        justify-content: center;
                        font-size: 18px;
                        color: #2196f3;
                        z-index: 10;
                    }
                    .drop-zone.active {
                        display: flex;
                    }
                    .context-menu-file {
                        position: fixed;
                        background: white;
                        border: 1px solid #ccc;
                        border-radius: 6px;
                        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                        padding: 5px 0;
                        min-width: 150px;
                        display: none;
                        z-index: 1000;
                    }
                    .context-menu-file .menu-item {
                        padding: 8px 15px;
                        cursor: pointer;
                        font-size: 13px;
                        transition: background-color 0.2s;
                    }
                    .context-menu-file .menu-item:hover {
                        background: #f0f0f0;
                    }
                    .context-menu-file .menu-separator {
                        height: 1px;
                        background: #eee;
                        margin: 5px 0;
                    }
                </style>
            `,
            onInit: (windowElement) => {
                FileManager.init(windowElement, startPath);
            }
        };
    }

    static init(windowElement, startPath = '') {
        this.currentWindow = windowElement;
        this.currentPath = startPath;
        this.pathHistory = [];
        this.selectedFiles = new Set();
        this.isWritable = true;

        this.setupEventListeners();
        this.loadDirectory(this.currentPath);
    }

    static setupEventListeners() {
        const fileList = this.currentWindow.querySelector('#fm-file-list');
        const fileInput = this.currentWindow.querySelector('#fm-file-input');

        // File selection
        fileList.addEventListener('click', (e) => {
            const fileItem = e.target.closest('.file-item');
            if (fileItem) {
                this.selectFile(fileItem, e.ctrlKey || e.metaKey);
            } else {
                this.clearSelection();
            }
        });

        // Double-click to open
        fileList.addEventListener('dblclick', (e) => {
            const fileItem = e.target.closest('.file-item');
            if (fileItem) {
                this.openFile(fileItem.dataset.filename, fileItem.dataset.type);
            }
        });

        // Context menu
        fileList.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            const fileItem = e.target.closest('.file-item');
            this.showContextMenu(e.clientX, e.clientY, fileItem);
        });

        // Drag and drop
        this.setupDragAndDrop();

        // File upload
        fileInput.addEventListener('change', (e) => {
            this.handleFileUpload(e.target.files);
            e.target.value = ''; // Reset input
        });

        // Keyboard shortcuts
        this.currentWindow.addEventListener('keydown', (e) => {
            if (e.key === 'Delete' && this.selectedFiles.size > 0) {
                this.deleteSelected();
            } else if (e.key === 'F5') {
                e.preventDefault();
                this.refresh();
            } else if (e.ctrlKey && e.key === 'a') {
                e.preventDefault();
                this.selectAll();
            }
        });
    }

    static setupDragAndDrop() {
        const content = this.currentWindow.querySelector('.file-manager-content');
        const dropZone = document.createElement('div');
        dropZone.className = 'drop-zone';
        dropZone.innerHTML = '📁 Drop files here to upload';
        content.appendChild(dropZone);

        let dragCounter = 0;

        content.addEventListener('dragenter', (e) => {
            e.preventDefault();
            dragCounter++;
            if (this.isWritable) {
                dropZone.classList.add('active');
            }
        });

        content.addEventListener('dragleave', (e) => {
            e.preventDefault();
            dragCounter--;
            if (dragCounter === 0) {
                dropZone.classList.remove('active');
            }
        });

        content.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        content.addEventListener('drop', (e) => {
            e.preventDefault();
            dragCounter = 0;
            dropZone.classList.remove('active');

            if (this.isWritable && e.dataTransfer.files.length > 0) {
                this.handleFileUpload(e.dataTransfer.files);
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
                this.isWritable = data.writable;
                this.updateUI();
                this.renderFiles(data.files);
                this.updateStatus(data.files.length);
            } else {
                this.showError(data.error || 'Failed to load directory');
                Notification.error(data.error || 'Failed to load directory');
            }
        } catch (error) {
            this.showError('Network error: ' + error.message);
            Notification.error('Network error: ' + error.message);
        }
    }

    static renderFiles(files) {
        const fileList = this.currentWindow.querySelector('#fm-file-list');

        if (files.length === 0) {
            fileList.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #666;">This folder is empty</div>';
            return;
        }

        fileList.innerHTML = files.map(file => `
            <div class="file-item" data-filename="${file.name}" data-type="${file.type}" draggable="true">
                <div class="file-icon">${file.icon}</div>
                <div class="file-name">${file.name}</div>
                ${file.size ? `<div class="file-size">${this.formatFileSize(file.size)}</div>` : ''}
            </div>
        `).join('');

        this.selectedFiles.clear();
    }

    static updateUI() {
        const pathElement = this.currentWindow.querySelector('#fm-current-path');
        const backBtn = this.currentWindow.querySelector('#fm-back-btn');
        const newFolderBtn = this.currentWindow.querySelector('#fm-new-folder-btn');
        const uploadBtn = this.currentWindow.querySelector('#fm-upload-btn');

        pathElement.textContent = '/' + this.currentPath;
        backBtn.disabled = this.pathHistory.length === 0;

        // Disable write operations for public directory
        newFolderBtn.disabled = !this.isWritable;
        uploadBtn.disabled = !this.isWritable;

        // Update window title
        const title = this.currentWindow.querySelector('.window-title');
        title.textContent = this.currentPath.startsWith('public/') ?
            'File Manager - Public' : 'File Manager';
    }

    static selectFile(fileItem, multiSelect = false) {
        if (!multiSelect) {
            this.clearSelection();
        }

        const filename = fileItem.dataset.filename;

        if (this.selectedFiles.has(filename)) {
            this.selectedFiles.delete(filename);
            fileItem.classList.remove('selected');
        } else {
            this.selectedFiles.add(filename);
            fileItem.classList.add('selected');
        }

        this.updateSelectionInfo();
    }

    static clearSelection() {
        this.currentWindow.querySelectorAll('.file-item.selected').forEach(item => {
            item.classList.remove('selected');
        });
        this.selectedFiles.clear();
        this.updateSelectionInfo();
    }

    static selectAll() {
        this.currentWindow.querySelectorAll('.file-item').forEach(item => {
            item.classList.add('selected');
            this.selectedFiles.add(item.dataset.filename);
        });
        this.updateSelectionInfo();
    }

    static updateSelectionInfo() {
        const selectionInfo = this.currentWindow.querySelector('#fm-selection-info');
        if (this.selectedFiles.size > 0) {
            selectionInfo.textContent = `${this.selectedFiles.size} selected`;
        } else {
            selectionInfo.textContent = '';
        }
    }

    static updateStatus(fileCount) {
        const fileCountElement = this.currentWindow.querySelector('#fm-file-count');
        fileCountElement.textContent = `${fileCount} items`;
    }

    static async openFile(filename, type) {
        if (type === 'folder') {
            await this.navigateToFolder(filename);
        } else {
            // Only open text editor for certain file types
            const ext = filename.split('.').pop().toLowerCase();
            const textExtensions = ['txt', 'md', 'js', 'html', 'css', 'json', 'py', 'xml'];

            if (textExtensions.includes(ext)) {
                // Check if this is in a read-only directory
                if (!this.isWritable && !confirm(`Open "${filename}" in read-only mode?`)) {
                    return;
                }

                // Open in text editor
                if (window.WindowManager && window.TextEditor) {
                    const textEditorWindow = window.WindowManager.openApp('text-editor');

                    // Load file content after a delay
                    setTimeout(() => {
                        const fullPath = this.currentPath ? `${this.currentPath}/${filename}` : filename;
                        window.TextEditor.loadFile(fullPath);
                    }, 200);
                }
            } else {
                Notification.info(`Cannot open ${filename}. No associated application.`);
            }
        }
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

    static async goPublic() {
        this.pathHistory = [];
        await this.loadDirectory('public/');
    }

    static async refresh() {
        await this.loadDirectory(this.currentPath);
        Notification.success('Directory refreshed');
    }

    static async createFolder() {
        if (!this.isWritable) {
            Notification.error('Cannot create folders in read-only directory');
            return;
        }

        const folderName = prompt('Enter folder name:');
        if (!folderName || !folderName.trim()) return;

        const sanitizedName = folderName.trim().replace(/[^a-zA-Z0-9\-_\s]/g, '');
        if (!sanitizedName) {
            Notification.error('Invalid folder name');
            return;
        }

        try {
            const fullPath = this.currentPath ? `${this.currentPath}/${sanitizedName}` : sanitizedName;
            const response = await fetch(`/api/files/${fullPath}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'folder' })
            });

            if (response.ok) {
                Notification.success(`Folder "${sanitizedName}" created`);
                await this.refresh();
            } else {
                const data = await response.json();
                Notification.error(data.error || 'Failed to create folder');
            }
        } catch (error) {
            Notification.error('Network error: ' + error.message);
        }
    }

    static uploadFile() {
        if (!this.isWritable) {
            Notification.error('Cannot upload files to read-only directory');
            return;
        }

        const fileInput = this.currentWindow.querySelector('#fm-file-input');
        fileInput.click();
    }

    static async handleFileUpload(files) {
        if (!this.isWritable) {
            Notification.error('Cannot upload files to read-only directory');
            return;
        }

        const uploadPromises = Array.from(files).map(file => this.uploadSingleFile(file));

        try {
            await Promise.all(uploadPromises);
            Notification.success(`${files.length} file(s) uploaded successfully`);
            await this.refresh();
        } catch (error) {
            Notification.error('Some files failed to upload');
        }
    }

    static async uploadSingleFile(file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('path', this.currentPath);

        const response = await fetch('/api/upload-file', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Failed to upload ${file.name}`);
        }
    }

    static async deleteSelected() {
        if (this.selectedFiles.size === 0 || !this.isWritable) return;

        const fileList = Array.from(this.selectedFiles);
        const confirmMessage = fileList.length === 1 ?
            `Delete "${fileList[0]}"?` :
            `Delete ${fileList.length} selected items?`;

        if (!confirm(confirmMessage)) return;

        const deletePromises = fileList.map(filename => this.deleteFile(filename));

        try {
            await Promise.all(deletePromises);
            Notification.success(`${fileList.length} item(s) deleted`);
            await this.refresh();
        } catch (error) {
            Notification.error('Some items failed to delete');
        }
    }

    static async deleteFile(filename) {
        const fullPath = this.currentPath ? `${this.currentPath}/${filename}` : filename;
        const response = await fetch(`/api/files/${fullPath}`, { method: 'DELETE' });

        if (!response.ok) {
            throw new Error(`Failed to delete ${filename}`);
        }
    }

    static showContextMenu(x, y, fileItem) {
        // Remove existing context menu
        const existingMenu = document.querySelector('.context-menu-file');
        if (existingMenu) {
            existingMenu.remove();
        }

        const menu = document.createElement('div');
        menu.className = 'context-menu-file';
        menu.style.left = x + 'px';
        menu.style.top = y + 'px';

        let menuItems = [];

        if (fileItem) {
            const filename = fileItem.dataset.filename;
            const isFolder = fileItem.dataset.type === 'folder';

            menuItems.push(`<div class="menu-item" onclick="FileManager.openFile('${filename}', '${fileItem.dataset.type}')">${isFolder ? 'Open' : 'Edit'}</div>`);

            if (this.isWritable) {
                menuItems.push('<div class="menu-separator"></div>');
                menuItems.push(`<div class="menu-item" onclick="FileManager.renameFile('${filename}')">Rename</div>`);
                menuItems.push(`<div class="menu-item" onclick="FileManager.deleteFile('${filename}'); FileManager.refresh()">Delete</div>`);
            }
        } else {
            if (this.isWritable) {
                menuItems.push('<div class="menu-item" onclick="FileManager.createFolder()">New Folder</div>');
                menuItems.push('<div class="menu-item" onclick="FileManager.uploadFile()">Upload File</div>');
                menuItems.push('<div class="menu-separator"></div>');
            }
            menuItems.push('<div class="menu-item" onclick="FileManager.refresh()">Refresh</div>');
        }

        menu.innerHTML = menuItems.join('');
        document.body.appendChild(menu);
        menu.style.display = 'block';

        // Close menu when clicking elsewhere
        setTimeout(() => {
            document.addEventListener('click', function closeMenu() {
                menu.remove();
                document.removeEventListener('click', closeMenu);
            });
        }, 0);
    }

    static async renameFile(oldName) {
        const newName = prompt('Enter new name:', oldName);
        if (!newName || newName === oldName) return;

        // TODO: Implement rename API endpoint
        Notification.info('Rename functionality coming soon');
    }

    static formatFileSize(bytes) {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    }

    static showLoading() {
        const fileList = this.currentWindow.querySelector('#fm-file-list');
        fileList.innerHTML = '<div class="loading" style="grid-column: 1/-1;"><div class="spinner"></div>Loading files...</div>';
    }

    static showError(message) {
        const fileList = this.currentWindow.querySelector('#fm-file-list');
        fileList.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #dc3545;">${message}</div>`;
    }

    static onClose(windowElement) {
        this.currentWindow = null;
        return true;
    }
}

window.FileManager = FileManager;