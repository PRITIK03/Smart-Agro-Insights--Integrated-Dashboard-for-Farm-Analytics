# Changelog

All notable changes to Smart Agro Insights are documented in this file.

## [2.0.0] - 2026-05-04

### Major Release - AI & Government Data Integration

### Added

#### AI/ML Features (Phase 2)
- **TensorFlow.js Integration** - Added TensorFlow.js CDN for client-side ML
- **AI Crop Yield Prediction** - ML-based yield prediction with confidence scores
- **Disease Detection** - AI-powered disease detection from symptoms and images
- **Smart Recommendations** - Context-aware farming recommendations
- **Impact Factor Analysis** - Temperature, rainfall, and soil factor breakdowns
- **Bilingual AI Interface** - Hindi + English labels throughout

#### Government Data Integration (Phase 3)
- **IMD Weather API** - Indian Meteorological Department weather data
- **Agmarknet Prices** - Real-time market prices from government sources
- **MSP Comparison** - Minimum Support Price vs market price comparison
- **Weather Alerts** - IMD weather warnings with severity indicators
- **Government Schemes** - Quick access to PM-KISAN, PMFBY, e-NAM, Soil Health Card, KCC
- **Soil Health Card Data** - Integration with portal
- **30-minute caching** for government data

#### Architecture & Performance (Phase 1)
- **Modular Service Architecture** - Separated concerns into services
- **API Client with Caching** - Centralized HTTP client with retry logic
- **Error Handler** - Centralized error handling with user notifications
- **Loading States** - Skeleton screens and loading spinners
- **Module Loader** - Dynamic module loading with error boundaries
- **Stale-while-revalidate** Service Worker caching strategy

#### Testing & Documentation (Phase 4)
- **Unit Tests** - API Client tests, AI Service tests
- **Test Runner** - Browser-based test suite at `tests/test-runner.html`
- **API Documentation** - Comprehensive API docs for all services
- **JSDoc Comments** - Added throughout codebase

### Improved
- **Service Worker** - Better caching strategy and notification icons
- **Error Handling** - Toast notifications and graceful fallbacks
- **Performance** - 30-minute caching for government data
- **Modularity** - dashboard.js refactored into smaller modules
- **Type Safety** - Added input validation and type checking
- **Accessibility** - Better ARIA labels and keyboard navigation

### Fixed
- **Typo** - Fixed `window.window.sampleData` to `window.sampleData`
- **Service Worker** - Fixed push notification icons
- **Manifest** - Simplified to only use existing icons
- **Chart Variables** - Organized 16 global chart variables

### Technical Details

#### New Files
```
assets/js/utils/
  - error-handler.js (161 lines)
  - api-client.js (164 lines)
  - loading-state.js (188 lines)
  - module-loader.js (178 lines)
  - index.js (38 lines)

assets/js/services/
  - weather-service.js (205 lines)
  - crop-service.js (222 lines)
  - ai-service.js (264 lines)
  - government-service.js (461 lines)

tests/
  - test-runner.html
  - utils/api-client.test.js
  - services/ai-service.test.js

API_DOCUMENTATION.md
CHANGELOG.md
```

#### Lines of Code
- Total new code: ~2,000+ lines
- Test coverage: Core services tested
- Documentation: Complete API reference

---

## [1.5.0] - 2026-05-02

### Added
- Enhanced dashboard with analytics
- Weather trend mini chart
- PWA manifest improvements
- Service worker updates

---

## [1.0.0] - 2026-04-28

### Initial Release
- Basic dashboard functionality
- District selection
- Crop risk assessment
- Weather integration
- Multilingual support (Hindi/English)
- PWA foundation
