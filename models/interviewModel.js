const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Joi = require('joi');

// Interview Model
const interviewSchema = new mongoose.Schema({
    interviewer: String,
    interviewee: String,
    date: Date,
    // Add other fields as needed
});

const InterviewModel = mongoose.model('interviews', interviewSchema);

// Validation function using Joi
const validateInterview = (_bodyData) => {
    const joiSchema = Joi.object({
        interviewer: Joi.string().min(2).max(99).required(),
        interviewee: Joi.string().min(2).max(99).required(),
        date: Joi.date().iso().required(),
        // Add validations for other fields as needed
    });

    return joiSchema.validate(_bodyData);
};

// New Interview Route (GET)
router.get('/new', (req, res) => {
    res.render('new-interview'); // You need to create a new-interview.ejs file for rendering the form
});

// Handle the form submission to create a new interview
router.post('/new', async (req, res) => {
    const { error } = validateInterview(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Create a new interview
    const newInterview = new InterviewModel({
        interviewer: req.body.interviewer,
        interviewee: req.body.interviewee,
        date: req.body.date,
        // Assign other fields as needed
    });

    try {
        const result = await newInterview.save();
        res.status(201).send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
