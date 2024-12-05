const express = require("express");
const restaurantController = require("../controllers/restaurant.controller");

const router = express.Router();

router.get("/", restaurantController.getRestaurant);
router.get("/:restaurantId", restaurantController.getRestaurantById);
router.post("/", restaurantController.createRestaurant);
router.put("/:restaurantId", restaurantController.updateRestaurant);
router.delete("/:restaurantId", restaurantController.deleteRestaurant);

module.exports = router;
