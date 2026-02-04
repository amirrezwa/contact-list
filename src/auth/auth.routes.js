const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');
const { registerValidator, loginValidator } = require('../dto/auth.dto');
const validate = require('../middlewares/validate');

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user (USER role)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered
 *       400:
 *         description: Bad Request
 */
router.post('/register', registerValidator, validate, authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Logged in successfully
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', loginValidator, validate, authController.login);

module.exports = router;
