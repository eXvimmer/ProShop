import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

/* ANCHOR
 * @DESC Fetch all products
 * @ROUTE Get /api/products
 * @ACCESS Public
 */
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  // res.status(401);
  // throw new Error("NOT Authorized");
  res.json(products);
});

/* ANCHOR
 * @DESC Fetch single product
 * @ROUTE Get /api/products/:id
 * @ACCESS Public
 */
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

/* ANCHOR
 * @DESC    Delete a product
 * @Route   DELETE /api/products/:id
 * @ACCESS  Private/Admin
 */
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({
      message: "Product Removed!",
    });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
