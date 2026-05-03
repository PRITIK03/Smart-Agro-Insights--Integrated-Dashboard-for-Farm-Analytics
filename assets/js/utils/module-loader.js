/**
 * Module Loader
 * Loads and initializes all modular components with error boundaries
 */

const ModuleLoader = {
  // Module registry
  modules: {
    utils: [
      { name: 'ErrorHandler', file: 'utils/error-handler.js', required: true },
      { name: 'ApiClient', file: 'utils/api-client.js', required: true },
      { name: 'LoadingState', file: 'utils/loading-state.js', required: false }
    ],
    services: [
      { name: 'WeatherService', file: 'services/weather-service.js', required: false },
      { name: 'CropService', file: 'services/crop-service.js', required: false },
      { name: 'AIService', file: 'services/ai-service.js', required: false }
    ]
  },

  // Loaded modules tracking
  loaded: new Map(),
  failed: [],

  /**
   * Load all modules
   */
  async loadAll() {
    console.log('🚀 Starting module loader...');
    
    const allModules = [...this.modules.utils, ...this.modules.services];
    
    for (const module of allModules) {
      try {
        await this.loadModule(module);
      } catch (error) {
        console.error(`Failed to load ${module.name}:`, error);
        this.failed.push({ name: module.name, error: error.message });
        
        if (module.required) {
          console.error(`❌ Critical module ${module.name} failed to load`);
          // Show user error for required modules
          this.showCriticalError(module.name);
        } else {
          console.warn(`⚠️ Optional module ${module.name} failed to load`);
        }
      }
    }

    this.printSummary();
    return this.failed.length === 0 || !this.failed.some(f => 
      allModules.find(m => m.name === f.name)?.required
    );
  },

  /**
   * Load a single module
   */
  async loadModule(module) {
    // Check if already loaded
    if (this.loaded.has(module.name)) {
      return this.loaded.get(module.name);
    }

    // Check if module is already available (loaded via script tag)
    if (window[module.name]) {
      this.loaded.set(module.name, window[module.name]);
      return window[module.name];
    }

    // Dynamically load script
    const script = document.createElement('script');
    script.src = `assets/js/${module.file}`;
    script.async = true;

    return new Promise((resolve, reject) => {
      script.onload = () => {
        const instance = window[module.name];
        if (instance) {
          this.loaded.set(module.name, instance);
          console.log(`✅ Loaded ${module.name}`);
          resolve(instance);
        } else {
          reject(new Error(`Module ${module.name} did not register on window`));
        }
      };

      script.onerror = () => {
        reject(new Error(`Failed to load script: ${module.file}`));
      };

      document.head.appendChild(script);
    });
  },

  /**
   * Show critical error to user
   */
  showCriticalError(moduleName) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'critical-error';
    errorDiv.innerHTML = `
      <div style="
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background: #dc3545;
        color: white;
        padding: 15px;
        text-align: center;
        z-index: 10000;
        font-family: sans-serif;
      ">
        <strong>System Error:</strong> Failed to load ${moduleName}. 
        Please refresh the page or contact support.
        <button onclick="location.reload()" style="
          margin-left: 15px;
          padding: 5px 15px;
          background: white;
          color: #dc3545;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        ">Refresh</button>
      </div>
    `;
    document.body.insertBefore(errorDiv, document.body.firstChild);
  },

  /**
   * Print loading summary
   */
  printSummary() {
    console.log('\n📦 Module Loading Summary:');
    console.log(`✅ Loaded: ${this.loaded.size} modules`);
    console.log(`❌ Failed: ${this.failed.length} modules`);
    
    if (this.failed.length > 0) {
      console.log('Failed modules:', this.failed.map(f => f.name).join(', '));
    }
    console.log('');
  },

  /**
   * Get loaded module
   */
  get(name) {
    return this.loaded.get(name) || window[name];
  },

  /**
   * Check if module is loaded
   */
  isLoaded(name) {
    return this.loaded.has(name) || !!window[name];
  },

  /**
   * Create error boundary wrapper
   */
  withErrorBoundary(fn, fallback = null) {
    return async (...args) => {
      try {
        return await fn(...args);
      } catch (error) {
        console.error('Error in wrapped function:', error);
        
        if (window.ErrorHandler) {
          window.ErrorHandler.showUserError('Something went wrong. Please try again.');
        }
        
        if (typeof fallback === 'function') {
          return fallback(error, ...args);
        }
        
        throw error;
      }
    };
  },

  /**
   * Initialize all services after loading
   */
  async initializeServices() {
    const services = ['WeatherService', 'CropService', 'AIService'];
    
    for (const serviceName of services) {
      const service = this.get(serviceName);
      if (service && typeof service.init === 'function') {
        try {
          await service.init();
        } catch (error) {
          console.warn(`Failed to initialize ${serviceName}:`, error);
        }
      }
    }
  }
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    ModuleLoader.loadAll().then(() => {
      ModuleLoader.initializeServices();
    });
  });
} else {
  ModuleLoader.loadAll().then(() => {
    ModuleLoader.initializeServices();
  });
}

window.ModuleLoader = ModuleLoader;
