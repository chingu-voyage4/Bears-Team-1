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
  return Promise.all([
    Tweet.remove({}).catch(err => err),
    User.remove({}).catch(err => err)
  ]);
};

let seedDB = () => {
  const promise1 = new Promise((resolve, reject) => reject(1)).catch(err =>
    console.log(err)
  );
  return Promise.all([
    promise1,
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
