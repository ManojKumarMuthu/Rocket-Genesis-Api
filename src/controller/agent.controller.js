const agents = require('../shared/db/mongodb/schemas').agents;

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
      sales: 0
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

    // Update agent //

const updateAgentInfo = async (req, res, next) => {
    try {
        const { first_name, last_name, email, region } = req.body;
    
        const agent = await agents.findOne({ first_name, last_name });
    
        if (!agent) {
        return res.status(404).json({ error: 'Agent not found' });
        }
    
        // Update the agent's information
        agent.first_name = first_name;
        agent.last_name = last_name;
        agent.email = email;
        agent.region = region;
        const result = await agent.save();
    
        res.status(200).json({ message: 'Agent information updated successfully!', agent: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while updating the agent information.' });
    }
    };
      
    // Delete Agent //

const deleteAgentInfo = async (req, res, next) => {
    try {
        const { first_name, last_name, email, region } = req.body;

        const agent = await agents.find({ first_name, last_name, email, region });

        if (agent.length === 0) {
            return res.status(404).json({ error: 'Agent not found' });
        } else if (agent.length > 1) {
            return res.status(400).json({ error: 'Multiple agents found with the given information' });
        } else {
            await agent[0].deleteOne();
            res.status(200).json({ message: 'Agent information deleted successfully!' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while updating the agent information.' });
    }
};
    
module.exports = { create, showAgents, agentsRegion, updateAgentInfo, deleteAgentInfo };
