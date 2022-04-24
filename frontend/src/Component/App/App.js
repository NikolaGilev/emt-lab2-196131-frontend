import logo from '../../logo.svg';
import './App.css';
import React, {Component} from "react"
import Books from "../Books/BookList/books";
import {BrowserRouter, BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Navigate} from 'react-router-dom';

import BookService from "../../repository/bookRepository";
import Header from "../Header/header";
import BookAdd from "../Books/BookAdd/bookAdd";
import BookEdit from "../Books/BookEdit/bookEdit";


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            countries: [],
            authors: [],
            selectedBook: {}
        }
    }

    render() {
        return (
            <Router>
                <Header/>
                <main>
                    <div className={"container"}>

                            <Routes>
                                <Route path={"/books/add"} exact element={
                                    <BookAdd categories={this.state.categories}
                                             manufacturers={this.state.manufacturers}
                                             onAddBook={this.addBook}/>}/>

                                <Route path={"/books/edit/:id"} exact element={
                                    <BookEdit categories={this.state.categories}
                                              manufacturers={this.state.manufacturers}
                                              onEditBook={this.editBook}
                                              book={this.state.selectedBook}/>}/>

                                <Route path={"/books/iznajmena/:id"} exact element={
                                    <BookAdd categories={this.state.categories}
                                             manufacturers={this.state.manufacturers}
                                             onMarkTaken={this.markTaken}
                                             book={this.state.selectedBook}/>}/>

                                <Route path={"/books"} exact element={
                                    <Books books={this.state.books}
                                           onDelete={this.deleteBook}
                                           onEdit={this.getBook}/>}
                                />
                            </Routes>
                        <Navigate to={"/books"}/>
                    </div>
                </main>


            </Router>
            // <div>
            //     <Books books={this.state.books}/>
            // </div>
        );
    }

    loadBooks = () => {
        BookService.fetchBooks()
            .then((data) => {
                this.setState({
                    books: data.data
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
        BookService.addBook(name, category, authorId, availableCopies)
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
            .then(() => {this.loadBooks()});
    }

    componentDidMount() {
        this.loadBooks();
    }

}


export default App;
