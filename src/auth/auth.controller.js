const authService = require('./auth.service');

exports.register = async (req, res) => {
  const user = await authService.register(req.body);
  res.status(201).json(user);
};

exports.login = async (req, res) => {
  const result = await authService.login(req.body);
  res.json(result);
};
