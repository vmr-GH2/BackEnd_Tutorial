const express = require("express");
const router = express.Router();
const controller = require("../controllers/movieController.js");

router.get("/movies", controller.getAllMovies);
router.get("/movies/:id", controller.getMovieById);
router.post("/movies", controller.addMovie);
router.put("/movies/:id", controller.updateMovie);
router.delete("/movies/:id", controller.deleteMovie);

module.exports = router;
