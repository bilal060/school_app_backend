const { default: mongoose, models } = require("mongoose");
const { scheduler } = require("timers/promises");
const { v4: uuidv4 } = require("uuid");
const moment = require('moment');

const AlertSchema = new mongoose.Schema({
  Alert: {
    type: String,
    required: [true , 'please enter Alert'],
  },
  Location: {
    type: String,
    required: [true , 'please enter Location'],
  },
  createDate: {
    type: String,
    default: moment().format('YYYY-MM-DD')
  },
  createTime: {
    type: String,
    default: moment().format('HH:mm')
  },
  AlertReason: {
    type: String,
    required: [true , 'please enter AlertReason'],
  },
  AlertPrority: {
    type: String,
    required: [true , 'please enter AlertPrority'],
  },
});

const Alert = mongoose.model("Alert", AlertSchema);

module.exports = Alert;
