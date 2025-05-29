// Window Manager
class WindowManager {
    constructor() {
        this.windows = new Map();
        this.activeWindow = null;
        this.windowZIndex = 1000;
        this.draggedWindow = null;
        this.dragOffset = { x: 0, y: 0 };
        this.taskbarApps = document.getElementById('taskbar-apps');
        this.windowsContainer = document.getElementById('windows-container');

        this.setupMouseEvents();
    }

    // Open an application
    openApp(appName) {
        // Check if window already exists
        if (this.windows.has(appName)) {
            const window = this.windows.get(appName);
            this.focusWindow(window);
            return;
        }

        // Create new window based on app type
        let windowData = null;

        switch(appName) {
            case 'file-manager':
                windowData = window.FileManager ? window.FileManager.createWindow() : null;
                break;
            case 'terminal':
                windowData = window.Terminal ? window.Terminal.createWindow() : null;
                break;
            case 'text-editor':
                windowData = window.TextEditor ? window.TextEditor.createWindow() : null;
                break;
            case 'settings':
                windowData = window.Settings ? window.Settings.createWindow() : null;
                break;
        }

        if (windowData) {
            this.createWindow(appName, windowData);
        }
    }

    // Create a new window
    createWindow(appName, windowData) {
        const windowElement = document.createElement('div');
        windowElement.className = 'window active';
        windowElement.dataset.app = appName;
        windowElement.innerHTML = `
            <div class="window-header">
                <div class="window-title">${windowData.title}</div>
                <div class="window-controls">
                    <div class="window-control minimize"></div>
                    <div class="window-control maximize"></div>
                    <div class="window-control close"></div>
                </div>
            </div>
            <div class="window-content">
                ${windowData.content}
            </div>
        `;

        // Position window
        const offset = this.windows.size * 30;
        windowElement.style.left = (100 + offset) + 'px';
        windowElement.style.top = (100 + offset) + 'px';
        windowElement.style.zIndex = ++this.windowZIndex;

        // Set size if specified
        if (windowData.width) windowElement.style.width = windowData.width;
        if (windowData.height) windowElement.style.height = windowData.height;

        // Add to DOM
        this.windowsContainer.appendChild(windowElement);

        // Store window reference
        this.windows.set(appName, windowElement);
        this.activeWindow = windowElement;

        // Setup window events
        this.setupWindowEvents(windowElement);

        // Update taskbar
        this.updateTaskbar();

        // Initialize app-specific functionality
        if (windowData.onInit) {
            windowData.onInit(windowElement);
        }
    }

    // Setup window event listeners
    setupWindowEvents(windowElement) {
        const header = windowElement.querySelector('.window-header');
        const controls = windowElement.querySelectorAll('.window-control');

        // Make window draggable
        header.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('window-control')) return;

            this.draggedWindow = windowElement;
            this.dragOffset.x = e.clientX - windowElement.offsetLeft;
            this.dragOffset.y = e.clientY - windowElement.offsetTop;
            this.focusWindow(windowElement);
        });

        // Window controls
        controls[0].addEventListener('click', () => this.minimizeWindow(windowElement));
        controls[1].addEventListener('click', () => this.maximizeWindow(windowElement));
        controls[2].addEventListener('click', () => this.closeWindow(windowElement));

        // Focus window on click
        windowElement.addEventListener('mousedown', () => {
            this.focusWindow(windowElement);
        });
    }

    // Mouse events for dragging
    setupMouseEvents() {
        document.addEventListener('mousemove', (e) => {
            if (this.draggedWindow) {
                this.draggedWindow.style.left = (e.clientX - this.dragOffset.x) + 'px';
                this.draggedWindow.style.top = (e.clientY - this.dragOffset.y) + 'px';
            }
        });

        document.addEventListener('mouseup', () => {
            this.draggedWindow = null;
        });
    }

    // Window operations
    focusWindow(windowElement) {
        // Remove active class from all windows
        document.querySelectorAll('.window').forEach(w => w.classList.remove('active'));

        // Make this window active
        windowElement.classList.add('active');
        windowElement.style.zIndex = ++this.windowZIndex;
        this.activeWindow = windowElement;

        this.updateTaskbar();
    }

    minimizeWindow(windowElement) {
        windowElement.style.display = 'none';
        windowElement.classList.remove('active');
        this.updateTaskbar();
    }

    maximizeWindow(windowElement) {
        if (windowElement.style.width === '100vw') {
            // Restore
            windowElement.style.width = '';
            windowElement.style.height = '';
            windowElement.style.left = '';
            windowElement.style.top = '';
        } else {
            // Maximize
            windowElement.style.width = '100vw';
            windowElement.style.height = 'calc(100vh - 60px)';
            windowElement.style.left = '0';
            windowElement.style.top = '0';
        }
    }

    closeWindow(windowElement) {
        const appName = windowElement.dataset.app;

        // Call app cleanup if available
        if (window[this.getAppClassName(appName)]?.onClose) {
            window[this.getAppClassName(appName)].onClose(windowElement);
        }

        // Remove from DOM and map
        windowElement.remove();
        this.windows.delete(appName);

        this.updateTaskbar();
    }

    // Taskbar management
    updateTaskbar() {
        this.taskbarApps.innerHTML = '';

        this.windows.forEach((windowElement, appName) => {
            const button = document.createElement('button');
            button.className = 'taskbar-app';
            button.textContent = windowElement.querySelector('.window-title').textContent;

            if (windowElement.classList.contains('active') && windowElement.style.display !== 'none') {
                button.classList.add('active');
            }

            button.addEventListener('click', () => {
                if (windowElement.style.display === 'none') {
                    // Restore window
                    windowElement.style.display = 'block';
                    windowElement.classList.add('active');
                    this.focusWindow(windowElement);
                } else if (windowElement.classList.contains('active')) {
                    // Minimize window
                    this.minimizeWindow(windowElement);
                } else {
                    // Focus window
                    this.focusWindow(windowElement);
                }
            });

            this.taskbarApps.appendChild(button);
        });
    }

    // Helper function to get app class name
    getAppClassName(appName) {
        return appName.split('-').map(part =>
            part.charAt(0).toUpperCase() + part.slice(1)
        ).join('');
    }
}

// Initialize Window Manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.WindowManager = new WindowManager();
});