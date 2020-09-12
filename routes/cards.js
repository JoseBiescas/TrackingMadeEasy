/*
cards.js (routes)

API routes pertaining to any card functionality

Routes:
    /create: Create a Card
    /delete: Delete a Card
    /update: Update existing Card
*/

const express = require("express");
const router = express.Router();

//Load Card model
const Card = require("../models/Cards");

//Load validator
const valdiateCardInput = require("../validate/card");

//Create route
router.post("/create", (req, res) => {
  //pull errors from Card Validator
  const { errors, isValid } = valdiateCardInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  } else {
    const USER = {
      user: req.body.user
    };

    const newCard = new Card({
      user: USER,
      title: req.body.title,
      description: req.body.description,
      labels: req.body.labels,
    });

    newCard
      .save()
      .then(() => res.json("New Card Created"))
      .catch((err) => res.status(400).json("Error in Card create action: " + err));
  }
});

module.exports = router