/**
 * Utils Index
 * Central export for all utility modules
 */

// Ensure all utils are available
(function() {
  'use strict';

  // Wait for all scripts to load
  const checkInterval = setInterval(() => {
    if (window.ErrorHandler && window.ApiClient && window.LoadingState && window.ModuleLoader) {
      clearInterval(checkInterval);
      console.log('✅ All utility modules loaded');
      
      // Dispatch event when all utils are ready
      window.dispatchEvent(new CustomEvent('utilsReady', {
        detail: {
          ErrorHandler: window.ErrorHandler,
          ApiClient: window.ApiClient,
          LoadingState: window.LoadingState,
          ModuleLoader: window.ModuleLoader
        }
      }));
    }
  }, 100);

  // Timeout after 10 seconds
  setTimeout(() => {
    clearInterval(checkInterval);
    if (!window.ErrorHandler || !window.ApiClient) {
      console.error('❌ Some utility modules failed to load within timeout');
    }
  }, 10000);
})();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ErrorHandler: window.ErrorHandler,
    ApiClient: window.ApiClient,
    LoadingState: window.LoadingState,
    ModuleLoader: window.ModuleLoader
  };
}
