const Tweet = require("./../models/Tweet");
const User = require("./../models/User");

let testUser = {
  userInfo: {
    username: "misomighty",
    firstName: "Miso",
    lastName: "Mighty"
  }
};

let testUsers = [
  {
    _id: "5aa054ac1a6e5a01b90f591c",
    userInfo: {
      username: "misoawesome",
      firstName: "Miso",
      lastName: "Awesomely"
    },
    stats: {
      tweets: [0, 1, 2]
    }
  },
  {
    _id: "5aa054ac1a6e5a01b90f591d",
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
  // Returns a promise when both functions resolve
  return Promise.all([
    Tweet.remove({}).catch(err => err),
    User.remove({}).catch(err => err)
  ]);
};

let seedDB = () => {
  // Returns a promise when both functions resolve
  return Promise.all([
    Tweet.insertMany(testTweets).catch(err => err),
    User.insertMany(testUsers).catch(err => err)
  ]);
};

module.exports = {
  testUser,
  testUsers,
  testTweets,
  dumpDB,
  seedDB
};
