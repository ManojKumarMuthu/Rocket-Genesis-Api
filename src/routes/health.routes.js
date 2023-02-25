const HealthController = require('../controller/health.controller');

const registerHealthRoutes = (app) => {
  app.get('/hello', HealthController.helloWorld);
}

module.exports = {registerHealthRoutes};