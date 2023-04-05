const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./users.models");

const ProductSchema = new Schema(
  {
    username: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
    category: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    expiry_date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      //required: true,
    },
    image: {
      public_id: {
        type: String,
        //required: true,
        //default: "default_public_id"
      },
      url: {
        type: String,
        //required: true,
        //default: "default_url"
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
