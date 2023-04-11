const { default: mongoose, models } = require("mongoose");
const { scheduler } = require("timers/promises");
const { v4: uuidv4 } = require("uuid");
const moment = require('moment');

const gallerySchema = new mongoose.Schema({
  imageUrl: String,
  title: String,
  description: String,
  date: Date
});

const Gallery = mongoose.model('Gallery', gallerySchema);

module.exports = Gallery;
