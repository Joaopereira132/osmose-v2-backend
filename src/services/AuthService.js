const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = 12;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '2h';
const REFRESH_SECRET = process.env.REFRESH_SECRET;
const REFRESH_EXPIRES_IN = process.env.REFRESH_EXPIRES_IN || '7d';

const AuthService = {
  async register(data, models) {
    const User = models.users;
    const existingUser = await User.findOne({ where: { email: data.email } });
    if (existingUser) {
      const error = new Error('A user with this email already exists.');
      error.status = 409;
      throw error;
    }

    const passwordHash = await bcrypt.hash(data.password, SALT_ROUNDS);
    return await User.create({
      name: data.name,
      email: data.email,
      password: passwordHash,
      password_updated_at: new Date()
    });
  },

  async login(email, password, models) {
    const User = models.users;
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error('Invalid credentials.');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Invalid credentials.');

    const payload = { id: user.id, email: user.email, name: user.name };
    const authToken = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    const refreshToken = jwt.sign(payload, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES_IN });

    const now = new Date();
    await user.update({
      auth_token: authToken,
      auth_token_updated_at: now,
      refresh_token: refreshToken,
      refresh_token_updated_at: now
    });

    return { authToken, refreshToken, user };
  },

  async logout(user) {
    return await user.update({
      auth_token: null,
      auth_token_updated_at: null,
      refresh_token: null,
      refresh_token_updated_at: null
    });
  }
};

module.exports = AuthService;
