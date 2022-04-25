import axios from "../custom-axios/axios"

const bookServices = {
    fetchPaginatedBooks() {
        return axios.get("books/pagination");
    },
    fetchCategories() {
        return axios.get("/books/categories");
    },
    fetchCountries: () => {
        return axios.get("/country");
    },
    fetchAuthors: () => {
        return axios.get("/author");
    },
    fetchBooks: () => {
        return axios.get("/books");
    },
    deleteBook: (id) => {
        return axios.delete(`/books/delete/${id}`);
    },
    addBook: (book)  => {
        return axios.post("/books/add", book);
    },
    editBook: (id,name, category, authorId, availableCopies)  => {
        return axios.put(`/books/edit/${id}`, {
            "name": name,
            "category": category,
            "authorId": authorId,
            "availableCopies": availableCopies
        });
    },
    getBook: (id) => {
        return axios.get(`/books/${id}`);
    },
    markTaken: (id) => {
        return axios.put(`books/iznajmena/${id}`);
    },

}

export default bookServices;
