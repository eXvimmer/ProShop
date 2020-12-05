import { Reducer } from "redux";
import {
  IOrderCreateState,
  IOrderDeliverState,
  IOrderDetailsState,
  IOrderListMyState,
  IOrderListState,
  IOrderPayState,
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
  loading: true,
  order: null,
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

const initialPayState: IOrderPayState = {
  loading: false,
  error: "",
  success: false,
};

export const orderPayReducer: Reducer<
  IOrderPayState,
  OrderActions
> = (state = initialPayState, action) => {
  switch (action.type) {
    case OrderActionTypes.ORDER_PAY_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case OrderActionTypes.ORDER_PAY_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };

    case OrderActionTypes.ORDER_PAY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case OrderActionTypes.ORDER_PAY_RESET:
      return {};

    default:
      return state;
  }
};

const initialOrderMyList: IOrderListMyState = {
  orders: [],
  loading: false,
  error: "",
};

export const orderListMyReducer: Reducer<
  IOrderListMyState,
  OrderActions
> = (state = initialOrderMyList, action) => {
  switch (action.type) {
    case OrderActionTypes.ORDER_LIST_MY_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case OrderActionTypes.ORDER_LIST_MY_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };

    case OrderActionTypes.ORDER_LIST_MY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case OrderActionTypes.ORDER_LIST_MY_RESET:
      return {
        ...state,
        loading: false,
        error: "",
        orders: [],
      };

    default:
      return state;
  }
};

const initialOrderList: IOrderListState = {
  orders: [],
  loading: false,
  error: "",
};

export const orderListReducer: Reducer<
  IOrderListState,
  OrderActions
> = (state = initialOrderList, action) => {
  switch (action.type) {
    case OrderActionTypes.ORDER_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case OrderActionTypes.ORDER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };

    case OrderActionTypes.ORDER_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

const initialOrderDeliverState: IOrderDeliverState = {
  loading: false,
  error: "",
  success: false,
};

export const orderDeliverReducer: Reducer<
  IOrderDeliverState,
  OrderActions
> = (state = initialOrderDeliverState, action) => {
  switch (action.type) {
    case OrderActionTypes.ORDER_DELIVER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case OrderActionTypes.ORDER_DELIVER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };

    case OrderActionTypes.ORDER_DELIVER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case OrderActionTypes.ORDER_DELIVER_RESET:
      return initialOrderDeliverState;

    default:
      return state;
  }
};
