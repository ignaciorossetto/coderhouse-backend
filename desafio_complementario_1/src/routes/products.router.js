import { Router } from "express";
import { passportCall } from "../utils.js";


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
router.post("/", passportCall('jwt-premium'), addProduct);
router.put("/:id", updateProduct);
router.delete("/:id", passportCall('jwt-premium'), deleteProductById);
router.delete("/", deleteall);

export default router;
