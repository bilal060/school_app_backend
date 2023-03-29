const { default: mongoose } = require("mongoose");
const { scheduler } = require("timers/promises");
const autoIncrement = require('mongoose-auto-increment');
const { v4: uuidv4 } = require('uuid');

const connection = mongoose.createConnection('mongodb://localhost/myDatabase');

autoIncrement.initialize(connection);

const studentSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4 
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
    index: true,
  },
});

studentSchema.plugin(autoIncrement.plugin, {
  model: 'Student',
  field: 'studentId',
  startAt: 1,
  incrementBy: 1,
});

// Define a virtual property to format the studentId field with leading zeros
studentSchema.virtual('formattedStudentId').get(function () {
  return this.studentId.toString().padStart(6, '0');
  
});

// Override the toJSON() method to include the formattedStudentId property
studentSchema.set('toJSON', {
  getters: true,
  virtuals: true,
  transform: function (doc, ret, options) {
    delete ret._id;
    delete ret.__v;
  }
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
