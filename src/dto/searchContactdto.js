const { param, query } = require('express-validator');

const searchContactValidator = [
    query('phone')
      .optional()
      .isMobilePhone().withMessage('Phone must be valid'),
  ];
  module.exports = {
    searchContactValidator,
  };
   