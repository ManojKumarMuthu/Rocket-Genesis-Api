const agentController = require('../controller/agent.controller');

const checkAuth = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader || authHeader !== 'Rocket') {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
  };

const agentRoutes = (app) => {
    app.post('/create', checkAuth, agentController.create);;
    app.get('/agents', checkAuth, agentController.showAgents);;
    app.get('/agents-by-region', checkAuth, agentController.agentsRegion);;
    app.put('/agent-update-info', checkAuth, agentController.updateAgentInfo);;
    app.delete('/agent-delete', checkAuth, agentController.deleteAgentInfo);;
}

module.exports = {agentRoutes};