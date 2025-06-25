const express = require("express");
const router = express.Router();
const githubController = require("../controllers/githubController.js");
const checkAuthCookie = require("../middlewares/authcookieMiddleware.js");

router.get("/auth/github", githubController.githubLogin);
router.get("/github/callback", githubController.githubCallback);
router.get("/profile", checkAuthCookie, githubController.getProfile); // 🔥 Protected Profile
router.get("/logout", githubController.logout); // 🔐 Logout

module.exports = router;
