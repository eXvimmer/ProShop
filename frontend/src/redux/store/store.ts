import {
  applyMiddleware,
  createStore,
  Store,
  Middleware,
} from "redux";

import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "../reducers/rootReducer";
import {
  IProductDetailsState,
  IProductListState,
} from "../types/productTypes";
import { ICartState } from "../types/cartTypes";

export interface IApplicationState {
  productList: IProductListState;
  productDetails: IProductDetailsState;
  cart: ICartState;
}

const cartItems = localStorage.getItem("cartItems");
const cartItemsFromStorage = cartItems ? JSON.parse(cartItems) : [];

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
  },
};

const middlewares: Middleware[] = [thunk];

const store: Store<IApplicationState> = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
