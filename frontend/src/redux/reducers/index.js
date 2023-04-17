import { combineReducers } from 'redux';

import authReducer from './authReducer';
import errorsReducer from './errorsReducer';
import profileReducer from './profileReducer';
import productListReducer from './productReducer';
import basketReducer from './basketReducer';
export default combineReducers({
  auth: authReducer,
  errors: errorsReducer,
  profiles: profileReducer,
  productList: productListReducer,
  basket: basketReducer,
  basketList: basketReducer
});
