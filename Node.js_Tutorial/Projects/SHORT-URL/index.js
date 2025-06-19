const express = require("express");

const PORT = 8000;
const app = express();

const { connectToMongoDB } = require("./connectMongodb");

const URL = require("./models/url");

const path = require("path");

//all routers
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

const cookieParser = require("cookie-parser");

const { checkForAuthentication, restrictTo } = require("./middlewares/auth");

app.set("view engine", "ejs"); //template engine for ease server side rendring
app.set("views", path.resolve("./views"));

connectToMongoDB("mongodb://127.0.0.1:27017/short-url-db").then(() =>
  console.log("MongoDB Connected...!")
);

app.use(express.json());
app.use(express.urlencoded({ extended: false })); //for form data
app.use(cookieParser());
app.use(checkForAuthentication);

// app.use("/url", handleLoggedinUserOnly, urlRoute);
// app.use("/user", userRoute);
// app.use("/", checkAuth, staticRoute);

app.use("/url", restrictTo(["normalUser","adminUser"]),urlRoute);
app.use("/user", userRoute);
app.use("/",  staticRoute);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitedHistory: {
          timestamp: Date.now(),
        }, //update visited history by pushing time of link visit and no of click
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
