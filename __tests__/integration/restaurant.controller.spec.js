const request = require("supertest");
const app = require("../../app");
const newRestaurant = require("../mock-data/new-restaurant.json");

let firstRestaurant;
let createdRestaurant;
let badID = "ad";

describe("Restaurants Integration Tests", () => {
    it("should return 200 and get restaurants", async () => {
        const response = await request(app).get("/api/");
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body[0].address).toBeDefined();
        expect(response.body[0].borough).toBeDefined();
        expect(response.body[0].cuisine).toBeDefined();
        expect(response.body[0].grades).toBeDefined();
        expect(response.body[0].name).toBeDefined();
        expect(response.body[0].restaurant_id).toBeDefined();
        firstRestaurant = response.body[0];
    }, 60000);
    it("should return 200 and get restaurant by ID", async () => {
        const response = await request(app).get("/api/" + firstRestaurant._id);
        expect(response.statusCode).toBe(200);
        expect(response.body._id).toBe(firstRestaurant._id);
        expect(response.body.address).toStrictEqual(firstRestaurant.address);
        expect(response.body.grades).toStrictEqual(firstRestaurant.grades);
        expect(response.body.borough).toBe(firstRestaurant.borough);
        expect(response.body.cuisine).toBe(firstRestaurant.cuisine);
        expect(response.body.name).toBe(firstRestaurant.name);
        expect(response.body.restaurant_id).toBe(firstRestaurant.restaurant_id);
    }, 60000);
    it("should return 404 when ID doesnt exist", async () => {
        const response = await request(app).get("/api/" + badID);
        expect(response.statusCode).toBe(404);
    });
    it("should create new Restaurant and return 201", async () => {
        const response = await request(app).post("/api/").send(newRestaurant);
        expect(response.statusCode).toBe(201);
        createdRestaurant = response.body;
        expect(response.body.address).toStrictEqual(newRestaurant.address);
        expect(response.body.grades).toStrictEqual(newRestaurant.grades);
        expect(response.body.borough).toBe(newRestaurant.borough);
        expect(response.body.cuisine).toBe(newRestaurant.cuisine);
        expect(response.body.name).toBe(newRestaurant.name);
        expect(response.body.restaurant_id).toBe(newRestaurant.restaurant_id);
    });
    it("should patch Restaurant by ID", async () => {
        newRestaurant.name = "placeholder";
        const response = await request(app)
            .patch("/api/" + createdRestaurant._id)
            .send(newRestaurant);
        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe(newRestaurant.name);
        expect(response.body.address).toStrictEqual(createdRestaurant.address);
        expect(response.body.grades).toStrictEqual(createdRestaurant.grades);
        expect(response.body.borough).toBe(createdRestaurant.borough);
        expect(response.body.cuisine).toBe(createdRestaurant.cuisine);
        expect(response.body.restaurant_id).toBe(
            createdRestaurant.restaurant_id
        );
    });
    it("should return 404 when trying to patch non-existent ID", async () => {
        const response = await request(app)
            .patch("/api/" + badID)
            .send(newRestaurant);
        expect(response.statusCode).toBe(404);
    });
    it("should delete by ID and return 200", async () => {
        const response = await request(app).delete(
            "/api/" + createdRestaurant._id
        );
        expect(response.statusCode).toBe(200);
    });
    it("should return 404 when deleting non-existent ID", async () => {
        const response = await request(app).delete("/api/" + badID);
        expect(response.statusCode).toBe(404);
    });
});
