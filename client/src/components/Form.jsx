import React, { useEffect, useState } from "react";
import { addBook, updateBook } from "../redux/features/book/bookSlice";
import { useDispatch } from "react-redux";

const Form = ({ edit, setEdit }) => {
  const dispatch = useDispatch();
  const [{ name, author, price }, setForm] = useState({
    name: "",
    author: "",
    price: "",
  });

  useEffect(() => {
    if (edit) {
      const { id, ...book } = edit;
      setForm(book);
    } else {
      setForm({
        name: "",
        author: "",
        price: "",
      });
    }
  }, [edit]);

  const changleHandler = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (edit) {
      return dispatch(updateBook({name,author,price,id : edit.id}));
    }
    dispatch(addBook({ name, author, price }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={name}
          onChange={changleHandler}
          placeholder="name"
        />
        <input
          type="text"
          name="author"
          value={author}
          onChange={changleHandler}
          placeholder="author"
        />
        <br></br>
        <input
          type="number"
          name="price"
          value={price}
          onChange={changleHandler}
          placeholder="price"
        />
        <button type="submit">{edit ? "Update" : "Add"}</button>
        {edit && <button onClick={() => setEdit(null)}> Cancel </button>}
      </form>
    </div>
  );
};

export default Form;
