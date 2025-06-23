const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");

const Movie = sequelize.define("Movie", {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  director: {
    type: DataTypes.STRING
  },
  year: {
    type: DataTypes.INTEGER
  },
  rating: {
    type: DataTypes.FLOAT
  }
});

module.exports = Movie;
