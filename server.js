const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/status', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Civic Accountability API is running',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/officials', (req, res) => {
  console.log('Officials route hit');
  const filePath = path.join(__dirname, 'data', 'officials.json');
  console.log('Reading file from:', filePath);
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.log('Read error:', err.message);
      return res.status(500).json({ error: 'Could not load officials data' });
    }
    console.log('File read successfully, length:', data.length);
    res.json(JSON.parse(data));
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

module.exports = app;