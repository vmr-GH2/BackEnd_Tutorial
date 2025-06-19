const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;
const status = require("express-status-monitor");

// app.use(status())

app.get("/", (req, res) => {

    const streams = fs.createReadStream("./sample.txt","utf-8");
    streams.on("data", (chunkData) => {
        res.write(chunkData);
    })
    streams.on("end", () => {res.end()});
  /* fs.readFile("./sample.txt", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error reading file");
    } else {
      res.end(data);
    }
  }); */
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
