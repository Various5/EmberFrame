// Enhanced Notification System for EmberFrame
class NotificationSystem {
    constructor() {
        this.container = null;
        this.notifications = new Map();
        this.nextId = 1;
        this.maxNotifications = 5;
        this.init();
    }

    init() {
        // Create notification container if it doesn't exist
        this.container = document.getElementById('notification-container');
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.id = 'notification-container';
            this.container.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 6000;
                display: flex;
                flex-direction: column;
                gap: 12px;
                max-width: 400px;
                pointer-events: none;
            `;
            document.body.appendChild(this.container);
        }
    }

    show(message, type = 'info', duration = 4000) {
        const id = this.nextId++;

        // Remove oldest notification if we have too many
        if (this.notifications.size >= this.maxNotifications) {
            const oldestId = Array.from(this.notifications.keys())[0];
            this.close(oldestId);
        }

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.dataset.id = id;
        notification.style.cssText = `
            background: ${this.getBackgroundColor(type)};
            color: white;
            padding: 14px 18px;
            border-radius: 10px;
            border-left: 4px solid ${this.getBorderColor(type)};
            backdrop-filter: blur(15px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
            animation: slideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            font-size: 14px;
            font-weight: 500;
            font-family: 'Rajdhani', sans-serif;
            cursor: pointer;
            pointer-events: all;
            position: relative;
            overflow: hidden;
            border-radius: 12px;
            min-height: 50px;
            display: flex;
            align-items: center;
            gap: 12px;
            transition: all 0.3s ease;
        `;

        // Create notification content
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px; flex: 1;">
                <div style="font-size: 18px;">${this.getIcon(type)}</div>
                <div style="flex: 1;">
                    <div style="font-weight: 600; margin-bottom: 2px; font-size: 13px; opacity: 0.9; text-transform: uppercase; letter-spacing: 0.5px;">
                        ${this.getTypeTitle(type)}
                    </div>
                    <div style="font-size: 14px; line-height: 1.4;">
                        ${message}
                    </div>
                </div>
                <button onclick="event.stopPropagation(); window.NotificationSystem.close(${id})" 
                        style="background: rgba(255,255,255,0.1); border: none; color: inherit; font-size: 16px; cursor: pointer; padding: 4px 8px; border-radius: 6px; transition: background 0.2s; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;">
                    ×
                </button>
            </div>
        `;

        // Add hover effects
        notification.addEventListener('mouseenter', () => {
            notification.style.transform = 'translateX(-5px) scale(1.02)';
            notification.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.4)';
        });

        notification.addEventListener('mouseleave', () => {
            notification.style.transform = 'translateX(0) scale(1)';
            notification.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
        });

        // Click to dismiss
        notification.addEventListener('click', () => {
            this.close(id);
        });

        // Add to container
        this.container.appendChild(notification);
        this.notifications.set(id, notification);

        // Auto-remove after duration
        if (duration > 0) {
            setTimeout(() => {
                this.close(id);
            }, duration);
        }

        console.log(`📢 Notification shown: ${type} - ${message}`);
        return id;
    }

    close(id) {
        if (this.notifications.has(id)) {
            const notification = this.notifications.get(id);

            // Animate out
            notification.style.animation = 'slideOutRight 0.3s ease-in forwards';

            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
                this.notifications.delete(id);
            }, 300);
        }
    }

    closeAll() {
        this.notifications.forEach((notification, id) => {
            this.close(id);
        });
    }

    getTypeTitle(type) {
        const titles = {
            'success': 'Success',
            'error': 'Error',
            'warning': 'Warning',
            'info': 'Info'
        };
        return titles[type] || 'Notification';
    }

    getIcon(type) {
        const icons = {
            'success': '✅',
            'error': '❌',
            'warning': '⚠️',
            'info': 'ℹ️'
        };
        return icons[type] || 'ℹ️';
    }

    getBorderColor(type) {
        const colors = {
            'success': '#00ff88',
            'error': '#ff4466',
            'warning': '#ffaa00',
            'info': '#00d4ff'
        };
        return colors[type] || '#00d4ff';
    }

    getBackgroundColor(type) {
        const colors = {
            'success': 'rgba(0, 255, 136, 0.15)',
            'error': 'rgba(255, 68, 102, 0.15)',
            'warning': 'rgba(255, 170, 0, 0.15)',
            'info': 'rgba(0, 212, 255, 0.15)'
        };
        return colors[type] || 'rgba(0, 212, 255, 0.15)';
    }

    // Convenience methods
    success(message, duration = 4000) {
        return this.show(message, 'success', duration);
    }

    error(message, duration = 6000) {
        return this.show(message, 'error', duration);
    }

    warning(message, duration = 5000) {
        return this.show(message, 'warning', duration);
    }

    info(message, duration = 4000) {
        return this.show(message, 'info', duration);
    }

    // Show loading notification (doesn't auto-close)
    loading(message) {
        const id = this.show(`<div style="display: flex; align-items: center; gap: 10px;"><div class="spinner" style="width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.3); border-top: 2px solid white; border-radius: 50%; animation: spin 1s linear infinite;"></div>${message}</div>`, 'info', 0);
        return id;
    }

    // Update existing notification
    update(id, message, type) {
        if (this.notifications.has(id)) {
            const notification = this.notifications.get(id);

            // Update background and border color
            notification.style.background = this.getBackgroundColor(type || 'info');
            notification.style.borderLeftColor = this.getBorderColor(type || 'info');

            // Update content
            const contentDiv = notification.querySelector('div[style*="flex: 1"]');
            if (contentDiv) {
                contentDiv.innerHTML = `
                    <div style="font-weight: 600; margin-bottom: 2px; font-size: 13px; opacity: 0.9; text-transform: uppercase; letter-spacing: 0.5px;">
                        ${this.getTypeTitle(type || 'info')}
                    </div>
                    <div style="font-size: 14px; line-height: 1.4;">
                        ${message}
                    </div>
                `;
            }

            // Update icon
            const iconDiv = notification.querySelector('div[style*="font-size: 18px"]');
            if (iconDiv) {
                iconDiv.textContent = this.getIcon(type || 'info');
            }
        }
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    /* Responsive adjustments for mobile */
    @media (max-width: 480px) {
        #notification-container {
            left: 10px !important;
            right: 10px !important;
            top: 10px !important;
            max-width: none !important;
        }

        .notification {
            font-size: 13px !important;
            padding: 12px 16px !important;
            min-height: 44px !important;
        }

        .notification div[style*="font-size: 14px"] {
            font-size: 13px !important;
        }

        .notification div[style*="font-size: 13px"] {
            font-size: 12px !important;
        }
    }
`;
document.head.appendChild(style);

// Initialize global notification system
document.addEventListener('DOMContentLoaded', () => {
    window.NotificationSystem = new NotificationSystem();

    // Create global Notification object for compatibility
    window.Notification = {
        show: (message, type, duration) => window.NotificationSystem.show(message, type, duration),
        success: (message, duration) => window.NotificationSystem.success(message, duration),
        error: (message, duration) => window.NotificationSystem.error(message, duration),
        warning: (message, duration) => window.NotificationSystem.warning(message, duration),
        info: (message, duration) => window.NotificationSystem.info(message, duration),
        loading: (message) => window.NotificationSystem.loading(message),
        close: (id) => window.NotificationSystem.close(id),
        closeAll: () => window.NotificationSystem.closeAll(),
        update: (id, message, type) => window.NotificationSystem.update(id, message, type)
    };

    console.log('✅ Enhanced Notification System initialized');
});