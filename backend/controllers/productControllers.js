import e from "express";
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

/* ANCHOR
 * @DESC    Create a product
 * @Route   POST /api/products
 * @ACCESS  Private/Admin
 */
export const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample Name",
    price: 0.0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample Brand",
    category: "Sample Category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample Description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

/* ANCHOR
 * @DESC    Update a product
 * @Route   PUT /api/products/:id
 * @ACCESS  Private/Admin
 */
export const udpateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    /* 
     NOTE
     * I didn't use status(204), because I want to get back
     * the prodcuts as response.
    */
    res.status(200).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

/* ANCHOR
 * @DESC    Create new review
 * @Route   POST /api/products/:id/reviews
 * @ACCESS  Private/Admin
 */
export const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      r => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewd");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, cur) => cur.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
