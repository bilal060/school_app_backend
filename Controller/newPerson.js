const { findByIdAndRemove, findById, findOne } = require("../Model/User");
const Person = require("../Model/newPerson");
const env = require("dotenv").config();
const { AUTH_EMAIL } = process.env;
const generateOTP = require("../utils/generateOTP");
const OTP = require("../Model/otp");
const jwt = require("jsonwebtoken");
const { hashData, verifyHashedData } = require("../Middleware/hashDataHandler");
const createToken = require("../Middleware/createToken");
const { verifyStudentEmailwithOTP} = require("./verifyemailController")


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
  // const userAvailable = await Person.findOne({ email });
  // if (userAvailable) {
  //   return res.status(409).json({
  //     message: "email already Exist",
  //   });
  // }
  const user = await Person.create({
    name,
    phone1,
    state,
    city,
    relation,
    social_security_no,
    description
  });
  if (!user) {
    return res.status(500).json({
      message: "user Error",
    });
  }
  return res.status(201).json({
    Person: user,
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
  if (!passwordMatch || !userFetch.verified) {
    res.status(401).json({ message: "Invalid credentials" });
  }
  else{
    const image = await Image.findOne({ user: userFetch._id });
    const tokeData = { userId: userFetch._id, email };
    const token = await createToken(tokeData);
    userFetch.token = token;
    console.log(userFetch);
      res.status(200).json({
        userFetch,
        image
      })
  }
   
  } catch (error) {
    throw error;
  }
};

const updateStudent_user = async (req, res, next) => {
  const userId = req.params.id; // assuming that you are passing the user id as a parameter
  let { name, email, phone1, phone2, state, city, dob } = req.body;
  name = name.trim();
  email = email.trim();
  phone1 = phone1.trim();
  phone2 = phone2.trim();
  state = state.trim();
  city = city.trim();
  dob = dob.trim();
  const updateFields = { name, email, phone1, phone2, state, city, dob };
  const user = await Student_user.findByIdAndUpdate(userId, updateFields, { new: true });
  
  if (!user) {
    return res.status(500).json({
      message: "user not found",
    });
  }
  
  return res.status(200).json({
    Student_user: user,
  });
};

// const updateStudent_user = async (req, res, next) => {
//   const id = req.params.id;
//   const { name, email, password } = req.body;
//   let user;
//   try {
//     user = await Student_user.findByIdAndUpdate(id, { name, email, password });
//   } catch (err) {
//     next(err);
//   }
//   if (!user) {
//     return res.status(500).json({
//       message: "Internal Server Error",
//     });
//   }
//   return res.status(200).json({
//     message: "Update Success",
//   });
// };

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



const uploadImg = async (req, res) => {
  try {
    const studentUser = await Student_user.findById(req.params.id);
    const oldImage = await StudentUserImg.findOne({ user: studentUser._id });
    if (oldImage) {
      await StudentUserImg.deleteOne({ _id: oldImage._id });
    }
    const newImage = new StudentUserImg({
      user: studentUser._id,
      filename: req.file.filename,
      filepath: req.file.path
    });
    await newImage.save();
    res.status(200).json({
      message:'File uploaded successfully.',
      studentUser
  });
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while uploading the file.');
  }
}



exports.getAllStudent_user = getAllStudent_user;
exports.createPerson = createPerson;
exports.updateStudent_user = updateStudent_user;
exports.deleteStudent_User = deleteStudent_User;
exports.getStudet_user = getStudet_user;
exports.currentUser = currentUser;
exports.Student_userLogin = Student_userLogin;
exports.authUser = authUser;
exports.uploadImg = uploadImg;
