const OTP = require("../Model/otp");
const env = require("dotenv").config();
const generateOTP = require("../utils/generateOTP");
const { hashData, verifyHashedData } = require("../Middleware/hashDataHandler");
const sendEmail = require("../utils/sendEmail");
const User = require("../Model/User");
const Student_user = require("../Model/Student_user");
const { AUTH_EMAIL } = process.env;
const { deleteOTP,sentOTP ,verifyOTP } = require("../Controller/otpController");



const verifyEmailwithOTP = async ({email}) => {
  try {
    const existingData = await User.findOne({ email });
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
    return createdOTP;
  } catch (error) {
    throw error;
  }
};
const verifyStudentEmailwithOTP = async ({email}) => {
  try {
    const existingData = await Student_user.findOne({ email });
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
    return createdOTP;
  } catch (error) {
    throw error;
  }
};



const verifyEmailUser = async ({email,otp}) => {
  try {
    const validOTP = await verifyOTP({ email, otp });
    if (!validOTP) {
      throw Error("Your OTP expire ");
    }
    //update user verified
    await User.updateOne({email},{verified:true})
    await deleteOTP({email});
    return {email ,verified:true}
  } catch (error) 
  {
    throw error
  }
};
const verifyEmailStudetUser = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!(email, otp)) {
      throw Error("Values required ");
    }
    const validOTP = await verifyOTP({ email, otp });
    if (!validOTP) {
      throw Error("Your OTP expire ");
    }

    //update user verified
    await Student_user.updateOne({email},{verified:true})
    await deleteOTP({email});
    res.status(200).json({
      _id: updatedUser._id,
      email,
      verified:true
    })
  } catch (error) 
  {
    throw error
  }
};


module.exports = { verifyEmailwithOTP ,verifyEmailUser ,verifyEmailStudetUser,verifyStudentEmailwithOTP};
