import { combineReducers } from "redux";
import { IApplicationState } from "../store/store";
import { cartReducer } from "./cartReducers";
import {
  productListReducer,
  productDetailsReducer,
} from "./productReducers";
import {
  userLoginReducer,
  userRegisterReducer,
} from "./userReducers";

const rootReducer = combineReducers<IApplicationState>({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
});

export default rootReducer;
