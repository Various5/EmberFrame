/**
 * APP_METADATA
 * @name Admin Panel
 * @icon fas fa-shield-alt
 * @description Administrative tools for user and system management
 * @category Administration
 * @version 2.0.0
 * @author EmberFrame Team
 * @enabled true
 */

class AdminPanel {
    static createWindow() {
        return {
            title: 'EmberFrame Administration Panel',
            width: '1000px',
            height: '750px',
            autoSize: false,
            content: `
                <div class="admin-panel">
                    <div class="admin-header">
                        <h2>🛡️ EmberFrame Administration</h2>
                        <p>Complete system and user management dashboard</p>
                        <div class="admin-stats-bar" id="admin-stats-bar">
                            <div class="stat-item">
                                <span class="stat-value" id="header-users">0</span>
                                <span class="stat-label">Users</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-value" id="header-files">0</span>
                                <span class="stat-label">Files</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-value" id="header-storage">0 MB</span>
                                <span class="stat-label">Storage</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-value" id="header-uptime">0d</span>
                                <span class="stat-label">Uptime</span>
                            </div>
                        </div>
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
                                    <button class="btn btn-success" onclick="AdminPanel.backupDatabase()">
                                        <i class="fas fa-download"></i> Backup DB
                                    </button>
                                </div>
                            </div>

                            <div class="user-search">
                                <input type="text" id="user-search" placeholder="Search users..." onkeyup="AdminPanel.filterUsers()">
                                <div class="search-stats" id="search-stats"></div>
                            </div>

                            <div class="users-list" id="users-list">
                                <div class="loading">Loading users...</div>
                            </div>

                            <div class="user-stats-cards">
                                <div class="stat-card">
                                    <div class="stat-value" id="total-users-count">0</div>
                                    <div class="stat-label">Total Users</div>
                                    <div class="stat-trend" id="users-trend">+0 this week</div>
                                </div>
                                <div class="stat-card">
                                    <div class="stat-value" id="active-users-count">0</div>
                                    <div class="stat-label">Active Users</div>
                                    <div class="stat-trend" id="active-trend">Currently online</div>
                                </div>
                                <div class="stat-card">
                                    <div class="stat-value" id="admin-users-count">0</div>
                                    <div class="stat-label">Administrators</div>
                                    <div class="stat-trend">System admins</div>
                                </div>
                                <div class="stat-card">
                                    <div class="stat-value" id="new-users-count">0</div>
                                    <div class="stat-label">New This Week</div>
                                    <div class="stat-trend">Recent signups</div>
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
                                    <button class="btn btn-warning" onclick="AdminPanel.cleanupFiles()">
                                        <i class="fas fa-broom"></i> Cleanup Files
                                    </button>
                                    <button class="btn btn-secondary" onclick="AdminPanel.refreshFiles()">
                                        <i class="fas fa-sync-alt"></i> Refresh
                                    </button>
                                </div>
                            </div>

                            <div class="file-stats-row">
                                <div class="file-stat">
                                    <div class="stat-number" id="public-files-count">0</div>
                                    <div class="stat-text">Public Files</div>
                                    <div class="stat-progress">
                                        <div class="progress-bar" style="width: 60%"></div>
                                    </div>
                                </div>
                                <div class="file-stat">
                                    <div class="stat-number" id="total-storage-used">0 MB</div>
                                    <div class="stat-text">Storage Used</div>
                                    <div class="stat-progress">
                                        <div class="progress-bar" style="width: 35%"></div>
                                    </div>
                                </div>
                                <div class="file-stat">
                                    <div class="stat-number" id="user-directories-count">0</div>
                                    <div class="stat-text">User Directories</div>
                                    <div class="stat-progress">
                                        <div class="progress-bar" style="width: 80%"></div>
                                    </div>
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
                            <h3>⚙️ System Information & Performance</h3>
                            
                            <div class="system-grid">
                                <div class="system-card">
                                    <h4>🖥️ Server Status</h4>
                                    <div class="system-info">
                                        <div class="info-row">
                                            <span>Status:</span>
                                            <span class="status-online">
                                                <i class="fas fa-circle"></i> Online
                                            </span>
                                        </div>
                                        <div class="info-row">
                                            <span>Uptime:</span>
                                            <span id="server-uptime">Loading...</span>
                                        </div>
                                        <div class="info-row">
                                            <span>Version:</span>
                                            <span>EmberFrame v2.0.0</span>
                                        </div>
                                        <div class="info-row">
                                            <span>Python:</span>
                                            <span id="python-version">3.x</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="system-card">
                                    <h4>💾 Storage Usage</h4>
                                    <div class="storage-info">
                                        <div class="storage-visual">
                                            <div class="storage-circle">
                                                <div class="storage-text">
                                                    <div id="storage-percent">35%</div>
                                                    <div>Used</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="storage-details">
                                            <div class="storage-item">
                                                <span>Used:</span>
                                                <span id="storage-used">350 MB</span>
                                            </div>
                                            <div class="storage-item">
                                                <span>Total:</span>
                                                <span id="storage-total">1 GB</span>
                                            </div>
                                            <div class="storage-item">
                                                <span>Free:</span>
                                                <span id="storage-free">650 MB</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="system-card">
                                    <h4>📊 Performance Metrics</h4>
                                    <div class="system-info">
                                        <div class="info-row">
                                            <span>Active Sessions:</span>
                                            <span id="active-sessions">
                                                <i class="fas fa-users"></i> 0
                                            </span>
                                        </div>
                                        <div class="info-row">
                                            <span>Memory Usage:</span>
                                            <span id="memory-usage">Loading...</span>
                                        </div>
                                        <div class="info-row">
                                            <span>Load Average:</span>
                                            <span id="load-average">Loading...</span>
                                        </div>
                                        <div class="info-row">
                                            <span>Last Backup:</span>
                                            <span id="last-backup">Never</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="system-card">
                                    <h4>🔧 Quick Actions</h4>
                                    <div class="quick-actions">
                                        <button class="action-btn" onclick="AdminPanel.refreshSystemInfo()">
                                            <i class="fas fa-sync-alt"></i>
                                            <span>Refresh Stats</span>
                                        </button>
                                        <button class="action-btn" onclick="AdminPanel.backupDatabase()">
                                            <i class="fas fa-database"></i>
                                            <span>Backup Database</span>
                                        </button>
                                        <button class="action-btn" onclick="AdminPanel.cleanupFiles()">
                                            <i class="fas fa-broom"></i>
                                            <span>Cleanup Files</span>
                                        </button>
                                        <button class="action-btn" onclick="AdminPanel.viewLogs()">
                                            <i class="fas fa-file-alt"></i>
                                            <span>View Logs</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Logs Tab -->
                    <div class="admin-tab-content" id="logs-tab" style="display: none;">
                        <div class="logs-section">
                            <div class="section-header">
                                <h3>📊 Activity Logs & Monitoring</h3>
                                <div class="section-actions">
                                    <select id="log-filter" onchange="AdminPanel.filterLogs()">
                                        <option value="all">All Activities</option>
                                        <option value="login">Login/Logout</option>
                                        <option value="file">File Operations</option>
                                        <option value="admin">Admin Actions</option>
                                        <option value="error">Errors</option>
                                    </select>
                                    <button class="btn btn-secondary" onclick="AdminPanel.refreshLogs()">
                                        <i class="fas fa-sync-alt"></i> Refresh
                                    </button>
                                    <button class="btn btn-primary" onclick="AdminPanel.exportLogs()">
                                        <i class="fas fa-download"></i> Export
                                    </button>
                                </div>
                            </div>

                            <div class="logs-stats">
                                <div class="log-stat">
                                    <i class="fas fa-sign-in-alt"></i>
                                    <div>
                                        <div class="stat-number" id="login-count">0</div>
                                        <div class="stat-label">Logins Today</div>
                                    </div>
                                </div>
                                <div class="log-stat">
                                    <i class="fas fa-file-alt"></i>
                                    <div>
                                        <div class="stat-number" id="file-ops-count">0</div>
                                        <div class="stat-label">File Operations</div>
                                    </div>
                                </div>
                                <div class="log-stat">
                                    <i class="fas fa-shield-alt"></i>
                                    <div>
                                        <div class="stat-number" id="admin-ops-count">0</div>
                                        <div class="stat-label">Admin Actions</div>
                                    </div>
                                </div>
                                <div class="log-stat">
                                    <i class="fas fa-exclamation-triangle"></i>
                                    <div>
                                        <div class="stat-number" id="error-count">0</div>
                                        <div class="stat-label">Errors</div>
                                    </div>
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
                                        <label class="setting-label">
                                            <input type="checkbox" id="require-strong-passwords" checked>
                                            <span class="checkmark"></span>
                                            Require strong passwords (8+ chars, mixed case, numbers)
                                        </label>
                                    </div>
                                    <div class="setting-item">
                                        <label class="setting-label">
                                            <input type="checkbox" id="enable-registration" checked>
                                            <span class="checkmark"></span>
                                            Allow new user registration
                                        </label>
                                    </div>
                                    <div class="setting-item">
                                        <label class="number-setting">
                                            Maximum login attempts:
                                            <input type="number" id="max-login-attempts" value="5" min="1" max="20">
                                        </label>
                                    </div>
                                    <div class="setting-item">
                                        <label class="setting-label">
                                            <input type="checkbox" id="enable-2fa">
                                            <span class="checkmark"></span>
                                            Enable two-factor authentication (Future)
                                        </label>
                                    </div>
                                </div>

                                <div class="settings-group">
                                    <h4>📁 File System Settings</h4>
                                    <div class="setting-item">
                                        <label class="number-setting">
                                            Default user quota (MB):
                                            <input type="number" id="user-quota" value="100" min="10" max="10000">
                                        </label>
                                    </div>
                                    <div class="setting-item">
                                        <label class="setting-label">
                                            <input type="checkbox" id="allow-public-uploads" checked>
                                            <span class="checkmark"></span>
                                            Allow users to upload to public folders
                                        </label>
                                    </div>
                                    <div class="setting-item">
                                        <label class="number-setting">
                                            Maximum file size (MB):
                                            <input type="number" id="max-file-size" value="16" min="1" max="100">
                                        </label>
                                    </div>
                                </div>

                                <div class="settings-group">
                                    <h4>📧 System Notifications</h4>
                                    <div class="setting-item">
                                        <label class="setting-label">
                                            <input type="checkbox" id="notify-new-users" checked>
                                            <span class="checkmark"></span>
                                            Notify admins of new user registrations
                                        </label>
                                    </div>
                                    <div class="setting-item">
                                        <label class="setting-label">
                                            <input type="checkbox" id="notify-errors" checked>
                                            <span class="checkmark"></span>
                                            Notify admins of system errors
                                        </label>
                                    </div>
                                    <div class="setting-item">
                                        <label class="setting-label">
                                            <input type="checkbox" id="notify-logins">
                                            <span class="checkmark"></span>
                                            Notify admins of admin logins
                                        </label>
                                    </div>
                                </div>

                                <div class="settings-group">
                                    <h4>⚡ Performance Settings</h4>
                                    <div class="setting-item">
                                        <label class="setting-label">
                                            <input type="checkbox" id="enable-caching" checked>
                                            <span class="checkmark"></span>
                                            Enable file caching
                                        </label>
                                    </div>
                                    <div class="setting-item">
                                        <label class="number-setting">
                                            Session timeout (hours):
                                            <input type="number" id="session-timeout" value="24" min="1" max="168">
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
                                <button class="btn btn-warning" onclick="AdminPanel.exportSettings()">
                                    <i class="fas fa-download"></i> Export Config
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
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="user-username">Username *</label>
                                        <input type="text" id="user-username" required minlength="3">
                                        <div class="field-hint">3+ characters, alphanumeric</div>
                                    </div>
                                    <div class="form-group">
                                        <label for="user-email">Email</label>
                                        <input type="email" id="user-email">
                                        <div class="field-hint">Optional notification email</div>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="user-password">Password *</label>
                                        <input type="password" id="user-password" required minlength="6">
                                        <div class="field-hint">6+ characters minimum</div>
                                    </div>
                                    <div class="form-group">
                                        <label for="user-quota">Storage Quota (MB)</label>
                                        <input type="number" id="user-quota" value="100" min="1" max="10000">
                                        <div class="field-hint">User storage limit</div>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="user-role">Account Type</label>
                                        <select id="user-role">
                                            <option value="user">Standard User</option>
                                            <option value="admin">Administrator</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label class="checkbox-group">
                                            <input type="checkbox" id="user-active" checked>
                                            <span class="checkmark"></span>
                                            Active Account
                                        </label>
                                        <div class="field-hint">User can login and access system</div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-primary" onclick="AdminPanel.saveUser()">
                                <i class="fas fa-save"></i> <span id="save-btn-text">Create User</span>
                            </button>
                            <button class="btn btn-secondary" onclick="AdminPanel.closeModal()">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>

                <!-- File Upload Modal -->
                <input type="file" id="file-upload-input" multiple style="display: none;">

                <!-- Progress Modal -->
                <div class="modal" id="progress-modal">
                    <div class="modal-content progress-content">
                        <div class="progress-header">
                            <h3 id="progress-title">Processing...</h3>
                        </div>
                        <div class="progress-body">
                            <div class="progress-bar-container">
                                <div class="progress-bar-bg">
                                    <div class="progress-bar-fill" id="progress-bar-fill"></div>
                                </div>
                                <div class="progress-text" id="progress-text">0%</div>
                            </div>
                            <div class="progress-message" id="progress-message">Please wait...</div>
                        </div>
                    </div>
                </div>

                ${AdminPanel.getStyles()}
            `,
            onInit: (windowElement) => {
                AdminPanel.init(windowElement);
            }
        };
    }

