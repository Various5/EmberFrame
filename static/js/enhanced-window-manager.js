// Enhanced Desktop System with Drag & Drop, Shortcuts, and App Discovery
class EnhancedDesktopSystem {
    constructor() {
        this.startButton = document.getElementById('start-button');
        this.startMenu = document.getElementById('start-menu');
        this.desktop = document.getElementById('desktop');
        this.timeElement = document.getElementById('current-time');
        this.appSearch = document.getElementById('app-search');
        this.startMenuApps = document.getElementById('start-menu-apps');

        this.availableApps = new Map();
        this.desktopShortcuts = [];
        this.taskbarShortcuts = [];
        this.draggedIcon = null;
        this.dragOffset = { x: 0, y: 0 };
        this.isMenuOpen = false;

        this.init();
    }

    async init() {
        console.log('🚀 Initializing Enhanced Desktop System...');

        await this.discoverApps();
        await this.loadShortcuts();

        this.setupEventListeners();
        this.setupDragAndDrop();
        this.updateStartMenu();
        this.updateDesktopIcons();
        this.updateTaskbarShortcuts();
        this.updateTime();
        setInterval(() => this.updateTime(), 1000);

        console.log('✅ Enhanced Desktop System ready');
    }

    // App Discovery from Server
    async discoverApps() {
        console.log('🔍 Discovering available applications...');

        try {
            const response = await fetch('/api/apps/available');
            const data = await response.json();

            if (data.success) {
                this.availableApps.clear();
                data.apps.forEach(app => {
                    this.availableApps.set(app.id, app);
                });
                console.log(`✅ Discovered ${data.apps.length} applications`);
            } else {
                throw new Error(data.error || 'Failed to discover apps');
            }
        } catch (error) {
            console.error('❌ App discovery failed:', error);
            this.loadFallbackApps();
        }
    }

    loadFallbackApps() {
        console.log('🔄 Loading fallback apps...');

        const fallbackApps = [
            { id: 'file-manager', name: 'File Manager', icon: 'fas fa-folder', description: 'Browse files', category: 'System' },
            { id: 'public-folder', name: 'Public Files', icon: 'fas fa-globe', description: 'Shared files', category: 'System' },
            { id: 'settings', name: 'Settings', icon: 'fas fa-cog', description: 'System settings', category: 'System' },
            { id: 'task-manager', name: 'Task Manager', icon: 'fas fa-tasks', description: 'Manage processes', category: 'System' }
        ];

        this.availableApps.clear();
        fallbackApps.forEach(app => {
            this.availableApps.set(app.id, app);
        });
    }

    // Shortcuts Management
    async loadShortcuts() {
        try {
            // Load desktop shortcuts
            const desktopResponse = await fetch('/api/shortcuts/desktop');
            if (desktopResponse.ok) {
                const data = await desktopResponse.json();
                this.desktopShortcuts = data.shortcuts || [];
            }

            // Load taskbar shortcuts
            const taskbarResponse = await fetch('/api/shortcuts/taskbar');
            if (taskbarResponse.ok) {
                const data = await taskbarResponse.json();
                this.taskbarShortcuts = data.shortcuts || [];
            }

            console.log(`📌 Loaded ${this.desktopShortcuts.length} desktop and ${this.taskbarShortcuts.length} taskbar shortcuts`);
        } catch (error) {
            console.error('Failed to load shortcuts:', error);
        }
    }

