import { combineReducers } from "redux";

import authReducer from "./authReducer";
import errorsReducer from "./errorsReducer";
import profileReducer from "./profileReducer";
import productReducer from "./productReducer";
import commentReducer from "./commentReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorsReducer,
  profiles: profileReducer,
  products: productReducer,
  comments: commentReducer
});
