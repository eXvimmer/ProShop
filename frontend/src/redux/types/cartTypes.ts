export interface ICartItem {
  product: string;
  name: string;
  image: string;
  price: number;
  countInStock: number;
  qty: number;
}

export interface ICartAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export enum CartActionTypes {
  CART_ADD_ITEM = "CART_ADD_ITEM",
  CART_REMOVE_ITEM = "CART_REMOVE_ITEM",
  CART_SAVE_SHIPPING_ADDRESS = "CART_SAVE_SHIPPING_ADDRESS",
}

export interface ICartAddItem {
  type: CartActionTypes.CART_ADD_ITEM;
  payload: ICartItem;
}

export interface ICartRemoveItem {
  type: CartActionTypes.CART_REMOVE_ITEM;
  payload: string;
}

export interface ICartSaveShippingAddress {
  type: CartActionTypes.CART_SAVE_SHIPPING_ADDRESS;
  payload: ICartAddress;
}

export type CartActions =
  | ICartAddItem
  | ICartRemoveItem
  | ICartSaveShippingAddress;

export interface ICartState {
  cartItems: ICartItem[];
  shippingAddress: ICartAddress;
}
