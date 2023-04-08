const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./users.models");

const SupportSchema = new Schema(
  {
    username: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
    subject: {
      type: String,

    },
    description: {
      type: String,
    },
    date: {
        type: Date,
        default: Date.now
      }

    }
  
);

module.exports = mongoose.model("Support", SupportSchema);