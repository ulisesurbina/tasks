const { Task } = require("../models/task.model.js");

const taskExists = async (req, res, next) => {
    try {
        const { id } = req.params;
        const task = await Task.findOne({
            where: [{ id }, { status: "active" }],
        });
        if (!task) {
            return res.status(404).json({
                status: "error",
                message:
                    "Task not found, only tasks with active status are shown.",
            });
        }
        req.task = task;
        next();
    } catch (error) {
        console.log(error);
    }
};

module.exports = { taskExists };
