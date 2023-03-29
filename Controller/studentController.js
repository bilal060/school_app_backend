const { findByIdAndRemove, findById, findOne } = require("../Model/User");
const Student = require("../Model/Student");
const { v4: uuidv4 } = require('uuid');
const { json } = require("body-parser");


const CreateStudent = async (req, res) => {
  try{
    let { fullName, grade, contactNo, emergencyContactNo, address ,} =
    req.body;
  fullName = fullName.trim();
  grade = grade.trim();
  contactNo = contactNo.trim();
  emergencyContactNo = emergencyContactNo.trim();
  address = address.trim();
  if (!(fullName||grade || contactNo || emergencyContactNo || address)) {
    return res.status(500).json({
      message: "Internal server Error",
    });
  }
  const Poststudent = await Student.create({
    fullName,
    grade,
    contactNo,
    emergencyContactNo,
    address,
  });
  if (!Poststudent) {
    return res.status(500).json({
      message: "user Error",
    });
  }
  return res.status(201).json({
    Student: Poststudent,
  });
    
  }catch(err){
  
     throw err
  
  }

};

const getStudennts =async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get students' });
  }


}
 
const getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).send();
    }
    res.send(student);
  } catch (err) {
    res.status(500).send(err);
  }
}
const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) {
      return res.status(404).send();
    }
    res.send(student);
  } catch (err) {
    res.status(500).send(err);
  }
}
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).send();
    }
    res.status(200).json({

'message':'record deleted succesfully',
student:student

    });
  } catch (err) {
    res.status(500).send(err);
  }
}


exports.CreateStudent = CreateStudent;
exports.getStudennts = getStudennts;
exports.getStudent = getStudent;
exports.updateStudent = updateStudent;
exports.deleteStudent = deleteStudent;
