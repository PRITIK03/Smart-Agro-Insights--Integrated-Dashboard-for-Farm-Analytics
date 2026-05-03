/**
 * API Client Utility
 * Centralized API handling with caching, retries, and error handling
 */

const ApiClient = {
  // Default configuration
  config: {
    baseURL: '',
    timeout: 10000,
    retries: 3,
    retryDelay: 1000,
    cacheEnabled: true,
    cacheTTL: 5 * 60 * 1000 // 5 minutes
  },

  // In-memory cache
  cache: new Map(),

  /**
   * Initialize API client
   */
  init(options = {}) {
    this.config = { ...this.config, ...options };
    
    // Clear expired cache entries periodically
    setInterval(() => this.clearExpiredCache(), 60 * 1000);
  },

  /**
   * Make API request with retries
   */
  async request(endpoint, options = {}) {
    const url = `${this.config.baseURL}${endpoint}`;
    const cacheKey = `${url}:${JSON.stringify(options)}`;
    
    // Check cache first
    if (options.cache !== false && this.config.cacheEnabled) {
      const cached = this.getFromCache(cacheKey);
      if (cached) {
        return cached;
      }
    }

    let lastError;
    
    for (let attempt = 0; attempt < this.config.retries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

        const response = await fetch(url, {
          ...options,
          signal: controller.signal,
          headers: {
            'Content-Type': 'application/json',
            ...options.headers
          }
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        // Cache successful response
        if (options.cache !== false && this.config.cacheEnabled) {
          this.setCache(cacheKey, data, options.cacheTTL || this.config.cacheTTL);
        }

        return data;
      } catch (error) {
        lastError = error;
        
        // Don't retry on client errors (4xx)
        if (error.message && error.message.includes('HTTP 4')) {
          break;
        }

        // Wait before retry
        if (attempt < this.config.retries - 1) {
          await this.delay(this.config.retryDelay * (attempt + 1));
        }
      }
    }

    // All retries failed
    throw lastError;
  },

  /**
   * GET request
   */
  async get(endpoint, options = {}) {
    return this.request(endpoint, { method: 'GET', ...options });
  },

  /**
   * POST request
   */
  async post(endpoint, data, options = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      ...options
    });
  },

  /**
   * Cache management
   */
  setCache(key, data, ttl) {
    this.cache.set(key, {
      data,
      expiry: Date.now() + ttl
    });
  },

  getFromCache(key) {
    const cached = this.cache.get(key);
    if (!cached) return null;
    
    if (Date.now() > cached.expiry) {
      this.cache.delete(key);
      return null;
    }
    
    return cached.data;
  },

  clearExpiredCache() {
    const now = Date.now();
    for (const [key, value] of this.cache.entries()) {
      if (now > value.expiry) {
        this.cache.delete(key);
      }
    }
  },

  /**
   * Clear all cache
   */
  clearCache() {
    this.cache.clear();
  },

  /**
   * Utility delay function
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
};

// Initialize
ApiClient.init();

window.ApiClient = ApiClient;
