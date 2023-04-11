const { default: mongoose, models } = require("mongoose");
const { scheduler } = require("timers/promises");

const Schema = mongoose.Schema;

const PersonSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phone1: {
    type: String,
    required: true,

  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,

  },
  relation: {
    type: String,
    required: true,

  },
  social_security_no: {
    type: String,
    required: true,
  },
  description :{
    type:String,
    required: true,
  }
  
  
});
const Person = mongoose.model('Person',PersonSchema); 
module.exports = Person;