const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createRestaurant,
  getRestaurants
} = require("../controllers/restaurantController");

router.post("/", protect, createRestaurant);
router.get("/", getRestaurants);

module.exports = router;
