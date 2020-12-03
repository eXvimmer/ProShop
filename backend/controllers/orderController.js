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

/* ANCHOR
 * @DESC    Get Order by ID
 * @ROUTE   GET /api/orders/:id
 * @ACCESS  Private
 */
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error(`Order not found`);
  }
});

/* ANCHOR
 * @DESC    Update order to paid
 * @ROUTE   GET /api/orders/:id/pay
 * @ACCESS  Private
 */
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    // PayPal result
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error(`Order not found`);
  }
});

/* ANCHOR
 * @DESC    Get logged in user orders
 * @ROUTE   GET /api/orders/myorders
 * @ACCESS  Private
 */
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });

  res.json(orders);
});
