const express = require('express');
const router = express.Router();
const {
  register,
  login,
} = require('./auth.controller');
const { registerValidator, loginValidator } = require('../dto/auth.dto');
const validate = require('../middlewares/validate');

router.post('/register', registerValidator, validate, register);
router.post('/login', loginValidator, validate, login);

module.exports = router;
