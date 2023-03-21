const nodemailer = require('nodemailer')
const env = require('dotenv').config()
const {AUTH_EMAIL, AUTH_PASS } = process.env


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sh.hafizhasnain@gmail.com',
    pass: 'kmskfcjdnewqidbl'
  }
});

transporter.verify((success,err)=>{

  if(err){
      console.log(err)
  }else{
      console.log('Ready for message ')
      console.log(success)
  }
  
  
  })
const sendEmail = async (mailOptions)=>{
 await transporter.sendMail(mailOptions, function(error, info){
    if (error) {
   console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      // do something useful
    }
  });


}
module.exports = sendEmail 