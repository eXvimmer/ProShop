import express from "express";
import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

const router = express.Router();

/* ANCHOR
 * @DESC Fetch all products
 * @ROUTE Get /api/products
 * @ACCESS Public
 */
router.route("/").get(
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);

/* ANCHOR
 * @DESC Fetch single product
 * @ROUTE Get /api/products/:id
 * @ACCESS Public
 */
router.route("/:id").get(
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      return res.json(product);
    } else {
      res.status(404).json({
        message: "Product not found",
      });
    }
  })
);

export default router;
