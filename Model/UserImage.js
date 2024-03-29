
const mongoose = require('mongoose');
const { Schema } = mongoose;

const ImgSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Student_user',
    required: true
  },
  image:{
    type:String
  }
});

const StudentUserImg = mongoose.model('StudentUserImg', ImgSchema);

module.exports = StudentUserImg;
