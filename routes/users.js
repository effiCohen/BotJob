var express = require("express");
const { UserModel, validUser ,validateLogin, genToken} = require("../models/userModel");
const bcrypt = require("bcrypt")
const mongoose = require('mongoose');
var router = express.Router();
const sendMail = require("../utilities/semdmail");

/* GET users listing. */
router.get("/", async (req, res) => {
  let data = await UserModel.find({});
  res.json(data);
});


/* GET single user by id */
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
    let user = new UserModel(req.body);
    user.verifictionCode = (Math.floor(Math.random() * (99999 - 10000)) + 10000).toString();
    let emailExists = await UserModel.findOne({ email: user.email });
    if (emailExists) {
      return res.json({ err: "The email already exists" });
    }
    await sendMail(user.email, "code", user.verifictionCode);
    user.password = await bcrypt.hash(user.password, 10);
    await user.save();
    user.password = "****";
    return res.status(201).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// verification code
router.patch("/verification", async (req, res) => {
  try {
    let thisEmail = req.body.email;
    let thisVerifictionCode = req.body.verifictionCode;
    let user = await UserModel.findOne({ email: thisEmail });
    if (user.verifictionCode != thisVerifictionCode) {
      return res.json("Incorrect code");
    }
    user.verifiction = true;
    let data = await UserModel.updateOne({ _id: user._id }, user);
    res.status(200).json(data);
  }
  catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
})

router.post("/login", async (req, res) => {
  let validBody = validateLogin(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    let user = await UserModel.findOne({ email: req.body.email })
    if (!user) {
      return res.status(401).json({ err: "User not found!" });
    }
    let validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) {
      return res.status(401).json({ err: "User or password is wrong" });
    }
    res.json({ token: genToken(user._id, user.role) });
  }
  catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
})

router.delete('/:id', async (req, res) => {
  let userId = req.params.id;
  try {
    let user = await UserModel.findByIdAndDelete(userId);
    if (user) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
});


module.exports = router;
