const MenuItem = require("../models/menuItem");
const Restaurant = require("../models/restaurant");

// ADD menu item (protected)
const addMenuItem = async (req, res) => {
  try {
    const { name, price, restaurantId } = req.body;
    
    // check restaurant exists
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const menuItem = await MenuItem.create({
      name,
      price,
      restaurant: restaurantId
    });

    res.status(201).json(menuItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET menu items for a restaurant
const getMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.find({
      restaurant: req.params.restaurantId
    });

    res.json(menuItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addMenuItem, getMenuItems };
