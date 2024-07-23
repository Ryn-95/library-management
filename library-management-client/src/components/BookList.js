import React from 'react';
import './BookList.css';

class BookList extends React.Component {
  render() {
    return (
      <div className="book-list-container">
        <h2>Book List</h2>
        <ul className="book-list">
          {this.props.books.map((book) => (
            <li key={book.id} className="book-item">
              <span>{book.title} by {book.author}</span>
              <div>
                <button className="btn edit-btn" onClick={() => this.props.onEdit(book)}>Edit</button>
                <button className="btn delete-btn" onClick={() => this.props.onDelete(book.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default BookList;