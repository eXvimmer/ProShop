import { ICartAddress, ICartItem } from "./cartTypes";

export interface IPaymentResult {
  id?: string;
  status?: string;
  update_time?: Date;
  email_address?: string;
  create_time?: Date;
  payer?: {
    email_address: string;
  };
  intent?: string;
}

export interface IOrder {
  _id?: string;
  orderItems: ICartItem[];
  isPaid?: boolean;
  paidAt?: Date;
  isDelivered?: boolean;
  deliveredAt?: Date;
  paymentResult?: IPaymentResult;
  shippingAddress: ICartAddress;
  paymentMethod: string;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  createdAt?: Date;
  user?: {
    name: string;
    email: string;
  };
}

export enum OrderActionTypes {
  ORDER_CREATE_REQUEST = "ORDER_CREATE_REQUEST",
  ORDER_CREATE_SUCCESS = "ORDER_CREATE_SUCCESS",
  ORDER_CREATE_FAIL = "ORDER_CREATE_FAIL",
  ORDER_DETAILS_REQUEST = "ORDER_DETAILS_REQUEST",
  ORDER_DETAILS_SUCCESS = "ORDER_DETAILS_SUCCESS",
  ORDER_DETAILS_FAIL = "ORDER_DETAILS_FAIL",
  ORDER_PAY_REQUEST = "ORDER_PAY_REQUEST",
  ORDER_PAY_SUCCESS = "ORDER_PAY_SUCCESS",
  ORDER_PAY_FAIL = "ORDER_PAY_FAIL",
  ORDER_PAY_RESET = "ORDER_PAY_RESET",
  ORDER_LIST_MY_REQUEST = "ORDER_LIST_MY_REQUEST",
  ORDER_LIST_MY_SUCCESS = "ORDER_LIST_MY_SUCCESS",
  ORDER_LIST_MY_FAIL = "ORDER_LIST_MY_FAIL",
  ORDER_LIST_MY_RESET = "ORDER_LIST_MY_RESET",
}

export interface IOrderCreateRequest {
  type: OrderActionTypes.ORDER_CREATE_REQUEST;
}

export interface IOrderCreateSuccess {
  type: OrderActionTypes.ORDER_CREATE_SUCCESS;
  payload: IOrder;
}

export interface IOrderCreateFail {
  type: OrderActionTypes.ORDER_CREATE_FAIL;
  payload: string;
}

export interface IOrderDetailsRequest {
  type: OrderActionTypes.ORDER_DETAILS_REQUEST;
}

export interface IOrderDetailsSuccess {
  type: OrderActionTypes.ORDER_DETAILS_SUCCESS;
  payload: IOrder;
}

export interface IOrderDetailsFail {
  type: OrderActionTypes.ORDER_DETAILS_FAIL;
  payload: string;
}

export interface IOrderPayRequest {
  type: OrderActionTypes.ORDER_PAY_REQUEST;
}

export interface IOrderPaySuccess {
  type: OrderActionTypes.ORDER_PAY_SUCCESS;
  payload: IOrder;
}

export interface IOrderPayFail {
  type: OrderActionTypes.ORDER_PAY_FAIL;
  payload: string;
}

export interface IOrderPayReset {
  type: OrderActionTypes.ORDER_PAY_RESET;
}

export interface IOrderListMyRequest {
  type: OrderActionTypes.ORDER_LIST_MY_REQUEST;
}

export interface IOrderListMySuccess {
  type: OrderActionTypes.ORDER_LIST_MY_SUCCESS;
  payload: IOrder[];
}

export interface IOrderListMyFail {
  type: OrderActionTypes.ORDER_LIST_MY_FAIL;
  payload: string;
}

export interface IOrderListMyReset {
  type: OrderActionTypes.ORDER_LIST_MY_RESET;
}

export type OrderActions =
  | IOrderCreateRequest
  | IOrderCreateSuccess
  | IOrderCreateFail
  | IOrderDetailsRequest
  | IOrderDetailsSuccess
  | IOrderDetailsFail
  | IOrderPayRequest
  | IOrderPaySuccess
  | IOrderPayFail
  | IOrderPayReset
  | IOrderListMyRequest
  | IOrderListMySuccess
  | IOrderListMyFail
  | IOrderListMyReset;

export interface IOrderCreateState {
  loading: boolean;
  success: boolean;
  order: IOrder;
  error: string;
}

export interface IOrderDetailsState {
  orderItems: ICartItem[];
  shippingAddress: ICartAddress;
  error: string;
  loading: boolean;
  order: IOrder | null;
}

export interface IOrderPayState {
  loading?: boolean;
  success?: boolean;
  error?: string;
}

export interface IOrderListMyState {
  orders: IOrder[];
  loading: boolean;
  error: string;
}
