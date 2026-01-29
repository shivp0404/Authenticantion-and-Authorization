const express = require('express')
const router = express.Router()
const AuthControllers = require('../model/auth/auth.controllers')

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication APIs
 */

/**

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: user1
 *             email: user1@example.com
 *             password: UserPassword123
 *             role: user
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post('/register',AuthControllers.register)
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user and return JWT
 *     tags: [Auth]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          example:
 *            email: user1@example.com
 *            password: UserPassword123
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post('/login',AuthControllers.login)
/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout user (HTTP-only cookie)
 *     description: Clears the refresh token cookie to log the user out
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout successful
 */
router.post('/logout',AuthControllers.logout)
/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Refresh access token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Token refreshed
 *       401:
 *         description: Invalid refresh token
 */
router.post('/refresh',AuthControllers.refresh)
/**
 * @swagger
 * /auth/forgotPassword:
 *   post:
 *     summary: Send password reset email
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             email: user@example.com
 *     responses:
 *       200:
 *         description: Password reset email sent
 */
router.post('/forgotPassword',AuthControllers.forgotPassword)
router.post('/reset-Password/:token',AuthControllers.resetPassword)
module.exports = router;