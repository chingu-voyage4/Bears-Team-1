const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

// Define Tweet Schema
const Tweet = mongoose.model("Tweet", {
  user: ObjectId,
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
