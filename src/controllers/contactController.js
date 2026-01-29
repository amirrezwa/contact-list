const contactService = require('../services/contactService');
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
const createContact = (req, res) => {
    const { name, email, phone } = req.body;
  
    if (!name || !email || !phone) {
      return res.status(400).send('All fields are required');
    }
  
    const newContact = contactService.createContact(name, email, phone);
    res.status(201).json(newContact);
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
  const getContacts = (req, res) => {
    const contacts = contactService.getContacts();
    res.status(200).json(contacts);
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
  const updateContact = (req, res) => {
    const { id } = req.params;
    const { name, email, phone } = req.body;
  
    const updatedContact = contactService.updateContact(id, name, email, phone);
    if (!updatedContact) {
      return res.status(404).send('Contact not found');
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
  const deleteContact = (req, res) => {
    const { id } = req.params;
  
    const deleted = contactService.deleteContact(id);
    if (!deleted) {
      return res.status(404).send('Contact not found');
    }
  
    res.status(204).send();
  };
  
  module.exports = { createContact, getContacts, updateContact, deleteContact };
  