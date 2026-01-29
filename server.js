const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = express();
const port = 3000;

const contactController = require('./src/controllers/contactController');

// Swagger options
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Contact List API',
      version: '1.0.0',
      description: 'A simple Express API for managing contacts',
    },
  },
  // مسیرهایی که Swagger باید داکیومنت کنه
  apis: ['./src/controllers/contactController.js'],
};

// Swagger setup
const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Middleware برای نمایش Swagger UI در `/api-docs`
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware برای خواندن body به فرمت JSON
app.use(express.json());

// روت‌ها
app.post('/contacts', contactController.createContact);
app.get('/contacts', contactController.getContacts);
app.put('/contacts/:id', contactController.updateContact);
app.delete('/contacts/:id', contactController.deleteContact);

// شروع سرور
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});
