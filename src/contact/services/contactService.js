const prisma = require('../../prisma/client');

const createContact = async ({ name, email, phone }) => {
  return prisma.contact.create({ data: { name, email, phone } });
};

const getContacts = async () => {
  return prisma.contact.findMany();
};

const searchContact = async ({ phone }) => {
  return prisma.contact.findMany({
    where: phone ? { phone } : {},
  });
};

const updateContact = async (id, data) => {
  try {
    return await prisma.contact.update({
      where: { id: Number(id) },
      data,
    });
  } catch {
    return null;
  }
};

const deleteContact = async (id) => {
  try {
    return await prisma.contact.delete({ where: { id: Number(id) } });
  } catch {
    return null;
  }
};

module.exports = { createContact, getContacts, searchContact, updateContact, deleteContact };
