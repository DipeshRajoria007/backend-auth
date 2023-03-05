const router = require("express").Router();
const {
  getGoals,
  addGoals,
  updateGoals,
  deleteGoals,
} = require("../controllers/goalController");

router.route("/").get(getGoals).post(addGoals);
router.route("/:id").put(updateGoals).delete(deleteGoals);

// router.get("/", getGoals);
// router.post("/", addGoals);
// router.put("/:id", updateGoals);
// router.delete("/:id", deleteGoals);
module.exports = router;
