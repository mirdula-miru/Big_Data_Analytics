const express = require("express");
const router = express.Router();

const CricketScore = require("../models/cricket.model");

// Route to get all cricket scores
router.get("/", (req, res) => {
  CricketScore.find()
    .lean()
    .then((data) => {
      res.render("cricket/index", { scores: data });
    })
    .catch((err) => console.log("Error fetching cricket scores:", err));
});

// Route to add or edit a cricket score
router.get("/addOrEdit", (req, res) => {
  res.render("cricket/addOrEdit");
});

router.get("/addOrEdit/:id", (req, res) => {
  CricketScore.findById(req.params.id)
    .lean()
    .then((data) => res.render("cricket/addOrEdit", { score: data }))
    .catch((err) => console.log("Error retrieving score record:", err));
});

// POST to add or update a cricket score
router.post("/addOrEdit", (req, res) => {
  const score = {
    team: req.body.team,
    opponent: req.body.opponent,
    runs: req.body.runs,
    wickets: req.body.wickets,
    overs: req.body.overs,
    matchDate: req.body.matchDate,
  };
  const { _id } = req.body;

  if (_id == "") {
    new CricketScore({ ...score })
      .save()
      .then(() => res.redirect("/cricket"))
      .catch((err) => console.log("Error during score insertion:", err));
  } else {
    CricketScore.findByIdAndUpdate(_id, score)
      .then(() => res.redirect("/cricket"))
      .catch((err) => console.log("Error during score update:", err));
  }
});

// POST to delete a cricket score
router.post("/delete/:id", (req, res) => {
  CricketScore.findByIdAndDelete(req.params.id)
    .then(() => res.redirect("/cricket"))
    .catch((err) => console.log("Error during score deletion:", err));
});

module.exports = router;
