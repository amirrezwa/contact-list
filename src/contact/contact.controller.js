const express = require('express');
const router = express.Router();
const contactService = require('./contact.service');
const {validate, auth } = require('../middlewares/insex');
const { updateContactValidator,
        searchContactValidator,
        createContactValidator
      } = require('../dto/index');

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
 *     tags:
 *       - Contacts
 *     summary: Create a new contact
 *     security:
 *       - BearerAuth: []
 *     description: Create a new contact with name, email, phone and role
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
 *               role:
 *                 type: string
 *                 enum: [USER, ADMIN]
 *     responses:
 *       201:
 *         description: Contact created
 *       400:
 *         description: Bad Request
 */
const createContact = async (req, res) => {
  const { name, email, phone, role } = req.body;
  try {
    const newContact = await contactService.createContact({
      name,
      email,
      phone,
      role,
      userId: req.user.id,
    });
    res.status(201).json(newContact);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create contact', error: error.message });
  }
};

/**
 * @swagger
 * /contacts:
 *   get:
 *     tags:
 *       - Contacts
 *     summary: Get contacts with pagination
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           example: createdAt
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *     responses:
 *       200:
 *         description: List of contacts
 *       401:
 *         description: Unauthorized
 */

const getContacts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sortBy = req.query.sortBy || 'createdAt';
    const order = req.query.order === 'asc' ? 'asc' : 'desc';

    const result = await contactService.getContacts({
      user: req.user,
      page,
      limit,
      sortBy,
      order,
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch contacts',
      error: error.message,
    });
  }
};




/**
 * @swagger
 * /contacts/searchByPhoneNumber:
 *   get:
 *     tags:
 *       - Contacts
 *     summary: Search contacts with filters and pagination
 *     description: |
 *       Search contacts by phone number.
 *       - ADMIN can search across all contacts
 *       - USER can only search within their own contacts
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: phone
 *         required: false
 *         schema:
 *           type: string
 *         description: Phone number to search for
 *
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *
 *       - in: query
 *         name: sortBy
 *         required: false
 *         schema:
 *           type: string
 *           default: createdAt
 *         description: Field to sort by
 *
 *       - in: query
 *         name: order
 *         required: false
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Sort order
 *
 *     responses:
 *       200:
 *         description: Contacts found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *                         nullable: true
 *                       phone:
 *                         type: string
 *                       role:
 *                         type: string
 *                         enum: [USER, ADMIN]
 *                       userId:
 *                         type: integer
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                 meta:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *
 *       403:
 *         description: Forbidden (role restriction)
 *
 *       404:
 *         description: No contacts found
 */

const searchContact = async (req, res) => {
  try {
    const {
      phone,
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      order = 'desc',
    } = req.query;

    const result = await contactService.searchContact({
      phone,
      user: req.user,
      page: Number(page),
      limit: Number(limit),
      sortBy,
      order,
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to search contacts',
      error: error.message,
    });
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
