const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

// Define Tweet Schema
const Tweet = mongoose.model("Tweet", {
  creator: {
    type: ObjectId,
    ref: "User"
  },
  text: String,
  comments: [
    {
      user: ObjectId,
      text: String,
      replies: [
        {
          user: ObjectId,
          text: String,
          time: {
            type: Number,
            default: Date.now()
          }
        }
      ],
      time: {
        type: Number,
        default: Date.now()
      }
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
