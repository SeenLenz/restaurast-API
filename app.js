require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const restaurantRoutes = require("./routes/restaurant.routes");

mongoose.connect(process.env.DATABASE_URL);

app.use(express.json());
app.use("/api", restaurantRoutes);

module.exports = app;
