import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import { connectDB } from "./config/db.js";
const app = express();

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Product = new mongoose.model("product", productSchema);

app.listen(3000, async (error) => {
  if (!error) {
    console.log("server is running successfully");
    await connectDB();
  }
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.get("/api/products", async (req, res, next) => {
  try {
    const products = await Product.find({}).lean();
    if (products.length <= 0) {
      return next(new Error("Product not found"));
    }
    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});
app.post("/api/products", async (req, res, next) => {
  try {
    const { name, description, price } = req.body;

    if (!name || !description || !price) {
      return next(new Error("Fill all of input"));
    }
    let products = new Product({
      name,
      description,
      price,
    });
    products = await products.save();
    return res.status(201).json(products);
  } catch (error) {
    next(error);
  }
});

app.put("/api/products/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return next(new Error(`Product is not found with this id ${id}`));
    }
    for (let key in req.body) {
      product[key] = req.body[key];
    }
    product.save();
    return res.status(201).json({ message: "Product was updated" });
  } catch (error) {
    next(error);
  }
});

app.delete("/api/products/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return next(new Error("Product was not deleted"));
    }
    return res.status(200).json({ message: "Product was deleted" });
  } catch (error) {
    next(error);
  }
});

app.use((error, req, res, next) => {
  res.status(500).json({ error: error.message });
});
