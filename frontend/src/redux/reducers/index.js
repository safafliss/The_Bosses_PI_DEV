import { combineReducers } from "redux";

import authReducer from "./authReducer";
import errorsReducer from "./errorsReducer";
import profileReducer from "./profileReducer";
import productReducer from "./productReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorsReducer,
  profiles: profileReducer,
  products: productReducer,
});
