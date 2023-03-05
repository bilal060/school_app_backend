const {sentOTP,verifyOTP} = require('../Controller/otpController')

const express = require('express')

const otpRouter = express.Router()


otpRouter.post('/otp',sentOTP) 
otpRouter.post('/otpverify',verifyOTP)

module.exports = otpRouter;