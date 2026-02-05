const AuthService = require('./auth.service');
const ContactController = require('./auth.controller');
const router = require('./auth.routes');
const AuthValidate = require('./auth.validators');

module.exports = {
AuthService,
ContactController,
AuthValidate,
router,
};
