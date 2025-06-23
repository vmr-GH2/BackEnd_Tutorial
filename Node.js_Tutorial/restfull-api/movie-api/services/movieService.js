const db = require("../config/connectDB.js");

// "?" is a parameter placeholder in SQL queries.
//The actual value is provided as a second argument to db.query.
//This is called a "parameterized query" or "prepared statement".

const getAllMovies = async () => {
  const [rows] = await db.query("SELECT * FROM movies");
  //console.log(rows)
  return rows;
};

const getMovieById = async (id) => {
  const [rows] = await db.query("SELECT * FROM movies WHERE id = ?", [id]);
  return rows[0];
};

const addMovie = async (movie) => {
  const { title, director, year, rating } = movie;
  const [result] = await db.query(
    "INSERT INTO movies (title, director, year, rating) VALUES (?, ?, ?, ?)",
    [title, director, year, rating]
  );
  return { id: result.insertId, ...movie };
};

const updateMovie = async (id, movie) => {
  const { title, director, year, rating } = movie;
  if (
    title === undefined ||
    director === undefined ||
    year === undefined ||
    rating === undefined
  ) {
    throw new Error("All fields are required: title, director, year, rating");
  }
  const [updateMovie] = await db.query(
    "UPDATE movies SET title=?, director=?, year=?, rating=? WHERE id=?",
    [title, director, year, rating, id]
  );
  if (updateMovie.affectedRows === 0) {
    return null; // Movie not found
  }
  // Fetch and return the updated movie
  const [rows] = await db.query("SELECT * FROM movies WHERE id = ?", [id]);
  return rows[0];
};

const deleteMovie = async (id) => {
  // Fetch the movie first
  const [rows] = await db.query("SELECT * FROM movies WHERE id = ?", [id]);
  if (rows.length === 0) {
    return null; // Movie not found
  }
  const movie = rows[0];

  const [deletedMovie] = await db.query("DELETE FROM movies WHERE id = ?", [
    id,
  ]);
  if (deletedMovie.affectedRows === 0) {
    return null; // Movie not found
  }
  return { ...movie, message: "Movie deleted" };
};

module.exports = {
  getAllMovies,

  getMovieById,

  addMovie,

  updateMovie,

  deleteMovie,
};
