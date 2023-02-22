const baseRouter = require('./base');

const setupRoutes = (app) => {
    app.use(baseRouter);
};

module.exports = setupRoutes;