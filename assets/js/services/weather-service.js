/**
 * Weather Service
 * Handles weather data fetching, caching, and predictions
 */

const WeatherService = {
  // API endpoints
  endpoints: {
    current: '/api/weather',
    history: '/api/weather-history',
    forecast: '/api/weather-forecast'
  },

  // Weather data cache
  cache: {
    current: null,
    history: null,
    forecast: null,
    lastUpdated: null
  },

  /**
   * Initialize weather service
   */
  init() {
    console.log('Weather service initialized');
  },

  /**
   * Get current weather for a location
   */
  async getCurrentWeather(lat, lon) {
    try {
      const data = await ApiClient.get(
        `${this.endpoints.current}?lat=${lat}&lon=${lon}`,
        { cacheTTL: 10 * 60 * 1000 } // 10 minutes
      );
      
      this.cache.current = data;
      this.cache.lastUpdated = Date.now();
      
      return data;
    } catch (error) {
      console.error('Failed to fetch weather:', error);
      return this.getFallbackWeather();
    }
  },

  /**
   * Get weather history (last 7 days)
   */
  async getWeatherHistory(lat, lon) {
    try {
      const data = await ApiClient.get(
        `${this.endpoints.history}?lat=${lat}&lon=${lon}`,
        { cacheTTL: 60 * 60 * 1000 } // 1 hour
      );
      
      this.cache.history = data;
      return data;
    } catch (error) {
      console.error('Failed to fetch weather history:', error);
      return this.getFallbackHistory();
    }
  },

  /**
   * Get 7-day forecast
   */
  async getForecast(lat, lon) {
    try {
      // Try to fetch from API
      const data = await ApiClient.get(
        `${this.endpoints.forecast}?lat=${lat}&lon=${lon}`,
        { cacheTTL: 30 * 60 * 1000 } // 30 minutes
      );
      
      this.cache.forecast = data;
      return data;
    } catch (error) {
      console.log('Forecast API not available, using prediction model');
      return this.generatePrediction(lat, lon);
    }
  },

  /**
   * Generate weather prediction using historical patterns
   */
  generatePrediction(lat, lon) {
    const history = this.cache.history || this.getFallbackHistory();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date().getDay();
    
    return {
      labels: days.map((_, i) => days[(today + i + 1) % 7]),
      temperature: this.predictTemperatures(history),
      rainfall: this.predictRainfall(history),
      generated: true // Flag that this is AI-generated
    };
  },

  /**
   * Predict temperatures based on historical trend
   */
  predictTemperatures(history) {
    if (!history || !history.length) {
      return [28, 29, 30, 29, 28, 27, 28];
    }

    const temps = history.map(h => h.temp || h.temperature || 28);
    const avg = temps.reduce((a, b) => a + b, 0) / temps.length;
    const trend = temps[temps.length - 1] - temps[0];
    
    // Generate 7-day prediction
    return Array(7).fill(0).map((_, i) => {
      const predicted = avg + (trend * (i + 1) / 7) + (Math.random() - 0.5) * 2;
      return Math.round(predicted);
    });
  },

  /**
   * Predict rainfall based on historical patterns
   */
  predictRainfall(history) {
    if (!history || !history.length) {
      return [0, 0, 2, 5, 0, 0, 1];
    }

    const rains = history.map(h => h.rain || h.rainfall || 0);
    const avg = rains.reduce((a, b) => a + b, 0) / rains.length;
    
    // Add some randomness
    return Array(7).fill(0).map(() => {
      const rain = avg + (Math.random() - 0.5) * avg * 2;
      return Math.max(0, Math.round(rain * 10) / 10);
    });
  },

  /**
   * Get weather risk level for crops
   */
  getWeatherRisk(weather, cropType) {
    const { temp, rain, humidity } = weather;
    let risk = 'low';
    let reasons = [];

    // Temperature risks
    if (temp > 40) {
      risk = 'high';
      reasons.push('Extreme heat may damage crops');
    } else if (temp < 10) {
      risk = 'high';
      reasons.push('Cold temperatures may frost crops');
    } else if (temp > 35) {
      risk = 'medium';
      reasons.push('High temperature - monitor irrigation');
    }

    // Rainfall risks
    if (rain > 20) {
      risk = risk === 'high' ? 'high' : 'medium';
      reasons.push('Heavy rain may cause waterlogging');
    } else if (rain === 0 && humidity < 30) {
      risk = 'medium';
      reasons.push('Dry conditions - irrigation needed');
    }

    return { level: risk, reasons };
  },

  /**
   * Fallback weather data
   */
  getFallbackWeather() {
    return {
      temp: 28,
      humidity: 65,
      rain: 0,
      wind: 3,
      fallback: true
    };
  },

  /**
   * Fallback history data
   */
  getFallbackHistory() {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push({
        date: date.toISOString().slice(0, 10),
        temp: Math.round(24 + Math.sin(i) * 4 + Math.random() * 2),
        rain: Math.round((Math.abs(Math.cos(i)) * 5 + Math.random()) * 10) / 10
      });
    }
    return days;
  }
};

// Initialize
WeatherService.init();

window.WeatherService = WeatherService;
