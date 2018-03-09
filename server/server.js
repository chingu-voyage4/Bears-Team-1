require("dotenv").config();
const mongoose = require("mongoose");
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/v4Bears01";
const path = require("path");

//////////////////////////////
// MongoDB
//////////////////////////////
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

module.exports = mongoose;
