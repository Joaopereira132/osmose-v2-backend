const AuthService = require('../services/AuthService');
const logger = require('../utils/logger');

const register = async (req, res) => {
  try {
    const models = req.app.locals.models;
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email, and password fields are required.' });
    }

    const newUser = await AuthService.register({ name, email, password }, models);
    return res.status(201).json({ success: true, message: 'User registered successfully.', data: { user: newUser } });
  } catch (error) {
    if (error.status === 409) return res.status(409).json({ success: false, message: error.message });
    logger.error(error, 'Error in register');
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

const login = async (req, res) => {
  try {
    const models = req.app.locals.models;
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Basic ')) {
      return res.status(401).json({ success: false, message: 'Credentials not provided in Basic Auth format.' });
    }

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
    const [email, password] = credentials.split(':');

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password fields are required.' });
    }

    const result = await AuthService.login(email, password, models);
    return res.status(200).json({
      success: true,
      message: 'Login successful.',
      data: { auth_token: result.authToken, refresh_token: result.refreshToken, user: result.user }
    });
  } catch (error) {
    if (error.message === 'Invalid credentials.') return res.status(401).json({ success: false, message: error.message });
    logger.error(error, 'Error in login');
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

const logout = async (req, res) => {
  try {
    await AuthService.logout(req.user);
    return res.status(200).json({ success: true, message: 'Session terminated successfully.' });
  } catch (error) {
    logger.error(error, 'Error in logout');
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

module.exports = { register, login, logout };
