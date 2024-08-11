import { useState } from "react";
import ProductList from "../components/ProductList.jsx";
import ProductForm from "../components/ProductForm.jsx";

const Product = () => {
  const [edit, setEdit] = useState(null);
  const handleEdit = (p) => {
    console.log(p);
    setEdit(p);
  };
  return (
    <div className="app">
      {/* <Form edit={book} setEdit={setBook} />
      <BookList handleEdit={handleEdit} /> */}

      <ProductForm edit={edit} />
      <ProductList handleEdit={handleEdit} />
    </div>
  );
};

export default Product;
