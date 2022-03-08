var express = require("express");
var app = express();
var router = express.Router();
//상대경로 작성
var path = require("path");
var mysql = require("mysql");
var passport = require("passport");
const { emit } = require("process");
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
  var msg;
  var errMsg = req.flash("error");

  if (errMsg) msg = errMsg;
  res.render("join.ejs", { message: msg });
});

passport.serializeUser(function (user, done) {
  console.log("passport session save: ", user.id);
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  console.log("passport session get id: ", id);
  done(null, id);
});

passport.use(
  "local-join",
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
            console.log("existed user");
            //false이면 fail redirect로 간다.
            //즉, join 화면으로 돌아가고
            return done(null, false, { message: "your email is already used" });
          } else {
            //만약 중복 email이 없으면 success redirect로 가서
            //insert를 진행하여 main으로 간다.
            var sql = { email: email, pw: password };
            var query = connection.query(
              "insert into user set ?",
              sql,
              function (err, rows) {
                if (err) throw err;
                //done은 serialize 메소드를 불러 처리를 한다. 세션 처리가 필요!
                return done(null, { email: email, id: rows.insertId });
              }
            );
          }
        }
      );
    }
  )
);

router.post(
  "/",
  passport.authenticate("local-join", {
    //object return
    successRedirect: "/main",
    failureRedirect: "/join",
    failureFlash: true,
  })
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
