const express = require('express');
const app = express();
const PORT = 3000;

const contactController = require('./src/controllers/contactController');

// Middleware برای خواندن body به فرمت JSON
app.use(express.json());

// روت‌ها
app.post('/contacts', contactController.createContact);
app.get('/contacts', contactController.getContacts);
app.put('/contacts/:id', contactController.updateContact);
app.delete('/contacts/:id', contactController.deleteContact);

// شروع سرور
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
