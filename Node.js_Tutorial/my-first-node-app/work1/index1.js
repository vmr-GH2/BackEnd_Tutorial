const http = require("http");
const { showGoodbye, showHello } = require("./routes1.js");

const server = http.createServer((req, res) => {
  if (req.url === "/hello") {
    showHello(req, res);
  } else if (req.url === "/goodbye") {
    showGoodbye(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>Page not found...</h1>");
  }
});

server.listen(3000, () => {
  console.log("server running on port 3000");
});
