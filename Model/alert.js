const { default: mongoose, models } = require("mongoose");
const { scheduler } = require("timers/promises");
const { v4: uuidv4 } = require('uuid');
const AlertSchema = new mongoose.Schema({

  Alert: {
    type: String,
    required: true
  },
  Location: {
    type: String,
    required: true
  },
  createDate: {
    type: Date,
    default: () => new Date().toLocaleTimeString(),
  },
  createTime: {
    type: String,
    default: () => new Date().toLocaleTimeString(),
  },
  AlertReason: {
    type: String,
    required: true
  },
  AlertPrority: {
    type: String,
    required: true,
  }
});

const Alert = mongoose.model('Alert', AlertSchema);

module.exports = Alert;


