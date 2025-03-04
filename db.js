const mongoose = require("mongoose");

const connectDb = () => {
  return mongoose.connect("mongodb://localhost:27017/cricketScores", {
    // Remove useNewUrlParser and useUnifiedTopology options
  });
};

module.exports = connectDb;
