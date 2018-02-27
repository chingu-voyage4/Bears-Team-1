const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const mongoose = require("mongoose");
const MONGO_URL = require("./config");

const app = express();

app.set("port", process.env.PORT || 3001);

// Priority serve any static files.
if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
} else {
  app.use(express.static(path.join(__dirname, "public")));
}

// Cross Origin Resource Sharing
app.use(cors());
app.options("*", cors());

//////////////////////////////
// MongoDB
//////////////////////////////

// Import Tweet Model
const Tweet = require("./models/Tweet");
// Connect to database
mongoose.connect(process.env.MONGO_URI || MONGO_URL, (err, db) => {
  if (err) {
    return console.log(err);
  }
  console.log("db", db);
});
// Use native promises
mongoose.Promise = global.Promise;

//////////////////////////////
// Answer requests
//////////////////////////////

app.get("/api", function(req, res) {
  return res.send("api server");
});

// All remaining requests return the React app, so it can handle routing.
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(process.env.PORT || 3001, err => {
  if (err) {
    console.log("error", err);
  } else {
    console.log(`Server.js is running on port ${app.get("port")}`);
  }
});
