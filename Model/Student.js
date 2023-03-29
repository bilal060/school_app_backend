const { default: mongoose, models } = require("mongoose");
const { scheduler } = require("timers/promises");
const { v4: uuidv4 } = require('uuid');
const studentSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4 // use uuid to generate studentId
  },
  fullName: {
    type: String,
    required: true
  },
  grade: {
    type: String,
    required: true
  },
  contactNo: {
    type: String,
    required: true
  },
  emergencyContactNo: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  studentId: {
    type: String,
    required: true,
    unique: true // ensure studentId is unique
  }
});

// create student model
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
