const express = require("express");
const app = express();
const productRoutes = require("./src/productRoutes.js");

app.use(express.json());
app.use("/api/v1", productRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
