const Tweet = require("./../models/Tweet");
const User = require("./../models/User");

let testUser = new User({
  userInfo: {
    username: "misomighty",
    firstName: "Miso",
    lastName: "Mighty"
  }
});

let testUsers = [
  {
    _id: "5aa054ac1a6e5a01b90f591c",
    userInfo: {
      username: "misoawesome",
      firstName: "Miso",
      lastName: "Awesomely"
    },
    stats: {
      tweets: [
        "5aa05812fcbbc803417de0b5",
        "5aa05812fcbbc803417de0b6",
        "5aa05812fcbbc803417de0b7"
      ]
    }
  },
  {
    _id: "5aa054ac1a6e5a01b90f591d",
    userInfo: {
      username: "looplenny",
      firstName: "Lenny",
      lastName: "Looper"
    },
    stats: {
      tweets: ["5aa05812fcbbc803417de0b8"]
    }
  }
];

let newTweet = new Tweet({
  user: loopylenny,
  text: "This is a new tweet by loopylenny"
});

let testTweets = [
  {
    _id: "5aa05812fcbbc803417de0b5",
    user: "misomighty",
    text: "A 1st tweet by misomighty"
  },
  {
    _id: "5aa05812fcbbc803417de0b6",
    user: "misomighty",
    text: "A 2nd tweet by misomighty"
  },
  {
    _id: "5aa05812fcbbc803417de0b7",
    user: "misomighty",
    text: "A 3rd tweet by misomighty"
  },
  {
    _id: "5aa05812fcbbc803417de0b8",
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
  newTweet,
  dumpDB,
  seedDB
};
