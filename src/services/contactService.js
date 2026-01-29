let contacts = [];

const createContact = (name, email, phone) => {
  const newContact = { id: contacts.length + 1, name, email, phone };
  contacts.push(newContact);
  return newContact;
};

const getContacts = () => {
  return contacts;
};

const updateContact = (id, name, email, phone) => {
  let contact = contacts.find(c => c.id === parseInt(id));
  if (contact) {
    contact.name = name || contact.name;
    contact.email = email || contact.email;
    contact.phone = phone || contact.phone;
  }
  return contact;
};

const deleteContact = (id) => {
  const index = contacts.findIndex(c => c.id === parseInt(id));
  if (index !== -1) {
    contacts.splice(index, 1);
    return true;
  }
  return false;
};

module.exports = { createContact, getContacts, updateContact, deleteContact };
