var express = require("express");
const { UserModel, validUser } = require("../models/userModel");
var router = express.Router();

/* GET users listing. */
// http://localhost:3000/users
router.get("/", async (req, res) => {
  let data = await UserModel.find({});
  res.json(data);
});


/* GET single user by id */
// http://localhost:3000/users/single/:userId
router.get("/single/:userId", async (req, res) => {
  try {
    let userId = req.params.userId;
    let data = await UserModel.findOne({ _id: userId });
    res.json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

/* POST users listing. */
router.post("/", async (req, res) => {
  let validBody = validUser(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    let data = await UserModel(req.body).save();
    res.json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    // Use Mongoose to find and remove the item by its ID
    const result = await UserModel.findByIdAndRemove(userId);

    if (result) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


module.exports = router;
