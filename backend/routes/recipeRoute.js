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
router.put('/update/:_id', recipeController.updateRecipe);

//delete
router.delete('/delete/:_id', recipeController.deleteRecipe);

//picture
router.post('/uploadImageRecipe', recipeController.UploadImageRecipe);
//updatepic
router.put('/updatePicture/:id', recipeController.updateRecipPic);

module.exports = router;
