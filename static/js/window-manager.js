// Enhanced Window Manager with Resizable Windows
class WindowManager {
    constructor() {
        this.windows = new Map();
        this.activeWindow = null;
        this.windowZIndex = 1000;
        this.draggedWindow = null;
        this.resizeData = null;
        this.dragOffset = { x: 0, y: 0 };
        this.taskbarApps = document.getElementById('taskbar-apps');
        this.windowsContainer = document.getElementById('windows-container');

        this.setupMouseEvents();
    }

    // Open an application
    openApp(appName) {
        // Handle special cases
        if (appName === 'public-folder') {
            if (window.FileManager) {
                const windowData = window.FileManager.createWindow('public/');
                // Create unique window ID
                const uniqueId = `file-manager-public-${++this.windowCounter}`;
                this.createWindow(uniqueId, windowData);
            }
            return;
        }

        // Check if window already exists
        if (this.windows.has(appName)) {
            const window = this.windows.get(appName);
            this.focusWindow(window);
            return;
        }

            // Create unique window ID for each instance
            const uniqueId = `${appName}-${++this.windowCounter}`;

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
                this.createWindow(uniqueId, windowData);
            }
        }

    // Create a new window
    createWindow(appName, windowData) {
        const windowElement = document.createElement('div');
        windowElement.className = 'window active';
        windowElement.dataset.app = appName;

        // Create window structure
        windowElement.innerHTML = `
            <div class="window-header">
                <div class="window-title">${windowData.title}</div>
                <div class="window-controls">
                    <div class="window-control minimize" title="Minimize"></div>
                    <div class="window-control maximize" title="Maximize"></div>
                    <div class="window-control close" title="Close"></div>
                </div>
            </div>
            <div class="window-content">
                ${windowData.content}
            </div>
            ${this.createResizeHandles()}
        `;

        // Auto-size window based on content if specified
        if (windowData.autoSize) {
            this.autoSizeWindow(windowElement, windowData);
        } else {
            // Set manual size if specified
            if (windowData.width) windowElement.style.width = windowData.width;
            if (windowData.height) windowElement.style.height = windowData.height;
        }

        // Position window
        this.positionWindow(windowElement);
        windowElement.style.zIndex = ++this.windowZIndex;

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

        // Auto-focus first input or textarea
        this.autoFocusInput(windowElement);
    }

    // Create resize handles
    createResizeHandles() {
        return `
            <div class="window-resize-handle window-resize-n" data-resize="n"></div>
            <div class="window-resize-handle window-resize-s" data-resize="s"></div>
            <div class="window-resize-handle window-resize-e" data-resize="e"></div>
            <div class="window-resize-handle window-resize-w" data-resize="w"></div>
            <div class="window-resize-handle window-resize-ne" data-resize="ne"></div>
            <div class="window-resize-handle window-resize-nw" data-resize="nw"></div>
            <div class="window-resize-handle window-resize-se" data-resize="se"></div>
            <div class="window-resize-handle window-resize-sw" data-resize="sw"></div>
        `;
    }

    // Auto-size window based on content
    autoSizeWindow(windowElement, windowData) {
        // Temporarily show window to measure content
        windowElement.style.visibility = 'hidden';
        windowElement.style.display = 'block';
        windowElement.style.width = 'auto';
        windowElement.style.height = 'auto';

        const content = windowElement.querySelector('.window-content');
        const contentWidth = content.scrollWidth;
        const contentHeight = content.scrollHeight;

        // Calculate optimal window size
        const padding = 40; // 20px padding on each side
        const headerHeight = 48;
        const maxWidth = window.innerWidth - 100;
        const maxHeight = window.innerHeight - 160; // Account for taskbar

        let optimalWidth = Math.min(contentWidth + padding, maxWidth);
        let optimalHeight = Math.min(contentHeight + headerHeight + padding, maxHeight);

        // Apply minimum sizes
        optimalWidth = Math.max(optimalWidth, windowData.minWidth || 300);
        optimalHeight = Math.max(optimalHeight, windowData.minHeight || 200);

        windowElement.style.width = optimalWidth + 'px';
        windowElement.style.height = optimalHeight + 'px';
        windowElement.style.visibility = 'visible';
    }

    // Position window on screen
    positionWindow(windowElement) {
        const offset = this.windowCounter * 25; // Smaller offset for better stacking
        const maxOffset = 200;
        const actualOffset = offset % maxOffset;

        // Calculate position avoiding other windows
        let x = 100 + actualOffset;
        let y = 80 + actualOffset;

        // Ensure window stays on screen
        const maxX = window.innerWidth - 400;
        const maxY = window.innerHeight - 300;

        x = Math.min(x, maxX);
        y = Math.min(y, maxY);

        windowElement.style.left = x + 'px';
        windowElement.style.top = y + 'px';
    }

    // Auto-focus first input element
    autoFocusInput(windowElement) {
        setTimeout(() => {
            const input = windowElement.querySelector('input[type="text"], textarea');
            if (input && input.offsetParent !== null) {
                input.focus();
            }
        }, 100);
    }

    // Setup window event listeners
    setupWindowEvents(windowElement) {
        const header = windowElement.querySelector('.window-header');
        const controls = windowElement.querySelectorAll('.window-control');
        const resizeHandles = windowElement.querySelectorAll('.window-resize-handle');

        // Make window draggable
        header.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('window-control')) return;
            if (e.target.closest('.window-resize-handle')) return;

            this.startDrag(windowElement, e);
        });

        // Window controls
        controls[0].addEventListener('click', () => this.minimizeWindow(windowElement));
        controls[1].addEventListener('click', () => this.maximizeWindow(windowElement));
        controls[2].addEventListener('click', () => this.closeWindow(windowElement));

        // Resize handles
        resizeHandles.forEach(handle => {
            handle.addEventListener('mousedown', (e) => {
                e.stopPropagation();
                this.startResize(windowElement, e, handle.dataset.resize);
            });
        });

        // Focus window on click
        windowElement.addEventListener('mousedown', () => {
            this.focusWindow(windowElement);
        });

        // Prevent text selection during drag
        windowElement.addEventListener('selectstart', (e) => {
            if (this.draggedWindow || this.resizeData) {
                e.preventDefault();
            }
        });
    }

    // Start dragging window
    startDrag(windowElement, e) {
        this.draggedWindow = windowElement;
        this.dragOffset.x = e.clientX - windowElement.offsetLeft;
        this.dragOffset.y = e.clientY - windowElement.offsetTop;
        this.focusWindow(windowElement);

        document.body.style.cursor = 'move';
        e.preventDefault();
    }

    // Start resizing window
    startResize(windowElement, e, direction) {
        this.resizeData = {
            window: windowElement,
            direction: direction,
            startX: e.clientX,
            startY: e.clientY,
            startWidth: windowElement.offsetWidth,
            startHeight: windowElement.offsetHeight,
            startLeft: windowElement.offsetLeft,
            startTop: windowElement.offsetTop
        };

        this.focusWindow(windowElement);
        e.preventDefault();
    }

    // Mouse events for dragging and resizing
    setupMouseEvents() {
        document.addEventListener('mousemove', (e) => {
            if (this.draggedWindow) {
                this.handleDrag(e);
            } else if (this.resizeData) {
                this.handleResize(e);
            }
        });

        document.addEventListener('mouseup', () => {
            this.endDrag();
            this.endResize();
        });

        // Prevent context menu during drag/resize
        document.addEventListener('contextmenu', (e) => {
            if (this.draggedWindow || this.resizeData) {
                e.preventDefault();
                return false;
            }
        });
    }

    // Handle window dragging
    handleDrag(e) {
        if (!this.draggedWindow) return;

        const newX = e.clientX - this.dragOffset.x;
        const newY = e.clientY - this.dragOffset.y;

        // Keep window within screen bounds
        const maxX = window.innerWidth - this.draggedWindow.offsetWidth;
        const maxY = window.innerHeight - this.draggedWindow.offsetHeight - 60; // Account for taskbar

        const constrainedX = Math.max(0, Math.min(newX, maxX));
        const constrainedY = Math.max(0, Math.min(newY, maxY));

        this.draggedWindow.style.left = constrainedX + 'px';
        this.draggedWindow.style.top = constrainedY + 'px';
    }

    // Handle window resizing
    handleResize(e) {
        if (!this.resizeData) return;

        const { window: win, direction, startX, startY, startWidth, startHeight, startLeft, startTop } = this.resizeData;
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        let newWidth = startWidth;
        let newHeight = startHeight;
        let newLeft = startLeft;
        let newTop = startTop;

        // Handle different resize directions
        if (direction.includes('e')) {
            newWidth = Math.max(200, startWidth + deltaX);
        }
        if (direction.includes('w')) {
            newWidth = Math.max(200, startWidth - deltaX);
            newLeft = startLeft + (startWidth - newWidth);
        }
        if (direction.includes('s')) {
            newHeight = Math.max(150, startHeight + deltaY);
        }
        if (direction.includes('n')) {
            newHeight = Math.max(150, startHeight - deltaY);
            newTop = startTop + (startHeight - newHeight);
        }

        // Keep window within screen bounds
        if (newLeft < 0) {
            newWidth += newLeft;
            newLeft = 0;
        }
        if (newTop < 0) {
            newHeight += newTop;
            newTop = 0;
        }

        const maxWidth = window.innerWidth - newLeft;
        const maxHeight = window.innerHeight - newTop - 60;

        newWidth = Math.min(newWidth, maxWidth);
        newHeight = Math.min(newHeight, maxHeight);

        // Apply new dimensions
        win.style.width = newWidth + 'px';
        win.style.height = newHeight + 'px';
        win.style.left = newLeft + 'px';
        win.style.top = newTop + 'px';
    }

    // End dragging
    endDrag() {
        this.draggedWindow = null;
        document.body.style.cursor = '';
    }

    // End resizing
    endResize() {
        this.resizeData = null;
    }

    // Window operations
    focusWindow(windowElement) {
        // Remove active class from all windows (but don't minimize them)
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
        if (windowElement.dataset.maximized === 'true') {
            // Restore
            const restore = JSON.parse(windowElement.dataset.restoreData || '{}');
            windowElement.style.width = restore.width || '';
            windowElement.style.height = restore.height || '';
            windowElement.style.left = restore.left || '';
            windowElement.style.top = restore.top || '';
            windowElement.dataset.maximized = 'false';
        } else {
            // Store current position/size for restore
            const restoreData = {
                width: windowElement.style.width,
                height: windowElement.style.height,
                left: windowElement.style.left,
                top: windowElement.style.top
            };
            windowElement.dataset.restoreData = JSON.stringify(restoreData);

            // Maximize
            windowElement.style.width = '100vw';
            windowElement.style.height = 'calc(100vh - 60px)';
            windowElement.style.left = '0';
            windowElement.style.top = '0';
            windowElement.dataset.maximized = 'true';
        }
    }

    closeWindow(windowElement) {
        const appName = windowElement.dataset.app;

        // Call app cleanup if available
        const appClassName = this.getAppClassName(appName.split('-')[0]); // Get base app name
        if (window[appClassName]?.onClose) {
            const shouldClose = window[appClassName].onClose(windowElement);
            if (shouldClose === false) return;
        }

        // Remove from DOM and map
        windowElement.remove();
        this.windows.delete(appName);

        // Focus the next available window instead of minimizing
        this.focusNextWindow();
        this.updateTaskbar();
    }

    focusNextWindow() {
        const visibleWindows = Array.from(this.windows.values()).filter(w =>
            w.style.display !== 'none' && w.classList.contains('window')
        );

        if (visibleWindows.length > 0) {
            // Sort by z-index and focus the highest one
            visibleWindows.sort((a, b) =>
                parseInt(b.style.zIndex || 0) - parseInt(a.style.zIndex || 0)
            );
            this.focusWindow(visibleWindows[0]);
        } else {
            this.activeWindow = null;
        }
    }
    // Taskbar management
    // Update taskbar to show all windows properly
    updateTaskbar() {
        this.taskbarApps.innerHTML = '';

        this.windows.forEach((windowElement, appName) => {
            const button = document.createElement('button');
            button.className = 'taskbar-app';

            // Get a readable title
            const windowTitle = windowElement.querySelector('.window-title').textContent;
            button.textContent = windowTitle;

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
                    // Minimize only this window
                    this.minimizeWindow(windowElement);
                } else {
                    // Focus this window
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

    // Public method to get window by app name
    getWindow(appName) {
        return this.windows.get(appName);
    }

    // Public method to close all windows
    closeAllWindows() {
        const windowsToClose = Array.from(this.windows.keys());
        windowsToClose.forEach(appName => {
            const windowElement = this.windows.get(appName);
            this.closeWindow(windowElement);
        });
    }
}

// Initialize Window Manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.WindowManager = new WindowManager();
});