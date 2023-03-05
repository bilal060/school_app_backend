const { Router } = require('express')
const express = require('express')
const {sendPassOTP,resetPass} = require('../Controller/forgotpaddController')
const passRouter = express.Router()
passRouter.post('/passreset',sendPassOTP)
passRouter.post('/reset',resetPass)
module.exports = passRouter;