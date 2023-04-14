import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateRecipe, createRecipe } from '../redux/actions/recipeActions';
import { getAllRecipes, deleteRecipe } from '../redux/actions/recipeActions';
import { useParams } from 'react-router-dom';
import CardListUsers from '../components/ReusableComponents/components/Cards/CardListUsers';
import CardLineChart from '../components/ReusableComponents/components/Cards/CardLineChart';
import CardBarChart from '../components/ReusableComponents/components/Cards/CardBarChart';
import CardSocialTraffic from '../components/ReusableComponents/components/Cards/CardSocialTraffic';
import CardPageVisits from '../components/ReusableComponents/components/Cards/CardPageVisits';
import HeaderStats from '../components/ReusableComponents/components/Headers/HeaderStats';
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
      <HeaderStats></HeaderStats>
      <h2>{isUpdate ? 'Update Recipe' : 'Add a Recipe'}</h2>
      
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full pr-10" type="text" value={recipe.name} onChange={(e) => setRecipe({ ...recipe, name: e.target.value })} required />
        </label>
        <br />
        <label>
          Picture:
          <input class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full pr-10" type="text" value={recipe.picture} onChange={(e) => setRecipe({ ...recipe, picture: e.target.value })} required />
        </label>
        <br />
        <label>
          Preparation:
          <textarea  class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full pr-10" value={recipe.preparation} onChange={(e) => setRecipe({ ...recipe, preparation: e.target.value })} required />
        </label>
        <br />
        <label>
          Cooking:
          <textarea class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full pr-10" value={recipe.cooking} onChange={(e) => setRecipe({ ...recipe, cooking: e.target.value })} required />
        </label>
        <br />
        <label>
          Quantity:
          <input class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full pr-10" type="text" value={recipe.quantity} onChange={(e) => setRecipe({ ...recipe, quantity: e.target.value })} />
        </label>
        <br />
        <label>
          Shopping List:
          <textarea class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full pr-10" value={recipe.shoppingList} onChange={(e) => setRecipe({ ...recipe, shoppingList: e.target.value })} required />
        </label>
        <br />
        <label>
          Material:
          <textarea class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full pr-10" value={recipe.material} onChange={(e) => setRecipe({ ...recipe, material: e.target.value })} required />
        </label>
        <br />
        <label>
          Rating:
          <input class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full pr-10" type="number" min="0" max="5" value={recipe.rating}
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
