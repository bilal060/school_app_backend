const mongoose = require('mongoose');

const UserImageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student_user',
    required: true
  },
  image: {
    type: Buffer,
    contentType: String
  }
});

const UserImage = mongoose.model('UserImage', UserImageSchema);

module.exports = UserImage;
