import React from 'react';
import Register from './components/Register';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import AddBook from './components/AddBook';
import BookList from './components/BookList';
import EditBook from './components/EditBook';
import axios from 'axios';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      books: [],
      editingBook: null,
    };
    this.fetchBooks = this.fetchBooks.bind(this);
    this.handleDeleteBook = this.handleDeleteBook.bind(this);
    this.setToken = this.setToken.bind(this);
    this.setEditingBook = this.setEditingBook.bind(this);
  }

  async fetchBooks() {
    try {
      const response = await axios.get('http://localhost:3000/books', {
        headers: { Authorization: `Bearer ${this.state.token}` }
      });
      this.setState({ books: response.data });
    } catch (error) {
      console.error(error);
    }
  }

  async handleDeleteBook(id) {
    try {
      await axios.delete(`http://localhost:3000/books/${id}`, {
        headers: { Authorization: `Bearer ${this.state.token}` }
      });
      this.fetchBooks(); // Rafraîchir la liste des livres après suppression
    } catch (error) {
      console.error(error);
    }
  }

  setToken(token) {
    this.setState({ token }, this.fetchBooks);
  }

  setEditingBook(book) {
    this.setState({ editingBook: book });
  }

  render() {
    return (
      <div className="App">
        <h1>Library Management</h1>
        {!this.state.token ? (
          <>
            <Register />
            <Login setToken={this.setToken} />
          </>
        ) : (
          <>
            <UserProfile token={this.state.token} />
            <AddBook token={this.state.token} onAdd={this.fetchBooks} />
            {this.state.editingBook && (
              <EditBook
                token={this.state.token}
                book={this.state.editingBook}
                onUpdate={() => {
                  this.fetchBooks();
                  this.setEditingBook(null);
                }}
              />
            )}
            <BookList
              books={this.state.books}
              onEdit={this.setEditingBook}
              onDelete={this.handleDeleteBook}
            />
          </>
        )}
      </div>
    );
  }
}

export default App;