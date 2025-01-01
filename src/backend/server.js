const express = require('express');
const cors = require('cors');
const connectToDatabase = require('./db');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get('/api/data', async (req, res) => {
    const pool = await connectToDatabase();
    try {
        const result = await pool.request().query('SELECT * FROM YourTable');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Error fetching data');
        console.error(err);
    }
});

app.listen(port, () => {
    console.log(`Backend server running at http://localhost:${port}`);
});
