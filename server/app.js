const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const mongoose = require("mongoose");

const User = require("./models/User");
const dummyApi = require("./dummyAPI.js");
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/v4Bears01";
const app = express();

app.use(bodyParser.json());

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, "../react/build")));

// Cross Origin Resource Sharing
app.use(cors());
app.options("*", cors());

//////////////////////////////
// MongoDB
//////////////////////////////

// Import Tweet Model
const Tweet = require("./models/Tweet");
// Connect to database
mongoose
  .connect(MONGO_URI)
  .then(res => {
    console.log(`Connected to ${MONGO_URI}`);
  })
  .catch(err => {
    if (err) console.log("err", err);
  });
// Use native promises
mongoose.Promise = global.Promise;

//////////////////////////////
// Answer requests
//////////////////////////////
app.get("/api", (req, res) => {
  return res.send(dummyApi);
});

app.get("/api/users", (req, res) => {
  User.find({}).then(users => {
    res.send(users);
  });
});
app.post("/signup", (req, res) => {
  let user = new User({
    userInfo: {
      username: req.body.userInfo.username,
      firstName: req.body.userInfo.firstName,
      lastName: req.body.userInfo.lastName
    }
  });
  user.save().then(
    doc => {
      console.log("saved doc", doc);
    },
    err => console.log(err)
  );
  res.send(user);
  // newUser.save().then(doc => res.send(doc), err => res.status(400).send(err));
});

// All remaining requests return the React app, so it can handle routing.
// app.get("*", (request, response) => {
//   response.sendFile(path.resolve(__dirname, "../react/build", "index.html"));
// });

module.exports = app;
