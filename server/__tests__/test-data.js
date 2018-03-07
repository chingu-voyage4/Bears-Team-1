const Tweet = require("./../models/Tweet");
const User = require("./../models/User");

let testUser = {
  userInfo: {
    username: "misoawesome",
    firstName: "Miso",
    lastName: "Awesomely"
  }
};

let testUsers = [
  {
    userInfo: {
      username: "misoawesome",
      firstName: "Miso",
      lastName: "Awesomely"
    }
  },
  {
    userInfo: {
      username: "looplenny",
      firstName: "Lenny",
      lastName: "Looper"
    }
  }
];

let testTweets = [
  {
    user: "misomighty",
    text: "A tweet by misomighty"
  },
  {
    user: "loopylenny",
    text: "A tweet by loopylenny"
  }
];

let dumpDB = () => {
  Tweet.remove({});
  User.remove({});
};

let seedDB = () => {
  Tweet.insertMany(testTweets);
  User.insertMany(testUsers);
};

module.exports = {
  testUser,
  testUsers,
  testTweets,
  dumpDB,
  seedDB
};
