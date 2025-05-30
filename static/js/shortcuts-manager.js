// Enhanced Shortcuts Manager for EmberFrame
class ShortcutsManager {
    constructor() {
        this.availableApps = [];
        this.desktopShortcuts = [];
        this.taskbarShortcuts = [];
        this.init();
    }

    async init() {
        await this.loadAvailableApps();
        await this.loadShortcuts();
        this.setupContextMenus();
        this.updateDesktopShortcuts();
        this.updateTaskbarShortcuts();
        console.log('🔗 Shortcuts Manager initialized');
    }

    // Load available applications
    async loadAvailableApps() {
        try {
            const response = await fetch('/api/apps/available');
            const data = await response.json();
            this.availableApps = data.apps || [];
        } catch (error) {
            console.error('Failed to load available apps:', error);
        }
    }

    // Load user shortcuts
    async loadShortcuts() {
        try {
            // Load desktop shortcuts
            const desktopResponse = await fetch('/api/shortcuts/desktop');
            const desktopData = await desktopResponse.json();
            this.desktopShortcuts = desktopData.shortcuts || [];

            // Load taskbar shortcuts
            const taskbarResponse = await fetch('/api/shortcuts/taskbar');
            const taskbarData = await taskbarResponse.json();
            this.taskbarShortcuts = taskbarData.shortcuts || [];
        } catch (error) {
            console.error('Failed to load shortcuts:', error);
        }
    }

