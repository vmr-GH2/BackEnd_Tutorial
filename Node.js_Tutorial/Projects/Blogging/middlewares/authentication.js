const { validateUserToken } = require("../service/authentication");

function checkForAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];
    if (!tokenCookieValue) {
      // Token is not present
      return next();
    }
    try {
      const userPayload = validateUserToken(tokenCookieValue);
      req.user = userPayload;
    } catch (error) {}
    
    return next();
  };
}

module.exports = {
  checkForAuthenticationCookie,
};
