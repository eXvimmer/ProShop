import { ActionCreator } from "redux";
import axios from "axios";
import { ThunkAction } from "redux-thunk";
import { IApplicationState } from "../store/store";
import {
  IOrder,
  OrderActions,
  OrderActionTypes,
} from "../types/orderTypes";

/* TODO: change any with IOrder or something */
export const createOrder: ActionCreator<
  ThunkAction<Promise<void>, IApplicationState, any, OrderActions>
> = (order: IOrder) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    const token = userInfo ? userInfo.token : "";

    dispatch({
      type: OrderActionTypes.ORDER_CREATE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(`/api/orders`, order, config);

    // REVIEW: Are you sure you want to use data.createdOrder
    dispatch({
      type: OrderActionTypes.ORDER_CREATE_SUCCESS,
      payload: data.createdOrder,
    });
  } catch (error) {
    dispatch({
      type: OrderActionTypes.ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
