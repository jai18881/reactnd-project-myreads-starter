import React, {Component} from 'react'
import BookSearchForm from './BookSearchForm';
import BooksGrid from './BooksGrid';

class BookSearch extends Component {
    render() {
        return (
            <div className="search-books">
                <BookSearchForm query={this.props.query} searchBooks={this.props.searchBooks}/>
                <div className="search-books-results">
                    <BooksGrid updateShelf={this.props.updateShelf} books={this.props.bookList} />
                </div>
            </div>
        )
    }
}

export default BookSearch;