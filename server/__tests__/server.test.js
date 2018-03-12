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

beforeEach(done => {
  // Dump, seed, done!
  dumpDB().then(() => {
    seedDB().then(done());
  });
});

describe("TWEETS", () => {
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

  it("GET / should return all tweets", done => {
    request(app)
      .get("/tweet/all")
      .expect(200)
      .expect(res => {
        expect(res.body.length).toBe(4);
      })
      .end(done);
  });
  it("GET / should get all tweets by user id", done => {
    // _id is static id from test user
    let creator = "5aa054ac1a6e5a01b90f591c";
    request(app)
      .get(`/tweet/${creator}`)
      .expect(200)
      .expect(res => {
        // Expect 3 tweet objects
        expect(res.body.length).toBe(3);
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
        expect(res.body.length).toBe(2);
      })
      .end(done);
  });

  it("POST / should add a new user", done => {
    // TODO: ADD VALIDATION
    request(app)
      .post("/user/new")
      .send(testUser)
      .expect(200)
      .expect(res => {
        expect(res.body.userInfo).toEqual(testUser.userInfo);
      })
      .end(done);
  });
});
