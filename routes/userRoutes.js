const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticate = require('../middleware/authenticate'); // Assurez-vous que ce middleware existe

router.post('/login', userController.login);
router.get('/me', authenticate, userController.getCurrentUser); // Doit être avant :id
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;