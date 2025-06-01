/**
 * Enhanced Window Manager with App Registration System
 * Apps must register using: EmberFrame.registerApp('app-id', AppClass)
 */

// Ensure EmberFrame namespace exists
window.EmberFrame = window.EmberFrame || {};

// App Registry: apps call registerApp(id, classReference) in their own script
window.EmberFrame.AppRegistry = window.EmberFrame.AppRegistry || {};
window.EmberFrame.registerApp = function(id, appClass) {
  window.EmberFrame.AppRegistry[id] = appClass;
  console.log(`✅ App registered: ${id}`);
};

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
    this.isMobile = this.detectMobile();
    this.touchStartPos = { x: 0, y: 0 };
    this.isTouch = false;

    this.setupMouseEvents();
    this.setupTouchEvents();
    this.loadUserPreferences();

    console.log('Enhanced WindowManager initialized', {
      mobile: this.isMobile,
      touchSupported: 'ontouchstart' in window,
      registeredApps: Object.keys(window.EmberFrame.AppRegistry)
    });
  }

  // Mobile Detection
  detectMobile() {
    return window.innerWidth <= 768 ||
           /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           ('ontouchstart' in window);
  }

  // Create and display a new window for the given appName
  openApp(appName) {
    console.log('Opening app:', appName);

    const timestamp = Date.now();
    const uniqueId = `${appName}-${timestamp}`;
    let windowData = null;

    // Check registry for registered apps
    const appClass = window.EmberFrame.AppRegistry[appName];
    if (appClass && typeof appClass.createWindow === 'function') {
      try {
        windowData = appClass.createWindow();
        console.log(`✅ Loaded app from registry: ${appName}`);
      } catch (error) {
        console.error(`❌ Failed to create window for ${appName}:`, error);
      }
    } else {
      console.error(`❌ App not registered: ${appName}`);
      console.log('Available apps:', Object.keys(window.EmberFrame.AppRegistry));
      if (window.Notification) {
        window.Notification.error(`App "${appName}" not registered. Available apps: ${Object.keys(window.EmberFrame.AppRegistry).join(', ')}`);
      }
      return;
    }

    if (windowData) {
      // Mobile-specific window adjustments
      if (this.isMobile) {
        windowData.width = 'calc(100vw - 20px)';
        windowData.height = 'calc(100vh - 90px)';
        windowData.autoSize = false;
      }

      this.createWindow(uniqueId, windowData, appName);
    } else {
      console.error('Failed to create window data for:', appName);
      if (window.Notification) {
        window.Notification.error(`Failed to open ${appName}`);
      }
    }
  }

  // Create the DOM structure for a window
  createWindow(windowId, windowData, appType) {
    console.log('Creating window:', windowId, windowData.title);

    const windowElement = document.createElement('div');
    windowElement.className = 'window visible';
    windowElement.dataset.app = windowId;
    windowElement.dataset.appType = appType || windowId.split('-')[0];

    // Build window HTML
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

    // Position & size
    if (this.isMobile) {
      this.setupMobileWindow(windowElement, windowData);
    } else {
      this.setupDesktopWindow(windowElement, windowData);
    }

    // Set z-index
    windowElement.style.zIndex = ++this.windowZIndex;

    // Add to DOM
    this.windowsContainer.appendChild(windowElement);

    // Store window reference
    this.windows.set(windowId, {
      element: windowElement,
      title: windowData.title,
      appType: appType || windowId.split('-')[0],
      isMinimized: false,
      isMaximized: false,
      isMobileMinimized: false,
      originalContent: windowData.content
    });

    // Set as active
    this.setActiveWindow(windowElement);

    // Setup interactions
    this.setupWindowEvents(windowElement);

    // Update taskbar
    this.updateTaskbar();

    // Call app's onInit if provided
    if (windowData.onInit) {
      try {
        windowData.onInit(windowElement);
      } catch (error) {
        console.error('Error initializing app:', error);
      }
    }

    // Auto-focus first input/textarea
    this.autoFocusInput(windowElement);

    // Show mobile hint if first window
    if (this.isMobile && this.windows.size === 1) {
      this.showMobileGestureHint();
    }

    console.log('Window created successfully:', windowId);
  }

  // Position & size for mobile
  setupMobileWindow(windowElement, windowData) {
    windowElement.style.width = 'calc(100vw - 20px)';
    windowElement.style.height = 'calc(100vh - 90px)';
    windowElement.style.left = '10px';
    windowElement.style.top = '10px';
    windowElement.style.minWidth = 'unset';
    windowElement.style.minHeight = 'unset';
    windowElement.classList.add('mobile-window');
  }

  // Position & size for desktop
  setupDesktopWindow(windowElement, windowData) {
    const savedWindowData = this.userPreferences.windows?.[windowData.appType];

    if (savedWindowData && !savedWindowData.isMaximized) {
      windowElement.style.width = savedWindowData.width || windowData.width || '600px';
      windowElement.style.height = savedWindowData.height || windowData.height || '400px';
      windowElement.style.left = savedWindowData.left || this.getSmartPosition().x + 'px';
      windowElement.style.top = savedWindowData.top || this.getSmartPosition().y + 'px';
    } else {
      if (windowData.autoSize) {
        this.autoSizeWindow(windowElement, windowData);
      } else {
        windowElement.style.width = windowData.width || '600px';
        windowElement.style.height = windowData.height || '400px';
      }
      const position = this.getSmartPosition();
      windowElement.style.left = position.x + 'px';
      windowElement.style.top = position.y + 'px';
    }

    if (savedWindowData?.isMaximized) {
      this.maximizeWindow(windowElement, false);
    }
  }

  // Mobile minimize
  mobileMinimize(windowElement) {
    const windowId = windowElement.dataset.app;
    const windowData = this.windows.get(windowId);
    if (windowData && this.isMobile) {
      windowElement.classList.add('mobile-minimized');
      windowData.isMobileMinimized = true;
      this.updateTaskbar();
      console.log('Mobile minimized:', windowId);
    }
  }

  // Mobile restore
  mobileRestore(windowElement) {
    const windowId = windowElement.dataset.app;
    const windowData = this.windows.get(windowId);
    if (windowData && this.isMobile) {
      windowElement.classList.remove('mobile-minimized');
      windowData.isMobileMinimized = false;
      this.setActiveWindow(windowElement);
      console.log('Mobile restored:', windowId);
    }
  }

  // Attach event listeners to each window (drag, resize, controls)
  setupWindowEvents(windowElement) {
    const header = windowElement.querySelector('.window-header');
    const controls = windowElement.querySelectorAll('.window-control');
    const resizeHandles = windowElement.querySelectorAll('.window-resize-handle');

    // Dragging (desktop only)
    if (!this.isMobile) {
      header.addEventListener('mousedown', (e) => {
        if (e.target.classList.contains('window-control')) return;
        if (e.target.closest('.window-resize-handle')) return;
        this.startDrag(windowElement, e);
      });
    }

    // Minimize
    controls[0].addEventListener('click', (e) => {
      e.stopPropagation();
      if (this.isMobile) {
        this.mobileMinimize(windowElement);
      } else {
        this.minimizeWindow(windowElement);
      }
    });

    // Maximize
    controls[1].addEventListener('click', (e) => {
      e.stopPropagation();
      this.maximizeWindow(windowElement);
    });

    // Close
    controls[2].addEventListener('click', (e) => {
      e.stopPropagation();
      this.closeWindow(windowElement);
    });

    // Resize handles (desktop only)
    if (!this.isMobile) {
      resizeHandles.forEach(handle => {
        handle.addEventListener('mousedown', (e) => {
          e.stopPropagation();
          this.startResize(windowElement, e, handle.dataset.resize);
        });
      });
    }

    // Bring to front on click
    windowElement.addEventListener('mousedown', () => {
      this.focusWindow(windowElement);
    });

    // Touch gestures (mobile)
    if (this.isMobile) {
      this.setupMobileWindowEvents(windowElement);
    }
  }

  // Mobile swipe-to-minimize
  setupMobileWindowEvents(windowElement) {
    const header = windowElement.querySelector('.window-header');
    header.addEventListener('touchstart', (e) => {
      this.touchStartPos = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
      this.isTouch = true;
    });
    header.addEventListener('touchmove', (e) => {
      if (!this.isTouch) return;
      e.preventDefault();
    });
    header.addEventListener('touchend', (e) => {
      if (!this.isTouch) return;
      const touchEndPos = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      };
      const deltaX = touchEndPos.x - this.touchStartPos.x;
      const deltaY = touchEndPos.y - this.touchStartPos.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      // Swipe down to minimize
      if (deltaY > 50 && Math.abs(deltaX) < 50 && distance > 50) {
        this.mobileMinimize(windowElement);
      }
      this.isTouch = false;
    });
  }

  // Touch events setup
  setupTouchEvents() {
    if (!('ontouchstart' in window)) return;
    if (this.taskbarApps) {
      this.taskbarApps.addEventListener('touchstart', (e) => {
        e.preventDefault();
      });
    }
  }

  // Update taskbar icons to reflect open windows
  updateTaskbar() {
    if (!this.taskbarApps) return;
    this.taskbarApps.innerHTML = '';
    this.windows.forEach((windowData, windowId) => {
      const button = document.createElement('button');
      button.className = 'taskbar-app';
      button.textContent = this.truncateTitle(windowData.title, this.isMobile ? 8 : 15);
      button.title = windowData.title;

      if (windowData.element.classList.contains('active') &&
          !windowData.isMinimized && !windowData.isMobileMinimized) {
        button.classList.add('active');
      }
      if (windowData.isMinimized || windowData.isMobileMinimized) {
        button.classList.add('minimized');
      }

      const eventType = this.isMobile ? 'touchend' : 'click';
      button.addEventListener(eventType, (e) => {
        e.preventDefault();
        this.handleTaskbarClick(windowData.element);
      });

      this.taskbarApps.appendChild(button);
    });
  }

  // Click on taskbar icon toggles minimize/restore/focus
  handleTaskbarClick(windowElement) {
    const windowId = windowElement.dataset.app;
    const windowData = this.windows.get(windowId);
    if (!windowData) return;

    if (this.isMobile) {
      if (windowData.isMobileMinimized) {
        this.mobileRestore(windowElement);
      } else if (windowElement.classList.contains('active')) {
        this.mobileMinimize(windowElement);
      } else {
        this.focusWindow(windowElement);
      }
    } else {
      if (windowData.isMinimized) {
        this.restoreWindow(windowElement);
      } else if (windowElement.classList.contains('active')) {
        this.minimizeWindow(windowElement);
      } else {
        this.focusWindow(windowElement);
      }
    }
  }

  // Show hint on mobile first window
  showMobileGestureHint() {
    const hint = document.createElement('div');
    hint.className = 'mobile-gesture-hint';
    hint.textContent = 'Swipe down on window header to minimize';
    document.body.appendChild(hint);
    setTimeout(() => {
      if (hint && hint.parentNode) {
        hint.parentNode.removeChild(hint);
      }
    }, 3000);
  }

  // Utility: get a cascading "smart" position for new windows
  getSmartPosition() {
    const padding = this.isMobile ? 10 : 20;
    const offset = (this.windowCounter % 8) * (this.isMobile ? 15 : 30);
    this.windowCounter++;
    let x = padding + offset;
    let y = padding + offset;
    const maxX = Math.max(padding, window.innerWidth - (this.isMobile ? 280 : 300));
    const maxY = Math.max(padding, window.innerHeight - (this.isMobile ? 200 : 200) - (this.isMobile ? 60 : 70));
    x = Math.min(x, maxX);
    y = Math.min(y, maxY);
    return { x, y };
  }

  // Generate HTML for resize handles (desktop only)
  createResizeHandles() {
    if (this.isMobile) return '';
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

  // Focus this window (bring to front or restore if minimized)
  focusWindow(windowElement) {
    if (!windowElement) return;
    const windowId = windowElement.dataset.app;
    const windowData = this.windows.get(windowId);
    if (windowData && (windowData.isMinimized || windowData.isMobileMinimized)) {
      if (this.isMobile) {
        this.mobileRestore(windowElement);
      } else {
        this.restoreWindow(windowElement);
      }
    } else {
      this.setActiveWindow(windowElement);
    }
  }

  // Bring window to front
  setActiveWindow(windowElement) {
    document.querySelectorAll('.window').forEach(w => {
      w.classList.remove('active');
    });
    windowElement.classList.add('active');
    windowElement.style.zIndex = ++this.windowZIndex;
    this.activeWindow = windowElement;
    this.updateTaskbar();
  }

  // Minimize (desktop)
  minimizeWindow(windowElement) {
    const windowId = windowElement.dataset.app;
    const windowData = this.windows.get(windowId);
    if (windowData) {
      windowElement.classList.add('minimized');
      windowElement.classList.remove('active');
      windowData.isMinimized = true;
      this.focusNextAvailableWindow();
      this.updateTaskbar();
    }
  }

  // Restore from minimize
  restoreWindow(windowElement) {
    const windowId = windowElement.dataset.app;
    const windowData = this.windows.get(windowId);
    if (windowData) {
      windowElement.classList.remove('minimized');
      windowData.isMinimized = false;
      this.setActiveWindow(windowElement);
    }
  }

  // Maximize / un-maximize
  maximizeWindow(windowElement, savePrefs = true) {
    const windowId = windowElement.dataset.app;
    const windowData = this.windows.get(windowId);
    if (!windowData) return;

    if (windowData.isMaximized) {
      // Restore pre-maximize
      if (windowData.preMaximizeState) {
        windowElement.style.width = windowData.preMaximizeState.width;
        windowElement.style.height = windowData.preMaximizeState.height;
        windowElement.style.left = windowData.preMaximizeState.left;
        windowElement.style.top = windowData.preMaximizeState.top;
      }
      windowElement.classList.remove('maximized');
      windowData.isMaximized = false;
    } else {
      // Save current size/position
      windowData.preMaximizeState = {
        width: windowElement.style.width,
        height: windowElement.style.height,
        left: windowElement.style.left,
        top: windowElement.style.top
      };
      if (this.isMobile) {
        windowElement.style.width = '100vw';
        windowElement.style.height = `calc(100vh - ${getComputedStyle(document.documentElement).getPropertyValue('--taskbar-height')})`;
      } else {
        windowElement.style.width = '100vw';
        windowElement.style.height = 'calc(100vh - 70px)';
      }
      windowElement.style.left = '0';
      windowElement.style.top = '0';
      windowElement.classList.add('maximized');
      windowData.isMaximized = true;
    }
  }

  // Close and remove the window
  closeWindow(windowElement) {
    const windowId = windowElement.dataset.app;
    const windowData = this.windows.get(windowId);
    if (!windowData) return;

    // If app has onClose hook, call it
    const appClass = window.EmberFrame.AppRegistry[windowData.appType];
    if (appClass?.onClose) {
      const shouldClose = appClass.onClose(windowElement);
      if (shouldClose === false) {
        return;
      }
    }

    windowElement.remove();
    this.windows.delete(windowId);
    this.focusNextAvailableWindow();
    this.updateTaskbar();
  }

  // Focus or restore next available window
  focusNextAvailableWindow() {
    const availableWindows = Array.from(this.windows.values())
      .filter(w => !w.isMinimized && !w.isMobileMinimized)
      .sort((a, b) => parseInt(b.element.style.zIndex || 0) - parseInt(a.element.style.zIndex || 0));

    if (availableWindows.length > 0) {
      this.setActiveWindow(availableWindows[0].element);
    } else {
      this.activeWindow = null;
    }
  }

  // Mouse/Touch event handling for dragging / resizing
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
    window.addEventListener('resize', () => {
      this.handleWindowResize();
    });
  }

  handleWindowResize() {
    const wasMobile = this.isMobile;
    this.isMobile = this.detectMobile();
    if (wasMobile !== this.isMobile) {
      console.log('Device orientation/size changed:', { wasMobile, isMobile: this.isMobile });
      this.windows.forEach((windowData) => {
        if (this.isMobile) {
          this.setupMobileWindow(windowData.element, windowData);
        } else {
          this.setupDesktopWindow(windowData.element, windowData);
        }
      });
      this.updateTaskbar();
    }
  }

  // Load user preferences from localStorage
  loadUserPreferences() {
    try {
      const stored = localStorage.getItem('emberframe-preferences');
      this.userPreferences = stored ? JSON.parse(stored) : {};
    } catch {
      this.userPreferences = {};
    }
  }

  // Shorten title strings for taskbar
  truncateTitle(title, maxLength) {
    return title.length > maxLength ? title.substring(0, maxLength) + '...' : title;
  }

  // Automatically focus first input/textarea inside a window
  autoFocusInput(windowElement) {
    setTimeout(() => {
      const input = windowElement.querySelector('input[type="text"], textarea');
      if (input && input.offsetParent !== null) {
        input.focus();
      }
    }, 100);
  }

  // Auto-size window to its content (desktop only)
  autoSizeWindow(windowElement, windowData) {
    windowElement.style.visibility = 'hidden';
    const content = windowElement.querySelector('.window-content');
    const contentWidth = content.scrollWidth;
    const contentHeight = content.scrollHeight;
    const padding = 40;
    const headerHeight = 60;
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

  // Drag handling (desktop)
  startDrag(windowElement, e) {
    if (this.isMobile) return;
    this.draggedWindow = windowElement;
    this.dragOffset.x = e.clientX - windowElement.offsetLeft;
    this.dragOffset.y = e.clientY - windowElement.offsetTop;
    this.focusWindow(windowElement);
    document.body.style.cursor = 'move';
    e.preventDefault();
  }

  handleDrag(e) {
    if (!this.draggedWindow || this.isMobile) return;
    const newX = e.clientX - this.dragOffset.x;
    const newY = e.clientY - this.dragOffset.y;
    const maxX = window.innerWidth - this.draggedWindow.offsetWidth;
    const maxY = window.innerHeight - this.draggedWindow.offsetHeight - 70;
    const constrainedX = Math.max(0, Math.min(newX, maxX));
    const constrainedY = Math.max(0, Math.min(newY, maxY));
    this.draggedWindow.style.left = constrainedX + 'px';
    this.draggedWindow.style.top = constrainedY + 'px';
  }

  endDrag() {
    if (this.draggedWindow) {
      this.draggedWindow = null;
      document.body.style.cursor = '';
    }
  }

  // Resize handling (desktop)
  startResize(windowElement, e, direction) {
    if (this.isMobile) return;
    this.resizeData = {
      window: windowElement,
      direction,
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
    if (!this.resizeData || this.isMobile) return;
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

    win.style.width = newWidth + 'px';
    win.style.height = newHeight + 'px';
    win.style.left = newLeft + 'px';
    win.style.top = newTop + 'px';
  }

  endResize() {
    this.resizeData = null;
  }
}

// Initialize Enhanced Window Manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.WindowManager = new WindowManager();
  console.log('Enhanced Window Manager ready - apps must register with EmberFrame.registerApp()');
});