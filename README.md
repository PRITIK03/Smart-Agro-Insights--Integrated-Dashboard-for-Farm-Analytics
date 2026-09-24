# Smart Agro Insights 🌾

**AI-assisted agricultural analytics for Indian farmers**

Smart Agro Insights is a multilingual, mobile-friendly Progressive Web App (PWA) that brings crop risk assessment, weather insights, soil information, crop calendars, market/MSP context, and farming guidance into one dashboard. The project combines a static JavaScript frontend with an optional Node.js/Express API server.

> **Project status:** This is a demonstration/prototype application. Some weather, market, government, and AI outputs are mocked or depend on external services. Validate recommendations with local agricultural experts before making farming decisions.

[![Version](https://img.shields.io/badge/version-2.0.0-blue)](CHANGELOG.md)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![PWA](https://img.shields.io/badge/PWA-ready-purple)](manifest.json)

## Highlights

- **Crop risk assessment** by district, crop, and season
- **AI-assisted yield and disease guidance** using TensorFlow.js and rule-based knowledge
- **Weather dashboard** with forecast/alert integrations and a seven-day analytics view
- **Soil information and crop calendar** for supported districts
- **Market and MSP comparison** plus links to farmer schemes
- **English, Hindi, and Marathi** interface and voice output using the Web Speech API
- **Interactive charts and maps** using Chart.js and Leaflet
- **Installable/offline-capable PWA** through `manifest.json` and `sw.js`
- Responsive layout designed for mobile and field use

## Screens and entry points

| Page | Purpose |
| --- | --- |
| `index.html` | Landing page and risk assessment entry point |
| `dashboard.html` | Main farmer dashboard |
| `analytics.html` | Detailed charts and trends |
| `about.html` | Project information |
| `help.html` | User help and guidance |

## Run locally

The frontend is a static site, so it must be served over HTTP for service workers and browser APIs to work correctly.

```bash
git clone https://github.com/PRITIK03/Smart-Agro-Insights--Integrated-Dashboard-for-Farm-Analytics.git
cd Smart-Agro-Insights--Integrated-Dashboard-for-Farm-Analytics

# Choose one:
npx http-server -p 8080
# or: python3 -m http.server 8080
```

Open <http://localhost:8080>. The test runner is available at <http://localhost:8080/tests/test-runner.html>.

You can also use VS Code Live Server on `index.html`.

## Optional API server

The API server is located in `server/` and runs on port `5000` by default.

```bash
cd server
npm install
npm start                 # production-style start
npm run dev               # auto-reload with nodemon
```

Health check: <http://localhost:5000/api/health>

Available routes include:

- `GET /api/health`
- `GET /api/districts`
- `GET /api/crop-risks?districtId=<id>`
- `GET /api/crop-calendar?districtId=<id>&month=<0-11>`
- `GET /api/soil-info?districtId=<id>`
- `GET /api/weather?lat=<lat>&lon=<lon>`
- `GET /api/weather-history?lat=<lat>&lon=<lon>`

The weather endpoint currently uses the API configuration in `server/index.js`; replace demo credentials with an environment variable before deployment. Never commit production API keys.

## Project structure

```text
├── index.html, dashboard.html, analytics.html  # Frontend pages
├── assets/
│   ├── js/                                     # App, dashboard, data, i18n, services
│   ├── css/                                    # Styles
│   └── images/                                 # Images and icons
├── server/                                     # Optional Express API
├── tests/                                      # Browser-based test suite
├── manifest.json                               # PWA metadata
├── sw.js                                       # Service worker
├── API_DOCUMENTATION.md                        # API reference
├── DEVELOPER_GUIDE.md                          # Extension and contribution guide
├── CHANGELOG.md                                # Release history
└── FEATURE_ROADMAP.md                          # Planned improvements
```

## Technology

- HTML5, CSS3, and vanilla JavaScript
- Node.js, Express, Axios, and CORS for the optional backend
- Bootstrap, Chart.js, Leaflet, TensorFlow.js, AOS, Animate.css, and html2pdf.js
- Browser Fetch, LocalStorage, Service Worker, and Web Speech APIs

## Testing

1. Start the frontend server.
2. Open `tests/test-runner.html`.
3. Select **Run All Tests**.

For service-level tests in the browser console:

```javascript
window.ApiClientTests.runAll();
window.AIServiceTests.runAll();
```

## Deployment

Because the frontend is static, it can be deployed to GitHub Pages, Netlify, Vercel, or any static web host. Configure the optional Express server separately if API routes are required. See [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md) and [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for implementation details.

## Contributing

1. Fork the repository.
2. Create a branch: `git checkout -b feature/my-feature`.
3. Make and test your changes.
4. Commit and push your branch.
5. Open a pull request with a concise description and screenshots when relevant.

## Documentation and support

- [API documentation](API_DOCUMENTATION.md)
- [Developer guide](DEVELOPER_GUIDE.md)
- [Feature roadmap](FEATURE_ROADMAP.md)
- [Changelog](CHANGELOG.md)
- [Report an issue](https://github.com/PRITIK03/Smart-Agro-Insights--Integrated-Dashboard-for-Farm-Analytics/issues)

## License

This project is licensed under the [MIT License](LICENSE).

**Made with ❤️ for Indian farmers.**
