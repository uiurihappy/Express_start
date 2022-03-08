var express = require("express");
var router = express.Router();
//상대경로 작성
var path = require("path");

var main = require("./main/main");
var email = require("./email/email");
var join = require("./join/index");
var login = require("./login/index");

router.get("/", function (req, res) {
  console.log("indexjs / path loaded");
  res.sendFile(path.join(__dirname, "../public/main.html"));
});

router.use("/main", main);
router.use("/email", email);
router.use("/join", join);
router.use("/login", login);

module.exports = router;
