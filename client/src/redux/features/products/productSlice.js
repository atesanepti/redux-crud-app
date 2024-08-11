import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "./../../constant.js";

export const fetchProducts = createAsyncThunk(
  "product/fetchProduct",
  async () => {
    let res = await fetch(BASE_URL);
    res = await res.json();
    return res;
  }
);

export const deleteProducts = createAsyncThunk(
  "product/deleteProduct",
  async (id) => {
    let res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
    res = await res.json();
    return id;
  }
);

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (product) => {
    let res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(product),
    });
    res = await res.json();
    return product;
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ product, id }) => {
    let res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(product),
    });
    res = (await res).json();
    return { product, id };
  }
);

const initialState = {
  isLoading: false,
  products: [],
  error: null,
};
const productSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    //delete product

    builder.addCase(deleteProducts.fulfilled, (state, action) => {
      state.products = state.products.filter(
        (product) => product._id != action.payload
      );
    });

    //add product
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.products = [...state.products, action.payload];
    });

    //update product
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      const product = state.products.find((p) => p._id == action.payload.id);
      if (product) {
        for (let key in action.payload.product) {
          product[key] = action.payload.product[key];
        }
      }
    });
  },
});

export default productSlice.reducer;
