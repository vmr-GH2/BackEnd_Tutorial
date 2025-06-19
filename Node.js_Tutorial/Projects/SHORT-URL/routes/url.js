const express = require("express");

const router = express.Router();
const {
  handleNewShortUrl,
  handleGetAnalytics,
} = require("../controllers/url");

router.post("/", handleNewShortUrl); //post the url for shortened



router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;
