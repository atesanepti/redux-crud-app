import mongoose from "mongoose"
export const connectDB = async()=>{
   try {
     await mongoose.connect("mongodb://127.0.0.1:27017/product-shop");
     console.log("data base connection ok");
   } catch (error) {
    console.log("database error : ", error.message)
   }
}