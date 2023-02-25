const agentsSchema = require('../shared/db/mongodb/schemas').agents;
const regionsSchema = require('../shared/db/mongodb/schemas').region;

const createRegion = async (req, res, next) => {
    try {
      // Check if region already exists

      const region1 = req.body.region 
      const existingRegion = await regionsSchema.findOne({region:region1} );
    
      if (existingRegion) {
        return res.status(400).json({ error: 'Region already exists' });
      }
  
      // Get agents in region
      const agents = await agentsSchema.find({ region:region1 });

      // Get top 3 agents by sales
    
        const topAgents = agents.sort(
        (a, b) => b.sales - a.sales).slice(0,3);
        
      // Create manager agent
      const managerName = topAgents[0].first_name + ' ' + topAgents[0].last_name;
  
      // Calculate total sales in region

      let totalSales = 0;
      for (let i = 0; i < agents.length; i++) {
        totalSales += agents[i].sales;
      }

      // Create region document
      const region = new regionsSchema({
        region: req.body.region,
        address: req.body.address,
        total_sales: totalSales,
        manager: managerName,
        top_agents: topAgents.map(agent => `${agent.first_name} ${agent.last_name}`)
      });
  
      // Save region document to database
      await region.save();
  
      res.status(201).json({ message: 'Region created successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  


// Get agent by region //

const getRegion = async (req, res, next) => {
     try {
        const region = req.query.region;

    // Find all regions with the given name, removing duplicates
    const regions = await regionsSchema.find({ region: region }).distinct('_id');

    // Return the region information
    const regionInfo = await regionsSchema.find({ _id: { $in: regions } });
    res.status(200).json(regionInfo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// All stars //


const getAllStars = async (req, res, next) => {
    try {
      // Get all regions
      const regions = await regionsSchema.find();
  
      // Find top agent in each region
      const allStars = await Promise.all(regions.map(async (region) => {
        const topAgent = await agentsSchema.findOne({ region: region.region }).sort({ sales: -1 });
        return {
          region: region.region,
          top_agent: `${topAgent.first_name} ${topAgent.last_name}`,
          sales: topAgent.sales
        };
      }));
  
      // Return the top agent in each region
      res.status(200).json(allStars);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
   
  
module.exports = {createRegion, getRegion, getAllStars };

