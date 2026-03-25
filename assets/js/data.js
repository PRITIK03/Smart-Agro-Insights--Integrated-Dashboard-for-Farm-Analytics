// Comprehensive agricultural data for districts, coordinates, and crop risks
// Extended dataset for better farmer experience

// Enhanced sample data for dashboard and analytics
window.sampleData = {
    weather: {
        labels: ['Today', 'Tomorrow', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
        temperature: [32, 34, 33, 35, 36, 34, 33],
        humidity: [65, 60, 62, 58, 55, 60, 62],
        rainfall: [0, 2, 5, 0, 0, 1, 3]
    },
    prices: {
        labels: ['Wheat', 'Rice', 'Maize', 'Soybean', 'Cotton'],
        current: [2200, 1850, 1700, 3800, 6500],
        previous: [2100, 1800, 1750, 3700, 6400],
        change: [4.76, 2.78, -2.86, 2.70, 1.56]
    },
    yield: {
        labels: ['Wheat', 'Rice', 'Maize', 'Soybean', 'Cotton'],
        current: [45, 38, 42, 28, 12],
        previous: [42, 36, 40, 26, 11],
        change: [7.14, 5.56, 5.00, 7.69, 9.09]
    },
    soil: {
        labels: ['pH Level', 'Nitrogen', 'Phosphorus', 'Potassium', 'Organic Matter'],
        values: [6.8, 280, 45, 320, 2.4],
        optimal: [6.5, 250, 40, 300, 2.5],
        status: ['Optimal', 'High', 'Optimal', 'High', 'Optimal']
    },
    financial: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        revenue: [125000, 145000, 132000, 155000, 148000, 160000],
        expenses: [95000, 88000, 91000, 92000, 95000, 98000],
        profit: [30000, 57000, 41000, 63000, 53000, 62000]
    },
    market: {
        labels: ['Wheat', 'Rice', 'Maize', 'Soybean', 'Cotton', 'Sugarcane'],
        marketShare: [25, 30, 15, 12, 10, 8],
        production: [120000, 150000, 75000, 60000, 50000, 40000]
    },
    productivity: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        wheat: [2.1, 2.3, 2.8, 3.2, 3.5, 3.8, 3.6, 3.4, 3.1, 2.9, 2.6, 2.2],
        rice: [1.8, 2.0, 2.5, 3.0, 3.3, 3.6, 3.4, 3.2, 2.8, 2.5, 2.2, 1.9],
        maize: [1.5, 1.7, 2.2, 2.8, 3.1, 3.4, 3.2, 3.0, 2.6, 2.3, 2.0, 1.6]
    },
    soilHealth: {
        labels: ['Optimal', 'Good', 'Fair', 'Poor', 'Critical'],
        data: [35, 28, 20, 12, 5],
        colors: ['#4CAF50', '#8BC34A', '#FFC107', '#FF9800', '#F44336']
    },
    regional: {
        labels: ['North Zone', 'South Zone', 'East Zone', 'West Zone', 'Central Zone'],
        yield: [85, 78, 82, 75, 80],
        quality: [90, 85, 88, 82, 86],
        price: [75, 80, 78, 85, 82]
    },
    risk: {
        labels: ['Weather', 'Pests', 'Disease', 'Market', 'Price', 'Quality'],
        data: [15, 25, 20, 10, 20, 10],
        colors: ['#4CAF50', '#FFC107', '#FF5722', '#2196F3', '#9C27B0', '#00BCD4']
    },
    weatherPatterns: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        temperature: [18, 22, 28, 35, 40, 38, 32, 30, 28, 25, 20, 16],
        rainfall: [5, 8, 12, 25, 45, 120, 180, 160, 100, 30, 8, 3],
        humidity: [45, 40, 35, 30, 25, 60, 80, 75, 65, 50, 55, 50]
    },
    alerts: [
        { type: 'warning', message: 'Low soil moisture detected in Field A', time: '2 hours ago' },
        { type: 'danger', message: 'Pest alert: Armyworm detected in nearby fields', time: '5 hours ago' },
        { type: 'info', message: 'Market price for wheat increased by 5%', time: '1 day ago' },
        { type: 'success', message: 'Irrigation system activated in Field B', time: '1 day ago' }
    ]
};

