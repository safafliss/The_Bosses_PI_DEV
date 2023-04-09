const RecipeModel = require('../models/recipeModell');

// Create a new recipe 
exports.createRecipe = async (req, res) => {
  try {
    const recipe = await RecipeModel.create(req.body);
    res.status(201).json(recipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// get a recipe 
exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await RecipeModel.findById(req.params._id);
    if (!recipe) {
      res.status(404).json({ message: 'Recipe not found' });
    } else {
      res.json(recipe);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all recipes
exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await RecipeModel.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a recipe 
exports.updateRecipe = async (req, res) => {
  try {
    const recipe = await RecipeModel.findByIdAndUpdate(req.params._id, req.body, { new: true });
    if (!recipe) {
      res.status(404).json({ message: 'Recipe not found' });
    } else {
      res.json(recipe);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a recipe 
exports.deleteRecipe = async (req, res) => {
  try {
    const recipe = await RecipeModel.findByIdAndDelete(req.params._id);
    if (!recipe) {
      res.status(404).json({ message: 'Recipe not found' });
    } else {
      res.json({ message: 'Recipe deleted' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

  // Rate a recipe 
// exports.rateRecipe = async (req, res) => {
//     try {
//       const recipe = await RecipeModel.findById(req.params.id);
//       if (!recipe) {
//         res.status(404).json({ message: 'Recipe not found' });
//       } else {
//         // Update the recipe's rating
//         recipe.rating.push(req.body);
//         await recipe.save();
  
//         // Calculate the new average rating
//         const totalRatings = recipe.rating.length;
//         const totalRatingValue = recipe.rating.reduce((acc, curr) => acc + curr.value, 0);
//         const averageRating = totalRatingValue / totalRatings;
  
//         // Update the recipe's average rating
//         recipe.averageRating = averageRating;
//         await recipe.save();
  
//         res.json(recipe);
//       }
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
//   };
};
