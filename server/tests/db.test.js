const request = require("supertest");
const expect = require("expect");

const mongoose = require("mongoose");
const User = require("./../models/User");
const Tweet = require("./../models/Tweet");
const app = require("./../server");

console.log("tests runnin'");

describe("DB funcs", () => {
  it("should add a user to the db", done => {
    const testUser = new User({
      username: "testuser",
      firstName: "test",
      lastName: "user"
    });

    request(app)
      .testUser.save()
      .then(res => {
        expect();
      });
  });
});
