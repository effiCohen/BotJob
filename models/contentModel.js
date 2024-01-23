const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Joi = require('joi');

// Answer Model
const answerSchema = new mongoose.Schema({
    text: String,
    // Add other fields as needed
});

const AnswerModel = mongoose.model('answers', answerSchema);

// AI Answer Model
const aiAnswerSchema = new mongoose.Schema({
    text: String,
    // Add other fields as needed
});

const AiAnswerModel = mongoose.model('aiAnswers', aiAnswerSchema);

// Validation function using Joi for Answer
const validateAnswer = (_bodyData) => {
    const joiSchema = Joi.object({
        text: Joi.string().min(2).max(255).required(),
        // Add validations for other fields as needed
    });

    return joiSchema.validate(_bodyData);
};

// Validation function using Joi for AI Answer
const validateAiAnswer = (_bodyData) => {
    const joiSchema = Joi.object({
        text: Joi.string().min(2).max(255).required(),
        // Add validations for other fields as needed
    });

    return joiSchema.validate(_bodyData);
};

// New Answer Route (GET)
router.get('/new', (req, res) => {
    res.render('new-answer'); // You need to create a new-answer.ejs file for rendering the form
});

// Handle the form submission to create a new answer
router.post('/new', async (req, res) => {
    const { error } = validateAnswer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Create a new answer
    const newAnswer = new AnswerModel({
        text: req.body.text,
        // Assign other fields as needed
    });

    try {
        const result = await newAnswer.save();
        res.status(201).send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// New AI Answer Route (GET)
router.get('/new-ai', (req, res) => {
    res.render('new-ai-answer'); // You need to create a new-ai-answer.ejs file for rendering the form
});

// Handle the form submission to create a new AI answer
router.post('/new-ai', async (req, res) => {
    const { error } = validateAiAnswer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Create a new AI answer
    const newAiAnswer = new AiAnswerModel({
        text: req.body.text,
        // Assign other fields as needed
    });

    try {
        const result = await newAiAnswer.save();
        res.status(201).send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;

