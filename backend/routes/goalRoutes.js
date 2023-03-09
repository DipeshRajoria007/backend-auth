const goalRouter = require("express").Router();
const {
  getGoals,
  addGoals,
  updateGoals,
  deleteGoals,
} = require("../controllers/goalController");
const Protect = require("../middleware/authMiddleware");
goalRouter.route("/").get(Protect, getGoals).post(Protect, addGoals);
goalRouter.route("/:id").put(Protect, updateGoals).delete(Protect, deleteGoals);

// router.get("/", getGoals);
// router.post("/", addGoals);
// router.put("/:id", updateGoals);
// router.delete("/:id", deleteGoals);
module.exports = goalRouter;
