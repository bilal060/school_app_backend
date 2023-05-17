const express = require('express')
const {sendPassOTP,resetPass , resetStudentPass, sendStudentPassOTP} = require('../Controller/forgotpassController')
const passRouter = express.Router()
passRouter.post('/resetPassWithOTP',sendPassOTP)
passRouter.post('/resetStudentPassWithOTP',sendStudentPassOTP)
passRouter.post('/reset',resetPass)
passRouter.post('/resetStudentPass',resetStudentPass)
module.exports = passRouter;
