const express = require("express");
const goalRoute = require("./routes/goalRoutes");
const userRoute = require("./routes/userRoutes");
const dotenv = require("dotenv").config();
const colors = require("colors");
const { errorHandler } = require("./Middleware/errorMiddleware");

const connectDB = require("./config/db");
const port = process.env.PORT || 5000;
connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/goals", goalRoute);
app.use("/api/users", userRoute);
app.use(errorHandler);
app.listen(port, () => {
  console.log("listening on port " + port);
});
