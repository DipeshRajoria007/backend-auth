const asyncHandler = require("express-async-handler");

const getGoals = asyncHandler(async (req, res) => {
  res.json({
    message: "Get goals",
  });
});
const addGoals = asyncHandler(async (req, res) => {
  const { text } = req.body;
  if (!text) {
    res.status(400);
    throw new Error("please provide a text");
  }
  res.json({
    message: "Added goal",
  });
});
const updateGoals = asyncHandler(async (req, res) => {
  const id = req.params.id;
  res.json({
    message: `Update goal ${id}`,
  });
});
const deleteGoals = asyncHandler(async (req, res) => {
  const id = req.params.id;
  res.json({
    message: `Delete goal ${id}`,
  });
});
module.exports = {
  getGoals,
  updateGoals,
  deleteGoals,
  addGoals,
};
