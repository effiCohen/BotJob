var express = require("express");
const { questionModel, validQuestion } = require("../models/qustionModel");
const mongoose = require("mongoose");
var router = express.Router();

router.get("/question", async (req, res) => {
  let data = await questionModel.find({});
  res.json(data);
});

router.get("/:questionId", async (req, res) => {
  try {
    let questionId = req.params.questionId;
    let data = await questionModel.findOne({ _id: questionId });
    res.json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  let validBody = validQuestion(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    let data = await questionModel(req.body).save();
    res.json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});
router.delete("/:id", async (req, res) => {
  const questionId = req.params.id;

  try {
    const result = await questionModel.findByIdAndDelete(questionId);

    if (result) {
      res.status(200).json({ message: "question deleted successfully" });
    } else {
      res.status(404).json({ message: "questionId not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
