const lastweekController = require('../controller/last week/last.week.controller');

const checkAuth = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader || authHeader !== 'Rocket') {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
  };

const lastweekRoutes = (app) => {
    app.post('/contact-us', checkAuth, lastweekController.contactUs);;
    app.get('/hello', lastweekController.hello);;
    app.get('/status', lastweekController.status);;
    app.get('/error', lastweekController.error);;
    app.get('/email-lists', checkAuth, lastweekController.emailList);;
    app.get('/region-avg', checkAuth, lastweekController.regionAverage);;
    app.get('/calculate-elevators', checkAuth, lastweekController.residentalCalculation);;
}

module.exports = {lastweekRoutes};