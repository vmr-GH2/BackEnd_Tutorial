function checkAuthCookie(req, res, next) {
  if (!req.cookies.github_token) {
    return res.status(401).send("Not authenticated");
  }
  next();
}

module.exports = checkAuthCookie;
