const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

const userRouter = require("./routes/user");

app.use("/",userRouter);

//To serve static files such as images, CSS files, and 
// JavaScript files, use the express.static built-in middleware function in Express.

//app.use(express.static("public"));
app.use('/static', express.static('public'))//To create a virtual path prefix 
// (where the path does not actually exist in the file system)

console.log(path.join(__dirname, 'public')); 

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
