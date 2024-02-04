const express = require("express");
const { openaiMiddleware  } = require("../middlewares/chatGPT");
const router = express.Router();


router.get("/", (req, res, next) => {
  res.json({ msg: "Work from gpt" });
});

router.post('/',openaiMiddleware , async (req, res) => {

    console.log(req.openaiResponse);

  res.json({ interviewQuestions : req.openaiResponse  });

    
  });
module.exports = router;