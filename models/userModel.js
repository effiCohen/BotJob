const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
    FullName: String,
    email: String,
    password: String,
    DateOfBirth: Date,
    role: String,
});

const UserModel = mongoose.model("users", userSchema);
exports.UserModel = UserModel;

exports.validUser = (_bodyData) => {
    let joiSchema = Joi.object({
        FullName: Joi.string().min(2).max(99).required(),
        email: Joi.string().min(5).max(99).required(),
        password: Joi.string().min(2).max(99).required(),

        DateOfBirth: Joi.date().required(),
        role: Joi.string(),
    });

    return joiSchema.validate(_bodyData);
};