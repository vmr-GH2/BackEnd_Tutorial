const userDao = require("../dao/userDao.js");
const bcrypt = require("bcryptjs");

async function registerUser({ email, password }) {
  const existingUser = await userDao.findByEmail(email);
  if (existingUser) {
    throw new Error("User already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await userDao.createUser({ email, password: hashedPassword });
  return newUser;
}

module.exports = { registerUser };
