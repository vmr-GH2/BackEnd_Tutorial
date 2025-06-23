const Movie = require("../models/movieSchema.js");

// Get all movies
async function getAllMovies() {
  try {
    const movies = await Movie.findAll();
    if (!movies || movies.length === 0) {
      return { success: false, message: "No movies found" };
    }
    return { data: movies };
  } catch (error) {
    throw new Error("Failed to fetch movies");
  }
}

// Get a movie by ID
async function getMovieById(id) {
  try {
    if (!id) throw new Error("Movie ID is required");

    const movie = await Movie.findByPk(id);

    if (!movie) {
      return { success: false, message: `Movie with ID ${id} not found` };
    }

    return { success: true, data: movie };
  } catch (error) {
    throw new Error(error.message || "Failed to fetch movie");
  }
}

// Add a new movie
async function addMovie(data) {
  try {
    const movie = await Movie.create(data);
    return { success: true, message: "Movie added successfully", data: movie };
  } catch (error) {
    throw new Error("Failed to add movie");
  }
}

// Update an existing movie
async function updateMovie(id, data) {
  try {
    if (!id) throw new Error("Movie ID is required");

    const movie = await Movie.findByPk(id);
    if (!movie) {
      return { success: false, message: `Movie with ID ${id} not found` };
    }

    await Movie.update(data, { where: { id } });
    const updated = await Movie.findByPk(id);
    return {
      success: true,
      message: `Movie with ID ${id} updated successfully`,
      data: updated,
    };
  } catch (error) {
    throw new Error(error.message || "Failed to update movie");
  }
}

// Delete a movie
async function deleteMovie(id) {
  try {
    if (!id) throw new Error("Movie ID is required");

    const movie = await Movie.findByPk(id);
    if (!movie) {
      return { success: false, message: `Movie with ID ${id} not found` };
    }

    await Movie.destroy({ where: { id } });
    return {
      success: true,
      message: `Movie with ID ${id} deleted successfully`,
      data:movie,
    };
  } catch (error) {
    throw new Error(error.message || "Failed to delete movie");
  }
}

module.exports = {
  getAllMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie,
};
