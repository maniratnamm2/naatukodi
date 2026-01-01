const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();
const port = 3001;

// Middleware to parse JSON
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database setup
const db = new sqlite3.Database('./contacts.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        db.run(`CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT NOT NULL,
            product TEXT,
            quantity TEXT,
            bulkQuantity TEXT,
            message TEXT
        )`);
    }
});

app.get('/api', (req, res) => {
    res.json({ message: 'Backend API' });
});

// Route to handle contact form submission
app.post('/contact', (req, res) => {
    const { name, email, phone, product, quantity, bulkQuantity, message } = req.body;
    const sql = 'INSERT INTO contacts (name, email, phone, product, quantity, bulkQuantity, message) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.run(sql, [name, email, phone, product, quantity, bulkQuantity, message], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Contact saved successfully', id: this.lastID });
    });
});
// Route to get all contacts
app.get('/contacts', (req, res) => {
    const sql = 'SELECT * FROM contacts';
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ contacts: rows });
    });
});
app.listen(port, () => {
    console.log(`Backend server running at http://localhost:${port}`);
});