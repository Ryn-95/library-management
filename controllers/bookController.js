const { Book } = require('../models');

// Get all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get book by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new book
exports.createBook = async (req, res) => {
  try {
    const { title, author, userId } = req.body;
    const newBook = await Book.create({ title, author, userId });
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update book by ID
exports.updateBook = async (req, res) => {
  try {
    const { title, author, userId } = req.body;
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    book.title = title;
    book.author = author;
    book.userId = userId;
    await book.save();
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete book by ID
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    await book.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};