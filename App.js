const express = require('express')
const mongoose = require('mongoose');
const Userrouter = require('./routes/user-routes');
const emailRouter = require('./routes/emailRoute');
const passRouter = require('./routes/forgotpassRoute');
const app = express();
const cors = require("cors")
const otpRouter = require('./routes/otpRoute')
const countryRoute = require('./routes/countryRoute')
const env = require("dotenv").config(); 
const process = require('process');
const { PORT } = process.env;
const Studentrouter = require('./routes/studentRoute')
const Student_user_routes = require('./routes/Student_user-routes')
const Alertrouter = require('./routes/AlertRoute')
const eventRouter = require('./routes/eventsRoutes')
const faqrouter = require('./routes/faqRoute');
const FAQ = require('./Model/faq');
const whitelist = ["http://localhost:port"]
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true,
}
app.use(cors(corsOptions))

app.use(express.json())
//Routes
app.use('',Userrouter)
app.use('',otpRouter)
app.use('',emailRouter)
app.use('',passRouter)
app.use('',Studentrouter)
app.use('',Alertrouter)
app.use('',countryRoute)
app.use('',Student_user_routes)
app.use('',eventRouter)
app.use('',faqrouter)



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


// const faq = [
//     {
//         "question": "What is Node.js?",
//         "answer": "Node.js is a runtime environment for executing JavaScript code outside of a web browser."
//     },
//     {
//         "question": "What is Node.js?",
//         "answer": "Node.js is a runtime environment for executing JavaScript code outside of a web browser."
//     },
//     {
//         "question": "What is Node.js?",
//         "answer": "Node.js is a runtime environment for executing JavaScript code outside of a web browser."
//     },
//     {
//         "question": "What is Node.js?",
//         "answer": "Node.js is a runtime environment for executing JavaScript code outside of a web browser."
//     },
//     {
//         "question": "What is Node.js?",
//         "answer": "Node.js is a runtime environment for executing JavaScript code outside of a web browser."
//     },
//     {
//         "question": "What is Node.js?",
//         "answer": "Node.js is a runtime environment for executing JavaScript code outside of a web browser."
//     },
//     {
//         "question": "What is Node.js?",
//         "answer": "Node.js is a runtime environment for executing JavaScript code outside of a web browser."
//     },
//     {
//         "question": "What is Node.js?",
//         "answer": "Node.js is a runtime environment for executing JavaScript code outside of a web browser."
//     },
//     {
//         "question": "What is Node.js?",
//         "answer": "Node.js is a runtime environment for executing JavaScript code outside of a web browser."
//     }
    
//     ]
    

// const importData = async () => {
//     try {
//       await FAQ.create(faq);
//       console.log('Data successfully loaded!');
//     } catch (err) {
//       console.log(err);
//     }
//     process.exit();
//   };
// importData();

