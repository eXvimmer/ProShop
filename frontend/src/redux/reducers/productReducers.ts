import { Reducer } from "redux";
import {
  IProductListState,
  ProductActionTypes,
  IProductDetailsState,
  ProductActions,
  IProductDeleteState,
} from "../types/productTypes";

const intialProductListState: IProductListState = {
  products: [],
  loading: false,
  error: "",
};

export const productListReducer: Reducer<
  IProductListState,
  ProductActions
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
  ProductActions
> = (state = initialProductDetailsState, action) => {
  switch (action.type) {
    case ProductActionTypes.PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
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

const initialProductDeleteState: IProductDeleteState = {
  loading: false,
  error: "",
  success: false,
};

export const productDeleteReducer: Reducer<
  IProductDeleteState,
  ProductActions
> = (state = initialProductDeleteState, action) => {
  switch (action.type) {
    case ProductActionTypes.PRODUCT_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
        success: false,
      };

    case ProductActionTypes.PRODUCT_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: "",
      };

    case ProductActionTypes.PRODUCT_DELETE_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
