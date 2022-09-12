const express = require("express");

// Controllers
const {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
} = require("../controllers/user.controller.js");

// Middlewares
const { userExists } = require("../middlewares/users.middlewares.js");
const {
    createUserValidators,
} = require("../middlewares/validators.middlewares.js");

const usersRouter = express.Router();

usersRouter.get("/", getAllUsers);

usersRouter.post("/", createUserValidators, createUser);

usersRouter.patch("/:id", userExists, updateUser);

usersRouter.delete("/:id", userExists, deleteUser);

module.exports = { usersRouter };
