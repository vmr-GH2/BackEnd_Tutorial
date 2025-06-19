const express = require("express");
const app = express();

app.set("view engine", "ejs"); //template engine to render ejs/html page

app.get("/", (req, res, next) => {
  // res.end("we are on home page");//plain text on browser
  //res.send("we are on home page");//html page
  //res.sendStatus(500);//show the status message
  //res.status(200).send("home page")
  //res.json({ message: "home page" });
  res.render("index", { text: "varun" });
});

//middlewares
app.use(express.static("public")); //public is folder name that have static file
app.use(express.urlencoded({ extended: true }));//access the form data coming //parses
//When a client sends a request with a JSON body (e.g., { "name": "Alice" }), the express.json()
//  middleware parses the JSON string into a JavaScript object.
app.use(express.json())


//app.use(logger);
const userRouter = require("./routes/users");
//same use below code with path /users/.../
app.use("/users", userRouter);

/* app.get("/users",(req,res)=>{
    res.send("All users List");
})

app.get("/users/new",(req,res)=>{
    res.send("User New Form");
})
 */
app.listen(3000, () => {
  console.log("server is running on port 3000");
});
