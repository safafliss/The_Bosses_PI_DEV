import { GET_ALL_RECIPES } from "../actions/types";

const initialState = {
  auth: {},
  errors: {},
  profiles: {},
  recipes: [], // add recipes key to initial state
};
export default function rootReducer(state = initialState, action) {
    switch (action.type) {
      case GET_ALL_RECIPES:
        return {
          ...state,
          recipes: action.payload,
        };
      default:
        return state;
    }
  }