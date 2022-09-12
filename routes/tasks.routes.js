const express = require("express");

// Controllers
const {
    getAllTasks,
    getStatusTasks,
    createTask,
    updateTask,
    deleteTask,
} = require("../controllers/task.controller.js");

const { taskExists } = require("../middlewares/tasks.middlewares.js");

const tasksRouter = express.Router();

tasksRouter.get("/", getAllTasks);

tasksRouter.get("/:status", getStatusTasks);

tasksRouter.post("/", createTask);

tasksRouter.patch("/:id", taskExists, updateTask);

tasksRouter.delete("/:id", taskExists, deleteTask);

module.exports = { tasksRouter };
