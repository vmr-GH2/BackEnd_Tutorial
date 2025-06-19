const { getUser } = require("../service/auth");

function checkForAuthentication(req, res, next) {
  //const authorisationHeaderValue = req.headers["authorization"];
  const tokenCookie = req.cookies?.token;
  req.user = null;
  if (!tokenCookie) {
    return next();
  }

  //const token = authorisationHeaderValue.split("Bearer")[1];
  const token = tokenCookie;
  const user = getUser(token); //verify

  req.user = user;
  return next();
}
//admin,normal
function restrictTo(roles = []) {
  return function (req, res, next) {
    if (!req.user) {
      return res.redirect("/login");
    }
    if (!roles.includes(req.user.role)) return res.end("Unauthorized");

    return next();
  };
}
/* async function handleLoggedinUserOnly(req, res, next) {
  // const userUid = req.cookies?.uid;
  const userUid = req.headers['authorization'];//response method 


  if (!userUid) return res.redirect("/login");
  const token = userUid.split('Bearer ')[1];
  const user =  getUser(token);
  //const user = getUser(userUid);
  if (!user) return res.redirect("/login");

  req.user = user;
  next();
}

async function checkAuth(req, res,next) {
  //const userUid = req.cookies?.uid;
  const userUid = req.headers['authorization'];//response method 
  const token = userUid.split('Bearer ')[1];
  const user =  getUser(token);
  //const user = getUser(userUid);
  req.user = user;
  next();
}*/

module.exports = {
  checkForAuthentication,
  restrictTo,
};