    // Save shortcuts to server
    async saveShortcuts(type, shortcuts) {
        try {
            const response = await fetch(`/api/shortcuts/${type}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ shortcuts })
            });

            if (response.ok) {
                console.log(`${type} shortcuts saved successfully`);
                return true;
            }
        } catch (error) {
            console.error(`Failed to save ${type} shortcuts:`, error);
        }
        return false;
    }

    // Update desktop with user's custom shortcuts
    updateDesktopShortcuts() {
        const desktop = document.getElementById('desktop');
        if (!desktop) return;

        // Remove existing user shortcuts (keep built-in ones)
        desktop.querySelectorAll('.desktop-icon.user-shortcut').forEach(icon => {
            icon.remove();
        });

        // Add user's custom shortcuts
        this.desktopShortcuts.forEach(shortcut => {
            this.createDesktopIcon(shortcut);
        });
    }

    // Create desktop icon element
    createDesktopIcon(shortcut) {
        const desktop = document.getElementById('desktop');
        const app = this.availableApps.find(a => a.id === shortcut.app);
        if (!app) return;

        const icon = document.createElement('div');
        icon.className = 'desktop-icon user-shortcut';
        icon.dataset.app = shortcut.app;
        icon.style.position = 'absolute';
        icon.style.left = shortcut.x + 'px';
        icon.style.top = shortcut.y + 'px';

        icon.innerHTML = `
            <div class="icon-image">
                <i class="${app.icon}"></i>
            </div>
            <div class="icon-label">${app.name}</div>
        `;

        // Add click handlers
        this.setupIconHandlers(icon);

        desktop.appendChild(icon);
    }

    // Setup icon click handlers
    setupIconHandlers(icon) {
        let clickCount = 0;
        const isMobile = window.innerWidth <= 768;

        if (isMobile) {
            // Mobile touch handlers
            icon.addEventListener('touchend', (e) => {
                e.preventDefault();
                const appName = icon.dataset.app;
                if (window.WindowManager) {
                    window.WindowManager.openApp(appName);
                }
            });
        } else {
            // Desktop click handlers
            icon.addEventListener('click', (e) => {
                e.stopPropagation();
                this.selectIcon(icon);

                clickCount++;
                setTimeout(() => {
                    if (clickCount === 2) {
                        const appName = icon.dataset.app;
                        if (window.WindowManager) {
                            window.WindowManager.openApp(appName);
                        }
                    }
                    clickCount = 0;
                }, 300);
            });
        }

        // Context menu for removing shortcuts
        icon.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            this.showShortcutContextMenu(e.clientX, e.clientY, icon);
        });
    }

    // Select icon
    selectIcon(icon) {
        document.querySelectorAll('.desktop-icon').forEach(i => i.classList.remove('selected'));
        icon.classList.add('selected');
    }

    // Setup context menus for adding shortcuts
    setupContextMenus() {
        // Right-click on desktop for adding shortcuts
        const desktop = document.getElementById('desktop');
        if (desktop) {
            desktop.addEventListener('contextmenu', (e) => {
                // Only show if clicked on empty space
                if (e.target === desktop) {
                    e.preventDefault();
                    this.showAddShortcutMenu(e.clientX, e.clientY);
                }
            });
        }

        // Right-click on start menu apps to add to taskbar
        this.setupStartMenuContextMenus();
    }

    // Setup start menu context menus
    setupStartMenuContextMenus() {
        document.addEventListener('contextmenu', (e) => {
            const startMenuApp = e.target.closest('.start-menu-app');
            if (startMenuApp) {
                e.preventDefault();
                const appId = startMenuApp.dataset.app;
                this.showTaskbarAddMenu(e.clientX, e.clientY, appId);
            }
        });
    }

    // Show context menu for adding shortcuts to desktop
    showAddShortcutMenu(x, y) {
        this.removeExistingMenus();

        const menu = document.createElement('div');
        menu.className = 'shortcut-context-menu';
        menu.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            background: rgba(20, 20, 32, 0.95);
            border: 1px solid rgba(0, 212, 255, 0.3);
            border-radius: 8px;
            padding: 8px 0;
            min-width: 200px;
            z-index: 5000;
            backdrop-filter: blur(10px);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        `;

        // Header
        menu.innerHTML = `
            <div style="padding: 8px 16px; color: #00d4ff; font-weight: 600; border-bottom: 1px solid rgba(0, 212, 255, 0.2); font-size: 12px;">
                ADD TO DESKTOP
            </div>
        `;

        // Add apps that aren't already on desktop
        this.availableApps.forEach(app => {
            const isOnDesktop = this.desktopShortcuts.some(s => s.app === app.id) ||
                               document.querySelector(`.desktop-icon[data-app="${app.id}"]:not(.user-shortcut)`);

            if (!isOnDesktop) {
                const item = document.createElement('div');
                item.style.cssText = `
                    padding: 10px 16px;
                    color: white;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    transition: background 0.2s;
                `;
                item.innerHTML = `<i class="${app.icon}"></i> ${app.name}`;

                item.addEventListener('mouseenter', () => {
                    item.style.background = 'rgba(0, 212, 255, 0.1)';
                });
                item.addEventListener('mouseleave', () => {
                    item.style.background = 'transparent';
                });

                item.addEventListener('click', () => {
                    this.addDesktopShortcut(app.id, x - 50, y - 50);
                    this.removeExistingMenus();
                });

                menu.appendChild(item);
            }
        });

        document.body.appendChild(menu);

        // Remove menu when clicking elsewhere
        setTimeout(() => {
            document.addEventListener('click', () => this.removeExistingMenus(), { once: true });
        }, 100);
    }

    // Show context menu for removing shortcuts
    showShortcutContextMenu(x, y, icon) {
        this.removeExistingMenus();

        const menu = document.createElement('div');
        menu.className = 'shortcut-context-menu';
        menu.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            background: rgba(20, 20, 32, 0.95);
            border: 1px solid rgba(255, 68, 102, 0.3);
            border-radius: 8px;
            padding: 8px 0;
            min-width: 180px;
            z-index: 5000;
            backdrop-filter: blur(10px);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        `;

        const appName = this.availableApps.find(a => a.id === icon.dataset.app)?.name || 'App';

        menu.innerHTML = `
            <div style="padding: 10px 16px; color: #ff4466; cursor: pointer; display: flex; align-items: center; gap: 10px; transition: background 0.2s;">
                <i class="fas fa-trash"></i> Remove "${appName}" from Desktop
            </div>
        `;

        const removeItem = menu.querySelector('div');
        removeItem.addEventListener('mouseenter', () => {
            removeItem.style.background = 'rgba(255, 68, 102, 0.1)';
        });
        removeItem.addEventListener('mouseleave', () => {
            removeItem.style.background = 'transparent';
        });

        removeItem.addEventListener('click', () => {
            this.removeDesktopShortcut(icon.dataset.app);
            this.removeExistingMenus();
        });

        document.body.appendChild(menu);

        setTimeout(() => {
            document.addEventListener('click', () => this.removeExistingMenus(), { once: true });
        }, 100);
    }

    // Show taskbar add menu
    showTaskbarAddMenu(x, y, appId) {
        this.removeExistingMenus();

        const isOnTaskbar = this.taskbarShortcuts.some(s => s.app === appId);
        if (isOnTaskbar) return;

        const app = this.availableApps.find(a => a.id === appId);
        if (!app) return;

        const menu = document.createElement('div');
        menu.className = 'shortcut-context-menu';
        menu.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            background: rgba(20, 20, 32, 0.95);
            border: 1px solid rgba(0, 212, 255, 0.3);
            border-radius: 8px;
            padding: 8px 0;
            min-width: 180px;
            z-index: 5000;
            backdrop-filter: blur(10px);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        `;

        menu.innerHTML = `
            <div style="padding: 10px 16px; color: #00d4ff; cursor: pointer; display: flex; align-items: center; gap: 10px; transition: background 0.2s;">
                <i class="fas fa-plus"></i> Add "${app.name}" to Taskbar
            </div>
        `;

        const addItem = menu.querySelector('div');
        addItem.addEventListener('mouseenter', () => {
            addItem.style.background = 'rgba(0, 212, 255, 0.1)';
        });
        addItem.addEventListener('mouseleave', () => {
            addItem.style.background = 'transparent';
        });

        addItem.addEventListener('click', () => {
            this.addTaskbarShortcut(appId);
            this.removeExistingMenus();
        });

        document.body.appendChild(menu);

        setTimeout(() => {
            document.addEventListener('click', () => this.removeExistingMenus(), { once: true });
        }, 100);
    }

    // Add desktop shortcut
    async addDesktopShortcut(appId, x, y) {
        const shortcut = { app: appId, x, y };
        this.desktopShortcuts.push(shortcut);

        if (await this.saveShortcuts('desktop', this.desktopShortcuts)) {
            this.createDesktopIcon(shortcut);

            if (window.Notification) {
                const app = this.availableApps.find(a => a.id === appId);
                window.Notification.success(`${app?.name || 'App'} added to desktop`);
            }
        }
    }

    // Remove desktop shortcut
    async removeDesktopShortcut(appId) {
        this.desktopShortcuts = this.desktopShortcuts.filter(s => s.app !== appId);

        if (await this.saveShortcuts('desktop', this.desktopShortcuts)) {
            // Remove from DOM
            const icon = document.querySelector(`.desktop-icon.user-shortcut[data-app="${appId}"]`);
            if (icon) {
                icon.remove();
            }

            if (window.Notification) {
                const app = this.availableApps.find(a => a.id === appId);
                window.Notification.success(`${app?.name || 'App'} removed from desktop`);
            }
        }
    }

    // Add taskbar shortcut
    async addTaskbarShortcut(appId) {
        const shortcut = { app: appId };
        this.taskbarShortcuts.push(shortcut);

        if (await this.saveShortcuts('taskbar', this.taskbarShortcuts)) {
            this.updateTaskbarShortcuts();

            if (window.Notification) {
                const app = this.availableApps.find(a => a.id === appId);
                window.Notification.success(`${app?.name || 'App'} added to taskbar`);
            }
        }
    }

    // Remove taskbar shortcut
    async removeTaskbarShortcut(appId) {
        this.taskbarShortcuts = this.taskbarShortcuts.filter(s => s.app !== appId);

        if (await this.saveShortcuts('taskbar', this.taskbarShortcuts)) {
            this.updateTaskbarShortcuts();

            if (window.Notification) {
                const app = this.availableApps.find(a => a.id === appId);
                window.Notification.success(`${app?.name || 'App'} removed from taskbar`);
            }
        }
    }

    // Update taskbar with shortcuts
    updateTaskbarShortcuts() {
        const taskbar = document.getElementById('taskbar-apps');
        if (!taskbar) return;

        // Remove existing shortcut buttons
        taskbar.querySelectorAll('.taskbar-shortcut').forEach(btn => btn.remove());

        // Add taskbar shortcuts
        this.taskbarShortcuts.forEach(shortcut => {
            const app = this.availableApps.find(a => a.id === shortcut.app);
            if (!app) return;

            const button = document.createElement('button');
            button.className = 'taskbar-app taskbar-shortcut';
            button.title = app.description;
            button.innerHTML = `<i class="${app.icon}"></i> <span class="taskbar-app-name">${app.name}</span>`;

            // Add click handler
            const eventType = window.innerWidth <= 768 ? 'touchend' : 'click';
            button.addEventListener(eventType, (e) => {
                e.preventDefault();
                if (window.WindowManager) {
                    window.WindowManager.openApp(shortcut.app);
                }
            });

            // Add context menu for removal
            button.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                this.showTaskbarRemoveMenu(e.clientX, e.clientY, shortcut.app);
            });

            taskbar.appendChild(button);
        });
    }

