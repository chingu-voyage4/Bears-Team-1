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

let dumpThenAddTweets = done => {
  return Tweet.remove({}).then(() => {
    console.log("removing tweets");
    return Tweet.insertMany(testTweets);
  });
};

let dumpThenAddUsers = done => {
  return User.remove({}).then(() => {
    console.log("removing users");
    User.insertMany(testUsers).then(users => done());
  });
};
module.exports = {
  testUser,
  testUsers,
  testTweets,
  dumpThenAddTweets,
  dumpThenAddUsers
};
