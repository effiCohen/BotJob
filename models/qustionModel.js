const mongoose = require("mongoose");
const Joi = require("joi");


const questionSchema = new mongoose.Schema({
  question: String,
  aiAnswer: String,
  userAnswer: String,
});

exports.QuestionModel = mongoose.model("questions", questionSchema);

exports.validQuestion = (_bodyData) => {
  let joiSchema = Joi.object({
    userAnswer: Joi.string().min(2).max(99999).allow(null,""),
  });

  return joiSchema.validate(_bodyData);
};
