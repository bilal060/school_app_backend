const { findByIdAndRemove, findById, findOne } = require("../Model/User");
const Student_user = require("../Model/Student_user");
const sendEmail = require("../utils/sendEmail");
const env = require("dotenv").config();
const { AUTH_EMAIL } = process.env;
const generateOTP = require("../utils/generateOTP");
const OTP = require("../Model/otp");
const jwt = require("jsonwebtoken");
const { hashData, verifyHashedData } = require("../Middleware/hashDataHandler");
const createToken = require("../Middleware/createToken");
const { verifyStudentEmailwithOTP} = require("../Controller/verifyemailController")


const getAllStudent_user = async (req, res, next) => {
  let getStudent_users;
  try {
    getStudent_users = await Student_user.find();
  } catch (err) {
    next(err);
  }
  if (!getStudent_users) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
  return res.status(200).json({
    Student_user: getStudent_users,
  });
};
const studentSignUp = async (req, res, next) => {
  let { name, email,password='1234567', phone1, phone2, state, city, dob } = req.body;
  name = name.trim();
  email = email.trim();
   password = password.trim();
  phone1 = phone1.trim();
  phone2 = phone2.trim();
  state = state.trim();
  city = city.trim();
  dob = dob.trim();
  var emailFormat = /^[A-Z0-9+_.-]+@[A-Z0-9.-]+$/;
  if (email.match(emailFormat)) {
    throw Error("invalid email");
  }
  if (
    !(name || email||password  || phone1 || phone2 || state || city || dob)
  ) {
    return res.status(500).json({
      message: "Internal server Error",
    });
  }
  const userAvailable = await Student_user.findOne({ email });
  if (userAvailable) {
    return res.status(409).json({
      message: "email already Exist",
    });
  }
  const hashPassword = await hashData(password);
  const user = await Student_user.create({
    name,
    email,
    password: hashPassword,
    phone1,
    phone2,
    state,
    city,
    dob,
  });
  if (!user) {
    return res.status(500).json({
      message: "user Error",
    });
  }
  await verifyStudentEmailwithOTP({ email });

  return res.status(201).json({
    Student_user: user,
  });
};

const Student_userLogin = async (req, res, err) => {
  try {
    const { email, password } = await req.body;

    const userFetch = await Student_user.findOne({ email });
    if (!userFetch) {
      throw Error("Email Not Available in DB");
    }
    const hashedpass = userFetch.password;
    const passwordMatch = await verifyHashedData(password, hashedpass);
    if (!passwordMatch) {
      res.status(500).json({ message: "Inavlid user Password" });
    }
    if (!userFetch.verified) {
      res.status(500).json({
        messga: "Email not Verified",
      });
    }
    const tokeData = { userId: userFetch._id, email };
    const token = await createToken(tokeData);
    userFetch.token = token;
    console.log(userFetch);
    res.status(200).json({
      userFetch,
    });
  } catch (error) {
    throw error;
  }
};

const updateStudent_user = async (req, res, next) => {
  const id = req.params.id;
  const { name, email, password } = req.body;
  let user;
  try {
    user = await Student_user.findByIdAndUpdate(id, { name, email, password });
  } catch (err) {
    next(err);
  }
  if (!user) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
  return res.status(200).json({
    message: "Update Success",
  });
};

const currentUser = async (req, res, next) => {
  return res.status(200).json({
    res: req.user,
  });
};

const deleteStudent_User = async (req, res, next) => {
  const id = req.params.id;
  let user;
  try {
    user = await Student_user.findByIdAndRemove(id);
    console.log(user);
  } catch (err) {
    next(err);
  }
  if (!user) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
  return res.status(200).json({
    message: "Deleted Succcess",
  });
};
const getStudet_user = async (req, res, next) => {
  const id = req.params.id;
  let user;
  try {
    user = await Student_user.findById(id);
    console.log(user);
  } catch (err) {
    next(err);
  }
  if (!user) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
  return res.status(200).json({
    user: user,
  });
};

const authUser = (req, res) => {
  res
    .status(200)
    .send(`you are in the private route  ${req.currentUser.email}`);
};

exports.getAllStudent_user = getAllStudent_user;
exports.studentSignUp = studentSignUp;
exports.updateStudent_user = updateStudent_user;
exports.deleteStudent_User = deleteStudent_User;
exports.getStudet_user = getStudet_user;
exports.currentUser = currentUser;
exports.Student_userLogin = Student_userLogin;
exports.authUser = authUser;
