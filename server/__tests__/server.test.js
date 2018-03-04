// const expect = require("jest");
const request = require("supertest");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = require("./../models/User");
const Tweet = require("./../models/Tweet");
const app = require("./../server");
const TEST_DB_URL = "mongodb://localhost:27017/v4Bears01";

let testUser = {
  userInfo: {
    username: "misoawesome",
    firstName: "Miso",
    lastName: "Awesomely"
  }
};

beforeEach(function(done) {});

describe("POST /login", () => {
  test("should add a valid user to the database", done => {
    request(app)
      .post("/login")
      .send(testUser)
      .expect(200)
      .expect(res => {
        expect(res.body).toEqual(testUser);
      });
    done();
  });
});
