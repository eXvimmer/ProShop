import {
  applyMiddleware,
  createStore,
  Store,
  Middleware,
} from "redux";

import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "../reducers/rootReducer";
// import { IUserState } from "../types/userTypes";
// import { ICartState } from "../types/cartTypes";
// import { IDirectoryState } from "../types/directoryTypes";
// import { IShopState } from "../types/shopTypes";
// import rootSaga from "../saga/rootSaga";

export interface IApplicationState {}

const middlewares: Middleware[] = [thunk];

const store: Store<IApplicationState> = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
