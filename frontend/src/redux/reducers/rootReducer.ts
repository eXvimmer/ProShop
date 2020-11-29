import { combineReducers } from "redux";
import { IApplicationState } from "../store/store";
import { cartReducer } from "./cartReducers";
import {
  productListReducer,
  productDetailsReducer,
} from "./productReducers";
import {
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from "./userReducers";

const rootReducer = combineReducers<IApplicationState>({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
});

export default rootReducer;