    static getStyles() {
        return `
            <style>
                .admin-panel {
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                    font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
                    color: #2c3e50;
                }

                .admin-header {
                    padding: 25px 30px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    text-align: center;
                    border-bottom: 3px solid #5a67d8;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                }

                .admin-header h2 {
                    margin: 0 0 8px 0;
                    font-size: 28px;
                    font-weight: 700;
                    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
                }

                .admin-header p {
                    margin: 0 0 20px 0;
                    opacity: 0.9;
                    font-size: 16px;
                }

                .admin-stats-bar {
                    display: flex;
                    justify-content: center;
                    gap: 40px;
                    margin-top: 15px;
                }

                .admin-stats-bar .stat-item {
                    text-align: center;
                }

                .admin-stats-bar .stat-value {
                    display: block;
                    font-size: 24px;
                    font-weight: 700;
                    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
                }

                .admin-stats-bar .stat-label {
                    display: block;
                    font-size: 12px;
                    opacity: 0.8;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                .admin-tabs {
                    display: flex;
                    background: #e2e8f0;
                    border-bottom: 1px solid #cbd5e0;
                    overflow-x: auto;
                    box-shadow: inset 0 -2px 4px rgba(0,0,0,0.1);
                }

                .admin-tab {
                    flex: 1;
                    min-width: 180px;
                    padding: 18px 24px;
                    border: none;
                    background: transparent;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: 600;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    border-bottom: 3px solid transparent;
                    color: #4a5568;
                }

                .admin-tab:hover {
                    background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
                    color: #667eea;
                    transform: translateY(-1px);
                }

                .admin-tab.active {
                    background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
                    color: #667eea;
                    border-bottom-color: #667eea;
                    font-weight: 700;
                }

                .admin-tab-content {
                    flex: 1;
                    padding: 30px;
                    overflow-y: auto;
                    background: #f7fafc;
                }

                .section-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 30px;
                    padding-bottom: 20px;
                    border-bottom: 2px solid #e2e8f0;
                }

                .section-header h3 {
                    margin: 0;
                    color: #2d3748;
                    font-size: 24px;
                    font-weight: 700;
                }

                .section-actions {
                    display: flex;
                    gap: 12px;
                    flex-wrap: wrap;
                }

                .btn {
                    padding: 10px 20px;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: 600;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 16px rgba(0,0,0,0.2);
                }

                .btn-primary {
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    color: white;
                }

                .btn-secondary {
                    background: linear-gradient(135deg, #a0aec0, #718096);
                    color: white;
                }

                .btn-danger {
                    background: linear-gradient(135deg, #fc8181, #e53e3e);
                    color: white;
                }

                .btn-success {
                    background: linear-gradient(135deg, #68d391, #38a169);
                    color: white;
                }

                .btn-warning {
                    background: linear-gradient(135deg, #fbd38d, #ed8936);
                    color: white;
                }

                /* User Management Styles */
                .user-search {
                    margin-bottom: 25px;
                    position: relative;
                }

                .user-search input {
                    width: 100%;
                    padding: 15px 20px;
                    border: 2px solid #e2e8f0;
                    border-radius: 12px;
                    font-size: 16px;
                    transition: all 0.3s ease;
                    background: white;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                }

                .user-search input:focus {
                    outline: none;
                    border-color: #667eea;
                    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
                }

                .search-stats {
                    margin-top: 10px;
                    font-size: 14px;
                    color: #718096;
                }

                .users-list {
                    background: white;
                    border-radius: 12px;
                    border: 1px solid #e2e8f0;
                    margin-bottom: 30px;
                    max-height: 500px;
                    overflow-y: auto;
                    box-shadow: 0 4px 16px rgba(0,0,0,0.1);
                }

                .user-item {
                    display: flex;
                    align-items: center;
                    padding: 20px 25px;
                    border-bottom: 1px solid #f7fafc;
                    transition: all 0.3s ease;
                }

                .user-item:hover {
                    background: linear-gradient(135deg, #f7fafc, #edf2f7);
                    transform: translateX(5px);
                }

                .user-item:last-child {
                    border-bottom: none;
                }

                .user-avatar {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: bold;
                    margin-right: 20px;
                    font-size: 18px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                }

                .user-info {
                    flex: 1;
                }

                .user-name {
                    font-weight: 700;
                    color: #2d3748;
                    margin-bottom: 5px;
                    font-size: 16px;
                }

                .user-details {
                    font-size: 13px;
                    color: #718096;
                    display: flex;
                    gap: 20px;
                    flex-wrap: wrap;
                }

                .user-actions {
                    display: flex;
                    gap: 10px;
                    flex-wrap: wrap;
                }

                .user-actions .btn {
                    padding: 8px 16px;
                    font-size: 12px;
                }

                .user-status {
                    padding: 6px 12px;
                    border-radius: 20px;
                    font-size: 11px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    margin-right: 10px;
                }

                .user-status.active {
                    background: linear-gradient(135deg, #c6f6d5, #9ae6b4);
                    color: #22543d;
                }

                .user-status.inactive {
                    background: linear-gradient(135deg, #fed7d7, #fc8181);
                    color: #742a2a;
                }

                .user-status.admin {
                    background: linear-gradient(135deg, #fef5e7, #fbd38d);
                    color: #7b341e;
                }

                .user-stats-cards {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                    gap: 25px;
                }

                .stat-card {
                    background: white;
                    padding: 25px;
                    border-radius: 16px;
                    border: 1px solid #e2e8f0;
                    text-align: center;
                    box-shadow: 0 4px 16px rgba(0,0,0,0.1);
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                    overflow: hidden;
                }

                .stat-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 8px 32px rgba(0,0,0,0.15);
                }

                .stat-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 4px;
                    background: linear-gradient(135deg, #667eea, #764ba2);
                }

                .stat-value {
                    font-size: 36px;
                    font-weight: 700;
                    color: #667eea;
                    margin-bottom: 10px;
                    display: block;
                }

                .stat-label {
                    font-size: 14px;
                    color: #718096;
                    text-transform: uppercase;
                    font-weight: 600;
                    letter-spacing: 1px;
                    margin-bottom: 8px;
                }

                .stat-trend {
                    font-size: 12px;
                    color: #a0aec0;
                    font-style: italic;
                }

                /* File Management Styles */
                .file-stats-row {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 25px;
                    margin-bottom: 30px;
                }

                .file-stat {
                    background: white;
                    padding: 25px;
                    border-radius: 12px;
                    border: 1px solid #e2e8f0;
                    text-align: center;
                    box-shadow: 0 4px 16px rgba(0,0,0,0.1);
                    transition: transform 0.3s ease;
                }

                .file-stat:hover {
                    transform: translateY(-3px);
                }

                .stat-number {
                    font-size: 28px;
                    font-weight: 700;
                    color: #2d3748;
                    margin-bottom: 8px;
                }

                .stat-text {
                    font-size: 12px;
                    color: #718096;
                    text-transform: uppercase;
                    font-weight: 600;
                    margin-bottom: 15px;
                }

                .stat-progress {
                    height: 6px;
                    background: #e2e8f0;
                    border-radius: 3px;
                    overflow: hidden;
                }

                .progress-bar {
                    height: 100%;
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    transition: width 0.5s ease;
                }

                .file-management-tabs {
                    display: flex;
                    gap: 5px;
                    margin-bottom: 25px;
                }

                .file-tab {
                    padding: 12px 24px;
                    border: 2px solid #e2e8f0;
                    background: white;
                    cursor: pointer;
                    border-radius: 8px 8px 0 0;
                    font-size: 14px;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    color: #4a5568;
                }

                .file-tab:hover {
                    background: #f7fafc;
                    border-color: #cbd5e0;
                }

                .file-tab.active {
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    color: white;
                    border-color: #667eea;
                }

                .file-content {
                    background: white;
                    border-radius: 0 12px 12px 12px;
                    border: 1px solid #e2e8f0;
                    min-height: 400px;
                    padding: 25px;
                    box-shadow: 0 4px 16px rgba(0,0,0,0.1);
                }

                .file-list-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 15px 0;
                    border-bottom: 1px solid #f0f0f0;
                    transition: all 0.3s ease;
                }

                .file-list-item:hover {
                    background: #f7fafc;
                    padding-left: 10px;
                    border-radius: 8px;
                }

                .file-info {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    flex: 1;
                }

                .file-icon {
                    font-size: 24px;
                    color: #667eea;
                    width: 30px;
                    text-align: center;
                }

                .file-details h4 {
                    margin: 0 0 5px 0;
                    font-weight: 600;
                    color: #2d3748;
                }

                .file-meta {
                    font-size: 12px;
                    color: #718096;
                }

                .file-actions {
                    display: flex;
                    gap: 8px;
                }

                .file-actions .btn {
                    padding: 6px 12px;
                    font-size: 12px;
                }

                /* System Info Styles */
                .system-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
                    gap: 25px;
                }

                .system-card {
                    background: white;
                    padding: 25px;
                    border-radius: 16px;
                    border: 1px solid #e2e8f0;
                    box-shadow: 0 4px 16px rgba(0,0,0,0.1);
                    transition: transform 0.3s ease;
                }

                .system-card:hover {
                    transform: translateY(-3px);
                }

                .system-card h4 {
                    margin: 0 0 20px 0;
                    color: #2d3748;
                    font-size: 18px;
                    font-weight: 700;
                    border-bottom: 2px solid #e2e8f0;
                    padding-bottom: 15px;
                }

                .system-info {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }

                .info-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 12px 0;
                    border-bottom: 1px solid #f7fafc;
                }

                .info-row:last-child {
                    border-bottom: none;
                }

                .status-online {
                    color: #38a169;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .status-online i {
                    animation: pulse 2s infinite;
                }

                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }

                .storage-info {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                }

                .storage-visual {
                    flex-shrink: 0;
                }

                .storage-circle {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    background: conic-gradient(#667eea 0deg 126deg, #e2e8f0 126deg 360deg);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                }

                .storage-circle::before {
                    content: '';
                    position: absolute;
                    width: 60px;
                    height: 60px;
                    background: white;
                    border-radius: 50%;
                }

                .storage-text {
                    position: relative;
                    z-index: 1;
                    text-align: center;
                    font-size: 12px;
                    font-weight: 700;
                    color: #2d3748;
                }

                .storage-details {
                    flex: 1;
                }

                .storage-item {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 8px;
                    font-size: 14px;
                }

                .quick-actions {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 15px;
                }

                .action-btn {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                    padding: 20px;
                    background: #f7fafc;
                    border: 2px solid #e2e8f0;
                    border-radius: 12px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    text-align: center;
                }

                .action-btn:hover {
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    color: white;
                    transform: translateY(-2px);
                }

                .action-btn i {
                    font-size: 24px;
                }

                .action-btn span {
                    font-size: 12px;
                    font-weight: 600;
                }

                /* Logs Styles */
                .logs-stats {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 20px;
                    margin-bottom: 30px;
                }

                .log-stat {
                    background: white;
                    padding: 20px;
                    border-radius: 12px;
                    border: 1px solid #e2e8f0;
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    box-shadow: 0 4px 16px rgba(0,0,0,0.1);
                    transition: transform 0.3s ease;
                }

                .log-stat:hover {
                    transform: translateY(-2px);
                }

                .log-stat i {
                    font-size: 24px;
                    color: #667eea;
                }

                .log-stat .stat-number {
                    font-size: 24px;
                    font-weight: 700;
                    color: #2d3748;
                    margin-bottom: 2px;
                }

                .log-stat .stat-label {
                    font-size: 12px;
                    color: #718096;
                    text-transform: uppercase;
                }

                .logs-container {
                    background: white;
                    border-radius: 12px;
                    border: 1px solid #e2e8f0;
                    max-height: 600px;
                    overflow-y: auto;
                    box-shadow: 0 4px 16px rgba(0,0,0,0.1);
                }

                .log-entry {
                    padding: 15px 25px;
                    border-bottom: 1px solid #f7fafc;
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    transition: background 0.3s ease;
                }

                .log-entry:hover {
                    background: #f7fafc;
                }

                .log-time {
                    font-size: 12px;
                    color: #a0aec0;
                    min-width: 140px;
                    font-family: monospace;
                }

                .log-icon {
                    width: 20px;
                    text-align: center;
                    color: #667eea;
                }

                .log-message {
                    flex: 1;
                    font-size: 14px;
                    color: #2d3748;
                }

                .log-user {
                    font-size: 12px;
                    color: #667eea;
                    font-weight: 600;
                    background: rgba(102, 126, 234, 0.1);
                    padding: 4px 8px;
                    border-radius: 12px;
                }

                /* Settings Styles */
                .settings-groups {
                    display: flex;
                    flex-direction: column;
                    gap: 30px;
                    margin-bottom: 40px;
                }

                .settings-group {
                    background: white;
                    padding: 30px;
                    border-radius: 16px;
                    border: 1px solid #e2e8f0;
                    box-shadow: 0 4px 16px rgba(0,0,0,0.1);
                }

                .settings-group h4 {
                    margin: 0 0 25px 0;
                    color: #2d3748;
                    font-size: 18px;
                    font-weight: 700;
                    border-bottom: 2px solid #e2e8f0;
                    padding-bottom: 15px;
                }

                .setting-item {
                    margin-bottom: 20px;
                }

                .setting-label {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    font-size: 14px;
                    color: #2d3748;
                    cursor: pointer;
                    padding: 10px 0;
                    position: relative;
                }

                .setting-label input[type="checkbox"] {
                    opacity: 0;
                    position: absolute;
                }

                .checkmark {
                    width: 20px;
                    height: 20px;
                    background: #e2e8f0;
                    border-radius: 4px;
                    position: relative;
                    transition: all 0.3s ease;
                    border: 2px solid #cbd5e0;
                }

                .setting-label input[type="checkbox"]:checked + .checkmark {
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    border-color: #667eea;
                }

                .setting-label input[type="checkbox"]:checked + .checkmark::after {
                    content: '✓';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    color: white;
                    font-size: 14px;
                    font-weight: bold;
                }

                .number-setting {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    font-size: 14px;
                    color: #2d3748;
                }

                .number-setting input {
                    padding: 8px 12px;
                    border: 2px solid #e2e8f0;
                    border-radius: 6px;
                    width: 100px;
                    font-size: 14px;
                    transition: border-color 0.3s ease;
                }

                .number-setting input:focus {
                    outline: none;
                    border-color: #667eea;
                }

                .settings-actions {
                    display: flex;
                    gap: 20px;
                    justify-content: flex-end;
                    padding-top: 30px;
                    border-top: 2px solid #e2e8f0;
                }

                /* Modal Styles */
                .modal {
                    display: none;
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.6);
                    z-index: 10000;
                    backdrop-filter: blur(8px);
                }

                .modal.show {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .modal-content {
                    background: white;
                    border-radius: 16px;
                    width: 90%;
                    max-width: 600px;
                    max-height: 90vh;
                    overflow-y: auto;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                    animation: modalSlideIn 0.3s ease-out;
                }

                @keyframes modalSlideIn {
                    from {
                        opacity: 0;
                        transform: translateY(-50px) scale(0.9);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }

                .modal-header {
                    padding: 25px 30px;
                    border-bottom: 1px solid #e2e8f0;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background: linear-gradient(135deg, #f7fafc, #edf2f7);
                }

                .modal-header h3 {
                    margin: 0;
                    color: #2d3748;
                    font-size: 20px;
                    font-weight: 700;
                }

                .modal-close {
                    background: none;
                    border: none;
                    font-size: 28px;
                    cursor: pointer;
                    color: #a0aec0;
                    transition: color 0.3s ease;
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                }

                .modal-close:hover {
                    color: #fc8181;
                    background: rgba(252, 129, 129, 0.1);
                }

                .modal-body {
                    padding: 30px;
                }

                .modal-footer {
                    padding: 25px 30px;
                    border-top: 1px solid #e2e8f0;
                    display: flex;
                    justify-content: flex-end;
                    gap: 15px;
                    background: #f7fafc;
                }

                .form-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 20px;
                    margin-bottom: 20px;
                }

                .form-group {
                    margin-bottom: 20px;
                }

                .form-group label {
                    display: block;
                    margin-bottom: 8px;
                    font-weight: 600;
                    color: #2d3748;
                    font-size: 14px;
                }

                .form-group input,
                .form-group select {
                    width: 100%;
                    padding: 12px 16px;
                    border: 2px solid #e2e8f0;
                    border-radius: 8px;
                    font-size: 14px;
                    transition: all 0.3s ease;
                    background: white;
                }

                .form-group input:focus,
                .form-group select:focus {
                    outline: none;
                    border-color: #667eea;
                    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
                }

                .field-hint {
                    font-size: 12px;
                    color: #a0aec0;
                    margin-top: 5px;
                    font-style: italic;
                }

                .checkbox-group {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    cursor: pointer;
                    padding: 10px 0;
                }

                .checkbox-group input[type="checkbox"] {
                    opacity: 0;
                    position: absolute;
                }

                .checkbox-group .checkmark {
                    width: 18px;
                    height: 18px;
                    background: #e2e8f0;
                    border-radius: 4px;
                    position: relative;
                    transition: all 0.3s ease;
                    border: 2px solid #cbd5e0;
                }

                .checkbox-group input[type="checkbox"]:checked + .checkmark {
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    border-color: #667eea;
                }

                .checkbox-group input[type="checkbox"]:checked + .checkmark::after {
                    content: '✓';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    color: white;
                    font-size: 12px;
                    font-weight: bold;
                }

                .progress-content {
                    max-width: 400px;
                    text-align: center;
                }

                .progress-header {
                    padding: 20px;
                    border-bottom: 1px solid #e2e8f0;
                }

                .progress-body {
                    padding: 30px;
                }

                .progress-bar-container {
                    position: relative;
                    margin-bottom: 20px;
                }

                .progress-bar-bg {
                    width: 100%;
                    height: 12px;
                    background: #e2e8f0;
                    border-radius: 6px;
                    overflow: hidden;
                }

                .progress-bar-fill {
                    height: 100%;
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    transition: width 0.3s ease;
                    width: 0%;
                }

                .progress-text {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    font-size: 12px;
                    font-weight: 600;
                    color: #2d3748;
                }

                .progress-message {
                    color: #718096;
                    font-size: 14px;
                }

                .loading {
                    text-align: center;
                    padding: 60px 40px;
                    color: #a0aec0;
                    font-style: italic;
                    font-size: 16px;
                }

                /* Responsive Design */
                @media (max-width: 768px) {
                    .admin-tabs {
                        flex-direction: column;
                    }

                    .section-header {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 20px;
                    }

                    .admin-stats-bar {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 20px;
                    }

                    .user-stats-cards,
                    .file-stats-row,
                    .system-grid {
                        grid-template-columns: 1fr;
                    }

                    .form-row {
                        grid-template-columns: 1fr;
                    }

                    .quick-actions {
                        grid-template-columns: 1fr;
                    }

                    .settings-actions {
                        flex-direction: column;
                    }
                }

                /* Animations */
                .fade-in {
                    animation: fadeIn 0.5s ease-out;
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .slide-in {
                    animation: slideIn 0.3s ease-out;
                }

                @keyframes slideIn {
                    from { transform: translateX(-20px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            </style>
        `;
    }

