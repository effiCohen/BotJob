var express = require("express");
const mongoose = require("mongoose");
const { InterviewModel, validInterview } = require("../models/interviewModel");
const { getChatGPTResponse } = require("../middlewares/chatGPT");
var router = express.Router();

router.get("/allInterviews", async (req, res) => {
    let data = await InterviewModel.find({});
    res.json(data);
});


router.get("/:interviewId", async (req, res) => {
    try {
        let InterviewId = req.params.InterviewId;
        let data = await InterviewModel.findOne({ _id: InterviewId });
        res.json(data);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});


router.post("/", async (req, res) => {
    let validBody = validInterview(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    const responseGPT = await getChatGPTResponse(req.body);
    if (!responseGPT) {
        return res.status(400).json(responseGPT);
    }
    console.log("req.body.questions",req.body.questions);
    console.log("data",responseGPT.data);
    for(let i = 1; i <= req.body.questions; i++){
        console.log(i); 
        console.log(responseGPT.data); 
    //    try {
    //     let data = await InterviewModel(req.body).save();
    //     res.json(data);
    // } catch (err) {
    //     console.log(err);
    //     return res.status(500).json(err);
    // } 
    }
    return res.json(responseGPT.data);
});

// Update to add questions
// router.put("/interviewId", async (req, res) => {
//     let validBody = validInterview(req.body);
//     if (validBody.error) {
//         return res.status(400).json(validBody.error.details);
//     }
//     try {
//         let interviewId = req.params.interviewId;
//         let updateData = await InterviewModel.updateOne({ _id: interviewId }, req.body)
//         res.status(200).json(updateData);
//     } catch (err) {
//         console.log(err);
//         res.status(400).send(err);
//     }

// })


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