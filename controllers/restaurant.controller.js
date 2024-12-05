const RestaurantModel = require("../model/restaurant.model");

exports.getRestaurantById = async (req, res, next) => {
    try {
        const restaurantModel = await RestaurantModel.findById(
            req.params.restaurantId
        );
        if (restaurantModel) {
            res.status(200).json(restaurantModel);
        } else {
            res.status(404).send();
        }
    } catch (error) {
        next(error);
    }
};

exports.getRestaurants = async (req, res, next) => {
    try {
        const restaurants = await RestaurantModel.find({});
        res.status(200).json(restaurants);
    } catch (err) {
        next(err);
    }
};

exports.createRestaurant = async (req, res, next) => {
    try {
        const createdModel = await RestaurantModel.create(req.body);
        res.status(201).json(createdModel);
    } catch (err) {
        next(err);
    }
};

exports.updateRestaurant = async (req, res, next) => {
    try {
        const updatedRestaurant = await RestaurantModel.findByIdAndUpdate(
            req.params.restaurantId,
            req.body,
            {
                new: true,
                useFindAndModify: false,
            }
        );
        if (updatedRestaurant) {
            res.status(200).json(updatedRestaurant);
        } else {
            res.status(404).send();
        }
    } catch (error) {
        next(error);
    }
};

exports.deleteRestaurant = async (req, res, next) => {
    try {
        const deletedRestaurant = await RestaurantModel.findByIdAndDelete(
            req.params.restaurantId
        );

        if (deletedRestaurant) {
            res.status(200).json(deletedRestaurant);
        } else {
            res.status(404).send();
        }
    } catch (error) {
        next(error);
    }
};
