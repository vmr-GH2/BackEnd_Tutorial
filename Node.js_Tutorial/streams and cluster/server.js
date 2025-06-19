//const cluster = require('cluster');commonJs
//const http = require('http');
// const os = require('os');
import os from "os"; //ecjs5 set type:module
import cluster from "cluster";
import http from "http";
import express from "express";

const app = express();

if (cluster.isMaster) {
  // Master process
  console.log(`Master process is running. PID: ${process.pid}`);

  // Get the number of CPU cores
  const numCPUs = os.cpus().length;
  console.log(`Forking for ${numCPUs} CPUs`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Handle worker exit events
  // cluster.on('exit', (worker, code, signal) => {
  //   console.log(`Worker ${worker.process.pid} died. Restarting...`);
  //   cluster.fork(); // Restart the worker
  // });
} else {
  // Worker process
  //console.log(`Worker process started. PID: ${process.pid}`);

  // Create an HTTP server
  // http.createServer((req, res) => {
  //   res.writeHead(200);
  //   res.end(`Worker ${process.pid} is listening on port 3000`);
  // }).listen(3000);

  const server = http.createServer((req, res) => {
    // Ensure `res` is defined and accessible
    if (!res) {
      console.error("Response object is undefined");
      return;
    }
    //res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Worker ${process.pid} is listening on port 3000`);
  });

  server.listen(3000, () => {
    console.log('Server is running on port 3000');
    //res.end(`Worker ${process.pid} is listening on port 3000`);
  });

  //console.log(`Worker ${process.pid} is listening on port 3000`);
}
