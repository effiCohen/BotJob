const express = require("express");
const router = express.Router();
const { authAdmin } = require("../middlewares/auth");
const {JobModel , validJob} = require("../models/JobModel")

router.get('/:id', async (req, res) => {
  try {
      let jobid = req.params.id;
      let data = await JobModel.findOne({ _id: jobid });
      res.json(data.job);
  } catch (err) {
      console.log(err);
      return res.status(500).json(err);
  }
});

/* GET jobs listing. */
router.get("/", async (req, res) => {
    let data = await JobModel.find({});
    res.json(data);
  });

  /*Add job to the list*/
router.post("/",authAdmin, async (req, res) => {
    let validBody = validJob(req.body);
    if (validBody.error) {
      return res.status(400).json(validBody.error.details);
    }
    try {
      let job = new JobModel (req.body);
      res.json({msg:`job added ${job}`})
      await job.save();
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });
  
  /*delete job from the list*/
  router.delete('/:id',authAdmin, async (req, res) => {
    let jobid = req.params.id;
    try {
      let job = await JobModel.findByIdAndDelete(jobid);
      if (job) {
        res.status(200).json({ message: 'job deleted successfully' });
      } else {
        res.status(404).json({ message: 'job not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error });
    }
  });



module.exports = router;
