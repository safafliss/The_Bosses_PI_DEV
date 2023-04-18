import Navbar from "../components/ReusableComponents/components/Navbars/UserNavbar";
import {
  getAllRecipes,
  deleteRecipe,
  getRecipesByIngredients,
} from "../redux/actions/recipeActions";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import patternReact from "../assets/img/recipelandinggg.png";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { StarIcon } from "@heroicons/react/20/solid";

import classNames from "classnames";

export default function RecipeList() {
  const recipes = useSelector((state) => state.recipes.recipes);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(getAllRecipes());
  }, [dispatch]);
  const recipe = useSelector((state) => state.recipes.selectedRecipe);

  function getAverageRating(ratings) {
    if (ratings.length === 0) {
      return 0;
    }
    const sum = ratings.reduce((acc, cur) => acc + cur, 0);
    return (sum / ratings.length).toFixed(1);
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      dispatch(deleteRecipe(id)).then(() => {
        dispatch(getAllRecipes());
      });
    }
  };
  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(getRecipesByIngredients(searchQuery));
  };

  const filteredRecipes =
    searchQuery !== ""
      ? recipes.filter((recipe) => recipe.ingredients.includes(searchQuery))
      : recipes;

  if (!recipes) {
    return <div>Loading...</div>;
  }
  return (
    <div className="bg-white">
      <Navbar />
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2
          className="text-2xl font-bold tracking-tight text-gray-900 text-center"
          style={{ paddingBottom: "50px" }}
        >
          Anti-waste recipes
        </h2>
        <form onSubmit={handleSearch}>
          <label
            htmlFor="searchInput"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search by ingredient:
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                class="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              style={{ height: "9px", marginBottom: "50px" }}
              type="text"
              id="searchInput"
              class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-green-600 dark:placeholder-green-400 green:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              placeholder="tap ingrediens to search for recipes"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {/* <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
          </div>
        </form>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {filteredRecipes.length === 0 ? (
            <p>No recipes found with "{searchQuery}"</p>
          ) : (
            filteredRecipes.map((recipe) => (
              <div key={recipe._id}>
                <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={
                      recipe?.image?.url
                        ? recipe?.image?.url
                        : "https://mdbootstrap.com/img/Photos/Others/placeholder.jpg"
                    }
                    alt={recipe.name}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <h4 className="text-xl font-bold text-black">
                        <Link to={`/recipes/${recipe._id}`}>{recipe.name}</Link>
                      </h4>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {recipe.preparation}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {recipe.cooking}
                  </p>
                  <div className="mt-4">
                  
                  
                    <div className="mt-4">
                      <h2 className="sr-only">Product rating</h2>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={classNames(
                              "h-5 w-5 flex-shrink-0",
                              getAverageRating(recipe.ratings) > i
                                ? "filled text-gray-900"
                                : "text-gray-200"
                            )}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* //  <Button variant="outline-danger" size="sm" onClick={() => handleDelete(recipe._id)}>Delete</Button> */}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
