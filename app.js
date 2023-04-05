const express = require('express');
const cors = require('cors');
const app = express();
const setupRoutes = require('./router/router');

app.listen(3001, () => {
    console.log('Serveur démarré sur le port 3001');
  });

app.use(cors('*'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});


setupRoutes(app);

module.exports = app;