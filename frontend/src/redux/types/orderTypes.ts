import { ICartAddress, ICartItem } from "./cartTypes";

export interface IOrder {
  _id?: string;
  orderItems: ICartItem[];
  isPaid?: boolean;
  paidAt?: Date;
  isDelivered?: boolean;
  deliveredAt?: Date;
  paymentResult?: {
    id: string;
    status: string;
    update_time: Date;
    email_address: string;
  };
  shippingAddress: ICartAddress;
  paymentMethod: string;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
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

export type OrderActions =
  | IOrderCreateRequest
  | IOrderCreateSuccess
  | IOrderCreateFail
  | IOrderDetailsRequest
  | IOrderDetailsSuccess
  | IOrderDetailsFail;

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
  order: IOrder;
}
