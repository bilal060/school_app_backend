const express = require('express')
const mongoose = require('mongoose');
const Userrouter = require('./routes/user-routes');
const emailRouter = require('./routes/emailRoute');
const passRouter = require('./routes/forgotpassRoute');
const app = express();
const otpRouter = require('./routes/otpRoute')
const countryRoute = require('./routes/countryRoute')
const env = require("dotenv").config(); 
const process = require('process');
const { PORT } = process.env;
const Studentrouter = require('./routes/studentRoute')
const Alertrouter = require('./routes/AlertRoute')

app.use(express.json())
app.use('',Userrouter)
app.use('',otpRouter)
app.use('',emailRouter)
app.use('',passRouter)
app.use('',Studentrouter)
app.use('',Alertrouter)
app.use('',countryRoute)



mongoose.set('strictQuery', true)
mongoose.connect('mongodb://localhost:27017/SchoolAppBackend',{
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false
})
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`Connect With DB or App listen on port ${PORT}`)
    })
}).catch((err)=>{
console.log(err);

})



