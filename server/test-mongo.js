const MongoDB = require("mongodb");
const mongoose = require("mongoose");

const {User} = require("./models/User");

// how do i connect to local mongo server?
mongoose.connect("mongodb://localhost:27017/v4Bears01");

// how can I check that connection?
const db = mongoose.connection;
db.then((response) => console.log("Database is connected")).catch(err => console.log("err", err));

const jordan = new User({
    userInfo: {
        username: "misomighty",
        firstName: "Jordan",
        lastName: "Leslie"
    }
});

jordan.save((err, res) => {
    if(err) {
        return console.log("err", err);
    }
    console.log("res", res);
});

User.find().then((res) => {
    console.log(res);
})