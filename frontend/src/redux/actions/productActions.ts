import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import axios from "axios";
import {
  ProductListActions,
  ProductActionTypes,
  ProductDetailsActions,
} from "../types/productTypes";
import { IApplicationState } from "./../store/store";
import { IProduct } from "../types/productTypes";

export const listProducts: ActionCreator<
  ThunkAction<
    Promise<void>,
    IApplicationState,
    null,
    ProductListActions
  >
> = () => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: ProductActionTypes.PRODUCT_LIST_REQUEST,
    });

    const { data } = await axios.get<IProduct[]>("/api/products");
    dispatch({
      type: ProductActionTypes.PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ProductActionTypes.PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listProductDetails: ActionCreator<
  ThunkAction<
    Promise<void>,
    IApplicationState,
    string,
    ProductDetailsActions
  >
> = (id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: ProductActionTypes.PRODUCT_DETAILS_REQUEST,
    });

    const { data } = await axios.get<IProduct | null>(
      `/api/products/${id}`
    );
    dispatch({
      type: ProductActionTypes.PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ProductActionTypes.PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
