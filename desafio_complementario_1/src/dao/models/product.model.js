import mongoose from "mongoose";

// Collection name
const productsCollection = "products";

// Schema definition
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    unique: true,
  },
  stock: {
    type: Number,
    required: true,
  },
});

// Model creation. Collection + Schema
export const productModel = mongoose.model(productsCollection, productSchema);
