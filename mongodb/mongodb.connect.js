const mongoose = require("mongoose");
require("dotenv").config();

async function connect() {
    try {
        await mongoose.connect(
            process.env.DATABASE_URL,
            { useNewUrlParser: true }
        );
    } catch (error) {
        console.error("Hiba a kapcsolódásnál!");
        console.error(error);
    }
}

module.exports = { connect };
