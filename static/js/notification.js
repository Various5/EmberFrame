// Notification System
class Notification {
    static init() {
        if (!this.container) {
            this.container = document.getElementById('notification-container');
            this.notifications = new Map();
            this.nextId = 1;
        }
    }

    static show(message, type = 'info', duration = 4000) {
        this.init();

        const id = this.nextId++;
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.dataset.id = id;

        // Create notification content
        notification.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="flex: 1;">
                    <div style="font-weight: 500; margin-bottom: 4px;">${this.getTypeTitle(type)}</div>
                    <div style="font-size: 14px; opacity: 0.9;">${message}</div>
                </div>
                <button onclick="Notification.close(${id})" style="background: none; border: none; color: inherit; font-size: 18px; cursor: pointer; padding: 0; margin-left: 15px; opacity: 0.7;">×</button>
            </div>
        `;

        // Add to container
        this.container.appendChild(notification);
        this.notifications.set(id, notification);

        // Auto-remove after duration
        if (duration > 0) {
            setTimeout(() => {
                this.close(id);
            }, duration);
        }

        return id;
    }

    static close(id) {
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

    static closeAll() {
        this.notifications.forEach((notification, id) => {
            this.close(id);
        });
    }

    static getTypeTitle(type) {
        const titles = {
            'success': 'Success',
            'error': 'Error',
            'warning': 'Warning',
            'info': 'Information'
        };
        return titles[type] || 'Notification';
    }

    // Convenience methods
    static success(message, duration = 4000) {
        return this.show(message, 'success', duration);
    }

    static error(message, duration = 6000) {
        return this.show(message, 'error', duration);
    }

    static warning(message, duration = 5000) {
        return this.show(message, 'warning', duration);
    }

    static info(message, duration = 4000) {
        return this.show(message, 'info', duration);
    }

    // Show loading notification (doesn't auto-close)
    static loading(message) {
        const id = this.show(`<div class="loading"><div class="spinner"></div>${message}</div>`, 'info', 0);
        return id;
    }

    // Update existing notification
    static update(id, message, type) {
        if (this.notifications.has(id)) {
            const notification = this.notifications.get(id);
            if (type) {
                notification.className = `notification ${type}`;
            }

            const content = notification.querySelector('div[style*="flex: 1"]');
            if (content) {
                content.innerHTML = `
                    <div style="font-weight: 500; margin-bottom: 4px;">${this.getTypeTitle(type || 'info')}</div>
                    <div style="font-size: 14px; opacity: 0.9;">${message}</div>
                `;
            }
        }
    }
}

// Add CSS animation for slide out
const style = document.createElement('style');
style.textContent = `
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
`;
document.head.appendChild(style);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.Notification = Notification;
});