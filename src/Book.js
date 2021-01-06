import React, {Component} from 'react';
import BookShelfChanger from './BookShelfChanger';

class Book extends Component {
    state = {
        shelfValue: this.props.book.shelf || 'none'
    }

    /**
     * handle onchange from BookshelfChanger component
     * @param event
     */
    onChange = event => {
        this.setState({ shelfValue: event.target.value }, () => {
            this.props.updateShelf(this.props.book, this.state.shelfValue);
        });
    }

    render() {
        const { imageLinks = {},
                title,
                authors = []
                } = this.props.book;
        const backgroundImage = imageLinks && `url(${imageLinks.thumbnail})`;
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover"
                             style={{
                                 width: 128,
                                 height: 193,
                                 backgroundImage
                             }}>
                        </div>
                        <BookShelfChanger onChange={this.onChange} shelfValue={this.state.shelfValue}/>
                    </div>
                    <div className="book-title">{title}</div>
                    <div className="book-authors">{authors.map(author=><div key={author}>{author}</div>)}</div>
                </div>
            </li>
        );
    }
}

export default Book;