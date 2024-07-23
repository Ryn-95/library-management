import React from 'react';
import axios from 'axios';
import './EditBook.css';

class EditBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.book.title,
      author: props.book.author,
    };

    this.handleUpdateBook = this.handleUpdateBook.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async handleUpdateBook(e) {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/books/${this.props.book.id}`, {
        title: this.state.title,
        author: this.state.author,
      }, {
        headers: { Authorization: `Bearer ${this.props.token}` }
      });
      console.log(response.data);
      this.props.onUpdate(); // Appeler la fonction onUpdate après avoir mis à jour le livre
    } catch (error) {
      console.error(error);
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <form className="EditBook" onSubmit={this.handleUpdateBook}>
        <input
          type="text"
          name="title"
          value={this.state.title}
          onChange={this.handleChange}
          placeholder="Title"
          required
        />
        <input
          type="text"
          name="author"
          value={this.state.author}
          onChange={this.handleChange}
          placeholder="Author"
          required
        />
        <button type="submit">Update Book</button>
      </form>
    );
  }
}

export default EditBook;