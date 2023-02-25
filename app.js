// Initial dependencies and definitions
require('dotenv').config();
const Express = require('express');
const app = Express();
const port = process.env.PORT || 3004;

// Import routes 

// Health routes //

const HealthRoutes = require('./src/routes/health.routes');

app.use(Express.json());

HealthRoutes.registerHealthRoutes(app);

// Agent route //

const agentRoutes = require('./src/routes/agent.route')

app.use(Express.json());

agentRoutes.agentRoutes(app);

// Region route //

const regionRoutes = require('./src/routes/region.route')

app.use(Express.json());

regionRoutes.regionRoutes(app);

// last week //

const lastweekRoutes = require('./src/routes/last.week.routes')

app.use(Express.json());

lastweekRoutes.lastweekRoutes(app);


const MongoManager = require('./src/shared/db/mongodb/mongo-manager')
MongoManager.openMongoConnection();

app.listen(port, () => {
    console.log(`server is listening on port ${port}`)
})



