const prisma = require('../prisma/client');

const createContact = async ({ name, email, phone, role = 'USER', userId }) => {
  return prisma.contact.create({
    data: {
      name,
      email,
      phone,
      role,
      userId,
    },
  });
};

const getContacts = async ({ user, page, limit, sortBy, order }) => {
  const skip = (page - 1) * limit;

  const whereClause =
    user.role === 'ADMIN'
      ? {}
      : { userId: user.id };

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

module.exports = {
  createContact,
  getContacts,
  searchContact,
  updateContact,
  deleteContact,
};
