import { Reducer } from "redux";
import {
  IProductState,
  ProductActions,
  ProductActionTypes,
} from "../types/productTypes";

const intialProductState: IProductState = {
  products: [],
  loading: false,
  error: "",
};

export const productListReducer: Reducer<
  IProductState,
  ProductActions
> = (state = intialProductState, action) => {
  switch (action.type) {
    case ProductActionTypes.PRODUCT_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ProductActionTypes.PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
      };

    case ProductActionTypes.PRODUCT_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
