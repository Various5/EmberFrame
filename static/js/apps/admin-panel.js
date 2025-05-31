// Admin Panel for Public File Management
/**
 * APP_METADATA
 * @name Admin Panel
 * @icon fas fa-shield-alt
 * @description Administrative tools and file management
 * @category Administration
 * @version 1.0.0
 * @author EmberFrame Team
 * @enabled true
 */
class AdminPanel {
    static createWindow() {
        return {
            title: 'Admin Panel - Public File Management',
            width: '800px',
            height: '600px',
            autoSize: false,
            content: `
                <div class="admin-panel">
                    <div class="admin-header">
                        <h2>🔧 Administrator Panel</h2>
                        <p>Manage public files accessible to all users</p>
                    </div>

                    <div class="admin-tabs">
                        <button class="admin-tab active" onclick="AdminPanel.switchTab('upload')">
                            📤 Upload Files
                        </button>
                        <button class="admin-tab" onclick="AdminPanel.switchTab('manage')">
                            📁 Manage Files
                        </button>
                        <button class="admin-tab" onclick="AdminPanel.switchTab('users')">
                            👥 User Info
                        </button>
                    </div>

                    <!-- Upload Tab -->
                    <div class="admin-tab-content" id="upload-tab">
                        <div class="upload-section">
                            <h3>Upload to Public Directory</h3>
                            
                            <div class="upload-form">
                                <div class="form-group">
                                    <label>Target Directory:</label>
                                    <select id="target-directory">
                                        <option value="shared">Shared Files</option>
                                        <option value="documents">Documents</option>
                                        <option value="media">Media Files</option>
                                        <option value="software">Software</option>
                                    </select>
                                </div>

                                <div class="form-group">
                                    <label>Select Files:</label>
                                    <div class="file-upload-area" id="file-upload-area">
                                        <input type="file" id="file-input" multiple>
                                        <div class="upload-text">
                                            <i class="fas fa-cloud-upload-alt"></i>
                                            <p>Click to select files or drag & drop</p>
                                            <small>Maximum 16MB per file</small>
                                        </div>
                                    </div>
                                </div>

                                <div class="selected-files" id="selected-files"></div>

                                <button class="upload-button" id="upload-button" onclick="AdminPanel.uploadFiles()">
                                    Upload Files to Public Directory
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Manage Tab -->
                    <div class="admin-tab-content" id="manage-tab" style="display: none;">
                        <div class="manage-section">
                            <h3>Public Files Management</h3>
                            
                            <div class="directory-nav">
                                <button onclick="AdminPanel.loadPublicFiles('documents')">📄 Documents</button>
                                <button onclick="AdminPanel.loadPublicFiles('media')">🎵 Media</button>
                                <button onclick="AdminPanel.loadPublicFiles('software')">💾 Software</button>
                                <button onclick="AdminPanel.loadPublicFiles('shared')">📁 Shared</button>
                            </div>

                            <div class="file-list" id="public-file-list">
                                <div class="loading">Loading public files...</div>
                            </div>
                        </div>
                    </div>

                    <!-- Users Tab -->
                    <div class="admin-tab-content" id="users-tab" style="display: none;">
                        <div class="users-section">
                            <h3>User Management</h3>
                            <p>Basic user information and statistics</p>
                            
                            <div class="user-stats">
                                <div class="stat-card">
                                    <h4>Total Users</h4>
                                    <span id="total-users">Loading...</span>
                                </div>
                                <div class="stat-card">
                                    <h4>Active Sessions</h4>
                                    <span id="active-sessions">Loading...</span>
                                </div>
                                <div class="stat-card">
                                    <h4>Public Files</h4>
                                    <span id="public-file-count">Loading...</span>
                                </div>
                            </div>

                            <div class="recent-activity">
                                <h4>Recent Activity</h4>
                                <div id="recent-activity-list">
                                    <p>Activity tracking not implemented yet</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <style>
                    .admin-panel {
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        background: #f8f9fa;
                        font-family: 'Segoe UI', sans-serif;
                    }

                    .admin-header {
                        padding: 20px;
                        background: linear-gradient(135deg, #2c3e50, #34495e);
                        color: white;
                        text-align: center;
                    }

                    .admin-header h2 {
                        margin: 0 0 10px 0;
                        font-size: 24px;
                    }

                    .admin-header p {
                        margin: 0;
                        opacity: 0.9;
                    }

                    .admin-tabs {
                        display: flex;
                        background: #e9ecef;
                        border-bottom: 1px solid #dee2e6;
                    }

                    .admin-tab {
                        flex: 1;
                        padding: 15px 20px;
                        border: none;
                        background: transparent;
                        cursor: pointer;
                        font-size: 14px;
                        font-weight: 500;
                        transition: all 0.3s ease;
                    }

                    .admin-tab:hover {
                        background: rgba(0, 123, 255, 0.1);
                    }

                    .admin-tab.active {
                        background: white;
                        color: #007bff;
                        border-bottom: 3px solid #007bff;
                    }

                    .admin-tab-content {
                        flex: 1;
                        padding: 20px;
                        overflow-y: auto;
                    }

                    .upload-section h3 {
                        margin-bottom: 20px;
                        color: #333;
                    }

                    .form-group {
                        margin-bottom: 20px;
                    }

                    .form-group label {
                        display: block;
                        margin-bottom: 8px;
                        font-weight: 600;
                        color: #555;
                    }

                    .form-group select {
                        width: 100%;
                        padding: 10px;
                        border: 1px solid #ced4da;
                        border-radius: 6px;
                        font-size: 14px;
                    }

                    .file-upload-area {
                        border: 2px dashed #007bff;
                        border-radius: 10px;
                        padding: 40px 20px;
                        text-align: center;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        position: relative;
                        background: #f8f9ff;
                    }

                    .file-upload-area:hover {
                        border-color: #0056b3;
                        background: #e3f2fd;
                    }

                    .file-upload-area.dragover {
                        border-color: #28a745;
                        background: #e8f5e9;
                    }

                    .file-upload-area input[type="file"] {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        opacity: 0;
                        cursor: pointer;
                    }

                    .upload-text i {
                        font-size: 48px;
                        color: #007bff;
                        margin-bottom: 15px;
                    }

                    .upload-text p {
                        margin: 0 0 5px 0;
                        font-size: 16px;
                        color: #333;
                    }

                    .upload-text small {
                        color: #666;
                        font-size: 12px;
                    }

                    .selected-files {
                        margin: 20px 0;
                        padding: 15px;
                        background: white;
                        border-radius: 8px;
                        border: 1px solid #e9ecef;
                        display: none;
                    }

                    .selected-files.visible {
                        display: block;
                    }

                    .file-item {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 8px 0;
                        border-bottom: 1px solid #f0f0f0;
                    }

                    .file-item:last-child {
                        border-bottom: none;
                    }

                    .upload-button {
                        width: 100%;
                        padding: 15px;
                        background: #28a745;
                        color: white;
                        border: none;
                        border-radius: 8px;
                        font-size: 16px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: background 0.3s ease;
                    }

                    .upload-button:hover:not(:disabled) {
                        background: #218838;
                    }

                    .upload-button:disabled {
                        background: #6c757d;
                        cursor: not-allowed;
                    }

                    .directory-nav {
                        display: flex;
                        gap: 10px;
                        margin-bottom: 20px;
                        flex-wrap: wrap;
                    }

                    .directory-nav button {
                        padding: 10px 20px;
                        border: 1px solid #007bff;
                        background: white;
                        color: #007bff;
                        border-radius: 6px;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    }

                    .directory-nav button:hover {
                        background: #007bff;
                        color: white;
                    }

                    .file-list {
                        background: white;
                        border-radius: 8px;
                        border: 1px solid #e9ecef;
                        min-height: 300px;
                        padding: 20px;
                    }

                    .user-stats {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                        gap: 20px;
                        margin-bottom: 30px;
                    }

                    .stat-card {
                        background: white;
                        padding: 20px;
                        border-radius: 10px;
                        border: 1px solid #e9ecef;
                        text-align: center;
                        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                    }

                    .stat-card h4 {
                        margin: 0 0 10px 0;
                        color: #666;
                        font-size: 14px;
                        text-transform: uppercase;
                    }

                    .stat-card span {
                        font-size: 32px;
                        font-weight: 700;
                        color: #007bff;
                    }

                    .recent-activity {
                        background: white;
                        padding: 20px;
                        border-radius: 8px;
                        border: 1px solid #e9ecef;
                    }

                    .recent-activity h4 {
                        margin: 0 0 15px 0;
                        color: #333;
                    }

                    .loading {
                        text-align: center;
                        padding: 40px;
                        color: #666;
                    }

                    .file-list-item {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 10px;
                        border-bottom: 1px solid #f0f0f0;
                        transition: background 0.2s ease;
                    }

                    .file-list-item:hover {
                        background: #f8f9fa;
                    }

                    .file-info {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                    }

                    .file-actions {
                        display: flex;
                        gap: 5px;
                    }

                    .file-actions button {
                        padding: 5px 10px;
                        border: 1px solid #dc3545;
                        background: white;
                        color: #dc3545;
                        border-radius: 4px;
                        cursor: pointer;
                        font-size: 12px;
                    }

                    .file-actions button:hover {
                        background: #dc3545;
                        color: white;
                    }

                    @media (max-width: 768px) {
                        .admin-tabs {
                            flex-direction: column;
                        }

                        .directory-nav {
                            flex-direction: column;
                        }

                        .user-stats {
                            grid-template-columns: 1fr;
                        }
                    }
                </style>
            `,
            onInit: (windowElement) => {
                AdminPanel.init(windowElement);
            }
        };
    }

