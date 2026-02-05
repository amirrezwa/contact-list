const i18n = require('../../i18n');

const setLanguage = (req, res, next) => {
  const lang = req.headers['accept-language'] || 'en';
  i18n.setLocale(req, lang);
  i18n.setLocale(res, lang);
  next();
};

module.exports = setLanguage;
