const { default: mongoose, models } = require("mongoose");
const { scheduler } = require("timers/promises");
const AutoIncrement = require('mongoose-sequence')(mongoose);
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
    type: Number,
    unique: true,
    default: 0,
    index: true,
  },
},{ _id: false });
const test = studentSchema.plugin(AutoIncrement, { inc_field: 'studentId',
start_seq:1234567
});
console.log(test.start_seq)
// create student model
const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
