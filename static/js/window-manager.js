// Enhanced Window Manager - Multi-Window Support with User Preferences
class WindowManager {
    constructor() {
        this.windows = new Map();
        this.activeWindow = null;
        this.windowZIndex = 1000;
        this.windowCounter = 0;
        this.draggedWindow = null;
        this.resizeData = null;
        this.dragOffset = { x: 0, y: 0 };
        this.taskbarApps = document.getElementById('taskbar-apps');
        this.windowsContainer = document.getElementById('windows-container');
        this.userPreferences = {};

        this.setupMouseEvents();
        this.loadUserPreferences();
        console.log('Enhanced WindowManager initialized with multi-window support');
    }

    // Load user preferences from backend
    async loadUserPreferences() {
        try {
            const response = await fetch('/api/user/preferences');
            if (response.ok) {
                this.userPreferences = await response.json();
                console.log('User preferences loaded:', this.userPreferences);

                // Apply saved wallpaper if exists
                if (this.userPreferences.wallpaper) {
                    this.applyWallpaper(this.userPreferences.wallpaper);
                }

                // Restore saved windows if preference is enabled
                if (this.userPreferences.settings?.restoreWindows) {
                    this.restoreSavedWindows();
                }
            }
        } catch (error) {
            console.error('Failed to load user preferences:', error);
            this.userPreferences = { windows: {}, settings: {} };
        }
    }

    // Save user preferences to backend
    async saveUserPreferences() {
        try {
            const response = await fetch('/api/user/preferences', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.userPreferences)
            });

