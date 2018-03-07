const mongoose = require("mongoose");

// Define User Schema
const User = mongoose.model("User", {
  userInfo: {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    gitId: {
      type: Number
    }
  },
  stats: {
    tweets: [Number],
    likes: [Number],
    followers: [Number],
    following: [Number]
  },
  avatarUrl: ""
});

module.exports = User;
