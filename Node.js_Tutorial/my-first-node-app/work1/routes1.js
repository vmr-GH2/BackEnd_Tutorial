// routes1.js
function showHello(req,res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end("<h1>Hello, World!</h1>");
  //return "<h1>Hello, World!</h1>";
}

function showGoodbye(req,res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end("<h1>Goodbye, World!</h1>");
  //return "<h1>Goodbye, World!</h1>";
}

module.exports = { showHello, showGoodbye };
