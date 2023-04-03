const { default: mongoose, models } = require("mongoose");
const { scheduler } = require("timers/promises");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,

  },
  password: {
    type: String,
    required: true,
    minLenght: 7,
  },
  token :{
    type:String
  }
  ,
  verified :{
    type:Boolean,
    default:false
  },
  istrue :{
    type:Boolean,
  },
    image: {
    type: String,
    default: "https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
  }
  
});
const User = mongoose.model('User',userSchema); 
module.exports = User;



