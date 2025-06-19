const express = require("express");
const URL = require("../models/url");
const { restrictTo } = require("../middlewares/auth");

const router = express.Router();

router.get("/admin/urls", restrictTo(["adminUser"]), async (req, res) => {
  //if (!req.user) return res.redirect("/login");
  const allUsersUrls = await URL.find({}); //all urls 
  return res.render("home", {
    urls: allUsersUrls,
  });
});

router.get("/", restrictTo(["normalUser","adminUser"]), async (req, res) => {
  //if (!req.user) return res.redirect("/login");
  const allUsersUrls = await URL.find({ createdBy: req.user._id }); //all urls for specific logined in user
  return res.render("home", {
    urls: allUsersUrls,
  });
});



router.get("/signup", async (req, res) => {
  return res.render("signup");
});

router.get("/login", async (req, res) => {
  return res.render("login");
});

module.exports = router;
