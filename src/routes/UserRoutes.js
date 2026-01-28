const express = require('express')
const router = express.Router()
const userController = require('../model/userprofile/profile.controllers')
const authMiddleware = require('../middleware/authmiddleware')
const authorization = require('../middleware/authorization')
router.use(authMiddleware)

router.get('/profile',authorization(["user","admin"]),userController.getprofile)
router.get('/alluser',authorization(["admin"]),userController.getalluser)
module.exports = router;