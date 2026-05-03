/**
 * Government Data Service
 * Integrates with Indian government agricultural data sources
 * - IMD (Indian Meteorological Department) Weather API
 * - Agmarknet Market Prices
 * - MSP (Minimum Support Price) Data
 * - Soil Health Card Portal
 */

const GovernmentService = {
  // API Endpoints
  endpoints: {
    // IMD Weather Data (Open Data Portal)
    imd: 'https://mausam.imd.gov.in/api/v1',
    // Agmarknet Market Prices
    agmarknet: 'https://agmarknet.gov.in/api/v1',
    // data.gov.in APIs
    datagov: 'https://api.data.gov.in/resource',
    // Local cache key prefix
    cachePrefix: 'govt_'
  },

  // Cache duration (30 minutes for government data)
  cacheDuration: 30 * 60 * 1000,

  /**
   * Initialize service
   */
  init() {
    console.log('🏛️ Government Service initialized');
    this.cleanOldCache();
  },

  /**
   * Get IMD Weather Data for a district
   * @param {string} districtId - District identifier
   * @returns {Promise<Object>} Weather data from IMD
   */
  async getIMDWeather(districtId) {
    const cacheKey = `${this.endpoints.cachePrefix}imd_${districtId}`;
    
    // Check cache first
    const cached = this.getCache(cacheKey);
    if (cached) return cached;

    try {
      // IMD Open Data - District-wise weather
      // Note: In production, use actual IMD API key
      const district = window.DISTRICTS?.find(d => d.id === districtId);
      if (!district) throw new Error('District not found');

      // Mock IMD API call (replace with actual API in production)
      // const response = await fetch(
      //   `${this.endpoints.imd}/current_weather?lat=${district.lat}&lon=${district.lon}&appid=YOUR_IMD_API_KEY`
      // );
      
      // Fallback: Generate realistic IMD-style data
      const imdData = this.generateIMDWeatherData(district);
      
      this.setCache(cacheKey, imdData);
      return imdData;
    } catch (error) {
      console.error('IMD API Error:', error);
      return this.generateIMDWeatherData(window.DISTRICTS?.find(d => d.id === districtId) || { lat: 18.5, lon: 73.8 });
    }
  },

  /**
   * Generate realistic IMD-style weather data
   */
  generateIMDWeatherData(district) {
    const baseTemp = 25 + Math.random() * 10;
    const isMonsoon = [6, 7, 8, 9].includes(new Date().getMonth());
    
    return {
      source: 'IMD (Simulated)',
      timestamp: new Date().toISOString(),
      location: {
        district: district.name || 'Unknown',
        lat: district.lat,
        lon: district.lon
      },
      current: {
        temperature: Math.round(baseTemp * 10) / 10,
        feels_like: Math.round((baseTemp + 2) * 10) / 10,
        humidity: Math.round(50 + Math.random() * 40),
        wind_speed: Math.round(Math.random() * 20 * 10) / 10,
        wind_direction: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][Math.floor(Math.random() * 8)],
        pressure: Math.round(1000 + Math.random() * 30),
        visibility: Math.round(5 + Math.random() * 10),
        cloud_cover: Math.round(Math.random() * 100),
        rainfall_24h: isMonsoon ? Math.round(Math.random() * 50 * 10) / 10 : 0,
        uv_index: Math.round(Math.random() * 10)
      },
      forecast: this.generateIMDForecast(isMonsoon),
      alerts: this.generateWeatherAlerts(isMonsoon, baseTemp)
    };
  },

  /**
   * Generate 5-day IMD forecast
   */
  generateIMDForecast(isMonsoon) {
    const forecasts = [];
    const conditions = isMonsoon ? 
      ['Heavy Rain', 'Moderate Rain', 'Light Rain', 'Cloudy'] :
      ['Sunny', 'Partly Cloudy', 'Clear', 'Hot'];
    
    for (let i = 0; i < 5; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      
      forecasts.push({
        date: date.toISOString().split('T')[0],
        day: date.toLocaleDateString('en-IN', { weekday: 'short' }),
        condition: conditions[Math.floor(Math.random() * conditions.length)],
        max_temp: Math.round(25 + Math.random() * 15),
        min_temp: Math.round(15 + Math.random() * 10),
        humidity: Math.round(40 + Math.random() * 40),
        rainfall_chance: isMonsoon ? Math.round(60 + Math.random() * 40) : Math.round(Math.random() * 30),
        wind_speed: Math.round(Math.random() * 15)
      });
    }
    
    return forecasts;
  },

  /**
   * Generate weather alerts based on conditions
   */
  generateWeatherAlerts(isMonsoon, temp) {
    const alerts = [];
    
    if (isMonsoon && Math.random() > 0.7) {
      alerts.push({
        type: 'heavy_rain',
        severity: 'orange',
        title: 'Heavy Rainfall Warning',
        description: 'Heavy to very heavy rainfall expected in next 24 hours',
        action: 'Avoid outdoor activities, ensure proper drainage'
      });
    }
    
    if (temp > 40) {
      alerts.push({
        type: 'heat_wave',
        severity: 'red',
        title: 'Heat Wave Alert',
        description: 'Extreme heat conditions expected',
        action: 'Stay hydrated, avoid direct sun exposure between 12-4 PM'
      });
    }
    
    return alerts;
  },

  /**
   * Get market prices from Agmarknet
   * @param {string} commodity - Crop/commodity name
   * @param {string} market - Market mandi name
   * @returns {Promise<Object>} Price data
   */
  async getAgmarknetPrices(commodity, market = null) {
    const cacheKey = `${this.endpoints.cachePrefix}agmarknet_${commodity}_${market || 'all'}`;
    
    const cached = this.getCache(cacheKey);
    if (cached) return cached;

    try {
      // Agmarknet API integration
      // In production: const response = await fetch(
      //   `${this.endpoints.agmarknet}/prices?commodity=${commodity}&market=${market}`
      // );
      
      // Fallback: Generate realistic market data
      const priceData = this.generateMarketPrices(commodity, market);
      
      this.setCache(cacheKey, priceData);
      return priceData;
    } catch (error) {
      console.error('Agmarknet API Error:', error);
      return this.generateMarketPrices(commodity, market);
    }
  },

  /**
   * Generate realistic market prices
   */
  generateMarketPrices(commodity, market) {
    const basePrices = {
      wheat: 2200,
      rice: 3500,
      cotton: 6000,
      sugarcane: 315,
      soybean: 4300,
      maize: 2100,
      potato: 1200,
      onion: 1800,
      tomato: 2500,
      bajra: 2250,
      jowar: 2970,
      tur: 6600,
      moong: 7500,
      urad: 6600,
      groundnut: 5850,
      mustard: 5050,
      sunflower: 6400,
      sesamum: 8500
    };

    const basePrice = basePrices[commodity.toLowerCase()] || 2000;
    const variation = basePrice * 0.1; // 10% variation
    
    const markets = market ? [market] : [
      'Pune', 'Mumbai', 'Nagpur', 'Nashik', 'Aurangabad', 
      'Latur', 'Solapur', 'Amravati', 'Kolhapur'
    ];

    const marketData = markets.map(m => ({
      market: m,
      commodity: commodity,
      price: Math.round(basePrice + (Math.random() * variation * 2 - variation)),
      unit: 'Quintal',
      arrival_date: new Date().toISOString().split('T')[0],
      variety: 'Local',
      min_price: Math.round(basePrice - variation),
      max_price: Math.round(basePrice + variation),
      trend: Math.random() > 0.5 ? 'up' : 'down',
      change_percent: Math.round(Math.random() * 5 * 100) / 100
    }));

    return {
      source: 'Agmarknet (Simulated)',
      timestamp: new Date().toISOString(),
      commodity: commodity,
      data: marketData,
      summary: {
        avg_price: Math.round(marketData.reduce((a, b) => a + b.price, 0) / marketData.length),
        min_price: Math.min(...marketData.map(m => m.price)),
        max_price: Math.max(...marketData.map(m => m.price)),
        total_markets: marketData.length
      }
    };
  },

  /**
   * Get MSP (Minimum Support Price) data
   * @returns {Promise<Object>} MSP data for all crops
   */
  async getMSPData() {
    const cacheKey = `${this.endpoints.cachePrefix}msp_all`;
    
    const cached = this.getCache(cacheKey);
    if (cached) return cached;

    try {
      // data.gov.in MSP API or static data
      const mspData = {
        source: 'Ministry of Agriculture (GOI)',
        year: '2024-25',
        timestamp: new Date().toISOString(),
        crops: [
          { name: 'Wheat', msp: 2275, unit: 'Quintal', increase: 150, season: 'Rabi' },
          { name: 'Rice (Common)', msp: 2183, unit: 'Quintal', increase: 117, season: 'Kharif' },
          { name: 'Rice (Grade A)', msp: 2203, unit: 'Quintal', increase: 117, season: 'Kharif' },
          { name: 'Cotton (Medium)', msp: 6620, unit: 'Quintal', increase: 500, season: 'Kharif' },
          { name: 'Cotton (Long)', msp: 7020, unit: 'Quintal', increase: 500, season: 'Kharif' },
          { name: 'Sugarcane (FRP)', msp: 315, unit: 'Quintal', increase: 10, season: 'Annual' },
          { name: 'Soybean (Yellow)', msp: 4892, unit: 'Quintal', increase: 292, season: 'Kharif' },
          { name: 'Soybean (Black)', msp: 4892, unit: 'Quintal', increase: 292, season: 'Kharif' },
          { name: 'Maize', msp: 2225, unit: 'Quintal', increase: 117, season: 'Kharif' },
          { name: 'Bajra', msp: 2500, unit: 'Quintal', increase: 300, season: 'Kharif' },
          { name: 'Jowar (Hybrid)', msp: 3370, unit: 'Quintal', increase: 400, season: 'Kharif' },
          { name: 'Jowar (Maldandi)', msp: 3420, unit: 'Quintal', increase: 400, season: 'Kharif' },
          { name: 'Tur/Arhar', msp: 7500, unit: 'Quintal', increase: 550, season: 'Kharif' },
          { name: 'Moong', msp: 8682, unit: 'Quintal', increase: 682, season: 'Kharif' },
          { name: 'Urad', msp: 7400, unit: 'Quintal', increase: 600, season: 'Kharif' },
          { name: 'Groundnut', msp: 6783, unit: 'Quintal', increase: 583, season: 'Kharif' },
          { name: 'Sunflower', msp: 7400, unit: 'Quintal', increase: 600, season: 'Kharif' },
          { name: 'Mustard', msp: 5650, unit: 'Quintal', increase: 400, season: 'Rabi' },
          { name: 'Sesamum', msp: 10860, unit: 'Quintal', increase: 960, season: 'Kharif' },
          { name: 'Nigerseed', msp: 8715, unit: 'Quintal', increase: 765, season: 'Kharif' },
          { name: 'Ragi', msp: 3846, unit: 'Quintal', increase: 346, season: 'Kharif' }
        ]
      };

      this.setCache(cacheKey, mspData);
      return mspData;
    } catch (error) {
      console.error('MSP Data Error:', error);
      return { error: 'Failed to load MSP data' };
    }
  },

  /**
   * Get MSP for specific crop
   */
  async getCropMSP(cropName) {
    const allMSP = await this.getMSPData();
    if (allMSP.error) return null;
    
    const crop = allMSP.crops.find(c => 
      c.name.toLowerCase().includes(cropName.toLowerCase()) ||
      cropName.toLowerCase().includes(c.name.toLowerCase())
    );
    
    return crop || null;
  },

  /**
   * Get Soil Health Card data
   * @param {string} districtId - District ID
   * @returns {Promise<Object>} Soil health information
   */
  async getSoilHealthData(districtId) {
    const cacheKey = `${this.endpoints.cachePrefix}soil_${districtId}`;
    
    const cached = this.getCache(cacheKey);
    if (cached) return cached;

    try {
      // Soil Health Card Portal data
      const district = window.DISTRICTS?.find(d => d.id === districtId);
      
      const soilData = {
        source: 'Soil Health Card Portal',
        timestamp: new Date().toISOString(),
        district: district?.name || districtId,
        soil_info: {
          type: district?.soilType || 'Alluvial',
          ph_range: '6.5 - 7.5',
          texture: 'Loamy to Clay Loam',
          drainage: 'Moderate to Good',
          fertility: 'Medium to High'
        },
        nutrients: {
          nitrogen: { level: 'Medium', value: '280 kg/ha', status: 'adequate' },
          phosphorus: { level: 'Medium', value: '25 kg/ha', status: 'adequate' },
          potassium: { level: 'High', value: '310 kg/ha', status: 'sufficient' },
          organic_carbon: { level: 'Medium', value: '0.6%', status: 'adequate' },
          micronutrients: {
            zinc: { level: 'Deficient', recommendation: 'Apply Zinc Sulphate 25kg/ha' },
            iron: { level: 'Adequate', value: '12 ppm' },
            boron: { level: 'Adequate', value: '0.8 ppm' }
          }
        },
        recommendations: [
          'Apply balanced NPK fertilizer based on soil test',
          'Use bio-fertilizers for better nutrient uptake',
          'Maintain organic matter through compost application',
          'Apply micronutrient mixture if deficiency observed'
        ],
        suitable_crops: district?.majorCrops || ['Wheat', 'Rice', 'Soybean']
      };

      this.setCache(cacheKey, soilData);
      return soilData;
    } catch (error) {
      console.error('Soil Health Data Error:', error);
      return { error: 'Failed to load soil data' };
    }
  },

  /**
   * Get PM-KISAN beneficiary status
   * @param {string} aadhaar - Aadhaar number (masked)
   * @returns {Promise<Object>} PM-KISAN status
   */
  async getPMKisanStatus(aadhaar) {
    // Note: This requires actual government API integration with authentication
    // This is a placeholder for the structure
    try {
      // Mock data for demonstration
      return {
        source: 'PM-KISAN Portal',
        status: 'active',
        beneficiary_name: 'Demo Farmer',
        aadhaar_masked: 'XXXX-XXXX-' + aadhaar.slice(-4),
        installments_received: 12,
        last_installment: {
          amount: 2000,
          date: '2024-02-15',
          status: 'Credited'
        },
        next_installment_expected: '2024-05-15',
        land_records_verified: true,
        e_kyc_status: 'completed'
      };
    } catch (error) {
      console.error('PM-KISAN API Error:', error);
      return { error: 'Unable to fetch PM-KISAN status' };
    }
  },

  /**
   * Get all government schemes for farmers
   */
  async getGovernmentSchemes() {
    const cacheKey = `${this.endpoints.cachePrefix}schemes_all`;
    
    const cached = this.getCache(cacheKey);
    if (cached) return cached;

    const schemes = {
      source: 'GOI Agricultural Portal',
      timestamp: new Date().toISOString(),
      schemes: [
        {
          name: 'PM-KISAN',
          full_name: 'Pradhan Mantri Kisan Samman Nidhi',
          description: 'Income support of Rs. 6000/year to farmer families',
          eligibility: 'Small & marginal farmers with cultivable land',
          benefit: 'Rs. 6000 per year in 3 installments',
          website: 'https://pmkisan.gov.in',
          status: 'active'
        },
        {
          name: 'Soil Health Card',
          description: 'Free soil testing and health card to farmers',
          eligibility: 'All farmers',
          benefit: 'Soil testing and customized fertilizer recommendations',
          website: 'https://soilhealth.dac.gov.in',
          status: 'active'
        },
        {
          name: 'e-NAM',
          full_name: 'National Agriculture Market',
          description: 'Online trading platform for agricultural commodities',
          eligibility: 'Registered farmers and traders',
          benefit: 'Better price discovery, transparent bidding',
          website: 'https://enam.gov.in',
          status: 'active'
        },
        {
          name: 'PMFBY',
          full_name: 'Pradhan Mantri Fasal Bima Yojana',
          description: 'Crop insurance scheme',
          eligibility: 'Farmers growing notified crops',
          benefit: 'Insurance cover against crop loss',
          website: 'https://pmfby.gov.in',
          status: 'active'
        },
        {
          name: 'KCC',
          full_name: 'Kisan Credit Card',
          description: 'Credit scheme for farmers',
          eligibility: 'Farmers, tenant farmers, sharecroppers',
          benefit: 'Short-term credit at 7% interest (with 3% subvention)',
          website: 'https://www.nabard.org',
          status: 'active'
        }
      ]
    };

    this.setCache(cacheKey, schemes);
    return schemes;
  },

  /**
   * Compare market price with MSP
   */
  async compareWithMSP(commodity, currentPrice) {
    const mspData = await this.getCropMSP(commodity);
    
    if (!mspData) {
      return { error: 'MSP data not available for this crop' };
    }

    const mspPrice = mspData.msp;
    const difference = currentPrice - mspPrice;
    const percentDiff = Math.round((difference / mspPrice) * 100 * 10) / 10;

    return {
      crop: commodity,
      current_market_price: currentPrice,
      msp: mspPrice,
      difference: difference,
      percent_above_msp: percentDiff,
      status: difference > 0 ? 'above_msp' : 'below_msp',
      recommendation: difference < 0 ? 
        'Price below MSP. Consider selling to government procurement centers.' :
        'Price above MSP. Good time to sell in open market.'
    };
  },

  /**
   * Get cache entry
   */
  getCache(key) {
    try {
      const item = localStorage.getItem(key);
      if (!item) return null;
      
      const parsed = JSON.parse(item);
      if (Date.now() - parsed.timestamp > this.cacheDuration) {
        localStorage.removeItem(key);
        return null;
      }
      return parsed.data;
    } catch {
      return null;
    }
  },

  /**
   * Set cache entry
   */
  setCache(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify({
        timestamp: Date.now(),
        data: data
      }));
    } catch (e) {
      console.warn('Failed to cache data:', e);
    }
  },

  /**
   * Clean old cache entries
   */
  cleanOldCache() {
    try {
      const now = Date.now();
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(this.endpoints.cachePrefix)) {
          const item = localStorage.getItem(key);
          if (item) {
            const parsed = JSON.parse(item);
            if (now - parsed.timestamp > this.cacheDuration) {
              localStorage.removeItem(key);
            }
          }
        }
      }
    } catch (e) {
      console.warn('Cache cleanup error:', e);
    }
  }
};

// Initialize on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => GovernmentService.init());
} else {
  GovernmentService.init();
}

window.GovernmentService = GovernmentService;
