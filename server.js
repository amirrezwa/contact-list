require('dotenv').config();
const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { router: authRouter } = require('./src/auth');
const { router: contactRouter } = require('./src/contact');
const setLanguage = require('./src/middlewares/setLanguage');
const i18n = require('./i18n');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(i18n.init);
app.use(setLanguage);

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Contact List API',
      version: '1.0.0',
      description: 'A simple Express API for managing contacts',
    },
  },
  apis: [
    './src/contact/contact.controller.js',
    './src/auth/auth.controller.js',
  ],
};


app.use((req, res, next) => {
  const lang = req.headers['accept-language'] || 'en';
  i18n.setLocale(req, lang);
  next();
});

app.get('/', (req, res) => {
  res.send(res.__('hello'));
});


const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use('/auth', authRouter);
app.use('/contacts', contactRouter);
app.use('/contact-api', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/contact-api`);
});
