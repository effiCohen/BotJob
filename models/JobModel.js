const Joi = require("joi");
const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    job: String,
  });


  exports.JobModel = mongoose.model("Jobs", jobSchema);



  exports.validJob = (_bodyData) => {
    let joiSchema = Joi.object({
      job: Joi.string().min(1).max(10).required(),
    });
  
    return joiSchema.validate(_bodyData);
  };