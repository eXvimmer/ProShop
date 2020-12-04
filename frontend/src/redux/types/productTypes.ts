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
  PRODUCT_DETAILS_REQUEST = "PRODUCT_DETAILS_REQUEST",
  PRODUCT_DETAILS_SUCCESS = "PRODUCT_DETAILS_SUCCESS",
  PRODUCT_DETAILS_FAIL = "PRODUCT_DETAILS_FAIL",
  PRODUCT_DELETE_REQUEST = "PRODUCT_DELETE_REQUEST",
  PRODUCT_DELETE_SUCCESS = "PRODUCT_DELETE_SUCCESS",
  PRODUCT_DELETE_FAIL = "PRODUCT_DELETE_FAIL",
}

export interface IProductsListRequest {
  type: ProductActionTypes.PRODUCT_LIST_REQUEST;
}

export interface IProductsListSuccess {
  type: ProductActionTypes.PRODUCT_LIST_SUCCESS;
  payload: IProduct[];
}

export interface IProductsListFail {
  type: ProductActionTypes.PRODUCT_LIST_FAIL;
  payload: string;
}

export interface IProductDetailsRequest {
  type: ProductActionTypes.PRODUCT_DETAILS_REQUEST;
}

export interface IProductDetailsSuccess {
  type: ProductActionTypes.PRODUCT_DETAILS_SUCCESS;
  payload: IProduct | null;
}

export interface IProductDetailsFail {
  type: ProductActionTypes.PRODUCT_DETAILS_FAIL;
  payload: string;
}

export interface IProductDeleteRequest {
  type: ProductActionTypes.PRODUCT_DELETE_REQUEST;
}

export interface IProductDeleteSuccess {
  type: ProductActionTypes.PRODUCT_DELETE_SUCCESS;
}

export interface IProductDeleteFail {
  type: ProductActionTypes.PRODUCT_DELETE_FAIL;
  payload: string;
}

export type ProductActions =
  | IProductsListRequest
  | IProductsListSuccess
  | IProductsListFail
  | IProductDetailsRequest
  | IProductDetailsSuccess
  | IProductDetailsFail
  | IProductDeleteRequest
  | IProductDeleteSuccess
  | IProductDeleteFail;

export interface IProductListState {
  readonly products: IProduct[];
  readonly loading: boolean;
  error: string;
}

export interface IProductDetailsState {
  readonly product: IProduct | null;
  readonly loading: boolean;
  error: string;
}

export interface IProductDeleteState {
  loading: boolean;
  success: boolean;
  error: string;
}
