const OTP = require("../Model/otp");
const env = require("dotenv").config();
const generateOTP = require("../utils/generateOTP");
const { hashData, verifyHashedData } = require("../Middleware/hashDataHandler");
const sendEmail = require("../utils/sendEmail");
const User = require("../Model/User");
const { create } = require("../Model/otp");
const { deleteOTP } = require("./otpController");
const { AUTH_EMAIL } = process.env;

const verifyOTP = async ({ email, otp }) => {
    try {
      const otpMatched = await OTP.findOne({ email });
      if (!otpMatched) {
        throw Error("No OTP available on this email");
      }
  
      const { expireAT } = otpMatched;
      if (expireAT < Date.now()) {
        await OTP.deleteOne({ email });
        throw Error("Your OTP Expired");
      }
      const hashotp = otpMatched.otp;
      const validotp = await verifyHashedData(otp, hashotp);
      return validotp;
    } catch (error) {
      throw error;
    }
  };
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
      return createOTP;
    } catch (error) {
      throw error;
    }
  };
const sendPassOTP = async (req,res)=>{

    try {
        const {email} = req.body
        if(!email){
            throw Error('Email Required')
        }

        const existingData = await User.findOne({email})
        if(!existingData){
            throw Error('User not exist ')
        }

        if(!existingData.verified){
            throw Error('User not verified ')
        }

        const otpDetails = {
            email,
            subject: "Password Reset",
            message: "Verify your email with bellow code..!",
            duration: 1,
          };
          const createOtp =  sentOTP(otpDetails)
          res.status(200).json({
            message:"Reset Password OTP send on your mail box"
          })

    } catch (error) {
         
        throw error
    }


}
const resetPass = async (req,res)=>{

    try {
        const {newPass,email} = req.body
        if(!(email && newPass)){
            throw Error('Values are null')
        }
        const existingData = await User.findOne({email})
        if(!existingData){
            throw Error('User not exist ')
        }

        if(!existingData.verified){
            throw Error('User not verified ')
        }
        // const validOTP = verifyOTP({email,otp})
        // if(!validOTP){
        //     throw Error('otp not valid ')
        // }
        if(newPass.length<8){
            throw Error('Pass to short ')
        } 
        const hashnewPass = await hashData(newPass)
       const updateUser = await User.updateOne({email},{password:hashnewPass})
        await deleteOTP({email})
        res.status(200).json({
            message:"Your Password Reset Done"
        })
    } catch (error) {
         
        throw error
    }


}



module.exports = {sendPassOTP,resetPass };
