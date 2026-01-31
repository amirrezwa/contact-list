const prisma = require('../prisma/client');


/**
 * ایجاد یک Contact جدید
 * @param {Object} data - { name, email, phone }
 * @returns {Object} Contact ساخته شده
 */
const createContact = async ({ name, email, phone }) => {
  return prisma.contact.create({
    data: { name, email, phone },
  });
};


const getContacts = async () => {
  return prisma.contact.findMany();
};


/**
 * جستجوی Contact بر اساس ID و/یا شماره تلفن
 * @param {Object} filter - { id, phone }
 * @returns {Array} Contact های پیدا شده
 */
const searchContact = async ({ phone }) => {
  return prisma.contact.findMany({
    where: {
      AND: [
        phone ? { phone } : {},
      ],
    },
  });
};


/**
 * به‌روزرسانی یک Contact بر اساس ID
 * @param {number} id 
 * @param {Object} data - { name, email, phone }
 * @returns {Object} Contact بروزشده
 */
const updateContact = async (id, data) => {
  try {
    return await prisma.contact.update({
      where: { id: Number(id) },
      data,
    });
  } catch (error) {
      return null;
  }
};


/**
 * حذف یک Contact بر اساس ID
 * @param {number} id
 * @returns {Object} Contact حذف شده یا null
 */
const deleteContact = async (id) => {
  try {
    return await prisma.contact.delete({
      where: { id: Number(id) },
    });
  } catch (error) {
    return null;
  }
};


module.exports = { createContact, getContacts, updateContact, deleteContact, searchContact };
