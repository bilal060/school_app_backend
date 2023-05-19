const OTP = require("../Model/otp");
const env = require("dotenv").config();
const generateOTP = require("../utils/generateOTP");
const { hashData, verifyHashedData } = require("../Middleware/hashDataHandler");
const sendEmail = require("../utils/sendEmail");
const User = require("../Model/User");
const Student_user = require("../Model/Student_user");
const { create } = require("../Model/otp");
const { deleteOTP,sentOTP } = require("./otpController");
const { AUTH_EMAIL } = process.env;
const verifyOTP = async ({ email, otp }) => {
    try {
      const otpMatched = await OTP.findOne({ email });
      if (!otpMatched) {
     return   res.status(400).json({
        'err':'No OTP available on this email'
        })
      }

      const { expireAT } = otpMatched;
      if (expireAT < Date.now()) {
        await OTP.deleteOne({ email });
      return  res.status(400).json({
            'err':'Your OTP Expired'
            })
      }
      const hashotp = otpMatched.otp;
      const validotp = await verifyHashedData(otp, hashotp);
      return validotp;
    } catch (error) {
        res.status(400).json({
            error
            })
    }
  };
const sendPassOTP = async (req,res)=>{

    try {
        const {email} = req.body
        if(!email){
            return  res.status(400).json({
                'err':'Email Required'
                })
        }

        const existingData = await User.findOne({email})
        if(!existingData){
            return  res.status(400).json({
                'err':'User not exist'
                })
        }

        if(!existingData.verified){
            return  res.status(400).json({
                'err':'User not verified '
                })
            
        }

        const otpDetails = {
            email,
            subject: "Password Reset",
            message: "Verify your email with bellow code..!",
            duration: 1,
          };
          const createOtp =  sentOTP(otpDetails)
          res.status(200).json({
            message:"Reset Password OTP send on your mail box",
            createOtp

          })

    } catch (error) {

        res.status(400).json({
            error
            })
    }


}
const resetPass = async (req,res)=>{

    try {
        const {newPass,email} = req.body
        if(!(email && newPass)){
            return  res.status(400).json({
                'err':'Values are null'
                })
        }
        const existingData = await User.findOne({email})
        if(!existingData){
            return  res.status(400).json({
                'err':'User not exist'
                })
            
        }
        if(!existingData.verified){
            return  res.status(400).json({
                'err':'User not verified'
                })
        }
        if(newPass.length<8){
            return  res.status(400).json({
                'err':'Pass to short'
                })
        }
        const hashnewPass = await hashData(newPass)
       const updateUser = await User.updateOne({email},{password:hashnewPass})
        await deleteOTP({email})
        res.status(200).json({
            message:"Your Password Reset Done"
        })
    } catch (error) {
        res.status(400).json({
            error
            })
    }


}
const resetStudentPass = async (req,res)=>{

    try {
        const {newPass,email} = req.body
        if(!(email && newPass)){
            return  res.status(400).json({
                'err':'Values are null'
                })
        }
        const existingData = await Student_user.findOne({email})
        if(!existingData){
            return  res.status(400).json({
                'err':'User not exist'
                })
            
        }
        if(!existingData.verified){
            return  res.status(400).json({
                'err':'User not verified'
                })
        }
        if(newPass.length<8){
            return  res.status(400).json({
                'err':'Pass to short'
                })
        }
        const hashnewPass = await hashData(newPass)
       const updateUser = await Student_user.updateOne({email},{password:hashnewPass})
        await deleteOTP({email})
        res.status(200).json({
            message:"Your Password Reset Done"
        })
    } catch (error) {
        res.status(400).json({
            error
            })
    }


}
const resetStudentPassWithOTP = async (req,res)=>{

    try {
        const {email} = req.body
        if(!email){
            return  res.status(400).json({
                'err':'Email Required'
                })
        }

        const existingData = await Student_user.findOne({email})
        if(!existingData){
            return  res.status(400).json({
                'err':'User not exist'
                })
        }

        if(!existingData.verified){
            return  res.status(400).json({
                'err':'User not verified '
                })
            
        }

        const otpDetails = {
            email,
            subject: "Password Reset",
            message: "Verify your email with bellow code..!",
            duration: 1,
          };
          const createOtp =  sentOTP(otpDetails)
          res.status(200).json({
            message:"Reset Password OTP send on your mail box",
            createOtp

          })

    } catch (error) {

        res.status(400).json({
            error
            })
    }


}




module.exports = {sendPassOTP,resetPass,resetStudentPass, resetStudentPassWithOTP,verifyOTP };
