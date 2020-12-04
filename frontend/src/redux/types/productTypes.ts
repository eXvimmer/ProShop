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
  PRODUCT_CREATE_REQUEST = "PRODUCT_CREATE_REQUEST",
  PRODUCT_CREATE_SUCCESS = "PRODUCT_CREATE_SUCCESS",
  PRODUCT_CREATE_FAIL = "PRODUCT_CREATE_FAIL",
  PRODUCT_CREATE_RESET = "PRODUCT_CREATE_RESET",
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

export interface IProductCreateRequest {
  type: ProductActionTypes.PRODUCT_CREATE_REQUEST;
}

export interface IProductCreateSuccess {
  type: ProductActionTypes.PRODUCT_CREATE_SUCCESS;
  payload: IProduct;
}

export interface IProductCreateFail {
  type: ProductActionTypes.PRODUCT_CREATE_FAIL;
  payload: string;
}

export interface IProductCreateReset {
  type: ProductActionTypes.PRODUCT_CREATE_RESET;
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
  | IProductDeleteFail
  | IProductCreateRequest
  | IProductCreateSuccess
  | IProductCreateFail
  | IProductCreateReset;

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

export interface IProductCreateState {
  loading: boolean;
  success: boolean;
  error: string;
  product: IProduct | null;
}
