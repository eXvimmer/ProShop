import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import axios from "axios";
import {
  ProductActions,
  ProductActionTypes,
} from "../types/productTypes";
import { IApplicationState } from "./../store/store";
import { IProduct } from "../types/productTypes";

export const productsListRequest: ActionCreator<
  ThunkAction<Promise<void>, IApplicationState, null, ProductActions>
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
