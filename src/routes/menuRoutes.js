const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const {
  addMenuItem,
  getMenuItems
} = require("../controllers/menuController");

router.post("/", protect, addMenuItem);
router.get("/:restaurantId", getMenuItems);

module.exports = router;
