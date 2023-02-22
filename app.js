const express = require('express');
const cors = require('cors');
const app = express();
const setupRoutes = require('./router/router');

app.use(cors('*'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

setupRoutes(app);

module.exports = app;