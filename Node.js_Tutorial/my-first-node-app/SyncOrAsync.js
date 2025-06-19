const file = require("fs");

console.log("starting...\n");

//blocking event/synchronous event

/* const data = file.readFileSync("example.txt","utf-8");
console.log(data+"\n"); */

//Non-blocking event/Asynchronous event

file.readFile("example.txt", "utf-8", (err, data) => {
  if (err) console.log(err);
  else console.log(data + "\n");
});
console.log("Ending!\n");
