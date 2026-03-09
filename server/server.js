require('dotenv').config();
const express = require('express');
const path = require('path');
const foodsRouter = require('./routes/foods');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'client')));
app.use('/api/foods', foodsRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
