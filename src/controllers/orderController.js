const Order = require("../models/order");

// PLACE order
const placeOrder = async (req, res) => {
  try {
    const { restaurantId, items } = req.body;

    const order = await Order.create({
      user: req.user._id,
      restaurant: restaurantId,
      items
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET orders of logged-in user
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("restaurant", "name")
      .populate("items.menuItem", "name price");

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { placeOrder, getMyOrders };
