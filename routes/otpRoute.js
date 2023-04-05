const {sentOTP,verifyOTP} = require('../Controller/otpController')

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
   console.log(err)
}
})
otpRouter.post('/otpverify',async (req, res) => {
   try { 
     let { email, otp } = req.body;
     if (!(email, otp)) {
       throw Error("Your Email and otp values required");
     }
     const OTPverify = await verifyOTP({email, otp})
     res.status(201).json({ 
       OTPverify,
    });}catch(err){
      res.status(500).json({ 
         message:"internal Server Error"
      });
      console.log(err)
   }
   })


module.exports = otpRouter;