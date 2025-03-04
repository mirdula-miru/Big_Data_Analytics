const mongoose = require("mongoose");

module.exports = mongoose.model("CricketScore", {
  team: String,
  opponent: String,
  runs: Number,
  wickets: Number,
  overs: Number,
  matchDate: Date,
});
