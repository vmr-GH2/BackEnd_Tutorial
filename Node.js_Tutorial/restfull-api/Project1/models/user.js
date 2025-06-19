const mongoose = require("mongoose");

//create schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
    },
    jobTitle: {
      type: String,
    },
  },
  { timestamps: true } // to show time of created and updated
);

//create schema model
//using object of model i.e "User" we can interact to mongodb
const User = mongoose.model("user", userSchema); 

module.exports = User;
