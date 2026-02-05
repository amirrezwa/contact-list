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

module.exports = {
  register,
  login,
};
