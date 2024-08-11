import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {deleteBook, updateBook} from "../redux/features/book/bookSlice.js"
const BookList = ({ handleEdit }) => {
  const dispatch = useDispatch();
  const { book } = useSelector((state) => state.bookR);

  const handlerDelete = (id) => {
    dispatch(deleteBook(id));
  };

  return (
    <div className="book-list">
      {book && book.length > 0 ? (
        <div>
          <h2>Book List</h2>
          <ul>
            {book.map((b) => (
              <li key={b.id}>
                {" "}
                <span>
                  {b.name} {b.author} {b.price}
                </span>{" "}
                <button onClick={() => handlerDelete(b.id)}>Delete</button>{" "}
                <button onClick={() => handleEdit(b)}>Edit</button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default BookList;
