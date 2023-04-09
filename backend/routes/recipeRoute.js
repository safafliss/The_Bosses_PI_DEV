const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

// create 
router.post('/add', recipeController.createRecipe);

// get
router.get('/get/:_id', recipeController.getRecipeById);

// getAll
router.get('/getall', recipeController.getAllRecipes);

// update 
router.patch('/update/:_id', recipeController.updateRecipe);

//delete
router.delete('/delete/:_id', recipeController.deleteRecipe);

//Rate
//router.post('/:_id/rate', recipeController.rateRecipe);

module.exports = router;