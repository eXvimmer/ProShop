export interface ICartItem {
  product: string;
  name: string;
  image: string;
  price: number;
  countInStock: number;
  qty: number;
}

export enum CartActionTypes {
  CART_ADD_ITEM = "CART_ADD_ITEM",
  CART_REMOVE_ITEM = "CART_REMOVE_ITEM",
}

export interface ICartAddItem {
  type: CartActionTypes.CART_ADD_ITEM;
  payload: ICartItem;
}

export interface ICartRemoveItem {
  type: CartActionTypes.CART_REMOVE_ITEM;
  payload: ICartItem;
}

export type CartActions = ICartAddItem | ICartRemoveItem;

export interface ICartState {
  cartItems: ICartItem[];
}
