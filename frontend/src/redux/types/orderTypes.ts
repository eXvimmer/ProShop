import { ICartAddress, ICartItem } from "./cartTypes";

export interface IOrder {
  _id?: string;
  orderItems: ICartItem[];
  shippingAddress: ICartAddress;
  paymentMethod: string;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
}

export enum OrderActionTypes {
  ORDER_CREATE_REQUEST = "ORDER_CREATE_REQUEST",
  ORDER_CREATE_SUCCESS = "ORDER_CREATE_SUCCESS",
  ORDER_CREATE_FAIL = "ORDER_CREATE_FAIL",
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

export type OrderActions =
  | IOrderCreateRequest
  | IOrderCreateSuccess
  | IOrderCreateFail;

export interface IOrderState {
  loading: boolean;
  success: boolean;
  order: IOrder;
  error: string;
}
