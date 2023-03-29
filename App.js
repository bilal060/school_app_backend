const express = require('express')
const mongoose = require('mongoose');
const router = require('./routes/user-routes');
const emailRouter = require('./routes/emailRoute');
const passRouter = require('./routes/forgotpassRoute');
const app = express();
const otpRouter = require('./routes/otpRoute')

const Studentrouter = require('./routes/studentRoute')
const Alertrouter = require('./routes/AlertRoute')

app.use(express.json())
app.use('',router)
app.use('',otpRouter)
app.use('',emailRouter)
app.use('',passRouter)
app.use('',Studentrouter)
app.use('',Alertrouter)




mongoose.connect('mongodb://localhost:27017/SchoolAppBackend')
.then(()=>{
    app.listen(4000,()=>{
        console.log('Connect and app listen on port 4000')
    })
}).catch((err)=>{
console.log(err);

})






