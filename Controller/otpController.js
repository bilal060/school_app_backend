const OTP = require("../Model/otp");
const env = require("dotenv").config();
const generateOTP = require("../utils/generateOTP");
const { hashData, verifyHashedData } = require("../Middleware/hashDataHandler");
const sendEmail = require("../utils/sendEmail");
const User = require("../Model/User");
const { AUTH_EMAIL } = process.env;

const sentOTP = async (req, res) => {
  const { email, duration = 1 } = req.body;
  try {
    if (!(email)) {
      throw Error("provided values of email , message , subject");
    }

    //clear old record
    await OTP.deleteOne({ email });
    const generateotp = await generateOTP();
    const mailOptions = {
      from: AUTH_EMAIL,
      to: email,
      subject:'OTP From School_APP',
      html: `<p>${generateotp}</p><br> <p>${duration}</p> `,
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
    console.log(createOTP);
    res.status(200).json(createOTP);
  } catch (error) {
    throw error;
  }
};

const verifyOTP = async (req, res) => {
  try { 
    let { email, otp } = req.body;
    if (!(email, otp)) {
      throw Error("Your Email and otp values required");
    }
    const otpMatched = await OTP.findOne({ email });
    if (!otpMatched) {
      throw Error("No OTP");
    }

    const { expireAT } = otpMatched;
    if (expireAT < Date.now()) {
      await OTP.deleteOne({ email });
      throw Error("Your OTP Expired");
    }

    const hashotp = otpMatched.otp;
    const validotp = await verifyHashedData(otp, hashotp);
    res.status(200).json({
      validotp,
    });
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

module.exports = { sentOTP, verifyOTP, deleteOTP };
