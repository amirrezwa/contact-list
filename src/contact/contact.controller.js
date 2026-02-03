const express = require('express');
const router = express.Router();
const contactService = require('./contact.service');
const validate = require('../middlewares/validate');
const { updateContactValidator,
        searchContactValidator,
        createContactValidator
      } = require('../dto/index');
const auth = require('../middlewares/auth.middleware');

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Create a new contact
 *     security:
 *       - BearerAuth: []
 *     description: Create a new contact with name, email, and phone
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contact created
 *       400:
 *         description: Bad Request
 */
const createContact = async (req, res) => {
  const { name, email, phone } = req.body;
  try {
    const newContact = await contactService.createContact({ name, email, phone });
    res.status(201).json(newContact);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create contact', error: error.message });
  }
};

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Get all contacts
 *     responses:
 *       200:
 *         description: A list of contacts
 *       401:
 *         description: Unauthorized
 */
const getContacts = async (req, res) => {
  try {
    const contacts = await contactService.getContacts();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch contacts', error: error.message });
  }
};

/**
 * @swagger
 * /contacts/searchByPhoneNumber:
 *   get:
 *     summary: Search contacts
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: phone
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact found
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Contact not found
 */
const searchContact = async (req, res) => {
  try {
    const { phone } = req.query;
    const result = await contactService.searchContact({ phone });
    if (!result.length) return res.status(404).json({ message: 'Contact not found' });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Failed to search contacts', error: error.message });
  }
};

/**
 * @swagger
 * /contacts/{id}:
 *   put:
 *     summary: Update a contact
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contact updated
 *       404:
 *         description: Contact not found
 */
const updateContact = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  const updatedContact = await contactService.updateContact(id, { name, email, phone });
  if (!updatedContact) return res.status(404).json({ message: 'Contact not found' });
  res.status(200).json(updatedContact);
};

/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Delete a contact
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Contact deleted
 *       404:
 *         description: Contact not found
 */
const deleteContact = async (req, res) => {
  const { id } = req.params;
  const deleted = await contactService.deleteContact(id);
  if (!deleted) return res.status(404).json({ message: 'Contact not found' });
  res.status(204).send();
};

router.get('/', auth, getContacts);
router.post('/', createContactValidator, auth, validate, createContact);
router.get('/searchByPhoneNumber', auth, searchContactValidator, validate, searchContact);
router.put('/:id', auth, updateContactValidator, validate, updateContact);
router.delete('/:id', auth, deleteContact);

module.exports = {
  createContact,
  getContacts,
  searchContactByPhone: searchContact,
  updateContact,
  deleteContact,
  router,
};
