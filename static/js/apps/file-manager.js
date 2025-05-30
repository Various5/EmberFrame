// Enhanced File Manager with Real File System Integration
class FileManager {
    static createWindow(startPath = '') {
        return {
            title: startPath.startsWith('public/') ? 'File Manager - Public' : 'File Manager',
            width: '750px',
            height: '550px',
            autoSize: false,
            content: `
                <div class="file-manager">
                    <div class="file-manager-toolbar">
                        <button onclick="FileManager.goBack()" id="fm-back-btn" disabled title="Go Back">
                            <i class="fas fa-arrow-left"></i>
                        </button>
                        <button onclick="FileManager.goHome()" id="fm-home-btn" title="Home Directory">
                            <i class="fas fa-home"></i>
                        </button>
                        <button onclick="FileManager.goPublic()" id="fm-public-btn" title="Public Files">
                            <i class="fas fa-globe"></i>
                        </button>
                        <span class="file-path" id="fm-current-path">/</span>
                        <div class="toolbar-actions">
                            <button onclick="FileManager.createFolder()" id="fm-new-folder-btn" title="New Folder">
                                <i class="fas fa-folder-plus"></i>
                            </button>
                            <button onclick="FileManager.uploadFile()" id="fm-upload-btn" title="Upload File">
                                <i class="fas fa-upload"></i>
                            </button>
                            <button onclick="FileManager.refresh()" title="Refresh">
                                <i class="fas fa-sync-alt"></i>
                            </button>
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
                        <span id="fm-status-message">Ready</span>
                    </div>
                </div>
                
                <!-- Hidden file input for uploads -->
                <input type="file" id="fm-file-input" multiple style="display: none;">
                
                <!-- Context Menu -->
                <div class="context-menu-file" id="fm-context-menu">
                    <div class="context-menu-item" data-action="open">
                        <i class="fas fa-folder-open"></i> Open
                    </div>
                    <div class="context-menu-item" data-action="edit">
                        <i class="fas fa-edit"></i> Edit
                    </div>
                    <div class="context-menu-separator"></div>
                    <div class="context-menu-item" data-action="rename">
                        <i class="fas fa-i-cursor"></i> Rename
                    </div>
                    <div class="context-menu-item" data-action="delete">
                        <i class="fas fa-trash"></i> Delete
                    </div>
                    <div class="context-menu-separator"></div>
                    <div class="context-menu-item" data-action="properties">
                        <i class="fas fa-info-circle"></i> Properties
                    </div>
                </div>
                
                <style>
                    .file-manager {
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        background: #f8f9fa;
                    }
                    
                    .file-manager-toolbar {
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        padding: 12px;
                        border-bottom: 1px solid #dee2e6;
                        background: #ffffff;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    }
                    
                    .file-manager-toolbar button {
                        padding: 8px 12px;
                        border: 1px solid #dee2e6;
                        background: white;
                        border-radius: 6px;
                        cursor: pointer;
                        transition: all 0.2s;
                        font-size: 14px;
                        display: flex;
                        align-items: center;
                        gap: 6px;
                    }
                    
                    .file-manager-toolbar button:hover:not(:disabled) {
                        background: #e9ecef;
                        border-color: #007bff;
                        color: #007bff;
                    }
                    
                    .file-manager-toolbar button:disabled {
                        opacity: 0.5;
                        cursor: not-allowed;
                    }
                    
                    .file-path {
                        flex: 1;
                        padding: 8px 12px;
                        background: #f8f9fa;
                        border: 1px solid #dee2e6;
                        border-radius: 6px;
                        font-family: 'Courier New', monospace;
                        font-size: 13px;
                        margin: 0 8px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    
                    .toolbar-actions {
                        display: flex;
                        gap: 6px;
                    }
                    
                    .file-manager-content {
                        flex: 1;
                        overflow: hidden;
                        position: relative;
                        background: white;
                    }
                    
                    .file-list {
                        height: 100%;
                        overflow-y: auto;
                        padding: 15px;
                        display: grid;
                        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
                        gap: 15px;
                        align-content: start;
                    }
                    
                    .file-item {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        padding: 15px 10px;
                        border-radius: 12px;
                        cursor: pointer;
                        transition: all 0.2s;
                        border: 2px solid transparent;
                        position: relative;
                        background: #f8f9fa;
                    }
                    
                    .file-item:hover {
                        background: #e3f2fd;
                        border-color: #2196f3;
                        transform: translateY(-2px);
                        box-shadow: 0 4px 12px rgba(33, 150, 243, 0.2);
                    }
                    
                    .file-item.selected {
                        background: #bbdefb;
                        border-color: #1976d2;
                        box-shadow: 0 2px 8px rgba(25, 118, 210, 0.3);
                    }
                    
                    .file-icon {
                        font-size: 42px;
                        margin-bottom: 10px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 60px;
                        height: 60px;
                        border-radius: 8px;
                        background: linear-gradient(145deg, #ffffff, #f0f0f0);
                        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                    }
                    
                    .file-name {
                        font-size: 13px;
                        font-weight: 500;
                        text-align: center;
                        word-break: break-word;
                        line-height: 1.3;
                        max-width: 100%;
                        color: #333;
                        margin-bottom: 4px;
                    }
                    
                    .file-meta {
                        font-size: 11px;
                        color: #666;
                        text-align: center;
                        opacity: 0.8;
                    }
                    
                    .file-size {
                        margin-bottom: 2px;
                    }
                    
                    .file-date {
                        font-size: 10px;
                    }
                    
                    .file-manager-status {
                        border-top: 1px solid #dee2e6;
                        padding: 10px 15px;
                        background: #f8f9fa;
                        font-size: 13px;
                        color: #666;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        gap: 15px;
                    }
                    
                    .loading {
                        grid-column: 1/-1;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 10px;
                        padding: 40px;
                        color: #666;
                        font-size: 16px;
                    }
                    
                    .spinner {
                        width: 20px;
                        height: 20px;
                        border: 2px solid #e9ecef;
                        border-top: 2px solid #007bff;
                        border-radius: 50%;
                        animation: spin 1s linear infinite;
                    }
                    
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    
                    .empty-folder {
                        grid-column: 1/-1;
                        text-align: center;
                        padding: 60px 20px;
                        color: #666;
                    }
                    
                    .empty-folder-icon {
                        font-size: 64px;
                        color: #dee2e6;
                        margin-bottom: 20px;
                    }
                    
                    .empty-folder-text {
                        font-size: 18px;
                        font-weight: 500;
                        margin-bottom: 8px;
                    }
                    
                    .empty-folder-subtext {
                        font-size: 14px;
                        opacity: 0.8;
                    }
                    
                    /* Context Menu */
                    .context-menu-file {
                        position: fixed;
                        background: white;
                        border: 1px solid #dee2e6;
                        border-radius: 8px;
                        box-shadow: 0 8px 32px rgba(0,0,0,0.15);
                        padding: 8px 0;
                        min-width: 180px;
                        display: none;
                        z-index: 10000;
                        backdrop-filter: blur(10px);
                    }
                    
                    .context-menu-item {
                        padding: 10px 16px;
                        cursor: pointer;
                        font-size: 14px;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        transition: background-color 0.2s;
                    }
                    
                    .context-menu-item:hover {
                        background: #f8f9fa;
                        color: #007bff;
                    }
                    
                    .context-menu-item i {
                        width: 16px;
                        text-align: center;
                    }
                    
                    .context-menu-separator {
                        height: 1px;
                        background: #dee2e6;
                        margin: 4px 0;
                    }
                    
                    /* Drag & Drop */
                    .drop-zone {
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: rgba(33, 150, 243, 0.1);
                        border: 3px dashed #2196f3;
                        display: none;
                        align-items: center;
                        justify-content: center;
                        font-size: 20px;
                        font-weight: 500;
                        color: #1976d2;
                        z-index: 1000;
                        backdrop-filter: blur(5px);
                    }
                    
                    .drop-zone.active {
                        display: flex;
                    }
                    
                    /* Responsive Design */
                    @media (max-width: 768px) {
                        .file-list {
                            grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
                            gap: 10px;
                            padding: 10px;
                        }
                        
                        .file-item {
                            padding: 10px 8px;
                        }
                        
                        .file-icon {
                            font-size: 32px;
                            width: 50px;
                            height: 50px;
                        }
                        
                        .file-name {
                            font-size: 12px;
                        }
                        
                        .file-manager-toolbar {
                            padding: 8px;
                            gap: 6px;
                        }
                        
                        .file-manager-toolbar button {
                            padding: 6px 8px;
                            font-size: 12px;
                        }
                        
                        .file-path {
                            font-size: 11px;
                            padding: 6px 8px;
                        }
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
        this.lastClickTime = 0;
        this.lastClickTarget = null;

        this.setupEventListeners();
        this.loadDirectory(this.currentPath);
    }

    static setupEventListeners() {
        const fileList = this.currentWindow.querySelector('#fm-file-list');
        const fileInput = this.currentWindow.querySelector('#fm-file-input');

        // File selection and opening
        fileList.addEventListener('click', (e) => {
            const fileItem = e.target.closest('.file-item');
            if (fileItem) {
                this.handleFileClick(fileItem, e.ctrlKey || e.metaKey);
            } else {
                this.clearSelection();
            }
        });

        // Context menu
        fileList.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            const fileItem = e.target.closest('.file-item');
            this.showContextMenu(e.clientX, e.clientY, fileItem);
        });

        // Context menu actions
        const contextMenu = this.currentWindow.querySelector('#fm-context-menu');
        contextMenu.addEventListener('click', (e) => {
            const item = e.target.closest('.context-menu-item');
            if (item) {
                const action = item.dataset.action;
                this.handleContextAction(action);
                this.hideContextMenu();
            }
        });

        // Hide context menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('#fm-context-menu') && this.currentWindow) {
                this.hideContextMenu();
            }
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
            } else if (e.key === 'Enter' && this.selectedFiles.size === 1) {
                const selectedFile = Array.from(this.selectedFiles)[0];
                const fileItem = this.currentWindow.querySelector(`[data-filename="${selectedFile}"]`);
                if (fileItem) {
                    this.openFile(selectedFile, fileItem.dataset.type);
                }
            }
        });
    }

    static setupDragAndDrop() {
        const content = this.currentWindow.querySelector('.file-manager-content');
        const dropZone = document.createElement('div');
        dropZone.className = 'drop-zone';
        dropZone.innerHTML = '<i class="fas fa-upload" style="margin-right: 10px;"></i>Drop files here to upload';
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
        this.updateStatus('Loading directory...');

        try {
            console.log('📁 Loading directory:', path);
            const response = await fetch(`/api/files/${path}`);
            const data = await response.json();

            if (response.ok) {
                this.currentPath = path;
                this.isWritable = data.writable;
                this.updateUI();
                this.renderFiles(data.files);
                this.updateStatus(`${data.files.length} items loaded`);
                console.log('✅ Directory loaded:', { path, files: data.files.length, writable: data.writable });
            } else {
                this.showError(data.error || 'Failed to load directory');
                this.updateStatus('Error loading directory');
                console.error('❌ Failed to load directory:', data.error);
            }
        } catch (error) {
            this.showError('Network error: ' + error.message);
            this.updateStatus('Connection error');
            console.error('❌ Network error:', error);
        }
    }

    static renderFiles(files) {
        const fileList = this.currentWindow.querySelector('#fm-file-list');

        if (files.length === 0) {
            fileList.innerHTML = `
                <div class="empty-folder">
                    <div class="empty-folder-icon">📁</div>
                    <div class="empty-folder-text">This folder is empty</div>
                    <div class="empty-folder-subtext">${this.isWritable ? 'Upload files or create a new folder to get started' : 'No files to display'}</div>
                </div>
            `;
            return;
        }

        fileList.innerHTML = files.map(file => {
            const formattedDate = file.modified ? new Date(file.modified).toLocaleDateString() : '';
            const formattedSize = file.type === 'folder' ? '' : this.formatFileSize(file.size);

            return `
                <div class="file-item" data-filename="${file.name}" data-type="${file.type}" data-size="${file.size || 0}">
                    <div class="file-icon">${file.icon}</div>
                    <div class="file-name">${file.name}</div>
                    <div class="file-meta">
                        ${formattedSize ? `<div class="file-size">${formattedSize}</div>` : ''}
                        ${formattedDate ? `<div class="file-date">${formattedDate}</div>` : ''}
                    </div>
                </div>
            `;
        }).join('');

        this.selectedFiles.clear();
        this.updateFileCount(files.length);
    }

    static handleFileClick(fileItem, multiSelect = false) {
        const filename = fileItem.dataset.filename;
        const type = fileItem.dataset.type;
        const now = Date.now();
        const isDoubleClick = (now - this.lastClickTime < 500) && (this.lastClickTarget === fileItem);

        if (isDoubleClick) {
            // Double click - open file/folder
            this.openFile(filename, type);
        } else {
            // Single click - select file
            if (!multiSelect) {
                this.clearSelection();
            }

            if (this.selectedFiles.has(filename)) {
                this.selectedFiles.delete(filename);
                fileItem.classList.remove('selected');
            } else {
                this.selectedFiles.add(filename);
                fileItem.classList.add('selected');
            }

            this.updateSelectionInfo();
        }

        this.lastClickTime = now;
        this.lastClickTarget = fileItem;
    }

    static async openFile(filename, type) {
        if (type === 'folder') {
            await this.navigateToFolder(filename);
        } else {
            // Open file in text editor if it's a text file
            const textExtensions = ['.txt', '.md', '.js', '.html', '.css', '.json', '.py', '.xml', '.log'];
            const ext = '.' + filename.split('.').pop().toLowerCase();

            if (textExtensions.includes(ext)) {
                if (window.WindowManager && window.TextEditor) {
                    const textEditorWindow = window.WindowManager.openApp('text-editor');

                    // Load file content after a delay
                    setTimeout(() => {
                        const fullPath = this.currentPath ? `${this.currentPath}/${filename}` : filename;
                        window.TextEditor.loadFile(fullPath);
                    }, 200);
                }
            } else {
                this.showNotification(`Cannot open ${filename}. File type not supported.`, 'warning');
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
        this.showNotification('Directory refreshed', 'success');
    }

    static async createFolder() {
        if (!this.isWritable) {
            this.showNotification('Cannot create folders in read-only directory', 'error');
            return;
        }

        const folderName = prompt('Enter folder name:');
        if (!folderName || !folderName.trim()) return;

        const sanitizedName = folderName.trim().replace(/[^a-zA-Z0-9\-_\s]/g, '');
        if (!sanitizedName) {
            this.showNotification('Invalid folder name', 'error');
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
                this.showNotification(`Folder "${sanitizedName}" created`, 'success');
                await this.refresh();
            } else {
                const data = await response.json();
                this.showNotification(data.error || 'Failed to create folder', 'error');
            }
        } catch (error) {
            this.showNotification('Network error: ' + error.message, 'error');
        }
    }

    static uploadFile() {
        if (!this.isWritable) {
            this.showNotification('Cannot upload files to read-only directory', 'error');
            return;
        }

        const fileInput = this.currentWindow.querySelector('#fm-file-input');
        fileInput.click();
    }

    static async handleFileUpload(files) {
        if (!this.isWritable) {
            this.showNotification('Cannot upload files to read-only directory', 'error');
            return;
        }

        const uploadPromises = Array.from(files).map(file => this.uploadSingleFile(file));

        try {
            await Promise.all(uploadPromises);
            this.showNotification(`${files.length} file(s) uploaded successfully`, 'success');
            await this.refresh();
        } catch (error) {
            this.showNotification('Some files failed to upload', 'error');
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
            this.showNotification(`${fileList.length} item(s) deleted`, 'success');
            await this.refresh();
        } catch (error) {
            this.showNotification('Some items failed to delete', 'error');
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
        const contextMenu = this.currentWindow.querySelector('#fm-context-menu');

        // Update menu items based on context
        const openItem = contextMenu.querySelector('[data-action="open"]');
        const editItem = contextMenu.querySelector('[data-action="edit"]');
        const renameItem = contextMenu.querySelector('[data-action="rename"]');
        const deleteItem = contextMenu.querySelector('[data-action="delete"]');

        if (fileItem) {
            const filename = fileItem.dataset.filename;
            const type = fileItem.dataset.type;

            this.contextTarget = fileItem;

            // Select the item if not already selected
            if (!this.selectedFiles.has(filename)) {
                this.clearSelection();
                this.selectedFiles.add(filename);
                fileItem.classList.add('selected');
                this.updateSelectionInfo();
            }

            openItem.innerHTML = type === 'folder' ? '<i class="fas fa-folder-open"></i> Open' : '<i class="fas fa-edit"></i> Edit';
            editItem.style.display = type === 'file' ? 'block' : 'none';
            renameItem.style.display = this.isWritable ? 'block' : 'none';
            deleteItem.style.display = this.isWritable ? 'block' : 'none';
        } else {
            this.contextTarget = null;
            openItem.innerHTML = '<i class="fas fa-folder-plus"></i> New Folder';
            editItem.style.display = 'none';
            renameItem.style.display = 'none';
            deleteItem.style.display = 'none';
        }

        // Position and show menu
        contextMenu.style.left = Math.min(x, window.innerWidth - 200) + 'px';
        contextMenu.style.top = Math.min(y, window.innerHeight - 200) + 'px';
        contextMenu.style.display = 'block';
    }

    static hideContextMenu() {
        const contextMenu = this.currentWindow.querySelector('#fm-context-menu');
        contextMenu.style.display = 'none';
    }

    static handleContextAction(action) {
        switch (action) {
            case 'open':
                if (this.contextTarget) {
                    const filename = this.contextTarget.dataset.filename;
                    const type = this.contextTarget.dataset.type;
                    this.openFile(filename, type);
                } else {
                    this.createFolder();
                }
                break;
            case 'edit':
                if (this.contextTarget) {
                    const filename = this.contextTarget.dataset.filename;
                    this.openFile(filename, 'file');
                }
                break;
            case 'rename':
                if (this.contextTarget) {
                    this.renameFile(this.contextTarget.dataset.filename);
                }
                break;
            case 'delete':
                if (this.selectedFiles.size > 0) {
                    this.deleteSelected();
                }
                break;
            case 'properties':
                if (this.contextTarget) {
                    this.showProperties(this.contextTarget);
                }
                break;
        }
    }

    static async renameFile(oldName) {
        const newName = prompt('Enter new name:', oldName);
        if (!newName || newName === oldName) return;

        // For now, show a message that rename is coming soon
        this.showNotification('Rename functionality coming soon', 'info');
    }

    static showProperties(fileItem) {
        const filename = fileItem.dataset.filename;
        const type = fileItem.dataset.type;
        const size = fileItem.dataset.size;

        const sizeText = type === 'folder' ? 'Folder' : this.formatFileSize(parseInt(size));

        alert(`Properties for: ${filename}\nType: ${type}\nSize: ${sizeText}`);
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

    static updateUI() {
        const pathElement = this.currentWindow.querySelector('#fm-current-path');
        const backBtn = this.currentWindow.querySelector('#fm-back-btn');
        const newFolderBtn = this.currentWindow.querySelector('#fm-new-folder-btn');
        const uploadBtn = this.currentWindow.querySelector('#fm-upload-btn');

        pathElement.textContent = '/' + this.currentPath;
        backBtn.disabled = this.pathHistory.length === 0;

        // Disable write operations for read-only directories
        newFolderBtn.disabled = !this.isWritable;
        uploadBtn.disabled = !this.isWritable;

        // Update window title
        const title = this.currentWindow.querySelector('.window-title');
        title.textContent = this.currentPath.startsWith('public/') ?
            'File Manager - Public' : 'File Manager';
    }

    static updateSelectionInfo() {
        const selectionInfo = this.currentWindow.querySelector('#fm-selection-info');
        if (this.selectedFiles.size > 0) {
            selectionInfo.textContent = `${this.selectedFiles.size} selected`;
        } else {
            selectionInfo.textContent = '';
        }
    }

    static updateFileCount(count) {
        const fileCountElement = this.currentWindow.querySelector('#fm-file-count');
        fileCountElement.textContent = `${count} items`;
    }

    static updateStatus(message) {
        const statusElement = this.currentWindow.querySelector('#fm-status-message');
        statusElement.textContent = message;
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
        fileList.innerHTML = `
            <div class="loading">
                <div class="spinner"></div>
                Loading files...
            </div>
        `;
    }

    static showError(message) {
        const fileList = this.currentWindow.querySelector('#fm-file-list');
        fileList.innerHTML = `
            <div class="empty-folder">
                <div class="empty-folder-icon" style="color: #dc3545;">⚠️</div>
                <div class="empty-folder-text" style="color: #dc3545;">Error Loading Directory</div>
                <div class="empty-folder-subtext">${message}</div>
            </div>
        `;
    }

    static showNotification(message, type = 'info') {
        if (window.Notification) {
            window.Notification[type](message);
        } else {
            // Fallback to alert if notification system not available
            alert(message);
        }
    }

    static onClose(windowElement) {
        this.currentWindow = null;
        return true;
    }
}

window.FileManager = FileManager;