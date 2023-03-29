const { default: mongoose, models } = require("mongoose");
const { scheduler } = require("timers/promises");
autoIncrement = require('mongoose-auto-increment');
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
// const test = studentSchema.plugin(AutoIncrement, { inc_field: 'studentId',
// start_seq:0000000
// });
// studentSchema.plugin(autoIncrement.plugin, 'studentId', startAt: 100000000);
autoIncrement.initialize(mongoose.connection); 
// studentSchema.plugin(autoIncrement.plugin, {
//   model: 'Student',
//   field: 'studentId',
//   startAt: 1234567,
// });


// create student model
const Student = mongoose.model('Student', studentSchema);
studentSchema.pre('save', async function (next) {
  try {
    // generate studentId by incrementing the current max value by 1
    const currentMaxId = await this.constructor.findOne().sort({ studentId: -1 });
    this.studentId = currentMaxId ? currentMaxId.studentId + 1 : 0;
    // pad the studentId with leading zeroes to ensure it's 7 digits long
    this.studentId = this.studentId.toString().padStart(7, '0');
    next();
  } catch (error) {
    next(error);
  }
});
module.exports = Student;
