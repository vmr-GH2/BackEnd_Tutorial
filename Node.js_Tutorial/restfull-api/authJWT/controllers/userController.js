const userService = require("../services/userService.js");

async function register(req, res, next) {
  try {
    const user = await userService.registerUser(req.body);
    res.status(201).json({ message: "User registered", user });
  } catch (err) {
    next(err);
  }
}

module.exports = { register };