            if (!response.ok) {
                throw new Error('Failed to save preferences');
            }
        } catch (error) {
            console.error('Failed to save user preferences:', error);
        }
    }

    // Apply wallpaper from preferences
    applyWallpaper(wallpaperData) {
        if (wallpaperData.type === 'gradient') {
            document.body.style.background = wallpaperData.value;
        } else if (wallpaperData.type === 'image') {
            document.body.style.background = `url('${wallpaperData.value}') center/cover no-repeat`;
        }
    }

    // Save wallpaper preference
    async saveWallpaper(wallpaperValue, wallpaperType) {
        this.userPreferences.wallpaper = {
            value: wallpaperValue,
            type: wallpaperType,
            timestamp: Date.now()
        };
        await this.saveUserPreferences();
    }

    // Open an application - allows multiple instances
    openApp(appName) {
        console.log('Opening app:', appName);

        const timestamp = Date.now();
        const uniqueId = `${appName}-${timestamp}`;
        let windowData = null;

        // Handle special cases first
        if (appName === 'public-folder') {
            if (window.FileManager) {
                windowData = window.FileManager.createWindow('public/');
                windowData.title = 'File Manager - Public';
            }
        } else {
            // Regular apps
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
        }

        if (windowData) {
            this.createWindow(uniqueId, windowData, appName);
        } else {
            console.error('Failed to create window data for:', appName);
        }
    }

    // Create a new window with multi-window support
    createWindow(windowId, windowData, appType) {
        console.log('Creating window:', windowId, windowData.title);

        const windowElement = document.createElement('div');
        windowElement.className = 'window visible'; // Changed: always visible
        windowElement.dataset.app = windowId;
        windowElement.dataset.appType = appType || windowId.split('-')[0];

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

        // Load saved window preferences or use defaults
        const savedWindowData = this.userPreferences.windows?.[appType];

        if (savedWindowData && !savedWindowData.isMaximized) {
            // Apply saved size and position
            windowElement.style.width = savedWindowData.width || windowData.width || '600px';
            windowElement.style.height = savedWindowData.height || windowData.height || '400px';
            windowElement.style.left = savedWindowData.left || this.getSmartPosition().x + 'px';
            windowElement.style.top = savedWindowData.top || this.getSmartPosition().y + 'px';
        } else {
            // Use default or specified size
            if (windowData.autoSize) {
                this.autoSizeWindow(windowElement, windowData);
            } else {
                windowElement.style.width = windowData.width || '600px';
                windowElement.style.height = windowData.height || '400px';
            }

            // Smart positioning for new windows
            const position = this.getSmartPosition();
            windowElement.style.left = position.x + 'px';
            windowElement.style.top = position.y + 'px';
        }

        // Set z-index
        windowElement.style.zIndex = ++this.windowZIndex;

        // Add to DOM - window is now visible by default
        this.windowsContainer.appendChild(windowElement);

        // Store window reference
        this.windows.set(windowId, {
            element: windowElement,
            title: windowData.title,
            appType: appType || windowId.split('-')[0],
            isMinimized: false,
            isMaximized: savedWindowData?.isMaximized || false
        });

        // Restore maximized state if needed
        if (savedWindowData?.isMaximized) {
            this.maximizeWindow(windowElement, false); // false = don't save preferences again
        }

        // Set as active window
        this.setActiveWindow(windowElement);

        // Setup window events
        this.setupWindowEvents(windowElement);

        // Update taskbar
        this.updateTaskbar();

        // Initialize app-specific functionality
        if (windowData.onInit) {
            try {
                windowData.onInit(windowElement);
            } catch (error) {
                console.error('Error initializing app:', error);
            }
        }

        // Auto-focus first input or textarea
        this.autoFocusInput(windowElement);

        console.log('Window created successfully:', windowId);
    }

    // Smart positioning system
    getSmartPosition() {
        const padding = 20;
        const offset = (this.windowCounter % 8) * 30; // Cycle through 8 positions
        this.windowCounter++;

        let x = padding + offset;
        let y = padding + offset;

        // Keep within screen bounds
        const maxX = Math.max(padding, window.innerWidth - 300);
        const maxY = Math.max(padding, window.innerHeight - 200 - 60); // Account for taskbar

        x = Math.min(x, maxX);
        y = Math.min(y, maxY);

        return { x, y };
    }

    // Set active window - now highlights instead of hiding others
    setActiveWindow(windowElement) {
        // Remove active class from all windows
        document.querySelectorAll('.window').forEach(w => {
            w.classList.remove('active');
        });

        // Set this window as active
        windowElement.classList.add('active');
        windowElement.style.zIndex = ++this.windowZIndex;
        this.activeWindow = windowElement;

        // Update taskbar to reflect active state
        this.updateTaskbar();

        console.log('Active window set to:', windowElement.dataset.app);
    }

    // Minimize window - now hides completely
    minimizeWindow(windowElement) {
        const windowId = windowElement.dataset.app;
        const windowData = this.windows.get(windowId);

        if (windowData) {
            windowElement.classList.add('minimized');
            windowElement.classList.remove('active');
            windowData.isMinimized = true;

            // Focus next available window
            this.focusNextAvailableWindow();
            this.updateTaskbar();
            this.saveWindowState(windowElement);

            console.log('Window minimized:', windowId);
        }
    }

    // Restore window from minimized state
    restoreWindow(windowElement) {
        const windowId = windowElement.dataset.app;
        const windowData = this.windows.get(windowId);

        if (windowData) {
            windowElement.classList.remove('minimized');
            windowData.isMinimized = false;
            this.setActiveWindow(windowElement);
            this.saveWindowState(windowElement);

            console.log('Window restored:', windowId);
        }
    }

    // Enhanced maximize/restore with preference saving
    maximizeWindow(windowElement, savePrefs = true) {
        const windowId = windowElement.dataset.app;
        const windowData = this.windows.get(windowId);

        if (!windowData) return;

        if (windowData.isMaximized) {
            // Restore from maximized
            if (windowData.preMaximizeState) {
                windowElement.style.width = windowData.preMaximizeState.width;
                windowElement.style.height = windowData.preMaximizeState.height;
                windowElement.style.left = windowData.preMaximizeState.left;
                windowElement.style.top = windowData.preMaximizeState.top;
            }
            windowElement.classList.remove('maximized');
            windowData.isMaximized = false;
            console.log('Window restored from maximized:', windowId);
        } else {
            // Store current state before maximizing
            windowData.preMaximizeState = {
                width: windowElement.style.width,
                height: windowElement.style.height,
                left: windowElement.style.left,
                top: windowElement.style.top
            };

            // Maximize
            windowElement.style.width = '100vw';
            windowElement.style.height = 'calc(100vh - 60px)';
            windowElement.style.left = '0';
            windowElement.style.top = '0';
            windowElement.classList.add('maximized');
            windowData.isMaximized = true;
            console.log('Window maximized:', windowId);
        }

        if (savePrefs) {
            this.saveWindowState(windowElement);
        }
    }

    // Save window state to user preferences
    saveWindowState(windowElement) {
        const windowId = windowElement.dataset.app;
        const windowData = this.windows.get(windowId);
        const appType = windowData.appType;

        if (!this.userPreferences.windows) {
            this.userPreferences.windows = {};
        }

        this.userPreferences.windows[appType] = {
            width: windowElement.style.width,
            height: windowElement.style.height,
            left: windowElement.style.left,
            top: windowElement.style.top,
            isMinimized: windowData.isMinimized,
            isMaximized: windowData.isMaximized,
            lastSaved: Date.now()
        };

        // Debounced save to prevent too many requests
        clearTimeout(this.saveTimeout);
        this.saveTimeout = setTimeout(() => {
            this.saveUserPreferences();
        }, 1000);
    }

    // Close window with state cleanup
    closeWindow(windowElement) {
        const windowId = windowElement.dataset.app;
        const windowData = this.windows.get(windowId);

        if (!windowData) return;

        console.log('Closing window:', windowId);

        // Call app cleanup if available
        const appType = windowData.appType;
        const appClassName = this.getAppClassName(appType);

        if (window[appClassName]?.onClose) {
            const shouldClose = window[appClassName].onClose(windowElement);
            if (shouldClose === false) {
                console.log('Window close prevented by app:', windowId);
                return;
            }
        }

        // Remove from DOM and tracking
        windowElement.remove();
        this.windows.delete(windowId);

        // Focus next available window
        this.focusNextAvailableWindow();
        this.updateTaskbar();

        console.log('Window closed:', windowId);
    }

    // Focus the next available window
    focusNextAvailableWindow() {
        const availableWindows = Array.from(this.windows.values())
            .filter(w => !w.isMinimized)
            .sort((a, b) => parseInt(b.element.style.zIndex || 0) - parseInt(a.element.style.zIndex || 0));

        if (availableWindows.length > 0) {
            this.setActiveWindow(availableWindows[0].element);
        } else {
            this.activeWindow = null;
        }
    }

    // Enhanced taskbar with better window management
    updateTaskbar() {
        if (!this.taskbarApps) return;

        this.taskbarApps.innerHTML = '';

        this.windows.forEach((windowData, windowId) => {
            const button = document.createElement('button');
            button.className = 'taskbar-app';
            button.textContent = this.truncateTitle(windowData.title, 15);
            button.title = windowData.title; // Full title on hover

            // Set visual state
            if (windowData.element.classList.contains('active') && !windowData.isMinimized) {
                button.classList.add('active');
            }
            if (windowData.isMinimized) {
                button.classList.add('minimized');
            }

            // Add click handler
            button.addEventListener('click', () => {
                this.handleTaskbarClick(windowData.element);
            });

            this.taskbarApps.appendChild(button);
        });

        console.log('Taskbar updated with', this.windows.size, 'windows');
    }

    // Handle taskbar button clicks
    handleTaskbarClick(windowElement) {
        const windowId = windowElement.dataset.app;
        const windowData = this.windows.get(windowId);

        if (!windowData) return;

        if (windowData.isMinimized) {
            // Restore minimized window
            this.restoreWindow(windowElement);
        } else if (windowElement.classList.contains('active')) {
            // Minimize active window
            this.minimizeWindow(windowElement);
        } else {
            // Focus inactive window
            this.focusWindow(windowElement);
        }
    }

    // Focus a window (bring to front)
    focusWindow(windowElement) {
        if (!windowElement) return;

        const windowId = windowElement.dataset.app;
        const windowData = this.windows.get(windowId);

        if (windowData && windowData.isMinimized) {
            this.restoreWindow(windowElement);
        } else {
            this.setActiveWindow(windowElement);
        }

        console.log('Window focused:', windowId);
    }

    // Restore saved windows on login
    async restoreSavedWindows() {
        if (!this.userPreferences.savedWindows) return;

        for (const windowInfo of this.userPreferences.savedWindows) {
            if (windowInfo.appType && windowInfo.autoRestore) {
                setTimeout(() => {
                    this.openApp(windowInfo.appType);
                }, 500); // Small delay to ensure desktop is ready
            }
        }
    }

    // Enhanced resize handling with state saving
    endResize() {
        if (this.resizeData) {
            const windowElement = this.resizeData.window;
            this.saveWindowState(windowElement);
            this.resizeData = null;
        }
    }

    // Enhanced drag handling with state saving
    endDrag() {
        if (this.draggedWindow) {
            this.saveWindowState(this.draggedWindow);
            this.draggedWindow = null;
            document.body.style.cursor = '';
        }
    }

    // Utility methods
    truncateTitle(title, maxLength) {
        return title.length > maxLength ? title.substring(0, maxLength) + '...' : title;
    }

    getAppClassName(appType) {
        return appType.split('-').map(part =>
            part.charAt(0).toUpperCase() + part.slice(1)
        ).join('');
    }

    autoSizeWindow(windowElement, windowData) {
        windowElement.style.visibility = 'hidden';
        windowElement.style.display = 'block';

        const content = windowElement.querySelector('.window-content');
        const contentWidth = content.scrollWidth;
        const contentHeight = content.scrollHeight;

        const padding = 40;
        const headerHeight = 48;
        const maxWidth = window.innerWidth - 100;
        const maxHeight = window.innerHeight - 160;

        let width = Math.min(contentWidth + padding, maxWidth);
        let height = Math.min(contentHeight + headerHeight + padding, maxHeight);

        width = Math.max(width, windowData.minWidth || 300);
        height = Math.max(height, windowData.minHeight || 200);

        windowElement.style.width = width + 'px';
        windowElement.style.height = height + 'px';
        windowElement.style.visibility = 'visible';
    }

    autoFocusInput(windowElement) {
        setTimeout(() => {
            const input = windowElement.querySelector('input[type="text"], textarea');
            if (input && input.offsetParent !== null) {
                input.focus();
            }
        }, 100);
    }

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

    // Setup window events (same as before but with state saving)
    setupWindowEvents(windowElement) {
        const header = windowElement.querySelector('.window-header');
        const controls = windowElement.querySelectorAll('.window-control');
        const resizeHandles = windowElement.querySelectorAll('.window-resize-handle');

        // Window dragging
        header.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('window-control')) return;
            if (e.target.closest('.window-resize-handle')) return;
            this.startDrag(windowElement, e);
        });

        // Window controls
        controls[0].addEventListener('click', (e) => {
            e.stopPropagation();
            this.minimizeWindow(windowElement);
        });
        controls[1].addEventListener('click', (e) => {
            e.stopPropagation();
            this.maximizeWindow(windowElement);
        });
        controls[2].addEventListener('click', (e) => {
            e.stopPropagation();
            this.closeWindow(windowElement);
        });

        // Resize handles
        resizeHandles.forEach(handle => {
            handle.addEventListener('mousedown', (e) => {
                e.stopPropagation();
                this.startResize(windowElement, e, handle.dataset.resize);
            });
        });

        // Focus on click
        windowElement.addEventListener('mousedown', () => {
            this.focusWindow(windowElement);
        });
    }

    // Mouse event handling (keeping existing drag/resize logic)
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
    }

    // Drag handling (same as before)
    startDrag(windowElement, e) {
        this.draggedWindow = windowElement;
        this.dragOffset.x = e.clientX - windowElement.offsetLeft;
        this.dragOffset.y = e.clientY - windowElement.offsetTop;
        this.focusWindow(windowElement);
        document.body.style.cursor = 'move';
        e.preventDefault();
    }

    handleDrag(e) {
        if (!this.draggedWindow) return;

        const newX = e.clientX - this.dragOffset.x;
        const newY = e.clientY - this.dragOffset.y;

        const maxX = window.innerWidth - this.draggedWindow.offsetWidth;
        const maxY = window.innerHeight - this.draggedWindow.offsetHeight - 60;

        const constrainedX = Math.max(0, Math.min(newX, maxX));
        const constrainedY = Math.max(0, Math.min(newY, maxY));

        this.draggedWindow.style.left = constrainedX + 'px';
        this.draggedWindow.style.top = constrainedY + 'px';
    }

    // Resize handling (same as before)
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

    handleResize(e) {
        if (!this.resizeData) return;

        const { window: win, direction, startX, startY, startWidth, startHeight, startLeft, startTop } = this.resizeData;
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        let newWidth = startWidth;
        let newHeight = startHeight;
        let newLeft = startLeft;
        let newTop = startTop;

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

        win.style.width = newWidth + 'px';
        win.style.height = newHeight + 'px';
        win.style.left = newLeft + 'px';
        win.style.top = newTop + 'px';
    }

    // Public methods
    getWindow(windowId) {
        const windowData = this.windows.get(windowId);
        return windowData ? windowData.element : null;
    }

    closeAllWindows() {
        const windowIds = Array.from(this.windows.keys());
        windowIds.forEach(id => {
            const windowData = this.windows.get(id);
            if (windowData) {
                this.closeWindow(windowData.element);
            }
        });
    }

    // Save current session for restoration
    saveCurrentSession() {
        const savedWindows = [];
        this.windows.forEach((windowData, windowId) => {
            savedWindows.push({
                appType: windowData.appType,
                title: windowData.title,
                autoRestore: true,
                timestamp: Date.now()
            });
        });

        this.userPreferences.savedWindows = savedWindows;
        this.saveUserPreferences();
    }
}

// Initialize Enhanced Window Manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.WindowManager = new WindowManager();
    console.log('Enhanced Window Manager ready with multi-window support');
});