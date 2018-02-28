const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Define User Schema
const UserSchema = new Schema({
    userInfo: {
        username: String,
        firstName: String,
        lastName: String, 
        gitId: Number
    },
    stats: {
        tweets: [Number],
        likes: [],
        followers: [],
        following: []
    },
    avatarUrl: ""
});