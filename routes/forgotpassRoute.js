const express = require('express')
const {sendPassOTP,resetPass , resetStudentPass, resetStudentPassWithOTP,verifyOTP} = require('../Controller/forgotpassController')
const passRouter = express.Router()
passRouter.post('/resetPassWithOTP',sendPassOTP)
passRouter.post('/resetStudentPassWithOTP',resetStudentPassWithOTP)
passRouter.post('/reset',resetPass)
passRouter.post('/verifyOTP',verifyOTP)
module.exports = passRouter;
