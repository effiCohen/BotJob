const mongoose = require("mongoose");
const Joi = require("joi");


const questionSchema = new mongoose.Schema({
  question: String,
  userAnswer: String,
  aiAnswer: String,
});

exports.QuestionModel = mongoose.model("questions", questionSchema);

// exports.validQuestion = (_bodyData) => {
//   let joiSchema = Joi.object({
//     question: Joi.string().min(2).max(99999).required(),
//     userAnswer: Joi.string().min(2).max(99999).allow(null,""),
//     aiAnswer: Joi.string().min(1).max(99999).required(),
//   });

//   return joiSchema.validate(_bodyData);
// };
