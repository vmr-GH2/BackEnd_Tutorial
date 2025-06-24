const userDao = require("../dao/userDao.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function loginUser({ email, password }) {
  const user = await userDao.findByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return { token };
}

module.exports = { loginUser };
