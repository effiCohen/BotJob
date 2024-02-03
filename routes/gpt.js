const express = require("express");
const { openaiMiddleware  } = require("../middlewares/chatGPT");
const router = express.Router();


// /* GET home page. */
// router.post("/", (req, res, next) => {
//     console.log(req.prompt);
//     let prompt = req.prompt;
//    aa = openaiMiddleware(prompt) 
//   res.json(aa);
// });

// router.get("/", (req, res, next) => {
//     res.json({ msg: "Work from index.js email" });
//   });


router.post('/', openaiMiddleware, (req, res) => {
  // Access the OpenAI response from req.openaiResponse
    console.log(interviewQuestions);
  // Your other route handling logic here
  res.json({ interviewQuestions });

    
  });
module.exports = router;