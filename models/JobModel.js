const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    jobs: String,
  });


  exports.JobModel = mongoose.model("Jobs", jobSchema);



  exports.validJob = (_bodyData) => {
    let joiSchema = Joi.object({
      Job: Joi.Array.min(1).max(10).allow(null,[]),
    });
  
    return joiSchema.validate(_bodyData);
  };