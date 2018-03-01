const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Define User Schema
const UserSchema = new Schema({
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

module.exports = mongoose.model("User", UserSchema);
