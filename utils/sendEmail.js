const nodemailer = require('nodemailer')
const env = require('dotenv').config()
const {AUTH_EMAIL, AUTH_PASS } = process.env


let transport = nodemailer.createTransport({

    host:"smtp-mail.outlook.com",
    auth:{
        user:AUTH_EMAIL,
        pass:AUTH_PASS
    }
})

transport.verify((success,err)=>{

if(err){
    console.log(err)
}else{
    console.log('Ready for message ')
    console.log(success)
}


})

const sendEmail = async (mailOptions)=>{

try {
    await transport.sendMail(mailOptions)
    return
} catch (error) {
    throw error
}

}
module.exports = sendEmail 