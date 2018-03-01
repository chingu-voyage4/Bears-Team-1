const request = require("supertest");
const expect = require("expect");

const mongoose = require("mongoose");
const User = require("./../models/User");
const Tweet = require("./../models/Tweet");
const app = require("./../server");

console.log("tests runnin'");

describe("User", () => {
  it("should be invalid if userInfo fields are empty", done => {
    let invalidUser = new User();
    invalidUser.validate(err => {
      expect(err.errors.userInfo.name).toExist();
      expect(err.errors.userInfo.firstName).toExist();
      expect(err.errors.userInfo.lastName).toExist();
      done();
    });
  });
});
