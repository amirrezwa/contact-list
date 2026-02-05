const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../prisma/client');
const { configHelper } = require('../helpers');

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

const register = async ({ email, password, role = 'USER' }) => {
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) throw new Error('User already exists');

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role,
    },
  });

  return { id: newUser.id, email: newUser.email, role: newUser.role };
};

const login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('Invalid credentials');

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error('Invalid credentials');

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    configHelper.jwt.secrets,
    { expiresIn: JWT_EXPIRES_IN }
  );

  return { token };
};

module.exports = {
  register,
  login,
};
