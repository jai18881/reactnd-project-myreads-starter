import React, {Component} from 'react';
import Book from './Book';

class BookGrid extends Component {
    render() {
        return (
            <ol className="books-grid">
                {this.props.books.map(book => <Book updateShelf={this.props.updateShelf} key={book.id} book={book} />)}
            </ol>
        );
    }
}

export default BookGrid;