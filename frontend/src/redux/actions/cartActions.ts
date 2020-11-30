import axios from "axios";
import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { IApplicationState } from "../store/store";
import {
  CartActions,
  CartActionTypes,
  ICartAddress,
} from "../types/cartTypes";
import { IProduct } from "../types/productTypes";

export const addToCart: ActionCreator<
  ThunkAction<
    Promise<void>,
    IApplicationState,
    string & number,
    CartActions
  >
> = (id: string, qty: number) => async (
  dispatch: Dispatch,
  getState
) => {
  const { data } = await axios.get<IProduct | null>(
    `/api/products/${id}`
  );
  if (data) {
    dispatch({
      type: CartActionTypes.CART_ADD_ITEM,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      },
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  }
};

export const removeFromCart: ActionCreator<
  ThunkAction<Promise<void>, IApplicationState, string, CartActions>
> = (id: string) => async (dispatch, getState) => {
  dispatch({
    type: CartActionTypes.CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem(
    "cartItems",
    JSON.stringify(getState().cart.cartItems)
  );
};

export const saveShippingAddress: ActionCreator<
  ThunkAction<void, IApplicationState, string, CartActions>
> = (data: ICartAddress) => dispatch => {
  dispatch({
    type: CartActionTypes.CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem("shippingAddress", JSON.stringify(data));
};
