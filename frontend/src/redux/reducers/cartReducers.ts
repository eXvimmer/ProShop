import { Reducer } from "redux";
import {
  ICartState,
  CartActions,
  CartActionTypes,
} from "../types/cartTypes";

const initialCartState: ICartState = {
  cartItems: [],
};

export const cartReducer: Reducer<ICartState, CartActions> = (
  state = initialCartState,
  action
) => {
  switch (action.type) {
    case CartActionTypes.CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find(
        x => x.product === item.product
      );

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(x =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    default:
      return state;
  }
};
