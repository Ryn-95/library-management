import React, { useState } from 'react';
import axios from 'axios';
import './AddBook.css';

const AddBook = ({ token, onAdd }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/books', {
        title,
        author,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(response.data);
      setTitle('');
      setAuthor('');
      onAdd(); // Call the onAdd function to refresh the book list
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="add-book-form" onSubmit={handleAddBook}>
      <h2>Add New Book</h2>
      <div className="form-group">
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Author:</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn">Add Book</button>
    </form>
  );
};

export default AddBook;