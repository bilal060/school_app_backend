const {sentOTP,verifyOTP,resendOTP,resendStudentOTP} = require('../Controller/otpController')
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const express = require('express')
var worldMapData = require('city-state-country');


const otpRouter = express.Router()


otpRouter.post('/otp', async(req, res) => {
   try{
    const { email, subject, message, duration = 1 } = req.body;
    const createOTP = await   sentOTP( { email, subject, message, duration} )
    res.status(201).json({ 
      createOTP,
   });
}catch(err){
   res.status(500).json({ 
      message:"internal Server Error"
   });
}
})
otpRouter.post('/otpverify',catchAsync( async (req, res,next) => {
     let { email, otp } = req.body;
     if (!(email, otp)) {
      return  next(new AppError('Email or Otp Value required', 400));
     }
     const OTPverify = await verifyOTP({email, otp})
     res.status(201).json({ 
      'verify':true,
    })
   }))
otpRouter.post('/resendOTP',resendOTP)
otpRouter.post('/resendStudentOTP',resendStudentOTP)

module.exports = otpRouter;