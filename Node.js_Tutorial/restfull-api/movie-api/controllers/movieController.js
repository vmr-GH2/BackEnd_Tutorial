const movieService = require("../services/movieService.js");

// Get all movies
async function getAllMovies(req, res) {
  try {
    const result = await movieService.getAllMovies();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

// Get movie by ID
async function getMovieById(req, res) {
  try {
    const id = parseInt(req.params.id);
    const result = await movieService.getMovieById(id);

    if (!result.success) {
      return res.status(404).json(result);
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

// Add a new movie
async function addMovie(req, res) {
  try {
    const data = req.body;
    const result = await movieService.addMovie(data);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

// Update an existing movie
async function updateMovie(req, res) {
  try {
    const id = parseInt(req.params.id);
    const data = req.body;

    const result = await movieService.updateMovie(id, data);
    if (!result.success) {
      return res.status(404).json(result);
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

// Delete a movie
async function deleteMovie(req, res) {
  try {
    const id = parseInt(req.params.id);
    const result = await movieService.deleteMovie(id);

    if (!result.success) {
      return res.status(404).json(result);
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

module.exports = {
  getAllMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie,
};
