const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const contactController = require('./src/contact/controllers/contactController');

const app = express();
const PORT = 3000;

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'Contact List API', version: '1.0.0', description: 'A simple Express API for managing contacts' },
  },
  apis: ['./src/contact/controllers/contactController.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/contact-api', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());

app.use('/contacts', contactController.router);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/contact-api`);
});
