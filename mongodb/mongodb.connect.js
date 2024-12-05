const mongoose = require("mongoose");

async function connect() {
    try {
        await mongoose.connect(
            "mongodb+srv://SuperTestUser:supertestuser@cluster0.ht2u7ah.mongodb.net/todo-tdd",
            { useNewUrlParser: true }
        );
    } catch (error) {
        console.error("Hiba a kapcsolódásnál!");
        console.error(error);
    }
}

module.exports = { connect };
