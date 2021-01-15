/* IMPORTS */
var express = require("express");
var path = require("path");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var crypto = require("crypto");
const app = require("../app");

/* ROUTER */
var router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

/* MONGOOSE schema */
const userSchema = mongoose.Schema({
  username: { type: String },
  token: { type: String, default: crypto.randomBytes(20).toString("hex") },
});
const activeSessionsSchema = mongoose.Schema({
  userIp: {
    type: String,
  },
  userInfo: { type: Object },
  session: { type: Boolean, default: true },
});

/* MONGOOSE model */
const userModel = mongoose.model("User", userSchema);
const activeSessionsModel = mongoose.model("Session", activeSessionsSchema);

/* GET server page. */
router.post("/register/user", function (req, res, next) {
  userModel.create(req.body);
});
router.post("/github/oauth", (req, res) => {});

/* MONGOOSE connect */
mongoose.connect(
  "mongodb+srv://arnav:Arnav300804@cluster0.qzvuc.mongodb.net/dataset?retryWrites=true&w=majority"
);

/* EXPORT */
module.exports = router;
