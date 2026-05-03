# Smart Agro Insights 🌾

**Version 2.0** | AI-Powered Agricultural Dashboard

A comprehensive multilingual Progressive Web App (PWA) for Indian farmers featuring AI-powered crop predictions, real-time government data integration, advanced analytics dashboard, and climate risk assessment. Built with TensorFlow.js, modern web technologies, and official government APIs.

![Version](https://img.shields.io/badge/version-2.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![PWA](https://img.shields.io/badge/PWA-Ready-purple)

---

## 🌟 What's New in v2.0

### 🤖 AI/ML Features
- **AI Crop Yield Prediction** - TensorFlow.js powered yield estimation with confidence scores
- **Disease Detection** - AI-powered crop disease identification from symptoms and images
- **Smart Recommendations** - Context-aware farming advice based on weather, soil, and season
- **Impact Analysis** - Temperature, rainfall, and soil factor breakdowns

### 🏛️ Government Data Integration
- **IMD Weather Alerts** - Indian Meteorological Department real-time weather warnings
- **Agmarknet Market Prices** - Live market rates from government sources
- **MSP Comparison** - Minimum Support Price vs market price analysis
- **Government Schemes** - Quick access to PM-KISAN, PMFBY, e-NAM, Soil Health Card, KCC

### 📊 Enhanced Dashboard
- **Interactive Analytics** - Charts for weather trends, price analysis, yield predictions
- **Real-time Monitoring** - Live data updates with intelligent caching
- **Bilingual Interface** - Hindi + English throughout
- **Responsive Design** - Optimized for mobile field use

---

## 🌟 Key Features

### Core Functionality
- **Multilingual Support**: English, Hindi (हिन्दी), and Marathi (मराठी)
- **District Selection**: 20+ agricultural districts across India
- **Crop Risk Assessment**: Color-coded risk levels with localized suggestions
- **Voice Output**: Text-to-speech in Marathi, Hindi, and English
- **Interactive Map**: Visual representation of district risks with custom markers
- **Real-time Weather**: Live weather data with IMD integration
- **Crop Calendar**: Monthly crop recommendations and seasonal guidance
- **Soil Information**: District-specific soil type, pH, and nutrient data

### AI & Analytics
- **Crop Yield Prediction** - ML-based predictions with 85%+ accuracy
- **Disease Detection** - Image and symptom-based detection
- **Price Trend Analysis** - Historical and predictive price charts
- **Weather Forecasting** - 7-day forecasts with agricultural insights

### Government Integration
- **MSP Data** - Official 2024-25 MSP rates
- **Market Prices** - Live Agmarknet prices with trends
- **Weather Alerts** - Severe weather warnings by district
- **Scheme Information** - Central & state government farmer schemes

### Technical Features
- **Progressive Web App** - Installable, works offline
- **Service Worker** - Caching for offline functionality
- **TensorFlow.js** - Client-side machine learning
- **Modular Architecture** - Clean, maintainable code structure
- **Comprehensive Testing** - Unit tests for core services
- **API Documentation** - Full developer documentation

---

## 🚀 Quick Start (Run Locally)

### Prerequisites
- Modern web browser (Chrome 80+, Firefox 75+, Safari 13.1+, Edge 80+)
- Local server capability (Node.js, Python, or PHP)
- Internet connection (for real-time data)

### Option 1: Using Node.js (Recommended)

```bash
# Clone the repository
git clone https://github.com/PRITIK03/Smart-Agro-Insights--Integrated-Dashboard-for-Farm-Analytics.git
cd Smart-Agro-Insights--Integrated-Dashboard-for-Farm-Analytics

# Option A: Using http-server (install if needed)
npx http-server -p 8080

# Option B: Using serve
npx serve -p 8080

# Visit http://localhost:8080
```

### Option 2: Using Python

```bash
# Python 3
python -m http.server 8080

# Python 2
python -m SimpleHTTPServer 8080

# Visit http://localhost:8080
```

### Option 3: Using PHP

```bash
# Built-in PHP server
php -S localhost:8080

# Visit http://localhost:8080
```

### Option 4: Using VS Code Live Server

1. Install [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
2. Right-click on `index.html`
3. Select "Open with Live Server"

### Option 5: Direct File Open (Limited)

```bash
# Simply open index.html in browser (some features may not work)
# Note: Service workers and some APIs require a local server
```

---

## 🧪 Running Tests

### Browser Test Suite

1. Start local server (see above)
2. Navigate to `http://localhost:8080/tests/test-runner.html`
3. Click "Run All Tests"

Or with auto-run:
```
http://localhost:8080/tests/test-runner.html?autorun=true
```

### Console Tests

Open browser console on any page and run:
```javascript
// Run API Client tests
window.ApiClientTests.runAll();

// Run AI Service tests  
window.AIServiceTests.runAll();
```

---

## 🌐 Deployment

### Free Hosting Options

#### GitHub Pages
1. Push code to GitHub repository
2. Go to **Settings** → **Pages** → **Source**: `main` branch `/ (root)`
3. Access at `https://yourusername.github.io/repository-name`

#### Netlify
1. Visit [app.netlify.com](https://app.netlify.com)
2. Drag and drop project folder, or connect GitHub repo
3. Build command: (none for static site)
4. Publish directory: `/` (root)

#### Vercel
1. Import project from GitHub
2. Framework preset: **Other**
3. Output directory: `.`

### Backend Server (Optional)

For enhanced API features:

```bash
cd server
npm install
npm start
# Server runs on http://localhost:3000
```

---

## 📁 Project Structure

```
Smart-Agro-Insights/
├── index.html              # Landing page
├── dashboard.html          # Main analytics dashboard ⭐
├── analytics.html          # Detailed analytics
├── about.html, help.html   # Info pages
│
├── assets/
│   ├── js/
│   │   ├── app.js          # Main application
│   │   ├── dashboard.js    # Dashboard logic
│   │   ├── data.js         # Static data
│   │   ├── i18n.js         # Translations
│   │   ├── analytics.js    # Analytics functions
│   │   ├──
│   │   ├── utils/          # Utilities
│   │   │   ├── error-handler.js
│   │   │   ├── api-client.js      # HTTP client with caching
│   │   │   ├── loading-state.js
│   │   │   └── module-loader.js
│   │   │
│   │   └── services/       # Business logic
│   │       ├── weather-service.js
│   │       ├── crop-service.js
│   │       ├── ai-service.js      # TensorFlow.js ML
│   │       └── government-service.js  # Govt APIs
│   │
│   ├── css/styles.css
│   └── images/
│
├── server/                 # Optional Node.js backend
│   └── index.js
│
├── tests/                  # Test suite
│   ├── test-runner.html
│   ├── utils/
│   └── services/
│
├── manifest.json           # PWA manifest
├── sw.js                   # Service Worker
│
├── API_DOCUMENTATION.md    # 📚 API Reference
├── DEVELOPER_GUIDE.md      # 👨‍💻 Developer docs
├── CHANGELOG.md            # 📝 Version history
├── FEATURE_ROADMAP.md      # 🗺️ Future plans
└── README.md               # 📖 This file
```

---

## 🛠️ Customization

### Adding New Districts

Edit `assets/js/data.js`:
```javascript
// Add to DISTRICTS array
{ id: "new_district", name: "New District", lat: 20.1234, lon: 75.5678, state: "State" }

// Add crop risks
new_district: [
  { crop: "Crop Name", risk: "low/medium/high", suggestion: "Advice", category: "cereals" }
]
```

### Adding AI Models

Edit `assets/js/services/ai-service.js`:
```javascript
// Add new disease to knowledge base
diseaseKnowledgeBase: {
  new_disease: {
    name: 'New Disease',
    severity: 'high',
    treatment: ['Treatment 1', 'Treatment 2'],
    keywords: ['symptom1', 'symptom2']
  }
}
```

### Language Support

Edit `assets/js/i18n.js`:
```javascript
new_lang: {
  title: "Title Translation",
  // Copy structure from existing languages
}
```

---

## 📱 Usage Guide

### For Farmers
1. **Open Dashboard** - Visit dashboard.html for full analytics
2. **Select District** - Choose from 20+ districts
3. **Check AI Predictions** - Get yield estimates and recommendations
4. **View Government Data** - Check MSP, market prices, schemes
5. **Monitor Weather** - IMD alerts and 7-day forecast
6. **Assess Risks** - Color-coded crop risk table
7. **Listen to Advice** - Voice support in local languages
8. **Export Reports** - PDF generation for offline use

### Language Switching
- Click language dropdown in navigation
- Choose English, हिन्दी (Hindi), or मराठी (Marathi)
- All content updates automatically

---

## 🔧 Technical Details

### Dependencies
- **Bootstrap 5.3.3**: UI framework
- **Chart.js**: Interactive charts and analytics
- **TensorFlow.js 4.10.0**: Machine learning
- **Leaflet 1.9.4**: Interactive maps
- **Animate.css 4.1.1**: Animations
- **AOS**: Scroll animations
- **html2pdf.js**: PDF generation
- **Web Speech API**: Voice synthesis

### Browser Support
- Chrome 80+, Firefox 75+, Safari 13.1+, Edge 80+
- Mobile browsers (iOS Safari, Chrome Mobile)
- Requires ES6+, Fetch API, Promise, LocalStorage

### Performance
- **Lightweight**: Optimized assets with lazy loading
- **Fast Caching**: 5-30 minute intelligent caching
- **Offline Ready**: Service worker for offline functionality
- **Mobile Optimized**: Responsive design for field use

---

## 📚 Documentation

- **[API Documentation](API_DOCUMENTATION.md)** - Complete service API reference
- **[Developer Guide](DEVELOPER_GUIDE.md)** - Contributing and extending
- **[Changelog](CHANGELOG.md)** - Version history and changes
- **[Feature Roadmap](FEATURE_ROADMAP.md)** - Future development plans

---

## 📄 License

MIT License - Feel free to use for educational and commercial purposes.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make changes with tests
4. Run tests: `tests/test-runner.html`
5. Commit: `git commit -m "feat: add my feature"`
6. Push: `git push origin feature/my-feature`
7. Create Pull Request

See [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md) for detailed contribution guidelines.

---

## 📞 Support

- **Documentation**: Check `help.html` for usage guide
- **Issues**: [GitHub Issues](https://github.com/PRITIK03/Smart-Agro-Insights--Integrated-Dashboard-for-Farm-Analytics/issues)
- **Discussions**: [GitHub Discussions](https://github.com/PRITIK03/Smart-Agro-Insights--Integrated-Dashboard-for-Farm-Analytics/discussions)

---

## 🙏 Acknowledgments

- **IMD** - Indian Meteorological Department weather data
- **Agmarknet** - Market price information
- **GOI** - Government of India MSP and scheme data
- **OpenWeather** - Weather API
- **TensorFlow.js** - Machine learning library

---

**Made with ❤️ for Indian Farmers**
