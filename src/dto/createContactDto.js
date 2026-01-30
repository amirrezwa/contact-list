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
];



module.exports = {
  createContactValidator,
};
