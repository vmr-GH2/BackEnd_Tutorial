const express = require("express");
const app = express();
const userRoutes = require("./routes"); // routes/index.js
const errorHandler = require("./middleware/errorMiddleware.js");
const sequelize = require("./config/db.js");
require("dotenv").config();
//const User = require("./models/user.js");

app.use(express.json());
app.use("/api/v1", userRoutes); // Use the routes defined in routes/index.js
app.use(errorHandler);

sequelize.sync().then(() => {
  console.log("Database connected & synced");
  app.listen(process.env.PORT || 3000, () =>
    console.log("Server running on 3000")
  );
});
