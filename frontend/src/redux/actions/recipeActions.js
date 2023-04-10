import axios from 'axios';

const BASE_URL = 'http://localhost:3600/recipe';

export const CREATE_RECIPE = 'CREATE_RECIPE';
export const GET_RECIPE_BY_ID = 'GET_RECIPE_BY_ID';
export const GET_ALL_RECIPES = 'GET_ALL_RECIPES';
export const UPDATE_RECIPE = 'UPDATE_RECIPE';
export const DELETE_RECIPE = 'DELETE_RECIPE';
export const RATE_RECIPE = 'RATE_RECIPE';

export const createRecipe = (recipe) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`${BASE_URL}/add`, recipe);
      dispatch({
        type: CREATE_RECIPE,
        payload: res.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const getRecipeById = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`${BASE_URL}/get/${id}`);
      dispatch({
        type: GET_RECIPE_BY_ID,
        payload: res.data,
      });
      console.log(res.data)
    } catch (error) {
      console.error(error);
    }
  };
};

export const getAllRecipes = () => {
  return async (dispatch) => {
    try {
 
      const res = await axios.get(`${BASE_URL}/getall`);
      console.log("hhhhhhhhhhhhhhhhhhhhh",res.data)
      dispatch({
        type: GET_ALL_RECIPES,
        payload: res.data,
      
      });
    } catch (error) {
      console.error(error);
    }
  };
};
// export const getAllRecipes = () => async (dispatch) => {
//     try {
//       const { data } = await axios.get(`${BASE_URL}/getall`);
//       dispatch({
//         type: GET_ALL_RECIPES,
//         payload: data,
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   };
export const updateRecipe = (id, updates) => {
  return async (dispatch) => {
    try {
      const res = await axios.patch(`${BASE_URL}/update/${id}`, updates);
      dispatch({
        type: UPDATE_RECIPE,
        payload: res.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteRecipe = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(`${BASE_URL}/delete/${id}`);
      dispatch({
        type: DELETE_RECIPE,
        payload: res.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

// export const rateRecipe = (id, rating) => {
//   return async (dispatch) => {
//     try {
//       const res = await axios.post(`${BASE_URL}/recipes/${id}/rate`, rating);
//       dispatch({
//         type: RATE_RECIPE,
//         payload: res.data,
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   };
// };
