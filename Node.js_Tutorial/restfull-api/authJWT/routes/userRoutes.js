const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");
const authenticateToken = require("../middleware/authMiddleware.js");

router.post("/register", userController.register);

// Example protected route
router.get("/profile", authenticateToken, (req, res) => {
  res.json({ message: "Access granted to protected route", user: req.user });
});

module.exports = router;