window.DISTRICTS = [
  // Maharashtra districts
  { id: "pune", name: "Pune", lat: 18.5204, lon: 73.8567, state: "Maharashtra" },
  { id: "nashik", name: "Nashik", lat: 19.9975, lon: 73.7898, state: "Maharashtra" },
  { id: "nagpur", name: "Nagpur", lat: 21.1458, lon: 79.0882, state: "Maharashtra" },
  { id: "solapur", name: "Solapur", lat: 17.6599, lon: 75.9064, state: "Maharashtra" },
  { id: "kolhapur", name: "Kolhapur", lat: 16.7050, lon: 74.2433, state: "Maharashtra" },
  { id: "aurangabad", name: "Aurangabad", lat: 19.8762, lon: 75.3433, state: "Maharashtra" },
  { id: "amravati", name: "Amravati", lat: 20.9374, lon: 77.7796, state: "Maharashtra" },
  { id: "jalgaon", name: "Jalgaon", lat: 21.0077, lon: 75.5626, state: "Maharashtra" },
  { id: "latur", name: "Latur", lat: 18.4088, lon: 76.5604, state: "Maharashtra" },
  { id: "sangli", name: "Sangli", lat: 16.8524, lon: 74.5815, state: "Maharashtra" },
  
  // Other major agricultural states
  { id: "karnal", name: "Karnal", lat: 29.6857, lon: 76.9905, state: "Haryana" },
  { id: "ludhiana", name: "Ludhiana", lat: 30.9010, lon: 75.8573, state: "Punjab" },
  { id: "bathinda", name: "Bathinda", lat: 30.2110, lon: 74.9455, state: "Punjab" },
  { id: "indore", name: "Indore", lat: 22.7196, lon: 75.8577, state: "Madhya Pradesh" },
  { id: "bhopal", name: "Bhopal", lat: 23.2599, lon: 77.4126, state: "Madhya Pradesh" },
  { id: "jabalpur", name: "Jabalpur", lat: 23.1815, lon: 79.9864, state: "Madhya Pradesh" },
  { id: "raipur", name: "Raipur", lat: 21.2514, lon: 81.6296, state: "Chhattisgarh" },
  { id: "bhubaneswar", name: "Bhubaneswar", lat: 20.2961, lon: 85.8245, state: "Odisha" },
  { id: "cuttack", name: "Cuttack", lat: 20.4625, lon: 85.8820, state: "Odisha" },
  { id: "ranchi", name: "Ranchi", lat: 23.3441, lon: 85.3096, state: "Jharkhand" }
];

