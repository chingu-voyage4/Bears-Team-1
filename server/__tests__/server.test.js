const request = require("supertest");
const expect = require("expect");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = require("./../models/User");
const Tweet = require("./../models/Tweet");
const { app } = require("./../app");
const {
  testUser,
  testUsers,
  testTweets,
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
        expect(res.body.length).toBe(2);
      })
      .end(done);
  });
  it("should get all tweets by user id");
});

describe("POST new User, new Tweet", () => {
  it.only("should add a new user", done => {
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

  it("should add a new tweet");
});
