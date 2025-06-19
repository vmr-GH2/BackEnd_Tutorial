// simple web server using express framework
//const http = require("http");
const express = require("express");
const PORT = 3000;

const app = express(); //function handler

app.get("/", (req, res) => {
  return res.send("Hello from the Homepage " + " hey " + req.query.name);
});

app.get("/about", (req, res) => {
  return res.send("Hello from the About page");
});

// const myServer = http.createServer(app);

// myServer.listen(3000, () => console.log("Server started .....")); //listen on port no 3000

app.listen(PORT, () => {
  console.log("Server started .....");
});
