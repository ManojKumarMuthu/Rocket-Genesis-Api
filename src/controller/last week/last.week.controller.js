const {validateRequest} = require('./last.week.calculation')

const agentsSchema = require('../../shared/db/mongodb/schemas').agents;
const messageSchema = require('../../shared/db/mongodb/schemas').Message;


// Hello //

const hello = async (req, res, next) => {

    console.log(`Server listening on port ${port}`);
    res.send('Hello World!');
  };

// Status //

const status = async (req, res, next) => {
  
  const { PORT, ENV_NAME } = process.env;
  res.send(`Server is running on port ${PORT} in ${ENV_NAME} environment`);
};

// Error //

const error = async (req, res, next) => {
  const errorCode = 500;
  const errorMessage = 'This is a simulated error message.';
  res.status(errorCode).json({ error: errorMessage });
  
};

// Email-List //

const emailList = async (req, res, next) => {
  try {
    const allAgents = await agentsSchema.find().sort({ last_name: 'asc' }).exec();
    const emailList = allAgents.map(agent => agent.email).join(',');
    res.status(200).json({ emailList: emailList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the email list.' });
  }
};

// Region average rating // 

const regionAverage = async (req, res, next) => {
  const region = req.query.region && req.query.region.toLowerCase();
  if (!region) {
    res.status(400).json({ message: 'Region parameter is missing or invalid.' });
    return;
  }
  const filteredAgents = await agentsSchema.find({ region: region });

  if (filteredAgents.length === 0) {
    res.status(404).json({ message: 'No agents found in the specified region.' });
  } else {
    const totalRating = filteredAgents.reduce((acc, agent) => acc + parseFloat(agent.rating), 0);
    const totalFee = filteredAgents.reduce((acc, agent) => acc + parseFloat(agent.fee), 0);
    const averageRating = (totalRating / filteredAgents.length).toFixed(2);
    const averageFee = (totalFee / filteredAgents.length).toFixed(2);
    res.json({
      region,
      averageRating,
      averageFee
    });
  }
};

// Residental Calculation //

const residentalCalculation = async (req, res, next) => {
  const tier = req.query.tier;
  const floors = req.query.floors;
  const app = req.query.appartments;

  if (!tier || !["standard", "premium", "excelium"].includes(tier)) {
    return res.status(400).json({ message: "Invalid tier" });
  }

  if (isNaN(app) || isNaN(floors)) {
    return res.status(400).json({ message: "Apartments and floors must be numbers" });
  }

  const numAptsInt = parseInt(app);
  const numFloorsInt = parseInt(floors);

  if (!Number.isInteger(numAptsInt) || !Number.isInteger(numFloorsInt)) {
    return res.status(400).json({ message: "Apartments and floors must be integers" });
  }

  if (numAptsInt <= 0 || numFloorsInt <= 0) {
    return res.status(400).json({ message: "Apartments and floors must be greater than zero" });
  }

  res.send(validateRequest(tier, numFloorsInt, numAptsInt));
  
};

// Post request//

const contactUs = async (req, res, next) => {
  try {
    const { first_name, last_name, message } = req.body;
    const newMessage = new messageSchema({ first_name, last_name, message });
    await newMessage.save();
    res.status(200).send({ message: 'Thank you for your message, We have received it and will get back to you soon.' });
  } catch (err) {
    next(err);
  }
};
  


module.exports = {hello, status, error, emailList, regionAverage, residentalCalculation, contactUs}