    // Show taskbar remove menu
    showTaskbarRemoveMenu(x, y, appId) {
        this.removeExistingMenus();

        const app = this.availableApps.find(a => a.id === appId);
        if (!app) return;

        const menu = document.createElement('div');
        menu.className = 'shortcut-context-menu';
        menu.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            background: rgba(20, 20, 32, 0.95);
            border: 1px solid rgba(255, 68, 102, 0.3);
            border-radius: 8px;
            padding: 8px 0;
            min-width: 180px;
            z-index: 5000;
            backdrop-filter: blur(10px);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        `;

        menu.innerHTML = `
            <div style="padding: 10px 16px; color: #ff4466; cursor: pointer; display: flex; align-items: center; gap: 10px; transition: background 0.2s;">
                <i class="fas fa-trash"></i> Remove "${app.name}" from Taskbar
            </div>
        `;

        const removeItem = menu.querySelector('div');
        removeItem.addEventListener('mouseenter', () => {
            removeItem.style.background = 'rgba(255, 68, 102, 0.1)';
        });
        removeItem.addEventListener('mouseleave', () => {
            removeItem.style.background = 'transparent';
        });

        removeItem.addEventListener('click', () => {
            this.removeTaskbarShortcut(appId);
            this.removeExistingMenus();
        });

        document.body.appendChild(menu);

        setTimeout(() => {
            document.addEventListener('click', () => this.removeExistingMenus(), { once: true });
        }, 100);
    }

    // Remove existing context menus
    removeExistingMenus() {
        document.querySelectorAll('.shortcut-context-menu').forEach(menu => {
            menu.remove();
        });
    }

    // Public method to refresh shortcuts (useful when user preferences change)
    async refresh() {
        await this.loadShortcuts();
        this.updateDesktopShortcuts();
        this.updateTaskbarShortcuts();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for other systems to initialize
    setTimeout(() => {
        window.ShortcutsManager = new ShortcutsManager();
        console.log('🔗 Shortcuts Manager ready');
    }, 1000);
});