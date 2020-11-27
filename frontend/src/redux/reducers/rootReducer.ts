import { combineReducers } from "redux";
import { IApplicationState } from "../store/store";
import {
  productListReducer,
  productDetailsReducer,
} from "./productReducer";

const rootReducer = combineReducers<IApplicationState>({
  productList: productListReducer,
  productDetails: productDetailsReducer,
});

export default rootReducer;
