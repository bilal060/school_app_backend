const { Router } = require('express')
const express = require('express')
const {sendPassOTP,resetPass} = require('../Controller/forgotpassController')
const passRouter = express.Router()
passRouter.post('/resetPassWithOTP',sendPassOTP)
passRouter.post('/reset',resetPass)
module.exports = passRouter;