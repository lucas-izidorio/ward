const express = require('express');
var cors = require('cors')

const app = express();
app.use(cors());
const router = express.Router();

//Rotas
const index = require('./routes/index');
const imageRoute = require('./routes/imageRoute');
app.use('/', index);
app.use('/images', imageRoute);
module.exports = app;