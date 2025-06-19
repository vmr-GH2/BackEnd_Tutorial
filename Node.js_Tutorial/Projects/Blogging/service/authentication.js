const JWT = require("jsonwebtoken");

const secretKey = "$uperMan@123";

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    profileImageURL: user.profileImageURL,
    role: user.role,
  };

  const token = JWT.sign(payload, secretKey);
  return token; //encoded format
}

function validateUserToken(token) {
  const payload = JWT.verify(token, secretKey);
  return payload; //decoded format
}

module.exports = {
  createTokenForUser,
  validateUserToken,
};
