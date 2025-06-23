const express = require("express");
const app = express();
const movieRoutes = require("./routes/movieRoutes.js");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger-docs/swagger.yaml");
const sequelize = require("./config/db.js");
const Movie = require("./models/movieSchema.js");
//const swaggerSpec = require("./swagger-docs/swagger.js");

app.use(express.json());
app.use("/api/v1", movieRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Sync DB on start
// This will create the table if it doesn't exist
sequelize
  .sync()
  .then(() => console.log("Database connected & tables created!"))
  .catch((err) => console.error("❌ DB connection failed:", err.message));

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
  console.log("Swagger docs at http://localhost:3000/api-docs");
});
