const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();

const PORT = process.env.PORT || 3001;

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
mongoose.connect(
  process.env.MONGO_URI || "mongodb://localhost:27017/bearsTeam1"
);
// Use native promises
mongoose.Promise = global.Promise;

//////////////////////////////
// Answer requests
//////////////////////////////

app.get("/api", function(req, res) {
  return res.send("api server");
});

// All remaining requests return the React app, so it can handle routing.
app.get("*", function(request, response) {
  response.sendFile(path.resolve(__dirname, "../react/build", "index.html"));
});

app.listen(PORT, () => console.log(`Express listening on port ${PORT}`));
