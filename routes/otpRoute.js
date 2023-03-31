const {sentOTP,verifyOTP} = require('../Controller/otpController')

const express = require('express')
var worldMapData = require('city-state-country');


const otpRouter = express.Router()


otpRouter.post('/otp',sentOTP) 
otpRouter.post('/otpverify',verifyOTP)


module.exports = otpRouter;