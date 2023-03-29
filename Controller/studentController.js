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
  const studentId = req.params.id;
  try {
    const student = await Student.findOne({ studentId });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    const formattedStudentId = student.studentId.toString().padStart(6, "0");
    res.json({ Student: { ...student.toJSON(), formattedStudentId } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
const updateStudent = async (req, res) => {
  const studentId = req.params.id;
  const updateData = req.body;
  try {
    const student = await Student.findOneAndUpdate({ studentId }, updateData, {
      new: true
    });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    const formattedStudentId = student.studentId.toString().padStart(6, "0");
    res.json({ Student: { ...student.toJSON(), formattedStudentId } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
const deleteStudent = async (req, res) => {
  const studentId = req.params.id;
  try {
    const student = await Student.findOneAndDelete({ studentId });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}


exports.CreateStudent = CreateStudent;
exports.getStudennts = getStudennts;
exports.getStudent = getStudent;
exports.updateStudent = updateStudent;
exports.deleteStudent = deleteStudent;
