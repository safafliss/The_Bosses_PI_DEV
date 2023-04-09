import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllRecipes } from '../redux/actions/recipeActions';

const Recipes = () => {
  const recipes = useSelector(state => state.recipes.recipes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRecipes());

  }, [dispatch]);
  console.log(recipes,"hedhyyyyy")
  if (!recipes) {
    return <div>Loading...</div>
  }
//   if (typeof recipes === 'object' && recipes !== null) {
//     return (
//       <div>
//         <h3>{recipes.name}</h3>
//         <p>{recipes.preparation}</p>
//       </div>
//     );
//   }

  return (
    <div>
      <h2>All Recipes</h2>
      <ul>
        {recipes.map((recipe, index) => (
          <li key={index}>
            <h3>{recipe.name}</h3>
            <p>{recipe.rating}</p>
            <ul>
             
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recipes;
