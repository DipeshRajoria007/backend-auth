const express = require("express");
const route = require("./routes/goalRoutes");
const dotenv = require("dotenv").config();
const colors = require("colors");
const { errorHandler } = require("./Middleware/errorMiddleware");

const connectDB = require("./config/db");
const port = process.env.PORT || 5000;
connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/goals", route);
app.use(errorHandler);
app.listen(port, () => {
  console.log("listening on port " + port);
});
