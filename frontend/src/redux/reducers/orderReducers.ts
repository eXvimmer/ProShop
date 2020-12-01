import { Reducer } from "redux";
import {
  IOrderCreateState,
  IOrderDetailsState,
  OrderActions,
  OrderActionTypes,
} from "../types/orderTypes";

const initialOrderCreateState: IOrderCreateState = {
  loading: false,
  success: false,
  order: {
    orderItems: [],
    shippingAddress: {
      address: "",
      city: "",
      postalCode: "",
      country: "",
    },
    paymentMethod: "",
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
  },
  error: "",
};

export const orderCreateReducer: Reducer<
  IOrderCreateState,
  OrderActions
> = (state = initialOrderCreateState, action) => {
  switch (action.type) {
    case OrderActionTypes.ORDER_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case OrderActionTypes.ORDER_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        order: action.payload,
      };

    case OrderActionTypes.ORDER_CREATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

const initialOrderDetailsState: IOrderDetailsState = {
  orderItems: [],
  shippingAddress: {
    address: "",
    city: "",
    country: "",
    postalCode: "",
  },
  error: "",
  loading: false,
};

export const orderDetailsReducer: Reducer<
  IOrderDetailsState,
  OrderActions
> = (state = initialOrderDetailsState, action) => {
  switch (action.type) {
    case OrderActionTypes.ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case OrderActionTypes.ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload,
      };

    case OrderActionTypes.ORDER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
