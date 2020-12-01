import { ActionCreator } from "redux";
import axios from "axios";
import { ThunkAction } from "redux-thunk";
import { IApplicationState } from "../store/store";
import {
  IOrder,
  IPaymentResult,
  OrderActions,
  OrderActionTypes,
} from "../types/orderTypes";

export const createOrder: ActionCreator<
  ThunkAction<Promise<void>, IApplicationState, IOrder, OrderActions>
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

export const getOrderDetails: ActionCreator<
  ThunkAction<Promise<void>, IApplicationState, string, OrderActions>
> = (id: string) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    const token = userInfo ? userInfo.token : "";

    dispatch({
      type: OrderActionTypes.ORDER_DETAILS_REQUEST,
    });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get<IOrder>(
      `/api/orders/${id}`,
      config
    );

    dispatch({
      type: OrderActionTypes.ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: OrderActionTypes.ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const payOrder: ActionCreator<
  ThunkAction<
    Promise<void>,
    IApplicationState,
    string & IPaymentResult,
    OrderActions
  >
> = (orderId: string, paymentResult: IPaymentResult) => async (
  dispatch,
  getState
) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    const token = userInfo ? userInfo.token : "";

    dispatch({
      type: OrderActionTypes.ORDER_PAY_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put<IOrder>(
      `/api/orders/${orderId}/pay`,
      paymentResult,
      config
    );

    dispatch({
      type: OrderActionTypes.ORDER_PAY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: OrderActionTypes.ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