    async saveDesktopShortcuts() {
        try {
            const response = await fetch('/api/shortcuts/desktop', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ shortcuts: this.desktopShortcuts })
            });

            if (response.ok) {
                console.log('💾 Desktop shortcuts saved');
            }
        } catch (error) {
            console.error('Failed to save desktop shortcuts:', error);
        }
    }

    async saveTaskbarShortcuts() {
        try {
            const response = await fetch('/api/shortcuts/taskbar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ shortcuts: this.taskbarShortcuts })
            });

            if (response.ok) {
                console.log('💾 Taskbar shortcuts saved');
            }
        } catch (error) {
            console.error('Failed to save taskbar shortcuts:', error);
        }
    }

    // Start Menu Management
    updateStartMenu() {
        if (!this.startMenuApps) return;

        // Group apps by category
        const categories = {};
        this.availableApps.forEach((app, id) => {
            const category = app.category || 'Applications';
            if (!categories[category]) {
                categories[category] = [];
            }
            categories[category].push({ id, ...app });
        });

        // Build HTML
        let html = '';
        Object.keys(categories).sort().forEach(category => {
            html += `<div class="start-menu-category">${category}</div>`;

            categories[category].forEach(app => {
                html += `
                    <div class="start-menu-app" data-app="${app.id}" draggable="true">
                        <div class="start-menu-app-icon">
                            <i class="${app.icon}"></i>
                        </div>
                        <div class="start-menu-app-details">
                            <div class="start-menu-app-name">${app.name}</div>
                            <div class="start-menu-app-desc">${app.description}</div>
                        </div>
                    </div>
                `;
            });
        });

        this.startMenuApps.innerHTML = html;

        // Add event listeners
        this.startMenuApps.querySelectorAll('.start-menu-app').forEach(app => {
            // Click to open
            app.addEventListener('click', () => {
                const appId = app.dataset.app;
                this.openApp(appId);
                this.closeStartMenu();
            });

            // Context menu for shortcuts
            app.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                this.showAppContextMenu(e.clientX, e.clientY, app.dataset.app);
            });
        });
    }

    filterApps(searchTerm) {
        const apps = this.startMenuApps.querySelectorAll('.start-menu-app');
        const categories = this.startMenuApps.querySelectorAll('.start-menu-category');

        apps.forEach(app => {
            const name = app.querySelector('.start-menu-app-name').textContent.toLowerCase();
            const desc = app.querySelector('.start-menu-app-desc').textContent.toLowerCase();

            if (name.includes(searchTerm) || desc.includes(searchTerm)) {
                app.style.display = 'flex';
            } else {
                app.style.display = 'none';
            }
        });

        // Hide empty categories
        categories.forEach(category => {
            let hasVisibleApps = false;
            let nextElement = category.nextElementSibling;

            while (nextElement && !nextElement.classList.contains('start-menu-category')) {
                if (nextElement.style.display !== 'none') {
                    hasVisibleApps = true;
                    break;
                }
                nextElement = nextElement.nextElementSibling;
            }

            category.style.display = hasVisibleApps ? 'block' : 'none';
        });
    }

    // Desktop Icons Management
    updateDesktopIcons() {
        // Clear existing icons
        this.desktop.querySelectorAll('.desktop-icon').forEach(icon => icon.remove());

        // Create icons from shortcuts
        this.desktopShortcuts.forEach(shortcut => {
            this.createDesktopIcon(shortcut);
        });
    }

    createDesktopIcon(shortcut) {
        const app = this.availableApps.get(shortcut.app);
        if (!app) return;

        const icon = document.createElement('div');
        icon.className = 'desktop-icon';
        icon.dataset.app = shortcut.app;
        icon.draggable = true;
        icon.style.left = shortcut.x + 'px';
        icon.style.top = shortcut.y + 'px';

        icon.innerHTML = `
            <div class="icon-image">
                <i class="${app.icon}"></i>
            </div>
            <div class="icon-label">${app.name}</div>
        `;

        // Add event handlers
        this.setupIconEvents(icon);
        this.desktop.appendChild(icon);
    }

    setupIconEvents(icon) {
        let clickCount = 0;

        // Click handling
        icon.addEventListener('click', (e) => {
            e.stopPropagation();
            clickCount++;

            setTimeout(() => {
                if (clickCount === 1) {
                    this.selectIcon(icon);
                } else if (clickCount === 2) {
                    this.openApp(icon.dataset.app);
                }
                clickCount = 0;
            }, 300);
        });

        // Context menu
        icon.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            this.showIconContextMenu(e.clientX, e.clientY, icon.dataset.app);
        });

        // Drag events
        icon.addEventListener('dragstart', (e) => {
            this.draggedIcon = icon;
            e.dataTransfer.setData('text/plain', icon.dataset.app);
            icon.classList.add('dragging');
        });

        icon.addEventListener('dragend', () => {
            if (this.draggedIcon) {
                this.draggedIcon.classList.remove('dragging');
                this.draggedIcon = null;
            }
        });
    }

    selectIcon(icon) {
        this.desktop.querySelectorAll('.desktop-icon').forEach(i => i.classList.remove('selected'));
        icon.classList.add('selected');
    }

    // Taskbar Shortcuts
    updateTaskbarShortcuts() {
        const container = document.getElementById('taskbar-shortcuts');
        if (!container) return;

        container.innerHTML = '';

        this.taskbarShortcuts.forEach(shortcut => {
            const app = this.availableApps.get(shortcut.app);
            if (!app) return;

            const button = document.createElement('div');
            button.className = 'taskbar-shortcut';
            button.dataset.app = shortcut.app;
            button.title = app.name;
            button.innerHTML = `<i class="${app.icon}"></i>`;

            button.addEventListener('click', () => {
                this.openApp(shortcut.app);
            });

            button.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                this.showTaskbarContextMenu(e.clientX, e.clientY, shortcut.app);
            });

            container.appendChild(button);
        });
    }

    // Context Menus
    showAppContextMenu(x, y, appId) {
        this.removeExistingMenus();

        const app = this.availableApps.get(appId);
        if (!app) return;

        const menu = this.createContextMenu(x, y, [
            {
                icon: 'fas fa-play',
                text: `Open ${app.name}`,
                action: () => this.openApp(appId)
            },
            { separator: true },
            {
                icon: 'fas fa-desktop',
                text: 'Add to Desktop',
                action: () => this.addToDesktop(appId, x - 50, y - 50)
            },
            {
                icon: 'fas fa-thumbtack',
                text: 'Pin to Taskbar',
                action: () => this.addToTaskbar(appId)
            }
        ]);

        document.body.appendChild(menu);
    }

    showIconContextMenu(x, y, appId) {
        this.removeExistingMenus();

        const app = this.availableApps.get(appId);
        if (!app) return;

        const menu = this.createContextMenu(x, y, [
            {
                icon: 'fas fa-play',
                text: `Open ${app.name}`,
                action: () => this.openApp(appId)
            },
            { separator: true },
            {
                icon: 'fas fa-trash',
                text: 'Remove from Desktop',
                action: () => this.removeFromDesktop(appId)
            }
        ]);

        document.body.appendChild(menu);
    }

    showTaskbarContextMenu(x, y, appId) {
        this.removeExistingMenus();

        const app = this.availableApps.get(appId);
        if (!app) return;

        const menu = this.createContextMenu(x, y, [
            {
                icon: 'fas fa-play',
                text: `Open ${app.name}`,
                action: () => this.openApp(appId)
            },
            { separator: true },
            {
                icon: 'fas fa-times',
                text: 'Unpin from Taskbar',
                action: () => this.removeFromTaskbar(appId)
            }
        ]);

        document.body.appendChild(menu);
    }

    createContextMenu(x, y, items) {
        const menu = document.createElement('div');
        menu.className = 'context-menu enhanced-context-menu';
        menu.style.cssText = `
            position: fixed;
            left: ${Math.min(x, window.innerWidth - 200)}px;
            top: ${Math.min(y, window.innerHeight - 200)}px;
            background: rgba(20, 20, 32, 0.95);
            border: 1px solid rgba(0, 212, 255, 0.3);
            border-radius: 8px;
            padding: 8px 0;
            min-width: 180px;
            z-index: 5000;
            backdrop-filter: blur(10px);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        `;

        items.forEach(item => {
            if (item.separator) {
                const separator = document.createElement('div');
                separator.style.cssText = `
                    height: 1px;
                    background: rgba(0, 212, 255, 0.3);
                    margin: 4px 0;
                `;
                menu.appendChild(separator);
            } else {
                const menuItem = document.createElement('div');
                menuItem.style.cssText = `
                    padding: 10px 16px;
                    color: white;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    transition: background 0.2s;
                `;
                menuItem.innerHTML = `<i class="${item.icon}"></i> ${item.text}`;

                menuItem.addEventListener('mouseenter', () => {
                    menuItem.style.background = 'rgba(0, 212, 255, 0.1)';
                });
                menuItem.addEventListener('mouseleave', () => {
                    menuItem.style.background = 'transparent';
                });

                menuItem.addEventListener('click', () => {
                    item.action();
                    this.removeExistingMenus();
                });

                menu.appendChild(menuItem);
            }
        });

        // Auto-remove menu
        setTimeout(() => {
            document.addEventListener('click', () => this.removeExistingMenus(), { once: true });
        }, 100);

        return menu;
    }

    removeExistingMenus() {
        document.querySelectorAll('.enhanced-context-menu').forEach(menu => {
            menu.remove();
        });
    }

    // Shortcut Management
    async addToDesktop(appId, x = 50, y = 50) {
        // Check if already exists
        if (this.desktopShortcuts.some(s => s.app === appId)) {
            this.showNotification('App is already on desktop', 'warning');
            return;
        }

        const shortcut = { app: appId, x, y };
        this.desktopShortcuts.push(shortcut);

        await this.saveDesktopShortcuts();
        this.createDesktopIcon(shortcut);

        const app = this.availableApps.get(appId);
        this.showNotification(`${app?.name || 'App'} added to desktop`, 'success');
    }

    async removeFromDesktop(appId) {
        this.desktopShortcuts = this.desktopShortcuts.filter(s => s.app !== appId);

        await this.saveDesktopShortcuts();

        // Remove from DOM
        const icon = this.desktop.querySelector(`.desktop-icon[data-app="${appId}"]`);
        if (icon) {
            icon.remove();
        }

        const app = this.availableApps.get(appId);
        this.showNotification(`${app?.name || 'App'} removed from desktop`, 'success');
    }

    async addToTaskbar(appId) {
        // Check if already exists
        if (this.taskbarShortcuts.some(s => s.app === appId)) {
            this.showNotification('App is already pinned to taskbar', 'warning');
            return;
        }

        const shortcut = { app: appId };
        this.taskbarShortcuts.push(shortcut);

        await this.saveTaskbarShortcuts();
        this.updateTaskbarShortcuts();

        const app = this.availableApps.get(appId);
        this.showNotification(`${app?.name || 'App'} pinned to taskbar`, 'success');
    }

    async removeFromTaskbar(appId) {
        this.taskbarShortcuts = this.taskbarShortcuts.filter(s => s.app !== appId);

        await this.saveTaskbarShortcuts();
        this.updateTaskbarShortcuts();

        const app = this.availableApps.get(appId);
        this.showNotification(`${app?.name || 'App'} unpinned from taskbar`, 'success');
    }

    // Drag and Drop Setup
    setupDragAndDrop() {
        // Desktop drop zone
        this.desktop.addEventListener('dragover', (e) => {
            e.preventDefault();
            this.desktop.classList.add('drag-over');
        });

        this.desktop.addEventListener('dragleave', (e) => {
            if (!this.desktop.contains(e.relatedTarget)) {
                this.desktop.classList.remove('drag-over');
            }
        });

        this.desktop.addEventListener('drop', (e) => {
            e.preventDefault();
            this.desktop.classList.remove('drag-over');

            const appId = e.dataTransfer.getData('text/plain');
            const rect = this.desktop.getBoundingClientRect();
            const x = e.clientX - rect.left - 40; // Center icon
            const y = e.clientY - rect.top - 40;

            if (this.draggedIcon) {
                // Moving existing icon
                this.moveDesktopIcon(appId, x, y);
            } else {
                // Adding new icon from start menu
                this.addToDesktop(appId, x, y);
            }
        });

        // Make start menu apps draggable
        document.addEventListener('dragstart', (e) => {
            if (e.target.closest('.start-menu-app')) {
                const app = e.target.closest('.start-menu-app');
                e.dataTransfer.setData('text/plain', app.dataset.app);
            }
        });
    }

    async moveDesktopIcon(appId, x, y) {
        const shortcut = this.desktopShortcuts.find(s => s.app === appId);
        if (shortcut) {
            shortcut.x = Math.max(0, x);
            shortcut.y = Math.max(0, y);

            await this.saveDesktopShortcuts();

            const icon = this.desktop.querySelector(`.desktop-icon[data-app="${appId}"]`);
            if (icon) {
                icon.style.left = shortcut.x + 'px';
                icon.style.top = shortcut.y + 'px';
            }
        }
    }

    // Event Listeners Setup
    setupEventListeners() {
        // Start menu toggle
        this.startButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleStartMenu();
        });

        // Close start menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('#start-menu') && !e.target.closest('#start-button')) {
                this.closeStartMenu();
            }
        });

        // App search
        if (this.appSearch) {
            this.appSearch.addEventListener('input', (e) => {
                this.filterApps(e.target.value.toLowerCase());
            });
        }

        // Desktop context menu
        this.desktop.addEventListener('contextmenu', (e) => {
            if (e.target === this.desktop) {
                e.preventDefault();
                this.showDesktopContextMenu(e.clientX, e.clientY);
            }
        });

        // Clear icon selection when clicking desktop
        this.desktop.addEventListener('click', (e) => {
            if (e.target === this.desktop) {
                this.desktop.querySelectorAll('.desktop-icon').forEach(icon => {
                    icon.classList.remove('selected');
                });
            }
        });
    }

    showDesktopContextMenu(x, y) {
        this.removeExistingMenus();

        const menu = this.createContextMenu(x, y, [
            { icon: 'fas fa-sync-alt', text: 'Refresh Desktop', action: () => this.refreshDesktop() },
            { separator: true },
            { icon: 'fas fa-cog', text: 'Settings', action: () => this.openApp('settings') },
            { icon: 'fas fa-terminal', text: 'Open Terminal', action: () => this.openApp('terminal') }
        ]);

        document.body.appendChild(menu);
    }

    // Start Menu Methods
    toggleStartMenu() {
        this.isMenuOpen = !this.isMenuOpen;

        if (this.isMenuOpen) {
            this.openStartMenu();
        } else {
            this.closeStartMenu();
        }
    }

    openStartMenu() {
        this.startMenu.classList.add('active');
        this.isMenuOpen = true;

        // Focus search on desktop (not mobile)
        if (this.appSearch && window.innerWidth > 768) {
            this.appSearch.focus();
        }
    }

    closeStartMenu() {
        this.startMenu.classList.remove('active');
        this.isMenuOpen = false;

        // Clear search
        if (this.appSearch) {
            this.appSearch.value = '';
            this.filterApps('');
        }
    }

    // Utility Methods
    openApp(appId) {
        if (window.WindowManager) {
            window.WindowManager.openApp(appId);
        } else {
            console.error('WindowManager not available');
        }
    }

    updateTime() {
        if (!this.timeElement) return;

        const now = new Date();
        const timeString = now.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
        this.timeElement.textContent = timeString;
    }

    refreshDesktop() {
        this.updateDesktopIcons();
        this.showNotification('Desktop refreshed', 'success');
    }

    showNotification(message, type = 'info') {
        if (window.Notification) {
            window.Notification[type](message);
        } else {
            console.log(`[${type.toUpperCase()}] ${message}`);
        }
    }
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
    // Wait for other systems to load
    setTimeout(() => {
        window.EnhancedDesktop = new EnhancedDesktopSystem();
        console.log('🎯 Enhanced Desktop System initialized');
    }, 1000);
});