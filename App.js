const express = require('express')
const mongoose = require('mongoose');
const Crouter = require('./routes/currentuser');
const router = require('./routes/user-routes');
const emailRouter = require('./routes/emailRoute');
const passRouter = require('./routes/forgotpassRoute');
const app = express();
const otpRouter = require('./routes/otpRoute')
app.use(express.json())
app.use('',router)
app.use('',otpRouter)
app.use('',emailRouter)
app.use('',passRouter)
mongoose.connect('mongodb://localhost:27017/dpoBackendDB')
.then(()=>{
    app.listen(4000,()=>{
        console.log('Connect')
    })
}).catch((err)=>{
console.log(err);

})




