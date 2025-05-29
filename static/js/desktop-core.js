// Desktop Core Functionality
class DesktopCore {
    constructor() {
        this.startButton = document.getElementById('start-button');
        this.startMenu = document.getElementById('start-menu');
        this.contextMenu = document.getElementById('context-menu');
        this.desktop = document.getElementById('desktop');
        this.timeElement = document.getElementById('time');
        this.appSearch = document.getElementById('app-search');

        this.init();
    }

    init() {
        this.setupTime();
        this.setupStartMenu();
        this.setupDesktopIcons();
        this.setupContextMenu();
        this.setupAppSearch();
    }

    // Time Display
    setupTime() {
        this.updateTime();
        setInterval(() => this.updateTime(), 1000);
    }

    updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
        this.timeElement.textContent = timeString;
    }

    // Start Menu
    setupStartMenu() {
        this.startButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleStartMenu();
        });

        // Close start menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.startMenu.contains(e.target) && !this.startButton.contains(e.target)) {
                this.closeStartMenu();
            }
        });

        // Start menu app clicks
        const startMenuApps = this.startMenu.querySelectorAll('.start-menu-app');
        startMenuApps.forEach(app => {
            app.addEventListener('click', () => {
                const appName = app.dataset.app;
                if (window.WindowManager) {
                    window.WindowManager.openApp(appName);
                }
                this.closeStartMenu();
            });
        });
    }
    openApp(appName) {
        console.log('Opening new instance of:', appName);

        // Always open new instance - don't check for existing windows
        if (window.WindowManager) {
            window.WindowManager.openApp(appName);
        }
    }
    toggleStartMenu() {
        this.startMenu.classList.toggle('active');
    }

    closeStartMenu() {
        this.startMenu.classList.remove('active');
    }

    // Desktop Icons
    setupDesktopIcons() {
        const desktopIcons = document.querySelectorAll('.desktop-icon');

        desktopIcons.forEach(icon => {
            let clickCount = 0;

            icon.addEventListener('click', (e) => {
                e.stopPropagation();
                clickCount++;

                setTimeout(() => {
                    if (clickCount === 1) {
                        // Single click - select icon
                        this.selectIcon(icon);
                    } else if (clickCount === 2) {
                        // Double click - open app
                        const appName = icon.dataset.app;
                        if (window.WindowManager) {
                            window.WindowManager.openApp(appName);
                        }
                    }
                    clickCount = 0;
                }, 300);
            });
        });

        // Clear selection when clicking desktop
        this.desktop.addEventListener('click', () => {
            this.clearIconSelection();
        });
    }

    selectIcon(icon) {
        // Clear other selections
        document.querySelectorAll('.desktop-icon').forEach(i =>
            i.classList.remove('selected')
        );
        // Select clicked icon
        icon.classList.add('selected');
    }

    clearIconSelection() {
        document.querySelectorAll('.desktop-icon').forEach(icon =>
            icon.classList.remove('selected')
        );
    }

    // Context Menu
    setupContextMenu() {
        this.desktop.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            this.showContextMenu(e.clientX, e.clientY);
        });

        document.addEventListener('click', () => {
            this.hideContextMenu();
        });
    }

    showContextMenu(x, y) {
        this.contextMenu.style.left = x + 'px';
        this.contextMenu.style.top = y + 'px';
        this.contextMenu.style.display = 'block';
    }

    hideContextMenu() {
        this.contextMenu.style.display = 'none';
    }

    // App Search
    setupAppSearch() {
        this.appSearch.addEventListener('input', (e) => {
            this.filterApps(e.target.value.toLowerCase());
        });
    }

    filterApps(searchTerm) {
        const apps = this.startMenu.querySelectorAll('.start-menu-app');

        apps.forEach(app => {
            const appName = app.textContent.toLowerCase();
            if (appName.includes(searchTerm)) {
                app.style.display = 'flex';
            } else {
                app.style.display = 'none';
            }
        });
    }
}

// Context Menu Functions
function createNewFile() {
    if (window.TextEditor) {
        window.WindowManager.openApp('text-editor');
    }
}

function showProperties() {
    if (window.Settings) {
        window.WindowManager.openApp('settings');
    }
}

// Initialize Desktop when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.Desktop = new DesktopCore();
});