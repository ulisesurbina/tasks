const { User } = require("../models/user.model.js");
const { Task } = require("../models/task.model.js");

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll({
            attributes: [
                "id",
                "userId",
                "title",
                "limitDate",
                "startDate",
                "finishDate",
                "status",
            ],
            include: {
                model: User,
                attributes: ["id", "name", "email", "status"],
            },
        });
        res.status(200).json({
            status: "success",
            data: {
                tasks,
            },
        });
    } catch (error) {
        console.log(error);
    }
};

const getStatusTasks = async (req, res) => {
    try {
        const { status } = req.params;
        const task = await Task.findAll({
            where: { status },
        });
        if (!task) {
            return res.status(404).json({
                status: "error",
                message:
                    "Status of task not found. Acepted status: completed, active, late, cancelled",
            });
        }
        res.status(200).json({
            status: "success",
            data: {
                task,
            },
        });
    } catch (error) {
        console.log(error);
    }
};

const createTask = async (req, res) => {
    try {
        const { title, userId, startDate, limitDate } = req.body;
        const newTask = await Task.create({
            title,
            userId,
            startDate,
            limitDate,
        });
        res.status(201).json({
            status: "success",
            data: {
                newTask,
            },
        });
    } catch (error) {
        console.log(error);
    }
};

const updateTask = async (req, res) => {
    try {
        const { finishDate } = req.body;
        const { task } = req;
        await task.update({ finishDate, status: "completed" });
        res.status(200).json({
            status: "success",
            data: { task },
        });
    } catch (error) {
        console.log(error);
    }
};

const deleteTask = async (req, res) => {
    try {
        const { task } = req;
        await task.update({ status: "cancelled" });
        res.status(200).json({ status: "success" });
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getAllTasks,
    getStatusTasks,
    createTask,
    updateTask,
    deleteTask,
};
