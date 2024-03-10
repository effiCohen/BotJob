var express = require("express");
const { QuestionModel, validQuestion } = require("../models/qustionModel");
const mongoose = require("mongoose");
var router = express.Router();

router.get("/allquestions", async (req, res) => {
  let data = await QuestionModel.find({});
  res.json(data);
});

router.get("/:questionId", async (req, res) => {
  try {
    let questionId = req.params.questionId;
    let data = await QuestionModel.findOne({ _id: questionId });
    res.json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// router.post("/", async (req, res) => {
//   let validBody = validQuestion(req.body);
//   if (validBody.error) {
//     return res.status(400).json(validBody.error.details);
//   }
//   try {
//     let data = await QuestionModel(req.body).save();
//     res.json(data);
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json(err);
//   }
// });

// Update for user answer
router.put("/:questionId", async (req, res) => {
  let questionId = req.params.questionId;
  let validBody = validQuestion(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    
    let updateData = await QuestionModel.updateOne({ _id: questionId }, req.body)
    res.status(200).json(updateData);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }

})


// router.delete("/:id", async (req, res) => {
//   try {
//     let questionId = req.params.id;
//     let result = await QuestionModel.findByIdAndDelete(questionId);
//     if (result) {
//       res.status(200).json({ message: "question deleted successfully" });
//     } else {
//       res.status(404).json({ message: "questionId not found" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

module.exports = router;
