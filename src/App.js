import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import BookSearch from "./BookSearch";
import MyBooksDisplay from './MyBooksDisplay';
import {Route} from 'react-router-dom';
import {getAll, update, search} from './BooksAPI';

class BooksApp extends React.Component {
    state = {
        /**
         * TODO: Instead of using this state variable to keep track of which page
         * we're on, use the URL in the browser's address bar. This will ensure that
         * users can use the browser's back and forward buttons to navigate between
         * pages, as well as provide a good URL they can bookmark and share.
         */
        showSearchPage: false,
        shelves: {},
        books: [],
        bookList: [],
        shelvedBooks: {},
        query: ''
    }

    componentDidMount() {
        getAll()
            .then(books => {
                this.setState({books}, () => {
                    const shelves = this.groupByShelf(books);
                    this.setState({shelves}, () => {
                        this.setBooksInShelves(books);
                    });
                });
            });
    }

    /**
     * read shelf value and set books array against it
     * @param books
     * @returns {*}
     */
    groupByShelf = books => {
        const categories = books.reduce((shelves, book) => {
            const shelf = shelves[book.shelf];

            if (!shelf) {
                shelves[book.shelf] = [book.id]
            } else {
                shelf.push(book.id);
            }

            return shelves;
        }, {});

        return categories;
    }

    /**
     * update the shelf value
     * @param book
     * @param shelf
     */
    updateShelf = (book, shelf) => {
        this.setState((currentState) => {
            const books = [...currentState.books];
            const selectedBook = books.find(currentBook => currentBook.id === book.id);

            if (selectedBook) {
                selectedBook.shelf = shelf;
            } else {
                books.push(book);
            }

            return {books};
        }, () => {
            update(book, shelf)
                .then(shelves => {
                    this.setState({shelves}, () => {
                        this.setBooksInShelves();
                        this.updateShelvesInSearchData(this.state.bookList);
                    });
                });
        });
    }

    /**
     * set books in shelves
     */
    setBooksInShelves = () => {
        const shelves = {...this.state.shelves};
        const shelvedBooks = {};
        for (const key in shelves) {
            shelvedBooks[key] = shelves[key].map(bookId => ({
                ...this.state.books.find(book => book.id === bookId),
                shelf: key
            }));
        }
        this.setState({shelvedBooks});
    }

    /**
     * update shelf of searched books, if any
     * @param bookList
     */
    updateShelvesInSearchData = (bookList) => {
        const booksWithShelf = bookList.map(searchedBook => ({
            ...searchedBook, ...this.state.books.find(shelvedBook => shelvedBook.id === searchedBook.id)
        }));
        this.setState({bookList: booksWithShelf});
    }

    /**
     * search books
     * @param query
     */
    searchBooks = (query = '') => {
        this.setState({query});
        if (query) {
            search(query)
                .then((bookList = []) => {
                    if (Array.isArray(bookList)) {
                        this.updateShelvesInSearchData(bookList)
                    } else {
                        this.setState({bookList: []})
                    }
                });
        } else {
            this.setState({bookList: []});
        }
    }

    render() {
        return (
            <div className="app">
                <Route path='/search' render={() => {
                    return <BookSearch bookList={this.state.bookList} query={this.state.query}
                                       updateShelf={this.updateShelf} searchBooks={this.searchBooks}/>
                }}/>
                <Route exact path='/' render={({history}) => {
                    return <MyBooksDisplay
                        history={history}
                        shelves={this.state.shelvedBooks}
                        updateShelf={this.updateShelf}/>
                }}/>
            </div>
        )
    }
}

export default BooksApp
