const express = require('express');
const app = express();
const router = express.Router();

//Rotas
const index = require('./routes/index');
const imageRoute = require('./routes/imageRoute');
app.use('/', index);
app.use('/images', imageRoute);
module.exports = app;