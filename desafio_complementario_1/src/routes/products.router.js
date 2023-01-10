import { Router } from "express";

import {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProductById,
  deleteall,
} from "../controllers/products.controller.js";

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", addProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProductById);
router.delete("/", deleteall);

export default router;
