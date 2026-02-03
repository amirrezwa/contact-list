const { body } = require('express-validator');

const createContactValidator = [
  body('name')
    .notEmpty().withMessage('Name is required')
    .isString().withMessage('Name must be a string'),
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Email must be valid'),
  body('phone')
    .notEmpty().withMessage('Phone is required')
    .isMobilePhone().withMessage('Phone must be valid'),
  body('role')
    .optional()
    .isIn(['USER', 'ADMIN'])
    .withMessage('Role must be USER or ADMIN'),
];



module.exports = {
  createContactValidator,
};
