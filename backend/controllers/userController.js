const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { response } = require("express");
const getUsers = asyncHandler(async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: "Users not found" });
  }
  return res.json({ users });
});

const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("please complete Info");
  }
  let userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error(" user already exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  let user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  return res.status(201).json({
    id: user._id,
    name,
    email,
    token: GenerateToken(user._id),
  });
});
const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  const checkPass = await bcrypt.compare(password, user.password);

  if (!checkPass) {
    res.status(401);
    throw new Error("incorrect password");
  }
  res.status(200).json({
    id: user._id,
    name: user.name,
    email,
    token: GenerateToken(user._id),
  });
});
const currentUser = asyncHandler(async (req, res, next) => {
  res.status(200).json({ user: req.user });
});

const GenerateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  getUsers,
  registerUser,
  loginUser,
  currentUser,
};
