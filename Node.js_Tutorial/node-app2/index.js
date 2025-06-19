
// simple web server
const http = require("http");
const fs = require("fs");
const url = require('url');

const myServer = http.createServer((request, response) => {
  if(request.url === '/favicon.ico') return response.end();
  const log = `${Date.now()} : ${request.url} New request received ..!\n`;
  const myUrl = url.parse(request.url,true)//parse the url into url object like path,domain and query parameter
  console.log(myUrl);

  //console.log("New request received ...");

  fs.appendFile("log.txt", log, (err, data) => {
    switch (myUrl.pathname) {
      case "/":
        response.end("Hello From server,your are on homepage");
        break;
      case "/about":
        const username = myUrl.query.myname;
        response.end("Hello From server,I am " + username +" Rakshe ");
        break;
      case "/contact":
        response.end("Hello From server,Contact me on 12452461");
        break;
      default:
        response.end("404 Not Found");
        break;
    }

    // response.end("Hello From server,Your request is being processed...");
  });
  //console.log(request.headers)
  //print on browser
});

myServer.listen(3000, () => console.log("Server started ....."));//listen on port no 3000
