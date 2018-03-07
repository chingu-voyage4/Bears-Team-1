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

describe("GET /api/users", () => {
  it("should return all users", done => {
    request(app)
      .get("/api/users")
      .expect(200)
      .expect(res => {
        expect(res.body.length).toBe(2);
      })
      .end(done);
  });
});

describe("GET /api/tweets", () => {
  it("should return all tweets", done => {
    request(app)
      .get("/api/tweets")
      .expect(200)
      .expect(res => {
        expect(res.body.length).toBe(2);
      })
      .end(done);
  });
});

describe("POST /signup", () => {
  it.only("should add a valid user to the database", done => {
    request(app)
      .post("/signup")
      .send(testUser)
      .expect(200)
      .expect(res => {
        expect(res.body.userInfo).toEqual(testUser.userInfo);
      })
      .end(done);
  });
});
