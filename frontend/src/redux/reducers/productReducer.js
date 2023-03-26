import isEmpty from "../../util/isEmpty";
import { SET_PRODUCT } from "../types";

const initialState = {
  product: {}
};
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCT:
      return {
        ...state,
        product: action.payload,
      };

    default:
      return state;
  }
}
