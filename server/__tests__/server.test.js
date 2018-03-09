const _ = require("lodash");
const request = require("supertest");
const expect = require("expect");
const mongoose = require("./../server");
const Schema = mongoose.Schema;

const User = require("./../models/User");
const Tweet = require("./../models/Tweet");
const { app } = require("./../app");
const {
  testUser,
  testUsers,
  testTweets,
  newTweet,
  dumpDB,
  seedDB
} = require("./test-data");

beforeEach(done => {
  // Dump, seed, done!
  dumpDB().then(() => {
    seedDB().then(done());
  });
});

describe("GET Users and Tweets", () => {
  it("should return all users", done => {
    request(app)
      .get("/api/users")
      .expect(200)
      .expect(res => {
        expect(res.body.length).toBe(2);
      })
      .end(done);
  });
  it("should return all tweets", done => {
    request(app)
      .get("/api/tweets")
      .expect(200)
      .expect(res => {
        expect(res.body.length).toBe(4);
      })
      .end(done);
  });
  it("should get all tweets by user id", done => {
    // _id is static id from test user
    let user_id = "5aa054ac1a6e5a01b90f591c";
    request(app)
      .get(`/api/tweets/${user_id}`)
      .expect(200)
      .expect(res => {
        // Expect 3 tweet objects
        expect(res.body.length).toBe(3);
      })
      .end(done);
  });
});

describe("POST new User, new Tweet", () => {
  it("should add a new user", done => {
    // TODO: ADD VALIDATION
    request(app)
      .post("/signup")
      .send(testUser)
      .expect(200)
      .expect(res => {
        expect(res.body.userInfo).toEqual(testUser.userInfo);
      })
      .end(done);
  });

  it("should add a new tweet", done => {
    request(app)
      .post("/api/tweet")
      .send(newTweet)
      .expect(200)
      .expect(res => {
        // The user's tweet array should contain the new tweet id
        expect(res.body).toContain(newTweet.id);
      })
      .end(done);
  });
});
