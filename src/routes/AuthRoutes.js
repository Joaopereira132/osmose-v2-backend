const { Router } = require('express');
const { object, string, pipe, minLength, email } = require('valibot');
const { register, login, logout } = require('../controllers/AuthController');
const { verifyToken } = require('../middlewares/AuthMiddleware');
const { validateSchema } = require('../middlewares/ValidationMiddleware');

const router = Router();

const registerSchema = object({
  name: pipe(string('Name is required.'), minLength(3, 'Name must be at least 3 characters long.')),
  email: pipe(string('Email is required.'), email('Invalid email format.')),
  password: pipe(string('Password is required.'), minLength(6, 'Password must be at least 6 characters long.'))
});

router.post('/register', validateSchema(registerSchema), register);
router.post('/login', login);
router.post('/logout', verifyToken, logout);

module.exports = router;
