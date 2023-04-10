const FAQ = require('../Model/faq')

const faq = [
    {
        "question": "What is Node.js?",
        "answer": "Node.js is a runtime environment for executing JavaScript code outside of a web browser."
    },
    {
        "question": "What is Node.js?",
        "answer": "Node.js is a runtime environment for executing JavaScript code outside of a web browser."
    },
    {
        "question": "What is Node.js?",
        "answer": "Node.js is a runtime environment for executing JavaScript code outside of a web browser."
    },
    {
        "question": "What is Node.js?",
        "answer": "Node.js is a runtime environment for executing JavaScript code outside of a web browser."
    },
    {
        "question": "What is Node.js?",
        "answer": "Node.js is a runtime environment for executing JavaScript code outside of a web browser."
    },
    {
        "question": "What is Node.js?",
        "answer": "Node.js is a runtime environment for executing JavaScript code outside of a web browser."
    },
    {
        "question": "What is Node.js?",
        "answer": "Node.js is a runtime environment for executing JavaScript code outside of a web browser."
    },
    {
        "question": "What is Node.js?",
        "answer": "Node.js is a runtime environment for executing JavaScript code outside of a web browser."
    },
    {
        "question": "What is Node.js?",
        "answer": "Node.js is a runtime environment for executing JavaScript code outside of a web browser."
    }
    
    ]
    

const importData = async () => {
    try {
      await FAQ.create(faq);
      console.log('Data successfully loaded!');
    } catch (err) {
      console.log(err);
    }
    process.exit();
  };
  
  exports.importData = importData;





// // Define a schema for image galleries
// const gallerySchema = new mongoose.Schema({
//   imageUrl: String,
//   title: String,
//   description: String,
//   date: Date
// });

// // Create a model for image galleries
// const Gallery = mongoose.model('Gallery', gallerySchema);

// // Define a route that retrieves image galleries
// app.get('/galleries', async (req, res) => {
//   // Get the start and end dates from the query parameters
//   const startDate = moment(req.query.start_date);
//   const endDate = moment(req.query.end_date);

//   // Find all galleries that have a date between the start and end dates
//   const galleries = await Gallery.find({
//     date: {
//       $gte: startDate.toDate(),
//       $lt: endDate.toDate()
//     }
//   });

//   // Return the filtered galleries as JSON
//   res.json(galleries);
// });


  