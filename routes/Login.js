const express = require("express");
const { UserModel } = require("../models/userModel");
const jwt = require('jsonwebtoken');
const router = express.Router();

/* Login route */
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    //  if the user exists in the database
    const user = await UserModel.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    //  token
    const token = jwt.sign({ userId: user._id }, 'key', { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


  

router.get("/token", async (req, res) => {
    try {
        //!CHECK IF TOKEN IS EXSIST IN HEADER ('Authorization')
        const token = req.header('Authorization');
        //?IF TOKEN IS NOT EXIST IN HEADER
        if (!token) {
            return res.status(401).json({
                error: Unauthorized
            });
        }
        // jwt.verify(token, secretKey)

        //?TOKEN VERIFYED AND RETURN THE PAYLOAD DATA
        const decodeToken = jwt.verify(token)
            //?IF TOKEN VERIFYED AND RETURN THE PAYLOAD DATA WITH USER ID
            //TODO: GO TO ROUTER AND NEXT
        if (decodeToken._id) {
            // (req) from middleware to route
            //?SAVE IN MEMORY BETWEEN MIDDLEWARE AND ROUTE THE PAYLOAD IN REQUEST.TOKEN_DATA
            req.tokenData = decodeToken;
            //?NEXT TO ROUTE AFTER TOKEN VERIFYED AND IS VALID
            next();
        }

    } catch (error) {
        //!ERROR HANDLING CAN BE: EXPIERD TOKEN OR INVALID TOKEN
        //TODO:RETURN RESPONSE 403 FOR INVALID TOKEN OR EXPIRED TOKEN
        return res.status(403).json({ err_msg: 'invalid decoding', error })
    }

  });

  module.exports = router;