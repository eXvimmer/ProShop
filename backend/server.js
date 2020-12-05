import path from "path";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
// NOTE: files should have .js extension
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import {
  errorHandler,
  notFound,
} from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
connectDB();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
    // limit: "10kb",
  })
);

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/uploads", uploadRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

/* 
 NOTE
 * __dirname is a commonJS thing. It's not available
 * if you're using ES modules. So you have to mimick this ⬇
*/
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

/* 
 ANCHOR
 * fallback for 404s
 */
app.use(notFound);

/* 
 ANCHOR
 * Custom error handling middleware
 */
app.use(errorHandler);

app.listen(PORT, () =>
  console.log(
    `✅ Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
