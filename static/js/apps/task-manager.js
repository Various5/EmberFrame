/**
 * APP_METADATA
 * @name System Monitor
 * @icon fas fa-tasks
 * @description Advanced Task Manager with Real-time System Monitoring
 * @category System
 * @version 2.0.0
 * @author EmberFrame Team
 * @enabled true
 */

class TaskManager {
  static _container = null;
  static _updateInterval = null;
  static _currentTab = 'processes';
  static _processes = new Map();
  static _systemStats = {
    cpu: 0,
    memory: 0,
    storage: 0,
    uptime: 0,
    activeUsers: 1
  };
  static _charts = {};
  static _historicalData = {
    cpu: [],
    memory: [],
    network: []
  };
  static _settings = {
    autoRefresh: true,
    refreshInterval: 3000,
    showNotifications: true,
    soundAlerts: false,
    cpuAlertThreshold: 80,
    memoryAlertThreshold: 85
  };
  static _sortBy = 'cpu';
  static _sortDirection = 'desc';
  static _selectedProcesses = new Set();
  static _isAdmin = false;

  static createWindow() {
    return {
      title: '⚡ System Monitor',
      width: '1200px',
      height: '800px',
      content: `
        <div id="task-manager" style="height: 100%; display: flex; flex-direction: column; background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%); color: #ffffff; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; overflow: hidden;">
          
          <!-- Header with Stats Bar -->
          <div style="background: rgba(0, 212, 255, 0.1); border-bottom: 1px solid rgba(0, 212, 255, 0.3); padding: 15px 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #00d4ff;">⚡ System Monitor</h1>
              <div style="display: flex; gap: 15px; align-items: center;">
                <div style="display: flex; align-items: center; gap: 8px; padding: 6px 12px; background: rgba(0, 255, 136, 0.2); border-radius: 20px; font-size: 12px;">
                  <div style="width: 8px; height: 8px; background: #00ff88; border-radius: 50%; animation: pulse 2s infinite;"></div>
                  <span>ONLINE</span>
                </div>
                <button id="export-btn" style="background: rgba(0, 212, 255, 0.2); border: 1px solid rgba(0, 212, 255, 0.5); color: #00d4ff; padding: 8px 16px; border-radius: 8px; cursor: pointer; font-size: 12px; transition: all 0.2s;">
                  📊 Export
                </button>
                <button id="refresh-btn" style="background: rgba(0, 212, 255, 0.2); border: 1px solid rgba(0, 212, 255, 0.5); color: #00d4ff; padding: 8px 16px; border-radius: 8px; cursor: pointer; font-size: 12px; transition: all 0.2s;">
                  🔄 Refresh
                </button>
                <button id="settings-btn" style="background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.3); color: white; padding: 8px 16px; border-radius: 8px; cursor: pointer; font-size: 12px; transition: all 0.2s;">
                  ⚙️ Settings
                </button>
              </div>
            </div>
            
            <!-- Quick Stats -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px;">
              <div class="stat-card" data-stat="cpu">
                <div class="stat-icon">🧠</div>
                <div class="stat-content">
                  <div class="stat-value" id="cpu-usage">0%</div>
                  <div class="stat-label">CPU Usage</div>
                  <div class="stat-progress">
                    <div class="stat-progress-bar" id="cpu-progress"></div>
                  </div>
                </div>
              </div>
              <div class="stat-card" data-stat="memory">
                <div class="stat-icon">💾</div>
                <div class="stat-content">
                  <div class="stat-value" id="memory-usage">0%</div>
                  <div class="stat-label">Memory</div>
                  <div class="stat-progress">
                    <div class="stat-progress-bar" id="memory-progress"></div>
                  </div>
                </div>
              </div>
              <div class="stat-card" data-stat="storage">
                <div class="stat-icon">💽</div>
                <div class="stat-content">
                  <div class="stat-value" id="storage-usage">0%</div>
                  <div class="stat-label">Storage</div>
                  <div class="stat-progress">
                    <div class="stat-progress-bar" id="storage-progress"></div>
                  </div>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon">⏱️</div>
                <div class="stat-content">
                  <div class="stat-value" id="uptime">0h 0m</div>
                  <div class="stat-label">Uptime</div>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon">👥</div>
                <div class="stat-content">
                  <div class="stat-value" id="active-users">1</div>
                  <div class="stat-label">Active Users</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Navigation Tabs -->
          <div style="background: rgba(0, 0, 0, 0.3); border-bottom: 1px solid rgba(0, 212, 255, 0.3); padding: 0; display: flex;">
            <button class="tab-btn active" data-tab="processes">
              <i class="fas fa-cogs"></i> Processes
            </button>
            <button class="tab-btn" data-tab="performance">
              <i class="fas fa-chart-line"></i> Performance
            </button>
            <button class="tab-btn" data-tab="network">
              <i class="fas fa-network-wired"></i> Network
            </button>
            <button class="tab-btn" data-tab="storage">
              <i class="fas fa-hdd"></i> Storage
            </button>
            <button class="tab-btn" data-tab="users">
              <i class="fas fa-users"></i> Users
            </button>
            <button class="tab-btn" data-tab="logs">
              <i class="fas fa-list-alt"></i> Logs
            </button>
          </div>

          <!-- Search and Controls -->
          <div style="padding: 15px 20px; background: rgba(0, 0, 0, 0.2); border-bottom: 1px solid rgba(0, 212, 255, 0.2); display: flex; gap: 15px; align-items: center; flex-wrap: wrap;">
            <div style="flex: 1; position: relative; min-width: 200px;">
              <input id="search-input" type="text" placeholder="Search processes, users, or resources..." style="width: 100%; padding: 10px 40px 10px 15px; background: rgba(0, 0, 0, 0.4); border: 1px solid rgba(0, 212, 255, 0.3); border-radius: 8px; color: white; font-size: 14px;">
              <i class="fas fa-search" style="position: absolute; right: 15px; top: 50%; transform: translateY(-50%); color: rgba(0, 212, 255, 0.6);"></i>
            </div>
            <select id="priority-filter" style="padding: 10px; background: rgba(0, 0, 0, 0.4); border: 1px solid rgba(0, 212, 255, 0.3); border-radius: 8px; color: white; font-size: 14px;">
              <option value="all">All Priorities</option>
              <option value="high">High Priority</option>
              <option value="normal">Normal Priority</option>
              <option value="low">Low Priority</option>
            </select>
            <select id="status-filter" style="padding: 10px; background: rgba(0, 0, 0, 0.4); border: 1px solid rgba(0, 212, 255, 0.3); border-radius: 8px; color: white; font-size: 14px;">
              <option value="all">All Status</option>
              <option value="running">Running</option>
              <option value="idle">Idle</option>
              <option value="stopped">Stopped</option>
            </select>
            <div style="display: flex; gap: 10px;">
              <button id="select-all-btn" style="background: rgba(0, 212, 255, 0.2); border: 1px solid rgba(0, 212, 255, 0.5); color: #00d4ff; padding: 10px 15px; border-radius: 8px; cursor: pointer; font-size: 12px;">
                ☑️ Select All
              </button>
              <button id="end-task-btn" style="background: rgba(255, 68, 102, 0.2); border: 1px solid rgba(255, 68, 102, 0.5); color: #ff4466; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-size: 14px;" disabled>
                🗑️ End Task
              </button>
              <button id="priority-btn" style="background: rgba(255, 170, 0, 0.2); border: 1px solid rgba(255, 170, 0, 0.5); color: #ffaa00; padding: 10px 15px; border-radius: 8px; cursor: pointer; font-size: 12px;" disabled>
                ⚡ Priority
              </button>
            </div>
          </div>

          <!-- Main Content Area -->
          <div style="flex: 1; overflow: hidden; position: relative;">
            
            <!-- Processes Tab -->
            <div id="tab-processes" class="tab-content active" style="height: 100%; display: flex; flex-direction: column;">
              <div style="flex: 1; overflow-y: auto;">
                <table id="processes-table" style="width: 100%; border-collapse: collapse; background: transparent;">
                  <thead style="background: rgba(0, 212, 255, 0.1); position: sticky; top: 0; z-index: 10;">
                    <tr>
                      <th style="width: 40px; padding: 12px 8px;">
                        <input type="checkbox" id="select-all-checkbox" style="margin: 0;">
                      </th>
                      <th class="sortable" data-sort="name">Process Name</th>
                      <th class="sortable" data-sort="pid">PID</th>
                      <th class="sortable" data-sort="cpu">CPU %</th>
                      <th class="sortable" data-sort="memory">Memory</th>
                      <th class="sortable" data-sort="priority">Priority</th>
                      <th class="sortable" data-sort="status">Status</th>
                      <th class="sortable" data-sort="startTime">Started</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody id="processes-tbody">
                    <!-- Process rows will be populated here -->
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Performance Tab -->
            <div id="tab-performance" class="tab-content" style="height: 100%; padding: 20px; overflow-y: auto;">
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; height: 100%;">
                
                <!-- CPU Chart -->
                <div class="chart-container">
                  <h3 style="margin: 0 0 15px 0; color: #00d4ff;">CPU Usage History</h3>
                  <div class="chart-wrapper">
                    <canvas id="cpu-chart" width="400" height="200"></canvas>
                  </div>
                  <div style="margin-top: 10px; font-size: 12px; color: rgba(255, 255, 255, 0.7);">
                    Real-time CPU usage monitoring
                  </div>
                </div>

                <!-- Memory Chart -->
                <div class="chart-container">
                  <h3 style="margin: 0 0 15px 0; color: #00d4ff;">Memory Usage</h3>
                  <div class="chart-wrapper">
                    <canvas id="memory-chart" width="400" height="200"></canvas>
                  </div>
                  <div style="margin-top: 10px; font-size: 12px; color: rgba(255, 255, 255, 0.7);">
                    System memory allocation
                  </div>
                </div>

                <!-- System Info -->
                <div class="chart-container">
                  <h3 style="margin: 0 0 15px 0; color: #00d4ff;">System Information</h3>
                  <div id="system-info" style="font-size: 14px; line-height: 1.6;">
                    <!-- System info will be populated here -->
                  </div>
                </div>

                <!-- Process Summary -->
                <div class="chart-container">
                  <h3 style="margin: 0 0 15px 0; color: #00d4ff;">Process Summary</h3>
                  <div id="process-summary">
                    <!-- Process summary will be populated here -->
                  </div>
                </div>
              </div>
            </div>

            <!-- Network Tab -->
            <div id="tab-network" class="tab-content" style="height: 100%; padding: 20px;">
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; height: 100%;">
                <div class="chart-container">
                  <h3 style="margin: 0 0 15px 0; color: #00d4ff;">Network Activity</h3>
                  <div style="display: flex; flex-direction: column; gap: 15px;">
                    <div class="network-stat">
                      <span>Download Speed:</span>
                      <span id="download-speed">0 KB/s</span>
                    </div>
                    <div class="network-stat">
                      <span>Upload Speed:</span>
                      <span id="upload-speed">0 KB/s</span>
                    </div>
                    <div class="network-stat">
                      <span>Active Connections:</span>
                      <span id="active-connections">0</span>
                    </div>
                    <div class="network-stat">
                      <span>Total Requests:</span>
                      <span id="total-requests">0</span>
                    </div>
                  </div>
                  <canvas id="network-chart" width="350" height="150" style="margin-top: 20px;"></canvas>
                </div>
                <div class="chart-container">
                  <h3 style="margin: 0 0 15px 0; color: #00d4ff;">Connection Details</h3>
                  <div id="connection-details">
                    <!-- Connection details will be populated here -->
                  </div>
                </div>
              </div>
            </div>

            <!-- Storage Tab -->
            <div id="tab-storage" class="tab-content" style="height: 100%; padding: 20px; overflow-y: auto;">
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div class="chart-container">
                  <h3 style="margin: 0 0 15px 0; color: #00d4ff;">Storage Usage</h3>
                  <div id="storage-breakdown">
                    <!-- Storage breakdown will be populated here -->
                  </div>
                </div>
                <div class="chart-container">
                  <h3 style="margin: 0 0 15px 0; color: #00d4ff;">File Statistics</h3>
                  <div id="file-stats">
                    <!-- File statistics will be populated here -->
                  </div>
                </div>
                <div class="chart-container">
                  <h3 style="margin: 0 0 15px 0; color: #00d4ff;">Disk Analysis</h3>
                  <div id="disk-analysis">
                    <!-- Disk analysis will be populated here -->
                  </div>
                </div>
                <div class="chart-container">
                  <h3 style="margin: 0 0 15px 0; color: #00d4ff;">Cleanup Suggestions</h3>
                  <div id="cleanup-suggestions">
                    <!-- Cleanup suggestions will be populated here -->
                  </div>
                </div>
              </div>
            </div>

            <!-- Users Tab -->
            <div id="tab-users" class="tab-content" style="height: 100%; padding: 20px;">
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div class="chart-container">
                  <h3 style="margin: 0 0 15px 0; color: #00d4ff;">Active Sessions</h3>
                  <div id="active-sessions">
                    <!-- Active sessions will be populated here -->
                  </div>
                </div>
                <div class="chart-container">
                  <h3 style="margin: 0 0 15px 0; color: #00d4ff;">Session History</h3>
                  <div id="session-history">
                    <!-- Session history will be populated here -->
                  </div>
                </div>
              </div>
            </div>

            <!-- Logs Tab -->
            <div id="tab-logs" class="tab-content" style="height: 100%; padding: 20px;">
              <div style="display: flex; flex-direction: column; height: 100%; gap: 15px;">
                <div style="display: flex; gap: 15px; align-items: center;">
                  <select id="log-filter" style="padding: 8px; background: rgba(0, 0, 0, 0.4); border: 1px solid rgba(0, 212, 255, 0.3); border-radius: 8px; color: white; font-size: 14px;">
                    <option value="all">All Logs</option>
                    <option value="system">System</option>
                    <option value="error">Errors</option>
                    <option value="warning">Warnings</option>
                    <option value="info">Information</option>
                  </select>
                  <button id="clear-logs-btn" style="background: rgba(255, 68, 102, 0.2); border: 1px solid rgba(255, 68, 102, 0.5); color: #ff4466; padding: 8px 16px; border-radius: 8px; cursor: pointer; font-size: 12px;">
                    🗑️ Clear Logs
                  </button>
                  <button id="export-logs-btn" style="background: rgba(0, 212, 255, 0.2); border: 1px solid rgba(0, 212, 255, 0.5); color: #00d4ff; padding: 8px 16px; border-radius: 8px; cursor: pointer; font-size: 12px;">
                    📄 Export
                  </button>
                </div>
                <div id="logs-container" style="flex: 1; background: rgba(0, 0, 0, 0.3); border: 1px solid rgba(0, 212, 255, 0.3); border-radius: 8px; padding: 15px; overflow-y: auto; font-family: monospace; font-size: 12px; line-height: 1.4;">
                  <!-- Logs will be populated here -->
                </div>
              </div>
            </div>

          </div>

          <!-- Status Bar -->
          <div style="background: rgba(0, 0, 0, 0.4); border-top: 1px solid rgba(0, 212, 255, 0.3); padding: 8px 20px; display: flex; justify-content: space-between; align-items: center; font-size: 12px;">
            <div style="display: flex; gap: 20px;">
              <span>Processes: <span id="process-count">0</span></span>
              <span>Selected: <span id="selected-count">0</span></span>
              <span>Running: <span id="running-count">0</span></span>
              <span>CPU Avg: <span id="cpu-average">0%</span></span>
            </div>
            <div style="display: flex; gap: 15px; align-items: center;">
              <span id="last-update">Last update: Never</span>
              <div style="display: flex; align-items: center; gap: 5px;">
                <div id="auto-refresh-indicator" style="width: 6px; height: 6px; background: #00ff88; border-radius: 50%; animation: pulse 1s infinite;"></div>
                <span id="auto-refresh-text">Auto-refresh ON</span>
              </div>
            </div>
          </div>

          <!-- Settings Modal -->
          <div id="settings-modal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.8); z-index: 9999; backdrop-filter: blur(5px);">
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: linear-gradient(135deg, #1a1a2e 0%, #2d2d3a 100%); border: 2px solid rgba(0, 212, 255, 0.5); border-radius: 15px; padding: 30px; width: 500px; max-height: 80vh; overflow-y: auto;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px;">
                <h2 style="margin: 0; color: #00d4ff;">⚙️ Settings</h2>
                <button id="close-settings" style="background: none; border: none; color: #ff4466; font-size: 20px; cursor: pointer;">×</button>
              </div>
              
              <div style="display: flex; flex-direction: column; gap: 20px;">
                <div class="settings-group">
                  <h3 style="margin: 0 0 10px 0; color: #00d4ff; font-size: 16px;">Auto Refresh</h3>
                  <label style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                    <input type="checkbox" id="auto-refresh-toggle" checked>
                    <span>Enable automatic refresh</span>
                  </label>
                  <label style="display: flex; align-items: center; gap: 10px;">
                    <span>Refresh interval:</span>
                    <select id="refresh-interval" style="padding: 5px; background: rgba(0, 0, 0, 0.4); border: 1px solid rgba(0, 212, 255, 0.3); border-radius: 4px; color: white;">
                      <option value="1000">1 second</option>
                      <option value="3000" selected>3 seconds</option>
                      <option value="5000">5 seconds</option>
                      <option value="10000">10 seconds</option>
                    </select>
                  </label>
                </div>
                
                <div class="settings-group">
                  <h3 style="margin: 0 0 10px 0; color: #00d4ff; font-size: 16px;">Alerts</h3>
                  <label style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                    <input type="checkbox" id="notifications-toggle" checked>
                    <span>Show notifications</span>
                  </label>
                  <label style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                    <input type="checkbox" id="sound-alerts-toggle">
                    <span>Sound alerts</span>
                  </label>
                  <label style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                    <span>CPU alert threshold:</span>
                    <input type="range" id="cpu-threshold" min="50" max="100" value="80" style="flex: 1;">
                    <span id="cpu-threshold-value">80%</span>
                  </label>
                  <label style="display: flex; align-items: center; gap: 10px;">
                    <span>Memory alert threshold:</span>
                    <input type="range" id="memory-threshold" min="50" max="100" value="85" style="flex: 1;">
                    <span id="memory-threshold-value">85%</span>
                  </label>
                </div>
                
                <div class="settings-group">
                  <h3 style="margin: 0 0 10px 0; color: #00d4ff; font-size: 16px;">Display</h3>
                  <label style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                    <span>Default sort by:</span>
                    <select id="default-sort" style="padding: 5px; background: rgba(0, 0, 0, 0.4); border: 1px solid rgba(0, 212, 255, 0.3); border-radius: 4px; color: white;">
                      <option value="cpu">CPU Usage</option>
                      <option value="memory">Memory Usage</option>
                      <option value="name">Process Name</option>
                      <option value="pid">Process ID</option>
                    </select>
                  </label>
                </div>
                
                <div style="display: flex; gap: 15px; justify-content: flex-end; margin-top: 20px;">
                  <button id="reset-settings" style="background: rgba(255, 68, 102, 0.2); border: 1px solid rgba(255, 68, 102, 0.5); color: #ff4466; padding: 10px 20px; border-radius: 8px; cursor: pointer;">
                    Reset to Default
                  </button>
                  <button id="save-settings" style="background: rgba(0, 255, 136, 0.2); border: 1px solid rgba(0, 255, 136, 0.5); color: #00ff88; padding: 10px 20px; border-radius: 8px; cursor: pointer;">
                    Save Settings
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Process Details Modal -->
          <div id="process-modal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.8); z-index: 9999; backdrop-filter: blur(5px);">
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: linear-gradient(135deg, #1a1a2e 0%, #2d2d3a 100%); border: 2px solid rgba(0, 212, 255, 0.5); border-radius: 15px; padding: 30px; width: 600px; max-height: 80vh; overflow-y: auto;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px;">
                <h2 id="process-modal-title" style="margin: 0; color: #00d4ff;">Process Details</h2>
                <button id="close-process-modal" style="background: none; border: none; color: #ff4466; font-size: 20px; cursor: pointer;">×</button>
              </div>
              <div id="process-modal-content">
                <!-- Process details will be populated here -->
              </div>
            </div>
          </div>

          <!-- Context Menu -->
          <div id="context-menu" style="display: none; position: fixed; background: rgba(20, 20, 32, 0.95); border: 1px solid rgba(0, 212, 255, 0.4); border-radius: 8px; backdrop-filter: blur(20px); box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6); padding: 8px 0; min-width: 180px; z-index: 10000; font-size: 13px;">
            <!-- Context menu items will be populated here -->
          </div>

        </div>

        <style>
          @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.7; transform: scale(0.95); }
          }

          @keyframes glow {
            0%, 100% { box-shadow: 0 0 10px rgba(0, 212, 255, 0.3); }
            50% { box-shadow: 0 0 20px rgba(0, 212, 255, 0.6); }
          }

          @keyframes slideIn {
            from { transform: translateX(-100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }

          .stat-card {
            background: rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(0, 212, 255, 0.3);
            border-radius: 10px;
            padding: 15px;
            display: flex;
            align-items: center;
            gap: 12px;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
            cursor: pointer;
          }

          .stat-card:hover {
            border-color: rgba(0, 212, 255, 0.6);
            transform: translateY(-2px);
            box-shadow: 0 4px 20px rgba(0, 212, 255, 0.2);
          }

          .stat-card.alert {
            border-color: rgba(255, 68, 102, 0.6);
            animation: glow 2s infinite;
          }

          .stat-icon {
            font-size: 24px;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(0, 212, 255, 0.2);
            border-radius: 8px;
          }

          .stat-content {
            flex: 1;
          }

          .stat-value {
            font-size: 18px;
            font-weight: 700;
            color: #00d4ff;
            margin-bottom: 2px;
          }

          .stat-label {
            font-size: 11px;
            color: rgba(255, 255, 255, 0.7);
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 5px;
          }

          .stat-progress {
            width: 100%;
            height: 4px;
            background: rgba(0, 0, 0, 0.3);
            border-radius: 2px;
            overflow: hidden;
          }

          .stat-progress-bar {
            height: 100%;
            background: linear-gradient(90deg, #00ff88, #ffaa00, #ff4466);
            width: 0%;
            transition: width 0.3s ease;
            border-radius: 2px;
          }

          .tab-btn {
            background: transparent;
            border: none;
            color: rgba(255, 255, 255, 0.7);
            padding: 15px 20px;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.2s ease;
            border-bottom: 2px solid transparent;
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .tab-btn:hover {
            color: #00d4ff;
            background: rgba(0, 212, 255, 0.1);
          }

          .tab-btn.active {
            color: #00d4ff;
            border-bottom-color: #00d4ff;
            background: rgba(0, 212, 255, 0.1);
          }

          .tab-content {
            display: none;
          }

          .tab-content.active {
            display: block;
          }

          #processes-table th {
            padding: 12px 15px;
            text-align: left;
            font-weight: 600;
            color: #00d4ff;
            border-bottom: 1px solid rgba(0, 212, 255, 0.3);
            cursor: pointer;
            transition: all 0.2s ease;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            user-select: none;
          }

          #processes-table th:hover {
            background: rgba(0, 212, 255, 0.2);
          }

          #processes-table th.sortable::after {
            content: " ↕";
            opacity: 0.5;
          }

          #processes-table th.sort-asc::after {
            content: " ↑";
            opacity: 1;
            color: #00ff88;
          }

          #processes-table th.sort-desc::after {
            content: " ↓";
            opacity: 1;
            color: #ff4466;
          }

          #processes-table td {
            padding: 10px 15px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            font-size: 13px;
          }

          #processes-table tbody tr {
            transition: all 0.2s ease;
            cursor: pointer;
          }

          #processes-table tbody tr:hover {
            background: rgba(0, 212, 255, 0.1);
          }

          #processes-table tbody tr.selected {
            background: rgba(0, 212, 255, 0.2);
            border-left: 3px solid #00d4ff;
          }

          .process-status {
            padding: 3px 8px;
            border-radius: 12px;
            font-size: 10px;
            text-transform: uppercase;
            font-weight: 600;
            letter-spacing: 0.5px;
          }

          .process-status.running {
            background: rgba(0, 255, 136, 0.2);
            color: #00ff88;
          }

          .process-status.idle {
            background: rgba(255, 170, 0, 0.2);
            color: #ffaa00;
          }

          .process-status.stopped {
            background: rgba(255, 68, 102, 0.2);
            color: #ff4466;
          }

          .priority-badge {
            padding: 2px 6px;
            border-radius: 8px;
            font-size: 10px;
            font-weight: 600;
          }

          .priority-high {
            background: rgba(255, 68, 102, 0.2);
            color: #ff4466;
          }

          .priority-normal {
            background: rgba(0, 212, 255, 0.2);
            color: #00d4ff;
          }

          .priority-low {
            background: rgba(255, 255, 255, 0.2);
            color: rgba(255, 255, 255, 0.7);
          }

          .chart-container {
            background: rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(0, 212, 255, 0.3);
            border-radius: 10px;
            padding: 20px;
            backdrop-filter: blur(10px);
          }

          .chart-wrapper {
            background: rgba(0, 0, 0, 0.2);
            border-radius: 8px;
            padding: 15px;
            border: 1px solid rgba(0, 212, 255, 0.2);
          }

          .network-stat {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }

          .network-stat:last-child {
            border-bottom: none;
          }

          .context-menu-item {
            padding: 10px 16px;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            gap: 10px;
            color: white;
          }

          .context-menu-item:hover {
            background: rgba(0, 212, 255, 0.15);
            color: #00d4ff;
          }

          .context-menu-item.danger:hover {
            background: rgba(255, 68, 102, 0.15);
            color: #ff4466;
          }

          .context-menu-separator {
            height: 1px;
            background: rgba(0, 212, 255, 0.3);
            margin: 4px 0;
          }

          .log-entry {
            margin-bottom: 8px;
            padding: 8px;
            border-radius: 4px;
            border-left: 3px solid;
            animation: slideIn 0.3s ease;
          }

          .log-entry.system {
            border-left-color: #00d4ff;
            background: rgba(0, 212, 255, 0.1);
          }

          .log-entry.error {
            border-left-color: #ff4466;
            background: rgba(255, 68, 102, 0.1);
          }

          .log-entry.warning {
            border-left-color: #ffaa00;
            background: rgba(255, 170, 0, 0.1);
          }

          .log-entry.info {
            border-left-color: #00ff88;
            background: rgba(0, 255, 136, 0.1);
          }

          .log-timestamp {
            color: rgba(255, 255, 255, 0.6);
            font-size: 11px;
          }

          .log-message {
            margin-top: 4px;
          }

          button:hover {
            transform: translateY(-1px);
          }

          button:active {
            transform: translateY(0);
          }

          button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none;
          }

          input:focus, select:focus {
            outline: none;
            border-color: #00d4ff;
            box-shadow: 0 0 0 2px rgba(0, 212, 255, 0.2);
          }

          /* Scrollbar Styling */
          ::-webkit-scrollbar {
            width: 8px;
          }

          ::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.3);
          }

          ::-webkit-scrollbar-thumb {
            background: rgba(0, 212, 255, 0.5);
            border-radius: 4px;
          }

          ::-webkit-scrollbar-thumb:hover {
            background: rgba(0, 212, 255, 0.7);
          }

          /* Responsive Design */
          @media (max-width: 768px) {
            .stat-card {
              padding: 10px;
            }
            
            .tab-btn {
              padding: 10px 15px;
              font-size: 12px;
            }
            
            #processes-table th,
            #processes-table td {
              padding: 8px 10px;
              font-size: 11px;
            }
            
            .chart-container {
              padding: 15px;
            }
          }
        </style>
      `,
      onInit: (container) => {
        TaskManager._init(container);
      },
      onDestroy: () => {
        TaskManager._cleanup();
      }
    };
  }

