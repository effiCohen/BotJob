const express = require("express");
const mongoose = require("mongoose");
const { InterviewModel, validInterview } = require("../models/interviewModel");
const { getChatGPTResponse } = require("../middlewares/chatGPT");
const { QuestionModel } = require("../models/qustionModel");
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
    let idAr = [];
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    const responseGPT = await getChatGPTResponse(req.body);
    
    if (!responseGPT) {
         return res.status(400).json(responseGPT);
    }
    // console.log("req.body.questions",req.body.questions);
      console.log("data", responseGPT);
     for (let index = 0; index <responseGPT.length ; index+=2) {
        //  const pair = responseGPT[index];
         //    console.log(`Question ${index + 1}: ${pair.question}`);
         //    console.log(`Answer ${index + 1}: ${pair.answer}`);

         // Split the string and get the clean question 
         let question =responseGPT[index];
            question = question.split(': ')[1];

          console.log(question);
         // Split the string and get the clean answer 
       //  const answer = pair.answer.split('": "')[1].slice(0, -2);
         let answer = responseGPT[index+1];
         answer = answer.split(': ')[1];
         console.log(answer);

    //    const data1 = {
    //          question: question,
    //          aiAnswer: answer,
    //      }
    //    //  console.log("test");
    //             try {
    //      //    console.log(data1);
    //        //  console.log("try");
    //          const data = await QuestionModel(data1).save();
    //          // console.log(data);
    //          if (!data._id) {
    //              return res.status(500).json(err);
    //          }
    //          else {
    //              idAr[index] = data._id;
    //          }
    //          //console.log(data);
    //           res.json(data);
    //      } catch (err) {
    //          //console.log(err);
    //          return res.status(500).json(err);
    //      }
    //  }
    //  //console.log(idAr);
    //  const data3 = {
    //      job: req.body.job,
    //      experience: req.body.experience,
    //      questions: idAr,
    //  }
    //  try {
    //      const data2 = await InterviewModel(data3).save();
    //    //  console.log(data2);
    //      if (!data2._id) {
    //          return res.status(500).json(err);
    //      }
    //      res.json(data2);
    //  } catch (err) {
    //      console.log(err);
    //      return res.status(500).json(err);
      }
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