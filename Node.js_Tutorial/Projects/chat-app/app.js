const express = require("express");
const http = require("http");
const { join } = require("path");

const app = express();
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server); //handle all socket io's

//Socket.io
io.on("connection", (socket) => {
  socket.on("message", (message) => {
    //console.log('A new  user message', message);
    io.emit("message", message); //send to other user
  });
});

//built-in middleware function in Express that serves static files (e.g., HTML, CSS, JavaScript,
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
