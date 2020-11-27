import { Reducer } from "redux";
import {
  IProductListState,
  ProductListActions,
  ProductActionTypes,
  IProductDetailsState,
  ProductDetailsActions,
} from "../types/productTypes";

const intialProductListState: IProductListState = {
  products: [],
  loading: false,
  error: "",
};

export const productListReducer: Reducer<
  IProductListState,
  ProductListActions
> = (state = intialProductListState, action) => {
  switch (action.type) {
    case ProductActionTypes.PRODUCT_LIST_REQUEST:
      return {
        ...state,
        error: "",
        loading: true,
      };

    case ProductActionTypes.PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
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

const initialProductDetailsState: IProductDetailsState = {
  product: null,
  loading: false,
  error: "",
};

export const productDetailsReducer: Reducer<
  IProductDetailsState,
  ProductDetailsActions
> = (state = initialProductDetailsState, action) => {
  switch (action.type) {
    case ProductActionTypes.PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        errro: "",
      };

    case ProductActionTypes.PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload,
        error: "",
      };

    case ProductActionTypes.PRODUCT_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
