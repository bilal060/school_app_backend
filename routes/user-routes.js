const express = require('express');
const { getAllusers, userSignUp, updateUser, authUser,deleteUser, getUser, UpdateUserSetting, currentUser,userLogin } = require('../Controller/user-controller');
const auth = require('../Middleware/auth');
const { upload } = require('../Middleware/uploadImage');
const router = express.Router();


router.get('/getUsers',getAllusers)
router.post('/signup',userSignUp)
router.post('/login',userLogin)
 router.get('getUser/:id',getUser)
 router.put('updateUser/:id',updateUser)
 router.delete('deleteUser/:id',deleteUser)
 router.patch('/UpdateUserSetting/:id', upload.single('image'),UpdateUserSetting);







module.exports =router;