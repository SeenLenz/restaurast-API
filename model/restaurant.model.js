const mongoose = require("mongoose");

const ResturantSchema = new mongoose.Schema({
    address: {
        building: String,
        coord: [Number],
        street: String,
        zipcode: String,
    },
    borough: String,
    cuisine: String,
    grades: [
        {
            date: Date,
            grade: String,
            score: Number,
        },
    ],
    name: String,
    restaurant_id: String,
});

const ResturantModel = mongoose.model("Restaurant", ResturantSchema);

module.exports = ResturantModel;
