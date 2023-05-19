const { findByIdAndRemove, findById, findOne } = require("../Model/User");
const Student_user = require("../Model/Student_user");
const Image = require("../Model/UserImage");
const sendEmail = require("../utils/sendEmail");
const env = require("dotenv").config();
const { AUTH_EMAIL } = process.env;
const StudentUserImg = require("../Model/UserImage");
const generateOTP = require("../utils/generateOTP");
const OTP = require("../Model/otp");
const jwt = require("jsonwebtoken");
const { hashData, verifyHashedData } = require("../Middleware/hashDataHandler");
const createToken = require("../Middleware/createToken");
const {verifyStudentEmailwithOTP} = require("../Controller/verifyemailController");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const getAllStudent_user =catchAsync( async (req, res, next) => {
  const getStudent_users = await Student_user.find();
  if (!getStudent_users) {
    return  next(new AppError('not found Student_user', 404));
  }
   res.status(200).json({
    Student_user: getStudent_users,
  });
});
const studentSignUp = catchAsync(async (req, res, next) => {
  let {
    name,
    email,
    password = "1234567",
    phone1,
    phone2,
    state,
    city,
    dob,
  } = req.body;
  if (
    !(name || email || password || phone1 || phone2 || state || city || dob)
  ) {
    return  next(new AppError('somting wrong please verify  values', 400));
  }
  const userAvailable = await Student_user.findOne({ email });
  if (userAvailable) {
    return  next(new AppError('email already Exist', 409));

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
    return  next(new AppError('not found', 404));
  }
  await verifyStudentEmailwithOTP({ email });
  return res.status(201).json({
    Student_user: user,
  });
});
const Student_userLogin =catchAsync( async (req, res, next) => {
    const { email, password } = await req.body;
    const userFetch = await Student_user.findOne({ email });
    if (!userFetch) {
      return  next(new AppError('Email Not Available in DB', 400));
    }
    const hashedpass = userFetch.password;
    const passwordMatch = await verifyHashedData(password, hashedpass);
    if (!passwordMatch || !userFetch.verified) {
      return  next(new AppError('Invalid credentials', 400));
    } else {
      const image = await Image.findOne({ user: userFetch._id });
      const tokeData = { userId: userFetch._id, email };
      const token = await createToken(tokeData);
      userFetch.token = token;
      res.status(200).json({
        userFetch,
        image,
      });
    }
});
const updateStudent_user =catchAsync( async (req, res, next) => {
    const userId = req.params.id;
    let { name, email, phone1, phone2, state, city, dob } = req.body;
    const updateFields = { name, email, phone1, phone2, state, city, dob };
    const studentUser = await Student_user.findById(userId);
    let newImage;
    let oldImage;
    if (req.file?.path) {
      oldImage = await StudentUserImg.findOne({ user: studentUser._id });
      if (oldImage) {
        await StudentUserImg.deleteOne({ _id: oldImage._id });
      }
      newImage = new StudentUserImg({
        user: studentUser._id,
        image: req.file?.path,
      });
      await newImage.save();
    } else {
      oldImage = await StudentUserImg.findOne({ user: studentUser._id });
    }
    const user = await Student_user.findByIdAndUpdate(userId, updateFields, {
      new: true,
    });
    if (!user) {
      return  next(new AppError('user Not Available in DB', 400));
    }
    if (newImage) {
      res.status(200).json({
        userFetch: user,
        image: newImage,
      });
    } else {
      res.status(200).json({
        userFetch: user,
        image: oldImage,
      });
    }
});
const deleteStudent_User =catchAsync( async (req, res, next) => {
  const id = req.params.id;
  const user = await Student_user.findByIdAndDelete(id);
  if(!user){
    return  next(new AppError('user Not Available in DB', 404));
  }
  return res.status(200).json({
    message: "Deleted Succcess",
  });
});
const getStudet_user =catchAsync( async (req, res, next) => {
  const id = req.params.id;
  const user = await Student_user.findById(id);
  if (!user) {
    return  next(new AppError('user Not Available in DB', 404));
  }
  return res.status(200).json({
    user: user,
  });
});
const uploadImg =catchAsync( async (req, res,next) => {
    console.log(req.file);//this will be automatically set by multer
    console.log(req.body);
    console.log('req.file======================');

    const imagepath = req.file?.path;
    console.log('req.file======================');

    const studentUser = await Student_user.findById(req.params.id);
    if(!studentUser){
      return  next(new AppError('user Not Available in DB', 404));
    }
    const newImage = new StudentUserImg({
      user: studentUser._id,
      image: imagepath,
    });
    console.log('req.newImage======================');
    console.log(newImage);
    await newImage.save();
    res.status(200).json({
      message: "Image added to the database successfully.",
      studentUser,
      newImage,
    });
});

exports.getAllStudent_user = getAllStudent_user;
exports.studentSignUp = studentSignUp;
exports.updateStudent_user = updateStudent_user;
exports.deleteStudent_User = deleteStudent_User;
exports.getStudet_user = getStudet_user;
exports.Student_userLogin = Student_userLogin;
exports.uploadImg = uploadImg;
