const express = require('express')
const router = express.Router()
const AuthControllers = require('../model/auth/auth.controllers')

router.post('/register',AuthControllers.register)
router.post('/login',AuthControllers.login)
router.post('/logout',AuthControllers.logout)
router.post('/refresh',AuthControllers.refresh)
router.post('/forgotPassword',AuthControllers.forgotPassword)
router.post('/reset-Password/:token',AuthControllers.resetPassword)
module.exports = router;