//for authentication
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      require: true,
      default: "normalUser",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("userdata", userSchema);

module.exports = User;
