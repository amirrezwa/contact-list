const prisma = require('../prisma/client');
const contactErrorMassage = require('../utils');

const createContact = async ({ name, email, phone, role = 'USER', userId }) => {
  try {
  return prisma.contact.create({
    data: {
      name,
      email,
      phone,
      role,
      userId,
    },
  });
} catch (error) {
  throw new Error(contactErrorMassage.createContactFailed);
}
};

const getContacts = async ({ user, page, limit, sortBy, order }) => {
  const skip = (page - 1) * limit;

  const whereClause =
    user.role === 'ADMIN'
      ? {}
      : { userId: user.id };

      try {
  const [data, total] = await Promise.all([
    prisma.contact.findMany({
      where: whereClause,
      skip,
      take: limit,
      orderBy: {
        [sortBy]: order,
      },
    }),
    prisma.contact.count({
      where: whereClause,
    }),
  ]);

  return {
    data,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
} catch (error) {
  throw new Error(contactErrorMassage.getContactsFailed);
}
};

const searchContact = async ({
  phone,
  user,
  page,
  limit,
  sortBy,
  order,
}) => {
  const skip = (page - 1) * limit;

  const whereClause = {
    ...(phone && { phone }),
    ...(user.role !== 'ADMIN' && { userId: user.id }),
  };

  try {
  const [data, total] = await Promise.all([
    prisma.contact.findMany({
      where: whereClause,
      skip,
      take: limit,
      orderBy: {
        [sortBy]: order,
      },
    }),
    prisma.contact.count({ where: whereClause }),
  ]);

  return {
    data,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
} catch (error) {
  throw new Error(contactErrorMassage.searchContactFailed);
}
};

const updateContact = async (id, data) => {
  try {
    return await prisma.contact.update({
      where: { id: Number(id) },
      data,
    });
  } catch (error) {
    throw new Error(contactErrorMassage.updateContactFailed);
  }
};

const deleteContact = async (id) => {
  try {
    return await prisma.contact.delete({ where: { id: Number(id) } });
  } catch (error) {
    throw new Error(contactErrorMassage.deleteContactFailed);
  }
};

module.exports = {
  createContact,
  getContacts,
  searchContact,
  updateContact,
  deleteContact,
};
