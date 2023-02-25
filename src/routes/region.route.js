const regionController = require('../controller/region.controller');

const checkAuth = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader || authHeader !== 'Rocket') {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};

const regionRoutes = (app) => {
  app.post('/region-create', checkAuth, regionController.createRegion);
  app.get('/region', checkAuth, regionController.getRegion);
  app.get('/all-stars', checkAuth, regionController.getAllStars);
};

module.exports = { regionRoutes };
