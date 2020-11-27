import { combineReducers } from "redux";
import { IApplicationState } from "../store/store";
import { cartReducer } from "./cartReducers";
import {
  productListReducer,
  productDetailsReducer,
} from "./productReducers";

const rootReducer = combineReducers<IApplicationState>({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
});

export default rootReducer;
