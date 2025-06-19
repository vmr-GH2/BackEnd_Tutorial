var express = require("express");
var hash = require("pbkdf2-password")();
var router = express.Router();

var { handleLoginForm } = require("../controllers/auth")

router.get("/index", function (req, res) {
  res.render("index");
});

router.get("/", function (req, res) {
  res.redirect("/index");
});

router.get("/restricted", restrict, function (req, res) {
  res.send('Wahoo! restricted area, click to <a href="/logout">logout</a>');
});

router.post("/index", handleLoginForm );



function restrict(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.session.error = "Access denied!";
    res.redirect("/index");
  }
}

router.get("/logout", function (req, res) {
  // destroy the user's session to log them out
  // will be re-created next request
  req.session.destroy(function () {
    res.redirect("/");
  });
});

module.exports = router;
