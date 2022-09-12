const { body, validationResult } = require("express-validator");

const checkValidations = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => {
            return error.msg;
        });
        const message = errorMessages.join(". ");
        return res.status(400).json({
            status: "error",
            message,
        });
    }
    next();
};

const createUserValidators = [
    body("name")
        .isString()
        .withMessage("Name must be a string")
        .notEmpty()
        .withMessage("Name cannot be emply")
        .isLength({ min: 3, max: 30 })
        .withMessage("Name must be at least 3 characters"),
    body("email").isEmail().withMessage("Must provide a valid email"),
    body("password")
        .isString()
        .withMessage("Password must be a string")
        .notEmpty()
        .withMessage("Password cannot be emply")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters"),
    checkValidations,
];

module.exports = { createUserValidators };