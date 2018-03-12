const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");
const path = require("path");
require("dotenv").config();

const bodyParser = require("body-parser");
const urlEncodedParser = bodyParser.urlencoded({ extended: false });
const app = express();

// Priority serve any static files.
app.use(express.static("../react/build"));

// Cross Origin Resource Sharing
app.use(cors());
app.options("*", cors());

//////////////////////////////
// MongoDB
//////////////////////////////

// Import models
const Tweet = require("./models/Tweet");
const User = require("./models/User");
// Connect to database
mongoose
  .connect("mongodb://localhost:27017/bearsTeam1" || process.env.MONGO_URI)
  .catch(err => {
    if (err) console.log("err", err);
  });
// Use native promises
mongoose.Promise = global.Promise;

//////////////////////////////
// Answer requests
//////////////////////////////
const dummyApi = require("./dummyAPI.js");
app.get("/api", (req, res) => {
  return res.send(dummyApi);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: "true" }));
// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, "../react/build")));

//////////////////////////////
// Answer requests
//////////////////////////////
const user = require("./user.js"); // ROUTER
const tweet = require("./tweet.js"); // ROUTER
const util = require("./util.js"); // ROUTER

app.use("/user", user);
app.use("/tweet", tweet);
app.use("/i", util);

// All remaining requests return the React app, so it can handle routing.
// app.get("*", (request, response) => {
//   response.sendFile(path.resolve(__dirname, "../react/build", "index.html"));
// });

// All remaining requests return the React app, so it can handle routing.
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

// Connect to port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Express listening on port ${PORT}`));

module.exports = { app };
