const { Router } = require('express')
const express = require('express')
const {verifyEmailwithOTP ,verifyEmailUser} = require('../Controller/verifyemailController')

const emailRouter = express.Router()

emailRouter.post('/verifyEmailWithOTP',verifyEmailwithOTP)
emailRouter.post('/verifyUser',verifyEmailUser)

module.exports = emailRouter;