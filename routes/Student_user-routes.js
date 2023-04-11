const express = require("express");
const {
    getAllStudent_user,
    studentSignUp,
    updateStudent_user,
    deleteStudent_User,
    uploadImg,
    Student_userLogin,
} = require("../Controller/Student_user-controller");
const Student_user =require('../Model/Student_user')
const { upload } = require('../Middleware/uploadImage');
const auth = require("../Middleware/auth");
const Student_user_routes = express.Router();

Student_user_routes.post("/studentSignUp", studentSignUp);
Student_user_routes.post("/studentLogin", Student_userLogin);
Student_user_routes.get("/getAllLoginStudent", getAllStudent_user);
Student_user_routes.patch("/UpdateStudentUser/:id", updateStudent_user);

Student_user_routes.post(
    "/students/:id/image",
    uploadImg
);


module.exports = Student_user_routes;




//     try {
//       // Find the image document for the user
//       const image = await Image.findOne({ user: req.params.id });
  
//       // Update the image document with the new file details
//       image.filename = req.file.filename;
//       image.filepath = req.file.path;
//       await image.save();
  
//       // Send a success response to the client
//       res.status(200).send('File updated successfully.');
//     } catch (err) {
//       // If an error occurred, send an error response to the client
//       console.error(err);
//       res.status(500).send('An error occurred while updating the file.');
//     }
//   });
  