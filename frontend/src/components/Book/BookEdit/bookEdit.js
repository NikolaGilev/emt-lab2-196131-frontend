import React, {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import bookServices from "../../../repository/bookRepo"

const BookEdit = (props) => {

    const navigate = useNavigate();
    const {id} = useParams();
    const [formData, updateFormData] = React.useState({
        name: "",
        category: "",
        author: 0,
        availableCopies: 0
    })

    useEffect(() => {
        bookServices.getBook(id)
            .then((data) => {
                const obj = {
                    name: data.data.name,
                    category: data.data.category,
                    author: data.data.author.id,
                    availableCopies: data.data.availableCopies
                }
                updateFormData(obj)
            })
    },[])

        console.log(formData);

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        const name = formData.name;
        const category = formData.category;
        const author = formData.author ;
        const availableCopies = formData.availableCopies ;

        props.onEditBook(id, name, category, author, availableCopies);
        navigate("/books");
    }

    return (
        <div className="row mt-5">
            <div className="col-md-5">
                <form onSubmit={onFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Product name</label>
                        <input type="text"
                               className="form-control"
                               id="name"
                               name="name"
                               value={formData.name}
                               onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <select type="text"
                                className="form-control"
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}>
                            {props.categories.map((term, i) =>
                                <option key={i} value={term}>{term}</option>
                            )}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="price">Author</label>
                        <select type="text"
                                className="form-control"
                                id="author"
                                name="author"
                                value={formData.author}
                                onChange={handleChange}>
                            {props.authors.map((term, i) =>
                                <option key={i} value={term.id}>{term.name}</option>
                            )}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="price">Available copies</label>
                        <input type="text"
                               className="form-control"
                               id="availableCopies"
                               name="availableCopies"
                               value={formData.availableCopies}
                               onChange={handleChange}
                        />
                    </div>

                    <button id="submit" type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}


export default BookEdit;

