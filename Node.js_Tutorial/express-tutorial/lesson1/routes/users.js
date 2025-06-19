const express = require("express");

const router = express.Router(); //router is same as app or mini app used same as app
//const app = express();

//router.use(logger);//call the middleware using the use

router.get("/", (req, res) => {
  const userName = req.query.name;
  console.log(userName);
  res.send("All users List");
});

router.get("/new", (req, res) => {
  //res.send("User New Form");
  res.render("users/form");
});

router.post("/", (req, res) => {
  const isValid = true;
  if (isValid) {
    users.push({ fullname: req.body.fullname });
    res.redirect(`/users/${users.length - 1}`);
  } else {
    console.log("Error");
    res.render(`users/form`, { fullname: req.body.fullname });
    //res.render("users/form");
  }
  // const user = req.body.fullname;
  // console.log("new user ", user);
  // res
  //   .status(200)
  //   .send(
  //     `Thank you, new user created: ${req.body.fullname}. Your details have been received.`
  //   );
});

//user router.route() when multiple method have same path as below
router
  .route("/:userId")
  .get((req, res) => {
    console.log(req.user);
    res.send(
      `Get the user with User ID: ${req.params.userId}${req.user.fullname}`
    );
  })
  .put((req, res) => {
    res.send(`Update  the user with User ID: ${req.params.userId}`);
  })
  .delete((req, res) => {
    res.send(`Delete the user with User ID: ${req.params.userId}`);
  });

//middleware function: every middleware functions take the three parameter that are (req,res,next)
/* function logger(req, res, next) {
  console.log(req.originalUrl);
  next();
} */

//dynamic routing
/* router.get("/:userId", (req, res) => {
  res.send(`Get the user with User ID: ${req.params.userId}`);
});

router.put("/:userId", (req, res) => {
  res.send(`Update  the user with User ID: ${req.params.userId}`);
});

router.delete("/:userId", (req, res) => {
  res.send(`Delete the user with User ID: ${req.params.userId}`);
}); */

const users = [{ fullname: "varun rakshe" }, { fullname: "omkar tarale" }];
//middleware
router.param("userId", (req, res, next, userId) => {
  console.log("user id is ", userId);
  req.user = users[userId];
  next(); //perform next function
});
module.exports = router;
