// Load districts data from frontend assets (for demo, require JSON or JS file)
const path = require('path');
const fs = require('fs');

// Helper to load DISTRICTS from assets/js/data.js
function getDistricts() {
  // This assumes data.js exports window.DISTRICTS = [...];
  // We'll read and parse the file for the array.
  const dataPath = path.join(__dirname, '../assets/js/data.js');
  const file = fs.readFileSync(dataPath, 'utf-8');
  const match = file.match(/window\.DISTRICTS\s*=\s*(\[.*?\]);/s);
  if (match) {
    return JSON.parse(match[1]);
  }
  return [];
}

// GET /api/districts
app.get('/api/districts', (req, res) => {
  try {
    const districts = getDistricts();
    res.json(districts);
  } catch (e) {
    res.status(500).json({ error: 'Failed to load districts', details: e.message });
  }
});
// Basic Express server for Smart Agro Insights
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running!' });
});


// Weather proxy endpoint
const axios = require('axios');
const WEATHER_API_KEY = 'b6907d289e10d714a6e88b30761fae22'; // Demo key, replace with your own for production

// GET /api/weather?lat=...&lon=...
app.get('/api/weather', async (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) {
    return res.status(400).json({ error: 'lat and lon are required' });
  }
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;
    const response = await axios.get(url);
    const data = response.data;
    res.json({
      temp: Math.round(data.main?.temp ?? 28),
      humidity: Math.round(data.main?.humidity ?? 60),
      rain: Math.round((data.rain?.['1h'] ?? data.clouds?.all ?? 0) * 100) / 100,
      wind: Math.round(data.wind?.speed ?? 2)
    });
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch weather', details: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
