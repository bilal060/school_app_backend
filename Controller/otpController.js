const OTP = require("../Model/otp");
const env = require("dotenv").config();
const generateOTP = require("../utils/generateOTP");
const { hashData, verifyHashedData } = require("../Middleware/hashDataHandler");
const sendEmail = require("../utils/sendEmail");
const User = require("../Model/User");
const Student_user = require("../Model/Student_user");
const { AUTH_EMAIL } = process.env;


const sentOTP = async ({ email, subject, message, duration = 1 }) => {
  try { 
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
const verifyOTP = async ({email ,otp}) => {
  try { 
    const otpMatched = await OTP.findOne({ email });
    if (!otpMatched) {
      throw Error("No OTP Matched By this email");
    }

    const { expireAT } = otpMatched;
    if (expireAT < Date.now()) {
      await OTP.deleteOne({ email });
      return  Error("Your OTP Expired");
    }

    const hashotp = otpMatched.otp;
    const validotp = await verifyHashedData(otp, hashotp);
    return validotp
  } catch (error) {
    throw error;
  }
};
const deleteOTP = async ({email}) => {
  try {
    if(!email){
      throw Error('Email not valid Please Check ')
    }
    await OTP.deleteOne({ email });
  } catch (error) {
    throw error;
  }
};
const verifyEmail =  async(req,res)=>{
    try {

        const {email} = req.body;
        if (!email) {
            throw Error("Email Value required");
          }
    const existingData = await User.findOne({ email });

  if (!existingData) {
            throw Error("email not found");
          }
          const otpDetails ={
                email,
                subject:'Email Verification',
                message:'Verify your email with bellow code..!',
                duration:1
            }

            const createdOTP = await sentOTP() 
        
    } catch (error) {
        
    }
  
    
}
const resendOTP = async (req,res)=>{

  try {
      const {email} = req.body
      if(!email){
          return res.status(400).json({
            message:'Email Required'
          }) 
      }
      const existingData = await User.findOne({email})
      if(!existingData){
        return res.status(400).json({
          message:'User not exist'
        }) 
      }
      const otpDetails = {
          email,
          subject: "Verify User OTP",
          message: "Verify your email with bellow code..!",
          duration: 1,
        };
        const createOtp =  sentOTP(otpDetails)
        res.status(200).json({
          message:"OTP send on your mail box",

        })

  } catch (error) {

   res.status(400).json({
      message:error
    }) 
  }


}
const resendStudentOTP = async (req,res)=>{

  try {
      const {email} = req.body
      if(!email){
          return res.status(400).json({
            message:'Email Required'
          }) 
      }
      const existingData = await Student_user.findOne({email})
      if(!existingData){
        return res.status(400).json({
          message:'User not exist'
        }) 
      }
      const otpDetails = {
          email,
          subject: "Verify User OTP",
          message: "Verify your email with bellow code..!",
          duration: 1,
        };
        const createOtp =  sentOTP(otpDetails)
        res.status(200).json({
          message:"OTP send on your mail box",

        })

  } catch (error) {

   res.status(400).json({
      message:error
    }) 
  }


}
module.exports = { sentOTP, verifyOTP, deleteOTP ,resendOTP,resendStudentOTP};
