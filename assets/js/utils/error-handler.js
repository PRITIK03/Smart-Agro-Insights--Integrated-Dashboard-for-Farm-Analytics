/**
 * Error Handler Utility
 * Provides centralized error handling, logging, and user feedback
 */

const ErrorHandler = {
  // Log levels
  LOG_LEVELS: {
    DEBUG: 0,
    INFO: 1,
    WARN: 2,
    ERROR: 3
  },

  currentLogLevel: 1, // INFO by default

  /**
   * Initialize error handler
   */
  init() {
    // Catch unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.log('Unhandled promise rejection:', event.reason, this.LOG_LEVELS.ERROR);
      this.showUserError('An unexpected error occurred. Please refresh the page.');
    });

    // Catch global errors
    window.addEventListener('error', (event) => {
      this.log('Global error:', event.error, this.LOG_LEVELS.ERROR);
      this.showUserError('Something went wrong. Please try again.');
    });
  },

  /**
   * Log message with level
   */
  log(message, data = null, level = this.LOG_LEVELS.INFO) {
    if (level < this.currentLogLevel) return;

    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] ${this.getLevelName(level)}:`;

    if (data) {
      console.log(prefix, message, data);
    } else {
      console.log(prefix, message);
    }

    // In production, send to logging service
    if (level >= this.LOG_LEVELS.ERROR) {
      this.sendToErrorService(message, data);
    }
  },

  /**
   * Get level name from level number
   */
  getLevelName(level) {
    const names = Object.keys(this.LOG_LEVELS);
    return names.find(key => this.LOG_LEVELS[key] === level) || 'UNKNOWN';
  },

  /**
   * Show error to user
   */
  showUserError(message, duration = 5000) {
    // Create error toast if it doesn't exist
    let toast = document.getElementById('error-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'error-toast';
      toast.className = 'error-toast';
      toast.innerHTML = `
        <div class="toast-content">
          <i class="bi bi-exclamation-circle-fill"></i>
          <span class="toast-message"></span>
          <button class="toast-close">&times;</button>
        </div>
      `;
      document.body.appendChild(toast);

      // Add styles
      const styles = document.createElement('style');
      styles.textContent = `
        .error-toast {
          position: fixed;
          top: 20px;
          right: 20px;
          background: #dc3545;
          color: white;
          padding: 12px 20px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          z-index: 9999;
          transform: translateX(120%);
          transition: transform 0.3s ease;
          max-width: 400px;
        }
        .error-toast.show {
          transform: translateX(0);
        }
        .toast-content {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .toast-close {
          background: none;
          border: none;
          color: white;
          font-size: 20px;
          cursor: pointer;
          padding: 0;
          margin-left: auto;
        }
      `;
      document.head.appendChild(styles);

      toast.querySelector('.toast-close').addEventListener('click', () => {
        toast.classList.remove('show');
      });
    }

    toast.querySelector('.toast-message').textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  },

  /**
   * Send error to remote logging service
   */
  sendToErrorService(message, data) {
    // Placeholder for error reporting service
    // Could integrate with Sentry, LogRocket, etc.
    if (typeof gtag !== 'undefined') {
      gtag('event', 'exception', {
        description: `${message}: ${JSON.stringify(data)}`,
        fatal: false
      });
    }
  },

  /**
   * Wrap async function with error handling
   */
  async wrapAsync(fn, errorMessage = 'Operation failed') {
    try {
      return await fn();
    } catch (error) {
      this.log(errorMessage, error, this.LOG_LEVELS.ERROR);
      this.showUserError(errorMessage);
      throw error;
    }
  }
};

// Initialize on load
if (typeof window !== 'undefined') {
  ErrorHandler.init();
}

window.ErrorHandler = ErrorHandler;
