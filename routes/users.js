var express = require("express");
const { UserModel, validUser ,validateLogin, genToken} = require("../models/userModel");
const bcrypt = require("bcrypt")
const mongoose = require('mongoose');
var router = express.Router();
const sendMail = require("../middlewares/sendMail");
const { auth } = require("../middlewares/auth");

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


/* GET single user by token */
router.get("/myInfo", auth, async (req, res) => {
  try {
    let data = await UserModel.findOne({ _id: req.tokenData._id }, { password: 0 })
    res.json(data);
  }
  catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
})

// check if the user have a good token 
router.get("/checkToken",auth, async (req, res) => {
  res.json(true)
})

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
    user.password = bcrypt.hash(user.password, 10);
    await user.save();
    user.password = "****";
    return res.status(201).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// login
router.post("/login", async (req, res) => {
  let validBody = validateLogin(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    let user = await UserModel.findOne({ email: req.body.email })
    if (!user) {
      return res.status(401).json({ err: "Email not found!" });
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


// Update for user
router.put("/edit",auth, async (req, res) => {
  // let id = req.params.idEdit
  let validBody = validUser(req.body);
  if (validBody.error) {
      return res.status(400).json(validBody.error.details);
  }
  try {
      let token_id=req.userToken.id;
      // console.log(token_id);
      let updateData = await UserModel.updateOne({ _id: token_id}, req.body)
      res.status(200).json(updateData);
  } catch (err) {
      console.log(err);
      res.status(400).send(err);
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
