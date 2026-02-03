require('dotenv').config();
const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const authRoutes = require('./src/auth/auth.routes');
const contactRouter = require('./src/contact/contact.routes');

const app = express();
const PORT = 3000;

app.use(express.json());

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
    './src/auth/auth.routes.js',
  ],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use('/auth', authRoutes);
app.use('/contacts', contactRouter);
app.use('/contact-api', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/contact-api`);
});
