var express = require("express");
var app = express();
var router = express.Router();
//상대경로 작성
var path = require("path");
var mysql = require("mysql");
var passport = require("passport");
const { emit } = require("process");
var LocalStrategy = require("passport-local").Strategy;

// DATABASE SETTING
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "1234",
  database: "ybcha",
});
connection.connect();

router.get("/", function (req, res) {
  var msg;
  var errMsg = req.flash("error");
  if (errMsg) msg = errMsg;
  res.render("login.ejs", { message: msg });
});

//passport.serialize
passport.serializeUser(function (user, done) {
  console.log("passport session save : ", user.id);
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  console.log("passport session get id: ", id);
  done(null, id);
});

passport.use(
  "local-login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    function (req, email, password, done) {
      var query = connection.query(
        "select * from user where email=?",
        [email],
        function (err, rows) {
          if (err) return done(err);

          if (rows.length) {
            //false이면 fail redirect로 간다.
            //즉, login 화면으로 돌아가고
            return done(null, { email: email, id: rows[0].UID });
          } else {
            return done(null, false, {
              message: "your login info is not found",
            });
          }
        }
      );
    }
  )
);

router.post("/", function (req, res, next) {
  passport.authenticate("local-login", function (err, user, info) {
    if (err) res.status(500).json(err);
    if (!user) return res.status(401).json(info.message);

    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.json(user);
    });
  })(req, res, next);
});

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
