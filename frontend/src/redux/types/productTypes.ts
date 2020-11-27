export interface IProduct {
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
}

export enum ProductActionTypes {
  PRODUCT_LIST_REQUEST = "PRODUCT_LIST_REQUEST",
  PRODUCT_LIST_SUCCESS = "PRODUCT_LIST_SUCCESS",
  PRODUCT_LIST_FAIL = "PRODUCT_LIST_FAIL",
}

export interface IProductRequest {
  type: ProductActionTypes.PRODUCT_LIST_REQUEST;
}

export interface IProductSuccess {
  type: ProductActionTypes.PRODUCT_LIST_SUCCESS;
  payload: IProduct[];
}

export interface IProductFail {
  type: ProductActionTypes.PRODUCT_LIST_FAIL;
  payload: string;
}

export type ProductActions =
  | IProductSuccess
  | IProductFail
  | IProductRequest;

export interface IProductState {
  readonly products: IProduct[];
  readonly loading: boolean;
  error: string;
}
