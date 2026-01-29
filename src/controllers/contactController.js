const contactService = require('../services/contactService');

// 1. ایجاد یک مخاطب جدید (Create)
const createContact = (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).send('All fields are required');
  }

  const newContact = contactService.createContact(name, email, phone);
  res.status(201).json(newContact);
};

// 2. خواندن تمام مخاطب‌ها (Read)
const getContacts = (req, res) => {
  const contacts = contactService.getContacts();
  res.status(200).json(contacts);
};

// 3. به‌روزرسانی یک مخاطب (Update)
const updateContact = (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  const updatedContact = contactService.updateContact(id, name, email, phone);
  if (!updatedContact) {
    return res.status(404).send('Contact not found');
  }

  res.status(200).json(updatedContact);
};

// 4. حذف یک مخاطب (Delete)
const deleteContact = (req, res) => {
  const { id } = req.params;

  const deleted = contactService.deleteContact(id);
  if (!deleted) {
    return res.status(404).send('Contact not found');
  }

  res.status(204).send();
};

module.exports = { createContact, getContacts, updateContact, deleteContact };
