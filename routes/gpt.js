const express = require("express");
const { openaiMiddleware  } = require("../middlewares/chatGPT");
const router = express.Router();

router.post('/', openaiMiddleware, (req, res) => {
  // Access the OpenAI response from req.openaiResponse
    console.log(interviewQuestions);

  res.json({ interviewQuestions });

    
  });
module.exports = router;