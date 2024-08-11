import { useEffect, useState } from "react";
// import {
//   addProduct,
//   updateProduct,
// } from "../redux/features/products/productSlice.js";
// import { useDispatch } from "react-redux";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "../redux/features/api/productApiSlice";

const ProductForm = ({ edit }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
  });
  const handleChangle = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    if (edit) {
      setForm((prev) => {
        const { _id, _v, ...product } = edit;
        return { ...prev, ...product };
      });
    }
  }, [edit]);

  //handle with redux toolkit query
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (edit) {
      try {
        const res = await updateProduct({ form, id: edit._id }).unwrap();
        console.log(res);

      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        console.log(form);
        const res = await createProduct(form).unwrap();
        console.log(res);
  
      } catch (error) {
        console.error(error);
      }
    }
  };

  //handle with async thunk
  // const dispatch = useDispatch();
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (edit) {
  //     return dispatch(updateProduct({ product: form, id: edit._id }));
  //   }
  //   dispatch(addProduct(form));
  // };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChangle}
          placeholder="Product name"
        />
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChangle}
          placeholder="Product price"
        />{" "}
        <br />
        <textarea
          className="des"
          value={form.description}
          name="description"
          onChange={handleChangle}
          placeholder="Product description"
        ></textarea>
        <br />
        <button type="submit">{edit ? "Update" : "Add Product"}</button>
        {edit && (
          <button
            className="calcel-btn"
            onClick={() => setForm({ name: "", description: "", price: "" })}
          >
            {" "}
            Cancel{" "}
          </button>
        )}
      </form>
    </div>
  );
};

export default ProductForm;
