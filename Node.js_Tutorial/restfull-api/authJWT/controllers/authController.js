const authService = require("../services/authService.js");

async function login(req, res, next) {
  try {
    const { token } = await authService.loginUser(req.body);
    res.json({ message: "Login successful", token });
  } catch (err) {
    next(err);
  }
}

module.exports = { login };
