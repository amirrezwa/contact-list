const { body } = require('express-validator');

const updateContactValidator = [
    body('name')
      .optional()
      .isString().withMessage('Name must be a string'),
    body('email')
      .optional()
      .isEmail().withMessage('Email must be valid'),
    body('phone')
      .optional()
      .isMobilePhone().withMessage('Phone must be valid'),
  ];

  module.exports = {
    updateContactValidator,
  };