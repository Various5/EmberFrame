/**
 * EmberCore Main Utilities
 */

// Global EmberCore namespace
window.EmberCore = window.EmberCore || {
    config: {
        apiUrl: '/api',
        socketUrl: window.location.origin,
        themes: [
            'ember_red',
            'ember_orange',
            'cyber_blue',
            'matrix_green',
            'neon_purple',
            'ice_blue'
        ]
    },
    utils: {},
    components: {},
    apps: {},
    socket: null
};

// Utility functions
EmberCore.utils = {
    
    // Generate unique ID
    generateId: function() {
        return 'ec_' + Math.random().toString(36).substr(2, 9);
    },
    
    // Format file size
    formatFileSize: function(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },
    
    // Format date
    formatDate: function(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    },
    
    // Debounce function
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Make API request
    apiRequest: async function(endpoint, options = {}) {
        const url = EmberCore.config.apiUrl + endpoint;
        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': this.getCsrfToken()
            },
            credentials: 'same-origin'
        };
        
        const config = { ...defaultOptions, ...options };
        
        try {
            const response = await fetch(url, config);
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || 'Request failed');
            }
            
            return data;
        } catch (error) {
            console.error('API Request failed:', error);
            throw error;
        }
    },
    
    // Get CSRF token
    getCsrfToken: function() {
        const token = document.querySelector('meta[name=csrf-token]');
        return token ? token.getAttribute('content') : '';
    },
    
    // Show notification
    showNotification: function(message, type = 'info', duration = 5000) {
        const container = document.getElementById('flash-messages') || this.createNotificationContainer();
        
        const notification = document.createElement('div');
        notification.className = `flash-message flash-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${this.getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="close-btn" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        container.appendChild(notification);
        
        // Auto-remove after duration
        if (duration > 0) {
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, duration);
        }
        
        return notification;
    },
    
    // Create notification container
    createNotificationContainer: function() {
        const container = document.createElement('div');
        container.id = 'flash-messages';
        container.className = 'flash-messages';
        document.body.appendChild(container);
        return container;
    },
    
    // Get notification icon
    getNotificationIcon: function(type) {
        const icons = {
            success: 'check-circle',
            error: 'times-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    },
    
    // Validate email
    validateEmail: function(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },
    
    // Sanitize HTML
    sanitizeHTML: function(str) {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    },
    
    // Copy to clipboard
    copyToClipboard: async function(text) {
        try {
            await navigator.clipboard.writeText(text);
            this.showNotification('Copied to clipboard!', 'success', 2000);
            return true;
        } catch (err) {
            console.error('Failed to copy text: ', err);
            this.showNotification('Failed to copy to clipboard', 'error', 3000);
            return false;
        }
    }
};

// Initialize Socket.IO connection
EmberCore.initSocket = function() {
    if (typeof io !== 'undefined') {
        this.socket = io(this.config.socketUrl);
        
        this.socket.on('connect', () => {
            console.log('Connected to EmberCore server');
        });
        
        this.socket.on('disconnect', () => {
            console.log('Disconnected from EmberCore server');
            this.utils.showNotification('Connection lost. Attempting to reconnect...', 'warning');
        });
        
        this.socket.on('notification', (data) => {
            this.utils.showNotification(data.message, data.type || 'info');
        });
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    EmberCore.initSocket();
});

// Global error handler
window.addEventListener('error', function(event) {
    console.error('Global error:', event.error);
    EmberCore.utils.showNotification('An unexpected error occurred', 'error');
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled promise rejection:', event.reason);
    EmberCore.utils.showNotification('An unexpected error occurred', 'error');
});