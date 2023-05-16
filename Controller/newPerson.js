const { findByIdAndRemove, findById, findOne } = require("../Model/person");
const Person = require("../Model/newPerson");
const env = require("dotenv").config();
const { AUTH_EMAIL } = process.env;
const generateOTP = require("../utils/generateOTP");
const OTP = require("../Model/otp");
const jwt = require("jsonwebtoken");
const { hashData, verifyHashedData } = require("../Middleware/hashDataHandler");
const createToken = require("../Middleware/createToken");
const { verifyStudentEmailwithOTP} = require("./verifyemailController")


const getAllPerson = async (req, res, next) => {
  let getPersond;
  try {
    getPersond = await Person.find();
  } catch (err) {
    next(err);
  }
  if (!getPersond) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
  return res.status(200).json({
    getPersond: getPersond,
  });
};
const createPerson = async (req, res, next) => {
  let { name, phone1, state, city, relation ,social_security_no,description} = req.body;
  name = name.trim();
  phone1 = phone1.trim();
  relation = relation.trim();
  state = state.trim();
  city = city.trim();
  social_security_no = social_security_no.trim();
  description = description.trim();

  if (
    !(name || phone1 || state || city || relation|| social_security_no|| description)
  ) {
    return res.status(500).json({
      message: "Internal server Error",
    });
  }
  const person = await Person.create({
    name,
    phone1,
    state,
    city,
    relation,
    social_security_no,
    description
  });
  if (!person) {
    return res.status(500).json({
      message: "person Error",
    });
  }
  return res.status(201).json({
    Person: person,
  });
};

const updateperson = async (req, res, next) => {
  const personId = req.params.id; // assuming that you are passing the person id as a parameter
  let { name, email, phone1, phone2, state, city, dob } = req.body;
  name = name.trim();
  email = email.trim();
  phone1 = phone1.trim();
  phone2 = phone2.trim();
  state = state.trim();
  city = city.trim();
  dob = dob.trim();
  const updateFields = { name, email, phone1, phone2, state, city, dob };
  const person = await Student_person.findByIdAndUpdate(personId, updateFields, { new: true });
  
  if (!person) {
    return res.status(500).json({
      message: "person not found",
    });
  }
  
  return res.status(200).json({
    Student_person: person,
  });
};


const deleteperson = async (req, res, next) => {
  const id = req.params.id;
  let person;
  try {
    person = await Person.findByIdAndRemove(id);
    console.log(person);
  } catch (err) {
    next(err);
  }
  if (!person) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
  return res.status(200).json({
    message: "Deleted Succcess",
  });
};


const getperson = async (req, res, next) => {
  const id = req.params.id;
  let person;
  try {
    person = await Student_person.findById(id);
    console.log(person);
  } catch (err) {
    next(err);
  }
  if (!person) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
  return res.status(200).json({
    person: person,
  });
};

const authperson = (req, res) => {
  res
    .status(200)
    .send(`you are in the private route  ${req.currentperson.email}`);
};



const uploadImg = async (req, res) => {
  try {
    const studentperson = await Student_person.findById(req.params.id);
    const oldImage = await StudentpersonImg.findOne({ person: studentperson._id });
    if (oldImage) {
      await StudentpersonImg.deleteOne({ _id: oldImage._id });
    }
    const newImage = new StudentpersonImg({
      person: studentperson._id,
      filename: req.file.filename,
      filepath: req.file.path
    });
    await newImage.save();
    res.status(200).json({
      message:'File uploaded successfully.',
      studentperson
  });
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while uploading the file.');
  }
}



exports.getAllPerson = getAllPerson;
exports.createPerson = createPerson;
exports.updateperson = updateperson;
exports.deleteperson = deleteperson;
exports.authperson = authperson;
exports.uploadImg = uploadImg;
