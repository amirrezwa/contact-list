const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = express();
const port = 3000;

const contactController = require('./src/controllers/contactController');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Contact List API',
      version: '1.0.0',
      description: 'A simple Express API for managing contacts',
    },
  },
  apis: ['./src/controllers/contactController.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());

app.post('/contacts', contactController.createContact);
app.get('/contacts', contactController.getContacts);
app.put('/contacts/:id', contactController.updateContact);
app.delete('/contacts/:id', contactController.deleteContact);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});
