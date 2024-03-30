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

module.exports = router;
