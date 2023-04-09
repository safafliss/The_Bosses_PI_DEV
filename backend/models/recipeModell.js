const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  preparation: {
    type: String,
    required: true,
  },
  cooking: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: false,
  },
  shoppingList: {
    type: String,
    required: true,
  },
  material: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: false,
  },
});

const recipeModel = mongoose.model('Recipe', recipeSchema);

module.exports = recipeModel;