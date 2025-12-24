const Restaurant = require("../models/restaurant");

const createRestaurant = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Restaurant name is required" });
    }

    const restaurant = await Restaurant.create({
      name,
      owner: req.user._id
    });

    res.status(201).json(restaurant);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createRestaurant, getRestaurants };
