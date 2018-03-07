const mongoose = require("mongoose");

// Define Tweet Schema
const Tweet = mongoose.model("Tweet", {
  user: String,
  text: String,
  comments: [
    {
      user: String,
      text: String,
      time: Number
    }
  ],
  likes: Number,
  retweets: Number,
  time: Number
});

module.exports = Tweet;
