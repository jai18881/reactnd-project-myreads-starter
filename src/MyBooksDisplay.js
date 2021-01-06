import React, {Component} from 'react';
import BookShelf from './BookShelf';

class MyBooksDisplay extends Component {
    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {Object.keys(this.props.shelves).map(shelfName => <BookShelf
                            key={Math.random()}
                            updateShelf={this.props.updateShelf}
                            shelf={{name: shelfName, books: this.props.shelves[shelfName]}} />)}
                    </div>
                </div>
                <div className="open-search">
                    <button onClick={() => this.props.history.push('/search')}>Add a book</button>
                </div>
            </div>
        )
    }
}

export default MyBooksDisplay;