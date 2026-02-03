const express = require('express');
const router = express.Router();

const {
  createContact,
  getContacts,
  searchContactByPhone,
  updateContact,
  deleteContact,
} = require('./contact.controller');

const auth = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate');
const { searchContactValidator,
        createContactValidator,
        updateContactValidator
    } = require('../dto/index');

router.post('/', auth, createContactValidator, validate, createContact);
router.get('/', auth, getContacts);
router.get('/searchByPhoneNumber', auth, searchContactValidator, validate, searchContactByPhone);
router.put('/:id', auth, updateContactValidator, validate, updateContact);
router.delete('/:id', auth, deleteContact);

module.exports = router;
