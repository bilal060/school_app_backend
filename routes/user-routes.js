const express = require('express');
const { getAllusers, userSignUp, updateUser, authUser,deleteUser, getUser, loginUser, currentUser,userLogin } = require('../Controller/user-controller');
const auth = require('../Middleware/auth')
const router = express.Router();

// router.get('',getAllusers)
router.post('/signup',userSignUp)
router.post('/login',userLogin)
router.get('/privatedata',auth, authUser)
// router.get('/:id',getUser)
// router.put('/:id',updateUser)
// router.delete('/:id',deleteUser)
// router.get('',loginUser)






module.exports =router;