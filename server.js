const dotenv = require("dotenv");
const { app } = require("./app");
const { db } = require("./utils/database.util.js");

const { initModels } = require("./models/init.model.js");

dotenv.config({ path: "./config.env"});

const serverStart = async () => {
    try {
        await db.authenticate();
        initModels();
        await db.sync();
        PORT = 4000;
        app.listen(PORT, () => {
            console.log("Express running 4000");
        });
    } catch (error) {
        console.log(error);
    }
};

serverStart();