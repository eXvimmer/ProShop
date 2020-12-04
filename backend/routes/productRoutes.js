import express from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  udpateProduct,
} from "../controllers/productControllers.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(getProducts)
  .post(protect, admin, createProduct);

router
  .route("/:id")
  .get(getProductById)
  .put(protect, admin, udpateProduct)
  .delete(protect, admin, deleteProduct);

export default router;
