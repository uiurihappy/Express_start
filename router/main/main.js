var express = require("express");
var app = express();
var router = express.Router();
//상대경로 작성
var path = require("path");

router.get("/", function (req, res) {
  console.log("main js loaded");
  //path.join: 합쳐줘서 상대경로로 인식.
  res.sendFile(path.join(__dirname, "../public/main.html"));
});

module.exports = router;
