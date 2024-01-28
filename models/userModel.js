const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    pass: String,
    role: String,
});

const UserModel = mongoose.model("users", userSchema);
exports.UserModel = UserModel;

exports.validUser = (_bodyData) => {
  let joiSchema = Joi.object({
    name: Joi.string().min(2).max(99).required(),
    email: Joi.string().min(5).max(99).required(),
    pass: Joi.string().min(2).max(99).required(),
    role: Joi.string().min(2).max(99).required(),
  });

  return joiSchema.validate(_bodyData);
}

exports.registerUser = async (userData) => {
  try {
    console.log('Attempting to register user:', userData); // הוספת לוג לפני ניסיון הרישום

    const { error } = exports.validUser(userData);
    if (error) {
      throw new Error(error.details[0].message);
    }

    const user = new UserModel(userData);
    await user.save();

    console.log('User registered successfully:', user); // הוספת לוג לאחר ניסיון הרישום

    return user;
  } catch (error) {
    console.error('Registration error:', error.message);
    throw new Error(error.message);
  }
}
