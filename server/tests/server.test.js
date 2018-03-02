const request = require("supertest");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = require("./../models/User");
const Tweet = require("./../models/Tweet");
const app = require("./../server");
const TEST_DB_URL = "mongodb://localhost:27017/v4Bears01";
let testData = {
  userObj: {
    name: ""
  }
};

describe("POST /user", () => {
  let testUser = {
    userInfo: {
      username: "misoawesome",
      firstName: "Miso",
      lastName: "Awesomely"
    }
  };

  it("should add a valid user to the database", done => {
    request(app)
      .post("/user")
      .send(testUser)
      .expect(200)
      .expect(res => {
        expect(res.body.text).toBe(testUser);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.find()
          .then(users => {
            expect(users.length).toBe(1);
            console.log("user", user);
            done();
          })
          .catch(err => done(err));
      });
  });
});
