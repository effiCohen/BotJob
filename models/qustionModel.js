const mongoose = require("mongoose");
const Joi = require("joi");

const questionSchema = new mongoose.Schema({
  question: String,
  Aianswer: String,
  useranswer: String,
});

const questionModel = mongoose.model("question", questionSchema);
exports.questionModel = questionModel;

exports.validQuestion = (_bodyData) => {
  let joiSchema = Joi.object({
    question: Joi.string().min(2).max(99).required(),
    Aianswer: Joi.string().min(5).max(99).required(),
    useranswer: Joi.string().min(2).max(99).required(),
  });

  return joiSchema.validate(_bodyData);
};
