require('dotenv').config();

const express = require("express");
const path = require("path");

const app = express();
//const PORT = 8000;
// Use the exported PORT or default to 8000
const PORT = process.env.PORT || 8000; //dynamic variable port give cloud provider

const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const Blog = require("./models/blog");

const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");

const mongoose = require("mongoose");
const cookieParser = require("cookie-parser"); //middleware

// Set EJS as templating engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// mongoose
//   .connect("mongodb://127.0.0.1:27017/blogify")
//   .then((e) => console.log("MongoDB Connected...!"));

//$env:MONGO_URL="mongodb://127.0.0.1:27017/blogify"
mongoose
  .connect(process.env.MONGO_URL)
  .then((e) => console.log("MongoDB Connected...!"));

app.use(express.urlencoded({ extended: false })); //to handle form data
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});
  res.render("homepage", {
    user: req.user,
    blogs: allBlogs,
  });
});

app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
