const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

async function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Token required" });

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    // If the token is valid, attach the user information to the request object
    // This user object should contain the user ID and any other relevant information
    //console.log(user.userId);

    try {
      const userData = await User.findByPk(user.userId);
      //console.log(userData);
      req.user = { userData, ...user }; //here user is claim or payload give id,iat,exp
      next();
    } catch (dbError) {
      res.status(500).json({ message: "Database error" });
    }
  });
}

module.exports = authenticateToken;