// Comprehensive crop risk data with categories and localized suggestions
window.CROP_RISKS = {
  pune: [
    { crop: "Soybean", risk: "medium", suggestion: "पाणी व्यवस्थापन करा; उशिरा पेरणी टाळा.", category: "pulses" },
    { crop: "Sugarcane", risk: "low", suggestion: "साधारण शिफारसीप्रमाणे खत व सिंचन.", category: "cereals" },
    { crop: "Rice", risk: "high", suggestion: "जड पावसाचा धोका; निचरा सुनिश्चित करा.", category: "cereals" },
    { crop: "Tomato", risk: "medium", suggestion: "बुरशीजन्य रोगांवर लक्ष ठेवा.", category: "vegetables" },
    { crop: "Mango", risk: "low", suggestion: "हवामान अनुकूल; नियमित खत व्यवस्था.", category: "fruits" }
  ],
  nashik: [
    { crop: "Grapes", risk: "medium", suggestion: "बुरशीजन्य रोगांवर लक्ष ठेवा.", category: "fruits" },
    { crop: "Onion", risk: "low", suggestion: "किड व रोगाचे निरीक्षण चालू ठेवा.", category: "vegetables" },
    { crop: "Wheat", risk: "low", suggestion: "सध्याची परिस्थिती अनुकूल.", category: "cereals" },
    { crop: "Cotton", risk: "high", suggestion: "उष्णतेची लाट; सिंचन वाढवा.", category: "cereals" },
    { crop: "Pomegranate", risk: "low", suggestion: "हवामान अनुकूल; नियमित खत व्यवस्था.", category: "fruits" }
  ],
  nagpur: [
    { crop: "Cotton", risk: "high", suggestion: "उष्णतेची लाट; सिंचन वाढवा आणि मल्च वापरा.", category: "cereals" },
    { crop: "Tur", risk: "medium", suggestion: "मध्यम धोका; तण नियंत्रण करा.", category: "pulses" },
    { crop: "Chili", risk: "medium", suggestion: "तापमान बदलामुळे फुलगळ होऊ शकते.", category: "vegetables" },
    { crop: "Orange", risk: "low", suggestion: "हवामान अनुकूल; नियमित खत व्यवस्था.", category: "fruits" },
    { crop: "Soybean", risk: "high", suggestion: "अतिवृष्टीचा धोका; वेल्ड्रेन शेत.", category: "pulses" }
  ],
  solapur: [
    { crop: "Jowar", risk: "low", suggestion: "कमी पावसातही अनुकूल.", category: "cereals" },
    { crop: "Sugarcane", risk: "medium", suggestion: "पाण्याचे नियोजन आणि कीडनियंत्रण.", category: "cereals" },
    { crop: "Groundnut", risk: "high", suggestion: "उशिरा पावसामुळे अंकुरण धोक्यात.", category: "pulses" },
    { crop: "Sunflower", risk: "medium", suggestion: "मध्यम धोका; तण नियंत्रण करा.", category: "cereals" },
    { crop: "Brinjal", risk: "low", suggestion: "हवामान अनुकूल; नियमित खत व्यवस्था.", category: "vegetables" }
  ],
  kolhapur: [
    { crop: "Rice", risk: "medium", suggestion: "मध्यम पाऊस अपेक्षित; निचरा सांभाळा.", category: "cereals" },
    { crop: "Banana", risk: "low", suggestion: "हवामान अनुकूल; नियमित खत व्यवस्था.", category: "fruits" },
    { crop: "Soybean", risk: "high", suggestion: "अतिवृष्टीचा धोका; वेल्ड्रेन शेत.", category: "pulses" },
    { crop: "Coconut", risk: "low", suggestion: "हवामान अनुकूल; नियमित खत व्यवस्था.", category: "fruits" },
    { crop: "Turmeric", risk: "medium", suggestion: "मध्यम धोका; तण नियंत्रण करा.", category: "vegetables" }
  ],
  aurangabad: [
    { crop: "Cotton", risk: "high", suggestion: "उष्णतेची लाट; सिंचन वाढवा.", category: "cereals" },
    { crop: "Sugarcane", risk: "medium", suggestion: "पाण्याचे नियोजन आणि कीडनियंत्रण.", category: "cereals" },
    { crop: "Onion", risk: "low", suggestion: "हवामान अनुकूल; नियमित खत व्यवस्था.", category: "vegetables" },
    { crop: "Jowar", risk: "low", suggestion: "कमी पावसातही अनुकूल.", category: "cereals" },
    { crop: "Grapes", risk: "medium", suggestion: "बुरशीजन्य रोगांवर लक्ष ठेवा.", category: "fruits" }
  ],
  amravati: [
    { crop: "Cotton", risk: "high", suggestion: "उष्णतेची लाट; सिंचन वाढवा.", category: "cereals" },
    { crop: "Soybean", risk: "medium", suggestion: "मध्यम धोका; तण नियंत्रण करा.", category: "pulses" },
    { crop: "Tur", risk: "low", suggestion: "हवामान अनुकूल; नियमित खत व्यवस्था.", category: "pulses" },
    { crop: "Wheat", risk: "low", suggestion: "सध्याची परिस्थिती अनुकूल.", category: "cereals" },
    { crop: "Chili", risk: "medium", suggestion: "तापमान बदलामुळे फुलगळ होऊ शकते.", category: "vegetables" }
  ],
  jalgaon: [
    { crop: "Cotton", risk: "high", suggestion: "उष्णतेची लाट; सिंचन वाढवा.", category: "cereals" },
    { crop: "Sugarcane", risk: "medium", suggestion: "पाण्याचे नियोजन आणि कीडनियंत्रण.", category: "cereals" },
    { crop: "Banana", risk: "low", suggestion: "हवामान अनुकूल; नियमित खत व्यवस्था.", category: "fruits" },
    { crop: "Jowar", risk: "low", suggestion: "कमी पावसातही अनुकूल.", category: "cereals" },
    { crop: "Onion", risk: "medium", suggestion: "मध्यम धोका; तण नियंत्रण करा.", category: "vegetables" }
  ],
  latur: [
    { crop: "Sugarcane", risk: "medium", suggestion: "पाण्याचे नियोजन आणि कीडनियंत्रण.", category: "cereals" },
    { crop: "Jowar", risk: "low", suggestion: "कमी पावसातही अनुकूल.", category: "cereals" },
    { crop: "Bajra", risk: "low", suggestion: "हवामान अनुकूल; नियमित खत व्यवस्था.", category: "cereals" },
    { crop: "Groundnut", risk: "high", suggestion: "उशिरा पावसामुळे अंकुरण धोक्यात.", category: "pulses" },
    { crop: "Sunflower", risk: "medium", suggestion: "मध्यम धोका; तण नियंत्रण करा.", category: "cereals" }
  ],
  sangli: [
    { crop: "Grapes", risk: "low", suggestion: "हवामान अनुकूल; नियमित खत व्यवस्था.", category: "fruits" },
    { crop: "Sugarcane", risk: "medium", suggestion: "पाण्याचे नियोजन आणि कीडनियंत्रण.", category: "cereals" },
    { crop: "Pomegranate", risk: "low", suggestion: "हवामान अनुकूल; नियमित खत व्यवस्था.", category: "fruits" },
    { crop: "Tomato", risk: "medium", suggestion: "बुरशीजन्य रोगांवर लक्ष ठेवा.", category: "vegetables" },
    { crop: "Onion", risk: "low", suggestion: "हवामान अनुकूल; नियमित खत व्यवस्था.", category: "vegetables" }
  ],
  karnal: [
    { crop: "Rice", risk: "medium", suggestion: "मध्यम धोका; तण नियंत्रण करा.", category: "cereals" },
    { crop: "Wheat", risk: "low", suggestion: "हवामान अनुकूल; नियमित खत व्यवस्था.", category: "cereals" },
    { crop: "Sugarcane", risk: "low", suggestion: "हवामान अनुकूल; नियमित खत व्यवस्था.", category: "cereals" },
    { crop: "Mustard", risk: "medium", suggestion: "मध्यम धोका; तण नियंत्रण करा.", category: "cereals" },
    { crop: "Potato", risk: "low", suggestion: "हवामान अनुकूल; नियमित खत व्यवस्था.", category: "vegetables" }
  ],
  ludhiana: [
    { crop: "Wheat", risk: "low", suggestion: "हवामान अनुकूल; नियमित खत व्यवस्था.", category: "cereals" },
    { crop: "Rice", risk: "medium", suggestion: "मध्यम धोका; तण नियंत्रण करा.", category: "cereals" },
    { crop: "Maize", risk: "low", suggestion: "हवामान अनुकूल; नियमित खत व्यवस्था.", category: "cereals" },
    { crop: "Sugarcane", risk: "low", suggestion: "हवामान अनुकूल; नियमित खत व्यवस्था.", category: "cereals" },
    { crop: "Potato", risk: "medium", suggestion: "मध्यम धोका; तण नियंत्रण करा.", category: "vegetables" }
  ],
  bathinda: [
    { crop: "Cotton", risk: "high", suggestion: "उष्णतेची लाट; सिंचन वाढवा.", category: "cereals" },
    { crop: "Wheat", risk: "low", suggestion: "हवामान अनुकूल; नियमित खत व्यवस्था.", category: "cereals" },
    { crop: "Rice", risk: "medium", suggestion: "मध्यम धोका; तण नियंत्रण करा.", category: "cereals" },
    { crop: "Sugarcane", risk: "low", suggestion: "हवामान अनुकूल; नियमित खत व्यवस्था.", category: "cereals" },
    { crop: "Mustard", risk: "medium", suggestion: "मध्यम धोका; तण नियंत्रण करा.", category: "cereals" }
  ],
  indore: [
    { crop: "Soybean", risk: "medium", suggestion: "मध्यम धोका; तण नियंत्रण करा.", category: "pulses" },
    { crop: "Wheat", risk: "low", suggestion: "हवामान अनुकूल; नियमित खत व्यवस्था.", category: "cereals" },
    { crop: "Maize", risk: "low", suggestion: "हवामान अनुकूल; नियमित खत व्यवस्था.", category: "cereals" },
    { crop: "Cotton", risk: "high", suggestion: "उष्णतेची लाट; सिंचन वाढवा.", category: "cereals" },
    { crop: "Chili", risk: "medium", suggestion: "मध्यम धोका; तण नियंत्रण करा.", category: "vegetables" }
  ],
  bhopal: [
    { crop: "Soybean", risk: "medium", suggestion: "मध्यम धोका; तण नियंत्रण करा.", category: "pulses" },
    { crop: "Wheat", risk: "low", suggestion: "हवामान अनुकूल; नियमित खत व्यवस्था.", category: "cereals" },
    { crop: "Rice", risk: "medium", suggestion: "मध्यम धोका; तण नियंत्रण करा.", category: "cereals" },
    { crop: "Maize", risk: "low", suggestion: "हवामान अनुकूल; नियमित खत व्यवस्था.", category: "cereals" },
    { crop: "Tomato", risk: "medium", suggestion: "मध्यम धोका; तण नियंत्रण करा.", category: "vegetables" }
  ],
  jabalpur: [
    { crop: "Rice", risk: "medium", suggestion: "मध्यम धोका; तण नियंत्रण करा.", category: "cereals" },
    { crop: "Wheat", risk: "low", suggestion: "हवामान अनुकूल; नियमित खत व्यवस्था.", category: "cereals" },
    { crop: "Soybean", risk: "medium", suggestion: "मध्यम धोका; तण नियंत्रण करा.", category: "pulses" },
    { crop: "Maize", risk: "low", suggestion: "हवामान अनुकूल; नियमित खत व्यवस्था.", category: "cereals" },
    { crop: "Chili", risk: "medium", suggestion: "मध्यम धोका; तण नियंत्रण करा.", category: "vegetables" }
  ],
  raipur: [
    { crop: "Rice", risk: "high", suggestion: "जड पावसाचा धोका; निचरा सुनिश्चित करा.", category: "cereals" },
    { crop: "Soybean", risk: "medium", suggestion: "मध्यम धोका; तण नियंत्रण करा.", category: "pulses" },
    { crop: "Maize", risk: "low", suggestion: "हवामान अनुकूल; नियमित खत व्यवस्था.", category: "cereals" },
    { crop: "Cotton", risk: "high", suggestion: "उष्णतेची लाट; सिंचन वाढवा.", category: "cereals" },
    { crop: "Tomato", risk: "medium", suggestion: "मध्यम धोका; तण नियंत्रण करा.", category: "vegetables" }
  ],
  bhubaneswar: [
    { crop: "Rice", risk: "high", suggestion: "जड पावसाचा धोका; निचरा सुनिश्चित करा.", category: "cereals" },
    { crop: "Maize", risk: "medium", suggestion: "मध्यम धोका; तण नियंत्रण करा.", category: "cereals" },
    { crop: "Sugarcane", risk: "low", suggestion: "हवामान अनुकूल; नियमित खत व्यवस्था.", category: "cereals" },
    { crop: "Turmeric", risk: "medium", suggestion: "मध्यम धोका; तण नियंत्रण करा.", category: "vegetables" },
    { crop: "Mango", risk: "low", suggestion: "हवामान अनुकूल; नियमित खत व्यवस्था.", category: "fruits" }
  ],
  cuttack: [
    { crop: "Rice", risk: "high", suggestion: "जड पावसाचा धोका; निचरा सुनिश्चित करा.", category: "cereals" },
    { crop: "Maize", risk: "medium", suggestion: "मध्यम धोका; तण नियंत्रण करा.", category: "cereals" },
    { crop: "Sugarcane", risk: "low", suggestion: "हवामान अनुकूल; नियमित खत व्यवस्था.", category: "cereals" },
    { crop: "Turmeric", risk: "medium", suggestion: "मध्यम धोका; तण नियंत्रण करा.", category: "vegetables" },
    { crop: "Coconut", risk: "low", suggestion: "हवामान अनुकूल; नियमित खत व्यवस्था.", category: "fruits" }
  ],
  ranchi: [
    { crop: "Rice", risk: "medium", suggestion: "मध्यम धोका; तण नियंत्रण करा.", category: "cereals" },
    { crop: "Maize", risk: "low", suggestion: "हवामान अनुकूल; नियमित खत व्यवस्था.", category: "cereals" },
    { crop: "Wheat", risk: "low", suggestion: "हवामान अनुकूल; नियमित खत व्यवस्था.", category: "cereals" },
    { crop: "Soybean", risk: "medium", suggestion: "मध्यम धोका; तण नियंत्रण करा.", category: "pulses" },
    { crop: "Potato", risk: "low", suggestion: "हवामान अनुकूल; नियमित खत व्यवस्था.", category: "vegetables" }
  ]
};

window.RISK_DISPLAY = {
  low: { label: "Safe", badgeClass: "risk-low", color: "#2e7d32" },
  medium: { label: "Caution", badgeClass: "risk-medium", color: "#ef6c00" },
  high: { label: "Avoid", badgeClass: "risk-high", color: "#c62828" }
};

// Simple dictionary for voice messages by language
window.VOICE_LINES = {
  "mr-IN": {
    summaryIntro: "जिल्ह्यासाठी पिक जोखीम सारांश:",
    crop: "पीक",
    risk: "जोखीम",
    suggestion: "सूचना"
  },
  "hi-IN": {
    summaryIntro: "जिले के लिए फसल जोखिम सारांश:",
    crop: "फसल",
    risk: "जोखिम",
    suggestion: "सलाह"
  },
  "en-IN": {
    summaryIntro: "Crop risk summary for district:",
    crop: "Crop",
    risk: "Risk",
    suggestion: "Suggestion"
  }
};


