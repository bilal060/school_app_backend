const { findByIdAndRemove, findById, findOne } = require("../Model/User");
const Users = require("../Model/User");
const sendEmail = require("../utils/sendEmail");
const env = require("dotenv").config(); 
const { AUTH_EMAIL } = process.env;
const generateOTP = require("../utils/generateOTP");
const OTP = require('../Model/otp')
const jwt = require('jsonwebtoken')
const {hashData,verifyHashedData} = require('../Middleware/hashDataHandler')
const createToken = require('../Middleware/createToken')

const sentOTP = async ({ email, subject, message, duration = 1 }) => {
  try { 
    //clear old record
    await OTP.deleteOne({ email });
    const generateotp = await generateOTP();
    const mailOptions = {
      from: AUTH_EMAIL,
      to: email,
      subject,
      html: `<p>${message}</p> <br> <p>${generateotp}</p><br> <p>${duration}</p> `,
    };
    await sendEmail(mailOptions);
    const hashopt = await hashData(generateotp);
    const newOTP = new OTP({
      email,
      otp: hashopt,
      createdAT: Date.now(),
      expireAT: Date.now() + 360000 * duration,
    });
    const createOTP = await newOTP.save();
    console.log(createOTP)
    return createOTP;
  } catch (error) {
    throw error;
  }
};

const verifyEmailwithOTP = async ({email}) => {
  try {
    if (!email) {
      throw Error("Email Value required");
    }
    const existingData = await Users.findOne({ email });

    if (!existingData) {
      throw Error("email not found");
    }
    const otpDetails = {
      email,
      subject: "Email Verification",
      message: "Verify your email with bellow code..!",
      duration: 1,
    };
    const createdOTP = await sentOTP(otpDetails);
   return createdOTP
  } catch (error) {
    throw error;
  }
};


const getAllusers = async (req, res, next) => {
  let users;
  try {
    users = await Users.find();
  } catch (err) {
    next(err);
  }
  if (!users) {
    return res.status(500).json({
      message: "Internal Ser asasasasver Error",
    });
  }
  return res.status(200).json({
    users: users,
  });
};
const userSignUp = async (req, res, next) => {
  let { name, email, phone, password } = req.body ;
  name = name.trim()
  email = email.trim()
  phone = phone.trim()
  password = password.trim()
  var emailFormat = /^[A-Z0-9+_.-]+@[A-Z0-9.-]+$/;
if(email.match(emailFormat)){
    throw Error('invalid email')
   }
  if(!name || !email || !password || !phone){
    return res.status(500).json({
      message: "Internal server Error",
    });
  }
const userAvailable = await Users.findOne({email})
if(userAvailable){
  return res.status(409).json({
    message: "email already Exist",
  });
}
const hashPassword = await hashData(password)
  const user = await Users.create({
name,
email,
phone,
password:hashPassword,
  });
  if (!user) {
    return res.status(500).json({
    message: "user Error",
    }); 
  }
 await verifyEmailwithOTP({email})

  return res.status(201).json({ 
    users: user,
  });
}

const userLogin = async (req,res,err)=>{

try {
  const { email, password } = await req.body ;

  const userFetch = await Users.findOne({email})
  if(!userFetch){
    throw Error('Email Not Available in DB')
  }
  const hashedpass = userFetch.password
  const passwordMatch = await verifyHashedData(password , hashedpass)   
  if(!passwordMatch){
    res.status(500).json({message:'Inavlid user Password'})
  }
  if(!userFetch.verified){
    res.status(500).json({
      messga:'Email not Verified'
    })
  }
  //create Token
  const tokeData = {userId: userFetch._id , email}
  const token = await createToken(tokeData)
  userFetch.token = token
  console.log( userFetch)
  res.status(200).json({
    userFetch 
  })
  // return userFetch
 
} catch (error) {

throw error
  
}




}




const updateUser = async (req, res, next) => {
   const id = req.params.id;
    const { name, email, password } = req.body ;
    let user;
    try {  
      user = await Users.findByIdAndUpdate(id,{name,email,password})
    } catch (err) {
      next(err);
    }
    if (!user) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
    return res.status(200).json({
       message:'Update Success'
    });
  };

  const currentUser = async (req, res, next) => {
     return res.status(200).json({
      res:req.user
     });
   };




  const deleteUser = async (req, res, next) => {
    const id = req.params.id;
     let user;
     try {  
       user = await Users,findByIdAndRemove(id)
       console.log(user)
     } catch (err) {
       next(err);
     }
     if (!user) {
       return res.status(500).json({
         message: "Internal Server Error",
       });
     }
     return res.status(200).json({
       message:'Deleted Succcess'
     });
   };
   const getUser = async (req, res, next) => {
    const id = req.params.id;
     let user;
     try {  
       user = await Users.findById(id)
       console.log(user)
     } catch (err) {
       next(err);
     }
     if (!user) {
       return res.status(500).json({
         message: "Internal Server Error",
       });
     }
     return res.status(200).json({
     user:user
     });
   };

   const authUser = (req,res)=>{
    res.status(200).send(`you are in the private route  ${req.currentUser.email}`)
   }


exports.getAllusers = getAllusers;
exports.userSignUp = userSignUp;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.getUser = getUser;
exports.currentUser = currentUser;
exports.userLogin = userLogin
exports.authUser = authUser
