import { SET_PRODUCT, FETCH_PRODUCTS_ERROR, FETCH_PRODUCTS_SUCCESS } from "../types";

const initialState = {
  product: {},
  products: [],
  error: null,
};
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCT:
      return {
        ...state,
        product: action.payload,
      };
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
      };
    case FETCH_PRODUCTS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
