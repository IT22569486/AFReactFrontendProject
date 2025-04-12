const express = require('express');
const router = express.Router();
const { auth, adminOnly } = require('../middleware/auth');
const authController = require('../controllers/AuthController');

// Authentication routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', auth, authController.logout);

// User profile routes
router.get('/me', auth, authController.getProfile);
router.put('/me', auth, authController.updateProfile);

// Admin routes
router.get('/users', auth, adminOnly, authController.getAllUsers);
router.delete('/users/:id', auth, adminOnly, authController.deleteUser);
router.put('/users/:id', auth, adminOnly, authController.updateUser);
router.get('/users/:id', auth, adminOnly, authController.getUserById);
router.get('/search', auth, adminOnly, authController.searchUsers);
module.exports = router;