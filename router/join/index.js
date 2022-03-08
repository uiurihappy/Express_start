var express = require("express");
var app = express();
var router = express.Router();
//상대경로 작성
var path = require("path");
var mysql = require("mysql");

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
  res.sendFile(path.join(__dirname, "../../public/join.html"));
});

router.post("/", function (req, res) {
  var body = req.body;
  var email = body.email;
  var name = body.name;
  var password = body.password;

  var sql = { email: email, name: name, pw: password };
  var query = connection.query(
    "insert into user set ?",
    sql,
    function (err, rows) {
      if (err) throw err;
      else res.render("welcome.ejs", { name: name, id: rows.insertId });
    }
  );
});

module.exports = router;
