var express = require("express");
var app = express();
var router = express.Router();
//상대경로 작성
var path = require("path");
var mysql = require("mysql");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

//Database Setting
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "1234",
  database: "ybcha",
});
connection.connect();

//Router !!
router.get("/", function (req, res) {
  console.log("get join url!");
  res.render("join.ejs");
});

passport.use(
  "local-join",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallBack: true,
    },
    function (req, email, password, done) {
      console.log("local-join callback called");
    }
  )
);

// router.post("/", function (req, res) {
//   var body = req.body;
//   var email = body.email;
//   var name = body.name;
//   var password = body.password;

//   var sql = { email: email, name: name, pw: password };
//   var query = connection.query(
//     "insert into user set ?",
//     sql,
//     function (err, rows) {
//       if (err) throw err;
//       else res.render("welcome.ejs", { name: name, id: rows.insertId });
//     }
//   );
// });

module.exports = router;
