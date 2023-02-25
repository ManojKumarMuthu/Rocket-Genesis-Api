const mongoose = require('mongoose');
const Schema = mongoose.Schema

// Agent Schema //

const agentSchema = new Schema({
   
    first_name:{
      type: String
    },
    last_name:{
      type: String
    },
    email:{
      type: String
    },
    region:{
      type: String
    },
    rating:{
      type: Number
    },
    fee:{
      type: Number
    },
    sales:{
      type: Number
    }
  }, { timestamps:true});
  
    const agents = mongoose.model('agents', agentSchema)
   
// Region Schema //

const regionSchema = new Schema({
    region: {
      type: String,
      required: true,
      unique: true
    },
    address: {
      type: String,
      required: true
    },
    total_sales: {
      type: String,
      required: true
    },
    manager: {
      type: String,
      required: true
    },
    top_agents: {
      type: [String],
      required: true
    }
  },
  { timestamps:true});
  
 
    const region = mongoose.model('region', regionSchema)

    
const messageSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const Message = mongoose.model('Message', messageSchema);
    

    module.exports= { agents, region, Message}