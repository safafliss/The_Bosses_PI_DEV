import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateRecipe, createRecipe } from '../redux/actions/recipeActions';
import { getAllRecipes, deleteRecipe } from '../redux/actions/recipeActions';
import { useParams } from 'react-router-dom';

const FormRecipe = () => {
    const { id } = useParams();

  const dispatch = useDispatch();
  const recipes = useSelector(state => state.recipes.recipes);
  const [recipe, setRecipe] = useState({
    name: '',
    picture: '',
    preparation: '',
    cooking: '',
    quantity: '',
    shoppingList: '',
    material: '',
    rating: 0
  });
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    if (id && recipes) {
      const currentRecipe = recipes.find(recipe => recipe._id === id);
      if (currentRecipe) {
        setRecipe(currentRecipe);
        setIsUpdate(true);
      }
    }
  }, [id, recipes]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isUpdate) {
      dispatch(updateRecipe(recipe._id, recipe)).then(() => {
        dispatch(getAllRecipes());
        window.location.href = '/recipes';
      });
    } else {
      dispatch(createRecipe(recipe)).then(() => {
        dispatch(getAllRecipes());
        window.location.href = '/recipes';
      });
    }
  };

  return (
    <div>
      <h2>{isUpdate ? 'Update Recipe' : 'Add a Recipe'}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={recipe.name} onChange={(e) => setRecipe({ ...recipe, name: e.target.value })} required />
        </label>
        <br />
        <label>
          Picture:
          <input type="text" value={recipe.picture} onChange={(e) => setRecipe({ ...recipe, picture: e.target.value })} required />
        </label>
        <br />
        <label>
          Preparation:
          <textarea value={recipe.preparation} onChange={(e) => setRecipe({ ...recipe, preparation: e.target.value })} required />
        </label>
        <br />
        <label>
          Cooking:
          <textarea value={recipe.cooking} onChange={(e) => setRecipe({ ...recipe, cooking: e.target.value })} required />
        </label>
        <br />
        <label>
          Quantity:
          <input type="text" value={recipe.quantity} onChange={(e) => setRecipe({ ...recipe, quantity: e.target.value })} />
        </label>
        <br />
        <label>
          Shopping List:
          <textarea value={recipe.shoppingList} onChange={(e) => setRecipe({ ...recipe, shoppingList: e.target.value })} required />
        </label>
        <br />
        <label>
          Material:
          <textarea value={recipe.material} onChange={(e) => setRecipe({ ...recipe, material: e.target.value })} required />
        </label>
        <br />
        <label>
          Rating:
          <input type="number" min="0" max="5" value={recipe.rating}
            onChange={(e) => setRecipe({ ...recipe, rating: e.target.value })} required />
        </label>
        <br />
       

<button type="submit">{isUpdate ? 'Update' : 'Create'}</button>
{isUpdate }
</form>
</div>
  );
};

export default FormRecipe
