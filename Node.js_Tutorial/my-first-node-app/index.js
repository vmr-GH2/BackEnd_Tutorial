const msg = require("./logger");//imports the log function with name endpoint


console.log(msg);
//msg.endpoint("Hello , varun!")
msg("Hello,varun !..");


/* //promises 
const fs = require('fs');
fs.promises.readFile('example.txt', 'utf8')
  .then(data => console.log(" data from promises : " + data))
  .catch(err => console.error(err));

async/await
async function readFile() {
  try {
    const data = await fs.promises.readFile('example.txt', 'utf8');
    console.log("data from async function :");
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
readFile();
 */

/* fs.promises.readFile('example.txt', 'utf8')
  .then(data => console.log(data))
  .catch(err => console.error(err)); */


// const _ = require('lodash');
// console.log(_.capitalize('hello Node Js'));
 
  // Use the module
//   const utils = require('./utils');
//   console.log(utils.greet('Node.js from custom module'));
  
/* const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');//plain or html
  res.end('Hello, varun!');
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
}); */