const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const path = require("path");
const bodyParser = require("body-parser");
const urlEncodedParser = bodyParser.urlencoded({ extended: false });
const app = express();

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, "../build")));

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
require("./services/passport");

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY]
  })
);

app.use(passport.initialize());
app.use(passport.session());
require("./authRoutes/authRoutes")(app);
//const authRoutes = require("./authRoutes/authRoutes");
//app.use("/", authRoutes);

//////////////////////////////
// Answer requests
//////////////////////////////
const dummyApi = require("./dummyAPI.js");
app.get("/api", (req, res) => {
  return res.send(dummyApi);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: "true" }));

//////////////////////////////
// Answer requests
//////////////////////////////
const user = require("./user.js"); // ROUTER
const tweet = require("./tweet.js"); // ROUTER

app.use("/user", user);
app.use("/tweet", tweet);

// All remaining requests return the React app, so it can handle routing.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

// Connect to port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Express is listening on port ${PORT}`));

//module.exports = { app };
