const { Router } = require("express");
const router = Router();

const User = require("../models/user");

router.get("/signin", (req, res) => {
  return res.render("signin");
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
    //console.log(token);
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("signin", {
      error: "Invalid email or password!",
    });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  await User.create({
    fullName: fullName,
    email: email,
    password: password,
  });

  return res.redirect("/");
});
module.exports = router;
