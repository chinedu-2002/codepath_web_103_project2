const express = require('express');
const router = express.Router();
const pool = require('../config/database');

router.get('/', async (req, res) => {
    try {
        const search = req.query.search;

        if (search) {
            const result = await pool.query(
                'SELECT * FROM foods WHERE name ILIKE $1 OR country ILIKE $1',
                [`%${search}%`]
            );
            res.json(result.rows);
        } else {
            const result = await pool.query('SELECT * FROM foods ORDER BY id');
            res.json(result.rows);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
