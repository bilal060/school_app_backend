const express = require('express');
const {getAllStudent_user,
    studentSignUp,
   updateStudent_user,
   deleteStudent_User,
   Student_userLogin} = require('../Controller/Student_user-controller');
const auth = require('../Middleware/auth')
const Student_user_routes = express.Router();

// router.get('',getAllusers)
Student_user_routes.post('/studentSignUp',studentSignUp)
 Student_user_routes.post('/studentLogin',Student_userLogin)
// Student_user_routes.get('/privatedata',auth, authUser)
Student_user_routes.get('/getAllLoginStudent',getAllStudent_user)
// router.put('/:id',updateUser)
// router.delete('/:id',deleteUser)
// router.get('',loginUser)






module.exports =Student_user_routes;