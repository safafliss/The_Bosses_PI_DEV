import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllRecipes, deleteRecipe } from '../redux/actions/recipeActions';
import { Link } from 'react-router-dom';

const Recipes = () => {
  const recipes = useSelector(state => state.recipes.recipes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRecipes());

  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      dispatch(deleteRecipe(id)).then(() => {
        dispatch(getAllRecipes());
      });
    }
  };

  if (!recipes) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>All Recipes</h2>
      <ul>
        {recipes.map((recipe, index) => (
          <li key={index}>
            <h3>{recipe.name}</h3>
            <p>{recipe.rating}</p>
            <Link to={`/recipes/${recipe._id}`}>{recipe.name}</Link>
            <button onClick={() => handleDelete(recipe._id)}>Delete</button>
            <Link to={`/recipes/edit/${recipe._id}`}>Edit</Link>
          </li>
        ))}
      </ul>
      <Link to="/recipes/add">
        <button>Add Recipe</button>
      </Link>
    </div>
  );
};

export default Recipes;
