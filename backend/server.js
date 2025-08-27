const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// In-memory storage for configuration
let openAiConfig = {};

// Config endpoint
app.post('/api/config', (req, res) => {
  openAiConfig = req.body;
  res.json({ status: 'configured' });
});

// Discovery placeholder
app.post('/api/discovery/analyze', (req, res) => {
  res.json({ brd: 'BRD document placeholder' });
});

// Project management placeholder
app.post('/api/projects', (req, res) => {
  res.json({ projectId: Date.now() });
});

// Coding agent placeholder
app.post('/api/coding/generate', (req, res) => {
  res.json({ status: 'code generated' });
});

// Code reviewer placeholder
app.post('/api/code-review/submit', (req, res) => {
  res.json({ status: 'code submitted' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
