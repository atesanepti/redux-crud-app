import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../constant";


 const productApiSlice = createApi({
   reducerPath: "product",
   baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
   endpoints: (builder) => ({
     fetchProducts: builder.query({
       query: () => "",
       providesTags: ["Product"],
     }),
     createProduct: builder.mutation({
       query: (form) => ({
         url: "/",
         method: "POST",
         body: form,
       }),
       invalidatesTags: ["Product"],
     }),
     deleteProduct: builder.mutation({
       query: (id) => ({
         method: "DELETE",
         url: `/${id}`,
       }),
     }),
     updateProduct: builder.mutation({
       query: ({ form, id }) => ({
         url: `/${id}`,
         method: "PUT",
         body: form,
       }),
       invalidatesTags: ["Product"],
     }),
   }),
 });
export default productApiSlice;
export const {useFetchProductsQuery,useDeleteProductMutation,useUpdateProductMutation,useCreateProductMutation} = productApiSlice;