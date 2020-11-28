import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

/* ANCHOR
 * @DESC        Auth user and get token
 * @ROUTE       POST /api/users/login
 * @ACCESS      Public
 */
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      /* TODO: add token */
      token: null,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});
