const { log } = require('debug/src/browser');
const RecipeModel = require('../models/recipeModell');
const cloudinary = require("../utils/cloudinary");

const createRecipe = async (req, res) => {
  try {
    const recipe = await RecipeModel.create(req.body);
   
    res.status(201).json({ success: true, data: recipe });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const UploadImageRecipe = async (req, res) => {
  try {

    const { image } = req.body;
    console.log("hedha l id",req.params.id);
    const result = await cloudinary.uploader.upload(image, {
      folder: "RecipePics",
    });

    const recipe = await RecipeModel.findByIdAndUpdate(req.params.id, {
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });

    res.status(200).json(recipe);
  } catch (error) {
    console.log("Error uploading image", error);
    res.status(500).json({ error: "Error uploading image" });
  }
};


const getRecipeById = async (req, res) => {
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

const getAllRecipes = async (req, res) => {
  try {
    const recipes = await RecipeModel.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateRecipe = async (req, res) => {
  try {
    console.log("dakhlet lenna");
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

const deleteRecipe = async (req, res) => {
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
};

const updateRecipPic = async (req, res) => {
  try {
    const { image } = req.body;
    console.log("hedha l id",image);
    const result = await cloudinary.uploader.upload(image, {
      folder: "RecipePics",
    });
    const picture = await RecipeModel.findByIdAndUpdate(req.params.id, {
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });
    
    res.status(200).json("done");
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  createRecipe,
  UploadImageRecipe,
  getRecipeById,
  getAllRecipes,
  updateRecipe,
  deleteRecipe,
  updateRecipPic
};

  
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

