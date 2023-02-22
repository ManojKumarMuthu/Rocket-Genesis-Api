const agents = require('../shared/db/mongodb/schemas');

    // Create new agent // 

const create = async (req, res, next) => {
  try {
    const { first_name, last_name, email, region } = req.body;
    const agent = new agents({
      first_name,
      last_name,
      email,
      region,
      rating: 0,
      fee: 0,
      sale: 0
    });
    const result = await agent.save();
    res.status(201).json({ message: 'Agent created successfully!', agent: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the agent.' });
  }
};

    // Get all Agents //

const showAgents = async (req, res, next) => {
    try {
        const allAgents = await agents.find().sort({ last_name: 'asc' }).exec();
        res.status(200).json({ agents: allAgents });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching the agents.' });
      }
    };

    // Get by region //

const agentsRegion = async (req, res, next) => {
    try {
        const { region } = req.query;
        const agentRegion = await agents.find({ region }).sort({ rating: 'desc' }).exec();
        res.status(200).json({ agents: agentRegion });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching the agents by region.' });
    }
};

    // Update agents //

    

module.exports = { create, showAgents, agentsRegion };
