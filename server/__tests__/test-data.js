const Tweet = require("./../models/Tweet");
const User = require("./../models/User");

let testUser = new User({
  username: "misomighty",
  firstName: "Miso",
  lastName: "Mighty"
});

let testUsers = [
  {
    _id: "5aa054ac1a6e5a01b90f591c",
    username: "misoawesome",
    firstName: "Miso",
    lastName: "Awesomely",
    likes: ["5aa05812fcbbc803417de0b8"],
    following: ["5aa054ac1a6e5a01b90f591d", "5aa054ac1a6e5a01b90f591e"]
  },
  {
    _id: "5aa054ac1a6e5a01b90f591d",
    username: "loopylenny",
    firstName: "Lenny",
    lastName: "Looper",
    likes: ["5aa05812fcbbc803417de0b5"],
    followers: ["5aa054ac1a6e5a01b90f591c"]
  },
  {
    _id: "5aa054ac1a6e5a01b90f591e",
    username: "jackroads",
    firstName: "jack",
    lastName: "roads",
    likes: ["5aa05812fcbbc803417de0b8"]
  }
];

let newTweet = new Tweet({
  _id: "5aa05812fcbbc803417de0b8",
  creator: "5aa054ac1a6e5a01b90f591d",
  text: "This is a new tweet by loopylenny"
});

let testTweets = [
  {
    _id: "5aa05812fcbbc803417de0b5",
    creator: "5aa054ac1a6e5a01b90f591c",
    user: "misomighty",
    text: "A 1st tweet by misomighty"
  },
  {
    _id: "5aa05812fcbbc803417de0b6",
    creator: "5aa054ac1a6e5a01b90f591c",
    user: "misomighty",
    text: "A 2nd tweet by misomighty"
  },
  {
    _id: "5aa05812fcbbc803417de0b7",
    creator: "5aa054ac1a6e5a01b90f591c",
    user: "misomighty",
    text: "A 3rd tweet by misomighty"
  },
  {
    _id: "5aa05812fcbbc803417de0b8",
    creator: "5aa054ac1a6e5a01b90f591d",
    user: "loopylenny",
    text: "A tweet by loopylenny"
  },
  {
    _id: "5aa05812fcbbc803417de0b9",
    creator: "5aa054ac1a6e5a01b90f591e",
    user: "jackroads",
    text: "It's jack roads, baby!"
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
    Tweet.insertMany(testTweets),
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
