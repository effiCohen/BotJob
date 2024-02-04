const express = require("express");
const { openaiMiddleware  } = require("../middlewares/chatGPT");
const router = express.Router();


router.get("/", (req, res, next) => {
  res.json({ msg: "Work from gpt" });
});

router.post('/', openaiMiddleware, (req, res) => {
  // Access the OpenAI response from req.openaiResponse
    console.log(interviewQuestions);

  res.json({ interviewQuestions });

    
  });
module.exports = router;