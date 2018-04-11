const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

// Define User Schema
const User = mongoose.model("User", {
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
  googleID: {
    type: String
  },
  gitId: {
    type: Number
  },
  // Choosing to use an ObjectId over a childSchema, as we don't want to generate a new ObjectId
  likes: [
    {
      type: ObjectId,
      // Ref property tells mongo which model to use during population
      ref: "Tweet"
    }
  ],
  followers: [
    {
      type: ObjectId,
      // Ref property tells mongo which model to use during population
      ref: "User"
    }
  ],
  following: [
    {
      type: ObjectId,
      // Ref property tells mongo which model to use during population
      ref: "User"
    }
  ],
  location: {
    type: String,
    default: "Earth"
  },
  about: {
    type: String
  },
  avatarUrl: String,
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
