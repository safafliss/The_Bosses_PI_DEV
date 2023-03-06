const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserModel = new Schema(
  {
    firstName: "string",
    lastName: "string",
    password: "string",
    role: "string",
    email: {
      type: "string",
      trim: true,
      unique: true,
    },
  },
  {
      timestamps: true,
  }
);

module.exports = mongoose.model("users", UserModel);