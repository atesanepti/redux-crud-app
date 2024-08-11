import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./features/book/bookSlice.js";
import productReducer from "./features/products/productSlice"
import productApiSlice from "./features/api/productApiSlice.js";
import { setupListeners } from "@reduxjs/toolkit/query";


const store = configureStore({
  reducer: {
    bookR: bookReducer,
    productR: productReducer,
    [productApiSlice.reducerPath]: productApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApiSlice.middleware),
});
setupListeners(store.dispatch);
export default store;
