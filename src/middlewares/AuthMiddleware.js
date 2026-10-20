const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = async (req, res, next) => {
  try {
    const User = req.app.locals.models.users;
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Access denied. Missing or invalid token.' });
    }

    const token = authHeader.split(' ')[1];
    let payload;

    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (jwtError) {
      return res.status(401).json({
        success: false,
        message: jwtError.name === 'TokenExpiredError' ? 'Session expired. Please login again.' : 'Invalid token.'
      });
    }

    const user = await User.findOne({
      where: { id: payload.id, auth_token: token }
    });

    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found or session terminated.' });
    }

    if (user.active === false) {
      return res.status(403).json({ success: false, message: 'Account is inactive. Contact the administrator.' });
    }

    req.user = user;
    next();
  } catch (error) {
    logger.error(error, 'Critical error in AuthMiddleware');
    return res.status(500).json({ success: false, message: 'Internal security error.' });
  }
};

module.exports = { verifyToken };
