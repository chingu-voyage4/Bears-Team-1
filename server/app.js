const express = require("express");
const bodyParser = require("body-parser");
const urlEncodedParser = bodyParser.urlencoded({ extended: false });
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const mongoose = require("./server");
const Tweet = require("./models/Tweet");
const User = require("./models/User");
const dummyApi = require("./dummyAPI.js");
const app = express();

// Priority serve any static files.
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, "../react/build")));

// Cross Origin Resource Sharing
app.use(cors());
app.options("*", cors());

//////////////////////////////
// Answer requests
//////////////////////////////
app.get("/api", (req, res) => {
  return res.send(dummyApi);
});

app.get("/api/users", (req, res) => {
  User.find().then(
    users => {
      res.send(users);
    },
    err => res.status(400).send(err)
  );
});

app.get("/api/tweets/:user_id", (req, res) => {
  // Get id param, save to var
  let user_id = req.params.user_id;
  // Find all tweets by that user
  User.findOne({ _id: user_id })
    .populate("stats.tweets")
    .then(user => {
      res.send(user.stats.tweets);
    });

  // res.send("hi");
});

app.get("/api/tweets", (req, res) => {
  Tweet.find().then(tweets => {
    res.send(tweets);
  });
});

app.post("/api/tweet", (req, res) => {
  let newTweet_id;
  let newTweet = new Tweet({
    _creator: req.body._creator,
    text: req.body.text
  });
  res.send(newTweet);
});

app.post("/signup", (req, res) => {
  let user = new User({
    userInfo: {
      username: req.body.userInfo.username,
      firstName: req.body.userInfo.firstName,
      lastName: req.body.userInfo.lastName
    }
  });
  user.save().then(doc => res.send(doc), err => res.status(400).send(err));
});

const PORT = process.env.PORT || 3001;

let search = app.listen(PORT, () =>
  console.log(`Express listening on port ${PORT}`)
);

// All remaining requests return the React app, so it can handle routing.
// app.get("*", (request, response) => {
//   response.sendFile(path.resolve(__dirname, "../react/build", "index.html"));
// });

module.exports = { app };
