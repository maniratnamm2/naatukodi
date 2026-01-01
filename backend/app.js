const express = require('express');
const app = express();
const port = 3001;

app.get('/api', (req, res) => {
    res.json({ message: 'Backend API' });
});

app.listen(port, () => {
    console.log(`Backend server running at http://localhost:${port}`);
});