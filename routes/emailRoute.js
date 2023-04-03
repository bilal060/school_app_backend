const { Router } = require('express')
const express = require('express')
const {verifyEmailwithOTP ,verifyEmailUser,verifyEmailStudetUser} = require('../Controller/verifyemailController')

const emailRouter = express.Router()
emailRouter.post('/verifyEmailWithOTP',verifyEmailwithOTP)
emailRouter.post('/verifyUser',verifyEmailUser)
emailRouter.post('/verifyStudetUser',verifyEmailStudetUser)

module.exports = emailRouter;