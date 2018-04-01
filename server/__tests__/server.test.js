const _ = require("lodash");
const request = require("supertest");
const expect = require("expect");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = require("./../models/User");
const Tweet = require("./../models/Tweet");
const { app } = require("./../server");
const {
  testUser,
  testUsers,
  testTweets,
  newTweet,
  dumpDB,
  seedDB
} = require("./test-data");

// Returning a promise has the same effect as calling done()
beforeEach(() => {
  // Dump, seed, done!
  return dumpDB().then(() => {
    seedDB();
  });
});

// TODO: Extract commonly used variables

describe("TWEETS", () => {
  it("GET / should return all tweets", done => {
    request(app)
      .get("/tweet/all")
      .expect(200)
      .expect(res => {
        expect(res.body.length).toBe(5);
      })
      .end(done);
  });

  it("POST / should add a new tweet", done => {
    request(app)
      .post("/tweet/new")
      .send(newTweet)
      .expect(200)
      .expect(res => {
        // The tweet should include the user's id
        // creator ID returns an ObjectId so it must be stringified to be tested
        expect(JSON.stringify(res.body.creator)).toEqual(
          expect.stringContaining(JSON.stringify(newTweet.creator))
        );
      })
      .end(done);
  });

  it("DELETE / should remove a tweet from the DB", done => {
    const delete_id = "5aa05812fcbbc803417de0b6";
    request(app)
      .delete(`/tweet/${delete_id}`)
      .expect(200)
      .expect(res => {
        Tweet.find({})
          .then(tweets => {
            expect(tweets.length).toBe(4);
          })
          .catch(err => err);
      })
      .end(done);
  });
});

describe("USERS", () => {
  it("GET / should return all users", done => {
    request(app)
      .get("/user/all")
      .expect(200)
      .expect(res => {
        expect(res.body.length).toBe(3);
      })
      .end(done);
  });

  it("POST / should add a new user", done => {
    // TODO: ADD VALIDATION
    request(app)
      .post("/user/new")
      .send(testUser)
      .expect(200)
      .expect(() => {
        expect.objectContaining(testUser);
      })
      .end(done);
  });

  it("GET / should get all tweets by user id", done => {
    // _id is static id from test user
    const creator = "5aa054ac1a6e5a01b90f591c";
    request(app)
      .get(`/user/${creator}/tweets/`)
      .expect(200)
      .expect(res => {
        // Expect 3 tweet objects
        expect(res.body.length).toBe(3);
      })
      .end(done);
  });

  it("DELETE / should make a user inactive", done => {
    // Loopylenny is about to get nixed
    const delete_id = "5aa054ac1a6e5a01b90f591d";
    request(app)
      .put(`/user/${delete_id}`)
      .expect(200)
      .expect(() => {
        User.findById(delete_id).then(user => {
          expect(user.username).toEqual("loopylenny");
          expect(user.isActive).toBeFalsy();
        });
      })
      .end(done);
  });
});

describe("LIKES", () => {
  it("should return all liked tweets by a user", done => {
    const user_id = "5aa054ac1a6e5a01b90f591c";

    request(app)
      .get(`/user/${user_id}/likes`)
      .expect(200)
      .expect(res => {
        expect(res.body.likesNum).toBe(1);
      })
      .end(done);
  });

  it("should a liked post to a user model", done => {
    const user_id = "5aa054ac1a6e5a01b90f591d";
    const tweet_id = "5aa05812fcbbc803417de0b6";

    request(app)
      .put(`/user/${user_id}/likes`)
      .send({ tweet_id: tweet_id, action: "like" })
      .expect(200)
      .expect(res => {
        expect(res.body.likes.length).toBe(2);
      })
      .end(done);
  });

  it("should remove a liked tweet from the likes array", done => {
    const user_id = "5aa054ac1a6e5a01b90f591d";
    const tweet_id = "5aa05812fcbbc803417de0b8";

    request(app)
      .put(`/user/${user_id}/likes`)
      .send({ tweet_id: tweet_id, action: "unlike" })
      .expect(200)
      .expect(res => {
        expect(res.body.likesNum).toBe(1);
      })
      .end(done);
  });
});

