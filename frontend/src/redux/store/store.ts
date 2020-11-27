import {
  applyMiddleware,
  createStore,
  Store,
  Middleware,
} from "redux";

import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "../reducers/rootReducer";
import { IProductState } from "../types/productTypes";

export interface IApplicationState {
  productList: IProductState;
}

const middlewares: Middleware[] = [thunk];

const store: Store<IApplicationState> = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
