const RestaurantController = require("../../controllers/restaurant.controller");
const RestaurantModel = require("../../model/restaurant.model");
const httpMocks = require("node-mocks-http");
const Restaurant = require("../mock-data/new-restaurant.json");
const allRestaurants = require("../mock-data/all-restaurants.json");

jest.mock("../../model/restaurant.model.js");

let req, res, next;
const restaurantId = "30075445";
beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});

describe("RestaurantController.getRestaurantById tests", () => {
    it("should have a getRestaurantById function", () => {
        expect(typeof RestaurantController.getRestaurantById).toBe("function");
    });
    it("should call RestaurantModel.findById with correct ID", async () => {
        req.params.restaurantId = "30075445";
        await RestaurantController.getRestaurantById(req, res, next);
        expect(RestaurantModel.findById).toHaveBeenCalledWith("30075445");
    });
    it("should return 200 OK with restaurant details", async () => {
        RestaurantModel.findById.mockReturnValue(Restaurant);
        await RestaurantController.getRestaurantById(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(Restaurant);
    });
    it("should handle errors gracefully", async () => {
        const errorMessage = { message: "Error finding ..." };
        const rejectedPromise = Promise.reject(errorMessage);
        RestaurantModel.findById.mockReturnValue(rejectedPromise);
        await RestaurantController.getRestaurantById(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    });
    it("should return 404 Not Found for non-existent restaurant", async () => {
        RestaurantModel.findById.mockReturnValue(null);
        await RestaurantController.getRestaurantById(req, res, next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBeTruthy();
    });
});

describe("RestaurantController.createRestaurant tests", () => {
    beforeEach(() => {
        req.body = Restaurant;
    });
    it("should have a createRestaurant function", () => {
        expect(typeof RestaurantController.createRestaurant).toBe("function");
    });
    it("should call RestaurantModel.create with correct data", () => {
        RestaurantController.createRestaurant(req, res, next);
        expect(RestaurantModel.create).toHaveBeenCalledWith(Restaurant);
    });
    it("should return 201 Created with new restaurant details", async () => {
        await RestaurantController.createRestaurant(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled).toBeTruthy();
    });
    it("should return 201 Created with new restaurant JSON body", async () => {
        RestaurantModel.create.mockReturnValue(Restaurant);
        await RestaurantController.createRestaurant(req, res, next);
        expect(res._getJSONData()).toStrictEqual(Restaurant);
    });
    it("should handle errors gracefully", async () => {
        const errorMessage = { message: "error creating restaurant" };
        const rejectedPromise = Promise.reject(errorMessage);
        RestaurantModel.create.mockReturnValue(rejectedPromise);
        await RestaurantController.createRestaurant(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    });
});

describe("RestaurantController.getRestaurants", () => {
    it("should have a getRestaurants function", () => {
        expect(typeof RestaurantController.getRestaurants).toBe("function");
    });
    it("should call RestaurantModel.find({})", async () => {
        await RestaurantController.getRestaurants(req, res, next);
        expect(RestaurantModel.find).toHaveBeenCalledWith({});
    });
    it("should return response with status 200 and all restaurants", async () => {
        RestaurantModel.find.mockReturnValue(allRestaurants);
        await RestaurantController.getRestaurants(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(allRestaurants);
    });
    it("should handle errors in getRestaurants", async () => {
        const errorMessage = { message: "Error finding" };
        const rejectedPromise = Promise.reject(errorMessage);
        RestaurantModel.find.mockReturnValue(rejectedPromise);
        await RestaurantController.getRestaurants(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    });
});

describe("RestaurantController.deleteRestaurant tests", () => {
    it("should have a deleteRestaurant function", () => {
        expect(typeof RestaurantController.deleteRestaurant).toBe("function");
    });
    it("should call RestaurantModel.findByIdAndDelete with correct ID", async () => {
        req.params.restaurantId = restaurantId;
        await RestaurantController.deleteRestaurant(req, res, next);
        expect(RestaurantModel.findByIdAndDelete).toHaveBeenCalledWith(
            restaurantId
        );
    });
    it("should return 200 OK with deletion confirmation", async () => {
        req.params.restaurantId = restaurantId;
        RestaurantModel.findByIdAndDelete.mockReturnValue({ deleted: true });
        await RestaurantController.deleteRestaurant(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual({ deleted: true });
    });
    it("should handle errors gracefully", async () => {
        const errorMessage = { message: "Error deleting restaurant..." };
        const rejectedPromise = Promise.reject(errorMessage);
        RestaurantModel.findByIdAndDelete.mockReturnValue(rejectedPromise);
        await RestaurantController.deleteRestaurant(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    });
    it("should return 404 Not Found for non-existent restaurant", async () => {
        RestaurantModel.findByIdAndDelete.mockReturnValue(null);
        await RestaurantController.deleteRestaurant(req, res, next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBeTruthy();
    });
});

describe("RestaurantController.updateRestaurant", () => {
    it("should have a updateRestaurant function", () => {
        expect(typeof RestaurantController.updateRestaurant).toBe("function");
    });
    it("should call RestaurantModel.findByIdAndUpdate with Id parameter", async () => {
        req.params.restaurantId = restaurantId;
        req.body = Restaurant;
        await RestaurantController.updateRestaurant(req, res, next);
        expect(RestaurantModel.findByIdAndUpdate).toHaveBeenCalledWith(
            restaurantId,
            Restaurant,
            {
                new: true,
                useFindAndModify: false,
            }
        );
    });
    it("should return a response with json and code 200", async () => {
        req.params.restaurantId = restaurantId;
        req.body = Restaurant;
        RestaurantModel.findByIdAndUpdate.mockReturnValue(Restaurant);
        await RestaurantController.updateRestaurant(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(Restaurant);
    });
    it("should handle errors in updateRestaurant", async () => {
        const errorMessage = { message: "Error finding ..." };
        const rejectedPromise = Promise.reject(errorMessage);
        RestaurantModel.findByIdAndUpdate.mockReturnValue(rejectedPromise);
        await RestaurantController.updateRestaurant(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    });
    it("should return 404 when item doesnt exist", async () => {
        RestaurantModel.findByIdAndUpdate.mockReturnValue(null);
        await RestaurantController.updateRestaurant(req, res, next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBeTruthy();
    });
});
