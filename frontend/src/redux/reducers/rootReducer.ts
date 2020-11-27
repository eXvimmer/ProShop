import { combineReducers } from "redux";
import { IApplicationState } from "../store/store";
import { productListReducer } from "./productReducer";

const rootReducer = combineReducers<IApplicationState>({
  productList: productListReducer,
});

export default rootReducer;
