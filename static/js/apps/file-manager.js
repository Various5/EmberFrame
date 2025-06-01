/**
 * APP_METADATA
 * @name File Manager
 * @icon fas fa-folder
 * @description Advanced file manager
 * @category System
 * @version 2.0.0
 * @author EmberFrame Team
 * @enabled true
 */

// Enhanced File Manager with User Home and Public Folder Support
class FileManager {
    static createWindow(startPath = '') {
        // Determine the appropriate title based on start path
        let title = 'File Manager';
        if (startPath.startsWith('public/')) {
            title = 'File Manager - Public Files';
        } else if (startPath.startsWith('home/')) {
            title = 'File Manager - Home Directory';
        } else if (!startPath) {
            title = 'File Manager - Home Directory';
        }

        return {
            title: title,
            width: '850px',
            height: '600px',
            autoSize: false,
            content: `
                <div class="file-manager">
                    <div class="file-manager-toolbar">
                        <div class="navigation-controls">
                            <button onclick="FileManager.goBack()" id="fm-back-btn" disabled title="Go Back">
                                <i class="fas fa-arrow-left"></i>
                            </button>
                            <button onclick="FileManager.goForward()" id="fm-forward-btn" disabled title="Go Forward">
                                <i class="fas fa-arrow-right"></i>
                            </button>
                            <button onclick="FileManager.goUp()" id="fm-up-btn" title="Go Up">
                                <i class="fas fa-arrow-up"></i>
                            </button>
                        </div>

                        <div class="location-controls">
                            <button onclick="FileManager.goHome()" id="fm-home-btn" title="Home Directory">
                                <i class="fas fa-home"></i> Home
                            </button>
                            <button onclick="FileManager.goPublic()" id="fm-public-btn" title="Public Files">
                                <i class="fas fa-globe"></i> Public
                            </button>
                            <button onclick="FileManager.goShared()" id="fm-shared-btn" title="Shared Folders">
                                <i class="fas fa-users"></i> Shared
                            </button>
                        </div>

                        <div class="path-display">
                            <div class="breadcrumb" id="fm-breadcrumb">
                                <span class="breadcrumb-item active">Home</span>
                            </div>
                        </div>

                        <div class="toolbar-actions">
                            <button onclick="FileManager.toggleView()" id="fm-view-btn" title="Toggle View">
                                <i class="fas fa-th"></i>
                            </button>
                            <button onclick="FileManager.createFolder()" id="fm-new-folder-btn" title="New Folder">
                                <i class="fas fa-folder-plus"></i>
                            </button>
                            <button onclick="FileManager.uploadFile()" id="fm-upload-btn" title="Upload Files">
                                <i class="fas fa-upload"></i>
                            </button>
                            <button onclick="FileManager.refresh()" title="Refresh">
                                <i class="fas fa-sync-alt"></i>
                            </button>
                            <button onclick="FileManager.toggleSidebar()" id="fm-sidebar-btn" title="Toggle Sidebar">
                                <i class="fas fa-bars"></i>
                            </button>
                        </div>
                    </div>

                    <div class="file-manager-main">
                        <div class="file-manager-sidebar" id="fm-sidebar">
                            <div class="sidebar-section">
                                <h4>Quick Access</h4>
                                <div class="sidebar-item" onclick="FileManager.goHome()">
                                    <i class="fas fa-home"></i> Home
                                </div>
                                <div class="sidebar-item" onclick="FileManager.navigateToPath('home/Documents')">
                                    <i class="fas fa-file-text"></i> Documents
                                </div>
                                <div class="sidebar-item" onclick="FileManager.navigateToPath('home/Downloads')">
                                    <i class="fas fa-download"></i> Downloads
                                </div>
                                <div class="sidebar-item" onclick="FileManager.navigateToPath('home/Pictures')">
                                    <i class="fas fa-image"></i> Pictures
                                </div>
                                <div class="sidebar-item" onclick="FileManager.navigateToPath('home/Music')">
                                    <i class="fas fa-music"></i> Music
                                </div>
                                <div class="sidebar-item" onclick="FileManager.navigateToPath('home/Desktop')">
                                    <i class="fas fa-desktop"></i> Desktop
                                </div>
                            </div>

                            <div class="sidebar-section">
                                <h4>Public Areas</h4>
                                <div class="sidebar-item" onclick="FileManager.goPublic()">
                                    <i class="fas fa-globe"></i> Public Files
                                </div>
                                <div class="sidebar-item" onclick="FileManager.navigateToPath('public/documents')">
                                    <i class="fas fa-file-alt"></i> Public Documents
                                </div>
                                <div class="sidebar-item" onclick="FileManager.navigateToPath('public/media')">
                                    <i class="fas fa-photo-video"></i> Public Media
                                </div>
                                <div class="sidebar-item" onclick="FileManager.navigateToPath('public/software')">
                                    <i class="fas fa-compact-disc"></i> Software
                                </div>
                            </div>

                            <div class="sidebar-section">
                                <h4>Storage Info</h4>
                                <div class="storage-info">
                                    <div class="storage-bar">
                                        <div class="storage-used" id="fm-storage-bar" style="width: 0%"></div>
                                    </div>
                                    <div class="storage-text">
                                        <span id="fm-storage-used">0 MB</span> / <span id="fm-storage-total">100 MB</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="file-manager-content">
                            <div class="content-header">
                                <div class="selection-info" id="fm-selection-info"></div>
                                <div class="view-options">
                                    <select id="fm-sort-select" onchange="FileManager.updateSort()">
                                        <option value="name">Sort by Name</option>
                                        <option value="size">Sort by Size</option>
                                        <option value="modified">Sort by Date Modified</option>
                                        <option value="type">Sort by Type</option>
                                    </select>
                                </div>
                            </div>

                            <div class="file-list" id="fm-file-list">
                                <div class="loading">
                                    <div class="spinner"></div>
                                    Loading files...
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="file-manager-status">
                        <div class="status-left">
                            <span id="fm-file-count">0 items</span>
                            <span id="fm-selected-count"></span>
                        </div>
                        <div class="status-center">
                            <span id="fm-current-operation"></span>
                        </div>
                        <div class="status-right">
                            <span id="fm-status-message">Ready</span>
                        </div>
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
                    <div class="context-menu-item" data-action="cut">
                        <i class="fas fa-cut"></i> Cut
                    </div>
                    <div class="context-menu-item" data-action="copy">
                        <i class="fas fa-copy"></i> Copy
                    </div>
                    <div class="context-menu-item" data-action="paste">
                        <i class="fas fa-paste"></i> Paste
                    </div>
                    <div class="context-menu-separator"></div>
                    <div class="context-menu-item" data-action="rename">
                        <i class="fas fa-i-cursor"></i> Rename
                    </div>
                    <div class="context-menu-item" data-action="delete">
                        <i class="fas fa-trash"></i> Delete
                    </div>
                    <div class="context-menu-separator"></div>
                    <div class="context-menu-item" data-action="download">
                        <i class="fas fa-download"></i> Download
                    </div>
                    <div class="context-menu-item" data-action="properties">
                        <i class="fas fa-info-circle"></i> Properties
                    </div>
                </div>

                <!-- Empty context menu -->
                <div class="context-menu-file" id="fm-empty-context-menu">
                    <div class="context-menu-item" data-action="paste">
                        <i class="fas fa-paste"></i> Paste
                    </div>
                    <div class="context-menu-separator"></div>
                    <div class="context-menu-item" data-action="new-folder">
                        <i class="fas fa-folder-plus"></i> New Folder
                    </div>
                    <div class="context-menu-item" data-action="upload">
                        <i class="fas fa-upload"></i> Upload Files
                    </div>
                    <div class="context-menu-separator"></div>
                    <div class="context-menu-item" data-action="refresh">
                        <i class="fas fa-sync-alt"></i> Refresh
                    </div>
                </div>

                <!-- Properties Modal -->
                <div class="modal" id="fm-properties-modal">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3>File Properties</h3>
                            <button class="modal-close" onclick="FileManager.closeModal()">&times;</button>
                        </div>
                        <div class="modal-body" id="fm-properties-content">
                            <!-- Properties content will be populated here -->
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-secondary" onclick="FileManager.closeModal()">Close</button>
                        </div>
                    </div>
                </div>
                
                <style>
                    .file-manager {
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        background: #f8f9fa;
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    }
                    
                    .file-manager-toolbar {
                        display: flex;
                        align-items: center;
                        gap: 15px;
                        padding: 12px 16px;
                        border-bottom: 1px solid #dee2e6;
                        background: #ffffff;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                        flex-wrap: wrap;
                        min-height: 60px;
                    }
                    
                    .navigation-controls,
                    .location-controls,
                    .toolbar-actions {
                        display: flex;
                        gap: 6px;
                        align-items: center;
                    }

                    .path-display {
                        flex: 1;
                        min-width: 200px;
                        margin: 0 15px;
                    }

                    .breadcrumb {
                        display: flex;
                        align-items: center;
                        gap: 6px;
                        font-size: 13px;
                        overflow-x: auto;
                        white-space: nowrap;
                        padding: 6px 12px;
                        background: #f8f9fa;
                        border: 1px solid #e9ecef;
                        border-radius: 6px;
                    }

                    .breadcrumb-item {
                        color: #6c757d;
                        cursor: pointer;
                        padding: 4px 8px;
                        border-radius: 4px;
                        transition: all 0.2s;
                    }

                    .breadcrumb-item:hover {
                        background: #e9ecef;
                        color: #495057;
                    }

                    .breadcrumb-item.active {
                        color: #007bff;
                        font-weight: 500;
                    }

                    .breadcrumb-separator {
                        color: #6c757d;
                        margin: 0 4px;
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
                        min-width: auto;
                    }
                    
                    .file-manager-toolbar button:hover:not(:disabled) {
                        background: #e9ecef;
                        border-color: #007bff;
                        color: #007bff;
                        transform: translateY(-1px);
                    }
                    
                    .file-manager-toolbar button:disabled {
                        opacity: 0.5;
                        cursor: not-allowed;
                        transform: none;
                    }

                    .file-manager-main {
                        flex: 1;
                        display: flex;
                        overflow: hidden;
                    }

                    .file-manager-sidebar {
                        width: 200px;
                        background: #f8f9fa;
                        border-right: 1px solid #dee2e6;
                        overflow-y: auto;
                        transition: margin-left 0.3s ease;
                    }

                    .file-manager-sidebar.hidden {
                        margin-left: -200px;
                    }

                    .sidebar-section {
                        padding: 15px;
                        border-bottom: 1px solid #e9ecef;
                    }

                    .sidebar-section h4 {
                        margin: 0 0 10px 0;
                        font-size: 12px;
                        text-transform: uppercase;
                        color: #6c757d;
                        font-weight: 600;
                    }

                    .sidebar-item {
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        padding: 8px 12px;
                        border-radius: 6px;
                        cursor: pointer;
                        font-size: 13px;
                        color: #495057;
                        transition: all 0.2s;
                        margin-bottom: 2px;
                    }

                    .sidebar-item:hover {
                        background: #e9ecef;
                        color: #007bff;
                    }

                    .sidebar-item.active {
                        background: #007bff;
                        color: white;
                    }

                    .storage-info {
                        margin-top: 10px;
                    }

                    .storage-bar {
                        width: 100%;
                        height: 8px;
                        background: #e9ecef;
                        border-radius: 4px;
                        overflow: hidden;
                        margin-bottom: 8px;
                    }

                    .storage-used {
                        height: 100%;
                        background: linear-gradient(90deg, #28a745, #20c997);
                        transition: width 0.3s ease;
                    }

                    .storage-text {
                        font-size: 11px;
                        color: #6c757d;
                        text-align: center;
                    }
                    
                    .file-manager-content {
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        overflow: hidden;
                        background: white;
                    }

                    .content-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 12px 16px;
                        border-bottom: 1px solid #e9ecef;
                        background: #f8f9fa;
                    }

                    .selection-info {
                        font-size: 13px;
                        color: #6c757d;
                    }

                    .view-options select {
                        padding: 6px 12px;
                        border: 1px solid #dee2e6;
                        border-radius: 4px;
                        background: white;
                        font-size: 13px;
                    }
                    
                    .file-list {
                        flex: 1;
                        overflow-y: auto;
                        padding: 15px;
                        display: grid;
                        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
                        gap: 15px;
                        align-content: start;
                    }

                    .file-list.list-view {
                        display: flex;
                        flex-direction: column;
                        gap: 0;
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
                        user-select: none;
                    }

                    .file-list.list-view .file-item {
                        flex-direction: row;
                        padding: 8px 15px;
                        border-radius: 6px;
                        justify-content: flex-start;
                        gap: 12px;
                        margin-bottom: 1px;
                    }
                    
                    .file-item:hover {
                        background: #e3f2fd;
                        border-color: #2196f3;
                        transform: translateY(-2px);
                        box-shadow: 0 4px 12px rgba(33, 150, 243, 0.2);
                    }

                    .file-list.list-view .file-item:hover {
                        transform: none;
                        box-shadow: none;
                    }
                    
                    .file-item.selected {
                        background: #bbdefb;
                        border-color: #1976d2;
                        box-shadow: 0 2px 8px rgba(25, 118, 210, 0.3);
                    }

                    .file-item.cut {
                        opacity: 0.5;
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
                        color: #495057;
                        transition: all 0.2s;
                    }

                    .file-list.list-view .file-icon {
                        font-size: 24px;
                        width: 32px;
                        height: 32px;
                        margin-bottom: 0;
                        margin-right: 0;
                        flex-shrink: 0;
                    }

                    .file-icon.folder {
                        color: #ffc107;
                    }

                    .file-icon.image {
                        color: #28a745;
                    }

                    .file-icon.document {
                        color: #007bff;
                    }

                    .file-icon.video {
                        color: #dc3545;
                    }

                    .file-icon.audio {
                        color: #6f42c1;
                    }

                    .file-icon.archive {
                        color: #fd7e14;
                    }

                    .file-details {
                        flex: 1;
                        text-align: center;
                    }

                    .file-list.list-view .file-details {
                        text-align: left;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        width: 100%;
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

                    .file-list.list-view .file-name {
                        text-align: left;
                        margin-bottom: 0;
                        flex: 1;
                        margin-right: 15px;
                    }
                    
                    .file-meta {
                        font-size: 11px;
                        color: #666;
                        text-align: center;
                        opacity: 0.8;
                        display: flex;
                        flex-direction: column;
                        gap: 2px;
                    }

                    .file-list.list-view .file-meta {
                        flex-direction: row;
                        gap: 15px;
                        min-width: 200px;
                        justify-content: flex-end;
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
                        min-height: 40px;
                    }

                    .status-left,
                    .status-center,
                    .status-right {
                        display: flex;
                        align-items: center;
                        gap: 15px;
                    }

                    .status-center {
                        flex: 1;
                        justify-content: center;
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

                    .context-menu-file {
                        position: fixed;
                        background: white;
                        border: 1px solid #dee2e6;
                        border-radius: 8px;
                        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
                        padding: 8px 0;
                        min-width: 180px;
                        display: none;
                        z-index: 10000;
                        font-size: 14px;
                    }

                    .context-menu-item {
                        padding: 10px 16px;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        color: #495057;
                        transition: all 0.2s;
                    }

                    .context-menu-item:hover {
                        background: #f8f9fa;
                        color: #007bff;
                    }

                    .context-menu-item.disabled {
                        opacity: 0.5;
                        cursor: not-allowed;
                    }

                    .context-menu-item.disabled:hover {
                        background: transparent;
                        color: #495057;
                    }

                    .context-menu-separator {
                        height: 1px;
                        background: #e9ecef;
                        margin: 4px 0;
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
                        border-radius: 12px;
                        width: 90%;
                        max-width: 500px;
                        max-height: 90vh;
                        overflow-y: auto;
                        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                    }

                    .modal-header {
                        padding: 20px;
                        border-bottom: 1px solid #e9ecef;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }

                    .modal-header h3 {
                        margin: 0;
                        color: #495057;
                    }

                    .modal-close {
                        background: none;
                        border: none;
                        font-size: 24px;
                        cursor: pointer;
                        color: #6c757d;
                    }

                    .modal-body {
                        padding: 20px;
                    }

                    .modal-footer {
                        padding: 20px;
                        border-top: 1px solid #e9ecef;
                        display: flex;
                        justify-content: flex-end;
                        gap: 10px;
                    }

                    .btn {
                        padding: 8px 16px;
                        border: none;
                        border-radius: 6px;
                        cursor: pointer;
                        font-size: 14px;
                        transition: all 0.2s;
                    }

                    .btn-secondary {
                        background: #6c757d;
                        color: white;
                    }

                    .btn-secondary:hover {
                        background: #5a6268;
                    }

                    /* Responsive Design */
                    @media (max-width: 768px) {
                        .file-manager-toolbar {
                            padding: 8px;
                            gap: 8px;
                        }

                        .path-display {
                            margin: 0 8px;
                            min-width: 150px;
                        }

                        .file-manager-sidebar {
                            width: 180px;
                        }

                        .file-list {
                            grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
                            gap: 10px;
                            padding: 10px;
                        }

                        .navigation-controls,
                        .location-controls,
                        .toolbar-actions {
                            gap: 4px;
                        }

                        .file-manager-toolbar button {
                            padding: 6px 8px;
                            font-size: 12px;
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
        this.currentPath = startPath || 'home';
        this.pathHistory = [];
        this.forwardHistory = [];
        this.selectedFiles = new Set();
        this.clipboard = { files: [], operation: null }; // cut or copy
        this.isWritable = true;
        this.lastClickTime = 0;
        this.lastClickTarget = null;
        this.viewMode = 'grid'; // grid or list
        this.sortBy = 'name';
        this.sortDirection = 'asc';
        this.sidebarVisible = true;

        this.setupEventListeners();
        this.updateStorageInfo();
        this.loadDirectory(this.currentPath);
    }

    static setupEventListeners() {
        const fileList = this.currentWindow.querySelector('#fm-file-list');

        // File list click events
        fileList.addEventListener('click', (e) => {
            const fileItem = e.target.closest('.file-item');
            if (fileItem) {
                this.handleFileClick(fileItem, e.ctrlKey || e.metaKey, e.shiftKey);
            } else {
                this.clearSelection();
            }
        });

        // File list context menu
        fileList.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            const fileItem = e.target.closest('.file-item');
            if (fileItem) {
                if (!fileItem.classList.contains('selected')) {
                    this.clearSelection();
                    this.selectFile(fileItem);
                }
                this.showContextMenu(e.clientX, e.clientY, 'file');
            } else {
                this.showContextMenu(e.clientX, e.clientY, 'empty');
            }
        });

        // File upload input
        const fileInput = this.currentWindow.querySelector('#fm-file-input');
        fileInput.addEventListener('change', (e) => {
            this.handleFileUpload(e.target.files);
        });

        // Context menu handlers
        this.setupContextMenuHandlers();

        // Keyboard shortcuts
        this.currentWindow.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });

        // Make window focusable
        this.currentWindow.tabIndex = 0;
        this.currentWindow.focus();
    }

    static setupContextMenuHandlers() {
        const fileContextMenu = this.currentWindow.querySelector('#fm-context-menu');
        const emptyContextMenu = this.currentWindow.querySelector('#fm-empty-context-menu');

        [fileContextMenu, emptyContextMenu].forEach(menu => {
            menu.addEventListener('click', (e) => {
                const item = e.target.closest('.context-menu-item');
                if (item && !item.classList.contains('disabled')) {
                    const action = item.dataset.action;
                    this.executeContextAction(action);
                    this.hideContextMenu();
                }
            });
        });

        // Hide context menu on click outside
        document.addEventListener('click', () => {
            this.hideContextMenu();
        });
    }

    static handleKeyboardShortcuts(e) {
        if (e.ctrlKey || e.metaKey) {
            switch (e.key) {
                case 'a':
                    e.preventDefault();
                    this.selectAll();
                    break;
                case 'c':
                    e.preventDefault();
                    this.copySelected();
                    break;
                case 'x':
                    e.preventDefault();
                    this.cutSelected();
                    break;
                case 'v':
                    e.preventDefault();
                    this.paste();
                    break;
                case 'n':
                    e.preventDefault();
                    this.createFolder();
                    break;
            }
        } else {
            switch (e.key) {
                case 'Delete':
                    this.deleteSelected();
                    break;
                case 'F2':
                    this.renameSelected();
                    break;
                case 'F5':
                    this.refresh();
                    break;
                case 'Backspace':
                    this.goUp();
                    break;
            }
        }
    }

    static async loadDirectory(path) {
        this.showLoading();
        this.updateStatus('Loading directory...');

        try {
            console.log('📁 Loading directory:', path);

            // Normalize path
            const normalizedPath = this.normalizePath(path);

            const response = await fetch(`/api/files/${normalizedPath}`);
            const data = await response.json();

            if (response.ok) {
                this.currentPath = normalizedPath;
                this.isWritable = data.writable !== false; // Default to writable if not specified
                this.updateUI();
                this.renderFiles(data.files || []);
                this.updateFileCount(data.files ? data.files.length : 0);
                this.updateStatus(`${data.files ? data.files.length : 0} items loaded`);
                this.updateStorageInfo();
                console.log('✅ Directory loaded:', { path: normalizedPath, files: data.files ? data.files.length : 0, writable: this.isWritable });
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

    static normalizePath(path) {
        if (!path || path === '') {
            return 'home';
        }

        // Remove leading/trailing slashes and normalize
        path = path.replace(/^\/+|\/+$/g, '');

        // If path doesn't start with known roots, prepend 'home/'
        if (!path.startsWith('home/') && !path.startsWith('public/') && !path.startsWith('shared/') &&
            path !== 'home' && path !== 'public' && path !== 'shared') {
            path = 'home/' + path;
        }

        return path;
    }

    static renderFiles(files) {
        const fileList = this.currentWindow.querySelector('#fm-file-list');

        if (files.length === 0) {
            fileList.innerHTML = `
                <div class="empty-folder" style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: #6c757d;">
                    <div style="font-size: 64px; margin-bottom: 20px; opacity: 0.5;">📁</div>
                    <div style="font-size: 18px; margin-bottom: 10px;">This folder is empty</div>
                    <div style="font-size: 14px; opacity: 0.8;">${this.isWritable ? 'Upload files or create a new folder to get started' : 'No files to display'}</div>
                </div>
            `;
            return;
        }

        // Sort files
        const sortedFiles = this.sortFiles(files);

        fileList.innerHTML = sortedFiles.map((file, index) => {
            const formattedDate = file.modified ? new Date(file.modified).toLocaleDateString() : '';
            const formattedSize = file.type === 'folder' ? '' : this.formatFileSize(file.size || 0);
            const iconClass = this.getFileIcon(file);

            return `
                <div class="file-item" data-filename="${file.name}" data-type="${file.type}" data-size="${file.size || 0}" data-index="${index}">
                    <div class="file-icon ${iconClass}">
                        ${this.getFileIconHtml(file)}
                    </div>
                    <div class="file-details">
                        <div class="file-name">${file.name}</div>
                        <div class="file-meta">
                            ${formattedSize ? `<div class="file-size">${formattedSize}</div>` : ''}
                            ${formattedDate ? `<div class="file-date">${formattedDate}</div>` : ''}
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        this.selectedFiles.clear();
        this.updateSelectionInfo();
        this.updateClipboardButtons();
    }

    static sortFiles(files) {
        return [...files].sort((a, b) => {
            // Always show folders first
            if (a.type === 'folder' && b.type !== 'folder') return -1;
            if (a.type !== 'folder' && b.type === 'folder') return 1;

            let compareA, compareB;

            switch (this.sortBy) {
                case 'size':
                    compareA = a.size || 0;
                    compareB = b.size || 0;
                    break;
                case 'modified':
                    compareA = new Date(a.modified || 0);
                    compareB = new Date(b.modified || 0);
                    break;
                case 'type':
                    compareA = a.name.split('.').pop().toLowerCase();
                    compareB = b.name.split('.').pop().toLowerCase();
                    break;
                default: // name
                    compareA = a.name.toLowerCase();
                    compareB = b.name.toLowerCase();
            }

            if (compareA < compareB) return this.sortDirection === 'asc' ? -1 : 1;
            if (compareA > compareB) return this.sortDirection === 'asc' ? 1 : -1;
            return 0;
        });
    }

    static getFileIcon(file) {
        if (file.type === 'folder') return 'folder';

        const ext = file.name.split('.').pop().toLowerCase();

        if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'].includes(ext)) return 'image';
        if (['mp4', 'avi', 'mkv', 'mov', 'wmv', 'flv', 'webm'].includes(ext)) return 'video';
        if (['mp3', 'wav', 'flac', 'ogg', 'aac', 'm4a'].includes(ext)) return 'audio';
        if (['zip', 'rar', '7z', 'tar', 'gz', 'bz2'].includes(ext)) return 'archive';
        if (['txt', 'md', 'doc', 'docx', 'pdf', 'rtf'].includes(ext)) return 'document';

        return 'file';
    }

    static getFileIconHtml(file) {
        const iconMap = {
            folder: '<i class="fas fa-folder"></i>',
            image: '<i class="fas fa-image"></i>',
            video: '<i class="fas fa-video"></i>',
            audio: '<i class="fas fa-music"></i>',
            archive: '<i class="fas fa-file-archive"></i>',
            document: '<i class="fas fa-file-alt"></i>',
            file: '<i class="fas fa-file"></i>'
        };

        const iconClass = this.getFileIcon(file);
        return iconMap[iconClass] || iconMap.file;
    }

    static handleFileClick(fileItem, ctrlKey = false, shiftKey = false) {
        const filename = fileItem.dataset.filename;
        const type = fileItem.dataset.type;
        const now = Date.now();
        const isDoubleClick = (now - this.lastClickTime < 500) && (this.lastClickTarget === fileItem);

        if (isDoubleClick) {
            this.openFile(filename, type);
        } else {
            if (shiftKey && this.selectedFiles.size > 0) {
                this.selectRange(fileItem);
            } else if (ctrlKey) {
                this.toggleFileSelection(fileItem);
            } else {
                if (!fileItem.classList.contains('selected')) {
                    this.clearSelection();
                }
                this.selectFile(fileItem);
            }
        }

        this.lastClickTime = now;
        this.lastClickTarget = fileItem;
    }

    static selectFile(fileItem) {
        const filename = fileItem.dataset.filename;
        fileItem.classList.add('selected');
        this.selectedFiles.add(filename);
        this.updateSelectionInfo();
    }

    static toggleFileSelection(fileItem) {
        const filename = fileItem.dataset.filename;
        if (fileItem.classList.contains('selected')) {
            fileItem.classList.remove('selected');
            this.selectedFiles.delete(filename);
        } else {
            fileItem.classList.add('selected');
            this.selectedFiles.add(filename);
        }
        this.updateSelectionInfo();
    }

    static selectRange(endItem) {
        const items = Array.from(this.currentWindow.querySelectorAll('.file-item'));
        const selectedItems = Array.from(this.currentWindow.querySelectorAll('.file-item.selected'));

        if (selectedItems.length === 0) {
            this.selectFile(endItem);
            return;
        }

        const lastSelected = selectedItems[selectedItems.length - 1];
        const startIndex = items.indexOf(lastSelected);
        const endIndex = items.indexOf(endItem);

        const minIndex = Math.min(startIndex, endIndex);
        const maxIndex = Math.max(startIndex, endIndex);

        for (let i = minIndex; i <= maxIndex; i++) {
            this.selectFile(items[i]);
        }
    }

    static selectAll() {
        const items = this.currentWindow.querySelectorAll('.file-item');
        items.forEach(item => this.selectFile(item));
    }

    static clearSelection() {
        this.currentWindow.querySelectorAll('.file-item.selected').forEach(item => {
            item.classList.remove('selected');
        });
        this.selectedFiles.clear();
        this.updateSelectionInfo();
    }

    static async openFile(filename, type) {
        if (type === 'folder') {
            await this.navigateToFolder(filename);
        } else {
            // Try to open in appropriate app
            const textExtensions = ['.txt', '.md', '.js', '.html', '.css', '.json', '.py', '.xml', '.log', '.cfg', '.ini'];
            const ext = '.' + filename.split('.').pop().toLowerCase();

            if (textExtensions.includes(ext)) {
                if (window.WindowManager && window.TextEditor) {
                    window.WindowManager.openApp('text-editor');
                    // Wait a bit then load the file
                    setTimeout(() => {
                        const fullPath = this.getFullPath(filename);
                        if (window.TextEditor.loadFile) {
                            window.TextEditor.loadFile(fullPath);
                        }
                    }, 300);
                }
            } else {
                this.showNotification(`Cannot open ${filename}. File type not supported.`, 'warning');
            }
        }
    }

    static getFullPath(filename) {
        return this.currentPath ? `${this.currentPath}/${filename}` : filename;
    }

    // Navigation methods
    static async navigateToFolder(folderName) {
        const newPath = this.currentPath ? `${this.currentPath}/${folderName}` : folderName;
        this.addToHistory(this.currentPath);
        this.forwardHistory = []; // Clear forward history when navigating
        await this.loadDirectory(newPath);
    }

    static async navigateToPath(path) {
        this.addToHistory(this.currentPath);
        this.forwardHistory = [];
        await this.loadDirectory(path);
    }

    static async goBack() {
        if (this.pathHistory.length > 0) {
            const previousPath = this.pathHistory.pop();
            this.forwardHistory.push(this.currentPath);
            await this.loadDirectory(previousPath);
        }
    }

    static async goForward() {
        if (this.forwardHistory.length > 0) {
            const nextPath = this.forwardHistory.pop();
            this.addToHistory(this.currentPath);
            await this.loadDirectory(nextPath);
        }
    }

    static async goUp() {
        const pathParts = this.currentPath.split('/');
        if (pathParts.length > 1) {
            pathParts.pop();
            const parentPath = pathParts.join('/');
            this.addToHistory(this.currentPath);
            this.forwardHistory = [];
            await this.loadDirectory(parentPath);
        }
    }

    static async goHome() {
        this.addToHistory(this.currentPath);
        this.forwardHistory = [];
        await this.loadDirectory('home');
    }

    static async goPublic() {
        this.addToHistory(this.currentPath);
        this.forwardHistory = [];
        await this.loadDirectory('public');
    }

    static async goShared() {
        this.addToHistory(this.currentPath);
        this.forwardHistory = [];
        await this.loadDirectory('shared');
    }

    static addToHistory(path) {
        if (path && path !== this.currentPath) {
            this.pathHistory.push(path);
            // Limit history size
            if (this.pathHistory.length > 50) {
                this.pathHistory.shift();
            }
        }
    }

    static async refresh() {
        await this.loadDirectory(this.currentPath);
        this.showNotification('Directory refreshed', 'success');
    }

    // File operations
    static createFolder() {
        if (!this.isWritable) {
            this.showNotification('Cannot create folders in read-only directory', 'error');
            return;
        }

        const folderName = prompt('Enter folder name:');
        if (!folderName || !folderName.trim()) return;

        this.performFileOperation('create_folder', {
            path: this.currentPath,
            name: folderName.trim()
        });
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
        if (!this.isWritable || files.length === 0) return;

        const formData = new FormData();
        for (let file of files) {
            formData.append('files', file);
        }
        formData.append('path', this.currentPath);

        try {
            this.updateStatus(`Uploading ${files.length} file(s)...`);

            const response = await fetch('/api/files/upload', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                this.showNotification(`${files.length} file(s) uploaded successfully`, 'success');
                await this.refresh();
            } else {
                this.showNotification(data.error || 'Upload failed', 'error');
            }
        } catch (error) {
            this.showNotification('Upload error: ' + error.message, 'error');
        } finally {
            this.updateStatus('Ready');
        }
    }

    static copySelected() {
        if (this.selectedFiles.size === 0) return;

        this.clipboard.files = Array.from(this.selectedFiles);
        this.clipboard.operation = 'copy';
        this.updateClipboardButtons();
        this.showNotification(`${this.selectedFiles.size} item(s) copied`, 'info');
    }

    static cutSelected() {
        if (this.selectedFiles.size === 0) return;

        this.clipboard.files = Array.from(this.selectedFiles);
        this.clipboard.operation = 'cut';

        // Visual feedback for cut files
        this.selectedFiles.forEach(filename => {
            const item = this.currentWindow.querySelector(`[data-filename="${filename}"]`);
            if (item) item.classList.add('cut');
        });

        this.updateClipboardButtons();
        this.showNotification(`${this.selectedFiles.size} item(s) cut`, 'info');
    }

    static async paste() {
        if (!this.isWritable || this.clipboard.files.length === 0) return;

        try {
            this.updateStatus(`${this.clipboard.operation === 'copy' ? 'Copying' : 'Moving'} ${this.clipboard.files.length} item(s)...`);

            const response = await fetch('/api/files/paste', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    operation: this.clipboard.operation,
                    files: this.clipboard.files,
                    source_path: this.clipboard.sourcePath || this.currentPath,
                    target_path: this.currentPath
                })
            });

