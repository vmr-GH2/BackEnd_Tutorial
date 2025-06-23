const express = require("express");
const router = express.Router();
const controller = require("../controllers/movieController.js");

/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Get all movies
 */
router.get("/movies", controller.getAll);

/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     summary: Get a movie by ID
 */
router.get("/movies/:id", controller.getById);

/**
 * @swagger
 * /movies:
 *   post:
 *     summary: Create a new movie
 */
router.post("/movies", controller.create);

/**
 * @swagger
 * /movies/{id}:
 *   put:
 *     summary: Update a movie
 */
router.put("/movies/:id", controller.update);

/**
 * @swagger
 * /movies/{id}:
 *   delete:
 *     summary: Delete a movie
 */
router.delete("/movies/:id", controller.remove);

module.exports = router;
