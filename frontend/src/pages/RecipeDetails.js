import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeById, rateRecipe } from "../redux/actions/recipeActions";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import Navbar from "../components/ReusableComponents/components/Navbars/UserNavbar";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const RecipeDetails = ({ recipeId }) => {
  const [rating, setRating] = useState(null);
  const dispatch = useDispatch();
  const [averageRating, setAverageRating] = useState(null);
  const rateRecipeState = useSelector((state) => state.rateRecipe);

  const handleRatingChange = (event) => {
    const value = parseInt(event.target.value);
    setRating(value);
  };

  const { id } = useParams();

  useEffect(() => {
    dispatch(getRecipeById(id));
  }, [id]);

  const recipe = useSelector((state) => state.recipes.selectedRecipe);
  useEffect(() => {
    if (recipe) {
      const ratings = recipe.ratings || [];
      const totalRatings = ratings.length;
      if (totalRatings > 0) {
        const sumRatings = ratings.reduce((total, rating) => total + rating, 0);
        const avgRating = sumRatings / totalRatings;
        setAverageRating(avgRating);
      } else {
        setAverageRating(0);
      }
    }
  }, [recipe]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!rating || rating < 1 || rating > 5) {
      console.log("Invalid rating value");
      return;
    }
    dispatch(rateRecipe(id, rating));
    setRating(null);
  };

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {recipe && (
        <>
          <Navbar />
          <div className="bg-white">
            <div className="pt-6">
              <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
                <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                  <img
                    src={recipe.image.url}
                    alt={recipe.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                  <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                    <img
                      src={recipe.image.url}
                      alt={recipe.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                    <img
                      src={recipe.image.url}
                      alt={recipe.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                </div>
                <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                  <img
                    src={recipe.image.url}
                    alt={recipe.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </div>

              {/* Product info */}
              <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    {recipe.name}
                  </h1>
                </div>

                {/* Options */}
                <div className="mt-4 lg:row-span-3 lg:mt-0">
                  <h2 className="sr-only">recipe information</h2>
                  <p className="text-3xl tracking-tight text-gray-900">
                    {recipe.preparation}
                  </p>

                  {/* Reviews */}
                  <div className="mt-6">
                    <h3 className="sr-only">Reviews</h3>
                    <div className="flex items-center">
                      <div className="flex items-center">
                        {/* {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        reviews.average > rating ? 'text-gray-900' : 'text-gray-200',
                        'h-5 w-5 flex-shrink-0'
                      )}
                      aria-hidden="true"
                    />
                  ))} */}
                      </div>
                      <p className="sr-only">{recipe.rating} out of 5 stars</p>
                    </div>
                    <div>
                      <form onSubmit={handleSubmit}>
                        <label htmlFor="rating">Rate this recipe:</label>
                        <select
                          id="rating"
                          value={rating}
                          onChange={handleRatingChange}
                        >
                          <option value="">-- Select rating --</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                        <button type="submit">Rate</button>
                      </form>
                    </div>
                  </div>
                  {/* Product rating */}
                  <div className="mt-4">
                    <h2 className="sr-only">Product rating</h2>
                    <div className="flex items-center">
                      <div className="flex items-center mt-4">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon
                              key={i}
                              className={classNames(
                                averageRating > i
                                  ? "text-gray-900"
                                  : "text-gray-200",
                                "h-5 w-5 flex-shrink-0"
                              )}
                              aria-hidden="true"
                            />
                          ))}
                        </div>
                        <p className="ml-2 text-sm text-gray-700">
                          {averageRating?.toFixed(1) || "No ratings yet"}
                        </p>
                      </div>
                      <p className="ml-2 text-sm text-gray-500">
                        {recipe.ratings.length} reviews
                      </p>
                    </div>
                  </div>

                  <form className="mt-10">
                    {/* Colors */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        Color
                      </h3>
                    </div>

                    {/* Sizes */}
                    <div className="mt-10">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-900">
                          Size
                        </h3>
                        <a
                          href="#"
                          className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Size guide
                        </a>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Add to bag
                    </button>
                  </form>
                </div>

                <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                  {/* Description and details */}
                  <div>
                    <h3 className="sr-only">Description</h3>

                    <div className="mt-6">
                      <h3 className="text-lg font-medium text-gray-900">
                        Ingredients
                      </h3>
                      <ul className="mt-4">
                        {recipe.ingredients.map((ingredient, index) => (
                          <li key={index}>
                            <span className="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-blue-100 bg-blue-700 rounded">
                              {ingredient.trim()}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-10">
                    <h3 className="text-sm font-medium text-gray-900">
                      Highlights
                    </h3>

                    <div className="mt-4">
                      {/* <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  {product.highlights.map((highlight) => (
                    <li key={highlight} className="text-gray-400">
                      <span className="text-gray-600">{highlight}</span>
                    </li>
                  ))}
                </ul> */}
                    </div>
                  </div>

                  <div className="mt-10">
                    <h2 className="text-sm font-medium text-gray-900">
                      Details
                    </h2>

                    <div className="mt-4 space-y-6">
                      <p className="text-sm text-gray-600">{recipe.material}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RecipeDetails;
