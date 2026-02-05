const i18n = require('i18n');
const path = require('path');

i18n.configure({
  locales: ['en', 'fa'],
  directory: path.join(__dirname),
  defaultLocale: 'en',
  autoReload: true,
  syncFiles: true,
  updateFiles: false,
});

module.exports = i18n;
