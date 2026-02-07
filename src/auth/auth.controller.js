const authService = require('./auth.service');
const i18n = require('../../i18n');

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags:
 *       - Auth
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
const register = async (req, res) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json({
      message: i18n.__('User_Registered'),
      user
    });
  } catch (err) {
      res.status(400).json({ 
        message: i18n.__(err.message), 
    });
  }
};

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
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
const login = async (req, res) => {
  try {
    const result = await authService.login(req.body);
    res.json({
      message: i18n.__('Login_Successfull'),
      result
    });
  } catch (err) {
    res.status(400).json({ 
      message: i18n.__(err.message),
    });
  }
};

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Refresh access token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: New access token generated
 *       401:
 *         description: Invalid or expired refresh token
 */
const refresh = async (req, res) => {
  try {
    const result = await authService.refreshToken(req.body);
    res.json({
      message: i18n.__('Token_Refreshed'),
      result
    });
  } catch (err) {
    res.status(401).json({ 
      message: i18n.__(err.message),
    });
  }
};

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Logout user
 *     description: Logs out the user and removes the refresh token from the database.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Logout successful"
 *       400:
 *         description: Bad Request - Token not valid or missing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No token provided"
 *       401:
 *         description: Unauthorized - Invalid or expired token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 */

const logout = async (req, res) => {
  try {
    console.log('Logging out user', req.user.id); 
    await authService.logout(req.user.id);  
    res.json({
      message: i18n.__('Logout_Successfull'),
    });
  } catch (err) {
    console.error('Logout error:', err.message);  
    res.status(400).json({
      message: i18n.__(err.message),
    });
  }
};

module.exports = {
  register,
  login,
  refresh,
  logout,
};
