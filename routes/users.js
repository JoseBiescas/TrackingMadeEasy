/*
users.js (routes)

API Routes pertaining to any user functionality

  Routes:
      '/register': Register route
      '/login': Login route
*/

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/secrets");
const passport = require("passport");

//Load input validation
const ValidateRegisterInput = require("../validate/register");
const ValidateLoginInput = require("../validate/login");

//load user model
const User = require("../models/User");

//Register route
router.post("/register", (req, res) => {
  // pull in errors and isValid from our Register validator.
  const { errors, isValid } = ValidateRegisterInput(req.body);

  //Check validation
  if (!isValid) { //If isValid is false, we have errors, so return HTTP 400 and display errors.
    return res.status(400).json(errors);
  }

  //Check if user already exists.
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) { //If they do, send HTTP 400 and display error.
      return res.status(400).json({ email: "Email already exists" });
    } else { //Else, create new user using req.body properties.
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });

      //hash password using bcrypt
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

//Login route
router.post("/login", (req, res) => {
  //Pull errors and isValid from Login validator.
  const { errors, isValid } = ValidateLoginInput(req.body);

  //Check validation
  if (!isValid) { //If isValid is false, we have errors, so send HTTP 400 and display errors.
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //Check if user exists.
  User.findOne({ email }).then((user) => {
    if (!user) { //If user doesn't exist, send HTTP 404 and display error.
      return res.status(404).json({ emailnotFound: "Email not found" });
    }

    //Else compare the given password with the user's password in the DB.
    bcrypt.compare(password, user.password).then((match) => {
      if (match) {
        //Matching successfull
        //Create JWT payload
        const payload = {
          id: user.id,
          username: user.username,
          email: user.email
        };

        //Sign our jwt, and include our payload, secret key and an expiresIn param.
        jwt.sign(
          payload,
          keys.secreOrKey,
          {
            expiresIn: 31556926,
          },
          (err, token) => {
            //If successfull, append the token to a Bearer string.
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else { //If match fails, return password incorrect error.
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

module.exports = router;