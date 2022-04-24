import React from "react";


const bookTerm = (props) => {
    return (
        <tr>
            <td scope={"col"}>{props.term.name}</td>
            <td scope={"col"}>{props.term.category}</td>
            <td scope={"col"}>{props.term.authorId}</td>
            <td scope={"col"}>{props.term.availableCopies}</td>

            <td scope={"col"} className={"text-right"}>
                <a title={"Delete"} className={"btn btn-danger"} onClick={() => props.onDelete(props.term.id)}>
                    Delete
                </a>
            </td>
            <td scope={"col"} className={"text-right"}>
                <a title={"Edit"} className={"btn btn-danger"} onClick={() => props.onEdit(props.term.id)}
                   to={`/books/edit/${props.term.id}`}>
                    Edit
                </a>
            </td>
            <td scope={"col"} className={"text-right"}>
                <a title={"Mark As Taken"} className={"btn btn-danger"} onClick={() => props.onMarkTaken(props.term.id)}
                   to={`/books/iznajmena/${props.term.id}`}>
                    Mark As Taken
                </a>
            </td>
        </tr>
    )


}


export default bookTerm;



