const asyncHandler = require("express-async-handler");
const Goal = require("../models/goal.model");
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find();
  res.json({
    message: goals,
  });
});
const addGoals = asyncHandler(async (req, res) => {
  const { text } = req.body;
  if (!text) {
    res.status(400);
    throw new Error("please provide a text");
  }
  const goal = await Goal.create({
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
  res.json({
    message: updatedGoal,
  });
});
const deleteGoals = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const goal = await Goal.findById(id);
  if (!goal) {
    res.status(404);
    throw new Error({ message: "Goal not found" });
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
