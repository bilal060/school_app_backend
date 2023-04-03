const express = require('express');
const { getAllusers, userSignUp, updateUser, authUser,deleteUser, getUser, loginUser, currentUser,userLogin } = require('../Controller/user-controller');
const auth = require('../Middleware/auth')
const router = express.Router();

router.get('/getUsers',getAllusers)
router.post('/signup',userSignUp)
router.post('/login',userLogin)
// router.get('/privatedata',auth, authUser)
 router.get('getUser/:id',getUser)
 router.put('updateUser/:id',updateUser)
 router.delete('deleteUser/:id',deleteUser)
// router.get('',loginUser)






module.exports =router;