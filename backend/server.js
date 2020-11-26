import express from "express";
import dotenv from "dotenv";
// NOTE: files should have .js extension
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(PORT, () =>
  console.log(
    `✅ Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
