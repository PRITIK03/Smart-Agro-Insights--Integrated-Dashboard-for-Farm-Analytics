/**
 * Crop Service
 * Handles crop data, risk assessment, and recommendations
 */

const CropService = {
  // Risk assessment weights
  weights: {
    weather: 0.4,
    soil: 0.3,
    season: 0.3
  },

  /**
   * Get crop risks for a district
   */
  async getCropRisks(districtId) {
    try {
      const data = await ApiClient.get(`/api/crop-risks?districtId=${districtId}`, {
        cacheTTL: 24 * 60 * 60 * 1000 // 24 hours
      });
      return data;
    } catch (error) {
      console.error('Failed to fetch crop risks:', error);
      return this.getFallbackRisks(districtId);
    }
  },

  /**
   * Get crop calendar for district and month
   */
  async getCropCalendar(districtId, month = null) {
    try {
      const monthParam = month !== null ? `&month=${month}` : '';
      const data = await ApiClient.get(`/api/crop-calendar?districtId=${districtId}${monthParam}`, {
        cacheTTL: 7 * 24 * 60 * 60 * 1000 // 7 days
      });
      return data;
    } catch (error) {
      console.error('Failed to fetch crop calendar:', error);
      return this.getFallbackCalendar(month);
    }
  },

  /**
   * Calculate crop score based on multiple factors
   */
  calculateCropScore(crop, weather, soil, season) {
    let score = 0;
    let maxScore = 0;

    // Weather compatibility
    if (weather) {
      const weatherScore = this.calculateWeatherCompatibility(crop, weather);
      score += weatherScore * this.weights.weather;
      maxScore += this.weights.weather;
    }

    // Soil compatibility
    if (soil) {
      const soilScore = this.calculateSoilCompatibility(crop, soil);
      score += soilScore * this.weights.soil;
      maxScore += this.weights.soil;
    }

    // Season compatibility
    if (season) {
      const seasonScore = this.calculateSeasonCompatibility(crop, season);
      score += seasonScore * this.weights.season;
      maxScore += this.weights.season;
    }

    return {
      score: maxScore > 0 ? (score / maxScore) * 100 : 50,
      percentage: Math.round((score / maxScore) * 100) || 50
    };
  },

  /**
   * Calculate weather compatibility (0-1)
   */
  calculateWeatherCompatibility(crop, weather) {
    const tempRange = crop.optimalTemp || { min: 20, max: 35 };
    const rainRange = crop.optimalRain || { min: 50, max: 200 };

    const tempScore = this.rangeScore(weather.temp, tempRange.min, tempRange.max);
    const rainScore = this.rangeScore(weather.rain * 30, rainRange.min, rainRange.max); // Monthly estimate

    return (tempScore + rainScore) / 2;
  },

  /**
   * Calculate soil compatibility (0-1)
   */
  calculateSoilCompatibility(crop, soil) {
    const phRange = crop.optimalPH || { min: 6.0, max: 7.5 };
    const soilTypes = crop.suitableSoils || ['Alluvial', 'Black'];

    const phScore = this.rangeScore(soil.ph, phRange.min, phRange.max);
    const typeScore = soilTypes.includes(soil.type) ? 1 : 0.5;

    return (phScore + typeScore) / 2;
  },

  /**
   * Calculate season compatibility (0-1)
   */
  calculateSeasonCompatibility(crop, season) {
    const optimalSeasons = crop.seasons || ['kharif', 'rabi'];
    return optimalSeasons.includes(season) ? 1 : 0.3;
  },

  /**
   * Helper: Score based on range (0-1)
   */
  rangeScore(value, min, max) {
    if (value >= min && value <= max) return 1;
    const center = (min + max) / 2;
    const range = max - min;
    const distance = Math.abs(value - center);
    return Math.max(0, 1 - (distance / range));
  },

  /**
   * Get AI-powered crop recommendation
   */
  getRecommendation(crop, score, weather, soil) {
    const recommendations = [];

    if (score.percentage < 40) {
      recommendations.push(`Consider alternative crops - ${crop.name} may struggle in current conditions`);
    } else if (score.percentage < 60) {
      recommendations.push(`${crop.name} can be grown with additional care and monitoring`);
    } else if (score.percentage < 80) {
      recommendations.push(`${crop.name} is suitable - follow standard practices`);
    } else {
      recommendations.push(`${crop.name} is highly suitable - expect good yields`);
    }

    // Weather-specific advice
    if (weather.temp > 35) {
      recommendations.push('Increase irrigation frequency due to high temperatures');
    }
    if (weather.rain > 15) {
      recommendations.push('Ensure proper drainage to prevent waterlogging');
    }

    // Soil-specific advice
    if (soil.ph < 6) {
      recommendations.push('Consider lime application to raise soil pH');
    }
    if (soil.ph > 8) {
      recommendations.push('Consider sulfur application to lower soil pH');
    }

    return recommendations;
  },

  /**
   * Fallback crop risks
   */
  getFallbackRisks(districtId) {
    return [
      { crop: 'Wheat', risk: 'low', suggestion: 'Good conditions for wheat' },
      { crop: 'Rice', risk: 'medium', suggestion: 'Monitor water levels' },
      { crop: 'Cotton', risk: 'medium', suggestion: 'Watch for pests' }
    ];
  },

  /**
   * Fallback crop calendar
   */
  getFallbackCalendar(month) {
    const seasonalCrops = {
      0: [{ name: 'Wheat', risk: 'low' }, { name: 'Mustard', risk: 'medium' }],
      1: [{ name: 'Wheat', risk: 'low' }, { name: 'Potato', risk: 'low' }],
      2: [{ name: 'Wheat', risk: 'low' }, { name: 'Onion', risk: 'low' }],
      3: [{ name: 'Rice', risk: 'medium' }, { name: 'Maize', risk: 'low' }],
      4: [{ name: 'Rice', risk: 'medium' }, { name: 'Sugarcane', risk: 'low' }],
      5: [{ name: 'Rice', risk: 'high' }, { name: 'Cotton', risk: 'high' }],
      6: [{ name: 'Rice', risk: 'high' }, { name: 'Cotton', risk: 'high' }],
      7: [{ name: 'Rice', risk: 'high' }, { name: 'Soybean', risk: 'high' }],
      8: [{ name: 'Rice', risk: 'medium' }, { name: 'Soybean', risk: 'medium' }],
      9: [{ name: 'Wheat', risk: 'low' }, { name: 'Mustard', risk: 'low' }],
      10: [{ name: 'Wheat', risk: 'low' }, { name: 'Potato', risk: 'low' }],
      11: [{ name: 'Wheat', risk: 'low' }, { name: 'Mustard', risk: 'low' }]
    };

    if (month !== undefined && month !== null) {
      return seasonalCrops[month] || [];
    }
    return seasonalCrops;
  }
};

window.CropService = CropService;
