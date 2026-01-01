const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from frontend directory
app.use(express.static(path.join(__dirname, 'frontend')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'contact.html'));
});

app.listen(port, () => {
    console.log(`Frontend server running at http://localhost:${port}`);
});