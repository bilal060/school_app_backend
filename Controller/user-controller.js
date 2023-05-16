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
const { verifyEmailwithOTP} = require("../Controller/verifyemailController")



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
const userSignUp = async (req, res,) => {
  let { name, email, password , } = req.body ;
  name = name.trim()
  email = email.trim()
  password = password.trim()
  var emailFormat = /^[A-Z0-9+_.-]+@[A-Z0-9.-]+$/;
if(email.match(emailFormat)){
    throw Error('invalid email')
   }
  if(!name || !email || !password){
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
  if (!passwordMatch || !userFetch.verified) {
    res.status(401).json({ message: "Invalid credentials" });
  }else{
    const tokeData = {userId: userFetch._id , email}
    const token = await createToken(tokeData)
    userFetch.token = token
    console.log( userFetch)
    res.status(200).json({
      userFetch 
    })
  }
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
       user = await Users.findByIdAndRemove(id)
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
const UpdateUserSetting =  async (req, res) => {
  try {
    const userId = req.params.id;
    let  {name , password} = req.body
    name = name.trim()
    password = password.trim()
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }
    if (name) {
      user.name =name;
    }
    if (password) {
       newpass = password
      const hashdata = await hashData(newpass)
      user.password = hashdata
    }
    if (req.file) {
      user.image = req.file.path;
    }
    await user.save();
    res.status(200).json({
      'messgae':'User updated successfully',
      'user':user
    });
  } catch (err) {
    // handle any errors that occurred during the update process
    console.error(err);
    res.status(500).send('An error occurred while updating the user');
  }
}

exports.getAllusers = getAllusers;
exports.userSignUp = userSignUp;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.getUser = getUser;
exports.currentUser = currentUser;
exports.userLogin = userLogin
exports.authUser = authUser
exports.UpdateUserSetting = UpdateUserSetting

