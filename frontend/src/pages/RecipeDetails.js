import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipeById } from '../redux/actions/recipeActions';
import { useParams } from 'react-router-dom';

const RecipeDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecipeById(id));
  }, [ id]);

  const recipe = useSelector(state => state.recipes.selectedRecipe    );

  console.log('RecipeDetails - recipeId:', id);
  console.log('RecipeDetails - recipe1:', recipe);

 


  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {recipe && (
        <>
          <h2>{recipe.name}</h2>
          <img src={recipe.picture} alt={recipe.name} />
          <p>Preparation: {recipe.preparation}</p>
          <p>Cooking: {recipe.cooking}</p>
          <p>Quantity: {recipe.quantity}</p>
          <p>Shopping List: {recipe.shoppingList}</p>
          <p>Material: {recipe.material}</p>
          <p>Rating: {recipe.rating}</p>
        </>
      )}
    </div>
  );
};

export default RecipeDetails;
