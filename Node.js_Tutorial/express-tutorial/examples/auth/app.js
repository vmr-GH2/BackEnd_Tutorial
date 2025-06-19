"use strict";

/**
 * Module dependencies.
 */

var express = require("express");
var hash = require("pbkdf2-password")();
var path = require("node:path");
var session = require("express-session");

var app = (module.exports = express());

var authRouter = require("./routes/auth");

// config

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// middleware

app.use(express.urlencoded());
app.use(
  session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: "shhhh, very secret",
  })
);

// Session-persisted message middleware

app.use(function (req, res, next) {
  var err = req.session.error;
  var msg = req.session.success;
  delete req.session.error;
  delete req.session.success;
  res.locals.message = "";
  if (err) res.locals.message = '<p class="msg error">' + err + "</p>";
  if (msg) res.locals.message = '<p class="msg success">' + msg + "</p>";
  next();
});


app.use("/", authRouter);

/* istanbul ignore next */
if (!module.parent) {
  app.listen(3000);
  console.log("Express started on port 3000");
}
