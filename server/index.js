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

// Example: Add more API routes here

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
