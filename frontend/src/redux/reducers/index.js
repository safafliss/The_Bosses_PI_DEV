import { combineReducers } from "redux";

import authReducer from './authReducer';
import errorsReducer from './errorsReducer';
import productReducer from "./productReducer";
import profileReducer from './profileReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorsReducer,
    profiles: profileReducer,
    products: productReducer
})