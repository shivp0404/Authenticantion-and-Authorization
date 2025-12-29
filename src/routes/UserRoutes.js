const express = require('express')
const router = express.Router()
const userController = require('../model/userprofile/profile.controllers')
const authMiddleware = require('../middleware/authmiddleware')

router.use(authMiddleware)

router.get('/profile',userController.getprofile)

module.exports = router;