    static init(windowElement) {
        this.currentWindow = windowElement;
        this.selectedFiles = [];

        this.setupFileUpload();
        this.loadPublicFiles('shared');
        this.checkAdminStatus();
    }

    static switchTab(tabName) {
        // Update tab buttons
        this.currentWindow.querySelectorAll('.admin-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        this.currentWindow.querySelector(`[onclick*="${tabName}"]`).classList.add('active');

        // Update tab content
        this.currentWindow.querySelectorAll('.admin-tab-content').forEach(content => {
            content.style.display = 'none';
        });
        this.currentWindow.querySelector(`#${tabName}-tab`).style.display = 'block';

        // Load data for specific tabs
        if (tabName === 'users') {
            this.loadUserStats();
        }
    }

    static setupFileUpload() {
        const fileInput = this.currentWindow.querySelector('#file-input');
        const uploadArea = this.currentWindow.querySelector('#file-upload-area');
        const selectedFilesDiv = this.currentWindow.querySelector('#selected-files');

        // File input change
        fileInput.addEventListener('change', (e) => {
            this.handleFiles(e.target.files);
        });

        // Drag and drop
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            this.handleFiles(e.dataTransfer.files);
        });
    }

    static handleFiles(files) {
        this.selectedFiles = Array.from(files);
        this.displaySelectedFiles();
    }

    static displaySelectedFiles() {
        const selectedFilesDiv = this.currentWindow.querySelector('#selected-files');

        if (this.selectedFiles.length === 0) {
            selectedFilesDiv.classList.remove('visible');
            return;
        }

        selectedFilesDiv.classList.add('visible');
        selectedFilesDiv.innerHTML = `
            <h4>Selected Files (${this.selectedFiles.length})</h4>
            ${this.selectedFiles.map((file, index) => `
                <div class="file-item">
                    <span>📄 ${file.name} (${this.formatFileSize(file.size)})</span>
                    <button onclick="AdminPanel.removeFile(${index})" style="background: #dc3545; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer;">×</button>
                </div>
            `).join('')}
        `;
    }

    static removeFile(index) {
        this.selectedFiles.splice(index, 1);
        this.displaySelectedFiles();
    }

    static async uploadFiles() {
        if (this.selectedFiles.length === 0) {
            if (window.Notification) {
                window.Notification.error('Please select files to upload');
            }
            return;
        }

        const targetDirectory = this.currentWindow.querySelector('#target-directory').value;
        const uploadButton = this.currentWindow.querySelector('#upload-button');

        uploadButton.disabled = true;
        uploadButton.textContent = 'Uploading...';

        let successCount = 0;
        let failCount = 0;

        for (const file of this.selectedFiles) {
            try {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('directory', targetDirectory);

                const response = await fetch('/api/admin/public-files/upload', {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    successCount++;
                } else {
                    failCount++;
                    console.error(`Failed to upload ${file.name}`);
                }
            } catch (error) {
                failCount++;
                console.error(`Error uploading ${file.name}:`, error);
            }
        }

        // Reset UI
        uploadButton.disabled = false;
        uploadButton.textContent = 'Upload Files to Public Directory';
        this.selectedFiles = [];
        this.displaySelectedFiles();

        // Show results
        if (window.Notification) {
            if (successCount > 0) {
                window.Notification.success(`${successCount} file(s) uploaded successfully`);
            }
            if (failCount > 0) {
                window.Notification.error(`${failCount} file(s) failed to upload`);
            }
        }

        // Refresh file list if we're viewing the uploaded directory
        this.loadPublicFiles(targetDirectory);
    }

    static async loadPublicFiles(directory = 'shared') {
        const fileList = this.currentWindow.querySelector('#public-file-list');
        fileList.innerHTML = '<div class="loading">Loading files...</div>';

        try {
            const response = await fetch('/api/admin/public-files');
            const data = await response.json();

            if (response.ok) {
                this.displayPublicFiles(data.files);
            } else {
                fileList.innerHTML = `<div style="color: #dc3545; text-align: center;">Error: ${data.error}</div>`;
            }
        } catch (error) {
            fileList.innerHTML = `<div style="color: #dc3545; text-align: center;">Network error: ${error.message}</div>`;
        }
    }

    static displayPublicFiles(files) {
        const fileList = this.currentWindow.querySelector('#public-file-list');

        if (files.length === 0) {
            fileList.innerHTML = '<div style="text-align: center; color: #666;">No files found</div>';
            return;
        }

        fileList.innerHTML = files.map(file => `
            <div class="file-list-item">
                <div class="file-info">
                    <i class="fas fa-${file.type === 'folder' ? 'folder' : 'file-alt'}"></i>
                    <div>
                        <div style="font-weight: 500;">${file.name}</div>
                        <div style="font-size: 12px; color: #666;">
                            ${file.size ? this.formatFileSize(file.size) : 'Folder'} • 
                            ${new Date(file.modified).toLocaleDateString()}
                        </div>
                    </div>
                </div>
                <div class="file-actions">
                    ${file.type === 'file' ? `<button onclick="AdminPanel.deleteFile('${file.name}')">Delete</button>` : ''}
                </div>
            </div>
        `).join('');
    }

    static async deleteFile(filename) {
        if (!confirm(`Delete "${filename}" from public files?`)) {
            return;
        }

        try {
            const response = await fetch(`/api/admin/public-files/${filename}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                if (window.Notification) {
                    window.Notification.success('File deleted successfully');
                }
                this.loadPublicFiles();
            } else {
                const data = await response.json();
                if (window.Notification) {
                    window.Notification.error(data.error || 'Failed to delete file');
                }
            }
        } catch (error) {
            if (window.Notification) {
                window.Notification.error('Network error: ' + error.message);
            }
        }
    }

    static async loadUserStats() {
        // This would load user statistics
        this.currentWindow.querySelector('#total-users').textContent = '5';
        this.currentWindow.querySelector('#active-sessions').textContent = '2';
        this.currentWindow.querySelector('#public-file-count').textContent = '12';
    }

    static async checkAdminStatus() {
        try {
            const response = await fetch('/api/admin/check');
            const data = await response.json();

            if (!data.is_admin) {
                this.currentWindow.innerHTML = `
                    <div style="display: flex; align-items: center; justify-content: center; height: 100%; text-align: center; color: #dc3545;">
                        <div>
                            <i class="fas fa-lock" style="font-size: 48px; margin-bottom: 20px;"></i>
                            <h2>Access Denied</h2>
                            <p>Administrator privileges required to access this panel.</p>
                        </div>
                    </div>
                `;
            }
        } catch (error) {
            console.error('Failed to check admin status:', error);
        }
    }

    static formatFileSize(bytes) {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    }

    static onClose(windowElement) {
        this.currentWindow = null;
        return true;
    }
}

window.AdminPanel = AdminPanel;