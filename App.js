const express = require('express')

const mongoose = require('mongoose');
const Userrouter = require('./routes/user-routes');
const emailRouter = require('./routes/emailRoute');
const passRouter = require('./routes/forgotpassRoute');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
const fs = require('fs')
const path = require('path');
const uploadPath = path.join(__dirname, 'uploads', 'books');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}
const cors = require("cors")
app.use(cors())
const otpRouter = require('./routes/otpRoute')
const countryRoute = require('./routes/countryRoute')
const process = require('process');
const { PORT,DB } = process.env;
const Studentrouter = require('./routes/studentRoute')
const Student_user_routes = require('./routes/Student_user-routes')
const Alertrouter = require('./routes/AlertRoute')
const eventRouter = require('./routes/eventsRoutes')
const faqrouter = require('./routes/faqRoute');
const Booksrouter = require('./routes/bookRoutes');
const imageGalleryrouter = require('./routes/imageGallery');
// const PersonRoute = require('./routes/personRoute');


app.use('/uploads', express.static(path.join('uploads', '/')));
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
app.use('',Booksrouter)
app.use('',imageGalleryrouter)
// app.use('',PersonRoute)



mongoose.set('strictQuery', true)
mongoose.connect(DB,{
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




