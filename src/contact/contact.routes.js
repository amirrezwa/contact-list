const express = require('express');
const router = express.Router();
const {
    createContact,
    getContacts,
    searchContactByPhone,
    updateContact,
    deleteContact,
} = require('./contact.controller');
const { checkRole, isOwnerOrAdmin, auth } = require('../middlewares/insex');
const validate = require('../middlewares/validate');
const { searchContactValidator,
        createContactValidator,
        updateContactValidator
    } = require('../dto/index');

router.post('/', auth, createContactValidator, checkRole('USER', 'ADMIN'), validate, createContact);
router.get('/', auth, getContacts);
router.get('/searchByPhoneNumber', auth, checkRole('USER', 'ADMIN'), searchContactValidator, validate, searchContactByPhone);
router.put('/:id', auth, isOwnerOrAdmin, updateContactValidator, validate, updateContact);
router.delete('/:id', auth, isOwnerOrAdmin, deleteContact);

module.exports = router;
