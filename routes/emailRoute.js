const { Router } = require('express')
const express = require('express')
const {verifyEmailwithOTP ,verifyEmailUser,verifyEmailStudetUser} = require('../Controller/verifyemailController')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

const emailRouter = express.Router()
emailRouter.post('/verifyEmailWithOTP',catchAsync( async (req, res,next) => {
     const { email } = req.body;
      if (!email) {
        return  next(new AppError('Email Value required', 400));
      }
      const verify = await verifyEmailwithOTP({email})
      res.status(201).json({ 
        verify,
     });
   }))

emailRouter.post('/verifyUser',catchAsync( async (req, res,next) => {
      const { email, otp } = req.body;
      if (!(email, otp)) {
        return  next(new AppError('Email or Otp Value required', 400));
      }
      const ValidUser = await  verifyEmailUser({email,otp})
        res.status(200).json({ 
          ValidUser
       });
      }))

emailRouter.post('/verifyStudetUser' ,catchAsync( async (req, res,next) => {

    const { email, otp } = req.body;
    if (!(email, otp)) {
      return  next(new AppError('Email or Otp Value required', 400));
    }
    const ValidUser = await  verifyEmailStudetUser({email,otp})
      res.status(200).json({ 
        ValidUser
     });
    }))

module.exports = emailRouter;