    static init(windowElement) {
        this.currentWindow = windowElement;
        this.editingUserId = null;
        this.currentFileTab = 'public';
        this.currentLogs = [];
        this.allUsers = [];

        this.checkAdminStatus().then(isAdmin => {
            if (isAdmin) {
                this.loadHeaderStats();
                this.loadUsers();
                this.loadSystemInfo();
                this.setupAutoRefresh();
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
            <div style="display: flex; align-items: center; justify-content: center; height: 100%; text-align: center; color: #e74c3c; background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);">
                <div>
                    <i class="fas fa-shield-alt" style="font-size: 80px; margin-bottom: 30px; opacity: 0.3;"></i>
                    <h2 style="font-size: 32px; margin-bottom: 15px;">Access Restricted</h2>
                    <p style="font-size: 18px; margin-bottom: 10px;">This panel requires administrator privileges.</p>
                    <p style="font-size: 16px; opacity: 0.7;">Please contact your system administrator for access.</p>
                </div>
            </div>
        `;
    }

    static setupAutoRefresh() {
        // Auto-refresh stats every 30 seconds
        setInterval(() => {
            this.loadHeaderStats();
            if (this.currentWindow.querySelector('#system-tab').style.display !== 'none') {
                this.loadSystemInfo();
            }
        }, 30000);
    }

    static async loadHeaderStats() {
        try {
            const [userStats, fileStats, systemInfo] = await Promise.all([
                fetch('/api/admin/system-stats').then(r => r.json()),
                fetch('/api/admin/file-stats').then(r => r.json()),
                fetch('/api/admin/system-info').then(r => r.json())
            ]);

            if (userStats.stats) {
                this.currentWindow.querySelector('#header-users').textContent = userStats.stats.users?.total || 0;
            }

            this.currentWindow.querySelector('#header-files').textContent = fileStats.public_files || 0;
            this.currentWindow.querySelector('#header-storage').textContent = this.formatFileSize(fileStats.total_storage || 0);

            if (systemInfo.uptime) {
                this.currentWindow.querySelector('#header-uptime').textContent = this.formatUptime(systemInfo.uptime);
            }

        } catch (error) {
            console.error('Failed to load header stats:', error);
        }
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
        usersList.innerHTML = '<div class="loading">🔄 Loading users...</div>';

        try {
            const response = await fetch('/api/admin/users');
            const data = await response.json();

            if (response.ok) {
                this.allUsers = data.users;
                this.displayUsers(data.users);
                this.updateUserStats(data.stats);
                this.updateSearchStats(data.users.length, data.users.length);
            } else {
                usersList.innerHTML = `<div style="color: #e74c3c; text-align: center; padding: 40px;"><i class="fas fa-exclamation-triangle"></i><br><br>Error: ${data.error}</div>`;
            }
        } catch (error) {
            usersList.innerHTML = `<div style="color: #e74c3c; text-align: center; padding: 40px;"><i class="fas fa-wifi"></i><br><br>Network error: ${error.message}</div>`;
        }
    }

    static displayUsers(users) {
        const usersList = this.currentWindow.querySelector('#users-list');

        if (users.length === 0) {
            usersList.innerHTML = '<div style="text-align: center; color: #a0aec0; padding: 60px;"><i class="fas fa-users" style="font-size: 48px; margin-bottom: 20px; opacity: 0.3;"></i><br>No users found</div>';
            return;
        }

        usersList.innerHTML = users.map(user => `
            <div class="user-item slide-in" data-user-id="${user.id}">
                <div class="user-avatar">${user.username.charAt(0).toUpperCase()}</div>
                <div class="user-info">
                    <div class="user-name">${user.username}</div>
                    <div class="user-details">
                        <span><i class="fas fa-envelope"></i> ${user.email || 'No email'}</span>
                        <span><i class="fas fa-calendar"></i> Joined ${new Date(user.created_at).toLocaleDateString()}</span>
                        <span><i class="fas fa-clock"></i> Last active ${user.last_active ? new Date(user.last_active).toLocaleDateString() : 'Never'}</span>
                        <span><i class="fas fa-hdd"></i> ${user.quota_mb || 100} MB quota</span>
                    </div>
                </div>
                <div class="user-status ${user.is_active ? 'active' : 'inactive'}">
                    ${user.is_active ? 'Active' : 'Inactive'}
                </div>
                ${user.is_admin ? '<div class="user-status admin">Admin</div>' : ''}
                <div class="user-actions">
                    <button class="btn btn-secondary" onclick="AdminPanel.editUser(${user.id})" title="Edit User">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger" onclick="AdminPanel.deleteUser(${user.id})" title="Delete User">
                        <i class="fas fa-trash"></i>
                    </button>
                    <button class="btn btn-primary" onclick="AdminPanel.loginAsUser(${user.id})" title="Login As User">
                        <i class="fas fa-sign-in-alt"></i>
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

        // Update trends
        this.currentWindow.querySelector('#users-trend').textContent = `+${stats.new_this_week || 0} this week`;
        this.currentWindow.querySelector('#active-trend').textContent = `${Math.round((stats.active / stats.total) * 100)}% active`;
    }

    static updateSearchStats(showing, total) {
        const searchStats = this.currentWindow.querySelector('#search-stats');
        if (showing === total) {
            searchStats.textContent = `Showing all ${total} users`;
        } else {
            searchStats.textContent = `Showing ${showing} of ${total} users`;
        }
    }

    static filterUsers() {
        const searchTerm = this.currentWindow.querySelector('#user-search').value.toLowerCase();
        const filteredUsers = this.allUsers.filter(user => {
            return user.username.toLowerCase().includes(searchTerm) ||
                   (user.email && user.email.toLowerCase().includes(searchTerm));
        });

        this.displayUsers(filteredUsers);
        this.updateSearchStats(filteredUsers.length, this.allUsers.length);
    }

    static showCreateUserModal() {
        this.editingUserId = null;
        this.currentWindow.querySelector('#modal-title').textContent = 'Create New User';
        this.currentWindow.querySelector('#save-btn-text').textContent = 'Create User';
        this.currentWindow.querySelector('#user-form').reset();
        this.currentWindow.querySelector('#user-quota').value = 100;
        this.currentWindow.querySelector('#user-modal').classList.add('show');
        setTimeout(() => {
            this.currentWindow.querySelector('#user-username').focus();
        }, 100);
    }

    static editUser(userId) {
        this.editingUserId = userId;
        this.loadUserForEdit(userId);
        this.currentWindow.querySelector('#modal-title').textContent = 'Edit User';
        this.currentWindow.querySelector('#save-btn-text').textContent = 'Update User';
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
                this.currentWindow.querySelector('#user-quota').value = user.quota_mb || 100;
                this.currentWindow.querySelector('#user-password').value = '';
            }
        } catch (error) {
            this.showNotification('Failed to load user data', 'error');
        }
    }

    static async saveUser() {
        const userData = {
            username: this.currentWindow.querySelector('#user-username').value.trim(),
            email: this.currentWindow.querySelector('#user-email').value.trim(),
            password: this.currentWindow.querySelector('#user-password').value,
            is_admin: this.currentWindow.querySelector('#user-role').value === 'admin',
            is_active: this.currentWindow.querySelector('#user-active').checked,
            quota_mb: parseInt(this.currentWindow.querySelector('#user-quota').value)
        };

        // Validation
        if (!userData.username || userData.username.length < 3) {
            this.showNotification('Username must be at least 3 characters', 'error');
            return;
        }

        if (!this.editingUserId && !userData.password) {
            this.showNotification('Password is required for new users', 'error');
            return;
        }

        if (userData.password && userData.password.length < 6) {
            this.showNotification('Password must be at least 6 characters', 'error');
            return;
        }

        this.showProgress('Saving user...', 0);

        try {
            const url = this.editingUserId ? `/api/admin/users/${this.editingUserId}` : '/api/admin/users';
            const method = this.editingUserId ? 'PUT' : 'POST';

            this.updateProgress(25, 'Validating data...');

            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });

            this.updateProgress(75, 'Processing...');

            const data = await response.json();

            if (response.ok) {
                this.updateProgress(100, 'Complete!');
                setTimeout(() => {
                    this.hideProgress();
                    this.showNotification(
                        this.editingUserId ? 'User updated successfully' : 'User created successfully',
                        'success'
                    );
                    this.closeModal();
                    this.loadUsers();
                    this.loadHeaderStats();
                }, 500);
            } else {
                this.hideProgress();
                this.showNotification(data.error || 'Failed to save user', 'error');
            }
        } catch (error) {
            this.hideProgress();
            this.showNotification('Network error: ' + error.message, 'error');
        }
    }

    static async deleteUser(userId) {
        const user = this.allUsers.find(u => u.id === userId);
        if (!user) return;

        if (!confirm(`Are you sure you want to delete user "${user.username}"?\n\nThis will:\n• Delete all user files\n• Remove all activity logs\n• Cannot be undone`)) {
            return;
        }

        this.showProgress('Deleting user...', 0);

        try {
            this.updateProgress(25, 'Removing user account...');

            const response = await fetch(`/api/admin/users/${userId}`, {
                method: 'DELETE'
            });

            this.updateProgress(75, 'Cleaning up files...');

            if (response.ok) {
                this.updateProgress(100, 'Complete!');
                setTimeout(() => {
                    this.hideProgress();
                    this.showNotification('User deleted successfully', 'success');
                    this.loadUsers();
                    this.loadHeaderStats();
                }, 500);
            } else {
                const data = await response.json();
                this.hideProgress();
                this.showNotification(data.error || 'Failed to delete user', 'error');
            }
        } catch (error) {
            this.hideProgress();
            this.showNotification('Network error: ' + error.message, 'error');
        }
    }

    static async loginAsUser(userId) {
        const user = this.allUsers.find(u => u.id === userId);
        if (!user) return;

        if (!confirm(`Switch to user "${user.username}"?\n\nYou will be logged out of your current admin session.`)) {
            return;
        }

        try {
            const response = await fetch(`/api/admin/login-as/${userId}`, {
                method: 'POST'
            });

            if (response.ok) {
                this.showNotification('Switching user session...', 'info');
                setTimeout(() => {
                    window.location.href = '/';
                }, 1000);
            } else {
                const data = await response.json();
                this.showNotification(data.error || 'Failed to switch user', 'error');
            }
        } catch (error) {
            this.showNotification('Network error: ' + error.message, 'error');
        }
    }

    static refreshUsers() {
        this.loadUsers();
        this.showNotification('User list refreshed', 'success');
    }

    static async backupDatabase() {
        if (!confirm('Create a database backup?\n\nThis will save a copy of all user data and settings.')) {
            return;
        }

        this.showProgress('Creating backup...', 0);

        try {
            this.updateProgress(25, 'Preparing backup...');

            const response = await fetch('/api/admin/backup-database', {
                method: 'POST'
            });

            this.updateProgress(75, 'Finalizing...');

            const data = await response.json();

            if (response.ok) {
                this.updateProgress(100, 'Backup complete!');
                setTimeout(() => {
                    this.hideProgress();
                    this.showNotification(`Database backup created: ${data.backup_file}`, 'success');
                }, 500);
            } else {
                this.hideProgress();
                this.showNotification(data.error || 'Backup failed', 'error');
            }
        } catch (error) {
            this.hideProgress();
            this.showNotification('Network error: ' + error.message, 'error');
        }
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
        content.innerHTML = '<div class="loading">📁 Loading files...</div>';

        try {
            const response = await fetch(`/api/admin/files/${type}`);
            const data = await response.json();

            if (response.ok) {
                this.displayFileContent(data.files, type);
            } else {
                content.innerHTML = `<div style="color: #e74c3c; text-align: center; padding: 40px;"><i class="fas fa-exclamation-triangle"></i><br><br>Error: ${data.error}</div>`;
            }
        } catch (error) {
            content.innerHTML = `<div style="color: #e74c3c; text-align: center; padding: 40px;"><i class="fas fa-wifi"></i><br><br>Network error: ${error.message}</div>`;
        }
    }

    static displayFileContent(files, type) {
        const content = this.currentWindow.querySelector('#file-management-content');

        if (files.length === 0) {
            content.innerHTML = '<div style="text-align: center; color: #a0aec0; padding: 60px;"><i class="fas fa-folder-open" style="font-size: 48px; margin-bottom: 20px; opacity: 0.3;"></i><br>No files found</div>';
            return;
        }

        content.innerHTML = files.map(file => `
            <div class="file-list-item">
                <div class="file-info">
                    <div class="file-icon">
                        <i class="fas fa-${file.type === 'folder' ? 'folder' : this.getFileIcon(file.name)}"></i>
                    </div>
                    <div class="file-details">
                        <h4>${file.name}</h4>
                        <div class="file-meta">
                            ${file.size ? this.formatFileSize(file.size) + ' • ' : ''}
                            ${new Date(file.modified).toLocaleDateString()} • 
                            ${file.owner ? `Owner: ${file.owner}` : 'System file'}
                        </div>
                    </div>
                </div>
                <div class="file-actions">
                    ${file.type === 'file' ? `
                        <button class="btn btn-primary" onclick="AdminPanel.downloadFile('${file.path}')" title="Download">
                            <i class="fas fa-download"></i>
                        </button>
                        <button class="btn btn-danger" onclick="AdminPanel.deleteFile('${file.path}')" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    ` : `
                        <button class="btn btn-secondary" onclick="AdminPanel.exploreFolder('${file.path}')" title="Explore">
                            <i class="fas fa-folder-open"></i>
                        </button>
                    `}
                </div>
            </div>
        `).join('');
    }

    static getFileIcon(filename) {
        const ext = filename.split('.').pop().toLowerCase();
        const iconMap = {
            'txt': 'file-alt',
            'md': 'file-alt',
            'pdf': 'file-pdf',
            'doc': 'file-word',
            'docx': 'file-word',
            'xls': 'file-excel',
            'xlsx': 'file-excel',
            'ppt': 'file-powerpoint',
            'pptx': 'file-powerpoint',
            'jpg': 'file-image',
            'jpeg': 'file-image',
            'png': 'file-image',
            'gif': 'file-image',
            'mp3': 'file-audio',
            'wav': 'file-audio',
            'mp4': 'file-video',
            'avi': 'file-video',
            'zip': 'file-archive',
            'rar': 'file-archive',
            'js': 'file-code',
            'html': 'file-code',
            'css': 'file-code',
            'py': 'file-code'
        };
        return iconMap[ext] || 'file';
    }

    static async uploadToPublic() {
        const input = this.currentWindow.querySelector('#file-upload-input');
        input.click();

        input.onchange = async (e) => {
            const files = e.target.files;
            if (files.length === 0) return;

            if (!confirm(`Upload ${files.length} file(s) to public directory?`)) {
                return;
            }

            this.showProgress('Uploading files...', 0);

            const formData = new FormData();
            for (let file of files) {
                formData.append('files', file);
            }

            try {
                this.updateProgress(25, 'Preparing upload...');

                const response = await fetch('/api/admin/upload-public', {
                    method: 'POST',
                    body: formData
                });

                this.updateProgress(75, 'Processing files...');

                const data = await response.json();

                if (response.ok) {
                    this.updateProgress(100, 'Upload complete!');
                    setTimeout(() => {
                        this.hideProgress();
                        this.showNotification(`${files.length} file(s) uploaded successfully`, 'success');
                        this.loadFileManagement();
                        this.loadHeaderStats();
                    }, 500);
                } else {
                    this.hideProgress();
                    this.showNotification(data.error || 'Upload failed', 'error');
                }
            } catch (error) {
                this.hideProgress();
                this.showNotification('Upload error: ' + error.message, 'error');
            }

            // Reset input
            input.value = '';
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
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
                this.showNotification('File downloaded successfully', 'success');
            } else {
                this.showNotification('Download failed', 'error');
            }
        } catch (error) {
            this.showNotification('Download failed: ' + error.message, 'error');
        }
    }

    static async deleteFile(filePath) {
        const fileName = filePath.split('/').pop();
        if (!confirm(`Delete "${fileName}"?\n\nThis action cannot be undone.`)) {
            return;
        }

        try {
            const response = await fetch(`/api/admin/files/${encodeURIComponent(filePath)}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                this.showNotification('File deleted successfully', 'success');
                this.loadFileContent(this.currentFileTab);
                this.loadFileStats();
            } else {
                const data = await response.json();
                this.showNotification(data.error || 'Failed to delete file', 'error');
            }
        } catch (error) {
            this.showNotification('Network error: ' + error.message, 'error');
        }
    }

    static async cleanupFiles() {
        if (!confirm('Cleanup temporary and orphaned files?\n\nThis will remove:\n• Temporary files\n• Empty files older than 30 days\n• System cache files\n\nThis may take a while.')) {
            return;
        }

        this.showProgress('Cleaning up files...', 0);

        try {
            this.updateProgress(25, 'Scanning for temporary files...');

            const response = await fetch('/api/admin/cleanup-files', {
                method: 'POST'
            });

            this.updateProgress(75, 'Removing files...');

            const data = await response.json();

            if (response.ok) {
                this.updateProgress(100, 'Cleanup complete!');
                setTimeout(() => {
                    this.hideProgress();
                    this.showNotification(`Cleanup completed. ${data.files_cleaned} files removed.`, 'success');
                    this.loadFileManagement();
                    this.loadHeaderStats();
                }, 500);
            } else {
                this.hideProgress();
                this.showNotification(data.error || 'Cleanup failed', 'error');
            }
        } catch (error) {
            this.hideProgress();
            this.showNotification('Cleanup error: ' + error.message, 'error');
        }
    }

    static refreshFiles() {
        this.loadFileManagement();
        this.showNotification('File list refreshed', 'success');
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
            const usedPercent = Math.round((data.storage.used / data.storage.total) * 100);
            this.currentWindow.querySelector('#storage-percent').textContent = usedPercent + '%';
            this.currentWindow.querySelector('#storage-used').textContent = this.formatFileSize(data.storage.used);
            this.currentWindow.querySelector('#storage-total').textContent = this.formatFileSize(data.storage.total);
            this.currentWindow.querySelector('#storage-free').textContent = this.formatFileSize(data.storage.free);

            // Update storage circle
            const circle = this.currentWindow.querySelector('.storage-circle');
            if (circle) {
                circle.style.background = `conic-gradient(#667eea 0deg ${usedPercent * 3.6}deg, #e2e8f0 ${usedPercent * 3.6}deg 360deg)`;
            }
        }

        if (data.sessions) {
            this.currentWindow.querySelector('#active-sessions').innerHTML = `<i class="fas fa-users"></i> ${data.sessions.active || 0}`;
        }

        if (data.memory) {
            this.currentWindow.querySelector('#memory-usage').textContent = data.memory;
        }

        if (data.load) {
            this.currentWindow.querySelector('#load-average').textContent = data.load;
        }
    }

    static refreshSystemInfo() {
        this.loadSystemInfo();
        this.showNotification('System info refreshed', 'success');
    }

    static viewLogs() {
        this.switchTab('logs');
    }

    // Logs Methods
    static async loadLogs() {
        const container = this.currentWindow.querySelector('#logs-container');
        container.innerHTML = '<div class="loading">📊 Loading activity logs...</div>';

        try {
            const filter = this.currentWindow.querySelector('#log-filter')?.value || 'all';
            const response = await fetch(`/api/admin/logs?filter=${filter}&limit=200`);
            const data = await response.json();

            if (response.ok) {
                this.currentLogs = data.logs;
                this.displayLogs(data.logs);
                this.updateLogStats(data.logs);
            } else {
                container.innerHTML = `<div style="color: #e74c3c; text-align: center; padding: 40px;"><i class="fas fa-exclamation-triangle"></i><br><br>Error: ${data.error}</div>`;
            }
        } catch (error) {
            container.innerHTML = `<div style="color: #e74c3c; text-align: center; padding: 40px;"><i class="fas fa-wifi"></i><br><br>Network error: ${error.message}</div>`;
        }
    }

    static displayLogs(logs) {
        const container = this.currentWindow.querySelector('#logs-container');

        if (logs.length === 0) {
            container.innerHTML = '<div style="text-align: center; color: #a0aec0; padding: 60px;"><i class="fas fa-file-alt" style="font-size: 48px; margin-bottom: 20px; opacity: 0.3;"></i><br>No logs found</div>';
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

    static updateLogStats(logs) {
        const today = new Date().toDateString();

        const loginCount = logs.filter(log =>
            log.message.includes('login') &&
            new Date(log.timestamp).toDateString() === today
        ).length;

        const fileOpsCount = logs.filter(log =>
            log.message.includes('file') ||
            log.message.includes('upload') ||
            log.message.includes('download')
        ).length;

        const adminOpsCount = logs.filter(log => log.type === 'admin').length;
        const errorCount = logs.filter(log => log.type === 'error').length;

        this.currentWindow.querySelector('#login-count').textContent = loginCount;
        this.currentWindow.querySelector('#file-ops-count').textContent = fileOpsCount;
        this.currentWindow.querySelector('#admin-ops-count').textContent = adminOpsCount;
        this.currentWindow.querySelector('#error-count').textContent = errorCount;
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

    static filterLogs() {
        this.loadLogs();
    }

    static refreshLogs() {
        this.loadLogs();
        this.showNotification('Activity logs refreshed', 'success');
    }

    static exportLogs() {
        if (!this.currentLogs || this.currentLogs.length === 0) {
            this.showNotification('No logs to export', 'warning');
            return;
        }

        const csvContent = "data:text/csv;charset=utf-8," +
            "Timestamp,User,Action,IP Address,Type\n" +
            this.currentLogs.map(log =>
                `"${log.timestamp}","${log.user || 'System'}","${log.message}","${log.ip || 'N/A'}","${log.type}"`
            ).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `emberframe_logs_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        this.showNotification('Logs exported successfully', 'success');
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
        const settingElements = this.currentWindow.querySelectorAll('.setting-item input, .setting-item select');
        settingElements.forEach(element => {
            const key = element.id.replace(/-/g, '_');
            if (element.type === 'checkbox') {
                settings[key] = element.checked;
            } else {
                settings[key] = element.value;
            }
        });

        this.showProgress('Saving settings...', 0);

        try {
            this.updateProgress(50, 'Applying configuration...');

            const response = await fetch('/api/admin/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ settings })
            });

            if (response.ok) {
                this.updateProgress(100, 'Settings saved!');
                setTimeout(() => {
                    this.hideProgress();
                    this.showNotification('Settings saved successfully', 'success');
                }, 500);
            } else {
                const data = await response.json();
                this.hideProgress();
                this.showNotification(data.error || 'Failed to save settings', 'error');
            }
        } catch (error) {
            this.hideProgress();
            this.showNotification('Network error: ' + error.message, 'error');
        }
    }

    static resetSettings() {
        if (!confirm('Reset all settings to defaults?\n\nThis will restore the original system configuration.\n\nThis action cannot be undone.')) {
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
        this.currentWindow.querySelector('#enable-2fa').checked = false;
        this.currentWindow.querySelector('#max-file-size').value = 16;
        this.currentWindow.querySelector('#notify-logins').checked = false;
        this.currentWindow.querySelector('#enable-caching').checked = true;
        this.currentWindow.querySelector('#session-timeout').value = 24;

        this.showNotification('Settings reset to defaults. Click "Save Settings" to apply.', 'info');
    }

    static exportSettings() {
        // Get current settings
        const settings = {};
        const settingElements = this.currentWindow.querySelectorAll('.setting-item input, .setting-item select');
        settingElements.forEach(element => {
            const key = element.id.replace(/-/g, '_');
            if (element.type === 'checkbox') {
                settings[key] = element.checked;
            } else {
                settings[key] = element.value;
            }
        });

        const configData = {
            exported_at: new Date().toISOString(),
            version: "2.0.0",
            settings: settings
        };

        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(configData, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `emberframe_config_${new Date().toISOString().split('T')[0]}.json`);
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();

        this.showNotification('Configuration exported successfully', 'success');
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
            return `${days}d ${hours}h`;
        } else if (hours > 0) {
            return `${hours}h ${minutes}m`;
        } else {
            return `${minutes}m`;
        }
    }

    static showProgress(title, percent) {
        const modal = this.currentWindow.querySelector('#progress-modal');
        const titleEl = this.currentWindow.querySelector('#progress-title');
        const fillEl = this.currentWindow.querySelector('#progress-bar-fill');
        const textEl = this.currentWindow.querySelector('#progress-text');

        titleEl.textContent = title;
        fillEl.style.width = percent + '%';
        textEl.textContent = percent + '%';

        modal.classList.add('show');
    }

    static updateProgress(percent, message) {
        const fillEl = this.currentWindow.querySelector('#progress-bar-fill');
        const textEl = this.currentWindow.querySelector('#progress-text');
        const messageEl = this.currentWindow.querySelector('#progress-message');

        fillEl.style.width = percent + '%';
        textEl.textContent = percent + '%';
        messageEl.textContent = message;
    }

    static hideProgress() {
        const modal = this.currentWindow.querySelector('#progress-modal');
        modal.classList.remove('show');
    }

    static showNotification(message, type = 'info') {
        if (window.Notification) {
            window.Notification[type](message);
        } else {
            console.log(`[${type.toUpperCase()}] ${message}`);
        }
    }

    static onClose(windowElement) {
        this.currentWindow = null;
        return true;
    }
}

window.AdminPanel = AdminPanel;