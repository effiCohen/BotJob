const Joi = require("joi");
const mongoose = require("mongoose");


const interviewSchema = new mongoose.Schema({
  user_id: String,
  user_fullName: String,
  job:String,
  experience:String,
  Time:String,
  date_created: { type: Date, default: Date.now() },
  questions :{type: Array, default: [] },
});

exports.InterviewModel = mongoose.model("interviews", interviewSchema);

exports.validInterview = (_bodyData) => {
    let joiSchema = Joi.object({
         job: Joi.string().min(1).max(100).required(),
         experience: Joi.string().min(1).max(3).required(),
         questions: Joi.number().min(1).max(5).required()
    });
    return joiSchema.validate(_bodyData);
  };
