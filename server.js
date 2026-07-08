const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/api/status', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Civic Accountability API is running',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/officials', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'officials.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Could not load officials data' });
    }
    res.json(JSON.parse(data));
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});