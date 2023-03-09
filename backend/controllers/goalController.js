const asyncHandler = require("express-async-handler");
const Goal = require("../models/goal.model");
const User = require("../models/user.model");
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.json({
    message: goals,
    user: req.user.id,
  });
});
const addGoals = asyncHandler(async (req, res) => {
  const { text } = req.body;
  if (!text) {
    res.status(400);
    throw new Error("please provide a text");
  }
  const goal = await Goal.create({
    user: req.user.id,
    text,
  });
  res.json({
    message: goal,
  });
});
const updateGoals = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { text } = req.body;
  const goal = await Goal.findById(id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }
  console.log(req.body);
  const updatedGoal = await Goal.findByIdAndUpdate(
    id,
    { text },
    {
      new: true,
    }
  );
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  // make sure the logged in user can delete his goals
  if (goal.user.id.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized to delete");
  }
  res.json({
    message: updatedGoal,
  });
});
const deleteGoals = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const goal = await Goal.findById(id);
  if (!goal) {
    res.status(404);
    throw new Error("Goal not found");
  }
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  // make sure the logged in user can delete his goals
  if (goal.user.id.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized to delete");
  }
  const deletedGoal = await Goal.findByIdAndDelete(id);
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
