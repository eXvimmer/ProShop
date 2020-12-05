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
  IProductCreateState,
  IProductDeleteState,
  IProductDetailsState,
  IProductListState,
  IProductUpdateState,
} from "../types/productTypes";
import { ICartAddress, ICartState } from "../types/cartTypes";
import {
  IUserDeleteState,
  IUserDetailsState,
  IUserListState,
  IUserLoginState,
  IUserRegisterState,
  IUserUpdateProfileState,
  IUserUpdateState,
} from "../types/userTypes";
import {
  IOrderCreateState,
  IOrderDetailsState,
  IOrderListMyState,
  IOrderListState,
  IOrderPayState,
} from "../types/orderTypes";

export interface IApplicationState {
  productList: IProductListState;
  productDetails: IProductDetailsState;
  productCreate: IProductCreateState;
  productUpdate: IProductUpdateState;
  productDelete: IProductDeleteState;
  cart: ICartState;
  userLogin: IUserLoginState;
  userRegister: IUserRegisterState;
  userDetails: IUserDetailsState;
  userUpdateProfile: IUserUpdateProfileState;
  userList: IUserListState;
  userDelete: IUserDeleteState;
  userUpdate: IUserUpdateState;
  orderCreate: IOrderCreateState;
  orderDetails: IOrderDetailsState;
  orderPay: IOrderPayState;
  orderList: IOrderListState;
  orderListMy: IOrderListMyState;
}

const cartItems = localStorage.getItem("cartItems");
const cartItemsFromStorage = cartItems ? JSON.parse(cartItems) : [];

const shippingAddress = localStorage.getItem("shippingAddress");
const shippingAddressFromStorage: ICartAddress = shippingAddress
  ? JSON.parse(shippingAddress)
  : { address: "", country: "", city: "", postalCode: "" };

const paymentMethod = localStorage.getItem("paymentMethod");
const paymentMethodFromStorage = paymentMethod
  ? JSON.parse(paymentMethod)
  : "";

const userInfo = localStorage.getItem("userInfo");
const userInfoFromStorage = userInfo
  ? { loading: false, error: "", userInfo: JSON.parse(userInfo) }
  : { loading: false, error: "", userInfo: null };

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
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
