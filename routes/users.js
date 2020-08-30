const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/secrets");

//Load input validation
const ValidateRegisterInput = require("../validate/register");
const ValidateLoginInput = require("../validate/login");

//load user model
const User = require("../models/User");

//Register route
router.post("/register", (req, res) => {
  const { errs, isValid } = ValidateRegisterInput(req.body);

  //Check validation
  if (!isValid) {
    return res.status(400).json(errs);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });

      //hash password
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
  const { err, isValid } = ValidateLoginInput(req.body);

  //Check validation
  if (!isValid) {
    return res.status(400).json(err);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(404).json({ emailnotFound: "Email not found" });
    }

    bcrypt.compare(password, user.password).then((match) => {
      if (match) {
        //Matching successfull
        //Create JWT payload
        const payload = {
          id: user.id,
          username: user.username,
        };

        jwt.sign(
          payload,
          keys.secreOrKey,
          {
            expiresIn: 31556926,
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

module.exports = router;