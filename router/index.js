var express = require("express");
var router = express.Router();
//상대경로 작성
var path = require("path");

var main = require("./main/main");
var email = require("./email/email");

router.get("/", function (req, res) {
  console.log("indexjs / path loaded");
  res.sendFile(path.join(__dirname, "../public/main.html"));
});

router.use("/main", main);
router.use("/email", email);

module.exports = router;
