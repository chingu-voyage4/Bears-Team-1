require("dotenv").config();
const mongoose = require("mongoose");
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/v4Bears01";
const path = require("path");

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

const { app } = require("./app");
const PORT = process.env.PORT || 3001;

let search = app.listen(PORT, () =>
  console.log(`Express listening on port ${PORT}`)
);
