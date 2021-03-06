import React from "react";
import {Link} from "react-router-dom";


const bookTerm = (props) => {
    return (
        <tr>
            <td scope={"col"}>{props.term.name}</td>
            <td scope={"col"}>{props.term.category}</td>
            <td scope={"col"}>{props.term.author.name}</td>
            <td scope={"col"}>{props.term.availableCopies}</td>

            <td scope={"col"} className={"text-right"}>
                <button title={"Delete"} className={"btn btn-danger"} onClick={() => props.onDelete(props.term.id)}>
                    Delete
                </button>

                <Link title={"Edit"} className={"btn btn-info"} onClick={() => props.onEdit(props.term.id)}
                   to={`/books/edit/${props.term.id}`}>
                    Edit
                </Link>

                <button title={"Mark As Taken"} className={"btn btn-success"}
                        disabled={props.term.availableCopies <= 0}
                        onClick={() => props.onMarkTaken(props.term.id)}>
                    Mark As Taken
                </button>
            </td>
        </tr>
    )


}


export default bookTerm;



