/**
 * APP_METADATA
 * @name Admin Panel
 * @icon fas fa-shield-alt
 * @description Comprehensive administrative tools for user and system management
 * @category Administration
 * @version 2.0.0
 * @author EmberFrame Team
 * @enabled true
 */

class AdminPanel {
    static createWindow() {
        return {
            title: 'EmberFrame Administration Panel',
            width: '900px',
            height: '700px',
            autoSize: false,
            content: `
                <div class="admin-panel">
                    <div class="admin-header">
                        <h2>🛡️ EmberFrame Administration</h2>
                        <p>Complete system and user management dashboard</p>
                    </div>

                    <div class="admin-tabs">
                        <button class="admin-tab active" onclick="AdminPanel.switchTab('users')">
                            👥 User Management
                        </button>
                        <button class="admin-tab" onclick="AdminPanel.switchTab('files')">
                            📁 File Management
                        </button>
                        <button class="admin-tab" onclick="AdminPanel.switchTab('system')">
                            ⚙️ System Info
                        </button>
                        <button class="admin-tab" onclick="AdminPanel.switchTab('logs')">
                            📊 Activity Logs
                        </button>
                        <button class="admin-tab" onclick="AdminPanel.switchTab('settings')">
                            🔧 Admin Settings
                        </button>
                    </div>

                    <!-- Users Tab -->
                    <div class="admin-tab-content" id="users-tab">
                        <div class="users-section">
                            <div class="section-header">
                                <h3>👥 User Management</h3>
                                <div class="section-actions">
                                    <button class="btn btn-primary" onclick="AdminPanel.showCreateUserModal()">
                                        <i class="fas fa-plus"></i> Create User
                                    </button>
                                    <button class="btn btn-secondary" onclick="AdminPanel.refreshUsers()">
                                        <i class="fas fa-sync-alt"></i> Refresh
                                    </button>
                                </div>
                            </div>

                            <div class="user-search">
                                <input type="text" id="user-search" placeholder="Search users..." onkeyup="AdminPanel.filterUsers()">
                            </div>

                            <div class="users-list" id="users-list">
                                <div class="loading">Loading users...</div>
                            </div>

                            <div class="user-stats-cards">
                                <div class="stat-card">
                                    <div class="stat-value" id="total-users-count">0</div>
                                    <div class="stat-label">Total Users</div>
                                </div>
                                <div class="stat-card">
                                    <div class="stat-value" id="active-users-count">0</div>
                                    <div class="stat-label">Active Users</div>
                                </div>
                                <div class="stat-card">
                                    <div class="stat-value" id="admin-users-count">0</div>
                                    <div class="stat-label">Administrators</div>
                                </div>
                                <div class="stat-card">
                                    <div class="stat-value" id="new-users-count">0</div>
                                    <div class="stat-label">New This Week</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Files Tab -->
                    <div class="admin-tab-content" id="files-tab" style="display: none;">
                        <div class="files-section">
                            <div class="section-header">
                                <h3>📁 File System Management</h3>
                                <div class="section-actions">
                                    <button class="btn btn-primary" onclick="AdminPanel.uploadToPublic()">
                                        <i class="fas fa-upload"></i> Upload to Public
                                    </button>
                                    <button class="btn btn-secondary" onclick="AdminPanel.cleanupFiles()">
                                        <i class="fas fa-broom"></i> Cleanup
                                    </button>
                                </div>
                            </div>

                            <div class="file-stats-row">
                                <div class="file-stat">
                                    <div class="stat-number" id="public-files-count">0</div>
                                    <div class="stat-text">Public Files</div>
                                </div>
                                <div class="file-stat">
                                    <div class="stat-number" id="total-storage-used">0 MB</div>
                                    <div class="stat-text">Storage Used</div>
                                </div>
                                <div class="file-stat">
                                    <div class="stat-number" id="user-directories-count">0</div>
                                    <div class="stat-text">User Directories</div>
                                </div>
                            </div>

                            <div class="file-management-tabs">
                                <button class="file-tab active" onclick="AdminPanel.switchFileTab('public')">
                                    🌐 Public Files
                                </button>
                                <button class="file-tab" onclick="AdminPanel.switchFileTab('users')">
                                    👤 User Files
                                </button>
                                <button class="file-tab" onclick="AdminPanel.switchFileTab('system')">
                                    🔧 System Files
                                </button>
                            </div>

                            <div class="file-content" id="file-management-content">
                                <div class="loading">Loading files...</div>
                            </div>
                        </div>
                    </div>

                    <!-- System Tab -->
                    <div class="admin-tab-content" id="system-tab" style="display: none;">
                        <div class="system-section">
                            <h3>⚙️ System Information</h3>
                            
                            <div class="system-grid">
                                <div class="system-card">
                                    <h4>🖥️ Server Status</h4>
                                    <div class="system-info">
                                        <div class="info-row">
                                            <span>Status:</span>
                                            <span class="status-online">Online</span>
                                        </div>
                                        <div class="info-row">
                                            <span>Uptime:</span>
                                            <span id="server-uptime">Loading...</span>
                                        </div>
                                        <div class="info-row">
                                            <span>Version:</span>
                                            <span>EmberFrame v2.0.0</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="system-card">
                                    <h4>💾 Storage Usage</h4>
                                    <div class="storage-info">
                                        <div class="storage-bar">
                                            <div class="storage-used" id="storage-bar" style="width: 35%"></div>
                                        </div>
                                        <div class="storage-text">
                                            <span id="storage-used">350 MB</span> / <span id="storage-total">1 GB</span> used
                                        </div>
                                    </div>
                                </div>

                                <div class="system-card">
                                    <h4>📊 Performance</h4>
                                    <div class="system-info">
                                        <div class="info-row">
                                            <span>Active Sessions:</span>
                                            <span id="active-sessions">0</span>
                                        </div>
                                        <div class="info-row">
                                            <span>Memory Usage:</span>
                                            <span id="memory-usage">Loading...</span>
                                        </div>
                                        <div class="info-row">
                                            <span>Load Average:</span>
                                            <span id="load-average">Loading...</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Logs Tab -->
                    <div class="admin-tab-content" id="logs-tab" style="display: none;">
                        <div class="logs-section">
                            <div class="section-header">
                                <h3>📊 Activity Logs</h3>
                                <div class="section-actions">
                                    <select id="log-filter">
                                        <option value="all">All Activities</option>
                                        <option value="login">Login/Logout</option>
                                        <option value="file">File Operations</option>
                                        <option value="admin">Admin Actions</option>
                                        <option value="error">Errors</option>
                                    </select>
                                    <button class="btn btn-secondary" onclick="AdminPanel.refreshLogs()">
                                        <i class="fas fa-sync-alt"></i> Refresh
                                    </button>
                                </div>
                            </div>

                            <div class="logs-container" id="logs-container">
                                <div class="loading">Loading activity logs...</div>
                            </div>
                        </div>
                    </div>

                    <!-- Settings Tab -->
                    <div class="admin-tab-content" id="settings-tab" style="display: none;">
                        <div class="settings-section">
                            <h3>🔧 Administrative Settings</h3>
                            
                            <div class="settings-groups">
                                <div class="settings-group">
                                    <h4>🔐 Security Settings</h4>
                                    <div class="setting-item">
                                        <label>
                                            <input type="checkbox" id="require-strong-passwords" checked>
                                            Require strong passwords
                                        </label>
                                    </div>
                                    <div class="setting-item">
                                        <label>
                                            <input type="checkbox" id="enable-registration" checked>
                                            Allow user registration
                                        </label>
                                    </div>
                                    <div class="setting-item">
                                        <label>
                                            Maximum login attempts:
                                            <input type="number" id="max-login-attempts" value="5" min="1" max="20">
                                        </label>
                                    </div>
                                </div>

                                <div class="settings-group">
                                    <h4>📁 File System Settings</h4>
                                    <div class="setting-item">
                                        <label>
                                            Default user quota (MB):
                                            <input type="number" id="user-quota" value="100" min="10" max="10000">
                                        </label>
                                    </div>
                                    <div class="setting-item">
                                        <label>
                                            <input type="checkbox" id="allow-public-uploads" checked>
                                            Allow users to upload to public folders
                                        </label>
                                    </div>
                                </div>

                                <div class="settings-group">
                                    <h4>📧 Notifications</h4>
                                    <div class="setting-item">
                                        <label>
                                            <input type="checkbox" id="notify-new-users" checked>
                                            Notify admins of new user registrations
                                        </label>
                                    </div>
                                    <div class="setting-item">
                                        <label>
                                            <input type="checkbox" id="notify-errors" checked>
                                            Notify admins of system errors
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div class="settings-actions">
                                <button class="btn btn-primary" onclick="AdminPanel.saveSettings()">
                                    <i class="fas fa-save"></i> Save Settings
                                </button>
                                <button class="btn btn-secondary" onclick="AdminPanel.resetSettings()">
                                    <i class="fas fa-undo"></i> Reset to Defaults
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- User Modal -->
                <div class="modal" id="user-modal">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3 id="modal-title">Create New User</h3>
                            <button class="modal-close" onclick="AdminPanel.closeModal()">&times;</button>
                        </div>
                        <div class="modal-body">
                            <form id="user-form">
                                <div class="form-group">
                                    <label for="user-username">Username:</label>
                                    <input type="text" id="user-username" required>
                                </div>
                                <div class="form-group">
                                    <label for="user-email">Email:</label>
                                    <input type="email" id="user-email">
                                </div>
                                <div class="form-group">
                                    <label for="user-password">Password:</label>
                                    <input type="password" id="user-password" required>
                                </div>
                                <div class="form-group">
                                    <label for="user-role">Role:</label>
                                    <select id="user-role">
                                        <option value="user">User</option>
                                        <option value="admin">Administrator</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>
                                        <input type="checkbox" id="user-active" checked>
                                        Active Account
                                    </label>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-primary" onclick="AdminPanel.saveUser()">
                                <i class="fas fa-save"></i> Save User
                            </button>
                            <button class="btn btn-secondary" onclick="AdminPanel.closeModal()">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>

                <!-- File Upload Modal -->
                <input type="file" id="file-upload-input" multiple style="display: none;">

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
                        border-bottom: 3px solid #3498db;
                    }

                    .admin-header h2 {
                        margin: 0 0 10px 0;
                        font-size: 24px;
                        font-weight: 700;
                    }

                    .admin-header p {
                        margin: 0;
                        opacity: 0.9;
                        font-size: 14px;
                    }

                    .admin-tabs {
                        display: flex;
                        background: #e9ecef;
                        border-bottom: 1px solid #dee2e6;
                        overflow-x: auto;
                    }

                    .admin-tab {
                        flex: 1;
                        min-width: 140px;
                        padding: 15px 20px;
                        border: none;
                        background: transparent;
                        cursor: pointer;
                        font-size: 13px;
                        font-weight: 600;
                        transition: all 0.3s ease;
                        border-bottom: 3px solid transparent;
                    }

                    .admin-tab:hover {
                        background: rgba(52, 152, 219, 0.1);
                        color: #3498db;
                    }

                    .admin-tab.active {
                        background: white;
                        color: #3498db;
                        border-bottom-color: #3498db;
                    }

                    .admin-tab-content {
                        flex: 1;
                        padding: 20px;
                        overflow-y: auto;
                    }

                    .section-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 20px;
                        padding-bottom: 15px;
                        border-bottom: 2px solid #e9ecef;
                    }

                    .section-header h3 {
                        margin: 0;
                        color: #2c3e50;
                        font-size: 20px;
                    }

                    .section-actions {
                        display: flex;
                        gap: 10px;
                    }

                    .btn {
                        padding: 8px 16px;
                        border: none;
                        border-radius: 6px;
                        cursor: pointer;
                        font-size: 14px;
                        font-weight: 500;
                        transition: all 0.3s ease;
                        display: inline-flex;
                        align-items: center;
                        gap: 6px;
                    }

                    .btn-primary {
                        background: #3498db;
                        color: white;
                    }

                    .btn-primary:hover {
                        background: #2980b9;
                        transform: translateY(-1px);
                    }

                    .btn-secondary {
                        background: #95a5a6;
                        color: white;
                    }

                    .btn-secondary:hover {
                        background: #7f8c8d;
                    }

                    .btn-danger {
                        background: #e74c3c;
                        color: white;
                    }

                    .btn-danger:hover {
                        background: #c0392b;
                    }

                    .btn-success {
                        background: #27ae60;
                        color: white;
                    }

                    .btn-success:hover {
                        background: #229954;
                    }

                    /* User Management Styles */
                    .user-search {
                        margin-bottom: 20px;
                    }

                    .user-search input {
                        width: 100%;
                        padding: 12px;
                        border: 1px solid #ddd;
                        border-radius: 6px;
                        font-size: 14px;
                    }

                    .users-list {
                        background: white;
                        border-radius: 8px;
                        border: 1px solid #e9ecef;
                        margin-bottom: 20px;
                        max-height: 400px;
                        overflow-y: auto;
                    }

                    .user-item {
                        display: flex;
                        align-items: center;
                        padding: 15px 20px;
                        border-bottom: 1px solid #f8f9fa;
                        transition: background 0.2s ease;
                    }

                    .user-item:hover {
                        background: #f8f9fa;
                    }

                    .user-item:last-child {
                        border-bottom: none;
                    }

                    .user-avatar {
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        background: #3498db;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white;
                        font-weight: bold;
                        margin-right: 15px;
                    }

                    .user-info {
                        flex: 1;
                    }

                    .user-name {
                        font-weight: 600;
                        color: #2c3e50;
                        margin-bottom: 4px;
                    }

                    .user-details {
                        font-size: 12px;
                        color: #7f8c8d;
                        display: flex;
                        gap: 15px;
                    }

                    .user-actions {
                        display: flex;
                        gap: 8px;
                    }

                    .user-actions .btn {
                        padding: 6px 12px;
                        font-size: 12px;
                    }

                    .user-status {
                        padding: 4px 8px;
                        border-radius: 12px;
                        font-size: 11px;
                        font-weight: 500;
                        text-transform: uppercase;
                    }

                    .user-status.active {
                        background: #d4edda;
                        color: #155724;
                    }

                    .user-status.inactive {
                        background: #f8d7da;
                        color: #721c24;
                    }

                    .user-status.admin {
                        background: #fff3cd;
                        color: #856404;
                    }

                    .user-stats-cards {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                        gap: 20px;
                    }

                    .stat-card {
                        background: white;
                        padding: 20px;
                        border-radius: 10px;
                        border: 1px solid #e9ecef;
                        text-align: center;
                        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                        transition: transform 0.2s ease;
                    }

                    .stat-card:hover {
                        transform: translateY(-2px);
                    }

                    .stat-value {
                        font-size: 32px;
                        font-weight: 700;
                        color: #3498db;
                        margin-bottom: 8px;
                    }

                    .stat-label {
                        font-size: 14px;
                        color: #7f8c8d;
                        text-transform: uppercase;
                        font-weight: 500;
                    }

                    /* File Management Styles */
                    .file-stats-row {
                        display: flex;
                        gap: 20px;
                        margin-bottom: 20px;
                    }

                    .file-stat {
                        flex: 1;
                        background: white;
                        padding: 20px;
                        border-radius: 8px;
                        border: 1px solid #e9ecef;
                        text-align: center;
                    }

                    .stat-number {
                        font-size: 24px;
                        font-weight: 700;
                        color: #2c3e50;
                        margin-bottom: 5px;
                    }

                    .stat-text {
                        font-size: 12px;
                        color: #7f8c8d;
                        text-transform: uppercase;
                    }

                    .file-management-tabs {
                        display: flex;
                        gap: 5px;
                        margin-bottom: 20px;
                    }

                    .file-tab {
                        padding: 10px 20px;
                        border: 1px solid #ddd;
                        background: white;
                        cursor: pointer;
                        border-radius: 6px 6px 0 0;
                        font-size: 14px;
                        transition: all 0.2s ease;
                    }

                    .file-tab.active {
                        background: #3498db;
                        color: white;
                        border-color: #3498db;
                    }

                    .file-content {
                        background: white;
                        border-radius: 0 8px 8px 8px;
                        border: 1px solid #e9ecef;
                        min-height: 300px;
                        padding: 20px;
                    }

                    /* System Info Styles */
                    .system-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                        gap: 20px;
                    }

                    .system-card {
                        background: white;
                        padding: 20px;
                        border-radius: 10px;
                        border: 1px solid #e9ecef;
                        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                    }

                    .system-card h4 {
                        margin: 0 0 15px 0;
                        color: #2c3e50;
                        font-size: 16px;
                        border-bottom: 2px solid #ecf0f1;
                        padding-bottom: 10px;
                    }

                    .system-info {
                        display: flex;
                        flex-direction: column;
                        gap: 10px;
                    }

                    .info-row {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 8px 0;
                        border-bottom: 1px solid #f8f9fa;
                    }

                    .status-online {
                        color: #27ae60;
                        font-weight: 600;
                    }

                    .storage-bar {
                        width: 100%;
                        height: 20px;
                        background: #ecf0f1;
                        border-radius: 10px;
                        overflow: hidden;
                        margin-bottom: 10px;
                    }

                    .storage-used {
                        height: 100%;
                        background: linear-gradient(90deg, #27ae60, #2ecc71);
                        transition: width 0.3s ease;
                    }

                    .storage-text {
                        text-align: center;
                        font-size: 14px;
                        color: #7f8c8d;
                    }

                    /* Logs Styles */
                    .logs-container {
                        background: white;
                        border-radius: 8px;
                        border: 1px solid #e9ecef;
                        max-height: 500px;
                        overflow-y: auto;
                    }

                    .log-entry {
                        padding: 12px 20px;
                        border-bottom: 1px solid #f8f9fa;
                        display: flex;
                        align-items: center;
                        gap: 15px;
                    }

                    .log-time {
                        font-size: 12px;
                        color: #7f8c8d;
                        min-width: 120px;
                    }

                    .log-icon {
                        width: 20px;
                        text-align: center;
                    }

                    .log-message {
                        flex: 1;
                        font-size: 14px;
                    }

                    .log-user {
                        font-size: 12px;
                        color: #3498db;
                        font-weight: 500;
                    }

                    /* Settings Styles */
                    .settings-groups {
                        display: flex;
                        flex-direction: column;
                        gap: 30px;
                        margin-bottom: 30px;
                    }

                    .settings-group {
                        background: white;
                        padding: 20px;
                        border-radius: 8px;
                        border: 1px solid #e9ecef;
                    }

                    .settings-group h4 {
                        margin: 0 0 15px 0;
                        color: #2c3e50;
                        border-bottom: 2px solid #ecf0f1;
                        padding-bottom: 10px;
                    }

                    .setting-item {
                        margin-bottom: 15px;
                    }

                    .setting-item label {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        font-size: 14px;
                        color: #2c3e50;
                    }

                    .setting-item input[type="checkbox"] {
                        width: 16px;
                        height: 16px;
                    }

                    .setting-item input[type="number"] {
                        padding: 6px 10px;
                        border: 1px solid #ddd;
                        border-radius: 4px;
                        width: 80px;
                    }

                    .settings-actions {
                        display: flex;
                        gap: 15px;
                        justify-content: flex-end;
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
                        color: #2c3e50;
                    }

                    .modal-close {
                        background: none;
                        border: none;
                        font-size: 24px;
                        cursor: pointer;
                        color: #7f8c8d;
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

                    .form-group {
                        margin-bottom: 20px;
                    }

                    .form-group label {
                        display: block;
                        margin-bottom: 8px;
                        font-weight: 600;
                        color: #2c3e50;
                    }

                    .form-group input,
                    .form-group select {
                        width: 100%;
                        padding: 10px;
                        border: 1px solid #ddd;
                        border-radius: 6px;
                        font-size: 14px;
                    }

                    .form-group input:focus,
                    .form-group select:focus {
                        outline: none;
                        border-color: #3498db;
                        box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
                    }

                    .loading {
                        text-align: center;
                        padding: 40px;
                        color: #7f8c8d;
                        font-style: italic;
                    }

                    /* Responsive Design */
                    @media (max-width: 768px) {
                        .admin-tabs {
                            flex-direction: column;
                        }

                        .section-header {
                            flex-direction: column;
                            align-items: flex-start;
                            gap: 15px;
                        }

                        .user-stats-cards {
                            grid-template-columns: 1fr;
                        }

                        .file-stats-row {
                            flex-direction: column;
                        }

                        .system-grid {
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
        this.editingUserId = null;
        this.currentFileTab = 'public';

        this.checkAdminStatus().then(isAdmin => {
            if (isAdmin) {
                this.loadUsers();
                this.loadSystemInfo();
            }
        });
    }

    static async checkAdminStatus() {
        try {
            const response = await fetch('/api/admin/check');
            const data = await response.json();

            if (!data.is_admin) {
                this.showAccessDenied();
                return false;
            }
            return true;
        } catch (error) {
            console.error('Failed to check admin status:', error);
            this.showAccessDenied();
            return false;
        }
    }

    static showAccessDenied() {
        this.currentWindow.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 100%; text-align: center; color: #e74c3c; background: #f8f9fa;">
                <div>
                    <i class="fas fa-shield-alt" style="font-size: 64px; margin-bottom: 20px; opacity: 0.5;"></i>
                    <h2>Access Restricted</h2>
                    <p>This panel requires administrator privileges.</p>
                    <p>Please contact your system administrator.</p>
                </div>
            </div>
        `;
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
        switch(tabName) {
            case 'users':
                this.loadUsers();
                break;
            case 'files':
                this.loadFileManagement();
                break;
            case 'system':
                this.loadSystemInfo();
                break;
            case 'logs':
                this.loadLogs();
                break;
            case 'settings':
                this.loadSettings();
                break;
        }
    }

    // User Management Methods
    static async loadUsers() {
        const usersList = this.currentWindow.querySelector('#users-list');
        usersList.innerHTML = '<div class="loading">Loading users...</div>';

        try {
            const response = await fetch('/api/admin/users');
            const data = await response.json();

            if (response.ok) {
                this.displayUsers(data.users);
                this.updateUserStats(data.stats);
            } else {
                usersList.innerHTML = `<div style="color: #e74c3c; text-align: center; padding: 20px;">Error: ${data.error}</div>`;
            }
        } catch (error) {
            usersList.innerHTML = `<div style="color: #e74c3c; text-align: center; padding: 20px;">Network error: ${error.message}</div>`;
        }
    }

    static displayUsers(users) {
        const usersList = this.currentWindow.querySelector('#users-list');

        if (users.length === 0) {
            usersList.innerHTML = '<div style="text-align: center; color: #7f8c8d; padding: 40px;">No users found</div>';
            return;
        }

        usersList.innerHTML = users.map(user => `
            <div class="user-item" data-user-id="${user.id}">
                <div class="user-avatar">${user.username.charAt(0).toUpperCase()}</div>
                <div class="user-info">
                    <div class="user-name">${user.username}</div>
                    <div class="user-details">
                        <span>📧 ${user.email || 'No email'}</span>
                        <span>📅 Joined ${new Date(user.created_at).toLocaleDateString()}</span>
                        <span>🕒 Last active ${user.last_active ? new Date(user.last_active).toLocaleDateString() : 'Never'}</span>
                    </div>
                </div>
                <div class="user-status ${user.is_active ? 'active' : 'inactive'}">
                    ${user.is_active ? 'Active' : 'Inactive'}
                </div>
                ${user.is_admin ? '<div class="user-status admin">Admin</div>' : ''}
                <div class="user-actions">
                    <button class="btn btn-secondary" onclick="AdminPanel.editUser(${user.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-danger" onclick="AdminPanel.deleteUser(${user.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                    <button class="btn btn-primary" onclick="AdminPanel.loginAsUser(${user.id})">
                        <i class="fas fa-sign-in-alt"></i> Login As
                    </button>
                </div>
            </div>
        `).join('');
    }

    static updateUserStats(stats) {
        this.currentWindow.querySelector('#total-users-count').textContent = stats.total || 0;
        this.currentWindow.querySelector('#active-users-count').textContent = stats.active || 0;
        this.currentWindow.querySelector('#admin-users-count').textContent = stats.admins || 0;
        this.currentWindow.querySelector('#new-users-count').textContent = stats.new_this_week || 0;
    }

    static filterUsers() {
        const searchTerm = this.currentWindow.querySelector('#user-search').value.toLowerCase();
        const userItems = this.currentWindow.querySelectorAll('.user-item');

        userItems.forEach(item => {
            const username = item.querySelector('.user-name').textContent.toLowerCase();
            const email = item.querySelector('.user-details').textContent.toLowerCase();

            if (username.includes(searchTerm) || email.includes(searchTerm)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    }

    static showCreateUserModal() {
        this.editingUserId = null;
        this.currentWindow.querySelector('#modal-title').textContent = 'Create New User';
        this.currentWindow.querySelector('#user-form').reset();
        this.currentWindow.querySelector('#user-modal').classList.add('show');
    }

    static editUser(userId) {
        this.editingUserId = userId;
        // Load user data and populate form
        this.loadUserForEdit(userId);
        this.currentWindow.querySelector('#modal-title').textContent = 'Edit User';
        this.currentWindow.querySelector('#user-modal').classList.add('show');
    }

    static async loadUserForEdit(userId) {
        try {
            const response = await fetch(`/api/admin/users/${userId}`);
            const data = await response.json();

            if (response.ok) {
                const user = data.user;
                this.currentWindow.querySelector('#user-username').value = user.username;
                this.currentWindow.querySelector('#user-email').value = user.email || '';
                this.currentWindow.querySelector('#user-role').value = user.is_admin ? 'admin' : 'user';
                this.currentWindow.querySelector('#user-active').checked = user.is_active;
                this.currentWindow.querySelector('#user-password').value = ''; // Don't show existing password
            }
        } catch (error) {
            if (window.Notification) {
                window.Notification.error('Failed to load user data');
            }
        }
    }

    static async saveUser() {
        const form = this.currentWindow.querySelector('#user-form');
        const formData = new FormData(form);

        const userData = {
            username: this.currentWindow.querySelector('#user-username').value,
            email: this.currentWindow.querySelector('#user-email').value,
            password: this.currentWindow.querySelector('#user-password').value,
            is_admin: this.currentWindow.querySelector('#user-role').value === 'admin',
            is_active: this.currentWindow.querySelector('#user-active').checked
        };

        try {
            const url = this.editingUserId ? `/api/admin/users/${this.editingUserId}` : '/api/admin/users';
            const method = this.editingUserId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            if (response.ok) {
                if (window.Notification) {
                    window.Notification.success(this.editingUserId ? 'User updated successfully' : 'User created successfully');
                }
                this.closeModal();
                this.loadUsers();
            } else {
                if (window.Notification) {
                    window.Notification.error(data.error || 'Failed to save user');
                }
            }
        } catch (error) {
            if (window.Notification) {
                window.Notification.error('Network error: ' + error.message);
            }
        }
    }

    static async deleteUser(userId) {
        if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            return;
        }

        try {
            const response = await fetch(`/api/admin/users/${userId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                if (window.Notification) {
                    window.Notification.success('User deleted successfully');
                }
                this.loadUsers();
            } else {
                const data = await response.json();
                if (window.Notification) {
                    window.Notification.error(data.error || 'Failed to delete user');
                }
            }
        } catch (error) {
            if (window.Notification) {
                window.Notification.error('Network error: ' + error.message);
            }
        }
    }

    static async loginAsUser(userId) {
        if (!confirm('Login as this user? You will be logged out of your current session.')) {
            return;
        }

        try {
            const response = await fetch(`/api/admin/login-as/${userId}`, {
                method: 'POST'
            });

            if (response.ok) {
                if (window.Notification) {
                    window.Notification.info('Switching user session...');
                }
                setTimeout(() => {
                    window.location.href = '/';
                }, 1000);
            } else {
                const data = await response.json();
                if (window.Notification) {
                    window.Notification.error(data.error || 'Failed to switch user');
                }
            }
        } catch (error) {
            if (window.Notification) {
                window.Notification.error('Network error: ' + error.message);
            }
        }
    }

    static refreshUsers() {
        this.loadUsers();
    }

    static closeModal() {
        this.currentWindow.querySelector('#user-modal').classList.remove('show');
        this.editingUserId = null;
    }

    // File Management Methods
    static switchFileTab(tabName) {
        this.currentFileTab = tabName;

        this.currentWindow.querySelectorAll('.file-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        this.currentWindow.querySelector(`[onclick*="${tabName}"]`).classList.add('active');

        this.loadFileContent(tabName);
    }

    static async loadFileManagement() {
        this.loadFileStats();
        this.loadFileContent(this.currentFileTab);
    }

    static async loadFileStats() {
        try {
            const response = await fetch('/api/admin/file-stats');
            const data = await response.json();

            if (response.ok) {
                this.currentWindow.querySelector('#public-files-count').textContent = data.public_files || 0;
                this.currentWindow.querySelector('#total-storage-used').textContent = this.formatFileSize(data.total_storage || 0);
                this.currentWindow.querySelector('#user-directories-count').textContent = data.user_directories || 0;
            }
        } catch (error) {
            console.error('Failed to load file stats:', error);
        }
    }

    static async loadFileContent(type) {
        const content = this.currentWindow.querySelector('#file-management-content');
        content.innerHTML = '<div class="loading">Loading files...</div>';

        try {
            const response = await fetch(`/api/admin/files/${type}`);
            const data = await response.json();

            if (response.ok) {
                this.displayFileContent(data.files, type);
            } else {
                content.innerHTML = `<div style="color: #e74c3c; text-align: center;">Error: ${data.error}</div>`;
            }
        } catch (error) {
            content.innerHTML = `<div style="color: #e74c3c; text-align: center;">Network error: ${error.message}</div>`;
        }
    }

    static displayFileContent(files, type) {
        const content = this.currentWindow.querySelector('#file-management-content');

        if (files.length === 0) {
            content.innerHTML = '<div style="text-align: center; color: #7f8c8d;">No files found</div>';
            return;
        }

        content.innerHTML = files.map(file => `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; border-bottom: 1px solid #f0f0f0;">
                <div style="display: flex; align-items: center; gap: 10px;">
                    <i class="fas fa-${file.type === 'folder' ? 'folder' : 'file'}"></i>
                    <div>
                        <div style="font-weight: 500;">${file.name}</div>
                        <div style="font-size: 12px; color: #7f8c8d;">
                            ${file.size ? this.formatFileSize(file.size) : 'Folder'} • 
                            ${new Date(file.modified).toLocaleDateString()}
                            ${file.owner ? ` • Owner: ${file.owner}` : ''}
                        </div>
                    </div>
                </div>
                <div style="display: flex; gap: 5px;">
                    ${file.type === 'file' ? `
                        <button class="btn btn-secondary" onclick="AdminPanel.downloadFile('${file.path}')">
                            <i class="fas fa-download"></i>
                        </button>
                        <button class="btn btn-danger" onclick="AdminPanel.deleteFile('${file.path}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    ` : ''}
                </div>
            </div>
        `).join('');
    }

    static async uploadToPublic() {
        const input = this.currentWindow.querySelector('#file-upload-input');
        input.click();

        input.onchange = async (e) => {
            const files = e.target.files;
            if (files.length === 0) return;

            const formData = new FormData();
            for (let file of files) {
                formData.append('files', file);
            }

            try {
                const response = await fetch('/api/admin/upload-public', {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();

                if (response.ok) {
                    if (window.Notification) {
                        window.Notification.success(`${files.length} file(s) uploaded successfully`);
                    }
                    this.loadFileManagement();
                } else {
                    if (window.Notification) {
                        window.Notification.error(data.error || 'Upload failed');
                    }
                }
            } catch (error) {
                if (window.Notification) {
                    window.Notification.error('Upload error: ' + error.message);
                }
            }
        };
    }

    static async downloadFile(filePath) {
        try {
            const response = await fetch(`/api/admin/download/${encodeURIComponent(filePath)}`);
            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = filePath.split('/').pop();
                a.click();
                window.URL.revokeObjectURL(url);
            }
        } catch (error) {
            if (window.Notification) {
                window.Notification.error('Download failed: ' + error.message);
            }
        }
    }

    static async deleteFile(filePath) {
        if (!confirm(`Delete "${filePath}"? This action cannot be undone.`)) {
            return;
        }

        try {
            const response = await fetch(`/api/admin/files/${encodeURIComponent(filePath)}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                if (window.Notification) {
                    window.Notification.success('File deleted successfully');
                }
                this.loadFileContent(this.currentFileTab);
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

    static async cleanupFiles() {
        if (!confirm('Cleanup temporary and orphaned files? This may take a while.')) {
            return;
        }

        try {
            const response = await fetch('/api/admin/cleanup-files', {
                method: 'POST'
            });

            const data = await response.json();

            if (response.ok) {
                if (window.Notification) {
                    window.Notification.success(`Cleanup completed. ${data.files_cleaned} files removed.`);
                }
                this.loadFileManagement();
            } else {
                if (window.Notification) {
                    window.Notification.error(data.error || 'Cleanup failed');
                }
            }
        } catch (error) {
            if (window.Notification) {
                window.Notification.error('Cleanup error: ' + error.message);
            }
        }
    }

    // System Info Methods
    static async loadSystemInfo() {
        try {
            const response = await fetch('/api/admin/system-info');
            const data = await response.json();

            if (response.ok) {
                this.updateSystemInfo(data);
            }
        } catch (error) {
            console.error('Failed to load system info:', error);
        }
    }

    static updateSystemInfo(data) {
        if (data.uptime) {
            this.currentWindow.querySelector('#server-uptime').textContent = this.formatUptime(data.uptime);
        }
        if (data.storage) {
            const usedPercent = (data.storage.used / data.storage.total) * 100;
            this.currentWindow.querySelector('#storage-bar').style.width = usedPercent + '%';
            this.currentWindow.querySelector('#storage-used').textContent = this.formatFileSize(data.storage.used);
            this.currentWindow.querySelector('#storage-total').textContent = this.formatFileSize(data.storage.total);
        }
        if (data.sessions) {
            this.currentWindow.querySelector('#active-sessions').textContent = data.sessions.active || 0;
        }
        if (data.memory) {
            this.currentWindow.querySelector('#memory-usage').textContent = data.memory;
        }
        if (data.load) {
            this.currentWindow.querySelector('#load-average').textContent = data.load;
        }
    }

    // Logs Methods
    static async loadLogs() {
        const container = this.currentWindow.querySelector('#logs-container');
        container.innerHTML = '<div class="loading">Loading activity logs...</div>';

        try {
            const filter = this.currentWindow.querySelector('#log-filter')?.value || 'all';
            const response = await fetch(`/api/admin/logs?filter=${filter}`);
            const data = await response.json();

            if (response.ok) {
                this.displayLogs(data.logs);
            } else {
                container.innerHTML = `<div style="color: #e74c3c; text-align: center;">Error: ${data.error}</div>`;
            }
        } catch (error) {
            container.innerHTML = `<div style="color: #e74c3c; text-align: center;">Network error: ${error.message}</div>`;
        }
    }

    static displayLogs(logs) {
        const container = this.currentWindow.querySelector('#logs-container');

        if (logs.length === 0) {
            container.innerHTML = '<div style="text-align: center; color: #7f8c8d; padding: 40px;">No logs found</div>';
            return;
        }

        container.innerHTML = logs.map(log => `
            <div class="log-entry">
                <div class="log-time">${new Date(log.timestamp).toLocaleString()}</div>
                <div class="log-icon">
                    <i class="fas fa-${this.getLogIcon(log.type)}"></i>
                </div>
                <div class="log-message">${log.message}</div>
                <div class="log-user">${log.user || 'System'}</div>
            </div>
        `).join('');
    }

    static getLogIcon(type) {
        const icons = {
            'login': 'sign-in-alt',
            'logout': 'sign-out-alt',
            'file': 'file',
            'admin': 'shield-alt',
            'error': 'exclamation-triangle',
            'info': 'info-circle'
        };
        return icons[type] || 'circle';
    }

    static refreshLogs() {
        this.loadLogs();
    }

    // Settings Methods
    static async loadSettings() {
        try {
            const response = await fetch('/api/admin/settings');
            const data = await response.json();

            if (response.ok) {
                this.populateSettings(data.settings);
            }
        } catch (error) {
            console.error('Failed to load settings:', error);
        }
    }

    static populateSettings(settings) {
        Object.keys(settings).forEach(key => {
            const element = this.currentWindow.querySelector(`#${key.replace(/_/g, '-')}`);
            if (element) {
                if (element.type === 'checkbox') {
                    element.checked = settings[key];
                } else {
                    element.value = settings[key];
                }
            }
        });
    }

    static async saveSettings() {
        const settings = {};

        // Collect all setting values
        const settingElements = this.currentWindow.querySelectorAll('.setting-item input');
        settingElements.forEach(element => {
            const key = element.id.replace(/-/g, '_');
            if (element.type === 'checkbox') {
                settings[key] = element.checked;
            } else {
                settings[key] = element.value;
            }
        });

        try {
            const response = await fetch('/api/admin/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ settings })
            });

            if (response.ok) {
                if (window.Notification) {
                    window.Notification.success('Settings saved successfully');
                }
            } else {
                const data = await response.json();
                if (window.Notification) {
                    window.Notification.error(data.error || 'Failed to save settings');
                }
            }
        } catch (error) {
            if (window.Notification) {
                window.Notification.error('Network error: ' + error.message);
            }
        }
    }

    static resetSettings() {
        if (!confirm('Reset all settings to defaults? This action cannot be undone.')) {
            return;
        }

        // Reset form to default values
        this.currentWindow.querySelector('#require-strong-passwords').checked = true;
        this.currentWindow.querySelector('#enable-registration').checked = true;
        this.currentWindow.querySelector('#max-login-attempts').value = 5;
        this.currentWindow.querySelector('#user-quota').value = 100;
        this.currentWindow.querySelector('#allow-public-uploads').checked = true;
        this.currentWindow.querySelector('#notify-new-users').checked = true;
        this.currentWindow.querySelector('#notify-errors').checked = true;

        if (window.Notification) {
            window.Notification.info('Settings reset to defaults. Click Save to apply.');
        }
    }

    // Utility Methods
    static formatFileSize(bytes) {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    }

    static formatUptime(seconds) {
        const days = Math.floor(seconds / 86400);
        const hours = Math.floor((seconds % 86400) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);

        if (days > 0) {
            return `${days}d ${hours}h ${minutes}m`;
        } else if (hours > 0) {
            return `${hours}h ${minutes}m`;
        } else {
            return `${minutes}m`;
        }
    }

    static onClose(windowElement) {
        this.currentWindow = null;
        return true;
    }
}

window.AdminPanel = AdminPanel;