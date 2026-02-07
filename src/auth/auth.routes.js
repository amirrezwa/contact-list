const express = require('express');
const router = express.Router();
const {
  register,
  login,
  refresh,
  logout,
} = require('./auth.controller');
const { registerValidator, loginValidator, refreshTokenValidator } = require('../dto');
const { auth, validate } = require('../middlewares/index');

router.post('/register', registerValidator, validate, register);
router.post('/login', loginValidator, validate, login);
router.post('/refresh', refreshTokenValidator, validate, refresh);
router.post('/logout', auth, logout);

module.exports = router;
