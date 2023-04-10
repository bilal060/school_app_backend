const { Router } = require('express')
const express = require('express')
const {verifyEmailwithOTP ,verifyEmailUser,verifyEmailStudetUser} = require('../Controller/verifyemailController')

const emailRouter = express.Router()
emailRouter.post('/verifyEmailWithOTP',async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        throw Error("Email Value required");
      }
      const verify = await verifyEmailwithOTP({email})
      res.status(201).json({ 
        verify,
     });
    }catch(error)
      {
        res.status(500).json({ 
            message:"internal Server Error"
         });
         console.log(error)
      }})

emailRouter.post('/verifyUser',async (req, res) => {
    try {
      const { email, otp } = req.body;
      if (!(email, otp)) {
        throw Error("Values required ");
      }
      const ValidUser = await  verifyEmailUser({email,otp})
        res.status(200).json({ 
          ValidUser
       });
      }catch(err){
        res.status(500).json({ 
            message:"internal Server Error"
         });
         console.log(err)
      }})
emailRouter.post('/verifyStudetUser' , async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!(email, otp)) {
      throw Error("Values required ");
    }
    const ValidUser = await  verifyEmailStudetUser({email,otp})
      res.status(200).json({ 
        ValidUser
     });
    }catch(err){
      res.status(500).json({ 
          message:"internal Server Error"
       });
       console.log(err)
    }})

module.exports = emailRouter;