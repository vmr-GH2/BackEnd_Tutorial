const jwt = require("jsonwebtoken");
const secretKey = "Varun$123@$"; //like secret key or stamp on paper

function setUser(user) {
  return jwt.sign(
    { _id: user._id, email: user.email, role: user.role },
    secretKey
  );
}

function getUser(token) {
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded; // Return decoded payload if token is valid
  } catch (err) {
    console.error("JWT Verification Error:", err.message);
    return null; // Return null if token is invalid
  }
}

module.exports = {
  setUser,
  getUser,
};
/* const sessionIdToUserMap = new Map();

function setUser(id, user) {
  sessionIdToUserMap.set(id, user);
}

function getUser(id) {
  return sessionIdToUserMap.get(id);
}*/
