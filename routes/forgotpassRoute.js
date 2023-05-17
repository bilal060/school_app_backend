const express = require('express')
const {sendPassOTP,resetPass , resetStudentPass, resetStudentPassWithOTP} = require('../Controller/forgotpassController')
const passRouter = express.Router()
passRouter.post('/resetPassWithOTP',sendPassOTP)
passRouter.post('/resetStudentPassWithOTP',resetStudentPassWithOTP)
passRouter.post('/reset',resetPass)
passRouter.post('/resetStudentPass',resetStudentPass)
module.exports = passRouter;
