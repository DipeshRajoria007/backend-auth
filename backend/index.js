const express = require("express");
const route = require("./routes/goalRoutes");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./Middleware/errorMiddleware");
const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use("/api/goals", route);
app.use(errorHandler);
app.listen(port, () => {
  console.log("listening on port " + port);
});