            const data = await response.json();

            if (response.ok) {
                this.showNotification(`${this.clipboard.files.length} item(s) ${this.clipboard.operation === 'copy' ? 'copied' : 'moved'}`, 'success');

                // Clear clipboard if it was a cut operation
                if (this.clipboard.operation === 'cut') {
                    this.clipboard.files = [];
                    this.clipboard.operation = null;
                    // Remove cut visual feedback
                    this.currentWindow.querySelectorAll('.file-item.cut').forEach(item => {
                        item.classList.remove('cut');
                    });
                }

                this.updateClipboardButtons();
                await this.refresh();
            } else {
                this.showNotification(data.error || 'Paste failed', 'error');
            }
        } catch (error) {
            this.showNotification('Paste error: ' + error.message, 'error');
        } finally {
            this.updateStatus('Ready');
        }
    }

    static deleteSelected() {
        if (this.selectedFiles.size === 0) return;

        const fileCount = this.selectedFiles.size;
        const fileList = Array.from(this.selectedFiles).join(', ');

        if (!confirm(`Delete ${fileCount} item(s)?\n\n${fileList}\n\nThis action cannot be undone.`)) {
            return;
        }

        this.performFileOperation('delete', {
            path: this.currentPath,
            files: Array.from(this.selectedFiles)
        });
    }

    static renameSelected() {
        if (this.selectedFiles.size !== 1) {
            this.showNotification('Please select exactly one item to rename', 'warning');
            return;
        }

        const filename = Array.from(this.selectedFiles)[0];
        const newName = prompt('Enter new name:', filename);

        if (!newName || newName.trim() === '' || newName === filename) return;

        this.performFileOperation('rename', {
            path: this.currentPath,
            old_name: filename,
            new_name: newName.trim()
        });
    }

    static async downloadSelected() {
        if (this.selectedFiles.size === 0) return;

        for (const filename of this.selectedFiles) {
            try {
                const fullPath = this.getFullPath(filename);
                const response = await fetch(`/api/files/download/${encodeURIComponent(fullPath)}`);

                if (response.ok) {
                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = filename;
                    a.click();
                    window.URL.revokeObjectURL(url);
                } else {
                    this.showNotification(`Failed to download ${filename}`, 'error');
                }
            } catch (error) {
                this.showNotification(`Download error: ${error.message}`, 'error');
            }
        }
    }

    static showProperties() {
        if (this.selectedFiles.size !== 1) {
            this.showNotification('Please select exactly one item to view properties', 'warning');
            return;
        }

        const filename = Array.from(this.selectedFiles)[0];
        const fileItem = this.currentWindow.querySelector(`[data-filename="${filename}"]`);
        const type = fileItem.dataset.type;
        const size = fileItem.dataset.size;

        const modal = this.currentWindow.querySelector('#fm-properties-modal');
        const content = this.currentWindow.querySelector('#fm-properties-content');

        content.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 15px;">
                <div style="display: flex; align-items: center; gap: 15px;">
                    <div style="font-size: 48px;">${this.getFileIconHtml({ name: filename, type })}</div>
                    <div>
                        <h4 style="margin: 0 0 5px 0;">${filename}</h4>
                        <p style="margin: 0; color: #6c757d;">${type === 'folder' ? 'Folder' : 'File'}</p>
                    </div>
                </div>
                <hr>
                <div style="display: grid; grid-template-columns: 120px 1fr; gap: 10px; font-size: 14px;">
                    <strong>Name:</strong> <span>${filename}</span>
                    <strong>Type:</strong> <span>${type === 'folder' ? 'Folder' : 'File'}</span>
                    <strong>Size:</strong> <span>${type === 'folder' ? '—' : this.formatFileSize(parseInt(size) || 0)}</span>
                    <strong>Location:</strong> <span>/${this.currentPath}</span>
                    <strong>Full Path:</strong> <span>/${this.getFullPath(filename)}</span>
                </div>
            </div>
        `;

        modal.classList.add('show');
    }

    static closeModal() {
        const modals = this.currentWindow.querySelectorAll('.modal');
        modals.forEach(modal => modal.classList.remove('show'));
    }

    // File operation helper
    static async performFileOperation(operation, params) {
        try {
            this.updateStatus(`Performing ${operation}...`);

            const response = await fetch('/api/files/operation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ operation, ...params })
            });

            const data = await response.json();

            if (response.ok) {
                this.showNotification(data.message || 'Operation completed successfully', 'success');
                await this.refresh();
            } else {
                this.showNotification(data.error || 'Operation failed', 'error');
            }
        } catch (error) {
            this.showNotification('Operation error: ' + error.message, 'error');
        } finally {
            this.updateStatus('Ready');
        }
    }

    // Context menu
    static showContextMenu(x, y, type) {
        this.hideContextMenu();

        const menuId = type === 'file' ? '#fm-context-menu' : '#fm-empty-context-menu';
        const menu = this.currentWindow.querySelector(menuId);

        if (!menu) return;

        // Update menu items based on current state
        this.updateContextMenuItems(menu, type);

        // Position menu
        menu.style.left = Math.min(x, window.innerWidth - 200) + 'px';
        menu.style.top = Math.min(y, window.innerHeight - 300) + 'px';
        menu.style.display = 'block';

        // Hide menu on outside click
        setTimeout(() => {
            document.addEventListener('click', () => this.hideContextMenu(), { once: true });
        }, 100);
    }

    static updateContextMenuItems(menu, type) {
        // Enable/disable paste based on clipboard
        const pasteItem = menu.querySelector('[data-action="paste"]');
        if (pasteItem) {
            if (this.clipboard.files.length > 0 && this.isWritable) {
                pasteItem.classList.remove('disabled');
            } else {
                pasteItem.classList.add('disabled');
            }
        }

        // Disable certain actions in read-only directories
        if (!this.isWritable && type === 'empty') {
            ['new-folder', 'upload'].forEach(action => {
                const item = menu.querySelector(`[data-action="${action}"]`);
                if (item) item.classList.add('disabled');
            });
        }

        // Disable actions that require selection
        if (type === 'file' && this.selectedFiles.size === 0) {
            ['cut', 'copy', 'delete', 'rename', 'download', 'properties'].forEach(action => {
                const item = menu.querySelector(`[data-action="${action}"]`);
                if (item) item.classList.add('disabled');
            });
        }
    }

    static hideContextMenu() {
        const menus = this.currentWindow.querySelectorAll('.context-menu-file');
        menus.forEach(menu => {
            menu.style.display = 'none';
        });
    }

    static executeContextAction(action) {
        switch (action) {
            case 'open':
                if (this.selectedFiles.size === 1) {
                    const filename = Array.from(this.selectedFiles)[0];
                    const item = this.currentWindow.querySelector(`[data-filename="${filename}"]`);
                    this.openFile(filename, item.dataset.type);
                }
                break;
            case 'cut':
                this.cutSelected();
                break;
            case 'copy':
                this.copySelected();
                break;
            case 'paste':
                this.paste();
                break;
            case 'delete':
                this.deleteSelected();
                break;
            case 'rename':
                this.renameSelected();
                break;
            case 'download':
                this.downloadSelected();
                break;
            case 'properties':
                this.showProperties();
                break;
            case 'new-folder':
                this.createFolder();
                break;
            case 'upload':
                this.uploadFile();
                break;
            case 'refresh':
                this.refresh();
                break;
        }
    }

    // UI update methods
    static updateUI() {
        this.updateBreadcrumb();
        this.updateNavigationButtons();
        this.updateTitle();
    }

    static updateBreadcrumb() {
        const breadcrumb = this.currentWindow.querySelector('#fm-breadcrumb');
        const pathParts = this.currentPath.split('/').filter(part => part);

        let html = '';
        let currentPath = '';

        pathParts.forEach((part, index) => {
            currentPath += (index === 0 ? '' : '/') + part;
            const isLast = index === pathParts.length - 1;

            if (isLast) {
                html += `<span class="breadcrumb-item active">${this.formatPathPart(part)}</span>`;
            } else {
                html += `<span class="breadcrumb-item" onclick="FileManager.navigateToPath('${currentPath}')">${this.formatPathPart(part)}</span>`;
                html += `<span class="breadcrumb-separator">/</span>`;
            }
        });

        breadcrumb.innerHTML = html;
    }

    static formatPathPart(part) {
        const formatMap = {
            'home': '🏠 Home',
            'public': '🌐 Public',
            'shared': '👥 Shared',
            'Documents': '📄 Documents',
            'Downloads': '📥 Downloads',
            'Pictures': '🖼️ Pictures',
            'Music': '🎵 Music',
            'Desktop': '🖥️ Desktop'
        };

        return formatMap[part] || part;
    }

    static updateNavigationButtons() {
        const backBtn = this.currentWindow.querySelector('#fm-back-btn');
        const forwardBtn = this.currentWindow.querySelector('#fm-forward-btn');
        const upBtn = this.currentWindow.querySelector('#fm-up-btn');

        backBtn.disabled = this.pathHistory.length === 0;
        forwardBtn.disabled = this.forwardHistory.length === 0;
        upBtn.disabled = this.currentPath.split('/').length <= 1;
    }

    static updateTitle() {
        // Update window title based on current path
        const windowTitle = this.currentWindow.querySelector('.window-title');
        if (windowTitle) {
            if (this.currentPath.startsWith('public/')) {
                windowTitle.textContent = 'File Manager - Public Files';
            } else if (this.currentPath.startsWith('shared/')) {
                windowTitle.textContent = 'File Manager - Shared Files';
            } else {
                windowTitle.textContent = 'File Manager - Home Directory';
            }
        }
    }

    static updateSelectionInfo() {
        const selectionInfo = this.currentWindow.querySelector('#fm-selection-info');
        const selectedCount = this.currentWindow.querySelector('#fm-selected-count');

        if (this.selectedFiles.size > 0) {
            selectionInfo.textContent = `${this.selectedFiles.size} selected`;
            selectedCount.textContent = `${this.selectedFiles.size} selected`;
        } else {
            selectionInfo.textContent = '';
            selectedCount.textContent = '';
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

    static updateSort() {
        const sortSelect = this.currentWindow.querySelector('#fm-sort-select');
        this.sortBy = sortSelect.value;
        // Toggle direction if same sort
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        this.refresh();
    }

    static updateClipboardButtons() {
        const pasteItems = this.currentWindow.querySelectorAll('[data-action="paste"]');
        pasteItems.forEach(item => {
            if (this.clipboard.files.length > 0 && this.isWritable) {
                item.classList.remove('disabled');
            } else {
                item.classList.add('disabled');
            }
        });
    }

    static async updateStorageInfo() {
        try {
            const response = await fetch('/api/files/storage-info');
            const data = await response.json();

            if (response.ok) {
                const usedPercent = data.total > 0 ? (data.used / data.total) * 100 : 0;

                const storageBar = this.currentWindow.querySelector('#fm-storage-bar');
                const storageUsed = this.currentWindow.querySelector('#fm-storage-used');
                const storageTotal = this.currentWindow.querySelector('#fm-storage-total');

                if (storageBar) storageBar.style.width = usedPercent + '%';
                if (storageUsed) storageUsed.textContent = this.formatFileSize(data.used);
                if (storageTotal) storageTotal.textContent = this.formatFileSize(data.total);
            }
        } catch (error) {
            console.error('Failed to load storage info:', error);
        }
    }

    // View controls
    static toggleView() {
        const fileList = this.currentWindow.querySelector('#fm-file-list');
        const viewBtn = this.currentWindow.querySelector('#fm-view-btn');

        if (this.viewMode === 'grid') {
            this.viewMode = 'list';
            fileList.classList.add('list-view');
            viewBtn.innerHTML = '<i class="fas fa-th"></i>';
        } else {
            this.viewMode = 'grid';
            fileList.classList.remove('list-view');
            viewBtn.innerHTML = '<i class="fas fa-list"></i>';
        }
    }

    static toggleSidebar() {
        const sidebar = this.currentWindow.querySelector('#fm-sidebar');
        const sidebarBtn = this.currentWindow.querySelector('#fm-sidebar-btn');

        this.sidebarVisible = !this.sidebarVisible;

        if (this.sidebarVisible) {
            sidebar.classList.remove('hidden');
            sidebarBtn.classList.remove('active');
        } else {
            sidebar.classList.add('hidden');
            sidebarBtn.classList.add('active');
        }
    }

    // Utility methods
    static formatFileSize(bytes) {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
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
            <div class="empty-folder" style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                <div style="font-size: 64px; margin-bottom: 20px; opacity: 0.5; color: #dc3545;">⚠️</div>
                <div style="font-size: 18px; margin-bottom: 10px; color: #dc3545;">Error Loading Directory</div>
                <div style="font-size: 14px; opacity: 0.8; color: #6c757d;">${message}</div>
            </div>
        `;
    }

    static showNotification(message, type = 'info') {
        if (window.Notification) {
            window.Notification[type](message);
        } else {
            alert(message);
        }
    }

    static onClose(windowElement) {
        this.currentWindow = null;
        return true;
    }
}

window.EmberFrame.registerApp('file-manager', FileManager);