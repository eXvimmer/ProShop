import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

/* ANCHOR
 * @DESC    Create New Order
 * @ROUTE   POST /api/orders
 * @ACCESS  Private
 */
export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && !orderItems.length) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      user: req.user._id,
    });

    const createdOrder = await order.save();
    res.status(201).json({
      createdOrder,
    });
  }
});
