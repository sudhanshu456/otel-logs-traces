const express = require('express');
const cartRoutes = require('./routes/cartRoutes');
const app = express();

app.use(express.json());
app.use('/cart', cartRoutes);

module.exports = app;
