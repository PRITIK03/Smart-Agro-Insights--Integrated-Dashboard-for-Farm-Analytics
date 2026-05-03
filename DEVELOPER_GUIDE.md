# Developer Guide - Smart Agro Insights

Complete guide for developers contributing to or extending the Smart Agro Insights project.

## Table of Contents

1. [Project Setup](#project-setup)
2. [Development Environment](#development-environment)
3. [Architecture Overview](#architecture-overview)
4. [Adding New Features](#adding-new-features)
5. [Testing](#testing)
6. [Deployment](#deployment)
7. [Best Practices](#best-practices)
8. [Troubleshooting](#troubleshooting)

---

## Project Setup

### Prerequisites

- Node.js 18+ (for local server)
- Git
- Modern browser (Chrome/Firefox/Edge/Safari)
- Text editor (VS Code recommended)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/PRITIK03/Smart-Agro-Insights--Integrated-Dashboard-for-Farm-Analytics.git
cd Smart-Agro-Insights--Integrated-Dashboard-for-Farm-Analytics
```

2. **Start local server**
```bash
# Using Node.js http-server
npx http-server -p 8080

# Or using Python
python -m http.server 8080

# Or using PHP
php -S localhost:8080
```

3. **Open in browser**
```
http://localhost:8080
```

### Project Structure

```
Smart-Agro-Insights/
├── index.html              # Main landing page
├── dashboard.html          # Analytics dashboard
├── analytics.html          # Detailed analytics
├── about.html             # About page
├── help.html              # Help page
│
├── assets/
│   ├── css/
│   │   └── styles.css     # Custom styles
│   │
│   ├── js/
│   │   ├── app.js         # Main application
│   │   ├── dashboard.js   # Dashboard logic
│   │   ├── data.js        # Static data
│   │   ├── i18n.js        # Internationalization
│   │   ├── analytics.js   # Analytics functions
│   │   ├── features.js    # Feature detection
│   │   │
│   │   ├── utils/         # Utility modules
│   │   │   ├── error-handler.js
│   │   │   ├── api-client.js
│   │   │   ├── loading-state.js
│   │   │   ├── module-loader.js
│   │   │   └── index.js
│   │   │
│   │   └── services/      # Service modules
│   │       ├── weather-service.js
│   │       ├── crop-service.js
│   │       ├── ai-service.js
│   │       └── government-service.js
│   │
│   └── images/            # Image assets
│
├── server/                # Backend (optional)
│   └── index.js          # Node.js API server
│
├── tests/                 # Test suite
│   ├── test-runner.html
│   ├── utils/
│   │   └── api-client.test.js
│   └── services/
│       └── ai-service.test.js
│
├── manifest.json         # PWA manifest
├── sw.js                 # Service Worker
├── .gitignore           # Git ignore rules
│
├── API_DOCUMENTATION.md
├── CHANGELOG.md
├── DEVELOPER_GUIDE.md   # This file
├── FEATURE_ROADMAP.md
├── ENHANCEMENT_SUMMARY.md
├── JUDGES_PRESENTATION.md
└── README.md
```

---

## Development Environment

### VS Code Extensions (Recommended)

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "ritwickdey.LiveServer",
    "formulahendry.auto-rename-tag",
    "pranaygp.vscode-css-peek",
    "xabikos.JavaScriptSnippets"
  ]
}
```

### VS Code Settings

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  },
  "files.associations": {
    "*.html": "html"
  }
}
```

### ESLint Configuration

```javascript
// .eslintrc.js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    serviceworker: true
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'no-unused-vars': 'warn',
    'no-console': 'off',
    'prefer-const': 'error'
  },
  globals: {
    'Chart': 'readonly',
    'tf': 'readonly',
    'AOS': 'readonly',
    'L': 'readonly',
    'bootstrap': 'readonly'
  }
};
```

---

## Architecture Overview

### Module Pattern

All services follow the Module pattern:

```javascript
const MyService = {
  // Configuration
  config: { ... },
  
  // State
  cache: new Map(),
  
  // Initialization
  init() {
    console.log('Service initialized');
  },
  
  // Public methods
  async getData(param) {
    // Implementation
  },
  
  // Private methods (prefixed with _)
  _helper() {
    // Internal use only
  }
};

// Auto-initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => MyService.init());
} else {
  MyService.init();
}

// Expose globally
window.MyService = MyService;
```

### Service Dependencies

```
Utils (Base Layer)
├── ErrorHandler
├── ApiClient
├── LoadingState
└── ModuleLoader

Services (Business Logic)
├── WeatherService (uses ApiClient, ErrorHandler)
├── CropService (uses WeatherService, ErrorHandler)
├── AIService (uses WeatherService, CropService, tf.js)
└── GovernmentService (uses ApiClient, caching)

UI Layer
├── dashboard.js (uses all services)
├── app.js (uses core services)
└── analytics.js (uses data services)
```

### Data Flow

```
User Action
    ↓
UI Event Handler
    ↓
Service Method
    ↓
[Cache Check] → Return cached data
    ↓
API Request (with retry logic)
    ↓
[Transform Response]
    ↓
[Update Cache]
    ↓
[Error Handler]
    ↓
Return Data
    ↓
Update UI
```

---

## Adding New Features

### 1. Adding a New Service

**Step 1**: Create file `assets/js/services/my-service.js`

```javascript
/**
 * My Service
 * Description of what this service does
 */

const MyService = {
  // Configuration
  config: {
    apiEndpoint: '/api/my-endpoint',
    cacheDuration: 300000 // 5 minutes
  },

  // State
  cache: new Map(),

  /**
   * Initialize service
   */
  init() {
    console.log('🚀 My Service initialized');
  },

  /**
   * Main method with JSDoc
   * @param {string} param - Description
   * @returns {Promise<Object>} Description
   */
  async fetchData(param) {
    try {
      // Check cache
      const cached = this.cache.get(param);
      if (cached && Date.now() - cached.timestamp < this.config.cacheDuration) {
        return cached.data;
      }

      // Fetch from API
      const response = await window.ApiClient?.get(
        `${this.config.apiEndpoint}/${param}`
      ) || await this.fallbackMethod(param);

      // Cache result
      this.cache.set(param, {
        timestamp: Date.now(),
        data: response
      });

      return response;
    } catch (error) {
      window.ErrorHandler?.log('MyService error', 'error', { param, error });
      throw error;
    }
  },

  /**
   * Fallback when API unavailable
   * @private
   */
  async fallbackMethod(param) {
    return { data: 'fallback', param };
  }
};

// Initialize
MyService.init();
window.MyService = MyService;
```

**Step 2**: Add to dashboard.html

```html
<script src="assets/js/services/my-service.js"></script>
```

**Step 3**: Write tests in `tests/services/my-service.test.js`

```javascript
const MyServiceTests = {
  name: 'My Service Tests',
  tests: [],
  addTest(name, fn) { this.tests.push({ name, fn }); },
  // ... test methods
};

MyServiceTests.addTest('Service is defined', () => {
  if (!window.MyService) throw new Error('Service not defined');
});

window.MyServiceTests = MyServiceTests;
```

**Step 4**: Update API_DOCUMENTATION.md

### 2. Adding a New Dashboard Widget

**Step 1**: Add HTML to dashboard.html

```html
<!-- My Widget Section -->
<div class="row g-4 mt-4">
  <div class="col-12">
    <div class="card shadow-lg border-0">
      <div class="card-header bg-gradient-primary text-white">
        <h5 class="mb-0">
          <i class="bi bi-icon me-2"></i>
          <span>Widget Title | हिंदी शीर्षक</span>
        </h5>
      </div>
      <div class="card-body">
        <div id="myWidgetContainer">
          <!-- Dynamic content here -->
        </div>
      </div>
    </div>
  </div>
</div>
```

**Step 2**: Add JavaScript function

```javascript
/**
 * Initialize my widget
 */
async function initializeMyWidget() {
  const container = document.getElementById('myWidgetContainer');
  if (!container) return;

  // Show loading
  LoadingState.showSpinner('myWidgetContainer', 'Loading...');

  try {
    // Fetch data
    const data = await MyService.fetchData('param');
    
    // Hide loading
    LoadingState.hideSpinner('myWidgetContainer');
    
    // Render
    container.innerHTML = renderWidget(data);
  } catch (error) {
    ErrorHandler.showUserError('Failed to load widget');
    container.innerHTML = '<div class="alert alert-warning">Unable to load</div>';
  }
}

/**
 * Render widget HTML
 */
function renderWidget(data) {
  return `
    <div class="my-widget">
      <h6>${data.title}</h6>
      <p>${data.description}</p>
    </div>
  `;
}
```

**Step 3**: Add CSS to dashboard.html style section

```css
.my-widget {
  padding: 1rem;
  border-radius: 0.5rem;
  background: #f8f9fa;
}
```

**Step 4**: Call initialization in DOMContentLoaded

```javascript
document.addEventListener('DOMContentLoaded', function() {
  // ... existing init code ...
  
  // Initialize my widget
  initializeMyWidget().catch(console.error);
});
```

### 3. Adding a New API Integration

**Pattern for external APIs:**

```javascript
const ExternalAPIService = {
  async fetchFromAPI(endpoint, params) {
    // 1. Check cache
    const cacheKey = this.getCacheKey(endpoint, params);
    const cached = this.getCache(cacheKey);
    if (cached) return cached;

    // 2. Check rate limiting
    if (!this.checkRateLimit()) {
      throw new Error('Rate limit exceeded');
    }

    try {
      // 3. Make request
      const response = await fetch(this.buildUrl(endpoint, params), {
        headers: this.getHeaders()
      });

      // 4. Handle errors
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      // 5. Transform response
      const data = await response.json();
      const transformed = this.transformResponse(data);

      // 6. Cache result
      this.setCache(cacheKey, transformed);

      return transformed;
    } catch (error) {
      // 7. Fallback to mock data
      console.warn('API failed, using fallback:', error);
      return this.getFallbackData(params);
    }
  },

  getHeaders() {
    return {
      'Accept': 'application/json',
      'X-API-Key': this.config.apiKey // From environment
    };
  },

  transformResponse(data) {
    // Normalize API response to internal format
    return {
      id: data.id,
      name: data.name,
      // ... mapping
    };
  }
};
```

---

## Testing

### Running Tests

**Browser (Recommended)**
```
http://localhost:8080/tests/test-runner.html
```

**With auto-run**
```
http://localhost:8080/tests/test-runner.html?autorun=true
```

**Console**
```javascript
// Run all tests
window.ApiClientTests.runAll();
window.AIServiceTests.runAll();
```

### Writing Tests

```javascript
const MyTests = {
  name: 'My Feature Tests',
  tests: [],
  
  addTest(name, fn) {
    this.tests.push({ name, fn });
  },
  
  async runAll() {
    const results = { passed: 0, failed: 0 };
    
    for (const test of this.tests) {
      try {
        await test.fn();
        console.log(`✅ ${test.name}`);
        results.passed++;
      } catch (error) {
        console.error(`❌ ${test.name}: ${error.message}`);
        results.failed++;
      }
    }
    
    return results;
  },
  
  // Assertions
  assert(condition, message) {
    if (!condition) throw new Error(message);
  },
  
  assertEquals(a, b, message) {
    if (a !== b) throw new Error(message || `${a} !== ${b}`);
  },
  
  async assertAsync(fn, message) {
    try {
      await fn();
    } catch (error) {
      throw new Error(message || error.message);
    }
  }
};

// Add tests
MyTests.addTest('Feature works', () => {
  const result = myFunction();
  MyTests.assert(result === true, 'Should return true');
});

MyTests.addTest('Async feature works', async () => {
  const result = await myAsyncFunction();
  MyTests.assert(typeof result === 'object', 'Should return object');
});

window.MyTests = MyTests;
```

### Test Coverage Areas

1. **Unit Tests**: Individual functions
2. **Integration Tests**: Service interactions
3. **UI Tests**: DOM manipulation
4. **Error Handling**: Failure scenarios
5. **Caching**: Cache hit/miss/expiration
6. **Network**: Offline behavior, retries

---

## Deployment

### Static Hosting (GitHub Pages)

```bash
# Build (if needed)
npm run build

# Deploy to GitHub Pages
git add .
git commit -m "Deploy v2.0.0"
git push origin main
```

### Netlify

```bash
# Connect repository in Netlify dashboard
# Build command: (none - static site)
# Publish directory: /
```

### With Backend Server

```bash
# Start Node.js server
cd server
npm install
npm start

# Frontend will connect to localhost:3000
```

### Environment Variables

For production API keys, create `.env` (not committed):

```
# .env
OPENWEATHER_API_KEY=your_key_here
IMD_API_KEY=your_key_here
AGMARKNET_API_KEY=your_key_here
```

Access in code:
```javascript
const API_KEY = process.env.OPENWEATHER_API_KEY || 'demo_key';
```

---

## Best Practices

### Code Style

```javascript
// ✅ Good: JSDoc comments, clear naming
/**
 * Calculate crop yield based on weather
 * @param {Object} crop - Crop details
 * @param {number} crop.optimalTemp.min - Minimum optimal temp
 * @param {number} crop.optimalTemp.max - Maximum optimal temp
 * @returns {number} Yield factor (0-1)
 */
function calculateYieldFactor(crop, weather) {
  const tempRange = crop.optimalTemp.max - crop.optimalTemp.min;
  const deviation = Math.abs(weather.temp - (crop.optimalTemp.min + tempRange / 2));
  return Math.max(0, 1 - (deviation / tempRange));
}

// ❌ Bad: No comments, unclear names
function calc(c, w) {
  return Math.max(0, 1 - (Math.abs(w.t - (c.min + (c.max - c.min) / 2)) / (c.max - c.min)));
}
```

### Error Handling

```javascript
// ✅ Good: Specific error handling
async function fetchData() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Data not found');
      }
      if (response.status === 429) {
        throw new Error('Rate limited. Please try again later.');
      }
      throw new Error(`Server error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    if (error.name === 'TypeError') {
      // Network error
      window.ErrorHandler.showUserError('Network connection failed');
    } else {
      window.ErrorHandler.showUserError(error.message);
    }
    return null;
  }
}

// ❌ Bad: Generic error handling
async function fetchData() {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (e) {
    console.log(e);
    return null;
  }
}
```

### Async Patterns

```javascript
// ✅ Good: Parallel fetching with Promise.all
async function loadAllData() {
  const [weather, crops, prices] = await Promise.all([
    WeatherService.getCurrentWeather(lat, lon),
    CropService.getCropRisks(districtId),
    GovernmentService.getAgmarknetPrices(crop)
  ]);
  return { weather, crops, prices };
}

// ✅ Good: Sequential dependent operations
async function loadDependentData() {
  const district = await getDistrict();
  const weather = await WeatherService.getCurrentWeather(district.lat, district.lon);
  const crops = await CropService.getCropRisks(district.id, weather);
  return { district, weather, crops };
}
```

### Memory Management

```javascript
// ✅ Good: Clean up resources
class ChartManager {
  constructor() {
    this.charts = new Map();
  }
  
  createChart(id, config) {
    // Destroy existing chart
    if (this.charts.has(id)) {
      this.charts.get(id).destroy();
    }
    
    const chart = new Chart(document.getElementById(id), config);
    this.charts.set(id, chart);
    return chart;
  }
  
  destroyAll() {
    this.charts.forEach(chart => chart.destroy());
    this.charts.clear();
  }
}

// ✅ Good: Debounce frequent events
function debounce(fn, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Usage
window.addEventListener('resize', debounce(() => {
  resizeAllCharts();
}, 250));
```

---

## Troubleshooting

### Common Issues

**1. Service Worker not updating**
```javascript
// Force update in console
navigator.serviceWorker.getRegistrations().then(regs => {
  regs.forEach(reg => reg.unregister());
  location.reload();
});
```

**2. Cache issues**
```javascript
// Clear all caches
localStorage.clear();
indexedDB.deleteDatabase('agri-dashboard-cache');
```

**3. API calls failing**
- Check browser console for CORS errors
- Verify API keys in network requests
- Test with `?nocache=true` flag

**4. TensorFlow.js not loading**
- Check if CDN is accessible
- Verify browser supports WebGL
- Try fallback prediction mode

### Debug Mode

Enable debug logging:
```javascript
localStorage.setItem('debug', 'true');
location.reload();
```

This enables verbose console output from all services.

### Browser Compatibility

Check features:
```javascript
// Check required features
const requirements = {
  fetch: typeof fetch !== 'undefined',
  promises: typeof Promise !== 'undefined',
  localStorage: (() => {
    try {
      localStorage.setItem('test', 'test');
      localStorage.removeItem('test');
      return true;
    } catch {
      return false;
    }
  })(),
  serviceWorker: 'serviceWorker' in navigator
};

console.table(requirements);
```

---

## Resources

- **API Docs**: See [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
- **Changelog**: See [CHANGELOG.md](CHANGELOG.md)
- **Roadmap**: See [FEATURE_ROADMAP.md](FEATURE_ROADMAP.md)
- **Issues**: [GitHub Issues](https://github.com/PRITIK03/Smart-Agro-Insights--Integrated-Dashboard-for-Farm-Analytics/issues)

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make changes with tests
4. Run tests: Open `tests/test-runner.html`
5. Commit: `git commit -m "feat: add my feature"`
6. Push: `git push origin feature/my-feature`
7. Create Pull Request

### Commit Message Format

```
feat: Add new feature
fix: Fix bug
docs: Update documentation
test: Add tests
refactor: Code refactoring
perf: Performance improvement
chore: Maintenance
```

---

## License

MIT License - See LICENSE file

---

**Happy Coding! 🌾**
