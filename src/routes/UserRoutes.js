const express = require('express')
const router = express.Router()
const userController = require('../model/userprofile/profile.controllers')
const authMiddleware = require('../middleware/authmiddleware')
const authorization = require('../middleware/authorization')
router.use(authMiddleware)




/**
 * @swagger
 * /user/profile:
 *   get:
 *     summary: Get logged-in user profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile data
 *       401:
 *         description: Unauthorized
 */

router.get('/profile',authorization(["user","admin"]),userController.getprofile)
/**
 * @swagger
 * /user/alluser:
 *   get:
 *     summary: Get all users (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *       403:
 *         description: Forbidden
 */
router.get('/alluser',authorization(["admin"]),userController.getalluser)

/**
 * @swagger
 * /user/updatePassword:
 *   put:
 *     summary: Update password for logged-in user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             oldpassword: password123
 *             newpassword: NewPass123
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       401:
 *         description: Unauthorized
 */
router.put('/updatePassword',userController.updatePassword)
module.exports = router;