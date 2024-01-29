const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
    FullName: String,
    email: String,
    password: String,
    DateOfBirth: Date,
    role: {
        type: String, default: "user"
    },
    verifictionCode: String,
    verifiction: {
        type: Boolean, default: false
    },
});

exports.UserModel = mongoose.model("users", userSchema);

exports.genToken = (_userId, _role) => {
    let token = jwt.sign({ _id: _userId, role: _role }, "botjob", { expiresIn: "600mins" });
    return token;
  }

exports.validUser = (_bodyData) => {

    let joiSchema = Joi.object({
        FullName: Joi.string().min(2).max(99).required(),
        email: Joi.string().min(5).max(99).email().required(),
        password: Joi.string().min(2).max(99).required(),
        DateOfBirth: Joi.date().allow(null, ""),
    });

    return joiSchema.validate(_bodyData);
};

exports.validateLogin = (_bodyReq) => {
    let joiSchema = Joi.object({
      email: Joi.string().min(2).max(150).email().required(),
      password: Joi.string().min(3).max(100).required(),
    })
    return joiSchema.validate(_bodyReq);
  }
