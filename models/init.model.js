const { User } = require("./user.model.js");
const { Task } = require("./task.model.js");

const initModels = () => {
    // I user <-----> M tasks
    User.hasMany(Task, { foreignKey: "userId" });
    Task.belongsTo(User);
};

module.exports = { initModels };