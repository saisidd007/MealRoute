const express = require('express');
const dotenv = require('dotenv');
const path = require("path");
const cors = require("cors");
const { protect } = require("./middleware/authMiddleware");
const authRoutes = require("./routes/authRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const menuRoutes = require("./routes/menuRoutes");
const orderRoutes = require("./routes/orderRoutes");




const connectDB = require(path.join(__dirname, "config", "db.js"));
// obtain everythinf from the .env file
dotenv.config();
connectDB();



const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
app.use("/api/auth", authRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);

app.get("/",(req,res)=>{
    res.send("Food Delivery Backend is Runnin ");
});
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})

app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "You accessed a protected route",
    user: req.user
  });
});