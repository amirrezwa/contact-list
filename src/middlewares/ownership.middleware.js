const prisma = require('../prisma/client');

const isOwnerOrAdmin = async (req, res, next) => {
  const { id } = req.params;
  const contact = await prisma.contact.findUnique({ where: { id: Number(id) } });

  if (!contact) return res.status(404).json({ message: 'Contact not found' });

  if (req.user.role !== 'ADMIN' && contact.userId !== req.user.id) {
    return res.status(403).json({ message: 'Forbidden: Not owner' });
  }

  next();
};

module.exports = isOwnerOrAdmin;