  static _init(container) {
    console.log('⚡ Task Manager initializing...');
    TaskManager._container = container;
    TaskManager._isAdmin = TaskManager._checkAdminStatus();
    TaskManager._loadSettings();
    TaskManager._setupEventListeners();
    TaskManager._setupCharts();
    TaskManager._generateMockData();
    TaskManager._updateDisplay();
    TaskManager._startAutoUpdate();
    TaskManager._setupKeyboardShortcuts();
    console.log('✅ Task Manager ready!');
  }

  static _cleanup() {
    if (TaskManager._updateInterval) {
      clearInterval(TaskManager._updateInterval);
      TaskManager._updateInterval = null;
    }
    TaskManager._container = null;
    TaskManager._processes.clear();
    TaskManager._selectedProcesses.clear();
    TaskManager._removeKeyboardShortcuts();
  }

  static _checkAdminStatus() {
    // Check if current user is admin
    return window.EmberFrame?.isAdmin || false;
  }

  static _loadSettings() {
    try {
      const saved = localStorage.getItem('taskmanager-settings');
      if (saved) {
        TaskManager._settings = { ...TaskManager._settings, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Failed to load settings');
    }
  }

  static _saveSettings() {
    try {
      localStorage.setItem('taskmanager-settings', JSON.stringify(TaskManager._settings));
    } catch (e) {
      console.warn('Failed to save settings');
    }
  }

  static _setupEventListeners() {
    // Tab switching
    TaskManager._container.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        TaskManager._switchTab(tab);
      });
    });

    // Search functionality
    const searchInput = TaskManager._container.querySelector('#search-input');
    searchInput.addEventListener('input', () => {
      TaskManager._filterProcesses();
    });

    // Filters
    const priorityFilter = TaskManager._container.querySelector('#priority-filter');
    priorityFilter.addEventListener('change', () => {
      TaskManager._filterProcesses();
    });

    const statusFilter = TaskManager._container.querySelector('#status-filter');
    statusFilter.addEventListener('change', () => {
      TaskManager._filterProcesses();
    });

    // Buttons
    const refreshBtn = TaskManager._container.querySelector('#refresh-btn');
    refreshBtn.addEventListener('click', () => {
      TaskManager._refreshData();
    });

    const endTaskBtn = TaskManager._container.querySelector('#end-task-btn');
    endTaskBtn.addEventListener('click', () => {
      TaskManager._endSelectedTasks();
    });

    const selectAllBtn = TaskManager._container.querySelector('#select-all-btn');
    selectAllBtn.addEventListener('click', () => {
      TaskManager._toggleSelectAll();
    });

    const priorityBtn = TaskManager._container.querySelector('#priority-btn');
    priorityBtn.addEventListener('click', () => {
      TaskManager._changePriority();
    });

    const exportBtn = TaskManager._container.querySelector('#export-btn');
    exportBtn.addEventListener('click', () => {
      TaskManager._exportData();
    });

    // Settings
    const settingsBtn = TaskManager._container.querySelector('#settings-btn');
    settingsBtn.addEventListener('click', () => {
      TaskManager._showSettings();
    });

    const closeSettingsBtn = TaskManager._container.querySelector('#close-settings');
    closeSettingsBtn.addEventListener('click', () => {
      TaskManager._hideSettings();
    });

    const saveSettingsBtn = TaskManager._container.querySelector('#save-settings');
    saveSettingsBtn.addEventListener('click', () => {
      TaskManager._applySettings();
    });

    const resetSettingsBtn = TaskManager._container.querySelector('#reset-settings');
    resetSettingsBtn.addEventListener('click', () => {
      TaskManager._resetSettings();
    });

    // Settings controls
    const autoRefreshToggle = TaskManager._container.querySelector('#auto-refresh-toggle');
    autoRefreshToggle.addEventListener('change', () => {
      TaskManager._toggleAutoRefresh(autoRefreshToggle.checked);
    });

    const cpuThreshold = TaskManager._container.querySelector('#cpu-threshold');
    cpuThreshold.addEventListener('input', (e) => {
      TaskManager._container.querySelector('#cpu-threshold-value').textContent = e.target.value + '%';
    });

    const memoryThreshold = TaskManager._container.querySelector('#memory-threshold');
    memoryThreshold.addEventListener('input', (e) => {
      TaskManager._container.querySelector('#memory-threshold-value').textContent = e.target.value + '%';
    });

    // Process table sorting
    TaskManager._container.querySelectorAll('.sortable').forEach(header => {
      header.addEventListener('click', () => {
        const sortBy = header.dataset.sort;
        TaskManager._sortProcesses(sortBy);
      });
    });

    // Select all checkbox
    const selectAllCheckbox = TaskManager._container.querySelector('#select-all-checkbox');
    selectAllCheckbox.addEventListener('change', () => {
      TaskManager._toggleSelectAll();
    });

    // Process row interactions
    TaskManager._container.addEventListener('click', (e) => {
      const row = e.target.closest('#processes-tbody tr');
      if (row && !e.target.closest('button')) {
        if (e.ctrlKey || e.metaKey) {
          TaskManager._toggleProcessSelection(row);
        } else {
          TaskManager._selectProcess(row, !e.shiftKey);
        }
      }
    });

    // Double-click for process details
    TaskManager._container.addEventListener('dblclick', (e) => {
      const row = e.target.closest('#processes-tbody tr');
      if (row) {
        TaskManager._showProcessDetails(row);
      }
    });

    // Context menu
    TaskManager._container.addEventListener('contextmenu', (e) => {
      const row = e.target.closest('#processes-tbody tr');
      if (row) {
        e.preventDefault();
        TaskManager._showContextMenu(e.clientX, e.clientY, row);
      }
    });

    // Close context menu
    document.addEventListener('click', () => {
      TaskManager._hideContextMenu();
    });

    // Process modal
    const closeProcessModal = TaskManager._container.querySelector('#close-process-modal');
    closeProcessModal.addEventListener('click', () => {
      TaskManager._hideProcessModal();
    });

    // Logs
    const clearLogsBtn = TaskManager._container.querySelector('#clear-logs-btn');
    clearLogsBtn.addEventListener('click', () => {
      TaskManager._clearLogs();
    });

    const exportLogsBtn = TaskManager._container.querySelector('#export-logs-btn');
    exportLogsBtn.addEventListener('click', () => {
      TaskManager._exportLogs();
    });

    const logFilter = TaskManager._container.querySelector('#log-filter');
    logFilter.addEventListener('change', () => {
      TaskManager._filterLogs();
    });

    // Stat card clicks
    TaskManager._container.querySelectorAll('.stat-card').forEach(card => {
      card.addEventListener('click', () => {
        const stat = card.dataset.stat;
        if (stat) {
          TaskManager._showStatDetails(stat);
        }
      });
    });
  }

  static _setupCharts() {
    // Initialize charts for performance monitoring
    TaskManager._setupCPUChart();
    TaskManager._setupMemoryChart();
    TaskManager._setupNetworkChart();
  }

  static _setupCPUChart() {
    const canvas = TaskManager._container.querySelector('#cpu-chart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    TaskManager._charts.cpu = {
      canvas: canvas,
      ctx: ctx,
      data: []
    };
  }

  static _setupMemoryChart() {
    const canvas = TaskManager._container.querySelector('#memory-chart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    TaskManager._charts.memory = {
      canvas: canvas,
      ctx: ctx,
      data: []
    };
  }

  static _setupNetworkChart() {
    const canvas = TaskManager._container.querySelector('#network-chart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    TaskManager._charts.network = {
      canvas: canvas,
      ctx: ctx,
      data: []
    };
  }

  static _drawChart(chartName, data, color = '#00d4ff') {
    const chart = TaskManager._charts[chartName];
    if (!chart || !chart.ctx) return;

    const { ctx, canvas } = chart;
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Set up styling
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.fillStyle = color + '20';

    if (data.length < 2) return;

    // Draw line chart
    ctx.beginPath();
    const step = width / (data.length - 1);

    data.forEach((value, index) => {
      const x = index * step;
      const y = height - (value / 100) * height;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();

    // Fill area under curve
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // Draw grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;

    // Horizontal grid lines
    for (let i = 0; i <= 4; i++) {
      const y = (height / 4) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  }

  static _setupKeyboardShortcuts() {
    TaskManager._keyboardHandler = (e) => {
      // Ctrl+R: Refresh
      if (e.ctrlKey && e.key === 'r') {
        e.preventDefault();
        TaskManager._refreshData();
      }
      // Ctrl+A: Select All
      else if (e.ctrlKey && e.key === 'a') {
        e.preventDefault();
        TaskManager._selectAllProcesses();
      }
      // Delete: End selected tasks
      else if (e.key === 'Delete' && TaskManager._selectedProcesses.size > 0) {
        e.preventDefault();
        TaskManager._endSelectedTasks();
      }
      // Escape: Clear selection
      else if (e.key === 'Escape') {
        TaskManager._clearSelection();
      }
      // Ctrl+F: Focus search
      else if (e.ctrlKey && e.key === 'f') {
        e.preventDefault();
        TaskManager._container.querySelector('#search-input').focus();
      }
    };

    document.addEventListener('keydown', TaskManager._keyboardHandler);
  }

  static _removeKeyboardShortcuts() {
    if (TaskManager._keyboardHandler) {
      document.removeEventListener('keydown', TaskManager._keyboardHandler);
      TaskManager._keyboardHandler = null;
    }
  }

  static _generateMockData() {
    const processNames = [
      'EmberFrame Core', 'Window Manager', 'Desktop Service', 'File Manager',
      'Text Editor', 'Terminal Service', 'Network Manager', 'Audio Service',
      'Theme Engine', 'Notification Service', 'Security Monitor', 'System Updater',
      'Background Sync', 'WebSocket Handler', 'Cache Manager', 'Memory Optimizer',
      'Database Service', 'Backup Manager', 'Log Analyzer', 'Performance Monitor'
    ];

    const priorities = ['high', 'normal', 'low'];
    const statuses = ['running', 'idle', 'stopped'];

    TaskManager._processes.clear();

    processNames.forEach((name, index) => {
      const process = {
        id: index + 1,
        name: name,
        pid: 1000 + index,
        cpu: Math.random() * 100,
        memory: Math.random() * 512,
        priority: priorities[Math.floor(Math.random() * priorities.length)],
        status: index < 15 ? 'running' : statuses[Math.floor(Math.random() * statuses.length)],
        startTime: new Date(Date.now() - Math.random() * 86400000),
        selected: false,
        threads: Math.floor(Math.random() * 10) + 1,
        handles: Math.floor(Math.random() * 100) + 10,
        commandLine: `/usr/bin/${name.toLowerCase().replace(/\s+/g, '-')}`
      };
      TaskManager._processes.set(process.id, process);
    });

    // Update system stats
    TaskManager._systemStats.cpu = Math.random() * 60 + 20;
    TaskManager._systemStats.memory = Math.random() * 40 + 30;
    TaskManager._systemStats.storage = Math.random() * 30 + 45;
    TaskManager._systemStats.uptime = Date.now() - (Math.random() * 86400000 * 7);

    // Add to historical data
    TaskManager._addHistoricalData();

    // Generate logs
    TaskManager._generateLogs();
  }

  static _addHistoricalData() {
    const maxPoints = 50;

    // Add current stats to history
    TaskManager._historicalData.cpu.push(TaskManager._systemStats.cpu);
    TaskManager._historicalData.memory.push(TaskManager._systemStats.memory);
    TaskManager._historicalData.network.push(Math.random() * 100);

    // Keep only last N points
    if (TaskManager._historicalData.cpu.length > maxPoints) {
      TaskManager._historicalData.cpu.shift();
    }
    if (TaskManager._historicalData.memory.length > maxPoints) {
      TaskManager._historicalData.memory.shift();
    }
    if (TaskManager._historicalData.network.length > maxPoints) {
      TaskManager._historicalData.network.shift();
    }
  }

  static _generateLogs() {
    if (!TaskManager._logs) {
      TaskManager._logs = [];
    }

    const logTypes = ['system', 'info', 'warning', 'error'];
    const messages = [
      'Process started successfully',
      'Memory usage optimization completed',
      'Network connection established',
      'Cache cleared automatically',
      'Security scan completed',
      'Background task finished',
      'Configuration updated',
      'System performance optimized'
    ];

    // Add new log entry
    const logEntry = {
      id: Date.now(),
      timestamp: new Date(),
      type: logTypes[Math.floor(Math.random() * logTypes.length)],
      message: messages[Math.floor(Math.random() * messages.length)],
      process: Array.from(TaskManager._processes.values())[Math.floor(Math.random() * TaskManager._processes.size)]?.name || 'System'
    };

    TaskManager._logs.unshift(logEntry);

    // Keep only last 100 logs
    if (TaskManager._logs.length > 100) {
      TaskManager._logs = TaskManager._logs.slice(0, 100);
    }
  }

  static _updateDisplay() {
    TaskManager._updateStatsBar();
    TaskManager._updateProcessTable();
    TaskManager._updatePerformanceTab();
    TaskManager._updateNetworkTab();
    TaskManager._updateStorageTab();
    TaskManager._updateUsersTab();
    TaskManager._updateLogsTab();
    TaskManager._updateStatusBar();
    TaskManager._updateCharts();
    TaskManager._checkAlerts();
  }

  static _updateStatsBar() {
    const cpuEl = TaskManager._container.querySelector('#cpu-usage');
    const memoryEl = TaskManager._container.querySelector('#memory-usage');
    const storageEl = TaskManager._container.querySelector('#storage-usage');
    const uptimeEl = TaskManager._container.querySelector('#uptime');
    const usersEl = TaskManager._container.querySelector('#active-users');

    // Update values
    if (cpuEl) cpuEl.textContent = TaskManager._systemStats.cpu.toFixed(1) + '%';
    if (memoryEl) memoryEl.textContent = TaskManager._systemStats.memory.toFixed(1) + '%';
    if (storageEl) storageEl.textContent = TaskManager._systemStats.storage.toFixed(1) + '%';

    if (uptimeEl) {
      const uptime = Date.now() - TaskManager._systemStats.uptime;
      const hours = Math.floor(uptime / (1000 * 60 * 60));
      const minutes = Math.floor((uptime % (1000 * 60 * 60)) / (1000 * 60));
      uptimeEl.textContent = `${hours}h ${minutes}m`;
    }

    if (usersEl) usersEl.textContent = TaskManager._systemStats.activeUsers;

    // Update progress bars
    const cpuProgress = TaskManager._container.querySelector('#cpu-progress');
    const memoryProgress = TaskManager._container.querySelector('#memory-progress');
    const storageProgress = TaskManager._container.querySelector('#storage-progress');

    if (cpuProgress) cpuProgress.style.width = TaskManager._systemStats.cpu + '%';
    if (memoryProgress) memoryProgress.style.width = TaskManager._systemStats.memory + '%';
    if (storageProgress) storageProgress.style.width = TaskManager._systemStats.storage + '%';
  }

  static _updateProcessTable() {
    const tbody = TaskManager._container.querySelector('#processes-tbody');
    if (!tbody) return;

    tbody.innerHTML = '';

    // Sort processes
    const sortedProcesses = Array.from(TaskManager._processes.values()).sort((a, b) => {
      let aVal = a[TaskManager._sortBy];
      let bVal = b[TaskManager._sortBy];

      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }

      if (TaskManager._sortDirection === 'asc') {
        return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      } else {
        return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
      }
    });

    sortedProcesses.forEach(process => {
      const row = document.createElement('tr');
      row.dataset.processId = process.id;
      if (process.selected) row.classList.add('selected');

      const formatMemory = (mb) => mb < 1024 ? `${mb.toFixed(1)} MB` : `${(mb/1024).toFixed(1)} GB`;
      const formatTime = (date) => {
        const now = new Date();
        const diff = now - date;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        return `${hours}h ${minutes}m ago`;
      };

      row.innerHTML = `
        <td style="text-align: center;">
          <input type="checkbox" ${process.selected ? 'checked' : ''} onchange="TaskManager._toggleProcessSelection(this.closest('tr'))">
        </td>
        <td style="font-weight: 500;">${process.name}</td>
        <td style="font-family: monospace;">${process.pid}</td>
        <td style="font-family: monospace; color: ${process.cpu > 50 ? '#ff4466' : process.cpu > 25 ? '#ffaa00' : '#00ff88'};">${process.cpu.toFixed(1)}%</td>
        <td style="font-family: monospace;">${formatMemory(process.memory)}</td>
        <td><span class="priority-badge priority-${process.priority}">${process.priority.toUpperCase()}</span></td>
        <td><span class="process-status ${process.status}">${process.status.toUpperCase()}</span></td>
        <td style="font-size: 11px; color: rgba(255, 255, 255, 0.7);">${formatTime(process.startTime)}</td>
        <td>
          <div style="display: flex; gap: 5px;">
            <button style="background: rgba(255, 68, 102, 0.2); border: 1px solid rgba(255, 68, 102, 0.5); color: #ff4466; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 11px;" onclick="TaskManager._endProcess(${process.id})">
              End
            </button>
            <button style="background: rgba(0, 212, 255, 0.2); border: 1px solid rgba(0, 212, 255, 0.5); color: #00d4ff; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 11px;" onclick="TaskManager._showProcessDetails(this.closest('tr'))">
              Details
            </button>
          </div>
        </td>
      `;

      tbody.appendChild(row);
    });
  }

  static _updatePerformanceTab() {
    // Update system info
    const systemInfo = TaskManager._container.querySelector('#system-info');
    if (systemInfo) {
      systemInfo.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 10px;">
          <div style="display: flex; justify-content: space-between;">
            <span>Browser:</span>
            <span style="color: #00d4ff;">${navigator.userAgent.split(' ')[0]}</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span>Platform:</span>
            <span style="color: #00d4ff;">${navigator.platform}</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span>Screen Resolution:</span>
            <span style="color: #00d4ff;">${screen.width}x${screen.height}</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span>Available Memory:</span>
            <span style="color: #00d4ff;">${navigator.deviceMemory || 'Unknown'} GB</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span>CPU Cores:</span>
            <span style="color: #00d4ff;">${navigator.hardwareConcurrency || 'Unknown'}</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span>Connection:</span>
            <span style="color: #00d4ff;">${navigator.connection?.effectiveType || 'Unknown'}</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span>Language:</span>
            <span style="color: #00d4ff;">${navigator.language}</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span>Timezone:</span>
            <span style="color: #00d4ff;">${Intl.DateTimeFormat().resolvedOptions().timeZone}</span>
          </div>
        </div>
      `;
    }

    // Update process summary
    const processSummary = TaskManager._container.querySelector('#process-summary');
    if (processSummary) {
      const processes = Array.from(TaskManager._processes.values());
      const runningProcesses = processes.filter(p => p.status === 'running');
      const totalCpu = processes.reduce((sum, p) => sum + p.cpu, 0);
      const totalMemory = processes.reduce((sum, p) => sum + p.memory, 0);
      const avgCpu = totalCpu / processes.length;
      const highCpuProcesses = processes.filter(p => p.cpu > 50);

      processSummary.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 10px;">
          <div style="display: flex; justify-content: space-between;">
            <span>Running Processes:</span>
            <span style="color: #00ff88;">${runningProcesses.length}</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span>Total Processes:</span>
            <span style="color: #00d4ff;">${processes.length}</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span>Average CPU:</span>
            <span style="color: #ffaa00;">${avgCpu.toFixed(1)}%</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span>Total Memory:</span>
            <span style="color: #ff4466;">${(totalMemory/1024).toFixed(1)} GB</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span>High CPU (>50%):</span>
            <span style="color: #ff4466;">${highCpuProcesses.length}</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span>Selected:</span>
            <span style="color: #00d4ff;">${TaskManager._selectedProcesses.size}</span>
          </div>
        </div>
      `;
    }
  }

  static _updateNetworkTab() {
    // Simulate network stats
    const downloadSpeed = TaskManager._container.querySelector('#download-speed');
    const uploadSpeed = TaskManager._container.querySelector('#upload-speed');
    const activeConnections = TaskManager._container.querySelector('#active-connections');
    const totalRequests = TaskManager._container.querySelector('#total-requests');

    if (downloadSpeed) downloadSpeed.textContent = (Math.random() * 1000 + 100).toFixed(0) + ' KB/s';
    if (uploadSpeed) uploadSpeed.textContent = (Math.random() * 500 + 50).toFixed(0) + ' KB/s';
    if (activeConnections) activeConnections.textContent = Math.floor(Math.random() * 20 + 5);
    if (totalRequests) totalRequests.textContent = Math.floor(Math.random() * 1000 + 500);

    // Update connection details
    const connectionDetails = TaskManager._container.querySelector('#connection-details');
    if (connectionDetails) {
      connectionDetails.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 10px;">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
            <div style="width: 10px; height: 10px; background: #00ff88; border-radius: 50%;"></div>
            <span>WebSocket: Connected</span>
          </div>
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
            <div style="width: 10px; height: 10px; background: #00ff88; border-radius: 50%;"></div>
            <span>HTTP: Active</span>
          </div>
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
            <div style="width: 10px; height: 10px; background: #ffaa00; border-radius: 50%;"></div>
            <span>Latency: ~${Math.floor(Math.random() * 100 + 20)}ms</span>
          </div>
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
            <div style="width: 10px; height: 10px; background: #00d4ff; border-radius: 50%;"></div>
            <span>Protocol: HTTP/2</span>
          </div>
          <div style="margin-top: 15px; padding: 10px; background: rgba(0, 0, 0, 0.2); border-radius: 6px;">
            <div style="font-size: 12px; color: rgba(255, 255, 255, 0.7); margin-bottom: 5px;">Recent Activity:</div>
            <div style="font-size: 11px; font-family: monospace;">
              <div>GET /api/processes - 200 OK</div>
              <div>POST /api/refresh - 200 OK</div>
              <div>WS message received</div>
            </div>
          </div>
        </div>
      `;
    }
  }

  static _updateStorageTab() {
    const storageBreakdown = TaskManager._container.querySelector('#storage-breakdown');
    const fileStats = TaskManager._container.querySelector('#file-stats');
    const diskAnalysis = TaskManager._container.querySelector('#disk-analysis');
    const cleanupSuggestions = TaskManager._container.querySelector('#cleanup-suggestions');

    if (storageBreakdown) {
      const total = 100;
      const used = TaskManager._systemStats.storage;
      const free = total - used;

      storageBreakdown.innerHTML = `
        <div style="margin-bottom: 20px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span>Used Space</span>
            <span style="color: #ff4466;">${used.toFixed(1)} GB</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span>Free Space</span>
            <span style="color: #00ff88;">${free.toFixed(1)} GB</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
            <span>Total Space</span>
            <span style="color: #00d4ff;">${total} GB</span>
          </div>
          <div style="background: rgba(0, 0, 0, 0.3); border-radius: 10px; height: 20px; overflow: hidden;">
            <div style="height: 100%; background: linear-gradient(90deg, #00ff88, #ffaa00, #ff4466); width: ${used}%; transition: width 0.3s ease;"></div>
          </div>
        </div>
        <div style="font-size: 12px; color: rgba(255, 255, 255, 0.7);">
          Storage usage: ${used.toFixed(1)}% of ${total} GB
        </div>
      `;
    }

    if (fileStats) {
      fileStats.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 10px;">
          <div style="display: flex; justify-content: space-between;">
            <span>Documents:</span>
            <span style="color: #00d4ff;">${Math.floor(Math.random() * 500 + 100)}</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span>Images:</span>
            <span style="color: #00d4ff;">${Math.floor(Math.random() * 200 + 50)}</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span>Videos:</span>
            <span style="color: #00d4ff;">${Math.floor(Math.random() * 50 + 10)}</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span>Applications:</span>
            <span style="color: #00d4ff;">${Math.floor(Math.random() * 30 + 15)}</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span>Cache Files:</span>
            <span style="color: #ffaa00;">${Math.floor(Math.random() * 100 + 25)}</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span>Temp Files:</span>
            <span style="color: #ff4466;">${Math.floor(Math.random() * 50 + 10)}</span>
          </div>
        </div>
      `;
    }

    if (diskAnalysis) {
      diskAnalysis.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 10px;">
          <div style="display: flex; justify-content: space-between;">
            <span>Read Speed:</span>
            <span style="color: #00ff88;">${(Math.random() * 500 + 100).toFixed(0)} MB/s</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span>Write Speed:</span>
            <span style="color: #00ff88;">${(Math.random() * 300 + 80).toFixed(0)} MB/s</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span>Disk Type:</span>
            <span style="color: #00d4ff;">SSD</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span>File System:</span>
            <span style="color: #00d4ff;">NTFS</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span>Fragmentation:</span>
            <span style="color: #00ff88;">${Math.floor(Math.random() * 5 + 1)}%</span>
          </div>
        </div>
      `;
    }

    if (cleanupSuggestions) {
      const suggestions = [
        'Clear browser cache (156 MB)',
        'Delete temporary files (89 MB)',
        'Remove old log files (234 MB)',
        'Clean system cache (67 MB)'
      ];

      cleanupSuggestions.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 8px;">
          ${suggestions.map(suggestion => `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px; background: rgba(0, 0, 0, 0.2); border-radius: 6px;">
              <span style="font-size: 12px;">${suggestion}</span>
              <button style="background: rgba(0, 212, 255, 0.2); border: 1px solid rgba(0, 212, 255, 0.5); color: #00d4ff; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 10px;">
                Clean
              </button>
            </div>
          `).join('')}
        </div>
      `;
    }
  }

  static _updateUsersTab() {
    const activeSessions = TaskManager._container.querySelector('#active-sessions');
    const sessionHistory = TaskManager._container.querySelector('#session-history');

    if (activeSessions) {
      const currentUser = window.EmberFrame?.currentUser || 'User';
      activeSessions.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 15px;">
          <div style="background: rgba(0, 255, 136, 0.1); border: 1px solid rgba(0, 255, 136, 0.3); border-radius: 8px; padding: 15px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
              <span style="font-weight: 600;">${currentUser}</span>
              <span style="color: #00ff88; font-size: 12px;">ACTIVE</span>
            </div>
            <div style="font-size: 14px; opacity: 0.8;">
              Session started: ${new Date().toLocaleTimeString()}<br>
              IP Address: 127.0.0.1<br>
              Browser: ${navigator.userAgent.split(' ')[0]}<br>
              Platform: ${navigator.platform}
            </div>
          </div>
          ${TaskManager._isAdmin ? `
            <div style="background: rgba(0, 212, 255, 0.1); border: 1px solid rgba(0, 212, 255, 0.3); border-radius: 8px; padding: 15px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <span style="font-weight: 600;">Admin User</span>
                <span style="color: #00d4ff; font-size: 12px;">ELEVATED</span>
              </div>
              <div style="font-size: 14px; opacity: 0.8;">
                Admin privileges active<br>
                Can manage all processes<br>
                System monitoring enabled
              </div>
            </div>
          ` : ''}
        </div>
      `;
    }

    if (sessionHistory) {
      const recentSessions = [
        { time: '2 hours ago', duration: '45 min', status: 'Completed', ip: '127.0.0.1' },
        { time: '1 day ago', duration: '2h 15m', status: 'Completed', ip: '127.0.0.1' },
        { time: '2 days ago', duration: '1h 30m', status: 'Completed', ip: '127.0.0.1' },
        { time: '3 days ago', duration: '3h 45m', status: 'Completed', ip: '127.0.0.1' },
      ];

      sessionHistory.innerHTML = recentSessions.map(session => `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
          <div>
            <div>${session.time}</div>
            <div style="font-size: 11px; color: rgba(255, 255, 255, 0.6);">${session.ip}</div>
          </div>
          <span style="color: #00d4ff;">${session.duration}</span>
          <span style="color: #00ff88; font-size: 12px;">${session.status}</span>
        </div>
      `).join('');
    }
  }

  static _updateLogsTab() {
    const logsContainer = TaskManager._container.querySelector('#logs-container');
    if (!logsContainer || !TaskManager._logs) return;

    const filter = TaskManager._container.querySelector('#log-filter')?.value || 'all';
    const filteredLogs = filter === 'all' ? TaskManager._logs : TaskManager._logs.filter(log => log.type === filter);

    logsContainer.innerHTML = filteredLogs.slice(0, 50).map(log => `
      <div class="log-entry ${log.type}">
        <div class="log-timestamp">${log.timestamp.toLocaleTimeString()} - ${log.type.toUpperCase()}</div>
        <div class="log-message">[${log.process}] ${log.message}</div>
      </div>
    `).join('');

    // Auto-scroll to bottom
    logsContainer.scrollTop = logsContainer.scrollHeight;
  }

  static _updateStatusBar() {
    const processCount = TaskManager._container.querySelector('#process-count');
    const selectedCount = TaskManager._container.querySelector('#selected-count');
    const runningCount = TaskManager._container.querySelector('#running-count');
    const cpuAverage = TaskManager._container.querySelector('#cpu-average');
    const lastUpdate = TaskManager._container.querySelector('#last-update');

    if (processCount) processCount.textContent = TaskManager._processes.size;
    if (selectedCount) selectedCount.textContent = TaskManager._selectedProcesses.size;

    const running = Array.from(TaskManager._processes.values()).filter(p => p.status === 'running').length;
    if (runningCount) runningCount.textContent = running;

    const avgCpu = Array.from(TaskManager._processes.values()).reduce((sum, p) => sum + p.cpu, 0) / TaskManager._processes.size;
    if (cpuAverage) cpuAverage.textContent = avgCpu.toFixed(1) + '%';

    if (lastUpdate) lastUpdate.textContent = `Last update: ${new Date().toLocaleTimeString()}`;

    // Update buttons
    const endTaskBtn = TaskManager._container.querySelector('#end-task-btn');
    const priorityBtn = TaskManager._container.querySelector('#priority-btn');

    if (endTaskBtn) endTaskBtn.disabled = TaskManager._selectedProcesses.size === 0;
    if (priorityBtn) priorityBtn.disabled = TaskManager._selectedProcesses.size === 0;

    // Update select all checkbox
    const selectAllCheckbox = TaskManager._container.querySelector('#select-all-checkbox');
    if (selectAllCheckbox) {
      const visibleProcesses = Array.from(TaskManager._processes.values()).filter(p => {
        const row = TaskManager._container.querySelector(`tr[data-process-id="${p.id}"]`);
        return row && row.style.display !== 'none';
      });

      selectAllCheckbox.indeterminate = TaskManager._selectedProcesses.size > 0 && TaskManager._selectedProcesses.size < visibleProcesses.length;
      selectAllCheckbox.checked = TaskManager._selectedProcesses.size > 0 && TaskManager._selectedProcesses.size === visibleProcesses.length;
    }
  }

  static _updateCharts() {
    // Update charts with historical data
    if (TaskManager._charts.cpu && TaskManager._historicalData.cpu.length > 0) {
      TaskManager._drawChart('cpu', TaskManager._historicalData.cpu, '#00d4ff');
    }

    if (TaskManager._charts.memory && TaskManager._historicalData.memory.length > 0) {
      TaskManager._drawChart('memory', TaskManager._historicalData.memory, '#ff4466');
    }

    if (TaskManager._charts.network && TaskManager._historicalData.network.length > 0) {
      TaskManager._drawChart('network', TaskManager._historicalData.network, '#00ff88');
    }
  }

  static _checkAlerts() {
    if (!TaskManager._settings.showNotifications) return;

    const cpuCard = TaskManager._container.querySelector('.stat-card[data-stat="cpu"]');
    const memoryCard = TaskManager._container.querySelector('.stat-card[data-stat="memory"]');

    // CPU Alert
    if (TaskManager._systemStats.cpu > TaskManager._settings.cpuAlertThreshold) {
      if (cpuCard) cpuCard.classList.add('alert');

      if (!TaskManager._cpuAlertShown) {
        TaskManager._cpuAlertShown = true;
        TaskManager._showAlert('High CPU Usage', `CPU usage is at ${TaskManager._systemStats.cpu.toFixed(1)}%`, 'warning');
      }
    } else {
      if (cpuCard) cpuCard.classList.remove('alert');
      TaskManager._cpuAlertShown = false;
    }

    // Memory Alert
    if (TaskManager._systemStats.memory > TaskManager._settings.memoryAlertThreshold) {
      if (memoryCard) memoryCard.classList.add('alert');

      if (!TaskManager._memoryAlertShown) {
        TaskManager._memoryAlertShown = true;
        TaskManager._showAlert('High Memory Usage', `Memory usage is at ${TaskManager._systemStats.memory.toFixed(1)}%`, 'warning');
      }
    } else {
      if (memoryCard) memoryCard.classList.remove('alert');
      TaskManager._memoryAlertShown = false;
    }
  }

  static _showAlert(title, message, type = 'info') {
    if (window.Notification) {
      window.Notification[type](`${title}: ${message}`);
    }

    if (TaskManager._settings.soundAlerts) {
      // Play alert sound (you could add actual audio here)
      console.log('🔔 Alert sound would play here');
    }
  }

  // Continue with remaining methods...

  static _switchTab(tabName) {
    // Update tab buttons
    TaskManager._container.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabName);
    });

    // Update tab content
    TaskManager._container.querySelectorAll('.tab-content').forEach(content => {
      content.classList.toggle('active', content.id === `tab-${tabName}`);
    });

    TaskManager._currentTab = tabName;
  }

  static _filterProcesses() {
    const searchTerm = TaskManager._container.querySelector('#search-input').value.toLowerCase();
    const priorityFilter = TaskManager._container.querySelector('#priority-filter').value;
    const statusFilter = TaskManager._container.querySelector('#status-filter').value;

    const rows = TaskManager._container.querySelectorAll('#processes-tbody tr');
    rows.forEach(row => {
      const processId = parseInt(row.dataset.processId);
      const process = TaskManager._processes.get(processId);

      if (!process) return;

      const matchesSearch = process.name.toLowerCase().includes(searchTerm) ||
                          process.pid.toString().includes(searchTerm);
      const matchesPriority = priorityFilter === 'all' || process.priority === priorityFilter;
      const matchesStatus = statusFilter === 'all' || process.status === statusFilter;

      row.style.display = matchesSearch && matchesPriority && matchesStatus ? '' : 'none';
    });
  }

  static _sortProcesses(sortBy) {
    // Update sort direction
    if (TaskManager._sortBy === sortBy) {
      TaskManager._sortDirection = TaskManager._sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      TaskManager._sortBy = sortBy;
      TaskManager._sortDirection = 'desc';
    }

    // Update header indicators
    TaskManager._container.querySelectorAll('#processes-table th.sortable').forEach(th => {
      th.classList.remove('sort-asc', 'sort-desc');
    });

    const currentHeader = TaskManager._container.querySelector(`#processes-table th[data-sort="${sortBy}"]`);
    if (currentHeader) {
      currentHeader.classList.add(`sort-${TaskManager._sortDirection}`);
    }

    // Re-render table
    TaskManager._updateProcessTable();
  }

  static _selectProcess(row, clearOthers = true) {
    const processId = parseInt(row.dataset.processId);
    const process = TaskManager._processes.get(processId);

    if (!process) return;

    if (clearOthers) {
      TaskManager._clearSelection();
    }

    process.selected = true;
    TaskManager._selectedProcesses.add(processId);
    row.classList.add('selected');
    row.querySelector('input[type="checkbox"]').checked = true;

    TaskManager._updateStatusBar();
  }

  static _toggleProcessSelection(row) {
    const processId = parseInt(row.dataset.processId);
    const process = TaskManager._processes.get(processId);

    if (!process) return;

    process.selected = !process.selected;

    if (process.selected) {
      TaskManager._selectedProcesses.add(processId);
      row.classList.add('selected');
    } else {
      TaskManager._selectedProcesses.delete(processId);
      row.classList.remove('selected');
    }

    row.querySelector('input[type="checkbox"]').checked = process.selected;
    TaskManager._updateStatusBar();
  }

  static _toggleSelectAll() {
    const visibleRows = Array.from(TaskManager._container.querySelectorAll('#processes-tbody tr')).filter(row =>
      row.style.display !== 'none'
    );

    const allSelected = visibleRows.every(row => {
      const processId = parseInt(row.dataset.processId);
      return TaskManager._selectedProcesses.has(processId);
    });

    if (allSelected) {
      // Deselect all visible
      visibleRows.forEach(row => {
        const processId = parseInt(row.dataset.processId);
        const process = TaskManager._processes.get(processId);
        if (process) {
          process.selected = false;
          TaskManager._selectedProcesses.delete(processId);
          row.classList.remove('selected');
          row.querySelector('input[type="checkbox"]').checked = false;
        }
      });
    } else {
      // Select all visible
      visibleRows.forEach(row => {
        const processId = parseInt(row.dataset.processId);
        const process = TaskManager._processes.get(processId);
        if (process) {
          process.selected = true;
          TaskManager._selectedProcesses.add(processId);
          row.classList.add('selected');
          row.querySelector('input[type="checkbox"]').checked = true;
        }
      });
    }

    TaskManager._updateStatusBar();
  }

  static _selectAllProcesses() {
    TaskManager._processes.forEach((process, id) => {
      process.selected = true;
      TaskManager._selectedProcesses.add(id);
    });
    TaskManager._updateProcessTable();
    TaskManager._updateStatusBar();
  }

  static _clearSelection() {
    TaskManager._selectedProcesses.clear();
    TaskManager._processes.forEach(process => {
      process.selected = false;
    });
    TaskManager._container.querySelectorAll('#processes-tbody tr').forEach(row => {
      row.classList.remove('selected');
      row.querySelector('input[type="checkbox"]').checked = false;
    });
    TaskManager._updateStatusBar();
  }

  static _endProcess(processId) {
    const process = TaskManager._processes.get(processId);
    if (!process) return;

    if (confirm(`Are you sure you want to end "${process.name}"?`)) {
      process.status = 'stopped';
      process.cpu = 0;
      process.selected = false;
      TaskManager._selectedProcesses.delete(processId);

      TaskManager._updateProcessTable();
      TaskManager._updateStatusBar();

      TaskManager._addLog('system', `Process "${process.name}" (PID: ${process.pid}) terminated by user`);

      if (window.Notification) {
        window.Notification.success(`Process "${process.name}" terminated`);
      }
    }
  }

  static _endSelectedTasks() {
    const selectedProcesses = Array.from(TaskManager._selectedProcesses).map(id => TaskManager._processes.get(id)).filter(Boolean);

    if (selectedProcesses.length === 0) return;

    if (confirm(`Are you sure you want to end ${selectedProcesses.length} selected process(es)?`)) {
      selectedProcesses.forEach(process => {
        process.status = 'stopped';
        process.cpu = 0;
        process.selected = false;
        TaskManager._addLog('system', `Process "${process.name}" (PID: ${process.pid}) terminated by user`);
      });

      TaskManager._selectedProcesses.clear();
      TaskManager._updateProcessTable();
      TaskManager._updateStatusBar();

      if (window.Notification) {
        window.Notification.success(`${selectedProcesses.length} processes terminated`);
      }
    }
  }

  static _changePriority() {
    const selectedProcesses = Array.from(TaskManager._selectedProcesses).map(id => TaskManager._processes.get(id)).filter(Boolean);

    if (selectedProcesses.length === 0) return;

    const newPriority = prompt('Enter new priority (high, normal, low):', 'normal');

    if (['high', 'normal', 'low'].includes(newPriority)) {
      selectedProcesses.forEach(process => {
        process.priority = newPriority;
        TaskManager._addLog('system', `Process "${process.name}" priority changed to ${newPriority}`);
      });

      TaskManager._updateProcessTable();

      if (window.Notification) {
        window.Notification.success(`Priority changed for ${selectedProcesses.length} processes`);
      }
    }
  }

  static _showProcessDetails(row) {
    const processId = parseInt(row.dataset.processId);
    const process = TaskManager._processes.get(processId);

    if (!process) return;

    const modal = TaskManager._container.querySelector('#process-modal');
    const title = TaskManager._container.querySelector('#process-modal-title');
    const content = TaskManager._container.querySelector('#process-modal-content');

    title.textContent = `Process Details - ${process.name}`;

    const formatTime = (date) => {
      const now = new Date();
      const diff = now - date;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      return `${hours}h ${minutes}m ${seconds}s`;
    };

    content.innerHTML = `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div>
          <h3 style="margin: 0 0 15px 0; color: #00d4ff;">Basic Information</h3>
          <div style="display: flex; flex-direction: column; gap: 10px; font-size: 14px;">
            <div style="display: flex; justify-content: space-between;">
              <span>Process Name:</span>
              <span style="color: #00d4ff; font-weight: 500;">${process.name}</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span>Process ID:</span>
              <span style="font-family: monospace;">${process.pid}</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span>Status:</span>
              <span class="process-status ${process.status}">${process.status.toUpperCase()}</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span>Priority:</span>
              <span class="priority-badge priority-${process.priority}">${process.priority.toUpperCase()}</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span>Started:</span>
              <span>${process.startTime.toLocaleString()}</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span>Running Time:</span>
              <span>${formatTime(process.startTime)}</span>
            </div>
          </div>
        </div>
        
        <div>
          <h3 style="margin: 0 0 15px 0; color: #00d4ff;">Performance</h3>
          <div style="display: flex; flex-direction: column; gap: 10px; font-size: 14px;">
            <div style="display: flex; justify-content: space-between;">
              <span>CPU Usage:</span>
              <span style="color: ${process.cpu > 50 ? '#ff4466' : '#00ff88'}; font-weight: 500;">${process.cpu.toFixed(2)}%</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span>Memory Usage:</span>
              <span style="color: #ffaa00; font-weight: 500;">${process.memory.toFixed(2)} MB</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span>Threads:</span>
              <span>${process.threads || 1}</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span>Handles:</span>
              <span>${process.handles || 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div style="margin-top: 20px;">
        <h3 style="margin: 0 0 15px 0; color: #00d4ff;">Command Line</h3>
        <div style="background: rgba(0, 0, 0, 0.3); padding: 15px; border-radius: 8px; font-family: monospace; font-size: 12px; word-break: break-all;">
          ${process.commandLine || 'N/A'}
        </div>
      </div>
      
      <div style="display: flex; gap: 15px; justify-content: flex-end; margin-top: 25px;">
        <button onclick="TaskManager._endProcess(${process.id}); TaskManager._hideProcessModal();" style="background: rgba(255, 68, 102, 0.2); border: 1px solid rgba(255, 68, 102, 0.5); color: #ff4466; padding: 10px 20px; border-radius: 8px; cursor: pointer;">
          End Process
        </button>
        <button onclick="TaskManager._hideProcessModal();" style="background: rgba(0, 212, 255, 0.2); border: 1px solid rgba(0, 212, 255, 0.5); color: #00d4ff; padding: 10px 20px; border-radius: 8px; cursor: pointer;">
          Close
        </button>
      </div>
    `;

    modal.style.display = 'block';
  }

  static _hideProcessModal() {
    const modal = TaskManager._container.querySelector('#process-modal');
    modal.style.display = 'none';
  }

  static _showContextMenu(x, y, row) {
    const processId = parseInt(row.dataset.processId);
    const process = TaskManager._processes.get(processId);

    if (!process) return;

    const contextMenu = TaskManager._container.querySelector('#context-menu');

    contextMenu.innerHTML = `
      <div class="context-menu-item" onclick="TaskManager._showProcessDetails(document.querySelector('tr[data-process-id=\\\"${process.id}\\\"]'))">
        <i class="fas fa-info-circle"></i> Process Details
      </div>
      <div class="context-menu-separator"></div>
      <div class="context-menu-item" onclick="TaskManager._changePriorityFor(${process.id}, 'high')">
        <i class="fas fa-arrow-up"></i> Set High Priority
      </div>
      <div class="context-menu-item" onclick="TaskManager._changePriorityFor(${process.id}, 'normal')">
        <i class="fas fa-minus"></i> Set Normal Priority
      </div>
      <div class="context-menu-item" onclick="TaskManager._changePriorityFor(${process.id}, 'low')">
        <i class="fas fa-arrow-down"></i> Set Low Priority
      </div>
      <div class="context-menu-separator"></div>
      <div class="context-menu-item danger" onclick="TaskManager._endProcess(${process.id})">
        <i class="fas fa-times"></i> End Process
      </div>
    `;

    contextMenu.style.left = Math.min(x, window.innerWidth - 200) + 'px';
    contextMenu.style.top = Math.min(y, window.innerHeight - 200) + 'px';
    contextMenu.style.display = 'block';
  }

  static _hideContextMenu() {
    const contextMenu = TaskManager._container.querySelector('#context-menu');
    contextMenu.style.display = 'none';
  }

  static _changePriorityFor(processId, priority) {
    const process = TaskManager._processes.get(processId);
    if (process) {
      process.priority = priority;
      TaskManager._updateProcessTable();
      TaskManager._addLog('system', `Process "${process.name}" priority changed to ${priority}`);

      if (window.Notification) {
        window.Notification.success(`Priority changed to ${priority}`);
      }
    }
    TaskManager._hideContextMenu();
  }

  static _showSettings() {
    const modal = TaskManager._container.querySelector('#settings-modal');

    // Populate current settings
    TaskManager._container.querySelector('#auto-refresh-toggle').checked = TaskManager._settings.autoRefresh;
    TaskManager._container.querySelector('#refresh-interval').value = TaskManager._settings.refreshInterval;
    TaskManager._container.querySelector('#notifications-toggle').checked = TaskManager._settings.showNotifications;
    TaskManager._container.querySelector('#sound-alerts-toggle').checked = TaskManager._settings.soundAlerts;
    TaskManager._container.querySelector('#cpu-threshold').value = TaskManager._settings.cpuAlertThreshold;
    TaskManager._container.querySelector('#memory-threshold').value = TaskManager._settings.memoryAlertThreshold;
    TaskManager._container.querySelector('#cpu-threshold-value').textContent = TaskManager._settings.cpuAlertThreshold + '%';
    TaskManager._container.querySelector('#memory-threshold-value').textContent = TaskManager._settings.memoryAlertThreshold + '%';
    TaskManager._container.querySelector('#default-sort').value = TaskManager._settings.defaultSort || 'cpu';

    modal.style.display = 'block';
  }

  static _hideSettings() {
    const modal = TaskManager._container.querySelector('#settings-modal');
    modal.style.display = 'none';
  }

  static _applySettings() {
    // Update settings from form
    TaskManager._settings.autoRefresh = TaskManager._container.querySelector('#auto-refresh-toggle').checked;
    TaskManager._settings.refreshInterval = parseInt(TaskManager._container.querySelector('#refresh-interval').value);
    TaskManager._settings.showNotifications = TaskManager._container.querySelector('#notifications-toggle').checked;
    TaskManager._settings.soundAlerts = TaskManager._container.querySelector('#sound-alerts-toggle').checked;
    TaskManager._settings.cpuAlertThreshold = parseInt(TaskManager._container.querySelector('#cpu-threshold').value);
    TaskManager._settings.memoryAlertThreshold = parseInt(TaskManager._container.querySelector('#memory-threshold').value);
    TaskManager._settings.defaultSort = TaskManager._container.querySelector('#default-sort').value;

    // Apply settings
    TaskManager._toggleAutoRefresh(TaskManager._settings.autoRefresh);
    TaskManager._saveSettings();
    TaskManager._hideSettings();

    if (window.Notification) {
      window.Notification.success('Settings saved successfully');
    }
  }

  static _resetSettings() {
    if (confirm('Reset all settings to default values?')) {
      TaskManager._settings = {
        autoRefresh: true,
        refreshInterval: 3000,
        showNotifications: true,
        soundAlerts: false,
        cpuAlertThreshold: 80,
        memoryAlertThreshold: 85,
        defaultSort: 'cpu'
      };

      TaskManager._applySettings();
    }
  }

  static _toggleAutoRefresh(enabled) {
    TaskManager._settings.autoRefresh = enabled;

    if (enabled) {
      if (!TaskManager._updateInterval) {
        TaskManager._startAutoUpdate();
      }
      TaskManager._container.querySelector('#auto-refresh-indicator').style.animation = 'pulse 1s infinite';
      TaskManager._container.querySelector('#auto-refresh-text').textContent = 'Auto-refresh ON';
    } else {
      if (TaskManager._updateInterval) {
        clearInterval(TaskManager._updateInterval);
        TaskManager._updateInterval = null;
      }
      TaskManager._container.querySelector('#auto-refresh-indicator').style.animation = 'none';
      TaskManager._container.querySelector('#auto-refresh-text').textContent = 'Auto-refresh OFF';
    }
  }

  static _refreshData() {
    // Simulate data refresh with realistic changes
    TaskManager._processes.forEach(process => {
      if (process.status === 'running') {
        // CPU usage fluctuates
        process.cpu += (Math.random() - 0.5) * 10;
        process.cpu = Math.max(0, Math.min(100, process.cpu));

        // Memory usage slowly changes
        process.memory += (Math.random() - 0.5) * 5;
        process.memory = Math.max(10, process.memory);
      } else {
        process.cpu = 0;
      }
    });

    // Update system stats
    TaskManager._systemStats.cpu += (Math.random() - 0.5) * 10;
    TaskManager._systemStats.memory += (Math.random() - 0.5) * 5;
    TaskManager._systemStats.cpu = Math.max(0, Math.min(100, TaskManager._systemStats.cpu));
    TaskManager._systemStats.memory = Math.max(0, Math.min(100, TaskManager._systemStats.memory));

    // Add to historical data
    TaskManager._addHistoricalData();

    // Generate new log entry
    TaskManager._generateLogs();

    TaskManager._updateDisplay();

    if (window.Notification) {
      window.Notification.info('Data refreshed');
    }
  }

  static _exportData() {
    const data = {
      timestamp: new Date().toISOString(),
      systemStats: TaskManager._systemStats,
      processes: Array.from(TaskManager._processes.values()),
      historicalData: TaskManager._historicalData,
      settings: TaskManager._settings
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `system-monitor-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);

    if (window.Notification) {
      window.Notification.success('Data exported successfully');
    }
  }

  static _exportLogs() {
    if (!TaskManager._logs || TaskManager._logs.length === 0) {
      if (window.Notification) {
        window.Notification.warning('No logs to export');
      }
      return;
    }

    const logText = TaskManager._logs.map(log =>
      `${log.timestamp.toISOString()} [${log.type.toUpperCase()}] [${log.process}] ${log.message}`
    ).join('\n');

    const blob = new Blob([logText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `system-logs-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);

    if (window.Notification) {
      window.Notification.success('Logs exported successfully');
    }
  }

  static _clearLogs() {
    if (confirm('Clear all logs?')) {
      TaskManager._logs = [];
      TaskManager._updateLogsTab();

      if (window.Notification) {
        window.Notification.success('Logs cleared');
      }
    }
  }

  static _filterLogs() {
    TaskManager._updateLogsTab();
  }

  static _showStatDetails(stat) {
    let title, message;

    switch (stat) {
      case 'cpu':
        title = 'CPU Usage Details';
        message = `Current: ${TaskManager._systemStats.cpu.toFixed(1)}%\nThreshold: ${TaskManager._settings.cpuAlertThreshold}%\nCores: ${navigator.hardwareConcurrency || 'Unknown'}`;
        break;
      case 'memory':
        title = 'Memory Usage Details';
        message = `Current: ${TaskManager._systemStats.memory.toFixed(1)}%\nThreshold: ${TaskManager._settings.memoryAlertThreshold}%\nAvailable: ${navigator.deviceMemory || 'Unknown'} GB`;
        break;
      case 'storage':
        title = 'Storage Usage Details';
        message = `Current: ${TaskManager._systemStats.storage.toFixed(1)}%\nTotal Space: 100 GB\nFree Space: ${(100 - TaskManager._systemStats.storage).toFixed(1)} GB`;
        break;
      default:
        return;
    }

    alert(`${title}\n\n${message}`);
  }

  static _addLog(type, message, processName = 'System') {
    if (!TaskManager._logs) {
      TaskManager._logs = [];
    }

    const logEntry = {
      id: Date.now(),
      timestamp: new Date(),
      type: type,
      message: message,
      process: processName
    };

    TaskManager._logs.unshift(logEntry);

    // Keep only last 100 logs
    if (TaskManager._logs.length > 100) {
      TaskManager._logs = TaskManager._logs.slice(0, 100);
    }

    // Update logs tab if it's currently visible
    if (TaskManager._currentTab === 'logs') {
      TaskManager._updateLogsTab();
    }
  }

  static _startAutoUpdate() {
    if (TaskManager._updateInterval) {
      clearInterval(TaskManager._updateInterval);
    }

    TaskManager._updateInterval = setInterval(() => {
      if (!TaskManager._settings.autoRefresh) return;

      // Simulate small changes in system stats
      TaskManager._systemStats.cpu += (Math.random() - 0.5) * 3;
      TaskManager._systemStats.memory += (Math.random() - 0.5) * 2;
      TaskManager._systemStats.cpu = Math.max(0, Math.min(100, TaskManager._systemStats.cpu));
      TaskManager._systemStats.memory = Math.max(0, Math.min(100, TaskManager._systemStats.memory));

      // Update random processes
      TaskManager._processes.forEach(process => {
        if (process.status === 'running') {
          process.cpu += (Math.random() - 0.5) * 2;
          process.cpu = Math.max(0, Math.min(100, process.cpu));
        }
      });

      // Add to historical data
      TaskManager._addHistoricalData();

      // Occasionally generate logs
      if (Math.random() < 0.1) {
        TaskManager._generateLogs();
      }

      TaskManager._updateDisplay();
    }, TaskManager._settings.refreshInterval);
  }
}

window.TaskManager = TaskManager;