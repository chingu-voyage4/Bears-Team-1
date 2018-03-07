require("dotenv").config();
const path = require("path");

const { app } = require("./app");
const PORT = process.env.PORT || 3001;

let search = app.listen(PORT, () =>
  console.log(`Express listening on port ${PORT}`)
);
