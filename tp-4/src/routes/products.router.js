import { Router } from "express";
import productManager from "../managers/productManager.js";
import __dirname from "../utils.js";
import { productModel } from "../models/product.model.js";

const manager = new productManager(__dirname + "/managers/db/products.json");
const router = Router();

router.get("/", async (req, res) => {
  // const products = await manager.getAll();
  // if (req.query.limit) {
  //   return res.json(products.products.slice(0, req.query.limit));
  // }
  // return res.json(products);
  try {
    const products = await productModel.find()
    console.log(products);
    res.json(products)
  } catch (error) {
    res.json(error)
  }

});

router.get("/:pid", async (req, res) => {
  const id = Number(req.params.pid);
  const product = await manager.getProductById(Number(id));
  if (!product) {
    return res.json(`No se encontro el producto con id: ${id}`);
  }

  return res.json(product);
});

router.post("/", async (req, res) => {
  // const response = await manager.addProduct(
  //   req.body.title,
  //   req.body.description,
  //   req.body.price,
  //   req.body.thumbnail,
  //   req.body.code,
  //   req.body.stock,
  //   req.body.status
  // );
  // if (response.includes("Ya se registro")) {
  //   return res.status(400).json(response);
  // } else {
  //   res.status(200).json(response);
  // }

  const result = await productModel.create(req.body)
  res.json(result)

});

router.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const response = await manager.updateProduct(id, req.body);
  res.json(response);
});

router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const response = await manager.deleteProductById(id);
  res.json(response);
});

router.delete("/", async (req, res) => {
  const response = await manager.deleteAll();
  res.json(response);
});

export default router;
