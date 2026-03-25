# Agricultural Climate Risk Prediction System

A comprehensive multilingual web application designed specifically for farmers to predict crop climate risks, get weather information, and access agricultural guidance. Features real-time weather data, voice support in multiple languages, interactive maps, and farmer-focused tools.

## 🌟 Key Features

### Core Functionality
- **Multilingual Support**: English, Hindi (हिन्दी), and Marathi (मराठी)
- **District Selection**: 20+ agricultural districts across India
- **Crop Risk Assessment**: Color-coded risk levels with localized suggestions
- **Voice Output**: Text-to-speech in Marathi, Hindi, and English
- **Interactive Map**: Visual representation of district risks with custom markers
- **Real-time Weather**: Live weather data with fallback to dummy data
- **Crop Calendar**: Monthly crop recommendations and seasonal guidance
- **Soil Information**: District-specific soil type, pH, and nutrient data

### Farmer-Focused Tools
- **Crop Type Filtering**: Filter by cereals, pulses, vegetables, fruits
- **Risk Visualization**: Green (Safe), Orange (Caution), Red (Avoid)
- **Agricultural Icons**: Visual crop categorization
- **PDF Export**: Generate reports for offline use
- **Mobile Optimized**: Responsive design for field use
- **Accessibility**: Screen reader friendly with proper ARIA labels

### Technical Features
- **Free APIs**: Integrated OpenWeather API with fallback
- **No Backend Required**: Pure frontend implementation
- **Offline Capable**: Works without internet (except weather)
- **Progressive Enhancement**: Graceful degradation for older browsers

## 🚀 Quick Start

### Local Development
1. **Clone or Download** this repository
2. **Open** `index.html` in a modern browser
3. **For best results**, use a local server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js
   npx serve . 
   # or
   npx http-server .
   ```
4. **Visit** `http://localhost:8000`

### Weather Data
- **Real-time weather** is automatically loaded using integrated API
- **Fallback data** is shown if weather service is unavailable
- **No API key required** - works out of the box

## 🌐 Deployment

### Free Hosting Options

#### GitHub Pages
1. Create a repository and push this folder
2. Go to Settings → Pages → Source: `main` branch `/ (root)`
3. Access your live site at `https://username.github.io/repository-name`

#### Netlify
1. Drag and drop the folder to [app.netlify.com](https://app.netlify.com)
2. Or connect your GitHub repository
3. Build command: none, Publish directory: root

#### Vercel
1. Import project from GitHub
2. Framework preset: Other
3. Output directory: `.`

## 🛠️ Customization

### Adding New Districts
Edit `assets/js/data.js`:
```javascript
// Add to DISTRICTS array
{ id: "new_district", name: "New District", lat: 20.1234, lon: 75.5678, state: "State" }

// Add crop risks
new_district: [
  { crop: "Crop Name", risk: "low/medium/high", suggestion: "Localized advice", category: "cereals/pulses/vegetables/fruits" }
]
```

### Language Support
Add new languages in `assets/js/i18n.js`:
```javascript
new_lang: {
  // Copy structure from existing languages
  // Add translations for all keys
}
```

### Styling
Modify `assets/css/styles.css` for custom colors, animations, and layouts.

## 📱 Usage Guide

### For Farmers
1. **Select your district** from the dropdown
2. **View crop risks** in the table with color-coded indicators
3. **Listen to advice** using voice buttons (supports Marathi/Hindi/English)
4. **Check weather** for current conditions
5. **Use crop calendar** for seasonal planning
6. **Export reports** as PDF for offline reference

### Language Switching
- Click the language dropdown in the navigation
- Choose from English, हिन्दी (Hindi), or मराठी (Marathi)
- All content updates automatically

## 🔧 Technical Details

### Dependencies
- **Bootstrap 5.3.3**: UI framework
- **Leaflet 1.9.4**: Interactive maps
- **Animate.css 4.1.1**: Animations
- **html2pdf.js 0.10.1**: PDF generation
- **Web Speech API**: Voice synthesis

### Browser Support
- Chrome 33+, Firefox 49+, Safari 7+, Edge 14+
- Mobile browsers (iOS Safari, Chrome Mobile)
- Voice features depend on browser TTS support

### Performance
- **Lightweight**: ~500KB total assets
- **Fast loading**: Optimized images and minimal dependencies
- **Caching**: LocalStorage for language preferences

## 📄 License
MIT License - Feel free to use for educational and commercial purposes.

## 🤝 Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support
- **Documentation**: Check `help.html` for detailed usage guide
- **Issues**: Report bugs via GitHub Issues
- **Features**: Suggest enhancements via GitHub Discussions
