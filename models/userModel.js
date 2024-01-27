const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
    FullName: String,
    email: String,
    password: String,
    DateOfBirth: String,
    role: String,
});

const UserModel = mongoose.model("users", userSchema);
exports.UserModel = UserModel;

exports.validUser = (_bodyData) => {
    let joiSchema = Joi.object({
        FullName: Joi.string().min(2).max(99).required(),
        email: Joi.string().min(5).max(99).required(),
        password: Joi.string().min(2).max(99).required(),
        DateOfBirth: Joi.string().regex(/^\d{2}\/\d{2}\/\d{4}$/).required(),
        role: Joi.string(),
    });

    return joiSchema.validate(_bodyData);
};