describe("FOLLOW", () => {
  it("should add a user to user.following", done => {
    const user_id = "5aa054ac1a6e5a01b90f591c"; // Misoawesome
    const requestObj = {
      self_id: "5aa054ac1a6e5a01b90f591d", // Loopylenny
      action: "follow"
    };

    request(app)
      .put(`/user/${user_id}/following`)
      .send(requestObj)
      .expect(200)
      .expect(res => {
        expect(res.body.following).toContain(user_id);
        expect(res.body.followingNum).toBe(1);
      })
      .end(done);
  });

  it("should remove a user from user.following", done => {
    const user_id = "5aa054ac1a6e5a01b90f591d"; // Loopylenny
    const requestObj = {
      self_id: "5aa054ac1a6e5a01b90f591c", // Misoawesome
      action: "unfollow"
    };

    request(app)
      .put(`/user/${user_id}/following`)
      .send(requestObj)
      .expect(200)
      .expect(res => {
        expect(res.body.followingNum).toBe(1);
        expect(res.body.following).not.toContain(user_id);
      })
      .end(done);
  });

  it("should add a following-user to target user's followers array", done => {
    const user_id = "5aa054ac1a6e5a01b90f591c"; // Misoawesome
    const requestObj = {
      self_id: "5aa054ac1a6e5a01b90f591d", // Loopylenny
      action: "follow"
    };

    request(app)
      .put(`/user/${user_id}/following`)
      .send(requestObj)
      .expect(200)
      .expect(res => {
        User.findById(user_id).then(user => {
          expect(user.followers).toContain(requestObj.self_id);
          expect(user.followers.length).toBe(1);
        });
      })
      .end(done);
  });

  it("should return all people that a user is following", done => {
    const user_id = "5aa054ac1a6e5a01b90f591c"; // Misoawesome
    const followerId = "5aa054ac1a6e5a01b90f591d"; // Loopylenny

    request(app)
      .get(`/user/${user_id}/following`)
      .expect(200)
      .expect(res => {
        expect(res.body.following[0].username).toBe("loopylenny");
      })
      .end(done);
  });

  it("should return all people following a user", done => {
    const user_id = "5aa054ac1a6e5a01b90f591d"; // Loopylenny
    const followerId = "5aa054ac1a6e5a01b90f591c"; // Misoawesome

    request(app)
      .get(`/user/${user_id}/followers`)
      .expect(200)
      .expect(res => {
        expect(res.body.followers[0].username).toBe("misoawesome");
      })
      .end(done);
  });
});

describe("EDIT PROFILE", () => {
  it("should update a user's information", done => {
    const user_id = "5aa054ac1a6e5a01b90f591d"; // Loopylenny
    let updates = {
      username: "loopylucy",
      firstName: "lucy",
      lastName: "smith",
      location: "San Antonio, TX",
      about: "Just a small town girl living in a lonely world"
    };

    request(app)
      .put(`/user/${user_id}/profile`)
      .send(updates)
      .expect(200)
      .expect(res => {
        expect(res.body.username).toBe(updates.username);
        expect(res.body.firstName).toBe(updates.firstName);
        expect(res.body.lastName).toBe(updates.lastName);
        expect(res.body.about).toBe(updates.about);
        expect(res.body.location).toBe(updates.location);
      })
      .end(done);
  });
});

describe("FEED", () => {
  it("Should return all posts from users being followed and posts by self", done => {
    const self_id = "5aa054ac1a6e5a01b90f591c"; // Misoawesome

    request(app)
      .get(`/user/${self_id}/feed`)
      .expect(200)
      .expect(res => {
        expect(res.body.length).toBe(5);
      })
      .end(done);
  });
});
