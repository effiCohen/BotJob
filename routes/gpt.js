const express = require("express");
const { getChatGPTResponse } = require("../middlewares/chatGPT");
const router = express.Router();


router.get("/", (req, res, next) => {
  res.json({ msg: "Work from gpt" });
});

router.post('/', async (req, res) => {
  const responseGPT = await getChatGPTResponse(req.body);
  // console.log("route");
  // console.log(responseGPT);
  res.json({ interviewQuestions: responseGPT});

});
module.exports = router;