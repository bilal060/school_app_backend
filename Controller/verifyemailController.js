const OTP = require("../Model/otp");
const env = require("dotenv").config();
const generateOTP = require("../utils/generateOTP");
const { hashData, verifyHashedData } = require("../Middleware/hashDataHandler");
const sendEmail = require("../utils/sendEmail");
const User = require("../Model/User");
const { AUTH_EMAIL } = process.env;
const { deleteOTP } = require("../Controller/otpController");

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

const verifyEmailwithOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw Error("Email Value required");
    }
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
    res.status(200).json(createdOTP);
  } catch (error) {
    throw error;
  }
};

const verifyOTP = async ({ email, otp }) => {
  try {
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
    return validotp;
  } catch (error) {
    throw error;
  }
};

const verifyEmailUser = async (req, res) => {
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
    await User.updateOne({email},{verified:true})
    await deleteOTP({email});
    res.status(200).json({
      email,
      verified:true
    })
  } catch (error) 
  {
    throw error
  }
};

module.exports = { verifyEmailwithOTP ,verifyEmailUser};
