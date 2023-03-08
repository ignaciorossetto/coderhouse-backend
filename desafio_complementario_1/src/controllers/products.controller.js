import { cartModel } from "../dao/mongo/models/carts.model.js";
import { ProductService } from "../repository/index.js";


export const getAllProducts = async (req, res) => {
  let categoryName = req.query.category
  const catQuery = categoryName === undefined || categoryName === 'undefined'  ? {} : {category: categoryName}
  
  const limitQuery = req.query.limit === undefined ? 1000 : req.query.limit
  const pageQuery = req.query.page || 1
  const sortQuery = req.query.sort

  try {
      const response = await ProductService.getAllPaginate(catQuery, {
        limit: limitQuery, page: pageQuery, sort: sortQuery === 'asc' ? {price:1} : sortQuery === 'desc' ? {price:-1} : {}
      })
      if(categoryName === "men's clothing" || categoryName === "women's clothing"){
        categoryName = categoryName.replace("'", "-")
      }
      return res.status(200).json({
        status: 'success',
        payload:response.docs,
        totalPages: response.totalPages,
        prevPage: response.prevPage,
        nextPage: response.nextPage,
        page: response.page,
        hasPrevPage: response.hasPrevPage,
        hasNextPage: response.hasNextPage,
        prevLink: response.hasPrevPage ? `http://localhost:5000/api/products?sort=${sortQuery}&category=${categoryName}&limit=${limitQuery}&page=${response.prevPage}` : null,
        nextLink: response.hasNextPage ? `http://localhost:5000/api/products?sort=${sortQuery}&category=${categoryName}&limit=${limitQuery}&page=${response.nextPage}` : null,
      })
    
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getProductById = async (req, res) => {
  const ide = req.params.id;

  if (ide === 'categories') {
    const response = await ProductService.getAll();
    const Prod_categories = response.map(({category})=> (category))
    const categories = [...new Set(Prod_categories)]
    return res.status(200).json(categories);
  }

  try {
    const id = req.params.id;
    const response = await ProductService.getOne(id);
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
    const response = await ProductService.add(req.body);
    res.json({ product: response, status: "success" });
  } catch (error) {
    res.status(404).json({ message: "Error creating product", error: error });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const obj = req.body;
    const response = await ProductService.update(id, obj);
    res.json({ product: response, status: "success" });
  } catch (error) {
    res.status(404).json({ message: "Error updating product", error: error });
  }
};

export const deleteProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await ProductService.delete(id);
    res.json({ product: response, status: "success" });
  } catch (error) {
    res.status(404).json({ message: "Error deleting product", error: error });
  }
};

export const deleteall = async (req, res) => {
  try {
    const response = await ProductService.deleteAll();
    res.json({ product: response, status: "success" });
  } catch (error) {
    res.status(404).json({ message: "Error deleting products", error: error });
  }
};

