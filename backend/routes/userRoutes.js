const express = require("express");
const userRouter = express.Router();
const {
  getUsers,
  registerUser,
  loginUser,
  currentUser,
} = require("../controllers/userController.js");
const Protect = require("../middleware/authMiddleware.js");
userRouter.route("/").get(getUsers).post(registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/currentuser", Protect, currentUser);
module.exports = userRouter;
