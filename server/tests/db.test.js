const request = require("supertest");
const expect = require("expect");

const mongoose = require("mongoose");
const User = require("./../models/User");
const Tweet = require("./../models/Tweet");
const app = require("./../server");

console.log("tests runnin'");
