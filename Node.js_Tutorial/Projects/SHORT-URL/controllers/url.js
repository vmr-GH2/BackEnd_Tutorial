const { nanoid } = require("nanoid");//to generate the short id for url
const URL = require("../models/url");

async function handleNewShortUrl(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).send("Url is required to generate...");

  const shortID = nanoid(8);

  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitedHistory: [],
    createdBy:req.user._id,
  });

  return res.render("home", { shortid: shortID });
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const clicks = await URL.findOne({ shortId });

  return res.json({
    totalClicks: clicks.visitedHistory.length,
    analytics: clicks.visitedHistory,
  });
}

module.exports = {
  handleNewShortUrl,
  handleGetAnalytics,
};
