/**
 * EmberCore Loading Screen Manager
 */

class LoadingManager {
    constructor() {
        this.loadingScreen = null;
        this.loadingProgress = null;
        this.loadingText = null;
        this.currentStep = 0;
        this.totalSteps = 5;
        this.messages = [
            'Igniting Core Systems...',
            'Connecting to Ember Network...',
            'Loading Desktop Environment...',
            'Configuring User Space...',
            'Welcome to the Core...'
        ];
    }

    init() {
        this.loadingScreen = document.getElementById('loading-screen');
        this.loadingProgress = document.querySelector('.loading-progress');
        this.loadingText = document.querySelector('.loading-text');

        if (this.loadingScreen) {
            this.startLoading();
        }
    }

    startLoading() {
        this.simulateLoading();
    }

    simulateLoading() {
        const interval = setInterval(() => {
            if (this.currentStep < this.totalSteps) {
                this.updateProgress();
                this.currentStep++;
            } else {
                clearInterval(interval);
                this.completeLoading();
            }
        }, 800);
    }

    updateProgress() {
        const progress = (this.currentStep / this.totalSteps) * 100;

        if (this.loadingProgress) {
            this.loadingProgress.style.width = `${progress}%`;
        }

        if (this.loadingText && this.currentStep < this.messages.length) {
            this.loadingText.textContent = this.messages[this.currentStep];
        }
    }

    completeLoading() {
        setTimeout(() => {
            if (this.loadingScreen) {
                this.loadingScreen.classList.add('fade-out');

                setTimeout(() => {
                    this.loadingScreen.style.display = 'none';
                    this.onLoadingComplete();
                }, 500);
            }
        }, 500);
    }

    onLoadingComplete() {
        // Initialize main application
        if (typeof EmberCore !== 'undefined' && EmberCore.desktop) {
            EmberCore.desktop.init();
        }

        // Emit loading complete event
        document.dispatchEvent(new CustomEvent('loadingComplete'));
    }

    show(message = 'Loading...') {
        if (this.loadingScreen) {
            this.loadingText.textContent = message;
            this.loadingScreen.style.display = 'flex';
            this.loadingScreen.classList.remove('fade-out');
        }
    }

    hide() {
        if (this.loadingScreen) {
            this.loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                this.loadingScreen.style.display = 'none';
            }, 500);
        }
    }
}

// Initialize global EmberCore object
window.EmberCore = window.EmberCore || {};
window.EmberCore.loading = new LoadingManager();