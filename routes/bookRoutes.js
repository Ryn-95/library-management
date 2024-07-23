const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const authenticate = require('../middleware/authenticate'); // Assurez-vous que ce middleware existe

router.get('/', authenticate, bookController.getAllBooks);
router.get('/:id', authenticate, bookController.getBookById);
router.post('/', authenticate, bookController.createBook);
router.put('/:id', authenticate, bookController.updateBook);
router.delete('/:id', authenticate, bookController.deleteBook);

module.exports = router;