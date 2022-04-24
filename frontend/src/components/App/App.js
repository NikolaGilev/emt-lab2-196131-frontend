import BookService from "../../repository/bookRepo";
import './App.css';
import React from "react";
import {Component} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Navigate} from 'react-router-dom';
import Books from "../Book/BookList/book";
import BookAdd from "../Book/BookAdd/bookAdd";
import BookEdit from "../Book/BookEdit/bookEdit";


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            countries: [],
            categories: [],
            authors: [],
            selectedBook: {}
        }
    }

    render() {
        return (
            <BrowserRouter>

                <Routes>
                    <Route path={"/books"} exact element={
                        <Books books={this.state.books}
                               onDelete={this.deleteBook}
                               onEdit={this.getBook}
                               onMarkTaken={this.markTaken}/>
                    }/>


                    <Route path={"/books/add"} exact element={
                        <BookAdd categories={this.state.categories}
                                 authors={this.state.authors}
                                 onAddBook={this.addBook}/>}/>

                    <Route path={"/books/edit/:id"} exact element={
                        <BookEdit categories={this.state.categories}
                                  authors={this.state.authors}
                                  onEditBook={this.editBook}
                                  book={this.state.selectedBook}/>}/>


                </Routes>
                {/*<Navigate to={"/books"}/>*/}


            </BrowserRouter>
            // <div>
            //     <Books books={this.state.books}/>
            // </div>
        );
    }

    componentDidMount() {
        this.loadCountries();
        this.loadAuthors();
        this.loadCategories();
        this.loadBooks();
        // this.loadBooksPaginated();
    }
    loadBooksPaginated = () => {
        BookService.fetchPaginatedBooks()
            .then((data) => {
                this.setState({
                    books: data.data
                });
            });
    }
    loadCategories = () =>{
        BookService.fetchCategories()
            .then((data) => {
                this.setState({
                    categories: data.data
                });
            });
    }
    loadBooks = () => {
        BookService.fetchBooks()
            .then((data) => {
                this.setState({
                    books: data.data
                });
            });
    }
    loadAuthors = () => {
        BookService.fetchAuthors()
            .then((data) => {
                this.setState({
                    authors: data.data
                });
            });
    }
    loadCountries = () => {
        BookService.fetchCountries()
            .then((data) => {
                this.setState({
                    countries: data.data
                });
            });
    }


    deleteBook = (id) => {
        BookService.deleteBook(id)
            .then(() => {
                this.loadBooks();
            });
    }
    addBook = (name, category, authorId, availableCopies) => {
        const book1 = {name: name, category: category, authorId: authorId, availableCopies: availableCopies};
        BookService.addBook(book1)
            .then(() => {
                this.loadBooks();
            });
    }
    editBook = (id, name, category, authorId, availableCopies) => {
        BookService.editBook(id, name, category, authorId, availableCopies)
            .then(() => this.loadBooks());
    }
    getBook = (id) => {
        BookService.getBook(id)
            .then((data) => this.setState({selectedBook: data.data}))
    }
    markTaken = (id) => {
        BookService.markTaken(id)
            .then(() => {
                this.loadBooks()
            });
    }


}


export default App;
