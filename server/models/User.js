const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

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
  likes: [ObjectId],
  followers: [Number],
  following: [Number],
  avatarUrl: "",
  isActive: {
    type: Boolean,
    default: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = User;
