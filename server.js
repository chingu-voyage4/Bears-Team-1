const express = require("express");
const path = require("path");
const app = express();

app.set("port", process.env.PORT || 3001);

app.use(express.static(path.join(__dirname, "build")));

app.get("/ping", function(req, res) {
  return res.send("pong");
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(process.env.PORT || 3001, (err) => {
  if(err) {
    console.log("error", err);
  } else {
    console.log(`Server.js is running on port ${app.get("port")}`)
  }
});
