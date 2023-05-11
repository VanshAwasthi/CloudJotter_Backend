const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'vanshIsaGood@002'

//router.(dot) karke isleye likh rhe hai kyo ki ye ek particular route ke leye hai
// Create a User using POST "/api/auth/createuser" . No login required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Make a stronger password aleast 5 character").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    //If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //Check whether the user with same email exists already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email alreay exists" });
      }
      const salt = await bcrypt.genSaltSync(10); 
      const secPass = await bcrypt.hash(req.body.password,salt);

      //Create a new user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      const data = {
        user:{
          id: user.id
        }
      }
      const authtoken = jwt.sign(data,JWT_SECRET );
      

      // res.json(user);
      res.json({authtoken});

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }

    // .then(user => res.json(user))
    // .catch(err => {console.log(err)
    // res.json({error : 'Please enter a unique value for email', message: err.message})})
  }
);

module.exports = router;
