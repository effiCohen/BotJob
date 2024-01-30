const mongoose = require("mongoose");


const interviewSchema = new mongoose.Schema({
  user_id: String,
  date_created: { type: Date, default: Date.now() },
  questions :{type: Array, default: [] },
});

exports.InterviewModel = mongoose.model("interviews", interviewSchema);

exports.validInterview = (_bodyData) => {
    let joiSchema = Joi.object({
      question: Joi.Array.min(1).max(10).allow(null,[]),
    });
  
    return joiSchema.validate(_bodyData);
  };
