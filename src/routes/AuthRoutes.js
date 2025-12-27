const express = require('express')
const router = express.Router()
const AuthControllers = require('../model/auth/auth.controllers')

router.use('/register',AuthControllers.register)

module.exports = router;