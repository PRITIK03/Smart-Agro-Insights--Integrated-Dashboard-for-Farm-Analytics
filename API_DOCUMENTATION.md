# Smart Agro Insights - API Documentation

## Overview

Smart Agro Insights provides a comprehensive set of JavaScript services for agricultural analytics, AI predictions, weather data, and government data integration. This document describes the API for each service module.

---

## Table of Contents

1. [API Client](#api-client)
2. [Weather Service](#weather-service)
3. [Crop Service](#crop-service)
4. [AI Service](#ai-service)
5. [Government Service](#government-service)
6. [Error Handler](#error-handler)
7. [Loading State](#loading-state)

---

## API Client

**File**: `assets/js/utils/api-client.js`

Centralized HTTP client with caching, retries, and error handling.

### Methods

#### `ApiClient.get(url, params?, options?)`

Performs a GET request with automatic caching.

**Parameters:**
- `url` (string): API endpoint URL
- `params` (Object, optional): Query parameters
- `options` (Object, optional):
  - `timeout` (number): Request timeout in ms (default: 10000)
  - `retries` (number): Number of retry attempts (default: 3)
  - `cache` (boolean): Enable caching (default: true)
  - `ttl` (number): Cache TTL in ms (default: 300000)

**Returns:** Promise<Object>

**Example:**
```javascript
const weather = await ApiClient.get('/api/weather', { district: 'pune' });
```

#### `ApiClient.post(url, data, options?)`

Performs a POST request.

**Parameters:**
- `url` (string): API endpoint URL
- `data` (Object): Request body
- `options` (Object, optional): Same as GET options

**Returns:** Promise<Object>

**Example:**
```javascript
const result = await ApiClient.post('/api/predict', {
  crop: 'wheat',
  area: 5,
  district: 'pune'
});
```

#### `ApiClient.clearCache()`

Clears all cached responses.

**Returns:** void

---

## Weather Service

**File**: `assets/js/services/weather-service.js`

Provides weather data fetching and agricultural predictions.

### Methods

#### `WeatherService.getCurrentWeather(lat, lon)`

Fetches current weather for a location.

**Parameters:**
- `lat` (number): Latitude
- `lon` (number): Longitude

**Returns:** Promise<Object>
```javascript
{
  temp: number,        // Current temperature (°C)
  humidity: number,  // Humidity (%)
  rain: number,      // Rainfall (mm)
  wind: number,      // Wind speed (km/h)
  description: string,
  icon: string
}
```

#### `WeatherService.getForecast(lat, lon, days?)`

Fetches weather forecast.

**Parameters:**
- `lat` (number): Latitude
- `lon` (number): Longitude  
- `days` (number, optional): Number of days (default: 7)

**Returns:** Promise<Array>

#### `WeatherService.predictRainfall(districtId)`

Predicts rainfall using historical patterns.

**Parameters:**
- `districtId` (string): District identifier

**Returns:** Promise<number> - Predicted rainfall in mm

#### `WeatherService.assessWeatherRisk(cropType, weather)`

Assesses weather-related risks for a crop.

**Parameters:**
- `cropType` (Object): Crop with optimalTemp range
- `weather` (Object): Current weather conditions

**Returns:** Object
```javascript
{
  level: 'low' | 'medium' | 'high',
  score: number,  // 0-100
  factors: string[]
}
```

---

## Crop Service

**File**: `assets/js/services/crop-service.js`

Manages crop data, risk assessment, and recommendations.

### Methods

#### `CropService.getCropRisks(districtId, season?)`

Fetches crop risks for a district.

**Parameters:**
- `districtId` (string): District identifier
- `season` (string, optional): Season name

**Returns:** Promise<Array>
```javascript
[
  {
    crop: string,
    riskLevel: 'low' | 'medium' | 'high',
    riskFactors: string[]
  }
]
```

#### `CropService.calculateCropScore(cropType, weather, soil, season)`

Calculates crop compatibility score.

**Parameters:**
- `cropType` (Object): Crop information
- `weather` (Object): Weather conditions
- `soil` (Object): Soil information
- `season` (string): Current season

**Returns:** Promise<number> - Score 0-100

#### `CropService.getRecommendations(districtId, cropType, weather, soil)`

Gets AI-powered crop recommendations.

**Parameters:**
- `districtId` (string): District identifier
- `cropType` (Object): Selected crop
- `weather` (Object): Weather conditions
- `soil` (Object): Soil information

**Returns:** Promise<Array<string>> - List of recommendations

---

## AI Service

**File**: `assets/js/services/ai-service.js`

Provides ML-based predictions and disease detection.

### Methods

#### `AIService.predictYield(crop, weather, soil, area)`

Predicts crop yield using ML or rule-based fallback.

**Parameters:**
- `crop` (Object): Crop with name and optimalTemp
- `weather` (Object): Current weather
- `soil` (Object): Soil information
- `area` (number): Area in hectares

**Returns:** Promise<Object>
```javascript
{
  yield: number,      // Predicted yield in tons
  unit: 'tons',
  confidence: number, // 0-1
  factors: {
    temperature: number,
    rainfall: number,
    soil: number
  },
  insights: string[]  // AI-generated insights
}
```

**Example:**
```javascript
const prediction = await AIService.predictYield(
  { name: 'wheat', optimalTemp: { min: 15, max: 25 } },
  { temp: 22, humidity: 60, rain: 5 },
  { type: 'Loamy', ph: 7.0 },
  2.5
);
console.log(`Expected yield: ${prediction.yield} tons`);
```

#### `AIService.detectDisease(symptoms, imageData?)`

Detects crop diseases from symptoms or images.

**Parameters:**
- `symptoms` (Array<string>): List of symptoms
- `imageData` (string, optional): Base64 image data

**Returns:** Promise<Object>
```javascript
{
  detected: boolean,
  disease: {
    name: string,
    severity: 'low' | 'medium' | 'high',
    treatment: string[]
  },
  confidence: number,
  method: 'ml' | 'symptom-based' | 'image'
}
```

**Example:**
```javascript
const result = await AIService.detectDisease(
  ['yellow_leaves', 'brown_spots']
);
if (result.detected) {
  console.log(`Detected: ${result.disease.name}`);
  console.log('Treatment:', result.disease.treatment);
}
```

#### `AIService.getSmartRecommendations(context)`

Generates smart recommendations based on context.

**Parameters:**
- `context` (Object):
  - `weather`: Weather conditions
  - `soil`: Soil information
  - `crop`: Crop details
  - `season`: Current season

**Returns:** Array<string>

#### `AIService.hasTensorFlow()`

Checks if TensorFlow.js is available.

**Returns:** boolean

#### `AIService.getModelStatus()`

Gets status of ML models.

**Returns:** Object
```javascript
{
  loaded: boolean,
  hasTensorFlow: boolean,
  models: string[]
}
```

---

## Government Service

**File**: `assets/js/services/government-service.js`

Integrates with Indian government agricultural data sources.

### Methods

#### `GovernmentService.getIMDWeather(districtId)`

Fetches weather from IMD (Indian Meteorological Department).

**Parameters:**
- `districtId` (string): District identifier

**Returns:** Promise<Object>
```javascript
{
  source: 'IMD',
  location: { district, lat, lon },
  current: { temperature, humidity, wind_speed, ... },
  forecast: Array,
  alerts: Array
}
```

#### `GovernmentService.getAgmarknetPrices(commodity, market?)`

Fetches market prices from Agmarknet.

**Parameters:**
- `commodity` (string): Crop/commodity name
- `market` (string, optional): Specific market

**Returns:** Promise<Object>
```javascript
{
  source: 'Agmarknet',
  commodity: string,
  data: [
    {
      market: string,
      price: number,
      unit: 'Quintal',
      trend: 'up' | 'down',
      change_percent: number
    }
  ],
  summary: { avg_price, min_price, max_price }
}
```

#### `GovernmentService.getMSPData()`

Fetches MSP (Minimum Support Price) data.

**Returns:** Promise<Object>
```javascript
{
  source: 'GOI',
  year: '2024-25',
  crops: [
    {
      name: string,
      msp: number,
      unit: 'Quintal',
      increase: number,
      season: 'Kharif' | 'Rabi'
    }
  ]
}
```

#### `GovernmentService.getCropMSP(cropName)`

Gets MSP for specific crop.

**Parameters:**
- `cropName` (string): Crop name

**Returns:** Promise<Object|null>

#### `GovernmentService.getSoilHealthData(districtId)`

Fetches Soil Health Card data.

**Parameters:**
- `districtId` (string): District identifier

**Returns:** Promise<Object>

#### `GovernmentService.compareWithMSP(commodity, currentPrice)`

Compares market price with MSP.

**Parameters:**
- `commodity` (string): Crop name
- `currentPrice` (number): Current market price

**Returns:** Promise<Object>
```javascript
{
  crop: string,
  current_market_price: number,
  msp: number,
  difference: number,
  percent_above_msp: number,
  status: 'above_msp' | 'below_msp',
  recommendation: string
}
```

#### `GovernmentService.getGovernmentSchemes()`

Lists all government schemes for farmers.

**Returns:** Promise<Array>
```javascript
[
  {
    name: 'PM-KISAN',
    full_name: 'Pradhan Mantri Kisan Samman Nidhi',
    description: string,
    eligibility: string,
    benefit: string,
    website: string,
    status: 'active'
  }
]
```

---

## Error Handler

**File**: `assets/js/utils/error-handler.js`

Centralized error handling and logging.

### Methods

#### `ErrorHandler.log(message, level?, context?)`

Logs a message with specified level.

**Parameters:**
- `message` (string): Log message
- `level` (string, optional): 'info', 'warn', 'error', 'debug' (default: 'info')
- `context` (Object, optional): Additional context

**Returns:** void

#### `ErrorHandler.showUserError(message, options?)`

Displays error toast to user.

**Parameters:**
- `message` (string): Error message
- `options` (Object, optional):
  - `duration` (number): Display duration in ms (default: 5000)
  - `type` (string): 'error', 'warning', 'info' (default: 'error')

**Returns:** void

**Example:**
```javascript
ErrorHandler.showUserError('Failed to load weather data', { type: 'warning' });
```

#### `ErrorHandler.wrapAsync(fn, errorMessage?)`

Wraps async function with error handling.

**Parameters:**
- `fn` (Function): Async function to wrap
- `errorMessage` (string, optional): Fallback error message

**Returns:** Function

---

## Loading State

**File**: `assets/js/utils/loading-state.js`

Manages loading states and skeleton screens.

### Methods

#### `LoadingState.showChartSkeleton(elementId, type?)`

Shows skeleton loader for charts.

**Parameters:**
- `elementId` (string): Chart container ID
- `type` (string, optional): 'line', 'bar', 'pie', 'card' (default: 'line')

**Returns:** void

#### `LoadingState.hideSkeleton(elementId)`

Hides skeleton loader.

**Parameters:**
- `elementId` (string): Chart container ID

**Returns:** void

#### `LoadingState.showSpinner(containerId, message?)`

Shows loading spinner.

**Parameters:**
- `containerId` (string): Container ID
- `message` (string, optional): Loading message

**Returns:** void

#### `LoadingState.wrapLoading(fn, elementId, options?)`

Wraps async function with loading state.

**Parameters:**
- `fn` (Function): Async function
- `elementId` (string): Element to show loading on
- `options` (Object, optional):
  - `type` (string): Skeleton type
  - `message` (string): Loading message
  - `delay` (number): Delay before showing loader (default: 300)

**Returns:** Promise<any>

**Example:**
```javascript
const data = await LoadingState.wrapLoading(
  () => fetchWeatherData(),
  'weatherChart',
  { type: 'line', message: 'Loading weather data...' }
);
```

---

## Caching

All services use intelligent caching:

- **API Client**: 5 minutes default TTL
- **Weather Data**: 15 minutes
- **Government Data**: 30 minutes
- **AI Predictions**: 5 minutes

Cache can be cleared:
```javascript
ApiClient.clearCache();
```

---

## Error Handling

All services follow consistent error handling:

1. **Network errors**: Automatic retries with exponential backoff
2. **API failures**: Graceful degradation with fallback data
3. **User feedback**: Toast notifications for critical errors
4. **Logging**: All errors logged to console with context

---

## Testing

Run tests via:
- **Browser**: Open `tests/test-runner.html`
- **Console**: Run `window.ApiClientTests.runAll()` or `window.AIServiceTests.runAll()`
- **Auto-run**: Add `?test=true` to any page URL

---

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13.1+
- Edge 80+

Requires:
- ES6+ JavaScript support
- Fetch API
- Promise support
- LocalStorage

---

## License

MIT License - See LICENSE file for details

---

## Support

For issues or questions:
- GitHub Issues: https://github.com/PRITIK03/Smart-Agro-Insights--Integrated-Dashboard-for-Farm-Analytics/issues
- Email: [Project Email]
