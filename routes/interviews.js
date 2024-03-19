const express = require("express");
const mongoose = require("mongoose");
const { InterviewModel, validInterview } = require("../models/interviewModel");
const { getChatGPTResponse } = require("../middlewares/chatGPT");
const { QuestionModel } = require("../models/qustionModel");
const { authAdmin } = require("../middlewares/auth");
var router = express.Router();
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/userModel");

router.get("/allInterviews", authAdmin, async (req, res) => {
    let data = await InterviewModel.find({});
    res.json(data);
});


router.get("/myInterview", async (req, res) => {
    try {
        let token = req.header("x-api-key");
        let decodeToken = jwt.verify(token, process.env.JWT_SECRET);
        let token_id = decodeToken._id;
        console.log(token_id);
        let user = await UserModel.findOne({ _id: token_id });
        userName = user._doc.FirstName + " " + user._doc.LastName
        console.log(userName);
        let data = await InterviewModel.find({ user_id: token_id });

        res.json({ data: data, name: userName });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

router.get("/1interview/:interviewId", async (req, res) => {
    try {
        let InterviewId = req.params.interviewId;
        let data = await InterviewModel.findOne({ _id: InterviewId });
        res.json(data);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

router.get("/by_id_user/:id_user", async (req, res) => {
    try {
        let id_user = req.params.id_user;
        let data = await InterviewModel.find({ user_id: id_user });
        res.json(data);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

router.post("/", async (req, res) => {
    let token = req.header("x-api-key");
    let decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    let token_id = decodeToken._id;
    let validBody = validInterview(req.body);
    let idAr = [];
    let user_fullName = "";
    let indexAr = 0;
    try {
        let user = await UserModel.findOne({ _id: token_id });
        console.log(user);
        user_fullName = user.FirstName + " " + user.LastName;
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    const responseGPT = await getChatGPTResponse(req.body);

    if (!responseGPT) {
        return res.status(400).json(responseGPT);
    }

    for (let index = 0; index < responseGPT.length; index += 2) {


        // Split the string and get the clean question 
        let question = responseGPT[index];
        question = question.split(': ')[1];

        console.log(question);

        let answer = responseGPT[index + 1];
        answer = answer.split(': ')[1];
        console.log(answer);

        if (!question) {
            return res.status(500).json(err);
        }
        const questionData = {
            question: question,
            aiAnswer: answer,
            userAnswer: null,
        }

        try {

            const data = await QuestionModel(questionData).save();
            // console.log(data);
            if (!data._id) {
                return res.status(500).json(err);
            }
            else {
                idAr[indexAr] = data._id;
                indexAr += 1;

            }

        } catch (err) {

            return res.status(500).json(err);
        }
    }

    const interviewData = {
        user_id: token_id,
        user_fullName: user_fullName,
        job: req.body.job,
        experience: req.body.experience,
        questions: idAr,

    }
    try {
        const interData = await InterviewModel(interviewData).save();

        if (!interData._id) {
            return res.status(500).json(err);
        }
        res.json(interData);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

// Update for TIME
router.put("/:interviewId", async (req, res) => {
    let interviewId = req.params.interviewId;
    try {
        let updateData = await InterviewModel.updateOne({ _id: interviewId }, req.body)
        console.log(updateData);
        res.status(200).json(updateData);
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }

})



// router.delete("/:id", async (req, res) => {
//     try {
//         let interviewId = req.params.id;
//         let data = await InterviewModel.findByIdAndDelete(interviewId);
//         if (data) {
//             res.status(200).json({ message: "interview deleted successfully" });
//         } else {
//             res.status(404).json({ message: "interviewId not found" });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// });

module.exports = router;