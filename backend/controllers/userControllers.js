// TODO: add validators to user schema
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

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
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

/* ANCHOR
 * @DESC        Register a new user
 * @ROUTE       POST /api/users
 * @ACCESS      Public
 */
export const registerUser = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

/* ANCHOR
 * @DESC        Get user profile
 * @ROUTE       GET /api/users/profile
 * @ACCESS      Private
 */
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/* ANCHOR
 * @DESC        Update user profile
 * @ROUTE       PUT /api/users/profile
 * @ACCESS      Private
 */
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save({
      validateBeforeSave: true,
    });

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/* ANCHOR
 * @DESC        Get all users
 * @ROUTE       GET /api/users
 * @ACCESS      Private / Admin
 */
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});

  res.json(users);
});

/* ANCHOR
 * @DESC        Delete a user
 * @ROUTE       DELETE /api/users/:id
 * @ACCESS      Private / Admin
 */
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({
      message: "User Removed!",
    });
  } else {
    res.status(404);
    throw new Error("User Not found");
  }
});
