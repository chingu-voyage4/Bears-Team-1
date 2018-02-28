const MongoDB = require("mongodb");
const mongoose = require("mongoose");

const { User } = require("./models/User");

// How do i connect to local mongo server?
mongoose.connect("mongodb://localhost:27017/v4Bears01");

// How can I check that connection?
const db = mongoose.connection;
db
  .then(response => console.log("Database is connected"))
  .catch(err => console.log("err", err));

// How do I I create new User document?
const jordan = new User({
  userInfo: {
    username: "misomighty",
    firstName: "Jordan",
    lastName: "Leslie"
  }
});
// How do I add a new user to the DB?
// jordan.save((err, res) => {
//     if(err) {
//         return console.log("err", err);
//     }
//     console.log("res", res);
// });

// How do I find all of the users?
User.find().then(res => {
  console.log(res);
});
