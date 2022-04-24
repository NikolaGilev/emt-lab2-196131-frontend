import React from "react";
import {useNavigate} from "react-router-dom";
import Book from "../BookList/book";


const BookAdd = (props) => {

    const navigate = useNavigate();
    const [formData, updateFormData] = React.useState({
        name: "",
        category: "",
        author: 0,
        availableCopies: 0
    })

    const handleChange = (e) => {
        console.log(e.target.value,e.target.name);
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }


    const onFormSubmit = (e) => {
        e.preventDefault();
        const name = formData.name;
        const category = formData.category;
        const authorId = formData.author;
        const availableCopies = formData.availableCopies;

        props.onAddBook(name,category,authorId,availableCopies);
        navigate("/books");
    }


    return (
        <div className="row mt-5">
            <div className="col-md-5">

                <form onSubmit={onFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Book name</label>
                        <input type="text"
                               className="form-control"
                               id="name"
                               name="name"
                               required
                               placeholder="Enter name"
                               onChange={handleChange}
                        />
                    </div>



                    {/*         todo: Author         */}
                    <div className="form-group">
                        <label>Author</label>
                        <select name="author" className="form-control" onChange={handleChange}>
                            {props.authors.map((term,i) =>
                                <option key={i} value={term.id}>{term.name}</option>
                            )}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Category Type</label>
                        <select name="category" className="form-control" onChange={handleChange}>
                            {props.categories.map((term,i) =>
                                <option key={i} value={term}>{term}</option>
                            )}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="price">Available copies</label>
                        <input type="text"
                               className="form-control"
                               id="availableCopies"
                               name="availableCopies"
                               onChange={handleChange}
                        />
                    </div>

                    <button id="submit" type="submit" className="btn btn-primary">Submit</button>
                </form>

            </div>
        </div>

    )


}


export default BookAdd;