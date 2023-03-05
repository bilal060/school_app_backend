const express = require('express')
const creatUser = require('../Controller/userController')
const router = express.Router()
router.post('' ,creatUser )


module.exports = router;