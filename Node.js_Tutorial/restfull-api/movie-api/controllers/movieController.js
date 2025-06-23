const service = require("../services/movieService.js");

const getAll = async (req, res) => {
  const movies = await service.getAllMovies();
  if (!movies || movies.length === 0) {
    return res.status(404).json({ message: "No movies found" });
  }
  res.json(movies);
};

const getById = async (req, res) => {
  const movie = await service.getMovieById(req.params.id);
  if (!movie) return res.status(404).json({ message: "Not found" });
  res.json(movie);
};

const create = async (req, res) => {
  const movie = await service.addMovie(req.body);
  res.status(201).json({ ...movie, message: "Movie added successfully" });
};

const update = async (req, res) => {
  const  movie  = await service.updateMovie(req.params.id, req.body);
  //console.log(movie)
  if (!movie) return res.status(404).json({ message: "Not found" });
  res.json({ ...movie, message: "Movie updated successfully" });
};

const remove = async (req, res) => {
  const result = await service.deleteMovie(req.params.id);
  if (!result) return res.status(404).json({ message: "Not found" });
  res.json(result);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
