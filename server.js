const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const validate = require('./src/middlewares/validate');
const { createContactValidator } = require('./src/dto/createContactDto');
const { searchContactValidator } = require('./src/dto/searchContactdto');
const { updateContactValidator } = require('./src/dto/updateContacDto');
const app = express();
const PORT = 3000;

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

app.use('/contact-api', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());

app.post('/contacts',createContactValidator,validate, contactController.createContact);
app.get('/contacts', contactController.getContacts);
app.get('/contacts/search', searchContactValidator, validate, contactController.searchContactByPhone);
app.put('/contacts/:id', updateContactValidator, validate, contactController.updateContact);
app.delete('/contacts/:id', contactController.deleteContact);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/contact-api`);
});
