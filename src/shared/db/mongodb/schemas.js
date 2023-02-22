const mongoose = require('mongoose');
const Schema = mongoose.Schema

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
    sale:{
        type: Number
    }},
    { timestamps:true})
    const agents = mongoose.model('agents', agentSchema)
    module.exports= agents

