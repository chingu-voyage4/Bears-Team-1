const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

// Define Tweet Schema
const Tweet = mongoose.model("Tweet", {
  creator: ObjectId,
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
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Tweet;
