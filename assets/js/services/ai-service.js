/**
 * AI Service
 * Machine learning models for agricultural predictions
 */

const AIService = {
  // Model configurations
  models: {
    yield: null,
    disease: null,
    recommendation: null
  },

  // Feature flags
  enabled: {
    yield: false,
    disease: false,
    recommendation: true // Rule-based fallback always enabled
  },

  /**
   * Initialize AI service
   */
  async init() {
    console.log('Initializing AI service...');
    
    // Check if TensorFlow.js is available
    if (typeof tf !== 'undefined') {
      console.log('TensorFlow.js detected - enabling ML features');
      this.enabled.yield = true;
      this.enabled.disease = true;
      
      // Load pre-trained models if available
      await this.loadModels();
    } else {
      console.log('TensorFlow.js not available - using rule-based predictions');
    }
  },

  /**
   * Load ML models
   */
  async loadModels() {
    try {
      // Placeholder for model loading
      // In production, models would be loaded from IndexedDB or CDN
      console.log('ML models would be loaded here');
    } catch (error) {
      console.error('Failed to load ML models:', error);
      this.enabled.yield = false;
      this.enabled.disease = false;
    }
  },

  /**
   * Predict crop yield using ML or rule-based approach
   */
  async predictYield(crop, weather, soil, area) {
    const features = this.extractYieldFeatures(crop, weather, soil, area);
    
    if (this.enabled.yield && this.models.yield) {
      // Use ML model
      return await this.mlPredictYield(features);
    } else {
      // Use rule-based prediction
      return this.ruleBasedYieldPrediction(features);
    }
  },

  /**
   * Extract features for yield prediction
   */
  extractYieldFeatures(crop, weather, soil, area) {
    return {
      cropType: this.encodeCropType(crop.name || crop),
      area: area || 1, // hectares
      temperature: weather.temp || 25,
      humidity: weather.humidity || 60,
      rainfall: weather.rain || 0,
      soilType: this.encodeSoilType(soil.type || 'Alluvial'),
      soilPH: soil.ph || 7.0,
      season: this.getCurrentSeason()
    };
  },

  /**
   * Rule-based yield prediction
   */
  ruleBasedYieldPrediction(features) {
    // Base yields (tons per hectare)
    const baseYields = {
      wheat: 3.5,
      rice: 4.0,
      cotton: 1.5,
      sugarcane: 70,
      soybean: 2.0,
      maize: 5.0,
      potato: 20,
      onion: 15,
      mustard: 1.2
    };

    const crop = this.decodeCropType(features.cropType);
    let baseYield = baseYields[crop.toLowerCase()] || 3;

    // Apply weather factors
    const tempFactor = this.calculateTempFactor(features.temperature, crop);
    const rainFactor = this.calculateRainFactor(features.rainfall, crop);
    
    // Apply soil factors
    const soilFactor = this.calculateSoilFactor(features.soilPH, features.soilType);

    // Calculate final yield
    const predictedYield = baseYield * tempFactor * rainFactor * soilFactor * features.area;
    
    // Calculate confidence based on data quality
    const confidence = this.calculateConfidence(features);

    return {
      yield: Math.round(predictedYield * 10) / 10,
      unit: 'tons',
      confidence: confidence,
      factors: {
        temperature: tempFactor,
        rainfall: rainFactor,
        soil: soilFactor
      },
      method: 'rule-based'
    };
  },

  /**
   * Calculate temperature factor (0.5 - 1.5)
   */
  calculateTempFactor(temp, crop) {
    const optimalTemps = {
      wheat: 25, rice: 30, cotton: 32, sugarcane: 30,
      soybean: 28, maize: 28, potato: 22, onion: 25, mustard: 25
    };

    const optimal = optimalTemps[crop.toLowerCase()] || 25;
    const diff = Math.abs(temp - optimal);
    
    if (diff <= 5) return 1.2;
    if (diff <= 10) return 1.0;
    if (diff <= 15) return 0.8;
    return 0.6;
  },

  /**
   * Calculate rainfall factor (0.5 - 1.5)
   */
  calculateRainFactor(rain, crop) {
    const optimalRain = {
      wheat: 50, rice: 150, cotton: 80, sugarcane: 120,
      soybean: 70, maize: 60, potato: 40, onion: 35, mustard: 40
    };

    const optimal = optimalRain[crop.toLowerCase()] || 50;
    const diff = Math.abs(rain - optimal);
    
    if (diff <= 20) return 1.2;
    if (diff <= 40) return 1.0;
    if (diff <= 60) return 0.8;
    return 0.6;
  },

  /**
   * Calculate soil factor (0.5 - 1.5)
   */
  calculateSoilFactor(ph, soilType) {
    let phFactor = 1.0;
    
    // Optimal pH is 6.5-7.5
    if (ph >= 6.5 && ph <= 7.5) phFactor = 1.2;
    else if (ph >= 6.0 && ph <= 8.0) phFactor = 1.0;
    else if (ph >= 5.5 && ph <= 8.5) phFactor = 0.8;
    else phFactor = 0.6;

    // Soil type factor
    const soilFactors = {
      'Alluvial': 1.2,
      'Black': 1.1,
      'Red': 1.0,
      'Laterite': 0.9
    };

    const typeFactor = soilFactors[soilType] || 1.0;

    return (phFactor + typeFactor) / 2;
  },

  /**
   * Calculate prediction confidence
   */
  calculateConfidence(features) {
    let confidence = 0.5;

    // Higher confidence if all features are present
    if (features.temperature > 0) confidence += 0.1;
    if (features.humidity > 0) confidence += 0.1;
    if (features.rainfall >= 0) confidence += 0.1;
    if (features.soilPH > 0) confidence += 0.1;
    if (features.area > 0) confidence += 0.1;

    return Math.min(0.95, confidence);
  },

  /**
   * Detect crop disease from symptoms
   */
  async detectDisease(symptoms, imageData = null) {
    if (this.enabled.disease && imageData && this.models.disease) {
      // Use image-based ML detection
      return await this.mlDetectDisease(imageData);
    } else {
      // Use symptom-based rule detection
      return this.ruleBasedDiseaseDetection(symptoms);
    }
  },

  /**
   * Rule-based disease detection
   */
  ruleBasedDiseaseDetection(symptoms) {
    const diseases = {
      'yellow_leaves': {
        name: 'Yellow Leaf Disease',
        causes: ['Nitrogen deficiency', 'Overwatering', 'Poor drainage'],
        treatment: ['Apply nitrogen-rich fertilizer', 'Improve drainage', 'Reduce watering'],
        severity: 'medium'
      },
      'brown_spots': {
        name: 'Leaf Spot Disease',
        causes: ['Fungal infection', 'Bacterial blight'],
        treatment: ['Apply fungicide', 'Remove infected leaves', 'Improve air circulation'],
        severity: 'high'
      },
      'wilting': {
        name: 'Wilt Disease',
        causes: ['Fusarium infection', 'Root rot', 'Drought stress'],
        treatment: ['Apply fungicide', 'Improve soil drainage', 'Maintain consistent watering'],
        severity: 'high'
      },
      'stunted_growth': {
        name: 'Stunted Growth',
        causes: ['Nutrient deficiency', 'Soil compaction', 'Pest damage'],
        treatment: ['Soil testing and fertilization', 'Aerate soil', 'Pest control'],
        severity: 'medium'
      }
    };

    // Match symptoms to diseases
    const matches = [];
    for (const [key, disease] of Object.entries(diseases)) {
      if (symptoms.includes(key)) {
        matches.push(disease);
      }
    }

    if (matches.length === 0) {
      return {
        detected: false,
        message: 'No specific disease detected. Consult an expert for diagnosis.',
        confidence: 0
      };
    }

    // Return highest severity match
    const severityOrder = { high: 3, medium: 2, low: 1 };
    const bestMatch = matches.sort((a, b) => 
      severityOrder[b.severity] - severityOrder[a.severity]
    )[0];

    return {
      detected: true,
      disease: bestMatch,
      confidence: 0.7,
      alternativeDiseases: matches.slice(1),
      method: 'rule-based'
    };
  },

  /**
   * Get smart recommendations
   */
  async getRecommendations(context) {
    const { crop, weather, soil, season, userHistory = [] } = context;
    
    const recommendations = [];

    // Yield prediction
    const yieldPrediction = await this.predictYield(crop, weather, soil, 1);
    recommendations.push({
      type: 'yield',
      title: 'Expected Yield',
      content: `${yieldPrediction.yield} tons/hectare (${Math.round(yieldPrediction.confidence * 100)}% confidence)`,
      confidence: yieldPrediction.confidence
    });

    // Weather-based recommendations
    if (weather.temp > 35) {
      recommendations.push({
        type: 'warning',
        title: 'Heat Alert',
        content: 'High temperatures detected. Increase irrigation frequency and consider shade nets.',
        confidence: 0.9
      });
    }

    if (weather.rain > 20) {
      recommendations.push({
        type: 'warning',
        title: 'Heavy Rain Alert',
        content: 'Heavy rainfall expected. Ensure proper drainage and consider fungicide application.',
        confidence: 0.85
      });
    }

    // Soil-based recommendations
    if (soil.ph < 6) {
      recommendations.push({
        type: 'action',
        title: 'Soil pH Low',
        content: 'Soil is acidic. Apply lime (200-300 kg/hectare) to raise pH.',
        confidence: 0.8
      });
    }

    if (soil.ph > 8) {
      recommendations.push({
        type: 'action',
        title: 'Soil pH High',
        content: 'Soil is alkaline. Apply sulfur or gypsum to lower pH.',
        confidence: 0.8
      });
    }

    return recommendations;
  },

  // Helper functions
  encodeCropType(crop) {
    const crops = ['wheat', 'rice', 'cotton', 'sugarcane', 'soybean', 'maize', 'potato', 'onion', 'mustard'];
    return crops.indexOf(crop.toLowerCase()) + 1;
  },

  decodeCropType(encoded) {
    const crops = ['wheat', 'rice', 'cotton', 'sugarcane', 'soybean', 'maize', 'potato', 'onion', 'mustard'];
    return crops[encoded - 1] || 'wheat';
  },

  encodeSoilType(soil) {
    const soils = ['Alluvial', 'Black', 'Red', 'Laterite'];
    return soils.indexOf(soil) + 1;
  },

  getCurrentSeason() {
    const month = new Date().getMonth();
    if (month >= 5 && month <= 9) return 'kharif';
    if (month >= 10 || month <= 3) return 'rabi';
    return 'summer';
  },

  // Placeholder for ML prediction
  async mlPredictYield(features) {
    // Would use TensorFlow.js model
    return this.ruleBasedYieldPrediction(features);
  },

  async mlDetectDisease(imageData) {
    // Would use TensorFlow.js image classification
    return { detected: false, message: 'ML model not loaded' };
  }
};

// Initialize when DOM is ready
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => AIService.init());
  } else {
    AIService.init();
  }
}

window.AIService = AIService;
