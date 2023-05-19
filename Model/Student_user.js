const { default: mongoose, models } = require("mongoose");
const { scheduler } = require("timers/promises");

const Schema = mongoose.Schema;

const Student_userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,

  },
  phone1: {
    type: String,
    required: true,

  },
  phone2: {
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
  dob: {
    type: String,
    required: true,

  },
  password: {
    type: String,
    required: true,
    minLenght: 7,
    default:'11223344'
  },
  token :{
    type:String
  }
  ,
  verified :{
    type:Boolean,
    default:false
  },

});
const Student_user = mongoose.model('Student_user',Student_userSchema); 
module.exports = Student_user;