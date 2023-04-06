
const mongoose = require('mongoose');
const { Schema } = mongoose;

const ImgSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Student_user',
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  filepath: {
    type: String,
    required: true
  }
});

const StudentUserImg = mongoose.model('StudentUserImg', ImgSchema);

module.exports = StudentUserImg;
