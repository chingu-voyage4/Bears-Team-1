const request = require("supertest");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = require("./../models/User");
const Tweet = require("./../models/Tweet");
const app = require("./../app");
const { testUser, testUsers } = require("./test-data");

beforeEach(done => {
  // Before each test, erase User collection and insert Users
  User.remove({}).then(() => {
    User.insertMany(testUsers)
      .then(users => {
        done();
      })
      .catch(err => done(err));
  });
});

describe("GET /api/users", () => {
  test("should return all users", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .expect(res => {
        console.log(res.body);
        expect(res.body.length).toBe(2);
      });
  });
});

// describe("POST /signup", () => {
//   test("should add a valid user to the database", done => {
//     request(app)
//       .post("/login")
//       .send(testUser)
//       .expect(200)
//       .expect(res => {
//         expect(res.body).toEqual(testUser);
//       });
//     done();
//   });
// });
