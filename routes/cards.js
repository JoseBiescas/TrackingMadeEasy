const { json } = require("body-parser");
/*
cards.js (routes)

API routes pertaining to any card functionality

Routes:
    /create: Create a Card
    /delete: Delete a Card
    /update: Update existing Card
*/

const express = require("express");
const passport = require("passport");
const router = express.Router();

//Load Card model
const Card = require("../models/Cards");

//Load validator
const valdiateCardInput = require("../validate/card");

//Create route
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //pull errors from Card Validator
    const { errors, isValid } = valdiateCardInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    } else {
      const newCard = new Card({
        user: req.body.user,
        title: req.body.title,
        description: req.body.description,
        label: req.body.label,
      });

      newCard
        .save()
        .then((card) => res.json(card))
        .catch((err) =>
          res.status(400).json("Error in Card create action: " + err)
        );
    }
  }
);

//Get route
router.get("/view-cards/:user", (req, res) => {
  const user_id = req.params.user;
  Card.find({ user: user_id })
    .then((cards) => res.json(cards))
    .catch((err) => res.status(400).json("Error: " + err));
});

//Delete route
router.delete(
  "/delete-card/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Card.findById(req.params.id)
      .then((card) => {
        card.remove().then(() => res.json("Card deleted"));
      })
      .catch((err) => res.status(400).json("Error: " + err));
  }
);

//Update route
router.patch(
  "/update-card/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const updateFields = {};
    if (req.body.title != null) {
      updateFields.title = req.body.title;
    }
    if (req.body.description != null) {
      updateFields.description = req.body.description;
    }
    if (req.body.label != null) {
      updateFields.label = req.body.label;
    }
    Card.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: updateFields },
      { new: true }
    )
      .then((card) => {
        res.json(card);
      })
      .catch((err) => res.status(400).json("Error: " + err));
  }
);

//Update Card Label route
router.patch(
  "/update-card-label/:user_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Card.updateMany(
      { user: req.params.user_id },
      { $set: { label: "Unlisted" } }
    )
      .then((response) => {
        res.json("Success");
      })
      .catch((err) => res.status(400).json("Error: " + err))
  }
);

module.exports = router;
