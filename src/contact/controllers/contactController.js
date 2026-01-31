const express = require('express');
const router = express.Router();
const contactService = require('../services/contactService');
const validate = require('../../middlewares/validate');
const { createContactValidator } = require('../../dto/createContactDto');
const { searchContactValidator } = require('../../dto/searchContactdto');
const { updateContactValidator } = require('../../dto/updateContacDto');
/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Create a new contact
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
    const newContact = await contactService.createContact({
      name,
      email,
      phone,
    });

    res.status(201).json(newContact);
  } catch (error) {
    res.status(400).json({
      message: 'Failed to create contact',
      error: error.message,
    });
  }
};

  
  /**
   * @swagger
   * /contacts:
   *   get:
   *     summary: Get all contacts
   *     description: Retrieve a list of all contacts
   *     responses:
   *       200:
   *         description: A list of contacts
   */
  const getContacts = async (req, res) => {
    try {
      const contacts = await contactService.getContacts();
      res.status(200).json(contacts);
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
 *     summary: Search contacts
 *     description: Search contact by id or phone
 *     parameters:
 *       - in: query
 *         name: phone
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact found
 *       
 *       400:
 *         description: Bad Request
 *       
 *       404:
 *         description: Contact not found
 */

  const searchContact = async (req, res) => {
    try {
      const { phone } = req.query;
    
      const result = await contactService.searchContact({ phone });
    
      if (!result.length) {
        return res.status(404).json({ message: 'Contact not found' });
      }
    
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
   *     description: Update a contact's details by ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: The ID of the contact to update
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
  
    const updatedContact = await contactService.updateContact(id, {
      name,
      email,
      phone,
    });
  
    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
  
    res.status(200).json(updatedContact);
  };
  
  /**
   * @swagger
   * /contacts/{id}:
   *   delete:
   *     summary: Delete a contact
   *     description: Delete a contact by ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: The ID of the contact to delete
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
  
    if (!deleted) {
      return res.status(404).json({ message: 'Contact not found' });
    }
  
    res.status(204).send();
  };
  
router.post('/', createContactValidator, validate, createContact);
router.get('/searchByPhoneNumber', searchContactValidator, validate, searchContact);
router.get('/', getContacts);
router.put('/:id', updateContactValidator, validate, updateContact);
router.delete('/:id', deleteContact);

module.exports = {
  createContact,
  getContacts,
  searchContactByPhone:searchContact,
  updateContact,
  deleteContact,
  router,
};