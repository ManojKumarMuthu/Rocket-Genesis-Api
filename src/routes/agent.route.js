const agentController = require('../controller/agent.controller');


const agentRoutes = (app) => {
    app.post('/create', agentController.create);;
    app.get('/agents', agentController.showAgents);;
    app.get('/agents-by-region', agentController.agentsRegion);;
    app.put('/agent-update-info', agentController.updateAgentInfo);;
    app.delete('/agent-delete', agentController.deleteAgentInfo);;
}

module.exports = {agentRoutes};