import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  book: [
    {
      id: 1,
      name: "x",
      author: "epti",
      price: 100,
    },
    {
      id: 2,
      name: "Y",
      author: "rahim",
      price: 200,
    },
  ],
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    addBook: (state, action) => {
      const newBook = { ...action.payload, id: state.book.length + 1 };
      state.book = [...state.book, newBook];
    },
    deleteBook: (state, action) => {
      const newBookList = state.book.filter((b) => b.id != action.payload);
      state.book = newBookList;
    },
    updateBook: (state, action) => {
      const {id,name,author,price} = action.payload;
      const book = state.book.find((b)=> b.id == id );
      if(book ){
        book.name = name;
        book.author = author
        book.price = price
      }

    },
  },
});

export default bookSlice.reducer;

export const { addBook, deleteBook, updateBook } = bookSlice.actions;
