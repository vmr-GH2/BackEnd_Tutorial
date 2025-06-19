//import express from 'express'
//import cors from 'cors'

//import petRoutes from './pets/routes/pets.routes.js'

const express = require("express");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerJSdoc = require("swagger-jsdoc");
const petRoutes = require("./pets/routes/pets.routes.js");

const app = express();
const port = 3000;

// swagger definition
const swaggerSpec = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Pets API",
      version: "1.0.0",
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ["./pets/routes/*.js"],
};

/* Global middlewares */
app.use(cors());
app.use(express.json());
app.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerJSdoc(swaggerSpec))
);

/* Routes */
app.use("/pets", petRoutes);

/* Server setup */
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () =>
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
  );
}

module.exports = app;
