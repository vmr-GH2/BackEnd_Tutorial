const express = require("express");
const app = express();
const PORT = 3000;
const userRouter = require("./routes/user");
const { connectMongoDB } = require("./connection");
const { logReqRes } = require("./middlewares/index");

//connection to mongodb
connectMongoDB("mongodb://127.0.0.1:27017/userDataBase").then(() =>
  console.log("MongoDB Connected...!")
);

//built-in middleware - plugin

//This middleware parses the URL-encoded data and converts it into a JavaScript object
app.use(express.urlencoded({ extended: false }));

//middleware1
app.use(logReqRes("logFile.txt"));

//routes
app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
