import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchProducts,deleteProducts } from "../redux/features/products/productSlice.js";
import {
  useFetchProductsQuery,
  useDeleteProductMutation,
} from "../redux/features/api/productApiSlice";

const ProductList = ({ handleEdit }) => {
  
  // const dispatch = useDispatch();
  // product fetch using async thunk
  // const { products, isLoading, error } = useSelector((state) => state.productR);
  // useEffect(() => {
  //   dispatch(fetchProducts());
  // }, [dispatch]);
  // const handleDelete = async (id) => {
  //   dispatch(deleteProducts(id));
  // };
  
  //fetch product using toolkit query 
  const {data : products, isLoading, error,refetch} = useFetchProductsQuery()
  //delete product using tookit query
  const [productDelete, {isLoading : deleteLoading ,error : deleteError }] = useDeleteProductMutation()

  const deleteHandler = async(id)=>{
    try {
      const res = await productDelete(id).unwrap();
      refetch();
      console.log(res)
    } catch (error) {
      console.error(error)
    }
    
  }


  useEffect(()=> {
    if(error){
      console.log("error =",error)
    }
  },[error])


  return (
    <div className="product-container">
      {isLoading && <span>Loading..</span>}
      {error && <span>{error.data.error}</span>}
      {!isLoading &&
        products &&
        products.map((p, i) => (
          <div key={i} className="product">
            <h4 className="product-name">{p.name}</h4>
            <p className="product-des">{p.description}</p>
            <span className="product-price">{p.price}</span>
            <div className="product-btns">
              <button
                onClick={() => deleteHandler(p._id)}
                className="product-btn"
              >
                Delete
              </button>
              <button onClick={() => handleEdit(p)} className="product-btn">
                Edit
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProductList;
