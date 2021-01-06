import React from 'react';
import BooksGrid from './BooksGrid';

const BookShelf = props => {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{props.shelf.name}</h2>
            <div className="bookshelf-books">
                <BooksGrid
                    updateShelf={props.updateShelf}
                    books={props.shelf.books} />
            </div>
        </div>
    );
}

export default BookShelf;