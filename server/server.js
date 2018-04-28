const express = require("express");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const urlEncodedParser = bodyParser.urlencoded({ extended: false });
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const passport = require("passport");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY]
  })
);

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, "../build")));

// Cross Origin Resource Sharing
app.use(cors());

//////////////////////////////
// MongoDB
//////////////////////////////

// Import models
const Tweet = require("./models/Tweet");
const User = require("./models/User");
// Connect to database
mongoose.connect(process.env.MONGO_URI).catch(err => {
  if (err) console.log("err", err);
});
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});
// Use native promises
mongoose.Promise = global.Promise;

//////////////////////////////
// Passport
//////////////////////////////
app.use(passport.initialize());
app.use(passport.session());

require("./services/passport");
const auth = require("./authRoutes/authRoutes"); // router
app.use("/auth", auth);

//////////////////////////////
// Answer requests
//////////////////////////////
app.use(bodyParser.json());
const dummyApi = require("./dummyAPI.js");
app.get("/api", (req, res) => {
  return res.send(dummyApi);
});

//////////////////////////////
// Answer requests
//////////////////////////////
const user = require("./user.js"); // ROUTER
const tweet = require("./tweet.js"); // ROUTER

app.use("/user", user);
app.use("/tweet", tweet);

// All remaining requests return the React app, so it can handle routing.
app.get("*", (request, response) => {
  response.sendFile(path.resolve(__dirname, "../build", "index.html"));
});

// Connect to port
app.listen(PORT, () =>
  console.log(`Express server is listening on port ${PORT}`)
);
