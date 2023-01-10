import { productModel } from "../dao/models/product.model.js";

export const getAllProducts = async (req, res) => {
  try {
    const response = await productModel.find();
    res.json(response);
    
  } catch (error) {
    res.json(error);
  }
};

export const getProductById = async (req, res) => {
  const ide = req.params.id;
  console.log(ide);

  try {
    const id = req.params.id;
    const response = await productModel.findById(id);
    if (!response) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.json({ product: response, status: "success" });
  } catch (error) {
    res.status(404).json({ message: "Product not found" });
  }
};

export const addProduct = async (req, res) => {
  // body must be like product model, anyway all fields are required
  try {
    const response = await productModel.create(req.body);
    res.json({ product: response, status: "success" });
  } catch (error) {
    res.status(404).json({ message: "Error creating product", error: error });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const obj = req.body;
    const response = await productModel.findByIdAndUpdate({ _id: id }, obj);
    res.json({ product: response, status: "success" });
  } catch (error) {
    res.status(404).json({ message: "Error updating product", error: error });
  }
};

export const deleteProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await productModel.findByIdAndDelete(id);
    res.json({ product: response, status: "success" });
  } catch (error) {
    res.status(404).json({ message: "Error deleting product", error: error });
  }
};

export const deleteall = async (req, res) => {
  try {
    const response = await productModel.deleteMany({});
    res.json({ product: response, status: "success" });
  } catch (error) {
    res.status(404).json({ message: "Error deleting products", error: error });
  }
};
