require("dotenv").config();
const mongoose = require("mongoose");
const dummyApi = require("./dummyAPI.js");

const app = express();

const PORT = process.env.PORT || 3001;

// Priority serve any static files.
app.use(express.static("build"));

// Cross Origin Resource Sharing
app.use(cors());
app.options("*", cors());

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

//////////////////////////////
// Answer requests
//////////////////////////////

app.get("/api", (req, res) => {
  return res.send(dummyApi);
});

// All remaining requests return the React app, so it can handle routing.
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => console.log(`Express listening on port ${PORT}`));
