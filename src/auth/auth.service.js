const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../prisma/client');
const authErrorMassage = require('../utils')
const { configHelper } = require('../helpers');

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';
const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN || '7d';

const register = async ({ email, password, role = 'USER' }) => {
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) {
    throw new Error(authErrorMassage.userExists)
  };

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
  if (!user){
     throw new Error(authErrorMassage.invalidCredentials);
    }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid){
     throw new Error(authErrorMassage.invalidCredentials);
    }

  const accessToken = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    configHelper.jwt.secrets,
    { expiresIn: JWT_EXPIRES_IN }
  );

  const refreshToken = jwt.sign(
    {
      id: user.id,
      type: 'refresh',
    },
    configHelper.jwt.secrets,
    { expiresIn: REFRESH_TOKEN_EXPIRES_IN }
  );

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken },
  });

  return { 
    accessToken, 
    refreshToken 
  };
};

const refreshToken = async ({ refreshToken: token }) => {
  if (!token) {
    throw new Error('Refresh token is required');
  }

  try {
    const decoded = jwt.verify(token, configHelper.jwt.secrets);
    
    if (decoded.type !== 'refresh') {
      throw new Error('Invalid token type');
    }

    const user = await prisma.user.findUnique({ 
      where: { 
        id: decoded.id,
        refreshToken: token,
      } 
    });

    if (!user) {
      throw new Error('Invalid or expired refresh token');
    }

    const accessToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      configHelper.jwt.secrets,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return { accessToken };
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      try {
        const decoded = jwt.decode(token);
        if (decoded && decoded.id) {
          await prisma.user.update({
            where: { id: decoded.id },
            data: { refreshToken: null },
          });
        }
      } catch (e) {
      }
      throw new Error('Invalid or expired refresh token');
    }
    throw error;
  }
};

const logout = async (userId) => {
  await prisma.user.update({
    where: { id: userId },
    data: { refreshToken: null },
  });
};

module.exports = {
  register,
  login,
  refreshToken,
  logout,
};
