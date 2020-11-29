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
import {
  IUserDetailsState,
  IUserLoginState,
  IUserRegisterState,
} from "../types/userTypes";

export interface IApplicationState {
  productList: IProductListState;
  productDetails: IProductDetailsState;
  cart: ICartState;
  userLogin: IUserLoginState;
  userRegister: IUserRegisterState;
  userDetails: IUserDetailsState;
}

const cartItems = localStorage.getItem("cartItems");
const cartItemsFromStorage = cartItems ? JSON.parse(cartItems) : [];

const userInfo = localStorage.getItem("userInfo");
const userInfoFromStorage = userInfo
  ? { loading: false, error: "", userInfo: JSON.parse(userInfo) }
  : { loading: false, error: "", userInfo: null };

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
  },
  userLogin: userInfoFromStorage,
};

const middlewares: Middleware[] = [thunk];

const store: Store<IApplicationState> = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
