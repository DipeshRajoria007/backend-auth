const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");
const { request, response } = require("express");

const Protect = asyncHandler(async (req, res, next) => {
  let token = req.headers.authorization
    ? req.headers.authorization.startsWith("Bearer")
      ? req.headers.authorization.split(" ")[1]
      : undefined
    : undefined;
  if (token) {
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decode);
      req.user = await User.findById(decode.id).select("-password");
      next();
    } catch (e) {
      console.error(e);
      res.status(401);
      throw new Error("Not authorized");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("No token provided");
  }
});
module.exports = Protect;
