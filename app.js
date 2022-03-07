var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var router = require("./router/index");

app.listen(3000, function () {
  console.log("start!!! express server on port 3000");
});

// static 디렉토리 설정
// 미들웨어
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(router);
