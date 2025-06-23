const express = require("express");
const app = express();
const movieRoutes = require("./routes/movieRoutes.js");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger-docs/swagger.yaml");
//const swaggerSpec = require("./swagger-docs/swagger.js");

app.use(express.json());
app.use("/api/v1", movieRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
  console.log("Swagger docs at http://localhost:3000/api-docs");
});
